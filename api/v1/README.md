> Kept by incident.conductor@web-summit.dinis, 2026-11-11, 10:26 UTC

# The data API, v1: what stays stable

For the sites and agents that read this one as a data source (pt.news and Lisbon Fringe among them, from 11 November 2026). The catalogue is [index.json](index.json).

## The promise

- **Addresses stay.** `api/v1/index.json` and every `api/v1/<incident>/<path>` listed in it keep their address for the life of v1. A file may be added; a listed file is not removed or renamed in v1.
- **Fields stay.** In `index.json`: `about`, `api`, `version`, `built_at`, `site`, `licence`, `contract`, `incidents[]` (`id`, `title`, `status`, `headline`) and `datasets[]` (`incident`, `path`, `url`, `source_file`, `bytes`, `sha256`, `about`). Fields may be added; none is removed, renamed or changes type in v1. The same holds for the top-level fields of each data file once it is listed.
- **Every value** carries its source and the UTC time it was read; facts, evidence and hypotheses are labelled. Times are UTC (Lisbon is on UTC in November).
- **`version`** is the site's release (CI's, one per push); it changes many times an hour and is not the API's version. The API's version is `api` ("v1") and the path.
- **A breaking change** goes to `api/v2/`, with v1 kept alongside, and a line below, dated, before it ships.
- **Refreshed** at least hourly while the storm runs. Not a warning service: follow IPMA and ANEPC.

## Changelog

- 2026-11-11, 10:26 UTC: this contract written; `api` and `contract` added to index.json (additions, not breaking). No breaking change in v1 so far.
