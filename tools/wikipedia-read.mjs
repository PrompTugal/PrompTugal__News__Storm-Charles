#!/usr/bin/env node
// Reads Wikipedia on Storm Charles and APPENDS: node tools/wikipedia-read.mjs  (run on every wake; read-only on Wikipedia)
//   1. finds every article, section, redirect and mention in every language (Wikidata sitelinks, the season article's
//      sitelinks, redirects, a phrase search per language) -> research/wikipedia/articles.json
//   2. the full revision history of each (ids, times, sizes, edit summaries, minor flag; never editors' names or IPs)
//      -> research/wikipedia/revisions/<lang>-<pageid>.json and the index revisions.json. Revisions already recorded are
//      never rewritten or dropped; one that Wikipedia no longer lists is kept and marked gone_at.
//   3. the wikitext of each revision since the storm was named goes to a store OUTSIDE git (WIKI_STORE, default
//      ~/.wikipedia-store): git keeps its sha256, the bytes of the storm's section and the count of footnotes.
//   4. one line per run appended to reads.json, and changes.md: what changed on Wikipedia since the last read.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { api, stats, now, sha256, readJson, writeJson, pageUrl, oldidUrl, AGENT, DIR, UA, GAP } from './wikipedia-lib.mjs'

const STORE = process.env.WIKI_STORE || path.join(os.homedir(), '.wikipedia-store')
const SINCE = '2026-11-08T00:00:00Z'            // the storm was named on 9 November: text is kept from the day before
const SEED = { lang: 'pt', title: 'Depressão Charles' }
const SEASON_SEED = { lang: 'en', title: '2026–27 European windstorm season' }
// the storm's name as each language's press writes it: the phrase search and the title checks
const PHRASES = {
  pt: ['depressão Charles', 'tempestade Charles'], en: ['Storm Charles'], es: ['borrasca Charles'], gl: ['borrasca Charles'],
  fr: ['tempête Charles', 'dépression Charles'], de: ['Sturm Charles', 'Sturmtief Charles', 'Orkan Charles'], it: ['tempesta Charles'],
  ca: ['borrasca Charles', 'tempesta Charles'], nl: ['storm Charles'], eu: ['Charles ekaitza'], simple: ['Storm Charles'],
}
const TITLES = {
  pt: ['Depressão Charles', 'Tempestade Charles', 'Depressão Charles (2026)'], en: ['Storm Charles', 'Storm Charles (2026)', 'Cyclone Charles'],
  es: ['Borrasca Charles', 'Tormenta Charles'], gl: ['Borrasca Charles'], fr: ['Tempête Charles', 'Dépression Charles'],
  de: ['Sturmtief Charles', 'Sturm Charles', 'Orkan Charles'], it: ['Tempesta Charles'], ca: ['Borrasca Charles'], nl: ['Storm Charles'],
}
const host = lang => `${lang}.wikipedia.org`
const read = now()
const key = a => `${a.lang}-${a.page_id}`

// edit summaries can name editors (reverts, thanks, mentions): the name never reaches our files
function scrub(c) {
  if (!c) return ''
  // an editor's summary may name a chatbot product: the fact stays, the product's name does not (no model names in what we push)
  let s = c.replace(/\b(ChatGPT|GPT-?\d[\w.]*|Claude|Gemini|Copilot|Grok|Llama|Mistral|DeepSeek|Perplexity)\b[^,;.)(]*(\s*\([^)]*\))?/gi, 'a named chatbot ')
    .replace(/\[\[\s*(Special|Especial|Spezial|Spécial|Speciale|Speciaal):[^\]|]*(Contrib|Contribuciones|Beiträge|Bijdragen)[^\]]*\]\]/gi, '[editor]')
    .replace(/\[\[\s*(User|Usuário|Usuária|Utilizador|Utilizadora|Usuario|Usuaria|Benutzer|Benutzerin|Utilisateur|Utilisatrice|Utente|Gebruiker|Usuari|Lankide)([ _](talk|Discussão|discusión|Diskussion|Discussion))?:[^\]]*\]\]/gi, '[editor]')
    .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[ip]').replace(/\b[0-9a-f]{1,4}(:[0-9a-f]{0,4}){4,7}\b/gi, '[ip]')
  if (/\b(revert|reverted|undid|undo|rollback|desfeita|desfez|revertid|reversão|deshecha|deshecho|revertido|annulation|révocation|rückgängig|zurückgesetzt|annullat|ongedaan|desfeta)\b/i.test(s)) {
    const m = s.match(/\b(\d{6,})\b/)
    return `(a revert${m ? ` of or to revision ${m[1]}` : ''}; the summary is withheld because such summaries name an editor)`
  }
  return s.replace(/\(\[\[[^\]]*\|(talk|discussão|disc\.?|discusión|Diskussion|discuter)\]\]\)/gi, '').replace(/\s+/g, ' ').trim().slice(0, 300)
}

