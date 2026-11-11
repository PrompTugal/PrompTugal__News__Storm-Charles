#!/usr/bin/env node
// incident.datascience@web-summit.dinis: high and low water at Cascais (Tagus mouth), Lisbon and Funchal,
// from Open-Meteo's Marine API (a model, CC BY 4.0), with wave height. Instituto Hidrográfico's own tide
// tables need its online shop (an account): listed for the conductor, not worked around.
// Usage: node tools/ds-tides.mjs   -> incidents/2026-11-10-storm-charles/data/exposure/tides.json
import { writeFileSync } from 'node:fs';

const OUT = 'incidents/2026-11-10-storm-charles/data/exposure/tides.json';
const PLACES = [
  { id: 'cascais', name: 'Cascais (Tagus mouth)', lat: 38.68, lon: -9.42 },
  { id: 'lisbon', name: 'Lisbon (Tagus, nearest sea cell)', lat: 38.66, lon: -9.25 },
  { id: 'funchal', name: 'Funchal', lat: 32.63, lon: -16.91 },
];
const now = new Date();
const day = (d) => d.toISOString().slice(0, 10);
const start = day(new Date(now.getTime() - 86400e3)), end = day(new Date(now.getTime() + 86400e3));
const iso = (ms) => new Date(Math.round(ms / 60e3) * 60e3).toISOString().replace(/:00\.000Z$/, 'Z');

const places = [];
let firstUrl;
for (const p of PLACES) {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${p.lat}&longitude=${p.lon}&hourly=sea_level_height_msl,wave_height,wave_period&timezone=GMT&start_date=${start}&end_date=${end}`;
  firstUrl ||= url;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`open-meteo ${r.status}`);
  const j = await r.json();
  const T = j.hourly.time.map((s) => Date.parse(s + ':00Z'));
  const z = j.hourly.sea_level_height_msl;
  const ext = [];
  for (let i = 1; i < z.length - 1; i++) {
    if (z[i - 1] == null || z[i] == null || z[i + 1] == null) continue;
    const hi = z[i] >= z[i - 1] && z[i] > z[i + 1], lo = z[i] <= z[i - 1] && z[i] < z[i + 1];
    if (!hi && !lo) continue;
    // a parabola through three hourly points: time and height of the turn
    const a = (z[i - 1] + z[i + 1] - 2 * z[i]) / 2, b = (z[i + 1] - z[i - 1]) / 2;
    const dx = a ? Math.max(-1, Math.min(1, -b / (2 * a))) : 0;
    ext.push({ type: hi ? 'high' : 'low', time_utc: iso(T[i] + dx * 3600e3), height_m_msl: +(z[i] + b * dx + a * dx * dx).toFixed(2) });
  }
  const wh = j.hourly.wave_height.filter((x) => x != null);
  places.push({
    id: p.id, name: p.name, model_cell: { lat: j.latitude, lon: j.longitude }, url,
    turns: ext,
    max_wave_height_m: wh.length ? Math.max(...wh) : null,
    hourly: j.hourly.time.map((t, i) => ({ t: t + 'Z', sea_level_m_msl: z[i], wave_height_m: j.hourly.wave_height[i], wave_period_s: j.hourly.wave_period[i] })),
  });
}
const read = now.toISOString().replace(/\.\d+Z$/, 'Z');
writeFileSync(OUT, JSON.stringify({
  about: 'High and low water, sea level and wave height at Cascais, the Tagus and Funchal, yesterday to tomorrow (UTC). A model, not Instituto Hidrográfico\'s official tide table and not a warning: IPMA issues the coastal warnings (Agitação Marítima) and the Captaincies close bars and beaches.',
  label: 'evidence: a model (Open-Meteo Marine API), turns found by us',
  source: firstUrl,
  source_name: 'Open-Meteo Marine API (sea_level_height_msl, wave_height, wave_period)',
  licence: 'CC BY 4.0 (Open-Meteo; underlying ocean models credited by Open-Meteo)',
  read_utc: read,
  method: 'Hourly sea level relative to mean sea level at the model sea cell nearest each place; a high or low water is an hourly turn, refined by a parabola through the three hours around it (to about 10 minutes and a few cm). Heights are above or below MEAN SEA LEVEL, not above the chart datum used in IH\'s tables (so they are not comparable number for number with a printed tide table). The Lisbon cell is the nearest sea cell outside the estuary, not the Lisbon tide gauge: estuary times run later.',
  confidence: 'MEDIUM for times of high and low water at Cascais and Funchal (astronomical tide well modelled); LOW for Lisbon inside the estuary; storm surge in the model is not verified against a gauge.',
  official_source: { name: 'Instituto Hidrográfico, Tabela de Marés 2026 (Lisboa, Cascais, Funchal)', url: 'https://www.hidrografico.pt/en/generic-pages/dt/doc/oceanographic-forecast/?child=mare-height', access: 'digital only, through IH\'s online shop (loja.hidrografico.pt): needs an account; not read by us' },
  by: 'incident.datascience@web-summit.dinis',
  updated: read,
  places,
}, null, 0) + '\n');
console.log(places.map((p) => `${p.id}: ${p.turns.filter((t) => t.type === 'high').map((t) => t.time_utc.slice(5, 16) + ' ' + t.height_m_msl).join(', ')}`).join('\n'));
