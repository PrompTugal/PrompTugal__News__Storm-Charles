#!/usr/bin/env node
// Keep the board true to the agents' status files (kept by incident.board@web-summit.dinis). Run at each wake, before the cards
// are moved by hand; it does only the mechanical part and says what it did. It writes board/items/*.json only.
//   node tools/board-sync.mjs            do it
//   node tools/board-sync.mjs --dry      say what it would do
// 1. A line in an agent's "asks" or "next" that no card covers becomes a card: an ask (a-<role>-<n>, waiting on whoever the line
//    names first) or a job (j-<role>-<n>). The card's words are the agent's own line; nothing is added to it.
// 2. A card whose line was reworded (same agent, same list, mostly the same words) follows the new line.
// 3. A job whose line has left its owner's "next" list moves to done, and its history says exactly that and no more.
// 4. An ask this tool opened (the agent's own words, nothing joined) follows its line out the same way. An ask written or joined
//    by hand whose every line is gone is NOT closed here: it is listed, for the board's keeper to read why.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DRY = process.argv.includes('--dry')
const ME = process.env.AGENT || 'incident.board@web-summit.dinis'
const NOW = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const DIR = path.join(ROOT, 'board/items')
const sha = s => crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, 12)
const str = x => typeof x === 'string' ? x : JSON.stringify(x)
const clean = s => String(s).replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '(session)').replace(/\bsession_[A-Za-z0-9]{8,}\b/g, '(session)').replace(/\btrig_[A-Za-z0-9]{8,}\b/g, '(scheduled task)')
const full = n => /@$/.test(n) ? n + 'web-summit.dinis' : n
const words = s => new Set(clean(s).toLowerCase().match(/[a-z0-9À-ÿ]{3,}/g) || [])
const alike = (a, b) => { const A = words(a), B = words(b); let n = 0; for (const w of A) if (B.has(w)) n++; return n / Math.max(1, A.size + B.size - n) }

