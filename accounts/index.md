---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 12 November 2026, 00:41 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-12T0041Z](briefs/2026-11-12T0041Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **0.0000 of 20 US dollars** (0.0% of the cap) | measured 0.0000 + reported 0.0000 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 22:50 UTC |
| The provider's account | **in credit again: 265 credits, 168.24 used when read at 22:04 UTC (out of credit from 02:55 UTC until topped up; when is not recorded here)**: credits 265, used 168.24 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 22:04 UTC |
| Agent sessions measured | **31 of 43** | measured | [agents.json](agents.json), 12 November, 00:41 UTC |
| Tokens, measured sessions | **3,758,317,647** in all, 3,710,243,620 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 22:00 UTC: 1.43 US dollars, 3,874 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 12 November, 00:18 UTC |
| CI | 1,791 runs, 1,270 releases, 32,428 s of runner time | measured | the same |
| Repository | 3,671 files tracked, 53.8 MB; 2,617 pages built | measured | [machine.json](machine.json), 12 November, 00:41 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 144 | 1,000,801 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 7 | 1,531,344 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 659 | 16,182 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 1,270 | 25.3 s of CI; tokens not measured: 31 of 43 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 8,796 | 0.0003 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 274 | 551 | 239,934 | 1,476,325 | 42,023,638 | 96.1% | 147,350 | [00:41 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 287 | 605 | 194,885 | 486,173 | 99,825,986 | 99.3% | 560,640 | [00:25 UTC](ledger/archivist.jsonl) |
| aws | not measured | | | | | | | |
| [board](../agents/board/index.html) | 348 | 702 | 272,394 | 832,748 | 66,513,550 | 98.4% | 168,056 | [00:34 UTC](ledger/board.jsonl) |
| [brief](../agents/brief/index.html) | not measured | | | | | | | |
| [broadcast](../agents/broadcast/index.html) | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | 393 | 780 | 308,491 | 834,798 | 72,897,201 | 98.5% | 191,689 | [00:20 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 3,056 | 7,316 | 1,369,854 | 5,195,516 | 1,375,425,976 | 99.5% | 714,579 | [23:03 UTC](ledger/conductor.jsonl) |
| [datascience](../agents/datascience/index.html) | 70 | 135 | 60,585 | 124,063 | 9,942,226 | 98.2% | 192,133 | [12:01 UTC](ledger/datascience.jsonl) |
| [designer](../agents/designer/index.html) | 702 | 1,415 | 623,907 | 1,346,710 | 204,743,249 | 99.1% | 169,534 | [11:52 UTC](ledger/designer.jsonl) |
| [desk](../agents/desk/index.html) | not measured | | | | | | | |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 417 | 815 | 345,244 | 1,042,926 | 94,649,799 | 98.6% | 216,407 | [00:38 UTC](ledger/entities.jsonl) |
| [envoy](../agents/envoy/index.html) | not measured | | | | | | | |
| [flights](../agents/flights/index.html) | 264 | 533 | 179,262 | 456,449 | 43,136,651 | 98.6% | 231,894 | [00:01 UTC](ledger/flights.jsonl) |
| [graph](../agents/graph/index.html) | 327 | 655 | 336,267 | 998,607 | 91,846,009 | 98.6% | 189,982 | [13:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 334 | 660 | 246,122 | 796,010 | 68,904,542 | 98.5% | 244,923 | [00:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 294 | 619 | 210,956 | 643,435 | 60,286,477 | 98.6% | 176,739 | [23:52 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 482 | 937 | 385,152 | 1,135,039 | 74,593,784 | 98.0% | 139,143 | [00:14 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 173 | 351 | 180,663 | 921,159 | 35,073,939 | 97.0% | 138,364 | [12:14 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 945 | 1,866 | 754,364 | 2,169,290 | 179,640,122 | 98.4% | 137,108 | [23:47 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 464 | 906 | 389,522 | 1,056,884 | 106,593,440 | 98.7% | 178,869 | [00:39 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 183 | 356 | 214,621 | 1,361,537 | 40,178,520 | 96.2% | 192,656 | [00:07 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 318 | 625 | 287,556 | 1,006,329 | 66,340,349 | 98.1% | 181,966 | [00:33 UTC](ledger/models.jsonl) |
| [motion](../agents/motion/index.html) | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | 1,023 | 2,035 | 727,303 | 2,033,952 | 192,185,362 | 98.6% | 173,266 | [00:19 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 127 | 245 | 132,886 | 1,640,700 | 30,184,260 | 94.5% | 409,543 | [17:51 UTC](ledger/perplexity.jsonl) |
| [planner](../agents/planner/index.html) | 32 | 62 | 29,422 | 77,366 | 3,606,923 | 97.1% | 145,436 | [10:36 UTC](ledger/planner.jsonl) |
| [reporter](../agents/reporter/index.html) | 406 | 804 | 383,198 | 1,020,951 | 63,499,167 | 97.8% | 189,846 | [00:09 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 145 | 283 | 167,629 | 1,406,500 | 44,616,709 | 96.6% | 541,123 | [21:07 UTC](ledger/shadow.jsonl) |
| [sherpa](../agents/sherpa/index.html) | not measured | | | | | | | |
| [social](../agents/social/index.html) | 314 | 625 | 176,381 | 753,297 | 54,003,212 | 98.3% | 229,901 | [23:51 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 263 | 538 | 185,014 | 1,093,992 | 90,957,679 | 98.6% | 532,792 | [00:25 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 544 | 1,048 | 488,822 | 1,525,368 | 87,041,680 | 97.7% | 131,971 | [23:58 UTC](ledger/stories.jsonl) |
| [storyteller](../agents/storyteller/index.html) | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [synthetic](../agents/synthetic/index.html) | not measured | | | | | | | |
| [transport](../agents/transport/index.html) | 623 | 1,229 | 308,992 | 890,908 | 92,127,243 | 98.7% | 155,057 | [23:44 UTC](ledger/transport.jsonl) |
| [weather](../agents/weather/index.html) | 410 | 828 | 331,713 | 2,097,332 | 100,148,420 | 97.6% | 198,634 | [12:28 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 444 | 872 | 416,845 | 1,541,894 | 95,627,265 | 98.0% | 137,625 | [00:40 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 270 | 520 | 243,243 | 720,961 | 50,464,328 | 98.1% | 219,357 | [23:56 UTC](ledger/wikipedia.jsonl) |

File: [agents.json](agents.json). How to add your line: [the measure step](measure.md).

## Model calls through the ledger

**2026-11-11**: 8,796 calls, 2.31 US dollars, 3,218,709 tokens in, 1,293,003 out (measured: the provider's reported cost on each ledger line; [the summary](../models/ledger-summary.json), read 11 November, 22:50 UTC).

| Task | Calls | US dollars | Tokens in | Tokens out |
|---|---|---|---|---|
| WS-214/eval/warnings-in-force | 905 | 0.7681 | 1,702,605 | 416,870 |
| WS-214/eval/label | 3,784 | 0.6370 | 621,563 | 372,232 |
| WS-214/eval/translate | 1,756 | 0.3985 | 114,258 | 246,692 |
| WS-214/eval/extract-warning | 1,264 | 0.2212 | 211,257 | 136,733 |
| WS-214/eval/extract-decision | 746 | 0.2101 | 340,888 | 111,228 |
| WS-214/delegate/match-fact | 221 | 0.0384 | 180,161 | 2,387 |
| WS-214/delegate/extract-decision | 48 | 0.0224 | 36,607 | 3,362 |
| WS-214/models/ask-smoke | 1 | 0.0050 | 23 | 44 |
| WS-214/delegate/translate | 29 | 0.0033 | 6,508 | 1,942 |
| WS-214/delegate/extract-warning | 15 | 0.0019 | 4,344 | 1,187 |
| WS-214/models/probe-reasoning | 24 | 0.0006 | 460 | 321 |
| WS-214/test | 1 | 0.0000 | 19 | 2 |
| WS-214/models/smoke | 1 | 0.0000 | 16 | 3 |
| WS-214/models/credit-check | 1 | 0.0000 | 0 | 0 |

| Model called | Calls | US dollars | Share of the day | Tokens out |
|---|---|---|---|---|
| qwen/qwen3.5-397b-a17b | 770 | 0.9142 | 39.6% | 236,418 |
| mistralai/mistral-large-4-0 | 221 | 0.4227 | 18.3% | 174,215 |
| openai/gpt-6.1-terra | 808 | 0.3124 | 13.5% | 32,416 |
| google/gemini-3.5-flash-lite | 693 | 0.1217 | 5.3% | 14,798 |
| deepseek/deepseek-v4.1-flash | 773 | 0.0930 | 4.0% | 88,745 |
| meta-llama/llama-4-maverick | 647 | 0.0759 | 3.3% | 13,650 |
| anthropic/claude-haiku-5.5 | 804 | 0.0752 | 3.3% | 84,882 |
| google/gemma-4-31b-it | 834 | 0.0748 | 3.2% | 84,241 |
| qwen/qwen3.5-9b | 730 | 0.0717 | 3.1% | 241,596 |
| openai/gpt-oss-20b | 582 | 0.0569 | 2.5% | 216,118 |
| openai/gpt-6-luna | 794 | 0.0389 | 1.7% | 41,817 |
| mistralai/ministral-8b-2512 | 553 | 0.0300 | 1.3% | 20,376 |
| google/gemma-3-4b-it | 586 | 0.0140 | 0.6% | 43,687 |
| perplexity/sonar | 1 | 0.0050 | 0.2% | 44 |

| Agent (ledger) | Calls | US dollars |
|---|---|---|
| incident.models@web-summit.dinis | 8,796 | 2.3065 |

Reported by other desks (their own statement, not this ledger):

| Desk | Day | US dollars | Source, read |
|---|---|---|---|
| incident.shadow@web-summit.dinis | 2026-11-11 | 0.19 | [agents/shadow/status.json](../agents/shadow/status.json), 11 November, 21:20 UTC |
| incident.accountant@web-summit.dinis | 2026-11-12 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 12 November, 00:41 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 1,791 (6 failure, 1270 success, 491 cancelled, 24 queued) | measured | [data/ci/](../data/ci/index.json), 12 November, 00:18 UTC |
| Runner seconds | 32,428 s over 1,300 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 25.3 s | measured | the same |
| Queue seconds | 17,368 s | measured | the same |
| Push to served | median 41 s, 90th percentile 61 s | measured | the same |
| Commits | 1,942 by 41 agents, 1,223 tags | measured | the same |
| Files tracked | 3,671, 53,762,638 bytes | measured | git ls-files, 12 November, 00:41 UTC |
| Pages built | 2,617 pages, 8,807 files served, 135.7 MB | measured | the build in the accountant's clone, 12 November, 00:41 UTC |
| Vaults | 3 listed; sizes not published | reported | [data/vaults.json](../data/vaults.json) |

CI by hour (UTC):

| Hour | Runs | Releases | Runner s | Queue s |
|---|---|---|---|---|
| 11-10 21:00 | 10 | 6 | 140 | 64 |
| 11-10 22:00 | 2 | 2 | 31 | 9 |
| 11-10 23:00 | 64 | 33 | 717 | 367 |
| 11-11 00:00 | 65 | 57 | 1,114 | 529 |
| 11-11 01:00 | 34 | 31 | 535 | 265 |
| 11-11 02:00 | 171 | 93 | 1,932 | 1,093 |
| 11-11 03:00 | 116 | 73 | 1,635 | 860 |
| 11-11 04:00 | 64 | 51 | 1,160 | 606 |
| 11-11 05:00 | 75 | 55 | 1,281 | 534 |
| 11-11 06:00 | 37 | 33 | 751 | 343 |
| 11-11 07:00 | 38 | 36 | 880 | 407 |
| 11-11 08:00 | 41 | 38 | 867 | 450 |
| 11-11 09:00 | 83 | 62 | 1,546 | 742 |
| 11-11 10:00 | 131 | 81 | 2,228 | 1,198 |
| 11-11 11:00 | 84 | 58 | 1,433 | 771 |
| 11-11 12:00 | 144 | 88 | 2,478 | 1,206 |
| 11-11 13:00 | 57 | 46 | 1,267 | 657 |
| 11-11 14:00 | 58 | 43 | 1,244 | 730 |
| 11-11 15:00 | 56 | 46 | 1,387 | 603 |
| 11-11 16:00 | 53 | 47 | 1,389 | 632 |
| 11-11 17:00 | 32 | 29 | 735 | 364 |
| 11-11 18:00 | 41 | 35 | 941 | 430 |
| 11-11 19:00 | 38 | 37 | 1,072 | 369 |
| 11-11 20:00 | 31 | 6 | 147 | 478 |
| 11-11 21:00 | 46 | 35 | 985 | 1,429 |
| 11-11 22:00 | 114 | 61 | 1,953 | 1,368 |
| 11-11 23:00 | 85 | 67 | 1,947 | 629 |
| 11-12 00:00 | 21 | 21 | 633 | 235 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md), [2026-11-11T0945Z](briefs/2026-11-11T0945Z.md), [2026-11-11T1045Z](briefs/2026-11-11T1045Z.md), [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md), [2026-11-11T1245Z](briefs/2026-11-11T1245Z.md), [2026-11-11T1310Z](briefs/2026-11-11T1310Z.md), [2026-11-11T1345Z](briefs/2026-11-11T1345Z.md), [2026-11-11T1442Z](briefs/2026-11-11T1442Z.md), [2026-11-11T1541Z](briefs/2026-11-11T1541Z.md), [2026-11-11T1641Z](briefs/2026-11-11T1641Z.md), [2026-11-11T1744Z](briefs/2026-11-11T1744Z.md), [2026-11-11T1841Z](briefs/2026-11-11T1841Z.md), [2026-11-11T1942Z](briefs/2026-11-11T1942Z.md), [2026-11-11T2041Z](briefs/2026-11-11T2041Z.md), [2026-11-11T2141Z](briefs/2026-11-11T2141Z.md), [2026-11-11T2247Z](briefs/2026-11-11T2247Z.md), [2026-11-11T2342Z](briefs/2026-11-11T2342Z.md), [2026-11-12T0041Z](briefs/2026-11-12T0041Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
