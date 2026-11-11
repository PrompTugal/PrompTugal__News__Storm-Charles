#!/usr/bin/env node
// Read IPMA's open data (https://api.ipma.pt/open-data/), politely, and keep what was read.
//   node tools/ipma-read.mjs [--store DIR] [--only id,id] [--gap ms] [--crawl]
// - The endpoints come from sources/ipma/api.json (the map). One request every few seconds, a plain client name, no keys.
// - Every response: its sha256, its size, the time read, IPMA's own Last-Modified header.
// - The full responses never go in git. They go to a store outside it (--store, or IPMA_STORE, default ~/ipma-store), in the
//   shape of RESTRUCTURE.md: ipma/latest/<path> (overwritten) and ipma/<yyyy>/<mm>/<dd>/<hh>/<path> (kept when it changed,
//   with <path>.diff.json beside it), and a manifest.json per hour listing every file's hash. The store is a vault's folder.
// - Git keeps small records only: sources/ipma/reads.json (one line per read, appended), sources/ipma/latest.json (each
//   file: hash, size, time read, when it last changed) and sources/ipma/changes/<endpoint>.json (what changed since the
//   read before, per endpoint).
// - --crawl also walks IPMA's own directory listings under /open-data/ and writes sources/ipma/listing.json (names, sizes and
//   dates as IPMA lists them; nothing is downloaded by the crawl).
// Read-only on IPMA. No model is called. Kept by incident.ipma@web-summit.dinis.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'sources/ipma')
const BY = 'incident.ipma@web-summit.dinis'
const BASE = 'https://api.ipma.pt/open-data/'
const UA = 'newsroom-reader/1.0 (reads public open data; one request every few seconds)'
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true) }
const STORE = path.resolve(arg('store', process.env.IPMA_STORE || path.join(os.homedir(), 'ipma-store')), 'ipma')
const GAP = +arg('gap', 3000), ONLY = arg('only', '') ? String(arg('only')).split(',') : null
const sleep = ms => new Promise(r => setTimeout(r, ms))
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return d } }
const writeJ = (f, j) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n') }
const put = (f, b) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, b) }
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')

let last = 0
async function get(url, method = 'GET') {
    const wait = last + GAP - Date.now(); if (wait > 0) await sleep(wait)
    for (let attempt = 1; ; attempt++) {
        last = Date.now()
        try {
            const r = await fetch(url, { method, headers: { 'user-agent': UA, accept: '*/*' }, signal: AbortSignal.timeout(90000) })
            const body = method === 'HEAD' ? Buffer.alloc(0) : Buffer.from(await r.arrayBuffer())
            if ((r.status === 429 || r.status >= 500) && attempt < 3) { await sleep(15000 * attempt); continue }
            return { status: r.status, body, last_modified: r.headers.get('last-modified') ? new Date(r.headers.get('last-modified')).toISOString().replace(/\.\d+Z$/, 'Z') : null, etag: r.headers.get('etag'), type: r.headers.get('content-type'), length: +r.headers.get('content-length') || null }
        } catch (e) { if (attempt >= 3) return { status: 0, body: Buffer.alloc(0), error: String(e.cause?.code || e.message).slice(0, 120) }; await sleep(8000 * attempt) }
    }
}

