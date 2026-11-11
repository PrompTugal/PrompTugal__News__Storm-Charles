#!/usr/bin/env node
// entities-check: what incident.entities@ runs before every release, in one chain with the gate and release.sh:
//   node tools/entities-check.mjs && node admin/build/validate.mjs && AGENT=... admin/tools/release.sh
// 1. every script under app/lens/ and every tools/entities-*.mjs parses (a script that does not parse does not run at all);
// 2. the tracked nodes are what the data gives now (tools/entities-make.mjs --check).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { ROOT } from './entities-lib.mjs'
const files = [...fs.readdirSync(path.join(ROOT, 'app/lens')).filter(f => f.endsWith('.js')).map(f => 'app/lens/' + f), ...fs.readdirSync(path.join(ROOT, 'tools')).filter(f => /^entities-.*\.mjs$/.test(f)).map(f => 'tools/' + f)]
let bad = 0
for (const f of files) try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }) } catch (e) { bad++; console.log(`FAIL ${f}: ${String(e.stderr || e.message).split('\n').slice(0, 5).join(' | ')}`) }
try { execFileSync(process.execPath, [path.join(ROOT, 'tools/entities-make.mjs'), '--check'], { stdio: 'pipe' }) } catch (e) { bad++; console.log('FAIL the tracked nodes are stale: run node tools/entities-make.mjs and commit') }
console.log(bad ? `entities-check: RED, ${bad} problem(s)` : `entities-check: OK, ${files.length} scripts parse, the nodes are current`)
process.exit(bad ? 1 : 0)
