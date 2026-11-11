> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:01 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `exec`: Hanne Vogel (invented), head of digital product at a regional German publishing group. Laptop 1440 x 900 (fold 900 px), 8 minutes. Fresh visitor; forwarded link now `/welcome/`. Walked with Do Not Track and GPC on, 09:59 to 10:01 UTC, site v0.1.799 to v0.1.800. Compared with run 1 (`../run-1/exec.md`, 2/5).

## Path

1. `/welcome/` (2,931 px, H1 at 211 px). H1 "A newsroom run by AI agents, live on one storm"; lede (390 px) names Dinis Cruz and "a team of AI agents he directs"; two buttons (614 px); four figures (700 px): 22 minutes, 311 press items, "31 agents, 1 editor", first commit. Read to the end (2,471 px, "Tell us what is wrong"). 70 s.
2. "How it is made" (anchor, 1,583 px): one person instructs, agents write and sign, a gate checks, mistakes stay visible; links to team, accounts, journal, board. 20 s.
3. "The accounts" -> `/accounts/index.html` (6,105 px). "The books at a glance" (538 px): model spend 1.06 of a 20 USD daily cap; provider "out of credit ... since 02:55 UTC"; 1.92 billion tokens; "Tokens are not converted to money". 40 s.
4. "The team" -> `/agents/index.html` (6,414 px). "32 agents" (top); "What Dinis can unblock" (295 px): #1 provider out of credit, #2 Web Summit's terms, #4 sites whose terms forbid automated reading. Same as run 1. 25 s.
5. Back; "Outreach" -> `/outreach/index.html` (4,328 px): drafts to IPMA, ANEPC, transport, "Journalists who covered it" (3,695 px). Nothing for a newsroom that wants to use it. 25 s.
6. Help -> `/help/index.html` (1,073 px); "How to cite us" -> `/help/cite.html`, Licences at 1,009 px: still "a known gap". 30 s.
7. "The board" (from welcome) -> `/board/index.html` (47,352 px; H1 at 28,631 px; 206 open). Closed it. 10 s.

About 220 s of reading plus clicks; she stopped with time to spare.

## In 10 seconds

"An experiment: one man and a team of AI agents keeping a sourced public record of a storm in Lisbon. Not a warning service." Got it from the H1 and lede above the fold. Run 1 needed 3 clicks for this.

## In 1 minute

