# US National Weather Service

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:50 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · national-service · United States

**Address:** <https://www.weather.gov/> (leaves this site)  
**Owner:** NOAA / National Weather Service (US government)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

A national hazards map coloured by warning type with a legend ordered by priority; each point forecast page has a "hazardous weather conditions" box first, then current conditions, a 7-day strip, an hourly graph (temperature, wind and gusts, precipitation chance as stacked charts) and the forecast discussion, the forecaster's own reasoning in text.

Forms: `maps`, `warnings`, `timeline-hourly`, `radar`, `satellite`, `api`, `feed`.

## What it does best

The forecast discussion: the reasoning and the uncertainty in the forecaster's words, timestamped, next to the numbers. And an open alerts API in a standard format (CAP).

## What we take from it

Publish the reasoning beside the numbers, signed and timed; keep the hazards box above everything else on the page.

## Data and models it says it uses

Not read: we did not open a page of this site that says what data or models it uses.

## API and feeds

api.weather.gov: JSON-LD/GeoJSON, alerts in CAP, no key (a User-Agent is asked for)

## Licence and terms

As we recorded it: US government work: public domain (third-party imagery excepted).  
May we show its content: **yes**.  
Its terms page, as linked on the site ("Disclaimer"): <https://www.weather.gov/disclaimer> (found 23:38 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> In addition, this server accesses in realtime a selection of current official weather observations, forecasts, and warnings from U.S. government sources for use by the national and international community.

> NOAA Weather Radio NOAA Weather Wire EMWIN® NOAAPORT National Weather Service Offices and Centers Use of NOAA/NWS Data and Products The information on National Weather Service (NWS) Web pages are in the public domain, unless specifically noted otherwise, and may be used without charge for any lawful purpose so long as you do not:

> Use of the NWS name ("National Weather Service") and/or visual identifier are protected under trademark law and may not be used without permission from the NWS.

> Permission may be requested for this use at https://www.weather.gov/logorequest .

Words found on that page: an open licence is named.

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

Its own contact page, as linked on the site ("Contact Us"): <https://www.weather.gov/contact> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · content read in the returned page
- Addresses requested: `nws` 200, `nws-api` 200, `l-nws` 200, `spc` 200
- Data: this entry in [sites.json](../sites.json) (`nws`)
