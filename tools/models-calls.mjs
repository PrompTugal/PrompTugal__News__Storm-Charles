#!/usr/bin/env node
// The published, text-free record of every model call, and the flow events of the loops that make them
// (incident.models@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC, BRIEF.md: "All of these needs to be JSON files").
//   - tools/llm.mjs calls publishCall() once per call: one record in <calls dir>/<UTC date>/<HH>.json (each file ≤ 240 KB; a full
//     hour rolls to <HH>-2.json, -3 …). When, agent, task, provider, model asked and served, tokens, cost, latency, status, the
//     sha256 of the request and of the response, and the parent (the agent and the loop or wake that made the call). No prompt and
//     no answer text: the raw stays in the raw store outside git (CLAUDE.md).
//   - emit() writes a flow event in the fringe repository's schema (PrompTugal__News__Fringe, data/elastic-export-swarm-flows.json
//     `fields`: trace_id, span_id, parent_span_id, unit_id, parent_id, flow, altitude, role, phase, environment, runner, person,
//     model, key_fp, at, seq, valid): A1 llm call start/end from llm.mjs, A2 loop start/step/end from tools/models-delegate.mjs.
//     Into the same hour file, `events`, with trace_id and span_id computed as flow.mjs and incident.observability@'s tools/trace.mjs
//     compute them (sha256('trace:'+flow)[0:32], sha256('span:'+unit_id)[0:16]), so data/trace/ can take them unchanged. tools/trace.mjs runs
//     its command line when imported, so it is not imported here: observability reads these files (asked 22:16 UTC).
// Where: models/calls/ for incident.models@; any other agent's calls go to agents/<its role>/calls/ (its own folder, so it can
// commit them) unless INCIDENT_CALLS_DIR says otherwise. INCIDENT_CALLS=off writes nothing (tests).
//   node tools/models-calls.mjs --index      models/calls/index.json: every hour file in the repository, its counts and sha256
//   node tools/models-calls.mjs --from-ledger [YYYY-MM-DD]   publish this agent's ledger lines that have no record yet, then the index
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ME = 'incident.models@web-summit.dinis'
const MAX_BYTES = 240 * 1024
export const sha256 = s => crypto.createHash('sha256').update(typeof s === 'string' ? s : JSON.stringify(s ?? null)).digest('hex')
// ids as the fringe's abp/tools/flow.mjs computes them (and incident.observability@'s tools/trace.mjs): a trace per flow, a span per unit
const hex = (s, n) => crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, n)
export const traceIdOf = flow => hex('trace:' + flow, 32)
export const spanIdOf = unit => hex('span:' + unit, 16)
export const unitOfAgent = agent => 'A3-' + agent
export const newTraceId = () => crypto.randomBytes(16).toString('hex')
export const newSpanId = () => crypto.randomBytes(8).toString('hex')
const off = () => process.env.INCIDENT_CALLS === 'off'

export function callsDir(agent) {
    if (process.env.INCIDENT_CALLS_DIR) return path.resolve(process.env.INCIDENT_CALLS_DIR)
    if (agent === ME) return path.join(REPO, 'models', 'calls')
    const role = String(agent || 'unknown').replace(/^incident\./, '').replace(/@.*$/, '').replace(/[^a-z0-9-]/gi, '-')
    return path.join(REPO, 'agents', role, 'calls')
}

// the agent's active session key, from data/keys.json (its fingerprint only): the key_fp of its events
const KEYS = (() => { try { return JSON.parse(fs.readFileSync(path.join(REPO, 'data', 'keys.json'), 'utf8')).keys || [] } catch { return [] } })()
export const keyOf = agent => process.env.INCIDENT_KEY_FP || KEYS.filter(k => k.agent === agent && k.status === 'active').at(-1)?.bundle?.fingerprint || null
const ENVIRONMENT = process.env.INCIDENT_ENVIRONMENT || 'R1 Claude Code cloud'
const PERSON = 'dinis'

