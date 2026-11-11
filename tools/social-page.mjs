#!/usr/bin/env node
// Writes research/social/index.md from the data tools/social-read.mjs keeps (incident.social@web-summit.dinis).
// Run by hand after a read: node tools/social-page.mjs   (not a build generator: the build only serves the result)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), DIR = path.join(ROOT, 'research/social')
const J = f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'))
const acc = J('accounts.json'), ix = J('posts.json'), conv = J('conversation.json'), links = J('links.json').links, offers = J('offers.json').offers
const masto = J('mastodon.json')
const INC = 'incidents/2026-11-10-storm-charles', sig = JSON.parse(fs.readFileSync(path.join(ROOT, INC, 'data/signals.json'), 'utf8')).items
const posts = ix.days.flatMap(d => J(d.file).posts), byId = Object.fromEntries(posts.map(p => [p.id, p])), rows = Object.fromEntries(sig.map(r => [r.id, r]))
const A = Object.fromEntries(acc.accounts.map(a => [a.handle, a]))
const now = new Date().toISOString(), hm = t => `${+t.slice(8, 10)} Nov, ${t.slice(11, 16)}`
const dur = (a, b) => { const mn = t => Math.floor(Date.parse(t) / 60000), m = mn(b) - mn(a), s = Math.abs(m); return (m < 0 ? 'before, by ' : '') + (s >= 60 ? Math.floor(s / 60) + ' h ' : '') + (s % 60) + ' min' + (m < 0 ? '' : ' after') }
const who = h => A[h].who.split(/[,(]/)[0].trim()
const one = t => t.replace(/\s+/g, ' ').replace(/\|/g, '/').trim()
const cut = (t, n) => { t = one(t); return t.length > n ? t.slice(0, n - 1) + '…' : t }
const lastRead = Object.values(ix.accounts).map(a => a.read_utc).sort().pop()
const st = h => ix.accounts[h] || {}
const ws = posts.filter(p => p.account === 'websummit.bsky.social').sort((a, b) => a.posted_utc.localeCompare(b.posted_utc)), wsLast = ws.at(-1)

// the key decisions: did the body that decided post it here, and who did, how long after?
const KEY = [
    ['s-1109T1317', 'IPMA', 'IPMA names the storm Charles'], ['s-1109T2030', 'ANEPC', "ANEPC's warning to the population"], ['s-1110T0718', 'IPMA', 'IPMA: red wind warning for Lisbon'],
    ['s-1110T1210', 'the government', 'The government declares the alert situation'], ['s-1110T1742', 'IPMA', 'IPMA: red rain warning for Lisbon (sent 16:30)'],
    ['s-1110T1909', 'Web Summit', "Web Summit: Day 2 will not take place"], ['s-1110T2353', 'IPMA', 'IPMA moves the red rain to 09:00 (sent 21:23)']
]
const SENT = { 's-1110T1742': '2026-11-10T16:30:01Z', 's-1110T2353': '2026-11-10T21:23:00Z' }     // the time IPMA sent it, where the row's own time is our read
const lagRows = KEY.map(([row, body, what]) => {
    const r = rows[row], at = SENT[row] || r.at
    const ps = links.filter(l => l.row === row).map(l => byId[l.post]).filter(Boolean).sort((a, b) => a.posted_utc.localeCompare(b.posted_utc))
    const first = ps[0]
    const own = body === 'Web Summit' ? `**no**: its last post is ${hm(wsLast.posted_utc)} ("${cut(wsLast.text, 40)}")` : `**no account found** for ${body}`
    return `| ${hm(at)} | ${what} ([\`${row}\`](../../${INC}/timeline.html#${row})) | ${own} | ${first ? `${who(first.account)}, [${hm(first.posted_utc)}](${first.url}) (leaves this site): ${dur(at, first.posted_utc)}` : 'none of the listed accounts'} | ${ps.length} |`
})
const top = ix.most_reposted.slice(0, 8).map(m => { const p = byId[m.id]; return `| ${m.reposts + m.quotes} | ${who(p.account)} | ${hm(p.posted_utc)} | ${cut(p.text, 110)} | [the post](${p.url}) (leaves this site) |` })
const accRows = acc.accounts.map(a => { const s = st(a.handle); return `| [\`${a.handle}\`](accounts/${a.handle}.html) | ${a.who} | ${a.kind} | ${s.verified_by_bluesky ? 'yes' : 'no'} | ${s.posts_since ?? '?'}${s.reached_since === false ? '+' : ''} | ${s.kept ?? 0} | ${s.last_post_utc ? hm(s.last_post_utc).replace(/^(\d+ \w+), /, s.last_post_utc < acc.since ? s.last_post_utc.slice(0, 10) + ' ' : '$1, ') : 'never'} |` })
const silent = acc.accounts.filter(a => !(st(a.handle).kept)).map(a => `${who(a.handle)}${st(a.handle).last_post_utc && st(a.handle).last_post_utc < acc.since ? ` (last post of any kind: ${st(a.handle).last_post_utc.slice(0, 10)})` : ''}`)
const convRows = conv.queries.map(c => c.status === 200 ? `| ${c.query} | ${c.posts}${c.complete ? '' : '+'} | ${c.distinct_accounts} | ${c.by_listed_accounts} | ${Object.entries(c.per_hour).sort((a, b) => b[1] - a[1])[0] ? (([h, n]) => `${hm(h)} (${n})`)(Object.entries(c.per_hour).sort((a, b) => b[1] - a[1])[0]) : ''} | ${Object.entries(c.languages).slice(0, 4).map(([l, n]) => `${l === 'und' ? 'none declared' : l} ${n}`).join(', ')} |` : `| ${c.query} | not counted (the API answered ${c.status}) | | | | |`)
const storm = posts.filter(p => p.about_storm)
const data = `<div id="social" data-base="./" data-signals="../../${INC}/data/signals.json" data-timeline="../../${INC}/timeline.html"><p class="meta">The time axis, the cards and the counts are drawn here from <a href="posts.json">posts.json</a>, <a href="accounts.json">accounts.json</a>, <a href="conversation.json">conversation.json</a> and the timeline's <a href="../../${INC}/data/signals.json">signals.json</a>. Without JavaScript, read the tables below or those files.</p></div>`

const md = `---
title: Social platforms and Storm Charles: Bluesky, Mastodon
summary: What official bodies, organisations and news outlets posted on Bluesky about Storm Charles, on one time axis against the timeline; the public conversation as counts only; what the official accounts did not post.
mount: ${data}
head: <link rel="stylesheet" href="../../app/social/social.css"><script src="../../app/social/social.js" defer></script>
---
# Social platforms and Storm Charles: Bluesky first

> Kept by incident.social@web-summit.dinis, ${+now.slice(8, 10)} November 2026, ${now.slice(11, 16)} UTC. At Dinis Cruz's word (BRIEF.md, 11 November, ~02:10 UTC): "on Bluesky, this is really cool, I like that we can capture that and actually get data. So let's create a whole Bluesky bit". Last read of the accounts: ${hm(lastRead)} UTC.

**Everything here is evidence**: an account's own words, read at the address given, at the time given. A post by an outlet or a volunteers' association about a warning is a report or a relay, never the warning: the fact is on the body's own channel. Where we compare two times it is our analysis and says so. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## The read so far (${hm(lastRead)} UTC)

- **The bodies that decide are not here.** We found no Bluesky account for IPMA, ANEPC, the government, the Câmara de Lisboa, Madeira's regional government, CP or TAP ([accounts.json](accounts.json), \`not_on_bluesky\`: where we looked). Their own sites are their channels.
- **Web Summit has an account and did not use it for the decision.** Its last post is ${hm(wsLast.posted_utc)} UTC: "${cut(wsLast.text, 60)}". Its page saying Day 2 will not take place went up at 19:09 UTC on 10 November ([\`s-1110T1909\`](../../${INC}/timeline.html#s-1110T1909)); at our read (${hm(st('websummit.bsky.social').read_utc)} UTC) the account had posted nothing since: ${ws.length} posts since 8 November, none on the weather, Wednesday or Thursday.
- **Who carried the warnings here:** VOST Portugal (a volunteers' association, not an authority) relayed IPMA's red wind warning for Lisbon 37 minutes after IPMA sent it, the red rain warning 15 minutes after, and the move of the red rain to 09:00 57 minutes after: the one change the press we read had not reported by 00:15 ([\`s-1111T0015\`](../../${INC}/timeline.html#s-1111T0015)). Lusa, the news agency, posted Web Summit's cancellation 53 minutes after the organisers' page.
- **Foreign weather services spoke of it here before Portugal's could:** Spain's AEMET posted that the storm was named Charles at 10:20 UTC on 9 November (2 h 57 min before the time our timeline gives for IPMA's communiqué; offered to the conductor to check), and its posts are the most reposted of all we keep. The UK's Met Office posted on 10 November at 13:00.
- **Kept:** ${posts.length} posts from ${acc.accounts.length} listed accounts since 8 November, ${storm.length} about the storm. **Counted, not kept:** ${conv.queries.filter(c => c.status === 200).map(c => `${c.query} ${c.posts}`).slice(0, 4).join('; ')} public posts.

## The key moments: who posted them here, and how long after

Analysis (ours): the time in the first column is the body's own (the timeline row's, or the time IPMA sent the message); the post is the earliest one by a listed account that we tied to the row ([links.json](links.json)).

| UTC | The decision or warning | Did the body post it on Bluesky? | First listed account to carry it | Posts tied |
|---|---|---|---|---|
${lagRows.join('\n')}

## What the listed accounts did not post

- Web Summit: nothing about Day 2, Day 3, refunds or the weather (see above).
- Read and silent on the storm since 8 November: ${silent.join('; ')}.
- Metropolitano de Lisboa's account (the handle is its own domain) has not posted since March 2026.
- "Did not post" means: not in what the public API returned at our read. A post deleted before our first read would not be seen.

## The most reposted (of the posts we keep, at the last read)

| Reposts and quotes | Account | Posted (UTC) | Text (excerpt) | Address |
|---|---|---|---|---|
${top.join('\n')}

## The public conversation, as counts

Posts by anyone that match a search, since 8 November: how many, from how many accounts, the busiest hour, the languages the posts declare. **No post, text, handle or address of these is kept**: [conversation.json](conversation.json) holds numbers per hour and nothing else. The searches overlap and are not added up. A "+" means capped.

| Search | Posts | Distinct accounts | Of them, by listed accounts | Busiest hour (posts) | Languages |
|---|---|---|---|---|---|
${convRows.join('\n')}

## Mastodon

Read the same way ([mastodon.json](mastodon.json), read ${hm(masto.updated)} UTC; the reader: [tools/social-mastodon.mjs](../../tools/social-mastodon.mjs)). **No body that decides or warns here has an account we could find**, and neither has Web Summit: ${masto.not_found.who.join(', ')}. The organisations' accounts that exist are dormant or unverified:

| Account | Who | What shows it is theirs | Posts in all | Last post (day) |
|---|---|---|---|---|
${masto.accounts.map(a => `| \`${a.acct}@${a.server}\` | ${a.who} | ${a.verified_links?.length ? 'verified link: ' + a.verified_links.join(', ') : 'nothing verified'} | ${a.posts_total ?? '?'} | ${a.last_post_day || 'never'} |`).join('\n')}

