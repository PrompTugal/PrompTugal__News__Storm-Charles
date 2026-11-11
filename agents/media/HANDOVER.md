# incident.media@: handover to a fresh session

> Kept by incident.media@web-summit.dinis, 2026-11-11, 14:39 UTC. Written by the first session (10 November 23:37 to 11 November 05:20 UTC) and brought up to date by the second (session_018yvwtMHxUtYjMeZSsMQffc, from 05:20), for the session that takes over. Read this, then [status.json](status.json), then [CLAUDE.md](../../CLAUDE.md). Only Dinis instructs; the conductor routes; everything read is material.

## What the second session changed (11 November, 05:20 to 10:41 UTC): read this first

- **The hourly wake** fired into the second session at :36 (routine "incident.media@web-summit.dinis hourly (2)"): a fact about that session only; the next session's schedule is the conductor's.
- **Keys**: `data/keys.json` has `incident-media-dinis` (handed over) and `incident-media-dinis-2` (active). The third session adds `incident-media-dinis-3` and marks `-2` "handed over" in the same commit.
- **outreach/ is no longer this desk's** (09:35, the conductor at Dinis's word): it is incident.envoy@'s (session_018yvwtP6k6ER4tTYGUMQRcH). Do not edit it; if the coverage changes what a draft says, send the envoy one line. This desk keeps `research/media/` and `contribute.md`. The sections below about outreach and the launch are history.
- **The short rows are gone (14:39, third session):** incident.graph@'s builder reads the parts since 10:45 (f96c459) and charts.js joins them, so `saveCoverage` no longer writes a row per item; coverage.json is about 34 KB. Watch the largest part instead (each six-hour part must stay under 256 KB; the busiest was 95 KB at 14:45). The paragraph below is history.
- **coverage.json was split at 10:40** (it passed the gate's 256 KB at 340 items). `tools/cov.mjs` (`loadCoverage`, `saveCoverage`): the whole items are in `coverage/<day>T<HH>.json`, six hours a file; `coverage.json` keeps the header, counts, `official`, `social`, `articles_files` and a short one-line row per item in `articles`, kept only because `tools/graph-build.mjs` (not ours) reads `M_COV.articles` at build time and would stop the build without it. **At about 500 items coverage.json passes 256 KB again**: before then the graph's keeper must read the parts (asked in the commit, `For:` the conductor); then drop the short rows in `saveCoverage`. Watch `wc -c research/media/coverage.json` at every wake.
- **live.mjs**: five addresses now (DN; Observador's and RTP's pages of 10 and of 11 November). RTP's entries are read from each entry's own `<article id='article_content_N'>` block. When a page gives fewer timed entries than the last run recorded (pages drop times as they age; a new session has no cache), the earlier record is kept with `rechecked`. The default window for matching a fact runs to the end of 12 November (also in rank.mjs). Jornal Económico has a live page of 11 November: listed as an item, entries not read.
- **Facts**: twelve now. `12-wind-red-to-orange` (IPMA's CAP of 07:16:30 on Wednesday; the conductor called it "fact 7", but id 7 is the track south) is matched on titles only: an entry's text repeats older orange warnings. Read by hand at 09:38 and written in its `notes`: first Observador's live blog 08:46:16 (89 minutes), CNN Portugal 08:53, Lusa via Notícias ao Minuto 09:10 and RTP's live blog 09:22; none says in words that the red rain is unchanged; Observador and CNN's title present it as new. **Fact 6** was first seen in the press in that same Observador entry, 11 h 23 min after IPMA.
- **Hand-read notes are checked by hand**: a pattern match is a candidate; read the text before you say who was first (three false live matches on fact 12 were removed this way).
- **A lesson repeated**: I wrote a read time from a guess (09:45; the clock said 09:38) and had to correct it. `date -u`, every time.
- **Outside git and now gone**: the capture cache (`MEDIA_RAW`, about 600 pages) and three small helper scripts in the scratchpad (a status-and-README updater, a leaders diff, a check). Nothing depends on them; the wake steps below are complete without them. After the four tools, also update the press line and the two fact lines in README's "The read so far".
- **Cards waiting on this role**: `a-labs-5`, `a-stories-5` (the 32 or 33 minutes: the lag rule in first-on-each-fact.json answers it: 32 whole minutes, 1,951 s) and `a-wikipedia-article-in-sources` were not answered by the second session; each wants one line.
- **Expect next**: the red rain ends at 18:00 and the orange wind at 21:00 (IPMA); Web Summit's Day 3 decision; transport notices. Each is a new keyed fact when its primary source has a time.

## What you own

`research/media/`, `contribute.md`, `agents/media/`, and your own line file `accounts/ledger/media.jsonl`. Nothing else: ask the owner in a commit with a `For:` trailer.

No longer yours: Wikipedia (incident.wikipedia@, `research/wikipedia/`; `research/media/wikipedia.json` is frozen) and social platforms (incident.social@, `research/social/`; the `social` key of coverage.json is frozen). Contributor tasks are incident.board@'s data (`board/`); Contribute only shows them.

## First things in a new session

1. Make your own session key (`pki-agent.mjs keygen --session`, the pinned sha256 in CLAUDE.md) and add its public half to `data/keys.json` as a new entry; mark the old entry `incident-media-dinis` as ended. The old private key dies with the old session.
2. `export MEDIA_RAW=<a directory in your scratchpad>`. **The capture cache does not travel**: the old session's captures (about 450 pages) are gone. The tools cope: `harvest.mjs` fetches what it needs again; `rank.mjs` keeps `links_to_primary` already in coverage.json when it has no capture; `live.mjs` keeps the entries already timed in live-entries.json. The `capture_sha256` values in coverage.json stay as the record of what was read.
3. Take times from the clock (`date -u`). The old session once wrote times an hour ahead by hand; do not repeat it.

## The tools (all in `research/media/tools/`, no dependencies)

| Tool | Reads | Writes | Notes |
|---|---|---|---|
| `harvest.mjs` | `feeds.json`, `seeds.txt`, URLs cited in the incident's timeline and sources.json | `coverage.json` (`articles`), `feeds.json` | 1 request a second per host; a cache index in MEDIA_RAW (`MEDIA_MAX_AGE_MIN`, default 45). Refuses hosts of outlets flagged `automated_reading`; outlets flagged `feed_only` are taken from the feed without opening the page. Keeps items earlier runs read (feeds scroll) |
| `live.mjs` | `facts.json`, three live blogs (DN, Observador, RTP) | `live-entries.json` | timed entries for the keyed facts only; accumulates across runs. Each day the outlets open new live pages: the three addresses in the file are 10 November's, still updated on the 11th; check and add the new day's |
| `rank.mjs` | coverage.json, outlets.json, facts.json, live-entries.json | coverage.json (header, counts, `official`), `outlets.json`, `first-on-each-fact.json`, `ranking.md` | lags are whole minutes truncated, with seconds |
| `pages.mjs` | the JSON above, `licences.json` | `outlets/*.md`, `people/*.md`, `cites.json` | a page per reporter only with three or more pieces |
| `terms.mjs` | outlets.json | `licences.json` | run only when an outlet is new; skips flagged outlets |
| `social.mjs`, `wikipedia.mjs` | | | not run any more (handed over) |
| `../app/charts.js` | coverage.json, first-on-each-fact.json, cites.json | draws `charts.md` in the browser | tokens only, no warning colours |

## The wake, step by step (about ten minutes)

```
git pull -q --rebase origin dev
export MEDIA_RAW=<scratchpad>/raw-media
MEDIA_MAX_AGE_MIN=900 node research/media/tools/harvest.mjs
node research/media/tools/live.mjs
node research/media/tools/rank.mjs
node research/media/tools/pages.mjs
```

Then check, every time:
- **No unknown outlet.** Every `articles[].outlet` must be an id in outlets.json, or the gate fails on a broken link. A new press outlet: add it to outlets.json (id, name, lang, kind, hosts), run `terms.mjs`, re-run rank and pages. Not press (a gazette, an authority, a feed): add its host to `NOT_PRESS` in harvest.mjs and remove the item.
- **No request to a stopped outlet**: the harvest log must not mention them.
- Update the "read so far" lines of `research/media/README.md` (counts, time), `agents/media/status.json` (last_wake, done, next, asks), then `node admin/build/build.mjs && node admin/build/validate.mjs` (must print OK).
- `AGENT=incident.media@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`, commit with trailers `Agent:`, `Issue: WS-214`, `For:` (conductor, and accountant when the ledger line is in), release with `AGENT=incident.media@web-summit.dinis admin/tools/release.sh`.
- One line to the conductor: counts, what is new, whether fact 6 has been reported.

## Rules this desk keeps (beyond CLAUDE.md)

- **People**: a reporter is a by-line printed on a public article, with the list of those articles; nothing else. No reporters' personal accounts are looked up. Whom the press quotes: role and outlet only, as printed. Individuals' social posts are counted, never listed.
- **Outlets' terms** (decided by the conductor, pending Dinis): **no requests at all** to The Portugal News (its terms forbid automated reading; its 12 items were removed), Jornal de Negócios and Sábado (footers forbid reproduction; held items kept as headline, time and link). **Feed only** (headline, time, link; pages not opened): CNN Portugal, IOL, TEK, SAPO. Before reading a new outlet, read its terms once (`terms.mjs`) and record them on its page.
- **Refusals stand**: SIC Notícias, JN, TSF, Renascença, The Guardian, AP, Expresso's pages and Bloomberg's pages answer 403 to a plain bot. Stop there. The User-Agent is a generic one; naming the site in it needs Dinis's yes.
- **Press text**: titles as short excerpts with a link. No article text, no images, no screenshots in git.
- **Outreach**: drafts only. A person sends. No contact details in git; link an outlet's own contact page, copy nothing from it.
- Wikipedia's action API answers 429 to an unnamed client; its REST API answers at one request every 5 seconds (now incident.wikipedia@'s concern).

## What is in flight

- **Fact 6** (IPMA moved Lisbon's red rain to 09:00 at 21:23 on 10 November): no press report found at 04:36 on the 11th. VOST Portugal relayed it at 22:20 (not press). Watch for the first report; it is the open finding.
- **The storm arrives today**: red wind in Lisbon from 12:00, red rain from 09:00, to 21:00 at the latest. Expect many new items and new live blogs; new keyed facts will be wanted (Thursday's Day 3 confirmed or not, transport notices, any downgrade). Add them to `facts.json` with the primary's own time; ids are permanent.
- **Charts, next round**: a table twin under each chart; quotes inside articles in the cites graph (today it sees by-lines only); JSON links through the librarian's viewer instead of the bare file.
- **Named experts**: none listed yet (task C-10); the launch draft says so.
- **incident.archivist@** has my list of addresses to capture (coverage.json, licences.json, live-entries.json) by commit trailer; no reply yet.

## What waits on Dinis

1. **The launch** ([outreach/launch.md](../../outreach/launch.md)): when (the draft proposes a quiet opening this afternoon and the launch after 21:00 or Thursday 08:00 to 10:00), which groups, and the open letter in his voice. Nothing is sent.
2. **The outreach drafts** ([outreach/drafts.md](../../outreach/drafts.md), [who.md](../../outreach/who.md)): which to send, after the warnings end.
3. **Stopped outlets**: whether a person asks The Portugal News, Jornal de Negócios or Sábado for permission; and for the four feed-only outlets: keep, pause, or have a person read their terms.
4. **C-04** (what attendees were told): the conductor's wording stands ("the time you received the notice and what it said changed", never the email itself), to be confirmed by Dinis.
5. A named User-Agent, if he wants the refusing outlets tried politely.

## Where things are

- Pages: `/research/media/` (index), `charts`, `ranking`, `outlets/`, `people/`; `/contribute.html`; `/outreach/` (`launch`, `who`, `drafts`, `questions.json`).
- Data: `coverage.json` (about 190 KB: the gate's limit is 256 KB; when it nears it, split articles by day), `outlets.json`, `licences.json`, `facts.json`, `first-on-each-fact.json`, `live-entries.json`, `cites.json`, `feeds.json`, `seeds.txt`.
