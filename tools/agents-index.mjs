#!/usr/bin/env node
// The team's index: repository -> data/agents/index.json (kept by incident.observability@web-summit.dinis).
//   node tools/agents-index.mjs            write it
//   node tools/agents-index.mjs --check    exit 1 if the committed file is behind the repository
//   node tools/agents-index.mjs --out _site   write <dir>/data/agents/index.json instead (for the build: on every push the
//                                          site serves the index made from that commit, and no tracked file is touched)
// Reads only files in the working tree, never git history: agents/JOBS.md (the roster and each job), agents/*/status.json
// (state, done, next, asks), data/keys.json (public keys). The page (app/agents/agents.js) reads this JSON, then each
// agent's live status.json and GitHub's public API for commits, so a status an agent pushes shows without this tool running.
// Nothing private goes through: session ids are stripped, links must be https, no key material beyond fingerprints.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outAt = process.argv.indexOf('--out'), OUT = path.join(outAt > 0 ? path.resolve(process.argv[outAt + 1]) : ROOT, 'data/agents/index.json')
const DOMAIN = 'web-summit.dinis'
const read = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8')
// session ids and session links never reach a page (as Silvio's clean() does on the Universe)
export const clean = v => typeof v === 'string'
    ? v.replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '[session]').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '[session]')
    : Array.isArray(v) ? v.map(clean) : v
const list = v => Array.isArray(v) ? v.map(x => clean(typeof x === 'string' ? x : JSON.stringify(x))) : v ? [clean(String(v))] : []
const roleOf = name => (name.match(/^[a-z]+\.([a-z0-9-]+)@/i) || [, name.split('@')[0]])[1]

// 1. the roster: the table in agents/JOBS.md (a row may name several agents)
const roster = new Map()
const add = name => { if (!roster.has(name)) roster.set(name, { name, role: roleOf(name) }); return roster.get(name) }
const jobs = read('agents/JOBS.md')
for (const line of jobs.split('\n')) {
    if (!/^\|\s*incident\./.test(line)) continue
    const [who, owns, job] = line.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim())
    const names = [...who.matchAll(/([a-z]+\.[a-z0-9-]+)@/gi)].map(m => `${m[1]}@${DOMAIN}`)
    for (const n of names) Object.assign(add(n), { owns: clean(owns), job: clean(job), shared_row: names.length > 1 })
}

// 2. each agent's own status file
for (const d of fs.readdirSync(path.join(ROOT, 'agents'), { withFileTypes: true })) {
    const rel = `agents/${d.name}/status.json`
    if (!d.isDirectory() || !fs.existsSync(path.join(ROOT, rel))) continue
    let s; const raw = read(rel)
    try { s = JSON.parse(raw) } catch { continue }
    const a = add(s.agent || `incident.${d.name}@${DOMAIN}`)
    const asks = list(s.asks)
    Object.assign(a, {
        status_file: rel, status_sha256: crypto.createHash('sha256').update(raw).digest('hex'),
        state: clean(s.state || ''), last_wake: clean(s.last_wake || ''),
        jobs: list(s.jobs), done: list(s.done), next: list(s.next),
        asks_dinis: asks.filter(x => /^Dinis\b/i.test(x)), asks: asks.filter(x => !/^Dinis\b/i.test(x))
    })
}

// 3. public keys: fingerprints only (the full public halves stay in data/keys.json)
for (const k of JSON.parse(read('data/keys.json')).keys || []) {
    if (!k.agent) continue
    const a = add(k.agent)
    ;(a.keys ||= []).push({ id: k.id, record: k.bundle?.signing_fingerprint || '', encryption: k.bundle?.fingerprint || '', added: k.added || '', status: k.status || '', how: clean(k.how || '') })
}

// 3b. the path policy: the folders each agent may change (agents/policy.json, kept by the conductor and the librarian)
try { const pol = JSON.parse(read('agents/policy.json')); for (const [name, v] of Object.entries(pol.agents || pol)) if (v && Array.isArray(v.owns) && /@/.test(name)) add(name).policy_owns = v.owns } catch { }

// 4. model calls, as counts: one file per agent, written by tools/agents-ledger.mjs on the machine that made them
const LED = path.join(ROOT, 'data/agents/ledger')
const ledger = fs.existsSync(LED) ? fs.readdirSync(LED).filter(f => f.endsWith('.json')).sort().map(f => `data/agents/ledger/${f}`) : []

