---
title: Model: Anthropic: Claude Haiku 5.5
summary: Anthropic: Claude Haiku 5.5 as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Anthropic: Claude Haiku 5.5

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `anthropic/claude-haiku-5.5` (through OpenRouter).

## What it is

- **Publisher:** Anthropic.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** Anthropic's commercial terms for its API; no weights are published.
- **Reasoning:** `anthropic/claude-haiku-5.5`: off (the provider's default); `anthropic/claude-haiku-5.5#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.1 US dollars per million tokens in, 0.5 out. Listed there since 2026-10-07. Our grouping: commercial, small.

## Its use here, in one line

**436 runs** on 5 tasks, **405 right**; 0 not answered (malformed, cut off, refused or a provider error); **325,535 tokens in, 82,885 out; 0.0733 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **39/39** | 13 of 13 (3 runs) | 0 | 0 | 0 | 0 | 126438 | 25761 | 0.0253 | 0.00065 | 3.1 | 3.5 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **13/13** | 13 of 13 (1 run) | 0 | 0 | 0 | 0 | 42146 | 8746 | 0.00850 | 0.00065 | 4.0 | 4.6 |
| [Extract a decision](../extract-decision.md) | off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 34549 | 7263 | 0.00702 | 0.00023 | 1.6 | 2.0 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 11663 | 2278 | 0.00228 | 0.00023 | 2.2 | 3.1 |
| [Label fact, evidence, hypothesis](../label.md) | off | **114/138** | 37 to 39 of 46 (3 runs) | 0 | 0 | 0 | 0 | 55329 | 17461 | 0.0141 | 0.00010 | 0.9 | 2.2 |
| [Label fact, evidence, hypothesis](../label.md) | on | **39/46** | 39 of 46 (1 run) | 0 | 0 | 0 | 0 | 18614 | 6566 | 0.00509 | 0.00011 | 0.8 | 3.3 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 10572 | 6236 | 0.00413 | 0.000060 | 0.8 | 1.3 |
| [Translate, figures kept](../translate.md) | on | **23/23** | 23 of 23 (1 run) | 0 | 0 | 0 | 0 | 3524 | 2809 | 0.00174 | 0.000076 | 0.8 | 3.2 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 17025 | 4331 | 0.00383 | 0.000075 | 0.8 | 1.3 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 5675 | 1434 | 0.00127 | 0.000075 | 0.8 | 1.7 |

## What we would use it for

*Ours, a hypothesis from these runs.* Accurate on extraction and translation (10 of 10, 20 of 20) and the most cautious on labels (15 of 20: it calls our own checks evidence). A sound second reader at about a cent per 100 rows. One harder warnings item reached, right in each of three runs: too little to say more.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Label fact, evidence, hypothesis, off** (9 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Label fact, evidence, hypothesis, on** (7 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1700](../label.md#s-1110t1700) | fact | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | fact | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
| [s-1111T0238](../label.md#s-1111t0238) | fact | evidence | **wrong** |
