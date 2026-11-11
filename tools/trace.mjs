#!/usr/bin/env node
// The swarm's trace as data (Dinis, 11 November 2026, ~22:00 UTC, BRIEF.md item 4: "All of these needs to be JSON files", replayable
// back to 10 November; the visualization is built in the fringe repository). Kept by incident.observability@web-summit.dinis.
//
// One doc per event in data/trace/<YYYY-MM-DD>/<HH>.json (backfill) and <HH>.<role>.json (written live by that agent); a part over
// 240 KB continues in -2, -3. Each file carries an "elastic_feed" block (the fringe's admin/tools/elastic-feeds.mjs), docs one per line, in the fringe
// repository's swarm-flows schema (PrompTugal__News__Fringe, abp/tools/flow.mjs and data/elastic-export-swarm-flows.json), so its
// Elastic, Grafana and gravity views read ours unchanged: every field is one its strict mapping accepts, and trace_id and span_id are
// computed exactly as flow.mjs computes them (sha256('trace:'+flow)[0:32], sha256('span:'+unit_id)[0:16]). The kind of event
// (msg, spawn, fetch, write, commit, ...) is the first word of `name`; the other end of an edge is `item`. data/trace/README.md.
//
//   node tools/trace.mjs ev     --unit <agent|unit id> --phase start|step|end [--altitude A3] [--name N] [--note T] [--parent ID]
//   node tools/trace.mjs msg    --from <agent> --to <agent> --subject "one line"
//   node tools/trace.mjs spawn  --parent <agent> --child <agent> --session <session id> [--n 9] [--why "hand-over at ~160k"]
//   node tools/trace.mjs fetch  --agent <agent> --host <host> --status 200 [--bytes N] [--sha256 X] [--path /p]
//   node tools/trace.mjs write  --agent <agent> --path <repo path> [--sha256 X]   (sha256 of the file, read here if omitted)
//   node tools/trace.mjs units                  rewrite data/trace/units.json   (index: rewrite data/trace/index.json; every command does)
//   node tools/trace.mjs backfill [--since 2026-11-10]   rewrite the backfilled lines (live lines are kept), then units.json
//
// --agent/--from/--to/--parent take a full name (incident.conductor@web-summit.dinis) or a short role (conductor). The acting agent
// defaults to $AGENT. Never a private person's name, a session's secret, a vault key, a prompt or a model's words in a line: subjects
// are cut to one line of 160 characters, and e-mail addresses, URLs with tokens and session ids are taken out of free text.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'data/trace');
const BY = 'incident.observability@web-summit.dinis';
const PART_MAX = 240 * 1024;
const TEAM = 'web-summit.dinis';
const SWARM = 'A4-ws214';
const PERSON = 'P-dinis';
const ROLE = { P: 'person', A4: 'swarm', A3: 'agent', A2: 'loop', A1: 'llm call', A0: 'compute' };
const ENV = {
  team: 'R1 web-summit.dinis',
  ci: 'GitHub Actions PrompTugal',
  vicky: 'R1 PrompTugal.vicky',
  fringe: 'R1 PrompTugal.dinis',
};

const hex = (s, n) => crypto.createHash('sha256').update(String(s)).digest('hex').slice(0, n);
export const traceIdOf = (flow) => hex('trace:' + flow, 32);   // as abp/tools/flow.mjs
export const spanIdOf = (unit) => hex('span:' + unit, 16);     // as abp/tools/flow.mjs
const readJSON = (p, d = null) => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8')); } catch { return d; } };
const iso = (t) => new Date(t).toISOString();
const flowOf = (at) => 'ws214-' + iso(at).slice(0, 13).replace(/-/g, '').replace(':', '');   // one flow per UTC hour: ws214-20261111T22
export const clean = (s) => String(s || '').split('\n')[0]
  .replace(/session_[A-Za-z0-9]{10,}/g, '[session]')
  .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, (m) => /@(web-summit\.[a-z]+|PrompTugal\.[a-z]+)$/i.test(m) ? m : '[address]')   // agents' names stay; any other address goes
  .replace(/https?:\/\/\S*(token|key|secret|sig)=\S*/gi, '[link]')
  .replace(/\s+/g, ' ').trim().slice(0, 160);

