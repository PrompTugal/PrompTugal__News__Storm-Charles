#!/usr/bin/env node
// incident.meteorology@web-summit.dinis: the text of a page that only exists after its scripts run (used by meteorology-read.mjs
// for items marked "render": true).   node tools/meteorology-render.mjs <url> <out file>   -> writes the visible text, prints the status
import fs from 'fs'
const [, , url, out] = process.argv
const { chromium } = (await import('module')).createRequire(import.meta.url)('playwright')
const b = await chromium.launch(); let status = 0
try {
    const p = await b.newPage({ userAgent: 'storm-charles.promptugal.news meteorology reader (public research; one request per address)', locale: 'en-GB' })
    // the status of the document itself, kept even when goto gives up waiting (a slow page that did answer is still a read)
    let seen = 0; p.on('response', x => { if (x.request().isNavigationRequest() && x.frame() === p.mainFrame()) seen = x.status() })
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 }).catch(() => null)
    status = r ? r.status() : seen
    await p.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => { })   // a page that never goes quiet is read as it stands
    await p.waitForTimeout(1500)
    fs.writeFileSync(out, await p.evaluate(() => document.body ? document.body.innerText : ''))
} finally { await b.close() }
console.log(status)
