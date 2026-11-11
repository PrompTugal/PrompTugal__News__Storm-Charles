#!/usr/bin/env node
// Read open transport sources for Storm Charles, politely, and write small JSON to the data room.
//   node tools/transport-read.mjs [--store DIR] [--dry]
// - Flights: OpenSky Network's public REST API (anonymous; research and non-commercial use; cite the OpenSky paper).
//   Today's departures per airport (LPPT Lisbon, LPPR Porto, LPFR Faro, LPMA Funchal) and one live snapshot of the
//   area around each airport. Airline flights only: a callsign counts only when its three-letter prefix is on the
//   AIRLINES list below. Nothing per aircraft is written: no callsign, no registration, no ICAO address, no position,
//   no track. Only counts per hour and per airport; movements by operators not on the list are counted as one number.
// - Services: each operator's own notices where an open, machine-readable source exists (Carris Metropolitana's
//   open API; Transtejo/Soflusa's public WordPress notices). Short excerpts only, with the link.
// - Raw responses never go in git: they go to a store outside it (--store, TRANSPORT_STORE, default ~/transport-store),
//   <store>/<yyyy>/<mm>/<dd>/<hh>/<name>.json, whose folder is a vault's working copy; git keeps each file's sha256.
// - Writes incidents/2026-11-10-storm-charles/data/transport/{flights,services}.json and appends one line per read to
//   transport/reads.jsonl. No model is called. Not a warning service: facts with source and time; inferences labelled.
// Kept by incident.transport@web-summit.dinis.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

// Node's own fetch reads HTTPS_PROXY only with NODE_USE_ENV_PROXY=1 (Node >= 22.21): run again with it where a proxy is set.
if ((process.env.HTTPS_PROXY || process.env.https_proxy) && !process.env.NODE_USE_ENV_PROXY) {
    const r = spawnSync(process.execPath, ['--no-warnings', ...process.argv.slice(1)], { stdio: 'inherit', env: { ...process.env, NODE_USE_ENV_PROXY: '1' } })
    process.exit(r.status ?? 1)
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'incidents/2026-11-10-storm-charles/data/transport')
const BY = 'incident.transport@web-summit.dinis'
const UA = 'newsroom-reader/1.0 (reads public open data; a few requests an hour)'
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true) }
const STORE = path.resolve(arg('store', process.env.TRANSPORT_STORE || path.join(os.homedir(), 'transport-store')))
const DRY = !!arg('dry', false)
const sleep = ms => new Promise(r => setTimeout(r, ms))
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const iso = d => new Date(d).toISOString().replace(/\.\d+Z$/, 'Z')
const writeJ = (f, j) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n') }
const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim()
const excerpt = (t, n = 220) => { t = strip(t); if (t.length <= n) return t; const cut = t.slice(0, n); return cut.slice(0, Math.max(cut.lastIndexOf(' '), n - 30)) + ' …' }

