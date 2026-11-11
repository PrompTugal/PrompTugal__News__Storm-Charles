# ECMWF charts and open data

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 03:39 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · model-viewer · International

**Address:** <https://charts.ecmwf.int/> (leaves this site)  
**Owner:** European Centre for Medium-Range Weather Forecasts (intergovernmental)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: only if its terms allow: otherwise the link). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

The reference global model: chart catalogue (mean sea level pressure and wind, ensemble meteograms for any point, extreme forecast index). A subset of IFS and AIFS output is open data.

Forms: `maps`, `models`, `api`.

## What it does best

The ensemble meteogram: the spread of 50 runs for one place as box-and-whisker by time step, uncertainty made visible. The extreme forecast index shows how unusual the forecast is for that place.

## What we take from it

Show a spread, not one line, for Lisbon's gusts where we have several models; say how unusual a value is for the place.

## Data and models it says it uses

Its own models: IFS and AIFS (read on its open-data page).

Where its data comes from, traced: [the lineage of this site](../../../meteorology/nodes/site-ecmwf.md) (kept by incident.meteorology@).

## API and feeds

open data files (GRIB) and a client; charts via Open Charts

## Licence and terms

As we recorded it: CC BY 4.0 with the ECMWF Terms of Use: redistribution and commercial use allowed with attribution (read).  
May we show its content: **yes with attribution**.  
Its terms page, as linked on the site ("ECMWF Terms of Use"): <https://apps.ecmwf.int/datasets/licences/general/> (found 23:38 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> ECMWF | Use of data accessed via this service Use of data accessed via this service Terms of Use for ECMWF Open Data Products/Advanced Web Services, applied in addition to the Creative Commons CC-4.0-BY licence.

> This data product is published under a Creative Commons Attribution 4.0 International (CC BY 4.0).

> This data is published under a Creative Commons Attribution 4.0 International (CC BY 4.0). https://creativecommons.org/licenses/by/4.0/ Disclaimer:

> This ECMWF data is published under a Creative Commons Attribution 4.0 International (CC BY 4.0). https://creativecommons.org/licenses/by/4.0/ Disclaimer:

Words found on that page: an open licence is named.

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

Its own contact page, as linked on the site ("help_outline Help"): <https://www.ecmwf.int/en/support> (found 23:38 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · content read in the returned page
- Addresses requested: `ecmwf-charts` 200, `ecmwf-opendata` 200, `l-ecmwf` 200
- Note: charts.ecmwf.int answered with a bot check; the open-data and licence pages were read
- Data: this entry in [sites.json](../sites.json) (`ecmwf`)
