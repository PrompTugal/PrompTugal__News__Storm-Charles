---
title: Model: Google: Gemini 3.5 Flash Lite
summary: Google: Gemini 3.5 Flash Lite as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Google: Gemini 3.5 Flash Lite

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `google/gemini-3.5-flash-lite` (through OpenRouter).

## What it is

- **Publisher:** Google.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** Google's commercial terms for its API; no weights are published.
- **Reasoning:** `google/gemini-3.5-flash-lite`: reasons; cannot be turned off (the provider refuses the setting).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.3 US dollars per million tokens in, 2.5 out. Listed there since 2026-07-21. Our grouping: commercial, small.

## Its use here, in one line

**67 runs** on 4 tasks, **64 right**; 0 not answered (malformed, cut off, refused or a provider error); **19,348 tokens in, 2,644 out; 0.0123 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Extract a decision](../extract-decision.md) | reasons; cannot be turned off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7181 | 583 | 0.00358 | 0.00036 | 0.8 | 1.0 |
| [Label fact, evidence, hypothesis](../label.md) | reasons; cannot be turned off | **17/20** | 17 of 20 (1 run) | 0 | 0 | 0 | 0 | 5832 | 120 | 0.00203 | 0.00010 | 0.7 | 0.9 |
| [Translate, figures kept](../translate.md) | reasons; cannot be turned off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1581 | 636 | 0.00204 | 0.00010 | 0.7 | 1.2 |
| [Extract a warning](../extract-warning.md) | reasons; cannot be turned off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4754 | 1305 | 0.00464 | 0.00027 | 0.8 | 0.9 |

## What we would use it for

*Ours, a hypothesis from these runs.* The commercial model we would pair with Gemma 4 as the second opinion on decisions: 10 of 10, 20 of 20 translations, 17 of 20 labels, under a second. It always reasons a little (the provider will not turn it off). It was not reached on the harder task before the credits ran out.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Label fact, evidence, hypothesis, reasons; cannot be turned off** (3 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | fact | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
