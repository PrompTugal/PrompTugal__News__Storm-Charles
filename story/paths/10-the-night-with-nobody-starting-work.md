> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:29 UTC. Made by `story/make-paths.mjs` from [10-the-night-with-nobody-starting-work.json](10-the-night-with-nobody-starting-work.json) (the data incident.motion@ animates).

# Path 10: The night with nobody starting work

*Chosen by the storyteller for the arc. 11 November, 02:49 to 09:36 UTC: six hours and forty minutes without a word from Dinis.*

Dinis's last direction of the night was written down at 02:49. He spoke next at about 09:28. In between, no person started anything: no new agent arrived after 03:03, and every session that worked was woken by its clock or started by the conductor to hand over. The team still made 400 commits from 03:00 to 08:59 (by 21 to 27 agents an hour), handed over more than thirty sessions, met an outage (the model account out of credit from 02:53), took a decision it could not wait on (a hold on reading Web Summit's site, 05:27) and carried IPMA's 07:16 downgrade to the front page with nobody asking (path 6). At 09:35, the first new agent in six and a half hours.

**Cast:** 🧑 Dinis Cruz · 🎼 conductor@ · ⏰ the clock (the scheduler) · 👥 shadow@ #1 · 🎙️ reporter@ #1 · 🗞️ journalist@ #1 · 🧭 sources@ #1 · 📌 board@ #1 · 🗄️ archivist@ #1 · 🧮 accountant@ #2 · ⚠️ IPMA · 🔭 observability@ #4 · ✉️ envoy@ #1 · 🔎 perplexity@ #1 · 📡 ipma@ #2

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| 02:49:18 |  | 🧑 Dinis Cruz → 🎼 conductor@ | instruct | his direction of ~02:50, written into BRIEF.md: 20 dollars a day for models; a Perplexity agent, an accountant, a reporter and a journalist on the project itself. His last word for six hours and forty minutes | [`ab8008ef`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/ab8008ef) · `BRIEF.md` |
| 02:55:21 | +6 min 3 s | 👥 shadow@ #1 | correct | the model provider's account is out of credit (the first refusal an agent timed: 02:53:57): shadow-ask stops at the first refusal and records the pause for that hour. Models stop; nothing else does | [`2bbee526`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/2bbee526) · `reporter/traces/outage-the-model-account-out-of-credit.json` |
| 03:03:02 | +7 min 41 s | 🎙️ reporter@ #1 | commit | the last new agent of the night makes its first commit (the reporter, one of the four of 02:50). After this, no agent arrives until 09:35 | [`4b5a93ac`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/4b5a93ac) |
| 04:09:15 | +1 h 6 min | 🗞️ journalist@ #1 | hand-over | the first hand-overs on the conductor's word: the journalist's first session gives way to a second at 04:09 (the conductor's word 04:08); the reporter and the librarian in the same minutes | [`0fb17c3a`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0fb17c3a) |
| 05:26:17 | +1 h 17 min | 🧭 sources@ #1 | ask | on its hourly round of each source's terms: Web Summit's forbid automated access, archiving and summarising; it stops its own requests and puts the choice to Dinis | [`dd54ba38`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/dd54ba38) |
| 05:27:46 | +1 min 29 s | 🔎 perplexity@ #1 | correct | a decision without Dinis, carried out: the conductor's interim hold on every automated read of websummit.com (the conductor made no commit for it; the card's time is 05:27): the checker stops requesting it, capture asks withdrawn | [`879d9d4c`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/879d9d4c) · `reporter/traces/decision-web-summit-terms-to-a-hold.json` |
| 05:27:55 | +9 s | 📌 board@ #1 | ask | the hold and Web Summit's terms as a card for Dinis, second on his list | [`c82743ca`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/c82743ca) · `board/items/a-websummit-terms.json` |
| 05:28:07 | +12 s | 🗄️ archivist@ #1 | correct | no further read of websummit.com; its captures kept privately and not shown | [`96b55927`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/96b55927) |
| 05:45:10 | +17 min 3 s | 📡 ipma@ #2 | hand-over | the hand-over wave: between 05:41 and 05:48 seven roles pass to a second session, each started by the conductor (accountant 8ca902eb, social 4561b70e, ipma 07644dc0, stories 195021d6, board f5e0c8df, identity 8f8b2e85, ci 167083f0); the 05:00 hour has the most hand-over commits of the night | [`07644dc0`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/07644dc0) |
| 07:16:30 | +1 h 31 min | ⚠️ IPMA | publish | IPMA lowers Lisbon's wind warning; the site follows in 22 to 37 minutes with nobody asking (path 6) | `s-1111T0738` |
| 09:29:08 | +2 h 12 min | 🔭 observability@ #4 | write | Dinis speaks again, in observability's session (about 09:28; path 7): the page-views vault made at his word | [`18d9f8aa`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/18d9f8aa) |
| 09:35:57 | +6 min 49 s | ✉️ envoy@ #1 | commit | the first new agent since 03:03: the envoy, at Dinis's word (the conductor's 77d28513 at 09:34) | [`8d1efd8e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/8d1efd8e) |

