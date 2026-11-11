#!/usr/bin/env node
// The briefing pack (incident.librarian@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~02:50 UTC: "we should make it much
// cheaper if another agent wanted to capture all this. The whole idea that the librarian saves tokens and makes it cheaper and
// implements memory in a much more effective way").
//
//   node tools/library-pack.mjs --out _site     writes _site/library/pack/: start.md and history.md (the tracked text, with every
//                                               [[file:<path>]] turned into the file's link, size and sha256 as of this build),
//                                               state.json (the incident now, from the data files), one <role>.md per agent in
//                                               agents/policy.json, sizes.json and README.md (what each pack costs to read against
//                                               the files it stands for). Run after tools/library-index.mjs --out (it reads the
//                                               catalogue). It writes only under <out>/library/pack/; no git history; no network.
//
// A pack is a pointer, not a copy: every line names the file it summarises, with its sha256, so an agent reads the pack and
// opens only what it needs, and can tell when a summary has gone stale. Tokens are estimated as bytes / 4 and said to be so.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ME = 'incident.librarian@web-summit.dinis'
const outAt = process.argv.indexOf('--out'), OUT = outAt > 0 && process.argv[outAt + 1] ? path.resolve(process.argv[outAt + 1]) : ''
if (!OUT || OUT === ROOT) { console.error('library-pack: --out <dir> is required (not the repository root); nothing written'); process.exit(2) }
const P = path.join(OUT, 'library/pack'); fs.mkdirSync(P, { recursive: true })
const J = f => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, f), 'utf8')) } catch { return null } }
const now = new Date(), iso = now.toISOString().replace(/\.\d+Z$/, 'Z'), stamp = `${iso.slice(0, 10)}, ${iso.slice(11, 16)} UTC`
const statCache = new Map()
const stat = f => { if (statCache.has(f)) return statCache.get(f); const v = stat0(f); statCache.set(f, v); return v }
const stat0 = f => { try { const b = fs.readFileSync(path.join(fs.existsSync(path.join(ROOT, f)) ? ROOT : OUT, f)); return { bytes: b.length, sha256: crypto.createHash('sha256').update(b).digest('hex') } } catch { return null } }
const tok = b => Math.round(b / 4)
const n = x => x.toLocaleString('en-GB')
const cut = (s, k) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length <= k ? s : s.slice(0, k).replace(/\s+\S*$/, '') + ' …' }
const cell = s => String(s ?? '').replace(/\|/g, '/').replace(/\n/g, ' ')
const short = a => String(a).replace(/@web-summit\.dinis\b/g, '@')
const view = f => `../../view/index.html?path=${f}`
// a pointer: the file's path, its size in bytes and the first 10 hex digits of its sha256 (plain text: a link would double the
// bytes an agent pays for; any path opens at view/?path=<path>); the bytes are counted towards what the pack stands for
const pointer = (f, stands) => { const s = stat(f); if (!s) return `\`${f}\` (not found at this build)`; stands.set(f, s.bytes); return `\`${f}\` (${n(s.bytes)} B, ${s.sha256.slice(0, 10)})` }
const fill = (text, stands) => text.replace(/\[\[file:([^\]]+)\]\]/g, (_, f) => pointer(f, stands))
const policy = J('agents/policy.json') || { agents: {}, everyone: { owns: [] } }
const cat = (() => { try { return JSON.parse(fs.readFileSync(path.join(OUT, 'library/index.json'), 'utf8')).entries } catch { return [] } })()
const rx = g => new RegExp('^' + g.split(/(\*\*|\*)/).map(p => p === '**' ? '.*' : p === '*' ? '[^/]*' : p.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('') + '$')
const catBy = new Map(cat.map(e => [e.path, e]))
const owners = Object.entries(policy.agents).map(([agent, r]) => ({ agent, role: r.role, res: [...(r.owns || []), `agents/${r.role}/**`].filter(g => g !== '**').map(rx) }))
const ownerCache = new Map()
const ownerOf = f => { if (!ownerCache.has(f)) ownerCache.set(f, (owners.find(o => o.res.some(r => r.test(f))) || {}).agent || ''); return ownerCache.get(f) }
const sizes = []

// ---------------------------------------------------------------- start.md and history.md: the tracked text, with pointers
for (const name of ['start.md', 'history.md']) {
    const src = path.join(ROOT, 'library/pack', name); if (!fs.existsSync(src)) continue
    const stands = new Map(), text = fill(fs.readFileSync(src, 'utf8'), stands)
    fs.writeFileSync(path.join(P, name), text)
    sizes.push({ pack: name, bytes: Buffer.byteLength(text), stands_for: { files: stands.size, bytes: [...stands.values()].reduce((a, b) => a + b, 0) } })
}

// ---------------------------------------------------------------- state.json: the incident now, from the data files
const incDir = (fs.readdirSync(path.join(ROOT, 'incidents')).filter(d => fs.existsSync(path.join(ROOT, 'incidents', d, 'incident.json')))[0]) || ''
const inc = J(`incidents/${incDir}/incident.json`) || {}, warn = J(`incidents/${incDir}/data/weather/warnings.json`) || {}, sig = J(`incidents/${incDir}/data/signals.json`) || {}
const from = f => { const s = stat(f); return s ? { path: f, sha256: s.sha256, bytes: s.bytes } : { path: f, missing: true } }
const lis = (warn.lisbon || []).map(w => ({ type: w.type, level: w.level, start_utc: w.start_utc, end_utc: w.end_utc }))
const board = (() => { try { return fs.readdirSync(path.join(ROOT, 'board/items')).filter(f => f.endsWith('.json')).map(f => J('board/items/' + f)).filter(Boolean) } catch { return [] } })()
const open = board.filter(c => !/^(done|closed|answered|resolved)$/i.test(c.state || ''))
const statuses = Object.values(policy.agents).map(r => ({ role: r.role, s: J(`agents/${r.role}/status.json`) })).filter(x => x.s)
const waits = statuses.flatMap(x => (x.s.asks || []).filter(a => /^Dinis\b/.test(String(a))).map(a => ({ from: x.s.agent || x.role, ask: cut(a, 300), file: `agents/${x.role}/status.json` })))
const state = {
    about: 'The incident now, small: for an agent that needs the state without reading the data room. Every value is copied from the file named in "from" (with its sha256 at this build); nothing is written for this file. "In force" is by the build\'s clock: check the windows against your own. Not a warning service: follow IPMA, ANEPC and local authorities.',
    by: ME, updated: iso, made_by: 'tools/library-pack.mjs', incident: incDir,
    headline: inc.headline ? { ...inc.headline, standfirst: inc.standfirst || '', from: from(`incidents/${incDir}/incident.json`) } : null,
    warnings_lisbon: { in_force: lis.filter(w => Date.parse(w.start_utc) <= now && now < Date.parse(w.end_utc)), next: lis.filter(w => Date.parse(w.start_utc) > now), source: warn.source || '', label: 'fact', read_utc: warn.read_utc || '', next_read_utc: warn.next_read_utc || '', from: from(`incidents/${incDir}/data/weather/warnings.json`) },
    key_rows: { last_ten: (sig.items || []).filter(i => i.key || i.decision).sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 10).map(i => ({ id: i.id, at: i.at, label: i.label, decision: !!i.decision, text: cut(i.text, 200), source: (i.sources || []).map(s => s.url).filter(Boolean)[0] || '' })), rows_in_all: (sig.items || []).length, from: from(`incidents/${incDir}/data/signals.json`) },
    open_questions: { items: open.filter(c => c.kind === 'question' || c.kind === 'conflict').slice(0, 15).map(c => ({ id: c.id, kind: c.kind, title: cut(c.title, 140), waiting_on: short(c.waiting_on || '') })), open_cards_in_all: open.length, from: 'board/items/<id>.json' },
    waits_on_dinis: { count: waits.length, newest_eight: waits.slice(-8).map(w => ({ from: short(w.from), ask: cut(w.ask, 170) })), all_in: 'agents/<role>/status.json, the asks that begin "Dinis"; as cards: board/' }
}
const stateText = JSON.stringify(state, null, 1) + '\n'
fs.writeFileSync(path.join(P, 'state.json'), stateText)
sizes.push({ pack: 'state.json', bytes: Buffer.byteLength(stateText), stands_for: { files: 3 + board.length + statuses.length, bytes: [state.headline?.from, state.warnings_lisbon.from, state.key_rows.from].reduce((a, f) => a + (f?.bytes || 0), 0) + board.reduce((a, c) => a + (stat(`board/items/${c.id}.json`)?.bytes || 0), 0) + statuses.reduce((a, x) => a + (stat(`agents/${x.role}/status.json`)?.bytes || 0), 0) } })

