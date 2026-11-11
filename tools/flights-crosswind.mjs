#!/usr/bin/env node
// Wind x flights for the storm itself (incident.flights@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC).
//   node tools/flights-crosswind.mjs            -> incidents/<id>/data/flights/crosswind.json
// METAR wind at LPPT and LPMA from 10 November 18:00 UTC (incident.meteorologist@'s airport files, then the US NOAA
// Aviation Weather Center's public API for anything newer or missing), resolved onto each runway end (headings: OurAirports,
// public domain), joined per hour to the airline departures OpenSky saw (incident.transport@'s flights.json, read only)
// and ANA's own figures. Fact: the METAR and the counts. Hypothesis: which runway end the wind favours (ATC decides).
import fs from 'node:fs'
import path from 'node:path'
import { BY, DATA, INCIDENT, NOT_WARNING, OPENSKY_CITE, fetchProv, writeJSON, sha256, iso, RAW_DIR } from './flights-common.mjs'

const W = `incidents/${INCIDENT}/data`
const FROM = '2026-11-10T18:00:00Z'
const AIRPORTS = [
  { icao: 'LPPT', iata: 'LIS', name: 'Lisbon (Humberto Delgado)', met: `${W}/weather/airport.json` },
  { icao: 'LPMA', iata: 'FNC', name: 'Funchal (Madeira, Cristiano Ronaldo)', met: `${W}/weather/airport-madeira.json` }
]
const sources = []
const fileSrc = (p, what, read) => { const b = fs.readFileSync(p); sources.push({ path: p, what, sha256: sha256(b), bytes: b.length, read_utc: read || null }); return JSON.parse(b) }

