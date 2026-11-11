---
title: Model: DeepSeek: DeepSeek V4.1 Flash
summary: DeepSeek: DeepSeek V4.1 Flash as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# DeepSeek: DeepSeek V4.1 Flash

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `deepseek/deepseek-v4.1-flash` (through OpenRouter).

## What it is

- **Publisher:** DeepSeek.
- **Open weights:** yes. The weights: [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** MIT License ([the text](https://opensource.org/license/mit)). The card's licence field: `mit`. Read 2026-11-11 02:52 UTC at [huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the copyright and licence notice; no warranty. A standard open-source licence.
- **Reasoning:** `deepseek/deepseek-v4.1-flash#reasoning-off`: off (asked); `deepseek/deepseek-v4.1-flash`: on (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.051 US dollars per million tokens in, 0.567 out. Listed there since 2026-09-10. Our grouping: open-weight, large.

## Its use here, in one line

**102 runs** on 5 tasks, **91 right**; 1 not answered (malformed, cut off, refused or a provider error); **110,428 tokens in, 54,664 out; 0.0530 US dollars**. Source: [results.json](../results.json), made 2026-11-11 03:06 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **16/24** | 5 of 8 (1 run) | 0 | 0 | 0 | 0 | 61729 | 2649 | 0.0106 | 0.00044 | 0.7 | 2.5 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **11/11** | 11 of 11 (1 run) | 0 | 0 | 0 | 0 | 28556 | 18028 | 0.0164 | 0.00149 | 7.2 | 14.2 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7299 | 5683 | 0.00490 | 0.00049 | 3.0 | 9.1 |
| [Label fact, evidence, hypothesis](../label.md) | on | **17/20** | 17 of 20 (1 run) | 0 | 1 | 0 | 0 | 6024 | 21189 | 0.0152 | 0.00076 | 3.0 | 22.8 |
| [Translate, figures kept](../translate.md) | on | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 2159 | 4969 | 0.00387 | 0.00019 | 1.4 | 4.0 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4661 | 2146 | 0.00206 | 0.00012 | 1.1 | 2.1 |

## What we would use it for

*Ours, a hypothesis from these runs.* The open-weight model to call when a row or a text is hard and a few seconds do not matter: with reasoning on (its default) it got 10 of 10 decisions, 20 of 20 translations, 17 of 20 labels and all 11 of the harder warnings items it reached. That costs about twenty times Gemma 4 per label. With reasoning off it was asked only part of one task before the credits ran out. MIT licence.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (3 of 8):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |

**Label fact, evidence, hypothesis, on** (3 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2323](../label.md#s-1110t2323) | fact |  | **cut off** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
