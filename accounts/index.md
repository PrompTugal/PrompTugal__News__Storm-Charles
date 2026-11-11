---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 15:41 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T1541Z](briefs/2026-11-11T1541Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **30 of 41** | measured | [agents.json](agents.json), 11 November, 15:41 UTC |
| Tokens, measured sessions | **2,886,122,647** in all, 2,847,198,596 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 15:18 UTC |
| CI | 1,286 runs, 898 releases, 21,583 s of runner time | measured | the same |
| Repository | 3,124 files tracked, 30.2 MB; 2,435 pages built | measured | [machine.json](machine.json), 11 November, 15:41 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 115 | 904,681 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 7 | 1,166,447 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 614 | 13,697 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 898 | 23.8 s of CI; tokens not measured: 30 of 41 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 197 | 394 | 181,714 | 1,201,556 | 30,204,110 | 95.6% | 153,902 | [15:41 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 246 | 522 | 167,640 | 423,028 | 78,187,134 | 99.3% | 495,275 | [15:26 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 245 | 493 | 218,341 | 604,335 | 51,885,562 | 98.4% | 133,127 | [15:34 UTC](ledger/board.jsonl) |
| [brief](../agents/brief/index.html) | not measured | | | | | | | |
| [broadcast](../agents/broadcast/index.html) | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | 249 | 495 | 225,861 | 618,015 | 48,595,105 | 98.3% | 144,000 | [15:20 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 2,237 | 5,335 | 1,052,231 | 4,184,583 | 987,962,144 | 99.5% | 389,838 | [14:41 UTC](ledger/conductor.jsonl) |
| [datascience](../agents/datascience/index.html) | 70 | 135 | 60,585 | 124,063 | 9,942,226 | 98.2% | 192,133 | [12:01 UTC](ledger/datascience.jsonl) |
| [designer](../agents/designer/index.html) | 702 | 1,415 | 623,907 | 1,346,710 | 204,743,249 | 99.1% | 169,534 | [11:52 UTC](ledger/designer.jsonl) |
| [desk](../agents/desk/index.html) | not measured | | | | | | | |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 365 | 718 | 325,691 | 888,588 | 84,933,204 | 98.6% | 162,320 | [15:38 UTC](ledger/entities.jsonl) |
| [envoy](../agents/envoy/index.html) | not measured | | | | | | | |
| [graph](../agents/graph/index.html) | 327 | 655 | 336,267 | 998,607 | 91,846,009 | 98.6% | 189,982 | [13:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 243 | 479 | 201,069 | 686,800 | 51,323,661 | 98.3% | 133,053 | [15:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 237 | 499 | 198,063 | 595,256 | 51,599,040 | 98.5% | 127,402 | [14:52 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 361 | 703 | 332,690 | 963,196 | 59,583,390 | 97.9% | 170,430 | [15:15 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 173 | 351 | 180,663 | 921,159 | 35,073,939 | 97.0% | 138,364 | [12:14 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 700 | 1,385 | 604,810 | 1,757,033 | 148,391,085 | 98.4% | 117,469 | [15:07 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 354 | 692 | 327,391 | 751,335 | 88,459,084 | 98.8% | 200,856 | [15:38 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 158 | 309 | 201,173 | 1,006,752 | 36,047,402 | 96.8% | 163,713 | [14:42 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 103 | 203 | 150,143 | 654,032 | 27,862,641 | 97.2% | 403,575 | [09:31 UTC](ledger/models.jsonl) |
| [motion](../agents/motion/index.html) | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | 659 | 1,331 | 538,561 | 1,496,101 | 143,295,505 | 98.6% | 171,347 | [15:20 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 115 | 222 | 114,926 | 1,294,238 | 25,911,576 | 94.8% | 366,449 | [14:42 UTC](ledger/perplexity.jsonl) |
| [planner](../agents/planner/index.html) | 32 | 62 | 29,422 | 77,366 | 3,606,923 | 97.1% | 145,436 | [10:36 UTC](ledger/planner.jsonl) |
| [reporter](../agents/reporter/index.html) | 279 | 554 | 307,303 | 788,914 | 46,207,995 | 97.7% | 161,180 | [15:09 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 110 | 215 | 114,896 | 817,585 | 28,184,253 | 96.8% | 414,354 | [15:08 UTC](ledger/shadow.jsonl) |
| [sherpa](../agents/sherpa/index.html) | not measured | | | | | | | |
| [social](../agents/social/index.html) | 202 | 400 | 141,714 | 642,567 | 34,239,892 | 97.8% | 117,432 | [14:51 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 200 | 411 | 152,652 | 1,015,571 | 59,982,127 | 98.1% | 452,000 | [15:24 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 383 | 737 | 384,041 | 1,166,770 | 66,135,779 | 97.7% | 143,929 | [14:53 UTC](ledger/stories.jsonl) |
| [storyteller](../agents/storyteller/index.html) | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [synthetic](../agents/synthetic/index.html) | not measured | | | | | | | |
| [transport](../agents/transport/index.html) | 396 | 780 | 214,333 | 516,021 | 60,343,953 | 98.8% | 123,950 | [14:44 UTC](ledger/transport.jsonl) |
| [weather](../agents/weather/index.html) | 410 | 828 | 331,713 | 2,097,332 | 100,148,420 | 97.6% | 198,634 | [12:28 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 317 | 628 | 349,640 | 1,182,448 | 79,595,304 | 98.1% | 150,938 | [15:36 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 210 | 407 | 209,889 | 638,738 | 39,741,970 | 97.9% | 134,997 | [14:56 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 15:41 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 1,286 (6 failure, 898 success, 382 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 15:18 UTC |
| Runner seconds | 21,583 s over 928 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 23.8 s | measured | the same |
| Queue seconds | 10,961 s | measured | the same |
| Push to served | median 39 s, 90th percentile 58 s | measured | the same |
| Commits | 1,405 by 39 agents, 899 tags | measured | the same |
| Files tracked | 3,124, 30,248,587 bytes | measured | git ls-files, 11 November, 15:41 UTC |
| Pages built | 2,435 pages, 7,693 files served, 97.8 MB | measured | the build in the accountant's clone, 11 November, 15:41 UTC |
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
| 11-11 11:00 | 85 | 59 | 1,461 | 790 |
| 11-11 12:00 | 144 | 88 | 2,478 | 1,206 |
| 11-11 13:00 | 57 | 46 | 1,267 | 657 |
| 11-11 14:00 | 58 | 43 | 1,244 | 730 |
| 11-11 15:00 | 11 | 11 | 316 | 111 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md), [2026-11-11T0945Z](briefs/2026-11-11T0945Z.md), [2026-11-11T1045Z](briefs/2026-11-11T1045Z.md), [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md), [2026-11-11T1245Z](briefs/2026-11-11T1245Z.md), [2026-11-11T1310Z](briefs/2026-11-11T1310Z.md), [2026-11-11T1345Z](briefs/2026-11-11T1345Z.md), [2026-11-11T1442Z](briefs/2026-11-11T1442Z.md), [2026-11-11T1541Z](briefs/2026-11-11T1541Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
