#!/usr/bin/env node
// Renders the decision brief's PDFs from a BUILT site (incident.brief@web-summit.dinis, 11 November 2026), for incident.ci@'s cached step.
//   node tools/brief-pdf.mjs --site _site --out <dir>     writes <dir>/brief-latest.pdf (from brief/index.html) and <dir>/edition-<n>.pdf
//   node tools/brief-pdf.mjs --inputs                     prints the files the PDFs are drawn from (the cache key), one per line, and exits
// Writes only into --out. Never fails a deploy: if Playwright or Chromium is missing, or a render fails, it warns and exits 0.
// A4 landscape, backgrounds printed, as admin/tools/render-pdf.cjs; the page's own print stylesheet (brief/brief.css) does the layout.
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null }
const warn = m => { console.log(`brief-pdf: WARN ${m}`); process.exit(0) }

// what the brief pages are drawn from: the editions are frozen markdown, so no incident data is read at build time
const FRAME = ['admin/build/build.mjs', 'app/site.css', 'app/design/family.css', 'app/design/frame.js', 'app/design/family/promptugal-wordmark-light.svg', 'app/design/family/promptugal-wordmark-dark.svg', 'tools/brief-make.mjs', 'tools/brief-pdf.mjs']
const inputs = () => [...fs.readdirSync(path.join(ROOT, 'brief')).map(f => 'brief/' + f), ...FRAME].filter(f => fs.existsSync(path.join(ROOT, f)) && fs.statSync(path.join(ROOT, f)).isFile()).sort()
if (process.argv.includes('--inputs')) {
  const list = inputs(), h = crypto.createHash('sha256')
  for (const f of list) { console.log(f); h.update(f + '\0').update(fs.readFileSync(path.join(ROOT, f))) }
  console.error(`key: ${h.digest('hex')}`)
  process.exit(0)
}
const site = arg('--site'), out = arg('--out')
if (!site || !out) { console.error('usage: node tools/brief-pdf.mjs --site <built site> --out <dir> | --inputs'); process.exit(2) }
const SITE = path.resolve(site), OUT = path.resolve(out)
if (!fs.existsSync(path.join(SITE, 'brief/index.html'))) warn(`${site}/brief/index.html not built: nothing rendered`)
console.log(`brief-pdf: inputs: ${inputs().join(' ')}`)

const pages = [['brief/index.html', 'brief-latest.pdf'], ...fs.readdirSync(path.join(SITE, 'brief')).map(f => f.match(/^edition-(\d+)\.html$/)).filter(Boolean).map(m => [`brief/${m[0]}`, `edition-${m[1]}.pdf`])]
let chromium
try { chromium = createRequire(import.meta.url)('playwright').chromium } catch { warn('playwright is not installed: no PDF rendered (the page prints from the browser)') }
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.md': 'text/plain' }
const srv = http.createServer((q, r) => {
  let p = path.join(SITE, decodeURIComponent(q.url.split('?')[0]))
  if (!p.startsWith(SITE)) { r.writeHead(403); return r.end() }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html')
  if (!fs.existsSync(p)) { r.writeHead(404); return r.end() }
  r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r)
})
srv.listen(0, '127.0.0.1', async () => {
  let b
  try { b = await chromium.launch() } catch (e) { srv.close(); warn(`Chromium did not launch (${String(e.message).split('\n')[0]}): no PDF rendered`) }
  fs.mkdirSync(OUT, { recursive: true })
  let n = 0
  for (const [rel, name] of pages) {
    const t0 = Date.now()
    try {
      const pg = await b.newPage()
      // only this site: any outside request (the page-views beacon, the contact desk) is refused while rendering
      await pg.route('**/*', rt => rt.request().url().startsWith(`http://127.0.0.1:${srv.address().port}/`) ? rt.continue() : rt.abort())
      await pg.goto(`http://127.0.0.1:${srv.address().port}/${rel}`, { waitUntil: 'networkidle' })
      await pg.emulateMedia({ media: 'print' })
      await pg.pdf({ path: path.join(OUT, name), format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true, margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' } })
      await pg.close(); n++
      console.log(`brief-pdf: ${name} from ${rel}, ${fs.statSync(path.join(OUT, name)).size} bytes, ${Date.now() - t0} ms`)
    } catch (e) { console.log(`brief-pdf: WARN ${name}: ${String(e.message).split('\n')[0]}`) }
  }
  await b.close(); srv.close()
  console.log(`brief-pdf: ${n} of ${pages.length} PDFs in ${out}`)
})
