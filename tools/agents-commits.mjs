#!/usr/bin/env node
// The last commits on dev as data: git log -> data/agents/commits.json (kept by incident.observability@web-summit.dinis).
//   node tools/agents-commits.mjs
// Who pushed what, when, and for whom (the Agent: and For: trailers): the same shape the agents page makes from GitHub's
// public API, kept as a snapshot so the page still shows the team when GitHub does not answer (60 calls an hour per
// address without a login), and so agents can read who talks to whom without an API. Run by hand before a release, never by
// the build (the build reads no git history; CI clones one commit). Session ids and attribution trailers are left out.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'data/agents/commits.json'), REPO = 'PrompTugal/PrompTugal__News__Storm-Charles'
const ref = process.argv[2] || 'origin/dev'
const raw = execFileSync('git', ['-C', ROOT, 'log', ref, '-n', '1500', '--format=%H%x1f%cI%x1f%B%x1e'], { maxBuffer: 1 << 26 }).toString()
const clean = s => s.replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '')
const items = raw.split('\x1e').map(r => r.trim()).filter(Boolean).map(r => {
    const [sha, at, msg] = r.split('\x1f'), subject = msg.split('\n')[0]
    const tr = k => [...msg.matchAll(new RegExp(`^${k}:\\s*(.+)$`, 'gmi'))].flatMap(m => m[1].split(/[,;]\s*/)).map(s => s.trim()).filter(Boolean)
    const agent = tr('Agent')[0] || (subject.match(/^([a-z]+\.[a-z0-9-]+@[a-z0-9.-]+):/i) || [])[1] || ''
    const session = (msg.match(/^Claude-Session:\s*\S*?(session_[A-Za-z0-9]+)/m) || [])[1] || ''
    const body = msg.split('\n').slice(1).filter(l => !/^(Agent|Issue|For|Co-Authored-By|Claude-Session):/i.test(l)).join('\n').trim()
    return { sha, at: new Date(at).toISOString().replace(/\.\d+Z$/, 'Z'), agent, to: tr('For'), issue: tr('Issue')[0] || '', what: clean(subject.replace(/^[^:\s]+@[^:\s]+:\s*/, '')).slice(0, 160), session, body: clean(body).slice(0, 700) }
})
// the version each commit was first served in: CI tags every release it deploys (v<series>.<run>); a commit whose own run was
// superseded is served by the next tagged commit after it. Tags are read from this clone (git fetch --tags first).
const tagOf = new Map(execFileSync('git', ['-C', ROOT, 'for-each-ref', 'refs/tags', '--format=%(objectname) %(refname:short)']).toString().split('\n').filter(Boolean).map(l => l.split(' ')))
{ let cur = ''; for (const c of items) { if (tagOf.has(c.sha)) cur = tagOf.get(c.sha); c.served_in = cur } }
// what each commit changed (git's numstat): kept beside the list, one file per hour (data/agents/detail-<hour>.json), so the
// list stays small and an hour that is over never changes again
const stat = execFileSync('git', ['-C', ROOT, 'log', ref, '-n', '1500', '--numstat', '--format=%x1e%H'], { maxBuffer: 1 << 27 }).toString().split('\x1e').filter(Boolean)
const filesOf = new Map(stat.map(b => { const [sha, ...rows] = b.trim().split('\n'); return [sha, rows.filter(Boolean).map(r => { const [a, d, p] = r.split('\t'); return { p, a: a === '-' ? null : +a, d: d === '-' ? null : +d } })] }))
const hours = new Map()
for (const c of items) {
    const f = filesOf.get(c.sha) || []; c.files = f.length; c.added = f.reduce((n, x) => n + (x.a || 0), 0); c.removed = f.reduce((n, x) => n + (x.d || 0), 0)
    const h = c.at.slice(0, 13); if (!hours.has(h)) hours.set(h, {})
    hours.get(h)[c.sha] = { body: c.body, session: c.session, files: f.slice(0, 40), more_files: Math.max(0, f.length - 40) }
    delete c.body; delete c.session
}
const detail_files = []
for (const [h, commits] of hours) {
    const name = `detail-${h}.json`, f = path.join(ROOT, 'data/agents', name), body = { about: 'What each commit of this hour changed: its message beyond the subject, its session (the Claude-Session trailer), and its files with lines added and removed (git numstat; at most 40 files a commit). Written by tools/agents-commits.mjs. The list of commits: data/agents/commits.json.', by: 'incident.observability@web-summit.dinis', hour: h + ':00Z', commits }
    let prev = null; try { prev = JSON.parse(fs.readFileSync(f, 'utf8')) } catch { }
    if (!prev || JSON.stringify(prev.commits) !== JSON.stringify(commits)) fs.writeFileSync(f, JSON.stringify({ ...body, updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z') }, null, 1) + '\n')
    detail_files.push(name)
}
// each agent's status file through the night: at every commit that changed agents/<role>/status.json, how many asks for
// Dinis it held and the last_wake it gave (for "The night as it happened": when an agent was waiting on Dinis, when it woke)
const git = (...a) => execFileSync('git', ['-C', ROOT, ...a], { maxBuffer: 1 << 26 }).toString()
const status_history = {}
for (const f of git('ls-tree', '-r', '--name-only', ref, 'agents/').split('\n').filter(f => /^agents\/[^/]+\/status\.json$/.test(f))) {
    const role = f.split('/')[1], rows = []
    for (const l of git('log', ref, '--format=%H%x1f%cI', '--', f).split('\n').filter(Boolean).reverse()) {
        const [sha, at] = l.split('\x1f')
        try { const j = JSON.parse(git('show', `${sha}:${f}`)), asks = (Array.isArray(j.asks) ? j.asks : []).filter(x => typeof x === 'string' && /^Dinis\b/i.test(x)).length
            const row = { at: new Date(at).toISOString().replace(/\.\d+Z$/, 'Z'), asks_dinis: asks, last_wake: clean(String(j.last_wake || '')).slice(0, 30), blocked: /^blocked/i.test(String(j.state || '')) }
            const prev = rows.at(-1); if (!prev || prev.asks_dinis !== row.asks_dinis || prev.last_wake !== row.last_wake || prev.blocked !== row.blocked) rows.push(row)
        } catch { }
    }
    status_history[role] = rows
}
// the file stays small (the gate's limit is 256 KB): the newest commits that fit in about 170 KB
while (items.length > 50 && JSON.stringify(items).length > 170e3) items.pop()
const pairs = new Map()
for (const c of items) for (const to of c.to) { const k = c.agent + '\u0000' + to, p = pairs.get(k) || { from: c.agent, to, n: 0, last: c.at }; p.n++; pairs.set(k, p) }
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify({
    about: 'The last commits on dev of this repository: who pushed what, when, and for whom (Agent: and For: trailers), and each pair\'s count. Written by tools/agents-commits.mjs from git log; a snapshot as of updated (the live page reads GitHub\'s public API first and falls back to this). Each item: sha, at, agent, to, issue, what, served_in (the first release that served it; empty: not yet tagged when this was written), files, added, removed; its files and message are in detail-<hour>.json (detail_files). status_history: each agent\'s status file at every commit that changed it (asks for Dinis, last_wake, blocked). No session ids. A commit\'s page: https://github.com/' + REPO + '/commit/<sha>.',
    by: 'incident.observability@web-summit.dinis', updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), repository: REPO, branch: 'dev',
    head: items[0]?.sha || '', count: items.length, from: items.at(-1)?.at || '', detail_files, status_history,
    talks: [...pairs.values()].sort((a, b) => b.n - a.n || a.from.localeCompare(b.from)), items
}, null, 1) + '\n')
console.log(`agents-commits: ${items.length} commits, ${pairs.size} pairs -> data/agents/commits.json (${fs.statSync(OUT).size} bytes)`)
