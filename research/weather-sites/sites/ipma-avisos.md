# IPMA: warnings on a timeline

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Portugal · national-service · Portugal

**Address:** <https://www.ipma.pt/pt/otempo/prev-sam/> (leaves this site)  
**Owner:** IPMA

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

"Avisos meteorológicos em linha temporal": for a district, one row per hazard and coloured bars along a three-day time axis (yellow, orange, red), with the text of each warning. The JSON behind it is api.ipma.pt/open-data/forecast/warnings/warnings_www.json.

Forms: `warnings`, `timeline-hourly`, `maps`, `api`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Lisboa, last update 10 November 21:23 UTC: eight hazard rows (thunder, sea state, rain, wind, snow, cold, heat, fog) by 72 hourly cells for 11, 12 and 13 November, coloured green, yellow, orange, red; under it each warning as a coloured bar with hazard, level, start and end and one line of text, e.g. "Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]: Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos" and "Precipitação - Vermelho [11 Nov 09:00 - 11 Nov 18:00]"; a district list on the right with each district's highest level; "Toda a informação em horas UTC".

## What it does best

The Gantt of warnings: when each hazard starts and ends, in one picture.

## What we take from it

This is the model for our strip: hazards as rows, hours as columns, IPMA's colours; add the events we track (Web Summit day, transport) as extra rows.

## Data and models it says it uses

IPMA's forecasters issue the warnings; criteria are on its "Critérios de emissão" page (linked from the page; not read).

## API and feeds

warnings_www.json (read: 2 KB)

## Licence and terms

As we recorded it: as IPMA.  
May we show its content: **yes, non-commercial, with attribution**.  
Its terms page, as linked on the site ("Avisos legais"): <https://www.ipma.pt/opencms/pt/siteinfo/index.html?page=index.xml> (found 23:39 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> Quaisquer tentativas de alteração de informação, de carregamento de informação, ou qualquer outra acção que possa causar dano e/ou colocar em risco a integridade do sistema, é expressamente proibida, podendo ser punida de acordo com a legislação em vigor.

> O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas.

> O Utilizador deve referir, sempre, a fonte de informação.

> No que respeita aos sítios para que este site faz ligação deverá ser obtida a autorização dos autores desse material ou feita referência à fonte conforme as respectivas declarações de direitos de autor.

Words found on that page: personal or non-commercial use is named.

## Storm Charles

Yes: Lisbon's red rain and red wind warnings for 11 November are drawn here (see [IPMA](sc-ipma.md)).

## How to reach it

Its own contact page, as linked on the site ("Contacto"): <https://www.ipma.pt/opencms/pt/siteinfo/contactar.jsp> (found 23:39 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:39Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `ipma-avisos` 200, `c-ipma-avisos-page` 200, `ipma-api-warnings` 200
- Note: the chart is drawn by script; the JSON was read
- Data: this entry in [sites.json](../sites.json) (`ipma-avisos`)
