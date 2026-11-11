#!/usr/bin/env node
// The gate: must print OK, and a red gate is no release. Budget: 5 seconds. It builds the site once, then checks:
//   1. the repository stays fast: no tracked file over 256 KB, no binary, no raw capture, nothing from a key store;
//   2. no secret: private keys, tokens, vault keys;
//   3. every JSON parses; every incident has incident.json with a sourced headline;
//   4. every page has its markdown twin, every internal link and asset resolves, nothing generated is committed;
//   5. the front page says it is not a warning service.
// Run: node admin/build/validate.mjs
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, '_site')
const t0 = Date.now(), errors = [], warns = []
const fail = m => errors.push(m)

execFileSync(process.execPath, [path.join(ROOT, 'admin/build/build.mjs')], { stdio: 'inherit', env: process.env })

// the files git tracks (or, outside git, every file)
let tracked
try { tracked = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT }).toString().split('\0').filter(Boolean) }
catch { tracked = [] }
const MAX = 256 * 1024
const BINARY_EXT = /\.(png|jpe?g|gif|webp|avif|bmp|ico|pdf|zip|gz|tgz|7z|rar|mp4|mov|webm|mp3|wav|woff2?|ttf|otf|psd|sqlite|db|bin|exe|dmg|pkl|parquet)$/i
const FORBIDDEN = /(^|\/)(node_modules|_site|\.sg_vault|\.sg-send|raw|captures|screenshots)\//
for (const rel of tracked) {
    const f = path.join(ROOT, rel)
    if (!fs.existsSync(f)) continue
    const st = fs.statSync(f)
    if (st.size > MAX) fail(`${rel}: ${st.size} bytes, over 256 KB: bulky data goes to a vault, git keeps a pointer (ROADMAP P0.1)`)
    if (BINARY_EXT.test(rel)) fail(`${rel}: a binary in git: images, PDFs and captures go to a vault`)
    if (FORBIDDEN.test(rel)) fail(`${rel}: this path never goes in git`)
    const buf = fs.readFileSync(f)
    if (buf.subarray(0, 8000).includes(0)) fail(`${rel}: binary content (a NUL byte)`)
    const s = buf.toString('utf8')
    if (/-----BEGIN ([A-Z]+ )?PRIVATE KEY-----/.test(s) && !rel.startsWith('admin/build/validate')) fail(`${rel}: a private key`)
    if (/\bsk-or-v1-[0-9a-f]{20,}|\bghp_[A-Za-z0-9]{30,}|\bgithub_pat_[A-Za-z0-9_]{30,}|\bAKIA[0-9A-Z]{16}\b|\bsk-ant-[A-Za-z0-9-]{20,}/.test(s)) fail(`${rel}: a token`)
    if (/sgit_(write|admin)_[A-Za-z0-9]{8,}/.test(s)) fail(`${rel}: a vault write key (only public read keys are published)`)
    if (rel.endsWith('.json')) { try { JSON.parse(s) } catch (e) { fail(`${rel}: invalid JSON (${e.message})`) } }
}
if (!tracked.length) warns.push('not a git checkout: the tracked-file checks were skipped')
else for (const need of ['admin/build/build.mjs', 'admin/build/validate.mjs', '.github/workflows/deploy.yml', 'admin/series.txt']) if (!tracked.includes(need)) fail(`${need} is not tracked by git (ignored?): CI would not have it`)

// incidents
for (const d of fs.readdirSync(path.join(ROOT, 'incidents'))) {
    const f = path.join(ROOT, 'incidents', d, 'incident.json')
    if (!fs.existsSync(f)) { fail(`incidents/${d}: no incident.json`); continue }
    const j = JSON.parse(fs.readFileSync(f, 'utf8')), h = j.headline || {}
    if (!h.text || !/^https:\/\//.test(h.url || '') || !h.at) fail(`incidents/${d}/incident.json: the headline needs text, an https source and a time`)
}

// the built site: twins, links, assets
const html = []
const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f) : f.endsWith('.html') && html.push(f) } }
walk(OUT)
for (const f of html) {
    const rel = path.relative(OUT, f), s = fs.readFileSync(f, 'utf8')
    if (rel !== '404.html') {
        const twin = (s.match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/) || [])[1]
        if (!twin) fail(`${rel}: no markdown twin`)
        else if (!fs.existsSync(path.join(path.dirname(f), twin))) fail(`${rel}: its twin ${twin} is not served`)
    }
    for (const [, u] of s.matchAll(/(?:href|src)="([^"]+)"/g)) {
        if (/^(https?:|mailto:|#|data:)/.test(u) || rel === '404.html') continue
        const target = path.join(path.dirname(f), decodeURI(u.split('#')[0].split('?')[0]))
        if (!u.split('#')[0]) continue
        if (!fs.existsSync(target)) fail(`${rel}: broken link ${u}`)
    }
}
const front = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
if (!/Not a warning service/.test(front)) fail('index.html: the "Not a warning service" line is missing')
for (const need of ['api/v1/index.json', 'llms.txt', 'version.json', 'sitemap.xml', 'library/index.html', 'library/index.json', 'data/agents/index.json', 'data/graph/storm.json'])   if (!fs.existsSync(path.join(OUT, need))) fail(`_site/${need} missing`)

const ms = Date.now() - t0
if (ms > 5000) warns.push(`the gate took ${ms} ms: over its 5 s budget`)
for (const w of warns) console.log('WARN ' + w)
if (errors.length) { for (const e of errors) console.log('FAIL ' + e); console.log(`RED: ${errors.length} problem(s), ${ms} ms`); process.exit(1) }
console.log(`OK ${process.env.VERSION || 'local'}: ${html.length} pages, ${tracked.length} tracked files, ${ms} ms`)
