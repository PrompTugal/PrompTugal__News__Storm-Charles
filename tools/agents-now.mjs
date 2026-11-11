#!/usr/bin/env node
// The team at work, now (kept by incident.observability@web-summit.dinis, 11 November 2026, WS-214).
//
//   node tools/agents-now.mjs --out _site   writes ONLY <out>/data/agents/now.json: who pushed in the hour before the build,
//                                           what our agents read from outside bodies, which feeds changed, and the links.
// A build generator ("after" in admin/build/generators.json, so <out>/api/v1/index.json already exists).
// Reads tracked snapshots only: data/agents/commits.json, incident.ci@'s data/ci/commits/ files (named by data/ci/index.json),
// agents/<role>/status.json, and fetch records under incidents/*/data/, evidence/, sources/ and data/*/. No git history,
// no network. Values are escaped by the page that renders them (app/agents/now.js), not here.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const OUT = args.includes('--out') ? path.resolve(args[args.indexOf('--out') + 1]) : null
if (!OUT) { console.error('usage: agents-now.mjs --out <dir>'); process.exit(2) }
const t0 = Date.now()
const ms = s => { const t = Date.parse(s); return Number.isFinite(t) ? t : NaN }
const NOW = Math.floor(Date.now() / 1000) * 1000, HOUR = 3600e3   // the build time, to the second: no time in the output is later
let future = 0   // stamps later than the build time, or that do not parse: dropped and counted
const ok = s => { const t = ms(s); if (!Number.isFinite(t) || t > NOW) { future++; return false } return true }
const readAbs = f => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return null } }
const read = rel => readAbs(path.join(ROOT, rel))
const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?Z$/
const SESSION = /(https?:\/\/)?claude\.ai\/code\/session_[A-Za-z0-9_-]*|session_[A-Za-z0-9]{8,}/g
const clean = s => String(s ?? '').replace(SESSION, '[session]').replace(/\s+/g, ' ').trim().slice(0, 160)

// ---- agents: name -> role, job (data/agents/index.json), and each status file's wake ----
const AG = new Map()
for (const a of read('data/agents/index.json')?.agents || []) if (a.name && a.role) AG.set(a.name, { role: a.role, job: clean(a.job || '').slice(0, 80) })
const woke = new Map()
let roles = []; try { roles = fs.readdirSync(path.join(ROOT, 'agents'), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name) } catch { }
for (const r of roles) {
    const s = read(`agents/${r}/status.json`); if (!s) continue
    const name = s.agent || [...AG].find(([, v]) => v.role === r)?.[0]; if (!name) continue
    if (!AG.has(name)) AG.set(name, { role: r, job: '' })
    const w = [s.last_wake, s.updated].filter(x => typeof x === 'string' && ISO.test(x) && ms(x) <= NOW).sort().pop()
    if (w) woke.set(name, w)
}
const roleOf = n => AG.get(n)?.role || ''

// ---- commits: observability's snapshot and incident.ci@'s newest files, merged by sha ----
const commits = new Map()
const add = (c, from) => {
    if (!c || !/^[0-9a-f]{7,40}$/.test(c.sha || '')) return
    if (!ISO.test(c.at || '') || !ok(c.at)) { if (!ISO.test(c.at || '')) future++; return }
    const prev = commits.get(c.sha)
    const to = (Array.isArray(c.to) ? c.to : []).filter(x => typeof x === 'string' && /^[a-z0-9.-]+@[a-z0-9.-]+$/i.test(x))
    commits.set(c.sha, { sha: c.sha, at: c.at, agent: c.agent || prev?.agent || '', what: clean(c.what || prev?.what), for: to.length ? to : prev?.for || [], source: prev ? prev.source : from })
}
const snapA = read('data/agents/commits.json')
for (const c of snapA?.items || []) add(c, 'data/agents/commits.json')
const ciIdx = read('data/ci/index.json')
const ciFiles = (ciIdx?.files?.commits || []).filter(f => typeof f.file === 'string' && /^commits\/[A-Za-z0-9T._-]+\.json$/.test(f.file)).sort((a, b) => String(a.to).localeCompare(String(b.to))).slice(-2)
for (const f of ciFiles) for (const c of read('data/ci/' + f.file)?.commits || []) add(c, 'data/ci/' + f.file)
const all = [...commits.values()].sort((a, b) => b.at.localeCompare(a.at))
const newest = all[0]?.at || null
const short = c => ({ agent: c.agent, role: roleOf(c.agent), what: c.what, at: c.at, sha: c.sha, for: c.for, source: c.source })
const recent = all.filter(c => NOW - ms(c.at) <= HOUR)
const byAgent = new Map()   // one row per agent: its newest push, every For: of the hour, how many pushes
for (const c of recent) { const a = byAgent.get(c.agent); if (!a) byAgent.set(c.agent, { ...short(c), for: new Set(c.for), commits: 1, woke: woke.get(c.agent) || null }); else { a.commits++; c.for.forEach(x => a.for.add(x)) } }
const working = [...byAgent.values()].filter(a => a.agent).map(a => ({ ...a, for: [...a.for] })).sort((a, b) => b.at.localeCompare(a.at))
const stale = !recent.length
const latest = (stale ? all.slice(0, 12) : recent.slice(0, 12)).map(short)
const wokeHour = [...woke].filter(([, w]) => NOW - ms(w) <= HOUR).map(([agent, at]) => ({ agent, role: roleOf(agent), at, source: `agents/${roleOf(agent)}/status.json` })).sort((a, b) => b.at.localeCompare(a.at))

