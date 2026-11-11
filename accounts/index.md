---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 06:41 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **27 of 30** | measured | [agents.json](agents.json), 11 November, 06:41 UTC |
| Tokens, measured sessions | **1,715,884,361** in all, 1,694,099,894 of them cache reads (98.7%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 06:22 UTC |
| CI | 607 runs, 406 releases, 8,663 s of runner time | measured | the same |
| Repository | 2,447 files tracked, 20.1 MB; 1,980 pages built | measured | [machine.json](machine.json), 11 November, 06:41 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 69 | 698,203 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 5 | 673,845 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 569 | 8,649 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 406 | 20.7 s of CI; tokens not measured: 27 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 98 | 198 | 114,226 | 960,842 | 16,605,113 | 93.9% | 125,951 | [06:41 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 169 | 355 | 126,338 | 304,425 | 44,903,390 | 99.1% | 373,978 | [06:26 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 143 | 291 | 162,302 | 387,820 | 37,664,928 | 98.6% | 123,641 | [06:34 UTC](ledger/board.jsonl) |
| [ci](../agents/ci/index.html) | 124 | 248 | 152,566 | 358,987 | 29,497,316 | 98.3% | 127,328 | [06:23 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 970 | 2,283 | 519,353 | 1,843,575 | 458,107,978 | 99.5% | 110,788 | [04:36 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 397 | 817 | 415,629 | 837,963 | 161,467,045 | 99.2% | 199,646 | [05:37 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 223 | 448 | 244,916 | 517,233 | 64,609,432 | 98.8% | 195,455 | [06:38 UTC](ledger/entities.jsonl) |
| [graph](../agents/graph/index.html) | 253 | 513 | 290,560 | 787,242 | 79,953,704 | 98.7% | 221,535 | [05:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 158 | 313 | 152,708 | 381,587 | 38,894,327 | 98.6% | 136,085 | [06:24 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 117 | 240 | 155,587 | 339,759 | 30,741,599 | 98.4% | 374,261 | [05:49 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 165 | 319 | 208,865 | 604,598 | 32,522,582 | 97.6% | 166,061 | [06:21 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 84 | 169 | 122,567 | 286,551 | 22,230,427 | 98.2% | 356,104 | [03:01 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 408 | 822 | 429,490 | 1,134,238 | 113,228,882 | 98.6% | 138,275 | [05:50 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 219 | 431 | 235,111 | 535,115 | 66,634,764 | 98.9% | 146,011 | [06:38 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 136 | 267 | 188,657 | 747,677 | 33,004,598 | 97.2% | 136,419 | [05:23 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 92 | 180 | 142,547 | 317,567 | 23,852,083 | 98.1% | 387,120 | [03:06 UTC](ledger/models.jsonl) |
| [observability](../agents/observability/index.html) | 292 | 575 | 323,780 | 835,216 | 89,929,447 | 98.7% | 232,074 | [06:20 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 66 | 128 | 70,664 | 185,175 | 12,353,900 | 98.0% | 254,728 | [05:27 UTC](ledger/perplexity.jsonl) |
| [reporter](../agents/reporter/index.html) | 144 | 290 | 184,127 | 483,933 | 27,029,856 | 97.6% | 146,585 | [06:09 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 60 | 117 | 65,263 | 201,033 | 12,477,952 | 97.9% | 270,586 | [06:06 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 95 | 194 | 97,837 | 492,228 | 18,544,887 | 96.9% | 113,790 | [05:50 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 128 | 261 | 117,351 | 283,383 | 31,623,513 | 98.8% | 352,936 | [06:27 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 112 | 216 | 162,116 | 428,179 | 27,787,136 | 97.9% | 160,984 | [05:49 UTC](ledger/stories.jsonl) |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [weather](../agents/weather/index.html) | 170 | 357 | 178,487 | 810,320 | 55,478,265 | 98.3% | 478,276 | [05:27 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 209 | 418 | 267,359 | 759,640 | 63,149,594 | 98.4% | 224,944 | [06:40 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 124 | 242 | 159,349 | 495,069 | 28,641,262 | 97.8% | 113,037 | [05:57 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 06:41 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 607 (6 failure, 406 success, 195 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 06:22 UTC |
| Runner seconds | 8,663 s over 436 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 20.7 s | measured | the same |
| Queue seconds | 4,382 s | measured | the same |
| Push to served | median 35 s, 90th percentile 49 s | measured | the same |
| Commits | 663 by 28 agents, 408 tags | measured | the same |
| Files tracked | 2,447, 20,108,778 bytes | measured | git ls-files, 11 November, 06:41 UTC |
| Pages built | 1,980 pages, 6,212 files served, 63.8 MB | measured | the build in the accountant's clone, 11 November, 06:41 UTC |
| Vaults | 2 listed; sizes not published | reported | [data/vaults.json](../data/vaults.json) |

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
| 11-11 06:00 | 6 | 5 | 118 | 55 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md), [2026-11-11T0645Z](briefs/2026-11-11T0645Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
