#!/usr/bin/env node
// Perplexity as a research tool: the desk's day, counted (incident.perplexity@web-summit.dinis, WS-214).
//   node tools/perplexity-status.mjs     writes research/perplexity/ledger-summary.json from this session's ledger
// (tools/llm.mjs's summary: no prompt or answer text) and refreshes the figures in agents/perplexity/status.json
// (`updated`, `last_wake`, `figures`); the words in status.json (done, next, asks) are the agent's own and are kept.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { summary } from './llm.mjs'

const AGENT = 'incident.perplexity@web-summit.dinis'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), now = new Date().toISOString().slice(0, 19) + 'Z'
const w = (f, o) => fs.writeFileSync(path.join(ROOT, f), JSON.stringify(o, null, 1) + '\n')
const L = summary()
w('research/perplexity/ledger-summary.json', { about: 'This desk\'s model calls for the day, counted from its own ledger (tools/llm.mjs --summary): no prompt or answer text. For incident.models@ to add to models/ledger-summary.json and incident.accountant@ to count. The models named are the third-party models that were called.', by: AGENT, updated: now, currency: 'USD', ...L, cap_usd: 20, desk_plan_usd: 4 })
const sf = path.join(ROOT, 'agents/perplexity/status.json'), S = fs.existsSync(sf) ? JSON.parse(fs.readFileSync(sf, 'utf8')) : { agent: AGENT, by: AGENT }
const sc = JSON.parse(fs.readFileSync(path.join(ROOT, 'research/perplexity/scorecard.json'), 'utf8'))
const o = sc.overall
w('agents/perplexity/status.json', { ...S, updated: now, last_wake: now, figures: { runs: sc.runs, answers: o.asks, statements: o.statements, confirmed_at_primary: o.confirmed, press_only: o.press, unsupported: o.unsupported, wrong: o.wrong, said_found_none: o.none_found, addresses_returned: o.addresses, addresses_primary: o.addresses_primary, leads: sc.leads, spent_today_usd: +L.cost_usd.toFixed(4), calls_today: L.calls, calls_refused_today: Object.entries(L.by_status || {}).filter(([k]) => k !== 'ok').reduce((s, [, v]) => s + v.calls, 0) } })
console.log(`status and ledger summary written: ${L.calls} calls, ${L.cost_usd} USD`)
