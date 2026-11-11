# How this project got here, in a page

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 03:07 UTC. For an agent that starts now and was not here. Each paragraph points at the file to open for depth. Where incident.reporter@ has a trace (one workflow from Dinis's word to a live page, every step with its evidence), the paragraph is cut to a line and points at the trace: six so far, listed in [[file:reporter/traces/index.json]]. The paragraphs with no trace yet are the librarian's, from the brief, the commits and the release history. [The pack](README.md).

**10 November, about 18:35 UTC: an incident is declared.** Storm Charles is forecast to reach Lisbon on Wednesday 11 November, Web Summit's second day. Dinis Cruz has his agents run it as an incident (WS-214), at first inside another repository (SGit-AI__Website__Web-Summit). A conductor, a meteorologist, a researcher and a dev begin: a timeline, the weather as data, a graph of who decides what. [[file:incidents/2026-11-10-storm-charles/README.md]]

**19:09 to 19:52: the decision, and a miss.** Web Summit calls off Day 2 on the government's advice. Its page carried this from 19:09; the team saw it 43 minutes later, because nothing was watching that part of the organiser's site. The lesson became a tool that reads every listing on a short cycle, and a rule: a statement is evidence until the deciding body's own channel carries it. [[file:incidents/2026-11-10-storm-charles/timeline.md]]

**About 21:10: its own repository, built to be fast.** Dinis asks for a separate site that publishes "super fast", serves people and agents, and keeps everything bulky out of git. First push 21:14; the first version to be served, v0.1.2, a minute later. One CI job, a gate that must pass in 5 seconds, and CI, not the agent, numbers each version. [[file:PIPELINE.md]] [[file:BRIEF-CORRECTIONS.md]]

**About 23:40: the site becomes the centre, and the team grows.** "All information, all documents, all briefs should be on the site"; "maximum visibility into every agent"; the home page as a weather presenter. Seven agents start: designer, observability, identity, weatherwatch, media, librarian, graph. Within the hour: design rounds, an agents page, a log-in design, the catalogue of every file, the storm as one graph and a query page. [[file:BRIEF.md]] [[file:agents/JOBS.md]]

**Around midnight: the pipeline is corrected by what it showed.** A version whose deploy was recorded as cancelled turned out to be live; CI stopped cancelling a running deploy and now fails unless the live site serves the version. A path policy and its check were added: each agent changes only its own folders. [[file:library/releases.md]] [[file:agents/policy.json]]

**00:30 to 02:00, 11 November: the Studio and Wikipedia.** Explanations as small animated storyboards; Wikipedia's claims about the storm, each checked at its primary source. [[file:studio/README.md]] [[file:research/wikipedia/README.md]]

**02:10 and 02:20: round two** (the reporter's traces). Dinis goes through the site page by page; thirteen more agents are named at 02:07 and all have shipped by 02:45. The contract: [[file:RESTRUCTURE.md]]; the round, to print: [[file:news/2026-11-11-round-two.md]]. Three traces of it, by size:

- *medium*: "create a complete new homepage right now" to / as the Weather face at 02:19:08, 12 min 26 s later; three agents in a relay. [[file:reporter/traces/medium-new-homepage-to-the-swap.json]]
- *large*: "every word here needs to have a reference" to the chain word, entity, row, our capture, outside address, in thirty minutes; one contract split into owned parts. [[file:reporter/traces/large-every-word-needs-a-reference.json]]
- *small*: "where's everything about the Metro?" to an entity page holding the researcher's file, 24 minutes later; four agents. [[file:reporter/traces/small-metro-sentence-to-entity-page.json]]

**02:25: the build's budget nearly breaks, and holds.** One page per file took the gate to 4.0 of its 5 seconds; the file viewer became one page that reads files in the browser. The rule that came of it: anything that grows with the site must not cost a page per item. [[file:tools/library-view.mjs]]

**02:50: the project turns to its own cost and memory.** A model budget of 20 dollars a day; an accountant; a reporter and a journalist on the project itself; and this pack: "the librarian saves tokens and makes it cheaper and implements memory in a much more effective way." [[file:BRIEF.md]]

**The whole arc as one trace**: the voice memo at about 19:00 on 10 November to the two faces at 02:19 on the 11th, 28 steps, nine of them Dinis's. [[file:reporter/traces/arc-voice-memo-to-two-faces.json]] **How asks to Dinis wait and are answered**: [[file:reporter/traces/escalation-asks-waiting-on-dinis.json]]

## What has gone wrong, and what it changed

Three of these as a trace (a private address withheld, facts relabelled evidence, a hypothesis re-weighed; each found by another agent than the one that made it): [[file:reporter/traces/correction-three-fixes-in-the-open.json]]. All seventeen corrections, as journalism: [[file:journal/mistakes-made-in-the-open.md]].

| What happened | What it changed |
|---|---|
| The organiser's decision was public for 43 minutes before we saw it | a watcher on every listing of its site |
| Rows resting on the press were labelled fact | eight relabelled evidence at 02:18; the rule restated |
| A cancelled deploy was live; green did not mean served | CI finishes a running deploy and fails if the version is not served |
| The catalogue, then the commit record, outgrew 256 KB | the gate refused both pushes; both are now generated or split |
| A page per file nearly broke the 5-second gate | the viewer is one page; no page per item |
| 23 captures were of the wrong addresses | removed by the archivist within the round, and said |
| Timestamps were written ahead of the clock | use `date -u`, never a guess |
