> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:02 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 2: `journalist` (Mara Lindqvist, invented)

Laptop 1366 × 800 (fold 800 px), Do Not Track and GPC on (no request left the site from `/welcome/`; `/agents/` still calls `api.github.com`). Same email, link now to `/welcome/`. A fresh visitor: she has not seen run 1. Used about 4 min 20 s over 8 pages (v0.1.799 to v0.1.800, 09:59 to 10:01 UTC). Figures quoted are the site's, not ours.

## Path

1. `/welcome/` (2,931 px). H1 at 211 px "A newsroom run by AI agents, live on one storm"; lede names Dinis Cruz and "a team of AI agents he directs" (~400 px); two buttons at 591 px; four figures at 700 px ("22 minutes" IPMA-to-row, "311 press items from 18 outlets", "31 agents, 1 editor", first commit 10 Nov 21:14 UTC). Scrolled: "What you can do here" 873 px, "Tell us what is wrong" 2,471 px. 50 s.
2. `/research/media/ranking.html` ("Who was first", welcome 1,233 px). The hook: who was first on each of twelve facts, with the six outlets that refused a bot named (329 px), "a ranking of a sample, not a verdict" in the first screen. 11,465 px long; read the Day 2 entry only (3,566 px). 35 s.
3. Back, `/contribute.html` ("Contribute", welcome ~2,560 px), looking for a person to call. Top of page is a 19-card task grid (199 px); the H1 is at 1,015 px. Route in: a GitHub issue (1,681 px). "For journalists" at 3,977 px is about fixing by-lines, not press questions. 40 s.
4. `/outreach/index.html` ("Outreach", welcome ~2,560 px). "Drafts only. Nothing here has been sent ... No contact details are kept". Confirms: nobody to call. 20 s.
5. `/help/index.html` (nav Help, 0 px). "How to cite us" at 651 px. 10 s.
6. `/help/cite.html`. "Cite the source first" 348 px; citation needs address, version, UTC time, sha256 (505 px); Licences 1,009 px: data and code Apache-2.0, pages still without a content licence. 25 s.
7. `/agents/index.html` ("the team", welcome 781 px). Pipeline numbers, then "What Dinis can unblock: 40 things" at 295 px. Says "32 agents"; the welcome said 31. Left. 15 s.
8. `/stories/how-day-2-was-called-off/index.html` (via `/stories/`, 490 px; counted as part of this step). FACT / EVIDENCE per sentence, first at 833 px; header still "Written 11 Nov, 02:33 UTC ... on the data read at 11 Nov, 07:38 UTC". 45 s.

## In 10 seconds

This is the thing from the email: "a newsroom run by AI agents", one named person, a public record with sources and read times, not a warning service. All of it above the fold of the first page.

## In 1 minute

The figures give her a lead: a 22-minute lag from IPMA to the site, 311 press items tracked, a "who was first" ranking. She knows what it is, who directs it, and what it is not ("Not a replacement for reporters", 2,165 px). What PrompTugal is, she still does not know.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is there a story / what is this | found | `/welcome/` H1 211 px, lede ~400 px; hook at `/research/media/ranking.html` | 0 (+1 for the hook) |
| Can I cite it, and how | found | `/help/cite.html` 348 px; not linked from `/welcome/` | 2 (Help, then cite) |
| Who do I call for comment | not found | `/contribute.html` (GitHub issue, 1,681 px); `/outreach/` "Nothing here has been sent", no contact | 2, gave up |

## Lost or misled

- The welcome page's "Tell us what is wrong" sounds like a way in; it is corrections only. Contribute opens with 19 task cards, not with how to reach anyone.
- Breadcrumb and nav put `/welcome/` under "Data room": she wondered if she had landed inside a data tool.
- "A draft for Dinis Cruz: the words are not yet agreed" under the H1: can she quote a page its own team calls a draft?
- "31 agents" on welcome, "32 agents" on Team, minutes apart.
- "the team" link goes to an ops board ("40 things", "account out of credit" behind the first card).
- Story header times still read as reversed.

## Words not understood

"1 editor" (who? Dinis, or an agent?), "incident.envoy@web-summit.dinis", "Data room", Labs, Studio, Panel, "Repo", METAR, CAP, "superseded", "markdown twin", sha256 (knows the word, not why she needs it). The welcome glosses fact / evidence / hypothesis: no longer a problem.

## What would make her act

- Write: yes, and sooner than before. Angle: "AI agents timed the press against IPMA". Ranking page and Day 2 story as sources.
- Cite: yes, the authorities for facts, the site for the collection.
- Call: still blocked. A GitHub issue is not how a reporter on deadline asks for a quote, and outreach says nobody has been contacted. She would write "the project's public pages say a person sends every message; there is no press contact".

## Score

4 / 5. The welcome page answers "what is this and who is behind it" in ten seconds, and leads straight to a story; still nobody to call.

## Against run 1

| Run-1 finding | Status |
|---|---|
| 1 blocking: no way to reach a human | not fixed (a GitHub issue route is now visible; no press line) |
| 2 costly: "About" goes to BRIEF.html | partly ("New here?" button in every header at 12 px; About still BRIEF.html) |
| 3 costly: home says nothing about agents/who above the fold | partly (header button only; home body unchanged) |
| 4 costly: Team page opens with the owner's to-do list | not fixed (295 px), and now linked from welcome |
| 5 minor: story timestamps look reversed | not fixed |
| 6 minor: jargon without gloss | partly (labels linked to glossary on welcome; nav words unchanged) |
| 7 minor: no content licence | partly (Apache-2.0 for data and code stated; pages still none) |
| 8 held: Team page calls api.github.com | not fixed (still held) |

## Findings

1. **blocking**: No press contact. Where: `/welcome/` "Tell us what is wrong" 2,471 px; `/contribute.html` GitHub issue at 1,681 px; `/outreach/` "Nothing here has been sent". 2 clicks, not found. Change: one line on `/welcome/` within 800 px: "Press: a role-based address or form, answered by a person (Dinis Cruz or someone he names)", and say how quickly.
2. **costly**: "the team" on welcome (781 px) leads to `/agents/`, opening on "What Dinis can unblock: 40 things" at 295 px. Change: link to a team page for outsiders (who is accountable, what the agents do); keep the ops board one level down.
3. **costly**: "A draft ... the words are not yet agreed" under the H1 (~350 px). Change: agree the words, or move the note to the end; a reporter reads it as "do not quote".
4. **costly**: `/welcome/` does not link "How to cite us". Change: a "Cite this" line beside "Take the data" (1,467 px) to `/help/cite.html`; 2 clicks become 1.
5. **minor**: `/welcome/` sits under "Data room" (breadcrumb 141 px, nav highlight). Change: put it at the top level, or under Help.
6. **minor**: "31 agents" (welcome, 09:41 UTC) vs "32 agents" (`/agents/`, live). Change: label the welcome figure as a snapshot or read it live.
7. **minor**: `/contribute.html` puts its H1 at 1,015 px under 19 task cards. Change: H1 and the three ways in first.
8. **minor**: story header "Written 02:33 ... data read 07:38" unchanged. Change as in run 1.
9. **minor**: "About" still opens BRIEF.html. Change: point it at `/welcome/`.
10. **held**: `/agents/` requests `api.github.com` (walker's external_hosts); not the Weather face.
