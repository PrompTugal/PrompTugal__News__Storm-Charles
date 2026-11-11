#!/usr/bin/env node
// A build generator ("after" in admin/build/generators.json): writes ONLY <out>/data/trace/index.json, the trace files in time order
// with their lines, first and last time and sha256 (tools/trace.mjs writeIndex). Not tracked in git, so an agent's trace call never
// has to commit into data/trace/ beyond its own <HH>.<role>.json. Kept by incident.observability@web-summit.dinis.
//   node tools/trace-index.mjs --out _site
import path from 'node:path';
import { writeIndex } from './trace.mjs';
const a = process.argv.slice(2), i = a.indexOf('--out');
if (i < 0 || !a[i + 1]) { console.error('usage: trace-index.mjs --out <dir>'); process.exit(2); }
const out = writeIndex(path.resolve(a[i + 1]));
console.log(`${path.join(a[i + 1], 'data/trace/index.json')}: ${out.count} files, ${out.lines} lines`);
