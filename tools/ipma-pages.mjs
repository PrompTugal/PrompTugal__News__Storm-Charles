#!/usr/bin/env node
// Write the IPMA section's pages (sources/ipma/*.md and endpoints/*.md) from api.json, latest.json, reads.json and data/.
//   node tools/ipma-pages.mjs
// Each page is markdown an agent can read whole (tables of what IPMA publishes and what we read), and mounts a drawn view
// (app/sources/ipma/ipma.js) for people. Run after tools/ipma-read.mjs and tools/ipma-views.mjs; commit what it writes.
// Kept by incident.ipma@web-summit.dinis.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'), SRC = path.join(ROOT, 'sources/ipma')
const readJ = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')) } catch { return d } }
const api = readJ('api.json'), latest = readJ('latest.json', { files: {} }), reads = readJ('reads.json', { reads: [] }), src = readJ('source.json', {})
const W = readJ('data/warnings.json', { instances: [], reads: [] }), PL = readJ('data/places.json', { areas: [] }), ST = readJ('data/stations.json', { stations: [] }), OB = readJ('data/observations.json', { hours: [], stations: {} }), LS = readJ('listing.json', { directories: [] })
const SEA = readJ('data/sea.json', { series: {} }), CI = readJ('data/cities.json', { series: {} }), OD = readJ('data/observed-daily.json', { days: {} })
const d = new Date(), MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const kept = `> Kept by incident.ipma@web-summit.dinis, ${d.getUTCDate()} ${MON[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')} UTC`
const NOT = '**Not a warning service.** Everything here is IPMA\'s, shown as IPMA\'s, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).'
const t = s => s ? s.slice(0, 16).replace('T', ' ') : '·'
const c = s => String(s ?? '').replace(/\|/g, '/').replace(/\n/g, ' ')
const files = Object.entries(latest.files || {})
const page = (rel, { title, summary, view, attrs = '', fallback, body }) => {
    const up = '../'.repeat(rel.split('/').length + 1), base = '../'.repeat(rel.split('/').length - 1) || './'
    const fm = `---\ntitle: ${title}\nsummary: ${summary}\n${view ? `mount: <div class="ipma" data-view="${view}" data-base="${base}"${attrs ? ' ' + attrs : ''}><p class="meta">${fallback || 'This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.'}</p></div>\nhead: <link rel="stylesheet" href="${up}app/sources/ipma/ipma.css"><script src="${up}app/sources/ipma/ipma.js" defer></script>${view === 'sea' || view === 'cities' ? `<script src="${up}app/sources/ipma/ipma-more.js" defer></script>` : ''}\n` : ''}---\n`
    fs.mkdirSync(path.dirname(path.join(SRC, rel)), { recursive: true })
    const L = body.trim().split('\n')
    for (let i = 0; i < L.length; i++) if (/^\s*\|/.test(L[i]) && !/^\s*\|/.test(L[i - 1] || '') && !/^\s*\|?\s*:?-{3,}/.test(L[i + 1] || '')) throw new Error(`${rel}: line ${i + 1} starts a table with no header rule: ${L[i].slice(0, 80)}`)
    fs.writeFileSync(path.join(SRC, rel), fm + L.join('\n') + '\n')
}
const nav = (b = '') => `[IPMA's open data](${b}index.md) · [Warnings over time](${b}warnings.md) · [Stations](${b}stations.md) · [The sea](${b}sea.md) · [Cities: forecast and observed](${b}cities.md) · [The API, mapped](${b}api.md) · [Browse the files](${b}data.md) · [Licence and terms](${b}licence.md)`
const lastRead = reads.reads.at(-1) || {}
const epFiles = e => files.filter(([, f]) => f.endpoint === e.id)
const epRow = (e, b = '') => { const fr = epFiles(e), bytes = fr.reduce((s, [, f]) => s + (f.bytes || 0), 0), lm = fr.map(([, f]) => f.last_modified).filter(Boolean).sort().at(-1), bad = fr.filter(([, f]) => f.status !== 200).length; return `| [${c(e.title)}](${b}endpoints/${e.id}.md) | ${c(e.format)} | ${fr.length || '·'}${bad ? ` (${bad} not 200)` : ''} | ${bytes || '·'} | ${t(lm)} | ${t(fr[0]?.[1].read_utc)} | ${c(e.cadence?.ipma_says || '·')} |` }
const epTable = (b = '') => Object.entries(api.groups).map(([g, name]) => `### ${name}\n\n| Data set | Format | Files read | Bytes | IPMA's file dated (UTC) | We read it (UTC) | IPMA says it updates |\n|---|---|---|---|---|---|---|\n${api.endpoints.filter(e => e.group === g).map(e => epRow(e, b)).join('\n')}`).join('\n\n')
const live = W.instances.filter(w => !w.gone_read_utc), LV = { red: 3, orange: 2, yellow: 1 }
const areaName = Object.fromEntries(PL.areas.map(a => [a.id, a.name]))
const wRow = w => `| ${c(areaName[w.area] || w.area)} (${w.area}) | ${c(w.type)} | **${w.level}** | ${t(w.start)} | ${t(w.end)} | ${c(w.text_pt)} | ${t(w.first_read_utc)}${w.there_at_our_first_read ? ' (already there)' : ''} | ${w.gone_read_utc ? `${w.gone}, by ${t(w.gone_read_utc)}` : 'in the feed'} |`
const wHead = `| Area | Type (IPMA's word) | Level | From | To | IPMA's text | First in our read of (UTC) | Now |\n|---|---|---|---|---|---|---|---|`
const undocumented = api.endpoints.flatMap(e => (e.not_documented || []).map(n => `- **${e.title}**: ${n}`))
const differs = api.endpoints.flatMap(e => [...(e.fields || []).filter(f => f.doc_differs).map(f => `- **${e.title}**, \`${f.name}\`: ${f.doc_differs}`), ...(e.observed_note ? [`- **${e.title}**: ${e.observed_note}`] : [])])

