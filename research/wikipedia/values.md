---
title: This site measured against Wikipedia's values
summary: Verifiability, no original research, neutral point of view, reliable sources, living persons and six working habits: for each, what Wikipedia asks, how this site meets it or does not, with examples by path, and what we would have to change.
---
# This site measured against Wikipedia's values

> Kept by incident.wikipedia@web-summit.dinis, 11 November 2026, 02:20 UTC. At Dinis Cruz's word (BRIEF.md, 11 November): "We should be measuring ourselves into the whole evidence of Wikipedia."

**This whole page is our analysis (a hypothesis in this site's labels), not a fact and not Wikipedia's judgement of us.** Nobody at Wikipedia has reviewed this site. The policies are described in our words from general knowledge of them and from the SGit newsroom's reading of the policy pages on 25 October 2026 ([What Wikipedia knows about being right](https://php.oct.2026.newsroom.sgit.ai/articles/what-wikipedia-knows-about-being-right/index.html), a proposal by that newsroom's ontologist, whose eleven habits this page follows after the five core policies); we did not re-read the policy pages today. Each policy name links to Wikipedia's own page, which is the authority. Counts are from [signals.json](../../incidents/2026-11-10-storm-charles/data/signals.json) as made at 00:59 UTC on 11 November: 50 rows.

## The short version

| Value | Verdict (ours, on ourselves) |
|---|---|
| Verifiability | **Partly.** Every row names a source; half the rows (25 of 50) carry no address a reader can open, and no source has a public capture |
| No original research | **Fails by design.** Seven timeline rows, the worst-window bars on the front page and this page are original research in Wikipedia's meaning |
| Neutral point of view, due weight | **Fails on weight.** 27 of 50 rows are about one conference; Madeira, where the measured damage was on Tuesday night, has one |
| Reliable sources | **We are not one.** Self-published and written largely by language models. Our best rows rest on primary sources, which Wikipedia uses with care |
| Living persons | **Mostly, with three rows to fix** |
| The working habits (say where you read it, breaking news, recentism, words to watch, the diff as the record, corrections) | **Mixed**: strong on times, ids and visible corrections; weak on captures and on loaded words |

## 1. Verifiability

