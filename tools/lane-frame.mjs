#!/usr/bin/env node
// lane-frame.mjs: copy the site frame's header, notice and footer caption into account/index.html, which is written by hand
// so that it can keep a Content-Security-Policy with no inline script (SECURITY.md, section a). Run it when the frame changes
// (tools/lane-test.mjs goes red when they differ):   node tools/lane-frame.mjs   then re-run the tests and commit.
// It builds the site, reads a page one folder deep (the same depth as /account/), and replaces only those three parts.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { ROOT } from './lane-common.mjs'

execFileSync(process.execPath, [path.join(ROOT, 'admin/build/build.mjs')], { stdio: 'ignore' })
const frame = fs.readFileSync(path.join(ROOT, '_site/agents/JOBS.html'), 'utf8'), file = path.join(ROOT, 'account/index.html')
const part = (re, what) => { const m = frame.match(re); if (!m) throw new Error(`the frame has no ${what}: read admin/build/build.mjs`); return m[0] }
const header = part(/<header class="top">[\s\S]*?<\/header>/, 'header').replace(/<a href="\.\.\/account\/index\.html">([^<]*)<\/a>/, '<a href="index.html" aria-current="page">$1</a>')
const notice = part(/<div class="notice">[\s\S]*?<\/div><\/div>/, 'notice'), cap = part(/<span class="cap">[\s\S]*?<\/span>/, 'footer caption')
if (/<script(?![^>]*\ssrc=)|\sstyle="|\son[a-z]+="/.test(header + notice + cap)) throw new Error('the frame now has an inline script, style or handler in these parts: /account/ cannot take it under its policy')
let page = fs.readFileSync(file, 'utf8')
page = page.replace(/<header class="top">[\s\S]*?<\/header>/, () => header).replace(/<div class="notice">[\s\S]*?<\/div><\/div>/, () => notice).replace(/<span class="cap">[\s\S]*?<\/span>/, () => cap)
fs.writeFileSync(file, page)
console.log('account/index.html: header, notice and footer caption copied from the frame')