// ---------------------------------------------------------------- what changed: every response as a map of key -> record
const rec = o => JSON.stringify(o)
function records(ep, name, buf) {
    const m = new Map(), s = buf.toString('utf8')
    if (/\.csv$/.test(name)) { for (const l of s.split('\n').slice(1)) { if (!l) continue; const c = l.split(','); m.set(c[0].slice(0, 10) + '|' + c[2], l) } return m }
    const j = JSON.parse(s)
    switch (ep) {
        case 'warnings': for (const w of j) m.set([w.idAreaAviso, w.awarenessTypeName, w.startTime, w.endTime].join('|'), rec({ level: w.awarenessLevelID, text: w.text })); break
        case 'observations': for (const [t, st] of Object.entries(j)) if (st) for (const [id, v] of Object.entries(st)) m.set(t + '|' + id, rec(v)); break
        case 'obs-surface': for (const f of j.features) m.set(f.properties.time + '|' + f.properties.idEstacao, rec(f.properties)); break
        case 'stations': for (const f of j) m.set(String(f.properties.idEstacao), rec(f)); break
        case 'seismic': for (const e of j.data) m.set([e.time, e.lat, e.lon].join('|'), rec(e)); break
        case 'fire-risk': for (const [k, v] of Object.entries(j.local || {})) m.set(j.dataPrev + '|' + k, rec(v.data)); break
        case 'uv': for (const u of j) m.set([u.globalIdLocal, u.data, u.idPeriodo].join('|'), rec(u)); break
        case 'city-daily': for (const d of j.data) m.set(d.forecastDate, rec(d)); break
        case 'day-forecast': case 'sea-forecast': for (const d of j.data) m.set(j.forecastDate + '|' + d.globalIdLocal, rec(d)); break
        case 'bivalves': for (const f of j.features) m.set(f.properties.code || f.properties.samp || f.properties.name, sha(Buffer.from(rec(f.properties)))); m.set('publication_date', String(j.publication_date)); break
        default: { const d = Array.isArray(j) ? j : Array.isArray(j.data) ? j.data : [j]; d.forEach((x, i) => m.set(String(x.globalIdLocal ?? x.idWeatherType ?? x.classWindSpeed ?? x.classPrecInt ?? i), rec(x))) }
    }
    return m
}
function diff(ep, name, before, after) {
    let a, b
    try { a = records(ep, name, before); b = records(ep, name, after) } catch (e) { return { note: 'not compared as records: ' + String(e.message).slice(0, 80) } }
    const added = [], removed = [], changed = []
    for (const [k, v] of b) { if (!a.has(k)) added.push(k); else if (a.get(k) !== v) changed.push(k) }
    for (const k of a.keys()) if (!b.has(k)) removed.push(k)
    const ex = (keys, f) => keys.slice(0, 40).map(f)
    const short = v => { try { const o = JSON.parse(v); return typeof o === 'object' ? o : v } catch { return String(v).slice(0, 160) } }
    const big = ep === 'observations' || ep === 'obs-surface' || /\.csv$/.test(name) || ep === 'seismic' && false
    return {
        records_before: a.size, records_after: b.size, added: added.length, removed: removed.length, changed: changed.length,
        ...(big ? { added_keys: [...new Set(added.map(k => k.split('|')[0]))].slice(0, 30), removed_keys: [...new Set(removed.map(k => k.split('|')[0]))].slice(0, 30) }
            : { added_items: ex(added, k => ({ key: k, now: short(b.get(k)) })), removed_items: ex(removed, k => ({ key: k, was: short(a.get(k)) })), changed_items: ex(changed, k => ({ key: k, was: short(a.get(k)), now: short(b.get(k)) })) })
    }
}

