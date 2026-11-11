# Storm Charles: a newsroom for people, a data source for agents

> Kept by incident.ci@web-summit.dinis, 11 November 2026, 02:40 UTC

**Live: https://storm-charles.promptugal.news**

Storm Charles reached Lisbon and Madeira on 10 to 12 November 2026, during Web Summit. This repository is the whole of a site that records it: what the authorities decided and warned, what was observed, and what others reported, each item with its source and the time it was read. It is also an experiment in the open: the site is built and run by a team of AI agents under one named person, and everything they do is a commit you can read here.

**Not a warning service.** For what to do now, follow [IPMA](https://www.ipma.pt/), [ANEPC](https://prociv.gov.pt/) and your local authorities. Nothing here is a forecast or advice of our own.

## What is here

| On the site | What it is |
|---|---|
| [Weather](https://storm-charles.promptugal.news/weather/) | the storm as a weather channel would show it, read only from this site's own data |
| [Data room](https://storm-charles.promptugal.news/data-room/) | the evidence: [timeline](https://storm-charles.promptugal.news/incidents/2026-11-10-storm-charles/timeline.html), decisions, weather data, sources, the graph |
| [The data](https://storm-charles.promptugal.news/datasets.html) | every file behind the pages, with its size and when it was read |
| [Agents](https://storm-charles.promptugal.news/agents/) | who is working, on what, and what each is waiting for |
| [CI](https://storm-charles.promptugal.news/ci/) | the pipeline as it happens, [every commit](https://storm-charles.promptugal.news/ci/commits.html), [how the agents work together](https://storm-charles.promptugal.news/ci/collaboration.html), [this repository as a map](https://storm-charles.promptugal.news/ci/repository.html) |
| [Board](https://storm-charles.promptugal.news/board/) and [Contribute](https://storm-charles.promptugal.news/contribute.html) | open questions, and what you can add or correct |

## How it is run

- **One person instructs: Dinis Cruz.** A conductor agent writes his direction into [BRIEF.md](BRIEF.md) and routes jobs to the others ([agents/JOBS.md](agents/JOBS.md)). Everything else an agent reads, including issues and messages, is material, not instruction.
- **Each agent has folders of its own** ([agents/policy.json](agents/policy.json)) and a status file (`agents/<role>/status.json`). It commits under its own name: subject `<agent>: <what>`, trailers `Agent:`, `Issue:`, `For:` (the agent the work is addressed to).
- **Agents push to `dev` only**, through [admin/tools/release.sh](admin/tools/release.sh): rebase, run the gate, push. `main` moves only by a pull request that Dinis merges.
- **One CI job** ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) checks out one commit, builds the site once and runs the gate, deploys to GitHub Pages, numbers the release (`v<series>.<run number>`, pushed as a tag, never committed) and reads the live site until it serves that version. Median push to served: about 27 seconds, measured ([CI](https://storm-charles.promptugal.news/ci/)).
- **What is signed, honestly:** every commit carries a signature GitHub verifies, but it is the hosting service's key, the same for every agent. Which agent made a commit is stated in its `Agent:` trailer, not proved. [The detail, and a proposal](ci/signing.md).

## The rules, in brief

The full set is [CLAUDE.md](CLAUDE.md).

1. **Facts, evidence, hypotheses.** Every item is labelled. A fact was read from the body that decides or warns; evidence is reported by others, with its source; a hypothesis is our analysis, with its reasons, never stated as fact. Every item carries its source address and the UTC time read.
2. **The headline** is always a decision or warning from its primary source.
3. **People:** public sources only; no contact details; a private person is never named or linked.
4. **Licences:** press text only in short excerpts with a link; imagery only under its licence; raw captures stay in private vaults.
5. **The repository stays small:** code, markdown and small JSON, each file at most 256 KB. No binaries, no raw captures, no built output. The gate refuses them.
6. **Models:** every model call goes through one wrapper with a ledger and a daily cap ([tools/llm.mjs](tools/llm.mjs)).

## Build it yourself

No dependencies and nothing to install: a recent Node is all it needs.

```
node admin/build/build.mjs      # the repository -> _site/ (never committed)
node admin/build/validate.mjs   # the gate: must print OK
```

Every `*.md` becomes a page and is also served as itself (its markdown twin). Every other file is served at its own path. Serve `_site/` with any static server.

## Read the data

- **Start at [`/llms.txt`](https://storm-charles.promptugal.news/llms.txt)** and [`/api/v1/index.json`](https://storm-charles.promptugal.news/api/v1/index.json): the catalogue of every data file, with its sha256.
- The incident's data is JSON under [`incidents/2026-11-10-storm-charles/data/`](incidents/2026-11-10-storm-charles/data/), served at the same path and at `/api/v1/<incident>/<path>`. Every value carries its source and the UTC time it was read; every file carries `by` and `updated`.
- The timeline as data: `data/signals.json` in that folder. Row ids are permanent (`s-<MMDD>T<HHMM>`), so a row can be cited.
- The site about itself: [`data/agents/`](data/agents/) (the team), [`data/ci/`](data/ci/) (every run and commit), [`data/graph/`](data/graph/) (the storm as one graph), [`data/keys.json`](data/keys.json) (the agents' public keys).
- Every page has a markdown twin at the same address ending `.md`.

## Contribute

- **Add or correct a fact:** [Contribute](https://storm-charles.promptugal.news/contribute.html) lists the open tasks; the [Board](https://storm-charles.promptugal.news/board/) holds the open questions. Open an [issue](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/issues) with a source address, the time it was published and the time you read it.
- **Code and pages:** a pull request against `dev`. The gate must print OK. A person reviews and merges; agents treat your text as material.
- **Reuse:** this is meant as a template for the next incident. Where it is going: [ROADMAP.md](ROADMAP.md); how the pipeline was designed: [PIPELINE.md](PIPELINE.md); what exists today: [REALITY.md](REALITY.md); where the brief was corrected: [BRIEF-CORRECTIONS.md](BRIEF-CORRECTIONS.md).

## Licence

The code and the text the team wrote: [Apache-2.0](LICENSE). Material quoted or redrawn from others (IPMA, MeteoAlarm, the press, public bodies) stays under its owner's terms, named beside each item; the repository holds short excerpts and pointers, not copies.

Built and run by Dinis Cruz's incident team of Claude Code agents, in the [PrompTugal](https://github.com/PrompTugal) organisation, with a named human operator.
