#!/usr/bin/env node
// The gate: must print OK, and a red gate is no release. Budget: 8 seconds (5 until 11 November 02:55, when the site passed 1,100 pages). It builds the site once, then checks:
//   1. the repository stays fast: no tracked file over 256 KB, no binary, no raw capture, nothing from a key store;
//   2. no secret: private keys, tokens, vault keys;
//   3. every JSON parses; every incident has incident.json with a sourced headline;
//   4. every page has its markdown twin, every internal link and asset resolves, nothing generated is committed;
//   5. the front page says it is not a warning service.
// Run: node admin/build/validate.mjs
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync, spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = path.join(ROOT, '_site')
const t0 = Date.now(), errors = [], warns = []
const fail = m => errors.push(m)

// the build runs beside the checks of the tracked files (they read only the repository, never _site/); the built-site checks wait for it
const building = new Promise((ok, no) => spawn(process.execPath, [path.join(ROOT, 'admin/build/build.mjs')], { stdio: 'inherit', env: process.env })
    .on('error', no).on('exit', (code, sig) => code === 0 ? ok() : no(new Error(`admin/build/build.mjs exited ${sig || code}`))))

// the files git tracks (or, outside git, every file)
let tracked
try { tracked = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT }).toString().split('\0').filter(Boolean) }
catch { tracked = [] }
const future = []
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
    if (/sgit_private_[a-z]+_[A-Za-z0-9]/.test(s) && !rel.startsWith('admin/build/validate') && rel !== 'SECURITY.md') fail(`${rel}: a vault key (sgit's private prefix)`)
    if (/\b[a-z0-9]{20,64}:[a-z0-9]{8}\b/.test(s) && !rel.startsWith('admin/build/validate') && rel !== 'SECURITY.md') fail(`${rel}: looks like a vault key (<passphrase>:<vault id>)`)
    if (/(^|\/)(vault-key-[^\/]*|[^\/]*\.vault-key|access-token\.json|[^\/]*\.key)$/.test(rel)) fail(`${rel}: a key file never goes in git`)
    // the Weather face reads only what the data room publishes (RESTRUCTURE.md): no request leaves the site from its code
    if (/^app\/weather\/.*\.m?js$/.test(rel) && /(fetch|XMLHttpRequest|EventSource|WebSocket|import)\s*\(?\s*['"`](https?:)?\/\//.test(s)) fail(`${rel}: the Weather face must read only this site's own files (an outside address is requested)`)
    // a time written ahead of the clock (six agents corrected such stamps on 11 November): "Kept by ... UTC" in markdown, "updated" in JSON
    { const ahead = t => t && t - Date.now() > 10 * 60000
      const MON = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 }
      if (rel.endsWith('.md')) { const k = s.slice(0, 1500).match(/Kept by [^\n]*?(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4}),? (\d{2}):(\d{2}) UTC/); if (k && ahead(Date.UTC(+k[3], MON[k[2]], +k[1], +k[4], +k[5]))) future.push(rel) }
      else if (rel.endsWith('.json')) { const u = s.slice(0, 4000).match(/"updated"\s*:\s*"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?Z)"/); if (u && ahead(Date.parse(u[1].length === 17 ? u[1].replace('Z', ':00Z') : u[1]))) future.push(rel) } }
    if (rel.endsWith('.json')) { try { JSON.parse(s) } catch (e) { fail(`${rel}: invalid JSON (${e.message})`) } }
}
if (!tracked.length) warns.push('not a git checkout: the tracked-file checks were skipped')
else for (const need of ['admin/build/build.mjs', 'admin/build/validate.mjs', '.github/workflows/deploy.yml', 'admin/series.txt']) if (!tracked.includes(need)) fail(`${need} is not tracked by git (ignored?): CI would not have it`)

// the Weather face's own check (incident.weather@'s tools/weather-check.mjs): only the data room's files, tokens only
try { if (fs.existsSync(path.join(ROOT, 'tools/weather-check.mjs'))) execFileSync(process.execPath, [path.join(ROOT, 'tools/weather-check.mjs')], { cwd: ROOT, stdio: 'pipe' }) } catch (e) { fail('tools/weather-check.mjs: ' + String(e.stdout || e.message).trim().split('\n').slice(-1)[0]) }

// incidents
for (const d of fs.readdirSync(path.join(ROOT, 'incidents'))) {
    const f = path.join(ROOT, 'incidents', d, 'incident.json')
    if (!fs.existsSync(f)) { fail(`incidents/${d}: no incident.json`); continue }
    const j = JSON.parse(fs.readFileSync(f, 'utf8')), h = j.headline || {}
    if (!h.text || !/^https:\/\//.test(h.url || '') || !h.at) fail(`incidents/${d}/incident.json: the headline needs text, an https source and a time`)
}

await building

// the built site: twins, links, assets
const html = []
const built = new Set()   // every path in the built site, walked once: link targets are looked up here, not asked of the disk one by one
const walk = d => { built.add(d); for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else { built.add(f); if (f.endsWith('.html')) html.push(f) } } }
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
        if (!built.has(target.replace(/\/+$/, ''))) fail(`${rel}: broken link ${u}`)
    }
}
const front = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
if (!/Not a warning service/.test(front)) fail('index.html: the "Not a warning service" line is missing')
for (const need of ['api/v1/index.json', 'llms.txt', 'version.json', 'sitemap.xml', 'library/index.html', 'library/index.json', 'data/agents/index.json', 'data/graph/storm.json'])   if (!fs.existsSync(path.join(OUT, need))) fail(`_site/${need} missing`)

if (future.length) warns.push(`${future.length} file(s) carry a time ahead of the clock (read the clock before writing a time): ${future.slice(0, 8).join(', ')}${future.length > 8 ? ' ...' : ''}`)
const ms = Date.now() - t0
if (ms > 8000) warns.push(`the gate took ${ms} ms: over its 8 s budget`)
for (const w of warns) console.log('WARN ' + w)
if (errors.length) { for (const e of errors) console.log('FAIL ' + e); console.log(`RED: ${errors.length} problem(s), ${ms} ms`); process.exit(1) }
console.log(`OK ${process.env.VERSION || 'local'}: ${html.length} pages, ${tracked.length} tracked files, ${ms} ms`)
