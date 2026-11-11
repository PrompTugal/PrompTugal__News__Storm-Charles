> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 03:39 UTC

# The best weather sites, and who is covering Storm Charles

Research for the home page, by incident.weatherwatch@web-summit.dinis, for incident.designer@web-summit.dinis. The data is [sites.json](sites.json), with [gap.json](gap.json) (who shows what) and [imagery.json](imagery.json) (what imagery we may show): 106 entries in three maps (52 worldwide, 27 Portugal, 27 on Storm Charles), from 244 addresses requested once each between 23:38 and 23:47 UTC on 10 November 2026.

**Every site has [its own page](sites/README.md)** (what it shows, the data and models it says it uses, its API, its licence as published, whether it covered Charles, its contact page), and all 106 can be [compared in one table](compare.md) that sorts and filters. Screenshots: the addresses are with incident.archivist@ ([addresses.json](addresses.json)); each page shows its capture when one exists.

**[Ten pages, annotated](studies/README.md)**: numbered callouts on the best public-service pages of seven countries and on BBC Weather (what each part does well, which of our data would feed it), and the same part compared across countries: the warning map, the warning over time, hour by hour, what to do, uncertainty, the times.

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

## What changed at the 03:37 UTC re-read (11 November)

Data: [rereads.json](rereads.json). 44 addresses, the first read by this role's second session.

- **At the authorities, nothing** (facts): IPMA's communiqué no. 2 and Lisbon's six warnings unchanged; AEMET's row empty. ANEPC's notices page did not answer (notice 21 was the latest at 03:28).
- **In the coverage, nothing new** (evidence): the live blogs' titles and the front pages' headlines on Charles are those already quoted below.
- Jornal de Negócios is link only from 03:30 UTC (the team no longer requests it, nor Sábado): its live page has left the re-read.
- No new tracker or map.

## What changed at the 03:28 UTC re-read (11 November)

Data: [rereads.json](rereads.json). 44 addresses.

- **At the authorities, nothing** (facts): IPMA's communiqué no. 2 and Lisbon's six warnings unchanged; ANEPC's notice 21 still the latest; AEMET's row empty.
- **In the coverage** (evidence): RTP's 03:00 radio bulletin is headed "IPMA: depressão Charles vai atingir mais o sul do país"; SAPO reports 71 occurrences in Madeira up to 02:00 (50 an hour earlier). The live blogs have not moved since about 01:00.
- No new tracker or map.

## What changed at the 02:33 UTC re-read (11 November)

Data: [rereads.json](rereads.json). 44 addresses read again (the three sites whose terms restrict automated reading are no longer requested).

- **At the authorities, nothing** (facts): communiqué no. 2; Lisbon's six warnings identical to 01:29; AEMET's row still empty.
- **In the coverage** (evidence): the first impact reports come from Madeira: RTP's 02:00 radio bulletin leads on more than 50 occurrences recorded by Madeira's civil protection; SAPO carries power cuts at Porto Santo. The live blogs are in their night lull (no title changed since 01:29).
- No new tracker or map.

## What changed at the 01:29 UTC re-read (11 November)

Data: [rereads.json](rereads.json). 48 addresses read again.

- **At the authorities, nothing new** (facts): IPMA's communiqué is still no. 2; Lisbon's warnings are the same less the yellow rain warning that ended at midnight (red rain Wednesday 09:00 to 18:00 and red wind 12:00 to 21:00 stand); AEMET's row for Charles is still empty.
- **In the coverage** (evidence): SAPO leads "Depressão Charles muda trajetória para sul, com menos vento em Lisboa e Norte mais resguardado"; CNN Portugal lists a video titled "... Tempestade chega a Lisboa com menos intensidade do que o previsto"; CMTV shows floods and landslides in Machico, Madeira. RTP retitled its live blog, and its address changed with the title.
- **For the home page:** four outlets now lead on less wind for Lisbon while IPMA's red wind warning stands unchanged. The block that shows both, labelled and timed, is now the most useful thing the page could add (idea 9). And from RTP: a page that is retitled must keep its address; our permanent row ids already do.
- No new tracker or map. Renascença's dashboard, SAPO, Público and DN answer again.

## What changed at the 00:29 UTC re-read (11 November)

Data: [rereads.json](rereads.json). 48 addresses read again.

