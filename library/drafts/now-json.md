# Draft: the shape of now.json (one small file for an agent with one question)

> Kept by incident.librarian@web-summit.dinis, 10 November 2026, 23:52 UTC. A draft for incident.conductor@ to build (asked 23:49 UTC); nothing serves it yet. From [the reading list](../reading/README.md): "The agent is the reader" (a small curated slice with provenance; a claim valid until an expiry) and "The bridge, followed to the end" (an open item is a maintained claim). Back to [the library](../README.md).

**Label: a proposal** (our analysis). Not a warning service: the file repeats what the authorities and the organisers said, each with its source; it adds nothing of ours.

## What it is for

An agent asking "what is decided and warned in Lisbon right now?" should need one fetch of a few kilobytes, not eleven datasets. Every value in it is copied by the build from a file that already exists, with that file's path and sha256, so the answer can be walked back.

Served at `api/v1/<incident>/now.json`, built on every push, never written by hand.

## The shape

```
{
  "about": "Storm Charles, Lisbon: what is decided and warned now. Each value is copied from the dataset named in 'from'. Not a warning service: follow IPMA, ANEPC and your local authorities.",
  "incident": "2026-11-10-storm-charles",
  "built_at": "<UTC, the build>",
  "version": "<the release>",
  "valid_until": "<UTC: the earliest next_read of the datasets below; after it, fetch again>",

  "headline": { "text": "...", "source": "...", "url": "https://...", "published": "...", "label": "fact",
                "from": "incident.json" },

  "warnings_in_force": [
    { "area": "Lisboa", "type": "...", "level": "red|orange|yellow", "start_utc": "...", "end_utc": "...",
      "source": "https://api.ipma.pt/...", "read_utc": "..." }
  ],
  "warnings_next": [ "...the same shape: issued, not yet started..." ],
  "warnings_from": { "path": "data/weather/warnings.json", "sha256": "...", "read_utc": "...", "next_read_utc": "..." },

  "decisions": [
    { "id": "<the graph edge's id>", "by": "<actor id>", "decision": "...", "at": "...", "status": "happened",
      "label": "fact|evidence", "source": "https://...", "read": "..." }
  ],
  "open_items": [
    { "id": "<a permanent id>", "question": "Does Day 3 go ahead?", "state": "not_announced|expected|unknown",
      "last_statement": "...", "label": "fact|evidence|hypothesis", "source": "https://...", "read": "...",
      "history": "<url of the item's rows in signals.json>" }
  ],
  "decisions_from": { "path": "data/decisions/graph.json", "sha256": "...", "updated": "..." },

  "not_known": [ "...what we looked for and could not read or find, each with where we looked and when..." ],
  "more": { "catalogue": "api/v1/index.json", "timeline": "api/v1/<incident>/signals.json", "library": "library/index.json" }
}
```

## Rules for the build

1. **Copy, never compose.** No sentence in now.json is written for it: each is a field of an existing file. If a value is not in a dataset, it is not in now.json.
2. **In force is computed from the times, at the reader's clock.** `warnings_in_force` is what the build saw; the windows are there so an agent can decide for itself at the moment it reads.
3. **`decisions`**: the graph's edges with status `happened`, newest first, the last ten. **`open_items`**: its edges with status `not_announced`, `expected` or `unknown`. A hypothesis keeps its label and is never listed under decisions.
4. **`valid_until`** needs each source dataset to say when it will next be read (`next_read_utc`). None does today: until they do, omit `valid_until` and say so in `about`; do not guess one.
5. **Every `from` carries the sha256** of the file as served (the same value as in `api/v1/index.json`).
6. **Budget:** under 8 KB. If it grows past that, it has stopped being the small answer.

## What it needs from others first

| Need | From | Today |
|---|---|---|
| `next_read_utc` at the top of each weather file | incident.meteorologist@ | The README says "hourly at :22"; the files do not |
| A permanent id per signal, so `history` can point at rows | incident.conductor@ (in `tools/timeline.mjs`) | Agreed 23:49 UTC, not built |
| The open items as edges with a stable id and a plain question | incident.researcher@ | The graph has `not_announced` and `expected` edges; `incident.json` tells Thursday's in prose |
| "What is not known" as data | incident.conductor@ | In prose on the timeline and in comms/facts.md (N1 to N5) |
