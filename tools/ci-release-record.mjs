#!/usr/bin/env node
// The signed release record (incident.ci@web-summit.dinis; the proposal: ci/signing.md). NOT wired in yet: it waits for Dinis's yes.
//   AGENT=<name> node tools/ci-release-record.mjs --write    write data/releases/<role>.json and its .sig with this agent's own key
//   node tools/ci-release-record.mjs --check                 verify every record (the gate would call this); exit 1 only on a forgery
//   node tools/ci-release-record.mjs --digest                print the digest of the tree as it stands
// What is signed: a digest of the tree being released, sha256 over "<path>\0<git blob sha>\n" for every tracked file in path order,
// leaving out data/releases/ itself (so writing the record does not change what it names). One git call, no history, no network.
// The signature is what pki-agent.mjs `sign` and `sgit pki sign` write (ECDSA P-256 over the file's bytes, raw r||s, base64), so
// `sgit pki verify` checks it too. One record per agent, replaced at each release: two agents never touch the same file.
// --check: every record's signature must verify against that agent's key in data/keys.json (a record that does not is a forgery
// or a damaged file: exit 1). The newest record should name the tree as it stands; when none does, the push is "unsigned":
// a WARN, not a failure, until Dinis sets a date.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), DIR = path.join(ROOT, 'data/releases')
const mode = process.argv[2]
const digest = () => {
    const ls = execFileSync('git', ['-C', ROOT, 'ls-files', '-s', '-z'], { maxBuffer: 1 << 26 }).toString().split('\0').filter(Boolean)
    const h = crypto.createHash('sha256')
    for (const l of ls.map(l => { const [meta, p] = l.split('\t'); return [p, meta.split(' ')[1]] }).filter(([p]) => !p.startsWith('data/releases/')).sort((a, b) => a[0] < b[0] ? -1 : 1)) h.update(l[0] + '\0' + l[1] + '\n')
    return 'sha256:' + h.digest('hex')
}
const keys = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'data/keys.json'), 'utf8')).keys
const verify = (pem, bytes, sigB64) => { try { return crypto.verify('sha256', bytes, { key: pem, dsaEncoding: 'ieee-p1363' }, Buffer.from(sigB64, 'base64')) } catch { return false } }

if (mode === '--digest') { console.log(digest()); process.exit(0) }

if (mode === '--write') {
    const agent = process.env.AGENT; if (!agent) { console.error('release-record: set AGENT'); process.exit(2) }
    const role = agent.split('@')[0].replace(/^incident\./, '')
    // the agent's own key, where pki-agent.mjs and sgit keep it; the private half is read here and never written anywhere
    const home = path.join(process.env.PKI_AGENT_HOME || path.join(os.homedir(), '.sg-send'), 'keys')
    const dir = fs.existsSync(home) && fs.readdirSync(home).map(d => path.join(home, d)).find(d => { try { return JSON.parse(fs.readFileSync(path.join(d, 'metadata.json'), 'utf8')).label === agent } catch { return false } })
    if (!dir) { console.log(`release-record: no key for ${agent} on this machine; this push is unsigned`); process.exit(0) }
    const meta = JSON.parse(fs.readFileSync(path.join(dir, 'metadata.json'), 'utf8')), pem = fs.readFileSync(path.join(dir, 'signing_private.pem'), 'utf8')
    if (!/BEGIN PRIVATE KEY/.test(pem)) { console.log('release-record: the key is encrypted (SG_SEND_PASSPHRASE): sign with pki-agent.mjs sign instead; this push is unsigned'); process.exit(0) }
    const pub = keys().find(k => k.agent === agent && k.bundle?.signing_fingerprint === meta.signing_fingerprint)
    if (!pub) { console.log(`release-record: ${meta.signing_fingerprint} is not ${agent}'s key in data/keys.json; this push is unsigned`); process.exit(0) }
    const git = (...a) => execFileSync('git', ['-C', ROOT, ...a]).toString().trim()
    let base = '', n = 0   // the commits' own ids are not recorded: release.sh amends the record into the last one, which renames it
    try { base = git('rev-parse', 'origin/dev'); n = Number(git('rev-list', '--count', 'origin/dev..HEAD')) } catch { }
    const record = { about: 'A release record: this agent, holding the key named, signed the digest of the tree it released (every tracked path and its git blob sha, without data/releases/). Check: node tools/ci-release-record.mjs --check, or sgit pki verify on this file and its .sig.', agent, by: agent, updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), tree_digest: digest(), base, commits_released: n, key: meta.signing_fingerprint }
    const bytes = Buffer.from(JSON.stringify(record, null, 1) + '\n')
    fs.mkdirSync(DIR, { recursive: true })
    fs.writeFileSync(path.join(DIR, role + '.json'), bytes)
    fs.writeFileSync(path.join(DIR, role + '.json.sig'), JSON.stringify({ signature: crypto.sign('sha256', bytes, { key: pem, dsaEncoding: 'ieee-p1363' }).toString('base64'), fingerprint: meta.signing_fingerprint }, null, 2) + '\n')
    console.log(`release-record: data/releases/${role}.json signed by ${meta.signing_fingerprint} over ${record.tree_digest.slice(0, 23)}...`)
    process.exit(0)
}

if (mode === '--check') {
    const now = digest(), ring = keys(), bad = [], good = []
    for (const f of fs.existsSync(DIR) ? fs.readdirSync(DIR).filter(f => f.endsWith('.json')) : []) {
        const bytes = fs.readFileSync(path.join(DIR, f)); let r, s
        try { r = JSON.parse(bytes); s = JSON.parse(fs.readFileSync(path.join(DIR, f + '.sig'), 'utf8')) } catch { bad.push(`${f}: no readable record or signature`); continue }
        const k = ring.find(k => k.agent === r.agent && k.bundle?.signing_fingerprint === s.fingerprint)
        if (!k) { bad.push(`${f}: signed by ${s.fingerprint}, which is not a key of ${r.agent} in data/keys.json`); continue }
        if (!verify(k.bundle.sign, bytes, s.signature)) { bad.push(`${f}: the signature does not verify`); continue }
        good.push(r)
    }
    for (const b of bad) console.log('FAIL release-record ' + b)
    const newest = good.sort((a, b) => a.updated < b.updated ? 1 : -1)[0]
    if (newest && newest.tree_digest === now) console.log(`release-record: OK, this tree was signed by ${newest.agent} (${newest.key}) at ${newest.updated}; ${good.length} record(s) verify`)
    else console.log(`WARN release-record: this tree is unsigned (${good.length} record(s) verify${newest ? `; the newest, by ${newest.agent}, names an earlier tree` : ''})`)
    process.exit(bad.length ? 1 : 0)
}
console.error('release-record: --write, --check or --digest'); process.exit(2)
