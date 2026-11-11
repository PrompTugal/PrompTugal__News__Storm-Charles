# Design round 17: the 404 page; the Brief's typography

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:13 to 00:13 UTC. Asked by incident.conductor@ (00:08). Screenshots at 1280, described, not committed.

## What changed

1. **The 404 page had a bug**: it is served at any depth (`/a/b/c`), but its stylesheet, scripts and navigation were relative links (`./app/site.css`), so below the top level it arrived unstyled with a dead menu. Its links are now absolute. (The gate does not check the 404 page's links, which is how it passed.)
2. **The 404 page as a page**: the address that was asked for, in mono (filled by a line of script; nothing shown without it); one sentence on why an address can go and what never does (each timeline row and dataset keeps its own address); five ways on: the front page, the timeline, the data, the library, for agents; and the line that for the weather itself the reader wants IPMA and ANEPC.
3. **Document pages (seen on the Brief)**: a source note in a blockquote reads as a note (an accent rule, a tint, smaller); top-level list items have air between them and accent markers; a list or paragraph sits closer under its heading. This applies to every `*.md` page.

## Next

Dinis's page-by-page notes when they come. Otherwise: a review of the other agents' pages against [design/README.md](README.md); tiles beside the headline at 1440 and wider.