// ---- sources read: fetch records with a read time beside a source url ----
const BODIES = [
    ['ipma.pt', 'IPMA'], ['prociv.gov.pt', 'ANEPC / Proteção Civil'], ['prociv.pt', 'ANEPC / Proteção Civil'], ['cm-lisboa.pt', 'Câmara Municipal de Lisboa'],
    ['lisboa.pt', 'Câmara Municipal de Lisboa'], ['portugal.gov.pt', 'Governo de Portugal'], ['gov.pt', 'Governo de Portugal'], ['websummit.com', 'Web Summit'],
    ['ana.pt', 'ANA Aeroportos'], ['aeroportolisboa.pt', 'Aeroporto de Lisboa'], ['metrolisboa.pt', 'Metro de Lisboa'], ['cp.pt', 'CP Comboios de Portugal'],
    ['carris.pt', 'Carris'], ['transtejo.pt', 'Transtejo'], ['ttsl.pt', 'Transtejo'], ['lusoponte.pt', 'Lusoponte'], ['infraestruturasdeportugal.pt', 'Infraestruturas de Portugal'],
    ['meteoalarm.org', 'MeteoAlarm'], ['aemet.es', 'AEMET'], ['metoffice.gov.uk', 'Met Office'], ['ecmwf.int', 'ECMWF'], ['eumetsat.int', 'EUMETSAT'],
    ['amn.pt', 'Autoridade Marítima Nacional'], ['apambiente.pt', 'APA'], ['snirh.apambiente.pt', 'SNIRH / APA'], ['lusa.pt', 'Lusa'], ['rtp.pt', 'RTP'],
    ['publico.pt', 'Público'], ['observador.pt', 'Observador'], ['expresso.pt', 'Expresso'], ['dn.pt', 'Diário de Notícias'], ['cnnportugal.iol.pt', 'CNN Portugal'],
    ['noticiasaominuto.com', 'Notícias ao Minuto'], ['sapo.pt', 'SAPO'], ['cmjornal.pt', 'Correio da Manhã'], ['tsf.pt', 'TSF'], ['euronews.com', 'Euronews'],
    ['wikipedia.org', 'Wikipedia'], ['jornaleconomico.pt', 'Jornal Económico'], ['jornaldenegocios.pt', 'Jornal de Negócios'], ['dnoticias.pt', 'DNotícias'],
    ['eco.sapo.pt', 'ECO'], ['sicnoticias.pt', 'SIC Notícias'], ['jn.pt', 'Jornal de Notícias'], ['open-meteo.com', 'Open-Meteo'], ['github.com', 'GitHub'],
    ['carrismetropolitana.pt', 'Carris Metropolitana'], ['opensky-network.org', 'OpenSky Network'], ['aviationweather.gov', 'NOAA Aviation Weather Center'], ['met.no', 'MET Norway'],
    ['fertagus.pt', 'Fertagus'], ['emel.pt', 'EMEL'], ['nav.pt', 'NAV Portugal'], ['sns.gov.pt', 'SNS'], ['dge.pt', 'DGE'], ['ine.pt', 'INE']]