// ---------- who is who ----------
export function fullName(x) {
  x = String(x || '').trim();
  if (!x) return '';
  if (x.includes('@')) return x;
  return `incident.${x.replace(/^incident\./, '')}@${TEAM}`;
}
const accountOf = (agent) => agent.endsWith('@' + TEAM) ? 'web-summit.dinis' : (agent.split('@')[1] || 'unknown');
const envOf = (agent) => agent.endsWith('@' + TEAM) ? ENV.team : /vicky/i.test(agent) ? ENV.vicky : /fringe/i.test(agent) ? ENV.fringe : `R1 ${accountOf(agent)}`;
export const unitOf = (agent) => 'A3-' + agent;
const isConductor = (a) => a === `incident.conductor@${TEAM}`;

// Keys from data/keys.json, each with the time it was made (from its "how", else the day it was added), for key_fp at a time.
function loadKeys() {
  const k = readJSON('data/keys.json', { keys: [] });
  const by = {};
  for (const e of k.keys || []) {
    if (!e.agent || !e.bundle) continue;
    const m = /(\d{1,2}) November 2026,? (\d{2}):(\d{2}) UTC/.exec(e.how || '');
    const made = m ? Date.UTC(2026, 10, +m[1], +m[2], +m[3]) : Date.parse((e.added || '2026-11-10') + 'T00:00:00Z');
    (by[e.agent] ||= []).push({ id: e.id, fp: e.bundle.fingerprint, signing: e.bundle.signing_fingerprint, made, status: e.status });
  }
  for (const a in by) by[a].sort((x, y) => x.made - y.made);
  return by;
}
const keyAt = (keys, agent, t) => { const l = keys[agent]; if (!l) return undefined; let k = l[0]; for (const x of l) if (x.made <= t) k = x; return k.fp; };

// ---------- writing lines ----------
let seqLast = 0;
function nextSeq(t) { let s = Math.floor(t) * 1000; if (s <= seqLast) s = seqLast + 1; seqLast = s; return s; }
export function event({ at, unit, altitude, phase, name, parent, runner, environment, key_fp, model, valid, item, note, host, duration_ms, cost_usd, source }) {
  const t = Date.parse(at);
  const flow = flowOf(t);
  const e = { trace_id: traceIdOf(flow), span_id: spanIdOf(unit), parent_span_id: parent ? spanIdOf(parent) : undefined, flow, seq: nextSeq(t), at: iso(t),
    phase, unit_id: unit, parent_id: parent, altitude, role: ROLE[altitude] || altitude, name: name ? clean(name) : undefined, runner, person: 'dinis', environment,
    host, key_fp, model, valid, item, note: note ? clean(note) : undefined, duration_ms, cost_usd, source };
  for (const k of Object.keys(e)) if (e[k] === undefined || e[k] === null || e[k] === '') delete e[k];
  return e;
}
// <date>/<HH>.json (the backfill, kept by this role), <date>/<HH>.<role>.json (lines an agent writes live: one file per agent, so
// no two agents edit the same file and the Elastic feed's owner is the file's last committer); past PART_MAX, -2, -3 before .json.
const fileOf = (at, part = 1, role = '') => path.join(DIR, at.slice(0, 10), at.slice(11, 13) + (role ? '.' + role : '') + (part > 1 ? `-${part}` : '') + '.json');
export const INDEX_EVENTS = 'ptnews-storm-trace', INDEX_UNITS = 'ptnews-storm-units';   // the fringe's Elastic takes only fringe|ptnews|websummit|swarm|agents-*
const feed = (owner) => ({ index: INDEX_EVENTS, owner, id: 'seq', time: 'at', docs: 'docs',
  about: "The Storm Charles team's trace (WS-214), in the fringe swarm-flows schema: storm-charles.promptugal.news/data/trace/README.html" });
