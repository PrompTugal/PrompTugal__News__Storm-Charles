> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:08 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 3: `journalist` (Mara Lindqvist, invented)

Laptop 1366 × 800 (fold 800 px), Do Not Track and GPC on: no outside request from `/welcome/` or `/` (`/agents/` still calls `api.github.com`). Arrives fresh from the same email, link to `/welcome/`. About 4 min over 8 pages, v0.1.811, 10:06 to 10:08 UTC. Figures quoted are the site's, not ours.

## Path

1. `/welcome/` (3,023 px). H1 at 132 px (was 211): "A newsroom run by AI agents, live on one storm". No "Data room" breadcrumb; nav highlights **About**. Lede (~300 px) names Dinis Cruz and his agents and says "Not a warning service". New "latest decision" box at ~500 px: Day 2 called off, Day 3 "aims to proceed", Web Summit's notice 19:09 UTC, IPMA red rain to 18:00 (read 09:03 UTC). Buttons 609 px; four figures at 700 px, the agent count now "31 agents ... by the accounts at 09:41 UTC". Sections 909 / 1,619 / 2,258 / 2,564 px. 50 s.
2. `/research/media/ranking.html` ("Who was first", welcome 1,270 px). "Web Summit calls off Day 2" at 3,566 px. 30 s.
3. Back; "Tell us what is wrong" (2,564 px): Contribute and Outreach ("Nobody has been contacted yet"). No press line. `/contribute.html`: 19 task cards from 199 px, H1 still at 1,015 px, "For journalists" 3,977 px. 35 s.
4. `/help/cite.html` via nav Help (not linked from welcome). "Cite the source first" 348 px, Licences 1,009 px. 20 s.
5. `/agents/` ("the team", welcome 780 px). Opens on a plain paragraph "What this team does. About two dozen AI agents ..." and "The night as it happened" 483 px; "What Dinis can unblock: 40 things" now at 4,430 px (was 295). 25 s.
6. `/stories/how-day-2-was-called-off/`. Header still "Written 11 Nov, 02:33 UTC ... on the data read at 11 Nov, 07:38 UTC". 30 s.
7. `/` (logo, or "See the storm, live" at 609 px). Above the fold: RED IPMA rain warning in force, orange wind (gusts to 120 km/h, IPMA), the hour-by-hour grid at 468 px, closures from 739 px. The page's H1 is at 5,340 px; nothing above the fold says who makes it, apart from "New here?" (12 px). 30 s.

## In 10 seconds

The thing from the email, plus the news peg in the same screen: AI agents directed by one named person keep a sourced record; Web Summit Day 2 is off, IPMA's red rain warning runs to 18:00. Not a warning service.

## In 1 minute

Lead figures (22-minute IPMA-to-row lag, 311 press items from 18 outlets, "who was first" ranking) and a clear "What it is not". What PrompTugal is, still not said; who answers questions, still not said.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is there a story / what is this | found | `/welcome/` H1 132 px, decision box ~500 px; hook `/research/media/ranking.html` | 0 (+1) |
| Can I cite it, and how | found | `/help/cite.html` 348 px; still not linked from `/welcome/` | 2 |
| Who do I call for comment | not found | welcome 2,564 px → Contribute (GitHub issue) / Outreach "Nobody has been contacted yet" | 2, gave up |

## Lost or misled

- "Tell us what is wrong" is still the only way in, and it is corrections only.
- "A draft for Dinis Cruz: the words are not yet agreed" still under the H1 (264 px).
- "31 agents" (welcome, dated) against "About two dozen AI agents" (Team): the number now differs in kind, not just by one.
- The front page, reached second, is a weather board with no line on who runs it; she would not have understood it had she arrived there first.

## Words not understood

"1 editor" gone; still: "incident.envoy@web-summit.dinis", Labs, Studio, Panel, Repo, METAR, CAP, "Comunicado nº2", sha256 (knows it, not why).

## What would make her act

Write: yes; the decision box gives the peg on page one. Cite: yes, authorities first. Call: still blocked; she would write "the project lists no press contact".

## Score

4 / 5. Faster to the story than run 2 (the peg is now above the fold, the team page reads for outsiders), but a reporter on deadline still has nobody to ask.

## Against run 2

| Run-2 finding | Status |
|---|---|
| 1 blocking: no press contact | not fixed |
| 2 costly: "the team" opens on Dinis's 40-item list | fixed (list at 4,430 px; outsider paragraph first) |
| 3 costly: "draft, words not agreed" under H1 | not fixed |
| 4 costly: welcome does not link "How to cite us" | not fixed |
| 5 minor: welcome under "Data room" | fixed (About highlighted, no breadcrumb) |
| 6 minor: 31 vs 32 agents | partly (welcome figure dated; Team now says "about two dozen") |
| 7 minor: contribute H1 at 1,015 px under 19 cards | not fixed |
| 8 minor: story header times read reversed | not fixed |
| 9 minor: "About" opens BRIEF.html | fixed (About → `/welcome/`) |
| 10 held: `/agents/` calls api.github.com | not fixed (held) |

## Findings

1. **blocking**: no press contact. `/welcome/` "Tell us what is wrong" 2,564 px; Outreach "Nobody has been contacted yet"; 2 clicks, not found. Change: one line within 800 px on `/welcome/`: a role-based press address or form answered by a person, and how fast.
2. **costly**: "A draft ... the words are not yet agreed" at 264 px. Change: agree the words or move the note to the footer.
3. **costly**: no "Cite this" on `/welcome/`. Change: add `/help/cite.html` beside "Take the data" (~1,504 px); 2 clicks become 1.
4. **minor**: front page `/` says nothing about who makes it above the fold; H1 at 5,340 px. Change: one line under the date ("kept by AI agents directed by Dinis Cruz; how it is made") linking `/welcome/`.
5. **minor**: "31 agents" (welcome) vs "About two dozen" (`/agents/` 0 px). Change: one count, from one file, on both.
6. **minor**: `/contribute.html` H1 at 1,015 px under 19 cards. Change: H1 and "Three ways in" (2,623 px) first.
7. **minor**: story header "Written 02:33 ... data read 07:38". Change: say "updated" or reorder.
8. **held**: `/agents/` requests `api.github.com`; not the Weather face.
