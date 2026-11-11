#!/usr/bin/env node
// The model ledger's one wrapper (incident.dev@web-summit.dinis, 10 November 2026, WS-214; ROADMAP P0.4, Dinis's direction ~19:15):
// every model call the incident team makes goes through call() here, ours or OpenRouter's, so every call is stored and counted.
//   - the RAW record (request, response, error) goes to the raw store: INCIDENT_RAW_DIR (default ~/.incident-raw), never this
//     repository; when that folder is an sgit vault checkout, its owner commits and pushes it (sgit), the wrapper only writes;
//   - ONE LEDGER LINE per call goes to <INCIDENT_LEDGER_DIR, default ~/.incident-ledger>/<UTC date>.jsonl, not git: when, task, agent, provider,
//     model asked and served, tokens in and out, the cost the provider reported, latency, status, the day's cap, and the raw
//     record's name and sha256. No prompt or answer text in the ledger: that stays in the raw store (press text may not be ours to publish);
//   - ONE PUBLISHED RECORD per call (tools/models-calls.mjs, from 11 November 22:10 UTC): models/calls/<date>/<HH>.json (another agent's in
//     agents/<role>/calls/), text-free: the ledger line's fields, the sha256 of the request and of the response, and the parent (trace:);
//     with trace: { trace_id, parent_span_id, flow }, the A1 llm call's start and end as flow events in the fringe's schema;
//   - a DAILY CAP (LLM_DAILY_CAP_USD, default 20 from 11 November; each agent's share of it in models/budgets.json): a call is refused, and the refusal recorded, once the day's ledger reaches it.
// Key: OPEN_ROUTER_KEY from the environment only (as admin/tools/xray-search.mjs). Until Dinis adds it (ROADMAP question 2), run
// with --mock (a canned answer, no network) or a dummy key (the call is made, refused 401, and recorded as an error).
// A prototype until the incident site's repository exists; then it moves there with the raw store on the data lane (J2).
//
// As a module:  import { call } from './llm.mjs'; const r = await call({ task: 'WS-214/curate', agent: 'curator@…', model, messages })
// From a shell: node tools/llm.mjs --task WS-214/test --agent incident.dev@web-summit.dinis [--model M] [--mock] "prompt"
//               node tools/llm.mjs --summary [YYYY-MM-DD]
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { publishCall, emit, newSpanId } from './models-calls.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const REPO = path.resolve(HERE, '..')
// the ledger is not committed: ROADMAP P0.4 puts ledger.jsonl in the curated vault, and its lines name models, which this
// estate's agents keep out of what they push; until the vault exists (J2) it lives beside the raw store
const LEDGER_DIR = process.env.INCIDENT_LEDGER_DIR || path.join(os.homedir(), '.incident-ledger')
const RAW_DIR = process.env.INCIDENT_RAW_DIR || path.join(os.homedir(), '.incident-raw')
// the team's daily cap: 20 US dollars from 11 November ~02:50 UTC (Dinis, BRIEF.md: "you can use up to $20 in budget"); 5 before. The
// ledger lives in each agent's own session, so a session can only count its own lines: the team's cap is kept by giving each agent a
// share (models/budgets.json, shares that sum to the cap or less) and refusing an agent's call once its own lines reach its share.
const BUDGETS = (() => { try { return JSON.parse(fs.readFileSync(path.join(REPO, 'models', 'budgets.json'), 'utf8')) } catch { return {} } })()
const CAP = +(process.env.LLM_DAILY_CAP_USD || BUDGETS.team_cap_usd || 20)
export const shareOf = agent => BUDGETS.agents?.[agent]?.usd ?? BUDGETS.any_other_agent_usd ?? null
const DEFAULT_MODEL = process.env.LLM_MODEL || ''   // no model named in the code: the caller names it (--model, LLM_MODEL or model:)
const PROVIDERS = {
    openrouter: { url: 'https://openrouter.ai/api/v1/chat/completions', key: () => process.env.OPEN_ROUTER_KEY || process.env.OPENROUTER_API_KEY }   // either name (incident.shadow@'s ask, 02:40Z),
}

const day = (d = new Date()) => d.toISOString().slice(0, 10)
const ledgerFile = (d = day()) => path.join(LEDGER_DIR, `${d}.jsonl`)
export function readLedger(d = day()) { try { return fs.readFileSync(ledgerFile(d), 'utf8').split('\n').filter(Boolean).map(l => JSON.parse(l)) } catch { return [] } }
export const spentToday = () => readLedger().reduce((s, l) => s + (l.cost_usd || 0), 0)
export const spentBy = (agent, delegated = null) => readLedger().filter(l => l.agent === agent && (delegated == null || isDelegated(l.task) === delegated)).reduce((s, l) => s + (l.cost_usd || 0), 0)
// a delegated call (tools/models-delegate.mjs) draws on the agent's delegation share (models/budgets.json delegation.per_agent_usd), not its own
export const isDelegated = task => String(task || '').startsWith('WS-214/delegate/')
export const delegationShareOf = agent => BUDGETS.delegation && (BUDGETS.delegation.agents || []).includes(agent) || agent === 'incident.models@web-summit.dinis' ? BUDGETS.delegation?.per_agent_usd ?? null : null

