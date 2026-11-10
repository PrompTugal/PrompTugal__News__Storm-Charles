#!/usr/bin/env node
// Official and social channels on the storm, read without a login (incident.media@web-summit.dinis). Node 18+.
//   node research/media/tools/social.mjs      -> the `official` and `social` keys of research/media/coverage.json
// Rule: an organisation's account is listed by name with its posts about the storm; posts by individuals are only
// COUNTED per tag or query (how many posts, how many accounts, first and last time). No individual is named here.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const OUT = path.join(ROOT, 'research/media/coverage.json')
const UA = 'media-watch-bot/0.1 (public pages only)'
const STORM = /charles|tempestade|depress[aã]o|storm|mau tempo|temporal|aviso vermelho|alerta|red warning|web ?summit.*(cancel|day 2|wednesday|quarta)|cancel/i
const SINCE = '2026-11-08T00:00:00Z'
const sleep = ms => new Promise(r => setTimeout(r, ms))
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
async function get(url, json = true) {
    await sleep(1000)
    try { const r = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(25000) }); return { status: r.status, body: r.status === 200 ? (json ? await r.json() : await r.text()) : null } }
    catch (e) { return { status: 'error: ' + e.message, body: null } }
}
const strip = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()
const short = (t, n = 140) => t.length > n ? t.slice(0, n - 1).trim() + '…' : t      // a short excerpt, with the link beside it

