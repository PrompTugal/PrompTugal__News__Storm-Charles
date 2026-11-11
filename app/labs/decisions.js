// Labs, decisions (incident.labs@web-summit.dinis): flow, lead-times, days, state. Data: decisions/graph.json, weather/analysis.json.
// Never the whole graph: each view is the result of a question (what followed from this warning; what has a stated effect; what
// touches this day).
(function () {
  'use strict'
  var L = window.Labs, h = L.h, s = L.s, T = L.T, H = L.H, DAY = L.DAY
  function index(g) { var n = {}, e = {}, kids = {}; g.nodes.forEach(function (x) { n[x.id] = x }); g.edges.forEach(function (x) { e[x.id] = x; x.follows.forEach(function (p) { (kids[p] = kids[p] || []).push(x.id) }) }); return { n: n, e: e, kids: kids } }
  function short(str, n) { str = String(str || ''); return str.length > n ? str.slice(0, n - 1) + '…' : str }
  function fxText(e) { return e.effect_from_utc || e.effect_to_utc ? 'In effect ' + (e.effect_from_utc ? L.dhm(T(e.effect_from_utc)) : '(start not stated)') + ' to ' + (e.effect_to_utc ? L.dhm(T(e.effect_to_utc)) : '(end not stated)') : '' }
  function card(e, ix, extra) {
    return L.mark(h('button', { type: 'button', class: 'lc l-' + e.label + ' st-' + e.status, 'data-edge': e.id }, h('span', { class: 'tm', text: L.when(e.at) }), h('span', { class: 'lbl l-' + e.label, text: e.label }), e.status !== 'happened' ? h('span', { class: 'lbl', text: e.status.replace('_', ' ') }) : null, h('b', { text: (ix.n[e.by] || {}).name || e.by }), short(e.decision, 170), fxText(e) ? h('span', { class: 'fxt', text: fxText(e) }) : null, extra || null), L.edgeItem(e, ix.n))
  }

  // ---- flow: from one warning or decision, everything that followed, left to right
  L.exp('decisions/flow', {
    needs: ['graph'],
    setup: function (c) {
      var ix = index(c.data.graph), roots = c.data.graph.edges.filter(function (e) { return (ix.kids[e.id] || []).length >= 2 }).sort(function (a, b) { return T(a.at) - T(b.at) })
      c.state.root = c.state.root || 'ipma-red-wind'
      var sel = h('select', { 'aria-label': 'Start from', on: { change: function () { c.state.root = sel.value; c.redraw() } } }, roots.map(function (e) { return h('option', { value: e.id, selected: e.id === c.state.root, text: L.when(e.at) + ' · ' + ((ix.n[e.by] || {}).name || e.by).split(' (')[0] + ': ' + short(e.decision, 60) }) }))
      c.tools.appendChild(h('label', { class: 'lab-choice' }, h('legend', { text: 'What followed from' }), sel))
    },
    draw: function (c) {
      var ix = index(c.data.graph), root = ix.e[c.state.root], depth = {}
      ;(function walk(id, d) { if (depth[id] != null && depth[id] >= d) return; depth[id] = d; (ix.kids[id] || []).forEach(function (k) { walk(k, d + 1) }) })(root.id, 0)
      var ids = Object.keys(depth), cols = []
      ids.forEach(function (id) { (cols[depth[id]] = cols[depth[id]] || []).push(ix.e[id]) })
      var NAMES = ['The start', 'Followed directly', 'Then', 'Then', 'Then', 'Then']
      var flow = h('div', { class: 'flow' })
      cols.forEach(function (col, i) {
        col.sort(function (a, b) { return (isNaN(T(a.at)) ? Infinity : T(a.at)) - (isNaN(T(b.at)) ? Infinity : T(b.at)) })
        flow.appendChild(h('div', { class: 'col' }, h('h4', { text: NAMES[i] + ' (' + col.length + ')' }), col.map(function (e) {
          var outside = e.follows.filter(function (p) { return depth[p] == null })
          return card(e, ix, outside.length && i > 0 ? h('span', { class: 'fxt', text: 'Also follows: ' + outside.join(', ') }) : null)
        })))
      })
      c.el.appendChild(flow)
      // the links, measured from the cards
      var box = flow.getBoundingClientRect(), g = s('svg', { class: 'links', width: flow.scrollWidth, height: flow.scrollHeight })
      ids.forEach(function (id) {
        ix.e[id].follows.forEach(function (p) {
          if (depth[p] == null) return
          var a = flow.querySelector('[data-edge="' + p + '"]'), b = flow.querySelector('[data-edge="' + id + '"]'); if (!a || !b) return
          var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(), x1 = ra.right - box.left, y1 = ra.top + ra.height / 2 - box.top, x2 = rb.left - box.left, y2 = rb.top + rb.height / 2 - box.top, mx = (x1 + x2) / 2
          g.appendChild(s('path', { d: 'M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2, class: 'link' }))
          g.appendChild(s('path', { d: 'M' + (x2 - 6) + ' ' + (y2 - 4) + ' L' + x2 + ' ' + y2 + ' L' + (x2 - 6) + ' ' + (y2 + 4), class: 'link' }))
        })
      })
      flow.appendChild(g)
      c.el.appendChild(h('p', { class: 'meta', text: ids.length + ' of the graph\'s ' + c.data.graph.edges.length + ' edges: the start and everything whose "follows" leads back to it. An arrow reads "was followed by": the graph records that the later decision cites or came after the earlier one, not that it was caused by it. Thick border: fact. Thin: evidence. Dashed, with the word: hypothesis. Dotted: due and not announced when read.' }))
    }
  })

  // ---- lead times: warning sent, decision announced, effect begins
  L.exp('decisions/lead-times', {
    needs: ['graph', 'analysis'],
    setup: function (c) { L.choice(c.tools, 'order', [['lead', 'Shortest notice first'], ['time', 'In order announced']], c.state, c.redraw) },
    draw: function (c) {
      var ix = index(c.data.graph)
      function warningOf(e) { var best = null; (function up(x, seen) { x.follows.forEach(function (p) { var pe = ix.e[p]; if (!pe || seen[p]) return; seen[p] = 1; if (pe.by === 'ipma' && L.level(pe.decision) && !isNaN(T(pe.at)) && T(pe.at) <= T(e.at)) { if (!best || T(pe.at) > T(best.at)) best = pe } up(pe, seen) }) })(e, {}); return best }
      var rows = c.data.graph.edges.filter(function (e) { return e.effect_from_utc && !isNaN(T(e.at)) && !L.dayOnly(e.at) && e.label !== 'hypothesis' }).map(function (e) { return { e: e, at: T(e.at), from: T(e.effect_from_utc), to: T(e.effect_to_utc), w: e.by === 'ipma' ? null : warningOf(e) } })
      rows.forEach(function (r) { r.lead = r.from - r.at })
      rows.sort(c.state.order === 'time' ? function (a, b) { return a.at - b.at } : function (a, b) { return a.lead - b.lead })
      var lab = c.phone ? 130 : 300, note = c.phone ? 0 : 350, W = Math.max(c.W - 22, c.phone ? 860 : 900), t0 = T('2026-11-09T12:00Z'), t1 = T('2026-11-12T06:00Z'), sc = L.scale(t0, t1, lab, W - note - 14), top = 44, RH = 34
      var lts = c.data.analysis.lead_times, total = top + rows.length * RH + 70 + lts.length * RH + 20
      var g = L.svg(W, total, 'Lead times: when each decision was announced and when its effect began')
      L.axis(g, sc, top, top + rows.length * RH)
      rows.forEach(function (r, i) {
        var y = top + i * RH, cy = y + RH / 2, e = r.e, id = L.edgeItem(e, ix.n), lv = e.by === 'ipma' ? L.level(e.decision) : null
        if (i % 2 === 0) g.appendChild(s('rect', { x: 0, y: y, width: W, height: RH, class: 'lane-bg' }))
        g.appendChild(s('text', { x: 6, y: cy - 2, class: 'lane-name', text: short(((ix.n[e.by] || {}).name || e.by).split(' (')[0], c.phone ? 18 : 44) }))
        g.appendChild(s('text', { x: 6, y: cy + 11, class: 'lane-sub', text: short(e.decision, c.phone ? 22 : 54) }))
        var xa = sc(r.at), xf = sc(r.from), xe = isNaN(r.to) ? sc(Math.min(t1, r.from + 12 * H)) : sc(Math.min(t1, r.to))
        g.appendChild(s('line', { x1: xa, x2: xf, y1: cy, y2: cy, class: 'link' }))
        if (r.w) { var xw = sc(T(r.w.at)); g.appendChild(s('line', { x1: xw, x2: xa, y1: cy, y2: cy, class: 'link', 'stroke-dasharray': '1 4' })); g.appendChild(L.mark(s('path', { d: 'M' + (xw - 6) + ' ' + (cy - 6) + ' L' + (xw + 6) + ' ' + (cy - 6) + ' L' + xw + ' ' + (cy + 6) + ' Z', class: 'd d-' + r.w.label, title: 'IPMA warning sent ' + L.dhm(T(r.w.at)) + ': ' + r.w.decision }), L.edgeItem(r.w, ix.n), 'The warning before it')) }
        var bar = lv ? L.levelBar(g, xf, cy - 8, xe - xf, 16, lv) : g.appendChild(s('rect', { x: xf, y: cy - 8, width: Math.max(2, xe - xf), height: 16, rx: 2, class: 'fx' + (isNaN(r.to) ? ' fx-open' : '') }))
        bar.appendChild(s('title', { text: fxText(e) })); L.mark(bar, id, fxText(e))
        var d = L.dot(xa, cy, 6, e.label, true); d.appendChild(s('title', { text: 'Announced ' + L.dhm(r.at) + ': ' + e.decision })); g.appendChild(L.mark(d, id, 'Announced ' + L.dhm(r.at)))
        var txt = (r.lead >= 0 ? L.dur(r.lead) + ' before its effect' : L.dur(-r.lead) + ' after its effect began') + (r.w ? '; ' + L.dur(r.at - T(r.w.at)) + ' after the warning' : '')
        if (note) g.appendChild(s('text', { x: W - note - 4, y: cy + 4, class: 't-small', text: txt })); else g.appendChild(s('text', { x: Math.min(xe + 6, W - 150), y: cy - 10, class: 't-small', text: short(txt, 26) }))
      })
      // the meteorologist's own table: each warning's first public signal against the hour it starts
      var y2 = top + rows.length * RH + 62
      g.appendChild(s('text', { x: 6, y: y2 - 34, class: 'ax-dayname', text: 'Warnings: first signal to the hour it starts (the meteorologist\'s table, weather/analysis.json)' }))
      L.axis(g, sc, y2, y2 + lts.length * RH)
      lts.forEach(function (lt, i) {
        var y = y2 + i * RH, cy = y + RH / 2, a = T(lt.first_signal_utc), b = T(lt.starts_utc), least = /^by /.test(lt.first_signal_utc) || lt.lead_hours_at_least != null, hrs = lt.lead_hours != null ? lt.lead_hours : lt.lead_hours_at_least
        if (i % 2 === 0) g.appendChild(s('rect', { x: 0, y: y, width: W, height: RH, class: 'lane-bg' }))
        g.appendChild(s('text', { x: 6, y: cy + 4, class: 'lane-name', text: short(lt.warning, c.phone ? 20 : 46) }))
        var id = L.valueItem('lead:' + i, { type: 'lead time (the meteorologist\'s table)', label: lt.kind === 'press' ? 'evidence' : 'fact', title: lt.warning, when: lt.starts_utc, whenName: 'Starts', facts: [['First signal', lt.first_signal_utc], ['Lead', (least ? 'at least ' : '') + hrs + ' hours (their arithmetic)']], sources: [{ label: lt.source || 'weather/analysis.json, lead_times', url: null }], read: c.data.analysis.based_on_read_utc, by: c.data.analysis.by, file: L.DATA + 'weather/analysis.json' })
        var hit = s('g', {}); hit.appendChild(s('line', { x1: sc(a), x2: sc(b), y1: cy, y2: cy, class: 'link', 'stroke-dasharray': least ? '4 3' : null }))
        hit.appendChild(L.dot(sc(a), cy, 5, lt.kind === 'press' ? 'evidence' : 'fact')); hit.appendChild(s('rect', { x: sc(b) - 2, y: cy - 9, width: 4, height: 18, class: 'd d-fact' }))
        hit.appendChild(s('rect', { x: sc(a) - 8, y: y + 2, width: sc(b) - sc(a) + 16, height: RH - 4, class: 'hit' }))
        g.appendChild(L.mark(hit, id, lt.warning))
        g.appendChild(s('text', { x: sc(b) + 8, y: cy + 4, class: 't-small', text: (least ? 'at least ' : '') + hrs + ' h' }))
      })
      c.el.appendChild(g)
      c.el.appendChild(L.legend([['lg-decision', 'announced (diamond; solid a fact, hollow evidence)'], ['lg-fx', 'the hours the decision covers'], ['lg-red', 'an IPMA red warning\'s hours'], ['lg-orange', 'IPMA orange'], ['lg-fact', 'a triangle, on the dotted line: the IPMA warning it followed']]))
      c.el.appendChild(h('p', { class: 'meta', text: rows.length + ' edges have both an announcement time and a stated start of effect; ' + (c.data.graph.edges.length - rows.length) + ' do not and are not drawn. The hours and minutes are our arithmetic on two times in the data, not a statement by any body. A dotted bar has no stated end (drawn 12 h long).' }))
    }
  })

  // ---- per day: what was announced that day, what was in effect that day
  L.exp('decisions/days', {
    needs: ['graph'],
    draw: function (c) {
      var ix = index(c.data.graph), es = c.data.graph.edges, lab = c.phone ? 120 : 280, W = Math.max(c.W - 22, c.phone ? 820 : 700)
      ;[['2026-11-10', 'Tuesday 10 November', /tuesday/i], ['2026-11-11', 'Wednesday 11 November', /wednesday/i], ['2026-11-12', 'Thursday 12 November', /thursday/i]].forEach(function (dd) {
        var d0 = T(dd[0]), d1 = d0 + DAY, sc = L.scale(d0, d1, lab, W - 14)
        var ann = es.filter(function (e) { var t = T(e.at); return t >= d0 && t < d1 && !L.dayOnly(e.at) && e.label !== 'hypothesis' }).sort(function (a, b) { return T(a.at) - T(b.at) })
        var dayonly = es.filter(function (e) { return L.dayOnly(e.at) && T(e.at) === d0 })
        var fx = es.filter(function (e) { if (!e.effect_from_utc && !e.effect_to_utc) return false; var a = e.effect_from_utc ? T(e.effect_from_utc) : -Infinity, b = e.effect_to_utc ? T(e.effect_to_utc) : Infinity; if (!isFinite(b)) return a >= d0 && a < d1; if (!isFinite(a)) return b > d0 && b <= d1; return a < d1 && b > d0 }).sort(function (a, b) { return (T(a.effect_from_utc) || 0) - (T(b.effect_from_utc) || 0) })
        var open = es.filter(function (e) { return (e.status === 'not_announced' || e.status === 'expected' || e.status === 'unknown') && dd[2].test(e.id + ' ' + e.decision) })
        var R = 6, levels = []; ann.forEach(function (e) { var x = sc(T(e.at)), k = 0; while (levels[k] != null && x - levels[k] < 2 * R + 3) k++; levels[k] = x; e._k = k })
        var top = 30, annH = Math.max(1, levels.length) * (2 * R + 5) + 8, RH = 24, g = L.svg(W, top + annH + fx.length * RH + 10, dd[1] + ': announced and in effect')
        L.axis(g, sc, top, top + annH + fx.length * RH)
        g.appendChild(s('rect', { x: 0, y: top, width: W, height: annH, class: 'lane-bg' })); g.appendChild(s('text', { x: 6, y: top + 16, class: 'lane-name', text: 'Announced (' + ann.length + ')' }))
        ann.forEach(function (e) { var d = L.dot(sc(T(e.at)), top + 4 + R + e._k * (2 * R + 5), R - 1, e.label, true); d.appendChild(s('title', { text: L.hm(T(e.at)) + ' ' + ((ix.n[e.by] || {}).name || e.by) + ': ' + e.decision })); g.appendChild(L.mark(d, L.edgeItem(e, ix.n), L.hm(T(e.at)) + ' ' + e.decision.slice(0, 60))) })
        fx.forEach(function (e, i) {
          var y = top + annH + i * RH, a = e.effect_from_utc ? Math.max(d0, T(e.effect_from_utc)) : d0, b = e.effect_to_utc ? Math.min(d1, T(e.effect_to_utc)) : d1, lv = e.by === 'ipma' ? L.level(e.decision) : null
          g.appendChild(s('text', { x: 6, y: y + 16, class: 't-lab', text: short(((ix.n[e.by] || {}).name || e.by).split(' (')[0] + ': ' + e.decision, c.phone ? 20 : 46) }))
          var bar = lv ? L.levelBar(g, sc(a), y + 4, sc(b) - sc(a), RH - 8, lv) : g.appendChild(s('rect', { x: sc(a), y: y + 4, width: Math.max(2, sc(b) - sc(a)), height: RH - 8, rx: 2, class: 'fx' + (!e.effect_from_utc || !e.effect_to_utc ? ' fx-open' : '') }))
          bar.appendChild(s('title', { text: e.decision + ' · ' + fxText(e) })); L.mark(bar, L.edgeItem(e, ix.n), e.decision.slice(0, 60))
        })
        c.el.appendChild(h('h3', { text: dd[1] })); c.el.appendChild(g)
        if (dayonly.length || open.length) c.el.appendChild(h('div', { class: 'cols' }, dayonly.length ? h('section', {}, h('h4', { text: 'Announced that day, hour not stated (' + dayonly.length + ')' }), dayonly.map(function (e) { return card(e, ix) })) : null, open.length ? h('section', {}, h('h4', { text: 'About this day and still open when read (' + open.length + ')' }), open.map(function (e) { return card(e, ix) })) : null))
      })
      c.el.appendChild(L.legend([['lg-decision', 'announced at this hour'], ['lg-fx', 'in effect (dotted edge: a start or end not stated; drawn only on the day of the hour that is stated)'], ['lg-red', 'IPMA red warning in force'], ['lg-orange', 'IPMA orange']]))
    }
  })

  // ---- by state of service: who is closed, suspended, limited, running, and who has not said
  var STATES = [['closed', 'Closed'], ['suspended', 'Suspended'], ['limited', 'Limited'], ['running', 'Running'], ['not_announced', 'Not announced']]
  var AREAS = [['lisbon', 'Lisbon'], ['mainland', 'Mainland Portugal'], ['national', 'National'], ['madeira', 'Madeira'], ['porto-santo', 'Porto Santo']]
  var KINDS = [['transport', 'Transport'], ['organiser', 'The organiser and events'], ['service', 'Schools and services'], ['government', 'Government'], ['municipality', 'The city'], ['authority', 'Authorities'], ['venue', 'The venue']]
  function stateGlyph(st) { return h('i', { class: 'sg sg-' + st, 'aria-hidden': 'true' }) }
  L.exp('decisions/state', {
    needs: ['graph'],
    setup: function (c) { L.choice(c.tools, 'rows', [['area', 'By place'], ['kind', 'By kind of body']], c.state, c.redraw); L.choice(c.tools, 'show', [['standing', 'Standing when read'], ['all', 'Every decision']], c.state, c.redraw) },
    draw: function (c) {
      var g = c.data.graph, ix = index(g), asOf = T(g.updated)
      var all = g.edges.filter(function (e) { return e.state })
      function ended(e) { return e.status === 'superseded' || (e.effect_to_utc && T(e.effect_to_utc) <= asOf) }
      var es = c.state.show === 'all' ? all : all.filter(function (e) { return !ended(e) })
      var groups = c.state.rows === 'kind' ? KINDS : AREAS
      function groupOf(e) { return c.state.rows === 'kind' ? (ix.n[e.by] || {}).kind : e.area }
      var known = {}; groups.forEach(function (x) { known[x[0]] = 1 })
      var rows = groups.filter(function (x) { return es.some(function (e) { return groupOf(e) === x[0] }) })
      if (es.some(function (e) { return !known[groupOf(e)] })) rows = rows.concat([['', c.state.rows === 'kind' ? 'Other' : 'Place not stated']])
      function inCell(gr, st) { return es.filter(function (e) { return e.state === st && (gr ? groupOf(e) === gr : !known[groupOf(e)]) }).sort(function (a, b) { return (isNaN(T(a.at)) ? Infinity : T(a.at)) - (isNaN(T(b.at)) ? Infinity : T(b.at)) }) }
      function stCard(e, tag) { return card(e, ix, [ended(e) ? h('span', { class: 'fxt', text: e.status === 'superseded' ? 'Superseded by a later decision' : 'Ended ' + L.dhm(T(e.effect_to_utc)) + ', before the graph was last written' }) : null, e.state_note ? h('span', { class: 'fxt', text: e.state_note }) : null, tag ? h('span', { class: 'fxt', text: tag }) : null]) }
      var board = h('div', { class: 'stb' + (c.phone ? ' stb-phone' : '') })
      if (c.phone) {
        STATES.forEach(function (st) {
          var list = es.filter(function (e) { return e.state === st[0] }); if (!list.length) return
          board.appendChild(h('h4', { class: 'stb-h' }, stateGlyph(st[0]), st[1] + ' (' + list.length + ')'))
          rows.forEach(function (gr) { inCell(gr[0], st[0]).forEach(function (e) { var cd = stCard(e, gr[1]); if (ended(e)) cd.classList.add('st-superseded'); board.appendChild(cd) }) })
        })
      } else {
        board.appendChild(h('div', { class: 'stb-c stb-corner' }))
        STATES.forEach(function (st) { board.appendChild(h('div', { class: 'stb-c stb-h' }, stateGlyph(st[0]), st[1] + ' (' + es.filter(function (e) { return e.state === st[0] }).length + ')')) })
        rows.forEach(function (gr) {
          board.appendChild(h('div', { class: 'stb-c stb-g', text: gr[1] }))
          STATES.forEach(function (st) { var list = inCell(gr[0], st[0]); board.appendChild(h('div', { class: 'stb-c' + (list.length ? '' : ' stb-none') }, list.length ? list.map(function (e) { var cd = stCard(e); if (ended(e)) cd.classList.add('st-superseded'); return cd }) : h('span', { class: 'lab-empty', text: 'none recorded' }))) })
        })
      }
      c.el.appendChild(board)
      c.el.appendChild(L.table('The same as a table', ['State', c.state.rows === 'kind' ? 'Kind of body' : 'Place', 'By', 'Decision', 'Announced', 'In effect', 'Label'], [].concat.apply([], STATES.map(function (st) { return [].concat.apply([], rows.map(function (gr) { return inCell(gr[0], st[0]).map(function (e) { return [st[1] + (ended(e) ? ' (ended or superseded)' : ''), gr[1], ((ix.n[e.by] || {}).name || e.by).split(' (')[0], { text: short(e.decision, 140), item: L.edgeItem(e, ix.n) }, L.when(e.at), fxText(e).replace(/^In effect /, '') || 'hours not stated', e.label] }) })) }))))
      var hidden = all.length - es.length
      c.el.appendChild(h('p', { class: 'meta', text: es.length + ' of the graph\'s ' + g.edges.length + ' edges are shown: those that say what state a service is in. ' + (hidden ? hidden + ' more are hidden because they ended or were superseded before the graph was last written (' + L.dhm(asOf) + ' UTC): "Every decision" shows them, faded. ' : '') + (g.edges.length - all.length) + ' edges carry no state (a warning, a statement, a recommendation or a hypothesis). The state is incident.researcher@\'s reading of each decision, in five words of the graph\'s own; it is what was decided or said when read, not a live report of the service, and "none recorded" means the graph has no such edge, not that nothing is ' + 'affected. Thick border: fact. Thin: evidence. Dotted: due and not announced when read.' }))
      c.el.appendChild(L.legend(STATES.map(function (st) { return ['lg-st lgs-' + st[0], st[1].toLowerCase()] })))
    }
  })
})()
