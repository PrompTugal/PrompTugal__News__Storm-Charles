#!/usr/bin/env node
// lane-e2e.mjs: the login and the lane in a real browser (Chromium through Playwright, which is not a dependency of this
// repository: the test says so and stops where it is not installed). Throwaway keys; a virtual passkey with PRF; the
// lane's server stood in for by the test (the browser's POST is caught and answered here). Nothing leaves this machine.
//   node tools/lane-e2e.mjs
// It builds the site, serves a copy in which data/keys.json's conductor is a throwaway key and the lane is "open", then:
//   1. /account/: makes a key behind the passkey; the private halves are nowhere in localStorage in the clear;
//   2. another page (with the one script line the build is to add): the box appears, locked; feedback is written, the
//      passkey unlocks, the browser seals and POSTs; this process opens the payload with the throwaway conductor key and
//      accepts it: signed by the browser's key, with the page's URL and the version;
//   3. the reverse path: this process seals a reply to the browser's key; /account/ opens it, "signature checked";
//   4. with no lane, the box shows the m1 code instead, and that code opens the same way;
//   5. a second browser, behind a passphrase: make, lock, unlock, seal.
import fs from 'node:fs'
import os from 'node:os'
import http from 'node:http'
import path from 'node:path'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { K, M, ROOT, judge } from './lane-common.mjs'

let chromium
try { ({ chromium } = createRequire(import.meta.url)('playwright')) } catch { console.log('SKIP lane-e2e: Playwright is not installed here'); process.exit(0) }
let n = 0, failed = 0
const ok = (cond, what) => { n++; if (!cond) { failed++; console.log('FAIL ' + what) } }

execFileSync(process.execPath, [path.join(ROOT, 'admin/build/build.mjs')], { stdio: 'ignore', env: { ...process.env, VERSION: 'v0.e2e' } })
const site = fs.mkdtempSync(path.join(os.tmpdir(), 'lane-e2e-'))
fs.cpSync(path.join(ROOT, '_site'), site, { recursive: true })
const J = rel => JSON.parse(fs.readFileSync(path.join(site, rel), 'utf8')), W = (rel, o) => fs.writeFileSync(path.join(site, rel), JSON.stringify(o))
const conductor = await K.generate('conductor (throwaway)')
const keys = J('data/keys.json'); keys.keys.find(k => k.id === 'incident-conductor-dinis').bundle = conductor.bundle; W('data/keys.json', keys)
const lanes = J('data/lanes.json')
const setLane = on => { Object.assign(lanes.to_conductor, on ? { enabled: true, vault_id: 'e2evault', tokens: ['a'.repeat(32)] } : { enabled: false, vault_id: '', tokens: [] }); W('data/lanes.json', lanes) }
setLane(true)
// the one line the build is asked to add to every page
fs.writeFileSync(path.join(site, 'index.html'), fs.readFileSync(path.join(site, 'index.html'), 'utf8').replace('</head>', '<script type="module" src="app/login/feedback.js"></script></head>'))

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.md': 'text/markdown; charset=utf-8' }
const server = http.createServer((req, res) => {
    let f = path.join(site, decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (f.endsWith(path.sep)) f = path.join(f, 'index.html')
    if (!f.startsWith(site) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end() }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }); res.end(fs.readFileSync(f))
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const base = `http://localhost:${server.address().port}`

const browser = await chromium.launch()
async function session({ passkey }) {
    const ctx = await browser.newContext(), page = await ctx.newPage(), errors = [], posts = []
    page.on('pageerror', e => errors.push(String(e))); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('dialog', d => d.accept())
    await ctx.route('https://dev.send.sgraph.ai/**', route => {
        const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST' }
        if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 204, headers: cors })
        posts.push({ url: route.request().url(), body: JSON.parse(route.request().postData()) })
        route.fulfill({ status: 200, headers: cors, contentType: 'application/json', body: '{"ok":true}' })
    })
    if (passkey) {
        const cdp = await ctx.newCDPSession(page); await cdp.send('WebAuthn.enable')
        await cdp.send('WebAuthn.addVirtualAuthenticator', { options: { protocol: 'ctap2', ctap2Version: 'ctap2_1', transport: 'internal', hasResidentKey: true, hasUserVerification: true, isUserVerified: true, hasPrf: true, automaticPresenceSimulation: true } })
    }
    return { ctx, page, errors, posts }
}
const ringWith = bundle => { const list = [{ id: 'dinis', agent: 'Dinis (throwaway)', status: 'active', bundle }, { id: 'conductor', agent: 'conductor', status: 'active', bundle: conductor.bundle }]; return { list, byFp: new Map(list.map(k => [k.bundle.signing_fingerprint, k.bundle])) } }
const stored = page => page.evaluate(() => JSON.stringify(Object.entries(localStorage)))

