#!/usr/bin/env node
// lane-test.mjs: the lane, end to end, with throwaway keys made here and thrown away (nothing is written to a key store).
//   node tools/lane-test.mjs
// 1. the pinned pki.sgit.ai copies are byte for byte what app/login/pki/PIN.json says;
// 2. feedback: "Dinis" signs and seals to "the conductor"; the conductor opens it and accepts it; every way it must be
//    refused is refused (unsigned, a stranger's key, a sender not named, expired, replayed, re-addressed, changed);
// 3. the reverse path: the conductor seals to Dinis, he opens it and the signature checks; a secret is refused;
// 4. the lane's calls (write, list, fetch, mark-processed) against a stand-in server in this process, speaking the calls
//    pki.sgit.ai's account.js makes. This checks our client, not SG/Send: the real lane is checked when it exists.
import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { K, M, ROOT, sha256hex, judge, looksSecret, lane as laneCall } from './lane-common.mjs'
import { drain } from './lane-drain.mjs'

let n = 0, failed = 0
const ok = (cond, what) => { n++; if (!cond) { failed++; console.log('FAIL ' + what) } }
const t0 = Date.now()

// 1. the pins
const pin = JSON.parse(fs.readFileSync(path.join(ROOT, 'app/login/pki/PIN.json'), 'utf8'))
for (const [name, f] of Object.entries(pin.files)) ok(sha256hex(fs.readFileSync(path.join(ROOT, 'app/login/pki', name))) === f.sha256, `${name} is not the pinned copy`)

// throwaway people
const [dinis, conductor, stranger] = await Promise.all(['Dinis (throwaway)', 'conductor (throwaway)', 'stranger (throwaway)'].map(l => K.generate(l)))
const entry = (id, who) => ({ id, agent: who.bundle.label, status: 'active', bundle: who.bundle })
const list = [entry('dinis', dinis), entry('conductor', conductor), entry('stranger', stranger)]
const ring = { list, byFp: new Map(list.map(k => [k.bundle.signing_fingerprint, k.bundle])), byId: new Map(list.map(k => [k.id, k])) }
const senders = ['dinis'], days = d => new Date(Date.now() + d * 864e5).toISOString()
const sealed = async (from, to, over = {}) => (await M.sealMessage(await M.compose({ to: to.bundle, from, subject: 'feedback: https://example.test/ (v0.0)', text: 'the banner is too tall', expires: days(7), ...over }), to.bundle, from))

