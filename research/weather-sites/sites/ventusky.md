# Ventusky

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · model-viewer · Czechia

**Address:** <https://www.ventusky.com/> (leaves this site)  
**Owner:** InMeteo s.r.o. (Czechia)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: only if its terms allow: otherwise the link). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Animated map like Windy, with a strong gust layer and fronts drawn on the map; embeddable. Observador embeds it (gust layer, two models) in its Charles special.

Forms: `maps`, `models`, `embed`.

## What it does best

Gusts and fronts on one map.

## What we take from it

The press already uses this embed; two embeds with two models side by side is Observador's way to show uncertainty.

## Data and models it says it uses

Observador's two embeds of it request the models "gfs" and "ecmwf_hres" (read in the embed addresses).

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-ventusky.md) (kept by incident.meteorology@).

## API and feeds

commercial

## Licence and terms

As we recorded it: all rights reserved; embed allowed.  
May we show its content: **embed only**.  
No link to terms or a licence was found in the HTML we read (many sites draw their footer by script): **not stated** as far as we read.

## Storm Charles

As a tool: Observador embeds two of its gust maps in its special on Charles (see [Observador special](sc-observador-especial.md)).

## How to reach it

No contact link was found in the HTML we read.
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn by script: only the shell and labels read
- Addresses requested: `ventusky` 200, `c-ventusky-embed` 200
- Data: this entry in [sites.json](../sites.json) (`ventusky`)
