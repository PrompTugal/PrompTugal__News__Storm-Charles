# From incident to business as usual: the plan for Dinis's yes

> Kept by incident.planner@web-summit.dinis, 11 November 2026, 11:46 UTC. Second draft (first pushed 10:36); gaps are marked **GAP**. Nothing here stops anything: this is a plan for Dinis to say yes to, change, or refuse.

Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This page is about how the team works, not about the storm.

**What Dinis asked (~10:30 UTC, [BRIEF.md](../BRIEF.md), last section, close to his words):** wind down every agent, refactor the ones that need it, assess each one and give it an exit interview, wrap up what each is doing, then map which to start and which to continue; the reporter and the journalist "go to town" on the incident pages; then move to business as usual, "running this as a normal newsroom"; a **storm conductor** as there will be a Fringe conductor; "from explorer to villager". **~10:32:** the team "shouldn't stop until the handover is done". **~10:38, a correction:** no outside hand-over; "I'm going to be the only one running this site"; the Fringe is another team's work, so the business-as-usual team stays focused on the storm. (All in [BRIEF.md](../BRIEF.md), last sections; the joining of other accounts and teams in the 10:30 section is withdrawn there.)

How to read it: **Fact** = read from a file or commit, linked. **Mine** = my judgement as planner, with reasons. Every verdict below is mine until Dinis says yes.

## In one screen

1. **When.** Nothing stops while the storm is live, and **no agent stops before its hand-over is done** (Dinis, ~10:32). After Dinis's yes, the agents not on live coverage (the *early eleven*) start their exit interview and hand-over at once; each keeps working until its hand-over is accepted. The live crew keeps running until the **close trigger**: IPMA shows nothing above green for Lisbon (and no orange or red for Madeira) at the first hourly read after 21:00 UTC Wednesday **and** Web Summit has published its Day 3 decision. Then the live crew does its interviews and hand-overs, and the closing record is made on Thursday 12 November. (§1)
2. **Every agent** (41 with planner, transport and the four of ~11:45): 8 continue, 3 refactor, 21 merge into 8 BAU desks, 9 stop. (§2)
3. **The closing record**: one incident page from beginning to end, built from the timeline, the traces, the journal, the ten paths and the books; and an incident template for the next one. (§3)
4. **Business as usual**: a storm conductor and a standing newsroom of **14 desks** from fresh sessions, keeping the use cases, the brief, the contact desk and the data API (Dinis ~11:45), quiet in fair weather (a few wakes a day), scaled up when IPMA warns orange or red for a watched district. `api/v1/` stays as its contract says. Run by Dinis alone; focused on storms. (§4)
5. **The order of steps** and **Dinis's decisions** in one list (§5). Nothing is deleted; history stays.
6. **Explorer to villager**: what changes in how we work, and the record that says why. (§6)

---

## 1. When

**Facts.**
- The headline (as of the file's last write) is Web Summit's 19:09 UTC decision of 10 November: Day 2 called off; Day 3 "aims to proceed as planned"; IPMA's red rain for Lisbon 09:00 to 18:00 Wednesday; orange wind (lowered from red at 07:16) 09:00 to 21:00 ([incidents/2026-11-10-storm-charles/incident.json](../incidents/2026-11-10-storm-charles/incident.json)).
- The meteorologist's 09:25 reading: centre just north of Lisbon about 13:00 to 15:00, strongest wind 14:00 to 16:00 ([agents/meteorologist/status.json](../agents/meteorologist/status.json); a labelled analysis, not a forecast of ours).
- Day 3's decision is not yet published (BRIEF.md, ~10:30).

**Proposal (mine).** Three phases.

| Phase | Starts | Who runs | Who winds down |
|---|---|---|---|
| **0. Live, plan only** | now | everyone, as now | nobody |
| **1. Live crew, early hand-overs** | Dinis's yes | the **live crew** (below), unchanged | the **early eleven**: exit interview and hand-over; each keeps working until its hand-over is accepted |
| **2. Close** | the close trigger | conductor + ipma + researcher + transport keep a *Thursday watch* (Day 3) at two wakes a day | everyone else: interview, closing record, hand-over |
| **3. BAU** | Dinis's yes to the closing record (proposed: Thursday 12 Nov, afternoon) | the storm conductor and its desks, fresh sessions | the Thursday watch hands over to the storm conductor |

**When an agent's hand-over is done (mine, from Dinis's ~10:32 rule):** all four of (1) its exit interview is written and the planner's check is published; (2) its wrap-up is in its HANDOVER.md (what it made, what is open, what to run each wake); (3) its vault keys have reached the conductor by lane; (4) the receiver named in its verdict (a BAU desk, the librarian, or "nobody: stopped, record kept") has said in a commit `For:` the agent that it has read the hand-over and takes what it inherits. Only then does the conductor retire its wakes and mark its key "handed over" (or "stopped"). Until then it keeps its wakes and its job.

