# MeteoAlarm: Portugal feed

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Storm Charles coverage · authority-aggregator · Europe

**Address:** <https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-portugal> (leaves this site)  
**Owner:** EUMETNET

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

IPMA's warnings in CAP: 122 entries, including Extreme (red) entries, for example a red rain warning for Faro issued 21:23Z on 10 Nov.

Forms: `warnings`, `feed`, `api`.

## What it does best

Machine-readable, with onset and expiry per entry.

## What we take from it

A second path to the same warnings, with Spain's in the same format.

## Data and models it says it uses

Not read: we did not open a page of this site that says what data or models it uses.

## API and feeds

Atom/CAP

## Licence and terms

As we recorded it: equivalent to CC BY 4.0 with conditions.  
May we show its content: **yes with attribution**.  
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

This entry is part of the coverage map. Against the six things this site is built on ([the gap table](../README.md), [gap.json](../gap.json)):

| Timeline | Decisions | Source per item | Time read | Hour by hour | Data |
|---|---|---|---|---|---|
| partly | no | yes | yes | partly | yes |

Warnings on a time bar (now, +24h, by day), each entry with its issuing service and issue time; CAP feed.

Later reads: [rereads.json](../rereads.json).

## How to reach it

No contact link was found in the HTML we read.
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:40Z · HTTP 200 · content read in the returned page
- Addresses requested: `c-meteoalarm-pt-feed` 200
- Data: this entry in [sites.json](../sites.json) (`sc-meteoalarm`)
