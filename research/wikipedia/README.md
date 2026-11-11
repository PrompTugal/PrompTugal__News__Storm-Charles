---
title: Wikipedia and Storm Charles
summary: Every Wikipedia page on Storm Charles, in every language that has one, tracked as data: the pages, their revisions, what each states and cites, the languages compared, and this site measured against Wikipedia's own standards.
mount: <div id="wiki-growth" data-base="./" data-signals="../../incidents/2026-11-10-storm-charles/data/signals.json" data-timeline="../../incidents/2026-11-10-storm-charles/timeline.html"><p class="meta">The pages and the chart are drawn here from <a href="articles.json">articles.json</a>, <a href="revisions.json">revisions.json</a> and the timeline's <a href="../../incidents/2026-11-10-storm-charles/data/signals.json">signals.json</a>. Without JavaScript, read those files.</p></div>
head: <link rel="stylesheet" href="growth.css"><script src="growth.js" defer></script>
---
# Wikipedia and Storm Charles

> Kept by incident.wikipedia@web-summit.dinis, 11 November 2026, 03:50 UTC. At Dinis Cruz's word (BRIEF.md, 11 November, ~01:28 UTC): "a complete section with a separate folder, separate data set, for Wikipedia, to track everything that's there that is related to this storm". Built on incident.media@'s first read ([research/media/wikipedia.json](../media/wikipedia.json)).

**Everything here is evidence.** Wikipedia is a tertiary source written by volunteers: what it states is reported here as what Wikipedia states, with the exact revision, never as a fact about the storm. Where we compare or judge, it is our analysis and says so. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## What we found (first read, 11 November, 01:37 to 01:42 UTC)

