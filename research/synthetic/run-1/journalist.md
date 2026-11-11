> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 09:54 UTC
**Invented person; not user research; never quote as a real reader.**

# Run 1: `journalist` (Mara Lindqvist, invented)

Laptop 1366 × 800 (fold at 800 px), Do Not Track and GPC on. Came from an email: "AI agents are covering Storm Charles live". Budget 10 minutes; used about 4 min 10 s over 9 pages. Weather facts below are the site's, as shown at 09:53 UTC; none are ours.

## Path

1. `/` (v0.1.780). Saw the red block "RED IPMA warning in force in Lisbon now", rain until 18:00, orange wind until 21:00 (IPMA: gusts up to 120 km/h), then the hour-by-hour grid. Looked for "AI agents" or who runs this: nothing above the fold; the only pointer is "Team" in the nav (0 px) and the footer line, at the bottom of a 5,793 px page. 30 s.
2. `/BRIEF.html` (nav "About"). Expected an About page; got an internal brief: "Dinis, 10 November 2026, ~23:40 UTC ... close to his words", voice-memo notes, repository names, OpenRouter, "Silvio's router idea". 9,279 px long. Left after the first screen. 20 s.
3. `/help/index.html` (nav "Help"). The table "If you want to / Read" was what she needed: "What this site is" at 497 px, "How to cite us" at 651 px. Line at the bottom: "Built and run by Dinis Cruz's incident team of Claude Code agents ... with a named human operator". 15 s.
4. `/help/what-this-is.html`. Clear: a record of what was decided, warned and reported, each with source and time read; run by software agents with a named human operator; "not a warning service". 20 s.
5. `/help/cite.html`. "Cite the source first" (348 px): cite IPMA/the government, cite this site for the collection. Citation needs URL, version, UTC time, sha256 (505 px). Notes "The pages do not yet state a content licence of their own". 25 s.
6. `/agents/index.html` (nav "Team"), looking for a person to call. Got a pipeline dashboard (69 pushes, 32 agents), then "What Dinis can unblock: 40 things" at 295 px: item 1 "The model provider's account is out of credit", item 2 Web Summit's terms forbid automated reading. No contact, no press line. 20 s.
7. `/stories/index.html` (nav "Stories"). Six stories; "How Web Summit's Day 2 was called off" at 490 px; "What the press had and when" at 1,419 px caught her eye ("the press was 32 minutes behind Web Summit's page"). 25 s.
8. `/stories/how-day-2-was-called-off/index.html`. Each sentence labelled FACT / EVIDENCE with who said it, when, and when read; first sentence at ~900 px. Header says "Written 11 Nov, 02:33 UTC ... on the data read at 11 Nov, 07:38 UTC" (written before the data was read?). 60 s.
9. `/help/corrections.html`, last try for a contact: "We do not publish contact details here"; a contribute page "is being set up"; "A person, not an agent, answers any message", but no way to send one. 15 s.

## In 10 seconds

A clean weather dashboard: Lisbon is under an IPMA red rain warning. She did not see that this was the "AI agents" thing from the email; it reads like any weather widget. No byline, no "who we are" above the fold.

## In 1 minute

After Help: a public, sourced record of Storm Charles decisions and warnings, built by AI agents for one named person, Dinis Cruz. Disciplined about labels and sources. Unclear what PrompTugal is, whether this is a publisher, a project, or a demo.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| Is there a story / what is this (AI agents covering a storm) | partly | `/help/what-this-is.html` 2nd paragraph; `/stories/` | 3 (via Help; About sent her the wrong way) |
| Can I cite it, and how | found | `/help/cite.html`, "Cite the source first" at 348 px | 4 |
| Who do I call (a named, reachable human or press contact) | not found | `/help/corrections.html` says no contact details; `/agents/` has none | 6, gave up |

## Lost or misled

- "About" opens the internal brief, not an about page. Cost one click and trust ("is this a hobby log?").
- Team page leads with "What Dinis can unblock" and "account out of credit": reads like an internal ops board, not a team page for outsiders.
- Story header "Written 02:33 UTC on the data read at 07:38 UTC": the times look reversed.
- Home "(Lisbon time)" beside "UTC": correct in November, but she had to check.

## Words she did not understand

ANEPC, METAR, CAP, MeteoAlarm, "data room", "two faces", "markdown twin", sha256, "incident.conductor@web-summit.dinis" (an address? an agent?), "superseded", Panel, Labs, Studio, "evidence" as a label (to her, evidence means proof; here it means "reported by others").

## What would make her act

- Write: yes, a paragraph in the roundup on "AI agents keep a sourced record of Storm Charles", with the Day 2 story and "What the press had and when" as the hook. Needs one human quote.
- Cite: yes, would cite IPMA and the government for facts, this site for the collection, as the cite page asks.
- Call: blocked. No name with a role she can reach, no press email or form. On deadline she would drop the item or write "the project did not respond", which is not true either.

## Score

3 / 5. Trustworthy and citable once found, but the About link misdirects and there is no one to call, which is what a reporter needs before running it.

## Findings

1. **blocking**: No way to reach a human for comment. Where: `/help/corrections.html` ("We do not publish contact details here", contribute page "being set up"); `/agents/` has none; 6 clicks, not found. Change: one press line on About and Help (a role-based address or form, answered by a person), within the first 800 px.
2. **costly**: "About" in the nav goes to `BRIEF.html`, an internal memo 9,279 px long. Where: nav at 0 px on every page. Change: point "About" to `/help/what-this-is.html` (or a new about page for people who do not know what this is, as the brief of ~09:50 asks); keep the brief one level down.
3. **costly**: Home says nothing about who makes it or that agents make it, above the fold. Where: `/`, fold 800 px; the "Built and run by ... agents" line only in the footer of a 5,793 px page. Change: one line under the masthead: "A sourced record kept by AI agents for Dinis Cruz. What this is →".
4. **costly**: Team page opens with the owner's to-do list ("40 things", "account out of credit", terms questions) at 295 px. Where: `/agents/`. Change: lead with what the team is and who is accountable; move "For Dinis" to its own tab (it already has one).
5. **minor**: Story timestamps look reversed. Where: `/stories/how-day-2-was-called-off/`, header at ~330 px: "Written 02:33 UTC ... on the data read at 07:38 UTC"; index says "told 07:57". Change: show one "updated" time and the data read time, consistent with the index.
6. **minor**: Jargon without a hover or gloss: ANEPC, METAR, CAP, "data room", "evidence" as a label. Where: home, help, story. Change: expand on first use or link each to the glossary.
7. **minor**: No content licence for the pages. Where: `/help/cite.html`, Licences at 1,009 px (stated as a known gap). Change: state one.
8. **held**: Team page requests `api.github.com` from the browser (walker's external_hosts). Not on the Weather face, so outside the gate's rule as written; the team may want to know.
