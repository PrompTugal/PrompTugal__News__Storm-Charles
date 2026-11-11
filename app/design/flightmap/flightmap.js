// The flights map: aircraft over the Lisbon area with the wind on top, a time control over the snapshots, crosswind by runway end and
// departures and cancellations by hour (incident.designer@web-summit.dinis, design/round-65.md, round-66.md). Data: incident.flights@'s
// files under incidents/<id>/data/flights/ (index.json names them). Base map: coast.json beside this file (Natural Earth, public domain).
// A page mounts it with <div data-flightmap="<path to the flights index.json>"></div>; frame.js loads this file only there.
// No colour is written here (tokens in app/site.css); no outside request; not a warning service: it shows what the sources said.
(function () {
  var box = document.querySelector('[data-flightmap]'); if (!box) return
  var me = document.currentScript && document.currentScript.src || ''
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
  var LPPT = { lat: 38.7742, lon: -9.1342 }  /* the aerodrome reference point, rounded (AIP Portugal, LPPT AD 2.2) */
  function normalise(idx) {
    var fs = idx.files || [], winds = fs.filter(function (f) { return f.kind === 'wind-field' && (!f.covers || f.covers.area === 'lisbon') }), sn = fs.filter(function (f) { return f.kind === 'aircraft-snapshots' }), cw = fs.filter(function (f) { return f.kind === 'crosswind' })[0]
    return Promise.all([cw ? file(cw.path) : null, Promise.all(winds.map(function (f) { return file(f.path) })), Promise.all(sn.map(function (f) { return file(f.path) }))]).then(function (r) {
      var c = r[0], ap = c && (c.airports || []).filter(function (a) { return a.icao === 'LPPT' })[0], out = { idx: { snapshots: [], wind_hours: [] } }
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
        if (x.area !== 'lisbon' || !x.time) return
        var key = 'snap:' + fi + ':' + si
        cache[key] = Promise.resolve({ t: x.time, source: 'https://opensky-network.org/', source_name: 'OpenSky Network', licence: 'research and non-commercial use', label: f.label, read_utc: x.time,
          aircraft: (x.aircraft || []).map(function (a) { var m = a.geo_alt_m != null ? a.geo_alt_m : a.baro_alt_m; return { id: a.callsign, callsign: a.callsign, lat: a.lat, lon: a.lon, track_deg: a.track_deg, alt_ft: m != null ? m * 3.28084 : null, gs_kt: a.ground_speed_ms != null ? a.ground_speed_ms * 1.94384 : null, on_ground: a.on_ground } }) })
        out.idx.snapshots.push({ t: x.time, file: key })
      }) })
      if (ap) {
        out.runways = (ap.runways || []).map(function (rw) { var e = rw.ends || [], hd = (e[0] && e[0].heading_true || 0) * Math.PI / 180, half = (rw.length_m || 3000) / 2 / 1000, dlat = Math.cos(hd) * half / 111.32, dlon = Math.sin(hd) * half / (111.32 * Math.cos(LPPT.lat * Math.PI / 180))
          return { id: rw.runway, approx: true, ends: [{ name: e[0] && e[0].end, lat: LPPT.lat - dlat, lon: LPPT.lon - dlon }, { name: e[1] && e[1].end, lat: LPPT.lat + dlat, lon: LPPT.lon + dlon }] } })
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
  Promise.all([get(IDX), get(BASE + 'coast.json')]).then(function (r) {
    var idx = r[0], coast = r[1]
    if (idx.snapshots || idx.wind_hours) return Promise.all([idx.runways ? file(idx.runways) : null, idx.crosswind ? file(idx.crosswind) : null, idx.movements ? file(idx.movements) : null]).then(function (x) { build(idx, coast, x[0], x[1], x[2]) })
    return normalise(idx).then(function (n) { build(n.idx, coast, n.runways, n.cross, n.moves, n.ana) })
  }).catch(function (e) { box.innerHTML = '<p class="meta">The flights map could not be read (' + esc(e.message) + ').</p>' })

  function build(idx, coast, runways, cross, moves, ana) {
    var bb = coast.bbox, k = Math.cos((bb[1] + bb[3]) / 2 * Math.PI / 180), H = Math.round(W * (bb[3] - bb[1]) / ((bb[2] - bb[0]) * k))
    var X = function (lon) { return (lon - bb[0]) / (bb[2] - bb[0]) * W }, Y = function (lat) { return (bb[3] - lat) / (bb[3] - bb[1]) * H }
    var snaps = (idx.snapshots || []).slice().sort(function (a, b) { return a.t < b.t ? -1 : 1 }), winds = (idx.wind_hours || []).slice().sort(function (a, b) { return a.t < b.t ? -1 : 1 })
    var seen = {}, times = snaps.map(function (s) { return s.t }).concat(winds.map(function (w) { return w.t })).filter(function (t) { return seen[t] ? false : (seen[t] = 1) }).sort()
    if (!times.length) { box.innerHTML = '<p class="meta">No snapshots yet.</p>'; return }
    var rw = Array.isArray(runways) ? runways : runways && runways.runways || []
    var svg = '<svg class="fm-map" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-labelledby="fm-title"><title id="fm-title">Map of the Lisbon area: aircraft and the wind</title>'
    svg += '<g class="fm-coast">' + coast.lines.map(function (l) { return '<polyline points="' + l.map(function (p) { return X(p[0]).toFixed(1) + ',' + Y(p[1]).toFixed(1) }).join(' ') + '"/>' }).join('') + '</g>'
    svg += '<g class="fm-rw">' + rw.map(function (r) { var e = r.ends || []; if (e.length < 2) return ''; return '<line x1="' + X(e[0].lon).toFixed(1) + '" y1="' + Y(e[0].lat).toFixed(1) + '" x2="' + X(e[1].lon).toFixed(1) + '" y2="' + Y(e[1].lat).toFixed(1) + '"><title>Runway ' + esc(r.id) + (r.approx ? ' (drawn from its true heading and length at the airport\'s reference point; position approximate)' : '') + '</title></line>' }).join('') + '</g>'
    if (rw[0] && rw[0].ends) { var a = rw[0].ends[0]; svg += '<text class="fm-place" x="' + (X(a.lon) + 14).toFixed(1) + '" y="' + (Y(a.lat) + 4).toFixed(1) + '">Lisbon airport (LPPT)</text>' }
    var km10 = 10 / (111.32 * k) / (bb[2] - bb[0]) * W
    svg += '<g class="fm-scale"><line x1="20" y1="' + (H - 20) + '" x2="' + (20 + km10).toFixed(1) + '" y2="' + (H - 20) + '"/><text x="20" y="' + (H - 32) + '">10 km</text><text x="' + (W - 34) + '" y="40" text-anchor="middle">N</text><path d="M' + (W - 34) + ' 48 l-9 20 h18 z"/></g>'
    svg += '<g class="fm-wind"></g><g class="fm-ac"></g></svg>'
    var t0 = times[0], t1 = times[times.length - 1]
    var ctl = '<div class="fm-ctl"><button type="button" class="fm-play"' + (reduce ? ' disabled title="Play is off because your system asks for reduced motion; use the slider"' : '') + '>▶ Play</button>'
      + '<label class="fm-t"><span class="sr">Time</span><input type="range" min="0" max="' + (times.length - 1) + '" step="1" value="' + (times.length - 1) + '" aria-valuetext=""></label>'
      + '<output class="fm-now"></output></div>'
    box.innerHTML = '<div class="fm-grid"><figure class="fm-fig">' + svg + ctl + '<figcaption class="fm-cap"></figcaption><div class="fm-item" aria-live="polite"></div></figure><div class="fm-side">'
      + '<section class="fm-xw"><h3>Crosswind by runway, hour by hour (kt)</h3><div class="wx-scroll fm-xw-c" tabindex="0" role="region" aria-label="Crosswind chart, scrolls sideways"></div>' + prov(cross) + '</section>'
      + (ana ? '<section class="fm-ana"><h3>ANA, Lisbon airport</h3><p><span class="lbl">fact</span> ' + (ana.scheduled != null ? ana.scheduled + ' flights scheduled; ' : '') + (ana.cancelled_in_advance != null ? ana.cancelled_in_advance + ' cancelled in advance; ' : '') + (ana.cancelled_during_day != null ? ana.cancelled_during_day + ' cancelled during the day; ' : '') + (ana.operated != null ? ana.operated + ' operated' : '') + (ana.situation_at ? ', at ' + esc(hm(ana.situation_at)) + ' UTC on ' + esc(day(ana.situation_at)) : '') + '.</p><span class="prov"><a href="' + esc(ana.link) + '">ANA</a>' + (ana.published ? ' published ' + esc(hm(ana.published)) + ' UTC' : '') + (ana.read ? ', read ' + esc(hm(ana.read)) + ' UTC' : '') + '</span>' + (ana.note ? '<p class="meta">' + esc(ana.note) + '</p>' : '') + '</section>' : '')
      + '<section class="fm-mv"><h3>Departures seen by hour</h3><div class="wx-scroll fm-mv-c" tabindex="0" role="region" aria-label="Movements chart, scrolls sideways"></div>' + prov(moves) + '</section>'
      + '</div></div><details class="wx-table fm-tables"><summary>The tables</summary><div class="fm-tab"></div></details>'
    var mapEl = box.querySelector('.fm-map'), fit = function () { var w = mapEl.getBoundingClientRect().width; if (w) mapEl.style.setProperty('--fm-k', (W / w).toFixed(3)) }
    fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(mapEl); else addEventListener('resize', fit)
    var g = function (s) { return box.querySelector(s) }, range = g('.fm-t input'), out = g('.fm-now'), wl = g('.fm-wind'), al = g('.fm-ac'), cap = g('.fm-cap'), item = g('.fm-item')
    var hours = (cross && cross.hours || []).map(function (h) { return h.t })
    var mh = (moves && moves.hours || [])
    drawCross(g('.fm-xw-c'), cross); drawMoves(g('.fm-mv-c'), moves); tables(g('.fm-tab'), cross, moves)

    function windAt(t) { var w = null; winds.forEach(function (x) { if (x.t <= t) w = x }); return w || winds[0] }
    function snapAt(i) { var t = Date.parse(times[i]), best = null; snaps.forEach(function (s) { var d = t - Date.parse(s.t); if (d >= 0 && d < 600000) best = s }); return best }
    var seq = 0, picked = null
    function show(i) {
      var t = times[i], my = ++seq; out.textContent = day(t) + ' ' + hm(t) + ' UTC'; range.setAttribute('aria-valuetext', out.textContent)
      try { history.replaceState(null, '', '#t=' + t.slice(0, 16) + 'Z') } catch (e) { }
      var w = windAt(t), s = snapAt(i)
      Promise.all([w ? file(w.file) : null, s ? file(s.file) : null]).then(function (r) {
        if (my !== seq) return
        var wd = r[0], sd = r[1], ws = '', as = ''
        ;(wd && wd.points || []).forEach(function (p) {
          if (p.lon < bb[0] || p.lon > bb[2] || p.lat < bb[1] || p.lat > bb[3]) return
          var L = Math.min(64, 10 + (p.speed_kt || 0) * 1.1), ang = ((p.dir_from_deg || 0) + 180) % 360
          ws += '<g transform="translate(' + X(p.lon).toFixed(1) + ' ' + Y(p.lat).toFixed(1) + ') rotate(' + ang + ')"><line y1="' + (L / 2) + '" y2="' + (-L / 2) + '"/><path d="M0 ' + (-L / 2 - 2) + ' l-4 8 h8 z"/><title>Wind from ' + Math.round(p.dir_from_deg) + '°, ' + Math.round(p.speed_kt) + ' kt' + (p.gust_kt ? ', gusts ' + Math.round(p.gust_kt) + ' kt' : '') + ' (model)</title></g>'
        })
        wl.innerHTML = ws
        ;(sd && sd.aircraft || []).forEach(function (a) {
          if (a.on_ground || a.lon < bb[0] || a.lon > bb[2] || a.lat < bb[1] || a.lat > bb[3]) return
          as += '<g class="fm-plane' + (picked === a.id ? ' on' : '') + '" data-id="' + esc(a.id) + '" tabindex="0" role="button" aria-label="' + esc((a.callsign || a.id) + ', ' + (a.alt_ft != null ? Math.round(a.alt_ft) + ' ft' : 'altitude unknown')) + '" transform="translate(' + X(a.lon).toFixed(1) + ' ' + Y(a.lat).toFixed(1) + ') rotate(' + (a.track_deg || 0) + ') scale(1.8)"><path d="M0 -11 L2 -3 L10 2 L10 4 L2 2 L1.5 8 L4 10 L4 11.5 L0 10.5 L-4 11.5 L-4 10 L-1.5 8 L-2 2 L-10 4 L-10 2 L-2 -3 Z"/><circle r="13" class="fm-hit"/></g>'
        })
        al.innerHTML = as
        var n = al.children.length
        cap.innerHTML = (sd ? n + ' airline aircraft in the air in this box at ' + esc(hm(sd.t)) + ' UTC ' + prov(sd) : 'No aircraft positions for ' + esc(day(t) + ' ' + hm(t)) + ' UTC' + (snaps.length ? ': snapshots begin ' + esc(day(snaps[0].t) + ' ' + hm(snaps[0].t)) + ' UTC (OpenSky keeps no history for anonymous reads)' : '')) + (wd ? '<br>Wind arrows: ' + esc(wd.model || 'model') + ' for ' + esc(hm(wd.t)) + ' UTC, pointing where the wind goes; longer is stronger ' + prov(wd) : '')
        al.querySelectorAll('.fm-plane').forEach(function (el) {
          function pick() { picked = el.getAttribute('data-id'); var a = (sd.aircraft || []).filter(function (x) { return x.id === picked })[0]; al.querySelectorAll('.fm-plane').forEach(function (o) { o.classList.toggle('on', o === el) })
            var txt = (a.callsign || a.id) + ': ' + (a.alt_ft != null ? Math.round(a.alt_ft) + ' ft, ' : '') + (a.gs_kt != null ? Math.round(a.gs_kt) + ' kt, ' : '') + 'track ' + Math.round(a.track_deg || 0) + '°, at ' + hm(sd.t) + ' UTC'
            item.textContent = txt; if (window.stormPanel && stormPanel.show && stormPanel.isOpen && stormPanel.isOpen()) stormPanel.show({ title: a.callsign || a.id, text: txt }) }
          el.addEventListener('click', pick); el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick() } })
        })
        box.querySelectorAll('.fm-nowline').forEach(function (l) { var x = l.getAttribute('data-x0'), hi = hours.indexOf(t.slice(0, 13) + ':00:00Z'); l.style.display = hi < 0 ? 'none' : ''; if (hi >= 0) { var xx = +l.getAttribute('data-x0') + hi * +l.getAttribute('data-step'); l.setAttribute('x1', xx); l.setAttribute('x2', xx) } })
      }).catch(function (e) { cap.textContent = 'A snapshot could not be read (' + e.message + ').' })
    }
    range.addEventListener('input', function () { show(+range.value) })
    var timer = null, play = g('.fm-play')
    play.addEventListener('click', function () {
      if (timer) { clearInterval(timer); timer = null; play.textContent = '▶ Play'; return }
      if (+range.value >= times.length - 1) range.value = 0
      play.textContent = '❚❚ Pause'; timer = setInterval(function () { var v = +range.value + 1; if (v >= times.length) { clearInterval(timer); timer = null; play.textContent = '▶ Play'; return } range.value = v; show(v) }, 700)
    })
    var nowIso = new Date().toISOString(), m = location.hash.match(/t=([0-9T:-]+)Z?/), start = 0
    times.forEach(function (t, i) { if (t <= nowIso) start = i }); if (snaps.length) start = times.indexOf(snaps[snaps.length - 1].t)
    if (m) times.forEach(function (t, i) { if (t.slice(0, 16) <= m[1].slice(0, 16)) start = i })
    range.value = start; show(start)
  }

  function axisHours(hrs, x, y0) { return hrs.map(function (h, i) { return (i % 3 === 0) ? '<text class="count" x="' + x(i).toFixed(1) + '" y="' + y0 + '" text-anchor="middle">' + (h.slice(11, 13) === '00' ? day(h) + ' ' : '') + h.slice(11, 13) + '</text>' : '' }).join('') }
  function drawCross(el, cross) {
    var hrs = cross && cross.hours || []; if (!hrs.length) { el.innerHTML = '<p class="meta">No crosswind file yet.</p>'; return }
    var all = Object.keys(hrs[0].by_runway_end || {}), ends = [], name = {}
    all.forEach(function (e) { if (e.indexOf('/') > 0) { ends.push(e); name[e] = e; return } var r = String((+e.replace(/\D/g, '') + 18 - 1) % 36 + 1).padStart(2, '0'); if (ends.some(function (p) { return p.replace(/\D/g, '') === r })) return; ends.push(e); name[e] = all.some(function (q) { return q.replace(/\D/g, '') === r }) ? (e < r ? e + '/' + r : r + '/' + e) : e })
    var n = hrs.length, L = 40, R = 52, T = 10, B = 26, Hh = 180, w = Math.max(420, L + R + n * 18)
    var max = 0; hrs.forEach(function (h) { ends.forEach(function (e) { var v = h.by_runway_end[e] || {}; max = Math.max(max, Math.abs(v.cross_kt || 0), Math.abs(v.gust_cross_kt || 0)) }) })
    var top = Math.max(10, Math.ceil(max / 10) * 10), step = (w - L - R) / Math.max(1, n - 1), x = function (i) { return L + i * step }, y = function (v) { return T + Hh - Math.abs(v) / top * Hh }
    var s = '<svg class="wx-chart fm-chart" viewBox="0 0 ' + w + ' ' + (T + Hh + B) + '" style="min-width:' + w + 'px" role="img" aria-label="Crosswind in knots by runway end and hour">'
    for (var v = 0; v <= top; v += 10) s += '<line class="grid" x1="' + L + '" x2="' + (w - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/><text class="count" x="' + (L - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end">' + v + '</text>'
        ends.forEach(function (e, j) {
      var pts = hrs.map(function (h, i) { var v = h.by_runway_end[e] || {}; return x(i).toFixed(1) + ',' + y(v.cross_kt || 0).toFixed(1) }).join(' ')
      var gs = hrs.map(function (h, i) { var v = h.by_runway_end[e] || {}; return x(i).toFixed(1) + ',' + y(v.gust_cross_kt != null ? v.gust_cross_kt : v.cross_kt || 0).toFixed(1) }).join(' ')
      s += '<polyline class="fm-l fm-l' + (j % 4) + '" points="' + pts + '"/><polyline class="fm-l fm-gust fm-l' + (j % 4) + '" points="' + gs + '"/>'
      var last = hrs[n - 1].by_runway_end[e] || {}; s += '<text class="fm-end" x="' + (x(n - 1) + 4) + '" y="' + (y(last.cross_kt || 0) + 4) + '">' + esc(name[e]) + '</text>'
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
    if (cross && cross.hours && cross.hours.length) { var ends = Object.keys(cross.hours[0].by_runway_end || {})
      h += '<table><caption>Crosswind, kt (mean / in gusts)</caption><thead><tr><th>Hour (UTC)</th>' + ends.map(function (e) { return '<th>' + esc(e) + '</th>' }).join('') + '</tr></thead><tbody>' + cross.hours.map(function (r) { return '<tr><td>' + esc(r.t.slice(0, 16).replace('T', ' ')) + '</td>' + ends.map(function (e) { var v = r.by_runway_end[e] || {}; return '<td>' + (v.cross_kt != null ? Math.round(v.cross_kt) : '') + ' / ' + (v.gust_cross_kt != null ? Math.round(v.gust_cross_kt) : '') + '</td>' }).join('') + '</tr>' }).join('') + '</tbody></table>' }
    if (moves && moves.hours && moves.hours.length) h += '<table><caption>Departures and cancellations</caption><thead><tr><th>Hour (UTC)</th><th>Departures</th><th>Cancellations</th></tr></thead><tbody>' + moves.hours.map(function (r) { return '<tr><td>' + esc(r.t.slice(0, 16).replace('T', ' ')) + '</td><td>' + (r.departures != null ? r.departures : '') + '</td><td>' + (r.cancellations != null ? r.cancellations : '') + '</td></tr>' }).join('') + '</tbody></table>'
    el.innerHTML = h || '<p class="meta">No tables yet.</p>'
  }
})()