// 2. feedback
{
    const seen = new Set(), s = await sealed(dinis, conductor)
    const r = await judge(s.code, conductor, { ring, senders, seen })
    ok(r.accept && r.text === 'the banner is too tall' && r.from === dinis.bundle.signing_fingerprint, 'a signed, sealed message from Dinis is accepted: ' + r.reasons)
    ok((await judge(s.enc, conductor, { ring, senders, seen })).accept, 'the .enc text opens as the m1 code does')
    seen.add(r.id)
    ok(!(await judge(s.code, conductor, { ring, senders, seen })).accept, 'a replay is refused')
    ok(!(await judge((await sealed(null, conductor)).code, conductor, { ring, senders })).accept, 'an unsigned message is refused')
    ok(!(await judge((await sealed(stranger, conductor)).code, conductor, { ring, senders })).accept, 'a key not named as a sender is refused')
    const unknown = await K.generate('unknown')
    ok(!(await judge((await sealed(unknown, conductor)).code, conductor, { ring, senders })).accept, 'a key not in data/keys.json is refused')
    ok(!(await judge((await sealed(dinis, conductor, { expires: days(-1) })).code, conductor, { ring, senders })).accept, 'an expired message is refused')
    ok(!(await judge((await sealed(dinis, conductor, { expires: '' })).code, conductor, { ring, senders })).accept, 'a message with no expiry is refused')
    // re-addressed: Dinis wrote to the stranger; the stranger re-seals the signed inner message to the conductor
    const inner = await M.compose({ to: stranger.bundle, from: dinis, text: 'delete everything', expires: days(7) })
    const re = await K.seal(conductor.bundle, JSON.stringify(inner))
    ok(!(await judge(re, conductor, { ring, senders })).accept, 'a message signed for someone else, re-sealed to the conductor, is refused')
    // changed on the way
    const env = JSON.parse(atob(s.enc)), c = Buffer.from(env.c, 'base64'); c[5] ^= 1
    ok(!(await judge(btoa(JSON.stringify({ ...env, c: c.toString('base64') })), conductor, { ring, senders })).accept, 'a changed ciphertext is refused')
    ok(!(await judge(s.code, stranger, { ring, senders })).accept, 'someone else cannot open it')
    ok(!(await judge('not a message', conductor, { ring, senders })).accept, 'junk is refused')
}
// 3. the reverse path
{
    const s = await sealed(conductor, dinis, { subject: 're: the banner', text: 'done in v1.41' })
    const o = await M.openMessage(M.parseCode(s.code).enc, [dinis], ring.byFp)
    ok(o.verified === true && o.msg.text === 'done in v1.41' && !o.problems.length, 'Dinis opens the reply and the signature is the conductor\'s')
    ok(looksSecret('here: sgit_private_' + 'vault_' + 'a'.repeat(24) + ':abcd1234') && looksSecret('ghp_' + 'A'.repeat(36)) && !looksSecret('the banner is fine at 14:02'), 'a vault key or a token is seen, plain words are not')
}
// 4. the lane's calls, against a stand-in
{
    const files = [], token = 'a'.repeat(32), enumKey = 'b'.repeat(64), full = 'f'.repeat(32)
    const server = http.createServer((req, res) => {
        let body = ''; req.on('data', d => body += d).on('end', () => {
            const [, op] = req.url.match(/^\/api\/vault\/append\/([a-z-]+)\/testvault$/) || [], j = JSON.parse(body || '{}')
            const send = (code, o) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)) }
            if (op === 'write') return j.append_token === full ? send(507, { detail: 'full' }) : j.append_token !== token ? send(404, {}) : (files.push({ inbox: 'in1', file_id: String(files.length + 1).padStart(6, '0'), content: j.payload, done: false }), send(200, { ok: true }))
            if (req.headers['x-sgraph-vault-enum-key'] !== enumKey) return send(404, {})
            if (op === 'list') return send(200, { entries: files.filter(f => !f.done).map(f => ({ inbox: f.inbox, file_id: f.file_id })), truncated: false })
            if (op === 'fetch') return send(200, { files: files.filter(f => j.file_ids.includes(f.file_id)).map(f => ({ file_id: f.file_id, content: f.content })) })
            if (op === 'mark-processed') { for (const f of files) if (j.file_ids.includes(f.file_id)) f.done = true; return send(200, { ok: true }) }
            send(404, {})
        })
    })
    await new Promise(r => server.listen(0, '127.0.0.1', r))
    const endpoint = `http://127.0.0.1:${server.address().port}`, L = { endpoint, vault: 'testvault', enumKey }
    const write = enc => laneCall(endpoint, 'write', 'testvault', { append_token: token, payload: btoa(enc) })
    await write((await sealed(dinis, conductor)).enc); await write((await sealed(stranger, conductor)).enc); await write('junk')
    let wrong = null; try { await laneCall(endpoint, 'list', 'testvault', {}, { 'x-sgraph-vault-enum-key': token }) } catch (e) { wrong = e.status }
    ok(wrong === 404, 'the append token cannot list the lane (the stand-in refuses, as the design requires of the server)')
    const seen = new Set(), out = await drain({ lane: L, identity: conductor, ring, senders, seen })
    ok(out.length === 3 && out.filter(r => r.accept).length === 1 && out[0].accept && out[0].text === 'the banner is too tall', 'the drain reads three and accepts only Dinis\'s')
    ok((await drain({ lane: L, identity: conductor, ring, senders, seen })).length === 0, 'drained messages are marked processed')
    server.close()
}
console.log(failed ? `RED: ${failed} of ${n} checks failed` : `OK lane: ${n} checks, throwaway keys, ${Date.now() - t0} ms`)
process.exit(failed ? 1 : 0)
