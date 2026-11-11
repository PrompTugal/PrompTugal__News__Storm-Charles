#!/usr/bin/env node
// From the latest read of IPMA's open data (the store that tools/ipma-read.mjs fills) to the small files the pages draw:
//   node tools/ipma-views.mjs [--store DIR]
// Writes sources/ipma/data/*.json (each well under 256 KB) and sources/ipma/nodes.json. Every file says which of IPMA's
// files it was made from, with that file's sha256 and the UTC time we read it. Nothing here is a forecast or a judgement of
// ours: values are IPMA's, reshaped; where we compute (a daily sum from hourly values, the nearest station to a city), the
// field says so. Files that keep history (warnings, forecasts as issued, daily sums) are carried forward from the copy in git.
// Kept by incident.ipma@web-summit.dinis.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'sources/ipma'), OUT = path.join(SRC, 'data')
const BY = 'incident.ipma@web-summit.dinis', BASE = 'https://api.ipma.pt/open-data/'
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i < 0 ? d : process.argv[i + 1] }
const STORE = path.resolve(arg('store', process.env.IPMA_STORE || path.join(os.homedir(), 'ipma-store')), 'ipma/latest')
const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')) } catch { return d } }
const latest = readJ(path.join(SRC, 'latest.json'), { files: {} }).files
const raw = name => { try { return JSON.parse(fs.readFileSync(path.join(STORE, name), 'utf8')) } catch { return null } }
const from = (...names) => names.filter(n => latest[n]).map(n => ({ url: BASE + n, sha256: latest[n].sha256, read_utc: latest[n].read_utc, last_modified: latest[n].last_modified }))
const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z')
const num = v => { const x = +v; return v === null || v === undefined || v === '' || !isFinite(x) || x <= -99 ? null : x }
const sha6 = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 6)
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const write = (name, about, sources, body, compact = false) => {
    const j = { about, label: 'fact: IPMA\'s values, reshaped by us; computed fields say so', from: sources, by: BY, updated: now, ...body }
    const s = (compact ? JSON.stringify(j) : JSON.stringify(j, null, 1)) + '\n'
    if (s.length > 250000) throw new Error(`${name}: ${s.length} bytes, too big for git`)
    fs.mkdirSync(OUT, { recursive: true }); fs.writeFileSync(path.join(OUT, name), s); console.log(`${name}: ${s.length} bytes`)
}
const region = lon => lon < -20 ? 'azores' : lon < -12 ? 'madeira' : 'mainland'
const km = (a, b) => { const R = 6371, r = Math.PI / 180, dLat = (b[1] - a[1]) * r, dLon = (b[0] - a[0]) * r, x = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(x)) }

