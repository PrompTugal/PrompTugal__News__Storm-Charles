# MeteoAlarm

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · warnings-aggregator · Europe

**Address:** <https://www.meteoalarm.org/en/live/> (leaves this site)  
**Owner:** EUMETNET (the network of European national services)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

One map of Europe coloured by the highest warning per region, from the national services themselves; per country a list with level, hazard, validity; Atom/CAP feeds per country. Portugal's feed was read: 122 entries at 23:35Z, levels Moderate, Severe and Extreme.

Forms: `maps`, `warnings`, `feed`, `api`.

**Seen in a browser (23:48 UTC, 2026-11-10):** Portugal: a map coloured by district (Madeira red; the mainland yellow and orange at 23:00 to 02:00), a time bar with buttons Now, +24h and each day to Saturday plus "Animation", filters by awareness level and hazard type, and a list of areas, one row per warning with the hazard pictogram on its colour.

## What it does best

The same colours and the same format for every country: IPMA and AEMET on one map, machine-readable in CAP.

## What we take from it

Show Spain's warnings beside Portugal's from one feed; keep the four European colours exactly.

## Data and models it says it uses

Warnings from the national services themselves (EUMETNET members); for Portugal, IPMA (read in its terms and feed).

## API and feeds

Atom + CAP feeds per country, no key

## Licence and terms

As we recorded it: terms equivalent to CC BY 4.0 with extra conditions for redistribution (read in the feed).  
May we show its content: **yes with attribution and its conditions**.  
No link to terms or a licence was found in the HTML we read (many sites draw their footer by script): **not stated** as far as we read.

**Exact terms** (read 23:53 UTC, <https://www.meteoalarm.org/en/live/page/terms-and-conditions>):

- "All Information on the MeteoAlarm Website may be used and redistributed under terms equivalent to the Creative Commons Attribution 4.0 International License (CC BY 4.0), along with the following additional requirements":
- "If the Information being redistributed is modified in any way, it must be redistributed along with the same Information without any material change or modification."
- "If the Information being redistributed spans a single country, the name of the relevant MeteoAlarm Participant (National Meteorological and Hydrological Service) must always be displayed." (More than one country: "EUMETNET – MeteoAlarm".)
- "The time of issue of the Information being redistributed ... must be included in any redistribution."
- "Any Information being redistributed through internet applications must include a link to the following URL: www.meteoalarm.org."
- "Any Information being operationally redistributed must always be made available to users in real-time, with the delay ... being on average less than five minutes and never longer than ten minutes."
- "All redistributors must publish the following disclaimer: \"Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to www.meteoalarm.org.\""
- "The Content on the MeteoAlarm Website [text, icons, design, layout, maps, software] ... is owned by EUMETNET. EUMETNET grants the MeteoAlarm Participants a ... license to use this Content."

Our reading: The warnings themselves may be reused and redrawn by us, with IPMA named, the issue time, a link to meteoalarm.org, the disclaimer sentence, and a delay under ten minutes if we republish them as a running service. MeteoAlarm's own map pictures, icons and layout are licensed only to the national services: not ours to copy or hotlink. Verdict: Draw our own warnings map from the data (IPMA's JSON is the simpler source and has only IPMA's terms). If MeteoAlarm's feed is used: show "IPMA", each warning's issue time, a link to meteoalarm.org and the disclaimer; note that our build is not continuous, so the ten-minute rule is met only if the browser reads the feed live. (from [imagery.json](../imagery.json); not legal advice.)

## Storm Charles

Yes, as data: IPMA's warnings for Portugal in its map and CAP feed (see [MeteoAlarm: Portugal feed](sc-meteoalarm.md)).

## How to reach it

No contact link was found in the HTML we read.
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `meteoalarm` 200, `meteoalarm-pt` 200, `meteoalarm-feed` 200, `c-meteoalarm-pt-feed` 200, `l-meteoalarm` 200
- Data: this entry in [sites.json](../sites.json) (`meteoalarm`)