const OPENSKY = 'https://opensky-network.org/api'
const OPENSKY_CITE = 'The OpenSky Network, https://opensky-network.org (M. Schäfer, M. Strohmeier, V. Lenders, I. Martinovic, M. Wilhelm, "Bringing Up OpenSky: A Large-scale ADS-B Sensor Network for Research", IPSN 2014)'
const AIRPORTS = [
    { icao: 'LPPT', iata: 'LIS', name: 'Lisbon (Humberto Delgado)', lat: 38.7742, lon: -9.1342 },
    { icao: 'LPPR', iata: 'OPO', name: 'Porto (Francisco Sá Carneiro)', lat: 41.2481, lon: -8.6814 },
    { icao: 'LPFR', iata: 'FAO', name: 'Faro', lat: 37.0144, lon: -7.9659 },
    { icao: 'LPMA', iata: 'FNC', name: 'Funchal (Madeira, Cristiano Ronaldo)', lat: 32.6979, lon: -16.7745 },
]
// Scheduled and cargo airlines seen in Portugal (ICAO three-letter designators). Anything else (business jets, private,
// state, military, unknown) is never named and is counted only as one number per airport.
const AIRLINES = Object.fromEntries(`TAP TAP Air Portugal|RYR Ryanair|RUK Ryanair UK|MAY Malta Air|LDM Lauda Europe|EZY easyJet|EJU easyJet Europe|EZS easyJet Switzerland|TVF Transavia France|TRA Transavia|VLG Vueling|IBE Iberia|IBS Iberia Express|ANE Air Nostrum|AEA Air Europa|DLH Lufthansa|EWG Eurowings|EWL Eurowings Europe|AFR Air France|HOP Air France Hop|KLM KLM|BAW British Airways|SWR Swiss|EDW Edelweiss|AUA Austrian|BEL Brussels Airlines|THY Turkish Airlines|PGT Pegasus|UAE Emirates|QTR Qatar Airways|ETD Etihad|UAL United|DAL Delta|AAL American|ACA Air Canada|TSC Air Transat|AZU Azul|TAM LATAM Brasil|GLO Gol|RAM Royal Air Maroc|LGL Luxair|WZZ Wizz Air|WMT Wizz Air Malta|NAX Norwegian|NOZ Norwegian|NSZ Norwegian|SAS SAS|FIN Finnair|ITY ITA Airways|VOE Volotea|SXS SunExpress|CFG Condor|TFL TUI fly Netherlands|TUI TUI Airways|JAF TUI fly Belgium|TOM TUI Airways|SAT SATA Air Açores|RZO Azores Airlines|BCS DHL (EAT Leipzig)|DHK DHL Air|FDX FedEx|UPS UPS|WFL World2fly|BTI airBaltic|AEE Aegean|ELY El Al|ISR Israir|CSA Czech Airlines|LOT LOT|ENT Enter Air|AMC Air Malta|KMM KM Malta|HBN Hi Fly|WHT White Airways|EVE Evelop|EXS Jet2|BEE Flybe|BIE Air Mediterranee|SVA Saudia|MSR EgyptAir|DAH Air Algerie|TAR Tunisair|CTN Croatia|ROT TAROM|BUC Bulgarian Air Charter|UZB Uzbekistan Airways|CCA Air China|CES China Eastern|HVN Vietnam Airlines|JBU JetBlue|BRU Belavia`.split('|').map(s => s.trim()).filter(s => /^[A-Z]{3} [^?]+$/.test(s)).map(s => [s.slice(0, 3), s.slice(4)]))
const airlineOf = cs => { const m = /^([A-Z]{3})\d/.exec(String(cs || '').trim()); return m && AIRLINES[m[1]] ? m[1] : null }

const reads = []
async function get(name, url, { json = true } = {}) {
    const t0 = Date.now(), read = iso(t0)
    let status = 0, body = '', err = null
    try {
        const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' }, signal: AbortSignal.timeout(45000) })
        status = r.status; body = await r.text()
    } catch (e) { err = String(e.cause?.code || e.message) }
    const h = body ? sha(body) : null
    if (body && !DRY) {
        const d = new Date(t0), p = n => String(n).padStart(2, '0')
        const f = path.join(STORE, `${d.getUTCFullYear()}`, p(d.getUTCMonth() + 1), p(d.getUTCDate()), p(d.getUTCHours()), `${name}-${p(d.getUTCMinutes())}.json`)
        fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, body)
    }
    const rec = { name, url, read, status, bytes: body.length, sha256: h, ms: Date.now() - t0, ...(err ? { error: err } : {}) }
    reads.push(rec)
    let data = null
    if (json && status === 200) { try { data = JSON.parse(body) } catch { rec.error = 'not JSON' } }
    await sleep(1500)
    return { data, rec }
}

