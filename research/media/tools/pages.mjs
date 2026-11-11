#!/usr/bin/env node
// The media watch's pages (incident.media@web-summit.dinis): one page per outlet, the by-lines, one page per reporter
// with several pieces, and who cited whom. Written from the JSON in this folder, never by hand:
//   node research/media/tools/pages.mjs
// reads  coverage.json, outlets.json, licences.json, first-on-each-fact.json, facts.json
// writes outlets/README.md, outlets/<id>.md, people/README.md, people/<slug>.md, cites.json
// People: a by-line printed on a public article, and the list of those articles. Nothing else about anyone.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const M = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = f => JSON.parse(fs.readFileSync(path.join(M, f), 'utf8'))
const cov = J('coverage.json'), outlets = J('outlets.json').outlets, lic = fs.existsSync(path.join(M, 'licences.json')) ? J('licences.json') : { outlets: [] }, first = J('first-on-each-fact.json')
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const KEPT = `> Kept by incident.media@web-summit.dinis, ${now.slice(0, 10)}, ${now.slice(11, 16)} UTC.`
const hm = t => t ? `${+t.slice(8, 10)} Nov ${t.slice(11, 16)}` : 'no time'
const cut = (t, n = 90) => t.length > n ? t.slice(0, n - 1).trim() + '…' : t
const out = (t, u) => `[${t.replace(/[\[\]|]/g, ' ').replace(/\s+/g, ' ').trim()} ↗](${u})`      // ↗ : this link leaves the site
const A = cov.articles
const AGENCY = /^(ag[êe]ncia )?lusa$|\/lusa$|^lusa\//i
const slug = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const write = (rel, s) => { const f = path.join(M, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s) }
const NOT = 'Not a warning service: follow [IPMA ↗](https://www.ipma.pt/) and [ANEPC ↗](https://prociv.gov.pt/).'

// ---- who carried whose words (from by-lines and from what an item itself says): cites.json
const edges = new Map()
const edge = (from, to, verb, a, basis) => { const k = from + '|' + verb + '|' + to; const e = edges.get(k) || { from, verb, to, inverse: verb === 'published the wire of' ? 'was published by' : verb === 'republished' ? 'was republished by' : 'was relayed by', basis, items: 0, examples: [] }; e.items++; if (e.examples.length < 3 && a) e.examples.push({ title: a.title, url: a.url, published: a.published }); edges.set(k, e) }
const byName = new Map(outlets.flatMap(o => [[o.name.toLowerCase(), o.id], ...(o.id === 'negocios' ? [['negócios', o.id]] : [])]))
for (const a of A) for (const n of a.byline || []) {
    if (AGENCY.test(n) || /lusa/i.test(n)) edge(a.outlet, 'lusa', 'published the wire of', a, 'the item\'s by-line names the agency')
    else { const o = byName.get(n.toLowerCase()); if (o && o !== a.outlet) edge(a.outlet, o, 'republished', a, 'the item\'s by-line names the other outlet') }
}
for (const f of J('facts.json').facts) for (const q of f.quoted || []) if (/relay/i.test(q.attribution_as_printed) && /RTP/.test(q.attribution_as_printed)) edge(q.outlet, 'rtp', 'relayed', null, `the entry says so (${f.id}): ${q.attribution_as_printed}`)
const cites = [...edges.values()].sort((a, b) => b.items - a.items)
write('cites.json', JSON.stringify({ about: 'Who carried whose words on Storm Charles, as far as the pages themselves say: an item whose by-line names the agency (Lusa) or another outlet, and a live entry that says it relays another outlet. Edges are verbs with an inverse; counts are of items we could read. It does not see quotes or links inside an article\'s text. Evidence.', by: 'incident.media@web-summit.dinis', tool: 'research/media/tools/pages.mjs', updated: now, label: 'evidence', edges: cites }, null, 1) + '\n')

