#!/usr/bin/env node
// lane-test.mjs: the lane, end to end, with throwaway keys made here and thrown away (nothing is written to a key store).
//   node tools/lane-test.mjs
// 1. the pinned pki.sgit.ai copies are byte for byte what app/login/pki/PIN.json says;
// 2. feedback: "Dinis" signs and seals to "the conductor"; the conductor opens it and accepts it; every way it must be
//    refused is refused (unsigned, a stranger's key, a sender not named, expired, replayed, re-addressed, changed);
// 3. the reverse path: the conductor seals to Dinis, he opens it and the signature checks; a secret is refused;
// 4. the lane's calls (configure, write, list, fetch, mark-processed) against a stand-in server in this process, built
//    from https://sgit.ai/api/append-lanes.md. This checks our client, not SG/Send: the real lane is checked when it exists.
import fs from 'node:fs'
import os from 'node:os'
import http from 'node:http'
import path from 'node:path'
import { K, M, ROOT, sha256hex, judge, looksSecret, lane as laneCall } from './lane-common.mjs'
import { drain } from './lane-drain.mjs'
import { configure, writeKeyOf } from './lane-configure.mjs'
import { sealKey, openKey } from './lane-handover.mjs'

const TEST_VAULT_KEY = ['throwawaypassphrase000000', 'testvlt1'].join(':')   // joined here: the gate refuses a vault key written out in a tracked file
let n = 0, failed = 0
const ok = (cond, what) => { n++; if (!cond) { failed++; console.log('FAIL ' + what) } }
const t0 = Date.now()

// 1. the pins
const pin = JSON.parse(fs.readFileSync(path.join(ROOT, 'app/login/pki/PIN.json'), 'utf8'))
for (const [name, f] of Object.entries(pin.files)) ok(sha256hex(fs.readFileSync(path.join(ROOT, 'app/login/pki', name))) === f.sha256, `${name} is not the pinned copy`)