// ---------------------------------------------------------------- the front of the section
page('index.md', {
    title: "IPMA's open data", summary: "Everything IPMA publishes as open data (api.ipma.pt), mapped, read hourly, kept with what changed, and drawn: the stations and warning areas on a map of Portugal and the islands, every area's warnings over time, the sea, the cities.",
    view: 'map', body: `
# IPMA's open data

${kept}. At Dinis Cruz's word (BRIEF.md, 11 November, ~02:10 UTC): "start a new agent for IPMA and build a complete new visualisation, a section, a data analysis ... every JSON under api.ipma.pt/open-data, the cities, the ocean".

${NOT}

${nav()}

**What this is.** IPMA (Instituto Português do Mar e da Atmosfera) publishes warnings, forecasts, observations, the sea state, earthquakes and climate series as open files at [api.ipma.pt](https://api.ipma.pt/). This section maps every one of them, reads them about once an hour (one request every few seconds, read-only), keeps the sha256 and the time of each read in git and the full responses in a data store, records what changed between reads, and draws views from them. The map above is drawn from IPMA's coordinates only: no tiles, no image.

**Everything on this page is a fact in this site's sense**: read from the body that warns (IPMA), with the file and the UTC time we read it. Where a figure is computed by us (a 24-hour sum, the nearest station), the page and the data say so.

## Now, in IPMA's feed

Read ${t(W.now?.read_utc)} UTC (IPMA's file dated ${t(W.reads.at(-1)?.last_modified)} UTC): **${live.length} warnings above green** across ${new Set(live.map(w => w.area)).size} of ${PL.areas.length} areas; ${live.filter(w => w.level === 'red').length} red, ${live.filter(w => w.level === 'orange').length} orange, ${live.filter(w => w.level === 'yellow').length} yellow. [All of them, over time](warnings.md).

${wHead}
${live.filter(w => w.level === 'red').sort((a, b) => a.start.localeCompare(b.start) || a.area.localeCompare(b.area)).map(wRow).join('\n') || '| none red | | | | | | | |'}

Source: [warnings_www.json](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json). Windows are as IPMA writes them (no zone; Lisbon and Madeira are on UTC in November).

## What IPMA publishes

${api.endpoints.length} data sets: ${api.endpoints.filter(e => e.documented !== false).length} documented at [api.ipma.pt](https://api.ipma.pt/), ${api.endpoints.filter(e => e.documented === false).length} more found in its own directory listings. ${files.length} files read in the latest pass (${t(lastRead.at)} UTC: ${lastRead.requests} requests in ${lastRead.seconds} s). The full map, field by field: [api.md](api.md) and [api.json](api.json).

${epTable()}

## What the documentation does not match or does not say

Found by reading the responses beside the documentation (11 November 2026). Observations of ours about IPMA's files, each checkable at the address given on the data set's page.

${differs.join('\n')}

${undocumented.join('\n')}

## The files of this section

| File | What it is |
|---|---|
| [source.json](source.json) | who IPMA is, what it publishes, the licence as published, how we read it |
| [api.json](api.json) | the map: every data set, address, field, unit, cadence |
| [listing.json](listing.json) | IPMA's own directory listings under /open-data/ |
| [latest.json](latest.json) | every file read: sha256, size, time read, IPMA's Last-Modified |
| [reads.json](reads.json) | every read, appended |
| [changes/](api.md) | per data set, what changed between one read and the next |
| [dataset.json](dataset.json) | where the full responses are kept (a vault; never in git) |
| [nodes.json](nodes.json) | areas, places, stations, warning types and levels as nodes, for the entity graph |
| [data/](data.md) | the small files the views draw: warnings, stations, observations, places, sea, cities, earthquakes |

For agents: every file above is JSON at a stable address; each derived file names the IPMA file it came from, its sha256 and the time read.
` })

