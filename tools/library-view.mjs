#!/usr/bin/env node
// The file viewer's page (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:10 UTC: "every one of these
// JSON files, I need to be able to visualise it ... go down the rabbit hole until I run out of data").
//
//   node tools/library-view.mjs --out _site     writes _site/view/README.md (the build renders it as view/index.html) and
//                                               _site/view/index.json. Two small files, whatever the size of the site.
//
// ONE page shows every file:   view/?path=<the file's path>     (inside a JSON file:  &at=<field>/<index>/<field>)
// The page mounts library/viewer.js, which reads the file in the reader's browser, computes its sha256 from the bytes received,
// draws its values and its inferred schema, and takes "kept by", "made from" and "used by" from library/index.json.
// Until 02:25 UTC on 11 November this tool wrote one page per file (view/<path>.html); at about 600 files that was half of all
// the pages the gate had to check, so it now costs the build the same at 300 files and at 3,000 (incident.conductor@'s ask).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ME = 'incident.librarian@web-summit.dinis'
const outAt = process.argv.indexOf('--out'), OUT = outAt > 0 && process.argv[outAt + 1] ? path.resolve(process.argv[outAt + 1]) : ''
if (!OUT || OUT === ROOT) { console.error('library-view: --out <dir> is required (a directory other than the repository root); nothing written'); process.exit(2) }
let n = 0; try { n = JSON.parse(fs.readFileSync(path.join(OUT, 'library/index.json'), 'utf8')).entries.filter(e => e.served !== false).length } catch { }
const ex = 'incidents/2026-11-10-storm-charles/data/weather/warnings.json'
fs.mkdirSync(path.join(OUT, 'view'), { recursive: true })
fs.writeFileSync(path.join(OUT, 'view/README.md'), `---
title: Every file, shown
summary: Open any file on this site as a page: what it is, who keeps it, its sha256, where it is used, its values and its schema, and the raw bytes one click away.
mount: <div id="viewer" data-root="../"><p class="meta">The viewer needs JavaScript: it reads the file you ask for in your browser and draws it here. Without it, every file is listed in <a href="../library/index.html">the library</a> and served as itself.</p></div>
head: <script src="../library/viewer.js" defer></script>
---
# Every file, shown

> Kept by ${ME}. Written by [tools/library-view.mjs](?path=tools/library-view.mjs) on every push; the viewer is [library/viewer.js](?path=library/viewer.js). ${n ? `${n} files can be opened here.` : ''} The same files by kind, with their gaps: [the library](../library/README.md).

**The address pattern.** One page shows every file: \`view/?path=<the file's path>\`. For example [view/?path=${ex}](?path=${ex}). Inside a JSON file, \`&at=\` opens one value: [the first Lisbon warning](?path=${ex}&at=lisbon/0). The pattern as data: [index.json](index.json).

**What you see.** What the file is, who keeps it and when it last changed (from [the catalogue](../library/index.json)); its sha256, computed in your browser from the bytes it has just received, and whether that matches the catalogue; where it is used; for a data file, its values as tables you can walk into, record by record, until there is nothing further in, and a schema inferred from the bytes; for a document or a tool, its source as written; and always the raw file one click away.

**What it does not do.** It sends nothing anywhere, and it invents nothing: a unit is shown only where a field's own name states one, and a field the file does not have is not shown.

Not a warning service: follow IPMA, ANEPC and your local authorities.
`)
fs.writeFileSync(path.join(OUT, 'view/index.json'), JSON.stringify({
    about: 'How to open any served file as a page. One page shows every file: the viewer reads the file in the browser. The files themselves, with who keeps each and what links to it, are listed in library/index.json.',
    by: ME, made_by: 'tools/library-view.mjs', pattern: 'view/?path=<path>', inside_json: 'view/?path=<path>&at=<field>/<index>/<field>', example: `view/?path=${ex}`, catalogue: 'library/index.json', script: 'library/viewer.js', files: n,
    before: 'Until 11 November 2026, 02:25 UTC the pattern was view/<path>.html, one page per file; those addresses no longer exist.'
}, null, 1) + '\n')
console.log(`library-view: the viewer page -> ${path.relative(ROOT, OUT) || OUT}/view/ (${n} files can be opened)`)