const roleOf = (agent) => (/^incident\.([^@]+)@/.exec(agent) || [, agent.replace(/[^a-z0-9.-]/gi, '-')])[1];
export function writeFeed(f, docs, owner) {
  const head = { elastic_feed: feed(owner), by: owner, updated: iso(Date.now()).replace(/\.\d+Z$/, 'Z'), flow: docs[0]?.flow, count: docs.length };
  fs.mkdirSync(path.dirname(f), { recursive: true });
  const body = JSON.stringify(head).slice(0, -1) + ',"docs":[\n' + docs.map(d => JSON.stringify(d)).join(',\n') + '\n]}\n';
  fs.writeFileSync(f, body);
  return body.length;
}
const readDocs = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')).docs || []; } catch { return []; } };
function appendLive(e) {
  const owner = e.runner; const role = roleOf(owner);
  let part = 1; while (fs.existsSync(fileOf(e.at, part + 1, role))) part++;
  let f = fileOf(e.at, part, role); let docs = readDocs(f);
  if (fs.existsSync(f) && fs.statSync(f).size + JSON.stringify(e).length + 2 > PART_MAX) { f = fileOf(e.at, part + 1, role); docs = []; }
  docs.push(e); writeFeed(f, docs, owner);
  return path.relative(ROOT, f);
}

// ---------- the live CLI ----------
const argv = process.argv.slice(2);
const cmd = argv[0];
const arg = (n, d) => { const i = argv.indexOf('--' + n); return i > 0 && argv[i + 1] !== undefined ? argv[i + 1] : d; };
const need = (n) => { const v = arg(n); if (!v) { console.error(`trace: --${n} is needed (node tools/trace.mjs for the usage)`); process.exit(2); } return v; };

function live() {
  seqLast = Date.now() * 1000 + 500 + Math.floor(Math.random() * 400);   // live seqs sit above the backfill's in the same millisecond
  const keys = loadKeys();
  const now = Date.now();
  const at = iso(now);
  const me = fullName(arg('agent', process.env.AGENT || ''));
  const base = (agent) => ({ at, runner: agent, environment: envOf(agent), key_fp: keyAt(keys, agent, now), parent: agent.endsWith('@' + TEAM) ? SWARM : undefined, source: 'tools/trace.mjs' });
  const out = [];
  if (cmd === 'ev') {
    const u = need('unit'); const agent = u.includes('@') || !/^[A-Z]\d?-/.test(u) ? fullName(u) : me;
    const unit = /^[A-Z]\d?-/.test(u) ? u : unitOf(agent);
    out.push(event({ ...base(agent), unit, altitude: arg('altitude', 'A3'), phase: need('phase'), name: 'ev ' + arg('name', ''), note: arg('note'), parent: arg('parent', base(agent).parent) }));
  } else if (cmd === 'msg') {
    const from = fullName(arg('from', me)), to = fullName(need('to'));
    out.push(event({ ...base(from), unit: unitOf(from), altitude: 'A3', phase: 'step', name: `msg to ${to}`, item: unitOf(to), note: need('subject') }));
  } else if (cmd === 'spawn') {
    const parent = fullName(arg('parent', me)), child = fullName(need('child')), n = arg('n');
    const s = need('session'); if (!/^session_[A-Za-z0-9]+$/.test(s)) { console.error('trace: --session must be a session id'); process.exit(2); }
    out.push(event({ ...base(parent), unit: unitOf(parent), altitude: 'A3', phase: 'step', name: `spawn ${child}${n ? ' session ' + n : ''}`, item: unitOf(child), note: arg('why') }));
    out.push(event({ ...base(child), unit: unitOf(child), altitude: 'A3', phase: 'start', name: `session ${n || 'new'} begins`, item: s, note: `spawned by ${parent}` }));
  } else if (cmd === 'fetch') {
    const agent = fullName(arg('agent', me)); const host = need('host'); const status = +need('status');
    const unit = `A0-fetch-${hex(agent + host + at + Math.random(), 12)}`;
    const note = `${status}${arg('bytes') ? ', ' + arg('bytes') + ' bytes' : ''}${arg('path') ? ', ' + arg('path') : ''}`;
    out.push(event({ ...base(agent), unit, altitude: 'A0', phase: 'end', parent: unitOf(agent), name: `fetch ${host}`, host, valid: status >= 200 && status < 400, item: arg('sha256'), note, key_fp: undefined }));
  } else if (cmd === 'write') {
    const agent = fullName(arg('agent', me)); const p = need('path');
    let sha = arg('sha256'); if (!sha) { try { sha = crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, p))).digest('hex'); } catch { sha = undefined; } }
    out.push(event({ ...base(agent), unit: unitOf(agent), altitude: 'A3', phase: 'step', name: `write ${p}`, item: sha ? 'sha256:' + sha : undefined }));
  } else {
    console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').filter(l => l.startsWith('//')).slice(0, 22).map(l => l.slice(3)).join('\n'));
    process.exit(cmd ? 2 : 0);
  }
  for (const e of out) console.log(`${appendLive(e)}: ${e.name || e.phase} (${e.unit_id})`);
}