async function flights() {
    const now = Date.now(), day0 = Date.UTC(new Date(now).getUTCFullYear(), new Date(now).getUTCMonth(), new Date(now).getUTCDate())
    const b = Math.floor(day0 / 1000), e = Math.floor(now / 1000)
    const out = []
    for (const ap of AIRPORTS) {
        const depUrl = `${OPENSKY}/flights/departure?airport=${ap.icao}&begin=${b}&end=${e}`
        const dep = await get(`opensky-dep-${ap.icao}`, depUrl)
        const hours = Array(24).fill(0); let airline = 0, other = 0; const byAirline = {}
        const list = Array.isArray(dep.data) ? dep.data : []
        for (const f of list) {
            const a = airlineOf(f.callsign)
            if (!a) { other++; continue }
            airline++; byAirline[a] = (byAirline[a] || 0) + 1
            const h = new Date(f.firstSeen * 1000).getUTCHours(); hours[h]++
        }
        // OpenSky answers 404 with an empty list when it has no flight for the interval.
        const depOk = dep.rec.status === 200 || dep.rec.status === 404
        const d = 0.25
        const stUrl = `${OPENSKY}/states/all?lamin=${(ap.lat - d).toFixed(3)}&lomin=${(ap.lon - d).toFixed(3)}&lamax=${(ap.lat + d).toFixed(3)}&lomax=${(ap.lon + d).toFixed(3)}`
        const st = await get(`opensky-states-${ap.icao}`, stUrl)
        let ground = 0, low = 0, otherLive = 0
        for (const s of st.data?.states || []) {
            if (!airlineOf(s[1])) { otherLive++; continue }
            if (s[8]) ground++; else if ((s[13] ?? s[7] ?? 99999) < 3000) low++
        }
        out.push({
            icao: ap.icao, iata: ap.iata, name: ap.name,
            departures_today: depOk ? {
                label: 'fact', what: 'airline departures OpenSky\'s receivers detected leaving this airport since 00:00 UTC today, by the hour of first detection (UTC)',
                count: airline, by_hour_utc: hours.slice(0, new Date(now).getUTCHours() + 1),
                by_airline: Object.entries(byAirline).sort((x, y) => y[1] - x[1]).map(([k, n]) => ({ airline: AIRLINES[k], n })),
                other_operators_not_counted: other,
                source: `https://opensky-network.org/api/flights/departure?airport=${ap.icao}`, read: dep.rec.read, sha256: dep.rec.sha256,
            } : { label: 'none', note: `OpenSky did not answer (status ${dep.rec.status}${dep.rec.error ? ', ' + dep.rec.error : ''})`, source: depUrl.split('&')[0], read: dep.rec.read },
            arrivals_today: { label: 'none', note: 'OpenSky updates arrivals by a batch process at night; anonymous readers cannot see past days. Not available today.' },
            live_snapshot: st.rec.status === 200 ? {
                label: 'fact', what: 'airline aircraft OpenSky saw within about 25 km of the airport at the time read: on the ground, and airborne below 3,000 m',
                at: st.data?.time ? iso(st.data.time * 1000) : st.rec.read, on_ground: ground, airborne_low: low, other_operators_not_counted: otherLive,
                source: 'https://opensky-network.org/api/states/all (bounding box around the airport)', read: st.rec.read, sha256: st.rec.sha256,
            } : { label: 'none', note: `OpenSky did not answer (status ${st.rec.status})`, read: st.rec.read },
            baseline: { label: 'none', note: 'No normal-day baseline yet: OpenSky gives past days only to registered users (listed for the conductor). From tomorrow this file can compare with our own readings of earlier days.' },
            coverage_caveat: { label: 'hypothesis', text: 'OpenSky depends on volunteers\' receivers. Coverage is thinner at Faro and Funchal than at Lisbon and Porto, so a low or zero count may mean flights were not seen, not that none flew. A count is a floor, not a total.' },
        })
    }
    return out
}

