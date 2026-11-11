# Renascença: "Monitorização Depressão Charles"

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 03:39 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Storm Charles coverage · interactive · Portugal

**Address:** <https://rr.pt/tempestade-charles-avisos-e-ocorrencias> (leaves this site)  
**Owner:** Rádio Renascença

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: only if its terms allow: otherwise the link). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

The only purpose-built tracker found. A dashboard with two views: weather warnings (a risk map by warning area, a national severity figure, "warnings in my area" by the reader's location, the day's warnings sorted by importance and time) and civil-protection occurrences (a map with markers coloured by state: under way, being resolved, concluding, dispatched; a number on a marker when several share a place; a filter by state). Built with an open map library; data loaded by script.

Forms: `maps`, `tracker`, `warnings`, `interactive`.

**Seen in a browser (23:48 UTC, 2026-11-10):** The headless browser was refused ("The request is blocked"); the plain request had returned the page shell.

## What it does best

Warnings and occurrences in one tool, with "my area" and occurrence states.

## What we take from it

The closest thing to our site. It has no timeline, no decisions, no sources per item and no machine-readable twin: those are ours. Its occurrence-state legend and "my area" are worth matching.

## Data and models it says it uses

Labelled on the page: "Proteção Civil" for occurrences and "Avisos Meteorológicos" for warnings; the feeds behind it load by script and were not seen.

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-sc-rr-dashboard.md) (kept by incident.meteorology@).

## API and feeds

none

## Licence and terms

As we recorded it: all rights reserved.  
May we show its content: **short quotation with link**.  
Its terms page, as linked on the site ("Termos de Utilização"): <https://rr.pt/termos-e-condicoes> (found 23:46 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> É proibida a sua reprodução, modificação, distribuição ou exploração comercial sem autorização expressa.

## Storm Charles

This entry is part of the coverage map. Against the six things this site is built on ([the gap table](../README.md), [gap.json](../gap.json)):

| Timeline | Decisions | Source per item | Time read | Hour by hour | Data |
|---|---|---|---|---|---|
| no | no | partly | not seen | no | no |

Maps and lists of warnings and occurrences; sources named for the tool as a whole ("Proteção Civil", "Avisos Meteorológicos"), not per item; the data loads by script and was not seen; no download offered in the page shell.

Links to ipma.pt or prociv.gov.pt in the page's HTML: 1.

Later reads: [rereads.json](../rereads.json).

## How to reach it

Its own contact page, as linked on the site ("Contactos"): <https://rr.pt/contactos> (found 23:46 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:46Z · HTTP 200 · drawn by script: only the shell and labels read
- Addresses requested: `c-rr-interativo` 200, `c-rr-tag` 200
- Note: the page shell and legends were read; the data loads by script and was not seen
- Data: this entry in [sites.json](../sites.json) (`sc-rr-dashboard`)
