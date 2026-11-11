// incident.broadcast@web-summit.dinis: /broadcast/, Storm Charles as a live news channel would show it.
// Reads only this site's own files (the data room's JSON and broadcast/data/); makes no outside request.
// Not a warning service: it shows what the authorities and the reporting say, each panel with its source and the time read.
(function () {
  'use strict'
  var el = document.getElementById('bc'); if (!el) return
  var base = el.getAttribute('data-base') || '../', inc = el.getAttribute('data-incident')
  var room = base + 'incidents/' + inc + '/', api = base + 'api/v1/' + inc + '/'
  var FILES = {
    incident: room + 'incident.json', signals: api + 'signals.json', warn: api + 'weather/warnings.json', airport: api + 'weather/airport.json',
    areas: base + 'sources/ipma/data/warnings.json', places: base + 'sources/ipma/data/places.json',
    field: base + 'broadcast/data/field.json', coast: base + 'broadcast/data/coast.json'
  }
  var D = {}
  var qNow = new URLSearchParams(location.search).get('now')
  var now = function () { var t = qNow ? Date.parse(qNow) : NaN; return isNaN(t) ? Date.now() : t }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- small tools
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var T = function (t) { return typeof t === 'number' ? t : Date.parse(String(t).replace(/Z?$/, 'Z').replace('ZZ', 'Z')) }
  var hm = function (t) { var d = new Date(T(t)); return isNaN(d) ? '?' : d.toISOString().slice(11, 16) }
  var dayhm = function (t) { var d = new Date(T(t)); if (isNaN(d)) return '?'; var w = d.toLocaleDateString('en-GB', { weekday: 'short', timeZone: 'UTC' }); return w + ' ' + d.toISOString().slice(11, 16) }
  var tm = function (t, txt) { return '<time datetime="' + esc(new Date(T(t)).toISOString()) + '">' + esc(txt || dayhm(t)) + '</time>' }
  var prov = function (label, url, read) { return '<span class="prov">' + (url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(label) + '</a>' : esc(label)) + (read ? ', read ' + tm(read, hm(read)) + ' UTC' : '') + '</span>' }
  var lbl = function (l) { l = (l || '').toLowerCase(); var k = /fact|official/.test(l) ? 'fact' : /hyp/.test(l) ? 'hypothesis' : 'evidence'; return '<span class="lbl l-' + k + '">' + k + '</span>' }
  var cut = function (s, n) { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + ' …' : s }
  var view = function (file, at) { return base + 'view/?path=' + encodeURIComponent(file).replace(/%2F/g, '/') + (at ? '&at=' + at : '') }
  var LEVEL = { red: 'Red', orange: 'Orange', yellow: 'Yellow' }
  var HAZ = { 'Precipitação': 'Rain', 'Vento': 'Wind', 'Agitação Marítima': 'Sea', 'Trovoada': 'Thunder', 'Neve': 'Snow', 'Nevoeiro': 'Fog', 'Tempo Frio': 'Cold', 'Tempo Quente': 'Heat' }
  var cssv = function (n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim() }

  // ---------- the frame of the wall
  el.innerHTML =
    '<div class="bc-wall" id="bc-wall">' +
      '<header class="bc-top"><span class="bc-live" title="drawn from the data room as read; not a live feed">ON THE WIRE</span>' +
        '<span class="bc-title">Storm Charles · Lisbon · Madeira</span>' +
        '<span class="bc-nws">Information, not alarm · <b>not a warning service</b>: follow <a href="https://www.ipma.pt/" rel="noopener">IPMA</a> and <a href="https://prociv.gov.pt/" rel="noopener">ANEPC</a></span>' +
        '<span class="bc-clock" id="bc-clock" aria-label="time in Lisbon"></span>' +
        '<button type="button" class="bc-btn" id="bc-fs">Full screen</button></header>' +
      '<section class="bc-map" id="bc-map" aria-label="a model\'s wind and pressure over the Atlantic"><canvas id="bc-cv"></canvas>' +
        '<div class="bc-map-over"><div class="bc-map-h">Wind and pressure · <span class="bc-model">a model, not an observation</span></div><div class="bc-map-t" id="bc-mt"></div></div>' +
        '<div class="bc-map-ctl"><button type="button" class="bc-btn" id="bc-play" aria-pressed="false">Play the model\'s hours</button><input type="range" id="bc-slide" min="0" max="0" value="0" aria-label="model hour"></div>' +
        '<div class="bc-map-key" id="bc-mk"></div></section>' +
      '<aside class="bc-side">' +
        '<section class="bc-panel" id="bc-warn"></section>' +
        '<section class="bc-panel" id="bc-air"></section>' +
        '<section class="bc-panel" id="bc-count"></section>' +
        '<section class="bc-panel bc-pics" id="bc-pics"></section>' +
      '</aside>' +
      '<section class="bc-chyron" id="bc-chy"></section>' +
      '<section class="bc-ticker" id="bc-tick" aria-label="the newest rows of the timeline"></section>' +
    '</div>'

  // ---------- the clock: Lisbon's own time (WET = UTC in November)
  function clock () {
    var d = new Date(now())
    var t = d.toLocaleTimeString('en-GB', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', second: qNow ? undefined : '2-digit' })
    var w = d.toLocaleDateString('en-GB', { timeZone: 'Europe/Lisbon', weekday: 'short', day: 'numeric', month: 'short' })
    document.getElementById('bc-clock').innerHTML = '<span class="bc-cl-l">LISBON</span> <b>' + esc(t) + '</b> <span class="bc-cl-d">' + esc(w) + (qNow ? ' (as at ?now)' : '') + '</span>'
  }
  clock(); if (!qNow) setInterval(clock, 1000)
  document.getElementById('bc-fs').onclick = function () {
    var w = document.getElementById('bc-wall')
    if (document.fullscreenElement) document.exitFullscreen(); else if (w.requestFullscreen) w.requestFullscreen()
  }

  // ---------- load
  Promise.all(Object.keys(FILES).map(function (k) {
    return fetch(FILES[k], { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() }).then(function (j) { D[k] = j }).catch(function () { D[k] = null })
  })).then(function () {
    chyron(); ticker(); warnings(); airport(); counts(); pictures(); map()
  })

  // ---------- the chyron: the headline (a decision or warning from its primary source, with its time)
  function chyron () {
    var x = D.incident, h = x && x.headline
    var box = document.getElementById('bc-chy')
    if (!h) { box.innerHTML = '<div class="bc-chy-main">The headline could not be read.</div>'; return }
    box.innerHTML = '<div class="bc-chy-k">' + esc(x.kicker || 'Storm Charles') + '</div>' +
      '<div class="bc-chy-main">' + lbl(h.label) + ' ' + esc(h.text) + '</div>' +
      '<div class="bc-chy-sub">' + prov(h.source, h.url) + ' · ' + esc(h.at) + (x.thursday ? ' · <span class="bc-chy-th">' + esc(cut(x.thursday, 150)) + '</span>' : '') +
      ' · <a href="' + esc(view('incidents/' + inc + '/incident.json', 'headline')) + '">the record</a></div>'
  }

  // ---------- the ticker: the newest timeline rows, each with its time, label and id
  function ticker () {
    var box = document.getElementById('bc-tick'), s = D.signals
    if (!s || !s.items) { box.innerHTML = '<div class="bc-tk-h">TIMELINE</div><div class="meta">The timeline could not be read.</div>'; return }
    var t = now()
    var rows = s.items.filter(function (r) { return T(r.at) <= t + 60e3 }).sort(function (a, b) { return T(b.at) - T(a.at) }).slice(0, 12)
    var item = function (r) {
      return '<span class="bc-tk-i"><a href="' + esc(room + 'timeline.html#' + r.id) + '">' + tm(r.at, hm(r.at)) + '</a> ' + lbl(r.label) + ' ' +
        esc(cut(r.text.replace(/^(evidence|fact|hypothesis):\s*/i, ''), 170)) + ' <span class="bc-tk-id">' + esc(r.id) + '</span></span>'
    }
    var inner = rows.map(item).join('<span class="bc-tk-sep" aria-hidden="true">◆</span>')
    box.innerHTML = '<div class="bc-tk-h">TIMELINE<span class="prov">made ' + tm(s.made_at, hm(s.made_at)) + ' UTC</span></div>' +
      '<div class="bc-tk-vp" tabindex="0"><div class="bc-tk-run' + (reduce ? ' still' : '') + '">' + inner +
      (reduce ? '' : '<span class="bc-tk-sep" aria-hidden="true">◆</span><span aria-hidden="true">' + inner + '</span>') + '</div></div>'
    var run = box.querySelector('.bc-tk-run')
    if (!reduce) requestAnimationFrame(function () { run.style.animationDuration = Math.max(40, run.scrollWidth / 2 / 70) + 's' })
  }

  // ---------- IPMA's warnings: Lisbon in full, then every district by its peak level now
  function inForce (w, t) { return T(w.start_utc) <= t && T(w.end_utc) > t }
  function warnings () {
    var box = document.getElementById('bc-warn'), w = D.warn, a = D.areas, t = now()
    var h = '<h2>IPMA warnings <span class="lbl l-fact">fact</span></h2>'
    if (w && w.lisbon) {
      var lis = w.lisbon.filter(function (x) { return T(x.end_utc) > t }).sort(function (x, y) { return T(x.start_utc) - T(y.start_utc) })
      h += '<div class="bc-sub">Lisbon district</div><ul class="bc-wl">' + lis.map(function (x) {
        var on = inForce(x, t)
        return '<li class="bc-w lv-' + esc(x.level) + (on ? ' on' : '') + '"><span class="lvl ' + esc(x.level) + '">' + esc(LEVEL[x.level] || x.level) + '</span> <b>' + esc(HAZ[x.type] || x.type) + '</b> ' +
          '<span class="bc-win">' + (on ? 'in force · ' : 'from ' + tm(x.start_utc, dayhm(x.start_utc)) + ' ') + 'to ' + tm(x.end_utc, dayhm(x.end_utc)) + '</span>' +
          '<div class="bc-wt">' + esc(x.text_en || x.text_pt) + '</div></li>'
      }).join('') + '</ul>' + prov('IPMA open data', w.source, w.read_utc)
    }
    if (a && a.now && a.now.by_area) {
      var names = {}; ((D.places && D.places.areas) || []).forEach(function (p) { names[p.id] = p.name })
      var by = { red: [], orange: [], yellow: [] }
      Object.keys(a.now.by_area).forEach(function (k) { var p = a.now.by_area[k].peak; if (by[p]) by[p].push(names[k] || k) })
      h += '<div class="bc-sub">Every area, the highest level today</div><div class="bc-areas">' + ['red', 'orange', 'yellow'].filter(function (l) { return by[l].length }).map(function (l) {
        return '<div class="bc-ar"><span class="lvl ' + l + '">' + LEVEL[l] + ' · ' + by[l].length + '</span> ' + esc(by[l].sort().join(' · ')) + '</div>'
      }).join('') + '</div>' + prov('IPMA open data, as we keep it', view('sources/ipma/data/warnings.json', 'now'), a.now.read_utc)
    }
    box.innerHTML = h
  }

  // ---------- Lisbon airport (LPPT): the latest METAR
  function airport () {
    var box = document.getElementById('bc-air'), a = D.airport
    if (!a || !a.metars || !a.metars.length) { box.innerHTML = '<h2>Lisbon airport</h2><p class="meta">Not read.</p>'; return }
    var t = now(), ms = a.metars.filter(function (m) { return T(m.time_utc) <= t + 60e3 }); var m = ms[ms.length - 1] || a.metars[a.metars.length - 1]
    var tile = function (v, u, k) { return '<div class="bc-tile"><div class="bc-tv">' + esc(v) + '<small>' + esc(u) + '</small></div><div class="bc-tk">' + esc(k) + '</div></div>' }
    box.innerHTML = '<h2>Lisbon airport, observed <span class="lbl l-fact">fact</span></h2>' +
      '<div class="bc-tiles">' + tile(m.wind_kmh == null ? '?' : m.wind_kmh, ' km/h', 'wind from ' + (m.wind_dir == null ? 'var.' : m.wind_dir + '°')) +
      tile(m.gust_kmh == null ? 'none' : m.gust_kmh, m.gust_kmh == null ? '' : ' km/h', 'gusts') + tile(m.pressure_hpa == null ? '?' : m.pressure_hpa, ' hPa', 'pressure') +
      tile(m.weather || 'none', '', 'weather (METAR)') + '</div>' +
      '<div class="bc-raw"><code>' + esc(m.raw) + '</code></div>' +
      '<div class="meta">Observed ' + tm(m.time_utc, hm(m.time_utc)) + ' UTC' + (a.max_gust ? ' · highest gust in the reads: ' + esc(a.max_gust.kmh) + ' km/h at ' + tm(a.max_gust.time_utc) : '') + '</div>' +
      prov('METAR LPPT, NOAA Aviation Weather Center', m.source, m.read_utc)
  }

  // ---------- counts: occurrences as reported (evidence), from the timeline's rows
  function counts () {
    var box = document.getElementById('bc-count'), s = D.signals, t = now()
    var h = '<h2>Counts, as reported <span class="lbl l-evidence">evidence</span></h2>'
    if (!s || !s.items) { box.innerHTML = h + '<p class="meta">The timeline could not be read.</p>'; return }
    var rows = s.items.filter(function (r) { return T(r.at) <= t + 60e3 && /\b\d[\d,]*\s+occurrences\b/.test(r.text) }).sort(function (a, b) { return T(b.at) - T(a.at) })
    var seen = {}, out = []
    rows.forEach(function (r) {
      var mm = r.text.match(/\b(\d[\d,]*)\s+occurrences\b/), n = mm[1]
      // the place the count belongs to: the last of Madeira (or Funchal) and the mainland (or Lisbon) named before the figure
      var before = r.text.slice(0, mm.index).toLowerCase(), im = Math.max(before.lastIndexOf('madeira'), before.lastIndexOf('funchal')), il = Math.max(before.lastIndexOf('mainland'), before.lastIndexOf('lisbon'))
      var region = im > il ? 'Madeira' : 'Mainland'
      if (seen[region] || out.length >= 2) return; seen[region] = 1
      var src = (r.sources || []).filter(function (x) { return x.url })[0]
      out.push('<div class="bc-count"><div class="bc-cn">' + esc(n) + '</div><div><b>' + region + '</b>: occurrences ' + '<div class="bc-ct">' + esc(cut(r.text.replace(/^(evidence|fact|hypothesis):\s*/i, ''), 200)) + '</div>' +
        '<div class="prov">row <a href="' + esc(room + 'timeline.html#' + r.id) + '">' + esc(r.id) + '</a>, ' + tm(r.at, hm(r.at)) + ' UTC' + (src ? ' · <a href="' + esc(src.url) + '" rel="noopener">' + esc(cut(src.label, 40)) + '</a>' : '') + '</div></div></div>')
    })
    box.innerHTML = h + (out.join('') || '<p class="meta">No count in the timeline yet.</p>') + '<div class="meta">Counts differ between those who count; each is theirs, not ours.</div>'
  }

  // ---------- pictures: only what we may show
  function pictures () {
    document.getElementById('bc-pics').innerHTML = '<h2>Pictures</h2><p class="meta">None shown yet: only an authority\'s own images under its terms, a licensed feed, or with permission; never a private person\'s. ' +
      'The sources we asked about are listed in <a href="' + esc(base + 'broadcast/README.html') + '">the wall\'s notes</a>.</p>'
  }

  // ---------- the map: a model's wind (streaks) and pressure (isobars), IPMA's areas as dots
  function map () {
    var F = D.field, C = D.coast, cv = document.getElementById('bc-cv'), wrap = document.getElementById('bc-map')
    if (!F || !F.frames) { document.getElementById('bc-mt').textContent = 'The model field could not be read.'; return }
    var g = F.grid, cols = g.cols, rows = g.rows, W0 = g.lon_west, N0 = g.lat_north, st = g.step_deg
    var E0 = W0 + st * (cols - 1), S0 = N0 - st * (rows - 1)
    var k = 1 / Math.cos(41 * Math.PI / 180)   // a simple equirectangular view, stretched at 41° N
    var ctx = cv.getContext('2d'), Wpx = 0, Hpx = 0, dpr = Math.min(2, window.devicePixelRatio || 1), view = {}
    var times = F.frames.map(function (f) { return T(f.time_utc) })
    var slide = document.getElementById('bc-slide'); slide.max = String((times.length - 1) * 6)
    var tNow = now(), pos = 0
    for (var i = 0; i < times.length - 1; i++) if (times[i] <= tNow) pos = Math.min(1, (tNow - times[i]) / (times[i + 1] - times[i])) + i
    if (tNow >= times[times.length - 1]) pos = times.length - 1
    slide.value = String(Math.round(pos * 6))
    var playing = false
    var areas = ((D.places && D.places.areas) || []).filter(function (p) { return p.label_at })
    var peaks = (D.areas && D.areas.now && D.areas.now.by_area) || {}
    var col = {}
    function colours () { ['--ink', '--ink-2', '--line', '--line-2', '--focus', '--surface', '--surface-2', '--paper', '--red', '--orange', '--yellow'].forEach(function (n) { col[n] = cssv(n) }) }
    function size () {
      var r = wrap.getBoundingClientRect(); Wpx = Math.max(200, r.width); Hpx = Math.max(160, r.height)
      cv.width = Math.round(Wpx * dpr); cv.height = Math.round(Hpx * dpr); cv.style.width = Wpx + 'px'; cv.style.height = Hpx + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // fit the box, centred on the storm side: west -30, east 0, south 31, north 51
      // fill the canvas (cover), never showing beyond the model's grid: the storm side, west -30, east 0, south 31, north 51
      var s = Math.max(Wpx / 30, Hpx / (20 * k)), cx = -14, cy = 41
      if (Wpx / Hpx < 1.1) { cx = -11; s = Math.max(Wpx / 18, Hpx / (22 * k)) }   // a phone: closer in
      s = Math.max(s, Wpx / (E0 - W0), Hpx / ((N0 - S0) * k))
      var hw = Wpx / 2 / s, hh = Hpx / 2 / (k * s)
      cx = Math.min(E0 - hw, Math.max(W0 + hw, cx)); cy = Math.min(N0 - hh, Math.max(S0 + hh, cy))
      view = { s: s, cx: cx, cy: cy }
      colours(); bg = null; particles = seed(); fade(1)
    }
    var X = function (lon) { return Wpx / 2 + (lon - view.cx) * view.s }
    var Y = function (lat) { return Hpx / 2 - (lat - view.cy) * k * view.s }
    var LON = function (x) { return view.cx + (x - Wpx / 2) / view.s }
    var LAT = function (y) { return view.cy - (y - Hpx / 2) / (k * view.s) }
    // a value of the field at (lon, lat) for frame position p (bilinear in space, linear in time)
    function at (key, lon, lat, p) {
      var fx = (lon - W0) / st, fy = (N0 - lat) / st
      if (fx < 0 || fy < 0 || fx > cols - 1 || fy > rows - 1) return null
      var i0 = Math.floor(p), i1 = Math.min(times.length - 1, i0 + 1), tt = p - i0
      var x0 = Math.min(cols - 2, Math.floor(fx)), y0 = Math.min(rows - 2, Math.floor(fy)), ax = fx - x0, ay = fy - y0
      var one = function (arr) {
        var a = arr[y0 * cols + x0], b = arr[y0 * cols + x0 + 1], c = arr[(y0 + 1) * cols + x0], d = arr[(y0 + 1) * cols + x0 + 1]
        if (a == null || b == null || c == null || d == null) return null
        return (a * (1 - ax) + b * ax) * (1 - ay) + (c * (1 - ax) + d * ax) * ay
      }
      var v0 = one(F.frames[i0][key]), v1 = one(F.frames[i1][key])
      return v0 == null || v1 == null ? null : v0 * (1 - tt) + v1 * tt
    }
    // the still layer: land, isobars, the low, IPMA's areas (drawn again when the hour changes)
    var bg = null, bgPos = -1
    function still () {
      var c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; var x = c.getContext('2d'); x.setTransform(dpr, 0, 0, dpr, 0, 0)
      x.fillStyle = col['--surface-2']; x.fillRect(0, 0, Wpx, Hpx)
      if (C && C.rings) {
        x.fillStyle = col['--surface']; x.strokeStyle = col['--line-2']; x.lineWidth = 1
        C.rings.forEach(function (r) { x.beginPath(); r.forEach(function (q, j) { if (j) x.lineTo(X(q[0]), Y(q[1])); else x.moveTo(X(q[0]), Y(q[1])) }); x.closePath(); x.fill(); x.stroke() })
      }
      // isobars every 4 hPa: marching squares on a finer grid sampled from the field
      var p = pos, n = 4, gx = (cols - 1) * n + 1, gy = (rows - 1) * n + 1, P = new Array(gx * gy)
      for (var j = 0; j < gy; j++) for (var i = 0; i < gx; i++) P[j * gx + i] = at('p', W0 + i * st / n, N0 - j * st / n, p)
      var lo = Infinity, li = 0, hiV = -Infinity
      P.forEach(function (v, i) { if (v != null && v < lo) { lo = v; li = i } if (v != null && v > hiV) hiV = v })
      x.strokeStyle = col['--ink-2']; x.globalAlpha = 0.75; x.lineWidth = 1.1; x.font = '600 11px ' + (cssv('--mono') || 'monospace'); x.fillStyle = col['--ink-2']
      var gxLon = function (i) { return W0 + i * st / n }, gyLat = function (j) { return N0 - j * st / n }
      for (var lev = Math.ceil(lo / 4) * 4; lev <= hiV; lev += 4) {
        x.beginPath(); var lab = null
        for (j = 0; j < gy - 1; j++) for (i = 0; i < gx - 1; i++) {
          var a = P[j * gx + i], b = P[j * gx + i + 1], c2 = P[(j + 1) * gx + i + 1], d = P[(j + 1) * gx + i]
          if (a == null || b == null || c2 == null || d == null) continue
          var pts = [], e = function (v1, v2, x1, y1, x2, y2) { if ((v1 < lev) !== (v2 < lev)) { var t = (lev - v1) / (v2 - v1); pts.push([X(gxLon(x1 + (x2 - x1) * t)), Y(gyLat(y1 + (y2 - y1) * t))]) } }
          e(a, b, i, j, i + 1, j); e(b, c2, i + 1, j, i + 1, j + 1); e(c2, d, i + 1, j + 1, i, j + 1); e(d, a, i, j + 1, i, j)
          for (var q = 0; q + 1 < pts.length; q += 2) { x.moveTo(pts[q][0], pts[q][1]); x.lineTo(pts[q + 1][0], pts[q + 1][1]); if (!lab && pts[q][0] > 30 && pts[q][0] < Wpx - 60 && pts[q][1] > 50 && pts[q][1] < Hpx - 50 && (i + j + lev) % 7 === 0) lab = pts[q] }
        }
        x.stroke(); if (lab) x.fillText(String(lev), lab[0] + 3, lab[1] - 3)
      }
      x.globalAlpha = 1
      // the low's centre in the model
      if (lo < 1008) {
        var lx = X(gxLon(li % gx)), ly = Y(gyLat(Math.floor(li / gx)))
        x.fillStyle = col['--ink']; x.font = '800 ' + Math.round(Math.max(22, view.s * 1.3)) + 'px ' + (cssv('--sans') || 'sans-serif'); x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('L', lx, ly); x.font = '600 12px ' + (cssv('--mono') || 'monospace'); x.fillText(Math.round(lo) + ' hPa', lx, ly + Math.max(20, view.s * 1.1)); x.textAlign = 'start'; x.textBaseline = 'alphabetic'
      }
      // IPMA's areas: a dot in the area's level (IPMA's colours), its level written beside it
      areas.forEach(function (ar) {
        var pk = (peaks[ar.id] || {}).peak, lx = X(ar.label_at[0]), ly = Y(ar.label_at[1])
        if (lx < 0 || lx > Wpx || ly < 0 || ly > Hpx) return
        var c3 = pk === 'red' ? col['--red'] : pk === 'orange' ? col['--orange'] : pk === 'yellow' ? col['--yellow'] : null
        x.beginPath(); x.arc(lx, ly, c3 ? 4.5 : 2.5, 0, 7); x.fillStyle = c3 || col['--line-2']; x.fill(); if (c3) { x.strokeStyle = col['--surface']; x.lineWidth = 1.5; x.stroke() }
      })
      // Lisbon and Funchal
      ;[['Lisbon', -9.14, 38.72], ['Funchal', -16.91, 32.65]].forEach(function (pl) {
        var px = X(pl[1]), py = Y(pl[2]); x.fillStyle = col['--ink']; x.font = '700 12px ' + (cssv('--sans') || 'sans-serif'); x.fillText(pl[0], px + 8, py + 4)
      })
      bg = c; bgPos = Math.round(pos * 6)
    }
    // the moving layer: streaks carried by the model's wind
    var particles = [], trail = null, tctx = null
    function seed () {
      var n = Math.round(Math.min(2400, Wpx * Hpx / 520)), a = []
      for (var i = 0; i < n; i++) a.push({ x: Math.random() * Wpx, y: Math.random() * Hpx, age: Math.random() * 80 })
      trail = document.createElement('canvas'); trail.width = cv.width; trail.height = cv.height; tctx = trail.getContext('2d'); tctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      return a
    }
    function fade (all) {
      if (!tctx) return
      tctx.save(); tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.globalCompositeOperation = 'destination-out'; tctx.fillStyle = 'rgba(0,0,0,' + (all ? 1 : 0.06) + ')'; tctx.fillRect(0, 0, trail.width, trail.height); tctx.restore()
    }
    function step () {
      fade(0)
      tctx.lineWidth = 1.2; tctx.strokeStyle = col['--focus']; tctx.globalAlpha = 0.85; tctx.beginPath()
      var sp = 0.045 * view.s / 10
      particles.forEach(function (q) {
        var lon = LON(q.x), lat = LAT(q.y), u = at('u', lon, lat, pos), v = at('v', lon, lat, pos)
        if (u == null || q.age > 90) { q.x = Math.random() * Wpx; q.y = Math.random() * Hpx; q.age = 0; return }
        var nx = q.x + u * sp, ny = q.y - v * sp * k
        tctx.moveTo(q.x, q.y); tctx.lineTo(nx, ny); q.x = nx; q.y = ny; q.age++
        if (nx < 0 || nx > Wpx || ny < 0 || ny > Hpx) q.age = 999
      })
      tctx.stroke(); tctx.globalAlpha = 1
    }
    // a still view (reduced motion): arrows on a grid
    function arrows () {
      ctx.strokeStyle = col['--focus']; ctx.lineWidth = 1.4
      for (var y = 20; y < Hpx; y += 34) for (var x = 20; x < Wpx; x += 34) {
        var u = at('u', LON(x), LAT(y), pos), v = at('v', LON(x), LAT(y), pos); if (u == null) continue
        var m = Math.hypot(u, v), L = Math.min(16, 3 + m * 0.8), ux = u / (m || 1), vy = -v / (m || 1)
        ctx.beginPath(); ctx.moveTo(x - ux * L / 2, y - vy * L / 2); ctx.lineTo(x + ux * L / 2, y + vy * L / 2)
        ctx.lineTo(x + ux * L / 2 - (ux * 4 - vy * 3), y + vy * L / 2 - (vy * 4 + ux * 3)); ctx.stroke()
      }
    }
    function label () {
      var i0 = Math.floor(pos), tt = pos - i0, t = times[i0] + ((times[Math.min(times.length - 1, i0 + 1)] - times[i0]) * tt)
      var tl = Math.round(t / 36e5) * 36e5
      var lw = at('u', -9.14, 38.72, pos), lv = at('v', -9.14, 38.72, pos), lp = at('p', -9.14, 38.72, pos)
      var spd = lw == null ? null : Math.round(Math.hypot(lw, lv) * 3.6)
      document.getElementById('bc-mt').innerHTML = 'Model hour <b>' + tm(tl, dayhm(tl)) + ' UTC</b>' + (Math.abs(tl - now()) < 90 * 60e3 ? ' · now' : tl > now() ? ' · ahead' : ' · past') +
        (spd != null ? ' · Lisbon in the model: ' + spd + ' km/h mean, ' + Math.round(lp) + ' hPa' : '')
    }
    document.getElementById('bc-mk').innerHTML = '<span><i class="k-streak"></i> wind at 10 m (model)</span><span><i class="k-iso"></i> pressure, every 4 hPa (model)</span>' +
      '<span><i class="k-dot lv-red"></i><i class="k-dot lv-orange"></i><i class="k-dot lv-yellow"></i> IPMA areas at their highest level today (red, orange, yellow)</span>' +
      '<span class="prov">model: <a href="' + esc(F.source) + '" rel="noopener">Open-Meteo</a>, ' + esc(F.licence.split(',')[0]) + ', read ' + tm(F.read_utc, dayhm(F.read_utc)) + ' UTC · land: Natural Earth</span>'
    slide.oninput = function () { pos = +slide.value / 6; label(); if (reduce) draw() }
    var pb = document.getElementById('bc-play')
    pb.onclick = function () { playing = !playing; pb.setAttribute('aria-pressed', String(playing)); pb.textContent = playing ? 'Pause' : 'Play the model\'s hours' }
    function draw () {
      if (!bg || bgPos !== Math.round(pos * 6)) still()
      ctx.clearRect(0, 0, Wpx, Hpx); ctx.drawImage(bg, 0, 0, Wpx, Hpx)
      if (reduce) arrows(); else ctx.drawImage(trail, 0, 0, Wpx, Hpx)
    }
    var last = 0
    function loop (ts) {
      if (playing && ts - last > 120) { last = ts; pos += 1 / 6; if (pos > times.length - 1) pos = 0; slide.value = String(Math.round(pos * 6)); label() }
      step(); draw(); requestAnimationFrame(loop)
    }
    size(); label()
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduce) draw() }, 150) })
    document.addEventListener('fullscreenchange', function () { setTimeout(function () { size(); if (reduce) draw() }, 120) })
    if (window.matchMedia) matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { colours(); bg = null })
    new MutationObserver(function () { colours(); bg = null; if (reduce) draw() }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    if (reduce) draw(); else requestAnimationFrame(loop)
  }
})()
