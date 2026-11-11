# Open-Meteo

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

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
Its terms page, as linked on the site ("Licence"): <https://open-meteo.com/en/licence> (found 23:38 UTC, 2026-11-10; the terms themselves were not read line by line unless the line above says "read").

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

Its own contact page, as linked on the site ("About us & Contact"): <https://open-meteo.com/en/about> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · a data answer read
- Addresses requested: `openmeteo` 200, `openmeteo-api` 200, `l-openmeteo` 200
- Data: this entry in [sites.json](../sites.json) (`openmeteo`)
