#!/usr/bin/env node
// Which of our agents runs at which altitude, on which runtime, at which I/O level, calling which model endpoints, under which
// key (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~22:00 UTC, BRIEF.md item 3, routed by
// incident.conductor@ at 22:02). The definitions are the fringe repository's: PrompTugal/PrompTugal__News__Fringe,
// docs/where-agents-run.md (§2 R1-R5, M1-M4, L0-L5; §3 A4-A0), read at its commit given in FRINGE below.
// Reads agents/policy.json (the agents and the paths each owns), data/keys.json (keys), models/budgets.json (model-call shares),
// tools/*.mjs (which import tools/llm.mjs), agents/<role>/ (what each says of itself) and, locally only, git log (the Agent:
// trailers). Writes library/altitudes.json. Not in the build (it reads git history): run it by hand after an agent is added.
//   node tools/library-altitudes.mjs [--at <ISO time>]
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = f => JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8'))
const at = process.argv.includes('--at') ? process.argv[process.argv.indexOf('--at') + 1] : new Date().toISOString().slice(0, 16) + 'Z'
const FRINGE = { repo: 'https://github.com/PrompTugal/PrompTugal__News__Fringe', file: 'docs/where-agents-run.md', commit: 'a8ee36eb8dc9ab580dc3a32c7ebb1d34f3c2f996', committed: '2026-11-11T21:56:20Z', status: 'draft v0.2, for Dinis and Angelo to correct', read: '2026-11-11T22:05Z' }
const policy = J('agents/policy.json').agents, keys = J('data/keys.json').keys, budgets = J('models/budgets.json').agents
const glob = g => new RegExp('^' + g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*') + '$')
const tools = fs.readdirSync(path.join(ROOT, 'tools')).filter(f => /\.(mjs|sh|py)$/.test(f)).map(f => 'tools/' + f)
const callsLlm = new Set(tools.filter(t => t !== 'tools/llm.mjs' && /(from\s+['"]\.\/llm\.mjs['"]|import\(\s*['"]\.\/llm\.mjs)/.test(fs.readFileSync(path.join(ROOT, t), 'utf8'))))
const read = p => { try { return fs.readFileSync(path.join(ROOT, p), 'utf8') } catch { return '' } }
let log = ''
try { log = execFileSync('git', ['log', '--since=2026-11-09', '--format=%cI%x09%(trailers:key=Agent,valueonly,separator=%x2C)%x09%s'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20 }) } catch { }
const commits = {}
for (const l of log.split('\n')) {   // by its Agent: trailer, or by the subject's '<agent>:' where an early commit has no trailer
    const [t, a = '', subj = ''] = l.split('\t'), who = new Set(a.split(',').map(s => s.trim()).filter(Boolean)), m = subj.match(/^(incident\.\w+@web-summit\.dinis):/)
    if (m) who.add(m[1])
    for (const x of who) { const c = commits[x] ||= { n: 0, last: t }; c.n++ }
}
const bridged = ['meteorologist', 'researcher', 'dev']   // tools/sync-from-websummit.sh copies their status files and data across
const out = []
for (const [agent, p] of Object.entries(policy)) {
    const role = p.role, owns = p.owns || []
    const own = tools.filter(t => owns.some(g => glob(g).test(t)))
    const mine = keys.filter(k => k.agent === agent)
    const active = mine.filter(k => k.status === 'active').map(k => k.id)
    const files = ['status.json', 'README.md', 'HANDOVER.md', 'handover.md'].map(f => read(`agents/${role}/${f}`)).join('\n')
    const vault = /\bvault/i.test(files), lane = /\blane/i.test(files)
    const c = commits[agent]
    const a1 = []
    if (budgets[agent]) a1.push({ what: `tools/llm.mjs calls (OpenRouter, M2): ${budgets[agent].for}`, share_usd_a_day: budgets[agent].usd, label: 'fact', from: 'models/budgets.json' })
    for (const t of own.filter(t => callsLlm.has(t))) a1.push({ what: `${t} calls tools/llm.mjs (M2)`, label: 'fact', from: t })
    if (role === 'models') a1.push({ what: 'tools/llm.mjs itself: the one wrapper every A1 call of the team goes through (ledger line, daily cap)', label: 'fact', from: 'tools/llm.mjs (owned by incident.models@ and incident.dev@ in agents/policy.json)' })
    const a0 = own.filter(t => !callsLlm.has(t) && t !== 'tools/llm.mjs')
    const io = bridged.includes(role)
        ? { level: 'L4, elsewhere', label: 'evidence', why: 'its session pushes to SGit-AI__Website__Web-Summit (team/incidents/); the conductor copies its data and status here with tools/sync-from-websummit.sh, so here its work arrives under the conductor\'s commits' }
        : c ? { level: vault || lane ? 'L5' : 'L4', label: vault || lane ? 'evidence' : 'fact', why: `${c.n} commits here by it (its Agent: trailer or its name in the subject) (the latest ${c.last.slice(0, 16)}Z), pushed to dev behind the gate${vault || lane ? `; its own files also speak of ${[vault && 'vaults', lane && 'lanes'].filter(Boolean).join(' and ')}, read as L5 (git, vaults, lanes, wakes)` : ''}` }
        : { level: 'not yet seen', label: 'evidence', why: 'no commit by it read here yet' }
    out.push({
        agent, role,
        altitude: { value: 'A3', label: 'fact', why: 'a loop with an environment: memory (agents/' + role + '/status.json), a wake, a reach beyond its sandbox (fringe §3)' },
        inside: {
            A2_loops: role === 'conductor'
                ? [{ what: 'none of its own named; it starts and wakes the other A3 sessions, which is the swarm\'s control plane (A4)', label: 'evidence' }]
                : [{ what: 'none named in its files; a sub-agent its session starts would be an A2 loop, and none is recorded in git', label: 'evidence' }],
            A1_calls: a1.length ? a1 : [{ what: 'no tools/llm.mjs call: its only model calls are its own session\'s (M1)', label: 'evidence', from: 'models/budgets.json has no share for it; no tool it owns imports tools/llm.mjs' }],
            A0_compute: a0.length ? a0 : []
        },
        runtime: { value: 'R1', label: 'evidence', why: 'Claude Code in the cloud: every session the conductor starts is a cloud session (session_... ids in the status files); the agent\'s own files do not name the runtime' },
        endpoints: [{ id: 'M1', label: 'evidence', why: 'its own session\'s model (not named here: CLAUDE.md)' }, ...(a1.some(x => /M2/.test(x.what)) ? [{ id: 'M2', label: 'fact', why: 'OpenRouter through tools/llm.mjs' }] : [])],
        io,
        account: { value: "Dinis Cruz's Claude account, through the conductor", label: 'evidence', why: bridged.includes(role) ? 'started before this repository, on the Web-Summit incident; the account is not stated in its files' : 'the conductor starts each session from Dinis\'s; no agent file states the account' },
        key: active.length ? { active, handed_over: mine.filter(k => k.status === 'handed over').length, label: 'fact', from: 'data/keys.json' } : { active: [], label: 'fact', why: 'no key in data/keys.json' + (bridged.includes(role) ? ' (its session cannot push here)' : '') }
    })
}
const swarms = [
    { id: 'A4-incident', what: "the incident team: incident.conductor@web-summit.dinis and the agents below, at Dinis Cruz's word", control_plane: 'incident.conductor@ (starts the sessions, sets each wake)', label: 'fact', from: 'CLAUDE.md, agents/JOBS.md' },
    { id: 'A4-newsroom', what: "Vicky Wang's newsroom desks (PrompTugal)", crossing: "we feed her desks material on her conductor's inbox or in commits addressed For: her agents; we read her public files and never write to them", label: 'fact', from: 'CLAUDE.md, "Whose it is"' },
    { id: 'A4-fringe', what: 'the fringe swarm (conductor.fringe@PrompTugal.dinis), PrompTugal/PrompTugal__News__Fringe', crossing: 'its definitions are read here (this file); nothing of ours is written there', label: 'evidence', from: FRINGE.repo }
]
const count = k => out.reduce((m, a) => (m[k(a)] = (m[k(a)] || 0) + 1, m), {})
const doc = {
    about: "Which of our agents does what in the fringe repository's definitions of where agents run: each agent's altitude (A3) with the A2 loops, A1 LLM calls and A0 compute it runs, its runtime (R1-R5), model endpoints (M1-M4), I/O level (L0-L5), account and key. Every item labelled: fact (read from the agent's own files or ours), evidence (read elsewhere, or inferred from what it does: the reason given). The definitions are the fringe's; the mapping is the librarian's. At Dinis's word, ~22:00 UTC, 11 November (BRIEF.md item 3).",
    by: 'incident.librarian@web-summit.dinis', updated: at, made_by: 'tools/library-altitudes.mjs',
    definitions: FRINGE,
    swarms,
    totals: { agents: out.length, io: count(a => a.io.level), calls_models_through_llm_mjs: out.filter(a => a.endpoints.some(e => e.id === 'M2')).map(a => a.agent), keyed: out.filter(a => a.key.active.length).length },
    agents: out
}
fs.writeFileSync(path.join(ROOT, 'library/altitudes.json'), JSON.stringify(doc, null, 1) + '\n')
console.log(`library-altitudes: ${out.length} agents; io ${JSON.stringify(doc.totals.io)}; M2 ${doc.totals.calls_models_through_llm_mjs.length}; keyed ${doc.totals.keyed}`)
