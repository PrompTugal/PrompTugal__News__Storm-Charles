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

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'data/agents/sessions.json'), REPO = 'PrompTugal/PrompTugal__News__Storm-Charles', NR = 'not recorded'
const ref = process.argv[2] || 'origin/dev'
const iso = d => new Date(d).toISOString().replace(/\.\d+Z$/, 'Z')
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
const keys = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/keys.json'), 'utf8')).keys || []
const agents = []
for (const a of [...A.values()].sort((x, y) => (y.team - x.team) || x.agent.localeCompare(y.agent))) {
    let st = null; try { st = JSON.parse(fs.readFileSync(path.join(ROOT, 'agents', a.role, 'status.json'), 'utf8')) } catch { }
    if (st && st.agent && st.agent !== a.agent) st = null
    const rec = (st && typeof st.session === 'object' && st.session) || {}
    const phrase = st && String(st.state || '').match(/started\s+([0-9:]{4,5}\s*(?:UTC|Z)?)\s*(?:UTC\s*)?by\s+([a-z]+\.[a-z0-9-]+@[a-z0-9.-]*)/i)
    const sessions = [...a.sessions.values()].sort((x, y) => x.first_commit.at.localeCompare(y.first_commit.at)).map((s, i, all) => {
        const mine = rec.id ? rec.id === s.id : i === all.length - 1   // the status file speaks for the session it names; with no id, for the latest
        return { id: s.id, url: `https://claude.ai/code/${s.id}`, commits: s.commits, first_commit: s.first_commit, last_commit: s.last_commit,
            started_at: (mine && rec.started_at) || NR,
            started_by: (mine && rec.started_by) || (mine && phrase ? phrase[2].replace(/@$/, '@web-summit.dinis') : NR),
            started_by_session: (mine && rec.started_by_session) || NR,
            on_whose_word: (mine && rec.on_whose_word) || NR,
            source: mine && (rec.started_by || rec.on_whose_word) ? (rec.source || `agents/${a.role}/status.json, its "session" object`) : mine && phrase ? `agents/${a.role}/status.json, its state: "${phrase[0]}"` : NR }
    })
    const k = keys.filter(k => k.agent === a.agent).map(k => ({ id: k.id, record: k.bundle?.signing_fingerprint || NR, encryption: k.bundle?.fingerprint || NR, added: k.added || NR, status: k.status || NR, how: k.how || NR,
        operator_key: (String(k.how || '').match(/operator's key (sha256:[0-9a-f]+)/) || [, NR])[1] }))
    agents.push({ agent: a.agent, role: a.role, team: a.team, page: a.team && fs.existsSync(path.join(ROOT, 'agents', a.role, 'README.md')) ? `agents/${a.role}/index.html` : NR,
        operator: a.team ? 'Dinis Cruz (CLAUDE.md: "Built and run by Dinis Cruz\'s incident team")' : NR,
        keys: k.length ? k : NR, commits: a.commits, commits_without_a_session_trailer: a.without_session, sessions: sessions.length ? sessions : NR })
}
const body = {
    about: 'Agent provenance for storm-charles.promptugal.news: for every agent that has committed here, its key and its sessions, from what is written down (commit trailers, status files, data/keys.json). "not recorded" means exactly that: the fact is not in the repository; nothing is guessed. A session link opens only for the operator. Commits are not signed: the agent is named in the commit\'s Agent: trailer, by whoever pushed it.',
    by: 'incident.observability@web-summit.dinis', repository: REPO, branch: 'dev', head: raw.slice(0, 40),
    how_to_record: 'An agent records its own start in agents/<role>/status.json: "session": { "id", "started_at" (UTC), "started_by" (agent), "started_by_session", "on_whose_word", "source" (where that is written) }.',
    address_pattern: { agent_page: 'agents/<role>/index.html, where <role> is the part of the name between "incident." and "@"', any_name: 'agents/index.html?who=<full agent name> (goes to its page, or says there is none)', commit: 'app/agents/commit.html?sha=<sha>', file: 'app/agents/commit.html?path=<path in the repository>' },
    counts: { agents: agents.length, sessions: agents.reduce((n, a) => n + (Array.isArray(a.sessions) ? a.sessions.length : 0), 0), sessions_with_a_recorded_start: agents.reduce((n, a) => n + (Array.isArray(a.sessions) ? a.sessions.filter(s => s.started_by !== NR).length : 0), 0), agents_without_a_key: agents.filter(a => a.keys === NR).length },
    agents
}
let prev = null; try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')) } catch { }
const same = prev && JSON.stringify({ ...prev, updated: 0 }) === JSON.stringify({ ...body, updated: 0 })
if (!same) fs.writeFileSync(OUT, JSON.stringify({ ...body, updated: iso(Date.now()) }, null, 1) + '\n')
console.log(`agents-sessions: ${body.counts.agents} agents, ${body.counts.sessions} sessions (${body.counts.sessions_with_a_recorded_start} with a recorded start), ${body.counts.agents_without_a_key} without a key -> data/agents/sessions.json${same ? ' (no change)' : ''}`)