const cards = Object.fromEntries(fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => [f.slice(0, -5), JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'))]))
const touched = new Set(), said = []
const say = s => { said.push(s); console.log(s) }
const log = (it, change) => { it.history.push({ at: NOW, by: ME, change }); it.updated_utc = NOW; it.updated = NOW; touched.add(it.id) }

// the lines as they stand
const lines = []
for (const role of fs.readdirSync(path.join(ROOT, 'agents')).sort()) {
    const file = `agents/${role}/status.json`
    if (!fs.existsSync(path.join(ROOT, file))) continue
    let s; try { s = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8')) } catch { continue }
    for (const field of ['asks', 'next']) (Array.isArray(s[field]) ? s[field] : []).forEach(raw => lines.push({ role, file, field, agent: s.agent || `incident.${role}@web-summit.dinis`, text: str(raw), sha: sha(str(raw)), updated: s.updated }))
}
const key = x => `${x.file}|${x.field}|${x.sha}`
const live = new Map(lines.map(l => [key(l), l]))
const filed = new Set(Object.values(cards).flatMap(c => (c.sources || []).map(key)))
let unfiled = lines.filter(l => !filed.has(key(l)))

// 2. reworded lines: the card follows
for (const c of Object.values(cards)) for (const s of c.sources || []) {
    if (live.has(key(s))) continue
    const best = unfiled.filter(l => l.file === s.file && l.field === s.field).map(l => ({ l, score: alike(s.full ? l.text : clean(l.text).slice(0, 70), s.full || s.starts) })).sort((a, b) => b.score - a.score)[0]
    if (best && best.score >= 0.5) {
        say(`${c.id}: follows the reworded line in ${s.file} (${s.field})`)
        s.sha = best.l.sha; s.starts = clean(best.l.text).slice(0, 70); s.full = clean(best.l.text)
        log(c, `the line this card came from was reworded in ${s.file}; the card follows it: "${clean(best.l.text).slice(0, 160)}${best.l.text.length > 160 ? '…' : ''}"`)
        unfiled = unfiled.filter(l => l !== best.l)
    }
}

// 3 and 4. lines that are gone
const toRead = []
for (const c of Object.values(cards)) {
    const src = c.sources || []; if (!src.length || ['done', 'answered'].includes(c.state)) continue
    const gone = src.filter(s => !live.has(key(s)))
    if (!gone.length) continue
    if (gone.length < src.length) { c.sources = src.filter(s => live.has(key(s))); log(c, `no longer listed in ${[...new Set(gone.map(s => s.file))].join(', ')}; still listed in ${[...new Set(c.sources.map(s => s.file))].join(', ')}`); say(`${c.id}: one of its lines is gone, the card stays`); continue }
    if (c.kind === 'job') { const was = c.state; c.state = 'done'; c.waiting_on = ''; log(c, `${was} → done: the line is no longer in the "next" list of ${gone[0].file} (read ${NOW.slice(11, 16)} UTC); finished or dropped by its owner, whose status file says which`); say(`${c.id}: job left its owner's next list → done`) }
    // an ask this tool opened in the agent's own words follows its line out: the owner took it off its list
    else if (/^a-[a-z]+-\d+$/.test(c.id) && gone.every(g => g.full)) { const was = c.state; c.state = 'done'; c.waiting_on = ''; log(c, `${was} → done: its owner no longer lists it in ${gone[0].file} (read ${NOW.slice(11, 16)} UTC): met or withdrawn, the owner's status file says which`); say(`${c.id}: ask left its owner's list → done`) }
    else toRead.push(c.id)
}

// 1. new lines become cards
const nextId = (prefix) => { let n = 1; while (cards[`${prefix}-${n}`]) n++; return `${prefix}-${n}` }
for (const l of unfiled) {
    const text = clean(l.text), isAsk = l.field === 'asks'
    const m = isAsk && text.match(/^((?:incident\.)?[A-Za-z.]+@?|Dinis|everyone|every agent|conductor)(?:\s*(?:\/|and|,)\s*((?:incident\.)?[A-Za-z.]+@?|Dinis))?\s*(?:\([^)]*\))?:\s*/)
    let waiting = ''
    if (m) { const names = [m[1], m[2]].filter(Boolean); waiting = names.includes('Dinis') ? 'Dinis' : /^every/.test(names[0]) ? 'every agent' : names[0] === 'conductor' ? 'incident.conductor@web-summit.dinis' : /@$/.test(names[0]) ? full(names[0].startsWith('incident.') ? names[0] : names[0]) : '' }
    const body = m ? text.slice(m[0].length) : text
    const first = body.split(/(?<=[.;:?])\s/)[0]
    const title = (isAsk ? '' : l.agent.split('@')[0] + '@: ') + (first.length > 118 ? first.slice(0, 115).replace(/\s+\S*$/, '') + '…' : first.replace(/[.;:]$/, ''))
    const standing = !isAsk && (/^(each|hourly|at each|re-read)\b/i.test(text) || /each (hourly )?wake/i.test(text))
    const id = nextId(`${isAsk ? 'a' : 'j'}-${l.role}`)
    const opened = /^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(l.updated || '') && l.updated < NOW ? l.updated.replace(/^(\d{4}-\d\d-\d\dT\d\d:\d\d)(:\d\d)?.*$/, (_, a, b) => a + (b || ':00') + 'Z') : NOW
    cards[id] = {
        id, kind: isAsk ? 'ask' : 'job', title: title[0].toUpperCase() + title.slice(1), state: standing ? 'watching' : 'open', opened_utc: opened, updated_utc: NOW,
        owner: l.agent, raised_by: [l.agent], waiting_on: waiting, summary: text,
        closes: isAsk ? 'The one it waits on answers, and the asking agent\'s status file no longer lists it.' : standing ? 'A standing job: watched while the incident is open.' : 'The agent\'s status file lists it under done.',
        links: [], evidence: [`file:${l.file}`], sources: [{ file: l.file, field: l.field, sha: l.sha, starts: text.slice(0, 70), full: text }],
        history: [{ at: NOW, by: ME, change: `card opened from the "${l.field}" list in ${l.file}, in the agent's own words` }], by: ME, updated: NOW
    }
    touched.add(id); say(`${id}: new ${isAsk ? 'ask' : 'job'}${waiting ? ' waiting on ' + waiting : ''}: ${title.slice(0, 90)}`)
}

if (!DRY) for (const id of touched) fs.writeFileSync(path.join(DIR, id + '.json'), JSON.stringify(cards[id], null, 2) + '\n')
for (const id of toRead) console.log(`READ ${id}: every line it came from is gone (${cards[id].sources.map(s => s.file).join(', ')}): met, withdrawn or moved? Move it by hand with tools/board-item.mjs`)
console.log(`${DRY ? 'dry run: ' : ''}${touched.size} cards written, ${toRead.length} to read by hand`)
