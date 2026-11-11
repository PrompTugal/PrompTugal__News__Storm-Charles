#!/usr/bin/env node
// entities-make: the nodes of the mini Wikipedia, from what the incident already holds (incident.entities@web-summit.dinis).
//   node tools/entities-make.mjs           writes entities/<type>/<id>.json and entities/index.json (tracked files: run by hand, then commit)
//   node tools/entities-make.mjs --check   writes nothing; exits 1 if the tracked files are not what the data gives now
// Inputs: entities/seed.json (which things are nodes, their names, and for each hand-written edge the row or decision it is read
// from), entities/ontology.json (the types and verbs allowed), the incident's data/signals.json and data/decisions/graph.json.
// Every edge takes its label, source and time read from the row or decision it names: an edge that names none is refused.
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, SITE, readJson, matcher, captures } from './entities-lib.mjs'

const CHECK = process.argv.includes('--check')
const seed = readJson(path.join(ROOT, 'entities/seed.json')), onto = readJson(path.join(ROOT, 'entities/ontology.json'))
const INC = `incidents/${seed.incident}/`
const signals = readJson(path.join(ROOT, INC, 'data/signals.json')), G = readJson(path.join(ROOT, INC, 'data/decisions/graph.json'))
let graphIds = new Set()
for (const f of ['storm.json', 'storm-sources.json', 'storm-elsewhere.json']) try { for (const n of readJson(path.join(ROOT, 'data/graph', f)).nodes || []) graphIds.add(n.id) } catch { }
const rows = new Map(signals.items.map(x => [x.id, x])), dEdges = new Map(G.edges.map(e => [e.id, e])), dNodes = new Map(G.nodes.map(n => [n.id, n]))
const die = m => { console.error('entities-make: ' + m); process.exit(1) }
const short = (s, n = 260) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s }
const isWarning = e => e.by === 'ipma' || /^anepc-aviso/.test(e.id)   // the same split as tools/graph-build.mjs
const TL = SITE + INC + 'timeline.html'

// where a statement comes from: a timeline row, a decision, an actor of the decision graph, or a file of this site
function prov(ref, what) {
    if (ref.row) {
        const r = rows.get(ref.row); if (!r) die(`${what}: no timeline row ${ref.row}`)
        const src = (r.sources || []).find(s => s.url), note = (r.sources || []).map(s => s.label).filter(l => /\bread\b/.test(l)).join('; ')
        const dated = note.match(/read[^0-9;]{0,40}?(\d{1,2}) Nov,? (\d\d):(\d\d)/)
        return { label: r.label, source: src?.url || `${TL}#${r.id}`, read_utc: dated ? `2026-11-${dated[1].padStart(2, '0')}T${dated[2]}:${dated[3]}Z` : null, ...(note && !dated ? { read_note: short(note, 160) } : {}), says: short(ref.says || r.text), origin: `${INC}data/signals.json#${r.id}`, row: r.id }
    }
    if (ref.decision) {
        const e = dEdges.get(ref.decision); if (!e) die(`${what}: no decision ${ref.decision}`)
        return { label: e.label, source: e.source || SITE + INC + 'data/decisions/graph.json', read_utc: e.read || null, says: short(ref.says || e.decision), origin: `${INC}data/decisions/graph.json#/edges/${e.id}`, decision: e.id }
    }
    if (ref.actor) {
        const n = dNodes.get(ref.actor); if (!n) die(`${what}: no actor ${ref.actor} in the decision graph`)
        return { label: n.label, source: n.source, read_utc: n.read || null, says: short(ref.says || `${n.name}: ${n.role}`), origin: `${INC}data/decisions/graph.json#/nodes/${n.id}` }
    }
    if (ref.file) {
        if (!fs.existsSync(path.join(ROOT, ref.file))) die(`${what}: no file ${ref.file}`)
        return { label: 'ours', source: SITE + ref.file, read_utc: seed.updated, says: short(ref.says || ''), origin: ref.file }
    }
    if (ref.calendar) return { label: 'ours', source: SITE + 'entities/ontology.json', read_utc: seed.updated, says: 'the calendar', origin: 'entities/seed.json' }
    die(`${what}: an edge must name a row, a decision, an actor or a file`)
}

