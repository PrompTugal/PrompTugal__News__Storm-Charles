---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 05:39 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **27 of 30** | measured | [agents.json](agents.json), 11 November, 05:39 UTC |
| Tokens, measured sessions | **1,650,757,559** in all, 1,630,397,426 of them cache reads (98.8%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 657,577,281 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 05:15 UTC |
| CI | 535 runs, 355 releases, 7,465 s of runner time | measured | the same |
| Repository | 2,413 files tracked, 19.3 MB; 1,955 pages built | measured | [machine.json](machine.json), 11 November, 05:39 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 66 | 729,940 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 4 | 693,257 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 564 | 7,843 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 355 | 20.3 s of CI; tokens not measured: 27 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 76 | 154 | 99,617 | 904,444 | 14,249,609 | 93.4% | 296,806 | [05:39 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 156 | 328 | 118,841 | 286,866 | 40,171,780 | 99.0% | 356,418 | [05:25 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 111 | 224 | 142,649 | 320,671 | 30,475,329 | 98.5% | 390,224 | [05:27 UTC](ledger/board.jsonl) |
| [ci](../agents/ci/index.html) | 97 | 197 | 133,652 | 296,019 | 25,744,911 | 98.4% | 365,572 | [05:16 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 970 | 2,283 | 519,353 | 1,843,575 | 458,107,978 | 99.5% | 110,788 | [04:36 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 397 | 817 | 415,629 | 837,963 | 161,467,045 | 99.2% | 199,646 | [05:37 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 211 | 425 | 239,263 | 502,282 | 62,355,701 | 98.8% | 180,504 | [05:29 UTC](ledger/entities.jsonl) |
| [graph](../agents/graph/index.html) | 247 | 502 | 285,628 | 777,508 | 78,664,940 | 98.7% | 211,802 | [04:57 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 131 | 261 | 133,464 | 311,528 | 34,972,344 | 98.7% | 381,081 | [05:21 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 100 | 206 | 142,804 | 288,548 | 26,153,282 | 98.4% | 358,101 | [04:49 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 151 | 292 | 194,886 | 505,400 | 30,544,268 | 97.8% | 137,801 | [05:18 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 84 | 169 | 122,567 | 286,551 | 22,230,427 | 98.2% | 356,104 | [03:01 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 386 | 780 | 407,310 | 1,045,216 | 110,136,334 | 98.7% | 168,859 | [04:45 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 208 | 410 | 229,894 | 520,978 | 65,109,640 | 98.9% | 131,874 | [05:37 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 136 | 267 | 188,657 | 747,677 | 33,004,598 | 97.2% | 136,419 | [05:23 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 92 | 180 | 142,547 | 317,567 | 23,852,083 | 98.1% | 387,120 | [03:06 UTC](ledger/models.jsonl) |
| [observability](../agents/observability/index.html) | 279 | 550 | 314,884 | 659,644 | 87,184,570 | 98.9% | 214,912 | [05:15 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 66 | 128 | 70,664 | 185,175 | 12,353,900 | 98.0% | 254,728 | [05:27 UTC](ledger/perplexity.jsonl) |
| [reporter](../agents/reporter/index.html) | 131 | 263 | 168,479 | 441,733 | 25,507,346 | 97.7% | 104,385 | [05:11 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 55 | 108 | 62,212 | 194,978 | 11,142,986 | 97.7% | 264,531 | [05:06 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 73 | 146 | 81,716 | 439,396 | 14,955,487 | 96.6% | 291,319 | [05:37 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 112 | 226 | 106,157 | 260,720 | 26,157,046 | 98.6% | 330,273 | [05:26 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 85 | 164 | 129,734 | 326,155 | 23,169,764 | 98.1% | 395,708 | [05:28 UTC](ledger/stories.jsonl) |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [weather](../agents/weather/index.html) | 170 | 357 | 178,487 | 810,320 | 55,478,265 | 98.3% | 478,276 | [05:27 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 194 | 389 | 253,663 | 601,467 | 60,172,004 | 98.6% | 192,626 | [04:33 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 102 | 198 | 146,071 | 442,235 | 23,869,875 | 97.6% | 381,798 | [04:48 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 05:42 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 535 (6 failure, 355 success, 174 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 05:15 UTC |
| Runner seconds | 7,465 s over 385 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 20.3 s | measured | the same |
| Queue seconds | 3,885 s | measured | the same |
| Push to served | median 34 s, 90th percentile 49 s | measured | the same |
| Commits | 584 by 28 agents, 357 tags | measured | the same |
| Files tracked | 2,413, 19,349,830 bytes | measured | git ls-files, 11 November, 05:39 UTC |
| Pages built | 1,955 pages, 6,138 files served, 61.9 MB | measured | the build in the accountant's clone, 11 November, 05:39 UTC |
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
| 11-11 05:00 | 9 | 9 | 201 | 92 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md), [2026-11-11T0545Z](briefs/2026-11-11T0545Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
