> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:03 UTC

# Synthetic visitors, run 2: the first draft of /welcome/

**The four people below are invented. This is not user research. Never quote them as real readers.** These are the same four personas as [run 1](findings.md), each now arriving fresh at [/welcome/](../../welcome/). The draft was envoy@'s 94f2ed9, served as v0.1.798; the walks ran between 10:00 and 10:05 UTC on 11 November 2026, with Do Not Track and Global Privacy Control on. The pixel and click measurements are real. The words are the sub-agents'.

| Persona (invented) | Run 1 (/) | Run 2 (/welcome/) | In one line | Walk |
|---|---|---|---|---|
| Journalist | 3 | **4** | Within 10 seconds, above the fold, she knows this is the AI-agents newsroom from her email. She still finds no one to call. | [journalist](run-2/journalist.md) |
| Curious visitor, phone | 3 | **2** | /welcome/ explains the site, but never says whether the summit is on; it adds one tap before the same scroll as run 1. | [visitor](run-2/visitor.md) |
| Newsroom executive | 2 | **3** | What it is and who runs it, with 0 clicks (3 in run 1). She would forward it as "worth a 30-minute call". | [exec](run-2/exec.md) |
| Investor | 2 | **3** | Front door fixed, numbers visible. She finds no link to the company, no "what next", and costs only in tokens. | [investor](run-2/investor.md) |

**What the draft fixed:** the front door. Three of the four now understand in 10 seconds what this is and who directs it, and the strongest numbers are on the first screen.

**What it broke:** the newcomer who came for the storm and the summit. The page is about how the site is made. On a phone, Web Summit is first mentioned at 446 px, only as "the week of Web Summit". Day 2 and Thursday are mentioned 0 times in 5,224 px.

## Ranked findings and what to change

1. **Blocking (visitor): /welcome/ never gives the summit's decision.** He reaches it only on /, at about 1,593 px, after tapping "See the storm, live" (677 px, just below screen 1). **Change:** one line under the H1 with Web Summit's latest decision on Day 2 and Day 3, its source and the time read, linked to its timeline row. The line updates when the summit's decision changes.
2. **Blocking (journalist; costly for exec): still no route for press or newsrooms.** "Tell us what is wrong" (2,471 px) leads to /contribute.html, which offers only a GitHub issue (1,681 px). She gives up after 2 clicks. **Change:** one project route, Dinis's call, on /welcome/ near the top and at the end.
3. **Costly (exec, investor): nothing says how a newsroom or event would reuse this, or what comes next.** The "template for the next incident" aim is absent from the page's 2,931 px. There is no link to the company or to web-summit.sgit.ai/investors/ (0 links; the pack still never names Storm Charles). Cost on /accounts/ is in tokens, not money. **Change:** a short section, "For newsrooms and events: what next", in words Dinis agrees, with a link to the pack. Where cost isn't priced, say "not priced yet" rather than leave it to tokens.
4. **Costly (journalist, exec, investor): "the team" link (781 px) lands on /agents/, which opens on "What Dinis can unblock: 40 things" (295 px).** The agent count also disagrees: 31 on /welcome/, 32 on Team, "27 of 31" on Accounts. **Change:** link "the team" to a part of /agents/ that says what the team does, or move the asks off its top (conductor). Use one count, with a time.
5. **Costly (journalist): "A draft for Dinis Cruz: the words are not yet agreed" reads to a reporter as "do not quote".** There is also no link from /welcome/ to How to cite us (2 clicks). **Change:** move the draft note off the reader's first screen once the words are agreed, and add "How to cite us" beside the sources.
6. **Costly (exec): human review is implied but never stated.** The page says "31 agents, 1 editor" (700 px) and "a person sends every message", but its "How it is made" section describes only an automated gate. **Change:** one sentence on what a person checks and what goes live without a person.
7. **Costly (visitor, investor): the first screen reads as figures about the storm, but they are figures about the site.** The tiles (22 minutes, 311 press items, 31 agents) look like storm figures. The "22 minutes" (IPMA's message to our row) reads as contradicting "within a minute" (push to live). The breadcrumb files the page under Data room, with an 11-link data-room sub-bar. **Change:** label each tile as being about the site, and give the welcome page its own breadcrumb without the data-room sub-bar.
8. **Not fixed from run 1:** "About" still opens /BRIEF.html (all four noticed). There is still no content licence (/help/cite.html). The Day 2 story times still read as reversed. On /, the Web Summit link still jumps far down the page, and "read Tue 20:59" still looks stale.
9. **Held:** /agents/ still makes a browser request to api.github.com (gate owner). The accounts page's out-of-credit line dates from 02:57 UTC, and an investor reads it as a risk; refresh it or date it (conductor). The walker failed on /entities/organisation/websummit.html because of an error in our own helper script, so that page was not judged.

## The five changes for the next draft

1. The summit's latest decision, with source, time and link, as the first line under the H1.
2. One route for the press and newsrooms (Dinis's call), plus "How to cite us" from /welcome/.
3. "For newsrooms and events: what next": reuse for the next incident, a link to the investor pack, cost in money or "not priced yet".
4. One sentence on what a person checks, and one agent count.
5. "About" and "the team" go to plain pages, not BRIEF.html or the asks. The welcome page gets its own breadcrumb, and each tile says it is about the site.

Data: [findings-run-2.json](findings-run-2.json); the walks are in run-2/<persona>.json.
