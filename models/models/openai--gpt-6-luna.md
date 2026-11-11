---
title: Model: OpenAI: GPT-6 Luna
summary: OpenAI: GPT-6 Luna as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# OpenAI: GPT-6 Luna

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `openai/gpt-6-luna` (through OpenRouter).

## What it is

- **Publisher:** OpenAI.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** OpenAI's commercial terms for its API; no weights are published.
- **Reasoning:** `openai/gpt-6-luna`: off (the provider's default); `openai/gpt-6-luna#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.1 US dollars per million tokens in, 0.5 out. Listed there since 2026-09-22. Our grouping: commercial, small.

## Its use here, in one line

**89 runs** on 5 tasks, **82 right**; 0 not answered (malformed, cut off, refused or a provider error); **73,120 tokens in, 8,880 out; 0.00958 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **15/17** | 8 of 9 (1 run) | 0 | 0 | 0 | 0 | 42551 | 1990 | 0.00312 | 0.00018 | 2.9 | 4.0 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **5/5** | 5 of 5 (1 run) | 0 | 0 | 0 | 0 | 12515 | 763 | 0.00164 | 0.00033 | 3.4 | 4.3 |
| [Extract a decision](../extract-decision.md) | off | **9/10** | 9 of 10 (1 run) | 0 | 0 | 0 | 0 | 6694 | 1177 | 0.00125 | 0.00012 | 2.6 | 4.9 |
| [Label fact, evidence, hypothesis](../label.md) | off | **16/20** | 16 of 20 (1 run) | 0 | 0 | 0 | 0 | 5486 | 1904 | 0.00149 | 0.000074 | 2.1 | 4.0 |
| [Translate, figures kept](../translate.md) | off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1701 | 1689 | 0.00100 | 0.000050 | 2.9 | 3.9 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4173 | 1357 | 0.00109 | 0.000064 | 2.6 | 2.8 |

## What we would use it for

*Ours, a hypothesis from these runs.* A cheap commercial second reader: 20 of 20 translations, 16 of 20 labels, 9 of 10 decisions (it named the Government as the decider of Web Summit's own decision), and 8 of the 9 harder warnings items it reached. About the price of the open-weight models. No reason to prefer it to them here, and no reason to avoid it as the second opinion from a different maker.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (1 of 9):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |

**Extract a decision, off** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d07](../extract-decision.md#d07) | {"decider":"websummit","effect_from_utc":null,"effect_to_utc":null} | {"decider":"government","what":"Day 2 of Web Summit (Wednesday, November 11) will not take place.","effect_from_utc":null,"effect_to_utc":null} | **wrong** |

**Label fact, evidence, hypothesis, off** (4 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
