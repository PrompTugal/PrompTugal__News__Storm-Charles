# The best weather sites, and who is covering Storm Charles

Research for the home page, by incident.weatherwatch@web-summit.dinis, for incident.designer@web-summit.dinis. The data is [sites.json](sites.json): 106 entries in three maps (52 worldwide, 27 Portugal, 27 on Storm Charles), from 244 addresses requested once each between 23:38 and 23:47 UTC on 10 November 2026.

**This is research about how others present weather. It is not a forecast and not a warning service: the warnings are IPMA's, the measures are ANEPC's.**

How to read it: every entry has its address, owner, what it shows and how, its data access and reuse terms, what it does best, what we should take from it, and `opened` (HTTP status, time read, and what the description rests on). Where a page is drawn by script we read only its shell and say so (`seen: shell`): the description of its interactive part is then general knowledge of the product, not an observation. Nine entries could not be opened and are marked. Public pages only; no logins.

## The ten ideas for the home page

Each is something a named site does, and what it would be on ours with the data we already hold.

1. **One sentence, then the hours** (BBC Weather; Público's live headline). The hero is a single sentence of three facts, each linked to its source, rewritten at every wake: what is warned, when the worst window is, what is decided. Under it, the hour strip. Público rewrites its live blog's headline as the state of things in three clauses; BBC puts a one-sentence summary above the hour row.
2. **The hour strip as a table, gusts in brackets** (Yr). One column per hour of Wednesday, rows for wind with the gust in brackets, rain as a range, and the source model's run time. No icons that carry no number. From `data/weather/forecast.json`.
3. **Warnings as a Gantt, with our events as extra rows** (IPMA's "avisos em linha temporal"; FMI's five-day strip). Hazards as rows, hours as columns, IPMA's own colours, straight from `warnings.json`. Then add rows nobody else has: Web Summit Day 2 (off), Day 3, transport, schools. The reader sees the warning and the decision on one time axis.
4. **Colour the cells by the authority's thresholds** (Windguru's heat-map table). Each hour's gust cell takes yellow, orange or red by IPMA's published criteria for the district, so the strip reads at arm's length. The threshold and its source go in the legend.
5. **A "now" line, observed on the left, forecast on the right** (MeteoSwiss's single time bar; Windfinder's measured-against-forecast). Station gusts already observed (`stations.json`, `gusts-vs-forecast.json`) run into the forecast on the same axis with a marked "now". It shows at a glance whether the storm is running ahead of or behind the forecast.
6. **Every warning as "what to expect", with issued, valid-from, valid-to** (Met Office; Met Éireann; SMHI). Under each coloured bar, IPMA's own text for that warning and three times. A colour alone is not enough; our own words are not allowed; IPMA's text is the answer.
7. **The presenter is a signed, timed paragraph** (NWS forecast discussion; KNMI's duty-forecaster text; CNN Portugal's presenter at the map). A short block in a person's register: what is known, what is not, when we will know more. On our site it is the meteorologist's analysis, labelled as a hypothesis, with its reasons, beside (never above) the authority's line.
8. **Say when the next update is due** (US National Hurricane Center's fixed advisory clock). "IPMA communiqué no. 2, valid to 23:59 on the 11th; warnings re-read every N minutes; this page built at HH:MM." Readers come back when they know when.
9. **Show disagreement instead of hiding it** (ECMWF ensemble meteograms; meteoblue's multi-model chart and predictability figure; Observador's two model maps side by side; Luso Meteo's "may be weaker"). Where two sources differ on the peak hour or strength, draw both, labelled by source and kind (fact, evidence, hypothesis). Open-Meteo gives several open models for Lisbon in one call under CC BY 4.0, as analysis material.
10. **Key moments, anchors, and "what is closed"** (RTP's "Momento-chave"; Observador's per-entry anchors; Negócios and JN's closure lists; Renascença's occurrence states). Flag the few timeline rows that changed something; give every row a stable id so it can be linked; and keep one table of what is closed or changed (who decided, when, source). Renascença's dashboard adds a legend of occurrence states (under way, being resolved, concluding): if we show occurrences, use the same states.

Two things to avoid, seen often: a full-screen animated wind map as the first thing (Windy, Ventusky: beautiful, slow, and silent about decisions; embed one lower down with its credit if at all), and pages of 1 MB and more during an emergency (RTP's live blog is 1.4 MB of HTML; ours should stay under a tenth of that).

## Ranking: worldwide

Ranked by what a reader in a storm can learn in ten seconds, then by openness of the data.

| # | Site | Why |
|---|---|---|
| 1 | [Yr](https://www.yr.no/en) (MET Norway, NRK) | The calmest hour-by-hour table there is, gusts beside the mean wind, rain as a range; the same data is an open API for any point (CC BY 4.0 / NLOD, read). |
| 2 | [Met Office](https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings) | Warnings as "what to expect" with a day strip, issue times and a likelihood-by-impact matrix; a storm centre for named storms. |
| 3 | [BBC Weather](https://www.bbc.com/weather/2267057) | One sentence, then a scrollable hour row, on a phone; a presenter tells the same forecast. No reuse. |
| 4 | [Windy](https://www.windy.com/) | Models compared on one map and one time slider; embeddable. A tool for the curious, not a front page. |
| 5 | [US National Weather Service](https://www.weather.gov/) and [NHC](https://www.nhc.noaa.gov/) | The hazards box first; the forecaster's reasoning published; a fixed product clock; public domain, open alerts API. |
| 6 | [Météo-France Vigilance](https://vigilance.meteofrance.fr/fr) | Today and tomorrow as two maps side by side; hazards as a row of pictograms. |
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
| 3 | [ANEPC notices](https://prociv.gov.pt/pt/avisos-a-populacao/) with [Fogos.pt / VOST](https://fogos.pt/) | The measures asked of people, numbered; occurrences as open data by volunteers. |
| 4 | [tempo.pt (Meteored)](https://www.tempo.pt/) | The busiest private weather desk: named forecasters, a number in every headline, hour-specific pieces for Lisbon. Evidence for us, never the headline. |
| 5 | [Luso Meteo](https://www.lusometeo.com/) | Independent analysis that says when the forecast changes and why. |
| 6 | [MeteoPT forum](https://www.meteopt.com/forum/) | Ground truth from amateurs' stations in follow-up threads. Evidence; link threads, never people. |
| 7 | Broadcasters and press: [RTP](https://www.rtp.pt/noticias/), [CNN Portugal](https://cnnportugal.iol.pt/meteorologia), [Público](https://www.publico.pt/meteorologia) | Live blogs, presenters, explainers; none publishes data. |

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

`tools/probe.sh` requests each address once (HTTP GET, no script execution) and records status, size, title and time; `tools/gen.py` joins those results with the descriptions and writes `sites.json`, refusing any entry that has no probe behind it. The fetched pages are not kept in git.
