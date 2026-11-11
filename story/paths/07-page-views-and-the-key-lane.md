> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:26 UTC. Made by `story/make-paths.mjs` from [07-page-views-and-the-key-lane.json](07-page-views-and-the-key-lane.json) (the data incident.motion@ animates).

# Path 7: Page views and a vault key travelling through the lane

*Chosen by the storyteller for the arc. 11 November, 08:40 to 10:15 UTC.*

Two questions waited on Dinis: who holds the keys of the vaults the agents make, and may the site count its readers. At about 09:28 he answered the first in observability's session and at 09:30 in the conductor's: each agent makes its own vault and sends the conductor a sealed copy of the key through the conductor's append lane. In the next quarter hour observability made the page-views vault, identity built and opened the lane, and the first keys travelled through it. At about 09:47 he answered the second: page views on every page, with city and country, the IP never kept. At 10:14 the first drain: 9 views by people, 46 automated.

**Cast:** 🧑 Dinis Cruz · 🎼 conductor@ · 🔭 observability@ #4 · 🔑 identity@ #2 · 📌 board@ #2 · ⚖️ models@ #1 · 🧭 sources@ #1 · 🧮 accountant@ #2 · 🔐 the vaults (SG/Send) · 👀 readers

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| 08:40:28 |  | 📌 board@ #2 | ask | the accountant's ask joined into the card a-vault-keys-handover: when a session hands over, who passes on the keys of the vaults it made? Waiting on Dinis | [`639cf58b`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/639cf58b) · `board/items/a-vault-keys-handover.json` |
| 09:29:08 | +48 min 40 s | 🔭 observability@ #4 → 🔐 the vaults (SG/Send) | write | at Dinis's word in its session ("Yes create here the vault and then send the key to your conductor (via its append lane)", as BRIEF.md reports it): the page-views vault exists, with two append lanes; its key sealed to the conductor; the sender stays off | [`18d9f8aa`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/18d9f8aa) |
| 09:29:56 | +48 s | 🔭 observability@ #4 → 🎼 conductor@ | seal | the conductor holds a copy of the page-views vault's key since 09:29 (and a time written ahead of the clock corrected) | [`ed75f9a9`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ed75f9a9) |
| 09:30:14 | +18 s | 🧑 Dinis Cruz → 🎼 conductor@ | instruct | "The keys and vaults are created by the specific agent and then sent to you via your append lane"; written into BRIEF.md | [`84158ea2`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/84158ea2) · `BRIEF.md` |
| 09:31:51 | +1 min 37 s | ⚖️ models@ #1 → 🎼 conductor@ | seal | its vault key sealed to the conductor and sent; opened by the conductor at 09:31 (8e13cfe0); later keys by the append lane | [`1ed4d6c8`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/1ed4d6c8) |
| 09:34:19 | +2 min 28 s | 🔑 identity@ #2 | write | the conductor's append lane for vault keys built, not yet open: `seal --via-lane` for senders; the drain saves a key and prints only the vault id; SECURITY.md e.3 | [`4fb4d7c2`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/4fb4d7c2) · `tools/lane-handover.mjs` |
| 09:34:52 | +33 s | 📌 board@ #2 | answer | Dinis's words recorded on the two cards, a-vault-keys-handover and a-pageviews-vault | [`bf665cd4`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/bf665cd4) |
| 09:36:24 | +1 min 32 s | 🔭 observability@ #4 | publish | page views on: sealed, write-only events to the vault; only counts published (data/agents/views.json, /agents/#views) | [`bcab685a`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/bcab685a) · `data/agents/views.json` |
| 09:39:12 | +2 min 48 s | 🔭 observability@ #4 | read | the first drain of page views from the live site (counts only) | [`0aa3b5d8`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0aa3b5d8) |
| 09:39:19 | +7 s | 🔑 identity@ #2 | publish | the conductor's append lane open, at Dinis's yes: data/lanes.json publishes what a sender needs; checked against the real server | [`218c89a0`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/218c89a0) · `data/lanes.json` |
| 09:41:16 | +1 min 57 s | 🔑 identity@ #2 | write | the lane live end to end since 09:40 (its drain saved a key) | [`7980fa5e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/7980fa5e) |
| 09:41:52 | +36 s | 🔭 observability@ #4 | correct | the page-view sender runs only on the live host, never from a local build or the gate's | [`15a33129`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/15a33129) |
| 09:42:00 | +8 s | 🔭 observability@ #4 → 👀 readers | publish | the footer tells the reader what one event holds, that it is sealed, where the counts are and how to pause | [`0b90fcfc`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0b90fcfc) |
| 09:42:23 | +23 s | 🧭 sources@ #1 → 🎼 conductor@ | seal | a vault key sent to the conductor, sealed, through the lane; held by the conductor at 09:43 (11cd2fb0) | [`6387cf2f`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/6387cf2f) |
| 09:47:30 | +5 min 7 s | 🧑 Dinis Cruz → 🎼 conductor@ | instruct | page views on every page with city and country ("the stats should also make the call to that IP data"); the conductor gives keys to fresh sessions; recorded in BRIEF.md and CLAUDE.md | [`4dd30049`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/4dd30049) · `CLAUDE.md` |
| 09:54:13 | +6 min 43 s | 🔭 observability@ #4 | publish | page views carry country and city (one lookup per tab, live host only); the IP never kept; a city shown only at 5 or more views | [`8fa018f3`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/8fa018f3) |
| 10:15:20 | +21 min 7 s | 🔭 observability@ #4 → 🔐 the vaults (SG/Send) | read | the 10:14 drain: 12 events opened, 0 refused; 9 views by people, 46 automated (the agents' own checks are most of the automated count, 1ccc686b) | [`6648bbba`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/6648bbba) |

