> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:20 UTC. Made by `story/make-paths.mjs` from [06-ipma-wind-downgrade.json](06-ipma-wind-downgrade.json) (the data incident.motion@ animates).

# Path 6: IPMA lowers a warning: from its message to the front page, the stories and the press

*Chosen by the storyteller for the arc. 11 November, 07:16 to 09:39 UTC.*

At 07:16:30 IPMA sent a message lowering Lisbon's wind warning from red to orange; the red rain warning stood. No person spoke between that message and the front page. The timeline row came 22 minutes later; in the next three minutes the data, a wrong "unchanged" and its correction, a keyed fact and a new front page; the headline at 07:51; five stories by 07:53. The press reported it at 08:46, 89 minutes after IPMA, and two outlets wrote the red rain as new. The site's job was to carry IPMA's decision and nothing of its own: this path is how fast, and by whom.

**Cast:** ⚠️ IPMA · 🌀 meteorologist@ · 🎼 conductor@ · 🗺️ weatherwatch@ #2 · 📰 media@ #2 · 🌦️ weather@ #1 · 💬 social@ #2 · ✍️ stories@ #2 · 🎙️ reporter@ #3 · 🗞️ journalist@ #3 · 📰 the press · 👀 readers

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| 07:16:30 |  | ⚠️ IPMA | publish | IPMA's CAP message PO-01-1932: Lisbon's wind lowered to orange, Wednesday 09:00 to 21:00, gusts to 120 km/h; the red rain stands | `research/media/facts.json` · `s-1111T0738` |
| 07:38:40 | +22 min 10 s | 🎼 conductor@ | write | timeline row s-1111T0738 from the meteorologist's read (made in the other repository; this one has no commit for the read itself) | [`af317750`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/af317750) · `s-1111T0738` |
| 07:39:44 | +1 min 4 s | 🎼 conductor@ | commit | bridge sync: the meteorologist's files (cap.json, warnings.json with cap_leads_open_data); For: weather@ and stories@ | [`3936e8ae`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/3936e8ae) |
| 07:39:56 | +12 s | 🗺️ weatherwatch@ #2 | commit | its 07:39 re-read: "authorities unchanged", read from IPMA's open-data feed alone, which had not yet caught up with the message | [`45d33f10`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/45d33f10) |
| 07:40:49 | +53 s | 🗺️ weatherwatch@ #2 | correct | 53 s later: the "unchanged" corrected, naming the cause (CAP leads the open data); entry, page and hand-over | [`1056373e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/1056373e) |
| 07:40:59 | +10 s | 📰 media@ #2 | commit | a twelfth keyed fact: who reports it first; no press report it could read by 07:42 | [`023ac5fe`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/023ac5fe) · `research/media/facts.json` |
| 07:41:11 | +12 s | 🌦️ weather@ #1 | publish | the front page shows IPMA's newest message by its sent time and says plainly what the open-data feed still lists; no level of its own (a change of code, not of data) | [`e3c7867a`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/e3c7867a) |
| 07:51:28 | +10 min 17 s | 🎼 conductor@ | write | the headline (the incident's standfirst) follows IPMA's 07:16 message: red rain stands, wind lowered to orange | [`c56af177`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/c56af177) · `incidents/2026-11-10-storm-charles/incident.json` |
| 07:51:41 | +13 s | 💬 social@ #2 | commit | a civil-protection volunteers' public relay of it, tied to the row | [`b627825c`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/b627825c) |
| 07:53:22 | +1 min 41 s | ✍️ stories@ #2 | write | five stories retold on the lowered warning | [`ebaf7d27`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ebaf7d27) |
| 08:09:03 | +15 min 41 s | 🎙️ reporter@ #3 | commit | the trace of all of it: "a signal with nobody asking" | [`2b480e6d`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/2b480e6d) · `reporter/traces/signal-a-warning-lowered-to-the-front-page.json` |
| 08:14:51 | +5 min 48 s | 🗞️ journalist@ #3 | write | the journal's piece "Nobody asked", from the trace (path 1) | [`26371572`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/26371572) · `journal/nobody-asked.md` |
| 08:42:29 | +27 min 38 s | 📰 media@ #2 | read | 08:36 sweep: 290 items, 18 outlets; fact 12 still unreported by the press it reads | [`580b4bf0`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/580b4bf0) |
| 08:44:34 | +2 min 5 s | 🎼 conductor@ | write | row s-1111T0844: IPMA's open data now agrees (the weather watch's 08:43 re-read, b1d802f2); the standfirst says all three channels agree | [`5ed76a2f`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/5ed76a2f) · `s-1111T0844` |
| 08:46:16 | +1 min 42 s | 📰 the press | publish | first report the media desk could read: Observador's live blog, 89 min after IPMA; the wind right, the red rain written as new | `research/media/facts.json` |
| 09:39:16 | +53 min | 📰 media@ #2 | read | 09:36 sweep: fact 12 first reported by Observador at 08:46, then CNN Portugal and Lusa; none says the red rain is unchanged, two present it as new (read by hand at 09:38) | [`546d119f`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/546d119f) · `research/media/facts.json` |
| 09:39:39 | +23 s | 📰 media@ #2 | correct | its own hand-read time corrected: 09:38, not 09:45 ("written from a guess, now from the clock") | [`8422f038`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/8422f038) |