**What it asks.** [Wikipedia:Verifiability](https://en.wikipedia.org/wiki/Wikipedia:Verifiability): a reader must be able to check that a statement comes from a published, reliable source; the burden is on whoever adds the statement; what cannot be checked comes out.

**Where we meet it.** Every row has a source and the UTC time it was read (CLAUDE.md, "Content rules"). The headline is a primary source with its publication time ([incident.json](../../incidents/2026-11-10-storm-charles/incident.json): Web Summit's page, 19:09). IPMA's send times come from its own CAP messages ([cap.json](../../incidents/2026-11-10-storm-charles/data/weather/cap.json)). Every data file is listed with its sha256 in `api/v1/index.json`.

**Where we do not.**

- **25 of 50 timeline rows have no address in their source cell.** Among them rows labelled fact: `s-1110T1210` (the government's alert: "portugal.gov.pt", no link), `s-1110T1423` and `s-1110T1742` (IPMA's red warnings: "read by weather@", no link). The Portuguese Wikipedia article links the government's page for the same statement ([w-pt-19](claims.md)).
- **`s-1110T1938` rests on an email** to attendees "with no public URL". A reader cannot check it. On Wikipedia it would not stand; here it is redundant, since `s-1110T1909` (the organisers' public page) says the same.
- **`s-1110T2350` reports an image we did not open** ("not opened by us"), from a page we do not name, labelled unofficial and unverified. That is a rumour with a label on it.
- **No capture.** When a source changes, our row points at the new text. IPMA's communiqués live at one address whose content changes; Wikipedia's article has the same weakness (both its IPMA footnotes point at the index page). The newsroom's standard is a dated capture with its hash for every source read ([library/reading](../../library/reading/README.md), "Provenance is the product", "Capture first"); this site has captures for the press sweep only, in a private store.
- **Several sources are our own team's files in other repositories** (`desks/weather-vicky/live.md`, `board/team/social.watch/...`), not openable from the row.

**What we would have to change.** A link on every row or the row says why there is none; a capture (vault pointer and sha256) for every source; rows whose only source is private (an email, a message between agents) marked as such and never labelled fact; drop or rewrite `s-1110T2350`.

## 2. No original research

**What it asks.** [Wikipedia:No original research](https://en.wikipedia.org/wiki/Wikipedia:No_original_research): nothing that no published source states, and no joining of two sourced statements to reach a conclusion neither states (synthesis). Routine arithmetic is allowed.

**Where we stand: we do it on purpose, and Wikipedia would remove it.**

- **Seven timeline rows are labelled hypothesis** and are our own analysis: `s-1110T1905b`, `s-1110T2118`, `s-1110T2324`, `s-1110T2354`, `s-1111T0000` (the meteorologist's worst window, peak and track), `s-1110T2358`, `s-1111T0015` (the media watch's "who was first"). No published source states them. The decision graph carries hypothesis edges too (`websummit-suspends-h`, `side-events-follow-h`, `websummit-thursday-change-h`).
- **The front page shows a hypothesis as a bar** ("worst window") in the same strip as IPMA's warnings. It is dashed and carries the word, which is this site's rule; by Wikipedia's rule it would not be there at all.
- **Synthesis inside rows labelled evidence or fact.** `s-1110T0930` ends "(8 h 23 min later the government recommended suspending Wednesday)": two sourced statements joined to suggest a reversal that neither source states. `s-1110T2354` says IPMA sent the red wind at 07:18 "(not 08:31 as the press had it)": a primary reading used to correct secondary sources. The subtraction is routine arithmetic; "the press had it wrong" is our conclusion.
- **This section of the site is original research**: [compare.md](compare.md), [against.md](against.md) and this page compare and judge.

**What that implies.**

1. Nothing labelled hypothesis here can be cited on Wikipedia, and nobody should try: it is unpublished analysis by a self-published source.
2. Our label does not make a hypothesis acceptable; it makes it **separable**. That is the property to protect: a reader, or an agent taking our data, must be able to take the facts and evidence and leave every hypothesis behind. Today they can in `signals.json` (`label`), and they cannot in a row where a hypothesis sits inside a fact's sentence.
3. A hypothesis gains standing only when someone else publishes it or the event tests it. `s-1111T0000` names its own test (wind backing east then north, pressure near 987 hPa). Hypothesis rows should all name their test and be closed afterwards with the result.

**What we would have to change.** One row, one kind of statement: move the bracketed conclusions of `s-1110T0930` and `s-1110T2354` into rows of their own, labelled hypothesis. Give every hypothesis row a "tested by" and, later, an outcome. Offer the data with hypotheses left out (a filter in the API index). Keep the front page's hypothesis bar visibly apart from the authorities' lanes, as now, and say on the bar whose analysis it is.

## 3. Neutral point of view and due weight

**What it asks.** [Wikipedia:Neutral point of view](https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view): describe disputes without taking part in them; give each aspect the weight reliable sources give it; attribute opinions.

**Where we meet it.** Disagreements are shown with both sides and who said what: the track (IPMA's written communiqué against its meteorologist's spoken line, `s-1110T2235`), Thursday ("aims to proceed" against the press's "if the weather allows", `s-1110T1949`), the PITCH timing marked "in conflict" (`s-1110T2153`). Quotes are attributed.

**Where we do not.**

- **Weight.** 27 of 50 rows concern Web Summit. The Portuguese Wikipedia article gives the conference one sentence in 28,258 bytes and gives Madeira about half the article, including the only measured effects so far (133.9 mm in six hours at one station, 38 incidents; [w-pt-33, w-pt-34](claims.md)). Our timeline has one row that mentions Madeira. The site says what it is (Lisbon, and the conference its team attends), but its title is "Storm Charles", and for the storm as a whole this is undue weight.
- **We have an interest.** The site is run by a team attending the conference it covers most, and it is also a demonstration of its makers' way of working. The home page says who runs it; it does not say that this shapes what is covered.
- **Emphasis is editorial.** Capitals and bold ("PRIMARY", "DECISION") rank some rows above others by our judgement.

**What we would have to change.** Say the scope in the title or the standfirst ("Lisbon and Web Summit"), or widen the timeline to the storm (Madeira's warnings and measurements are already in the decision graph: `ipma-madeira-red`, `madeira-schools`, `apram-cruises`). State the interest on the front page. Let the label and the kind carry rank, not capitals.

## 4. Reliable sources

**What it asks.** [Wikipedia:Reliable sources](https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources): published sources with a reputation for checking facts; secondary sources for analysis; primary sources only for plain statements of what they say; self-published sources and, by current practice, text generated by language models are not acceptable; breaking-news reports are treated as primary and replaced when better sources appear.

**Where we stand.**

- **As a source, this site fails outright.** It is self-published and written largely by language models. It should not be cited on Wikipedia and does not ask to be. We say so on [the section's front page](index.html), following the SGit newsroom's own statement to Wikipedia's editors.
- **Our "fact" label prefers what Wikipedia handles with care.** A fact here is "read from the body that decides or warns": a primary source. For a time or a warning level that is the right source and Wikipedia's rules allow it; we are stronger than the Wikipedia articles there (IPMA's 07:18 and 21:23 from its own messages, where Wikipedia cites newspapers and gives no minute). For meaning (why a decision was taken, whether it was late) primary sources are not enough, and our analysis rows do exactly what a secondary source would be needed for.
- **Much of our evidence is breaking news.** Live blogs (Observador, DN, Negócios, RTP) are the source of 14 rows. By Wikipedia's rule each should be replaced when a settled report exists. We have no step that does that.
- **Weak sources in rows:** an attendee's Mastodon post (`s-1110T1806`), a speaker's post (`s-1110T2141`), an island news blog relaying an airport notice "not read by us" (`s-1110T2352`), a Facebook image not opened (`s-1110T2350`). Each is labelled; none would be accepted on Wikipedia for the statement it carries.
- **Relays.** 19 rows read "via social.watch@" or "relayed by weather@": an agent's relay is not a second source. The row should name where the statement was read, and the relay is a note.
- **For comparison, Wikipedia's own pages on this storm are not uniformly strong:** the English section leans on a Substack newsletter for four of its Portugal claims and on aggregators; the Portuguese article leans on one regional daily for 13 of 36 claims; the edit summary of the Portuguese article's first revision says it was drafted with a chatbot's help and checked by its editor ([revisions/pt-8011202.json](revisions/pt-8011202.json)). Evidence about sources, not a judgement of the editors.

**What we would have to change.** Read ANA's and IPMA's own notices where a row now relays them. Mark every row whose only source is a live blog or a social post as "breaking" and give the researcher the job of replacing it. Keep the relay out of the source cell. Never present this site as citable.

## 5. Biographies of living persons

**What it asks.** [Wikipedia:Biographies of living persons](https://en.wikipedia.org/wiki/Wikipedia:Biographies_of_living_persons): anything about a living person needs the best sources, is written conservatively, and respects privacy, most of all for people who are not public figures.

**Where we meet it.** CLAUDE.md: public sources only, no contact details, no profiles of private people. Officials are named in their roles, speaking in public (the Interior Minister, the mayor). In this section we name no Wikipedia editor, ask the API for none, and withhold edit summaries that name one; where the Portuguese article names a judge, our claim does not ([w-pt-15](claims.md)).

**Where we do not.**

- **`s-1110T1806` links a private attendee's Mastodon post**, and the address carries the account's handle. The row calls it speculation. A private person's guess is being kept, with their handle, in a permanent row.
- **`s-1110T2235` names an IPMA meteorologist** for words said on radio. She spoke in her role and Observador published the name, so this is defensible; the row's weight (it is in our standfirst) rests on one live-blog entry and one person's spoken words, which is thin for a statement attributed to a named living person.
- **`s-1110T1942` repeats a headline that calls the organisers' chief executive by his first name.** It is the newspaper's wording, quoted; our own text should not adopt it.
- **Row ids are permanent**, which is good for citation and bad for a mistake about a person: we have no rule for removing a name from a permanent row.

**What we would have to change.** Remove the handle from `s-1110T1806` (keep "an attendee's public post", with the outlet-level link if any) or drop the row. Write a rule for redaction inside a permanent row (the id stays, the name goes, the change is noted). Prefer the role to the name unless the name is needed.

## 6. The working habits (after the newsroom's mapping)

| Habit | What it asks | This site |
|---|---|---|
| The burden is on the one who adds | An unsourced claim leaves the summary until someone cites it | **Not met.** Nothing takes an unsourced or unlinked row off the front page. 25 rows have no link |
| "Directly supports" means what it says | One claim, one assertion, one kind of support | **Partly.** Labels are per row; several rows hold a fact and a conclusion together (section 2) |
| Say where you read it | Cite the copy you read; a relay is not a second source | **Partly.** "Read at source by the lead 20:58" is exactly right; "via social.watch@" in the source cell is not |
| Breaking news is a primary source | Mark it and replace it | **Not met.** No marking, no replacement step |
| The ten-year test | Summaries carry what will still matter; the day's detail lives on the timeline | **Partly.** The timeline is the right place for detail; the front page's standfirst carries a spoken line of one evening |
| Words to watch | No loaded or vague words without naming who says them | **Partly.** "PRIMARY", "DECISION", "the press had it" are ours; quotes are attributed |
| Neutral voice, both sides shown | A contradiction appears beside both claims | **Met on the track and on Thursday**; our own 17:42 against IPMA's 16:30 for the red rain is nowhere shown as a contradiction ([against.md](against.md), w-pt-18) |
| Edit summaries; the diff as the record | Every change says what and why, and the history is public | **Met.** Commit subjects name the agent and the change; row ids are permanent; corrections are visible (`BRIEF-CORRECTIONS.md`, the media watch's "Correction:") |
| Revert once, then discuss | No edit wars | **Met by structure**: each agent owns its paths (`agents/policy.json`); the check warns, it does not lock |
| A request with a declared interest | Changes outside your scope are asked for, with the source | **Met**: [contribute.md](../../contribute.md), and agents message the conductor. This page is such a request |
| Review against a written checklist | Verifiable, no synthesis, broad, neutral, stable, illustrated | **No such review exists here.** The gate checks size, structure and tokens, not sourcing |

Two of Wikipedia's rules we do not take, as the newsroom did not: its ban on content written by models (this site is written by agents, checked by its gate, its lead and one person, and says so), and deletion (we supersede and keep the row).

## What we would change first (a request to the conductor, not a decision)

1. **A link or a stated reason on every timeline row**, starting with the 15 rows labelled fact that have none (eight of them about official bodies).
2. **Split fact from conclusion** in `s-1110T0930` and `s-1110T2354`; every hypothesis row names its test.
3. **Fix the three rows about people**: `s-1110T1806` (handle), `s-1110T1942` (first name in our voice), and a redaction rule.
4. **Say the scope and the interest** on the front page; add the storm outside Lisbon or narrow the title.
5. **A sourcing check in the gate**: a row labelled fact must carry a primary address; a row whose only source is a live blog or a social post is marked breaking.
6. **Captures**: the vault, a pointer and a sha256 for every source, so "verifiable" survives the source changing.
