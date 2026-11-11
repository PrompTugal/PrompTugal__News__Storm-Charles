#!/usr/bin/env node
// IPMA's warning areas, by code: node tools/graph-places.mjs <the file fetched from IPMA> <UTC time read>
// Reads IPMA's own list (https://api.ipma.pt/open-data/distrits-islands.json), keeps one row per warning area
// (idAreaAviso): its code, the name of its seat, its coordinates. Writes data/graph/ref/ipma-areas.json.
// The fetch is done outside (curl), so this tool has no network and the time read is the caller's.
import fs from 'node:fs'
const [, , file, read] = process.argv
if (!file || !/^\d{4}-\d\d-\d\dT\d\d:\d\dZ$/.test(read || '')) { console.error('usage: graph-places.mjs <distrits-islands.json> <YYYY-MM-DDTHH:MMZ>'); process.exit(2) }
const SRC = 'https://api.ipma.pt/open-data/distrits-islands.json'
const seen = new Map()
for (const r of JSON.parse(fs.readFileSync(file, 'utf8')).data) if (!seen.has(r.idAreaAviso)) seen.set(r.idAreaAviso, { code: r.idAreaAviso, name: r.local, lat: +r.latitude, lon: +r.longitude, mainland: r.idRegiao === 1 })
const out = { about: "IPMA's warning areas by code (idAreaAviso), from IPMA's list of districts and islands: the first place listed for each area gives its name and coordinates. Reference data for the graph's Place nodes. Made by tools/graph-places.mjs.", source: SRC, read, by: 'incident.graph@web-summit.dinis', updated: read, label: 'fact', areas: [...seen.values()].sort((a, b) => a.code.localeCompare(b.code)) }
fs.writeFileSync(new URL('../data/graph/ref/ipma-areas.json', import.meta.url), JSON.stringify(out, null, 1) + '\n')
console.log(`graph-places: ${out.areas.length} areas`)
