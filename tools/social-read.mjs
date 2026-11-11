#!/usr/bin/env node
// Bluesky, read as data (incident.social@web-summit.dinis). Node 18+, no dependencies, no account, no login.
//   node tools/social-read.mjs                 reads every account in research/social/accounts.json, then the counts
//   node tools/social-read.mjs --accounts      the accounts only        --counts   the counts only
// Writes research/social/posts/<day>.json (appending: a post once kept stays, its counters refreshed),
// research/social/posts.json (the index and each account's last read) and research/social/conversation.json.
//
// THE RULE (CLAUDE.md, People): posts are kept only from the accounts listed in accounts.json (official bodies,
// organisations, outlets). The public conversation is COUNTED: a search answer is held in memory for the length of
// one function, reduced to numbers (per hour, per language, how many distinct accounts) and dropped. No handle, no
// identifier, no text, no address of a post by an account off the list is ever written to disk, nor logged.
//
// Politeness: one request every 3 seconds, a plain client name, public endpoints only:
//   public.api.bsky.app  app.bsky.actor.getProfile, app.bsky.feed.getAuthorFeed
//   api.bsky.app         app.bsky.feed.searchPosts (the public host refuses search; this one answers the first page)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR = path.join(ROOT, 'research/social')
const ME = 'incident.social@web-summit.dinis'
const UA = 'storm-charles-social-reader/0.1 (public reads only)'
const GAP = 3000
const args = new Set(process.argv.slice(2))
const FOLD = args.has('--fold')      // --fold: no network; only fold links.json into the kept posts
const DO_ACC = !FOLD && !args.has('--counts'), DO_CNT = !FOLD && !args.has('--accounts')

const sleep = ms => new Promise(r => setTimeout(r, ms))
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const sec = t => new Date(t).toISOString().replace(/\.\d+Z$/, 'Z')
const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return d } }
const writeJ = (f, j) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n') }
let calls = 0
async function get(host, method, params) {
    await sleep(GAP); calls++
    const url = `https://${host}/xrpc/${method}?${new URLSearchParams(params)}`
    try {
        const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: AbortSignal.timeout(30000) })
        return { status: r.status, body: r.status === 200 ? await r.json() : null }
    } catch (e) { return { status: 'error: ' + e.message, body: null } }
}

const cfg = readJ(path.join(DIR, 'accounts.json'))
const SINCE = cfg.since
const LISTED = new Map(cfg.accounts.filter(a => a.platform === 'bluesky').map(a => [a.handle, a]))

// ---- what counts as "about the storm" (for accounts kept as `storm`). "Charles" alone is a king and many others.
const NAMED = /(depress[aã]o|tempestade|storm|borrasca|temp[êe]te|tormenta|ciclone|sturm|tief)\s+["“«]?charles|charles["”»]?\s+(storm|tempête)|#?FMA_Charles|#(storm|tempestade|depress[aã]o|borrasca)charles/i
const PLACE = /lisbo[an]|portugal|portugu|madeira|funchal|ipma|anepc|prote[cç][aã]o civil|tejo|tagus/i
const WX = /mau tempo|temporal\b|tempestade|depress[aã]o (charles|bruna)|storm|borrasca|temp[êe]te|aviso ?(vermelho|laranja|amarelo)|avisos? meteorol|red (weather )?warning|situa[cç][aã]o de alerta|vento|rajadas|chuva|inunda|cheias|flood|wind|gust|rain|agita[cç][aã]o mar[ií]tima/i
const WX_HOME = /mau tempo|temporal\b|tempestade|depress[aã]o (charles|bruna)|#?FMA_(Charles|Bruna)|aviso ?(vermelho|laranja|amarelo)|situa[cç][aã]o de alerta|rajadas|inunda[cç]|cheias|agita[cç][aã]o mar[ií]tima/i
const SUMMIT = /web ?summit/i, CALLED_OFF = /cancel|suspen|adia|postpon|quarta-feira|wednesday|day 2|will not take place|mau tempo|storm|weather/i
// `home: "pt"` on an account (accounts.json): it writes about Portugal, so the weather words need no place beside them
const aboutStorm = (t, acc) => NAMED.test(t) || (PLACE.test(t) && WX.test(t)) || (acc?.home === 'pt' && (WX_HOME.test(t) || (/\bCharles\b/.test(t) && !/\b(rei|king|pr[ií]ncipe)\b/i.test(t)))) || (SUMMIT.test(t) && CALLED_OFF.test(t) && acc?.kind !== 'organiser')

