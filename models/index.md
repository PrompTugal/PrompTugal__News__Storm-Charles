---
title: Other models, measured
summary: Checkable tasks, taken from this site's own verified data, run on open-weight and commercial models: accuracy, cost per item, latency, refusals, malformed answers, and the spend.
mount: <div id="models" data-view="index" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the tables below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Other models, measured

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.**

## The answer to "have we started using other models?"

Yes. On 2026-11-11 this desk's wrapper made **1,291 answered model calls** to **14 third-party models** and spent **0.8724 US dollars** (1,039,681 tokens in, 559,894 out); with what the other desks report, the team is at **1.0624 of the day's 20 US dollars**. Source: [ledger-summary.json](ledger-summary.json), written 02:59 UTC. Before 02:21 UTC on 11 November the ledger held no call. A further 3,631 calls were refused or failed at the provider and cost nothing (3,557 of them 'Insufficient credits' on the OpenRouter account, from 02:55 UTC).

**Round 2 is partial.** Round 2 (from 02:53 UTC: a harder warnings task, all 46 timeline rows, three whole paragraphs to translate, each item three times, reasoning on and off as separate rows) stopped part-way: from 02:55 UTC OpenRouter refused every call with 'Insufficient credits' (the account's balance, not this team's cap: the team had spent about a dollar). Refused calls are not answers and are not in the results. What completed is shown and marked partial; the rest runs when the account has credits.

No model writes anything on this site. What follows is a measurement: could these models do a curator's small jobs, and at what price. A page for each model, the open-weight ones first: [the models](models/index.md).

## What we asked

| Task | Items | The input | The answer it is scored against |
|---|---|---|---|
| [Warnings in force at an hour](warnings-in-force.md) | 13 | All seventeen CAP messages held for the Lisbon district, oldest first, and one hour of 11 or 12 November (`weather/cap.json`) | The warnings in force at that hour by IPMA's own warnings API as read (`weather/warnings.json`): type, level, end |
| [Extract a decision](extract-decision.md) | 10 | A short official passage (the government's declaration, IPMA's CAP message or communiqué, one quoted line of an organiser's or operator's own page), with where it was published | The decision graph's edge: its decider and effect window, null where the source states no clock hour (`decisions/graph.json`); for two CAP messages with no edge, the message's own onset and expires |
| [Label fact, evidence, hypothesis](label.md) | 46 | A row of our timeline (its text without the leading 'signal:' or 'analysis' marker) and its source labels (`signals.json`) | The row's label in `signals.json`: fact, evidence or hypothesis |
| [Translate, figures kept](translate.md) | 23 | IPMA's Portuguese warning text, or one sentence of its communiqué no. 2 (`weather/cap.json`, `warnings.json`, `communiques.json`) | The figures and units of the Portuguese text itself; there is no reference translation |
| [Extract a warning](extract-warning.md) | 17 | An IPMA CAP message (event, onset, expires, area and description in Portuguese), as kept in `weather/cap.json` | The same record's type, level, area, start and end, normalised (`weather/cap.json`) |

Every gold answer is copied by `tools/models-items.mjs` from the data room; none was written for the test. Each model got the same instruction, temperature 0 where the model takes it, 4,000 tokens of room. Scoring is automatic and exact, field by field. **A row is a model at one reasoning setting**: where a model can reason and can be told not to, reasoning off is the default row and reasoning on is a separate row; three models reason whatever they are told. Each item is asked three times of the cheap rows and once of the dear ones.

## What we got

Runs right out of runs asked, per task (an item asked three times counts three). Source for every figure on this page: [results.json](results.json) (made 2026-11-11 02:59 UTC from the runs) and [ledger-summary.json](ledger-summary.json).

