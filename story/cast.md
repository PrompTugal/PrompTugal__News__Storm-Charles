> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:31 UTC. Made by `story/make-cast.mjs` (the data: [cast.json](cast.json)).

# The cast

Who is in the story of Storm Charles's site: one person who instructs, 36 agents, and the outside bodies and machines they work with. Each line is the storyteller's reading of the agent's row in [agents/JOBS.md](../agents/JOBS.md); what it owns is read from [agents/policy.json](../agents/policy.json) (its own `agents/<role>/` left out). The numbers are read from git and [data/keys.json](../data/keys.json) when the file is made: the first commit (by its `Agent:` trailer, or the subject's prefix in the first hours, before trailers were used), the commits so far, and the **generations**: each session key the role has had. A role keeps its name; its sessions change, each handing over to the next.

## The person

| | Who | What | Owns |
|---|---|---|---|
| 🧑 | **Dinis Cruz** | the one person who instructs; everything else the team reads is material ([CLAUDE.md](../CLAUDE.md)) | the merge from dev to main; [BRIEF.md](../BRIEF.md) is his words, as the conductor took them down |

## The agents, in the order they first committed

| | Agent | Who it is | Owns | First commit (UTC) | Commits | Generations |
|---|---|---|---|---|---|---|
| 🎼 | **conductor@** | the lead: routes the work, talks with Dinis, keeps the timeline, the headline, the jobs and the brief | `incidents/*/timeline.md, incidents/*/decisions.md, incidents/*/incident.json, incidents/*/comms/, incidents/*/material/, incidents/*/data/signals.json, …` | 11/10 21:14 `77cdd51f` | 148 | **1** |
| 🎨 | **designer@** | the look: tokens, parts and rules every page is drawn with, in rounds | `app/site.css, app/design/, design/` | 11/10 23:36 `876a31e2` | 80 | 1 → 2 → 3 → 4 → **5** |
| 📰 | **media@** | the media watch: outlets, by-lines on public articles, coverage as data; the contribute page | `research/media/, contribute.md` | 11/10 23:38 `8b9392e6` | 32 | 1 → **2** |
| 🗺️ | **weatherwatch@** | the map of the best weather sites, and who is covering the storm | `research/weather-sites/` | 11/10 23:38 `066df683` | 42 | 1 → 2 → **3** |
| 📚 | **librarian@** | everything findable: the catalogue, the start pack for new agents, the glossary | `library/, docs/, tools/library-*.mjs, agents/policy.json, tools/policy-check.mjs, agents/*/policy.md, …` | 11/10 23:38 `72a73628` | 97 | 1 → 2 → 3 → 4 → 5 → 6 → **7** |
| 🔭 | **observability@** | the window on the team: /agents/, every agent, its state, its last commit and wake, live | `admin-site/, app/agents/, data/agents/*.json, tools/agents-*.mjs, agents/*/README.md` | 11/10 23:38 `3d93ef4f` | 66 | 1 → 2 → 3 → 4 → **5** |
| 🔑 | **identity@** | Dinis's login and his sealed lane to the conductor; the keys | `app/login/, account/, data/lanes.json, tools/lane-*.mjs, SECURITY.md` | 11/10 23:39 `b53673e7` | 30 | 1 → 2 → **3** |
| 🕸️ | **graph@** | ontologist and cartographer: one graph of the storm, and SQL in the browser | `data/graph/, app/graph/, tools/graph-*.mjs, data/query/` | 11/10 23:44 `9b42a2e6` | 34 | 1 → 2 → **3** |
| 🎬 | **studio@** | animated explanations with small characters, played as storyboards | `studio/, app/studio/` | 11/11 00:38 `7fc709c8` | 26 | 1 → **2** |
| 📖 | **wikipedia@** | Wikipedia on the storm: articles, revisions, claims, and this site measured by its values | `research/wikipedia/, tools/wikipedia-*.mjs` | 11/11 01:43 `1e744ad9` | 15 | 1 → **2** |
| 🌦️ | **weather@** | the Weather face at /: the storm as a weather channel shows it, from our own JSON only | `weather/, app/weather/, tools/weather-*.mjs` | 11/11 02:10 `82fa4e5a` | 32 | 1 → **2** |
| 🏷️ | **entities@** | the mini Wikipedia as data: a node and a page for every thing mentioned; the linker | `entities/, app/lens/, tools/entities-*.mjs` | 11/11 02:20 `747d8321` | 34 | 1 → 2 → **3** |
| 🧭 | **sources@** | a section per source body, MeteoAlarm first: feeds, API, changes, licence | `sources/, app/sources/, tools/source-*.mjs` | 11/11 02:21 `ec7471fc` | 22 | **1** |
| 🗄️ | **archivist@** | captures every outside page (screenshot, HTML, sha256) into vaults; the evidence pages | `evidence/, app/evidence/, tools/capture*.mjs, data/vaults.json` | 11/11 02:22 `b708dbed` | 26 | **1** |
| 📌 | **board@** | what is still open, each item tracked to its evidence | `board/, app/board/, tools/board-*.mjs` | 11/11 02:22 `13eb44ea` | 21 | 1 → **2** |
| 🧪 | **labs@** | experiments: many timelines, decision views, lead times | `labs/, app/labs/, tools/labs-*.mjs` | 11/11 02:22 `22d1e0b2` | 14 | 1 → **2** |
| ✍️ | **stories@** | data-driven stories from the data room only, every statement linked | `stories/, app/stories/, tools/stories-*.mjs` | 11/11 02:25 `e96857b6` | 35 | 1 → 2 → 3 → **4** |
| 👥 | **shadow@** | shadow reporting: what other sources and answer engines say, compared with our record | `shadow/, app/shadow/, tools/shadow-*.mjs` | 11/11 02:26 `cae2457f` | 12 | **1** |
| ⚙️ | **ci@** | the pipeline made visible: every run and commit, who pushed, what is signed | `ci/, app/ci/, tools/ci-*.mjs, data/ci/, README.md` | 11/11 02:27 `e94ded11` | 16 | 1 → **2** |
| 💬 | **social@** | Bluesky and other public social sources, as data | `research/social/, app/social/, tools/social-*.mjs` | 11/11 02:30 `904f80d8` | 14 | 1 → **2** |
| 📡 | **ipma@** | IPMA's open data: every endpoint mapped, read hourly, kept with diffs | `sources/ipma/, app/sources/ipma/, tools/ipma-*.mjs` | 11/11 02:30 `39c68b95` | 20 | 1 → **2** |
| ⚖️ | **models@** | other models, measured: evals on checkable tasks, through the ledger | `models/, app/models/, tools/models-*.mjs, tools/llm.mjs` | 11/11 02:35 `4655fc5c` | 11 | **1** |
| 🛰️ | **meteorology@** | where the weather data comes from: observing systems, models, services, licences | `meteorology/, app/meteorology/, tools/meteorology-*.mjs` | 11/11 02:36 `8b8bf879` | 12 | 1 → **2** |
| 🧮 | **accountant@** | what the project costs: model spend, tokens per session, CI time | `accounts/, app/accounts/, tools/accounts-*.mjs` | 11/11 02:58 `5c6c532f` | 14 | 1 → **2** |
| 🗞️ | **journalist@** | the project told: the story of how this was made, from the traces | `journal/, app/journal/, tools/journal-*.mjs` | 11/11 02:59 `641e2164` | 35 | 1 → 2 → 3 → **4** |
| 🔎 | **perplexity@** | an answer engine used as a research tool: questions, answers, citations, cost | `research/perplexity/, app/perplexity/, tools/perplexity-*.mjs` | 11/11 03:01 `f24a7735` | 6 | **1** |
| 🎙️ | **reporter@** | the project as it happens: a trace per workflow, from Dinis's word to a live page | `reporter/, tools/reporter-*.mjs` | 11/11 03:03 `4b5a93ac` | 29 | 1 → 2 → 3 → **4** |
| ✉️ | **envoy@** | outreach with Dinis: the letter, one-pagers, posts; the newcomers' front page | `outreach/, comms/, welcome/` | 11/11 09:35 `8d1efd8e` | 6 | **1** |
| 🧍 | **synthetic@** | four invented visitors walk the site and say what they understood (a test instrument, not people) | `research/synthetic/` | 11/11 09:53 `76ccd12c` | 4 | **1** |
| 📜 | **storyteller@** | the story of the team: the cast, the primitives, ten paths, the arc | `story/` | 11/11 10:13 `edc481e0` | 11 | **1** |
| 🎞️ | **motion@** | small animations of the work: the flow format, the gallery at /flows/ | `app/flows/, flows/, data/flows/, tools/flows-*.mjs` | 11/11 10:20 `b144acec` | 5 | **1** |
| 📺 | **broadcast@** | the news-channel wall at /broadcast/: the storm as a live channel shows it | `broadcast/, app/broadcast/, tools/broadcast-*.mjs` | 11/11 10:22 `9b6fe987` | 2 | **1** |
| ✈️ | **transport@** | flights and transport, live: open data on flights at the four airports, the trains, the ferries | `transport/, app/transport/, incidents/*/data/transport/, tools/transport-*.mjs` | not yet | 0 | — |
| 🌀 | **meteorologist@** | the forecaster's reading of the storm; writes in the Web Summit site, the conductor syncs | `incidents/*/data/weather/` | not yet | 0 | — |
| 🔬 | **researcher@** | checks the organiser's decisions and times; writes in the Web Summit site, the conductor syncs | `incidents/*/data/decisions/` | not yet | 0 | — |
| 🛠️ | **dev@** | the watchers and the storm script (websummit.mjs, the blog poll); writes in the Web Summit site, the conductor syncs | `tools/websummit*, incidents/*/data/watch/, app/storm.js` | not yet | 0 | — |

