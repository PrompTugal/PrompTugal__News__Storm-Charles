#!/usr/bin/env node
// Delegate one piece of a collector's analysis to open-weight models through OpenRouter: an A2 loop
// (incident.models@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC, BRIEF.md: "start refactoring ... the agent collectors
// ... to use Open Router ... you should be using open source models", "at least let's have a couple").
//   node tools/models-delegate.mjs --task translate --input notice.json --agent incident.transport@web-summit.dinis \
//        [--models a,b] [--no-comparison] [--out result.json] [--trace-id T --parent-span S] [--wake "hourly 22:31"] [--mock]
// The loop: for each model (models/delegate.json's open-weight pair, plus one commercial model for comparison unless --no-comparison),
// call it through tools/llm.mjs, check the answer against the task's JSON schema (and the task's own check, e.g. the figures of a
// translation), re-ask a bad answer at most twice, and stop. Then compare the models field by field: their agreement, and the answer the
// open-weight models agree on. It cannot start other loops or schedule anything (A2: a closed loop).
// Input: a JSON file { input, published_at?, sources?, id? } or a plain text file (the input itself). '-' reads stdin.
// Output (--out, or stdout): { task, agent, at, trace_id, models: [{ model, open_weight, status, attempts, answer, valid, check, cost_usd, … }],
//   agreement: { field: share }, agreed: {…} | null, label: 'evidence', by_models: [...] }. The answers are model text: the calling agent
// keeps them outside git or publishes only what its own check passed, labelled evidence with the model's name (CLAUDE.md).
// Every call is in the ledger and in the published, text-free record (models/calls/ or agents/<role>/calls/), with the flow events:
// A2 loop start/step/end here, A1 llm call start/end in llm.mjs, all under one trace_id (tools/models-calls.mjs).
// As a module: import { delegate } from './models-delegate.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { call } from './llm.mjs'
import { PROMPTS } from './models-prompts.mjs'
import crypto from 'node:crypto'
import { emit, traceIdOf, spanIdOf, unitOfAgent } from './models-calls.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = f => JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8'))
export const TABLE = J('models/delegate.json')
const ROSTER = (() => { try { return Object.fromEntries(J('models/evals/models.json').models.map(m => [m.id, m])) } catch { return {} } })()
const DECIDERS = (() => { try { return J('models/evals/extract-decision/items.json').deciders } catch { return [] } })()

