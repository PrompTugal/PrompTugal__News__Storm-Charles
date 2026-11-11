#!/usr/bin/env node
// The Weather face's own rule, checked (incident.weather@web-summit.dinis): app/weather/ reads only what the data room publishes.
//   1. every fetch() in app/weather/*.js takes its address from the FILES table, and FILES holds only this site's own JSON under
//      api/v1/<incident>/, incidents/<incident>/incident.json, sources/<id>/data/, entities/ and evidence/, built from the page's own base;
//   2. no http(s) address appears in app/weather/ other than the links out to IPMA, ANEPC and PrompTugal News (links, never fetched);
//   0. app/weather/*.js parses (a script that does not parse leaves the front page empty);
//   3. no hex colour in app/weather/*.css (tokens only), and no <img>, url() or @import (nothing loaded from elsewhere).
// Run: node tools/weather-check.mjs   (prints OK or the failures; exit 1 on a failure). It writes nothing.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), dir = path.join(ROOT, 'app/weather'), fails = []
// what the data room publishes: JSON this site itself serves that carries its source and time read (the conductor, 11 Nov 02:37 UTC)
const ALLOWED = [/^api \+ '[\w\-/]+\.json'$/, /^room \+ 'incident\.json'$/, /^base \+ 'sources\/[\w-]+\/data\/[\w\-/]+\.json'$/, /^base \+ 'entities\/[\w\-/]+\.json'$/, /^base \+ 'evidence\/[\w\-/]+\.json'$/, /^base \+ 'data\/agents\/now\.json'$/]
const ALLOWED_LINKS = ['https://www.ipma.pt/', 'https://prociv.gov.pt/', 'https://promptugal.news/']   // the third: the family's own site (Dinis, ~10:32), a link, never fetched
for (const f of fs.readdirSync(dir)) {
    const s = fs.readFileSync(path.join(dir, f), 'utf8'), rel = 'app/weather/' + f
    for (const [u] of s.matchAll(/https?:\/\/[^\s"'<>)]+/g)) if (!ALLOWED_LINKS.includes(u)) fails.push(`${rel}: an outside address: ${u}`)
    if (f.endsWith('.js')) {
        try { execFileSync(process.execPath, ['--check', path.join(dir, f)], { stdio: 'pipe' }) } catch (e) { fails.push(`${rel}: does not parse: ${String(e.stderr || e.message).split('\n').filter(l => /Error/.test(l))[0] || 'syntax error'}`) }
        const fetches = [...s.matchAll(/\bfetch\s*\(([^,)]*)/g)].map(m => m[1].trim())
        for (const a of fetches) if (a !== 'FILES[k]') fails.push(`${rel}: fetch(${a}): every fetch must take its address from FILES`)
        if (/XMLHttpRequest|WebSocket|EventSource|sendBeacon|importScripts|\bimport\s*\(/.test(s)) fails.push(`${rel}: a network call other than fetch(FILES[k])`)
        const m = s.match(/var FILES = \{([\s\S]*?)\n  \}/)
        if (!m) fails.push(`${rel}: no FILES table`)
        else for (const [, v] of m[1].matchAll(/:\s*([^,\n]+)/g)) if (!ALLOWED.some(r => r.test(v.trim()))) fails.push(`${rel}: FILES entry not under the data room: ${v.trim()}`)
        if (!/var api = base \+ 'api\/v1\/' \+ inc \+ '\/', room = base \+ 'incidents\/' \+ inc \+ '\/'/.test(s)) fails.push(`${rel}: api and room must be built from the page's own base`)
        if (/<img\b|new Image\(/.test(s)) fails.push(`${rel}: an image: the Weather face draws with SVG and CSS from data`)
    }
    if (f.endsWith('.css')) {
        if (/#[0-9a-fA-F]{3,8}\b/.test(s.replace(/\/\*[\s\S]*?\*\//g, ''))) fails.push(`${rel}: a hex colour: tokens only`)
        if (/url\(|@import/.test(s)) fails.push(`${rel}: url() or @import: nothing is loaded from elsewhere`)
    }
}
if (fails.length) { for (const x of fails) console.log('FAIL ' + x); process.exit(1) }
console.log('OK weather-check: app/weather/ fetches only the data room\'s files, links out only to IPMA, ANEPC and PrompTugal News, tokens only')
