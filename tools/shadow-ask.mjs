#!/usr/bin/env node
// Shadow reporting, step 1: ask the answer engines what a reader would ask, and keep what they say as data
// (incident.shadow@web-summit.dinis, 11 November 2026, WS-214; Dinis's direction of ~02:20 UTC, BRIEF.md).
//
//   OPEN_ROUTER_KEY=... node tools/shadow-ask.mjs [--set fixed|zoom|all] [--engine id[,id]] [--only q-id[,q-id]] [--hour HH] [--dry]
//
// Every call goes through tools/llm.mjs (the ledger and the raw store, both outside git; the daily cap). This tool sets
// its own lower cap for the day (SHADOW_CAP_USD, default 1) and stops before a round that would pass it.
// What it writes:
//   - the answers' full text: only to the work folder outside git (SHADOW_WORK_DIR, default ~/.incident-shadow/<date>/<hour>.answers.json),
//     for the agent to read and split into statements. An engine's text is not ours to publish.
//   - shadow/runs/<date>/<hour>.json (git): per answer the question, the time, the engine, the addresses it cited, the cost,
//     the raw record's name and sha256, and `statements: []` for the agent to fill (our own words, short quoted fragments only).
//     An existing run file is merged, never overwritten: answers already there (and their statements) stay.
// Addresses on social networks are kept as the host only: a post there may be a private person's (CLAUDE.md, People).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AGENT = 'incident.shadow@web-summit.dinis'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CAP = +(process.env.SHADOW_CAP_USD || 1)
process.env.LLM_DAILY_CAP_USD = String(CAP)   // before the wrapper is loaded: it reads the cap once
if (!process.env.OPEN_ROUTER_KEY && process.env.OPENROUTER_API_KEY) process.env.OPEN_ROUTER_KEY = process.env.OPENROUTER_API_KEY
const { call, spentToday } = await import('./llm.mjs')

const a = process.argv.slice(2), opt = k => { const i = a.indexOf('--' + k); return i >= 0 ? a[i + 1] : undefined }, has = k => a.includes('--' + k)
const Q = JSON.parse(fs.readFileSync(path.join(ROOT, 'shadow/questions.json'), 'utf8'))
const now = new Date(), date = now.toISOString().slice(0, 10), hour = opt('hour') || now.toISOString().slice(11, 13)
const set = opt('set') || 'fixed'
const only = opt('only') ? opt('only').split(',') : null
const engines = Q.engines.filter(e => opt('engine') ? opt('engine').split(',').includes(e.id) : e.sets.includes(set) || set === 'all')
const questions = Q.questions.filter(q => (set === 'all' || q.set === set) && (!only || only.includes(q.id)))

const SOCIAL = /(^|\.)(facebook|x|twitter|instagram|reddit|tiktok|linkedin|threads|youtube|youtu|t|bsky|telegram|whatsapp)\.(com|net|be|me|app|co)$/
const RAW_DIR = process.env.INCIDENT_RAW_DIR || path.join(os.homedir(), '.incident-raw')
const WORK = process.env.SHADOW_WORK_DIR || path.join(os.homedir(), '.incident-shadow')

function cited(raw, text = '') {   // every address the engine returned as a source, in its order; used: its number appears in the answer ([n]) or it is an inline annotation
    const r = raw.response || {}, urls = []
    for (const u of r.citations || []) urls.push({ u: typeof u === 'string' ? u : u.url })
    if (!urls.length) for (const s of r.search_results || []) urls.push({ u: s.url })
    const numbered = urls.length > 0, nums = new Set([...text.matchAll(/\[(\d+)\]/g)].map(m => +m[1]))
    for (const c of r.choices || []) for (const n of c.message?.annotations || []) if (n.url_citation?.url) urls.push({ u: n.url_citation.url, inline: true })
    const seen = new Set(), out = []
    urls.forEach(({ u, inline }, i) => {
        let host; try { const p = new URL(u); p.searchParams.delete('utm_source'); p.hash = ''; u = p.toString(); host = p.hostname.replace(/^www\./, '') } catch { return }
        if (!u || seen.has(u)) return; seen.add(u)
        const used = nums.size ? nums.has(i + 1) : inline ? true : null   // an engine that numbers its sources ([n]) names the ones it used; otherwise an inline annotation is a use
        out.push(SOCIAL.test(host) ? { n: i + 1, host, used, withheld: 'a social network: the address is kept out (it may be a private person\'s post)' } : { n: i + 1, host, used, url: u })
    })
    return out
}

