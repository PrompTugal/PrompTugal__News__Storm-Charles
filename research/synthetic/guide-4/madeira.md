> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:11 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `madeira`: Inês Freitas, teacher in Funchal, family in Lisbon. Phone 390 x 664, 2 minutes. Version seen: v0.1.1042, walked 12:08-12:11 UTC. Start: /guide/ (Madeira is fold 6). Page height 4,003 px collapsed (6 screens; guide-3: 16,668); 5,494 px with #madeira open; 7,528 px with its "Deeper" open. Seconds lost to length: ~10 s ("Changed today" above the tiles), down from ~25 s.

## Path

| # | Where | What she sees | s (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)", FACT, read 11:26 UTC. Nothing on Madeira | 5 | ~380 |
| 2 | scroll | "Changed today": 3 rows (government, Vasco da Gama, Carris), "21 more today"; none Madeira | 12 | 689-1300 |
| 3 | scroll | Seven tiles; "6 Madeira" | 16 | 1596 (screen 3) |
| 4 | tap tile | Fold opens, lands 2106. Lead: `closed` "Access to Funchal's centre closed for safety this morning ...", EVIDENCE, pub. 07:25, read 07:35 UTC (5 h ago) | 24 (1 tap) | 2259 |
| 5 | same | "Decisions stated, newest first": 16 Madeira airport flights cancelled (7 arr., 9 dep.) | 30 | 2492 |
| 6 | same | Next two rows read only "A…" (ANA, jornaldenegocios.pt) and `"S…` (SRPC, procivmadeira.pt, FACT): text cut to one letter | 38 | 2682, 2792 |
| 7 | same | Occurrence count 205 to 09:00, none serious | 46 | 2967 |
| 8 | same | "No orange or red IPMA warning for Madeira in force or ahead", read 11:26 UTC | 52 | 3249-3350 |
| 9 | same | "Anything not listed here (roads, buses, shops, Funchal's centre since this morning): not stated in what we have read." | 58 | 3408 |
| 10 | tap "Deeper: every source, with its time" | 13 rows, most cut: "O…", "Ac…", "16 …", "Porto …", "The reg…"; schools is 12th: `closed` "Madeira sch…", Who: SRPC, pub. Tue 10 Nov 11:26 | 88 (2 taps) | 3584 -> 5233 |
| 11 | back to top | Lisbon top line; forwards to family | 95 | ~380 |

## In 10 seconds
Lisbon: red rain until 18:00 UTC, orange wind and waves. Madeira still not on the first screen.

## In 1 minute
Funchal's centre closed this morning (5 h old); 16 Madeira flights cancelled; 205 occurrences, none serious; no orange or red warning for Madeira. Two "decisions" are blank stubs ("A…", "S…"). No schools.

## Three things looked for
1. **What is in force in Madeira**: found, #madeira 3249 px, ~52 s, 1 tap (was ~70 s). Still below decisions and counts.
2. **Decisions in Madeira**: partly. Funchal flights at 2492 px, ~30 s, 1 tap (was 45 s). Roads: Funchal centre lead + not-stated line. **Schools: not in "Decisions stated"**; only in Deeper, 12th of 13, 5233 px, ~88 s, 2 taps, and now cut to "Madeira sch…" with `closed`: no reopening time visible at all (guide-3 showed "reopening from 13:00").
3. **Lisbon for family**: found, first screen, 5 s, 0 taps.

## Misread
- "Madeira sch…" + `closed` (Tue 10 Nov report): she reads schools closed, full stop; the 13:00 reopening is gone from her section.
- `"S…` FACT from SRPC: looks like an empty decision; she cannot tell what SRPC decided.
- Lead `closed` on Funchal's centre (07:25, 5 h ago) reads as closed now until the not-stated line 1,150 px lower.
- "Red warnings…" in Deeper (5365 px), past and unmarked; now even the "Madeira's south coast" part is cut.
- Nothing in #madeira says the mainland alert (red rain, top of page) does not cover Madeira; the word "mainland" is absent from the section.

## Wanted, not found
- Schools in "Decisions stated", whole sentence, with the reopening time.
- A Madeira top line at the top of the fold ("In force now for Madeira: no orange or red").
- A line "The red rain alert above is for Lisbon/mainland, not Madeira".
- Porto Santo ferry and schools Thursday in the not-stated list.

## Reads like advice?
No. "the public asked not to go to affected areas nor pass the restrictions" (2259 px) is SRPC's, as EVIDENCE via cnnportugal.iol.pt. Footer "Your airline decides whether your flight goes ... their own sites have the latest" is a referral.

## Words not understood
"SRPC" (only in Deeper and "Who:"); "limited" tag on a cancellation row; "A…", "S…", "O…" (truncated rows); "l/m²" (Deeper, 3680).

## What would make them act
The full schools row in "Decisions stated"; she would share the Lisbon top line and the Madeira "no orange or red" line.

## Score
3/5: folds made Madeira reachable in 24 s and flights in 30 s, but row text is cut to stubs ("A…", "S…", "Madeira sch…"), so the school answer she had in guide-3 is now unreadable.

## Against guide-3
- Schools absent from "Decisions stated": **not fixed** (and Deeper row now truncated: worse).
- Tile pushed down to 1939 px: **fixed** (1596 px; fold H2 at 2204; page 4,003 px).
- No Madeira top line: **not fixed**.
- Not-stated list omits schools/Porto Santo ferry; no "mainland alert does not cover Madeira": **not fixed**.
- Past red Madeira warning unmarked: **not fixed**.
- Lead `closed` on a 07:25 report: **partly** (held; "5 h ago" shown, tag unchanged).

## Findings

| Class | What | Where + measure | Change |
|---|---|---|---|
| blocking | Row text cut to a few characters in the HTML (`<span class="gd-txt">A…</span>`, `"S…`, `Madeira sch…`, `Red warnings…`) | #madeira 2682, 2792; Deeper 3974-5365 (10 of 13 rows); also elsewhere on /guide/ (e.g. "ANA…", "Ma…") | Fix the truncation in the guide generator; show the full row text |
| costly | Madeira schools not in "Decisions stated" | Deeper only, 12th of 13, 5233 px, ~88 s, 2 taps; no reopening time visible | Add the SRPC schools row (closed, reopening 13:00) under Decisions stated |
| minor | No line that the mainland/Lisbon alert does not cover Madeira; no Madeira top line | "mainland" absent from #madeira; in-force line 7th block, 3249 px, ~52 s | Open the fold with "In force now for Madeira: no orange or red (IPMA, read ...). The red alert above is Lisbon's." |
| minor | Past red Madeira warning unmarked | Deeper 5365 px | Mark "past" with its end time |
| held | Lead `closed` on a 07:25 report | 2259 px | Tag "closed (as of 07:25 UTC)" |