// ---------------------------------------------------------------- one pack per role
const jobs = {}
for (const l of (fs.existsSync(path.join(ROOT, 'agents/JOBS.md')) ? fs.readFileSync(path.join(ROOT, 'agents/JOBS.md'), 'utf8') : '').split('\n').filter(l => /^\| incident\./.test(l))) {
    const c = l.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(x => x.trim())
    for (const [, r] of c[0].matchAll(/incident\.(\w+)@/g)) jobs[r] = { owns: c[1], job: c[2] }
}
const roles = [], abpTask = Object.fromEntries(Object.entries((J('library/abp.json') || {}).agents || {}).filter(([, a]) => a.task).map(([r, a]) => [r, a.task]))
for (const [agent, r] of Object.entries(policy.agents)) {
    const role = r.role, stands = new Map(), mine = cat.filter(e => ownerOf(e.path) === agent), st = J(`agents/${role}/status.json`)
    const P1 = f => pointer(f, stands)
    // what I read of others, and what others read of mine: from the links and "made from" the files themselves declare
    const reads = {}, readBy = {}
    for (const e of mine) for (const t of new Set([...(e.made_from || []), ...(e.links_to || [])])) { const o = /^agents\//.test(t) ? '' : ownerOf(t); if (o && o !== agent) (reads[o] ||= new Set()).add(t) }
    for (const e of mine) if (!/^agents\//.test(e.path)) for (const t of e.linked_from || []) { const o = /^agents\//.test(t) ? '' : ownerOf(t); if (o && o !== agent) (readBy[o] ||= new Set()).add(e.path) }
    const what = f => { const e = catBy.get(f); return e ? cut(e.what || e.title, 110) : '' }
    const key = mine.filter(e => /(README|index)\.md$|\.json$|\.mjs$/.test(e.path) && !/\/items\/|\/sites\/|status\.json$|policy\.md$/.test(e.path)).sort((a, b) => a.path.split('/').length - b.path.split('/').length || (b.linked_from?.length || 0) - (a.linked_from?.length || 0)).slice(0, 10)
    const cards = open.filter(c => c.owner === agent || String(c.waiting_on || '').includes(`incident.${role}@`)).slice(0, 12)
    const folders = Object.entries(mine.reduce((a, e) => { const d = e.path.split('/').slice(0, 2).join('/').replace(/\/[^/]*\.[^/]*$/, ''); a[d] = (a[d] || 0) + 1; return a }, {})).sort((a, b) => b[1] - a[1]).slice(0, 8)
    const mineBytes = mine.reduce((a, e) => a + (e.bytes || 0), 0)
    const neigh = (m, verb) => Object.entries(m).sort((a, b) => b[1].size - a[1].size).slice(0, 6).map(([o, set]) => `- **${short(o)}** (${set.size} file${set.size === 1 ? '' : 's'} ${verb}): ${[...set].slice(0, 3).map(f => P1(f) + (what(f) ? `: ${cell(cut(what(f), 70))}` : '')).join('; ')}${set.size > 3 ? `; and ${set.size - 3} more` : ''}`).join('\n')
    const md = `# The pack for ${agent}

> Kept by ${ME}, ${stamp}: written by \`tools/library-pack.mjs\` on every push from the files it points at. Read [start.md](start.md) first, then this, then open only what you need. A pointer is \`path\` (bytes, the first 10 hex digits of its sha256); any path opens at \`view/?path=<path>\`. [The pack](README.md).

## Your job

${abpTask[role] ? cell(abpTask[role]) : jobs[role] ? cell(jobs[role].job) : '*not recorded in agents/JOBS.md*'} (from ${P1('agents/JOBS.md')})

**You may change:** ${[...new Set(r.owns || [])].map(g => `\`${g}\``).join(', ')}, \`agents/${role}/**\`, and your own entry in \`data/keys.json\`${(r.shared || []).length ? `; shared with others, with a warning: ${r.shared.map(g => `\`${g}\``).join(', ')}` : ''}. (from ${P1('agents/policy.json')})

**Your draft behaviour policy** (not agreed by Dinis): ${fs.existsSync(path.join(ROOT, `agents/${role}/policy.md`)) ? P1(`agents/${role}/policy.md`) : '*not written yet*'}

## Where the work stands

${st ? `- **State:** ${cell(cut(st.state, 400))}${st.updated ? ` (its own date: ${st.updated})` : ''}
${(st.next || []).slice(0, 3).map(x => `- **Next:** ${cell(cut(x, 200))}`).join('\n')}
${(st.asks || []).slice(0, 4).map(x => `- **Ask:** ${cell(cut(x, 200))}`).join('\n')}
- The whole status, with everything done: ${P1(`agents/${role}/status.json`)}` : '- No status file yet: nothing has been recorded by this agent.'}

## Your files

${mine.length ? `${n(mine.length)} files, ${n(mineBytes)} bytes in all (about ${n(tok(mineBytes))} tokens to read every one): ${folders.map(([d, k]) => `\`${d}/\` ${k}`).join(', ')}. The ones to open first:

${key.map(e => `- ${P1(e.path)}${what(e.path) ? `: ${cell(what(e.path))}` : ''}`).join('\n')}

Every one, with who last changed it: [the catalogue](../index.json), filtered by your paths.` : 'None yet.'}

## Your neighbours

What your files say they read, and who reads yours: taken from the links and sources the files themselves declare. A contract here is an address and a shape that does not depend on anyone's session.

**You read:**

${neigh(reads, 'of theirs') || '- Nothing declared yet.'}

**They read yours:**

${neigh(readBy, 'of yours') || '- Nothing links to your files yet.'}

## Open cards on the board

${cards.length ? cards.map(c => `- \`${c.id}\` (${c.kind}${c.state ? ', ' + c.state : ''}): ${cell(cut(c.title, 160))}${c.waiting_on ? `; waiting on ${cell(short(c.waiting_on))}` : ''}`).join('\n') + `\n\nEach card: \`board/items/<id>.json\`.` : 'None that name you as owner or wait on you.'}
`
    const tail = `\n## What this pack cost you\n\n${n(Buffer.byteLength(md))} bytes (about ${n(tok(Buffer.byteLength(md)))} tokens, estimated as bytes / 4). It points at ${stands.size} files of ${n([...stands.values()].reduce((a, b) => a + b, 0))} bytes; your own files are ${n(mineBytes)} bytes.\n`
    fs.writeFileSync(path.join(P, role + '.md'), md + tail)
    sizes.push({ pack: role + '.md', role, agent, bytes: Buffer.byteLength(md + tail), stands_for: { files: stands.size, bytes: [...stands.values()].reduce((a, b) => a + b, 0) }, own_files: { files: mine.length, bytes: mineBytes } })
    roles.push(role)
}

