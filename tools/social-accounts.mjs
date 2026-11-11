#!/usr/bin/env node
// A page per listed social account (incident.social@web-summit.dinis). A build generator: node tools/social-accounts.mjs --out <dir>
// Writes <dir>/research/social/accounts/<handle>.md (the build renders each) from research/social/*.json. Never a tracked file.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), DIR = path.join(ROOT, 'research/social')
const i = process.argv.indexOf('--out'); if (i < 0) { console.error('social-accounts: --out <dir> is required'); process.exit(1) }
const OUT = path.join(path.resolve(process.argv[i + 1]), 'research/social/accounts')
const J = f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'))
const acc = J('accounts.json'), ix = J('posts.json'), posts = ix.days.flatMap(d => J(d.file).posts)
const INC = 'incidents/2026-11-10-storm-charles'
const ALIAS = { 'web-summit': 'websummit', 'the-guardian': 'guardian' }
const entity = id => { const e = ALIAS[id] || id; for (const t of fs.existsSync(path.join(ROOT, 'entities')) ? fs.readdirSync(path.join(ROOT, 'entities')) : []) if (fs.existsSync(path.join(ROOT, 'entities', t, e + '.json'))) return `entities/${t}/${e}` ; return null }
const hm = t => `${+t.slice(8, 10)} Nov, ${t.slice(11, 16)}`, one = t => t.replace(/\s+/g, ' ').replace(/\|/g, '/').trim(), cut = (t, n) => { t = one(t); return t.length > n ? t.slice(0, n - 1) + '…' : t }
fs.mkdirSync(OUT, { recursive: true })
const kept = ix.updated, when = `${+kept.slice(8, 10)} November 2026, ${kept.slice(11, 16)} UTC`
for (const a of acc.accounts) {
    const st = ix.accounts[a.handle] || {}, ps = posts.filter(p => p.account === a.handle).sort((x, y) => y.posted_utc.localeCompare(x.posted_utc)), ent = a.entity && entity(a.entity)
    const tied = ps.filter(p => p.timeline)
    const md = `---
title: ${a.who.split(/[,(]/)[0].trim()} on Bluesky
summary: What ${a.who.split(/[,(]/)[0].trim()} posted on Bluesky about Storm Charles, why the account counts as official or public-role, and each post with its source and the time read.
---
# ${a.who.split(/[,(]/)[0].trim()} on Bluesky

> Kept by incident.social@web-summit.dinis, ${when}. Part of [Bluesky and Storm Charles](../index.html). **Evidence**: the account's own words, read at the address given; never the fact itself unless the account is the body that decides. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

| | |
|---|---|
| Account | \`${a.handle}\` on Bluesky: [bsky.app/profile/${a.handle}](https://bsky.app/profile/${a.handle}) (leaves this site) |
| Who | ${a.who}${ent ? ` ([what we hold on it](../../../${ent}.html))` : ''} |
| Kind | ${a.kind} |
| Why it is on the list | ${one(a.why)} |
| Who decided | ${a.decided_by} |
| Verified by Bluesky | ${st.verified_by_bluesky ? 'yes' : 'no'} |
| Followers; posts in all | ${st.followers ?? '?'}; ${st.posts_total ?? '?'} (read ${st.read_utc ? hm(st.read_utc) : '?'} UTC) |
| Its own posts since 8 Nov | ${st.posts_since ?? '?'}${st.reached_since === false ? ' or more (the feed is longer than we read)' : ''} |
| Kept | ${ps.length} (${a.keep === 'all' ? 'every post' : 'the posts about the storm, matched by words'}; ${a.text === 'excerpt' ? 'text as a 200-character excerpt' : 'full text'}) |
| Last post | ${st.last_post_utc ? (st.last_post_utc < acc.since ? st.last_post_utc.slice(0, 10) : hm(st.last_post_utc) + ' UTC') : 'none'} |
| Tied to timeline rows | ${tied.length ? [...new Set(tied.flatMap(p => p.timeline.map(l => l.row)))].map(r => `[\`${r}\`](../../../${INC}/timeline.html#${r})`).join(', ') : 'none'} |

## The posts kept, newest first

${ps.length ? `| Posted (UTC) | Text${a.text === 'excerpt' ? ' (excerpt)' : ''} | Timeline | Reposts | Card and address |
|---|---|---|---|---|
${ps.map(p => `| ${hm(p.posted_utc)} | ${cut(p.text, a.text === 'excerpt' ? 200 : 300)} | ${(p.timeline || []).map(l => `${l.relation} [\`${l.row}\`](../../../${INC}/timeline.html#${l.row})`).join('; ')} | ${p.counts.reposts + p.counts.quotes} | [card](../index.html#${p.id}) · [post](${p.url}) (leaves this site) |`).join('\n')}` : `None: the account has posted nothing ${a.keep === 'all' ? '' : 'about the storm '}since 8 November that the public API returned at our read.`}

The data: [posts.json](../posts.json) (this account's state under \`accounts\`), the day files under [posts/](../posts.json), [accounts.json](../accounts.json) (the reason and who decided).
`
    fs.writeFileSync(path.join(OUT, a.handle + '.md'), md)
}