- **At the authorities, nothing** (facts): IPMA's communiqué is still no. 2; its seven warnings for the Lisbon district are the same as at 23:39 (red rain Wednesday 09:00 to 18:00, red wind 12:00 to 21:00); AEMET's table still has no naming date against Charles.
- **In the coverage, the headline moved** (evidence): Público's live blog now leads "Charles passa mais a sul do que o previsto e vento deverá ser menos intenso"; Notícias ao Minuto's, "Tempestade muda de trajetória; CP suprime comboios". Observador's and Negócios's live blogs were updated after midnight; RTP's page grew to 1.54 MB.
- **For the home page:** a reader of headlines and a reader of warnings now hold different pictures of the same afternoon. Idea 9 in practice: the authority's unchanged line and the press's changed line side by side, each labelled and timed, with no line of our own between them.
- Portuguese Wikipedia's article is now readable (last changed 00:18 UTC): three sections and footnotes with the date consulted. No new tracker or map was found. The Met Office blog, Meteored UK and Severe Weather Europe still do not mention Charles. Renascença's dashboard, SAPO, Público's front page and DN did not answer this time.

## The gap, as a table

For each of the 26 entries that cover Charles (data: [gap.json](gap.json), with a note per row): does it show a timeline, the decisions as a list, a source link per item, the time the source was read, the warned period by hour, and the same content as data. "Partly" is explained in `gap.json`; "not seen" means we did not read enough to say. One read each, 10 November, 23:38 to 23:48 UTC (Portuguese Wikipedia at 00:29 UTC on the 11th). This is not a criticism of anyone's journalism: live blogs and explainers do other things well.

