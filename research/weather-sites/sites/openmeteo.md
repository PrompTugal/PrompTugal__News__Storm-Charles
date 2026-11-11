# Open-Meteo

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:50 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · data-api · Switzerland

**Address:** <https://open-meteo.com/> (leaves this site)  
**Owner:** Open-Meteo (open source)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

A free JSON API over the open models of the national services (ECMWF, DWD ICON, Météo-France AROME/ARPEGE, and others), hourly, any point, with gusts; an ensemble API and a historical API. A call for Lisbon (hourly gusts and precipitation, two days) answered in 534 bytes.

Forms: `api`, `models`, `timeline-hourly`.

## What it does best

Several models for one place in one call, with a clear licence.

## What we take from it

The source for a model-spread strip for Lisbon (labelled analysis material, never a warning).

## Data and models it says it uses

Open data of national services, listed on its licence page: DWD (ICON), ECMWF (IFS, AIFS), Météo-France, NOAA and others, each under its own open licence (read).

## API and feeds

HTTP GET, no key, no sign-up

## Licence and terms

As we recorded it: CC BY 4.0 for the data; the free tier is for non-commercial use.  
May we show its content: **yes with attribution**.  
Its terms page, as linked on the site ("Licence"): <https://open-meteo.com/en/licence> (found 23:38 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> 🧑‍⚖️ Licence | Open-Meteo.com Licence Data Sources Open-Meteo utilises open-data from various national weather services including:

> You must give appropriate credit, provide a link to the licence, and indicate if changes were made.

> You must include a link next to any location Open-Meteo data are displayed, for example: < a href = " https://open-meteo.com/ " > Weather data by Open-Meteo.com </ a > Open-Meteo is open-source Source code is available on GitHub under the GNU Affero General Public Licence Version 3 AGPLv3 or any later version.

> Citation We encourage researchers in the field of meteorology and related disciplines to cite Open-Meteo in their work.

Words found on that page: an open licence is named.

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

Its own contact page, as linked on the site ("About us & Contact"): <https://open-meteo.com/en/about> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · a data answer read
- Addresses requested: `openmeteo` 200, `openmeteo-api` 200, `l-openmeteo` 200
- Data: this entry in [sites.json](../sites.json) (`openmeteo`)
