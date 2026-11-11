# REALITY: what exists (a thing not in it does not exist)

> Kept by incident.conductor@web-summit.dinis, 11 November 2026, 02:45 UTC. Counts move by the minute tonight; the live figures are on [the CI page](ci/README.md) and [the agents page](agents/README.md). What each round changed is in [What's new](news/README.md).

## Exists and is served (https://storm-charles.promptugal.news, branch dev)

- **Two faces.** The Weather face at `/` (weather/, app/weather/): IPMA's warnings in force, the day by the hour, what is closed, Madeira, from our own JSON only (the gate refuses an outside request in its code). The data room at `data-room/`: the evidence.
- **The incident** `incidents/2026-11-10-storm-charles/`: timeline (rows with permanent ids, addresses, and our capture where one exists), decisions, the headline, `data/` (weather, decisions with a state per service decision, signals), served also at `api/v1/`.
- **Entities** (`entities/`): a node and a page per thing mentioned, a page per day and per service; the linker links names on every built page; the lens.
- **Wayback** (`evidence/`): captures of outside pages with screenshot, hash and time, in vaults; a page per capture. Began 11 November 02:16; most timeline addresses are not captured yet.
- **Sources** (`sources/`): 46 bodies; MeteoAlarm's feed browsed with diffs; IPMA's open data mapped (29 data sets) with hourly reads in a data vault.
- **Stories** (`stories/`): claims with supports re-resolved on every build. **Labs** (`labs/`): experiments in timelines, decisions, weather. **Studio** (`studio/`): animated explanations and the agents' characters.
- **Research**: media watch (outlets, by-lines, charts), social (Bluesky: official and public-role accounts; the public as counts), Wikipedia, weather sites (106 site pages, studies), shadow reporting (answer engines asked hourly, compared with our record).
- **Graph and query** (`app/graph/`, `data/graph/`, `data/query/`): question-first graph, the ontology drawn, lead times.
- **Team**: 26 agents, each with a key, a home page, a status file, a path policy (`agents/`); the board (`board/`, with a page of what waits on Dinis); CI made visible (`ci/`); jobs drawn; log in (`account/`).
- **Help and What's new** (`help/`, `news/`); a viewer for every served file (`view/?path=`); the library and catalogue.
- **The frame**: full width, a menu filled from the pages that exist, breadcrumbs, the reader's panel (lens, this item, source, theme, version), the version in the chrome.
- **The pipeline**: one job; the gate (about 3 s on a session's machine and rising with file count; budget 5 s); CI tags `v0.1.<run>`; push to served measured (median about 27 s). `release.sh` gates once, then rebases and pushes.

## Exists, with a stated limit

- **Other models**: the ledger and wrapper exist (`tools/llm.mjs`); the shadow agent has made calls; the evals agent (`models/`) has not published yet.
- **Meteorology lineage** (`meteorology/`): started; not published when this was written.
- **Vault keys**: of the vaults made tonight the conductor holds one key (IPMA's data vault); the others exist only in their agents' sessions.
- **Signatures**: every commit is signed by the hosting service's one key; nothing is signed with an agent's own key. Agent identity in a commit is the `Agent:` trailer.
- **The meteorologist, researcher and dev agents** still write in SGit-AI__Website__Web-Summit; the conductor syncs their files here.

## Does not exist

- Dinis's own key and his lane to the conductor (the page is there; the key is not made).
- Branch protection on main and dev. Signed releases. A data licence distinct from the code's (README states a reading; Dinis to confirm).
- Outreach: nothing has been sent to anyone. Drafts only (`outreach/`).
- A MeteoAlarm archive key (the Madeira Tuesday-afternoon gap stays open).
- Behaviour policies agreed by Dinis (drafts in `agents/*/policy.md`).
