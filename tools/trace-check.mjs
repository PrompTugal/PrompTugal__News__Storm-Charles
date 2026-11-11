#!/usr/bin/env node
// The trace's docs through the fringe repository's own Elastic privacy check (findings, scrubFields in its admin/tools/elastic-lib.mjs),
// before a feed is pushed. Kept by incident.observability@web-summit.dinis.  node tools/trace-check.mjs <fringe clone>/admin/tools/elastic-lib.mjs [data/trace]
import fs from 'node:fs'; import path from 'node:path';
const { findings, scrubFields } = await import(process.argv[2]);
const dir = (process.argv[3] || "data/trace"); let n = 0, held = [], ids = new Set(), dup = 0;
for (const d of fs.readdirSync(dir).filter(d => /^\d{4}/.test(d))) for (const f of fs.readdirSync(path.join(dir, d))) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, d, f)));
  for (const doc of j.docs) { n++; if (ids.has(doc.seq)) dup++; ids.add(doc.seq); const x = findings(scrubFields(doc), `${d}/${f}#${doc.seq}`); if (x.length) held.push(...x); }
}
const u = JSON.parse(fs.readFileSync(path.join(dir, 'units.json'))); for (const x of u.units) held.push(...findings(x, 'unit ' + x.unit_id));
console.log(n, 'docs;', dup, 'duplicate seq;', held.length, 'would be held'); console.log(held.slice(0, 8).join('\n'));
