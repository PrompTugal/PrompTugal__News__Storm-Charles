---
title: Models: warnings in force at an hour
summary: 13 items from the data room, 20 rows: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="warnings-in-force" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Warnings in force at an hour

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

Round 2, harder: all seventeen CAP messages this site holds for the Lisbon district (IPMA, through MeteoAlarm; 5 to 10 November, oldest first, most of them expired), and one question: which warnings are in force at a given hour of 11 or 12 November? The gold is not computed from the messages: it is IPMA's own warnings API as the meteorologist read it (warnings.json), filtered to the hour. A model has to compare times across seventeen messages, not copy a field. The start is not scored (IPMA's API and its CAP message give different starts for a warning already running); type, level and end are.

Scoring: the set of warnings (type, level, end) equals the gold set exactly: none missing, none extra. Last run 2026-11-11 22:42 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 22:50 UTC from the runs) and [ledger-summary.json](ledger-summary.json).

## The instruction

The same for every model (the item follows it as the user's message):

```
You are given every CAP message a newsroom holds for one district of Portugal (IPMA's weather warnings), oldest first; most have expired. Say which warnings are in force at one given hour. Answer with one JSON object and nothing else: no explanation, no code fence.
Key: "in_force", a list (empty if none) of objects with "type" (one of: rain, wind, coastal_event, thunderstorm, fog, snow, cold, heat), "level" (yellow, orange or red) and "end_utc" (when that warning expires, UTC, written YYYY-MM-DDTHH:MM:SSZ).
A warning is in force at an hour when its onset is at or before that hour and its expires is after it.
```

## The table

| Model, reasoning | Kind | Runs right | Items right, run by run | Changed between runs | `in_force` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [`google/gemma-3-4b-it`](models/google--gemma-3-4b-it.md): does not reason | open-weight, small | **0/39** | 0 of 13 (3 runs) | 0 items | 0 | 0 | 1 | 0 | 0 | 0.00023 | 11.1 | 22.5 |
| [`openai/gpt-oss-20b`](models/openai--gpt-oss-20b.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, small | **24/39** | 6 to 9 of 13 (3 runs) | 11 items | 9 | 0 | 14 | 0 | 0 | 0.00081 | 5.5 | 31.4 |
| [`mistralai/ministral-8b-2512`](models/mistralai--ministral-8b-2512.md): does not reason | open-weight, small | **0/39** | 0 of 13 (3 runs) | 0 items | 0 | 0 | 0 | 0 | 0 | 0.00049 | 1.8 | 2.6 |
| [`qwen/qwen3.5-9b#reasoning-off`](models/qwen--qwen3.5-9b.md): off (asked) | open-weight, small | **1/39** | 0 to 1 of 13 (3 runs) | 1 items | 0 | 0 | 0 | 0 | 0 | 0.00037 | 3.5 | 7.9 |
| [`qwen/qwen3.5-9b`](models/qwen--qwen3.5-9b.md): on (the provider's default) | open-weight, small | **0/13** | 0 of 13 (1 run) |  | 0 | 0 | 7 | 0 | 0 | 0.00090 | 32.3 | 49.3 |
| [`google/gemma-4-31b-it`](models/google--gemma-4-31b-it.md): off (the provider's default) | open-weight, large | **33/39** | 11 of 13 (3 runs) | 0 items | 11 | 0 | 0 | 0 | 0 | 0.00040 | 1.8 | 2.8 |
| [`google/gemma-4-31b-it#reasoning-on`](models/google--gemma-4-31b-it.md): on (asked, medium effort) | open-weight, large | **13/13** | 13 of 13 (1 run) |  | 13 | 0 | 0 | 0 | 0 | 0.00130 | 30.7 | 106.3 |
| [`meta-llama/llama-4-maverick`](models/meta-llama--llama-4-maverick.md): does not reason | open-weight, large | **4/39** | 1 to 2 of 13 (3 runs) | 1 items | 1 | 0 | 0 | 0 | 0 | 0.00085 | 1.4 | 1.9 |
| [`deepseek/deepseek-v4.1-flash#reasoning-off`](models/deepseek--deepseek-v4.1-flash.md): off (asked) | open-weight, large | **31/39** | 10 to 11 of 13 (3 runs) | 1 items | 10 | 0 | 0 | 0 | 0 | 0.00043 | 0.7 | 1.6 |
| [`deepseek/deepseek-v4.1-flash`](models/deepseek--deepseek-v4.1-flash.md): on (the provider's default) | open-weight, large | **13/13** | 13 of 13 (1 run) |  | 13 | 0 | 0 | 0 | 0 | 0.00148 | 7.1 | 14.2 |
| [`qwen/qwen3.5-397b-a17b#reasoning-off`](models/qwen--qwen3.5-397b-a17b.md): off (asked) | open-weight, large | **21/39** | 6 to 8 of 13 (3 runs) | 2 items | 8 | 0 | 0 | 0 | 0 | 0.00239 | 2.3 | 3.6 |
| [`qwen/qwen3.5-397b-a17b`](models/qwen--qwen3.5-397b-a17b.md): on (the provider's default) | open-weight, large | **5/13** | 5 of 13 (1 run) |  | 5 | 0 | 8 | 0 | 0 | 0.0156 | 30.9 | 101.1 |
| [`mistralai/mistral-large-4-0`](models/mistralai--mistral-large-4-0.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, large | **9/13** | 9 of 13 (1 run) |  | 9 | 0 | 4 | 0 | 0 | 0.00978 | 30.5 | 44.4 |
| [`openai/gpt-6-luna`](models/openai--gpt-6-luna.md): off (the provider's default) | commercial, small | **37/39** | 12 to 13 of 13 (3 runs) | 1 items | 12 | 0 | 0 | 0 | 0 | 0.00020 | 3.1 | 4.0 |
| [`openai/gpt-6-luna#reasoning-on`](models/openai--gpt-6-luna.md): on (asked, medium effort) | commercial, small | **12/13** | 12 of 13 (1 run) |  | 12 | 0 | 0 | 0 | 0 | 0.00020 | 3.1 | 3.8 |
| [`google/gemini-3.5-flash-lite`](models/google--gemini-3.5-flash-lite.md): reasons; cannot be turned off (the provider refuses the setting) | commercial, small | **20/39** | 6 to 7 of 13 (3 runs) | 1 items | 7 | 0 | 0 | 0 | 0 | 0.00113 | 0.8 | 1.0 |
| [`anthropic/claude-haiku-5.5`](models/anthropic--claude-haiku-5.5.md): off (the provider's default) | commercial, small | **39/39** | 13 of 13 (3 runs) | 0 items | 13 | 0 | 0 | 0 | 0 | 0.00065 | 3.1 | 3.5 |
| [`anthropic/claude-haiku-5.5#reasoning-on`](models/anthropic--claude-haiku-5.5.md): on (asked, medium effort) | commercial, small | **13/13** | 13 of 13 (1 run) |  | 13 | 0 | 0 | 0 | 0 | 0.00065 | 4.0 | 4.6 |
| [`openai/gpt-6.1-terra`](models/openai--gpt-6.1-terra.md): off (the provider's default) | commercial, large | **39/39** | 13 of 13 (3 runs) | 0 items | 13 | 0 | 0 | 0 | 0 | 0.00074 | 1.9 | 3.1 |
| [`openai/gpt-6.1-terra#reasoning-on`](models/openai--gpt-6.1-terra.md): on (asked, medium effort) | commercial, large | **13/13** | 13 of 13 (1 run) |  | 13 | 0 | 0 | 0 | 0 | 0.00275 | 1.8 | 3.4 |

The field columns count the first run. "Changed between runs": items a row got right in one run and wrong in another, at temperature 0.

**Reading (ours, a hypothesis):** Complete (22:47 UTC on 11 November): 13 items, each asked three times on the cheap rows. This is the task that separates the models. All 13 right: deepseek-v4.1-flash (reasoning on), gemma-4-31b with reasoning on, gpt-6.1-terra, claude-haiku-5.5 (13 of 13 in each of three runs). `google/gemma-4-31b-it` without reasoning got 33 of 39 runs and gpt-6-luna 37 of 39. `meta-llama/llama-4-maverick`, its equal on every round-1 task, got 4 of 39. The commercial comparison gemini-3.5-flash-lite got 20 of 39. deepseek-v4.1-flash with reasoning off got 31 of 39. The four models under about 10 billion parameters got 1 of 156 runs between them. Turning reasoning on helps where it can be set: gemma-4-31b goes from 11 to 13 of 13, at about the same price per item here.

## Item by item

First run of each row.

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b #reasoning-off | qwen3.5-9b | gemma-4-31b-it | gemma-4-31b-it #reasoning-on | llama-4-maverick | deepseek-v4.1-flash #reasoning-off | deepseek-v4.1-flash | qwen3.5-397b-a17b #reasoning-off | qwen3.5-397b-a17b | mistral-large-4-0 | gpt-6-luna | gpt-6-luna #reasoning-on | gemini-3.5-flash-lite | claude-haiku-5.5 | claude-haiku-5.5 #reasoning-on | gpt-6.1-terra | gpt-6.1-terra #reasoning-on |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [f01](#f01) | 9/20 | **no** | **no** | **no** | **no** | **no** | **no** | right | **no** | right | right | right | **no** | **no** | **no** | right | **no** | right | right | right | right |
| [f02](#f02) | 13/20 | **no** | right | **no** | **no** | **no** | **no** | right | **no** | right | right | right | **no** | right | right | right | right | right | right | right | right |
| [f03](#f03) | 12/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | **no** | right | **no** | right | right | right | right | **no** | right | right | right | right |
| [f04](#f04) | 11/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | **no** | right | **no** | **no** | right | right | **no** | right | right | right | right | right |
| [f05](#f05) | 10/20 | **no** | **no** | **no** | **no** | **no** | right | right | **no** | right | right | **no** | **no** | **no** | right | right | **no** | right | right | right | right |
| [f06](#f06) | 10/20 | **no** | **no** | **no** | **no** | **no** | right | right | **no** | **no** | right | **no** | **no** | right | right | right | **no** | right | right | right | right |
| [f07](#f07) | 13/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | right | **no** | **no** | right | right | right | right | right | right | right |
| [f08](#f08) | 14/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | right | **no** | right | right | right | right | right | right | right | right |
| [f09](#f09) | 14/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | right | right | right | right | right | **no** | right | right | right | right |
| [f10](#f10) | 13/20 | **no** | **no** | **no** | **no** | **no** | right | right | **no** | right | right | right | right | **no** | right | right | right | right | right | right | right |
| [f11](#f11) | 12/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | **no** | **no** | right | right | right | **no** | right | right | right | right |
| [f12](#f12) | 16/20 | **no** | right | **no** | **no** | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [f13](#f13) | 15/20 | **no** | right | **no** | **no** | **no** | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right | right |

### The seventeen messages

The same for every item of this task; only the hour asked changes.

```
identifier: 2.49.0.0.620.0.PT.261105125809.PO-10-6141
sent: 2026-11-05T12:58:09+00:00
msgType: Alert
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-06T15:00:00+00:00
expires: 2026-11-07T00:00:00+00:00
areaDesc: Lisboa
description: Períodos de chuva ou aguaceiros, por vezes fortes e acompanhados de trovoada.

identifier: 2.49.0.0.620.0.PT.261106181838.PO-10-6144
sent: 2026-11-06T18:18:38+00:00
msgType: Update
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-06T15:00:00+00:00
expires: 2026-11-06T18:19:00+00:00
areaDesc: Lisboa
description: Períodos de chuva ou aguaceiros, por vezes fortes e acompanhados de trovoada.

identifier: 2.49.0.0.620.0.PT.261107073544.PO-10-6148
sent: 2026-11-07T07:35:44+00:00
msgType: Alert
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-08T18:00:00+00:00
expires: 2026-11-09T06:00:00+00:00
areaDesc: Lisboa
description: Períodos de chuva, por vezes fortes e acompanhados de trovoada.

identifier: 2.49.0.0.620.0.PT.261108011310.PO-01-1895
sent: 2026-11-08T01:13:10+00:00
msgType: Update
event: Aviso Amarelo Vento
severity: Moderate
onset: 2026-11-08T18:00:00+00:00
expires: 2026-11-09T06:00:00+00:00
areaDesc: Lisboa
description: Vento do quadrante sul com rajadas até 75 km/h.

identifier: 2.49.0.0.620.0.PT.261108124742.PO-03-420
sent: 2026-11-08T12:47:42+00:00
msgType: Alert
event: Aviso Amarelo Trovoada
severity: Moderate
onset: 2026-11-08T18:00:00+00:00
expires: 2026-11-09T06:00:00+00:00
areaDesc: Lisboa
description: Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; rajadas entre 70 e 90 km/h.

identifier: 2.49.0.0.620.0.PT.261108124742.PO-07-4500
sent: 2026-11-08T12:47:42+00:00
msgType: Update
event: Aviso Amarelo Agitação Marítima
severity: Moderate
onset: 2026-11-09T18:00:00+00:00
expires: 2026-11-11T06:00:00+00:00
areaDesc: Lisboa
description: Ondas do quadrante oeste com 4 a 5 metros.

identifier: 2.49.0.0.620.0.PT.261108190331.PO-03-448
sent: 2026-11-08T19:03:31+00:00
msgType: Update
event: Aviso Amarelo Trovoada
severity: Moderate
onset: 2026-11-09T21:00:00+00:00
expires: 2026-11-10T15:00:00+00:00
areaDesc: Lisboa
description: Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; rajadas entre 70 e 90 km/h.

identifier: 2.49.0.0.620.0.PT.261108222309.PO-10-6216
sent: 2026-11-08T22:23:09+00:00
msgType: Update
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-09T21:00:00+00:00
expires: 2026-11-10T18:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e acompanhada de trovoada.

identifier: 2.49.0.0.620.0.PT.261109215857.PO-10-6246
sent: 2026-11-09T21:58:57+00:00
msgType: Update
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-10T09:00:00+00:00
expires: 2026-11-10T18:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e acompanhada de trovoada.

identifier: 2.49.0.0.620.0.PT.261109215857.PO-10-6248
sent: 2026-11-09T21:58:57+00:00
msgType: Alert
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-09T21:59:00+00:00
expires: 2026-11-10T00:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e acompanhada de trovoada.

identifier: 2.49.0.0.620.0.PT.261109215857.PO-10-6250
sent: 2026-11-09T21:58:57+00:00
msgType: Alert
event: Aviso Laranja Precipitação
severity: Severe
onset: 2026-11-10T00:00:00+00:00
expires: 2026-11-10T09:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e acompanhada de trovoada.

identifier: 2.49.0.0.620.0.PT.261110071840.PO-01-1915
sent: 2026-11-10T07:18:40+00:00
msgType: Update
event: Aviso Vermelho Vento
severity: Extreme
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T21:00:00+00:00
areaDesc: Lisboa
description: Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos.

identifier: 2.49.0.0.620.0.PT.261110071840.PO-07-4518
sent: 2026-11-10T07:18:40+00:00
msgType: Update
event: Aviso Amarelo Agitação Marítima
severity: Moderate
onset: 2026-11-11T21:00:00+00:00
expires: 2026-11-12T03:00:00+00:00
areaDesc: Lisboa
description: Ondas de sudoeste com 4 a 5 metros.

identifier: 2.49.0.0.620.0.PT.261110120908.PO-07-4525
sent: 2026-11-10T12:09:08+00:00
msgType: Update
event: Aviso Laranja Agitação Marítima
severity: Severe
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T21:00:00+00:00
areaDesc: Lisboa
description: Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima.

identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6288
sent: 2026-11-10T21:23:00+00:00
msgType: Update
event: Aviso Laranja Precipitação
severity: Severe
onset: 2026-11-11T00:00:00+00:00
expires: 2026-11-11T09:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e persistente.

identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6290
sent: 2026-11-10T21:23:00+00:00
msgType: Update
event: Aviso Vermelho Precipitação
severity: Extreme
onset: 2026-11-11T09:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Lisboa
description: Precipitação forte e persistente.

identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6297
sent: 2026-11-10T21:23:00+00:00
msgType: Alert
event: Aviso Amarelo Precipitação
severity: Moderate
onset: 2026-11-10T21:24:00+00:00
expires: 2026-11-11T00:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e persistente.
```

### f01

```
The hour: 2026-11-11T02:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T02:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"fog","level":"none","end_utc":"none"},{"type":"snow","level":"none","end_utc":"none"},{"type":"cold","level":"none","end_utc":"none"},{"type":"heat","level":"none","end_utc":"none"}] | **wrong** | 0/3 |
| `gpt-oss-20b` |  | **cut off** | 2/3 |
| `ministral-8b-2512` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` |  | **cut off** | 0/1 |
| `gpt-6-luna` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 1/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"}] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |

### f02

```
The hour: 2026-11-11T05:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T05:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-10T15:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","le | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |

### f03

```
The hour: 2026-11-11T06:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T06:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"agitation_maritime","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"precipitation","level":"yellow","end_utc":"2026-11-10T18:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"agitation_maritime","level":"orange","end_ | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 2/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `mistral-large-4-0` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |

### f04

```
The hour: 2026-11-11T08:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T08:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"fog","level":"none","end_utc":"none"},{"type":"snow","level":"none","end_utc":"none"},{"type":"cold","level":"none","end_utc":"none"},{"type":"heat","level":"none","end_utc":"none"}] | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 2/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [] | **wrong** | 0/1 |
| `gemini-3.5-flash-lite` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | right | 1/1 |

### f05

```
The hour: 2026-11-11T09:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T09:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"thunderstorm","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"fog","level":"orange","end_utc":"2026-11-11T06:00:00Z"}] | **wrong** | 0/3 |
| `gpt-oss-20b` |  | **cut off** | 1/3 |
| `ministral-8b-2512` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` |  | **cut off** | 0/1 |
| `gpt-6-luna` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |

### f06

```
The hour: 2026-11-11T11:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T11:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-10T15:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","le | **wrong** | 0/3 |
| `gpt-oss-20b` |  | **cut off** | 1/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 1/3 |
| `deepseek-v4.1-flash` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |

### f07

```
The hour: 2026-11-11T12:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T12:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"wind","level": | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 2/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` |  | **cut off** | 0/1 |
| `gpt-6-luna` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |

### f08

```
The hour: 2026-11-11T17:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T17:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"rain", | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 1/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | right | 1/1 |

### f09

```
The hour: 2026-11-11T18:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T18:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-10T18:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"rain", | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 2/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `mistral-large-4-0` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |

### f10

```
The hour: 2026-11-11T20:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T20:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-10T15:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-11T06:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"rain","le | **wrong** | 0/3 |
| `gpt-oss-20b` |  | **cut off** | 2/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `mistral-large-4-0` |  | **cut off** | 0/1 |
| `gpt-6-luna` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 2/3 |
| `claude-haiku-5.5` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | right | 1/1 |

### f11

```
The hour: 2026-11-11T21:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-11T21:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"wind","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"orange","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"fog","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"rain","level | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `ministral-8b-2512` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"precipitation","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [] | **wrong** | 0/3 |
| `claude-haiku-5.5` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |

### f12

```
The hour: 2026-11-12T02:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-12T02:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"rain","level":"yellow","end_utc":"2026-11-10T18:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain"," | **wrong** | 0/3 |
| `gpt-oss-20b` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 2/3 |
| `ministral-8b-2512` | [] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 1/3 |
| `qwen3.5-9b` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 0/1 |
| `gemma-4-31b-it` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `deepseek-v4.1-flash` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `qwen3.5-397b-a17b` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `mistral-large-4-0` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gpt-6-luna` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gemini-3.5-flash-lite` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |
| `gpt-6.1-terra` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | right | 1/1 |

### f13

```
The hour: 2026-11-12T03:00:00Z

(the seventeen messages above)
```

Scored against: `{"in_force":[]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json lisbon (IPMA's own warnings API as read 2026-11-11T02:38:08Z): the warnings whose start is at or before 2026-11-12T03:00:00Z and whose end is after it`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-11 02:38 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | [{"type":"rain","level":"yellow","end_utc":"2026-11-07T00:00:00Z"},{"type":"wind","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"thunderstorm","level":"yellow","end_utc":"2026-11-09T06:00:00Z"},{"type":"coastal_event","level":"yellow","end_utc":"2026-11-11T03:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T09:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"thunderstorm","level":"orange","end_utc":"2026-11-10T18:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T06:00:00Z"},{"type":"thunderstorm","level":"orange","end_utc":"2026-11-10T15:00:00Z"},{"type":"rain","level":"orange","end_utc":"2026-11-10T18:00:00Z | **wrong** | 0/3 |
| `gpt-oss-20b` | [] | right | 3/3 |
| `ministral-8b-2512` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b #reasoning-off` | [{"type":"rain","level":"orange","end_utc":"2026-11-11T09:00:00Z"},{"type":"rain","level":"red","end_utc":"2026-11-11T18:00:00Z"},{"type":"wind","level":"red","end_utc":"2026-11-11T21:00:00Z"},{"type":"coastal_event","level":"orange","end_utc":"2026-11-11T21:00:00Z"}] | **wrong** | 0/3 |
| `qwen3.5-9b` |  | **cut off** | 0/1 |
| `gemma-4-31b-it` | [] | right | 3/3 |
| `gemma-4-31b-it #reasoning-on` | [] | right | 1/1 |
| `llama-4-maverick` | [{"type":"coastal_event","level":"yellow","end_utc":"2026-11-12T03:00:00Z"}] | **wrong** | 0/3 |
| `deepseek-v4.1-flash #reasoning-off` | [] | right | 3/3 |
| `deepseek-v4.1-flash` | [] | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | [] | right | 2/3 |
| `qwen3.5-397b-a17b` | [] | right | 1/1 |
| `mistral-large-4-0` | [] | right | 1/1 |
| `gpt-6-luna` | [] | right | 3/3 |
| `gpt-6-luna #reasoning-on` | [] | right | 1/1 |
| `gemini-3.5-flash-lite` | [] | right | 3/3 |
| `claude-haiku-5.5` | [] | right | 3/3 |
| `claude-haiku-5.5 #reasoning-on` | [] | right | 1/1 |
| `gpt-6.1-terra` | [] | right | 3/3 |
| `gpt-6.1-terra #reasoning-on` | [] | right | 1/1 |
