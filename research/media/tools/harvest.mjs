#!/usr/bin/env node
// Media watch harvester (incident.media@web-summit.dinis). No dependencies, Node 18+.
//
//   MEDIA_RAW=<dir outside git> node research/media/tools/harvest.mjs
//
// 1. reads the public RSS feeds in research/media/feeds.json and keeps items whose title or link is about the storm;
// 2. adds every press URL already cited in the incident's timeline.md and data/decisions/sources.json, and seeds.txt;
// 3. fetches each page once (one request a second per run, a plain bot User-Agent), keeps the raw HTML in MEDIA_RAW
//    (never in git) and reads only the page's own metadata: JSON-LD (headline, datePublished, dateModified, author),
//    then Open Graph / meta tags as a fallback;
// 4. writes the `articles` list of research/media/coverage.json (other keys of that file are left as they are).
//
// By-lines are copied as the page's metadata prints them. Nothing else about a person is read or kept.
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '../../..')
const OUT = path.join(ROOT, 'research/media/coverage.json')
const RAW = process.env.MEDIA_RAW
if (!RAW) { console.error('set MEDIA_RAW to a directory outside git'); process.exit(1) }
fs.mkdirSync(RAW, { recursive: true })
const UA = 'media-watch-bot/0.1 (public pages only)'
const INCIDENT = 'incidents/2026-11-10-storm-charles'
const ABOUT = /\bcharles\b|tempestade|depress[aã]o|mau[ -]tempo|storm|aviso[s]? vermelho|temporal|prote[cç][aã]o civil|\bipma\b|red warning|intemp[eé]rie|tormenta|temp[êe]te|sturm/i
const EXCLUDE = /gaza|euromilh|ana paula|conselho da paz|ucr[aâ]nia|ukraine|trump|filipinas|philippines|tuf[aã]o|typhoon|hurricane|furac[aã]o/i
const FOREIGN = /bloomberg|guardian|apnews|techcrunch|euronews/
const feedsCfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'research/media/feeds.json'), 'utf8'))
const OUTLETS = JSON.parse(fs.readFileSync(path.join(ROOT, 'research/media/outlets.json'), 'utf8')).outlets
const outletOf = host => { host = host.replace(/^www\./, ''); return (OUTLETS.find(o => o.hosts.some(h => host === h || host.endsWith('.' + h))) || {}).id || host }