// ---------------------------------------------------------------- places, areas, the sea's places, municipalities
const P = raw('distrits-islands.json')?.data || [], SP = raw('sea-locations.json') || [], ST = raw('observation/meteorology/stations/stations.json') || []
const W = raw('forecast/warnings/warnings_www.json') || []
// A warning area's name: IPMA's id tables give codes only. For a district it is the first place IPMA lists in it; the
// seven island areas are named by us from IPMA's public warnings page wording (marked name_by: "us").
const ISLANDS = { MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountain regions', MPS: 'Porto Santo', AOR: 'Azores, eastern group', ACE: 'Azores, central group', AOC: 'Azores, western group' }
const areaCodes = [...new Set([...P.map(p => p.idAreaAviso), ...SP.map(p => p.idAreaAviso), ...W.map(w => w.idAreaAviso)])].sort()
const areas = areaCodes.map(code => {
    const ps = P.filter(p => p.idAreaAviso === code), first = ps[0]
    const pts = [...ps, ...SP.filter(p => p.idAreaAviso === code)].map(p => [+p.longitude, +p.latitude])
    const guess = { MCN: [-17.0, 32.82], MRM: [-16.95, 32.75] }[code]
    const at = pts.length ? [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length] : guess || null
    return { id: code, node: 'ipma-area-' + code, name: ISLANDS[code] || first?.local || code, name_by: ISLANDS[code] ? 'us (IPMA\'s id tables carry the code only)' : 'IPMA (the first place it lists in the area)', region: first ? ['', 'mainland', 'madeira', 'azores'][first.idRegiao] : code[0] === 'M' ? 'madeira' : code[0] === 'A' ? 'azores' : 'mainland', in_id_table: ps.length > 0, places: ps.map(p => p.globalIdLocal), sea_places: SP.filter(p => p.idAreaAviso === code).map(p => p.globalIdLocal), label_at: at && at.map(x => +x.toFixed(4)), label_at_by: pts.length ? 'the mean of the area\'s places in IPMA\'s tables (a spot for a label, not a border)' : 'placed by us for the drawing (the area has no place in IPMA\'s tables)' }
})
const rcm = [0, 1, 2].map(d => raw(`forecast/meteorology/rcm/rcm-d${d}.json`))
const munis = Object.values(rcm[0]?.local || {}).map(m => ({ dico: m.dico, lon: m.longitude, lat: m.latitude, rcm: rcm.map(r => r?.local?.[m.dico]?.data?.rcm ?? null) }))
write('places.json', "IPMA's places: the 25 warning areas (districts, island groups, parts of Madeira), the places it forecasts for, the coastal places of the sea forecast, and a point for each mainland municipality (from the fire-risk files, with the risk class for today and the next two days). Coordinates are IPMA's.", from('distrits-islands.json', 'sea-locations.json', 'forecast/warnings/warnings_www.json', 'forecast/meteorology/rcm/rcm-d0.json', 'forecast/meteorology/rcm/rcm-d1.json', 'forecast/meteorology/rcm/rcm-d2.json'), {
    areas,
    places: P.map(p => ({ id: p.globalIdLocal, node: 'ipma-place-' + p.globalIdLocal, name: p.local, area: p.idAreaAviso, region: ['', 'mainland', 'madeira', 'azores'][p.idRegiao], district: p.idDistrito, lon: +p.longitude, lat: +p.latitude })),
    sea_places: SP.map(p => ({ id: p.globalIdLocal, node: 'ipma-sea-place-' + p.globalIdLocal, name: p.local, area: p.idAreaAviso, region: ['', 'mainland', 'madeira', 'azores'][p.idRegiao], lon: +p.longitude, lat: +p.latitude })),
    fire_risk: { days: rcm.map(r => r?.dataPrev || null), run: rcm[0]?.dataRun || null, classes: { 1: 'low', 2: 'moderate', 3: 'high', 4: 'very high', 5: 'maximum' } },
    municipalities: munis
}, true)

// ---------------------------------------------------------------- stations and the last 24 hours
const OBS = raw('observation/meteorology/stations/observations.json') || {}
const hours = Object.keys(OBS).sort()
const stations = ST.map(f => ({ id: f.properties.idEstacao, node: 'ipma-station-' + f.properties.idEstacao, name: f.properties.localEstacao, lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1], region: region(f.geometry.coordinates[0]) }))
const K = { t: 'temperatura', w: 'intensidadeVentoKM', d: 'idDireccVento', r: 'precAcumulada', h: 'humidade', p: 'pressao' }
const series = {}
for (const s of stations) {
    const o = {}; let any = false
    for (const [k, f] of Object.entries(K)) { o[k] = hours.map(hh => { const v = num(OBS[hh]?.[s.id]?.[f]); if (v !== null) any = true; return k === 'd' && v === 0 ? null : v }) }
    if (any) series[s.id] = o
}
write('stations.json', "IPMA's weather stations (id, name, coordinates as IPMA gives them) and whether each reported in the last 24 hours read. 'region' is ours, from the longitude.", from('observation/meteorology/stations/stations.json', 'observation/meteorology/stations/observations.json'), { count: stations.length, reporting: Object.keys(series).length, stations: stations.map(s => ({ ...s, reporting: !!series[s.id] })) }, true)
write('observations.json', "The last 24 hours of IPMA's hourly station observations, as arrays in the order of 'hours'. t: air temperature (°C, mean of the hour); w: wind speed at 10 m (km/h; the mean, not gusts: IPMA's open data carries no gusts); d: wind direction class (1 or 9 N, 2 NE, 3 E, 4 SE, 5 S, 6 SW, 7 W, 8 NW); r: precipitation in the hour (mm); h: relative humidity (%); p: pressure at sea level (hPa). null is IPMA's -99.0 (no data). The hour label's convention is not documented by IPMA (see api.json).", from('observation/meteorology/stations/observations.json'), { hours, hour_label: 'as IPMA writes it: no zone, and IPMA does not say whether the hour starts or ends at the label', fields: K, stations: series }, true)

