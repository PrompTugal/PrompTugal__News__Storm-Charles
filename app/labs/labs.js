// The Labs core (incident.labs@web-summit.dinis). Every experiment is a function registered with Labs.exp(name, fn) and mounted on
// <div class="lab" data-lab="<area>/<name>" data-root="../../">. It reads only the site's published JSON, draws with SVG or HTML
// from tokens (never a hex colour), and gives every mark a data-item="<id>": one click handler calls Labs.openItem(id).
// Labs.openItem is the single hook: today it fills this page's side panel; the frame's right-hand panel and the evidence pages
// can replace it (window.Labs.openItem = fn) without touching an experiment.
(function () {
  'use strict'
  var NS = 'http://www.w3.org/2000/svg'
  var DATA = 'incidents/2026-11-10-storm-charles/data/'
  var FILES = { signals: 'signals.json', graph: 'decisions/graph.json', warnings: 'weather/warnings.json', cap: 'weather/cap.json', stations: 'weather/stations.json', rain: 'weather/lisbon-rain.json', madeira: 'weather/madeira.json', forecast: 'weather/forecast.json', airport: 'weather/airport.json', analysis: 'weather/analysis.json', sigtab: '/data/graph/tables/signals.json', actors: '/data/graph/tables/actors.json', first: '/research/media/first-on-each-fact.json' }
  var H = 3600e3, DAY = 24 * H
  var exps = {}, items = new Map(), root = '', panel = null

  // ---- small builders
  function h(tag, attrs) {
    var e = document.createElement(tag); attrs = attrs || {}
    for (var k in attrs) { if (attrs[k] == null || attrs[k] === false) continue; if (k === 'text') e.textContent = attrs[k]; else if (k === 'on') for (var ev in attrs.on) e.addEventListener(ev, attrs.on[ev]); else e.setAttribute(k, attrs[k]) }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i])
    return e
  }
  function s(tag, attrs) {
    var e = document.createElementNS(NS, tag); attrs = attrs || {}
    for (var k in attrs) { if (attrs[k] == null || attrs[k] === false) continue; if (k === 'text') e.textContent = attrs[k]; else if (k === 'title') e.appendChild(s('title', { text: attrs[k] })); else e.setAttribute(k, attrs[k]) }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i])
    return e
  }
  function add(e, c) { if (c == null || c === false) return; if (Array.isArray(c)) c.forEach(function (x) { add(e, x) }); else e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c))) }
  function svg(w, ht, label) { return s('svg', { viewBox: '0 0 ' + w + ' ' + ht, width: w, height: ht, role: 'img', 'aria-label': label || '', class: 'lab-svg' }) }
  // a mark that opens its item: focusable, a button to assistive tech
  function mark(el, id, label) { el.setAttribute('data-item', id); el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); if (label) el.setAttribute('aria-label', label); el.classList.add('mk'); return el }

  // ---- time (everything UTC; Lisbon is on UTC in November)
  function T(v) { if (!v) return NaN; var m = String(v).match(/\d{4}-\d\d-\d\d(T\d\d:\d\d(:\d\d)?)?/); if (!m) return NaN; return Date.parse(m[0] + (m[1] ? 'Z' : 'T00:00Z')) }
  function dayOnly(v) { return /^\d{4}-\d\d-\d\d$/.test(String(v || '')) }
  var DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  function p2(n) { return (n < 10 ? '0' : '') + n }
  function hm(t) { var d = new Date(t); return p2(d.getUTCHours()) + ':' + p2(d.getUTCMinutes()) }
  function dhm(t) { if (isNaN(t)) return 'time not stated'; var d = new Date(t); return DN[d.getUTCDay()] + ' ' + d.getUTCDate() + ', ' + hm(t) }
  function day(t) { var d = new Date(t); return DN[d.getUTCDay()] + ' ' + d.getUTCDate() + ' Nov' }
  function when(v) { var t = T(v); return isNaN(t) ? 'time not stated' : dayOnly(v) ? day(t) + ' (hour not stated)' : dhm(t) }
  function dur(ms) { var neg = ms < 0; ms = Math.abs(ms); var m = Math.round(ms / 60e3), hh = Math.floor(m / 60); return (neg ? '-' : '') + (hh ? hh + ' h ' : '') + (m % 60) + ' min' }
  function scale(t0, t1, x0, x1) { var f = function (t) { return x0 + (t - t0) / (t1 - t0) * (x1 - x0) }; f.t0 = t0; f.t1 = t1; f.x0 = x0; f.x1 = x1; f.inv = function (x) { return t0 + (x - x0) / (x1 - x0) * (t1 - t0) }; return f }
  // hour ticks and day names along a time scale
  function axis(g, sc, y0, y1, opt) {
    opt = opt || {}
    var pxh = (sc.x1 - sc.x0) / ((sc.t1 - sc.t0) / H), step = [1, 2, 3, 6, 12, 24].find(function (n) { return n * pxh >= 34 }) || 24
    for (var t = Math.ceil(sc.t0 / H) * H; t <= sc.t1; t += H) {
      var hr = new Date(t).getUTCHours(), x = sc(t)
      if (hr === 0) { g.appendChild(s('line', { x1: x, x2: x, y1: y0 - 14, y2: y1, class: 'ax-day' })); if (x < sc.x1 - 40) g.appendChild(s('text', { x: x + 4, y: y0 - 18, class: 'ax-dayname', text: day(t) })) }
      else if (hr % step === 0) g.appendChild(s('line', { x1: x, x2: x, y1: y0, y2: y1, class: 'ax-h' }))
      if (hr % step === 0) g.appendChild(s('text', { x: x, y: y0 - 4, class: 'ax-t', 'text-anchor': 'middle', text: p2(hr) }))
    }
    if (new Date(sc.t0).getUTCHours() !== 0) g.appendChild(s('text', { x: sc.x0 + 4, y: y0 - 18, class: 'ax-dayname', text: day(sc.t0) }))
  }

  // ---- IPMA's levels (the only place warning colours are used; the level is always written)
  function level(str) { var m = String(str || '').match(/vermelho|red|laranja|orange|amarelo|yellow/i); if (!m) return null; var w = m[0].toLowerCase(); return /verm|red/.test(w) ? 'red' : /lar|ora/.test(w) ? 'orange' : 'yellow' }
  function wtype(str) { str = String(str || ''); return /vento|wind/i.test(str) ? 'wind' : /precip|rain|chuva/i.test(str) ? 'rain' : /mar[ií]tima|sea|ondas/i.test(str) ? 'sea' : /trovoada|thunder/i.test(str) ? 'thunder' : 'other' }
  // a warning window: a bar in IPMA's colour with the level written in it (rule 3 and 4)
  function levelBar(g, x, y, w, ht, lv, text) {
    var b = s('g', { class: 'lv lv-' + lv }); w = Math.max(w, 2)
    b.appendChild(s('rect', { x: x, y: y, width: w, height: ht, rx: 2 }))
    if (w > 30) b.appendChild(s('text', { x: x + 4, y: y + ht / 2 + 4, text: (text && w > text.length * 6.4 + 8 ? text : lv.toUpperCase()), class: 'lv-t' }))
    g.appendChild(b); return b
  }

  // ---- items: everything a mark can open
  function reg(it) { items.set(it.id, it); return it.id }
  function host(u) { try { return new URL(u).host.replace(/^www\./, '') } catch (e) { return u } }
  function signalItem(x, publisher) {
    return reg({ id: x.id, type: 'timeline row', label: x.label, title: x.text, when: x.at, approx: x.approx, evidence: x.evidence, facts: [publisher ? ['Published by', publisher] : null, ['Kind', x.kind + (x.decision ? ', a decision' : '') + (x.key ? ', key row' : '')], x.supersedes ? ['Supersedes', x.supersedes] : null], sources: x.sources || [], file: DATA + 'signals.json', page: 'incidents/2026-11-10-storm-charles/timeline.html#' + x.id, pageName: 'this row on the timeline' })
  }
  function edgeItem(e, nodes) {
    var n = nodes[e.by] || {}, id = 'edge:' + e.id
    var src = [{ label: e.source ? host(e.source) : 'no source address recorded', url: e.source || null }]
    if (e.announced_utc && e.announced_utc.source) src.push({ label: 'announced: ' + host(e.announced_utc.source), url: e.announced_utc.source })
    return reg({ id: id, type: 'decision edge', label: e.label, title: e.decision, when: e.at, evidence: e.evidence, facts: [['By', n.name || e.by], ['Status', e.status], e.state ? ['State of the service', String(e.state).replace('_', ' ')] : null, e.follows && e.follows.length ? ['Follows', e.follows.join(', ')] : null, e.effect_from_utc || e.effect_to_utc ? ['In effect', (e.effect_from_utc ? dhm(T(e.effect_from_utc)) : 'start not stated') + ' to ' + (e.effect_to_utc ? dhm(T(e.effect_to_utc)) : 'end not stated')] : null, e.effect_note ? ['Effect, as stated', e.effect_note] : null, e.reasons ? ['Reasons', e.reasons.join(' · ')] : null, e.against ? ['Against', e.against.join(' · ')] : null, e.note ? ['Note', e.note] : null], sources: src, read: e.read, by: e.read_by, file: DATA + 'decisions/graph.json', page: 'incidents/2026-11-10-storm-charles/decisions.html', pageName: 'the decisions page' })
  }
  function capItem(m, file) {
    return reg({ id: 'cap:' + m.identifier, type: 'IPMA warning (CAP message)', label: 'fact', title: m.event_pt + (m.areas ? ', ' + m.areas.join(', ') : ', Lisboa'), when: m.sent_utc, whenName: 'Sent', facts: [['In force', dhm(T(m.onset_utc)) + ' to ' + dhm(T(m.expires_utc))], ['Message', m.msg_type + ' ' + m.identifier], m.description_pt ? ['IPMA\'s words', m.description_pt] : null, m.replaces && m.replaces.length ? ['Replaces', m.replaces.map(function (r) { return r.identifier.split('.').pop() + ' (sent ' + dhm(T(r.sent_utc)) + ')' }).join(', ')] : null, m.status ? ['In the feed', m.status] : null], sources: [{ label: 'IPMA through MeteoAlarm\'s feed', url: m.source }], read: m.read_utc, file: DATA + (file || 'weather/cap.json') })
  }
  function warnItem(w, i) {
    return reg({ id: 'warning:' + i, type: 'IPMA warning, Lisbon district', label: 'fact', title: w.level.toUpperCase() + ' ' + w.type + ': ' + w.text_pt, when: w.sent_utc, whenName: 'Sent', facts: [['In force', dhm(T(w.start_utc)) + ' to ' + dhm(T(w.end_utc))]], sources: [{ label: 'IPMA open data, warnings', url: w.source }], read: w.read_utc, file: DATA + 'weather/warnings.json' })
  }
  // a plain value (an observation, a forecast cell): made when it is clicked, from the mark's own data
  function valueItem(id, o) { o.id = id; return reg(o) }

  function openItem(id) {
    var it = items.get(id); if (!panel) return
    // the frame's reader's panel (app/design/panel.js) when the page has it: the item goes in its "This item"; otherwise our own aside
    var SP = window.stormPanel, slot = SP && SP.slot && SP.slot('item'), own = !slot, was = panel.hidden
    if (slot) { SP.show({}); panel = slot; panel.classList.add('lab-item') }
    else { panel.hidden = false; panel.parentNode.classList.add('has-item') }
    panel.textContent = ''
    if (!it) { add(panel, h('p', { class: 'meta', text: 'Nothing recorded for ' + id })); return }
    var t = T(it.when)
    add(panel, [
      own && h('button', { type: 'button', class: 'lab-close', 'aria-label': 'Close', text: '×', on: { click: function () { panel.hidden = true; panel.parentNode.classList.remove('has-item'); if (Labs.onPanel) Labs.onPanel() } } }),
      h('p', { class: 'lab-kind' }, it.label ? h('span', { class: 'lbl l-' + String(it.label).split(' ')[0], text: it.label }) : null, ' ', it.type),
      h('h3', { text: it.title }),
      h('p', { class: 'lab-when' }, (it.whenName || 'When') + ': ', h('time', { datetime: it.when || '', text: (it.approx ? 'about ' : '') + when(it.when) }), isNaN(t) ? '' : ' UTC'),
      h('dl', { class: 'lab-kv' }, (it.facts || []).filter(Boolean).map(function (f) { return [h('dt', { text: f[0] }), h('dd', { text: f[1] })] })),
      h('h4', { text: 'Where is the evidence?' }),
      h('ul', { class: 'lab-src' }, (Array.isArray(it.evidence) ? it.evidence : []).filter(function (v) { return v && v.page }).map(function (v) { return h('li', { class: 'lab-cap' }, h('a', { href: root + v.page, text: 'Our capture of ' + host(v.url || '') }), h('span', { class: 'lab-out', text: ' on this site: what the page looked like when we read it, with its hash' })) }).concat((it.sources || []).map(function (x) { return h('li', {}, x.url ? h('a', { href: x.url, rel: 'noopener', text: x.label || host(x.url) }) : (x.label || 'no source recorded'), x.url ? h('span', { class: 'lab-out', text: ' leaves this site (' + host(x.url) + ')' }) : null) }))),
      h('p', { class: 'prov' }, it.read ? ['Read ', h('time', { datetime: it.read, text: dhm(T(it.read)) + ' UTC' }), it.by ? ' by ' + it.by : ''] : 'Time read: not recorded on this item'),
      h('p', { class: 'lab-links' }, it.page ? [h('a', { href: root + it.page, text: 'Open ' + (it.pageName || 'its page') }), ' · '] : null, it.file ? h('a', { href: root + it.file, text: 'The file behind it' }) : null, ' · ', h('code', { text: it.id }))
    ])
    try { history.replaceState(null, '', '#' + encodeURIComponent(id)) } catch (e) { }
    if ((was || !own) && Labs.onPanel) Labs.onPanel()   // the stage got narrower: draw again to fit
  }

  // ---- data
  var cache = {}
  function load(keys) {
    return Promise.all(keys.map(function (k) { return cache[k] || (cache[k] = fetch(root + (FILES[k][0] === '/' ? FILES[k].slice(1) : DATA + FILES[k])).then(function (r) { if (!r.ok) throw new Error(FILES[k] + ': ' + r.status); return r.json() })) })).then(function (a) { var o = {}; keys.forEach(function (k, i) { o[k] = a[i] }); return o })
  }

  // ---- mounting
  function mount(el) {
    var name = el.getAttribute('data-lab'), def = exps[name]; if (!def) return
    root = el.getAttribute('data-root') || ''
    el.textContent = ''
    var tools = h('div', { class: 'lab-tools' }), stage = h('div', { class: 'lab-stage' }), body = h('div', { class: 'lab-body' }, stage)
    panel = h('aside', { class: 'lab-panel', hidden: true, 'aria-live': 'polite', 'aria-label': 'This item' })
    add(el, [tools, body, h('p', { class: 'lab-hint meta', text: 'Every mark opens its row or edge with its source and the time it was read. Times are UTC (Lisbon is on UTC in November).' })]); body.appendChild(panel)
    var state = {}, data; for (var k0 in (def.init || {})) state[k0] = def.init[k0]
    function draw() { stage.textContent = ''; try { def.draw({ el: stage, tools: tools, W: Math.max(320, stage.clientWidth), data: data, state: state, redraw: draw, phone: window.innerWidth < 700 }) } catch (e) { stage.appendChild(h('p', { class: 'meta', text: 'This experiment failed to draw: ' + e.message })); console.error(e) } }
    load(def.needs).then(function (d) {
      data = d; tools.textContent = ''; if (def.setup) def.setup({ tools: tools, data: d, state: state, redraw: draw })
      draw()
      var id = decodeURIComponent(location.hash.slice(1)); if (id && items.has(id)) Labs.openItem(id)
      var lastW = stage.clientWidth, to
      Labs.onPanel = function () { if (stage.clientWidth !== lastW) { lastW = stage.clientWidth; var sy = window.scrollY; draw(); window.scrollTo(0, sy) } }
      window.addEventListener('resize', function () { clearTimeout(to); to = setTimeout(function () { if (stage.clientWidth !== lastW) { lastW = stage.clientWidth; draw() } }, 150) })
    }).catch(function (e) { stage.appendChild(h('p', { class: 'meta', text: 'The data could not be read (' + e.message + ').' })) })
    el.addEventListener('click', function (ev) { var m = ev.target.closest && ev.target.closest('[data-item]'); if (m) { ev.preventDefault(); Labs.openItem(m.getAttribute('data-item')) } })
    el.addEventListener('keydown', function (ev) { if (ev.key !== 'Enter' && ev.key !== ' ') return; var m = ev.target.closest && ev.target.closest('[data-item]'); if (m && m.tagName !== 'BUTTON' && m.tagName !== 'A') { ev.preventDefault(); Labs.openItem(m.getAttribute('data-item')) } })
  }
  // a row of choices in the toolbar
  function choice(tools, name, opts, state, redraw) {
    if (!(name in state)) state[name] = opts[0][0]
    var f = h('fieldset', { class: 'lab-choice' }, h('legend', { text: name }))
    opts.forEach(function (o) { var b = h('button', { type: 'button', 'aria-pressed': String(state[name] === o[0]), text: o[1], on: { click: function () { state[name] = o[0]; f.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)) }); redraw() } } }); f.appendChild(b) })
    tools.appendChild(f); return f
  }
  // the shape of a label: a fact is solid, evidence is hollow, a hypothesis is dashed (and says so). Used by every experiment
  function dot(x, y, r, label, decision) {
    var cls = 'd d-' + String(label || 'fact').split(' ')[0]
    return decision ? s('rect', { x: x - r, y: y - r, width: 2 * r, height: 2 * r, transform: 'rotate(45 ' + x + ' ' + y + ')', class: cls }) : s('circle', { cx: x, cy: y, r: r, class: cls })
  }
  function legend(parts) { return h('p', { class: 'lab-legend' }, parts.map(function (p) { return h('span', { class: 'lg ' + p[0] }, h('i', {}), p[1]) })) }
  // the table twin of a chart (the design's .wx-table): the same marks as rows; a cell { text, item } opens the item like a mark does
  function table(summary, heads, rows) {
    return h('details', { class: 'wx-table lab-table' }, h('summary', { text: summary + ' (' + rows.length + ' rows)' }), h('table', {}, h('thead', {}, h('tr', {}, heads.map(function (x) { return h('th', { scope: 'col', text: x }) }))), h('tbody', {}, rows.map(function (r) { return h('tr', {}, r.map(function (c) { return h('td', {}, c && c.item ? mark(h('button', { type: 'button', class: 'lab-cell', text: c.text }), c.item) : (c == null ? '' : String(c))) })) }))))
  }
  var LABELS = [['lg-fact', 'fact: read at the body that decides or warns'], ['lg-evidence', 'evidence: reported by others'], ['lg-hypothesis', 'hypothesis: our analysis'], ['lg-decision', 'a decision (diamond)']]

  var Labs = window.Labs = { exp: function (name, def) { exps[name] = def }, openItem: openItem, items: items, h: h, s: s, svg: svg, mark: mark, T: T, H: H, DAY: DAY, hm: hm, dhm: dhm, day: day, when: when, dur: dur, dayOnly: dayOnly, scale: scale, axis: axis, level: level, wtype: wtype, levelBar: levelBar, reg: reg, host: host, signalItem: signalItem, edgeItem: edgeItem, capItem: capItem, warnItem: warnItem, valueItem: valueItem, choice: choice, table: table, dot: dot, legend: legend, LABELS: LABELS, DATA: DATA }
  document.addEventListener('DOMContentLoaded', function () { document.querySelectorAll('.lab[data-lab]').forEach(mount) })
})()
