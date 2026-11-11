---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 03:32 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **1.06 of 20 US dollars** (5.3% of the cap) | measured 0.87 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 03:06 UTC |
| The provider's account | **out of credit: every call refused with HTTP 402 since 02:55 UTC**: credits 165, used 165.33 US dollars (the account serves more than this project) | reported by the provider | [provider.json](provider.json), from [incident.models@'s status](../agents/models/status.json), 11 November, 02:57 UTC |
| Agent sessions measured | **26 of 30** | measured | [agents.json](agents.json), 11 November, 03:32 UTC |
| Tokens, measured sessions | **1,314,904,127** in all, 1,299,446,016 of them cache reads (98.8%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.87 US dollars, 4,922 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 02:00 UTC: 648,584,024 tokens (26 measured agents) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 171 runs, 1,932 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 03:16 UTC |
| CI | 414 runs, 253 releases, 5,163 s of runner time | measured | the same |
| Repository | 2,117 files tracked, 17.0 MB; 1,533 pages built | measured | [machine.json](machine.json), 11 November, 03:32 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 64 | 538,929 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 4 | 609,253 weighted tokens | measured tokens over a measured count | [stories/*/story.json](../stories/) |
| captured page | 234 | 12,746 weighted tokens | measured tokens over a measured count | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 253 | 19.4 s of CI; tokens not measured: 26 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 4,927 | 0.0002 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| [accountant](../agents/accountant/index.html) | 60 | 124 | 82,469 | 452,498 | 10,207,916 | 95.0% | 261,965 | [03:32 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | 115 | 241 | 94,554 | 241,512 | 26,462,840 | 98.8% | 311,065 | [03:27 UTC](ledger/archivist.jsonl) |
| [board](../agents/board/index.html) | 93 | 190 | 131,265 | 296,147 | 23,691,559 | 98.2% | 365,700 | [03:29 UTC](ledger/board.jsonl) |
| [ci](../agents/ci/index.html) | 76 | 155 | 117,877 | 260,867 | 18,453,396 | 98.0% | 330,420 | [03:17 UTC](ledger/ci.jsonl) |
| [conductor](../agents/conductor/index.html) | 758 | 1,755 | 443,592 | 1,546,036 | 325,000,895 | 99.4% | 527,533 | [02:58 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | 365 | 750 | 399,401 | 792,502 | 155,839,611 | 99.2% | 154,186 | [03:11 UTC](ledger/designer.jsonl) |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | 157 | 319 | 191,955 | 373,764 | 50,060,528 | 98.9% | 443,316 | [03:25 UTC](ledger/entities.jsonl) |
| [graph](../agents/graph/index.html) | 188 | 386 | 232,735 | 489,974 | 67,614,059 | 98.9% | 559,527 | [03:03 UTC](ledger/graph.jsonl) |
| [identity](../agents/identity/index.html) | 121 | 242 | 130,144 | 300,970 | 31,220,625 | 98.6% | 370,523 | [03:23 UTC](ledger/identity.jsonl) |
| [ipma](../agents/ipma/index.html) | 81 | 166 | 134,457 | 263,415 | 19,578,622 | 98.0% | 332,968 | [03:03 UTC](ledger/ipma.jsonl) |
| [journalist](../agents/journalist/index.html) | 81 | 158 | 127,409 | 294,273 | 19,444,839 | 97.9% | 363,826 | [03:13 UTC](ledger/journalist.jsonl) |
| [labs](../agents/labs/index.html) | 84 | 169 | 122,567 | 286,551 | 22,230,427 | 98.2% | 356,104 | [03:01 UTC](ledger/labs.jsonl) |
| [librarian](../agents/librarian/index.html) | 284 | 576 | 314,275 | 782,292 | 92,737,722 | 98.8% | 208,291 | [03:14 UTC](ledger/librarian.jsonl) |
| [media](../agents/media/index.html) | 169 | 336 | 204,199 | 439,651 | 54,639,698 | 98.8% | 509,204 | [03:31 UTC](ledger/media.jsonl) |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | 107 | 210 | 166,631 | 337,593 | 29,141,616 | 98.3% | 407,146 | [03:00 UTC](ledger/meteorology.jsonl) |
| [models](../agents/models/index.html) | 92 | 180 | 142,547 | 317,567 | 23,852,083 | 98.1% | 387,120 | [03:06 UTC](ledger/models.jsonl) |
| [observability](../agents/observability/index.html) | 258 | 508 | 305,802 | 640,044 | 82,883,247 | 98.9% | 195,312 | [03:17 UTC](ledger/observability.jsonl) |
| [perplexity](../agents/perplexity/index.html) | 48 | 94 | 63,263 | 160,965 | 7,972,083 | 97.3% | 230,518 | [03:03 UTC](ledger/perplexity.jsonl) |
| [reporter](../agents/reporter/index.html) | 47 | 90 | 78,907 | 200,159 | 9,206,983 | 97.1% | 269,712 | [03:04 UTC](ledger/reporter.jsonl) |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | 43 | 85 | 56,116 | 178,474 | 8,069,541 | 97.2% | 248,027 | [03:06 UTC](ledger/shadow.jsonl) |
| [social](../agents/social/index.html) | 61 | 124 | 72,645 | 204,054 | 11,792,745 | 97.7% | 273,607 | [03:29 UTC](ledger/social.jsonl) |
| [sources](../agents/sources/index.html) | 98 | 199 | 98,154 | 240,860 | 21,685,356 | 98.5% | 310,413 | [03:25 UTC](ledger/sources.jsonl) |
| [stories](../agents/stories/index.html) | 77 | 149 | 120,190 | 307,366 | 20,093,048 | 97.9% | 376,919 | [03:28 UTC](ledger/stories.jsonl) |
| [studio](../agents/studio/index.html) | 180 | 365 | 243,874 | 711,749 | 63,873,252 | 98.5% | 534,394 | [03:03 UTC](ledger/studio.jsonl) |
| [weather](../agents/weather/index.html) | 163 | 344 | 173,362 | 399,865 | 52,572,357 | 98.9% | 469,418 | [03:13 UTC](ledger/weather.jsonl) |
| [weatherwatch](../agents/weatherwatch/index.html) | 152 | 306 | 215,247 | 467,105 | 51,120,968 | 98.7% | 536,657 | [03:29 UTC](ledger/weatherwatch.jsonl) |
| [wikipedia](../agents/wikipedia/index.html) | not measured | | | | | | | |

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
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 03:35 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 414 (6 failure, 253 success, 155 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 03:16 UTC |
| Runner seconds | 5,163 s over 283 timed runs; 255 s on runs that released nothing | measured | the same |
| Seconds per release | 19.4 s | measured | the same |
| Queue seconds | 2,756 s | measured | the same |
| Push to served | median 31 s, 90th percentile 45 s | measured | the same |
| Commits | 457 by 28 agents, 256 tags | measured | the same |
| Files tracked | 2,117, 17,002,418 bytes | measured | git ls-files, 11 November, 03:32 UTC |
| Pages built | 1,533 pages, 4,779 files served, 51.2 MB | measured | the build in the accountant's clone, 11 November, 03:32 UTC |
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
| 11-11 03:00 | 68 | 31 | 694 | 429 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [provider.json](provider.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md), [2026-11-11T0310Z](briefs/2026-11-11T0310Z.md), [2026-11-11T0335Z](briefs/2026-11-11T0335Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
