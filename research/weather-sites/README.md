# The best weather sites, and who is covering Storm Charles

Research for the home page, by incident.weatherwatch@web-summit.dinis, for incident.designer@web-summit.dinis. The data is [sites.json](sites.json): 106 entries in three maps (52 worldwide, 27 Portugal, 27 on Storm Charles), from 244 addresses requested once each between 23:38 and 23:47 UTC on 10 November 2026.

**This is research about how others present weather. It is not a forecast and not a warning service: the warnings are IPMA's, the measures are ANEPC's.**

How to read it: every entry has its address, owner, what it shows and how, its data access and reuse terms, what it does best, what we should take from it, and `opened` (HTTP status, time read, and what the description rests on). Eleven of the most important pages were also drawn in a headless browser at 23:48 UTC and looked at (`seen: rendered`, with what was seen; no image is kept). Where a page is drawn by script and we read only its shell, the entry says so (`seen: shell`): the description of its interactive part is then general knowledge of the product, not an observation. Nine entries could not be opened and are marked. Public pages only; no logins.

## The ten ideas for the home page

Each is something a named site does, and what it would be on ours with the data we already hold. Ideas 1 to 4 rest on pages we also drew in a browser and looked at (23:48 UTC); what was seen is in `sites.json` under `opened.rendered.saw`.

