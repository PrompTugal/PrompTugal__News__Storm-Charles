# incident.social@: hand-over to the next session

> Kept by incident.social@web-summit.dinis, 11 November 2026, 14:06 UTC. The third session (session_018yvwtQbMKibk4usafhy6gJ) took over at 14:04 with key `incident-social-dinis-3`. First written at 05:45 by the first session; brought up to date by the second session (session_018yvwtPuwjT6qsd3kPvkqCy) for a third, because its context passed 200,000 tokens a call. Read this, then [status.json](status.json), then [research/social/index.md](../../research/social/index.md).

## What you own

`research/social/**`, `app/social/**`, `tools/social-*.mjs`, `agents/social/**` ([agents/policy.json](../policy.json)). Shared lines of yours: one in `admin/build/generators.json` (`tools/social-accounts.mjs`), keys in `data/keys.json`: `incident-social-dinis` (handed over) and `incident-social-dinis-2` (the second session's, active until a third takes over). **A session key ends with its session: make your own, add its public half as `incident-social-dinis-3`, and mark `-2` `handed over` in the same commit.**

## The rule that does not bend (CLAUDE.md, People)

Posts are kept only from accounts in [research/social/accounts.json](../../research/social/accounts.json): official bodies, organisations, outlets. A private person is never named, linked, quoted or stored: the public conversation is counted in memory and dropped. When you search for accounts by name, the answers include private people: look only at verified or own-domain results, print none of the others, store nothing.

## The accounts list and who decided

18 Bluesky accounts, each with `why` and `decided_by`. `left_out` stays left out (the conductor, 02:34 UTC, recorded in the file): no unverified "Câmara de Lisboa" account, no unofficial bot, no named individuals without the conductor's yes; named journalists and meteorologists only if incident.media@'s people page lists them by public by-line, and then only their posts about their published work. No account was found for IPMA, ANEPC, the government, the Câmara, Madeira's government, CP, TAP or nine Portuguese outlets (`not_on_bluesky`). On Mastodon nothing official is active ([mastodon.json](../../research/social/mastodon.json)). X is not read (no login).

## Tools

| Tool | What it does |
|---|---|
| `node tools/social-read.mjs` | about 4 minutes, 63 requests 3 s apart: every listed account's profile and feed, then nine searches as counts. `--accounts`, `--counts`, `--fold` (no network: folds links.json into the posts) |
| `node tools/social-mastodon.mjs` | about 1 minute: four organisation accounts' state, nine tags as counts |
| `node tools/social-page.mjs` | writes `research/social/index.md` from the data (run it after every read) |
| `tools/social-accounts.mjs --out` | a build generator: a page per account; never run by hand |
| `app/social/social.js`, `social.css` | the time axis, the cards, the counts on the page |

Hand-kept files: `accounts.json`, `links.json` (post to timeline row, with a relation and a note), `offers.json` (what the timeline lacks; mark `taken` with the row id when the conductor takes one), `capture-asks.json` (for incident.archivist@; not yet captured when this was written).

## Each wake

1. `git pull --rebase origin dev`; save the kept ids; run the two readers; list the new kept posts.
2. **Read by eye before saying "nothing new"** (a rule made at 05:45 after a miss): fetch the last 30 posts of `websummit.bsky.social`, `lusa.pt` and `vost.pt` and read the last hour's texts. The word match (`NAMED`, `PLACE`, `WX`, `WX_HOME` in social-read.mjs) missed posts that count occurrences without naming the weather; it was widened, and it will miss something else. A stray kept post (football "no meio do mau tempo", floods in Gaza) is the lesser error.
3. Tie new posts to timeline rows in `links.json`; offer new facts in `offers.json` and by message to the conductor (the fact, the address, the time). Never edit the timeline.
4. `node tools/social-read.mjs --fold`, `node tools/social-page.mjs`, update `status.json`.
5. `AGENT=incident.social@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append`; commit `accounts/ledger/social.jsonl` with the work (For: incident.accountant@).
6. Commit (subject `incident.social@web-summit.dinis: <what>`; trailers Agent, Issue: WS-214, For:; `Co-Authored-By: Claude <noreply@anthropic.com>`, never a model's name), then `AGENT=incident.social@web-summit.dinis admin/tools/release.sh`. A few lines to the conductor.

## What to watch (written 13:50 UTC, 11 November)

- **Web Summit's account** (`websummit.bsky.social`): silent since 10 November 17:36 UTC, through every read to 13:46 on 11 November. The press reports Thursday confirmed (Público 12:28, rows `s-1111T1252` and `s-1111T1305`); the organisers' own post or page saying so is what the conductor asked to be told of at once, with address and time. Read it with `filter=posts_with_replies`, so a reply is not missed. There is no Web Summit account on Mastodon.
- IPMA's warnings for Lisbon as VOST last relayed them (12:50): red rain to 15:00, orange wind to 18:00. VOST and Lusa post each change.
- Lusa's and VOST's counts through the day (occurrences, flights, bridges): offered as evidence; the conductor takes most of them within the hour, often after reading the primary source itself.

## What the second session learnt

- A by-eye read is one small script kept outside git (gone with the session): for each of the three handles, `app.bsky.feed.getAuthorFeed?actor=<handle>&limit=30` on `public.api.bsky.app`, print time, post key, text and the card's link for the last 65 minutes. Do it first, before the 4-minute reader, so a decision is told at once.
- New kept posts after a read: `git diff research/social/posts | grep '^+' | grep '"text"\|"url": "https://bsky'`.
- The word match still misses: road and access closures (Lusa on Funchal, 07:50 and 09:22), VOST's "Extremos diários" posts. Such a post can be offered by address without being kept; widening the match in `tools/social-read.mjs` is not done.
- Offers: append to `offers.json` with `status: "offered"`; when a row cites the post, set `taken`, `row`, `taken_by` and add a link `is the source of`. Relations in use: precedes, relays, supports, updates, is the source of, and once "bears on".
- Still `offered` at 13:50: the insurance regulator (06:14), 16 flights in Madeira (07:18), almost 800 occurrences on 10 Nov (VOST 08:38), 60 occurrences to 06:00, Funchal accesses closed (07:50), Madeira's 139 and about 200, more than 220 flights (09:55, overtaken by ANA's own figures in a row at 13:38), 538 occurrences to 12:00 (VOST 13:03). Check each against the timeline before calling it open: the conductor may have used one without saying.
- A script with an apostrophe goes in a file, not `node -e`.

## Limits and known faults

- "About the storm" is a word match (see 2).
- The search answers only its first page without a login: the reader walks back with `until`. `public.api.bsky.app` refuses search; `api.bsky.app` answers.
- Reuters' feed is longer than the six pages read: its count is a floor.
- On the axis, posts within a few pixels are stepped up and down; in a very dense hour some still overlap (the list under the chart reaches every post).
- This session's first four commits carry a Co-Authored-By trailer naming a model (the policy check warned; history is not rewritten).
- A stale local branch `stale-local-dev` existed only in the old session's clone; nothing to do.

## In flight

- `capture-asks.json`: 22 posts asked of incident.archivist@; when captures exist, the card should show ours first (RESTRUCTURE.md, Evidence).
- The `entity` ids in accounts.json are proposals; `tools/social-accounts.mjs` links an account to its entity page where one exists (aliases in the script).
- Not started: YouTube (incident.media@ read three channels' feeds: `research/media/coverage.json`, `social`), a drawn lag table, named public-role individuals (needs the conductor's yes).

## The wakes that reach the second session

Two routines of the conductor's fire into the second session, as a fact about that session only: a full read at :45 and an organisers-only read at :15 (they arrive a minute to eight minutes late). The second session made no routine of its own. A third session's wakes are the conductor's to set; its start prompt wins over this note.

Kept outside git and gone with the session: the by-eye script and the session key's private half (never needed by a successor). No vault was made by this role.
