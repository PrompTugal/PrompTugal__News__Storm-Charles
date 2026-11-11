#!/usr/bin/env node
// From the hand-kept research/wikipedia/claims-curated.json and the stored wikitext of each revision (outside git, put
// there by tools/wikipedia-read.mjs), writes: claims.json (each statement with the footnotes it carries in that exact
// revision, and the revision in which it first appeared), compare.json (the languages side by side), against.json
// (Wikipedia against this site's timeline, both ways) and the pages claims.md, compare.md, against.md.
// Reads nothing from the network. Fails loudly if an anchor is not in the revision it names, or a timeline id does not exist.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { AGENT, DIR, ROOT, now, readJson, writeJson } from './wikipedia-lib.mjs'

const STORE = process.env.WIKI_STORE || path.join(os.homedir(), '.wikipedia-store')
const INC = 'incidents/2026-11-10-storm-charles'
const cur = readJson('claims-curated.json'), arts = readJson('articles.json')
const signals = JSON.parse(fs.readFileSync(path.join(ROOT, INC, 'data/signals.json'), 'utf8')).items
const sigById = new Map(signals.map(s => [s.id, s]))
const graph = JSON.parse(fs.readFileSync(path.join(ROOT, INC, 'data/decisions/graph.json'), 'utf8'))
const decById = new Map(graph.edges.map(e => [e.id, e]))
const text = (lang, id) => { try { return fs.readFileSync(path.join(STORE, lang, `${id}.wiki`), 'utf8') } catch { return null } }
const fail = m => { console.error('wikipedia-claims: ' + m); process.exit(1) }
const made = now()
const oldid = (lang, id) => `https://${lang}.wikipedia.org/w/index.php?oldid=${id}`
const HOSTS = { 'rtp.pt': 'RTP', 'portugal.gov.pt': 'Portal do Governo', 'ipma.pt': 'IPMA', 'dnoticias.pt': 'Diário de Notícias da Madeira', 'prociv.gov.pt': 'ANEPC', 'eco.sapo.pt': 'ECO', 'elpais.com': 'El País', 'rtve.es': 'RTVE', 'cadenaser.com': 'Cadena SER', 'postal.pt': 'Postal', 'executivedigest.sapo.pt': 'Executive Digest', 'euronews.com': 'Euronews' }

// ---------- footnotes
const field = (b, names) => { for (const n of names) { const m = b.match(new RegExp(`\\|\\s*${n}\\s*=\\s*([^|}]*)`, 'i')); if (m && m[1].trim()) return m[1].trim().replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1') } return null }
const PRIMARY = /(^|\.)(ipma\.pt|portugal\.gov\.pt|prociv\.gov\.pt|aemet\.es|noaa\.gov|websummit\.com|gnr\.pt|apambiente\.pt)$/
function cite(body) {
  const url = field(body, ['url']) || (body.match(/https?:\/\/[^\s|\]}<]+/) || [null])[0]
  let host = null; try { host = new URL(url).hostname.replace(/^www\./, '') } catch { }
  return { kind: host && PRIMARY.test(host) ? 'primary' : 'press', wire: /\bLusa\b/.test(body) ? 'Lusa' : /\b(EFE|Europa Press)\b/.test(body) ? 'a Spanish wire' : undefined, url, outlet: field(body, ['publicado', 'jornal', 'obra', 'website', 'work', 'newspaper', 'publisher', 'agency']) || HOSTS[host] || host, host, title: field(body, ['título', 'titulo', 'title']), date: field(body, ['data', 'date']), consulted: field(body, ['acessodata', 'access-date', 'accessdate']), language: field(body, ['língua', 'language']) || undefined }
}
function refsAfter(t, from) {      // the next footnotes after position `from` in the same paragraph: on Wikipedia a footnote covers the text before it, back to the one before
  const out = []
  let i = from
  for (; i < t.length; i++) {
    if (t.startsWith('<ref', i)) break
    if (t.startsWith('\n\n', i) || t.startsWith('\n|', i) || t.startsWith('\n}}', i)) return out
  }
  while (t.startsWith('<ref', i)) {
    const selfEnd = t.indexOf('/>', i), open = t.indexOf('>', i)
    if (selfEnd >= 0 && selfEnd < open + 1 && selfEnd === open - 1) {
      const name = (t.slice(i, selfEnd).match(/name\s*=\s*"?([^"\/>]+)"?/) || [])[1]?.trim()
      const def = name && t.match(new RegExp(`<ref\\s+name\\s*=\\s*"?${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"?\\s*>([\\s\\S]*?)</ref>`))
      out.push(def ? { ...cite(def[1]), named: name } : { url: null, outlet: null, named: name, note: 'a named footnote whose definition was not found in this revision' })
      i = selfEnd + 2
    } else {
      const close = t.indexOf('</ref>', i); if (close < 0) break
      const name = (t.slice(i, open).match(/name\s*=\s*"?([^">]+)"?/) || [])[1]?.trim()
      out.push({ ...cite(t.slice(open + 1, close)), named: name || undefined })
      i = close + 6
    }
    while (/\s/.test(t[i] || '') && !t.startsWith('\n\n', i)) i++
  }
  return out
}

