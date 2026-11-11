// The flights map: aircraft over the Lisbon area with the wind on top, a time control over the snapshots, crosswind by runway end and
// departures and cancellations by hour (incident.designer@web-summit.dinis, design/round-65.md, round-66.md). Data: incident.flights@'s
// files under incidents/<id>/data/flights/ (index.json names them). Base map: base-<area>.json beside this file (Natural Earth, public domain; round 70).
// A page mounts it with <div data-flightmap="<path to the flights index.json>"></div>; frame.js loads this file only there.
// No colour is written here (tokens in app/site.css); no outside request; not a warning service: it shows what the sources said.
(function () {
  var me = document.currentScript && document.currentScript.src || ''
  // round 69: one map per area; a page can mount several (<div data-flightmap="…index.json" data-flightmap-area="madeira">), Lisbon by default.
  // wind: the wind files' area; snap: the snapshots' area; icao: the airport in runways, crosswind and movements; arp: the fallback path's point.
  var AREAS = {
    lisbon: { wind: 'lisbon', snap: 'lisbon', icao: 'LPPT', base: 'base-lisbon.json', view: [-10.0, 38.3, -8.5, 39.3], left: ['Lisbon'], name: 'the Lisbon area', place: 'Lisbon airport (LPPT)', ana: 'ANA, Lisbon airport', arp: { lat: 38.7742, lon: -9.1342 } /* the aerodrome reference point, rounded (AIP Portugal, LPPT AD 2.2) */ },
    madeira: { wind: 'madeira', snap: 'funchal', icao: 'LPMA', base: 'base-madeira.json', view: [-17.4, 32.45, -16.2, 33.15], name: 'Madeira', place: 'Madeira airport (LPMA)', ana: 'ANA, Madeira', arp: null }
  }
  var nmaps = 0
  var PLANE = 'M0 -11 L2 -3 L10 2 L10 4 L2 2 L1.5 8 L4 10 L4 11.5 L0 10.5 L-4 11.5 L-4 10 L-1.5 8 L-2 2 L-10 4 L-10 2 L-2 -3 Z'
  document.querySelectorAll('[data-flightmap]').forEach(mount)
  function mount(box) {
  var A = AREAS[box.getAttribute('data-flightmap-area')] || AREAS.lisbon, uid = 'fm-title-' + (++nmaps)
  var BASE = me.replace(/[^/]*$/, ''), IDX = box.getAttribute('data-flightmap'), DIR = IDX.replace(/[^/]*$/, '')
  var NS = 'http://www.w3.org/2000/svg', W = 1000
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  function get(u) { return fetch(u, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json() }) }
  function hm(t) { return String(t).slice(11, 16) }
  function day(t) { return String(t).slice(8, 10) + '/' + String(t).slice(5, 7) }
  function prov(d) { return d ? '<span class="prov">' + (d.source ? '<a href="' + esc(d.source) + '">' + esc(d.source_name || d.source.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]) + '</a>' : '') + (d.read_utc ? ' read <time datetime="' + esc(d.read_utc) + '">' + esc(hm(d.read_utc)) + ' UTC</time>' : '') + (d.licence ? ' · ' + esc(d.licence) : '') + (d.label ? ' · <span class="lbl">' + esc(d.label) + '</span>' : '') + '</span>' : '' }
  var cache = {}
  function rel(f) { var m = String(f).match(/data\/flights\/(.*)$/); return m ? m[1] : f }
  function file(f) { f = rel(f); return cache[f] || (cache[f] = get(DIR + f)) }
  // incident.flights@'s files (design/round-67.md): crosswind.json (METARs per airport and hour), wind/<area>-<day>.json (Open-Meteo grid),
  // snapshots/<day>/<HH>.json (OpenSky, airline only). Turned into the app's shapes; nothing is computed that the files do not say,
  // except unit conversions (m to ft, m/s to kt) and the runway's line, drawn from its true heading and length at the airport's point.
  var LPPT = A.arp
  function normalise(idx) {
    var fs = idx.files || [], winds = fs.filter(function (f) { return f.kind === 'wind-field' && (!f.covers || f.covers.area === A.wind) }), sn = fs.filter(function (f) { return f.kind === 'aircraft-snapshots' }), cw = fs.filter(function (f) { return f.kind === 'crosswind' })[0]
    return Promise.all([cw ? file(cw.path) : null, Promise.all(winds.map(function (f) { return file(f.path) })), Promise.all(sn.map(function (f) { return file(f.path) }))]).then(function (r) {
      var c = r[0], ap = c && (c.airports || []).filter(function (a) { return a.icao === A.icao })[0], out = { idx: { snapshots: [], wind_hours: [] } }
      r[1].forEach(function (w, wi) {
        var g = w.grid, lv = w.levels && w.levels['10m']; if (!g || !lv) return
        ;(w.times || []).forEach(function (t, h) {
          var key = 'wind:' + wi + ':' + h, pts = []
          for (var k = 0; k < g.lat.length * g.lon.length; k++) pts.push({ lat: g.lat[Math.floor(k / g.lon.length)], lon: g.lon[k % g.lon.length], dir_from_deg: lv.dir_deg[h][k], speed_kt: lv.speed_kt[h][k], gust_kt: lv.gust_kt ? lv.gust_kt[h][k] : null })
          cache[key] = Promise.resolve({ t: t, model: 'Open-Meteo ' + (w.forecast_from && t >= w.forecast_from ? 'forecast' : 'model analysis'), source: 'https://open-meteo.com/', source_name: 'Open-Meteo', licence: 'CC BY 4.0', label: w.label, read_utc: w.updated, points: pts })
          out.idx.wind_hours.push({ t: t, file: key })
        })
      })
      r[2].forEach(function (f, fi) { (f.snapshots || []).forEach(function (x, si) {
        if (x.area !== A.snap || !x.time) return
        var key = 'snap:' + fi + ':' + si
        cache[key] = Promise.resolve({ t: x.time, source: 'https://opensky-network.org/', source_name: 'OpenSky Network', licence: 'research and non-commercial use', label: f.label, read_utc: x.time,
          aircraft: (x.aircraft || []).map(function (a) { var m = a.geo_alt_m != null ? a.geo_alt_m : a.baro_alt_m; return { id: a.callsign, callsign: a.callsign, lat: a.lat, lon: a.lon, track_deg: a.track_deg, alt_ft: m != null ? m * 3.28084 : null, gs_kt: a.ground_speed_ms != null ? a.ground_speed_ms * 1.94384 : null, on_ground: a.on_ground } }) })
        out.idx.snapshots.push({ t: x.time, file: key })
      }) })
      if (ap && LPPT) {
        out.runways = (ap.runways || []).map(function (rw) { var e = rw.ends || [], hd = (e[0] && e[0].heading_true || 0) * Math.PI / 180, half = (rw.length_m || 3000) / 2 / 1000, dlat = Math.cos(hd) * half / 111.32, dlon = Math.sin(hd) * half / (111.32 * Math.cos(LPPT.lat * Math.PI / 180))
          return { id: rw.runway, approx: true, ends: [{ name: e[0] && e[0].end, lat: LPPT.lat - dlat, lon: LPPT.lon - dlon }, { name: e[1] && e[1].end, lat: LPPT.lat + dlat, lon: LPPT.lon + dlon }] } })
      }
      if (ap) {
        var rid = ap.runways && ap.runways[0] ? ap.runways[0].runway : 'runway'
        var meta = { source: (c.sources || []).map(function (x) { return x.url }).filter(function (u) { return /metar/i.test(u) })[0] || '', source_name: 'METAR', read_utc: c.updated, label: c.label || 'fact' }
        out.cross = Object.assign({ hours: (ap.hours || []).map(function (h) { var mx = null, gx = null
          ;(h.metars || []).forEach(function (m) { Object.keys(m.runways || {}).forEach(function (e) { var v = m.runways[e]; if (v.crosswind_kt != null) mx = Math.max(mx || 0, v.crosswind_kt); if (v.gust_crosswind_kt != null) gx = Math.max(gx || 0, v.gust_crosswind_kt) }) })
          var o = {}; o[rid] = { cross_kt: mx, gust_cross_kt: gx != null ? gx : mx }; return { t: h.hour, by_runway_end: o } }) }, meta)
        var dep = ap.departures || {}
        out.moves = { hours: (ap.hours || []).map(function (h) { return { t: h.hour, departures: h.departures_seen } }), source: dep.source, source_name: 'OpenSky Network', read_utc: dep.read, label: dep.label, note: dep.what }
        out.ana = ap.ana
      }
      return out
    })
  }

  box.classList.add('fm')
  box.innerHTML = '<p class="meta">Loading the flights map…</p>'
  Promise.all([get(IDX), get(BASE + A.base)]).then(function (r) {
    var idx = r[0], coast = r[1]
    if (idx.snapshots || idx.wind_hours) {
      // round 68: incident.flights@'s map files (3d3aec6) carry two areas; round 69: this map is A's
      var lis = function (x) { return !x.area || x.area === A.wind || x.area === A.snap }
      idx.snapshots = (idx.snapshots || []).filter(lis); idx.wind_hours = (idx.wind_hours || []).filter(lis)
      return Promise.all([idx.runways ? file(idx.runways) : null, idx.crosswind ? file(idx.crosswind) : null, idx.movements ? file(idx.movements) : null]).then(function (x) {
        var rw = x[0] && (Array.isArray(x[0]) ? x[0] : x[0].runways || []).filter(function (r) { return !r.airport || r.airport === A.icao })
        var by = function (f) { return f && f.hours_by_airport ? (f.hours_by_airport[A.icao] ? Object.assign({}, f, { hours: f.hours_by_airport[A.icao] }) : null) : f }
        var mv = by(x[2]), ana = x[2] && x[2].ana_day ? (x[2].ana_day.scheduled != null ? (A.icao === 'LPPT' ? x[2].ana_day : null) : x[2].ana_day[A.icao] || null) : null
        build(idx, coast, rw, by(x[1]), mv, ana)
      })
    }
    return normalise(idx).then(function (n) { build(n.idx, coast, n.runways, n.cross, n.moves, n.ana) })
  }).catch(function (e) { box.innerHTML = '<p class="meta">The flights map could not be read (' + esc(e.message) + ').</p>' })

  function build(idx, base, runways, cross, moves, ana) {
    // round 70 (Dinis ~23:38): a fuller base map, tracks, smooth playback, the list of aircraft, and "How is this worked out?"
    var bb = A.view, k = Math.cos((bb[1] + bb[3]) / 2 * Math.PI / 180), H = Math.round(W * (bb[3] - bb[1]) / ((bb[2] - bb[0]) * k))
    var X = function (lon) { return (lon - bb[0]) / (bb[2] - bb[0]) * W }, Y = function (lat) { return (bb[3] - lat) / (bb[3] - bb[1]) * H }
    var pl = function (l) { return l.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1) }).join(' ') }
    var inb = function (lon, lat) { return lon >= bb[0] && lon <= bb[2] && lat >= bb[1] && lat <= bb[3] }
    var snaps = (idx.snapshots || []).slice().sort(function (a, b) { return a.t < b.t ? -1 : 1 }), winds = (idx.wind_hours || []).slice().sort(function (a, b) { return a.t < b.t ? -1 : 1 })
    var seen = {}, times = snaps.map(function (s) { return s.t }).concat(winds.map(function (w) { return w.t })).filter(function (t) { return seen[t] ? false : (seen[t] = 1) }).sort()
    if (!times.length) { box.innerHTML = '<p class="meta">No snapshots yet.</p>'; return }
    var rw = Array.isArray(runways) ? runways : runways && runways.runways || []
    // the base map: Natural Earth land, urban areas, rivers, district lines, coast; a graticule; place labels; the runways (OurAirports)
    var svg = '<svg class="fm-map" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-labelledby="' + uid + '"><title id="' + uid + '">Map of ' + esc(A.name) + ': aircraft, their tracks and the wind</title>'
    svg += '<g class="fm-land">' + (base.land || []).map(function (r) { return '<polygon points="' + pl(r) + '"/>' }).join('') + '</g>'
    svg += '<g class="fm-urban">' + (base.urban || []).map(function (r) { return '<polygon points="' + pl(r) + '"/>' }).join('') + '</g>'
    svg += '<g class="fm-dist">' + (base.districts || []).map(function (l) { return '<polyline points="' + pl(l) + '"/>' }).join('') + '</g>'
    svg += '<g class="fm-river">' + (base.rivers || []).map(function (r) { return '<polyline points="' + pl(r.line) + '"><title>' + esc(r.name || 'river') + '</title></polyline>' }).join('') + '</g>'
    svg += '<g class="fm-coast">' + (base.coast || base.lines || []).map(function (l) { return '<polyline points="' + pl(l) + '"/>' }).join('') + '</g>'
    var gs = 0.25, gr = '<g class="fm-grat">'
    for (var gx = Math.ceil((bb[0] + 0.01) / gs) * gs; gx < bb[2]; gx += gs) gr += '<line x1="' + X(gx).toFixed(1) + '" x2="' + X(gx).toFixed(1) + '" y1="0" y2="' + H + '"/><text x="' + (X(gx) + 4).toFixed(1) + '" y="' + (H - 8) + '">' + Math.abs(gx).toFixed(2) + '°W</text>'
    for (var gy = Math.ceil((bb[1] + 0.01) / gs) * gs; gy < bb[3] - 0.08; gy += gs) gr += '<line y1="' + Y(gy).toFixed(1) + '" y2="' + Y(gy).toFixed(1) + '" x1="0" x2="' + W + '"/><text x="' + (W - 6) + '" y="' + (Y(gy) - 4).toFixed(1) + '" text-anchor="end">' + gy.toFixed(2) + '°N</text>'
    svg += gr + '</g>'
    svg += '<g class="fm-rw">' + rw.map(function (r) { var e = r.ends || []; if (e.length < 2) return ''; return '<line x1="' + X(e[0].lon).toFixed(1) + '" y1="' + Y(e[0].lat).toFixed(1) + '" x2="' + X(e[1].lon).toFixed(1) + '" y2="' + Y(e[1].lat).toFixed(1) + '"><title>Runway ' + esc(r.id) + (r.approx ? ' (drawn from its true heading and length at the airport\'s reference point; position approximate)' : '') + '</title></line>' }).join('') + '</g>'
    svg += '<g class="fm-towns">' + (base.places || []).filter(function (p) { return inb(p.lon, p.lat) }).map(function (p) { var left = p.lon > bb[2] - (bb[2] - bb[0]) * 0.25 || A.left && A.left.indexOf(p.name) >= 0
      return '<circle cx="' + X(p.lon).toFixed(1) + '" cy="' + Y(p.lat).toFixed(1) + '" r="5"/><text x="' + (X(p.lon) + (left ? -10 : 10)).toFixed(1) + '" y="' + (Y(p.lat) + 5).toFixed(1) + '"' + (left ? ' text-anchor="end"' : '') + '>' + esc(p.name) + '</text>' }).join('') + '</g>'
    if (rw[0] && rw[0].ends) { var a0 = rw[0].ends[1] || rw[0].ends[0]; svg += '<text class="fm-place" x="' + (X(a0.lon) + 14).toFixed(1) + '" y="' + (Y(a0.lat) - 6).toFixed(1) + '">' + esc(A.place) + '</text>' }
    var km10 = 10 / (111.32 * k) / (bb[2] - bb[0]) * W
    svg += '<g class="fm-scale"><rect x="12" y="' + (H - 94) + '" width="' + (km10 + 24).toFixed(1) + '" height="34" rx="3"/><line x1="24" y1="' + (H - 68) + '" x2="' + (24 + km10).toFixed(1) + '" y2="' + (H - 68) + '"/><line x1="24" x2="24" y1="' + (H - 74) + '" y2="' + (H - 62) + '"/><line x1="' + (24 + km10).toFixed(1) + '" x2="' + (24 + km10).toFixed(1) + '" y1="' + (H - 74) + '" y2="' + (H - 62) + '"/><text x="24" y="' + (H - 76) + '">10 km</text><text x="34" y="40" text-anchor="middle">N</text><path d="M34 48 l-9 20 h18 z"/></g>'
    svg += '<g class="fm-wind"></g><g class="fm-trails"></g><g class="fm-ac"></g></svg>'
    var t0 = times[0], t1 = times[times.length - 1]
    var ctl = '<div class="fm-ctl"><button type="button" class="fm-play"' + (reduce ? ' disabled title="Play is off because your system asks for reduced motion; use the slider"' : '') + '>▶ Play</button>'
      + '<label class="fm-t"><span class="sr">Time</span><input type="range" min="0" max="' + (times.length - 1) + '" step="1" value="' + (times.length - 1) + '" aria-valuetext=""></label>'
      + '<output class="fm-now"></output><button type="button" class="fm-how">How is this worked out?</button></div>'
    var key = '<ul class="fm-key"><li><svg width="22" height="14" aria-hidden="true"><circle class="fm-pt" cx="11" cy="7" r="3.5"/></svg> a measured position (adsb.lol)</li>'
      + '<li><svg width="30" height="14" aria-hidden="true"><line class="fm-join" x1="2" y1="7" x2="28" y2="7"/></svg> our straight line between two measured positions: not measured</li>'
      + '<li><svg width="18" height="18" aria-hidden="true"><path class="fm-k-m" transform="translate(9 9) scale(.7)" d="' + PLANE + '"/></svg> plane at a measured position · <svg width="18" height="18" aria-hidden="true"><path class="fm-k-i" transform="translate(9 9) scale(.7)" d="' + PLANE + '"/></svg> outlined: on our line between two</li></ul>'
    box.innerHTML = '<div class="fm-grid"><figure class="fm-fig">' + svg + ctl + key + '<figcaption class="fm-cap"></figcaption><div class="fm-item" aria-live="polite"></div>'
      + '<section class="fm-list"><h3>The aircraft we track here</h3><div class="wx-scroll" tabindex="0" role="region" aria-label="The aircraft, scrolls sideways"><table class="fm-ac-t"><thead><tr><th>Callsign</th><th>Airline</th><th>Type</th><th>Altitude (ft)</th><th>Speed (kt)</th><th>Heading</th><th>Phase</th><th>Last seen (UTC)</th></tr></thead><tbody></tbody></table></div><p class="meta">From the snapshots: callsign, airline (its ICAO code from the callsign), type, altitude, ground speed and track as adsb.lol gave them; phase from the reported vertical rate (climbing above +300 ft/min, descending below −300); last seen is the newest snapshot that had it. Pick a row to light its plane and track.</p></section></figure><div class="fm-side">'
      + '<section class="fm-xw"><h3>Crosswind by runway, hour by hour (kt)</h3><div class="wx-scroll fm-xw-c" tabindex="0" role="region" aria-label="Crosswind chart, scrolls sideways"></div>' + prov(cross) + '</section>'
      + (ana ? '<section class="fm-ana"><h3>' + esc(A.ana) + '</h3><p><span class="lbl">fact</span> ' + (ana.scope ? esc(ana.scope) + ': ' : '') + (ana.scheduled != null ? ana.scheduled + ' flights scheduled; ' : '') + (ana.cancelled_in_advance != null ? ana.cancelled_in_advance + ' cancelled in advance; ' : '') + (ana.cancelled_during_day != null ? ana.cancelled_during_day + ' cancelled during the day; ' : '') + (ana.operated != null ? ana.operated + ' operated' : '') + (ana.situation_at ? ', at ' + esc(hm(ana.situation_at)) + ' UTC on ' + esc(day(ana.situation_at)) : '') + '.</p><span class="prov"><a href="' + esc(ana.link) + '">ANA</a>' + (ana.published ? ' published ' + esc(hm(ana.published)) + ' UTC' : '') + (ana.read ? ', read ' + esc(hm(ana.read)) + ' UTC' : '') + '</span>' + (ana.note ? '<p class="meta">' + esc(ana.note) + '</p>' : '') + '</section>' : '')
      + '<section class="fm-mv"><h3>Departures seen by hour</h3><div class="wx-scroll fm-mv-c" tabindex="0" role="region" aria-label="Movements chart, scrolls sideways"></div>' + prov(moves) + '</section>'
      + '</div></div><details class="wx-table fm-tables"><summary>The tables</summary><div class="fm-tab"></div></details>'
    var mapEl = box.querySelector('.fm-map'), fit = function () { var w = mapEl.getBoundingClientRect().width; if (w) mapEl.style.setProperty('--fm-k', (W / w).toFixed(3)) }
    fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(mapEl); else addEventListener('resize', fit)
    var g = function (s) { return box.querySelector(s) }, range = g('.fm-t input'), out = g('.fm-now'), wl = g('.fm-wind'), tl = g('.fm-trails'), al = g('.fm-ac'), cap = g('.fm-cap'), item = g('.fm-item'), tb = g('.fm-ac-t tbody')
    var hours = (cross && cross.hours || []).map(function (h) { return h.t })
    drawCross(g('.fm-xw-c'), cross); drawMoves(g('.fm-mv-c'), moves); tables(g('.fm-tab'), cross, moves)
    g('.fm-how').addEventListener('click', function () { how(cross, rw) })

    // tracks: each aircraft's measured positions in time order, one per snapshot that had it (idx.tracks, when the flights files carry them, is read the same way)
    var tracks = {}, lastSnap = {}
    function addPoint(a, t, sd) { if (a.lat == null || a.lon == null) return; var id = a.id || a.callsign; if (!id) return
      var p = { t: Date.parse(t), at: t, lat: a.lat, lon: a.lon, track_deg: a.track_deg, alt_ft: a.alt_ft != null ? a.alt_ft : (a.geo_alt_m != null ? a.geo_alt_m * 3.28084 : null), gs_kt: a.gs_kt != null ? a.gs_kt : (a.ground_speed_ms != null ? a.ground_speed_ms * 1.94384 : null), vrate_fpm: a.vrate_fpm, on_ground: a.on_ground, callsign: a.callsign || id, airline: a.airline, type: a.type, sd: sd }
      ;(tracks[id] = tracks[id] || []).push(p) }
    var loaded = Promise.all(snaps.map(function (s) { return file(s.file).catch(function () { return null }) })).then(function (list) {
      list.forEach(function (sd, i) { if (!sd) return; lastSnap = sd; (sd.aircraft || []).forEach(function (a) { addPoint(a, sd.t || snaps[i].t, sd) }) })
      Object.keys(tracks).forEach(function (id) { tracks[id].sort(function (p, q) { return p.t - q.t }) })
    })
    var GAP = 15 * 60000, HOLD = 90000, TRAIL = 8
    function lerpAng(a, b, f) { var d = ((b - a + 540) % 360) - 180; return (a + d * f + 360) % 360 }
    function bearing(p, q) { var y = Math.sin((q.lon - p.lon) * Math.PI / 180) * Math.cos(q.lat * Math.PI / 180), x = Math.cos(p.lat * Math.PI / 180) * Math.sin(q.lat * Math.PI / 180) - Math.sin(p.lat * Math.PI / 180) * Math.cos(q.lat * Math.PI / 180) * Math.cos((q.lon - p.lon) * Math.PI / 180); return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360 }
    // where an aircraft is at time T: at a measured point (within 1 s, or held for 90 s after it), or on our straight line between two measured points no more than 15 minutes apart
    function at(tr, T) {
      var i = -1; for (var j = 0; j < tr.length && tr[j].t <= T + 1000; j++) i = j
      if (i < 0) return null
      var p = tr[i], q = tr[i + 1]
      if (Math.abs(T - p.t) <= 1000) return { p: p, i: i, lat: p.lat, lon: p.lon, hd: p.track_deg, measured: true }
      if (q && q.t - p.t <= GAP) { var f = (T - p.t) / (q.t - p.t), h0 = p.track_deg != null ? p.track_deg : bearing(p, q), h1 = q.track_deg != null ? q.track_deg : h0
        return { p: p, q: q, i: i, lat: p.lat + (q.lat - p.lat) * f, lon: p.lon + (q.lon - p.lon) * f, hd: lerpAng(h0, h1, f), measured: false } }
      if (T - p.t <= HOLD) return { p: p, i: i, lat: p.lat, lon: p.lon, hd: p.track_deg, measured: true, held: true }
      return null
    }
    function windAt(t) { var w = null; winds.forEach(function (x) { if (x.t <= t) w = x }); return w || winds[0] }
    function snapAt(T) { var best = null; snaps.forEach(function (s) { var d = T - Date.parse(s.t); if (d >= -1000 && d < 600000) best = s }); return best }
    function phase(p) { if (p.on_ground) return 'on the ground'; if (p.vrate_fpm == null) return ''; return p.vrate_fpm > 300 ? 'climbing' : p.vrate_fpm < -300 ? 'descending' : 'level' }
    var picked = null, curWind = null, here = [], lastT = null
    function render(T) {
      lastT = T
      var iso = new Date(T).toISOString(), ts = '', as = ''
      here = []
      Object.keys(tracks).forEach(function (id) { var tr = tracks[id], s = at(tr, T); if (!s || !inb(s.lon, s.lat)) return; here.push({ id: id, s: s, tr: tr })
        var on = picked === id, pts = tr.slice(Math.max(0, s.i - TRAIL + 1), s.i + 1).filter(function (p) { return T - p.t <= 45 * 60000 })
        if (pts.length || !s.measured) {
          var line = pts.map(function (p) { return [p.lon, p.lat] }); if (!s.measured) line.push([s.lon, s.lat])
          if (line.length > 1) ts += '<polyline class="fm-join' + (on ? ' on' : '') + '" points="' + pl(line) + '"/>'
          ts += pts.map(function (p) { return '<circle class="fm-pt' + (on ? ' on' : '') + '" cx="' + X(p.lon).toFixed(1) + '" cy="' + Y(p.lat).toFixed(1) + '" r="' + (on ? 5 : 3.5) + '"/>' }).join('')
        }
        var p = s.p, gnd = p.on_ground
        as += '<g class="fm-plane' + (s.measured ? '' : ' fm-between') + (gnd ? ' fm-gnd' : '') + (on ? ' on' : '') + '" data-id="' + esc(id) + '" tabindex="0" role="button" aria-label="' + esc((p.callsign || id) + ', ' + (gnd ? 'on the ground' : p.alt_ft != null ? Math.round(p.alt_ft) + ' ft' : 'altitude unknown') + (s.measured ? '' : ', between two measured positions')) + '" transform="translate(' + X(s.lon).toFixed(1) + ' ' + Y(s.lat).toFixed(1) + ') rotate(' + Math.round(s.hd || 0) + ') scale(' + (gnd ? 1.1 : 1.8) + ')"><path d="' + PLANE + '"/><circle r="13" class="fm-hit"/></g>'
      })
      tl.innerHTML = ts; al.innerHTML = as
      var w = windAt(iso)
      if (w !== curWind) { curWind = w; if (w) file(w.file).then(function (wd) { if (curWind !== w) return; drawWind(wd) }); else wl.innerHTML = '' }
    }
    function drawWind(wd) { var ws = ''
      ;(wd && wd.points || []).forEach(function (p) {
        if (!inb(p.lon, p.lat)) return
        var L = Math.min(64, 10 + (p.speed_kt || 0) * 1.1), ang = ((p.dir_from_deg || 0) + 180) % 360
        ws += '<g transform="translate(' + X(p.lon).toFixed(1) + ' ' + Y(p.lat).toFixed(1) + ') rotate(' + ang + ')"><line y1="' + (L / 2) + '" y2="' + (-L / 2) + '"/><path d="M0 ' + (-L / 2 - 2) + ' l-4 8 h8 z"/><title>Wind from ' + Math.round(p.dir_from_deg) + '°, ' + Math.round(p.speed_kt) + ' kt' + (p.gust_kt ? ', gusts ' + Math.round(p.gust_kt) + ' kt' : '') + ' (model)</title></g>'
      })
      wl.innerHTML = ws; wl._wd = wd; caption() }
    function caption() {
      var T = lastT, sn = snapAt(T), wd = wl._wd, n = here.filter(function (h) { return !h.s.p.on_ground }).length, nb = here.filter(function (h) { return !h.s.measured }).length, sd = sn ? lastSnapFor(sn) : null
      cap.innerHTML = (sn || here.length ? n + ' airline aircraft in the air in this box' + (nb ? ' (' + nb + ' drawn between two measured positions)' : '') + ' at ' + esc(hm(new Date(T).toISOString())) + ' UTC. Aircraft: <a href="https://adsb.lol/">adsb.lol</a>, <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a>. ' + (sd ? prov(sd) : '') : 'No aircraft positions for ' + esc(day(new Date(T).toISOString()) + ' ' + hm(new Date(T).toISOString())) + ' UTC yet: our snapshots begin ' + (snaps.length ? esc(day(snaps[0].t) + ' ' + hm(snaps[0].t)) + ' UTC' : 'soon') + ', and adsb.lol\'s history archive for 11 November is expected on 12 November.')
        + (wd ? '<br>Wind arrows: ' + esc(wd.model || 'model') + (wd.forecast === true ? ' (forecast)' : wd.forecast === false ? ' (model analysis)' : '') + ' for ' + esc(hm(wd.t)) + ' UTC, pointing where the wind goes; longer is stronger ' + prov(wd) : '')
        + '<br>Base map: Natural Earth (public domain); runways: OurAirports (public domain); place labels approximate.'
    }
    var snapCache = {}; function lastSnapFor(s) { return snapCache[s.file] || null }
    function list() {
      var rows = here.slice().sort(function (a, b) { return String(a.s.p.callsign).localeCompare(String(b.s.p.callsign)) }).map(function (h) { var p = h.s.p, last = h.tr.filter(function (x) { return x.t <= lastT + 1000 }).pop() || p
        return '<tr data-id="' + esc(h.id) + '" tabindex="0"' + (picked === h.id ? ' class="on" aria-selected="true"' : '') + '><td>' + esc(p.callsign || h.id) + '</td><td>' + esc(p.airline || '') + '</td><td>' + esc(p.type || '') + '</td><td>' + (p.on_ground ? '' : p.alt_ft != null ? Math.round(p.alt_ft).toLocaleString('en-GB') : '') + '</td><td>' + (p.gs_kt != null ? Math.round(p.gs_kt) : '') + '</td><td>' + (p.track_deg != null ? Math.round(p.track_deg) + '°' : '') + '</td><td>' + esc(phase(p)) + '</td><td>' + esc(hm(last.at)) + (h.s.measured ? '' : ' <span class="fm-tag">between</span>') + '</td></tr>' }).join('')
      tb.innerHTML = rows || '<tr><td colspan="8" class="meta">No aircraft in this box at this time.</td></tr>'
    }
    function details(id) { var tr = tracks[id]; if (!tr) return; var s = here.filter(function (h) { return h.id === id })[0], p = s ? s.s.p : tr[tr.length - 1]
      var txt = (p.callsign || id) + (p.type ? ' (' + p.type + ')' : '') + ': ' + (p.on_ground ? 'on the ground, ' : p.alt_ft != null ? Math.round(p.alt_ft) + ' ft, ' : '') + (p.gs_kt != null ? Math.round(p.gs_kt) + ' kt, ' : '') + 'track ' + Math.round(p.track_deg || 0) + '°, measured at ' + hm(p.at) + ' UTC'
      item.textContent = txt
      if (window.stormPanel && stormPanel.show) stormPanel.show({ title: p.callsign || id, html: '<p><span class="lbl">fact</span> ' + esc(txt) + (phase(p) ? '; ' + esc(phase(p)) : '') + '.</p><p>' + tr.length + ' measured position' + (tr.length === 1 ? '' : 's') + ' in our snapshots, ' + esc(hm(tr[0].at)) + ' to ' + esc(hm(tr[tr.length - 1].at)) + ' UTC' + (p.airline ? '; airline code ' + esc(p.airline) : '') + '.</p>' + (s && !s.s.measured ? '<p><span class="lbl l-hypothesis">our line</span> At this moment it is drawn on a straight line between its measured positions at ' + esc(hm(s.s.p.at)) + ' and ' + esc(hm(s.s.q.at)) + ' UTC: not a measurement.</p>' : '') + '<p class="pn-meta">Positions: adsb.lol (ODbL), read at each snapshot.</p>' })
    }
    function pick(id, open) { picked = picked === id && !open ? null : id; render(lastT); list(); if (open && picked) details(id) }
    al.addEventListener('click', function (e) { var el = e.target.closest('.fm-plane'); if (el) pick(el.getAttribute('data-id'), true) })
    al.addEventListener('keydown', function (e) { var el = e.target.closest('.fm-plane'); if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(el.getAttribute('data-id'), true) } })
    tb.addEventListener('click', function (e) { var r = e.target.closest('tr[data-id]'); if (r) pick(r.getAttribute('data-id'), false) })
    tb.addEventListener('keydown', function (e) { var r = e.target.closest('tr[data-id]'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(r.getAttribute('data-id'), false) } })
    function stamp(T) { var s = new Date(T).toISOString(); out.textContent = day(s) + ' ' + hm(s) + ' UTC'; range.setAttribute('aria-valuetext', out.textContent) }
    function show(i) {
      var t = times[i], T = Date.parse(t); stamp(T)
      try { history.replaceState(null, '', '#t=' + t.slice(0, 16) + 'Z') } catch (e) { }
      loaded.then(function () { var sn = snapAt(T); (sn ? file(sn.file) : Promise.resolve(null)).then(function (sd) { if (sn && sd) snapCache[sn.file] = sd; render(T); list(); caption() }) })
      box.querySelectorAll('.fm-nowline').forEach(function (l) { var hi = hours.indexOf(t.slice(0, 13) + ':00:00Z'); l.style.display = hi < 0 ? 'none' : ''; if (hi >= 0) { var xx = +l.getAttribute('data-x0') + hi * +l.getAttribute('data-step'); l.setAttribute('x1', xx); l.setAttribute('x2', xx) } })
    }
    range.addEventListener('input', function () { stop(); show(+range.value) })
    // smooth play: time runs between one step and the next over 900 ms (an hour-long gap between wind steps takes the same), the planes moving on their lines
    var raf = null, play = g('.fm-play'), STEP = 900
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; play.textContent = '▶ Play' }
    play.addEventListener('click', function () {
      if (raf) { stop(); return }
      if (+range.value >= times.length - 1) range.value = 0
      play.textContent = '❚❚ Pause'
      var i = +range.value, s0 = performance.now()
      loaded.then(function () { (function tick(now) {
        var f = Math.min(1, (now - s0) / STEP), a = Date.parse(times[i]), b = Date.parse(times[i + 1]), T = a + (b - a) * f
        render(T); stamp(T)
        if (f >= 1) { i++; range.value = i; show(i); s0 = now; if (i >= times.length - 1) { stop(); return } }
        raf = requestAnimationFrame(tick)
      })(performance.now()) })
    })
    var nowIso = new Date().toISOString(), m = location.hash.match(/t=([0-9T:-]+)Z?/), start = 0
    times.forEach(function (t, i) { if (t <= nowIso) start = i }); if (snaps.length) start = times.indexOf(snaps[snaps.length - 1].t)
    if (m) times.forEach(function (t, i) { if (t.slice(0, 16) <= m[1].slice(0, 16)) start = i })
    range.value = start; show(start)
  }
  // "How is this worked out?": a top-down diagram in the reader's panel. Read from flights/how.json when incident.flights@ writes it
  // (steps in order, each with a label, what it does and its source); until then from what the files above already say.
  function how(cross, rw) {
    var worked = workedExample(cross, rw)
    file('how.json').catch(function () { return null }).then(function (h) {
      var chains = h && (h.chains || (h.steps ? [{ title: h.title || 'Aircraft', steps: h.steps }] : null)) || [
        { title: 'Aircraft on the map', steps: [
          { label: 'adsb.lol receivers', what: 'volunteers\' receivers pick up the position each aircraft broadcasts (ADS-B)', source: 'https://adsb.lol/', kind: 'fact' },
          { label: 'Our poll', what: 'we ask adsb.lol for every aircraft within a radius of the airport, on a schedule' },
          { label: 'Airline filter', what: 'only airline callsigns are kept; private and other aircraft are dropped' },
          { label: 'Snapshots', what: 'one file per poll: each aircraft\'s position, altitude, speed and track at that moment' },
          { label: 'Tracks', what: 'the same aircraft across snapshots, in time order: the dots on the map' },
          { label: 'The map', what: 'a filled plane at a measured position; while playing, an outlined plane on our straight line between two measured positions (not measured)', kind: 'hypothesis' } ] },
        { title: 'Wind arrows', steps: [
          { label: 'Open-Meteo', what: 'a weather model\'s wind at 10 m on a 0.25° grid, hour by hour (analysis, then forecast)', source: 'https://open-meteo.com/', kind: 'evidence' },
          { label: 'Arrows', what: 'one per grid point, pointing where the wind goes; longer is stronger' } ] },
        { title: 'Crosswind', steps: [
          { label: 'METAR', what: 'the airport\'s own weather report: wind direction, speed and gusts', source: 'https://aviationweather.gov/', kind: 'fact' },
          { label: 'Runway heading', what: 'each runway end\'s true heading (OurAirports)', source: 'https://ourairports.com/', kind: 'fact' },
          { label: 'Arithmetic', what: 'crosswind = wind × sin(angle between wind and runway); headwind = wind × cos(same angle)' } ] } ]
      var html = '<p class="pn-meta">From the sources, top to bottom. Not a warning service: your airline decides whether your flight runs.</p>' + chains.map(function (c) {
        return '<div class="fm-how-c"><h4>' + esc(c.title) + '</h4><ol class="fm-flow">' + (c.steps || []).map(function (s) {
          var k = s.kind || s.label_kind
          return '<li' + (k === 'hypothesis' ? ' class="hyp"' : '') + '><b>' + esc(s.label || s.name || s.title) + '</b>' + (k ? ' <span class="lbl' + (k === 'hypothesis' ? ' l-hypothesis' : '') + '">' + esc(k === 'hypothesis' ? 'our drawing' : k) + '</span>' : '') + '<span>' + esc(s.what || s.text || s.about || '') + '</span>' + (s.source ? '<a href="' + esc(s.source) + '">' + esc(String(s.source).replace(/^https?:\/\/(www\.)?/, '').split('/')[0]) + '</a>' : '') + '</li>'
        }).join('') + '</ol></div>' }).join('') + worked + (h ? '<p class="pn-meta">Steps from <a href="' + esc(DIR + 'how.json') + '">how.json</a>' + (h.updated ? ', ' + esc(hm(h.updated)) + ' UTC' : '') + '.</p>' : '')
      if (window.stormPanel && stormPanel.show) stormPanel.show({ title: 'How is this worked out?', html: html })
    })
  }
  function workedExample(cross, rw) {
    var hrs = cross && cross.hours || [], h = hrs.filter(function (x) { return /T14:00/.test(x.t) && x.wind_dir != null && x.wind_kt }).pop(); if (!h || !rw[0]) return ''
    var e = (rw[0].ends || []).filter(function (x) { return x.heading_deg != null })[0]; if (!e) return ''
    var ang = ((h.wind_dir - e.heading_deg) % 360 + 360) % 360, rad = ang * Math.PI / 180, c = h.wind_kt * Math.sin(rad), hw = h.wind_kt * Math.cos(rad), f = h.by_runway_end && h.by_runway_end[e.name] || {}
    var r1 = function (v) { return (Math.round(v * 10) / 10).toFixed(1) }
    return '<div class="fm-how-c fm-worked"><h4>Worked: ' + esc(hm(h.t)) + ' UTC on ' + esc(day(h.t)) + ', runway ' + esc(e.name) + '</h4><ol class="fm-flow">'
      + '<li><b>METAR</b> <span class="lbl">fact</span><span>wind from ' + h.wind_dir + '° at ' + h.wind_kt + ' kt' + (h.gust_kt ? ', gusting ' + h.gust_kt + ' kt' : '') + '</span></li>'
      + '<li><b>Runway ' + esc(e.name) + '</b> <span class="lbl">fact</span><span>heads ' + e.heading_deg + '° true</span></li>'
      + '<li><b>Angle</b><span>' + h.wind_dir + '° − ' + e.heading_deg + '° = ' + r1(ang) + '°</span></li>'
      + '<li><b>Crosswind</b><span>' + h.wind_kt + ' × sin ' + r1(ang) + '° = ' + r1(Math.abs(c)) + ' kt</span></li>'
      + '<li><b>Headwind</b><span>' + h.wind_kt + ' × cos ' + r1(ang) + '° = ' + r1(hw) + ' kt' + (hw < 0 ? ' (negative: a tailwind of ' + r1(-hw) + ' kt)' : '') + '</span></li>'
      + (f.cross_kt != null ? '<li><b>In the file</b><span>crosswind ' + f.cross_kt + ' kt, headwind ' + f.head_kt + ' kt' + (f.gust_cross_kt != null ? '; in the gusts ' + f.gust_cross_kt + ' kt across' : '') + '</span></li>' : '')
      + '</ol><p class="pn-meta">Arithmetic on the report, not the airport\'s or an airline\'s limits.</p></div>'
  }

  function axisHours(hrs, x, y0) { return hrs.map(function (h, i) { return (i % 3 === 0) ? '<text class="count" x="' + x(i).toFixed(1) + '" y="' + y0 + '" text-anchor="middle">' + (h.slice(11, 13) === '00' ? day(h) + ' ' : '') + h.slice(11, 13) + '</text>' : '' }).join('') }
  function drawCross(el, cross) {
    var hrs = cross && cross.hours || []; if (!hrs.length) { el.innerHTML = '<p class="meta">No crosswind file yet.</p>'; return }
    var all = Object.keys((hrs.filter(function (h) { return h.by_runway_end })[0] || {}).by_runway_end || {}), ends = [], name = {}
    all.forEach(function (e) { if (e.indexOf('/') > 0) { ends.push(e); name[e] = e; return } var r = String((+e.replace(/\D/g, '') + 18 - 1) % 36 + 1).padStart(2, '0'); if (ends.some(function (p) { return p.replace(/\D/g, '') === r })) return; ends.push(e); name[e] = all.some(function (q) { return q.replace(/\D/g, '') === r }) ? (e < r ? e + '/' + r : r + '/' + e) : e })
    var n = hrs.length, L = 40, R = 52, T = 10, B = 26, Hh = 180, w = Math.max(420, L + R + n * 18)
    var max = 0; hrs.forEach(function (h) { ends.forEach(function (e) { var v = (h.by_runway_end || {})[e] || {}; max = Math.max(max, Math.abs(v.cross_kt || 0), Math.abs(v.gust_cross_kt || 0)) }) })
    var top = Math.max(10, Math.ceil(max / 10) * 10), step = (w - L - R) / Math.max(1, n - 1), x = function (i) { return L + i * step }, y = function (v) { return T + Hh - Math.abs(v) / top * Hh }
    var s = '<svg class="wx-chart fm-chart" viewBox="0 0 ' + w + ' ' + (T + Hh + B) + '" style="min-width:' + w + 'px" role="img" aria-label="Crosswind in knots by runway end and hour">'
    for (var v = 0; v <= top; v += 10) s += '<line class="grid" x1="' + L + '" x2="' + (w - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="count" x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>'
        ends.forEach(function (e, j) {
      var pts = hrs.map(function (h, i) { var v = (h.by_runway_end || {})[e] || {}; return x(i).toFixed(1) + ',' + y(v.cross_kt || 0).toFixed(1) }).join(' ')
      var gs = hrs.map(function (h, i) { var v = (h.by_runway_end || {})[e] || {}; return x(i).toFixed(1) + ',' + y(v.gust_cross_kt != null ? v.gust_cross_kt : v.cross_kt || 0).toFixed(1) }).join(' ')
      s += '<polyline class="fm-l fm-l' + (j % 4) + '" points="' + pts + '"/><polyline class="fm-l fm-gust fm-l' + (j % 4) + '" points="' + gs + '"/>'
      var last = (hrs[n - 1].by_runway_end || {})[e] || {}; s += '<text class="fm-end" x="' + (x(n - 1) + 4) + '" y="' + (y(last.cross_kt || 0) + 4) + '">' + esc(name[e]) + '</text>'
    })
    s += '<line class="fm-nowline" data-x0="' + L + '" data-step="' + step + '" y1="' + T + '" y2="' + (T + Hh) + '"/>' + axisHours(hrs.map(function (h) { return h.t }), x, T + Hh + 16) + '</svg>'
    el.innerHTML = s + '<p class="meta">Solid: the crosswind in the hour\'s strongest report; dashed: in its gusts. One line per runway (both ends feel the same crosswind), named at its right end. From the airport\'s own reports (METAR), resolved on the runway; not the airport\'s or an airline\'s limits.</p>'
  }
  function drawMoves(el, moves) {
    var hrs = moves && moves.hours || []; if (!hrs.length) { el.innerHTML = '<p class="meta">No movements file yet.</p>'; return }
    var n = hrs.length, L = 40, R = 8, T = 10, B = 26, Hh = 150, cw = 18, w = Math.max(420, L + R + n * cw)
    var hasC = hrs.some(function (h) { return h.cancellations != null }), max = Math.max.apply(null, hrs.map(function (h) { return Math.max(h.departures || 0, h.cancellations || 0) })) || 1
    var top = Math.ceil(max / 5) * 5, y = function (v) { return T + Hh - v / top * Hh }, x = function (i) { return L + i * ((w - L - R) / n) + ((w - L - R) / n) / 2 }
    var bw = hasC ? ((w - L - R) / n - 4) / 2 : Math.min(14, (w - L - R) / n - 4)
    var s = '<svg class="wx-chart fm-chart" viewBox="0 0 ' + w + ' ' + (T + Hh + B) + '" style="min-width:' + w + 'px" role="img" aria-label="Departures and cancellations by hour">'
    for (var v = 0; v <= top; v += Math.max(1, top / 5)) s += '<line class="grid" x1="' + L + '" x2="' + (w - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="count" x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + Math.round(v) + '</text>'
    hrs.forEach(function (h, i) {
      var d = h.departures || 0, c = h.cancellations || 0
      if (h.departures == null) { s += '<text class="count fm-nc" x="' + x(i).toFixed(1) + '" y="' + (y(0) - 4) + '" text-anchor="middle">·</text>'; return }
      s += '<rect class="fm-dep" x="' + (hasC ? x(i) - bw - 1 : x(i) - bw / 2).toFixed(1) + '" width="' + bw.toFixed(1) + '" y="' + y(d).toFixed(1) + '" height="' + (y(0) - y(d)).toFixed(1) + '"><title>' + hm(h.t) + ' UTC: ' + d + ' departures</title></rect>'
      if (hasC) s += '<rect class="fm-can" x="' + (x(i) + 1).toFixed(1) + '" width="' + bw.toFixed(1) + '" y="' + y(c).toFixed(1) + '" height="' + (y(0) - y(c)).toFixed(1) + '"><title>' + hm(h.t) + ' UTC: ' + c + ' cancellations</title></rect>'
    })
    s += axisHours(hrs.map(function (h) { return h.t }), x, T + Hh + 16) + '</svg>'
    el.innerHTML = '<ul class="wx-legend fm-legend"><li><svg width="14" height="14" aria-hidden="true"><rect class="fm-dep" width="14" height="14"/></svg> Departures' + (hasC ? ' (left bar)' : '') + '</li>' + (hasC ? '<li><svg width="14" height="14" aria-hidden="true"><rect class="fm-can" width="14" height="14"/></svg> Cancellations (right bar, outlined)</li>' : '') + '<li>· an hour the source did not cover</li></ul>' + s + (moves.note ? '<p class="meta">' + esc(moves.note) + '</p>' : '')
  }
  function tables(el, cross, moves) {
    var h = ''
    if (cross && cross.hours && cross.hours.length) { var ends = Object.keys((cross.hours.filter(function (h) { return h.by_runway_end })[0] || {}).by_runway_end || {})
      h += '<table><caption>Crosswind, kt (mean / in gusts)</caption><thead><tr><th>Hour (UTC)</th>' + ends.map(function (e) { return '<th>' + esc(e) + '</th>' }).join('') + '</tr></thead><tbody>' + cross.hours.map(function (r) { return '<tr><td>' + esc(r.t.slice(0, 16).replace('T', ' ')) + '</td>' + ends.map(function (e) { var v = (r.by_runway_end || {})[e] || {}; return '<td>' + (v.cross_kt != null ? Math.round(v.cross_kt) : '') + ' / ' + (v.gust_cross_kt != null ? Math.round(v.gust_cross_kt) : '') + '</td>' }).join('') + '</tr>' }).join('') + '</tbody></table>' }
    if (moves && moves.hours && moves.hours.length) h += '<table><caption>Departures and cancellations</caption><thead><tr><th>Hour (UTC)</th><th>Departures</th><th>Cancellations</th></tr></thead><tbody>' + moves.hours.map(function (r) { return '<tr><td>' + esc(r.t.slice(0, 16).replace('T', ' ')) + '</td><td>' + (r.departures != null ? r.departures : '') + '</td><td>' + (r.cancellations != null ? r.cancellations : '') + '</td></tr>' }).join('') + '</tbody></table>'
    el.innerHTML = h || '<p class="meta">No tables yet.</p>'
  }
  }
})()