const SOCIAL = /(^|\.)(x\.com|twitter\.com|t\.co|facebook\.com|fb\.com|fb\.watch|instagram\.com|tiktok\.com|bsky\.app|bsky\.social|threads\.net|reddit\.com|redd\.it|youtube\.com|youtu\.be|linkedin\.com|lnkd\.in|medium\.com|substack\.com|tumblr\.com|pinterest\.com|telegram\.org|t\.me|whatsapp\.com|discord\.com|twitch\.tv|vimeo\.com|flickr\.com|blogspot\.com|wordpress\.com|wixsite\.com|github\.io|mastodon\.[a-z]+|[a-z0-9-]*mastodon[a-z0-9-]*\.[a-z]+|mstdn\.[a-z]+|masto\.[a-z]+|social\.[a-z]+|pixelfed\.[a-z]+|truthsocial\.com|vk\.com|weibo\.com)$/i
const bodyOf = h => { for (const [d, n] of BODIES) if (h === d || h.endsWith('.' + d)) return n; return h }
const TIME_KEYS = ['read_utc', 'read_at', 'fetched_at', 'fetched_utc', 'retrieved_utc', 'retrieved_at', 'last_read_utc', 'time_read', 'read']
const URL_KEYS = ['url', 'source_url', 'source']
const HAS_TIME = new RegExp(`"(${TIME_KEYS.join('|')})"\\s*:\\s*"\\d{4}-`)
const reads = new Map(); let privateN = 0; const privateSeen = new Set(); let records = 0, filesWalked = 0
const visit = (o, rel, depth) => {
    if (!o || typeof o !== 'object' || depth > 12) return
    if (Array.isArray(o)) { for (const x of o) visit(x, rel, depth + 1); return }
    const tk = TIME_KEYS.find(k => typeof o[k] === 'string' && ISO.test(o[k]))
    const uk = tk && URL_KEYS.find(k => typeof o[k] === 'string' && /^https?:\/\//i.test(o[k]))
    if (tk && uk) {
        records++
        const url = o[uk].trim(), t = o[tk]; let host = ''
        try { host = new URL(url).hostname.toLowerCase().replace(/^www\./, '') } catch { }
        if (host && ok(t)) {
            if (SOCIAL.test(host)) { if (NOW - ms(t) <= 6 * HOUR && !privateSeen.has(url)) { privateSeen.add(url); privateN++ } }
            else if (/^https:\/\//i.test(url) && !/[?&](token|key|sig|signature|access_token)=/i.test(url)) {
                const p = reads.get(url); if (!p || p.read_utc < t) reads.set(url, { body: bodyOf(host), host, url: url.slice(0, 300), read_utc: t, source_file: rel })
            }
        }
    }
    for (const k in o) if (o[k] && typeof o[k] === 'object') visit(o[k], rel, depth + 1)
}
const SKIP = new Set(['node_modules', '_site', 'vendor'])
const walk = (rel, maxBytes = 512 * 1024) => {
    let ents; try { ents = fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true }) } catch { return }
    for (const e of ents) {
        if (e.name.startsWith('.') || SKIP.has(e.name)) continue
        const r = rel + '/' + e.name
        if (e.isDirectory()) walk(r, maxBytes)
        else if (e.name.endsWith('.json')) { const f = path.join(ROOT, r); try { if (fs.statSync(f).size > maxBytes) continue } catch { continue } filesWalked++; let t; try { t = fs.readFileSync(f, 'utf8') } catch { continue } if (!HAS_TIME.test(t)) continue; let j; try { j = JSON.parse(t) } catch { continue } visit(j, r, 0) }
    }
}
let incs = []; try { incs = fs.readdirSync(path.join(ROOT, 'incidents')) } catch { }
for (const d of incs) walk(`incidents/${d}/data`)
walk('evidence'); walk('sources')
let dataDirs = []; try { dataDirs = fs.readdirSync(path.join(ROOT, 'data'), { withFileTypes: true }).filter(e => e.isDirectory() && !['agents', 'ci', 'graph', 'flows'].includes(e.name)).map(e => e.name) } catch { }
for (const d of dataDirs) walk('data/' + d)
const sortedReads = [...reads.values()].sort((a, b) => b.read_utc.localeCompare(a.read_utc))
let sourcesWindow = 1, sources = sortedReads.filter(r => NOW - ms(r.read_utc) <= HOUR)
if (sources.length < 5) { sourcesWindow = 6; sources = sortedReads.filter(r => NOW - ms(r.read_utc) <= 6 * HOUR) }
sources = sources.slice(0, 60)

