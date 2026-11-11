> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:01 UTC

**Invented person; not user research; never quote as a real reader.**

# Run 2: `investor` (Priya Raman, invented), laptop 1440 × 900

Same invented persona as run 1, a fresh visitor: the founder's link now opens `/welcome/`. Walked 11 November, 09:59 to 10:01 UTC, Chromium, Do Not Track and Global Privacy Control on (no visit counted). Site served v0.1.799 to v0.1.800.

## Path

1. `/welcome/`, 60 s. 2,931 px, fold 900. H1 "A newsroom run by AI agents, live on one storm" @211 px; one paragraph @~390 px: Dinis Cruz and a team of AI agents keeping a public, sourced record of Storm Charles since Tuesday; not a warning service. Two buttons @591 px. Four figures @~700 px, each with source and time: 22 minutes (IPMA change to row), 311 press items from 18 outlets, 31 agents and 1 editor, first commit 10 November 21:14 UTC. Scrolls: "What you can do here" @873, "How it is made" @1,583, "What it is not" @2,165, "Tell us what is wrong" @2,471. No link to a company, the pack, or anything "next".
2. `/accounts/` (from "The costs" @~2,072 px), 45 s. 6,105 px. "The books at a glance" @538: model spend 1.06 of 20 US dollars today; provider account "out of credit … since 02:55 UTC" (reported 02:57, seven hours old); 1.92 billion tokens, 98.6% cache reads; 724 CI runs, 515 releases. "Cost per output" @1,215: a timeline row ≈ 649,292 weighted tokens; tokens "not converted to money".
3. `/board/` (from "The board"), 15 s. 47,352 px; first screen is counters (open 206, blocked 7, done 209); H1 at 28,631 px. Reads as a work queue, not a plan. Back.
4. `/agents/` (Team), 15 s. Still opens with "What Dinis can unblock: 40 things" @295 px. Leaves the site (~2 min 15 s, 4 pages, 3 clicks).
5. `https://web-summit.sgit.ai/investors/`, 40 s. Unchanged from run 1: company (My Feeds, Loulé), what is sold (services, customised agentic teams); 0 mentions of Storm Charles, storm-charles or "incident".
6. `https://web-summit.sgit.ai/investors/story/`, 30 s. "4. PrompTugal.news: the proof that it ships" @1,515 px; "What comes next" @2,257 px. Still 0 mentions of Storm Charles.

## In 10 seconds

"An AI-agent newsroom covering one storm, one person in charge, with receipts." The first screen says what, who and that it is not a warning service. A clear improvement over run 1's red warning block.

## In 1 minute

The four figures and "How it is made" tell her: built since 21:14 UTC on 10 November, 31 agents, a gate, corrections in the open, every claim sourced. She now believes the method works on a live event. She still does not know whether this is a product, whose company it is, or whether it will be done again.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| What is new here | found | `/welcome/` H1 @211 px and paragraph @~390 px | 0 |
| Who is behind it | partly | Dinis Cruz named @~390 px; "31 agents, 1 editor" @~700 px; no company, no link to My Feeds or the pack | 0 |
| How big / what next | not found | No sentence on repeat use, the next incident, buyers or market; `/board/` is a queue of 206 open items; the pack's "What comes next" does not name the storm | 3, then gave up |

## Lost or misled

- Breadcrumb says "Storm Charles › Data room › …" and the nav highlights Data room: the welcome page looks filed inside a section.
- "22 minutes" next to "usually within a minute of the push" (@~1,700 px): she first read 22 minutes as slow; they measure different things, and neither says so.
- "The costs … measured in tokens": she wanted money. `/accounts/` gives 1.06 US dollars of model spend but says tokens are not priced, and its second line is an out-of-credit notice seven hours old.
- "Team" still leads with 40 asks; "The board" leads with 206 open items.

## Words not understood

"1 editor" (is Dinis the editor, or a separate person?), weighted tokens, cache reads, the gate, "a capture", hash, Panel, Studio. Fewer than run 1 (18 terms then).

## Compared with the investor pack

Still no link either way: `/welcome/` has 0 links to web-summit.sgit.ai; `/investors/` and `/investors/story/` have 0 mentions of Storm Charles. The two now tell matching stories in matching tone (one person, an agentic team, every claim sourced, honest about what is not done). The site's welcome is now the stronger proof page (measured figures, about 12 hours of work by the time its figures were read) but the pack's "proof that it ships" is still PrompTugal.news alone.

## What would make her act

Book a call if `/welcome/` had one line: "The same team and method are offered as a service: the company and the investor pack", and the pack's story named Storm Charles as proof number two. To invest: a cost per incident in money, and a sentence on what repeats (the next incident, a buyer).

## Score

**3 / 5** (run 1: 2 / 5). The front door now says what and who in ten seconds, with sourced numbers; the business and the "next" are still missing on both sites.

## Against run 1

| Run-1 finding | Status |
|---|---|
| 1. No what/for whom/by whom on the front door (blocking) | fixed for the founder's link (`/welcome/`); `/` itself unchanged, but a "New here?" button sits in the header of every page @12 px |
| 2. No link site ↔ pack/company (costly) | not fixed (0 links, 0 mentions) |
| 3. "About" is the internal brief (costly) | partly: `/welcome/` does the job, but nav "About" still opens `/BRIEF.html` |
| 4. Team leads with risks (costly) | not fixed (`/agents/` H2 @295 px) |
| 5. Investor numbers buried (costly) | fixed: four sourced figures @~700 px on `/welcome/` |
| 6. "What next" / template for the next incident unsaid (minor) | not fixed (0 mentions on `/welcome/`) |
| 7. Jargon on first-level pages (minor) | partly: welcome is plain; nav and Team unchanged |
| 8. Launch plan has no investor group (held) | held (welcome links Outreach; "Nobody has been contacted yet") |
| 9. `/agents/` calls api.github.com (held) | held, still seen |

## Findings

1. **costly**: no route from the site to the company or pack, or back. Where: `/welcome/` 0 links to web-summit.sgit.ai; `/investors/`, `/investors/story/` 0 mentions of Storm Charles. Change: one line in `/welcome/` "Who makes this" linking the pack; ask the pack's owner (not ours to edit) to cite Storm Charles in "the proof that it ships".
2. **costly**: no "what next" on `/welcome/`. Where: 2,931 px, 0 mentions of next, template, repeat, roadmap. Change: a short section "What next" (this is the template for the next incident, link ROADMAP), in Dinis's words once agreed.
3. **costly**: the cost link promises tokens, the investor wants money, and the accounts open on a stale out-of-credit line. Where: `/welcome/` "The costs" @~2,072 px; `/accounts/` row 2 @~600 px, reported 02:57 UTC. Change: on `/welcome/`, say what is in money (model spend today, with source) and what is not; refresh or date-flag the provider row.
4. **minor**: "22 minutes" and "within a minute" read as contradictory. Where: `/welcome/` @~700 px and @~1,700 px. Change: say "22 minutes from IPMA's message to our row; about a minute from our push to served".
5. **minor**: welcome filed under Data room. Where: breadcrumb @141 px, nav highlight. Change: breadcrumb "Storm Charles › New here", no section highlight.
6. **minor**: "1 editor" unclear. Where: figure @~700 px. Change: "31 agents, 1 person (Dinis Cruz)".
7. **held**: Team and Board lead with backlogs (40 asks @295 px; 206 open @337 px); for their owners, now less exposed since `/welcome/` is the door.
8. **held**: the welcome is marked "a draft for Dinis Cruz: the words are not yet agreed" @~350 px; honest, but she noted it; Dinis's call when to drop it.
