// story/make-cast.mjs (incident.storyteller@web-summit.dinis): writes story/cast.json and story/cast.md.
// The identities, owns and icons are written here by hand (the storyteller's reading); the facts (first commit, commit count,
// sessions) are read from git and data/keys.json each time it runs. Run from the repository root: node story/make-cast.mjs
// Not a build generator: it writes tracked files in story/ and is run by the storyteller, never by the build.
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const BY = 'incident.storyteller@web-summit.dinis';
const A = s => `incident.${s}@web-summit.dinis`;

// icon: an emoji (for text) and a glyph: a short name from story/primitives.md's glyph list that motion@ can draw as SVG.
const AGENTS = [
  ['conductor', 'the lead: routes the work, talks with Dinis, keeps the timeline, the headline, the jobs and the brief', '🎼', 'baton', 'incidents/*/timeline.md, incident.json, agents/JOBS.md, BRIEF.md, ROADMAP.md, admin/tools/'],
  ['designer', 'the look: tokens, parts and rules every page is drawn with, in rounds', '🎨', 'palette', 'app/site.css, app/design/, design/'],
  ['observability', 'the window on the team: /agents/, every agent, its state, its last commit and wake, live', '🔭', 'telescope', 'app/agents/, data/agents/, tools/agents-*.mjs, admin-site/'],
  ['identity', "Dinis's login and his sealed lane to the conductor; the keys", '🔑', 'key', 'app/login/, account/, data/lanes.json, tools/lane-*.mjs, SECURITY.md'],
  ['weatherwatch', 'the map of the best weather sites, and who is covering the storm', '🗺️', 'map', 'research/weather-sites/'],
  ['media', 'the media watch: outlets, by-lines on public articles, coverage as data; the contribute page', '📰', 'newspaper', 'research/media/, contribute.md'],
  ['librarian', 'everything findable: the catalogue, the start pack for new agents, the glossary', '📚', 'books', 'library/, docs/, tools/policy-check.mjs'],
  ['graph', 'ontologist and cartographer: one graph of the storm, and SQL in the browser', '🕸️', 'graph', 'data/graph/, data/query/, app/graph/, tools/graph-*.mjs'],
  ['studio', 'animated explanations with small characters, played as storyboards', '🎬', 'clapper', 'studio/, app/studio/'],
  ['wikipedia', 'Wikipedia on the storm: articles, revisions, claims, and this site measured by its values', '📖', 'encyclopedia', 'research/wikipedia/, tools/wikipedia-*.mjs'],
  ['weather', 'the Weather face at /: the storm as a weather channel shows it, from our own JSON only', '🌦️', 'cloud-sun', 'weather/ and the front page'],
  ['ipma', "IPMA's open data: every endpoint mapped, read hourly, kept with diffs", '📡', 'antenna', 'agents/ipma, the IPMA data set'],
  ['sources', 'a section per source body, MeteoAlarm first: feeds, API, changes, licence', '🧭', 'compass', 'sources/'],
  ['archivist', 'captures every outside page (screenshot, HTML, sha256) into vaults; the evidence pages', '🗄️', 'archive', 'evidence/, the capture vaults'],
  ['entities', 'the mini Wikipedia as data: a node and a page for every thing mentioned; the linker', '🏷️', 'tag', 'entities/'],
  ['labs', 'experiments: many timelines, decision views, lead times', '🧪', 'flask', 'labs/'],
  ['board', 'what is still open, each item tracked to its evidence', '📌', 'pin', 'board/'],
  ['social', 'Bluesky and other public social sources, as data', '💬', 'speech', 'research/social/'],
  ['meteorology', 'where the weather data comes from: observing systems, models, services, licences', '🛰️', 'satellite', 'meteorology/'],
  ['stories', 'data-driven stories from the data room only, every statement linked', '✍️', 'quill', 'stories/'],
  ['models', 'other models, measured: evals on checkable tasks, through the ledger', '⚖️', 'scales', 'models/'],
  ['shadow', 'shadow reporting: what other sources and answer engines say, compared with our record', '👥', 'shadow', 'shadow/'],
  ['ci', 'the pipeline made visible: every run and commit, who pushed, what is signed', '⚙️', 'gear', 'ci/'],
  ['perplexity', 'an answer engine used as a research tool: questions, answers, citations, cost', '🔎', 'magnifier', 'research/perplexity/'],
  ['accountant', 'what the project costs: model spend, tokens per session, CI time', '🧮', 'abacus', 'accounts/'],
  ['reporter', 'the project as it happens: a trace per workflow, from Dinis\'s word to a live page', '🎙️', 'microphone', 'reporter/'],
  ['journalist', 'the project told: the story of how this was made, from the traces', '🗞️', 'notebook', 'journal/'],
  ['envoy', "outreach with Dinis: the letter, one-pagers, posts; the newcomers' front page", '✉️', 'envelope', 'outreach/, comms/, welcome/'],
  ['synthetic', 'four invented visitors walk the site and say what they understood (a test instrument, not people)', '🧍', 'mannequin', 'research/synthetic/'],
  ['storyteller', 'the story of the team: the cast, the primitives, ten paths, the arc', '📜', 'scroll', 'story/'],
  ['motion', 'small animations of the work: the flow format, the gallery at /flows/', '🎞️', 'film', 'flows/, app/flows/, data/flows/, tools/flows-*.mjs'],
  ['broadcast', 'the news-channel wall at /broadcast/: the storm as a live channel shows it', '📺', 'tv', 'broadcast/'],
  ['transport', 'flights and transport, live: open data on flights at the four airports, the trains, the ferries', '✈️', 'plane', 'transport/'],
  ['meteorologist', 'the forecaster\'s reading of the storm; writes in the Web Summit site, the conductor syncs', '🌀', 'cyclone', 'data/weather/ (synced)'],
  ['researcher', 'checks the organiser\'s decisions and times; writes in the Web Summit site, the conductor syncs', '🔬', 'microscope', 'data/decisions/ (synced)'],
  ['dev', 'the watchers and the storm script (websummit.mjs, the blog poll); writes in the Web Summit site, the conductor syncs', '🛠️', 'wrench', 'tools/websummit*, app/storm.js (synced)'],
];