// ---------- units.json ----------
function units(knownAgents = new Set()) {
  const keys = loadKeys();
  const sess = readJSON('data/agents/sessions.json', { agents: [] });
  const cond = readJSON('agents/conductor/sessions.json', {});
  const roster = readJSON('data/agents/index.json', {});
  const names = new Set([...knownAgents, ...Object.keys(keys).filter(a => a.endsWith('@' + TEAM)), ...(sess.agents || []).map(a => a.agent)]);
  const spawnsBy = {}; for (const s of cond.spawns || []) (spawnsBy[s.agent] ||= []).push(s);
  const list = [
    { unit_id: PERSON, altitude: 'P', role: 'person', name: 'Dinis Cruz', about: 'the only person who instructs this team (CLAUDE.md)' },
    { unit_id: SWARM, altitude: 'A4', role: 'swarm', parent_id: PERSON, name: 'the Storm Charles incident team (WS-214)', account: 'web-summit.dinis', runner: `incident.conductor@${TEAM}`,
      about: 'agents of agents: the conductor spawns, hands over and schedules the team (docs/where-agents-run.md §3 in the fringe repository)' },
  ];
  for (const a of [...names].sort()) {
    const s = (sess.agents || []).find(x => x.agent === a) || {};
    const team = a.endsWith('@' + TEAM);
    const sessions = (Array.isArray(s.sessions) ? s.sessions : []).map(x => ({ n: x.n, id: x.id, first_commit_at: x.first_commit?.at, last_commit_at: x.last_commit?.at, commits: x.commits,
      started_at: x.started_at !== 'not recorded' ? x.started_at : undefined, started_by: x.started_by !== 'not recorded' ? x.started_by : undefined }));
    for (const sp of spawnsBy[a] || []) {
      const have = sessions.find(x => x.id === sp.session);
      if (have) { have.started_at ||= sp.at; have.started_by ||= `incident.conductor@${TEAM}`; }
      else sessions.push({ n: +sp.session_n || undefined, id: sp.session, started_at: sp.at, started_by: `incident.conductor@${TEAM}`, replaces: sp.replaces });
    }
    const live = cond.live_at_2205?.[a] || (a === cond.conductor?.agent ? cond.conductor.session : undefined);
    if (live && !sessions.find(x => x.id === live)) sessions.push({ id: live, note: 'live at 22:05 UTC on 11 November (agents/conductor/sessions.json)' });
    for (const x of sessions) for (const k of Object.keys(x)) if (x[k] === undefined) delete x[k];
    list.push({ unit_id: unitOf(a), altitude: 'A3', role: 'agent', name: a, parent_id: team ? SWARM : undefined,
      spawns_others: team && isConductor(a) ? true : undefined,
      account: accountOf(a), runtime: team ? 'R1' : /vicky|fringe/i.test(a) ? 'R1' : undefined, io_level: team ? (isConductor(a) ? 'L5' : 'L4') : undefined,
      environment: envOf(a),
      keys: (keys[a] || []).map(k => ({ id: k.id, key_fp: k.fp, signing_fp: k.signing, made: iso(k.made), status: k.status })),
      sessions: sessions.length ? sessions : undefined });
  }
  list.push({ unit_id: 'A0-ci', altitude: 'A0', role: 'compute', name: 'CI: build, gate, deploy (each run is a unit A0-ci-<run>)', account: 'PrompTugal (GitHub Actions)', environment: ENV.ci,
    about: 'started by a push; its runs are recorded by incident.ci@ in data/ci/runs/' });
  for (const l of list) for (const k of Object.keys(l)) if (l[k] === undefined) delete l[k];
  const out = { elastic_feed: { index: INDEX_UNITS, owner: BY, id: 'unit_id', docs: 'units', about: 'The units of the Storm Charles team\'s trace (WS-214): person, swarm, agents, compute' },
    about: 'Every unit that appears in data/trace/*/*.json: the person, the swarm (A4), each agent (A3) with its keys and its sessions in order, and the compute (A0). Altitudes and runtimes as in the fringe repository\'s docs/where-agents-run.md §2-3. io_level: L5 for the conductor (git, vaults, lanes, wakes, spawns), L4 for the team (git behind the gate; most also use vaults and lanes). Sessions: from data/agents/sessions.json (by Claude-Session trailers) and agents/conductor/sessions.json (spawns from 20:47 UTC on 11 November); "started_at" only where someone wrote it down.',
    by: BY, updated: iso(Date.now()).replace(/\.\d+Z$/, 'Z'), sources: ['data/keys.json', 'data/agents/sessions.json', 'agents/conductor/sessions.json', 'data/agents/index.json'], count: list.length, units: list };
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, 'units.json'), JSON.stringify(out, null, 1) + '\n');
  return out;
}

