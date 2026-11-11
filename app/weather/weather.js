// The Weather face (incident.weather@web-summit.dinis): Storm Charles as a weather channel would show it.
// It reads ONLY what the data room publishes (api/v1/<incident>/..., incident.json), fetches nothing external, and states no
// forecast or advice of its own. IPMA's warnings and the authorities' decisions are facts with their source and the time read;
// the meteorologist's analysis is shown as a hypothesis and looks different. Every figure links to its file in the data room.
// Colours: tokens only; IPMA's red, orange and yellow only for IPMA's levels. No images: everything is drawn from the data.
(function () {
  'use strict'
  var el = document.getElementById('wx'); if (!el) return
  var base = el.dataset.base || '../', inc = el.dataset.incident || '2026-11-10-storm-charles'
  var api = base + 'api/v1/' + inc + '/', room = base + 'incidents/' + inc + '/'
  var FILES = {
    incident: room + 'incident.json', signals: api + 'signals.json', warn: api + 'weather/warnings.json', rain: api + 'weather/lisbon-rain.json',
    stations: api + 'weather/stations.json', forecast: api + 'weather/forecast.json', airport: api + 'weather/airport.json',
    madeira: api + 'weather/madeira.json', changes: api + 'weather/changes.json', analysis: api + 'weather/analysis.json', decisions: api + 'decisions/graph.json'
  }
  // where a reader lands for each file: the data room's own copy (one place to change when the data room's file viewer is live)
  var ROOM = {
    incident: room + 'incident.json', signals: room + 'timeline.html', warn: room + 'data/weather/warnings.json', rain: room + 'data/weather/lisbon-rain.json',
    stations: room + 'data/weather/stations.json', forecast: room + 'data/weather/forecast.json', airport: room + 'data/weather/airport.json',
    madeira: room + 'data/weather/madeira.json', changes: room + 'data/weather/changes.json', analysis: room + 'data/weather/analysis.html', decisions: room + 'data/decisions/graph.json'
  }
  var qNow = new URLSearchParams(location.search).get('now')   // ?now=2026-11-11T13:00Z shows the page as at that time (a check, not a forecast)
  var now = function () { var t = qNow ? Date.parse(qNow) : NaN; return isNaN(t) ? Date.now() : t }

  // ---------- small tools
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var T = function (t) { return typeof t === 'number' ? t : Date.parse(t) }
  var ok = function (t) { return t != null && !isNaN(T(t)) }
  var iso = function (t) { return new Date(T(t)).toISOString() }
  var hm = function (t) { return ok(t) ? iso(t).slice(11, 16) : '?' }
  var day = function (t) { return iso(t).slice(0, 10) }
  var loc = function (t, o) { o.timeZone = 'UTC'; return new Date(T(t)).toLocaleDateString('en-GB', o) }
  var wd = function (t) { return loc(t, { weekday: 'short' }) }
  var longDay = function (t) { return loc(t, { weekday: 'long', day: 'numeric', month: 'long' }) }
  var when = function (t, ref) { return ok(t) ? (day(t) === day(ref) ? '' : wd(t) + ' ') + hm(t) : '?' }
  var num = function (v, d) { return v == null || isNaN(v) ? '–' : (+v).toFixed(d || 0) }
  var prov = function (key, name, read, hash) {
    return '<span class="prov">Source: <a href="' + esc(ROOM[key] + (hash || '')) + '">' + esc(name) + '</a>' + (ok(read) ? ', read <time datetime="' + esc(read) + '">' + (day(read) === day(now()) ? '' : wd(read) + ' ') + hm(read) + ' UTC</time>' : '') + '</span>'
  }
  var RANK = { yellow: 1, orange: 2, red: 3 }
  var EN = { 'Vento': 'Wind', 'Precipitação': 'Rain', 'Agitação Marítima': 'Rough sea', 'Trovoada': 'Thunderstorms', 'Nevoeiro': 'Fog', 'Neve': 'Snow', 'Tempo Frio': 'Cold', 'Tempo Quente': 'Heat' }
  var AREA = { MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountains', MPS: 'Porto Santo' }
  var DEG = { N: 0, NNE: 22.5, NE: 45, ENE: 67.5, E: 90, ESE: 112.5, SE: 135, SSE: 157.5, S: 180, SSW: 202.5, SW: 225, WSW: 247.5, W: 270, WNW: 292.5, NW: 315, NNW: 337.5 }
  var lvl = function (l) { return '<span class="lvl ' + esc(l) + '">' + esc(l) + '</span>' }
  var lbl = function (l) { return '<span class="lbl l-' + esc(l) + '">' + esc(l) + '</span>' }
  // an arrow that points where the wind blows TO, from the compass point (or degrees) it blows FROM
  var arrow = function (from) {
    var d = typeof from === 'number' ? from : DEG[from]; if (d == null) return ''
    return '<svg class="wxc-arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" style="transform:rotate(' + ((d + 180) % 360) + 'deg)"><path d="M6 .8 9.4 10.6 6 8.4 2.6 10.6z"/></svg>'
  }
  var ICON = {
    rain: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path class="i-cloud" d="M7 15a4.5 4.5 0 1 1 1-8.9A5.5 5.5 0 0 1 18.6 8 3.6 3.6 0 0 1 18 15z"/><path class="i-drop" d="M8.5 17.5l-1 3M12.5 17.5l-1 3M16.5 17.5l-1 3"/></svg>',
    wind: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path class="i-line" d="M3 9h10.5a2.5 2.5 0 1 0-2.4-3.2M3 13h15a2.6 2.6 0 1 1-2.5 3.4M3 17h7.5a2 2 0 1 1-1.9 2.6"/></svg>',
    sea: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path class="i-line" d="M2 9c2.5-3 5-3 7 0s4.500 3 7 0 4-2 6-1M2 15c2.500-3 5-3 7 0s4.500 3 7 0 4-2 6-1"/></svg>'
  }
  var iconFor = function (type) { return type === 'Vento' ? ICON.wind : type === 'Precipitação' ? ICON.rain : type === 'Agitação Marítima' ? ICON.sea : '' }
  var status = function (w, t) { return T(w.end_utc) <= t ? 'ended' : T(w.start_utc) <= t ? 'in force' : 'expected' }

  // ---------- read the data room
  var D = {}, failed = []
  function load() {
    failed = []
    return Promise.all(Object.keys(FILES).map(function (k) {
      return fetch(FILES[k], { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() }).then(function (j) { D[k] = j }).catch(function () { failed.push(k) })
    }))
  }

  // ---------- the sections
  function lisbonWarnings() { return ((D.warn || {}).lisbon || []).filter(function (w) { return RANK[w.level] && ok(w.start_utc) && ok(w.end_utc) }) }

  function hero(t) {
    var I = D.incident || {}, h = I.headline || {}, ws = lisbonWarnings()
    var live = ws.filter(function (w) { return status(w, t) === 'in force' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] })
    var next = ws.filter(function (w) { return status(w, t) === 'expected' }).sort(function (a, b) { return T(a.start_utc) - T(b.start_utc) || RANK[b.level] - RANK[a.level] })
    var top = live[0], wp = D.warn ? prov('warn', "IPMA's warnings for the Lisbon district", D.warn.read_utc) : ''
    var line = function (w) {
      var st = status(w, t)
      return '<li class="wxc-w w-' + esc(w.level) + '"><span class="wxc-w-i">' + iconFor(w.type) + '</span><div><p class="wxc-w-h">' + lvl(w.level) + ' <b>' + esc(EN[w.type] || w.type) + '</b> <span class="wxc-st">' + (st === 'in force' ? 'in force until ' + when(w.end_utc, t) : 'from ' + when(w.start_utc, t) + ' to ' + when(w.end_utc, t)) + '</span></p>' +
        '<p class="wxc-w-t"><span lang="pt">' + esc(w.text_pt || '') + '</span> <span class="meta">(IPMA\'s words' + (ok(w.sent_utc) ? '; sent ' + when(w.sent_utc, t) + ' UTC' : '') + ')</span></p></div></li>'
    }
    var sigUrl = h.url && ((D.signals || {}).items || []).filter(function (s) { return (s.sources || []).some(function (x) { return x.url === h.url }) }).pop()
    var s = '<section class="wxc-hero' + (top ? ' h-' + esc(top.level) : '') + '" aria-labelledby="wxc-now">' +
      '<div class="wxc-hero-main"><p class="kicker">' + esc(I.kicker || 'Storm Charles') + '</p>' +
      '<h1 id="wxc-now">Lisbon now <time datetime="' + iso(t) + '">' + esc(longDay(t)) + ', ' + hm(t) + ' UTC <span>(Lisbon time)</span></time></h1>' +
      (D.warn ? '<h2 class="wxc-sub">' + (live.length ? 'IPMA warnings in force this hour' : 'No IPMA warning above green is in force in Lisbon this hour') + '</h2>' + (live.length ? '<ul class="wxc-ws">' + live.map(line).join('') + '</ul>' : '') +
        (next.length ? '<h2 class="wxc-sub">Next, as IPMA warns</h2><ul class="wxc-ws next">' + next.map(line).join('') + '</ul>' : '') + '<p>' + wp + '</p>' : '<p class="meta">The warnings file could not be read.</p>') +
      '</div><div class="wxc-hero-side">' + nowTiles(t) +
      (h.text ? '<div class="wxc-decision"><p class="wxc-eyebrow">The decision ' + lbl(h.label || 'fact') + '</p><p class="wxc-dtext">' + esc(h.text) + '</p><p class="prov">' + esc(h.source || '') + ', ' + esc(h.at || '') + '. <a href="' + esc(sigUrl ? ROOM.signals + '#' + sigUrl.id : room + 'index.html') + '">In the data room</a></p></div>' : '') +
      '</div></section>'
    return s
  }

  function nowTiles(t) {
    var st = (D.stations || {}).stations || [], geo = st.filter(function (s) { return s.latest && s.latest.temp_c != null })[0]
    var gv = D.airport && D.airport.metars && D.airport.metars.length ? D.airport.metars[D.airport.metars.length - 1] : null
    var wet = null, windiest = null
    st.forEach(function (s) { var l = s.latest; if (!l) return; if (l.rain_mm != null && (!wet || l.rain_mm > wet.latest.rain_mm)) wet = s; if (l.wind_mean_kmh != null && (!windiest || l.wind_mean_kmh > windiest.latest.wind_mean_kmh)) windiest = s })
    ;((D.rain || {}).stations || []).forEach(function (s) { var l = (s.hourly || [])[s.hourly.length - 1]; if (l && l.rain_mm != null && (!wet || l.rain_mm > (wet.latest || wet._l).rain_mm)) wet = { name: s.name, _l: l, latest: l } })
    var tiles = []
    if (geo) tiles.push(['Temperature', num(geo.latest.temp_c, 1) + '<small>°C</small>', esc(geo.name) + ', the hour to ' + hm(geo.latest.time_utc), prov('stations', 'IPMA stations', geo.read_utc)])
    if (wet) tiles.push(['Rain, last hour', num(wet.latest.rain_mm, 1) + '<small>mm</small>', 'the wettest of IPMA\'s Lisbon stations: ' + esc(wet.name) + ', the hour to ' + hm(wet.latest.time_utc), prov('rain', 'IPMA stations', (D.rain || D.stations).read_utc)])
    if (windiest) tiles.push(['Wind, hourly mean', arrow(windiest.latest.wind_dir) + num(windiest.latest.wind_mean_kmh) + '<small>km/h ' + esc(windiest.latest.wind_dir || '') + '</small>', 'the windiest station: ' + esc(windiest.name) + ', the hour to ' + hm(windiest.latest.time_utc) + '. A mean, not a gust', prov('stations', 'IPMA stations', windiest.read_utc)])
    if (gv) tiles.push(['Airport, ' + hm(gv.time_utc), (gv.gust_kmh != null ? 'gust ' + num(gv.gust_kmh) : num(gv.wind_kmh)) + '<small>km/h</small>', (gv.gust_kmh != null ? 'mean ' + num(gv.wind_kmh) + ' km/h. ' : 'no gust reported. ') + 'Pressure ' + num(gv.pressure_hpa) + ' hPa. Lisbon airport\'s own report (METAR)', prov('airport', 'METAR LPPT', gv.read_utc)])
    if (!tiles.length) return ''
    return '<div class="wxc-tiles" aria-label="Observed in Lisbon">' + tiles.map(function (x) { return '<div class="wxc-tile"><p class="wxc-eyebrow">' + x[0] + ' <span class="lvl obs">observed</span></p><p class="wxc-big">' + x[1] + '</p><p class="meta">' + x[2] + '</p><p>' + x[3] + '</p></div>' }).join('') + '</div>'
  }

  // today, hour by hour: 24 columns, each the hour that STARTS at its label. A station's value labelled HH:00 is read as the hour ending
  // then (the meteorologist's inference, hour_label in lisbon-rain.json), so it sits in the column before its label.
  function hours(t) {
    var D0 = T(day(t) + 'T00:00:00Z'), D1 = D0 + 864e5, H = 36e5, nowH = Math.floor((t - D0) / H)
    var ws = lisbonWarnings().filter(function (w) { return T(w.start_utc) < D1 && T(w.end_utc) > D0 })
    var cols = []; for (var i = 0; i < 24; i++) cols.push(i)
    var cell = function (h, inner, cls, title) { return '<div class="wxc-c' + (h === nowH ? ' now' : h < nowH ? ' past' : '') + (cls ? ' ' + cls : '') + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + inner + '</div>' }
    var row = function (label, sub, cells, cls) { return '<div class="wxc-row' + (cls ? ' ' + cls : '') + '"><div class="wxc-lab"><b>' + label + '</b>' + (sub ? '<i>' + sub + '</i>' : '') + '</div>' + cells + '</div>' }
    var out = row('Hour', 'UTC = Lisbon', cols.map(function (h) { return cell(h, '<b>' + ('0' + h).slice(-2) + '</b>' + (h === nowH ? '<i>now</i>' : '')) }).join(''), 'wxc-head')

    // 1. warned: one lane per type, IPMA's colours, the level written
    var types = []; ws.forEach(function (w) { if (types.indexOf(w.type) < 0) types.push(w.type) })
    var order = ['Precipitação', 'Vento', 'Agitação Marítima']; types.sort(function (a, b) { return (order.indexOf(a) + 9) % 9 - (order.indexOf(b) + 9) % 9 })
    types.forEach(function (ty) {
      var bars = ws.filter(function (w) { return w.type === ty }).sort(function (a, b) { return T(a.start_utc) - T(b.start_utc) }).map(function (w) {
        var a = Math.max(0, Math.round((T(w.start_utc) - D0) / H)), b = Math.min(24, Math.round((T(w.end_utc) - D0) / H)); if (b <= a) return ''
        return '<div class="wxc-band w-' + esc(w.level) + (T(w.end_utc) <= t ? ' ended' : '') + '" style="grid-column:' + (a + 2) + '/' + (b + 2) + '" title="' + esc(w.level + ' ' + (EN[ty] || ty) + ', ' + when(w.start_utc, t) + ' to ' + when(w.end_utc, t) + '. ' + (w.text_pt || '')) + '"><b>' + esc(w.level) + '</b> <span>' + hm(Math.max(T(w.start_utc), D0)) + '–' + (T(w.end_utc) > D1 ? wd(w.end_utc) + ' ' : '') + hm(w.end_utc) + '</span></div>'
      }).join('')
      out += '<div class="wxc-row wxc-warn"><div class="wxc-lab"><b>' + iconFor(ty) + esc(EN[ty] || ty) + '</b><i>IPMA warning</i></div>' + bars + cols.map(function (h) { return '<div class="wxc-c bg' + (h === nowH ? ' now' : '') + '" style="grid-column:' + (h + 2) + '"></div>' }).join('') + '</div>'
    })

    // 2. rain: observed (the wettest of the Lisbon stations each hour), then IPMA's automatic forecast (chance and intensity class)
    var rs = (D.rain || {}).stations || [], fr = ((D.forecast || {}).hourly || {}).rows || []
    var fAt = function (h) { var x = D0 + h * H; return fr.filter(function (r) { return T(r.time_utc) === x })[0] }
    var obsAt = function (list, h, key) { var x = D0 + (h + 1) * H, best = null; list.forEach(function (s) { (s.hourly || []).forEach(function (r) { if (T(r.time_utc) === x && r[key] != null && (!best || r[key] > best.v)) best = { v: r[key], s: s.name, r: r } }) }); return best }
    var maxRain = 1; cols.forEach(function (h) { var o = obsAt(rs, h, 'rain_mm'); if (o && o.v > maxRain) maxRain = o.v })
    out += row(ICON.rain + 'Rain', 'mm in the hour, observed · then IPMA\'s automatic forecast: chance, and intensity class as height', cols.map(function (h) {
      var o = obsAt(rs, h, 'rain_mm'), f = fAt(h)
      if (o) return cell(h, '<span class="wxc-bar" style="height:' + Math.round(4 + 40 * o.v / maxRain) + 'px"></span><b>' + num(o.v, o.v < 10 ? 1 : 0) + '</b>', 'obs', ('0' + h).slice(-2) + ':00 to ' + ('0' + (h + 1)).slice(-2) + ':00: ' + o.v + ' mm at ' + o.s + ' (the wettest of ' + rs.length + ' stations)')
      if (f && (f.rain_intensity_class != null || f.rain_prob_pct != null)) return cell(h, '<span class="wxc-bar auto" style="height:' + (f.rain_intensity_class != null ? 6 + 12 * f.rain_intensity_class : 4) + 'px"></span><b>' + (f.rain_prob_pct != null ? f.rain_prob_pct + '%' : '&nbsp;') + '</b>', 'auto', hm(f.time_utc) + ': IPMA automatic forecast' + (f.rain_prob_pct != null ? ', chance of rain ' + f.rain_prob_pct + '%' : '') + (f.rain_intensity_class != null ? ', intensity class ' + f.rain_intensity_class : ''))
      return cell(h, '', 'empty')
    }).join(''), 'wxc-rain')

    // 3. wind: observed hourly mean (the windiest station) and the airport's gusts; then IPMA's automatic forecast (mean wind, no gusts)
    var ss = (D.stations || {}).stations || [], ms = (D.airport || {}).metars || []
    var gustIn = function (h) { var a = D0 + h * H, best = null; ms.forEach(function (m) { var x = T(m.time_utc); if (x > a && x <= a + H && m.gust_kmh != null && (!best || m.gust_kmh > best.gust_kmh)) best = m }); return best }
    out += row(ICON.wind + 'Wind', 'km/h, hourly mean, observed · then IPMA\'s automatic forecast', cols.map(function (h) {
      var o = obsAt(ss, h, 'wind_mean_kmh'), f = fAt(h)
      if (o) return cell(h, arrow(o.r.wind_dir) + '<b>' + num(o.v) + '</b><i>' + esc(o.r.wind_dir || '') + '</i>', 'obs', ('0' + h).slice(-2) + ':00 to ' + ('0' + (h + 1)).slice(-2) + ':00: mean wind ' + o.v + ' km/h from ' + o.r.wind_dir + ' at ' + o.s + ' (the windiest of ' + ss.length + ' stations)')
      if (f && f.wind_mean_kmh != null) return cell(h, arrow(f.wind_dir) + '<b>' + num(f.wind_mean_kmh) + '</b><i>' + esc(f.wind_dir || '') + '</i>', 'auto', hm(f.time_utc) + ': IPMA automatic forecast, mean wind ' + f.wind_mean_kmh + ' km/h from ' + f.wind_dir + ' (a mean at one point; no gusts in this feed)')
      return cell(h, '', 'empty')
    }).join(''), 'wxc-wind')
    if (ms.length) out += row('Gusts', 'km/h, observed at Lisbon airport', cols.map(function (h) {
      var g = gustIn(h); return g ? cell(h, '<b>' + num(g.gust_kmh) + '</b>', 'obs', hm(g.time_utc) + ': gust ' + g.gust_kmh + ' km/h at Lisbon airport (METAR)') : cell(h, h < nowH ? '<i>none</i>' : '', h < nowH ? 'obs quiet' : 'empty', h < nowH ? 'no gust reported at the airport in this hour' : '')
    }).join(''), 'wxc-gust')
    // 4. temperature
    out += row('Temperature', '°C, observed · then automatic forecast', cols.map(function (h) {
      var o = obsAt(ss, h, 'temp_c'), f = fAt(h)
      if (o) return cell(h, '<b>' + num(o.v) + '°</b>', 'obs', o.v + ' °C at ' + o.s)
      if (f && f.temp_c != null) return cell(h, '<b>' + num(f.temp_c) + '°</b>', 'auto', hm(f.time_utc) + ': IPMA automatic forecast ' + f.temp_c + ' °C')
      return cell(h, '', 'empty')
    }).join(''), 'wxc-temp')

    var windW = ws.filter(function (w) { return w.type === 'Vento' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] })[0]
    return '<section class="wxc-sec" aria-labelledby="wxc-h-today"><h2 id="wxc-h-today">Today, hour by hour <span class="meta">' + esc(longDay(t)) + ', Lisbon</span></h2>' +
      '<div class="wxc-scroll" tabindex="0" role="group" aria-label="Today hour by hour: scrolls sideways"><div class="wxc-grid">' + out + '</div></div>' +
      '<ul class="wxc-legend"><li><span class="k k-warn"></span>IPMA\'s warning, in IPMA\'s colour, the level written</li><li><span class="k k-obs"></span>observed (a measurement)</li><li><span class="k k-auto"></span>IPMA\'s automatic forecast for one point in the city</li></ul>' +
      '<p class="wxc-note"><b>Why the wind numbers look small beside a ' + (windW ? esc(windW.level) + ' ' : '') + 'wind warning.</b> The hourly numbers are mean wind: the wind averaged over an hour at one station, or a computer model\'s value for one point. A warning is about gusts, and is written by IPMA\'s forecasters for the whole district' + (windW ? ': <span lang="pt">' + esc(String(windW.text_pt).replace(/\.\s*$/, '')) + '</span>' : '') + '. The warning is the one to follow.</p>' +
      '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.read_utc) + ' · ' : '') + (D.rain ? prov('rain', 'IPMA stations, rain', D.rain.read_utc) + ' · ' : '') + (D.stations ? prov('stations', 'IPMA stations, wind', D.stations.read_utc) + ' · ' : '') + (D.airport ? prov('airport', 'Lisbon airport (METAR)', D.airport.read_utc) + ' · ' : '') + (D.forecast && D.forecast.hourly ? prov('forecast', 'IPMA automatic forecast', D.forecast.hourly.read_utc) : '') + '</p></section>'
  }

  // our meteorologist's reading: a hypothesis, never a forecast of ours stated as fact. Dashed, and it says so.
  function reading(t) {
    var A = D.analysis; if (!A) return ''
    var ups = A.updates || [], win = null, hyp = null, conf = null
    ups.forEach(function (u) { if (u.worst_window_utc) win = u; if (u.hypothesis) hyp = u; if (u.hypothesis_confidence) conf = u.hypothesis_confidence })
    win = win || A.wednesday_lisbon; if (!win && !hyp) return ''
    var list = function (a) { return (a || []).map(function (x) { return '<li>' + esc(x) + '</li>' }).join('') }
    return '<section class="wxc-sec wxc-hyp" aria-labelledby="wxc-h-read"><h2 id="wxc-h-read">Our meteorologist\'s reading ' + lbl('hypothesis') + '</h2>' +
      '<p class="wxc-hyp-say">This is analysis by the team\'s meteorologist agent from the published data. It is not IPMA\'s forecast and not advice: IPMA\'s warnings above are what stands.</p>' +
      (win && win.worst_window_utc ? '<p class="wxc-hyp-line">Worst of the day in Lisbon: about <b>' + hm(win.worst_window_utc[0]) + ' to ' + hm(win.worst_window_utc[1]) + '</b>' + (win.ends_utc ? ', over by about ' + hm(win.ends_utc) : '') + (win.confidence ? ' <span class="meta">(confidence in the window: ' + esc(win.confidence.window) + '; in the peak hour and strength: ' + esc(win.confidence.peak_hour_and_strength) + ')</span>' : '') + '</p>' : '') +
      (hyp ? '<p class="wxc-hyp-line">' + esc(hyp.hypothesis) + ' <span class="meta">(confidence: ' + esc(conf || hyp.confidence || 'not stated') + ')</span></p><details><summary>The reasons for and against</summary><div class="wxc-two"><div><h3>For</h3><ul>' + list(hyp['for']) + '</ul></div><div><h3>Against</h3><ul>' + list(hyp.against) + '</ul></div></div></details>' : '') +
      '<p>' + prov('analysis', 'the analysis, with its reasons', (hyp || win).written_utc || A.written_utc) + '</p></section>'
  }

  function madeira(t) {
    var M = D.madeira, items = (((D.warn || {}).red_and_orange_elsewhere || {}).items || []).filter(function (w) { return AREA[w.area] })
    if (!M && !items.length) return ''
    var st = ((M || {}).stations || []).filter(function (s) { return s.max_6h_rain && s.max_6h_rain.mm != null }).sort(function (a, b) { return b.max_6h_rain.mm - a.max_6h_rain.mm })
    var top = st.slice(0, 8), mx = top.length ? top[0].max_6h_rain.mm : 1
    var windy = ((M || {}).stations || []).map(function (s) { var l = (s.hourly || [])[s.hourly.length - 1]; return l && l.wind_mean_kmh != null ? { s: s, l: l } : null }).filter(Boolean).sort(function (a, b) { return b.l.wind_mean_kmh - a.l.wind_mean_kmh })[0]
    var bars = top.map(function (s) {
      var m = s.max_6h_rain, last = (s.hourly || [])[s.hourly.length - 1], a = T(m.hours_labelled[0]) - 36e5
      return '<li><span class="wxc-hb-n">' + esc(s.name.replace(/^Madeira, /, '')) + '</span><span class="wxc-hb-t"><span class="wxc-hb" style="width:' + (100 * m.mm / mx).toFixed(1) + '%"></span></span><span class="wxc-hb-v"><b>' + num(m.mm, 1) + '</b> mm <i>' + when(a, t) + ' to ' + when(m.hours_labelled[1], t) + (last && last.rain_mm != null ? ' · last hour ' + num(last.rain_mm, 1) + ' mm' : '') + '</i></span></li>'
    }).join('')
    var live = items.filter(function (w) { return status(w, t) !== 'ended' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] || T(a.start_utc) - T(b.start_utc) }), ended = items.length - live.length
    var wl = live.map(function (w) { var s = status(w, t); return '<li>' + lvl(w.level) + ' <b>' + esc(EN[w.type] || w.type) + '</b>, ' + esc(AREA[w.area]) + ' <span class="wxc-st">' + (s === 'in force' ? 'in force until ' + when(w.end_utc, t) : 'from ' + when(w.start_utc, t) + ' to ' + when(w.end_utc, t)) + '</span> <span lang="pt" class="meta">' + esc(w.text_pt || '') + '</span></li>' }).join('')
    return '<section class="wxc-sec" aria-labelledby="wxc-h-mad"><h2 id="wxc-h-mad">Madeira <span class="meta">where the storm arrived first</span></h2><div class="wxc-two wide">' +
      '<div><h3>Rain measured <span class="lvl obs">observed</span></h3><p class="meta">The most rain in any six hours at each of IPMA\'s stations, the eight wettest.</p><ol class="wxc-hbars">' + bars + '</ol>' +
      (windy ? '<p class="meta">Strongest hourly mean wind in the last hour: <b>' + num(windy.l.wind_mean_kmh) + ' km/h</b> ' + arrow(windy.l.wind_dir) + esc(windy.l.wind_dir) + ' at ' + esc(windy.s.name) + ' (the hour to ' + hm(windy.l.time_utc) + '; a mean, not a gust).</p>' : '') +
      '<p>' + (M ? prov('madeira', 'IPMA stations in Madeira', M.read_utc) : '') + '</p></div>' +
      '<div><h3>IPMA\'s red and orange warnings</h3>' + (wl ? '<ul class="wxc-list">' + wl + '</ul>' : '<p class="meta">None in force or expected in the file read.</p>') + (ended ? '<p class="meta">' + ended + ' earlier red or orange warning' + (ended > 1 ? 's have' : ' has') + ' ended.</p>' : '') + '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.red_and_orange_elsewhere.read_utc) : '') + '</p></div></div></section>'
  }

  // what is closed and what runs: the deciders' own decisions (data/decisions/graph.json). The grouping reads the decision's own words;
  // it adds nothing. Hypotheses are left out here: this is the list of what was decided or not yet announced.
  function closed(t) {
    var G = D.decisions; if (!G) return ''
    var nodes = {}; (G.nodes || []).forEach(function (n) { nodes[n.id] = n })
    var KIND = { transport: 1, service: 1, organiser: 1, venue: 1, municipality: 1, government: 1 }
    var es = (G.edges || []).filter(function (e) { return e.label !== 'hypothesis' && nodes[e.by] && KIND[nodes[e.by].kind] && (e.status === 'happened' || e.status === 'not_announced') && !/^madeira|^apram/.test(e.by) && !/^(mayor-expects|websummit-assessing|mai-websummit|gov-recommends)/.test(e.id) })
    var off = /clos|suspend|cancel|will not take place|suppress|called off/i, lim = /limit|condition|constraint|disruption|adjust|reassess|watched|rebook/i
    var g = { off: [], lim: [], on: [], open: [] }
    es.forEach(function (e) { (e.status === 'not_announced' ? g.open : off.test(e.decision) ? g.off : lim.test(e.decision) ? g.lim : g.on).push(e) })
    var item = function (e) {
      var n = nodes[e.by], who = String(n.name).replace(/\s*\(.*$/, ''), hrs = ok(e.effect_from_utc) ? (ok(e.effect_to_utc) ? when(e.effect_from_utc, t) + ' to ' + when(e.effect_to_utc, t) : 'from ' + when(e.effect_from_utc, t)) : ''
      var txt = String(e.decision); if (txt.length > 170) txt = txt.slice(0, 168).replace(/\s+\S*$/, '') + '…'
      return '<li><p><b>' + esc(who) + '</b> ' + lbl(e.label) + (hrs ? ' <span class="wxc-st">' + hrs + '</span>' : '') + '</p><p>' + esc(txt) + '</p><p class="prov">' + (/T\d\d:\d\d/.test(e.at || '') ? 'decided ' + when(e.at, t) + ' UTC · ' : '') + 'read ' + (ok(e.read) ? when(e.read, t) + ' UTC' : 'time not recorded') + ' · <a href="' + esc(ROOM.decisions) + '">in the data room</a> (' + esc(e.id) + ')</p></li>'
    }
    var col = function (title, sub, list, cls) { return list.length ? '<div class="wxc-col ' + cls + '"><h3>' + title + ' <span class="meta">' + list.length + '</span></h3><p class="meta">' + sub + '</p><ul class="wxc-list">' + list.map(item).join('') + '</ul></div>' : '' }
    return '<section class="wxc-sec" aria-labelledby="wxc-h-closed"><h2 id="wxc-h-closed">What is closed and what runs <span class="meta">Lisbon and the mainland, as each body decided</span></h2><div class="wxc-cols">' +
      col('Closed or suspended', 'Decided by the body named.', g.off, 'c-off') + col('Running, with limits', 'Running, with a limit or a warning of disruption.', g.lim, 'c-lim') + col('Running', 'Said to run.', g.on, 'c-on') + col('Not yet announced', 'Due, and nothing announced when last read.', g.open, 'c-open') +
      '</div><p class="meta">' + lbl('fact') + ' read on the body\'s own channel. ' + lbl('evidence') + ' reported by others, such as the press. ' + prov('decisions', 'the decision graph', G.updated) + '</p></section>'
  }

  function tomorrow(t) {
    var C = (D.changes || {}).thursday, I = D.incident || {}; if (!C && !I.thursday) return ''
    var d = C && C.ipma_daily_thursday, m = C && C.ipma_model_thursday_morning, w = C && C.lisbon_warnings_touching_thursday
    var date = d && d.forecastDate ? d.forecastDate + 'T12:00:00Z' : null, isTom = date && day(date) === day(t + 864e5), isToday = date && day(date) === day(t)
    var A = D.analysis, view = null; ((A || {}).updates || []).forEach(function (u) { if (u.thursday_morning) view = u })
    var tiles = ''
    if (w) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">IPMA warnings for Lisbon</p>' + ((w.items || []).length ? '<ul class="wxc-list tight">' + w.items.map(function (x) { return '<li>' + lvl(x.level) + ' <b>' + esc(EN[x.type] || x.type) + '</b> ' + when(x.start_utc, t) + ' to ' + when(x.end_utc, t) + '</li>' }).join('') + '</ul>' : '<p class="wxc-big">none</p>') + '<p class="meta">' + (w.none_above_yellow ? 'Nothing above yellow touches the day in the file read.' : '') + '</p><p>' + prov('changes', 'IPMA warnings', w.read_utc) + '</p></div>'
    if (d) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">IPMA\'s daily forecast, Lisbon</p><p class="wxc-big">' + num(d.tMin) + '° <small>to</small> ' + num(d.tMax) + '°</p><p class="meta">Chance of rain ' + num(d.precipitaProb) + '%. Wind from ' + arrow(d.predWindDir) + esc(d.predWindDir || '?') + '.</p><p>' + prov('changes', 'IPMA daily forecast', d.read_utc) + '</p></div>'
    if (m) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">The morning, IPMA\'s automatic forecast</p><p class="wxc-big">' + num(m.wind_mean_kmh_range[0]) + '–' + num(m.wind_mean_kmh_range[1]) + '<small>km/h mean wind</small></p><p class="meta">00:00 to 12:00, from ' + esc((m.wind_dirs || []).join(', ')) + '. Chance of rain up to ' + num(m.rain_prob_pct_max) + '%. A mean at one point, not gusts.</p><p>' + prov('changes', 'IPMA automatic forecast', m.read_utc) + '</p></div>'
    return '<section class="wxc-sec" aria-labelledby="wxc-h-tom"><h2 id="wxc-h-tom">' + (isTom ? 'Tomorrow' : isToday ? 'Today' : 'Next') + (date ? ' <span class="meta">' + esc(longDay(date)) + ', what the sources say</span>' : '') + '</h2>' +
      (tiles ? '<div class="wxc-tiles three">' + tiles + '</div>' : '') +
      (I.thursday ? '<div class="wxc-decision flat"><p class="wxc-eyebrow">Web Summit, Day 3 ' + lbl('fact') + '</p><p class="wxc-dtext">' + esc(I.thursday) + '</p><p class="prov"><a href="' + esc(room + 'index.html') + '">In the data room</a></p></div>' : '') +
      (view ? '<div class="wxc-hyp inline"><p><b>Our meteorologist\'s reading</b> ' + lbl('hypothesis') + ' Thursday morning: ' + esc(view.thursday_morning.view) + ' <span class="meta">(confidence: ' + esc(view.thursday_morning.confidence) + '). ' + esc(view.thursday_morning.why) + '.</span> Not IPMA\'s forecast. ' + prov('analysis', 'the analysis', view.written_utc) + '</p></div>' : '') + '</section>'
  }

  function latest(t) {
    var S = D.signals; if (!S) return ''
    var items = (S.items || []).filter(function (x) { return x.key }).slice(-6).reverse()
    return '<section class="wxc-sec" aria-labelledby="wxc-h-last"><h2 id="wxc-h-last">The last changes <span class="meta">newest first</span></h2><ol class="wxc-feed">' + items.map(function (x) {
      return '<li><a class="wxc-feed-t" href="' + esc(ROOM.signals + '#' + x.id) + '"><time datetime="' + esc(x.at) + '">' + (x.approx ? '~' : '') + when(x.at, t) + '</time></a><div><p>' + lbl(x.label) + (x.decision ? ' <span class="lbl dec">decision</span>' : '') + ' ' + esc(x.text) + '</p><p class="prov">' + esc((x.sources || []).map(function (s) { return s.label }).slice(0, 2).join('; ')) + ' · <a href="' + esc(ROOM.signals + '#' + x.id) + '">the row and its sources</a></p></div></li>'
    }).join('') + '</ol><p class="meta"><a href="' + esc(ROOM.signals) + '">The whole timeline</a> is in the data room, with every row\'s sources.</p></section>'
  }

  function render() {
    var t = now(), sx = (el.querySelector('.wxc-scroll') || {}).scrollLeft
    var nextRead = D.warn && D.warn.next_read_utc
    el.innerHTML = '<div class="wxc">' + hero(t) + hours(t) + reading(t) + '<div class="wxc-pair">' + closed(t) + madeira(t) + '</div>' + tomorrow(t) + latest(t) +
      '<p class="wxc-foot"><b>Not a warning service.</b> This page shows what IPMA warns and what the authorities decided, as read at the times shown; it makes no forecast and gives no advice of its own. Follow <a href="https://www.ipma.pt/" rel="external">IPMA <span aria-hidden="true">↗</span></a> and <a href="https://prociv.gov.pt/" rel="external">ANEPC <span aria-hidden="true">↗</span></a> (both leave this site). Everything here is read from <a href="' + esc(base + 'datasets.html') + '">the data room</a>' + (ok(nextRead) ? '; its weather files are next read at about ' + hm(nextRead) + ' UTC' : '') + '.' + (failed.length ? ' Could not read: ' + esc(failed.join(', ')) + '.' : '') + (qNow ? ' <b>Shown as at ' + esc(hm(t)) + ' UTC (?now=), not the present.</b>' : '') + '</p></div>'
    var sc = el.querySelector('.wxc-scroll'), nw = el.querySelector('.wxc-head .now')
    if (sc && sx != null) sc.scrollLeft = sx
    else if (sc && nw && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = Math.max(0, nw.offsetLeft - 150)
  }

  load().then(function () {
    render()
    setInterval(render, 60 * 1000)                                   // the clock, "now" and the status words move with the minute
    setInterval(function () { load().then(render) }, 5 * 60 * 1000)   // the data room's files, again every five minutes
  })
})()
