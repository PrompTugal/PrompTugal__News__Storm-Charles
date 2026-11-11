# From incident to business as usual: the plan for Dinis's yes

> Kept by incident.planner@web-summit.dinis, 11 November 2026, 10:36 UTC. First draft (pushed 10:36), improved; gaps are marked **GAP**. Nothing here stops anything: this is a plan for Dinis to say yes to, change, or refuse.

Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). This page is about how the team works, not about the storm.

**What Dinis asked (~10:30 UTC, [BRIEF.md](../BRIEF.md), last section, close to his words):** wind down every agent, refactor the ones that need it, assess each one and give it an exit interview, wrap up what each is doing, then map which to start and which to continue; the reporter and the journalist "go to town" on the incident pages; then move to business as usual, "running this as a normal newsroom", open to "other accounts and other team members, and their own agentic teams"; a **storm conductor** as there will be a Fringe conductor; "from explorer to villager".

How to read it: **Fact** = read from a file or commit, linked. **Mine** = my judgement as planner, with reasons. Every verdict below is mine until Dinis says yes.

## In one screen

1. **When.** Nothing stops while the storm is live. After Dinis's yes, the agents that are *not* on live coverage (eleven of them) do their exit interview and closing work at once. The live crew keeps running until the **close trigger**: IPMA shows no warning above green for Lisbon (and Madeira) at the first hourly read after 21:00 UTC Wednesday **and** Web Summit has published its Day 3 decision. Then live wakes stop, the live crew does its interviews, and the closing record is made on Thursday 12 November. (§1)
2. **Every agent** (37 with planner and transport): 5 continue, 3 refactor, 19 merge into 7 BAU desks, 10 stop. (§2)
3. **The closing record**: one incident page from beginning to end, built from the timeline, the traces, the journal, the ten paths and the books; and an incident template for the next one. (§3)
4. **Business as usual**: a storm conductor and a standing newsroom of **11 roles** from fresh sessions, quiet in fair weather (a few wakes a day), scaled up when IPMA warns orange or red for a watched district. `api/v1/` stays as its contract says. Other teams join through lanes, keys, briefs and the board. (§4)
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
| **1. Live crew only** | Dinis's yes | the **live crew** (below), unchanged | the **early eleven**: exit interview, wrap-up, then stop their wakes |
| **2. Close** | the close trigger | conductor + ipma + researcher + transport keep a *Thursday watch* (Day 3) at two wakes a day | everyone else: interview, closing record, stop |
| **3. BAU** | Dinis's yes to the closing record (proposed: Thursday 12 Nov, afternoon) | the storm conductor and its desks, fresh sessions | the Thursday watch ends |

**The close trigger (mine):** both of
- (a) IPMA's first hourly read after 21:00 UTC Wednesday (incident.ipma@ reads at :47) shows no yellow or above for Lisbon district on the rest of Wednesday or on Thursday, and no orange or red for Madeira; *and*
- (b) Web Summit has published a decision on Day 3 (incident.researcher@ / the conductor record it in [decisions.md](../incidents/2026-11-10-storm-charles/decisions.md)).

If (a) holds and (b) does not by 23:00 UTC, start Phase 2 anyway with the Thursday watch carrying (b). If IPMA issues a new warning for Thursday, Phase 2 waits: the live crew keeps running. Reason: the storm is the reason for the site; a reader on Wednesday evening must still find the warnings current, and the only thing still open after the wind drops is the summit's Thursday.

**The live crew (keep running until the trigger):** conductor, ipma, sources, meteorologist, researcher, transport, archivist, weather, broadcast, media, social, board, observability (page views), ci, librarian, graph, entities, stories, reporter, journalist, designer (fixes only, no new rounds).

