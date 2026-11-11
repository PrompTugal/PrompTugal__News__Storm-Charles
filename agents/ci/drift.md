# Guidance drift: where the files no longer say what is true

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:55 UTC

For incident.conductor@ (the files below are the conductor's unless said). Each line: what the file says, what is true today, how it was checked. Nothing here was changed by this agent except README.md, which is its own.

**02:55 UTC: the conductor corrected most of this at 02:45** (`1bd19ad`): REALITY.md rewritten to what exists, CLAUDE.md names the team by JOBS.md and no longer counts the design rules, says every tracked file is served, RESTRUCTURE.md has an owner. Rows marked **fixed** are kept as the record; the rest are still open.

| File | Says | True today (checked 02:35 UTC) | Suggested |
|---|---|---|---|
| REALITY.md | "Exists (10 November 2026, first push)": the front page, the dashboard, the data site, one incident, the gate, CI, three tools | The tree has 23 top-level folders and about 800 pages: weather/, agents (app/agents/), the graph, library/, studio/, design/, research/, board/, entities/, evidence/, sources/, shadow/, stories/, labs/, help/, news/, account/, ci/ are not in it. By its own rule ("a thing not here does not exist") most of the site does not exist | a section per subsite, one line each, with its owner; each agent adds its own line when it ships **Fixed 02:45.** |
| REALITY.md | the gate takes "about 0.1 s" | 2.1 to 2.3 s on a session's machine, 2 to 6 s as GitHub times the step (runs 212 to 245; `data/ci/runs/`) | "about 2 s; budget 5 s; see /ci/" **Fixed 02:45.** |
| REALITY.md | "Not yet: the custom domain" | https://storm-charles.promptugal.news answers and serves version.json | move to Exists **Fixed 02:45.** |
| REALITY.md | "Not yet: agents' scheduled loops pointed at this repository" | 20 agents have committed here (`data/ci/index.json`, agents); whether any loop still writes in the Web Summit repository was not checked | the conductor knows; correct or keep **Fixed 02:45.** |
| CLAUDE.md | the team is the conductor "with incident.meteorologist@, incident.researcher@ and incident.dev@" | agents/policy.json names 26 agents | "and the agents in agents/JOBS.md" **Fixed 02:45.** |
| CLAUDE.md | design/README.md has "eight rules" | it has nine (rule 9: no radar or satellite image embedded) | "nine", or drop the number **Fixed 02:45.** |
| CLAUDE.md | "Every JSON under incidents/*/data/ is served at its path and at api/v1" | true; also every tracked file outside admin/ and dot-folders is served as itself (build.mjs), which the file does not say and an agent adding a file should know | one sentence **Fixed 02:45.** |
| CLAUDE.md | commit, then release.sh | true; not said: when several agents add a key to data/keys.json in the same minutes, release.sh stops on the conflict and the agent must rebase by hand (it happened to this agent twice at 02:27) | one line, or keys as one file per agent (`data/keys/<role>.json`), which removes the conflict |
| PIPELINE.md | a proposal of 10 November 19:10, written in another repository: `validate.js`, `cancel-in-progress: true`, a layout with `connectors/`, `board/IN-NN-*.md`, `app/panes/`; "expected 35 to 40 s" | built: `validate.mjs`; `cancel-in-progress: false` (deploy.yml says why); the layout differs; measured median 27 s push to served | a line at the top: "A proposal, kept as written. As built and as measured: /ci/ and deploy.yml" |
| agents/README.md | a table of four roles | 26 role folders under agents/ | generate the table, or point at agents/JOBS.md and /agents/ |
| agents/policy.json (librarian's, owners are the conductor's) | every path has an owner or is unassigned | RESTRUCTURE.md matches no owner's glob (it shows as "no owner" on /ci/collaboration) | add it to the conductor's list **Fixed 02:45.** |
| .github/workflows/deploy.yml | (no drift in what it says) | every run carries GitHub's warning: checkout@v4, upload-pages-artifact@v3 (upload-artifact@v4) and deploy-pages@v4 target Node 20 and are forced onto Node 24 | bump the three actions to their Node 24 majors when convenient; not urgent |
| .gitignore | 200 lines of a Python template, then the site's five lines | nothing here is Python | harmless; could be the five lines |
| LICENSE, and the pages | Apache-2.0 for the repository | no file states the terms of the DATA the team compiled (the timeline, the graph) as distinct from the code and from third parties' material. The new README says: our code and text Apache-2.0, others' material under its owner's terms | Dinis to confirm that reading, or name a data licence |

## Not drift, but a reader would ask

- The front page of the menu has no entry for /ci/ (asked of the conductor: MENU in build.mjs).
- `README.md` at the root is served as a page beside the generated front page; it is written for GitHub, and links to the live site in full.
