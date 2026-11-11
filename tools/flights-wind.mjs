#!/usr/bin/env node
// The wind field over Lisbon and Madeira (incident.flights@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC).
//   node tools/flights-wind.mjs   -> incidents/<id>/data/flights/wind/<area>-<date>.json, one file per area per UTC day
// Open-Meteo (CC BY 4.0) hourly wind at 10 m (speed, direction, gusts) and at 850 hPa (speed, direction, about 1,500 m),
// on a 0.5-degree lattice (0.25 until 11 November 23:54 UTC, over a smaller box), 10 November 12:00 to 12 November 12:00 UTC. Model data, not observations; hours after the
// time read are Open-Meteo's forecast, marked, and replaced on the next run. Not ours and not a warning.
import path from 'node:path'
import { BY, DATA, NOT_WARNING, OPENMETEO_CITE, fetchProv, writeJSON, iso } from './flights-common.mjs'

const START = '2026-11-10T12:00'; const END = '2026-11-12T12:00'
const AREAS = {
  // the boxes around the aircraft areas (tools/flights-poll.mjs): Lisbon 250 nm of 38.75 N 9.20 W, Madeira 150 nm of 32.75 N 16.85 W
  // (incident.conductor@, 11 November 23:53 UTC: the arrows covered only the old small lattice). 0.5 degrees keeps a day under 256 KB.
  lisbon: { name: 'Lisbon area and the Atlantic approaches', lat: [34.5, 43], lon: [-14.5, -4] },
  madeira: { name: 'Madeira and its approaches', lat: [30, 35.5], lon: [-20, -13.5] },
  // finer fields for the maps' close views (incident.designer@, 23:58 UTC): the earlier 0.25-degree boxes
  'lisbon-close': { name: 'Lisbon area (close view)', lat: [37.5, 40], lon: [-10.5, -8], step: 0.25 },
  'madeira-close': { name: 'Madeira (close view)', lat: [32.5, 33.25], lon: [-17.5, -16.25], step: 0.25 }
}
const STEP_WIDE = 0.5
const VARS = ['wind_speed_10m', 'wind_direction_10m', 'wind_gusts_10m', 'wind_speed_850hPa', 'wind_direction_850hPa']
const range = ([a, b], STEP) => { const r = []; for (let x = a; x <= b + 1e-9; x += STEP) r.push(Math.round(x * 100) / 100); return r }
const written = []
for (const [key, A] of Object.entries(AREAS)) {
  const STEP = A.step || STEP_WIDE; const lats = range(A.lat, STEP); const lons = range(A.lon, STEP)
  const pts = lats.flatMap(la => lons.map(lo => [la, lo]))
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${pts.map(p => p[0]).join(',')}&longitude=${pts.map(p => p[1]).join(',')}&hourly=${VARS.join(',')}&wind_speed_unit=kn&timezone=GMT&start_hour=${START}&end_hour=${END}`
  let r = await fetchProv(url, { kind: 'open-meteo', timeoutMs: 60000 })
  if (!r.ok) { await new Promise(res => setTimeout(res, 15000)); r = await fetchProv(url, { kind: 'open-meteo', timeoutMs: 60000 }) }
  if (!r.ok) { console.error(`${key}: ${r.prov.status} ${r.prov.error || r.body.toString().slice(0, 200)}`); process.exitCode = 1; continue }
  let j = JSON.parse(r.body.toString('utf8')); if (!Array.isArray(j)) j = [j]
  const times = j[0].hourly.time.map(t => t + ':00Z')
  const readHour = r.prov.read.slice(0, 13) + ':00:00Z'
  const days = [...new Set(times.map(t => t.slice(0, 10)))]
  for (const day of days) {
    const idx = times.map((t, i) => [t, i]).filter(([t]) => t.startsWith(day)).map(([, i]) => i)
    const grab = v => idx.map(i => j.map(p => { const x = p.hourly[v][i]; return x == null ? null : Math.round(x) }))
    const doc = {
      by: BY, updated: iso(Date.now()), label: 'evidence',
      about: `Open-Meteo's hourly wind over the ${A.name} on ${day} (UTC), on a ${STEP}-degree lattice: at 10 m (speed, direction, gusts) and at 850 hPa (speed and direction, roughly 1,500 m up, where aircraft climb and descend). Evidence: a weather model's data as Open-Meteo serves it, not observations and not ours; for what was measured at the airports see crosswind.json (METAR). Hours from forecast_from on are Open-Meteo's forecast at the time read, replaced on the next run.`,
      not_a_warning_service: NOT_WARNING, attribution: OPENMETEO_CITE,
      area: key, grid: { lat: lats, lon: lons, step_deg: STEP, order: 'points row by row: for each lat (south to north), every lon (west to east); point k = lat[floor(k / lon.length)], lon[k % lon.length]', model_lat_lon: j.map(p => [Math.round(p.latitude * 1000) / 1000, Math.round(p.longitude * 1000) / 1000]) },
      units: { speed: 'knots', direction: 'degrees true the wind blows FROM (an arrow points to direction + 180)', gusts: 'knots, at 10 m' },
      times: idx.map(i => times[i]),
      forecast_from: idx.map(i => times[i]).find(t => t > readHour) || null,
      levels: {
        '10m': { speed_kt: grab('wind_speed_10m'), dir_deg: grab('wind_direction_10m'), gust_kt: grab('wind_gusts_10m') },
        '850hPa': { speed_kt: grab('wind_speed_850hPa'), dir_deg: grab('wind_direction_850hPa') }
      },
      layout: 'levels.<level>.<variable>[hour index into times][point index]',
      request: r.prov
    }
    const file = path.join(DATA, 'wind', `${key}-${day}.json`); const s = writeJSON(file, doc)
    written.push(`${file} ${Buffer.byteLength(s)} B, ${idx.length} h x ${pts.length} pts`)
  }
}
console.log(written.join('\n'))
