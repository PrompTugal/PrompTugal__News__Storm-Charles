---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 16:41 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T1641Z](briefs/2026-11-11T1641Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **30 of 41** | measured | [agents.json](agents.json), 11 November, 16:41 UTC |
| Tokens, measured sessions | **2,928,488,437** in all, 2,889,003,406 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 16:18 UTC |
| CI | 1,351 runs, 949 releases, 23,156 s of runner time | measured | the same |
| Repository | 3,145 files tracked, 31.0 MB; 2,449 pages built | measured | [machine.json](machine.json), 11 November, 16:41 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 121 | 859,821 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 7 | 1,195,923 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 619 | 14,009 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 949 | 24.1 s of CI; tokens not measured: 30 of 41 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 202 | 404 | 186,166 | 1,211,738 | 30,992,720 | 95.7% | 164,085 | [16:41 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 251 | 532 | 171,221 | 431,700 | 80,682,052 | 99.3% | 503,947 | [16:26 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 251 | 505 | 222,257 | 613,442 | 52,705,143 | 98.4% | 142,235 | [16:34 UTC](ledger/board.jsonl) |
| [brief](../agents/brief/index.html) | not measured | | | | | | | |
| [broadcast](../agents/broadcast/index.html) | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | 256 | 508 | 228,825 | 624,821 | 49,624,234 | 98.3% | 150,806 | [16:20 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 2,237 | 5,335 | 1,052,231 | 4,184,583 | 987,962,144 | 99.5% | 389,838 | [14:41 UTC](ledger/conductor.jsonl) |
| [datascience](../agents/datascience/index.html) | 70 | 135 | 60,585 | 124,063 | 9,942,226 | 98.2% | 192,133 | [12:01 UTC](ledger/datascience.jsonl) |
| [designer](../agents/designer/index.html) | 702 | 1,415 | 623,907 | 1,346,710 | 204,743,249 | 99.1% | 169,534 | [11:52 UTC](ledger/designer.jsonl) |
| [desk](../agents/desk/index.html) | not measured | | | | | | | |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 371 | 729 | 328,028 | 895,410 | 85,922,367 | 98.6% | 169,142 | [16:38 UTC](ledger/entities.jsonl) |
| [envoy](../agents/envoy/index.html) | not measured | | | | | | | |
| [graph](../agents/graph/index.html) | 327 | 655 | 336,267 | 998,607 | 91,846,009 | 98.6% | 189,982 | [13:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 247 | 486 | 202,627 | 691,709 | 51,862,814 | 98.3% | 137,962 | [16:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 243 | 510 | 199,576 | 600,544 | 52,377,069 | 98.5% | 132,690 | [15:52 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 393 | 764 | 345,770 | 1,016,446 | 62,873,570 | 97.9% | 121,320 | [16:15 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 173 | 351 | 180,663 | 921,159 | 35,073,939 | 97.0% | 138,364 | [12:14 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 707 | 1,399 | 609,683 | 1,767,589 | 149,244,520 | 98.4% | 128,025 | [15:45 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 361 | 705 | 332,681 | 761,457 | 89,895,465 | 98.8% | 210,978 | [16:39 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 158 | 309 | 201,173 | 1,006,752 | 36,047,402 | 96.8% | 163,713 | [14:42 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 103 | 203 | 150,143 | 654,032 | 27,862,641 | 97.2% | 403,575 | [09:31 UTC](ledger/models.jsonl) |
| [motion](../agents/motion/index.html) | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | 726 | 1,457 | 565,571 | 1,581,544 | 151,517,658 | 98.6% | 153,513 | [16:18 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 115 | 222 | 114,926 | 1,294,238 | 25,911,576 | 94.8% | 366,449 | [14:42 UTC](ledger/perplexity.jsonl) |
| [planner](../agents/planner/index.html) | 32 | 62 | 29,422 | 77,366 | 3,606,923 | 97.1% | 145,436 | [10:36 UTC](ledger/planner.jsonl) |
| [reporter](../agents/reporter/index.html) | 309 | 615 | 320,563 | 846,350 | 49,408,046 | 97.7% | 125,506 | [16:07 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 116 | 227 | 124,856 | 842,778 | 30,724,626 | 97.0% | 439,548 | [16:08 UTC](ledger/shadow.jsonl) |
| [sherpa](../agents/sherpa/index.html) | not measured | | | | | | | |
| [social](../agents/social/index.html) | 221 | 440 | 149,189 | 664,530 | 36,687,467 | 97.8% | 139,395 | [15:52 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 206 | 423 | 155,755 | 1,023,043 | 62,711,134 | 98.2% | 459,472 | [16:25 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 394 | 758 | 396,285 | 1,192,214 | 67,822,013 | 97.7% | 169,373 | [15:53 UTC](ledger/stories.jsonl) |
| [storyteller](../agents/storyteller/index.html) | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [synthetic](../agents/synthetic/index.html) | not measured | | | | | | | |
| [transport](../agents/transport/index.html) | 433 | 851 | 231,484 | 549,953 | 65,501,352 | 98.8% | 157,882 | [15:56 UTC](ledger/transport.jsonl) |
| [weather](../agents/weather/index.html) | 410 | 828 | 331,713 | 2,097,332 | 100,148,420 | 97.6% | 198,634 | [12:28 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 323 | 639 | 354,050 | 1,193,040 | 80,525,637 | 98.1% | 161,529 | [16:36 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 223 | 432 | 216,404 | 661,296 | 41,615,076 | 97.9% | 157,555 | [15:56 UTC](ledger/wikipedia.jsonl) |

File: [agents.json](agents.json). How to add your line: [the measure step](measure.md).

## Model calls through the ledger

**2026-11-11**: 4,927 calls, 0.87 US dollars, 1,039,681 tokens in, 559,894 out (measured: the provider's reported cost on each ledger line; [the summary](../models/ledger-summary.json), read 11 November, 03:06 UTC).

| Task | Calls | US dollars | Tokens in | Tokens out |
|---|---|---|---|---|
| WS-214/eval/translate | 1,041 | 0.2391 | 29,661 | 138,359 |
| WS-214/eval/label | 2,055 | 0.2124 | 89,938 | 139,766 |
| WS-214/eval/extract-warning | 771 | 0.1433 | 73,440 | 84,686 |
| WS-214/eval/warnings-in-force | 577 | 0.1409 | 730,756 | 121,028 |
| WS-214/eval/extract-decision | 456 | 0.1311 | 115,387 | 75,687 |
| WS-214/models/ask-smoke | 1 | 0.0050 | 23 | 44 |
| WS-214/models/probe-reasoning | 24 | 0.0006 | 460 | 321 |
| WS-214/models/smoke | 1 | 0.0000 | 16 | 3 |
| WS-214/models/credit-check | 1 | 0.0000 | 0 | 0 |

| Model called | Calls | US dollars | Share of the day | Tokens out |
|---|---|---|---|---|
| qwen/qwen3.5-397b-a17b | 444 | 0.3835 | 44.0% | 110,374 |
| mistralai/mistral-large-4-0 | 179 | 0.2018 | 23.1% | 86,661 |
| deepseek/deepseek-v4.1-flash | 439 | 0.0541 | 6.2% | 54,808 |
| openai/gpt-6.1-terra | 439 | 0.0437 | 5.0% | 5,213 |
| qwen/qwen3.5-9b | 444 | 0.0431 | 4.9% | 174,932 |
| meta-llama/llama-4-maverick | 327 | 0.0399 | 4.6% | 5,657 |
| google/gemma-4-31b-it | 439 | 0.0321 | 3.7% | 26,849 |
| mistralai/ministral-8b-2512 | 327 | 0.0219 | 2.5% | 9,559 |
| google/gemini-3.5-flash-lite | 335 | 0.0123 | 1.4% | 2,649 |
| anthropic/claude-haiku-5.5 | 439 | 0.0111 | 1.3% | 12,431 |
| openai/gpt-6-luna | 447 | 0.0106 | 1.2% | 9,772 |
| openai/gpt-oss-20b | 330 | 0.0103 | 1.2% | 50,322 |
| perplexity/sonar | 1 | 0.0050 | 0.6% | 44 |
| google/gemma-3-4b-it | 337 | 0.0030 | 0.3% | 10,623 |

| Agent (ledger) | Calls | US dollars |
|---|---|---|
| incident.models@web-summit.dinis | 4,927 | 0.8724 |

Reported by other desks (their own statement, not this ledger):

| Desk | Day | US dollars | Source, read |
|---|---|---|---|
| incident.shadow@web-summit.dinis | 2026-11-11 | 0.19 | [agents/shadow/status.json](../agents/shadow/status.json), 11 November, 02:40 UTC |
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 16:41 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 1,351 (6 failure, 949 success, 395 cancelled, 1 in progress) | measured | [data/ci/](../data/ci/index.json), 11 November, 16:18 UTC |
| Runner seconds | 23,156 s over 979 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 24.1 s | measured | the same |
| Queue seconds | 11,680 s | measured | the same |
| Push to served | median 39 s, 90th percentile 58 s | measured | the same |
| Commits | 1,473 by 39 agents, 951 tags | measured | the same |
| Files tracked | 3,145, 31,019,293 bytes | measured | git ls-files, 11 November, 16:41 UTC |
| Pages built | 2,449 pages, 7,738 files served, 99.5 MB | measured | the build in the accountant's clone, 11 November, 16:41 UTC |
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
| 11-11 16:00 | 21 | 17 | 530 | 246 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md), [2026-11-11T0945Z](briefs/2026-11-11T0945Z.md), [2026-11-11T1045Z](briefs/2026-11-11T1045Z.md), [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md), [2026-11-11T1245Z](briefs/2026-11-11T1245Z.md), [2026-11-11T1310Z](briefs/2026-11-11T1310Z.md), [2026-11-11T1345Z](briefs/2026-11-11T1345Z.md), [2026-11-11T1442Z](briefs/2026-11-11T1442Z.md), [2026-11-11T1541Z](briefs/2026-11-11T1541Z.md), [2026-11-11T1641Z](briefs/2026-11-11T1641Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
