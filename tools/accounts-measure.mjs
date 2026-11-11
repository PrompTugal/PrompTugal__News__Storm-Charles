#!/usr/bin/env node
// What this agent's own session has used, in tokens, from its own transcript. Numbers only: no message text leaves the session.
// Kept by incident.accountant@web-summit.dinis (WS-214), adapted from WS-148's people/indi/accountant/measure.mjs in
// SGit-AI/SGit-AI__Website__Web-Summit (every agent measures its tokens; the accountant finds the savings).
//
//   The measure step, at the end of each wake (two lines):
//     AGENT=incident.<role>@web-summit.dinis node tools/accounts-measure.mjs --task "<what this wake did, one line>" --append
//     git add accounts/ledger && git commit -m "$AGENT: tokens measured" -m "Agent: $AGENT" -m "Issue: WS-214" -m "For: incident.accountant@web-summit.dinis"
//
// It reads ~/.claude/projects/*/<session>.jsonl (the newest, or $CLAUDE_TRANSCRIPT) and its subagents/*.jsonl, counts each
// API message once (by message id) and writes ONE line to accounts/ledger/<role>.jsonl. The line is the session's running
// total (cumulative from the session's first call): the accountant takes the latest line of each session, so running it
// every wake never counts a token twice. An agent can only measure its own session: the transcript is on its own machine.
// What a line holds: when, the agent, a short id of the session (a hash, not the session's address), the first and last
// call's times, calls, fresh input, output, cache writes, cache reads; the same by UTC hour; the context a call carried
// (first, median, largest, last); tool calls and the size of what they returned, by tool name, in characters; sub-agents.
// What it never holds: prompts, answers, tool inputs or outputs, file names, the name of the model the agent runs on.
//   --task "<line>"   what the wake did (the agent's own words; keep it to one line, no names of private people)
//   --since <ISO>     also report the window since that time (window: {...}); the totals stay cumulative
//   --quality pass|fail|n/a   the agent's own check of its wake (the gate printed OK, the round went out)
//   --append          add the line to accounts/ledger/<role>.jsonl (otherwise it is only printed)
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const a = process.argv.slice(2), arg = (k, d) => { const i = a.indexOf('--' + k); return i < 0 ? d : (a[i + 1] && !a[i + 1].startsWith('--') ? a[i + 1] : true) }
const agent = process.env.AGENT || arg('agent', '')
if (!/^incident\.[a-z0-9-]+@web-summit\.dinis$/.test(agent)) { console.error('accounts-measure: set AGENT to your name (incident.<role>@web-summit.dinis)'); process.exit(2) }
const role = agent.split('@')[0].split('.').slice(1).join('.')
const since = arg('since') && arg('since') !== true ? Date.parse(arg('since')) : 0
const root = path.join(os.homedir(), '.claude', 'projects')
const all = fs.existsSync(root) ? fs.readdirSync(root).flatMap(d => { const p = path.join(root, d); return fs.statSync(p).isDirectory() ? fs.readdirSync(p).filter(f => f.endsWith('.jsonl')).map(f => path.join(p, f)) : [] }) : []
const main = process.env.CLAUDE_TRANSCRIPT || all.sort((x, y) => fs.statSync(y).mtimeMs - fs.statSync(x).mtimeMs)[0]
if (!main || !fs.existsSync(main)) { console.error('accounts-measure: no transcript found under ' + root + ' (set CLAUDE_TRANSCRIPT)'); process.exit(2) }
const subdir = path.join(main.replace(/\.jsonl$/, ''), 'subagents')
const subs = fs.existsSync(subdir) ? fs.readdirSync(subdir).filter(f => f.endsWith('.jsonl')).map(f => path.join(subdir, f)) : []

const K = [['input_tokens', 'fresh_input'], ['output_tokens', 'output'], ['cache_creation_input_tokens', 'cache_writes'], ['cache_read_input_tokens', 'cache_reads']]
const zero = () => ({ calls: 0, fresh_input: 0, output: 0, cache_writes: 0, cache_reads: 0 })
const add = (t, u) => { t.calls++; for (const [k, n] of K) t[n] += u[k] || 0 }
const med = v => { if (!v.length) return 0; const s = v.slice().sort((x, y) => x - y); return s[Math.floor(s.length / 2)] }
const chars = c => typeof c === 'string' ? c.length : Array.isArray(c) ? c.reduce((s, b) => s + (typeof b === 'string' ? b.length : typeof b?.text === 'string' ? b.text.length : 0), 0) : 0

