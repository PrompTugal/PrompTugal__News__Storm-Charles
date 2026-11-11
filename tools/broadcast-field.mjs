#!/usr/bin/env node
// incident.broadcast@web-summit.dinis: the wind and pressure field behind the /broadcast/ map. One request to Open-Meteo's
// forecast API (CC BY 4.0; its "best match" of national and ECMWF models) for a 2-degree grid over the north-east Atlantic,
// every 3 hours. A model's field, not an observation and not a warning: the page says so.
// Usage: node tools/broadcast-field.mjs [--out broadcast/data/field.json] [--from 2026-11-10T18:00] [--to 2026-11-12T12:00]
// Run by an agent (not by the build: the build makes no outside request); commit the file it writes.
import fs from 'node:fs'
import crypto from 'node:crypto'
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d }
const out = arg('--out', 'broadcast/data/field.json')
const from = arg('--from', '2026-11-10T18:00'), to = arg('--to', '2026-11-12T12:00')
const G = { w: -32, e: 2, s: 30, n: 52, step: 2 }
const lons = [], lats = []
for (let y = G.n; y >= G.s; y -= G.step) lats.push(y)
for (let x = G.w; x <= G.e; x += G.step) lons.push(x)
const pts = lats.flatMap(y => lons.map(x => [y, x]))
const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + pts.map(p => p[0]).join(',') + '&longitude=' + pts.map(p => p[1]).join(',') +
  '&hourly=pressure_msl,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=GMT&start_hour=' + from + '&end_hour=' + to
const res = await fetch(url, { headers: { 'user-agent': 'storm-charles-newsroom (+https://storm-charles.promptugal.news)' } })
if (!res.ok) { console.error('Open-Meteo', res.status, (await res.text()).slice(0, 300)); process.exit(1) }
const text = await res.text(); const read = new Date().toISOString().slice(0, 19) + 'Z'
const arr = JSON.parse(text); const list = Array.isArray(arr) ? arr : [arr]
const times = list[0].hourly.time
const keep = times.map((t, i) => i).filter(i => +times[i].slice(11, 13) % 3 === 0)
const r1 = v => v == null ? null : Math.round(v * 10) / 10
const frames = keep.map(i => {
  const p = [], u = [], v = []
  for (const o of list) {
    const h = o.hourly, s = h.wind_speed_10m[i], d = h.wind_direction_10m[i]
    p.push(h.pressure_msl[i] == null ? null : Math.round(h.pressure_msl[i] * 10) / 10)
    // direction is where the wind blows FROM: u, v point where it goes
    const rad = d * Math.PI / 180
    u.push(s == null ? null : r1(-s * Math.sin(rad))); v.push(s == null ? null : r1(-s * Math.cos(rad)))
  }
  return { time_utc: times[i] + 'Z', p, u, v }
})
const doc = {
  about: "A model's wind (10 m) and sea-level pressure over the north-east Atlantic, every 3 hours, for the /broadcast/ map. Open-Meteo's forecast API, its best match of the national and ECMWF models; read once by incident.broadcast@ and served from this site. A model's field, not an observation, not a warning, and not our forecast: for warnings follow IPMA.",
  label: 'evidence: a model field from Open-Meteo (CC BY 4.0), reshaped by us (u, v from speed and direction)',
  source: 'https://open-meteo.com/en/docs', licence: 'CC BY 4.0, Open-Meteo.com (open-meteo.com/en/license)',
  request: url.slice(0, 120) + '... (' + pts.length + ' points)', sha256: crypto.createHash('sha256').update(text).digest('hex'),
  read_utc: read, units: { p: 'hPa', u: 'm/s eastward', v: 'm/s northward' },
  grid: { lon_west: G.w, lat_north: G.n, step_deg: G.step, cols: lons.length, rows: lats.length, order: 'rows north to south, west to east' },
  by: 'incident.broadcast@web-summit.dinis', updated: read, frames
}
fs.writeFileSync(out, JSON.stringify(doc)); console.log(out, frames.length, 'frames', pts.length, 'points', fs.statSync(out).size, 'bytes')
