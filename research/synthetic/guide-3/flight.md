> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:05 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `flight`: Sofia Marchetti, Lisbon to Milan this afternoon, in a taxi queue, phone 390 x 664, 45 seconds (then again in 20 minutes). Entry: /guide/lisbon/. Version seen: v0.1.1030 (pushed 12:04 UTC). Do Not Track and GPC on. Page height 21,488 px (32.4 screens; guide-2: 17,509). Pixel positions from a second load at 12:05 UTC (live page; within about 60 px of the first).

## Path

| # | Where | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/lisbon/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)." FACT, IPMA feed read 11:26 UTC. No question menu at the top | 4 (4) | banner ≈440 to 620 |
| 2 | scroll | "Changed today": top row "208 flights cancelled at Lisbon, 14 at Faro, by 09:20" EVIDENCE (CNN Portugal, read 10:34 UTC) | 5 (9) | H2 769; row ≈850 |
| 3 | scroll | Skims warnings, alert situation, an open "Deeper" warning history | 7 (16) | 1754 to 4090 |
| 4 | 2 · I have a flight | "Your airline decides whether your flight goes: its site or app has the latest."; ANA rows (press, EVIDENCE); TAP rebooking row | 10 (26) | H2 4156; 4200; 4343, 4445; 4673 |
| 5 | same card | "Lisbon (Humberto Delgado): 42 airline departures seen by OpenSky's receivers since 06:25 UTC" FACT, read 12:01 UTC; "A floor, not a total; it says nothing about your flight." | 4 (30) | 4837 |
| 6 | Getting to the airport | Metro ("the red line serves the airport"): "Metro to run on Wednesday (announced by the mayor)" EVIDENCE, read 17 h ago; bridges (Vasco da Gama 100 km/h since 07:30, read 11:35); "Taxis, ride-hailing and the airport's buses: not stated in what we have read."; airport board link | 10 (40) | 5016; 5085; 5253, 5382; 5523; 5582 |

## In 10 seconds
Red rain until 18:00 UTC; 208 cancellations at Lisbon by 09:20 (press). Nothing on the first screen takes her to flights.

## In 1 minute (done in 40 s, 0 taps)
The airline decides; planes are leaving (42 departures since 06:25 UTC, FACT, 12:01 UTC); the Metro red line is said (by the mayor, yesterday) to run; the Vasco da Gama bridge is limited to 100 km/h; taxis "not stated". She gets in the taxi and opens her airline app.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is my flight going? | found (airline line + OpenSky count in the card, FACT, read 12:01 UTC) | 4200, 4837 px | 30 | 0 (6.3 screens of scroll) |
| What does the airport say? | partly (ANA only via press, EVIDENCE; own board linked, bot check stated) | 4343, 4445, 5582 px | 26 | 0 |
| Can I get to the airport? | found ("Getting to the airport": Metro, bridges, taxis "not stated") | 5016 to 5582 px | 40 | 0 |

## Misread
- "Lisbon airport (ANA)" heading over a CNN Portugal row: read as ANA's own count (4343). "by 09:20" still has no zone.
- Bridges: green "running ... lifted by 22:29 Tuesday" (5382, read 9 h ago) right under the newer "limited 100 km/h": for a second she thought both bridges were unrestricted.
- "Metro to run on Wednesday" (5085) read as a Metro statement; it is the mayor's word, read 17 h ago, and the caveat "No Metro notice on metrolisboa.pt" is 6,200 px away (11266).
- "↑ The seven questions" (4090) points to a menu BELOW, at 20464 px: the arrow says up.
- "not stated" for taxis read correctly as "we don't know", not "closed".

## Wanted, not found
- The question menu at the top (it exists, but at the foot: #gd-q at 20464 px).
- ANA's own word dated today (latest is Tue 18:04 UTC, press).

## Reads like advice?
No. The airline line is now a statement ("Your airline decides ... its site or app has the latest.", 4200); guide-2's "Check with your airline." and "go to the operator" are gone. Only the standard "follow IPMA and ANEPC; in an emergency call 112" remains (held). "12:00 to 15:00 forecast" (7848) is CP's word, attributed via the press.

## Words not understood
"ANA", "OpenSky's receivers", "A floor, not a total", "EVIDENCE" vs "FACT", "superseded", "Humberto Delgado" (she knows it as LIS).

## What would make them act
She acts at 40 s: gets in the taxi, opens the airline app. She would act at 15 s if a top menu took her to "2 I have a flight".

## Score
4/5. Everything she came for is now in one card within 45 s, honestly labelled; it still costs 6.3 screens of scroll because the menu is at the foot.

## Against guide-2
| guide-2 finding | Status |
|---|---|
| No airport access line | fixed (5016 to 5582: Metro, bridges, taxis "not stated") |
| No jump menu on /guide/lisbon/ | partly (menu added, but at the foot, 20464 px; flight H2 moved down to 4156 from 2797) |
| Open "Deeper" pushes the OpenSky line down | fixed for the line (4837, in the card); "Deeper" still open by default (5663, 1,428 px) |
| Funchal "since ? UTC" | not fixed (6830) |
| ANA label after text / "by 09:20" no zone | not fixed |
| Metro Thursday row first | fixed (airport block shows Wednesday; Thursday row at 10310) |
| Old reads look current | partly ("(9 h ago)" added; old green "running" bridges row still beside the newer limit) |
| Imperatives in site voice | fixed (rephrased as statements) |

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | Question menu only at the foot; flight card 6.3 screens down | #gd-q 20464 px; flight H2 4156; ~14 s of 45 lost to scrolling; page +3,979 px since guide-2 | Put #gd-q under the banner (about 700 px), as on /guide/ |
| minor | "↑ The seven questions" points down | 4090, 7171, 14896 px | Fix the arrow or move the menu up |
| minor | Superseded bridge "running" row beside the current limit | 5253 vs 5382 | Keep only the newest per bridge in the card |
| minor | Metro airport row lacks the "mayor's word, no Metro notice" caveat | 5085 vs 11266 | Carry the "Still open" line into the card |
| minor | "by 09:20" no zone; Funchal "since ? UTC"; Madeira rows in Lisbon's "Changed today" | ≈850, 6830, ≈1150 px | "09:20 UTC"; "start time not stated"; filter by place |
| held | Standard "follow IPMA and ANEPC; call 112" | 4028 and others | Editor's call |
