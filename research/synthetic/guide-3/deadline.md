> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:05 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `deadline`: wire reporter in Madrid, 300-word Lisbon update, 10 minutes, 390 px phone. Entry: /guide/media/ (v0.1.1030). Page height 8,619 px closed (13 screens; guide-2: 6,872), 12,718 px with "20 more today" open. DNT + GPC on. The page is live: between two loads 3 min apart the "Changed today" fold went from "13 more" to "20 more" with new top rows.

## Path
1. /guide/media/ 0 px: H1 "For journalists: Storm Charles, sourced" @227; "In force now for Lisbon: RED rain warning, until 18:00 UTC; also orange wind, orange waves (sea)" FACT, "IPMA's warnings feed, read Wed 11 Nov 11:26 UTC" @563. 5 s, 0 taps.
2. "Changed today (published 2026-11-11, UTC; newest first)" @747: 4 rows (on second load: São Bento meeting 11:07, Vasco da Gama 100 km/h, Carris, Fertagus). 20 s.
3. Tap "20 more today" @1740: 20 rows, ~4,100 px; IPMA's red-to-orange wind change (07:16) is row ~15 of 24, listed twice. 60 s, 1 tap.
4. "7 · I'm a journalist" @1819: headline quote Day 3 "aims to proceed as planned" FACT @1895; lead's paragraph "A lower level, not an all-clear" @2075, "updated Wed 11 Nov 08:44 UTC" @2448. 25 s.
5. "1 · What is happening now" @2799: four IPMA levels in IPMA's words; alert situation FACT. 20 s.
6. "5 · Web Summit" @3819: Day 3 chip "an aim, not a promise" @3955; read 04:33 "(8 h ago)"; "Not yet announced" @4522. 20 s.
7. Skip Madeira (5117-6904); "Missing something? 'Contact us' at the foot of the page" @7886; footer "Contact us" @8241. 15 s of scrolling.
8. Tap -> /app/desk/: "Press or media" option, sealed form, "read ... about once an hour"; reply "sent by a person". 30 s, 1 tap.
Total ~3 min 15 s, 2 taps.

## In 10 seconds
Red rain in Lisbon until 18:00 UTC, orange wind and waves; IPMA, read 11:26 UTC; not a warning service. H1 now on the first screen.

## In 1 minute
A dated "Changed today" list (bridges, Carris, Fertagus, flights, Madeira counts); Day 2 off, Day 3 "aims to proceed" (organiser, 10 Nov 19:09).

## Three things looked for (plus the brief's checks)
- What stands now, with source and time: **found**. 0-664 px, 5 s, 0 taps.
- Changed since this morning: **partly**. "Changed today" @747, 20 s, 0 taps; but the main change (IPMA wind red to orange, 07:16) only inside the fold, row ~15, 85 s, 1 tap. Duplicates: IPMA lowering x2, flight counts x2 (208/222), sea bars x2, Vasco da Gama x2. No "last checked" time on the list (latest row read 11:56).
- Press contact: **found, slow**. Footer @8241, 1 tap, ~45 s from top; a form, read about hourly, no phone or email. Useless for a 10-minute deadline, fine for a correction.
- Day 3 wording: **fixed**. "an aim, not a promise" @3955 and the quote @1895. Source read 04:33, 8 h ago; nothing says "no newer word as of HH:MM".
- "reported by <outlet>": **works**: "reported by cnnportugal.iol.pt, published 09:54 UTC, read 10:34 UTC". He would write "CNN Portugal reported"; the domain is fine. One row mixes "Who: observed by CNN Portugal" with "reported by cnnportugal.iol.pt".

## Misread
- Status chips on counts: "limited" on "208 flights cancelled", "announced" on occurrence counts; he read "limited" as "flights limited" (a status), not a count.
- "Changed today" top rows are Madeira and flight counts on first load; he took the list as Lisbon-only until "Regional president's briefing at SRPC".
- "published 2026-11-11" in the heading: he first read it as the list's publish time, not the sources'.
- Lead's box "updated 08:44" under a header "1 min ago": still unclear whether it is current.
- FACT vs EVIDENCE: no key on the page; guessed (EVIDENCE = press report). "not stated" vs "closed": clear (@4522 list, Madeira "not stated in what we have read").

## Wanted, not found
- The IPMA level changes pinned at the top of "Changed today" (or a separate "Warnings changed today" line).
- A phone or email for press on deadline; a promised reply time.
- A ready one-line citation on the page (the example still lives on /help/cite.html).

## Reads like advice?
No. "Lusoponte advises against motorcycles and high-sided vehicles" @3328 and "sea worsening until 12:00 Thursday" (Who: Autoridade Marítima Nacional) are attributed. Disclaimer only "Nothing here is a forecast or advice of ours".

## Words not understood
"Panel"; "Deeper"; "the record"; "CAP Update" (IPMA row); "SRPC"; "limited" as a chip on counts.

## What would make them act
Files warnings, wind drop, Day 2 off/Day 3 aim, bridges and Carris, citing IPMA, websummit.com, Carris and CNN Portugal. Would not use the desk form to check Day 3 before 18:00.

## Score
4 / 5: H1, Day 3 and "Changed today" are fixed and he files in ~3 min; but the key IPMA change sits in a fold, duplicated, and the press contact is an hourly form.

## Against guide-2
- Promised contact missing: fixed (footer "Contact us" @8241 -> /app/desk/, "Press or media" option); slow for press.
- Day 3 chip "running": fixed ("an aim, not a promise" @3955).
- "Since this morning" one paragraph stamped 08:44: partly (list @747; IPMA change buried row ~15; paragraph still 08:44).
- H1 and intro at the bottom: partly (H1 @227 fixed; intro and "how to cite" sentence still @~7785).
- No FACT/EVIDENCE key: not fixed.
- "1 min ago" reads as storm news: not fixed (@40).
- CP row forecast on /guide/: not checked (outside this walk).

## Findings
- costly | IPMA wind red->orange change buried and duplicated | "Changed today" fold row ~15 of 24 (~4,000 px down when open); also 3 other duplicate pairs | Pin warning-level changes first; merge rows with the same event.
- costly | Page grew to 8,619 px (13 screens, +1,747) | Madeira 5117-6904, contact @8241; ~40 s of scrolling lost | Move Madeira below a link, or put the contact line in #7.
- minor | Press contact is an hourly form | /app/desk/ "about once an hour" | Say so beside "Press or media"; give an expected reply time.
- minor | Status chips on counts ("limited", "announced") | @887, @1346 and fold | No chip on counts, or "count".
- minor | No "last checked" on "Changed today" or Day 3 | @747, @3955 "(8 h ago)" | "Checked HH:MM UTC; no newer word".
- minor | No FACT/EVIDENCE key; intro at bottom @~7785; "1 min ago" @40 | whole page | One line under the top box; label "site updated".
