---
title: Model: Meta: Llama 4 Maverick
summary: Meta: Llama 4 Maverick as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Meta: Llama 4 Maverick

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `meta-llama/llama-4-maverick` (through OpenRouter).

## What it is

- **Publisher:** Meta.
- **Open weights:** yes. The weights: [meta-llama/Llama-4-Maverick-17B-128E-Instruct](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Llama 4 Community License (Meta's own terms). The card's licence field: `other`, named `llama4`; the card is gated. Read 2026-11-11 02:52 UTC at [huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct](https://huggingface.co/meta-llama/Llama-4-Maverick-17B-128E-Instruct).
- **What that licence allows:** Not a standard open-source licence: Meta's own community licence, with an acceptable-use policy; the card is gated (the terms are accepted before download, and we could not read the card without accepting them). We read the licence tag only: read the terms before relying on this model beyond a test through an API.
- **Reasoning:** `meta-llama/llama-4-maverick`: does not reason.
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.35 US dollars per million tokens in, 1 out. Listed there since 2025-04-05. Our grouping: open-weight, large.

## Its use here, in one line

**327 runs** on 5 tasks, **271 right**; 0 not answered (malformed, cut off, refused or a provider error); **176,775 tokens in, 11,717 out; 0.0599 US dollars**. Source: [results.json](../results.json), made 2026-11-11 22:50 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | does not reason | **4/39** | 1 to 2 of 13 (3 runs) | 0 | 0 | 0 | 0 | 97032 | 3435 | 0.0331 | 0.00085 | 1.4 | 1.9 |
| [Extract a decision](../extract-decision.md) | does not reason | **30/30** | 10 of 10 (3 runs) | 0 | 0 | 0 | 0 | 20614 | 1432 | 0.00595 | 0.00020 | 1.0 | 1.4 |
| [Label fact, evidence, hypothesis](../label.md) | does not reason | **117/138** | 38 to 40 of 46 (3 runs) | 0 | 0 | 0 | 0 | 39281 | 980 | 0.00999 | 0.000072 | 0.6 | 0.8 |
| [Translate, figures kept](../translate.md) | does not reason | **69/69** | 23 of 23 (3 runs) | 0 | 0 | 0 | 0 | 7173 | 2748 | 0.00454 | 0.000066 | 0.8 | 1.8 |
| [Extract a warning](../extract-warning.md) | does not reason | **51/51** | 17 of 17 (3 runs) | 0 | 0 | 0 | 0 | 12675 | 3122 | 0.00632 | 0.00012 | 1.2 | 1.6 |

## What we would use it for

*Ours, a hypothesis from these runs.* Equal to Gemma 4 on the round-1 tasks (10 of 10, 20 of 20, 17 of 20) and fast, so a good second reader beside it. But on the harder warnings task (compare times across seventeen messages) it got 4 of 39 runs (round 2, complete): not for anything that needs several records weighed at once. Meta's own licence, not a standard open-source one.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, does not reason** (12 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f07](../warnings-in-force.md#f07) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f08](../warnings-in-force.md#f08) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f09](../warnings-in-force.md#f09) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f10](../warnings-in-force.md#f10) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** |
| [f13](../warnings-in-force.md#f13) | [] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** |

**Label fact, evidence, hypothesis, does not reason** (6 of 46):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1109T1020](../label.md#s-1109t1020) | evidence | fact | **wrong** |
| [s-1110T1858](../label.md#s-1110t1858) | evidence | fact | **wrong** |
| [s-1110T1909](../label.md#s-1110t1909) | fact | evidence | **wrong** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | fact | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | fact | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
