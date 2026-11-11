#!/usr/bin/env node
// The graph of an incident, built from its JSON files and never by hand (incident.graph@web-summit.dinis).
//   node tools/graph-build.mjs [incidents/<id>]     writes data/graph/storm.json and data/graph/tables/*.json
//   node tools/graph-build.mjs --check              exits 1 if what is committed is not what the inputs give
//   node tools/graph-build.mjs --out DIR            writes DIR/data/graph/{storm,storm-signals,storm-sources,storm-elsewhere,queries}.json and tables/*.json ONLY:
//                                                   no tracked file is touched (for the build: --out _site, so the served graph
//                                                   is rebuilt on every push by anyone)
// Reads: data/graph/ontology.json (what a node and an edge may be), data/graph/ref/ipma-areas.json, data/keys.json, and
// the incident's data/: decisions/graph.json, decisions/sources.json, signals.json, weather/warnings.json, weather/cap.json
// (IPMA's real issue times), every *.json (as Dataset nodes); and research/weather-sites/sites.json (who covers the storm). Every node, edge and table row carries label (fact, evidence, hypothesis), source (https URL),
// read (UTC) and origin (file#pointer). The output has no clock in it: the same inputs give the same bytes.
// No dependencies, no network, nothing from git history.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2), CHECK = args.includes('--check')
const outAt = args.indexOf('--out'), OUT_DIR = outAt >= 0 ? path.resolve(args[outAt + 1] || '') : ''
if (outAt >= 0 && (!args[outAt + 1] || OUT_DIR === ROOT)) { console.error('graph-build: --out needs a directory other than the repository root'); process.exit(2) }
if (OUT_DIR && CHECK) { console.error('graph-build: --out and --check do not go together'); process.exit(2) }
const INC = (args.find((a, i) => !a.startsWith('--') && i !== outAt + 1) || 'incidents/2026-11-10-storm-charles').replace(/\/$/, '')
const SITE = 'https://storm-charles.promptugal.news/'
const DATA = `${INC}/data/`
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const J = rel => JSON.parse(read(rel))
const sha = s => crypto.createHash('sha256').update(s).digest('hex')
const host = u => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' } }
const https = u => typeof u === 'string' && /^https:\/\//.test(u)
// a time known to the minute: 2026-11-10T12:10Z or with seconds; anything else (a day, "between ...", empty) has no epoch
// CAP times come as 2026-11-10T07:18:40+00:00: the same instant, written with Z
const toZ = t => typeof t === 'string' ? t.replace(/\+00:00$/, 'Z') : t
const epoch = t => /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d)?Z$/.test(t || '') ? Math.floor(Date.parse(t) / 1000) : null
const precision = t => epoch(t) !== null ? 'minute' : /^\d{4}-\d\d-\d\d$/.test(t || '') ? 'day' : t ? 'approx' : 'none'
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const ONT = J('data/graph/ontology.json')
const AREAS = J('data/graph/ref/ipma-areas.json')
const KEYS = J('data/keys.json')
const G = J(DATA + 'decisions/graph.json'), S = J(DATA + 'decisions/sources.json'), SIG = J(DATA + 'signals.json'), W = J(DATA + 'weather/warnings.json')
const incident = J(`${INC}/incident.json`)
const opt = rel => fs.existsSync(path.join(ROOT, rel)) ? J(rel) : null
const CAP = opt(DATA + 'weather/cap.json'), SITES = opt('research/weather-sites/sites.json')
// the media watch (incident.media@): the outlets, what each published and when, and who was first on each keyed fact.
// By-lines are not carried into the graph or its tables: no person is a node or a column here (only the kind of by-line).
const M_OUT = opt('research/media/outlets.json'), M_COV = opt('research/media/coverage.json'), M_FIRST = opt('research/media/first-on-each-fact.json')