// daily figures per station, computed by us from the hourly values, kept across reads (the fullest count of hours wins)
const dailyF = path.join(OUT, 'observed-daily.json'), daily = readJ(dailyF, { days: {} }).days || {}
for (const [id, o] of Object.entries(series)) {
    const byDay = {}
    hours.forEach((hh, i) => { const d = hh.slice(0, 10), b = byDay[d] || (byDay[d] = { n: 0, t: [], w: [], r: [] }); b.n++; for (const k of ['t', 'w', 'r']) if (o[k][i] !== null) b[k].push(o[k][i]) })
    for (const [d, b] of Object.entries(byDay)) {
        const cur = daily[d]?.[id]
        if (cur && cur[0] >= b.n) continue
        const r1 = x => x === null ? null : +x.toFixed(1)
        ;(daily[d] || (daily[d] = {}))[id] = [b.n, b.t.length ? Math.min(...b.t) : null, b.t.length ? Math.max(...b.t) : null, b.r.length ? r1(b.r.reduce((s, x) => s + x, 0)) : null, b.w.length ? Math.max(...b.w) : null, b.r.length]
    }
}
for (const d of Object.keys(daily).sort().slice(0, -8)) delete daily[d]
write('observed-daily.json', "Per day and station, computed by us from IPMA's hourly observations (not an IPMA product): [hours of the day present in the 24-hour file when read, lowest hourly mean temperature (°C), highest hourly mean temperature (°C), precipitation summed over the hours present (mm), highest hourly mean wind (km/h), hours with a precipitation value]. A day is the date in IPMA's hour label. The hourly means are not the day's true minimum and maximum, so these are not what IPMA's tMin and tMax forecast: read them side by side with that in mind. A day with fewer than 24 hours is incomplete: IPMA's file holds 24 hours only, so a day is whole only if a read fell in the hour after its last label.", from('observation/meteorology/stations/observations.json'), { computed: true, columns: ['hours', 't_low_hourly_mean', 't_high_hourly_mean', 'rain_sum_mm', 'wind_high_hourly_mean_kmh', 'rain_hours'], days: daily }, true)

