> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:11 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `flight`: Sofia Marchetti, Lisbon to Milan this afternoon, in a taxi queue, phone 390 x 664, 45 seconds (then again in 20 minutes). Entry: /guide/lisbon/. Version seen: v0.1.1043 (pushed 12:09 UTC). Do Not Track and GPC on. Page height 11,412 px (17.2 screens; guide-3: 21,488). All "Deeper" blocks closed by default.

## Path

| # | Where | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/lisbon/ first screen | "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)." FACT, IPMA feed read 11:26 UTC. Jump row not on screen | 4 (4) | banner 416 |
| 2 | small scroll | Jump row: "What is happening now / I have a flight / Getting around / I'm stranded" | 3 (7) | 734 to 830 (70 px below the fold) |
| 3 | tap "I have a flight" | Lands at 2567: card head "2 I have a flight" | 2 (9) | H2 2654 |
| 4 | card | "Your airline decides whether your flight goes: its site or app has the latest." ANA heading; 208 cancelled "by 09:20" (CNN, EVIDENCE); ANA "conditioned ... cancellations expected" (press, Tue 18:04, 17 h ago) | 10 (19) | 2701; 2814; 2841; 2943 |
| 5 | scroll | TAP rebooking up to 17 Nov (EVIDENCE, 10 h ago); "42 airline departures seen by OpenSky's receivers since 06:25 UTC" FACT read 12:06; "A floor, not a total" | 8 (27) | 3171; ~3420; 3447 |
| 6 | Getting to the airport | Metro "to run on Wednesday (announced by the mayor)" EVIDENCE, 17 h ago; bridges: Vasco da Gama 100 km/h (11:35) then green "running ... lifted by 22:29 Tuesday" (9 h ago); taxis/buses "not stated"; airport board link | 12 (39) | 3514; 3582; 3751, 3880; 4021; 4080 |

## In 10 seconds
Red rain until 18:00 UTC, and a row of four questions just under the fold; one tap puts her on "I have a flight" at 9 s.

## In 1 minute (done in 39 s, 1 tap)
The airline decides; planes are leaving (42 departures since 06:25 UTC, FACT, 12:06); TAP lets her rebook to 17 Nov (press); Metro said to run (mayor, yesterday); Vasco da Gama at 100 km/h; taxis "not stated". She gets in the taxi and opens the airline app.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is my flight going? | found (airline line + OpenSky count, FACT 12:06) | 2701, 3447 px | 9 to the card, 27 to the count | 1 |
| What does the airport say? | partly (ANA only via press, Tue 18:04; own board linked, bot check stated) | 2943, 4080 px | 19 | 1 |
| Can I get to the airport? | found ("Getting to the airport": Metro, bridges, taxis "not stated") | 3514 to 4080 px | 39 | 1 |

## Misread
- Bridges: the green "running: Restrictions lifted on both bridges by 22:29 Tuesday" (3880, 9 h ago) sits right under the newer "limited 100 km/h" (3751); a green chip under a grey one still reads for a second as "now open".
- "Metro to run on Wednesday" (3582) read as the Metro's word; the caveat "No Metro notice on metrolisboa.pt ... 'Metro runs' is the mayor's word" is 6,850 px away (10433, closed "Deeper").
- "Lisbon airport (ANA)" heading over a CNN row (2814/2841): read as ANA's own count. "by 09:20" still has no zone.
- "↑ The seven questions" (2590, 4288, 7236, 9841) points to #gd-q at 9924 px: the arrow says up, the menu is down. She now has the top jump row, so she ignores it.
- "not stated" for taxis read correctly as "we don't know", not "closed".

## Wanted, not found
- ANA's own word dated today (latest is Tue 18:04 UTC, press).
- The jump row on the very first screen (it starts 70 px below the fold).

## Reads like advice?
No. "Your airline decides whether your flight goes: its site or app has the latest." (2701) and "Each operator decides its own service: its site has the latest." are statements of who decides. Only the standard "For warnings and what to do, follow IPMA and ANEPC; in an emergency call 112." remains (held).

## Words not understood
"ANA", "OpenSky's receivers", "A floor, not a total", "EVIDENCE" vs "FACT", "Humberto Delgado" (she knows it as LIS), "conditioned".

## What would make them act
She acts at 39 s: taxi, then the airline app. In 20 minutes she would come back to the jump row (one tap) for the OpenSky count and the bridges.

## Score
4/5 (towards 5). The jump row cuts the flight card from 30 s and 6.3 screens to 9 s and 1 tap; the airport block still shows a superseded green bridge row and the Metro row without its caveat.

## Against guide-3
| guide-3 finding | Status |
|---|---|
| Question menu only at the foot; flight card 6.3 screens down | fixed (jump row at 734; flight card in 9 s, 1 tap; page 21,488 to 11,412 px) |
| "↑ The seven questions" points down | not fixed (still -> #gd-q at 9924) |
| Superseded bridge "running" row beside the current limit | partly (newest now first, at 3751; old green row still at 3880) |
| Metro airport row lacks the caveat | not fixed (caveat at 10433, in "Deeper") |
| "by 09:20" no zone; Funchal "since ? UTC"; Madeira rows in Lisbon's "Changed today" | not fixed ("by 09:20" at 2841; Funchal row in "Changed today" at 3301 when opened); Funchal "since ?" not checked (closed "Deeper") |
| Standard "follow IPMA and ANEPC; call 112" | held |

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| minor | Jump row just below the fold | 734 px, fold 664; ~3 s to find | Lift it above the "Not a warning service" line or shrink the banner so it shows on screen 1 |
| minor | Superseded green bridge row in the airport card | 3880 under 3751 | Keep only the newest per bridge in the card; older to "Deeper" |
| minor | Metro airport row without "mayor's word, no Metro notice" | 3582 vs 10433 (6,850 px) | Carry that line into the card under the Metro row |
| minor | "↑ The seven questions" points down to the foot menu | 2590, 4288, 7236, 9841 -> 9924 | Point it to the top jump row (734) |
| minor | ANA heading over press row; "by 09:20" no zone | 2814, 2841 | "Lisbon airport (as reported)"; "09:20 UTC" or "time zone not stated" |
| held | Standard "follow IPMA and ANEPC; call 112" | 2537 and each card foot | Editor's call |