let noCredit = null   // set to the time of the provider's first 402 in this process
function inRepo(p) { const r = path.relative(REPO, path.resolve(p)); return !r.startsWith('..') && !path.isAbsolute(r) }
if (inRepo(LEDGER_DIR)) throw new Error(`llm.mjs: INCIDENT_LEDGER_DIR (${LEDGER_DIR}) is inside the repository; the ledger goes to the curated vault, not git`)
if (inRepo(RAW_DIR)) throw new Error(`llm.mjs: INCIDENT_RAW_DIR (${RAW_DIR}) is inside the repository; raw captures never go to git`)

function writeRaw(rec) {
    const dir = path.join(RAW_DIR, rec.at.slice(0, 10)); fs.mkdirSync(dir, { recursive: true, mode: 0o700 })
    const name = `${rec.id}.json`, body = JSON.stringify(rec, null, 1) + '\n'
    fs.writeFileSync(path.join(dir, name), body, { mode: 0o600 })
    return { raw: `${rec.at.slice(0, 10)}/${name}`, raw_sha256: crypto.createHash('sha256').update(body).digest('hex').slice(0, 16), raw_bytes: Buffer.byteLength(body) }
}
function appendLedger(line) { fs.mkdirSync(LEDGER_DIR, { recursive: true }); fs.appendFileSync(ledgerFile(line.at.slice(0, 10)), JSON.stringify(line) + '\n') }

// the one call. Returns { text, line } (line: the ledger line written); never throws for a provider error: it is recorded and returned
// budget_usd (optional): this agent's own share of the day; the call is refused (and the refusal recorded) once the agent's lines reach it
export async function call({ task, agent, model = DEFAULT_MODEL, messages, max_tokens = 2000, provider = 'openrouter', mock = false, extra = {}, budget_usd = null, trace = {} }) {
    if (!task || !agent || !Array.isArray(messages)) throw new Error('call({ task, agent, messages }) needs all three')
    if (!model) throw new Error('call(): name the model (model:, --model or LLM_MODEL)')
    const at = new Date().toISOString(), id = `${at.replace(/[-:.]/g, '').slice(0, 15)}-${crypto.randomBytes(4).toString('hex')}`
    const base = { at: at.slice(0, 19) + 'Z', id, task, agent, provider: mock ? 'mock' : provider, model, cap_usd: CAP }
    const request = { model, messages, max_tokens, usage: { include: true }, ...extra }
    const spent = spentToday()
    if (!mock && spent >= CAP) {
        const line = { ...base, status: 'refused_cap', spent_today_usd: +spent.toFixed(4), tokens_in: 0, tokens_out: 0, cost_usd: 0, latency_ms: 0 }
        appendLedger(line); if (!mock) publishCall({ line, request, response: null, trace }); return { text: null, line, response: null }
    }
    const delegated = isDelegated(task) && delegationShareOf(agent) != null
    if (budget_usd == null) budget_usd = delegated ? delegationShareOf(agent) : shareOf(agent)   // the agent's share of the day (or its delegation share), unless the caller sets a smaller one
    if (!mock && budget_usd != null) {
        const mine = delegated ? spentBy(agent, true) : spentBy(agent, delegationShareOf(agent) != null ? false : null)
        if (mine >= budget_usd) { const line = { ...base, status: 'refused_budget', budget_usd, spent_by_agent_usd: +mine.toFixed(4), tokens_in: 0, tokens_out: 0, cost_usd: 0, latency_ms: 0 }; appendLedger(line); if (!mock) publishCall({ line, request, response: null, trace }); return { text: null, line, response: null } }
    }
    // after one 'account out of credit' answer this process makes no further calls: each would be refused, and each refusal is noise in the
    // ledger. One line was written for the refusal itself; these are returned to the caller and not written. A new process tries once again.
    if (!mock && noCredit) return { text: null, line: { ...base, status: 'not_sent_account_out_of_credit', since: noCredit, tokens_in: 0, tokens_out: 0, cost_usd: 0, latency_ms: 0 }, response: null }
    // the A1 llm call as a span of the caller's trace (a loop's step), when the caller gives one
    const span = { ...trace, span_id: trace.span_id || newSpanId() }
    if (!mock && trace.trace_id) await emit({ trace_id: trace.trace_id, span_id: span.span_id, parent_span_id: trace.parent_span_id, parent_id: trace.parent_unit_id, flow: trace.flow || task, altitude: 'A1', role: 'llm call', phase: 'start', runner: agent, model })
    const t0 = Date.now(); let status = 'ok', response = null, error = null, text = null
    try {
        if (mock) response = { model: model + ' (mock)', choices: [{ message: { role: 'assistant', content: 'mock answer to: ' + String(messages.at(-1).content).slice(0, 80) }, finish_reason: 'stop' }], usage: { prompt_tokens: 12, completion_tokens: 8, cost: 0 } }
        else {
            const P = PROVIDERS[provider]; if (!P) throw new Error('unknown provider ' + provider)
            const c = new AbortController(), timer = setTimeout(() => c.abort(), 120000)
            try {
                const r = await fetch(P.url, { method: 'POST', signal: c.signal, headers: { Authorization: `Bearer ${P.key() || 'missing'}`, 'Content-Type': 'application/json', 'X-Title': 'WS-214 incident team' }, body: JSON.stringify(request) })
                const body = await r.text(); try { response = JSON.parse(body) } catch { response = { raw: body.slice(0, 4000) } }
                if (!r.ok) { status = 'http_' + r.status; error = (response.error && response.error.message) || body.slice(0, 300) }
                // 402 is the ACCOUNT's balance at the provider, not a model's error and not our cap: named as such, and this process sends no more
                if (r.status === 402) { status = 'account_out_of_credit'; noCredit = at }
            } finally { clearTimeout(timer) }
        }
        if (response && response.choices) text = response.choices[0]?.message?.content ?? null
    } catch (e) { status = 'error'; error = String(e.message || e) }
    const ms = Date.now() - t0, u = (response && response.usage) || {}
    const raw = writeRaw({ ...base, request, response, error, latency_ms: ms })
    const line = { ...base, model_served: response && response.model || null, status, tokens_in: u.prompt_tokens ?? 0, tokens_out: u.completion_tokens ?? 0, cost_usd: typeof u.cost === 'number' ? u.cost : 0, latency_ms: ms, ...raw, ...(error ? { error: String(error).slice(0, 200) } : {}) }
    appendLedger(line)
    if (!mock) {
        const published = publishCall({ line, request, response, trace: span })
        if (published) line.published = published
        if (trace.trace_id) await emit({ trace_id: trace.trace_id, span_id: span.span_id, parent_span_id: trace.parent_span_id, parent_id: trace.parent_unit_id, flow: trace.flow || task, altitude: 'A1', role: 'llm call', phase: 'end', runner: agent, model: line.model_served || model, valid: status === 'ok' })
    }
    return { text, line, response }   // response: the provider's whole answer (an answer engine's citations are in it); it is also in the raw store
}

