#!/usr/bin/env node
// Run the evals (incident.models@web-summit.dinis, WS-214): every call through tools/llm.mjs, so each is stored and counted.
//   node tools/models-run.mjs [--task extract-warning,label] [--models id,id] [--limit N] [--redo] [--repeats N]
// Reads models/evals/<task>/items.json and models/evals/models.json; writes models/evals/<task>/results/<model>.json: the model's
// parsed answer to each item (first run), right or wrong per field, cost, latency; and for the repeat runs only whether each was
// right, its cost and latency. The raw request and response stay in the raw store. Stops when this agent's spend today reaches its
// share (MODELS_BUDGET_USD, or models/budgets.json).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { call, spentBy, shareOf } from './llm.mjs'
import { PROMPTS } from './models-prompts.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const AGENT = 'incident.models@web-summit.dinis', BUDGET = +(process.env.MODELS_BUDGET_USD || shareOf(AGENT) || 2)
const a = process.argv.slice(2), opt = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined }
const J = f => JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8'))
const ROSTER = J('models/evals/models.json').models
const TASKS = (opt('task') || 'warnings-in-force,extract-warning,extract-decision,label,translate').split(',')
const MODELS = opt('models') ? opt('models').split(',') : ROSTER.map(m => m.id)
const LIMIT = +(opt('limit') || 0), REDO = a.includes('--redo'), REPS = opt('repeats') ? +opt('repeats') : null
export const slug = id => id.replace(/[\/#]/g, '--')

const iso = (v, sec) => { if (v == null) return null; if (typeof v !== 'string' || !/(Z|[+-]\d\d:?\d\d)$/.test(v.trim())) return String(v) + ' (no zone)'; const d = new Date(v.trim().replace(/T(\d\d:\d\d)Z$/, 'T$1:00Z')); return isNaN(d) ? String(v) : d.toISOString().slice(0, sec ? 19 : 16) + 'Z' }
const low = v => typeof v === 'string' ? v.trim().toLowerCase() : v
const figs = t => (String(t).match(/\d+(?:[.,]\d+)?/g) || []).map(x => x.replace(',', '.')).sort()
const UNIT = { 'km/h': /km\/h/i, mm: /\bmm\b|millimet/i, hPa: /hPa/, metre: /met(re|er)s?\b|\d\s?m\b/i }
const wkey = w => w && typeof w === 'object' ? `${low(w.type)}|${low(w.level)}|${iso(w.end_utc, 1)}` : String(w)
const SCORE = {
    'extract-warning': (ans, it) => ({ type: low(ans.type) === it.gold.type, level: low(ans.level) === it.gold.level, area: typeof ans.area === 'string' && ans.area.trim() === it.gold.area, start_utc: iso(ans.start_utc, 1) === it.gold.start_utc, end_utc: iso(ans.end_utc, 1) === it.gold.end_utc }),
    'extract-decision': (ans, it) => ({ decider: low(ans.decider) === it.gold.decider, effect_from_utc: iso(ans.effect_from_utc) === it.gold.effect_from_utc, effect_to_utc: iso(ans.effect_to_utc) === it.gold.effect_to_utc }),
    'label': (ans, it) => ({ label: low(ans.label) === it.gold.label }),
    'translate': (ans, it) => ({ figures: typeof ans.en === 'string' && ans.en.trim() !== it.input.trim() && JSON.stringify(figs(ans.en)) === JSON.stringify(it.gold.figures.slice().sort()), units: typeof ans.en === 'string' && it.gold.units.every(u => UNIT[u].test(ans.en)) }),
    'warnings-in-force': (ans, it) => ({ in_force: Array.isArray(ans.in_force) && JSON.stringify(ans.in_force.map(wkey).sort()) === JSON.stringify(it.gold.in_force.map(wkey).sort()) }),
}
const KEYS = { 'extract-warning': ['type', 'level', 'area', 'start_utc', 'end_utc'], 'extract-decision': ['decider', 'effect_from_utc', 'effect_to_utc'], 'label': ['label'], 'translate': ['en'], 'warnings-in-force': ['in_force'] }
function parse(text) {
    if (!text) return null
    const t = text.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```(?:json)?/g, ''), i = t.indexOf('{'), j = t.lastIndexOf('}')
    if (i < 0 || j <= i) return null
    try { const o = JSON.parse(t.slice(i, j + 1)); return o && typeof o === 'object' && !Array.isArray(o) ? o : null } catch { return null }
}
const REFUSAL = /\b(I\s*(?:can(?:'|no)t|am unable|won't)|I'm sorry|cannot (?:help|assist|comply))/i
async function pool(jobs, n) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < jobs.length) await jobs[i++]() })) }

let stop = false
async function one(task, doc, M, it) {
    // each row at the settings its roster line gives (extra), 4,000 tokens of room, temperature 0 where it is taken
    const { text, line, response } = await call({ task: `WS-214/eval/${task}`, agent: AGENT, model: M.id.split('#')[0], messages: PROMPTS[task](it, doc), max_tokens: 4000, budget_usd: BUDGET, extra: { temperature: 0, ...(M.extra || {}) } })
    const cut = response?.choices?.[0]?.finish_reason === 'length', ans = parse(text), okKeys = ans && KEYS[task].every(k => k in ans)
    const kind = line.status !== 'ok' ? (line.status.startsWith('refused') ? 'not_run' : 'error') : okKeys ? 'answered' : cut ? 'cut_off' : (text && !ans && REFUSAL.test(text)) ? 'refused' : 'malformed'
    const fields = kind === 'answered' ? SCORE[task](ans, it) : Object.fromEntries(doc.fields.map(f => [f, false]))
    if (kind === 'not_run') { stop = true; console.error(`stopped: ${line.status} (${AGENT} at ${spentBy(AGENT).toFixed(3)} of ${BUDGET} USD)`) }
    return { kind, right: kind === 'answered' && Object.values(fields).every(Boolean), fields, answer: okKeys ? Object.fromEntries(Object.entries(ans).slice(0, 8).map(([k, v]) => [k, typeof v === 'string' ? v.slice(0, 900) : v])) : null,
        ...(kind === 'malformed' || kind === 'refused' ? { said: String(text || '').slice(0, 200) } : {}), ...(line.error ? { error: line.error.slice(0, 160) } : {}),
        model_served: line.model_served, cost_usd: line.cost_usd, latency_ms: line.latency_ms, tokens_in: line.tokens_in, tokens_out: line.tokens_out, reasoning_tokens: response?.usage?.completion_tokens_details?.reasoning_tokens ?? null, at: line.at, raw_sha256: line.raw_sha256 || null }
}
for (const task of TASKS) {
    const doc = J(`models/evals/${task}/items.json`), dir = path.join(REPO, 'models/evals', task, 'results'); fs.mkdirSync(dir, { recursive: true })
    const items = LIMIT ? doc.items.slice(0, LIMIT) : doc.items
    await pool(MODELS.map(id => async () => {
        const M = ROSTER.find(m => m.id === id); if (!M) { console.error('not in the roster: ' + id); return }
        const file = path.join(dir, slug(id) + '.json'), reps = REPS || M.repeats || 1
        let res; try { res = JSON.parse(fs.readFileSync(file, 'utf8')) } catch { res = { answers: {}, repeats: {} } }
        res.repeats = res.repeats || {}
        const jobs = []
        for (const it of items) {
            if (REDO || !res.answers[it.id] || ['error', 'not_run'].includes(res.answers[it.id].kind)) jobs.push(async () => { if (!stop) res.answers[it.id] = await one(task, doc, M, it) })
            const have = REDO ? 0 : (res.repeats[it.id] || []).length; if (REDO) res.repeats[it.id] = []
            for (let n = have; n < reps - 1; n++) jobs.push(async () => { if (stop) return; const r = await one(task, doc, M, it); if (r.kind === 'not_run') return
                const first = res.answers[it.id]; (res.repeats[it.id] = res.repeats[it.id] || []).push({ kind: r.kind, right: r.right, same_answer: !!first && JSON.stringify(first.answer) === JSON.stringify(r.answer), cost_usd: r.cost_usd, latency_ms: r.latency_ms, tokens_in: r.tokens_in, tokens_out: r.tokens_out, raw_sha256: r.raw_sha256 }) })
        }
        await pool(jobs, 5)
        for (const k of Object.keys(res.answers)) if (res.answers[k].kind === 'not_run') delete res.answers[k]
        const A = Object.values(res.answers), runs = A.length + Object.values(res.repeats).reduce((s, x) => s + x.length, 0), right = A.filter(x => x.right).length + Object.values(res.repeats).reduce((s, x) => s + x.filter(y => y.right).length, 0)
        fs.writeFileSync(file, JSON.stringify({ task, model: id, by: AGENT, updated: new Date().toISOString().slice(0, 19) + 'Z', about: 'One model\'s answers to one task: the first run of each item in full (as parsed; right or wrong per field), the repeat runs as right or wrong with their cost. Raw requests and responses are in the raw store; raw_sha256 names each record.', items_updated: doc.updated, answers: res.answers, repeats: res.repeats }, null, 1) + '\n')
        if (jobs.length) console.log(task, id, `${right}/${runs} runs right`, `(${jobs.length} new calls)`)
    }), 8)
}
console.log(`spent today by ${AGENT}: $${spentBy(AGENT).toFixed(4)} of ${BUDGET}`)
