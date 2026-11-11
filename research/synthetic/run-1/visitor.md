> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 09:54 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 1: `visitor` (Ciarán Doyle, invented), phone 390 × 664, 2 minutes

Walked with Playwright (Chromium, iPhone 13 profile), Do Not Track and Global Privacy Control on, so not counted. Site version seen: v0.1.780 (home), v0.1.781 (stories). Screen = 664 px; screen 1 = 0–664, screen 2 = 664–1328, screen 3 = 1328–1992.

## Path

1. `/` (home, "Storm Charles: the weather, now"; page 9,553 px tall). First screen: big red box "RED · IPMA warning in force in Lisbon now · Rain until 18:00", orange wind to 21:00 (gusts up to 120 km/h, per IPMA), then four number tiles. Sees "Web Summit" only in the small red eyebrow "Storm Charles · Lisbon · Web Summit" at 111 px. ~15 s.
2. `/` scrolled to screen 2 (664–1328 px). "In force this hour", then a dense paragraph "Closed or suspended today", in which "Web Summit" is one blue link among eight bodies (1053 px), each followed by "read Tue 20:59" style times. Realises the summit is in the "closed" list, but is not sure if that means the whole summit. ~20 s.
3. Taps the "Web Summit" link (anchor `#d-websummit-wednesday`). Page jumps to 8364 px: the card "Web Summit · fact · Day 2 (Wednesday 11 Nov) will not take place…" (text at 8648 px). Answer confirmed, but he is now deep in a list he does not recognise, with no way back up except scrolling. ~15 s.
4. Had he scrolled instead of tapping: "THE DECISION FACT · Web Summit calls off Day 2 (Wednesday) on the government's advice; Day 3 (Thursday) 'aims to proceed as planned'" sits at 1593 px (screen 3). ~5 s (counted in step 3's budget).
5. Taps "Stories" in the top bar (`/stories/index.html`, 4,349 px). First story card "How Web Summit's Day 2 was called off" at 597 px, just inside screen 1. Reads its teaser. ~20 s.
6. Opens the story (`/stories/how-day-2-was-called-off/index.html`, 7,634 px). Screen 1 is source links (story.json, resolved.json, cap.json, api.ipma.pt); the narrative heading "Tuesday morning…" is at 1231 px. Gives up on it. ~20 s.
7. Looks for anything on whether people are OK (injuries, attendees, floods in the city). Finds nothing in the first screens of any page; the only mention of people on home is a homeless contingency plan at 11,093 px. Coffee break over. ~15 s.

Total ≈ 110 s.

## In 10 seconds

"There's a red weather warning in Lisbon right now, rain till 6, wind till 9." He gets the weather severity at once from the big red box. He does **not** learn whether Web Summit is on: the word appears at 111 px only as a label.

## In 1 minute

Web Summit's Wednesday (Day 2) is off, on the government's advice, and Thursday "aims to proceed". Schools, tunnels, coaches and some trains are closed or cut; metro and buses said they would run. He has this only after reaching 1593 px or tapping into the closed list.

## Three things he looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is Web Summit on today? | found (late) | `/` at 1593 px (screen 3, "THE DECISION FACT"), or 1 tap on "Web Summit" link at 1053 px → card at 8648 px | 0 (scroll 2.4 screens) or 1 |
| What is happening now? | found | `/` screen 1: red rain warning, orange wind; screen 2: closures | 0 |
| Are people OK? | not found | nothing on `/`, `/stories/`, or the Day 2 story about injuries, attendees or damage; home mentions a homeless plan at 11,093 px | 2 (Stories, story) |

## Lost or misled

- The "Web Summit" link at 1053 px throws him 7,300 px down the page into a card list with "decided Tue 19:09 · read Tue 20:59 · in the data room (websummit-wednesday)" — answer is there, orientation is gone.
- "Closed or suspended today" with "read Tue 20:59" next to Web Summit made him wonder whether the information was from yesterday and still true.
- The story he opened starts with a screen of file links (JSON, CAP, API) before any sentence about what happened.
- The top bar has ten items (Weather, Stories, Data room, Sources, Research, Labs, Studio, Team, Help, About) plus "v0.1.780", "Repo", "Panel": he does not know which one is "the news".

## Words he did not understand

IPMA, ANEPC, Comunicado nº2, "in force", UTC, METAR, "fact / evidence / hypothesis" as labels, "data room", "read Tue 20:59", Capitania, "Repo", "Panel", "Labs", "Studio", v0.1.780, "IPMA's automatic forecast", "warning area".

## What would make him act

He would share a link that says, on its first screen, "Web Summit: Wednesday cancelled, Thursday aims to go ahead" with a time. He would come back tomorrow morning only if he knew the site would say first thing whether Day 3 is on. He would not share the current home page with colleagues: "it's a weather dashboard".

## Score

**3 / 5**: the weather is unmistakable in five seconds, but the one answer he came for (is the summit on) waits on screen 3, and "are people OK" is not answered anywhere he looked.

## Findings

1. **costly**: The summit's decision is below the fold on the page that carries "Web Summit" in its title band. Where: `/`, eyebrow "Web Summit" at 111 px, decision text at 1593 px (screen 3 of 664 px). Change: one line at the top of screen 1, under the date: "Web Summit: Day 2 (Wed) called off · Day 3 (Thu) aims to proceed — Web Summit, 10 Nov 19:09 UTC", linking to the decision.
2. **costly**: "Are people OK" has no answer and no "nothing reported" line. Where: `/` (0–9,553 px), `/stories/`, Day 2 story: no injuries/casualties/occurrences found. Change: if ANEPC or another primary source publishes occurrence counts, a labelled line near the closures; if not, say "No figures on injuries or damage read from ANEPC yet" so the absence is visible (no advice of our own).
3. **costly**: The "Web Summit" link in "Closed or suspended today" jumps 7,311 px (1053 → 8364 px) into the card list with no way back. Where: `/` link `#d-websummit-wednesday`. Change: show the one-line decision inline beside the name (or expand in place), and add a "back to top" on cards.
4. **minor**: "read Tue 20:59" beside today's closures reads as stale to a lay reader. Where: `/` 983–1293 px. Change: lead with "announced Tue 19:09" and move "read" to the detail card.
5. **minor**: Story page opens with file and API links before the narrative. Where: `/stories/how-day-2-was-called-off/`, first narrative heading at 1231 px; JSON/CAP links at 522–894 px. Change: move the source block below the first section for phone widths.
6. **minor**: Jargon in screen 1–2 with no gloss (IPMA, ANEPC, Comunicado nº2, UTC, "in force"). Where: `/` 76–351 px. Change: first use "IPMA (Portugal's weather service)", "ANEPC (civil protection)"; "UTC = Lisbon time" already exists in the hour table at ~2100 px — put it beside the date at 111 px.
7. **held**: Ten-item navigation plus Repo/Panel/version on a phone. Where: `/` 6–34 px. Seen, not judged: serves the other personas; a lay reader would want only Weather and Stories.
