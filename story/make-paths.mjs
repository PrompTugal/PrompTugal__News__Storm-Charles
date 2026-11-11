// story/make-paths.mjs (incident.storyteller@web-summit.dinis): renders each story/paths/NN-*.json into its .md, and the index.
// The JSON is the source (steps in the words of story/primitives.md, each with its commit, file or url); the page is made from it.
// Run from the repository root: node story/make-paths.mjs   (writes tracked files in story/paths/; not a build generator)
import fs from 'node:fs';

const DIR = 'story/paths';
const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/commit/';
const cast = JSON.parse(fs.readFileSync('story/cast.json', 'utf8')).members;
const who = id => {
  const base = String(id).split('#')[0], gen = String(id).split('#')[1];
  const m = cast.find(c => c.id === base);
  if (!m) return id;
  const name = m.kind === 'agent' ? m.role + '@' : m.name;
  return `${m.icon.emoji} ${name}${gen ? ' #' + gen : ''}`;
};
const ts = t => t.length > 16 ? t.slice(11, 19) : t.slice(11, 16);
const secs = t => Date.parse(t) / 1000;
const gap = s => { s = Math.round(s); if (s < 60) return `+${s} s`; const m = Math.floor(s / 60), r = s % 60; if (m < 60) return `+${m} min${r ? ' ' + r + ' s' : ''}`; const h = Math.floor(m / 60); return `+${h} h ${m % 60} min`; };
const rec = s => [
  s.commit && `[\`${s.commit}\`](${REPO}${s.commit})`,
  s.file && (s.file.startsWith('http') ? `[link](${s.file})` : `\`${s.file}\``),
  s.url && `[${new URL(s.url).hostname}](${s.url})`,
  s.signal && `\`${s.signal}\``,
].filter(Boolean).join(' · ') || '—';

const files = fs.readdirSync(DIR).filter(f => /^\d\d-.*\.json$/.test(f)).sort();
const index = [];
for (const f of files) {
  const p = JSON.parse(fs.readFileSync(`${DIR}/${f}`, 'utf8'));
  const d = p.updated.slice(0, 10), tm = p.updated.slice(11, 16);
  let md = `> Kept by ${p.by}, ${d}, ${tm} UTC. Made by \`story/make-paths.mjs\` from [${f}](${f}) (the data incident.motion@ animates).\n\n`;
  md += `# Path ${p.n}: ${p.title}\n\n`;
  md += `*${p.named_by === 'dinis' ? 'Named by Dinis (BRIEF.md, ~10:10).' : "Chosen by the storyteller for the arc."} ${p.span}.*\n\n${p.summary}\n\n`;
  md += `**Cast:** ${p.cast.map(who).join(' · ')}\n\n`;
  md += `## The steps\n\n| UTC | after | Who | Step | What | Record |\n|---|---|---|---|---|---|\n`;
  let prev = null; const pauses = [];
  for (const s of p.steps) {
    const g = prev ? secs(s.t) - secs(prev.t) : null;
    if (g !== null && g >= (p.pause_min || 10) * 60 && s.verb !== 'pause') pauses.push(`${ts(prev.t)} → ${ts(s.t)} (${gap(g).slice(1)}): ${s.before || 'nothing on record between these two steps'}`);
    md += `| ${ts(s.t)} | ${g === null ? '' : gap(g)} | ${who(s.actor)}${s.to ? ' → ' + who(s.to) : ''} | ${s.verb} | ${s.what.replace(/\|/g, '/')} | ${rec(s)} |\n`;
    prev = s;
  }
  const total = secs(p.steps.at(-1).t) - secs(p.steps[0].t);
  md += `\nFrom the first step to the last: ${gap(total).slice(1)}.\n\n`;
  md += `## The pauses\n\n${pauses.length ? pauses.map(x => '- ' + x).join('\n') : '- None of ' + (p.pause_min || 10) + ' minutes or more.'}${p.pauses_note ? '\n\n' + p.pauses_note : ''}\n\n`;
  md += `## What this shows\n\n${p.shows.map(x => '- ' + x).join('\n')}\n\n`;
  if (p.reading?.length) md += `## Reading it (the storyteller's)\n\n${p.reading.join('\n\n')}\n\n`;
  md += `## Rests on\n\n${p.rests_on.map(x => '- ' + x).join('\n')}\n- Times: a commit's author time (git \`%aI\`), to the second; CI's times from \`data/ci/runs/\`; a time marked approximate is the storyteller's placing between two timed steps.\n\n`;
  md += `[All the paths](README.md) · [the cast](../cast.md) · [the primitives](../primitives.md)\n\n*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*\n`;
  fs.writeFileSync(`${DIR}/${f.replace(/\.json$/, '.md')}`, md);
  index.push({ n: p.n, title: p.title, file: f.replace(/\.json$/, '.md'), span: p.span, named_by: p.named_by });
}
console.log('paths:', index.map(i => i.n).join(' '));
