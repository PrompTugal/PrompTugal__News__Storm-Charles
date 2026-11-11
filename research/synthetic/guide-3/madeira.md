> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:06 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `madeira`: Inês Freitas, teacher in Funchal, family in Lisbon. Phone 390 x 664, 2 minutes. Version seen: v0.1.1030, walked 12:04-12:06 UTC. Start: /guide/ (Madeira is path 6). Page height 16,668 px (25 screens); 19,735 px with #madeira's "Deeper" open.

## Path

| # | Where | What she sees | s (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)", FACT, read 11:26 UTC. Nothing on Madeira | 5 | ~380 |
| 2 | scroll | "Changed today": Madeira regional president's rainfall briefing (1124), occurrence count 205 (1526); no Madeira decision | 18 | 689-1600 |
| 3 | scroll | Seven tiles; "6 Madeira" | 26 | 1939 (fold 664) |
| 4 | tap #madeira | Lead row: `closed` "Access to Funchal's centre closed for safety this morning", EVIDENCE, pub. 07:25, read 07:35 UTC (4 h ago) | 33 (1 tap) | 12181-12408 |
| 5 | same | "Decisions stated, newest first": 16 Madeira airport flights cancelled (7 arr., 9 dep.); ANA "conditioned" | 45 | 12443-12800 |
| 6 | same | SRPC preventive-measures page (FACT); occurrence count 205, none serious | 62 | 12837-13398 |
| 7 | same | "No orange or red IPMA warning for Madeira in force or ahead", read 11:26 UTC | 70 | 13437-13570 |
| 8 | same | "Anything not listed here (roads, buses, shops, Funchal's centre since this morning): not stated in what we have read." | 78 | ~13560-13690 |
| 9 | tap "Deeper: every source, with its time" | 13 items; schools "closed on Wednesday morning, reopening from 13:00" is 12th | 105 (2 taps) | 13804 -> 16375 |
| 10 | back to top | Lisbon top line already read; forwards it to family | 115 | ~380 |

## In 10 seconds
Lisbon: red rain until 18:00 UTC, orange wind and waves. Madeira still not on the first screen.

## In 1 minute
Funchal's centre was closed this morning; 16 Madeira flights cancelled; 205 occurrences, none serious; no orange or red warning for Madeira now. Still no school answer in the section.

## Three things looked for
1. **What is in force in Madeira**: found, #madeira 13467 px, ~70 s, 1 tap. Clear "no orange or red ... in force or ahead" (guide-2's near-expiry ORANGE is gone). Sits below decisions and statistics.
2. **Decisions in Madeira**: partly. Funchal flights found at 12484 px, ~45 s, 1 tap (was ~90 s / 2 taps). Roads: Funchal centre lead row + "not stated" line. **Schools: not in the visible section**; only inside "Deeper", 12th of 13, 16375 px, ~105 s, 2 taps (unchanged). The visible "Schools (mainland)" row is in section 4 (8918 px), not hers.
3. **Lisbon for family**: found, first screen, 5 s, 0 taps.

## Misread
- Lead row `closed` on Funchal's centre (pub. 07:25, "4 h ago"): read as closed now; the not-stated line ("Funchal's centre since this morning") corrects it 1,300 px lower.
- "Decisions stated" without schools: as a teacher she concludes no Madeira school decision exists, until Deeper.
- "Schools (mainland)" (8918 px) now says mainland: no misread, if she passes it. #madeira still does not say the mainland alert (2660 px) does not cover Madeira.
- Deeper's last item "Red warnings for Madeira's south coast and mountains ... wind gusts to 140 km/h" (16560 px) has no "past" mark beside it; she reads red for a moment.

## Wanted, not found
- A Madeira top line ("In force now for Madeira: no orange or red; schools reopen 13:00") at the top of #madeira.
- Schools in "Decisions stated" (present only in Deeper and in section 4's Deeper).
- Schools and Porto Santo ferry named in the not-stated list.
- The tile higher: it moved from 708 to 1939 px.

## Reads like advice?
No. "the public asked not to go to affected areas" (12243 px) is SRPC's, as EVIDENCE via cnnportugal.iol.pt. "Your airline decides whether your flight goes: its site or app has the latest" (3228 px) is a referral to the operator, not advice.

## Words not understood
"SRPC" (expanded only in "Who:"); "conditioned" (ANA, 12674); "l/m²" (Changed today, 1124).

## What would make them act
"Schools in Madeira: reopening 13:00 (SRPC, via observador.pt)" in "Decisions stated"; she would share the Lisbon top line and the Madeira "no orange or red" line.

## Score
3.5/5: Madeira now leads with a closure and flights and ends with a clear "not stated" and "no warning" line, but schools, her first question, are still 12th in a collapsed list, and the tile is lower.

## Against guide-2
- Decisions only in "Deeper", statistics first: **partly** (closure + flights lead; schools still only in Deeper, 12th of 13).
- No Madeira headline / "not stated" line: **partly** (not-stated line added at ~13600 px; no Madeira top line).
- Section-4 Schools row not marked mainland: **fixed** ("Schools (mainland)", 8918 px); Madeira-side line still absent.
- Warnings near expiry shown as plain ORANGE: **fixed** ("No orange or red ... in force or ahead").
- Funchal centre "closed this morning" may be stale: **partly** (published time + "4 h ago" shown; tag still `closed`; not-stated line lists it).
- Tile below fold: **not fixed**, worse (708 -> 1939 px, "Changed today" inserted above).

## Findings

| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | Madeira schools decision absent from #madeira's visible "Decisions stated" | Only in Deeper, 12th of 13, 16375 px; ~105 s, 2 taps (flights now 45 s, 1 tap) | Add the SRPC schools row (closed till 13:00) to "Decisions stated" |
| costly | Madeira tile pushed down by "Changed today" | Tile 1939 px (was 708); ~3 screens, ~8 s lost; page 16,668 px | Put the seven-question tiles (or a "Madeira" jump) above "Changed today" |
| minor | No Madeira top line; "in force" answer is 7th block of the section | 13467 px, ~70 s | Open #madeira with "In force now for Madeira: no orange or red (IPMA, read ...)" |
| minor | Not-stated list omits schools Thursday and Porto Santo ferry; no line that the mainland alert does not cover Madeira | ~13600 px | Name them; add "The mainland alert (section 1) does not cover Madeira" |
| minor | Past red Madeira warning in Deeper unmarked | 16560 px | Mark "ended Wed 06:00 / past" |
| held | Lead `closed` tag on a 07:25 report | 12243 px | Tag "closed (as of 07:25 UTC)" |
