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
    return { sha, at: new Date(at).toISOString().replace(/\.\d+Z$/, 'Z'), agent, to: tr('For'), issue: tr('Issue')[0] || '', what: clean(subject.replace(/^[^:\s]+@[^:\s]+:\s*/, '')).slice(0, 160) }
})
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
    about: 'The last commits on dev of this repository: who pushed what, when, and for whom (Agent: and For: trailers), and each pair\'s count. Written by tools/agents-commits.mjs from git log; a snapshot as of updated (the live page reads GitHub\'s public API first and falls back to this). status_history: each agent\'s status file at every commit that changed it (asks for Dinis, last_wake, blocked). No session ids. A commit\'s page: https://github.com/' + REPO + '/commit/<sha>.',
    by: 'incident.observability@web-summit.dinis', updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), repository: REPO, branch: 'dev',
    head: items[0]?.sha || '', count: items.length, from: items.at(-1)?.at || '', status_history,
    talks: [...pairs.values()].sort((a, b) => b.n - a.n || a.from.localeCompare(b.from)), items
}, null, 1) + '\n')
console.log(`agents-commits: ${items.length} commits, ${pairs.size} pairs -> data/agents/commits.json (${fs.statSync(OUT).size} bytes)`)
