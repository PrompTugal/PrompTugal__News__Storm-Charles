#!/usr/bin/env node
// incident.reporter@web-summit.dinis: fills and checks the traces in reporter/traces/*.json from the record.
// Run by the reporter at each wake in a full clone (git fetch --tags first); never by the build (it reads git history).
//   node tools/reporter-fill.mjs            fill in place, write reporter/traces/index.json
//   node tools/reporter-fill.mjs --check    change nothing; exit 1 if a trace would change or a reference is broken
// For a step that names a commit of this repository ("sha"), the commit decides: "at" (committer time, UTC), "for" (its For:
// trailers), "agent_trailer" (its Agent: trailer), and two evidence entries: the commit, and the version that first served it
// (the first CI tag at or after the commit; the served time from data/ci/runs/ when incident.ci@'s snapshot holds that run).
// A step with no evidence must say so ("evidence_note"). Files named as evidence in this repository must exist.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const check = process.argv.includes('--check');
const dir = 'reporter/traces';
const REPO = 'PrompTugal/PrompTugal__News__Storm-Charles';
const SITE = 'https://storm-charles.promptugal.news/';
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();

const runs = new Map();
let ciUpdated = '';
for (const f of fs.readdirSync('data/ci/runs')) {
  const d = JSON.parse(fs.readFileSync(path.join('data/ci/runs', f), 'utf8'));
  if (d.updated > ciUpdated) ciUpdated = d.updated;
  for (const r of d.runs) runs.set(r.version, r);
}
const servedCache = new Map();
function served(sha) {
  if (servedCache.has(sha)) return servedCache.get(sha);
  const tags = git('tag', '--contains', sha, '--sort=version:refname', '--list', 'v*').split('\n').filter(Boolean);
  const v = tags[0] || null;
  let out = null;
  if (v) {
    const r = runs.get(v);
    out = { type: 'version', version: v, run: Number(v.split('.').pop()), own_run: git('rev-list', '-n1', v) === sha };
    if (r && r.ended) { out.served_by = r.ended; if (r.push_to_served_s != null) out.push_to_served_s = r.push_to_served_s; }
    else out.note = `the run's times are not in data/ci/runs/ as of ${ciUpdated}`;
  }
  servedCache.set(sha, out);
  return out;
}

let problems = 0, changed = 0;
const index = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'index.json').sort()) {
  const p = path.join(dir, f);
  const raw = fs.readFileSync(p, 'utf8');
  const t = JSON.parse(raw);
  const bad = m => { problems++; console.error(`${f}: ${m}`); };
  if (!Array.isArray(t.summary) || t.summary.length !== 5) bad('summary must be five lines');
  if (!t.updated || Date.parse(t.updated) > Date.now()) bad(`updated (${t.updated}) is missing or later than the clock: read the clock before stamping`);
  if (!Array.isArray(t.rests_on) || !t.rests_on.length) bad('rests_on must list the files the trace rests on');
  for (const r of t.rests_on || []) { const file = (r.path || r).split('#')[0]; if (!(r.repo && r.repo !== REPO) && !fs.existsSync(file)) bad(`rests_on: ${file} does not exist`); }
  let n = 0, noEvidence = 0;
  const people = new Set(), agents = new Set();
  for (const s of t.steps || []) {
    s.n = ++n;
    if (!s.actor || !s.actor.name || !s.actor.kind) bad(`step ${n}: actor {name, kind}`);
    else (s.actor.kind === 'person' ? people : s.actor.kind === 'agent' ? agents : new Set()).add(s.actor.name);
    s.evidence = (s.evidence || []).filter(e => !e.filled);
    if (s.sha && (!s.repo || s.repo === REPO)) {
      let full;
      try { full = git('rev-parse', '--verify', s.sha + '^{commit}'); } catch { bad(`step ${n}: commit ${s.sha} not found`); continue; }
      s.sha = full;
      s.at = git('show', '-s', '--format=%cI', full).replace('+00:00', 'Z');
      // read from the whole message: git's own trailer parser sees only the last paragraph, and many commits here carry
      // Agent:, Issue: and For: in the paragraph before the session's own trailers
      const body = git('show', '-s', '--format=%B', full).split('\n');
      const tr = k => body.filter(l => l.startsWith(k + ': ')).map(l => l.slice(k.length + 2).trim());
      s.agent_trailer = tr('Agent')[0] || git('show', '-s', '--format=%an', full) + ' (author; no Agent: trailer)';
      s.for = tr('For');
      s.evidence.push({ filled: true, type: 'commit', sha: full, url: `https://github.com/${REPO}/commit/${full}` });
      const v = served(full);
      s.evidence.push(v ? { filled: true, ...v } : { filled: true, type: 'version', version: null, note: 'no CI tag at or after this commit when the trace was filled' });
    }
    for (const e of s.evidence) {
      if (e.type === 'file' && (!e.repo || e.repo === REPO) && !fs.existsSync(e.path)) bad(`step ${n}: file ${e.path} does not exist`);
      if (e.type === 'file' && (!e.repo || e.repo === REPO) && !e.url) e.url = SITE + 'view/?path=' + e.path;
    }
    if (!s.evidence.length) { noEvidence++; if (!s.evidence_note) bad(`step ${n}: no evidence and no evidence_note`); }
    if (!s.handoff) bad(`step ${n}: handoff {to, via}`);
  }
  t.counts = { steps: n, steps_with_no_evidence: noEvidence, person_steps: (t.steps || []).filter(s => s.actor?.kind === 'person').length, agent_steps: (t.steps || []).filter(s => s.actor?.kind === 'agent').length };
  t.people_acted = [...people];
  t.agents_acted = [...agents];
  const out = JSON.stringify(t, null, 1) + '\n';
  if (out !== raw) { changed++; if (!check) fs.writeFileSync(p, out); }
  index.push({ id: t.id, file: `${dir}/${f}`, size: t.size, title: t.title, status: t.status, from: t.duration?.from, to: t.duration?.to, ...t.counts, people_acted: t.people_acted, agents_acted: t.agents_acted, summary: t.summary, updated: t.updated });
}
const idx = {
  about: 'Every trace kept by incident.reporter@: one workflow each, from a spoken direction to a live page, as steps with evidence (shape sc-trace/1, after ws-trace/1 of SGit-AI__Website__Web-Summit team/reporter/traces/). Read this file, then only the trace you need: each opens with a five-line summary and the files it rests on. Written by tools/reporter-fill.mjs.',
  by: 'incident.reporter@web-summit.dinis',
  updated: index.map(t => t.updated).sort().pop() || null,
  shape: 'reporter/traces/README.md',
  traces: index,
};
const idxOut = JSON.stringify(idx, null, 1) + '\n';
const idxPath = path.join(dir, 'index.json');
if (!fs.existsSync(idxPath) || fs.readFileSync(idxPath, 'utf8') !== idxOut) { changed++; if (!check) fs.writeFileSync(idxPath, idxOut); }
console.log(`reporter-fill: ${index.length} traces, ${index.reduce((a, t) => a + t.steps, 0)} steps, ${index.reduce((a, t) => a + t.steps_with_no_evidence, 0)} with no evidence; ${changed} file(s) ${check ? 'would change' : 'written'}; ${problems} problem(s)`);
process.exit(problems || (check && changed) ? 1 : 0);
