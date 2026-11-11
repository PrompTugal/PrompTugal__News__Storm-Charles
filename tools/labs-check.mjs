#!/usr/bin/env node
// The Labs' browser check (incident.labs@web-summit.dinis). Opens every experiment of a built site in a headless browser, wide
// and narrow, and checks what the gate cannot: the page drew marks, nothing is wider than the screen, a click on a mark fills
// "This item" with a source, and the console stayed quiet. Reads the built site only; writes nothing; exits 1 on a failure.
//   node admin/build/build.mjs && node tools/labs-check.mjs [--site _site] [--only decisions/state] [--url https://...] [--json]
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d }
const site = path.resolve(arg('--site', '_site')), only = arg('--only', ''), remote = arg('--url', ''), asJson = process.argv.includes('--json')
const WIDTHS = [[1680, 950], [390, 800]]
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.md': 'text/markdown', '.svg': 'image/svg+xml' }

// the experiments are the pages of the repository's labs/ that mount one
const pages = []
for (const area of fs.readdirSync('labs', { withFileTypes: true })) {
  if (!area.isDirectory()) continue
  for (const f of fs.readdirSync(path.join('labs', area.name))) {
    if (!f.endsWith('.md')) continue
    const m = fs.readFileSync(path.join('labs', area.name, f), 'utf8').match(/data-lab="([^"]+)"/)
    if (m && (!only || m[1] === only)) pages.push({ lab: m[1], url: 'labs/' + area.name + '/' + f.replace(/\.md$/, '.html') })
  }
}
if (!pages.length) { console.error('labs-check: no experiment found'); process.exit(1) }

let server = null, base = remote.replace(/\/?$/, '/')
if (!remote) {
  if (!fs.existsSync(path.join(site, 'index.html'))) { console.error('labs-check: no built site at ' + site + ' (run node admin/build/build.mjs)'); process.exit(1) }
  server = http.createServer((req, res) => {
    let p = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)); if (p.endsWith(path.sep)) p += 'index.html'
    const file = path.join(site, p)
    if (!file.startsWith(site) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end('not found'); return }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res)
  })
  await new Promise(r => server.listen(0, '127.0.0.1', r)); base = 'http://127.0.0.1:' + server.address().port + '/'
}

const { chromium } = createRequire('/')('playwright')
const browser = await chromium.launch()
const out = []; let bad = 0
for (const pg of pages) {
  for (const [w, ht] of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: ht } }), page = await ctx.newPage(), errors = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)) }); page.on('pageerror', e => errors.push(String(e).slice(0, 160)))
    const r = { lab: pg.lab, width: w, marks: 0, tables: 0, overflow: null, item: '', errors, fail: [] }
    try {
      await page.goto(base + pg.url, { waitUntil: 'load' })
      await page.waitForSelector('.lab [data-item], .lab .lab-stage p.meta', { timeout: 8000 }).catch(() => { })
      await page.waitForTimeout(250)
      Object.assign(r, await page.evaluate(() => ({ marks: document.querySelectorAll('.lab [data-item]').length, tables: document.querySelectorAll('.lab details.wx-table').length, overflow: document.documentElement.scrollWidth - innerWidth, failed: (document.querySelector('.lab-stage') || {}).textContent.includes('failed to draw') })))
      if (r.marks) {
        // open the first mark by its own click handler (a mark may sit under another in a dense chart)
        r.item = await page.evaluate(() => { const m = document.querySelector('.lab [data-item]'); m.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); const p = document.querySelector('#panel-item, .lab-item, .lab-panel:not([hidden])'); return p ? p.textContent.replace(/\s+/g, ' ').trim() : '' })
        r.overflowOpen = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
      }
      if (!r.marks) r.fail.push('no marks'); if (r.failed) r.fail.push('failed to draw')
      if (r.overflow > 0) r.fail.push('wider than the screen by ' + r.overflow + ' px'); if (r.overflowOpen > 0) r.fail.push('wider by ' + r.overflowOpen + ' px with the item open')
      if (r.marks && !/Where is the evidence\?/.test(r.item)) r.fail.push('a click did not open an item')
      if (errors.length) r.fail.push(errors.length + ' console error(s): ' + errors[0])
    } catch (e) { r.fail.push(String(e.message || e).slice(0, 160)) }
    r.item = r.item.slice(0, 80); if (r.fail.length) bad++
    out.push(r); await ctx.close()
  }
}
await browser.close(); if (server) server.close()
if (asJson) console.log(JSON.stringify(out, null, 2))
else for (const r of out) console.log((r.fail.length ? 'FAIL ' : 'ok   ') + r.lab.padEnd(22) + String(r.width).padStart(5) + ' px  ' + String(r.marks).padStart(4) + ' marks  ' + r.tables + ' table(s)' + (r.fail.length ? '  ' + r.fail.join('; ') : ''))
console.log((bad ? 'labs-check: ' + bad + ' FAILED of ' : 'labs-check: OK ') + out.length + ' checks (' + pages.length + ' experiments, ' + WIDTHS.length + ' widths)' + (remote ? ' at ' + remote : ''))
process.exit(bad ? 1 : 0)
