---
title: Model: Qwen: Qwen3.5-9B
summary: Qwen: Qwen3.5-9B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Qwen: Qwen3.5-9B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `qwen/qwen3.5-9b` (through OpenRouter).

## What it is

- **Publisher:** Alibaba (Qwen).
- **Open weights:** yes. The weights: [Qwen/Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0`, with its own LICENSE file. Read 2026-11-11 02:52 UTC at [huggingface.co/Qwen/Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `qwen/qwen3.5-9b#reasoning-off`: off (asked); `qwen/qwen3.5-9b`: on (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.17 US dollars per million tokens in, 0.25 out. Listed there since 2026-03-10. Our grouping: open-weight, small.

## Its use here, in one line

**166 runs** on 5 tasks, **106 right**; 15 not answered (malformed, cut off, refused or a provider error); **142,791 tokens in, 164,245 out; 0.0403 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **0/28** | 0 of 10 (1 run) | 0 | 0 | 0 | 0 | 89992 | 5020 | 0.00913 | 0.00033 | 3.2 | 8.2 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **0/4** | 0 of 4 (1 run) | 0 | 4 | 0 | 0 | 12848 | 16000 | 0.00469 | 0.00117 | 34.5 | 43.5 |
| [Extract a decision](../extract-decision.md) | off | **6/10** | 6 of 10 (1 run) | 0 | 0 | 0 | 0 | 7305 | 656 | 0.00073 | 0.000073 | 1.6 | 12.3 |
| [Extract a decision](../extract-decision.md) | on | **9/10** | 9 of 10 (1 run) | 0 | 0 | 0 | 0 | 7285 | 24731 | 0.00415 | 0.00041 | 30.3 | 99.5 |
| [Label fact, evidence, hypothesis](../label.md) | off | **10/20** | 10 of 20 (1 run) | 0 | 0 | 0 | 0 | 6022 | 262 | 0.00054 | 0.000027 | 0.6 | 10.7 |
| [Label fact, evidence, hypothesis](../label.md) | on | **12/20** | 12 of 20 (1 run) | 1 | 5 | 0 | 0 | 5661 | 44719 | 0.00798 | 0.00040 | 26.0 | 51.2 |
| [Translate, figures kept](../translate.md) | off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1908 | 608 | 0.00023 | 0.000012 | 0.7 | 1.8 |
| [Translate, figures kept](../translate.md) | on | **15/20** | 15 of 20 (1 run) | 0 | 5 | 0 | 0 | 1868 | 46080 | 0.00705 | 0.00035 | 26.3 | 49.1 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4968 | 1277 | 0.00070 | 0.000041 | 1.3 | 2.2 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4934 | 24892 | 0.00506 | 0.00030 | 18.3 | 27.5 |

## What we would use it for

*Ours, a hypothesis from these runs.* With reasoning off: translation only (20 of 20). With reasoning on it is better where a rule is weighed (decisions 9 of 10 against 6) but takes 20 to 30 seconds an item and runs out of tokens on longer texts. For the same money and time a larger model that does not reason does better.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (10 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f07](../warnings-in-force.md#f07) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f08](../warnings-in-force.md#f08) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f13](../warnings-in-force.md#f13) | [] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |

**Warnings in force at an hour, on** (4 of 4):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] |  | **cut off** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] |  | **cut off** |

**Extract a decision, off** (4 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d04](../extract-decision.md#d04) | {"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | {"decider":"madeira-prociv","what":"Red alert for precipitation in South Coast of Madeira","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | **wrong** |
| [d05](../extract-decision.md#d05) | {"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | {"decider":"madeira-prociv","what":"Red alert for precipitation in North Coast of Madeira","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | **wrong** |
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} | {"decider":"ipma","what":"Red and Orange weather warnings issued for Storm Charles","effect_from_utc":"2026-11-10T17:00Z","effect_to_utc":null} | **wrong** |
| [d10](../extract-decision.md#d10) | {"decider":"metro","effect_from_utc":null,"effect_to_utc":null} | {"decider":"metro","what":"Contingency plan for homeless people during nights of 10 to 11 and 11 to 12 November","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-13T00:00Z"} | **wrong** |

**Extract a decision, on** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":null} | **wrong** |

**Label fact, evidence, hypothesis, off** (10 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1952](../label.md#s-1110t1952) | fact | evidence | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | evidence | **wrong** |
| [s-1110T2132](../label.md#s-1110t2132) | fact | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | evidence | **wrong** |
| [s-1110T2354](../label.md#s-1110t2354) | hypothesis | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | evidence | **wrong** |
| [s-1111T0146](../label.md#s-1111t0146) | fact | evidence | **wrong** |

**Label fact, evidence, hypothesis, on** (8 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2115](../label.md#s-1110t2115) | evidence |  | **cut off** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis |  | **cut off** |
| [s-1110T2132](../label.md#s-1110t2132) | fact |  | **cut off** |
| [s-1110T2153](../label.md#s-1110t2153) | fact |  | **cut off** |
| [s-1110T2323](../label.md#s-1110t2323) | fact |  | **cut off** |
| [s-1110T2354](../label.md#s-1110t2354) | hypothesis |  | **malformed** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Translate, figures kept, on** (5 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [t01](../translate.md#t01) | figures 5 7 11 13 4 5; units metre |  | **cut off** |
| [t04](../translate.md#t04) | figures 5 7 13; units metre |  | **cut off** |
| [t05](../translate.md#t05) | figures 4 5; units metre |  | **cut off** |
| [t09](../translate.md#t09) | figures 4 5; units metre |  | **cut off** |
| [t12](../translate.md#t12) | figures 100; units km/h |  | **cut off** |
