---
title: Follow a word to its source
summary: You read "Web Summit" on this site. Follow it down: the word, its entity, the row that says what it decided, our own capture of the page that said so, and only then the outside address. One real chain, walked link by link.
mount: <div id="studio" data-base="../animations/" data-anim="follow-a-word"><noscript><p class="meta">The player needs JavaScript. The same explanation, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../../app/studio/studio.css"><script src="../../app/studio/characters.js" defer></script><script src="../../app/studio/player.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 02:59 UTC

# Follow a word to its source

You read "Web Summit" on this site. Follow it down: the word, its entity, the row that says what it decided, our own capture of the page that said so, and only then the outside address. One real chain, walked link by link. An explanation from [the Studio](../index.html). The chain from RESTRUCTURE.md ("a word, its entity, the row or edge that says so, the evidence page, the outside address"), at Dinis Cruz's direction of 11 November 2026 (BRIEF.md), walked on files that exist: incident.entities@'s entities/, the timeline, and incident.archivist@'s evidence/, as read on 11 November at 02:29 UTC. Proposed by incident.conductor@web-summit.dinis.

Below: the same storyboard as plain text, every scene in order with its caption.

## 1. The walk

**You read "Web Summit" on a page. How far down can you go?**

1. Start with a sentence anyone can read: the headline. Two words in it, Web Summit, are a thing this site knows about. Dinis's direction (BRIEF.md): "Web Summit, I click on Web Summit."
   At work: a word on a page. (fact) "Web Summit calls off Day 2 (Wednesday) on the government's advice; Day 3 (Thursday) "aims to proceed as planned"".
2. One step down: its entity. A small file that says what the thing is, what else it is called, and what it is joined to. The organisers' other names lead here too. Its page is the site's own page about Web Summit.
   At work: its entity. (fact) "Web Summit calls off Day 2 (Wednesday) on the government's advice; Day 3 (Thursday) "aims to proceed as planned"". [organisation/websummit](../../entities/organisation/websummit.html) (fact) "Decides whether Wednesday's programme runs, changes or is suspended."; added: name: Web Summit; also: the organisers; type: organisation; edges: 9: decided, consulted, has_not_announced, is_expected_to; kept by: incident.entities@, 11 Nov 02:20 UTC.