// ---------------------------------------------------------------- the warnings: every one we have seen, from first read to last
const wf = latest['forecast/warnings/warnings_www.json'], WF = path.join(OUT, 'warnings.json')
const led = readJ(WF, { instances: [], reads: [] })
if (wf && W.length && !led.reads.some(r => r.sha256 === wf.sha256 && r.read_utc === wf.read_utc)) {
    const first = led.reads.length === 0, seen = new Set(), fresh = []
    for (const w of W) {
        if (w.awarenessLevelID === 'green') continue
        const key = [w.idAreaAviso, w.awarenessTypeName, w.awarenessLevelID, w.startTime, w.endTime, sha6(w.text || '')].join('|')
        seen.add(key)
        let it = led.instances.find(x => x.key === key)
        if (!it) {
            it = { id: `w-${w.idAreaAviso}-${slug(w.awarenessTypeName)}-${w.startTime.slice(5, 16).replace(/[-:]/g, '')}-${sha6(key)}`, key, area: w.idAreaAviso, type: w.awarenessTypeName, level: w.awarenessLevelID, start: w.startTime, end: w.endTime, text_pt: w.text, first_read_utc: wf.read_utc, first_last_modified: wf.last_modified, there_at_our_first_read: first || undefined, replaces: [] }
            led.instances.push(it); fresh.push(it)
        } else if (it.gone_read_utc) { it.returned = (it.returned || 0) + 1; delete it.gone_read_utc; delete it.gone_last_modified; delete it.gone; delete it.replaced_by }
        it.last_read_utc = wf.read_utc
    }
    for (const it of led.instances) {
        if (seen.has(it.key) || it.gone_read_utc) continue
        it.gone_read_utc = wf.read_utc; it.gone_last_modified = wf.last_modified
        const over = fresh.filter(n => n.area === it.area && n.type === it.type && n.start < it.end && n.end > it.start)
        it.gone = it.end + 'Z' <= wf.read_utc ? 'ended' : over.length ? 'replaced' : 'withdrawn'
        if (over.length) { it.replaced_by = over.map(n => n.id); for (const n of over) n.replaces.push(it.id) }
    }
    led.reads.push({ read_utc: wf.read_utc, last_modified: wf.last_modified, sha256: wf.sha256, rows: W.length, not_green: seen.size, new: first ? 0 : fresh.length })
    led.reads = led.reads.slice(-400)
}
const lv = { yellow: 1, orange: 2, red: 3 }
write('warnings.json', "Every IPMA warning above green that we have read, each with the reads that bracket it: first_read_utc (the first of our reads that carried it) and last_read_utc; gone_read_utc is the first read that no longer carried it, and 'gone' says how: ended (its window was over), replaced (a new row for the same area and type overlapping its window appeared in that read: see replaced_by) or withdrawn (nothing took its place). IPMA's feed has no time of issue and no identifier: a changed warning is a new row, so 'replaced' is our pairing by area, type and window, and the true time of the change lies between the two reads (first_last_modified, IPMA's own header on the file, narrows it). Warnings marked there_at_our_first_read were issued before we began reading (11 November 2026, 02:2x UTC): their earlier history is in incidents/2026-11-10-storm-charles/data/weather/warnings.json (incident.meteorologist@). Times of the windows are as IPMA writes them (no zone; Lisbon and Madeira are on UTC in November, the Azores on UTC-1).", from('forecast/warnings/warnings_www.json'), {
    levels: ['yellow', 'orange', 'red'], types: [...new Set(W.map(w => w.awarenessTypeName))].sort(),
    now: { read_utc: wf?.read_utc, by_area: Object.fromEntries(areaCodes.map(a => { const act = led.instances.filter(i => i.area === a && !i.gone_read_utc); return [a, { peak: act.reduce((m, i) => lv[i.level] > (lv[m] || 0) ? i.level : m, 'green'), count: act.length }] })) },
    window_zone: "start_utc and end_utc are start and end with Z appended: our reading, not IPMA's statement. IPMA writes no zone on a warning's window; its documentation says forecast times are UTC and says nothing for warnings. On the mainland and Madeira in winter local time is UTC, so nothing turns on it there; for the Azores (AOR, ACE, AOC) the window may be local time (UTC-1): unconfirmed.",
    reads: led.reads, instances: led.instances.map(i => ({ ...i, start_utc: i.start + 'Z', end_utc: i.end + 'Z' })).sort((a, b) => a.area.localeCompare(b.area) || a.type.localeCompare(b.type) || a.start.localeCompare(b.start))
})

