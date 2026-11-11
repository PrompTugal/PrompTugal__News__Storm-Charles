> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 11:53 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `flight`: Sofia Marchetti, consultant flying Lisbon to Milan this afternoon, in a taxi queue, phone 390 x 664, 45 seconds (then again in 20 minutes). Site version seen: v0.1.983. Walked with Do Not Track and GPC on.

## Path

| # | Where | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/ | Banner "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind" and the menu; "2 I have a flight" is on the first screen | 4 (4) | banner 170, menu item 446 |
| 2 | tap #flight | "Check with your airline. Only your airline can say whether your flight goes." Then ANA row "208 flights cancelled at Lisbon, 14 at Faro, by 09:20" EVIDENCE, read 10:34 UTC; TAP rebooking row, read 01:50 UTC | 15 (19) | H2 1794; rows 1951, 2070 |
| 3 | same screen | "The airport's own departures board: aeroportolisboa.pt (it shows a bot check to our readers...)" | 4 (23) | 2211 |
| 4 | scroll to 3 Getting around | Looking for the road/metro to the airport: Metro row is about Thursday ("not announced"); bridges "running" (read 02:42 UTC); tunnels "running"; no airport road, no metro red line to the airport | 15 (38) | H2 2451; Metro 2624; Bridges 3111; Tunnels 3230 |
| 5 | taps aeroportolisboa.pt | Leaves the site for the airport's board | 5 (43) | 2211 |
| 6 | second visit (+20 min): "Deeper: every source" then flights and transport (/transport/) | "38 airline departures seen since 06:25 UTC" FACT (OpenSky), updated 11:38 UTC | 20 | /transport/ 402 to 604 |

## In 10 seconds
A red rain warning is in force in Lisbon until 18:00 UTC and there is a section for her ("I have a flight"), visible without scrolling.

## In 1 minute
The airport is "limited": 208 flights cancelled at Lisbon by 09:20 (press report, read 10:34 UTC); the site cannot tell her about her flight and sends her to her airline and the airport's board. Bridges and city tunnels were reported running overnight. Nothing about the road or metro to the airport itself.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is my flight going? | partly (site says only the airline can say; gives cancellation count, not per flight) | /guide/#flight, 1839 to 2211 px | 19 | 1 |
| What does the airport say? | partly (ANA's status relayed via the press, EVIDENCE; the airport's own board is linked but not quoted) | #flight, 1951 and 2211 px | 23 | 1 |
| Can I get to the airport / is the road open? | not found (bridges and tunnels only; Metro row is about Thursday; no airport access row) | #around, 2624 to 3230 px | 38 | 1 + scroll |

## Misread
- "Lisbon airport (ANA) limited" read as the airport's own statement; it is a CNN Portugal report (EVIDENCE label is after the text, 1951 px, small blue pill).
- "by 09:20": no time zone, beside "read 10:34 UTC"; she assumed 09:20 local and did not know if it meant the whole day.
- Metro row (2624 px) "not announced" plus the word "Thursday" read at a glance as "Metro not running". It is about Thursday's plans, not today's service.
- "Bridges ... running" read as current; it was read at 02:42 UTC, nine hours earlier, before the red window. The "time read" is visible but she did not weigh it.
- TAP row: "rebook ... up to 17 Nov" read as TAP's latest word; read at 01:50 UTC.

## Wanted, not found
- A row for getting to the airport: Metro red line to Aeroporto, the 2a Circular / airport access road, taxis at the airport.
- On the flight section: the OpenSky count "38 airline departures seen since 06:25 UTC" (planes are leaving) is two taps away on /transport/, hidden under "Deeper".
- The airport's own words (not available: bot check, stated honestly).
- A "last updated" for the whole flight section.

## Reads like advice?
Borderline yes (instructions in the site's own voice, not attributed to an authority):
- "Check with your airline. Only your airline can say whether your flight goes." (1839 px)
- "go to the operator before you set off" (2547 px)
- "Ask the place itself." (5265 px, stranded section)
They are referrals, not forecasts; no forecast found.

## Words not understood
"ANA" (who is that?), "limited" as a status, "EVIDENCE" vs "FACT", "Deeper".

## What would make them act
A row saying the airport's own departures are running/limited with a time, plus a line on the airport access road and the metro to the airport. With that she would get in the taxi and check the airline app on the way; as it is she gets in anyway and checks the airline app.

## Score
3/5. The flight section is one tap and honest, but the answer she most needed second (can I reach the airport) is absent and the freshest flight signal is buried.

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | No airport-access row (road, metro red line, taxis at LIS) | #around, 2451 to 3500 px; not found at 38 s | Add "To the airport" as stated by Metro/ANA/Infraestruturas de Portugal, or "not stated in what we have read" |
| costly | OpenSky departures count (FACT, 11:38 UTC) not on the guide's flight card | /transport/ 604 px; 2 taps, about 20 s | Put "N airline departures seen since HH:MM UTC (OpenSky), updated HH:MM" in #flight |
| minor | ANA row looks like ANA's own word | #flight 1951 px; EVIDENCE pill after 2 lines | Lead with the source: "CNN Portugal reports ANA: ..." or put the label first |
| minor | "by 09:20" without zone | #flight 1951 px | "by 09:20 UTC" (or "Lisbon time") |
| minor | Metro row in Getting around is about Thursday, reads as "Metro not running" | #around 2624 px | Show today's Metro status first; Thursday as its own line |
| minor | Old reads (bridges 02:42, TAP 01:50) look current | #flight 2070, #around 3111 | Flag reads older than ~6 h ("read 9 h ago") |
| held | Imperatives in the site's voice ("Check with your airline", "go to the operator before you set off") | 1839, 2547 px | Editor's call: attribute or keep as referral |
