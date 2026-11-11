#!/usr/bin/env node
// The MeteoAlarm reader: one polite read of a country's warning feed, kept as a dated record with a compact diff.
//
//     node tools/source-meteoalarm.mjs                     # Portugal: read, diff against the previous read, write the records
//     node tools/source-meteoalarm.mjs --country spain     # another country's feed (its own folder)
//     node tools/source-meteoalarm.mjs --from FILE         # diff a copy already on disk instead of fetching (tests, replays)
//     node tools/source-meteoalarm.mjs --no-vault          # do not copy into the data vault
//
// What git keeps (small JSON only, under sources/meteoalarm/data/<country>/):
//   latest.json   the feed as a compact table (one line per CAP message), with the sha256 of the bytes it came from;
//   reads.json    one entry per read: time, sha256, bytes, how many messages, what changed (counts);
//   diffs/<yyyy>/<mm>/<dd>/<hhmmss>.json   only when the set of messages changed: appeared, replaced (level or hours
//                 changed), left the feed (expired, replaced, or withdrawn), passed their expiry while still listed.
// What git never keeps: the feed itself (hundreds of KB per read). The full copy goes to the data vault, in the
// latest/ plus dated-folder shape (RESTRUCTURE.md): <country>/latest/<file> and <country>/<yyyy>/<mm>/<dd>/<hh>/<file>,
// a dated copy only when the bytes changed. The vault folder is SOURCE_VAULT_DIR (default
// ~/vaults/storm-charles-source-meteoalarm); its key is never read, printed or written here.
//
// MeteoAlarm's terms ask re-users to name the national service, keep the time of issue, link www.meteoalarm.org and
// publish its disclaimer: latest.json carries all four. This is a dated record, not a live feed and not a warning service.
// Kept by incident.sources@web-summit.dinis. Zero dependencies, Node 18+.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1] }
const COUNTRY = opt('--country', 'portugal')
if (!/^[a-z-]+$/.test(COUNTRY)) { console.error('country: lower-case letters and dashes, as in the feed address'); process.exit(2) }
const FEED = `https://feeds.meteoalarm.org/api/v1/warnings/feeds-${COUNTRY}`
const ATOM = `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-${COUNTRY}`
const CLIENT = 'storm-charles-sources-reader'   // a plain client name; no contact details (CLAUDE.md)
const DIR = path.join(ROOT, 'sources/meteoalarm/data', COUNTRY)
const VAULT = args.includes('--no-vault') ? null : (process.env.SOURCE_VAULT_DIR || path.join(os.homedir(), 'vaults/storm-charles-source-meteoalarm'))
const BY = 'incident.sources@web-summit.dinis'
const DISCLAIMER = 'Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to www.meteoalarm.org.'

