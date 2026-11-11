#!/usr/bin/env node
// incident.datascience@web-summit.dinis: where the storm's centre crosses Lisbon's meridian in each of the
// 51 ECMWF ensemble forecasts (control + 50 members), and Lisbon's model gusts, via Open-Meteo's ensemble API.
// Shares of forecasts, not the chance of it happening. Not a forecast of ours, not a warning.
// Usage: node tools/ds-ensemble.mjs  -> incidents/2026-11-10-storm-charles/data/exposure/ensemble.json
import { writeFileSync } from 'node:fs';

const OUT = 'incidents/2026-11-10-storm-charles/data/exposure/ensemble.json';
const LON = -9.5; // the meridian just off Cabo da Roca
const LATS = Array.from({ length: 25 }, (_, i) => +(35.5 + i * 0.25).toFixed(2)); // 35.5 .. 41.5 N
const LISBON = { lat: 38.72, lon: -9.14 };
const NEAR = [38.2, 39.2]; // "near Lisbon": within about 55 km north or south of 38.72 N (our band, not an official one)
const now = new Date();
const d = (x) => x.toISOString().slice(0, 10);
const start = d(now), end = d(new Date(now.getTime() + 86400e3));
const lat = [...LATS, LISBON.lat].join(','), lon = [...LATS.map(() => LON), LISBON.lon].join(',');
const url = `https://ensemble-api.open-meteo.com/v1/ensemble?latitude=${lat}&longitude=${lon}&hourly=pressure_msl,wind_gusts_10m&models=ecmwf_ifs025&timezone=GMT&wind_speed_unit=kmh&start_date=${start}&end_date=${end}`;
const r = await fetch(url);
if (!r.ok) throw new Error(`open-meteo ${r.status}: ${await r.text()}`);
const J = await r.json();
const pts = J.slice(0, LATS.length), lis = J[LATS.length];
const time = pts[0].hourly.time;
const members = ['', ...Array.from({ length: 50 }, (_, i) => `_member${String(i + 1).padStart(2, '0')}`)];

const per = members.map((suf, k) => {
  let best = null;
  for (let t = 0; t < time.length; t++) {
    const col = pts.map((p) => p.hourly[`pressure_msl${suf}`][t]);
    if (col.some((v) => v == null)) continue;
    let i = 0; for (let j = 1; j < col.length; j++) if (col[j] < col[i]) i = j;
    if (!best || col[i] < best.p) {
      let la = LATS[i];
      if (i > 0 && i < col.length - 1) { // parabola through three latitudes
        const a = (col[i - 1] + col[i + 1] - 2 * col[i]) / 2, b = (col[i + 1] - col[i - 1]) / 2;
        if (a > 0) la = LATS[i] + 0.25 * Math.max(-1, Math.min(1, -b / (2 * a)));
      }
      best = { t, p: col[i], lat: la, edge: i === 0 || i === col.length - 1 };
    }
  }
  const g = lis.hourly[`wind_gusts_10m${suf}`];
  let gi = 0; for (let j = 1; j < g.length; j++) if ((g[j] ?? -1) > (g[gi] ?? -1)) gi = j;
  const scen = best.lat > NEAR[1] ? 'north' : best.lat < NEAR[0] ? 'south' : 'near';
  return { member: k === 0 ? 'control' : k, crossing_utc: time[best.t] + 'Z', crossing_lat: +best.lat.toFixed(2), min_pressure_hpa: best.p,
    at_box_edge: best.edge, scenario: scen, lisbon_max_gust_kmh: g[gi], lisbon_max_gust_utc: time[gi] + 'Z' };
});
const n = per.length;
const share = (s) => +(per.filter((m) => m.scenario === s).length / n).toFixed(2);
const q = (arr, p) => { const a = arr.filter((v) => v != null).sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(p * (a.length - 1) + 0.5))] : null; };
const hourly = time.map((t, i) => {
  const v = members.map((s) => lis.hourly[`wind_gusts_10m${s}`][i]);
  return { t: t + 'Z', gust_p10: q(v, 0.1), gust_median: q(v, 0.5), gust_p90: q(v, 0.9), members_over_90kmh: v.filter((x) => x >= 90).length };
});
const read = now.toISOString().replace(/\.\d+Z$/, 'Z');
writeFileSync(OUT, JSON.stringify({
  about: 'Where the storm\'s centre crosses 9.5 W (off Lisbon) in each of the 51 ECMWF ensemble forecasts, grouped north / near / south of Lisbon, and the spread of model gusts at Lisbon hour by hour. SHARES OF FORECASTS, NOT THE CHANCE OF IT HAPPENING. Not a forecast of ours and not a warning: IPMA issues the warnings.',
  label: 'hypothesis: our reading of a model ensemble (ECMWF IFS ENS 0.25°, via Open-Meteo)',
  source: url,
  source_name: 'Open-Meteo Ensemble API, model ecmwf_ifs025 (ECMWF IFS ensemble: control + 50 members), the latest run Open-Meteo held at read time',
  licence: 'CC BY 4.0: ECMWF open data, served by Open-Meteo (credit both)',
  read_utc: read,
  method: `For each member: mean-sea-level pressure along 9.5 W from 35.5 to 41.5 N (every 0.25°), each hour; the crossing is the hour when the lowest pressure on that line is deepest, and its latitude (refined by a parabola). North: crossing above ${NEAR[1]} N; near: ${NEAR[0]}–${NEAR[1]} N; south: below ${NEAR[0]} N (bands ours, about 55 km either side of Lisbon). Gusts: the model's 10 m gust at the grid cell nearest Lisbon (38.72 N, 9.14 W), km/h; a 25 km cell smooths hills and river: station gusts differ. The ensemble\'s native step here is 3 hours (Open-Meteo interpolates between), so crossing times are to the nearest 3 h; lisbon_max_gust is over the whole window read (today and tomorrow, UTC).`,
  confidence: 'MEDIUM for the north/near/south split (a clear low on a 25 km grid); LOW for gust values at a point. at_box_edge = true means the lowest pressure sat at the edge of the line (the centre may be outside it).',
  by: 'incident.datascience@web-summit.dinis',
  updated: read,
  forecasts: n,
  shares: { north: share('north'), near: share('near'), south: share('south') },
  crossing_utc_median: q(per.map((m) => Date.parse(m.crossing_utc)), 0.5) && new Date(q(per.map((m) => Date.parse(m.crossing_utc)), 0.5)).toISOString().replace(/\.\d+Z$/, 'Z'),
  lisbon_max_gust_kmh: { p10: q(per.map((m) => m.lisbon_max_gust_kmh), 0.1), median: q(per.map((m) => m.lisbon_max_gust_kmh), 0.5), p90: q(per.map((m) => m.lisbon_max_gust_kmh), 0.9) },
  members: per,
  lisbon_hourly: hourly,
}, null, 0) + '\n');
console.log('shares', share('north'), share('near'), share('south'), 'edge', per.filter((m) => m.at_box_edge).length);
