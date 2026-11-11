#!/usr/bin/env node
// Media watch, last step (incident.media@web-summit.dinis): from research/media/coverage.json's articles it writes
//   - coverage.json's header, counts and `official` list (official channels, from data/decisions/sources.json);
//   - outlets.json (per outlet: counts, by-lines as printed, what it does best, derived from the counts);
//   - ranking.md (who was first on six keyed facts; who is most sourced). Everything in it is labelled analysis.
//   [MEDIA_RAW=<dir>] node research/media/tools/rank.mjs     (with MEDIA_RAW, links to primary sources are counted
//   from the captures kept outside git; without it, the counts already in coverage.json are kept)
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const M = path.join(ROOT, 'research/media')
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'))
const cov = J(path.join(M, 'coverage.json')), outletsFile = J(path.join(M, 'outlets.json'))
const sources = J(path.join(ROOT, 'incidents/2026-11-10-storm-charles/data/decisions/sources.json'))
const RAW = process.env.MEDIA_RAW
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const hm = t => t ? t.slice(8, 10) + ' Nov ' + t.slice(11, 16) : ''
const A = cov.articles

// ---- links to primary sources (the bodies that decide or warn), counted in each capture
const PRIMARY = { 'ipma.pt': 'IPMA', 'prociv.gov.pt': 'ANEPC', 'prociv.pt': 'ANEPC', 'portugal.gov.pt': 'Government', 'mai.gov.pt': 'MAI', 'websummit.com': 'Web Summit', 'lisboa.pt': 'Câmara de Lisboa', 'metrolisboa.pt': 'Metro', 'carris.pt': 'Carris', 'cp.pt': 'CP', 'fertagus.pt': 'Fertagus', 'ttsl.pt': 'TTSL', 'lusoponte.pt': 'Lusoponte', 'infraestruturasdeportugal.pt': 'IP', 'ana.pt': 'ANA', 'e-redes.pt': 'E-REDES', 'amn.pt': 'AMN', 'dre.pt': 'Diário da República', 'diariodarepublica.pt': 'Diário da República', 'madeira.gov.pt': 'Madeira Government', 'aemet.es': 'AEMET', 'meteofrance.com': 'Météo-France', 'metoffice.gov.uk': 'Met Office' }
if (RAW) for (const a of A) {
    if (!a.capture_sha256) continue
    const f = path.join(RAW, a.capture_sha256.slice(0, 16) + '.html'); if (!fs.existsSync(f)) continue
    const html = fs.readFileSync(f, 'utf8'); const found = new Set()
    for (const m of html.matchAll(/href=["']https?:\/\/([^"'\/?#]+)/g)) { const h = m[1].toLowerCase().replace(/^www\./, ''); for (const d in PRIMARY) if (h === d || h.endsWith('.' + d)) found.add(PRIMARY[d]) }
    a.links_to_primary = [...found].sort()
}
// ---- by-line kinds
const AGENCY = /^(ag[êe]ncia )?lusa$|\/lusa$|^lusa\/|^reuters$|^afp$|^ap$|^efe$/i
const outletNames = new RegExp('^(' + outletsFile.outlets.map(o => o.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + '|negócios|público brasil|rádio observador|redação.*|eco seguros|notícias ao minuto|rádio e televisão de portugal|dn|sic|tvi|cnn)$', 'i')
const kindOf = b => !b.length ? 'none' : b.every(n => AGENCY.test(n)) ? 'agency' : b.every(n => AGENCY.test(n) || outletNames.test(n)) ? (b.some(n => AGENCY.test(n)) ? 'agency' : 'desk') : 'named'
for (const a of A) a.byline_kind = kindOf(a.byline || [])

// ---- the keyed facts (facts.json): each outlet's first item, an article or a timed entry inside its live blog
const FACTS = J(path.join(M, 'facts.json')).facts
const LIVE = fs.existsSync(path.join(M, 'live-entries.json')) ? J(path.join(M, 'live-entries.json')) : { entries: [], blogs: [] }
const oName = id => (outletsFile.outlets.find(o => o.id === id) || {}).name || id
const events = FACTS.map(e => {
    const from = e.from || e.primary_time, until = e.until || '2026-11-11T12:00:00Z', re = new RegExp(e.pattern, 'i')
    const items = []
    for (const a of A) if (a.published && a.published >= from && a.published < until && !a.published_precision && a.kind !== 'live' && re.test(a.title)) items.push({ outlet: a.outlet, published: a.published.replace(/\.\d+Z$/, 'Z'), via: a.kind, byline: a.byline, byline_kind: a.byline_kind, title: a.title, url: a.url, article: a.id })
    for (const l of LIVE.entries) if (l.fact === e.id) items.push({ outlet: l.outlet, published: l.at, via: 'live blog entry', byline: [], byline_kind: 'not kept', title: l.title, url: l.url })
    items.sort((x, y) => x.published.localeCompare(y.published))
    const firsts = new Map(); for (const it of items) if (!firsts.has(it.outlet)) firsts.set(it.outlet, it)
    const rows = [...firsts.values()].map((r, i) => ({ rank: i + 1, ...r, minutes_after_primary: e.primary_time ? Math.round((Date.parse(r.published) - Date.parse(e.primary_time)) / 60000) : null }))
    return { id: e.id, what: e.what, primary_time: e.primary_time, primary_note: e.primary_note, primary_label: e.primary_label, quoted: e.quoted, notes: e.notes, items_matched: items.length, first_by_outlet: rows }
})
fs.writeFileSync(path.join(M, 'first-on-each-fact.json'), JSON.stringify({ about: 'Who was first on each keyed fact (facts.json), among the outlets we could read: each outlet\'s first article (by its title) or first timed entry inside its live blog, in order of the time the page itself gives, and the minutes after the primary source\'s time. Analysis over evidence. Absent outlets were not readable by a bot; see README.md.', by: 'incident.media@web-summit.dinis', label: 'analysis', updated: now, facts: events }, null, 1) + '\n')

// ---- per outlet
const per = {}
for (const a of A) {
    const p = per[a.outlet] ||= { items: 0, article: 0, live: 0, video: 0, opinion: 0, named: 0, agency: 0, desk: 0, none: 0, with_primary_links: 0, primary_bodies: new Set(), bylines: {}, first: null, last: null }
    p.items++; p[a.kind]++; p[a.byline_kind]++
    if (a.links_to_primary && a.links_to_primary.length) { p.with_primary_links++; a.links_to_primary.forEach(x => p.primary_bodies.add(x)) }
    if (a.byline_kind === 'named') for (const n of a.byline) if (!AGENCY.test(n) && !outletNames.test(n)) p.bylines[n] = (p.bylines[n] || 0) + 1
    if (a.published) { if (!p.first || a.published < p.first) p.first = a.published; if (!p.last || a.published > p.last) p.last = a.published }
}
const maxItems = Math.max(...Object.values(per).map(p => p.items))
for (const o of outletsFile.outlets) {
    const p = per[o.id]
    if (!p && o.automated_reading) { o.seen = { items: 0 }; o.does_best = 'not read: its terms forbid automated reading'; o.wire_share = null; delete o.bylines_as_printed; continue }
    if (!p) { o.seen = { items: 0 }; o.does_best = 'not read: no public feed or sitemap answered a bot, and none of its pages is cited yet'; continue }
    const best = []
    if (p.items === maxItems) best.push('volume: the most items in the list')
    for (const e of events) { const r = e.first_by_outlet.find(r => r.outlet === o.id); if (r && r.rank === 1) best.push(`first on "${e.what}"`) }
    if (p.live) best.push('a running live blog')
    if (p.items >= 4 && p.named / p.items >= 0.6) best.push('own reporting: most items carry a reporter\'s by-line')
    if (p.items >= 4 && p.agency / p.items >= 0.6) best.push('the agency wire, fast and complete (most items are Lusa\'s)')
    if (p.video >= 3) best.push('video')
    if (p.with_primary_links >= 3 && p.with_primary_links / p.items >= 0.3) best.push('links to the primary sources')
    if (/^en/.test(o.lang)) best.push('coverage in English')
    if (p.none === p.items) best.push('(by-lines not read: the pages refuse a bot or print none in their metadata)')
    o.wire_share = p.items - p.none ? +(p.agency / (p.items - p.none)).toFixed(2) : null
    o.wire_share_note = p.items - p.none ? `${p.agency} of the ${p.items - p.none} items whose by-line we read carry the agency's (Lusa's) by-line` : 'no by-line read'
    o.seen = { items: p.items, articles: p.article, live: p.live, video: p.video, opinion: p.opinion, first_published: p.first, last_published: p.last, byline_named: p.named, byline_agency: p.agency, byline_desk: p.desk, byline_not_read: p.none, items_linking_primary_sources: p.with_primary_links, primary_bodies_linked: [...p.primary_bodies].sort() }
    o.bylines_as_printed = Object.entries(p.bylines).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name, items]) => ({ name, items }))
    o.does_best = best.join('; ') || 'nothing stands out in this sample'
}
outletsFile.about = 'The outlets seen covering Storm Charles (Lisbon, 10 to 12 November 2026), each with what coverage.json shows of it: counts, the by-lines as printed on its articles (reporters in their public professional role only: a name and a count, nothing else), and what it does best, derived from those counts and not from reputation (analysis). Kept by incident.media@web-summit.dinis; written by research/media/tools/rank.mjs.'
outletsFile.updated = now
outletsFile.by = 'incident.media@web-summit.dinis'
outletsFile.label = 'analysis (hypothesis) over evidence: the counts are of what we could read'
fs.writeFileSync(path.join(M, 'outlets.json'), JSON.stringify(outletsFile, null, 1) + '\n')

// ---- official channels (from the researcher's sources.json: read, not copied by hand)
const OFFICIAL = { 'ipma-warnings': ['IPMA', 'meteorological service: the warnings'], 'ipma-communiques': ['IPMA', 'special communiqués'], 'anepc-news': ['ANEPC', 'civil protection: news and communiqués'], 'anepc-avisos': ['ANEPC', 'public warnings (Avisos)'], 'gov-alert': ['Government', 'the alert declaration'], 'gov-news': ['Government', 'news list'], mai: ['Ministry of Internal Administration', 'statements'], lisboa: ['Câmara Municipal de Lisboa', 'municipal measures'], 'lisboa-informacao': ['Câmara Municipal de Lisboa', 'city news'], metro: ['Metropolitano de Lisboa', 'service notices'], carris: ['Carris', 'service notices'], cp: ['CP', 'train notices'], ttsl: ['Transtejo Soflusa', 'ferry notices'], lusoponte: ['Lusoponte', 'bridge restrictions'], 'rede-expressos': ['Rede Expressos', 'coach suspensions'], airport: ['Lisbon airport (ANA)', 'airport notices'], amn: ['Autoridade Marítima Nacional', 'maritime warnings'], fil: ['FIL (venue)', 'venue notices'], 'meo-arena': ['MEO Arena (venue)', 'venue notices'], 'websummit-update-2026': ['Web Summit', 'the decision page'], 'websummit-blog': ['Web Summit', 'the blog: where announcements are posted'], 'websummit-bluesky': ['Web Summit', 'Bluesky account'], 'websummit-youtube': ['Web Summit', 'YouTube channel'], 'websummit-x': ['Web Summit', 'X account'], 'websummit-instagram': ['Web Summit', 'Instagram account'], 'websummit-linkedin': ['Web Summit', 'LinkedIn page'] }
cov.official = {
    about: 'The official channels on the storm: the bodies that decide or warn, and the organiser. Read from data/decisions/sources.json (kept by incident.researcher@), which holds what each contains and how a machine reads it; `status` and `read` are that file\'s. Official accounts on X, Instagram, Facebook and LinkedIn cannot be read without a login. Organisations\' accounts that can be read are under `social.accounts`.',
    from: 'incidents/2026-11-10-storm-charles/data/decisions/sources.json', from_updated: sources.updated,
    channels: sources.sources.filter(s => OFFICIAL[s.id]).map(s => ({ body: OFFICIAL[s.id][0], channel: OFFICIAL[s.id][1], url: /public\.api\.bsky/.test(s.url) ? 'https://bsky.app/profile/websummit.bsky.social' : /youtube\.com\/feeds/.test(s.url) ? 'https://www.youtube.com/channel/' + s.url.split('channel_id=')[1] : s.url, source_id: s.id, status: s.status, read: s.read || sources.updated, readable_without_login: !/x\.com|instagram|linkedin/.test(s.url) || undefined, label: 'fact when read at this channel' }))
}
const header = {
    about: 'Who is covering Storm Charles (Lisbon, 10 to 12 November 2026): press articles and live blogs (`articles`), the official channels (`official`) and what can be read of social platforms without a login (`social`). Every article: outlet, URL, title, the time the page itself says it was published (UTC), the by-line as the page prints it, the time we read it, and the sha256 of our capture (the capture is kept outside git). All of it is evidence: reported by others. Not a warning service: follow IPMA and ANEPC.',
    by: 'incident.media@web-summit.dinis', updated: now,
    rules: ['People appear only as a by-line printed on a public article or as a body\'s official account: a name, nothing else. No contact details, no profiles, no private individuals.', 'Posts by individuals on social platforms are counted, never listed.', 'Titles are quoted as short excerpts with a link; no article text is kept here.', 'Times are UTC (Lisbon is on UTC in November). A time the page gives without an offset is taken as Lisbon time and says so in `published_from`.'],
    how: 'research/media/tools/harvest.mjs (feeds.json, the incident\'s cited URLs) -> social.mjs -> rank.mjs. See README.md for the limits.',
    limits: ['Only outlets whose public feed, news sitemap or cited page answered a plain bot are here: SIC Notícias, Jornal de Notícias, TSF, Renascença, The Guardian and AP refused (403), so their absence says nothing about their coverage.', 'Where a page refused but its feed or sitemap listed it (Expresso, The Portugal News, Bloomberg), the title and time are the feed\'s and the by-line was not read.', 'A live blog has one publication time; the minute of each entry inside it is not in this file.', 'Feeds scroll: items older than a feed\'s window at the first read (23:45 UTC, 10 November) are missing unless cited elsewhere in the incident.'],
    counts: { articles: A.length, outlets: Object.keys(per).length, by_kind: A.reduce((m, a) => (m[a.kind] = (m[a.kind] || 0) + 1, m), {}), by_byline_kind: A.reduce((m, a) => (m[a.byline_kind] = (m[a.byline_kind] || 0) + 1, m), {}), wire_share: +(A.filter(a => a.byline_kind === 'agency').length / A.filter(a => a.byline_kind !== 'none').length).toFixed(2), wire_share_note: 'items with the agency\'s (Lusa\'s) by-line, over items whose by-line we read', first_published: A.map(a => a.published).filter(Boolean).sort()[0], last_published: A.map(a => a.published).filter(Boolean).sort().pop() }
}
const { articles, social, official, articles_updated, removed } = cov
fs.writeFileSync(path.join(M, 'coverage.json'), JSON.stringify({ ...header, articles_updated, removed, official, social, articles }, null, 1) + '\n')

// ---- ranking.md
const NONE = e => `| | **none found**: no article title and no live-blog entry we could read reported it by ${hm(now)} UTC | | | | |\n`
const link = (t, u) => `[${t.replace(/[\[\]|]/g, ' ').trim()}](${u})`
const cut = (t, n = 70) => t.length > n ? t.slice(0, n - 1).trim() + '…' : t
let md = `# Media watch: who is fastest, who is most sourced\n\n> Kept by incident.media@web-summit.dinis, ${now.slice(0, 10)}, ${now.slice(11, 16)} UTC. **Label: analysis**, computed from [coverage.json](coverage.json): ${A.length} items from ${Object.keys(per).length} outlets, each read from the outlet's own page, feed or news sitemap. It ranks **only what we could read**: SIC Notícias, Jornal de Notícias, TSF, Renascença, The Guardian and AP refused a bot, and a live blog's entries are not timed here, so a live blog that carried the news first can look slower than it was. A ranking of a sample, not a verdict on anyone's journalism. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).\n\n## Who was first on each fact\n\nThe keyed facts ([facts.json](facts.json)). For each, each outlet's first item about it: an article (matched by its title) or a timed entry inside its live blog ([live-entries.json](live-entries.json): Jornal de Negócios, Diário de Notícias, Observador, RTP), in order of the time the page itself gives. As data: [first-on-each-fact.json](first-on-each-fact.json).\n`
for (const e of events) {
    md += `\n### ${e.what}\n\n${e.primary_time ? `Primary source time: **${hm(e.primary_time)} UTC** (${e.primary_label}: ${e.primary_note}).` : `**Primary source time: unknown** (${e.primary_note}).`}\n\n| # | Outlet | Published (UTC) | After the primary | By-line as printed, or live entry | Item |\n|---|---|---|---|---|---|\n`
    for (const r of e.first_by_outlet.slice(0, 12)) md += `| ${r.rank} | ${oName(r.outlet)} | ${hm(r.published)} | ${r.minutes_after_primary === null ? 'unknown' : r.minutes_after_primary >= 0 ? '+' + r.minutes_after_primary + ' min' : r.minutes_after_primary + ' min (before the page)'} | ${r.via === 'live blog entry' ? 'live blog entry' : r.byline.join(', ') || 'not read'} | ${link(cut(r.title), r.url)} |\n`
    if (!e.first_by_outlet.length) md += NONE(e)
    if (e.quoted) md += `\nWhom they quote at IPMA, as printed (role and outlet only):\n\n${e.quoted.map(q => `- **${oName(q.outlet)}**, ${q.item}: ${q.attribution_as_printed}`).join('\n')}\n`
    if (e.notes) md += `\n${e.notes.map(n => '- ' + n).join('\n')}\n`
}
md += `\nNotes: the organisers' email to attendees went at 19:38 (no public URL; in [the timeline](../../incidents/2026-11-10-storm-charles/timeline.md)). Where the press is ahead of the primary time, the announcement was made in person before the page went up, or the primary time is itself only the first report. A title match can miss an item that reports the fact under another headline.\n`
const rows = outletsFile.outlets.filter(o => o.seen && o.seen.items).sort((a, b) => b.seen.items - a.seen.items)
md += `\n## Most sourced\n\nTwo measures, both countable from the pages: **whose reporting it is** (a reporter's by-line, the agency wire, or the outlet's desk) and **whether the page links to a primary source** (IPMA, ANEPC, the government, the Câmara, an operator, the organiser). A link is not the same as sourcing: broadcasters quote officials on air without linking, and agency copy names its sources in the text. Read the columns as what they are.\n\n| Outlet | Items | Reporter's by-line | Agency (Lusa) | Wire share | Desk | By-line not read | Items linking a primary source | Bodies linked |\n|---|---|---|---|---|---|---|---|---|\n`
for (const o of rows) md += `| ${o.name} | ${o.seen.items} | ${o.seen.byline_named} | ${o.seen.byline_agency} | ${o.wire_share === null ? 'n/a' : Math.round(o.wire_share * 100) + '%'} | ${o.seen.byline_desk} | ${o.seen.byline_not_read} | ${o.seen.items_linking_primary_sources} | ${o.seen.primary_bodies_linked.join(', ') || ''} |\n`
const byPrimary = rows.filter(o => o.seen.items >= 4).map(o => ({ o, share: o.seen.items_linking_primary_sources / o.seen.items })).sort((a, b) => b.share - a.share).slice(0, 5)
const byNamed = rows.filter(o => o.seen.items >= 4 && o.seen.byline_not_read < o.seen.items).map(o => ({ o, share: o.seen.byline_named / o.seen.items })).sort((a, b) => b.share - a.share).slice(0, 5)
md += `\nAmong outlets with at least four items:\n\n- **Highest share of items linking a primary source:** ${byPrimary.map(x => `${x.o.name} (${Math.round(x.share * 100)}%)`).join(', ')}.\n- **Highest share of items with a reporter's by-line:** ${byNamed.map(x => `${x.o.name} (${Math.round(x.share * 100)}%)`).join(', ')}.\n- **The wire underneath:** ${A.filter(a => a.byline_kind === 'agency').length} of ${A.length} items carry Lusa's by-line, across ${new Set(A.filter(a => a.byline_kind === 'agency').map(a => a.outlet)).size} outlets. Much of what looks like many outlets is one agency, published many times.\n`
md += `\n## What each outlet does best (from these counts)\n\n| Outlet | Kind | Does best |\n|---|---|---|\n`
for (const o of rows) md += `| ${o.name} | ${o.kind} | ${o.does_best} |\n`
md += `\n## By-lines, as printed\n\nReporters whose names are printed on the items in the list, by outlet, with the number of items. A by-line is a public professional credit; nothing else about anyone is kept. A wrong or missing by-line: [tell us](../../contribute.md).\n\n`
for (const o of rows) if (o.bylines_as_printed && o.bylines_as_printed.length) md += `- **${o.name}:** ${o.bylines_as_printed.map(b => b.name + (b.items > 1 ? ` (${b.items})` : '')).join(', ')}\n`
md += `\n## How to read this\n\n- Publication times are the page's own (its JSON-LD or meta tags), in UTC. Pages are updated after publication; where the page says so, coverage.json has \`modified\`.\n- "After the primary" is measured against the time of the primary source given above each table. Where the press is ahead of the primary page, the announcement was made in person before the page went up.\n- The method, the code and the limits: [README](README.md). The data: [coverage.json](coverage.json), [outlets.json](outlets.json).\n`
fs.writeFileSync(path.join(M, 'ranking.md'), md)
console.error(`rank: ${A.length} articles, ${Object.keys(per).length} outlets, events: ${events.map(e => e.first_by_outlet.length).join('/')}`)
