---
title: Where the savings are
summary: The largest costs first, what each agent could change, and the saving, measured or estimated and said to be which.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 03:03 UTC

# Where the savings are

Round 3, from what is measured so far: four sessions of 30 in the ledger (conductor, meteorology, stories, the accountant's own) and nine more reported by message, the model ledger, 329 CI runs, and one test of the librarian's pack. Each item says **measured**, **estimated** (our arithmetic) or **hypothesis** (our analysis). Tokens are not turned into money. The figures: [the accounts](index.md).

## 1. Re-reading the session's context on every call is the largest cost (measured, one session)

WS-148's first finding was that re-reading a long session's context on every call dominates. Tested here on the accountant's own session ([its line of 02:56 UTC](ledger/accountant.jsonl)):

| | Tokens | Share |
|---|---|---|
| Cache reads (the context, read again on each call) | 3,073,797 | 95.4% |
| Cache writes (what was new on each call) | 112,558 | 3.5% |
| Output | 34,896 | 1.1% |
| Fresh input | 44 | 0.0% |

23 calls in six minutes. With cache reads weighted at a tenth (WS-148's weight, an estimate) they are still 68% of the session. **The finding holds here.**

Why: the first call carried 84,717 tokens before the agent had read anything (the harness, its tools, the repository's rules); the last carried 182,110. Everything read stays, and is read again by every later call. So a token read at the start of a session costs one cache read per call for the rest of it.

### The conductor's session: 327 million tokens, 99.4% of them re-reading (measured)

The conductor measured its session at 02:58 UTC ([its line](ledger/conductor.jsonl)): one session since 18:56 UTC on 10 November, 758 calls.

| | Tokens | Share |
|---|---|---|
| Cache reads | 325,000,895 | 99.4% |
| Cache writes | 1,546,036 | 0.5% |
| Output | 443,592 | 0.1% |
| Fresh input | 1,755 | 0.0% |

- The context a call carried: 82,622 on the first call, 422,260 at the median, 783,922 at the largest, 527,533 on the last; compacted once.
- Its most expensive hour: 00:00 to 01:00 UTC, 149 calls, 96 million tokens.
- What filled it: 180 reads of the other agents' messages returned 968,742 characters; 272 shell calls returned 340,399; 250 connector calls 145,872. **The reports the agents send the conductor are the largest thing it reads.**
- **Estimated:** had every call carried what the first call did (82,622 tokens), the 758 calls would have read 62.6 million tokens, not 325 million: 81% less. That is the ceiling of what a fresh session per round, started from the pack and the status files, could save; the real saving is lower, because a round's own work must be carried.
- **A fresh conductor session each hour, estimated: 176 million tokens against 327 million, 46% less.** The arithmetic: each hour's calls as the conductor made them (27, 47, 26, 85, 12, 112, 149, 76, 224), each hourly session starting at 96,786 tokens (its measured first call, 82,622, plus the pack's measured 14,164) and growing by 2,040 tokens a call (its measured cache writes over its calls). Not counted: the hand-over note each hour, and what a fresh session must read again to do the hour's work. The busiest hour (224 calls) saves little: a session that long needs splitting by calls, not by the clock.
- **What to change (hypothesis):** (a) the conductor starts a fresh session each round, handing itself a short state file; (b) every agent's report to the conductor is a few numbered lines with a link to its status file, never the detail; (c) the conductor hands routing of agent-to-agent asks to commits addressed `For:`, which cost it nothing.
- **Hypothesis:** the designer's and the librarian's sessions (about 40 commits each, counted by [incident.ci@](../data/ci/index.json)) have the same shape. **Not measured** until each runs [the measure step](measure.md).

### Every long session has the same shape (measured by each agent; nine reported by message)

Lines in the ledger: [meteorology](ledger/meteorology.jsonl) (107 calls, 29.1 million cache reads, 300,599 tokens a call at the median) and [stories](ledger/stories.jsonl) (69 calls, 17.2 million, 263,048). Nine agents ran the tool at about 03:00 UTC and sent their numbers by message, because the path check refused their push (the accountant's error: the measure page said it would only warn; the policy is fixed). **Reported by message, not yet in the ledger:**

| Agent | Calls | Cache reads | Context per call, median | Largest |
|---|---|---|---|---|
| designer | 321 | 143,466,097 | 444,326 | 752,591 |
| librarian | 211 | about 78 million | not reported | 587,000 (last) |
| media | 158 | 49,150,613 | 322,199 | 493,687 |
| entities | 130 | 38,633,731 | 319,747 | 405,961 |
| labs | 79 | 20,463,466 | 270,969 | 351,854 |
| archivist | 93 | 19,907,102 | 230,274 | 286,952 |
| ipma | 75 | 17,596,211 | 266,908 | 328,944 |
| sources | 83 | 17,205,323 | 227,181 | 290,797 |
| ci | 65 | 14,949,586 | 241,920 | 311,755 |

- With the four in the ledger, 13 sessions have read about 774 million tokens from the cache (the sum of the figures above and the ledger's; nine of them reported).
- Every session starts at about 84,000 tokens and none but the conductor's has compacted. Three agents (designer, media, ci) said of their own numbers that a fresh session per wake, started from their status file, would cost far less.
- The designer's session carries about 750,000 tokens on every call, including a wake where nothing changed.

## 2. The librarian's pack: 63% less to read at the start, same answers (measured, two runs)

Two sub-agents started the same job, one from ten whole files, one from the pack ([pack-test.json](pack-test.json), 02:56 UTC):

| Start from | Bytes | Tokens added to the context | Answers right, of 8 |
|---|---|---|---|
| ten whole files | 94,946 | 39,775 | 8 |
| the pack (start, state, the role's pack), 02:56 UTC | 22,950 | 14,164 | 6, and 2 in part |
| the pack after the librarian's correction, 03:01 UTC | 24,364 | 14,734 | 8 |

- **Saved: 25,611 tokens at the start, 64% less** (the librarian's estimate from bytes was 75%: bytes / 4 undercounts, the whole files measured 2.4 bytes a token and the pack 1.6).
- **And on every call after:** those 25,611 tokens are not re-read. Over a session of 100 calls that is about 2.6 million cache-read tokens (estimated: the measured saving times the calls).
- **What the pack cost in quality:** in the first run two answers were incomplete (who merges to main; how rows of one minute are lettered). The librarian added both lines at 03:00 UTC; the second run answered 8 of 8 for 570 tokens more: **25,041 saved, 63% less, with the same answers as the whole files.**
- **The floor the pack cannot move:** 63,800 tokens on a sub-agent's first call, 84,717 on a full session's, before any reading.

## 3. What each agent could change

| Change | Who | Saving | Kind |
|---|---|---|---|
| Start from the pack, open whole files only when needed | every new agent; the conductor's start prompts | 25,611 tokens at the start and per later call | measured, one run |
| A fresh session per wake for agents that wake hourly, started from the pack and their status file | librarian, ci, shadow, ipma, weather and the other hourly desks | the context falls back to the floor each wake instead of growing; size not measured until those sessions report | hypothesis (WS-148 measured it on another team: a wake fell from about 206,000 tokens to about 12,700) |
| Smaller reads: a line range, a grep, `head -c`, a JSON's keys, not the whole file | everyone | each 4,000 characters not read is about 1,000 to 1,700 tokens, times the calls left in the session | estimated from the bytes per token measured in item 2 |
| Quiet commands: the accountant's 25 shell calls returned 126,638 characters, most of what it read | everyone | the same arithmetic | measured (the characters), estimated (the saving) |
| Sub-agents for bounded reading: a sub-agent reads, answers in a few lines, and its reading never enters the main session | long sessions | the pack test's two sub-agents read 117,896 bytes; 2,130 characters came back | measured |

## 4. Models: two models are 80% of the eval spend (measured)

Of 0.73 US dollars in [the ledger](../models/ledger-summary.json) (02:41 UTC), qwen/qwen3.5-397b-a17b took 0.38 and mistralai/mistral-large-4-0 took 0.20: 80% together. The model [incident.models@ chose](../models/which.json) for four of the six jobs, google/gemma-4-31b-it, cost 0.0032 for its 67 calls.

- The evals have done their job: the day's work at the chosen models costs cents (0.0022 to 0.01 US dollars per 100 items, from which.json). The spend is 4.6% of the 20-dollar cap.
- **Hypothesis:** a second eval round that drops the two largest models, or samples them, costs about a fifth of the first. Reasoning switched on costs about twenty times more for the same score on labels (which.json, the last row).
- 75 calls failed (67 with HTTP 400, 8 with HTTP 402) and cost nothing; the 402s say an account ran out of credit, which is for the conductor and Dinis, not a saving.

## 5. CI: cheap, and a third of runs are cancelled (measured)

329 runs, 210 releases, 4,183 s of runner time, 18.8 s a release ([incident.ci@'s data](../data/ci/index.json), 02:54 UTC). 115 runs were cancelled (a newer push overtook them) and 4 failed; together they used 225 s, 5% of the time. Queueing took 2,150 s. In the busiest hour (02:00 UTC) there were 154 runs. Nothing to save here that matters: the cancellations are the pipeline doing its job. **Hypothesis:** one push per wake rather than several would shorten the queue, not the bill.

## What is not known yet

- 26 of 30 agents have no line in the ledger yet; nine of those have reported by message and will push their own. The ask is out to each session; the table fills as lines arrive.
- Tokens per timeline row, story and captured page: the timeline row is measured (an upper bound: the conductor's whole night over 62 rows); the others need the stories agent's and the archivist's lines.
- A fresh session per wake, measured on this team: needs one hourly agent to try it.
- The pack on a full session doing real work, more than one run.
