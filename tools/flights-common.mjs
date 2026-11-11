// Shared by tools/flights-*.mjs (incident.flights@web-summit.dinis, 11 November 2026, WS-214; Dinis ~22:00 UTC, BRIEF.md).
// Fetch with provenance (URL, HTTP status, bytes, sha256 of the raw body, time read, response time), raw bodies to a
// store outside git (FLIGHTS_RAW_DIR, default ~/.incident-raw/flights; pushed to the flights vault, git keeps the sha256),
// and the airline list. Never a credential in a URL.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'

export const BY = 'incident.flights@web-summit.dinis'
export const INCIDENT = '2026-11-10-storm-charles'
export const DATA = `incidents/${INCIDENT}/data/flights`
export const RAW_DIR = process.env.FLIGHTS_RAW_DIR || path.join(os.homedir(), '.incident-raw', 'flights')
export const NOT_WARNING = 'Not a warning service. No forecast or advice of ours. Your airline decides whether your flight runs: its site or app has the latest. For warnings follow IPMA and ANEPC.'
export const OPENSKY_CITE = 'The OpenSky Network, https://opensky-network.org (M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014). Used for research and non-commercial purposes, as its API documentation asks; its full terms page is still for a person to read (transport/sources.md).'
export const ADSBLOL_CITE = 'Aircraft positions: adsb.lol (https://adsb.lol), community ADS-B data, licensed under the Open Database License (ODbL) v1.0 (https://opendatacommons.org/licenses/odbl/1-0/). Our snapshots are a derived database offered under the same licence.'
export const OPENMETEO_CITE = 'Weather data by Open-Meteo.com, https://open-meteo.com, licensed CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Its forecast API with past_days: the model\'s hourly analysis and short-range forecast, not observations.'

export const sha256 = b => crypto.createHash('sha256').update(b).digest('hex')
export const iso = d => new Date(d).toISOString().replace(/\.\d{3}Z$/, 'Z')

// Scheduled and cargo airlines seen in Portugal (ICAO three-letter designators), copied from incident.transport@'s
// tools/transport-read.mjs (11 November 2026) so both agents count the same airlines. Anything else (business jets,
// private, state, military, unknown) is never kept.
const AIRLINES = Object.fromEntries(`TAP TAP Air Portugal|RYR Ryanair|RUK Ryanair UK|MAY Malta Air|LDM Lauda Europe|EZY easyJet|EJU easyJet Europe|EZS easyJet Switzerland|TVF Transavia France|TRA Transavia|VLG Vueling|IBE Iberia|IBS Iberia Express|ANE Air Nostrum|AEA Air Europa|DLH Lufthansa|EWG Eurowings|EWL Eurowings Europe|AFR Air France|HOP Air France Hop|KLM KLM|BAW British Airways|SWR Swiss|EDW Edelweiss|AUA Austrian|BEL Brussels Airlines|THY Turkish Airlines|PGT Pegasus|UAE Emirates|QTR Qatar Airways|ETD Etihad|UAL United|DAL Delta|AAL American|ACA Air Canada|TSC Air Transat|AZU Azul|TAM LATAM Brasil|GLO Gol|RAM Royal Air Maroc|LGL Luxair|WZZ Wizz Air|WMT Wizz Air Malta|NAX Norwegian|NOZ Norwegian|NSZ Norwegian|SAS SAS|FIN Finnair|ITY ITA Airways|VOE Volotea|SXS SunExpress|CFG Condor|TFL TUI fly Netherlands|TUI TUI Airways|JAF TUI fly Belgium|TOM TUI Airways|SAT SATA Air Açores|RZO Azores Airlines|BCS DHL (EAT Leipzig)|DHK DHL Air|FDX FedEx|UPS UPS|WFL World2fly|BTI airBaltic|AEE Aegean|ELY El Al|ISR Israir|CSA Czech Airlines|LOT LOT|ENT Enter Air|AMC Air Malta|KMM KM Malta|HBN Hi Fly|WHT White Airways|EVE Evelop|EXS Jet2|BEE Flybe|BIE Air Mediterranee|SVA Saudia|MSR EgyptAir|DAH Air Algerie|TAR Tunisair|CTN Croatia|ROT TAROM|BUC Bulgarian Air Charter|UZB Uzbekistan Airways|CCA Air China|CES China Eastern|HVN Vietnam Airlines|JBU JetBlue|BRU Belavia`.split('|').map(s => s.trim()).filter(s => /^[A-Z]{3} [^?]+$/.test(s)).map(s => [s.slice(0, 3), s.slice(4)]))
// An airline flight: the airline's ICAO code, then a flight number (digits, maybe a letter suffix).
export const airlineOf = cs => { const m = /^([A-Z]{3})(\d[0-9A-Z]{0,4})$/.exec(String(cs || '').trim()); return m && AIRLINES[m[1]] ? m[1] : null }
// Added by incident.flights@ (airlines that fly through or near Portugal and are absent above; ICAO designators):
Object.assign(AIRLINES, Object.fromEntries(`KAL Korean Air|AAR Asiana|JAL Japan Airlines|ANA All Nippon Airways|CPA Cathay Pacific|SIA Singapore Airlines|THA Thai Airways|AIC Air India|ETH Ethiopian Airlines|KQA Kenya Airways|SAA South African Airways|DTA TAAG Angola|LAM LAM Mozambique|RWD RwandAir|AVA Avianca|CMP Copa Airlines|AMX Aeromexico|ARG Aerolineas Argentinas|LAN LATAM|LPE LATAM Peru|ACI Air Caraibes|FBU French bee|AEA Air Europa|IBB Binter|BTI airBaltic|SBI S7|QFA Qantas|ANZ Air New Zealand|EIN Aer Lingus|VIR Virgin Atlantic|ICE Icelandair|NOR Norse Atlantic|AZA ITA Airways|JST Jet2|EXS Jet2|TCX Condor|CFG Condor|SXS SunExpress|PGT Pegasus|CXI Corendon|CAI Corendon|KZR Air Astana|GFA Gulf Air|KAC Kuwait Airways|RJA Royal Jordanian|MEA Middle East Airlines|OMA Oman Air|FDB flydubai|ABY Air Arabia|MAC Air Arabia Maroc|TUN Tunisair|DAH Air Algerie|CLX Cargolux|GTI Atlas Air|ABW AirBridgeCargo|BOX AeroLogic|GEC Lufthansa Cargo|QTR Qatar Airways|CKS Kalitta Air|NCA Nippon Cargo|MPH Martinair|SWT Swiftair|EVE Evelop|WIF Wideroe|BCY CityJet|LOG Loganair|EFW BA Euroflyer|CLH Lufthansa CityLine|DLA Air Dolomiti|GWI Eurowings Discover|OCN Discover Airlines|SKW SkyWest|CRL Corsair|AFL Aeroflot|TVS Smartwings|LZB Bulgaria Air|ADR Adria|CTN Croatia|ASL ASL Airlines|NPT West Atlantic`.split('|').map(s => [s.slice(0, 3), s.slice(4)]).filter(([k]) => !(k in AIRLINES))))
export { AIRLINES }