| Model, reasoning | Kind | [Warnings in force at an hour](warnings-in-force.md) | [Extract a decision](extract-decision.md) | [Label fact, evidence, hypothesis](label.md) | [Translate, figures kept](translate.md) | [Extract a warning](extract-warning.md) | All | Not answered | Cost per item, USD | Median latency, s |
|---|---|---|---|---|---|---|---|---|---|---|
| [`google/gemma-3-4b-it`](models/google--gemma-3-4b-it.md): does not reason | open-weight, small | 0/11 | 3/10 | 8/20 | 20/20 | 17/17 | **48/78** | 0 | 0.000037 | 2.8 |
| [`openai/gpt-oss-20b`](models/openai--gpt-oss-20b.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, small | 4/8 | 9/10 | 15/20 | 20/20 | 17/17 | **65/75** | 4 | 0.00013 | 2.3 |
| [`mistralai/ministral-8b-2512`](models/mistralai--ministral-8b-2512.md): does not reason | open-weight, small | 0/39 | 8/10 | 14/20 | 0/20 | 17/17 | **39/106** | 0 | 0.00021 | 0.9 |
| [`qwen/qwen3.5-9b#reasoning-off`](models/qwen--qwen3.5-9b.md): off (asked) | open-weight, small | 0/28 | 6/10 | 10/20 | 20/20 | 17/17 | **53/95** | 0 | 0.00012 | 1.3 |
| [`qwen/qwen3.5-9b`](models/qwen--qwen3.5-9b.md): on (the provider's default) | open-weight, small | 0/4 | 9/10 | 12/20 | 15/20 | 17/17 | **53/71** | 15 | 0.00041 | 26.3 |
| [`google/gemma-4-31b-it`](models/google--gemma-4-31b-it.md): off (the provider's default) | open-weight, large | 33/39 | 10/10 | 17/20 | 20/20 | 17/17 | **97/106** | 0 | 0.00018 | 1.0 |
| [`google/gemma-4-31b-it#reasoning-on`](models/google--gemma-4-31b-it.md): on (asked, medium effort) | open-weight, large | 10/10 |  |  |  |  | **10/10** | 0 | 0.00131 | 22.7 |
| [`meta-llama/llama-4-maverick`](models/meta-llama--llama-4-maverick.md): does not reason | open-weight, large | 4/39 | 10/10 | 17/20 | 20/20 | 17/17 | **68/106** | 0 | 0.00038 | 0.9 |
| [`deepseek/deepseek-v4.1-flash#reasoning-off`](models/deepseek--deepseek-v4.1-flash.md): off (asked) | open-weight, large | 16/24 |  |  |  |  | **16/24** | 0 | 0.00044 | 0.7 |
| [`deepseek/deepseek-v4.1-flash`](models/deepseek--deepseek-v4.1-flash.md): on (the provider's default) | open-weight, large | 11/11 | 10/10 | 17/20 | 20/20 | 17/17 | **75/78** | 1 | 0.00054 | 3.0 |
| [`qwen/qwen3.5-397b-a17b#reasoning-off`](models/qwen--qwen3.5-397b-a17b.md): off (asked) | open-weight, large |  | 10/10 | 12/15 | 17/17 | 17/17 | **56/59** | 0 | 0.00022 | 1.4 |
| [`qwen/qwen3.5-397b-a17b`](models/qwen--qwen3.5-397b-a17b.md): on (the provider's default) | open-weight, large |  | 9/10 | 16/20 | 16/20 | 17/17 | **58/67** | 7 | 0.00553 | 15.8 |
| [`mistralai/mistral-large-4-0`](models/mistralai--mistral-large-4-0.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, large |  | 10/10 | 17/20 | 19/20 | 17/17 | **63/67** | 2 | 0.00301 | 5.6 |
| [`openai/gpt-6-luna`](models/openai--gpt-6-luna.md): off (the provider's default) | commercial, small | 15/17 | 9/10 | 16/20 | 20/20 | 17/17 | **77/84** | 0 | 0.000095 | 2.6 |
| [`openai/gpt-6-luna#reasoning-on`](models/openai--gpt-6-luna.md): on (asked, medium effort) | commercial, small | 5/5 |  |  |  |  | **5/5** | 0 | 0.00033 | 3.4 |
| [`google/gemini-3.5-flash-lite`](models/google--gemini-3.5-flash-lite.md): reasons; cannot be turned off (the provider refuses the setting) | commercial, small |  | 10/10 | 17/20 | 20/20 | 17/17 | **64/67** | 0 | 0.00018 | 0.7 |
| [`anthropic/claude-haiku-5.5`](models/anthropic--claude-haiku-5.5.md): off (the provider's default) | commercial, small | 3/3 | 10/10 | 15/20 | 20/20 | 17/17 | **65/70** | 0 | 0.00012 | 1.0 |
| [`anthropic/claude-haiku-5.5#reasoning-on`](models/anthropic--claude-haiku-5.5.md): on (asked, medium effort) | commercial, small | 1/1 |  |  |  |  | **1/1** | 0 | 0.00064 | 3.3 |
| [`openai/gpt-6.1-terra`](models/openai--gpt-6.1-terra.md): off (the provider's default) | commercial, large |  | 10/10 | 16/20 | 20/20 | 17/17 | **63/67** | 0 | 0.00065 | 1.9 |

"Not answered" counts answers that were not the JSON asked for, were cut off at the token limit, were refusals, or failed at the provider. Latency is the median over a task's runs, then the median over tasks, measured from this session through OpenRouter (it includes their routing). The spread between runs is on each task's page.

**How to read it.** With 10 to 20 items a task, one item is 5 to 10 points: a model at 17 of 20 and one at 16 of 20 are not told apart by this. What round 1 does show: the copy-a-field task is too easy to separate anything (every model, every item); the smallest models fall away as soon as a rule has to be applied; and the price for the same answers differs by a factor of about a hundred, mostly because some models reason at length by default. **Round 2 is partial.** Round 2 (from 02:53 UTC: a harder warnings task, all 46 timeline rows, three whole paragraphs to translate, each item three times, reasoning on and off as separate rows) stopped part-way: from 02:55 UTC OpenRouter refused every call with 'Insufficient credits' (the account's balance, not this team's cap: the team had spent about a dollar). Refused calls are not answers and are not in the results. What completed is shown and marked partial; the rest runs when the account has credits. The one new task that ran far enough to read, warnings in force at an hour, does separate the models: see its page.

## Which model for which job here

*For the other agents: which model to call for which job on this site, from round 1. Our choice, a hypothesis from small samples; the figures beside each are that model's on the task named. Every call through tools/models-ask.mjs or tools/llm.mjs; reasoning off unless the row says otherwise; a model's output never reaches a page without the check in the last column.* As data: [which.json](which.json).

| Job | Call | Right in the runs | USD per 100 items | Median seconds | The check before anything is used |
|---|---|---|---|---|---|
| A CAP message or IPMA's JSON into our fields | no model: a parser |  | 0 |  | the parser's own tests; a model only when the text is prose |
| A warning or decision in official prose into fields (who, hours) | `google/gemma-4-31b-it` | 10/10 ([extract a decision](extract-decision.md)) | 0.01 | 1.1 | a second model (`google/gemini-3.5-flash-lite`) on the same text; where the two differ, a person reads the source. A null hour stays null |
| English gloss of IPMA's Portuguese warning text | `google/gemma-4-31b-it` | 20/20 ([translate, figures kept](translate.md)) | 0.0022 | 0.5 | the figures check (every number and unit of the Portuguese in the English); the Portuguese always shown beside it |
| The same gloss, at volume (thousands of texts) | `google/gemma-3-4b-it` | 20/20 ([translate, figures kept](translate.md)) | 0.0005 | 1.5 | the figures check; not for anything but translation (8 of 20 on labels, 3 of 10 on decisions) |
| A second reader of a timeline row's label | `google/gemma-4-31b-it` and `meta-llama/llama-4-maverick`, both | 17/20 ([label fact, evidence, hypothesis](label.md)) | 0.0034 | 0.4 | never the labeller: a row is flagged for the lead only when both disagree with the label |
| The same, when the row is hard and a few seconds do not matter | `deepseek/deepseek-v4.1-flash`, reasoning on (its default) | 17/20 ([label fact, evidence, hypothesis](label.md)) | 0.0762 | 3 | as above. Reasoning on is what it costs here: about twenty times the price of the row above for the same 17 of 20 |

**What 100 timeline rows cost.** Labelling and decision extraction, per 100 items, at the prices OpenRouter reported (from [results.json](results.json), `usd_per_100_items`):

| Model, reasoning | Label 100 rows, USD | Right on labels | Extract 100 decisions, USD | Right on decisions |
|---|---|---|---|---|
| `google/gemma-3-4b-it`: does not reason | 0.0012 | 8/20 | 0.0032 | 3/10 |
| `openai/gpt-oss-20b`: reasons; cannot be turned off (the provider refuses the setting) | 0.0065 | 15/20 | 0.0109 | 9/10 |
| `mistralai/ministral-8b-2512`: does not reason | 0.0035 | 14/20 | 0.0078 | 8/10 |
| `qwen/qwen3.5-9b#reasoning-off`: off (asked) | 0.0027 | 10/20 | 0.0073 | 6/10 |
| `qwen/qwen3.5-9b`: on (the provider's default) | 0.0399 | 12/20 | 0.0415 | 9/10 |
| `google/gemma-4-31b-it`: off (the provider's default) | 0.0034 | 17/20 | 0.0100 | 10/10 |
| `meta-llama/llama-4-maverick`: does not reason | 0.0079 | 17/20 | 0.0207 | 10/10 |
| `deepseek/deepseek-v4.1-flash`: on (the provider's default) | 0.0762 | 17/20 | 0.0490 | 10/10 |
| `qwen/qwen3.5-397b-a17b#reasoning-off`: off (asked) | 0.0135 | 12/15 | 0.0443 | 10/10 |
| `qwen/qwen3.5-397b-a17b`: on (the provider's default) | 0.4714 | 16/20 | 0.6081 | 9/10 |
| `mistralai/mistral-large-4-0`: reasons; cannot be turned off (the provider refuses the setting) | 0.3331 | 17/20 | 0.3279 | 10/10 |
| `openai/gpt-6-luna`: off (the provider's default) | 0.0074 | 16/20 | 0.0124 | 9/10 |
| `google/gemini-3.5-flash-lite`: reasons; cannot be turned off (the provider refuses the setting) | 0.0101 | 17/20 | 0.0358 | 10/10 |
| `anthropic/claude-haiku-5.5`: off (the provider's default) | 0.0107 | 15/20 | 0.0224 | 10/10 |
| `openai/gpt-6.1-terra`: off (the provider's default) | 0.0748 | 16/20 | 0.0999 | 10/10 |

So a second reader on every row of a 100-row timeline costs under one US cent on the two large open-weight models that answer without reasoning (Gemma 4 31B, Llama 4 Maverick), and 30 to 60 cents on the two that reason at length by default. Reasoning off is the default row; what it costs when on is the row beside it.

## What we would use each for

*Our reading of the table: a hypothesis, from small samples, to be re-run as the item sets grow.*

- **Turning a structured official message (CAP, IPMA's JSON) into our fields**: a small open-weight model (`google/gemma-3-4b-it`, or `google/gemma-4-31b-it` for a margin), or no model at all: the cheapest got 17 of 17, and a parser does this for nothing and cannot be wrong in new ways. A model earns its place only when the text is prose.
- **Extracting who decided and for which hours from official prose**: a large open-weight model (`google/gemma-4-31b-it`, `meta-llama/llama-4-maverick`, `deepseek/deepseek-v4.1-flash`) or a cheap commercial one (`google/gemini-3.5-flash-lite`, `anthropic/claude-haiku-5.5`): each got 10 of 10 at 0.0001 to 0.0005 US dollars an item. Not the models under about 10 billion parameters: they invent hours. Whatever the model, a null window stays null until a person or the source fills it.
- **A first translation of IPMA's warning text for the English gloss the Weather face asks for**: `google/gemma-4-31b-it` or `meta-llama/llama-4-maverick`, with the figures check run on every output and the Portuguese always shown beside it. IPMA's text is the warning; the English is a reading aid and says so.
- **Labelling fact, evidence, hypothesis**: none on its own yet: the best agree with our labels on 17 of 20 and the disagreements are informative. Useful now as a second reader that flags rows where several models disagree with the lead's label, for the lead to look at; never as the labeller.
- **Anything in a loop, every few minutes**: not the models that reason by default (`qwen/qwen3.5-397b-a17b`, `mistralai/mistral-large-4-0`, `qwen/qwen3.5-9b`) at their default settings: for the same answers they took 10 to 30 seconds an item and the two large ones cost more than the other eleven models together. Asked not to reason (the rows marked `#reasoning-off`), the two Qwen models cost a fifteenth to a seventieth as much. The small one did as well on translation (20 of 20, having stopped running out of tokens) and worse where a rule is weighed (labels 12 to 10 of 20, decisions 9 to 6 of 10). The large one did as well everywhere it answered: decisions 10 of 10, translation 17 of 17, labels 12 of 15 against 16 of 20 with reasoning. **A correction:** at 02:39 UTC this page said the large one fell from 16 to 12 of 20 on labels; five of those 20 calls had been refused by the provider for lack of credits and were counted as wrong answers. They are now left out. Mistral Large 4, GPT-OSS 20B and Gemini 3.5 Flash Lite reason whatever they are told (the provider refuses the setting).
- **What other sources and answer engines say (the shadow report)**: an answer engine with search (`perplexity/sonar`, about half a cent a question in one test call), through the same wrapper, its answer kept as evidence about the engine, with the pages it cites. Measured by incident.shadow@, not here: its first round is at shadow/.

## What the models tell us about our own data

The label task doubles as a check of the timeline, and it found a gap in our labels rather than a wrong label: on three rows most models disagree with the lead's label, and all three are things we counted or observed ourselves ([s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2358), [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.md#s-1111T0015), [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2153)). The lead keeps the labels; the question it raises for Dinis, with each row and each model's answer, is on [the label page](label.md).

## The spend

From the ledger's summary ([ledger-summary.json](ledger-summary.json), 2026-11-11 02:59 UTC). Costs are what OpenRouter reported for each call. **The cap: 20 US dollars a day for the whole team** (Dinis, 11 November ~02:50 UTC, [BRIEF.md](../BRIEF.md); 5 before), kept as shares ([budgets.json](budgets.json)): a ledger lives in the session that makes the calls, so each agent's calls are refused once its own share is spent.

| By agent | Share of the day, USD | Calls | Spent, USD |
|---|---|---|---|
| incident.models@web-summit.dinis (this ledger) | 6 | 4922 | 0.8724 |
| incident.shadow@ (its own session's ledger; the figure its status file gives, 02:40 UTC: [agents/shadow/status.json](../agents/shadow/status.json)) | 1 | not given | 0.1900 |
| **the team, today** | **20** | | **1.0624** |

| By task | Calls | Tokens in | Tokens out | USD |
|---|---|---|---|---|
| `WS-214/eval/translate` | 1041 | 29661 | 138359 | 0.2391 |
| `WS-214/eval/label` | 2055 | 89938 | 139766 | 0.2124 |
| `WS-214/eval/extract-warning` | 771 | 73440 | 84686 | 0.1433 |
| `WS-214/eval/warnings-in-force` | 572 | 730756 | 121028 | 0.1409 |
| `WS-214/eval/extract-decision` | 456 | 115387 | 75687 | 0.1311 |
| `WS-214/models/ask-smoke` | 1 | 23 | 44 | 0.00502 |
| `WS-214/models/probe-reasoning` | 24 | 460 | 321 | 0.00056 |
| `WS-214/models/smoke` | 1 | 16 | 3 | 0.000001 |
| `WS-214/models/credit-check` | 1 | 0 | 0 | 0 |
| **all** | **4922** | **1039681** | **559894** | **0.8724** |

| By model | Calls | Tokens in | Tokens out | USD |
|---|---|---|---|---|
| `qwen/qwen3.5-397b-a17b` | 444 | 38229 | 110374 | 0.3835 |
| `mistralai/mistral-large-4-0` | 179 | 18737 | 86661 | 0.2018 |
| `deepseek/deepseek-v4.1-flash` | 439 | 118218 | 54808 | 0.0541 |
| `openai/gpt-6.1-terra` | 439 | 18111 | 5213 | 0.0437 |
| `qwen/qwen3.5-9b` | 444 | 152023 | 174932 | 0.0431 |
| `meta-llama/llama-4-maverick` | 327 | 115362 | 5657 | 0.0399 |
| `google/gemma-4-31b-it` | 439 | 178156 | 26849 | 0.0321 |
| `mistralai/ministral-8b-2512` | 327 | 147329 | 9559 | 0.0219 |
| `google/gemini-3.5-flash-lite` | 330 | 19361 | 2649 | 0.0123 |
| `anthropic/claude-haiku-5.5` | 439 | 50133 | 12431 | 0.0111 |
| `openai/gpt-6-luna` | 447 | 78218 | 9772 | 0.0106 |
| `openai/gpt-oss-20b` | 330 | 47437 | 50322 | 0.0103 |
| `perplexity/sonar` | 1 | 23 | 44 | 0.00502 |
| `google/gemma-3-4b-it` | 337 | 58344 | 10623 | 0.00303 |

**The budget.** The team's cap is 20 US dollars a day from 02:50 UTC on 11 November (5 before); this desk's share is 6 and it has spent about 0.87. Round 2 in full (109 items, 20 rows, three runs of the cheap rows) is about 2 to 3 dollars. It needs credits on the OpenRouter account first: the account's balance, which is not ours to top up, ran out at 02:55 UTC.

## How it is kept

- Every call goes through [`tools/llm.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/llm.mjs): one ledger line per call, the raw request and response in a store outside git (an encrypted vault), a daily cap kept as shares.
- The items: `models/evals/<task>/items.json`. Each model's parsed answers: `models/evals/<task>/results/<model>.json` (each with the sha256 of its raw record). The roster: [models.json](evals/models.json); the licences: [licences.json](evals/licences.json).
- Run again: `node tools/models-items.mjs && node tools/models-run.mjs && node tools/models-report.mjs`.
- For agents: the table is [results.json](results.json); which model for which job is [which.json](which.json); the spend is [ledger-summary.json](ledger-summary.json).
- Asking a model from another desk: [agents/models/ask.md](../agents/models/ask.md).
