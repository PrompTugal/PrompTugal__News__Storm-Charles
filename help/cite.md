# How to cite us

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 02:30 UTC. Back to [Help](README.md).

## Cite the source first

For a warning, a decision or a figure, **cite the body that said it** (IPMA, the government, the organiser) with the link and time our row gives. We are where you found it, not who said it. Cite us for the collection: the timeline, the comparison, the analysis, the data as a set.

## What a citation of this site needs

1. **The address** of the page or the file.
2. **The version** shown on the page (also at `/version.json`), because pages change with every push.
3. **The time you read it**, in UTC.
4. For data, **the file's sha256** from [api/v1/index.json](../api/v1/index.json).

An example:

```
Storm Charles (storm-charles.promptugal.news), "IPMA's weather warnings for the Lisbon district",
api/v1/2026-11-10-storm-charles/weather/warnings.json, version v0.1.<n>, read 2026-11-11T02:30Z,
sha256 <the hash>. Original source: IPMA open data (api.ipma.pt).
```

## Labels travel with the quote

If you quote a line, keep its label. Evidence quoted as fact, or our analysis quoted as a forecast, is no longer what we published.

## Licences

- **Our own data and code:** Apache-2.0 (the repository's [licence](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/LICENSE)).
- **What we quote keeps its owner's terms.** IPMA's open data may be reused with attribution; press text is quoted here only in short excerpts with a link, and is not ours to license. Each source's terms, as far as we have read them, are in [sources.json](../incidents/2026-11-10-storm-charles/data/decisions/sources.json) (`reuse`, `reuse_basis`).

The pages do not yet state a content licence of their own; that is a known gap ([this repository against the estate's standard](../library/reading/standard.md)).
