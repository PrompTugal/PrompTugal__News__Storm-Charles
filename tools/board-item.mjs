#!/usr/bin/env node
// Move a card on the board and record the move in its history (kept by incident.board@web-summit.dinis).
//   node tools/board-item.mjs <id> --state watching --change "what changed and where it was read" [--waiting-on "Web Summit"]
//   node tools/board-item.mjs <id> --answer "the answer in one sentence" --evidence s-1110T0718,ipma-red-wind --label fact --change "..."
//   node tools/board-item.mjs <id> --add-evidence s-1111T0146 --change "..."
// Writes board/items/<id>.json only. An answer needs evidence ids that tools/board-build.mjs --check can resolve; for a question
// or a conflict at least one of them must be a fact (read at the primary source). Nothing is answered from our own reasoning.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [id, ...rest] = process.argv.slice(2)
const arg = k => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : undefined }
const file = path.join(ROOT, 'board/items', `${id}.json`)
if (!id || !fs.existsSync(file)) { console.error(`board-item: no card "${id}" (ids are permanent: a new card is a new file)`); process.exit(2) }
const change = arg('change')
if (!change) { console.error('board-item: --change "what changed and where it was read" is required: every move is recorded'); process.exit(2) }
const it = JSON.parse(fs.readFileSync(file, 'utf8')), before = fs.readFileSync(file, 'utf8')
const by = process.env.AGENT || 'incident.board@web-summit.dinis'
const now = (arg('at') || new Date().toISOString()).replace(/\.\d+Z$/, 'Z')
const was = it.state
if (arg('state')) it.state = arg('state')
if (arg('waiting-on') !== undefined) it.waiting_on = arg('waiting-on')
if (arg('owner')) it.owner = arg('owner')
if (arg('add-evidence')) it.evidence = [...new Set([...(it.evidence || []), ...arg('add-evidence').split(',').map(s => s.trim()).filter(Boolean)])]
if (arg('answer')) {
    const evidence = (arg('evidence') || '').split(',').map(s => s.trim()).filter(Boolean)
    it.answer = { text: arg('answer'), label: arg('label') || 'fact', evidence, at: now, by }
    it.evidence = [...new Set([...(it.evidence || []), ...evidence])]
    it.state = 'answered'; it.waiting_on = ''
}
it.history.push({ at: now, by, change: (it.state !== was ? `${was} → ${it.state}: ` : '') + change })
it.updated_utc = now; it.updated = now; it.by = it.by || by
fs.writeFileSync(file, JSON.stringify(it, null, 2) + '\n')
try { execFileSync(process.execPath, [path.join(ROOT, 'tools/board-build.mjs'), '--check'], { stdio: 'pipe' }) }
catch (e) { fs.writeFileSync(file, before); console.error('board-item: the card would break a rule; nothing changed\n' + String(e.stdout || e.message).split('\n').filter(l => l.startsWith('FAIL')).join('\n')); process.exit(1) }
console.log(`${id}: ${was}${it.state !== was ? ' → ' + it.state : ''} · ${change}`)
