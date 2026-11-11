#!/usr/bin/env node
// Agent provenance: git log, the status files and data/keys.json -> data/agents/sessions.json
// (kept by incident.observability@web-summit.dinis; RESTRUCTURE.md, "Agent provenance"; Dinis, 11 November 2026, ~02:10 UTC:
// "follow any piece of work to the agent, when it ran, which session, which conductor, which version of me ... where missing,
// mark it").
//   node tools/agents-sessions.mjs [ref]        (git fetch first; default ref origin/dev)
// For each agent: its key (fingerprints, when and how it was made, the operator's key it says it is linked to) and its
// sessions. A session is known only from what is written down: the Claude-Session trailer of its commits gives the id, and
// the first and last commit give when it was seen working. Who started it, from which session, on whose word and when come
// only from the agent's own status file (a "session" object: started_at, started_by, started_by_session, on_whose_word,
// source), or, failing that, from a "started ... by <agent>" phrase in its state. Anything else is the string "not recorded":
// nothing here is guessed. Run by hand before a release (it reads git history; the build does not).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { readKeys } from './lane-keystore.mjs'   // data/keys.json and data/keys-archive/ (the key list was split on 11 November)
import { readAgentsData, writeAgentsData } from './agents-split.mjs'   // tracked as data/agents/sessions/ (a file per agent); the build serves data/agents/sessions.json whole

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const j2 = x => String(x).replace(/\.\d+Z$/, 'Z')
const OUT = path.join(ROOT, 'data/agents/sessions.json'), REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', NR = 'not recorded'
const ref = process.argv[2] || 'origin/dev'
const iso = d => new Date(d).toISOString().replace(/\.\d+Z$/, 'Z')
// a shallow clone (a fresh session's is one) holds only the last few dozen commits: writing from it would replace the night with an hour
if (execFileSync('git', ['-C', ROOT, 'rev-parse', '--is-shallow-repository']).toString().trim() === 'true') { console.error('this clone is shallow: run "git fetch --unshallow origin dev" first; nothing written'); process.exit(1) }
const raw = execFileSync('git', ['-C', ROOT, 'log', ref, '--format=%H%x1f%cI%x1f%B%x1e'], { maxBuffer: 1 << 27 }).toString()
const A = new Map()
const get = name => { if (!A.has(name)) A.set(name, { agent: name, role: (name.match(/^[a-z]+\.([a-z0-9-]+)@/i) || [, ''])[1], team: /^incident\.[a-z0-9-]+@web-summit\.dinis$/i.test(name), commits: 0, without_session: 0, sessions: new Map() }); return A.get(name) }
for (const r of raw.split('\x1e').map(r => r.trim()).filter(Boolean)) {
    const [sha, at, msg] = r.split('\x1f'), subject = msg.split('\n')[0]
    const agent = (msg.match(/^Agent:\s*(\S+)/mi) || [])[1] || (subject.match(/^([a-z]+\.[a-z0-9-]+@[a-z0-9.-]+):/i) || [])[1]; if (!agent) continue
    const a = get(agent), id = (msg.match(/^Claude-Session:\s*\S*?(session_[A-Za-z0-9]+)/m) || [])[1]
    a.commits++
    if (!id) { a.without_session++; continue }
    const s = a.sessions.get(id) || { id, commits: 0, first_commit: null, last_commit: null }
    const c = { sha, at: iso(at) }
    s.commits++; if (!s.last_commit) s.last_commit = c; s.first_commit = c   // the log runs newest first
    a.sessions.set(id, s)
}
// every agent of the team, even one that has not committed here under its own name (the jobs table, the status folders)
for (const m of fs.readFileSync(path.join(ROOT, 'agents/JOBS.md'), 'utf8').matchAll(/^\|\s*([^|]*incident\.[^|]*)\|/gm)) for (const n of m[1].matchAll(/([a-z]+\.[a-z0-9-]+)@/gi)) get(`${n[1]}@web-summit.dinis`)
for (const d of fs.readdirSync(path.join(ROOT, 'agents'), { withFileTypes: true })) if (d.isDirectory()) { try { const n = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents', d.name, 'status.json'), 'utf8')).agent; if (n) get(n) } catch { } }
// the conductor's statement of who started whom (data/agents/starts.json): used where an agent's own status file is silent
let STARTS = { roles: {} }; try { STARTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/agents/starts.json'), 'utf8')) } catch { }
const keys = readKeys().keys || []
const agents = []
for (const a of [...A.values()].sort((x, y) => (y.team - x.team) || x.agent.localeCompare(y.agent))) {
    let st = null; try { st = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents', a.role, 'status.json'), 'utf8')) } catch { }
    if (st && st.agent && st.agent !== a.agent) st = null
    const rec = (st && typeof st.session === 'object' && st.session) || {}
    const phrase = st && String(st.state || '').match(/started\s+([0-9:]{4,5}\s*(?:UTC|Z)?)\s*(?:UTC\s*)?by\s+([a-z]+\.[a-z0-9-]+@[a-z0-9.-]*)/i)
    const told = (a.team && STARTS.roles[a.role]) || null
    const earlier = new Map((st && Array.isArray(st.earlier_sessions) ? st.earlier_sessions : []).filter(e => e && e.id).map(e => [e.id, e]))
    // tokens: the agent's own measured lines (accounts/ledger/<role>.jsonl, incident.accountant@'s method). A line names its session only by a
    // hash, so it is matched by time: the measured session whose first call is the latest one before this session's first push.
    const measured = new Map(); try { for (const l of fs.readFileSync(path.join(ROOT, 'accounts/ledger', a.role + '.jsonl'), 'utf8').split('\n')) { if (!l.trim()) continue; const j = JSON.parse(l); if (j.session && j.totals && j.totals.first_call) measured.set(j.session, j) } } catch { }
    const ML = [...measured.values()].sort((x, y) => x.totals.first_call.localeCompare(y.totals.first_call)), used = new Set()
    const measureOf = s => { const c = ML.filter(j => Date.parse(j.totals.first_call) <= Date.parse(s.first_commit.at)).pop(); if (!c || used.has(c.session)) return NR; used.add(c.session)
        return { at: j2(c.at), calls: c.totals.calls, context_per_call: c.totals.context_per_call, compactions: c.totals.compactions || 0, first_call: j2(c.totals.first_call), last_call: j2(c.totals.last_call) } }   // where it came from: the top-level measured_source (said once, 23:18 on 11 November: the file passed 256 KB)
    const sessions = [...a.sessions.values()].sort((x, y) => x.first_commit.at.localeCompare(y.first_commit.at)).map((s, i, all) => {
        const mine = /^session_/.test(rec.id || "") ? rec.id === s.id : i === all.length - 1   // the status file speaks for the session it names; with no id, for the latest
        const was = earlier.get(s.id), first = i === 0 && all.length > 1 && !mine && !was && told   // the conductor's statement (02:20) was about each agent's first session
        if (was || first) { const e = was || {}; return { id: s.id, url: `https://claude.ai/code/${s.id}`, commits: s.commits, first_commit: s.first_commit, last_commit: s.last_commit,
            started_at: e.started_at || NR, started_by: e.started_by || (told ? told.started_by : NR), started_by_session: e.started_by_session || (told ? told.started_by_session : NR), on_whose_word: e.on_whose_word || (told ? told.on_whose_word : NR),
            brief_section: told ? told.brief_section : NR, source: was ? (e.source || `agents/${a.role}/status.json, "earlier_sessions"`) : `data/agents/starts.json: ${STARTS.source} ${told.brief_section}`,
            ...(e.ended_at ? { ended_at: e.ended_at } : {}), ...(e.ended_because ? { ended_because: e.ended_because } : {}) } }
        return { id: s.id, url: `https://claude.ai/code/${s.id}`, commits: s.commits, first_commit: s.first_commit, last_commit: s.last_commit,
            started_at: (mine && rec.started_at) || NR,
            started_by: (mine && rec.started_by) || (mine && told ? told.started_by : mine && phrase ? phrase[2].replace(/@$/, '@web-summit.dinis') : NR),
            started_by_session: (mine && rec.started_by_session) || (mine && told ? told.started_by_session : NR),
            on_whose_word: (mine && rec.on_whose_word) || (mine && told ? told.on_whose_word : NR),
            brief_section: mine && told ? told.brief_section : NR,
            source: mine && (rec.started_by || rec.on_whose_word) ? (rec.source || `agents/${a.role}/status.json, its "session" object`) : mine && told ? `data/agents/starts.json: ${STARTS.source} ${told.brief_section}` : mine && phrase ? `agents/${a.role}/status.json, its state: "${phrase[0]}"` : NR }
    })
    sessions.forEach((s, i) => { s.n = i + 1; s.measured = measureOf(s)
        if (i) { const p = sessions[i - 1], alongside = p.last_commit.at > s.first_commit.at
            s.takes_over_from = { session: p.id, its_last_push: p.last_commit, alongside, ...(p.ended_because ? { because: p.ended_because } : {}),
                context_per_call: p.measured !== NR && s.measured !== NR ? { before: p.measured.context_per_call.last, after: s.measured.context_per_call.first, now: s.measured.context_per_call.last } : NR } } })
    const k = keys.filter(k => k.agent === a.agent).map(k => ({ id: k.id, record: k.bundle?.signing_fingerprint || NR, encryption: k.bundle?.fingerprint || NR, added: k.added || NR, status: k.status || NR, how: k.how || NR,
        operator_key: (String(k.how || '').match(/operator's key (sha256:[0-9a-f]+)/) || [, NR])[1] }))
    agents.push({ agent: a.agent, role: a.role, team: a.team, page: a.team && fs.existsSync(path.join(ROOT, 'agents', a.role, 'README.md')) ? `agents/${a.role}/index.html` : NR,
        operator: a.team ? 'Dinis Cruz (CLAUDE.md: "Built and run by Dinis Cruz\'s incident team")' : NR,
        keys: k.length ? k : NR, commits: a.commits, commits_without_a_session_trailer: a.without_session, sessions: sessions.length ? sessions : NR,
        ...(!sessions.length && told ? { start_as_told: { session_id: NR, started_at: NR, ...told, source: `data/agents/starts.json: ${STARTS.source} ${told.brief_section}` } } : {}) })
}
const body = {
    about: 'Agent provenance for storm-charles.promptugal.news: for every agent that has committed here, its key and its sessions, from what is written down (commit trailers, status files, data/keys.json). "not recorded" means exactly that: the fact is not in the repository; nothing is guessed. A session link opens only for the operator. Every commit carries a signature GitHub verifies, but made with one key, the hosting service\'s, the same for every agent (incident.ci@, data/ci/index.json, signing); nothing is signed with an agent\'s own key yet, so the agent is named by the commit\'s Agent: trailer, a statement in text.',
    by: 'incident.observability@web-summit.dinis', repository: REPO, branch: 'dev', head: raw.slice(0, 40),
    how_to_record: 'An agent records its own start in agents/<role>/status.json: "session": { "id", "started_at" (UTC), "started_by" (agent), "started_by_session", "on_whose_word", "source" (where that is written) }.',
    address_pattern: { agent_page: 'agents/<role>/index.html, where <role> is the part of the name between "incident." and "@"', any_name: 'agents/index.html?who=<full agent name> (goes to its page, or says there is none)', commit: 'app/agents/commit.html?sha=<sha>', file: 'app/agents/commit.html?path=<path in the repository>' },
    measured_source: 'each session\'s measured: accounts/ledger/<role>.jsonl, the latest line of the measured session that began before that session\'s first push (matched by time: a ledger line carries no session address)',
    counts: { agents: agents.length, sessions: agents.reduce((n, a) => n + (Array.isArray(a.sessions) ? a.sessions.length : 0), 0), agents_with_more_than_one_session: agents.filter(a => Array.isArray(a.sessions) && a.sessions.length > 1).length, sessions_stated_that_do_not_push_here: agents.filter(a => a.start_as_told && a.start_as_told.session_id !== NR).length, sessions_measured: agents.reduce((n, a) => n + (Array.isArray(a.sessions) ? a.sessions.filter(s => s.measured !== NR).length : 0), 0), sessions_with_a_recorded_start: agents.reduce((n, a) => n + (Array.isArray(a.sessions) ? a.sessions.filter(s => s.started_by !== NR).length : 0), 0), agents_without_a_key: agents.filter(a => a.keys === NR).length },
    agents
}
let prev = null; try { prev = readAgentsData('sessions') } catch { }
const same = prev && JSON.stringify({ ...prev, updated: 0 }) === JSON.stringify({ ...body, updated: 0 })
if (!same) writeAgentsData('sessions', { ...body, updated: iso(Date.now()) }, { indent: 1 })
console.log(`agents-sessions: ${body.counts.agents} agents, ${body.counts.sessions} sessions (${body.counts.sessions_with_a_recorded_start} with a recorded start), ${body.counts.agents_without_a_key} without a key -> data/agents/sessions/${same ? ' (no change)' : ''}`)
