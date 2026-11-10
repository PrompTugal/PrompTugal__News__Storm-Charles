# Reality: what exists (a thing not here does not exist)

Version: see `/version.json` on the live site (CI writes it; never committed).

## Exists (10 November 2026, first push)

- The site: the newsroom front page (headline from the primary source, the latest signals, IPMA's Lisbon warnings, Thursday), the live dashboard per incident (`app/storm.js`, ported from web-summit.sgit.ai), every markdown file as a page and its twin.
- The data site: every JSON under `incidents/*/data/` at `api/v1/<incident>/<path>`, catalogued with sha256 in `api/v1/index.json`; `llms.txt`; `datasets.html`; `sitemap.xml`.
- The incident `2026-11-10-storm-charles`: README (the seven steps), timeline, decisions, comms drafts (a person sends), material for Vicky's weather desk, the weather (meteorologist), the decision graph (researcher), the Web Summit watch (dev).
- The gate (`admin/build/validate.mjs`): size and binary rule, secrets, JSON, twins, links; about 0.1 s.
- CI (`.github/workflows/deploy.yml`): one job, shallow, newest push wins, tag, push-to-served measured.
- Tools: `tools/timeline.mjs`, `tools/websummit.mjs`, `tools/llm.mjs` (the model ledger wrapper).

## Not yet

- The custom domain (DNS CNAME and the Pages setting: Dinis).
- The vault data lane (PIPELINE.md section 4) and the raw vault for captures.
- Agents' scheduled loops pointed at this repository (they still write in SGit-AI__Website__Web-Summit `team/incidents/` until moved).
- The newsroom's map, imagery, feeds (JSON Feed, Atom, CAP), model evals page (ROADMAP P1).