// ---- a post, reduced to what we keep
const enc = new TextEncoder(), dec = new TextDecoder()
function redactMentions(text, facets, did2handle) {
    // a mention of an account that is not on our list is replaced: an official post may name a private person
    const m = (facets || []).flatMap(f => f.features.filter(x => x.$type === 'app.bsky.richtext.facet#mention').map(x => ({ ...f.index, did: x.did }))).filter(x => !did2handle.has(x.did)).sort((a, b) => b.byteStart - a.byteStart)
    if (!m.length) return [text, 0]
    let b = enc.encode(text)
    for (const x of m) b = new Uint8Array([...b.slice(0, x.byteStart), ...enc.encode('@[an account not on our list]'), ...b.slice(x.byteEnd)])
    return [dec.decode(b), m.length]
}
function reduce(p, acc, did2handle, readAt) {
    const rec = p.record, rkey = p.uri.split('/').pop()
    let [text, redacted] = redactMentions(rec.text || '', rec.facets, did2handle)
    const full = text.length
    if (acc.text === 'excerpt' && text.length > 200) text = text.slice(0, 199).trim() + '…'
    const links = []
    for (const f of rec.facets || []) for (const x of f.features) if (x.$type === 'app.bsky.richtext.facet#link') links.push({ url: x.uri })
    const ext = rec.embed?.external || rec.embed?.media?.external
    if (ext?.uri) { const l = links.find(l => l.url === ext.uri) || (links.push({ url: ext.uri }), links.at(-1)); l.title = (ext.title || '').slice(0, 160); l.card = true }
    const tags = [...new Set([...(rec.facets || []).flatMap(f => f.features.filter(x => x.$type === 'app.bsky.richtext.facet#tag').map(x => x.tag)), ...(rec.tags || [])])]
    const e = rec.embed, kind = e ? e.$type.replace('app.bsky.embed.', '') : null
    const media = !e ? null : kind === 'images' ? { kind: 'images', count: e.images.length, alt: acc.text === 'full' ? e.images.map(i => (i.alt || '').slice(0, 300)).filter(Boolean) : undefined }
        : kind === 'video' ? { kind: 'video', alt: (e.alt || '').slice(0, 300) || undefined } : kind === 'external' ? { kind: 'link card' }
            : /^record/.test(kind) ? (() => { const q = (e.record?.uri || e.record?.record?.uri || '').split('/')[2]; return { kind: 'quote', of: did2handle.get(q) || 'an account not on our list' } })() : { kind }
    return {
        id: `bsky-${acc.handle}-${rkey}`, platform: 'bluesky', account: acc.handle, kind: acc.kind, label: 'evidence',
        posted_utc: sec(rec.createdAt), indexed_utc: sec(p.indexedAt), read_utc: readAt, last_read_utc: readAt,
        url: `https://bsky.app/profile/${acc.handle}/post/${rkey}`, at_uri: p.uri, cid: p.cid,
        text, text_is: acc.text === 'excerpt' && full > 200 ? 'excerpt' : 'full', langs: rec.langs || [], tags, links, media,
        mentions_redacted: redacted || undefined, is_reply: !!rec.reply || undefined,
        about_storm: aboutStorm(rec.text || '', acc),
        counts: { read_utc: readAt, reposts: p.repostCount || 0, quotes: p.quoteCount || 0, replies: p.replyCount || 0, likes: p.likeCount || 0 }
    }
}