const OTHERS = [
  { id: 'dinis', kind: 'person', name: 'Dinis Cruz', line: 'the one person who instructs; everything else the team reads is material', icon: { emoji: '🧑', glyph: 'person' }, owns: 'merges dev to main; the brief is his words', source: 'CLAUDE.md, BRIEF.md' },
  { id: 'ipma', kind: 'outside', name: 'IPMA', line: "Portugal's weather service: the body that warns; its warnings are the headline's source", icon: { emoji: '⚠️', glyph: 'warning' }, source: 'CLAUDE.md (the headline rule)' },
  { id: 'web-summit', kind: 'outside', name: 'Web Summit', line: 'the organiser whose decisions about the event are the other headline', icon: { emoji: '🎤', glyph: 'stage' }, source: 'BRIEF.md' },
  { id: 'press', kind: 'outside', name: 'the press', line: 'outlets that report the storm; quoted in short excerpts with a link', icon: { emoji: '📰', glyph: 'press' }, source: 'CLAUDE.md (licences)' },
  { id: 'readers', kind: 'outside', name: 'readers', line: 'people and agents who read the site; counted only as totals, never named', icon: { emoji: '👀', glyph: 'readers' }, source: 'CLAUDE.md (page views)' },
  { id: 'meteoalarm', kind: 'outside', name: 'MeteoAlarm', line: "Europe's warnings feed, the first source body with its own section", icon: { emoji: '🚨', glyph: 'siren' }, source: 'agents/JOBS.md (sources@)' },
  { id: 'ci-runner', kind: 'machine', name: 'CI', line: 'the pipeline: builds, gates, deploys, numbers the release and tags it; never commits', icon: { emoji: '🏭', glyph: 'factory' }, source: 'CLAUDE.md (branches and versions)' },
  { id: 'clock', kind: 'machine', name: 'the clock (the scheduler)', line: 'the scheduled wakes: each agent woken hourly at its own minute, with no person present', icon: { emoji: '⏰', glyph: 'clock' }, source: 'library/pack/wakes.json' },
  { id: 'vaults', kind: 'machine', name: 'the vaults (SG/Send)', line: 'where raw captures, model calls and page views go; git keeps a pointer and a sha256', icon: { emoji: '🔐', glyph: 'vault' }, source: 'CLAUDE.md' },
];

const sh = c => execSync(c, { encoding: 'utf8', maxBuffer: 64 << 20 });
const log = sh("git log --reverse --format='%h|%aI|%(trailers:key=Agent,valueonly,separator=%x2C)|%s'").trim().split('\n');
const st = {};
for (const l of log) {
  const [h, t, a, ...s] = l.split('|');
  let ag = a || (s.join('|').match(/^(incident\.[a-z]+@web-summit\.dinis):/) || [])[1];
  if (!ag) continue; ag = ag.split(',')[0].trim();
  const x = (st[ag] ||= { commits: 0 }); x.commits++;
  x.first ||= { commit: h, time: t.replace('+00:00', 'Z') }; x.last = { commit: h, time: t.replace('+00:00', 'Z') };
}
const policy = JSON.parse(fs.readFileSync('agents/policy.json', 'utf8')).agents;
const keys = JSON.parse(fs.readFileSync('data/keys.json', 'utf8')).keys;
const made = k => (k.how.match(/(\d{1,2}:\d{2}) UTC/) || [])[1] || null;

