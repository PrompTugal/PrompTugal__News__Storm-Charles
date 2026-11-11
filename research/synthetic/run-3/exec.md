> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 10:08 UTC

**Invented person; not user research; never quote as a real reader.**

Persona `exec`: Hanne Vogel (invented), head of digital product at a regional German publishing group. Laptop 1440 x 900 (fold 900 px), 8 minutes. Fresh visitor; forwarded link `/welcome/`. Walked with Do Not Track and GPC on, 10:07 to 10:08 UTC, site v0.1.810 to v0.1.813. Compared with run 2 (`../run-2/exec.md`, 3/5).

## Path

1. `/welcome/` (3,023 px, H1 at 132 px, was 211). Lede (~315 px) names Dinis Cruz and his AI agents; a "latest decision" box (~500 px, Web Summit Day 2 off, IPMA red rain, each with source and time); buttons 609 px; four figures (~720 px): 22 minutes, 311 press items, 31 agents, 13 hours. No "Data room" breadcrumb now; nav "About" is lit. 60 s.
2. "How it is made" (1,619 px): the new sentence, "A page goes live once an automated gate has checked it, without a person reading it first ... Nothing is sent to anyone by an agent: a person sends every message." Read twice. 30 s.
3. "What it is not" (2,258 px): not a warning service, not finished, "Not a replacement for reporters". "Tell us what is wrong" (2,564 px): Contribute, Outreach ("Nobody has been contacted yet"). 30 s.
4. "The costs" -> `/accounts/index.html` (6,105 px): "The books at a glance" (538 px) unchanged: 1.06 of 20 USD model spend, provider out of credit since 02:55 UTC, "27 of 31" sessions measured, "Tokens are not converted to money". 40 s.
5. Front page `/` (5,757 px): opens on IPMA's RED warning (162 px) and an hour-by-hour grid; H1 "Storm Charles: the weather, now" at 5,304 px. Nothing near the top says what the site is except the 12 px "New here?" pill. 20 s.
6. Help -> `/help/cite.html` (1,435 px): Licences (1,009 px): data and code Apache-2.0; content licence "a known gap". 25 s.
7. Team `/agents/index.html` (6,591 px): "32 agents" and "About two dozen AI agents" at the top; "What Dinis can unblock: 40 things" moved down to 4,383 px (was 295). 25 s.

About 230 s; she stopped with time to spare.

## In 10 seconds

"An experiment: one man directs AI agents keeping a sourced public record of a storm in Lisbon; not a warning service." Same as run 2, a little faster (H1 higher, the latest decision boxed under the lede).

## In 1 minute

Method (source, time read, three labels, open corrections), the proof points, and now plainly: pages go live with no person reading them first; only outgoing messages are sent by a person. She understands the editorial model for the first time. Still no sign it is offered as a template her newsroom could run.

## Three things she looked for

| What | Result | Where | Clicks |
|---|---|---|---|
| What is this and who runs it | found | `/welcome/` H1 132 px, lede ~315 px | 0 |
| Could we reuse it, and what it would cost | partly | "Take the data" (~1,500 px) API; `/accounts/` 538 px spend vs cap, tokens not money. No reuse offer, no total cost, no contact for a publisher | 1 |
| Risk: accuracy, licensing, AI policy | partly | Human review now stated (1,619 px), "Not a replacement for reporters" (2,258 px). Licence: `/help/cite.html` 1,009 px, Apache-2.0 for data and code, content licence a gap. AI policy: not stated in the body (footer only) | 2 |

## Lost or misled

- The run-2 contradiction is gone: "31 agents" now reads "and one person who instructs them", and the gate sentence says no person reads a page first.
- Counts still differ: welcome "31 agents", Team "32 agents" and "About two dozen", Accounts "27 of 31".
- Front page: a dense weather console with its title at 5,304 px; had she been sent `/` she would not know what she was looking at.
- "A draft for Dinis Cruz: the words are not yet agreed" (~270 px) still there.
- "The board" link (from "What is open") still leads to a very long page (not re-walked).

## Words not understood

"gate", "sign what they push", "capture", "hash"/"sha256", "by-line" (for agents), "cache reads", "Panel", "Labs", "METAR" (front page), IPMA/ANEPC (never expanded on welcome).

## What would make her act

Forward `/welcome/` to her editor-in-chief: "worth a 30-minute call; they publish without human review, so we would need our own check". To take the call she still needs a "For your newsroom" block (what it took: one person, N agents, money, days; how to start; whom to write to) and a content licence.

## Score

**3 / 5**: the editorial model is now honest and clear, which lowers her risk worry; but the page still never speaks to a publisher who would reuse it, cost stays in tokens, and the content licence is still a gap.

## Against run 2

| Run-2 finding | Status |
|---|---|
| 1 costly: no reuse offer for a newsroom | not fixed: no section, no contact for publishers |
| 2 costly: human review implied, not stated | fixed: "How it is made" (1,619 px) says pages go live after the gate, without a person reading first; a person sends every message |
| 3 costly: content licence missing | partly: cite page states Apache-2.0 for data and code; content licence still "a known gap"; not linked from welcome |
| 4 costly: cost not in money | not fixed: `/accounts/` "Tokens are not converted to money" |
| 5 costly: About is the raw brief; welcome under Data room | fixed: About -> `/welcome/` on every page; no Data room crumb on welcome |
| 6 minor: agent count differs | not fixed: 31 / 32 / "about two dozen" / "27 of 31" |
| 7 minor: board unusable from welcome | not fixed (link unchanged; not re-walked) |
| 8 minor: terms doubts first on Team | fixed: "What Dinis can unblock" moved from 295 px to 4,383 px |
| 9 held: draft notice | unchanged (right while a draft) |
| 10 held: `/agents/` requests api.github.com | not fixed: external_hosts `api.github.com` |

## Findings

1. **costly**: No reuse offer for a newsroom. Where: `/welcome/`, 0 of 4 H2 sections address "use this for your own incident". Measure: run 1, 2 and 3 all report it. Change: one section after "What it is not": what it took, what you would get, how to start, whom to write to.
2. **costly**: Front page gives no clue what the site is. Where: `/`, H1 at 5,304 px of 5,757; only the 12 px "New here?" pill near the top. Change: one line under the warning band: "A sourced record kept by AI agents and one person: what this is" -> `/welcome/`.
3. **costly**: Cost only in tokens. Where: `/accounts/` 538 px; welcome "The costs" (~2,100 px) says "measured in tokens". Change: one money line (model spend so far, measured), labelled.
4. **costly**: Content licence still a gap. Where: `/help/cite.html` 1,009 px. Change: state one; link Licences from welcome "Take the data".
5. **minor**: Agent count differs across four places. Where: welcome ~720 px "31", `/agents/` top "32" and "About two dozen", `/accounts/` "27 of 31". Change: one figure, one source and time.
6. **minor**: AI policy only implied: the welcome body never says how model use is governed; the footer (~2,900 px) is the only mention of the tooling. Change: one line in "How it is made" on the model ledger and its daily cap, linking `/accounts/`.
7. **held**: Draft notice (~270 px): remove on agreement.
8. **held**: `/agents/` still requests `api.github.com`.