// Runway headings (true) from OurAirports' runways.csv: fetched once (4 MB) and cached outside git with its provenance;
// FLIGHTS_REFRESH_RUNWAYS=1 fetches again.
const RWC = path.join(RAW_DIR, 'runways-cache.json')
let rwCache = null
try { if (!process.env.FLIGHTS_REFRESH_RUNWAYS) rwCache = JSON.parse(fs.readFileSync(RWC, 'utf8')) } catch {}
if (!rwCache) {
  const rw = await fetchProv('https://davidmegginson.github.io/ourairports-data/runways.csv', { kind: 'ourairports' })
  const runways = {}
  if (rw.ok) {
    const lines = rw.body.toString('utf8').split('\n'); const hdr = lines[0].replace(/"/g, '').split(',')
    for (const l of lines.slice(1)) {
      const c = l.replace(/"/g, '').split(','); const r = Object.fromEntries(hdr.map((h, i) => [h, c[i]]))
      if (!AIRPORTS.some(a => a.icao === r.airport_ident) || r.closed === '1') continue
      ;(runways[r.airport_ident] ||= []).push({ runway: `${r.le_ident}/${r.he_ident}`, length_m: Math.round(r.length_ft * 0.3048), ends: [{ end: r.le_ident, heading_true: Number(r.le_heading_degT), lat: Number(r.le_latitude_deg), lon: Number(r.le_longitude_deg), elevation_ft: Number(r.le_elevation_ft) }, { end: r.he_ident, heading_true: Number(r.he_heading_degT), lat: Number(r.he_latitude_deg), lon: Number(r.he_longitude_deg), elevation_ft: Number(r.he_elevation_ft) }] })
    }
    rwCache = { prov: rw.prov, runways }; fs.mkdirSync(RAW_DIR, { recursive: true }); fs.writeFileSync(RWC, JSON.stringify(rwCache))
  } else rwCache = { prov: rw.prov, runways }
}
sources.push({ what: 'runway headings, degrees true (OurAirports, public domain; read once, cached)', ...rwCache.prov })
const runways = rwCache.runways
// METARs: AWC for the newest (and any gap)
const awc = await fetchProv(`https://aviationweather.gov/api/data/metar?ids=${AIRPORTS.map(a => a.icao).join(',')}&hours=60&format=json`, { kind: 'awc-metar' })
sources.push({ what: 'METAR, IPMA\'s observations through the US NOAA Aviation Weather Center\'s public API (public domain)', ...awc.prov })
const awcRows = awc.ok ? JSON.parse(awc.body.toString('utf8')) : []
const flights = fileSrc(`${W}/transport/flights.json`, 'airline departures per hour (OpenSky) and ANA\'s figures, kept by incident.transport@', null)
sources.at(-1).read_utc = flights.updated

const r1 = x => x == null ? null : Math.round(x * 10) / 10
function comps (dir, kt, gust, rws) {
  if (typeof dir !== 'number' || kt == null) return null
  const out = {}
  for (const r of rws) for (const e of r.ends) {
    const a = (dir - e.heading_true) * Math.PI / 180
    out[e.end] = { headwind_kt: r1(kt * Math.cos(a)), crosswind_kt: r1(Math.abs(kt * Math.sin(a))), crosswind_from: Math.abs(kt * Math.sin(a)) < 0.5 ? null : (Math.sin(a) > 0 ? 'right' : 'left') }
    if (gust != null) { out[e.end].gust_headwind_kt = r1(gust * Math.cos(a)); out[e.end].gust_crosswind_kt = r1(Math.abs(gust * Math.sin(a))) }
  }
  return out
}
const out = { by: BY, updated: iso(Date.now()), label: 'fact', about: 'The wind the airports reported (METAR) during Storm Charles, from 10 November 18:00 UTC, resolved onto each runway end as headwind (negative: tailwind) and crosswind, joined per hour to the airline departures OpenSky\'s receivers saw and to ANA\'s own cancellation figures. Facts: the METAR (IPMA\'s observations) and the counts as their sources give them; the components are arithmetic on the METAR (wind speed x cos/sin of the angle between wind and runway, true degrees). Hypothesis, labelled where it appears: which runway end the wind favours (air traffic control chooses the runway, and pilots and airlines apply their own limits; we state none). Departures are a floor: what OpenSky saw, only for hours its rolling window covered.', not_a_warning_service: NOT_WARNING, attribution: [OPENSKY_CITE, 'METAR: IPMA, through the US NOAA Aviation Weather Center (aviationweather.gov), public domain.', 'Runways: OurAirports (ourairports.com/data), public domain.', 'Cancellations: ANA Aeroportos de Portugal, newsroom figures only, with the link.'], units: { wind: 'knots (1 kt = 1.852 km/h); direction: degrees true the wind blows from', components: 'knots; crosswind_from: the side of the aircraft the wind comes from, landing or taking off on that runway end' }, window: { from: FROM, to: null }, airports: [], sources }
for (const ap of AIRPORTS) {
  const met = fileSrc(ap.met, `METAR history kept by incident.meteorologist@ (${ap.icao})`, null); sources.at(-1).read_utc = met.read_utc
  const byTime = {}
  for (const m of met.metars) if (m.time_utc >= FROM.slice(0, 16)) byTime[m.time_utc] = { time: m.time_utc.replace(/Z$/, ':00Z'), raw: m.raw, wind_dir: m.wind_dir, wind_kt: m.wind_kt, gust_kt: m.gust_kt, from: 'meteorologist' }
  for (const a of awcRows) {
    if (a.icaoId !== ap.icao) continue
    const t = iso(a.obsTime * 1000); if (t < FROM) continue
    const k = t.slice(0, 16) + 'Z'
    if (!byTime[k]) byTime[k] = { time: t, raw: a.rawOb, wind_dir: a.wdir === 'VRB' ? 'VRB' : Number(a.wdir), wind_kt: a.wspd ?? null, gust_kt: a.wgst ?? null, from: 'awc' }
  }
  const rws = runways[ap.icao] || []
  const a = flights.airports.find(x => x.icao === ap.icao) || {}
  const dep = a.departures_today || {}
  const depDay = (dep.covered_from || '').slice(0, 10)
  const hours = {}
  for (const m of Object.values(byTime).sort((x, y) => x.time.localeCompare(y.time))) {
    const h = m.time.slice(0, 13) + ':00:00Z'
    const H = (hours[h] ||= { hour: h, departures_seen: null, metars: [] })
    m.runways = comps(m.wind_dir, m.wind_kt, m.gust_kt, rws)
    if (m.runways) {
      const best = Object.entries(m.runways).sort((x, y) => y[1].headwind_kt - x[1].headwind_kt)[0]
      m.favoured_end = { label: 'hypothesis', end: best[0], why: 'the end with the most headwind for this METAR; ATC chooses the runway' }
    }
    delete m.from; H.metars.push(m)
  }
  for (const H of Object.values(hours)) {
    if (H.hour.slice(0, 10) === depDay && Array.isArray(dep.by_hour_utc)) { const v = dep.by_hour_utc[Number(H.hour.slice(11, 13))]; H.departures_seen = v === undefined ? null : v }
    const g = H.metars.map(m => m.gust_kt ?? m.wind_kt).filter(x => x != null); H.max_gust_or_wind_kt = g.length ? Math.max(...g) : null
    const cw = H.metars.flatMap(m => m.runways ? Object.values(m.runways).map(c => c.gust_crosswind_kt ?? c.crosswind_kt) : []); H.max_crosswind_kt = cw.length ? Math.max(...cw) : null
  }
  const hs = Object.values(hours)
  out.window.to = [out.window.to, hs.at(-1)?.metars.at(-1)?.time].filter(Boolean).sort().at(-1)
  out.airports.push({
    icao: ap.icao, iata: ap.iata, name: ap.name, runways: rws,
    departures: { label: 'fact', what: dep.what || null, covered_from: dep.covered_from || null, total_in_window: dep.count ?? null, source: dep.source || null, read: dep.read || null, sha256: dep.sha256 || null, ...(dep.paused != null ? { paused: dep.paused } : {}), ...(dep.frozen_at ? { frozen_at: dep.frozen_at, frozen_note: 'incident.transport@ paused its OpenSky readings from 22:41 UTC on 11 November pending OpenSky\'s licence (transport/opensky-paused.json): counts after frozen_at are not read, so later hours are null, not zero' } : {}), note: 'departures_seen on each hour: OpenSky\'s count for that hour on the day transport\'s file covers; null where not covered (10 November, and the hours before the first reading)' },
    ana: a.ana ? { label: 'fact', ...a.ana, note: 'ANA\'s figures for the day up to the time it states, not per hour.' } : null,
    hours: hs
  })
}
// The map's form (incident.designer@, design/round-65.md): hours[] for LPPT, hours_by_airport for both; per hour the METAR
// with the strongest gust (or wind) in that hour.
const pick = H => H.metars.filter(m => m.runways).sort((a, b) => (b.gust_kt ?? b.wind_kt) - (a.gust_kt ?? a.wind_kt))[0]
const form = a => a.hours.map(H => { const m = pick(H); return { t: H.hour, metar_time: m ? m.time : null, wind_dir: m ? m.wind_dir : null, wind_kt: m ? m.wind_kt : null, gust_kt: m ? m.gust_kt : null, by_runway_end: m ? Object.fromEntries(Object.entries(m.runways).map(([e, c]) => [e, { cross_kt: c.crosswind_kt, head_kt: c.headwind_kt, gust_cross_kt: c.gust_crosswind_kt ?? null }])) : null } })
out.source = 'https://aviationweather.gov/api/data/metar (IPMA\'s METAR), with incident.meteorologist@\'s airport files; runways from OurAirports'
out.read_utc = awc.prov.read
out.method = 'For each METAR: headwind = wind x cos(wind direction - runway heading), crosswind = |wind x sin(...)|, true degrees; gust components the same with the gust. hours[] (LPPT) and hours_by_airport give, per hour, the METAR with the strongest gust or wind. Variable winds (VRB) have no components.'
out.hours = form(out.airports.find(a => a.icao === 'LPPT'))
out.hours_by_airport = Object.fromEntries(out.airports.map(a => [a.icao, form(a)]))
const file = path.join(DATA, 'crosswind.json'); const s = writeJSON(file, out)
console.log(`${file}: ${Buffer.byteLength(s)} bytes; ${out.airports.map(a => `${a.icao} ${a.hours.length} h`).join(', ')}; to ${out.window.to}`)
