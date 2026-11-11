# Met Office (UK)

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · national-service · United Kingdom

**Address:** <https://www.metoffice.gov.uk/> (leaves this site)  
**Owner:** UK Met Office (public body)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Home opens on the UK warnings map with a day strip (today and the next days, each coloured by its highest warning); a place search gives an hour-by-hour table (symbol, chance of rain, temperature, feels-like, wind and gust, visibility, humidity, UV). The UK Storm Centre lists the named storms of the season with the date named and the map of each; surface-pressure charts by forecaster.

Forms: `maps`, `warnings`, `timeline-hourly`, `presenter-video`, `explainer`, `api`.

**Seen in a browser (23:48 UTC, 2026-11-10):** UK warnings page with a day strip; "No warnings" for Tuesday 10 November, so the warning layout itself was not seen in use.

## What it does best

The warnings page: one map, a day selector, and each warning written as "what to expect" in plain bullet points, with issued and updated times and a likelihood-by-impact matrix.

## What we take from it

Write each warning as what to expect, not only as a colour; show the impact-likelihood matrix cell; one line "issued / updated" under every warning.

## Data and models it says it uses

Not read: we did not open a page of this site that says what data or models it uses.

## API and feeds

Weather DataHub (site-specific, map images, atmospheric models); key needed; plans by daily request limit

## Licence and terms

As we recorded it: Crown copyright; website material under the UK Open Government Licence v3.0 unless marked; some data licensed for a fee.  
May we show its content: **yes with attribution for OGL material**.  
Its terms page, as linked on the site ("Legal"): <https://www.metoffice.gov.uk/policies/legal> (found 23:38 UTC, 2026-11-10; the terms themselves were not read line by line unless the line above says "read").

## Storm Charles

No: its storm centre follows the western group's names; Charles is a south-western name. Its news blog did not mention it at 00:29 and 01:29 UTC on 11 Nov.

## How to reach it

Its own contact page, as linked on the site ("Contact the Press Office"): <https://www.metoffice.gov.uk/about-us/news-and-media/contact-the-press-office> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn in a headless browser and looked at
- Addresses requested: `metoffice` 200, `metoffice-warnings` 200, `metoffice-stormcentre` 200, `metoffice-datapoint` 200, `l-metoffice` 200, `c-metoffice-surface` 200
- Data: this entry in [sites.json](../sites.json) (`metoffice`)
