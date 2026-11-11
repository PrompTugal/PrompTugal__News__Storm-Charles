// The lens's content (incident.entities@web-summit.dinis). The panel, its switches and its slots are incident.designer@'s
// (app/design/panel.js: window.stormPanel). This script:
//   - fills the "Lens" slot with what the linker found on this page (names linked, nodes, outside links);
//   - when the panel is open, a click on a linked name opens its node in "This item" (what it is, its edges with the label,
//     the source and the time read of each, its page); with the panel closed, or with a modifier key, the link is a plain link;
//   - window.StormLens.show(id) is what stormPanel.openItem(id) calls.
(function () {
    function base() { var p = document.getElementById('panel'); if (p && p.dataset.base) return p.dataset.base; var s = document.querySelector('script[src*="app/lens/lens.js"]'); return s ? s.getAttribute('src').split('app/lens/')[0] : './' }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
    function host(u) { try { return new URL(u).host.replace(/^www\./, '') } catch (e) { return 'source' } }
    function when(z) { return z ? String(z).slice(0, 16).replace('T', ' ') + ' UTC' : '' }
    var names = null
    function index() { return names || (names = fetch(base() + 'entities/index.json').then(function (r) { return r.json() }).then(function (j) { var m = {}; j.nodes.forEach(function (n) { m[n.id] = n }); return m })) }
    function slot(name) { return window.stormPanel && window.stormPanel.slot ? window.stormPanel.slot(name) : document.getElementById('panel-' + name) }
    function show(id) {
        var el = slot('item'); if (!el) return false
        var b = base()
        Promise.all([fetch(b + 'entities/' + id + '.json').then(function (r) { if (!r.ok) throw 0; return r.json() }), index()]).then(function (x) {
            var n = x[0], ix = x[1], ss = n.summary_source
            var edge = function (e) {
                var to = ix[e.to] || { name: e.to }
                return '<li>' + esc(e.verb.replace(/_/g, ' ')) + ' <a class="ent" data-ent="' + esc(e.to) + '" href="' + b + 'entities/' + esc(e.to) + '.html">' + esc(to.name) + '</a> <span class="lbl l-' + esc(e.label) + '">' + esc(e.label) + '</span><span class="says">' + esc(e.says || '') + '</span><span class="pn-meta"><a href="' + esc(e.source) + '">' + esc(host(e.source)) + '</a>' + (e.read_utc ? ', read ' + esc(when(e.read_utc)) : '') + (e.row ? ' · row ' + esc(e.row) : '') + '</span></li>'
            }
            el.innerHTML = '<div class="lens-item"><p class="lens-type">' + esc(n.type) + '</p><h3><a href="' + b + 'entities/' + esc(id) + '.html">' + esc(n.name) + '</a></h3><p>' + esc(n.summary || '') + ' <span class="lbl l-' + esc(n.label) + '">' + esc(n.label === 'ours' ? 'our summary' : n.label) + '</span></p>' +
                (ss && ss.url ? '<p class="pn-meta">Read at <a href="' + esc(ss.url) + '">' + esc(host(ss.url)) + '</a>' + (ss.read_utc ? ', ' + esc(when(ss.read_utc)) : '') + '</p>' : '') +
                ((n.edges || []).length ? '<ul>' + n.edges.slice(0, 10).map(edge).join('') + '</ul>' : '<p class="pn-meta">No edge starts here yet.</p>') +
                '<p class="pn-meta"><a href="' + b + 'entities/' + esc(id) + '.html">Its page</a>: ' + (n.edges || []).length + ' edges out, the edges in, the timeline rows that name it, its evidence' + (n.graph ? '; in the graph as ' + esc(n.graph) : '') + '.</p></div>'
        }).catch(function () { el.innerHTML = '<p class="pn-meta">No node at ' + esc(id) + ' yet.</p>' })
        return true
    }
    function start() {
        var lens = slot('lens')
        if (lens) {
            var ents = document.querySelectorAll('main a.ent, .banner a.ent, body > .wrap a.ent'), ids = {}; [].forEach.call(ents, function (a) { ids[a.getAttribute('data-ent')] = 1 })
            lens.innerHTML = '<p class="lens-count">On this page: ' + ents.length + ' linked name' + (ents.length === 1 ? '' : 's') + ' (' + Object.keys(ids).length + ' things), ' + document.querySelectorAll('a.out').length + ' links that leave this site. With this panel open, a click on a linked name opens it under "This item". <a href="' + base() + 'entities/index.html">Every entity</a> · <a href="' + base() + 'entities/ontology.html">the grammar</a></p>'
        }
        document.addEventListener('click', function (ev) {
            if (ev.defaultPrevented || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return
            var a = ev.target.closest && ev.target.closest('a[data-ent]'); if (!a) return
            var P = window.stormPanel; if (!P || !P.isOpen || !P.isOpen()) return
            ev.preventDefault(); P.openItem ? P.openItem(a.getAttribute('data-ent')) : show(a.getAttribute('data-ent'))
        })
    }
    window.StormLens = { show: show }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start()
})()
