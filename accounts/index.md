---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 11:41 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **29 of 37** | measured | [agents.json](agents.json), 11 November, 11:41 UTC |
| Tokens, measured sessions | **2,268,311,887** in all, 2,236,797,095 of them cache reads (98.6%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 11:24 UTC |
| CI | 939 runs, 659 releases, 14,998 s of runner time | measured | the same |
| Repository | 2,797 files tracked, 24.9 MB; 2,223 pages built | measured | [machine.json](machine.json), 11 November, 11:41 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 91 | 744,690 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 7 | 927,326 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 594 | 12,391 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 659 | 22.4 s of CI; tokens not measured: 29 of 37 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 133 | 267 | 142,842 | 1,095,912 | 21,918,983 | 94.7% | 188,024 | [11:41 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 225 | 481 | 154,356 | 386,648 | 68,185,256 | 99.2% | 458,895 | [11:28 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 187 | 377 | 190,824 | 518,038 | 44,506,741 | 98.4% | 192,875 | [11:34 UTC](ledger/board.jsonl) |
| broadcast | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | 149 | 295 | 163,489 | 471,313 | 32,978,002 | 98.1% | 160,300 | [11:25 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 1,441 | 3,428 | 707,300 | 2,421,810 | 646,342,299 | 99.5% | 691,711 | [09:42 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 681 | 1,374 | 610,314 | 1,322,275 | 201,438,746 | 99.1% | 145,099 | [11:13 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 286 | 568 | 285,590 | 775,909 | 74,046,211 | 98.6% | 180,928 | [11:38 UTC](ledger/entities.jsonl) |
| envoy | not measured | | | | | | | |
| [graph](../agents/graph/index.html) | 312 | 627 | 325,871 | 976,415 | 89,175,385 | 98.6% | 167,470 | [10:53 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 225 | 444 | 194,780 | 615,604 | 49,184,161 | 98.4% | 110,271 | [11:25 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 174 | 364 | 173,889 | 499,979 | 42,739,713 | 98.5% | 155,511 | [10:51 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 321 | 624 | 309,629 | 908,471 | 53,773,297 | 97.8% | 115,705 | [11:26 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 128 | 264 | 165,049 | 850,865 | 30,000,399 | 96.7% | 213,390 | [09:15 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 542 | 1,077 | 526,230 | 1,508,834 | 129,579,853 | 98.5% | 130,077 | [10:51 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 316 | 621 | 299,931 | 694,323 | 81,861,911 | 98.8% | 143,844 | [11:38 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 152 | 298 | 198,165 | 910,209 | 35,181,022 | 96.9% | 154,476 | [11:36 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 103 | 203 | 150,143 | 654,032 | 27,862,641 | 97.2% | 403,575 | [09:31 UTC](ledger/models.jsonl) |
| motion | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | 515 | 1,035 | 458,869 | 1,229,049 | 124,903,314 | 98.7% | 151,712 | [11:24 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 66 | 128 | 70,664 | 185,175 | 12,353,900 | 98.0% | 254,728 | [05:27 UTC](ledger/perplexity.jsonl) |
| planner | 32 | 62 | 29,422 | 77,366 | 3,606,923 | 97.1% | 145,436 | [10:36 UTC](ledger/planner.jsonl) |
| [reporter](../agents/reporter/index.html) | 223 | 445 | 263,986 | 674,555 | 38,509,372 | 97.6% | 187,780 | [11:18 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 83 | 162 | 76,029 | 465,252 | 18,841,790 | 97.2% | 305,306 | [11:13 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 142 | 283 | 117,253 | 552,717 | 25,260,499 | 97.4% | 174,836 | [10:51 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 182 | 377 | 143,858 | 989,305 | 52,092,558 | 97.9% | 425,734 | [11:28 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 279 | 541 | 304,220 | 947,080 | 52,394,443 | 97.7% | 151,340 | [10:59 UTC](ledger/stories.jsonl) |
| storyteller | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| synthetic | not measured | | | | | | | |
| transport | 94 | 190 | 53,887 | 125,461 | 13,861,913 | 98.7% | 194,626 | [11:40 UTC](ledger/transport.jsonl) |
| [weather](../agents/weather/index.html) | 322 | 653 | 281,287 | 1,934,711 | 85,892,931 | 97.5% | 191,217 | [11:29 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 263 | 523 | 315,591 | 1,075,764 | 72,655,759 | 98.1% | 164,835 | [11:34 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 165 | 322 | 186,304 | 565,250 | 34,483,159 | 97.9% | 183,845 | [10:55 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 11:41 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 939 (6 failure, 659 success, 274 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 11:24 UTC |
| Runner seconds | 14,998 s over 689 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 22.4 s | measured | the same |
| Queue seconds | 7,546 s | measured | the same |
| Push to served | median 37 s, 90th percentile 55 s | measured | the same |
| Commits | 1,034 by 35 agents, 660 tags | measured | the same |
| Files tracked | 2,797, 24,906,875 bytes | measured | git ls-files, 11 November, 11:41 UTC |
| Pages built | 2,223 pages, 7,018 files served, 82.2 MB | measured | the build in the accountant's clone, 11 November, 11:41 UTC |
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
| 11-11 11:00 | 7 | 7 | 161 | 74 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md), [2026-11-11T0945Z](briefs/2026-11-11T0945Z.md), [2026-11-11T1045Z](briefs/2026-11-11T1045Z.md), [2026-11-11T1145Z](briefs/2026-11-11T1145Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
