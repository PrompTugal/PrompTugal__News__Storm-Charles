> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:00 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 2: `visitor` (Ciarán Doyle, invented), phone 390 × 664, 2 minutes

Fresh visitor; the friend's link now opens `/welcome/` (a first draft, marked "the words are not yet agreed"). Playwright (Chromium, mobile profile), Do Not Track and GPC on, so not counted. Read at about 09:59–10:00 UTC. Screen = 664 px.

## Path

1. `/welcome/` (5,224 px tall). Screen 1: top bar, a second bar of 11 data-room links (Front page … Library), breadcrumb "Storm Charles › Data room", H1 "A newsroom run by AI agents, live on one storm" at 220 px, then "Storm Charles reached Lisbon in the week of Web Summit" (first "Web Summit", 446 px, as a link to an entity page). He reads the H1 and the paragraph. ~25 s.
2. `/welcome/` screen 2 (664–1328 px): buttons "See the storm, live" (677 px) and "How it is made", then four number tiles: "22 minutes", "311 press items", "31 agents, 1 editor", "first commit". Nothing about the summit, the day, or people. ~20 s.
3. (Tried) the "Web Summit" link at 446 px: our walker could not read that page (script error), so it is not judged here (held).
4. Taps "See the storm, live" (677 px) → `/` (9,553 px; unchanged in shape from run 1). Screen 1: red box "IPMA warning in force in Lisbon now · Rain until 18:00", orange wind to 21:00. ~15 s.
5. Scrolls to "Closed or suspended today" (Web Summit link at 1053 px, "read Tue 20:59"), then on to "THE DECISION FACT: Web Summit calls off Day 2 (Wednesday) on the government's advice; Day 3 (Thursday) 'aims to proceed as planned'" at about 1593 px (between "NEXT, AS IPMA WARNS" at 1402 px and its "In the data room" link at 1709 px). ~25 s.
6. Looks for anything on whether people are OK: nothing on `/welcome/` (no word on injuries, attendees or damage) nor in the first three screens of `/`. Coffee break over. ~15 s.

Total ≈ 100 s, 1 tap. **First mention of Web Summit: 446 px on `/welcome/`** (screen 1, inside a sentence, as context). **The summit's decision today: not on `/welcome/` at all** (0 mentions of Day 2, Wednesday's cancellation or Thursday); first reached on `/` at ~1593 px after 1 tap (≈ 677 px + 1 tap + 1593 px of scrolling).

## In 10 seconds

"It's a site about AI agents writing a newsroom on the storm." He learns the storm hit Lisbon "in the week of Web Summit" and that the site is "not a warning service". He does not learn whether the summit is on.

## In 1 minute

The site is a project by one person and 31 agents, counting press items and minutes. Only after tapping through to the weather page and scrolling 2.4 screens does he learn Day 2 is off and Day 3 "aims to proceed".

## Three things he looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is Web Summit on today? | found (late) | not on `/welcome/`; `/` "THE DECISION FACT" at ~1593 px | 1 + 2.4 screens |
| What is happening now? | partly | `/welcome/` says only that the storm reached Lisbon; `/` screen 1 red rain / orange wind | 1 |
| Are people OK? | not found | nothing on `/welcome/` (0–5,224 px) or `/` screens 1–3 | 1 |

## Lost or misled

- The link a friend sent "about the storm" opens a page about how the site is made; he thinks he got the wrong link.
- Breadcrumb "Storm Charles › Data room" and the second bar of 11 links (Graph, Ontology, Lead times, Query…) tell him he is somewhere technical.
- The four tiles in screen 2 (22 minutes, 311 press items, 31 agents, first commit) look like news figures but are about the site, not the storm.
- Unchanged from run 1 on `/`: "read Tue 20:59" beside Web Summit reads as yesterday's news.

## Words not understood

AI agents (as a "team"), commit, Data room, Ontology, Lead times, Query, Entities, sha256, API, hash, "primary source", "fact / evidence / hypothesis", tokens, IPMA, ANEPC, UTC, Comunicado nº2, "in force", Panel.

## What would make him act

Same as run 1: a first screen saying "Web Summit: Wednesday (Day 2) called off · Thursday (Day 3) aims to go ahead" with Web Summit's time. He would not forward `/welcome/` to colleagues: "it's about the robots, not the summit".

## Score

**2 / 5** (run 1: 3/5): the newcomers' page answers "what is this site" well, but not the question he came with, and costs him one extra tap before the same 2.4 screens of scrolling as run 1.

## Against run 1

1. Summit decision below the fold on `/`: **not fixed** (still ~1593 px); and now one tap further away from the shared link.
2. "Are people OK" has no answer or "nothing reported" line: **not fixed**.
3. "Web Summit" link jumps 7,300 px down `/`: **not fixed** (still `#d-websummit-wednesday` at 1053 px).
4. "read Tue 20:59" reads as stale: **not fixed**.
5. Story page opens with file links: **not re-walked** this run.
6. Jargon unglossed (IPMA, ANEPC, UTC): **not fixed**; `/welcome/` adds "AI agents", "commit", "sha256", "API".
7. Ten-item navigation: **not fixed**; `/welcome/` adds a second row of 11 data-room links (held).

## Findings

1. **blocking** (for this persona): `/welcome/` never states the summit's decision. Where: `/welcome/` 0–5,224 px, "Web Summit" only at 446 px as context; decision first at `/` ~1593 px after 1 tap. Change: one line under the H1 on `/welcome/`, from the headline source: "Today: Web Summit Day 2 (Wed) called off on the government's advice; Day 3 (Thu) 'aims to proceed' (Web Summit, 10 Nov 19:09 UTC)", linking to the decision row.
2. **costly**: the shared/newcomer link leads with the method, not the storm. Where: `/welcome/` H1 at 220 px "A newsroom run by AI agents…"; first storm link "See the storm, live" at 677 px (just below screen 1). Change: put "See the storm, live" (and the current IPMA level for Lisbon, from IPMA) inside screen 1, above the paragraph about the team; keep the method below.
3. **costly**: the decision on `/` is still at ~1593 px (screen 3). Change as run 1, finding 1: a one-line summit status at the top of `/` screen 1.
4. **costly**: "Are people OK" still unanswered. Where: `/welcome/`, `/` screens 1–3. Change: a labelled line from ANEPC if it publishes occurrence figures; otherwise "No injury or damage figures read from ANEPC yet" (no advice of our own).
5. **minor**: `/welcome/` sits under "Data room" with an 11-link sub-bar and breadcrumb. Where: 77 px and 143 px. Change: show `/welcome/` without the data-room sub-bar; breadcrumb "Storm Charles › New here?".
6. **minor**: screen-2 tiles (22 minutes, 311 press items, 31 agents) read as storm figures to a lay reader. Where: `/welcome/` ~700–1100 px. Change: a small heading "About this site" above the tiles.
7. **held**: the "Web Summit" entity page linked at 446 px could not be read by our walker (script error), so it is not judged.
