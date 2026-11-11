#!/usr/bin/env node
// lane-handover.mjs: hand a vault key to another agent (the conductor) without the key ever being readable on the way.
//   VAULT_KEY=<the vault's key> node tools/lane-handover.mjs seal [--to incident-conductor-dinis] [--name "what the vault is"]
//       prints a sealed message (m1.…): ciphertext, safe to send by session message. Prints the vault id, never the key.
//   node tools/lane-handover.mjs open '<m1 code>'
//       (the recipient) checks it, writes the key to ~/.incident-vaults/<vault id>.key (0600, outside git), and prints the
//       vault id, who sent it and whether the signature checks. Never the key.
// The key is read from the environment (or stdin), never from the command line, where it would stay in the shell's
// history and the session's transcript. The message is signed by the sender's session key, sealed to the recipient's
// (data/keys.json), expires in one day, and carries the key as a file (pki/message.js vaultKeysIn, vaultKeyFile), as
// pki.sgit.ai's handover does. A recipient opens only what an active key in data/keys.json signed and addressed to it.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { args, agentIdentity, keyring, K, M } from './lane-common.mjs'

export async function sealKey({ vaultKey, from, toBundle, name = '' }) {
    // the prefix is taken off first: the pinned message.js (v0.2.28) does not find a key written with sgit's prefix (its
    // pattern asks for a word boundary after "vault_", and "_" is a word character); it puts the prefix back itself
    const found = M.vaultKeysIn(String(vaultKey).trim().replace(/^sgit_private_vault_/, ''))
    if (found.keys.length !== 1) throw new Error('VAULT_KEY must hold exactly one vault key (<passphrase>:<vault id>, with or without sgit\'s prefix)')
    const k = found.keys[0]
    const msg = await M.compose({ to: toBundle, from, subject: `vault key: ${k.id}`, text: `The key of vault ${k.id}${name ? ' (' + String(name).slice(0, 120) + ')' : ''}, as a file.`, files: [M.vaultKeyFile(k)], expires: new Date(Date.now() + 864e5).toISOString() })
    return { id: k.id, code: (await M.sealMessage(msg, toBundle, from)).code }
}
export async function openKey({ code, identity, ring, dir }) {
    const p = M.parseCode(code); if (!p) throw new Error('no sealed message (m1.…) in that text')
    const o = await M.openMessage(p.enc, [identity], ring.byFp), sender = ring.list.find(k => k.bundle.signing_fingerprint === o.msg.from)
    const reasons = [...o.problems]
    if (o.verified !== true || !sender) reasons.push('not signed by an active key in data/keys.json')
    if (!o.msg.expires) reasons.push('no expiry')
    const files = (o.msg.files || []).filter(f => /^vault-key-[a-z0-9]{4,32}\.txt$/.test(f.name))
    if (files.length !== 1) reasons.push('it does not carry exactly one vault key')
    if (reasons.length) return { saved: false, reasons, from: sender ? sender.agent : o.msg.from || null }
    const id = files[0].name.slice('vault-key-'.length, -'.txt'.length), file = path.join(dir, id + '.key')
    fs.mkdirSync(dir, { recursive: true, mode: 0o700 }); fs.writeFileSync(file, Buffer.from(files[0].data, 'base64'), { mode: 0o600 })
    return { saved: true, vault: id, file, from: sender.agent, subject: o.msg.subject }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const a = args(process.argv.slice(2)), cmd = a._[0], ring = keyring()
    if (cmd === 'seal') {
        const vaultKey = process.env.VAULT_KEY || (process.stdin.isTTY ? '' : fs.readFileSync(0, 'utf8'))
        if (!vaultKey.trim()) { console.error('VAULT_KEY is not set (the environment or stdin; never the command line)'); process.exit(1) }
        const to = ring.byId.get(a.to || 'incident-conductor-dinis'); if (!to) { console.error('no such active key in data/keys.json'); process.exit(1) }
        const bad = await K.checkBundle(to.bundle); if (bad.length) { console.error('that key does not check: ' + bad.join('; ')); process.exit(1) }
        const out = await sealKey({ vaultKey, from: await agentIdentity(), toBundle: to.bundle, name: a.name === true ? '' : a.name })
        console.error(`sealed the key of vault ${out.id} to ${to.agent} (${to.bundle.signing_fingerprint}); send the line below by session message, once`)
        console.log(out.code)
    } else if (cmd === 'open' && a._[1]) {
        const r = await openKey({ code: fs.existsSync(a._[1]) ? fs.readFileSync(a._[1], 'utf8') : a._[1], identity: await agentIdentity(), ring, dir: path.join(os.homedir(), '.incident-vaults') })
        console.log(JSON.stringify(r)); process.exit(r.saved ? 0 : 2)
    } else { console.error('usage: VAULT_KEY=… lane-handover.mjs seal [--to <key id>] [--name N]   |   lane-handover.mjs open <m1 code>'); process.exit(1) }
}
