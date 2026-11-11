# BBC Weather

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · broadcaster · United Kingdom

**Address:** <https://www.bbc.com/weather> (leaves this site)  
**Owner:** BBC (public broadcaster); forecast data from a commercial provider

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: only if its terms allow: otherwise the link). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

A place page that is one horizontal strip: day tabs across the top, under them an hour-by-hour row (symbol, temperature, chance of precipitation, wind arrow with speed; tap an hour for gust, humidity, pressure, visibility); warnings as a labelled bar above the strip; a presenter video forecast and a one-sentence text summary for the day. Lisbon was read.

Forms: `timeline-hourly`, `presenter-video`, `warnings`, `maps`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Lisbon: a card "Tonight" with one sentence ("Thundery showers and a gentle breeze"), day tabs for eight days with high and low, an hour row (symbol, temperature, chance of precipitation, a wind circle with speed), "Last updated today at 23:02", then a rain map with a play button and a week-long time bar. No warning of any kind was shown for Lisbon on the eve of IPMA's red warnings: outside the UK the page carries no authority's warnings.

## What it does best

The hour strip with the sentence above it: "what kind of day" in words, then every hour in one scrollable line, on a phone. The presenter video is the same forecast told by a person.

## What we take from it

The hero: one sentence, then the hour strip; a named voice ("the presenter") is a text block with a time and a role, not a video.

## Data and models it says it uses

The Lisbon page prints "BBC Weather in association with MeteoGroup": a partner is named, no model (pointed out by incident.meteorology@ and checked in our own copy of the page).

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-bbc-weather.md) (kept by incident.meteorology@).

## API and feeds

none public

## Licence and terms

As we recorded it: BBC terms: no reuse without permission; link and short quotation only.  
May we show its content: **no**.  
Its terms page, as linked on the site ("Terms of Use"): <https://www.bbc.co.uk/usingthebbc/terms/> (found 23:40 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> Can I reuse BBC content and services for my business?

## Storm Charles

No: its Lisbon page showed no warning and "Thundery showers and a gentle breeze" on the eve of IPMA's red warnings (rendered 10 Nov, 23:48 UTC); a site search found nothing.

## How to reach it

Its own contact page, as linked on the site ("Accessibility Help"): <https://www.bbc.co.uk/accessibility/> (found 23:40 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `bbc-weather` 200, `bbc-lisbon` 200, `l-bbc` 200, `c-bbc-weather-news` 200, `c-bbc-search` 200
- Data: this entry in [sites.json](../sites.json) (`bbc-weather`)
