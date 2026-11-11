#!/usr/bin/env node
// incidents/<id>/data/flights/index.json: every flights file with its sha256 and what it covers (incident.flights@, WS-214).
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, NOT_WARNING, OPENSKY_CITE, OPENMETEO_CITE, writeJSON, sha256, iso } from './flights-common.mjs'
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : []
const files = walk(DATA).filter(f => f.endsWith('.json') && path.basename(f) !== 'index.json').sort()
const list = files.map(f => {
  const b = fs.readFileSync(f); const j = JSON.parse(b); const rel = path.relative(DATA, f)
  let kind, covers
  if (rel === 'crosswind.json') { kind = 'crosswind'; covers = { from: j.window.from, to: j.window.to, airports: j.airports.map(a => a.icao) } }
  else if (rel.startsWith('wind/')) { kind = 'wind-field'; covers = { area: j.area, from: j.times[0], to: j.times.at(-1), hours: j.times.length, points: j.grid.lat.length * j.grid.lon.length, forecast_from: j.forecast_from } }
  else if (rel.startsWith('snapshots/')) { const t = j.snapshots.map(s => s.time).filter(Boolean); kind = 'aircraft-snapshots'; covers = { from: t[0] || null, to: t.at(-1) || null, snapshots: j.snapshots.length, ok: j.snapshots.filter(s => s.request.status === 200).length, airline_positions: j.snapshots.reduce((n, s) => n + s.aircraft.length, 0) } }
  else if (rel.startsWith('summaries/')) { kind = 'model-summary'; covers = { hour: j.hour, passed: j.check?.passed ?? null } }
  else kind = 'other'
  return { path: `${DATA}/${rel}`, api: `api/v1/2026-11-10-storm-charles/flights/${rel}`, kind, bytes: b.length, sha256: sha256(b), updated: j.updated || null, covers }
})
writeJSON(path.join(DATA, 'index.json'), { by: BY, updated: iso(Date.now()), about: 'Every flights file: what it covers, its size and sha256. Replay: crosswind.json (the airports\' wind on each runway, hour by hour, with departures), wind/<area>-<date>.json (the wind field), snapshots/<date>/<HH>.json (airline aircraft every 10 or 20 minutes from 11 November 22:00 UTC). Read README.md beside it for the shapes.', not_a_warning_service: NOT_WARNING, attribution: [OPENSKY_CITE, OPENMETEO_CITE], readme: `${DATA}/README.md`, files: list })
console.log(`index: ${list.length} files`)