// one item per line (calls and events), the rest pretty: about half the bytes of indented JSON, still diffable line by line
const compactJson = doc => '{\n' + Object.entries(doc).map(([k, v]) => Array.isArray(v) ? ` ${JSON.stringify(k)}: [${v.length ? '\n' + v.map(x => '  ' + JSON.stringify(x)).join(',\n') + '\n ' : ''}]` : ` ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n') + '\n}\n'
// one hour file: { about, by, updated, date, hour, part, calls: [], events: [] }; read, add, write back (synchronously: one process at a time per agent)
function hourFile(agent, at) {
    const dir = path.join(callsDir(agent), at.slice(0, 10)); fs.mkdirSync(dir, { recursive: true })
    const hh = at.slice(11, 13)
    for (let part = 1; ; part++) {
        const f = path.join(dir, part === 1 ? `${hh}.json` : `${hh}-${part}.json`)
        if (!fs.existsSync(f) || fs.statSync(f).size < MAX_BYTES - 4096) return { f, part, hh }
    }
}
function add(agent, at, key, item) {
    if (off()) return null
    const { f, part, hh } = hourFile(agent, at)
    let doc; try { doc = JSON.parse(fs.readFileSync(f, 'utf8')) } catch { doc = null }
    if (!doc) doc = { about: 'Model calls and flow events of one UTC hour, text-free: no prompt and no answer (the raw stays in the raw store outside git). Calls: one per model call made through tools/llm.mjs. Events: the fringe repository\'s flow schema (A2 loop, A1 llm call). Written by tools/models-calls.mjs.', by: agent, updated: at, date: at.slice(0, 10), hour: `${hh}:00Z`, part, calls: [], events: [] }
    doc[key].push(item); doc.updated = at
    fs.writeFileSync(f, compactJson(doc))
    return path.relative(REPO, f)
}

// the published record of one call: everything in the ledger line that is not text, plus both hashes and the parent
export function publishCall({ line, request, response, trace = {} }) {
    const rec = {
        id: line.id, at: line.at, agent: line.agent, task: line.task, provider: line.provider,
        model_asked: line.model, model_served: line.model_served || null,
        tokens_in: line.tokens_in || 0, tokens_out: line.tokens_out || 0, reasoning_tokens: response?.usage?.completion_tokens_details?.reasoning_tokens ?? null,
        cost_usd: line.cost_usd || 0, latency_ms: line.latency_ms || 0, status: line.status,
        finish_reason: response?.choices?.[0]?.finish_reason ?? null,
        request_sha256: request ? sha256(request) : null, response_sha256: response ? sha256(response) : null,
        raw: line.raw || null, raw_sha256: line.raw_sha256 || null,
        trace_id: trace.trace_id || null, span_id: trace.span_id || null,
        parent: { agent: trace.parent_agent || line.agent, by: trace.by || (process.env.INCIDENT_WAKE ? 'wake' : 'command'), name: trace.name || process.env.INCIDENT_WAKE || null,
            span_id: trace.parent_span_id || null, unit_id: trace.parent_unit_id || null },
    }
    return add(line.agent, line.at, 'calls', rec)
}

// one flow event, in the fringe's fields; seq: microseconds since the epoch plus a counter, so events of one millisecond keep their order
let seqN = 0, lastMs = 0
export async function emit(e) {
    const now = Date.now(); seqN = now === lastMs ? seqN + 1 : 0; lastMs = now
    const ev = { trace_id: e.trace_id, span_id: e.span_id, ...(e.parent_span_id ? { parent_span_id: e.parent_span_id } : {}),
        unit_id: e.unit_id || `${e.altitude}-${e.span_id.slice(0, 12)}`, ...(e.parent_id ? { parent_id: e.parent_id } : {}),
        flow: e.flow, altitude: e.altitude, role: e.role, phase: e.phase, environment: ENVIRONMENT, runner: e.runner, person: PERSON,
        ...(e.model ? { model: e.model } : {}), key_fp: keyOf(e.runner), at: new Date(now).toISOString(), seq: now * 1000 + seqN,
        ...(e.valid != null ? { valid: e.valid } : {}), ...(e.detail ? { detail: e.detail } : {}) }
    return add(e.runner, ev.at.slice(0, 19) + 'Z', 'events', ev)
}
// models/calls/index.json: every hour file under models/calls/ and agents/*/calls/, with its counts
export function buildIndex() {
    const roots = [path.join(REPO, 'models', 'calls'), ...fs.readdirSync(path.join(REPO, 'agents')).map(a => path.join(REPO, 'agents', a, 'calls'))].filter(d => fs.existsSync(d))
    const files = []
    for (const r of roots) for (const day of fs.readdirSync(r).filter(d => /^\d{4}-\d\d-\d\d$/.test(d)).sort()) for (const f of fs.readdirSync(path.join(r, day)).filter(f => /^\d\d(-\d+)?\.json$/.test(f)).sort()) {
        const p = path.join(r, day, f), body = fs.readFileSync(p, 'utf8'), d = JSON.parse(body)
        files.push({ path: path.relative(REPO, p), by: d.by, date: d.date, hour: d.hour, calls: d.calls.length, events: d.events.length, cost_usd: +d.calls.reduce((s, c) => s + (c.cost_usd || 0), 0).toFixed(6), bytes: Buffer.byteLength(body), sha256: sha256(body) })
    }
    const now = new Date().toISOString().slice(0, 19) + 'Z'
    const idx = { about: 'Every published hour file of model calls and flow events (text-free), across the team: models/calls/ (incident.models@) and agents/<role>/calls/ (any other agent that calls a model through tools/llm.mjs). Each file: { calls, events }; the shape is in tools/models-calls.mjs.', by: ME, updated: now,
        totals: { files: files.length, calls: files.reduce((s, f) => s + f.calls, 0), events: files.reduce((s, f) => s + f.events, 0), cost_usd: +files.reduce((s, f) => s + f.cost_usd, 0).toFixed(6) }, files }
    fs.mkdirSync(path.join(REPO, 'models', 'calls'), { recursive: true })
    fs.writeFileSync(path.join(REPO, 'models', 'calls', 'index.json'), JSON.stringify(idx, null, 1) + '\n')
    return idx
}

// a call in the ledger that has no published record (made before this file existed, or its record lost): published from the ledger
// line and the raw record (whose request and response give the two hashes); no trace, its parent unknown
export async function fromLedger(day, agent = ME) {
    const os = await import('node:os')
    const LEDGER = process.env.INCIDENT_LEDGER_DIR || path.join(os.homedir(), '.incident-ledger'), RAW = process.env.INCIDENT_RAW_DIR || path.join(os.homedir(), '.incident-raw')
    let lines = []; try { lines = fs.readFileSync(path.join(LEDGER, `${day}.jsonl`), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) } catch { return 0 }
    const have = new Set()
    const dir = path.join(callsDir(agent), day)
    if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) { try { for (const c of JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).calls) have.add(c.id) } catch { } }
    let n = 0
    for (const line of lines.filter(l => l.agent === agent && l.provider !== 'mock' && !have.has(l.id))) {
        let rec = null; try { rec = JSON.parse(fs.readFileSync(path.join(RAW, line.raw || ''), 'utf8')) } catch { }
        publishCall({ line, request: rec?.request || null, response: rec?.response || null, trace: { by: 'unknown (published from the ledger)' } }); n++
    }
    return n
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const i = process.argv.indexOf('--from-ledger')
    if (i >= 0) { const n = await fromLedger(process.argv[i + 1] || new Date().toISOString().slice(0, 10)); console.log(JSON.stringify({ published_from_ledger: n, totals: buildIndex().totals })); process.exit(0) }
    if (process.argv.includes('--index')) { const i = buildIndex(); console.log(JSON.stringify(i.totals)); process.exit(0) }
    console.error('usage: models-calls.mjs --index'); process.exit(2)
}
