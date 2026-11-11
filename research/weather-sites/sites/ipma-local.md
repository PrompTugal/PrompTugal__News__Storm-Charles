# IPMA: forecast by place, hourly

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:50 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Portugal · national-service · Portugal

**Address:** <https://www.ipma.pt/pt/otempo/prev.localidade.hora/> (leaves this site)  
**Owner:** IPMA

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Ten days for a place: day tabs carrying each day's warning colour, then one column per hour with rows for symbol, rain probability, temperature, mean wind, sea state and, last, the warnings as one coloured cell per hour.

Forms: `timeline-hourly`, `warnings`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Lisboa (updated 2026-11-10 19:56:03 UTC): ten day tabs, each with symbol, min and max, wind, rain probability and the day's warning colour as a label ("Amarelo", "Vermelho", "Amarelo"); under them one column per hour of Wednesday 11 with rows: symbol, probability of precipitation, temperature and felt temperature, mean wind in km/h with direction, sea state (height, direction, water temperature) and a last row, "Avisos Meteorológicos", one coloured cell per hour (yellow, then orange, then red from 09H to 21H). The mean wind row reads 11 to 23 km/h under the red cells; the page explains in its notes that this automatic forecast may differ from the forecasters' descriptive forecast and warnings, which should be consulted.

## What it does best

The warnings as a row of the hourly table itself: hazard level and hour on one axis with the weather.

## What we take from it

The model for our strip, with one change: put the warnings row first, not last, and label the automatic rows as automatic, since they read far below the warning's gusts (IPMA says so only in the notes).

## Data and models it says it uses

Automatic: statistical processing of two numerical models, ECMWF and AROME, twice a day (read on the page's own notes and on api.ipma.pt). The page says this automatic forecast may differ from the forecasters' descriptive forecast and warnings.

## API and feeds

daily by city in the open API; the hourly series is on the site

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

Yes: the hourly page for Lisbon carries the warnings row for 11 November.

## How to reach it

Its own contact page, as linked on the site ("Contacto"): <https://www.ipma.pt/opencms/pt/siteinfo/contactar.jsp> (found 23:39 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:39Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `ipma-lisboa` 200, `ipma-api-daily` 200
- Data: this entry in [sites.json](../sites.json) (`ipma-local`)
