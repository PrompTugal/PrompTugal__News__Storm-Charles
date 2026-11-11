---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 08:43 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **27 of 30** | measured | [agents.json](agents.json), 11 November, 08:43 UTC |
| Tokens, measured sessions | **1,837,690,511** in all, 1,812,971,781 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 08:17 UTC |
| CI | 685 runs, 479 releases, 10,381 s of runner time | measured | the same |
| Repository | 2,511 files tracked, 21.1 MB; 2,027 pages built | measured | [machine.json](machine.json), 11 November, 08:43 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 76 | 692,009 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 6 | 807,011 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 579 | 9,404 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 479 | 21.1 s of CI; tokens not measured: 27 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 113 | 229 | 126,894 | 1,059,609 | 18,564,420 | 94.0% | 150,484 | [08:43 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 182 | 381 | 135,158 | 323,591 | 49,858,608 | 99.1% | 393,143 | [08:26 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 157 | 318 | 170,770 | 470,929 | 39,458,077 | 98.4% | 144,247 | [08:40 UTC](ledger/board.jsonl) |
| [ci](../agents/ci/index.html) | 132 | 263 | 155,858 | 368,806 | 30,550,365 | 98.3% | 137,147 | [08:18 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 1,153 | 2,726 | 587,705 | 2,079,099 | 499,231,590 | 99.5% | 346,311 | [06:42 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 397 | 817 | 415,629 | 837,963 | 161,467,045 | 99.2% | 199,646 | [05:37 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 228 | 458 | 247,359 | 522,889 | 65,598,948 | 98.8% | 201,111 | [07:38 UTC](ledger/entities.jsonl) |
| [graph](../agents/graph/index.html) | 286 | 577 | 312,161 | 868,970 | 85,398,232 | 98.6% | 133,008 | [07:58 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 166 | 328 | 155,010 | 457,275 | 39,945,144 | 98.5% | 144,609 | [08:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 129 | 267 | 158,077 | 350,932 | 35,287,827 | 98.6% | 385,434 | [07:49 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 197 | 381 | 236,151 | 693,110 | 37,273,851 | 97.6% | 127,737 | [08:18 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 118 | 242 | 156,165 | 705,252 | 28,124,864 | 97.0% | 193,263 | [06:51 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 452 | 907 | 465,107 | 1,234,819 | 118,729,618 | 98.6% | 135,947 | [07:50 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 248 | 488 | 251,605 | 570,729 | 71,357,695 | 98.9% | 181,624 | [08:42 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 143 | 280 | 193,094 | 823,990 | 33,913,275 | 97.1% | 144,474 | [08:25 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 92 | 180 | 142,547 | 317,567 | 23,852,083 | 98.1% | 387,120 | [03:06 UTC](ledger/models.jsonl) |
| [observability](../agents/observability/index.html) | 322 | 634 | 341,797 | 907,232 | 95,043,194 | 98.7% | 128,927 | [08:20 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 66 | 128 | 70,664 | 185,175 | 12,353,900 | 98.0% | 254,728 | [05:27 UTC](ledger/perplexity.jsonl) |
| [reporter](../agents/reporter/index.html) | 159 | 318 | 201,709 | 518,576 | 29,409,045 | 97.6% | 181,228 | [08:09 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 71 | 139 | 70,261 | 216,671 | 15,536,199 | 98.2% | 286,223 | [08:06 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 115 | 232 | 106,406 | 517,431 | 21,058,960 | 97.1% | 138,993 | [07:51 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 138 | 280 | 124,090 | 584,242 | 34,936,146 | 98.0% | 368,298 | [08:25 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 180 | 353 | 230,918 | 727,173 | 38,836,228 | 97.6% | 191,757 | [08:02 UTC](ledger/stories.jsonl) |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [weather](../agents/weather/index.html) | 180 | 378 | 189,664 | 1,240,617 | 59,902,648 | 97.7% | 496,159 | [07:41 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 214 | 427 | 271,496 | 769,844 | 64,292,376 | 98.4% | 235,148 | [07:39 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 134 | 262 | 163,744 | 507,542 | 29,825,529 | 97.8% | 125,510 | [07:54 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 08:43 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 685 (6 failure, 479 success, 200 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 08:17 UTC |
| Runner seconds | 10,381 s over 509 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 21.1 s | measured | the same |
| Queue seconds | 5,169 s | measured | the same |
| Push to served | median 36 s, 90th percentile 51 s | measured | the same |
| Commits | 745 by 28 agents, 480 tags | measured | the same |
| Files tracked | 2,511, 21,144,509 bytes | measured | git ls-files, 11 November, 08:43 UTC |
| Pages built | 2,027 pages, 6,364 files served, 66.6 MB | measured | the build in the accountant's clone, 11 November, 08:43 UTC |
| Vaults | 2 listed; sizes not published | reported | [data/vaults.json](../data/vaults.json) |

CI by hour (UTC):

| Hour | Runs | Releases | Runner s | Queue s |
|---|---|---|---|---|
| 11-10 21:00 | 10 | 6 | 140 | 64 |
| 11-10 22:00 | 2 | 2 | 31 | 9 |
| 11-10 23:00 | 64 | 33 | 717 | 367 |
| 11-11 00:00 | 66 | 58 | 1,133 | 540 |
| 11-11 01:00 | 34 | 31 | 535 | 265 |
| 11-11 02:00 | 171 | 93 | 1,932 | 1,093 |
| 11-11 03:00 | 116 | 73 | 1,635 | 860 |
| 11-11 04:00 | 64 | 51 | 1,160 | 606 |
| 11-11 05:00 | 75 | 55 | 1,281 | 534 |
| 11-11 06:00 | 37 | 33 | 751 | 343 |
| 11-11 07:00 | 38 | 36 | 880 | 407 |
| 11-11 08:00 | 8 | 8 | 186 | 81 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md), [2026-11-11T0745Z](briefs/2026-11-11T0745Z.md), [2026-11-11T0845Z](briefs/2026-11-11T0845Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
