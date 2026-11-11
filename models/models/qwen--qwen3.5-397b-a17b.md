---
title: Model: Qwen: Qwen3.5 397B A17B
summary: Qwen: Qwen3.5 397B A17B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Qwen: Qwen3.5 397B A17B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `qwen/qwen3.5-397b-a17b` (through OpenRouter).

## What it is

- **Publisher:** Alibaba (Qwen).
- **Open weights:** yes. The weights: [Qwen/Qwen3.5-397B-A17B](https://huggingface.co/Qwen/Qwen3.5-397B-A17B) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0`, with its own LICENSE file. Read 2026-11-11 02:52 UTC at [huggingface.co/Qwen/Qwen3.5-397B-A17B](https://huggingface.co/Qwen/Qwen3.5-397B-A17B).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `qwen/qwen3.5-397b-a17b#reasoning-off`: off (asked); `qwen/qwen3.5-397b-a17b`: on (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.6 US dollars per million tokens in, 3.6 out. Listed there since 2026-02-16. Our grouping: open-weight, large.

## Its use here, in one line

**126 runs** on 4 tasks, **114 right**; 7 not answered (malformed, cut off, refused or a provider error); **38,229 tokens in, 110,374 out; 0.3835 US dollars**. Source: [results.json](../results.json), made 2026-11-11 03:06 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Extract a decision](../extract-decision.md) | off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 7305 | 696 | 0.00443 | 0.00044 | 2.0 | 2.6 |
| [Extract a decision](../extract-decision.md) | on | **9/10** | 9 of 10 (1 run) | 0 | 1 | 0 | 0 | 7285 | 16207 | 0.0608 | 0.00608 | 15.8 | 65.3 |
| [Label fact, evidence, hypothesis](../label.md) | off | **12/15** | 12 of 15 (1 run) | 0 | 0 | 0 | 0 | 4490 | 114 | 0.00202 | 0.00013 | 1.1 | 1.3 |
| [Label fact, evidence, hypothesis](../label.md) | on | **16/20** | 16 of 20 (1 run) | 1 | 1 | 0 | 0 | 5742 | 28708 | 0.0943 | 0.00471 | 11.4 | 44.8 |
| [Translate, figures kept](../translate.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 1635 | 503 | 0.00180 | 0.00011 | 1.4 | 1.9 |
| [Translate, figures kept](../translate.md) | on | **16/20** | 16 of 20 (1 run) | 0 | 4 | 0 | 0 | 1870 | 41707 | 0.1432 | 0.00716 | 24.4 | 43.5 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4968 | 1181 | 0.00465 | 0.00027 | 2.2 | 2.5 |
| [Extract a warning](../extract-warning.md) | on | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4934 | 21258 | 0.0722 | 0.00425 | 16.9 | 21.2 |

## What we would use it for

*Ours, a hypothesis from these runs.* Only with reasoning off. At its default it reasons at great length: the dearest row here (half a US cent an item, 10 to 25 seconds) and it ran out of tokens on 4 of 20 translations. With reasoning off it matched the best on decisions (10 of 10) and translation (17 of 17 answered) at a fourteenth to a seventieth of the price. Nothing it does here is not done as well by Gemma 4 for less.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Extract a decision, on** (1 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} |  | **cut off** |

**Label fact, evidence, hypothesis, off** (3 of 15):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2132](../label.md#s-1110t2132) | fact | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |

**Label fact, evidence, hypothesis, on** (4 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2030](../label.md#s-1110t2030) | evidence |  | **malformed** |
| [s-1110T2153](../label.md#s-1110t2153) | fact |  | **cut off** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Translate, figures kept, on** (4 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [t01](../translate.md#t01) | figures 5 7 11 13 4 5; units metre |  | **cut off** |
| [t05](../translate.md#t05) | figures 4 5; units metre |  | **cut off** |
| [t07](../translate.md#t07) | figures 100 140; units km/h |  | **cut off** |
| [t19](../translate.md#t19) | figures ; units  |  | **cut off** |
