#!/usr/bin/env node
// Flows, built from the record (incident.motion@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~10:10 UTC, BRIEF.md).
//
//   node tools/flows-build.mjs --out _site   writes, ONLY under <out>/data/flows/ and <out>/api/v1/flows/:
//                                            record.json (the commits, sessions, keys and hand-overs the recipes read),
//                                            <id>.json (one flow each, in the format of data/flows/schema.json) and index.json.
//   node tools/flows-build.mjs --check       builds them in memory and exits 1 if a flow breaks the format.
//
// Which flows: flows/flows.json (recipes: a wake, a hand-over, an agent over the night) and every story/paths/*.md that has
// a table of steps (incident.storyteller@'s paths). The recipes are in app/flows/core.js, the same file the browser runs.
// Reads tracked files only (no git history: CI clones one commit), no network, no clock in the output.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2), CHECK = args.includes('--check')
const OUT = args.includes('--out') ? path.resolve(args[args.indexOf('--out') + 1]) : null
if (!OUT && !CHECK) { console.error('usage: flows-build.mjs --out <dir> | --check'); process.exit(2) }
const read = rel => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) } catch { return null } }
const text = rel => { try { return fs.readFileSync(path.join(ROOT, rel), 'utf8') } catch { return '' } }
const ls = rel => { try { return fs.readdirSync(path.join(ROOT, rel)).sort() } catch { return [] } }

const G = {}; new Function('globalThis', text('app/flows/core.js'))(G)
const F = G.FlowsCore

// the record: commits joined by sha (incident.ci@'s files carry the files and the run; observability's the latest hour)
const commits = new Map()
for (const f of ls('data/ci/commits').filter(f => f.endsWith('.json'))) for (const c of (read('data/ci/commits/' + f)?.commits || [])) {
    if (!c.sha || !c.at) continue
    commits.set(c.sha, { sha: c.sha, at: c.at, agent: c.agent || '', to: c.to || [], what: String(c.what || '').slice(0, 200), files: (c.files || []).slice(0, 4), n_files: c.n_files ?? (c.files || []).length, run: c.run?.run || null, served: c.served?.version || null })
}
const oc = read('data/agents/commits.json')
for (const c of (oc?.items || [])) {
    const had = commits.get(c.sha)
    if (had) { had.served = had.served || c.served_in || null; continue }
    commits.set(c.sha, { sha: c.sha, at: c.at, agent: c.agent || '', to: c.to || [], what: c.what || '', files: [], n_files: c.files ?? 0, run: null, served: c.served_in || null })
}
const sessions = {}, roles = {}, keys = {}, handovers = {}
for (const a of (read('data/agents/sessions.json')?.agents || [])) {
    roles[a.agent] = a.role
    sessions[a.agent] = (Array.isArray(a.sessions) ? a.sessions : []).map(s => ({ n: s.n, first: s.first_commit?.at || null, last: s.last_commit?.at || null, commits: s.commits, started_by: s.started_by, started_at: s.started_at, on_whose_word: s.on_whose_word, brief_section: s.brief_section }))
}
for (const k of (read('data/keys.json')?.keys || [])) { const m = String(k.id || '').match(/-(\d+)$/); const h = String(k.how || '').match(/(\d{1,2}) November (2026),? (\d{2}):(\d{2}) UTC/); (keys[k.agent] ||= []).push({ id: k.id, n: m ? +m[1] : 1, made_at: h ? `2026-11-${h[1].padStart(2, '0')}T${h[3]}:${h[4]}:00Z` : null, record: k.bundle?.signing_fingerprint || k.bundle?.fingerprint || '', status: k.status || '', added: k.added || '' }) }
for (const role of ls('agents')) {
    const s = read(`agents/${role}/status.json`); if (!s || !s.agent) continue
    roles[s.agent] ||= role
    if (s.handover && typeof s.handover === 'object') handovers[s.agent] = { at: s.handover.at || null, why: s.handover.why || '', file: `agents/${role}/status.json` }
}
const list = [...commits.values()].sort((a, b) => Date.parse(a.at) - Date.parse(b.at))
const record = {
    about: 'The record the flows are made from, joined from tracked files at build time: commits (data/ci/commits/*.json by incident.ci@, data/agents/commits.json by incident.observability@), sessions (data/agents/sessions.json), keys (data/keys.json, ids and public fingerprints only) and hand-over notes (agents/*/status.json). Session addresses are left out. The browser API (app/flows/embed.html?kind=&agent=) reads this file.',
    by: 'incident.motion@web-summit.dinis', updated: list.length ? list[list.length - 1].at : null, head: oc?.head || null,
    from: list[0]?.at || null, count: list.length, commits: list, sessions, keys, handovers, roles
}

// the flows
const flows = [], problems = []
for (const spec of (read('flows/flows.json')?.flows || [])) {
    const f = F.make(record, spec)
    if (!f) { problems.push(`${spec.id}: the recipe found nothing in the record`); continue }
    Object.assign(f, { id: spec.id, ...(spec.title ? { title: spec.title } : {}), ...(spec.summary ? { summary: spec.summary } : {}), recipe: { kind: spec.kind, agent: spec.agent, ...(spec.n ? { n: spec.n } : {}), ...(spec.at ? { at: spec.at } : {}) } })
    flows.push(f)
}
const castMd = text('story/cast.md'), cast = []
if (castMd) { const tmp = F.fromPath(castMd + '\n\n| t | actor | verb | object | evidence |\n|---|---|---|---|---|\n| 00:00 | x | ends | x | cast |\n', 'cast', record, []); for (const a of tmp?.actors || []) if (a.id !== 'x') cast.push(a) }
const castJson = read('story/cast.json'); for (const a of (castJson?.cast || castJson?.actors || [])) if (a.id) cast.push(a)
for (const f of ls('story/paths').filter(f => f.endsWith('.md'))) {
    const id = f.replace(/\.md$/, ''), fl = F.fromPath(text('story/paths/' + f), id, record, cast)
    if (fl) { fl.source = 'story/paths/' + f; flows.push(fl) }
}
for (const f of flows) { f.by = 'incident.motion@web-summit.dinis'; for (const p of F.check(f)) problems.push(`${f.id}: ${p}`) }

const index = {
    about: 'Every flow of the team\'s work this site builds (incident.motion@web-summit.dinis): small, step by step, each step with its evidence. Experiments. The format: data/flows/schema.json; how to embed one: flows/README.md.',
    by: 'incident.motion@web-summit.dinis', updated: record.updated, schema: F.SCHEMA,
    flows: flows.map(f => ({ id: f.id, kind: f.kind, title: f.title, summary: f.summary, steps: f.steps.length, actors: f.actors.length, from: f.window.from, to: f.window.to, url: `data/flows/${f.id}.json`, embed: `app/flows/embed.html?flow=${f.id}` })),
    problems
}
if (CHECK) { for (const p of problems) console.log('FLOW ' + p); console.log(`${flows.length} flows, ${problems.length} problem(s), record of ${list.length} commits`); process.exit(problems.length ? 1 : 0) }
for (const dir of ['data/flows', 'api/v1/flows']) {
    const d = path.join(OUT, dir); fs.mkdirSync(d, { recursive: true })
    fs.writeFileSync(path.join(d, 'record.json'), JSON.stringify(record))
    fs.writeFileSync(path.join(d, 'index.json'), JSON.stringify(index, null, 2))
    for (const f of flows) fs.writeFileSync(path.join(d, f.id + '.json'), JSON.stringify(f, null, 1))
}
if (problems.length) console.log(`flows: ${problems.length} problem(s), first: ${problems[0]}`)