// 5. its home: the studio's character for it (app/studio/agents/, by incident.studio@), what it is for in a line, its group,
//    and its work: the pages in the folders it owns (a README.md is a section's front page)
let CAST = {}; try { for (const c of JSON.parse(read('app/studio/agents/index.json')).agents || []) CAST[c.role] = c } catch { }
let GROUPS = []; try { GROUPS = JSON.parse(read('data/agents/groups.json')).groups || [] } catch { }
const titleOf = rel => { try { const t = read(rel); return (t.match(/^title:\s*(.+)$/m) || t.match(/^#\s+(.+)$/m) || [, rel])[1].replace(/[*`"]/g, '').slice(0, 90) } catch { return rel } }
for (const a of roster.values()) {
    const ex = rel => fs.existsSync(path.join(ROOT, rel))
    if (ex(`app/studio/agents/${a.role}.svg`)) { a.figure = `app/studio/agents/${a.role}.svg`; a.mark = ex(`app/studio/agents/${a.role}.mark.svg`) ? `app/studio/agents/${a.role}.mark.svg` : a.figure }
    const c = CAST[a.role]; if (c) { a.tagline = clean(c.job || c.what || ''); a.wears = clean(c.wears || c.holds || c.thing || '') }
    a.group = (GROUPS.find(g => (g.roles || []).includes(a.role)) || { title: 'Other' }).title
    const work = [], seen = new Set()
    for (const g of a.policy_owns || []) {
        const base = g.replace(/<role>/g, a.role).replace(/\/?\*.*$/, ''); if (!base || /^agents(\/|$)/.test(base) || seen.has(base) || /^(tools|data\/agents)/.test(base) && !ex(base + '/README.md')) continue; seen.add(base)
        if (ex(base + '/README.md')) work.push({ href: `${base}/index.html`, title: titleOf(base + '/README.md'), path: base + '/' })
        else if (ex(base + '/index.md')) work.push({ href: `${base}/index.html`, title: titleOf(base + '/index.md'), path: base + '/' })
        else if (/\.md$/.test(base) && ex(base)) work.push({ href: base.replace(/\.md$/, '.html'), title: titleOf(base), path: base })
    }
    a.work = work.slice(0, 12)
}

const order = ['conductor', 'observability', 'designer', 'identity', 'dev', 'meteorologist', 'researcher']
const agents = [...roster.values()].sort((a, b) => ((order.indexOf(a.role) + 1) || 99) - ((order.indexOf(b.role) + 1) || 99) || a.name.localeCompare(b.name))
    .map(a => ({ in_jobs: !!a.job, has_status: !!a.status_file, has_key: !!a.keys?.length, has_page: fs.existsSync(path.join(ROOT, 'agents', a.role, 'README.md')), ...a }))
const body = {
    about: 'Every agent of the incident team behind storm-charles.promptugal.news: its job (agents/JOBS.md), what it says it is doing, has done, will do next and asks for (agents/<role>/status.json; asks starting "Dinis:" are for the operator), and its public key fingerprints (data/keys.json). Written by tools/agents-index.mjs from the repository; nothing here is typed by hand. Commits are not in this file: the page reads them from GitHub\'s public API.',
    by: 'incident.observability@web-summit.dinis',
    repository: 'PrompTugal/PrompTugal__News__Storm-Charles', branch: 'dev',
    sources: ['agents/JOBS.md', 'agents/*/status.json', 'agents/policy.json', 'data/keys.json', 'data/agents/ledger/*.json'],
    counts: { agents: agents.length, with_status: agents.filter(a => a.has_status).length, with_key: agents.filter(a => a.has_key).length, asks_for_dinis: agents.reduce((n, a) => n + (a.asks_dinis?.length || 0), 0) },
    ledger, groups: GROUPS.map(g => g.title).concat('Other'), board: fs.existsSync(path.join(ROOT, 'app/board/board.js')) ? { script: 'app/board/board.js', style: fs.existsSync(path.join(ROOT, 'app/board/board.css')) ? 'app/board/board.css' : '', index: 'board/index.json', for_dinis: fs.existsSync(path.join(ROOT, 'board/for-dinis.md')) ? 'board/for-dinis.html' : '' } : null, agents
}
// generated_at changes only when the content does: a run with nothing new writes nothing (no commit churn)
const sig = crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex')
let prev = null; try { prev = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/agents/index.json'), 'utf8')) } catch { }
const same = prev?.content_sha256 === sig
if (process.argv.includes('--check')) { console.log(same ? 'agents-index: current' : 'agents-index: behind the repository (run node tools/agents-index.mjs)'); process.exit(same ? 0 : 1) }
if (same && outAt < 0) console.log(`agents-index: no change (${agents.length} agents)`)
else {
    fs.mkdirSync(path.dirname(OUT), { recursive: true })
    fs.writeFileSync(OUT, JSON.stringify({ ...body, updated: same && prev.updated ? prev.updated : new Date().toISOString().replace(/\.\d+Z$/, 'Z'), content_sha256: sig }, null, 2) + '\n')
    console.log(`agents-index: ${agents.length} agents, ${body.counts.with_status} with a status, ${body.counts.with_key} with a key, ${body.counts.asks_for_dinis} asks for Dinis -> data/agents/index.json`)
}
