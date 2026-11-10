# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-10, 23:53 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and [a snapshot of the deploy workflow's runs](releases-runs.json) read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). The newest push cancels the runs before it. **51 runs: 29 served (confirmed by CI), 3 deployed and tagged but cancelled before CI confirmed, 17 cancelled before the tag, 1 failed, 1 still running or unknown when read.**

## Versions never confirmed served

v0.1.1 (failed), v0.1.8, v0.1.9, v0.1.18, v0.1.20, v0.1.23, v0.1.24, v0.1.25, v0.1.26, v0.1.32 (seen served by us, see below), v0.1.33, v0.1.34, v0.1.35, v0.1.37, v0.1.38, v0.1.41, v0.1.44, v0.1.47

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## Every version, newest first

What changed is each commit's own subject, as its agent wrote it.

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.51 | 11-10 23:53 | queued | *incident.identity@* /account/ in line with design/README.md (tokens only, banner and cards, light and dark, a phone); lane-configure.mjs and the drain written to SG/Send's append-lane reference, ready and not run (no call that needs the token) |
| v0.1.50 | 11-10 23:53 | served | *incident.conductor@* release.sh runs the path policy check before every push; policy: the root documents are the conductor's, data/query/ is the graph agent's, the check is the librarian's |
| v0.1.49 | 11-10 23:52 | served | *incident.librarian@* agents/policy.json with the owners the conductor named; tools/policy-check.mjs (the commits about to be pushed against the policy; shared and unassigned paths warn); status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.48 | 11-10 23:51 | served | *incident.conductor@* every timeline row carries its permanent id as an anchor (the same id as in signals.json) |
| v0.1.47 | 11-10 23:51 | not confirmed | *incident.observability@* the team in Silvio's Universe (Map, Circuit, Talk) on /agents/#universe: brain.js pinned at 57636ac, one adapter, no fork; the Circuit shows the fact that no agent here has a behaviour policy |
| v0.1.46 | 11-10 23:51 | served | *incident.weatherwatch@* weather-sites: eleven key pages rendered and looked at; the ten ideas rewritten from what was seen (IPMA's hourly warnings row, status words, automatic numbers under a red warning) |
| v0.1.45 | 11-10 23:50 | served | *incident.conductor@* the build refreshes the library's catalogue into _site/ on every push (--out; no tracked file touched); agents/policy.json placed from the librarian's draft (not yet checked by release.sh) |
| v0.1.44 | 11-10 23:50 | not confirmed | *incident.designer@* design round 5: the conductor's review applied: theme switch and tighter masthead, "changed in the last hour of reads", our English under IPMA's Portuguese, feed labels and timeline links, district codes with their source |
| v0.1.43 | 11-10 23:50 | served | *incident.librarian@* library-index --out DIR (touches no tracked file, for the build); the header line in the glossary; drafts for the conductor: the path policy from JOBS.md and the shape of now.json; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.42 | 11-10 23:49 | served | *incident.conductor@* the feedback box's script in every page's head (it draws nothing without a key in the browser); Account in the nav; CLAUDE.md: building a page (the design rules, the header line, generators take --out) |
| v0.1.41 | 11-10 23:49 | not confirmed | *incident.graph@* a database in the browser (/data/query/, five worked questions) and the graph page (/app/graph/) on the engine of Silvio's Universe |
| v0.1.40 | 11-10 23:49 | tagged | *incident.conductor@* every signal has a permanent id (s-<MMDD>T<HHMM>); a corrected row names the id it supersedes |
| v0.1.39 | 11-10 23:48 | served | *incident.conductor@* the build runs the library's and the agents' generators on every push; Library in the nav; CI fails if the live site does not serve this version or a newer one (the librarian's reading: green does not mean live) · *incident.conductor@* the build does not run generators that write tracked files (it left the tree dirty and release.sh refused); they will write into _site/ once they take --out |
| v0.1.38 | 11-10 23:48 | not confirmed | *incident.librarian@* 23:48 wake: the catalogue rebuilt (129 files, every one with its commit record) · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.37 | 11-10 23:48 | not confirmed | *incident.librarian@* status: the conductor told (the library live, five things to do, three asks); the catalogue refreshed · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.36 | 11-10 23:47 | served | *incident.weatherwatch@* research/weather-sites: sites.json (106 entries: worldwide, Portugal, who covers Storm Charles) and the page with the ranking and ten ideas for the home page |
| v0.1.35 | 11-10 23:47 | not confirmed | *incident.observability@* who talks to whom on Angelo's live map (pinned at 57636ac, one adapter, 2D and 3D); commits snapshot as data and as the fallback when GitHub's API does not answer |
| v0.1.34 | 11-10 23:47 | not confirmed | *incident.designer@* design round 4: design/README.md (tokens, parts, rules for every agent's pages); document pages' typography; visible focus; the masthead stays dark in dark mode |
| v0.1.33 | 11-10 23:47 | not confirmed | *incident.identity@* /account/ (a key made in the browser behind a passkey or a passphrase), the feedback box sealed to the conductor's key, the conductor's lane tools; tested end to end with throwaway keys |
| v0.1.32 | 11-10 23:47 | not confirmed (seen served) | *incident.librarian@* library/reading/ (28 pages of newsroom.sgit.ai read: what each means here; this repository against the estate's standard), library/glossary.md, tools/library-reading.mjs; the catalogue lists what is older than its sources; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.31 | 11-10 23:45 | served | *incident.designer@* design round 3: the day in phases for phones, the wind chart's observation table, page order (signals and Thursday above the districts) |
| v0.1.30 | 11-10 23:44 | served | *incident.graph@* the ontology, the graph of the storm and its tables, built from the incident's JSON; session key (public half only) |
| v0.1.29 | 11-10 23:43 | served | *incident.designer@* design round 2: wind on one axis (warned, forecast, observed) and where, district by district |
| v0.1.28 | 11-10 23:42 | served | *incident.conductor@* /agents/ serves the live agents page (incident.observability@'s); nav: Agents, Jobs; the conductor's asks to Dinis pruned to the five that stand |
| v0.1.27 | 11-10 23:41 | served | *incident.librarian@* library/: the catalogue of everything on this site (index.json, the page, the commit record), built by tools/library-index.mjs; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.26 | 11-10 23:41 | not confirmed | *incident.conductor@* analysis rows are labelled hypothesis, never fact (timeline.mjs); the 23:23 row split into the TAF (fact) and the analysis |
| v0.1.25 | 11-10 23:41 | not confirmed | *incident.observability@* the agents page at /app/agents/ (every agent: doing, done, next, asks with Dinis's on top, last push, key); tools/agents-index.mjs writes data/agents/index.json |
| v0.1.24 | 11-10 23:41 | not confirmed | *incident.identity@* SECURITY.md (the login, the feedback lane, the reverse path, the vaults: what is public, what a stolen token or key allows, what we will not build); pki.sgit.ai's modules pinned |
| v0.1.23 | 11-10 23:40 | not confirmed | *incident.designer@* design round 1: the home page as the weather presenter (warning tiles, Wednesday hour by hour, sourced Thursday card) |
| v0.1.22 | 11-10 23:39 | served | *incident.identity@* session key (public half only) in data/keys.json |
| v0.1.21 | 11-10 23:38 | served | *incident.observability@* session key (public half only) in data/keys.json |
| v0.1.20 | 11-10 23:38 | not confirmed | *incident.librarian@* session key (public half only) in data/keys.json |
| v0.1.19 | 11-10 23:38 | tagged | *incident.weatherwatch@* session key (public half only) in data/keys.json; status |
| v0.1.18 | 11-10 23:38 | not confirmed | *incident.media@* session key (public half only) in data/keys.json; agents/media/status.json |
| v0.1.17 | 11-10 23:37 | served | *incident.conductor@* the nav links the team's jobs and the brief |
| v0.1.16 | 11-10 23:36 | served | *incident.designer@* session key (public half only) in data/keys.json |
| v0.1.15 | 11-10 23:35 | served | *incident.conductor@* Dinis's direction of 23:40 in BRIEF.md; agents/JOBS.md: the team and its jobs (designer, observability, identity, weatherwatch, media, librarian, graph) |
| v0.1.14 | 11-10 23:24 | served | *incident.conductor@* the first TAF covering Thursday (23:00) is weaker; peak widened to 12:00-18:00 (analysis); IPMA's reds unchanged; Thursday morning behind the storm |
| v0.1.13 | 11-10 23:03 | served | *incident.conductor@* 23:02 wake: sync (no change to warnings, Day 3, PITCH, Night Summit or Thursday's transport at 22:23 to 22:33) |
| v0.1.12 | 11-10 22:07 | served | *incident.conductor@* PITCH semi-final timing marked in conflict (Wed 17:00 unsourced vs Thursday per Tech Times); Night Summit still listed for Wednesday |
| v0.1.11 | 11-10 22:03 | served | *incident.conductor@* 22:02 wake: no new organiser statement; sweep 4 (a speaker's talks stay on Thursday, 21:41); the watch's 21:32 alert (text unchanged); sync |
| v0.1.10 | 11-10 21:37 | served | *incident.conductor@* the sync rewrites paths only in the files it copies (never in itself) |
| v0.1.9 | 11-10 21:37 | not confirmed | *incident.conductor@* the sync also carries incident.dev@'s websummit.mjs and websummit-poll.sh |
| v0.1.8 | 11-10 21:37 | not confirmed | *incident.conductor@* sync: the Web Summit watch (listing modified 20:06, text unchanged in substance) and incident.dev@'s websummit.mjs (newest modified across listings; text kept with sha256, alerts on text_changed) |
| v0.1.7 | 11-10 21:20 | served | *incident.conductor@* sync: IPMA's model changed under the same stamp; peak now 17:00-20:00 (analysis, labelled); red warnings unchanged |
| v0.1.6 | 11-10 21:20 | tagged | *incident.conductor@* the three agents' asks to Dinis: attach this repository to their sessions (add_repo refused by their permission checks) |
| v0.1.5 | 11-10 21:19 | served | *incident.conductor@* sync: the meteorologist's 21:19 refresh (7de22580e; Thursday morning westerly 16-24 km/h, yellow sea only to 03:00) and the agents' status; tools/sync-from-websummit.sh, the bridge until their sessions can push here |
| v0.1.4 | 11-10 21:18 | served | *incident.conductor@* incident.dev@'s pinned websummit-poll.sh (security.repos@'s MEDIUM, 21:30Z fix) brought across from the frozen folder |
| v0.1.3 | 11-10 21:16 | served | *incident.conductor@* incident.dev@'s 21:13 watch (blog polled every 2 min, robots.txt obeyed) brought across; 21:15 the move in the timeline |
| v0.1.2 | 11-10 21:15 | served | *incident.conductor@* track admin/build/ (the template .gitignore ignored build/); the gate now fails if its own files are not tracked |
| v0.1.1 | 11-10 21:14 | failed | *incident.conductor@* the Storm Charles site: newsroom, live dashboard, data API, the gate and one-job CI; the incident moved from web-summit.sgit.ai |
