---
title: Model: Mistral: Mistral Large 4
summary: Mistral: Mistral Large 4 as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Mistral: Mistral Large 4

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `mistralai/mistral-large-4-0` (through OpenRouter).

## What it is

- **Publisher:** Mistral AI.
- **Open weights:** yes. The weights: [mistralai/Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Mistral Ecosystem Open-Weight License ([the text](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B/blob/main/LICENSE)). The card's licence field: `other`; the card names the licence in its text. Read 2026-11-11 02:52 UTC at [huggingface.co/mistralai/Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B).
- **What that licence allows:** The card's own words: 'a modified version of the MIT license, for both commercial and non-commercial use'; it adds that operating a model-as-a-service business needs a separate agreement. We read the card's sentence, not the licence text.
- **Reasoning:** `mistralai/mistral-large-4-0`: reasons; cannot be turned off (the provider refuses the setting).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.7 US dollars per million tokens in, 2.1 out. Listed there since 2026-10-06. Our grouping: open-weight, large.

## Its use here, in one line

**109 runs** on 5 tasks, **95 right**; 8 not answered (malformed, cut off, refused or a provider error); **59,076 tokens in, 174,115 out; 0.4225 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | reasons; cannot be turned off | **9/13** | 9 of 13 (1 run) | 0 | 4 | 0 | 0 | 32370 | 47273 | 0.1272 | 0.00978 | 30.5 | 44.4 |
| [Extract a decision](../extract-decision.md) | reasons; cannot be turned off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 6862 | 13237 | 0.0328 | 0.00328 | 6.9 | 13.2 |
| [Label fact, evidence, hypothesis](../label.md) | reasons; cannot be turned off | **39/46** | 39 of 46 (1 run) | 0 | 1 | 0 | 0 | 13153 | 59174 | 0.1372 | 0.00298 | 7.3 | 24.8 |
| [Translate, figures kept](../translate.md) | reasons; cannot be turned off | **20/23** | 20 of 23 (1 run) | 0 | 3 | 0 | 0 | 2418 | 39118 | 0.0888 | 0.00386 | 9.0 | 31.0 |
| [Extract a warning](../extract-warning.md) | reasons; cannot be turned off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4273 | 15313 | 0.0365 | 0.00215 | 4.8 | 11.3 |

## What we would use it for

*Ours, a hypothesis from these runs.* Accurate (10 of 10 decisions, 17 of 20 labels, 19 of 20 translations) and dear for it: it reasons on every call and the provider refuses to turn that off, so it cost about a third of a US cent an item and 5 to 7 seconds. No job here needs it over Gemma 4 or DeepSeek. Its licence is Mistral's own: open weights, with conditions for anyone selling it as a service.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, reasons; cannot be turned off** (4 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] |  | **cut off** |
| [f07](../warnings-in-force.md#f07) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] |  | **cut off** |
| [f10](../warnings-in-force.md#f10) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] |  | **cut off** |

**Label fact, evidence, hypothesis, reasons; cannot be turned off** (7 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact |  | **cut off** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Translate, figures kept, reasons; cannot be turned off** (3 of 23):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [t03](../translate.md#t03) | figures 100 120 140; units km/h |  | **cut off** |
| [p01](../translate.md#p01) | figures 10 11 100 12 100 140 4 5; units km/h mm metre |  | **cut off** |
| [p02](../translate.md#p02) | figures 100 120 140 100 24 5 7 11 13 4 5; units km/h mm metre |  | **cut off** |
