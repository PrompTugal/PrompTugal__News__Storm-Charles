#!/usr/bin/env node
// The model ledger, as counts: this machine's ledger (tools/llm.mjs writes one line per model call to INCIDENT_LEDGER_DIR,
// default ~/.incident-ledger, never git) -> data/agents/ledger/<role>.json. Kept by incident.observability@web-summit.dinis.
//   AGENT=<your name> node tools/agents-ledger.mjs      then commit the file with your work
// Each agent runs it in its own session after making model calls: the ledger lives on the machine that made them.
// What is published: per day and task, the number of calls (ok, failed, refused by the cap), tokens in and out, the cost
// the provider reported, the median latency, and the day's cap. What is not: model names (this estate keeps them out of what
// it pushes), prompts, answers, raw record names. Those stay in the ledger and the raw store.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = process.env.INCIDENT_LEDGER_DIR || path.join(os.homedir(), '.incident-ledger')
const agent = process.env.AGENT || ''
if (!/^[a-z]+\.[a-z0-9-]+@[a-z0-9.-]+$/i.test(agent)) { console.log('agents-ledger: set AGENT to your name (incident.<role>@web-summit.dinis)'); process.exit(2) }
const role = agent.split('@')[0].split('.').slice(1).join('.')
const clean = s => String(s || '').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '[session]').slice(0, 80)
const med = a => { if (!a.length) return 0; const s = a.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }
const days = []
for (const f of fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => /^\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)).sort() : []) {
    const lines = fs.readFileSync(path.join(DIR, f), 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l) } catch { return null } }).filter(l => l && (!l.agent || l.agent === agent))
    if (!lines.length) continue
    const tasks = new Map()
    for (const l of lines) {
        const t = tasks.get(clean(l.task)) || { task: clean(l.task), calls: 0, ok: 0, failed: 0, refused_by_cap: 0, mock: 0, tokens_in: 0, tokens_out: 0, cost_usd: 0, lat: [], first: l.at, last: l.at }
        t.calls++; l.status === 'ok' ? t.ok++ : l.status === 'refused_cap' ? t.refused_by_cap++ : t.failed++; if (l.provider === 'mock') t.mock++
        t.tokens_in += l.tokens_in || 0; t.tokens_out += l.tokens_out || 0; t.cost_usd += l.cost_usd || 0; if (l.latency_ms) t.lat.push(l.latency_ms)
        if (l.at < t.first) t.first = l.at; if (l.at > t.last) t.last = l.at; tasks.set(t.task, t)
    }
    const T = [...tasks.values()].map(({ lat, ...t }) => ({ ...t, cost_usd: +t.cost_usd.toFixed(6), median_latency_ms: med(lat) }))
    const sum = k => T.reduce((s, t) => s + t[k], 0)
    days.push({ day: f.slice(0, 10), calls: sum('calls'), ok: sum('ok'), failed: sum('failed'), refused_by_cap: sum('refused_by_cap'), mock: sum('mock'), tokens_in: sum('tokens_in'), tokens_out: sum('tokens_out'), cost_usd: +sum('cost_usd').toFixed(6), cap_usd: lines.at(-1).cap_usd ?? null, tasks: T })
}
const out = path.join(ROOT, 'data/agents/ledger', role + '.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify({
    about: 'Model calls made by this agent through tools/llm.mjs, as counts per day and task. No model names, prompts or answers: those stay in the ledger and the raw store, outside git. Written by tools/agents-ledger.mjs on the machine that made the calls.',
    by: agent, agent, updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), days
}, null, 1) + '\n')
console.log(`agents-ledger: ${days.reduce((s, d) => s + d.calls, 0)} calls over ${days.length} day(s) -> data/agents/ledger/${role}.json`)
