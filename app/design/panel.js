// The reader's panel (incident.designer@web-summit.dinis, design/round-30.md; RESTRUCTURE.md "The reader's panel").
// One part every page gets from the frame: Lens, This item, Source, Theme, Version. Nothing here fetches anything outside this site.
// For other agents: window.stormPanel.show({ title, html, text, links: [{ href, label }] }) puts a thing in "This item" and opens the panel.
(function () {
    var root = document.documentElement, panel = document.getElementById('panel'), btn = document.getElementById('panel-btn'); if (!panel || !btn) return
    var base = panel.dataset.base || './'
    function store(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v) } catch (e) { } }
    function read(k) { try { return localStorage.getItem(k) } catch (e) { return null } }
    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
    // open and closed
    function setOpen(o, keep) { root.classList.toggle('panel-open', o); panel.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); btn.textContent = o ? 'Panel ×' : 'Panel'; if (keep) store('panel', o ? 'open' : 'closed') }
    btn.hidden = false; setOpen(root.classList.contains('panel-open'), false)
    btn.addEventListener('click', function () { setOpen(panel.hidden, true) })
    var cls = document.getElementById('panel-close'); if (cls) cls.addEventListener('click', function () { setOpen(false, true); btn.focus() })
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden && window.innerWidth < 1100) setOpen(false, true) })
    // which accordions are open is remembered
    ;[].forEach.call(panel.querySelectorAll('details'), function (d) { var k = 'pn:' + d.id, v = read(k); if (v !== null) d.open = v === '1'; d.addEventListener('toggle', function () { store(k, d.open ? '1' : '0'); if (d.open && d.id === 'pn-source') source(); if (d.open && d.id === 'pn-version') version() }) })
    // lens
    var boxes = [].slice.call(panel.querySelectorAll('input[data-lens]'))
    boxes.forEach(function (b) { b.checked = root.classList.contains('lens-' + b.dataset.lens); b.addEventListener('change', function () { root.classList.toggle('lens-' + b.dataset.lens, b.checked); store('lens', boxes.filter(function (x) { return x.checked }).map(function (x) { return x.dataset.lens }).join(',')) }) })
    // theme
    var radios = [].slice.call(panel.querySelectorAll('input[name="pn-theme"]')), cur = root.dataset.theme || 'auto'
    radios.forEach(function (r) { r.checked = r.value === cur; r.addEventListener('change', function () { if (r.value === 'auto') { delete root.dataset.theme; store('theme', null) } else { root.dataset.theme = r.value; store('theme', r.value) } }) })
    // this item
    var item = document.getElementById('panel-item')
    function show(o) {
        var links = (o.links || []).map(function (l) { var out = /^https?:/.test(l.href) && l.href.indexOf(location.host) < 0; return '<li><a href="' + esc(l.href) + '">' + esc(l.label || l.href) + '</a>' + (out ? ' <span class="pn-meta">leaves this site</span>' : '') + '</li>' }).join('')
        item.innerHTML = (o.title ? '<h3>' + esc(o.title) + '</h3>' : '') + (o.html || (o.text ? '<p>' + esc(o.text) + '</p>' : '')) + (links ? '<ul class="pn-links">' + links + '</ul>' : '')
        var d = document.getElementById('pn-item'); if (d) d.open = true
        if (panel.hidden) setOpen(true, false)
    }
    // hooks for the other agents: a slot per accordion (an element to fill), show() for anything, openItem(id) for an entity
    // (handed to incident.entities@'s window.StormLens.show when it is loaded), openSource(address) for a file of this site
    var SLOT = { lens: 'panel-lens', item: 'panel-item', source: 'panel-source', theme: 'panel-theme', version: 'panel-version' }
    window.stormPanel = {
        show: show, open: function () { setOpen(true, true) }, close: function () { setOpen(false, true) }, isOpen: function () { return !panel.hidden },
        slot: function (name) { return document.getElementById(SLOT[name] || '') },
        openItem: function (id) { if (panel.hidden) setOpen(true, false); var d = document.getElementById('pn-item'); if (d) d.open = true; if (window.StormLens && typeof window.StormLens.show === 'function') window.StormLens.show(id); else show({ title: id, text: 'This thing has no page yet.' }) },
        openSource: function (href, label) { openSource(href, label) }
    }
    function linksOf(el) { return [].slice.call(el.querySelectorAll('a[href]')).concat(el.matches && el.matches('a[href]') ? [el] : []).map(function (a) { return { href: a.href, label: (a.textContent || '').trim().slice(0, 90) || a.href } }) }
    document.addEventListener('click', function (e) {
        if (e.target.closest('#panel')) return
        var bar = e.target.closest('.wx-bar, .wx-cell[title], .wx-d, .wx-cellmap'), row = !bar && e.target.closest('tr.tl-row')
        if (bar) {
            if (bar.matches('a[href]') && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) e.preventDefault()   // a bar's link opens from the panel: first what we hold, then the way out
            var lane = bar.closest('.wx-row'), lab = lane && lane.querySelector('.wx-lab b'), card = bar.closest('.card'), h2 = card && card.querySelector('h2')
            show({ title: (lab ? lab.textContent.trim() + ': ' : '') + (bar.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120), text: bar.getAttribute('title') || '', links: linksOf(bar).concat(h2 && card.id ? [{ href: '#' + card.id, label: h2.textContent.trim() }] : []) })
        } else if (row && !e.target.closest('a')) {
            var cells = row.children; show({ title: (row.querySelector('time') || {}).textContent + ' · ' + (row.dataset.label || '') + (row.classList.contains('decision') ? ' · decision' : ''), html: '<p>' + cells[1].innerHTML + '</p><p class="pn-meta">Source: ' + cells[2].innerHTML + '</p>', links: [{ href: '#' + row.id, label: 'This row: ' + row.id }] })
        }
    })
    // a link to a file of this site (.json, .md, .txt) opens in the panel, shown, not as a bare file; with a modifier key it opens as usual
    function openSource(href, label) {
        var box = document.getElementById('panel-source'), d = document.getElementById('pn-source'); srcDone = true
        if (panel.hidden) setOpen(true, false); if (d) d.open = true
        box.innerHTML = '<p class="pn-meta">Loading ' + esc(label || href) + '</p>'
        fetch(href).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text() }).then(function (t) {
            var shown = t; if (/\.json(\?|#|$)/.test(href)) { try { shown = JSON.stringify(JSON.parse(t), null, 1) } catch (e) { } }
            var page = /\.md(\?|#|$)/.test(href) ? href.replace(/(^|\/)README\.md/, '$1index.html').replace(/\.md/, '.html') : ''
            var root = new URL(base, location.href), rel = ''; try { var uu = new URL(href, location.href); if (uu.pathname.indexOf(root.pathname) === 0) rel = uu.pathname.slice(root.pathname.length) } catch (e) { }
            var viewer = rel && /\.json$/.test(rel) ? base + 'view/?path=' + encodeURIComponent(rel) : ''
            box.innerHTML = '<p><b>' + esc(label || href.split('/').pop()) + '</b></p><p class="pn-meta">' + t.length.toLocaleString('en-GB') + ' characters' + (shown.length > 30000 ? ' (the first 30,000 shown)' : '') + ' · <a href="' + esc(href) + '" data-raw="1">the file itself</a>' + (page ? ' · <a href="' + esc(page) + '">its page</a>' : '') + (viewer ? ' · <a href="' + esc(viewer) + '">in the file viewer</a>' : '') + '</p><pre>' + esc(shown.slice(0, 30000)) + '</pre>'
            box.scrollIntoView({ block: 'nearest' })
        }).catch(function () { box.innerHTML = '<p class="pn-meta">Could not read <a href="' + esc(href) + '" data-raw="1">' + esc(href) + '</a>.</p>' })
    }
    document.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        var a = e.target.closest('a[href]'); if (!a || a.dataset.raw || a.target === '_blank' || a.closest('header.top')) return
        var url; try { url = new URL(a.href) } catch (x) { return }
        if (url.origin !== location.origin || !/\.(json|md|txt)$/.test(url.pathname)) return
        e.preventDefault(); openSource(a.href, (a.textContent || '').trim().slice(0, 80))
    })
    // source: the file behind the page, shown
    var srcDone = false
    function source() {
        if (srcDone) return; srcDone = true
        var box = document.getElementById('panel-source'), twin = panel.dataset.twin
        if (!twin) { box.innerHTML = '<p class="pn-meta">This page has no single source file. The data behind the site: <a href="' + esc(base) + 'datasets.html">the data</a>.</p>'; return }
        box.innerHTML = '<p class="pn-meta">Loading ' + esc(twin) + '</p>'
        fetch(twin).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text() }).then(function (t) { box.innerHTML = '<p class="pn-meta"><a href="' + esc(twin) + '">' + esc(twin) + '</a>, ' + t.length.toLocaleString('en-GB') + ' characters' + (t.length > 20000 ? ' (the first 20,000 shown)' : '') + '</p><pre>' + esc(t.slice(0, 20000)) + '</pre>' }).catch(function () { box.innerHTML = '<p class="pn-meta">Could not read <a href="' + esc(twin) + '">' + esc(twin) + '</a>.</p>' })
    }
    // version: what was built, from which commit, when
    var verDone = false
    function version() {
        if (verDone) return; verDone = true
        var box = document.getElementById('panel-version')
        fetch(base + 'version.json').then(function (r) { return r.json() }).then(function (v) {
            box.innerHTML = '<dl class="pn-dl"><dt>Version</dt><dd><a href="' + esc(base) + 'version.json">' + esc(v.version) + '</a>' + (v.version !== panel.dataset.version ? ' <span class="pn-meta">(this page was built as ' + esc(panel.dataset.version) + ': reload for the latest)</span>' : '') + '</dd>' + (v.commit ? '<dt>Commit</dt><dd><code>' + esc(String(v.commit).slice(0, 10)) + '</code></dd>' : '') + (v.pushed_at ? '<dt>Pushed</dt><dd>' + esc(String(v.pushed_at).replace('T', ' ').slice(0, 19)) + ' UTC</dd>' : '') + (v.built_at ? '<dt>Built</dt><dd>' + esc(String(v.built_at).replace('T', ' ').slice(0, 19)) + ' UTC</dd>' : '') + '</dl>'
        }).catch(function () { })
    }
    // a link to a part inside a folded block opens the fold first
    function unfold() { var t = location.hash.length > 1 && document.getElementById(location.hash.slice(1)); for (var d = t && t.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true }
    window.addEventListener('hashchange', unfold); unfold()
    if (document.getElementById('pn-source').open) source()
    if (document.getElementById('pn-version').open) version()
})()
