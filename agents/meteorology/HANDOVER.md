# Meteorology: handover

> Kept by incident.meteorology@web-summit.dinis, 11 November 2026, 05:23 UTC

**Second session** (from 05:21 UTC, 11 November; its key is `incident-meteorology-dinis-2` in `data/keys.json`): the re-read was run at once (0 edges changed state) and the next is scheduled into this session for 08:21 UTC, then every three hours; items 1 and 2 under "In flight" are done as said there. Nodes now carry stated joins: `entity`, `of` (a site: the entity that publishes it) and `source` (the id in `sources/registry.json`). The reader's cache is outside git and ends with the session.

For the next incident.meteorology@ session, started by incident.conductor@ at Dinis Cruz's word. The first session ran 02:16 to 03:01 UTC on 11 November (five rounds) and stopped because its context grew past 400k tokens a call. Read this, then [status.json](status.json), then [meteorology/index.md](../../meteorology/index.md).

## What you own

`meteorology/**`, `app/meteorology/**`, `tools/meteorology-*.mjs`, `agents/meteorology/**`, and your own `accounts/ledger/meteorology.jsonl` ([agents/policy.json](../policy.json)). Shared, one line each: `data/keys.json` (make a new session key and add its public half; the first session's key ended with it), `admin/build/generators.json` (already lists `tools/meteorology-build.mjs`).

## What exists (all live on dev)

| Thing | Where | What it is |
|---|---|---|
| The grammar | `meteorology/lineage.json` | 6 layers (node types), the verbs each with its inverse, the rules |
| Nodes | `meteorology/nodes/<type>.json` | 177 nodes: observing-system, model, dataset, body, warning-service, site (all 106 of incident.weatherwatch@'s ids, prefixed `site-`) |
| Edges | `meteorology/edges/<verb>.json` | 226 edges; each has `source`, `expect` (phrases the page must hold) or `searched` (names looked for), and the reader's stamp |
| Licences | `meteorology/licences.json` | 22 rows: read / store / show / transform, attribution, each checked against its page |
| Open sources | `meteorology/sources.json`, `meteorology/samples/` | ten sources, eight probed; small samples only |
| Proposals | `meteorology/build-on.json` | ten things we could draw, with size, attribution line, what each needs |
| Pages | built, not tracked | `meteorology/index.html`, `charles.html`, `licences.html`, `sources.html`, `build-on.html`, `nodes/<id>.html` and `.json`, `graph.json` |

## The tools, and how to run them

```
# 1. the reader: fetch the page each edge and licence cites, stamp state / read_utc / sha256 / quote (rewrites tracked JSON)
METEO_CACHE=<a folder outside git> node tools/meteorology-read.mjs            # uses the cache
METEO_CACHE=<...> node tools/meteorology-read.mjs --stale                      # fetch everything again (about 2 to 4 minutes)
METEO_CACHE=<...> node tools/meteorology-read.mjs --only <substring>           # one item or one host
# 2. the builder: a build generator, runs inside admin/build/build.mjs
node tools/meteorology-build.mjs --out _site
# 3. then, as always
node admin/build/build.mjs && node admin/build/validate.mjs && AGENT=incident.meteorology@web-summit.dinis admin/tools/release.sh
```

- States: `stated` (every `expect` phrase was on the page), `not stated` (none of the `searched` names was), `not found in this read`, `not read`, `terms found: re-read by hand` (a searched name was found: read the context yourself and either write an edge with an `expect` phrase or drop the name from `searched` with a note).
- `render: true` on an item reads the page in a headless browser (`tools/meteorology-render.mjs`) for pages built by script. `no_quote: true` keeps no excerpt: use it on every press page, live blog and forum (people's names sit near the phrase).
- The reader prints `CHANGED` lines when an item's state changes: that is the whole report for a re-read.
- To add a node: one object in `nodes/<type>.json` (stable id, never renamed). To add an edge: one object in `edges/<verb>.json` with a provider's own page as `source`. Then run the reader on it. Never write an edge the page does not say; a site that says nothing gets `to: null`.
- The map draws only sites with a confirmed statement, plus the first eight that say nothing (`SHOWN_SILENT` in the builder).

## The rules that shaped it (do not undo)

- Not a warning service: explain and attribute, never forecast. The six-model table on `charles.html` stays only on incident.conductor@'s conditions (02:38 UTC): IPMA's warnings in force stated first; each model "a model's output, read at the publisher, evidence" with its run time; no average, no pick, no "expected" in our words; the not-a-forecast line. Data-room side only, never the Weather face.
- Do not request zoom.earth, tempo.pt or The Portugal News (their terms restrict automated access).
- No imagery and no model field in git. The Open-Meteo sample and its run times were read in the same minute; re-read both together or not at all.
- One licence table: this one, for meteorological data. Where a body has a `source.json` of incident.sources@ (MeteoAlarm) the row cites that file. IPMA's two rows are our reading until incident.ipma@ confirms.
- incident.entities@ links our node names across the site from `meteorology/nodes/<type>.json` (the name before a bracket; an `also` list if present). Renaming a node changes links everywhere.
- Commits carry no model name (CLAUDE.md). End each wake with the measure step ([accounts/measure.md](../../accounts/measure.md)).

## In flight

1. **The three-hourly re-read.** Asked by incident.conductor@ at 02:51 UTC. The first session's wake (05:59 UTC) ended with it: run `--stale` on your first wake, report only the `CHANGED` lines, and schedule your own next one for three hours later. *Done by the second session; next at 08:21 UTC.*
2. **Names for the linker** (incident.entities@, 02:52 UTC): "Open-Meteo" is both `body-open-meteo` and `data-open-meteo` (the body wins: the data node is the better target); "ICON", "Windy", "Microsoft" link wherever written. Add `also` lists or sharper names. *Done: the body is "The Open-Meteo project", so the bare name goes to the data node; "Microsoft Research"; "ICON" and "Windy" are only written in the weather-site research, in the right sense, and stay.*
3. **Not read** (22 edges): meteoblue (its model page moved), Renascença's tracker and live page, JN, TSF (403), AccuWeather, SIC, Expresso and four model viewers (not opened by weatherwatch), prociv.gov.pt (did not answer).
4. **Licences still unclear**: Copernicus EMS products and Marine (the licence documents themselves), Météo-France per data set, the Met Office's DataHub, FourCastNet's weights; ECMWF's ensemble file layout was not probed.
5. **Edges standing on a general statement**: IFS assimilates Meteosat and Metop (ECMWF's fact sheet says "satellites"); AROME and ARPEGE (Open-Meteo's wording, labelled evidence).

## What waits on Dinis

- **Hour-old Meteosat pictures** (`build-on.html`, item 1): a person registers with EUMETSAT and accepts the licence for Meteosat level 1 data an hour old or more; design rule 9 lifted for that source; whether a picture drawn by EUMETView counts as "what we make" to be confirmed with EUMETSAT.
- **GFS fields redrawn by us** (item 2, public domain): a GRIB2 decoder run outside the build.
- **IPMA's terms** are silent on storing and changing its open data: a person asks IPMA (a draft belongs to incident.media@'s outreach).
- **Open-Meteo's free API** is for non-commercial use: a decision if the site ever carries advertising.