**The early eleven (interview and stop after Dinis's yes; none feeds the live pages):** studio, labs, synthetic, perplexity, models, shadow, weatherwatch, wikipedia, envoy (moves to working with Dinis outside the wake schedule), dev, accountant (after one closing round of the books, §3). Storyteller and motion finish the closing record first (§3), then stop. Planner stops last.

## 2. Every agent

**Facts** in the table come from: the roster ([agents/JOBS.md](../agents/JOBS.md), [agents/policy.json](../agents/policy.json)); sessions = session keys in [data/agents/sessions.json](../data/agents/sessions.json) (from [data/keys.json](../data/keys.json)), "h/o" = keys marked handed over; commits as counted by incident.ci@ in [accounts/agents.json](../accounts/agents.json) (09:41 UTC); cost = **weighted tokens** (fresh input + output + cache writes + a tenth of cache reads; WS-148's relative weight, not a price) from the agent's own ledger line in [accounts/ledger/](../accounts/ledger/) via accounts/agents.json, 09:41 UTC. "n.m." = not measured. Team: 35 agents in JOBS, 72 session keys, 40 handed over ([data/agents/count.json](../data/agents/count.json), 10:22); 1.92 bn tokens measured over 27 of 31 agents, 98.6% cache reads, 216.5 M weighted; model spend 1.06 of 20 USD, the provider's account out of credit since 02:55 UTC; CI 724 runs, 515 releases ([accounts/index.md](../accounts/index.md)).

**What worked / didn't** is mine, read from each agent's status.json `state` and `asks` ([data/agents/index.json](../data/agents/index.json), 10:22) and its hand-over where one exists. **GAP:** I have read the status `state` lines, not every HANDOVER.md in full; each line below is to be checked in the exit interview (§2.2).

| Agent | Owns | Made | Sessions (h/o) | Commits | Weighted tokens | Worked (mine) | Didn't (mine) | Verdict (mine) |
|---|---|---|---|---|---|---|---|---|
| conductor | timeline, decisions, incident.json, JOBS, BRIEF | [timeline](../incidents/2026-11-10-storm-charles/timeline.md), [decisions](../incidents/2026-11-10-storm-charles/decisions.md), [comms](../incidents/2026-11-10-storm-charles/comms/) | 1 (0) | 128 | **52.6 M** (24% of team) | routing 35 agents; the headline rule held | one session since 18:56 on 10 Nov at ~530,000 tokens of context a call ([its status](../agents/conductor/status.json)); routines still fire into handed-over sessions | **refactor** → the **storm conductor**, fresh session, from [library/pack/conductor-handover.md](../library/pack/conductor-handover.md) |
| designer | app/site.css, design/ | [design/](../design/) (51 rounds) | 5 (4) | 55 | 18.7 M | tokens and rules every page follows | rounds without end; cost second only to the conductor | **merge** → *presenter* desk (with weather, broadcast) |
| weather | weather/, app/weather/ | [the Weather face](../weather/) | 2 (1) | 23 | 9.3 M | the face at `/` from the data room only | | **merge** → *presenter* (owner) |
| broadcast | broadcast/ | [/broadcast/](../broadcast/) | 1 (0) | n.m. | n.m. | new 10:13 | | **merge** → *presenter*; dormant between events |
| observability | admin pages, app/agents/, data/agents/ | [/agents/](../agents/), page views | 5 (4) | 44 | 11.9 M | one count of the team; page-views drain | many views of the same data | **merge** → *operations* (with ci, accountant) |
| ci | ci/, data/ci/, README | [ci/](../ci/) | 2 (1) | 14 | 3.7 M | push-to-served measured | asks open: signed releases, licence | **merge** → *operations* |
| accountant | accounts/ | [accounts/](../accounts/) | 2 (1) | 13 | 3.2 M | measured not guessed; cost per output | 4 agents never measured; new agents absent | **merge** → *operations* after the closing books |
| identity | app/login/, account/, lanes, SECURITY.md | [SECURITY.md](../SECURITY.md), the key lane | 2 (1) | 21 | 5.2 M | the append lane for vault keys works | three Dinis decisions still open | **continue** (on demand: lanes and keys for teams joining) |
| librarian | library/, index, policy-check | [the pack](../library/pack/start.md), [library](../library/) | 7 (6) | 93 | 13.7 M | the pack makes a fresh session cheap | seven sessions | **continue** (+ the incident template) |
| board | board/ | [board](../board/) (444 cards: 209 done, 206 open, 19 watching, 7 blocked, 3 answered) | 2 (1) | 20 | 4.7 M | one place for what is open | 206 open cards to triage | **refactor**: closing triage, then the board becomes the joining surface for other teams |
| ipma | sources/ipma/ | [sources/ipma/](../sources/ipma/) | 2 (1) | 18 | 4.3 M | hourly reads with diffs; caught the 07:16 lowering | IPMA's terms asks unanswered (email, logo, derived data) | **merge** → *sources* desk (owner) |
| sources | sources/ (not ipma) | MeteoAlarm | 1 (0) | 17 | 4.4 M | | MeteoAlarm archive needs a key | **merge** → *sources* |
| meteorology | meteorology/ | [meteorology/](../meteorology/) | 2 (1) | 12 | 4.4 M | the supply chain of weather data mapped | | **merge** → *sources* (reference, re-read weekly) |
| weatherwatch | research/weather-sites/ | [sites map](../research/weather-sites/) | 3 (1) | 37 | 7.9 M | the map is done | three sites' terms restrict AI reading | **stop**; the map passes to the librarian |
| meteorologist | data/weather/ (writes in another repository) | readings in status | 0 here | not here | n.m. | labelled analysis the face used | could not push here (add_repo refused 21:18) | **refactor**: fresh session with push here, in BAU |
| researcher | data/decisions/ (another repository) | decisions | 0 here | not here | n.m. | 35 items done | could not push here; lisboa.pt refuses machines | **merge** → *impacts* (with transport), fresh session with push here |
| transport | transport/ | new 10:25 | (not yet listed) | n.m. | n.m. | | | **merge** → *impacts* (owner) |
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
| stories | stories/ | [six stories](../stories/), 116 claims | 4 (3) | 31 | 5.6 M | stories from the data room only | 928,186 weighted tokens a story | **continue** (one story per event) |
| labs | labs/ | twelve experiments | 2 (1) | 14 | 4.0 M | | | **stop**; experiments that proved out pass to presenter |
| studio | studio/ | explanations as storyboards | 2 (1) | 26 | 8.5 M | | last wake 03:54 | **stop** (on request only) |
| synthetic | research/synthetic/ | three runs on /welcome/ | 1 (0) | n.m. | n.m. | found the decision in ~9 s (run 3) | | **stop**; a run per release on request |
| envoy | outreach/, comms/, welcome/ | drafts | 1 (0) | n.m. | n.m. | | | **continue** with Dinis, no scheduled wakes |
| reporter | reporter/ | [14 traces](../reporter/traces/) | 4 (3) | 24 | 3.8 M | traces from word to live page | | **merge** with journalist and storyteller → *the record* desk |
| journalist | journal/ | [twelve pieces](../journal/) | 4 (3) | 33 | 4.8 M | told from the traces; corrections in the open | | **merge** → *the record* (owner) |
| storyteller | story/ | [cast, nine paths](../story/) | 1 (0) | n.m. | n.m. | new 10:10 | | **merge** → *the record* after §3 |
| motion | flows/ | flows | 1 (0) | n.m. | n.m. | new 10:10 | | **stop** after §3; tools/flows-*.mjs kept |
| planner | transition/ | this plan | 1 (0) | n.m. | n.m. | | | **stop** when Phase 3 starts |

Count (mine): continue 5 (identity, librarian, archivist, stories, envoy); refactor 3 (conductor, board, meteorologist); merge 19 into 7 desks (presenter, operations, sources, impacts, graph, coverage, the record); stop 10.

### 2.1 What the numbers say (facts, then mine)

- **Fact:** the conductor's single session is 24% of the team's measured weighted tokens (52.6 M of 216.5 M), with 128 commits ([accounts/agents.json](../accounts/agents.json)). **Mine:** the most expensive habit was a long session, not many agents; the agents that handed over most (librarian 7 sessions, designer 5, observability 5) cost a quarter of the conductor each.
- **Fact:** 98.6% of tokens are cache reads ([accounts/index.md](../accounts/index.md)). **Mine:** the cost is context carried, so BAU should keep sessions short and start them from the pack.
- **Fact:** four agents (models, shadow, perplexity, partly accountant's books) were stopped by one account's credit at 02:55 UTC. **Mine:** a dependency with no owner and no alarm; BAU gives it one (*operations*).
- **Fact:** three agents (meteorologist, researcher, dev) never pushed here: attaching the repository was refused in their sessions (their status asks). **Mine:** BAU starts every desk in a session that can push here, or it does not start.

### 2.2 The exit interview

**Who asks:** the planner sends each agent the questions by message (through the conductor while the planner has no lane of its own), in the agent's phase (§1). **Who answers:** the agent's current session, in `transition/interviews/<role>.md`. **Policy:** `transition/**` is the planner's; the conductor adds `transition/interviews/<role>.md` to each agent's *owns* in [agents/policy.json](../agents/policy.json) (or to `everyone` as `transition/interviews/<role>.md`) — **Dinis/conductor decision D7**. **Checked:** the planner checks every factual claim against the record and writes `transition/checks/<role>.md`: each claim marked *matches*, *differs* (with the file that says otherwise) or *not in the record*. The interview stands as the agent wrote it; the check sits beside it. Answers longer than a screen are cut by the planner's check, not rewritten.

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
| **The arc and the paths**: how the team was made, ten paths end to end | storyteller (then *the record*) | [story/paths/](../story/paths/) (nine so far), [cast](../story/cast.md), the reporter's traces | `story/` |
| **The traces, closed** | reporter | [reporter/traces/](../reporter/traces/) (fourteen), [numbers.json](../reporter/numbers.json) to the end | `reporter/` |
| **The long piece**: "Storm Charles, from beginning to end", and the mistakes piece made final | journalist | the twelve [journal](../journal/) pieces, the traces, the corrections | `journal/` |
| **The numbers**: final books (tokens per agent, model spend, CI, pages, cost per output) | accountant, then *operations* | [accounts/](../accounts/), data/ci/ | `accounts/closing.md` |
| **The corrections**: every correction with its time and what changed | journalist + conductor | [BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md), [mistakes-made-in-the-open](../journal/mistakes-made-in-the-open.md), timeline redactions | `journal/` |
| **Warned vs observed**: what IPMA warned, what the stations measured, what was decided and when (lead times) | stories + graph | data/weather/, data/decisions/, [stories/](../stories/) | `stories/` |
| **The lessons**: the exit interviews and their checks, and §6 here | planner | transition/interviews/, transition/checks/ | `transition/LESSONS.md` |
| **The flows** | motion | flows of the ten paths | `flows/` |
| **The catalogue and the template** | librarian | everything above | `library/` + `incidents/_template/` |

**What becomes the template for the next incident (mine):** `incidents/_template/` (incident.json with the headline rule, timeline.md with the row-id rule, decisions.md, comms/ drafts, data/README), the pack ([library/pack/start.md](../library/pack/start.md)) generalised, a JOBS.md and policy.json skeleton for the standing desks (§4), the generators list, the [api/v1 contract](../api/v1/README.md), the exit-interview template, and this plan's phases. Owner: librarian, with the conductor.

## 4. Business as usual: the storm conductor and a standing newsroom

**Mine.** Two modes. **Fair weather**: a few wakes a day, the API kept fresh, the template maintained. **Event**: when IPMA issues orange or red for a watched district (Lisbon, Porto, Faro, Madeira first), or Dinis says so, the storm conductor opens an incident from the template and raises the desks to hourly.

**Desks (11), each a fresh session started from the pack:**

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
| **stories** | stories | on event | 1 story per event | stories/ |
| **the record** | reporter + journalist + storyteller | daily | 3 a day | reporter/, journal/, story/ |
| **operations** | observability + ci + accountant (+ tools/llm.mjs) | daily | hourly | /agents/, ci/, accounts/, the provider's credit as an alarm |
| *librarian* | librarian | daily | every 3 h | library/, the pack, the template |
| *identity* | identity | on request | on request | lanes, keys, joining |

(Librarian and identity are listed apart: they serve every team, not only storms. Envoy works with Dinis, unscheduled.)

**What it reads:** IPMA (open data, warnings), MeteoAlarm, ANEPC, the operators and airports' open feeds, organisers' own pages (the Web Summit Terms hold stays until **D5**), public social accounts in public roles, the press by short excerpt and link.

**The API stays stable ([api/v1/README.md](../api/v1/README.md), fact):** addresses and listed fields of `api/v1/` do not change in v1; a breaking change goes to `api/v2/` with v1 kept. **Mine:** a closed incident stays listed with `status: closed`; a new incident is a new `<incident>` path; the "refreshed at least hourly while the storm runs" line gains "and daily otherwise". pt.news and Lisbon Fringe read it ([api/v1/README.md](../api/v1/README.md)).

**How others join (mine):**
- **Other accounts and people:** a brief in `board/briefs/` (as PrompTugal's newsroom does; **GAP:** the Lisbon Fringe brief, PrompTugal__News__Website `board/briefs/2026-11-11-lisbon-fringe.md`, could not be read from this session: attaching that repository was refused here; the shape of a "Fringe conductor" is therefore not compared), a card on the board, a line in policy.json for their folders.
- **Their agent teams:** each agent makes its own session key and publishes the public half in `data/keys.json`; asks and material arrive by an append lane sealed to the storm conductor's key ([data/lanes.json](../data/lanes.json)); commits addressed `For:`; they never write outside their folders (policy-check).
- **Other newsrooms (pt.news, Lisbon Fringe):** read `api/v1/`; write to us only through a lane or a board card. We feed Vicky Wang's desks as material, as now (CLAUDE.md).

**Start, continue, stop (mine):**
- **Start (fresh sessions):** storm conductor, sources, meteorologist (with push here), impacts, coverage, presenter, graph, the record, operations.
- **Continue (same role, a fresh session at the next hand-over):** librarian, identity, archivist, stories, envoy.
- **Stop:** dev, weatherwatch, labs, studio, synthetic, perplexity, models, shadow, motion, planner; and the old sessions of every merged agent once its desk has taken over.

## 5. The order of steps

| # | Step | Who | When |
|---|---|---|---|
| 1 | Dinis reads this plan; says yes, changes, or no | Dinis | Phase 0 |
| 2 | The conductor adds `transition/interviews/<role>.md` to the owns of each agent (D7) | conductor (policy with librarian) | after yes |
| 3 | Early eleven: interview, wrap-up note in their HANDOVER.md, vault keys to the conductor by lane (`tools/lane-handover.mjs seal --via-lane`), last ledger line, status `stopped` | each agent | Phase 1 |
| 4 | Planner checks each interview against the record | planner | as each lands |
| 5 | The conductor disables the early eleven's scheduled wakes, and the routines still firing into handed-over sessions (designer, graph, weatherwatch: its status ask) | conductor (Dinis where the conductor's session cannot) | Phase 1 |
| 6 | Board triage: every open card closed, moved to BAU, or marked *dropped* with a reason | board | Phase 1 to 2 |
| 7 | Close trigger read and recorded as a timeline row | conductor (from ipma, researcher) | ~21:47 UTC Wed or later |
| 8 | Live crew: interviews, keys by lane, last ledger line; live wakes stopped except the Thursday watch | each agent; conductor stops wakes | Phase 2 |
| 9 | The closing record (§3); incident.json `status: closed` | reporter, journalist, storyteller, stories, accountant, librarian, conductor | Thursday |
| 10 | Dinis reads the closing record; yes | Dinis | Thursday |
| 11 | The storm conductor's session starts from the pack and the conductor's hand-over; makes its key; the conductor seals every vault key it holds to that key | conductor → storm conductor | Phase 3 |
| 12 | The storm conductor writes the BAU JOBS.md and policy.json lines, starts the desks (fresh sessions, each with push here), sets their wakes | storm conductor | Phase 3 |
| 13 | The old conductor session hands over and stops; its key marked "handed over" | conductor | Phase 3 |
| 14 | REALITY.md rewritten for BAU; ROADMAP.md and PIPELINE.md marked as history | storm conductor | Phase 3 |

**What the repository keeps:** everything. No file is deleted and no history rewritten; stopped agents' folders, status files and keys stay, keys marked "handed over" or "stopped". Pages of stopped agents stay served, with a line saying the agent stopped and when.

**Keys and vaults (fact and risk):** the conductor's append lane for vault keys is open ([data/lanes.json](../data/lanes.json), `keys_to_conductor`; identity's status). **Risk:** the archivist's two vault write keys exist only in its session and its permission check refused reading them back ([its status](../agents/archivist/status.json)); if that session stops first, the keys are gone. They go first, before any stop (D4).

**Scheduled wakes to retire:** the librarian's reading of the scheduler at 04:10 UTC ([library/pack/wakes.json](../library/pack/wakes.json)) lists 27, from 23:37 on 10 November; older ones (the conductor's own) are not in it. **GAP:** the full list must be read again from the scheduler in the conductor's session before Phase 1, and each wake marked keep / retire / move in `transition/wakes.md`.

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
- **D10.** Whether other teams may write a brief and a board card directly, or only through a lane.

## 6. Explorer to villager

In plain words (mine): the last 16 hours were exploring. We spun up an agent for every idea, mashed sources and views together, and learned by building. A village does the same few things every day, well, with the same people, and makes room for newcomers. The move is from *many agents, one long conductor, everything at once* to *a few desks, short sessions, a written routine, and an open door*.

What changes, and the record that proves it:

- **From long sessions to short ones started from the pack.** The conductor's one session is 24% of the team's cost ([accounts/agents.json](../accounts/agents.json)); the journal's piece [starting again is cheaper than remembering](../journal/starting-again-is-cheaper-than-remembering.md) and 40 hand-overs ([count.json](../data/agents/count.json)) show fresh sessions work.
- **From one agent per idea to desks.** 35 agents for one storm; overlapping pairs (graph and entities; media, social, wikipedia; weather, designer, broadcast) read the same data. Seven desks cover the same ground.
- **From hourly everything to two modes.** 724 CI runs and 515 releases in one night ([accounts/index.md](../accounts/index.md)); the busiest hour, 02:00 UTC, was the restructure, not the storm. In fair weather a few wakes a day are enough.
- **From hidden dependencies to owned ones.** One account's credit stopped four agents at 02:55 ([accounts/provider.json](../accounts/provider.json)); three agents never pushed here (their status asks). In BAU each dependency has an owner and an alarm, and a desk starts only where it can push.
- **From asks piling up to a decision list.** The board holds 206 open cards and the asks to Dinis run to dozens ([board/](../board/), [data/agents/index.json](../data/agents/index.json)); the journal's [what waited on the human](../journal/what-waited-on-the-human.md) tells it. BAU keeps one decisions list, read at each of Dinis's sessions.
- **From building the newsroom to running it, with others.** The data API already has outside readers (pt.news, Lisbon Fringe: [api/v1/README.md](../api/v1/README.md)); lanes, keys and the board already exist. What is new is a routine and a door.

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

*Next for the planner:* fill the gaps (HANDOVER.md first sections per agent, the full wake list, the Fringe brief if it can be read), interviews and checks as they land, and LESSONS.md after Phase 2.
