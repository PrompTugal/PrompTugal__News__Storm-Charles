> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:24 UTC. Made by `story/make-paths.mjs` from [04-last-nights-data-source.json](04-last-nights-data-source.json) (the data incident.motion@ animates).

# Path 4: Last night's data source: IPMA's own messages, found through MeteoAlarm, published as cap.json

*Named by Dinis (BRIEF.md, ~10:10). 10 to 11 November, 21:23 to 08:26 UTC. Our reading of which source Dinis meant, to be confirmed by him.*

**Our reading, to be confirmed by Dinis:** neither the storyteller nor the conductor can place his words ("an agent needing a data source, then a researcher finding out, and then the website published a JSON file, and then I came along") with certainty; this is the best candidate in the record, the conductor's and ours. At 21:23 on Tuesday IPMA moved Lisbon's red rain warning to 09:00; the open-data feed the site read did not show it for about two and a half hours. The meteorologist found IPMA's own messages (CAP), with their send times, in MeteoAlarm's public feed; the conductor published them as cap.json at 23:53. Within ten minutes the weather watch checked MeteoAlarm's terms and found what was missing; the meteorologist added the link and disclaimer; the designer put MeteoAlarm's line in every page's footer. By morning cap.json was what the front page and the timeline read first. Where Dinis "came along" is not in the record we hold: that step is left open until he says.

**Cast:** ⚠️ IPMA · 🚨 MeteoAlarm · 🌀 meteorologist@ · 🔬 researcher@ · 🎼 conductor@ · 🗺️ weatherwatch@ #1 · 🎨 designer@ #1 · 🕸️ graph@ #1 · 🎬 studio@ #1 · 🧭 sources@ #1 · 🗄️ archivist@ #1 · 👀 readers · 🧑 Dinis Cruz

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| 21:23:00 |  | ⚠️ IPMA | publish | IPMA sends a CAP message: Lisbon's red rain moved to Wednesday 09:00 to 18:00 (was from 12:00). Its open-data feed, which the site's warnings were read from, does not show it yet (the minute as the meteorologist's status gives it) | `incidents/2026-11-10-storm-charles/data/weather/cap.json` |
| 23:51:47 | +2 h 28 min | 🌀 meteorologist@ → 🚨 MeteoAlarm | read | the need and the find: "open data lagged 2 h+"; IPMA's warnings for Lisbon read as CAP messages through MeteoAlarm's public feed (feeds.meteoalarm.org), each with sent_utc and the message it replaces (cap.json's read_utc). In the other repository; the conductor reports the meteorologist's commit there as 169445f, 23:52 | [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal) |
| 23:53:40 | +1 min 53 s | 🎼 conductor@ | publish | sync: cap.json published (283 lines) under the incident's data, so served at its path and at api/v1; row s-1110T2353 (the red rain at 09:00, read at source 23:53); the standfirst; IPMA's real issue times from CAP (red wind 07:18, 28.7 h ahead). For: the meteorologist and the designer | [`b3a1b25c`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/b3a1b25c) · `incidents/2026-11-10-storm-charles/data/weather/cap.json` · `s-1110T2353` |
| 23:54:04 | +24 s | 🕸️ graph@ #1 | write | the graph and its tables rebuilt on the 23:53 data (IPMA's red rain for Lisbon from 09:00) | [`2445ec18`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/2445ec18) |
| 23:58:51 | +4 min 47 s | 🗺️ weatherwatch@ #1 | ask | the check of our use of MeteoAlarm's feed against its terms: lacking a link, a disclaimer and the delay | [`0664a6ab`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0664a6ab) |
| 00:01:31 | +2 min 40 s | 🌀 meteorologist@ | answer | cap.json keeps every CAP message once seen (the feed drops superseded ones) and carries MeteoAlarm's link and disclaimer (the meteorologist's 8b70ee044, synced by the conductor) | [`98934af5`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/98934af5) |
| 00:01:49 | +18 s | 🎨 designer@ #1 | publish | design round 10: MeteoAlarm's link and disclaimer where its terms ask (the tiles, under them, the footer) | [`50f9e41f`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/50f9e41f) |
| 00:03:51 | +2 min 2 s | 🎨 designer@ #1 | publish | design round 11: MeteoAlarm's sentence and the dated-record line in every page's footer | [`d8da14f6`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/d8da14f6) |
| 00:54:27 | +50 min 36 s | 🎬 studio@ #1 | publish | the Studio's second animation, "How a fact gets onto this site", tells this case: IPMA's red rain moved to 09:00, sent 21:23, read 23:53 | [`2d433f4e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/2d433f4e) |
| 01:02:46 | +8 min 19 s | 🔬 researcher@ | correct | the researcher's corrected times synced (the conductor reports the researcher reading IPMA's own send times from CAP at 01:00, d6ce188 in the other repository) | [`2139a91d`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/2139a91d) |
| 02:21:37 | +1 h 18 min | 🧭 sources@ #1 | publish | MeteoAlarm gets its own section: API map, the Portugal feed browsed, a reader that keeps each read's sha256 and a diff (among an index of 46 bodies) | [`ec7471fc`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ec7471fc) |
| 02:29:34 | +7 min 57 s | 🗄️ archivist@ #1 | capture | Wayback for data: every feed that publishes reads.json indexed, MeteoAlarm's Portugal feed first | [`c8043014`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/c8043014) · `evidence/data.json` |
| 08:26:23 | +5 h 56 min | 🎼 conductor@ | write | the timeline tool counts MeteoAlarm's CAP feed (IPMA's own messages) as an official source, so a row read from it is a fact, not evidence. By then CAP had led the open data a second time, on the 07:16 wind change (path 6) | [`b00b2a13`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/b00b2a13) · `tools/timeline.mjs` |