const runFile = path.join(ROOT, 'shadow/runs', date, `${hour}.json`)
const run = fs.existsSync(runFile) ? JSON.parse(fs.readFileSync(runFile, 'utf8')) : {
    about: 'One hour of shadow reporting: what answer engines told a reader, split into checkable statements in our own words and compared with this site\'s record. An engine\'s answer is evidence about the engine, not about the storm. The answers\' full text is not here (raw store, outside git: the pointer and sha256 are).',
    by: AGENT, date, hour_utc: hour, updated: null, answers: [],
}
const workFile = path.join(WORK, date, `${hour}.answers.json`)
const work = fs.existsSync(workFile) ? JSON.parse(fs.readFileSync(workFile, 'utf8')) : {}

const est = engines.reduce((s, e) => s + e.est_usd * questions.reduce((n, q) => n + q.ask.filter(x => e.langs.includes(x.lang)).length, 0), 0)
const before = spentToday()
console.error(`shadow-ask: ${date} ${hour}h, set ${set}: ${questions.length} questions, engines ${engines.map(e => e.id).join(', ')}; spent today ${before.toFixed(4)} USD, this round about ${est.toFixed(3)}, cap ${CAP}`)
if (before + est > CAP) { console.error('shadow-ask: this round would pass the day\'s cap; not asked'); process.exit(3) }
if (has('dry')) process.exit(0)

const jobs = []
for (const e of engines) for (const q of questions) for (const x of q.ask) if (e.langs.includes(x.lang)) jobs.push({ e, q, x })
const errors = []
let paused = false
async function one({ e, q, x }) {
    const id = `${q.id}.${x.lang}.${e.id}`
    if (run.answers.some(r => r.id === id)) return
    if (paused) return   // the account is out of credit (HTTP 402): stop at the first, ask nothing more this hour
    const { text, line } = await call({ task: 'WS-214/shadow', agent: AGENT, model: e.model, max_tokens: e.max_tokens || 700, messages: [{ role: 'user', content: x.text }], extra: e.extra || {} })
    if (line.status === 'refused_budget' || line.status === 'refused_cap') { paused = true; run.paused = `paused: the desk's share of the day's model budget is spent (${line.status}, ${line.spent_by_agent_usd ?? line.spent_today_usd} of ${line.budget_usd ?? line.cap_usd} US dollars at ${line.at}); nothing asked`; errors.push(`${id}: ${line.status}`); return }
    if (line.status === 'http_402' || /out_of_credit/.test(line.status)) { paused = true; run.paused = 'paused: account out of credit (HTTP 402 at ' + line.at + ')'; errors.push(`${id}: ${line.status}`); return }
    if (line.status !== 'ok' || !text) { errors.push(`${id}: ${line.status} ${line.error || ''}`); run.answers.push({ id, question: q.id, lang: x.lang, asked: x.text, engine: e.id, engine_name: e.name, model_asked: e.model, at: line.at, status: line.status, error: line.error || null, cost_usd: line.cost_usd, raw: line.raw, raw_sha256: line.raw_sha256, cited: [], statements: [] }); return }
    const raw = JSON.parse(fs.readFileSync(path.join(RAW_DIR, line.raw), 'utf8'))
    work[id] = { asked: x.text, engine: e.id, at: line.at, text, cited: cited(raw, text) }
    run.answers.push({ id, question: q.id, lang: x.lang, asked: x.text, engine: e.id, engine_name: e.name, model_asked: e.model, model_served: line.model_served, at: line.at, status: 'ok', cost_usd: line.cost_usd, answer_chars: text.length, raw: line.raw, raw_sha256: line.raw_sha256, cited: cited(raw, text), statements: [] })
}
if (jobs.length) { await one(jobs[0]); jobs.shift() }   // one first: a refusal for credit shows before the rest are sent
for (let i = 0; i < jobs.length && !paused; i += 4) await Promise.all(jobs.slice(i, i + 4).map(one))   // four at a time

run.updated = new Date().toISOString().slice(0, 19) + 'Z'
run.spent_usd = +run.answers.reduce((s, r) => s + (r.cost_usd || 0), 0).toFixed(5)
run.answers.sort((x, y) => x.id < y.id ? -1 : 1)
fs.mkdirSync(path.dirname(runFile), { recursive: true }); fs.writeFileSync(runFile, JSON.stringify(run, null, 1) + '\n')
fs.mkdirSync(path.dirname(workFile), { recursive: true, mode: 0o700 }); fs.writeFileSync(workFile, JSON.stringify(work, null, 1) + '\n', { mode: 0o600 })
console.error(`shadow-ask: ${run.answers.length} answers in ${path.relative(ROOT, runFile)}; this hour ${run.spent_usd} USD; today ${spentToday().toFixed(4)} of ${CAP}`)
for (const e of errors) console.error('  ERROR ' + e)
console.error(`  the answers to read and split: ${workFile}`)