const nodes = new Map()
const add = n => { if (nodes.has(n.id)) die(`two nodes with the id ${n.id}`); nodes.set(n.id, { edges: [], also: [], ...n }) }
const actorId = {}, unplaced = []
// 1. the actors of the decision graph: the slug is the decision graph's own id, so one thing has one id here and in data/graph/
for (const a of G.nodes) {
    // an actor the seed has not placed yet gets its type from the researcher's kind and its name as written (without a bracket), and is listed
    let s = seed.actors[a.id]
    if (!s) { s = { type: { authority: 'body', government: 'body', municipality: 'body', transport: 'service', service: 'service', organiser: 'organisation', venue: 'place' }[a.kind] || 'organisation', name: a.name.replace(/\s*\(.*$/, ''), also: [] }; unplaced.push(`${a.id} (${a.kind} -> ${s.type}: ${s.name})`) }
    actorId[a.id] = `${s.type}/${a.id}`
    add({ id: actorId[a.id], type: s.type, name: s.name, also: [...new Set([a.name, ...(s.also || [])])].filter(x => x !== s.name), match: { none: [a.name].filter(x => /[(]/.test(x)) }, summary: a.role, label: a.label, summary_source: { url: a.source, read_utc: a.read || null, origin: `${INC}data/decisions/graph.json#/nodes/${a.id}` }, graph: `actor:${a.id}` })
}
// 2. the decisions and warnings
const decId = {}
for (const e of G.edges) decId[e.id] = `${isWarning(e) ? 'warning' : 'decision'}/${e.id}`
for (const e of G.edges) {
    const w = isWarning(e), id = decId[e.id], p = () => prov({ decision: e.id }, id)
    add({ id, type: w ? 'warning' : 'decision', name: short(e.decision, 110), also: seed.decision_names[e.id] || [], match: { none: [short(e.decision, 110)] }, summary: e.decision, label: e.label, status: e.status, at: e.at || null, effect_from_utc: e.effect_from_utc || null, effect_to_utc: e.effect_to_utc || null, summary_source: { url: e.source || SITE + INC + 'data/decisions/graph.json', read_utc: e.read || null, origin: `${INC}data/decisions/graph.json#/edges/${e.id}` }, graph: `${w ? 'warning' : 'decision'}:${e.id}` })
    const n = nodes.get(id), hyp = e.label === 'hypothesis' || e.status === 'expected'
    const verb = w ? 'issued' : hyp ? 'is_expected_to' : (e.status === 'not_announced' || e.status === 'unknown') ? 'has_not_announced' : 'decided'
    nodes.get(actorId[e.by]).edges.push({ verb, to: id, ...p() })
    for (const t of e.to || []) if (actorId[t]) n.edges.push({ verb: 'affects', to: actorId[t], ...p() })
    for (const f of e.follows || []) if (decId[f]) n.edges.push({ verb: 'follows', to: decId[f], ...p() })
    n._days = { made: /^\d{4}-\d\d-\d\d/.test(e.at || '') ? e.at.slice(0, 10) : null, from: e.effect_from_utc?.slice(0, 10) || null, to: (e.effect_to_utc || e.effect_from_utc)?.slice(0, 10) || null }
}
// 2b. the outlets, as incident.media@ keeps them: the id is the media watch's (and the graph's actor:outlet:<id>); an outlet
// "reported" each decision whose source address is on one of its hosts
const hostOf = u => { try { return new URL(u).host.replace(/^www\./, '') } catch { return '' } }
try {
    const O = readJson(path.join(ROOT, 'research/media/outlets.json'))
    for (const o of O.outlets) {
        const id = `outlet/${o.id}`, page = fs.existsSync(path.join(ROOT, `research/media/outlets/${o.id}.md`)) ? `research/media/outlets/${o.id}.md` : null
        add({ id, type: 'outlet', name: o.name, also: [...(seed.outlet_names?.[o.id] || []), ...(o.hosts || [])].filter(x => x !== o.name), summary: `${o.kind} (${o.lang}); ${o.seen?.items ?? 0} items read by the media watch.`, label: 'ours', summary_source: { url: SITE + 'research/media/outlets.json', read_utc: O.updated || null, origin: `research/media/outlets.json#/outlets/${o.id}`, taken_from_label: O.label || 'evidence' }, hosts: o.hosts || [], page, graph: `actor:outlet:${o.id}` })
        for (const e of G.edges) { const h = hostOf(e.source); if (h && (o.hosts || []).some(x => h === x || h.endsWith('.' + x))) nodes.get(id).edges.push({ verb: 'reported', to: decId[e.id], ...prov({ decision: e.id }, id) }) }
    }
    // and, from the media watch's analysis (matched by title, so labelled hypothesis): which outlets carried each keyed fact, and how long after its primary source
    const F = readJson(path.join(ROOT, 'research/media/first-on-each-fact.json'))
    for (const f of F.facts) { const to = seed.media_facts?.[f.id]; if (!to) continue; for (const x of f.first_by_outlet || []) { const n = nodes.get('outlet/' + x.outlet); if (!n || !/^https:\/\//.test(x.url || '')) continue; n.edges.push({ verb: 'reported', to, label: 'hypothesis', source: x.url, read_utc: F.updated || null, says: short(`"${x.title}" (${x.via}, published ${String(x.published).slice(0, 16).replace('T', ' ')} UTC${x.minutes_after_primary != null ? `, ${Math.abs(x.minutes_after_primary)} minutes ${x.minutes_after_primary < 0 ? 'before the time we hold for' : 'after'} the primary source` : ''}; matched by title by incident.media@)`), origin: `research/media/first-on-each-fact.json#/facts/${f.id}` }) } }
} catch (e) { if (e.code !== 'ENOENT') throw e }
// 2c. the agents, from the public keys they added themselves
for (const k of readJson(path.join(ROOT, 'data/keys.json')).keys) {
    const role = (k.agent.match(/^incident\.([a-z-]+)@/) || [])[1]; if (!role || nodes.has('agent/' + role)) continue
    add({ id: 'agent/' + role, type: 'agent', name: k.agent, also: [`incident.${role}@`], summary: k.role, label: 'ours', summary_source: { url: SITE + 'data/keys.json', read_utc: seed.updated, origin: `data/keys.json#${k.id}`, taken_from_label: 'ours' }, page: fs.existsSync(path.join(ROOT, `agents/${role}/README.md`)) ? `agents/${role}/README.md` : 'agents/README.md', graph: `agent:${k.agent}` })
    nodes.get('agent/' + role).edges.push({ verb: 'member_of', to: 'organisation/incident-team', label: 'ours', source: SITE + 'data/keys.json', read_utc: seed.updated, says: short(k.role), origin: `data/keys.json#${k.id}` })
}
// 3. the hand-kept nodes (a seed entry for an existing node only adds edges)
for (const s of seed.nodes) {
    if (nodes.has(s.id)) { if (s.name) die(`${s.id} is made from the decision graph: the seed may only add edges to it`) }
    else {
        const type = s.id.split('/')[0], sf = s.summary_from ? prov(s.summary_from, s.id + ' summary') : null
        add({ id: s.id, type, name: s.name, also: (s.also || []).filter(x => x !== s.name), summary: s.summary || '', label: 'ours', summary_source: sf ? { url: sf.source, read_utc: sf.read_utc, origin: sf.origin, taken_from_label: sf.label } : null, graph: s.graph || null })
    }
    for (const e of s.edges || []) nodes.get(s.id).edges.push({ verb: e.verb, to: e.to, ...prov(e, `${s.id} ${e.verb} ${e.to}`) })
}
// (the team's node is in the seed; the agents' member_of edges were written before it existed, which step 5 checks)
for (const e of seed.decision_edges) { const n = nodes.get(e.from); if (!n) die(`decision_edges: no node ${e.from}`); n.edges.push({ verb: e.verb, to: e.to, ...prov(e, `${e.from} ${e.verb} ${e.to}`) }) }
// 4. decisions and warnings on their days
for (const n of nodes.values()) {
    if (!n._days) continue
    const d = n._days, p = prov({ decision: n.id.split('/')[1] }, n.id); delete n._days
    if (d.made && nodes.has('day/' + d.made)) n.edges.push({ verb: 'made_on', to: 'day/' + d.made, ...p })
    if (d.from) for (let t = Date.parse(d.from); t <= Date.parse(d.to); t += 864e5) { const id = 'day/' + new Date(t).toISOString().slice(0, 10); if (nodes.has(id)) n.edges.push({ verb: 'in_force_on', to: id, ...p }) }
}
// 5. the grammar: every type and verb is in the ontology, every `to` exists and is of a type the verb allows; no name twice
const nameOwner = new Map()
for (const n of nodes.values()) {
    if (!onto.types[n.type]) die(`${n.id}: type ${n.type} is not in the ontology`)
    if (n.graph && !graphIds.has(n.graph)) n.graph = null
    for (const e of n.edges) {
        const v = onto.verbs[e.verb]; if (!v) die(`${n.id}: verb ${e.verb} is not in the ontology`)
        if (!onto.types[n.type].verbs.includes(e.verb)) die(`${n.id}: a ${n.type} may not start "${e.verb}" (entities/ontology.json types.${n.type}.verbs)`)
        const to = nodes.get(e.to); if (!to) die(`${n.id} ${e.verb}: no node ${e.to}`)
        if (!v.to.includes(to.type)) die(`${n.id} ${e.verb} ${e.to}: "${e.verb}" may not point at a ${to.type}`)
        if (!/^https:\/\//.test(e.source || '')) die(`${n.id} ${e.verb} ${e.to}: no https source`)
    }
    for (const name of [n.name, ...n.also]) {
        if (n.match?.none?.includes(name)) continue
        const k = name.toLowerCase(); if (nameOwner.has(k) && nameOwner.get(k) !== n.id) die(`the name "${name}" belongs to both ${nameOwner.get(k)} and ${n.id}`); nameOwner.set(k, n.id)
    }
}
// 5b. the researcher's one file per service (everything decided about it, what is still open, each try at the primary page)
for (const [k, id] of Object.entries(seed.service_files || {})) { const f = `${INC}data/decisions/entities/${k}.json`; if (fs.existsSync(path.join(ROOT, f)) && nodes.has(id)) nodes.get(id).dossier = f }
const CAP = captures()
// 6. write
const all = [...nodes.values()].sort((a, b) => a.id < b.id ? -1 : 1)
const files = new Map()
for (const n of all) {
    const seen = new Set()
    n.edges = n.edges.filter(e => { const k = `${e.verb}|${e.to}|${e.origin}`; if (seen.has(k)) return false; seen.add(k); return true })
    const { id, type, name, also, match, summary, label, summary_source, graph, edges, ...rest } = n
    files.set(`entities/${n.id}.json`, { id, type, name, also, ...(match?.none?.length ? { match } : {}), summary, label, summary_source, ...rest, graph, edges, sources: [...new Set([summary_source?.url, ...edges.map(e => e.source)].map(u => u && CAP.get(u)).filter(Boolean))].sort(), by: seed.by, updated: seed.updated })
}
const M = matcher(all), mentions = {}
for (const r of signals.items) for (const id of new Set(M.find(r.text).map(h => h.id))) mentions[id] = (mentions[id] || 0) + 1
const counts = { nodes: all.length, edges: all.reduce((s, n) => s + n.edges.length, 0), by_type: {} }
for (const n of all) counts.by_type[n.type] = (counts.by_type[n.type] || 0) + 1
files.set('entities/index.json', { about: 'Every node of entities/: its id (its page is entities/<id>.html, its data entities/<id>.json), type, names, and the id of the same thing in data/graph/ when the graph has it. Made by tools/entities-make.mjs from entities/seed.json and the incident\'s data; the grammar is entities/ontology.json.', by: seed.by, updated: seed.updated, incident: seed.incident, counts, nodes: all.map(n => ({ id: n.id, type: n.type, name: n.name, also: n.also.filter(a => !n.match?.none?.includes(a)), label: n.label, graph: n.graph, edges: n.edges.length, rows: mentions[n.id] || 0 })) })
let stale = 0
const wanted = new Set(files.keys())
for (const [rel, obj] of files) {
    const f = path.join(ROOT, rel), s = JSON.stringify(obj, null, 1) + '\n'
    if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === s) continue
    stale++
    if (!CHECK) { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s) }
}
for (const t of Object.keys(onto.types)) { const d = path.join(ROOT, 'entities', t); if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (f.endsWith('.json') && !wanted.has(`entities/${t}/${f}`)) { stale++; if (!CHECK) fs.unlinkSync(path.join(d, f)) } }
const lonely = all.filter(n => !n.edges.length && !all.some(m => m.edges.some(e => e.to === n.id))).map(n => n.id)
console.log(`entities-make: ${counts.nodes} nodes, ${counts.edges} edges (${Object.entries(counts.by_type).map(([t, c]) => `${t} ${c}`).join(', ')}); ${stale} file(s) ${CHECK ? 'stale' : 'written'}`)
if (unplaced.length) console.log(`  placed by default (add to entities/seed.json actors to name them better): ${unplaced.join('; ')}`)
if (lonely.length) console.log(`  no edge in or out yet: ${lonely.join(', ')}`)
if (CHECK && stale) process.exit(1)
