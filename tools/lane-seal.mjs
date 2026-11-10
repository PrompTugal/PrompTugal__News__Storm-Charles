#!/usr/bin/env node
// lane-seal.mjs: the reverse path. Sign with this agent's key, seal to a key in data/keys.json (Dinis's), 7 days by default.
//   node tools/lane-seal.mjs --to <key id> --text "…" [--subject S] [--expires DAYS] [--inbox]
// Prints the m1 code; with --inbox, appends it to account/inbox.json (ciphertext, public: commit it). Refuses text that
// holds a vault key, a token or a private key: secrets never travel on this path (SECURITY.md, section c).
import fs from 'node:fs'
import path from 'node:path'
import { args, agentIdentity, keyring, looksSecret, K, M, ROOT } from './lane-common.mjs'

const a = args(process.argv.slice(2))
const text = a.file ? fs.readFileSync(a.file, 'utf8') : a.text
if (!a.to || typeof text !== 'string' || !text.trim()) { console.error('usage: lane-seal.mjs --to <key id in data/keys.json> --text "…" [--subject S] [--expires DAYS] [--inbox]'); process.exit(1) }
if (looksSecret(text) || looksSecret(String(a.subject || ''))) { console.error('refused: the text holds what looks like a key or a token; secrets never travel on this path'); process.exit(1) }
const to = keyring().byId.get(a.to)
if (!to) { console.error(`refused: no active key "${a.to}" in data/keys.json`); process.exit(1) }
const bad = await K.checkBundle(to.bundle); if (bad.length) { console.error('refused: that key does not check: ' + bad.join('; ')); process.exit(1) }
const from = await agentIdentity()
const at = new Date().toISOString(), expires = new Date(Date.now() + (Number(a.expires) || 7) * 864e5).toISOString()
const msg = await M.compose({ to: to.bundle, from, subject: a.subject === true ? '' : a.subject || '', text, at, expires })
const { code } = await M.sealMessage(msg, to.bundle, from)
if (a.inbox) {
    const f = path.join(ROOT, 'account/inbox.json'), j = JSON.parse(fs.readFileSync(f, 'utf8'))
    j.messages.push({ at, to: to.bundle.signing_fingerprint, from: from.bundle.signing_fingerprint, code })
    j.messages = j.messages.slice(-40)                                 // the file stays small: older replies leave it
    fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n')
    console.error(`appended to account/inbox.json (${j.messages.length} kept): commit it, For: Dinis`)
} else console.log(code)