// ---------------------------------------------------------------- the sea, and the cities' forecasts as issued
function issued(file, key, rows, pick, readAt) {      // keep each change of a forecast, by place and day
    const cur = readJ(path.join(OUT, file), { series: {} }).series || {}
    for (const r of rows) {
        const k = key(r), v = pick(r), list = cur[k] || (cur[k] = [])
        const lastV = list.at(-1)
        if (!lastV || JSON.stringify(lastV.v) !== JSON.stringify(v)) list.push({ read_utc: readAt(r), file_updated: r._upd, v })
        else lastV.last_read_utc = readAt(r)
    }
    const days = [...new Set(Object.keys(cur).map(k => k.split('|')[1]))].sort().slice(-12)
    for (const k of Object.keys(cur)) if (!days.includes(k.split('|')[1])) delete cur[k]
    return cur
}
const seaRows = [0, 1, 2].flatMap(d => { const n = `forecast/oceanography/daily/hp-daily-sea-forecast-day${d}.json`, j = raw(n); return (j?.data || []).map(r => ({ ...r, _day: j.forecastDate, _upd: j.dataUpdate, _read: latest[n]?.read_utc })) })
write('sea.json', "IPMA's sea state forecast for its 12 coastal places, by place and day, as issued: each entry of a series is one version of that day's forecast, with the first of our reads that carried it (read_utc), the last (last_read_utc), and IPMA's file time (file_updated). v: [significant wave height min, max (m), swell height min, max (m), swell peak period min, max (s), prevailing wave direction, sea surface temperature min, max (°C)]. A forecast by IPMA, shown as IPMA's.", from(...[0, 1, 2].map(d => `forecast/oceanography/daily/hp-daily-sea-forecast-day${d}.json`), 'sea-locations.json'), {
    columns: ['sea_min_m', 'sea_max_m', 'swell_min_m', 'swell_max_m', 'period_min_s', 'period_max_s', 'direction', 'sst_min_c', 'sst_max_c'], key: '<globalIdLocal>|<day>',
    series: issued('sea.json', r => r.globalIdLocal + '|' + r._day, seaRows, r => [num(r.totalSeaMin), num(r.totalSeaMax), num(r.waveHighMin), num(r.waveHighMax), num(r.wavePeriodMin), num(r.wavePeriodMax), r.predWaveDir, num(r.sstMin), num(r.sstMax)], r => r._read)
}, true)
const cityRows = P.flatMap(p => { const n = `forecast/meteorology/cities/daily/${p.globalIdLocal}.json`, j = raw(n); return (j?.data || []).map(r => ({ ...r, _id: p.globalIdLocal, _upd: j.dataUpdate, _read: latest[n]?.read_utc })) })
const nearest = Object.fromEntries(P.map(p => { const c = [+p.longitude, +p.latitude]; const best = stations.filter(s => series[s.id]?.t.some(v => v !== null)).map(s => [km(c, [s.lon, s.lat]), s.id]).sort((a, b) => a[0] - b[0])[0]; return [p.globalIdLocal, best ? { station: best[1], km: +best[0].toFixed(1) } : null] }))
write('cities.json', "IPMA's daily forecast for each of its 35 places, by place and day, as issued: each entry of a series is one version of that day's forecast, with the first and last of our reads that carried it and IPMA's file time. v: [tMin (°C), tMax (°C), probability of precipitation (%), wind class, prevailing wind direction, weather type, precipitation class]. 'nearest_station' is ours: the reporting station closest to the place's coordinates, with the distance, for reading the forecast beside what was observed (observed-daily.json); IPMA does not say which station, if any, a place's forecast stands for. A forecast by IPMA, shown as IPMA's.", from('distrits-islands.json', 'weather-type-classe.json', 'wind-speed-daily-classe.json', 'precipitation-classe.json', 'forecast/meteorology/cities/daily/1110600.json'), {
    note: 'one file per place was read (forecast/meteorology/cities/daily/<globalIdLocal>.json); their hashes are in latest.json',
    columns: ['tmin_c', 'tmax_c', 'rain_prob_pct', 'wind_class', 'wind_dir', 'weather_type', 'rain_class'], key: '<globalIdLocal>|<day>',
    weather_types: Object.fromEntries((raw('weather-type-classe.json')?.data || []).map(x => [x.idWeatherType, [x.descWeatherTypeEN.trim(), x.descWeatherTypePT]])),
    wind_classes: Object.fromEntries((raw('wind-speed-daily-classe.json')?.data || []).map(x => [x.classWindSpeed, [x.descClassWindSpeedDailyEN, x.descClassWindSpeedDailyPT]])),
    rain_classes: Object.fromEntries((raw('precipitation-classe.json')?.data || []).map(x => [x.classPrecInt, [x.descClassPrecIntEN, x.descClassPrecIntPT]])),
    nearest_station: nearest, nearest_station_by: 'us (great-circle distance to the stations reporting temperature in this read)',
    series: issued('cities.json', r => r._id + '|' + r.forecastDate, cityRows, r => [num(r.tMin), num(r.tMax), num(r.precipitaProb), r.classWindSpeed ?? null, r.predWindDir ?? null, r.idWeatherType ?? null, r.classPrecInt ?? null], r => r._read)
}, true)