// ---- a page per outlet
const oName = id => (outlets.find(o => o.id === id) || {}).name || id
const seenOutlets = outlets.filter(o => o.seen && o.seen.items)
for (const o of outlets) {
    const items = A.filter(a => a.outlet === o.id), L = lic.outlets.find(l => l.outlet === o.id) || {}, s = o.seen || {}
    let md = `# ${o.name}: its coverage of Storm Charles\n\n${KEPT} One of [the outlets in the media watch](README.md). Everything here is **evidence** (what the outlet published, read from its own pages) or, where it compares, **analysis**. ${NOT}\n\n`
    if (o.automated_reading) md += `**We do not read this outlet by machine.** ${o.note}${o.description ? ' What it is: ' + o.description : ''}\n\n`
    md += `| | |\n|---|---|\n| Kind | ${o.kind} (${o.lang}) |\n| Items we read | ${s.items || 0}${s.items ? `: ${s.articles} articles, ${s.live} live, ${s.video} video, ${s.opinion} opinion` : ''} |\n`
    if (s.items) md += `| First and last | ${hm(s.first_published)} to ${hm(s.last_published)} UTC |\n| Whose reporting | ${s.byline_named} with a reporter's by-line, ${s.byline_agency} the agency's (Lusa), ${s.byline_desk} the desk's, ${s.byline_not_read} not read${o.wire_share !== null && o.wire_share !== undefined ? `; wire share ${Math.round(o.wire_share * 100)}%` : ''} |\n| Does best (from the counts) | ${o.does_best} |\n`
    else md += `| Why nothing is listed | ${o.automated_reading ? 'its terms forbid automated reading; we make no requests to it' : o.does_best} |\n`
    md += `\n## Against the key moments\n\n`
    const rows = first.facts.map(f => ({ f, r: f.first_by_outlet.find(r => r.outlet === o.id) })).filter(x => x.r)
    if (rows.length) {
        md += `Its first item on each keyed fact, and its place among the outlets we could read ([the full tables](../ranking.md)).\n\n| Fact | Primary source time | Its first item (UTC) | After the primary | Place | Item |\n|---|---|---|---|---|---|\n`
        for (const { f, r } of rows) md += `| ${f.what} | ${f.primary_time ? hm(f.primary_time) : 'unknown'} | ${hm(r.published)} (${r.via === 'live blog entry' ? 'live entry' : r.via}) | ${r.minutes_after_primary === null ? 'unknown' : (r.minutes_after_primary >= 0 ? '+' : '') + r.minutes_after_primary + ' min'} | ${r.rank} of ${f.first_by_outlet.length} | ${out(cut(r.title, 70), r.url)} |\n`
    } else md += `No item of this outlet matched a keyed fact by its title${s.items ? '' : ' (we read none of its items)'}.\n`
    md += `\n## Its sources, as far as its own pages say\n\n`
    const mine = cites.filter(e => e.from === o.id), theirs = cites.filter(e => e.to === o.id)
    if (s.items) md += `- **Links to primary sources:** ${s.items_linking_primary_sources} of ${s.items} items link to a body that decides or warns${s.primary_bodies_linked && s.primary_bodies_linked.length ? ` (${s.primary_bodies_linked.join(', ')})` : ''}. A link is not the same as sourcing: text and broadcasts name sources without linking.\n`
    for (const e of mine) md += `- **It ${e.verb} ${oName(e.to) === e.to && e.to === 'lusa' ? 'Lusa' : oName(e.to)}:** ${e.items} item${e.items > 1 ? 's' : ''} (${e.basis}).\n`
    for (const e of theirs) md += `- **${oName(e.from)} ${e.verb} it:** ${e.items} item${e.items > 1 ? 's' : ''} (${e.basis}).\n`
    if (!s.items && !mine.length && !theirs.length) md += `Not read.\n`
    md += `\n## Licence and terms, as it publishes them\n\n`
    if (L.outlet) {
        const t = L.terms, r = L.robots || {}
        md += `Read ${hm(L.read)} UTC from its own pages. A reading, not legal advice.\n\n| | |\n|---|---|\n| Footer line | ${typeof L.footer_line === 'string' ? (/^not /.test(L.footer_line) ? L.footer_line : '"' + L.footer_line.replace(/\|/g, ' ') + '"') : 'not stated'} |\n`
        md += `| Terms page | ${t && t.url ? out(t.labelled || 'terms', t.url) + (t.status === 200 ? '' : ` (answered ${t.status})`) : (typeof t === 'string' ? t : 'not stated')} |\n`
        if (t && t.excerpt_as_published) md += `| On reproduction, as printed (a short excerpt) | ${/^no clause/.test(t.excerpt_as_published) ? t.excerpt_as_published : '"' + t.excerpt_as_published.replace(/\|/g, ' ') + '"'} |\n`
        md += `| Machine-readable reservation (tdm-reservation) | ${typeof L.tdm_reservation === 'string' ? L.tdm_reservation : `${L.tdm_reservation.value} (${L.tdm_reservation.where})`} |\n`
        md += `| robots.txt | ${r.status === 200 ? `${r.all_agents_disallow_everything ? 'disallows everything to all agents' : 'does not close the site to all agents'}; AI crawlers it names and disallows: ${r.named_ai_crawlers_disallowed && r.named_ai_crawlers_disallowed.length ? r.named_ai_crawlers_disallowed.join(', ') : 'none of the ten we check'}` : `answered ${r.status} to a bot`} (${out('robots.txt', r.url || L.home + 'robots.txt')}) |\n`
        md += `| Can a machine read it? | ${o.automated_reading ? 'no: its terms forbid automated reading and AI use; we make no requests' : s.items ? (s.byline_not_read === s.items ? 'its feed or sitemap, yes; its article pages refuse a plain bot' : 'yes: its feed or sitemap and its article pages answered a plain bot') : 'no: feed, sitemap and pages refused a plain bot, or it has no feed we found'} |\n`
    } else md += `Not read yet.\n`
    md += `\n**What we do with its text**, whatever the above says: quote briefly (a title, a sentence) with a link; keep no article text; show no image or screenshot of its pages; keep our captures privately with their sha256 ([the repository's rules](../../../CLAUDE.md)). Changing, translating or republishing its text needs its permission: [a draft request exists for journalists and outlets](../../../outreach/index.html), unsent.\n`
    md += `\n## Reaching its newsroom\n\n${L.contact_page && L.contact_page.url ? `Through its own public page: ${out(L.contact_page.labelled || 'contacts', L.contact_page.url)}. We link to it and copy nothing from it: no address, number or name is kept here.` : `Its public contact page was not found by our reader${L.home ? ` (start at ${out(o.name, L.home)})` : ''}.`} Corrections to anything on this page: [contribute](../../../contribute.md).\n`
    if (o.bylines_as_printed && o.bylines_as_printed.length) md += `\n## By-lines on this story, as printed\n\n${o.bylines_as_printed.map(b => { const n = A.filter(a => (a.byline || []).includes(b.name)).length; return (n >= 3 ? `[${b.name}](../people/${slug(b.name)}.md)` : b.name) + (b.items > 1 ? ` (${b.items})` : '') }).join(', ')}. A by-line is a public professional credit; nothing else about anyone is kept ([all by-lines](../people/README.md)).\n`
    if (items.length) {
        md += `\n## What it published, in order\n\n| Published (UTC) | Kind | By-line as printed | Item |\n|---|---|---|---|\n`
        for (const a of items) md += `| ${hm(a.published)}${a.published_precision ? ' (day only)' : ''} | ${a.kind} | ${(a.byline || []).join(', ') || 'not read'} | ${out(cut(a.title, 100), a.url)} |\n`
    }
    write(`outlets/${o.id}.md`, md)
}
let idx = `# The outlets covering Storm Charles\n\n${KEPT} One page per outlet: what it published and when, how fast it was against the key moments, its sources as its own pages say, its licence and terms as it publishes them, and its own public contact page. Evidence and analysis; [how it is read, and the limits](../README.md). ${NOT}\n\n| Outlet | Kind | Items read | First on | Wire share | Terms page read | AI crawlers disallowed in robots.txt | Readable by a plain bot |\n|---|---|---|---|---|---|---|---|\n`
for (const o of [...outlets].sort((a, b) => ((b.seen || {}).items || 0) - ((a.seen || {}).items || 0))) {
    const L = lic.outlets.find(l => l.outlet === o.id) || {}, s = o.seen || {}, r = L.robots || {}
    const firsts = first.facts.filter(f => (f.first_by_outlet[0] || {}).outlet === o.id).length
    idx += `| [${o.name}](${o.id}.md) | ${o.kind} | ${s.items || 0} | ${firsts || ''} | ${o.wire_share === null || o.wire_share === undefined ? '' : Math.round(o.wire_share * 100) + '%'} | ${L.terms && L.terms.url && L.terms.status === 200 ? 'yes' : L.home_status && L.home_status !== 200 ? 'refused (' + L.home_status + ')' : 'not found'} | ${r.status === 200 ? (r.named_ai_crawlers_disallowed || []).length + ' of 10' : 'not read'} | ${s.items ? (s.byline_not_read === s.items ? 'feed only' : 'yes') : 'no'} |\n`
}
idx += `\n"First on": the number of keyed facts ([the tables](../ranking.md)) on which it was first among the outlets we could read. "Wire share": of its items whose by-line we read, the share that are the agency's (Lusa's).\n\n## Who carried whose words\n\nFrom by-lines, and from what an entry itself says. It does not see quotes or links inside an article's text.\n\n| Who | Verb | Whom | Items | How we know |\n|---|---|---|---|---|\n`
for (const e of cites) idx += `| [${oName(e.from)}](${e.from}.md) | ${e.verb} | [${e.to === 'lusa' ? 'Lusa' : oName(e.to)}](${e.to}.md) | ${e.items} | ${e.basis.replace(/\|/g, ' ')} |\n`
write('outlets/README.md', idx)