// ---------------------------------------------------------------- warnings
page('warnings.md', {
    title: "IPMA's warnings, area by area, over time", summary: "Every IPMA warning above green for all 25 areas of Portugal, as a timeline: what is in the feed now, and what was replaced, withdrawn or ended between our reads.",
    view: 'warnings', body: `
# IPMA's warnings, area by area, over time

${kept}

${NOT}

${nav()}

Each bar above is one row of IPMA's warnings feed: an area, a type, a level, a window. IPMA's feed carries **no time of issue and no identifier**, so when IPMA changes a warning the old row disappears and a new one appears. We keep every row we have read, with the first and last read that carried it, and pair a row that went with the row that took its place (same area and type, overlapping window, first seen in that same read). "Replaced" is that pairing, ours; the rows are IPMA's.

Reads so far: ${W.reads.length}, from ${t(W.reads[0]?.read_utc)} to ${t(W.reads.at(-1)?.read_utc)} UTC. Warnings issued before our first read are marked "already there"; their earlier history (with the times IPMA sent them, from MeteoAlarm's CAP messages) is in [the meteorologist's record](../../incidents/2026-11-10-storm-charles/data/weather/warnings.json).

## In the feed now (${live.length})

${wHead}
${live.sort((a, b) => LV[b.level] - LV[a.level] || a.area.localeCompare(b.area) || a.start.localeCompare(b.start)).map(wRow).join('\n')}

## No longer in the feed (${W.instances.length - live.length})

${wHead}
${W.instances.filter(w => w.gone_read_utc).sort((a, b) => b.gone_read_utc.localeCompare(a.gone_read_utc)).map(wRow).join('\n') || '| none yet | | | | | | | |'}

Data: [data/warnings.json](data/warnings.json) (every row, with ids of ours) · ${fs.existsSync(path.join(SRC, 'changes/warnings.json')) ? 'what changed read by read: [changes/warnings.json](changes/warnings.json) · ' : ''}the feed's page: [endpoints/warnings.md](endpoints/warnings.md). Source: [warnings_www.json](https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json), read ${t(W.now?.read_utc)} UTC.
` })

