// The comparison view of research/weather-sites/compare.md: sort and filter the table the page already shows.
// By incident.weatherwatch@web-summit.dinis. No dependency; colours from the site's tokens only.
(function () {
  var box = document.getElementById('ws-compare'), table = document.querySelector('main.doc article table')
  if (!box || !table) return
  var body = table.tBodies[0], rows = [].slice.call(body.rows), heads = [].slice.call(table.tHead.rows[0].cells)
  var text = function (r, i) { return r.cells[i].textContent.trim() }
  var uniq = function (i) { var s = {}; rows.forEach(function (r) { s[text(r, i)] = 1 }); return Object.keys(s).sort() }
  var sel = function (label, i) { return '<label class="meta">' + label + ' <select data-col="' + i + '"><option value="">all</option>' + uniq(i).map(function (v) { return '<option>' + v.replace(/</g, '&lt;') + '</option>' }).join('') + '</select></label> ' }
  box.innerHTML = '<p><label class="meta">Filter <input type="search" id="ws-q" placeholder="a word or phrase: radar, CC BY 4.0…" size="28"></label> ' +
    sel('Map', 1) + sel('Kind', 2) + sel('Country', 3) + sel('API', 5) + sel('May we show it', 7) + '<span class="meta" id="ws-n"></span></p>'
  var q = box.querySelector('#ws-q'), sels = [].slice.call(box.querySelectorAll('select')), n = box.querySelector('#ws-n')
  function apply() {
    var words = q.value.toLowerCase().trim() ? [q.value.toLowerCase().trim()] : [], shown = 0
    rows.forEach(function (r) {
      var t = r.textContent.toLowerCase()
      var ok = words.every(function (w) { return t.indexOf(w) >= 0 }) && sels.every(function (s) { return !s.value || text(r, +s.dataset.col) === s.value })
      r.hidden = !ok; if (ok) shown++
    })
    n.textContent = shown + ' of ' + rows.length
    var h = sels.filter(function (s) { return s.value }).map(function (s) { return s.dataset.col + '=' + encodeURIComponent(s.value) }).concat(q.value ? ['q=' + encodeURIComponent(q.value)] : []).join('&')
    history.replaceState(null, '', h ? '#' + h : location.pathname)
  }
  q.addEventListener('input', apply); sels.forEach(function (s) { s.addEventListener('change', apply) })
  heads.forEach(function (th, i) {
    th.style.cursor = 'pointer'; th.tabIndex = 0; th.title = 'Sort by ' + th.textContent
    var dir = 1, sort = function () {
      rows.sort(function (a, b) { return dir * text(a, i).localeCompare(text(b, i), undefined, { numeric: true }) })
      rows.forEach(function (r) { body.appendChild(r) }); heads.forEach(function (h) { h.removeAttribute('aria-sort') })
      th.setAttribute('aria-sort', dir > 0 ? 'ascending' : 'descending'); dir = -dir
    }
    th.addEventListener('click', sort); th.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sort() } })
  })
  location.hash.slice(1).split('&').forEach(function (kv) {
    var p = kv.split('='), v = decodeURIComponent(p[1] || '')
    if (p[0] === 'q') q.value = v; else sels.forEach(function (s) { if (s.dataset.col === p[0]) s.value = v })
  })
  var wrap = document.createElement('div'); wrap.className = 'wx-scroll'; wrap.tabIndex = 0; table.parentNode.insertBefore(wrap, table); wrap.appendChild(table)
  apply()
})()
