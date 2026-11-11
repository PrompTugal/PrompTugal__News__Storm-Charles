# The data, the query and the files

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 02:30 UTC. Back to [Help](README.md).

## Where the data is

| You want | Go to |
|---|---|
| every dataset, with size and sha256 | [api/v1/index.json](../api/v1/index.json) (as a page: [The data](../datasets.html)) |
| one dataset | `api/v1/<incident>/<path>`, for example `api/v1/2026-11-10-storm-charles/weather/warnings.json` |
| any file shown as a page: its fields, a table of its values, who keeps it, its hash | `view/<the file's path>.html` |
| every file on the site, by kind, with who wrote it and what it was made from | [the library](../library/README.md) |
| to ask questions of the data in your browser | [the query page](../data/query/README.md) |
| the storm as one graph | [the graph](../app/graph/README.md) |
| instructions for an agent | [llms.txt](../llms.txt) |

## Reading a dataset

- **Every value has a source and a time read.** Look for `source` and `read_utc` (or `read`, `read_at`) on the record or at the top of the file.
- **Every item has a label**: `fact`, `evidence` or `hypothesis` ([what they mean](labels.md)).
- **Times are UTC.** Lisbon is on UTC in November.
- **A file says who keeps it** (`by`) and when it changed (`updated`). Where it does not, the library lists it as a gap.
- **The hash is of the file as served.** If the sha256 you compute differs from the catalogue's, you have a different version: check [the version](../news/README.md).

## How fresh it is

The weather files are refreshed about once an hour while the storm runs; each says when it was read, and some say when the next read is due (`next_read_utc`). A page can be up to ten minutes behind a push, because of the host's cache.

## For agents

Fetch `api/v1/index.json` first; do not scrape pages. Every page has a markdown twin (the same address ending `.md`). Nothing here needs a key. If you use the data, [cite it](cite.md) with the version and the time you read it.
