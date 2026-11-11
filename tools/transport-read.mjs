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
// Lusoponte's server sends the wrong intermediate certificate (its leaf is signed by Sectigo's "Public Server Authentication CA OV R36",
// it sends another), so verification fails where a browser would fetch the right one from the leaf's AIA address. We add that public
// intermediate (fetched from http://crt.sectigo.com/SectigoPublicServerAuthenticationCAOVR36.crt, 11 Nov 12:49 UTC; it chains to
// Sectigo's "Public Server Authentication Root R46", already trusted) as an extra CA. Verification stays on for every host.
const SECTIGO_OV_R36 = `-----BEGIN CERTIFICATE-----
MIIGTDCCBDSgAwIBAgIQLBo8dulD3d3/GRsxiQrtcTANBgkqhkiG9w0BAQwFADBf
MQswCQYDVQQGEwJHQjEYMBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTYwNAYDVQQD
Ey1TZWN0aWdvIFB1YmxpYyBTZXJ2ZXIgQXV0aGVudGljYXRpb24gUm9vdCBSNDYw
HhcNMjEwMzIyMDAwMDAwWhcNMzYwMzIxMjM1OTU5WjBgMQswCQYDVQQGEwJHQjEY
MBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTcwNQYDVQQDEy5TZWN0aWdvIFB1Ymxp
YyBTZXJ2ZXIgQXV0aGVudGljYXRpb24gQ0EgT1YgUjM2MIIBojANBgkqhkiG9w0B
AQEFAAOCAY8AMIIBigKCAYEApkMtJ3R06jo0fceI0M52B7K+TyMeGcv2BQ5AVc3j
lYt76TvHIu/nNe22W/RJXX9rWUD/2GE6GF5x0V4bsY7K3IeJ8E7+KzG/TGboySfD
u+F52jqQBbY62ofhYjMeiAbLI02+FqwHeM8uIrUtcX8b2RCxF358TB0NHVccAXZc
FYgZndZCeXxjuca7pJJ20LLUnXtgXcjAE1vY4WvbReW0W6mkeZyNGdmpTcFs5Y+s
yy6LtE5Zocji9J9NlNnReox2RWVyEXpA1ChZ4gqN+ZpVSIQ0HBorVFbBKyhdZyEX
gZgNSNtBRwxqwIzJePJhYd4ZUhO1vk+/uP3nwDk0p95q/j7naXNCSvESnrHPypaB
WRK066nKfPRPi9m9kIOhMdYfS8giFRTcdgL24Ycilj7ecAK9Trh0VbjwouJ4WH+x
bt47u68ZFCD/ac55I0DNHkCpaPruj6e9Rmr7K46wZDAYXuEAqB7tGG/jd6JAA+H2
O44CV98NRsU213f1kScIZntNAgMBAAGjggGBMIIBfTAfBgNVHSMEGDAWgBRWc1hk
lfmSGrASKgRieaFAFYghSTAdBgNVHQ4EFgQU42Z0u3BojSxdTg6mSo+bNyKcgpIw
DgYDVR0PAQH/BAQDAgGGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0lBBYwFAYI
KwYBBQUHAwEGCCsGAQUFBwMCMBsGA1UdIAQUMBIwBgYEVR0gADAIBgZngQwBAgIw
VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5zZWN0aWdvLmNvbS9TZWN0aWdv
UHVibGljU2VydmVyQXV0aGVudGljYXRpb25Sb290UjQ2LmNybDCBhAYIKwYBBQUH
AQEEeDB2ME8GCCsGAQUFBzAChkNodHRwOi8vY3J0LnNlY3RpZ28uY29tL1NlY3Rp
Z29QdWJsaWNTZXJ2ZXJBdXRoZW50aWNhdGlvblJvb3RSNDYucDdjMCMGCCsGAQUF
BzABhhdodHRwOi8vb2NzcC5zZWN0aWdvLmNvbTANBgkqhkiG9w0BAQwFAAOCAgEA
BZXWDHWC3cubb/e1I1kzi8lPFiK/ZUoH09ufmVOrc5ObYH/XKkWUexSPqRkwKFKr
7r8OuG+p7VNB8rifX6uopqKAgsvZtZsq7iAFw04To6vNcxeBt1Eush3cQ4b8nbQR
MQLChgEAqwhuXp9P48T4QEBSksYav7+aFjNySsLYlPzNqVM3RNwvBdvp6vgDtGwc
xlKQZVuuNVIaoYyls8swhxDeSHKpRdxRauTLZ+pl+wGvy0pnrLEJGSz9mOEmfbod
e/XopR2NGqaHJ6bIjyxPu6UtyQGI26En7UAEozACrHz06Nx2jTAY9E6NeB6XuobE
wLK025ZRmvglcURG1BrV24tGHHTgxCe8M3oGlpUSMTKQ2dkgljZVYt+gKdFtWELZ
MuRdi+X3XsrR8LFz+aLUiDRfQqhmw3RxjIyVKvvu9UPYY1nsvxYmFnUSeM+2q1z/
iPUry+xDY9MC6+IhleKT094VKdFVp7LXH42+wvU+17lRolQ2mK2N/nBLVBwaIhib
QXw4VYKwB86Bc6eS6iqsc94KEgD/U4VsjmgfhK+Xp4NM+VYzTTa3QeV3p8xOM0cw
q1p8oZFA+OBcz3FYWpDIe5j0NWKlw9hXsTyPY/HeZUV59akskSOSRSmDfe8wJDPX
58uB9/7lud0G3x0pxQAcffP0ayKavNwDTw4UfJ34cEw=
-----END CERTIFICATE-----`
if (!process.env.TRANSPORT_READ_CHILD) {
    const extra = path.join(os.tmpdir(), 'transport-read-ca.pem')
    let base = ''; try { if (process.env.NODE_EXTRA_CA_CERTS) base = fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS, 'utf8') } catch {}
    fs.writeFileSync(extra, base.trimEnd() + '\n' + SECTIGO_OV_R36 + '\n')
    const env = { ...process.env, TRANSPORT_READ_CHILD: '1', NODE_EXTRA_CA_CERTS: extra }
    if (process.env.HTTPS_PROXY || process.env.https_proxy) env.NODE_USE_ENV_PROXY = '1'
    const r = spawnSync(process.execPath, ['--no-warnings', ...process.argv.slice(1)], { stdio: 'inherit', env })
    process.exit(r.status ?? 1)
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'incidents/2026-11-10-storm-charles/data/transport')
const BY = 'incident.transport@web-summit.dinis'
const UA = 'storm-charles.promptugal.news newsroom reader (+https://storm-charles.promptugal.news/agents/; a few requests an hour)'
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i < 0 ? d : (process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : true) }
const STORE = path.resolve(arg('store', process.env.TRANSPORT_STORE || path.join(os.homedir(), 'transport-store')))
const DRY = !!arg('dry', false)
const sleep = ms => new Promise(r => setTimeout(r, ms))
const sha = b => crypto.createHash('sha256').update(b).digest('hex')
const iso = d => new Date(d).toISOString().replace(/\.\d+Z$/, 'Z')
const writeJ = (f, j) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(j, null, 1) + '\n') }
const ACC = { acute: '́', grave: '̀', tilde: '̃', circ: '̂', uml: '̈', cedil: '̧', ring: '̊' }
const NAMED = { nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ordm: 'º', ordf: 'ª', euro: '€', deg: '°', middot: '·', bull: '•' }
const ent = (_, n) => { if (n[0] === '#') return String.fromCodePoint(n[1] === 'x' || n[1] === 'X' ? parseInt(n.slice(2), 16) : +n.slice(1)); if (NAMED[n]) return NAMED[n]; const m = /^([A-Za-z])(acute|grave|tilde|circ|uml|cedil|ring)$/.exec(n); return m ? (m[1] + ACC[m[2]]).normalize('NFC') : ' ' }
const strip = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/&(#\d+|#[xX][0-9a-fA-F]+|[A-Za-z]+);/g, ent).replace(/\s+/g, ' ').trim()
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
    // returns { data (parsed JSON or null), rec, body }
    const t0 = Date.now(), read = iso(t0)
    let status = 0, body = '', err = null
    try {
        const r = await fetch(url, { headers: { 'user-agent': UA, accept: json ? 'application/json' : 'text/html,application/xhtml+xml' }, signal: AbortSignal.timeout(45000) })
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
    if (json && status === 200) { try { data = JSON.parse(body.replace(/^\uFEFF/, '')) } catch { rec.error = 'not JSON' } }
    await sleep(1500)
    return { data, rec, body }
}

async function flights() {
    const now = Date.now(), day0 = Date.UTC(new Date(now).getUTCFullYear(), new Date(now).getUTCMonth(), new Date(now).getUTCDate())
    const b = Math.floor(day0 / 1000), e = Math.floor(now / 1000)
    const out = []
    for (const ap of AIRPORTS) {
        const depUrl = `${OPENSKY}/flights/departure?airport=${ap.icao}&begin=${b}&end=${e}`
        const dep = await get(`opensky-dep-${ap.icao}`, depUrl)
        const hours = Array(24).fill(0); let airline = 0, other = 0; const byAirline = {}
        // OpenSky's anonymous answer covers only the last few hours (a rolling window), not the whole day. So the day is the
        // union of every reading kept today in the private store, each flight once (aircraft address + first seen, held in
        // memory only, never written to git).
        const seen = new Map(), dayDir = path.join(STORE, ...iso(now).slice(0, 10).split('-'))
        const addAll = arr => { for (const f of Array.isArray(arr) ? arr : []) if (f && f.firstSeen >= b) seen.set(f.icao24 + ':' + f.firstSeen, f) }
        let fromRead = Infinity
        try {
            for (const h of fs.readdirSync(dayDir)) for (const fn of fs.readdirSync(path.join(dayDir, h))) {
                if (!fn.startsWith(`opensky-dep-${ap.icao}-`)) continue
                try { const arr = JSON.parse(fs.readFileSync(path.join(dayDir, h, fn), 'utf8')); if (Array.isArray(arr)) { addAll(arr); for (const f of arr) fromRead = Math.min(fromRead, f.firstSeen) } } catch { }
            }
        } catch { }
        addAll(dep.data)
        if (Array.isArray(dep.data)) for (const f of dep.data) fromRead = Math.min(fromRead, f.firstSeen)
        const list = [...seen.values()]
        const covFrom = isFinite(fromRead) ? fromRead * 1000 : null, covHour = covFrom ? new Date(covFrom).getUTCHours() : null
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
            // Thin coverage: OpenSky saw (almost) no departure of any operator over 3+ covered hours. A zero there is the receivers' gap, not a closed airport: say so, draw nothing.
            departures_today: depOk && list.length < 3 && (covHour == null || new Date(now).getUTCHours() - covHour >= 3) ? {
                label: 'none', count: null, covered_from: covFrom ? iso(covFrom) : null, departures_seen_any_operator: list.length,
                note: `OpenSky's receivers detected ${list.length} departure${list.length === 1 ? '' : 's'} of any operator here ${covFrom ? 'since ' + iso(covFrom).slice(11, 16) + ' UTC' : 'in our readings today'}: its coverage at this airport is too thin to count. Not zero: unknown.`,
                source: `https://opensky-network.org/api/flights/departure?airport=${ap.icao}`, read: dep.rec.read, sha256: dep.rec.sha256,
            } : depOk ? {
                label: 'fact', what: 'airline departures OpenSky\'s receivers detected leaving this airport, in our readings today (OpenSky\'s anonymous answer covers only the last few hours, so hours before our first reading reaches back are not covered: null), by the hour of first detection (UTC)',
                count: airline, covered_from: covFrom ? iso(covFrom) : null,
                by_hour_utc: hours.slice(0, new Date(now).getUTCHours() + 1).map((n, h) => covHour == null || h < covHour ? null : n),
                window_note: 'The first covered hour may be partial. Counts are a floor: what OpenSky\'s receivers saw.',
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
            licence: 'Carris Metropolitana\'s network data is published on dados.gov.pt under CC BY (TML); the API itself states no licence',
        })
        // Live vehicles: how many buses report a position now (counts only; public buses, no person).
        const vUrl = 'https://api.carrismetropolitana.pt/v2/vehicles'
        const v = await get('carris-metropolitana-vehicles', vUrl)
        if (Array.isArray(v.data)) {
            const tnow = Date.now() / 1000, fresh = v.data.filter(x => tnow - (x.timestamp || 0) < 300)
            const lines = new Set(fresh.map(x => x.line_id).filter(Boolean))
            let prev = []; try { prev = (JSON.parse(fs.readFileSync(path.join(OUT, 'buses.json'), 'utf8')).operators || []).find(o => o.id === 'carris-metropolitana')?.vehicles_now?.series || [] } catch { }
            const point = { at: v.rec.read, vehicles: fresh.length, lines: lines.size }
            items[items.length - 1].vehicles_now = { label: 'fact', what: 'buses reporting a position in the last five minutes, and the lines they run, at the time read (our hourly readings form the series)', ...point, series: [...prev.filter(p => p.at !== point.at), point].slice(-96), source: vUrl, read: v.rec.read, sha256: v.rec.sha256, baseline: { label: 'none', note: 'No normal-day figure yet; from tomorrow the series compares the same hour.' } }
        }
    } else items.push({ id: 'carris-metropolitana', operator: 'Carris Metropolitana', mode: 'bus', label: 'none', note: `did not answer (status ${cm.rec.status})`, source: cmUrl, read: cm.rec.read })

    // STCP (Porto buses): real-time positions on Porto Digital's urban platform (dados.gov.pt, CC0). Counts only; public buses, no person.
    const stUrl = 'https://broker.fiware.urbanplatform.portodigital.pt/v2/entities?q=vehicleType==bus&limit=1000'
    const st = await get('stcp-vehicles', stUrl)
    if (Array.isArray(st.data)) {
        const tnow = Date.now(), fresh = st.data.filter(x => tnow - Date.parse(x.observationDateTime?.value || 0) < 300e3)
        const route = x => ((x.annotations?.value || []).find(a => /^stcp:route:/.test(a)) || '').slice(11)
        const lines = new Set(fresh.map(route).filter(Boolean))
        let prev = []; try { prev = (JSON.parse(fs.readFileSync(path.join(OUT, 'buses.json'), 'utf8')).operators || []).find(o => o.id === 'stcp')?.vehicles_now?.series || [] } catch { }
        const point = { at: st.rec.read, vehicles: fresh.length, lines: lines.size }
        items.push({
            id: 'stcp', operator: 'STCP (buses, Porto)', mode: 'bus', label: 'fact', state: fresh.length ? 'buses reporting positions' : 'no bus reported a position in the last five minutes',
            vehicles_now: { label: 'fact', what: 'buses reporting a position in the last five minutes, and the lines they run, at the time read (our hourly readings form the series)', ...point, series: [...prev.filter(p => p.at !== point.at), point].slice(-96), source: stUrl, read: st.rec.read, sha256: st.rec.sha256, baseline: { label: 'none', note: 'No normal-day figure yet; from tomorrow the series compares the same hour.' } },
            notices: [], link: 'https://www.stcp.pt/', source: 'https://dados.gov.pt/datasets/urban-platform-bus-location/', read: st.rec.read, sha256: st.rec.sha256,
            licence: 'CC0 (dados.gov.pt, published by STCP through Porto Digital\'s urban platform)',
        })
    } else items.push({ id: 'stcp', operator: 'STCP (buses, Porto)', mode: 'bus', label: 'none', note: `did not answer (status ${st.rec.status})`, source: stUrl, read: st.rec.read })

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

// ---------- metro: each operator's own notices
const wpNotices = (arr, days = 7) => (Array.isArray(arr) ? arr : []).filter(a => Date.parse((a.modified_gmt || a.date_gmt) + 'Z') >= Date.now() - days * 86400e3)
    .map(a => ({ title: strip(a.title?.rendered), excerpt: excerpt(a.excerpt?.rendered || a.content?.rendered), published: a.date_gmt + 'Z', updated: (a.modified_gmt || a.date_gmt) + 'Z', link: a.link }))
const PT_MONTHS = { janeiro: 1, fevereiro: 2, 'março': 3, abril: 4, maio: 5, junho: 6, julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12 }
async function metro() {
    const ops = []
    // Metro de Lisboa: NOT read. Its terms (https://www.metrolisboa.pt/termos-e-condicoes-de-utilizacao/, clause 3, read
    // 11 Nov 12:08 UTC): content "só podem ser utilizados para informação pessoal" and none of it may be "publicado ... sem o
    // prévio consentimento escrito do ML". So we do not republish it; a person asks ML (listed for Dinis).
    ops.push({ id: 'metro-lisboa', operator: 'Metropolitano de Lisboa (Lisbon metro)', label: 'none', kind: 'not read: the operator\'s terms',
        note: 'Metro de Lisboa\'s terms of use allow its content for personal information only and forbid publishing it without its written consent, so we do not read it into this page. Its decisions as reported by the press are below (evidence). Asking Metro for consent, or for its line-status API key, is on Dinis\'s list.',
        terms: 'https://www.metrolisboa.pt/termos-e-condicoes-de-utilizacao/', link: 'https://www.metrolisboa.pt/', read: iso(Date.now()) })
    // Metro do Porto: its own news, server-rendered on its site (robots.txt disallows nothing).
    const mpUrl = 'https://www.metrodoporto.pt/'
    const mp = await get('metrodoporto-home', mpUrl, { json: false })
    if (mp.rec.status === 200) {
        const ids = [...new Set([...mp.body.matchAll(/href="\/pages\/630\?news_id=(\d+)"/g)].map(m => +m[1]))].sort((a, b) => b - a).slice(0, 2)
        const notices = []
        for (const id of ids) {
            const u = `https://www.metrodoporto.pt/pages/630?news_id=${id}`
            const n = await get(`metrodoporto-news-${id}`, u, { json: false })
            if (n.rec.status !== 200) continue
            const flat = strip(n.body.replace(/<(style|script)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' | ')).replace(/(\s*\|\s*)+/g, ' | ')
            const m = /\| ([^|]{10,200}) \| (\d{1,2}) \| ([A-Za-zçÇ]+) \| (20\d\d) \| \1 \| ([^|]{20,})/.exec(flat)
            if (!m) continue
            const mo = PT_MONTHS[m[3].toLowerCase()]
            notices.push({ title: m[1].trim(), excerpt: excerpt(m[5]), published: mo ? `${m[4]}-${String(mo).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}` : null, link: u })
        }
        ops.push({ id: 'metro-porto', operator: 'Metro do Porto', label: 'fact', kind: "operator's own site (its news pages)", state: notices.length ? 'see the operator\'s newest notices below' : 'no notice found on its home page', notices, link: mpUrl, source: mpUrl, read: mp.rec.read, sha256: mp.rec.sha256, note: 'Metro do Porto gives the day of a notice, not its time.' })
    } else ops.push({ id: 'metro-porto', operator: 'Metro do Porto', label: 'none', note: `did not answer (status ${mp.rec.status})`, source: mpUrl, read: mp.rec.read })
    // Metro Transportes do Sul (MTS, the light rail south of the Tagus): its public WordPress API (robots.txt disallows nothing).
    const mtsUrl = 'https://www.mts.pt/wp-json/wp/v2/posts?per_page=6&_fields=id,date_gmt,modified_gmt,link,title,excerpt'
    const mts = await get('mts-posts', mtsUrl)
    ops.push(Array.isArray(mts.data) ? {
        id: 'mts', operator: 'Metro Transportes do Sul (MTS, light rail, Almada and Seixal)', label: 'fact', kind: "operator's own site (public WordPress API)",
        state: wpNotices(mts.data).length ? 'see the operator\'s notices below' : 'no notice in the last seven days', notices: wpNotices(mts.data),
        link: 'https://www.mts.pt/', source: 'https://www.mts.pt/wp-json/wp/v2/posts', read: mts.rec.read, sha256: mts.rec.sha256,
    } : { id: 'mts', operator: 'MTS', label: 'none', note: `did not answer (status ${mts.rec.status})`, source: mtsUrl, read: mts.rec.read })
    return ops
}

// ---------- trains: each operator's own page
const lisbonToUtc = (y, mo, d, h, mi) => {   // Lisbon wall clock -> UTC ISO (WET/WEST from Intl, not assumed)
    const guess = Date.UTC(y, mo - 1, d, h, mi), f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    const [lh, lm] = f.format(new Date(guess)).split(':').map(Number), off = ((lh * 60 + lm) - (h * 60 + mi) + 1440 * 1.5) % 1440 - 720
    return iso(guess - off * 60e3)
}
async function trains() {
    const items = []
    // Fertagus (Lisbon-Setúbal over the 25 de Abril bridge): its own "Informação ao Público" page, a timed log for the day. robots.txt allows the path.
    const fUrl = 'https://www.fertagus.pt/Fertagus-pt/Viajar/Comunicados-e-Campanhas/Informa%C3%A7%C3%A3o-ao-P%C3%BAblico'
    const f = await get('fertagus-info-publico', fUrl, { json: false })
    if (f.rec.status === 200 && f.body) {
        const lines = f.body.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<(br|\/p|\/div|\/li|\/h\d)[^>]*>/gi, '\n').split('\n').map(strip).filter(Boolean)
        const notices = []; let day = null
        for (const l of lines) {
            const dm = /^(\d{1,2}) de ([a-zç]+) de (\d{4})$/i.exec(l)
            if (dm && PT_MONTHS[dm[2].toLowerCase()]) { day = [+dm[3], PT_MONTHS[dm[2].toLowerCase()], +dm[1]]; continue }
            if (!day) continue
            const tm = /^(\d{1,2}):(\d{2})\s*[-–]\s*(.+)$/.exec(l)
            if (tm) notices.push({ at: lisbonToUtc(...day, +tm[1], +tm[2]), local: `${tm[1].padStart(2, '0')}:${tm[2]}`, excerpt: excerpt(tm[3], 200) })
            else if (l.length > 60 && notices.length < 40 && !/cookies|navega|direitos/i.test(l)) notices.push({ day: `${day[0]}-${String(day[1]).padStart(2, '0')}-${String(day[2]).padStart(2, '0')}`, excerpt: excerpt(l, 220) })
            if (/^Nesta página encontra/i.test(l)) break
        }
        const since = Date.now() - 3 * 86400e3, keep = notices.filter(n => Date.parse(n.at || n.day + 'T23:59:59Z') >= since).sort((a, b) => (b.at ? 1 : 0) - (a.at ? 1 : 0)).slice(0, 8)   // timed entries first (page order, newest first), then the day's notes
        const latest = keep.find(n => n.at)
        items.push({
            id: 'fertagus', operator: 'Fertagus (trains, Lisbon to Setúbal over the 25 de Abril bridge)', mode: 'train', label: latest ? 'fact' : 'none',
            state: latest ? `its latest entry, ${latest.local} Lisbon time: ${latest.excerpt}` : 'no timed entry found on its page',
            notices: keep.map(n => ({ title: n.at ? n.local + ' Lisbon time' : 'Note for ' + +n.day.slice(8) + ' Nov', excerpt: n.excerpt, published: n.at || null })),
            link: fUrl, source: fUrl, read: f.rec.read, sha256: f.rec.sha256, kind: 'its own public-information page (a timed log; short excerpts, the page one click away)',
            licence: 'No terms of use found beyond "all rights reserved": short excerpts with the link',
            ...(latest ? {} : { note: 'its page answered, but no timed entry was found' }),
        })
    } else items.push({ id: 'fertagus', operator: 'Fertagus (trains)', mode: 'train', label: 'none', note: `did not answer (status ${f.rec.status})`, source: fUrl, read: f.rec.read })
    return items
}

