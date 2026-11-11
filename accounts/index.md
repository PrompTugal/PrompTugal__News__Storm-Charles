---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 04:35 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **27 of 30** | measured | [agents.json](agents.json), 11 November, 04:35 UTC |
| Tokens, measured sessions | **1,442,955,090** in all, 1,425,124,590 of them cache reads (98.8%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 653,847,918 tokens (27 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 04:10 UTC |
| CI | 477 runs, 305 releases, 6,325 s of runner time | measured | the same |
| Repository | 2,336 files tracked, 18.7 MB; 1,887 pages built | measured | [machine.json](machine.json), 11 November, 04:35 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 65 | 530,638 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 4 | 650,394 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 519 | 6,463 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 305 | 19.9 s of CI; tokens not measured: 27 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 67 | 137 | 90,659 | 668,651 | 11,896,561 | 94.0% | 278,121 | [04:35 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 126 | 264 | 103,426 | 255,186 | 29,953,057 | 98.8% | 324,739 | [04:28 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 105 | 213 | 137,796 | 311,788 | 28,160,254 | 98.4% | 381,341 | [04:31 UTC](ledger/board.jsonl) |
| [ci](../agents/ci/index.html) | 89 | 182 | 128,025 | 282,256 | 22,881,236 | 98.2% | 351,809 | [04:11 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 758 | 1,755 | 443,592 | 1,546,036 | 325,000,895 | 99.4% | 527,533 | [02:58 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 381 | 786 | 408,702 | 816,081 | 158,482,520 | 99.2% | 177,765 | [04:11 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 169 | 344 | 196,942 | 387,675 | 55,459,651 | 99.0% | 457,228 | [04:29 UTC](ledger/entities.jsonl) |
| [graph](../agents/graph/index.html) | 242 | 493 | 283,888 | 633,433 | 77,761,379 | 98.8% | 206,193 | [03:54 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 127 | 253 | 132,288 | 307,303 | 33,458,860 | 98.7% | 376,855 | [04:22 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 87 | 179 | 136,886 | 272,625 | 21,599,674 | 98.1% | 342,178 | [03:43 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 125 | 243 | 167,468 | 415,974 | 26,938,554 | 97.9% | 177,291 | [04:18 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 84 | 169 | 122,567 | 286,551 | 22,230,427 | 98.2% | 356,104 | [03:01 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 380 | 769 | 402,065 | 1,036,324 | 109,158,011 | 98.7% | 159,968 | [04:21 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 173 | 343 | 206,675 | 445,156 | 56,683,495 | 98.9% | 514,709 | [03:37 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 107 | 210 | 166,631 | 337,593 | 29,141,616 | 98.3% | 407,146 | [03:00 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 92 | 180 | 142,547 | 317,567 | 23,852,083 | 98.1% | 387,120 | [03:06 UTC](ledger/models.jsonl) |
| [observability](../agents/observability/index.html) | 274 | 541 | 312,770 | 654,028 | 86,127,417 | 98.9% | 209,296 | [04:16 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 48 | 94 | 63,263 | 160,965 | 7,972,083 | 97.3% | 230,518 | [03:03 UTC](ledger/perplexity.jsonl) |
| [reporter](../agents/reporter/index.html) | 108 | 216 | 151,458 | 379,507 | 21,402,231 | 97.6% | 198,468 | [04:14 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 50 | 98 | 59,864 | 188,447 | 9,838,908 | 97.5% | 258,000 | [04:06 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 68 | 136 | 79,122 | 215,929 | 13,735,454 | 97.9% | 285,481 | [04:31 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 105 | 212 | 101,644 | 250,874 | 23,885,192 | 98.5% | 320,427 | [04:24 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 81 | 156 | 124,338 | 315,739 | 21,613,435 | 98.0% | 385,292 | [04:28 UTC](ledger/stories.jsonl) |
| [studio](../agents/studio/index.html) | 228 | 458 | 301,646 | 864,561 | 73,165,914 | 98.4% | 210,809 | [03:55 UTC](ledger/studio.jsonl) |
| [weather](../agents/weather/index.html) | 163 | 344 | 173,362 | 399,865 | 52,572,357 | 98.9% | 469,418 | [03:13 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 194 | 389 | 253,663 | 601,467 | 60,172,004 | 98.6% | 192,626 | [04:33 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | 97 | 188 | 143,484 | 434,796 | 21,981,322 | 97.4% | 374,359 | [03:50 UTC](ledger/wikipedia.jsonl) |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 04:38 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 477 (6 failure, 305 success, 166 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 04:10 UTC |
| Runner seconds | 6,325 s over 335 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 19.9 s | measured | the same |
| Queue seconds | 3,306 s | measured | the same |
| Push to served | median 33 s, 90th percentile 48 s | measured | the same |
| Commits | 523 by 28 agents, 307 tags | measured | the same |
| Files tracked | 2,336, 18,734,453 bytes | measured | git ls-files, 11 November, 04:35 UTC |
| Pages built | 1,887 pages, 5,930 files served, 59.5 MB | measured | the build in the accountant's clone, 11 November, 04:35 UTC |
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
| 11-11 04:00 | 15 | 10 | 221 | 119 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md), [2026-11-11T0440Z](briefs/2026-11-11T0440Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
