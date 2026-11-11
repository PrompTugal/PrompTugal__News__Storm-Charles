---
title: Model: OpenAI: GPT-6.1 Terra
summary: OpenAI: GPT-6.1 Terra as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# OpenAI: GPT-6.1 Terra

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `openai/gpt-6.1-terra` (through OpenRouter).

## What it is

- **Publisher:** OpenAI.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** OpenAI's commercial terms for its API; no weights are published.
- **Reasoning:** `openai/gpt-6.1-terra`: off (the provider's default); `openai/gpt-6.1-terra#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 1 US dollars per million tokens in, 5 out. Listed there since 2026-10-26. Our grouping: commercial, large.

## Its use here, in one line

**436 runs** on 5 tasks, **411 right**; 0 not answered (malformed, cut off, refused or a provider error); **234,910 tokens in, 32,389 out; 0.3122 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **39/39** | 13 of 13 (3 runs) | 0 | 0 | 0 | 0 | 97617 | 2405 | 0.0287 | 0.00074 | 1.9 | 3.1 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **13/13** | 13 of 13 (1 run) | 0 | 0 | 0 | 0 | 32539 | 881 | 0.0357 | 0.00275 | 1.8 | 3.4 |
| [Extract a decision](../extract-decision.md) | off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 20582 | 2092 | 0.0307 | 0.00102 | 1.9 | 2.9 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 6944 | 729 | 0.0105 | 0.00105 | 1.8 | 3.4 |
| [Label fact, evidence, hypothesis](../label.md) | off | **119/138** | 38 to 42 of 46 (3 runs) | 0 | 0 | 0 | 0 | 38474 | 9733 | 0.0863 | 0.00063 | 2.5 | 4.5 |
| [Label fact, evidence, hypothesis](../label.md) | on | **40/46** | 40 of 46 (1 run) | 0 | 0 | 0 | 0 | 12946 | 3163 | 0.0285 | 0.00062 | 2.4 | 5.3 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 6837 | 7119 | 0.0420 | 0.00061 | 3.0 | 4.5 |
| [Translate, figures kept](../translate.md) | on | **23/23** | 23 of 23 (1 run) | 0 | 0 | 0 | 0 | 2279 | 2341 | 0.0138 | 0.00060 | 3.0 | 4.4 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 12519 | 2894 | 0.0267 | 0.00052 | 1.5 | 1.8 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4173 | 1032 | 0.00924 | 0.00054 | 1.7 | 2.8 |

## What we would use it for

*Ours, a hypothesis from these runs.* The largest commercial model here, and on these small jobs no better than the cheap ones (10 of 10, 20 of 20, 16 of 20) at seven to ten times their price. Its place would be the tasks that are still hard for the others; the harder task did not reach it before the credits ran out.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Label fact, evidence, hypothesis, off** (8 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0238](../label.md#s-1111t0238) | fact | hypothesis | **wrong** |

**Label fact, evidence, hypothesis, on** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | fact | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | hypothesis | **wrong** |
| [s-1111T0238](../label.md#s-1111t0238) | fact | hypothesis | **wrong** |