// ---------- bridges: Lusoponte's own notices ("destaques") on its site. robots.txt allows everything; no terms of use found
// (a privacy and a cookie policy only): short excerpts with the link. The homepage lists the notices newest first; we read the
// first three and keep those dated in the last three days. Its "Atualização: 11 de novembro, 11h30" line is Lisbon time.
const EN_MONTHS = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 }
async function bridges() {
    const items = [], LP = 'https://www.lusoponte.pt'
    const home = await get('lusoponte-home', LP + '/', { json: false })
    if (home.rec.status !== 200 || !home.body) {
        items.push({ id: 'lusoponte', operator: 'Lusoponte (25 de Abril and Vasco da Gama bridges)', mode: 'bridge', label: 'none', note: `its site did not answer (status ${home.rec.status}${home.rec.error ? ', ' + home.rec.error : ''})`, source: LP + '/', read: home.rec.read })
        return items
    }
    const slugs = [...new Set([...home.body.matchAll(/<h3>\s*<a href="(\/destaques\/[a-z0-9-]+)"/g)].map(m => m[1]))].slice(0, 3)
    const notices = []; let lastRead = home.rec
    for (const sl of slugs) {
        const p = await get('lusoponte-destaque', LP + sl, { json: false }); lastRead = p.rec
        if (p.rec.status !== 200 || !p.body) continue
        const art = p.body.slice(p.body.indexOf('news-article-row'), p.body.indexOf('Outros destaques') > 0 ? p.body.indexOf('Outros destaques') : undefined)
        const title = strip((/<h1>([\s\S]*?)<\/h1>/.exec(art) || [])[1])
        const dm = /<time>\s*([A-Za-z]+) (\d{1,2})\w{0,2}, (\d{4})\s*<\/time>/.exec(art)
        const day = dm && EN_MONTHS[dm[1].toLowerCase()] ? [+dm[3], EN_MONTHS[dm[1].toLowerCase()], +dm[2]] : null
        const bodyHtml = art.slice(Math.max(0, art.indexOf('template-simplepage-text')))
        let text = strip(bodyHtml.replace(/^[^>]*>/, ''))
        const up = /Atualiza[çc][ãa]o:\s*(\d{1,2}) de ([a-zç]+),?\s*(\d{1,2})h(\d{2})/i.exec(text)
        const updated = up && day && PT_MONTHS[up[2].toLowerCase()] ? lisbonToUtc(day[0], PT_MONTHS[up[2].toLowerCase()], +up[1], +up[3], +up[4]) : null
        if (up) text = text.slice(up.index + up[0].length).trim()
        if (!day) continue
        const dayIso = `${day[0]}-${String(day[1]).padStart(2, '0')}-${String(day[2]).padStart(2, '0')}`
        notices.push({ title, published_day: dayIso, updated, ...(up ? { updated_local: `${up[1]} ${Object.keys(EN_MONTHS)[PT_MONTHS[up[2].toLowerCase()] - 1].replace(/^./, c => c.toUpperCase())}, ${up[3].padStart(2, '0')}:${up[4]} Lisbon time` } : {}), excerpt: excerpt(text, 400), link: LP + sl, read: p.rec.read, sha256: p.rec.sha256 })
    }
    const since = Date.now() - 3 * 86400e3
    const keep = notices.filter(n => Date.parse(n.updated || n.published_day + 'T23:59:59Z') >= since)
    const latest = keep[0]
    items.push({
        id: 'lusoponte', operator: 'Lusoponte (25 de Abril and Vasco da Gama bridges)', mode: 'bridge', label: keep.length ? 'fact' : 'none',
        state: latest ? `its newest notice${latest.updated_local ? ', updated ' + latest.updated_local : ''}: ${latest.title}` : 'no notice in the last three days on its site',
        notices: keep.map(n => ({ title: n.title, excerpt: n.excerpt, published: n.updated || null, published_day: n.published_day, link: n.link, read: n.read, sha256: n.sha256 })),
        link: LP + '/', source: LP + '/', read: home.rec.read, sha256: home.rec.sha256, kind: 'its own notices ("destaques") on its site; short excerpts, the notice one click away',
        licence: 'No terms of use found (a privacy and a cookie policy only); robots.txt allows all: short excerpts with the link',
        ...(keep.length ? {} : { note: 'its site answered; no notice dated in the last three days' }),
    })
    return items
}

