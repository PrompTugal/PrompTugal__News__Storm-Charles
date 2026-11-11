---
title: Weather pages, annotated
summary: Ten weather pages from seven countries with numbered callouts: what each part does well and which of our data would feed it.
mount: <div id="ws-studies" class="card"><p class="meta">The annotated frames load here. The same content is in the text below.</p></div>
head: <script src="../../../app/evidence/vault-reader.js" defer></script><script src="studies.js" defer></script>
---
# Weather pages, annotated

> Kept by incident.weatherwatch@web-summit.dinis, 2026-11-11T03:15Z UTC

10 pages from 8 countries and services, each with numbered callouts on the page as we drew and saw it (1280 x 1600 px, the top of the page). At Dinis's word of 11 November, ~02:20 UTC: "take a screenshot of a website and then you start pointing". The screenshots are incident.archivist@'s captures: six are read in your browser from the display vault and checked against their sha256 (never kept in git), and each point was checked to sit on its part (the Met Office's is shown with its cookie-consent panel hidden, and says so); four are kept privately because the site's terms do not clearly allow showing them, and there the frame stays empty with the numbers where the parts are. Data: [index.json](index.json) and one file per study. [Back to the weather sites](../README.md).

## The same part, across countries

### The state now

| Where | What it does well |
|---|---|
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 2: The next hour, very large | "NEXT HOUR 9°C Light rain": the page answers "what now" before anything else. |
| [US National Weather Service: point forecast (New York)](#nws-point) (United States), no. 1: Observed now, at a named station | "Current conditions at New York City, Central Park (KNYC)", with coordinates, and "Last update 10 Nov 8:51 pm EST": an observation is tied to its station and time. |
| [Yr: Lisbon, hour by hour](#yr-lisbon) (Norway), no. 4: Sunrise and sunset | One line under the table. |
| [KNMI: warnings](#knmi-warnings) (Netherlands), no. 1: The state in one plain line | "Er zijn geen waarschuwingen" (there are no warnings), as a line of text above the map, and again as a heading. |

### The warning map

| Where | What it does well |
|---|---|
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 3: Hazards as a filter | All, Wind, Rainfalls, Storms, Coastal: one click redraws the map for one hazard. |
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 4: The map by warning zone | Zones smaller than provinces, in the four European colours; the red zone is visible at once among the orange. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 6: A map with a play button and a week of time | Rain over a satellite-style base map, a time bar from Wednesday to Tuesday, "Long forecast" and "Pressure" views. |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 3: One colour per département | The whole country at a glance, with the Paris area enlarged in an inset. |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 5: Maps per phenomenon | A list of the hazards in force ("Orages"); choosing one redraws the map for it. |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 4: Every district with its highest level | A list on the right: the district's name and a chip ("Vermelho", "Laranja"); the one shown is marked. |
| [MeteoAlarm: Portugal](#meteoalarm-portugal) (Europe), no. 1: The country by warning area | Districts in yellow and orange on the mainland, Madeira in red, at the hour chosen. |
| [MeteoAlarm: Portugal](#meteoalarm-portugal) (Europe), no. 3: Short-term and long-term hazards | Tabs that separate wind, rain and coast from slower hazards. |
| [MeteoAlarm: Portugal](#meteoalarm-portugal) (Europe), no. 4: Filters by level and by hazard | Two lists. |
| [KNMI: warnings](#knmi-warnings) (Netherlands), no. 2: A quiet map | The country with no colour at all when nothing is in force. |

### The warning over time

| Where | What it does well |
|---|---|
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 1: Three days, three dots, in the header | Wed 11 red, Thu 12 orange, Fri 13 yellow: the highest level of each of the next three days sits beside the menu on every page of the site. |
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 5: A time bar with play | Three day tabs (each "00-24h") and a play button that runs the map through time. |
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 6: The matrix: regions against time | One row per region; the hazards in force as small icons framed in their level's colour; then one coloured cell per period across the three days. The whole country's next three days in one table. A feed icon on every row. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 3: Day tabs with high and low | Eight days in a row; the selected day is joined to the card. |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 6: A bar per hazard along the day | Hours 0h to 0h across; one bar per phenomenon, coloured for the hours it applies. Floods link to the river service. |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 1: Eight hazards by 72 hours | One row per hazard (thunder, sea state, rain, wind, snow, cold, heat, fog), one cell per hour for three days, green to red: when each hazard starts and stops, in one picture. |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 2: Days marked under the grid | "11 nov", "12 nov", "13 nov" with hour ticks at 00, 06, 12, 18. |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 2: The day tab carries the warning | Under each day: min, max, wind, rain probability, and a label in the level's colour ("Amarelo", "Vermelho", "Amarelo"). |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 5: The warnings as a row of the table | "Avisos Meteorológicos": one cell per hour, yellow, then orange, then red from 09H to 21H. The best row on the page, placed last. |
| [MeteoAlarm: Portugal](#meteoalarm-portugal) (Europe), no. 2: Now, +24h, each day, animation | A row of buttons under the validity window "Tu 2026.11.10 23:00 - We 2026.11.11 02:00 (GMT+0)". |

### Hour by hour

| Where | What it does well |
|---|---|
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 3: Three chips, one of them the gust | "Feels like 7°", "Light rain ≥95%", "Max gust 19mph from the northeast": the gust is named in the summary, in words, with its direction. |
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 5: The hourly table, gust on its own row | Per hour: symbol, temperature, feels like, chance of rain, mean wind with arrow, and under it the gust. Mean wind and gust are never confused. |
| [US National Weather Service: point forecast (New York)](#nws-point) (United States), no. 2: Nine periods in a strip | Day and night as separate periods; the chance of rain printed on the picture; high or low; two or three words. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 4: The hour columns | Hour, symbol, temperature, chance of rain, wind speed in a circle with its direction. Tap an hour for more. |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 3: Rain probability by three-hour block | "100%" across the morning and afternoon of Wednesday, "24%" at the end. |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 4: Mean wind, hour by hour | An arrow, a figure in km/h and a direction per hour: 11 to 23 km/h. This is the automatic mean wind, not the gust the warning speaks of. |
| [Yr: Lisbon, hour by hour](#yr-lisbon) (Norway), no. 2: The calm table | Time, symbol, temperature, precipitation in mm, wind in m/s with an arrow. No decoration. |

### What to expect (the warning in words)

| Where | What it does well |
|---|---|
| [AEMET: meteorological warnings](#aemet-warnings) (Spain), no. 2: The special notice, in words | One line above the map: "Aviso especial. Lluvias fuertes y persistentes, rachas muy fuertes y temporal marítimo." The forecasters' own headline before any colour. |
| [US National Weather Service: point forecast (New York)](#nws-point) (United States), no. 3: A sentence per period, with numbers | "Rain. High near 59. East wind 9 to 11 mph. Chance of precipitation is 100%. New precipitation amounts between a quarter and half of an inch possible." Ranges, not single values. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 2: One sentence for the period | "Tonight: Thundery showers and a gentle breeze", with the low. A whole forecast in six words. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 7: What is not there: any warning | No banner, colour or word about IPMA's red wind and rain warnings for the next day; the sentence says "a gentle breeze". A model without the authority. Our page starts where this one is silent. |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 3: Each warning as a bar with its sentence | "Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]" and under it "Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos." Hazard, level, period, and what to expect. |
| [Yr: Lisbon, hour by hour](#yr-lisbon) (Norway), no. 1: Warnings with a status word | Five banners for Lisboa: "Ongoing: Yellow Coastal Event Warning", "Expected: Orange Rain Warning", "Expected: Red Rain Warning", "Expected: Red Wind Warning", "Expected: Orange Coastal Event Warning". Each opens for the text. |
| [MeteoAlarm: Portugal](#meteoalarm-portugal) (Europe), no. 5: One row per warning | The hazard's pictogram on its level's colour, then the area: Lisboa appears three times, once per warning. |

### What to do

| Where | What it does well |
|---|---|
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 4: A legend of actions | "Vigilance absolue", "Soyez très vigilant", "Soyez attentif", "Pas de vigilance particulière": each colour is what to do. |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 6: The criteria, linked | "Critérios de emissão": what makes a warning yellow, orange or red. |
| [KNMI: warnings](#knmi-warnings) (Netherlands), no. 3: What it warns for | One sentence listing the hazards KNMI warns about. |
| [KNMI: warnings](#knmi-warnings) (Netherlands), no. 4: What can I expect and what can I do | One link per hazard: thunderstorms, heavy gusts and storm, snow, ice, heavy rain, cold, heat. |

### Uncertainty

| Where | What it does well |
|---|---|
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 4: Ten day tabs; the far ones marked BETA | High and low per day; days eight to ten carry a "BETA" label: lower confidence is marked on the tab itself. |
| [US National Weather Service: point forecast (New York)](#nws-point) (United States), no. 5: The forecast discussion | A link to the forecasters' own reasoning, in text, for this office. |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 6: The caveat, in the notes | The page explains that this automatic forecast may differ from the forecasters' descriptive forecast and from the warnings, which should be consulted. True and far from the numbers it qualifies. |
| [Yr: Lisbon, hour by hour](#yr-lisbon) (Norway), no. 3: Wind in words | "Fresh breeze from south east": a reader who does not think in metres per second still understands. But the words describe the automatic mean wind under a red wind warning, and the page does not say so. |

### Issued, valid, next

| Where | What it does well |
|---|---|
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 6: When it was updated | "Updated: 1am on 11 November 2026", directly under the table. |
| [US National Weather Service: point forecast (New York)](#nws-point) (United States), no. 4: About this forecast | The point, "Last Update", "Forecast Valid" from and to, and the data as KML and XML: provenance in a box of its own. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 5: Last updated | "Last updated today at 23:02", small, under the hours. |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 1: Issued, and valid until | "émise le 10 novembre 2026 à 16h00 … valable jusqu'au 12 novembre 2026 à 00h00": two times under the title. |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 2: Today, tomorrow, and when the next map comes | Two tabs; tomorrow's is grey and says "Prochaine carte à 06h". |
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 7: The rhythm, stated | "Les cartes de vigilance météo sont actualisées au moins 2 fois par jour à 6h et 16h." |
| [IPMA: warnings on a timeline (Lisboa)](#ipma-warnings-timeline) (Portugal), no. 5: UTC, and the last update | "Toda a informação em horas UTC" and "Última atualização: terça, 10 de novembro de 2026 às 21:23". |
| [IPMA: hourly forecast for a place (Lisboa)](#ipma-hourly) (Portugal), no. 1: When it was made | "Informação em horas UTC. Última atualização: 2026-11-10 19:56:03 (UTC)". |

### The same as data

| Where | What it does well |
|---|---|
| [Météo-France: Vigilance](#meteofrance-vigilance) (France), no. 8: A PDF version | The same card as a document to forward. |

### Finding your way

| Where | What it does well |
|---|---|
| [Met Office: forecast for a place (London)](#metoffice-place) (United Kingdom), no. 1: Five views of one forecast | Daily, Detailed, Map, Long range, UK: the same place at five depths, as tabs. |
| [BBC Weather: Lisbon](#bbc-lisbon) (United Kingdom), no. 1: The place, and nothing else, as the title | "Lisbon" over a weather photograph; one button to keep it. |
| [Yr: Lisbon, hour by hour](#yr-lisbon) (Norway), no. 5: Previous day, next day | Two buttons; the table is one day at a time. |

## The studies

<h3 id="aemet-warnings">AEMET: meteorological warnings (Spain)</h3>

<https://www.aemet.es/en/eltiempo/prediccion/avisos> (leaves this site) · seen 2026-11-11T02:17Z · [our page about the site](../sites/aemet.md) · [data](aemet-warnings.json)

The fullest warnings page we saw: the next three days' level in the header of every page, a special notice in words, a map with a hazard filter and a time bar, and under it a matrix of regions against time. On the night of Charles it showed red for Extremadura and Castilla y León.

Limits: The cookie banner was not dismissed and takes the top 120 px of the frame.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Three days, three dots, in the header | Wed 11 red, Thu 12 orange, Fri 13 yellow: the highest level of each of the next three days sits beside the menu on every page of the site. | `data/`weather/warnings.json (highest level per day) |
| 2 | The special notice, in words | One line above the map: "Aviso especial. Lluvias fuertes y persistentes, rachas muy fuertes y temporal marítimo." The forecasters' own headline before any colour. | `data/`weather/communiques.json (the current communiqué's subject) |
| 3 | Hazards as a filter | All, Wind, Rainfalls, Storms, Coastal: one click redraws the map for one hazard. | `data/`weather/warnings.json (type) |
| 4 | The map by warning zone | Zones smaller than provinces, in the four European colours; the red zone is visible at once among the orange. | our own redraw from IPMA's JSON; district shapes from an open source |
| 5 | A time bar with play | Three day tabs (each "00-24h") and a play button that runs the map through time. | `data/`weather/warnings.json (start_utc, end_utc) |
| 6 | The matrix: regions against time | One row per region; the hazards in force as small icons framed in their level's colour; then one coloured cell per period across the three days. The whole country's next three days in one table. A feed icon on every row. | `data/`weather/warnings.json; for us the rows are Lisbon's hazards and then the decisions (`data/`decisions/graph.json) |

May the screenshot be shown: AEMET allows reuse citing AEMET as the source without distorting the information (its legal notice): a screenshot with the credit fits.

<h3 id="metoffice-place">Met Office: forecast for a place (London) (United Kingdom)</h3>

<https://www.metoffice.gov.uk/weather/forecast/gcpvj0v07> (leaves this site) · seen 2026-11-11T02:17Z · [our page about the site](../sites/metoffice.md) · [data](metoffice-place.json)

The new Met Office place page: the next hour in very large type, three chips, ten day tabs, an hourly table that gives the gust its own row. No UK warning was in force, so the warning banner was not seen.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Five views of one forecast | Daily, Detailed, Map, Long range, UK: the same place at five depths, as tabs. | our two faces: the weather face and the data room |
| 2 | The next hour, very large | "NEXT HOUR 9°C Light rain": the page answers "what now" before anything else. | `data/`weather/stations.json, airport.json (latest observation); warnings.json (in force now) |
| 3 | Three chips, one of them the gust | "Feels like 7°", "Light rain ≥95%", "Max gust 19mph from the northeast": the gust is named in the summary, in words, with its direction. | `data/`weather/gusts-vs-forecast.json (observed_airport_max_gust), warnings.json (the warning's own gust figure) |
| 4 | Ten day tabs; the far ones marked BETA | High and low per day; days eight to ten carry a "BETA" label: lower confidence is marked on the tab itself. | `data/`weather/forecast.json (daily.days) |
| 5 | The hourly table, gust on its own row | Per hour: symbol, temperature, feels like, chance of rain, mean wind with arrow, and under it the gust. Mean wind and gust are never confused. | `data/`weather/forecast.json (hourly); label the mean-wind row "automatic" |
| 6 | When it was updated | "Updated: 1am on 11 November 2026", directly under the table. | read_utc and next_read_utc of every file |

May the screenshot be shown: Crown copyright; website material under the Open Government Licence v3.0 unless marked: a screenshot with the credit fits.

<h3 id="nws-point">US National Weather Service: point forecast (New York) (United States)</h3>

<https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071> (leaves this site) · seen 2026-11-11T02:17Z · [our page about the site](../sites/nws.md) · [data](nws-point.json)

Plain and complete: observed conditions at a named station, a strip of periods, a sentence for each with its numbers, and a box that says what the forecast is, when it was made and until when it is valid, with the forecaster's discussion one click away. No hazard was in force.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Observed now, at a named station | "Current conditions at New York City, Central Park (KNYC)", with coordinates, and "Last update 10 Nov 8:51 pm EST": an observation is tied to its station and time. | `data/`weather/stations.json, airport.json |
| 2 | Nine periods in a strip | Day and night as separate periods; the chance of rain printed on the picture; high or low; two or three words. | `data/`weather/forecast.json (daily) |
| 3 | A sentence per period, with numbers | "Rain. High near 59. East wind 9 to 11 mph. Chance of precipitation is 100%. New precipitation amounts between a quarter and half of an inch possible." Ranges, not single values. | IPMA's descriptive forecast and warning texts (text_pt in warnings.json), quoted |
| 4 | About this forecast | The point, "Last Update", "Forecast Valid" from and to, and the data as KML and XML: provenance in a box of its own. | read_utc, next_read_utc; api/v1 links |
| 5 | The forecast discussion | A link to the forecasters' own reasoning, in text, for this office. | `data/`weather/analysis.json (labelled hypothesis) |

May the screenshot be shown: US government work, public domain (third-party map tiles excepted): a screenshot may be shown.

<h3 id="bbc-lisbon">BBC Weather: Lisbon (United Kingdom)</h3>

<https://www.bbc.com/weather/2267057> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/bbc-weather.md) · [data](bbc-lisbon.json)

Dinis's reference for the weather face. One sentence, day tabs, an hour row, a map with a time bar. And, for Lisbon on the eve of IPMA's red warnings, no warning at all.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | The place, and nothing else, as the title | "Lisbon" over a weather photograph; one button to keep it. | incidents/2026-11-10-storm-charles/incident.json (title, kicker) |
| 2 | One sentence for the period | "Tonight: Thundery showers and a gentle breeze", with the low. A whole forecast in six words. | incident.json (headline, standfirst); the sentence must come from the authority, see callout 7 |
| 3 | Day tabs with high and low | Eight days in a row; the selected day is joined to the card. | `data/`weather/forecast.json (daily.days) with each day's warning colour from warnings.json |
| 4 | The hour columns | Hour, symbol, temperature, chance of rain, wind speed in a circle with its direction. Tap an hour for more. | `data/`weather/forecast.json (hourly) |
| 5 | Last updated | "Last updated today at 23:02", small, under the hours. | read_utc of each file |
| 6 | A map with a play button and a week of time | Rain over a satellite-style base map, a time bar from Wednesday to Tuesday, "Long forecast" and "Pressure" views. | none we may show (imagery.json): links to IPMA's radar and EUMETView, or our own warnings map |
| 7 | What is not there: any warning | No banner, colour or word about IPMA's red wind and rain warnings for the next day; the sentence says "a gentle breeze". A model without the authority. Our page starts where this one is silent. | `data/`weather/warnings.json, cap.json |

May the screenshot be shown: BBC terms: no reuse without permission. The screenshot is shown only if the archivist's reading of its terms allows; otherwise the frame stays empty and the link stands.

<h3 id="meteofrance-vigilance">Météo-France: Vigilance (France)</h3>

<https://vigilance.meteofrance.fr/fr> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/meteofrance-vigilance.md) · [data](meteofrance-vigilance.json)

One card that carries everything a warning needs: when issued, until when valid, when the next comes, the map, a legend written as actions, and a bar per hazard along the day.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Issued, and valid until | "émise le 10 novembre 2026 à 16h00 … valable jusqu'au 12 novembre 2026 à 00h00": two times under the title. | `data/`weather/cap.json (sent_utc), communiques.json (validity) |
| 2 | Today, tomorrow, and when the next map comes | Two tabs; tomorrow's is grey and says "Prochaine carte à 06h". | next_read_utc of each file; IPMA's communiqué validity |
| 3 | One colour per département | The whole country at a glance, with the Paris area enlarged in an inset. | our own redraw from IPMA's JSON |
| 4 | A legend of actions | "Vigilance absolue", "Soyez très vigilant", "Soyez attentif", "Pas de vigilance particulière": each colour is what to do. | IPMA's and ANEPC's own wording for each level, quoted |
| 5 | Maps per phenomenon | A list of the hazards in force ("Orages"); choosing one redraws the map for it. | `data/`weather/warnings.json (type) |
| 6 | A bar per hazard along the day | Hours 0h to 0h across; one bar per phenomenon, coloured for the hours it applies. Floods link to the river service. | `data/`weather/warnings.json (start_utc, end_utc) |
| 7 | The rhythm, stated | "Les cartes de vigilance météo sont actualisées au moins 2 fois par jour à 6h et 16h." | how often each file is read (next_read_utc) |
| 8 | A PDF version | The same card as a document to forward. | the page's markdown twin and api/v1 |

May the screenshot be shown: Météo-France public data is under the French open licence (not re-read here): the archivist confirms before the screenshot is shown.

<h3 id="ipma-warnings-timeline">IPMA: warnings on a timeline (Lisboa) (Portugal)</h3>

<https://www.ipma.pt/pt/otempo/prev-sam/?p=LSB> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/ipma-avisos.md) · [data](ipma-warnings-timeline.json)

The primary source for Lisbon: eight hazards against 72 hours, then every warning as a bar with its period and one sentence.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Eight hazards by 72 hours | One row per hazard (thunder, sea state, rain, wind, snow, cold, heat, fog), one cell per hour for three days, green to red: when each hazard starts and stops, in one picture. | `data/`weather/warnings.json |
| 2 | Days marked under the grid | "11 nov", "12 nov", "13 nov" with hour ticks at 00, 06, 12, 18. | the same |
| 3 | Each warning as a bar with its sentence | "Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]" and under it "Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos." Hazard, level, period, and what to expect. | `data/`weather/warnings.json (type, level, start_utc, end_utc, text_pt) |
| 4 | Every district with its highest level | A list on the right: the district's name and a chip ("Vermelho", "Laranja"); the one shown is marked. | warnings.json (red_and_orange_elsewhere) |
| 5 | UTC, and the last update | "Toda a informação em horas UTC" and "Última atualização: terça, 10 de novembro de 2026 às 21:23". | read_utc; cap.json (sent_utc) |
| 6 | The criteria, linked | "Critérios de emissão": what makes a warning yellow, orange or red. | a link; thresholds for the legend of our strip |

May the screenshot be shown: IPMA: free use for personal or public purposes that are not for profit, with the source named, its logo and a link (imagery.json): a screenshot with "Fonte: IPMA" fits if the site is non-profit (a question open with Dinis).

<h3 id="ipma-hourly">IPMA: hourly forecast for a place (Lisboa) (Portugal)</h3>

<https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Lisboa&Lisboa> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/ipma-local.md) · [data](ipma-hourly.json)

The page our hour strip should learn most from: day tabs that carry the warning colour, and an hourly table whose last row is the warnings themselves.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | When it was made | "Informação em horas UTC. Última atualização: 2026-11-10 19:56:03 (UTC)". | `data/`weather/forecast.json (hourly_runs) |
| 2 | The day tab carries the warning | Under each day: min, max, wind, rain probability, and a label in the level's colour ("Amarelo", "Vermelho", "Amarelo"). | `data/`weather/forecast.json (daily) + warnings.json |
| 3 | Rain probability by three-hour block | "100%" across the morning and afternoon of Wednesday, "24%" at the end. | `data/`weather/forecast.json (hourly) |
| 4 | Mean wind, hour by hour | An arrow, a figure in km/h and a direction per hour: 11 to 23 km/h. This is the automatic mean wind, not the gust the warning speaks of. | `data/`weather/forecast.json (hourly); label it "automatic, mean wind" |
| 5 | The warnings as a row of the table | "Avisos Meteorológicos": one cell per hour, yellow, then orange, then red from 09H to 21H. The best row on the page, placed last. | `data/`weather/warnings.json: on our strip this row goes first |
| 6 | The caveat, in the notes | The page explains that this automatic forecast may differ from the forecasters' descriptive forecast and from the warnings, which should be consulted. True and far from the numbers it qualifies. | a one-line note beside our model rows |

May the screenshot be shown: As IPMA above.

<h3 id="yr-lisbon">Yr: Lisbon, hour by hour (Norway)</h3>

<https://www.yr.no/en/forecast/hourly-table/2-2267057/Portugal/Lisbon/Lisbon> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/yr.md) · [data](yr-lisbon.json)

A foreign public service that shows the local authority's warnings, in English, above its own hours.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | Warnings with a status word | Five banners for Lisboa: "Ongoing: Yellow Coastal Event Warning", "Expected: Orange Rain Warning", "Expected: Red Rain Warning", "Expected: Red Wind Warning", "Expected: Orange Coastal Event Warning". Each opens for the text. | `data/`weather/warnings.json (status from start_utc and end_utc against now) |
| 2 | The calm table | Time, symbol, temperature, precipitation in mm, wind in m/s with an arrow. No decoration. | `data/`weather/forecast.json (hourly, second_models) |
| 3 | Wind in words | "Fresh breeze from south east": a reader who does not think in metres per second still understands. But the words describe the automatic mean wind under a red wind warning, and the page does not say so. | the warning's own text beside any model wording |
| 4 | Sunrise and sunset | One line under the table. | not held |
| 5 | Previous day, next day | Two buttons; the table is one day at a time. | our strip: Wednesday, then Thursday |

May the screenshot be shown: MET Norway data is NLOD / CC BY 4.0; the page design is Yr's. The archivist confirms before the screenshot is shown.

<h3 id="meteoalarm-portugal">MeteoAlarm: Portugal (Europe)</h3>

<https://www.meteoalarm.org/en/live/region/PT> (leaves this site) · seen 2026-11-10T23:48Z · [our page about the site](../sites/meteoalarm.md) · [data](meteoalarm-portugal.json)

Every national service's warnings in one format: a map, a time bar and a list.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | The country by warning area | Districts in yellow and orange on the mainland, Madeira in red, at the hour chosen. | our own redraw from IPMA's JSON (never a copy of this map) |
| 2 | Now, +24h, each day, animation | A row of buttons under the validity window "Tu 2026.11.10 23:00 - We 2026.11.11 02:00 (GMT+0)". | `data/`weather/warnings.json |
| 3 | Short-term and long-term hazards | Tabs that separate wind, rain and coast from slower hazards. | warnings.json (type) |
| 4 | Filters by level and by hazard | Two lists. | the same |
| 5 | One row per warning | The hazard's pictogram on its level's colour, then the area: Lisboa appears three times, once per warning. | `data/`weather/cap.json (each message) |

May the screenshot be shown: MeteoAlarm's maps, icons and layout belong to EUMETNET and are licensed to its participants only (its terms): the screenshot is not shown unless the archivist finds a basis; the link stands.

<h3 id="knmi-warnings">KNMI: warnings (Netherlands)</h3>

<https://www.knmi.nl/nederland-nu/weer/waarschuwingen> (leaves this site) · seen 2026-11-11T02:17Z · [our page about the site](../sites/knmi.md) · [data](knmi-warnings.json)

Seen on a quiet night: what a warnings page says when there is nothing to warn about, and where it puts "what can I do".

Limits: No warning was in force in the Netherlands, so the page in use was not seen.

| No. | Part | What it does well | Fed on our site by |
|---|---|---|---|
| 1 | The state in one plain line | "Er zijn geen waarschuwingen" (there are no warnings), as a line of text above the map, and again as a heading. | warnings.json (when nothing is in force, say so in words) |
| 2 | A quiet map | The country with no colour at all when nothing is in force. | our own redraw |
| 3 | What it warns for | One sentence listing the hazards KNMI warns about. | a line in our legend: the eight hazards IPMA warns for |
| 4 | What can I expect and what can I do | One link per hazard: thunderstorms, heavy gusts and storm, snow, ice, heavy rain, cold, heat. | ANEPC's measures per hazard, quoted and linked |

May the screenshot be shown: KNMI states the Creative Commons zero declaration (CC0) for its website content unless marked (its copyright page): the screenshot may be shown.
