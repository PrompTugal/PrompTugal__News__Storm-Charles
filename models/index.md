---
title: Other models, measured
summary: The same checkable tasks, taken from this site's own verified data, run on open-weight and commercial models: accuracy, cost per item, latency, refusals, malformed answers, and the spend.
mount: <div id="models" data-view="index" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the tables below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Other models, measured

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:39 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.**

## The answer to "have we started using other models?"

Yes. On 2026-11-11 the team's wrapper made **1098 model calls** to **14 third-party models** and spent **0.7310 US dollars** of the day's 5 dollar cap (308,465 tokens in, 438,545 out). Source: [ledger-summary.json](ledger-summary.json), written 02:39 UTC. Before 02:21 UTC on 11 November the ledger held no call.

No model writes anything on this site yet. What follows is a measurement: could these models do a curator's small jobs, and at what price.

## What we asked

| Task | Items | The input | The answer it is scored against |
|---|---|---|---|
| [Extract a warning](extract-warning.md) | 17 | An IPMA CAP message (event, onset, expires, area and description in Portuguese), as kept in `weather/cap.json` | The same record's type, level, area, start and end, normalised (`weather/cap.json`) |
| [Extract a decision](extract-decision.md) | 10 | A short official passage (the government's declaration, IPMA's CAP message or communiqué, one quoted line of an organiser's or operator's own page), with where it was published | The decision graph's edge: its decider and effect window, null where the source states no clock hour (`decisions/graph.json`); for two CAP messages with no edge, the message's own onset and expires |
| [Label fact, evidence, hypothesis](label.md) | 20 | A row of our timeline (its text without the leading 'signal:' or 'analysis' marker) and its source labels (`signals.json`) | The row's label in `signals.json`: fact, evidence or hypothesis |
| [Translate, figures kept](translate.md) | 20 | IPMA's Portuguese warning text, or one sentence of its communiqué no. 2 (`weather/cap.json`, `warnings.json`, `communiques.json`) | The figures and units of the Portuguese text itself; there is no reference translation |

Every gold answer is copied by `tools/models-items.mjs` from the data room; none was written for the test. Each model got the same instruction, at its own default settings (a model that reasons by default was left to), temperature 0 where the model takes it, 4,000 tokens of room. Scoring is automatic and exact, field by field.

## What we got

Right answers out of items asked, per task. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 02:39 UTC from the runs below) and [ledger-summary.json](ledger-summary.json).

| Model | Kind | [Extract a warning](extract-warning.md) | [Extract a decision](extract-decision.md) | [Label fact, evidence, hypothesis](label.md) | [Translate, figures kept](translate.md) | All | Not answered | Cost per item, USD | Median latency, s |
|---|---|---|---|---|---|---|---|---|---|
| `google/gemma-3-4b-it` | open-weight, small | 17/17 | 3/10 | 8/20 | 20/20 | **48/67** | 0 | 0.000014 | 1.5 |
| `openai/gpt-oss-20b` | open-weight, small | 17/17 | 9/10 | 15/20 | 20/20 | **61/67** | 0 | 0.000067 | 1.8 |
| `mistralai/ministral-8b-2512` | open-weight, small | 17/17 | 8/10 | 14/20 | 0/20 | **39/67** | 0 | 0.000040 | 0.8 |
| `qwen/qwen3.5-9b` | open-weight, small | 17/17 | 9/10 | 12/20 | 15/20 | **53/67** | 11 | 0.00036 | 26.0 |
| `qwen/qwen3.5-9b#reasoning-off` | open-weight, small | 17/17 | 6/10 | 10/20 | 20/20 | **53/67** | 0 | 0.000033 | 0.7 |
| `google/gemma-4-31b-it` | open-weight, large | 17/17 | 10/10 | 17/20 | 20/20 | **64/67** | 0 | 0.000048 | 0.5 |
| `meta-llama/llama-4-maverick` | open-weight, large | 17/17 | 10/10 | 17/20 | 20/20 | **64/67** | 0 | 0.00010 | 0.7 |
| `deepseek/deepseek-v4.1-flash` | open-weight, large | 17/17 | 10/10 | 17/20 | 20/20 | **64/67** | 1 | 0.00039 | 1.4 |
| `qwen/qwen3.5-397b-a17b` | open-weight, large | 17/17 | 9/10 | 16/20 | 16/20 | **58/67** | 7 | 0.00553 | 15.8 |
| `qwen/qwen3.5-397b-a17b#reasoning-off` | open-weight, large | 17/17 | 10/10 | 12/20 | 17/20 | **56/67** | 8 | 0.00019 | 1.4 |
| `mistralai/mistral-large-4-0` | open-weight, large | 17/17 | 10/10 | 17/20 | 19/20 | **63/67** | 2 | 0.00301 | 5.6 |
| `openai/gpt-6-luna` | commercial, small | 17/17 | 9/10 | 16/20 | 20/20 | **62/67** | 0 | 0.000072 | 2.6 |
| `google/gemini-3.5-flash-lite` | commercial, small | 17/17 | 10/10 | 17/20 | 20/20 | **64/67** | 0 | 0.00018 | 0.7 |
| `anthropic/claude-haiku-5.5` | commercial, small | 17/17 | 10/10 | 15/20 | 20/20 | **62/67** | 0 | 0.000097 | 0.8 |
| `openai/gpt-6.1-terra` | commercial, large | 17/17 | 10/10 | 16/20 | 20/20 | **63/67** | 0 | 0.00065 | 1.9 |

