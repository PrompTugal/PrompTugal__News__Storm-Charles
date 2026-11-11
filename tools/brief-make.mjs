#!/usr/bin/env node
// The decision brief, an edition at a time (incident.brief@web-summit.dinis, 11 November 2026).
// Reads brief/edition-<n>.json (this edition's words and judgements) and the incident's data files as they stand, and writes
// brief/edition-<n>.md (the edition, frozen: re-run only to correct it) and brief/README.md (the latest edition, served at /brief/).
// The page is the source; the PDF is rendered from it on demand: node admin/tools/render-pdf.cjs _site brief/index.html <out.pdf>
// Usage: node tools/brief-make.mjs <n>        No model call, no outside request: our files only.
import fs from 'node:fs'
import path from 'node:path'
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const N = process.argv[2] || '1'
const E = JSON.parse(fs.readFileSync(path.join(ROOT, `brief/edition-${N}.json`), 'utf8'))
const INC = `incidents/${E.incident}/`, D = INC + 'data/'
const J = rel => { try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) } catch { return null } }
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const hm = t => t ? String(t).replace(/:\d\d(\.\d+)?Z?$/, '').slice(11, 16) : '?'
const T = t => Date.parse(t)
const AS = T(E.as_of)
const warn = J(D + 'weather/warnings.json'), mad = J(D + 'weather/madeira.json'), rain = J(D + 'weather/lisbon-rain.json')
const ap = J(D + 'weather/airport.json'), fl = J(D + 'transport/flights.json'), sv = J(D + 'transport/services.json'), chg = J(D + 'weather/changes.json')
const areas = Object.fromEntries((J('data/graph/ref/ipma-areas.json')?.areas || []).map(a => [a.code, a]))
const NAME = { LSB: 'Lisboa', MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountains', MPS: 'Porto Santo', ...Object.fromEntries(Object.values(areas).map(a => [a.code, a.name])) }
const HZ = { 'Precipitação': 'Rain', 'Vento': 'Wind', 'Agitação Marítima': 'Sea', 'Trovoada': 'Thunder' }
const RANK = { yellow: 1, orange: 2, red: 3 }
const LBL = { fact: 'Fact', evidence: 'Evidence', hypothesis: 'Hypothesis' }
const lbl = l => `<span class="br-l br-l-${esc(l)}">${esc(LBL[l] || l)}</span>`
const lvl = l => `<span class="lvl ${esc(l)}">${esc(l)}</span>`
const prov = (name, url, read) => `<span class="prov">${url ? `<a href="${esc(url)}">${esc(name)}</a>` : esc(name)}${read ? `, read <time datetime="${esc(read)}">${hm(read)} UTC</time>` : ''}</span>`
const IPMA = 'https://api.ipma.pt/open-data/forecast/warnings/warnings_www.json'
const TL = id => `../${INC}timeline.html#${id}`

// ---- the warnings, every non-green one we hold that touches Wednesday 00:00 to Thursday 03:00
const W0 = T('2026-11-11T00:00:00Z'), W1 = T('2026-11-12T03:00:00Z'), HOURS = (W1 - W0) / 36e5
const all = [...(warn?.lisbon || []).map(w => ({ ...w, area: 'LSB' })), ...(warn?.red_and_orange_elsewhere?.items || [])]
  .filter(w => RANK[w.level] && T(w.end_utc) > W0 && T(w.start_utc) < W1)
const rowsBy = {}
for (const w of all) { const k = w.area + '|' + w.type; (rowsBy[k] ||= []).push(w) }
const rows = Object.entries(rowsBy).map(([k, ws]) => { const [area, type] = k.split('|'); return { area, type, ws: ws.sort((a, b) => T(a.start_utc) - T(b.start_utc)), top: Math.max(...ws.map(w => RANK[w.level])) } })
const mainland = a => !/^M/.test(a)
rows.sort((a, b) => (a.area === 'LSB' ? -1 : 0) - (b.area === 'LSB' ? -1 : 0) || mainland(b.area) - mainland(a.area) || b.top - a.top || NAME[a.area].localeCompare(NAME[b.area]) || a.type.localeCompare(b.type))
const nowPct = ((AS - W0) / (W1 - W0) * 100).toFixed(2)
const cellAt = (ws, h) => { const t = W0 + h * 36e5 + 18e5; const w = ws.filter(w => T(w.start_utc) <= t && T(w.end_utc) > t).sort((a, b) => RANK[b.level] - RANK[a.level])[0]; return w ? w.level : '' }
const win = ws => ws.map(w => `${w.level} ${hm(w.start_utc)}–${T(w.end_utc) >= T('2026-11-12T00:00:00Z') ? 'Thu ' : ''}${hm(w.end_utc)}`).join(', ')
const gridHead = `<tr><th class="br-g-lab" scope="col">District · hazard</th>${Array.from({ length: HOURS }, (_, h) => `<th scope="col" class="br-g-h${h % 3 ? ' br-g-minor' : ''}">${h % 3 ? '' : String(h % 24).padStart(2, '0')}</th>`).join('')}<th class="br-g-win" scope="col">IPMA's window (UTC)</th></tr>`
let lastGroup = ''
const gridRows = rows.map(r => {
  const g = r.area === 'LSB' ? 'Lisbon' : mainland(r.area) ? 'Rest of the mainland (red and orange only)' : 'Madeira'
  const sep = g !== lastGroup ? `<tr class="br-g-grp"><th colspan="${HOURS + 2}" scope="rowgroup">${esc(g)}</th></tr>` : ''; lastGroup = g
  return `${sep}<tr${r.area === 'LSB' ? ' class="br-g-here"' : ''}><th class="br-g-lab" scope="row">${esc(NAME[r.area] || r.area)} · ${esc(HZ[r.type] || r.type)}</th>${Array.from({ length: HOURS }, (_, h) => { const l = cellAt(r.ws, h); return `<td class="${l ? 'br-c w-' + l : ''}${h === 24 ? ' br-g-thu' : ''}">${l ? `<span>${l[0].toUpperCase()}</span>` : ''}</td>` }).join('')}<td class="br-g-win">${esc(win(r.ws))}</td></tr>`
}).join('')
const figure = `<figure class="br-fig"><div class="br-gridwrap wx-scroll" tabindex="0"><div class="br-gridpos"><table class="br-grid"><caption>IPMA's warnings in force, hour by hour, Wednesday 11 November 00:00 to Thursday 03:00 UTC (Lisbon time). Each cell says its level: R red, O orange, Y yellow. The line marks this edition's as-of time, ${hm(E.as_of)}.</caption><thead>${gridHead}</thead><tbody>${gridRows}</tbody></table><div class="br-now" style="--now:${nowPct}" aria-hidden="true"><span>${hm(E.as_of)}</span></div></div></div>
<figcaption>${lbl('fact')} Drawn from IPMA's own warnings ${prov('open data', IPMA, warn?.read_utc)}. Lisbon shows every level; beyond Lisbon our feed keeps red and orange only, so yellow there is not drawn (blank is not "no warning"). Madeira's earlier red rain (to 06:00) and the Madeira warnings that had ended before our read are not drawn. Warnings change: <a href="https://www.ipma.pt/pt/otempo/prev-sam/">IPMA's warnings page</a> is the one that counts.</figcaption></figure>`

// ---- a small map of where the reds are (dots at each district's seat, IPMA's coordinates; no outline drawn)
const top = {}
for (const r of rows) top[r.area] = Math.max(top[r.area] || 0, r.top)
const LV = ['', 'yellow', 'orange', 'red']
const X = lon => 20 + (lon + 9.7) / 3.7 * 200, Y = lat => 18 + (42.3 - lat) / 5.4 * 330
const dots = Object.values(areas).filter(a => a.mainland).map(a => { const l = LV[top[a.code] || 0]; return `<g class="br-dot${a.code === 'LSB' ? ' here' : ''}"><circle cx="${X(a.lon).toFixed(1)}" cy="${Y(a.lat).toFixed(1)}" r="${a.code === 'LSB' ? 9 : 7}" class="${l ? 'w-' + l : 'none'}"/><text x="${(X(a.lon) + 11).toFixed(1)}" y="${(Y(a.lat) + 4).toFixed(1)}">${esc(a.name)}${l ? ` · ${l}` : ''}</text></g>` }).join('')
const map = `<figure class="br-map"><svg viewBox="0 0 330 370" role="img" aria-label="Mainland districts by the highest IPMA warning level today that we hold"><title>Highest IPMA level per district, Wednesday</title>${dots}</svg><figcaption>${lbl('fact')} The highest level per district today, from the same feed (dots at each district's seat, as IPMA lists it). A dot with no level: no red or orange in our feed (yellow not held beyond Lisbon).</figcaption></figure>`

// ---- Lisbon's rain, station by station, the hours labelled 06:00 to 10:00
const CITY = (rain?.stations || []).filter(s => /^Lisboa,/.test(s.name))
const rh = ['06', '07', '08', '09', '10']
const rainTable = `<div class="wx-scroll" tabindex="0"><table class="br-t"><thead><tr><th scope="col">IPMA station</th>${rh.map(h => `<th scope="col" class="num">${h}:00</th>`).join('')}<th scope="col" class="num">Sum</th></tr></thead><tbody>${CITY.map(s => { const v = rh.map(h => s.hourly.find(x => x.time_utc === `2026-11-11T${h}:00Z`)?.rain_mm); return `<tr><th scope="row">${esc(s.name)}</th>${v.map(x => `<td class="num">${x ?? '–'}</td>`).join('')}<td class="num"><b>${v.reduce((a, b) => a + (b || 0), 0).toFixed(1)}</b></td></tr>` }).join('')}</tbody></table></div><p class="br-src">${lbl('fact')} Rain in mm in the hour IPMA labels, ${prov('IPMA station observations', rain?.source, rain?.read_utc)}.</p>`
const met = ap?.metars?.at(-1), mg = ap?.max_gust
const airportLine = met ? `<p>${lbl('fact')} Lisbon airport at ${hm(met.time_utc)}: wind ${met.wind_kmh} km/h${met.gust_kmh ? ` gusting ${met.gust_kmh}` : ', no gust reported'}, ${esc(met.weather || '')}, visibility ${met.visibility} statute miles, ${met.pressure_hpa} hPa. Highest gust in the hours we hold: ${mg?.kmh} km/h (${mg?.kt} kt) at ${hm(mg?.time_utc)} on ${new Date(T(mg?.time_utc)).toLocaleDateString('en-GB', { timeZone: 'UTC', weekday: 'long' })}. <code>${esc(met.raw)}</code> ${prov('METAR, NOAA Aviation Weather', met.source, met.read_utc)}</p>` : ''

// ---- Madeira
const mst = (mad?.stations || []).filter(s => s.max_6h_rain?.mm != null).sort((a, b) => b.max_6h_rain.mm - a.max_6h_rain.mm).slice(0, 6)
const madTable = `<table class="br-t"><thead><tr><th scope="col">IPMA station</th><th scope="col" class="num">Most rain in 6 hours (mm)</th><th scope="col">Hours labelled (UTC)</th></tr></thead><tbody>${mst.map(s => `<tr><th scope="row">${esc(s.name)}</th><td class="num"><b>${s.max_6h_rain.mm}</b></td><td>${hm(s.max_6h_rain.hours_labelled[0])} to ${hm(s.max_6h_rain.hours_labelled[1])}${s.max_6h_rain.hours_labelled[0] < '2026-11-11' ? ' (from Tuesday)' : ''}</td></tr>`).join('')}</tbody></table><p class="br-src">${lbl('fact')} ${prov('IPMA station observations', mad?.source, mad?.read_utc)}. IPMA's stations report no gusts; Madeira's gusts are in the airport's METARs.</p>`
const madW = rows.filter(r => !mainland(r.area)).map(r => `<li>${lvl(r.ws[0].level)} ${esc(NAME[r.area])}, ${esc(HZ[r.type] || r.type).toLowerCase()}: ${esc(win(r.ws))}. <q>${esc(r.ws[0].text_en || r.ws[0].text_pt)}</q></li>`).join('')

// ---- transport
const flRows = (fl?.airports || []).map(a => { const d = a.departures_today || {}; return `<tr><th scope="row">${esc(a.name || a.icao)} <span class="meta">${esc(a.icao)}</span></th><td class="num">${d.count ?? '–'}</td><td>${d.covered_from ? `from ${hm(d.covered_from)}` : 'not covered'}</td><td class="br-spark">${(d.by_hour_utc || []).map((n, h) => n == null ? '' : `<span title="${String(h).padStart(2, '0')}:00 UTC: ${n}" style="--v:${Math.min(1, n / 16)}">${n}</span>`).join('')}</td></tr>` }).join('')
const carris = sv?.operators?.find(o => o.id === 'carris-metropolitana'), ttsl = sv?.operators?.find(o => o.id === 'ttsl')
const transport = `<div class="wx-scroll" tabindex="0"><table class="br-t"><thead><tr><th scope="col">Airport</th><th scope="col" class="num">Airline departures seen</th><th scope="col">Hours covered (UTC)</th><th scope="col">By hour of first detection</th></tr></thead><tbody>${flRows}</tbody></table></div>
<p class="br-src">${lbl('fact')} What <a href="https://opensky-network.org/">OpenSky Network</a>'s volunteer receivers saw, in our readings today: a floor, not a total; coverage is thin at Faro and Funchal, so a zero there means "not seen", not "none flew". ${prov('incident.transport@', `../${D}transport/flights.json`, fl?.updated)}.</p>
<ul class="br-items">
<li>${lbl('evidence')} 222 flights cancelled by 09:20 (208 at Lisbon, 14 at Faro), according to the airports' operator's site as reported by CNN Portugal at 09:54; not read at the operator's own site, which shows automated readers a bot check. <a href="${TL('s-1111T1037')}">Timeline</a></li>
${carris ? `<li>${lbl('fact')} Carris Metropolitana (buses around Lisbon): ${carris.counts.active_notices} notices in force, ${carris.counts.weather_notices} of them for the weather, naming ${carris.counts.lines_named_in_weather_notices} lines; ${carris.counts.by_effect.DETOUR} detours, ${carris.counts.by_effect.SIGNIFICANT_DELAYS} with significant delays. ${prov('its open alerts feed', carris.source, carris.read)}</li>` : ''}
${ttsl ? `<li>${lbl('fact')} Transtejo Soflusa (river crossings): its own notices, newest first, are on <a href="../transport/index.html">our transport page</a>. ${prov('its site', ttsl.link || ttsl.source, ttsl.read)}</li>` : ''}
<li>${lbl('fact')} No operator had announced Thursday's service (Metro, Carris, CP, ferries, bridges) when last checked. <a href="../${D}decisions/entities/metro.json">metro.json</a></li>
</ul>
<p class="meta">Not a warning service, and no advice of ours: check with your airline or operator.</p>`

// ---- assemble
const sec = (id, h, inner, cls = '') => `<section class="br-sec ${cls}" id="${id}"><h2>${h}</h2>${inner}</section>`
const srcName = s => typeof s === 'string' ? esc(s) : ''
const conf = c => `<span class="br-conf br-conf-${esc(c.toLowerCase())}">${esc(c)}</span>`
const html = `<div class="br">
<header class="br-mast"><div class="br-mast-l"><p class="br-kick">PrompTugal News · storm-charles.promptugal.news · Decision brief</p><h1>Storm Charles: Portugal and Madeira</h1><p class="br-ed">Edition ${E.edition} · as of <time datetime="${esc(E.as_of)}">${hm(E.as_of)} UTC, Wednesday 11 November 2026</time> (Lisbon time) · ${esc(E.id)}</p></div>
<div class="br-mast-r"><p class="br-notwarn"><b>Not an official warning.</b> IPMA issues the warnings and ANEPC the instructions. Not a warning service: no forecast or advice of ours.</p><p class="br-next"><b>Next edition:</b> ${esc(E.next)}</p><p class="br-live">Live: <a href="https://storm-charles.promptugal.news/">storm-charles.promptugal.news</a> · this brief: <a href="https://storm-charles.promptugal.news/brief/">/brief/</a></p></div></header>
<div class="br-key" aria-label="How to read it"><span>${lbl('fact')} read from the body that decides or warns</span><span>${lbl('evidence')} reported by others, with its source</span><span>${lbl('hypothesis')} our analysis, with its reasons</span><span>Times UTC = Lisbon time. Each figure: its source and the time read.</span></div>
<div class="br-p1"><div class="br-left"><section class="br-lead">${E.lead.map(l => `<p class="br-i br-i-${esc(l.label)}">${lbl(l.label)} ${esc(l.text)} ${l.src.map(s => prov(s.name, s.url, s.read)).join(' · ')}</p>`).join('')}</section>
${map}</div>
${sec('watch', 'What to watch, hour by hour', `<ol class="br-watch">${E.watch.map(w => `<li class="br-i br-i-${esc(w.label)}"><time>${esc(w.at)}</time><div>${lbl(w.label)} ${esc(w.text)} <span class="prov">${srcName(w.src)}</span></div></li>`).join('')}</ol>`)}
</div>
${sec('warnings', "IPMA's warnings, district by district, hour by hour", figure, 'br-break')}
${sec('signs', 'Signs to watch at the stations', `<ul class="br-items">${E.signs.map(s => `<li class="br-i br-i-${esc(s.label)}">${lbl(s.label)} ${esc(s.text)} <span class="prov">${srcName(s.src)}</span></li>`).join('')}</ul><p class="meta">This edition gives no scenario shares: we do not yet hold an ensemble of model runs (see "What we do not hold yet").</p>`)}
${sec('decided', 'What the authorities have decided', `<div class="wx-scroll" tabindex="0"><table class="br-t br-dec"><thead><tr><th scope="col">Who</th><th scope="col">Decision</th><th scope="col">Published (UTC)</th><th scope="col">Label</th></tr></thead><tbody>${E.decided.map(d => `<tr class="br-i-${esc(d.label)}"><th scope="row">${esc(d.who)}</th><td>${esc(d.what)} <a href="${esc(d.row ? TL(d.row) : d.url)}">${d.row ? 'timeline' : 'record'}</a>${d.row && /^https:/.test(d.url) ? ` · <a href="${esc(d.url)}">source</a>` : ''}</td><td class="br-when">${esc(d.when)}</td><td>${lbl(d.label)}</td></tr>`).join('')}</tbody></table></div><p class="br-src">Every decision with its addresses and the time read: <a href="../${INC}decisions.html">decisions</a> and <a href="../${D}decisions/entities/airport.json">the entity files</a> (incident.researcher@). Evidence here was read through the press because the operator's own page was not readable to us.</p>`)}
${sec('compare', 'Sources compared, with our confidence', `<div class="wx-scroll" tabindex="0"><table class="br-t br-cmp"><thead><tr><th scope="col">Topic</th><th scope="col">IPMA (${lbl('fact')})</th><th scope="col">Forecasts and models (${lbl('fact')})</th><th scope="col">Observed (${lbl('fact')})</th><th scope="col">Press (${lbl('evidence')})</th><th scope="col">Agree or differ</th><th scope="col">Our assessment (${lbl('hypothesis')})</th><th scope="col">Confidence</th></tr></thead><tbody>${E.compare.map(c => `<tr><th scope="row">${esc(c.topic)}</th><td>${esc(c.official)}</td><td>${esc(c.models)}</td><td>${esc(c.obs)}</td><td>${esc(c.press)}</td><td class="br-agree br-agree-${c.agree.includes('differ') ? 'no' : 'yes'}">${esc(c.agree)}</td><td class="br-hyptd">${esc(c.assessment)}</td><td>${conf(c.confidence)}</td></tr>`).join('')}</tbody></table></div><p class="br-src">Confidence is ours: <b>HIGH</b> where the official word, the forecasts and the observations agree; <b>MEDIUM</b> where they agree in outline but one is missing or vague; <b>LOW</b> where they differ. It is a judgement about our reading, not a probability of the weather. Sources: <a href="../${D}weather/warnings.json">warnings</a>, <a href="../${D}weather/airport.json">airport (METAR, TAF)</a>, <a href="../${D}weather/stations.json">stations</a>, <a href="../${D}weather/forecast.json">IPMA's and MET Norway's runs</a>, <a href="../${D}weather/communiques.json">IPMA's communiqués</a>, <a href="../${D}weather/analysis.md">the meteorologist's analysis</a>, <a href="../${INC}timeline.html">the timeline</a>.</p>`, 'br-break')}
<div class="br-two br-break">${sec('lisbon', 'Lisbon', `${rainTable}${airportLine}<p>${lbl('fact')} Thursday morning (Web Summit's Day 3): ${chg?.thursday?.lisbon_warnings_touching_thursday?.none_above_yellow ? 'no IPMA warning for Lisbon above yellow' : 'see IPMA'}; IPMA's model, run ${hm(chg?.thursday?.ipma_model_thursday_morning?.model_updated_local + 'Z')}: mean wind ${chg?.thursday?.ipma_model_thursday_morning?.wind_mean_kmh_range?.join(' to ')} km/h from the ${chg?.thursday?.ipma_model_thursday_morning?.wind_dirs?.join(', ')}, rain chance up to ${chg?.thursday?.ipma_model_thursday_morning?.rain_prob_pct_max}%, sea ${chg?.thursday?.ipma_model_thursday_morning?.sea_total_m_range?.join(' to ')} m. ${prov("IPMA's hourly model", chg?.thursday?.ipma_model_thursday_morning?.source, chg?.thursday?.ipma_model_thursday_morning?.read_utc)}</p>`)}
${sec('madeira', 'Madeira', `${madTable}<ul class="br-items">${madW}<li>${lbl('evidence')} The regional president gave 205 occurrences to 09:00, 542 responders and 216 vehicles, none classed as serious, and a rain figure of 479 mm (where and over what time: not stated in what we read). <a href="${TL('s-1111T1007')}">Timeline</a></li><li>${lbl('fact')} The airport's wind fell from south-west gusts of 89 km/h at 07:00 to north-east 13 km/h at 08:00. ${lbl('hypothesis')} A centre or a separate feature passed close to the island about then (incident.meteorologist@). <a href="${TL('s-1111T0822')}">Timeline</a></li></ul>`)}</div>
${sec('transport', 'Getting around: flights, buses, ferries', transport, 'br-break')}
${sec('exposed', 'Who is exposed, and precedents: what we do not hold yet', `<p>Watchfloor's brief showed us what a decision brief needs; these parts are not yet in our data. We print no figure until it is read at its own source, with its licence. They are being added by incident.datascience@ and will appear in the next editions.</p><div class="wx-scroll" tabindex="0"><table class="br-t"><thead><tr><th scope="col">What</th><th scope="col">Who, from what source</th><th scope="col">State at ${hm(E.as_of)}</th></tr></thead><tbody>${E.gaps.map(g => `<tr><th scope="row">${esc(g.what)}</th><td>${esc(g.who)}</td><td>${esc(g.state)}</td></tr>`).join('')}</tbody></table></div>`)}
${sec('method', 'How this brief is made, and where every figure comes from', `<ul class="br-items"><li>Written by incident.brief@web-summit.dinis, one agent of the incident team run for Dinis Cruz; the words of this edition are in <a href="edition-${E.edition}.json">edition-${E.edition}.json</a> and the page is drawn by <a href="../tools/brief-make.mjs">tools/brief-make.mjs</a> from the incident's files, read at the times shown. The same files are served for agents at <a href="../api/v1/index.json">api/v1</a>.</li><li>Warnings: IPMA's open data, checked against its messages in MeteoAlarm's feed (incident.meteorologist@). Observations: IPMA's stations; airports' METAR and TAF (NOAA Aviation Weather). Models: IPMA's hourly model and MET Norway. Decisions: incident.researcher@'s entity files. Flights and buses: incident.transport@ (OpenSky Network, Carris Metropolitana, Transtejo Soflusa). Press: our timeline, each item with its link.</li><li>Learned from the shape of Watchfloor (Notamy Ltd)'s decision brief of 11 November, with thanks; none of its words or figures is used here (<a href="../research/watchfloor/README.md">what it holds</a>).</li><li>No model output is quoted as fact; hypotheses are ours and say so. Corrections: the "Contact us" link on every page.</li></ul>`, 'br-break')}
</div>`

const kept = `> Kept by incident.brief@web-summit.dinis, 2026-11-11, ${new Date().toISOString().slice(11, 16)} UTC`
const fm = (title, summary) => `---\ntitle: ${title}\nsummary: ${summary}\nmount: ${html.replace(/\n/g, '')}\nhead: <link rel="stylesheet" href="brief.css">\n---\n`
const body = (n) => `# Storm Charles: decision brief, edition ${n}

${kept}

This is edition ${n} of our decision brief, as of ${hm(E.as_of)} UTC on Wednesday 11 November 2026. **Not an official warning: IPMA issues the warnings and ANEPC the instructions.** The brief's words, as data: [edition-${n}.json](edition-${n}.json). Every edition: [the list](README.md#editions). A PDF is rendered from this page (A4 landscape) on request.

## Editions

- [Edition 1](edition-1.md): as of 11:40 UTC, Wednesday 11 November: the storm over the mainland; Madeira's worst passed.
`
const summary = `Our decision brief on Storm Charles, edition ${E.edition}, as of ${hm(E.as_of)} UTC: the lead, IPMA's warnings hour by hour, what to watch, what the authorities decided, sources compared with our confidence, Lisbon, Madeira, transport, and how it is made. Not an official warning: IPMA issues the warnings and ANEPC the instructions.`
fs.writeFileSync(path.join(ROOT, `brief/edition-${N}.md`), fm(`Storm Charles: decision brief, edition ${N}`, summary) + body(N))
fs.writeFileSync(path.join(ROOT, 'brief/README.md'), fm('Storm Charles: decision brief', summary) + body(N))
console.log(`brief/edition-${N}.md and brief/README.md: ${html.length} bytes of page; ${rows.length} warning rows`)
