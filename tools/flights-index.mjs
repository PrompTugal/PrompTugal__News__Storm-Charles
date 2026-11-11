#!/usr/bin/env node
// incidents/<id>/data/flights/index.json: every flights file with its sha256 and what it covers (incident.flights@, WS-214).
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, NOT_WARNING, ADSBLOL_CITE, OPENSKY_CITE, OPENMETEO_CITE, writeJSON, sha256, iso } from './flights-common.mjs'
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : []
const files = walk(DATA).filter(f => f.endsWith('.json') && path.basename(f) !== 'index.json').sort()
const list = files.map(f => {
  const b = fs.readFileSync(f); const j = JSON.parse(b); const rel = path.relative(DATA, f)
  let kind, covers
  if (rel === 'crosswind.json') { kind = 'crosswind'; covers = { from: j.window.from, to: j.window.to, airports: j.airports.map(a => a.icao) } }
  else if (rel.startsWith('wind/')) { kind = 'wind-field'; covers = { area: j.area, from: j.times[0], to: j.times.at(-1), hours: j.times.length, points: j.grid.lat.length * j.grid.lon.length, forecast_from: j.forecast_from } }
  else if (rel.startsWith('snapshots/')) { const t = j.snapshots.map(s => s.time).filter(Boolean); kind = 'aircraft-snapshots'; covers = { from: t[0] || null, to: t.at(-1) || null, snapshots: j.snapshots.length, ok: j.snapshots.filter(s => s.request.status === 200).length, airline_positions: j.snapshots.reduce((n, s) => n + s.aircraft.length, 0) } }
  else if (rel.startsWith('frames/')) { const t = j.frames.map(f => f.t).filter(Boolean); kind = 'aircraft-frames'; covers = { area: j.area, dist_nm: j.area_def.dist_nm, from: t[0] || null, to: t.at(-1) || null, frames: j.frames.length, airline_positions: j.frames.reduce((n, f) => n + f.rows.length, 0), other_positions: j.frames.reduce((n, f) => n + f.others.length, 0) } }
  else if (rel.startsWith('summaries/')) { kind = 'model-summary'; covers = { hour: j.hour, passed: j.check?.passed ?? null } }
  else kind = 'other'
  return { path: `${DATA}/${rel}`, api: `api/v1/2026-11-10-storm-charles/flights/${rel}`, kind, bytes: b.length, sha256: sha256(b), updated: j.updated || null, covers }
})
// The map app's keys (incident.designer@, design/round-65.md). The map/ files, runways.json and movements.json are written
// by the build (tools/flights-map.mjs, a generator) from the files above, so they are served but not in git; paths are
// relative to this index.
const snapBy = {}; const windHours = []; const trackBy = {}
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8')); const rel = path.relative(DATA, f)
  const mfile = (t, a) => `map/snapshots/${t.slice(0, 10)}/${t.slice(11, 13)}${t.slice(14, 16)}-${a}.json`
  if (rel.startsWith('snapshots/')) for (const s of j.snapshots) if (s.time) snapBy[mfile(s.time, s.area)] ||= { t: s.time, area: s.area, aircraft: s.aircraft.length, file: mfile(s.time, s.area), dist_nm: j.areas?.[s.area]?.dist_nm ?? null, measured: true }
  if (rel.startsWith('frames/')) for (const fr of j.frames) if (fr.t) {
    snapBy[mfile(fr.t, j.area)] = { t: fr.t, area: j.area, aircraft: fr.rows.length, others: fr.others.length, file: mfile(fr.t, j.area), dist_nm: j.area_def.dist_nm, measured: true }
    const k = `${j.area}|${fr.t.slice(0, 13)}`; const T = trackBy[k] ||= { hour: fr.t.slice(0, 13) + ':00:00Z', area: j.area, frames: 0, callsigns: new Set(), file: `tracks/${j.area}/${fr.t.slice(0, 10)}/${fr.t.slice(11, 13)}.json` }
    T.frames++; for (const r of fr.rows) T.callsigns.add(r[0])
  }
  if (/^wind\/[a-z]+-/.test(rel)) for (const t of j.times) windHours.push({ t, area: j.area, forecast: !!(j.forecast_from && t >= j.forecast_from), file: `map/wind/${j.area}/${t.slice(0, 10)}/${t.slice(11, 13)}.json` })
}
const snaps = Object.values(snapBy).sort((a, b) => a.t.localeCompare(b.t) || a.area.localeCompare(b.area))
const trackHours = Object.values(trackBy).map(({ callsigns, ...T }) => ({ ...T, aircraft: callsigns.size })).sort((a, b) => a.hour.localeCompare(b.hour) || a.area.localeCompare(b.area)); windHours.sort((a, b) => a.t.localeCompare(b.t) || a.area.localeCompare(b.area))
writeJSON(path.join(DATA, 'index.json'), {
  by: BY, updated: iso(Date.now()), label: 'fact', source: 'this folder', read_utc: iso(Date.now()), method: 'a walk of the folder: each tracked file\'s sha256, and the map files made from them',
  snapshots: snaps, tracks: trackHours, wind_hours: windHours, how: '../../../../flights/how.json', runways: 'runways.json', crosswind: 'crosswind.json', movements: 'movements.json',
  map_files_note: 'snapshots[].file, tracks[].file, wind_hours[].file, runways.json and movements.json are written by the build from the tracked files listed in files[] (tools/flights-map.mjs), so they are served beside this index but are not in git and not in api/v1.', about: 'Every flights file: what it covers, its size and sha256. Replay: crosswind.json (the airports\' wind on each runway, hour by hour, with departures), wind/<area>-<date>.json (the wind field), snapshots/<date>/<HH>.json (airline aircraft every 10 minutes within 40 nm of Lisbon and 30 nm of Madeira, from adsb.lol (ODbL), from 11 November 22:23 UTC), frames/<area>/<date>/<HH>.json (from 11 November about 23:45 UTC: Lisbon 250 nm every 5 minutes, Madeira 150 nm every 20, airline flights plus every other aircraft as an anonymous position; compact rows under a header of fields). Built beside it: map/snapshots/ (one per snapshot or frame) and tracks/<area>/<date>/<HH>.json (each airline flight\'s measured points in the hour, with first and last seen, altitude, speed, heading and phase now). Read README.md beside it for the shapes.', not_a_warning_service: NOT_WARNING, attribution: [ADSBLOL_CITE, OPENSKY_CITE, OPENMETEO_CITE], readme: `${DATA}/README.md`, files: list })
console.log(`index: ${list.length} files`)
