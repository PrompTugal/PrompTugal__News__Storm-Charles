---
title: Models: extract a decision
summary: 10 items from the data room, 15 rows: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="extract-decision" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Extract a decision

> Kept by incident.models@web-summit.dinis, 11 November 2026, 03:06 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

From a short official passage, say who decided and which hours the decision covers. The gold answer is the decision graph's own edge (kept by incident.researcher@): its decider and its effect window, which the graph fills 'only from the source's own words' and leaves null where the source gives no clock hours. So most answers here are null on purpose: the test is also whether a model invents hours.

Scoring: each field exact; an item is right when all three are. The model's one-line 'what' is published and not scored.. Last run 2026-11-11 02:56 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 03:06 UTC from the runs) and [ledger-summary.json](ledger-summary.json).

## The instruction

The same for every model (the item follows it as the user's message):

```
You read one short official passage about Storm Charles (Portugal, 10 to 12 November 2026) and record the decision in it. Answer with one JSON object and nothing else: no explanation, no code fence.
Keys: "decider" (the id of the body that decided or warned, from the list below), "what" (one short English line), "effect_from_utc" and "effect_to_utc" (the hours the decision covers, UTC, written YYYY-MM-DDTHH:MMZ; Lisbon and Madeira are on UTC in November).
Rule: fill a time only when the passage itself states the clock hour; a day, a night or "Wednesday" without an hour is null. Never infer an hour.
Deciders:
ipma: IPMA (Instituto Português do Mar e da Atmosfera)
anepc: ANEPC (Autoridade Nacional de Emergência e Proteção Civil)
government: Government of Portugal (Council of Ministers)
mai: Ministry of Internal Administration (MAI)
pm: Prime Minister
camara-lisboa: Câmara Municipal de Lisboa (mayor, municipal civil protection)
schools: Schools (Ministry of Education)
metro: Metropolitano de Lisboa
carris: Carris
cp: CP (Comboios de Portugal) and Infraestruturas de Portugal
lusoponte: Lusoponte (25 de Abril and Vasco da Gama bridges)
tunnels: Lisbon road tunnels (city)
ferries: Transtejo Soflusa (Tagus ferries)
rede-expressos: Rede Expressos (intercity coaches)
airport: Lisbon airport (ANA, Humberto Delgado) and airlines
amn: Autoridade Marítima Nacional and the Port of Lisbon
venue: Venue operators: MEO Arena and FIL
websummit: Web Summit (the organisers)
side-events: Side events on Wednesday (e.g. Dear Gatekeepers Live, MEO Arena studio; Night Summit)
fertagus: Fertagus (trains across the 25 de Abril bridge)
carris-metropolitana: Carris Metropolitana
flixbus: FlixBus
pitch: PITCH (Web Summit's startup competition)
night-summit: Night Summit (Web Summit's own evening events)
madeira-gov: Governo Regional da Madeira
madeira-prociv: Serviço Regional de Proteção Civil (Madeira)
madeira-airport: Madeira airport (ANA) and airlines
apram: APRAM (Administração dos Portos da Madeira)
aemet: AEMET (Spain's meteorological agency)
gnr: GNR (Guarda Nacional Republicana)
mmp: Museus e Monumentos de Portugal (MMP)
tap: TAP Air Portugal
csm: Conselho Superior da Magistratura (courts)
mj: Ministry of Justice
capitania-lisboa: Capitania do Porto de Lisboa (harbour master, Autoridade Marítima Nacional)
```

## The table

| Model, reasoning | Kind | Runs right | Items right, run by run | Changed between runs | `decider` | `effect_from_utc` | `effect_to_utc` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [`google/gemma-3-4b-it`](models/google--gemma-3-4b-it.md): does not reason | open-weight, small | **3/10** | 3 of 10 (1 run) |  | 6 | 5 | 5 | 0 | 0 | 0 | 0 | 0.000032 | 2.8 | 3.9 |
| [`openai/gpt-oss-20b`](models/openai--gpt-oss-20b.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, small | **9/10** | 9 of 10 (1 run) |  | 9 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00011 | 2.3 | 14.6 |
| [`mistralai/ministral-8b-2512`](models/mistralai--ministral-8b-2512.md): does not reason | open-weight, small | **8/10** | 8 of 10 (1 run) |  | 10 | 8 | 9 | 0 | 0 | 0 | 0 | 0.000078 | 0.9 | 1.0 |
| [`qwen/qwen3.5-9b#reasoning-off`](models/qwen--qwen3.5-9b.md): off (asked) | open-weight, small | **6/10** | 6 of 10 (1 run) |  | 8 | 8 | 9 | 0 | 0 | 0 | 0 | 0.000073 | 1.6 | 12.3 |
| [`qwen/qwen3.5-9b`](models/qwen--qwen3.5-9b.md): on (the provider's default) | open-weight, small | **9/10** | 9 of 10 (1 run) |  | 10 | 9 | 10 | 0 | 0 | 0 | 0 | 0.00041 | 30.3 | 99.5 |
| [`google/gemma-4-31b-it`](models/google--gemma-4-31b-it.md): off (the provider's default) | open-weight, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.000100 | 1.1 | 1.8 |
| [`meta-llama/llama-4-maverick`](models/meta-llama--llama-4-maverick.md): does not reason | open-weight, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00021 | 0.9 | 1.4 |
| [`deepseek/deepseek-v4.1-flash`](models/deepseek--deepseek-v4.1-flash.md): on (the provider's default) | open-weight, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00049 | 3.0 | 9.1 |
| [`qwen/qwen3.5-397b-a17b#reasoning-off`](models/qwen--qwen3.5-397b-a17b.md): off (asked) | open-weight, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00044 | 2.0 | 2.6 |
| [`qwen/qwen3.5-397b-a17b`](models/qwen--qwen3.5-397b-a17b.md): on (the provider's default) | open-weight, large | **9/10** | 9 of 10 (1 run) |  | 9 | 9 | 9 | 0 | 1 | 0 | 0 | 0.00608 | 15.8 | 65.3 |
| [`mistralai/mistral-large-4-0`](models/mistralai--mistral-large-4-0.md): reasons; cannot be turned off (the provider refuses the setting) | open-weight, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00328 | 6.9 | 13.2 |
| [`openai/gpt-6-luna`](models/openai--gpt-6-luna.md): off (the provider's default) | commercial, small | **9/10** | 9 of 10 (1 run) |  | 9 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00012 | 2.6 | 4.9 |
| [`google/gemini-3.5-flash-lite`](models/google--gemini-3.5-flash-lite.md): reasons; cannot be turned off (the provider refuses the setting) | commercial, small | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00036 | 0.8 | 1.0 |
| [`anthropic/claude-haiku-5.5`](models/anthropic--claude-haiku-5.5.md): off (the provider's default) | commercial, small | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00022 | 1.6 | 1.8 |
| [`openai/gpt-6.1-terra`](models/openai--gpt-6.1-terra.md): off (the provider's default) | commercial, large | **10/10** | 10 of 10 (1 run) |  | 10 | 10 | 10 | 0 | 0 | 0 | 0 | 0.00100 | 1.9 | 2.7 |

The field columns count the first run. "Changed between runs": items a row got right in one run and wrong in another, at temperature 0.

**Reading (ours, a hypothesis):** The errors are of two kinds, and both are the ones a curator must not make. Inventing hours: asked for the window of IPMA's communiqué sentence, which gives none, three small models filled in the communiqué's issue time, and one gave the metro's 'nights of 10 to 11 and 11 to 12' clock hours it does not state. Naming the wrong decider: two models gave the Government for Web Summit's own sentence 'will respect the Government's direction, and accordingly, Day 2 will not take place' (the organisers decided; the government advised), and the smallest gave Madeira's civil protection for IPMA's warnings in Madeira. Ten items: enough to see the kinds of error, not to rank the models that made none.

## Item by item

First run of each row.

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b #reasoning-off | qwen3.5-9b | gemma-4-31b-it | llama-4-maverick | deepseek-v4.1-flash | qwen3.5-397b-a17b #reasoning-off | qwen3.5-397b-a17b | mistral-large-4-0 | gpt-6-luna | gemini-3.5-flash-lite | claude-haiku-5.5 | gpt-6.1-terra |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [d01](#d01) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [d02](#d02) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [d03](#d03) | 15/15 | right | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [d04](#d04) | 13/15 | **no** | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right |
| [d05](#d05) | 13/15 | **no** | right | right | **no** | right | right | right | right | right | right | right | right | right | right | right |
| [d06](#d06) | 10/15 | **no** | right | **no** | **no** | **no** | right | right | right | right | **no** | right | right | right | right | right |
| [d07](#d07) | 12/15 | **no** | **no** | right | right | right | right | right | right | right | right | right | **no** | right | right | right |
| [d08](#d08) | 14/15 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [d09](#d09) | 14/15 | **no** | right | right | right | right | right | right | right | right | right | right | right | right | right | right |
| [d10](#d10) | 12/15 | **no** | right | **no** | **no** | right | right | right | right | right | right | right | right | right | right | right |

### d01

```
Published at: portugal.gov.pt (the Government's declaration)

Declarar a situação de alerta em todo o território do Continente, entre as 00h00 do dia 11 de novembro de 2026 e as 23h59 do dia 11 de novembro de 2026;
```

Scored against: `{"decider":"government","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge gov-alert (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [portugal.gov.pt](https://portugal.gov.pt/gc25/comunicacao/noticias/governo-declara-situacao-de-alerta-em-todo-o-territorio-continental-1), read 2026-11-11 02:17 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"government","what":"Orange alert declared for mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `gpt-oss-20b` | {"decider":"government","what":"Declare alert situation in all continental territory","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"government","what":"Declare alert status across mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"government","what":"Alert declared across the mainland territory","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"government","what":"Alert declared for mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"government","what":"Declare alert situation in the entire Continental territory","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `llama-4-maverick` | {"decider":"government","what":"declare a state of alert across mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"government","what":"Declares an alert situation across mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"government","what":"Declare alert situation for the entire Continental territory","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"government","what":"Declare alert situation in Continental territory","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"government","what":"Alert situation declared for mainland Portugal","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `gpt-6-luna` | {"decider":"government","what":"Declared an alert situation across mainland Portugal.","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"government","what":"Declare a state of alert across the Portuguese mainland","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"government","what":"Declares alert situation (situação de alerta) across mainland Portugal for 11 November 2026","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"government","what":"Declared a state of alert across mainland Portugal.","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | right | 1/1 |

### d02

```
Published at: feeds.meteoalarm.org (IPMA's CAP message)

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

Scored against: `{"decider":"ipma","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge ipma-red-wind (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"ipma","what":"Red Alert Wind Warning issued for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"decider":"ipma","what":"Red Wind Warning for Lisbon, gusts up to 140 km/h","effect_from_utc":"2026-11-11T12:00:00Z","effect_to_utc":"2026-11-11T21:00:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"ipma","what":"Issue Red Wind Warning (Extreme)","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"ipma","what":"Extreme wind warning (Red) for Lisbon with gusts up to 140 km/h","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"ipma","what":"Extreme Red Wind Warning for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"ipma","what":"Extreme wind warning (Red Alert) for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"decider":"ipma","what":"Red wind warning","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"ipma","what":"Red wind warning for Lisbon: gusts up to 120 km/h, reaching 140 km/h in exposed places","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"ipma","what":"Red wind warning for gusts up to 120 km/h, potentially reaching 140 km/h in exposed areas.","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"ipma","what":"Red wind warning for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"ipma","what":"Red wind warning for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"decider":"ipma","what":"Red wind warning for Lisbon: gusts up to 120 km/h, reaching 140 km/h in the most exposed places.","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"ipma","what":"Red wind warning for Lisbon","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"ipma","what":"Red wind warning for Lisbon: gusts up to 120 km/h, up to 140 km/h in exposed places","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"ipma","what":"Red wind warning for Lisbon, with gusts up to 120 km/h and 140 km/h in exposed areas.","effect_from_utc":"2026-11-11T12:00Z","effect_to_utc":"2026-11-11T21:00Z"} | right | 1/1 |

### d03

```
Published at: feeds.meteoalarm.org (IPMA's CAP message)

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

Scored against: `{"decider":"ipma","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge ipma-red-rain-0900 (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-10 23:51 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"ipma","what":"Red Alert for heavy rain","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `gpt-oss-20b` | {"decider":"ipma","what":"Red warning for strong persistent precipitation in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"ipma","what":"Issue Red Alert for Extreme Rainfall in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"ipma","what":"Extreme red alert for strong and persistent rain in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"ipma","what":"Extreme precipitation alert","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"ipma","what":"Red warning for heavy and persistent precipitation in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"decider":"ipma","what":"Red warning for heavy and persistent rain","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"ipma","what":"Red warning for heavy and persistent precipitation in Lisbon.","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"ipma","what":"Red warning for strong and persistent precipitation in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"ipma","what":"Red alert for strong precipitation","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"ipma","what":"Red warning for extreme heavy persistent precipitation in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"decider":"ipma","what":"Extreme red warning for heavy and persistent rainfall in Lisbon.","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"ipma","what":"Red warning for heavy and persistent precipitation in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"ipma","what":"Red warning for heavy, persistent precipitation in Lisboa","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"ipma","what":"Red warning for heavy and persistent rain in Lisbon","effect_from_utc":"2026-11-11T09:00Z","effect_to_utc":"2026-11-11T18:00Z"} | right | 1/1 |

### d04

```
Published at: feeds.meteoalarm.org (IPMA's CAP message)

identifier: 2.49.0.0.620.0.PT.261110061454.MD-10-1232
sent: 2026-11-10T06:14:54+00:00
msgType: Update
event: Aviso Vermelho Precipitação
onset: 2026-11-10T21:00:00+00:00
expires: 2026-11-11T06:00:00+00:00
areaDesc: Madeira - Costa Sul
```

Scored against: `{"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261110061454.MD-10-1232 (onset, expires; the publisher of the warnings is IPMA)`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC. Note: no edge in the decision graph: the answer is the CAP message's own onset and expires.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"madeira-prociv","what":"Red Alert for heavy rain","effect_from_utc":"2026-11-10T21:00:00Z","effect_to_utc":"2026-11-11T06:00:00Z"} | **wrong** (decider) | 0/1 |
| `gpt-oss-20b` | {"decider":"ipma","what":"Red warning for heavy precipitation in Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"ipma","what":"Red Alert for precipitation issued for Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"madeira-prociv","what":"Red alert for precipitation in South Coast of Madeira","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | **wrong** (decider) | 0/1 |
| `qwen3.5-9b` | {"decider":"ipma","what":"Red rain warning","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"ipma","what":"Red warning for precipitation in Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"decider":"ipma","what":"Red warning for rain","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"ipma","what":"Red warning for heavy precipitation (rain) for Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"ipma","what":"Red warning for precipitation issued for Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"ipma","what":"Red warning for precipitation","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"ipma","what":"Red warning for precipitation","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"decider":"ipma","what":"Issued a red rainfall warning for Madeira's south coast.","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"ipma","what":"Issued Red precipitation warning for Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"ipma","what":"Red rainfall warning (Aviso Vermelho Precipitação) for Madeira - Costa Sul","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"ipma","what":"Red precipitation warning for Madeira's south coast.","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |

### d05

```
Published at: feeds.meteoalarm.org (IPMA's CAP message)

identifier: 2.49.0.0.620.0.PT.261110205239.MD-10-1237
sent: 2026-11-10T20:52:39+00:00
msgType: Update
event: Aviso Vermelho Precipitação
onset: 2026-11-10T21:00:00+00:00
expires: 2026-11-11T06:00:00+00:00
areaDesc: Madeira - Costa Norte
```

Scored against: `{"decider":"ipma","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261110205239.MD-10-1237 (onset, expires; the publisher of the warnings is IPMA)`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read 2026-11-11 01:46 UTC. Note: no edge in the decision graph: the answer is the CAP message's own onset and expires.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"madeira-prociv","what":"Red Alert for heavy rain","effect_from_utc":"2026-11-10T21:00:00Z","effect_to_utc":"2026-11-11T06:00:00Z"} | **wrong** (decider) | 0/1 |
| `gpt-oss-20b` | {"decider":"ipma","what":"Red precipitation warning for Madeira North Coast","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"ipma","what":"Red Alert for precipitation issued for Madeira - Costa Norte","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"madeira-prociv","what":"Red alert for precipitation in North Coast of Madeira","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | **wrong** (decider) | 0/1 |
| `qwen3.5-9b` | {"decider":"ipma","what":"Red rain warning","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"ipma","what":"Red precipitation warning for Madeira - Costa Norte","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `llama-4-maverick` | {"decider":"ipma","what":"Red warning for rain","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"ipma","what":"Red warning for precipitation in Madeira - Costa Norte","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"ipma","what":"Red warning for precipitation issued for Madeira - Costa Norte","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"ipma","what":"Red warning for precipitation","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"ipma","what":"Red warning for precipitation (Madeira north coast)","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gpt-6-luna` | {"decider":"ipma","what":"Red rainfall warning for Madeira's north coast.","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"ipma","what":"Red precipitation warning for Madeira - Costa Norte","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"ipma","what":"Red warning for precipitation, Madeira north coast","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"ipma","what":"Red warning for precipitation on Madeira's north coast","effect_from_utc":"2026-11-10T21:00Z","effect_to_utc":"2026-11-11T06:00Z"} | right | 1/1 |

### d06

```
Published at: ipma.pt (communiqué no. 2, issued 10 November 17:07)

Devido a esta situação foram emitidos avisos meteorológicos de nível VERMELHO e LARANJA, não se excluindo a possibilidade de agravamento em algumas regiões após as próximas atualizações dos modelos numéricos de previsão do tempo, aconselhando-se, por esse motivo, o seu acompanhamento.
```

Scored against: `{"decider":"ipma","effect_from_utc":null,"effect_to_utc":null}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge ipma-communique-2 (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read 2026-11-10 19:01 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** (effect_from_utc, effect_to_utc) | 0/1 |
| `gpt-oss-20b` | {"decider":"ipma","what":"Issued red and orange meteorological warnings","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"ipma","what":"Issued Red and Orange meteorological warnings for Storm Charles","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":null} | **wrong** (effect_from_utc) | 0/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"ipma","what":"Red and Orange weather warnings issued for Storm Charles","effect_from_utc":"2026-11-10T17:00Z","effect_to_utc":null} | **wrong** (effect_from_utc) | 0/1 |
| `qwen3.5-9b` | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":"2026-11-10T17:07Z","effect_to_utc":null} | **wrong** (effect_from_utc) | 0/1 |
| `gemma-4-31b-it` | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `llama-4-maverick` | {"decider":"ipma","what":"issued weather warnings of RED and ORANGE level","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"ipma","what":"Red and orange weather warnings issued with possible aggravation","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b` |  | **cut off** | 0/1 |
| `mistral-large-4-0` | {"decider":"ipma","what":"Issued red and orange weather warnings","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6-luna` | {"decider":"ipma","what":"Red and orange weather warnings were issued; worsening in some regions remains possible, so monitor updates.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"ipma","what":"issued red and orange weather warnings due to Storm Charles","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"ipma","what":"Red and orange weather warnings issued; possible worsening after model updates, so people should monitor forecasts","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"ipma","what":"Issued red and orange weather warnings, with possible escalation in some regions.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |

### d07

```
Published at: websummit.com (the organisers' page 'Important event update')

Web Summit will of course respect the Government's direction, and accordingly, Day 2 (Wednesday, November 11th) will not take place.
```

Scored against: `{"decider":"websummit","effect_from_utc":null,"effect_to_utc":null}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge websummit-wednesday (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [websummit.com](https://websummit.com/blog/web-summit/important-event-update-2026/), read 2026-11-10 20:59 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"government","what":"Day 2 cancelled","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-11T23:59Z"} | **wrong** (decider, effect_from_utc, effect_to_utc) | 0/1 |
| `gpt-oss-20b` | {"decider":"government","what":"Day 2 of Web Summit will not take place","effect_from_utc":null,"effect_to_utc":null} | **wrong** (decider) | 0/1 |
| `ministral-8b-2512` | {"decider":"websummit","what":"Day 2 (Wednesday, November 11) cancelled","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"websummit","what":"Day 2 of Web Summit cancelled","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"websummit","what":"Day 2 cancelled","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"websummit","what":"Day 2 of Web Summit will not take place","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `llama-4-maverick` | {"decider":"websummit","what":"cancel Day 2","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"websummit","what":"Day 2 (Wednesday, 11 November) will not take place","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"websummit","what":"Day 2 (Wednesday, November 11th) will not take place","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"websummit","what":"Web Summit Day 2 will not take place","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"websummit","what":"Day 2 (Wednesday, November 11th) will not take place","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6-luna` | {"decider":"government","what":"Day 2 of Web Summit (Wednesday, November 11) will not take place.","effect_from_utc":null,"effect_to_utc":null} | **wrong** (decider) | 0/1 |
| `gemini-3.5-flash-lite` | {"decider":"websummit","what":"Cancellation of Day 2 of the event following the Government's direction","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"websummit","what":"Web Summit Day 2 (Wednesday 11 November) will not take place, following the Government's direction","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"websummit","what":"Day 2 of Web Summit will not take place.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |

### d08

```
Published at: websummit.com (the organisers' page 'Important event update')

Web Summit aims to proceed with Day 3 (Thursday, November 12) as planned, following the passing of Storm Charles.
```

Scored against: `{"decider":"websummit","effect_from_utc":null,"effect_to_utc":null}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge websummit-thursday (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [websummit.com](https://websummit.com/blog/web-summit/important-event-update-2026/), read 2026-11-10 20:59 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"websummit","what":"Proceed with Day 3 as planned","effect_from_utc":"2026-11-11T00:00Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** (effect_from_utc, effect_to_utc) | 0/1 |
| `gpt-oss-20b` | {"decider":"websummit","what":"Proceed with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"websummit","what":"Event will proceed as planned on Thursday, November 12, despite Storm Charles","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"websummit","what":"Web Summit proceeds with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"websummit","what":"Web Summit proceeds with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"websummit","what":"Proceed with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `llama-4-maverick` | {"decider":"websummit","what":"proceed with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"websummit","what":"Day 3 to proceed as planned after Storm Charles","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"websummit","what":"Web Summit aims to proceed with Day 3 (Thursday, November 12) as planned.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"websummit","what":"Web Summit aims to proceed with Day 3 as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"websummit","what":"Aims to proceed with Day 3 (Thursday, November 12) as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6-luna` | {"decider":"websummit","what":"Web Summit aims to proceed with Day 3 as planned following Storm Charles.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"websummit","what":"Proceed with Day 3 (Thursday, November 12) as planned","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"websummit","what":"Web Summit aims to proceed with Day 3 (Thursday, November 12) as planned after Storm Charles passes","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"websummit","what":"Plans to proceed with Day 3 as scheduled after Storm Charles passes.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |

### d09

```
Published at: aemet.es (the warnings page)

Aviso especial. Lluvias fuertes y persistentes, rachas muy fuertes y temporal marítimo
```

Scored against: `{"decider":"aemet","effect_from_utc":null,"effect_to_utc":null}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge aemet-special (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [www.aemet.es](https://www.aemet.es/es/eltiempo/prediccion/avisos), read 2026-11-11 01:50 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"aemet","what":"Strong rain, strong gusts and stormy seas","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T23:59Z"} | **wrong** (effect_from_utc, effect_to_utc) | 0/1 |
| `gpt-oss-20b` | {"decider":"aemet","what":"Strong and persistent rains, very strong gusts and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"aemet","what":"Special warning for strong and persistent rain, very strong wind gusts, and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"aemet","what":"Strong and persistent rain, very strong gusts and stormy sea","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-9b` | {"decider":"aemet","what":"Special warning for strong persistent rain, very strong gusts, and maritime squall.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"aemet","what":"Special warning for heavy persistent rain, strong gusts and sea storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `llama-4-maverick` | {"decider":"aemet","what":"Special warning for heavy and persistent rain, very strong gusts and rough sea","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"aemet","what":"Special warning for heavy and persistent rain, very strong gusts and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"aemet","what":"Special warning for heavy and persistent rain, very strong gusts and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"aemet","what":"Special warning for strong persistent rains, very strong gusts and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"aemet","what":"Special warning for heavy persistent rain, very strong gusts and maritime storm","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6-luna` | {"decider":"aemet","what":"Warned of heavy, persistent rain, very strong gusts, and rough seas.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"aemet","what":"Issued an aviso especial for heavy, persistent rain, very strong gusts, and maritime storm.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"aemet","what":"Special warning: heavy, persistent rain, very strong gusts and rough seas","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"aemet","what":"Special warning for heavy, persistent rain, very strong gusts and rough seas.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |

### d10

```
Published at: metrolisboa.pt (the operator's notice on its contingency plan for homeless people)

durante as noites de 10 para 11 e de 11 para 12 de novembro
```

Scored against: `{"decider":"metro","effect_from_utc":null,"effect_to_utc":null}`, from `incidents/2026-11-10-storm-charles/data/decisions/graph.json edge metro-shelter (by, effect_from_utc, effect_to_utc; label fact)`. Source of the text: [www.metrolisboa.pt](https://www.metrolisboa.pt/), read 2026-11-10 23:33 UTC.

| Model | Answer (first run) | Result | Right in runs |
|---|---|---|---|
| `gemma-3-4b-it` | {"decider":"camara-lisboa","what":"Increased street cleaning schedule","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T00:00Z"} | **wrong** (decider, effect_from_utc, effect_to_utc) | 0/1 |
| `gpt-oss-20b` | {"decider":"metro","what":"Notice on contingency plan for homeless people","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `ministral-8b-2512` | {"decider":"metro","what":"Activate contingency plan for homeless people during nights of 10–11 and 11–12 November","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-12T00:00Z"} | **wrong** (effect_from_utc, effect_to_utc) | 0/1 |
| `qwen3.5-9b #reasoning-off` | {"decider":"metro","what":"Contingency plan for homeless people during nights of 10 to 11 and 11 to 12 November","effect_from_utc":"2026-11-10T00:00Z","effect_to_utc":"2026-11-13T00:00Z"} | **wrong** (effect_from_utc, effect_to_utc) | 0/1 |
| `qwen3.5-9b` | {"decider":"metro","what":"Contingency plan for homeless people during storm nights","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemma-4-31b-it` | {"decider":"metro","what":"Contingency plan for homeless people during the nights","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `llama-4-maverick` | {"decider":"metro","what":"activate contingency plan for homeless people","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `deepseek-v4.1-flash` | {"decider":"metro","what":"Contingency plan for homeless people during the nights of 10-11 and 11-12 November","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b #reasoning-off` | {"decider":"metro","what":"Contingency plan for homeless people activated during the nights of November 10 to 11 and 11 to 12.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `qwen3.5-397b-a17b` | {"decider":"metro","what":"Contingency plan for homeless people","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `mistral-large-4-0` | {"decider":"metro","what":"Contingency plan for homeless people during the nights of 10-11 and 11-12 November","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6-luna` | {"decider":"metro","what":"Activated its contingency plan for homeless people.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gemini-3.5-flash-lite` | {"decider":"metro","what":"Contingency plan for homeless people","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `claude-haiku-5.5` | {"decider":"metro","what":"Contingency plan for homeless people on the nights of 10-11 and 11-12 November","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
| `gpt-6.1-terra` | {"decider":"metro","what":"Contingency plan for homeless people over two nights.","effect_from_utc":null,"effect_to_utc":null} | right | 1/1 |