The method (source, time read, fact/evidence/hypothesis label, open corrections), the proof points (22 minutes from IPMA's change to the row; 311 press items from 18 outlets), the outputs (pages, stories, JSON API). She now sees it as a working demo, not a dashboard. She still does not see that it is offered as a template for other incidents.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| What is this and who runs it | found | `/welcome/` H1 211 px, lede 390 px (Dinis Cruz + AI agents) | 0 |
| Could we reuse it, and what it would cost | partly | "Take the data" (~1,460 px) shows the API; `/accounts/` gives model spend vs cap and tokens, "not converted to money". No "use this for your incident", no price, no contact for a publisher | 1 |
| Risk: accuracy, licensing, AI policy | partly | Accuracy: welcome "How it is made" 1,583 px (good). Licence: `/help/cite.html` 1,009 px, still a gap. AI policy: implied by "How it is made", not stated (which models, who checks content). Terms doubts at `/agents/` 295 px | 4 |

## Lost or misled

- "31 agents, 1 editor" (700 px) and "Nothing leaves the site by an agent's hand: a person sends every message" (1,620 px) made her think a person approves each row. "How it is made" then says the gate checks and the site rebuilds within a minute: no human step. She is unsure which is true.
- Welcome says 31 agents; Team says 32; Accounts says "27 of 31" measured. Small, but she notices numbers.
- The welcome page sits under "Data room" (breadcrumb 151 px, Data room tab lit), beside Ontology and Lead times. Not where she expected an intro.
- "The board" is 47,352 px with its title at 28,631 px: unusable for her.
- "About" (every page's nav) still opens `/BRIEF.html`, the raw brief.
- "A draft for Dinis Cruz: the words are not yet agreed" (349 px): honest, but tells her the pitch is not settled.

## Words not understood

"by-line" in context of agents, "capture", "hash"/"sha256", "gate", "sign what they push", "weighted tokens", "cache reads", "Panel", "Labs", "Ontology", "Lead times", IPMA/ANEPC (expanded only on Outreach).

## What would make her act

She would forward `/welcome/` to her editor-in-chief with "worth a 30-minute call". To take that call she needs: a "Could this work for your newsroom?" block (what you get, what it took: one person, N agents, model spend, days; how to start for your own event; who to contact), a stated AI and editorial policy, and a content licence.

## Score

**3 / 5**: the welcome page answers "what is this and who runs it" in ten seconds and shows the rigour her newsroom wants; it still never speaks to a publisher who would reuse it, and licence and terms doubts are unchanged.

## Against run 1

| Run-1 finding | Status |
|---|---|
| 1 blocking: no "could my newsroom use this?" page | partly: `/welcome/` shows outputs and method; no reuse offer, no template line, no contact for publishers |
| 2 costly: About goes to the raw brief | not fixed: About still `/BRIEF.html`; "New here?" pill is the new way in |
| 3 costly: `/` gives no clue what the site is | partly: "New here?" pill in every header (12 px); `/` itself not re-walked as entry |
| 4 costly: legal doubts first on Team | not fixed: `/agents/` 295 px, items 2 and 4 unchanged |
| 5 costly: no AI or editorial policy | partly: "How it is made" (1,583 px) describes the loop; models, human review not stated |
| 6 costly: no content licence | not fixed: `/help/cite.html` 1,009 px "a known gap" |
| 7 minor: contact route contradiction | partly: welcome links Contribute and Outreach; Team item unchanged (not re-checked) |
| 8 minor: cost only in tokens | not fixed: "Tokens are not converted to money" |
| 9 minor: Studio title below cards | not checked (not on her path) |
| 10 held: Team requests api.github.com | not fixed: external_hosts on `/agents/` still `api.github.com` |

## Findings

1. **costly**: No reuse offer for a newsroom. Where: `/welcome/`, 0 of 5 sections address "use this for your own incident"; the project's aim ("template for the next incident") absent. Change: one section after "What it is not": "Could this work for your newsroom?": what it took, what you would get, how to start, who to write to.
2. **costly**: Human review is implied, not stated. Where: "31 agents, 1 editor" (700 px), "a person sends every message" (~1,620 px) vs "the gate checks it ... within a minute" (~1,800 px). Change: one sentence: what a person checks and what goes live without a person.
3. **costly**: Content licence still missing. Where: `/help/cite.html` 1,009 px. Change: state one, and link it from welcome "Take the data".
4. **costly**: Cost not in money. Where: `/accounts/` 538 px. Change: a welcome line "Running cost so far: X USD models, labelled measured/estimated", with tokens kept on Accounts.
5. **costly**: About still the raw brief; welcome filed under Data room. Where: nav "About" -> `/BRIEF.html`; welcome breadcrumb 151 px. Change: point About at `/welcome/`, take it out of the Data room crumb.
6. **minor**: Agent count differs. Where: welcome 31, `/agents/` 32, `/accounts/` "27 of 31". Change: one source, one time read.
7. **minor**: Board unusable from welcome. Where: `/board/` 47,352 px, H1 at 28,631 px. Change: put H1 and a short summary at the top, or link welcome to a summary.
8. **minor**: Terms doubts unchanged on Team. Where: `/agents/` 295 px. Change: as run 1 finding 4.
9. **held**: Draft notice "the words are not yet agreed" (349 px): right for a draft; remove on agreement.
10. **held**: `/agents/` still requests `api.github.com`; noted for the team.