// ---------------------------------------------------------------- stations
const lastI = a => { for (let i = (a || []).length - 1; i >= 0; i--) if (a[i] !== null) return a[i]; return null }
const sum = a => { const v = (a || []).filter(x => x !== null); return v.length ? +v.reduce((s, x) => s + x, 0).toFixed(1) : null }
const max = a => { const v = (a || []).filter(x => x !== null); return v.length ? Math.max(...v) : null }
const DIR = [null, 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
const stRows = reg => ST.stations.filter(s => s.region === reg).sort((a, b) => (sum(OB.stations[b.id]?.r) ?? -1) - (sum(OB.stations[a.id]?.r) ?? -1)).map(s => { const o = OB.stations[s.id]; return `| ${c(s.name)} | ${s.id} | ${s.lat.toFixed(3)}, ${s.lon.toFixed(3)} | ${o ? lastI(o.t) ?? '·' : '·'} | ${o ? lastI(o.w) ?? '·' : '·'} | ${o ? DIR[lastI(o.d)] || '·' : '·'} | ${o ? max(o.w) ?? '·' : '·'} | ${o ? lastI(o.r) ?? '·' : '·'} | ${o ? sum(o.r) ?? '·' : '·'} | ${o ? lastI(o.p) ?? '·' : '·'} |` }).join('\n')
page('stations.md', {
    title: "IPMA's stations on a map, with the last 24 hours", summary: "IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.",
    view: 'map', attrs: 'data-var="r24"', body: `
# IPMA's stations, with the last 24 hours

${kept}

${NOT}

${nav()}

${ST.count} stations in IPMA's list; ${ST.reporting} reported at least one value in the 24 hours read (${OB.hours[0]?.replace('T', ' ')} to ${OB.hours.at(-1)?.replace('T', ' ')}, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

${['mainland', 'madeira', 'azores'].map(r => `## ${{ mainland: 'Mainland', madeira: 'Madeira and Porto Santo', azores: 'The Azores' }[r]}\n\nSorted by the 24-hour rain sum.\n\n| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |\n|---|---|---|---|---|---|---|---|---|---|\n${stRows(r)}`).join('\n\n')}

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read ${t(OB.from?.[0]?.read_utc)} UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
` })

// ---------------------------------------------------------------- the sea
const seaDays = [...new Set(Object.keys(SEA.series).map(k => k.split('|')[1]))].sort()
const seaRow = p => `| ${c(p.name)} | ${seaDays.map(dy => { const v = SEA.series[p.id + '|' + dy]?.at(-1)?.v; return v ? `${v[0]} to **${v[1]}** m, ${v[6]}, swell ${v[2]} to ${v[3]} m, ${v[4]} to ${v[5]} s, sea ${v[7]} to ${v[8]} °C` : '·' }).join(' | ')} |`
page('sea.md', {
    title: "The sea: IPMA's sea state forecast, place by place", summary: "IPMA's forecast of wave height, swell, period, direction and sea surface temperature for its 12 coastal places, as issued and as it changed between our reads.",
    view: 'sea', body: `
# The sea: IPMA's sea state forecast

${kept}

${NOT}

${nav()}

IPMA forecasts the sea for ${PL.sea_places?.length || 12} coastal places, three days at a time: the significant wave height (the "total sea"), the swell's height and peak period, the prevailing direction and the sea surface temperature, each as the day's minimum and maximum. These are **forecasts by IPMA**, shown as IPMA's. Each time a day's forecast changed between two of our reads, both versions are kept: the view draws the latest and lists the earlier ones.

| Coastal place | ${seaDays.join(' | ')} |
|---|${seaDays.map(() => '---').join('|')}|
${(PL.sea_places || []).map(seaRow).join('\n')}

In each cell: significant wave height (min to **max**), prevailing direction, swell height, swell peak period, sea surface temperature.

Data: [data/sea.json](data/sea.json) · the data set: [endpoints/sea-forecast.md](endpoints/sea-forecast.md) · rough-sea warnings: [warnings.md](warnings.md). Source: IPMA's hp-daily-sea-forecast-day0 to day2 files, read ${t(SEA.from?.[0]?.read_utc)} UTC.
` })

// ---------------------------------------------------------------- the cities
const ciDays = [...new Set(Object.keys(CI.series).map(k => k.split('|')[1]))].sort()
const ciRow = p => `| ${c(p.name)} | ${ciDays.map(dy => { const v = CI.series[p.id + '|' + dy]?.at(-1)?.v, n = CI.series[p.id + '|' + dy]?.length; return v ? `${v[0]} to ${v[1]} °C, rain ${v[2]}%, wind ${CI.wind_classes?.[v[3]]?.[0] || v[3]} ${v[4] || ''}${n > 1 ? ` (${n} versions)` : ''}` : '·' }).join(' | ')} |`
page('cities.md', {
    title: "The cities: IPMA's forecast beside what its stations observed", summary: "IPMA's daily forecast for its 35 places, every version we read, beside what the nearest IPMA station recorded on the day.",
    view: 'cities', body: `
# The cities: IPMA's forecast, as issued, beside what was observed

${kept}

${NOT}

${nav()}

IPMA forecasts five days for ${PL.places?.length || 35} places (the district capitals, the islands, and a few more). We keep **every version** of each day's forecast that we read, so a day can be followed as its forecast changed. Beside it, the view shows what the nearest reporting IPMA station recorded on that day.

**Read the comparison with care; it is ours, not IPMA's.** The station is the nearest by distance (IPMA does not say which station a place's forecast stands for). The observed low and high are the lowest and highest *hourly mean* temperatures we hold for the day, not the true minimum and maximum that tMin and tMax forecast, and a day is complete only if our reads covered all 24 hours. Rain is forecast as a probability and a class, and observed as millimetres: they are shown side by side, not scored.

| Place | ${ciDays.join(' | ')} |
|---|${ciDays.map(() => '---').join('|')}|
${(PL.places || []).map(ciRow).join('\n')}

Data: [data/cities.json](data/cities.json), [data/observed-daily.json](data/observed-daily.json) · the data sets: [endpoints/city-daily.md](endpoints/city-daily.md), [endpoints/observations.md](endpoints/observations.md). Source: IPMA's per-place daily forecast files, read ${t(lastRead.at)} UTC.
` })

// ---------------------------------------------------------------- the API map and each data set
page('api.md', {
    title: "IPMA's API, mapped", summary: "Every data set IPMA documents at api.ipma.pt and every file its directory lists: the address, the format, the fields with meaning and unit, how often it changes, and what we read.",
    view: 'api', body: `
# IPMA's API, mapped

${kept}

${nav()}

IPMA's documentation is one page, in Portuguese: [api.ipma.pt](https://api.ipma.pt/) (read ${t(api.documentation_read_utc)} UTC). No key, no registration; the responses allow any origin. ${c(api.general.times.ipma_says ? `On times IPMA says: "${api.general.times.ipma_says}"` : '')} ${c(api.general.times.note)} No-data value: ${c(api.general.nodata)}.

${epTable()}

## Beyond the open data

${c(api.general.beyond)}

## IPMA's own directory

IPMA's server lists its folders under [/open-data/](https://api.ipma.pt/open-data/). We walked ${LS.directories.filter(x => x.listed).length} of them (${LS.complete ? 'all' : 'not all yet: the rest are named in listing.json'}); names, sizes and dates as listed are in [listing.json](listing.json). That is how the data sets marked "not documented" were found.

The machine-readable map: [api.json](api.json). What we hold of each file: [latest.json](latest.json). Every read: [reads.json](reads.json). [Licence and terms](licence.md).
` })
const DERIVED = { warnings: ['data/warnings.json'], observations: ['data/observations.json', 'data/observed-daily.json'], 'obs-surface': ['data/observations.json'], stations: ['data/stations.json'], places: ['data/places.json'], 'sea-places': ['data/places.json'], 'sea-forecast': ['data/sea.json'], 'city-daily': ['data/cities.json'], 'day-forecast': ['data/cities.json'], seismic: ['data/seismic.json'], 'fire-risk': ['data/places.json'], bivalves: ['data/shellfish-zones.json'], 'weather-types': ['data/cities.json'], 'wind-classes': ['data/cities.json'], 'precipitation-classes': ['data/cities.json'] }
const VIEW_OF = { warnings: 'warnings.md', observations: 'stations.md', 'obs-surface': 'stations.md', stations: 'stations.md', 'sea-forecast': 'sea.md', 'city-daily': 'cities.md', 'day-forecast': 'cities.md' }
for (const e of api.endpoints) {
    const fr = epFiles(e), der = DERIVED[e.id] || []
    page(`endpoints/${e.id}.md`, {
        title: `${e.title} · IPMA`, summary: `IPMA's "${e.title}": the address, each field with its meaning and unit, how often it changes, what we read and what changed.`,
        view: 'api', attrs: `data-endpoint="${e.id}"`, body: `
# ${e.title}

${kept}

${nav('../')}

${e.title_pt ? `IPMA's name for it: *${e.title_pt}*. ` : ''}${e.documented === false ? '**Not in IPMA\'s documentation**: found in its directory listing.' : `Documented at [api.ipma.pt](${e.doc_url}).`}${VIEW_OF[e.id] ? ` Drawn at [${VIEW_OF[e.id].replace('.md', '')}](../${VIEW_OF[e.id]}).` : ''}

| | |
|---|---|
| Address | \`${e.url}\` |
| Format | ${c(e.format)} |
| Shape | ${c(e.shape || '·')} |${Object.entries(e.params || {}).map(([k, v]) => `\n| \`{${k}}\` | ${c(v.meaning)}${v.values ? `: ${v.values.join(', ')}` : ''} |`).join('')}
| IPMA says it updates | ${c(e.cadence?.ipma_says || 'not stated')} |
| IPMA's file dated (its Last-Modified header) | ${t(fr.map(([, f]) => f.last_modified).filter(Boolean).sort().at(-1))} UTC |
| We last read it | ${t(fr[0]?.[1].read_utc)} UTC, ${fr.length} file${fr.length === 1 ? '' : 's'}, ${fr.reduce((s, [, f]) => s + (f.bytes || 0), 0)} bytes |
${e.ipma_says ? `| IPMA's note | "${c(e.ipma_says)}" |\n` : ''}${e.more ? `| More from IPMA | ${e.more} |\n` : ''}${e.note ? `| Our note | ${c(e.note)} |\n` : ''}${e.observed_note ? `| What we observed | ${c(e.observed_note)} |\n` : ''}
${(e.fields || []).length ? `## Fields\n\n| Field | Type | Unit | Meaning (our English) | IPMA's wording | Where the documentation differs |\n|---|---|---|---|---|---|\n${e.fields.map(f => `| \`${c(f.name)}\` | ${c(f.type)} | ${c(f.unit || '·')} | ${c(f.meaning)}${f.node ? ` (a node: ${f.node})` : ''} | ${f.ipma ? `"${c(f.ipma)}"` : '·'} | ${c(f.doc_differs || '·')} |`).join('\n')}` : ''}

${(e.not_documented || []).length ? `## Not documented\n\n${e.not_documented.map(n => `- ${n}`).join('\n')}` : ''}

