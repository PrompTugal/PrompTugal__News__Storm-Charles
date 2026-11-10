#!/usr/bin/env node
// The graph of an incident, built from its JSON files and never by hand (incident.graph@web-summit.dinis).
//   node tools/graph-build.mjs [incidents/<id>]     writes data/graph/storm.json and data/graph/tables/*.json
//   node tools/graph-build.mjs --check              exits 1 if what is committed is not what the inputs give
// Reads: data/graph/ontology.json (what a node and an edge may be), data/graph/ref/ipma-areas.json, data/keys.json, and
// the incident's data/: decisions/graph.json, decisions/sources.json, signals.json, weather/warnings.json, every *.json
// (as Dataset nodes). Every node, edge and table row carries label (fact, evidence, hypothesis), source (https URL),
// read (UTC) and origin (file#pointer). The output has no clock in it: the same inputs give the same bytes.
// No dependencies, no network, nothing from git history.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2), CHECK = args.includes('--check')
const INC = (args.find(a => !a.startsWith('--')) || 'incidents/2026-11-10-storm-charles').replace(/\/$/, '')
const SITE = 'https://storm-charles.promptugal.news/'
const DATA = `${INC}/data/`
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8')
const J = rel => JSON.parse(read(rel))
const sha = s => crypto.createHash('sha256').update(s).digest('hex')
const host = u => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return '' } }
const https = u => typeof u === 'string' && /^https:\/\//.test(u)
// a time known to the minute: 2026-11-10T12:10Z or with seconds; anything else (a day, "between ...", empty) has no epoch
const epoch = t => /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d)?Z$/.test(t || '') ? Math.floor(Date.parse(t) / 1000) : null
const precision = t => epoch(t) !== null ? 'minute' : /^\d{4}-\d\d-\d\d$/.test(t || '') ? 'day' : t ? 'approx' : 'none'
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const ONT = J('data/graph/ontology.json')
const AREAS = J('data/graph/ref/ipma-areas.json')
const KEYS = J('data/keys.json')
const G = J(DATA + 'decisions/graph.json'), S = J(DATA + 'decisions/sources.json'), SIG = J(DATA + 'signals.json'), W = J(DATA + 'weather/warnings.json')
const incident = J(`${INC}/incident.json`)

const nodes = new Map(), edges = new Map(), problems = []
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
function publisher(url, ctx, asOutlet) {
    const h = host(url); if (!h) return null
    const own = actorOfHost(h); if (own) return own
    if (!asOutlet || NOT_OUTLET.has(h)) return null
    return node({ id: 'actor:outlet:' + h, type: 'Actor', kind: 'outlet', kind_in_source: null, name: h, role: 'Publishes reports that this incident cites (derived from the host of the cited URLs).', label: 'fact', source: url, read: ctx.read, read_by: ctx.read_by || null, blocked: null, derived: true, origin: ctx.origin }).id
}

