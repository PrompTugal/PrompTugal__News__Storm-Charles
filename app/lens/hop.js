// The one-hop drawing on a node page (incident.entities@web-summit.dinis). tools/entities-build.mjs mounts
// <figure class="ent-hop" data-base data-node>; this fills it from entities/index.json (names, types) and entities/edges.json
// (every edge as [from, verb, to, label], and how each verb reads). Left: the nodes whose edges point here; right: the nodes this
// one points at; grouped by verb. Nothing is said here that the lists below it do not say with their sources: it is a drawing of them.
(function () {
    'use strict'
    var fig = document.querySelector('figure.ent-hop[data-node]'); if (!fig) return
    var base = fig.getAttribute('data-base') || '', id = fig.getAttribute('data-node'), MAX = 12
    // the frame mounts above the text: put the drawing after the summary, before the first list of edges
    var art = document.querySelector('article'), h2 = art && art.querySelector('h2'), wrap = fig.parentNode
    if (h2) { h2.parentNode.insertBefore(fig, h2); var m = wrap && wrap.closest('main'); if (m && !wrap.children.length) m.remove() }
    var get = function (p) { return fetch(base + p).then(function (r) { if (!r.ok) throw new Error(p + ' ' + r.status); return r.json() }) }
    Promise.all([get('entities/index.json'), get('entities/edges.json')]).then(function (d) {
        var N = {}; d[0].nodes.forEach(function (n) { N[n.id] = n })
        var V = d[1].verbs, me = N[id]; if (!me) return
        var side = function (mine, other, word) {       // groups: [{ verb phrase, items: [{ id, label }] }]
            var g = {}, order = []
            d[1].edges.forEach(function (e) { if (e[mine] !== id || !N[e[other]]) return; if (!g[e[1]]) { g[e[1]] = []; order.push(e[1]) } g[e[1]].push({ id: e[other], label: e[3] }) })
            return order.map(function (v) { return { verb: (V[v] || [v, v])[word], items: g[v] } })
        }
        var out = side(0, 2, 0), inn = side(2, 0, 1); if (!out.length && !inn.length) { fig.remove(); return }
        var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
        var cut = function (s, n) { return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s }
        var W = 760, BW = 250, CW = 170, RH = 26, BH = 20, cx = (W - CW) / 2, s = '', shown = 0, total = 0
        var rows = function (groups) { var r = []; groups.forEach(function (g) { r.push({ verb: g.verb, n: g.items.length }); g.items.slice(0, MAX).forEach(function (i) { r.push(i) }); if (g.items.length > MAX) r.push({ more: g.items.length - MAX }); total += g.items.length; shown += Math.min(g.items.length, MAX) }); return r }
        var L = rows(inn), R = rows(out), H = Math.max(L.length, R.length, 2) * RH + 8, cy = H / 2
        var col = function (list, x, left) {
            var y0 = (H - list.length * RH) / 2
            list.forEach(function (r, k) {
                var y = y0 + k * RH + RH / 2, tx = x + 8
                if (r.verb) { s += '<text class="verb" x="' + tx + '" y="' + (y + 6) + '">' + esc(r.verb) + (r.n > 1 ? ' (' + r.n + ')' : '') + '</text>'; return }
                if (r.more) { s += '<text class="more" x="' + tx + '" y="' + (y + 4) + '">and ' + r.more + ' more, listed below</text>'; return }
                var n = N[r.id], a = left ? x + BW : x, b = left ? cx : cx + CW, mid = (a + b) / 2
                s += '<path class="l-' + esc(r.label || 'ours') + '" d="M' + a + ' ' + y + ' C' + mid + ' ' + y + ' ' + mid + ' ' + cy + ' ' + b + ' ' + cy + '"/>'
                s += '<a href="' + esc(base + 'entities/' + n.id + '.html') + '"><title>' + esc(n.name + ' (' + n.type + '; ' + (r.label || 'ours') + ')') + '</title><rect class="box" x="' + x + '" y="' + (y - BH / 2) + '" width="' + BW + '" height="' + BH + '" rx="3"/><text x="' + tx + '" y="' + (y + 4) + '">' + esc(cut(n.name, 38)) + '</text></a>'
            })
        }
        col(L, 0, true); col(R, W - BW, false)
        s += '<g class="here"><rect class="box" x="' + cx + '" y="' + (cy - 22) + '" width="' + CW + '" height="44" rx="4"/><text x="' + (cx + CW / 2) + '" y="' + (cy - 2) + '" text-anchor="middle">' + esc(cut(me.name, 24)) + '</text><text class="kind" x="' + (cx + CW / 2) + '" y="' + (cy + 13) + '" text-anchor="middle">' + esc(me.type) + '</text></g>'
        var key = ['fact', 'evidence', 'hypothesis', 'ours'].map(function (l, k) { return '<svg class="key" viewBox="0 0 30 8" style="display:inline-block;width:30px;height:8px" aria-hidden="true"><path class="l-' + l + '" d="M0 4H30"/></svg> ' + l }).join(' · ')
        fig.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc('One hop from ' + me.name + ': ' + inn.reduce(function (a, g) { return a + g.items.length }, 0) + ' edges in, ' + out.reduce(function (a, g) { return a + g.items.length }, 0) + ' out; the same edges are listed below with their sources') + '">' + s + '</svg>'
            + '<figcaption>One hop from this node: on the left what points here, on the right what it points at' + (shown < total ? ' (' + shown + ' of ' + total + ' edges drawn)' : '') + '. A drawing of the edges listed below, where each has its source and the time read. The line is the label: ' + key + '.</figcaption>'
    }).catch(function () { fig.remove() })
})()