// ---------------------------------------------------------------- IPMA's id tables, whole, for any page that names a code
{
    const wt = raw('weather-type-classe.json')?.data || [], wc = raw('wind-speed-daily-classe.json')?.data || [], pc = raw('precipitation-classe.json')?.data || []
    write('classes.json', "IPMA's own names for its codes, in Portuguese and English exactly as IPMA publishes them (its spelling kept, trailing spaces trimmed): idWeatherType (significant weather), classWindSpeed (wind strength of the day) and classPrecInt (precipitation intensity). -99 is IPMA's 'no value'. IPMA publishes names only: the speeds and amounts each class stands for are not in its open data.", from('weather-type-classe.json', 'wind-speed-daily-classe.json', 'precipitation-classe.json'), {
        idWeatherType: Object.fromEntries(wt.map(x => [x.idWeatherType, { pt: x.descWeatherTypePT.trim(), en: x.descWeatherTypeEN.trim() }])),
        classWindSpeed: Object.fromEntries(wc.map(x => [x.classWindSpeed, { pt: x.descClassWindSpeedDailyPT.trim(), en: x.descClassWindSpeedDailyEN.trim() }])),
        classPrecInt: Object.fromEntries(pc.map(x => [x.classPrecInt, { pt: x.descClassPrecIntPT.trim(), en: x.descClassPrecIntEN.trim() }])),
        warning_levels: { green: 'verde', yellow: 'amarelo', orange: 'laranja', red: 'vermelho' }, warning_levels_note: "the feed carries the English words (awarenessLevelID); the Portuguese are the usual names, added by us",
        warning_types_in_feed: [...new Set(W.map(w => w.awarenessTypeName))].sort()
    })
}

// ---------------------------------------------------------------- earthquakes
const quakes = [3, 7].flatMap(a => (raw(`observation/seismic/${a}.json`)?.data || []).map(e => [e.time, +e.lat, +e.lon, num(e.magnitud), e.magType, e.depth, e.obsRegion, e.degree || null, e.sensed ? 1 : 0, a]))
write('seismic.json', "IPMA's located seismic events of the last 30 days (area 3: the Azores; area 7: the mainland and Madeira), one array per event. Times are UTC (IPMA: 'TU').", from('observation/seismic/3.json', 'observation/seismic/7.json'), { columns: ['time_utc', 'lat', 'lon', 'magnitude', 'magnitude_type', 'depth', 'region_as_ipma_writes_it', 'intensity_degree', 'felt', 'area'], events: quakes.sort((a, b) => b[0].localeCompare(a[0])) }, true)

// ---------------------------------------------------------------- the coast, drawn from IPMA's own shellfish zones
const BV = raw('observation/biology/bivalves/CI_SNMB.geojson')
if (BV) {
    const simp = (ring, tol) => { const out = [ring[0]]; for (const p of ring) { const q = out.at(-1); if (Math.abs(p[0] - q[0]) > tol || Math.abs(p[1] - q[1]) > tol) out.push(p) } return out.map(p => [+p[0].toFixed(3), +p[1].toFixed(3)]) }
    const zones = BV.features.map(f => { const pt = (f.properties.representative_point || '').match(/-?\d+\.\d+/g); return { code: f.properties.code, name: f.properties.name, type: f.properties.zone_type, region: f.properties.region_name, status: f.properties.status, at: pt ? [+(+pt[0]).toFixed(3), +(+pt[1]).toFixed(3)] : null, closed: (f.properties.interdictions?.close || []).map(s => s.specie_c), open: (f.properties.interdictions?.open || []).length, rings: (f.geometry?.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry?.coordinates || []).flatMap(poly => poly.slice(0, 1).map(r => simp(r, 0.02))).filter(r => r.length > 3) } })
    write('shellfish-zones.json', "IPMA's shellfish production zones and their harvesting status in the latest bulletin, with each zone's outline thinned by us to about 2 km (for drawing: the coastal zones trace the mainland's coast). Status and species are IPMA's.", from('observation/biology/bivalves/CI_SNMB.geojson'), { bulletin: { reference: BV.snmb_reference, published: BV.publication_date, name: BV.bulletin_name }, outline_by: 'us: every vertex closer than 0.02° to the one kept before it is dropped; the first ring of each polygon only', zones }, true)
}