// ---------- backfill ----------
function backfill() {
  const since = arg('since', '2026-11-10');
  const keys = loadKeys();
  const ev = [];
  const agents = new Set();
  const A = (agent, at, o) => { agents.add(agent); return { at, runner: agent, environment: envOf(agent), key_fp: keyAt(keys, agent, Date.parse(at)), unit: unitOf(agent), altitude: 'A3', parent: agent.endsWith('@' + TEAM) ? SWARM : undefined, ...o }; };

  // 1. commits: each push an A3 step; For: trailers are message edges.
  const raw = execFileSync('git', ['log', `--since=${since}T00:00:00Z`, '--reverse', '--format=%H%x1f%cI%x1f%B%x1e'], { cwd: ROOT, maxBuffer: 1 << 28 }).toString();
  const sessIndex = {}; for (const a of readJSON('data/agents/sessions.json', { agents: [] }).agents) for (const s of (Array.isArray(a.sessions) ? a.sessions : [])) sessIndex[s.id] = s.n;
  let nCommits = 0, nMsgs = 0;
  for (const rec of raw.split('\x1e')) {
    const [sha, at, body] = rec.replace(/^\n/, '').split('\x1f'); if (!sha || !body) continue;
    const lines = body.trim().split('\n'); const subject = lines[0];
    const tr = (k) => lines.filter(l => new RegExp(`^${k}:`, 'i').test(l)).flatMap(l => l.replace(/^[^:]+:\s*/, '').split(/[,\s]+/)).filter(Boolean);
    let agent = tr('Agent')[0] || (/^([^:\s]+@[^:\s]+):/.exec(subject) || [])[1];
    if (!agent) continue;
    agent = fullName(agent);
    const sess = (tr('Claude-Session')[0] || '').replace(/.*\//, '');
    const what = subject.replace(/^[^:\s]+@[^:\s]+:\s*/, '');
    const t = new Date(at).toISOString();
    ev.push(event(A(agent, t, { phase: 'step', name: `commit ${what}`, item: sha.slice(0, 12), note: sessIndex[sess] ? `session ${sessIndex[sess]}` : undefined, source: 'backfill:git' })));
    nCommits++;
    for (const to of new Set(tr('For').map(fullName).filter(x => x.includes('@') && x !== agent))) {
      agents.add(to);
      ev.push(event(A(agent, t, { phase: 'step', name: `msg to ${to}`, item: unitOf(to), note: `commit ${sha.slice(0, 12)}`, source: 'backfill:git' })));
      nMsgs++;
    }
  }

  // 2. CI runs (incident.ci@'s records): each run an A0 unit under the agent whose push started it.
  let nRuns = 0;
  for (const f of fs.readdirSync(path.join(ROOT, 'data/ci/runs')).filter(f => f.endsWith('.json')).sort()) {
    for (const r of readJSON('data/ci/runs/' + f, {}).runs || []) {
      const start = r.started || r.queued || r.pushed; if (!start || start < since) continue;
      const agent = r.agent ? fullName(r.agent) : undefined; const unit = `A0-ci-${r.run}`;
      const parent = agent ? unitOf(agent) : 'A0-ci';
      if (agent) agents.add(agent);
      const common = { unit, altitude: 'A0', parent, runner: agent || 'github-actions', environment: ENV.ci, item: r.sha?.slice(0, 12), source: 'backfill:data/ci/runs' };
      ev.push(event({ ...common, at: start, phase: 'start', name: `ci run ${r.run} ${r.version || ''}`.trim() }));
      if (r.ended) ev.push(event({ ...common, at: r.ended, phase: 'end', name: `ci run ${r.run} ${r.result || ''}`.trim(), valid: r.result === 'success',
        duration_ms: r.run_s != null ? r.run_s * 1000 : undefined }));
      nRuns++;
    }
  }

  // 3. The agents' own model calls, measured (accounts/ledger/*.jsonl): one A1 unit per agent, measured session and hour (an aggregate:
  //    the count of calls, never their text; the model an agent runs on is not named, CLAUDE.md).
  let nA1 = 0;
  for (const f of fs.readdirSync(path.join(ROOT, 'accounts/ledger')).filter(f => f.endsWith('.jsonl'))) {
    const last = {};
    for (const l of fs.readFileSync(path.join(ROOT, 'accounts/ledger', f), 'utf8').split('\n')) { try { const j = JSON.parse(l); if (j.agent && j.session) last[j.agent + '|' + j.session] = j; } catch {} }
    for (const j of Object.values(last)) {
      const agent = fullName(j.agent);
      for (const [hour, h] of Object.entries(j.totals?.by_hour || {})) {
        if (hour < since || !h.calls) continue;
        const unit = `A1-${hex(agent + j.session + hour, 12)}`;
        const s = Date.parse(hour), first = Date.parse(j.totals.first_call), lastc = Date.parse(j.totals.last_call);
        const a0 = iso(Math.max(s, first)), a1 = iso(Math.min(s + 3599000, lastc));
        const common = { unit, altitude: 'A1', parent: unitOf(agent), runner: agent, environment: envOf(agent), source: `backfill:accounts/ledger/${f}` };
        ev.push(event({ ...common, at: a0, phase: 'start', name: `llm calls ${h.calls} in the hour (aggregate)` }));
        ev.push(event({ ...common, at: a1 < a0 ? a0 : a1, phase: 'end', name: `llm calls ${h.calls} in the hour (aggregate)`, note: `${h.calls} calls, ${h.output} output tokens, measured session ${j.session}` }));
        agents.add(agent); nA1++;
      }
    }
  }

  // 4. Spawns and hand-overs: the conductor's record (agents/conductor/sessions.json), then the sessions each agent stated it was
  //    started by (data/agents/sessions.json: started_by / started_at, only where written down).
  const cond = readJSON('agents/conductor/sessions.json', {});
  const conductor = `incident.conductor@${TEAM}`; let nSpawns = 0; const seen = new Set();
  const spawn = (child, at, session, n, why, src) => {
    if (!at || seen.has(session)) return; seen.add(session); agents.add(child);
    ev.push(event(A(conductor, at, { phase: 'step', name: `spawn ${child}${n ? ' session ' + n : ''}`, item: unitOf(child), note: why, source: src })));
    ev.push(event(A(child, at, { phase: 'start', name: `session ${n || '?'} begins`, item: session, note: `spawned by ${conductor}`, source: src })));
    nSpawns++;
  };
  for (const s of cond.spawns || []) spawn(fullName(s.agent), s.at, s.session, s.session_n, s.why, 'backfill:agents/conductor/sessions.json');
  for (const a of readJSON('data/agents/sessions.json', { agents: [] }).agents) for (const s of (Array.isArray(a.sessions) ? a.sessions : []))
    if (s.started_at && s.started_at !== 'not recorded' && /conductor/.test(s.started_by || '') && /^\d{4}-/.test(s.started_at))
      spawn(a.agent, s.started_at, s.id, s.n, 'stated in the agent\'s own status (data/agents/sessions.json)', 'backfill:data/agents/sessions.json');

  // 5. Cross-account: the fringe repository's swarm reads our api/v1 (swarm/tools/run.mjs); a static edge until its runs are published.
  //    (Our commits For: Vicky's desks are message edges in 1.)
  agents.add('swarm.1.fringe@PrompTugal.dinis');

  // Write: every hour's backfilled lines, with the live lines (source tools/trace.mjs) kept as they were.
  ev.sort((a, b) => a.at < b.at ? -1 : a.at > b.at ? 1 : a.seq - b.seq);
  seqLast = 0; for (const e of ev) e.seq = nextSeq(Date.parse(e.at));
  // Rewrite this role's backfill files (<HH>.json, <HH>-<n>.json); agents' live files (<HH>.<role>.json) are left as they are.
  const mine = /^\d{2}(-\d+)?\.json$/;
  if (fs.existsSync(DIR)) for (const d of fs.readdirSync(DIR).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))) {
    for (const f of fs.readdirSync(path.join(DIR, d))) if (mine.test(f) || f.endsWith('.jsonl')) fs.unlinkSync(path.join(DIR, d, f));
  }
  const byHour = {}; for (const e of ev) (byHour[e.at.slice(0, 13)] ||= []).push(e);
  let files = 0, bytes = 0;
  for (const [h, list] of Object.entries(byHour)) {
    let part = 1, cur = [], size = 400;
    const flush = () => { bytes += writeFeed(fileOf(h + ':00:00Z', part), cur, BY); files++; cur = []; size = 400; part++; };
    for (const e of list) { const l = JSON.stringify(e).length + 2; if (size + l > PART_MAX) flush(); cur.push(e); size += l; }
    if (cur.length) flush();
  }
  const liveLines = { length: 0 };
  const u = units(agents);
  console.log(`trace backfill since ${since}: ${nCommits} commits, ${nMsgs} messages, ${nRuns} CI runs, ${nA1} A1 aggregates, ${nSpawns} spawns; agents' live files left as they are; ${ev.length} lines in ${files} files (${Math.round(bytes / 1024)} KB); ${u.count} units`);
}

