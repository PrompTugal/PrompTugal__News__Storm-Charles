// incident.meteorology@web-summit.dinis: the lineage map. The SVG is drawn at build time from meteorology/graph.json and works
// without this script (every box is a link). This only lights a node's own edges when it is pointed at or focused.
(function () {
    var svg = document.querySelector('#met-map svg.mg'); if (!svg) return
    var edges = [].slice.call(svg.querySelectorAll('.mg-edge')), nodes = {}
    ;[].forEach.call(svg.querySelectorAll('.mg-node'), function (n) { nodes[n.getAttribute('data-id')] = n })
    function show(id) {
        clear(); if (!id) return
        var any = false
        edges.forEach(function (e) { var a = e.getAttribute('data-a'), b = e.getAttribute('data-b'); if (a === id || b === id) { any = true; e.classList.add('on'); nodes[a] && nodes[a].classList.add('on'); nodes[b] && nodes[b].classList.add('on') } })
        nodes[id].classList.add('on'); if (any) svg.classList.add('focus')
    }
    function clear() { svg.classList.remove('focus'); [].forEach.call(svg.querySelectorAll('.on'), function (x) { x.classList.remove('on') }) }
    Object.keys(nodes).forEach(function (id) { var n = nodes[id]; n.addEventListener('mouseenter', function () { show(id) }); n.addEventListener('focus', function () { show(id) }); n.addEventListener('mouseleave', clear); n.addEventListener('blur', clear) })
})()
