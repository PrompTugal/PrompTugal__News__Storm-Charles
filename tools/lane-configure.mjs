#!/usr/bin/env node
// lane-configure.mjs: open the feedback lane on an existing vault (the bridge vault). It does not create the vault.
//   SG_SEND_ACCESS_TOKEN=<access token> LANE_VAULT_KEY=<the vault's key> node tools/lane-configure.mjs [--endpoint URL]
//   node tools/lane-configure.mjs --dry-run        (no secret needed, no call made: prints what a run would do)
// Both secrets come from the environment only; neither is printed, logged or written to git. A run:
//   1. derives the vault's write key from its key (pinned pki/door.js sgitKeys: PBKDF2, as sgit does);
//   2. makes the append tokens (public: they can only write) and the enum key (secret: it lists and fetches);
//   3. POSTs configure with the tokens' sha256 and the enum key's sha256. configure REPLACES the anchor list, so the
//      tokens already in ~/.incident-lane/lane.json for this vault are sent again with the new ones;
//   4. writes the enum key to ~/.incident-lane/lane.json (0600, outside git) and the tokens and vault id into
//      data/lanes.json (to_conductor: Dinis's feedback lane; keys_to_conductor: the agents' lane for vault keys):
//      review and commit that file.
// NOT RUN against the real server: it needs the token and Dinis's yes. Checked against a stand-in (tools/lane-test.mjs).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { args, sha256hex, lane, ROOT } from './lane-common.mjs'
const D = await import('../app/login/pki/door.js')

/** { vaultId, writeKeyHex } from a vault key ("<passphrase>:<vault id>", with or without sgit's prefix). */
export async function writeKeyOf(vaultKey) {
    const m = /^(?:sgit_private_vault_)?([^:\s]+):([a-z0-9]{4,32})$/.exec(String(vaultKey || '').trim())
    if (!m) throw new Error('LANE_VAULT_KEY is not a vault key (<passphrase>:<vault id>)')
    return { vaultId: m[2], writeKeyHex: (await D.sgitKeys(m[1], m[2])).writeHex }
}
export async function configure({ endpoint, vaultId, writeKeyHex, accessToken, lanes = 2, previous = null }) {
    const tokens = [...((previous && previous.tokens) || []), ...Array.from({ length: lanes }, () => randomBytes(32).toString('hex'))]
    const enumKey = (previous && previous.enum_key) || randomBytes(32).toString('hex')
    await lane(endpoint, 'configure', vaultId, { append_anchors: tokens.map(t => sha256hex(t)), enum_key_hash: sha256hex(enumKey) }, { 'x-sgraph-vault-write-key': writeKeyHex, 'x-sgraph-access-token': accessToken })
    return { v: 1, endpoint, vault: vaultId, tokens, enum_key: enumKey, configured: new Date().toISOString() }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const a = args(process.argv.slice(2)), file = path.join(ROOT, 'data/lanes.json'), J = JSON.parse(fs.readFileSync(file, 'utf8'))
    const endpoint = a.endpoint || J.to_conductor.endpoint, n = 2, secret = path.join(os.homedir(), '.incident-lane', 'lane.json')
    if (a['dry-run']) { console.log(`dry run: would POST ${endpoint}/api/vault/append/configure/<vault id> with ${n} new anchors (sha256 of each token) and enum_key_hash; headers x-sgraph-vault-write-key, x-sgraph-access-token; then write ${secret} (0600) and data/lanes.json. No call made.`); process.exit(0) }
    const accessToken = process.env.SG_SEND_ACCESS_TOKEN || process.env.SG_SEND_TOKEN
    if (!accessToken || !process.env.LANE_VAULT_KEY) { console.error('SG_SEND_ACCESS_TOKEN and LANE_VAULT_KEY must be set in the environment (never on the command line, never in chat)'); process.exit(1) }
    const { vaultId, writeKeyHex } = await writeKeyOf(process.env.LANE_VAULT_KEY)
    let previous = null; try { const p = JSON.parse(fs.readFileSync(secret, 'utf8')); if (p.vault === vaultId) previous = p } catch { }
    const rec = await configure({ endpoint, vaultId, writeKeyHex, accessToken, lanes: previous ? 0 : 2, previous })
    fs.mkdirSync(path.dirname(secret), { recursive: true, mode: 0o700 }); fs.writeFileSync(secret, JSON.stringify(rec, null, 1), { mode: 0o600 })
    // two lanes on the one vault: the first token is Dinis's feedback lane (to_conductor: it opens when his key is a named
    // sender, so "enabled" is left as it was), the second is the agents' lane for vault keys (keys_to_conductor).
    Object.assign(J.to_conductor, { endpoint, vault_id: vaultId, tokens: [rec.tokens[0]] })
    J.keys_to_conductor = { ...(J.keys_to_conductor || {}), enabled: true, endpoint, vault_id: vaultId, tokens: [rec.tokens[1]], recipient: J.to_conductor.recipient }
    J.updated = rec.configured
    fs.writeFileSync(file, JSON.stringify(J, null, 2) + '\n')
    console.log(`configured: vault ${vaultId}, ${rec.tokens.length} lanes. The enum key is in ${secret}; data/lanes.json is updated: commit it.`)
}