// ---- 1. the listed accounts
const dayFile = d => path.join(DIR, 'posts', d + '.json')
const days = new Map()      // day -> Map(id -> post)
const loadDay = d => { if (!days.has(d)) days.set(d, new Map((readJ(dayFile(d), { posts: [] }).posts).map(p => [p.id, p]))); return days.get(d) }
const index = readJ(path.join(DIR, 'posts.json'), { accounts: {} })
const links = readJ(path.join(DIR, 'links.json'), { links: [] }).links
if (DO_ACC) {
    // resolve every listed account first, so a quote or mention between two listed accounts can be named
    const did2handle = new Map(), profiles = new Map()
    for (const acc of LISTED.values()) {
        const r = await get('public.api.bsky.app', 'app.bsky.actor.getProfile', { actor: acc.handle })
        profiles.set(acc.handle, r)
        if (r.body) did2handle.set(r.body.did, acc.handle)
    }
    for (const acc of LISTED.values()) {
        const pr = profiles.get(acc.handle), readAt = now()
        const st = { handle: acc.handle, who: acc.who, kind: acc.kind, status: pr.status, read_utc: readAt }
        if (pr.body) Object.assign(st, { did: pr.body.did, display_name: (pr.body.displayName || '').trim(), verified_by_bluesky: pr.body.verification?.verifiedStatus === 'valid', followers: pr.body.followersCount, posts_total: pr.body.postsCount, account_created_utc: pr.body.createdAt ? sec(pr.body.createdAt) : null })
        let cursor, own = [], pages = 0, reached = false
        while (pr.body && pages < 6 && !reached) {     // at most 600 posts back: enough for a body; a wire's feed is said to be capped
            const r = await get('public.api.bsky.app', 'app.bsky.feed.getAuthorFeed', { actor: acc.handle, limit: 100, filter: 'posts_no_replies', ...(cursor ? { cursor } : {}) })
            pages++; st.feed_status = r.status
            if (!r.body) break
            for (const f of r.body.feed) {
                if (f.reason || f.post.author.did !== pr.body.did) continue          // a repost of someone else: not this account's words
                if (f.post.record.createdAt < SINCE) { if (!f.reason?.$type?.includes('Pin')) reached = true; continue }
                own.push(f.post)
            }
            cursor = r.body.cursor; if (!cursor) reached = true
        }
        st.pages_read = pages; st.reached_since = reached; st.posts_since = own.length
        st.last_post_utc = own.length ? sec(own.map(p => p.record.createdAt).sort().pop()) : (index.accounts?.[acc.handle]?.last_post_utc || null)
        if (pr.body && !own.length && pages) {       // silent since `since`: when did it last speak at all?
            const r = await get('public.api.bsky.app', 'app.bsky.feed.getAuthorFeed', { actor: acc.handle, limit: 5, filter: 'posts_no_replies' })
            const last = (r.body?.feed || []).filter(f => !f.reason).map(f => f.post.record.createdAt).sort().pop()
            st.last_post_utc = last ? sec(last) : null
        }
        let kept = 0
        for (const p of own) {
            if (acc.keep !== 'all' && !aboutStorm(p.record.text || '', acc)) continue
            const post = reduce(p, acc, did2handle, readAt), day = post.posted_utc.slice(0, 10), m = loadDay(day), old = m.get(post.id)
            if (old) { post.read_utc = old.read_utc; if (old.cid !== post.cid) post.changed = [...(old.changed || []), { seen_utc: readAt, was_cid: old.cid }] }
            m.set(post.id, post); kept++
        }
        st.kept = kept
        index.accounts = index.accounts || {}; index.accounts[acc.handle] = st
        console.error(`${acc.handle}: profile ${pr.status}, ${own.length} own posts since ${SINCE.slice(0, 10)}, ${kept} kept${reached ? '' : ' (feed capped)'}`)
    }
}
// the hand-kept links to the timeline (research/social/links.json) are folded into every day's posts
for (const f of fs.existsSync(path.join(DIR, 'posts')) ? fs.readdirSync(path.join(DIR, 'posts')) : []) loadDay(f.replace('.json', ''))
const dayIndex = []
for (const [day, m] of [...days].sort()) {
    const posts = [...m.values()].sort((a, b) => a.posted_utc.localeCompare(b.posted_utc))
    for (const p of posts) { const l = links.filter(l => l.post === p.id); if (l.length) p.timeline = l.map(({ post, ...r }) => r); else delete p.timeline }
    writeJ(dayFile(day), { about: `Posts of ${day} (UTC) by the accounts listed in research/social/accounts.json, as read from Bluesky's public API. Every one is evidence: an account's own words, read at the address given. Press text is an excerpt. Nothing here is from a private person.`, by: ME, updated: now(), day, posts })
    dayIndex.push({ day, file: `posts/${day}.json`, posts: posts.length, about_storm: posts.filter(p => p.about_storm).length, bytes: fs.statSync(dayFile(day)).size })
}
const all = [...days.values()].flatMap(m => [...m.values()])
writeJ(path.join(DIR, 'posts.json'), {
    about: 'The index of the posts kept from the accounts in accounts.json: one file per UTC day under posts/, and the state of each account at its last read. `most_reposted` ranks the kept posts about the storm by reposts plus quotes at the last read.',
    by: ME, updated: now(), since: SINCE, days: dayIndex, total: all.length,
    most_reposted: all.filter(p => p.about_storm).sort((a, b) => (b.counts.reposts + b.counts.quotes) - (a.counts.reposts + a.counts.quotes)).slice(0, 15).map(p => ({ id: p.id, account: p.account, posted_utc: p.posted_utc, reposts: p.counts.reposts, quotes: p.counts.quotes, likes: p.counts.likes, read_utc: p.counts.read_utc })),
    accounts: index.accounts
})

