#!/usr/bin/env node
// One poll of aircraft around Lisbon or Madeira from adsb.lol (incident.flights@web-summit.dinis, WS-214).
//   node tools/flights-poll.mjs --area lisbon|funchal [--root <dir>] [--legacy]
// Writes, under <root>/incidents/<id>/data/flights/:
//   frames/<area>/<date>/<HH>.json   every poll, the whole area (Lisbon 250 nm, Madeira 150 nm), compact rows: one array per
//                                    aircraft under a header of fields (Dinis via incident.conductor@, 11 November ~23:38 UTC:
//                                    more planes, planes that move). A part <HH>-2.json etc. if the hour's file would pass 240 KB.
//   snapshots/<date>/<HH>.json       with --legacy (the poller passes it once per 10 or 20 minutes): the earlier shape, inside the
//                                    earlier radius (Lisbon 40 nm, Madeira 30 nm), so incident.transport@'s near_airport counts and
//                                    the hourly summary read what they always read.
// No key: adsb.lol's public API, 500 requests a day per IP (its API page, read 23:40 UTC on 11 November; the window resets at
// 00:00 UTC); the poller uses 360. Runs unchanged on a scheduled runner: no secret, input from the network, output as files.
// Kept: airline flights (an airline's ICAO code + a flight number, flights-common.mjs) with callsign and type. Every other
// aircraft: only its ADS-B emitter category and its position, speed, track and altitude, with no callsign, no ICAO24 address,
// no registration and no type (nothing that could name a private owner). Never kept for anyone: the ICAO24 hex address, the
// registration. Aircraft whose owners asked to be withheld (adsb.lol's dbFlags: PIA or LADD) are dropped and only counted.
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, NOT_WARNING, ADSBLOL_CITE, AIRLINES, TRANSPORT_AIRLINES, airlineOf, fetchProv, writeJSON, iso, pretty } from './flights-common.mjs'

