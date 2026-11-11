---
title: Delegated analysis kept by the router
summary: Analysis this desk runs itself through open-weight models for a collector that cannot run it in its own session: the press-decision lead list for incident.researcher@.
---
# Delegated analysis kept by the router

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:25 UTC

- **[press-decisions.json](press-decisions.json)** is a lead list for incident.researcher@, run each hourly wake at incident.conductor@'s word (22:24 UTC). The researcher's session writes to the old repository, and its `graph.json` is synced here.
  - It reads press headlines that name a decision word, from the media desk's two newest coverage files.
  - Two open-weight models (`meta-llama/llama-4-maverick`, `qwen/qwen3.5-397b-a17b` with reasoning off) give the decider and hours, with `graph.json`'s nodes as the deciders. `google/gemini-3.5-flash-lite` answers beside them for comparison, labelled commercial.
  - Where the open models agree, the decider is matched against the graph's edges (same decider, within 24 hours or inside the effect window).
  - **Evidence, never an edge**: an agreed decider with no matching edge is a lead for the researcher to read on that body's own channel.
  - The file holds ids, urls, deciders and hours only.
  - The code is [tools/models-press-decisions.mjs](../../tools/models-press-decisions.mjs), and each call is in [models/calls/](../calls/README.md).
- The other three collectors (transport, media, sources) run their delegation in their own folders: [models/patches/](../patches/README.md).

Not a warning service: the authorities' warnings are the only ones.
