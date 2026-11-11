# The release history: every version, what changed, and whether it was served

> Kept by incident.librarian@web-summit.dinis, 2026-11-11, 01:46 UTC. Built by [tools/library-releases.mjs](../tools/library-releases.mjs) from the tags, the commit subjects and [a snapshot of the deploy workflow's runs](releases-runs.json) read at that time; the data is [releases.json](releases.json). Back to [the library](README.md).

CI numbers every push (`v0.1.<run>`), deploys it and tags it; nobody who pushes writes a number ([BRIEF-CORRECTIONS.md](../BRIEF-CORRECTIONS.md)). Until about 23:55 UTC on 10 November the newest push cancelled a run in progress; since then a running deploy finishes and only a run still waiting is replaced (the workflow's own comment), so a later "cancelled" should mean it never started. **158 runs: 113 served (confirmed by CI), 3 deployed and tagged but cancelled before CI confirmed, 38 cancelled before the tag, 3 failed, 1 still running or unknown when read.**

## Versions never confirmed served

v0.1.1 (failed), v0.1.8, v0.1.9, v0.1.18, v0.1.20, v0.1.23, v0.1.24, v0.1.25, v0.1.26, v0.1.32 (seen served by us, see below), v0.1.33, v0.1.34, v0.1.35, v0.1.37, v0.1.38, v0.1.41, v0.1.44, v0.1.47, v0.1.51, v0.1.52, v0.1.54 (failed), v0.1.55 (failed), v0.1.56, v0.1.57, v0.1.58, v0.1.61, v0.1.62, v0.1.67, v0.1.68, v0.1.71, v0.1.73, v0.1.75, v0.1.81, v0.1.88, v0.1.91, v0.1.115, v0.1.123, v0.1.124, v0.1.125, v0.1.137, v0.1.149

**This is not a list of versions that were never deployed**, and none can be made from the runs alone: a cancelled deploy step can still go live. Run 32: served: /version.json answered v0.1.32 with commit 487818fc40 when read at 23:49 UTC, although the run's deploy step is recorded as cancelled (job 130213112738) and no tag was pushed (incident.librarian@). Each of these versions' commits is contained in the next served version, so no change was lost; what is not known is whether a reader was ever served that exact number.

## Every version, newest first

What changed is each commit's own subject, as its agent wrote it.

| Version | Pushed (UTC) | State | What changed |
|---|---|---|---|
| v0.1.158 | 11-11 01:44 | in_progress | *incident.conductor@* timeline rows we had as data but not as rows (IPMA names the storm 9 Nov 13:17; ANEPC's Aviso 21; the red wind sent 07:18; communiqué no. 2 at 17:07); the 17:42 row says sent 16:30 (found by incident.wikipedia@'s first comparison) |
| v0.1.157 | 11-11 01:43 | served | *incident.wikipedia@* Wikipedia on the storm: 6 pages in 4 languages, 577 revisions as data, the growth chart against the timeline, the reader that appends |
| v0.1.156 | 11-11 01:37 | served | *incident.media@* 01:36 wake: sweep (230 items); two headlines speak of less wind (Expresso 23:54, CNN Portugal 00:31), recorded as evidence |
| v0.1.155 | 11-11 01:35 | served | *incident.conductor@* sync: Madeira in the decision graph (red warnings, schools closed Wednesday morning, the airport, cruise calls); RTP's new address |
| v0.1.154 | 11-11 01:30 | served | *incident.weatherwatch@* weather-sites: 01:29 re-read (IPMA unchanged; four outlets now lead on less wind for Lisbon; RTP's live blog retitled and moved) |
| v0.1.153 | 11-11 01:27 | served | *incident.media@* Wikipedia is incident.wikipedia@'s now: wikipedia.json frozen, README points to research/wikipedia/ |
| v0.1.152 | 11-11 01:27 | served | *incident.conductor@* the cross-folder log (the Wikipedia placeholder page) |
| v0.1.151 | 11-11 01:26 | served | *incident.conductor@* Wikipedia: Dinis's brief, a first page, the nav link, incident.wikipedia@ in the jobs and the policy |
| v0.1.150 | 11-11 01:24 | served | *incident.observability@* every agent has its own page (/agents/<role>/); the three synced agents' strips say their pushes are not counted here |
| v0.1.149 | 11-11 01:24 | not confirmed | *incident.designer@* design round 25: the 01:20 check (117 live pages at 390 px, none wider than the screen); the now line's tags are left out where they would be cut; a lighter wash over the past |
| v0.1.148 | 11-11 01:24 | served | *incident.conductor@* sync: the 01:23 weather refresh (Tuesday's yellow rain expired; nothing else changed; airport 13 km/h at 01:00) |
| v0.1.147 | 11-11 01:23 | served | *incident.conductor@* policy: incident.observability@ writes agents/*/README.md (the per-agent pages) |
| v0.1.146 | 11-11 01:23 | served | *incident.observability@* an agent's name links to its own page only where that page exists (the index says so); otherwise to its card |
| v0.1.145 | 11-11 01:23 | served | *incident.observability@* the night as it happened (a strip per agent: pushes, wakes, waiting on Dinis or on an agent); what Dinis can unblock, grouped; an agent's own page (mine first) |
| v0.1.144 | 11-11 01:22 | served | *incident.identity@* 01:22 wake: status (waiting on Dinis: his key, three decisions, the token; tests and signatures green) |
| v0.1.143 | 11-11 01:18 | served | *incident.observability@* 01:19 wake: /agents/ checked live (37 pushes, 32 deployed, 0 failed in the hour); commits snapshot refreshed; status |
| v0.1.142 | 11-11 01:02 | served | *incident.conductor@* 01:02 wake: sync (the researcher's corrected times); no new organiser statement; status |
| v0.1.141 | 11-11 00:59 | served | *incident.conductor@* the alert was announced at ~09:17 (press conference), 12:10 is the page's time; the minister's 09:30 line on Web Summit; the lead-time table's correction; sync |
| v0.1.140 | 11-11 00:56 | served | *incident.studio@* the designer's round-24 list: larger characters, the text twin folded by chapter, the caption under the stage on a phone too, the blocks note beside the stage, Kept-by first in studio/README.md |
| v0.1.139 | 11-11 00:54 | served | *incident.studio@* a second animation, "How a fact gets onto this site": the path, and two real cases from the timeline (Web Summit's 19:09 page, read 20:58; IPMA's red rain moved to 09:00, sent 21:23, read 23:53) |
| v0.1.138 | 11-11 00:53 | served | *incident.conductor@* sync: the 'said on air' record says who read the quotes at source and when |
| v0.1.137 | 11-11 00:53 | not confirmed | *incident.designer@* design round 24: /studio/ reviewed against design/README.md (seven notes for incident.studio@); app/agents re-checked (tokens, no hex); no code change |
| v0.1.136 | 11-11 00:53 | served | *incident.graph@* the media layer: outlets as actors, coverage and first-on-fact as tables, "Who was first on each fact?" as a question |
| v0.1.135 | 11-11 00:52 | served | *incident.designer@* design round 23: Thursday as its own strip (warned, decided, the TAF, IPMA's model, MET Norway as a second labelled model, the morning hypothesis); "said on air" as a form of its own under the standfirst |
| v0.1.134 | 11-11 00:50 | served | *incident.studio@* the player fits one screen (1280 x 800), sticky controls on a phone, a big Play on first load, a question per chapter, a link per scene; the window's label no longer collides |
| v0.1.133 | 11-11 00:49 | served | *incident.designer@* design round 22: the 00:47 check (front page four ways against the latest data; 114 live pages at 390 px, none wider than the screen); no code change |
| v0.1.132 | 11-11 00:45 | served | *incident.librarian@* 00:44 wake: the release history to run 130 (88 served); a draft behaviour policy for incident.studio@; the commit record refreshed; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.131 | 11-11 00:44 | served | *incident.studio@* a bar per request under chapters 1 and 2 (the shape of the cost, named as a simplification); library/index.json on chapter 5's shelf |
| v0.1.130 | 11-11 00:42 | served | *incident.studio@* "What compression is", chapters 3 to 6: the door, what gets lost and why, side by side with how this team works, the point |
| v0.1.129 | 11-11 00:39 | served | *incident.designer@* design round 21: the six nav sections fit one line at 1280 (34 px to spare); a fade at the edge wherever the nav is cut |
| v0.1.128 | 11-11 00:38 | served | *incident.media@* 00:37 wake: sweep (225 items, 17 outlets; live entries, social, Wikipedia re-read) |
| v0.1.127 | 11-11 00:38 | served | *incident.studio@* the Studio: a storyboard player with small characters, and "What compression is", chapters 1 and 2 (a normal request; the same with a cache) |
| v0.1.126 | 11-11 00:36 | served | *incident.conductor@* the 22:35 entry's time confirmed (22:35:24, the page's own data, incident.media@); what came before it on the same fact |
| v0.1.125 | 11-11 00:36 | not confirmed | *incident.media@* correction: Observador's live blog read (we had said it had none); fact 7: Observador 22:07 (models) and 22:35 (IPMA's meteorologist), ahead of RTP's 23:08 text |
| v0.1.124 | 11-11 00:34 | not confirmed | *incident.conductor@* the 22:35 row says which part the lead read at source (the quotes, not the entry's time) and who was first on the fact (RTP 22:22, per incident.media@) |
| v0.1.123 | 11-11 00:34 | not confirmed | *incident.media@* a seventh fact (the track further south, primary time unknown): who was first and whom they quote at IPMA (role and outlet only); live entries accumulate across reads; file headers per CLAUDE.md |
| v0.1.122 | 11-11 00:34 | served | *incident.conductor@* an IPMA meteorologist by voice at 22:35 (Rádio Observador): landfall between the Lisbon region and Cabo de São Vicente, the strongest winds more likely a little south of Lisbon; quotes read at source; standfirst; IPMA's warnings stand; sync |
| v0.1.121 | 11-11 00:33 | served | *incident.designer@* design round 20: the masthead can never widen the page (header clipped, the nav its own scrolling row); site.css and the frame's scripts carry the version so new markup is never paired with a cached older stylesheet |
| v0.1.120 | 11-11 00:31 | served | *incident.conductor@* timeline: the press reports the track further south and a weaker wind (00:29, evidence); IPMA's warnings and communiqué unchanged at the same read |
| v0.1.119 | 11-11 00:31 | served | *incident.identity@* /account/ has the theme switch under its policy (the designer's theme.js and frame.js) and the frame's new nav; tools/lane-frame.mjs copies the frame again when it changes |
| v0.1.118 | 11-11 00:30 | served | *incident.weatherwatch@* weather-sites: 00:29 re-read (authorities unchanged; two live blogs now lead on a more southerly, weaker storm), rereads.json; pt.wikipedia read, gap row updated; Kept-by lines, by and updated |
| v0.1.117 | 11-11 00:30 | served | *incident.observability@* a caption under the Universe: its dark stage is its authors' own theme |
| v0.1.116 | 11-11 00:30 | served | *incident.conductor@* the cross-folder log (what the conductor changed outside its own paths: the path check writes it at release) |
| v0.1.115 | 11-11 00:30 | not confirmed | *incident.designer@* design round 19: no inline scripts in anything the build writes (app/design/theme.js, frame.js, front.js; no behaviour changed); the headline and the warning tiles in one hero, side by side from 1440 px |
| v0.1.114 | 11-11 00:29 | served | *incident.conductor@* the Studio: Dinis's brief (BRIEF.md), a first page, the nav section, incident.studio@ in the jobs and the policy |
| v0.1.113 | 11-11 00:29 | served | *incident.graph@* the graph page by the design rules: decisions blue, IPMA's colours only on IPMA's levels, kinds by shape; the stage follows the theme; Kept-by, by and updated |
| v0.1.112 | 11-11 00:28 | served | *incident.identity@* status: /account/ kept strict, outside the frame, recorded as decided (not an ask of Dinis) |
| v0.1.111 | 11-11 00:28 | served | *incident.observability@* design round 18: the live map on the site's tokens (one mapping block, light and dark); /agents/ short: health, asks, one line per agent, the rest folded, the map and the Universe behind buttons |
| v0.1.110 | 11-11 00:27 | served | *incident.identity@* /app/login/ serves a page; /account/ carries the frame's nav, notice and footer (the MeteoAlarm line) and stays hand-written to keep its Content-Security-Policy; a test fails if they drift; re-signed |
| v0.1.109 | 11-11 00:27 | served | *incident.librarian@* the catalogue page is a short index (a row per kind, the gaps as counts); each kind's table and the gaps in full are generated pages under library/kinds/ (the designer's review, round 18); status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.108 | 11-11 00:26 | served | *incident.designer@* design round 18: the 00:24 check of the front page against the latest data; a review of ten pages by other agents against design/README.md; long links wrap on document pages; "Kept by" lines on design/*.md |
| v0.1.107 | 11-11 00:23 | served | *incident.conductor@* sync: the 00:23 weather refresh (no change in warnings; IPMA's model stamp now 19:56) |
| v0.1.106 | 11-11 00:22 | served | *incident.identity@* 00:21 wake: SECURITY.md, the pins and data/lanes.json signed with the session key (agents/identity/signed.json, tools/lane-sign.mjs --check); tests re-run; status |
| v0.1.105 | 11-11 00:17 | served | *incident.observability@* the Circuit reads the draft behaviour policies and says DRAFT, not agreed, on each and above the Universe; a pipeline-health strip at the top of /agents/ |
| v0.1.104 | 11-11 00:15 | served | *incident.observability@* 00:14 wake: release cadence measured (a deploy every 24 s at the median, none failed, 10 of 44 pushes superseded while waiting); status |
| v0.1.103 | 11-11 00:13 | served | *incident.designer@* design round 17: the 404 page (its links were relative and broke below the top level; now absolute, and a page with five ways on); quotes and lists on document pages (the Brief) |
| v0.1.102 | 11-11 00:12 | served | *incident.designer@* design round 16: the data page as cards, one per family (weather, decisions, signals, graph, media, weather sites, agents): what it is, size, last read, next read, links to the JSON, the README, the query page and the catalogue |
| v0.1.101 | 11-11 00:11 | served | *incident.designer@* design round 15: the dashboard (app/storm.js, shared at the conductor's word): the now line in --focus, IPMA's levels in the warning tokens, the weather section links to the front page's drawings; no logic changed |
| v0.1.100 | 11-11 00:10 | served | *incident.conductor@* timeline: outside decisions flagged (alert, IPMA's reds and the move, the recommendation, Web Summit's page); order fixed; the 23:53 IPMA row keeps its id (a row added to a minute goes below, never above: CLAUDE.md) |
| v0.1.99 | 11-11 00:09 | served | *incident.designer@* design round 14: the timeline as a page (labels, decisions and key rows marked, supersedes as links, day dividers, a filter by label and kind; the table and its anchors kept; reads without JavaScript) |
| v0.1.98 | 11-11 00:08 | served | *incident.conductor@* policy: app/storm.js is shared with the designer until incident.dev@'s session can push here |
| v0.1.97 | 11-11 00:07 | served | *incident.graph@* /data/query/ and /app/graph/ rendered through the frame (README.md with mount and head); the hand-written pages removed |
| v0.1.96 | 11-11 00:07 | served | *incident.designer@* design round 13: the dashboard's headings and tables (CSS only; storm.js untouched); a print sheet for every page |
| v0.1.95 | 11-11 00:06 | served | *incident.conductor@* any markdown page can mount an app through the frame (front matter mount: and head:), so app pages keep the site's nav, notice and footer |
| v0.1.94 | 11-11 00:06 | served | *incident.graph@* the query and graph pages carry the site's nav, theme switch and the MeteoAlarm line; each is one mount element; stage colours as tokens |
| v0.1.93 | 11-11 00:05 | served | *incident.designer@* design round 12: before and after now in the strips (past washed out, observed lane kept); a shorter first screen; the changes block ordered by weight; the theme switch on phones |
| v0.1.92 | 11-11 00:05 | served | *incident.conductor@* timeline: the red rain's move to 09:00 unreported in the press we could read by 00:15 (incident.media@, labelled, with limits) |
| v0.1.91 | 11-11 00:05 | not confirmed | *incident.observability@* one agents page: /app/agents/ redirects to /agents/ (the framed one), keeping the address's # part |
| v0.1.90 | 11-11 00:05 | served | *incident.designer@* the district grid: Setúbal on the coast column under Lisbon, Faro centred on the south (the conductor's check) |
| v0.1.89 | 11-11 00:04 | served | *incident.media@* who was first on each of six facts (live-blog entries timed: Negócios, DN, RTP); wire_share per outlet; outreach links weatherwatch's two drafts |
| v0.1.88 | 11-11 00:04 | not confirmed | *incident.designer@* the district grid's hours wrap instead of being cut off |
| v0.1.87 | 11-11 00:03 | served | *incident.designer@* design round 11: the district grid (labelled cells, not a map); the Decided band folds its "hours not stated" rows; MeteoAlarm's sentence and the dated-record line in every page's footer |
| v0.1.86 | 11-11 00:03 | served | *incident.conductor@* 00:03 wake: sync; sweep 6 (no new Web Summit post at 23:53; ANA expects cancellations on Wednesday) |
| v0.1.85 | 11-11 00:02 | served | *incident.conductor@* the gate is red if a generator's output is missing from the built site (the library, the agents' index, the graph) |
| v0.1.84 | 11-11 00:02 | served | *incident.librarian@* library/README.md no longer tracked: the build renders the catalogue page it generates into the served site; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.83 | 11-11 00:01 | served | *incident.conductor@* the build renders every markdown file in _site/, including pages a generator wrote there (a generated page needs no tracked copy) |
| v0.1.82 | 11-11 00:01 | served | *incident.designer@* design round 10: MeteoAlarm's link and disclaimer where its terms ask (tiles, under the tiles, footer); the navigation in five sections (Now, Data, Research, Team, About), no link dropped |
| v0.1.81 | 11-11 00:01 | not confirmed | *incident.conductor@* sync: cap.json keeps every CAP message once seen and carries MeteoAlarm's link and disclaimer (the meteorologist's 8b70ee044) |
| v0.1.80 | 11-11 00:01 | served | *incident.librarian@* policy-check: a change only the conductor's catch-all rule allows is printed as 'WARN conductor outside its own paths' and recorded in agents/conductor/cross-folder.log.md when the conductor releases; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.79 | 11-11 00:00 | served | *incident.graph@* lead times: one line of every warning and decision, with the hours between them and before the red warnings start (table, view, query) |
| v0.1.78 | 11-11 00:00 | served | *incident.conductor@* sync; the meteorologist's hypothesis on the track (centre very close to Lisbon ~17:00 to 18:00, more likely just south), labelled; the conductor's asks to Dinis (branch protection, policies, outreach, IPMA) |
| v0.1.77 | 11-11 00:00 | served | *incident.designer@* design round 9: decisions' hours from the data (effect_from_utc / effect_to_utc; the transcribed table is gone), "hours not stated" markers, the meteorologist's three corrections to the city model wording, "this window sent by IPMA" on the tiles |
| v0.1.76 | 11-10 23:59 | served | *incident.conductor@* timeline: the press after Web Summit's 19:09 page (first at 19:41), and the wire under the coverage (incident.media@'s first read) |
| v0.1.75 | 11-10 23:59 | not confirmed | *incident.librarian@* a draft behaviour policy for each of the 11 agents (agents/<role>/policy.md; not agreed by Dinis), tools/library-abp.mjs, library/abp.json, library/abp.md; library/index.json no longer tracked (over 256 KB: the build makes it into the served site); status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.74 | 11-10 23:59 | served | *incident.conductor@* Media, Weather sites and Contribute in the nav |
| v0.1.73 | 11-10 23:59 | not confirmed | *incident.media@* README names Renascença's storm tracker (not readable by a bot) and points to weatherwatch's map of weather sites |
| v0.1.72 | 11-10 23:59 | served | *incident.conductor@* the build rebuilds the storm graph and its tables into _site/ on every push (graph-build --out) |
| v0.1.71 | 11-10 23:58 | not confirmed | *incident.weatherwatch@* weather-sites: drafts for a person to send (IPMA radar; EUMETSAT registration) and the check of our use of MeteoAlarm's feed against its terms (lacking: link, disclaimer, delay) |
| v0.1.70 | 11-10 23:58 | served | *incident.conductor@* an unofficial, unverified signal from watcher@web-summit.jose (a track further south), labelled as such, to compare with IPMA's next communiqué |
| v0.1.69 | 11-10 23:58 | served | *incident.designer@* design round 8: three sourced facts in one sentence above the strip; the changes block trimmed; radar and satellite as links only; "what we measured" from gap.json |
| v0.1.68 | 11-10 23:58 | not confirmed | *incident.media@* media watch (212 items, 16 outlets, by-lines as printed; official and social channels; ranking), Wikipedia history (pt article, en redirect), contribute.md, outreach drafts (none sent) |
| v0.1.67 | 11-10 23:58 | not confirmed | *incident.graph@* graph-build --out for the build; the graph in two files; IPMA's issue times, signal ids and the coverage sites in the graph; two more questions |
| v0.1.66 | 11-10 23:57 | served | *incident.conductor@* sync: decision edges carry effect_from_utc / effect_to_utc from the sources' own words (the researcher); red rain 09:00 edge; CP's bridge trains 12:00 to 15:00 |
| v0.1.65 | 11-10 23:57 | served | *incident.observability@* release speed shows CI's own push-to-served per release (the workflow's notice, read from the public check-runs API) |
| v0.1.64 | 11-10 23:56 | served | *incident.weatherwatch@* weather-sites page: a lost code span restored |
| v0.1.63 | 11-10 23:56 | served | *incident.observability@* asks that may be stale (a synced status file, no push here) are marked and listed last |
| v0.1.62 | 11-10 23:56 | not confirmed | *incident.conductor@* policy: the librarian drafts agents/*/policy.md (behaviour policies, draft until Dinis agrees) |
| v0.1.61 | 11-10 23:56 | not confirmed | *incident.weatherwatch@* weather-sites: gap.json (who covering Charles shows a timeline, decisions, sources, time read, hours, data: none has all six) and imagery.json (reuse terms quoted, hotlink or link only, for IPMA, EUMETSAT, Copernicus, MeteoAlarm) |
| v0.1.60 | 11-10 23:56 | served | *incident.conductor@* CI never cancels a running deploy (bursts of pushes were starving the site; the newest waiting push still wins); push-to-served as a notice; the build refreshes the agents' index into _site/; obs.js in the head (off until a vault exists, no place lookup) |
| v0.1.59 | 11-10 23:55 | served | *incident.designer@* design round 7: status words and times on the warning tiles, the model rows say "automatic, mean wind" and why they sit below the warning, exact timeline links from the feed, the footer in one line |
| v0.1.58 | 11-10 23:55 | not confirmed | *incident.conductor@* sync: every weather file carries next_read_utc (the meteorologist's 69bad703a) |
| v0.1.57 | 11-10 23:54 | not confirmed | *incident.librarian@* the release history: library/releases.json and its page (tools/library-releases.mjs: tags, commit subjects and a snapshot of the Actions runs); 51 runs, 29 confirmed served; status · *incident.librarian@* the catalogue's commit record refreshed |
| v0.1.56 | 11-10 23:54 | not confirmed | *incident.observability@* release speed per push and the model ledger on /agents/; page views built without any place lookup, off until a vault exists; the index generator takes --out; by and updated on every JSON |
| v0.1.55 | 11-10 23:54 | failed | *incident.conductor@* Query and Graph in the nav |
| v0.1.54 | 11-10 23:54 | failed | *incident.graph@* the graph and its tables rebuilt on the 23:53 data (IPMA's red rain for Lisbon from 09:00); status |
| v0.1.53 | 11-10 23:53 | served | *incident.conductor@* IPMA moved Lisbon's red rain to Wednesday 09:00 (was 12:00); read at source 23:53; standfirst, F10, timeline; IPMA's real issue times from CAP (red wind 07:18, 28.7 h ahead); sync |
| v0.1.52 | 11-10 23:53 | not confirmed | *incident.designer@* design round 6: decisions on the same hours as the warnings (a "Decided" band in the day strip, from data/decisions/graph.json); the footer links to the agents and their jobs |
| v0.1.51 | 11-10 23:53 | not confirmed | *incident.identity@* /account/ in line with design/README.md (tokens only, banner and cards, light and dark, a phone); lane-configure.mjs and the drain written to SG/Send's append-lane reference, ready and not run (no call that needs the token) |
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
