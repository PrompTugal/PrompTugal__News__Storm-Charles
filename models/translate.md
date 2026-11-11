---
title: Models: translate, figures kept
summary: 20 items from the data room, 13 models: every item, the answer it is scored against, and each model's answer marked right or wrong.
mount: <div id="models" data-view="task" data-task="translate" data-base="./"><p class="meta">The chart is drawn in the browser from <a href="results.json">results.json</a>; the same figures are in the table below.</p></div>
head: <link rel="stylesheet" href="../app/models/models.css"><script src="../app/models/models.js" defer></script>
---

# Translate, figures kept

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:34 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](index.md).

Translate IPMA's Portuguese warning text to English. There is no reference translation: the check is that every figure of the Portuguese text is in the English one, as digits and no others added, and that each unit is still there (km/h, mm, hPa; 'metros' as metre or meter). A fluent translation that writes 'five' for 5, or drops 13, is wrong here.

Scoring: the numbers in the answer are the numbers in the source (each as many times, in any order); every unit present; and the answer is not the Portuguese text again. Run 2026-11-11 02:33 UTC. Source for every figure on this page: [results.json](results.json) (made 2026-11-11 02:34 UTC from the runs below) and [ledger-summary.json](ledger-summary.json).

## The instruction

The same for every model (the item follows it as the user's message):

```
You translate one text of a Portuguese weather warning (IPMA) into plain English. Answer with one JSON object and nothing else: no explanation, no code fence.
Key: "en". Keep every figure as digits and every unit; add nothing.
```

## The table

| Model | Kind | Right | `figures` | `units` | Malformed | Cut off | Refused | Errors | Cost per item, USD | Median latency, s | p90, s |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `google/gemma-3-4b-it` | open-weight, small | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000005 | 1.5 | 2.9 |
| `openai/gpt-oss-20b` | open-weight, small | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000048 | 1.0 | 2.6 |
| `mistralai/ministral-8b-2512` | open-weight, small | **0/20** | 0 | 0 | 0 | 0 | 0 | 0 | 0.000021 | 0.8 | 1.6 |
| `qwen/qwen3.5-9b` | open-weight, small | **15/20** | 15 | 15 | 0 | 5 | 0 | 0 | 0.00035 | 26.3 | 49.1 |
| `google/gemma-4-31b-it` | open-weight, large | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000022 | 0.5 | 1.2 |
| `meta-llama/llama-4-maverick` | open-weight, large | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000052 | 0.7 | 1.3 |
| `deepseek/deepseek-v4.1-flash` | open-weight, large | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.00019 | 1.4 | 4.0 |
| `qwen/qwen3.5-397b-a17b` | open-weight, large | **16/20** | 16 | 16 | 0 | 4 | 0 | 0 | 0.00716 | 24.4 | 43.5 |
| `mistralai/mistral-large-4-0` | open-weight, large | **19/20** | 19 | 19 | 0 | 1 | 0 | 0 | 0.00328 | 6.6 | 22.7 |
| `openai/gpt-6-luna` | commercial, small | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000050 | 2.9 | 3.9 |
| `google/gemini-3.5-flash-lite` | commercial, small | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.00010 | 0.7 | 1.2 |
| `anthropic/claude-haiku-5.5` | commercial, small | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.000042 | 0.8 | 1.0 |
| `openai/gpt-6.1-terra` | commercial, large | **20/20** | 20 | 20 | 0 | 0 | 0 | 0 | 0.00049 | 2.9 | 4.1 |

**Reading (ours, a hypothesis):** Nine of thirteen models kept every figure and unit in all 20 texts, the 4-billion-parameter one among them. The failures were not mistranslations: one small model answered with nested JSON instead of a sentence (0 of 20 by our format rule, though the figures were in it), and the models that reason by default ran out of 4,000 tokens before answering on some of the longer sentences. What this check cannot see: whether the English is right. A wrong word with the right numbers passes. That needs a second check (a back-translation compared by a person, or IPMA's own English pages where they exist).

## Item by item

| Item | Right | gemma-3-4b-it | gpt-oss-20b | ministral-8b-2512 | qwen3.5-9b | gemma-4-31b-it | llama-4-maverick | deepseek-v4.1-flash | qwen3.5-397b-a17b | mistral-large-4-0 | gpt-6-luna | gemini-3.5-flash-lite | claude-haiku-5.5 | gpt-6.1-terra |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [t01](#t01) | 10/13 | right | right | **no** | **no** | right | right | right | **no** | right | right | right | right | right |
| [t02](#t02) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t03](#t03) | 11/13 | right | right | **no** | right | right | right | right | right | **no** | right | right | right | right |
| [t04](#t04) | 11/13 | right | right | **no** | **no** | right | right | right | right | right | right | right | right | right |
| [t05](#t05) | 10/13 | right | right | **no** | **no** | right | right | right | **no** | right | right | right | right | right |
| [t06](#t06) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t07](#t07) | 11/13 | right | right | **no** | right | right | right | right | **no** | right | right | right | right | right |
| [t08](#t08) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t09](#t09) | 11/13 | right | right | **no** | **no** | right | right | right | right | right | right | right | right | right |
| [t10](#t10) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t11](#t11) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t12](#t12) | 11/13 | right | right | **no** | **no** | right | right | right | right | right | right | right | right | right |
| [t13](#t13) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t14](#t14) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t15](#t15) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t16](#t16) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t17](#t17) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t18](#t18) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |
| [t19](#t19) | 11/13 | right | right | **no** | right | right | right | right | **no** | right | right | right | right | right |
| [t20](#t20) | 12/13 | right | right | **no** | right | right | right | right | right | right | right | right | right | right |

### t01

```
Prevê-se igualmente ondas de sudoeste com 5 a 7 metros a sul do Cabo Raso durante a tarde de dia 11 e que poderão atingir os 13 metros de altura máxima, diminuindo para 4 a 5 metros no início da noite.
```

Scored against: `{"figures":["5","7","11","13","4","5"],"units":["metre"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Waves from the southwest are also forecast with heights of 5 to 7 meters south of Cape Raso during the afternoon of November 11th, which may reach a maximum height of 13 meters, decreasing to 4 to 5 meters in the early evening. | right |
| `gpt-oss-20b` | It is also forecast that southwest waves of 5 to 7 metres south of Cabo Raso will occur during the afternoon of the 11th and may reach a maximum height of 13 metres, decreasing to 4 to 5 metres at the start of the night. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` |  | **cut off** |
| `gemma-4-31b-it` | Southwest waves of 5 to 7 meters are also forecast south of Cabo Raso during the afternoon of day 11, which may reach a maximum height of 13 meters, decreasing to 4 to 5 meters in the early evening. | right |
| `llama-4-maverick` | Waves from southwest with 5 to 7 meters south of Cabo Raso are also forecast during the afternoon of the 11th and may reach 13 meters maximum height, decreasing to 4 to 5 meters at the start of the night. | right |
| `deepseek-v4.1-flash` | Southwest waves of 5 to 7 metres south of Cape Raso are also forecast during the afternoon of day 11 and may reach a maximum height of 13 metres, decreasing to 4 to 5 metres in the early evening. | right |
| `qwen3.5-397b-a17b` |  | **cut off** |
| `mistral-large-4-0` | Southwesterly waves of 5 to 7 meters are also expected south of Cabo Raso during the afternoon of the 11th and may reach a maximum height of 13 meters, decreasing to 4 to 5 meters at the beginning of the night. | right |
| `gpt-6-luna` | Southwesterly waves of 5 to 7 metres are also forecast south of Cabo Raso during the afternoon of day 11, and may reach a maximum height of 13 metres, decreasing to 4 to 5 metres in the early evening. | right |
| `gemini-3.5-flash-lite` | Southwest waves of 5 to 7 meters are also forecast south of Cabo Raso during the afternoon of the 11th, which may reach a maximum height of 13 meters, decreasing to 4 to 5 meters in the early evening. | right |
| `claude-haiku-5.5` | Southwest swells of 5 to 7 metres are also forecast south of Cabo Raso during the afternoon of the 11th, and may reach a maximum height of 13 metres, decreasing to 4 to 5 metres in the early evening. | right |
| `gpt-6.1-terra` | Southwest waves of 5 to 7 metres are also expected south of Cabo Raso during the afternoon of the 11th. They may reach a maximum height of 13 metres, decreasing to 4 to 5 metres in the early evening. | right |

### t02

```
Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; rajadas entre 70 e 90 km/h.
```

Scored against: `{"figures":["10","20","1","70","90"],"units":["km/h","mm"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261108124742.PO-03-420 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Favorable conditions exist for the occurrence of localized weather phenomena, such as: thunderstorms; locally heavy precipitation with an accumulation of 10 to 20 mm in 1 hour; gusts of wind between 70 and 90 km/h. | right |
| `gpt-oss-20b` | Favorable conditions for the occurrence of localized meteorological phenomena, such as: thunderstorm; locally strong precipitation, with accumulation between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Conditions favorable for occurrence of localized weather phenomena, such as: thunderstorm; locally strong precipitation, with accumulation between 10 to 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `gemma-4-31b-it` | Favorable conditions for localized meteorological phenomena, such as: thunderstorms; locally heavy precipitation, with accumulation between 10 to 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `llama-4-maverick` | Favourable conditions for localized weather events, such as: thunderstorm; locally heavy rain, with accumulation between 10 to 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `deepseek-v4.1-flash` | Conditions favorable for the occurrence of localized weather phenomena, such as: thunderstorm; locally heavy precipitation, with accumulation between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `qwen3.5-397b-a17b` | Favorable conditions for the occurrence of localized weather phenomena, such as: thunderstorm; locally strong precipitation, with accumulation between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `mistral-large-4-0` | Favourable conditions for the occurrence of localised meteorological phenomena, such as: thunderstorm; locally heavy precipitation, with accumulation between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `gpt-6-luna` | Favorable conditions for localized weather phenomena, such as thunderstorms; locally heavy rainfall, with accumulations of 10 to 20 mm in 1 h; gusts of 70 to 90 km/h. | right |
| `gemini-3.5-flash-lite` | Favourable conditions for the occurrence of localized weather phenomena, such as: thunderstorms; locally heavy precipitation, with accumulation between 10 to 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `claude-haiku-5.5` | Conditions favourable for the occurrence of localised weather phenomena, such as: thunderstorms; locally heavy precipitation, with accumulation between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |
| `gpt-6.1-terra` | Conditions favourable for localised weather phenomena, such as thunderstorms; locally heavy rainfall, with accumulations between 10 and 20 mm in 1 h; gusts between 70 and 90 km/h. | right |

### t03

```
Com os dados disponíveis de momento, a maior probabilidade será o centro da depressão passar entre Sines e o Cabo Carvoeiro, com o vento a soprar inicialmente do quadrante sul e rodando para o quadrante norte, sendo que no bordo sul da depressão as rajadas serão da ordem dos 100 a 120 km/h, podendo ser localmente até 140 km/h.
```

Scored against: `{"figures":["100","120","140"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Based on current data, the center of the depression is most likely to pass between Sines and Cabo Carvoeiro. The wind will initially blow from the south and then rotate to the north. Along the southern edge of the depression, gusts will be in the range of 100 to 120 km/h, potentially reaching up to 140 km/h locally. | right |
| `gpt-oss-20b` | With the data available at the moment, the most likely scenario is that the center of the depression will pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the south quadrant and turning to the north quadrant, and that on the southern edge of the depression the gusts will be in the order of 100 to 120 km/h, possibly locally up to 140 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | With the data currently available, the highest probability will be for the depression centre to pass between Sines and Cape Carvoeiro, with winds initially blowing from the south quadrant and rotating to the north quadrant, with gusts on the southern edge of the depression being around 100 to 120 km/h, potentially reaching locally up to 140 km/h. | right |
| `gemma-4-31b-it` | Based on currently available data, the most likely scenario is for the center of the depression to pass between Sines and Cabo Carvoeiro, with winds initially blowing from the south quadrant and rotating to the north quadrant; on the southern edge of the depression, gusts will be around 100 to 120 km/h, potentially reaching up to 140 km/h locally. | right |
| `llama-4-maverick` | With the data available at the moment, the highest probability is that the depression's centre will pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the southern quadrant and rotating to the northern quadrant, with gusts on the southern edge of the depression being around 100 to 120 km/h, potentially reaching up to 140 km/h locally. | right |
| `deepseek-v4.1-flash` | With the data currently available, the highest probability is that the center of the depression will pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the south quadrant and turning to the north quadrant, with gusts on the southern edge of the depression in the order of 100 to 120 km/h, and may locally be up to 140 km/h. | right |
| `qwen3.5-397b-a17b` | With the data available at the moment, the highest probability is for the center of the depression to pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the southern quadrant and shifting to the northern quadrant, with gusts on the southern edge of the depression in the order of 100 to 120 km/h, possibly locally up to 140 km/h. | right |
| `mistral-large-4-0` |  | **cut off** |
| `gpt-6-luna` | Based on the data currently available, the most likely scenario is for the centre of the depression to pass between Sines and Cape Carvoeiro. The wind will initially blow from the southern quadrant, then shift to the northern quadrant. On the southern edge of the depression, gusts will reach around 100 to 120 km/h, locally up to 140 km/h. | right |
| `gemini-3.5-flash-lite` | Based on currently available data, the highest probability is that the center of the depression will pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the southern quadrant and shifting to the northern quadrant, and on the southern edge of the depression gusts will be of the order of 100 to 120 km/h, potentially reaching locally up to 140 km/h. | right |
| `claude-haiku-5.5` | Based on the data available at this moment, the most likely scenario is that the centre of the depression will pass between Sines and Cabo Carvoeiro, with the wind initially blowing from the southern quadrant and then turning to the northern quadrant. On the southern edge of the depression, gusts will be of the order of 100 to 120 km/h, and locally may reach up to 140 km/h. | right |
| `gpt-6.1-terra` | Based on the data currently available, the centre of the low-pressure system is most likely to pass between Sines and Cabo Carvoeiro. Winds will initially blow from the south, then shift to the north. On the southern side of the system, gusts will be around 100 to 120 km/h, locally reaching 140 km/h. | right |

### t04

```
Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima.
```

Scored against: `{"figures":["5","7","13"],"units":["metre"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261110120908.PO-07-4525 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Strong southwest swells with wave heights of 5 to 7 meters, potentially reaching a maximum height of 13 meters. | right |
| `gpt-oss-20b` | Southwest waves with 5 to 7 meters and that may reach up to 13 meters maximum height. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` |  | **cut off** |
| `gemma-4-31b-it` | Southwest waves with 5 to 7 meters and that may reach up to 13 meters maximum height. | right |
| `llama-4-maverick` | Southwest waves with 5 to 7 meters and that may reach up to 13 meters maximum height. | right |
| `deepseek-v4.1-flash` | Southwest waves with 5 to 7 meters and that may reach up to 13 meters maximum height. | right |
| `qwen3.5-397b-a17b` | Southwest waves with 5 to 7 meters and that may reach up to 13 meters maximum height. | right |
| `mistral-large-4-0` | Southwest waves 5 to 7 metres, which may reach up to 13 metres maximum height. | right |
| `gpt-6-luna` | Southwesterly waves of 5 to 7 meters, potentially reaching a maximum height of 13 meters. | right |
| `gemini-3.5-flash-lite` | Southwest waves of 5 to 7 meters, which may reach up to 13 meters in maximum height. | right |
| `claude-haiku-5.5` | Southwest swells of 5 to 7 metres, which could reach a maximum height of up to 13 metres. | right |
| `gpt-6.1-terra` | Waves from the southwest of 5 to 7 metres, potentially reaching a maximum height of 13 metres. | right |

### t05

```
A agitação marítima irá igualmente sofrer um agravamento neste período, com ondas de sudoeste com 4 a 5 metros na costa sul da ilha da Madeira.
```

Scored against: `{"figures":["4","5"],"units":["metre"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Marine agitation will worsen during this period, with southwest swells of 4 to 5 meters on the south coast of the island of Madeira. | right |
| `gpt-oss-20b` | The sea agitation will also worsen during this period, with southwest waves of 4 to 5 meters on the south coast of Madeira Island. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` |  | **cut off** |
| `gemma-4-31b-it` | Sea agitation will also worsen during this period, with southwest waves of 4 to 5 meters on the south coast of Madeira island. | right |
| `llama-4-maverick` | Sea conditions will also worsen during this period, with southwest waves of 4 to 5 meters on the south coast of Madeira Island. | right |
| `deepseek-v4.1-flash` | The sea state will also worsen during this period, with southwesterly waves measuring 4 to 5 meters on the south coast of the island of Madeira. | right |
| `qwen3.5-397b-a17b` |  | **cut off** |
| `mistral-large-4-0` | Sea conditions will also worsen during this period, with southwest waves of 4 to 5 meters on the south coast of the island of Madeira. | right |
| `gpt-6-luna` | The sea conditions will also worsen during this period, with southwesterly waves of 4 to 5 meters along the southern coast of Madeira Island. | right |
| `gemini-3.5-flash-lite` | Sea conditions will also worsen during this period, with southwest waves of 4 to 5 meters on the southern coast of Madeira island. | right |
| `claude-haiku-5.5` | Sea swell will also intensify during this period, with southwest waves of 4 to 5 metres on the south coast of the island of Madeira. | right |
| `gpt-6.1-terra` | Sea conditions will also worsen during this period, with waves from the southwest of 4 to 5 metres on the south coast of Madeira Island. | right |

### t06

```
A precipitação será por vezes forte na generalidade do território, com acumulados que poderão ser superiores a 100 mm em 24h em alguns locais.
```

Scored against: `{"figures":["100","24"],"units":["mm"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Precipitation will be sometimes heavy across the entire territory, with accumulations that may exceed 100 mm in 24 hours in some locations. | right |
| `gpt-oss-20b` | Precipitation will be sometimes heavy across most of the territory, with accumulations that may exceed 100 mm in 24h in some locations. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Precipitation will occasionally be heavy across most of the territory, with accumulations that may exceed 100 mm in 24h in some areas. | right |
| `gemma-4-31b-it` | Precipitation will be occasionally strong across most of the territory, with accumulations that may exceed 100 mm in 24h in some locations. | right |
| `llama-4-maverick` | Rainfall will sometimes be heavy throughout the territory, with totals that may exceed 100 mm in 24h in some places. | right |
| `deepseek-v4.1-flash` | Rainfall will be heavy at times across most of the territory, with totals that may exceed 100 mm in 24h in some places. | right |
| `qwen3.5-397b-a17b` | Precipitation will be at times heavy across most of the territory, with accumulations that may be higher than 100 mm in 24h in some places. | right |
| `mistral-large-4-0` | Rainfall will sometimes be heavy across most of the territory, with totals that may exceed 100 mm in 24h in some places. | right |
| `gpt-6-luna` | Precipitation will be heavy at times across most of the territory, with accumulations that may exceed 100 mm in 24h in some places. | right |
| `gemini-3.5-flash-lite` | Precipitation will sometimes be heavy across the entire territory, with accumulations that may exceed 100 mm in 24h in some places. | right |
| `claude-haiku-5.5` | Precipitation will at times be heavy across most of the territory, with accumulations that could exceed 100 mm in 24h in some places. | right |
| `gpt-6.1-terra` | Rainfall will sometimes be heavy across most of the territory, with totals that may exceed 100 mm in 24h in some places. | right |

### t07

```
O vento irá aumentar de intensidade, soprando de sudoeste com rajadas até 100 km/h, podendo ser da ordem de 140 km/h nas terras altas.
```

Scored against: `{"figures":["100","140"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, potentially reaching up to 140 km/h in higher elevations. | right |
| `gpt-oss-20b` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, possibly reaching around 140 km/h in the highlands. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, potentially reaching 140 km/h in high ground. | right |
| `gemma-4-31b-it` | Wind intensity will increase, blowing from the southwest with gusts up to 100 km/h, potentially reaching 140 km/h in high lands. | right |
| `llama-4-maverick` | The wind will intensify, blowing from southwest with gusts up to 100 km/h, which may be around 140 km/h in the highlands. | right |
| `deepseek-v4.1-flash` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, possibly around 140 km/h in the highlands. | right |
| `qwen3.5-397b-a17b` |  | **cut off** |
| `mistral-large-4-0` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, possibly around 140 km/h in highlands. | right |
| `gpt-6-luna` | The wind will increase in intensity, blowing from the southwest with gusts of up to 100 km/h, possibly around 140 km/h in the highlands. | right |
| `gemini-3.5-flash-lite` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, and may reach around 140 km/h in the highlands. | right |
| `claude-haiku-5.5` | The wind will increase in intensity, blowing from the southwest with gusts up to 100 km/h, possibly on the order of 140 km/h in the highlands. | right |
| `gpt-6.1-terra` | The wind will strengthen, blowing from the southwest with gusts up to 100 km/h, possibly reaching around 140 km/h in the highlands. | right |

### t08

```
Ondas de sudoeste com 4 a 5 metros.
```

Scored against: `{"figures":["4","5"],"units":["metre"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261110071840.PO-07-4518 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Strong southwest swells with wave heights of 4 to 5 meters. | right |
| `gpt-oss-20b` | Southwest waves with 4 to 5 meters. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Southwest waves with 4 to 5 meters. | right |
| `gemma-4-31b-it` | Southwest waves with 4 to 5 meters. | right |
| `llama-4-maverick` | Southwest waves with 4 to 5 metres. | right |
| `deepseek-v4.1-flash` | Southwest waves with 4 to 5 meters. | right |
| `qwen3.5-397b-a17b` | Waves from the southwest with 4 to 5 meters. | right |
| `mistral-large-4-0` | Southwesterly waves with 4 to 5 meters. | right |
| `gpt-6-luna` | Southwesterly waves of 4 to 5 metres. | right |
| `gemini-3.5-flash-lite` | Southwesterly waves of 4 to 5 meters. | right |
| `claude-haiku-5.5` | Southwest swells of 4 to 5 metres. | right |
| `gpt-6.1-terra` | Waves from the southwest, 4 to 5 meters. | right |

### t09

```
Ondas do quadrante oeste com 4 a 5 metros.
```

Scored against: `{"figures":["4","5"],"units":["metre"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261108124742.PO-07-4500 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Waves from the westerly quadrant with 4 to 5 meters. | right |
| `gpt-oss-20b` | Waves in the western quadrant with 4 to 5 meters. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` |  | **cut off** |
| `gemma-4-31b-it` | Waves from the west quadrant with 4 to 5 meters. | right |
| `llama-4-maverick` | Waves from the west quadrant with 4 to 5 metres. | right |
| `deepseek-v4.1-flash` | Waves from the west quadrant with 4 to 5 meters. | right |
| `qwen3.5-397b-a17b` | Waves from the west quadrant with 4 to 5 meters. | right |
| `mistral-large-4-0` | Waves from the west with 4 to 5 meters | right |
| `gpt-6-luna` | Waves from the west quadrant with 4 to 5 meters. | right |
| `gemini-3.5-flash-lite` | West-quadrant waves of 4 to 5 meters. | right |
| `claude-haiku-5.5` | Waves from the west quadrant with 4 to 5 metres. | right |
| `gpt-6.1-terra` | Waves from the western quadrant, 4 to 5 meters. | right |

### t10

```
Prevê-se chuva persistente e por vezes forte, podendo acumular valores superiores a 100 mm em 12 h em alguns locais, em especial nas regiões montanhosas.
```

Scored against: `{"figures":["100","12"],"units":["mm"]}`, from `incidents/2026-11-10-storm-charles/data/weather/communiques.json "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira - Comunicado nº2" (one sentence of text_pt): the figures and units of the Portuguese text itself`. Source of the text: [www.ipma.pt](https://www.ipma.pt/resources.www/rss/comunicados.xml), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Persistent and sometimes heavy rain is forecast, potentially accumulating values exceeding 100 mm in 12 hours in some locations, especially in mountainous regions. | right |
| `gpt-oss-20b` | Persistent rain is forecast, sometimes strong, with accumulations exceeding 100 mm in 12 hours in some places, especially in mountainous regions. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Persistent and at times heavy rain is expected, with accumulations exceeding 100 mm in 12 h in some areas, especially in mountainous regions. | right |
| `gemma-4-31b-it` | Persistent and sometimes heavy rain is forecast, with accumulations that may exceed 100 mm in 12 h in some locations, especially in mountainous regions. | right |
| `llama-4-maverick` | Persistent and sometimes heavy rain is forecast, possibly accumulating values above 100 mm in 12 h in some places, especially in mountainous regions. | right |
| `deepseek-v4.1-flash` | Persistent and sometimes heavy rain is expected, which may accumulate more than 100 mm in 12 h in some places, especially in mountainous regions. | right |
| `qwen3.5-397b-a17b` | Persistent and sometimes heavy rain is forecast, potentially accumulating values above 100 mm in 12 h in some locations, especially in mountainous regions. | right |
| `mistral-large-4-0` | Persistent and at times heavy rain is forecast, with accumulations potentially exceeding 100 mm in 12 h in some places, especially in mountainous regions. | right |
| `gpt-6-luna` | Persistent and at times heavy rain is forecast, with totals possibly exceeding 100 mm in 12 h in some locations, especially in mountainous regions. | right |
| `gemini-3.5-flash-lite` | Persistent and occasionally heavy rain is forecast, which may accumulate values exceeding 100 mm in 12 h in some locations, especially in mountainous regions. | right |
| `claude-haiku-5.5` | Persistent and at times heavy rain is forecast, with accumulations exceeding 100 mm in 12 h possible in some locations, especially in mountainous regions. | right |
| `gpt-6.1-terra` | Persistent and sometimes heavy rain is expected, with accumulations possibly exceeding 100 mm in 12 h in some places, especially in mountainous areas. | right |

### t11

```
Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos.
```

Scored against: `{"figures":["120","140"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261110071840.PO-01-1915 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts of up to 120 km/h, potentially reaching 140 km/h in the most exposed locations. | right |
| `gpt-oss-20b` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed areas. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Gusts up to 120 km/h, may reach 140 km/h in the most exposed areas. | right |
| `gemma-4-31b-it` | Gusts up to 120 km/h, potentially reaching 140 km/h in the most exposed locations. | right |
| `llama-4-maverick` | Gusts up to 120 km/h, which may reach 140 km/h in the most exposed places. | right |
| `deepseek-v4.1-flash` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed locations. | right |
| `qwen3.5-397b-a17b` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed locations. | right |
| `mistral-large-4-0` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed locations. | right |
| `gpt-6-luna` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed locations. | right |
| `gemini-3.5-flash-lite` | Gusts up to 120 km/h, which may reach 140 km/h in the most exposed locations. | right |
| `claude-haiku-5.5` | Gusts of up to 120 km/h, possibly reaching 140 km/h in the most exposed locations. | right |
| `gpt-6.1-terra` | Gusts up to 120 km/h, possibly reaching 140 km/h in the most exposed areas. | right |

### t12

```
Rajadas até 100 km/h, em esepcial nos extremos leste e oeste.
```

Scored against: `{"figures":["100"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MCN Vento 2026-11-10T21:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts of up to 100 km/h, especially in the eastern and western extremes. | right |
| `gpt-oss-20b` | Gusts up to 100 km/h, especially at the eastern and western extremes. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` |  | **cut off** |
| `gemma-4-31b-it` | Gusts up to 100 km/h, especially in the eastern and western extremes. | right |
| `llama-4-maverick` | Gusts up to 100 km/h, especially in the eastern and western extremities. | right |
| `deepseek-v4.1-flash` | Gusts up to 100 km/h, especially in the eastern and western extremes. | right |
| `qwen3.5-397b-a17b` | Gusts up to 100 km/h, especially in the extreme east and west. | right |
| `mistral-large-4-0` | Gusts up to 100 km/h, especially at the eastern and western extremes. | right |
| `gpt-6-luna` | Gusts up to 100 km/h, especially in the eastern and western extremities. | right |
| `gemini-3.5-flash-lite` | Gusts up to 100 km/h, especially in the far east and west extremes. | right |
| `claude-haiku-5.5` | Gusts of up to 100 km/h, especially in the eastern and western extremes. | right |
| `gpt-6.1-terra` | Gusts up to 100 km/h, especially in the eastern and western extremes. | right |

### t13

```
Rajadas até 100 km/h.
```

Scored against: `{"figures":["100"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MCS Vento 2026-11-10T21:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts up to 100 km/h. | right |
| `gpt-oss-20b` | Gusts up to 100 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Gusts up to 100 km/h. | right |
| `gemma-4-31b-it` | Gusts up to 100 km/h. | right |
| `llama-4-maverick` | Gusts up to 100 km/h. | right |
| `deepseek-v4.1-flash` | Gusts up to 100 km/h. | right |
| `qwen3.5-397b-a17b` | Gusts up to 100 km/h. | right |
| `mistral-large-4-0` | Gusts up to 100 km/h. | right |
| `gpt-6-luna` | Gusts up to 100 km/h. | right |
| `gemini-3.5-flash-lite` | Gusts up to 100 km/h. | right |
| `claude-haiku-5.5` | Gusts of wind up to 100 km/h. | right |
| `gpt-6.1-terra` | Gusts up to 100 km/h. | right |

### t14

```
Rajadas até 120 km/h.
```

Scored against: `{"figures":["120"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json CBO Vento 2026-11-11T12:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts up to 120 km/h. | right |
| `gpt-oss-20b` | Wind gusts up to 120 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Gusts up to 120 km/h. | right |
| `gemma-4-31b-it` | Gusts up to 120 km/h. | right |
| `llama-4-maverick` | Gusts up to 120 km/h. | right |
| `deepseek-v4.1-flash` | Gusts up to 120 km/h. | right |
| `qwen3.5-397b-a17b` | Gusts up to 120 km/h. | right |
| `mistral-large-4-0` | Gusts up to 120 km/h. | right |
| `gpt-6-luna` | Gusts up to 120 km/h. | right |
| `gemini-3.5-flash-lite` | Gusts up to 120 km/h. | right |
| `claude-haiku-5.5` | Gusts of up to 120 km/h. | right |
| `gpt-6.1-terra` | Gusts up to 120 km/h. | right |

### t15

```
Rajadas até 130 km/h.
```

Scored against: `{"figures":["130"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MRM Vento 2026-11-11T06:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts up to 130 km/h. | right |
| `gpt-oss-20b` | Gusts up to 130 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Gusts up to 130 km/h. | right |
| `gemma-4-31b-it` | Gusts up to 130 km/h. | right |
| `llama-4-maverick` | Gusts up to 130 km/h. | right |
| `deepseek-v4.1-flash` | Gusts up to 130 km/h. | right |
| `qwen3.5-397b-a17b` | Gusts up to 130 km/h. | right |
| `mistral-large-4-0` | Gusts up to 130 km/h. | right |
| `gpt-6-luna` | Gusts up to 130 km/h. | right |
| `gemini-3.5-flash-lite` | Gusts up to 130 km/h. | right |
| `claude-haiku-5.5` | Gusts of up to 130 km/h. | right |
| `gpt-6.1-terra` | Gusts up to 130 km/h. | right |

### t16

```
Rajadas até 140 km/h.
```

Scored against: `{"figures":["140"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MRM Vento 2026-11-11T00:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Gusts up to 140 km/h. | right |
| `gpt-oss-20b` | Wind gusts up to 140 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Gusts up to 140 km/h. | right |
| `gemma-4-31b-it` | Gusts up to 140 km/h. | right |
| `llama-4-maverick` | Gusts up to 140 km/h. | right |
| `deepseek-v4.1-flash` | Gusts up to 140 km/h. | right |
| `qwen3.5-397b-a17b` | Gusts up to 140 km/h. | right |
| `mistral-large-4-0` | Gusts up to 140 km/h. | right |
| `gpt-6-luna` | Gusts up to 140 km/h. | right |
| `gemini-3.5-flash-lite` | Gusts up to 140 km/h. | right |
| `claude-haiku-5.5` | Gusts of wind up to 140 km/h. | right |
| `gpt-6.1-terra` | Gusts up to 140 km/h. | right |

### t17

```
Vento do quadrante sul com rajadas até 75 km/h.
```

Scored against: `{"figures":["75"],"units":["km/h"]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261108011310.PO-01-1895 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Wind from the south quadrant with gusts up to 75 km/h. | right |
| `gpt-oss-20b` | South quadrant wind with gusts up to 75 km/h. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | South winds with gusts up to 75 km/h. | right |
| `gemma-4-31b-it` | South quadrant wind with gusts up to 75 km/h. | right |
| `llama-4-maverick` | South quadrant wind with gusts up to 75 km/h. | right |
| `deepseek-v4.1-flash` | Wind from the south quadrant with gusts up to 75 km/h. | right |
| `qwen3.5-397b-a17b` | Wind from the southern quadrant with gusts up to 75 km/h. | right |
| `mistral-large-4-0` | Wind from the south with gusts up to 75 km/h. | right |
| `gpt-6-luna` | Southerly winds with gusts up to 75 km/h. | right |
| `gemini-3.5-flash-lite` | Southern quadrant wind with gusts up to 75 km/h. | right |
| `claude-haiku-5.5` | Wind from the south with gusts up to 75 km/h. | right |
| `gpt-6.1-terra` | Wind from the south with gusts up to 75 km/h. | right |

### t18

```
Aguaceiros, por vezes fortes
```

Scored against: `{"figures":[],"units":[]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MCN Precipitação 2026-11-11T06:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Showers, sometimes heavy | right |
| `gpt-oss-20b` | Rain showers, sometimes heavy | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Showers, sometimes heavy | right |
| `gemma-4-31b-it` | Showers, sometimes heavy | right |
| `llama-4-maverick` | Rain showers, at times heavy | right |
| `deepseek-v4.1-flash` | Showers, sometimes heavy | right |
| `qwen3.5-397b-a17b` | Showers, sometimes heavy | right |
| `mistral-large-4-0` | Showers, sometimes heavy | right |
| `gpt-6-luna` | Showers, sometimes heavy | right |
| `gemini-3.5-flash-lite` | Showers, occasionally heavy | right |
| `claude-haiku-5.5` | Showers, sometimes heavy | right |
| `gpt-6.1-terra` | Showers, sometimes heavy | right |

### t19

```
Chuva, por vezes forte e persistente.
```

Scored against: `{"figures":[],"units":[]}`, from `incidents/2026-11-10-storm-charles/data/weather/warnings.json MCN Precipitação 2026-11-10T21:00:00Z text_pt: the figures and units of the Portuguese text itself`. Source of the text: [api.ipma.pt](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Rain, sometimes heavy and persistent. | right |
| `gpt-oss-20b` | Rain, sometimes strong and persistent. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Rain, sometimes heavy and persistent. | right |
| `gemma-4-31b-it` | Rain, sometimes heavy and persistent. | right |
| `llama-4-maverick` | Rain, at times heavy and persistent. | right |
| `deepseek-v4.1-flash` | Rain, sometimes heavy and persistent. | right |
| `qwen3.5-397b-a17b` |  | **cut off** |
| `mistral-large-4-0` | Rain, at times heavy and persistent. | right |
| `gpt-6-luna` | Rain, at times heavy and persistent. | right |
| `gemini-3.5-flash-lite` | Rain, at times heavy and persistent. | right |
| `claude-haiku-5.5` | Rain, at times heavy and persistent. | right |
| `gpt-6.1-terra` | Rain, sometimes heavy and persistent. | right |

### t20

```
Períodos de chuva ou aguaceiros, por vezes fortes e acompanhados de trovoada.
```

Scored against: `{"figures":[],"units":[]}`, from `incidents/2026-11-10-storm-charles/data/weather/cap.json identifier 2.49.0.0.620.0.PT.261105125809.PO-10-6141 description_pt: the figures and units of the Portuguese text itself`. Source of the text: [feeds.meteoalarm.org](https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal), read undefined UTC.

| Model | Answer | Result |
|---|---|---|
| `gemma-3-4b-it` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
| `gpt-oss-20b` | Periods of rain or showers, sometimes strong and accompanied by thunder. | right |
| `ministral-8b-2512` | [object Object] | **wrong** (figures, units) |
| `qwen3.5-9b` | Periods of rain or showers, sometimes heavy and accompanied by thunder. | right |
| `gemma-4-31b-it` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
| `llama-4-maverick` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorm. | right |
| `deepseek-v4.1-flash` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorm. | right |
| `qwen3.5-397b-a17b` | Periods of rain or showers, sometimes heavy and accompanied by thunder. | right |
| `mistral-large-4-0` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
| `gpt-6-luna` | Periods of rain or showers, sometimes heavy and accompanied by thunder. | right |
| `gemini-3.5-flash-lite` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
| `claude-haiku-5.5` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
| `gpt-6.1-terra` | Periods of rain or showers, sometimes heavy and accompanied by thunderstorms. | right |