const sleep = ms => new Promise(r => setTimeout(r, ms))
async function get(url) {
    const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8' }, redirect: 'follow', signal: AbortSignal.timeout(30000) })
    return { status: res.status, url: res.url, text: await res.text() }
}
const unesc = s => (s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"').replace(/&apos;|&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/<span class=.tag--premium.>[^<]*<\/span>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
// A time as the page gives it -> UTC ISO. A time without an offset is taken as Lisbon's (UTC in November) and flagged.
function utc(s) {
    if (!s) return null
    s = String(s).trim()
    const hasTz = /(Z|[+-]\d\d:?\d\d|GMT|UTC)$/i.test(s) || /\d{2} [A-Z][a-z]{2} \d{4}/.test(s)
    const d = new Date(hasTz ? s : s.replace(' ', 'T') + 'Z')
    return isNaN(d) ? null : { at: d.toISOString().replace('.000Z', 'Z'), assumed_utc: !hasTz }
}

// ---- 1. candidates
const cand = new Map()   // url -> { found_via, feed_title, feed_time }
const FORBID = OUTLETS.filter(o => o.automated_reading).flatMap(o => o.hosts)   // terms forbid automated reading: no requests, ever
const forbidden = u => { try { const h = new URL(u).hostname.replace(/^www\./, ''); return FORBID.some(f => h === f || h.endsWith('.' + f)) } catch { return true } }
const add = (url, meta) => { url = unesc(url).split('#')[0].replace(/[?&]utm_[^#]*$/, ''); if (/^https?:\/\//.test(url) && !cand.has(url) && !forbidden(url)) cand.set(url, meta) }
for (const f of feedsCfg.feeds) {
    try {
        const r = await get(f.url)
        fs.writeFileSync(path.join(RAW, `feed-${f.id}.xml`), r.text)
        if (r.status !== 200) { console.error(`feed ${f.id}: ${r.status}`); f.last_status = r.status; continue }
        f.last_status = 200
        let n = 0
        for (const it of r.text.match(/<(item|entry|url)[\s>][\s\S]*?<\/\1>/g) || []) {
            const title = unesc((it.match(/<(?:news:)?title[^>]*>([\s\S]*?)<\/(?:news:)?title>/) || [])[1])
            const link = unesc((it.match(/<loc>\s*([^<]+?)\s*<\/loc>/) || it.match(/<link[^>]*>([^<]+)<\/link>/) || it.match(/<link[^>]*href="([^"]+)"/) || [])[1])
            const when = unesc((it.match(/<(pubDate|published|updated|dc:date|news:publication_date)[^>]*>([\s\S]*?)<\/\1>/) || [])[2])
            if (link && n < 60 && !EXCLUDE.test(title) && ABOUT.test(title + ' ' + decodeURIComponent(link).replace(/-/g, ' '))) { add(link, { found_via: `feed:${f.id}`, feed_title: title, feed_time: when }); n++ }
        }
        console.error(`feed ${f.id}: ${n} items about the storm`)
    } catch (e) { console.error(`feed ${f.id}: ${e.message}`); f.last_status = 'error' }
    await sleep(500)
}
const NOT_PRESS = /meteoalarm|amn\.pt|websummit\.com|ipma\.pt|prociv|portugal\.gov|mastodon|vivaldi\.net|bsky|github|promptugal|sgit\.ai|sgraph|wikipedia|metropolitano|carris|cp\.pt|fertagus|transtejo|ana\.pt|lisboa\.pt|infraestruturas|aviationweather|open-meteo|api\.|\.json$|youtube|x\.com|twitter|linkedin|instagram|facebook|reddit|threads/i
for (const rel of [`${INCIDENT}/timeline.md`, `${INCIDENT}/decisions.md`, `${INCIDENT}/data/decisions/sources.json`, 'research/media/seeds.txt']) {
    const p = path.join(ROOT, rel); if (!fs.existsSync(p)) continue
    for (const u of fs.readFileSync(p, 'utf8').match(/https?:\/\/[^\s)"'<>\]\\]+/g) || []) {
        const clean = u.replace(/[.,;]+$/, '')
        try { const h = new URL(clean); if (!NOT_PRESS.test(clean) && h.pathname.length > 12) add(clean, { found_via: rel }) } catch { }
    }
}
console.error(`${cand.size} candidate pages`)

// ---- 2. read each page's own metadata
function ldObjects(html) {
    const out = []
    for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
        try { const walk = o => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') { out.push(o); if (o['@graph']) walk(o['@graph']) } }; walk(JSON.parse(m[1].trim())) } catch { }
    }
    return out
}
const meta = (html, name) => { const m = html.match(new RegExp(`<meta[^>]+(?:property|name|itemprop)=["']${name}["'][^>]*content=["']([^"']*)["']`, 'i')) || html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name|itemprop)=["']${name}["']`, 'i')); return m ? unesc(m[1]) : '' }
const TYPES = /Article|NewsArticle|LiveBlogPosting|ReportageNewsArticle|BlogPosting|VideoObject|WebPage/
function names(a) {
    if (!a) return []
    const list = (Array.isArray(a) ? a : [a]).map(x => typeof x === 'string' ? x : (x && x.name) || '').flatMap(x => Array.isArray(x) ? x : [x])
    return [...new Set(list.map(unesc).filter(x => x && !/^https?:/.test(x) && x.length < 80))]
}
const prev = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
const prevBy = new Map((prev.articles || []).map(a => [a.url, a]))
const articles = []
let last = {}
const IDX = path.join(RAW, 'index.json'); const idx = fs.existsSync(IDX) ? JSON.parse(fs.readFileSync(IDX, 'utf8')) : {}
const FRESH = (+process.env.MEDIA_MAX_AGE_MIN || 45) * 60000
for (const [url, c] of cand) {
    const host = new URL(url).hostname
    let r, read
    const c0 = idx[url]
    if (c0 && Date.now() - Date.parse(c0.read) < FRESH && fs.existsSync(path.join(RAW, c0.sha.slice(0, 16) + '.html'))) { r = { status: c0.status, url: c0.final, text: fs.readFileSync(path.join(RAW, c0.sha.slice(0, 16) + '.html'), 'utf8') }; read = c0.read }
    else {
        const wait = 1000 - (Date.now() - (last[host] || 0)); if (wait > 0) await sleep(wait)
        try { r = await get(url) } catch (e) { console.error(`${url}: ${e.message}`); continue } finally { last[host] = Date.now() }
        read = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
    }
    const sha = crypto.createHash('sha256').update(r.text).digest('hex')
    fs.writeFileSync(path.join(RAW, sha.slice(0, 16) + '.html'), r.text)
    idx[url] = { sha, read, status: r.status, final: r.url }
    if (r.status !== 200) {
        console.error(`${r.status} ${url}`)
        const ft = utc(c.feed_time)
        if (c.feed_title && ft) articles.push({ outlet: outletOf(host), url, kind: 'article', lang: null, title: c.feed_title, published: ft.at, published_from: "the outlet's feed or news sitemap (the page answered " + r.status + ' to a bot, so its by-line was not read)', byline: [], label: 'evidence', read, found_via: c.found_via })
        else if (prevBy.has(url)) articles.push({ ...prevBy.get(url), last_status: r.status })
        continue
    }
    const html = r.text
    const lds = ldObjects(html).filter(o => TYPES.test([].concat(o['@type'] || []).join(' ')))
    const ld = lds.find(o => /LiveBlogPosting/.test([].concat(o['@type']).join(' '))) || lds.find(o => o.datePublished && o.headline) || lds.find(o => o.datePublished) || {}
    const type = [].concat(ld['@type'] || []).join(' ')
    const title = unesc(ld.headline || '') || meta(html, 'og:title') || unesc((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]) || c.feed_title || ''
    const desc = unesc(typeof ld.description === 'string' ? ld.description : '') || meta(html, 'og:description') || meta(html, 'description')
    if (EXCLUDE.test(title)) continue
    const loose = c.found_via.startsWith('feed:') || c.found_via.endsWith('seeds.txt')
    if (loose && !ABOUT.test(title + ' ' + desc)) continue
    if (loose && FOREIGN.test(host) && !/\bcharles\b|portug|lisbo[an]|web summit|madeira/i.test(title + ' ' + desc)) continue
    const pub = utc(ld.datePublished) || utc(meta(html, 'article:published_time')) || utc(meta(html, 'datePublished')) || utc(meta(html, 'date'))
    const mod = utc(ld.dateModified) || utc(meta(html, 'article:modified_time')) || utc(meta(html, 'og:updated_time'))
    const feedT = utc(c.feed_time)
    let by = names(ld.author); let bySrc = by.length ? 'json-ld author' : ''
    if (!by.length) { const m = meta(html, 'author') || meta(html, 'article:author'); if (m && !/^https?:/.test(m)) { by = m.split(/\s*;\s*|\s*,\s+(?=[A-ZÁÉÍÓÚ])/).filter(Boolean); bySrc = 'meta author' } }
    const live = /LiveBlogPosting/.test(type) || /ao[- ]minuto|em direto|ao vivo|\blive\b|siga aqui/i.test(title + ' ' + url)
    const liveUpdates = [].concat(ld.liveBlogUpdate || []).length || undefined
    const u = new URL(r.url)
    const a = {
        outlet: outletOf(u.hostname), url: r.url.split('#')[0], kind: live ? 'live' : /VideoObject/.test(type) || /\/video[s]?\//.test(url) ? 'video' : /opini[aã]o|opinion|editorial/i.test(url) ? 'opinion' : 'article',
        lang: ((html.match(/<html[^>]*\slang=["']([a-zA-Z-]+)/) || [])[1] || '').toLowerCase().slice(0, 2) || null,
        title: title.replace(/\s+[|–-]\s+[^|–-]{2,30}$/, m => /Observador|ECO|Expresso|RTP|SIC|CNN|Público|PÚBLICO|Euronews|Negócios|TEK|Notícias|News|Resident|SÁBADO|Sapo|SAPO/i.test(m) ? '' : m),
        published: pub ? pub.at : feedT ? feedT.at : null,
        published_precision: pub && /T00:00:00/.test(pub.at) ? 'day (the page gives no time of day)' : undefined,
        published_from: pub ? (ld.datePublished ? 'page json-ld' : 'page meta') + (pub.assumed_utc ? ' (no offset given: taken as Lisbon time = UTC)' : '') : feedT ? "the outlet's feed or news sitemap" : null,
        modified: mod && (!pub || mod.at !== pub.at) ? mod.at : undefined,
        byline: by, byline_from: bySrc || undefined, live_updates: liveUpdates,
        label: 'evidence', read, found_via: c.found_via, capture_sha256: sha
    }
    articles.push(a)
    console.error(`${a.published || '????'} ${a.outlet} ${a.kind} [${by.join('; ')}] ${a.title.slice(0, 70)}`)
}
// keep what an earlier run read and this one did not see (a feed scrolls)
fs.writeFileSync(IDX, JSON.stringify(idx))
const seen = new Set(articles.map(a => a.url))
for (const a of prev.articles || []) if (!seen.has(a.url) && !forbidden(a.url) && !EXCLUDE.test(a.title) && !NOT_PRESS.test(a.url)) articles.push(a)
{ const key = a => a.outlet + '|' + a.title, dated = new Set(articles.filter(a => a.published).map(key)); for (let i = articles.length - 1; i >= 0; i--) if (!articles[i].published && dated.has(key(articles[i]))) articles.splice(i, 1) }
articles.sort((a, b) => (a.published || '9').localeCompare(b.published || '9'))
articles.forEach(a => { a.id = 'A-' + crypto.createHash('sha256').update(a.url).digest('hex').slice(0, 8) })
const out = { ...prev, articles_updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), articles }
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n')
feedsCfg.by = 'incident.media@web-summit.dinis'; feedsCfg.updated = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
fs.writeFileSync(path.join(ROOT, 'research/media/feeds.json'), JSON.stringify(feedsCfg, null, 1) + '\n')
console.error(`wrote ${articles.length} articles`)