// ---------------------------------------------------------------- no private person is named or linked (CLAUDE.md, People)
// A post address on a social platform names the account that wrote it. Unless the address is one of the official
// channels the researcher lists (decisions/sources.json), it never enters the graph or a table: the builder keeps the
// host only ("a public post on mastodon.social"), before anything is built. At the end every output is scanned again,
// and one trace of such an address or of a fediverse handle (@name@host) stops the build with nothing written.
const problems = []
const OFFICIAL = new Set(S.sources.map(s => s.url))
// the named exceptions (ontology.json, public_posts): the addresses on those timeline rows stay, and nowhere else
const PUBLIC_ROWS = new Map(((ONT.public_posts || {}).rows || []).map(r => [r.row, r]))
for (const [row, r] of PUBLIC_ROWS) { if (!r.reason || !r.decided_by) problems.push(`ontology public_posts: ${row} needs a reason and who decided`); const s = SIG.items.find(x => x.id === row); if (!s) problems.push(`ontology public_posts: no timeline row ${row}`); else for (const x of s.sources || []) if (https(x.url)) OFFICIAL.add(x.url) }
const POST = [/\/@[^/?#]+/, /\/users\/[^/?#]+/, /\/u(ser)?\/[^/?#]+/, /\/profile\/[^/?#]+/, /^\/[^/?#]+\/status(es)?\//, /\/posts?\/[^/?#]+/, /\/comments\/[^/?#]+/, /\/p\/[^/?#]+/, /\/notice\/[^/?#]+/]
const SOCIAL_HOST = /(^|\.)(x\.com|twitter\.com|bsky\.app|threads\.(net|com)|instagram\.com|facebook\.com|linkedin\.com|reddit\.com|tiktok\.com|tumblr\.com)$/
const personalPost = u => { let x; try { x = new URL(u) } catch { return false } const h = x.hostname.replace(/^www\./, ''); return !OFFICIAL.has(u) && (/\/@[^/?#]+/.test(x.pathname) || (SOCIAL_HOST.test(h) && POST.some(re => re.test(x.pathname)))) }
const HANDLE = /@[A-Za-z0-9_.-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+/g
let withheld = 0
const cleanUrl = u => typeof u === 'string' && https(u) && personalPost(u) ? (withheld++, `https://${new URL(u).hostname}/`) : u
const cleanText = t => typeof t === 'string' ? t.replace(HANDLE, () => (withheld++, 'a public account')) : t
for (const n of G.nodes) n.source = cleanUrl(n.source)
for (const e of G.edges) { e.source = cleanUrl(e.source); if (e.corroborated_by) e.corroborated_by = e.corroborated_by.map(cleanUrl); for (const k of ['decision', 'note']) e[k] = cleanText(e[k]) }
for (const s of SIG.items) { s.text = cleanText(s.text); for (const x of s.sources || []) { x.url = cleanUrl(x.url); x.label = cleanText(x.label) } }
for (const x of (SITES ? SITES.sites : [])) x.url = cleanUrl(x.url)
for (const a of (M_COV ? M_COV.articles : [])) { a.url = cleanUrl(a.url); a.title = cleanText(a.title) }
for (const f of (M_FIRST ? M_FIRST.facts : [])) for (const x of f.first_by_outlet || []) { x.url = cleanUrl(x.url); x.title = cleanText(x.title) }

const nodes = new Map(), edges = new Map()
const LABELS = new Set(Object.keys(ONT.labels))
function node(n) {
    if (!ONT.types[n.type]) problems.push(`node ${n.id}: type ${n.type} is not in the ontology`)
    if (!LABELS.has(n.label)) problems.push(`node ${n.id}: label ${n.label}`)
    if (!https(n.source)) problems.push(`node ${n.id}: no https source`)
    if (!n.read) problems.push(`node ${n.id}: no time read`)
    if (!nodes.has(n.id)) nodes.set(n.id, n)
    return nodes.get(n.id)
}
function edge(e) {
    e.id = `${e.rel}:${e.from}>${e.to}`
    const r = ONT.relations[e.rel], a = nodes.get(e.from), b = nodes.get(e.to)
    if (!r) problems.push(`edge ${e.id}: relation not in the ontology`)
    else if (!a || !b) problems.push(`edge ${e.id}: a missing end`)
    else if (!r.from.includes(a.type) || !r.to.includes(b.type)) problems.push(`edge ${e.id}: ${a.type} ${e.rel} ${b.type} is not allowed`)
    if (!LABELS.has(e.label)) problems.push(`edge ${e.id}: label ${e.label}`)
    if (!https(e.source)) problems.push(`edge ${e.id}: no https source`)
    if (!e.read) problems.push(`edge ${e.id}: no time read`)
    if (!edges.has(e.id)) edges.set(e.id, e)
}
const fileUrl = rel => SITE + rel

// ---------------------------------------------------------------- actors (decisions/graph.json nodes)
const KIND = { authority: 'body', government: 'body', municipality: 'body', service: 'operator', transport: 'operator', venue: 'operator', organiser: 'organiser' }
const ownHost = new Map()   // a host is an actor's own channel when the actor was read there as a fact
G.nodes.forEach((n, i) => {
    node({ id: 'actor:' + n.id, type: 'Actor', kind: KIND[n.kind] || 'operator', kind_in_source: n.kind, name: n.name, role: n.role, label: n.label, source: n.source, read: n.read, read_by: n.read_by, blocked: n.blocked || null, origin: `${DATA}decisions/graph.json#/nodes/${i}` })
    const h = host(n.source); if (n.label === 'fact' && h && !ownHost.has(h)) ownHost.set(h, 'actor:' + n.id)
})
// the ontology's own_channels: hosts that are plainly an actor's own, where the researcher's node was read through the press
for (const [h, a] of Object.entries(ONT.own_channels.hosts)) if (nodes.has('actor:' + a)) ownHost.set(h, 'actor:' + a); else problems.push(`ontology own_channels: no actor ${a}`)
const NOT_OUTLET = new Set(ONT.own_channels.not_outlets)
// sub-domains of an actor's host are its channel too (api.ipma.pt and ipma.pt)
const actorOfHost = h => { if (!h) return null; if (ownHost.has(h)) return ownHost.get(h); for (const [k, v] of ownHost) if (h.endsWith('.' + k) || k.endsWith('.' + h)) return v; return null }
// an outlet: a host that is nobody's own channel, cited by evidence or by a signal
// an outlet the media watch knows, by host (its own host or a sub-domain of it; the longest match wins)
const outletOfHost = h => { let best = null, len = 0; for (const o of (M_OUT ? M_OUT.outlets : [])) for (const x of o.hosts || []) if ((h === x || h.endsWith('.' + x)) && x.length > len) { best = o; len = x.length } return best }
const mediaUrl = SITE + 'research/media/outlets.json'
function outletNode(o, ctx) {
    const i = M_OUT.outlets.indexOf(o), s = o.seen || {}
    return node({ id: 'actor:outlet:' + o.id, type: 'Actor', kind: 'outlet', kind_in_source: o.kind || null, name: o.name, role: `${o.kind || 'outlet'} (${o.lang || '?'}); hosts: ${(o.hosts || []).join(', ')}`, lang: o.lang || null, coverage_items: s.items ?? null, coverage_first_published: s.first_published || null, coverage_last_published: s.last_published || null, wire_share: o.wire_share ?? null, label: 'fact', source: mediaUrl, read: M_OUT.updated, read_by: 'incident.media@web-summit.dinis', blocked: null, derived: true, origin: `research/media/outlets.json#/outlets/${i}` }).id
}
// a host of an official body in the register of sources (sources/registry.json, incident.sources@) is that body, named,
// not a bare host: actor:<the register's id> (MeteoAlarm, agreed with incident.entities@ on 11 Nov, 03:42)
const REG = opt('sources/registry.json')
const regBody = h => { if (!REG) return null; const i = REG.sources.findIndex(r => r.group === 'official' && (r.hosts || []).some(x => { x = x.replace(/^www\./, ''); return h === x || h.endsWith('.' + x) })); return i < 0 ? null : [REG.sources[i], i] }
const derivedActor = h => { const o = outletOfHost(h); if (o) return 'actor:outlet:' + o.id; const b = regBody(h); return b ? 'actor:' + b[0].id : 'actor:host:' + h }
function publisher(url, ctx, asOutlet, kind = 'outlet') {
    const h = host(url); if (!h) return null
    const own = actorOfHost(h); if (own) return own
    if (!asOutlet || NOT_OUTLET.has(h)) return null
    const o = outletOfHost(h); if (o) return outletNode(o, ctx)
    const rb = regBody(h); if (rb) return node({ id: 'actor:' + rb[0].id, type: 'Actor', kind: 'body', kind_in_source: rb[0].group, name: rb[0].name, role: rb[0].kind || null, label: 'fact', source: fileUrl('sources/registry.json'), read: toZ(REG.updated), read_by: 'incident.sources@web-summit.dinis', blocked: null, derived: true, origin: `/sources/registry.json#/sources/${rb[1]}` }).id
    return node({ id: 'actor:host:' + h, type: 'Actor', kind, kind_in_source: null, name: h, role: 'Publishes reports that this incident cites (derived from the host of the cited URLs).', label: 'fact', source: url, read: ctx.read, read_by: ctx.read_by || null, blocked: null, derived: true, origin: ctx.origin }).id
}

// ---------------------------------------------------------------- sources (decisions/sources.json, then any other cited URL)
// A Source here is one address that was read; its id is address:<id>. The ids source:* are incident.sources@'s (a body in
// sources/registry.json): the graph mints none (the conductor's decision, 11 Nov, 03:48) and carries the register's own id
// on each registered-as crossing (`node`).
const sourceByUrl = new Map()
S.sources.forEach((s, i) => {
    const n = node({ id: 'address:' + s.id, type: 'Source', name: s.id, url: s.url, host: host(s.url), holds: s.holds || null, changes: s.changes || null, machine_readable: s.machine_readable || null, status: s.status || null, reuse: s.reuse || null, label: 'fact', source: s.url, read: s.read || S.updated, read_by: 'incident.researcher@web-summit.dinis', origin: `${DATA}decisions/sources.json#/sources/${i}` })
    if (!sourceByUrl.has(s.url)) sourceByUrl.set(s.url, n.id)
})
function sourceNode(url, ctx) {
    if (sourceByUrl.has(url)) return sourceByUrl.get(url)
    const id = 'address:url:' + sha(url).slice(0, 10)
    node({ id, type: 'Source', name: host(url), url, host: host(url), holds: null, changes: null, machine_readable: null, status: null, reuse: null, label: 'fact', source: url, read: ctx.read, read_by: ctx.read_by || null, derived: true, origin: ctx.origin })
    sourceByUrl.set(url, id); return id
}
const cited = new Map()   // source id -> [{ at, by }]
function cite(fromId, url, ctx, label) {
    const sid = sourceNode(url, ctx)
    edge({ from: fromId, to: sid, rel: 'cites', label, source: url, read: ctx.read, origin: ctx.origin })
    if (!cited.has(sid)) cited.set(sid, [])
    cited.get(sid).push({ at: ctx.at || null, by: fromId })
    return sid
}

// ---------------------------------------------------------------- decisions and issued warnings (decisions/graph.json edges)
const isWarning = e => e.by === 'ipma' || /^anepc-aviso/.test(e.id)
const idOf = new Map(G.edges.map(e => [e.id, (isWarning(e) ? 'warning:' : 'decision:') + e.id]))
const timelineUrl = fileUrl(`${INC}/timeline.html`), graphFileUrl = fileUrl(DATA + 'decisions/graph.json')
G.edges.forEach((e, i) => {
    const origin = `${DATA}decisions/graph.json#/edges/${i}`, id = idOf.get(e.id), w = isWarning(e)
    // a hypothesis has no source of its own: its source is the file that holds its reasons
    const src = https(e.source) ? e.source : graphFileUrl
    const ctx = { read: e.read || G.updated, read_by: e.read_by, origin, at: e.at }
    node({ id, type: w ? 'Warning' : 'Decision', name: e.decision, text: e.decision, at: e.at || null, at_precision: precision(e.at), effect_from: e.effect_from_utc || null, effect_to: e.effect_to_utc || null, status: e.status, ...(w ? { phase: 'issued', level: (e.id.match(/red|orange|yellow/) || [null])[0] } : {}), label: e.label, source: src, read: ctx.read, read_by: e.read_by || null, note: e.note || null, reasons: e.reasons || null, against: e.against || null, conflict: e.conflict || null, origin })
    for (const by of [e.by, ...(e.also_by || [])]) edge({ from: 'actor:' + by, to: id, rel: w ? 'warns' : 'decides', label: e.label, source: src, read: ctx.read, origin })
    for (const to of e.to || []) edge({ from: id, to: 'actor:' + to, rel: 'affects', label: e.label, source: src, read: ctx.read, origin })
    if (https(e.source)) {
        cite(id, e.source, ctx, e.label)
        const p = publisher(e.source, ctx, e.label === 'evidence')
        if (p && p !== 'actor:' + e.by) edge({ from: p, to: id, rel: 'reports', label: e.label, source: src, read: ctx.read, origin })
    }
    for (const u of (e.corroborated_by || []).filter(https)) {
        cite(id, u, ctx, 'evidence')
        const p = publisher(u, ctx, true); if (p) edge({ from: p, to: id, rel: 'reports', label: 'evidence', source: u, read: ctx.read, origin })
    }
})
// precedes: after every item exists, so both ends are known
G.edges.forEach((e, i) => {
    for (const f of e.follows || []) {
        const prev = G.edges.find(x => x.id === f); if (!prev) { problems.push(`decisions/graph.json: ${e.id} follows ${f}, which is not there`); continue }
        const a = epoch(prev.at), b = epoch(e.at)
        edge({ from: idOf.get(f), to: idOf.get(e.id), rel: 'precedes', lead_minutes: a !== null && b !== null ? Math.round((b - a) / 60) : null, label: e.label, source: https(e.source) ? e.source : graphFileUrl, read: e.read || G.updated, origin: `${DATA}decisions/graph.json#/edges/${i}/follows` })
    }
})

// ---------------------------------------------------------------- places and warnings in force (weather/warnings.json)
const areaName = Object.fromEntries(AREAS.areas.map(a => [a.code, a]))
node({ id: 'place:PT-mainland', type: 'Place', name: 'Mainland Portugal', code: 'PT-mainland', lat: null, lon: null, label: 'fact', source: AREAS.source, read: AREAS.read, origin: 'data/graph/ref/ipma-areas.json' })
function place(code, ctx) {
    const a = areaName[code], id = 'place:' + code
    if (nodes.has(id)) return id
    node({ id, type: 'Place', name: a ? `${a.name} (IPMA area ${code})` : `IPMA area ${code}`, code, lat: a ? a.lat : null, lon: a ? a.lon : null, label: 'fact', source: a ? AREAS.source : ctx.source, read: a ? AREAS.read : ctx.read, origin: a ? 'data/graph/ref/ipma-areas.json' : ctx.origin })
    if (a && a.mainland) edge({ from: id, to: 'place:PT-mainland', rel: 'located-in', label: 'fact', source: AREAS.source, read: AREAS.read, origin: 'data/graph/ref/ipma-areas.json' })
    return id
}
const inForce = []
const addInForce = (w, area, origin, src, readAt) => {
    const id = `warning:${area}:${slug(w.type)}:${w.level}:${w.start_utc.slice(0, 16).replace(/[-:]/g, '')}`
    const ctx = { read: readAt, origin, source: src }
    node({ id, type: 'Warning', name: `${w.level} ${w.type}, ${area}, ${w.start_utc.slice(5, 16).replace('T', ' ')} to ${w.end_utc.slice(5, 16).replace('T', ' ')}`, text: w.text_pt || null, phase: 'in_force', warning_type: w.type, level: w.level, area, starts: w.start_utc, ends: w.end_utc, at: null, at_precision: 'none', status: 'happened', label: 'fact', source: src, read: readAt, read_by: 'incident.meteorologist@web-summit.dinis', origin })
    edge({ from: 'actor:ipma', to: id, rel: 'warns', label: 'fact', source: src, read: readAt, origin })
    edge({ from: id, to: place(area, ctx), rel: 'located-in', label: 'fact', source: src, read: readAt, origin })
    // only Lisbon's warnings cite the feed as an edge; elsewhere the source attribute says it (54 edges to one node say nothing)
    if (area === 'LSB') cite(id, src, { ...ctx, at: null }, 'fact')
    inForce.push(id)
}
W.lisbon.forEach((w, i) => addInForce(w, 'LSB', `${DATA}weather/warnings.json#/lisbon/${i}`, w.source || W.source, w.read_utc || W.read_utc))
const E = W.red_and_orange_elsewhere || { items: [] }
E.items.forEach((w, i) => addInForce(w, w.area, `${DATA}weather/warnings.json#/red_and_orange_elsewhere/items/${i}`, E.source || W.source, E.read_utc || W.read_utc))

// ---------------------------------------------------------------- IPMA's real issue times (weather/cap.json: CAP messages, Lisbon)
// Each message is a Warning (phase cap): when IPMA sent it, what it says, from when to when; an Update replaces an
// earlier message, and that is a precedes edge when the earlier one is in the file.
const LEVEL = { Amarelo: 'yellow', Laranja: 'orange', Vermelho: 'red', Verde: 'green' }
const capRows = []
if (CAP) {
    const capId = id => 'warning:cap:' + String(id).replace('.-', '.').split('.').slice(-2).join('.')
    const have = new Map(CAP.lisbon_messages.map(m => [capId(m.identifier), m]))
    CAP.lisbon_messages.forEach((m, i) => {
        const origin = `${DATA}weather/cap.json#/lisbon_messages/${i}`, id = capId(m.identifier), src = m.source || CAP.source, readAt = m.read_utc || CAP.read_utc
        const ev = String(m.event_pt || '').match(/^Aviso (\S+) (.+)$/) || [], level = LEVEL[ev[1]] || null, type = ev[2] || m.event_pt
        const sent = toZ(m.sent_utc), starts = toZ(m.onset_utc), ends = toZ(m.expires_utc), rep0 = (m.replaces || [])[0] || null
        node({ id, type: 'Warning', name: `${level || '?'} ${type}, LSB: ${m.msg_type === 'Update' ? 'updated' : 'issued'} ${sent.slice(5, 16).replace('T', ' ')}, for ${starts.slice(5, 16).replace('T', ' ')} to ${ends.slice(5, 16).replace('T', ' ')}`, text: m.description_pt || null, phase: 'cap', msg_type: m.msg_type, warning_type: type, level, area: 'LSB', starts, ends, at: sent, at_precision: precision(sent), status: 'happened', label: 'fact', source: src, read: readAt, read_by: 'incident.meteorologist@web-summit.dinis', origin })
        edge({ from: 'actor:ipma', to: id, rel: 'warns', label: 'fact', source: src, read: readAt, origin })
        edge({ from: id, to: place('LSB', { source: src, read: readAt, origin }), rel: 'located-in', label: 'fact', source: src, read: readAt, origin })
        capRows.push({ id, m, level, type, sent, starts, ends, src, readAt, origin, replaces: rep0 ? capId(rep0.identifier) : null, replaces_sent: rep0 ? toZ(rep0.sent_utc) : null })
    })
    // issued-as: the same warning, opened into IPMA's own message for it. A warning the researcher recorded matches a
    // message of the same level and type whose start is the warning's effect start; a warning in force matches the
    // message with the same type, level, start and end. No match, no edge (the message may have left the feed).
    const TYPE_WORD = [[/wind|vento/, 'Vento'], [/rain|precip|chuva/, 'Precipitação'], [/sea|agita|mar[ií]t|wave/, 'Agitação Marítima'], [/thunder|trovoada/, 'Trovoada'], [/snow|neve/, 'Neve'], [/fog|nevoeiro/, 'Nevoeiro']]
    const same = (a, b) => epoch(toZ(a)) !== null && epoch(toZ(a)) === epoch(toZ(b))
    const issuedAs = (from, r) => edge({ from, to: r.id, rel: 'issued-as', label: 'fact', source: r.src, read: r.readAt, origin: r.origin })
    for (const e of G.edges.filter(isWarning)) {
        const level = (e.id.match(/red|orange|yellow/) || [])[0], type = (TYPE_WORD.find(([re]) => re.test(e.id)) || [])[1]
        if (!level || !type || !e.effect_from_utc) continue
        for (const r of capRows) if (r.level === level && r.type === type && same(r.starts, e.effect_from_utc)) issuedAs(idOf.get(e.id), r)
    }
    for (const id of inForce) { const n = nodes.get(id); if (n.area !== 'LSB') continue; for (const r of capRows) if (r.level === n.level && r.type === n.warning_type && same(r.starts, n.starts) && same(r.ends, n.ends)) issuedAs(id, r) }
    for (const r of capRows) if (r.replaces && have.has(r.replaces)) {
        const a = epoch(toZ(have.get(r.replaces).sent_utc)), b = epoch(r.sent)
        edge({ from: r.replaces, to: r.id, rel: 'precedes', lead_minutes: a !== null && b !== null ? Math.round((b - a) / 60) : null, label: 'fact', source: r.src, read: r.readAt, origin: r.origin + '/replaces' })
    }
}

// ---------------------------------------------------------------- who covers the storm (research/weather-sites/sites.json, map storm-charles)
// Each site is a Source (the page read), produced by its outlet (or by the body whose channel it is).
if (SITES) SITES.sites.forEach((x, i) => {
    if (x.map !== 'storm-charles' || x.kind === 'absent' || !https(x.url)) return
    const origin = `research/weather-sites/sites.json#/sites/${i}`, readAt = (x.opened && x.opened.read) || SITES.updated, ctx = { read: readAt, read_by: 'incident.weatherwatch@web-summit.dinis', origin }
    const sid = sourceNode(x.url, ctx), n = nodes.get(sid)
    n.coverage = x.kind; n.coverage_name = x.name; if (!n.holds) n.holds = x.shows || null
    const h = host(x.url); let a = actorOfHost(h)
    if (!a && !NOT_OUTLET.has(h)) { a = publisher(x.url, ctx, true, /^authority/.test(x.kind) ? 'body' : 'outlet'); const an = nodes.get(a); if (an.derived && an.name === h && x.owner) an.name = `${String(x.owner).split(/[(;:]/)[0].trim()} (${h})` }
    if (a) edge({ from: sid, to: a, rel: 'produced-by', label: 'fact', source: x.url, read: readAt, origin })
})

// ---------------------------------------------------------------- the media watch: every outlet seen covering the storm
if (M_OUT) for (const o of M_OUT.outlets) outletNode(o, {})

// ---------------------------------------------------------------- signals (signals.json)
const signalRows = []
SIG.items.forEach((s, i) => {
    const origin = `${DATA}signals.json#/items/${i}`, urls = (s.sources || []).filter(x => https(x.url))
    // the timeline's own permanent id when it has one (signals.json, id and supersedes); a hash of time and text otherwise
    const id = s.id ? 'signal:' + s.id : `signal:${s.at.slice(0, 16).replace(/[-:]/g, '')}:${sha(s.at + '\n' + s.text).slice(0, 6)}`
    const supersedes = s.supersedes ? [].concat(s.supersedes).map(x => 'signal:' + x) : []
    const src = urls[0] ? urls[0].url : timelineUrl
    const ctx = { read: SIG.made_at, origin, at: s.at }
    node({ id, type: 'Signal', name: s.text.length > 110 ? s.text.slice(0, 109).trimEnd() + '…' : s.text, text: s.text, at: s.at, at_precision: s.approx ? 'approx' : precision(s.at), kind: s.kind, key: !!s.key, is_decision: !!s.decision, supersedes: supersedes.length ? supersedes : null, via: (s.sources || []).map(x => x.label).filter(Boolean), label: s.label, source: src, read: SIG.made_at, origin })
    let pub = null
    for (const u of urls) {
        cite(id, u.url, ctx, s.label)
        const p = publisher(u.url, ctx, true)
        if (p) { edge({ from: p, to: id, rel: 'reports', label: s.label, source: u.url, read: SIG.made_at, origin }); pub = pub || p }
    }
    signalRows.push({ id, at: s.at, at_epoch: epoch(s.at), approx: s.approx ? 1 : 0, kind: s.kind, label: s.label, key: s.key ? 1 : 0, is_decision: s.decision ? 1 : 0, supersedes: supersedes.length ? JSON.stringify(supersedes) : null, text: s.text, publisher: pub, source: src, source_host: host(src), via: (s.sources || []).map(x => x.label).filter(Boolean).join('; '), read: SIG.made_at, origin })
})

// ---------------------------------------------------------------- agents and datasets
const agentId = name => 'agent:' + name
const keysUrl = fileUrl('data/keys.json')
KEYS.keys.forEach((k, i) => node({ id: agentId(k.agent), type: 'Agent', name: k.agent, role: k.role, team: 'incident', key_fingerprint: k.bundle && k.bundle.fingerprint || null, label: 'fact', source: keysUrl, read: SIG.made_at, origin: `data/keys.json#/keys/${i}` }))
function agent(raw, ctx) {
    const name = String(raw).split(/[\s(]/)[0]; if (!/@/.test(name)) return null
    return node({ id: agentId(name), type: 'Agent', name, role: 'Named in the datasets as the reader or keeper of an item (derived).', team: /PrompTugal/.test(name) ? 'PrompTugal' : 'incident', key_fingerprint: null, label: 'fact', source: ctx.source, read: ctx.read, derived: true, origin: ctx.origin }).id
}
for (const x of [...G.nodes, ...G.edges]) if (x.read_by) agent(x.read_by, { source: graphFileUrl, read: G.updated, origin: DATA + 'decisions/graph.json' })
// who keeps each folder of the incident's data: data/README.md's table ("Kept by")
const KEEPER = [[/^decisions\//, 'incident.researcher@web-summit.dinis'], [/^weather\//, 'incident.meteorologist@web-summit.dinis'], [/^watch\//, 'incident.dev@web-summit.dinis'], [/^signals\.json$/, 'incident.conductor@web-summit.dinis']]
const walk = (dir, acc = []) => { for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) { const f = dir + e.name; e.isDirectory() ? walk(f + '/', acc) : acc.push(f) } return acc }
const builtFrom = []
for (const rel of walk(DATA).filter(f => f.endsWith('.json')).sort()) {
    const txt = read(rel), j = JSON.parse(txt), sub = rel.slice(DATA.length)
    const time = j.updated || j.read_utc || j.read_at || j.made_at || j.written_utc || (j.thursday && j.thursday.read_utc) || SIG.made_at
    const keeper = j.updated_by || j.by || (KEEPER.find(([re]) => re.test(sub)) || [])[1]
    const url = fileUrl(rel), origin = rel
    const id = node({ id: 'dataset:' + sub, type: 'Dataset', name: sub, about: typeof j.about === 'string' ? j.about.slice(0, 300) : null, bytes: txt.length, sha256: sha(txt), api: `${SITE}api/v1/${path.basename(INC)}/${sub}`, label: 'fact', source: url, read: time, origin }).id
    if (keeper) { const a = agent(keeper, { source: url, read: time, origin }) || node({ id: agentId(keeper), type: 'Agent', name: keeper, role: 'derived', team: 'incident', key_fingerprint: null, label: 'fact', source: url, read: time, derived: true, origin }).id; edge({ from: id, to: a, rel: 'produced-by', label: 'fact', source: fileUrl(DATA + 'README.md'), read: time, origin: DATA + 'README.md' }) }
    builtFrom.push({ file: rel, sha256: sha(txt), time })
}
// a source is produced by the actor whose channel it is
for (const n of [...nodes.values()].filter(n => n.type === 'Source')) { const a = actorOfHost(n.host); if (a) edge({ from: n.id, to: a, rel: 'produced-by', label: 'fact', source: n.url, read: n.read, origin: n.origin }) }

// ---------------------------------------------------------------- one thing, one id: the entity pages (incident.entities@)
// entities/index.json lists { id, type, name, also, graph } where graph is this graph's node id for the same thing.
// A node that has an entity carries entity: the entity's own id ("<type>/<slug>", as the index writes it); its page is
// entities/<that id>.html. Agreed 11 Nov, 02:15. (Until 03:40 the type was written twice and the link led nowhere.)
const ENT = opt('entities/index.json')
let entityLinks = 0
for (const x of (ENT ? (ENT.entities || ENT.items || ENT.nodes || (Array.isArray(ENT) ? ENT : [])) : [])) { const n = x && x.graph && nodes.get(x.graph); if (n && x.type && x.id) { n.entity = String(x.id).includes('/') ? x.id : `${x.type}/${x.id}`; entityLinks++ } }

// ---------------------------------------------------------------- degree, order, the graph file
const deg = new Map(); for (const e of edges.values()) { deg.set(e.from, (deg.get(e.from) || 0) + 1); deg.set(e.to, (deg.get(e.to) || 0) + 1) }
const N = [...nodes.values()].map(n => ({ ...n, degree: deg.get(n.id) || 0 })).sort((a, b) => a.id.localeCompare(b.id))
// in the graph file a node is short: a name of at most 140 characters, no empty field; the long text (decision, note,
// reasons, role, what a source holds) is in the tables, joined by id
const LONG = new Set(['text', 'note', 'reasons', 'against', 'conflict', 'role', 'holds', 'changes', 'machine_readable', 'reuse', 'about', 'via', 'blocked', 'coverage_name'])
const short = s => s.length > 140 ? s.slice(0, 139).trimEnd() + '…' : s
const slim = n => Object.fromEntries(Object.entries(n).filter(([k, v]) => v !== null && v !== false && !LONG.has(k) && !(k === 'url' && v === n.source)).map(([k, v]) => [k, k === 'name' ? short(v) : v]))
const rel0 = o => typeof o === 'string' && o.startsWith(DATA) ? o.slice(DATA.length) : o && '/' + o
const lines = arr => '[\n' + arr.map(x => JSON.stringify(x)).join(',\n') + '\n]'
const EDG = [...edges.values()].sort((a, b) => a.id.localeCompare(b.id))
const count = (arr, f) => arr.reduce((o, x) => (o[f(x)] = (o[f(x)] || 0) + 1, o), {})
const asOf = builtFrom.map(b => b.time).filter(t => epoch(t) !== null).sort().pop()
const ontologySha = sha(read('data/graph/ontology.json'))
const storm = {
    about: `One graph of ${incident.title}: actors, decisions, warnings, signals, sources, places, datasets and agents, built from the incident's JSON files by tools/graph-build.mjs (never by hand). Every node and edge carries label (fact, evidence, hypothesis), source (URL), read (UTC) and origin (the file and place it came from). The ontology: data/graph/ontology.json. Not a warning service: follow IPMA and ANEPC.`,
    incident: incident.id, ontology: 'data/graph/ontology.json', ontology_sha256: ontologySha, as_of: asOf, by: 'incident.graph@web-summit.dinis', updated: asOf, built_by: 'tools/graph-build.mjs',
    origin_base: DATA, origin_note: 'origin is file#pointer, relative to origin_base; a leading / means relative to the repository root. An edge\'s id is rel:from>to.',
    built_from: builtFrom
}
// two files, so neither nears 256 KB: storm.json holds Lisbon, the decisions and everything else; storm-elsewhere.json
// holds the warnings in force in the other districts and those districts, with their edges (which point into storm.json)
const isElsewhere = n => (n.type === 'Warning' && n.phase === 'in_force' && n.area !== 'LSB') || (n.type === 'Place' && n.code !== 'LSB' && n.code !== 'PT-mainland')
const ELSE = new Set(N.filter(isElsewhere).map(n => n.id))
const part = (about, keepN, keepE, extra) => {
    const ns = N.filter(keepN), es = EDG.filter(keepE)
    return JSON.stringify({ ...storm, about, ...extra, counts: { nodes: ns.length, edges: es.length, by_type: count(ns, n => n.type), by_relation: count(es, e => e.rel), by_label: count([...ns, ...es], x => x.label) }, nodes: '@@NODES@@', edges: '@@EDGES@@' }, null, 1)
        .replace('"@@NODES@@"', () => lines(ns.map(slim).map(n => ({ ...n, origin: rel0(n.origin) })))).replace('"@@EDGES@@"', () => lines(es.map(({ id, ...e }) => ({ ...e, origin: rel0(e.origin) })))) + '\n'
}
const touchesElse = e => ELSE.has(e.from) || ELSE.has(e.to)
// a third file: where things were read and kept (Source and Dataset nodes), with the edges that touch them (cites, produced-by)
const SRC = new Set(N.filter(n => n.type === 'Source' || n.type === 'Dataset').map(n => n.id))
const touchesSrc = e => !touchesElse(e) && (SRC.has(e.from) || SRC.has(e.to))
// a fourth: the timeline's rows (Signal nodes) with the edges that touch them and nothing above (reports)
const SIGS = new Set(N.filter(n => n.type === 'Signal').map(n => n.id))
const touchesSig = e => !touchesElse(e) && !touchesSrc(e) && (SIGS.has(e.from) || SIGS.has(e.to))

// ---------------------------------------------------------------- the tables (one row per item, with its provenance)
const actorName = id => (nodes.get(id) || {}).name || null
const firstBy = id => (EDG.find(e => (e.rel === 'decides' || e.rel === 'warns') && e.to === id) || {}).from || null
const decisionRows = N.filter(n => n.type === 'Decision' || (n.type === 'Warning' && n.phase === 'issued')).map(n => {
    const src = G.edges.find(e => idOf.get(e.id) === n.id), by = 'actor:' + src.by
    return { id: n.id, kind: n.type.toLowerCase(), by, by_name: actorName(by), also_by: JSON.stringify((src.also_by || []).map(x => 'actor:' + x)), decision: n.text, at: n.at, at_precision: n.at_precision, at_epoch: epoch(n.at), effect_from: n.effect_from || null, effect_from_epoch: epoch(n.effect_from), effect_to: n.effect_to || null, effect_to_epoch: epoch(n.effect_to), status: n.status, label: n.label, follows: JSON.stringify((src.follows || []).map(f => idOf.get(f))), affects: JSON.stringify((src.to || []).map(x => 'actor:' + x)), source: n.source, source_host: host(n.source), read: n.read, read_epoch: epoch(n.read), read_by: n.read_by, note: n.note, origin: n.origin }
}).sort((a, b) => (a.at || '9').localeCompare(b.at || '9') || a.id.localeCompare(b.id))
const warningRows = [
    ...N.filter(n => n.type === 'Warning').map(n => {
        const by = firstBy(n.id)
        return { id: n.id, phase: n.phase, issuer: by, issuer_name: actorName(by), warning_type: n.warning_type || null, level: n.level || null, area: n.area || null, area_name: n.area && areaName[n.area] ? areaName[n.area].name : null, text: n.text, at: n.at, at_epoch: epoch(n.at), starts: n.starts || null, starts_epoch: epoch(n.starts), ends: n.ends || null, ends_epoch: epoch(n.ends), msg_type: n.msg_type || null, replaces: (capRows.find(r => r.id === n.id) || {}).replaces || null, replaces_sent: (capRows.find(r => r.id === n.id) || {}).replaces_sent || null, replaces_sent_epoch: epoch((capRows.find(r => r.id === n.id) || {}).replaces_sent), label: n.label, source: n.source, read: n.read, read_by: n.read_by, origin: n.origin }
    }),
    // the history of the warnings as the meteorologist recorded it: rows of the table, not nodes (they repeat the issued ones)
    ...(W.history || []).map((h, i) => ({ id: `warning:history:${i}`, phase: 'history', issuer: null, issuer_name: null, warning_type: null, level: null, area: null, area_name: null, text: h.event, at: h.at_utc || null, at_epoch: epoch(h.at_utc), starts: null, starts_epoch: null, ends: null, ends_epoch: null, msg_type: null, replaces: null, replaces_sent: null, replaces_sent_epoch: null, label: h.kind === 'fact' ? 'fact' : 'evidence', source: https(h.source) ? h.source : W.source, read: h.read_utc || W.read_utc, read_by: h.read_by || null, origin: `${DATA}weather/warnings.json#/history/${i}` }))
]
const sourceRows = N.filter(n => n.type === 'Source').map(n => {
    const c = cited.get(n.id) || [], times = c.map(x => x.at).filter(t => epoch(t) !== null).sort()
    const p = actorOfHost(n.host) || (nodes.has(derivedActor(n.host)) ? derivedActor(n.host) : null)
    return { id: n.id, url: n.url, host: n.host, publisher: p, publisher_name: actorName(p), publisher_kind: p ? nodes.get(p).kind : null, holds: n.holds, changes: n.changes, machine_readable: n.machine_readable, status: n.status, reuse: n.reuse, coverage: n.coverage || null, coverage_name: n.coverage_name || null, cited_by: c.length, first_cited_item_at: times[0] || null, first_cited_item_epoch: epoch(times[0]), label: n.label, source: n.source, read: n.read, read_epoch: epoch(n.read), read_by: n.read_by || null, origin: n.origin }
})
const actorRows = N.filter(n => n.type === 'Actor').map(n => ({ id: n.id, name: n.name, kind: n.kind, kind_in_source: n.kind_in_source, role: n.role, lang: n.lang || null, coverage_items: n.coverage_items ?? null, coverage_first_published: n.coverage_first_published || null, coverage_first_epoch: epoch(n.coverage_first_published), wire_share: n.wire_share ?? null, decisions: EDG.filter(e => e.from === n.id && e.rel === 'decides').length, warnings: EDG.filter(e => e.from === n.id && e.rel === 'warns').length, reports: EDG.filter(e => e.from === n.id && e.rel === 'reports').length, blocked: n.blocked ? JSON.stringify(n.blocked) : null, label: n.label, source: n.source, read: n.read, read_by: n.read_by, origin: n.origin }))
// the lead-time line: every warning and decision with a time known to the minute, in order, with the hours between
// them and the hours before the first red warning starts in Lisbon. IPMA's own messages (cap) give the time a warning
// was SENT; where they exist, the researcher's rows for the same IPMA colour warnings (time first read) are left out.
const capLine = warningRows.filter(w => w.phase === 'cap' && (w.level === 'red' || w.level === 'orange'))
const redStarts = [...capLine, ...warningRows.filter(w => w.phase === 'in_force' && w.area === 'LSB')].filter(w => w.level === 'red' && w.starts_epoch !== null).map(w => w.starts_epoch).sort((a, b) => a - b)[0] ?? null
const lineRaw = [
    ...capLine.filter(w => redStarts === null || w.starts_epoch >= redStarts - 12 * 3600).map(w => ({ id: w.id, kind: 'warning', who: w.issuer_name, what: `${w.level} ${w.warning_type}, Lisbon: ${w.msg_type === 'Update' ? 'updated' : 'issued'}, for ${w.starts.slice(5, 16).replace('T', ' ')} to ${w.ends.slice(5, 16).replace('T', ' ')}`, at: w.at, time_is: 'sent by IPMA (CAP message)', effect_from: w.starts, level: w.level, status: 'happened', label: w.label, source: w.source, read: w.read, origin: w.origin })),
    ...decisionRows.filter(d => d.at_epoch !== null && (d.status === 'happened' || d.status === 'superseded') && !(capLine.length && /^warning:ipma-(red|orange|yellow)/.test(d.id))).map(d => ({ id: d.id, kind: d.kind, who: d.by_name, what: d.decision, at: d.at, time_is: d.label === 'fact' ? 'published by the body itself' : 'as reported', effect_from: d.effect_from, level: null, status: d.status, label: d.label, source: d.source, read: d.read, origin: d.origin }))
].sort((a, b) => epoch(a.at) - epoch(b.at) || a.id.localeCompare(b.id))
const h1 = s => s === null ? null : Math.round(s / 360) / 10
const timelineRows = lineRaw.map((r, i) => { const t = epoch(r.at); return { n: i + 1, id: r.id, kind: r.kind, who: r.who, what: r.what, at: r.at, at_epoch: t, time_is: r.time_is, h_since_previous: i ? h1(t - epoch(lineRaw[i - 1].at)) : null, h_since_first: h1(t - epoch(lineRaw[0].at)), h_before_red_starts: redStarts === null ? null : h1(redStarts - t), effect_from: r.effect_from || null, effect_from_epoch: epoch(r.effect_from), h_before_effect: epoch(r.effect_from) === null ? null : h1(epoch(r.effect_from) - t), level: r.level, status: r.status, label: r.label, source: r.source, read: r.read, origin: r.origin } })
// the media watch as tables. coverage: one row per item an outlet published (evidence: it was published; no by-line
// names, only the kind). first_on_fact: for each keyed fact, each outlet's first item on it and the minutes after the
// primary source: the matching is by pattern, so every row is the media watch's analysis (hypothesis), not a fact.
const outletActor = id => nodes.has('actor:outlet:' + id) ? 'actor:outlet:' + id : null
const coverageRows = (M_COV ? M_COV.articles : []).filter(a => https(a.url)).map((a, i) => ({ id: 'coverage:' + (a.id || i), outlet: outletActor(a.outlet), outlet_name: actorName(outletActor(a.outlet)) || a.outlet, kind: a.kind || null, lang: a.lang || null, title: a.title || null, published: toZ(a.published) || null, published_epoch: epoch(toZ(a.published)), byline_kind: a.byline_kind || null, links_to_primary: (a.links_to_primary || []).length, label: a.label === 'fact' ? 'fact' : 'evidence', source: a.url, read: a.read || M_COV.updated, origin: `research/media/coverage.json#/articles/${i}` }))
    .sort((a, b) => (a.published || '9').localeCompare(b.published || '9') || a.id.localeCompare(b.id))
const firstRows = (M_FIRST ? M_FIRST.facts : []).flatMap((f, i) => (f.first_by_outlet || []).filter(x => https(x.url)).map((x, k) => ({ id: `first:${f.id}:${x.outlet}`, fact: f.id, what: f.what, primary_time: toZ(f.primary_time) || null, primary_epoch: epoch(toZ(f.primary_time)), primary_label: f.primary_label || null, rank: x.rank ?? k + 1, outlet: outletActor(x.outlet), outlet_name: actorName(outletActor(x.outlet)) || x.outlet, published: toZ(x.published) || null, published_epoch: epoch(toZ(x.published)), minutes_after_primary: x.minutes_after_primary ?? null, via: x.via || null, title: x.title || null, url: x.url, label: 'hypothesis', source: x.url, read: M_FIRST.updated, read_by: 'incident.media@web-summit.dinis', origin: `research/media/first-on-each-fact.json#/facts/${i}/first_by_outlet/${k}` })))
const TABLES = {
    ...(firstRows.length ? { first_on_fact: ['Who was first on each keyed fact: for each fact (IPMA\'s red wind, the alert, Web Summit\'s decision ...), each outlet\'s first item on it and the minutes after the primary source. From incident.media@\'s first-on-each-fact.json; the matching is by pattern, so each row is analysis (labelled hypothesis). Only outlets whose feeds could be read are here.', firstRows] } : {}),
    ...(coverageRows.length ? { coverage: ['What each outlet published on the storm and when (one row per item; the title as published, with its link; the kind of by-line, never a name). The item\'s URL is its source. From incident.media@\'s coverage.json.', coverageRows] } : {}),
    timeline: ['The lead-time line: every warning and decision with a time known to the minute, in order: hours since the previous one, since the first, before the first red warning starts in Lisbon (h_before_red_starts) and before its own effect starts (h_before_effect). For IPMA\'s colour warnings the time is when IPMA sent the message (CAP). Order, not cause.', timelineRows],
    signals: ['The timeline as rows: one per signal, with who published it (publisher) where the source has a URL.', signalRows],
    decisions: ['Decisions and issued warnings: who (by), what, when (at, at_epoch in seconds when known to the minute), status, and what each followed.', decisionRows],
    warnings: ['Warnings: issued (when made or first read), in_force (type, level, area, start, end: IPMA), cap (IPMA\'s own CAP messages for Lisbon: at is when IPMA sent it; an Update names the message it replaces) and history (the meteorologist\'s record of when each was first seen).', warningRows],
    sources: ['Every URL read: the researcher\'s list, every other URL an item cites and the pages covering the storm (coverage: liveblog, explainer, ...; from research/weather-sites), with its publisher, how often it is cited and the earliest item citing it.', sourceRows],
    actors: ['Who decides, warns or reports: bodies, operators, the organiser, outlets (outlets are derived from cited hosts).', actorRows]
}
const out = {
    'data/graph/storm.json': part(storm.about + ' This file holds the actors, decisions, warnings for Lisbon, places and agents; the files in `more` hold the rest, in the same shape.', n => !ELSE.has(n.id) && !SRC.has(n.id) && !SIGS.has(n.id), e => !touchesElse(e) && !touchesSrc(e) && !touchesSig(e), { more: ['data/graph/storm-signals.json', 'data/graph/storm-sources.json', 'data/graph/storm-elsewhere.json'] }),
    'data/graph/storm-signals.json': part(`Part of the graph of ${incident.title}: every Signal (a row of the timeline), with the edges that touch it and no Source (reports). Same shape as data/graph/storm.json; edges here point to nodes there. Built by tools/graph-build.mjs. Not a warning service: follow IPMA and ANEPC.`, n => SIGS.has(n.id), touchesSig, { part_of: 'data/graph/storm.json' }),
    'data/graph/storm-sources.json': part(`Part of the graph of ${incident.title}: every Source (a URL that was read) and Dataset, with the edges that touch them (cites, produced-by). Same shape as data/graph/storm.json; edges here point to nodes there. Built by tools/graph-build.mjs. Not a warning service: follow IPMA and ANEPC.`, n => SRC.has(n.id), touchesSrc, { part_of: 'data/graph/storm.json' }),
    'data/graph/storm-elsewhere.json': part(`The rest of the graph of ${incident.title}: IPMA's red and orange warnings in force outside the Lisbon district, and those districts. Same shape as data/graph/storm.json; edges here point to nodes there (actor:ipma, place:PT-mainland). Built by tools/graph-build.mjs. Not a warning service: follow IPMA and ANEPC.`, n => ELSE.has(n.id), touchesElse, { part_of: 'data/graph/storm.json' })
}
for (const [name, [about, rows]] of Object.entries(TABLES)) {
    for (const r of rows) for (const f of ['label', 'source', 'read', 'origin']) if (!r[f]) problems.push(`table ${name}, row ${r.id}: no ${f}`)
    out[`data/graph/tables/${name}.json`] = JSON.stringify({ about: `${about} Built by tools/graph-build.mjs from the incident's JSON; every row carries label, source, read and origin. Not a warning service.`, table: name, incident: incident.id, by: 'incident.graph@web-summit.dinis', updated: asOf, as_of: asOf, columns: Object.keys(rows[0] || {}), count: rows.length, rows: '@@ROWS@@' }, null, 1).replace('"@@ROWS@@"', () => lines(rows)) + '\n'
}

// ---------------------------------------------------------------- the crossings: joined, not copied (ontology.json, crossings)
// The other graphs of the site keep their own kinds, verbs and ids; none of their nodes is a node here. A crossing is a
// named edge (with its inverse) from a node of this graph to "<world>/<its own id>", opened on that world's own page.
const XV = (ONT.crossings || {}).verbs || {}, XW = (ONT.crossings || {}).worlds || {}
const cross = []
const crossing = c => {
    const v = XV[c.rel], a = nodes.get(c.from)
    if (!v) problems.push(`crossing ${c.rel}: not in the ontology`); else if (!a || !v.from.includes(a.type)) problems.push(`crossing ${c.rel}:${c.from}: not allowed from here`); else if (!c.to.startsWith(v.to + '/')) problems.push(`crossing ${c.rel}:${c.from}: must end in ${v.to}/`)
    for (const f of ['label', 'source', 'read', 'origin', 'href', 'name']) if (!c[f]) problems.push(`crossing ${c.rel}:${c.from}>${c.to}: no ${f}`)
    if (!https(c.source) || !LABELS.has(c.label)) problems.push(`crossing ${c.rel}:${c.from}>${c.to}: source or label`)
    cross.push(c)
}
const actorByHosts = hs => { for (const h0 of hs || []) { const h = String(h0).replace(/^www\./, ''); const a = actorOfHost(h) || (nodes.has(derivedActor(h)) ? derivedActor(h) : null); if (a) return [a, h] } return [null, null] }
// sources/: the register of outside bodies. Its entry names an entity; the entity names this graph's node.
const entGraph = new Map(((ENT && ENT.nodes) || []).filter(x => x.graph).map(x => [x.id, x.graph]))
const regCollide = []
if (REG) REG.sources.forEach((r, i) => {
    if (r.node && nodes.has(r.node)) regCollide.push(r.node)
    const declared = r.entity && nodes.has(entGraph.get(r.entity)) ? entGraph.get(r.entity) : null
    const [byHost, h] = declared ? [null, null] : actorByHosts(r.hosts)
    const from = declared || byHost; if (!from) return
    crossing({ from, rel: 'registered-as', to: 'sources/' + r.id, node: r.node || null, name: r.name, href: `sources/${r.page || r.id + '/index.html'}`, label: declared ? 'fact' : 'hypothesis', why: declared ? `the register names the entity ${r.entity}, and the entity names this node` : `matched by host: ${h} is one of the register's hosts for this body`, source: fileUrl('sources/registry.json'), read: toZ(REG.updated), origin: `/sources/registry.json#/sources/${i}` })
})
// meteorology/: the weather data supply chain. A body there and an actor here are joined by the host of the body's address;
// a warning goes through the one warning service its body issues alone (a service two bodies issue is nobody's own).
const M_BODY = opt('meteorology/nodes/body.json'), M_SVC = opt('meteorology/nodes/warning-service.json'), M_ISS = opt('meteorology/edges/issues.json')
const lineageOf = new Map()
if (M_BODY) M_BODY.nodes.forEach((b, i) => {
    const [a, h] = actorByHosts([host(b.url)]); if (!a || lineageOf.has(a)) return
    lineageOf.set(a, b.id)
    crossing({ from: a, rel: 'in-lineage-as', to: 'meteorology/' + b.id, name: b.name, href: `meteorology/nodes/${b.id}.html`, label: 'hypothesis', why: `matched by host: the body's address there is on ${h}, this actor's own channel`, source: fileUrl('meteorology/nodes/body.json'), read: toZ(M_BODY.updated), origin: `/meteorology/nodes/body.json#/nodes/${i}` })
})
if (M_ISS && M_SVC) {
    const issuers = new Map(); for (const e of M_ISS.edges) issuers.set(e.to, (issuers.get(e.to) || 0) + 1)
    const svcName = new Map(M_SVC.nodes.map(s => [s.id, s.name]))
    const own = new Map(); M_ISS.edges.forEach((e, i) => { if (issuers.get(e.to) === 1 && e.state === 'stated' && svcName.has(e.to)) (own.get(e.from) || own.set(e.from, []).get(e.from)).push([e, i]) })
    for (const e of edges.values()) if (e.rel === 'warns') {
        const svc = own.get(lineageOf.get(e.from)); if (!svc || svc.length !== 1) continue
        const [x, i] = svc[0]
        crossing({ from: e.to, rel: 'issued-through', to: 'meteorology/' + x.to, name: svcName.get(x.to), href: `meteorology/nodes/${x.to}.html`, label: 'hypothesis', why: `${nodes.get(e.from).name} warns this, and in the supply chain ${x.from} issues one warning service of its own (stated on the page read)`, source: https(x.source) ? x.source : fileUrl('meteorology/edges/issues.json'), read: toZ(x.read_utc || M_ISS.updated), origin: `/meteorology/edges/issues.json#/edges/${i}` })
    }
}
// evidence/: our dated captures. Once per address this graph was read at: the capture, or why there is none.
const EVI = opt('evidence/index.json'), EVR = opt('evidence/rows.json')
const captures = {}
if (EVI) {
    const used = new Set(); for (const x of [...nodes.values(), ...edges.values()]) { if (https(x.source)) used.add(x.source); if (https(x.url)) used.add(x.url) }
    for (const a of EVI.addresses) if (used.has(a.url) && a.latest) captures[a.url] = { evidence: a.latest, captures: (a.captures || []).length, first_read: a.first_read, last_read: a.last_read, changes: a.changes || 0, shown: !!a.shown }
    for (const list of Object.values((EVR && EVR.rows) || {})) for (const r of list) if (used.has(r.url) && !captures[r.url] && !r.evidence && r.why) captures[r.url] = { evidence: null, why: r.why }
}
if (ONT.crossings) {
    cross.sort((a, b) => (a.rel + a.from + a.to).localeCompare(b.rel + b.from + b.to))
    const cap = Object.keys(captures).sort()
    out['data/graph/crossings.json'] = JSON.stringify({
        about: `Where the graph of ${incident.title} joins the site's other graphs, without copying them: the register of sources (sources/), the weather data supply chain (meteorology/) and our dated captures (evidence/, Wayback). Each edge runs from a node of data/graph/storm.json to "<world>/<that world's own id>", with the page to open (href, relative to the site), a label, a source, the time read, where it was built from, and why. "captures" holds, once per address this graph was read at, our latest capture of it (evidence/<id>.html) or the reason there is none. The verbs and their inverses: data/graph/ontology.json, crossings. Built by tools/graph-build.mjs, never by hand. Not a warning service: follow IPMA and ANEPC.`,
        incident: incident.id, ontology: 'data/graph/ontology.json#/crossings', by: 'incident.graph@web-summit.dinis', updated: asOf, as_of: asOf, built_by: 'tools/graph-build.mjs',
        worlds: XW, verbs: Object.fromEntries(Object.entries(XV).map(([k, v]) => [k, v.inverse])),
        counts: { edges: cross.length, by_verb: count(cross, c => c.rel), by_label: count(cross, c => c.label), addresses_captured: cap.filter(u => captures[u].evidence).length, addresses_not_captured_with_reason: cap.filter(u => !captures[u].evidence).length },
        ids_to_settle: regCollide.length ? { what: 'These ids mean a body in sources/registry.json (`node`) and a single address in this graph: two things, one id. This graph crosses to sources/<id> and does not use the register\'s `node`.', ids: regCollide.sort() } : undefined,
        edges: '@@X@@', captures: '@@C@@'
    }, null, 1).replace('"@@X@@"', () => lines(cross)).replace('"@@C@@"', () => '{\n' + cap.map(u => JSON.stringify(u) + ': ' + JSON.stringify(captures[u])).join(',\n') + '\n}') + '\n'
}

// the last check: no personal post address and no fediverse handle in anything about to be written
for (const [rel, txt] of Object.entries(out)) {
    for (const u of txt.match(/https:\/\/[^\s"'<>\\)]+/g) || []) if (personalPost(u)) problems.push(`${rel}: a personal post address would be written (${new URL(u).hostname}): withheld by rule, or name the row in ontology.json public_posts with who decided`)
    if (HANDLE.test(txt)) problems.push(`${rel}: a fediverse handle would be written`); HANDLE.lastIndex = 0
}
if (problems.length) { for (const p of problems.slice(0, 40)) console.error('graph-build: ' + p); console.error(`graph-build: ${problems.length} problem(s); nothing written`); process.exit(1) }
let stale = 0
for (const [rel, txt] of Object.entries(out)) {
    if (txt.length > 256 * 1024) { console.error(`graph-build: ${rel} would be ${txt.length} bytes, over 256 KB`); process.exit(1) }
    const f = path.join(OUT_DIR || ROOT, rel), old = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
    if (old !== txt) { stale++; if (!CHECK) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, txt) } }
}
// with --out the queries go too, so the served folder is whole even if the build's copy ran before a change
if (OUT_DIR) fs.copyFileSync(path.join(ROOT, 'data/graph/queries.json'), path.join(OUT_DIR, 'data/graph/queries.json'))
console.log(`graph-build: ${N.length} nodes, ${EDG.length} edges (${Object.entries(count(N, n => n.type)).map(([k, v]) => `${v} ${k}`).join(', ')}; ${SIGS.size} nodes in storm-signals.json, ${SRC.size} in storm-sources.json, ${ELSE.size} in storm-elsewhere.json); tables: ${Object.entries(TABLES).map(([k, v]) => `${k} ${v[1].length}`).join(', ')}; ${entityLinks} node(s) linked to an entity page; ${cross.length} crossing(s), ${Object.values(captures).filter(c => c.evidence).length} address(es) with a capture; ${withheld} personal address(es) withheld; as of ${asOf}; ${CHECK ? (stale ? stale + ' file(s) stale' : 'up to date') : stale + ' file(s) written' + (OUT_DIR ? ' under ' + path.relative(ROOT, OUT_DIR) : '')}`)
if (CHECK && stale) process.exit(1)