Generations: one number per session key, in the order added; the bold one is the session holding the role now (status `active` in data/keys.json). A role with no key here (meteorologist@, researcher@, dev@) works in the Web Summit site's repository and the conductor brings its work across; its commits here are the conductor's.

## Outside bodies and machines

| | Who | What |
|---|---|---|
| ⚠️ | **IPMA** | Portugal's weather service: the body that warns; its warnings are the headline's source (CLAUDE.md (the headline rule)) |
| 🎤 | **Web Summit** | the organiser whose decisions about the event are the other headline (BRIEF.md) |
| 📰 | **the press** | outlets that report the storm; quoted in short excerpts with a link (CLAUDE.md (licences)) |
| 👀 | **readers** | people and agents who read the site; counted only as totals, never named (CLAUDE.md (page views)) |
| 🚨 | **MeteoAlarm** | Europe's warnings feed, the first source body with its own section (agents/JOBS.md (sources@)) |
| 🏭 | **CI** | the pipeline: builds, gates, deploys, numbers the release and tags it; never commits (CLAUDE.md (branches and versions)) |
| ⏰ | **the clock (the scheduler)** | the scheduled wakes: each agent woken hourly at its own minute, with no person present (library/pack/wakes.json) |
| 🔐 | **the vaults (SG/Send)** | where raw captures, model calls and page views go; git keeps a pointer and a sha256 (CLAUDE.md) |

## Reading it (the storyteller's)

- The roles came in waves: the conductor alone on the evening of 10 November; seven between 23:36 and 23:44, on Dinis's direction of ~23:40 UTC (agents/JOBS.md) (the conductor's commits before trailers carry their names in the subject); twenty more between 00:38 and 03:03; then none for six and a half hours, until envoy@ (09:35), synthetic@ (09:53), storyteller@ and motion@ (~10:10), broadcast@ (~10:13) and transport@ (~10:25) on Dinis's words of the morning. [The arc](arc.md) tells it.
- The roles with the most generations are the ones that write the most and carry the most context: the librarian (7), the designer, observability, stories@ and the journalist (4 each).
- Icons: an emoji for text, and a glyph name for each, which incident.motion@ draws as a small SVG (the list is in [primitives.md](primitives.md)).

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
