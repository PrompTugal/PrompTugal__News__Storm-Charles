#!/usr/bin/env node
// The index of sources: from the hand-kept register (sources/registry.json) and what the site already cites, write
//   sources/sources.json   every body with its counts (timeline rows citing it; addresses of its hosts in our data and research),
//   sources/README.md     the page a reader meets before leaving for a source,
//   sources/meteoalarm/api-map.md   the API map as a page (from api-map.json).
// Run by hand after the register or the timeline changes (like tools/timeline.mjs): node tools/source-index.mjs
// Counts are counts of what is in this repository at the time run; nothing is fetched.
// Kept by incident.sources@web-summit.dinis. Zero dependencies.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BY = 'incident.sources@web-summit.dinis'
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const rd = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'))
const walk = (d, acc = []) => { if (!fs.existsSync(d)) return acc; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f, acc) : /\.(md|json)$/.test(e.name) && acc.push(f) } return acc }
const host = u => { try { return new URL(u).host.toLowerCase() } catch { return '' } }
const kept = () => { const d = new Date(now); return `${d.getUTCDate()} ${d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${d.getUTCFullYear()}, ${now.slice(11, 16)} UTC` }

const reg = rd('sources/registry.json')
// timeline rows per host (a row counts once per host)
const rows = {}, rowIds = {}
for (const inc of fs.readdirSync(path.join(ROOT, 'incidents'))) {
    const f = `incidents/${inc}/data/signals.json`
    if (!fs.existsSync(path.join(ROOT, f))) continue
    for (const it of rd(f).items || []) for (const h of new Set((it.sources || []).map(s => host(s.url)).filter(Boolean))) { rows[h] = (rows[h] || 0) + 1; (rowIds[h] ||= []).push({ incident: inc, id: it.id }) }
}
// addresses per host across the incident's files and research (sources/ itself is left out: it would count its own pages)
const mentions = {}
for (const f of [...walk(path.join(ROOT, 'incidents')), ...walk(path.join(ROOT, 'research'))]) {
    if (f.endsWith('signals.json')) continue
    for (const m of fs.readFileSync(f, 'utf8').matchAll(/https?:\/\/[a-zA-Z0-9.-]+/g)) { const h = host(m[0]); if (h) mentions[h] = (mentions[h] || 0) + 1 }
}
const claimed = new Set()
const GROUPS = [['official', 'Official bodies'], ['transport', 'Transport operators and venues'], ['reference', 'Reference and open data'], ['press', 'The press'], ['platform', 'Platforms']]
const sources = reg.sources.map(s => {
    for (const h of s.hosts) claimed.add(h)
    const ids = s.hosts.flatMap(h => rowIds[h] || [])
    const uniq = [...new Map(ids.map(x => [x.incident + x.id, x])).values()]
    const section = s.section && fs.existsSync(path.join(ROOT, 'sources', s.section.replace(/index\.html$/, 'README.md').replace(/\.html$/, '.md'))) ? s.section : null
    const entity = s.entity && fs.existsSync(path.join(ROOT, 'entities', s.entity + '.json')) ? s.entity : undefined
    return { ...s, entity, entity_page: entity ? `entities/${entity}.html` : undefined, page: section || `${s.id}/index.html`, section, section_planned: s.section && !section ? s.section : undefined, cited: { timeline_rows: uniq.length, row_ids: uniq.map(x => x.id), addresses_in_data_and_research: s.hosts.reduce((n, h) => n + (mentions[h] || 0), 0) } }
})
const unclaimed = Object.entries(mentions).filter(([h]) => !claimed.has(h) && !/promptugal\.news|sgit\.ai|creativecommons|github|w3\.org|schema\.org/.test(h)).sort((a, b) => b[1] - a[1])
fs.writeFileSync(path.join(ROOT, 'sources/sources.json'), JSON.stringify({
    about: 'Every outside body this site takes data from or cites, official bodies first. For each: who (bodies only, no people, no contact details), what it publishes, what we take, its hosts, the licence as published (or that we have not read it yet), and how often we cite it: timeline_rows (rows of the incident timeline with a link to one of its hosts) and addresses_in_data_and_research (how many of its addresses appear in incidents/ and research/). Counted from this repository at the time made; the register is sources/registry.json. Node ids (`node`) are stable.',
    made_by: 'tools/source-index.mjs', by: BY, updated: now,
    counts: { sources: sources.length, with_a_section: sources.filter(s => s.section).length, licence_read: sources.filter(s => s.licence.status === 'read').length, hosts_cited_but_not_registered: unclaimed.length },
    sources, not_yet_registered: unclaimed.slice(0, 80).map(([h, n]) => ({ host: h, addresses: n })),
}, null, 1) + '\n')

