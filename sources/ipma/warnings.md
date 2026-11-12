---
title: IPMA's warnings, area by area, over time
summary: Every IPMA warning above green for all 25 areas of Portugal, as a timeline: what is in the feed now, and what was replaced, withdrawn or ended between our reads.
mount: <div class="ipma" data-view="warnings" data-base="./"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's warnings, area by area, over time

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 14:52 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

Each bar above is one row of IPMA's warnings feed: an area, a type, a level, a window. IPMA's feed carries **no time of issue and no identifier**, so when IPMA changes a warning the old row disappears and a new one appears. We keep every row we have read, with the first and last read that carried it, and pair a row that went with the row that took its place (same area and type, overlapping window, first seen in that same read). "Replaced" is that pairing, ours; the rows are IPMA's.

Reads so far: 38, from 2026-11-11 02:19 to 2026-11-12 14:48 UTC. Warnings issued before our first read are marked "already there"; their earlier history (with the times IPMA sent them, from MeteoAlarm's CAP messages) is in [the meteorologist's record](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json).

## In the feed now (9)

| Area | Type (IPMA's word) | Level | From | To | IPMA's text | First in our read of (UTC) | Now |
|---|---|---|---|---|---|---|---|
| Aveiro (AVR) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |
| Beja (BJA) | Agitação Marítima | **yellow** | 2026-11-12 12:33 | 2026-11-13 03:00 | Ondas de oeste/sudoeste até 4 metros de altura significativa. | 2026-11-12 13:50 | in the feed |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |
| Faro (FAR) | Agitação Marítima | **yellow** | 2026-11-12 12:33 | 2026-11-13 03:00 | Ondas de oeste/sudoeste até 4 metros de altura significativa. | 2026-11-12 13:50 | in the feed |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |
| Setúbal (STB) | Agitação Marítima | **yellow** | 2026-11-12 12:33 | 2026-11-13 03:00 | Ondas de oeste/sudoeste até 4 metros de altura significativa. | 2026-11-12 13:50 | in the feed |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |
| Viseu (VIS) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |
| Vila Real (VRL) | Precipitação | **yellow** | 2026-11-12 15:00 | 2026-11-13 06:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | in the feed |

## No longer in the feed (231)

| Area | Type (IPMA's word) | Level | From | To | IPMA's text | First in our read of (UTC) | Now |
|---|---|---|---|---|---|---|---|
| Beja (BJA) | Agitação Marítima | **yellow** | 2026-11-12 10:25 | 2026-11-13 03:00 | Ondas de oeste/sudoeste com 4 a 4,5 metros de altura significativa. | 2026-11-12 11:49 | replaced, by 2026-11-12 13:50 |
| Faro (FAR) | Agitação Marítima | **yellow** | 2026-11-12 10:25 | 2026-11-13 03:00 | Ondas de oeste/sudoeste com 4 a 4,5 metros de altura significativa. | 2026-11-12 11:49 | replaced, by 2026-11-12 13:50 |
| Setúbal (STB) | Agitação Marítima | **yellow** | 2026-11-12 10:25 | 2026-11-13 03:00 | Ondas de oeste/sudoeste com 4 a 4,5 metros de altura significativa. | 2026-11-12 11:49 | replaced, by 2026-11-12 13:50 |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-12 06:35 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-12 07:49 | ended, by 2026-11-12 09:50 |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-12 06:35 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-12 07:49 | ended, by 2026-11-12 09:50 |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-12 06:35 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-12 07:49 | ended, by 2026-11-12 09:50 |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-12 03:00 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | replaced, by 2026-11-12 07:49 |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-12 03:00 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | replaced, by 2026-11-12 07:49 |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-12 03:00 | 2026-11-12 09:00 | Períodos de chuva, por vezes forte. | 2026-11-11 23:49 | replaced, by 2026-11-12 07:49 |
| Beja (BJA) | Agitação Marítima | **yellow** | 2026-11-11 22:44 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 23:49 | ended, by 2026-11-12 03:48 |
| Faro (FAR) | Agitação Marítima | **yellow** | 2026-11-11 22:44 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 23:49 | ended, by 2026-11-12 03:48 |
| Lisboa (LSB) | Agitação Marítima | **yellow** | 2026-11-11 22:44 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 23:49 | ended, by 2026-11-12 03:48 |
| Setúbal (STB) | Agitação Marítima | **yellow** | 2026-11-11 22:44 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 23:49 | ended, by 2026-11-12 03:48 |
| Beja (BJA) | Agitação Marítima | **yellow** | 2026-11-11 21:00 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 23:49 |
| Faro (FAR) | Agitação Marítima | **yellow** | 2026-11-11 21:00 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 23:49 |
| Lisboa (LSB) | Agitação Marítima | **yellow** | 2026-11-11 21:00 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 23:49 |
| Setúbal (STB) | Agitação Marítima | **yellow** | 2026-11-11 21:00 | 2026-11-12 03:00 | Ondas de sudoeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 23:49 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 19:18 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 20:49 | ended, by 2026-11-11 21:48 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 19:18 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 20:49 | ended, by 2026-11-11 21:48 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 19:18 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 20:49 | ended, by 2026-11-11 21:48 |
| Madeira, north coast (MCN) | Agitação Marítima | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 19:48 | ended, by 2026-11-11 21:48 |
| Madeira, south coast (MCS) | Agitação Marítima | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de oeste/sudoeste com 4 a 5 metros. | 2026-11-11 19:48 | ended, by 2026-11-11 21:48 |
| Porto Santo (MPS) | Agitação Marítima | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 19:48 | ended, by 2026-11-11 21:48 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 19:18 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 20:49 | ended, by 2026-11-11 21:48 |
| Bragança (BGC) | Precipitação | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 19:48 | withdrawn, by 2026-11-11 20:49 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 19:48 | replaced, by 2026-11-11 20:49 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 19:48 | replaced, by 2026-11-11 20:49 |
| Guarda (GDA) | Precipitação | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 19:48 | withdrawn, by 2026-11-11 20:49 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 19:48 | replaced, by 2026-11-11 20:49 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 19:09 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 19:48 | replaced, by 2026-11-11 20:49 |
| Vila Real (VRL) | Precipitação | **yellow** | 2026-11-11 19:09 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 19:48 | withdrawn, by 2026-11-11 20:49 |
| Bragança (BGC) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 15:56 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 15:56 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Guarda (GDA) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 15:56 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Madeira, north coast (MCN) | Agitação Marítima | **yellow** | 2026-11-11 12:17 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 13:50 | replaced, by 2026-11-11 19:48 |
| Madeira, south coast (MCS) | Agitação Marítima | **yellow** | 2026-11-11 12:17 | 2026-11-11 21:00 | Ondas de oeste/sudoeste com 4 a 5 metros. | 2026-11-11 13:50 | replaced, by 2026-11-11 19:48 |
| Porto Santo (MPS) | Agitação Marítima | **yellow** | 2026-11-11 12:17 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 13:50 | replaced, by 2026-11-11 19:48 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 15:56 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Vila Real (VRL) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | replaced, by 2026-11-11 19:48 |
| Aveiro (AVR) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Beja (BJA) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Castelo Branco (CBO) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Coimbra (CBR) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Évora (EVR) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Faro (FAR) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente, em especial nas serras. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Faro (FAR) | Trovoada | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; granizo com diâmetro inferior a 2 cm; rajadas entre 70 e 90 km/h. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Faro (FAR) | Vento | **orange** | 2026-11-11 15:56 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Leiria (LRA) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Lisboa (LSB) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Portalegre (PTG) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Setúbal (STB) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Santarém (STM) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Viseu (VIS) | Precipitação | **yellow** | 2026-11-11 15:56 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 16:48 | ended, by 2026-11-11 18:52 |
| Aveiro (AVR) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Bragança (BGC) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 15:06 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Beja (BJA) | Precipitação | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Beja (BJA) | Vento | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Castelo Branco (CBO) | Precipitação | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Castelo Branco (CBO) | Vento | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Coimbra (CBR) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Évora (EVR) | Precipitação | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Évora (EVR) | Vento | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 15:06 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Faro (FAR) | Precipitação | **red** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente, em especial nas serras. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Faro (FAR) | Trovoada | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; granizo com diâmetro inferior a 2 cm; rajadas entre 70 e 90 km/h. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Faro (FAR) | Vento | **red** | 2026-11-11 15:06 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Guarda (GDA) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Leiria (LRA) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Leiria (LRA) | Vento | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Rajadas até 90 km/h. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 15:06 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Lisboa (LSB) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Lisboa (LSB) | Vento | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Portalegre (PTG) | Precipitação | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Portalegre (PTG) | Vento | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 15:06 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Setúbal (STB) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Setúbal (STB) | Vento | **orange** | 2026-11-11 15:06 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Santarém (STM) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Santarém (STM) | Vento | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Rajadas até 90 km/h. | 2026-11-11 15:48 | withdrawn, by 2026-11-11 16:48 |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Viseu (VIS) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Vila Real (VRL) | Precipitação | **yellow** | 2026-11-11 15:06 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 15:48 | replaced, by 2026-11-11 16:48 |
| Aveiro (AVR) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Bragança (BGC) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 12:34 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Beja (BJA) | Precipitação | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Beja (BJA) | Vento | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Braga (BRG) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Castelo Branco (CBO) | Precipitação | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Castelo Branco (CBO) | Vento | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Coimbra (CBR) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Évora (EVR) | Precipitação | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Évora (EVR) | Vento | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 12:34 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Faro (FAR) | Precipitação | **red** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente, em especial nas serras. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Faro (FAR) | Trovoada | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; granizo com diâmetro inferior a 2 cm; rajadas entre 70 e 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Faro (FAR) | Vento | **red** | 2026-11-11 12:34 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Guarda (GDA) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Leiria (LRA) | Precipitação | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Leiria (LRA) | Vento | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Rajadas até 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 12:34 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Lisboa (LSB) | Precipitação | **red** | 2026-11-11 12:34 | 2026-11-11 15:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | ended, by 2026-11-11 15:48 |
| Lisboa (LSB) | Precipitação | **yellow** | 2026-11-11 15:00 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Lisboa (LSB) | Vento | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Portalegre (PTG) | Precipitação | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Portalegre (PTG) | Vento | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Porto (PTO) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 12:34 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Setúbal (STB) | Precipitação | **red** | 2026-11-11 12:34 | 2026-11-11 15:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | ended, by 2026-11-11 15:48 |
| Setúbal (STB) | Precipitação | **yellow** | 2026-11-11 15:00 | 2026-11-11 18:00 | Precipitação por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Setúbal (STB) | Vento | **orange** | 2026-11-11 12:34 | 2026-11-11 18:00 | Rajadas até 90 km/h, podendo atingir 110 km/h nos locais mais expostos. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Santarém (STM) | Precipitação | **red** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Santarém (STM) | Vento | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Rajadas até 90 km/h. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Viana do Castelo (VCT) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Viseu (VIS) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 18:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Vila Real (VRL) | Precipitação | **yellow** | 2026-11-11 12:34 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 13:50 | replaced, by 2026-11-11 15:48 |
| Aveiro (AVR) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Aveiro (AVR) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Vento sudoeste com rajadas até 90 km/h. | 2026-11-11 02:19 (already there) | withdrawn, by 2026-11-11 13:50 |
| Bragança (BGC) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Beja (BJA) | Agitação Marítima | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Beja (BJA) | Precipitação | **red** | 2026-11-11 09:00 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Beja (BJA) | Vento | **orange** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Braga (BRG) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Castelo Branco (CBO) | Precipitação | **red** | 2026-11-11 12:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Castelo Branco (CBO) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Coimbra (CBR) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Coimbra (CBR) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | withdrawn, by 2026-11-11 13:50 |
| Évora (EVR) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Évora (EVR) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Faro (FAR) | Agitação Marítima | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Faro (FAR) | Precipitação | **red** | 2026-11-11 09:00 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Faro (FAR) | Trovoada | **yellow** | 2026-11-11 09:00 | 2026-11-11 18:00 | Condições favoráveis para ocorrência de fenómenos meteorológicos localizados, como: trovoada; precipitação localmente forte, com acumulação entre 10 a 20 mm em 1 h; granizo com diâmetro inferior a 2 cm; rajadas entre 70 e 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Faro (FAR) | Vento | **red** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Guarda (GDA) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Guarda (GDA) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | withdrawn, by 2026-11-11 13:50 |
| Leiria (LRA) | Precipitação | **red** | 2026-11-11 12:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Leiria (LRA) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Lisboa (LSB) | Agitação Marítima | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Lisboa (LSB) | Precipitação | **red** | 2026-11-11 09:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Lisboa (LSB) | Vento | **orange** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Madeira, north coast (MCN) | Agitação Marítima | **yellow** | 2026-11-11 09:00 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Madeira, south coast (MCS) | Agitação Marítima | **yellow** | 2026-11-11 07:33 | 2026-11-11 21:00 | Ondas de oeste/sudoeste com 4 a 5 metros. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Porto Santo (MPS) | Agitação Marítima | **yellow** | 2026-11-11 09:00 | 2026-11-11 21:00 | Ondas de oeste com 4 a 4,5 metros, passando a ondas de noroeste. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Portalegre (PTG) | Precipitação | **red** | 2026-11-11 12:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Portalegre (PTG) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Porto (PTO) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Setúbal (STB) | Agitação Marítima | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Ondas de sudoeste com 5 a 7 metros e que poderão atingir até 13 metros de altura máxima. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Setúbal (STB) | Precipitação | **red** | 2026-11-11 09:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Setúbal (STB) | Vento | **orange** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Santarém (STM) | Precipitação | **red** | 2026-11-11 12:00 | 2026-11-11 18:00 | Precipitação forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 13:50 |
| Santarém (STM) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 90 km/h. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Viana do Castelo (VCT) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Viseu (VIS) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Viseu (VIS) | Vento | **yellow** | 2026-11-11 12:00 | 2026-11-11 21:00 | Vento sudoeste com rajadas até 90 km/h. | 2026-11-11 02:19 (already there) | withdrawn, by 2026-11-11 13:50 |
| Vila Real (VRL) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 08:47 | replaced, by 2026-11-11 13:50 |
| Castelo Branco (CBO) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Leiria (LRA) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Madeira, north coast (MCN) | Vento | **orange** | 2026-11-11 07:33 | 2026-11-11 12:00 | Rajadas até 100 km/h, em esepcial nos extremos leste e oeste. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Madeira, south coast (MCS) | Vento | **orange** | 2026-11-11 07:33 | 2026-11-11 12:00 | Rajadas até 100 km/h. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Porto Santo (MPS) | Vento | **orange** | 2026-11-11 07:33 | 2026-11-11 12:00 | Rajadas até 100 km/h. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Madeira, mountain regions (MRM) | Vento | **orange** | 2026-11-11 07:33 | 2026-11-11 12:00 | Rajadas até 130 km/h. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Portalegre (PTG) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Santarém (STM) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 12:48 |
| Beja (BJA) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Faro (FAR) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Lisboa (LSB) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Madeira, north coast (MCN) | Precipitação | **orange** | 2026-11-11 07:33 | 2026-11-11 09:00 | Aguaceiros, por vezes fortes | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Madeira, south coast (MCS) | Precipitação | **orange** | 2026-11-11 07:33 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Porto Santo (MPS) | Precipitação | **orange** | 2026-11-11 07:33 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Madeira, mountain regions (MRM) | Precipitação | **orange** | 2026-11-11 07:33 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Setúbal (STB) | Precipitação | **orange** | 2026-11-11 07:17 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 08:47 | ended, by 2026-11-11 09:53 |
| Aveiro (AVR) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Bragança (BGC) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Beja (BJA) | Precipitação | **orange** | 2026-11-11 00:00 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Beja (BJA) | Vento | **red** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Braga (BRG) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Castelo Branco (CBO) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Castelo Branco (CBO) | Vento | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Coimbra (CBR) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Coimbra (CBR) | Vento | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Évora (EVR) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 18:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Évora (EVR) | Vento | **red** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Faro (FAR) | Precipitação | **orange** | 2026-11-11 00:00 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Guarda (GDA) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Guarda (GDA) | Vento | **orange** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Leiria (LRA) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Leiria (LRA) | Vento | **red** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Lisboa (LSB) | Precipitação | **orange** | 2026-11-11 00:00 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Lisboa (LSB) | Vento | **red** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, north coast (MCN) | Precipitação | **orange** | 2026-11-11 06:00 | 2026-11-11 09:00 | Aguaceiros, por vezes fortes | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, north coast (MCN) | Vento | **orange** | 2026-11-10 21:00 | 2026-11-11 12:00 | Rajadas até 100 km/h, em esepcial nos extremos leste e oeste. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, south coast (MCS) | Agitação Marítima | **yellow** | 2026-11-11 00:00 | 2026-11-11 21:00 | Ondas de oeste/sudoeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, south coast (MCS) | Precipitação | **orange** | 2026-11-11 06:00 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, south coast (MCS) | Vento | **orange** | 2026-11-10 21:00 | 2026-11-11 12:00 | Rajadas até 100 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Porto Santo (MPS) | Precipitação | **orange** | 2026-11-10 21:00 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Porto Santo (MPS) | Vento | **orange** | 2026-11-10 21:00 | 2026-11-11 12:00 | Rajadas até 100 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, mountain regions (MRM) | Precipitação | **orange** | 2026-11-11 06:00 | 2026-11-11 09:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Madeira, mountain regions (MRM) | Vento | **orange** | 2026-11-11 06:00 | 2026-11-11 12:00 | Rajadas até 130 km/h. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Portalegre (PTG) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Portalegre (PTG) | Vento | **red** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Porto (PTO) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Setúbal (STB) | Precipitação | **orange** | 2026-11-11 00:00 | 2026-11-11 09:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Setúbal (STB) | Vento | **red** | 2026-11-11 09:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Santarém (STM) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 12:00 | Precipitação por vezes forte e persistente. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Santarém (STM) | Vento | **red** | 2026-11-11 12:00 | 2026-11-11 21:00 | Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Viana do Castelo (VCT) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Viseu (VIS) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Vila Real (VRL) | Precipitação | **orange** | 2026-11-11 03:00 | 2026-11-11 21:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | replaced, by 2026-11-11 08:47 |
| Aveiro (AVR) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Braga (BRG) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Coimbra (CBR) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Leiria (LRA) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Lisboa (LSB) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Madeira, north coast (MCN) | Precipitação | **red** | 2026-11-10 21:00 | 2026-11-11 06:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Madeira, south coast (MCS) | Precipitação | **red** | 2026-11-10 21:00 | 2026-11-11 06:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Madeira, mountain regions (MRM) | Precipitação | **red** | 2026-11-10 21:00 | 2026-11-11 06:00 | Chuva, por vezes forte e persistente. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Madeira, mountain regions (MRM) | Vento | **red** | 2026-11-11 00:00 | 2026-11-11 06:00 | Rajadas até 140 km/h. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Porto (PTO) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Viana do Castelo (VCT) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 06:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 06:46 |
| Beja (BJA) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 03:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 03:39 |
| Évora (EVR) | Precipitação | **yellow** | 2026-11-10 21:24 | 2026-11-11 03:00 | Precipitação persistente, por vezes forte. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 03:39 |
| Faro (FAR) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 03:00 | Ondas do quadrante oeste com 4 a 5 metros na costa ocidental, sendo ondas de sudoeste com 4 metros na costa sul do barlavento. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 03:39 |
| Setúbal (STB) | Agitação Marítima | **yellow** | 2026-11-10 21:24 | 2026-11-11 03:00 | Ondas do quadrante oeste com 4 a 5 metros. | 2026-11-11 02:19 (already there) | ended, by 2026-11-11 03:39 |

Data: [data/warnings.json](data/warnings.json) (every row, with ids of ours) · what changed read by read: [changes/warnings.json](changes/warnings.json) · the feed's page: [endpoints/warnings.md](endpoints/warnings.md). Source: [warnings_www.json](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read 2026-11-12 14:48 UTC.
