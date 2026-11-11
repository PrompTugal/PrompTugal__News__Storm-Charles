# The decision brief: hand-over

> Kept by incident.brief@web-summit.dinis, 2026-11-11, 21:06 UTC

For the next incident.brief@ session, or whoever makes the next storm's brief. Dinis's word (BRIEF.md, ~11:45): Watchfloor's decision brief is "the kind of PDF that we should be publishing".

## What exists

- **/brief/** serves the latest edition (brief/README.md). Each edition is frozen in `brief/edition-<n>.md`. Its words and judgements are in `brief/edition-<n>.json`, and it is drawn by `tools/brief-make.mjs <n>` from the incident's data files as they stand.
- **Ten editions on 11 November**: 11:40 (first), 12:05 (who is exposed, the ensemble, tides), 12:27 (communiqué no. 3), 12:36 (adjusted warnings), 12:47 (Lisbon's red shortened), 13:05 (Web Summit Day 3, as evidence), 15:04 (Lisbon's red ended), 15:26 (only Faro red), 16:10 (no red left), 21:01 (after the storm: forecast beside observations).
- **PDFs**: CI renders them (`tools/brief-pdf.mjs`, ci/patches/brief-pdf.patch, cached on brief/** and the two scripts) and serves them at /brief/edition-<n>.pdf and /brief/brief-latest.pdf. Never commit a PDF.

## How to make an edition (about 10 minutes)

1. `git fetch origin dev && git checkout -B dev origin/dev`; read signals.json since the last edition, warnings.json, cap.json, airport.json, lisbon-rain.json, exposure/*.
2. Copy the last `edition-<n>.json` to `edition-<n+1>.json`. Change `edition`, `id`, `as_of` (from `date -u`, never a guess), `updated`, `change`, `lead` (three items, each labelled, each with src and read time), `watch`, `decided`, `compare`.
3. If IPMA's CAP messages lead its open data (they did by up to two hours), put them in `cap.items` (each replaces the same area and hazard from its onset; they apply in the order sent) and `cap.moves` (residents moved between levels per hour). Set `cap.marks: false` once the open data catches up.
4. `node tools/brief-make.mjs <n+1>`, `node admin/build/build.mjs && node admin/build/validate.mjs` (OK), look at page 1 of the PDF (`node tools/brief-pdf.mjs --site _site --out <scratch>`) and at 390 px. Then commit and `AGENT=incident.brief@web-summit.dinis admin/tools/release.sh`.
5. Check that it is served (page and PDF), then tell the conductor.

## Rules learned the hard way

- **An edition is true at its own as-of time.** Do not re-draw an old edition from new data. Fix a wording or markup error by re-drawing it in a git worktree at its own as-of commit (the commit before it was published), and say so on the page.
- Times come from `date -u` or the data, never from an estimate (corrected twice).
- "Heaviest/strongest yet" must be true of the whole record, or say "since ...".
- The press repeats superseded warnings: read the warning at the source before comparing.
- IPMA's open data restarts re-issued warnings at their new onset, so past hours drop out of it and out of people-by-hour.json (use `bars_from`, `grid_note`).
- incident.designer@'s floor: 11 px text, contrast in every theme, IPMA colours only for IPMA levels, and confidence that does not look like a label.

## Open

- District outlines for the map (IPMA's zones geopackage; a simplified SVG under 256 KB).
- Precedents, power cuts (E-REDES), and a sea or tide observation of our own (incident.datascience@).
- ANEPC's own final figures, and Web Summit's own word on Thursday.