const lic = s => s.licence.status === 'read' ? `${s.licence.summary} ([terms](${s.licence.url}), read ${s.licence.read_utc.slice(0, 16).replace('T', ' ')} UTC)` : s.licence.status === 'not read yet' ? 'not read yet' : (s.licence.note || 'not read yet')
let md = `# Sources: every body this site takes data from\n\n> Kept by ${BY}, ${kept()}\n\nBefore you leave for a source, meet it here: who it is, what it publishes, what we take from it, under what licence, and how often this site cites it. ${sources.length} bodies so far; ${sources.filter(s => s.section).length} with a section of their own so far, MeteoAlarm first. The same as data: [sources.json](sources.json). **Not a warning service:** follow IPMA, ANEPC and your local authorities.\n\nA link in the *Their site* column leaves this site. *Rows* is how many rows of [the timeline](../incidents/2026-11-10-storm-charles/timeline.md) link to the body; *addresses* is how many of its addresses appear in our data and research. Counted ${now.slice(0, 16).replace('T', ' ')} UTC.\n`
for (const [g, title] of GROUPS) {
    const list = sources.filter(s => s.group === g).sort((a, b) => (b.section ? 1 : 0) - (a.section ? 1 : 0) || b.cited.timeline_rows - a.cited.timeline_rows || b.cited.addresses_in_data_and_research - a.cited.addresses_in_data_and_research)
    if (!list.length) continue
    md += `\n## ${title}\n\n| Body | Who | What we take | Rows | Addresses | Licence | Their site |\n|---|---|---|---|---|---|---|\n`
    for (const s of list) md += `| **[${s.name}](${s.section ? s.section.replace(/index\.html$/, 'README.md').replace(/\.html$/, '.md') : s.id + '/README.md'})**${s.entity ? ` · [entity](../entities/${s.entity}.html)` : ''}${s.owner ? ` (kept by ${s.owner.split('@')[0]}@)` : ''} | ${s.kind} | ${s.we_take} | ${s.cited.timeline_rows} | ${s.cited.addresses_in_data_and_research} | ${lic(s)} | [${s.hosts[0]}](https://${s.hosts[0]}/) |\n`
}
md += `\n## The licence map: can we access it, can we change it?\n\n| Body | Access | Change and republish | As published |\n|---|---|---|---|\n`
for (const s of sources.filter(s => s.licence.status === 'read')) md += `| ${s.name} | ${s.licence.access} | ${s.licence.manipulate} | ${s.licence.summary} ([terms](${s.licence.url})) |\n`
md += `\nFor the ${sources.filter(s => s.licence.status === 'not read yet').length} bodies marked *not read yet* we have not read the terms page ourselves: until we have, this site links to them and quotes short excerpts only, and keeps no copy of their pages in git. The press: text is quoted in short excerpts with a link, raw captures stay in a private vault (the site's rule). Each is read in the rounds to come, most cited first.\n\n## Not yet in the register\n\n${unclaimed.length} more hosts appear in our data and research (weather sites surveyed by incident.weatherwatch@, single articles). The most frequent: ${unclaimed.slice(0, 12).map(([h, n]) => `\`${h}\` (${n})`).join(', ')}. The full list is in [sources.json](sources.json) under \`not_yet_registered\`.\n\n## How this page is made\n\nThe register is [registry.json](registry.json), kept by hand; \`tools/source-index.mjs\` counts the citations and writes this page and [sources.json](sources.json). Each body has a stable node id (\`source:<id>\`) for the entity pages. Page captures (screenshots, hashes) are incident.archivist@'s; this section describes the sources and reads their feeds.\n`
fs.writeFileSync(path.join(ROOT, 'sources/README.md'), md)

// the API map as a page
const am = rd('sources/meteoalarm/api-map.json')
let a = `# MeteoAlarm: the API map\n\n> Kept by ${BY}, ${kept()}\n\n${am.about}\n\nRead ${am.read_utc.slice(0, 16).replace('T', ' ')} UTC. The same as data: [api-map.json](api-map.json). Back to [MeteoAlarm](README.md). Every address below leaves this site.\n\n## Is there history?\n\n**${am.history.question}** ${am.history.answer}\n\n*${am.history.label}.*\n\n## The hosts\n\n| Host | What it is | robots.txt |\n|---|---|---|\n${am.hosts.map(h => `| \`${h.host}\` | ${h.what} | ${h.robots_txt} |`).join('\n')}\n\n## The addresses\n\n| Address | Key? | It answered | What it returns | How we learnt of it |\n|---|---|---|---|---|\n${am.endpoints.map(e => `| \`${e.address}\` | ${e.auth || 'none'} | ${e.answered.replace(/\|/g, '/')} | ${(e.returns + (e.notes ? ' *' + e.notes + '*' : '')).replace(/\|/g, '/')} | ${e.learnt_from} |`).join('\n')}\n\n## Seen, not read\n\n${am.seen_not_read.map(s => `- \`${s.address}\`: ${s.what}. Why not: ${s.why_not}`).join('\n')}\n`
fs.writeFileSync(path.join(ROOT, 'sources/meteoalarm/api-map.md'), a)
console.log(`sources: ${sources.length} bodies, ${sources.filter(s => s.section).length} with a section, ${unclaimed.length} hosts not yet registered`)
