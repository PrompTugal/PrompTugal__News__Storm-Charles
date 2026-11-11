#!/usr/bin/env node
// The hour's flight picture in two sentences by an open-weight model, checked number by number (incident.flights@, WS-214).
//   node tools/flights-summary.mjs [--hour 2026-11-11T22] [--root <dir>] [--model M] [--mock]
// Delegated through tools/llm.mjs only (the ledger line, the raw store, the agent's share of 1 USD a day: models/budgets.json).
// Every number in the answer must be one of the numbers in the input; the answer must be two sentences. Only an answer
// that passes is written (summaries/<date>/<HH>.json, labelled model output, with the model's name); a failure is
// recorded outside git and said in agents/flights/status.json.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { call } from './llm.mjs'
import { BY, DATA, NOT_WARNING, ADSBLOL_CITE, AIRLINES, writeJSON, sha256, iso } from './flights-common.mjs'

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : d }
const root = arg('root', '.')
const MODEL = arg('model', process.env.FLIGHTS_MODEL || 'meta-llama/llama-4-maverick')
const prev = new Date(Date.now() - 3600e3).toISOString().slice(0, 13)
const hour = arg('hour', prev)   // default: the last complete hour
const snapFile = path.join(root, DATA, 'snapshots', hour.slice(0, 10), hour.slice(11, 13) + '.json')
const cwFile = path.join(arg('cwroot', root), DATA, 'crosswind.json')
const snap = JSON.parse(fs.readFileSync(snapFile, 'utf8'))
const cw = JSON.parse(fs.readFileSync(cwFile, 'utf8'))

// The facts the model is given: small, every number one we computed from the files.
const facts = { hour_utc: `${hour.slice(0, 10)} ${hour.slice(11, 13)}:00-${hour.slice(11, 13)}:59`, areas: {} }
for (const area of ['lisbon', 'funchal']) {
  const S = snap.snapshots.filter(s => s.area === area)
  const ok = S.filter(s => s.time)
  const flights = new Set(ok.flatMap(s => s.aircraft.map(a => a.callsign)))
  const last = ok.at(-1)
  const byAl = {}; for (const s of ok) for (const a of s.aircraft) (byAl[a.airline] ||= new Set()).add(a.callsign)
  facts.areas[area] = {
    snapshots_tried: S.length, snapshots_read: ok.length,
    ...(ok.length ? {} : { note: 'no snapshot could be read this hour (the source did not answer): nothing is known about aircraft here, which is not the same as none' }),
    distinct_airline_flights_seen: flights.size,
    at_last_snapshot: last ? { time_utc: last.time.slice(11, 16), airborne: last.aircraft.filter(a => !a.on_ground).length, on_ground: last.aircraft.filter(a => a.on_ground).length } : null,
    airlines: Object.entries(byAl).map(([k, v]) => ({ airline: AIRLINES[k] || k, flights: v.size })).sort((a, b) => b.flights - a.flights).slice(0, 5)
  }
}
facts.airport_wind = {}
for (const a of cw.airports) {
  const H = a.hours.find(h => h.hour.startsWith(hour)) || a.hours.at(-1)
  const m = H.metars.at(-1)
  facts.airport_wind[a.icao] = { metar_time_utc: m.time.slice(11, 16), wind_dir_deg: m.wind_dir, wind_kt: m.wind_kt, gust_kt: m.gust_kt, max_crosswind_kt_this_hour: H.max_crosswind_kt }
}
const input = JSON.stringify(facts)

const numsIn = s => (String(s).match(/\d+(?:\.\d+)?/g) || []).map(Number)
const WORDS = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20 }
function check (text) {
  const allowed = new Set(numsIn(input))
  const t = String(text || '').trim()
  const found = [...numsIn(t), ...(t.toLowerCase().match(/\b[a-z]+\b/g) || []).filter(w => w in WORDS).map(w => WORDS[w])]
  const bad = found.filter(n => !allowed.has(n))
  const sentences = t.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(Boolean).length
  const problems = []
  if (!t) problems.push('empty answer')
  if (bad.length) problems.push(`numbers not in the input: ${[...new Set(bad)].join(', ')}`)
  if (sentences !== 2) problems.push(`${sentences} sentences, not two`)
  return { passed: problems.length === 0, numbers_checked: found.length, problems }
}

const messages = [
  { role: 'system', content: 'You summarise flight data for a newsroom. Use only the numbers in the JSON you are given; never estimate, round or add a number; no advice, no forecast. Write exactly two plain sentences in English, no lists, no markdown.' },
  { role: 'user', content: `Airline aircraft adsb.lol's receivers saw near Lisbon and Funchal (Madeira) in one hour, and the airports' latest METAR wind. Write two sentences summarising the flight picture.\n\n${input}` }
]
const r = await call({ task: 'WS-214/flights-summary', agent: BY, model: MODEL, messages, max_tokens: 300, mock: process.argv.includes('--mock'), extra: MODEL.includes('qwen') ? { reasoning: { enabled: false } } : {} })
const text = r.text ? r.text.trim() : null
const c = check(text)
const rec = { hour: hour + ':00:00Z', model_asked: MODEL, model_served: r.line.model_served, status: r.line.status, cost_usd: r.line.cost_usd, ledger_id: r.line.id, input_sha256: sha256(input), check: c, at: iso(Date.now()) }
fs.mkdirSync(path.join(os.homedir(), 'flights-bin'), { recursive: true })
fs.appendFileSync(path.join(os.homedir(), 'flights-bin', 'summaries.jsonl'), JSON.stringify({ ...rec, text }) + '\n')
if (c.passed && r.line.status === 'ok' && !process.argv.includes('--mock')) {
  const file = path.join(root, DATA, 'summaries', hour.slice(0, 10), hour.slice(11, 13) + '.json')
  writeJSON(file, {
    by: BY, updated: iso(Date.now()), label: 'model output',
    about: `A two-sentence summary of the flight picture for ${facts.hour_utc} UTC, written by an open-weight model (${r.line.model_served || MODEL}) through OpenRouter from the JSON in input, and published only because every number in it is one of the input's numbers and it is two sentences (check). Model output: not checked for meaning beyond that, and not ours. The data itself: snapshots/ and crosswind.json.`,
    not_a_warning_service: NOT_WARNING, attribution: ADSBLOL_CITE,
    hour: rec.hour, text, model: { asked: MODEL, served: r.line.model_served, via: 'OpenRouter, through tools/llm.mjs (one ledger line per call)', cost_usd: r.line.cost_usd, ledger_id: r.line.id },
    input: facts, input_sha256: rec.input_sha256, sources: [path.relative(root, snapFile), path.relative(root, cwFile)], check: c
  })
  console.log(`passed: ${file}\n${text}`)
} else console.log(`not published (${r.line.status}; ${c.problems.join('; ')}):\n${text}`)
