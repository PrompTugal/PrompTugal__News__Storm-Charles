> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 09:57 UTC

# Synthetic visitors, run 1: the site as it is, starting at /

**The four people below are invented. This is not user research. Never quote them as real readers.** Each persona was written first ([personas](personas/README.md)), then run as a sub-agent walking the live site in Chromium (Playwright) between 09:52 and 09:56 UTC on 11 November 2026, with Do Not Track and Global Privacy Control on, so no visit was counted. The pixel and click measurements are real. The words are the sub-agents'. The method follows synthetic@web-summit.indi (WS-142). For incident.envoy@ and incident.designer@, who are drafting [/welcome/](../../welcome/); run 2 walks that draft once it is live.

| Persona (invented) | Device | Score | In 10 seconds they understood… | Walk |
|---|---|---|---|---|
| Journalist, Nordic daily (Mara Lindqvist) | laptop 1366 × 800 | **3/5** | "A weather dashboard: Lisbon under an IPMA red rain warning." She did not see this was the AI-agents project from her email. | [journalist](run-1/journalist.md) |
| Curious visitor, Web Summit follower (Ciarán Doyle) | phone 390 × 664 | **3/5** | Red rain warning in Lisbon, orange wind, and "nothing yet on whether Web Summit is on". | [visitor](run-1/visitor.md) |
| Newsroom executive (Hanne Vogel) | laptop 1440 × 900 | **2/5** | "A serious storm dashboard" but "not that it is an AI-agent newsroom demo or a template". | [exec](run-1/exec.md) |
| Investor, media tech (Priya Raman) | laptop 1440 × 900 | **2/5** | "A weather warning dashboard; nothing visible about AI agents, publishing technology or a company." | [investor](run-1/investor.md) |

What worked for all four: the weather was clear within 5 seconds, and the rigour, once found (source and time on every figure, the fact / evidence / hypothesis labels, corrections), raised trust. The journalist could cite the site after 4 clicks.

## Ranked findings and what to change

Classes: **blocking** stops the persona's goal; **costly** means they get there but lose time or trust; **minor**; **held** means seen but not judged here (outside the personas' view, or a call for someone else).

1. **Blocking (exec, investor; costly for journalist): / never says what this is, who makes it, or that AI agents make it.** Above the fold on / (800 or 900 px of a 5,793 px page) the only framing is the 57 px strip "We aggregate public sources". The "Built and run by … agents" line is in the footer. The plain explanation is /help/what-this-is.html, 3 to 6 clicks in. **Change:** the first screen of /welcome/ says, in one sentence each: what it is (a live newsroom on Storm Charles run by a team of AI agents for Dinis Cruz), who it is for, and the live proof, with a link to the Weather face.
2. **Costly (journalist, exec, investor): "About" in the nav opens /BRIEF.html,** a 9,279 px internal brief of dated instructions. Two personas read it as internal notes published by mistake. **Change:** point "About" at /welcome/ (or /help/what-this-is.html until /welcome/ ships), and keep BRIEF.md linked from inside it as "how it is directed".
3. **Blocking (journalist; costly for exec): there is no person or route for the press.** After 6 clicks, /help/corrections says "We do not publish contact details here", and /contribute.html says to open a GitHub issue while Team item 7 asks whether issues are open at all. **Change:** one public press route for the project (a role address, a form or an issue template; Dinis's call, since no private person's contact is ever published), stated the same way on /welcome/, /help/ and /contribute.
4. **Blocking (exec; costly for investor): no page answers "could my newsroom or event use this, what does it cost, how do we start".** The project's own aim, being the template for the next incident, appears on none of the 10 pages the exec walked. The live numbers an investor wanted (pushes an hour, about 44 s median push to served, the agent count) are only on /agents/, near 200 px, and not on /. The site and the investor pack at web-summit.sgit.ai/investors/ do not link to each other: 0 links from 7 site pages, and the pack never names Storm Charles. **Change:** a "For newsrooms and events" section on /welcome/ (what you get, who runs it, how a pilot starts, what is not offered yet), the measured numbers as one band, and a link each way between /welcome/ and the pack (Dinis's call for the pack).
5. **Costly (visitor): on a phone the summit answer is on screen 3, and "are people OK" is never answered.** "Web Summit" first shows at 111 px, but only as a label. The decision ("Day 2 called off on the government's advice; Day 3 aims to proceed") sits at 1,593 px. Tapping "Web Summit" in the closed list jumps 7,311 px down, to 8,364 px, with no way back up. Nothing on /, /stories/ or the Day 2 story speaks to injuries or attendees. **Change:** the first screen of /welcome/ carries the summit's latest decision in one line, with its source and the time read. Where the sources report nothing about people, say "no reports in the sources we read" rather than leaving a gap; never write advice of our own.
6. **Costly (journalist, exec, investor): the Team page opens with "What Dinis can unblock"** (at 295 px). Item 1 is "the model provider's account is out of credit". Items 2, 4 and 6 question the terms of Web Summit, other sites and IPMA. Outsiders read the list as a risk register; the journalist reads it as a story. **Change:** open /agents/ with what the team does and its live numbers, and move the asks to their own page (owner: conductor).
7. **Costly (exec, journalist): there is no stated content licence and no AI or editorial policy page.** /help/cite.html says there is no content licence yet. **Change:** one short policy page (how agents write, how facts are checked, corrections, models through the ledger, licence status), linked from /welcome/.
8. **Minor, for all four: words they did not know.** IPMA, ANEPC, METAR, CAP, UTC (on the phone), Comunicado, "in force", data room, Weather face / two faces, markdown twin, sha256, conductor@, vault, Panel, Labs, Studio, superseded. **Change:** /welcome/ names IPMA and ANEPC in plain words once ("Portugal's weather service", "civil protection"). The nav keeps one word per idea, and the internal words (faces, vaults, lanes, gate) stay off the newcomer path.
9. **Minor:** "read Tue 20:59" beside today's closures looks stale to a newcomer. The Day 2 story header reads "Written 02:33 UTC … on the data read at 07:38 UTC" (it looks reversed; the stories index says "told 07:57"). The Day 2 story opens with JSON, CAP and API links, and its first narrative heading is at 1,231 px.
10. **Held, for the gate's owner: /agents/ makes a browser request to api.github.com.** Three walkers saw it, and incident.synthetic@ confirmed it at 09:56 UTC. CLAUDE.md allows only the page-views vault as an outside request on the Weather face. Whether the Team page may make this request is the gate owner's to say.
11. **Held:** the header says LIVE while /accounts/ says the model provider has been out of credit since 02:55 UTC. Whether "LIVE" means the data or the writers is the conductor's call.

## The five changes, in order

1. The first screen of /welcome/: what this is, who makes it (AI agents, for Dinis Cruz), who it is for, the live proof, and the summit's latest decision with its source and time.
2. "About" goes to /welcome/, not BRIEF.html.
3. One public press route, said the same way everywhere.
4. A "For newsrooms and events" section, the measured numbers, and links both ways with the investor pack.
5. /agents/ opens with what the team does, not with the asks for Dinis. A short policy-and-licence page, linked from /welcome/.

Data: [findings.json](findings.json); each walk's steps and measurements are in run-1/<persona>.json. Screenshots stay out of git.
