> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:18 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `flight`: Sofia Marchetti, Lisbon to Milan this afternoon, in a taxi queue, phone 390 x 664, 45 seconds (then again in 20 minutes). Entry: /guide/lisbon/. Version seen: v0.1.1059 (pushed 12:16 UTC). Do Not Track and GPC on. Page height 12,064 px (18.2 screens; guide-4: 11,412; 29,931 with every "Deeper" open). No horizontal scroll (390 px); no text cut to a few letters (0 short ellipsis strings, closed or opened).

## Path

| # | Where | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/lisbon/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)." FACT, IPMA feed read 11:26 UTC. Jump row not on screen | 4 (4) | banner 416 |
| 2 | small scroll | Jump row "What is happening now / I have a flight / Getting around / I'm stranded" | 3 (7) | 734 to 830 (70 px below the 664 fold, unchanged) |
| 3 | tap "I have a flight" | Lands at scrollY 1927; card head "2 I have a flight" | 2 (9) | H2 2014 (guide-4: 2654) |
| 4 | card | "Your airline decides whether your flight goes: its site or app has the latest." "Lisbon airport (ANA)": 208 cancelled "by 09:20" (CNN, EVIDENCE, read 10:34); ANA "conditioned ... cancellations expected" (press, Tue 18:04, 17 h ago) | 8 (17) | 2061; 2173; 2201; 2303 |
| 5 | scroll | TAP rebook to 17 Nov (EVIDENCE, 10 h ago); "42 airline departures seen by OpenSky's receivers since 06:25 UTC" FACT read 12:06; "A floor, not a total" | 7 (24) | 2530; 2702; 2807 |
| 6 | Getting to the airport | Metro "to run on Wednesday (announced by the mayor)" EVIDENCE 17 h ago; bridges: Vasco da Gama 100 km/h (read 11:35), then green "running: Restrictions lifted on both bridges by 22:29 Tuesday" (10 h ago); taxis/buses "not stated"; airport board link (bot check stated) | 10 (34) | 2874; 2942; 3111; 3239; 3381; 3440 |

Seconds lost to length: about 3 (the scroll to the jump row). The flight card runs 2014 to 3712 (2.6 screens); she reads it in 25 s and never needs the other 15 screens.

## In 10 seconds
Red rain until 18:00 UTC; a row of four questions just under the fold; one tap at 9 s puts her on "I have a flight", now 640 px higher than in guide-4.

## In 1 minute (done in 34 s, 1 tap)
The airline decides; planes leave (42 departures since 06:25 UTC, FACT, 12:06); TAP rebooking to 17 Nov (press); Metro said to run (the mayor, in the press, yesterday); Vasco da Gama at 100 km/h; taxis "not stated". She gets in the taxi and opens the airline app.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is my flight going? | found (airline line + OpenSky count, FACT 12:06) | 2061, 2702 px | 9 to the card, 22 to the count | 1 |
| What does the airport say? | partly (ANA only via press, Tue 18:04; own board linked, bot check stated) | 2303, 3440 px | 17 | 1 |
| Can I get to the airport? | found (Metro, bridges, taxis "not stated") | 2874 to 3440 px | 34 | 1 |

## Misread
- Bridges: the green "running: Restrictions lifted on both bridges by 22:29 Tuesday" (3239, 10 h old) right under the newer grey "limited ... 100 km/h" (3111) reads for a second as "bridges open, no limit".
- Metro row (2942) now says "(announced by the mayor)" in the row itself, so she sees whose word it is; the line "No Metro notice on metrolisboa.pt ... 'Metro runs' is the mayor's word" is still only in "Changed today" (10701), 7,760 px away.
- "Lisbon airport (ANA)" heading over a CNN row (2173/2201): read as ANA's own count. "by 09:20" still has no zone.
- "↑ The seven questions" (1949, 3648, 7134, 9853) jumps DOWN to #gd-q at 10576, which now lists four questions, not seven.
- "not stated" for taxis read correctly as "we don't know", not "closed". FACT (OpenSky) vs EVIDENCE (press) noticed but not weighed.

## Wanted, not found
- ANA's own word dated today (latest is Tue 18:04 UTC, through the press).
- The jump row on the very first screen (still 70 px below the fold).

## Reads like advice?
No. "Your airline decides whether your flight goes: its site or app has the latest." (2061) and "Each operator decides its own service: its site has the latest." state who decides. "A floor, not a total; it says nothing about your flight." (2807) is a caveat on our count, not advice. The standard "For warnings and what to do, follow IPMA and ANEPC; in an emergency call 112." (each card foot) remains (held).

## Words not understood
"ANA", "OpenSky's receivers", "A floor, not a total", "EVIDENCE" vs "FACT", "Humberto Delgado" (she knows LIS), "conditioned".

## What would make them act
She acts at 34 s: taxi, then the airline app. In 20 minutes: one tap from the jump row back to the OpenSky count and the bridges.

## Score
4/5 (towards 5). Flight card 640 px higher and the Metro row now names the mayor; the jump row is still just under the fold and the superseded green bridge row still sits in the airport block.

## Against guide-4
| guide-4 finding | Status |
|---|---|
| Jump row just below the fold (734, fold 664) | not fixed (734 to 776, unchanged) |
| Superseded green bridge row in the airport card | not fixed (3239 under 3111) |
| Metro airport row without "mayor's word, no Metro notice" | partly ("announced by the mayor" now in the row at 2942; "no Metro notice" still at 10701) |
| "↑ The seven questions" points down to the foot menu | not fixed (-> #gd-q at 10576; label also wrong, four questions) |
| ANA heading over press row; "by 09:20" no zone | not fixed (2173, 2201) |
| Standard "follow IPMA and ANEPC; call 112" | held |

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| minor | Jump row just below the fold | 734 px, fold 664; ~3 s | Shrink the banner or move "Not a warning service" (617) below the row |
| minor | Superseded green bridge row in the airport block | 3239 under 3111 (10 h older) | Only the newest per bridge in the card; older to "Deeper" |
| minor | "No Metro notice on metrolisboa.pt" not beside the Metro airport row | 2942 vs 10701 (7,760 px) | One line under the row |
| minor | "↑ The seven questions" points down and miscounts | 1949, 3648, 7134, 9853 -> 10576; lists 4 | "↑ The questions" -> the top jump row (734) |
| minor | ANA heading over press rows; "by 09:20" no zone | 2173, 2201 | "Lisbon airport (as reported)"; "09:20 (zone not stated)" |
| held | Standard "follow IPMA and ANEPC; call 112" | each card foot | Editor's call |
