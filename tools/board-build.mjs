#!/usr/bin/env node
// The board: board/items/*.json -> <out>/board/ (kept by incident.board@web-summit.dinis).
//   node tools/board-build.mjs --out _site     for the build: writes only <out>/board/**, never a tracked file
//   node tools/board-build.mjs --check         writes nothing: prints what a wake must look at (unfiled lines, stale cards,
//                                              evidence that does not resolve) and exits 1 if a card breaks a rule
// Writes: board/index.json (every card, joined to its evidence), board/tasks.json (the contributor tasks), and the pages as
// markdown (the build turns each into a page with its twin): index.md (mounts app/board/), for-dinis.md, tasks.md, items/<id>.md.
// Reads only the working tree, never git history: the cards, agents/*/status.json, the incidents' data/signals.json (timeline
// rows) and data/decisions/graph.json (decision edges). A card's answer is never made here: only what a card file says is shown.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outAt = process.argv.indexOf('--out'), CHECK = process.argv.includes('--check')
if (outAt < 0 && !CHECK) { console.error('board-build: --out <dir> (or --check)'); process.exit(2) }
const OUT = outAt > 0 ? path.join(path.resolve(process.argv[outAt + 1]), 'board') : null
const ME = 'incident.board@web-summit.dinis'
const STATES = ['open', 'watching', 'blocked', 'answered', 'done']
const KINDS = ['question', 'conflict', 'ask', 'job', 'task-for-contributors']
const STATE_SAYS = { open: 'nobody has closed it and nothing is known to stand in the way', watching: 'an agent re-reads the place where the answer would appear', blocked: 'it cannot move until the one named under "waiting on" acts', answered: 'a primary source has said it; the card carries that evidence', done: 'finished, or no longer asked' }
const KIND_SAYS = { question: 'something the authorities or the organisers have not said', conflict: 'two sources disagree', ask: 'something waiting on Dinis or on another agent', job: 'work an agent has taken on', 'task-for-contributors': 'something a reader could do now' }

const exists = rel => fs.existsSync(path.join(ROOT, rel))
const readJ = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'))
const sha = s => crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 12)
const str = x => typeof x === 'string' ? x : JSON.stringify(x)
// session ids, scheduled-task ids and session links never reach a page
const clean = v => typeof v === 'string'
    ? v.replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '(session)').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '(session)').replace(/\btrig_[A-Za-z0-9]{8,}\b/g, '(scheduled task)')
    : Array.isArray(v) ? v.map(clean) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, clean(x)])) : v
const short = a => String(a || '').replace(/@web-summit\.dinis$/, '@')
const hm = t => String(t || '').replace('T', ' ').slice(0, 16)

