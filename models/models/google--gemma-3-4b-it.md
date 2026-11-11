---
title: Model: Google: Gemma 3 4B
summary: Google: Gemma 3 4B as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Google: Gemma 3 4B

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `google/gemma-3-4b-it` (through OpenRouter).

## What it is

- **Publisher:** Google.
- **Open weights:** yes. The weights: [google/gemma-3-4b-it](https://huggingface.co/google/gemma-3-4b-it) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Gemma Terms of Use (Google's own terms) ([the text](https://ai.google.dev/gemma/terms)). The card's licence field: `gemma`; the card is gated. Read 2026-11-11 02:52 UTC at [huggingface.co/google/gemma-3-4b-it](https://huggingface.co/google/gemma-3-4b-it).
- **What that licence allows:** Not a standard open-source licence: Google's own terms, with a prohibited-use policy; the card is gated (the terms are accepted before download). We read the card's licence tag only, not the terms: read them before relying on this model beyond a test through an API.
- **Reasoning:** `google/gemma-3-4b-it`: does not reason.
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.05 US dollars per million tokens in, 0.1 out. Listed there since 2025-03-13. Our grouping: open-weight, small.

## Its use here, in one line

**78 runs** on 5 tasks, **48 right**; 0 not answered (malformed, cut off, refused or a provider error); **55,508 tokens in, 10,111 out; 0.00287 US dollars**. Source: [results.json](../results.json), made 2026-11-11 03:06 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | does not reason | **0/11** | 0 of 4 (1 run) | 0 | 0 | 0 | 0 | 35294 | 6566 | 0.00194 | 0.00018 | 13.7 | 23.3 |
| [Extract a decision](../extract-decision.md) | does not reason | **3/10** | 3 of 10 (1 run) | 0 | 0 | 0 | 0 | 7305 | 943 | 0.00032 | 0.000032 | 2.8 | 3.9 |
| [Label fact, evidence, hypothesis](../label.md) | does not reason | **8/20** | 8 of 20 (1 run) | 0 | 0 | 0 | 0 | 6080 | 181 | 0.00024 | 0.000012 | 0.7 | 1.1 |
| [Translate, figures kept](../translate.md) | does not reason | **20/20** | 20 of 20 (1 run) | 0 | 0 | 0 | 0 | 1853 | 825 | 0.00010 | 0.000005 | 1.5 | 2.9 |
| [Extract a warning](../extract-warning.md) | does not reason | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4976 | 1596 | 0.00027 | 0.000016 | 3.2 | 3.6 |

## What we would use it for

*Ours, a hypothesis from these runs.* Translation at volume and nothing else. It kept every figure in all 20 warning texts for 0.0005 US dollars per 100, and copied CAP fields perfectly; it got 8 of 20 labels and 3 of 10 decisions (it invents hours and deciders), and none of the harder warnings items it reached. A 4-billion-parameter model: usable where a mechanical check (the figures check) stands behind every output.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, does not reason** (4 of 4):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"fog","level":"none","end_utc":"none"},{ | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-10T15:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026- | **wrong** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"agitation_maritime","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"precipitation","level":"yellow | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"fog","level":"none","end_utc":"none"},{ | **wrong** |

**Extract a decision, does not reason** (7 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d04](../extract-decision.md#d04) | {"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | {"decider":"madeira-prociv","what":"Red Alert for heavy rain","effect_from_utc":"2026-11-10T21:00:00Z","effect_to_utc":"2026-11-11T06:00:00Z"} | **wrong** |
| [d05](../extract-decision.md#d05) | {"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | {"decider":"madeira-prociv","what":"Red Alert for heavy rain","effect_from_utc":"2026-11-10T21:00:00Z","effect_to_utc":"2026-11-11T06:00:00Z"} | **wrong** |
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** |
| [d07](../extract-decision.md#d07) | {"decider":"websummit","effect_from_utc":null,"effect_to_utc":null} | {"decider":"government","what":"Day 2 cancelled","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | **wrong** |
| [d08](../extract-decision.md#d08) | {"decider":"websummit","effect_from_utc":null,"effect_to_utc":null} | {"decider":"websummit","what":"Proceed with Day 3 as planned","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** |
| [d09](../extract-decision.md#d09) | {"decider":"aemet","effect_from_utc":null,"effect_to_utc":null} | {"decider":"aemet","what":"Strong rain, strong gusts and stormy seas","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** |
| [d10](../extract-decision.md#d10) | {"decider":"metro","effect_from_utc":null,"effect_to_utc":null} | {"decider":"camara-lisboa","what":"Increased street cleaning schedule","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T00:00Z"} | **wrong** |

**Label fact, evidence, hypothesis, does not reason** (12 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1753](../label.md#s-1110t1753) | evidence | fact | **wrong** |
| [s-1110T1825](../label.md#s-1110t1825) | evidence | hypothesis | **wrong** |
| [s-1110T1941](../label.md#s-1110t1941) | evidence | fact | **wrong** |
| [s-1110T1945](../label.md#s-1110t1945) | evidence | fact | **wrong** |
| [s-1110T1952](../label.md#s-1110t1952) | fact | evidence | **wrong** |
| [s-1110T2008](../label.md#s-1110t2008) | evidence | hypothesis | **wrong** |
| [s-1110T2030](../label.md#s-1110t2030) | evidence | fact | **wrong** |
| [s-1110T2118](../label.md#s-1110t2118) | hypothesis | fact | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | hypothesis | **wrong** |
| [s-1110T2354](../label.md#s-1110t2354) | hypothesis | fact | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |
