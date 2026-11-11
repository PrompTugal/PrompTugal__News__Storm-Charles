#!/usr/bin/env node
// One OpenSky snapshot of airline aircraft in a small box (incident.flights@web-summit.dinis, 11 November 2026, WS-214).
//   node tools/flights-poll.mjs --area lisbon|funchal [--root <dir>]
// Appends to <root>/incidents/<id>/data/flights/snapshots/<date>/<HH>.json (root defaults to this repository; the
// background poller writes to a staging folder that is published hourly). Anonymous /states/all, one credit per call
// (a box under 25 square degrees). Airline flights only: callsign = an airline's ICAO code + a flight number
// (flights-common.mjs). Every other aircraft is dropped: never kept, only counted as one number. No ICAO24 address is written.
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, NOT_WARNING, OPENSKY_CITE, AIRLINES, airlineOf, fetchProv, writeJSON, iso } from './flights-common.mjs'

export const AREAS = {
  lisbon: { name: 'Lisbon area (around LPPT, Humberto Delgado)', lamin: 38.3, lamax: 39.2, lomin: -9.8, lomax: -8.6 },
  funchal: { name: 'Madeira (around LPMA, Funchal)', lamin: 32.4, lamax: 33.2, lomin: -17.4, lomax: -16.2 }
}
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const area = arg('area'); const root = arg('root', '.')
if (!AREAS[area]) { console.error('--area lisbon|funchal'); process.exit(2) }
const b = AREAS[area]
const url = `https://opensky-network.org/api/states/all?lamin=${b.lamin}&lomin=${b.lomin}&lamax=${b.lamax}&lomax=${b.lomax}`
let r = await fetchProv(url, { kind: 'opensky-states' }); const failed = []
for (let i = 0; i < 2 && !r.ok; i++) { failed.push(r.prov); await new Promise(res => setTimeout(res, 20000)); r = await fetchProv(url, { kind: 'opensky-states' }) }
const { prov, body, ok } = r
let snap = { area, time: null, request: prov, aircraft: [], other_aircraft_dropped: null }
if (failed.length) snap.failed_attempts = failed
if (ok) {
  const j = JSON.parse(body.toString('utf8'))
  snap.time = j.time ? iso(j.time * 1000) : null
  let other = 0
  for (const s of j.states || []) {
    const cs = String(s[1] || '').trim(); const al = airlineOf(cs)
    if (!al) { other++; continue }
    // [icao24, callsign, origin_country, time_position, last_contact, lon, lat, baro_alt, on_ground, velocity, true_track, vertical_rate, sensors, geo_alt, squawk, spi, position_source]
    snap.aircraft.push({ callsign: cs, airline: al, lat: s[6], lon: s[5], baro_alt_m: s[7], geo_alt_m: s[13], on_ground: s[8], ground_speed_ms: s[9], track_deg: s[10], vertical_rate_ms: s[11], time_position: s[3] ? iso(s[3] * 1000) : null })
  }
  snap.aircraft.sort((x, y) => x.callsign.localeCompare(y.callsign))
  snap.other_aircraft_dropped = other
}
const t = snap.time || prov.read
const file = path.join(root, DATA, 'snapshots', t.slice(0, 10), t.slice(11, 13) + '.json')
let doc
try { doc = JSON.parse(fs.readFileSync(file, 'utf8')) } catch {
  doc = {
    by: BY, updated: null, label: 'fact',
    about: `Airline aircraft OpenSky Network's receivers saw in two small boxes (Lisbon, Madeira), ${t.slice(0, 10)} ${t.slice(11, 13)}:00 to :59 UTC, one snapshot every 10 minutes (Lisbon) or 20 minutes (Madeira). Airline flights only (an airline's ICAO code plus a flight number); every other aircraft is dropped and only counted. Fact: what OpenSky shows at the time read; positions can be up to a few seconds old (time_position). Not the storm's peak: anonymous OpenSky has no history, so these start on 11 November at about 22:15 UTC.`,
    not_a_warning_service: NOT_WARNING, attribution: OPENSKY_CITE,
    units: { baro_alt_m: 'metres, barometric', geo_alt_m: 'metres, geometric', ground_speed_ms: 'metres per second (x 1.944 = knots)', track_deg: 'degrees true, clockwise from north', vertical_rate_ms: 'metres per second, + climbing' },
    areas: Object.fromEntries(Object.entries(AREAS).map(([k, v]) => [k, v])),
    airlines: {}, snapshots: []
  }
}
doc.snapshots.push(snap)
doc.snapshots.sort((x, y) => (x.time || x.request.read).localeCompare(y.time || y.request.read))
for (const a of snap.aircraft) doc.airlines[a.airline] = AIRLINES[a.airline]
doc.updated = iso(Date.now())
writeJSON(file, doc)
console.log(`${area} ${prov.status} ${snap.time} airline ${snap.aircraft.length} other ${snap.other_aircraft_dropped} -> ${file}${prov.rate_limit_remaining != null ? ' remaining ' + prov.rate_limit_remaining : ''}`)
