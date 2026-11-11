#!/usr/bin/env node
// lane-keystore.mjs: the one way to read the agents' public keys (incident.identity@web-summit.dinis, 11 November 2026).
//
// The key list is two places, because one file outgrew the gate's 256 KB limit at 22:52 UTC on 11 November:
//   data/keys.json                  the keys in use (status "active"), and any entry not yet archived. Agents add their
//                                   new session key here and mark their previous one "handed over", as before.
//   data/keys-archive/<role>.json   each agent's earlier keys ("handed over", "ended", "not used"), oldest first.
// Signatures made by an earlier key still verify: readers that need every key read both through this module.
//
//   import { readKeys } from './lane-keystore.mjs'
//   readKeys()            → { ...data/keys.json, keys: [every entry] }  per agent oldest first (archive, then data/keys.json)
//   readKeys({ active: true })  → the same with only status "active"
//   k[FROM]               → { file, index }: where that entry is, for a pointer such as `${file}#/keys/${index}`
//   node tools/lane-keystore.mjs --archive   move every entry that is not "active" from data/keys.json to the archive
//   node tools/lane-keystore.mjs --check     sizes and placement only (tools/lane-keys.mjs checks the keys themselves)
// Standalone on purpose (node:fs only), so any build tool can import it cheaply.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const MAIN = 'data/keys.json', ARCHIVE = 'data/keys-archive'
export const FROM = Symbol.for('lane-keystore.from')   // k[FROM] → { file, index }: a JSON pointer's file and place
const LIMIT = 240 * 1024   // under the gate's 256 KB, with room
const roleOf = agent => String(agent || '').split('@')[0].replace(/^incident\./, '') || 'unknown'
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')

export function archiveFiles(root = ROOT) {
    const dir = path.join(root, ARCHIVE)
    return fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().map(f => path.posix.join(ARCHIVE, f)) : []
}

/** Every key entry, from data/keys.json and data/keys-archive/*.json; an id in both is taken from data/keys.json. */
export function readKeys({ root = ROOT, active = false } = {}) {
    const main = JSON.parse(fs.readFileSync(path.join(root, MAIN), 'utf8'))
    // each entry remembers where it was read (not enumerable: it never shows in JSON): k[FROM] = { file, index }
    const tag = (list, file) => list.map((k, index) => Object.defineProperty(k, FROM, { value: { file, index }, enumerable: false }))
    const mainKeys = tag(main.keys || [], MAIN), inMain = new Set(mainKeys.map(k => k.id))
    const archived = archiveFiles(root).flatMap(f => tag(JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')).keys || [], f).filter(k => !inMain.has(k.id)))
    // per agent: archived (older) first, then data/keys.json's, each in its own order: the order the keys were added
    const order = [], groups = new Map()
    for (const k of [...archived, ...mainKeys]) { if (!groups.has(k.agent)) { groups.set(k.agent, []); order.push(k.agent) } groups.get(k.agent).push(k) }
    let keys = order.flatMap(a => groups.get(a))
    if (active) keys = keys.filter(k => k.status === 'active')
    return { ...main, keys }
}

const write = (root, rel, j) => { const s = JSON.stringify(j, null, 2) + '\n'; fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), s); return Buffer.byteLength(s) }

/** Move every entry of data/keys.json that is not "active" into data/keys-archive/<role>.json. Returns what moved. */
export function archive({ root = ROOT, by = process.env.AGENT || 'incident.identity@web-summit.dinis' } = {}) {
    const main = JSON.parse(fs.readFileSync(path.join(root, MAIN), 'utf8'))
    const move = (main.keys || []).filter(k => k.status !== 'active'), moved = {}
    if (!move.length) return moved
    for (const k of move) (moved[roleOf(k.agent)] ||= []).push(k)
    for (const [role, list] of Object.entries(moved)) {
        const rel = path.posix.join(ARCHIVE, role + '.json'), p = path.join(root, rel)
        const cur = fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : { keys: [] }
        const have = new Set(cur.keys.map(k => k.id))
        const j = { about: `The earlier public keys of ${list[0].agent} (handed over, ended or not used), oldest first: moved here from data/keys.json, whose in-use keys stay there. Public halves only. Read every key with tools/lane-keystore.mjs.`, agent: list[0].agent, by, updated: now(), keys: [...cur.keys, ...list.filter(k => !have.has(k.id))] }
        const n = write(root, rel, j); if (n > LIMIT) throw new Error(`${rel} would be ${n} bytes, over ${LIMIT}: split it (e.g. <role>-2.json) before archiving`)
    }
    const ids = new Set(move.map(k => k.id))
    main.keys = main.keys.filter(k => !ids.has(k.id))
    main.archive = { where: ARCHIVE + '/<role>.json', what: 'each agent\'s earlier keys (handed over, ended, not used); data/keys.json keeps the keys in use', read: 'tools/lane-keystore.mjs (readKeys) reads both' }
    write(root, MAIN, main)
    return moved
}

/** Sizes and placement: every file under the limit, no "active" entry in the archive, no id in two places. */
export function check({ root = ROOT } = {}) {
    const problems = [], ids = new Map()
    for (const rel of [MAIN, ...archiveFiles(root)]) {
        const n = fs.statSync(path.join(root, rel)).size; if (n > LIMIT) problems.push(`${rel}: ${n} bytes, over ${LIMIT}`)
        for (const k of JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8')).keys || []) {
            if (rel !== MAIN && k.status === 'active') problems.push(`${rel}: ${k.id} is active, and active keys belong in ${MAIN}`)
            if (ids.has(k.id)) problems.push(`${k.id} is in ${ids.get(k.id)} and ${rel}`); ids.set(k.id, rel)
        }
    }
    return { files: 1 + archiveFiles(root).length, main_bytes: fs.statSync(path.join(root, MAIN)).size, problems }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    if (process.argv.includes('--archive')) {
        const moved = archive(), n = Object.values(moved).reduce((s, l) => s + l.length, 0)
        console.log(n ? `archived ${n} entr${n === 1 ? 'y' : 'ies'} of ${Object.keys(moved).length} agent(s): ${Object.entries(moved).map(([r, l]) => `${r} ${l.length}`).join(', ')}` : 'nothing to archive')
    }
    const c = check()
    for (const p of c.problems) console.log('FAIL ' + p)
    console.log(`${c.problems.length ? 'FAIL' : 'OK'}: ${MAIN} ${c.main_bytes} bytes, ${c.files - 1} archive file(s), ${readKeys().keys.length} keys in all`)
    process.exit(c.problems.length ? 1 : 0)
}
