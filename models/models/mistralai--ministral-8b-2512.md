---
title: Model: Mistral: Ministral 3 8B 2512
summary: Mistral: Ministral 3 8B 2512 as used on this site: what it is and its licence, every job we gave it, its scores per task with the items it got wrong, tokens, cost, latency, and what we would use it for.
---

# Mistral: Ministral 3 8B 2512

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** One of [the models](index.md) in [Other models, measured](../index.md). The id we call it by: `mistralai/ministral-8b-2512` (through OpenRouter).

## What it is

- **Publisher:** Mistral AI.
- **Open weights:** yes. The weights: [mistralai/Ministral-3-8B-Instruct-2512](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512) on Hugging Face (the address OpenRouter's model list gives for it).
- **Licence, as its publisher states it:** Apache License 2.0 ([the text](https://www.apache.org/licenses/LICENSE-2.0)). The card's licence field: `apache-2.0`. Read 2026-11-11 02:52 UTC at [huggingface.co/mistralai/Ministral-3-8B-Instruct-2512](https://huggingface.co/mistralai/Ministral-3-8B-Instruct-2512).
- **What that licence allows:** Use, change and redistribute the weights, commercially too, keeping the licence and notices; it carries a patent grant; no warranty. A standard open-source licence.
- **Reasoning:** `mistralai/ministral-8b-2512`: does not reason.
- **List price** (OpenRouter, read 2026-11-11 02:19 UTC): 0.15 US dollars per million tokens in, 0.15 out. Listed there since 2025-12-02. Our grouping: open-weight, small.

## Its use here, in one line

**106 runs** on 5 tasks, **39 right**; 0 not answered (malformed, cut off, refused or a provider error); **147,329 tokens in, 9,559 out; 0.0219 US dollars**. Source: [results.json](../results.json), made 2026-11-11 02:59 UTC. It has written nothing on this site: every call was a test.

## Every job we gave it

| Task | Setting | Runs right | Items right, run by run | Malformed | Cut off | Refused | Errors | Tokens in | Tokens out | Cost, USD | Per item, USD | Median s | p90 s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [Warnings in force at an hour](../warnings-in-force.md) | does not reason | **0/39** | 0 of 13 (3 runs) | 0 | 0 | 0 | 0 | 127842 | 5815 | 0.0192 | 0.00049 | 1.8 | 2.6 |
| [Extract a decision](../extract-decision.md) | does not reason | **8/10** | 8 of 10 (1 run) | 0 | 0 | 0 | 0 | 7202 | 743 | 0.00078 | 0.000078 | 0.9 | 1.0 |
| [Label fact, evidence, hypothesis](../label.md) | does not reason | **14/20** | 14 of 20 (1 run) | 0 | 0 | 0 | 0 | 5755 | 439 | 0.00069 | 0.000035 | 0.5 | 0.8 |
| [Translate, figures kept](../translate.md) | does not reason | **0/20** | 0 of 20 (1 run) | 0 | 0 | 0 | 0 | 1667 | 1089 | 0.00042 | 0.000021 | 0.8 | 1.6 |
| [Extract a warning](../extract-warning.md) | does not reason | **17/17** | 17 of 17 (1 run) | 0 | 0 | 0 | 0 | 4863 | 1473 | 0.00076 | 0.000045 | 0.9 | 1.1 |

## What we would use it for

*Ours, a hypothesis from these runs.* Not for our jobs as asked. It answers fast and cheaply but did not follow the output format on translation (nested JSON instead of a sentence: 0 of 20 by our rule, though the figures were there), invented hours on two decisions, and got none of the 13 harder warnings items in any of three runs.

## The items it got wrong

First run of each setting; the item links to its page, where every model's answer is.

**Warnings in force at an hour, does not reason** (13 of 13):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [f01](../warnings-in-force.md#f01) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f02](../warnings-in-force.md#f02) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f03](../warnings-in-force.md#f03) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** |
| [f04](../warnings-in-force.md#f04) | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f05](../warnings-in-force.md#f05) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f06](../warnings-in-force.md#f06) | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f07](../warnings-in-force.md#f07) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** |
| [f08](../warnings-in-force.md#f08) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f09](../warnings-in-force.md#f09) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f10](../warnings-in-force.md#f10) | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f11](../warnings-in-force.md#f11) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** |
| [f12](../warnings-in-force.md#f12) | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | [] | **wrong** |
| [f13](../warnings-in-force.md#f13) | [] | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** |

**Extract a decision, does not reason** (2 of 10):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [d06](../extract-decision.md#d06) | {"decider":"ipma","effect_from_utc":null,"effect_to_utc":null} | {"decider":"ipma","what":"Issued Red and Orange meteorological warnings for Storm Charles","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":null} | **wrong** |
| [d10](../extract-decision.md#d10) | {"decider":"metro","effect_from_utc":null,"effect_to_utc":null} | {"decider":"metro","what":"Activate contingency plan for homeless people during nights of 10–11 and 11–12 November","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T00:00Z"} | **wrong** |

**Label fact, evidence, hypothesis, does not reason** (6 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [s-1110T1825](../label.md#s-1110t1825) | evidence | fact | **wrong** |
| [s-1110T1945](../label.md#s-1110t1945) | evidence | fact | **wrong** |
| [s-1110T2132](../label.md#s-1110t2132) | fact | evidence | **wrong** |
| [s-1110T2153](../label.md#s-1110t2153) | fact | evidence | **wrong** |
| [s-1110T2358](../label.md#s-1110t2358) | hypothesis | evidence | **wrong** |
| [s-1111T0015](../label.md#s-1111t0015) | hypothesis | fact | **wrong** |

**Translate, figures kept, does not reason** (20 of 20):

| Item | Scored against | It answered | Result |
|---|---|---|---|
| [t01](../translate.md#t01) | figures 5 7 11 13 4 5; units metre | {"forecast":{"waves":{"direction":"southwest","height":{"south_of_Cabo_Raso":{"afternoon_of_day_11":{"range":"5 to 7 meters","max_height":"13 meters","beginning_of_evening":"4 to 5 meters"}}}}}} | **wrong** |
| [t02](../translate.md#t02) | figures 10 20 1 70 90; units km/h mm | {"conditions":"Favorable for localized weather events, including: thunderstorms; locally heavy rainfall, with accumulations between 10 to 20 mm in 1 hour; gusts between 70 and 90 km/h."} | **wrong** |
| [t03](../translate.md#t03) | figures 100 120 140; units km/h | {"current_data":"Based on available data, the most likely scenario is that the center of the depression will pass between Sines and Cabo Carvoeiro. Initially, winds will blow from the south, shifting to the north. Along the southern edge of the depression, gusts will reach 100 to 120 km/h, potentially reaching up to 140 km/h locally."} | **wrong** |
| [t04](../translate.md#t04) | figures 5 7 13; units metre | {"waves":{"direction":"southwest","height":{"typical":"5 to 7 metres","maximum":"up to 13 metres"}}} | **wrong** |
| [t05](../translate.md#t05) | figures 4 5; units metre | {"sea_condition":{"forecast":"Sea conditions will worsen during this period","waves":{"direction":"southwest","height":{"min":"4","max":"5","unit":"meters"},"location":"southern coast of Madeira Island"}}} | **wrong** |
| [t06](../translate.md#t06) | figures 100 24; units mm | {"message":"Rain will sometimes be heavy across most of the country, with totals potentially exceeding 100 mm in 24 hours in some areas."} | **wrong** |
| [t07](../translate.md#t07) | figures 100 140; units km/h | {"wind":{"intensity":"will increase","direction":"southwest","gusts":{"max":"100 km/h","high_terrain":"up to 140 km/h"}}} | **wrong** |
| [t08](../translate.md#t08) | figures 4 5; units metre | {"wave_condition":{"direction":"southwest","height":{"range":"4 to 5","unit":"meters"}}} | **wrong** |
| [t09](../translate.md#t09) | figures 4 5; units metre | {"waves":{"direction":"west quadrant","height":"4 to 5 metres"}} | **wrong** |
| [t10](../translate.md#t10) | figures 100 12; units mm | {"forecast":"Persistent and at times heavy rain is expected, potentially accumulating values exceeding 100 mm in 12 hours in some areas, especially in mountainous regions."} | **wrong** |
| [t11](../translate.md#t11) | figures 120 140; units km/h | {"gusts":"up to 120 km/h, potentially reaching 140 km/h in the most exposed areas"} | **wrong** |
| [t12](../translate.md#t12) | figures 100; units km/h | {"wind_gusts":"up to 100 km/h, especially in the eastern and western extremes"} | **wrong** |
| [t13](../translate.md#t13) | figures 100; units km/h | {"wind_gusts":"up to 100 km/h"} | **wrong** |
| [t14](../translate.md#t14) | figures 120; units km/h | {"wind_gusts":"up to 120 km/h"} | **wrong** |
| [t15](../translate.md#t15) | figures 130; units km/h | {"wind_gusts":"up to 130 km/h"} | **wrong** |
| [t16](../translate.md#t16) | figures 140; units km/h | {"wind_gusts":"up to 140 km/h"} | **wrong** |
| [t17](../translate.md#t17) | figures 75; units km/h | {"wind":{"direction":"south","gusts":{"max_speed":"75","unit":"km/h"}}} | **wrong** |
| [t18](../translate.md#t18) | figures ; units  | {"message":"Showers, sometimes heavy"} | **wrong** |
| [t19](../translate.md#t19) | figures ; units  | {"weather":"Rain, sometimes heavy and persistent."} | **wrong** |
| [t20](../translate.md#t20) | figures ; units  | {"forecast":{"conditions":[{"type":"rain","intensity":["moderate","strong"],"additional":[{"phenomenon":"thunderstorm","description":"accompanied"}]}]}} | **wrong** |
