// Labs, timelines (incident.labs@web-summit.dinis): lanes, known-when, story. Data: signals.json, decisions/graph.json, weather/cap.json.
(function () {
  'use strict'
  var L = window.Labs, h = L.h, s = L.s, T = L.T, H = L.H

  // The lane of a timeline row: who published its source, from incident.graph@'s table (data/graph/tables/signals.json, joined on
  // the row id) and the kind of that actor (tables/actors.json). The grouping into six lanes is ours; the publisher is the data's.
  var LANES = [['body', 'Bodies that warn and decide', 'IPMA, ANEPC, the government'], ['carrier', 'Carriers of official data', 'MeteoAlarm, aviation weather'], ['organiser', 'Web Summit', 'the organisers\' own pages'], ['outlet', 'Press and public posts', 'reported by others'], ['team', 'Our team', 'this site, or no public address'], ['hyp', 'Our analysis', 'hypotheses, never fact']]
  function laneOf(x, pub, actors) {
    if (x.label === 'hypothesis') return 'hyp'
    if (!pub || /promptugal\.news/.test(pub) || x.kind === 'team') return 'team'
    var a = actors[pub]; if (a && a.kind === 'organiser') return 'organiser'
    if (a && a.kind === 'body') return 'body'
    if (/^actor:host:/.test(pub)) return x.kind === 'official' ? 'carrier' : 'outlet'
    return a && a.kind === 'outlet' ? 'outlet' : x.kind === 'official' ? 'body' : 'outlet'
  }

  L.exp('timelines/lanes', {
    needs: ['signals', 'sigtab', 'actors'],
    setup: function (c) {
      L.choice(c.tools, 'axis', [['time', 'Even time'], ['order', 'Even spacing (in order)']], c.state, c.redraw)
      L.choice(c.tools, 'span', [['all', 'All'], ['tue', 'Tue 10 from 12:00'], ['last', 'Last 8 h']], c.state, c.redraw)
    },
    draw: function (c) {
      var pubs = {}, actors = {}; c.data.sigtab.rows.forEach(function (r) { pubs[r.id] = r.publisher }); c.data.actors.rows.forEach(function (a) { actors[a.id] = a })
      var rows = c.data.signals.items.map(function (x) { var pub = pubs['signal:' + x.id]; return { x: x, t: T(x.at), pub: (actors[pub] || {}).name || (pub ? pub.replace(/^actor:(host:|outlet:)?/, '') : 'no public address'), lane: laneOf(x, pub, actors), id: L.signalItem(x, (actors[pub] || {}).name || pub) } }).sort(function (a, b) { return a.t - b.t })
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
          d.appendChild(s('title', { text: L.dhm(r.t) + ' · ' + r.pub + ' · ' + r.x.label + ' · ' + r.x.text }))
          g.appendChild(L.mark(d, r.id, L.dhm(r.t) + ', ' + r.x.label + ': ' + r.x.text.slice(0, 80)))
        })
      })
      c.el.appendChild(g)
      c.el.appendChild(L.legend(L.LABELS.concat([['lg-fact', 'thick ring: a key row']])))
      c.el.appendChild(h('p', { class: 'meta', text: rows.length + ' rows of the timeline. Who published each row\'s source comes from the graph\'s table of signals (incident.graph@), joined on the row id; grouping the publishers into six lanes is ours.' }))
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
      var times = rows.map(function (x) { return T(x.at) }).concat(d.cap.lisbon_messages.concat(d.cap.other_messages.filter(function (m) { return /Madeira/.test(m.areas.join()) })).map(function (m) { return T(m.sent_utc) }), d.graph.edges.map(function (e) { return T(e.at) })).filter(function (t) { return !isNaN(t) }).sort(function (a, b) { return a - b })
      var step = function (dir) { return function () { var t = dir > 0 ? times.find(function (x) { return x > c.state.t }) : times.slice().reverse().find(function (x) { return x < c.state.t }); if (t != null) set(t) } }
      c.tools.appendChild(h('div', { class: 'scrub' }, h('button', { type: 'button', text: '◀ previous change', on: { click: step(-1) } }), rg, h('button', { type: 'button', text: 'next change ▶', on: { click: step(1) } }), out))
      var jumps = h('fieldset', { class: 'lab-choice' }, h('legend', { text: 'Jump to' }))
      ;[['2026-11-10T07:18Z', 'red wind sent'], ['2026-11-10T09:17Z', 'alert announced'], ['2026-11-10T17:53Z', 'PM recommends'], ['2026-11-10T19:09Z', 'Web Summit decides'], ['2026-11-10T21:23Z', 'red rain moved']].concat(
        // later turns are taken from the data, not written here: the wind change from the graph, the last read of IPMA's feed from cap.json
        d.graph.edges.filter(function (e) { return e.id === 'ipma-wind-orange' && e.at }).map(function (e) { return [e.at, 'wind changed'] }),
        d.cap.read_utc ? [[d.cap.read_utc, 'latest read']] : []).forEach(function (j) { jumps.appendChild(h('button', { type: 'button', text: j[1], on: { click: function () { set(T(j[0])) } } })) })
      c.tools.appendChild(jumps)
      L.choice(c.tools, 'where', [['lisbon', 'Lisbon'], ['madeira', 'Madeira']], c.state, c.redraw)
      // play: one hour of the storm every second, stopping at the end; nothing plays by itself
      var timer = null, play = h('button', { type: 'button', text: '▶ play', 'aria-pressed': 'false', on: { click: function () {
        if (timer) { clearInterval(timer); timer = null } else { if (c.state.t >= t1) set(t0); timer = setInterval(function () { if (c.state.t >= t1) { clearInterval(timer); timer = null; play.textContent = '▶ play'; play.setAttribute('aria-pressed', 'false'); return } set(c.state.t + 10 * 60e3) }, 166) }
        play.textContent = timer ? '❚❚ pause' : '▶ play'; play.setAttribute('aria-pressed', String(!!timer))
      } } })
      c.tools.querySelector('.scrub').insertBefore(play, c.tools.querySelector('.scrub').firstChild)
      rg.value = (c.state.t - t0) / 60e3; out.textContent = L.dhm(c.state.t) + ' UTC'
    },
    draw: function (c) {
      var d = c.data, t = c.state.t, nodes = {}; d.graph.nodes.forEach(function (n) { nodes[n.id] = n })
      // the CAP messages that stood at t: sent by then, and not replaced by a message sent by then
      var mad = c.state.where === 'madeira', TYPE = { wind: 'Wind', rain: 'Rain', sea: 'Sea', thunder: 'Thunder', other: 'Other' }
      var pairs = mad ? [].concat.apply([], d.cap.other_messages.filter(function (m) { return /Madeira/.test(m.areas.join()) }).map(function (m) { return m.areas.map(function (a) { return { m: m, row: a.replace('Madeira - ', '') + ' · ' + TYPE[L.wtype(m.event_pt)].toLowerCase() } }) })) : d.cap.lisbon_messages.map(function (m) { return { m: m, row: TYPE[L.wtype(m.event_pt)] } })
      var replaced = {}
      pairs.forEach(function (q) { if (T(q.m.sent_utc) <= t) (q.m.replaces || []).forEach(function (r) { replaced[r.identifier] = 1 }) })
      var stood = pairs.filter(function (q) { return T(q.m.sent_utc) <= t && !replaced[q.m.identifier] && T(q.m.expires_utc) > t })
      var ROWS = mad ? Object.keys(pairs.reduce(function (o, q) { o[q.row] = 1; return o }, {})).sort() : ['Wind', 'Rain', 'Sea', 'Thunder'], TYPES = ROWS
      var lab = mad ? (c.phone ? 150 : 230) : 70, W = Math.max(c.W - 22, mad ? 760 : 640), a0 = T('2026-11-09T12:00Z'), a1 = T('2026-11-12T06:00Z'), sc = L.scale(a0, a1, lab, W - 12), top = 40, RH = mad ? 20 : 26
      var g = L.svg(W, top + ROWS.length * RH + 22, 'IPMA warnings as they stood at the chosen minute')
      L.axis(g, sc, top, top + ROWS.length * RH)
      ROWS.forEach(function (row, i) {
        var y = top + i * RH; g.appendChild(s('text', { x: 4, y: y + RH / 2 + 4, class: mad ? 't-lab' : 'lane-name', text: row })); g.appendChild(s('line', { x1: lab, x2: W - 12, y1: y + RH, y2: y + RH, class: 'lane-line' }))
        stood.filter(function (q) { return q.row === row }).forEach(function (q) {
          var m = q.m, xa = sc(Math.max(a0, T(m.onset_utc))), xb = sc(Math.min(a1, T(m.expires_utc))), lv = L.level(m.event_pt)
          L.mark(L.levelBar(g, xa, y + 3, xb - xa, RH - 6, lv, lv.toUpperCase() + ' ' + L.dhm(T(m.onset_utc)) + ' to ' + L.dhm(T(m.expires_utc))), L.capItem(m), m.event_pt)
        })
      })
      var xt = sc(t); g.appendChild(s('line', { x1: xt, x2: xt, y1: top - 12, y2: top + TYPES.length * RH + 4, class: 'readline' })); g.appendChild(s('text', { x: xt + 4, y: top + TYPES.length * RH + 16, class: 'readline-t', text: 'the chosen minute' }))
      c.el.appendChild(h('h3', { text: 'IPMA\'s warnings for ' + (mad ? 'Madeira, by area' : 'Lisbon') + ', as they stood at ' + L.dhm(t) })); c.el.appendChild(g)
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
  // ---- lag: the primary source's own time against the time others published it, and the time we read it
  L.exp('timelines/lag', {
    needs: ['first', 'warnings'],
    draw: function (c) {
      var d = c.data, lab = c.phone ? 120 : 300, W = Math.max(c.W - 22, c.phone ? 820 : 760), RH = 36
      // A. the press: minutes after the primary source, one row per fact
      var facts = d.first.facts.filter(function (f) { return f.primary_time && f.first_by_outlet.length })
      var mins = [].concat.apply([0], facts.map(function (f) { return f.first_by_outlet.map(function (o) { return o.minutes_after_primary }) }))
      var lo = Math.min.apply(null, mins), hi = Math.max.apply(null, mins), m0 = Math.floor(lo / 60) * 60, m1 = Math.ceil(hi / 60) * 60 || 60
      var x = function (m) { return lab + (m - m0) / (m1 - m0) * (W - lab - 30) }, top = 40
      var g = L.svg(W, top + facts.length * RH + 14, 'Minutes between the primary source and each outlet')
      for (var m = m0; m <= m1; m += (m1 - m0) / 60 > 12 ? 120 : 60) { g.appendChild(s('line', { x1: x(m), x2: x(m), y1: top, y2: top + facts.length * RH, class: m === 0 ? 'ax-day' : 'ax-h' })); g.appendChild(s('text', { x: x(m), y: top - 6, class: 'ax-t', 'text-anchor': 'middle', text: (m > 0 ? '+' : '') + m / 60 + ' h' })) }
      g.appendChild(s('text', { x: x(0) + 4, y: top - 20, class: 'ax-dayname', text: 'the primary source\'s own time' }))
      facts.forEach(function (f, i) {
        var y = top + i * RH, cy = y + RH / 2
        if (i % 2 === 0) g.appendChild(s('rect', { x: 0, y: y, width: W, height: RH, class: 'lane-bg' }))
        g.appendChild(s('text', { x: 6, y: cy - 1, class: 'lane-name', text: f.what.length > (c.phone ? 18 : 46) ? f.what.slice(0, c.phone ? 17 : 45) + '…' : f.what }))
        g.appendChild(s('text', { x: 6, y: cy + 12, class: 'lane-sub', text: L.dhm(T(f.primary_time)) + ' · ' + f.first_by_outlet.length + ' outlets' }))
        var pid = L.valueItem('fact:' + f.id, { type: 'the primary source\'s time for a keyed fact', label: f.primary_label, title: f.what, when: f.primary_time, facts: [['How the time is known', f.primary_note], ['Outlets matched', String(f.items_matched)]], sources: [{ label: 'research/media/first-on-each-fact.json (incident.media@)', url: null }], read: d.first.updated, by: d.first.by, file: 'research/media/first-on-each-fact.json' })
        g.appendChild(L.mark(L.dot(x(0), cy, 6, f.primary_label, true), pid, f.what))
        var lv = []; f.first_by_outlet.slice().sort(function (a, b) { return a.minutes_after_primary - b.minutes_after_primary }).forEach(function (o, k) {
          var px = x(o.minutes_after_primary), kk = 0; while (lv[kk] != null && px - lv[kk] < 12) kk++; lv[kk] = px
          var dt = L.dot(px, cy - 8 + (kk % 3) * 8, 5, 'evidence'); dt.appendChild(s('title', { text: o.outlet + ' · ' + L.dhm(T(o.published)) + ' · ' + o.minutes_after_primary + ' min · ' + o.title }))
          g.appendChild(L.mark(dt, L.valueItem('first:' + f.id + ':' + o.outlet, { type: 'an outlet\'s first item on this fact (' + o.via + ')', label: 'evidence', title: o.outlet + ': ' + o.title, when: o.published, whenName: 'Published (the page\'s own time)', facts: [['The fact', f.what], ['After the primary source', o.minutes_after_primary + ' minutes (primary: ' + L.dhm(T(f.primary_time)) + ')'], ['Rank among the outlets we could read', String(o.rank)]], sources: [{ label: L.host(o.url), url: o.url }], read: d.first.updated, by: d.first.by, file: 'research/media/first-on-each-fact.json' }), o.outlet + ' ' + o.minutes_after_primary + ' minutes'))
          if (k === 0 && !c.phone) g.appendChild(s('text', { x: W - 34, y: cy + 4, 'text-anchor': 'end', class: 't-small', text: 'first: ' + o.outlet + ', ' + (o.minutes_after_primary >= 0 ? '+' : '') + o.minutes_after_primary + ' min' }))
        })
      })
      c.el.appendChild(h('h3', { text: 'The press: minutes from the primary source\'s time to each outlet\'s first item' })); c.el.appendChild(g)
      c.el.appendChild(h('p', { class: 'meta', text: 'From incident.media@\'s analysis of ' + facts.length + ' keyed facts, among the outlets a bot could read. A dot left of the line means the outlet published before the time we hold for the primary source (for the alert, the page is dated hours after the minister spoke). ' + (d.first.facts.length - facts.length) + ' facts have no primary time or no outlet and are not drawn.' }))
      // B. us: when each step of IPMA's warnings happened and when one of our desks read it
      var hs = d.warnings.history.filter(function (x) { return x.event && /^\d{4}-/.test(x.at_utc || '') && !isNaN(T(x.read_utc)) && T(x.read_utc) > T(x.at_utc) }), t0 = Math.floor(Math.min.apply(null, hs.map(function (x) { return T(x.at_utc) })) / H) * H - H, t1 = Math.ceil(Math.max.apply(null, hs.map(function (x) { return T(x.read_utc) })) / H) * H + H
      var note = c.phone ? 0 : 130, sc = L.scale(t0, t1, lab, W - note - 14), g2 = L.svg(W, top + hs.length * RH + 14, 'When each warning step happened and when we read it')
      L.axis(g2, sc, top, top + hs.length * RH)
      hs.forEach(function (x, i) {
        var y = top + i * RH, cy = y + RH / 2, a = T(x.at_utc), b = T(x.read_utc), lbl = x.kind === 'fact' ? 'fact' : x.kind === 'analysis' ? 'hypothesis' : 'evidence'
        if (i % 2 === 0) g2.appendChild(s('rect', { x: 0, y: y, width: W, height: RH, class: 'lane-bg' }))
        g2.appendChild(s('text', { x: 6, y: cy + 4, class: 'lane-name', text: x.event.length > (c.phone ? 18 : 46) ? x.event.slice(0, c.phone ? 17 : 45) + '…' : x.event }))
        var q = s('g', {}); q.appendChild(s('line', { x1: sc(a), x2: sc(b), y1: cy, y2: cy, class: 'link' })); q.appendChild(L.dot(sc(a), cy, 6, lbl, true)); q.appendChild(s('rect', { x: sc(b) - 5, y: cy - 5, width: 10, height: 10, class: 'obs-dot' })); q.appendChild(s('rect', { x: Math.min(sc(a), sc(b)) - 8, y: y + 2, width: Math.abs(sc(b) - sc(a)) + 16, height: RH - 4, class: 'hit' }))
        g2.appendChild(L.mark(q, L.valueItem('history:' + i, { type: 'a step in IPMA\'s warnings, and our read of it', label: lbl, title: x.event, when: x.at_utc, whenName: 'Happened', facts: [['Read', L.dhm(b) + ' UTC, ' + L.dur(b - a) + ' later'], ['Read by', x.read_by || 'not recorded']], sources: [{ label: L.host(x.source), url: /^https?:/.test(x.source || '') ? x.source : null }], read: x.read_utc, by: x.read_by, file: L.DATA + 'weather/warnings.json' }), x.event.slice(0, 60)))
        if (note) g2.appendChild(s('text', { x: W - note - 4, y: cy + 4, class: 't-small', text: L.dur(b - a) + ' later' }))
      })
      c.el.appendChild(h('h3', { text: 'Us: when each step of IPMA\'s warnings happened, and when it was read into our data' })); c.el.appendChild(g2)
      c.el.appendChild(L.legend([['lg-decision', 'the source\'s own time (solid: a fact; hollow: reported)'], ['lg-evidence', 'an outlet\'s first item'], ['lg-rain', 'blue square: read into our data']]))
      c.el.appendChild(h('p', { class: 'meta', text: hs.length + ' steps from weather/warnings.json (history). Read this one with care: the rows that begin "IPMA sends" carry IPMA\'s own send time, which we first held when we first read the feed that states it (Tue 10, 23:51); the warnings themselves had been read hours earlier from IPMA\'s open data, with only the time of reading. So the long bars measure how late we learned the exact send time, not how late we knew of the warning.' }))
    }
  })
})()