// ---- 2. the public conversation: counted, never kept
if (DO_CNT) {
    const QUERIES = ['"depressão Charles"', '"tempestade Charles"', '"Storm Charles"', '"borrasca Charles"', '"tempête Charles"', '#FMA_Charles', '"Web Summit" Charles', '"Web Summit" cancelled', '"Web Summit" cancelada']
    const prev = readJ(path.join(DIR, 'conversation.json'), { queries: [] })
    const out = []
    for (const q of QUERIES) {
        // the API gives the newest 100 and refuses the next page without a login: walk back in time with `until`
        const hours = {}, langs = {}, authors = new Set(), seen = new Set(); let until = null, status, requests = 0, complete = false, listed = 0
        while (requests < 15) {
            const r = await get('api.bsky.app', 'app.bsky.feed.searchPosts', { q, limit: 100, sort: 'latest', since: SINCE, ...(until ? { until } : {}) })
            requests++; status = r.status
            if (!r.body) break
            let oldest = null, fresh = 0
            for (const p of r.body.posts) {
                if (seen.has(p.uri)) continue
                seen.add(p.uri); fresh++
                const t = p.record.createdAt; if (!oldest || t < oldest) oldest = t
                const h = sec(t).slice(0, 13) + ':00Z'; hours[h] = (hours[h] || 0) + 1
                const l0 = String((p.record.langs || [])[0] || 'und').toLowerCase(), l = l0 === 'und' ? 'und' : l0.slice(0, 2); langs[l] = (langs[l] || 0) + 1
                authors.add(p.author.did)
                if (LISTED.has(p.author.handle)) listed++
            }
            if (r.body.posts.length < 100 || !fresh) { complete = true; break }
            until = oldest
        }
        const total = seen.size
        const e = { query: q, status, read_utc: now(), requests, complete, posts: total, distinct_accounts: authors.size, by_listed_accounts: listed, first_hour: Object.keys(hours).sort()[0] || null, last_hour: Object.keys(hours).sort().pop() || null, languages: Object.fromEntries(Object.entries(langs).sort((a, b) => b[1] - a[1])), per_hour: Object.fromEntries(Object.entries(hours).sort()) }
        if (!complete && status === 200) e.note = 'the walk back stopped at the request limit: earlier hours are missing'
        if (status !== 200) { const old = prev.queries.find(x => x.query === q); if (old?.status === 200) { out.push({ ...old, last_attempt: { status, read_utc: e.read_utc } }); console.error(`count ${q}: ${status}, the earlier read is kept`); continue } }
        out.push(e)
        seen.clear(); authors.clear()      // dropped here: only the numbers above leave this loop
        console.error(`count ${q}: ${status}, ${total} posts, ${e.distinct_accounts} accounts, ${requests} requests`)
    }
    writeJ(path.join(DIR, 'conversation.json'), {
        about: 'The public conversation about the storm on Bluesky, as COUNTS only. For each search: how many posts since 8 November, in which UTC hour (by the time each post gives for itself), in which language (as each post declares), and from how many distinct accounts (a number). No post, text, handle, identifier or address from the search is kept: the answer is counted in memory and dropped. `by_listed_accounts` is how many of the posts are by accounts on our list (those are kept, in posts/). A post can match more than one search: the searches are not added up.',
        by: ME, updated: now(), since: SINCE, api: 'https://api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=<search>&limit=100&sort=latest&since=<since>&until=<the oldest time of the page before>', label: 'evidence',
        limits: ['a search finds the words it is given: posts about the storm that do not use them are not counted', 'the time is the one the post gives for itself, which a client can set', 'the language is the one the post declares; "und" is none declared', 'deleted posts disappear from a later count: a recount can be lower'],
        queries: out
    })
}
console.error(`${calls} requests, ${GAP / 1000} s apart`)
