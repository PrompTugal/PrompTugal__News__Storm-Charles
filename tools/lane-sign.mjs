#!/usr/bin/env node
// lane-sign.mjs: this agent signs the files that say what is safe, so a reader can check who wrote the bytes they read.
//   node tools/lane-sign.mjs            sign the files below with this agent's session key → agents/identity/signed.json
//   node tools/lane-sign.mjs --check    verify every signature in that file against data/keys.json (no key needed)
// The signature is ECDSA P-256 over the file's bytes, raw r||s, base64: what `sgit pki sign` and pki-agent.mjs `sign` write
// (a .sig's "signature" and "fingerprint"). It says the holder of that session key signed these bytes; it does not say the
// content is right. A session key ends with its session: an old signature then names a key marked ended in data/keys.json.
import fs from 'node:fs'
import path from 'node:path'
import { args, agentIdentity, keyring, sha256hex, K, ROOT } from './lane-common.mjs'

const FILES = ['SECURITY.md', 'app/login/pki/PIN.json', 'data/lanes.json']
const OUT = path.join(ROOT, 'agents/identity/signed.json'), a = args(process.argv.slice(2).map(x => x === '--check' ? '--keep' : x))
const bytes = rel => fs.readFileSync(path.join(ROOT, rel))
if (a.keep) {
    const j = JSON.parse(fs.readFileSync(OUT, 'utf8')), ring = keyring()
    let bad = 0
    for (const s of j.signed) {
        const b = ring.byFp.get(s.fingerprint), cur = bytes(s.file)
        const ok = !!b && sha256hex(cur) === s.sha256 && await K.verifyBytes(b.sign, K.unb64(s.signature), new Uint8Array(cur))
        if (!ok) bad++
        console.log(`${ok ? 'OK  ' : 'FAIL'} ${s.file} ${ok ? 'signed by ' + s.fingerprint : !b ? 'the signer is not an active key in data/keys.json' : 'changed since it was signed'}`)
    }
    process.exit(bad ? 1 : 0)
}
const id = await agentIdentity(), now = new Date().toISOString(), signed = []
for (const file of FILES) { const b = bytes(file); signed.push({ file, sha256: sha256hex(b), signature: K.b64(await K.signBytes(id.private.sign, new Uint8Array(b))), fingerprint: id.bundle.signing_fingerprint }) }
fs.writeFileSync(OUT, JSON.stringify({ about: 'Detached signatures by incident.identity@web-summit.dinis over the files that say what is safe here (ECDSA P-256 over the file bytes, as sgit pki sign). Check: node tools/lane-sign.mjs --check. A signature says who signed the bytes, not that they are right.', by: id.bundle.label, updated: now, signed }, null, 2) + '\n')
console.log(`signed ${signed.length} files as ${id.bundle.signing_fingerprint}`)
