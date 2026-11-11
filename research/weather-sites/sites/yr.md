# Yr (MET Norway and NRK)

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · national-service · Norway

**Address:** <https://www.yr.no/en> (leaves this site)  
**Owner:** Norwegian Meteorological Institute and NRK (public broadcaster)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

A place page with one table: a row per day that opens into a row per hour (symbol, temperature, precipitation in mm, wind speed with an arrow and the wind in words). The national service's warnings for the place sit above the table as banners that start with a status word (Ongoing, Expected), in English, worldwide: for Lisbon it showed IPMA's five warnings. Lisbon was read and rendered.

Forms: `timeline-hourly`, `maps`, `warnings`, `radar`, `api`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Lisbon, hourly table for Wednesday 11 November: above the table, five warning banners for Lisboa in English, each starting with a status word ("Ongoing: Yellow Coastal Event Warning", "Expected: Orange Rain Warning", "Expected: Red Rain Warning", "Expected: Red Wind Warning", "Expected: Orange Coastal Event Warning"), each expandable; under them one row per hour: time, symbol, temperature, precipitation in mm, wind speed in m/s with an arrow, and the wind in words ("Fresh breeze from south east"). No gust column was shown. The automatic rows read 4 to 10 m/s for Lisbon under a banner carrying the red wind warning: the page does not comment on the difference.

## What it does best

The calmest hour-by-hour table on the web, with the authority's warnings for that place above it, each with a status word. The same data is an open API for any point on Earth.

## What we take from it

Warnings above the hours, each starting with Ongoing or Expected. And its flaw to avoid: automatic hourly wind of 4 to 10 m/s printed under a red wind warning with no word on why they differ.

## Data and models it says it uses

MET Norway's forecasts (credit asked: "The Norwegian Meteorological Institute"); the warnings shown for Lisbon are IPMA's. Which model feeds the Lisbon rows was not stated on the page read.

## API and feeds

api.met.no (Locationforecast and others): JSON, no key, an identifying User-Agent required

## Licence and terms

As we recorded it: NLOD 2.0 and CC BY 4.0; credit MET Norway (read on its licence page).  
May we show its content: **yes with attribution**.  
Its terms page, as linked on the site ("License"): <https://api.met.no/doc/License> (found 23:38 UTC, 2026-11-10; the terms themselves were not read line by line unless the line above says "read").

## Storm Charles

Indirectly: its Lisbon page showed IPMA's five warnings for Lisboa in English above the hourly table (rendered 10 Nov, 23:48 UTC). No article on the storm.

## How to reach it

Its own contact page, as linked on the site ("See all help articles"): <https://hjelp.yr.no/hc/en-us> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `yr` 200, `yr-lisbon` 200, `metno-api` 200, `metno-lisbon` 200, `l-metno` 200
- Note: the help-centre page on terms returned 403; the API licence page was read instead
- Data: this entry in [sites.json](../sites.json) (`yr`)
