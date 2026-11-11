#!/usr/bin/env node
// A small page and a source.json for every body in the register that has no folder of its own yet, so each body has
// one address (sources/<id>/) that a row, an entity or the index can land on. A generator: it writes only into --out
// (the build's _site), never a tracked file. A body gets a hand-written folder as its section is built; then this skips it.
//     node tools/source-pages.mjs --out _site
// Kept by incident.sources@web-summit.dinis. Zero dependencies.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const i = process.argv.indexOf('--out'); if (i < 0) { console.error('source-pages: --out <dir> is required'); process.exit(2) }
const OUT = path.resolve(process.argv[i + 1])
const all = JSON.parse(fs.readFileSync(path.join(ROOT, 'sources/sources.json'), 'utf8'))
const d = new Date(all.updated), kept = `${d.getUTCDate()} ${d.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' })} ${d.getUTCFullYear()}, ${all.updated.slice(11, 16)} UTC`
const inc = fs.readdirSync(path.join(ROOT, 'incidents')).find(x => fs.existsSync(path.join(ROOT, 'incidents', x, 'timeline.md')))
for (const s of all.sources) {
    if (fs.existsSync(path.join(ROOT, 'sources', s.id)) || (s.section && s.section.startsWith('../'))) continue
    const L = s.licence, dir = path.join(OUT, 'sources', s.id)
    const lic = L.status === 'read' ? `**${L.summary}.**${L.as_published ? `\n\n> ${L.as_published}` : ''}\n\nRead at [its terms page](${L.url}) on ${L.read_utc.slice(0, 16).replace('T', ' ')} UTC. Can we access it: ${L.access}. Can we change and republish it: ${L.manipulate}.${L.note ? ' ' + L.note + '.' : ''}` : `**Not read yet.** ${L.note || ''} Until its terms are read here, this site links to it and quotes short excerpts only.`
    const rows = s.cited.row_ids.length ? s.cited.row_ids.map(id => `[${id}](../../incidents/${inc}/timeline.md#${id})`).join(', ') : 'none'
    const md = `# ${s.name}\n\n> Kept by incident.sources@web-summit.dinis, ${kept}\n\n**Who.** ${s.kind[0].toUpperCase() + s.kind.slice(1)}.${s.entity ? ` Everything this site links to it: [its entity page](../../entities/${s.entity}.md).` : ''}\n\n**Not a warning service.** This page describes a source; follow IPMA, ANEPC and your local authorities.\n\n| | |\n|---|---|\n| What it publishes | ${s.publishes} |\n| What this site takes | ${s.we_take} |\n| Formats | ${(s.formats || ['web pages']).join(', ')} |\n| How often we read | ${s.reads || 'when a row or a data file needs it; no schedule'} |\n| Timeline rows that link to it | ${s.cited.timeline_rows}: ${rows} |\n| Its addresses in our data and research | ${s.cited.addresses_in_data_and_research} |\n| Kept by | ${s.owner || 'incident.sources@web-summit.dinis'} |\n\n## The licence\n\n${lic}\n\n## Its sites\n\nThese links leave this site.\n\n${s.hosts.map(h => `- [${h}](https://${h}/)`).join('\n')}\n\n## As data\n\n[source.json](source.json) (node id \`${s.node}\`). This page is made from the register by \`tools/source-pages.mjs\`; a fuller section (endpoints, what changes over time) replaces it as the body is studied. Back to [all sources](../README.md).\n`
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'README.md'), md)
    fs.writeFileSync(path.join(dir, 'source.json'), JSON.stringify({ ...s, made_by: 'tools/source-pages.mjs from sources/registry.json', by: 'incident.sources@web-summit.dinis', updated: all.updated }, null, 1) + '\n')
}