From the first step to the last: 1 h 34 min.

## The pauses

- 08:40:28 → 09:29:08 (48 min 40 s): the card waits; Dinis had last spoken at about 02:50 (he spoke again "after 6 h 41 min", the reporter's count, 0df5e0ab)
- 09:54:13 → 10:15:20 (21 min 7 s): the fifth observability session takes over at 10:16; the drain waits for the vault keys to be passed on

The long pause is the night: the question had been asked before 08:40 (the accountant's ask was joined to an existing card then) and Dinis was away from about 02:50 to 09:28. Once he spoke, the vault, the lane and the first keys took 13 minutes.

## What this shows

- A key travels as data, never as a message: made by the agent that owns the vault, sealed to the conductor's published public key, sent through a lane whose address is in data/lanes.json; the drain prints only the vault id.
- A decision only Dinis could make unblocked four agents at once; the board kept the question open, with its evidence, until he did.
- Counting readers was built privacy first: sealed write-only events, totals only, the IP never kept, the live host only, a footer that says so and a pause; Do Not Track sends nothing (CLAUDE.md).

## Reading it (the storyteller's)

This path is the team's security model in motion: keys in data/keys.json, vault keys only ever sealed, a lane any agent can write to and only the conductor can read. The book's team had a security role proposed and never staffed; here identity@ and the gate stand where it would.

The first and the fourteenth steps carry no key names or vault keys: only vault ids already in commit subjects. Nothing from a key store is in this page.

## Rests on

- BRIEF.md, "Dinis, 11 November, ~09:30 UTC" and "~09:47 UTC" (commits 84158ea2, 4dd30049); CLAUDE.md, page views and vault keys
- commits 0df5e0ab, 639cf58b, 18d9f8aa, ed75f9a9, 1ed4d6c8, 8e13cfe0, 4fb4d7c2, bf665cd4, bcab685a, 0aa3b5d8, 218c89a0, 7980fa5e, 15a33129, 0b90fcfc, 6387cf2f, 11cd2fb0, 8fa018f3, 1ccc686b, 6648bbba
- board/items/a-vault-keys-handover.json, board/items/a-pageviews-vault.json; data/lanes.json; data/agents/views.json
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time with ~ is placed by the storyteller (the step's `placed` field says why), drawn dashed by motion@.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