// ---------- ANA's own newsroom (en.newsroom.ana.pt): its "update by airport" statements, the airport operator's figures
// (scheduled movements, cancelled in advance, operated, cancelled during the day). robots.txt disallows only one folder.
// ANA's terms (ana.pt, "Intellectual property rights") do not allow reproducing its information without consent, so we
// carry the figures as numbers with ANA named and the link, and copy none of its text. Times on its pages are Lisbon time.
const ANA_AIRPORTS = { Lisbon: 'LIS', Porto: 'OPO', Faro: 'FAO', Madeira: 'FNC' }
async function ana() {
    const NR = 'https://en.newsroom.ana.pt/'
    const home = await get('ana-newsroom-home', NR, { json: false })
    if (home.rec.status !== 200 || !home.body) return { label: 'none', note: `ANA's newsroom did not answer (status ${home.rec.status})`, source: NR, read: home.rec.read }
    const links = [...new Set([...home.body.matchAll(/href="((?:https:)?\/\/en\.newsroom\.ana\.pt\/news\/[^"]*(?:adverse-weather|update-by-airport)[^"]*\.html)"/g)].map(m => m[1].replace(/^\/\//, 'https://')))]
    for (const url of links.slice(0, 2)) {
        const p = await get('ana-newsroom-update', url, { json: false })
        if (p.rec.status !== 200 || !p.body) continue
        const pub = (/article:published_time" content="([^"]+)"/.exec(p.body) || [])[1]
        const published = pub ? iso(Date.parse(pub)) : null
        const title = strip((/<title>([\s\S]*?)<\/title>/.exec(p.body) || [])[1]).replace(/\s*[-|]\s*ANA.*$/i, '')
        const text = strip(p.body.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' '))
        const at = /situation at each airport at (\d{1,2}):(\d{2})/i.exec(text) || /Operational data updated at (\d{1,2}):(\d{2})/i.exec(text)
        const d = published ? new Date(published) : null
        const situation_at = at && d ? lisbonToUtc(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(), +at[1], +at[2]) : null
        const airports = {}
        for (const [name, iata] of Object.entries(ANA_AIRPORTS)) {
            const m = new RegExp(name + ':\\s*(\\d+) scheduled movements, of which (\\d+) were cancelled in advance and (\\d+) remained scheduled\\.\\s*([^.]*)\\.', 'i').exec(text)
            if (!m) continue
            const rest = m[4], num = re => { const x = re.exec(rest); return x ? +x[1] : null }
            airports[iata] = {
                scheduled: +m[1], cancelled_in_advance: +m[2], remained_scheduled: +m[3],
                operated: /no movements had been operated/i.test(rest) ? 0 : num(/(\d+) movements? had been operated/i),
                cancelled_during_day: /no additional cancellations/i.test(rest) ? 0 : num(/(\d+) additional cancellations?/i),
                ...(iata === 'FNC' ? { scope: 'Madeira\'s airports together (Funchal and Porto Santo), as ANA gives them' } : {}),
            }
        }
        if (!Object.keys(airports).length) continue
        return { label: 'fact', operator: 'ANA Aeroportos de Portugal (the airport operator)', title, published, situation_at, airports, unit: 'aircraft movements (departures and arrivals together)', link: url, source: NR, read: p.rec.read, sha256: p.rec.sha256,
            licence: 'ANA\'s terms do not allow reproducing its information without consent: the figures only, as numbers, with ANA named and the link; none of its text' }
    }
    return { label: 'none', note: 'ANA\'s newsroom answered; no "update by airport" statement with figures found among its newest', source: NR, read: home.rec.read }
}

// --only bridges: read and write just that mode (e.g. in a fresh container before the raw store is cloned, when a full run
// would rebuild flights.json from this one reading and lose the day's coverage).
if (arg('only', '') === 'bridges') {
    const br = await bridges(), updated = iso(Date.now())
    const j = { about: 'Bridges and tunnels: each operator\'s own site, feed or open API first; the press only where the operator publishes nothing readable (those are the researcher\'s decisions, linked). Short excerpts with the link.', mode: 'bridges', by: BY, updated, not_a_warning_service: 'Not a warning service. No advice of ours. Your airline or operator decides whether your flight or service runs: its site or app has the latest. For warnings follow IPMA and ANEPC.', sources_page: 'transport/sources.md', operators: br, decisions_elsewhere: ['bridges', 'tunnels'].map(e => `incidents/2026-11-10-storm-charles/data/decisions/entities/${e}.json`) }
    if (DRY) { console.log(JSON.stringify(j, null, 1)); process.exit(0) }
    writeJ(path.join(OUT, 'bridges.json'), j)
    fs.appendFileSync(path.join(ROOT, 'transport/reads.jsonl'), reads.map(r => JSON.stringify(r)).join('\n') + '\n')
    console.log(`transport (bridges only): ${br.map(s => `${s.id} ${s.label}${s.notices ? ' ' + s.notices.length : ''}`).join(' · ')} · store ${STORE}`)
    process.exit(0)
}
const fl = await flights()
const an = await ana()
if (an.label === 'fact') for (const a of fl) if (an.airports[a.iata]) a.ana = { ...an.airports[a.iata], situation_at: an.situation_at, published: an.published, link: an.link, read: an.read, label: 'fact' }
const tr = await trains()
const sv = await services()
const mt = await metro()
const br = await bridges()
const updated = iso(Date.now())
const common = { by: BY, updated, not_a_warning_service: 'Not a warning service. No advice of ours. Your airline or operator decides whether your flight or service runs: its site or app has the latest. For warnings follow IPMA and ANEPC.', sources_page: 'transport/sources.md' }
const flightsJ = {
    about: 'Airline flights at Lisbon, Porto, Faro and Funchal as OpenSky Network\'s public data shows them: counts only, never an aircraft. Facts are what the source shows; the caveat is our reading. Cancellations: ANA\'s own figures (scheduled, cancelled, operated movements) from its newsroom where it has published them (ana_statement, and ana on each airport); diversions: no open source states them; the decisions recorded by incident.researcher@ are at data/decisions/entities/airport.json and tap.json.',
    ...common, attribution: OPENSKY_CITE, ana_statement: an, airports: fl,
}
const servicesJ = {
    about: 'Each operator\'s current state from its own notices where an open, machine-readable source exists, with short excerpts and the link. Operators without an open source (Metro, CP, Fertagus, Carris, the bridges, the airport) are in the decisions kept by incident.researcher@ (data/decisions/entities/), linked from the page.',
    ...common, operators: sv,
    decisions_elsewhere: ['airport', 'tap', 'metro', 'cp', 'ferries', 'bridges', 'tunnels', 'rede-expressos', 'flixbus', 'port'].map(e => `incidents/2026-11-10-storm-charles/data/decisions/entities/${e}.json`),
}
if (DRY) { console.log(JSON.stringify({ ana: an, bridges: br })); console.log(JSON.stringify({ flightsJ, servicesJ }, null, 1).slice(0, 1500)); process.exit(0) }
writeJ(path.join(OUT, 'flights.json'), flightsJ)
writeJ(path.join(OUT, 'services.json'), servicesJ)
const modeJ = (mode, title, operators, decisions) => ({ about: `${title}: each operator's own site, feed or open API first; the press only where the operator publishes nothing readable (those are the researcher's decisions, linked). Short excerpts with the link.`, mode, ...common, operators, decisions_elsewhere: decisions.map(e => `incidents/2026-11-10-storm-charles/data/decisions/entities/${e}.json`) })
const MODES = { metro: modeJ('metro', 'Metro and light rail', mt, ['metro']), buses: modeJ('buses', 'Buses and trams', sv.filter(o => o.mode === 'bus'), []), ferries: modeJ('ferries', 'Ferries', sv.filter(o => o.mode === 'ferry'), ['ferries']), trains: modeJ('trains', 'Trains', tr, ['cp']), bridges: modeJ('bridges', 'Bridges and tunnels', br, ['bridges', 'tunnels']) }
for (const [m, j] of Object.entries(MODES)) writeJ(path.join(OUT, m + '.json'), j)
fs.mkdirSync(path.join(ROOT, 'transport'), { recursive: true })
fs.appendFileSync(path.join(ROOT, 'transport/reads.jsonl'), reads.map(r => JSON.stringify({ ...r, url: r.url.replace(/begin=\d+&end=\d+/, 'begin=…&end=…') })).join('\n') + '\n')
for (const f of ['flights.json', 'services.json', 'metro.json', 'buses.json', 'ferries.json', 'trains.json', 'bridges.json']) { const s = fs.statSync(path.join(OUT, f)).size; if (s > 256 * 1024) { console.error(`${f} is ${s} bytes, over 256 KB`); process.exit(1) } }
console.log(`transport: ${fl.map(a => `${a.iata} dep ${a.departures_today.count ?? '—'} live ${a.live_snapshot.on_ground ?? '—'}/${a.live_snapshot.airborne_low ?? '—'}`).join(' · ')} · ${[...sv, ...mt, ...tr, ...br].map(s => `${s.id} ${s.label}${s.notices ? ' ' + s.notices.length : ''}`).join(' · ')} · store ${STORE}`)
