---
title: Model: Qwen: Qwen3.5 397B A17B
summary: Qwen: Qwen3.5 397B A17B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Qwen: Qwen3.5 397B A17B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `qwen/qwen3.5-397b-a17b` (through OpenRouter).

## What it is

- **Publisher:** Alibaba (Qwen).
- **Open weights:** yes. The weights: [Qwen/Qwen3.5-397B-A17B](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0`, with its own LICENSE file. Read 2026-11-11 02:52 UTC at [huggingface.co/Qwen/Qwen3.5-397B-A17B](https://huggingface.co/Qwen/Qwen3.5-397B-A17B).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `qwen/qwen3.5-397b-a17b#reasoning-off`: off (asked); `qwen/qwen3.5-397b-a17b`: on (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.6 US dollars per million tokens in, 3.6 out. Listed there since 2026-02-16. Our grouping: open-weight, large.

## Its use here, in one line

**436 runs** on 5 tasks, **381 right**; 16 not answered (malformed, cut off, refused or a provider error); **282,200 tokens in, 234,325 out; 0.9006 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **21/39** | 6 to 8 of 13 (3 runs) | 0 | 0 | 0 | 0 | 125344 | 9372 | 0.0931 | 0.00239 | 2.3 | 3.6 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **5/13** | 5 of 13 (1 run) | 0 | 8 | 0 | 0 | 41756 | 57155 | 0.2031 | 0.0156 | 30.9 | 101.1 |
| [Extract a decision](../extract-decision.md) | off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 22435 | 2064 | 0.0162 | 0.00054 | 1.9 | 2.6 |
| [Extract a decision](../extract-decision.md) | on | **9/10** | 9 of 10 (1 run) | 0 | 1 | 0 | 0 | 7285 | 16207 | 0.0608 | 0.00608 | 15.8 | 65.3 |
| [Label fact, evidence, hypothesis](../label.md) | off | **121/138** | 39 to 41 of 46 (3 runs) | 0 | 0 | 0 | 0 | 42054 | 4651 | 0.0353 | 0.00026 | 1.0 | 1.4 |
| [Label fact, evidence, hypothesis](../label.md) | on | **40/46** | 40 of 46 (1 run) | 1 | 1 | 0 | 0 | 13400 | 63604 | 0.2086 | 0.00454 | 12.5 | 42.9 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 7599 | 2908 | 0.0121 | 0.00018 | 1.3 | 2.0 |
| [Translate, figures kept](../translate.md) | on | **18/23** | 18 of 23 (1 run) | 0 | 5 | 0 | 0 | 2489 | 53602 | 0.1821 | 0.00792 | 25.3 | 43.5 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 14904 | 3504 | 0.0171 | 0.00033 | 1.9 | 2.5 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4934 | 21258 | 0.0722 | 0.00425 | 16.9 | 21.2 |

## What we would use it for

*Ours, a hypothesis from these runs.* Only with reasoning off. At its default it reasons at great length: the dearest row here (half a US cent an item, 10 to 25 seconds) and it ran out of tokens on 4 of 20 translations. With reasoning off it matched the best on decisions (10 of 10) and translation (17 of 17 answered) at a fourteenth to a seventieth of the price. Nothing it does here is not done as well by Gemma 4 for less.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (5 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** |

**Warnings in force at an hour, on** (8 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] |  | **cut off** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] |  | **cut off** |
| [f07](../warnings-in-force.md#f07) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] |  | **cut off** |
| [f08](../warnings-in-force.md#f08) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] |  | **cut off** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] |  | **cut off** |

**Extract a decision, on** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} |  | **cut off** |

**Label fact, evidence, hypothesis, off** (7 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T1909](../label.md#s-1110t1909) | fact | evidence | **wrong** |
| [s-1110T2132](../label.md#s-1110t2132) | fact | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |

**Label fact, evidence, hypothesis, on** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2030](../label.md#s-1110t2030) | evidence |  | **malformed** |
| [s-1110T2153](../label.md#s-1110t2153) | fact |  | **cut off** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Translate, figures kept, on** (5 of 23):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [t01](../translate.md#t01) | figures 5 7 11 13 4 5; units metre |  | **cut off** |
| [t05](../translate.md#t05) | figures 4 5; units metre |  | **cut off** |
| [t07](../translate.md#t07) | figures 100 140; units km/h |  | **cut off** |
| [t19](../translate.md#t19) | figures ; units  |  | **cut off** |
| [p01](../translate.md#p01) | figures 10 11 100 12 100 140 4 5; units km/h mm metre |  | **cut off** |
