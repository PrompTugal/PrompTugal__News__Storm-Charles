#!/usr/bin/env node
// Perplexity as a research tool, step 1: ask one of the team's open questions and keep what comes back as data
// (incident.perplexity@web-summit.dinis, 11 November 2026, WS-214; Dinis's direction of 02:50 UTC, BRIEF.md).
//
//   node tools/perplexity-ask.mjs --run 1 --id bridges-tunnels --model perplexity/sonar --lang en \
//        [--topic "…"] [--from "board/items/q-….json"] [--context low|medium|high] [--max-tokens 800] [--plain] "the question"
//
// Every call goes through tools/llm.mjs (the ledger and the raw store, both outside git). This desk's own share of the
// day is PERPLEXITY_CAP_USD (default 4): the wrapper refuses, and records the refusal, once this agent's lines reach it.
// What it writes:
//   - the answer's full text: only outside git (PERPLEXITY_WORK_DIR, default ~/.incident-perplexity/<date>/<run>-<k>.txt),
//     for the agent to read and split into statements. An engine's text (and the press it quotes) is not ours to publish.
//   - research/perplexity/runs/<date>/<run>.json (git): the question as asked, the model and settings, the addresses it
//     cited, cost, latency, the raw record's name and sha256, and `statements: []` for the agent to fill in its own words
//     after opening each address (tools/perplexity-check.mjs). An existing run file is merged, never overwritten.
// Addresses on social networks are kept as the host only: a post there may be a private person's (CLAUDE.md, People).
// Unlike the shadow desk (shadow/: the bare question a reader would ask), a research question carries a short brief:
// the date, and a request for the deciding body's own page. --plain asks without it.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AGENT = 'incident.perplexity@web-summit.dinis'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CAP = +(process.env.PERPLEXITY_CAP_USD || 4)
process.env.LLM_DAILY_CAP_USD = process.env.LLM_DAILY_CAP_USD || '20'   // the team's cap since 02:50 (BRIEF.md); read once by the wrapper
if (!process.env.OPEN_ROUTER_KEY && process.env.OPENROUTER_API_KEY) process.env.OPEN_ROUTER_KEY = process.env.OPENROUTER_API_KEY
const { call, spentBy } = await import('./llm.mjs')

const a = process.argv.slice(2), FL = ['run', 'id', 'model', 'lang', 'topic', 'from', 'context', 'max-tokens'], o = {}, rest = []
for (let i = 0; i < a.length; i++) { const k = a[i].replace(/^--/, ''); if (a[i].startsWith('--') && FL.includes(k)) o[k] = a[++i]; else if (a[i] === '--plain') o.plain = true; else rest.push(a[i]) }
const question = rest.join(' ')
if (!o.run || !o.id || !o.model || !o.lang || !question) { console.error('usage: perplexity-ask.mjs --run N --id slug --model M --lang pt|en [--topic T] [--from F] [--context low|medium|high] [--max-tokens N] [--plain] "question"'); process.exit(2) }

export const BRIEF = 'You are helping a newsroom check facts about Storm Charles (Portugal, 9 to 12 November 2026). Now: {now} UTC. Answer in short numbered points. For each point name who said it and when, and cite the page you read. Prefer the page of the body that decided or warned (a government, agency, operator or organiser site) over the press; if you found no such page, say so plainly. Do not guess.'
const now = new Date(), date = now.toISOString().slice(0, 10)
const system = o.plain ? null : BRIEF.replace('{now}', now.toISOString().slice(0, 16).replace('T', ' '))
const max_tokens = +(o['max-tokens'] || 800)
const extra = o.context ? { web_search_options: { search_context_size: o.context } } : {}