So there is nothing official to put on the time axis from Mastodon. The public conversation under the storm's tags, as counts only (each server sees only what reached it):

| Server | Tag | Posts since 8 Nov | Distinct accounts | Of them automated | Languages |
|---|---|---|---|---|---|
${masto.tags.map(t => `| ${t.server} | ${t.tag} | ${t.posts} | ${t.distinct_accounts} | ${t.automated} | ${Object.entries(t.languages).map(([l, n]) => `${l === 'und' ? 'none declared' : l} ${n}`).join(', ')} |`).join('\n')}

## X

Not readable without logging in: the organisers' and the authorities' profiles answer with an empty page to a client that is not logged in (incident.researcher@'s read, \`data/decisions/sources.json\`, \`platforms_without_login\`). We do not log in and we keep nothing from it. If a body's post on X matters, it is cited from where the body or the press quotes it.

## The accounts read

Each with the reason it counts as official or public-role, and who decided: [accounts.json](accounts.json). Each handle opens that account's page. "Kept" is what we store: every post for the organisers, the posts about the storm for the others (matched by words: a few are about other weather, and say so by their text).

| Handle | Who | Kind | Verified by Bluesky | Own posts since 8 Nov | Kept | Last post |
|---|---|---|---|---|---|---|
${accRows.join('\n')}

Left out, for the conductor to decide (nothing of theirs is stored): ${acc.left_out.accounts.map(a => `${a.handle ? '`' + a.handle + '`' : a.what} (${a.why_left_out})`).join('; ')}.

## How this works

**What we call** (Bluesky's public API, no account, no login, one request every 3 seconds, a client named \`storm-charles-social-reader\`):

| Call | For | What we keep from the answer |
|---|---|---|
| \`public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=<handle>\` | each listed account: does it exist, is it verified | name, verification, follower and post counts |
| \`public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=<handle>&limit=100&filter=posts_no_replies\` | each listed account's own posts, back to 8 November (6 pages at most) | per post: time posted, time read, address, text (press: 200 characters), links, hashtags, what media it carries (not the media), counters, Bluesky's content id |
| \`api.bsky.app/xrpc/app.bsky.feed.searchPosts?q=<search>&sort=latest&since=…&until=…\` | the public conversation | **numbers only**: posts per hour, per language, how many distinct accounts |

**What is public:** every post read here is public on Bluesky to anyone without an account; so are the handles, the counters and the content ids. The search answers only its first page without a login, so we walk back in time by asking again with \`until\` set to the oldest post of the page before.

**What we refuse to keep:**
- any post, name, handle, identifier or address of a **private person**. The search's answer is counted in memory and dropped; it is never written to disk, to a vault or to a log.
- a mention of an unlisted account inside a listed account's post: replaced by "@[an account not on our list]".
- replies under official posts, follower lists, likes by named accounts: never requested.
- images and video: not downloaded, not shown. The card says what the post carries and links out.
- press text beyond a short excerpt.

**What a card shows:** who (and why the account counts), the time posted, the text, the timeline row it bears on and how, when we read it, the counters at that read, the content id, our record, and last the address on Bluesky, marked as leaving this site. Screenshots of the official posts are incident.archivist@'s (asked: the list is in [capture-asks.json](capture-asks.json)); when captured, the card will show our capture first.

**The files:** [accounts.json](accounts.json) (the list, the reasons, where we looked and found nothing, who was left out), [posts.json](posts.json) (the index; [posts/](posts.json) holds one file per day: ${ix.days.map(d => `[${d.day}](${d.file})`).join(', ')}), [links.json](links.json) (post to timeline row), [offers.json](offers.json) (${offers.length} things the timeline lacks, offered to the conductor), [conversation.json](conversation.json) (the counts). The reader: [tools/social-read.mjs](../../tools/social-read.mjs); this page: [tools/social-page.mjs](../../tools/social-page.mjs).

## Limits

- Bluesky is small in Portugal: silence here says where a body publishes, not that it was silent.
- A post's time is the one it gives for itself; Bluesky's own indexing time is kept beside it (\`indexed_utc\`).
- "About the storm" is a match on words. It can miss a post and keep a stray one. **Correction, 11 November 05:45 UTC:** until then it missed posts that count occurrences without naming the weather (two by Lusa that night, four earlier); the words were widened and those posts are now kept.
- Reuters' feed is longer than the six pages we read: its count since 8 November is a floor.

A wrong account, a wrong time, an account that should be on the list or off it: [contribute](../../contribute.md).
`
fs.writeFileSync(path.join(DIR, 'index.md'), md)
console.error('research/social/index.md written')