// ---------------------------------------------------------------- what evidence can point at
const rows = {}, edges = {}
for (const inc of fs.readdirSync(path.join(ROOT, 'incidents'))) {
    const dir = `incidents/${inc}/`
    try { for (const x of readJ(dir + 'data/signals.json').items || []) rows[x.id] = { type: 'timeline row', id: x.id, at: x.at, label: x.label, text: x.text, path: `${dir}timeline.html#${x.id}` } } catch { }
    try { for (const e of readJ(dir + 'data/decisions/graph.json').edges || []) edges[e.id] = { type: 'decision', id: e.id, at: e.at || '', label: e.label, status: e.status, text: e.decision, source: /^https:\/\//.test(e.source || '') ? e.source : '', read_utc: e.read || '', path: `${dir}data/decisions/graph.json` } } catch { }
}
const pageOf = rel => rel.replace(/(^|\/)README\.md$/, '$1index.html').replace(/\.md$/, '.html')
function resolve(ref) {
    if (rows[ref]) return rows[ref]
    if (edges[ref]) return edges[ref]
    if (ref.startsWith('file:')) { const rel = ref.slice(5); return exists(rel) ? { type: 'file', id: rel, text: rel, path: !OUT || fs.existsSync(path.join(OUT, '..', rel)) ? pageOf(rel) : '' }   // a file the site does not serve is named, not linked
        : { type: 'unresolved', id: ref, text: `${rel}: no such file in the repository` } }
    return { type: 'unresolved', id: ref, text: 'not found among the timeline rows, the decision edges or the files' }
}

// ---------------------------------------------------------------- the cards
const problems = [], notes = []
const DIR = path.join(ROOT, 'board/items')
const items = fs.readdirSync(DIR).filter(f => f.endsWith('.json')).sort().map(f => {
    const it = clean(readJ('board/items/' + f))
    if (it.id !== f.slice(0, -5)) problems.push(`${f}: id "${it.id}" is not the file's name (ids are permanent)`)
    if (!KINDS.includes(it.kind)) problems.push(`${it.id}: kind "${it.kind}"`)
    if (!STATES.includes(it.state)) problems.push(`${it.id}: state "${it.state}"`)
    for (const k of ['title', 'opened_utc', 'updated_utc', 'owner', 'by', 'updated']) if (!it[k]) problems.push(`${it.id}: no ${k}`)
    if (!Array.isArray(it.history) || !it.history.length) problems.push(`${it.id}: no history`)
    if (it.state === 'blocked' && !it.waiting_on) problems.push(`${it.id}: blocked, and not on whom`)
    // a question or a conflict is answered only by evidence, and for a question that evidence is a fact (read at the primary source)
    if (it.state === 'answered') {
        const ev = (it.answer?.evidence || []).map(resolve)
        if (!it.answer?.text || !ev.length || ev.some(e => e.type === 'unresolved')) problems.push(`${it.id}: answered, without an answer that points at evidence we hold`)
        else if (['question', 'conflict'].includes(it.kind) && !ev.some(e => e.label === 'fact')) problems.push(`${it.id}: answered, but none of the answer's evidence is a fact from a primary source`)
    }
    // never a contact detail, never a personal address on a card
    const text = JSON.stringify(it)
    const mail = (text.match(/[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z0-9.-]+/g) || []).filter(m => !/@(web-summit|PrompTugal)\.(dinis|vicky)$/i.test(m))
    if (mail.length) problems.push(`${it.id}: something that looks like an address (${mail.length}): cards carry no contact details`)
    if (/\+?\d[\d ()-]{8,}\d/.test(text.replace(/\d{4}-\d\d-\d\d(T[\d:.]+Z?)?/g, '').replace(/\d\d:\d\d(:\d\d)?/g, '').replace(/"sha":\s*"[0-9a-f]+"/g, '').replace(/\d{1,2} \d{3}/g, ''))) notes.push(`${it.id}: a long number: check it is not a phone number`)
    if (/(bsky\.app\/profile|mastodon|twitter\.com|x\.com|facebook\.com|instagram\.com|linkedin\.com\/in)\//i.test(text)) problems.push(`${it.id}: a link to a personal or social address: write "a public post" and keep the address out`)
    it.url = `board/items/${it.id}.html`
    it.evidence_resolved = (it.evidence || []).map(resolve)
    for (const e of it.evidence_resolved) if (e.type === 'unresolved') notes.push(`${it.id}: evidence ${e.id} does not resolve`)
    return it
})
const byId = Object.fromEntries(items.map(i => [i.id, i]))
for (const it of items) for (const l of it.links || []) if (!byId[l]) problems.push(`${it.id}: links to ${l}, which is not a card`)

// ---------------------------------------------------------------- the status files: every ask and every next line should be on a card
const filed = new Set(items.flatMap(i => (i.sources || []).map(s => `${s.file}|${s.field}|${s.sha}`)))
const live = new Set(), unfiled = [], agents = {}
const agent = name => agents[name] ||= { name, role: (name.match(/^[a-z]+\.([a-z0-9-]+)@/) || [, ''])[1], state: '', blocked: false, status_updated: '', owns: [], raised: [], waited_on: [] }
for (const role of fs.readdirSync(path.join(ROOT, 'agents')).sort()) {
    const file = `agents/${role}/status.json`
    if (!exists(file)) continue
    let s; try { s = readJ(file) } catch { notes.push(`${file}: not valid JSON`); continue }
    const a = agent(s.agent || `incident.${role}@web-summit.dinis`)
    a.state = clean(str(s.state || '')); a.blocked = /\bblocked\b/i.test(a.state); a.status_updated = s.updated || ''; a.status = file
    for (const field of ['asks', 'next']) (Array.isArray(s[field]) ? s[field] : []).forEach(raw => {
        const key = `${file}|${field}|${sha(str(raw))}`; live.add(key)
        if (!filed.has(key)) unfiled.push({ file, field, agent: a.name, text: clean(str(raw)) })
    })
}
const stale = []
for (const it of items) {
    agent(it.owner).owns.push(it.id)
    for (const r of it.raised_by || []) if (r !== it.owner) agent(r).raised.push(it.id)
    if (agents[it.waiting_on]) agents[it.waiting_on].waited_on.push(it.id)
    const gone = (it.sources || []).filter(s => !live.has(`${s.file}|${s.field}|${s.sha}`))
    it.sources_gone = gone.map(s => `${s.file} (${s.field}): "${s.starts}…"`)
    if (gone.length && !['done', 'answered'].includes(it.state)) stale.push({ id: it.id, gone: it.sources_gone, all: gone.length === it.sources.length })
}
for (const u of unfiled) notes.push(`not on a card yet: ${u.file} ${u.field}: ${u.text.slice(0, 90)}`)
for (const s of stale) notes.push(`${s.id}: ${s.all ? 'every' : 'one'} line it came from is no longer in the status file${s.all ? ' (met or withdrawn? move the card)' : ''}`)

if (CHECK || problems.length) {
    for (const n of notes) console.log('NOTE ' + n)
    for (const p of problems) console.log('FAIL ' + p)
    console.log(`${problems.length ? 'RED' : 'OK'}: ${items.length} cards, ${notes.length} to look at, ${problems.length} broken`)
    if (problems.length) process.exit(1)   // nothing is written when a card breaks a rule
    if (CHECK) process.exit(0)
}

// ---------------------------------------------------------------- the joined data
const made = items.map(i => i.updated_utc).sort().pop()   // the board is as fresh as its newest card: the same input gives the same bytes
const count = (k, vals) => Object.fromEntries(vals.map(v => [v, items.filter(i => i[k] === v).length]))
// for Dinis: the asks themselves; a job that is blocked behind one of them is counted under it (unblocks), not listed again
const openNow = i => !['done', 'answered'].includes(i.state)
for (const i of items) i.unblocks = items.filter(x => x.id !== i.id && openNow(x) && (x.links || []).includes(i.id) && x.state === 'blocked').map(x => x.id)
const dinis = items.filter(i => i.waiting_on === 'Dinis' && i.kind === 'ask' && openNow(i)).sort((a, b) => (a.rank || 99) - (b.rank || 99) || a.id.localeCompare(b.id))
const tasks = items.filter(i => i.kind === 'task-for-contributors')
const index = {
    about: 'The board of the Storm Charles incident: every open question, conflict between sources, ask, job and task for contributors as one card, joined to its evidence (timeline rows, decision edges, files). Made by tools/board-build.mjs from board/items/*.json (the source: one file per card, ids permanent) and agents/*/status.json. A question is answered only by a primary source; nothing here is a forecast or advice. Not a warning service.',
    by: ME, updated: made,
    states: STATE_SAYS, kinds: KIND_SAYS,
    counts: { cards: items.length, by_state: count('state', STATES), by_kind: count('kind', KINDS), waiting_on_dinis: items.filter(i => i.waiting_on === 'Dinis' && openNow(i)).length, asks_to_dinis: dinis.length },
    for_dinis: dinis.map(i => i.id),
    by_agent: Object.fromEntries(Object.values(agents).map(a => [a.name, { owns: a.owns, raised: a.raised, waited_on: a.waited_on, open: [...new Set([...a.owns, ...a.raised, ...a.waited_on])].filter(id => openNow(byId[id])).length }])),
    agents: Object.values(agents).sort((a, b) => a.name.localeCompare(b.name)),
    not_on_a_card_yet: unfiled,
    cards_whose_source_line_is_gone: stale,
    items
}
const GROUP = { 'send public data': 'data', validate: 'validate', research: 'research' }
const tasksJson = { about: 'What a reader could do now for the Storm Charles record. One list for the Contribute page (incident.media@) and anyone else: id is the card\'s permanent id on the board, contribute_id the number Contribute prints (C-01 ...; null until incident.media@ gives one). status: open, claimed or done. How to send an answer: contribute.html. Made from board/items/t-*.json.', by: ME, updated: made, how: 'contribute.html', groups: { data: 'Send us data', validate: 'Validate', research: 'Research' },
    tasks: tasks.sort((a, b) => (a.contribute_id || 'C-99').localeCompare(b.contribute_id || 'C-99') || a.id.localeCompare(b.id)).map(i => ({ id: i.id, contribute_id: i.contribute_id || null, group: GROUP[i.task_type] || 'research', title: i.title, why: i.summary, best_placed: i.best_placed || '', done_when: i.closes, links: [`board/items/${i.id}.html`, ...(i.links || []).map(l => `board/items/${l}.html`)], where_we_look: i.where_we_look || [], helps_close: i.links || [], status: ['done', 'answered'].includes(i.state) ? 'done' : i.claimed_by ? 'claimed' : 'open', state: i.state, waiting_on: i.waiting_on || '', evidence: i.evidence || [], by: i.by, updated: i.updated_utc, page: `board/items/${i.id}.html` })) }

// ---------------------------------------------------------------- the pages, as markdown
const who = (a, up) => /@web-summit\.dinis$/.test(a || '') ? `[${t(short(a))}](${up}agents/index.html?who=${encodeURIComponent(a)})` : t(short(a))
const t = s => String(s ?? '').replace(/\|/g, '/').replace(/\[/g, '(').replace(/\]/g, ')').replace(/\s+/g, ' ').trim()   // safe inside a link's text
const kept = `> Kept by ${ME}, ${new Date(made).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' })}, ${made.slice(11, 16)} UTC`
const cardLine = (i, up) => `- [${t(i.title)}](${up}items/${i.id}.md) · ${i.kind} · **${i.state}**${i.waiting_on ? ` · waiting on ${t(short(i.waiting_on))}` : ''} · ${t(short(i.owner))}`
const out = {}

out['index.md'] = `---
title: The board: what is still open
summary: Every open question, conflict, ask, job and task for contributors on Storm Charles as one card, each joined to its evidence.
mount: <div id="board" data-base="../"><p class="meta">The board needs JavaScript to draw its columns; every card is listed below and in <a href="index.json">index.json</a>.</p></div>
head: <link rel="stylesheet" href="../app/board/board.css"><script src="../app/board/board.js" defer></script>
---
# The board: what is still open

${kept}

What nobody with the authority to say it has said yet, where two sources disagree, what waits on a person, and what a reader could do now. Each is a card with its evidence, its history and what would close it. ${items.length} cards: ${STATES.map(s => `${index.counts.by_state[s]} ${s}`).join(', ')}. **${dinis.length} asks wait on Dinis**: [the list for him](for-dinis.md). For readers: [what you can do now](tasks.md).

A question is answered only by a primary source: the body that decides or warns, on its own channel. A press report moves a card to *watching*, never to *answered*. Not a warning service: nothing here is a forecast or advice.

${KINDS.map(k => { const l = items.filter(i => i.kind === k && !(k === 'job' && i.state === 'done')); return `## ${k === 'task-for-contributors' ? 'Tasks for contributors' : k[0].toUpperCase() + k.slice(1) + (k === 'ask' ? 's' : k === 'job' ? 's' : 's')} (${l.length})\n\n${KIND_SAYS[k][0].toUpperCase() + KIND_SAYS[k].slice(1)}.\n\n${l.map(i => cardLine(i, '')).join('\n')}` }).join('\n\n')}

## The states

${STATES.map(s => `- **${s}**: ${STATE_SAYS[s]}`).join('\n')}

## The data

- [index.json](index.json): every card joined to its evidence, the agents with their cards, and what is not on a card yet.
- [tasks.json](tasks.json): the contributor tasks.
- One file per card: \`board/items/<id>.json\` (the source; ids are permanent).${unfiled.length ? `\n\n## Not on a card yet (${unfiled.length})\n\nLines in the agents' status files that no card covers yet:\n\n${unfiled.map(u => `- ${t(short(u.agent))} (${u.field}): ${t(u.text).slice(0, 200)}`).join('\n')}` : ''}
`

out['for-dinis.md'] = `---
title: For Dinis: what waits on you
summary: Only what waits on Dinis Cruz, most blocking first, each in one plain sentence.
---
# For Dinis: what waits on you

${kept}

${dinis.length} things wait on you: first what stands before the launch, then the rest, each group with the most blocking first. Each line is the ask in one sentence; the card behind it says who raised it, what it blocks and what would close it. [The whole board](index.md).

${[['Before the launch', dinis.filter(i => i.before_launch)], ['After that', dinis.filter(i => !i.before_launch)]].filter(g => g[1].length).map(([h, l]) => `## ${h}\n\n${l.map(i => { const n = dinis.indexOf(i); return `${n + 1}. **${t(i.title).replace(/[.?]$/, m => m === '?' ? '?' : '')}${/\?$/.test(i.title) ? '' : '.'}** ${t(i.summary)}${i.blocks ? ` *Blocks:* ${t(i.blocks)}` : ''}${i.unblocks.length ? ` *Cards behind it:* ${i.unblocks.map(id => `[${id}](items/${id}.md)`).join(', ')}.` : ''} Raised by ${(i.raised_by || []).map(short).map(t).join(', ') || t(short(i.owner))}. [The card](items/${i.id}.md)` }).join('\n')}`).join('\n\n')}

## Agents that say they are blocked

${Object.values(agents).filter(a => a.blocked).map(a => `- **${t(short(a.name))}**: ${t(a.state)}${a.owns.concat(a.raised).filter(id => byId[id].waiting_on === 'Dinis').length ? ` Its cards waiting on you: ${[...new Set(a.owns.concat(a.raised))].filter(id => byId[id].waiting_on === 'Dinis' && !['done', 'answered'].includes(byId[id].state)).map(id => `[${id}](items/${id}.md)`).join(', ')}.` : ''}`).join('\n') || 'None says so in its status file.'}

How to answer: say it to the conductor in your session. Never paste a token or a key in a chat or on a page.
`

out['tasks.md'] = `---
title: What you can do right now
summary: Tasks a reader, a journalist or a specialist could do now for the Storm Charles record: validate, send public data, research.
---
# What you can do right now

${kept}

${tasks.filter(i => !['done', 'answered'].includes(i.state)).length} things a reader could do now. Each helps close a card on [the board](index.md). How to send what you find, and what we publish back: [Contribute](../contribute.md). We take public sources only: an address anyone can open, the time it was published and the time you read it (UTC). No private messages, no contact details, nothing about private people.

${['validate', 'send public data', 'research'].map(ty => { const l = tasks.filter(i => i.task_type === ty && !['done', 'answered'].includes(i.state)); return l.length ? `## ${ty[0].toUpperCase() + ty.slice(1)}\n\n${l.map(i => `- **${i.contribute_id ? i.contribute_id + ' · ' : ''}[${t(i.title)}](items/${i.id}.md)**: ${t(i.summary)}${i.best_placed ? ` *Best placed:* ${t(i.best_placed)}.` : ''} *A good answer:* ${t(i.closes)}${i.state === 'blocked' ? ` *(Held: waiting on ${t(short(i.waiting_on))}.)*` : ''}`).join('\n')}` : '' }).filter(Boolean).join('\n\n')}

Not a warning service: for the weather itself, IPMA and ANEPC.
`

const evLine = (e, up) => e.type === 'timeline row' ? `- timeline row [${e.id}](${up}${e.path}) · ${e.label} · ${hm(e.at)} UTC: ${t(e.text).slice(0, 260)}`
    : e.type === 'decision' ? `- decision edge \`${e.id}\` ([the decision graph](${up}${e.path})) · ${e.label} · ${e.status}${e.at ? ` · ${hm(e.at)} UTC` : ''}: ${t(e.text).slice(0, 260)}${e.source ? ` · source, leaving this site: [${t(new URL(e.source).host)}](${e.source}), read ${hm(e.read_utc)} UTC` : ''}`
        : e.type === 'file' ? (e.path ? `- file [${t(e.id)}](${up}${e.path})` : `- file \`${t(e.id)}\` (in the repository; not served as a page)`)
            : `- **not resolved**: \`${t(e.id)}\` (${t(e.text)})`
for (const i of items) {
    const up = '../../'
    out[`items/${i.id}.md`] = `---
title: ${t(i.title)}
summary: ${t(i.summary).slice(0, 200)}
---
# ${t(i.title)}

${`> Kept by ${ME}, ${new Date(i.updated_utc).toLocaleDateString('en-GB', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' })}, ${i.updated_utc.slice(11, 16)} UTC`}

**${i.kind}** · state: **${i.state}** (${STATE_SAYS[i.state]})${i.waiting_on ? ` · waiting on **${who(i.waiting_on, up)}**` : ''} · owner: ${who(i.owner, up)}${(i.raised_by || []).length ? ` · raised by ${i.raised_by.map(a => who(a, up)).join(', ')}` : ''} · opened ${hm(i.opened_utc)} UTC${i.event_utc ? ` (first written down ${hm(i.event_utc)} UTC${i.event_source?.commit ? `, commit [${i.event_source.commit}](${up}app/agents/commit.html?sha=${i.event_source.commit})` : ''})` : ''} · card \`${i.id}\` on [the board](../index.md#${i.id})

${t(i.summary)}
${i.partly_answered ? `\n**Answered in part:** ${t(i.partly_answered.text)}\n` : ''}${i.answer ? `\n## The answer\n\n**${t(i.answer.text)}** (${t(i.answer.label || '')}; recorded ${hm(i.answer.at)} UTC by ${t(short(i.answer.by))})\n\n${(i.answer.evidence || []).map(resolve).map(e => evLine(e, up)).join('\n')}\n` : ''}${i.blocks || i.unblocks.length ? `\n## What it blocks\n\n${t(i.blocks || '')}${i.unblocks.length ? `\n\nCards behind this one:\n\n${i.unblocks.map(l => cardLine(byId[l], '../')).join('\n')}` : ''}\n` : ''}
## What would close it

${t(i.closes || 'Not written yet.')}
${i.who_answers ? `\nWho would answer: ${t(i.who_answers)}.` : ''}${(i.where_we_look || []).length ? `\n\nWhere we look (each leaves this site): ${i.where_we_look.map(u => `[${t(u.replace(/^https:\/\//, '').replace(/\/$/, ''))}](${u})`).join(', ')}.` : ''}
${(i.sides || []).length ? `\n## The two sides\n\n${i.sides.map(s => `- **${t(s.claim)}**: ${t(s.held_by)}${(s.evidence || []).length ? ` (${s.evidence.map(x => `\`${t(x.replace(/^file:/, ''))}\``).join(', ')})` : ''}`).join('\n')}\n` : ''}
## Evidence (${i.evidence_resolved.length})

${i.evidence_resolved.map(e => evLine(e, up)).join('\n') || 'None linked yet.'}
${(i.links || []).length ? `\n## Connected cards\n\n${i.links.map(l => cardLine(byId[l], '../')).join('\n')}\n` : ''}${(i.sources || []).length ? `\n## Where the card came from\n\n${i.sources.map(s => `- [${s.file}](${up}${s.file}) (${s.field}): "${t(s.starts)}…"${i.sources_gone.some(g => g.startsWith(s.file) && g.includes(s.starts)) ? ' · **no longer in that file**' : ''}`).join('\n')}\n` : ''}
## History

${i.history.map(h => `- ${hm(h.at)} UTC · ${t(short(h.by))}: ${t(h.change)}`).join('\n')}

The card as data: [${i.id}.json](${i.id}.json). Not a warning service.
`
}

fs.mkdirSync(path.join(OUT, 'items'), { recursive: true })
fs.writeFileSync(path.join(OUT, 'index.json'), JSON.stringify(index, null, 1) + '\n')
fs.writeFileSync(path.join(OUT, 'tasks.json'), JSON.stringify(tasksJson, null, 1) + '\n')
for (const [rel, md] of Object.entries(out)) fs.writeFileSync(path.join(OUT, rel), md)
console.log(`board: ${items.length} cards, ${Object.keys(out).length} pages -> ${path.relative(ROOT, OUT) || OUT}`)
