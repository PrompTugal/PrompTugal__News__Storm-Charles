#!/usr/bin/env node
// incident.meteorology@web-summit.dinis: read the page each lineage edge and licence cites, and stamp what was found.
//   node tools/meteorology-read.mjs [--only <substring of from/to/id>] [--stale]
// For every item in meteorology/edges/*.json and meteorology/licences.json with a `source` and `expect` (phrases the page must
// contain for the statement to stand), fetch the source once (curl; raw bytes kept OUTSIDE git under $METEO_CACHE or the OS temp
// dir), and write back: read_utc, http, sha256 (of the bytes), state ("stated" when every expect phrase is on the page,
// "not found in this read" otherwise, "not read" when the host did not answer 200) and a short quote around the first phrase.
// `no_quote`: true keeps no excerpt (pages that carry people's names near the phrase: press, live blogs).
// For "not stated" edges (`searched`: terms looked for) the state is "not stated" only when none of the terms is on the page.
// An agent-run tool: it rewrites tracked JSON, so it is NOT a build generator. No model call. Standard library only.
import fs from 'fs'; import path from 'path'; import os from 'os'; import crypto from 'crypto'; import { execFileSync } from 'child_process'
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..'), M = path.join(ROOT, 'meteorology')
const CACHE = process.env.METEO_CACHE || path.join(os.tmpdir(), 'meteorology-cache'); fs.mkdirSync(CACHE, { recursive: true })
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? (process.argv[i + 1] || true) : null }
const only = arg('--only'), stale = !!arg('--stale')
const UA = 'storm-charles.promptugal.news meteorology reader (public research; one request per address)'
const got = {}
function get(url, render) {
    const g = (render ? 'render:' : '') + url   // a rendered read and a plain one of the same address are two reads: one must not stand for the other
    if (got[g]) return got[g]
    const key = crypto.createHash('sha256').update(g).digest('hex').slice(0, 24), f = path.join(CACHE, key), meta = f + '.json'
    if (!stale && fs.existsSync(f) && fs.existsSync(meta)) return got[g] = { ...JSON.parse(fs.readFileSync(meta, 'utf8')), buf: fs.readFileSync(f) }
    let http = 0
    if (render) { try { http = +execFileSync(process.execPath, [path.join(ROOT, 'tools/meteorology-render.mjs'), url, f], { stdio: ['ignore', 'pipe', 'ignore'], timeout: 70000 }).toString().trim() } catch { http = 0 } }
    else try { http = +execFileSync('curl', ['-sS', '-L', '--compressed', '-m', '40', '-A', UA, '-H', 'Accept-Language: en,pt;q=0.8', '-o', f, '-w', '%{http_code}', url], { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch { http = 0 }
    const buf = fs.existsSync(f) ? fs.readFileSync(f) : Buffer.alloc(0)
    const m = { http, read_utc: new Date().toISOString().slice(0, 16) + 'Z', sha256: crypto.createHash('sha256').update(buf).digest('hex'), bytes: buf.length }
    fs.writeFileSync(meta, JSON.stringify(m)); return got[g] = { ...m, buf }
}
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', '#39': "'", '#x27': "'", ndash: '-', mdash: '-', eacute: 'é', oacute: 'ó', atilde: 'ã', ccedil: 'ç' }
const text = buf => buf.toString('utf8').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(#?\w+);/g, (a, e) => ENT[e] ?? ' ').replace(/\\u003c[^\\]*\\u003e/g, ' ').replace(/\s+/g, ' ')
const find = (t, p) => t.toLowerCase().indexOf(String(p).toLowerCase())
function stamp(it) {
    if (!it.source || (!it.expect && !it.searched)) return
    const r = get(it.source, it.render), t = r.http === 200 ? (it.render ? r.buf.toString('utf8').replace(/\s+/g, ' ') : text(r.buf)) : ''
    Object.assign(it, { read_utc: r.read_utc, http: r.http, sha256: r.sha256 })
    delete it.quote; delete it.found
    if (r.http !== 200) { it.state = 'not read'; return }
    if (it.searched) {   // a "not stated" edge: none of the terms may be on the page
        const hit = it.searched.filter(p => new RegExp(`(^|[^A-Za-z])${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`).test(t))
        it.state = hit.length ? 'terms found: re-read by hand' : 'not stated'; if (hit.length) it.found = hit
        return
    }
    const miss = it.expect.filter(p => find(t, p) < 0)
    it.state = miss.length ? 'not found in this read' : 'stated'
    if (miss.length) it.found = it.expect.filter(p => !miss.includes(p))
    const i = find(t, it.expect.find(p => find(t, p) >= 0) ?? '\u0000')
    if (i >= 0 && !it.no_quote) { const a = Math.max(0, t.lastIndexOf(' ', Math.max(0, i - 110))), b = t.indexOf(' ', Math.min(t.length - 1, i + 170)); it.quote = t.slice(a, b < 0 ? t.length : b).trim().slice(0, 300) }
}
const files = [...fs.readdirSync(path.join(M, 'edges')).filter(f => f.endsWith('.json')).map(f => path.join(M, 'edges', f)), path.join(M, 'licences.json'), path.join(M, 'sources.json')].filter(f => fs.existsSync(f))
let n = 0, bad = [], changed = [], pageChanged = 0
for (const f of files) {
    const j = JSON.parse(fs.readFileSync(f, 'utf8')), items = j.edges || j.licences || j.sources || []
    for (const it of items) { const was = it.state, wasSha = it.sha256; if (only && !JSON.stringify([it.id, it.from, it.to, it.source]).includes(only)) continue; stamp(it); n++; if (was && was !== it.state) changed.push(`${it.id || it.from + ' ' + (it.verb || j.verb) + ' ' + it.to}: ${was} -> ${it.state} (${it.source})`); else if (wasSha && wasSha !== it.sha256) pageChanged++; if (it.state && it.state !== 'stated' && it.state !== 'not stated') bad.push(`${path.basename(f)} ${it.id || it.from + ' ' + (it.verb || j.verb) + ' ' + it.to}: ${it.state} (${it.http}) ${it.source} found=${JSON.stringify(it.found || [])}`) }
    j.updated = new Date().toISOString().slice(0, 16) + 'Z'
    fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n')
}
console.log(`${n} items stamped; ${bad.length} need a look; ${changed.length} changed state; ${pageChanged} pages changed bytes with the statement still standing`); for (const c of changed) console.log('  CHANGED ' + c); for (const b of bad) console.log('  ' + b)
