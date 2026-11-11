---
title: Models: extract a warning
summary: 17 items from the data room, 15 rows: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="extract-warning" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Extract a warning

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

Extract a warning from one of IPMA's CAP messages (Common Alerting Protocol, read through MeteoAlarm's public feed). The input is the message's fields as the meteorologist keeps them in cap.json (Portuguese event and description, times with offsets); the gold answer is the same record, normalised: type and level in English, times in UTC with Z. 'sent' is in the input and is not the start.

Scoring: each field exact; an item is right when all five are. Last run 2026-11-11 02:56 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 03:06 UTC from the runs) and [ledger-summary.json](ledger-summary.json).

## The instruction

The same for every model (the item follows it as the user's message):

```
You extract one weather warning from a CAP message issued by IPMA (Portugal). Answer with one JSON object and nothing else: no explanation, no code fence.
Keys: "type" (one of: rain, wind, coastal_event, thunderstorm, fog, snow, cold, heat), "level" (yellow, orange or red), "area" (the areaDesc exactly as written), "start_utc" and "end_utc" (when the warning is in force, UTC, written YYYY-MM-DDTHH:MM:SSZ).
```

## The table

| Model, reasoning | Kind | Runs right | Items right, run by run | Changed between runs | `type` | `level` | `area` | `start_utc` | `end_utc` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [`google/gemma-3-4b-it`](models/google--gemma-3-4b-it.md): does not reason | open-weight, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000016 | 3.2 | 3.6 |
| [`openai/gpt-oss-20b`](models/openai--gpt-oss-20b.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000068 | 2.9 | 7.6 |
| [`mistralai/ministral-8b-2512`](models/mistralai--ministral-8b-2512.md): does not reason | open-weight, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000045 | 0.9 | 1.1 |
| [`qwen/qwen3.5-9b#reasoning-off`](models/qwen--qwen3.5-9b.md): off (asked) | open-weight, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000041 | 1.3 | 2.2 |
| [`qwen/qwen3.5-9b`](models/qwen--qwen3.5-9b.md): on (the provider's default) | open-weight, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00030 | 18.3 | 27.5 |
| [`google/gemma-4-31b-it`](models/google--gemma-4-31b-it.md): off (the provider's default) | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000064 | 1.0 | 2.1 |
| [`meta-llama/llama-4-maverick`](models/meta-llama--llama-4-maverick.md): does not reason | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00013 | 1.0 | 1.3 |
| [`deepseek/deepseek-v4.1-flash`](models/deepseek--deepseek-v4.1-flash.md): on (the provider's default) | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00012 | 1.1 | 2.1 |
| [`qwen/qwen3.5-397b-a17b#reasoning-off`](models/qwen--qwen3.5-397b-a17b.md): off (asked) | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00027 | 2.2 | 2.5 |
| [`qwen/qwen3.5-397b-a17b`](models/qwen--qwen3.5-397b-a17b.md): on (the provider's default) | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00425 | 16.9 | 21.2 |
| [`mistralai/mistral-large-4-0`](models/mistralai--mistral-large-4-0.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00215 | 4.8 | 11.3 |
| [`openai/gpt-6-luna`](models/openai--gpt-6-luna.md): off (the provider's default) | commercial, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000064 | 2.6 | 2.8 |
| [`google/gemini-3.5-flash-lite`](models/google--gemini-3.5-flash-lite.md): reasons; cannot be turned off (the provider refuses the setting) | commercial, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00027 | 0.8 | 0.9 |
| [`anthropic/claude-haiku-5.5`](models/anthropic--claude-haiku-5.5.md): off (the provider's default) | commercial, small | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.000077 | 0.8 | 1.8 |
| [`openai/gpt-6.1-terra`](models/openai--gpt-6.1-terra.md): off (the provider's default) | commercial, large | **17/17** | 17 of 17 (1 run) |  | 17 | 17 | 17 | 17 | 17 | 0 | 0 | 0 | 0 | 0.00052 | 1.5 | 1.8 |

The field columns count the first run. "Changed between runs": items a row got right in one run and wrong in another, at temperature 0.

**Reading (ours, a hypothesis):** Every model got every item. As built, the task is a copy with a small translation (Vermelho to red, +00:00 to Z) and it separates nothing. It does say the cheapest open-weight model here can turn a CAP message into our fields for about 0.00002 US dollars an item. A harder second version is the next step: the warning as a sentence in IPMA's communiqué, several warnings in one text, and local time in summer.

## Item by item

First run of each row.

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b #reasoning-off | qwen3.5-9b | gemma-4-31b-it | llama-4-maverick | deepseek-v4.1-flash | qwen3.5-397b-a17b #reasoning-off | qwen3.5-397b-a17b | mistral-large-4-0 | gpt-6-luna | gemini-3.5-flash-lite | claude-haiku-5.5 | gpt-6.1-terra |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [w01](#w01) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w02](#w02) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w03](#w03) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w04](#w04) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w05](#w05) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w06](#w06) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w07](#w07) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w08](#w08) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w09](#w09) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w10](#w10) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w11](#w11) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w12](#w12) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w13](#w13) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w14](#w14) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w15](#w15) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w16](#w16) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [w17](#w17) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |

### w01

```
identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6288
sent: 2026-11-10T21:23:00+00:00
msgType: Update
event: Aviso Laranja Precipitação
severity: Severe
onset: 2026-11-11T00:00:00+00:00
expires: 2026-11-11T09:00:00+00:00
areaDesc: Lisboa
description: Precipitação por vezes forte e persistente.
```

Scored against: `{"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6288`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"orange","area":"Lisboa","start_utc":"2026-11-11T00:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |

### w02

```
identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6290
sent: 2026-11-10T21:23:00+00:00
msgType: Update
event: Aviso Vermelho Precipitação
severity: Extreme
onset: 2026-11-11T09:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Lisboa
description: Precipitação forte e persistente.
```

Scored against: `{"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6290`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Lisboa","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w03

```
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

Scored against: `{"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6297`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"yellow","area":"Lisboa","start_utc":"2026-11-10T21:24:00Z","end_utc":"2026-11-11T00:00:00Z"} | right | 1/1 |

### w04

```
identifier: 2.49.0.0.620.0.PT.261110120908.PO-07-4525
sent: 2026-11-10T12:09:08+00:00
msgType: Update
event: Aviso Laranja Agitação Marítima
severity: Severe
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T21:00:00+00:00
areaDesc: Lisboa
description: Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima.
```

Scored against: `{"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110120908.PO-07-4525`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"coastal_event","level":"orange","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |

### w05

```
identifier: 2.49.0.0.620.0.PT.261110071840.PO-01-1915
sent: 2026-11-10T07:18:40+00:00
msgType: Update
event: Aviso Vermelho Vento
severity: Extreme
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T21:00:00+00:00
areaDesc: Lisboa
description: Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos.
```

Scored against: `{"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110071840.PO-01-1915`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"wind","level":"red","area":"Lisboa","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |

### w06

```
identifier: 2.49.0.0.620.0.PT.261110071840.PO-07-4518
sent: 2026-11-10T07:18:40+00:00
msgType: Update
event: Aviso Amarelo Agitação Marítima
severity: Moderate
onset: 2026-11-11T21:00:00+00:00
expires: 2026-11-12T03:00:00+00:00
areaDesc: Lisboa
description: Ondas de sudoeste com 4 a 5 metros.
```

Scored against: `{"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261110071840.PO-07-4518`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"coastal_event","level":"yellow","area":"Lisboa","start_utc":"2026-11-11T21:00:00Z","end_utc":"2026-11-12T03:00:00Z"} | right | 1/1 |

### w07

```
identifier: 2.49.0.0.620.0.PT.261108190331.PO-03-448
sent: 2026-11-08T19:03:31+00:00
msgType: Update
event: Aviso Amarelo Trovoada
severity: Moderate
onset: 2026-11-09T21:00:00+00:00
expires: 2026-11-10T15:00:00+00:00
areaDesc: Lisboa
description: Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; rajadas entre 70 e 90 km/h.
```

Scored against: `{"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261108190331.PO-03-448`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"thunderstorm","level":"yellow","area":"Lisboa","start_utc":"2026-11-09T21:00:00Z","end_utc":"2026-11-10T15:00:00Z"} | right | 1/1 |

### w08

```
identifier: 2.49.0.0.620.0.PT.261108011310.PO-01-1895
sent: 2026-11-08T01:13:10+00:00
msgType: Update
event: Aviso Amarelo Vento
severity: Moderate
onset: 2026-11-08T18:00:00+00:00
expires: 2026-11-09T06:00:00+00:00
areaDesc: Lisboa
description: Vento do quadrante sul com rajadas até 75 km/h.
```

Scored against: `{"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json lisbon_messages identifier 2.49.0.0.620.0.PT.261108011310.PO-01-1895`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"wind","level":"yellow","area":"Lisboa","start_utc":"2026-11-08T18:00:00Z","end_utc":"2026-11-09T06:00:00Z"} | right | 1/1 |

### w09

```
identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6291
sent: 2026-11-10T21:23:00+00:00
msgType: Update
event: Aviso Vermelho Precipitação
onset: 2026-11-11T09:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Setúbal
```

Scored against: `{"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6291`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Setúbal","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w10

```
identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6294
sent: 2026-11-10T21:23:00+00:00
msgType: Alert
event: Aviso Vermelho Precipitação
onset: 2026-11-11T09:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Beja
```

Scored against: `{"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6294`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Beja","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w11

```
identifier: 2.49.0.0.620.0.PT.261110212300.PO-10-6295
sent: 2026-11-10T21:23:00+00:00
msgType: Alert
event: Aviso Vermelho Precipitação
onset: 2026-11-11T09:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Faro
```

Scored against: `{"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110212300.PO-10-6295`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Faro","start_utc":"2026-11-11T09:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w12

```
identifier: 2.49.0.0.620.0.PT.261110205239.MD-10-1236
sent: 2026-11-10T20:52:39+00:00
msgType: Update
event: Aviso Laranja Precipitação
onset: 2026-11-10T21:00:00+00:00
expires: 2026-11-11T09:00:00+00:00
areaDesc: Madeira - Porto Santo
```

Scored against: `{"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110205239.MD-10-1236`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"orange","area":"Madeira - Porto Santo","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |

### w13

```
identifier: 2.49.0.0.620.0.PT.261110205239.MD-10-1237
sent: 2026-11-10T20:52:39+00:00
msgType: Update
event: Aviso Vermelho Precipitação
onset: 2026-11-10T21:00:00+00:00
expires: 2026-11-11T06:00:00+00:00
areaDesc: Madeira - Costa Norte
```

Scored against: `{"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110205239.MD-10-1237`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Madeira - Costa Norte","start_utc":"2026-11-10T21:00:00Z","end_utc":"2026-11-11T06:00:00Z"} | right | 1/1 |

### w14

```
identifier: 2.49.0.0.620.0.PT.261110205239.MD-10-1238
sent: 2026-11-10T20:52:39+00:00
msgType: Alert
event: Aviso Laranja Precipitação
onset: 2026-11-11T06:00:00+00:00
expires: 2026-11-11T09:00:00+00:00
areaDesc: Madeira - Costa Norte
```

Scored against: `{"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110205239.MD-10-1238`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"orange","area":"Madeira - Costa Norte","start_utc":"2026-11-11T06:00:00Z","end_utc":"2026-11-11T09:00:00Z"} | right | 1/1 |

### w15

```
identifier: 2.49.0.0.620.0.PT.261110163001.PO-10-6271
sent: 2026-11-10T16:30:01+00:00
msgType: Alert
event: Aviso Vermelho Precipitação
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Castelo Branco
```

Scored against: `{"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110163001.PO-10-6271`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Castelo Branco","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w16

```
identifier: 2.49.0.0.620.0.PT.261110163001.PO-10-6272
sent: 2026-11-10T16:30:01+00:00
msgType: Alert
event: Aviso Vermelho Precipitação
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Leiria
```

Scored against: `{"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110163001.PO-10-6272`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Leiria","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |

### w17

```
identifier: 2.49.0.0.620.0.PT.261110163001.PO-10-6275
sent: 2026-11-10T16:30:01+00:00
msgType: Alert
event: Aviso Vermelho Precipitação
onset: 2026-11-11T12:00:00+00:00
expires: 2026-11-11T18:00:00+00:00
areaDesc: Santarém
```

Scored against: `{"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json other_messages identifier 2.49.0.0.620.0.PT.261110163001.PO-10-6275`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"type":"rain","level":"red","area":"Santarém","start_utc":"2026-11-11T12:00:00Z","end_utc":"2026-11-11T18:00:00Z"} | right | 1/1 |