// ---------- 3. the claims
const pageRevs = {}, pageOf = {}
for (const [lang, r] of Object.entries(cur.revisions)) {
  pageRevs[lang] = readJson(`revisions/${r.page}.json`).revisions
  pageOf[lang] = arts.articles.find(a => `${a.lang}-${a.page_id}` === r.page)
  if (!text(lang, r.oldid)) fail(`the wikitext of ${lang} revision ${r.oldid} is not in the store (${STORE}): run tools/wikipedia-read.mjs first`)
}
const firstWith = (lang, test) => { for (const r of pageRevs[lang]) { if (r.sha256 === undefined) continue; const t = text(lang, r.id); if (t && test(t)) return { revision: r.id, at: r.at, url: oldid(lang, r.id) } } return null }
const claims = cur.claims.map(c => {
  const rv = cur.revisions[c.lang], t = text(c.lang, rv.oldid), i = t.indexOf(c.anchor)
  if (i < 0) fail(`${c.id}: the anchor is not in ${c.lang} revision ${rv.oldid}: ${c.anchor}`)
  const latest = pageOf[c.lang].last_revision, tl = latest === rv.oldid ? t : text(c.lang, latest)
  for (const s of c.ours?.signals || []) if (!sigById.has(s)) fail(`${c.id}: no timeline row ${s}`)
  for (const d of c.ours?.decisions || []) if (!decById.has(d)) fail(`${c.id}: no decision ${d}`)
  for (const f of c.ours?.files || []) if (!fs.existsSync(path.join(ROOT, f))) fail(`${c.id}: no file ${f}`)
  return { id: c.id, lang: c.lang, topic: c.topic, kind: c.kind, label: 'evidence', statement: c.statement, figures: c.figures, anchor: c.anchor.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/'''|\{\{convert\||\|\s*$/g, '').trim(), cites: refsAfter(t, i + c.anchor.length), revision: rv.oldid, url: oldid(c.lang, rv.oldid), first_seen: firstWith(c.lang, x => x.includes(c.anchor)), in_latest_revision: tl ? tl.includes(c.anchor) : null, latest_revision: latest }
})
function census(lang) {     // every footnote of the revision: how many, to whom, primary or press, and the wire by-lines the footnotes themselves give
  const t = text(lang, cur.revisions[lang].oldid), defs = [...t.matchAll(/<ref(?:\s+name\s*=\s*"?[^">]*"?)?\s*>([\s\S]*?)<\/ref>/g)].map(m => cite(m[1]))
  const uses = (t.match(/<ref[\s>]/gi) || []).length, n = f => defs.filter(f).length, by = {}
  for (const d of defs) by[d.outlet || d.host || 'unknown'] = (by[d.outlet || d.host || 'unknown'] || 0) + 1
  return { footnote_marks: uses, distinct_sources: defs.length, primary: n(d => d.kind === 'primary'), press: n(d => d.kind === 'press'), with_a_Lusa_byline: n(d => d.wire === 'Lusa'), lusa_share_of_press: defs.length ? +(n(d => d.wire === 'Lusa') / Math.max(1, n(d => d.kind === 'press'))).toFixed(2) : null, note: 'whole page for an article; for a season article, the whole season page, not only the storm\'s section. A wire is counted only where the footnote itself gives it as author or agency: a newspaper relaying the wire without saying so cannot be seen from the footnote.', by_outlet: Object.fromEntries(Object.entries(by).sort((a, b) => b[1] - a[1])) }
}
const censuses = Object.fromEntries(Object.keys(cur.revisions).map(l => [l, census(l)]))
const T = s => Date.parse(s.length === 17 ? s.replace('Z', ':00Z') : s)
const stamp = t => t ? `${+t.slice(8, 10)} Nov, ${t.slice(11, 16)}` : ''
const revs = Object.fromEntries(Object.entries(cur.revisions).map(([lang, r]) => [lang, { page: pageOf[lang].title, revision: r.oldid, url: oldid(lang, r.oldid), revision_at: pageRevs[lang].find(x => x.id === r.oldid)?.at, latest_revision: pageOf[lang].last_revision, stale: pageOf[lang].last_revision !== r.oldid }]))
const ATTR = 'Wikipedia\'s text is by Wikipedia\'s contributors, CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/). Each statement here is our own English paraphrase; the anchor is a few words of the article, quoted to find the sentence; the exact revision is linked.'
const noCite = claims.filter(c => !c.cites.length)
const outlets = {}
for (const c of claims) for (const k of c.cites) { const o = `${c.lang}|${k.outlet || k.host || 'unknown'}`; outlets[o] = (outlets[o] || 0) + 1 }
writeJson('claims.json', { about: 'The checkable statements (a time, a number, a place, who decided what) of the current revision of each Wikipedia page on Storm Charles, each with the footnotes it carries in that revision (address, outlet, date, date consulted) and the revision in which it first appeared. Statements are evidence: what Wikipedia states, not facts about the storm. Hand-kept in claims-curated.json; footnotes and first appearances are read from the wikitext by tools/wikipedia-claims.mjs.', by: AGENT, tool: 'tools/wikipedia-claims.mjs', updated: made, label: 'evidence', licence: 'CC BY-SA 4.0 for anything quoted from Wikipedia (the anchors)', attribution: ATTR, revisions: revs, footnotes: censuses, counts: { claims: claims.length, by_language: Object.fromEntries(Object.keys(revs).map(l => [l, claims.filter(c => c.lang === l).length])), without_a_footnote: noCite.map(c => c.id), footnotes_by_outlet: Object.fromEntries(Object.entries(outlets).sort((a, b) => b[1] - a[1])) }, claims })

// ---------- 4. the languages compared
const langs = Object.keys(revs)
const topics = cur.topics.map(t => {
  const by = Object.fromEntries(langs.map(l => [l, claims.filter(c => c.topic === t.id && c.lang === l).map(c => c.id)]))
  const has = langs.filter(l => by[l].length)
  return { id: t.id, title: t.title, claims: by, in: has, only: has.length === 1 ? has[0] : null, differences: cur.differences.filter(d => d.topic === t.id).map(d => d.id) }
}).filter(t => t.in.length)
writeJson('compare.json', { about: 'The Wikipedia pages on Storm Charles compared between languages, topic by topic: which language states what (claim ids from claims.json), what only one language has, and where two languages give different figures or attributions for the same thing. The grouping into topics and every "reading" are our analysis; the statements themselves are evidence.', by: AGENT, tool: 'tools/wikipedia-claims.mjs', updated: made, attribution: ATTR, revisions: revs, summary: { topics: topics.length, only_pt: topics.filter(t => t.only === 'pt').map(t => t.id), only_en: topics.filter(t => t.only === 'en').map(t => t.id), in_both_pt_and_en: topics.filter(t => t.in.includes('pt') && t.in.includes('en')).map(t => t.id), differences: cur.differences.length }, topics, differences: cur.differences })

// ---------- 5. Wikipedia against this site, both ways
const REL = { matches: 'a timeline row says the same', 'in-data': 'on this site in a data file, with no timeline row', missing: 'nowhere on this site', behind: 'Wikipedia states what a later change has overtaken; we hold the change', differs: 'a figure or time differs' }
const sig = id => { const s = sigById.get(id); return { id, at: s.at, label: s.label, text: s.text.replace(/\*\*/g, '').slice(0, 160), url: `${INC}/timeline.html#${id}` } }
const w2u = claims.map(c => { const o = cur.claims.find(x => x.id === c.id).ours || { rel: 'missing' }; return { our_check: o.verdict || 'not checked by us', our_check_note: o.verdict_note || undefined, footnote_kind: !c.cites.length ? 'no footnote' : c.cites.some(k => k.kind === 'primary') ? (c.cites.every(k => k.kind === 'primary') ? 'primary' : 'primary and press') : 'press', footnote_wire: [...new Set(c.cites.map(k => k.wire).filter(Boolean))], claim: c.id, lang: c.lang, topic: c.topic, statement: c.statement, relation: o.rel, means: REL[o.rel], timeline: (o.signals || []).map(sig), decisions: (o.decisions || []).map(d => ({ id: d, at: decById.get(d).at || null, decision: String(decById.get(d).decision).slice(0, 120) })), files: o.files || [], note: o.note || undefined, wikipedia_first_seen: c.first_seen, cites: c.cites.map(k => k.outlet || k.host).filter(Boolean), revision_url: c.url, label: 'our analysis of evidence' } })
const u2w = cur.our_facts.map(f => {
  for (const x of f.signals) if (!sigById.has(x)) fail(`${f.id}: no timeline row ${x}`)
  const t0 = T(f.happened)
  const per = Object.fromEntries(langs.map(lang => {
    const re = new RegExp(f.patterns[lang] || '$^'), tre = f.time_patterns?.[lang] ? new RegExp(f.time_patterns[lang]) : null
    const first = firstWith(lang, x => re.test(x)), now_ = re.test(text(lang, pageOf[lang].last_revision) || text(lang, cur.revisions[lang].oldid))
    const mine = claims.filter(c => c.lang === lang && (f.claims || []).includes(c.id))
    return [lang, { has_the_subject: now_, has_our_time: tre ? tre.test(text(lang, cur.revisions[lang].oldid)) : null, first_appeared: now_ ? first : null, minutes_after_it_happened: now_ && first ? Math.round((T(first.at) - t0) / 6e4) : null, citing: now_ ? [...new Set(mine.flatMap(c => c.cites.map(k => k.outlet || k.host)))] : [], claims: mine.map(c => c.id) }]
  }))
  return { id: f.id, fact: f.fact, happened: f.happened, label: f.label, timeline: f.signals.map(sig), wikipedia: per }
})
const by = r => w2u.filter(x => x.relation === r)
writeJson('against.json', { about: 'This site against Wikipedia, both ways. wikipedia_to_us: for each Wikipedia claim, the timeline row (by permanent id) that says the same, the data file that holds it, or that it is missing here. us_to_wikipedia: for each of our key facts, whether each language has the subject, whether it has our time, the revision in which it first appeared and whom it cites. Every relation is our analysis of two bodies of evidence; a pattern match on wikitext finds the subject, not agreement.', by: AGENT, tool: 'tools/wikipedia-claims.mjs', updated: made, attribution: ATTR, revisions: revs, relations: REL, checks: { about: 'What this team found when it went to the primary source for a Wikipedia statement. Wikipedia is a lead for us, never the source.', counts: w2u.reduce((n, x) => (n[x.our_check] = (n[x.our_check] || 0) + 1, n), {}), footnote_kinds: w2u.reduce((n, x) => (n[x.footnote_kind] = (n[x.footnote_kind] || 0) + 1, n), {}), not_established: w2u.filter(x => x.our_check === 'not established at source').map(x => ({ claim: x.claim, why: x.our_check_note })) }, footnotes: censuses, counts: Object.fromEntries(Object.keys(REL).map(r => [r, by(r).length])), wikipedia_ahead: { nowhere_on_this_site: by('missing').map(x => x.claim), in_our_data_but_no_timeline_row: by('in-data').map(x => x.claim) }, we_are_ahead: { wikipedia_behind_a_later_change: by('behind').map(x => x.claim), our_times_wikipedia_lacks: u2w.filter(f => Object.values(f.wikipedia).every(w => !w.has_our_time)).map(f => f.id), subjects_wikipedia_lacks: u2w.filter(f => Object.values(f.wikipedia).every(w => !w.has_the_subject)).map(f => f.id) }, wikipedia_to_us: w2u, us_to_wikipedia: u2w })

// ---------- the pages
const head = (title, what) => `# ${title}\n\n> Kept by ${AGENT}, ${+made.slice(8, 10)} November 2026, ${made.slice(11, 16)} UTC (written by tools/wikipedia-claims.mjs from claims-curated.json and the revisions named below)\n\n${what}\n\n**Revisions read:** ${langs.map(l => `[${l}: ${revs[l].page}, revision ${revs[l].revision}](${revs[l].url}) of ${stamp(revs[l].revision_at)} UTC${revs[l].stale ? ' (**the page has changed since; latest ' + revs[l].latest_revision + '**)' : ''}`).join('; ')}. Wikipedia's text is by Wikipedia's contributors, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/); the statements below are our English paraphrase. Wikipedia is evidence here, never a fact. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).\n\n`
const cell = s => String(s ?? '').replace(/\|/g, '/').replace(/\n/g, ' ')
const cid = c => `[${c.id}](${c.url})`
const citeMd = c => c.cites.length ? c.cites.map(k => k.url ? `[${cell(k.outlet || k.host)}](${k.url})${k.date ? ', ' + cell(k.date) : ''}${k.consulted ? ' (consulted ' + cell(k.consulted) + ')' : ''}` : cell(k.note)).join('; ') : '**no footnote**'
const cById = new Map(claims.map(c => [c.id, c]))
const tl = id => `[${id}](../../${INC}/timeline.html#${id})`

let md = `---\ntitle: What Wikipedia states about Storm Charles, claim by claim\n---\n` + head('What Wikipedia states, claim by claim', `The ${claims.length} checkable statements of the current revisions (${langs.map(l => `${claims.filter(c => c.lang === l).length} ${l}`).join(', ')}): a time, a number, a place, who decided what; each with the footnote it carries and the revision in which it first appeared. Data: [claims.json](claims.json). ${noCite.length} statement${noCite.length === 1 ? ' carries' : 's carry'} no footnote.`)
for (const l of langs) {
  md += `## ${l}: ${revs[l].page}\n\n| Claim | What Wikipedia states (our English; evidence) | Footnote: outlet, date, consulted | First in revision of (UTC) |\n|---|---|---|---|\n`
  for (const c of claims.filter(c => c.lang === l)) md += `| ${cid(c)} | ${cell(c.statement)} | ${citeMd(c)} | ${c.first_seen ? `[${stamp(c.first_seen.at)}](${c.first_seen.url})` : 'before 8 Nov'} |\n`
  md += '\n'
}
md += `## Whom Wikipedia cites\n\n| Language | Outlet | Footnotes on these claims |\n|---|---|---|\n${Object.entries(outlets).sort((a, b) => b[1] - a[1]).map(([k, n]) => `| ${k.split('|')[0]} | ${cell(k.split('|')[1])} | ${n} |`).join('\n')}\n`
fs.writeFileSync(path.join(DIR, 'claims.md'), md)

md = `---\ntitle: Wikipedia on Storm Charles, language against language\n---\n` + head('Wikipedia, language against language', `What the Portuguese article states that the English section does not, and the reverse; and where two languages give different figures or attributions for the same thing. Data: [compare.json](compare.json); the claims: [claims.md](claims.md). The grouping and every "reading" are **our analysis**; the statements are evidence.`)
md += `## Where the languages differ\n\n| | What differs | Our reading (labelled) | Claims |\n|---|---|---|---|\n${cur.differences.map(d => `| ${d.id} · ${d.kind} | ${cell(d.what)} | *${d.label}:* ${cell(d.reading)} | ${d.claims.map(i => cid(cById.get(i))).join(', ')} |`).join('\n')}\n\n`
md += `## Topic by topic\n\n| Topic | ${langs.join(' | ')} | Who has it |\n|---|${langs.map(() => '---').join('|')}|---|\n${topics.map(t => `| ${t.title} | ${langs.map(l => t.claims[l].map(i => cid(cById.get(i))).join(', ') || 'nothing').join(' | ')} | ${t.only ? `**${t.only} only**` : t.in.join(' and ')} |`).join('\n')}\n\n`
for (const [l, o] of [['pt', 'en'], ['en', 'pt']]) {
  const only = claims.filter(c => c.lang === l && !topics.find(t => t.id === c.topic).in.includes(o))
  md += `## What ${l} states and ${o} does not (${only.length} claims, by topic)\n\n${only.map(c => `- ${cell(c.statement)} (${cid(c)}; ${citeMd(c)})`).join('\n')}\n\n`
}
fs.writeFileSync(path.join(DIR, 'compare.md'), md)

md = `---\ntitle: This site against Wikipedia, both ways\n---\n` + head('This site against Wikipedia, both ways', `For each Wikipedia claim: the row of [our timeline](../../${INC}/timeline.html) that says the same (by its permanent id), the data file that holds it, or that it is missing here. Then the reverse: for each of our key facts, whether Wikipedia has it, since which revision, and citing whom. Data: [against.json](against.json). **Every relation is our analysis of two bodies of evidence.**`)
md += `## Where Wikipedia is ahead of us\n\n**Nowhere on this site (${by('missing').length} claims):**\n\n${by('missing').map(x => `- ${cell(x.statement)} (${cid(cById.get(x.claim))}; ${x.cites.join(', ') || 'no footnote'})${x.note ? ' *' + cell(x.note) + '*' : ''}`).join('\n')}\n\n**In our data, but with no timeline row (${by('in-data').length} claims):**\n\n${by('in-data').map(x => `- ${cell(x.statement)} (${cid(cById.get(x.claim))}) Ours: ${[...x.decisions.map(d => '`' + d.id + '`' + (d.at ? ' at ' + d.at : '')), ...x.files.map(f => '`' + f + '`')].join(', ')}.${x.note ? ' *' + cell(x.note) + '*' : ''}`).join('\n')}\n\n`
md += `## Where we are ahead of Wikipedia\n\n| Our key fact | Timeline row | ${langs.map(l => `${l}: has the subject? our time? first in revision of; citing`).join(' | ')} |\n|---|---|${langs.map(() => '---').join('|')}|\n${u2w.map(f => `| ${cell(f.fact)} *(${f.label})* | ${f.timeline.map(s => tl(s.id)).join(', ')} | ${langs.map(l => { const w = f.wikipedia[l]; return w.has_the_subject ? `**yes**; our time: ${w.has_our_time ? 'yes' : '**no**'}; first ${w.first_appeared ? `[${stamp(w.first_appeared.at)}](${w.first_appeared.url})` : '?'}${w.minutes_after_it_happened != null ? ` (${w.minutes_after_it_happened >= 0 ? Math.floor(w.minutes_after_it_happened / 60) + ' h ' + (w.minutes_after_it_happened % 60) + ' min after it happened' : 'before'})` : ''}; citing ${w.citing.join(', ') || 'no footnote'}` : '**no**' }).join(' | ')} |`).join('\n')}\n\n"Has the subject" is a pattern found in the wikitext, not agreement; "our time" is whether the page gives the minute we give.\n\n`
md += `**Wikipedia states what a later change has overtaken (${by('behind').length} claims):**\n\n${by('behind').map(x => `- ${cell(x.statement)} (${cid(cById.get(x.claim))}) Ours: ${x.timeline.map(s => tl(s.id)).join(', ')}. *${cell(x.note)}*`).join('\n')}\n\n`
const chk = k => w2u.filter(x => x.our_check === k)
md += `## Wikipedia's claims checked at the primary source\n\nWikipedia is a lead for us, never the source. After the first read the conductor sent its leads to incident.researcher@ and incident.meteorologist@, who went to the bodies themselves. Of ${w2u.length} claims: **${chk('verified at primary source').length} verified at a primary source**, ${chk('press only').length} press only, **${chk('not established at source').length} not established at source**, ${chk('not checked by us').length} not checked by us.\n\n**Not established at source:**\n\n${chk('not established at source').map(x => `- ${cell(x.statement)} (${cid(cById.get(x.claim))}; Wikipedia cites ${x.cites.join(', ') || 'nothing'}) *${cell(x.our_check_note)}*`).join('\n')}\n\n**Whom Wikipedia's footnotes rest on** (the whole page at the revision read; a wire is counted only where the footnote names it):\n\n| Page | Footnote marks | Distinct sources | Primary bodies | Press | With a Lusa by-line | Lusa's share of the press footnotes |\n|---|---|---|---|---|---|---|\n${langs.map(l => `| ${l}: ${revs[l].page} | ${censuses[l].footnote_marks} | ${censuses[l].distinct_sources} | ${censuses[l].primary} | ${censuses[l].press} | ${censuses[l].with_a_Lusa_byline} | ${censuses[l].lusa_share_of_press} |`).join('\n')}\n\nFor comparison, the media watch found a wire share of 0.52 in the press it read ([outlets.json](../media/outlets.json)); a footnote shows the wire only when it names it, so Wikipedia's figure is a floor.\n\n`
md += `## Every Wikipedia claim against our timeline\n\n| Claim | What Wikipedia states (evidence) | Its footnote | Against this site | Our rows and data | Our check at the primary source | Note |\n|---|---|---|---|---|---|---|\n${w2u.map(x => `| ${cid(cById.get(x.claim))} | ${cell(x.statement)} | ${x.footnote_kind}${x.footnote_wire.length ? ' (' + x.footnote_wire.join(', ') + ')' : ''}: ${x.cites.join(', ') || 'none'} | **${x.relation}** | ${[...x.timeline.map(s => tl(s.id)), ...x.decisions.map(d => '`' + d.id + '`'), ...x.files.map(f => '`' + f.split('/').pop() + '`')].join(', ') || 'none'} | **${x.our_check}**${x.our_check_note ? ': ' + cell(x.our_check_note) : ''} | ${cell(x.note || '')} |`).join('\n')}\n\nRelations: ${Object.entries(REL).map(([k, v]) => `**${k}**: ${v}`).join('; ')}. Counts: ${Object.keys(REL).map(r => `${r} ${by(r).length}`).join(', ')}.\n`
fs.writeFileSync(path.join(DIR, 'against.md'), md)
console.log(`claims ${claims.length} (${noCite.length} without a footnote); topics ${topics.length}; differences ${cur.differences.length}; against: ${Object.keys(REL).map(r => `${r} ${by(r).length}`).join(', ')}`)
for (const f of u2w) console.log(' ', f.id, langs.map(l => `${l}:${f.wikipedia[l].has_the_subject ? 'yes@' + (f.wikipedia[l].first_appeared?.at || '?') : 'no'}${f.wikipedia[l].has_our_time ? '+time' : ''}`).join(' '))
