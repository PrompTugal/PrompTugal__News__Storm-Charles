---
title: Model: OpenAI: gpt-oss-20b
summary: OpenAI: gpt-oss-20b as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# OpenAI: gpt-oss-20b

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `openai/gpt-oss-20b` (through OpenRouter).

## What it is

- **Publisher:** OpenAI.
- **Open weights:** yes. The weights: [openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0`. Read 2026-11-11 02:52 UTC at [huggingface.co/openai/gpt-oss-20b](https://huggingface.co/openai/gpt-oss-20b).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `openai/gpt-oss-20b`: reasons; cannot be turned off (the provider refuses the setting).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.03 US dollars per million tokens in, 0.13 out. Listed there since 2025-08-05. Our grouping: open-weight, small.

## Its use here, in one line

**75 runs** on 5 tasks, **65 right**; 4 not answered (malformed, cut off, refused or a provider error); **42,262 tokens in, 45,376 out; 0.00942 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | reasons; cannot be turned off | **4/8** | 2 of 3 (1 run) | 0 | 4 | 0 | 0 | 20445 | 26756 | 0.00492 | 0.00061 | 21.9 | 36.1 |
| [Extract a decision](../extract-decision.md) | reasons; cannot be turned off | **9/10** | 9 of 10 (1 run) | 0 | 0 | 0 | 0 | 7269 | 3784 | 0.00109 | 0.00011 | 2.3 | 14.6 |
| [Label fact, evidence, hypothesis](../label.md) | reasons; cannot be turned off | **15/20** | 15 of 20 (1 run) | 0 | 0 | 0 | 0 | 6571 | 5761 | 0.00129 | 0.000065 | 1.8 | 5.1 |
| [Translate, figures kept](../translate.md) | reasons; cannot be turned off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 2846 | 4044 | 0.00096 | 0.000048 | 1.0 | 2.6 |
| [Extract a warning](../extract-warning.md) | reasons; cannot be turned off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 5131 | 5031 | 0.00116 | 0.000068 | 2.9 | 7.6 |

## What we would use it for

*Ours, a hypothesis from these runs.* A reasonable small model for extraction where a second model checks it: 9 of 10 decisions, 20 of 20 translations, 15 of 20 labels. It always reasons (the provider will not turn it off), so it is slower than its size suggests (2 to 20 seconds), and on the harder warnings task it ran out of tokens on 4 of the 8 calls it got to make. Apache 2.0, so it could be run on our own machine: the one small model here where that is both allowed without conditions and worth testing.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, reasons; cannot be turned off** (1 of 3):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |

**Extract a decision, reasons; cannot be turned off** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d07](../extract-decision.md#d07) | {"decider":"websummit","effect_from_utc":null,"effect_to_utc":null} | {"decider":"government","what":"Day 2 of Web Summit will not take place","effect_from_utc":null,"effect_to_utc":null} | **wrong** |

**Label fact, evidence, hypothesis, reasons; cannot be turned off** (5 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1905b](../label.md#s-1110t1905b) | hypothesis | fact | **wrong** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | fact | **wrong** |
| [s-1110T2354](../label.md#s-1110t2354) | hypothesis | fact | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