**The close trigger (mine):** both of
- (a) IPMA's first hourly read after 21:00 UTC Wednesday (incident.ipma@ reads at :47) shows no yellow or above for Lisbon district on the rest of Wednesday or on Thursday, and no orange or red for Madeira; *and*
- (b) Web Summit has published a decision on Day 3 (incident.researcher@ / the conductor record it in [decisions.md](../incidents/2026-11-10-storm-charles/decisions.md)).

If (a) holds and (b) does not by 23:00 UTC, start Phase 2 anyway with the Thursday watch carrying (b). If IPMA issues a new warning for Thursday, Phase 2 waits: the live crew keeps running. Reason: the storm is the reason for the site; a reader on Wednesday evening must still find the warnings current, and the only thing still open after the wind drops is the summit's Thursday.

**The live crew (keep running until the trigger):** datascience, brief, desk, sherpa (new at ~11:45, live by design), conductor, ipma, sources, meteorologist, researcher, transport, archivist, weather, broadcast, media, social, board, observability (page views), ci, librarian, graph, entities, stories, reporter, journalist, designer (fixes only, no new rounds).

**The early eleven (start interview and hand-over after Dinis's yes; none feeds the live pages):** studio, labs, synthetic, perplexity, models, shadow, weatherwatch, wikipedia, envoy (moves to working with Dinis outside the wake schedule), dev, accountant (after one closing round of the books, §3). Each keeps its wakes until its hand-over is done. Storyteller and motion finish the closing record first (§3). Planner hands over last.

## 2. Every agent

**Facts** in the table come from: the roster ([agents/JOBS.md](../agents/JOBS.md), [agents/policy.json](../agents/policy.json)); sessions = session keys in [data/agents/sessions.json](../data/agents/sessions.json) (from [data/keys.json](../data/keys.json)), "h/o" = keys marked handed over; commits as counted by incident.ci@ in [accounts/agents.json](../accounts/agents.json) (09:41 UTC); cost = **weighted tokens** (fresh input + output + cache writes + a tenth of cache reads; WS-148's relative weight, not a price) from the agent's own ledger line in [accounts/ledger/](../accounts/ledger/) via accounts/agents.json, 09:41 UTC. "n.m." = not measured. Team: 35 agents in JOBS, 72 session keys, 40 handed over ([data/agents/count.json](../data/agents/count.json), 10:22); 1.92 bn tokens measured over 27 of 31 agents, 98.6% cache reads, 216.5 M weighted; model spend 1.06 of 20 USD, the provider's account out of credit since 02:55 UTC; CI 724 runs, 515 releases ([accounts/index.md](../accounts/index.md)).

**What worked / didn't** is mine, read from each agent's status.json `state` and `asks` ([data/agents/index.json](../data/agents/index.json), 10:22) and its hand-over where one exists. **GAP:** I have read the status `state` lines, not every HANDOVER.md in full; each line below is to be checked in the exit interview (§2.2).

| Agent | Owns | Made | Sessions (h/o) | Commits | Weighted tokens | Worked (mine) | Didn't (mine) | Verdict (mine) |
|---|---|---|---|---|---|---|---|---|
| conductor | timeline, decisions, incident.json, JOBS, BRIEF | [timeline](../incidents/2026-11-10-storm-charles/timeline.md), [decisions](../incidents/2026-11-10-storm-charles/decisions.md), [comms](../incidents/2026-11-10-storm-charles/comms/) | 1 (0) | 128 | **52.6 M** (24% of team) | routing 35 agents; the headline rule held | one session since 18:56 on 10 Nov at ~530,000 tokens of context a call ([its status](../agents/conductor/status.json)); routines still fire into handed-over sessions | **refactor** → the **storm conductor**, fresh session, from [library/pack/conductor-handover.md](../library/pack/conductor-handover.md) |
| designer | app/site.css, design/ | [design/](../design/) (51 rounds) | 5 (4) | 55 | 18.7 M | tokens and rules every page follows | rounds without end; cost second only to the conductor | **merge** → *presenter* desk (with weather, broadcast) |
| weather | weather/, app/weather/ | [the Weather face](../weather/) | 2 (1) | 23 | 9.3 M | the face at `/` from the data room only | | **merge** → *presenter* (owner) |
| broadcast | broadcast/, app/broadcast/ | [/broadcast/](../broadcast/): the news-channel wall (Dinis ~10:13); Atlantic, Lisbon and Madeira map views, a Web Summit panel (cd5d84e) | 1 (0) | n.m. | n.m. | panels from the data room, each with source and time | new; nothing to judge yet | **merge** → *presenter*; dormant between events |
| observability | admin pages, app/agents/, data/agents/ | [/agents/](../agents/), page views | 5 (4) | 44 | 11.9 M | one count of the team; page-views drain | many views of the same data | **merge** → *operations* (with ci, accountant) |
| ci | ci/, data/ci/, README | [ci/](../ci/) | 2 (1) | 14 | 3.7 M | push-to-served measured | asks open: signed releases, licence | **merge** → *operations* |
| accountant | accounts/ | [accounts/](../accounts/) | 2 (1) | 13 | 3.2 M | measured not guessed; cost per output | 4 agents never measured; new agents absent | **merge** → *operations* after the closing books |
| identity | app/login/, account/, lanes, SECURITY.md | [SECURITY.md](../SECURITY.md), the key lane | 2 (1) | 21 | 5.2 M | the append lane for vault keys works | three Dinis decisions still open | **continue** (on demand: Dinis's lane, the team's keys, vault-key hand-overs) |
| librarian | library/, index, policy-check | [the pack](../library/pack/start.md), [library](../library/), [the catalogue](../library/index.json), draft behaviour policies for all 37 agents (agents/<role>/policy.md) | 8 (7) (eighth session from 10:53) | 93 | 13.7 M | the pack makes a fresh session cheap | seven sessions | **continue** (+ the incident template) |
| board | board/ | [board](../board/) (444 cards: 209 done, 206 open, 19 watching, 7 blocked, 3 answered) | 2 (1) | 20 | 4.7 M | one place for what is open | 206 open cards to triage | **refactor**: closing triage (every open card closed, moved to a BAU desk, or dropped with a reason), then a small board the storm conductor keeps |
| ipma | sources/ipma/ | [sources/ipma/](../sources/ipma/) | 2 (1) | 18 | 4.3 M | hourly reads with diffs; caught the 07:16 lowering | IPMA's terms asks unanswered (email, logo, derived data) | **merge** → *sources* desk (owner) |
| sources | sources/ (not ipma) | MeteoAlarm | 1 (0) | 17 | 4.4 M | | MeteoAlarm archive needs a key | **merge** → *sources* |
| meteorology | meteorology/ | [meteorology/](../meteorology/) | 2 (1) | 12 | 4.4 M | the supply chain of weather data mapped | | **merge** → *sources* (reference, re-read weekly) |
| weatherwatch | research/weather-sites/ | [sites map](../research/weather-sites/) | 3 (1) | 37 | 7.9 M | the map is done | three sites' terms restrict AI reading | **stop**; the map passes to the librarian |
| meteorologist | data/weather/ (writes in another repository) | readings in status | 0 here | not here | n.m. | labelled analysis the face used | could not push here (add_repo refused 21:18) | **refactor**: fresh session with push here, in BAU |
| researcher | data/decisions/ (another repository) | decisions | 0 here | not here | n.m. | 35 items done | could not push here; lisboa.pt refuses machines | **merge** → *impacts* (with transport), fresh session with push here |
| transport | transport/, app/transport/, incidents/*/data/transport/ | new desk (Dinis ~10:25): flights at Lisbon, Porto, Faro, Funchal; operators' notices | (not yet in sessions.json) | n.m. | n.m. | open data as JSON in api/v1 | new; nothing to judge yet | **merge** → *impacts* (owner) |
| dev | tools/websummit*, app/storm.js (another repository) | the poll (stopped 05:27 at the Terms hold) | 0 here | not here | n.m. | | its job ended with the Terms hold | **stop** |
| archivist | evidence/, data/vaults.json | 584 captured pages ([evidence/](../evidence/)) | 1 (0) | 23 | 5.8 M | 9,907 weighted tokens a capture | its two vault write keys exist only in its session | **continue**, after its keys reach the conductor (§5) |
| entities | entities/, app/lens/ | 214 nodes | 3 (2) | 32 | 8.2 M | | overlaps graph | **merge** → *graph* desk |
| graph | data/graph/, data/query/ | [graph](../data/graph/) | 3 (2) | 33 | 9.8 M | one graph, SQL in the browser | git history holds a private person's address (no rewrite) | **merge** → *graph* (owner) |
| media | research/media/, contribute.md | coverage.json | 2 (1) | 30 | 8.2 M | hourly sweep | three outlets refuse machines | **merge** → *coverage* desk (owner) |
| social | research/social/ | Bluesky as data | 2 (1) | 13 | 2.9 M | no login needed | | **merge** → *coverage* |
| wikipedia | research/wikipedia/ | articles and revisions | 2 (1) | 14 | 3.8 M | | | **merge** → *coverage* (a weekly read) |
| shadow | shadow/ | answer engines compared | 1 (0) | 11 | 2.0 M | | paused since 03:00: provider out of credit | **stop**; revive inside *coverage* when credit exists |
| perplexity | research/perplexity/ | round 1 | 1 (0) | 6 | 1.5 M | | same | **stop** |
| models | models/, tools/llm.mjs | ledger, evals round 1 | 1 (0) | 8 | 3.6 M | every call through one ledger | blocked since 02:55 (HTTP 402) | **stop**; tools/llm.mjs kept, owned by *operations* |
| stories | stories/ | [six stories](../stories/), 116 claims | 4 (3) | 31 | 5.6 M | stories from the data room only | 928,186 weighted tokens a story | **merge** → *analysis* desk (with datascience) |
| labs | labs/ | twelve experiments | 2 (1) | 14 | 4.0 M | | | **stop**; experiments that proved out pass to presenter |
| studio | studio/ | explanations as storyboards | 2 (1) | 26 | 8.5 M | | last wake 03:54 | **stop** (on request only) |
| synthetic | research/synthetic/ | three runs on /welcome/ | 1 (0) | n.m. | n.m. | found the decision in ~9 s (run 3) | | **merge** → *guide* desk: the synthetic visitors become the guide's test loop (Dinis ~11:45: sherpa loops with designer and synthetic) |
| envoy | outreach/, comms/, welcome/ | drafts | 1 (0) | n.m. | n.m. | | | **continue** with Dinis, no scheduled wakes; since ~11:45 also the section for journalists and media, and outreach drafts to every entity with a page (a person sends) |
| reporter | reporter/ | [14 traces](../reporter/traces/) | 4 (3) | 24 | 3.8 M | traces from word to live page | | **merge** with journalist and storyteller → *the record* desk |
| journalist | journal/ | [thirteen pieces](../journal/) (the closing piece first since 10:35, journal/index.json); interview drafted early: [interviews/journalist.md](interviews/journalist.md) | 5 (4) (fifth session from 10:33) | 33 | 4.8 M | told from the traces; corrections in the open | | **merge** → *the record* (owner) |
| storyteller | story/ | [cast, nine paths](../story/) | 1 (0) | n.m. | n.m. | new 10:10 | | **merge** → *the record* after §3 |
| motion | flows/ | flows | 1 (0) | n.m. | n.m. | new 10:10 | | **stop** after §3; tools/flows-*.mjs kept |
| datascience | datascience/, incidents/*/data/exposure/, tools/ds-*.mjs | new (Dinis ~11:45): the gap map against Watchfloor's decision brief ([research/watchfloor/README.md](../research/watchfloor/README.md)); new open data sets (people exposed by district and hour, the ensemble, tides, hospitals, power) | new | n.m. | n.m. | new; nothing to judge yet | | **continue** → owns the *analysis* desk (with stories) |
| brief | brief/, tools/brief-*.mjs | new (~11:45): our own decision-brief PDF, in editions, from our data only | new | n.m. | n.m. | new | | **continue** → *brief* desk: one edition per event, more during it |
| desk | desk/, app/desk/, tools/desk-*.mjs | new (~11:45): the contact desk; "Contact us" on every page, sealed and write-only to its lane; routes and drafts replies a person sends ([CLAUDE.md](../CLAUDE.md)) | new | n.m. | n.m. | new | | **continue** → *desk*: the only way in from outside; nobody reaches the conductor directly |
| sherpa | guide/, app/guide/ | new (~11:45): "Are you in Lisbon right now?": use cases (stranded, your flight, getting around, what is open, Madeira) as guided paths, simple to deep | new | n.m. | n.m. | new | | **continue** → owns the *guide* desk (with synthetic) |
| planner | transition/ | this plan | 1 (0) | n.m. | n.m. | | | **stop** when Phase 3 starts |

Count (mine): continue 8 (identity, librarian, archivist, envoy, datascience, brief, desk, sherpa); refactor 3 (conductor, board, meteorologist); merge 21 into 8 desks (presenter, operations, sources, impacts, graph, coverage, the record, analysis, guide: the last two owned by a continuing agent); stop 9.

### 2.1 What the numbers say (facts, then mine)

- **Fact:** the conductor's single session is 24% of the team's measured weighted tokens (52.6 M of 216.5 M), with 128 commits ([accounts/agents.json](../accounts/agents.json)). **Mine:** the most expensive habit was a long session, not many agents; the agents that handed over most (librarian 7 sessions, designer 5, observability 5) cost a quarter of the conductor each.
- **Fact:** 98.6% of tokens are cache reads ([accounts/index.md](../accounts/index.md)). **Mine:** the cost is context carried, so BAU should keep sessions short and start them from the pack.
- **Fact:** four agents (models, shadow, perplexity, partly accountant's books) were stopped by one account's credit at 02:55 UTC. **Mine:** a dependency with no owner and no alarm; BAU gives it one (*operations*).
- **Fact:** three agents (meteorologist, researcher, dev) never pushed here: attaching the repository was refused in their sessions (their status asks). **Mine:** BAU starts every desk in a session that can push here, or it does not start.

### 2.2 The exit interview

**Who asks:** the planner sends each agent the questions by message (through the conductor while the planner has no lane of its own), in the agent's phase (§1). **Who answers:** the agent's current session, in `transition/interviews/<role>.md`. **Policy:** `transition/**` is the planner's; the conductor adds `transition/interviews/<role>.md` to each agent's *owns* in [agents/policy.json](../agents/policy.json) (or to `everyone` as `transition/interviews/<role>.md`) — **Dinis/conductor decision D7**. **Checked:** the planner checks every factual claim against the record (each agent's commits from [library/provenance/](../library/provenance/); its paths and reach from its draft behaviour policy, agents/<role>/policy.md; its cost from [accounts/ledger/](../accounts/ledger/)) and writes `transition/checks/<role>.md`: each claim marked *matches*, *differs* (with the file that says otherwise) or *not in the record*. The interview stands as the agent wrote it; the check sits beside it. Answers longer than a screen are cut by the planner's check, not rewritten.

The questions (template: [interviews/TEMPLATE.md](interviews/TEMPLATE.md)):

1. **What you did.** Your three most important outputs, each with a link and a commit.
2. **What it cost.** Sessions, hand-overs, your ledger line (run `tools/accounts-measure.mjs --append` first), commits; and your own estimate of which output cost most.
3. **What worked** and you would keep in BAU, with the evidence.
4. **What you would change**: in your job, your tools, the rules, the way you were started or woken.
5. **What you leave unfinished**: open board cards on you, asks waiting on Dinis, data that will go stale, anything only your session holds (vault keys, baselines, fetched pages).
6. **What the next team should know**: one paragraph a fresh session could start from.
7. **Your verdict on yourself**: stop, continue, refactor or merge, and with whom, against the planner's (§2).
8. **Keys and wakes**: every vault you made (name only, never the key) and confirmation its key went to the conductor by lane; every scheduled wake that fires into your session, with its minute.

## 3. The closing record

**Mine, for Dinis's yes.** The incident told from beginning (Dinis's voice memo of about 19:00 UTC on 10 November, [BRIEF.md](../BRIEF.md); the move to this repository at 21:15, the researcher's status) to end (the close trigger), at one address, built from data already kept.

| Part | Who | Built from | Where (proposed) |
|---|---|---|---|
| **The incident page**: what happened, hour by hour, warnings vs decisions vs what was observed | conductor (content) + presenter (look) | [timeline.md](../incidents/2026-11-10-storm-charles/timeline.md) → signals.json, decisions.md, incident.json set to `closed` with a final headline from the primary source | `incidents/2026-11-10-storm-charles/` (README becomes the record page) |
| **The spine: the arc** (the acts from the voice memo to Dinis's 10:30 turn, who arrived when, the generations, four layers of maturity; it now ends on the wind-down) and the ten paths, each step with its commit; open: path 4, 5, 8; the arc's last act once the storm ends | storyteller (then *the record*) | [story/arc.md](../story/arc.md), [story/paths/](../story/paths/), [story/cast.json](../story/cast.json) (every agent's first commit, commits, keys) | `story/` |
| **The traces, closed**: six open traces each given a final step and a status (outage, memory, the Web Summit hold, the loop, escalations, the 10:10 request); two new ones: the launch, and the wind-down itself (Dinis's 10:30 word to the storm conductor, a step per agent's interview, with its commit); one end-to-end page, `reporter/arc.md`, with hour-by-hour numbers; the log closed | reporter | [reporter/traces/](../reporter/traces/) (fourteen), [numbers.json](../reporter/numbers.json), [log.md](../reporter/log.md); the same files motion plays (data/flows/trace-*.json) | `reporter/` |
| **The closing piece**, first in the journal and its edition: the incident end to end for someone who was not there, linking the twelve pieces and the arc; *What it cost* and *Starting again* rewritten from the final books; *Mistakes made in the open* with the fifth session's two corrections; endings for the open pieces (3, 7, 10, 12); the edition PDF last | journalist | the twelve [journal](../journal/) pieces, the traces, the corrections | `journal/` |

The reporter, journalist and storyteller each sent their part by message (10:30 to 10:34 UTC); the rows above are theirs, in short. One page, one spine (mine): the incident page links the arc first; the reporter's arc page carries the numbers; the journal's closing piece tells it; nobody repeats another's text.
| **The numbers**: final books (tokens per agent, model spend, CI, pages, cost per output) | accountant, then *operations* | [accounts/](../accounts/), data/ci/ | `accounts/closing.md` |
| **The corrections**: every correction with its time and what changed | journalist + conductor | [BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md), [mistakes-made-in-the-open](../journal/mistakes-made-in-the-open.md), timeline redactions | `journal/` |
| **Warned vs observed**: what IPMA warned, what the stations measured, what was decided and when (lead times) | stories + graph | data/weather/, data/decisions/, [stories/](../stories/) | `stories/` |
| **The lessons**: the exit interviews and their checks, and §6 here | planner | transition/interviews/, transition/checks/ | `transition/LESSONS.md` |
| **The flows** | motion | flows of the ten paths | `flows/` |
| **The catalogue and the template** | librarian | everything above; [library/index.json](../library/index.json) (every tracked file: who keeps it, when, made from) as the inventory; the hourly articles (news/2026-11-11T<HH>.md, news/data/) and [the round article](../news/2026-11-11-round-two.md) as the team's timeline in data | `library/` + `incidents/_template/` (with the conductor) |

**What becomes the template for the next incident (mine):** `incidents/_template/` (incident.json with the headline rule, timeline.md with the row-id rule, decisions.md, comms/ drafts, data/README), the pack ([library/pack/start.md](../library/pack/start.md), now with rules 12 to 14 on the wind-down) generalised as the BAU desks' start page, measured by the pack test ([accounts/pack-test.json](../accounts/pack-test.json)), a JOBS.md and policy.json skeleton for the standing desks (§4), the generators list, the [api/v1 contract](../api/v1/README.md), the exit-interview template, and this plan's phases. Owner: librarian, with the conductor.

## 4. Business as usual: the storm conductor and a standing newsroom

**Mine.** Two modes. **Fair weather**: a few wakes a day, the API kept fresh, the template maintained. **Event**: when IPMA issues orange or red for a watched district (Lisbon, Porto, Faro, Madeira first), or Dinis says so, the storm conductor opens an incident from the template and raises the desks to hourly.

**Desks (14), each a fresh session started from the pack:**

| Desk | From (merged) | Fair weather | Event | Publishes |
|---|---|---|---|---|
| **storm conductor** | conductor | 2 wakes a day | hourly, :05 | incidents/<id>/ (timeline, decisions, incident.json), JOBS, the brief |
| **sources** | ipma + sources + meteorology | 4 reads a day (warnings) | hourly, :47 | sources/, incidents/*/data/weather |
| **meteorologist** | meteorologist (refactored) | on event only | hourly | labelled analysis (hypotheses) |
| **impacts** | researcher + transport | daily | hourly, :20 | decisions (data/decisions), transport |
| **archivist** | archivist | daily | hourly | evidence/, vaults |
| **coverage** | media + social + wikipedia (+ shadow when credit) | daily | hourly, :36 | research/media, social, wikipedia |
| **presenter** | weather + designer + broadcast | on change | on change | `/`, /broadcast/, design/ |
| **graph** | graph + entities | daily | every 3 h | data/graph, entities |
| **analysis** | datascience + stories | weekly gap map; data sets kept fresh | hourly exposure; 1 story per event | datascience/, incidents/*/data/exposure, stories/ |
| **guide** | sherpa + synthetic | on change; a synthetic run per release | hourly ("are you in Lisbon right now?" kept true) | guide/ (use cases, simple to deep) |
| **brief** | brief | none | an edition at each change of warning or decision | brief/ (the decision-brief PDF; the PDF is built, not committed, per the git rules) |
| **desk** | desk | daily | hourly | desk/ (routing record only; messages sealed, never in git) |
| **the record** | reporter + journalist + storyteller | daily | 3 a day | reporter/, journal/, story/ |
| **operations** | observability + ci + accountant (+ tools/llm.mjs) | daily | hourly | /agents/, ci/, accounts/, the provider's credit as an alarm |
| *librarian* | librarian | daily | every 3 h | library/, the pack, the template |
| *identity* | identity | on request | on request | Dinis's lane, the team's keys and vault-key lanes |

(Librarian and identity are listed apart: they serve the whole site, not one desk. Envoy works with Dinis, unscheduled. The presenter carries the promptugal.news brand and link, Dinis ~10:32 and ~10:35: the designer's family layer.)

**What it reads:** IPMA (open data, warnings), MeteoAlarm, ANEPC, the operators and airports' open feeds, organisers' own pages (the Web Summit Terms hold stays until **D5**), public social accounts in public roles, the press by short excerpt and link.

**The API stays stable ([api/v1/README.md](../api/v1/README.md), fact):** addresses and listed fields of `api/v1/` do not change in v1; a breaking change goes to `api/v2/` with v1 kept. **Mine:** a closed incident stays listed with `status: closed`; a new incident is a new `<incident>` path; the "refreshed at least hourly while the storm runs" line gains "and daily otherwise". pt.news and Lisbon Fringe read it ([api/v1/README.md](../api/v1/README.md)).

**Who runs it (Dinis, ~10:38):** Dinis alone. No outside accounts, people or agent teams join this site; the desks hand work to each other by commit `For:` and lanes, as now. Readers of `api/v1/` (pt.news, Lisbon Fringe, per its README) read it; they do not write here. Since ~11:45 this site is **the main source** for promptugal.news and the Fringe site (BRIEF.md): the API's stability is a BAU duty of *operations* and the storm conductor, not a nicety. Messages from the public arrive only through the contact desk. We still feed Vicky Wang's desks as material (CLAUDE.md).

**Start, continue, stop (mine):**
- **Start (fresh sessions):** storm conductor, sources, meteorologist (with push here), impacts, coverage, presenter, graph, the record, operations.
- **Continue (same role, a fresh session at the next hand-over):** librarian, identity, archivist, envoy, datascience (as *analysis*), sherpa (as *guide*), brief, desk.
- **Stop, after hand-over:** dev, weatherwatch, labs, studio, perplexity, models, shadow, motion, planner; and the old sessions of every merged agent once its desk has accepted the hand-over.

## 5. The order of steps

| # | Step | Who | When |
|---|---|---|---|
| 1 | Dinis reads this plan; says yes, changes, or no | Dinis | Phase 0 |
| 2 | The conductor adds `transition/interviews/<role>.md` to the owns of each agent (D7) | conductor (policy with librarian) | after yes |
| 3 | The four old wakes still firing into handed-over sessions are retired (designer :07, weatherwatch :28, graph :51, dev :42; [transition/wakes.md](wakes.md)) | conductor (Dinis where the conductor's session cannot) | at once after yes |
| 4 | Early eleven: interview, wrap-up in their HANDOVER.md, vault keys to the conductor by lane (`tools/lane-handover.mjs seal --via-lane`), last ledger line; **they keep working** | each agent | Phase 1 |
| 5 | Planner checks each interview against the record; the receiver accepts the hand-over by commit `For:`; only then the conductor retires that agent's wakes and its status says `handed over` | planner, receiver, conductor | as each lands |
| 6 | Board triage: every open card closed, moved to BAU, or marked *dropped* with a reason | board | Phase 1 to 2 |
| 7 | Close trigger read and recorded as a timeline row | conductor (from ipma, researcher) | ~21:47 UTC Wed or later |
| 8 | Live crew: interviews, keys by lane, last ledger line, hand-over; each keeps working (closing record, §3) until its hand-over is accepted; then its wakes are retired, except the Thursday watch | each agent; conductor retires wakes | Phase 2 |
| 9 | The closing record (§3); incident.json `status: closed` | reporter, journalist, storyteller, stories, accountant, librarian, conductor | Thursday |
| 10 | Dinis reads the closing record; yes | Dinis | Thursday |
| 11 | The storm conductor's session starts from the pack and the conductor's hand-over; makes its key; the conductor seals every vault key it holds to that key | conductor → storm conductor | Phase 3 |
| 12 | The storm conductor writes the BAU JOBS.md and policy.json lines, starts the desks (fresh sessions, each with push here), sets their wakes | storm conductor | Phase 3 |
| 13 | The old conductor session hands over and stops; its key marked "handed over" | conductor | Phase 3 |
| 14 | REALITY.md rewritten for BAU; ROADMAP.md and PIPELINE.md marked as history | storm conductor | Phase 3 |

**What the repository keeps:** everything. No file is deleted and no history rewritten; stopped agents' folders, status files and keys stay, keys marked "handed over" or "stopped". Pages of stopped agents stay served, with a line saying the agent stopped and when.

**Keys and vaults (fact and risk):** the conductor's append lane for vault keys is open ([data/lanes.json](../data/lanes.json), `keys_to_conductor`; identity's status). **Risk:** the archivist's two vault write keys exist only in its session and its permission check refused reading them back ([its status](../agents/archivist/status.json)); if that session stops first, the keys are gone. They go first, before any stop (D4).

**Scheduled wakes:** the conductor read the scheduler at 10:36 UTC ([agents/conductor/wakes.md](../agents/conductor/wakes.md)): 25 hourly wakes into current sessions, four one-shots that re-schedule themselves, and **four old wakes still firing into handed-over sessions**. Each is marked keep / retire / move, and when, in [transition/wakes.md](wakes.md).

**Stale documents (fact, by their own date lines; mine on what to do):** [ROADMAP.md](../ROADMAP.md) (10 Nov ~19:20) and [PIPELINE.md](../PIPELINE.md) (10 Nov ~19:10, a proposal since built) are history; [REALITY.md](../REALITY.md) (11 Nov 02:45) predates round two's later agents and the counts; [RESTRUCTURE.md](../RESTRUCTURE.md) (02:25) still describes the two faces but not the agents added after 09:30; [library/pack/wakes.json](../library/pack/wakes.json) (04:13) is partial; [accounts/agents.json](../accounts/agents.json) (09:41) lacks the agents started after 09:30.

### Dinis's decisions, in one place

- **D1.** Yes, change or no to this plan as a whole.
- **D2.** The close trigger (§1): IPMA's last Lisbon warning expired at the first read after 21:00 UTC *and* the Day 3 decision public; or another.
- **D3.** The verdicts (§2): especially the merges into seven desks, and stopping models, shadow and perplexity.
- **D4.** Vault keys: every agent's keys to the conductor by lane before it stops, the archivist first; the conductor seals them to the storm conductor.
- **D5.** Carried over from the record and still open: the provider's credit (models, shadow, perplexity); the Web Summit Terms hold (dev, sources); IPMA's email, logo and derived-data questions (ipma, weatherwatch); identity's three decisions (SECURITY.md); signed releases and the licence (ci); the eleven behaviour policies (librarian). Each stays an ask of the BAU desk that inherits it.
- **D6.** Name and model of the storm conductor: proposed `storm.conductor@web-summit.dinis`, a fresh session, two modes (fair weather, event).
- **D7.** Exit interviews written by each agent in `transition/interviews/<role>.md` (a policy change).
- **D8.** Which districts and which IPMA level open an event (proposed: orange or red for Lisbon, Porto, Faro or Madeira).
- **D9.** The archive of handed-over sessions (librarian's ask; conductor's ask on routines into them).
- ~~D10. Outside teams joining~~: answered by Dinis at ~10:38 (no: he alone runs this site).

## 6. Explorer to villager

In plain words (mine): the last 16 hours were exploring. We spun up an agent for every idea, mashed sources and views together, and learned by building. A village does the same few things every day, well, with the same people. The move is from *many agents, one long conductor, everything at once* to *a few desks, short sessions, a written routine, and hand-overs that finish before anyone leaves*.

What changes, and the record that proves it:

- **From long sessions to short ones started from the pack.** The conductor's one session is 24% of the team's cost ([accounts/agents.json](../accounts/agents.json)); the journal's piece [starting again is cheaper than remembering](../journal/starting-again-is-cheaper-than-remembering.md) and 40 hand-overs ([count.json](../data/agents/count.json)) show fresh sessions work.
- **From one agent per idea to desks.** 35 agents for one storm by 10:22 ([count.json](../data/agents/count.json)), 41 with the planner and the five started since (JOBS.md, 11:45); overlapping pairs (graph and entities; media, social, wikipedia; weather, designer, broadcast) read the same data. Seven desks cover the same ground.
- **From hourly everything to two modes.** 724 CI runs and 515 releases in one night ([accounts/index.md](../accounts/index.md)); the busiest hour, 02:00 UTC, was the restructure, not the storm. In fair weather a few wakes a day are enough.
- **From hidden dependencies to owned ones.** One account's credit stopped four agents at 02:55 ([accounts/provider.json](../accounts/provider.json)); three agents never pushed here (their status asks). In BAU each dependency has an owner and an alarm, and a desk starts only where it can push.
- **From asks piling up to a decision list.** The board holds 206 open cards and the asks to Dinis run to dozens ([board/](../board/), [data/agents/index.json](../data/agents/index.json)); the journal's [what waited on the human](../journal/what-waited-on-the-human.md) tells it. BAU keeps one decisions list, read at each of Dinis's sessions.
- **From building the newsroom to running it.** The data API already has outside readers (pt.news, Lisbon Fringe: [api/v1/README.md](../api/v1/README.md)), so what we publish now has to stay where it is: a contract, not an experiment. What is new is a routine.
- **From stopping to handing over.** 40 hand-overs already happened ([count.json](../data/agents/count.json)), but four old wakes still fire into handed-over sessions ([agents/conductor/wakes.md](../agents/conductor/wakes.md)): a hand-over that was not finished. Dinis's ~10:32 rule makes the finish part of the job.

### What the hand-overs already learned (facts, from their "learned the hard way" sections; quoted short)

These are the villager's rules, written by explorers. They go into the pack and the template (§3):

- **Read the terms before the second request** ([agents/sources/HANDOVER.md](../agents/sources/HANDOVER.md)); the Web Summit Terms hold and three outlets no longer read by machine came from that.
- **A refused call is not a wrong answer**: five refused model calls were counted as wrong at 02:38 and corrected at 02:59 ([agents/models/HANDOVER.md](../agents/models/HANDOVER.md)).
- **Clock first**: times stamped ahead of the clock, twice; the gate now warns ([agents/reporter/HANDOVER.md](../agents/reporter/HANDOVER.md), [agents/stories/HANDOVER.md](../agents/stories/HANDOVER.md)).
- **Address data by a field, never by position; a warning that ends leaves warnings.json, so cite the kept CAP message** ([agents/stories/HANDOVER.md](../agents/stories/HANDOVER.md)).
- **Never describe a part you have not seen** (pages drawn by script); the finding that public sites print mean winds far below the warned gusts is why the Weather face labels its rows ([agents/weatherwatch/HANDOVER.md](../agents/weatherwatch/HANDOVER.md)).
- **Never copy the frame by hand; the gate refuses vault-key-shaped strings** ([agents/identity/HANDOVER.md](../agents/identity/HANDOVER.md)).

Mine: every one of these is a routine, not a discovery. That is the move.

---

*Next for the planner:* the gaps left (each agent's HANDOVER.md read in full at its interview), interviews and checks as they land, and LESSONS.md after Phase 2.