3. An entity's meaning is its edges, and each edge is a claim with its own label, source and time read. This one is a fact: Web Summit decided that Day 2 will not take place, read on Web Summit's own page.
   At work: its entity. [organisation/websummit](../../entities/organisation/websummit.html) (fact) "Decides whether Wednesday's programme runs, changes or is suspended.". (fact) "Web Summit decided: Day 2 (Wednesday 11 Nov) will not take place."; added: verb: decided; to: [decision/websummit-wednesday](../../entities/decision/websummit-wednesday.html); source: [websummit.com/blog/web-summit/important-event-update-2026/](https://websummit.com/blog/web-summit/important-event-update-2026/); read_utc: 2026-11-10T20:59Z; origin: decisions/graph.json, edge websummit-wednesday.
4. Not every edge is a fact, and the entity does not hide that. The same file holds what others reported (evidence) and what this team expected before the decision came (hypothesis), each marked. *Of the entity's nine edges on 11 November, 02:29 UTC: three facts, four evidence, two hypotheses.*
   At work: its entity. (fact) "Web Summit decided: Day 2 (Wednesday 11 Nov) will not take place.". (hypothesis) "HYPOTHESIS: the organisers suspend or shorten Wednesday".
5. One step down: the row. The timeline's own record of that decision, with a permanent id. It says when the page was published and when it was read, and since tonight it points at something new: our capture of the page.
   At work: the row that says so. (fact) "Web Summit decided: Day 2 (Wednesday 11 Nov) will not take place.". [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) "PRIMARY: Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place" …"; added: at: 10 Nov, 19:09 UTC (the page's own data); read: at source by the lead, 20:58; cites: [websummit.com/blog/web-summit/important-event-update-2026/](https://websummit.com/blog/web-summit/important-event-update-2026/); our capture: [evidence/websummit/2026/11/11/0216-blog-web-summit-important-event-update-2026](../../evidence/websummit/2026/11/11/0216-blog-web-summit-important-event-update-2026.html).
6. One step down: the capture. Not a link to Web Summit, but this site's own record of what that address served when we read it: the time, the hash of the page, a screenshot, and whether it has changed since the capture before.
   At work: our capture. [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) "PRIMARY: Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place" …". "Important event update"; added: read_utc: 2026-11-11T02:16:26Z; sha256_html: a584d39f31a7…39870fca (126,914 bytes); screenshot: 1280 x 1821, sha256 567169d842f1…965cd868; shown; changed: nothing to compare with yet: the first capture; licence: all rights stay with Web Summit; shown as a dated record; by: incident.archivist@.
7. And only then, the last step: out. The outside address, marked as leaving this site. Everything above it is ours and can be checked here. What is beyond it is Web Summit's, and may change tomorrow; the capture will not.
   At work: the outside address. "Important event update". "websummit.com/blog/web-summit/important-event-update-2026/"; added: host: [websummit.com](https://websummit.com/blog/web-summit/important-event-update-2026/); whose: Web Summit's: the last source.

## 2. What the chain is honest about

**What does this chain not prove?**

1. The capture is from 11 November, 02:16. The row says the page was read at 20:58 on the 10th. So the capture shows what the page said five hours after we first read it, not at that moment. Captures began tonight; nothing earlier was kept. *The row records the page's own data: published 19:09:00, modified 19:25:44. The capture is later than both.*
   At work: our capture. [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) "PRIMARY: Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place" …". "Important event update".
2. Two levels give two times for the same reading: the row says 20:58, the entity's edge says 20:59. Two agents read the page a minute apart, and each wrote down its own time. Nothing was tidied to make them agree.
   At work: the row that says so. (fact) "Web Summit decided: Day 2 (Wednesday 11 Nov) will not take place.". [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) "PRIMARY: Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place" …".
3. Not every row can be walked this far. The timeline's 56 rows cite 75 addresses: 54 have a capture, 15 are not captured yet, and 6 never will be, because they are on a social platform or under terms that forbid automated reading. Where there is no capture, the record says so and why. *Counted at 02:59 UTC. Half an hour earlier, minutes after captures began, it was 24 of 70.*
   At work: our capture. "Timeline rows to captures, as read 02:59 UTC".
4. And one link is still indirect. The entity's own list of sources is empty: you get from Web Summit to the capture through the row, not straight from the entity. The chain holds; it is one step longer than it will be.
   At work: its entity. [organisation/websummit](../../entities/organisation/websummit.html) (fact) "Decides whether Wednesday's programme runs, changes or is suspended.". [s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909) (fact) "PRIMARY: Web Summit's own page, "Important event update": "Day 2 (Wednesday, November 11th) will not take place" …".
5. Dinis's words for what this is for (BRIEF.md): "I should be able to connect until I arrive at the last source. And the last source should be a page about the evidence that we have." For this one word, tonight, you can.
   At work: a word on a page. (fact) "Web Summit calls off Day 2 (Wednesday) on the government's advice; Day 3 (Thursday) "aims to proceed as planned"". "Important event update".

## What this simplifies

- One word, one edge, one row, one capture are shown. The entity has nine edges and the page is cited by more than one row; a real walk branches at every step.
- The steps are drawn as clicks. The files and their pages exist (entities/, evidence/, the timeline); whether every word on every page is already a link to its entity was not checked here, and the linking is spreading page by page.
- A capture proves what an address served to us at one moment, by its hash. It does not prove the page said the same thing earlier, or to someone else, or that what it says is true.
- The raw capture (the HTML as served) is in a private vault; the site shows the screenshot only where the source's terms allow, otherwise the hash, the title and a short excerpt. This page's screenshot is shown.
- The counts are as read on 11 November 2026, 02:59 UTC, and they move as captures are made (24 of 70 at 02:29; 54 of 75 half an hour later). evidence/rows.json is right.
- The decision quoted is a record of what Web Summit published on 10 November. For what Web Summit says now, go to Web Summit.

## Read for this

- [entities/organisation/websummit.json (incident.entities@, updated 02:20 UTC)](../../entities/organisation/websummit.html), read 11 November 2026, 02:29 UTC
- [entities/decision/websummit-wednesday.json](../../entities/decision/websummit-wednesday.html), read 11 November 2026, 02:29 UTC
- [timeline.md, row s-1110T1909](../../incidents/2026-11-10-storm-charles/timeline.html#s-1110T1909), read 11 November 2026, 02:29 UTC
- [evidence/rows.json (incident.archivist@, updated 02:26:32 UTC)](../../evidence/rows.json), read 11 November 2026, 02:29 UTC
- [evidence/websummit/2026/11/11/0216-blog-web-summit-important-event-update-2026.json](../../evidence/websummit/2026/11/11/0216-blog-web-summit-important-event-update-2026.html), read 11 November 2026, 02:29 UTC
- [incident.json (the headline)](../../incidents/2026-11-10-storm-charles/incident.json), read 11 November 2026, 02:29 UTC
- [RESTRUCTURE.md (one grammar; the chain a reader can always walk)](../../RESTRUCTURE.html), read 11 November 2026, 02:12 UTC
- [BRIEF.md (Dinis, 11 November, ~02:10 UTC)](../../BRIEF.html), read 11 November 2026, 02:12 UTC

The data this page is drawn from: [animations/follow-a-word.json](../animations/follow-a-word.json).
