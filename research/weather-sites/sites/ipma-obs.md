# IPMA: radar, satellite, stations, lightning

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Portugal · national-service · Portugal

**Address:** <https://www.ipma.pt/pt/otempo/obs.radar/> (leaves this site)  
**Owner:** IPMA

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Radar mosaic with animation; satellite (Meteosat channels); hourly surface observations with graphs per station; lightning discharges on a map; sea state and coastal forecast; synoptic charts; descriptive and significant-weather forecasts.

Forms: `radar`, `satellite`, `stations`, `lightning`, `maps`.

## What it does best

Observed gusts per station, hourly, as open JSON.

## What we take from it

Our observed-against-forecast chart rests on this; say the station and the hour on every point.

## Data and models it says it uses

IPMA's own radars, surface stations and lightning network; Meteosat imagery from EUMETSAT (the satellite page is marked "copyright EUMETSAT/IPMA").

## API and feeds

station observations in the open API (read: 93 KB JSON)

## Licence and terms

As we recorded it: as IPMA; imagery under its terms.  
May we show its content: **yes, non-commercial, with attribution; images by link**.  
Its terms page, as linked on the site ("Avisos legais"): <https://www.ipma.pt/opencms/pt/siteinfo/index.html?page=index.xml> (found 23:39 UTC, 2026-11-10; the terms themselves were not read line by line unless the line above says "read").

**Exact terms** (read 23:53 UTC, <https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml>):

- "O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas."
- "O Utilizador deve referir, sempre, a fonte de informação."
- "O logo-símbolo do sítio de internet do IPMA deve ser utilizado sempre que um Utilizador pretenda incluir informação disponibilizada pelo sítio de internet em páginas de hiper-documentos, devendo referenciar a hiper-ligação ao site do IPMA."

Our reading: Free use for personal or public purposes that are neither for profit nor offensive; always name the source; when IPMA's information is included in a web page, show IPMA's logo with a link to its site. Nothing is said about loading its images from its server in another page (hotlinking), and the image addresses are produced by script, not documented or stable. Verdict: Link only for now ("Radar: IPMA", opening IPMA's page). To show a frame: a person asks IPMA whether a non-profit newsroom may load the radar image with "Fonte: IPMA", the logo and a link. Whether this site counts as non-profit is Dinis's to state. (from [imagery.json](../imagery.json); not legal advice.)

## Storm Charles

Yes, as observation: radar, satellite and station readings during the storm.

## How to reach it

Its own contact page, as linked on the site ("Contacto"): <https://www.ipma.pt/opencms/pt/siteinfo/contactar.jsp> (found 23:39 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:39Z · HTTP 200 · drawn by script: only the shell and labels read
- Addresses requested: `ipma-radar` 200, `ipma-sat` 200, `ipma-superficie` 200, `ipma-dea` 200, `ipma-mar` 200, `ipma-descritiva` 200, `ipma-significativa` 200, `ipma-cartas` 200, `ipma-api-obs` 200
- Data: this entry in [sites.json](../sites.json) (`ipma-obs`)
