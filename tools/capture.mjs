#!/usr/bin/env node
// capture.mjs: what an outside page looked like when we read it.
//   node tools/capture.mjs <url> [<url> ...] [--list file.json] [--out DIR] [--gap 4] [--frame 1280x1600]
// For each address, one at a time and a few seconds apart, with a plain client name:
//   1. robots.txt of the host is read and obeyed (a disallowed address is recorded as "not captured: robots", never fetched);
//   2. the page is loaded in the pre-installed Chromium (never logged in, no paywall or consent wall bypassed: what a
//      first-time public visitor is served is what is kept);
//   3. kept, OUTSIDE git, under <out>/<source>/<yyyy>/<mm>/<dd>/<hhmm>-<slug>/:
//        raw.html         the response body as served          -> sha256_html
//        dom.html         the document after scripts ran       -> sha256_dom
//        text.txt         the visible text, whitespace folded  -> sha256_text   (what "changed / unchanged" is judged on)
//        screenshot.jpg   the full page, 1280 px wide          -> sha256_screenshot
//        screenshot-clean.jpg  the same load with consent overlays hidden (when there were any), said so on the page
//        capture.json     status, the headers that matter, the title, the time read, the hashes
// It writes nothing in the repository. tools/capture-records.mjs turns <out> into evidence/ records and fills the vaults.
// Nothing here calls a model.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const CLIENT = 'Mozilla/5.0 (compatible; page-capture/1.0)'   // plain: says what it is, names nobody
export const BY = 'incident.archivist@web-summit.dinis'
export const DEFAULT_OUT = process.env.CAPTURE_OUT || path.join(process.env.HOME || '/tmp', 'captures')
const KEEP_HEADERS = ['date', 'last-modified', 'etag', 'content-type', 'content-length', 'content-language', 'cache-control', 'expires', 'age', 'link', 'x-robots-tag', 'location']
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ---- which source an address belongs to, and whether its page may be shown (evidence/sources.json)
export const SOURCES = JSON.parse(fs.readFileSync(path.join(ROOT, 'evidence/sources.json'), 'utf8'))
export function sourceOf(host) {
    const h = host.replace(/^www\./, '')
    for (const s of SOURCES.sources) { const x = s.hosts.find(x => h === x || h.endsWith('.' + x)); if (x) return s.by_host ? { ...s, id: (h.endsWith('.sapo.pt') || h.endsWith('.iol.pt') ? h : x).replace(/\.(pt|com|org|net|co\.uk)$/, '').replace(/[^a-z0-9]+/g, '-'), name: h } : s }
    return { id: h.replace(/[^a-z0-9]+/g, '-'), name: h, kind: 'unclassified', show: false, licence: 'Not yet classified: the capture is kept privately and only its hash, title and time are shown.' }
}
export function slugOf(u) {
    const p = (u.pathname + (u.search ? '-' + u.search.slice(1) : '')).toLowerCase().replace(/\.(html?|php|aspx?)$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const s = p || 'front'
    return s.length <= 72 ? s : s.slice(0, 60).replace(/-+$/, '') + '-' + sha(u.href).slice(0, 8)
}

// ---- robots.txt (the longest matching rule wins; Allow beats Disallow on a tie), read with curl through the session's proxy
const robotsCache = new Map()
function robots(origin) {
    if (robotsCache.has(origin)) return robotsCache.get(origin)
    let r = { status: 0, groups: [] }
    try {
        const out = execFileSync('curl', ['-sS', '-L', '-m', '20', '--retry', '2', '--retry-all-errors', '-A', CLIENT, '-w', '\n%{http_code}', origin + '/robots.txt'], { encoding: 'utf8', maxBuffer: 4e6 })
        const i = out.lastIndexOf('\n'); r.status = +out.slice(i + 1); const body = out.slice(0, i)
        if (r.status === 200 && !/^\s*</.test(body)) {
            let g = null, lastWasAgent = false
            for (const raw of body.split(/\r?\n/)) {
                const l = raw.replace(/#.*/, '').trim(); const m = l.match(/^([A-Za-z-]+)\s*:\s*(.*)$/); if (!m) continue
                const k = m[1].toLowerCase(), v = m[2].trim()
                if (k === 'user-agent') { if (!lastWasAgent) { g = { agents: [], rules: [] }; r.groups.push(g) } g.agents.push(v.toLowerCase()); lastWasAgent = true }
                else { lastWasAgent = false; if (g && (k === 'allow' || k === 'disallow') && v) g.rules.push({ allow: k === 'allow', path: v }) }
            }
        }
    } catch (e) { r.error = String(e.message).split('\n')[0] }
    robotsCache.set(origin, r); return r
}
export function allowed(u) {
    const r = robots(u.origin)
    if (r.status >= 500 || (r.status === 0 && r.error)) return { ok: false, why: `robots.txt could not be read (${r.status || r.error}): not fetched, to be safe` }
    if (r.status !== 200) return { ok: true, why: `no robots.txt (${r.status})` }
    const mine = r.groups.filter(g => g.agents.some(a => a !== '*' && 'page-capture'.includes(a)))
    const groups = mine.length ? mine : r.groups.filter(g => g.agents.includes('*'))
    const target = u.pathname + u.search
    let best = null
    for (const g of groups) for (const rule of g.rules) {
        const re = new RegExp('^' + rule.path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'))
        if (re.test(target) && (!best || rule.path.length > best.path.length || (rule.path.length === best.path.length && rule.allow))) best = rule
    }
    return best && !best.allow ? { ok: false, why: `robots.txt disallows ${best.path}` } : { ok: true, why: best ? `robots.txt allows ${best.path}` : 'robots.txt has no rule for this address' }
}

// ---- one capture
export async function capture(browser, url, out, frame = null) {
    const u = new URL(url), src = sourceOf(u.hostname)
    const hh = u.hostname.replace(/^www\./, '')
    if (SOURCES.never.hosts.some(x => hh === x || hh.endsWith('.' + x))) return { url: u.href, host: u.hostname, captured: false, never: true, why: 'a social platform: never captured (CLAUDE.md, People)' }
    if (SOURCES.forbidden.hosts.some(x => hh === x || hh.endsWith('.' + x))) return { url: u.href, host: u.hostname, captured: false, never: true, why: 'its terms restrict automated access: never requested (link only)' }
    const rb = allowed(u)
    const t = new Date(), iso = t.toISOString().replace(/\.\d+Z$/, 'Z')
    const [yyyy, mm, dd] = iso.slice(0, 10).split('-'), hhmm = iso.slice(11, 16).replace(':', '')
    const id = `${src.id}/${yyyy}/${mm}/${dd}/${hhmm}-${slugOf(u)}`
    const dir = path.join(out, id)
    const rec = { id, url: u.href, host: u.hostname, source: src.id, read_utc: iso, client: CLIENT, robots: rb.why, by: BY }
    if (!rb.ok) { rec.captured = false; rec.why = rb.why; fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'capture.json'), JSON.stringify(rec, null, 2) + '\n'); return rec }
    const ctx = await browser.newContext({ userAgent: CLIENT, viewport: { width: 1280, height: frame ? frame[1] : 900 }, locale: 'pt-PT', timezoneId: 'UTC', acceptDownloads: false, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    try {
        let resp = null, navErr = null
        try { resp = await page.goto(u.href, { waitUntil: 'domcontentloaded', timeout: 45000 }) } catch (e) { navErr = String(e.message).split('\n')[0] }
        if (!resp) {
            // not a page a browser renders (a download, a feed) or a failure: fetch the bytes once with the same client name
            const r = await ctx.request.get(u.href, { timeout: 45000, maxRedirects: 5 }).catch(e => { navErr = (navErr ? navErr + '; ' : '') + String(e.message).split('\n')[0]; return null })
            if (!r) { rec.captured = false; rec.why = navErr; fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'capture.json'), JSON.stringify(rec, null, 2) + '\n'); return rec }
            const body = await r.body(), h = r.headers()
            fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'raw.html'), body)
            Object.assign(rec, { captured: true, rendered: false, note: 'Not rendered by the browser (served as a download or a data file): the bytes are kept, there is no screenshot.', final_url: r.url(), status: r.status(), headers: Object.fromEntries(KEEP_HEADERS.filter(k => h[k]).map(k => [k, h[k]])), title: '', sha256_html: sha(body), bytes: { html: body.length } })
            const txt = body.toString('utf8').replace(/\s+/g, ' ').trim(); rec.sha256_text = sha(txt); fs.writeFileSync(path.join(dir, 'text.txt'), txt)
            fs.writeFileSync(path.join(dir, 'capture.json'), JSON.stringify(rec, null, 2) + '\n'); return rec
        }
        await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {})
        await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
        // --frame: the top of the page exactly as the viewport shows it, before any scrolling (for annotated studies)
        let frameShot = null
        if (frame) { await sleep(1200); frameShot = await page.screenshot({ type: 'jpeg', quality: 78, timeout: 60000 }).catch(() => null) }
        // lazy content: walk down the page once, then back to the top
        await page.evaluate(async () => { const H = () => document.documentElement.scrollHeight; for (let y = 0; y < Math.min(H(), 30000); y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)) } window.scrollTo(0, 0) }).catch(() => {})
        // wait until the visible text stops changing (menus and dates filled in by scripts), at most about 8 s
        { let last = -1, same = 0; for (let k = 0; k < 10 && same < 2; k++) { const n = await page.evaluate(() => document.body ? document.body.innerText.length : 0).catch(() => 0); same = n === last ? same + 1 : 0; last = n; await sleep(800) } }
        const h = resp.headers()
        let raw = null; try { raw = await resp.body() } catch { raw = null }
        const dom = Buffer.from(await page.content(), 'utf8')
        const text = (await page.evaluate(() => document.body ? document.body.innerText : '').catch(() => '')).replace(/\s+/g, ' ').trim()
        const title = (await page.title().catch(() => '')).trim()
        const dims = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight })).catch(() => ({ w: 1280, h: 900 }))
        const clipH = Math.min(dims.h, 16000)   // a very long page is cut at 16,000 px and says so
        const shot = await page.screenshot({ type: 'jpeg', quality: 78, fullPage: dims.h <= 16000, clip: dims.h > 16000 ? { x: 0, y: 0, width: 1280, height: clipH } : undefined, timeout: 60000 })
        // a second picture with consent notices and full-screen overlays hidden (nothing is clicked, nothing is accepted):
        // the first picture is the page as served; this one is so the words under a cookie notice can be read
        const hidden = await page.evaluate(() => {
            let n = 0; const vw = innerWidth, vh = innerHeight
            for (const el of document.querySelectorAll('body *')) {
                const cs = getComputedStyle(el); if (cs.position !== 'fixed' || cs.display === 'none') continue
                const r = el.getBoundingClientRect(), big = r.width * r.height > 0.3 * vw * vh
                if (big || /cookie|consent|gdpr|privac/i.test((el.id || '') + ' ' + (el.className && el.className.baseVal === undefined ? el.className : '') + ' ' + (el.innerText || '').slice(0, 400))) { el.style.setProperty('display', 'none', 'important'); n++ }
            }
            document.documentElement.style.setProperty('overflow', 'auto', 'important'); document.body.style.setProperty('overflow', 'auto', 'important')
            return n
        }).catch(() => 0)
        let clean = null, cleanText = '', frameClean = null
        if (hidden) {
            await sleep(300)
            if (frame) { await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {}); await sleep(300); frameClean = await page.screenshot({ type: 'jpeg', quality: 78, timeout: 60000 }).catch(() => null) }
            clean = await page.screenshot({ type: 'jpeg', quality: 78, fullPage: dims.h <= 16000, clip: dims.h > 16000 ? { x: 0, y: 0, width: 1280, height: clipH } : undefined, timeout: 60000 }).catch(() => null)
            cleanText = (await page.evaluate(() => document.body ? document.body.innerText : '').catch(() => '')).replace(/\s+/g, ' ').trim()
        }
        fs.mkdirSync(dir, { recursive: true })
        if (clean) fs.writeFileSync(path.join(dir, 'screenshot-clean.jpg'), clean)
        if (frameShot) fs.writeFileSync(path.join(dir, 'frame.jpg'), frameShot)
        if (frameClean) fs.writeFileSync(path.join(dir, 'frame-clean.jpg'), frameClean)
        if (raw) fs.writeFileSync(path.join(dir, 'raw.html'), raw)
        fs.writeFileSync(path.join(dir, 'dom.html'), dom); fs.writeFileSync(path.join(dir, 'text.txt'), text); fs.writeFileSync(path.join(dir, 'screenshot.jpg'), shot)
        const chain = []; for (let r = resp.request().redirectedFrom(); r; r = r.redirectedFrom()) chain.unshift(r.url())
        Object.assign(rec, {
            captured: true, rendered: true, final_url: page.url(), redirects: chain.length ? chain : undefined, status: resp.status(),
            headers: Object.fromEntries(KEEP_HEADERS.filter(k => h[k]).map(k => [k, h[k]])),
            title, sha256_html: raw ? sha(raw) : null, sha256_dom: sha(dom), sha256_text: sha(text), sha256_screenshot: sha(shot),
            bytes: { html: raw ? raw.length : null, dom: dom.length, text: Buffer.byteLength(text), screenshot: shot.length },
            screenshot: { format: 'jpeg', quality: 78, width: 1280, height: clipH, page_height: dims.h, cut: dims.h > 16000 },
            frame: frameShot ? { sha256: sha(frameShot), bytes: frameShot.length, width: 1280, height: frame[1], what: 'The top of the page as the viewport showed it on load, before any scrolling.', clean: frameClean ? { sha256: sha(frameClean), bytes: frameClean.length, what: 'The same frame with ' + hidden + ' fixed overlay element(s) hidden by us (a consent notice): nothing was clicked or accepted.' } : undefined } : undefined,
            clean: clean ? { sha256_screenshot: sha(clean), bytes: clean.length, hidden, what: 'The same load with ' + hidden + ' fixed overlay element(s) hidden by us (a cookie or consent notice): nothing was clicked or accepted.' } : undefined,
            excerpt: (cleanText || text).slice(0, 280),
        })
        fs.writeFileSync(path.join(dir, 'capture.json'), JSON.stringify(rec, null, 2) + '\n')
        return rec
    } finally { await ctx.close().catch(() => {}) }
}

