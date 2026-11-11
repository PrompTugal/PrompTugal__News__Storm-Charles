// incident.transport@web-summit.dinis: /transport/, flights and public transport during Storm Charles.
// Reads only this site's own files (the data room's JSON); makes no outside request.
// Not a warning service: it shows what open sources and the operators say, each item with its source and the time read.
(function () {
  'use strict'
  var el = document.getElementById('tr'); if (!el) return
  var base = el.getAttribute('data-base') || '../', inc = el.getAttribute('data-incident')
  var room = base + 'incidents/' + inc + '/data/'
  var ENT = ['airport', 'tap', 'metro', 'cp', 'ferries', 'bridges', 'tunnels', 'rede-expressos', 'flixbus', 'port']
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var T = function (t) { if (!t) return NaN; t = String(t); if (/T\d\d:\d\d$/.test(t)) t += ':00'; if (!/Z|[+-]\d\d:?\d\d$/.test(t)) t += 'Z'; return Date.parse(t) }
  var hm = function (t) { var d = new Date(T(t)); return isNaN(d) ? '?' : d.toISOString().slice(11, 16) }
  var dhm = function (t) { var d = new Date(T(t)); return isNaN(d) ? '?' : d.toISOString().slice(8, 10) + ' Nov ' + d.toISOString().slice(11, 16) }
  var tm = function (t, txt) { var d = new Date(T(t)); return isNaN(d) ? '?' : '<time datetime="' + d.toISOString() + '">' + esc(txt || dhm(t)) + '</time>' }
  var ftm = function (t) { var d = new Date(T(t)); return isNaN(d) ? '<span></span>' : '<time datetime="' + d.toISOString() + '">' + d.toISOString().slice(11, 16) + '<small>' + d.toISOString().slice(8, 10) + ' Nov</small></time>' }
  var prov = function (label, url, read) { return '<span class="prov">' + (url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(label) + '</a>' : esc(label)) + (read ? ', read ' + tm(read, dhm(read)) + ' UTC' : '') + '</span>' }
  var lbl = function (l) { l = String(l || '').toLowerCase(); var k = /fact|official/.test(l) ? 'fact' : /hyp/.test(l) ? 'hypothesis' : /none/.test(l) ? 'no data' : 'evidence'; return '<span class="lbl l-' + k.replace(' ', '-') + ' tr-l-' + k.replace(' ', '-') + '">' + k + '</span>' }
  var get = function (u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null }).catch(function () { return null }) }

  function bars(h) {
    var max = Math.max.apply(null, h.filter(function (n) { return n != null }).concat([1]))
    var say = function (n) { return n == null ? 'not covered' : n }
    return '<div class="tr-bars" role="img" aria-label="Departures by hour, UTC: ' + h.map(function (n, i) { return i + 'h ' + say(n) }).join(', ') + '">' +
      h.map(function (n, i) { return '<span class="tr-bar' + (n == null ? ' tr-nc' : '') + '" title="' + String(i).padStart(2, '0') + ':00 UTC: ' + say(n) + '"><i style="height:' + (n == null ? 100 : Math.round(100 * n / max)) + '%"></i><b>' + (n == null ? '' : n || '') + '</b><small>' + String(i).padStart(2, '0') + '</small></span>' }).join('') + '</div>' +
      (h.some(function (n) { return n == null }) ? '<p class="meta">Dotted hours: not covered by our readings (OpenSky\'s anonymous answer reaches back only a few hours), not zero.</p>' : '')
  }

  function airport(a) {
    var d = a.departures_today || {}, l = a.live_snapshot || {}
    var s = '<section class="card tr-ap"><h2>' + esc(a.name) + ' <span class="meta">' + esc(a.iata) + ' · ' + esc(a.icao) + '</span></h2>'
    if (d.label === 'fact') {
      s += '<p class="tr-big"><b>' + d.count + '</b> airline departures seen' + (d.covered_from ? ' since ' + tm(d.covered_from, hm(d.covered_from)) + ' UTC' : '') + ' ' + lbl('fact') + '</p>' + bars(d.by_hour_utc || [])
      if (d.by_airline && d.by_airline.length) s += '<p class="meta">' + d.by_airline.slice(0, 6).map(function (x) { return esc(x.airline) + ' ' + x.n }).join(' · ') + (d.by_airline.length > 6 ? ' · …' : '') + '</p>'
      s += '<p>' + prov('OpenSky Network', 'https://opensky-network.org/', d.read) + '</p>'
    } else s += '<p>' + lbl('none') + ' ' + esc(d.note || 'No reading') + '</p>'
    if (l.label === 'fact') s += '<p>At ' + tm(l.at, hm(l.at)) + ' UTC, within about 25 km: <b>' + l.on_ground + '</b> airline aircraft on the ground, <b>' + l.airborne_low + '</b> airborne below 3,000 m ' + lbl('fact') + '</p>'
    s += '<p class="tr-hyp">' + lbl('hypothesis') + ' ' + esc((a.coverage_caveat || {}).text || '') + '</p>'
    s += '<p class="meta">Arrivals: ' + esc((a.arrivals_today || {}).note || '') + ' Baseline: ' + esc((a.baseline || {}).note || '') + '</p>'
    return s + '</section>'
  }

  function operator(o) {
    var s = '<section class="card tr-op"><h2>' + esc(o.operator) + '</h2>'
    if (o.label === 'none') return s + '<p>' + lbl('none') + ' ' + esc(o.note) + '</p></section>'
    s += '<p class="tr-state">' + lbl(o.label) + ' ' + esc(o.state) + '</p>'
    if (o.counts) s += '<ul class="kv"><li>Notices in force <b>' + o.counts.active_notices + '</b></li><li>Of them, for the weather <b>' + o.counts.weather_notices + '</b></li>' +
      Object.keys(o.counts.by_effect || {}).map(function (k) { return '<li>' + esc(k.toLowerCase().replace(/_/g, ' ')) + ' <b>' + o.counts.by_effect[k] + '</b></li>' }).join('') + '</ul>'
    if (o.notices && o.notices.length) s += '<ul class="feed">' + o.notices.slice(0, 4).map(function (n) {
      return '<li>' + ftm(n.updated || n.from) + '<div><b>' + esc(n.title || n.header) + '</b><span class="via">“' + esc(n.excerpt) + '”' + (n.link ? ' <a href="' + esc(n.link) + '" rel="noopener">the notice</a>' : '') + '</span></div></li>'
    }).join('') + '</ul>'
    return s + '<p>' + prov(o.operator.split(' (')[0] + "'s own data", o.link || o.source, o.read) + '</p></section>'
  }

  function decisions(list) {
    var rows = []
    list.forEach(function (e, i) {
      if (!e || !e.decisions) return
      var last = e.decisions.slice().sort(function (a, b) { return (T(b.published_utc) || 0) - (T(a.published_utc) || 0) })[0]
      if (last) rows.push({ ent: ENT[i], d: last })
    })
    rows.sort(function (a, b) { return (T(b.d.published_utc) || 0) - (T(a.d.published_utc) || 0) })
    return '<section class="card"><h2>Decisions on transport, as recorded by our researcher</h2><p class="meta">The latest decision recorded for each operator in <a href="' + base + 'incidents/' + inc + '/data/decisions/entities/">data/decisions/entities/</a>. Mostly read through the press, so mostly evidence.</p><ul class="feed">' +
      rows.map(function (r) { return '<li>' + ftm(r.d.published_utc) + '<div>' + lbl(r.d.label) + '<b>' + esc(r.d.decision) + '</b><span class="via">' + esc(r.d.decided_by || '') + ' · ' + prov('source', r.d.address, r.d.read) + ' · <a href="' + base + 'incidents/' + inc + '/data/decisions/entities/' + r.ent + '.json">' + esc(r.ent) + '.json</a></span></div></li>' }).join('') + '</ul></section>'
  }

  Promise.all([get(room + 'transport/flights.json'), get(room + 'transport/services.json')].concat(ENT.map(function (e) { return get(room + 'decisions/entities/' + e + '.json') }))).then(function (r) {
    var f = r[0], sv = r[1], ents = r.slice(2), h = ''
    h += '<p class="tr-note"><b>Not a warning service.</b> No advice of ours: check with your airline or operator. Counts are what open sources saw, not totals.</p>'
    h += '<h2 class="tr-h">Flights</h2>'
    if (f) h += '<p class="meta">Updated ' + tm(f.updated) + ' UTC. ' + esc(f.attribution) + '. Airline flights only; nothing per aircraft is shown.</p><div class="tr-grid">' + f.airports.map(airport).join('') + '</div>'
    else h += '<p>' + lbl('none') + ' flights.json did not load.</p>'
    h += '<h2 class="tr-h">Buses, ferries, trains</h2>'
    if (sv) h += '<p class="meta">Updated ' + tm(sv.updated) + ' UTC, from the operators’ own open data. Short excerpts; the notice is one click away.</p><div class="tr-grid">' + sv.operators.map(operator).join('') + '</div>'
    h += decisions(ents)
    h += '<p class="meta">As data: <a href="' + room + 'transport/flights.json">flights.json</a>, <a href="' + room + 'transport/services.json">services.json</a> (also under <a href="' + base + 'api/v1/index.json">api/v1</a>). Sources and their terms: <a href="' + base + 'transport/sources.html">transport/sources</a>.</p>'
    el.innerHTML = h
  })
})()
