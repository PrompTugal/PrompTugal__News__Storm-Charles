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
const FRINGE = { section_3_unchanged_at: '3256d3cafa8200a9ff5b46443400732fc474e0e5 (2026-11-11T22:05:57Z, read 22:09Z)', repo: 'https://github.com/PrompTugal/PrompTugal__News__Fringe', file: 'docs/where-agents-run.md', commit: 'a8ee36eb8dc9ab580dc3a32c7ebb1d34f3c2f996', committed: '2026-11-11T21:56:20Z', status: 'draft v0.2, for Dinis and Angelo to correct', read: '2026-11-11T22:05Z' }
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
// Dinis, ~22:05 and ~22:10 UTC (BRIEF.md; the conductor's first pass, agents/conductor/COMPUTE.md §1): for every A0 and A1 unit,
// where it runs, the grant it inherits there, the untrusted input it touches, and crosses: true where the grant's altitude is above
// the mandate's (fringe §3: "the grant's altitude must not be above the mandate's"). The grant's altitude: A4 if it may start or
// schedule other sessions; A3 if it holds a durable reach beyond its sandbox (push, vault keys, an agent's key); A1 if a model key
// only; A0 if nothing beyond the code. Read from the code (static), the workflow and the agents' own files.
const RANK = { A0: 0, A1: 1, A2: 2, A3: 3, A4: 4 }
const gens = J('admin/build/generators.json'), genSet = new Set([...(gens.before || []), ...(gens.after || [])])
const wf = read('.github/workflows/deploy.yml')
const ciRuns = new Set([...wf.matchAll(/node (tools\/[\w.-]+)/g)].map(m => m[1]))
const jobsText = wf.split(/^jobs:\s*$/m)[1] || ''
const ciJobs = {}   // per job: its permissions, whether it checks out (and keeps the token), whether it runs repository code
for (const part of jobsText.split(/^(?=  [\w-]+:\s*$)/m)) {
    const name = (part.match(/^  ([\w-]+):\s*$/m) || [])[1]; if (!name) continue
    ciJobs[name] = { permissions: Object.fromEntries([...part.matchAll(/^\s{6}(contents|pages|id-token|actions|packages): (\w+)/gm)].map(m => [m[1], m[2]])),
        checkout: /actions\/checkout/.test(part), keeps_token: /actions\/checkout/.test(part) && !/persist-credentials:\s*false/.test(part), runs_repo_code: /actions\/checkout/.test(part) }
}
const ciJobAltitude = j => { const p = j.permissions; return Object.entries(p).some(([k, v]) => v === 'write') ? 'A3' : 'A0' }
const buildJob = Object.keys(ciJobs).find(n => /node admin\/build\/validate\.mjs/.test(jobsText.split(/^(?=  [\w-]+:\s*$)/m).find(p => p.startsWith(`  ${n}:`)) || '')) || 'build'
const GRANTS = {
    session: { altitude: 'A4', label: 'fact for the librarian\'s own session (read at ' + at + '); evidence for the others (the same cloud environment, sessions started the same way)',
        holds: ['push to dev (the session\'s git credentials; admin/tools/release.sh)', 'the agent\'s private session key (~/.sg-send/keys, outside git)', 'every vault key the agent made or was given (outside git)',
            'the environment\'s credentials: the OpenRouter key (under two names), a GitHub token, an SG/Send token and cloud-provider credentials (names read, never values)',
            'the right to message other sessions, start sessions and set scheduled wakes (the session-control tools of Claude Code in the cloud); changes to the environment with the owner\'s approval'] },
    ci: { label: 'fact', from: '.github/workflows/deploy.yml (read per job)', build_job: buildJob,
        jobs: Object.fromEntries(Object.entries(ciJobs).map(([n, j]) => [n, { ...j, altitude: ciJobAltitude(j),
            why: ciJobAltitude(j) === 'A3' ? `A3 in part: a durable write beyond the runner (${Object.entries(j.permissions).filter(([, v]) => v === 'write').map(([k]) => k).join(', ')}), but no session control, no memory, no agent key${j.runs_repo_code ? '; and it runs repository code' : '; it runs no repository code'}`
                : `A0: ${Object.keys(j.permissions).length ? Object.entries(j.permissions).map(([k, v]) => k + ': ' + v).join(', ') : 'the workflow\'s default (contents: read)'}${j.keeps_token ? ', but checkout keeps the token in .git/config' : j.checkout ? '; checkout keeps no credential (persist-credentials: false)' : ''}` }])),
        secrets: /secrets\./.test(wf) ? 'the workflow names secrets' : 'no agent key, no vault key, no model key (no secrets.* in the workflow)' }
}
const ciAlt = () => (GRANTS.ci.jobs[buildJob] || {}).altitude || 'A3'
const toolUnit = (t, agentGrant) => {
    const src = read(t), head = src.split('\n').slice(0, 12).join('\n')
    const mandate = /\ban A2 loop\b/.test(head) ? 'A2' : callsLlm.has(t) ? 'A1' : 'A0'
    const where = []
    if (genSet.has(t)) where.push({ at: 'the session of every agent that pushes: admin/tools/release.sh runs the gate, which runs the build and its generators', grant: 'session (the pushing agent\'s)', altitude: 'A4' }, { at: `CI (GitHub Actions), the ${buildJob} job, every push`, grant: `ci.jobs.${buildJob}`, altitude: ciAlt() })
    else if (ciRuns.has(t)) where.push({ at: `CI (GitHub Actions), the ${buildJob} job`, grant: `ci.jobs.${buildJob}`, altitude: ciAlt() }, { at: 'its agent\'s session when it tests it', grant: 'session', altitude: agentGrant })
    else where.push({ at: /\b(poll|loop)\b/i.test(head) && /\.sh$/.test(t) ? 'a background loop in its agent\'s session' : 'its agent\'s session (by hand or on its wake)', grant: 'session', altitude: agentGrant })
    const hosts = [...new Set([...src.matchAll(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi)].map(m => m[1].toLowerCase()))].filter(h => !/(^|\.)w3\.org$|^schema\.org$|^json-schema\.org$|^example\.(com|org)$/.test(h))
    const ours = hosts.filter(h => /promptugal\.news$|sgit\.ai$|sgraph\.ai$/.test(h)), outside = hosts.filter(h => !ours.includes(h))
    const net = /\bfetch\(|https?\.(get|request)\(|\bcurl\b|\bwget\b/.test(src)
    const untrusted = []
    if (/playwright|chromium|puppeteer/i.test(src)) untrusted.push('a headless browser (Chromium): runs the scripts of the pages it opens')
    if (net && outside.length) untrusted.push('outside hosts: ' + outside.slice(0, 6).join(', ') + (outside.length > 6 ? ` and ${outside.length - 6} more` : ''))
    else if (net) untrusted.push('the network (hosts given at run time or from data files)')
    if (ours.length) untrusted.push('our own services: ' + ours.join(', '))
    if (/\blane/.test(t) && /drain|open|unseal/i.test(src) || /desk-drain|agents-views/.test(t)) untrusted.push('sealed messages from the public lanes, opened here (visitors\' words or events)')
    if (/\bsgit\b|sg-vault/.test(src)) untrusted.push('vault contents')
    if (mandate !== 'A0') untrusted.push('model answers (untrusted text), and prompts built from collected material')
    if (!untrusted.length) untrusted.push('the repository\'s files only (some written from web reads: untrusted at one remove)')
    for (const w of where) w.crosses = RANK[w.altitude] > RANK[mandate]
    const g = where.reduce((m, w) => RANK[w.altitude] > RANK[m] ? w.altitude : m, 'A0')
    return { unit: t, mandate, where, untrusted, grant_altitude: g, crosses: RANK[g] > RANK[mandate], label: 'fact', from: t + (genSet.has(t) ? ', admin/build/generators.json' : '') + (ciRuns.has(t) ? ', .github/workflows/deploy.yml' : '') }
}
// Compute named in the agents' own files that is not a tool here (corrects COMPUTE.md §1 where the files say otherwise)
const NAMED = {
    conductor: [{ unit: 'reads of IPMA\'s CAP feed and open data with curl, the bridge sync, site builds, PDF rendering in Chromium', untrusted: ['MeteoAlarm XML, IPMA JSON, the Web-Summit repository\'s files', 'a headless browser (Chromium)'], from: 'agents/conductor/COMPUTE.md §1 (of itself)' }],
    meteorologist: [{ unit: 'a read every 5 minutes between its wakes', untrusted: ['the feeds it reads (COMPUTE.md: the CAP feed, METAR and TAF; its status says only "reads every 5 min")'], from: 'agents/meteorologist/status.json', session: 'its session, on the Web-Summit repository\'s side (bridged)' }],
    flights: [{ unit: 'an OpenSky poller every 10 minutes (anonymous /states/all) and Open-Meteo reads', untrusted: ['outside hosts: OpenSky\'s API, Open-Meteo\'s API (JSON)'], from: 'agents/flights/README.md, status.json' }],
    observability: [{ unit: 'Chromium checks of our live site', untrusted: ['our live site, in a headless browser'], from: 'agents/observability/status.json' }],
    researcher: [{ unit: 'headless browser reads of outside pages (the Diário da República\'s, for one)', untrusted: ['outside pages and their scripts, in a headless browser'], from: 'agents/researcher/status.json', session: 'its session, on the Web-Summit repository\'s side (bridged)' }],
    meteorology: [{ unit: 'headless reads of the pages marked render: true (tools/meteorology-render.mjs)', untrusted: ['outside pages and their scripts, in a headless browser'], from: 'agents/meteorology/README.md' }],
    graph: [{ unit: 'headless browser tests of our own pages (local builds)', untrusted: ['our own pages only'], from: 'agents/graph/status.json' }],
    labs: [{ unit: 'Playwright screenshots of our own lab pages (a scratch script)', untrusted: ['our own pages only'], from: 'agents/labs/status.json' }],
    studio: [{ unit: 'headless Chromium tests of our own pages before each push', untrusted: ['our own pages only'], from: 'agents/studio/README.md, status.json' }],
    identity: [{ unit: 'tools/lane-e2e.mjs in Chromium with a virtual passkey', untrusted: ['our own lane pages; the public lane\'s sealed messages'], from: 'agents/identity/status.json' }],
    weatherwatch: [{ unit: 'Playwright renders of our front page and of a warning\'s text, each wake', untrusted: ['our front page; the warning page it renders, in a headless browser'], from: 'agents/weatherwatch/status.json' }]
}
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
    if (budgets[agent]) a1.push({ what: `tools/llm.mjs calls (OpenRouter, M2): ${budgets[agent].for}`, share_usd_a_day: budgets[agent].usd, mandate: 'A1', where: [{ at: 'its agent\'s session, through tools/llm.mjs', grant: 'session', altitude: 'A4' }], untrusted: ['model answers (untrusted text), and prompts built from collected material'], grant_altitude: 'A4', crosses: true, label: 'fact', from: 'models/budgets.json' })
    for (const t of own.filter(t => callsLlm.has(t))) a1.push({ what: `${t} calls tools/llm.mjs (M2)`, label: 'fact', from: t })
    if (role === 'models') a1.push({ what: 'tools/llm.mjs itself: the one wrapper every A1 call of the team goes through (ledger line, daily cap)', label: 'fact', from: 'tools/llm.mjs (owned by incident.models@ and incident.dev@ in agents/policy.json)' })
    const a0 = own.filter(t => !callsLlm.has(t) && t !== 'tools/llm.mjs')
    const agentGrant = 'A4'   // every session holds the session-control tools (GRANTS.session)
    const units = own.filter(t => t !== 'tools/llm.mjs').map(t => toolUnit(t, agentGrant))
    for (const n of NAMED[role] || []) units.push({ unit: n.unit, mandate: 'A0', where: [{ at: n.session || 'its agent\'s session', grant: n.session ? 'session (on the Web-Summit side: push to that repository, not this one)' : 'session', altitude: agentGrant }], untrusted: n.untrusted, grant_altitude: agentGrant, crosses: true, label: 'fact', from: n.from })
    const io = bridged.includes(role)
        ? { level: 'L4, elsewhere', label: 'evidence', why: 'its session pushes to SGit-AI__Website__Web-Summit (team/incidents/); the conductor copies its data and status here with tools/sync-from-websummit.sh, so here its work arrives under the conductor\'s commits' }
        : c ? { level: vault || lane ? 'L5' : 'L4', label: vault || lane ? 'evidence' : 'fact', why: `${c.n} commits here by it (its Agent: trailer or its name in the subject) (the latest ${c.last.slice(0, 16)}Z), pushed to dev behind the gate${vault || lane ? `; its own files also speak of ${[vault && 'vaults', lane && 'lanes'].filter(Boolean).join(' and ')}, read as L5 (git, vaults, lanes, wakes)` : ''}` }
        : { level: 'not yet seen', label: 'evidence', why: 'no commit by it read here yet' }
    out.push({
        agent, role,
        altitude: { value: 'A3', label: 'fact', why: 'a loop with an environment: memory (agents/' + role + '/status.json), a wake, a reach beyond its sandbox (fringe §3)' },
        inside: {
            A2_loops: units.some(u => u.mandate === 'A2') ? units.filter(u => u.mandate === 'A2') : role === 'conductor'
                ? [{ what: 'none of its own named; it starts and wakes the other A3 sessions, which is the swarm\'s control plane (A4)', label: 'evidence' }]
                : [{ what: 'none named in its files; a sub-agent its session starts would be an A2 loop, and none is recorded in git', label: 'evidence' }],
            A1_calls: a1.length ? [...a1.filter(x => !/ calls tools\/llm\.mjs \(M2\)$/.test(x.what)), ...units.filter(u => u.mandate === 'A1')] : [{ what: 'no tools/llm.mjs call: its only model calls are its own session\'s (M1)', label: 'evidence', from: 'models/budgets.json has no share for it; no tool it owns imports tools/llm.mjs' }],
            A0_compute: units.filter(u => u.mandate === 'A0')
        },
        runtime: { value: 'R1', label: 'evidence', why: 'Claude Code in the cloud: every session the conductor starts is a cloud session (session_... ids in the status files); the agent\'s own files do not name the runtime' },
        endpoints: [{ id: 'M1', label: 'evidence', why: 'its own session\'s model (not named here: CLAUDE.md)' }, ...(a1.some(x => /M2/.test(x.what)) ? [{ id: 'M2', label: 'fact', why: 'OpenRouter through tools/llm.mjs' }] : [])],
        io,
        account: { value: "Dinis Cruz's Claude account, through the conductor", label: 'evidence', why: bridged.includes(role) ? 'started before this repository, on the Web-Summit incident; the account is not stated in its files' : 'the conductor starts each session from Dinis\'s; no agent file states the account' },
        session_grant: { altitude: agentGrant, vault_keys: vault ? 'its own files speak of vaults (evidence that it holds vault keys)' : 'none named in its files', push: bridged.includes(role) ? 'to SGit-AI__Website__Web-Summit (bridged), not here' : active.length ? 'to dev here' : 'none here yet', see: 'grants.session' },
        key: active.length ? { active, handed_over: mine.filter(k => k.status === 'handed over').length, label: 'fact', from: 'data/keys.json' } : { active: [], label: 'fact', why: 'no key in data/keys.json' + (bridged.includes(role) ? ' (its session cannot push here)' : '') }
    })
}
const swarms = [
    { id: 'A4-incident', what: "the incident team: incident.conductor@web-summit.dinis and the agents below, at Dinis Cruz's word", control_plane: 'incident.conductor@ (starts the sessions, sets each wake)', label: 'fact', from: 'CLAUDE.md, agents/JOBS.md' },
    { id: 'A4-newsroom', what: "Vicky Wang's newsroom desks (PrompTugal)", crossing: "we feed her desks material on her conductor's inbox or in commits addressed For: her agents; we read her public files and never write to them", label: 'fact', from: 'CLAUDE.md, "Whose it is"' },
    { id: 'A4-fringe', what: 'the fringe swarm (conductor.fringe@PrompTugal.dinis), PrompTugal/PrompTugal__News__Fringe', crossing: 'its definitions are read here (this file); nothing of ours is written there', label: 'evidence', from: FRINGE.repo }
]
const units_all = () => out.flatMap(a => [...a.inside.A0_compute, ...a.inside.A1_calls.filter(u => u.mandate), ...a.inside.A2_loops.filter(u => u.mandate)])
const count = k => out.reduce((m, a) => (m[k(a)] = (m[k(a)] || 0) + 1, m), {})
const doc = {
    about: "Which of our agents does what in the fringe repository's definitions of where agents run: each agent's altitude (A3) with the A2 loops, A1 LLM calls and A0 compute it runs, its runtime (R1-R5), model endpoints (M1-M4), I/O level (L0-L5), account and key. Every item labelled: fact (read from the agent's own files or ours), evidence (read elsewhere, or inferred from what it does: the reason given). The definitions are the fringe's; the mapping is the librarian's. At Dinis's word, ~22:00 UTC, 11 November (BRIEF.md item 3).",
    by: 'incident.librarian@web-summit.dinis', updated: at, made_by: 'tools/library-altitudes.mjs',
    definitions: FRINGE,
    swarms,
    grants: GRANTS,
    corrections_to_compute_md: [
        { what: 'CI was not at its own altitude at 22:11: one job held contents: write (kept in .git/config by checkout) while it ran the gate, the generators and npm\'s Chromium. Since fd90abcd (22:2x, incident.ci@\'s patch) it is three jobs: build (contents: read, no token kept: A0, runs the repository\'s code), deploy (pages and id-token write, no repository code) and tag (contents write, no repository code). The build job\'s units no longer cross in CI; they still cross in every pushing session.', label: 'fact', from: '.github/workflows/deploy.yml at fd90abcd; incident.ci@\'s message, 22:23' },
        { what: 'The generators in admin/build/generators.json run in every pushing agent\'s session (release.sh runs the gate, which builds): every agent runs the other agents\' generators under its own A4 grant. By count, the widest crossing.', label: 'fact', from: 'admin/tools/release.sh, admin/build/validate.mjs, admin/build/generators.json' },
        { what: 'graph, labs, studio, identity and weatherwatch use a headless browser on our own pages (local builds, our live site, our lanes), not on arbitrary web pages; the readers of outside pages in a browser are the researcher, meteorology (render: true) and the conductor.', label: 'fact', from: 'agents/<role>/status.json and README.md' },
        { what: 'The meteorologist, researcher and dev run on the Web-Summit repository\'s side: the grant there is that repository\'s push, not ours; their work arrives here under the conductor\'s commits.', label: 'fact', from: 'tools/sync-from-websummit.sh' },
        { what: 'An A2 now exists: tools/models-delegate.mjs, incident.models@\'s delegation loop (commit 9fff5fb7).', label: 'fact', from: 'tools/models-delegate.mjs' },
        { what: 'In the librarian\'s session, 10 environment variables named as keys or tokens hold credentials (names read, never values), against 17 counted in the conductor\'s: the sessions may not hold the same set.', label: 'fact', from: 'the librarian\'s session, at ' + at }
    ],
    totals: { agents: out.length, units: units_all().length, crossing: units_all().filter(u => u.crosses).length, places_not_crossing: units_all().flatMap(u => u.where || []).filter(w => w.crosses === false).length, by_mandate: units_all().reduce((m, u) => (m[u.mandate] = (m[u.mandate] || 0) + 1, m), {}), in_ci_and_every_session: [...genSet].filter(t => fs.existsSync(path.join(ROOT, t))).length, io: count(a => a.io.level), calls_models_through_llm_mjs: out.filter(a => a.endpoints.some(e => e.id === 'M2')).map(a => a.agent), keyed: out.filter(a => a.key.active.length).length },
    agents: out
}
fs.writeFileSync(path.join(ROOT, 'library/altitudes.json'), JSON.stringify(doc, null, 1) + '\n')
console.log(`library-altitudes: ${out.length} agents; units ${doc.totals.units}, crossing ${doc.totals.crossing} ${JSON.stringify(doc.totals.by_mandate)}; io ${JSON.stringify(doc.totals.io)}; M2 ${doc.totals.calls_models_through_llm_mjs.length}; keyed ${doc.totals.keyed}`)