// ---------------------------------------------------------------- nodes, for incident.entities@ to adopt (ids are stable)
const api = readJ(path.join(SRC, 'api.json'), { endpoints: [] })
const N = [], node = (id, type, name, o = {}) => N.push({ id, type, name, ...o })
const src = n => ({ source: BASE + n, read_utc: latest[n]?.read_utc })
node('ipma', 'body', 'IPMA', { also: ['Instituto Português do Mar e da Atmosfera', 'Instituto Português do Mar e da Atmosfera, I. P.'], page: 'sources/ipma/index.html', source: 'https://api.ipma.pt/', edges: api.endpoints.map(e => ({ verb: 'publishes', to: 'ipma-endpoint-' + e.id })) })
for (const e of api.endpoints) node('ipma-endpoint-' + e.id, 'dataset', e.title, { also: [e.title_pt].filter(Boolean), page: `sources/ipma/endpoints/${e.id}.html`, source: e.url, edges: [{ verb: 'is published by', to: 'ipma' }] })
for (const l of ['green', 'yellow', 'orange', 'red']) node('ipma-level-' + l, 'term', `${l} warning`, { also: [{ green: 'verde', yellow: 'amarelo', orange: 'laranja', red: 'vermelho' }[l]], page: 'sources/ipma/warnings.html', ...src('forecast/warnings/warnings_www.json'), edges: [{ verb: 'is a level of', to: 'ipma-endpoint-warnings' }] })
for (const t of [...new Set(W.map(w => w.awarenessTypeName))].sort()) node('ipma-warning-type-' + slug(t), 'hazard', t, { also: [{ 'Agitação Marítima': 'rough sea', Neve: 'snow', Nevoeiro: 'fog', 'Precipitação': 'rain', 'Tempo Frio': 'cold', 'Tempo Quente': 'heat', Trovoada: 'thunderstorms', Vento: 'wind' }[t]].filter(Boolean), page: 'sources/ipma/warnings.html', ...src('forecast/warnings/warnings_www.json'), edges: [{ verb: 'is warned of in', to: 'ipma-endpoint-warnings' }] })
for (const a of areas) node(a.node, 'place', a.name, { also: [a.id], kind: 'warning area', page: `sources/ipma/warnings.html#${a.id}`, ...src('forecast/warnings/warnings_www.json'), edges: [...a.places.map(p => ({ verb: 'contains', to: 'ipma-place-' + p })), ...a.sea_places.map(p => ({ verb: 'contains', to: 'ipma-sea-place-' + p }))] })
for (const p of P) node('ipma-place-' + p.globalIdLocal, 'place', p.local, { also: [String(p.globalIdLocal)], kind: 'forecast place', page: `sources/ipma/cities.html#${p.globalIdLocal}`, at: [+p.longitude, +p.latitude], ...src('distrits-islands.json'), edges: [{ verb: 'is in', to: 'ipma-area-' + p.idAreaAviso }] })
for (const p of SP) node('ipma-sea-place-' + p.globalIdLocal, 'place', p.local, { also: [String(p.globalIdLocal)], kind: 'coastal place', page: `sources/ipma/sea.html#${p.globalIdLocal}`, at: [+p.longitude, +p.latitude], ...src('sea-locations.json'), edges: [{ verb: 'is in', to: 'ipma-area-' + p.idAreaAviso }] })
for (const s of stations) node(s.node, 'station', s.name, { also: [String(s.id)], page: `sources/ipma/stations.html#${s.id}`, at: [s.lon, s.lat], ...src('observation/meteorology/stations/stations.json'), edges: [{ verb: 'is run by', to: 'ipma' }] })
for (const x of raw('weather-type-classe.json')?.data || []) if (x.idWeatherType > 0) node('ipma-weather-type-' + x.idWeatherType, 'term', x.descWeatherTypeEN.trim(), { also: [x.descWeatherTypePT], page: 'sources/ipma/endpoints/weather-types.html', ...src('weather-type-classe.json'), edges: [] })
fs.writeFileSync(path.join(SRC, 'nodes.json'), JSON.stringify({
    about: "Nodes from IPMA's open data for incident.entities@ to adopt: the body, each data set, the warning levels and types, the 25 warning areas, the forecast places, the coastal places, the stations and the weather types. Ids are stable (they are built from IPMA's own codes) and will not be reused. Every edge is a verb; its inverse is in 'verbs'. 'page' is where this site shows the node; 'source' is IPMA's file that names it.",
    by: BY, updated: now, grammar: 'RESTRUCTURE.md: {id, type, name, also, edges: [{verb, to}], source, read_utc}',
    verbs: { publishes: 'is published by', contains: 'is in', 'is run by': 'runs', 'is a level of': 'has the level', 'is warned of in': 'warns of' },
    count: N.length, nodes: N
}) + '\n')
console.log(`nodes.json: ${N.length} nodes`)
