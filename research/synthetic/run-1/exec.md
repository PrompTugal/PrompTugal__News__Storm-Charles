> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 09:54 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `exec`: Hanne Vogel (invented), head of digital product at a regional German publishing group. Laptop 1440 x 900 (fold 900 px), 8 minutes between meetings. Forwarded by her editor-in-chief: "could we do this for our floods?" Walked with Do Not Track and GPC on, 09:53 to 09:54 UTC, site v0.1.780 to v0.1.782.

## Path

1. `/` (Weather, 5,757 px tall). Saw the red "RED IPMA warning in force in Lisbon now" block (162 px), the "Not a warning service" bar (57 px), the hour-by-hour grid (478 px). Nothing above the fold says what the site is or who makes it. 25 s, did not scroll past ~1,000 px.
2. About -> `/BRIEF.html` (9,279 px). Expected an "About us"; got Dinis's dated instructions to his agents ("this should look like CNN", "OpenRouter", "Silvio's router idea"). Read the top 1,700 px. 20 s.
3. Help -> `/help/index.html` (1,073 px). Table "If you want to / read": picked "What this site is" (497 px). 15 s.
4. `/help/what-this-is.html`. The first real answer: a record of Storm Charles, built by software agents with a named human operator; not a warning service; two faces; markdown twins and JSON. 25 s.
5. Team -> `/agents/index.html` (6,414 px). Top: "69 pushes, 54 deployed, 37 s median", "32 agents", then "What Dinis can unblock: 40 things" (295 px): #1 model provider out of credit, #2 "Web Summit's terms forbid automated reading and archiving of its sites", #4 sites whose terms forbid automated reading, #6 "Are we within IPMA's terms on launch day?". 25 s.
6. Help -> How to cite us `/help/cite.html` (1,435 px). Licences at 1,009 px: data and code Apache-2.0; quoted material keeps its owner's terms; "The pages do not yet state a content licence of their own; that is a known gap". 20 s.
7. Team -> Accounts `/accounts/index.html` (6,105 px). "What this project costs" (271 px): model spend 1.06 of a 20 USD daily cap; provider account out of credit since 02:55 UTC; 1.92 billion tokens, "Tokens are not converted to money". 25 s.
8. Data room `/data-room/index.html` (10,373 px). Headline on the Web Summit decision with DECISION · FACT label and source time (197 px). Sub-nav of 11 items (Dashboard, Query, Graph, Ontology, Lead times...). 15 s.
9. Team -> Contribute `/contribute.html` (4,649 px). 19 open tasks first (199 px); "Three ways in" at 2,623 px: GitHub issue or pull request; "What we check before it goes in" (3,036 px): primary source, both sides shown, merged by agents, main only by Dinis. 20 s.
10. Studio `/studio/index.html` (2,004 px). Six animated explanations; "How a fact gets onto this site, about 3 min" looked useful, but no time to watch. H1 "Studio" sits at 868 px, under the cards. 15 s.

About 205 s of reading plus clicks; stopped there for her next meeting.

## In 10 seconds

"A very serious-looking storm dashboard for Lisbon, with official warning colours." She did not understand that it is a demo of an AI-agent newsroom, or that it is meant as a template.

## In 1 minute

Only after About (raw brief) and Help -> What this site is: an experiment by one named person running a team of AI coding agents that collects official decisions and warnings with sources and times, publishes them as pages and JSON, and labels fact, evidence and hypothesis.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| What is this and who runs it | found | `/help/what-this-is.html`, first paragraph (~380 px); not on `/` or About | 3 |
| Could we reuse it, and what it would cost us | partly | `/accounts/` gives running costs (model spend vs a 20 USD cap, tokens, CI seconds) but no price, no offer, no "use this for your incident" page; "template for the next incident" is nowhere on her path | 6 |
| The risk: accuracy, licensing, AI policy | partly | Accuracy: labels and checks on `/contribute.html` at 3,036 px. Licensing: `/help/cite.html` at 1,009 px admits no content licence. AI policy: "Claude Code agents" in every footer, but no stated editorial AI policy (human review, which models, what they may write) | 5 |