// a small JSON-schema check: type, required, enum, pattern, minLength, maxLength (all the table uses)
export function check(schema, v, at = '') {
    const errs = [], t = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : null
    const typeOf = x => x === null ? 'null' : Array.isArray(x) ? 'array' : typeof x
    if (t && !t.includes(typeOf(v))) return [`${at || 'answer'}: ${typeOf(v)}, not ${t.join(' or ')}`]
    if (schema.enum && !schema.enum.includes(v)) errs.push(`${at}: ${JSON.stringify(v)} is not one of ${schema.enum.join(', ')}`)
    if (typeof v === 'string') {
        if (schema.pattern && !new RegExp(schema.pattern).test(v)) errs.push(`${at}: ${JSON.stringify(v).slice(0, 60)} is not written as ${schema.pattern}`)
        if (schema.minLength != null && v.length < schema.minLength) errs.push(`${at}: empty`)
        if (schema.maxLength != null && v.length > schema.maxLength) errs.push(`${at}: longer than ${schema.maxLength}`)
    }
    if (typeOf(v) === 'object') {
        for (const k of schema.required || []) if (!(k in v)) errs.push(`missing key "${k}"`)
        for (const [k, s] of Object.entries(schema.properties || {})) if (k in v) errs.push(...check(s, v[k], k))
    }
    return errs
}
function parse(text) {
    if (!text) return null
    const t = text.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```(?:json)?/g, ''), i = t.indexOf('{'), j = t.lastIndexOf('}')
    if (i < 0 || j <= i) return null
    try { const o = JSON.parse(t.slice(i, j + 1)); return o && typeof o === 'object' && !Array.isArray(o) ? o : null } catch { return null }
}
// the task's own check beyond the schema
const figs = t => (String(t).match(/\d+(?:[.,]\d+)?/g) || []).map(x => x.replace(',', '.')).sort()
const TASK_CHECK = {
    translate: (ans, it) => { const want = figs(it.input), got = figs(ans.en); const missing = want.filter(f => !got.includes(f)); return missing.length ? [`figures missing from the English: ${[...new Set(missing)].join(', ')}`] : [] },
    'match-fact': (ans, it) => Array.isArray(it.facts) && ans.fact !== 'none' && !it.facts.some(f => f.id === ans.fact) ? [`fact "${ans.fact}" is not in the list (or "none")`] : [],
    'extract-decision': (ans, it) => (it.deciders || DECIDERS).length && !(it.deciders || DECIDERS).some(d => d.id === ans.decider) ? [`decider "${ans.decider}" is not in the list`] : [],
}
const norm = v => typeof v === 'string' ? v.trim().toLowerCase().replace(/:00z$/, 'z') : JSON.stringify(v)

export async function delegate({ task, input, agent, models = null, comparison = true, trace_id = null, parent_span_id = null, wake = null, mock = false, max_tokens = 1500 }) {
    const T = TABLE.tasks[task]; if (!T) throw new Error(`unknown task ${task}; one of ${Object.keys(TABLE.tasks).join(', ')}`)
    if (!agent) throw new Error('delegate(): name the calling agent')
    const it = typeof input === 'string' ? { input } : input
    if (!it || typeof it.input !== 'string' || !it.input.trim()) throw new Error('delegate(): the input is empty')
    const list = [...(models || T.models).map(m => ({ model: m, open_weight: ROSTER[m]?.open_weight ?? true })), ...(comparison && T.comparison ? [{ model: T.comparison.model, open_weight: false, comparison: true }] : [])]
    // ids as flow.mjs computes them: the loop is its own flow (unless the caller passes its trace), its unit A2-delegate-<task>-<run>,
    // its parent the calling agent's unit A3-<agent> (or the span the caller names)
    const run = `${new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15)}-${crypto.randomBytes(3).toString('hex')}`
    const flow = `ws214-delegate-${task}-${run}`
    trace_id = trace_id || traceIdOf(flow)
    const loopUnit = `A2-delegate-${task}-${run}`
    const loop = { trace_id, span_id: spanIdOf(loopUnit), parent_span_id: parent_span_id || spanIdOf(unitOfAgent(agent)), flow }
    const ev = (phase, extra = {}) => emit({ ...loop, unit_id: loopUnit, parent_id: parent_span_id ? undefined : unitOfAgent(agent), altitude: 'A2', role: 'loop', phase, runner: agent, ...extra })
    await ev('start', { detail: { task, models: list.map(m => m.model), item: it.id || null, by: wake ? 'wake' : 'command', wake: wake || null } })
    const messages0 = PROMPTS[T.prompt](it, { deciders: it.deciders || DECIDERS })   // a caller may give its own list of deciders (id, name)
    const out = []
    for (const m of list) {
        const [id, variant] = m.model.split('#'), extra = { temperature: 0, ...(ROSTER[m.model]?.extra || (variant === 'reasoning-off' ? { reasoning: { enabled: false } } : {})) }
        let messages = messages0, r = { model: m.model, open_weight: m.open_weight, ...(m.comparison ? { comparison: true, label: 'commercial, for comparison' } : { label: 'open-weight' }), attempts: 0, cost_usd: 0, latency_ms: 0, tokens_in: 0, tokens_out: 0, calls: [] }
        for (let attempt = 1; attempt <= 1 + TABLE.retries; attempt++) {
            const { text, line } = await call({ task: `WS-214/delegate/${task}`, agent, model: id, messages, max_tokens, mock, extra,
                trace: { trace_id, parent_span_id: loop.span_id, parent_unit_id: loopUnit, flow: loop.flow, by: wake ? 'wake' : 'loop', name: wake || `delegate/${task}`, parent_agent: agent } })
            r.attempts = attempt; r.cost_usd += line.cost_usd || 0; r.latency_ms += line.latency_ms || 0; r.tokens_in += line.tokens_in || 0; r.tokens_out += line.tokens_out || 0
            r.calls.push({ id: line.id, status: line.status, raw_sha256: line.raw_sha256 || null }); r.model_served = line.model_served || null
            // a rate limit or a server error is the provider's, not the model's: wait and try once more (it counts as an attempt); our cap's or the
            // account's refusal is not retried
            if (line.status !== 'ok' && /^http_(429|5\d\d)$|^error$/.test(line.status) && attempt <= TABLE.retries) { await new Promise(res => setTimeout(res, 2500 * attempt)); continue }
            if (line.status !== 'ok') { r.status = line.status; r.errors = [line.error || line.status]; break }
            const ans = mock ? mockAnswer(task, it) : parse(text)
            const errs = ans ? [...check(T.schema, ans), ...(TASK_CHECK[task] ? TASK_CHECK[task](ans, it) : [])] : ['not one JSON object']
            await ev('step', { model: id, valid: !errs.length, detail: { attempt, call: line.id, errors: errs.slice(0, 3) } })
            if (!errs.length) { r.status = 'answered'; r.valid = true; r.answer = ans; delete r.errors; break }
            r.status = 'invalid'; r.valid = false; r.errors = errs; r.answer = ans
            messages = [...messages0, { role: 'assistant', content: String(text || '').slice(0, 2000) }, { role: 'user', content: `That answer does not meet the format: ${errs.slice(0, 3).join('; ')}. Answer again with one JSON object only.` }]
        }
        r.cost_usd = +r.cost_usd.toFixed(8); out.push(r)
    }
    // agreement, field by field, among the valid answers; the agreed answer is what every valid open-weight answer says
    const fields = Object.keys(T.schema.properties), valid = out.filter(r => r.valid), openValid = valid.filter(r => !r.comparison)
    const agreement = {}
    for (const f of fields) {
        if (task === 'translate' && f === 'en') continue   // free text: agreement is the figures, below
        const vals = valid.map(r => norm(r.answer[f])), top = Math.max(0, ...Object.values(vals.reduce((m, v) => (m[v] = (m[v] || 0) + 1, m), {})))
        agreement[f] = valid.length ? +(top / valid.length).toFixed(2) : null
    }
    if (task === 'translate') { const fs_ = valid.map(r => JSON.stringify(figs(r.answer.en))); agreement.figures = valid.length ? +(Math.max(...Object.values(fs_.reduce((m, v) => (m[v] = (m[v] || 0) + 1, m), {}))) / valid.length).toFixed(2) : null }
    let agreed = null
    if (openValid.length >= 2) {
        if (task === 'translate') agreed = { en: openValid[0].answer.en, figures_agree: new Set(openValid.map(r => JSON.stringify(figs(r.answer.en)))).size === 1 }
        else if (fields.every(f => new Set(openValid.map(r => norm(r.answer[f]))).size === 1)) agreed = openValid[0].answer
    }
    const result = { task, agent, at: new Date().toISOString().slice(0, 19) + 'Z', item: it.id || null, trace_id, loop_span_id: loop.span_id,
        label: 'evidence', label_note: `model output: evidence until ${agent}'s own check passes (${T.check}); shown with the model's name`,
        by_models: openValid.map(r => r.model), agreed, agreement, models: out.map(({ calls, ...r }) => ({ ...r, calls })),
        cost_usd: +out.reduce((s, r) => s + r.cost_usd, 0).toFixed(8), calls: out.reduce((s, r) => s + r.calls.length, 0) }
    await ev('end', { valid: openValid.length > 0, detail: { calls: result.calls, cost_usd: result.cost_usd, agreed: !!agreed } })
    return result
}
function mockAnswer(task, it) {
    return { translate: { en: 'mock summary ' + figs(it.input).join(' ') }, 'extract-warning': { type: 'rain', level: 'yellow', area: 'Lisboa', start_utc: '2026-11-11T00:00:00Z', end_utc: '2026-11-11T09:00:00Z' },
        'extract-decision': { decider: 'ipma', what: 'mock', effect_from_utc: null, effect_to_utc: null }, label: { label: 'evidence' }, 'match-fact': { fact: 'none' } }[task]
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const a = process.argv.slice(2), o = {}, flags = ['task', 'input', 'agent', 'models', 'out', 'trace-id', 'parent-span', 'wake']
    for (let i = 0; i < a.length; i++) { const k = a[i].replace(/^--/, ''); if (flags.includes(k)) o[k] = a[++i]; else if (a[i].startsWith('--')) o[k] = true }
    if (!o.task || !o.input || !o.agent) { console.error('usage: models-delegate.mjs --task <' + Object.keys(TABLE.tasks).join('|') + '> --input FILE|- --agent A [--models a,b] [--no-comparison] [--out FILE] [--trace-id T --parent-span S] [--wake W] [--mock]'); process.exit(2) }
    const body = fs.readFileSync(o.input === '-' ? 0 : o.input, 'utf8')
    let input; try { input = JSON.parse(body); if (typeof input === 'string') input = { input } } catch { input = { input: body } }
    const r = await delegate({ task: o.task, input, agent: o.agent, models: o.models ? o.models.split(',') : null, comparison: !o['no-comparison'], trace_id: o['trace-id'] || null, parent_span_id: o['parent-span'] || null, wake: o.wake || process.env.INCIDENT_WAKE || null, mock: !!o.mock })
    const s = JSON.stringify(r, null, 1) + '\n'
    if (o.out) fs.writeFileSync(o.out, s); else process.stdout.write(s)
    process.exit(r.by_models.length ? 0 : 1)
}