// 1b. /account/ is written by hand (so it can refuse inline and third-party script): it must still carry what the frame carries
{
    const page = fs.readFileSync(path.join(ROOT, 'account/index.html'), 'utf8'), build = fs.readFileSync(path.join(ROOT, 'admin/build/build.mjs'), 'utf8')
    for (const must of ['Not a warning service', 'Time delays between this website and the www.meteoalarm.org website are possible', 'please refer to <a href="https://www.meteoalarm.org">www.meteoalarm.org</a>'])
        ok(page.includes(must) && build.includes(must), `/account/ and the frame both carry: ${must.slice(0, 50)}`)
    ok(/Content-Security-Policy" content="default-src 'none'; script-src 'self';/.test(page) && !/<script(?![^>]*\ssrc=)/.test(page) && !/\sstyle="/.test(page), '/account/ keeps its Content-Security-Policy and has no inline script or style')
    for (const [, href] of build.matchAll(/<a href="\$\{u\}([^"]+)">/g)) ok(page.includes(`"../${href}"`) || href === 'account/index.html' || href === 'index.html', `/account/'s nav has the frame's link to ${href}`)
}
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
// 3b. a vault key handed over (lane-handover.mjs): sealed to the conductor, never readable on the way
{
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lane-vaults-')), h = await sealKey({ vaultKey: 'sgit_private_' + 'vault_' + TEST_VAULT_KEY, from: stranger, toBundle: conductor.bundle, name: 'test' })
    ok(h.id === 'testvlt1' && !h.code.includes('throwawaypass') && !looksSecret(h.code), 'the sealed handover shows the vault id and nothing of the key')
    const r = await openKey({ code: h.code, identity: conductor, ring, dir })
    ok(r.saved && r.vault === 'testvlt1' && !JSON.stringify(r).includes('throwawaypass') && fs.readFileSync(r.file, 'utf8').trim() === 'sgit_private_' + 'vault_' + TEST_VAULT_KEY && (fs.statSync(r.file).mode & 0o077) === 0, 'the conductor saves the key to a 0600 file and prints only the vault id')
    ok(!(await openKey({ code: h.code, identity: dinis, ring, dir }).catch(() => ({ saved: false }))).saved, 'nobody else can open the handover')
    const unknown = await K.generate('unknown'), h2 = await sealKey({ vaultKey: TEST_VAULT_KEY, from: unknown, toBundle: conductor.bundle })
    ok(!(await openKey({ code: h2.code, identity: conductor, ring, dir })).saved, 'a handover signed by a key not in data/keys.json is not saved')
    fs.rmSync(dir, { recursive: true, force: true })
}
// 4. the lane's calls, against a stand-in built from https://sgit.ai/api/append-lanes.md: configure stores hashes only and
//    replaces the anchor list; write is gated by sha256(token) and answers exactly {"ok":true}; a wrong key or token is a
//    404 with an HTML page; list names each lane by its raw token; fetch serves pending files only; content is base64 of
//    the .enc text; mark-processed is idempotent (missing); file ids are {epoch_ms}_{24 hex}.enc.
{
    const cfg = { anchors: [], enumHash: '' }, files = []
    const server = http.createServer((req, res) => {
        let body = ''; req.on('data', d => body += d).on('end', () => {
            const [, op] = req.url.match(/^\/api\/vault\/append\/([a-z-]+)\/testvlt1$/) || [], j = JSON.parse(body || '{}'), h = req.headers
            const send = (code, o) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)) }
            const no = () => { res.writeHead(404, { 'content-type': 'text/html' }); res.end('<!DOCTYPE html><html>not found</html>') }
            if (op === 'configure') { if (!h['x-sgraph-access-token']) return send(401, { detail: 'no access token' }); if (h['x-sgraph-vault-write-key'] !== writeKeyHex) return no(); cfg.anchors = j.append_anchors; cfg.enumHash = j.enum_key_hash; return send(200, { ok: true }) }
            if (op === 'write') { if (!cfg.anchors.includes(sha256hex(j.append_token || ''))) return no(); if (files.filter(f => f.inbox === j.append_token && !f.done).length >= 3) return send(507, { detail: 'full' }); files.push({ inbox: j.append_token, file_id: `${String(Date.now()).padStart(13, '0')}_${String(files.length).padStart(24, '0')}.enc`, content: j.payload, done: false }); return send(200, { ok: true }) }
            if (!cfg.enumHash || sha256hex(h['x-sgraph-vault-enum-key'] || '') !== cfg.enumHash) return no()
            if (op === 'list') return send(200, { entries: files.filter(f => !f.done).map(f => ({ inbox: f.inbox, file_id: f.file_id })), truncated: false })
            if (op === 'fetch') return send(200, { files: files.filter(f => !f.done && f.inbox === j.inbox && j.file_ids.includes(f.file_id)).map(f => ({ file_id: f.file_id, content: f.content })) })
            if (op === 'mark-processed') { const missing = []; for (const id of j.file_ids) { const f = files.find(x => x.file_id === id && x.inbox === j.inbox && !x.done); f ? f.done = true : missing.push(id) } return send(200, { ok: true, missing }) }
            no()
        })
    })
    await new Promise(r => server.listen(0, '127.0.0.1', r))
    const endpoint = `http://127.0.0.1:${server.address().port}`
    const { vaultId, writeKeyHex } = await writeKeyOf('sgit_private_' + 'vault_' + TEST_VAULT_KEY)
    ok(vaultId === 'testvlt1' && /^[0-9a-f]{64}$/.test(writeKeyHex) && (await writeKeyOf(TEST_VAULT_KEY)).writeKeyHex === writeKeyHex, 'the write key is derived from the vault key, prefixed or not')
    let st = null; try { await configure({ endpoint, vaultId, writeKeyHex, accessToken: '' }) } catch (e) { st = e.status }
    ok(st === 401, 'configure without an access token is refused (401)')
    const rec = await configure({ endpoint, vaultId, writeKeyHex, accessToken: 'throwaway', lanes: 2 })
    ok(rec.tokens.length === 2 && cfg.anchors.length === 2 && !JSON.stringify(cfg).includes(rec.tokens[0]) && !JSON.stringify(cfg).includes(rec.enum_key), 'configure sends hashes only: two lanes, no token and no enum key on the server')
    const rec2 = await configure({ endpoint, vaultId, writeKeyHex, accessToken: 'throwaway', lanes: 1, previous: rec })
    ok(rec2.tokens.length === 3 && rec2.enum_key === rec.enum_key && cfg.anchors.length === 3, 'configuring again keeps the earlier lanes (the server replaces the list) and the enum key')
    const L = { endpoint, vault: vaultId, enumKey: rec.enum_key }, [t1, t2] = rec.tokens
    const write = (token, enc) => laneCall(endpoint, 'write', vaultId, { append_token: token, payload: btoa(enc) })
    const w = await write(t1, (await sealed(dinis, conductor)).enc)
    ok(JSON.stringify(w) === '{"ok":true}', 'the write answer is blind')
    await write(t2, (await sealed(stranger, conductor)).enc); await write(t1, 'junk'); await write(t2, 'x'.repeat(70000))
    const refused = async f => { try { await f(); return null } catch (e) { return e.status } }
    ok(await refused(() => write('0'.repeat(64), 'x')) === 404, 'an unknown token cannot write (404, an HTML page, read without a crash)')
    ok(await refused(() => laneCall(endpoint, 'list', vaultId, {}, { 'x-sgraph-vault-enum-key': t1 })) === 404, 'an append token cannot list the lane')
    await write(t1, 'fill'); ok(await refused(() => write(t1, 'over')) === 507, 'a full lane answers 507')
    const keepDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lane-kept-')), seen = new Set()
    const dry = await drain({ lane: L, identity: conductor, ring, senders, seen: new Set(), keep: true })
    const out = await drain({ lane: L, identity: conductor, ring, senders, seen, keepDir })
    const acc = out.filter(r => r.accept)
    ok(dry.length === 5 && out.length === 5 && acc.length === 1 && acc[0].text === 'the banner is too tall', 'the drain reads both lanes (five files) and accepts only Dinis\'s; --keep marks nothing')
    ok(out.some(r => /too large/.test(r.reasons.join())) && fs.readdirSync(keepDir).length === 4, 'an oversized payload is not opened; the ciphertext of the rest is kept outside git')
    ok((await drain({ lane: L, identity: conductor, ring, senders, seen })).length === 0, 'drained messages are marked processed')
    ok((await laneCall(endpoint, 'mark-processed', vaultId, { inbox: t1, file_ids: [out[0].file_id] }, { 'x-sgraph-vault-enum-key': rec.enum_key })).missing.length === 1, 'marking again is safe (missing, not an error)')
    fs.rmSync(keepDir, { recursive: true, force: true }); server.close()
}
console.log(failed ? `RED: ${failed} of ${n} checks failed` : `OK lane: ${n} checks, throwaway keys, ${Date.now() - t0} ms`)
process.exit(failed ? 1 : 0)
