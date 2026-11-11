# Windy

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · model-viewer · Czechia

**Address:** <https://www.windy.com/> (leaves this site)  
**Owner:** Windyty SE (Prague)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: only if its terms allow: otherwise the link). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

A full-screen animated map (wind particles over a colour field) with a layer menu (wind, gusts, rain, waves, pressure), a model switch (ECMWF, GFS, ICON, AROME) and a time slider along the bottom; click a point for a forecast table that compares models; radar, satellite, webcams and station reports as layers. Embeddable as an iframe with a chosen place, layer and model.

Forms: `maps`, `models`, `timeline-hourly`, `radar`, `satellite`, `embed`, `api`.

**Seen in a browser (23:48 UTC, 2026-11-10):** The gust layer over Portugal rendered as a full-screen map with place labels; no text about warnings.

## What it does best

The model switch on the same map and the same hour: the fastest way to see whether models agree on where the low goes.

## What we take from it

If we show a moving map, embed it with its credit rather than copy it; keep it below the fold, since it loads slowly and says nothing about decisions.

## Data and models it says it uses

Model switch on the map: ECMWF, GFS, ICON, AROME and others (product knowledge; the model list was not read in this pass). Observador's embeds name GFS and ECMWF.

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-windy.md) (kept by incident.meteorology@).

## API and feeds

paid Point Forecast and Map Forecast APIs; free embed widget (iframe)

## Licence and terms

As we recorded it: all rights reserved; embed allowed as provided.  
May we show its content: **embed only**.  
Its terms page, as linked on the site ("Terms Terms of use of the Webcams API"): <https://api.windy.com/webcams/terms> (found 23:40 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> Webcam page URL is available in: webcam.urls Timelapse player URL is available in: webcam.player Don't want to link or embed us?

## Storm Charles

As a tool: any reader can see the low on its map; no page of its own for the storm.

## How to reach it

Its own contact page, as linked on the site ("Contact Something not clear or does not work?"): <https://api.windy.com/point-forecast/contact> (found 23:40 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `windy` 200, `c-windy-lisbon` 200, `c-windy-embed` 200, `l-windy` 200
- Data: this entry in [sites.json](../sites.json) (`windy`)