async function services() {
    const items = []
    // Carris Metropolitana: open GTFS-realtime style alerts as JSON.
    const cmUrl = 'https://api.carrismetropolitana.pt/v2/alerts'
    const cm = await get('carris-metropolitana-alerts', cmUrl)
    if (Array.isArray(cm.data)) {
        const t = Date.now() / 1000
        const active = cm.data.filter(a => (a.active_period || []).some(p => (!p.start || p.start <= t) && (!p.end || p.end >= t)))
        const weather = active.filter(a => a.cause === 'WEATHER')
        const tx = a => (a?.translation || []).find(x => x.language === 'pt')?.text || a?.translation?.[0]?.text || ''
        const effects = {}; for (const a of active) effects[a.effect || 'UNKNOWN'] = (effects[a.effect || 'UNKNOWN'] || 0) + 1
        const lines = new Set(); for (const a of weather) for (const e of a.informed_entity || []) if (e.line_id || e.route_id) lines.add(e.line_id || e.route_id)
        items.push({
            id: 'carris-metropolitana', operator: 'Carris Metropolitana (buses, Lisbon metropolitan area outside the city)', mode: 'bus',
            label: 'fact', state: weather.length ? 'disrupted (weather notices in force)' : (active.length ? 'notices in force' : 'no notices in force'),
            counts: { active_notices: active.length, weather_notices: weather.length, lines_named_in_weather_notices: lines.size, by_effect: effects },
            notices: [...new Map(weather.map(a => [tx(a.header_text) + '|' + tx(a.description_text), a])).values()].slice(0, 6).map(a => ({ header: excerpt(tx(a.header_text), 120), excerpt: excerpt(tx(a.description_text)), effect: a.effect, from: a.active_period?.[0]?.start ? iso(a.active_period[0].start * 1000) : null, to: a.active_period?.[0]?.end ? iso(a.active_period[0].end * 1000) : null })),
            link: 'https://www.carrismetropolitana.pt/', source: cmUrl, read: cm.rec.read, sha256: cm.rec.sha256,
        })
    } else items.push({ id: 'carris-metropolitana', operator: 'Carris Metropolitana', mode: 'bus', label: 'none', note: `did not answer (status ${cm.rec.status})`, source: cmUrl, read: cm.rec.read })

    // Transtejo/Soflusa (TTSL): the operator's own notices, its public WordPress API (robots.txt allows it).
    const ttUrl = 'https://ttsl.pt/wp-json/wp/v2/avisos?per_page=8&_fields=id,date_gmt,modified_gmt,link,title,content'
    const tt = await get('ttsl-avisos', ttUrl)
    if (Array.isArray(tt.data)) {
        const since = Date.now() - 3 * 86400e3
        const recent = tt.data.filter(a => Date.parse(a.modified_gmt + 'Z') >= since)
        items.push({
            id: 'ttsl', operator: 'Transtejo Soflusa (TTSL, Tagus ferries)', mode: 'ferry', label: 'fact',
            state: recent.length ? 'see the operator\'s notices below (newest first)' : 'no notice in the last three days',
            notices: recent.map(a => ({ title: strip(a.title?.rendered), excerpt: excerpt(a.content?.rendered), published: a.date_gmt + 'Z', updated: a.modified_gmt + 'Z', link: a.link })),
            link: 'https://ttsl.pt/passageiros/avisos-alteracoes-de-servico/', source: 'https://ttsl.pt/wp-json/wp/v2/avisos', read: tt.rec.read, sha256: tt.rec.sha256,
        })
    } else items.push({ id: 'ttsl', operator: 'Transtejo Soflusa', mode: 'ferry', label: 'none', note: `did not answer (status ${tt.rec.status})`, source: ttUrl, read: tt.rec.read })
    return items
}

const fl = await flights()
const sv = await services()
const updated = iso(Date.now())
const common = { by: BY, updated, not_a_warning_service: 'Not a warning service. No advice of ours: check with your airline or operator. For warnings follow IPMA and ANEPC.', sources_page: 'transport/sources.md' }
const flightsJ = {
    about: 'Airline flights at Lisbon, Porto, Faro and Funchal as OpenSky Network\'s public data shows them: counts only, never an aircraft. Facts are what the source shows; the caveat is our reading. Cancellations and diversions: no open source states them; the decisions recorded by incident.researcher@ are at data/decisions/entities/airport.json and tap.json.',
    ...common, attribution: OPENSKY_CITE, airports: fl,
}
const servicesJ = {
    about: 'Each operator\'s current state from its own notices where an open, machine-readable source exists, with short excerpts and the link. Operators without an open source (Metro, CP, Fertagus, Carris, the bridges, the airport) are in the decisions kept by incident.researcher@ (data/decisions/entities/), linked from the page.',
    ...common, operators: sv,
    decisions_elsewhere: ['airport', 'tap', 'metro', 'cp', 'ferries', 'bridges', 'tunnels', 'rede-expressos', 'flixbus', 'port'].map(e => `incidents/2026-11-10-storm-charles/data/decisions/entities/${e}.json`),
}
if (DRY) { console.log(JSON.stringify({ flightsJ, servicesJ }, null, 1).slice(0, 4000)); process.exit(0) }
writeJ(path.join(OUT, 'flights.json'), flightsJ)
writeJ(path.join(OUT, 'services.json'), servicesJ)
fs.mkdirSync(path.join(ROOT, 'transport'), { recursive: true })
fs.appendFileSync(path.join(ROOT, 'transport/reads.jsonl'), reads.map(r => JSON.stringify({ ...r, url: r.url.replace(/begin=\d+&end=\d+/, 'begin=…&end=…') })).join('\n') + '\n')
for (const f of ['flights.json', 'services.json']) { const s = fs.statSync(path.join(OUT, f)).size; if (s > 256 * 1024) { console.error(`${f} is ${s} bytes, over 256 KB`); process.exit(1) } }
console.log(`transport: ${fl.map(a => `${a.iata} dep ${a.departures_today.count ?? '—'} live ${a.live_snapshot.on_ground ?? '—'}/${a.live_snapshot.airborne_low ?? '—'}`).join(' · ')} · ${sv.map(s => `${s.id} ${s.label}`).join(' · ')} · store ${STORE}`)