export function summary(d = day()) {
    const L = readLedger(d), by = k => L.reduce((m, l) => { const v = l[k] || '?'; m[v] = m[v] || { calls: 0, cost_usd: 0, tokens_in: 0, tokens_out: 0 }; m[v].calls++; m[v].cost_usd += l.cost_usd || 0; m[v].tokens_in += l.tokens_in || 0; m[v].tokens_out += l.tokens_out || 0; return m }, {})
    return { day: d, calls: L.length, cost_usd: +L.reduce((s, l) => s + (l.cost_usd || 0), 0).toFixed(6), cap_usd: CAP, tokens_in: L.reduce((s, l) => s + (l.tokens_in || 0), 0), tokens_out: L.reduce((s, l) => s + (l.tokens_out || 0), 0), by_model: by('model'), by_agent: by('agent'), by_task: by('task'), by_status: by('status'), by_hour: L.reduce((m, l) => { const h = l.at.slice(11, 13) + ':00'; m[h] = m[h] || { calls: 0, cost_usd: 0 }; m[h].calls++; m[h].cost_usd += l.cost_usd || 0; return m }, {}) }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const a = process.argv.slice(2), opt = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined }, has = k => a.includes('--' + k)
    if (has('summary')) { console.log(JSON.stringify(summary(a[a.indexOf('--summary') + 1] || day()), null, 1)); process.exit(0) }
    const rest = []; for (let i = 0; i < a.length; i++) { if (['--task', '--agent', '--model'].includes(a[i])) i++; else if (!a[i].startsWith('--')) rest.push(a[i]) }
    const prompt = rest.join(' ')
    if (!opt('task') || !opt('agent') || !prompt) { console.error('usage: llm.mjs --task T --agent A [--model M] [--mock] "prompt"   |   llm.mjs --summary [date]'); process.exit(2) }
    const { text, line } = await call({ task: opt('task'), agent: opt('agent'), model: opt('model') || DEFAULT_MODEL, mock: has('mock'), messages: [{ role: 'user', content: prompt }] })
    console.log(JSON.stringify(line)); if (text) console.log(text)
    process.exit(line.status === 'ok' ? 0 : 1)
}
