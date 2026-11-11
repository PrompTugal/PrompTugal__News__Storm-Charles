---
title: Model: Google: Gemma 4 31B
summary: Google: Gemma 4 31B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Google: Gemma 4 31B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `google/gemma-4-31b-it` (through OpenRouter).

## What it is

- **Publisher:** Google.
- **Open weights:** yes. The weights: [google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0` (unlike Gemma 3, which is under Google's own terms); the card links Google's page on the Gemma 4 licence. Read 2026-11-11 02:52 UTC at [huggingface.co/google/gemma-4-31B-it](https://huggingface.co/google/gemma-4-31B-it).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `google/gemma-4-31b-it`: off (the provider's default); `google/gemma-4-31b-it#reasoning-on`: on (asked, medium effort).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.2 US dollars per million tokens in, 0.4 out. Listed there since 2026-04-02. Our grouping: open-weight, large.

## Its use here, in one line

**436 runs** on 5 tasks, **406 right**; 0 not answered (malformed, cut off, refused or a provider error); **285,781 tokens in, 83,243 out; 0.0684 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | off | **33/39** | 11 of 13 (3 runs) | 0 | 0 | 0 | 0 | 125378 | 3564 | 0.0158 | 0.00040 | 1.8 | 2.8 |
| [Warnings in force at an hour](../warnings-in-force.md) | on | **13/13** | 13 of 13 (1 run) | 0 | 0 | 0 | 0 | 41766 | 26139 | 0.0169 | 0.00130 | 30.7 | 106.3 |
| [Extract a decision](../extract-decision.md) | off | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 22600 | 2145 | 0.00320 | 0.00011 | 1.3 | 3.2 |
| [Extract a decision](../extract-decision.md) | on | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7600 | 3660 | 0.00264 | 0.00026 | 6.2 | 14.9 |
| [Label fact, evidence, hypothesis](../label.md) | off | **120/138** | 40 of 46 (3 runs) | 0 | 0 | 0 | 0 | 43347 | 971 | 0.00499 | 0.000036 | 0.7 | 2.3 |
| [Label fact, evidence, hypothesis](../label.md) | on | **40/46** | 40 of 46 (1 run) | 0 | 0 | 0 | 0 | 14505 | 20314 | 0.0102 | 0.00022 | 7.1 | 15.5 |
| [Translate, figures kept](../translate.md) | off | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 7783 | 3042 | 0.00220 | 0.000032 | 1.0 | 2.3 |
| [Translate, figures kept](../translate.md) | on | **23/23** | 23 of 23 (1 run) | 0 | 0 | 0 | 0 | 2552 | 8830 | 0.00415 | 0.00018 | 5.9 | 10.6 |
| [Extract a warning](../extract-warning.md) | off | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 15209 | 4329 | 0.00345 | 0.000068 | 1.8 | 3.2 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 5041 | 10249 | 0.00488 | 0.00029 | 8.1 | 25.8 |

## What we would use it for

*Ours, a hypothesis from these runs.* Our default open-weight model for this site's jobs. 10 of 10 decisions, 20 of 20 translations, 17 of 20 labels, and the only row to finish the harder warnings task well without reasoning (11 of 13, the same in three runs), at about a third of a cent per 100 items and under 2 seconds. Apache 2.0. Every output still passes its check (a second model, the figures check) before use.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, off** (2 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |

**Label fact, evidence, hypothesis, off** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Label fact, evidence, hypothesis, on** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | hypothesis | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T2115](../label.md#s-1110t2115) | evidence | fact | **wrong** |
| [s-1110T2229](../label.md#s-1110t2229) | evidence | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
