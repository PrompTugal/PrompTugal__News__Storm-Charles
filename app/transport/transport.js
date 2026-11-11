// incident.transport@web-summit.dinis: /transport/, flights and public transport during Storm Charles.
// Reads only this site's own files (the data room's JSON); makes no outside request.
// Not a warning service: it shows what open sources and the operators say, each item with its source and the time read.
(function () {
  'use strict'
  var el = document.getElementById('tr'); if (!el) return
  var base = el.getAttribute('data-base') || '../', inc = el.getAttribute('data-incident')
  var room = base + 'incidents/' + inc + '/data/'
  var mode = el.getAttribute('data-mode') || 'hub'
  var MODES = [
    { id: 'flights', name: 'Flights', page: 'flights', file: 'flights.json', ents: ['airport', 'tap'], ops: 'Lisbon, Porto, Faro and Funchal airports (ANA\'s newsroom; OpenSky Network)' },
    { id: 'trains', name: 'Trains', page: 'trains', file: 'trains.json', ents: ['cp'], ops: 'CP, Fertagus' },
    { id: 'metro', name: 'Metro and light rail', page: 'metro', file: 'metro.json', sched: 'metro-schedule.json', ents: ['metro'], ops: 'Metro de Lisboa, Metro do Porto, MTS' },
    { id: 'buses', name: 'Buses and trams', page: 'buses', file: 'buses.json', ents: [], ops: 'Carris Metropolitana; Carris (city): its terms forbid republishing, link only' },
    { id: 'ferries', name: 'Ferries and the port', page: 'ferries', file: 'ferries.json', ents: ['ferries', 'port'], ops: 'Transtejo Soflusa' },
    { id: 'coaches', name: 'Coaches', page: 'coaches', file: null, ents: ['rede-expressos', 'flixbus'], ops: 'Rede Expressos, FlixBus' },
    { id: 'taxis', name: 'Taxis and ride-hailing', page: 'taxis', file: null, ents: [], ops: 'only what operators or authorities state' },
    { id: 'bridges', name: 'Bridges and tunnels', page: 'bridges', file: 'bridges.json', ents: ['bridges', 'tunnels'], ops: 'Lusoponte (its own notices); Infraestruturas de Portugal, the city (next)' }
  ]
  var M = MODES.filter(function (m) { return m.id === mode })[0]
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
    if (a.ana && a.ana.label === 'fact') {
      var n = a.ana
      s += '<p class="tr-big"><b>' + (n.cancelled_in_advance + (n.cancelled_during_day || 0)) + '</b> of ' + n.scheduled + ' movements cancelled, at ' + tm(n.situation_at, hm(n.situation_at)) + ' UTC ' + lbl('fact') + '</p>' +
        '<ul class="kv"><li>Scheduled <b>' + n.scheduled + '</b></li><li>Cancelled in advance <b>' + n.cancelled_in_advance + '</b></li><li>Cancelled during the day <b>' + (n.cancelled_during_day == null ? '?' : n.cancelled_during_day) + '</b></li><li>Operated by then <b>' + (n.operated == null ? '?' : n.operated) + '</b></li></ul>' +
        '<p class="meta">Movements are departures and arrivals together' + (n.scope ? '; ' + esc(n.scope) : '') + '. Published ' + tm(n.published, dhm(n.published)) + ' UTC.</p>' +
        '<p>' + prov('ANA, the airport operator, in its newsroom', n.link, n.read) + '</p>'
    }
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
    s += '<p class="tr-state">' + lbl(o.label) + ' ' + esc(o.state) + '</p>' + (o.kind ? '<p class="meta">Read from: ' + esc(o.kind) + '</p>' : '') + (o.line_status ? '<p class="meta">' + lbl(o.line_status.label) + ' Line status: ' + esc(o.line_status.note) + '</p>' : '') + (o.note ? '<p class="meta">' + esc(o.note) + '</p>' : '')
    if (o.vehicles_now) { var vn = o.vehicles_now; s += '<p class="tr-big"><b>' + vn.vehicles + '</b> buses running now, on ' + vn.lines + ' lines ' + lbl('fact') + '</p><p class="meta">Reporting a position in the five minutes before ' + tm(vn.at, hm(vn.at)) + ' UTC. ' + (vn.series && vn.series.length > 1 ? 'Our readings: ' + vn.series.slice(-8).map(function (p) { return hm(p.at) + ' ' + p.vehicles }).join(' · ') + '. ' : '') + esc(vn.baseline.note) + '</p>' }
    if (o.counts) s += '<ul class="kv"><li>Notices in force <b>' + o.counts.active_notices + '</b></li><li>Of them, for the weather <b>' + o.counts.weather_notices + '</b></li>' +
      Object.keys(o.counts.by_effect || {}).map(function (k) { return '<li>' + esc(k.toLowerCase().replace(/_/g, ' ')) + ' <b>' + o.counts.by_effect[k] + '</b></li>' }).join('') + '</ul>'
    if (o.notices && o.notices.length) s += '<ul class="feed">' + o.notices.slice(0, 4).map(function (n) {
      return '<li>' + ftm(n.updated || n.published || n.from) + '<div><b>' + esc(n.title || n.header) + '</b><span class="via">“' + esc(n.excerpt) + '”' + (n.link ? ' <a href="' + esc(n.link) + '" rel="noopener">the notice</a>' : '') + '</span></div></li>'
    }).join('') + '</ul>'
    return s + '<p>' + prov(o.operator.split(' (')[0] + "'s own data", o.link || o.source, o.read) + '</p></section>'
  }

  function latest(e) { return e && e.decisions ? e.decisions.slice().sort(function (a, b) { return (T(b.published_utc) || 0) - (T(a.published_utc) || 0) })[0] : null }
  function decisions(ents, names, title) {
    var rows = []
    ents.forEach(function (e, i) { if (!e || !e.decisions) return; e.decisions.forEach(function (d) { rows.push({ ent: names[i], d: d }) }) })
    rows.sort(function (a, b) { return (T(b.d.published_utc) || 0) - (T(a.d.published_utc) || 0) })
    if (!rows.length) return ''
    return '<section class="card tr-dec"><h2>' + esc(title || 'Decisions recorded by our researcher') + '</h2><p class="meta">From the researcher’s list (data/decisions/entities/), mostly read through the press because the operator publishes nothing we can read: so mostly evidence, labelled.</p><ul class="feed">' +
      rows.slice(0, 8).map(function (r) { return '<li>' + ftm(r.d.published_utc) + '<div>' + lbl(r.d.label) + '<b>' + esc(r.d.decision) + '</b><span class="via">' + esc(r.d.decided_by || '') + ' · ' + prov('source', r.d.address, r.d.read) + ' · <a href="' + room + 'decisions/entities/' + r.ent + '.json">' + esc(r.ent) + '.json</a></span></div></li>' }).join('') + '</ul></section>'
  }
  var note = '<p class="tr-note"><b>Not a warning service.</b> No advice of ours. Your airline or operator decides whether your flight or service runs: its site or app has the latest. Each item says where it was read and when.</p>'
  var dataLine = function (files) { return '<p class="meta">As data: ' + files.map(function (f) { return '<a href="' + room + 'transport/' + f + '">' + f + '</a>' }).join(', ') + ' (also under <a href="' + base + 'api/v1/index.json">api/v1</a>). Sources and their terms: <a href="' + base + 'transport/sources.html">transport/sources</a>.</p>' }

  function hub() {
    var files = MODES.map(function (m) { return m.file ? get(room + 'transport/' + m.file) : Promise.resolve(null) })
    var entNames = [].concat.apply([], MODES.map(function (m) { return m.ents }))
    Promise.all(files.concat(entNames.map(function (e) { return get(room + 'decisions/entities/' + e + '.json') }))).then(function (r) {
      var data = r.slice(0, MODES.length), ents = {}; entNames.forEach(function (e, i) { ents[e] = r[MODES.length + i] })
      var h = note + '<div class="tr-grid">' + MODES.map(function (m, i) {
        var d = data[i], line = ''
        if (m.id === 'flights' && d) line = d.airports.filter(function (a) { return a.departures_today && a.departures_today.count }).map(function (a) { return esc(a.iata) + ' ' + a.departures_today.count + ' departures seen' + (a.departures_today.covered_from ? ' since ' + hm(a.departures_today.covered_from) : '') }).join(' · ') + ' ' + lbl('fact')
        else if (d && d.operators) line = d.operators.map(function (o) { return esc(o.operator.split(' (')[0]) + (o.label === 'none' ? ': no answer' : (o.notices && o.notices.length ? ': ' + o.notices.length + ' notice' + (o.notices.length > 1 ? 's' : '') : ': no recent notice')) }).join(' · ')
        else line = 'Own sources: not read yet.'
        var lt = m.ents.map(function (e) { return latest(ents[e]) }).filter(Boolean).sort(function (a, b) { return (T(b.published_utc) || 0) - (T(a.published_utc) || 0) })[0]
        return '<section class="card tr-mode"><h2><a href="' + m.page + '.html">' + esc(m.name) + '</a></h2><p class="meta">' + esc(m.ops) + '</p><p>' + line + '</p>' +
          (lt ? '<p class="meta">Latest decision recorded: ' + lbl(lt.label) + ' ' + esc(lt.decision) + ' (' + tm(lt.published_utc) + ' UTC)</p>' : '') + (d ? '<p class="prov">Read ' + tm(d.updated) + ' UTC</p>' : '') + '</section>'
      }).join('') + '</div>' + dataLine(MODES.filter(function (m) { return m.file }).map(function (m) { return m.file }))
      el.innerHTML = h
    })
  }

  function sched(j) {
    if (!j || !j.days || !j.days.length) return ''
    var today = new Date().toISOString().slice(0, 10), day = j.days.filter(function (x) { return x.day === today })[0] || j.days[0]
    var gt = function (t) { var h = +String(t).slice(0, 2); return h >= 24 ? String(h - 24).padStart(2, '0') + String(t).slice(2) + ' after midnight' : t }
    var row = function (l) {
      var max = Math.max.apply(null, l.per_hour.concat([1]))
      return '<section class="card tr-ap"><h3>' + esc(l.line) + ' line <span class="meta">' + l.trips + ' trips, first ' + esc(gt(l.first)) + ', last ' + esc(gt(l.last)) + '</span></h3><div class="tr-bars" role="img" aria-label="' + esc(l.line) + ' line, trips scheduled to start by hour, Lisbon time: ' + l.per_hour.map(function (n, i) { return i + 'h ' + n }).join(', ') + (l.after_midnight ? ', after midnight ' + l.after_midnight : '') + '">' +
        l.per_hour.map(function (n, i) { return '<span class="tr-bar" title="' + String(i).padStart(2, '0') + ':00: ' + n + ' scheduled"><i style="height:' + Math.round(100 * n / max) + '%"></i><b>' + (n || '') + '</b><small>' + String(i).padStart(2, '0') + '</small></span>' }).join('') + '</div>' +
        (l.after_midnight ? '<p class="meta">And ' + l.after_midnight + ' more start after midnight, the last at ' + esc(gt(l.last).slice(0, 5)) + '.</p>' : '') + '</section>'
    }
    return '<section class="tr-sched"><h2>Metro de Lisboa: the timetable for ' + esc(day.weekday.charAt(0).toUpperCase() + day.weekday.slice(1)) + ' ' + esc(day.day.slice(8)) + ' November ' + lbl('fact') + '</h2>' +
      '<p class="tr-state"><b>' + esc(j.status || 'planned timetable, not today’s service') + '.</b> ' + (j.todays_service ? esc(j.todays_service.note) : '') + '</p><p class="meta">Trips scheduled to start each hour, both directions, Lisbon time (the same as UTC in November). <b>The plan, not what ran</b>: a normal day to set beside the operator’s and the authorities’ reports. ' + prov(j.source.name + ', ' + j.source.publisher + ', ' + j.source.licence, j.source.url, j.source.read) + ', feed version ' + esc(j.source.feed_version) + '.</p>' +
      '<div class="tr-grid">' + day.lines.map(row).join('') + '</div></section>'
  }

  function page() {
    Promise.all([M.file ? get(room + 'transport/' + M.file) : Promise.resolve(null), M.sched ? get(room + 'transport/' + M.sched) : Promise.resolve(null)].concat(M.ents.map(function (e) { return get(room + 'decisions/entities/' + e + '.json') }))).then(function (r) {
      var d = r[0], ents = r.slice(2), h = note
      if (M.id === 'flights') {
        h += d ? '<p class="meta">Updated ' + tm(d.updated) + ' UTC. ' + esc(d.attribution) + '. Airline flights only; nothing per aircraft is shown. Cancellations: ANA’s own figures from its newsroom where it has published them, at the time it states (its boards show a bot check to automated readers, which we do not get round). Diversions: no open source states them; the decisions below hold what the press reports.</p><div class="tr-grid">' + d.airports.map(airport).join('') + '</div>' : '<p>' + lbl('none') + ' flights.json did not load.</p>'
      } else if (d) {
        h += '<p class="meta">Updated ' + tm(d.updated) + ' UTC, from each operator’s own site, feed or open API. Short excerpts; the notice is one click away.</p><div class="tr-grid">' + d.operators.map(operator).join('') + '</div>'
      } else h += '<p>' + lbl('none') + ' Own sources for this mode: not read yet (' + esc(M.ops) + '). Until then, the decisions recorded by our researcher, below.</p>'
      if (M.sched) h += sched(r[1])
      h += decisions(ents, M.ents)
      if (M.file) h += dataLine([M.file].concat(M.sched ? [M.sched] : []))
      h += '<p class="meta"><a href="index.html">All transport</a></p>'
      el.innerHTML = h
    })
  }
  if (M) page(); else hub()
})()