// ---------------------------------------------------------------- the crawl of IPMA's own directory listings
async function crawl() {
    const out = [], seen = new Set(), queue = ['']
    while (queue.length && seen.size < 160) {
        const dir = queue.shift(); if (seen.has(dir)) continue; seen.add(dir)
        const r = await get(BASE + dir)
        if (r.status !== 200 || !/html/.test(r.type || '')) { out.push({ dir, status: r.status, listed: false }); continue }
        const rows = [...r.body.toString('utf8').matchAll(/<a href="([^"?#:]+)">[^<]*<\/a>\s*<\/td>\s*<td[^>]*>\s*([^<]*?)\s*<\/td>\s*<td[^>]*>\s*([^<]*?)\s*<\/td>/g)]
        const entries = rows.filter(x => !x[1].startsWith('/') && !x[1].startsWith('..')).map(x => ({ name: x[1], listed_modified: x[2].replace(/&nbsp;/g, '').trim() || null, listed_size: x[3].replace(/&nbsp;/g, '').trim() || null }))
        out.push({ dir, status: 200, listed: true, read_utc: now(), entries })
        for (const e of entries) if (e.name.endsWith('/')) queue.push(dir + e.name)
        console.log(`crawl ${dir || '/'}: ${entries.length} entries`)
    }
    writeJ(path.join(SRC, 'listing.json'), { complete: queue.length === 0, not_walked: queue.slice(0, 200), about: "IPMA's own directory listings under https://api.ipma.pt/open-data/, as its server lists them (name, date and size are IPMA's columns; the dates carry no time zone). A listing, not a download: files are read only where sources/ipma/api.json says so. A directory whose listing is refused is marked listed: false.", source: BASE, by: BY, updated: now(), directories: out })
}

// ---------------------------------------------------------------- go
const api = readJ(path.join(SRC, 'api.json'), null)
if (!api) { console.error('sources/ipma/api.json is missing'); process.exit(1) }
const t0 = Date.now(), at = now()
const [Y, M, D, H] = [at.slice(0, 4), at.slice(5, 7), at.slice(8, 10), at.slice(11, 13)]
const dated = path.join(STORE, Y, M, D, H)
if (arg('crawl', false)) await crawl()

const latest = readJ(path.join(SRC, 'latest.json'), { files: {} })
const run = { at, requests: 0, ok: 0, failed: [], changed: [], first: [], bytes: 0 }
const manifest = { read_utc: at, source: BASE, files: {} }
let cityIds = null
for (const ep of [...api.endpoints].sort((a, b) => (b.group === 'tables') - (a.group === 'tables'))) {   // the id tables first: the places expand the city files
    if (ONLY && !ONLY.includes(ep.id)) continue
    if (ep.read === 'listing') continue   // a folder: its listing is in listing.json (--crawl), nothing is downloaded
    // expand the address: {idDay}, {idArea} from the map; {globalIdLocal} from IPMA's own list of places (read first)
    let urls = [ep.url]
    for (const [p, vals] of Object.entries(ep.params || {})) {
        let v = vals.values
        if (vals.from === 'places') v = cityIds || (cityIds = (readJ(path.join(STORE, 'latest/distrits-islands.json'), { data: [] }).data || []).map(x => x.globalIdLocal))
        urls = urls.flatMap(u => (v || []).map(x => u.replace(`{${p}}`, x)))
    }
    const changes = []
    for (const url of urls) {
        const name = url.slice(BASE.length), f = latest.files[name] || (latest.files[name] = { endpoint: ep.id, url })
        const r = await get(url, ep.read === 'head' ? 'HEAD' : 'GET'); run.requests++
        f.status = r.status; f.read_utc = now(); f.reads = (f.reads || 0) + 1
        if (r.error) f.error = r.error; else delete f.error
        if (r.status !== 200) { run.failed.push(name); console.log(`${r.status} ${name}`); continue }
        run.ok++
        if (ep.read === 'head') { Object.assign(f, { bytes: r.length, last_modified: r.last_modified, etag: r.etag, sha256: null, note: 'not downloaded (headers only)' }); continue }
        const h = sha(r.body); run.bytes += r.body.length
        manifest.files[name] = { sha256: h, bytes: r.body.length, last_modified: r.last_modified }
        const prevFile = path.join(STORE, 'latest', name), had = fs.existsSync(prevFile), before = had ? fs.readFileSync(prevFile) : null
        if (!f.sha256 && !had) { run.first.push(name); f.first_read_utc = f.read_utc; put(path.join(dated, name), r.body) }
        else if (f.sha256 !== h) {
            const d = before ? diff(ep.id, name, before, r.body) : { note: 'the earlier response is not in this store' }
            const change = { at: f.read_utc, file: name, from_sha256: f.sha256, to_sha256: h, bytes_from: f.bytes, bytes_to: r.body.length, last_modified: r.last_modified, read_before_utc: f.changed_seen_from || f.first_read_utc || null, ...d }
            changes.push(change); run.changed.push(name)
            f.changed_utc = f.read_utc; f.changes = (f.changes || 0) + 1
            put(path.join(dated, name), r.body); put(path.join(dated, name + '.diff.json'), JSON.stringify(change, null, 1))
        }
        Object.assign(f, { bytes: r.body.length, sha256: h, last_modified: r.last_modified, etag: r.etag, changed_seen_from: f.read_utc })
        put(prevFile, r.body)
        console.log(`200 ${String(r.body.length).padStart(8)} ${h.slice(0, 12)} ${name}${run.changed.includes(name) ? '  CHANGED' : ''}`)
    }
    if (changes.length) {
        const cf = path.join(SRC, 'changes', ep.id + '.json')
        const c = readJ(cf, { about: `What changed in IPMA's "${ep.title}" between one of our reads and the next: counts, and up to 40 examples of each kind. "at" is when we read the new version; "last_modified" is IPMA's own header on it. The full responses of both are in the data store under the hour read. Newest first; the last 60 are kept here.`, endpoint: ep.id, by: BY, changes: [] })
        c.changes = [...changes.reverse(), ...c.changes].slice(0, 60); c.updated = now()
        let s = JSON.stringify(c, null, 1); while (s.length > 200000 && c.changes.length > 1) { c.changes.pop(); s = JSON.stringify(c, null, 1) }
        writeJ(cf, c)
    }
}
put(path.join(dated, 'manifest.json'), JSON.stringify(manifest, null, 1))
put(path.join(STORE, 'latest/manifest.json'), JSON.stringify(manifest, null, 1))
latest.about = "Every file we read from IPMA's open data, as of its latest read: the sha256 and size of IPMA's response, the UTC time we read it, IPMA's own Last-Modified header, and when we last saw it change. The responses themselves are in the data store (see dataset.json), never in git."
latest.by = BY; latest.updated = now(); latest.source = BASE
writeJ(path.join(SRC, 'latest.json'), { about: latest.about, source: latest.source, by: latest.by, updated: latest.updated, files: latest.files })
const reads = readJ(path.join(SRC, 'reads.json'), { about: "Every read of IPMA's open data by tools/ipma-read.mjs, appended: when, how many requests, which files answered with something new (changed), which were read for the first time (the count), which failed. One request every few seconds; read-only.", source: BASE, by: BY, reads: [] })
reads.reads.push({ at, seconds: Math.round((Date.now() - t0) / 1000), requests: run.requests, ok: run.ok, bytes: run.bytes, first: run.first.length, changed: run.changed, failed: run.failed })
reads.updated = now()
writeJ(path.join(SRC, 'reads.json'), reads)
console.log(`read ${run.requests} (${run.ok} ok, ${run.failed.length} failed), ${run.changed.length} changed, ${run.first.length} first, ${run.bytes} bytes, ${Math.round((Date.now() - t0) / 1000)} s -> ${STORE}`)