From the first step to the last: 11 h 3 min.

## The pauses

- 21:23:00 → 23:51:47 (2 h 28 min): 2 h 28 min in which IPMA's message was out and the site's warnings did not have it
- 00:03:51 → 00:54:27 (50 min 36 s): the source is in place; the next fifty minutes are other work
- 01:02:46 → 02:21:37 (1 h 18 min): Dinis's 02:20 direction creates a desk per source body; MeteoAlarm is the first
- 02:29:34 → 08:26:23 (5 h 56 min): the night and the morning: cap.json is read on every sync

The pause that matters is the first: two and a half hours in which the warning existed and the site's feed did not have it. After the source was found the rest took ten minutes. Dinis's own step ("and then I came along") is not drawn: it has no time in the record we hold, and it waits for his word.

## What this shows

- A data source arrives because an agent notices a gap (two of IPMA's channels disagree), finds where the body's own words are published, and the site publishes them as a JSON with their read time, for people and agents alike.
- A new source brings its terms with it: within eight minutes another agent checked them, and within ten the link and disclaimer were on every page. Licence is part of the data.
- The find outlived the night: cap.json is what made the morning's wind downgrade (path 6) a fact on the site 22 minutes after IPMA sent it, while the open-data feed lagged again.

## Reading it (the storyteller's)

This path is labelled as our reading because Dinis's words name roles ("an agent", "a researcher") that fit two agents here: the meteorologist found the feed and the researcher read IPMA's send times from it an hour later. The conductor has asked Dinis; when he answers, this page will follow him.

Two of the hashes (169445f, d6ce188) are in the Web Summit site's repository, which this session cannot read; they are given as the conductor reported them. Every other step rests on a commit in this repository.

## Rests on

- commits b3a1b25c, 2445ec18, 0664a6ab, 98934af5, 50f9e41f, d8da14f6, 2d433f4e, 2139a91d, ec7471fc, c8043014, b00b2a13
- incidents/2026-11-10-storm-charles/data/weather/cap.json as committed in b3a1b25c (`about`, `source`, `read_utc` 23:51:47)
- agents/meteorologist/status.json as committed in b3a1b25c ("red rain moved to 09:00-18:00 (IPMA CAP sent 21:23; open data lagged 2 h+); CAP feed added")
- timeline row s-1110T2353; the conductor's message to the storyteller, 10:21 UTC (the candidate, and the other repository's hashes)
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time marked approximate is the storyteller's placing between two timed steps.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
