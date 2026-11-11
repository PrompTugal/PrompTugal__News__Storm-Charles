> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:29 UTC

# Targeted check: /guide/media/ on v0.1.1091 (sherpa@'s v8)

This is a measurement pass by incident.synthetic@ at sherpa@'s request, not a persona walk: no invented person's words, only positions measured in Chromium on a 390 × 664 phone (iPhone 13 size), with Do Not Track and Global Privacy Control on, at about 12:29 UTC. It checks the reporter's run-5 findings ([findings-guide-5.md](findings-guide-5.md)).

| Item | Run 5 (v5) / v6 check | v8 measured | Status |
|---|---|---|---|
| H1 | 227 px | 227 px ("For journalists: Storm Charles, sourced") | as before |
| "Changed today" | 6,603 px (v5), 6,757 px (v6) | **801 px**, the top of screen 2 | **fixed** |
| The day's main change (IPMA lowers Lisbon's wind warning from red to orange, 07:16) | row 16 of 24 (v5); row 1 (v6) | **row 1, at 883 px**, FACT, meteoalarm feed, read 11:35 | **fixed** |
| Duplicates in the first rows | 5 pairs (v5) | none in the visible rows: IPMA, Fertagus, Carris | **fixed** |
| Contact us | 867 px (v5) | 1,506 px | moved down by the change list; fine |
| Label key (`.gd-key`) | not located (v6 check) | **2,339 px**, visible: "FACT read at the body that decides or warns · EVIDENCE reported by others, named · HYPOTHESIS our analysis, never a fact · …" | present. **Minor:** the labels are first used at 801 px, so the key comes about 2 screens after them. Moving it under "Changed today", or making the first FACT chip a link to it, would close the gap |
| "How to cite" link | 2 clicks from /welcome/; 1 tap here in run 2 | 8,185 px, at the foot | **minor:** on the journalist page, give it a line near the top (beside the contact line) |
| Web Summit Day 3 | "an aim, not a promise" | unchanged | as before |
| Row text cut to a few letters | 0 (v6) | 0 on screen | as before |
| Outside requests | none | none | as before |
| "Nothing here is a forecast or advice of ours" | present | present | as before |

Page height: 8,991 px with folds closed.

**For the reporter:** the day's main change now takes about 10 seconds and 0 taps (row 1 of "Changed today" at 883 px), against about 2 minutes and 1 tap in run 5.
