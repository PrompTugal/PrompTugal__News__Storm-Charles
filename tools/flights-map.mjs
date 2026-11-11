#!/usr/bin/env node
// The map's files, in the shapes incident.designer@ asked for (design/round-65.md), made from our own data files only
// (incident.flights@web-summit.dinis, 11 November 2026, WS-214). No network.
//   node tools/flights-map.mjs --out <dir>      (a build generator, 'after': admin/build/generators.json)
// Writes only under <dir>/incidents/<id>/data/flights/ (served there); reads the tracked data files; never a tracked file.
// -> map/snapshots/<date>/<HHMM>-<area>.json (one per snapshot or frame that was read; a frame of the wider area replaces the
//    snapshot of the same poll), tracks/<area>/<date>/<HH>.json (each airline flight's measured points in the hour),, map/wind/<area>/<date>/<HH>.json
//    (one per hour of the wind field), runways.json, movements.json. index.json (flights-index.mjs) lists them for the app.
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, INCIDENT, OPENSKY_CITE, ADSBLOL_CITE, OPENMETEO_CITE, NOT_WARNING, iso } from './flights-common.mjs'
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const root = arg('root', '.'); const D = path.join(root, DATA)
const OUT = arg('out', null); if (!OUT) { console.error('--out <dir>'); process.exit(2) }
const O = path.join(OUT, DATA)
const now = iso(Date.now())
const walk = d => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : []
const write = (rel, obj) => { const f = path.join(O, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(obj)); return 1 }
const r1 = x => x == null ? null : Math.round(x)
let n = { snapshots: 0, wind: 0 }

