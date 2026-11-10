#!/usr/bin/env node
// lane-drain.mjs: the conductor's drain, each wake. Lists the lane, opens each message with this agent's key, judges it
// (lane-common.mjs judge), prints one JSON line per message, then marks them processed.
//   LANE_ENUM_KEY=<the lane's enum key> node tools/lane-drain.mjs [--keep]
// The enum key comes from the environment, never from git or the command line. --keep: mark nothing (a dry run).
// NOT RUN against the real server yet: there is no lane until Dinis says yes. Checked against a stand-in that speaks the
// calls pki.sgit.ai's account.js makes (tools/lane-test.mjs).
import { args, agentIdentity, keyring, judge, seenStore, readJson, waiting, markProcessed } from './lane-common.mjs'

export async function drain({ lane, identity, ring, senders, seen, keep = false }) {
    const out = [], done = new Map()
    for (const m of await waiting(lane)) {
        const r = m.enc ? await judge(m.enc, identity, { ring, senders, seen }) : { accept: false, reasons: ['not base64'], id: null }
        if (r.accept) seen.add(r.id)
        out.push({ file_id: m.file_id, ...r })
        done.set(m.inbox, [...(done.get(m.inbox) || []), m.file_id])
    }
    if (!keep) for (const [inbox, ids] of done) await markProcessed(lane, inbox, ids)
    return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const a = args(process.argv.slice(2)), L = readJson('data/lanes.json').to_conductor
    if (!L.enabled || !L.vault_id) { console.error('no lane yet (data/lanes.json: to_conductor.enabled is false)'); process.exit(0) }
    if (!process.env.LANE_ENUM_KEY) { console.error('LANE_ENUM_KEY is not set'); process.exit(1) }
    const store = seenStore(), seen = store.read()
    const out = await drain({ lane: { endpoint: L.endpoint, vault: L.vault_id, enumKey: process.env.LANE_ENUM_KEY }, identity: await agentIdentity(), ring: keyring(), senders: L.senders || [], seen, keep: !!a.keep })
    for (const r of out) console.log(JSON.stringify(r))
    if (!a.keep) store.write(seen)
    console.error(`${out.length} read, ${out.filter(r => r.accept).length} accepted`)
}
