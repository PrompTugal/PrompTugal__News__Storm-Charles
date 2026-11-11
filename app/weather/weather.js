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
    madeira: api + 'weather/madeira.json', madAir: api + 'weather/airport-madeira.json', changes: api + 'weather/changes.json', analysis: api + 'weather/analysis.json', comm: api + 'weather/communiques.json', decisions: api + 'decisions/graph.json',
    areas: base + 'sources/ipma/data/warnings.json', places: base + 'sources/ipma/data/places.json'
  }
  // where a reader lands for each file: the data room's own copy (one place to change when the data room's file viewer is live)
  // the data room's file viewer: one page, view/?path=<path>, and &at=<field>/<index>/<field> opens one value inside a JSON file
  var view = function (file, at) { return base + 'view/?path=' + encodeURIComponent('incidents/' + inc + '/' + file).replace(/%2F/g, '/') + (at ? '&at=' + at : '') }
  var ROOM = {
    incident: view('incident.json', 'headline'), signals: room + 'timeline.html', warn: view('data/weather/warnings.json', 'lisbon'), rain: view('data/weather/lisbon-rain.json', 'stations'),
    stations: view('data/weather/stations.json', 'stations'), forecast: view('data/weather/forecast.json', 'hourly'), airport: view('data/weather/airport.json', 'metars'),
    madeira: view('data/weather/madeira.json', 'stations'), madAir: view('data/weather/airport-madeira.json', 'metars'), changes: view('data/weather/changes.json', 'thursday'), analysis: room + 'data/weather/analysis.html', comm: view('data/weather/communiques.json', 'items'), decisions: view('data/decisions/graph.json'),
    areas: base + 'view/?path=sources/ipma/data/warnings.json&at=instances', places: base + 'view/?path=sources/ipma/data/places.json&at=areas'
  }
  var dayOff = 0   // the hour strip's day: 0 today, 1 tomorrow (the reader's switch)
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
  // IPMA's sentence: the English the data room carries (IPMA's own, or the meteorologist's translation, and it says which), with IPMA's
  // Portuguese one click away; the Portuguese alone when there is no English
  var said = function (w) {
    if (!w.text_en) return '<span lang="pt">' + esc(w.text_pt || '') + '</span> <span class="meta">(IPMA\'s words)</span>'
    var ours = !/^IPMA/.test(w.text_en_by || '')
    return esc(w.text_en) + ' <details class="wxc-pt"><summary>' + (ours ? 'our translation: IPMA\'s words' : 'IPMA\'s English: its Portuguese') + '</summary><span lang="pt">' + esc(w.text_pt || '') + '</span>' + (w.text_en_by ? ' <span class="meta">English: ' + esc(w.text_en_by) + '</span>' : '') + '</details>'
  }
  var ago = function (x, t) { var m = Math.round((t - T(x)) / 6e4); return m < 0 ? 'after the time shown' : m < 90 ? m + ' min ago' : Math.floor(m / 60) + ' h ' + (m % 60) + ' min ago' }
  var DISTRICT = { AVR: 'Aveiro', BJA: 'Beja', BRG: 'Braga', BGC: 'Bragança', CBO: 'Castelo Branco', CBR: 'Coimbra', EVR: 'Évora', FAR: 'Faro', GDA: 'Guarda', LRA: 'Leiria', PTG: 'Portalegre', PTO: 'Porto', STM: 'Santarém', STB: 'Setúbal', VCT: 'Viana do Castelo', VRL: 'Vila Real', VIS: 'Viseu', MCN: 'Madeira (north coast)', MCS: 'Madeira (south coast)', MRM: 'Madeira (mountains)', MPS: 'Porto Santo' }
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

  // the highest IPMA level touching each of the next three days in Lisbon (the level written, never colour alone)
  function dayChips(t) {
    var ws = lisbonWarnings(), out = []
    for (var i = 0; i < 3; i++) {
      var a = T(day(t + i * 864e5) + 'T00:00:00Z'), b = a + 864e5, top = null
      ws.forEach(function (w) { if (T(w.start_utc) < b && T(w.end_utc) > Math.max(a, i ? a : t) && (!top || RANK[w.level] > RANK[top.level])) top = w })
      out.push('<li><span>' + (i ? esc(loc(a, { weekday: 'long' })) : 'Rest of today') + '</span> ' + (top ? lvl(top.level) : '<span class="lvl obs" title="IPMA\'s warnings feed covers about three days; this is not a statement that the day is clear">none in IPMA\'s feed</span>') + '</li>')
    }
    return D.warn ? '<ul class="wxc-days" aria-label="Highest IPMA warning level for Lisbon, by day">' + out.join('') + '</ul>' : ''
  }

  function communique(t) {
    var its = ((D.comm || {}).items || []).filter(function (c) { return ok(c.valid_to_utc) && T(c.valid_to_utc) > t && ok(c.issued_utc) && /continente|lisboa/i.test(c.title || '') }).sort(function (a, b) { return T(b.issued_utc) - T(a.issued_utc) })
    var c = its[0]; if (!c) return ''
    return '<p class="meta wxc-where">IPMA communiqué in force: <span lang="pt">' + esc(c.title) + '</span>. Issued ' + when(c.issued_utc, t) + ' UTC, valid to ' + when(c.valid_to_utc, t) + (ok(c.last_seen_utc) ? ', last seen in IPMA\'s feed ' + when(c.last_seen_utc, t) : '') + '. ' + prov('comm', 'IPMA communiqués', D.comm.read_utc) + '</p>'
  }

  // the first screen. The largest thing is IPMA's highest level for Lisbon for the rest of today, in IPMA's colour with the word written;
  // then one line of what is measured now; then what is in force, what is closed, what comes next and the headline decision.
  function hero(t) {
    var I = D.incident || {}, h = I.headline || {}, ws = lisbonWarnings()
    var live = ws.filter(function (w) { return status(w, t) === 'in force' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] })
    var next = ws.filter(function (w) { return status(w, t) === 'expected' }).sort(function (a, b) { return T(a.start_utc) - T(b.start_utc) || RANK[b.level] - RANK[a.level] })
    var wp = D.warn ? prov('warn', "IPMA's warnings for the Lisbon district", D.warn.read_utc) : ''
    var line = function (w) {
      var st = status(w, t)
      return '<li class="wxc-w w-' + esc(w.level) + '"><span class="wxc-w-i">' + iconFor(w.type) + '</span><div><p class="wxc-w-h">' + lvl(w.level) + ' <b>' + esc(EN[w.type] || w.type) + '</b> <span class="wxc-st">' + (st === 'in force' ? 'in force until <b>' + when(w.end_utc, t) + '</b>' : 'expected, ' + when(w.start_utc, t) + ' to ' + when(w.end_utc, t)) + '</span></p>' +
        '<div class="wxc-w-t">' + said(w) + '<p class="meta">' + (ok(w.sent_utc) ? 'Sent ' + when(w.sent_utc, t) + ' UTC.' : 'Sent time not in the data.') + '</p></div></div></li>'
    }
    var sigUrl = h.url && ((D.signals || {}).items || []).filter(function (s) { return (s.sources || []).some(function (x) { return x.url === h.url }) }).pop()
    var D1 = T(day(t) + 'T00:00:00Z') + 864e5, today = ws.filter(function (w) { return T(w.end_utc) > t && T(w.start_utc) < D1 }), hi = null
    today.forEach(function (w) { if (!hi || RANK[w.level] > RANK[hi.level]) hi = w })
    // one sentence, composed from IPMA's data only: today's warnings at the highest level, with their hours and, for wind, IPMA's own gust figure
    var gust = function (w) { var m = w.type === 'Vento' && String(w.text_pt || '').match(/(\d+)\s*km\/h/); return m ? ' (IPMA: gusts up to ' + m[1] + ' km/h)' : '' }
    var sentence = hi ? today.filter(function (w) { return w.level === hi.level }).sort(function (a, b) { return T(a.start_utc) - T(b.start_utc) }).map(function (w) { return '<b>' + esc(EN[w.type] || w.type) + '</b> ' + (T(w.start_utc) <= t ? 'until ' + when(w.end_utc, t) : when(w.start_utc, t) + ' to ' + when(w.end_utc, t)) + gust(w) }).join(' · ') : ''
    var reds = {}; (((D.warn || {}).red_and_orange_elsewhere || {}).items || []).forEach(function (w) { if (w.level === 'red' && T(w.end_utc) > t && DISTRICT[w.area]) reds[DISTRICT[w.area]] = 1 })
    var where = Object.keys(reds).length ? '<p class="meta wxc-where">IPMA red warnings also in force or expected in: ' + esc(Object.keys(reds).sort().join(', ')) + '.</p>' : ''
    return '<section class="wxc-hero" aria-labelledby="wxc-now">' +
      '<div class="wxc-top"><p class="kicker">' + esc(I.kicker || 'Storm Charles') + '</p><p class="wxc-clock"><time datetime="' + iso(t) + '">' + esc(longDay(t)) + ', ' + hm(t) + ' UTC</time> (Lisbon time)</p></div>' +
      '<div class="wxc-level' + (hi ? ' w-' + esc(hi.level) : '') + '"><h1 id="wxc-now">' + (hi ? '<span class="wxc-word">' + esc(hi.level) + '</span> <span class="wxc-h1b">IPMA warning for Lisbon today</span>' : D.warn ? '<span class="wxc-h1b">No IPMA warning above green for Lisbon for the rest of today</span>' : '<span class="wxc-h1b">Storm Charles, Lisbon</span>') + '</h1>' + (sentence ? '<p class="wxc-say">' + sentence + '</p>' : '') + '</div>' +
      dayChips(t) + nowTiles(t) +
      '<div class="wxc-hero-cols"><div>' +
      (D.warn ? '<h2 class="wxc-sub">' + (live.length ? 'In force this hour' : 'No IPMA warning above green is in force in Lisbon this hour') + '</h2>' + (live.length ? '<ul class="wxc-ws">' + live.map(line).join('') + '</ul>' : '') + closedStrip(t) : '<p class="meta">The warnings file could not be read.</p>') +
      '</div><div>' +
      (next.length ? '<h2 class="wxc-sub">Next, as IPMA warns</h2><ul class="wxc-ws next">' + next.map(line).join('') + '</ul>' : '') +
      (h.text ? '<div class="wxc-decision flat"><p class="wxc-eyebrow">The decision ' + lbl(h.label || 'fact') + '</p><p class="wxc-dtext">' + esc(h.text) + '</p><p class="prov">' + esc(h.source || '') + ', ' + esc(h.at || '') + '. <a href="' + esc(sigUrl ? ROOM.signals + '#' + sigUrl.id : room + 'index.html') + '">In the data room</a></p></div>' : '') +
      '</div></div>' + where + communique(t) + (D.warn ? '<p>' + wp + ' <span class="prov">(' + ago(D.warn.read_utc, t) + ')' + (ok(D.warn.next_read_utc) ? ' · next read ' + (T(D.warn.next_read_utc) > t ? 'at about ' : 'was due at ') + hm(D.warn.next_read_utc) + ' UTC' : '') + '</span></p>' : '') + '</section>'
  }

  function nowTiles(t) {
    var st = (D.stations || {}).stations || [], geo = st.filter(function (s) { return s.latest && s.latest.temp_c != null })[0]
    var gv = D.airport && D.airport.metars && D.airport.metars.length ? D.airport.metars[D.airport.metars.length - 1] : null
    var wet = null, windiest = null
    st.forEach(function (s) { var l = s.latest; if (!l) return; if (l.rain_mm != null && (!wet || l.rain_mm > wet.latest.rain_mm)) wet = s; if (l.wind_mean_kmh != null && (!windiest || l.wind_mean_kmh > windiest.latest.wind_mean_kmh)) windiest = s })
    ;((D.rain || {}).stations || []).forEach(function (s) { var l = (s.hourly || [])[s.hourly.length - 1]; if (l && l.rain_mm != null && (!wet || l.rain_mm > (wet.latest || wet._l).rain_mm)) wet = { name: s.name, _l: l, latest: l } })
    var tiles = []
    if (geo) tiles.push(['Temperature', num(geo.latest.temp_c, 1) + '<small>°C</small>', esc(geo.name) + ', the hour to ' + hm(geo.latest.time_utc), prov('stations', 'IPMA stations', geo.read_utc), T(geo.latest.time_utc)])
    if (wet) tiles.push(['Rain, last hour', num(wet.latest.rain_mm, 1) + '<small>mm</small>', 'the wettest of IPMA\'s Lisbon stations: ' + esc(wet.name) + ', the hour to ' + hm(wet.latest.time_utc), prov('rain', 'IPMA stations', (D.rain || D.stations).read_utc), T(wet.latest.time_utc)])
    if (windiest) tiles.push(['Wind, hourly mean', arrow(windiest.latest.wind_dir) + num(windiest.latest.wind_mean_kmh) + '<small>km/h ' + esc(windiest.latest.wind_dir || '') + '</small>', 'the windiest station: ' + esc(windiest.name) + ', the hour to ' + hm(windiest.latest.time_utc) + '. A mean, not a gust', prov('stations', 'IPMA stations', windiest.read_utc), T(windiest.latest.time_utc)])
    if (gv) tiles.unshift([(gv.gust_kmh != null ? 'Gust' : 'Wind') + ' at the airport, ' + hm(gv.time_utc), (gv.gust_kmh != null ? 'gust ' + num(gv.gust_kmh) : num(gv.wind_kmh)) + '<small>km/h</small>', (gv.gust_kmh != null ? 'mean ' + num(gv.wind_kmh) + ' km/h. ' : 'no gust reported. ') + 'Pressure ' + num(gv.pressure_hpa) + ' hPa. Lisbon airport\'s own report (METAR)', prov('airport', 'METAR LPPT', gv.read_utc), T(gv.time_utc)])
    if (!tiles.length) return ''
    return '<div class="wxc-tiles" aria-label="Observed in Lisbon">' + tiles.map(function (x) { return '<div class="wxc-tile' + (t - x[4] > 90 * 6e4 ? ' old' : '') + '"><p class="wxc-eyebrow">' + x[0] + '</p><p class="wxc-age">observed ' + ago(x[4], t) + '</p><p class="wxc-big">' + x[1] + '</p><p class="meta">' + x[2] + '</p><p>' + x[3] + '</p></div>' }).join('') + '</div>'
  }

  // today, hour by hour: 24 columns, each the hour that STARTS at its label. A station's value labelled HH:00 is read as the hour ending
  // then (the meteorologist's inference, hour_label in lisbon-rain.json), so it sits in the column before its label.
  function hours(t) {
    var off = dayOff, D0 = T(day(t) + 'T00:00:00Z') + off * 864e5, D1 = D0 + 864e5, H = 36e5, nowH = off ? -1 : Math.floor((t - D0) / H), ref = off ? D0 : t
    var ws = lisbonWarnings().filter(function (w) { return T(w.start_utc) < D1 && T(w.end_utc) > D0 })
    var cols = []; for (var i = 0; i < 24; i++) cols.push(i)
    var cell = function (h, inner, cls, title) { return '<div role="cell" class="wxc-c' + (h === nowH ? ' now' : h < nowH ? ' past' : '') + (cls ? ' ' + cls : '') + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + inner + '</div>' }
    var row = function (label, sub, cells, cls) { return '<div role="row" class="wxc-row' + (cls ? ' ' + cls : '') + '"><div role="rowheader" class="wxc-lab"><b>' + label + '</b>' + (sub ? '<i>' + sub + '</i>' : '') + '</div>' + cells + '</div>' }
    var out = row('Hour', 'UTC = Lisbon', cols.map(function (h) { return cell(h, '<b>' + ('0' + h).slice(-2) + '</b>' + (h === nowH ? '<i>now</i>' : '')) }).join(''), 'wxc-head')

    // 1. warned: one lane per type, IPMA's colours, the level written
    var types = []; ws.forEach(function (w) { if (types.indexOf(w.type) < 0) types.push(w.type) })
    var order = ['Precipitação', 'Vento', 'Agitação Marítima']; types.sort(function (a, b) { return (order.indexOf(a) + 9) % 9 - (order.indexOf(b) + 9) % 9 })
    types.forEach(function (ty) {
      var bars = ws.filter(function (w) { return w.type === ty }).sort(function (a, b) { return T(a.start_utc) - T(b.start_utc) }).map(function (w) {
        var a = Math.max(0, Math.round((T(w.start_utc) - D0) / H)), b = Math.min(24, Math.round((T(w.end_utc) - D0) / H)); if (b <= a) return ''
        return '<div role="cell" class="wxc-band w-' + esc(w.level) + (T(w.end_utc) <= t ? ' ended' : '') + '" style="grid-column:' + (a + 2) + '/' + (b + 2) + '" title="' + esc(w.level + ' ' + (EN[ty] || ty) + ', ' + when(w.start_utc, ref) + ' to ' + when(w.end_utc, ref) + '. ' + (w.text_pt || '')) + '"><b>' + esc(w.level) + '</b> <span>' + hm(Math.max(T(w.start_utc), D0)) + '–' + (T(w.end_utc) > D1 ? wd(w.end_utc) + ' ' : '') + hm(w.end_utc) + '</span></div>'
      }).join('')
      out += '<div role="row" class="wxc-row wxc-warn"><div role="rowheader" class="wxc-lab"><b>' + iconFor(ty) + esc(EN[ty] || ty) + '</b><i>IPMA warning</i></div>' + bars + cols.map(function (h) { return '<div aria-hidden="true" class="wxc-c bg' + (h === nowH ? ' now' : '') + '" style="grid-column:' + (h + 2) + '"></div>' }).join('') + '</div>'
    })

    // 1b. decided: the decisions whose source states hours, on the same axis as the warnings (no other site draws this). Ink, never a
    // warning colour: solid for a fact, outlined for evidence; a decision with a start and no stated end is drawn to the end of the day it starts (never into a day its source did not name), open, and says so.
    var dd = decided()
    if (dd) (dd.G.edges || []).filter(function (e) { return e.label !== 'hypothesis' && e.by !== 'ipma' && e.status === 'happened' && ok(e.effect_from_utc) && dd.nodes[e.by] && !/^madeira|^apram/.test(e.by) }).forEach(function (e) {
      var a0 = T(e.effect_from_utc), open = !ok(e.effect_to_utc), b0 = open ? T(day(a0) + 'T00:00:00Z') + 864e5 : T(e.effect_to_utc) + (/T23:59/.test(e.effect_to_utc) ? 6e4 : 0); if (a0 >= D1 || b0 <= D0) return
      var a = Math.max(0, Math.round((a0 - D0) / H)), b = Math.min(24, Math.round((b0 - D0) / H)); if (b <= a) return
      var word = e.state ? String(e.state).replace(/_/g, ' ') : 'decided', hrs = hm(Math.max(a0, D0)) + (open ? ', end not stated' : '–' + hm(e.effect_to_utc))
      out += '<div role="row" class="wxc-row wxc-warn wxc-dec"><div role="rowheader" class="wxc-lab"><b>' + esc(short(dd.nodes[e.by])) + '</b><i>decided · ' + esc(e.label) + '</i></div>' +
        '<a role="cell" href="#d-' + esc(e.id) + '" class="wxc-band d-' + esc(e.label) + (open ? ' open' : '') + '" style="grid-column:' + (a + 2) + '/' + (b + 2) + '" title="' + esc(e.decision + ' (' + hrs + ')') + '"><b>' + esc(word) + '</b> <span>' + hrs + '</span> <em>' + esc(String(e.decision).slice(0, 90)) + '</em></a>' +
        cols.map(function (h) { return '<div aria-hidden="true" class="wxc-c bg' + (h === nowH ? ' now' : '') + '" style="grid-column:' + (h + 2) + '"></div>' }).join('') + '</div>'
    })

    // 2. rain: observed (the wettest of the Lisbon stations each hour), then IPMA's automatic forecast (chance and intensity class)
    var rs = (D.rain || {}).stations || [], fr = ((D.forecast || {}).hourly || {}).rows || []
    var fAt = function (h) { var x = D0 + h * H; return fr.filter(function (r) { return T(r.time_utc) === x })[0] }
    var obsAt = function (list, h, key) { var x = D0 + (h + 1) * H, best = null; list.forEach(function (s) { (s.hourly || []).forEach(function (r) { if (T(r.time_utc) === x && r[key] != null && (!best || r[key] > best.v)) best = { v: r[key], s: s.name, r: r } }) }); return best }
    var maxRain = 1; cols.forEach(function (h) { var o = obsAt(rs, h, 'rain_mm'); if (o && o.v > maxRain) maxRain = o.v })
    out += row(ICON.rain + 'Rain', 'mm in the hour, observed · then IPMA\'s automatic forecast: chance, and intensity class as height', cols.map(function (h) {
      var o = obsAt(rs, h, 'rain_mm'), f = fAt(h)
      if (o) return cell(h, '<span class="wxc-bar" style="height:' + Math.round(4 + 40 * o.v / maxRain) + 'px"></span><b>' + num(o.v, o.v < 10 ? 1 : 0) + '</b>', 'obs', ('0' + h).slice(-2) + ':00 to ' + ('0' + (h + 1)).slice(-2) + ':00: ' + o.v + ' mm at ' + o.s + ' (the wettest of ' + rs.length + ' stations)')
      if (f && (f.rain_intensity_class != null || f.rain_prob_pct != null)) return cell(h, '<span class="wxc-bar auto" style="height:' + (f.rain_intensity_class != null ? 6 + 12 * f.rain_intensity_class : 4) + 'px"></span><b>' + (f.rain_prob_pct != null ? f.rain_prob_pct + '%' : '&nbsp;') + '</b>', 'auto', hm(f.time_utc) + ': IPMA automatic forecast' + (f.rain_prob_pct != null ? ', chance of rain ' + f.rain_prob_pct + '%' : '') + (f.rain_intensity_en ? ', intensity "' + f.rain_intensity_en + '" (IPMA\'s daily scale, assumed to apply to the hourly feed)' : f.rain_intensity_class != null ? ', intensity class ' + f.rain_intensity_class : '') + (f.weather_type_en ? '; ' + f.weather_type_en : ''))
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
    var windWs = ws.filter(function (w) { return w.type === 'Vento' }), warnedAt = function (h) { var x = D0 + h * H, hit = null; windWs.forEach(function (w) { if (T(w.start_utc) <= x && T(w.end_utc) > x && (!hit || RANK[w.level] > RANK[hit.level])) hit = w }); var m = hit && String(hit.text_pt || '').match(/(\d+)\s*km\/h/); return m ? { w: hit, v: +m[1] } : null }
    if (ms.length || windWs.length) out += row('Gusts', 'km/h, observed at Lisbon airport · then the figure in IPMA\'s wind warning', cols.map(function (h) {
      var g = gustIn(h), wn = h >= nowH ? warnedAt(h) : null
      if (g) return cell(h, '<b>' + num(g.gust_kmh) + '</b>', 'obs', hm(g.time_utc) + ': gust ' + g.gust_kmh + ' km/h at Lisbon airport (METAR)')
      if (wn) return cell(h, '<i>up to</i><b>' + wn.v + '</b>', 'warned w-' + esc(wn.w.level), 'IPMA ' + wn.w.level + ' wind warning: ' + (wn.w.text_en || wn.w.text_pt))
      return cell(h, h < nowH ? '<i>none</i>' : '', h < nowH ? 'obs quiet' : 'empty', h < nowH ? 'no gust reported at the airport in this hour' : '')
    }).join(''), 'wxc-gust')
    // 4. temperature
    out += row('Temperature', '°C, observed · then automatic forecast', cols.map(function (h) {
      var o = obsAt(ss, h, 'temp_c'), f = fAt(h)
      if (o) return cell(h, '<b>' + num(o.v) + '°</b>', 'obs', o.v + ' °C at ' + o.s)
      if (f && f.temp_c != null) return cell(h, '<b>' + num(f.temp_c) + '°</b>', 'auto', hm(f.time_utc) + ': IPMA automatic forecast ' + f.temp_c + ' °C')
      return cell(h, '', 'empty')
    }).join(''), 'wxc-temp')

    var windW = ws.filter(function (w) { return w.type === 'Vento' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] })[0]
    return '<section class="wxc-sec" aria-labelledby="wxc-h-today"><h2 id="wxc-h-today">' + (off ? esc(loc(D0, { weekday: 'long' })) : 'Today') + ', hour by hour <span class="meta">' + esc(longDay(D0)) + ', Lisbon</span></h2>' +
      '<div class="wxc-switch" role="group" aria-label="Which day the strip shows"><button type="button" data-day="0"' + (off ? '' : ' aria-pressed="true"') + '>Today</button><button type="button" data-day="1"' + (off ? ' aria-pressed="true"' : '') + '>' + esc(loc(T(day(t) + 'T00:00:00Z') + 864e5, { weekday: 'long' })) + '</button><span class="meta">' + (off ? 'Nothing is measured yet for this day: the rows show what IPMA warns and its automatic forecast as far as the files go.' : '') + '</span></div>' +
      '<div class="wxc-scroll" tabindex="0" role="group" aria-label="The day hour by hour: scrolls sideways"><div class="wxc-grid" role="table" aria-label="Lisbon by the hour: IPMA warnings, rain, wind, gusts, temperature">' + out + '</div></div>' +
      '<ul class="wxc-legend"><li><span class="k k-warn"></span>IPMA\'s warning, in IPMA\'s colour, the level written</li><li><span class="k k-dec"></span>a decision, over the hours its source states (outlined: reported by others)</li><li><span class="k k-obs"></span>observed (a measurement)</li><li><span class="k k-auto"></span>IPMA\'s automatic forecast for one point in the city</li></ul>' +
      '<p class="wxc-note"><b>Why the wind numbers look small beside a ' + (windW ? esc(windW.level) + ' ' : '') + 'wind warning.</b> The hourly numbers are mean wind: the wind averaged over an hour at one station, or a computer model\'s value for one point. IPMA\'s stations report mean wind only, so the gusts shown are Lisbon airport\'s own reports (METAR). A warning is about gusts, and is written by IPMA\'s forecasters for the whole district' + (windW ? ': <span lang="pt">' + esc(String(windW.text_pt).replace(/\.\s*$/, '')) + '</span>' : '') + '. The warning is IPMA\'s official statement for the district.</p>' +
      '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.read_utc) + ' · ' : '') + (D.rain ? prov('rain', 'IPMA stations, rain', D.rain.read_utc) + ' · ' : '') + (D.stations ? prov('stations', 'IPMA stations, wind', D.stations.read_utc) + ' · ' : '') + (D.airport ? prov('airport', 'Lisbon airport (METAR)', D.airport.read_utc) + ' · ' : '') + (D.forecast && D.forecast.hourly ? prov('forecast', 'IPMA automatic forecast', D.forecast.hourly.read_utc) : '') + '</p></section>'
  }

  // wind, observed against warned: one axis (km/h), today's 24 hours. The warned figure is IPMA's own number, read from its sentence
  // and drawn only across the warning's hours, in the warning's colour with the level written. Observed is solid; the automatic
  // forecast is grey and dashed. Each mark has a title (hover) and the same values are in the table under the chart.
  function windChart(t) {
    var D0 = T(day(t) + 'T00:00:00Z'), D1 = D0 + 864e5, H = 36e5
    var ws = lisbonWarnings().filter(function (w) { return w.type === 'Vento' && T(w.start_utc) < D1 && T(w.end_utc) > D0 })
    var ms = ((D.airport || {}).metars || []).filter(function (m) { return T(m.time_utc) >= D0 && T(m.time_utc) < D1 })
    var ss = (D.stations || {}).stations || [], fr = (((D.forecast || {}).hourly || {}).rows || []).filter(function (r) { return T(r.time_utc) >= Math.max(D0, t - H) && T(r.time_utc) <= D1 && r.wind_mean_kmh != null })
    if (!ws.length && !ms.length) return ''
    var mean = []; for (var h = 1; h <= 24; h++) { var x = D0 + h * H, best = null; ss.forEach(function (s) { (s.hourly || []).forEach(function (r) { if (T(r.time_utc) === x && r.wind_mean_kmh != null && (!best || r.wind_mean_kmh > best.v)) best = { v: r.wind_mean_kmh, s: s.name, t: x } }) }); if (best) mean.push(best) }
    var figs = function (w) { return (String(w.text_pt || '').match(/\d+(?=\s*km\/h)/g) || []).map(Number) }
    var top = 60; ws.forEach(function (w) { figs(w).forEach(function (v) { if (v > top) top = v }) }); ms.forEach(function (m) { if ((m.gust_kmh || m.wind_kmh || 0) > top) top = m.gust_kmh || m.wind_kmh })
    top = Math.ceil((top + 10) / 20) * 20
    var W = 1000, Ht = 300, L = 46, R = 14, Tp = 16, B = 30, X = function (ms_) { return L + (W - L - R) * (ms_ - D0) / 864e5 }, Y = function (v) { return Tp + (Ht - Tp - B) * (1 - v / top) }
    var g = '', rows = []
    for (var v = 0; v <= top; v += 20) g += '<line class="c-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="c-tick" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + '</text>'
    for (var i = 0; i <= 24; i += 3) g += '<text class="c-tick" x="' + X(D0 + i * H) + '" y="' + (Ht - 10) + '" text-anchor="' + (i === 24 ? 'end' : i ? 'middle' : 'start') + '">' + ('0' + (i % 24)).slice(-2) + ':00</text>'
    ws.forEach(function (w) {
      var a = Math.max(D0, T(w.start_utc)), b = Math.min(D1, T(w.end_utc)), f = figs(w); if (!f.length) return
      g += '<rect class="c-win w-' + esc(w.level) + '" x="' + X(a) + '" y="' + Y(top) + '" width="' + (X(b) - X(a)) + '" height="' + (Y(0) - Y(top)) + '"/>'
      f.forEach(function (v, k) {
        g += '<line class="c-warn w-' + esc(w.level) + (k ? ' more' : '') + '" x1="' + X(a) + '" x2="' + X(b) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"><title>' + esc('IPMA ' + w.level + ' wind warning, ' + hm(a) + ' to ' + hm(w.end_utc) + ': ' + w.text_pt) + '</title></line>' +
          '<text class="c-lab" x="' + (X(a) + 6) + '" y="' + (Y(v) - 6) + '">' + (k ? 'up to ' + v + ' km/h in IPMA\'s sentence' : esc(w.level.toUpperCase()) + ' warning: gusts ' + v + ' km/h') + '</text>'
      })
      rows.push(['IPMA ' + w.level + ' wind warning', hm(a) + ' to ' + hm(w.end_utc), '<span lang="pt">' + esc(w.text_pt) + '</span>'])
    })
    if (fr.length > 1) g += '<polyline class="c-auto" points="' + fr.map(function (r) { return X(T(r.time_utc)) + ',' + Y(r.wind_mean_kmh) }).join(' ') + '"><title>IPMA automatic forecast, mean wind at one point in the city (no gusts in this feed)</title></polyline>'
    if (mean.length > 1) g += '<polyline class="c-mean" points="' + mean.map(function (m) { return X(m.t) + ',' + Y(m.v) }).join(' ') + '"><title>Observed hourly mean wind, the windiest of IPMA\'s Lisbon stations</title></polyline>'
    mean.forEach(function (m) { g += '<circle class="c-meanp" cx="' + X(m.t) + '" cy="' + Y(m.v) + '" r="3"><title>' + esc('the hour to ' + hm(m.t) + ': mean wind ' + m.v + ' km/h at ' + m.s) + '</title></circle>' })
    mean.forEach(function (m) { rows.push(['Observed mean wind, ' + esc(m.s), 'the hour to ' + hm(m.t), m.v + ' km/h']) })
    ms.forEach(function (m) {
      if (m.gust_kmh != null) { g += '<circle class="c-gust" cx="' + X(T(m.time_utc)) + '" cy="' + Y(m.gust_kmh) + '" r="5"><title>' + esc(hm(m.time_utc) + ': gust ' + m.gust_kmh + ' km/h at Lisbon airport (mean ' + m.wind_kmh + ')') + '</title></circle>'; rows.push(['Observed gust, Lisbon airport', hm(m.time_utc), m.gust_kmh + ' km/h']) }
    })
    if (t >= D0 && t < D1) g += '<line class="c-now" x1="' + X(t) + '" x2="' + X(t) + '" y1="' + Tp + '" y2="' + (Ht - B) + '"/><text class="c-nowt" x="' + (X(t) + 5) + '" y="' + (Tp + 10) + '">now ' + hm(t) + '</text>'
    var maxG = null; ms.forEach(function (m) { if (m.gust_kmh != null && (!maxG || m.gust_kmh > maxG.gust_kmh)) maxG = m })
    return '<section class="wxc-sec" aria-labelledby="wxc-h-wind"><h2 id="wxc-h-wind">Wind today: measured against warned <span class="meta">km/h, Lisbon</span></h2>' +
      '<p class="wxc-lead">' + (maxG ? 'Strongest gust measured at Lisbon airport so far today: <b>' + maxG.gust_kmh + ' km/h</b> at ' + hm(maxG.time_utc) + '.' : 'No gust has been reported at Lisbon airport so far today.') + '</p>' +
      '<div class="wxc-scroll plain" tabindex="0" role="group" aria-label="Wind chart: scrolls sideways on a small screen"><svg class="wxc-chart" viewBox="0 0 ' + W + ' ' + Ht + '" role="img" aria-label="Wind today in Lisbon: IPMA\'s warned gusts, the gusts and mean wind measured, and IPMA\'s automatic forecast. The values are in the table below.">' + g + '</svg></div>' +
      '<ul class="wxc-legend"><li><span class="k k-warnline"></span>IPMA\'s warned gusts, over the warning\'s hours</li><li><span class="k k-dot"></span>gust measured at Lisbon airport</li><li><span class="k k-line"></span>mean wind measured (the windiest station)</li><li><span class="k k-dash"></span>IPMA\'s automatic forecast, mean wind</li></ul>' +
      '<details class="wxc-table"><summary>The same values as a table (' + rows.length + ' rows)</summary><div class="wxc-scroll plain"><table><thead><tr><th>What</th><th>When (UTC)</th><th>Value</th></tr></thead><tbody>' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>' }).join('') + '</tbody></table></div></details>' +
      '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.read_utc) + ' · ' : '') + (D.airport ? prov('airport', 'Lisbon airport (METAR)', D.airport.read_utc) + ' · ' : '') + (D.stations ? prov('stations', 'IPMA stations', D.stations.read_utc) + ' · ' : '') + (D.forecast && D.forecast.hourly ? prov('forecast', 'IPMA automatic forecast', D.forecast.hourly.read_utc) : '') + '</p></section>'
  }

  // rain today, measured against warned: hourly bars (the wettest of the Lisbon stations each hour) under IPMA's rain warnings, which
  // carry no figure in millimetres, so they are drawn as their hours, in their colour, with the level written. One axis: mm in the hour.
  function rainChart(t, o) {
    o = o || {}
    var D0 = o.D0 || T(day(t) + 'T00:00:00Z'), D1 = D0 + 864e5, H = 36e5, rs = o.stations || (D.rain || {}).stations || []; if (!rs.length) return ''
    var ws = (o.ws || lisbonWarnings()).filter(function (w) { return w.type === 'Precipitação' && T(w.start_utc) < D1 && T(w.end_utc) > D0 })
    var place = o.place || 'Lisbon', span = o.D0 ? 'in these 24 hours' : 'so far today', id = o.id || 'wxc-h-rain'
    var bars = [], totals = []
    for (var h = 0; h < 24; h++) { var x = D0 + (h + 1) * H, best = null; rs.forEach(function (s) { (s.hourly || []).forEach(function (r) { if (T(r.time_utc) === x && r.rain_mm != null && (!best || r.rain_mm > best.v)) best = { v: r.rain_mm, s: s.name, h: h } }) }); if (best) bars.push(best) }
    rs.forEach(function (s) { var sum = 0, n = 0; (s.hourly || []).forEach(function (r) { var x = T(r.time_utc); if (x > D0 && x <= D1 && r.rain_mm != null) { sum += r.rain_mm; n++ } }); if (n) totals.push({ s: s.name, mm: Math.round(sum * 10) / 10, n: n }) })
    totals.sort(function (a, b) { return b.mm - a.mm })
    var top = 10; bars.forEach(function (b) { if (b.v > top) top = b.v }); top = Math.ceil((top * 1.08) / 5) * 5
    var W = 1000, Ht = 260, L = 46, R = 14, Tp = 40, B = 30, X = function (m) { return L + (W - L - R) * (m - D0) / 864e5 }, Y = function (v) { return Tp + (Ht - Tp - B) * (1 - v / top) }, bw = (W - L - R) / 24
    var g = '', step = top > 40 ? 20 : top > 20 ? 10 : 5, hh = function (h) { return hm(D0 + h * H) }
    for (var v = 0; v <= top; v += step) g += '<line class="c-grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text class="c-tick" x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + '</text>'
    for (var i = 0; i <= 24; i += 3) g += '<text class="c-tick" x="' + X(D0 + i * H) + '" y="' + (Ht - 10) + '" text-anchor="' + (i === 24 ? 'end' : i ? 'middle' : 'start') + '">' + hh(i) + '</text>'
    ws.forEach(function (w) {
      var a = Math.max(D0, T(w.start_utc)), b = Math.min(D1, T(w.end_utc))
      g += '<rect class="c-win w-' + esc(w.level) + '" x="' + X(a) + '" y="' + Tp + '" width="' + (X(b) - X(a)) + '" height="' + (Ht - Tp - B) + '"/><rect class="c-strip w-' + esc(w.level) + '" x="' + (X(a) + 1) + '" y="10" width="' + (X(b) - X(a) - 2) + '" height="22" rx="4"><title>' + esc('IPMA ' + w.level + ' rain warning, ' + hm(a) + ' to ' + hm(w.end_utc) + ': ' + w.text_pt) + '</title></rect><text class="c-striplab w-' + esc(w.level) + '" x="' + (X(a) + 9) + '" y="25">' + esc(w.level.toUpperCase()) + (X(b) - X(a) > 260 ? (o.strip ? ' ' + esc(o.strip) : '') + ' warning ' + hm(a) + '–' + hm(w.end_utc) : '') + '</text>'
    })
    bars.forEach(function (b) { if (b.v > 0) g += '<path class="c-bar" d="M' + (X(D0 + b.h * H) + 3) + ' ' + Y(0) + 'V' + (Y(b.v) + 3) + 'q0-3 3-3h' + (bw - 12) + 'q3 0 3 3V' + Y(0) + 'z"><title>' + esc(hh(b.h) + ' to ' + hh(b.h + 1) + ': ' + b.v + ' mm at ' + b.s) + '</title></path>'; if (b.v >= 1) g += '<text class="c-val" x="' + (X(D0 + b.h * H) + bw / 2) + '" y="' + (Y(b.v) - 4) + '" text-anchor="middle">' + num(b.v, b.v < 10 ? 1 : 0) + '</text>' })
    if (t >= D0 && t < D1) g += '<line class="c-now" x1="' + X(t) + '" x2="' + X(t) + '" y1="' + Tp + '" y2="' + (Ht - B) + '"/><text class="c-nowt" x="' + (X(t) + 5) + '" y="' + (Tp + 12) + '">now ' + hm(t) + '</text>'
    var rows = ws.map(function (w) { return ['IPMA ' + esc(w.level) + ' rain warning', when(w.start_utc, t) + ' to ' + when(w.end_utc, t), '<span lang="pt">' + esc(w.text_pt) + '</span>'] }).concat(bars.map(function (b) { return ['Rain measured, ' + esc(b.s), hh(b.h) + ' to ' + hh(b.h + 1), b.v + ' mm'] }))
    var lead = totals.length ? 'Most rain measured ' + span + ': <b>' + totals[0].mm + ' mm</b> at ' + esc(totals[0].s) + ' <span class="meta">(' + totals[0].n + ' hour' + (totals[0].n > 1 ? 's' : '') + ' measured, ' + when(D0, t) + ' to ' + when(D0 + (bars.length ? bars[bars.length - 1].h + 1 : 0) * H, t) + ')</span>' : 'No rain measurement for these hours has been read yet.'
    return '<section class="wxc-sec" aria-labelledby="' + id + '"><h2 id="' + id + '">' + (o.title || 'Rain today: measured against warned') + ' <span class="meta">mm in each hour, ' + esc(place) + '</span></h2><p class="wxc-lead">' + lead + '</p>' +
      '<div class="wxc-scroll plain" tabindex="0" role="group" aria-label="Rain chart: scrolls sideways on a small screen"><svg class="wxc-chart" viewBox="0 0 ' + W + ' ' + Ht + '" role="img" aria-label="Rain in ' + esc(place) + ' by the hour, under the hours of IPMA\'s rain warnings. The values are in the table below.">' + g + '</svg></div>' +
      '<p class="meta">Each bar is the wettest of IPMA\'s ' + rs.length + ' ' + esc(place) + ' stations in that hour.' + (o.note ? ' ' + o.note : '') + ' IPMA\'s rain warnings give no figure in millimetres, so they are shown as their hours.</p>' +
      (totals.length > 1 ? '<details class="wxc-table"><summary>Each station\'s total, and the chart as a table</summary><div class="wxc-scroll plain"><table><thead><tr><th>Station</th><th>Hours measured</th><th>Total</th></tr></thead><tbody>' + totals.map(function (x) { return '<tr><td>' + esc(x.s) + '</td><td>' + x.n + '</td><td>' + x.mm + ' mm</td></tr>' }).join('') + '</tbody></table><table><thead><tr><th>What</th><th>When (UTC)</th><th>Value</th></tr></thead><tbody>' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>' }).join('') + '</tbody></table></div></details>' : '') +
      '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.read_utc) + ' · ' : '') + prov(o.key || 'rain', 'IPMA stations, rain', (o.read || (D.rain || {}).read_utc)) + '</p></section>'
  }

  // where: IPMA's highest warning level for the rest of today in each of its warning areas (sources/ipma/data/warnings.json), each drawn
  // as a dot at the label spot incident.ipma@ computes from IPMA's forecast places (a spot for a label, not a border: no map is copied).
  // IPMA's colours for IPMA's levels, and the level is written beside every name.
  function whereMap(t) {
    var W = D.areas, P = D.places; if (!W || !P) return ''
    var D1 = T(day(t) + 'T00:00:00Z') + 864e5, peak = {}, kinds = {}
    ;(W.instances || []).forEach(function (w) {
      if (w.gone_read_utc || !RANK[w.level]) return
      var a = T(w.start + 'Z'), b = T(w.end + 'Z'); if (!(b > t && a < D1)) return
      if (!peak[w.area] || RANK[w.level] > RANK[peak[w.area]]) { peak[w.area] = w.level; kinds[w.area] = {} }
      if (w.level === peak[w.area]) kinds[w.area][EN[w.type] || w.type] = 1
    })
    var areas = (P.areas || []).filter(function (a) { return a.label_at }), main = areas.filter(function (a) { return a.region === 'mainland' })
    if (!main.length) return ''
    var lon = main.map(function (a) { return a.label_at[0] }), lat = main.map(function (a) { return a.label_at[1] })
    var x0 = Math.min.apply(0, lon), x1 = Math.max.apply(0, lon), y0 = Math.min.apply(0, lat), y1 = Math.max.apply(0, lat), k = Math.cos(39.5 * Math.PI / 180)
    var Ht = 560, pad = 34, sc = (Ht - 2 * pad) / (y1 - y0), Wd = Math.round((x1 - x0) * k * sc + 2 * pad + 150)
    var X = function (a) { return pad + (a.label_at[0] - x0) * k * sc }, Y = function (a) { return pad + (y1 - a.label_at[1]) * sc }
    var word = function (id) { return peak[id] || 'none' }, why = function (id) { return peak[id] ? Object.keys(kinds[id]).join(', ').toLowerCase() : '' }
    var g = main.map(function (a) {
      var lv = peak[a.id], left = main.some(function (o) { return o !== a && X(o) > X(a) && X(o) - X(a) < 16 + 7.5 * a.name.length && Math.abs(Y(o) - Y(a)) < 14 }) && X(a) > 16 + 7.5 * a.name.length
      return '<g class="c-area' + (a.id === 'LSB' ? ' here' : '') + '"><circle class="c-dot' + (lv ? ' w-' + esc(lv) : '') + '" cx="' + X(a).toFixed(1) + '" cy="' + Y(a).toFixed(1) + '" r="' + (a.id === 'LSB' ? 13 : 10) + '"><title>' + esc(a.name + ': ' + (lv ? lv + ' (' + why(a.id) + ')' : 'no warning above green for the rest of today in IPMA\'s feed')) + '</title></circle>' +
        '<text class="c-lab" x="' + (X(a) + (left ? -16 : 16)).toFixed(1) + '" y="' + (Y(a) + 4).toFixed(1) + '"' + (left ? ' text-anchor="end"' : '') + '>' + esc(a.name) + '</text>' + (lv ? '<text class="c-in w-' + esc(lv) + '" x="' + X(a).toFixed(1) + '" y="' + (Y(a) + 4).toFixed(1) + '" text-anchor="middle">' + lv.charAt(0).toUpperCase() + '</text>' : '') + '</g>'
    }).join('')
    var isl = areas.filter(function (a) { return a.region !== 'mainland' }).sort(function (a, b) { return (RANK[peak[b.id]] || 0) - (RANK[peak[a.id]] || 0) })
    var row = function (a) { return '<li>' + (peak[a.id] ? lvl(peak[a.id]) : '<span class="lvl obs">none</span>') + ' <b>' + esc(a.name) + '</b> <span class="meta">' + esc(why(a.id)) + '</span></li>' }
    var count = { red: 0, orange: 0, yellow: 0 }; areas.forEach(function (a) { if (peak[a.id]) count[peak[a.id]]++ })
    var from = (W.from || [])[0] || {}
    return '<section class="wxc-sec" aria-labelledby="wxc-h-where"><h2 id="wxc-h-where">Where <span class="meta">IPMA\'s highest warning level for the rest of today, by warning area</span></h2>' +
      '<p class="wxc-lead">' + lvl('red') + ' ' + count.red + ' areas · ' + lvl('orange') + ' ' + count.orange + ' · ' + lvl('yellow') + ' ' + count.yellow + ' <span class="meta">of IPMA\'s ' + areas.length + ' warning areas</span></p>' +
      '<div class="wxc-where2"><div class="wxc-scroll plain"><svg class="wxc-map" viewBox="0 0 ' + Wd + ' ' + Ht + '" role="img" aria-label="Mainland Portugal: each of IPMA\'s 18 district warning areas as a dot at a label spot, in the colour of its highest warning level for the rest of today, with the first letter of the level in the dot (R, O, Y). The same, with the level written, is the list beside it.">' + g + '</svg></div>' +
      '<div><h3>The mainland, highest first</h3><ul class="wxc-list tight cols">' + main.slice().sort(function (a, b) { return (RANK[peak[b.id]] || 0) - (RANK[peak[a.id]] || 0) || a.name.localeCompare(b.name) }).map(row).join('') + '</ul><h3>Madeira and the Azores</h3><ul class="wxc-list tight">' + isl.map(row).join('') + '</ul>' +
      '<p class="meta">Each dot sits at a label spot (the mean of IPMA\'s forecast places in the area), not on a border: this is not a map of the districts\' shapes.</p></div></div>' +
      '<p>' + prov('areas', 'IPMA warnings, all areas (kept by incident.ipma@)', from.read_utc || W.updated) + ' · ' + prov('places', 'IPMA\'s areas and places', P.updated) + '</p></section>'
  }

  // our meteorologist's reading: a hypothesis, never a forecast of ours stated as fact. Dashed, and it says so.
  function reading(t) {
    var A = D.analysis; if (!A) return ''
    // the newest dated update that states the reading (its `stands`, or its `hypothesis`); an older one it supersedes is not shown here
    var ups = A.updates || [], cur = null, win = null
    ups.forEach(function (u) { if (typeof u.stands === 'string' || typeof u.hypothesis === 'string') cur = u; if (u.worst_window_utc) win = u })
    win = win || A.wednesday_lisbon; if (!cur && !win) return ''
    var list = function (a) { return (a || []).map(function (x) { return '<li>' + esc(x) + '</li>' }).join('') }
    var ins = cur && cur.inputs_changed ? Object.keys(cur.inputs_changed).map(function (k) { return '<li><b>' + esc(k.replace(/_/g, ' ')) + ':</b> ' + esc(cur.inputs_changed[k]) + '</li>' }).join('') : ''
    var wr = (cur || win).written_utc || A.written_utc, stand = null
    lisbonWarnings().forEach(function (w) { if (T(w.end_utc) > t && (!stand || RANK[w.level] > RANK[stand])) stand = w.level })
    var cap = function (x) { x = String(x); return x.charAt(0).toUpperCase() + x.slice(1) }
    return '<section class="wxc-sec wxc-hyp" aria-labelledby="wxc-h-read"><details data-k="reading"><summary><h2 id="wxc-h-read">Our meteorologist\'s reading ' + lbl('hypothesis') + '</h2> <span class="meta">analysis written ' + when(wr, t) + ' UTC, not IPMA\'s forecast: open to read it</span></summary>' +
      '<p class="wxc-hyp-say">This is analysis by the team\'s meteorologist agent from the published data, written ' + when(wr, t) + ' UTC. It is not IPMA\'s forecast and not advice. <b>' + (stand ? 'IPMA\'s ' + esc(stand) + ' warnings for Lisbon stand' : 'IPMA\'s warnings are what stands') + '</b>: they are the official statement, and only their end times are end times.</p>' +
      (cur ? '<p class="wxc-hyp-line">' + esc(cap(cur.stands || cur.hypothesis)) + (cur.confidence ? ' <span class="meta">(confidence: ' + esc(cur.confidence) + ')</span>' : '') + '</p>' : '') +
      (cur && cur.weighing ? '<p class="wxc-hyp-line">' + esc(cur.weighing.charAt(0).toUpperCase() + cur.weighing.slice(1)) + '.</p>' : '') +
      (win && win.worst_window_utc ? '<p class="wxc-hyp-line">The hours it weighs most for Lisbon: about <b>' + hm(win.worst_window_utc[0]) + ' to ' + hm(win.worst_window_utc[1]) + '</b>' + (win.confidence ? ' <span class="meta">(confidence in the window: ' + esc(win.confidence.window) + '; in the peak hour and strength: ' + esc(win.confidence.peak_hour_and_strength) + ')</span>' : '') + '. IPMA\'s warnings run longer.</p>' : '') +
      (cur && (cur['for'] || cur.against) ? '<details class="in"><summary>The reasons for and against</summary><div class="wxc-two"><div><h3>For</h3><ul>' + list(cur['for']) + '</ul></div><div><h3>Against</h3><ul>' + list(cur.against) + '</ul></div></div></details>' : '') +
      (ins ? '<details class="in"><summary>What it weighed</summary><ul>' + ins + '</ul></details>' : '') +
      (cur && cur.supersedes ? '<p class="meta">Supersedes: ' + esc(cur.supersedes) + '.</p>' : '') +
      '<p>' + prov('analysis', 'the analysis, with its reasons', wr).replace(', read ', ', written ') + '</p></details></section>'
  }

  function madeira(t) {
    var M = D.madeira, items = (((D.warn || {}).red_and_orange_elsewhere || {}).items || []).filter(function (w) { return AREA[w.area] })
    if (!M && !items.length) return ''
    var st = ((M || {}).stations || []).filter(function (s) { return s.max_6h_rain && s.max_6h_rain.mm != null }).sort(function (a, b) { return b.max_6h_rain.mm - a.max_6h_rain.mm })
    var top = st.slice(0, 5), mx = top.length ? top[0].max_6h_rain.mm : 1
    var windy = ((M || {}).stations || []).map(function (s) { var l = (s.hourly || [])[s.hourly.length - 1]; return l && l.wind_mean_kmh != null ? { s: s, l: l } : null }).filter(Boolean).sort(function (a, b) { return b.l.wind_mean_kmh - a.l.wind_mean_kmh })[0]
    var bars = top.map(function (s) {
      var m = s.max_6h_rain, last = (s.hourly || [])[s.hourly.length - 1], a = T(m.hours_labelled[0]) - 36e5
      return '<li><span class="wxc-hb-n">' + esc(s.name.replace(/^Madeira, /, '')) + '</span><span class="wxc-hb-t"><span class="wxc-hb" style="width:' + (100 * m.mm / mx).toFixed(1) + '%"></span></span><span class="wxc-hb-v"><b>' + num(m.mm, 1) + '</b> mm <i>' + when(a, t) + ' to ' + when(m.hours_labelled[1], t) + (last && last.rain_mm != null ? ' · last hour ' + num(last.rain_mm, 1) + ' mm' : '') + '</i></span></li>'
    }).join('')
    var live = items.filter(function (w) { return status(w, t) !== 'ended' }).sort(function (a, b) { return RANK[b.level] - RANK[a.level] || T(a.start_utc) - T(b.start_utc) }), ended = items.length - live.length
    var topL = live.length ? live[0].level : null, shown = live.filter(function (w) { return w.level === topL }), rest = live.length - shown.length
    var wl = shown.map(function (w) { var s = status(w, t); return '<li>' + lvl(w.level) + ' <b>' + esc(EN[w.type] || w.type) + '</b>, ' + esc(AREA[w.area]) + ' <span class="wxc-st">' + (s === 'in force' ? 'in force until ' + when(w.end_utc, t) : 'from ' + when(w.start_utc, t) + ' to ' + when(w.end_utc, t)) + '</span> <span class="meta">' + (w.text_en ? esc(w.text_en) + ' <span lang="pt">(' + esc(w.text_pt || '') + ')</span>' : '<span lang="pt">' + esc(w.text_pt || '') + '</span>') + '</span></li>' }).join('')
    return '<section class="wxc-sec" aria-labelledby="wxc-h-mad"><h2 id="wxc-h-mad">Madeira <span class="meta">observed, and IPMA\'s warnings</span></h2><div class="wxc-two wide">' +
      '<div><h3>Rain measured <span class="lvl obs">observed</span></h3><p class="meta">The most rain in any six hours at each of IPMA\'s stations, the five wettest.</p><ol class="wxc-hbars">' + bars + '</ol>' +
      (function () {
        var A = D.madAir, ms = (A || {}).metars || [], last = ms[ms.length - 1]; if (!last) return ''
        var mx = A.max_gust
        return '<p class="wxc-gustline"><b>Madeira airport, ' + hm(last.time_utc) + ':</b> wind ' + num(last.wind_kmh) + ' km/h' + (last.gust_kmh != null ? ', <b>gusting ' + num(last.gust_kmh) + ' km/h</b>' : ', no gust reported') + ' <span class="lvl obs">observed ' + ago(last.time_utc, t) + '</span>' + (mx && mx.kmh != null ? ' <span class="meta">Highest gust in the reports kept: ' + num(mx.kmh) + ' km/h at ' + when(mx.time_utc, t) + '.</span>' : '') + ' <span class="meta">One point on the south-east coast (the airport\'s own report, METAR), not a warning area.</span> ' + prov('madAir', 'METAR LPMA', A.read_utc) + '</p>'
      })() +
      (windy ? '<p class="meta">Strongest hourly mean wind in the last hour: <b>' + num(windy.l.wind_mean_kmh) + ' km/h</b> ' + arrow(windy.l.wind_dir) + esc(windy.l.wind_dir) + ' at ' + esc(windy.s.name) + ' (the hour to ' + hm(windy.l.time_utc) + '; a mean, not a gust).</p>' : '') +
      '<p>' + (M ? prov('madeira', 'IPMA stations in Madeira', M.read_utc) : '') + '</p></div>' +
      '<div><h3>IPMA\'s red and orange warnings</h3>' + (wl ? '<ul class="wxc-list">' + wl + '</ul>' : '<p class="meta">None in force or expected in the file read.</p>') + (rest ? '<p class="meta">And ' + rest + ' at a lower level, in the file linked below.</p>' : '') + (ended ? '<p class="meta">' + ended + ' earlier red or orange warning' + (ended > 1 ? 's have' : ' has') + ' ended.</p>' : '') + '<p>' + (D.warn ? prov('warn', 'IPMA warnings', D.warn.red_and_orange_elsewhere.read_utc) : '') + '</p></div></div></section>'
  }

  function madeiraHours(t) {
    var M = D.madeira; if (!M || !(M.stations || []).length) return ''
    var last = 0; M.stations.forEach(function (s) { (s.hourly || []).forEach(function (r) { if (r.rain_mm != null && T(r.time_utc) > last) last = T(r.time_utc) }) }); if (!last) return ''
    var ws = (((D.warn || {}).red_and_orange_elsewhere || {}).items || []).filter(function (w) { return w.area === 'MRM' })
    return rainChart(t, { D0: last - 864e5, stations: M.stations, ws: ws, place: 'Madeira', strip: 'mountains', id: 'wxc-h-madh', title: 'Madeira, the last 24 hours read: rain measured against warned', key: 'madeira', read: M.read_utc,
      note: 'The bands are IPMA\'s red and orange rain warnings for Madeira\'s mountain areas still in its file; an earlier, superseded warning is not in the file and so is not drawn.' })
  }

  // what is closed and what runs: the deciders' own decisions (data/decisions/graph.json). The grouping reads the decision's own words;
  // it adds nothing. Hypotheses are left out here: this is the list of what was decided or not yet announced.
  var OFF = /clos|suspend|cancel|will not take place|suppress|called off/i, LIM = /limit|condition|constraint|disruption|adjust|reassess|watched|rebook/i
  var PART = /condition|constraint|possible disruption|adjust|limited to|suppresses \w+ trains/i   // a partial measure is a limit, whatever else its sentence says
  // the edge's own `state` (closed, suspended, limited, running, not_announced) when the data room carries it; the decision's words until then
  function groupOf(e, g) {
    if (e.status === 'not_announced' || e.state === 'not_announced') return g.open
    if (e.state) return /closed|suspended|cancel/.test(e.state) ? g.off : e.state === 'limited' ? g.lim : e.state === 'running' ? g.on : g.lim
    return PART.test(e.decision) ? g.lim : OFF.test(e.decision) ? g.off : LIM.test(e.decision) ? g.lim : g.on
  }
  function decided() {
    var G = D.decisions, nodes = {}; if (!G) return null
    ;(G.nodes || []).forEach(function (n) { nodes[n.id] = n })
    var KIND = { transport: 1, service: 1, organiser: 1, venue: 1, municipality: 1, government: 1 }
    var es = (G.edges || []).filter(function (e) { return e.label !== 'hypothesis' && nodes[e.by] && KIND[nodes[e.by].kind] && (e.status === 'happened' || e.status === 'not_announced') && !/^madeira|^apram/.test(e.by) && !/^(mayor-expects|websummit-assessing|mai-websummit|gov-recommends)/.test(e.id) })
    var g = { off: [], lim: [], on: [], open: [] }
    es.forEach(function (e) { groupOf(e, g).push(e) })
    return { g: g, nodes: nodes, G: G }
  }
  var short = function (n) { return String(n.name).replace(/\s*\(.*$/, '').replace(/ and .*$/, '') }
  // the first screen's line of what is closed and what runs: names only, each a link to its entry below
  function closedStrip(t) {
    var d = decided(); if (!d) return ''
    var seen = {}, names = function (list) { return list.filter(function (e) { var k = e.by; if (seen[k] || d.nodes[k].kind === 'government') return false; seen[k] = 1; return true }).map(function (e) { return '<a href="#d-' + esc(e.id) + '">' + esc(short(d.nodes[e.by])) + '</a>' + (ok(e.read) ? ' <small>read ' + when(e.read, t) + '</small>' : '') }).join(', ') }
    var offN = names(d.g.off), limN = names(d.g.lim), onN = names(d.g.on)   // a body is named once: closed first, then limited, then running
    return '<div class="wxc-strip3"><p><b>Closed or suspended today</b> ' + (offN || 'none in the data') + '</p>' + (limN ? '<p><b>Said it would run, with limits</b> ' + limN + '</p>' : '') + (onN ? '<p><b>Said it would run</b> ' + onN + '</p>' : '') + '<p class="prov">As each body announced, at the time read; not a live service status. <a href="#wxc-h-closed">what exactly, when, and the source of each</a></p></div>'
  }

  function closed(t) {
    var d = decided(); if (!d) return ''
    var G = d.G, nodes = d.nodes, g = d.g
    var item = function (e) {
      var n = nodes[e.by], who = String(n.name).replace(/\s*\(.*$/, ''), hrs = ok(e.effect_from_utc) ? (ok(e.effect_to_utc) ? when(e.effect_from_utc, t) + ' to ' + when(e.effect_to_utc, t) : 'from ' + when(e.effect_from_utc, t)) : ''
      var txt = String(e.decision); if (txt.length > 170) txt = txt.slice(0, 168).replace(/\s+\S*$/, '') + '…'
      return '<li id="d-' + esc(e.id) + '"><p><b>' + esc(who) + '</b> ' + lbl(e.label) + (hrs ? ' <span class="wxc-st">' + hrs + '</span>' : '') + '</p><p>' + esc(txt) + '</p><p class="prov">' + (/T\d\d:\d\d/.test(e.at || '') ? 'decided ' + when(e.at, t) + ' UTC · ' : '') + 'read ' + (ok(e.read) ? when(e.read, t) + ' UTC' : 'time not recorded') + ' · <a href="' + esc(view('data/decisions/graph.json', 'edges/' + (G.edges || []).indexOf(e))) + '">in the data room</a> (' + esc(e.id) + ')</p></li>'
    }
    var col = function (title, sub, list, cls) { return list.length ? '<div class="wxc-col ' + cls + '"><h3>' + title + ' <span class="meta">' + list.length + '</span></h3><p class="meta">' + sub + '</p><ul class="wxc-list">' + list.map(item).join('') + '</ul></div>' : '' }
    return '<section class="wxc-sec" aria-labelledby="wxc-h-closed"><h2 id="wxc-h-closed">What is closed and what runs <span class="meta">Lisbon and the mainland, as each body announced</span></h2><p class="meta wxc-rec">Each entry is the data room\'s record of what the body announced, with the time it was read. It is not a live service status and not our view.</p><div class="wxc-cols">' +
      col('Closed or suspended', 'Decided by the body named.', g.off, 'c-off') + col('Said it would run, with limits', 'Announced as running, with a limit or a warning of disruption.', g.lim, 'c-lim') + col('Said it would run', 'Announced as running.', g.on, 'c-on') + col('Not yet announced', 'Due, and nothing announced when last read.', g.open, 'c-open') +
      '</div><p class="meta">' + lbl('fact') + ' read on the body\'s own channel. ' + lbl('evidence') + ' reported by others, such as the press. ' + prov('decisions', 'the decision graph', G.updated) + '</p></section>'
  }

  function tomorrow(t) {
    var C = (D.changes || {}).thursday, I = D.incident || {}; if (!C && !I.thursday) return ''
    var d = C && C.ipma_daily_thursday, m = C && C.ipma_model_thursday_morning, w = C && C.lisbon_warnings_touching_thursday
    var date = d && d.forecastDate ? d.forecastDate + 'T12:00:00Z' : null, isTom = date && day(date) === day(t + 864e5), isToday = date && day(date) === day(t)
    var A = D.analysis, view = null; ((A || {}).updates || []).forEach(function (u) { if (u.thursday_morning) view = u })
    var tiles = ''
    if (w) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">IPMA warnings for Lisbon</p>' + ((w.items || []).length ? '<ul class="wxc-list tight">' + w.items.map(function (x) { return '<li>' + lvl(x.level) + ' <b>' + esc(EN[x.type] || x.type) + '</b> ' + when(x.start_utc, t) + ' to ' + when(x.end_utc, t) + '</li>' }).join('') + '</ul>' : '<p class="wxc-big">none</p>') + '<p class="meta">' + (w.none_above_yellow ? 'Nothing above yellow touches the day in the file read.' : '') + '</p><p>' + prov('changes', 'IPMA warnings', w.read_utc) + '</p></div>'
    if (d) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">IPMA\'s daily forecast, Lisbon</p><p class="wxc-big">' + num(d.tMin) + '° <small>to</small> ' + num(d.tMax) + '°</p><p class="meta">' + (d.idWeatherType_en ? '<b>' + esc(d.idWeatherType_en) + '.</b> ' : '') + 'Chance of rain ' + num(d.precipitaProb) + '%. ' + (d.classWindSpeed_en ? esc(d.classWindSpeed_en) + ' wind' : 'Wind') + ' from ' + arrow(d.predWindDir) + esc(d.predWindDir || '?') + '.</p><p>' + prov('changes', 'IPMA daily forecast', d.read_utc) + '</p></div>'
    if (m) tiles += '<div class="wxc-tile"><p class="wxc-eyebrow">The morning, IPMA\'s automatic forecast</p><p class="wxc-big">' + num(m.wind_mean_kmh_range[0]) + '–' + num(m.wind_mean_kmh_range[1]) + '<small>km/h mean wind</small></p><p class="meta">00:00 to 12:00, from ' + esc((m.wind_dirs || []).join(', ')) + '. Chance of rain up to ' + num(m.rain_prob_pct_max) + '%. A mean at one point, not gusts.</p><p>' + prov('changes', 'IPMA automatic forecast', m.read_utc) + '</p></div>'
    return '<section class="wxc-sec" aria-labelledby="wxc-h-tom"><h2 id="wxc-h-tom">' + (isTom ? 'Tomorrow' : isToday ? 'Today' : 'Next') + (date ? ' <span class="meta">' + esc(longDay(date)) + ', what the sources say</span>' : '') + '</h2>' +
      (tiles ? '<div class="wxc-tiles three">' + tiles + '</div>' : '') +
      (I.thursday ? '<div class="wxc-decision flat"><p class="wxc-eyebrow">Web Summit, Day 3 ' + lbl('fact') + '</p><p class="wxc-dtext">' + esc(I.thursday) + '</p><p class="prov"><a href="' + esc(room + 'index.html') + '">In the data room</a></p></div>' : '') +
      (view ? '<p class="meta">The team\'s analysis of Thursday (a hypothesis, not IPMA\'s forecast) is in the data room: ' + prov('analysis', 'the analysis', view.written_utc) + '</p>' : '') + '</section>'
  }

  function latest(t) {
    var S = D.signals; if (!S) return ''
    var items = (S.items || []).filter(function (x) { return x.key }).slice(-3).reverse()
    return '<section class="wxc-sec" aria-labelledby="wxc-h-last"><h2 id="wxc-h-last">The last changes <span class="meta">newest first</span></h2><ol class="wxc-feed">' + items.map(function (x) {
      return '<li><a class="wxc-feed-t" href="' + esc(ROOM.signals + '#' + x.id) + '"><time datetime="' + esc(x.at) + '">' + (x.approx ? '~' : '') + when(x.at, t) + '</time></a><div><p>' + lbl(x.label) + (x.decision ? ' <span class="lbl dec">decision</span>' : '') + ' ' + esc(x.text) + '</p><p class="prov">' + esc((x.sources || []).map(function (s) { return s.label }).slice(0, 2).join('; ')) + ' · <a href="' + esc(ROOM.signals + '#' + x.id) + '">the row and its sources</a></p></div></li>'
    }).join('') + '</ol><p class="meta"><a href="' + esc(ROOM.signals) + '">The whole timeline</a> is in the data room, with every row\'s sources.</p></section>'
  }

  var fold = function (key, title, sub, inner, open) { return inner ? '<details class="wxc-fold" data-k="' + key + '"' + (open ? ' open' : '') + '><summary><h2>' + title + '</h2> <span class="meta">' + sub + '</span></summary>' + inner + '</details>' : '' }
  function render() {
    var t = now(), sx = (el.querySelector('.wxc-scroll') || {}).scrollLeft, first = !el.querySelector('.wxc'), opened = {}
    el.querySelectorAll('details').forEach(function (d, i) { opened[d.dataset.k || (d.querySelector('summary') || {}).textContent + i] = d.open })
    var nextRead = D.warn && D.warn.next_read_utc
    el.innerHTML = '<div class="wxc">' + hero(t) + hours(t) + whereMap(t) + tomorrow(t) + '<div class="wxc-pair">' + latest(t) + madeira(t) + '</div>' +
      fold('closed', 'What is closed and what runs', 'every entry: who, what, when, the source', closed(t)) +
      fold('charts', 'Rain and wind today, as charts', 'measured against warned', '<div class="wxc-pair even">' + rainChart(t) + windChart(t) + '</div>') +
      fold('madeira', 'Madeira, hour by hour', 'rain measured against warned, the last 24 hours read', madeiraHours(t)) +
      reading(t) +
      '<p class="wxc-foot"><b>Not a warning service.</b> This page shows what IPMA warns and what the authorities decided, as read at the times shown; it makes no forecast and gives no advice of its own. Follow <a href="https://www.ipma.pt/" rel="external">IPMA <span aria-hidden="true">↗</span></a> and <a href="https://prociv.gov.pt/" rel="external">ANEPC <span aria-hidden="true">↗</span></a> (both leave this site). Everything here is read from <a href="' + esc(base + 'data-room/index.html') + '">the data room</a>, where the technical view is' + (ok(nextRead) && T(nextRead) > t ? '; its weather files are next read at about ' + hm(nextRead) + ' UTC' : '') + '.' + (failed.length ? ' Could not read: ' + esc(failed.join(', ')) + '.' : '') + (qNow ? ' <b>Shown as at ' + esc(hm(t)) + ' UTC (?now=), not the present.</b>' : '') + '</p></div>'
    el.querySelectorAll('details').forEach(function (d, i) { var k = d.dataset.k || (d.querySelector('summary') || {}).textContent + i; if (k in opened) d.open = opened[k] })
    var sc = el.querySelector('.wxc-scroll'), nw = el.querySelector('.wxc-head .now')
    if (sc && !first) sc.scrollLeft = dayOff && sx == null ? 0 : sx
    else if (sc && nw && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = Math.max(0, nw.offsetLeft - 150)
    if (first && /^#d-/.test(location.hash)) reveal(location.hash.slice(1))
  }
  // a link to an entry inside a fold opens the fold first
  function reveal(id) { var x = document.getElementById(id); if (!x) return; for (var d = x.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true; x.scrollIntoView({ block: 'center' }) }
  el.addEventListener('click', function (e) { var bt = e.target.closest && e.target.closest('button[data-day]'); if (bt) { dayOff = +bt.dataset.day; render(); var nb = el.querySelector('button[data-day="' + dayOff + '"]'); if (nb) nb.focus(); return }
    var a = e.target.closest && e.target.closest('a[href^="#"]'); if (!a) return; var id = a.getAttribute('href').slice(1); if (!document.getElementById(id)) return; e.preventDefault(); reveal(id); try { history.replaceState(null, '', '#' + id) } catch (x) {} })

  load().then(function () {
    render()
    setInterval(render, 60 * 1000)                                   // the clock, "now" and the status words move with the minute
    setInterval(function () { load().then(render) }, 5 * 60 * 1000)   // the data room's files, again every five minutes
  })
})()