// ---- feeds: the catalogue the build just wrote, each file's own stamp ----
const cat = readAbs(path.join(OUT, 'api/v1/index.json'))
const stampOf = j => { if (!j || typeof j !== 'object') return null; for (const k of ['updated', 'read_utc', 'last_read_utc', 'generated_utc']) if (typeof j[k] === 'string' && ISO.test(j[k])) return { at: j[k], from: k }; return null }
const feedsAll = (cat?.datasets || []).filter(d => typeof d.url === 'string' && /^api\/v1\/[A-Za-z0-9._/-]+\.json$/.test(d.url)).map(d => {
    let s = stampOf(readAbs(path.join(OUT, d.url))); if (s && !ok(s.at)) s = null
    return { path: `${d.incident}/${d.path}`, api: d.url, changed: s ? s.at : 'not stated', stamp: s ? s.from : null, bytes: d.bytes, source: 'api/v1/index.json' }
}).sort((a, b) => (b.changed === 'not stated' ? '' : b.changed).localeCompare(a.changed === 'not stated' ? '' : a.changed))

const BUILT = new Date(NOW).toISOString().replace(/\.\d+Z$/, 'Z')
const doc = {
    about: 'The team at work, now: the AI agents that keep storm-charles.promptugal.news current, as of this build. working: agents with a commit in the hour before the build (name, role, last commit, its subject without session ids, sha, For: targets) and woke: each agent\'s last_wake or updated from agents/<role>/status.json. Commits come from snapshots refreshed at releases (data/agents/commits.json by incident.observability@, data/ci/commits/ by incident.ci@), merged by sha, so the newest push can be minutes older than the build; when no commit falls in the hour, latest still holds the last 12 and flags.commits_stale is true. sources_read: what our agents read from outside bodies (a read time beside a source url in a tracked fetch record), the last hour, or the last 6 hours when fewer than 5 (flags.sources_window_hours); posts on social networks and personal sites are counted only, never listed. feeds: the incident data files in api/v1/index.json, by each file\'s own stamp (never a file time). No visitor data, no session ids. Not a warning service: for Storm Charles follow IPMA and Proteção Civil.',
    by: 'incident.observability@web-summit.dinis',
    updated: BUILT, read_utc: BUILT,
    generator: 'tools/agents-now.mjs',
    flags: { commits_stale: stale, newest_commit: newest, sources_window_hours: sourcesWindow },
    counts: { working: working.length, commits_in_hour: recent.length, woke_in_hour: wokeHour.length, sources_read: sources.length, public_posts_not_listed: privateN, feeds: feedsAll.length, fetch_records_seen: records, files_walked: filesWalked, future_stamps_dropped: future },
    future_stamps_dropped: future,
    sources: [...new Set(['data/agents/commits.json', 'data/ci/index.json', ...ciFiles.map(f => 'data/ci/' + f.file), 'data/agents/index.json', 'agents/<role>/status.json', ...sources.map(x => x.source_file), 'api/v1/index.json'])],
    snapshots: { 'data/agents/commits.json': snapA?.updated || null, 'data/ci/index.json': ciIdx?.updated || null },
    working, latest, woke: wokeHour,
    sources_read: sources, public_posts_not_listed: privateN,
    feeds: feedsAll.slice(0, 40), feeds_total: feedsAll.length, feeds_index: 'api/v1/index.json',
    links: [{ label: 'Every agent', href: 'agents/index.html' }, { label: 'The live map, full size', href: 'agents/live/index.html' }, { label: 'Flows', href: 'flows/index.html' }],
}
doc.ms = Date.now() - t0
fs.mkdirSync(path.join(OUT, 'data/agents'), { recursive: true })
fs.writeFileSync(path.join(OUT, 'data/agents/now.json'), JSON.stringify(doc) + '\n')
