#!/usr/bin/env node
// capture-pages.mjs: the page of every capture, made at build time from the records in git.
//   node tools/capture-pages.mjs --out <dir>      writes <dir>/evidence/<id>.md for each evidence/<id>.json (the build renders it)
// It writes only into --out, never a tracked file, reads no git history and calls nothing outside. The records, the indexes and
// the vault copies are made by tools/capture-records.mjs (run by the archivist); this only draws them.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EV = path.join(ROOT, 'evidence')
const args = process.argv.slice(2), oi = args.indexOf('--out')
if (oi < 0 || !args[oi + 1]) { console.log('usage: node tools/capture-pages.mjs --out <dir>'); process.exit(2) }
const OUT = path.resolve(args[oi + 1])
if (OUT === ROOT) { console.log('capture-pages.mjs: --out must not be the repository'); process.exit(2) }
const BY = 'incident.archivist@web-summit.dinis'
const walk = (d, acc = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f, acc) : /^\d{4}-.*\.json$/.test(e.name) && acc.push(f) } return acc }
const utc = iso => `${+iso.slice(8, 10)} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}, ${iso.slice(11, 16)} UTC`
const mdEsc = s => String(s || '').replace(/\s*\|\s*/g, ' · ').replace(/\[/g, '(').replace(/\]/g, ')').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim()   // the build's markdown has no escapes
const realChange = x => !!(x.changed?.text && x.review?.verdict !== 'same content')
const depth = id => '../'.repeat(id.split('/').length)
const all = walk(EV).map(f => JSON.parse(fs.readFileSync(f, 'utf8'))).sort((a, b) => a.read_utc.localeCompare(b.read_utc) || a.id.localeCompare(b.id))
const chains = new Map()
for (const r of all) { if (!chains.has(r.url)) chains.set(r.url, []); chains.get(r.url).push(r) }
for (const r of all) {
    const chain = chains.get(r.url)
    const base = depth(r.id), name = path.basename(r.id)
    const chg = r.review?.verdict === 'same content' ? `the hash of the visible text differs from ${utc(r.changed.since)}, but read by the archivist: **same content**. ${mdEsc(r.review.why)}` : r.failed ? r.failed : r.changed == null ? (r.captured ? 'the first capture of this address' : 'not captured') : r.changed.text ? `**changed** since ${utc(r.changed.since)} (the visible text differs)` : `unchanged since ${utc(r.changed.since)} (the same visible text)`
    const rows = chain.map(x => `| ${x === r ? '**this one**' : `[${utc(x.read_utc)}](${base}evidence/${x.id}.md)`} | ${utc(x.read_utc)} | ${x.captured ? x.status : 'not captured'} | ${x.failed ? 'server error' : x.changed == null ? 'first' : realChange(x) ? 'changed' : x.changed.text ? 'same content (rendered differently)' : 'unchanged'} | \`${(x.sha256_text || '').slice(0, 16)}\` |`).join('\n')
    const md = `---
title: ${(r.title || r.host).replace(/"/g, "'").replace(/\n/g, ' ')} · as read ${utc(r.read_utc)}
summary: Our capture of ${r.url} as it was at ${utc(r.read_utc)}: the screenshot, the hashes, earlier and later captures, then the link out.
mount: <div id="evidence" data-id="${r.id}" data-base="${base}"><p class="meta">The picture needs JavaScript: it is read from the display vault and checked against the hash below. Everything else on this page is here without it.</p></div>
head: <link rel="stylesheet" href="${base}app/evidence/evidence.css"><script src="${base}app/evidence/vault-reader.js" defer></script><script src="${base}app/evidence/evidence.js" defer></script>
---
## The record

> Kept by ${BY}, ${utc(r.updated).replace(/, (\d\d:\d\d) UTC/, ', $1 UTC')}

**Evidence** (a page reported by its own publisher, kept as we read it). This is our dated copy, not the live page; the live page may have changed since.

| | |
|---|---|
| Address | \`${r.url}\` |
| Source | ${mdEsc(r.source_name)} (${r.kind}) |
| Read | ${utc(r.read_utc)} (\`${r.read_utc}\`) |
| Answer | ${r.captured ? `HTTP ${r.status}${r.headers?.['last-modified'] ? `; Last-Modified: ${r.headers['last-modified']}` : ''}${r.headers?.age ? `; served from a cache, age ${r.headers.age} s` : ''}` : `not captured: ${mdEsc(r.why)}`} |
| Title | ${mdEsc(r.title) || '(none)'} |
| Against the capture before | ${chg} |
${r.ignored ? `| Ignored when comparing | ${mdEsc(r.ignored)} |\n` : ''}${r.captured ? `| sha256 of the HTML as served | \`${r.sha256_html || 'not kept'}\` |
| sha256 of the visible text | \`${r.sha256_text}\` |
${r.sha256_screenshot ? `| sha256 of the screenshot | \`${r.sha256_screenshot}\` |\n` : ''}${r.clean ? `| sha256 of the second screenshot | \`${r.clean.sha256_screenshot}\` (${r.clean.what}) |\n` : ''}` : ''}| Shown here | ${r.shown ? `yes: the screenshot is read from display vault \`${r.vault.id}\`, path \`${r.vault.path}/\`` : r.captured ? 'no: the capture is kept privately; only the hash, title, time and a short excerpt are shown' : 'nothing to show'} |
| Licence | ${mdEsc(r.licence)} |
${r.terms ? `| Terms | the site's terms page: \`${r.terms.url}\` (read ${r.terms.read} by ${r.terms.read_by}) |\n` : ''}| Robots | ${mdEsc(r.robots)}; read as \`${r.client}\`, not logged in |
${r.excerpt ? `\n**The first words on the page** (a short excerpt): "${mdEsc(r.excerpt)}…"\n` : ''}
${r.diff ? `## What changed since the capture before

${r.diff.added} passage(s) of visible text are new and ${r.diff.removed} are gone (the text went from ${r.diff.chars_before} to ${r.diff.chars_after} characters). ${r.diff.added_text ? '' : 'The words are not shown for this source (its capture is kept privately).'}

${(r.diff.added_text || []).map(x => `- **new:** "${mdEsc(x)}"`).join('\n')}
${(r.diff.removed_text || []).map(x => `- **gone:** "${mdEsc(x)}"`).join('\n')}

` : ''}## Every capture of this address

| Capture | Read | Answer | Against the one before | Text hash |
|---|---|---|---|---|
${rows}

## The outside address

**This link leaves this site.** What you find there is the live page, which may no longer match the capture above: [${r.url}](${r.url})

The record as data: [${name}.json](${name}.json). All captures: [evidence](${base}evidence/README.md).
`
    const f = path.join(OUT, 'evidence', r.id + '.md')
    fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, md)
}
