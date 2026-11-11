#!/usr/bin/env node
// capture-records.mjs: from the captures kept outside git (tools/capture.mjs) to the records in git and the files in the vaults.
//   node tools/capture-records.mjs [--in DIR] [--capture-vault DIR] [--display-vault DIR] [--push]
// For every capture not yet recorded:
//   - the raw files go to the capture vault (packed, private): <source>/<yyyy>/<mm>/<dd>/<hhmm>-<slug>/...
//   - where the source may be shown (evidence/sources.json), the screenshots and the capture summary go to the display vault,
//     at the evidence id; otherwise nothing leaves the private vault and the page shows the hash, title, time and excerpt only;
//   - evidence/<id>.json (small) and evidence/<id>.md (its page) are written; then evidence/index.json, index.md, rows.json.
// It is run by the archivist, never by the build (it writes tracked files and needs the vault clones). No image, no HTML and
// no vault key ever reaches the repository: only ids, paths and sha256.
import fs from 'node:fs'
import crypto from 'node:crypto'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { sourceOf, SOURCES, BY, DEFAULT_OUT } from './capture.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const EV = path.join(ROOT, 'evidence')
const args = process.argv.slice(2), opt = n => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1] }
const IN = path.resolve(opt('--in') || DEFAULT_OUT)
const HOME = process.env.HOME || '/tmp'
const CV = path.resolve(opt('--capture-vault') || path.join(HOME, 'vaults/storm-charles-evidence-captures'))
const DV = path.resolve(opt('--display-vault') || path.join(HOME, 'vaults/storm-charles-evidence-display'))
const VAULTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/vaults.json'), 'utf8'))
const vid = k => VAULTS.vaults.find(v => v.kind === k).id
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const walk = (d, name, acc = []) => { if (!fs.existsSync(d)) return acc; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const f = path.join(d, e.name); e.isDirectory() ? walk(f, name, acc) : name(e.name) && acc.push(f) } return acc }
const J = f => JSON.parse(fs.readFileSync(f, 'utf8'))
const W = (f, data) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data) }
const utc = iso => `${+iso.slice(8, 10)} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}, ${iso.slice(11, 16)} UTC`
const mdEsc = s => String(s || '').replace(/\s*\|\s*/g, ' · ').replace(/\[/g, '(').replace(/\]/g, ')').replace(/[*`]/g, '').replace(/\s+/g, ' ').trim()   // the build's markdown has no escapes
const isRecord = n => /^\d{4}-.*\.json$/.test(n)   // <hhmm>-<slug>.json: never index.json

// each site's terms page, where incident.weatherwatch@ has read it (research/weather-sites/terms.json): host -> {url, read}
const TERMS = new Map()
try {
    const t = J(path.join(ROOT, 'research/weather-sites/terms.json')).sites, ad = J(path.join(ROOT, 'research/weather-sites/addresses.json')).addresses
    for (const r of ad) { const x = t[r.id]; if (!x?.terms_url) continue; let h; try { h = new URL(r.url).hostname.replace(/^www\./, '') } catch { continue } if (!TERMS.has(h)) TERMS.set(h, { url: x.terms_url, read: x.read, read_by: 'incident.weatherwatch@web-summit.dinis' }) }
} catch { /* the research files are another agent's: absent is fine */ }
const termsOf = host => { const h = host.replace(/^www\./, ''); for (const [k, v] of TERMS) if (h === k || h.endsWith('.' + k)) return v; return null }
// ---- 1. new captures -> vault working copies and records
const existing = walk(EV, isRecord).map(J)
const byId = new Map(existing.map(r => [r.id, r]))
let added = 0
for (const f of walk(IN, n => n === 'capture.json').sort()) {
    const c = J(f); if (!c.id || byId.has(c.id)) continue
    const dir = path.dirname(f), src = sourceOf(c.host)
    const rec = {
        id: c.id, url: c.url, final_url: c.final_url !== c.url ? c.final_url : undefined, redirects: c.redirects, host: c.host, source: src.id, source_name: src.name, kind: src.kind,
        read_utc: c.read_utc, captured: c.captured, why: c.why, status: c.status, headers: c.headers, title: c.title || '',
        sha256_html: c.sha256_html, sha256_dom: c.sha256_dom, sha256_text: c.sha256_text, sha256_screenshot: c.sha256_screenshot,
        bytes: c.bytes, screenshot: c.screenshot, clean: c.clean, frame: c.frame, rendered: c.rendered, note: c.note, diff: undefined,
        shown: !!(src.show && c.captured && c.sha256_screenshot), licence: src.licence, excerpt: c.excerpt ? c.excerpt.slice(0, 280) : undefined,
        vault: src.show && c.captured && c.sha256_screenshot ? { id: vid('display'), path: c.id } : null,
        capture_vault: c.captured ? { id: vid('capture'), path: c.id, files: fs.readdirSync(dir).sort() } : null,
        robots: c.robots, client: c.client, by: BY, updated: now(),
    }
    if (c.captured) {
        // a re-read that says the same as the capture before keeps only its small files in the private vault (the summary and
        // the visible text): the HTML and pictures of that load are not stored twice; their hashes stay in the record
        const stable = (host, t) => { const vol = sourceOf(host).volatile; if (!vol) return null; for (const re of vol) t = t.replace(new RegExp(re, 'g'), ''); return crypto.createHash('sha256').update(t.replace(/\s+/g, ' ').trim()).digest('hex') }
        const before = [...byId.values()].filter(x => x.url === c.url && x.captured && !x.failed && x.read_utc < c.read_utc).sort((a, b) => a.read_utc.localeCompare(b.read_utc)).pop()
        let mine = null; try { mine = stable(c.host, fs.readFileSync(path.join(dir, 'text.txt'), 'utf8')) } catch { /* no text */ }
        if (mine) rec.sha256_text_stable = mine
        const sameAsBefore = before && c.status === before.status && (mine || c.sha256_text) === (before.sha256_text_stable || before.sha256_text)
        if (sameAsBefore) {
            const full = before.capture_vault?.full_copy || before.id
            for (const n of ['capture.json', 'text.txt']) if (fs.existsSync(path.join(dir, n))) { fs.mkdirSync(path.join(CV, c.id), { recursive: true }); fs.copyFileSync(path.join(dir, n), path.join(CV, c.id, n)) }
            rec.capture_vault = { id: vid('capture'), path: c.id, files: ['capture.json', 'text.txt'], full_copy: full, note: 'Unchanged from the capture before: the HTML and pictures of this load were hashed and not stored again; the full copy is at full_copy.' }
        } else fs.cpSync(dir, path.join(CV, c.id), { recursive: true })
        if (rec.shown) for (const n of ['screenshot.jpg', 'screenshot-clean.jpg', 'frame.jpg', 'frame-clean.jpg', 'capture.json']) if (fs.existsSync(path.join(dir, n))) { fs.mkdirSync(path.join(DV, c.id), { recursive: true }); fs.copyFileSync(path.join(dir, n), path.join(DV, c.id, n)) }
    }
    byId.set(rec.id, rec); added++
}

// ---- 2. the chain of each address: earlier and later captures, changed or unchanged
const all = [...byId.values()].sort((a, b) => a.read_utc.localeCompare(b.read_utc) || a.id.localeCompare(b.id))
const chains = new Map()
for (const r of all) { if (!chains.has(r.url)) chains.set(r.url, []); chains.get(r.url).push(r) }
for (const chain of chains.values()) {
    let prev = null
    for (const r of chain) {
        if (!r.captured) { r.previous = prev ? prev.id : null; continue }
        r.previous = prev ? prev.id : null
        // a server error is not a reading of the page: it is recorded, never compared, and never the base of a later comparison
        if (r.status >= 500) { r.changed = null; r.failed = `the server answered ${r.status}: not a reading of the page`; continue }
        // a source may print something that differs on every visit (a clock): its pattern is removed before comparing
        const vol = sourceOf(r.host).volatile
        if (vol && !r.sha256_text_stable) { try { let t = fs.readFileSync(path.join(CV, r.id, 'text.txt'), 'utf8'); for (const re of vol) t = t.replace(new RegExp(re, 'g'), ''); r.sha256_text_stable = crypto.createHash('sha256').update(t.replace(/\s+/g, ' ').trim()).digest('hex'); r.ignored = sourceOf(r.host).volatile_why } catch { /* no private copy here */ } }
        const tx = x => x.sha256_text_stable || x.sha256_text
        r.changed = prev ? { text: tx(r) !== tx(prev), html: r.sha256_html !== prev.sha256_html, screenshot: r.sha256_screenshot !== prev.sha256_screenshot, status: r.status !== prev.status, since: prev.read_utc } : null
        // what changed, in words: sentences of the visible text present in one capture and not the other (from the private copies)
        if (!r.changed?.text) delete r.diff
        if (r.changed?.text && !r.diff) {
            const read = id => { try { return fs.readFileSync(path.join(CV, id, 'text.txt'), 'utf8') } catch { return null } }
            const A = read(prev.id), B = read(r.id)
            if (A != null && B != null) {
                const parts = t => t.split(/(?<=[.!?:])\s+|\s{2,}| \| /).map(x => x.trim()).filter(x => x.length > 2)
                const a = parts(A), b = parts(B), sa = new Set(a), sb = new Set(b)
                const gone = a.filter(x => !sb.has(x)), came = b.filter(x => !sa.has(x))
                r.diff = { removed: gone.length, added: came.length, chars_before: A.length, chars_after: B.length }
                if (r.shown) { r.diff.removed_text = gone.slice(0, 6).map(x => x.slice(0, 220)); r.diff.added_text = came.slice(0, 6).map(x => x.slice(0, 220)) }
            }
        }
        prev = r
    }
}

// a change read and judged by the archivist (evidence/reviewed.json): the hash differs, the content does not
const REVIEWED = (() => { try { return J(path.join(EV, 'reviewed.json')).reviewed } catch { return {} } })()
{ const same = new Map()   // a capture judged 'same content' is compared onward as the capture before it
  for (const chain of chains.values()) { let base = null
    for (const r of chain) { if (!r.captured || r.failed) continue
        const rv = REVIEWED[r.id]; if (rv) r.review = rv; else delete r.review
        if (rv?.verdict === 'same content' && base) same.set(r.id, base); else if (same.size && base && r.changed && r.previous && same.has(r.previous)) { const b = same.get(r.previous), tx = x => x.sha256_text_stable || x.sha256_text; if (tx(r) === tx(b)) { r.changed.text = false; delete r.diff } }
        if (!(rv?.verdict === 'same content')) base = r } } }
const realChange = x => !!(x.changed?.text && x.review?.verdict !== 'same content')
// ---- 3. the records and their pages
for (const r of all) { const t = termsOf(r.host); if (t) r.terms = t }
const depth = id => '../'.repeat(id.split('/').length)
for (const r of all) {
    const chain = chains.get(r.url), i = chain.indexOf(r)
    const out = JSON.stringify(Object.fromEntries(Object.entries(r).filter(([, v]) => v !== undefined)), null, 2) + '\n'
    const jf = path.join(EV, r.id + '.json')
    if (!fs.existsSync(jf) || JSON.stringify({ ...J(jf), updated: 0 }) !== JSON.stringify({ ...JSON.parse(out), updated: 0 })) W(jf, out)
}

// ---- 4. the index: by address, newest capture first
const addresses = [...chains.entries()].map(([url, chain]) => {
    const end = chain[chain.length - 1], last = [...chain].reverse().find(x => x.captured && !x.failed) || end, src = sourceOf(new URL(url).hostname)
    return { url, source: last.source, source_name: src.name, kind: src.kind, shown: !!src.show, title: [...chain].reverse().find(x => x.title)?.title || '', latest: last.id, latest_status: last.captured ? last.status : null, first_read: chain[0].read_utc, last_read: end.read_utc, changes: chain.filter(realChange).length,
        captures: chain.map(x => ({ id: x.id, read_utc: x.read_utc, status: x.captured ? x.status : null, changed: x.changed == null ? null : realChange(x), rendered_differently: x.changed?.text && !realChange(x) ? true : undefined, failed: x.failed ? true : undefined, })) }
}).sort((a, b) => a.source.localeCompare(b.source) || a.url.localeCompare(b.url))
const index = { about: 'Every capture of an outside page kept for this site, by address. A record is at evidence/<id>.json and its page at evidence/<id>.html; the list of every capture of an address, with its hashes, is in evidence/<source>/index.json (source = the first part of the id). The screenshots of sources that may be shown are in the display vault (data/vaults.json, a published read key); everything raw is in a private, packed vault. "changed" compares the visible text with the capture before.', by: BY, updated: now(), display_vault: vid('display'), counts: { addresses: addresses.length, captures: all.length, shown: all.filter(r => r.shown).length, changed: all.filter(realChange).length }, addresses }
const ixf = path.join(EV, 'index.json')
// the main index carries one line per address (no per-capture list: that is in <source>/index.json), so it stays small
const slim = { ...index, addresses: addresses.map(a => ({ url: a.url, source: a.source, shown: a.shown, title: (a.title || '').slice(0, 90), latest: a.latest, latest_status: a.latest_status, last_read: a.last_read, count: a.captures.length, changes: a.changes })) }
if (!fs.existsSync(ixf) || JSON.stringify({ ...J(ixf), updated: 0 }) !== JSON.stringify({ ...slim, updated: 0 })) W(ixf, JSON.stringify(slim) + '\n')   // one line: this file must stay under 256 KB; the hashes are in each record and in <source>/index.json
// per source: the same rows with every capture's hashes
const bySource = new Map(); for (const a of addresses) { if (!bySource.has(a.source)) bySource.set(a.source, []); bySource.get(a.source).push(a) }
for (const [sid, list] of bySource) {
    const doc = { about: `Every capture of ${list[0].source_name}'s addresses, with the sha256 of each capture's visible text and screenshot.`, by: BY, updated: now(), source: sid, addresses: list.map(a => ({ ...a, captures: a.captures.map(c => ({ ...c, sha256_text: byId.get(c.id)?.sha256_text, sha256_screenshot: byId.get(c.id)?.sha256_screenshot })) })) }
    const sf = path.join(EV, sid, 'index.json')
    if (!fs.existsSync(sf) || JSON.stringify({ ...J(sf), updated: 0 }) !== JSON.stringify({ ...doc, updated: 0 })) W(sf, JSON.stringify(doc, null, 1) + '\n')
}

// ---- 5. timeline rows and decision files -> evidence ids (so a row can link to our page of its source)
const never = h => [...SOURCES.never.hosts, ...SOURCES.forbidden.hosts].some(x => h === x || h.endsWith('.' + x))
const rows = {}
for (const d of fs.readdirSync(path.join(ROOT, 'incidents'))) {
    const sf = path.join(ROOT, 'incidents', d, 'data/signals.json'); if (!fs.existsSync(sf)) continue
    for (const it of J(sf).items || []) for (const s of it.sources || []) {
        if (!s.url || !/^https?:/.test(s.url)) continue
        let h; try { h = new URL(s.url).hostname.replace(/^www\./, '') } catch { continue }
        const chain = chains.get(new URL(s.url).href) || chains.get(s.url)
        const good = chain && [...chain].reverse().find(x => x.captured && !x.failed)
        ;(rows[it.id] ||= []).push({ url: s.url, evidence: good ? good.id : null, captures: chain ? chain.length : 0, why: good ? undefined : never(h) ? 'never captured (a social platform, or terms that forbid automated reading)' : chain ? chain[chain.length - 1].why : 'not captured yet' })
    }
}
const rf = path.join(EV, 'rows.json')
const rowsDoc = { about: 'For each timeline row (its permanent id), the outside addresses it cites and our latest capture of each: link the row to evidence/<evidence>.html. null means there is no capture, with the reason.', by: BY, updated: now(), rows }
if (!fs.existsSync(rf) || JSON.stringify({ ...J(rf), updated: 0 }) !== JSON.stringify({ ...rowsDoc, updated: 0 })) W(rf, JSON.stringify(rowsDoc, null, 1) + '\n')

// ---- 5b. the Wayback for data: every feed whose keeper publishes reads.json in the agreed shape (read only; never written by us)
const feeds = walk(path.join(ROOT, 'sources'), n => n === 'reads.json').map(f => { try { const j = J(f); if (!j.feed || !Array.isArray(j.reads)) return null
    const rs = j.reads, rel = path.relative(ROOT, f)
    return { feed: j.feed, url: j.url, owner: j.by, licence: j.licence, reads: rel, vault: rs.find(x => x.vault)?.vault.id || null, first_read: rs[0]?.read_utc || null, last_read: rs[rs.length - 1]?.read_utc || null, count: rs.length, changes: rs.filter(x => x.changed === true).length } } catch { return null } }).filter(Boolean).sort((a, b) => a.feed.localeCompare(b.feed))
const df = path.join(EV, 'data.json')
const dataDoc = { about: 'The Wayback for data: every machine feed read over time, one row per feed. Each feed is kept by its own agent (owner); its reads.json lists every read oldest first with read_utc, sha256, changed, the vault path of the bytes and the diff. This file only indexes them.', by: BY, updated: now(), feeds }
if (!fs.existsSync(df) || JSON.stringify({ ...J(df), updated: 0 }) !== JSON.stringify({ ...dataDoc, updated: 0 })) W(df, JSON.stringify(dataDoc, null, 1) + '\n')
const feedTable = feeds.length ? `## Data: every read of a feed over time

Machine feeds are read on a schedule by their own agents; each read is kept with its sha256 and, when the bytes changed, a diff. As data: [data.json](data.json).

| Feed | Address | Reads | Changes | First read | Last read | Every read |
|---|---|---|---|---|---|---|
${feeds.map(f => `| ${mdEsc(f.feed)} | \`${f.url}\` | ${f.count} | ${f.changes} | ${f.first_read ? utc(f.first_read) : ''} | ${f.last_read ? utc(f.last_read) : ''} | [reads.json](../${f.reads}) |`).join('\n')}

` : ''
// ---- 6. the section's front page
const c = index.counts
const table = addresses.map(a => `| ${mdEsc(a.source_name)} | [${mdEsc(a.title || a.url.replace(/^https?:\/\//, '').slice(0, 70))}](${a.latest}.md) \`${a.url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 80)}\` | ${utc(a.last_read)} | ${a.captures.length} | ${a.captures.length < 2 ? 'one capture' : a.captures[a.captures.length - 1].changed ? '**changed** at the last read' : 'unchanged at the last read'}${a.changes ? ` (${a.changes} change${a.changes > 1 ? 's' : ''} in all)` : ''} | ${a.shown ? 'screenshot' : 'hash and excerpt'} |`).join('\n')
const im = `---
title: Wayback: what each outside page looked like when we read it
summary: Our dated captures of every outside page this site cites: a screenshot, the sha256 of what was served, the time read, and whether the page has changed since.
---
## Wayback: our captures of outside pages and feeds

> Kept by ${BY}, ${utc(index.updated)}

Every time this site cites an outside page, we keep what that page looked like at that moment: a screenshot, the HTML as served, and the sha256 of each. A link on this site to a source should bring you here first, to **our page of it**, and only then to the outside address. When we read a page again we record whether it still says the same thing.

**${c.addresses} addresses, ${c.captures} captures, ${c.shown} with a screenshot shown, ${c.changed} recorded changes.** The same list as data: [index.json](index.json); timeline rows to captures: [rows.json](rows.json); which sources may be shown and why: [sources.json](sources.json).

| Source | Page (our latest capture) | Last read | Captures | Since the one before | Shown |
|---|---|---|---|---|---|
${table}

${feedTable}## How to read a capture

- **Evidence, not fact.** A capture proves what an address served to us at a time. It does not make what the page says true.
- **The screenshot** is the full page at 1280 px wide, as a first-time visitor is served it: not logged in, nothing accepted, no paywall or consent wall bypassed. Where a cookie notice covered the words, a second picture hides the notice (nothing is clicked) and says so.
- **Three hashes**: of the HTML as served, of the visible text, and of the screenshot. "Changed" is judged on the visible text; pages with clocks or rotating parts change in their HTML on every read.
- **Where the files are.** Screenshots of official and public-body pages are in a display vault, readable by anyone with the published read key in [data/vaults.json](../data/vaults.json); your browser fetches the encrypted file, decrypts it and checks it against the hash in the record. Press pages are captured too, but kept privately: for those we show the hash, the title, the time and a short excerpt, with the link. Personal social posts are never captured.
- **One request at a time**, a few seconds apart, as \`Mozilla/5.0 (compatible; page-capture/1.0)\`, after reading each host's robots.txt. The tool: [tools/capture.mjs](../tools/capture.mjs).

Not a warning service: for the live warning, go to IPMA and ANEPC.
`
const imf = path.join(EV, 'README.md')
if (!fs.existsSync(imf) || fs.readFileSync(imf, 'utf8').replace(/> Kept by.*\n/, '') !== im.replace(/> Kept by.*\n/, '')) W(imf, im)

// ---- 7. the vaults
if (args.includes('--push')) for (const [dir, label] of [[CV, 'capture'], [DV, 'display']]) {
    try {
        try { execFileSync('sgit', ['commit', '-m', `captures to ${now()}`], { cwd: dir, stdio: 'ignore' }) } catch { /* nothing new to commit */ }
        execFileSync('sgit', ['--token', process.env.SG_SEND_ACCESS_TOKEN || '', 'push'], { cwd: dir, stdio: 'ignore', timeout: 240000 })
        console.log(`${label} vault pushed`)
    } catch (e) { console.log(`${label} vault NOT pushed: ${String(e.message).split('\n')[0].replace(/--token \S+/, '--token <hidden>')}`); process.exitCode = 1 }
}
console.log(`records: ${added} new, ${all.length} in all, ${addresses.length} addresses, ${Object.keys(rows).length} timeline rows mapped`)