const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const readJson = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return d } }
const writeJson = (f, o) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(o, null, 1) + '\n') }
const utc = s => s ? new Date(s).toISOString().replace(/\.\d+Z$/, 'Z') : null
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function fetchBytes(url) {
    const r = await fetch(url, { headers: { 'User-Agent': CLIENT }, signal: AbortSignal.timeout(60000) })
    if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`)
    return Buffer.from(await r.arrayBuffer())
}

// one CAP message -> one compact line. The English info block when there is one, the national one beside it.
function compact(w) {
    const a = w.alert || {}, infos = a.info || []
    const en = infos.find(i => /^en/i.test(i.language || '')) || infos[0] || {}
    const nat = infos.find(i => !/^en/i.test(i.language || '')) || en
    const par = Object.fromEntries((en.parameter || []).map(p => [p.valueName, p.value]))
    const lvl = String(par.awareness_level || '').split(';').map(s => s.trim())
    const typ = String(par.awareness_type || '').split(';').map(s => s.trim())
    const areas = (en.area || []).map(x => ({ name: x.areaDesc, emma: (x.geocode || []).filter(g => g.valueName === 'EMMA_ID').map(g => g.value).join(',') }))
    const ref = String(a.references || '').trim().split(/\s+/).filter(Boolean).map(r => { const p = r.split(','); return { id: p[1], sent_utc: utc(p[2]) } })
    return {
        id: a.identifier, uuid: w.uuid, sent_utc: utc(a.sent), msg_type: a.msgType,
        replaces: ref.length ? ref : null,
        area: areas.map(x => x.name).join('; '), emma: areas.map(x => x.emma).join(';'),
        level: lvl[1] || null, hazard: typ[1] || null,
        event: en.event || null, event_national: nat.event || null,
        onset_utc: utc(en.onset), expires_utc: utc(en.expires),
        severity: en.severity, certainty: en.certainty, urgency: en.urgency,
        text: en.description || null,
        sender: en.senderName || a.sender || null,
        h: sha(JSON.stringify(a)).slice(0, 16),
    }
}

const brief = m => ({ id: m.id, area: m.area, hazard: m.hazard, level: m.level, onset_utc: m.onset_utc, expires_utc: m.expires_utc, sent_utc: m.sent_utc })

function diff(prev, cur, prevRead, now) {
    const P = new Map(prev.map(m => [m.id, m])), C = new Map(cur.map(m => [m.id, m]))
    const replacedBy = new Map()   // old id -> the message that names it in `references`
    for (const m of cur) for (const r of m.replaces || []) replacedBy.set(r.id, m)
    const out = { appeared: [], replaced: [], left: [], expired_in_feed: [], changed_in_place: [] }
    for (const m of cur) {
        if (P.has(m.id)) {
            const o = P.get(m.id)
            if (o.h !== m.h) out.changed_in_place.push({ ...brief(m), was: brief(o) })
            else if (m.expires_utc && m.expires_utc > prevRead && m.expires_utc <= now) out.expired_in_feed.push(brief(m))
            continue
        }
        if (!m.replaces) { out.appeared.push({ ...brief(m), event: m.event }); continue }
        for (const r of m.replaces) {
            const o = P.get(r.id) || C.get(r.id)
            const rec = { ...brief(m), event: m.event, replaces: r.id, replaces_sent_utc: r.sent_utc }
            if (!o) rec.was = 'not held: the replaced message was never in a read of ours'
            else {
                rec.was = brief(o)
                rec.level_changed = o.level !== m.level ? `${o.level} -> ${m.level}` : false
                rec.hours_changed = (o.onset_utc !== m.onset_utc || o.expires_utc !== m.expires_utc) ? `${o.onset_utc} to ${o.expires_utc} -> ${m.onset_utc} to ${m.expires_utc}` : false
                rec.text_changed = o.text !== m.text
            }
            out.replaced.push(rec)
        }
    }
    for (const o of prev) {
        if (C.has(o.id)) continue
        const by = replacedBy.get(o.id)
        out.left.push({ ...brief(o), why: by ? 'replaced' : (o.expires_utc && o.expires_utc <= now ? 'expired' : 'withdrawn or dropped before its expiry'), ...(by ? { replaced_by: by.id } : {}) })
    }
    return out
}

const stamp = d => ({ y: d.slice(0, 4), m: d.slice(5, 7), d: d.slice(8, 10), hh: d.slice(11, 13), hms: d.slice(11, 19).replace(/:/g, '') })

async function main() {
    const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
    const from = opt('--from', null)
    const bytes = from ? fs.readFileSync(from) : await fetchBytes(FEED)
    const digest = sha(bytes)
    const feed = JSON.parse(bytes.toString('utf8'))
    const cur = (feed.warnings || []).map(compact).sort((a, b) => (a.sent_utc || '').localeCompare(b.sent_utc || '') || String(a.id).localeCompare(String(b.id)))

    const latestFile = path.join(DIR, 'latest.json'), readsFile = path.join(DIR, 'reads.json')
    const prev = readJson(latestFile, null)
    const reads = readJson(readsFile, { about: `Every read of MeteoAlarm's ${COUNTRY} feed by tools/source-meteoalarm.mjs: when, the sha256 of the bytes received, their size, how many CAP messages, and what changed since the read before (counts; the detail is the diff file named). The bytes themselves are in the data vault (../../dataset.json), never in git. Facts about the feed as we received it.`, source: FEED, by: BY, reads: [] })

    const entry = { read_utc: now, sha256: digest, bytes: bytes.length, messages: cur.length }
    let d = null
    if (!prev) entry.note = 'first read: the baseline, nothing to compare with'
    else if (prev.sha256 === digest) entry.same_bytes_as_previous = true
    else {
        d = diff(prev.messages, cur, prev.read_utc, now)
        const n = Object.fromEntries(Object.entries(d).map(([k, v]) => [k, v.length]))
        entry.changes = n
        if (Object.values(n).some(Boolean)) {
            const s = stamp(now), rel = `diffs/${s.y}/${s.m}/${s.d}/${s.hms}.json`
            writeJson(path.join(DIR, rel), { about: `What changed in MeteoAlarm's ${COUNTRY} feed between two reads of ours. appeared: a new message that replaces nothing; replaced: a new message that names an earlier one (with whether the level or the hours changed); left: no longer listed (expired, replaced, or gone before its expiry); expired_in_feed: still listed, its expiry passed between the reads. Facts about the feed; the warnings are the national service's.`, source: FEED, from_read_utc: prev.read_utc, to_read_utc: now, from_sha256: prev.sha256, to_sha256: digest, counts: n, ...d, by: BY, updated: now })
            entry.diff = rel
        } else entry.note = 'the bytes changed, the set of messages did not'
    }

    // the Atom twin of the same feed: its hash only (its <updated> stamp changes on every read)
    let atom = null
    if (!from && !args.includes('--no-atom')) {
        await sleep(3000)
        try { atom = await fetchBytes(ATOM); entry.atom = { sha256: sha(atom), bytes: atom.length, entries: (atom.toString('utf8').match(/<entry>/g) || []).length } }
        catch (e) { entry.atom = { error: String(e.message) } }
    }

    // the vault copy: latest/ always, a dated copy only when the bytes changed
    if (VAULT && fs.existsSync(VAULT)) {
        const s = stamp(now), base = path.join(VAULT, COUNTRY)
        const put = (rel, buf) => { const f = path.join(base, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, buf) }
        put(`latest/feeds-${COUNTRY}.json`, bytes)
        if (atom) put(`latest/meteoalarm-legacy-atom-${COUNTRY}.xml`, atom)
        const dated = `${s.y}/${s.m}/${s.d}/${s.hh}`
        if (!prev || prev.sha256 !== digest) {
            put(`${dated}/feeds-${COUNTRY}-${s.hms}.json`, bytes)
            if (atom) put(`${dated}/meteoalarm-legacy-atom-${COUNTRY}-${s.hms}.xml`, atom)
            if (entry.diff) put(`${dated}/diff-${s.hms}.json`, fs.readFileSync(path.join(DIR, entry.diff)))
            entry.vault = { latest: `${COUNTRY}/latest/feeds-${COUNTRY}.json`, dated: `${COUNTRY}/${dated}/feeds-${COUNTRY}-${s.hms}.json` }
        } else entry.vault = { latest: `${COUNTRY}/latest/feeds-${COUNTRY}.json`, dated: 'none: the same bytes as the previous read' }
    } else entry.vault = 'no vault folder on this machine: the full copy was not kept'

    // the pointer git keeps to the vault: every file's path, size and sha256 (never a key that can write)
    if (VAULT && fs.existsSync(VAULT)) {
        const dsFile = path.join(ROOT, 'sources/meteoalarm/dataset.json')
        const ds = readJson(dsFile, {})
        const files = []
        const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name.startsWith('.')) continue; const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else { const b = fs.readFileSync(f); files.push({ path: path.relative(VAULT, f), bytes: b.length, sha256: sha(b) }) } } }
        walk(VAULT)
        files.sort((a, b) => a.path.localeCompare(b.path))
        writeJson(dsFile, {
            about: "Where the full copies of MeteoAlarm's feeds are kept: a data vault (SG/Send, made with sgit), in the latest/ plus dated-folder shape: <country>/latest/<file> is overwritten on every read; <country>/<yyyy>/<mm>/<dd>/<hh>/<file>-<hhmmss> is added only when the bytes changed, with the diff against the read before. Git keeps this pointer: each file's path, size and sha256, so a copy can be checked against what we read. The feeds are MeteoAlarm's (CC BY 4.0 equivalent with its terms: source.json); the warnings are each national service's.",
            vault: { id: ds.vault?.id || process.env.SOURCE_VAULT_ID || 'not recorded', kind: 'data vault (normal, not packed)', read_key: ds.vault?.read_key || 'not published yet: see agents/sources/status.json', made_by: BY, made_utc: ds.vault?.made_utc || now },
            shape: { latest: `${COUNTRY}/latest/`, dated: `${COUNTRY}/<yyyy>/<mm>/<dd>/<hh>/` },
            files: files.slice(-400), files_total: files.length, by: BY, updated: now,
        })
    }
    reads.reads.push(entry)
    reads.updated = now
    writeJson(readsFile, reads)

    const counts = {}
    for (const m of cur) { const k = m.level || 'none'; counts[k] = (counts[k] || 0) + 1 }
    const live = cur.filter(m => m.expires_utc > now)
    const latest = {
        about: `MeteoAlarm's ${COUNTRY} warning feed as a compact table: one line per CAP message in the feed at the time read, oldest sent first. The warnings are issued by the national service named in each line (\`sender\`); MeteoAlarm (EUMETNET) carries them. A dated record, not a live feed: read ${now}. ${DISCLAIMER} Not a warning service. Facts.`,
        source: FEED, meteoalarm: 'https://www.meteoalarm.org', atom: ATOM,
        cap_xml_of_one_message: `${FEED}/<uuid>`,
        disclaimer: DISCLAIMER,
        licence: 'CC BY 4.0 with MeteoAlarm\'s additional terms for redistribution (sources/meteoalarm/source.json)',
        read_utc: now, sha256: digest, bytes: bytes.length,
        counts: { messages: cur.length, not_yet_expired: live.length, by_level: counts, oldest_sent_utc: cur[0]?.sent_utc || null, newest_sent_utc: cur[cur.length - 1]?.sent_utc || null },
        fields: { id: 'CAP identifier', uuid: "MeteoAlarm's id for the message (its CAP XML is at cap_xml_of_one_message)", sent_utc: 'when the national service issued it', msg_type: 'Alert (new) or Update (replaces another)', replaces: 'the message(s) it names in CAP references, with their sent time', area: 'areaDesc', emma: "MeteoAlarm's region code (EMMA_ID)", level: 'awareness_level: yellow, orange, red', hazard: 'awareness_type', event: 'English event name', event_national: 'the event in the national language', onset_utc: 'start of the warned period', expires_utc: 'end of the warned period', text: 'the English description, unedited', h: 'first 16 hex of the sha256 of the message as JSON' },
        messages: cur, by: BY, updated: now,
    }
    let body = JSON.stringify(latest, null, 0)
    if (body.length > 230 * 1024) { latest.messages = cur.map(({ text, ...m }) => m); latest.about += ' The descriptions were left out to keep this file under 256 KB.' }
    fs.mkdirSync(DIR, { recursive: true })
    fs.writeFileSync(latestFile, '{\n' + Object.entries(latest).map(([k, v]) => k === 'messages' ? ` "messages": [\n${v.map(m => '  ' + JSON.stringify(m)).join(',\n')}\n ]` : ` ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n')

    const c = entry.changes
    console.log(`${COUNTRY} ${now} sha256 ${digest.slice(0, 16)} ${bytes.length} B, ${cur.length} messages (${live.length} not yet expired)` + (c ? `; appeared ${c.appeared}, replaced ${c.replaced}, left ${c.left}, expired in feed ${c.expired_in_feed}, changed in place ${c.changed_in_place}` : entry.same_bytes_as_previous ? '; the same bytes as the previous read' : '; first read'))
}
main().catch(e => { console.error('source-meteoalarm: ' + e.message); process.exit(1) })
