# Deutscher Wetterdienst (Germany)

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 03:39 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · national-service · Germany

**Address:** <https://www.dwd.de/EN/Home/home_node.html> (leaves this site)  
**Owner:** DWD (German federal authority)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Warnings map down to municipality level with a time slider; the WarnWetter app; a large open-data server (model output ICON, radar composites, station observations, warnings in CAP).

Forms: `maps`, `warnings`, `radar`, `models`, `api`.

## What it does best

Open data at scale, including the model fields and the radar composite, under one plain licence.

## What we take from it

A single plain licence line per dataset, as DWD does; ICON-EU fields are a reusable second model for Lisbon.

## Data and models it says it uses

Its own models (ICON), radar network and stations (its open-data server was listed; model names from Open-Meteo's licence page).

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-dwd.md) (kept by incident.meteorology@).

## API and feeds

opendata.dwd.de: files over HTTPS, no key (GRIB, BUFR, CAP, CSV)

## Licence and terms

As we recorded it: CC BY 4.0 with source named (read on its legal notice).  
May we show its content: **yes with attribution**.  
Its terms page, as linked on the site ("Imprint"): <https://www.dwd.de/EN/Home/EN/service/imprint/imprint_node.html> (found 23:38 UTC, 2026-11-10; excerpts below where the page opened).

Its terms page was not read: the terms page did not open.

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

Its own contact page, as linked on the site ("Con­tact"): <https://www.dwd.de/EN/Home/EN/service/contact/contact_node.html> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · content read in the returned page
- Addresses requested: `dwd` 200, `dwd-warnings` 200, `dwd-opendata` 200, `l-dwd` 200
- Data: this entry in [sites.json](../sites.json) (`dwd`)
