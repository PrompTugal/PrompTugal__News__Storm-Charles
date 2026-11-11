---
title: The accounts
summary: What this project costs: model spend against the day's cap, tokens by agent session, CI time, cost per output; each figure with its source and whether it is measured, reported or estimated.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 03:00 UTC

# The accounts: what this project costs

This is the cost of running the site, not news of the storm, and not a warning service: for warnings read [IPMA](https://www.ipma.pt/) and the authorities. Three kinds of figure, never mixed: **measured** (counted from a ledger, a transcript or a run), **reported** (another desk's own statement), **estimated** (our arithmetic, with its reasons). A cell with no figure says *not measured*; nothing is guessed. Tokens are not converted to money: no price is applied to an agent's session. Where the savings are: [savings](savings.md). The latest brief for Dinis: [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md).

## The books at a glance

| | Figure | Kind | Source, read |
|---|---|---|---|
| Model spend today | **0.92 of 20 US dollars** (4.6% of the cap) | measured 0.73 + reported 0.19 | [models.json](models.json), from [the model ledger's summary](../models/ledger-summary.json), 11 November, 02:41 UTC |
| Agent sessions measured | **2 of 30** | measured | [agents.json](agents.json), 11 November, 03:00 UTC |
| Tokens, measured sessions | **330,524,779** in all, 328,202,311 of them cache reads (99.3%) | measured | [the ledger lines](ledger/) |
| Most expensive hour, models | 02:00 UTC: 0.73 US dollars, 1,098 calls | measured | [models.json](models.json) |
| Most expensive hour, tokens | 00:00 UTC: 96,049,273 tokens (1 measured agent) | measured | [agents.json](agents.json) |
| Busiest hour, CI | 02:00 UTC: 154 runs, 1,646 s | measured | [machine.json](machine.json), from [incident.ci@'s runs](../data/ci/index.json), 11 November, 02:54 UTC |
| CI | 329 runs, 210 releases, 4,183 s of runner time | measured | the same |
| Repository | 1,524 files tracked, 13.9 MB; 1,173 pages built | measured | [machine.json](machine.json), 11 November, 03:00 UTC |

The cap: 20 US dollars a day since 02:50 UTC on 11 November (5 before), [Dinis's words in the brief](../BRIEF.md).

## Cost per output

Only where both sides are measured. An agent does more than one thing in a session, so tokens per output are an upper bound.

| Output | Count | Cost each | Kind | Source |
|---|---|---|---|---|
| timeline row | 62 | 556,314 weighted tokens | measured tokens over a measured count | [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) |
| story | 4 | tokens not measured: incident.stories@ has not measured its session | count measured | [stories/*/story.json](../stories/) |
| captured page | 90 | tokens not measured: incident.archivist@ has not measured its session | count measured | [evidence/index.json](../evidence/index.json) |
| release (a successful CI run) | 210 | 18.8 s of CI; tokens not measured: 2 of 30 agents have measured: the team's tokens per release need all of them | measured | [data/ci/runs/*.json](../data/ci/runs/) |
| model call through the ledger | 1,098 | 0.0007 US dollars | measured | [models/ledger-summary.json](../models/ledger-summary.json) |

Weighted tokens: fresh input + output + cache writes + a tenth of cache reads (an estimate of relative cost from WS-148, not a price). File: [outputs.json](outputs.json).

## Tokens by agent

Each agent measures its own session with [tools/accounts-measure.mjs](../tools/accounts-measure.mjs) (the method of WS-148: one line of numbers, no message text) and commits the line. The latest line of each session counts.

| Agent | Calls | Fresh input | Output | Cache writes | Cache reads | Cache reads' share | Context per call, last | Measured |
|---|---|---|---|---|---|---|---|---|
| accountant | 27 | 52 | 36,917 | 294,116 | 3,201,416 | 90.6% | 182,110 | [02:56 UTC](ledger/accountant.jsonl) |
| [archivist](../agents/archivist/index.html) | not measured | | | | | | | |
| [board](../agents/board/index.html) | not measured | | | | | | | |
| [ci](../agents/ci/index.html) | not measured | | | | | | | |
| [conductor](../agents/conductor/index.html) | 758 | 1,755 | 443,592 | 1,546,036 | 325,000,895 | 99.4% | 527,533 | [02:58 UTC](ledger/conductor.jsonl) |
| [designer](../agents/designer/index.html) | not measured | | | | | | | |
| [dev](../agents/dev/index.html) | not measured | | | | | | | |
| [entities](../agents/entities/index.html) | not measured | | | | | | | |
| [graph](../agents/graph/index.html) | not measured | | | | | | | |
| [identity](../agents/identity/index.html) | not measured | | | | | | | |
| [ipma](../agents/ipma/index.html) | not measured | | | | | | | |
| journalist | not measured | | | | | | | |
| [labs](../agents/labs/index.html) | not measured | | | | | | | |
| [librarian](../agents/librarian/index.html) | not measured | | | | | | | |
| [media](../agents/media/index.html) | not measured | | | | | | | |
| [meteorologist](../agents/meteorologist/index.html) | not measured | | | | | | | |
| [meteorology](../agents/meteorology/index.html) | not measured | | | | | | | |
| [models](../agents/models/index.html) | not measured | | | | | | | |
| [observability](../agents/observability/index.html) | not measured | | | | | | | |
| perplexity | not measured | | | | | | | |
| reporter | not measured | | | | | | | |
| [researcher](../agents/researcher/index.html) | not measured | | | | | | | |
| [shadow](../agents/shadow/index.html) | not measured | | | | | | | |
| [social](../agents/social/index.html) | not measured | | | | | | | |
| [sources](../agents/sources/index.html) | not measured | | | | | | | |
| [stories](../agents/stories/index.html) | not measured | | | | | | | |
| [studio](../agents/studio/index.html) | not measured | | | | | | | |
| [weather](../agents/weather/index.html) | not measured | | | | | | | |
| [weatherwatch](../agents/weatherwatch/index.html) | not measured | | | | | | | |
| [wikipedia](../agents/wikipedia/index.html) | not measured | | | | | | | |

File: [agents.json](agents.json). How to add your line: [the measure step](measure.md).

## Model calls through the ledger

**2026-11-11**: 1,098 calls, 0.73 US dollars, 308,465 tokens in, 438,545 out (measured: the provider's reported cost on each ledger line; [the summary](../models/ledger-summary.json), read 11 November, 02:41 UTC).

| Task | Calls | US dollars | Tokens in | Tokens out |
|---|---|---|---|---|
| WS-214/eval/translate | 326 | 0.2391 | 29,661 | 138,359 |
| WS-214/eval/label | 326 | 0.2124 | 89,938 | 139,766 |
| WS-214/eval/extract-warning | 278 | 0.1433 | 73,440 | 84,686 |
| WS-214/eval/extract-decision | 166 | 0.1311 | 115,387 | 75,687 |
| WS-214/models/ask-smoke | 1 | 0.0050 | 23 | 44 |
| WS-214/models/smoke | 1 | 0.0000 | 16 | 3 |

| Model called | Calls | US dollars | Share of the day | Tokens out |
|---|---|---|---|---|
| qwen/qwen3.5-397b-a17b | 134 | 0.3835 | 52.5% | 110,374 |
| mistralai/mistral-large-4-0 | 134 | 0.2016 | 27.6% | 86,561 |
| openai/gpt-6.1-terra | 67 | 0.0435 | 6.0% | 5,186 |
| qwen/qwen3.5-9b | 142 | 0.0287 | 3.9% | 153,578 |
| deepseek/deepseek-v4.1-flash | 67 | 0.0261 | 3.6% | 33,987 |
| google/gemini-3.5-flash-lite | 67 | 0.0123 | 1.7% | 2,644 |
| meta-llama/llama-4-maverick | 67 | 0.0069 | 0.9% | 2,222 |
| anthropic/claude-haiku-5.5 | 67 | 0.0065 | 0.9% | 7,713 |
| openai/gpt-6-luna | 75 | 0.0055 | 0.7% | 6,901 |
| perplexity/sonar | 1 | 0.0050 | 0.7% | 44 |
| openai/gpt-oss-20b | 67 | 0.0045 | 0.6% | 18,620 |
| google/gemma-4-31b-it | 67 | 0.0032 | 0.4% | 2,914 |
| mistralai/ministral-8b-2512 | 67 | 0.0027 | 0.4% | 3,744 |
| google/gemma-3-4b-it | 76 | 0.0011 | 0.1% | 4,057 |

| Agent (ledger) | Calls | US dollars |
|---|---|---|
| incident.models@web-summit.dinis | 1,098 | 0.7310 |

Reported by other desks (their own statement, not this ledger):

| Desk | Day | US dollars | Source, read |
|---|---|---|---|
| incident.shadow@web-summit.dinis | 2026-11-11 | 0.19 | [agents/shadow/status.json](../agents/shadow/status.json), 11 November, 02:40 UTC |
| incident.accountant@web-summit.dinis | 2026-11-11 | 0.0000 | [agents/accountant/status.json](../agents/accountant/status.json), 11 November, 03:00 UTC |

File: [models.json](models.json).

## The machine

| | Figure | Kind | Source, read |
|---|---|---|---|
| CI runs | 329 (4 failure, 210 success, 115 cancelled) | measured | [data/ci/](../data/ci/index.json), 11 November, 02:54 UTC |
| Runner seconds | 4,183 s over 238 timed runs; 225 s on runs that released nothing | measured | the same |
| Seconds per release | 18.8 s | measured | the same |
| Queue seconds | 2,150 s | measured | the same |
| Push to served | median 30 s, 90th percentile 44 s | measured | the same |
| Commits | 363 by 24 agents, 213 tags | measured | the same |
| Files tracked | 1,524, 13,919,394 bytes | measured | git ls-files, 11 November, 03:00 UTC |
| Pages built | 1,173 pages, 3,573 files served, 40.4 MB | measured | the build in the accountant's clone, 11 November, 03:00 UTC |
| Vaults | 2 listed; sizes not published | reported | [data/vaults.json](../data/vaults.json) |

CI by hour (UTC):

| Hour | Runs | Releases | Runner s | Queue s |
|---|---|---|---|---|
| 11-10 21:00 | 10 | 6 | 140 | 64 |
| 11-10 22:00 | 2 | 2 | 31 | 9 |
| 11-10 23:00 | 64 | 33 | 717 | 367 |
| 11-11 00:00 | 65 | 57 | 1,114 | 529 |
| 11-11 01:00 | 34 | 31 | 535 | 265 |
| 11-11 02:00 | 154 | 81 | 1,646 | 916 |

File: [machine.json](machine.json).

## The files

[books.json](books.json) (at a glance), [models.json](models.json), [agents.json](agents.json), [machine.json](machine.json), [outputs.json](outputs.json), [the ledger lines](ledger/), [savings](savings.md), [the measure step](measure.md), briefs: [2026-11-11T0300Z](briefs/2026-11-11T0300Z.md), [2026-11-11T0305Z](briefs/2026-11-11T0305Z.md). The method is WS-148's (an accountant agent: every agent measures its tokens, the accountant finds the savings) from [web-summit.sgit.ai](https://web-summit.sgit.ai).