"Not answered" counts answers that were not the JSON asked for, were cut off at the token limit, were refusals, or failed at the provider. Latency is the median over a task's items, then the median over tasks, measured from this session through OpenRouter (it includes their routing).

**How to read it.** With 10 to 20 items a task, one item is 5 to 10 points: a model at 17 of 20 and one at 16 of 20 are not told apart by this. What the round does show: the first task is too easy to separate anything (every model, every item); the smallest models fall away as soon as a rule has to be applied rather than a field copied; and the price for the same answers differs by a factor of about a hundred, mostly because some models reason at length by default.

## What we would use each for

*Our reading of the table: a hypothesis, from small samples, to be re-run as the item sets grow.*

- **Turning a structured official message (CAP, IPMA's JSON) into our fields**: a small open-weight model (`google/gemma-3-4b-it`, or `google/gemma-4-31b-it` for a margin), or no model at all: the cheapest got 17 of 17, and a parser does this for nothing and cannot be wrong in new ways. A model earns its place only when the text is prose.
- **Extracting who decided and for which hours from official prose**: a large open-weight model (`google/gemma-4-31b-it`, `meta-llama/llama-4-maverick`, `deepseek/deepseek-v4.1-flash`) or a cheap commercial one (`google/gemini-3.5-flash-lite`, `anthropic/claude-haiku-5.5`): each got 10 of 10 at 0.0001 to 0.0005 US dollars an item. Not the models under about 10 billion parameters: they invent hours. Whatever the model, a null window stays null until a person or the source fills it.
- **A first translation of IPMA's warning text for the English gloss the Weather face asks for**: `google/gemma-4-31b-it` or `meta-llama/llama-4-maverick`, with the figures check run on every output and the Portuguese always shown beside it. IPMA's text is the warning; the English is a reading aid and says so.
- **Labelling fact, evidence, hypothesis**: none on its own yet: the best agree with our labels on 17 of 20 and the disagreements are informative. Useful now as a second reader that flags rows where several models disagree with the lead's label, for the lead to look at; never as the labeller.
- **Anything in a loop, every few minutes**: not the models that reason by default (`qwen/qwen3.5-397b-a17b`, `mistralai/mistral-large-4-0`, `qwen/qwen3.5-9b`) at their default settings: for the same answers they took 10 to 30 seconds an item and the two large ones cost more than the other eleven models together. Asked not to reason (the rows marked `#reasoning-off`), the two Qwen models cost about a fifteenth as much and did as well or better on extraction and translation (the small one went from 15 to 20 of 20 on translation, having stopped running out of tokens), and worse on labelling (16 to 12 and 12 to 10 of 20): the reasoning buys something only where a rule has to be weighed. Mistral's provider refused the setting.
- **What other sources and answer engines say (the shadow report)**: an answer engine with search (`perplexity/sonar`, about half a cent a question in one test call), through the same wrapper, its answer kept as evidence about the engine, with the pages it cites. Measured by incident.shadow@, not here: its first round is at shadow/.

## What the models tell us about our own data

The label task doubles as a check of the timeline. Rows where most models disagree with our label, for the lead to look at (the label is the lead's to decide): [s-1110T2358](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2358) and [s-1111T0015](../incidents/2026-11-10-storm-charles/timeline.md#s-1111T0015) are marked as analysis, so hypothesis, and are counts made from our own media dataset: every model but two read them as fact or evidence. They may need a word of their own (a measurement by us, with its limits) rather than the label a forecast-like reading wears. [s-1110T2153](../incidents/2026-11-10-storm-charles/timeline.md#s-1110T2153) (a fact by our rule) split the models between fact, evidence and hypothesis: it mixes what a watcher found with what is still open. Each row's answers are on [the label page](label.md).

## The spend

From the ledger's summary ([ledger-summary.json](ledger-summary.json), 2026-11-11 02:39 UTC). Costs are what OpenRouter reported for each call.

| By task | Calls | Tokens in | Tokens out | USD |
|---|---|---|---|---|
| `WS-214/eval/translate` | 326 | 29661 | 138359 | 0.2391 |
| `WS-214/eval/label` | 326 | 89938 | 139766 | 0.2124 |
| `WS-214/eval/extract-warning` | 278 | 73440 | 84686 | 0.1433 |
| `WS-214/eval/extract-decision` | 166 | 115387 | 75687 | 0.1311 |
| `WS-214/models/ask-smoke` | 1 | 23 | 44 | 0.00502 |
| `WS-214/models/smoke` | 1 | 16 | 3 | 0.000001 |
| **all** | **1098** | **308465** | **438545** | **0.7310** |

| By model | Calls | Tokens in | Tokens out | USD |
|---|---|---|---|---|
| `qwen/qwen3.5-397b-a17b` | 134 | 38229 | 110374 | 0.3835 |
| `mistralai/mistral-large-4-0` | 134 | 18709 | 86561 | 0.2016 |
| `openai/gpt-6.1-terra` | 67 | 18054 | 5186 | 0.0435 |
| `qwen/qwen3.5-9b` | 142 | 42755 | 153578 | 0.0287 |
| `deepseek/deepseek-v4.1-flash` | 67 | 20143 | 33987 | 0.0261 |
| `google/gemini-3.5-flash-lite` | 67 | 19348 | 2644 | 0.0123 |
| `meta-llama/llama-4-maverick` | 67 | 18330 | 2222 | 0.00687 |
| `anthropic/claude-haiku-5.5` | 67 | 27356 | 7713 | 0.00653 |
| `openai/gpt-6-luna` | 75 | 20592 | 6901 | 0.00545 |
| `perplexity/sonar` | 1 | 23 | 44 | 0.00502 |
| `openai/gpt-oss-20b` | 67 | 21817 | 18620 | 0.00450 |
| `google/gemma-4-31b-it` | 67 | 20572 | 2914 | 0.00322 |
| `mistralai/ministral-8b-2512` | 67 | 19487 | 3744 | 0.00267 |
| `google/gemma-3-4b-it` | 76 | 23050 | 4057 | 0.00109 |

| By agent | Calls | USD |
|---|---|---|
| incident.models@web-summit.dinis | 1098 | 0.7310 |
| shadow (its own session's ledger; the figure its status file gives, 02:40 UTC: [agents/shadow/status.json](../agents/shadow/status.json)) | not given | 0.1900 |
| **the team, today** | | **0.9210** of 5 |

**The budget.** This agent planned at most 2 of the day's 5 US dollars and the first round used about 0.72. What more would buy: the whole round again costs about 0.70 as run, or about 0.15 without the two models that reason at length. So 1 more dollar buys the harder versions of all four tasks (three to four times the items) on the eleven cheaper models; 5 dollars buys those on every model plus each item three times over, which is what turns '17 of 20' into a figure with an error bar; a frontier commercial model on the full set is about 0.50 to 2 dollars a round on its own.

## The models

Read from [OpenRouter's public model list](https://openrouter.ai/api/v1/models) at 2026-11-11 02:19 UTC. "Open-weight" here means that list gives a Hugging Face address for the weights.

| Model | Name | Kind | Weights | List price in, out (USD per million tokens) |
|---|---|---|---|---|
| `google/gemma-3-4b-it` | Google: Gemma 3 4B | open-weight, small | [Hugging Face](https://huggingface.co/google/gemma-3-4b-it) | 0.05, 0.1 |
| `openai/gpt-oss-20b` | OpenAI: gpt-oss-20b | open-weight, small | [Hugging Face](https://huggingface.co/openai/gpt-oss-20b) | 0.03, 0.13 |
| `mistralai/ministral-8b-2512` | Mistral: Ministral 3 8B 2512 | open-weight, small | [Hugging Face](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512) | 0.15, 0.15 |
| `qwen/qwen3.5-9b` | Qwen: Qwen3.5-9B | open-weight, small | [Hugging Face](https://huggingface.co/Qwen/Qwen3.5-9B) | 0.17, 0.25 |
| `qwen/qwen3.5-9b#reasoning-off` | Qwen: Qwen3.5-9B (asked not to reason) | open-weight, small | [Hugging Face](https://huggingface.co/Qwen/Qwen3.5-9B) | 0.17, 0.25 |
| `google/gemma-4-31b-it` | Google: Gemma 4 31B | open-weight, large | [Hugging Face](https://huggingface.co/google/gemma-4-31B-it) | 0.2, 0.4 |
| `meta-llama/llama-4-maverick` | Meta: Llama 4 Maverick | open-weight, large | [Hugging Face](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct) | 0.35, 1 |
| `deepseek/deepseek-v4.1-flash` | DeepSeek: DeepSeek V4.1 Flash | open-weight, large | [Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | 0.051, 0.567 |
| `qwen/qwen3.5-397b-a17b` | Qwen: Qwen3.5 397B A17B | open-weight, large | [Hugging Face](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) | 0.6, 3.6 |
| `qwen/qwen3.5-397b-a17b#reasoning-off` | Qwen: Qwen3.5 397B A17B (asked not to reason) | open-weight, large | [Hugging Face](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) | 0.6, 3.6 |
| `mistralai/mistral-large-4-0` | Mistral: Mistral Large 4 | open-weight, large | [Hugging Face](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) | 0.7, 2.1 |
| `openai/gpt-6-luna` | OpenAI: GPT-6 Luna | commercial, small | not published | 0.1, 0.5 |
| `google/gemini-3.5-flash-lite` | Google: Gemini 3.5 Flash Lite | commercial, small | not published | 0.3, 2.5 |
| `anthropic/claude-haiku-5.5` | Anthropic: Claude Haiku 5.5 | commercial, small | not published | 0.1, 0.5 |
| `openai/gpt-6.1-terra` | OpenAI: GPT-6.1 Terra | commercial, large | not published | 1, 5 |

## How it is kept

- Every call goes through [`tools/llm.mjs`](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/llm.mjs): one ledger line per call, the raw request and response in a store outside git (an encrypted vault), a daily cap.
- The items: `models/evals/<task>/items.json`. Each model's parsed answers: `models/evals/<task>/results.json` (each with the name and sha256 of its raw record). The roster: [models.json](evals/models.json).
- Run again: `node tools/models-items.mjs && node tools/models-run.mjs && node tools/models-report.mjs`.
- For agents: the table is [results.json](results.json); the spend is [ledger-summary.json](ledger-summary.json).
- Asking a model from another desk: [agents/models/ask.md](../agents/models/ask.md).