// ---------- index.json: every file, its lines, first and last time, sha256 (so a visualizer fetches only what it needs) ----------
function writeIndex() {
  const files = [];
  for (const d of fs.readdirSync(DIR).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort())
    for (const f of fs.readdirSync(path.join(DIR, d)).filter(f => f.endsWith('.json')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
      const buf = fs.readFileSync(path.join(DIR, d, f)); const docs = JSON.parse(buf).docs || []; if (!docs.length) continue;
      const first = docs[0].at, last = docs[docs.length - 1].at;
      files.push({ path: `data/trace/${d}/${f}`, owner: JSON.parse(buf).elastic_feed?.owner, lines: docs.length, bytes: buf.length, first, last, sha256: crypto.createHash('sha256').update(buf).digest('hex') });
    }
  const out = { about: 'The trace files in time order (data/trace/README.md). Each file is {elastic_feed, by, updated, flow, count, docs[]}: each doc one event in the fringe repository\'s swarm-flows schema. Replay: merge the docs of the files in this order by seq (an hour\'s live files, <HH>.<role>.json, interleave with its backfill file).',
    by: BY, updated: iso(Date.now()).replace(/\.\d+Z$/, 'Z'), units: 'data/trace/units.json', count: files.length, indexes: { events: INDEX_EVENTS, units: INDEX_UNITS }, lines: files.reduce((n, f) => n + f.lines, 0), files };
  fs.writeFileSync(path.join(DIR, 'index.json'), JSON.stringify(out, null, 1) + '\n');
}

// The CLI runs only when this file is the command, never on import (tools/models-calls.mjs and others import emit()).
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (cmd === 'backfill') { backfill(); writeIndex(); }
  else if (cmd === 'units') { const u = units(); console.log(`data/trace/units.json: ${u.count} units`); }
  else if (cmd === 'index') writeIndex();
  else { live(); writeIndex(); }
}

// For other tools: emit({ at?, unit, altitude, phase, name, parent?, runner, environment?, key_fp?, model?, valid?, item?, note?, host?,
// duration_ms?, cost_usd? }) appends one event to data/trace/<date>/<HH>.<runner's role>.json and returns that path. `runner` is the
// agent the event belongs to (it owns the file); trace_id, span_id and seq are computed here. Call writeIndex() once after a batch.
export function emit(o) {
  if (!o || !o.unit || !o.phase || !o.runner) throw new Error('trace emit: unit, phase and runner are needed');
  const t = o.at ? Date.parse(o.at) : Date.now();
  if (seqLast < t * 1000 + 500) seqLast = t * 1000 + 500 + Math.floor(Math.random() * 400);
  const runner = fullName(o.runner);
  const e = event({ altitude: 'A3', environment: envOf(runner), source: 'tools/trace.mjs', ...o, runner, at: iso(t) });
  return appendLive(e);
}
export { writeIndex, appendLive };
