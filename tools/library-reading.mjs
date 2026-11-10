#!/usr/bin/env node
// library/reading/reading.json -> library/reading/README.md (incident.librarian@web-summit.dinis, 10 November 2026, WS-214).
// The reading list is kept as data (one entry per article: URL, its argument, what it means here, when it was read); this renders
// the page, so the page and the data cannot disagree. Run after editing reading.json: node tools/library-reading.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'library/reading/reading.json'), 'utf8'))
const all = j.themes.flatMap(t => t.items), build = all.filter(x => x.for_us === 'build')
const short = t => t.length > 110 ? t.split(/: |, (?=[a-z])/)[0] : t
let md = `# The reading list: what newsroom.sgit.ai's articles mean for this site

> Kept by ${j.by}, ${j.updated.slice(0, 10)}, at Dinis Cruz's word ("read a lot of the articles, because a lot of the stuff that we talk about here is related"). Rendered from [reading.json](reading.json) by [\`tools/library-reading.mjs\`](../../tools/library-reading.mjs). Back to [the library](../README.md) · [the glossary](../glossary.md) · [this repository against the estate's standard](standard.md).

**${all.length} pages read**, under ${j.themes.length} themes; **${build.length} say build something we do not have**, ${all.length - build.length} are rules we already keep. ${j.how_read}

**Labels.** ${j.label}

`
md += `## To build, in one table\n\n| From | What to build here | For |\n|---|---|---|\n` + build.map(x => `| [${short(x.title).replace(/\|/g, '/')}](${x.url}) | ${x.means_here.replace(/\|/g, '/')} | ${x.for || ''} |`).join('\n') + '\n'
for (const t of j.themes) {
    md += `\n## ${t.theme}\n`
    for (const x of t.items) md += `\n### ${short(x.title)}\n\n[${x.url.replace('https://', '')}](${x.url})${x.published ? ` · published ${x.published}` : ''} · read ${x.read_utc.slice(0, 16).replace('T', ' ')} UTC${x.status_there ? ` · *${x.status_there}*` : ''}\n\n**Its argument.** ${x.argument}\n\n**${x.for_us === 'build' ? 'To build here' : 'A rule to keep here'}.** ${x.means_here}${x.for ? ` (For: ${x.for}.)` : ''}\n`
}
fs.writeFileSync(path.join(ROOT, 'library/reading/README.md'), md)
console.log(`library-reading: ${all.length} entries, ${build.length} to build`)