export const AREAS = {
  lisbon: { name: 'Lisbon and the Atlantic approaches: within 250 nautical miles (463 km) of 38.75 N, 9.20 W (LPPT is 8 km north of the centre)', lat: 38.75, lon: -9.2, dist_nm: 250, legacy_dist_nm: 40, legacy_name: 'Lisbon area: within 40 nautical miles (74 km) of 38.75 N, 9.20 W (LPPT is 8 km north of the centre)' },
  funchal: { name: 'Madeira and its approaches: within 150 nautical miles (278 km) of 32.75 N, 16.85 W (LPMA, Funchal)', lat: 32.75, lon: -16.85, dist_nm: 150, legacy_dist_nm: 30, legacy_name: 'Madeira: within 30 nautical miles (56 km) of 32.75 N, 16.85 W (LPMA, Funchal)' }
}
export const FIELDS = ['callsign', 'airline', 'type', 'lat', 'lon', 'alt_ft', 'on_ground', 'gs_kt', 'track_deg', 'vrate_fpm', 'pos_age_s']
export const OTHER_FIELDS = ['category', 'lat', 'lon', 'alt_ft', 'on_ground', 'gs_kt', 'track_deg']
const NEAR = { lisbon: { icao: 'LPPT', box: [38.524, -9.384, 39.024, -8.884] }, funchal: { icao: 'LPMA', box: [32.448, -17.024, 32.948, -16.524] } }
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const area = arg('area'); const root = arg('root', '.'); const legacy = process.argv.includes('--legacy')
if (!AREAS[area]) { console.error('--area lisbon|funchal'); process.exit(2) }
const b = AREAS[area]
const url = `https://api.adsb.lol/v2/lat/${b.lat}/lon/${b.lon}/dist/${b.dist_nm}`
let r = await fetchProv(url, { kind: 'adsblol' }); const failed = []
for (let i = 0; i < 2 && !r.ok && r.prov.status !== 429; i++) { failed.push(r.prov); await new Promise(res => setTimeout(res, 20000)); r = await fetchProv(url, { kind: 'adsblol' }) }
const { prov, body, ok } = r
const num = x => typeof x === 'number' ? x : null
const rnd = (x, d) => x == null ? null : Math.round(x * 10 ** d) / 10 ** d
const t0 = iso(Date.now())
let now = null; const air = []; const others = []; let withheld = 0
if (ok) {
  const j = JSON.parse(body.toString('utf8'))
  now = j.now ? iso(j.now) : null
  for (const a of j.ac || []) {
    if (typeof a.lat !== 'number') continue
    if ((a.dbFlags || 0) & 12) { withheld++; continue }   // 4 = PIA, 8 = LADD: the owner asked not to be shown
    const cs = String(a.flight || '').trim(); const al = airlineOf(cs); const ground = a.alt_baro === 'ground'
    const base = { lat: a.lat, lon: a.lon, baro_alt_ft: ground ? null : num(a.alt_baro), geo_alt_ft: num(a.alt_geom), on_ground: ground, ground_speed_kt: num(a.gs), track_deg: num(a.track), vertical_rate_fpm: num(a.baro_rate ?? a.geom_rate), position_age_s: num(a.seen_pos), dst: num(a.dst) }
    if (al) air.push({ callsign: cs, airline: al, type: a.t || null, ...base })
    else others.push({ category: a.category || null, ...base })
  }
  air.sort((x, y) => x.callsign.localeCompare(y.callsign))
}
const t = now || prov.read
const altOf = a => a.on_ground ? null : (a.baro_alt_ft ?? a.geo_alt_ft)
// 1. the frame
const frame = {
  t: now, request: prov, airline: air.length, other: others.length, withheld_by_owner_request: withheld,
  rows: air.map(a => [a.callsign, a.airline, a.type, rnd(a.lat, 4), rnd(a.lon, 4), altOf(a), a.on_ground, rnd(a.ground_speed_kt, 0), rnd(a.track_deg, 0), a.vertical_rate_fpm, rnd(a.position_age_s, 1)]),
  others: others.map(a => [a.category, rnd(a.lat, 3), rnd(a.lon, 3), altOf(a) == null ? null : Math.round(altOf(a) / 100) * 100, a.on_ground, rnd(a.ground_speed_kt, 0), rnd(a.track_deg, 0)])
}
if (failed.length) frame.failed_attempts = failed
const fdir = path.join(root, DATA, 'frames', area, t.slice(0, 10)); const hh = t.slice(11, 13)
const blank = () => ({
  by: BY, updated: null, label: 'fact', area, area_def: { name: b.name, lat: b.lat, lon: b.lon, dist_nm: b.dist_nm }, hour: `${t.slice(0, 13)}:00:00Z`,
  about: `Aircraft adsb.lol's community receivers saw in ${b.name}, ${t.slice(0, 10)} ${hh}:00 to :59 UTC, one frame per poll (Lisbon every 5 minutes, Madeira every 20). Fact: what adsb.lol shows at the time read (frames[].t; frames[].request holds the URL, status, bytes and sha256 of the raw response, which is in our vault). rows: airline flights (an airline's ICAO code plus a flight number), one array per aircraft in the order of fields. others: every other aircraft, one array in the order of other_fields: its ADS-B emitter category and position only, with no callsign, no ICAO24 address, no registration and no type, so nothing names a private owner; altitude rounded to 100 ft. Aircraft whose owners asked to be withheld (PIA or LADD in adsb.lol's data) are dropped and only counted. pos_age_s: how old each position was when read. Nothing between frames is measured: a line or a moving dot drawn between two frames is a drawing (hypothesis), not a position.`,
  not_a_warning_service: NOT_WARNING, attribution: ADSBLOL_CITE, licence: 'ODbL 1.0',
  fields: FIELDS, other_fields: OTHER_FIELDS,
  units: { alt_ft: 'feet, barometric (geometric when barometric is absent); null on the ground', gs_kt: 'knots', track_deg: 'degrees true, clockwise from north', vrate_fpm: 'feet per minute, + climbing', pos_age_s: 'seconds since the position was received', category: 'ADS-B emitter category (A1 light, A2 small, A3 large, A4 B757, A5 heavy, A7 rotorcraft, B1 glider, B6 drone, C1-C3 surface; null not sent)' },
  airlines: {}, frames: []
})
let file; let doc
for (let part = 1; ; part++) {
  file = path.join(fdir, hh + (part > 1 ? `-${part}` : '') + '.json')
  try { doc = JSON.parse(fs.readFileSync(file, 'utf8')) } catch { doc = blank() }
  const est = Buffer.byteLength(pretty(doc)) + Buffer.byteLength(pretty(frame)) + 2048
  if (est < 240 * 1024 || !doc.frames.length) break
}
doc.frames.push(frame); doc.frames.sort((x, y) => (x.t || x.request.read).localeCompare(y.t || y.request.read))
for (const a of air) doc.airlines[a.airline] = AIRLINES[a.airline]
doc.updated = iso(Date.now())
writeJSON(file, doc)
let msg = `${area} ${prov.status} ${now} airline ${air.length} other ${others.length} withheld ${withheld} -> ${path.relative(root, file)}`
// 2. the earlier snapshot shape, inside the earlier radius
if (legacy) {
  const inR = a => a.dst == null || a.dst <= b.legacy_dist_nm
  const snap = { area, source: 'adsb.lol', time: now, request: prov, aircraft: [], other_aircraft_dropped: null }
  if (failed.length) snap.failed_attempts = failed
  if (ok) {
    snap.aircraft = air.filter(inR).map(({ dst, ...a }) => a)
    snap.other_aircraft_dropped = others.filter(inR).length + withheld
    const ap = NEAR[area]; const nb = snap.aircraft.filter(a => a.lat >= ap.box[0] && a.lon >= ap.box[1] && a.lat <= ap.box[2] && a.lon <= ap.box[3])
    snap.near_airport = { [ap.icao]: { box: ap.box, box_order: 'lamin, lomin, lamax, lomax', on_ground: nb.filter(a => a.on_ground).length, airborne_below_3000m: nb.filter(a => !a.on_ground && a.baro_alt_ft != null && a.baro_alt_ft < 9843).length, read: prov.read } }
    const tl = nb.filter(a => TRANSPORT_AIRLINES[a.airline])
    snap.near_airport[ap.icao].transport_list = { on_ground: tl.filter(a => a.on_ground).length, airborne_below_3000m: tl.filter(a => !a.on_ground && a.baro_alt_ft != null && a.baro_alt_ft < 9843).length, note: 'the same, with incident.transport@\'s airline list exactly' }
  }
  const sfile = path.join(root, DATA, 'snapshots', t.slice(0, 10), hh + '.json')
  let sdoc
  try { sdoc = JSON.parse(fs.readFileSync(sfile, 'utf8')) } catch {
    sdoc = {
      by: BY, updated: null, label: 'fact',
      about: `Airline aircraft adsb.lol's community receivers saw around Lisbon (40 nm) and Madeira (30 nm), ${t.slice(0, 10)} ${hh}:00 to :59 UTC, one snapshot every 10 minutes for Lisbon and every 20 for Madeira. Airline flights only (an airline's ICAO code plus a flight number); every other aircraft is dropped and only counted. Fact: what adsb.lol shows at the time read; position_age_s says how old each position is. The wider areas, every 5 minutes, with the other aircraft as anonymous positions: frames/<area>/<date>/<HH>.json. Not the storm's peak: these start on 11 November at about 22:25 UTC (adsb.lol's daily history archive for 11 November is not out yet).`,
      not_a_warning_service: NOT_WARNING, attribution: ADSBLOL_CITE, licence: 'ODbL 1.0',
      units: { baro_alt_ft: 'feet, barometric (null on the ground)', geo_alt_ft: 'feet, geometric', ground_speed_kt: 'knots', track_deg: 'degrees true, clockwise from north', vertical_rate_fpm: 'feet per minute, + climbing', position_age_s: 'seconds since the position was received' },
      areas: Object.fromEntries(Object.entries(AREAS).map(([k, v]) => [k, { name: v.legacy_name, lat: v.lat, lon: v.lon, dist_nm: v.legacy_dist_nm }])), airlines: {}, snapshots: []
    }
  }
  sdoc.snapshots.push(snap)
  sdoc.snapshots.sort((x, y) => (x.time || x.request.read).localeCompare(y.time || y.request.read))
  for (const a of snap.aircraft) sdoc.airlines[a.airline] = AIRLINES[a.airline]
  sdoc.updated = iso(Date.now())
  writeJSON(sfile, sdoc)
  msg += ` | legacy ${snap.aircraft.length} in ${b.legacy_dist_nm} nm`
}
console.log(msg + (prov.rate_limit_remaining != null ? ' remaining ' + prov.rate_limit_remaining : ''))
