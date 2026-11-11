---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 22:47 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T2247Z](briefs/2026-11-11T2247Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **30 of 43** | measured | [agents.json](agents.json), 11 November, 22:47 UTC |
| Tokens, measured sessions | **3,450,818,035** in all, 3,405,738,751 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 22:26 UTC |
| CI | 1,648 runs, 1,154 releases, 28,686 s of runner time | measured | the same |
| Repository | 3,433 files tracked, 45.5 MB; 2,584 pages built | measured | [machine.json](machine.json), 11 November, 22:47 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 139 | 949,525 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 7 | 1,466,040 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 649 | 15,636 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 1,154 | 24.6 s of CI; tokens not measured: 30 of 43 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 259 | 521 | 224,911 | 1,451,375 | 40,031,507 | 96.0% | 121,062 | [22:47 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 278 | 588 | 188,817 | 472,691 | 94,856,407 | 99.3% | 546,445 | [22:26 UTC](ledger/archivist.jsonl) |
| aws | not measured | | | | | | | |
| [board](../agents/board/index.html) | 308 | 623 | 252,230 | 791,703 | 60,649,739 | 98.3% | 124,757 | [22:34 UTC](ledger/board.jsonl) |
| [brief](../agents/brief/index.html) | not measured | | | | | | | |
| [broadcast](../agents/broadcast/index.html) | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | 325 | 646 | 273,764 | 712,426 | 63,025,169 | 98.5% | 242,169 | [22:20 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 2,854 | 6,840 | 1,267,856 | 4,925,638 | 1,257,836,406 | 99.5% | 436,404 | [22:05 UTC](ledger/conductor.jsonl) |
| [datascience](../agents/datascience/index.html) | 70 | 135 | 60,585 | 124,063 | 9,942,226 | 98.2% | 192,133 | [12:01 UTC](ledger/datascience.jsonl) |
| [designer](../agents/designer/index.html) | 702 | 1,415 | 623,907 | 1,346,710 | 204,743,249 | 99.1% | 169,534 | [11:52 UTC](ledger/designer.jsonl) |
| [desk](../agents/desk/index.html) | not measured | | | | | | | |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 408 | 798 | 342,102 | 1,033,364 | 92,757,969 | 98.5% | 206,276 | [22:38 UTC](ledger/entities.jsonl) |
| [envoy](../agents/envoy/index.html) | not measured | | | | | | | |
| [flights](../agents/flights/index.html) | not measured | | | | | | | |
| [graph](../agents/graph/index.html) | 327 | 655 | 336,267 | 998,607 | 91,846,009 | 98.6% | 189,982 | [13:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 272 | 534 | 211,765 | 718,983 | 55,653,549 | 98.4% | 166,082 | [22:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 280 | 588 | 208,028 | 632,544 | 57,887,260 | 98.6% | 165,440 | [21:52 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 440 | 857 | 366,681 | 1,065,388 | 69,688,533 | 98.0% | 171,955 | [22:13 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 173 | 351 | 180,663 | 921,159 | 35,073,939 | 97.0% | 138,364 | [12:14 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 824 | 1,621 | 687,177 | 1,973,488 | 163,711,986 | 98.4% | 162,575 | [22:05 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 442 | 862 | 378,335 | 1,032,530 | 102,955,384 | 98.7% | 153,306 | [22:38 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 177 | 345 | 210,947 | 1,236,043 | 39,165,264 | 96.4% | 185,293 | [21:01 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 225 | 439 | 251,556 | 893,884 | 53,549,365 | 97.9% | 309,050 | [22:33 UTC](ledger/models.jsonl) |
| [motion](../agents/motion/index.html) | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | 846 | 1,690 | 645,312 | 1,809,749 | 168,213,099 | 98.6% | 201,110 | [22:15 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 127 | 245 | 132,886 | 1,640,700 | 30,184,260 | 94.5% | 409,543 | [17:51 UTC](ledger/perplexity.jsonl) |
| [planner](../agents/planner/index.html) | 32 | 62 | 29,422 | 77,366 | 3,606,923 | 97.1% | 145,436 | [10:36 UTC](ledger/planner.jsonl) |
| [reporter](../agents/reporter/index.html) | 378 | 750 | 364,028 | 975,419 | 58,782,589 | 97.8% | 142,646 | [22:09 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 145 | 283 | 167,629 | 1,406,500 | 44,616,709 | 96.6% | 541,123 | [21:07 UTC](ledger/shadow.jsonl) |
| [sherpa](../agents/sherpa/index.html) | not measured | | | | | | | |
| [social](../agents/social/index.html) | 295 | 590 | 172,148 | 736,595 | 49,795,753 | 98.2% | 212,663 | [21:50 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 252 | 517 | 180,320 | 1,081,076 | 85,182,653 | 98.5% | 519,411 | [22:25 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 514 | 991 | 474,034 | 1,407,621 | 83,796,333 | 97.8% | 177,980 | [21:52 UTC](ledger/stories.jsonl) |
| [storyteller](../agents/storyteller/index.html) | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [synthetic](../agents/synthetic/index.html) | not measured | | | | | | | |
| [transport](../agents/transport/index.html) | 505 | 988 | 260,290 | 740,289 | 74,511,345 | 98.7% | 135,518 | [21:43 UTC](ledger/transport.jsonl) |
| [weather](../agents/weather/index.html) | 410 | 828 | 331,713 | 2,097,332 | 100,148,420 | 97.6% | 198,634 | [12:28 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 407 | 802 | 398,180 | 1,411,148 | 91,609,602 | 98.1% | 179,519 | [22:34 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 262 | 505 | 239,437 | 711,169 | 48,751,190 | 98.1% | 208,685 | [21:55 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 22:47 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 1,648 (6 failure, 1154 success, 463 cancelled, 25 queued) | measured | [data/ci/](../data/ci/index.json), 11 November, 22:26 UTC |
| Runner seconds | 28,686 s over 1,184 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 24.6 s | measured | the same |
| Queue seconds | 15,910 s | measured | the same |
| Push to served | median 40 s, 90th percentile 59 s | measured | the same |
| Commits | 1,788 by 41 agents, 1,135 tags | measured | the same |
| Files tracked | 3,433, 45,524,147 bytes | measured | git ls-files, 11 November, 22:47 UTC |
| Pages built | 2,584 pages, 8,368 files served, 120.7 MB | measured | the build in the accountant's clone, 11 November, 22:47 UTC |
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
| 11-11 07:00 | 39 | 37 | 900 | 412 |
| 11-11 08:00 | 41 | 38 | 867 | 450 |
| 11-11 09:00 | 83 | 62 | 1,546 | 742 |
| 11-11 10:00 | 131 | 81 | 2,228 | 1,198 |
| 11-11 11:00 | 84 | 58 | 1,433 | 771 |
| 11-11 12:00 | 145 | 89 | 2,508 | 1,229 |
| 11-11 13:00 | 57 | 46 | 1,267 | 657 |
| 11-11 14:00 | 58 | 43 | 1,244 | 730 |
| 11-11 15:00 | 56 | 46 | 1,387 | 603 |
| 11-11 16:00 | 53 | 47 | 1,389 | 632 |
| 11-11 17:00 | 32 | 29 | 735 | 364 |
| 11-11 18:00 | 42 | 35 | 941 | 430 |
| 11-11 19:00 | 38 | 37 | 1,072 | 369 |
| 11-11 20:00 | 31 | 6 | 147 | 478 |
| 11-11 21:00 | 46 | 35 | 985 | 1,429 |
| 11-11 22:00 | 74 | 31 | 741 | 746 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md), [2026-11-11T0945Z](briefs/2026-11-11T0945Z.md), [2026-11-11T1045Z](briefs/2026-11-11T1045Z.md), [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md), [2026-11-11T1245Z](briefs/2026-11-11T1245Z.md), [2026-11-11T1310Z](briefs/2026-11-11T1310Z.md), [2026-11-11T1345Z](briefs/2026-11-11T1345Z.md), [2026-11-11T1442Z](briefs/2026-11-11T1442Z.md), [2026-11-11T1541Z](briefs/2026-11-11T1541Z.md), [2026-11-11T1641Z](briefs/2026-11-11T1641Z.md), [2026-11-11T1744Z](briefs/2026-11-11T1744Z.md), [2026-11-11T1841Z](briefs/2026-11-11T1841Z.md), [2026-11-11T1942Z](briefs/2026-11-11T1942Z.md), [2026-11-11T2041Z](briefs/2026-11-11T2041Z.md), [2026-11-11T2141Z](briefs/2026-11-11T2141Z.md), [2026-11-11T2247Z](briefs/2026-11-11T2247Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
