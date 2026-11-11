---
title: Model: OpenAI: GPT-6.1 Terra
summary: OpenAI: GPT-6.1 Terra as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# OpenAI: GPT-6.1 Terra

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `openai/gpt-6.1-terra` (through OpenRouter).

## What it is

- **Publisher:** OpenAI.
- **Open weights:** no. It is used only through its provider's API (here by way of OpenRouter).
- **Licence:** OpenAI's commercial terms for its API; no weights are published.
- **Reasoning:** `openai/gpt-6.1-terra`: off (the provider's default).
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 1 US dollars per million tokens in, 5 out. Listed there since 2026-10-26. Our grouping: commercial, large.

## Its use here, in one line

**67 runs** on 4 tasks, **63 right**; 0 not answered (malformed, cut off, refused or a provider error); **18,054 tokens in, 5,186 out; 0.0435 US dollars**. Source: [results.json](../results.json), made 2026-11-11 03:06 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Extract a decision](../extract-decision.md) | off | **10/10** | 10 of 10 (1 run) | 0 | 0 | 0 | 0 | 6694 | 679 | 0.00999 | 0.00100 | 1.9 | 2.7 |
| [Label fact, evidence, hypothesis](../label.md) | off | **16/20** | 16 of 20 (1 run) | 0 | 0 | 0 | 0 | 5486 | 1927 | 0.0150 | 0.00075 | 2.8 | 4.8 |
| [Translate, figures kept](../translate.md) | off | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1701 | 1627 | 0.00974 | 0.00049 | 2.9 | 4.1 |
| [Extract a warning](../extract-warning.md) | off | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4173 | 953 | 0.00885 | 0.00052 | 1.5 | 1.8 |

## What we would use it for

*Ours, a hypothesis from these runs.* The largest commercial model here, and on these small jobs no better than the cheap ones (10 of 10, 20 of 20, 16 of 20) at seven to ten times their price. Its place would be the tasks that are still hard for the others; the harder task did not reach it before the credits ran out.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Label fact, evidence, hypothesis, off** (4 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T2115](../label.md#s-1110t2115) | evidence | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2323](../label.md#s-1110t2323) | fact | hypothesis | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