## Lost or misled

- "About" opens Dinis's working brief, not an about page: insider names, tools and orders. She read it as "internal notes published by mistake".
- The Team page shows, in public and near the top, that the team itself doubts it is within Web Summit's and IPMA's terms. For a legal-minded publisher this reads as a red flag, not as transparency.
- Team item 7 asks "Are GitHub issues open on the repository, and who triages them?", while Contribute tells readers to open an issue. She could not tell whether that route works.
- Accounts says the model provider has been out of credit since 02:55 UTC; she wondered whether the site is still being updated (the header said LIVE and the version kept changing, so it seems so).

## Words she did not understand

IPMA, ANEPC, METAR (on `/`), "two faces", "markdown twin", sha256, "conductor", "vault", "cache reads", "weighted tokens", "superseded", "fractal" (Studio), "Panel", "Labs", "Ontology", "Lead times".

## What would make her act

She would forward `/help/what-this-is.html` to her editor-in-chief with "interesting, not ready". She would take a call or a pilot only with: a one-page "for newsrooms" pitch (what you get, who runs it, what it costs, how to start for your own incident), a stated AI and editorial policy, a content licence, and a named contact route other than GitHub.

## Score

**2 / 5**: the rigour (sources, times, labels, corrections) is what her newsroom wants, but nothing speaks to a publisher, and the most visible risk signals (terms doubts, no content licence) come before any offer.

## Findings

1. **blocking**: No page answers "could my newsroom use this?". Where: no link from `/`, About or Help; "template for the next incident" (the project's own aim) appears nowhere on 10 pages walked. Change: a short "For newsrooms" page linked from `/` and About: what it is, what you get (pages, JSON API, timeline), who runs it, what it costs, how to start for your own event.
2. **costly**: "About" goes to the raw brief. Where: `/BRIEF.html`, 9,279 px of dated instructions; the plain answer is 2 clicks away at `/help/what-this-is.html`. Change: point About at a plain about page (what-this-is), with the brief one link below it.
3. **costly**: `/` gives no clue what the site is. Where: `/`, above the 900 px fold only the warning, the disclaimer bar and the hour grid; no line naming the project, the agents or the operator. Change: one line under the masthead: "A record of Storm Charles, built by AI agents for Dinis Cruz. What this is."
4. **costly**: Legal doubts are the first thing a visitor reads on Team. Where: `/agents/index.html`, "What Dinis can unblock" at 295 px, items 2, 4 and 6 (terms of Web Summit, other sites, IPMA). Change: keep them public, but put the team's status board below a short explainer, and state the current answer (holding, link only) beside each.
5. **costly**: No stated AI or editorial policy. Where: footers say "Claude Code agents"; human review is only described inside `/contribute.html` at 3,036 px. Change: a Help page "How AI is used here": which tasks agents do, what a person checks, which models are called and logged, and where mistakes are corrected.
6. **costly**: No content licence. Where: `/help/cite.html` at 1,009 px, "a known gap". Change: state one (for example CC BY for our pages) or say plainly that reuse needs permission.
7. **minor**: Contradiction on the contact route. Where: `/contribute.html` 2,623 px says open an issue; `/agents/` item 7 asks whether issues are open. Change: confirm and say so on both pages.
8. **minor**: Cost shown only as tokens. Where: `/accounts/`, "Tokens are not converted to money". Change: an estimated monthly cost line, labelled estimated, for a buyer.
9. **minor**: Studio's title sits below its cards. Where: `/studio/index.html`, H1 at 868 px. Change: put the H1 and one line of purpose above the cards.
10. **held**: Team page requests `api.github.com` (external_hosts on `/agents/`). Not her concern; noted for the team against the outside-requests rule.
