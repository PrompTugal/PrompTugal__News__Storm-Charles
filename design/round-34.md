# Design round 34: a menu for sixteen subsites in ten groups; breadcrumbs; the repo link; moved addresses keep working

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:29 to 02:31 UTC

From Dinis's note of about 02:20 (multiple navigation structures, professional at the top; Wayback; more subsites coming) and the conductor's lists of 02:19, 02:24 and 02:26. Checked in a browser at 1280 and 390.

1. **The menu is filled at the very end of the build**, when every page has been written: a subsite or a page is listed only if its file was really built. So nobody edits the frame to appear, and the gate can never meet a dead menu link. The table is in `admin/build/build.mjs` (`MENU`).
2. **Ten groups for sixteen sections**: Weather · Stories · Data room (front page, dashboard, timeline, decisions, data, query, graph, ontology, lead times, entities, library) · Sources (sources, IPMA, MeteoAlarm, meteorology, **Wayback**) · Research (media, media charts, social, Wikipedia, weather sites, studies, shadow, models) · Labs · Studio (studio, cast) · Team (agents, jobs, the jobs table, board, For Dinis, CI, log in, contribute, launch draft) · Help (help, what's new) · About (brief, restructure, design, LLMs). Those not built yet (meteorology, models, shadow, IPMA's section, labs' index...) appear by themselves when they are.
3. **Three navigation structures now**: the primary bar (subsites), the secondary bar (the pages of the subsite you are in), and **breadcrumbs** under them (Storm Charles › Data room › Timeline); the panel is the fourth.
4. **The version chip links to What's new** (`news/`) as soon as that page exists (until then `version.json`); beside it, **the repo link** (marked as leaving the site).
5. **Our capture first**: where the headline or a signal shows its source and we hold a capture of that address (`evidence` in `incident.json` and `signals.json`), the line reads "our capture of it, then <the outside link>".
6. **Moved addresses keep working**: `/index.html#day` (and `#wind`, `#madeira`, `#lisbon-rain`, `#thursday`, `#where`, `#signals`) goes to the data room's part; `/view/<path>.html` goes to `/view/?path=<path>` (from the 404 page). The panel's Source part offers "in the file viewer" for a JSON file.

## Not yet

- The investor pack's look as the model for the default theme (https://web-summit.sgit.ai/investors/): next round; this one was the structure.
- The agents' small marks beside "Kept by": after the look.
