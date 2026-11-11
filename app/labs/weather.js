// Labs, weather (incident.labs@web-summit.dinis): stations, day-bands, models. Data: weather/*.json and decisions/graph.json.
// Not a warning service: every forecast drawn here is somebody else's (IPMA, MET Norway, Open-Meteo, the airport's TAF), dashed,
// named and linked; observations are solid; IPMA's colours are used for IPMA's levels only.
(function () {
  'use strict'
  var L = window.Labs, h = L.h, s = L.s, T = L.T, H = L.H
  function short(str, n) { str = String(str || ''); return str.length > n ? str.slice(0, n - 1) + '…' : str }
  function path(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1) }).join(' ') }
  function obsItem(st, r, file, src, read) {
    return L.valueItem('obs:' + st.id + ':' + r.time_utc, { type: 'observation, IPMA station', label: 'fact', title: st.name + ': ' + (r.rain_mm == null ? 'rain not reported' : r.rain_mm + ' mm of rain') + ', mean wind ' + (r.wind_mean_kmh == null ? 'not reported' : r.wind_mean_kmh + ' km/h ' + (r.wind_dir || '')), when: r.time_utc, whenName: 'Hour (as labelled by IPMA)', facts: [['Station', st.name + ' (' + st.id + ')'], ['Note', 'Mean wind, not gusts. The hour label is IPMA\'s; whether it marks the start or the end of the hour is not documented.']], sources: [{ label: 'IPMA open data, station observations', url: src }], read: read, file: L.DATA + file })
  }

  // ---- warned against observed, every station on one time axis
  L.exp('weather/stations', {
    needs: ['rain', 'madeira', 'cap'],
    setup: function (c) { L.choice(c.tools, 'scale', [['shared', 'One scale for all'], ['own', 'Each station its own']], c.state, c.redraw) },
    draw: function (c) {
      var d = c.data, lab = c.phone ? 110 : 230, W = Math.max(c.W - 22, c.phone ? 880 : 760)
      var groups = [
        { name: 'Lisbon', file: 'weather/lisbon-rain.json', ds: d.rain, msgs: d.cap.lisbon_messages.map(function (m) { return { m: m, area: 'Lisboa district' } }), note: 'Almada and Barreiro are in Setúbal district: Lisbon\'s warnings do not cover them.' },
        { name: 'Madeira', file: 'weather/madeira.json', ds: d.madeira, msgs: [].concat.apply([], d.cap.other_messages.filter(function (m) { return /Madeira/.test(m.areas.join()) }).map(function (m) { return m.areas.map(function (a) { return { m: m, area: a.replace('Madeira - ', '') } }) })), note: 'The data does not say which warning area each station is in, so the warnings are drawn by area above the stations, not on each one.' }]
      var allR = 1, allW = 1; groups.forEach(function (g) { g.ds.stations.forEach(function (st) { st.hourly.forEach(function (r) { allR = Math.max(allR, r.rain_mm || 0); allW = Math.max(allW, r.wind_mean_kmh || 0) }) }) })
      groups.forEach(function (gr) {
        var ts = [].concat.apply([], gr.ds.stations.map(function (st) { return st.hourly.map(function (r) { return T(r.time_utc) }) })), t0 = Math.min.apply(null, ts) - H, tObs = Math.max.apply(null, ts), t1 = Math.max(tObs + H / 2, Math.ceil((tObs + 1) / L.DAY) * L.DAY), sc = L.scale(t0, t1, lab, W - 12), bw = Math.max(2, (sc(t0 + H) - sc(t0)) - 2)
        // warning rows: area and type, only the messages not replaced by a later one. The axis runs to the end of the day of the last
        // observation, so IPMA's warnings for the hours still to come are seen against the hours not yet observed
        var replaced = {}; gr.msgs.forEach(function (q) { (q.m.replaces || []).forEach(function (r) { replaced[r.identifier] = 1 }) })
        var wr = {}; gr.msgs.forEach(function (q) { if (replaced[q.m.identifier] || T(q.m.expires_utc) <= t0 || T(q.m.onset_utc) >= t1) return; var k = q.area + ' · ' + L.wtype(q.m.event_pt); (wr[k] = wr[k] || []).push(q.m) })
        var wk = Object.keys(wr).sort(), top = 40, WH = 18, SH = 52, y = top
        var g = L.svg(W, top + wk.length * WH + 14 + gr.ds.stations.length * SH + 14, gr.name + ': warned and observed, hour by hour')
        L.axis(g, sc, top, top + wk.length * WH + 14 + gr.ds.stations.length * SH)
        wk.forEach(function (k) {
          g.appendChild(s('text', { x: 6, y: y + 13, class: 't-small', text: short('Warned: ' + k, c.phone ? 20 : 44) }))
          wr[k].forEach(function (m) { var a = Math.max(t0, T(m.onset_utc)), b = Math.min(t1, T(m.expires_utc)), lv = L.level(m.event_pt); L.mark(L.levelBar(g, sc(a), y + 2, sc(b) - sc(a), WH - 4, lv), L.capItem(m), m.event_pt) })
          y += WH
        })
        y += 14
        var yEnd = top + wk.length * WH + 14 + gr.ds.stations.length * SH
        gr.ds.stations.forEach(function (st, i) {
          var mr = 1, mw = 1; st.hourly.forEach(function (r) { mr = Math.max(mr, r.rain_mm || 0); mw = Math.max(mw, r.wind_mean_kmh || 0) })
          var R = c.state.scale === 'own' ? mr : allR, Wd = c.state.scale === 'own' ? mw : allW, base = y + SH - 6, ht = SH - 14
          if (i % 2 === 0) g.appendChild(s('rect', { x: 0, y: y, width: W, height: SH, class: 'lane-bg' }))
          g.appendChild(s('text', { x: 6, y: y + 18, class: 'lane-name', text: short(st.name.replace('Madeira, ', ''), c.phone ? 16 : 32) }))
          var sum = st.hourly.reduce(function (a, r) { return a + (r.rain_mm || 0) }, 0)
          g.appendChild(s('text', { x: 6, y: y + 33, class: 'lane-sub', text: (st.hourly.some(function (r) { return r.rain_mm != null }) ? sum.toFixed(1) + ' mm' : 'rain not reported') + ' · ' + (st.hourly.some(function (r) { return r.wind_mean_kmh != null }) ? 'max wind ' + mw.toFixed(0) + ' km/h' : 'wind not reported') }))
          if (!c.phone && st.max_6h_rain) g.appendChild(s('text', { x: 6, y: y + 45, class: 'lane-sub', text: 'wettest 6 h: ' + st.max_6h_rain.mm + ' mm' }))
          g.appendChild(s('line', { x1: lab, x2: W - 12, y1: base, y2: base, class: 'lane-line' }))
          var pts = []
          st.hourly.forEach(function (r) {
            var x = sc(T(r.time_utc))
            if (r.rain_mm) g.appendChild(s('rect', { x: x - bw / 2, y: base - r.rain_mm / R * ht, width: bw, height: r.rain_mm / R * ht, class: 'obs-bar' }))
            if (r.rain_mm >= R * 0.45 && bw >= 24) g.appendChild(s('text', { x: x, y: base - r.rain_mm / R * ht - 2, class: 't-val', 'text-anchor': 'middle', text: r.rain_mm }))
            if (r.wind_mean_kmh != null) pts.push([x, base - r.wind_mean_kmh / Wd * ht])
          })
          if (pts.length) g.appendChild(s('path', { d: path(pts), class: 'wind-line' }))
          st.hourly.forEach(function (r) { var x = sc(T(r.time_utc)); g.appendChild(L.mark(s('rect', { x: x - bw / 2 - 1, y: y + 2, width: bw + 2, height: SH - 4, class: 'hit', title: L.dhm(T(r.time_utc)) + ' · ' + (r.rain_mm == null ? 'no rain value' : r.rain_mm + ' mm') + ' · ' + (r.wind_mean_kmh == null ? 'no wind value' : r.wind_mean_kmh + ' km/h ' + (r.wind_dir || '')) }), obsItem(st, r, gr.file, st.source || gr.ds.source, st.read_utc || gr.ds.read_utc), st.name + ' ' + L.dhm(T(r.time_utc)))) })
          y += SH
        })
        if (t1 - tObs > H) { var xo = sc(tObs + H / 2); g.appendChild(s('line', { x1: xo, x2: xo, y1: top - 4, y2: yEnd, class: 'readline' })); var flip = xo > W - 340; g.appendChild(s('text', { x: flip ? xo - 4 : xo + 4, y: yEnd + 6, 'text-anchor': flip ? 'end' : 'start', class: 'readline-t', text: 'observed to ' + L.hm(tObs) + '; to the right, only what IPMA has warned' })) }
        c.el.appendChild(h('h3', { text: gr.name + ': ' + gr.ds.stations.length + ' stations, read ' + L.dhm(T(gr.ds.read_utc)) + ' UTC' })); c.el.appendChild(g)
        c.el.appendChild(h('p', { class: 'meta', text: gr.note }))
      })
      c.el.appendChild(L.legend([['lg-rain', 'rain in the hour, mm (observed)'], ['lg-wind', 'mean wind, km/h (observed; not gusts)'], ['lg-red', 'IPMA red'], ['lg-orange', 'IPMA orange'], ['lg-yellow', 'IPMA yellow']]))
      c.el.appendChild(h('p', { class: 'meta', text: 'Scale: rain to ' + (c.state.scale === 'own' ? 'each station\'s own maximum' : allR + ' mm in an hour') + ', wind to ' + (c.state.scale === 'own' ? 'each station\'s own maximum' : allW + ' km/h') + '. Source: IPMA station observations and IPMA\'s warnings through MeteoAlarm.' }))
    }
  })

  // ---- Wednesday hour by hour, in bands
  var dayBands = {
    needs: ['warnings', 'cap', 'forecast', 'airport', 'rain', 'graph', 'analysis'],
    setup: function (c) {
      L.choice(c.tools, 'day', [['2026-11-11', 'Wednesday 11'], ['2026-11-10', 'Tuesday 10'], ['2026-11-12', 'Thursday 12']], c.state, c.redraw)
      L.choice(c.tools, 'warned', [['feed', 'IPMA\'s feed as last read'], ['kept', 'Every message we kept']], c.state, c.redraw)
      L.choice(c.tools, 'shade', [['unit', 'One scale per unit'], ['band', 'Each band its own']], c.state, c.redraw)
    },
    draw: function (c) {
      var d = c.data, d0 = T(c.state.day), d1 = d0 + 24 * H, lab = c.phone ? 104 : 220, W = Math.max(c.W - 22, c.phone ? 900 : 820), sc = L.scale(d0, d1, lab, W - 12), cw = sc(d0 + H) - sc(d0)
      var bands = []   // {group, name, draw(g, y, h)} built below, then laid out
      var grp = function (name, sub) { bands.push({ head: name, sub: sub }) }
      var clip = function (a, b) { return a < d1 && b > d0 ? [Math.max(a, d0), Math.min(b, d1)] : null }
      // 1. IPMA's warnings
      var kept = c.state.warned === 'kept', replaced = {}; d.cap.lisbon_messages.forEach(function (m) { (m.replaces || []).forEach(function (r) { replaced[r.identifier] = 1 }) })
      var keptMsgs = d.cap.lisbon_messages.filter(function (m) { return !replaced[m.identifier] && clip(T(m.onset_utc), T(m.expires_utc)) }), isGone = function (m) { return !!m.left_feed_utc || T(m.last_seen_utc) < T(d.cap.read_utc) - 60e3 }, nGone = keptMsgs.filter(isGone).length
      grp('Warned', kept ? 'IPMA, Lisbon district, from every CAP message we kept: ' + (keptMsgs.length - nGone) + ' still in the feed, ' + nGone + ' rebuilt from our record (dotted)' : 'IPMA, Lisbon district, as in IPMA\'s feed read ' + L.dhm(T(d.warnings.read_utc)) + ': a fact')
      ;[['wind', 'Wind'], ['rain', 'Rain'], ['sea', 'Sea'], ['thunder', 'Thunder']].forEach(function (ty) {
        if (ty[0] === 'thunder' && !(kept && keptMsgs.some(function (m) { return L.wtype(m.event_pt) === 'thunder' }))) return
        bands.push({ name: ty[1], h: 24, draw: function (g, y) {
          if (kept) keptMsgs.forEach(function (m) { if (L.wtype(m.event_pt) !== ty[0]) return; var k = clip(T(m.onset_utc), T(m.expires_utc)), lv = L.level(m.event_pt), gone = isGone(m), bar = L.levelBar(g, sc(k[0]), y + 3, sc(k[1]) - sc(k[0]), 18, lv, lv.toUpperCase() + (gone ? ' · rebuilt: last in the feed ' + L.dhm(T(m.last_seen_utc)) : ' · in the feed')); if (gone) bar.classList.add('lv-kept'); L.mark(bar, L.capItem(m), m.event_pt) })
          else d.warnings.lisbon.forEach(function (w, i) { var k = L.wtype(w.type) === ty[0] && clip(T(w.start_utc), T(w.end_utc)); if (k) L.mark(L.levelBar(g, sc(k[0]), y + 3, sc(k[1]) - sc(k[0]), 18, w.level, w.level.toUpperCase() + ' ' + short(w.text_pt, Math.floor((sc(k[1]) - sc(k[0])) / 6.5) - 8)), L.warnItem(w, i), w.level + ' ' + w.type) })
        } })
      })
      // shading: one scale per unit (so a km/h cell means the same in every band), or each band's own maximum
      var sts0 = d.rain.stations.filter(function (st) { return /^Lisboa|Oeiras/.test(st.name) }), MAXU = { 'km/h': 1, 'mm': 1, '%': 100, 'm': 1 }
      d.forecast.hourly.rows.forEach(function (r) { MAXU['km/h'] = Math.max(MAXU['km/h'], r.wind_mean_kmh || 0); MAXU.m = Math.max(MAXU.m, r.sea_total_m || 0) })
      sts0.forEach(function (st) { st.hourly.forEach(function (r) { MAXU['km/h'] = Math.max(MAXU['km/h'], r.wind_mean_kmh || 0); MAXU.mm = Math.max(MAXU.mm, r.rain_mm || 0) }) })
      var perUnit = c.state.shade !== 'band', pct = function (v, unit, bandMax) { return Math.round(4 + Math.min(1, v / (perUnit ? MAXU[unit] : bandMax)) * 66) }
      // 2. IPMA's hourly forecast: cells, dashed because a forecast
      var fc = d.forecast.hourly, cell = function (key, unit, fmt) {
        return function (g, y) {
          var max = Math.max.apply(null, fc.rows.map(function (r) { return r[key] || 0 })) || 1
          fc.rows.forEach(function (r) {
            var t = T(r.time_utc); if (t < d0 || t >= d1 || r[key] == null) return
            var x = sc(t), q = s('g', {}); q.appendChild(s('rect', { x: x + 1, y: y + 3, width: cw - 2, height: 20, class: 'fc-cell', style: 'fill: color-mix(in srgb, var(--ink-2) ' + pct(r[key], unit, max) + '%, var(--surface))' }))
            if (cw >= 22) q.appendChild(s('text', { x: x + cw / 2, y: y + 17, class: 't-val', 'text-anchor': 'middle', text: fmt ? fmt(r[key]) : Math.round(r[key]) }))
            g.appendChild(L.mark(q, L.valueItem('fc:ipma:' + key + ':' + r.time_utc, { type: 'IPMA\'s hourly forecast for Lisbon (theirs, not ours)', label: 'fact', title: 'IPMA forecast for ' + L.dhm(t) + ': ' + key.replace(/_/g, ' ') + ' ' + r[key] + ' ' + unit, when: r.time_utc, whenName: 'Forecast for', facts: [['The whole hour, as IPMA gave it', 'mean wind ' + r.wind_mean_kmh + ' km/h ' + r.wind_dir + ', rain probability ' + r.rain_prob_pct + ' %, rain intensity class ' + r.rain_intensity_class + ', sea ' + r.sea_total_m + ' m'], ['Model run stamped (local)', fc.updated_local], ['Label', 'A fact that IPMA forecast this; what will happen is not known.']], sources: [{ label: 'IPMA, aggregate forecast for Lisbon', url: fc.source }], read: fc.read_utc, file: L.DATA + 'weather/forecast.json' }), 'IPMA forecast ' + L.dhm(t)))
          })
        }
      }
      grp('Forecast', 'IPMA\'s hourly model for Lisbon, run of ' + String(fc.updated_local).replace('T', ' ').slice(5, 16))
      if (!fc.rows.some(function (r) { var t = T(r.time_utc); return t >= d0 && t < d1 })) bands.push({ name: 'Not kept', h: 22, draw: function (g, y) { g.appendChild(s('text', { x: sc(d0) + 6, y: y + 15, class: 't-small', text: 'no hourly forecast for this day is in the file: IPMA\'s model output starts ' + L.dhm(T(fc.rows[0].time_utc)) + ', and earlier runs were not kept' })) } })
      else {
      bands.push({ name: 'Mean wind, km/h', h: 26, draw: cell('wind_mean_kmh', 'km/h') }); bands.push({ name: 'Rain probability, %', h: 26, draw: cell('rain_prob_pct', '%') }); bands.push({ name: 'Sea, m', h: 26, draw: cell('sea_total_m', 'm', function (v) { return v.toFixed(1) }) })
      }
      // 3. the airport's TAF
      grp('Airport forecast', 'TAF for Lisbon airport, issued ' + L.dhm(T(d.airport.taf.issue_utc)))
      d.airport.taf.groups.forEach(function (gp, i) {
        var k = clip(T(gp.from_utc), T(gp.to_utc)); if (!k) return
        var txt = (gp.prob ? 'PROB' + gp.prob + ' ' : '') + gp.change + (gp.wind_kmh ? ': ' + gp.wind_kmh + ' km/h' : '') + (gp.gust_kmh ? ', gusts ' + gp.gust_kmh : '') + (gp.weather ? ' ' + gp.weather : '')
        bands.push({ name: (gp.prob ? gp.prob + ' % chance' : gp.change === 'TEMPO' ? 'At times' : gp.change === 'BECMG' ? 'Becoming' : 'Base'), h: 22, draw: function (g, y) { var q = s('g', {}); q.appendChild(s('rect', { x: sc(k[0]), y: y + 3, width: sc(k[1]) - sc(k[0]), height: 16, class: 'fc-cell' })); q.appendChild(s('text', { x: sc(k[0]) + 4, y: y + 15, class: 't-val', text: short(txt, Math.floor((sc(k[1]) - sc(k[0])) / 6.3)) })); g.appendChild(L.mark(q, L.valueItem('taf:' + i, { type: 'airport forecast (TAF group)', label: 'fact', title: txt, when: gp.from_utc, whenName: 'From', facts: [['To', L.dhm(T(gp.to_utc))], ['Raw', d.airport.taf.raw], ['Label', 'A fact that this was forecast for the airport; gusts in km/h converted from knots.']], sources: [{ label: 'Lisbon airport TAF (IPMA), via NOAA Aviation Weather', url: d.airport.taf.source }], read: d.airport.taf.read_utc, file: L.DATA + 'weather/airport.json' }), txt)) } })
      })
      if (!d.airport.taf.groups.some(function (gp) { return clip(T(gp.from_utc), T(gp.to_utc)) })) bands.push({ name: 'Not for this day', h: 22, draw: function (g, y) { g.appendChild(s('text', { x: sc(d0) + 6, y: y + 15, class: 't-small', text: 'the TAF in the file covers ' + L.dhm(T(d.airport.taf.valid_from_utc)) + ' to ' + L.dhm(T(d.airport.taf.valid_to_utc)) })) } })
      // 4. observed so far
      grp('Observed', 'IPMA stations in Lisbon and the airport: facts')
      var sts = d.rain.stations.filter(function (st) { return /^Lisboa|Oeiras/.test(st.name) }), byHour = {}
      sts.forEach(function (st) { st.hourly.forEach(function (r) { var o = byHour[r.time_utc] = byHour[r.time_utc] || { w: null, r: null }; if (r.wind_mean_kmh != null && (o.w == null || r.wind_mean_kmh > o.w.v)) o.w = { v: r.wind_mean_kmh, st: st, r: r }; if (r.rain_mm != null && (o.r == null || r.rain_mm > o.r.v)) o.r = { v: r.rain_mm, st: st, r: r } }) })
      var obsRow = function (key, unit) { return function (g, y) { var n = 0, bmax = Math.max.apply(null, Object.keys(byHour).map(function (k) { return (byHour[k][key] || {}).v || 0 })) || 1; Object.keys(byHour).forEach(function (k) { var t = T(k) - H, o = byHour[k][key]; if (t < d0 || t >= d1 || !o) return; n++; var x = sc(t), q = s('g', {}); q.appendChild(s('rect', { x: x + 1, y: y + 3, width: cw - 2, height: 20, class: 'd d-fact', style: 'fill: color-mix(in srgb, var(--focus) ' + pct(o.v, unit, bmax) + '%, var(--surface)); stroke: var(--focus)' })); if (cw >= 22) q.appendChild(s('text', { x: x + cw / 2, y: y + 17, class: 't-val', 'text-anchor': 'middle', text: key === 'w' ? Math.round(o.v) : o.v })); g.appendChild(L.mark(q, obsItem(o.st, o.r, 'weather/lisbon-rain.json', o.st.source || d.rain.source, o.st.read_utc || d.rain.read_utc), 'Observed ' + o.v + ' ' + unit)) }); if (!n) g.appendChild(s('text', { x: sc(d0) + 6, y: y + 17, class: 't-small', text: 'no observation for this day in the file read ' + L.dhm(T(d.rain.read_utc)) })) } }
      bands.push({ name: 'Highest mean wind, km/h', h: 26, draw: obsRow('w', 'km/h') }); bands.push({ name: 'Most rain in the hour, mm', h: 26, draw: obsRow('r', 'mm') })
      bands.push({ name: 'Airport gusts, km/h', h: 26, draw: function (g, y) { d.airport.metars.forEach(function (m) { var t = T(m.time_utc); if (t < d0 || t >= d1 || !m.gust_kmh) return; var q = s('g', {}); q.appendChild(s('circle', { cx: sc(t), cy: y + 13, r: 9, class: 'd d-fact', style: 'fill: var(--focus); stroke: var(--focus)' })); q.appendChild(s('text', { x: sc(t), y: y + 16.5, class: 't-val', 'text-anchor': 'middle', style: 'fill: var(--paper)', text: m.gust_kmh })); g.appendChild(L.mark(q, L.valueItem('metar:' + m.time_utc, { type: 'observation, Lisbon airport (METAR)', label: 'fact', title: 'Gust ' + m.gust_kmh + ' km/h, wind ' + m.wind_kmh + ' km/h', when: m.time_utc, facts: [['Raw', m.raw]], sources: [{ label: 'METAR LPPT via NOAA Aviation Weather', url: m.source }], read: m.read_utc, file: L.DATA + 'weather/airport.json' }), 'Gust ' + m.gust_kmh)) }) } })
      // 5. decisions in effect
      var nodes = {}; d.graph.nodes.forEach(function (n) { nodes[n.id] = n })
      var fx = d.graph.edges.filter(function (e) { return e.by !== 'ipma' && e.effect_from_utc && (e.effect_to_utc ? clip(T(e.effect_from_utc), T(e.effect_to_utc)) : T(e.effect_from_utc) >= d0 && T(e.effect_from_utc) < d1) })   // no stated end: drawn only on the day it starts, never carried into the next
      grp('Decided', fx.length + ' decisions with stated hours that touch this day')
      fx.forEach(function (e) { var k = clip(T(e.effect_from_utc), e.effect_to_utc ? T(e.effect_to_utc) : d1); bands.push({ name: short(((nodes[e.by] || {}).name || e.by).split(' (')[0], c.phone ? 15 : 32), h: 22, draw: function (g, y) { var q = s('g', {}); q.appendChild(s('rect', { x: sc(k[0]), y: y + 3, width: Math.max(2, sc(k[1]) - sc(k[0])), height: 16, rx: 2, class: 'fx' + (e.effect_to_utc ? '' : ' fx-open') })); q.appendChild(s('text', { x: sc(k[0]) + 4, y: y + 15, class: 't-val', text: short(e.decision, Math.floor((sc(k[1]) - sc(k[0])) / 6.3)) })); g.appendChild(L.mark(q, L.edgeItem(e, nodes), e.decision.slice(0, 60))) } }) })
      // 6. our analysis: a hypothesis, dashed, and only for the day it speaks of
      var an = (d.analysis.updates || []).filter(function (u) { return u.worst_window_utc }).pop() || d.analysis.wednesday_lisbon, ww = an && an.worst_window_utc && clip(T(an.worst_window_utc[0]), T(an.worst_window_utc[1])), pk = an && an.likely_peak_utc && clip(T(an.likely_peak_utc[0]), T(an.likely_peak_utc[1]))
      if (ww || pk) {
        grp('Our analysis', 'a hypothesis by the team\'s meteorologist, not a forecast')
        var hypBand = function (name, k, key) { bands.push({ name: name, h: 24, draw: function (g, y) { var q = s('g', {}); q.appendChild(s('rect', { x: sc(k[0]), y: y + 3, width: sc(k[1]) - sc(k[0]), height: 18, class: 'hyp-bar' })); q.appendChild(s('rect', { x: sc(k[0]), y: y + 3, width: sc(k[1]) - sc(k[0]), height: 18, class: 'hit' })); q.appendChild(s('text', { x: sc(k[0]) + 5, y: y + 16, class: 'hyp-t', text: 'HYPOTHESIS: ' + name.toLowerCase() })); g.appendChild(L.mark(q, L.valueItem('hyp:' + key, { type: 'analysis', label: 'hypothesis', title: name + ', ' + L.dhm(k[0]) + ' to ' + L.hm(k[1]), when: an.written_utc || d.analysis.written_utc, whenName: 'Written', facts: [['Confidence', an.confidence ? 'window ' + an.confidence.window + '; peak hour and strength ' + an.confidence.peak_hour_and_strength : 'not stated'], ['Why', [].concat(an.why || []).join(' · ')], ['Label', 'Our reasoning from the facts in the weather folder; not IPMA\'s words. For the warning itself, IPMA.']], sources: [{ label: 'weather/analysis.json', url: null }], read: an.based_on_read_utc, by: d.analysis.by, file: L.DATA + 'weather/analysis.json' }), 'Hypothesis: ' + name)) } }) }
        if (ww) hypBand('Worst window', ww, 'worst'); if (pk) hypBand('Likely peak', pk, 'peak')
      }
      var top = 38, y = top, total = bands.reduce(function (a, b) { return a + (b.head ? 24 : b.h) }, top) + 8, g = L.svg(W, total, 'The day in bands, hour by hour')
      L.axis(g, sc, top, total - 8)
      bands.forEach(function (b) {
        if (b.head) { g.appendChild(s('rect', { x: 0, y: y + 3, width: W, height: 20, class: 'lane-bg' })); g.appendChild(s('text', { x: 6, y: y + 18, class: 'lane-name', text: b.head })); g.appendChild(s('text', { x: lab + 4, y: y + 18, class: 'lane-sub', text: b.sub })); y += 24; return }
        g.appendChild(s('text', { x: 14, y: y + b.h / 2 + 4, class: 't-small', text: b.name })); b.draw(g, y); y += b.h
      })
      var rl = T(d.warnings.read_utc); if (rl > d0 && rl < d1) { g.appendChild(s('line', { x1: sc(rl), x2: sc(rl), y1: top - 10, y2: total - 8, class: 'readline' })); g.appendChild(s('text', { x: sc(rl) + 4, y: total - 1, class: 'readline-t', text: 'data read ' + L.hm(rl) })) }
      c.el.appendChild(g)
      c.el.appendChild(L.legend([['lg-red', 'IPMA red'], ['lg-orange', 'IPMA orange'], ['lg-yellow', 'IPMA yellow'], ['lg-kept', 'rebuilt: a warning that has left the feed, from our record'], ['lg-fc', 'a forecast (dashed edge): IPMA\'s or the airport\'s, never ours'], ['lg-obs', 'observed (blue, solid)'], ['lg-fx', 'a decision in effect'], ['lg-hypothesis', 'our hypothesis (dashed, and it says so)']]))
      c.el.appendChild(h('p', { class: 'meta', text: (perUnit ? 'Shading, one scale per unit: km/h cells run from 0 to ' + MAXU['km/h'] + ' (the highest mean wind in these files), mm from 0 to ' + MAXU.mm + ', % from 0 to 100, m from 0 to ' + MAXU.m + '; grey is forecast, blue is measured, and the same depth means the same number within a unit. Gusts are not shaded: they are a different quantity from mean wind. ' : 'Shading: each band against its own maximum, so depth cannot be compared between bands. ') + (kept ? 'Warned bands here come from the CAP messages we kept (first read ' + L.dhm(T(d.cap.reads_utc.slice().sort()[0])) + '): a message replaced and dropped before that read is not in our record, so this day may have had warnings we cannot show. ' : '') + 'Observed hours are drawn in the hour ending at IPMA\'s label (our reading of an undocumented label; the data file explains why). Not a warning service: for the warning itself, IPMA.' }))
    }
  }
  L.exp('weather/day-bands', dayBands)
  // the same strip opened on Tuesday, built only from what the files still hold (asked for by incident.weather@)
  L.exp('weather/day-rebuilt', { needs: dayBands.needs, setup: dayBands.setup, draw: dayBands.draw, init: { day: '2026-11-10', warned: 'kept', shade: 'unit' } })

  // ---- the forecast models side by side, as the hypotheses about the future that they are
  L.exp('weather/models', {
    needs: ['forecast', 'stations', 'rain', 'airport', 'warnings'],
    draw: function (c) {
      var d = c.data, f = d.forecast, W = Math.max(c.W - 22, c.phone ? 860 : 760), padL = 46, padR = c.phone ? 20 : 170
      var models = [
        { key: 'ipma', name: 'IPMA hourly (run ' + String(f.hourly.updated_local).slice(5, 16).replace('T', ' ') + ')', dash: '7 3', rows: f.hourly.rows, src: f.hourly.source, read: f.hourly.read_utc, lic: 'IPMA' },
        { key: 'ipma0', name: 'IPMA hourly, earlier run (' + String(f.hourly_runs[0].updated_local).slice(5, 16).replace('T', ' ') + ')', dash: '2 3', rows: f.hourly_runs[0].wed_rows, src: f.hourly_runs[0].source, read: f.hourly_runs[0].read_utc, lic: 'IPMA' },
        { key: 'met_no', name: 'MET Norway', dash: '10 3 2 3', rows: f.second_models.met_no.rows, src: f.second_models.met_no.source, read: f.second_models.met_no.read_utc, lic: f.second_models.met_no.licence },
        { key: 'open_meteo', name: 'Open-Meteo', dash: '4 4', rows: f.second_models.open_meteo.rows, src: f.second_models.open_meteo.source, read: f.second_models.open_meteo.read_utc, lic: f.second_models.open_meteo.licence }]
      var geo = d.stations.stations[0], t0 = T('2026-11-10T00:00Z'), t1 = T('2026-11-12T12:00Z'), sc = L.scale(t0, t1, padL, W - padR)
      function fcItem(m, r, what) { return L.valueItem('fc:' + m.key + ':' + r.time_utc, { type: 'a model\'s forecast (theirs, not ours)', label: 'hypothesis', title: m.name + ' for ' + L.dhm(T(r.time_utc)) + ': mean wind ' + r.wind_mean_kmh + ' km/h' + (r.gust_kmh != null ? ', gusts ' + r.gust_kmh + ' km/h' : '') + ((r.rain_mm != null ? r.rain_mm : r.rain_mm_next_1h) != null ? ', rain ' + (r.rain_mm != null ? r.rain_mm : r.rain_mm_next_1h) + ' mm' : ''), when: r.time_utc, whenName: 'Forecast for', facts: [['Model', m.name], ['Licence', m.lic], ['Label', 'A model\'s statement about the future: it is a fact that the model said this, and a hypothesis that it will happen. We make no forecast.']], sources: [{ label: L.host(m.src), url: m.src }], read: m.read, file: L.DATA + 'weather/forecast.json' }) }
      function chart(title, unit, maxV, series, extra) {
        var step = maxV / 4, dmax = Math.max.apply(null, [0].concat([].concat.apply([], series.map(function (se) { return se.rows.filter(function (r) { var t = T(r.time_utc); return t >= t0 && t <= t1 }).map(function (r) { return se.val(r) || 0 }) })))); maxV = Math.max(maxV, Math.ceil(dmax / step) * step)
        var top = 34, ht = c.phone ? 200 : 280, g = L.svg(W, top + ht + 26, title), ys = function (v) { return top + ht - v / maxV * ht }
        L.axis(g, sc, top, top + ht)
        for (var v = 0; v <= maxV; v += step) { g.appendChild(s('line', { x1: padL, x2: W - padR, y1: ys(v), y2: ys(v), class: 'ax-h' })); g.appendChild(s('text', { x: padL - 6, y: ys(v) + 3, class: 'ax-t', 'text-anchor': 'end', text: Math.round(v) })) }
        g.appendChild(s('text', { x: 4, y: top - 20, class: 't-small', text: unit }))
        if (extra) extra(g, ys, top, ht)
        var ends = []
        series.forEach(function (se) {
          var pts = se.rows.filter(function (r) { var t = T(r.time_utc); return t >= t0 && t <= t1 && se.val(r) != null }).map(function (r) { return [sc(T(r.time_utc)), ys(Math.min(maxV, se.val(r))), r] })
          if (!pts.length) return
          if (se.bars) pts.forEach(function (p) { g.appendChild(s('rect', { x: p[0] - 3, y: p[1], width: 6, height: top + ht - p[1], class: 'obs-bar' })) })
          else if (se.points) pts.forEach(function (p) { g.appendChild(s('circle', { cx: p[0], cy: p[1], r: 3.5, class: 'obs-dot' })) })
          else g.appendChild(s('path', { d: path(pts), class: se.cls, 'stroke-dasharray': se.dash || null }))
          pts.forEach(function (p) { g.appendChild(L.mark(s('circle', { cx: p[0], cy: p[1], r: 7, class: 'hit', title: se.name + ' · ' + L.dhm(T(p[2].time_utc)) + ' · ' + se.val(p[2]) + ' ' + unit }), se.item(p[2]), se.name + ' ' + L.dhm(T(p[2].time_utc)))) })
          ends.push({ y: pts[pts.length - 1][1], x: pts[pts.length - 1][0], name: se.name, hyp: !!se.dash })
        })
        // direct labels at the line ends, pushed apart
        if (!c.phone) {
          ends.filter(function (e) { return e.x < W - padR - 120 }).forEach(function (e) { g.appendChild(s('text', { x: e.x + 8, y: e.y - 6, class: 't-small', text: e.name })) })
          ends = ends.filter(function (e) { return e.x >= W - padR - 120 }).sort(function (a, b) { return a.y - b.y })
          ends.forEach(function (e, i) { if (i && e.y - ends[i - 1].ly < 13) e.ly = ends[i - 1].ly + 13; else e.ly = e.y; g.appendChild(s('line', { x1: e.x + 2, x2: W - padR + 6, y1: e.y, y2: e.ly, class: 'ax-h' })); g.appendChild(s('text', { x: W - padR + 8, y: e.ly + 4, class: e.hyp ? 'hyp-t' : 't-small', text: short(e.name, 27) })) })
        }
        c.el.appendChild(h('h3', { text: title })); c.el.appendChild(g)
      }
      var obsWind = { name: 'Observed: ' + geo.name, cls: 'obs-line', rows: geo.hourly, val: function (r) { return r.wind_mean_kmh }, item: function (r) { return obsItem(geo, r, 'weather/stations.json', geo.source, geo.read_utc) } }
      var rainHours = function (x) { return x.hourly.filter(function (r) { return r.rain_mm != null }).length }
      var rainSt = d.rain.stations.filter(function (x) { return x.id === geo.id && rainHours(x) > x.hourly.length / 2 })[0] || d.rain.stations.filter(function (x) { return /^Lisboa/.test(x.name) }).sort(function (a, b) { return rainHours(b) - rainHours(a) })[0] || d.rain.stations[0]
      var gusts = d.airport.metars.filter(function (m) { return m.gust_kmh }), lastMetar = d.airport.metars[d.airport.metars.length - 1], lastGust = gusts[gusts.length - 1]
      var red = d.warnings.lisbon.map(function (w, i) { return { w: w, i: i } }).filter(function (q) { return /^(red|orange|yellow)$/.test(q.w.level) })
      var redStrip = function (type) { return function (g, ys, top, ht) { red.forEach(function (q) { if (L.wtype(q.w.type) !== type) return; var a = Math.max(t0, T(q.w.start_utc)), b = Math.min(t1, T(q.w.end_utc)); if (b <= a) return; L.mark(L.levelBar(g, sc(a), top + ht + 5, sc(b) - sc(a), 13, q.w.level, q.w.level.toUpperCase() + ' ' + q.w.type.toUpperCase() + ' (IPMA)'), L.warnItem(q.w, q.i), 'IPMA ' + q.w.level + ' ' + q.w.type) }) } }
      chart('Mean wind in Lisbon: four model runs and what was measured', 'km/h', 60, models.map(function (m) { return { name: m.name, cls: 'fc-line', dash: m.dash, rows: m.rows, val: function (r) { return r.wind_mean_kmh }, item: function (r) { return fcItem(m, r) } } }).concat([obsWind]), redStrip('wind'))
      chart('Gusts: the one model that gives them here, and the airport\'s measurements', 'km/h', 140, [{ name: 'Open-Meteo gusts', cls: 'fc-line', dash: '4 4', rows: models[3].rows, val: function (r) { return r.gust_kmh }, item: function (r) { return fcItem(models[3], r) } }, { name: 'Observed: airport gusts', points: true, rows: gusts, val: function (r) { return r.gust_kmh }, item: function (m) { return L.valueItem('metar:' + m.time_utc, { type: 'observation, Lisbon airport (METAR)', label: 'fact', title: 'Gust ' + m.gust_kmh + ' km/h, wind ' + m.wind_kmh + ' km/h', when: m.time_utc, facts: [['Raw', m.raw]], sources: [{ label: 'METAR LPPT via NOAA Aviation Weather', url: m.source }], read: m.read_utc, file: L.DATA + 'weather/airport.json' }) } }], function (g, ys, top, ht) { redStrip('wind')(g, ys, top, ht); red.forEach(function (q) { if (L.wtype(q.w.type) !== 'wind') return; var m = String(q.w.text_pt).match(/(\d+)\s*km\/h/); if (!m) return; var a = Math.max(t0, T(q.w.start_utc)), b = Math.min(t1, T(q.w.end_utc)), y = ys(+m[1]); if (b <= a) return; g.appendChild(s('line', { x1: sc(a), x2: sc(b), y1: y, y2: y, style: 'stroke: var(--' + q.w.level + '); stroke-width: 2' })); g.appendChild(s('text', { x: Math.min(sc(a), W - padR - 330), y: y - 5, class: 't-small', text: 'IPMA\'s ' + q.w.level + ' wind warning, in its words: "' + q.w.text_pt + '"' })) }) })
      chart('Rain in the hour: two models and what fell at ' + rainSt.name, 'mm', 12, [{ name: 'Observed: ' + rainSt.name, bars: true, rows: rainSt.hourly, val: function (r) { return r.rain_mm }, item: function (r) { return obsItem(rainSt, r, 'weather/lisbon-rain.json', rainSt.source, rainSt.read_utc) } }, { name: 'MET Norway', cls: 'fc-line', dash: '10 3 2 3', rows: models[2].rows, val: function (r) { return r.rain_mm_next_1h }, item: function (r) { return fcItem(models[2], r) } }, { name: 'Open-Meteo', cls: 'fc-line', dash: '4 4', rows: models[3].rows, val: function (r) { return r.rain_mm }, item: function (r) { return fcItem(models[3], r) } }], redStrip('rain'))
      c.el.appendChild(L.legend([['lg-fc', 'a model\'s forecast: dashed, named at the line, a hypothesis about the future'], ['lg-obs', 'measured (solid; gusts as points)'], ['lg-rain', 'rain measured in the hour'], ['lg-red', 'IPMA red warning in force'], ['lg-orange', 'IPMA orange'], ['lg-yellow', 'IPMA yellow']]))
      c.el.appendChild(h('p', { class: 'meta' }, 'None of these lines is our forecast: we are not a warning service. Models: IPMA; ', models[2].lic, '; ', models[3].lic, '. Under each chart, IPMA\'s warnings for Lisbon as last read (' + L.dhm(T(d.warnings.read_utc)) + '), at the level they have now: a warning that was changed is shown as it stands, not as it was. Each scale grows to fit its highest value. The airport reports a gust only when there is one, so its gusts are points, not a line: ' + gusts.length + ' of the ' + d.airport.metars.length + ' reports kept carry one' + (lastGust ? ', the latest at ' + L.dhm(T(lastGust.time_utc)) : '') + '; the latest report read is ' + L.dhm(T(lastMetar.time_utc)) + '. Rain is drawn for ' + rainSt.name + (rainSt.id !== geo.id ? ', because ' + geo.name + ' (the wind station) reports no rain in this file' : '') + '.'))
    }
  })
})()