// ---- command line
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2), urls = []
    let out = DEFAULT_OUT, gap = 4, frame = null
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--out') out = path.resolve(args[++i])
        else if (args[i] === '--frame') frame = args[++i].split(/[x,]/).map(Number)
        else if (args[i] === '--gap') gap = Math.max(2, +args[++i])
        else if (args[i] === '--list') urls.push(...JSON.parse(fs.readFileSync(args[++i], 'utf8')).map(x => typeof x === 'string' ? x : x.url))
        else urls.push(args[i])
    }
    if (!urls.length) { console.log('usage: node tools/capture.mjs <url> [...] [--list file.json] [--out DIR] [--gap seconds]'); process.exit(2) }
    if (path.resolve(out).startsWith(ROOT + path.sep)) { console.log('capture.mjs: --out must be outside the repository (raw captures never go in git)'); process.exit(2) }
    const { chromium } = createRequire(import.meta.url)('playwright')
    const browser = await chromium.launch()
    let n = 0
    for (const url of urls) {
        if (n++) await sleep(gap * 1000)
        let rec; try { rec = await capture(browser, url, out, frame) } catch (e) { rec = { url, captured: false, why: String(e.message).split('\n')[0] } }
        console.log(JSON.stringify({ id: rec.id, url: rec.url, captured: rec.captured, status: rec.status, title: rec.title, text: rec.sha256_text?.slice(0, 12), why: rec.why }))
    }
    await browser.close()
}
