#!/usr/bin/env node
// One snapshot of airline aircraft around Lisbon or Funchal from adsb.lol (incident.flights@web-summit.dinis, WS-214).
//   node tools/flights-poll.mjs --area lisbon|funchal [--root <dir>]
// Appends to <root>/incidents/<id>/data/flights/snapshots/<date>/<HH>.json. No key: adsb.lol's public API (500 requests a day
// per IP; we use 288). Runs unchanged on a scheduled runner: no secret, input from the network, output as files.
// Source changed from OpenSky at 22:24 UTC on 11 November: OpenSky's terms (as read at 22:19) ask that aircraft identifiers be
// de-identified in publications and forbid passing the data on; adsb.lol's data is ODbL, which allows it with attribution.
// Airline flights only: callsign = an airline's ICAO code + a flight number (flights-common.mjs). Every other aircraft is
// dropped: never kept, only counted as one number. Never kept: the ICAO24 hex address, the registration.
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, NOT_WARNING, ADSBLOL_CITE, AIRLINES, TRANSPORT_AIRLINES, airlineOf, fetchProv, writeJSON, iso } from './flights-common.mjs'

export const AREAS = {
  lisbon: { name: 'Lisbon area: within 40 nautical miles (74 km) of 38.75 N, 9.20 W (LPPT is 8 km north of the centre)', lat: 38.75, lon: -9.2, dist_nm: 40 },
  funchal: { name: 'Madeira: within 30 nautical miles (56 km) of 32.75 N, 16.85 W (LPMA, Funchal)', lat: 32.75, lon: -16.85, dist_nm: 30 }
}
const NEAR = { lisbon: { icao: 'LPPT', box: [38.524, -9.384, 39.024, -8.884] }, funchal: { icao: 'LPMA', box: [32.448, -17.024, 32.948, -16.524] } }
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const area = arg('area'); const root = arg('root', '.')
if (!AREAS[area]) { console.error('--area lisbon|funchal'); process.exit(2) }
const b = AREAS[area]
const url = `https://api.adsb.lol/v2/lat/${b.lat}/lon/${b.lon}/dist/${b.dist_nm}`
let r = await fetchProv(url, { kind: 'adsblol' }); const failed = []
for (let i = 0; i < 2 && !r.ok && r.prov.status !== 429; i++) { failed.push(r.prov); await new Promise(res => setTimeout(res, 20000)); r = await fetchProv(url, { kind: 'adsblol' }) }
const { prov, body, ok } = r
const snap = { area, source: 'adsb.lol', time: null, request: prov, aircraft: [], other_aircraft_dropped: null }
if (failed.length) snap.failed_attempts = failed
const num = x => typeof x === 'number' ? x : null
if (ok) {
  const j = JSON.parse(body.toString('utf8'))
  snap.time = j.now ? iso(j.now) : null
  let other = 0
  for (const a of j.ac || []) {
    const cs = String(a.flight || '').trim(); const al = airlineOf(cs)
    if (!al || typeof a.lat !== 'number') { other++; continue }
    const ground = a.alt_baro === 'ground'
    snap.aircraft.push({ callsign: cs, airline: al, type: a.t || null, lat: a.lat, lon: a.lon, baro_alt_ft: ground ? null : num(a.alt_baro), geo_alt_ft: num(a.alt_geom), on_ground: ground, ground_speed_kt: num(a.gs), track_deg: num(a.track), vertical_rate_fpm: num(a.baro_rate ?? a.geom_rate), position_age_s: num(a.seen_pos) })
  }
  snap.aircraft.sort((x, y) => x.callsign.localeCompare(y.callsign))
  snap.other_aircraft_dropped = other
  // incident.transport@'s count in its own box: airline aircraft on the ground or airborne below 3,000 m (9,843 ft)
  const ap = NEAR[area]; const nb = snap.aircraft.filter(a => a.lat >= ap.box[0] && a.lon >= ap.box[1] && a.lat <= ap.box[2] && a.lon <= ap.box[3])
  snap.near_airport = { [ap.icao]: { box: ap.box, box_order: 'lamin, lomin, lamax, lomax', on_ground: nb.filter(a => a.on_ground).length, airborne_below_3000m: nb.filter(a => !a.on_ground && a.baro_alt_ft != null && a.baro_alt_ft < 9843).length, read: prov.read } }
  const tl = nb.filter(a => TRANSPORT_AIRLINES[a.airline])
  snap.near_airport[ap.icao].transport_list = { on_ground: tl.filter(a => a.on_ground).length, airborne_below_3000m: tl.filter(a => !a.on_ground && a.baro_alt_ft != null && a.baro_alt_ft < 9843).length, note: 'the same, with incident.transport@\'s airline list exactly' }
}
const t = snap.time || prov.read
const file = path.join(root, DATA, 'snapshots', t.slice(0, 10), t.slice(11, 13) + '.json')
let doc
try { doc = JSON.parse(fs.readFileSync(file, 'utf8')) } catch {
  doc = {
    by: BY, updated: null, label: 'fact',
    about: `Airline aircraft adsb.lol's community receivers saw around Lisbon and Madeira, ${t.slice(0, 10)} ${t.slice(11, 13)}:00 to :59 UTC, one snapshot every 10 minutes for each. Airline flights only (an airline's ICAO code plus a flight number); every other aircraft is dropped and only counted. Fact: what adsb.lol shows at the time read; position_age_s says how old each position is. Not the storm's peak: these start on 11 November at about 22:25 UTC (adsb.lol's daily history archive for 11 November is not out yet).`,
    not_a_warning_service: NOT_WARNING, attribution: ADSBLOL_CITE, licence: 'ODbL 1.0',
    units: { baro_alt_ft: 'feet, barometric (null on the ground)', geo_alt_ft: 'feet, geometric', ground_speed_kt: 'knots', track_deg: 'degrees true, clockwise from north', vertical_rate_fpm: 'feet per minute, + climbing', position_age_s: 'seconds since the position was received' },
    areas: AREAS, airlines: {}, snapshots: []
  }
}
doc.snapshots.push(snap)
doc.snapshots.sort((x, y) => (x.time || x.request.read).localeCompare(y.time || y.request.read))
for (const a of snap.aircraft) doc.airlines[a.airline] = AIRLINES[a.airline]
doc.updated = iso(Date.now())
writeJSON(file, doc)
console.log(`${area} ${prov.status} ${snap.time} airline ${snap.aircraft.length} other ${snap.other_aircraft_dropped} -> ${file}${prov.rate_limit_remaining != null ? ' remaining ' + prov.rate_limit_remaining : ''}`)
