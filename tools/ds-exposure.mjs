#!/usr/bin/env node
// incident.datascience@web-summit.dinis: residents under each IPMA warning level, by warning area and hour.
// Usage: node tools/ds-exposure.mjs [--warnings <file>] [--read-utc <iso>]
//   without --warnings it reads IPMA's open data live. Writes
//   incidents/2026-11-10-storm-charles/data/exposure/people-by-hour.json
// Inputs: IPMA warnings_www.json (all areas, all hazards) and exposure/population.json (INE Census 2021).
import { readFileSync, writeFileSync } from 'node:fs';

const INC = 'incidents/2026-11-10-storm-charles/data/exposure';
const SRC = 'https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json';
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const RANK = { green: 0, yellow: 1, orange: 2, red: 3 };
const LEVELS = ['red', 'orange', 'yellow'];

let warnings, readUtc;
if (arg('--warnings')) {
  warnings = JSON.parse(readFileSync(arg('--warnings'), 'utf8'));
  readUtc = arg('--read-utc') || new Date().toISOString().replace(/\.\d+Z$/, 'Z');
} else {
  const r = await fetch(SRC);
  if (!r.ok) throw new Error(`IPMA ${r.status}`);
  warnings = await r.json();
  readUtc = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
}
const pop = JSON.parse(readFileSync(`${INC}/population.json`, 'utf8'));
const areaPop = Object.fromEntries(pop.areas.map((a) => [a.area, a]));

// IPMA's times are local; in November Portugal (mainland and Madeira) is on WET = UTC.
const t = (s) => Date.parse(s.endsWith('Z') ? s : s + 'Z');
const active = warnings.filter((w) => RANK[w.awarenessLevelID] > 0 && areaPop[w.idAreaAviso]);
if (!active.length) throw new Error('no non-green warnings on mapped areas');
const H = 3600e3;
const first = Math.floor(Math.min(...active.map((w) => t(w.startTime))) / H) * H;
const last = Math.ceil(Math.max(...active.map((w) => t(w.endTime))) / H) * H;

const hours = [];
const perArea = {};
for (let h = first; h < last; h += H) {
  const lvl = {}; // area -> {rank, hazards}
  for (const w of active) {
    if (t(w.startTime) < h + H && t(w.endTime) > h) {
      const r = RANK[w.awarenessLevelID];
      const cur = lvl[w.idAreaAviso] || { rank: 0, hazards: [] };
      if (r > cur.rank) cur.hazards = [];
      if (r >= cur.rank) { cur.rank = r; cur.hazards.push(w.awarenessTypeName); }
      lvl[w.idAreaAviso] = cur;
    }
  }
  const row = { hour_utc: new Date(h).toISOString().replace(/\.\d+Z$/, 'Z'), red: 0, orange: 0, yellow: 0, areas: {} };
  for (const [a, v] of Object.entries(lvl)) {
    const name = LEVELS[3 - v.rank];
    row[name] += areaPop[a].total || 0;
    row.areas[a] = name;
    const pa = (perArea[a] ||= { area: a, name: areaPop[a].name, residents: areaPop[a].total, age_65_plus: areaPop[a].age_65_plus,
      hours_red: 0, hours_orange: 0, hours_yellow: 0, red_hazards: new Set(), orange_hazards: new Set(), first_red_utc: null, last_red_utc: null });
    pa[`hours_${name}`]++;
    if (name === 'red') { v.hazards.forEach((x) => pa.red_hazards.add(x)); pa.first_red_utc ||= row.hour_utc; pa.last_red_utc = new Date(h + H).toISOString().replace(/\.\d+Z$/, 'Z'); }
    if (name === 'orange') v.hazards.forEach((x) => pa.orange_hazards.add(x));
  }
  hours.push(row);
}
const areas = Object.values(perArea)
  .map((a) => ({ ...a, red_hazards: [...a.red_hazards], orange_hazards: [...a.orange_hazards] }))
  .sort((x, y) => y.hours_red - x.hours_red || y.hours_orange - x.hours_orange || (y.residents || 0) - (x.residents || 0));
const peak = hours.reduce((m, r) => (r.red > m.red ? r : m), hours[0]);

const out = {
  about: 'Residents (INE Census 2021) living in each IPMA warning area, by hour, under the highest level in force there (any hazard). Where people sleep, not where they are at a given hour, and never a count of people harmed. Not a warning: IPMA issues the warnings and ANEPC the instructions.',
  label: 'hypothesis-free arithmetic on two facts: IPMA warning windows (as read) x INE census counts; Madeira zones approximated by municipality',
  source: SRC,
  sources: [SRC, pop.source],
  licence: 'IPMA open data (credit IPMA); INE statistics (credit INE)',
  read_utc: readUtc,
  method: 'For every UTC hour, an area counts under the highest level of any warning whose window overlaps that hour; its census residents are added to that level. Areas = IPMA mainland districts and Madeira zones (MCN, MCS, MPS; MRM residents are inside MCN/MCS and not counted twice). Only the warnings in IPMA\'s file at read time: windows already ended drop out of IPMA\'s file, so earlier hours come from earlier reads.',
  confidence: 'HIGH for the arithmetic and the mainland areas; MEDIUM for Madeira (municipal approximation of IPMA zones); residents are 2021 counts.',
  by: 'incident.datascience@web-summit.dinis',
  updated: readUtc,
  peak: { hour_utc: peak.hour_utc, red: peak.red, orange: peak.orange, yellow: peak.yellow },
  areas,
  hours,
};
writeFileSync(`${INC}/people-by-hour.json`, JSON.stringify(out, null, 0) + '\n');
console.log(`people-by-hour: ${hours.length} h, ${areas.length} areas, peak red ${peak.red} at ${peak.hour_utc}`);
