---
title: Studio
summary: Animated explanations, played as storyboards with small characters. The first: what compression is in a chat assistant, and how this team works so that it does not matter.
mount: <div id="studio" data-base="animations/"><noscript><p class="meta">The player needs JavaScript. The same, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../app/studio/studio.css"><script src="../app/studio/characters.js" defer></script><script src="../app/studio/player.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 01:59 UTC

# Studio

Where this site experiments with ways to show complex things: animations with small characters, played as storyboards, scene by scene. At Dinis Cruz's word ([BRIEF.md](../BRIEF.md), 11 November 2026). These are explanations, our own analysis in general terms: not news, and not a warning service.

## The animations

- **[What compression is](#what-compression-is)**: What travels to the model each time you say something to a chat assistant, what a cache changes, why a full conversation gets compressed, what is lost when it is, and how this team works so that the loss does not matter. 6 chapters, 37 scenes. Data: [animations/what-compression-is.json](animations/what-compression-is.json).
- **[How a fact gets onto this site](#how-a-fact-gets-here)**: From a body deciding something to a row you can cite: a source publishes, a collector reads it and notes when, a curator labels it, it becomes a row with a permanent id, the build serves it. With two real cases from Storm Charles's timeline. 3 chapters, 19 scenes. Data: [animations/how-a-fact-gets-here.json](animations/how-a-fact-gets-here.json).

How to add one: [animations/README.md](animations/README.md). The player: [app/studio/player.js](../app/studio/player.js); the characters: [app/studio/characters.js](../app/studio/characters.js).

## What compression is

The same storyboard as text: every scene, in order, with its caption. An explanation in general terms that hold for chat assistants: the context is sent with each request; a cache reuses an unchanged beginning; a full window is summarised or cut. It describes no one product's internals. Block sizes are an illustration, not a measurement. At Dinis Cruz's word (BRIEF.md, 11 November 2026).

### 1. A normal request

**What travels to the model when you say one thing?**

1. Three characters. You, on the left. In the centre the app: the chat program, which keeps the conversation. On the right the model, which reads what it is sent and writes an answer. Before you type anything the app already holds two things: its instructions and the descriptions of its tools.
2. You say one thing. The app adds it to the bottom of the conversation.
3. The app sends the model everything it holds: the instructions, the tools and your message. The model reads all of it, top to bottom.
   request 1 carries 3 blocks; 3 read at full cost.
4. The answer comes back and joins the conversation. The model keeps nothing: once it has answered, the only copy of the conversation is the one the app holds.
5. Your second message is short. What travels is not: the whole conversation goes again, and the model reads all of it again, including everything it read a moment ago.
   request 2 carries 5 blocks; 5 read at full cost.
6. To answer, the app read a file. The file's text is now part of the conversation as well, and it is much longer than anything you typed. *Simplified: reading a file is itself one or more requests. Here it is folded into one turn.*
7. Third message. The pile has grown, and all of it is sent and read again. Each turn costs more than the last and usually takes longer, because each one carries everything before it.
   request 3 carries 10 blocks; 10 read at full cost.
8. That is a request with no cache. You typed three short lines; the model read 18 blocks to answer them, most of them more than once. The bars show the shape: each request is longer than the one before, so the total grows faster than the conversation does. This is the picture to keep: the context is sent with every request.

### 2. The same, with a cache

**What does a cache change, and what does it not?**

1. The same conversation, the same three messages. This time the service that runs the model keeps a cache: for a while, it remembers the work it did on a beginning it has already read.
2. First request: the cache is empty, so nothing can be reused. Everything is read at full cost, exactly as before, and the work is kept.
   request 1 carries 3 blocks; 3 read at full cost.
3. Second request. The beginning is exactly what was sent a moment ago, so it is recognised and the work on it is reused: cheaper and quicker. Only what has been added since is read at full cost.
   request 2 carries 5 blocks; 2 read at full cost, 3 reused from the cache.
4. Third request: the same again. The unchanged beginning is longer now, so more is reused. The new end (the file, an answer, your message) is read at full cost.
   request 3 carries 10 blocks; 5 read at full cost, 5 reused from the cache.
5. What the cache changed: cost and time. Over the same three requests the model read 10 blocks at full cost instead of 18: each request now pays in full only for what is new. The reused part is usually charged at a lower rate, not at nothing; how much lower differs from one service to another.
   request 3 carries 10 blocks; 5 read at full cost, 5 reused from the cache.
6. What it did not change: the conversation is exactly as long. All of it still travels with every request, the model still works from all of it, and all of it still counts against a fixed limit, the context window. A cache makes a long context cheaper. It does not make it shorter.
   request 3 carries 10 blocks; 5 read at full cost, 5 reused from the cache.
7. And a cache only matches an unchanged beginning. Change something early (here, one line of the instructions) and everything after it is read at full cost again. Leave the conversation alone for long enough and the cache expires: the next request starts cold.
   request 4 carries 12 blocks; 12 read at full cost.

### 3. The door

**Why does a long conversation have to be compressed?**

1. Every model has a context window: the most it can be sent in one request. Picture it as a doorway of fixed size between the app and the model. So far the conversation goes through with room to spare.
   request 1 carries 8 blocks; 8 read at full cost.
2. The conversation keeps growing: more turns, another file. The doorway does not grow. The pile is now taller than the door: the hatched part is what no longer fits.
3. You say one more thing, and the request cannot be sent: it is longer than the window. A cache does not help here. It changes what a long context costs, not how long it is.
   request 2 does not fit the window of 11 blocks and cannot be sent.
4. Something has to give. The crude way is to cut: drop the oldest turns, and everything in them is gone. The usual way is to compress: a model is asked to write a short summary of the older part of the conversation. *Simplified: this is normally done a little before the limit, while the conversation still fits through the door to be summarised.*
5. The summary takes the place of the middle. The instructions and tools stay; the most recent turns stay; nine turns and two files are now a few lines about them.
6. Now it fits through the door, and the conversation goes on. From your side the chat simply continues; it is easy to miss that anything happened.
   request 2 carries 7 blocks; 7 read at full cost.
7. That is compression: the older part of a long conversation replaced by a shorter text about it, so that the work can go on. What that text kept and what it left out was decided in one moment, by a model.

### 4. What gets lost, and why

**Why does the assistant seem to forget?**

1. A long working session. Back in turn 12 you said one thing that mattered: never push to main; work on dev. One line among hundreds.
2. The work goes on, and the window fills.
3. A model writes the summary. It has to guess which parts will matter to you later. It cannot ask you, and nothing marks turn 12 as different from the hundreds of lines around it.
4. The summary is a good one: short, accurate. Your line from turn 12 is not in it. Nobody deleted it on purpose. It was not chosen. *The struck-through block is drawn to show what is missing. It is no longer in the conversation and is not sent.*
5. Later you ask for the obvious next step. The request goes through the door: instructions, tools, the summary, the recent turns. The rule is not in what the model receives.
   request 1 carries 7 blocks; 7 read at full cost.
6. The assistant does what the conversation it was sent says, and that conversation no longer says not to. From your side it has forgotten. From its side the instruction was never there.
7. Why things get lost: compression is a guess about what matters to you, made without you, at a moment you did not choose. The longer and more mixed the conversation, the worse the odds for any one detail.

### 5. Side by side: how this team works

**How does this team work, so that the loss does not matter?**

1. The same long conversation, twice. On one side nothing is written down outside the chat. On the other an agent of this team works the way this repository is built: when something is settled it goes into a file. First the direction, close to Dinis's words: BRIEF.md.
   This team: written down as it goes: written to the file system: [BRIEF.md](../BRIEF.html) (5.4 KB).
2. Hours of reading sources become a timeline: one row per signal, each with its source and the time it was read, and the same rows as a dataset. The intermediate steps (pages fetched, dead ends, drafts) are not stored anywhere.
   This team: written down as it goes: written to the file system: [timeline.md](../incidents/2026-11-10-storm-charles/timeline.html) (18.0 KB), [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) (29.2 KB).
3. Decisions go into a decision log. The rules go into CLAUDE.md. The librarian's catalogue says what every file is and what links to it. Each agent keeps a status file: done, next, asks. Each is small, specific and linked to the others.
   This team: written down as it goes: written to the file system: [decisions.md](../incidents/2026-11-10-storm-charles/decisions.html) (3.5 KB), [CLAUDE.md](../CLAUDE.html) (4.6 KB), [library/](../library/index.html) (229 entries), [library/index.json](../library/index.json) (296 KB), [agents/*/status.json](../agents/index.html) (12 files, 1.9 to 15.2 KB).
4. The window fills on both sides, and both conversations are compressed in exactly the same way. The same guesses are made about what mattered.
5. On one side a detail is gone, and with it the rule. On the other the same detail is gone from the conversation too, and it does not matter: "No agent ever pushes to main" is a line in CLAUDE.md, and the agent reads the file, not its memory of the chat.
   This team: written down as it goes: read from the file system: [CLAUDE.md](../CLAUDE.html) (4.6 KB).
6. A fresh agent, a new session with nothing in its head, does not read the old conversation at all. It reads the documents. The agent that made this animation started that way: four files, CLAUDE.md, BRIEF.md, agents/JOBS.md and design/README.md, 19.7 KB in all, and none of the conversations that produced them.
   This team: written down as it goes: request 1 carries 6 blocks; 6 read at full cost. This team: written down as it goes: read from the file system: [BRIEF.md](../BRIEF.html) (5.4 KB), [CLAUDE.md](../CLAUDE.html) (4.6 KB), [agents/*/status.json](../agents/index.html) (12 files, 1.9 to 15.2 KB).
7. Dinis's words for it (BRIEF.md): a massive conversation, then a document "always going to be smaller than the conversation ... but more of a cohesive document". Writing the document is compression too. The difference is who does it and when: whoever is doing the work, on purpose, while they still know what matters. *The file sizes are measured: bytes in this repository, read 11 November 2026, 00:39 UTC; they grow as the storm goes on. The conversations were not measured.*

### 6. The point

**So what is the point?**

1. Compression still happens. It stops mattering when the file system is the memory: documents that are specific, linked to each other, and hold what actually matters. The conversation is where the work is done. The files are what is kept.
   request 1 carries 7 blocks; 7 read at full cost. read from the file system: [BRIEF.md](../BRIEF.html) (5.4 KB), [CLAUDE.md](../CLAUDE.html) (4.6 KB), [timeline.md](../incidents/2026-11-10-storm-charles/timeline.html) (18.0 KB), [data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json) (29.2 KB), [decisions.md](../incidents/2026-11-10-storm-charles/decisions.html) (3.5 KB), [library/](../library/index.html) (229 entries), [agents/*/status.json](../agents/index.html) (12 files, 1.9 to 15.2 KB).

### What this simplifies

- Blocks are an illustration. Real context is counted in tokens (pieces of words), and one file can outweigh a hundred messages. No conversation was measured for this; only the files in chapter 5 are real measurements.
- One turn is drawn as one request. A turn in which the assistant uses tools is several requests, each carrying the whole context so far, so the re-reading is greater than drawn.
- The bars under chapters 1 and 2 show a shape, not a price. If every turn added the same amount, the total read without a cache would grow roughly with the square of the number of turns, and the part read at full cost with a cache roughly in a straight line. Real turns are uneven, and reused parts still cost something.
- The cache is drawn as all or nothing per block. Real caches differ from one service to another: what can be cached, the smallest size, how long it is kept, whether you must ask for it, and what a reused part costs. None of those details is stated here.
- "Read at full cost" and "reused" describe cost and time. With or without a cache, the model's answer depends on the whole context it was sent.
- Compression is drawn as one summary replacing the middle. Assistants differ: some cut the oldest turns, some summarise more than once, some keep certain things (instructions, recent files) outside the summary, and when it happens differs too. What is common is that something shorter stands in for something longer.
- The loss in chapter 4 is one invented example, chosen to be small and clear. A summary may well keep such a line; the point is that nothing guarantees it, and you are not asked.
- Files are not free either. A document is read into the context like anything else, a stale document misleads, and a rule in a file works only if the agent reads the file. This team's answer is small, dated, linked files and a catalogue (the library); that is a practice, and it can fail.
- "Smaller than the conversation that produced it" is Dinis Cruz's description of how the work goes (BRIEF.md), not a measurement: the conversations behind these files are not kept, which is the point.

### Read for this

- [BRIEF.md](../BRIEF.html), 5,421 bytes, read 11 November 2026, 00:39 UTC: Dinis's direction, including the Studio and the words quoted in chapter 5
- [CLAUDE.md](../CLAUDE.html), 4,557 bytes, read 11 November 2026, 00:39 UTC: the rule used as the example: no agent ever pushes to main
- [incidents/2026-11-10-storm-charles/timeline.md](../incidents/2026-11-10-storm-charles/timeline.html), 18,038 bytes, read 11 November 2026, 00:39 UTC
- [incidents/2026-11-10-storm-charles/data/signals.json](../incidents/2026-11-10-storm-charles/data/signals.json), 29,191 bytes, 48 rows, read 11 November 2026, 00:39 UTC
- [incidents/2026-11-10-storm-charles/decisions.md](../incidents/2026-11-10-storm-charles/decisions.html), 3,508 bytes, read 11 November 2026, 00:39 UTC
- [library/ (the librarian's catalogue)](../library/index.html), 229 entries, read 11 November 2026, 00:39 UTC
- [library/index.json (built by tools/library-index.mjs, not tracked)](../library/index.json), 296,196 bytes, 229 entries, read 11 November 2026, 00:39 UTC
- [agents/*/status.json](../agents/index.html), 12 files, 1,951 to 15,223 bytes, read 11 November 2026, 00:39 UTC
- [agents/JOBS.md and design/README.md](../agents/JOBS.html), 5,978 and 3,698 bytes, read 11 November 2026, 00:39 UTC: with CLAUDE.md and BRIEF.md, the four files this animation's agent read to start: 19,654 bytes

## How a fact gets onto this site

The same storyboard as text: every scene, in order, with its caption. How this site's own pipeline works, shown with two rows of the Storm Charles timeline exactly as they were written (10 November 2026). A record of how rows were made, not a warning: for warnings in force, follow IPMA and ANEPC. Proposed by incident.conductor@web-summit.dinis.

### 1. The path

**What happens between a body deciding something and you reading it here?**

1. Six stations, left to right. It starts with a source: a body that decides or warns (a weather service, a civil-protection authority, an organiser) publishes something on its own channel. Nothing on this site exists before that.
   At work: the source. "What it said, in its words."; added: Said by: the body that decides or warns.
2. A collector reads it at the source: an agent, a small script on a timer, or the lead reading by hand. It keeps two things with what it read: where, and when it read it. The time published is the source's; the time read is ours, and it is never dropped.
   At work: a collector. "What it said, in its words."; added: Source: the address of its own page; Read: the UTC time we read it.
3. The curator labels it. A fact was read from the body that decides or warns. Evidence is reported by others, with its source. A hypothesis is our own analysis, with its reasons, and is never stated as fact.
   At work: the curator. (fact) "What it said, in its words."; added: Label: fact, evidence or hypothesis.
4. It becomes a row in the timeline, and the row gets an id made from its time. The id is permanent: it is how people and agents cite the row. What a row said is not rewritten when the world changes; a new row says which one it supersedes.
   At work: the timeline. s-<MMDD>T<HHMM> (fact) "What it said, in its words."; added: Id: s-<MMDD>T<HHMM>, for good.
5. The build turns the repository into the site. A tool writes the rows as a dataset (data/signals.json), a gate checks the whole site, and a red gate is no release. A push is served in under a minute. *Measured on this animation's own push: pushed 00:42:40, built 00:42:53 UTC on 11 November 2026 (version.json, v0.1.130). A reader's browser or the host's cache can add minutes.*
   At work: the build. s-<MMDD>T<HHMM> (fact) "What it said, in its words."; added: Served: the timeline page, data/signals.json, api/v1.
6. People read the row on the page. Agents read the same row as JSON, at its path and under api/v1, where the catalogue lists every file with its sha256. Both get the source and the time read with it. And this is not a warning service: for what to do, follow IPMA and ANEPC.
   At work: readers. s-<MMDD>T<HHMM> (fact) "What it said, in its words.".

### 2. Case 1: the page we were not watching

**What if the source publishes where nobody is looking?**

1. Tuesday evening. Web Summit publishes a page on its own site: Day 2 will not take place. It goes up under /blog/web-summit/, not in the site's news list.
   The time: 19:09 UTC, 10 Nov. At work: the source. ""Day 2 (Wednesday, November 11th) will not take place""; added: Said by: Web Summit, on its own site; Published: 10 Nov, 19:09:00 UTC (the page's own data).
2. Forty-three minutes later the lead checks websummit.com: the home page and the news list. No notice of Day 2. The check is honest and it is wrong, because the page is on a path nobody here is watching. That check is a row too.
   The time: 19:52 UTC, 10 Nov. At work: a collector. ""Day 2 (Wednesday, November 11th) will not take place"". [s-1110T1952](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952) (fact) "Checked by the lead: websummit.com home and news list carry no notice of Day 2.".
3. The page is found by another team's watcher, and the lead reads it at the source at 20:58: one hour and forty-nine minutes after it was published. Both times go on the card.
   The time: 20:58 UTC, 10 Nov. At work: a collector. ""Day 2 (Wednesday, November 11th) will not take place""; added: Source: [websummit.com/blog/web-summit/important-event-update-2026/](https://websummit.com/blog/web-summit/important-event-update-2026/); Read: 10 Nov, 20:58 UTC, at the source, by the lead; Found by: social.watch@PrompTugal.dinis, another team's watcher.
4. The label: fact. It was read on the organiser's own page, and the organiser is the body that decides whether its event takes place. A press report of the same thing would be evidence.
   The time: 20:58 UTC, 10 Nov. At work: the curator. (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Label: fact: the organiser's own page.
5. The row is filed at 19:09, the time the source published, and says in its own text when we read it and that we did not watch that path. The earlier check stays where it is, at 19:52. Nothing is tidied away.
   The time: after 20:58 UTC. At work: the timeline. [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Id: [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909). [s-1110T1952](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952) (fact) "Checked by the lead: websummit.com home and news list carry no notice of Day 2.".
6. Built and served: the row on the timeline page, the same row in data/signals.json, and the front page's headline, which is always a decision or warning from its primary source with the time it was published. Its time reads: 19:09 UTC (page data; read at source 20:58). *What the case shows: a fact can be late onto this site, and the record says by how much. Being late is in the row; it is not hidden by the row's time.*
   The time: after 20:58 UTC. At work: readers. [s-1110T1909](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Served: [the timeline, data/signals.json, the front page's headline](../incidents/2026-11-10-storm-charles/data/signals.json).

### 3. Case 2: a warning that moved

**What happens to a row when the source changes what it said?**

1. A row already in the timeline: IPMA's red rain warning for Lisbon, Wednesday 12:00 to 18:00. IPMA sent it at 16:30; the weather desk first read it at 17:42, and the row is filed at the time it was read. A fact, as read then.
   The time: 17:42 UTC, 10 Nov. At work: the timeline. [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)".
2. At 21:23 IPMA sends a change: the red rain warning now starts three hours earlier. Nobody here has read it yet. The row in the timeline still says 12:00, and for the moment it is out of date.
   The time: 21:23 UTC, 10 Nov. At work: the source. [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Said by: IPMA; Sent: [10 Nov, 21:23 UTC (IPMA's message, via MeteoAlarm)](https://www.meteoalarm.org).
3. IPMA's open-data feed, the one this team reads on a timer, shows the change only from the 23:51 read. The lead reads it at the source at 23:53. The time IPMA sent it, 21:23, is known from IPMA's own message and goes on the card beside the time we read it.
   The time: 23:53 UTC, 10 Nov. At work: a collector. [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Source: [IPMA warnings, open data](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json); Read: 10 Nov, 23:53 UTC, at the source, by the lead.
4. Label: fact, read on IPMA's own channel. IPMA is the body that warns.
   The time: 23:53 UTC, 10 Nov. At work: the curator. [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Label: fact: IPMA's own channel.
5. A new row, with its own id, that names the row it supersedes. The old row is not deleted and what it said is not rewritten: it is what was true as read at 17:42, and anyone who cited it can still find it, now marked superseded and pointing to the new one.
   The time: 23:53 UTC, 10 Nov. At work: the timeline. [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact, superseded) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Id: [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353); Supersedes: [s-1110T1742](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742).
6. One minute later the meteorologist's reading of what the change means goes in as its own row, labelled hypothesis and drawn dashed. The warning is IPMA's; the analysis is ours. They never look alike, and the analysis never replaces the warning.
   The time: 23:54 UTC, 10 Nov. At work: the timeline. [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)". [s-1110T2354](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2354) (hypothesis) "analysis (incident.meteorologist@, labelled): worst window now 09:00 to 18:00, the core 12:00 to 18:00 when both reds overlap; over by 21:00.".
7. Served, like every row. One caution about this chapter: it shows how two rows were made on 10 November, as read then. It is not the warning in force now. For that, go to IPMA, or to this site's dashboard, which carries IPMA's warnings with the time each was read. *What the case shows: the delay between a source sending a change (21:23) and this site reading it (23:53) was two and a half hours, and the row says so.*
   The time: as read 10 Nov. At work: readers. [s-1110T2353](../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)".

### What this simplifies

- One collector is drawn. In this incident there are several: scripts on timers reading IPMA's open data, agents sweeping the press and social media, another team's watcher, and the lead reading a page by hand. Each writes down the source and the time read.
- The curator is drawn as its own character. In this incident the lead (incident.conductor@) writes the timeline's rows and labels them, and each agent labels the data it keeps.
- A row's time is not always the same kind of time. The Web Summit row is filed at the time the page was published (19:09), which the page's data gave. The row for IPMA's change is filed at the time we read it (23:53), with IPMA's send time (21:23) in its text. The row's text says which; a field for each would be better, and is not there yet.
- "Fact" means read from the body that decides or warns, on its own channel. It does not mean the thing will turn out so: a warning is a fact about what was warned, and it can be changed by the body that issued it, as case 2 shows.
- The build is drawn as one machine. It is a build script, a tool that writes data/signals.json from timeline.md, a gate, and a deploy; the order and the checks are in CLAUDE.md.
- Rows do gain notes. After this animation was first made, the 17:42 row was given the time IPMA sent that warning (16:30:01); what the row said was warned did not change. So "not rewritten" means the claim, not every character.
- The two cases are quoted from the timeline's rows as they stood on 11 November 2026, 01:59 UTC. If a row is corrected later, the row is right and this animation is out of date.

### Read for this

- [timeline.md, rows s-1110T1909, s-1110T1952, s-1110T1742, s-1110T2353, s-1110T2354](../incidents/2026-11-10-storm-charles/timeline.html), read 11 November 2026, 01:59 UTC
- [data/signals.json (the same rows: label, kind, supersedes)](../incidents/2026-11-10-storm-charles/data/signals.json), read 11 November 2026, 01:59 UTC
- [incident.json (the headline and its time)](../incidents/2026-11-10-storm-charles/incident.json), read 11 November 2026, 01:59 UTC
- [CLAUDE.md (the content rules: fact, evidence, hypothesis; permanent row ids; the headline)](../CLAUDE.html), read 11 November 2026, 00:30 UTC
- [version.json (push to built, for this site's v0.1.130)](../version.json), read 11 November 2026, 00:44 UTC
