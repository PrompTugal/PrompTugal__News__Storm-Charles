#!/usr/bin/env node
// Page views, as counts: the append lanes of vault zd1cb3kt -> data/agents/views.json and stats/views.json in that vault
// (kept by incident.observability@web-summit.dinis).
//   OBS_DRAIN_DIR=<the private drain vault's folder> OBS_PUBLIC_DIR=<the public vault's folder> node tools/agents-views.mjs [--no-push]
// It lists the lanes with the enum key, fetches what is pending, opens each event with the events' private key, keeps the
// opened events by hour in the PRIVATE vault (events/<hour>.jsonl), and only then marks them processed (a processed file
// cannot be fetched again). The counts are recomputed from every kept event each run. Only counts are published: no
// event, no session id. The secrets are read from the drain folder only; none is printed, and nothing here writes one
// to the repository. What a browser sends is app/agents/obs.js; anyone can write to a lane, so a count is what was
// reported, not what was verified.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { privateDecrypt, createDecipheriv, constants } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const H = path.join(os.homedir(), '.incident-vaults', 'work')
const DRAIN = process.env.OBS_DRAIN_DIR || path.join(H, 'storm-charles-obs-drain')
const PUB = process.env.OBS_PUBLIC_DIR || path.join(H, 'storm-charles-obs')
const NOPUSH = process.argv.includes('--no-push')
const L = JSON.parse(fs.readFileSync(path.join(DRAIN, 'lanes.json'), 'utf8'))
const KEY = fs.readFileSync(path.join(DRAIN, 'events-private.pem'), 'utf8')

