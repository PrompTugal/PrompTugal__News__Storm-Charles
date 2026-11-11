> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 11:57 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `flight`: Sofia Marchetti, Lisbon to Milan this afternoon, in a taxi queue, phone 390 x 664, 45 seconds (then again in 20 minutes). Entry: /guide/lisbon/. Versions seen: v0.1.998, rechecked v0.1.1003 (same layout). Do Not Track and GPC on. Page is 17,509 px (26 screens).

## Path

| # | Where | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/lisbon/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind." No jump menu to "I have a flight" (/guide/ has one; this page does not) | 4 (4) | banner 260 to 330; H2 "1" 490 |
| 2 | scroll | Past four warnings, the alert situation and an open "Deeper" warning history (1316 to 2700) | 8 (12) | 664 to 2797 |
| 3 | 2 · I have a flight | "Check with your airline..."; ANA row "208 flights cancelled at Lisbon, 14 at Faro, by 09:20" EVIDENCE, read 10:34 UTC; TAP row read 01:50 UTC; airport board link | 15 (27) | H2 2797; rows 2954, 3070; board 3213 |
| 4 | scroll on | Open "Deeper" ANA/TAP history (3293 to 4400), then "What open flight data shows": "Lisbon (Humberto Delgado): 38 airline departures seen by OpenSky's receivers since 06:25 UTC" FACT, read 11:38 UTC | 9 (36) | 3293 to 4470 |
| 5 | scroll to 3 · Getting around | Rows Metro (Thursday, not announced), CP, ferries, bridges (read 02:42), tunnels, coaches; looks for the airport | 9 (45, budget gone) | H2 4981; rows 5100 to 6200 |
| 6 | (past budget) | "Carris (Lisbon city buses), Fertagus, ride-hailing and taxis: not stated in what we have read." | +5 (50) | 6243 |

## In 10 seconds
Red rain in Lisbon until 18:00 UTC. Nothing on the first screen points her to flights; the flight section is 3.2 screens down with no shortcut.

## In 1 minute
Lisbon airport is "limited", 208 cancellations by 09:20 (press, EVIDENCE); only the airline can say about her flight; but planes are leaving: 38 airline departures seen since 06:25 UTC (OpenSky, FACT, read 11:38 UTC), now on her page. Nothing on getting to the airport; taxis "not stated".

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is my flight going? / freshest flight signal | found (OpenSky count on the page, FACT, 11:38 UTC) but below 1,100 px of open "Deeper" history | /guide/lisbon/ 4412 to 4470 px | 36 | 0 (scroll only, ~6.7 screens) |
| What does the airport say? | partly (ANA via CNN Portugal, EVIDENCE; own board linked, bot check stated) | 2954, 3213 px | 27 | 0 |
| Can I get to the airport? | not found (no airport-access row; taxis/ride-hailing "not stated"; Metro row is Thursday) | #around 4981 to 6243 px | 45+ | 0 |

## Misread
- "Lisbon airport (ANA) limited" read as ANA's own words; EVIDENCE pill still after the text (2954 px), source is CNN Portugal.
- "by 09:20" still without zone.
- Metro row first in Getting around (≈5100 px): "not announced Thursday ..." read as "Metro not running". Today's Metro word ("Metro to run on Wednesday", mayor, EVIDENCE) is deep in "Deeper" (≈6800 px).
- "Bridges running" read as now; read 02:42 UTC, 9 h earlier.
- "0 airline departures ... since ? UTC" (Funchal, ≈4600 px): the "?" looked like a broken page.

## Wanted, not found
- A "To the airport" line (Metro red line to Aeroporto, airport road, taxis at LIS), or an explicit "not stated" for it.
- A jump menu at the top of /guide/lisbon/ (as on /guide/: "2 I have a flight" at 484 px).
- The OpenSky line next to the ANA row instead of after the history.

## Reads like advice?
No forecast. Referrals in the site's voice remain: "Check with your airline." (2842 px); "go to the operator before you set off." (5078 px); "Ask the place itself." (12324 px). The CP row quotes "12:00 to 15:00 forecast" (5150 px), attributed to CP via the press, not ours.

## Words not understood
"ANA", "limited", "EVIDENCE" vs "FACT", "OpenSky's receivers", "A floor, not a total", "superseded".

## What would make them act
She would get in the taxi on the strength of "38 departures since 06:25" and check the airline app; she would act faster if a line said what is stated about reaching the airport.

## Score
3/5. The freshest flight signal is now on her page (fixed), but it costs 36 s of scrolling with no jump menu, and getting to the airport is still absent.

## Against guide-1
| guide-1 finding | Status |
|---|---|
| No airport-access row | not fixed (taxis/ride-hailing now explicitly "not stated", 6243 px; no airport line) |
| OpenSky count not on the flight card | partly (on /guide/lisbon/ at 4470 px, under open history; still absent from /guide/ #flight) |
| ANA row looks like ANA's own word | not fixed |
| "by 09:20" without zone | not fixed |
| Metro row is Thursday, reads as "not running" | not fixed |
| Old reads look current | not fixed |
| Imperatives in site voice (held) | unchanged |
| (new) Flight section reachable in 1 tap | regressed on /guide/lisbon/: no jump menu, 2797 px scroll |

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | No airport access line | #around 4981 to 6243 px; not found at 45 s | "To the airport (Metro red line, roads, taxis): <operator word> or not stated in what we have read" in #flight |
| costly | No jump menu on /guide/lisbon/ | flight H2 at 2797 px (4.2 screens); 12 s to reach | Reuse /guide/'s numbered menu (484 px there) |
| costly | Open "Deeper" lists push the OpenSky line to 4470 px | 1,100 px of history between card and the signal; 36 s | Put the OpenSky line in the card under ANA; collapse "Deeper" by default as /guide/ does |
| minor | Funchal "since ? UTC" | ≈4600 px | Write "start time not stated" or hide the row |
| minor | ANA label after text; "by 09:20" no zone; Metro Thursday first; old reads unflagged | 2954, ≈5100, 5600 px | As guide-1 |
| held | Imperatives in site voice | 2842, 5078, 12324 px | Editor's call |
