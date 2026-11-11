# IPMA

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:40 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Portugal · national-service · Portugal

**Address:** <https://www.ipma.pt/pt/index.html> (leaves this site)  
**Owner:** Instituto Português do Mar e da Atmosfera (the State's meteorological authority)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Home: the map of warnings by district with a day selector, the forecast for the capitals, the latest communiqués and the seismic map. The authority for every warning in Portugal and the service that named Charles.

Forms: `maps`, `warnings`, `timeline-hourly`, `radar`, `satellite`, `lightning`, `api`, `feed`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Home (updated 2026/11/10 23:31 UTC): tabs "Hoje", "Amanhã", "Depois de Amanhã", each with a warning triangle in the day's highest colour (red, red, yellow); the daily forecast map; the warnings map (mainland, Azores, Madeira); a "Comunicados" box; yesterday's extremes by station; small tiles for model charts, satellite, seismic activity.

## What it does best

It is the primary source: the warning itself, the communiqué itself, with validity times.

## What we take from it

Everything in our hero comes from here and links here; our job is to make its content faster to read, not to add to it.

## Data and models it says it uses

Its own observation network, radars and forecasters; for the automatic forecasts, "processamento estatístico das previsões de dois modelos numéricos (ECMWF e AROME)", updated twice a day from the 00 and 12 UTC runs (read on api.ipma.pt).

## API and feeds

api.ipma.pt open data: JSON, no key (warnings up to 3 days, daily forecast by city, hourly station observations, sea state, seismic events)

## Licence and terms

As we recorded it: use allowed for personal or public purposes that are not for profit or offensive, always naming the source (read on api.ipma.pt).  
May we show its content: **yes, non-commercial, with attribution**.  
Its terms page, as linked on the site ("Avisos legais"): <https://www.ipma.pt/opencms/pt/siteinfo/index.html?page=index.xml> (found 23:39 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> Quaisquer tentativas de alteração de informação, de carregamento de informação, ou qualquer outra acção que possa causar dano e/ou colocar em risco a integridade do sistema, é expressamente proibida, podendo ser punida de acordo com a legislação em vigor.

> O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas.

> O Utilizador deve referir, sempre, a fonte de informação.

> No que respeita aos sítios para que este site faz ligação deverá ser obtida a autorização dos autores desse material ou feita referência à fonte conforme as respectivas declarações de direitos de autor.

Words found on that page: personal or non-commercial use is named.

## Storm Charles

Yes: it named the storm and issues the warnings (see [IPMA: communiqué and warnings](sc-ipma.md)).

## How to reach it

Its own contact page, as linked on the site ("Contacto"): <https://www.ipma.pt/opencms/pt/siteinfo/contactar.jsp> (found 23:39 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:39Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `ipma` 200, `ipma-en` 200, `c-ipma-home` 200, `l-ipma-api` 200
- Data: this entry in [sites.json](../sites.json) (`ipma`)