From the first step to the last: 6 h 46 min.

## The pauses

- 03:03:02 → 04:09:15 (1 h 6 min): the agents' hourly clocks: each wakes at its own minute, reads, writes, pushes
- 04:09:15 → 05:26:17 (1 h 17 min): hourly wakes
- 05:45:10 → 07:16:30 (1 h 31 min): the quietest hour of the night: 39 commits from 06:00 to 06:59
- 07:16:30 → 09:29:08 (2 h 12 min): the morning: the hourly wakes go on; the 08:00 hour is the cheapest yet at 171,681 tokens a call (the accountant, cbfb680c)

This path is mostly pause, and that is its point: the long gaps between the steps drawn here are full of other agents' hourly wakes (400 commits from 03:00 to 08:59), none of them started by a person. Counts per hour, from git: 03:00 123 commits by 27 agents; 04:00 67 by 21; 05:00 82 by 24; 06:00 39 by 21; 07:00 41 by 21; 08:00 48 by 21.

## What this shows

- The team ran itself for six hours and forty minutes: clocks woke the agents, the conductor started fresh sessions as contexts filled, and the record shows no person starting any work in that time.
- Where only Dinis could decide, the team took the cautious default and said so (the Web Summit hold, a card for him) instead of waiting or guessing; where nobody needed to decide (IPMA's downgrade), the site simply followed the source.
- An outage stopped exactly what depended on it (model calls) and nothing else; three desks recorded their empty hours instead of filling them.

## Reading it (the storyteller's)

"Nobody starting work" is read from the record: every commit of the night belongs to a session woken by its schedule (library/pack/wakes.json lists the hourly wakes) or started by the conductor to hand over. The conductor's own session is the one constant; it does not hand over in the record (the reporter's memory trace: it compacts).

The counts per hour are the storyteller's, from git: a commit is counted by its Agent: trailer, or by the subject's prefix before trailers were used.

## Rests on

- BRIEF.md, "~02:50 UTC" (ab8008ef) and "~09:30 UTC" (84158ea2)
- reporter/traces/outage-the-model-account-out-of-credit.json; reporter/traces/decision-web-summit-terms-to-a-hold.json; reporter/traces/memory-the-librarian-saves-tokens.json
- commits ab8008ef, 2bbee526, 4b5a93ac, 0fb17c3a, dd54ba38, 879d9d4c, c82743ca, 96b55927, 8ca902eb, 4561b70e, 07644dc0, 195021d6, f5e0c8df, 8f8b2e85, 167083f0, cbfb680c, 18d9f8aa, 77d28513, 8d1efd8e
- git log, commits per hour (counted by the storyteller); data/keys.json (the sessions and their status)
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time with ~ is placed by the storyteller (the step's `placed` field says why), drawn dashed by motion@.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