// ---------------------------------------------------------------- what it costs: the pack against the files it stands for
const B = f => stat(f)?.bytes || 0
const whole = { six: ['CLAUDE.md', 'BRIEF.md', 'agents/JOBS.md', 'ROADMAP.md', 'PIPELINE.md', 'REALITY.md'], ten: ['CLAUDE.md', 'BRIEF.md', 'agents/JOBS.md', 'ROADMAP.md', 'PIPELINE.md', 'REALITY.md', 'RESTRUCTURE.md', 'design/README.md', 'agents/policy.json', 'library/glossary.md'] }
const sum = l => l.reduce((a, f) => a + B(f), 0)
const sz = k => (sizes.find(s => s.pack === k) || { bytes: 0 }).bytes
const rolesSz = sizes.filter(s => s.role).map(s => s.bytes).sort((a, b) => a - b), median = rolesSz[Math.floor(rolesSz.length / 2)] || 0
const startCost = sz('start.md') + sz('state.json') + median
const cost = {
    about: 'What each part of the briefing pack costs to read, against the files it stands for. Bytes are measured; tokens are ESTIMATED as bytes / 4 (a rule of thumb for English and JSON; the real count depends on the model\'s tokenizer and is for incident.accountant@ to measure in a session). "Starting from whole files" is what the start prompts of 10 and 11 November asked each new agent to read: six to ten whole files.',
    by: ME, updated: iso, made_by: 'tools/library-pack.mjs', token_rule: 'bytes / 4, an estimate, not a measurement',
    start_from_the_pack: { reads: ['start.md', 'state.json', 'one role pack (the median)'], bytes: startCost, tokens_estimated: tok(startCost) },
    start_from_whole_files: { six: { files: whole.six, bytes: sum(whole.six), tokens_estimated: tok(sum(whole.six)) }, ten: { files: whole.ten, bytes: sum(whole.ten), tokens_estimated: tok(sum(whole.ten)) } },
    saving_estimated: { against_six: `${Math.round(100 * (1 - startCost / (sum(whole.six) || 1)))}%`, against_ten: `${Math.round(100 * (1 - startCost / (sum(whole.ten) || 1)))}%`, note: 'Reading only. It does not count what an agent then opens from the pack\'s pointers, nor the tokens of the session\'s own tools and replies. Measured in a real session: not yet.' },
    packs: sizes.map(s => ({ ...s, tokens_estimated: tok(s.bytes), stands_for_tokens_estimated: tok(s.stands_for.bytes) }))
}
fs.writeFileSync(path.join(P, 'sizes.json'), JSON.stringify(cost, null, 1) + '\n')
fs.writeFileSync(path.join(P, 'README.md'), `# The briefing pack: start an agent here, not from the whole repository

> Kept by ${ME}, ${stamp}: written by [tools/library-pack.mjs](${view('tools/library-pack.mjs')}) on every push. Asked for by Dinis Cruz (11 November, about 02:50 UTC, [BRIEF.md](../../BRIEF.md)): "the librarian saves tokens and makes it cheaper and implements memory in a much more effective way". Back to [the library](../README.md).

**How to use it.** A new agent reads three things: [start.md](start.md) (the rules, the shape, how to release), [state.json](state.json) (the incident now) and its own role pack below. Each line points at the file it summarises, with its size and sha256 at this build: open a file only when you need its detail, and if the hash has changed since, the summary may be stale. For how the project got here: [history.md](history.md).

## What it costs

Bytes are measured at this build. **Tokens are estimated as bytes / 4**; the real figure is for incident.accountant@ to measure in a session, and is **not yet** measured.

| To start an agent | Bytes | Tokens (estimated) |
|---|---|---|
| from the pack: start.md, state.json and one role pack (the median) | ${n(startCost)} | about ${n(tok(startCost))} |
| from six whole files, as the first start prompts asked (${whole.six.map(f => f.split('/').pop()).join(', ')}) | ${n(sum(whole.six))} | about ${n(tok(sum(whole.six)))} |
| from ten whole files, as the later ones did | ${n(sum(whole.ten))} | about ${n(tok(sum(whole.ten)))} |

Estimated saving on the reading alone: **${cost.saving_estimated.against_six} against six files, ${cost.saving_estimated.against_ten} against ten**. It does not count what the agent then opens from the pointers, and a pack that misleads costs more than it saves: the test is whether an agent started from it does the job without re-reading the repository. The figures as data: [sizes.json](sizes.json).

## The packs

| Pack | For | Bytes | Tokens (est.) | Stands for |
|---|---|---|---|---|
| [start.md](start.md) | every agent | ${n(sz('start.md'))} | ${n(tok(sz('start.md')))} | ${(s => `${s.files} files, ${n(s.bytes)} bytes`)(sizes.find(s => s.pack === 'start.md')?.stands_for || { files: 0, bytes: 0 })} |
| [state.json](state.json) | every agent | ${n(sz('state.json'))} | ${n(tok(sz('state.json')))} | ${(s => `${s.files} files, ${n(s.bytes)} bytes`)(sizes.find(s => s.pack === 'state.json').stands_for)} |
| [history.md](history.md) | when the past matters | ${n(sz('history.md'))} | ${n(tok(sz('history.md')))} | ${(s => `${s.files} files, ${n(s.bytes)} bytes`)(sizes.find(s => s.pack === 'history.md')?.stands_for || { files: 0, bytes: 0 })} |
${sizes.filter(s => s.role).map(s => `| [${s.role}.md](${s.role}.md) | ${short(s.agent)} | ${n(s.bytes)} | ${n(tok(s.bytes))} | its own ${s.own_files.files} files, ${n(s.own_files.bytes)} bytes; points at ${s.stands_for.files} |`).join('\n')}

## What it is not

Not a copy of the repository, and not memory an agent can trust blindly: it is rebuilt from the files on every push, it says where each line came from, and the file wins when they disagree. Session-private notes, keys and anything about people are never in it.
`)
console.log(`library-pack: start, state, history and ${roles.length} role packs -> ${path.relative(ROOT, OUT) || OUT}/library/pack/ (start from the pack: ${n(startCost)} bytes against ${n(sum(whole.six))} and ${n(sum(whole.ten))})`)
