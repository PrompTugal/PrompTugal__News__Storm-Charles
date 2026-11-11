#!/usr/bin/env node
// Mastodon, read as data (incident.social@web-summit.dinis). Node 18+, no account, public endpoints, 3 s between requests.
//   node tools/social-mastodon.mjs   -> research/social/mastodon.json
// Same rule as tools/social-read.mjs: organisations' accounts are named; the public conversation under a tag is COUNTED
// in memory (per hour, per language, how many distinct accounts) and dropped. Nothing of a private person is written.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), OUT = path.join(ROOT, 'research/social/mastodon.json')
const UA = 'storm-charles-social-reader/0.1 (public reads only)', SINCE = '2026-11-08T00:00:00Z'
const sleep = ms => new Promise(r => setTimeout(r, ms)), now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const get = async url => { await sleep(3000); try { const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(25000) }); return { status: r.status, body: r.status === 200 ? await r.json() : null, next: (r.headers.get('link') || '').match(/<([^>]+)>;\s*rel="next"/)?.[1] } } catch (e) { return { status: 'error: ' + e.message, body: null } } }
const strip = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
// organisations' accounts found by name on mastodon.social and masto.pt (11 November, 03:30 UTC). None is the account of a body that decides or warns here.
const ORGS = [
    { server: 'mastodon.social', acct: 'eumetsat', who: 'EUMETSAT (as the account names itself)', kind: 'intergovernmental body', why: 'names itself EUMETSAT; no verified link to eumetsat.int on the profile: unverified' },
    { server: 'fediscience.org', acct: 'ECMWF', who: 'ECMWF (as the account names itself)', kind: 'intergovernmental body', why: 'on a science server; no verified link read' },
    { server: 'masto.pt', acct: 'Publico', who: 'Público (as the account names itself)', kind: 'press', why: 'on masto.pt; no verified link read' },
    { server: 'masto.pt', acct: 'Lusa', who: 'Lusa (as the account names itself)', kind: 'press (wire)', why: 'on masto.pt; no verified link read' }
]
const accounts = []
for (const o of ORGS) {
    const r = await get(`https://${o.server}/api/v1/accounts/lookup?acct=${o.acct}`), a = r.body
    accounts.push({ platform: 'mastodon', ...o, url: `https://${o.server}/@${o.acct}`, status: r.status, read_utc: now(), label: 'evidence', ...(a ? { posts_total: a.statuses_count, last_post_day: a.last_status_at, verified_links: (a.fields || []).filter(f => f.verified_at).map(f => strip(f.value)), automated: !!a.bot, posted_since_8_nov: !!a.last_status_at && a.last_status_at >= SINCE.slice(0, 10) } : {}) })
    console.error(`${o.acct}@${o.server}: ${r.status}, last ${a?.last_status_at}`)
}
const STORM = /charles|tempestade|depress[aã]o|storm|mau tempo|temporal|aviso vermelho|red warning|web ?summit/i
const tags = []
for (const [server, list] of [['mastodon.social', ['stormcharles', 'tempestadecharles', 'depressaocharles', 'borrascacharles', 'websummit']], ['masto.pt', ['depressaocharles', 'tempestadecharles', 'mautempo', 'websummit']]]) for (const tag of list) {
    const generic = ['websummit', 'mautempo'].includes(tag), hours = {}, langs = {}, who = new Set()
    let url = `https://${server}/api/v1/timelines/tag/${tag}?limit=40`, status, n = 0, automated = 0, pages = 0, done = false
    while (url && pages < 5 && !done) {
        const r = await get(url); status = r.status; pages++
        if (!r.body) break
        for (const p of r.body) {
            if (p.created_at < SINCE) { done = true; continue }
            if (generic && !(STORM.test(strip(p.content)) && (tag !== 'websummit' || /charles|storm|tempest|mau tempo|cancel|weather/i.test(strip(p.content))))) continue
            n++; const h = p.created_at.slice(0, 13) + ':00Z'; hours[h] = (hours[h] || 0) + 1
            const l = p.language || 'und'; langs[l] = (langs[l] || 0) + 1
            who.add(p.account.id); if (p.account.bot) automated++
        }
        url = r.next
    }
    tags.push({ server, tag: '#' + tag, url: `https://${server}/tags/${tag}`, status, read_utc: now(), posts: n, distinct_accounts: who.size, automated, languages: langs, per_hour: Object.fromEntries(Object.entries(hours).sort()), ...(generic ? { note: 'a general tag: only posts whose text is about the storm are counted' } : {}) })
    who.clear(); console.error(`#${tag}@${server}: ${status}, ${n}`)
}
fs.writeFileSync(OUT, JSON.stringify({
    about: 'Mastodon and Storm Charles. `accounts`: the organisations\' accounts we found by name, each with what shows (or does not show) that it is the organisation\'s, and when it last posted. `tags`: the public conversation under each tag as COUNTS only (per UTC hour, per declared language, how many distinct accounts): no post, text, handle or address of a private person is kept. Each server sees only the posts that reached it: a tag\'s count on one server is not the whole network.',
    by: 'incident.social@web-summit.dinis', updated: now(), since: SINCE, label: 'evidence',
    api: ['https://<server>/api/v1/accounts/lookup?acct=<name>', 'https://<server>/api/v1/timelines/tag/<tag>?limit=40 (and the next page its Link header gives)'],
    not_found: { about: 'Looked for by name on mastodon.social and masto.pt (api/v2/search, accounts): no account for these. Absent from a search is not proof of absence.', read_utc: now(), who: ['IPMA', 'ANEPC (civil protection)', 'Web Summit', 'the Câmara de Lisboa', 'VOST Portugal', 'AEMET', 'Met Office', 'Météo-France', 'Copernicus', 'MeteoAlarm', 'Euronews'] },
    left_out: [{ what: 'an automated account relaying EUMETSAT, on a science server', why_left_out: 'says itself that it is unofficial' }],
    accounts, tags
}, null, 1) + '\n')
