---
title: Model: DeepSeek: DeepSeek V4.1 Flash
summary: DeepSeek: DeepSeek V4.1 Flash as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# DeepSeek: DeepSeek V4.1 Flash

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `deepseek/deepseek-v4.1-flash` (through OpenRouter).

## What it is

- **Publisher:** DeepSeek.
- **Open weights:** yes. The weights: [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** MIT License ([the text](https://opensource.org/license/mit)). The card's licence field: `mit`. Read 2026-11-11 02:52 UTC at [huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the copyright and licence notice; no warranty. A standard open-source licence.
- **Reasoning:** `deepseek/deepseek-v4.1-flash#reasoning-off`: off (asked); `deepseek/deepseek-v4.1-flash`: on (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.051 US dollars per million tokens in, 0.567 out. Listed there since 2026-09-10. Our grouping: open-weight, large.

## Its use here, in one line

**436 runs** on 5 tasks, **410 right**; 1 not answered (malformed, cut off, refused or a provider error); **243,260 tokens in, 88,601 out; 0.0919 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **31/39** | 10 to 11 of 13 (3 runs) | 0 | 0 | 0 | 0 | 100295 | 3297 | 0.0167 | 0.00043 | 0.7 | 1.6 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **13/13** | 13 of 13 (1 run) | 0 | 0 | 0 | 0 | 33749 | 20072 | 0.0192 | 0.00148 | 7.1 | 14.2 |
| [Extract a decision](../extract-decision.md) | off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 21957 | 1549 | 0.00260 | 0.000087 | 0.6 | 1.1 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7299 | 5683 | 0.00490 | 0.00049 | 3.0 | 9.1 |
| [Label fact, evidence, hypothesis](../label.md) | off | **126/138** | 41 to 43 of 46 (3 runs) | 0 | 0 | 0 | 0 | 39105 | 982 | 0.00529 | 0.000038 | 0.4 | 0.9 |
| [Label fact, evidence, hypothesis](../label.md) | on | **40/46** | 40 of 46 (1 run) | 0 | 1 | 0 | 0 | 13795 | 40320 | 0.0287 | 0.00062 | 2.3 | 15.7 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 6837 | 2783 | 0.00253 | 0.000037 | 0.4 | 0.8 |
| [Translate, figures kept](../translate.md) | on | **23/23** | 23 of 23 (1 run) | 0 | 0 | 0 | 0 | 2854 | 9006 | 0.00658 | 0.00029 | 2.1 | 6.8 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 12708 | 2763 | 0.00331 | 0.000065 | 0.6 | 4.5 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4661 | 2146 | 0.00206 | 0.00012 | 1.1 | 2.1 |

## What we would use it for

*Ours, a hypothesis from these runs.* The open-weight model to call when a row or a text is hard and a few seconds do not matter: with reasoning on (its default) it got 10 of 10 decisions, 20 of 20 translations, 17 of 20 labels and all 11 of the harder warnings items it reached. That costs about twenty times Gemma 4 per label. With reasoning off it was asked only part of one task before the credits ran out. MIT licence.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (3 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |

**Label fact, evidence, hypothesis, off** (4 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | fact | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |

**Label fact, evidence, hypothesis, on** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact |  | **cut off** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
