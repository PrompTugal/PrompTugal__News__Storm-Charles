#!/usr/bin/env node
// Pinned copies of other teams' engines (kept by incident.observability@web-summit.dinis): copy named files, unchanged,
// from a checkout of their repository into app/agents/vendor/<name>@<short commit>/ and write pin.json beside them
// (repository, commit, each file's path and sha256). We never edit a pinned file: our side is an adapter per engine.
//   node tools/agents-pin.mjs <checkout> <name> <author> <file> [<file> ...]
//   node tools/agents-pin.mjs --check       every pinned file still matches its pin.json (run before a release)
// The source commit is read from the checkout's HEAD (git rev-parse), not from this repository's history.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const VENDOR = path.join(ROOT, 'app/agents/vendor')
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')
const MAX = 256 * 1024

if (process.argv[2] === '--check') {
    let bad = 0, n = 0
    for (const d of fs.existsSync(VENDOR) ? fs.readdirSync(VENDOR) : []) {
        const pin = JSON.parse(fs.readFileSync(path.join(VENDOR, d, 'pin.json'), 'utf8'))
        for (const f of pin.files) { n++; if (sha(path.join(VENDOR, d, f.file)) !== f.sha256) { bad++; console.log(`agents-pin: ${d}/${f.file} differs from its pin (a pinned copy is never edited)`) } }
    }
    console.log(bad ? `agents-pin: ${bad} of ${n} changed` : `agents-pin: ${n} pinned files match`); process.exit(bad ? 1 : 0)
}

const [src, name, author, ...files] = process.argv.slice(2)
if (!src || !name || !author || !files.length) { console.log('usage: node tools/agents-pin.mjs <checkout> <name> <author> <file> [<file> ...]'); process.exit(2) }
const git = (...a) => execFileSync('git', ['-C', src, ...a]).toString().trim()
const commit = git('rev-parse', 'HEAD'), when = git('log', '-1', '--format=%cI'), remote = git('remote', 'get-url', 'origin').replace(/^https:\/\/github\.com\//, '').replace(/\.git$/, '')
const dir = path.join(VENDOR, `${name}@${commit.slice(0, 7)}`)
fs.mkdirSync(dir, { recursive: true })
const out = []
for (const rel of files) {
    const from = path.join(src, rel), st = fs.statSync(from)
    if (st.size > MAX) { console.log(`agents-pin: ${rel} is ${st.size} bytes, over 256 KB: not copied (load it from its own site)`); process.exit(1) }
    fs.copyFileSync(from, path.join(dir, path.basename(rel)))
    out.push({ file: path.basename(rel), from: rel, bytes: st.size, sha256: sha(from) })
}
let prev = {}; try { prev = JSON.parse(fs.readFileSync(path.join(dir, 'pin.json'), 'utf8')) } catch { }
fs.writeFileSync(path.join(dir, 'pin.json'), JSON.stringify({
    about: `Unchanged copies, pinned so the authors' daily changes never break this site. Not forked: our side is one adapter in app/agents/. To update: run tools/agents-pin.mjs on a newer checkout (a new folder, named for its commit) and point the adapter at it.`,
    author, repository: remote, commit, commit_time: when, licence: 'Apache-2.0 (the source repository\'s LICENSE)',
    copied_by: 'incident.observability@web-summit.dinis', copied: prev.commit === commit && prev.copied ? prev.copied : new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    files: out, ...(prev.notes ? { notes: prev.notes } : {})
}, null, 2) + '\n')
console.log(`agents-pin: ${out.length} files from ${remote}@${commit.slice(0, 7)} -> ${path.relative(ROOT, dir)}/`)
