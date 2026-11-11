---
title: Where the savings are
summary: The largest costs first, what each agent could change, and the saving, measured or estimated and said to be which.
---
> Kept by incident.accountant@web-summit.dinis, 11 November 2026, 03:35 UTC

# Where the savings are

Round 4. 26 of 30 agents have measured their own sessions ([the table](index.md), [the lines](ledger/)); three of them have since started a fresh session, so the first saving is now measured on this team and not only estimated. Each item says **measured**, **estimated** (our arithmetic) or **hypothesis** (our analysis). Tokens are not turned into money.

## 1. Re-reading the session's context on every call is almost the whole cost (measured, 26 sessions)

| | Tokens | Share |
|---|---|---|
| Cache reads (the context, read again on each call) | 1,295,742,639 | 98.8% |
| Cache writes (what was new on each call) | 10,956,218 | 0.8% |
| Output (everything the agents wrote) | 4,447,848 | 0.3% |
| Fresh input | 8,186 | 0.0% |

1.31 billion tokens in 3,943 calls, read from the ledger at 03:33 UTC. WS-148's first finding (re-reading a long session's context on every call dominates) holds here without exception: every session starts at about 84,000 tokens before it reads anything, nothing but the conductor's has compacted, and the long sessions carry 300,000 to 770,000 tokens on every call. With cache reads weighted at a tenth (WS-148's weight, an estimate), they are still 89% of the team's cost.

The six largest sessions are 61% of it: conductor 327 million, designer 157 million, librarian 94 million, observability 84 million, graph 68 million, studio 65 million.

## 2. A fresh session, measured: 74% to 84% less per call

Three agents handed over to a fresh session of themselves at about 03:03 UTC, started from the librarian's pack and a hand-over note. Tokens per call, the old session's last hour against the new session ([designer](ledger/designer.jsonl), [librarian](ledger/librarian.jsonl), [observability](ledger/observability.jsonl)):

| Agent | Old session, calls | Old, tokens per call in its last hour | New session, calls | New, tokens per call | Less per call |
|---|---|---|---|---|---|
| designer | 332 | 761,832 | 33 | 125,417 | 84% |
| librarian | 220 | 596,917 | 58 | 153,786 | 74% |
| observability | 205 | 577,105 | 53 | 145,455 | 75% |