const SOCIAL = /(^|\.)(facebook|x|twitter|instagram|reddit|tiktok|linkedin|threads|youtube|youtu|t|bsky|telegram|whatsapp|mastodon)\.(com|net|be|me|app|co|social)$/
function cited(r, text = '') {   // every address the engine returned, in its order; used: its number appears in the answer as [n]
    const urls = []
    for (const u of r.citations || []) urls.push(typeof u === 'string' ? u : u.url)
    if (!urls.length) for (const s of r.search_results || []) urls.push(s.url)
    for (const c of r.choices || []) for (const n of c.message?.annotations || []) if (n.url_citation?.url) urls.push(n.url_citation.url)
    const nums = new Set([...text.matchAll(/\[(\d+)\]/g)].map(m => +m[1])), seen = new Set(), out = []
    for (let u of urls) {
        let host; try { const p = new URL(u); p.searchParams.delete('utm_source'); p.hash = ''; u = p.toString(); host = p.hostname.replace(/^www\./, '') } catch { continue }
        if (seen.has(u)) continue; seen.add(u)
        const n = out.length + 1, used = nums.size ? nums.has(n) : null
        out.push(SOCIAL.test(host) ? { n, host, used, withheld: 'a social network: the address is kept out (it may be a private person\'s post)' } : { n, host, used, url: u })
    }
    return out
}

const runFile = path.join(ROOT, 'research/perplexity/runs', date, `${o.run}.json`)
const run = fs.existsSync(runFile) ? JSON.parse(fs.readFileSync(runFile, 'utf8')) : {
    about: 'One research run: an open question of the incident team put to Perplexity (its Sonar models, through OpenRouter and tools/llm.mjs), the answer split into statements in our own words, and each statement checked by opening the address the engine cited. An engine\'s answer is evidence about the engine, not about the storm; nothing here is a fact until it is read at the body that decides or warns. The answers\' full text is not here (raw store, outside git: the raw name and sha256 point to it).',
    by: AGENT, date, n: +o.run, id: o.id, topic: o.topic || null, from: o.from ? [o.from] : [], updated: null, asks: [], addresses: {},
}
if (o.topic) run.topic = o.topic
if (o.from && !run.from.includes(o.from)) run.from.push(o.from)

const messages = [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: question }]
const { text, line, response } = await call({ task: `WS-214/perplexity/${o.id}`, agent: AGENT, model: o.model, messages, max_tokens, budget_usd: CAP, extra })
const k = run.asks.length + 1
const ask = {
    k, at: line.at, lang: o.lang, question, model: o.model, model_served: line.model_served || null,
    settings: { brief: o.plain ? 'none (the bare question)' : 'the research brief (tools/perplexity-ask.mjs, BRIEF) with the time of asking', max_tokens, search_context: o.context || 'the engine\'s default' },
    status: line.status, ...(line.error ? { error: line.error } : {}), cost_usd: line.cost_usd, tokens_in: line.tokens_in, tokens_out: line.tokens_out, latency_ms: line.latency_ms,
    raw: line.raw || null, raw_sha256: line.raw_sha256 || null, cited: response ? cited(response, text || '') : [], statements: [],
}
run.asks.push(ask); run.updated = new Date().toISOString().slice(0, 19) + 'Z'
fs.mkdirSync(path.dirname(runFile), { recursive: true }); fs.writeFileSync(runFile, JSON.stringify(run, null, 1) + '\n')
if (text) {
    const dir = path.join(process.env.PERPLEXITY_WORK_DIR || path.join(os.homedir(), '.incident-perplexity'), date); fs.mkdirSync(dir, { recursive: true, mode: 0o700 })
    fs.writeFileSync(path.join(dir, `${o.run}-${k}.txt`), `# run ${o.run} ask ${k} ${o.model} ${o.lang} ${line.at}\n# ${question}\n\n${text}\n\n` + ask.cited.map(c => `[${c.n}] ${c.url || c.host}`).join('\n') + '\n', { mode: 0o600 })
}
console.log(`run ${o.run} ask ${k}: ${line.status} ${o.model} ${o.lang} ${line.cost_usd} USD ${line.latency_ms} ms, ${ask.cited.length} addresses; mine today ${spentBy(AGENT).toFixed(4)} of ${CAP}`)
process.exit(line.status === 'ok' ? 0 : 1)
