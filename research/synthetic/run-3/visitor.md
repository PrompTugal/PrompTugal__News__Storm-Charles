> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:08 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 3: `visitor` (Ciarán Doyle, invented), phone 390 × 664, 2 minutes

Fresh visitor; the friend's link opens `/welcome/` (draft by incident.envoy@, 10:06 UTC, site v0.1.811). Playwright (Chromium, iPhone 13 profile), Do Not Track and GPC on, so not counted. Read 10:07–10:08 UTC. Screen = 664 px.

## Path

1. `/welcome/` (5,300 px tall). Screen 1: top bar, one row of section links (no data-room sub-bar, no breadcrumb), red-tinted "Not a warning service" strip (76 px), H1 "A newsroom run by AI agents, live on one storm" at 121 px, grey "Kept by … a draft for Dinis Cruz" line (198 px), a paragraph on Dinis Cruz and the agents (246–364 px).
2. Below it, a boxed note starting at **401 px**: "The latest decision: **Web Summit called off Day 2** (Wednesday 11 November) on the government's advice, and 'aims to proceed as planned' with Day 3 on Thursday (its own notice, published 10 November, 19:09 UTC). IPMA's red rain warning for Lisbon runs from 09:00 to 18:00 on Wednesday (read 09:03 UTC). What stands now". "Web Summit" link at 411 px. Fully inside screen 1, no scroll. He reaches it after skimming the H1 and the agents paragraph: **≈ 9 s**.
3. Buttons "See the storm, live" (573 px) and "How it is made" (625 px), both in screen 1. Scrolls once: four tiles (22 minutes, 311 press items, 31 agents, 13 hours) ~700–1050 px; "What you can do here" at 1,079 px. ~25 s.
4. Taps "See the storm, live" → `/` (9,553 px; same shape as runs 1–2). Red "IPMA warning in force in Lisbon now" at 170 px. The summit decision on `/` is still "THE DECISION FACT: Web Summit calls off Day 2…" at **1,593 px** (screen 3); "Web Summit" in the closed list at 1,053 px. ~30 s.
5. Looks for "are people OK": nothing on `/welcome/` (0–5,300 px) nor `/` screens 1–3. Coffee break over. ~20 s.

Total ≈ 90 s, 1 tap. The question he came with is answered at 411 px, 0 taps, about 9 s.

## In 10 seconds

"A site run by AI agents on the storm; and Web Summit cancelled today (Wednesday) but hopes to run Thursday; Lisbon has a red rain warning until 18:00." He gets it just inside 10 s, but only if he reads past the agents paragraph; the box is small grey text and looks like a footnote.

## In 1 minute

The summit is off today, Thursday is an aim not a promise, the rain warning runs to 18:00; the site is one person plus 31 agents and links every claim to its source. Still nothing about whether people are hurt.

## Three things he looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is Web Summit on today? | found | `/welcome/` box, 411 px (screen 1) | 0 |
| What is happening now? | found | same box: IPMA red rain for Lisbon 09:00–18:00 (read 09:03 UTC); `/` red box at 170 px | 0 (1 for detail) |
| Are people OK? | not found | nothing on `/welcome/` or `/` screens 1–3 | 1 |

## Lost or misled

- The H1 and first paragraph are still about the agents; the decision sits below them in a muted box, so a skimmer could stop at the H1 and think "wrong link".
- "A draft for Dinis Cruz: the words are not yet agreed" (198 px) makes him wonder whether the decision below is also unconfirmed.
- "What stands now" (529 px) opens `/`, where the same decision is again 1,593 px down.
- Tiles (22 minutes, 311 press items, 31 agents, 13 hours) still read like storm figures; no "About this site" heading.

## Words not understood

AI agents, "Kept by incident.envoy@…", Panel, Data room, Labs, Studio, IPMA, ANEPC, UTC, "primary source", hash, sha256, API, commit, tokens, Comunicado nº2 (on `/`).

## What would make him act

He would now forward `/welcome/` to colleagues ("summit off today, Thursday probably on, see the box"), more readily if the decision were the first line, in normal type, above the agents paragraph.

## Score

**4 / 5** (run 2: 2/5): the answer he came for is on the first screen of the link he was sent, with its source and time; it loses a point for sitting under the method text in footnote style, and for no word on people.

## Against run 2

1. `/welcome/` never states the summit decision: **fixed** (box at 401–411 px, screen 1, with Web Summit's time).
2. Newcomer link leads with the method; storm link below fold: **partly** (H1 still the method; "See the storm, live" now at 573 px, inside screen 1; IPMA level now in screen 1).
3. Decision on `/` at ~1,593 px: **not fixed** (1,593 px).
4. "Are people OK" unanswered: **not fixed**.
5. Data-room sub-bar and breadcrumb on `/welcome/`: **fixed** (single row of section links; no breadcrumb).
6. Tiles read as storm figures: **not fixed** (no "About this site" heading; tiles ~700–1,050 px).
7. "Web Summit" entity page not judged: **held** (our walker still errors on that page; not the site's fault proven).

## Findings

1. **costly**: decision is in screen 1 but below the agents paragraph, in a muted box. Where: `/welcome/` box at 401 px, after H1 (121 px) and 4-line paragraph; ≈ 9 s to reach. Change: move the box above the paragraph (just under the H1, ~200 px) in body-size type; ≈ 4 s.
2. **costly**: `/` still puts the decision at 1,593 px, and `/welcome/`'s "What stands now" leads there. Change: one-line summit status at the top of `/` screen 1 (as runs 1–2), or link "What stands now" to the decision row.
3. **costly**: "are people OK" still has no line. Where: `/welcome/`, `/` screens 1–3. Change: an ANEPC-sourced line, or "No injury or damage figures read from ANEPC yet" (no advice of our own).
4. **minor**: "A draft for Dinis Cruz: the words are not yet agreed" at 198 px undermines trust in the decision below. Change: drop it from the public page once the words are agreed, or move it to the footer.
5. **minor**: tiles ~700–1,050 px lack an "About this site" heading. Change: add it.
6. **held**: `/entities/organisation/websummit.html` not judged (walker script error).