function tally(files, detail) {
    const seen = new Set(), t = zero(), win = zero(), hours = {}, ctx = [], tools = {}, names = new Map()
    let first = null, last = null, compactions = 0
    for (const f of files) for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
        if (!line) continue
        let e; try { e = JSON.parse(line) } catch { continue }
        const m = e && e.message
        if (e.type === 'summary' || e.isCompactSummary) compactions++
        if (detail && m && Array.isArray(m.content)) for (const b of m.content) {
            if (b.type === 'tool_use' && !names.has(b.id)) { names.set(b.id, b.name); (tools[b.name] = tools[b.name] || { calls: 0, returned_chars: 0 }).calls++ }
            else if (b.type === 'tool_result' && names.has(b.tool_use_id)) { tools[names.get(b.tool_use_id)].returned_chars += chars(b.content); names.set(b.tool_use_id + '#done', 1) }
        }
        const u = m && m.usage; if (!u || !m.id || seen.has(m.id)) continue
        seen.add(m.id); add(t, u)
        const at = e.timestamp || null
        if (at) { if (!first || at < first) first = at; if (!last || at > last) last = at; const h = at.slice(0, 13); add(hours[h] = hours[h] || zero(), u); if (since && Date.parse(at) >= since) add(win, u) }
        ctx.push((u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0))
    }
    const out = { ...t, first_call: first, last_call: last }
    if (detail) {
        out.context_per_call = { first: ctx[0] || 0, median: med(ctx), largest: ctx.length ? Math.max(...ctx) : 0, last: ctx.at(-1) || 0 }
        out.compactions = compactions
        out.by_hour = Object.fromEntries(Object.keys(hours).sort().map(h => [h + ':00Z', hours[h]]))
        // tool names of our own harness only; a connector's tools are counted together (their names can say what was connected)
        const grouped = {}; for (const [n, v] of Object.entries(tools)) { const k = n.startsWith('mcp__') ? 'connector tools' : n; grouped[k] = grouped[k] || { calls: 0, returned_chars: 0 }; grouped[k].calls += v.calls; grouped[k].returned_chars += v.returned_chars }
        out.tools = Object.fromEntries(Object.entries(grouped).sort((x, y) => y[1].returned_chars - x[1].returned_chars))
        if (since) out.window = { since: new Date(since).toISOString().slice(0, 19) + 'Z', ...win }
    }
    return out
}

const clean = s => String(s || '').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '[session]').replace(/[\r\n]+/g, ' ').slice(0, 160)
const row = {
    at: new Date().toISOString().slice(0, 19) + 'Z', agent, role,
    session: 's-' + crypto.createHash('sha256').update(path.basename(main)).digest('hex').slice(0, 12),
    task: arg('task') && arg('task') !== true ? clean(arg('task')) : null,
    quality: ['pass', 'fail', 'n/a'].includes(arg('quality')) ? arg('quality') : 'n/a',
    how: 'measured: this session\'s own transcript, each API message once (tools/accounts-measure.mjs)',
    totals: tally([main], true),
    subagents: { count: subs.length, ...tally(subs, false), each: subs.map(f => { const t = tally([f], true); return { calls: t.calls, fresh_input: t.fresh_input, output: t.output, cache_writes: t.cache_writes, cache_reads: t.cache_reads, context_per_call: t.context_per_call, first_call: t.first_call, last_call: t.last_call } }).sort((x, y) => String(x.first_call).localeCompare(String(y.first_call))) },
}
const line = JSON.stringify(row)
if (arg('append')) {
    const dir = path.join(ROOT, 'accounts', 'ledger'); fs.mkdirSync(dir, { recursive: true })
    fs.appendFileSync(path.join(dir, role + '.jsonl'), line + '\n')
}
console.log(line)
