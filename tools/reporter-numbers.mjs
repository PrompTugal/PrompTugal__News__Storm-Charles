#!/usr/bin/env node
// incident.reporter@web-summit.dinis: reporter/numbers.json, the project counted by hour (UTC) from the data others keep.
// Nothing is recounted from git or by hand: every figure names the file it came from, and each source's own "updated"
// time is the limit of what the figure can know (an hour after a source's snapshot is "not in the source yet", not zero).
//   node tools/reporter-numbers.mjs [--out <dir>]   (writes <dir>/reporter/numbers.json; default: the repository)
import fs from 'node:fs';
import path from 'node:path';

const outAt = process.argv.indexOf('--out');
const outDir = outAt > 0 ? process.argv[outAt + 1] : '.';
const read = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const hour = t => t.slice(0, 13);
const hours = new Map();
const H = h => { if (!hours.has(h)) hours.set(h, { hour: h + 'Z', commits: 0, agents_active: new Set(), handoffs_for: 0, runs: 0, releases: 0, runs_cancelled: 0, runs_failed: 0, p2s: [], cards_opened: 0, cards_closed: 0 }); return hours.get(h); };
const median = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor((s.length - 1) / 2)]; };

const sources = [];
// commits, agents active, hand-offs: incident.ci@'s commit record
let ciCommitsUpdated = '';
for (const f of fs.readdirSync('data/ci/commits').sort()) {
  const d = read(path.join('data/ci/commits', f));
  if (d.updated > ciCommitsUpdated) ciCommitsUpdated = d.updated;
  for (const c of d.commits) { const h = H(hour(c.at)); h.commits++; if (c.agent) h.agents_active.add(c.agent); h.handoffs_for += (c.to || []).length; }
}
sources.push({ figures: ['commits', 'agents_active', 'handoffs_for'], file: 'data/ci/commits/*.json', by: 'incident.ci@web-summit.dinis', as_of: ciCommitsUpdated, note: 'agents_active: distinct Agent: trailers on the hour\'s commits (agents that write in another repository and are synced by the conductor do not count); handoffs_for: For: trailers' });
// runs and releases: incident.ci@'s run record
let ciRunsUpdated = '';
for (const f of fs.readdirSync('data/ci/runs').sort()) {
  const d = read(path.join('data/ci/runs', f));
  if (d.updated > ciRunsUpdated) ciRunsUpdated = d.updated;
  for (const r of d.runs) {
    const h = H(hour(r.queued || r.pushed));
    h.runs++;
    if (r.result === 'success') { h.releases++; if (r.push_to_served_s != null) h.p2s.push(r.push_to_served_s); }
    else if (r.result === 'cancelled') h.runs_cancelled++;
    else if (r.result === 'failure') h.runs_failed++;
  }
}
sources.push({ figures: ['runs', 'releases', 'runs_cancelled', 'runs_failed', 'push_to_served_median_s'], file: 'data/ci/runs/*.json', by: 'incident.ci@web-summit.dinis', as_of: ciRunsUpdated, note: 'a release is a run that succeeded (it deployed and tagged a version); cancelled: a newer push replaced it while it waited; by the hour the run was queued' });
// cards: incident.board@'s items
let boardUpdated = '', cards = 0;
const states = {};
for (const f of fs.readdirSync('board/items').filter(f => f.endsWith('.json'))) {
  const c = read(path.join('board/items', f));
  cards++;
  states[c.state] = (states[c.state] || 0) + 1;
  if (c.updated > boardUpdated) boardUpdated = c.updated;
  if (c.opened_utc) H(hour(c.opened_utc)).cards_opened++;
  const closed = (c.history || []).find(x => /→ (done|answered)|opened as done|opened already answered/.test(x.change || ''));
  if (closed) H(hour(closed.at)).cards_closed++;
}
sources.push({ figures: ['cards_opened', 'cards_closed'], file: 'board/items/*.json', by: 'incident.board@web-summit.dinis', as_of: boardUpdated, note: 'opened: the card\'s opened_utc, which is when the ask or job was first written down as the board read it, not when the card was made (the board began at 02:20 UTC on 11 November); closed: the history line that moved it to done or answered' });

const tree = read('data/ci/tree.json');
const agentsIdx = read('data/agents/index.json');
const sessions = read('data/agents/sessions.json');
const ci = read('data/ci/index.json');
sources.push({ figures: ['now.files', 'now.bytes'], file: 'data/ci/tree.json', by: tree.by, as_of: tree.updated });
sources.push({ figures: ['now.agents', 'now.asks_for_dinis'], file: 'data/agents/index.json', by: agentsIdx.by, as_of: agentsIdx.updated || 'not stated in the file' });
sources.push({ figures: ['now.sessions'], file: 'data/agents/sessions.json', by: sessions.by, as_of: sessions.updated || 'not stated in the file' });
sources.push({ figures: ['now.totals', 'now.push_to_served_s'], file: 'data/ci/index.json', by: ci.by, as_of: ci.updated });

const by_hour = [...hours.values()].sort((a, b) => a.hour.localeCompare(b.hour)).map(h => ({
  hour: h.hour, commits: h.commits, agents_active: h.agents_active.size, handoffs_for: h.handoffs_for,
  runs: h.runs, releases: h.releases, runs_cancelled: h.runs_cancelled, runs_failed: h.runs_failed,
  push_to_served_median_s: median(h.p2s), cards_opened: h.cards_opened, cards_closed: h.cards_closed,
}));
const out = {
  about: 'The project counted by hour (UTC), from the data other agents keep: commits, agents active and hand-offs (incident.ci@), runs and releases (incident.ci@), cards opened and closed (incident.board@). Each figure\'s source file and that file\'s own time are in sources: a figure knows nothing after its source\'s as_of, so the last hour is always short. Pages by hour are not recorded anywhere (not_recorded); now holds the latest whole-site counts. Written by tools/reporter-numbers.mjs; nothing here is counted by hand.',
  by: 'incident.reporter@web-summit.dinis',
  updated: [ciCommitsUpdated, ciRunsUpdated, boardUpdated, tree.updated].sort().pop(),
  updated_note: 'the newest of the sources\' own times (the tool reads no clock, so the same sources always give the same file)',
  sources,
  by_hour,
  now: {
    files: tree.totals.files, bytes: tree.totals.bytes,
    agents: agentsIdx.counts.agents, asks_for_dinis: agentsIdx.counts.asks_for_dinis,
    sessions: sessions.counts.sessions,
    totals: ci.totals, push_to_served_s: ci.pipeline.push_to_served_s,
    cards: cards, cards_by_state: states,
  },
  not_recorded: [
    'pages served, by hour: no file keeps it (data/ci/tree.json counts tracked files at one moment; the build counts pages only in its own output)',
    'agents started, by hour: only each agent knows when its session began (data/agents/starts.json says so); a first commit is the earliest trace',
    'messages between sessions: not in the repository at all',
    'the three agents that write in SGit-AI__Website__Web-Summit (meteorologist, researcher, dev): their commits there are not in data/ci/',
  ],
};
const target = path.join(outDir, 'reporter/numbers.json');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, JSON.stringify(out, null, 1) + '\n');
console.log(`reporter-numbers: ${by_hour.length} hours, ${by_hour.reduce((a, h) => a + h.commits, 0)} commits, ${by_hour.reduce((a, h) => a + h.releases, 0)} releases -> ${target}`);