// ---- organisations' accounts (checked to exist; each is the body's own or says what it is)
const BSKY_ORGS = [
    { handle: 'websummit.bsky.social', who: 'Web Summit (the organisers)', kind: 'organiser' },
    { handle: 'vost.pt', who: 'VOST Portugal (volunteers\' association for emergencies; not an authority)', kind: 'volunteer organisation' },
    { handle: 'camaralisboa.bsky.social', who: 'Câmara Municipal de Lisboa (as the account names itself; not verified by us)', kind: 'municipality (unverified)' },
    { handle: 'metrolisboa.pt', who: 'Metropolitano de Lisboa (handle on the operator\'s own domain)', kind: 'operator' },
    { handle: 'perturbacoes.pt', who: 'Perturbações do Metro de Lisboa (unofficial, automated, says so itself)', kind: 'unofficial service account' },
    { handle: 'aemet.es', who: 'AEMET, Spain\'s meteorological agency (verified on Bluesky)', kind: 'authority (Spain)' },
    { handle: 'euronews.com', who: 'Euronews', kind: 'press' }, { handle: 'publico.pt', who: 'Público', kind: 'press' }
]
const YT = [
    { id: 'UC6MiQVyK_WaFlU5IvIT2b8A', who: 'Web Summit (the channel id in data/decisions/sources.json; its feed\'s newest upload is from 2024, so the organisers do not announce here)', kind: 'organiser' }, { id: 'UCIM-wfyv9hg2oEiA81mQc2A', who: 'RTP Notícias', kind: 'press' },
    { id: 'UCSrZ3UV4jOidv8ppoVuvW9Q', who: 'Euronews', kind: 'press' }
]
const accounts = []
for (const o of BSKY_ORGS) {
    const r = await get(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${o.handle}&limit=50&filter=posts_no_replies`)
    const a = { platform: 'bluesky', account: o.handle, url: `https://bsky.app/profile/${o.handle}`, who: o.who, kind: o.kind, status: r.status, read: now(), label: 'evidence' }
    if (r.body) {
        const own = r.body.feed.filter(f => !f.reason && f.post.author.handle === o.handle).map(f => f.post)
        a.last_post = own[0] ? own[0].record.createdAt : null
        a.posts_read = own.length
        a.posts_on_the_storm = own.filter(p => p.record.createdAt >= SINCE && STORM.test(p.record.text)).map(p => ({ at: p.record.createdAt.replace(/\.\d+Z$/, 'Z'), url: `https://bsky.app/profile/${o.handle}/post/${p.uri.split('/').pop()}`, excerpt: short(p.record.text) }))
    }
    accounts.push(a); console.error(`bsky ${o.handle}: ${r.status}, ${a.posts_on_the_storm ? a.posts_on_the_storm.length : '-'} on the storm`)
}
for (const c of YT) {
    const r = await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${c.id}`, false)
    const a = { platform: 'youtube', account: c.id, url: `https://www.youtube.com/channel/${c.id}`, who: c.who, kind: c.kind, status: r.status, read: now(), label: 'evidence' }
    if (r.body) {
        const vids = [...r.body.matchAll(/<entry>[\s\S]*?<yt:videoId>([^<]+)[\s\S]*?<title>([^<]*)<\/title>[\s\S]*?<published>([^<]+)/g)].map(m => ({ at: new Date(m[3]).toISOString().replace('.000Z', 'Z'), url: `https://www.youtube.com/watch?v=${m[1]}`, title: strip(m[2]) }))
        a.last_post = vids[0] ? vids[0].at : null; a.posts_read = vids.length
        a.posts_on_the_storm = vids.filter(v => v.at >= SINCE && STORM.test(v.title))
    }
    accounts.push(a); console.error(`yt ${c.who}: ${r.status}, ${a.posts_on_the_storm ? a.posts_on_the_storm.length : '-'}`)
}

// ---- public conversation: counted, not named
const stats = (posts) => { const t = posts.map(p => p.at).sort(); return { posts: posts.length, accounts: new Set(posts.map(p => p.who)).size, automated_or_bridged: posts.filter(p => p.bot).length, first: t[0] || null, last: t[t.length - 1] || null, languages: [...new Set(posts.map(p => p.lang).filter(Boolean))].sort() } }
const conversation = []
for (const [server, tags] of [['mastodon.social', ['stormcharles', 'tempestadecharles', 'depressaocharles', 'charles', 'websummit']], ['masto.pt', ['depressaocharles', 'tempestadecharles', 'mautempo', 'websummit']]]) for (const tag of tags) {
    const url = `https://${server}/api/v1/timelines/tag/${tag}?limit=40`
    const r = await get(url)
    const e = { platform: 'mastodon', server, tag: '#' + tag, url: `https://${server}/tags/${tag}`, api: url, status: r.status, read: now(), label: 'evidence' }
    if (r.body) {
        const generic = ['charles', 'websummit', 'mautempo'].includes(tag)
        const posts = r.body.filter(p => p.created_at >= SINCE && (!generic || STORM.test(strip(p.content)) && (tag !== 'charles' || /storm|tempestade|temp[êe]te|depress|portugal|lisb|mad[eè]i?r/i.test(strip(p.content))))).map(p => ({ at: p.created_at, who: p.account.acct, bot: p.account.bot || /brid\.gy/.test(p.account.acct), lang: p.language }))
        Object.assign(e, stats(posts)); if (generic) e.note = 'a general tag: only posts whose text is about the storm are counted'
    }
    conversation.push(e); console.error(`mastodon ${server} #${tag}: ${r.status} ${e.posts ?? ''}`)
}
for (const q of ['"Storm Charles"', '"tempestade Charles"', '"depressão Charles"', '"Web Summit" Charles', '"borrasca Charles"']) {
    const url = `https://api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=${encodeURIComponent(q)}&limit=100&sort=latest&since=${SINCE}`
    const r = await get(url)
    const e = { platform: 'bluesky', query: q, url: `https://bsky.app/search?q=${encodeURIComponent(q)}`, api: url, status: r.status, read: now(), label: 'evidence' }
    if (r.body) { Object.assign(e, stats(r.body.posts.map(p => ({ at: p.record.createdAt, who: p.author.did, lang: (p.record.langs || [])[0] })))); delete e.automated_or_bridged; if (r.body.posts.length === 100) e.note = 'capped at the newest 100 by the API page: the first time is not the first post' }
    conversation.push(e); console.error(`bsky ${q}: ${r.status} ${e.posts ?? ''}`)
}
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
prev.social = {
    about: 'What can be read without a login. `accounts`: organisations only (organiser, operators, press, a volunteers\' association), each with its posts about the storm since 8 November (time, link, a short excerpt). `conversation`: public tags and searches, COUNTED only: no individual\'s account or post is listed. X, Instagram, Facebook, LinkedIn, Threads and TikTok cannot be read without a login and are not here (see data/decisions/sources.json, platforms_without_login).',
    updated: now(), accounts, conversation
}
fs.writeFileSync(OUT, JSON.stringify(prev, null, 1) + '\n')
