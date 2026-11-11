> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:22 UTC. Made by `story/make-paths.mjs` from [02-a-story-made.json](02-a-story-made.json) (the data incident.motion@ animates).

# Path 2: A story made: "Less wind for Lisbon?", from Dinis's sentence to its thirteenth telling

*Named by Dinis (BRIEF.md, ~10:10). 11 November, 02:15 to 09:56 UTC: two sessions of stories@, thirteen tellings.*

At about 02:20 Dinis said "There's a story now: the thing might not hit Lisbon as hard" and asked for it to be told from the data, every thing linked. Eleven minutes after the conductor wrote that down, a new agent, stories@, published the first telling: 26 sentences, each labelled fact, evidence or hypothesis, each with its support in the data room. Then it kept the story true: it re-read the data every hour, asked the meteorologist when an input moved (who re-weighed, and "less wind for Lisbon" became "not supported"), handed over to a second session at 05:45, and changed the top when IPMA lowered the wind warning at 07:16. The story's own record lists every telling, with what changed.

**Cast:** 🧑 Dinis Cruz · 🎼 conductor@ · ✍️ stories@ #1 · ✍️ stories@ #2 · ✍️ stories@ #3 · ✍️ stories@ #4 · 🌀 meteorologist@ · ⚠️ IPMA · 👀 readers

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| 02:15:04 |  | 🧑 Dinis Cruz → 🎼 conductor@ | instruct | "There's a story now: the thing might not hit Lisbon as hard ... a complete data-driven story ... every thing needs to be hyperlinked ... toggles." The conductor writes it into BRIEF.md (headed ~02:20, committed 02:15:04: the heading's time is approximate) with five more agents in JOBS | [`9d3a54ca`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/9d3a54ca) · `BRIEF.md` |
| 02:25:51 | +10 min 47 s | ✍️ stories@ #1 | commit | a new agent's session key (public half): stories@ exists | [`e96857b6`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/e96857b6) · `data/keys.json` |
| 02:25:51 | +0 s | ✍️ stories@ #1 | publish | the first telling: a graph of 26 claims (c1 to c18, h1 to h3, g1 and g2, o1 to o3), each with its label and support; the page made from it, with switches; on the data read at 01:51:55 | [`d2a58320`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/d2a58320) · `stories/less-wind-for-lisbon/story.json` |
| 02:26:33 | +42 s | ✍️ stories@ #1 | read | checked against the 02:22:46 read: nothing moved at IPMA or in the models; the two observation sentences retold; the story notes that an input had moved | [`fa8134dd`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/fa8134dd) |
| 02:30:00 | +3 min 27 s | 🌀 meteorologist@ | answer | the meteorologist's hypothesis re-weighed, after the story's note (synced by the conductor): which side of Lisbon the centre passes is unsettled; "just south" now low confidence; very close to Lisbon 15:00 to 18:00 holds | [`10d91459`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/10d91459) · `s-1111T0229` |
| 02:36:06 | +6 min 6 s | ✍️ stories@ #1 | correct | the hypothesis layer retold: "'less wind for Lisbon' is not supported" (one claim added, four changed); the earlier version dated in the story's record. The red warnings stand | [`67dc6d68`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/67dc6d68) |
| 03:00:50 | +24 min 44 s | ✍️ stories@ #1 | read | checked against the 02:38 read: nothing moved; two sentences retold | [`a12191d2`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/a12191d2) |
| 04:28:09 | +1 h 27 min | ✍️ stories@ #1 | read | 04:27 re-check on the 03:23 read (a 03:27 re-check had found no support moved, c7389c08): nothing moved at IPMA; one sentence added from a new row (RTP's 03:00 bulletin title) | [`a2af4fe4`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/a2af4fe4) |
| 05:28:17 | +1 h 0 min | ✍️ stories@ #1 | read | 05:27 re-check: Open-Meteo moved; retold and dated | [`787075c0`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/787075c0) |
| 05:42:55 | +14 min 38 s | ✍️ stories@ #1 | write | HANDOVER.md for its next session: what it owns, the tools, the wake's steps, what is in flight and owed, its schedule's id | [`4adb9f40`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/4adb9f40) · `agents/stories/HANDOVER.md` |
| 05:45:38 | +2 min 43 s | ✍️ stories@ #2 | hand-over | the second session takes over: its key; the first's entry marked handed over | [`195021d6`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/195021d6) · `data/keys.json` |
| 06:52:23 | +1 h 6 min | ✍️ stories@ #2 | read | re-check on the 06:25 read: IPMA's red rain and red wind for Lisbon unchanged; Open-Meteo's values moved, one sentence retold | [`f7d8754e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/f7d8754e) |
| 07:16:30 | +24 min 7 s | ⚠️ IPMA | publish | IPMA lowers Lisbon's wind warning to orange; the red rain stands (path 6) | `s-1111T0738` |
| 07:53:22 | +36 min 52 s | ✍️ stories@ #2 | correct | "The top of the story changed": the standfirst now carries IPMA's 07:16 message (two claims added, six changed); five stories retold in one commit | [`ebaf7d27`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ebaf7d27) |
| 07:59:18 | +5 min 56 s | ✍️ stories@ #3 | write | the box at the top drawn from both of IPMA's channels, as the front page draws it (a third session since 07:55) | [`165b8e22`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/165b8e22) |
| 08:52:00 | +52 min 42 s | ✍️ stories@ #3 | read | retold on the 08:45 read: IPMA's open data caught up with its 07:16 message after 66 to 88 minutes; a hand-over note for a fourth session | [`f2141f13`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/f2141f13) |
| 09:31:47 | +39 min 47 s | ✍️ stories@ #4 | read | the first read after the warning windows opened at 09:00: one measurement inside them (the airport at 09:00, 20 km/h, no gust) | [`ad201e2e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ad201e2e) |
| 09:56:35 | +24 min 48 s | ✍️ stories@ #4 | correct | the thirteenth telling: the press on the lowered warning and "two centres" (evidence); the meteorologist's 09:25 reading, which supersedes 02:35, as hypothesis h6. 33 claims; state: developing | [`05777613`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/05777613) · `stories/less-wind-for-lisbon/story.json` |

From the first step to the last: 7 h 41 min.

## The pauses

- 03:00:50 → 04:28:09 (1 h 27 min): the hourly wake: the story waits for new data
- 04:28:09 → 05:28:17 (1 h 0 min): the hourly wake
- 05:45:38 → 06:52:23 (1 h 6 min): the hourly wake
- 07:16:30 → 07:53:22 (36 min 52 s): the message reaches the timeline at 07:38; the story follows the row, not the feed
- 07:59:18 → 08:52:00 (52 min 42 s): the same session writes a sixth story, What nobody has said yet (03ee9bf0, 08:02)
- 08:52:00 → 09:31:47 (39 min 47 s): the hourly wake

Between tellings the story waits for the data, not for a person: each hourly wake re-reads, and a telling is written only when something moved (twice nothing did, and the record says so).

## What this shows

- A story here is a data structure first: claims, each labelled fact, evidence or hypothesis, each with a support; the page is made from it, and every change is a dated entry in its own record.
- The story was kept true by the agents talking through the record: the story's note that an input moved led to the meteorologist's re-weighing within minutes, and the question in the title got its honest answer (not supported) at 02:36.
- Four sessions held it in seven and a half hours; the story did not notice: each new session read HANDOVER.md and kept the same record going.

## Reading it (the storyteller's)

Dinis's sentence was a hunch of the press ("might not hit Lisbon as hard"). The story did not adopt it: it kept the press's line as evidence, IPMA's warnings as fact and the meteorologist's view as hypothesis, and let them disagree in the open until IPMA itself lowered the wind warning at 07:16.

The meteorologist works in the other repository; its answers arrive here as the conductor's syncs. In the cast it is drawn as an agent with no key of its own here.

## Rests on

- stories/less-wind-for-lisbon/story.json: `record` (13 entries, 02:25 to 09:56), `claims` (33)
- BRIEF.md, "Dinis, 11 November 2026, ~02:20 UTC" (the Stories line), committed in 9d3a54ca
- commits e96857b6, d2a58320, fa8134dd, 10d91459, 67dc6d68, a12191d2, a2af4fe4, 787075c0, 4adb9f40, 195021d6, f7d8754e, ebaf7d27, 165b8e22, f2141f13, ad201e2e, 05777613
- data/keys.json: incident-stories-dinis to -4
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time marked approximate is the storyteller's placing between two timed steps.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
