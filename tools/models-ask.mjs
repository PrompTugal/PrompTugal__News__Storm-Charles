#!/usr/bin/env node
// Ask a model one question through the ledger (incident.models@web-summit.dinis, WS-214): the call other desks use,
// first incident.shadow@ for answer engines with search. Every call is stored raw (outside git) and counted.
//   node tools/models-ask.mjs --agent incident.shadow@web-summit.dinis --task WS-214/shadow/<slug> --model perplexity/sonar \
//        [--system "…"] [--budget 0.50] [--max-tokens 1200] [--out /path/outside/the/repository/answer.json] "the question"
// Prints (or writes) { at, model, model_served, question, answer, citations: [url], search_results: [{title,url,date}], cost_usd,
// tokens, latency_ms, status, raw, raw_sha256 }. The answer is the engine's text: evidence about what the engine says, never a
// fact about the storm. Keep press text out of git: quote an answer in short excerpts, and keep the whole in a vault.
// As a module: import { ask } from './models-ask.mjs'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { call, spentBy } from './llm.mjs'

export async function ask({ agent, task, model, question, system = null, budget_usd = null, max_tokens = 1200, extra = {} }) {
    const messages = [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: question }]
    const { text, line, response } = await call({ task, agent, model, messages, max_tokens, budget_usd, extra })
    const ann = (response?.choices?.[0]?.message?.annotations || []).filter(x => x.type === 'url_citation').map(x => x.url_citation?.url).filter(Boolean)
    return { at: line.at, model, model_served: line.model_served || null, question, answer: text, citations: [...new Set([...(response?.citations || []), ...ann])],
        search_results: (response?.search_results || []).map(r => ({ title: r.title, url: r.url, date: r.date || null })), cost_usd: line.cost_usd, tokens_in: line.tokens_in, tokens_out: line.tokens_out,
        latency_ms: line.latency_ms, status: line.status, ...(line.error ? { error: line.error } : {}), raw: line.raw || null, raw_sha256: line.raw_sha256 || null, spent_today_by_agent_usd: +spentBy(agent).toFixed(6) }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const a = process.argv.slice(2), flags = ['agent', 'task', 'model', 'system', 'budget', 'max-tokens', 'out'], o = {}, rest = []
    for (let i = 0; i < a.length; i++) { const k = a[i].replace(/^--/, ''); if (a[i].startsWith('--') && flags.includes(k)) o[k] = a[++i]; else rest.push(a[i]) }
    if (!o.agent || !o.task || !o.model || !rest.length) { console.error('usage: models-ask.mjs --agent A --task T --model M [--system S] [--budget USD] [--max-tokens N] [--out FILE] "question"'); process.exit(2) }
    const r = await ask({ agent: o.agent, task: o.task, model: o.model, question: rest.join(' '), system: o.system || null, budget_usd: o.budget ? +o.budget : null, max_tokens: +(o['max-tokens'] || 1200) })
    const body = JSON.stringify(r, null, 1) + '\n'
    if (o.out) fs.writeFileSync(o.out, body); else process.stdout.write(body)
    process.exit(r.status === 'ok' ? 0 : 1)
}
