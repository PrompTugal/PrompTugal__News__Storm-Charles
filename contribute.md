---
title: Contribute: add or correct a fact
mount: <div data-board-embed="tasks" data-base=""><p class="meta">The live task list needs JavaScript. The same list as a page: <a href="board/tasks.html">the contributor tasks</a>.</p></div>
head: <script src="app/board/board.js" defer></script>
---
# Contribute: add or correct a fact

> Kept by incident.media@web-summit.dinis, 2026-11-11, 03:20 UTC.

This site records Storm Charles (Lisbon, 10 to 12 November 2026) from public sources. If you are a journalist, a specialist or a reader, here is **what you can do right now**: pick a task, open an issue with its number, and it goes in within minutes if it carries a source, two times and a label ([below](#what-a-good-contribution-carries)).

**Not a warning service.** For what to do now, follow [IPMA ↗](https://www.ipma.pt/), [ANEPC ↗](https://prociv.gov.pt/) and your local authorities. Nothing here is advice.

## What you can do right now

**The live list is at the top of this page** (it needs JavaScript) and as its own page: [the contributor tasks](board/tasks.md). It is kept as data by incident.board@ ([the board](board/index.html)); each task says what is missing, who is best placed, and what a finished answer looks like. Three kinds:

- **Send us public data** (C-01 to C-05, and more): who first reported IPMA's 21:23 change; a published text of the government's recommendation to Web Summit; each operator's notice of Wednesday's and Thursday's service; first reports from outlets our reader cannot open.
- **Validate** (C-06 to C-09, and more): your by-line and time; our reading of your outlet's terms; the weather analysis; live-blog entry times; any row of the timeline against its source.
- **Research** (C-10 to C-13, and more): who is quoted on the storm and in what role; wind limits of temporary event structures; Charles against Kristin; coverage in other languages.

To take one: open an issue titled with the task's number, [here ↗](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/issues), carrying the four things below.

**One task is on hold (C-04):** what Web Summit told attendees by email and in its app. Those are private messages, and this site takes public sources only; until the lead decides whether and how such a notice may come in, please send only notices the organisers published themselves.

The questions we would put to official bodies are in [outreach](outreach/index.html), and who we would like to talk to, and why, in [who](outreach/who.md).

## What a good contribution carries

Four things. With these four it can go in within minutes; without them we have to ask.

| | What | Example |
|---|---|---|
| 1 | **The claim**, in one sentence | "Metro de Lisboa closed the Blue line between A and B." |
| 2 | **The source**: a public URL that anyone can open. The body that decides or warns is best (IPMA, ANEPC, the government, the Câmara, the operator, the organiser); otherwise a published report | `https://…` |
| 3 | **Two times, in UTC**: when the source published it, and when you read it. Lisbon is on UTC in November | published 10 Nov 19:09; read 10 Nov 20:58 |
| 4 | **A label**: fact, evidence or hypothesis (below) | fact |

### The three labels

- **Fact**: read from the body that decides or warns, on its own channel. IPMA's warning on IPMA's site. Web Summit's decision on Web Summit's page.
- **Evidence**: reported by someone else, with the source named. A newspaper saying what the organisers said is evidence of the decision, not the decision.
- **Hypothesis**: analysis, yours or ours, with its reasons. It is never written as a fact, and it never outranks a warning from the authorities.

If you are not sure which label applies, say what you know about where the claim comes from and we will label it.

## Three ways in

1. **Open an issue** (the quickest, no git needed): [github.com/PrompTugal/PrompTugal__News__Storm-Charles/issues](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/issues). Title: `Correction: …` or `Addition: …`. Body: the four things above, and the page or data file it concerns.
2. **Open a pull request to the `dev` branch** (never `main`): edit the markdown or JSON directly. Each page has a markdown twin (the same address ending in `.md`) and each dataset is listed in [the data catalogue](api/v1/index.json) with its file path. Keep the change small: one fact, one commit. Files stay under 256 KB; no images, PDFs or page captures (those live in vaults, not in git).
3. **You are quoted or named here and it is wrong**: open an issue titled `Correction: by-line` or `Correction: quote`. Corrections to how a person or body is represented go first.

Machines are welcome too: an agent can read [llms.txt](llms.txt), find the dataset, and open the same issue or pull request with the same four things.

## What we check before it goes in

- We open the source ourselves and record the time we read it. A claim whose source we cannot open stays out, or goes in as evidence with that said.
- A fact needs its primary source. If only a report exists, it goes in as evidence until the primary source is found.
- Where two sources disagree, both are shown, each with its time, and the disagreement is marked. We do not pick one silently.
- An incident team of agents, run by a named person (Dinis Cruz), reviews and merges to `dev`. A release to `main` is merged only by him.

## What we publish back

- **Credit**: your contribution is credited as you ask: your name and role, your organisation only, or no name at all. Tell us which in the issue. The default, when you say nothing, is the public handle the issue or pull request was opened with, exactly as GitHub already shows it.
- **Provenance**: the item carries its source URL, the time the source published it, the time it was read, its label, and who contributed it. All of it is in the page and in the JSON, and the change itself is in the repository's public history.
- **Corrections stay visible**: when something here was wrong, the correction says what was wrong, what is right, and when it changed. Nothing is silently rewritten.
- **The data, for you to reuse**: every dataset is served as JSON with a sha256 in [the catalogue](api/v1/index.json). The media watch (who published what, when) is in [research/media/](research/media/index.html).

## What we do not take

- Anything from a private message, a closed group or a page behind a login.
- Contact details, home addresses, or anything about private individuals. People appear here only in a public professional role: a by-line, an official statement.
- Whole articles or broadcast transcripts. Press text is quoted in short excerpts with a link.
- Images or video without a licence that allows reuse.
- Forecasts or safety advice of our own, or yours. A specialist's reading is welcome as a labelled hypothesis, with its reasons and your name or role if you want it shown.

## For journalists

- If your article or live blog is in [the coverage list](research/media/index.html) with the wrong time or by-line, or is missing, an issue with the URL is enough: times and by-lines there are copied from each page's own metadata, so a fix at your end also fixes ours at the next read.
- If you use this site's data, a link to the page or dataset is the credit we ask for. Each has a stable address.

## For specialists

We have open questions for meteorology, civil protection, transport and event safety. They are listed, by field, in [outreach/](outreach/index.html). An answer to any of them, with your reasons and what it rests on, can come in as an issue. Say whether it is your own professional view or your organisation's position: the two are labelled differently.

---

Kept by incident.media@web-summit.dinis for the incident team. This page is itself open to correction, by the same route.
