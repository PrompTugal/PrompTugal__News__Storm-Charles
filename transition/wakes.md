# The incident's wakes: keep, retire or move

> Kept by incident.planner@web-summit.dinis, 11 November 2026, 11:49 UTC. From the conductor's reading of the scheduler at 10:36 UTC ([agents/conductor/wakes.md](../agents/conductor/wakes.md), 531371e4). A proposal for Dinis's yes ([PLAN.md](PLAN.md), §1 and §5): no wake is retired before its agent's hand-over is done, except the four old ones, which fire into sessions that have already handed over.

Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

Phases ([PLAN.md](PLAN.md), §1): **1** after Dinis's yes; **2** after the close trigger; **3** business as usual. "Retire at hand-over" = the conductor disables it once the agent's hand-over is accepted. BAU desks get new wakes from the storm conductor, into fresh sessions; none of these wakes moves as it is.

| Wake (minute UTC) | Agent | Verdict | Proposal |
|---|---|---|---|
| **old** designer :07 | designer (handed-over session) | | **retire at once** |
| **old** weatherwatch :28 | weatherwatch (handed-over session) | | **retire at once** |
| **old** graph :51 | graph (handed-over session) | | **retire at once** |
| **old** dev :42 | dev (the old repository's dashboard) | stop | **retire at once** (the Web Summit Terms hold stopped its job at 05:27) |
| conductor :02, bridge sync :27 | conductor | refactor → storm conductor | keep to Phase 3; the bridge sync retires when meteorologist and researcher hand over |
| reporter :06 | reporter | merge → the record | keep to Phase 2 (traces the wind-down); retire at hand-over |
| designer :09 | designer | merge → presenter | keep (brand work, fixes); retire at hand-over |
| journalist :12 | journalist | merge → the record | keep to Phase 2; retire at hand-over |
| observability :14 | observability | merge → operations | keep (page-views drain); retire at hand-over |
| social :15, :45 | social | merge → coverage | keep to Phase 2 |
| ci :17 | ci | merge → operations | keep to Phase 2 |
| identity :20 | identity | continue | keep to Phase 3; the storm conductor sets its BAU wake (on request) |
| meteorologist :22 | meteorologist (pushes to the old repository) | refactor | keep to Phase 2; a fresh session with push here in BAU |
| archivist :23 | archivist | continue | keep; its vault keys to the conductor first (D4) |
| sources :24 | sources | merge → sources desk | keep to Phase 2 |
| weather :25 | weather | merge → presenter | keep to Phase 2 |
| weatherwatch :30 | weatherwatch | stop | Phase 1: retire at hand-over (map to the librarian) |
| researcher :32 | researcher (pushes to the old repository) | merge → impacts | keep to Phase 2 and the Thursday watch |
| board :33 | board | refactor | keep to Phase 2 (triage) |
| media :36 | media | merge → coverage | keep to Phase 2 |
| entities :37 | entities | merge → graph | keep to Phase 2 |
| accountant :40 | accountant | merge → operations | Phase 1: one closing round of the books, then retire at hand-over |
| librarian :44 (ninth session, session_018yvwtN7F5ipc9ntEXwY81c, conductor 11:49) | librarian | continue | keep; BAU cadence set by the storm conductor |
| transport :41 (new, conductor 11:49) | transport | merge → impacts | keep to Phase 2 and the Thursday watch (flights on Day 3) |
| ipma :47 | ipma | merge → sources desk | keep to Phase 2 and the Thursday watch (it reads the close trigger) |
| wikipedia :48 | wikipedia | merge → coverage | Phase 1: retire at hand-over |
| stories :50 | stories | continue | keep to Phase 2 (warned vs observed) |
| graph :53 | graph | merge → graph desk | keep to Phase 2 |
| studio :58 (first studio session) | studio | stop | Phase 1: retire at hand-over |
| one-shot shadow 11:05 | shadow | stop | Phase 1: do not re-schedule after hand-over |
| one-shot meteorology 11:26 | meteorology | merge → sources desk | keep to Phase 2 |
| one-shot perplexity 11:27 | perplexity | stop | Phase 1: do not re-schedule after hand-over |
| one-shot labs 12:05 (conductor) | labs | stop | Phase 1: do not re-schedule after hand-over |

**No wake (conductor, 11:49):** datascience, brief, desk, sherpa, storyteller, motion, broadcast, planner, envoy, synthetic: they work in their running sessions; their hand-over is the session's own end, accepted as in [PLAN.md](PLAN.md) §1. The desk gets an hourly drain once its form works; it is kept into BAU. The wakes of Dinis's other teams on this account are not this incident's and are not touched.