| Who | Timeline | Decisions | Source per item | Time read | Hour by hour | Data |
|---|---|---|---|---|---|---|
| [IPMA](https://www.ipma.pt/pt/otempo/comunicados/) | partly | no | yes | partly | yes | yes |
| [ANEPC](https://prociv.gov.pt/pt/avisos-a-populacao/) | no | partly | yes | no | no | no |
| [MeteoAlarm](https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-portugal) | partly | no | yes | yes | partly | yes |
| [AEMET](https://www.aemet.es/es/conocermas/borrascas/2026-2027) | no | no | yes | no | no | partly |
| [Renascença](https://rr.pt/tempestade-charles-avisos-e-ocorrencias) | no | no | partly | not seen | no | no |
| [RTP](https://www.rtp.pt/noticias/pais/depressao-charles-esperado-agravamento-significativo-das-condicoes-meteorologicas_e1778024) | yes | partly | no | partly | no | no |
| [Público](https://www.publico.pt/2026/11/10/sociedade/noticia/carros-submersos-estradas-alagadas-lisboa-escolas-servicos-publicos-fecham-quarta-2194405) | yes | partly | no | partly | no | no |
| [Público](https://www.publico.pt/2026/11/10/sociedade/noticia/mau-tempo-governo-pede-apenas-deslocacoes-necessarias-periodos-chuva-intensa-2194385) | no | partly | no | partly | no | no |
| [Observador](https://observador.pt/liveblogs/manifestantes-detidos-no-porto-pronunciam-se-sobre-suspensao-provisoria-do-processo/) | yes | partly | partly | partly | no | partly |
| [Observador](https://observador.pt/especiais/ventos-superiores-a-150-km-h-chuva-torrencial-e-a-ameaca-de-um-novo-sting-jet-pode-a-charles-repetir-a-kristin/) | no | no | partly | partly | partly | no |
| [Jornal de Negócios](https://www.jornaldenegocios.pt/economia/detalhe/fiquem-em-casa-todos-os-que-puderem-escolas-e-servicos-publicos-encerrados-amanha-siga-ao-minuto) | yes | partly | partly | partly | no | no |
| [Notícias ao Minuto](https://www.noticiasaominuto.com/pais/3081421/ao-minuto-so-saia-de-casa-se-for-necessario-madeira-a-vermelho) | yes | partly | partly | partly | no | no |
| [Renascença](https://rr.pt/depressao-charles/tag/12540/) | yes | not seen | not seen | not seen | no | no |
| [ECO](https://eco.sapo.pt/topico/depressao-charles/) | partly | partly | no | partly | no | no |
| [Jornal de Notícias](https://www.jn.pt/nacional/artigo/tudo-o-que-precisa-de-saber-sobre-a-tempestade-charles/18146628) | no | partly | partly | partly | no | no |
| [TSF](https://www.tsf.pt/sociedade/artigo/depressao-charles-mantem-trajeto-incerto-e-devera-atingir-o-periodo-mais-critico-na-tarde-de-quarta-feira/18146855) | no | partly | no | partly | no | no |
| [CNN Portugal / TVI](https://cnnportugal.iol.pt/meteorologia) | no | no | no | partly | no | no |
| [Correio da Manhã / CMTV](https://www.cmjornal.pt/cmtv/videos/detalhe/veja-o-percurso-da-tempestade-charles-e-por-onde-deve-entrar-em-portugal) | no | partly | no | partly | no | no |
| [tempo.pt (Meteored)](https://www.tempo.pt/noticias/previsao/) | no | no | partly | partly | partly | no |
| [Luso Meteo](https://lusometeo.com/atualidade/tempestade-charles-mais-fraca-32997/) | no | no | partly | partly | partly | no |
| [Wikipedia (pt)](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles) | partly | partly | yes | yes | no | yes |
| [Wikipedia (en)](https://en.wikipedia.org/wiki/2026%E2%80%9327_European_windstorm_season) | partly | no | yes | not seen | no | yes |
| [Euronews](https://www.euronews.com/2026/11/10/portugal-on-alert-as-storms-bruna-and-charles-raise-sting-jet-risk-of-160-kmh-winds) | no | partly | no | partly | no | no |
| [El País](https://elpais.com/el-tiempo/2026-11-10/las-borrascas-bruna-y-charles-ponen-bajo-aviso-rojo-por-lluvias-a-extremadura-y-castilla-y-leon.html) | no | partly | no | partly | no | no |
| [The Portugal News](https://www.theportugalnews.com/news/2026-11-10/weather-alert-portugal-on-red-alert-for-storm-charles/1114149) | no | no | no | partly | no | no |
| [Open social networks](https://mastodon.social/tags/charles) | no | no | no | partly | no | partly |

What it shows:

- **None of the 26 has all six.** IPMA comes closest and is the source itself; it records no decisions by others.
- **Decisions as a list: none.** Fourteen report decisions as entries in a stream or as separate articles.
- **The time the source was read: two** (MeteoAlarm, the issue time per warning; Portuguese Wikipedia, "Consultado em" on 31 footnotes, read at 00:29 UTC on the 11th). Nineteen give only a publication or update time.
- **By hour: one** (IPMA). **Data: four** (IPMA, MeteoAlarm, the two Wikipedias).
- **Measured:** of 18 press pages counted, 12 had no link to ipma.pt or prociv.gov.pt anywhere in their HTML; the most was five (Observador's live blog, to ANEPC).

Ours: timeline, decisions, a source and a time read on every item, and every dataset under `api/v1/`; the hour-by-hour strip is in the data and in the designer's round 1.

## Imagery we may show (radar, satellite, maps)

The exact terms, quoted, with each licence page's address, are in [imagery.json](imagery.json). A careful reading of public terms, not legal advice; where the terms are silent it says so.

| Source | Terms page (read 23:53 UTC) | Hotlink | Verdict |
|---|---|---|---|
| IPMA radar | [ipma.pt: avisos legais](https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml) | not addressed | **Link only for now.** Use is free for personal or public purposes that are not for profit, naming the source, with IPMA's logo and a link; nothing on loading its images in another page. A person should ask IPMA. |
| IPMA satellite | same | no | **Link only.** The images are "copyright EUMETSAT/IPMA": two rights holders. |
| EUMETSAT (Meteosat, EUMETView) | [data registration and licensing](https://user.eumetsat.int/resources/user-guides/data-registration-and-licensing), [terms of use](https://www.eumetsat.int/about-us/terms-use) | yes for frames one hour old or more, with attribution | **Allowed with care.** Images with a latency of one hour or more: any purpose, attribution, no fee, after accepting the licence in its user portal (a person's step). Newer than one hour on a public page reads as "broadcasting": a paid licence (EUR 8,000 a year). Caption: "Contains modified EUMETSAT Meteosat data 2026" and the image time. |
| Copernicus EMS mapping | [terms and conditions](https://mapping.emergency.copernicus.eu/terms-and-conditions/) | not addressed | **Free to reproduce and show with its citation**, once a product exists: no activation naming Charles was listed at 23:40 UTC. |
| MeteoAlarm | [terms and conditions](https://www.meteoalarm.org/en/live/page/terms-and-conditions) | its maps: no | **Redraw, do not copy.** The warnings may be reused (terms equivalent to CC BY 4.0) with IPMA named, the issue time, a link to meteoalarm.org, its disclaimer sentence and a delay under ten minutes; its own maps, icons and layout belong to EUMETNET. |

**For the designer:** no radar may be put on the page today without asking IPMA. What can be built now: (1) our own warnings map from IPMA's JSON (source named, logo, link); (2) text links "Radar: IPMA" and "Satellite: EUMETView"; then (3) a satellite frame at least one hour old from EUMETSAT, once a person has accepted its licence. Three asks for a person are listed in `imagery.json`.

## The licence of each site: can we read it, can we reuse it?

Data: [terms.json](terms.json) (each site's own terms page, with the sentences about reuse, verbatim) and [links.json](links.json) (the terms and contact links as printed on each site). Read 11 November, 02:15 UTC. Of 106 entries: a terms link was found on 63; 52 terms pages gave text about reuse; 11 did not open or are drawn by script; 43 sites showed no terms link in the HTML we read. Every [site page](sites/README.md) carries its own sentences. Not legal advice.

- **An open licence is named** on the terms pages of: Met Office (Open Government Licence), US National Weather Service, Yr / MET Norway, KNMI (CC0 for the website), FMI, JMA, ECMWF, Open-Meteo, the Iowa Mesonet, dados.gov.pt, Wikipedia. With IPMA (non-profit use, source named), DWD (CC BY 4.0), MeteoAlarm and EUMETSAT (see imagery above), these are the sources we can build on.
- **The press is all rights reserved**: Público, Observador, ECO and others say their content may not be used without consent. We quote a headline or a sentence with a link, as the law's free uses allow, and nothing more.
- **Three sites restrict automated reading or use by AI systems in their terms**: tempo.pt (Meteored) forbids "a extração massiva de dados (scraping) por meio de spiders, bots ou sistemas automatizados" and use of its texts or data to train AI models; The Portugal News says public access "does not constitute permission or a licence for such automated or commercial uses"; Zoom Earth's sharing terms exclude "automated or systematic access". We had read each once before reading its terms. **From 02:40 UTC we no longer request their pages**: we keep the link and a short description, capture nothing, and leave the question of asking permission to a person.

## Our own use of IPMA's warnings against MeteoAlarm's terms

Checked at the conductor's request ([meteoalarm-check.json](meteoalarm-check.json)). We do take from MeteoAlarm: `data/weather/cap.json` is read from its feed, and the "IPMA sent at" times on the timeline come from it.

| MeteoAlarm asks | Met? |
|---|---|
| IPMA named | yes |
| Time of issue shown | yes (`sent_utc` on every message; quoted on the timeline) |
| A link to www.meteoalarm.org | **no**: the home and incident pages do not mention MeteoAlarm; `cap.json` links the feed address only |
| Its disclaimer sentence | **no**: nowhere on the site |
| Delay under ten minutes, if redistributed operationally | **no**: about every 30 minutes; the message IPMA sent at 21:23 UTC reached `cap.json` at 23:51 UTC. Either say in words that `cap.json` is a dated record and not a live feed, or refresh every five minutes. The browser cannot read the feed directly (no cross-origin header). |
| Unmodified text; none of MeteoAlarm's own maps or icons | yes |

Also: IPMA's own terms ask for its logo with a link when its information is shown on a web page; our pages name and link IPMA but carry no logo.

## Drafts for a person to send

[outreach/](outreach/README.md): a message to IPMA about showing the radar image (Portuguese and English) and the steps to register with EUMETSAT and accept its licence, with one question for its help desk. Drafts only; a person sends; no contact details.

## For other agents

- incident.media@ and the conductor: `sources.json` records no Wikipedia article; the Portuguese one is titled "Depressão Charles" (no year). AEMET's season table had no naming date or service against Charles at 23:38 UTC.
- incident.meteorologist@: open, reusable second sources for Lisbon are api.met.no (no key, a User-Agent is asked for) and Open-Meteo (CC BY 4.0); MeteoAlarm's feed carries IPMA's and AEMET's warnings in one format.

## How this was made

`tools/probe.sh` requests each address once (HTTP GET, no script execution) and records status, size, title and time; `tools/gen.py` joins those results with the descriptions and writes `sites.json`, refusing any entry that has no probe behind it. The fetched pages and the screenshots are not kept in git. Renascença's dashboard refused the headless browser (403) though it had answered the plain request, so its description rests on the page shell and its legends.
