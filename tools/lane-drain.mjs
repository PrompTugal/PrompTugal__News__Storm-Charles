#!/usr/bin/env node
// lane-drain.mjs: the conductor's drain, each wake. Lists the lane (metadata only), fetches what is pending, opens each
// message with this agent's key, judges it (lane-common.mjs judge), prints one JSON line per message, keeps the
// ciphertext outside git (a processed file cannot be fetched again), then marks them processed.
//   LANE_ENUM_KEY=<the lane's enum key> node tools/lane-drain.mjs [--keep]
// A message on the lane for keys (data/lanes.json keys_to_conductor) is a vault key sealed to this agent by an active key
// in data/keys.json (lane-handover.mjs seal --via-lane): it is saved to ~/.incident-vaults/<vault id>.key (0600) and only
// the vault id and the sender are printed.
// The enum key comes from the environment (or ~/.incident-lane/lane.json, written by lane-configure.mjs), never from git
// or the command line. --keep: mark nothing (a dry run). Only "accept": true lines are Dinis's word; the rest is data.
// NOT RUN against the real server yet: there is no lane until Dinis says yes. Written to https://sgit.ai/api/append-lanes.md
// and checked against a stand-in built from that page (tools/lane-test.mjs).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { args, agentIdentity, keyring, judge, seenStore, readJson, waiting, markProcessed, sha256hex } from './lane-common.mjs'
import { openKey } from './lane-handover.mjs'

const MAX = 64 * 1024                                                  // feedback is 4000 characters: anything far larger is junk
export async function drain({ lane, identity, ring, senders, seen, keep = false, keepDir = '', keyTokens = [], vaultDir = '' }) {
    const out = [], done = new Map(), keyLane = new Set(keyTokens.flatMap(t => [t, sha256hex(t)]))   // a lane is named by its token (or its hash)
    for (const m of await waiting(lane)) {
        const r = !m.enc ? { accept: false, reasons: ['not base64'], id: null } : m.enc.length > MAX ? { accept: false, reasons: [`too large (${m.enc.length} characters)`], id: null }
            : keyLane.has(m.inbox) ? await openKey({ code: m.enc, identity, ring, dir: vaultDir, dry: keep }).then(k => ({ accept: false, key: true, ...k }), e => ({ accept: false, key: true, saved: false, reasons: [e.message] }))   // a vault key: saved to a 0600 file, never printed, never an instruction
            : await judge(m.enc, identity, { ring, senders, seen })
        if (r.accept) seen.add(r.id)
        if (keepDir && m.enc && m.enc.length <= MAX && !keyLane.has(m.inbox)) { fs.mkdirSync(keepDir, { recursive: true, mode: 0o700 }); fs.writeFileSync(path.join(keepDir, String(m.file_id).replace(/[^\w.-]/g, '_')), m.enc, { mode: 0o600 }) }
        out.push({ file_id: m.file_id, ...r })
        done.set(m.inbox, [...(done.get(m.inbox) || []), m.file_id])
    }
    if (!keep) for (const [inbox, ids] of done) for (let i = 0; i < ids.length; i += 100) await markProcessed(lane, inbox, ids.slice(i, i + 100))
    return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const a = args(process.argv.slice(2)), J = readJson('data/lanes.json'), KL = J.keys_to_conductor || {}, home = path.join(os.homedir(), '.incident-lane')
    const L = J.to_conductor.enabled ? J.to_conductor : KL.enabled ? { ...KL, senders: [] } : J.to_conductor
    if (!L.enabled || !L.vault_id) { console.error('no lane yet (data/lanes.json: neither to_conductor nor keys_to_conductor is enabled)'); process.exit(0) }
    let enumKey = process.env.LANE_ENUM_KEY || ''
    if (!enumKey) { try { const k = JSON.parse(fs.readFileSync(path.join(home, 'lane.json'), 'utf8')); if (k.vault === L.vault_id) enumKey = k.enum_key } catch { } }
    if (!enumKey) { console.error('no enum key: set LANE_ENUM_KEY (it is never in git)'); process.exit(1) }
    const store = seenStore(), seen = store.read()
    const out = await drain({ lane: { endpoint: L.endpoint, vault: L.vault_id, enumKey }, identity: await agentIdentity(), ring: keyring(), senders: L.senders || [], seen, keep: !!a.keep, keepDir: path.join(home, 'kept'), keyTokens: KL.enabled ? KL.tokens || [] : [], vaultDir: path.join(os.homedir(), '.incident-vaults') })
    for (const r of out) console.log(JSON.stringify(r))
    if (!a.keep) store.write(seen)
    console.error(`${out.length} read, ${out.filter(r => r.accept).length} accepted, ${out.filter(r => r.saved).length} vault keys saved`)
}