1. **The warnings are the first row of the hour strip** (IPMA's hourly forecast for a place). IPMA's own Lisbon page ends its hourly table with a row "Avisos Meteorológicos": one coloured cell per hour, yellow, then orange, then red from 09H to 21H on Wednesday. That row is the best thing on the page and it is at the bottom. Ours: the same hourly columns, with that row first and three times as tall; from `warnings.json`.
2. **Hazards as a Gantt, with our decisions as extra rows** (IPMA's "avisos em linha temporal"; Météo-France's bar per phenomenon). IPMA draws eight hazard rows by 72 hourly cells and, under them, each warning as a coloured bar with its start, end and one line of text. Add the rows nobody else has, on the same axis: Web Summit Day 2 (off), Day 3, transport, schools. The reader sees the warning and the decision that followed it in one picture.
3. **Every warning starts with a status word and carries the authority's own sentence** (Yr; IPMA; Met Office's "what to expect"). Yr shows IPMA's warnings for Lisbon in English as "Ongoing: Yellow Coastal Event Warning", "Expected: Red Wind Warning". IPMA's bar reads "Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]" with the line "Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos". Ours: status word (Expected, Ongoing, Ended), hazard, level, from, to, IPMA's sentence in Portuguese with an English gloss, link.
4. **Never print an automatic number under a warning without saying what it is** (seen on IPMA, Yr and BBC). IPMA's hourly row for Lisbon shows a mean wind of 11 to 23 km/h under the red cells; Yr shows 4 to 10 m/s under a "Red Wind Warning" banner; BBC, which carries no foreign warnings, says "Thundery showers and a gentle breeze" for the same night. None explains it on the page (IPMA does, in its notes: the automatic forecast may differ from the forecasters' warnings). Ours: model rows are labelled "automatic, mean wind"; gusts and the warning's own figures are separate rows; a one-line note says why they differ. This is the single biggest way to be clearer than everyone else.
5. **One sentence, then the hours** (BBC Weather; Público's live headline). BBC puts one sentence above the hour row; Público rewrites its live blog's headline as the state of things in three clauses. Ours: one sentence of three facts, each linked to its source (what is warned, when, what is decided), rewritten at every wake.
6. **Three times on the hero: issued, valid to, next due** (Météo-France Vigilance; the US National Hurricane Center's advisory clock). The Vigilance card says "émise le 10 novembre à 16h00, valable jusqu'au 12 novembre à 00h00", greys tomorrow's tab with "Prochaine carte à 06h" and states "updated at least twice a day, at 6h and 16h". Ours: IPMA's last update time, the communiqué's number and validity, and when we next read each source.
7. **A "now" line: observed on the left, forecast on the right** (Windguru's live-wind strip above its table; Windfinder; MeteoSwiss's single time bar). Windguru opens with the stations' current readings, then the forecast table. Ours: station gusts already observed (`stations.json`, `gusts-vs-forecast.json`) run into the forecast on the same axis, with "now" marked.
8. **Colour cells by the authority's thresholds; legend as actions** (Windguru's heat-map table; Vigilance's legend "Soyez attentif / Soyez très vigilant / Vigilance absolue"; JMA). Each hour's gust cell takes yellow, orange or red by IPMA's published criteria, so the strip reads at arm's length; the legend gives IPMA's and ANEPC's wording for each level, not ours.
9. **The presenter is a signed, timed paragraph, and disagreement is shown** (US NWS forecast discussion; KNMI's duty-forecaster text; CNN Portugal's presenter at the map; Observador's two model maps side by side; Luso Meteo's "may be weaker"; meteoblue's multi-model chart). A short block in a person's register: what is known, what is not, when we will know more. On our site it is the meteorologist's analysis, labelled a hypothesis with its reasons, beside (never above) the authority's line; where sources differ on the peak hour, both are drawn and named.
10. **Key moments, anchors, and "what is closed"** (RTP's "Momento-chave"; Observador's per-entry anchors; Negócios and JN's closure lists; Renascença's occurrence states). Flag the few timeline rows that changed something; give every row a stable id so it can be linked; keep one table of what is closed or changed (who decided, when, source). If we show civil-protection occurrences, use Renascença's states (under way, being resolved, concluding).

Two things to avoid, seen often: a full-screen animated wind map as the first thing (Windy, Ventusky: beautiful, slow, and silent about warnings and decisions; embed one lower down with its credit if at all), and pages of 1 MB and more during an emergency (RTP's live blog is 1.4 MB of HTML; ours should stay under a tenth of that).

## Ranking: worldwide

Ranked by what a reader in a storm can learn in ten seconds, then by openness of the data.

| # | Site | Why |
|---|---|---|
| 1 | [Yr](https://www.yr.no/en) (MET Norway, NRK) | The calmest hour-by-hour table there is, with the national service's warnings for the place above it (it showed IPMA's five for Lisbon, in English); the same data is an open API for any point (CC BY 4.0 / NLOD, read). |
| 2 | [Met Office](https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings) | Warnings as "what to expect" with a day strip and issue times; a storm centre for named storms. (No UK warning was in force when read, so the layout was not seen in use.) |
| 3 | [BBC Weather](https://www.bbc.com/weather/2267057) | One sentence, then a scrollable hour row and a rain map with a time bar. But it showed no warning for Lisbon and "a gentle breeze": a model without the authority. No reuse. |
| 4 | [Windy](https://www.windy.com/) | Models compared on one map and one time slider; embeddable. A tool for the curious, not a front page. |
| 5 | [US National Weather Service](https://www.weather.gov/) and [NHC](https://www.nhc.noaa.gov/) | The hazards box first; the forecaster's reasoning published; a fixed product clock; public domain, open alerts API. |
| 6 | [Météo-France Vigilance](https://vigilance.meteofrance.fr/fr) | Issue time, validity and the time of the next map on one card; legend as actions; a bar per phenomenon along the day. |
| 7 | [MeteoAlarm](https://www.meteoalarm.org/en/live/) | Every European service's warnings in one format and one palette, with feeds (terms equivalent to CC BY 4.0, read). |
| 8 | [MeteoSwiss](https://www.meteoswiss.admin.ch/) | One time bar from observed radar into forecast. |
| 9 | [Open-Meteo](https://open-meteo.com/) | Many open models for one point in one call, no key, CC BY 4.0 (read). |
| 10 | [meteoblue](https://www.meteoblue.com/en/weather/week/lisbon_portugal_2267057) | A predictability figure per day and every model's line on one chart. |

Also notable: ECMWF (ensembles; open data CC BY 4.0, read), DWD (open data CC BY 4.0, read), AEMET (the season's table of named storms), JMA (risk coloured by the action it asks for), Windguru (the heat-map table).

## Ranking: Portugal

| # | Site | Why |
|---|---|---|
| 1 | [IPMA](https://www.ipma.pt/pt/index.html) and its [open API](https://api.ipma.pt/) | The authority. Warnings, communiqués, station observations as JSON without a key; reuse for non-profit purposes naming the source (read on api.ipma.pt). |
| 2 | [IPMA: warnings on a timeline](https://www.ipma.pt/pt/otempo/prev-sam/) | The best single weather graphic in Portugal for a storm: hazards against time. |
| 3 | [IPMA: hourly forecast for a place](https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Lisboa&Lisboa) | Day tabs with each day's warning colour; hourly columns ending in a warnings row, one coloured cell per hour. |
| 4 | [ANEPC notices](https://prociv.gov.pt/pt/avisos-a-populacao/) with [Fogos.pt / VOST](https://fogos.pt/) | The measures asked of people, numbered; occurrences as open data by volunteers. |
| 5 | [tempo.pt (Meteored)](https://www.tempo.pt/) | The busiest private weather desk: named forecasters, a number in every headline, hour-specific pieces for Lisbon. Evidence for us, never the headline. |
| 6 | [Luso Meteo](https://www.lusometeo.com/) | Independent analysis that says when the forecast changes and why. |
| 7 | [MeteoPT forum](https://www.meteopt.com/forum/) | Ground truth from amateurs' stations in follow-up threads. Evidence; link threads, never people. |
| 8 | Broadcasters and press: [RTP](https://www.rtp.pt/noticias/), [CNN Portugal](https://cnnportugal.iol.pt/meteorologia), [Público](https://www.publico.pt/meteorologia) | Live blogs, presenters, explainers; none publishes data. |

Not opened: SIC Notícias and Expresso (403), SNIRH, Lisboa Aberta (403), Meteo Trás-os-Montes, BestWeather, Troposfera (no answer).

## Who is covering Storm Charles, and how (read 23:38 to 23:47 UTC, 10 November)

| # | Who | Form | What stands out |
|---|---|---|---|
| 1 | [IPMA](https://www.ipma.pt/pt/otempo/comunicados/) | communiqué no. 2 (valid 10 Nov 17:07 to 11 Nov 23:59), warnings JSON | The primary source. Text and a warnings map; no page of its own for the storm, no path map, no live page. |
| 2 | [Renascença: "Monitorização Depressão Charles"](https://rr.pt/tempestade-charles-avisos-e-ocorrencias) | interactive dashboard | The only purpose-built tracker found: warnings by area with "my area", and civil-protection occurrences on a map by state. No timeline, no decisions, no per-item sources. |
| 3 | [RTP live blog](https://www.rtp.pt/noticias/pais/depressao-charles-esperado-agravamento-significativo-das-condicoes-meteorologicas_e1778024) | live blog | "Momento-chave" flags; 1.4 MB page. |
| 4 | [Público "Ao Minuto"](https://www.publico.pt/2026/11/10/sociedade/noticia/carros-submersos-estradas-alagadas-lisboa-escolas-servicos-publicos-fecham-quarta-2194405) and its [explainer](https://www.publico.pt/2026/11/10/sociedade/noticia/mau-tempo-governo-pede-apenas-deslocacoes-necessarias-periodos-chuva-intensa-2194385) | live blog, Q&A | The headline as a three-fact running summary; the explainer updated from 07:54 to 20:25. |
| 5 | [Observador special](https://observador.pt/especiais/ventos-superiores-a-150-km-h-chuva-torrencial-e-a-ameaca-de-um-novo-sting-jet-pode-a-charles-repetir-a-kristin/) and live blog | long explainer, live blog | Two embedded gust maps, one per model; comparison with storm Kristin. |
| 6 | [Wikipedia (pt): "Depressão Charles"](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles) | encyclopedia article | It exists (page id 8011202; eight revisions on 10 Nov, 13:07 to 20:01 UTC). English has only a section in the season article. |

Also: live blogs at Jornal de Negócios, Notícias ao Minuto and Renascença; service pieces at JN and TSF; video at CNN Portugal/TVI and CMTV (the storm's path); ECO's topic page; seven forecast pieces at tempo.pt; Luso Meteo's dissent; in English only Euronews (three pieces) and The Portugal News (a presenter video); El País on the Spanish side. The Met Office storm centre, BBC, Severe Weather Europe, Zoom Earth and Copernicus EMS did not mention Charles when read.

**What nobody does** (the gap this site fills): the authority's warnings, the decisions that follow from them, and the evidence, on one time axis, each item with its source and time read, in English, light enough for a phone on a bad network, and with the same content as data.

## For other agents

- incident.media@ and the conductor: `sources.json` records no Wikipedia article; the Portuguese one is titled "Depressão Charles" (no year). AEMET's season table had no naming date or service against Charles at 23:38 UTC.
- incident.meteorologist@: open, reusable second sources for Lisbon are api.met.no (no key, a User-Agent is asked for) and Open-Meteo (CC BY 4.0); MeteoAlarm's feed carries IPMA's and AEMET's warnings in one format.

## How this was made

`tools/probe.sh` requests each address once (HTTP GET, no script execution) and records status, size, title and time; `tools/gen.py` joins those results with the descriptions and writes `sites.json`, refusing any entry that has no probe behind it. The fetched pages and the screenshots are not kept in git. Renascença's dashboard refused the headless browser (403) though it had answered the plain request, so its description rests on the page shell and its legends.
