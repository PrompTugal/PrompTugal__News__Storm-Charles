---
title: Model: OpenAI: GPT-6 Luna
summary: OpenAI: GPT-6 Luna as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# OpenAI: GPT-6 Luna

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `openai/gpt-6-luna` (through OpenRouter).

## What it is

- **Publisher:** OpenAI.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** OpenAI's commercial terms for its API; no weights are published.
- **Reasoning:** `openai/gpt-6-luna`: off (the provider's default); `openai/gpt-6-luna#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.1 US dollars per million tokens in, 0.5 out. Listed there since 2026-09-22. Our grouping: commercial, small.

## Its use here, in one line

**436 runs** on 5 tasks, **401 right**; 0 not answered (malformed, cut off, refused or a provider error); **234,910 tokens in, 40,925 out; 0.0379 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **37/39** | 12 to 13 of 13 (3 runs) | 0 | 0 | 0 | 0 | 97617 | 4635 | 0.00783 | 0.00020 | 3.1 | 4.0 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **12/13** | 12 of 13 (1 run) | 0 | 0 | 0 | 0 | 32539 | 1641 | 0.00256 | 0.00020 | 3.1 | 3.8 |
| [Extract a decision](../extract-decision.md) | off | **28/30** | 9 to 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 20582 | 3528 | 0.00378 | 0.00013 | 2.7 | 4.3 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 6944 | 1271 | 0.00132 | 0.00013 | 3.2 | 4.1 |
| [Label fact, evidence, hypothesis](../label.md) | off | **115/138** | 38 to 39 of 46 (3 runs) | 0 | 0 | 0 | 0 | 38474 | 10654 | 0.00908 | 0.000066 | 2.5 | 3.3 |
| [Label fact, evidence, hypothesis](../label.md) | on | **39/46** | 39 of 46 (1 run) | 0 | 0 | 0 | 0 | 12946 | 3747 | 0.00314 | 0.000068 | 2.4 | 3.6 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 6837 | 7652 | 0.00447 | 0.000065 | 3.1 | 4.0 |
| [Translate, figures kept](../translate.md) | on | **23/23** | 23 of 23 (1 run) | 0 | 0 | 0 | 0 | 2279 | 2388 | 0.00141 | 0.000061 | 2.9 | 4.1 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 12519 | 4078 | 0.00326 | 0.000064 | 2.4 | 2.8 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4173 | 1331 | 0.00107 | 0.000063 | 2.3 | 2.9 |

## What we would use it for

*Ours, a hypothesis from these runs.* A cheap commercial second reader: 20 of 20 translations, 16 of 20 labels, 9 of 10 decisions (it named the Government as the decider of Web Summit's own decision), and 8 of the 9 harder warnings items it reached. About the price of the open-weight models. No reason to prefer it to them here, and no reason to avoid it as the second opinion from a different maker.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (1 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |

**Warnings in force at an hour, on** (1 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [] | **wrong** |

**Extract a decision, off** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d07](../extract-decision.md#d07) | {"decider":"websummit","effect_from_utc":null,"effect_to_utc":null} | {"decider":"government","what":"Day 2 of Web Summit (Wednesday, November 11) will not take place.","effect_from_utc":null,"effect_to_utc":null} | **wrong** |

**Label fact, evidence, hypothesis, off** (8 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Label fact, evidence, hypothesis, on** (7 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | fact | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
