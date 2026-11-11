// Other models, measured (incident.models@web-summit.dinis): draws the charts of models/ from models/results.json and
// models/ledger-summary.json, both made by tools/models-report.mjs. Reads nothing else; the same figures are in the page's tables.
// One measure per chart (right answers out of items asked); open-weight bars are solid, commercial ones hatched and named so.
(function () {
  'use strict'
  var el = document.getElementById('models'); if (!el) return
  var base = el.dataset.base || './', view = el.dataset.view || 'index', task = el.dataset.task
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var usd = function (v) { return v == null ? '' : v === 0 ? '0' : v < 0.0001 ? v.toFixed(6) : v < 0.01 ? v.toFixed(5) : v.toFixed(4) }
  var hm = function (t) { return String(t).slice(0, 16).replace('T', ' ') + ' UTC' }
  var prov = function (file, name, at) { return '<span class="prov">Source: <a href="' + esc(base + file) + '">' + esc(name) + '</a>, written <time datetime="' + esc(at) + '">' + esc(hm(at)) + '</time></span>' }
  var get = function (f) { return fetch(base + f, { cache: 'no-store' }).then(function (r) { if (!r.ok) throw new Error(f + ' ' + r.status); return r.json() }) }

  function rows(title, sub, R, models, per) {
    var h = '<section class="card mdl"><h2>' + esc(title) + '</h2><p class="meta">' + sub + '</p><div class="mdl-rows" role="table" aria-label="' + esc(title) + '">' +
      '<span class="h">Model</span><span class="h">Right answers, of items asked</span><span class="h">Right</span><span class="h cost">USD per item</span>'
    models.forEach(function (m) {
      var r = per(m.id); if (!r) return
      var pct = r.asked ? 100 * r.right / r.asked : 0, kind = m.open_weight ? 'open-weight' : 'commercial'
      var tip = m.id + ' (' + kind + ', ' + m.size + '): ' + r.right + ' of ' + r.asked + ' right; ' + usd(r.cost_per_item_usd) + ' USD per item; median ' + (r.latency_ms_median / 1000).toFixed(1) + ' s'
      h += '<div class="mdl-row" role="row" title="' + esc(tip) + '"><span class="name" role="cell"><code>' + esc(m.id.split('/')[1]) + '</code> <span class="meta">' + kind + (m.reasoning ? '; reasoning: ' + esc(String(m.reasoning).replace(/ \(.*/, '')) : '') + '</span></span>' +
        '<span class="mdl-track" role="cell" tabindex="0" aria-label="' + esc(tip) + '"><span class="mdl-bar' + (m.open_weight ? '' : ' com') + '" style="width:' + pct.toFixed(1) + '%"></span></span>' +
        '<span class="num" role="cell">' + r.right + '/' + r.asked + '</span><span class="num cost" role="cell">' + usd(r.cost_per_item_usd) + '</span></div>'
    })
    return h + '</div><p class="mdl-legend"><span><i class="mdl-bar"></i>open-weight</span><span><i class="mdl-bar com"></i>commercial (API only)</span><span>bar: share of runs with every field right</span></p><p>' + prov('results.json', 'results.json', R.updated) + '</p></section>'
  }

  Promise.all([get('results.json'), view === 'index' ? get('ledger-summary.json') : null]).then(function (d) {
    var R = d[0], L = d[1], h = ''
    if (view === 'index') {
      var day = L.days[L.days.length - 1] || { calls: 0, cost_usd: 0, cap_usd: 5, by_model: {} }, items = Object.keys(R.tasks).reduce(function (s, k) { return s + R.tasks[k].items }, 0)
      var tile = function (b, t, s) { return '<div class="wx-tile"><b>' + esc(b) + '</b><p>' + esc(t) + '</p><p class="meta">' + s + '</p></div>' }
      h += '<div class="mdl-tiles">' + tile((day.by_status && day.by_status.ok ? day.by_status.ok.calls : day.calls), 'answered model calls on ' + day.day, prov('ledger-summary.json', 'the ledger\'s summary', L.updated)) +
        tile(Object.keys(day.by_model).length, 'third-party models called', prov('ledger-summary.json', 'the ledger\'s summary', L.updated)) +
        tile(usd(day.cost_usd) + ' USD', 'spent, of a ' + day.cap_usd + ' USD daily cap', prov('ledger-summary.json', 'the ledger\'s summary', L.updated)) +
        tile(items, 'checkable items in ' + Object.keys(R.tasks).length + ' tasks', prov('results.json', 'results.json', R.updated)) + '</div>'
      h += rows('All tasks together', 'Each row\'s right runs over every run it was asked (an item asked three times counts three; rows were not all asked the same items: round 2 is partial). A measurement on small samples, not a ranking to quote.', R, R.models, function (id) { return R.overall[id] })
    } else if (R.tasks[task]) {
      h += rows(R.tasks[task].title, R.tasks[task].items + ' items; a run is right when every scored field is. Scoring: ' + esc(R.tasks[task].scoring) + '.', R, R.models, function (id) { return R.tasks[task].models[id] })
    }
    el.innerHTML = h
  }).catch(function (e) { el.insertAdjacentHTML('beforeend', '<p class="meta">The chart could not be drawn (' + esc(e.message) + '); the tables below hold the same figures.</p>') })
})()
