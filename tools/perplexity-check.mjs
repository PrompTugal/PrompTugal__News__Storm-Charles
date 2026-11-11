#!/usr/bin/env node
// Perplexity as a research tool, step 2: open the addresses an engine cited, one at a time, so a person or agent can read
// whether the page says what the engine said it says (incident.perplexity@web-summit.dinis, 11 November 2026, WS-214).
//
//   node tools/perplexity-check.mjs research/perplexity/runs/<date>/<n>.json [--all] [--url <one address>]
//
// By default only the addresses the answers point at ([n] in the text, kept as `used`) or name in a statement are opened;
// --all opens every address returned. Never requested: hosts in evidence/sources.json's `forbidden` (their terms) and
// `never` (social networks) lists. One request at a time, 2 s apart, an honest user agent, 25 s limit, 4 MB at most.
// The page's text goes only to the work folder outside git (PERPLEXITY_WORK_DIR/pages/<sha256>.txt): press text is not
// ours to keep here. Git gets, per address: host, class, HTTP status, the time read, bytes, sha256 and the page's title.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const WORK = path.join(process.env.PERPLEXITY_WORK_DIR || path.join(os.homedir(), '.incident-perplexity'), 'pages')
const S = JSON.parse(fs.readFileSync(path.join(ROOT, 'evidence/sources.json'), 'utf8'))
const H = JSON.parse(fs.readFileSync(path.join(ROOT, 'research/perplexity/hosts.json'), 'utf8')).hosts
const under = (host, list) => list.some(h => host === h || host.endsWith('.' + h))
const PRIMARY_KINDS = ['official body', 'organiser', 'public service', 'official network', 'company']

export function classify(host) {   // -> { class: primary|press|aggregator|encyclopaedia|other|forbidden|social, source }
    host = host.replace(/^www\./, '')
    if (under(host, S.forbidden.hosts)) return { class: 'forbidden', why: 'its terms restrict automated access: never requested (evidence/sources.json)' }
    if (under(host, S.never.hosts)) return { class: 'social', why: 'a social network: never requested' }
    for (const [h, v] of Object.entries(H)) if (under(host, [h])) return { class: v.class, ...(v.name ? { name: v.name } : {}) }
    for (const s of S.sources) if (under(host, s.hosts)) return { class: PRIMARY_KINDS.includes(s.kind) ? 'primary' : s.kind === 'press' ? 'press' : s.kind === 'encyclopaedia' ? 'encyclopaedia' : 'other', source: s.id }
    return { class: 'other' }
}
const text = html => html.replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/[ \t\r]+/g, ' ').replace(/\n\s*\n+/g, '\n').trim()

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const a = process.argv.slice(2), file = a.find(x => !x.startsWith('--') && x.endsWith('.json')), all = a.includes('--all'), one = a.includes('--url') ? a[a.indexOf('--url') + 1] : null
    if (!file) { console.error('usage: perplexity-check.mjs <run.json> [--all] [--url U]'); process.exit(2) }
    const run = JSON.parse(fs.readFileSync(file, 'utf8')); run.addresses = run.addresses || {}
    const want = new Set(one ? [one] : [])
    if (!one) for (const q of run.asks) { for (const c of q.cited) if (c.url && (all || c.used)) want.add(c.url); for (const s of q.statements || []) for (const u of s.also || []) want.add(u) }
    for (const q of run.asks) for (const c of q.cited) if (c.url && !run.addresses[c.url]) run.addresses[c.url] = { host: c.host, ...classify(c.host), opened: false }
    fs.mkdirSync(WORK, { recursive: true, mode: 0o700 })
    for (const u of want) {
        const host = new URL(u).hostname.replace(/^www\./, ''), rec = run.addresses[u] = run.addresses[u] || { host, ...classify(host), opened: false }
        if (rec.opened || rec.class === 'forbidden' || rec.class === 'social') continue
        const tmp = path.join(WORK, 'tmp.body'); let code = '000', err = null
        try { code = execFileSync('curl', ['-sS', '-L', '--max-redirs', '5', '-m', '25', '--max-filesize', '4000000', '--compressed', '-A', 'storm-charles.promptugal.news research (one page, read once)', '-H', 'Accept-Language: pt-PT,pt;q=0.9,en;q=0.8', '-o', tmp, '-w', '%{http_code}', u], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim() } catch (e) { err = String(e.stderr || e.message).trim().split('\n')[0].slice(0, 120) }
        rec.opened = true; rec.read_utc = new Date().toISOString().slice(0, 19) + 'Z'; rec.http = +code
        if (err) rec.error = err
        if (!err && fs.existsSync(tmp)) {
            const body = fs.readFileSync(tmp), html = body.toString('utf8'), sha = crypto.createHash('sha256').update(body).digest('hex')
            rec.bytes = body.length; rec.sha256 = sha; rec.title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ').trim().slice(0, 140) || null
            const t = text(html); rec.text_chars = t.length
            fs.writeFileSync(path.join(WORK, sha.slice(0, 16) + '.txt'), `# ${u}\n# read ${rec.read_utc} http ${code}\n\n${t}\n`, { mode: 0o600 }); fs.rmSync(tmp)
        }
        console.log(`${rec.http} ${rec.class.padEnd(10)} ${String(rec.text_chars ?? '-').padStart(7)} ${(rec.sha256 || '').slice(0, 16)} ${u}${err ? '  ! ' + err : ''}`)
        run.updated = rec.read_utc; fs.writeFileSync(file, JSON.stringify(run, null, 1) + '\n')
        await new Promise(r => setTimeout(r, 2000))
    }
    fs.writeFileSync(file, JSON.stringify(run, null, 1) + '\n')
}
