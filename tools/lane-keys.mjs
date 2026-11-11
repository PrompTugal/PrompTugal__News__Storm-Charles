#!/usr/bin/env node
// lane-keys.mjs: the key list, checked (incident.identity@web-summit.dinis). Reads data/keys.json only; needs no key.
//   node tools/lane-keys.mjs           one line per problem, then a count; exit 1 if any entry is wrong
//   node tools/lane-keys.mjs --json    the same as JSON
// An entry is right when: both public keys parse and both fingerprints are theirs (pki.sgit.ai's checkBundle); no private
// half is in it; its id and fingerprints are its own; and, per agent, the sessions run <id>, <id>-2, <id>-3 with exactly
// one "active" (the last) and every earlier one "handed over" (or "ended"). It says the list is consistent, not who pushed.
import { K, readJson } from './lane-common.mjs'

const keys = readJson('data/keys.json').keys || [], problems = [], notes = []
const say = (id, what) => problems.push({ id, what })
const seen = { id: new Map(), fp: new Map() }
for (const k of keys) {
    for (const f of ['id', 'agent', 'role', 'how', 'added', 'status', 'bundle']) if (!k[f]) say(k.id, `no "${f}"`)
    if (seen.id.has(k.id)) say(k.id, 'this id is used twice'); seen.id.set(k.id, k)
    const b = k.bundle || {}
    if (/PRIVATE KEY/.test(JSON.stringify(k))) say(k.id, 'A PRIVATE KEY IS IN THIS ENTRY')
    if (b.v !== 1) notes.push({ id: k.id, what: `bundle.v is ${JSON.stringify(b.v)}, not the number 1 (the lane tools read it as 1)` })
    for (const p of await K.checkBundle({ ...b, v: 1 })) say(k.id, p)
    for (const fp of [b.fingerprint, b.signing_fingerprint]) { if (!fp) continue; if (seen.fp.has(fp)) say(k.id, `fingerprint ${fp} is also ${seen.fp.get(fp)}'s`); seen.fp.set(fp, k.id) }
    if (b.label && b.label !== k.agent) say(k.id, `the bundle's label is ${b.label}, the entry's agent is ${k.agent}`)
    if (!['active', 'handed over', 'ended'].includes(k.status)) say(k.id, `status "${k.status}" is not active, handed over or ended`)
}
const byAgent = new Map()
for (const k of keys) byAgent.set(k.agent, [...(byAgent.get(k.agent) || []), k])
for (const [agent, list] of byAgent) {
    const base = list[0].id.replace(/-\d+$/, ''), n = k => k.id === base ? 1 : +(k.id.slice(base.length + 1))
    list.forEach((k, i) => { if (n(k) !== i + 1) say(k.id, `session ${i + 1} of ${agent} should be ${i ? base + '-' + (i + 1) : base}`) })
    const active = list.filter(k => k.status === 'active')
    if (active.length > 1) say(base, `${active.length} active keys for ${agent}: an earlier session is not marked handed over`)
    if (active.length === 1 && active[0] !== list[list.length - 1]) say(active[0].id, 'the active key is not the latest session')
    if (!active.length) notes.push({ id: base, what: `no active key for ${agent}` })
}
const count = s => keys.filter(k => k.status === s).length
const out = { keys: keys.length, agents: byAgent.size, active: count('active'), handed_over: count('handed over'), ended: count('ended'), problems, notes }
if (process.argv.includes('--json')) console.log(JSON.stringify(out, null, 2))
else {
    for (const p of problems) console.log(`FAIL ${p.id}: ${p.what}`)
    const v = notes.filter(p => /bundle\.v/.test(p.what))
    if (v.length) console.log(`note: ${v.length} bundles write "v" as a string, not the number 1 (harmless: the lane tools read it as 1)`)
    for (const p of notes) if (!v.includes(p)) console.log(`note ${p.id}: ${p.what}`)
    console.log(`${problems.length ? 'FAIL' : 'OK'}: ${out.keys} keys of ${out.agents} agents; ${out.active} active, ${out.handed_over} handed over, ${out.ended} ended; ${problems.length} problems`)
}
process.exit(problems.length ? 1 : 0)
