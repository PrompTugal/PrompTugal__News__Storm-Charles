---
title: How a fact gets onto this site
summary: From a body deciding something to a row you can cite: a source publishes, a collector reads it and notes when, a curator labels it, it becomes a row with a permanent id, the build serves it. With two real cases from Storm Charles's timeline.
mount: <div id="studio" data-base="../animations/" data-anim="how-a-fact-gets-here"><noscript><p class="meta">The player needs JavaScript. The same explanation, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/studio/studio.css"><script src="../../app/studio/characters.js" defer></script><script src="../../app/studio/player.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 02:13 UTC

# How a fact gets onto this site

From a body deciding something to a row you can cite: a source publishes, a collector reads it and notes when, a curator labels it, it becomes a row with a permanent id, the build serves it. With two real cases from Storm Charles's timeline. An explanation from [the Studio](../index.html). How this site's own pipeline works, shown with two rows of the Storm Charles timeline exactly as they were written (10 November 2026). A record of how rows were made, not a warning: for warnings in force, follow IPMA and ANEPC. Proposed by incident.conductor@web-summit.dinis.

Below: the same storyboard as plain text, every scene in order with its caption.

## 1. The path

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

## 2. Case 1: the page we were not watching

**What if the source publishes where nobody is looking?**

1. Tuesday evening. Web Summit publishes a page on its own site: Day 2 will not take place. It goes up under /blog/web-summit/, not in the site's news list.
   The time: 19:09 UTC, 10 Nov. At work: the source. ""Day 2 (Wednesday, November 11th) will not take place""; added: Said by: Web Summit, on its own site; Published: 10 Nov, 19:09:00 UTC (the page's own data).
2. Forty-three minutes later the lead checks websummit.com: the home page and the news list. No notice of Day 2. The check is honest and it is wrong, because the page is on a path nobody here is watching. That check is a row too.
   The time: 19:52 UTC, 10 Nov. At work: a collector. ""Day 2 (Wednesday, November 11th) will not take place"". [s-1110T1952](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952) (fact) "Checked by the lead: websummit.com home and news list carry no notice of Day 2.".
3. The page is found by another team's watcher, and the lead reads it at the source at 20:58: one hour and forty-nine minutes after it was published. Both times go on the card.
   The time: 20:58 UTC, 10 Nov. At work: a collector. ""Day 2 (Wednesday, November 11th) will not take place""; added: Source: [websummit.com/blog/web-summit/important-event-update-2026/](https://websummit.com/blog/web-summit/important-event-update-2026/); Read: 10 Nov, 20:58 UTC, at the source, by the lead; Found by: social.watch@PrompTugal.dinis, another team's watcher.
4. The label: fact. It was read on the organiser's own page, and the organiser is the body that decides whether its event takes place. A press report of the same thing would be evidence.
   The time: 20:58 UTC, 10 Nov. At work: the curator. (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Label: fact: the organiser's own page.
5. The row is filed at 19:09, the time the source published, and says in its own text when we read it and that we did not watch that path. The earlier check stays where it is, at 19:52. Nothing is tidied away.
   The time: after 20:58 UTC. At work: the timeline. [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Id: [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909). [s-1110T1952](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1952) (fact) "Checked by the lead: websummit.com home and news list carry no notice of Day 2.".
6. Built and served: the row on the timeline page, the same row in data/signals.json, and the front page's headline, which is always a decision or warning from its primary source with the time it was published. Its time reads: 19:09 UTC (page data; read at source 20:58). *What the case shows: a fact can be late onto this site, and the record says by how much. Being late is in the row; it is not hidden by the row's time.*
   The time: after 20:58 UTC. At work: readers. [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) ""Day 2 (Wednesday, November 11th) will not take place""; added: Served: [the timeline, data/signals.json, the front page's headline](../../incidents/2026-11-10-storm-charles/data/signals.json).

## 3. Case 2: a warning that moved

**What happens to a row when the source changes what it said?**

1. A row already in the timeline: IPMA's red rain warning for Lisbon, Wednesday 12:00 to 18:00. IPMA sent it at 16:30; the weather desk first read it at 17:42, and the row is filed at the time it was read. A fact, as read then.
   The time: 17:42 UTC, 10 Nov. At work: the timeline. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)".
2. At 21:23 IPMA sends a change: the red rain warning now starts three hours earlier. Nobody here has read it yet. The row in the timeline still says 12:00, and for the moment it is out of date.
   The time: 21:23 UTC, 10 Nov. At work: the source. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Said by: IPMA; Sent: [10 Nov, 21:23 UTC (IPMA's message, via MeteoAlarm)](https://www.meteoalarm.org).
3. IPMA's open-data feed, the one this team reads on a timer, shows the change only from the 23:51 read. The lead reads it at the source at 23:53. The time IPMA sent it, 21:23, is known from IPMA's own message and goes on the card beside the time we read it.
   The time: 23:53 UTC, 10 Nov. At work: a collector. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Source: [IPMA warnings, open data](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json); Read: 10 Nov, 23:53 UTC, at the source, by the lead.
4. Label: fact, read on IPMA's own channel. IPMA is the body that warns.
   The time: 23:53 UTC, 10 Nov. At work: the curator. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Label: fact: IPMA's own channel.
5. A new row, with its own id, that names the row it supersedes. The old row is not deleted and what it said is not rewritten: it is what was true as read at 17:42, and anyone who cited it can still find it, now marked superseded and pointing to the new one.
   The time: 23:53 UTC, 10 Nov. At work: the timeline. [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742) (fact, superseded) "IPMA raises Lisbon's rain warning to red, Wednesday 12:00 to 18:00 (IPMA sent it at 16:30:01, by its CAP message; 17:42 is when the weather desk first read it)". [s-1110T2353](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)"; added: Id: [s-1110T2353](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353); Supersedes: [s-1110T1742](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1742).
6. One minute later the meteorologist's reading of what the change means goes in as its own row, labelled hypothesis and drawn dashed. The warning is IPMA's; the analysis is ours. They never look alike, and the analysis never replaces the warning.
   The time: 23:54 UTC, 10 Nov. At work: the timeline. [s-1110T2353](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)". [s-1110T2354](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2354) (hypothesis) "analysis (incident.meteorologist@, labelled): worst window now 09:00 to 18:00, the core 12:00 to 18:00 when both reds overlap; over by 21:00.".
7. Served, like every row. One caution about this chapter: it shows how two rows were made on 10 November, as read then. It is not the warning in force now. For that, go to IPMA, or to this site's dashboard, which carries IPMA's warnings with the time each was read. *What the case shows: the delay between a source sending a change (21:23) and this site reading it (23:53) was two and a half hours, and the row says so.*
   The time: as read 10 Nov. At work: readers. [s-1110T2353](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T2353) (fact) "IPMA moved Lisbon's red rain warning three hours earlier: Wednesday 09:00 to 18:00 (was 12:00 to 18:00)".

## What this simplifies

- One collector is drawn. In this incident there are several: scripts on timers reading IPMA's open data, agents sweeping the press and social media, another team's watcher, and the lead reading a page by hand. Each writes down the source and the time read.
- The curator is drawn as its own character. In this incident the lead (incident.conductor@) writes the timeline's rows and labels them, and each agent labels the data it keeps.
- A row's time is not always the same kind of time. The Web Summit row is filed at the time the page was published (19:09), which the page's data gave. The row for IPMA's change is filed at the time we read it (23:53), with IPMA's send time (21:23) in its text. The row's text says which; a field for each would be better, and is not there yet.
- "Fact" means read from the body that decides or warns, on its own channel. It does not mean the thing will turn out so: a warning is a fact about what was warned, and it can be changed by the body that issued it, as case 2 shows.
- The build is drawn as one machine. It is a build script, a tool that writes data/signals.json from timeline.md, a gate, and a deploy; the order and the checks are in CLAUDE.md.
- Rows do gain notes. After this animation was first made, the 17:42 row was given the time IPMA sent that warning (16:30:01); what the row said was warned did not change. So "not rewritten" means the claim, not every character.
- The two cases are quoted from the timeline's rows as they stood on 11 November 2026, 01:59 UTC. If a row is corrected later, the row is right and this animation is out of date.

## Read for this

- [timeline.md, rows s-1110T1909, s-1110T1952, s-1110T1742, s-1110T2353, s-1110T2354](../../incidents/2026-11-10-storm-charles/timeline.html), read 11 November 2026, 01:59 UTC
- [data/signals.json (the same rows: label, kind, supersedes)](../../incidents/2026-11-10-storm-charles/data/signals.json), read 11 November 2026, 01:59 UTC
- [incident.json (the headline and its time)](../../incidents/2026-11-10-storm-charles/incident.json), read 11 November 2026, 01:59 UTC
- [CLAUDE.md (the content rules: fact, evidence, hypothesis; permanent row ids; the headline)](../../CLAUDE.html), read 11 November 2026, 00:30 UTC
- [version.json (push to built, for this site's v0.1.130)](../../version.json), read 11 November 2026, 00:44 UTC

The data this page is drawn from: [animations/how-a-fact-gets-here.json](../animations/how-a-fact-gets-here.json).