// the storm's section in a season article: from the heading that names Charles to the next heading of the same or a higher level
function charlesSection(text) {
  const re = /^(={2,6})\s*(.*?)\s*\1\s*$/gm
  let m, start = -1, level = 0, heading = ''
  while ((m = re.exec(text))) {
    if (start < 0) { if (/Charles/.test(m[2])) { start = m.index; level = m[1].length; heading = m[2].replace(/\[\[|\]\]|'''?|\{\{[^}]*\}\}/g, '').trim() } }
    else if (m[1].length <= level) return { heading, text: text.slice(start, m.index) }
  }
  return start < 0 ? null : { heading, text: text.slice(start) }
}
const bytes = s => Buffer.byteLength(s, 'utf8')
const refCount = s => (s.match(/<ref[\s>]/gi) || []).length

async function info(lang, titles) {       // page info for up to 50 titles, redirects NOT followed
  const b = await api(host(lang), { action: 'query', prop: 'info|pageprops', ppprop: 'wikibase_item', titles: titles.join('|') })
  return (b?.query?.pages || []).filter(p => !p.missing && !p.invalid)
}
async function resolve(lang, title) {     // where a redirect lands (title and fragment)
  const b = await api(host(lang), { action: 'query', redirects: '1', titles: title })
  const r = b?.query?.redirects?.[0]
  return r ? { to: r.to, fragment: r.tofragment || null } : null
}
async function langlinks(lang, pageid) {  // the other languages of a page, as that wiki lists them
  const b = await api(host(lang), { action: 'query', prop: 'langlinks', pageids: String(pageid), lllimit: '500' })
  return (b?.query?.pages?.[0]?.langlinks || []).map(l => ({ lang: l.lang, title: l.title }))
}
const STORM_RE = /(Storm|Depress[ãa]o|Tempestade|Borrasca|Temp[êe]te|D[ée]pression|Sturmtief|Sturm|Orkan|Tempesta|Tormenta|Ciclone|Cyclone)\s+(\[\[[^\]|]*\|)?'*Charles\b/i
async function sitelinks(qid) {
  const b = await api('www.wikidata.org', { action: 'wbgetentities', ids: qid, props: 'sitelinks|labels', formatversion: '1' })
  const e = b?.entities?.[qid]; if (!e) return null
  const links = Object.values(e.sitelinks || {}).filter(s => /wiki$/.test(s.site) && !/(commons|species|meta|data|source|quote|news|books|versity|voyage)wiki$/.test(s.site) && !/wik(tionary|iquote)/.test(s.site))
    .map(s => ({ lang: s.site.replace(/wiki$/, '').replace(/_/g, '-'), title: s.title }))
  return { qid, labels: Object.fromEntries(Object.entries(e.labels || {}).map(([k, v]) => [k, v.value])), links }
}
async function history(lang, pageid, known) {   // every revision, oldest first; stops paging once it reaches what we hold
  const out = []
  let cont = {}
  for (;;) {
    const b = await api(host(lang), { action: 'query', prop: 'revisions', pageids: String(pageid), rvprop: 'ids|timestamp|size|comment|flags', rvlimit: '500', rvdir: 'older', ...cont })
    const revs = b?.query?.pages?.[0]?.revisions || []
    let hit = false
    for (const r of revs) { if (known.has(r.revid)) { hit = true; continue } out.push({ id: r.revid, parent: r.parentid || null, at: r.timestamp, bytes: r.size, minor: !!r.minor || undefined, summary: r.commenthidden ? '(summary hidden on Wikipedia)' : scrub(r.comment) }) }
    if (!b?.continue || (hit && known.size)) break
    cont = b.continue
  }
  return out.reverse()
}
async function contents(lang, ids) {     // wikitext of revisions, 20 per request, into the store outside git
  const got = {}
  for (let i = 0; i < ids.length; i += 20) {
    const b = await api(host(lang), { action: 'query', prop: 'revisions', revids: ids.slice(i, i + 20).join('|'), rvprop: 'ids|content', rvslots: 'main' })
    for (const p of b?.query?.pages || []) for (const r of p.revisions || []) {
      const t = r.slots?.main?.content
      if (typeof t !== 'string') continue
      fs.mkdirSync(path.join(STORE, lang), { recursive: true })
      fs.writeFileSync(path.join(STORE, lang, `${r.revid}.wiki`), t)
      got[r.revid] = t
    }
  }
  return got
}

// ---------- 1. discovery
const found = new Map()                   // lang|title -> { lang, title, why[] }
const add = (lang, title, why, extra = {}) => { const k = `${lang}|${title}`; const e = found.get(k) || { lang, title, why: [] }; if (!e.why.includes(why)) e.why.push(why); Object.assign(e, extra); found.set(k, e) }
const checked = []                        // what we looked at and found nothing in: said, not hidden
const log = s => process.stderr.write(s + '\n')

log('discovery: the storm article and its Wikidata item')
const seed = (await info(SEED.lang, [SEED.title]))[0]
let storm = null
if (seed) {
  add(SEED.lang, seed.title, 'the seed: the Portuguese article')
  for (const l of await langlinks(SEED.lang, seed.pageid)) add(l.lang, l.title, 'a language link of the Portuguese article')
  if (seed.pageprops?.wikibase_item) { storm = await sitelinks(seed.pageprops.wikibase_item); for (const l of storm?.links || []) add(l.lang, l.title, `Wikidata ${storm.qid} sitelink`) }
  if (!storm && seed.pageprops?.wikibase_item) storm = { qid: seed.pageprops.wikibase_item, labels: null, links: null, not_read: 'Wikidata did not answer this read (429 or an error); the language links of the article itself were used' }
}
log('discovery: the season article and its sitelinks')
const seasonSeed = (await info(SEASON_SEED.lang, [SEASON_SEED.title]))[0]
let season = null
const seasonPages = []
if (seasonSeed) {
  seasonPages.push({ lang: SEASON_SEED.lang, title: seasonSeed.title })
  for (const l of await langlinks(SEASON_SEED.lang, seasonSeed.pageid)) if (!seasonPages.some(p => p.lang === l.lang)) seasonPages.push(l)
  if (seasonSeed.pageprops?.wikibase_item) { season = await sitelinks(seasonSeed.pageprops.wikibase_item); for (const l of season?.links || []) if (!seasonPages.some(p => p.lang === l.lang)) seasonPages.push(l) }
  if (!season && seasonSeed.pageprops?.wikibase_item) season = { qid: seasonSeed.pageprops.wikibase_item, links: null, not_read: 'Wikidata did not answer this read; the language links of the English season article were used' }
}
const seasonKeys = new Set(seasonPages.map(p => `${p.lang}|${p.title}`))
log(`discovery: title checks in ${Object.keys(TITLES).length} languages`)
for (const [lang, titles] of Object.entries(TITLES)) {
  const ps = await info(lang, titles)
  for (const p of ps) add(lang, p.title, 'a title checked by name', { is_redirect: !!p.redirect })
  checked.push({ lang, what: 'titles', asked: titles, found: ps.map(p => p.title), read: now() })
}
log(`discovery: phrase search in ${Object.keys(PHRASES).length} languages`)
for (const [lang, phrases] of Object.entries(PHRASES)) {
  const q = phrases.map(p => `"${p}"`).join(' OR ')
  const b = await api(host(lang), { action: 'query', list: 'search', srsearch: q, srlimit: '30', srprop: 'timestamp|size', srnamespace: '0' })
  const hits = (b?.query?.search || []).filter(h => h.timestamp >= SINCE)   // pages changed since the storm was named
  for (const h of hits) add(lang, h.title, `phrase search: ${q}`)
  checked.push({ lang, what: 'phrase search (main namespace, pages changed since 8 November)', asked: q, total_hits: b?.query?.searchinfo?.totalhits ?? null, kept: hits.map(h => h.title), read: now() })
}
for (const p of seasonPages) add(p.lang, p.title, 'the season article, or its page in this language', { season: true })

// ---------- 2. each page: what it is, its history, its text since the storm was named
const prevArticles = readJson('articles.json', { articles: [] })
const prevByKey = new Map((prevArticles.articles || []).map(a => [key(a), a]))
const articles = [], revIndex = [], changes = []
const byLang = {}
for (const f of found.values()) (byLang[f.lang] ||= []).push(f)

for (const [lang, list] of Object.entries(byLang)) {
  const infos = await info(lang, list.map(f => f.title))
  for (const p of infos) {
    const f = list.find(x => x.title === p.title) || { why: [] }
    log(`reading ${lang}: ${p.title}`)
    const a = { lang, title: p.title, url: pageUrl(host(lang), p.title), page_id: p.pageid, kind: null, found_by: f.why, wikidata: p.pageprops?.wikibase_item || null, size: p.length, last_revision: p.lastrevid, read: now(), label: 'evidence' }
    if (p.redirect) { const r = await resolve(lang, p.title); a.kind = 'redirect'; a.redirects_to = r?.to || null; a.fragment = r?.fragment || null
      const ours = r?.to && (seasonKeys.has(`${lang}|${r.to}`) || (lang === SEED.lang && r.to === seed?.title)) && (!r.fragment || /Charles/.test(r.fragment))
      if (!ours) { checked.push({ lang, what: 'a title checked by name: a redirect to another subject, not this storm', title: p.title, redirects_to: r?.to || null, fragment: r?.fragment || null, read: now() }); continue } }
    const file = `revisions/${key(a)}.json`
    const held = readJson(file, { revisions: [] })
    const known = new Set(held.revisions.map(r => r.id))
    const fresh = await history(lang, p.pageid, known)
    const listed = new Set([...fresh.map(r => r.id)])
    const revs = [...held.revisions, ...fresh].sort((x, y) => x.at < y.at ? -1 : x.at > y.at ? 1 : x.id - y.id)
    // text: every revision since SINCE that we have not measured yet (redirects: only the newest)
    // measured before but the text is gone (a new session: the store is outside git and does not survive): fetch it again
    const need = revs.filter(r => r.at >= SINCE && (r.sha256 === undefined || !fs.existsSync(path.join(STORE, lang, `${r.id}.wiki`)))).map(r => r.id)
    const want = a.kind === 'redirect' ? need.slice(-1) : need
    const texts = want.length ? await contents(lang, want) : {}
    for (const r of revs) {
      const t = texts[r.id]; if (t === undefined) continue
      r.sha256 = sha256(t); r.refs = refCount(t)
      const sec = charlesSection(t)
      r.names_charles = (f.season ? /Charles/ : STORM_RE).test(t)
      if (sec) { r.section_bytes = bytes(sec.text); r.section_refs = refCount(sec.text); r.section_heading = sec.heading }
    }
    const lastText = (() => { try { return fs.readFileSync(path.join(STORE, lang, `${p.lastrevid}.wiki`), 'utf8') } catch { return null } })()
    if (a.kind !== 'redirect') {
      const sec = lastText ? charlesSection(lastText) : null
      const whole = /Charles/.test(p.title)
      const named = lastText && (f.season ? /Charles/.test(lastText) : STORM_RE.test(lastText))
      a.kind = whole ? 'article' : sec && f.season ? 'section' : named ? 'mention' : 'no mention'
      if (sec && a.kind === 'section') { a.section = sec.heading; a.section_bytes = bytes(sec.text); a.section_refs = refCount(sec.text); a.section_url = `${a.url}#${encodeURIComponent(sec.heading.replace(/ /g, '_'))}` }
      if (lastText) a.refs = refCount(lastText)
      if (a.kind === 'mention') { const i = lastText.search(f.season ? /Charles/ : STORM_RE); a.mention_context = 'named without a section of its own (a list or table of the season\'s names, or a passing line)'; a.mention_at_byte = i }
    }
    a.created = revs[0]?.at || null
    a.revisions = revs.length
    a.last_changed = revs[revs.length - 1]?.at || null
    a.current_url = oldidUrl(host(lang), p.title, p.lastrevid)
    if (a.kind === 'section' || a.kind === 'mention') { const first = revs.find(r => r.names_charles); a.charles_first_named = first ? { revision: first.id, at: first.at, url: oldidUrl(host(lang), p.title, first.id), note: first.at <= SINCE.replace('00:00:00', '23:59:59') && revs.indexOf(first) === revs.findIndex(r => r.at >= SINCE) ? 'already named in the first revision we read the text of (8 November or the first after)' : undefined } : null }
    if (a.kind === 'section') { const first = revs.find(r => r.section_bytes); a.section_first = first ? { revision: first.id, at: first.at, url: oldidUrl(host(lang), p.title, first.id) } : null }
    a.revisions_file = file
    const before = prevByKey.get(key(a))
    if (!before) changes.push({ what: 'new page found', lang, title: a.title, kind: a.kind })
    else if (fresh.length) changes.push({ what: 'new revisions', lang, title: a.title, kind: a.kind, count: fresh.length, bytes_before: before.size, bytes_after: a.size, section_bytes_before: before.section_bytes, section_bytes_after: a.section_bytes, revisions: fresh.map(r => ({ id: r.id, at: r.at, bytes: r.bytes, summary: r.summary, url: oldidUrl(host(lang), a.title, r.id) })) })
    if (before && before.kind !== a.kind) changes.push({ what: 'kind changed', lang, title: a.title, from: before.kind, to: a.kind })
    if (a.kind === 'no mention') { checked.push({ lang, what: f.season ? 'the season article in this language, read in full' : 'a search hit, read in full', title: a.title, url: a.url, revision: p.lastrevid, found: f.season ? 'does not name Charles' : 'not about this storm (the words are near each other by chance)', read: a.read }); if (!before) changes.pop(); try { fs.unlinkSync(path.join(DIR, file)) } catch { } continue }
    writeJson(file, { about: `Every revision of ${lang}.wikipedia.org "${a.title}" (page ${a.page_id}), oldest first: id, parent, time (UTC), bytes of the whole page, the edit summary, and for revisions since 8 November 2026 the sha256 of the wikitext, its footnotes and the bytes of the storm's own section. No editor's name or address is requested or kept; summaries that name an editor (reverts) are withheld. Appended on each read, never rewritten. Text of Wikipedia is CC BY-SA 4.0; none is copied here beyond edit summaries.`, by: AGENT, tool: 'tools/wikipedia-read.mjs', updated: read, lang, title: a.title, page_id: a.page_id, url: a.url, history_url: `https://${host(lang)}/w/index.php?title=${encodeURIComponent(a.title.replace(/ /g, '_'))}&action=history`, licence: 'CC BY-SA 4.0', label: 'evidence', revisions: revs })
    revIndex.push({ key: key(a), lang, title: a.title, kind: a.kind, file, revisions: revs.length, first: a.created, last: a.last_changed, bytes: a.size, section_bytes: a.section_bytes })
    articles.push(a)
  }
  // a redirect's target found late (in a language already walked) is read on the next pass of this loop only if new
}
// pages we held before and did not find this time stay listed, marked
for (const [k, a] of prevByKey) if (!articles.some(x => key(x) === k)) { articles.push({ ...a, not_found_at: read }); changes.push({ what: 'not found on this read (kept)', lang: a.lang, title: a.title }) }
const order = { article: 0, section: 1, redirect: 2, mention: 3 }
articles.sort((a, b) => (order[a.kind] ?? 9) - (order[b.kind] ?? 9) || a.lang.localeCompare(b.lang) || a.title.localeCompare(b.title))

const count = k => articles.filter(a => a.kind === k).length
writeJson('articles.json', {
  about: 'Every Wikipedia page about Storm Charles (Portuguese: depressão Charles), in every language we could find one: an article of its own, a section of a season article, a redirect, or a mention in a list. Found through Wikidata\'s sitelinks, the sitelinks of the season article, title checks and a phrase search per language (checked: what was asked and what was not found). Wikipedia is evidence here (a tertiary source written by volunteers), never a fact. No editor is named. Wikipedia\'s text is CC BY-SA 4.0.',
  by: AGENT, tool: 'tools/wikipedia-read.mjs', updated: read, label: 'evidence', licence: 'CC BY-SA 4.0 (Wikipedia\'s text); this file holds titles, addresses, times and sizes only',
  how_read: `MediaWiki action API, maxlag=5, one request every ${GAP / 1000} s, client "${UA}"; read-only`,
  wikidata: { storm: storm ? { item: storm.qid, url: `https://www.wikidata.org/wiki/${storm.qid}`, labels: storm.labels, sitelinks: storm.links, not_read: storm.not_read } : null, season: season ? { item: season.qid, url: `https://www.wikidata.org/wiki/${season.qid}`, sitelinks: season.links?.length ?? null, not_read: season.not_read } : null },
  season_pages: seasonPages,
  counts: { article: count('article'), section: count('section'), redirect: count('redirect'), mention: count('mention'), languages: [...new Set(articles.map(a => a.lang))].sort() },
  articles, checked,
})
writeJson('revisions.json', { about: 'The revision histories of every Wikipedia page about Storm Charles: one file per page under revisions/ (so no file passes 256 KB). Times, sizes and edit summaries only; never an editor\'s name or address.', by: AGENT, tool: 'tools/wikipedia-read.mjs', updated: read, label: 'evidence', total_revisions: revIndex.reduce((n, r) => n + r.revisions, 0), pages: revIndex })

// ---------- 4. the log of reads (appended) and what changed
const reads = readJson('reads.json', { about: 'One entry per read of Wikipedia by tools/wikipedia-read.mjs, appended, never rewritten: when, what each page was at (last revision, bytes), what was new since the read before, and how the API answered (429s and waits are counted).', by: AGENT, reads: [] })
const firstRead = !reads.reads.length
reads.reads.push({ at: read, finished: now(), first_read: firstRead || undefined, pages: articles.filter(a => !a.not_found_at).map(a => ({ key: key(a), kind: a.kind, last_revision: a.last_revision, bytes: a.size, section_bytes: a.section_bytes, revisions: a.revisions })), changes: firstRead ? [{ what: 'first read: everything is new', pages: articles.length }] : changes, api: { ...stats } })
reads.updated = read
writeJson('reads.json', reads)

const hm = t => t ? `${t.slice(8, 10)} Nov, ${t.slice(11, 16)}` : ''
const prev = reads.reads[reads.reads.length - 2]
let md = `# What changed on Wikipedia since the last read\n\n> Kept by ${AGENT}, ${read.slice(8, 10)} November 2026, ${read.slice(11, 16)} UTC (written by tools/wikipedia-read.mjs on each read; the history of reads is [reads.json](reads.json))\n\n`
md += `**Read ${hm(read)} UTC**${prev ? `; the read before was ${hm(prev.at)} UTC` : ' (the first read)'}. Wikipedia is evidence here, never a fact; its text is CC BY-SA 4.0 and each revision is linked. No editor is named.\n\n`
if (firstRead) md += `The first read: ${articles.length} pages found (${count('article')} article, ${count('section')} sections, ${count('redirect')} redirects, ${count('mention')} mentions). See [articles.json](articles.json).\n`
else if (!changes.length) md += `Nothing changed: no new revision on any of the ${articles.length} pages, and no new page.\n`
else for (const c of changes) {
  if (c.what === 'new revisions') {
    md += `## ${c.lang}: ${c.title} (${c.kind}): ${c.count} new revision${c.count > 1 ? 's' : ''}, ${c.bytes_before} to ${c.bytes_after} bytes${c.section_bytes_after != null ? ` (the storm's section: ${c.section_bytes_before ?? '?'} to ${c.section_bytes_after})` : ''}\n\n| UTC | Bytes | Edit summary (the editor's words, CC BY-SA 4.0) | Revision |\n|---|---|---|---|\n`
    for (const r of c.revisions) md += `| ${hm(r.at)} | ${r.bytes} | ${(r.summary || '').replace(/\|/g, '/').replace(/[<>]/g, '') || '(none)'} | [${r.id}](${r.url}) |\n`
    md += '\n'
  } else md += `- **${c.what}**: ${c.lang}: ${c.title}${c.kind ? ` (${c.kind})` : ''}${c.from ? ` (${c.from} to ${c.to})` : ''}\n`
}
md += `\n## The reads so far\n\n| Read (UTC) | Pages | Changes | Requests | 429 waits |\n|---|---|---|---|---|\n${reads.reads.slice(-30).reverse().map(r => `| ${hm(r.at)} | ${r.pages.length} | ${r.first_read ? 'first read' : r.changes.length ? r.changes.map(c => `${c.lang}: ${c.what}${c.count ? ' (' + c.count + ')' : ''}`).join('; ') : 'none'} | ${r.api.requests} | ${r.api.waits_429} |`).join('\n')}\n`
fs.writeFileSync(path.join(DIR, 'changes.md'), md)
log(`done: ${articles.length} pages, ${revIndex.reduce((n, r) => n + r.revisions, 0)} revisions, ${changes.length} changes; ${JSON.stringify(stats)}`)