${e.folders ? `## Folders\n\n${e.folders.map(x => `\`${x}/\``).join(', ')}. Their files as IPMA lists them: [listing.json](../listing.json).` : ''}

## Files read

${fr.length ? `| File | Answer | Bytes | sha256 | IPMA's file dated (UTC) | We read it (UTC) |\n|---|---|---|---|---|---|\n${fr.slice(0, 60).map(([n, f]) => `| [${n}](${f.url}) | ${f.status} | ${f.bytes ?? '·'} | \`${f.sha256 ? f.sha256.slice(0, 16) + '…' : '·'}\` | ${t(f.last_modified)} | ${t(f.read_utc)} |`).join('\n')}` : 'Not downloaded.'}

The links go to IPMA's live files. Full hashes: [latest.json](../latest.json). What changed between reads: ${fs.existsSync(path.join(SRC, 'changes', e.id + '.json')) ? `[changes/${e.id}.json](../changes/${e.id}.json)` : 'no change seen yet between two of our reads'}.${der.length ? ` Our small files made from it: ${der.map(x => `[${x}](../data.md#${x})`).join(', ')}.` : ''}
` })
}

// ---------------------------------------------------------------- the browser
const browse = ['data/warnings.json', 'data/classes.json', 'data/places.json', 'data/stations.json', 'data/observations.json', 'data/observed-daily.json', 'data/sea.json', 'data/cities.json', 'data/seismic.json', 'data/shellfish-zones.json', 'api.json', 'latest.json', 'reads.json', 'listing.json', 'nodes.json', 'source.json', 'dataset.json', ...(fs.existsSync(path.join(SRC, 'changes')) ? fs.readdirSync(path.join(SRC, 'changes')) : []).map(f => 'changes/' + f)].filter(f => fs.existsSync(path.join(SRC, f)))
page('data.md', {
    title: "Browse IPMA's data as we hold it", summary: "A browser for every JSON file of the IPMA section: its schema, a readable table, and the raw file one click away.",
    view: 'browser', attrs: `data-files="${browse.join(',')}"`, body: `