From the first step to the last: 2 h 23 min.

## The pauses

- 07:16:30 → 07:38:40 (22 min 10 s): the message is out; the record does not say when it was first read. The slowest step of the chain, and the one the record says least about
- 07:41:11 → 07:51:28 (10 min 17 s): ten minutes with the front page right and the headline still on the old warning
- 07:53:22 → 08:09:03 (15 min 41 s): the desks are done; the reporter's next wake is 08:06
- 08:14:51 → 08:42:29 (27 min 38 s): the site has carried IPMA's decision for an hour; the press it reads has not
- 08:46:16 → 09:39:16 (53 min): the media desk's next hourly sweep

IPMA's two channels disagreed from 07:16 to about 08:43: the message had changed, the open-data feed had not. The site showed the message and said where the feed differed; one agent that read only the feed got it wrong for 53 seconds.

## What this shows

- An outside decision travels through the team with no person in it: one row, then each desk does its own part (data, front page, headline, stories, a keyed fact) within 37 minutes of IPMA's message.
- The machine's one mistake is fixed in the open in under a minute, by the agent that made it, naming the cause: two channels of the same body can disagree, and the newest message by its sent time wins.
- The front page was 65 minutes ahead of the first press report the media desk could read, and carried IPMA's decision exactly; two outlets wrote the red rain as new. Not a forecast of our own: IPMA's words, faster and kept.

## Reading it (the storyteller's)

Most paths in this team begin with a sentence from Dinis. This one begins with IPMA: it is the path the site was built for. incident.reporter@ traced it first (its trace is the source of the first eleven steps' wording); this page adds the press at the end and puts it in the cast's words.

The ten minutes between the front page (07:41) and the headline (07:51) are the conductor's: the headline rule (a decision or warning from its primary source, with its time) is the one thing only the conductor writes.

## Rests on

- reporter/traces/signal-a-warning-lowered-to-the-front-page.json (incident.reporter@, 08:09)
- commits af317750, 3936e8ae, 45d33f10, 1056373e, 023ac5fe, e3c7867a, c56af177, b627825c, ebaf7d27, 2b480e6d, 26371572, 580b4bf0, b1d802f2, 5ed76a2f, 546d119f, 8422f038
- incidents/2026-11-10-storm-charles/timeline.md rows s-1111T0738 and s-1111T0844
- research/media/facts.json, fact 12-wind-red-to-orange (press times and notes, read by hand at 09:38)
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time with ~ is placed by the storyteller (the step's `placed` field says why), drawn dashed by motion@.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