- **Measured.** The new sessions did real rounds (each line names its task and says its gate passed). They are young: their context grows again (the librarian's reached 208,291 after 58 calls), so the hand-over has to be repeated, not done once.
- **When to hand over (estimated):** the sessions here grow by about 2,000 to 3,500 tokens a call. A session that hands over every 50 to 60 calls stays under about 250,000 tokens a call; one that never does reaches 500,000 by its 200th.
- **Who should do it next (measured context on the last call):** graph 559,527; weatherwatch 536,657; studio 534,394; conductor 527,533; media 509,204; weather 469,418; entities 443,316; meteorology 407,146. Each of these pays more than three times a fresh session's cost on every call, including a wake where nothing changed.

### The conductor

One session since 18:56 UTC on 10 November: 758 calls, 327 million tokens, 99.4% cache reads; 422,260 tokens a call at the median, 783,922 at the most, compacted once ([its line](ledger/conductor.jsonl)).

- What filled it: 180 reads of the other agents' messages returned 968,742 characters; 272 shell calls 340,399. **The reports the agents send the conductor are the largest thing it reads.**
- **A fresh conductor session each hour, estimated: 176 million tokens against 327 million, 46% less** (each hour's calls as made, each session starting at 96,786 tokens and growing 2,040 a call, both measured). Handing over every 50 calls instead of every hour would save more: the 224-call hour gains little from the clock.
- **Hypothesis:** reports to the conductor of a few numbered lines with a link to the status file, and agent-to-agent asks by commits addressed `For:`, would cut what it reads by more than half.

## 3. The librarian's pack: 63% less to read at the start, same answers (measured, two runs)

Two sub-agents started the same job, one from ten whole files, one from the pack ([pack-test.json](pack-test.json)):

| Start from | Bytes | Tokens added to the context | Answers right, of 8 |
|---|---|---|---|
| ten whole files | 94,946 | 39,775 | 8 |
| the pack (start, state, the role's pack), 02:56 UTC | 22,950 | 14,164 | 6, and 2 in part |
| the pack after the librarian's correction, 03:01 UTC | 24,364 | 14,734 | 8 |

- **25,041 tokens saved at the start, 63% less, with the same answers as the whole files**, and that many fewer on every later call: over a session of 100 calls about 2.5 million cache-read tokens (estimated: the measured saving times the calls).
- The librarian's own estimate from bytes was 75%: bytes / 4 undercounts (the whole files measured 2.4 bytes a token, the pack 1.6). Its sizes file now uses the measured ratios.
- **The floor the pack cannot move:** about 84,000 tokens on a session's first call, before any reading (the harness, its tools, the repository's rules). The pack is worth about a sixth of that floor; the fresh session is worth far more than the pack. The pack is what makes the fresh session cheap to start.

## 4. What each agent could change

| Change | Who | Saving | Kind |
|---|---|---|---|
| Hand over to a fresh session every 50 to 60 calls, from the pack and a short note | every agent above 300,000 tokens a call (the list in item 2) | 74% to 84% less per call | measured on three agents |
| Start from the pack, open whole files only when needed | every new agent | 25,041 tokens at the start and per later call | measured, two runs |
| Short reports: a few numbered lines and a link | everyone who reports to the conductor | the conductor read 968,742 characters of reports | measured (the characters), hypothesis (the saving) |
| Quiet commands and smaller reads: a line range, a grep, a JSON's keys | everyone: shell output is the largest thing every agent but the conductor reads | each 4,000 characters not read is about 1,000 to 1,700 tokens, times the calls left in the session | estimated from the measured bytes per token |
| Sub-agents for bounded reading: the reading never enters the main session | long sessions | the pack test's sub-agents read 142,260 bytes; about 3,000 characters came back | measured |
| No wake when nothing changed | hourly desks | a wake costs at least one call at the session's full context | measured (the context), hypothesis (how many wakes are empty) |

## 5. Cost per output (measured, upper bounds)

| Output | Count | Tokens each, all | Weighted tokens each |
|---|---|---|---|
| timeline row | 64 | 5,109,254 | 538,929 |
| story | 4 | 5,130,188 | 609,253 |
| captured page | 234 | 114,526 | 12,746 |

The whole session of the agent that makes the thing, over the count ([outputs.json](outputs.json), 03:33 UTC). The conductor also led the team in the session that wrote the rows, so a row's figure is far above its real cost; a captured page is the nearest to a true unit cost here.

## 6. Models: about a dollar, and the account is empty (measured and reported)

- 1.06 of 20 US dollars today: 0.87 measured in [the ledger](../models/ledger-summary.json) (03:06 UTC), 0.19 reported by the shadow desk. The provider's own count on the team's key was 1.09 at 02:57 UTC (reported by incident.models@).
- In the first eval round two models (qwen/qwen3.5-397b-a17b and mistralai/mistral-large-4-0) were 80% of the spend; the model [incident.models@ chose](../models/which.json) for four of six jobs, google/gemma-4-31b-it, cost a third of a cent for its 67 calls. The day's work at the chosen models costs cents.
- **The provider's account has no credit** since 02:55 UTC ([provider.json](provider.json)): every call is refused. That is for Dinis; it is not a saving.
- Not counted: the perplexity agent's calls (no ledger summary of its own yet).

## 7. CI: cheap (measured)

414 runs, 253 releases, about 19 s a release ([machine.json](machine.json), from [incident.ci@'s data](../data/ci/index.json)). About a third of runs are cancelled by a newer push and cost almost nothing. Nothing to save here that matters.

## What is not known yet

- Four agents have no line: dev, meteorologist, researcher (they work in another repository; the conductor relays their lines) and wikipedia.
- The team's tokens per release: needs all 30.
- How many hourly wakes find nothing changed.
- The model the agents run on is one for all jobs; whether a smaller one would do for the hourly data refreshes has not been tested (WS-148 tests it with the same task on each candidate; not done here).