# Browse the files

${kept}

${nav()}

Pick a file above: **Table** shows its rows, **Schema** its shape (keys and types, read from the file itself), **Raw** the text. Every file is small (under 256 KB) and served at its own address; each says which IPMA file it was made from, with that file's sha256 and the time we read it. IPMA's full responses are not in git: they are in the data store ([dataset.json](dataset.json)), and each data set's page links IPMA's live file.

| File | Bytes | What it is |
|---|---|---|
${browse.map(f => { const j = readJ(f, {}); return `| [${f}](${f}) | ${fs.statSync(path.join(SRC, f)).size} | ${c(String(j.about || '').slice(0, 260))} |` }).join('\n')}
` })

// ---------------------------------------------------------------- licence
const L = src.licence || {}
page('licence.md', {
    title: "IPMA's licence and terms, as published", summary: "What IPMA's own terms say about using its data, quoted with the link, and what they do not say.",
    body: `
# IPMA's licence and terms, as published

${kept}

${nav()}

Read at [api.ipma.pt, "termos e condições"](${L.url || 'https://api.ipma.pt/'}) on ${t(L.read_utc)} UTC. Short excerpts, in IPMA's Portuguese, each with our English beside it. Ours is a reading, not legal advice; **the text that counts is IPMA's**.

| IPMA's words | In English (ours) |
|---|---|
${(L.excerpts || []).map(x => `| "${c(x.pt)}" | ${c(x.en)} |`).join('\n')}

## What is stated, and what is not

| Question | Answer | Basis |
|---|---|---|
${(L.answers || []).map(x => `| ${c(x.q)} | **${c(x.a)}** | ${c(x.basis)} |`).join('\n')}

## How this site uses it

${(L.our_use || []).map(x => `- ${x}`).join('\n')}

## Open, for Dinis (through the conductor)

${(L.open || []).map(x => `- ${x}`).join('\n')}

The same, as data: [source.json](source.json).
` })
console.log(`pages: ${8 + api.endpoints.length} written`)
