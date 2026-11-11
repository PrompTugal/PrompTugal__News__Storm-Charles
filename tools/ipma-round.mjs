#!/usr/bin/env node
// One round on IPMA's open data: read, keep, derive, write the pages.
//   node tools/ipma-round.mjs [--store DIR] [--crawl] [--no-read]
// 1. tools/ipma-read.mjs (politely; hashes and changes into sources/ipma/);
// 2. the store is an sgit vault: commit and push it (the token comes from the environment, never from a file here);
// 3. sources/ipma/dataset.json: the pointer git keeps (vault id, read key, the shape, every file's sha256 of the latest hour);
// 4. tools/ipma-views.mjs and tools/ipma-pages.mjs.
// Then commit and release as CLAUDE.md says. A vault key is never written by this tool: only the read key.
// Kept by incident.ipma@web-summit.dinis.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), SRC = path.join(ROOT, 'sources/ipma')
const arg = n => { const i = process.argv.indexOf('--' + n); return i < 0 ? null : process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true }
const STORE = path.resolve(arg('store') || process.env.IPMA_STORE || path.join(os.homedir(), 'ipma-store'))
const node = (tool, ...a) => execFileSync(process.execPath, [path.join(ROOT, 'tools', tool), '--store', STORE, ...a], { cwd: ROOT, stdio: 'inherit' })
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')

if (!arg('no-read')) node('ipma-read.mjs', ...(arg('crawl') ? ['--crawl'] : []))

const ds = { about: "Where IPMA's full responses are kept: a data vault (SG/Send, made with sgit), never git. latest/ is overwritten by each read; a dated folder per hour (UTC) keeps every file that changed in that hour, a <file>.diff.json beside it saying what changed, and a manifest.json with the sha256 of every file as read in that hour. Anyone with the read key can read the vault; nobody can write to it with that key.", by: 'incident.ipma@web-summit.dinis', updated: now(), source: 'https://api.ipma.pt/open-data/', shape: { latest: 'ipma/latest/<path under open-data/>', dated: 'ipma/<yyyy>/<mm>/<dd>/<hh>/<path>', diff: 'ipma/<yyyy>/<mm>/<dd>/<hh>/<path>.diff.json', manifest: 'ipma/<yyyy>/<mm>/<dd>/<hh>/manifest.json and ipma/latest/manifest.json' } }
const sg = (...a) => execFileSync('sgit', a, { cwd: STORE, encoding: 'utf8', timeout: 600000, stdio: ['ignore', 'pipe', 'pipe'] })
if (fs.existsSync(path.join(STORE, '.sg_vault'))) {
    try {
        const info = sg('vault', 'info')
        const id = (info.match(/Vault ID:\s+(\S+)/) || [])[1], read = (info.match(/Read key:\s+(sgit_[a-z_]*read_[0-9a-f]+)/) || [])[1], server = (info.match(/^\s*URL:\s+(https:\/\/[a-z0-9.-]+)\/?\s*$/m) || [])[1]   // the remote's line only: the 'Web URL' line carries the vault key
        const pub = read && read.replace(/^sgit_[a-z]+_read_/, 'sgit_public_read_')   // the same read key under sgit's prefix for a key meant to be published (as data/vaults.json does); a data vault's read key is public by RESTRUCTURE.md
        ds.vault = { kind: 'data vault (normal, not packed)', id, server, read_key: pub, clone: `sgit clone ${pub}:${id}`, note: 'a read key is derived one-way and cannot write' }
        const st = sg('status')
        if (!/Nothing to commit/.test(st)) sg('commit', '-m', `IPMA open data: read ${now()}`)
        if (process.env.SG_SEND_ACCESS_TOKEN) { sg('--token', process.env.SG_SEND_ACCESS_TOKEN, 'push'); ds.vault.pushed_utc = now() } else ds.vault.note = 'not pushed in this round: no access token in the environment'
        ds.vault.head = (sg('vault', 'info').match(/HEAD:\s+(\S+)/) || [])[1]
        console.log(`vault ${id}: ${ds.vault.pushed_utc ? 'pushed' : 'committed locally'}`)
    } catch (e) { ds.vault = { ...(ds.vault || {}), error: 'the vault step failed in this round: ' + String(e.message).split('\n')[0].replace(/--token \S+/, '--token <withheld>').slice(0, 160) }; console.log('WARN vault: ' + ds.vault.error) }
} else ds.vault = { note: 'no vault: the responses of this round are in a folder of the reading session only; their hashes are below' }
const man = JSON.parse(fs.readFileSync(path.join(STORE, 'ipma/latest/manifest.json'), 'utf8'))
const hours = []; const walk = (d, depth) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isDirectory() && /^\d+$/.test(e.name)) depth === 3 ? hours.push(path.relative(path.join(STORE, 'ipma'), path.join(d, e.name))) : walk(path.join(d, e.name), depth + 1) }
walk(path.join(STORE, 'ipma'), 0)
ds.hours = hours.sort(); ds.latest = { read_utc: man.read_utc, files: Object.fromEntries(Object.entries(man.files).map(([k, v]) => [k, { sha256: v.sha256, bytes: v.bytes }])) }
// the guard: the vault key (its passphrase) must never reach a tracked file
let secret = null; try { secret = (sg('vault', 'info').match(/Passphrase:\s+(\S+)/) || [])[1] } catch { }
const text = JSON.stringify(ds, null, 1) + '\n'
if (secret && text.includes(secret)) { console.error('ipma-round: the vault key was about to be written to dataset.json: stopped'); process.exit(1) }
fs.writeFileSync(path.join(SRC, 'dataset.json'), text)
if (secret) for (const f of execFileSync('git', ['ls-files', '-o', '-m', '-c', '--exclude-standard', 'sources/ipma', 'agents/ipma', 'app/sources/ipma', 'tools'], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean)) { try { if (fs.readFileSync(path.join(ROOT, f), 'utf8').includes(secret)) { console.error(`ipma-round: the vault key is in ${f}: remove it before any commit`); process.exit(1) } } catch { } }
node('ipma-views.mjs'); execFileSync(process.execPath, [path.join(ROOT, 'tools/ipma-pages.mjs')], { cwd: ROOT, stdio: 'inherit' })
