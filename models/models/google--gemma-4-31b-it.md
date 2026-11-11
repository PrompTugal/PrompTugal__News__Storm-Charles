---
title: Model: Google: Gemma 4 31B
summary: Google: Gemma 4 31B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Google: Gemma 4 31B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `google/gemma-4-31b-it` (through OpenRouter).

## What it is

- **Publisher:** Google.
- **Open weights:** yes. The weights: [google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0` (unlike Gemma 3, which is under Google's own terms); the card links Google's page on the Gemma 4 licence. Read 2026-11-11 02:52 UTC at [huggingface.co/google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `google/gemma-4-31b-it`: off (the provider's default); `google/gemma-4-31b-it#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.2 US dollars per million tokens in, 0.4 out. Listed there since 2026-04-02. Our grouping: open-weight, large.

## Its use here, in one line

**116 runs** on 5 tasks, **107 right**; 0 not answered (malformed, cut off, refused or a provider error); **178,078 tokens in, 26,831 out; 0.0321 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **33/39** | 11 of 13 (3 runs) | 0 | 0 | 0 | 0 | 125378 | 3564 | 0.0158 | 0.00040 | 1.8 | 2.8 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 32128 | 20353 | 0.0131 | 0.00131 | 22.7 | 36.6 |
| [Extract a decision](../extract-decision.md) | off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7364 | 712 | 0.00100 | 0.000100 | 1.1 | 1.8 |
| [Label fact, evidence, hypothesis](../label.md) | off | **17/20** | 17 of 20 (1 run) | 0 | 0 | 0 | 0 | 6197 | 140 | 0.00069 | 0.000034 | 0.4 | 0.6 |
| [Translate, figures kept](../translate.md) | off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1946 | 629 | 0.00044 | 0.000022 | 0.5 | 1.2 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 5065 | 1433 | 0.00109 | 0.000064 | 1.0 | 2.1 |

## What we would use it for

*Ours, a hypothesis from these runs.* Our default open-weight model for this site's jobs. 10 of 10 decisions, 20 of 20 translations, 17 of 20 labels, and the only row to finish the harder warnings task well without reasoning (11 of 13, the same in three runs), at about a third of a cent per 100 items and under 2 seconds. Apache 2.0. Every output still passes its check (a second model, the figures check) before use.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (2 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |

**Label fact, evidence, hypothesis, off** (3 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