// Snapshots
for (const f of walk(path.join(D, 'snapshots')).filter(f => f.endsWith('.json'))) {
  const h = JSON.parse(fs.readFileSync(f, 'utf8'))
  for (const s of h.snapshots) {
    if (!s.time) continue
    const rel = `map/snapshots/${s.time.slice(0, 10)}/${s.time.slice(11, 13)}${s.time.slice(14, 16)}-${s.area}.json`
    n.snapshots += write(rel, {
      by: BY, updated: h.updated, t: s.time, area: s.area, label: 'fact',
      source: s.request.url, read_utc: s.request.read, licence: ADSBLOL_CITE,
      method: `One adsb.lol snapshot, airline callsigns only (every other aircraft dropped: ${s.other_aircraft_dropped} this time). id is the callsign (never the ICAO24 address or a registration). alt_ft: barometric altitude, geometric when absent, null on the ground. Made from ${path.relative(root, f)}, which holds the request's status, bytes and sha256.`,
      not_a_warning_service: NOT_WARNING,
      aircraft: s.aircraft.map(a => ({ id: a.callsign, callsign: a.callsign, airline: a.airline, type: a.type, lat: a.lat, lon: a.lon, track_deg: a.track_deg == null ? null : Math.round(a.track_deg), alt_ft: a.on_ground ? null : (a.baro_alt_ft ?? a.geo_alt_ft), gs_kt: a.ground_speed_kt == null ? null : Math.round(a.ground_speed_kt), vrate_fpm: a.vertical_rate_fpm, on_ground: a.on_ground, position_age_s: a.position_age_s }))
    })
  }
}
// Frames (the wider areas, every 5 or 20 minutes): one map snapshot per frame, and the hour's tracks
const PHASE_RULE = 'on ground: adsb.lol reports it on the ground; climbing: vertical rate above +300 ft/min; descending: below -300 ft/min; cruising: level within 300 ft/min at or above 10,000 ft; level: the same below 10,000 ft; unknown: no vertical rate. Arithmetic on the reported vertical rate, not a statement of what the crew intends.'
const phaseOf = (g, alt, vr) => g ? 'on ground' : vr == null ? 'unknown' : vr > 300 ? 'climbing' : vr < -300 ? 'descending' : (alt != null && alt >= 10000) ? 'cruising' : 'level'
const tracks = {}
for (const f of walk(path.join(D, 'frames')).filter(f => f.endsWith('.json')).sort()) {
  const h = JSON.parse(fs.readFileSync(f, 'utf8')); const F = h.fields; const OF = h.other_fields
  const obj = (row, keys) => Object.fromEntries(keys.map((k, i) => [k, row[i]]))
  for (const fr of h.frames) {
    if (!fr.t) continue
    const ac = fr.rows.map(r => obj(r, F)); const ot = fr.others.map(r => obj(r, OF))
    n.snapshots += write(`map/snapshots/${fr.t.slice(0, 10)}/${fr.t.slice(11, 13)}${fr.t.slice(14, 16)}-${h.area}.json`, {
      by: BY, updated: h.updated, t: fr.t, area: h.area, area_def: h.area_def, cadence_min: h.cadence_min ?? null, label: 'fact', measured: true,
      source: fr.request.url, read_utc: fr.request.read, licence: ADSBLOL_CITE,
      method: `One adsb.lol frame of ${h.area_def.name}. aircraft: airline flights; id is the callsign (never the ICAO24 address or a registration). others: every other aircraft as an anonymous position (ADS-B emitter category only: no callsign, address, registration or type), ${fr.other} this time; ${fr.withheld_by_owner_request} withheld at their owners' request and not shown. Every position here was measured (measured: true); anything drawn between two frames is a drawing, a hypothesis. Made from ${path.relative(root, f)}, which holds the request's status, bytes and sha256.`,
      not_a_warning_service: NOT_WARNING,
      counts: { airline: fr.airline, other: fr.other, withheld_by_owner_request: fr.withheld_by_owner_request },
      aircraft: ac.map(a => ({ id: a.callsign, callsign: a.callsign, airline: a.airline, type: a.type, lat: a.lat, lon: a.lon, track_deg: a.track_deg, alt_ft: a.alt_ft, gs_kt: a.gs_kt, vrate_fpm: a.vrate_fpm, on_ground: a.on_ground, position_age_s: a.pos_age_s, phase: phaseOf(a.on_ground, a.alt_ft, a.vrate_fpm) })),
      others: ot
    })
    const key = `${h.area}|${fr.t.slice(0, 13)}`
    const T = tracks[key] ||= { area: h.area, area_def: h.area_def, cadence_min: h.cadence_min ?? null, hour: fr.t.slice(0, 13) + ':00:00Z', airlines: {}, frames: 0, from: f, ac: {} }
    T.frames++; Object.assign(T.airlines, h.airlines)
    for (const a of ac) (T.ac[a.callsign] ||= { callsign: a.callsign, airline: a.airline, type: a.type, points: [] }).points.push([fr.t, a.lat, a.lon, a.alt_ft, a.gs_kt, a.track_deg, a.vrate_fpm, a.on_ground])
  }
}
let nTracks = 0
for (const T of Object.values(tracks)) {
  const list = Object.values(T.ac).map(a => {
    a.points.sort((x, y) => x[0].localeCompare(y[0])); const L = a.points.at(-1)
    return { callsign: a.callsign, airline: a.airline, airline_name: T.airlines[a.airline] || null, type: a.type, first_seen: a.points[0][0], last_seen: L[0], points_seen: a.points.length, now: { t: L[0], lat: L[1], lon: L[2], alt_ft: L[3], gs_kt: L[4], track_deg: L[5], vrate_fpm: L[6], on_ground: L[7], phase: phaseOf(L[7], L[3], L[6]) }, points: a.points }
  }).sort((x, y) => x.callsign.localeCompare(y.callsign))
  nTracks += write(`tracks/${T.area}/${T.hour.slice(0, 10)}/${T.hour.slice(11, 13)}.json`, {
    by: BY, updated: now, label: 'fact', area: T.area, area_def: T.area_def, cadence_min: T.cadence_min, hour: T.hour, frames: T.frames, licence: ADSBLOL_CITE,
    method: `Each airline flight adsb.lol showed in ${T.area_def.name} during the hour, with every point measured in our frames (${path.relative(root, T.from).replace(/-\d+\.json$/, '.json')}): one point per frame it was in, nothing in between. A line drawn between two points is a drawing (hypothesis), not a path flown. now: the last point in the hour. phase: ${PHASE_RULE}`,
    not_a_warning_service: NOT_WARNING,
    point_fields: ['t', 'lat', 'lon', 'alt_ft', 'gs_kt', 'track_deg', 'vrate_fpm', 'on_ground'],
    phase_rule: PHASE_RULE,
    aircraft: list
  })
}
console.log(`map: ${nTracks} track hours`)
// Wind hours
for (const f of walk(path.join(D, 'wind')).filter(f => /\/wind\/[a-z]+-\d{4}-\d\d-\d\d\.json$/.test(f))) {
  const w = JSON.parse(fs.readFileSync(f, 'utf8')); const { lat, lon } = w.grid
  w.times.forEach((t, i) => {
    const L = w.levels['10m']; const U = w.levels['850hPa']
    n.wind += write(`map/wind/${w.area}/${t.slice(0, 10)}/${t.slice(11, 13)}.json`, {
      by: BY, updated: w.updated, t, area: w.area, label: 'evidence', forecast: !!(w.forecast_from && t >= w.forecast_from),
      model: 'Open-Meteo forecast API, best match for the point (a model\'s analysis and short-range forecast, not observations)',
      source: w.request.url.replace(/latitude=[^&]+&longitude=[^&]+/, 'latitude=…&longitude=…'), read_utc: w.request.read, licence: OPENMETEO_CITE,
      method: `One hour of ${path.relative(root, f)} (which holds the full request URL, its status, bytes and sha256), one entry per lattice point. dir_from_deg: where the wind blows FROM (an arrow points to dir_from_deg + 180). upper: 850 hPa, about 1,500 m.`,
      points: lat.flatMap((la, a) => lon.map((lo, b) => { const k = a * lon.length + b; return { lat: la, lon: lo, dir_from_deg: L.dir_deg[i][k], speed_kt: L.speed_kt[i][k], gust_kt: L.gust_kt[i][k], upper_dir_from_deg: U.dir_deg[i][k], upper_speed_kt: U.speed_kt[i][k] } }))
    })
  })
}
// Runways and movements, from crosswind.json
const cw = JSON.parse(fs.readFileSync(path.join(D, 'crosswind.json'), 'utf8'))
const rwSrc = cw.sources.find(s => /OurAirports/.test(s.what)) || {}
write('runways.json', {
  by: BY, updated: now, label: 'fact', source: rwSrc.url || 'https://ourairports.com/data/', read_utc: rwSrc.read || null, sha256: rwSrc.sha256 || null, licence: 'OurAirports data, public domain',
  method: 'Open runways of LPPT and LPMA from OurAirports\' runways.csv: each end\'s threshold position and true heading. LPPT 17/35 is closed and left out.',
  runways: cw.airports.flatMap(a => a.runways.map(r => ({ airport: a.icao, id: r.runway, length_m: r.length_m, ends: r.ends.map(e => ({ name: e.end, lat: e.lat, lon: e.lon, heading_deg: e.heading_true, elevation_ft: e.elevation_ft })) })))
})
const mv = a => a.hours.map(H => ({ t: H.hour, departures: H.departures_seen, cancellations: null }))
const ana = Object.fromEntries(cw.airports.filter(a => a.ana).map(a => [a.icao, a.ana]))
write('movements.json', {
  by: BY, updated: now, label: 'fact',
  source: [cw.airports[0].departures.source, cw.airports[1].departures.source, ana.LPPT?.link].filter(Boolean).join(' ; '), read_utc: cw.airports[0].departures.read,
  method: 'departures: airline departures OpenSky\'s receivers saw leaving the airport in that hour (UTC), as incident.transport@\'s flights.json counts them; a floor, null where its readings did not reach. cancellations: no source gives them by hour, so null; ANA\'s figures for the day up to the time it states are in ana_day.',
  attribution: OPENSKY_CITE, not_a_warning_service: NOT_WARNING,
  hours: mv(cw.airports.find(a => a.icao === 'LPPT')),
  hours_by_airport: Object.fromEntries(cw.airports.map(a => [a.icao, mv(a)])),
  ana_day: ana,
  sources: [{ what: 'departures per hour', url: cw.airports[0].departures.source, via: `incidents/${INCIDENT}/data/transport/flights.json` }, { what: 'cancellations for the day (ANA)', url: ana.LPPT?.link || null }]
})
console.log(`map: ${n.snapshots} snapshot files and ${n.wind} wind hours written; runways.json, movements.json`)
