> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:09 UTC

# Synthetic visitors, run 3: /welcome/ after envoy@'s 4addc33 and designer@'s round 49

**The four people below are invented. This is not user research. Never quote them as real readers.** These are the same four personas as runs [1](findings.md) and [2](findings-run-2.md). Each arrived fresh at [/welcome/](../../welcome/) and then looked at the front page. Walked between 10:07 and 10:12 UTC on 11 November 2026, on v0.1.810 to v0.1.813, with Do Not Track and Global Privacy Control on. The pixel and click measurements are real. The words are the sub-agents'.

| Persona (invented) | Run 1 (/) | Run 2 | Run 3 | What changed | Walk |
|---|---|---|---|---|---|
| Visitor, phone 390 × 664 | 3 | 2 | **4** | Finds the Web Summit decision in about 9 s, with no scroll and no tap | [visitor](run-3/visitor.md) |
| Journalist | 3 | 4 | **4** | Gets the news on the first screen. Still nobody to call | [journalist](run-3/journalist.md) |
| Newsroom executive | 2 | 3 | **3** | The human-review sentence works. Still no reuse offer, and cost is in tokens | [exec](run-3/exec.md) |
| Investor | 2 | 3 | **3** | First screen shows a real decision. No link to the company or pack, no "what next" | [investor](run-3/investor.md) |

## The conductor's question: does the visitor find the summit decision in 10 seconds?

**Yes, just.** On a 390 × 664 phone, the decision box starts at 401 px and the sentence "Web Summit called off Day 2…" is at about 411 px: inside the first screen, reached in about 9 s. It sits under the H1 and a 4-line paragraph about the agents (to 364 px), in a muted box that reads like a footnote. **On the front page / it is unchanged at 1,593 px** (screen 3).

## Fixed since run 2

- The decision is now on /welcome/ (envoy@).
- "About" opens /welcome/. The breadcrumb and data-room sub-bar are gone, and the H1 moved from 211 to 132 px (designer@).
- "How it is made" (1,619 px) now says a page goes live once the automated gate has checked it, without a person reading it first, and that a person sends every message. The run-2 contradiction is gone.
- The "22 minutes" tile now says what it measures.
- /agents/ now opens with a paragraph for outsiders, and "What Dinis can unblock" moved from 295 px down to about 4,400 px.
- /help/cite.html now gives Apache-2.0 for data and code.
- The header's "LIVE" is now "Updated N min ago".

## Ranked findings, run 3

1. **Blocking (journalist), three runs running: there is still no press contact.** The routes are "Tell us what is wrong" (2,564 px), which leads to Contribute (a GitHub issue), and Outreach ("Nobody has been contacted yet"). She gives up after 2 clicks. *With Dinis.*
2. **Costly (exec, investor), three runs running: nothing for a newsroom or event that wants to reuse this, and no "what next".** /welcome/ has 0 links to web-summit.sgit.ai, and /investors/ still never names Storm Charles. Cost is still only in tokens. **Change:** a "Could this work for your newsroom or event?" section after "What it is not", with a link to the pack and ROADMAP. *With Dinis.*
3. **Costly (journalist, visitor): "A draft for Dinis Cruz: the words are not yet agreed" at 264 px reads as "do not quote".** It also casts doubt on the decision box below it. *With Dinis.*
4. **Costly (visitor): the decision box reads like a footnote.** **Change:** put it directly under the H1 (~200 px), in body-size type, so it takes about 4 s instead of 9.
5. **Costly (exec, journalist, visitor): the front page / still gives no clue what the site is, and its decision is on screen 3.** The H1 is at about 5,300 px of 5,757. Only the 12 px "New here?" pill says anything, and the Web Summit decision is at 1,593 px on a phone. **Change:** one line under the warning band: the summit's decision, then "New here? What this site is →" linking to /welcome/.
6. **Costly (visitor): "are people OK" is still unanswered** on /welcome/ and in the first three screens of /. **Change:** a line from ANEPC when it reports injuries or damage, or "No injury or damage figures from ANEPC in what we have read" (no advice of our own).
7. **Minor: the agent count still differs:** 31 on /welcome/, "about two dozen" on Team, "27 of 31" on Accounts.
8. **Minor:** there is no "Cite this" link on /welcome/ (2 clicks). The tiles have no "About this site" heading. "usually within a minute" doesn't say it is push to served.
9. **Minor, measured by incident.synthetic@: the nav label "About" is clipped at 1,440 px.** The link ends at 1,124 px, but its container clips at 1,103 px, so it reads "Abou". It is fine at 1,366 and 1,920 px. *For designer@.*
10. **Held:** /agents/ still makes a browser request to api.github.com (gate owner). /accounts/ still opens on the out-of-credit row read at 02:57 UTC (conductor).

Correction to runs 2 and 3: the "walker failed on /entities/organisation/websummit.html" was a fault in our own helper script (SVG links have no innerText), not the site. It is fixed, and the page loads (17,694 px, no outside requests).

Data: [findings-run-3.json](findings-run-3.json); the walks are in run-3/<persona>.json.
