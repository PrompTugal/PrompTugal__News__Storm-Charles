# AEMET (Spain)

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · national-service · Spain

**Address:** <https://www.aemet.es/en/portada> (leaves this site)  
**Owner:** Agencia Estatal de Meteorología (Spanish government)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Warnings map by zone with tabs for today, tomorrow and the day after and a table of every warning (zone, phenomenon, level, start, end, probability, comment). Keeps the season's list of high-impact storms named by the south-western group, with who named each and when, and a study of each episode afterwards.

Forms: `maps`, `warnings`, `radar`, `satellite`, `api`, `explainer`.

## What it does best

The season table of named storms: name, type, date named, the service that named it, and a link to the episode study.

## What we take from it

Our incident page should link the naming record; and promise the after-study ("estudio del episodio") as a section from the start.

## Data and models it says it uses

Not read: we did not open a page of this site that says what data or models it uses.

## API and feeds

AEMET OpenData (REST, free API key)

## Licence and terms

As we recorded it: reuse allowed citing AEMET as the source, without distorting the information (read on its legal notice).  
May we show its content: **yes with attribution**.  
Its terms page, as linked on the site ("Legal"): <https://www.aemet.es/en/conocenos/transparencia/relevancia-juridica> (found 23:38 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> The use and reproduction of this information is authorized only if AEMET is identified as its author Site map | Legal notice | Web accessibility | Links | Web help Widget El tiempo en tu web Descarga nuestra App App Oficial Android e iOS Follow us

## Storm Charles

Yes: Charles is on its season table; Spain's own warnings for the storm are on its warnings page (see [AEMET: season table](sc-aemet.md)).

## How to reach it

Its own contact page, as linked on the site ("3 - Web help"): <https://www.aemet.es/en/ayuda> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · content read in the returned page
- Addresses requested: `aemet` 200, `aemet-avisos` 200, `aemet-borrascas` 200, `aemet-opendata` 200, `l-aemet` 200, `c-aemet-borrascas` 200, `c-aemet-avisos` 200
- Note: the 2026-2027 table lists Adam (16 Oct, AEMET) and Bruna (5 Nov, IPMA); the Charles row had no date or naming service filled in at 23:38Z
- Data: this entry in [sites.json](../sites.json) (`aemet`)