export async function fetchProv (url, { kind = 'raw', timeoutMs = 30000, headers = {} } = {}) {
  const t0 = Date.now(); const read = iso(t0)
  let status = 0; let body = Buffer.alloc(0); let error = null; let hdr = {}
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'storm-charles-newsroom-flights/1 (non-commercial research)', ...headers }, signal: AbortSignal.timeout(timeoutMs) })
    status = r.status; body = Buffer.from(await r.arrayBuffer())
    for (const h of ['x-rate-limit-remaining', 'x-ratelimit-remaining', 'content-type']) if (r.headers.get(h)) hdr[h] = r.headers.get(h)
  } catch (e) { error = String(e.message || e) }
  const ms = Date.now() - t0
  const digest = sha256(body)
  const day = read.slice(0, 10)
  const dir = path.join(RAW_DIR, kind, day); fs.mkdirSync(dir, { recursive: true })
  const name = `${read.replace(/[:]/g, '')}-${digest.slice(0, 12)}`
  fs.writeFileSync(path.join(dir, name + '.body'), body)
  fs.writeFileSync(path.join(dir, name + '.meta.json'), JSON.stringify({ url, status, bytes: body.length, sha256: digest, read, response_ms: ms, error, headers: hdr }, null, 2))
  const prov = { url, status, bytes: body.length, sha256: digest, read, response_ms: ms, raw: `flights vault: ${kind}/${day}/${name}.body` }
  if (error) prov.error = error
  const rl = hdr['x-rate-limit-remaining'] ?? hdr['x-ratelimit-remaining']; if (rl != null) prov.rate_limit_remaining = Number(rl)
  return { prov, body, ok: status >= 200 && status < 300 && !error }
}

export function writeJSON (file, obj) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const s = pretty(obj) + '\n'
  if (Buffer.byteLength(s) > 250 * 1024) throw new Error(`${file}: ${Buffer.byteLength(s)} bytes, over the limit`)
  fs.writeFileSync(file, s)
  return s
}

// Two-space JSON, with arrays of numbers (and arrays of such arrays, one per line) kept on one line: the wind grids stay small.
export function pretty (v, ind = '') {
  const prim = x => x === null || typeof x !== 'object'
  if (prim(v)) return JSON.stringify(v)
  const nx = ind + '  '
  if (Array.isArray(v)) {
    if (!v.length) return '[]'
    if (v.every(prim) && v.every(x => typeof x !== 'string' || x.length < 40)) return '[' + v.map(x => JSON.stringify(x)).join(',') + ']'
    if (v.every(o => o && typeof o === 'object' && !Array.isArray(o) && Object.values(o).every(prim))) return '[\n' + v.map(o => nx + JSON.stringify(o)).join(',\n') + '\n' + ind + ']'
    if (v.every(a => Array.isArray(a) && a.every(prim))) return '[\n' + v.map(a => nx + '[' + a.map(x => JSON.stringify(x)).join(',') + ']').join(',\n') + '\n' + ind + ']'
    return '[\n' + v.map(x => nx + pretty(x, nx)).join(',\n') + '\n' + ind + ']'
  }
  const ks = Object.keys(v).filter(k => v[k] !== undefined)
  if (!ks.length) return '{}'
  return '{\n' + ks.map(k => nx + JSON.stringify(k) + ': ' + pretty(v[k], nx)).join(',\n') + '\n' + ind + '}'
}
