---
title: Model: Anthropic: Claude Haiku 5.5
summary: Anthropic: Claude Haiku 5.5 as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Anthropic: Claude Haiku 5.5

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `anthropic/claude-haiku-5.5` (through OpenRouter).

## What it is

- **Publisher:** Anthropic.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** Anthropic's commercial terms for its API; no weights are published.
- **Reasoning:** `anthropic/claude-haiku-5.5`: off (the provider's default); `anthropic/claude-haiku-5.5#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.1 US dollars per million tokens in, 0.5 out. Listed there since 2026-10-07. Our grouping: commercial, small.

## Its use here, in one line

**71 runs** on 5 tasks, **66 right**; 0 not answered (malformed, cut off, refused or a provider error); **40,324 tokens in, 10,434 out; 0.00916 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **3/3** | 1 of 1 (1 run) | 0 | 0 | 0 | 0 | 9726 | 2082 | 0.00199 | 0.00066 | 2.9 | 3.1 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **1/1** | 1 of 1 (1 run) | 0 | 0 | 0 | 0 | 3242 | 639 | 0.00064 | 0.00064 | 3.3 | 3.3 |
| [Extract a decision](../extract-decision.md) | off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 11223 | 2282 | 0.00224 | 0.00022 | 1.6 | 1.8 |
| [Label fact, evidence, hypothesis](../label.md) | off | **15/20** | 15 of 20 (1 run) | 0 | 0 | 0 | 0 | 7873 | 2750 | 0.00214 | 0.00011 | 1.0 | 2.2 |
| [Translate, figures kept](../translate.md) | off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 2585 | 1181 | 0.00084 | 0.000042 | 0.8 | 1.0 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 5675 | 1500 | 0.00130 | 0.000077 | 0.8 | 1.8 |

## What we would use it for

*Ours, a hypothesis from these runs.* Accurate on extraction and translation (10 of 10, 20 of 20) and the most cautious on labels (15 of 20: it calls our own checks evidence). A sound second reader at about a cent per 100 rows. One harder warnings item reached, right in each of three runs: too little to say more.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Label fact, evidence, hypothesis, off** (5 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