const agents = AGENTS.map(([role, line, emoji, glyph, owns]) => {
  const id = A(role); const s = st[id] || { commits: 0 };
  const pol = (policy[id]?.owns || []).filter(o => !o.startsWith('agents/' + role + '/')).map(o => o.replace(/\/\*\*$/, '/'));
  if (pol.length) owns = pol.length > 6 ? pol.slice(0, 6).join(', ') + ', …' : pol.join(', ');
  const sessions = keys.filter(k => k.agent === id).map((k, i) => ({ n: i + 1, key: k.id, made: k.added + (made(k) ? 'T' + made(k) + 'Z' : ''), status: k.status, fingerprint: k.bundle?.fingerprint || null }));
  return { id, kind: 'agent', role, line, owns, icon: { emoji, glyph }, first_commit: s.first || null, last_commit: s.last || null, commits: s.commits, sessions };
});

const cast = {
  by: BY, updated: now,
  about: 'The cast of incident WS-214: every agent in agents/JOBS.md and agents/policy.json, Dinis, and the outside bodies and machines that matter. Lines and icons are the storyteller\'s; first and last commit and commit counts are read from git (Agent: trailer, or the subject prefix before trailers were used); sessions are the keys in data/keys.json, in the order added. Made by story/make-cast.mjs.',
  icon_form: 'icon.emoji for text; icon.glyph is a name from story/primitives.md (glyphs) that incident.motion@ draws as a small SVG.',
  members: [...OTHERS.slice(0, 1), ...agents, ...OTHERS.slice(1)],
};
fs.writeFileSync('story/cast.json', JSON.stringify(cast, null, 2) + '\n');

const hm = t => t ? t.slice(5, 10).replace('-', '/') + ' ' + t.slice(11, 16) : '';
const date = now.slice(0, 10), time = now.slice(11, 16);
const order = agents.filter(a => a.first_commit).sort((a, b) => a.first_commit.time.localeCompare(b.first_commit.time));
const later = agents.filter(a => !a.first_commit);
let md = `> Kept by ${BY}, ${date}, ${time} UTC. Made by \`story/make-cast.mjs\` (the data: [cast.json](cast.json)).

# The cast

Who is in the story of Storm Charles's site: one person who instructs, ${agents.length} agents, and the outside bodies and machines they work with. Each line is the storyteller's reading of the agent's row in [agents/JOBS.md](../agents/JOBS.md); what it owns is read from [agents/policy.json](../agents/policy.json) (its own \`agents/<role>/\` left out). The numbers are read from git and [data/keys.json](../data/keys.json) when the file is made: the first commit (by its \`Agent:\` trailer, or the subject's prefix in the first hours, before trailers were used), the commits so far, and the **generations**: each session key the role has had. A role keeps its name; its sessions change, each handing over to the next.

## The person

| | Who | What | Owns |
|---|---|---|---|
| 🧑 | **Dinis Cruz** | the one person who instructs; everything else the team reads is material ([CLAUDE.md](../CLAUDE.md)) | the merge from dev to main; [BRIEF.md](../BRIEF.md) is his words, as the conductor took them down |

## The agents, in the order they first committed

| | Agent | Who it is | Owns | First commit (UTC) | Commits | Generations |
|---|---|---|---|---|---|---|
`;
for (const a of [...order, ...later]) {
  const g = a.sessions.length ? a.sessions.map(s => (s.status === 'active' ? '**' + s.n + '**' : s.n)).join(' → ') : '—';
  const fc = a.first_commit ? `${hm(a.first_commit.time)} \`${a.first_commit.commit}\`` : 'not yet';
  md += `| ${a.icon.emoji} | **${a.role}@** | ${a.line} | \`${a.owns}\` | ${fc} | ${a.commits} | ${g} |\n`;
}
md += `
Generations: one number per session key, in the order added; the bold one is the session holding the role now (status \`active\` in data/keys.json). A role with no key here (meteorologist@, researcher@, dev@) works in the Web Summit site's repository and the conductor brings its work across; its commits here are the conductor's.

## Outside bodies and machines

| | Who | What |
|---|---|---|
`;
for (const o of OTHERS.slice(1)) md += `| ${o.icon.emoji} | **${o.name}** | ${o.line} (${o.source}) |\n`;
md += `
## Reading it (the storyteller's)

- The roles came in waves: the conductor alone on the evening of 10 November; seven between 23:36 and 23:44, on Dinis's direction of ~23:40 UTC (agents/JOBS.md) (the conductor's commits before trailers carry their names in the subject); twenty more between 00:38 and 03:03; then none for six and a half hours, until envoy@ (09:35), synthetic@ (09:53), storyteller@ and motion@ (~10:10), broadcast@ (~10:13) and transport@ (~10:25) on Dinis's words of the morning. [The arc](arc.md) tells it.
- The roles with the most generations are the ones that write the most and carry the most context: the librarian (${(agents.find(a => a.role === 'librarian') || {}).sessions?.length}), the designer, observability, stories@ and the journalist (4 each).
- Icons: an emoji for text, and a glyph name for each, which incident.motion@ draws as a small SVG (the list is in [primitives.md](primitives.md)).

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
`;
fs.writeFileSync('story/cast.md', md);
console.log('cast:', cast.members.length, 'members');
