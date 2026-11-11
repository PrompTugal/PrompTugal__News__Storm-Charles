// Labs, timelines (incident.labs@web-summit.dinis): lanes, known-when, story. Data: signals.json, decisions/graph.json, weather/cap.json.
(function () {
  'use strict'
  var L = window.Labs, h = L.h, s = L.s, T = L.T, H = L.H

  // The lane of a timeline row. signals.json has no actor field: this sorting is ours (a keyword match on the row's source and
  // first words), and the page says so.
  var LANES = [['ipma', 'IPMA', 'warnings, communiqués, forecasts'], ['civil', 'ANEPC and government', 'civil protection, ministers'], ['ws', 'Web Summit', 'the organisers\' own pages'], ['press', 'Press and public posts', 'reported by others'], ['team', 'Our team', 'what we did, when'], ['hyp', 'Our analysis', 'hypotheses, never fact']]
  function laneOf(x) {
    if (x.label === 'hypothesis') return 'hyp'
    if (x.kind === 'team') return 'team'
    var src = (x.sources || []).map(function (q) { return (q.label || '') + ' ' + (q.url || '') }).join(' ')
    if (x.kind === 'official') {
      if (/websummit/i.test(src)) return 'ws'
      if (/ANEPC|prociv|gov\.pt|Government/i.test(src + ' ' + x.text.slice(0, 40))) return 'civil'
      return 'ipma'
    }
    return 'press'
  }

  L.exp('timelines/lanes', {
    needs: ['signals'],
    setup: function (c) {
      L.choice(c.tools, 'axis', [['time', 'Even time'], ['order', 'Even spacing (in order)']], c.state, c.redraw)
      L.choice(c.tools, 'span', [['all', 'All'], ['tue', 'Tue 10 from 12:00'], ['last', 'Last 8 h']], c.state, c.redraw)
    },
    draw: function (c) {
      var rows = c.data.signals.items.map(function (x) { return { x: x, t: T(x.at), lane: laneOf(x), id: L.signalItem(x) } }).sort(function (a, b) { return a.t - b.t })
      var tMax = rows[rows.length - 1].t
      if (c.state.span === 'tue') rows = rows.filter(function (r) { return r.t >= T('2026-11-10T12:00Z') })
      if (c.state.span === 'last') rows = rows.filter(function (r) { return r.t >= tMax - 8 * H })
      var lab = c.phone ? 96 : 190, W = Math.max(c.W - 22, c.phone ? 900 : 700), x0 = lab + 12, x1 = W - 16
      var t0 = Math.floor(rows[0].t / H) * H, t1 = Math.ceil((rows[rows.length - 1].t + 1) / H) * H
      var sc = L.scale(t0, t1, x0, x1), order = c.state.axis === 'order'
      rows.forEach(function (r, i) { r.px = order ? x0 + 10 + i * (x1 - x0 - 20) / Math.max(1, rows.length - 1) : sc(r.t) })
      // stack marks that would overlap inside a lane
      var R = 7, layout = LANES.map(function (ln) {
        var mine = rows.filter(function (r) { return r.lane === ln[0] }), levels = []
        mine.forEach(function (r) { var k = 0; while (levels[k] != null && r.px - levels[k] < 2 * R + 3) k++; levels[k] = r.px; r.k = k })
        return { ln: ln, rows: mine, depth: Math.max(1, levels.length) }
      })
      var top = 44, y = top, ROWH = 2 * R + 6
      layout.forEach(function (l) { l.y = y; l.h = l.depth * ROWH + 14; y += l.h + 4 })
      var g = L.svg(W, y + 26, 'The timeline in lanes by who spoke')
      layout.forEach(function (l, i) {
        if (i % 2 === 0) g.appendChild(s('rect', { x: 0, y: l.y, width: W, height: l.h, class: 'lane-bg' }))
        g.appendChild(s('text', { x: 6, y: l.y + 17, class: 'lane-name', text: l.ln[1] + ' (' + l.rows.length + ')' }))
        if (!c.phone) g.appendChild(s('text', { x: 6, y: l.y + 31, class: 'lane-sub', text: l.ln[2] }))
      })
      if (!order) L.axis(g, sc, top, y)
      else rows.forEach(function (r, i) { if (i === 0 || r.px - rows[i - 1].lastTick >= 46 || i === rows.length - 1) { g.appendChild(s('line', { x1: r.px, x2: r.px, y1: top, y2: y, class: 'ax-h' })); g.appendChild(s('text', { x: r.px, y: top - 4, class: 'ax-t', 'text-anchor': 'middle', text: L.hm(r.t) })); g.appendChild(s('text', { x: r.px, y: top - 16, class: 'ax-t', 'text-anchor': 'middle', text: L.day(r.t).slice(0, 6) })); r.lastTick = r.px } else r.lastTick = rows[i - 1].lastTick })
      layout.forEach(function (l) {
        l.rows.forEach(function (r) {
          var cy = l.y + 7 + R + r.k * ROWH, d = L.dot(r.px, cy, r.x.decision ? R - 1.5 : R - 1, r.x.label, r.x.decision)
          if (r.x.key) d.classList.add('key')
          d.appendChild(s('title', { text: L.dhm(r.t) + ' · ' + r.x.label + ' · ' + r.x.text }))
          g.appendChild(L.mark(d, r.id, L.dhm(r.t) + ', ' + r.x.label + ': ' + r.x.text.slice(0, 80)))
        })
      })
      c.el.appendChild(g)
      c.el.appendChild(L.legend(L.LABELS.concat([['lg-fact', 'thick ring: a key row']])))
      c.el.appendChild(h('p', { class: 'meta', text: rows.length + ' rows of the timeline. The lane is our sorting, by a keyword match on each row\'s source; the timeline itself has no actor column.' }))
    }
  })

  // ---- what was known when: the warnings and decisions as they stood at any minute
  L.exp('timelines/known-when', {
    needs: ['signals', 'graph', 'cap'],
    setup: function (c) {
      var d = c.data, rows = d.signals.items, t0 = T('2026-11-09T12:00Z'), t1 = Math.ceil(T(rows[rows.length - 1].at) / H) * H + H
      c.state.t = c.state.t || T('2026-11-10T19:09Z'); c.state.t0 = t0; c.state.t1 = t1
      var out = h('output', {}), rg = h('input', { type: 'range', min: 0, max: (t1 - t0) / 60e3, step: 1, 'aria-label': 'The minute to rebuild' })
      function set(t) { c.state.t = Math.min(t1, Math.max(t0, t)); rg.value = (c.state.t - t0) / 60e3; out.textContent = L.dhm(c.state.t) + ' UTC'; c.redraw() }
      rg.addEventListener('input', function () { set(t0 + rg.value * 60e3) })
      var times = rows.map(function (x) { return T(x.at) }).concat(d.cap.lisbon_messages.map(function (m) { return T(m.sent_utc) }), d.graph.edges.map(function (e) { return T(e.at) })).filter(function (t) { return !isNaN(t) }).sort(function (a, b) { return a - b })
      var step = function (dir) { return function () { var t = dir > 0 ? times.find(function (x) { return x > c.state.t }) : times.slice().reverse().find(function (x) { return x < c.state.t }); if (t != null) set(t) } }
      c.tools.appendChild(h('div', { class: 'scrub' }, h('button', { type: 'button', text: '◀ previous change', on: { click: step(-1) } }), rg, h('button', { type: 'button', text: 'next change ▶', on: { click: step(1) } }), out))
      var jumps = h('fieldset', { class: 'lab-choice' }, h('legend', { text: 'Jump to' }))
      ;[['2026-11-10T07:18Z', 'red wind sent'], ['2026-11-10T09:17Z', 'alert announced'], ['2026-11-10T17:53Z', 'PM recommends'], ['2026-11-10T19:09Z', 'Web Summit decides'], ['2026-11-10T21:23Z', 'red rain moved']].forEach(function (j) { jumps.appendChild(h('button', { type: 'button', text: j[1], on: { click: function () { set(T(j[0])) } } })) })
      c.tools.appendChild(jumps)
      rg.value = (c.state.t - t0) / 60e3; out.textContent = L.dhm(c.state.t) + ' UTC'
    },
    draw: function (c) {
      var d = c.data, t = c.state.t, nodes = {}; d.graph.nodes.forEach(function (n) { nodes[n.id] = n })
      // the CAP messages for Lisbon that stood at t: sent by then, and not replaced by a message sent by then
      var msgs = d.cap.lisbon_messages, replaced = {}
      msgs.forEach(function (m) { if (T(m.sent_utc) <= t) (m.replaces || []).forEach(function (r) { replaced[r.identifier] = m }) })
      var stood = msgs.filter(function (m) { return T(m.sent_utc) <= t && !replaced[m.identifier] && T(m.expires_utc) > t })
      var TYPES = [['wind', 'Wind'], ['rain', 'Rain'], ['sea', 'Sea'], ['thunder', 'Thunder']]
      var lab = 70, W = Math.max(c.W - 22, 640), a0 = T('2026-11-09T12:00Z'), a1 = T('2026-11-12T06:00Z'), sc = L.scale(a0, a1, lab, W - 12), top = 40, RH = 26
      var g = L.svg(W, top + TYPES.length * RH + 22, 'IPMA warnings for Lisbon as they stood at the chosen minute')
      L.axis(g, sc, top, top + TYPES.length * RH)
      TYPES.forEach(function (ty, i) {
        var y = top + i * RH; g.appendChild(s('text', { x: 4, y: y + 17, class: 'lane-name', text: ty[1] })); g.appendChild(s('line', { x1: lab, x2: W - 12, y1: y + RH, y2: y + RH, class: 'lane-line' }))
        stood.filter(function (m) { return L.wtype(m.event_pt) === ty[0] }).forEach(function (m) {
          var xa = sc(Math.max(a0, T(m.onset_utc))), xb = sc(Math.min(a1, T(m.expires_utc))), lv = L.level(m.event_pt)
          L.mark(L.levelBar(g, xa, y + 4, xb - xa, RH - 8, lv, lv.toUpperCase() + ' ' + L.dhm(T(m.onset_utc)) + ' to ' + L.dhm(T(m.expires_utc))), L.capItem(m), m.event_pt)
        })
      })
      var xt = sc(t); g.appendChild(s('line', { x1: xt, x2: xt, y1: top - 12, y2: top + TYPES.length * RH + 4, class: 'readline' })); g.appendChild(s('text', { x: xt + 4, y: top + TYPES.length * RH + 16, class: 'readline-t', text: 'the chosen minute' }))
      c.el.appendChild(h('h3', { text: 'IPMA\'s warnings for Lisbon, as they stood at ' + L.dhm(t) })); c.el.appendChild(g)
      c.el.appendChild(L.legend([['lg-red', 'IPMA red'], ['lg-orange', 'IPMA orange'], ['lg-yellow', 'IPMA yellow']]))
      if (t < T(d.cap.reads_utc[0])) c.el.appendChild(h('p', { class: 'meta', text: 'Before our first read of the feed (' + L.dhm(T(d.cap.reads_utc.slice().sort()[0])) + ') this is rebuilt from the messages that were still in the feed then: a warning replaced and dropped before that read is missing here.' }))
      // decisions and rows by then
      var card = function (e) { var b = h('button', { type: 'button', class: 'lc l-' + e.label + ' st-' + e.status }, h('span', { class: 'tm', text: L.when(e.at) }), h('span', { class: 'lbl l-' + e.label, text: e.label }), h('b', { text: (nodes[e.by] || {}).name || e.by }), e.decision.length > 150 ? e.decision.slice(0, 150) + '…' : e.decision); return L.mark(b, L.edgeItem(e, nodes)) }
      var known = d.graph.edges.filter(function (e) { var te = T(e.at); return !isNaN(te) && (L.dayOnly(e.at) ? te + L.DAY : te) <= t && e.label !== 'hypothesis' }).sort(function (a, b) { return T(b.at) - T(a.at) })
      var rows = d.signals.items.filter(function (x) { return T(x.at) <= t }).reverse()
      var hyp = rows.filter(function (x) { return x.label === 'hypothesis' })
      var rowCard = function (x) { return L.mark(h('button', { type: 'button', class: 'lc l-' + x.label }, h('span', { class: 'tm', text: L.dhm(T(x.at)) }), h('span', { class: 'lbl l-' + x.label, text: x.label }), ' ', x.text.length > 170 ? x.text.slice(0, 170) + '…' : x.text), L.signalItem(x)) }
      c.el.appendChild(h('div', { class: 'cols' },
        h('section', {}, h('h3', { text: 'Decided and warned by then (' + known.length + ')' }), known.length ? known.slice(0, 12).map(card) : h('p', { class: 'lab-empty', text: 'Nothing yet.' }), known.length > 12 ? h('p', { class: 'lab-empty', text: 'and ' + (known.length - 12) + ' earlier.' }) : null),
        h('section', {}, h('h3', { text: 'On our timeline by then (' + rows.length + ' rows)' }), rows.filter(function (x) { return x.label !== 'hypothesis' }).slice(0, 8).map(rowCard)),
        h('section', {}, h('h3', { text: 'Our hypotheses by then (' + hyp.length + ')' }), hyp.length ? hyp.slice(0, 6).map(rowCard) : h('p', { class: 'lab-empty', text: 'None written yet.' }))))
    }
  })

  // ---- the story: decisions only, top to bottom, warnings on the left and what was decided on them on the right
  L.exp('timelines/story', {
    needs: ['graph'],
    setup: function (c) { L.choice(c.tools, 'show', [['timed', 'Announced, with a time'], ['all', 'Also day-only and not announced']], c.state, c.redraw) },
    draw: function (c) {
      var nodes = {}; c.data.graph.nodes.forEach(function (n) { nodes[n.id] = n })
      var es = c.data.graph.edges.filter(function (e) { return e.label !== 'hypothesis' && !isNaN(T(e.at)) && (c.state.show === 'all' || (!L.dayOnly(e.at) && e.status === 'happened')) }).sort(function (a, b) { return (T(a.at) + (L.dayOnly(a.at) ? L.DAY - 1 : 0)) - (T(b.at) + (L.dayOnly(b.at) ? L.DAY - 1 : 0)) })
      var st = h('div', { class: 'story' }, h('div', { class: 'colhead c-l', text: 'Those who warn (IPMA, civil protection, other authorities)' }), h('div', { class: 'sp' }), h('div', { class: 'colhead c-r', text: 'Those who decide for their own service' }))
      var lastDay = '', last = NaN, r = 1
      Array.prototype.forEach.call(st.children, function (ch) { ch.style.gridRow = '1' })
      function put(el) { el.style.gridRow = String(r); st.appendChild(el) }
      es.forEach(function (e) {
        var t = T(e.at), dy = L.day(t), warn = (nodes[e.by] || {}).kind === 'authority'
        if (dy !== lastDay) { r++; put(h('div', { class: 'sp dayhead' }, h('span', { text: dy }))); lastDay = dy; last = NaN }
        else if (!L.dayOnly(e.at) && !isNaN(last) && t - last >= 45 * 60e3) { r++; put(h('div', { class: 'sp gap' }, h('span', { text: L.dur(t - last) + ' later' }))) }
        var fx = e.effect_from_utc || e.effect_to_utc ? 'In effect ' + (e.effect_from_utc ? L.dhm(T(e.effect_from_utc)) : '(start not stated)') + ' to ' + (e.effect_to_utc ? L.dhm(T(e.effect_to_utc)) : '(end not stated)') : ''
        var b = h('button', { type: 'button', class: 'lc l-' + e.label + ' st-' + e.status }, h('b', {}, (nodes[e.by] || {}).name || e.by, h('span', { class: 'lbl l-' + e.label, text: e.label }), e.status !== 'happened' ? h('span', { class: 'lbl', text: e.status.replace('_', ' ') }) : null), e.decision, fx ? h('span', { class: 'fxt', text: fx }) : null, e.follows.length ? h('span', { class: 'fxt', text: 'Follows: ' + e.follows.join(', ') }) : null)
        r++
        put(h('div', { class: 'sp' }, h('span', { text: L.dayOnly(e.at) ? 'no hour' : L.hm(t) })))
        put(h('div', { class: warn ? 'c-l' : 'c-r' }, L.mark(b, L.edgeItem(e, nodes))))
        if (!L.dayOnly(e.at)) last = t
      })
      c.el.appendChild(st)
      c.el.appendChild(h('p', { class: 'meta', text: es.length + ' edges of the decision graph. A thick border is a fact (read at the body that decided), a thin one is evidence (reported by others), a dotted one was due and not announced when read.' }))
    }
  })
})()
