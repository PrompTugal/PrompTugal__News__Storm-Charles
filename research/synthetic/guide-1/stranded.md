> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 11:52 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `stranded`: Lukas Brenner (invented), Web Summit attendee from Vienna, checked out, standing in a hotel lobby, phone 390 × 664, 30 % battery, 1 minute. Wants: what is open, getting around, where to go. Version seen: v0.1.983. Do Not Track and GPC on.

## Path

| # | URL / anchor | What | Seconds (cum.) | px |
|---|---|---|---|---|
| 1 | /guide/ | Headline "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind." Menu items 1-5 on the first screen | 0-5 | 170 headline; 572 "I'm stranded: what is open?" |
| 2 | tap #stranded | Lands at scrollY 3942; reads Pingo Doce closed, state museums closed, schools | 5-20 | 4030 heading; 4200 Pingo Doce |
| 3 | scroll | Courts, hospitals, "Parks, gardens, municipal culture (Lisbon city) running" with text about road tunnels; the "Not stated" list | 20-37 | 4898 Parks; 5265 "Ask the place itself" |
| 4 | scroll | "Shelter stated by an operator": Metro stations open for homeless people at night. Not for him | 37-42 | 5346, 4949 (text block) |
| 5 | tap #around | Metro row: "not announced" + "Thursday 12 Nov transport after the storm" FACT; CP trains; starts on ferries | 42-60 | 2452 heading; 2624 Metro |
| - | (time out) | Never reached "Carris (Lisbon city buses), Fertagus, ride-hailing and taxis: not stated" | - | 3713 |

## In 10 seconds
A red rain warning is in force until 18:00 UTC and there is a section made for him ("I'm stranded: what is open?", visible on the first screen at 572 px). The red badge and plain headline land at once.

## In 1 minute
Supermarkets (Pingo Doce) and state museums are closed today; schools shut; nothing he could go to is stated as open. Cafés, malls, hotels, taxis and Uber are "not stated", which he did understand as "unknown" thanks to the explicit sentence. He does not know whether the Metro runs today. He did not reach the line saying buses and ride-hailing are not stated.

## Three things looked for
| What | Result | Where | Seconds | Taps |
|---|---|---|---|---|
| Is anything open (café, mall, a place to wait)? | partly: only closures and "not stated" | #stranded, 4200-5265 px | 37 | 1 |
| Can I get across town (metro, buses, Uber)? | partly: Metro row is about Thursday; buses/ride-hailing "not stated" line at 3713 px not reached | #around, 2624 px | 60 (unresolved) | 2 |
| Where do I go? | not found: the only "shelter" is Metro stations for homeless people | #stranded, 5346 px | 42 | 1 |

## Misread
- Metro row (2624 px): badge `not announced` beside "Thursday 12 Nov transport after the storm" read as "Metro has not announced anything / may not run" for today. The row is about Thursday; today's Metro status is not shown at all.
- "Parks, gardens, municipal culture (Lisbon city) running" (4898 px): the badge says running but the text is about road tunnels. He read "parks are open, I can go to a garden" during a red rain warning. Label and text do not match.
- Shelter row "running" (Metro opens stations to shelter homeless people): briefly read as "Metro stations are open to wait in".
- FACT vs EVIDENCE: ignored; the small chips did not change what he believed. "read Wed 11 Nov 02:42 UTC" vs "now": he did not notice most rows were read ~9 hours ago.

## Wanted, not found
- Whether the Metro runs today (the single most useful line for him).
- Any place stated as open to sit and wait (cafés, malls, stations, the venue).
- Uber/Bolt/taxi status high up, not 1260 px below the section start.
- A one-line answer at the top of #stranded: "Nothing below is stated as open for the public."

## Reads like advice?
Mostly no; the site relays. Imperatives that are near the line, all pointing to the source rather than giving advice of its own:
- "go to the operator before you set off" (2547 px)
- "Ask the place itself." (5265 px)
- "Check with your airline." (1839 px)
- CP row quotes the press: "(12:00 to 15:00 forecast: heavy rain, strong wind)" (~2860 px). It is inside an EVIDENCE row, but on a phone it reads like the site's own forecast because no "IPMA" is attached to it.

## Words not understood
IPMA, ANEPC (no expansion in the first screen), "alert situation", "EVIDENCE" (as a chip), "Transtejo Soflusa", "Fertagus", "Rede Expressos".

## What would make them act
A line "Metro: running / not running today, per metrolisboa.pt, read HH:MM" at the top of #around, and any place stated open. With neither, he stays in the lobby and asks reception.

## Score
3/5: the right section is one tap away and "not stated means we do not know" is honest, but the two answers he needed (Metro today, anywhere open) are missing or mislabelled.

## Findings
| Class | What | Where + measure | Change |
|---|---|---|---|
| costly | Metro row shows Thursday's "not announced", nothing for today | #around, 2624 px; 2 taps, 60 s, unresolved | Show today's Metro status as its own row (or "Today: not stated"), Thursday separately |
| costly | "Parks, gardens, municipal culture" badge `running` paired with road-tunnel text | #stranded, 4898 px | Fix the row's matching; if no parks statement, move parks to "not stated" |
| costly | Buses, Fertagus, ride-hailing, taxis "not stated" line sits at the bottom of #around | 3713 px, 1089 px below the first Metro row; not reached in 60 s | Put the "not stated" line first in #around, as #stranded does |
| minor | No summary line at the top of #stranded; the reader must read six closures to learn nothing is open | 4030-5265 px, ~32 s | One line under the heading: "No authority or operator has stated a place open to the public today" (only if true of what was read) |
| minor | Homeless shelter rows under "Shelter stated by an operator" can be read as a place for travellers to wait | 4949-5346 px | Keep the wording "for homeless people" in the row title chip; label the block "Shelter for homeless people" |
| minor | Press-quoted "forecast" in CP row without the forecaster named | ~2860 px | Attribute: "(the press citing a forecast)" or drop the parenthesis |
| held | Times read are ~9 h old on most rows; reader did not notice | #stranded rows, "read 02:42 UTC" | Consider "read 9 h ago" beside the UTC time |