const call = async (verb, body) => {
    const r = await fetch(`${L.endpoint}/api/vault/append/${verb}/${L.vault}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-sgraph-vault-enum-key': L.enum_key }, body: JSON.stringify(body) })
    if (!r.ok) throw new Error(`${verb}: ${r.status}`)
    return r.json()
}
const b = s => Buffer.from(s, 'base64')
/** One lane file's content -> the event, or null. The sender encodes twice (app/agents/obs.js, seal). */
function open(content) {
    try {
        const e = JSON.parse(b(b(content).toString('utf8')).toString('utf8'))
        if (e.v !== 2) return null
        const aes = privateDecrypt({ key: KEY, padding: constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, b(e.w))
        const c = b(e.c), d = createDecipheriv('aes-256-gcm', aes, b(e.i)); d.setAuthTag(c.subarray(c.length - 16))
        return JSON.parse(Buffer.concat([d.update(c.subarray(0, c.length - 16)), d.final()]).toString('utf8'))
    } catch { return null }
}
const S = (v, n, re) => { v = typeof v === 'string' ? v.slice(0, n) : ''; return re && !re.test(v) ? '' : v }
/** Keep only the fields the sender writes, each cut and checked: a lane is open to anyone. */
function clean(e, received) {
    if (!e || e.v !== 1 || e.src !== 'storm-charles' || e.site !== 'storm-charles.promptugal.news' || !['view', 'read'].includes(e.type)) return null
    const p = S(e.path, 200, /^\/[A-Za-z0-9._~\/@%+-]*$/); if (!p) return null
    const o = { type: e.type, received: new Date(received).toISOString(), ts: S(e.ts, 17, /^\d{4}-\d\d-\d\dT\d\d:\d\dZ$/), sid: S(e.sid, 8, /^[0-9a-f]{8}$/), path: p,
        ref: S(e.ref, 80, /^[A-Za-z0-9.:-]*$/), screen: S(e.screen, 8, /^(phone|tablet|desktop)$/), via: S(e.via, 40, /^[a-z0-9._-]*$/), agent: S(e.agent, 12, /^[a-z]*$/), ver: S(e.ver, 20, /^[A-Za-z0-9.]*$/) }
    if (e.type === 'read') { o.visible_s = Math.max(0, Math.min(3600, Number(e.visible_s) || 0)); o.scroll = Math.max(0, Math.min(100, Number(e.scroll) || 0)) }
    return o
}

// 1. drain: list everything pending, then per lane fetch, keep, mark
let entries = [], after
for (;;) { const r = await call('list', { include_content: false, limit: 200, ...(after ? { after_file_id: after } : {}) }); const E = r.entries || []; entries.push(...E); if (!r.truncated || !E.length) break; after = E[E.length - 1].file_id }
let opened = 0, refused = 0
fs.mkdirSync(path.join(DRAIN, 'events'), { recursive: true })
for (const lane of new Set(entries.map(e => e.inbox))) {
    const ids = entries.filter(e => e.inbox === lane).map(e => e.file_id)
    for (let i = 0; i < ids.length; i += 20) {
        const batch = ids.slice(i, i + 20), r = await call('fetch', { inbox: lane, file_ids: batch })
        for (const f of r.files || []) {
            const received = Number(String(f.file_id).slice(0, 13)), raw = open(f.content), ev = clean(raw, received)
            if (!ev) { refused++; fs.mkdirSync(path.join(DRAIN, 'refused'), { recursive: true })   // kept privately, cut short, so a refusal can be explained: a processed file cannot be fetched again
                fs.appendFileSync(path.join(DRAIN, 'refused', new Date(received).toISOString().slice(0, 13) + '.jsonl'), JSON.stringify({ received, opened: raw !== null, event: raw === null ? null : JSON.stringify(raw).slice(0, 600) }) + '\n'); continue }
            fs.appendFileSync(path.join(DRAIN, 'events', new Date(received).toISOString().slice(0, 13) + '.jsonl'), JSON.stringify(ev) + '\n'); opened++
        }
        await call('mark-processed', { inbox: lane, file_ids: batch })
    }
}

// 2. count, from every kept event
const ev = fs.readdirSync(path.join(DRAIN, 'events')).filter(f => f.endsWith('.jsonl')).sort().flatMap(f => fs.readFileSync(path.join(DRAIN, 'events', f), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)))
const people = ev.filter(e => !e.agent), views = people.filter(e => e.type === 'view'), reads = people.filter(e => e.type === 'read')
const tally = (list, key, n) => { const m = new Map(); for (const e of list) { const k = key(e); if (k) m.set(k, (m.get(k) || 0) + 1) } return [...m].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1)).slice(0, n).map(([k, c]) => ({ k, n: c })) }
const median = a => { if (!a.length) return null; a = [...a].sort((x, y) => x - y); return a[Math.floor((a.length - 1) / 2)] }
const hours = new Map()
for (const e of views) { const h = e.received.slice(0, 13) + ':00Z', o = hours.get(h) || { hour: h, views: 0, s: new Set() }; o.views++; if (e.sid) o.s.add(e.sid); hours.set(h, o) }
const now = new Date().toISOString().slice(0, 19) + 'Z'
const out = {
    about: 'Page views of storm-charles.promptugal.news, as counts only. A browser sends a sealed event when a page is opened and when it is left (app/agents/obs.js): no IP address, no cookie, no place lookup, nothing when Do Not Track or Global Privacy Control is on or when the reader pressed Pause. The events are opened by tools/agents-views.mjs and only these counts are published, here and in the vault named below. Anyone can write to the lanes, so a count is what was reported, not what was verified. A visit is one browser tab (a random id kept for that tab only). Automated browsers that say so are counted apart.',
    by: 'incident.observability@web-summit.dinis', updated: now,
    source: 'the append lanes of vault zd1cb3kt on https://dev.send.sgraph.ai', read_utc: now,
    vault: { id: 'zd1cb3kt', file: 'stats/views.json' },
    since: ev.length ? ev[0].received : null, until: ev.length ? ev[ev.length - 1].received : null,
    totals: { views: views.length, visits: new Set(views.map(e => e.sid).filter(Boolean)).size, pages: new Set(views.map(e => e.path)).size, reads: reads.length, median_visible_s: median(reads.map(e => e.visible_s)), automated: ev.filter(e => e.agent && e.type === 'view').length, refused_this_run: refused },
    by_hour: [...hours.values()].sort((x, y) => x.hour < y.hour ? -1 : 1).map(o => ({ hour: o.hour, views: o.views, visits: o.s.size })),
    by_path: tally(views, e => e.path, 40).map(r => ({ path: r.k, views: r.n, median_visible_s: median(reads.filter(e => e.path === r.k).map(e => e.visible_s)) })),
    by_referrer: tally(views, e => e.ref && e.ref !== 'storm-charles.promptugal.news' ? e.ref : '', 20).map(r => ({ host: r.k, views: r.n })),
    by_screen: tally(views, e => e.screen, 3).map(r => ({ screen: r.k, views: r.n })),
    by_via: tally(views, e => e.via, 20).map(r => ({ via: r.k, views: r.n })),
}
const text = JSON.stringify(out, null, 2) + '\n'
fs.writeFileSync(path.join(ROOT, 'data/agents/views.json'), text)
fs.mkdirSync(path.join(PUB, 'stats'), { recursive: true }); fs.writeFileSync(path.join(PUB, 'stats', 'views.json'), text)

// 3. both vaults: commit and push (sgit skips an empty commit)
if (!NOPUSH) for (const d of [DRAIN, PUB]) { try { execFileSync('sgit', ['commit', 'page views drained ' + now], { cwd: d, stdio: 'ignore', timeout: 300000 }); execFileSync('sgit', ['push'], { cwd: d, stdio: 'ignore', timeout: 300000 }) } catch (e) { console.error('agents-views: the vault in ' + path.basename(d) + ' was not pushed: ' + String(e.message).slice(0, 120)); process.exitCode = 1 } }
console.log(`agents-views: ${entries.length} pending, ${opened} opened, ${refused} refused; ${views.length} views in ${out.totals.visits} visits, ${out.totals.automated} automated -> data/agents/views.json`)
