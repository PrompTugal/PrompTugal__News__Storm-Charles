---
title: Model: Google: Gemini 3.5 Flash Lite
summary: Google: Gemini 3.5 Flash Lite as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Google: Gemini 3.5 Flash Lite

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `google/gemini-3.5-flash-lite` (through OpenRouter).

## What it is

- **Publisher:** Google.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** Google's commercial terms for its API; no weights are published.
- **Reasoning:** `google/gemini-3.5-flash-lite`: reasons; cannot be turned off (the provider refuses the setting).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.3 US dollars per million tokens in, 2.5 out. Listed there since 2026-07-21. Our grouping: commercial, small.

## Its use here, in one line

**327 runs** on 5 tasks, **287 right**; 0 not answered (malformed, cut off, refused or a provider error); **208,204 tokens in, 12,468 out; 0.0927 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | reasons; cannot be turned off | **20/39** | 6 to 7 of 13 (3 runs) | 0 | 0 | 0 | 0 | 124644 | 2920 | 0.0442 | 0.00113 | 0.8 | 1.0 |
| [Extract a decision](../extract-decision.md) | reasons; cannot be turned off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 22043 | 1768 | 0.0109 | 0.00036 | 0.8 | 1.0 |
| [Label fact, evidence, hypothesis](../label.md) | reasons; cannot be turned off | **117/138** | 39 of 46 (3 runs) | 0 | 0 | 0 | 0 | 40766 | 838 | 0.0142 | 0.00010 | 0.7 | 0.9 |
| [Translate, figures kept](../translate.md) | reasons; cannot be turned off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 6489 | 3016 | 0.00939 | 0.00014 | 0.7 | 1.2 |
| [Extract a warning](../extract-warning.md) | reasons; cannot be turned off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 14262 | 3926 | 0.0140 | 0.00027 | 0.8 | 0.9 |

## What we would use it for

*Ours, a hypothesis from these runs.* The commercial model we would pair with Gemma 4 as the second opinion on decisions: 10 of 10, 20 of 20 translations, 17 of 20 labels, under a second. It always reasons a little (the provider will not turn it off). It was not reached on the harder task before the credits ran out.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, reasons; cannot be turned off** (6 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"}] | **wrong** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [] | **wrong** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f09](../warnings-in-force.md#f09) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [] | **wrong** |

**Label fact, evidence, hypothesis, reasons; cannot be turned off** (7 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | fact | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
