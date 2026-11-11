> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 11:57 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `stranded`: Lukas Brenner (invented), checked-out Web Summit attendee in a hotel lobby, phone 390 × 664, 1 minute. Entry: /guide/stranded/ (direct). Version seen: v0.1.1000. Do Not Track and GPC on. Page height 12 995 px.

## Path
| # | URL / anchor | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/stranded/ | Headline "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind."; section "4 · I'm stranded: where can I go, what is open?" already on the first screen | 0-5 | 170 headline; 468 heading; 628 first row |
| 2 | scroll | Pingo Doce closed, state museums closed, schools, courts, hospitals limited, then "Parks, gardens, municipal culture (Lisbon city) running" with road-tunnel text | 5-22 | 628-1325 |
| 3 | scroll | "Not stated ... cafés and restaurants, shopping malls ... hotels, ride-hailing (Uber, Bolt), taxis, pharmacies ... Ask the place itself."; "Shelter stated by an operator" (homeless contingency, Metro stations) | 22-33 | 1532; 1782-2111 |
| 4 | fling | "Deeper: every source, with its time" (open, not folded): the same closures again, longer. Thinks he is still in the same list | 33-45 | 2258-5174 |
| 5 | scroll | "3 · Getting around"; Metro row: `not announced` + "Thursday 12 Nov transport after the storm" | 45-55 | 5271; 5434 |
| 6 | scroll | CP row (four trains suppressed), ferries row; time out | 55-60 | 5579; 5750 |
| - | not reached | "Carris (Lisbon city buses), Fertagus, ride-hailing and taxis: not stated" | - | 6531 |
| - | not reached | "Metro to run on Wednesday (announced by the mayor)" EVIDENCE; "Still open: No Metro notice on metrolisboa.pt about Wednesday's service" | - | 7622; 8059 |

## In 10 seconds
Red rain warning until 18:00 UTC, and the page is about him: the "where can I go, what is open?" heading is on the first screen (468 px) with no tap. Better than guide-1 (one tap, landed at 4030 px).

## In 1 minute
Supermarkets (Pingo Doce), state museums, schools are closed; hospitals limited. Cafés, malls, hotels, Uber/Bolt and taxis are "not stated", which he reads correctly as "unknown". He still does not know whether the Metro runs today: the Metro row he reaches is about Thursday.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is anything open (café, mall, a place to wait)? | partly: closures plus an honest "not stated" list; nothing stated open (and Parks "running" misleads) | 628-1532 px | 30 | 0 |
| Can I get across town (Metro, buses, Uber)? | partly: Uber/taxis "not stated" found at 1532; Metro today not found (summary row is Thursday; today's row at 7622 not reached) | 1532; 5434 | 60 (unresolved) | 0 |
| Where do I go? | not found: only shelter is Metro stations for homeless people at night | 1782-2111 | 33 | 0 |

## Misread
- "Parks, gardens, municipal culture (Lisbon city) **running**" (1325 px, now on the second screen): text is "Three Avenida da República tunnels ... still open after midnight". He reads "parks and gardens are open" under a red warning. The same tunnel text appears correctly as "Road tunnels (Lisbon city) running" at 6039. The row is mis-matched.
- Metro row (5434): `not announced` read as "the Metro has not said it runs today / may be shut". It is about Thursday.
- "4 · I'm stranded" then "3 · Getting around": 4 before 3 makes him think he skipped a page.
- "Deeper" block (2258-5104) is open, so the closures repeat; he flings past it as noise, 12 s lost.
- FACT/EVIDENCE chips: ignored. "read Wed 11 Nov 02:42 UTC": not noticed as 9 h old.

## Wanted, not found
- One line: Metro today (Wednesday) and its source; the material exists (7622, 8059) but sits in "Deeper", 7 000 px below the top.
- A jump link "Getting around" at the top of the page (no in-page anchors exist).
- Any place stated open to wait in.

## Reads like advice?
No site-own advice. Near the line, all pointing to sources:
- "go to the operator before you set off" (5312 px)
- "Ask the place itself." (1532 px, again at 12155)
- CP row "(12:00 to 15:00 forecast: heavy rain, strong wind)" (5579 px, again 8170): inside an EVIDENCE row but no forecaster named, reads like our forecast.

## Words not understood
IPMA, ANEPC, "alert situation", EVIDENCE, Transtejo Soflusa, Fertagus, Rede Expressos, "Still open:" (8059, reads as "still open for business", means "unresolved").

## What would make them act
"Metro today: the mayor said it runs (press, read 18:58 UTC Tue); no Metro notice" at the top of Getting around, reachable in one tap. He would walk to the Metro; now he asks reception.

## Score
3/5: the page now opens on his question, but the Parks row still says "running" with tunnel text and today's Metro status is still buried 7 600 px down under a Thursday row.

## Against guide-1
| Guide-1 finding | Status |
|---|---|
| Metro row shows Thursday, nothing for today | not fixed (5434; today's evidence only at 7622) |
| Parks row `running` with road-tunnel text | not fixed (now higher, 1325, so more readers see it) |
| Buses/ride-hailing "not stated" at the bottom of Getting around | partly (Uber/Bolt/taxis now in the stranded list at 1532; Carris/Fertagus line still last, 6531) |
| No summary line at top of stranded section | partly ("We never infer that a place is open", 532; no "nothing is stated open") |
| Homeless shelter readable as a waiting place | partly (rows lead with "homeless people"; label still "Shelter stated by an operator:", 1782) |
| CP press "forecast" without forecaster | not fixed (5579) |
| Times read ~9 h old unnoticed | not fixed (02:42 UTC rows) |

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | Parks/gardens row shows `running` with the road-tunnel item | 1325 px, 2nd screen, ~18 s in | Fix the matcher; with no parks statement, list parks under "not stated" (the alert measure (c) "no access to high-risk parks" is the only parks fact) |
| costly | Metro summary row is Thursday's "not announced"; Wednesday's "Metro to run (mayor, press)" and "No Metro notice" sit in Deeper | 5434 vs 7622/8059; not reached in 60 s, 0 taps possible | Put a Wednesday Metro row first in Getting around; Thursday as its own row |
| costly | Getting around starts at 5271 px (8 screens) because "Deeper" is unfolded in between; no jump links | 2258-5104 px, ~12 s of flinging | Fold "Deeper" (details) or add "Open · Getting around" anchor links under the headline |
| minor | Sections numbered 4 then 3 on this page | 468, 5271 | Drop the numbers here or renumber 1, 2 |
| minor | "Still open:" label means "unresolved" | 8059 | "Not yet known:" |
| minor | CP row parenthesis reads as our forecast | 5579 | "(the press citing a forecast)" |
| held | Rows read 02:42 UTC, ~9 h before the visit | stranded rows | "read 9 h ago" beside the time |