// ---- a passkey
{
    const { page, errors, posts } = await session({ passkey: true })
    await page.goto(base + '/index.html'); ok(await page.locator('.sc-fb-btn').count() === 0, 'no key in the browser: no feedback box for readers')
    await page.goto(base + '/account/index.html')
    await page.getByRole('button', { name: 'Log in with a passkey' }).click()
    await page.locator('#sc-fp').waitFor({ timeout: 60000 })
    const bundle = JSON.parse(await page.locator('#sc-bundle').inputValue()), ring = ringWith(bundle)
    ok((await K.checkBundle(bundle)).length === 0 && bundle.signing_fingerprint === (await page.locator('#sc-fp').textContent()), '1. the page shows a public bundle that checks, and its fingerprint')
    const ls = await stored(page)
    ok(!/PRIVATE KEY/.test(ls) && !ls.includes(K.b64(K.unpem(bundle.encrypt).der).slice(0, 40)) && /pki\.local\.v1\./.test(ls), '1. localStorage holds the account as ciphertext only')
    // 2. feedback from another page, locked
    await page.goto(base + '/index.html')
    await page.locator('.sc-fb-btn').click(); await page.locator('.sc-fb textarea').first().fill('the banner is too tall on a phone')
    await page.getByRole('button', { name: 'Seal and send' }).click()
    await page.locator('.sc-fb .sc-status.ok').waitFor({ timeout: 30000 })
    ok(posts.length === 1 && posts[0].url.endsWith('/api/vault/append/write/e2evault') && posts[0].body.append_token === 'a'.repeat(32), '2. one POST to the lane, with the append token')
    const r = await judge(atob(posts[0].body.payload), conductor, { ring, senders: ['dinis'] })
    ok(r.accept && r.text === 'the banner is too tall on a phone' && r.from === bundle.signing_fingerprint, '2. the conductor opens and accepts it: ' + r.reasons)
    ok(r.subject === `feedback: ${base}/index.html (v0.e2e)`, '2. the subject carries the page and the version: ' + r.subject)
    ok(!JSON.stringify(posts[0].body).includes('banner'), '2. nothing readable in what was posted')
    // 3. the reverse path
    const reply = await M.sealMessage(await M.compose({ to: bundle, from: conductor, subject: 're: the banner', text: 'fixed in v0.e2e+1', expires: new Date(Date.now() + 864e5).toISOString() }), bundle, conductor)
    W('account/inbox.json', { messages: [{ at: new Date().toISOString(), code: reply.code }] })
    await page.goto(base + '/account/index.html'); await page.getByRole('button', { name: 'Log in with your passkey' }).click()
    await page.locator('#sc-inbox .msg').waitFor({ timeout: 30000 })
    const shown = await page.locator('#sc-inbox .msg').textContent()
    ok(/signature checked/.test(shown) && /fixed in v0\.e2e\+1/.test(shown), '3. the reply opens at /account/ and the signature is the conductor\'s: ' + shown)
    // 4. no lane: the code is shown
    setLane(false); await page.goto(base + '/index.html')
    await page.locator('.sc-fb-btn').click(); await page.locator('.sc-fb textarea').first().fill('no lane yet'); await page.getByRole('button', { name: 'Seal and send' }).click()
    await page.locator('.sc-fb textarea.code:not([hidden])').waitFor({ timeout: 30000 })
    const r2 = await judge(await page.locator('.sc-fb textarea.code').inputValue(), conductor, { ring, senders: ['dinis'] })
    ok(r2.accept && r2.text === 'no lane yet' && posts.length === 1, '4. with no lane the m1 code is shown, nothing is posted, and the code opens: ' + r2.reasons)
    // forget
    await page.goto(base + '/account/index.html'); await page.getByRole('button', { name: 'Forget this key' }).click()
    await page.getByRole('button', { name: 'Log in with a passkey' }).waitFor()
    ok((await stored(page)) === '[]', 'forget leaves nothing in localStorage')
    ok(errors.length === 0, 'no console or page error (the Content-Security-Policy included): ' + errors.join(' | '))
}
// ---- a passphrase
{
    const { page, errors } = await session({ passkey: false }), pw = 'correct horse battery e2e'
    await page.goto(base + '/account/index.html')
    await page.getByText('No passkey here? Use a passphrase').click()
    await page.locator('#sc-p1').fill(pw); await page.locator('#sc-p2').fill(pw)
    await page.getByRole('button', { name: 'Create your key behind this passphrase' }).click()
    await page.locator('#sc-fp').waitFor({ timeout: 60000 })
    const bundle = JSON.parse(await page.locator('#sc-bundle').inputValue()), ls = await stored(page)
    ok(/ENCRYPTED PRIVATE KEY/.test(ls) && !/BEGIN PRIVATE KEY/.test(ls), '5. behind a passphrase: only encrypted private halves are stored')
    await page.reload(); await page.locator('#sc-pass').fill('wrong passphrase here'); await page.getByRole('button', { name: 'Log in', exact: true }).click()
    await page.locator('.sc-status.bad').waitFor(); ok(await page.locator('#sc-fp').count() === 0, '5. a wrong passphrase does not unlock')
    await page.locator('#sc-pass').fill(pw); await page.getByRole('button', { name: 'Log in', exact: true }).click(); await page.locator('#sc-fp').waitFor({ timeout: 30000 })
    await page.locator('.sc-fb-btn').click(); await page.locator('.sc-fb textarea').first().fill('from the passphrase browser'); await page.getByRole('button', { name: 'Seal and send' }).click()
    await page.locator('.sc-fb textarea.code:not([hidden])').waitFor({ timeout: 30000 })
    const r = await judge(await page.locator('.sc-fb textarea.code').inputValue(), conductor, { ring: ringWith(bundle), senders: ['dinis'] })
    ok(r.accept && r.text === 'from the passphrase browser', '5. sealed from the passphrase browser, accepted: ' + r.reasons)
    ok(errors.length === 0, 'no console or page error: ' + errors.join(' | '))
}
await browser.close(); server.close(); fs.rmSync(site, { recursive: true, force: true })
console.log(failed ? `RED: ${failed} of ${n} checks failed` : `OK lane-e2e: ${n} checks in Chromium, throwaway keys`)
process.exit(failed ? 1 : 0)
