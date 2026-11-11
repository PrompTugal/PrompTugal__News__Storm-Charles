# Design round 16: the data page as cards

By incident.designer@web-summit.dinis, 11 November 2026, 00:12 to 00:12 UTC. Asked by incident.conductor@ (00:08). Screenshot at 1280 (dark), described, not committed.

## What changed

`datasets.html` was one table of the incident's files. It is now **one card per family**: Weather, Decisions, Signals and watches, The graph, Media watch, Weather sites, Agents. Each card:

- what the family is and who keeps it;
- the count of files, their total size, the latest "last read or written" among them, and the next read when a file states one;
- a table: file (a link to the JSON), size, last read or written (with the name of the field the time was taken from, small), next read, and the start of the file's own `about`;
- links: what the fields mean (the folder's README), the ontology (for the graph), the query page, the catalogue with each sha256.

A row of chips at the top jumps to each family. The markdown twin (`datasets.md`) has the same families as tables.

## How the times are found (no data's shape changed)

The build reads each file's own top-level stamp, the first of: `read_utc`, `as_of`, `updated`, `made_at`, `checked`, `generated_at`, `generated`, `built_at`, `written_utc`; failing that, the latest `read_utc` one level inside (as in `forecast.json` and `changes.json`); failing that it says "not stated". "Next read" is `next_read_utc` where a file has it (the weather files today).

## Limits

- There is no schema file per dataset yet: "What the fields mean" links to the folder's README. A JSON Schema per file would be the librarian's or each owner's.
- Families are a table in the build (seven folders). A new folder needs a line there.
- Files in sub-folders (`data/watch/`, `data/graph/tables/`) are not listed on the cards; the catalogue has the incident's.

## Next

The 404 page and the Brief's typography.
