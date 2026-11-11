#!/usr/bin/env node
// Run the evals (incident.models@web-summit.dinis, WS-214): every call through tools/llm.mjs, so each is stored and counted.
//   node tools/models-run.mjs [--task extract-warning,label] [--models id,id] [--limit N] [--redo]
// Reads models/evals/<task>/items.json and models/evals/models.json; writes models/evals/<task>/results.json (each model's
// parsed answer to each item, right or wrong per field, cost, latency). The raw request and response stay in the raw store.
// Stops when this agent's spend today reaches MODELS_BUDGET_USD (default 2), inside the team's daily cap.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { call, spentBy } from './llm.mjs'
import { PROMPTS } from './models-prompts.mjs'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const AGENT = 'incident.models@web-summit.dinis', BUDGET = +(process.env.MODELS_BUDGET_USD || 2)
const a = process.argv.slice(2), opt = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined }
const J = f => JSON.parse(fs.readFileSync(path.join(REPO, f), 'utf8'))
const ROSTER = J('models/evals/models.json').models
const TASKS = (opt('task') || 'extract-warning,extract-decision,label,translate').split(',')
const MODELS = opt('models') ? opt('models').split(',') : ROSTER.map(m => m.id)
const LIMIT = +(opt('limit') || 0), REDO = a.includes('--redo')

const iso = (v, sec) => { if (v == null) return null; if (typeof v !== 'string' || !/(Z|[+-]\d\d:?\d\d)$/.test(v.trim())) return String(v) + ' (no zone)'; const d = new Date(v.trim().replace(/T(\d\d:\d\d)Z$/, 'T$1:00Z')); return isNaN(d) ? String(v) : d.toISOString().slice(0, sec ? 19 : 16) + 'Z' }
const low = v => typeof v === 'string' ? v.trim().toLowerCase() : v
const figs = t => (String(t).match(/\d+(?:[.,]\d+)?/g) || []).map(x => x.replace(',', '.')).sort()
const UNIT = { 'km/h': /km\/h/i, mm: /\bmm\b|millimet/i, hPa: /hPa/, metre: /met(re|er)s?\b|\d\s?m\b/i }
export const SCORE = {
    'extract-warning': (ans, it) => ({ type: low(ans.type) === it.gold.type, level: low(ans.level) === it.gold.level, area: typeof ans.area === 'string' && ans.area.trim() === it.gold.area, start_utc: iso(ans.start_utc, 1) === it.gold.start_utc, end_utc: iso(ans.end_utc, 1) === it.gold.end_utc }),
    'extract-decision': (ans, it) => ({ decider: low(ans.decider) === it.gold.decider, effect_from_utc: iso(ans.effect_from_utc) === it.gold.effect_from_utc, effect_to_utc: iso(ans.effect_to_utc) === it.gold.effect_to_utc }),
    'label': (ans, it) => ({ label: low(ans.label) === it.gold.label }),
    'translate': (ans, it) => ({ figures: typeof ans.en === 'string' && ans.en.trim() !== it.input.trim() && JSON.stringify(figs(ans.en)) === JSON.stringify(it.gold.figures.slice().sort()), units: typeof ans.en === 'string' && it.gold.units.every(u => UNIT[u].test(ans.en)) }),
}
const KEYS = { 'extract-warning': ['type', 'level', 'area', 'start_utc', 'end_utc'], 'extract-decision': ['decider', 'effect_from_utc', 'effect_to_utc'], 'label': ['label'], 'translate': ['en'] }
function parse(text) {
    if (!text) return null
    const t = text.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/```(?:json)?/g, ''), i = t.indexOf('{'), j = t.lastIndexOf('}')
    if (i < 0 || j <= i) return null
    try { const o = JSON.parse(t.slice(i, j + 1)); return o && typeof o === 'object' && !Array.isArray(o) ? o : null } catch { return null }
}
const REFUSAL = /\b(I\s*(?:can(?:'|no)t|am unable|won't)|I'm sorry|cannot (?:help|assist|comply))/i

async function pool(jobs, n) { let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < jobs.length) await jobs[i++]() })) }

let stop = false
for (const task of TASKS) {
    const doc = J(`models/evals/${task}/items.json`), file = path.join(REPO, 'models/evals', task, 'results.json')
    let res; try { res = JSON.parse(fs.readFileSync(file, 'utf8')) } catch { res = { task, about: 'Each model\'s answer to each item, as parsed, marked right or wrong per field. Raw requests and responses are in the raw store, not here.', models: {} } }
    const items = LIMIT ? doc.items.slice(0, LIMIT) : doc.items
    await pool(MODELS.map(model => async () => {
        const M = res.models[model] = res.models[model] || { answers: {} }
        await pool(items.filter(it => REDO || !M.answers[it.id] || M.answers[it.id].kind === 'error').map(it => async () => {
            if (stop) return
            if (spentBy(AGENT) >= BUDGET) { stop = true; console.error(`stopped: ${AGENT} has spent its ${BUDGET} USD for today`); return }
            // each model at its own defaults (a model that reasons by default may reason); 4000 tokens of room, temperature 0 where it is taken
            const { text, line, response } = await call({ task: `WS-214/eval/${task}`, agent: AGENT, model: model.split('#')[0], messages: PROMPTS[task](it, doc), max_tokens: 4000, extra: { temperature: 0, ...(ROSTER.find(m => m.id === model)?.extra || {}) } })   // a roster id may carry a variant after '#', with its own extra settings
            const cut = response?.choices?.[0]?.finish_reason === 'length'
            const ans = parse(text), okKeys = ans && KEYS[task].every(k => k in ans)
            const kind = line.status !== 'ok' ? (line.status.startsWith('refused') ? 'not_run' : 'error') : okKeys ? 'answered' : cut ? 'cut_off' : (text && !ans && REFUSAL.test(text)) ? 'refused' : 'malformed'
            const fields = kind === 'answered' ? SCORE[task](ans, it) : Object.fromEntries(doc.fields.map(f => [f, false]))
            M.answers[it.id] = { kind, right: kind === 'answered' && Object.values(fields).every(Boolean), fields, answer: okKeys ? Object.fromEntries(Object.entries(ans).slice(0, 8).map(([k, v]) => [k, typeof v === 'string' ? v.slice(0, 600) : v])) : null,
                ...(kind === 'malformed' || kind === 'refused' ? { said: String(text || '').slice(0, 200) } : {}), ...(line.error ? { error: line.error.slice(0, 160) } : {}),
                model_served: line.model_served, cost_usd: line.cost_usd, latency_ms: line.latency_ms, tokens_in: line.tokens_in, tokens_out: line.tokens_out, at: line.at, raw: line.raw || null, raw_sha256: line.raw_sha256 || null }
            if (kind === 'not_run') stop = true
        }), 4)
        const A = Object.values(M.answers); console.log(task, model, `${A.filter(x => x.right).length}/${A.length} right`, `$${A.reduce((s, x) => s + (x.cost_usd || 0), 0).toFixed(5)}`)
    }), 5)
    res.by = AGENT; res.updated = new Date().toISOString().slice(0, 19) + 'Z'; res.items_updated = doc.updated
    fs.writeFileSync(file, JSON.stringify({ task: res.task, by: res.by, updated: res.updated, about: res.about, items_updated: res.items_updated, models: res.models }, null, 1) + '\n')
}
console.log(`spent today by ${AGENT}: $${spentBy(AGENT).toFixed(4)} of ${BUDGET}`)
