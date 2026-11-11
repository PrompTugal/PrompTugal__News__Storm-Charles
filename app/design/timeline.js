// The timeline's filter (incident.designer@web-summit.dinis, design/round-14.md). The page is complete without this file: the build has
// already written each row's label, kind and marks. This only hides rows, counts them, and keeps the row named in the address shown.
(function () {
    var form = document.getElementById('tl-filter'); if (!form) return
    var rows = [].slice.call(document.querySelectorAll('tr.tl-row')), out = document.getElementById('tl-count')
    function vals(f) { return [].slice.call(form.querySelectorAll('input[data-f="' + f + '"]:checked')).map(function (i) { return i.value }) }
    function apply() {
        var labels = vals('label'), kinds = vals('kind'), only = vals('only'), target = location.hash.slice(1), shown = 0
        rows.forEach(function (r) {
            var ok = labels.indexOf(r.dataset.label) >= 0 && kinds.indexOf(r.dataset.kind) >= 0 && only.every(function (o) { return r.classList.contains(o) })
            if (r.id === target) ok = true
            r.hidden = !ok; if (ok) shown++
        })
        // a day heading with no row left under it is hidden too
        ;[].slice.call(document.querySelectorAll('tr.tl-day')).forEach(function (d) { var n = d.nextElementSibling, any = false; while (n && !n.classList.contains('tl-day')) { if (!n.hidden) any = true; n = n.nextElementSibling } d.hidden = !any })
        if (out) out.textContent = shown === rows.length ? rows.length + ' rows' : shown + ' of ' + rows.length + ' rows'
    }
    form.hidden = false
    form.addEventListener('change', apply)
    window.addEventListener('hashchange', apply)
    apply()
})()