// ---- by-lines; a page per reporter with three or more pieces on this story
const people = new Map()
for (const a of A) for (const n of a.byline || []) { if (AGENCY.test(n) || /lusa|redação|^rádio|^eco|notícias ao minuto|^negócios$|público brasil|^dn\b|televisão/i.test(n) || byName.has(n.toLowerCase())) continue; (people.get(n) || people.set(n, []).get(n)).push(a) }
const firstsBy = new Map(); for (const f of first.facts) { const r = f.first_by_outlet[0]; if (r && r.via !== 'live blog entry') for (const n of r.byline || []) if (people.has(n)) (firstsBy.get(n) || firstsBy.set(n, []).get(n)).push(f.what) }
const plist = [...people.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
for (const f of fs.existsSync(path.join(M, 'people')) ? fs.readdirSync(path.join(M, 'people')) : []) if (f !== 'README.md') fs.rmSync(path.join(M, 'people', f))
let pm = `# By-lines on Storm Charles\n\n${KEPT} The reporters whose names are printed on the articles in [the coverage list](../README.md), with their pieces on this story. **A by-line is a public professional credit, and that is all this page holds:** a name as printed, the outlet, the pieces. No contact details, no profile, no account. A reporter with three or more pieces here has a page listing them. A wrong or missing by-line: [tell us](../../../contribute.md). ${NOT}\n\n${plist.length} by-lines on ${A.filter(a => (a.byline || []).some(n => people.has(n))).length} items. Agency copy (Lusa) and desk by-lines are counted on [each outlet's page](../outlets/README.md), not here.\n\n| By-line as printed | Outlet | Pieces | First among the outlets we read on | Latest piece |\n|---|---|---|---|---|\n`
for (const [n, its] of plist) {
    const os = [...new Set(its.map(a => a.outlet))], last = [...its].sort((a, b) => (b.published || '').localeCompare(a.published || ''))[0]
    pm += `| ${its.length >= 3 ? `[${n}](${slug(n)}.md)` : n} | ${os.map(o => `[${oName(o)}](../outlets/${o}.md)`).join(', ')} | ${its.length} | ${(firstsBy.get(n) || []).join('; ')} | ${hm(last.published)}: ${out(cut(last.title, 70), last.url)} |\n`
    if (its.length >= 3) {
        let p = `# ${n}: pieces on Storm Charles\n\n${KEPT} A by-line as printed on public articles, and the list of those articles; nothing else about the reporter is kept ([all by-lines](README.md)). Evidence. ${NOT}\n\nOutlet: ${os.map(o => `[${oName(o)}](../outlets/${o}.md)`).join(', ')}. ${its.length} pieces between ${hm(its[0].published)} and ${hm(its[its.length - 1].published)} UTC.${firstsBy.has(n) ? ` First among the outlets we could read on: ${firstsBy.get(n).join('; ')}.` : ''}\n\n| Published (UTC) | Kind | By-line as printed | Piece |\n|---|---|---|---|\n`
        for (const a of its) p += `| ${hm(a.published)} | ${a.kind} | ${a.byline.join(', ')} | ${out(cut(a.title, 100), a.url)} |\n`
        p += `\nTo reach the reporter, use the outlet's own public contact page (linked from [its page here](../outlets/${os[0]}.md)). A correction to this list: [contribute](../../../contribute.md).\n`
        write(`people/${slug(n)}.md`, p)
    }
}
write('people/README.md', pm)
console.error(`pages: ${outlets.length} outlets, ${plist.length} by-lines (${plist.filter(p => p[1].length >= 3).length} with a page), ${cites.length} cite edges`)
