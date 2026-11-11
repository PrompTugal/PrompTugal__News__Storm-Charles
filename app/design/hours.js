// Residents under each IPMA level, hour by hour (incident.designer@web-summit.dinis, design/round-60.md and round-64.md).
// A part of the frame: a page mounts it with <div data-hours-chart="<path to people-by-hour.json>"></div>; frame.js loads this file
// only when such an element exists. Data and method are incident.datascience@'s; the drawing is the frame's. No colour is written here:
// IPMA's colours only on the level bars (rect.lv-*), counts and axes in neutral tokens (site.css). Not a warning service: it shows IPMA's
// warnings as read, multiplied by census residents; it forecasts nothing.
(function () {
  var LV = [['red', 'Red'], ['orange', 'Orange'], ['yellow', 'Yellow']]
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  function hm(iso) { return String(iso).slice(11, 16) }
  function mil(n) { return (n % 1e6 ? (n / 1e6).toFixed(1) : String(n / 1e6)) + ' M' }
  function full(n) { return Number(n).toLocaleString('en-GB') }
  function confParts(text) {
    var t = String(text || ''), out = []
    function add(word, where) { var k = word.toLowerCase(); out.push('<span class="conf ' + k + '"><b aria-hidden="true">' + { high: '●●●', medium: '●●○', low: '●○○' }[k] + '</b>' + k + ' confidence' + (where ? ', ' + esc(where) : '') + '</span>') }
    var m = t.match(/\b(HIGH|MEDIUM|LOW)\b[^;.]*?(mainland)/i); if (m) add(m[1], 'mainland')
    var d = t.match(/\b(HIGH|MEDIUM|LOW)\b[^;.]*?(Madeira)/i); if (d) add(d[1], 'Madeira')
    if (!out.length) { var g = t.match(/\b(HIGH|MEDIUM|LOW)\b/i); if (g) add(g[1]) }
    return out.join(' ')
  }
  function draw(box, d) {
    var hrs = (d.hours || []).filter(function (h) { return h && h.hour_utc })
    if (!hrs.length) { box.innerHTML = '<p class="meta">No hours in this read.</p>'; return }
    var tot = function (h) { return (h.red || 0) + (h.orange || 0) + (h.yellow || 0) }
    var max = Math.max.apply(null, hrs.map(tot)) || 1
    var step = max > 8e6 ? 2e6 : max > 3e6 ? 1e6 : 5e5, top = Math.ceil(max / step) * step
    var n = hrs.length, col = 34, L = 56, R = 8, T = 10, B = 28, H = 200
    var W = Math.max(760, L + R + n * col), plotW = W - L - R, cw = plotW / n
    var y = function (v) { return T + H - v / top * H }
    var s = '<svg class="wx-chart hc-svg" viewBox="0 0 ' + W + ' ' + (T + H + B) + '" role="img" aria-labelledby="hc-t-' + box.__id + '">'
    s += '<title id="hc-t-' + box.__id + '">Residents in areas under each IPMA warning level, by UTC hour, from ' + esc(hm(hrs[0].hour_utc)) + ' to ' + esc(hm(hrs[n - 1].hour_utc)) + '</title>'
    for (var g = 0; g <= top; g += step) s += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(g) + '" y2="' + y(g) + '"/><text class="count" x="' + (L - 6) + '" y="' + (y(g) + 4) + '" text-anchor="end">' + (g ? mil(g) : '0') + '</text>'
    hrs.forEach(function (h, i) {
      var x = L + i * cw + 3, w = cw - 6, base = 0
      LV.forEach(function (lv) { var v = h[lv[0]] || 0; if (!v) return; s += '<rect class="lv-' + lv[0] + '" x="' + x.toFixed(1) + '" width="' + w.toFixed(1) + '" y="' + y(base + v).toFixed(1) + '" height="' + (y(base) - y(base + v)).toFixed(1) + '"><title>' + esc(hm(h.hour_utc)) + ' UTC, ' + lv[1].toLowerCase() + ': ' + full(v) + ' residents</title></rect>'; base += v })
      var day = h.hour_utc.slice(11, 13) === '00'
      s += '<text class="count" x="' + (x + w / 2).toFixed(1) + '" y="' + (T + H + 16) + '" text-anchor="middle">' + (day ? h.hour_utc.slice(8, 10) + '/' : '') + h.hour_utc.slice(11, 13) + '</text>'
    })
    s += '</svg>'
    var pk = d.peak || {}, pkh = pk.hour_utc ? hm(pk.hour_utc) : ''
    var head = pk.red ? 'About <b>' + (pk.red / 1e6).toFixed(1) + ' million residents</b> live in areas under IPMA red at ' + esc(pkh) + ' UTC, the worst hour in this read.'
      : pk.orange ? 'About <b>' + (pk.orange / 1e6).toFixed(1) + ' million residents</b> live in areas under IPMA orange at ' + esc(pkh) + ' UTC, the worst hour in this read.'
      : pk.yellow ? 'No area is under IPMA orange or red in this read; at most about <b>' + (pk.yellow / 1e6).toFixed(1) + ' million residents</b> live in areas under yellow (' + esc(pkh) + ' UTC).' : 'No area is under an IPMA warning in the hours of this read.'
    var legend = '<ul class="wx-legend hc-legend">' + LV.map(function (lv) { return '<li><svg width="14" height="14" aria-hidden="true"><rect class="lv-' + lv[0] + '" width="14" height="14"/></svg> ' + lv[1] + '</li>' }).join('') + '</ul>'
    var src = d.source ? '<a href="' + esc(d.source) + '">IPMA warnings</a>' : 'IPMA warnings'
    var prov = '<p class="prov">' + src + ' read <time datetime="' + esc(d.read_utc) + '">' + esc(hm(d.read_utc)) + ' UTC</time> × INE Census 2021 residents · ' + esc(String(d.by || '').split('@')[0]) + ' ' + confParts(d.confidence) + '</p>'
    var rows = hrs.map(function (h) { return '<tr><td>' + esc(h.hour_utc.slice(0, 16).replace('T', ' ')) + '</td><td>' + full(h.red || 0) + '</td><td>' + full(h.orange || 0) + '</td><td>' + full(h.yellow || 0) + '</td></tr>' }).join('')
    var table = '<details class="wx-table"><summary>The table</summary><table><thead><tr><th>Hour (UTC)</th><th>Red</th><th>Orange</th><th>Yellow</th></tr></thead><tbody>' + rows + '</tbody></table></details>'
    box.innerHTML = '<p class="hc-head">' + head + '</p>' + legend + '<div class="wx-scroll" tabindex="0" role="region" aria-label="Residents by hour, scrolls sideways">' + s + '</div>'
      + '<p class="meta">Residents where they sleep (INE Census 2021), not people at risk and not visitors. IPMA drops windows that have ended, so hours before the read may be missing: a missing hour is not zero.</p>'
      + prov + table
  }
  var id = 0
  document.querySelectorAll('[data-hours-chart]').forEach(function (box) {
    box.__id = ++id; box.classList.add('hc')
    fetch(box.getAttribute('data-hours-chart'), { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(function (d) { draw(box, d) })
      .catch(function () { box.innerHTML = '<p class="meta">The hour-by-hour chart could not be read: <a href="' + esc(box.getAttribute('data-hours-chart')) + '">the data file</a>.</p>' })
  })
})()