// ---------------------------------------------------------------- sources (decisions/sources.json, then any other cited URL)
const sourceByUrl = new Map()
S.sources.forEach((s, i) => {
    const n = node({ id: 'source:' + s.id, type: 'Source', name: s.id, url: s.url, host: host(s.url), holds: s.holds || null, changes: s.changes || null, machine_readable: s.machine_readable || null, status: s.status || null, reuse: s.reuse || null, label: 'fact', source: s.url, read: s.read || S.updated, read_by: 'incident.researcher@web-summit.dinis', origin: `${DATA}decisions/sources.json#/sources/${i}` })
    if (!sourceByUrl.has(s.url)) sourceByUrl.set(s.url, n.id)
})
function sourceNode(url, ctx) {
    if (sourceByUrl.has(url)) return sourceByUrl.get(url)
    const id = 'source:url:' + sha(url).slice(0, 10)
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
    node({ id, type: w ? 'Warning' : 'Decision', name: e.decision, text: e.decision, at: e.at || null, at_precision: precision(e.at), status: e.status, ...(w ? { phase: 'issued', level: (e.id.match(/red|orange|yellow/) || [null])[0] } : {}), label: e.label, source: src, read: ctx.read, read_by: e.read_by || null, note: e.note || null, reasons: e.reasons || null, against: e.against || null, conflict: e.conflict || null, origin })
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

// ---------------------------------------------------------------- signals (signals.json)
const signalRows = []
SIG.items.forEach((s, i) => {
    const origin = `${DATA}signals.json#/items/${i}`, urls = (s.sources || []).filter(x => https(x.url))
    const id = `signal:${s.at.slice(0, 16).replace(/[-:]/g, '')}:${sha(s.at + '\n' + s.text).slice(0, 6)}`
    const src = urls[0] ? urls[0].url : timelineUrl
    const ctx = { read: SIG.made_at, origin, at: s.at }
    node({ id, type: 'Signal', name: s.text.length > 110 ? s.text.slice(0, 109).trimEnd() + '…' : s.text, text: s.text, at: s.at, at_precision: s.approx ? 'approx' : precision(s.at), kind: s.kind, key: !!s.key, is_decision: !!s.decision, via: (s.sources || []).map(x => x.label).filter(Boolean), label: s.label, source: src, read: SIG.made_at, origin })
    let pub = null
    for (const u of urls) {
        cite(id, u.url, ctx, s.label)
        const p = publisher(u.url, ctx, true)
        if (p) { edge({ from: p, to: id, rel: 'reports', label: s.label, source: u.url, read: SIG.made_at, origin }); pub = pub || p }
    }
    signalRows.push({ id, at: s.at, at_epoch: epoch(s.at), approx: s.approx ? 1 : 0, kind: s.kind, label: s.label, key: s.key ? 1 : 0, is_decision: s.decision ? 1 : 0, text: s.text, publisher: pub, source: src, source_host: host(src), via: (s.sources || []).map(x => x.label).filter(Boolean).join('; '), read: SIG.made_at, origin })
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

// ---------------------------------------------------------------- degree, order, the graph file
const deg = new Map(); for (const e of edges.values()) { deg.set(e.from, (deg.get(e.from) || 0) + 1); deg.set(e.to, (deg.get(e.to) || 0) + 1) }
const N = [...nodes.values()].map(n => ({ ...n, degree: deg.get(n.id) || 0 })).sort((a, b) => a.id.localeCompare(b.id))
// in the graph file a node is short: a name of at most 140 characters, no empty field; the long text (decision, note,
// reasons, role, what a source holds) is in the tables, joined by id
const LONG = new Set(['text', 'note', 'reasons', 'against', 'conflict', 'role', 'holds', 'changes', 'machine_readable', 'reuse', 'about', 'via', 'blocked'])
const short = s => s.length > 140 ? s.slice(0, 139).trimEnd() + '…' : s
const slim = n => Object.fromEntries(Object.entries(n).filter(([k, v]) => v !== null && v !== false && !LONG.has(k)).map(([k, v]) => [k, k === 'name' ? short(v) : v]))
const rel0 = o => typeof o === 'string' && o.startsWith(DATA) ? o.slice(DATA.length) : o && '/' + o
const lines = arr => '[\n' + arr.map(x => JSON.stringify(x)).join(',\n') + '\n]'
const EDG = [...edges.values()].sort((a, b) => a.id.localeCompare(b.id))
const count = (arr, f) => arr.reduce((o, x) => (o[f(x)] = (o[f(x)] || 0) + 1, o), {})
const asOf = builtFrom.map(b => b.time).filter(t => epoch(t) !== null).sort().pop()
const ontologySha = sha(read('data/graph/ontology.json'))
const storm = {
    about: `One graph of ${incident.title}: actors, decisions, warnings, signals, sources, places, datasets and agents, built from the incident's JSON files by tools/graph-build.mjs (never by hand). Every node and edge carries label (fact, evidence, hypothesis), source (URL), read (UTC) and origin (the file and place it came from). The ontology: data/graph/ontology.json. Not a warning service: follow IPMA and ANEPC.`,
    incident: incident.id, ontology: 'data/graph/ontology.json', ontology_sha256: ontologySha, as_of: asOf, built_by: 'incident.graph@web-summit.dinis (tools/graph-build.mjs)',
    origin_base: DATA, origin_note: 'origin is file#pointer, relative to origin_base; a leading / means relative to the repository root. An edge\'s id is rel:from>to.',
    built_from: builtFrom, counts: { nodes: N.length, edges: EDG.length, by_type: count(N, n => n.type), by_relation: count(EDG, e => e.rel), by_label: count([...N, ...EDG], x => x.label) },
    nodes: '@@NODES@@', edges: '@@EDGES@@'
}

// ---------------------------------------------------------------- the tables (one row per item, with its provenance)
const actorName = id => (nodes.get(id) || {}).name || null
const firstBy = id => (EDG.find(e => (e.rel === 'decides' || e.rel === 'warns') && e.to === id) || {}).from || null
const decisionRows = N.filter(n => n.type === 'Decision' || (n.type === 'Warning' && n.phase === 'issued')).map(n => {
    const src = G.edges.find(e => idOf.get(e.id) === n.id), by = 'actor:' + src.by
    return { id: n.id, kind: n.type.toLowerCase(), by, by_name: actorName(by), also_by: JSON.stringify((src.also_by || []).map(x => 'actor:' + x)), decision: n.text, at: n.at, at_precision: n.at_precision, at_epoch: epoch(n.at), status: n.status, label: n.label, follows: JSON.stringify((src.follows || []).map(f => idOf.get(f))), affects: JSON.stringify((src.to || []).map(x => 'actor:' + x)), source: n.source, source_host: host(n.source), read: n.read, read_epoch: epoch(n.read), read_by: n.read_by, note: n.note, origin: n.origin }
}).sort((a, b) => (a.at || '9').localeCompare(b.at || '9') || a.id.localeCompare(b.id))
const warningRows = [
    ...N.filter(n => n.type === 'Warning').map(n => {
        const by = firstBy(n.id)
        return { id: n.id, phase: n.phase, issuer: by, issuer_name: actorName(by), warning_type: n.warning_type || null, level: n.level || null, area: n.area || null, area_name: n.area && areaName[n.area] ? areaName[n.area].name : null, text: n.text, at: n.at, at_epoch: epoch(n.at), starts: n.starts || null, starts_epoch: epoch(n.starts), ends: n.ends || null, ends_epoch: epoch(n.ends), label: n.label, source: n.source, read: n.read, read_by: n.read_by, origin: n.origin }
    }),
    // the history of the warnings as the meteorologist recorded it: rows of the table, not nodes (they repeat the issued ones)
    ...(W.history || []).map((h, i) => ({ id: `warning:history:${i}`, phase: 'history', issuer: null, issuer_name: null, warning_type: null, level: null, area: null, area_name: null, text: h.event, at: h.at_utc || null, at_epoch: epoch(h.at_utc), starts: null, starts_epoch: null, ends: null, ends_epoch: null, label: h.kind === 'fact' ? 'fact' : 'evidence', source: https(h.source) ? h.source : W.source, read: h.read_utc || W.read_utc, read_by: h.read_by || null, origin: `${DATA}weather/warnings.json#/history/${i}` }))
]
const sourceRows = N.filter(n => n.type === 'Source').map(n => {
    const c = cited.get(n.id) || [], times = c.map(x => x.at).filter(t => epoch(t) !== null).sort()
    const p = actorOfHost(n.host) || (nodes.has('actor:outlet:' + n.host) ? 'actor:outlet:' + n.host : null)
    return { id: n.id, url: n.url, host: n.host, publisher: p, publisher_name: actorName(p), publisher_kind: p ? nodes.get(p).kind : null, holds: n.holds, changes: n.changes, machine_readable: n.machine_readable, status: n.status, reuse: n.reuse, cited_by: c.length, first_cited_item_at: times[0] || null, first_cited_item_epoch: epoch(times[0]), label: n.label, source: n.source, read: n.read, read_epoch: epoch(n.read), read_by: n.read_by || null, origin: n.origin }
})
const actorRows = N.filter(n => n.type === 'Actor').map(n => ({ id: n.id, name: n.name, kind: n.kind, kind_in_source: n.kind_in_source, role: n.role, decisions: EDG.filter(e => e.from === n.id && e.rel === 'decides').length, warnings: EDG.filter(e => e.from === n.id && e.rel === 'warns').length, reports: EDG.filter(e => e.from === n.id && e.rel === 'reports').length, blocked: n.blocked ? JSON.stringify(n.blocked) : null, label: n.label, source: n.source, read: n.read, read_by: n.read_by, origin: n.origin }))
const TABLES = {
    signals: ['The timeline as rows: one per signal, with who published it (publisher) where the source has a URL.', signalRows],
    decisions: ['Decisions and issued warnings: who (by), what, when (at, at_epoch in seconds when known to the minute), status, and what each followed.', decisionRows],
    warnings: ['Warnings: issued (when made or first read), in_force (type, level, area, start, end: IPMA) and history (the meteorologist\'s record of when each was first seen).', warningRows],
    sources: ['Every URL read: the researcher\'s list and every other URL an item cites, with its publisher, how often it is cited and the earliest item citing it.', sourceRows],
    actors: ['Who decides, warns or reports: bodies, operators, the organiser, outlets (outlets are derived from cited hosts).', actorRows]
}
const out = { 'data/graph/storm.json': JSON.stringify(storm, null, 1).replace('"@@NODES@@"', () => lines(N.map(slim).map(n => ({ ...n, origin: rel0(n.origin) })))).replace('"@@EDGES@@"', () => lines(EDG.map(({ id, ...e }) => ({ ...e, origin: rel0(e.origin) })))) + '\n' }
for (const [name, [about, rows]] of Object.entries(TABLES)) {
    for (const r of rows) for (const f of ['label', 'source', 'read', 'origin']) if (!r[f]) problems.push(`table ${name}, row ${r.id}: no ${f}`)
    out[`data/graph/tables/${name}.json`] = JSON.stringify({ about: `${about} Built by tools/graph-build.mjs from the incident's JSON; every row carries label, source, read and origin. Not a warning service.`, table: name, incident: incident.id, as_of: asOf, columns: Object.keys(rows[0] || {}), count: rows.length, rows: '@@ROWS@@' }, null, 1).replace('"@@ROWS@@"', () => lines(rows)) + '\n'
}

if (problems.length) { for (const p of problems.slice(0, 40)) console.error('graph-build: ' + p); console.error(`graph-build: ${problems.length} problem(s); nothing written`); process.exit(1) }
let stale = 0
for (const [rel, txt] of Object.entries(out)) {
    if (txt.length > 256 * 1024) { console.error(`graph-build: ${rel} would be ${txt.length} bytes, over 256 KB`); process.exit(1) }
    const f = path.join(ROOT, rel), old = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
    if (old !== txt) { stale++; if (!CHECK) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, txt) } }
}
console.log(`graph-build: ${N.length} nodes, ${EDG.length} edges (${Object.entries(storm.counts.by_type).map(([k, v]) => `${v} ${k}`).join(', ')}); tables: ${Object.entries(TABLES).map(([k, v]) => `${k} ${v[1].length}`).join(', ')}; as of ${asOf}; ${CHECK ? (stale ? stale + ' file(s) stale' : 'up to date') : stale + ' file(s) written'}`)
if (CHECK && stale) process.exit(1)