- **Portuguese has an article of its own**: [Depressão Charles](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles), created 10 November at 13:07 UTC, 28,258 bytes and 46 footnotes at 01:33 UTC on 11 November.
- **English has a section, not an article**: "Storm Charles" in [2026–27 European windstorm season](https://en.wikipedia.org/wiki/2026%E2%80%9327_European_windstorm_season#Storm_Charles) (the section first appears in the revision of 9 November, 22:35 UTC; 12,198 bytes and 29 footnotes now), and a redirect, [Storm Charles](https://en.wikipedia.org/w/index.php?title=Storm_Charles&redirect=no), made 10 November at 22:46 UTC.
- **Chinese has a short section** in its page for the same season (1,336 bytes), and **French names Charles** in its season article without a section of its own. The Portuguese article on the storm before it, Depressão Bruna, names Charles too.
- **No page found** in Spanish, Galician, German, Italian, Catalan, Dutch, Basque or Simple English under the names their press uses, by title or by phrase search; the English season article links to no page in those languages. Wikidata (items Q142101629 for the storm, Q140628909 for the season) did not answer until the read of 05:47 UTC; it lists one sitelink for the storm, the Portuguese article. What was asked of each wiki is in `checked` in [articles.json](articles.json): absence is what we looked for and did not find, not proof that nothing exists.
- **The two languages tell different storms.** Portuguese is about decisions and effects in Madeira and mainland Portugal, nearly all from the Portuguese press and IPMA. English is about where the low came from (the US National Hurricane Center's outlooks from 3 November) and Spain (AEMET, the Canary Islands, Ávila). Claim by claim: [compare.md](compare.md).

## Against our timeline, in short (our analysis; [against.md](against.md))

- **Wikipedia was ahead of us, and is a lead, never the source.** At the first read 34 of its 61 claims were nowhere on this site and 13 were in our data with no timeline row. The conductor sent them to the researcher and the meteorologist to check at the bodies themselves; the timeline gained five rows. At the 03:44 read (62 claims): 16 match a row, 12 are in our data, 29 are not on this site, 1 differs (Madeira's incidents: Wikipedia says 71 to 02:00 since its 03:25 revision; our row has a bulletin's "more than 50") (most are outside Lisbon: Spain, the Canary Islands, Madeira's local measures).
- **Checked at the primary source: 18 verified, 2 press only, 4 not established, 38 not checked by us.** Not established: the environment agency's "101 municipalities" (no such notice on its site), the airline's "ten flights" (the press says "several"), "Madeira's courts closed" (the order is national), and the day the US Hurricane Center labelled the low (6 November in its own text, not 7; and no source says that low became Charles).
- **Whom the Portuguese article rests on:** 46 footnote marks, 36 distinct sources: 5 primary bodies, 31 press; 4 of the press footnotes name Lusa (13%, a floor: a footnote shows the wire only when it names it).
- **We are ahead of Wikipedia on time.** Neither language has the minute of any of our five key facts. Neither has IPMA's move of Lisbon's red rain to 09:00 (sent 21:23): both still say 12:00. Neither has the 22:35 spoken line on the track further south. Portuguese has Web Summit's Day 2 since the revision of 00:50 UTC on 11 November, 5 h 42 min after the organisers' page, citing ECO; English and Chinese do not mention the conference.
- **One of our own rows was off, and is corrected:** `s-1110T1742` gave 17:42 for Lisbon's red rain, the time our desk read it; IPMA sent it at 16:30. The row now says both.
- **Measured against Wikipedia's policies** we fail "no original research" by design and "due weight" on Madeira: [values.md](values.md).

## The data

| File | What it holds |
|---|---|
| [articles.json](articles.json) | Every page: language, title, address, page id, kind (article, section, redirect, mention), created, bytes, revisions, last changed, time read; and `checked`: every title and phrase asked of each wiki, found or not |
| [revisions.json](revisions.json) and [revisions/](revisions.json) | The full revision history of each page, one file per page: revision id, time, bytes, edit summary; for revisions since 8 November also the sha256 of the wikitext, its footnotes and the bytes of the storm's section. **No editor's name or address is requested or kept**; a summary that names an editor (a revert) is withheld, and so is the product name of a chatbot where an editor's summary gives one |
| [reads.json](reads.json) and [changes.md](changes.md) | One entry per read, appended and never rewritten; and what changed on Wikipedia since the read before |
| [claims.json](claims.json), page: [claims.md](claims.md) | 62 checkable statements of the current revisions (37 pt, 22 en, 3 zh), in our own English, each with the footnotes it carries (address, outlet, date, date consulted) and the revision in which it first appeared |
| [compare.json](compare.json), page: [compare.md](compare.md) | The languages side by side, topic by topic; seven places where they differ |
| [against.json](against.json), page: [against.md](against.md) | Wikipedia against our timeline, both ways: each claim against our rows by permanent id; each of our key facts against Wikipedia, with the revision in which it first appeared |
| [values.md](values.md) | This site measured against Wikipedia's policies (verifiability, no original research, neutral point of view, reliable sources, living persons) and the working habits the SGit newsroom mapped for its own agents |
| [claims-curated.json](claims-curated.json) | The hand-kept source of the three files above: the paraphrases, the anchors and the relations |

The tools: [tools/wikipedia-read.mjs](../../tools/wikipedia-read.mjs) (re-reads and appends), [tools/wikipedia-claims.mjs](../../tools/wikipedia-claims.mjs) (claims, comparison, both-ways table) and [tools/wikipedia-lib.mjs](../../tools/wikipedia-lib.mjs); no dependencies. Also: [what changed since the last read](changes.md).

## How we read Wikipedia, and what we do not do

- **Read-only.** No agent of this site edits Wikipedia, posts on a talk page, or asks to be cited or linked. This site is self-published and written largely by language models: by Wikipedia's own rules it is not a reliable source for an article.
- **Slowly.** The MediaWiki action API with `maxlag=5`, one request every 5 seconds, a generic client name with no personal details. When the API answers 429 or reports lag we wait as long as it says and count it in [reads.json](reads.json).
- **No editors.** We never ask for the names or addresses of editors. Times, sizes and edit summaries only.
- **Licence.** Wikipedia's text is [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), by Wikipedia's contributors. We quote it sparingly, attribute it, and link the exact revision (`oldid`). The wikitext of each revision is kept outside git; git holds its sha256. Edit summaries are the editors' own words under the same licence.
