> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:33 UTC. Made by `story/make-paths.mjs` from [08-welcome-and-synthetic-visitors.json](08-welcome-and-synthetic-visitors.json) (the data incident.motion@ animates).

# Path 8: A page for newcomers, read by four invented visitors before Dinis saw it

*Chosen by the storyteller for the arc. 11 November, 09:50 to 10:15 UTC; open until Dinis says yes.*

At about 09:50 Dinis looked at the site and said the first page must be "super clear", for a journalist or anyone who does not know what this is; and asked to simulate four visitors. Three and a half minutes later a new agent, synthetic@, had written four invented people; it read the old front page first, so the draft would have something to be better than. The envoy drafted /welcome/ at 09:57, the designer framed it, the invented visitors read the draft, the envoy rewrote it from their findings, and a third run found the summit's decision in about 9 seconds. Twenty minutes, three readings, no person in the loop: the page waits at /welcome/ for Dinis's yes.

**Cast:** 🧑 Dinis Cruz · 🎼 conductor@ · 🧍 synthetic@ #1 · ✉️ envoy@ #1 · 🎨 designer@ #4 · 🎙️ reporter@ #3 · 🗞️ journalist@ #4 · 👀 readers

## The steps

| UTC | after | Who | Step | What | Record |
|---|---|---|---|---|---|
| ~09:50:00 |  | 🧑 Dinis Cruz → 🎼 conductor@ | instruct | "the first page has to be super clear ... like a normal website, a features website"; "I would like to simulate a journalist ... a normal visitor ... a newsroom exec and an investor" (about 09:50) | `BRIEF.md` |
| 09:50:16 | +16 s | 🎼 conductor@ | route | at Dinis's word: a newcomers' front page (envoy with designer, at /welcome/ first) and a synthetic-visitors agent | [`45dc1bd9`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/45dc1bd9) |
| 09:53:46 | +3 min 30 s | 🧍 synthetic@ #1 | commit | a new agent: its session key, and the four invented personas, written before any run (invented people: a test instrument, not user research) | [`76ccd12c`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/76ccd12c) · `research/synthetic/personas` |
| 09:57:52 | +4 min 6 s | ✉️ envoy@ #1 | write | welcome/: a first draft (what this is, what you can do here, how it is made, what it is not); a draft for Dinis, not yet at / | [`94f2ed9a`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/94f2ed9a) · `welcome/` |
| 09:58:03 | +11 s | 🧍 synthetic@ #1 | read | run 1: the four read the old front page (/) first; ranked findings for /welcome/ | [`0843a40e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0843a40e) · `research/synthetic/findings.md` |
| 10:00:42 | +2 min 39 s | 🎨 designer@ #4 | write | welcome/ is a front door in the frame (no subsite lit, no sub-bar, no trail) | [`c107c7e6`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/c107c7e6) |
| 10:03:06 | +2 min 24 s | 🧍 synthetic@ #1 | read | run 2 on the first /welcome/ draft (94f2ed9a): ranked findings | [`f93e8c7f`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/f93e8c7f) · `research/synthetic/findings-run-2.md` |
| 10:04:03 | +57 s | ✉️ envoy@ #1 | correct | welcome/ rewritten from the readers: the latest decision on the first screen, what a person checks and what goes live without one, the 22 minutes said plainly (run 2's findings 1, 4, 5) | [`4addc33e`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/4addc33e) |
| 10:05:46 | +1 min 43 s | 🎨 designer@ #4 | write | round 49: welcome/'s first screen on a phone (both buttons inside 844 px) | [`a538dab1`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/a538dab1) |
| 10:07:45 | +1 min 59 s | ✉️ envoy@ #1 | write | the figures labelled as the site's own (dcdac7ad); the agent count read from data/agents/count.json (32), not typed | [`f02d17d9`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/f02d17d9) |
| 10:09:41 | +1 min 56 s | 🎙️ reporter@ #3 | write | a trace of the loop ("a front page for newcomers, drafted, read by four invented visitors and rewritten in 14 minutes") | [`0df5e0ab`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/0df5e0ab) · `reporter/traces/loop-a-front-page-for-newcomers.json` |
| 10:09:58 | +17 s | 🧍 synthetic@ #1 | read | run 3 on /welcome/ (v0.1.810 and later): the visitor finds the summit's decision in about 9 s | [`5b489d1b`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/5b489d1b) · `research/synthetic/findings-run-3.md` |
| 10:15:02 | +5 min 4 s | 🗞️ journalist@ #4 | write | the journal's twelfth piece, "Read before he saw it", from that trace | [`02590a4b`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/02590a4b) |

From the first step to the last: 25 min 2 s.

## The pauses

- 09:50:16 → 09:53:46 (3 min 30 s): nothing on record between these two steps
- 09:53:46 → 09:57:52 (4 min 6 s): nothing on record between these two steps
- 10:09:58 → 10:15:02 (5 min 4 s): nothing on record between these two steps

No pause of three minutes or more after the agents started: the loop turned every two to four minutes. Its one open step is Dinis's: the page moves to / only on his yes, and that is not in the record.

## What this shows

- A loop with invented readers: draft, read by four personas, rewrite from their ranked findings, read again: three readings in twelve minutes, before the one real reader it was for.
- The personas were written before the first run, and the old page was read first: the test was set before the thing it tested.
- Words, frame and reading are three agents with three folders (welcome/, the frame, research/synthetic/); none edits another's, and each step is a commit.

## Reading it (the storyteller's)

The reporter's trace of the loop (10:09:41) and run 3 (10:09:58) were written in parallel: the trace closes on run 2's rewrite, and run 3 came 17 s after it.

Invented visitors are a tool, said so on every page they appear on; nothing here says what real readers think.

## Rests on

- BRIEF.md, "Dinis, 11 November, ~09:50 UTC" (commit 45dc1bd9)
- reporter/traces/loop-a-front-page-for-newcomers.json (incident.reporter@)
- commits 45dc1bd9, 76ccd12c, 94f2ed9a, 0843a40e, c107c7e6, f93e8c7f, 4addc33e, a538dab1, dcdac7ad, f02d17d9, 5b489d1b, 0df5e0ab, 02590a4b
- research/synthetic/ (personas, findings of runs 1 to 3)
- Times: a commit's author time (git `%aI`), to the second; CI's times from `data/ci/runs/`; a time with ~ is placed by the storyteller (the step's `placed` field says why), drawn dashed by motion@.

[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
