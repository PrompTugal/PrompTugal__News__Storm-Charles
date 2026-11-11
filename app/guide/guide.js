// incident.sherpa@web-summit.dinis: /guide/, "Are you in Lisbon right now?": the use cases as guided paths.
// Reads only this site's own files (the data room's JSON); makes no outside request.
// Not a warning service: every answer is what an authority or operator stated, with its source and the time read; never inferred.
(function () {
  'use strict'
  var el = document.getElementById('gd'); if (!el) return
  var base = el.getAttribute('data-base') || '../', inc = el.getAttribute('data-incident')
  var room = base + 'incidents/' + inc + '/data/'
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] }) }
  var T = function (t) { if (!t || typeof t !== 'string') return NaN; if (/^\d{4}-\d\d-\d\d$/.test(t)) t += 'T00:00'; if (/T\d\d:\d\d$/.test(t)) t += ':00'; if (!/Z|[+-]\d\d:?\d\d$/.test(t)) t += 'Z'; return Date.parse(t) }
  var iso = function (t) { var d = new Date(T(t)); return isNaN(d) ? '' : d.toISOString() }
  var hm = function (t) { var s = iso(t); return s ? s.slice(11, 16) : '?' }
  var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var dhm = function (t) { var s = iso(t); if (!s) return 'time not stated'; var d = new Date(s); return DAY[d.getUTCDay()] + ' ' + s.slice(8, 10) + ' Nov ' + s.slice(11, 16) }
  var tm = function (t, txt) { var s = iso(t); return s ? '<time datetime="' + s + '">' + esc(txt || dhm(t)) + '</time>' : esc(txt || 'time not stated') }
  var host = function (u) { try { return new URL(u).hostname.replace(/^www\./, '') } catch (e) { return 'source' } }
  var age = function (t) { var h = (now - T(t)) / 36e5; return h >= 3 ? ' (' + Math.round(h) + ' h ago)' : '' }
  var prov = function (label, url, read, pub, k) {
    return '<span class="prov">' + (k === 'evidence' ? 'reported by ' : '') + (url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(label || host(url)) + '</a>' : esc(label || 'no address')) +
      (pub ? (/^\d{4}-\d\d-\d\d$/.test(pub) ? ', published ' + tm(pub, dhm(pub).slice(0, 10)) + ' (time not stated)' : ', published ' + tm(pub) + ' UTC') : '') + (read ? ', read ' + tm(read) + ' UTC' + age(read) : '') + '</span>'
  }
  var kind = function (l) { l = String(l || '').toLowerCase(); return /fact|official/.test(l) ? 'fact' : /hyp/.test(l) ? 'hypothesis' : /none/.test(l) ? 'not stated' : 'evidence' }
  var lbl = function (l) { var k = kind(l); return '<span class="lbl l-' + k.replace(' ', '-') + ' gd-l-' + k.replace(' ', '-') + '">' + k + '</span>' }
  var get = function (u) { return fetch(room + u, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null }).catch(function () { return null }) }
  var TYPE = { 'Precipitação': 'rain', 'Vento': 'wind', 'Agitação Marítima': 'waves (sea)', 'Trovoada': 'thunderstorms', 'Nevoeiro': 'fog', 'Neve': 'snow', 'Tempo Quente': 'heat', 'Tempo Frio': 'cold' }
  var AREA = { LSB: 'Lisbon', MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountains', MPS: 'Porto Santo' }
  var RANK = { red: 3, orange: 2, yellow: 1, green: 0 }
  var STATE = { closed: 'closed', suspended: 'suspended', limited: 'limited', running: 'running', happened: 'announced', not_announced: 'not announced', aim_stated: 'an aim, not a promise', superseded: 'superseded', expected: 'expected' }
  var stateOf = function (d) {
    var s = d.state || d.status, t = String(d.decision || '')
    if (/\baims? to\b/i.test(t) && s === 'running') return 'aim_stated'
    if (s === 'happened' && /\b(closed?|closes)\b/i.test(t) && !/\breopen/i.test(t)) return 'closed'
    if (s === 'happened' && /\bsuspend/i.test(t)) return 'suspended'
    if (s === 'not_announced') { var m = /\b(Monday|Tuesday|Wednesday|Thursday|Friday)\b/.exec(t); if (m) return 'not_announced_' + m[1] }
    return s
  }
  var stateChip = function (s) { if (!s) return ''; if (/^not_announced_/.test(s)) { var day = s.slice(14); return '<span class="gd-st gd-st-not_announced">' + esc(day) + ': not announced</span>' } var w = STATE[s] || String(s).replace(/_/g, ' '); return '<span class="gd-st gd-st-' + esc(String(s).replace(/[^a-z_]/g, '')) + '">' + esc(w) + '</span>' }
  var lvl = function (l) { return '<span class="lvl ' + esc(l) + '">' + esc(l) + '</span>' }
  var SAFE = '<p class="gd-safe">For warnings and what to do, follow <a href="https://www.ipma.pt/" rel="noopener">IPMA</a> and <a href="https://prociv.gov.pt/" rel="noopener">ANEPC</a>; in an emergency call <b>112</b>.</p>'
  var now = Date.now()
  // a focused page (guide/lisbon/, guide/stranded/, guide/media/) renders only its cases, folds open; the rest link to /guide/
  var focus = (el.getAttribute('data-focus') || '').split(',').filter(Boolean)
  var shown = function (id) { return !focus.length || focus.indexOf(id) >= 0 }

  // a warning is "in force" by the reader's clock against IPMA's own start and end
  function warnLine(w) {
    var s = T(w.start_utc), e = T(w.end_utc), when = now < s ? 'from ' + tm(w.start_utc, dhm(w.start_utc)) + ' to ' + tm(w.end_utc, hm(w.end_utc)) : 'until ' + tm(w.end_utc, dhm(w.end_utc))
    return '<li class="gd-w">' + lvl(w.level) + ' <b>' + esc(TYPE[w.type] || w.type) + '</b> ' + when + ' UTC' + (w.text_en ? '<span class="meta">IPMA: “' + esc(w.text_en) + '”</span>' : '') + '</li>'
  }
  function inForce(list) { return (list || []).filter(function (w) { return T(w.end_utc) > now && w.level !== 'green' }).sort(function (a, b) { return (RANK[b.level] - RANK[a.level]) || (T(a.start_utc) - T(b.start_utc)) }) }

  // one decision from an entity file or the graph, as a row: what was said, who, its state, its source and times
  function row(d) { return rowCut(d, 0) }
  function rowCut(d, cut) {
    var at = d.at && typeof d.at === 'object' ? d.at : null
    var url = d.address || d.source || (at && at.source), pub = d.published_utc || (at ? at.at : (typeof d.at === 'string' ? d.at : null))
    var read = d.read || (at && at.read)
    var text = String(d.decision || '').replace(/^HYPOTHESIS:\s*/, '')
    if (cut && text.length > cut) text = text.slice(0, cut) + '…'
    return '<li class="gd-row' + (kind(d.label) === 'hypothesis' ? ' gd-hyp' : '') + '">' + lbl(d.label) + stateChip(stateOf(d)) +
      '<span class="gd-txt">' + esc(text) + '</span>' + (d.decided_by ? '<span class="meta">Who: ' + esc(d.decided_by) + (d.effect_note && d.effect_note !== 'hours not stated' ? ' · ' + esc(d.effect_note) : '') + '</span>' : '') +
      prov(url ? host(url) : '', url, read, pub, kind(d.label)) + '</li>'
  }
  function entityBlock(e, title) {
    if (!e) return '<p class="meta">' + esc(title) + ': no file in the data room.</p>'
    var ds = (e.decisions || []).slice().sort(function (a, b) { return (T(b.published_utc || b.read) || 0) - (T(a.published_utc || a.read) || 0) })
    return '<div class="gd-ent"><h4>' + esc(title) + '</h4><ul class="gd-rows">' + ds.map(row).join('') + '</ul>' +
      ((e.open || []).length ? '<p class="gd-open"><b>Not yet answered:</b> ' + e.open.map(esc).join(' ') + '</p>' : '') + '</div>'
  }
  // each standing decision of an entity that matches (a regex on its text), newest first, two on top (the rest under "Deeper"):
  // a row never shows one item's state beside another item's words (synthetic@, 11:54: parks read as "running")
  function standing(e, re) {
    if (!e) return []
    return (e.decisions || []).filter(function (d) { return d.status !== 'superseded' && d.state !== 'superseded' && d.status !== 'not_announced' && (!re || re.test(d.decision)) })
      .sort(function (a, b) { return (T(b.published_utc || b.read) || 0) - (T(a.published_utc || a.read) || 0) })
  }
  // a short time: HH:MM UTC today, else the day too; the full time is in the <time> element
  var shortT = function (t) { var x = iso(t); if (!x) return '?'; return tm(t, (x.slice(0, 10) === new Date(now).toISOString().slice(0, 10) ? '' : dhm(t).slice(0, 10) + ' ') + x.slice(11, 16)) + ' UTC' }
  var cut = function (t, n) { t = String(t || ''); return t.length > n ? t.slice(0, n).replace(/\s+\S*$/, '') + '…' : t }
  function noticeLi(n) { var t = n.updated || n.published || n.from; return '<li>' + lbl('fact') + ' “' + esc(n.title || n.header) + '”' + (n.excerpt ? ': ' + esc(n.excerpt) : '') + (t ? ' <span class="meta">' + (/^\d{4}-\d\d-\d\d$/.test(t) ? esc(t) : tm(t) + ' UTC') + (n.to ? ', until ' + tm(n.to) + ' UTC' : '') + '</span>' : '') + (n.link ? ' <a href="' + esc(n.link) + '" rel="noopener">the notice</a>' : '') + '</li>' }
  function decLi(x) { return '<li>' + stateChip(stateOf(x)) + ' ' + esc(x.decision) + ' ' + lbl(x.label) + (x.decided_by ? '<span class="meta">Who: ' + esc(x.decided_by) + '</span>' : '') + prov(host(x.address), x.address, x.read, x.published_utc, kind(x.label)) + '</li>' }
  // unit(name, feed, entity, re): the newest word on top (the operator's own notice if it has one, else the newest decision), two lines at most;
  // the time read and the sources on one small line that opens everything: the feed's notices, every decision, what is still unanswered
  function unit(name, o, e, re) {
    var full = ''; if (name.indexOf('|') > 0) { full = name.split('|')[1]; name = name.split('|')[0] }
    var ds = standing(e, re), notices = (o && o.label !== 'none' && o.notices) || [], n = notices[0], d = ds[0]
    var notRead = o && o.label === 'none'
    if (!n && !d) return '<li class="gd-c"><div class="gd-c-h"><b>' + esc(name) + '</b> <span class="gd-ns">' + (notRead ? 'we do not read this site' : 'not stated') + '</span></div><p class="gd-c-t">' + (notRead ? esc(cut(o.note, 140)) : 'in what we have read') + '</p></li>'
    var head = n ? lbl('fact') + '<span class="gd-src-k">its own notice</span>' : stateChip(stateOf(d)) + lbl(d.label)
    var ttl = n && (n.title || n.header); if (ttl && /^\d{4}-\d\d-\d\d$/.test(ttl)) ttl = ''
    var text = n ? (ttl ? '“' + esc(ttl) + '”' + (n.excerpt ? ': ' : '') : '') + (n.excerpt ? esc(n.excerpt) : '') : esc(d.decision)
    var read = n ? o.read : d.read, count = notices.length + ds.length
    return '<li class="gd-c"><div class="gd-c-h"><b>' + esc(name) + '</b> ' + head + (notRead ? ' <span class="gd-ns">we do not read this site</span>' : '') + '</div><p class="gd-c-t">' + text + '</p>' +
      '<details class="gd-src"><summary><span class="gd-c-r">' + (!n && kind(d.label) === 'evidence' ? esc(host(d.address)) + ', ' : '') + 'read ' + shortT(read) + '</span> · <span class="gd-src-a">' + (count > 1 ? count + ' sources' : 'the source') + '</span></summary>' +
      (full ? '<p class="gd-src-h gd-full">' + esc(full) + '</p>' : '') + (notRead ? '<p class="meta">' + esc(o.note || '') + '</p>' : '') +
      (notices.length ? '<p class="gd-src-h">The operator\'s own notices</p><ul class="gd-sub">' + notices.map(noticeLi).join('') + '</ul>' + prov(host(o.source), o.source, o.read) : '') +
      (o && o.line_status && o.line_status.label === 'none' ? '<p class="meta">Live line status: <span class="gd-ns">not read</span> (not a published feed).</p>' : '') +
      (ds.length ? '<p class="gd-src-h">Decisions' + (n ? ', as reported' : '') + '</p><ul class="gd-sub">' + ds.map(decLi).join('') + '</ul>' : '') +
      ((e && e.open || []).length ? '<p class="gd-open"><b>Not yet answered:</b> ' + e.open.map(esc).join(' ') + '</p>' : '') + '</details></li>'
  }
  function short(name, e, re) { return unit(name, null, e, re) }
  var LINES = {}
  function sect(id, q, simple, deep, open, line) {
    line = line || LINES[id]
    if (!shown(id)) return ''
    if (el.getAttribute('data-open') === 'yes') open = true
    var m = /^(\d) · (.*)$/.exec(q); if (m) q = '<span class="gd-n">' + m[1] + '</span>' + m[2]
    var body = '<div class="gd-simple">' + simple + '</div>' +
      '<details class="gd-deep"' + (open ? ' open' : '') + '><summary>Deeper: every source, with its time</summary>' + deep + '</details>' + SAFE + (focus.length ? '<p class="gd-up"><a href="#now">↑ Top</a> · <a href="#gd-q">All seven questions ↓</a></p>' : '<p class="gd-up"><a href="#gd-q">↑ The seven questions</a></p>')
    // on "Start here" each question is a fold of its own, opened by a tap or a jump (designer@ note 3; synthetic@ run 2): the page stays short
    if (!focus.length) return '<details class="gd-case gd-fold card" id="' + id + '"><summary><h2>' + q + '</h2>' + (line ? '<span class="gd-line">' + esc(cut(line, 88)) + '</span>' : '') + '</summary>' + body + '</details>'
    return '<section class="gd-case card" id="' + id + '"><h2>' + q + '</h2>' + body + '</section>'
  }

  // hospitals mapped in OpenStreetMap (incident.datascience@'s exposure/hospitals.json), by municipality the reader picks: no location asked, no outside request
  var HOSP = null
  // "not stated" from the data: a name drops out as soon as its entity file holds a standing decision
  function notStated(pairs, always) {
    var ns = pairs.filter(function (p) { return !standing(p[1]).length }).map(function (p) { return p[0] }).concat(always || [])
    if (ns.length) ns[0] = ns[0].charAt(0).toUpperCase() + ns[0].slice(1)
    return ns.length ? ns.join(', ').replace(/, ([^,]*)$/, ' and $1') + ': <span class="gd-ns">not stated</span> in what we have read.' : ''
  }
  function hospFold() {
    if (!HOSP) return ''
    var hs = (HOSP.hospitals || []).filter(function (h) { return h.in_lisbon_metro && !h.name_withheld && h.name }), by = {}
    hs.forEach(function (h) { (by[h.municipality_name] = by[h.municipality_name] || []).push(h) })
    var ms = Object.keys(by).sort(function (a, b) { return a.localeCompare(b, 'pt') })
    return '<details class="gd-deep gd-hosp"><summary>Hospitals mapped near you (Lisbon area, by municipality)</summary>' +
      '<p class="gd-ns-line"><b>Buildings mapped in OpenStreetMap, not a statement that any is open or has an emergency service.</b> In an emergency call <b>112</b>; the health service\'s line is SNS 24, <b>808 24 24 24</b> (<a href="https://www.sns24.gov.pt/" rel="noopener">sns24.gov.pt</a>).</p>' +
      '<label class="gd-pick">Municipality <select id="gd-hm"><option value="">Choose…</option>' + ms.map(function (m) { return '<option>' + esc(m) + '</option>' }).join('') + '</select></label><ul class="gd-rows" id="gd-hl"></ul>' +
      '<p class="meta">' + lbl('evidence') + ' ' + esc(HOSP.source_name || 'OpenStreetMap') + '; ' + esc(HOSP.licence || '') + '. ' + esc(String(HOSP.confidence || '')) + ' Kept by ' + esc(HOSP.by) + ', ' + tm(HOSP.updated) + ' UTC.</p></details>'
  }
  function hospWire() {
    var sel = document.getElementById('gd-hm'), ul = document.getElementById('gd-hl'); if (!sel || !ul) return
    sel.addEventListener('change', function () {
      var m = sel.value, hs = (HOSP.hospitals || []).filter(function (h) { return h.in_lisbon_metro && !h.name_withheld && h.municipality_name === m })
      ul.innerHTML = hs.map(function (h) { return '<li class="gd-row"><b>' + esc(h.name) + '</b>' + (h.operator_type ? ' <span class="meta">' + esc(h.operator_type) + '</span>' : '') + ' <span class="prov"><a href="https://www.openstreetmap.org/' + esc(h.osm) + '" rel="noopener">on the map (OpenStreetMap)</a></span></li>' }).join('')
    })
  }

  var ENT = ['airport', 'tap', 'metro', 'carris', 'fertagus', 'cp', 'ferries', 'bridges', 'tunnels', 'rede-expressos', 'flixbus', 'port', 'retail', 'museums', 'schools', 'courts', 'hospitals', 'parliament', 'madeira']
  Promise.all([get('weather/warnings.json'), get('transport/services.json'), get('transport/flights.json'), get('decisions/graph.json'), get('transport/metro.json'), get('transport/buses.json'), get('transport/ferries.json'), get('transport/trains.json'), get('exposure/hospitals.json'), fetch(base + 'incidents/' + inc + '/incident.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null }).catch(function () { return null })].concat(ENT.map(function (n) { return get('decisions/entities/' + n + '.json') }))).then(function (r) {
    HOSP = r[8]; var W = r[0], S = r[1], F = r[2], G = r[3], MT = r[4], BU = r[5], FE = r[6], TR = r[7], I = r[9], E = {}
    ENT.forEach(function (n, i) { E[n] = r[10 + i] })
    var edges = (G && G.edges) || []
    var edge = function (id) { for (var i = 0; i < edges.length; i++) if (edges[i].id === id) return edges[i]; return null }
    var out = ''

    // (1) now, in one line
    var lis = inForce(W && W.lisbon), top = lis[0], nowOn = lis.filter(function (w) { return T(w.start_utc) <= now })
    var line
    if (!W) line = 'IPMA\'s warnings could not be read from our data room just now. Go to <a href="https://www.ipma.pt/en/otempo/prev-sam/" rel="noopener">IPMA</a>.'
    else if (!lis.length) line = 'No IPMA warning above green for Lisbon in force or ahead, in IPMA\'s feed as we last read it.'
    else {
      var tw = nowOn.length ? nowOn : lis, peak = tw[0]
      var ends = tw.filter(function (w) { return w.level === peak.level }).map(function (w) { return T(w.end_utc) })
      line = (nowOn.length ? 'In force now for Lisbon: ' : 'Next for Lisbon: ') + '<span class="lvl ' + esc(peak.level) + '">' + esc(peak.level) + '</span> ' +
        tw.filter(function (w) { return w.level === peak.level }).map(function (w) { return esc(TYPE[w.type] || w.type) }).join(' and ') + ' warning, until ' + tm(new Date(Math.max.apply(null, ends)).toISOString(), hm(new Date(Math.max.apply(null, ends)).toISOString())) + ' UTC' +
        (tw.length > 1 ? '; also ' + tw.filter(function (w) { return w.level !== peak.level }).map(function (w) { return esc(w.level) + ' ' + esc(TYPE[w.type] || w.type) }).join(', ') : '') + '.'
    }
    out += '<div class="gd-now" id="now"><p class="gd-now-line">' + line + '</p><p class="meta">' + (W ? lbl('fact') + ' ' : '') + prov('IPMA\'s warnings feed', W && W.source, W && W.read_utc) + ' Lisbon is on UTC in November.</p><p class="gd-now-safe">' +
      'Not a warning service: <a href="https://www.ipma.pt/" rel="noopener">IPMA</a> issues the warnings, <a href="https://prociv.gov.pt/" rel="noopener">ANEPC</a> says what to do; emergency <b>112</b>.</p></div>'

    // changed today (UTC): decisions and warning changes published today, newest first
    var today = new Date(now).toISOString().slice(0, 10), seen = {}, ch = []
    ENT.forEach(function (n) { ((E[n] && E[n].decisions) || []).forEach(function (d) { var k = String(d.decision).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 48); if (seen[k] || String(d.published_utc || '').slice(0, 10) !== today || !/T/.test(d.published_utc)) return; seen[k] = 1; ch.push({ t: d.published_utc, d: d }) }) })
    edges.forEach(function (e) { var a = e.at && typeof e.at === 'object' ? e.at.at : e.at; var k = String(e.decision).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 48); if (typeof a === 'string' && a.slice(0, 10) === today && /T/.test(a) && kind(e.label) !== 'hypothesis' && !seen[k] && (seen[k] = 1)) ch.push({ t: a, d: e }) })
    var mins = {}; ch.forEach(function (c) { mins[iso(c.t).slice(0, 16)] = 1 })
    ;((W && W.history) || []).forEach(function (h) { if (String(h.at_utc).slice(0, 10) === today && !mins[iso(h.at_utc).slice(0, 16)]) ch.push({ w: 1, t: h.at_utc, d: { decision: h.event, label: h.kind, source: h.source, read: h.read_utc, published_utc: h.at_utc } }) })
    var words = function (t) { var w = {}; String(t || '').toLowerCase().replace(/[^a-z0-9à-ú ]/g, ' ').split(/\s+/).forEach(function (x) { if (x.length > 3 || /^\d+$/.test(x)) w[x] = 1 }); return w }
    var alike = function (a, b) { var A = words(a), B = words(b), n = 0, na = Object.keys(A).length, nb = Object.keys(B).length; for (var k in A) if (B[k]) n++; return n / Math.max(1, Math.min(na, nb)) >= 0.5 }
    var rank = function (c) { return /^ipma/.test(c.d.id || '') || c.d.by === 'ipma' || c.w ? 0 : kind(c.d.label) === 'fact' ? 1 : 2 }
    ch.sort(function (a, b) { return (rank(a) - rank(b)) || (T(b.t) - T(a.t)) })
    ch = ch.filter(function (c, i) { for (var j = 0; j < i; j++) if (Math.abs(T(ch[j].t) - T(c.t)) < 36e5 * 6 && alike(ch[j].d.decision, c.d.decision)) return false; return true })
    var KEY = '<p class="gd-key">' + lbl('fact') + ' read at the body that decides or warns · ' + lbl('evidence') + ' reported by others, named · ' + lbl('hypothesis') + ' our analysis, never a fact · <span class="gd-st">closed</span> the state the source gives · <span class="gd-ns">not stated</span> we do not know</p>'
    var todayHtml = !ch.length ? '' : '<section class="gd-today" id="gd-today" aria-labelledby="gd-today-h"><h2 id="gd-today-h">Changed today <span class="meta">(published ' + esc(today) + ', UTC; IPMA\'s warning changes first, then other facts, then reports; newest first in each)</span></h2><ul class="gd-rows">' +
      ch.slice(0, 3).map(function (c) { return rowCut(c.d, 140).replace('<li class="gd-row', '<li data-t="' + esc(c.t) + '" class="gd-row') }).join('') + '</ul>' +
      (ch.length > 3 ? '<details class="gd-deep"><summary>' + (ch.length - 3) + ' more today</summary><ul class="gd-rows">' + ch.slice(3).map(function (c) { return rowCut(c.d, 140) }).join('') + '</ul></details>' : '') + KEY + '</section>'

    // the path: pick your question
    var CASES = [['now-detail', 'What is happening now'], ['flight', 'I have a flight'], ['around', 'Getting around'], ['stranded', 'I\'m stranded: what is open?'], ['websummit', 'Web Summit'], ['madeira', 'Madeira'], ['press', 'I\'m a journalist']]
    out += '<nav class="gd-paths" id="gd-q" aria-label="Choose your question">' + CASES.map(function (c, i) { return '<a href="' + (shown(c[0]) ? '' : base + 'guide/index.html') + '#' + c[0] + '"' + (focus.length && shown(c[0]) ? ' aria-current="true"' : '') + '><span class="gd-n">' + (i + 1) + '</span>' + esc(c[1]) + '</a>' }).join('') + '</nav>'
    // the questions first, then the change log (designer@ 12:05, 2); on a focused page it follows the reader's own answer (synthetic@ run 3, 2)
    if (!focus.length) out += todayHtml

    // (1) deeper
    var govAlert = edge('gov-alert')
    LINES['now-detail'] = String(line).replace(/<[^>]+>/g, '')
    out += sect('now-detail', '1 · What is happening now',
      '<ul class="gd-ws">' + (lis.length ? lis.map(warnLine).join('') : '<li>No warning above green for Lisbon in IPMA\'s feed.</li>') + '</ul>' +
      '<p class="meta">IPMA\'s warnings for the Lisbon district, in its own words (its English text). ' + prov('IPMA open data', W && W.source, W && W.read_utc) + '</p>' +
      (govAlert ? '<p class="gd-clamp"><b>The government\'s alert situation</b> ' + lbl(govAlert.label) + ' ' + esc(govAlert.decision) + ' ' + prov(host((govAlert.at || {}).source), (govAlert.at || {}).source, (govAlert.at || {}).read) + '</p>' : ''),
      '<p>Every change of every warning, as we read it: <a href="' + base + 'incidents/' + inc + '/timeline.html">the timeline</a>. The weather, drawn from IPMA\'s data: <a href="' + base + 'index.html">the Weather face</a>. The warning history:</p>' +
      '<ul class="gd-rows">' + ((W && W.history) || []).slice(-8).reverse().map(function (h) { return '<li class="gd-row">' + lbl(h.kind) + '<span class="gd-txt">' + esc(h.event) + '</span>' + prov(host(h.source), h.source, h.read_utc, h.at_utc) + '</li>' }).join('') + '</ul>')

    // (2) flight
    var lisF = F && (F.airports || []).filter(function (a) { return a.iata === 'LIS' })[0], fun = F && (F.airports || []).filter(function (a) { return a.iata === 'FNC' })[0]
    var depLine = function (a) { var d = a && a.departures_today; return d && d.label === 'fact' ? '<li><b>' + esc(a.name) + '</b>: <b class="gd-num">' + d.count + '</b> airline departures <i>seen</i> by OpenSky\'s receivers' + (d.covered_from ? ' since ' + tm(d.covered_from, hm(d.covered_from)) + ' UTC' : ' in our readings today') + ' ' + lbl('fact') + ' ' + prov('OpenSky Network', 'https://opensky-network.org/', d.read) + '<span class="meta">A floor, not a total; it says nothing about your flight.</span></li>' : '' }
    var newest = function (list) { var all = []; list.forEach(function (x) { all = all.concat(standing(x)) }); all.sort(function (a, b) { return (T(b.published_utc || b.read) || 0) - (T(a.published_utc || a.read) || 0) }); return all[0] }
    var nf = newest([E.airport, E.tap]); LINES.flight = 'Your airline decides. ' + (nf ? nf.decision : '')
    out += sect('flight', '2 · I have a flight',
      '<p class="gd-big"><b>Your airline decides whether your flight goes</b>: its site or app has the latest.</p>' +
      '<ul class="gd-short">' + short('Lisbon airport|Lisbon airport (Humberto Delgado), operated by ANA', E.airport) + short('TAP|TAP Air Portugal', E.tap) + depLine(lisF) + '</ul>' +
      '<h4>Getting to the airport</h4><ul class="gd-short">' + short('Metro|Metropolitano de Lisboa (its red line serves the airport)', E.metro, /\brun/i) + short('Bridges|25 de Abril and Vasco da Gama bridges (Lusoponte)', E.bridges) + '</ul>' +
      '<p class="meta">Taxis, ride-hailing and the airport\'s buses: <span class="gd-ns">not stated</span> in what we have read.</p>' +
      '<p class="meta">The airport\'s own departures board: <a href="https://www.aeroportolisboa.pt/en/lis/flights-destinations/find-flights/real-time-departures" rel="noopener">aeroportolisboa.pt</a> (it shows a bot check to our readers, so we cannot quote it).</p>',
      entityBlock(E.airport, 'Airports (ANA)') + entityBlock(E.tap, 'TAP Air Portugal') +
      '<h4>What open flight data shows</h4><ul class="gd-short">' + depLine(fun) + '</ul>' +
      '<p>By the hour, all four airports: <a href="' + base + 'transport/flights.html">flights</a> (incident.transport@).</p>')

    // (3) getting around
    var lisOps = function (f, ids) { return ((f && f.operators) || []).filter(function (o) { return !ids || ids.indexOf(o.id) >= 0 }) }
    var ops = lisOps(MT, ['metro-lisboa']).concat(lisOps(BU, ['carris-metropolitana']), lisOps(TR, ['fertagus']), lisOps(FE))
    if (!ops.length) ops = (S && S.operators) || []
    var thu = edge('metro-thursday') || (E.metro && (E.metro.decisions || []).filter(function (d) { return d.status === 'not_announced' })[0])
    var na = newest([E.metro, E.carris, E.cp, E.fertagus, E.ferries, E.bridges, E.tunnels, E['rede-expressos'], E.flixbus]); LINES.around = na ? 'Latest: ' + na.decision : ''
    var feed = function (id) { for (var k = 0; k < ops.length; k++) if (ops[k].id === id) return ops[k]; return null }
    out += sect('around', '3 · Getting around',
      '<p class="gd-ns-line">' + notStated([['Carris (Lisbon city buses)', E.carris], ['Fertagus', E.fertagus]], ['taxis', 'ride-hailing']) + '</p>' +
      '<p class="meta">One row per operator: its own notice where we read one (fact), else its newest decision as reported (evidence). Each operator decides its own service: its site has the latest.</p><ul class="gd-short">' +
      unit('Metro|Metropolitano de Lisboa', feed('metro-lisboa'), E.metro, /^(?!.*(shelter|homeless))/i) +
      unit('Carris|Carris, Lisbon city buses and trams', null, E.carris) +
      unit('Carris Metropolitana|Carris Metropolitana, buses around Lisbon outside the city', feed('carris-metropolitana'), null) +
      unit('CP trains|CP (Comboios de Portugal)', null, E.cp) +
      unit('Fertagus|Fertagus, trains over the 25 de Abril bridge', feed('fertagus'), E.fertagus) +
      unit('Ferries|Transtejo Soflusa (TTSL), the Tagus ferries', feed('ttsl'), E.ferries) +
      unit('Bridges|25 de Abril and Vasco da Gama bridges (Lusoponte)', null, E.bridges) +
      unit('Road tunnels|Lisbon city road tunnels (Câmara Municipal de Lisboa)', null, E.tunnels, /tunnel/i) +
      unit('Coaches|Rede Expressos, intercity coaches', null, E['rede-expressos']) +
      unit('FlixBus', null, E.flixbus) + '</ul>' +
      (thu ? '<p><b>Thursday:</b> ' + stateChip(stateOf(thu)) + ' ' + esc(thu.decision) + ' ' + lbl(thu.label) + '</p>' : ''),
      '<p>Every source is in its row. Mode by mode, with charts: <a href="' + base + 'transport/index.html">transport</a> (incident.transport@).</p>')

    // (4) stranded: what is open, only as stated
    var shelter = E.metro && (E.metro.decisions || []).filter(function (d) { return /shelter|homeless/i.test(d.decision) })
    var cl = [['shops (Pingo Doce)', E.retail], ['state museums', E.museums], ['schools', E.schools], ['parks and gardens', E.tunnels, /park|garden/i], ['courts and registries', E.courts]].filter(function (x) { var d = standing(x[1], x[2])[0]; return d && stateOf(d) === 'closed' }).map(function (x) { return x[0] })
    LINES.stranded = cl.length ? 'Stated closed: ' + cl.join(', ') + '. Cafés, malls, hotels: not stated.' : 'What authorities and operators have stated is open or closed.'
    out += sect('stranded', '4 · I\'m stranded: where can I go, what is open?',
      '<p>Only what an authority or an operator has <b>stated</b>, with its source and time. We never infer that a place is open.</p><ul class="gd-short">' +
      short('Pingo Doce|Pingo Doce supermarkets (Jerónimo Martins)', E.retail) + short('Museums|State museums and monuments (Museus e Monumentos de Portugal)', E.museums) + short('Schools (mainland)', E.schools, /^(?!.*Madeira)/) + short('Courts|Courts and registries', E.courts) + short('Hospitals|Lisbon hospitals, scheduled activity', E.hospitals) + short('Parks|Lisbon city parks, gardens and municipal culture', E.tunnels, /park|garden|cultur/i) + '</ul>' +
      '<div class="gd-ns-box"><b>Not stated</b> by any authority or operator in what we have read: cafés and restaurants, shopping malls, other supermarket chains, hotels, ride-hailing (Uber, Bolt), taxis, pharmacies. That means <i>we do not know</i>, not that they are closed: whether a place is open is the place\'s own word.</div>' +
      (shelter && shelter.length ? '<p><b>Shelter stated by an operator:</b></p><ul class="gd-rows">' + shelter.slice(0, 1).map(function (d) { return rowCut(d, 120).replace(/<span class="gd-st[^"]*">[^<]*<\/span>/, '<span class="gd-st">shelter at night</span>') }).join('') + '</ul>' : '') + hospFold(),
      (govAlert ? '<h4>The government\'s measures for Wednesday</h4><ul class="gd-rows">' + row(govAlert) + '</ul>' : '') +
      entityBlock(E.retail, 'Shops') + entityBlock(E.museums, 'Museums and monuments') + entityBlock(E.schools, 'Schools') + entityBlock(E.courts, 'Courts') + entityBlock(E.hospitals, 'Hospitals') + entityBlock(E.parliament, 'Parliament') +
      '<p>Every decision and who made it: <a href="' + base + 'incidents/' + inc + '/decisions.html">the decisions</a>.</p>')

    // (5) Web Summit: the organisers' decisions and what they have not said
    var wsIds = edges.filter(function (e) { return /^(websummit|pitch|night-summit|side-events|gov-recommends|mai-websummit|mayor-expects)/.test(e.id) })
    var wsFacts = wsIds.filter(function (e) { return kind(e.label) === 'fact' && e.status === 'happened' }).sort(function (a, b) { return String(b.read).localeCompare(String(a.read)) })
    var wsOpen = wsIds.filter(function (e) { return e.status === 'not_announced' })
    LINES.websummit = wsFacts[0] ? wsFacts[0].decision : ''
    out += sect('websummit', '5 · Web Summit',
      '<ul class="gd-rows">' + wsFacts.map(row).join('') + '</ul>' +
      (wsOpen.length ? '<p><b>Not yet announced by the organisers:</b></p><ul class="gd-short">' + wsOpen.map(function (e) { return '<li>' + esc(e.decision) + ' <span class="gd-ns">not announced</span></li>' }).join('') + '</ul>' : '') +
      '<p class="meta">The organisers\' own page: <a href="https://websummit.com/blog/web-summit/important-event-update-2026/" rel="noopener">websummit.com, “Important event update”</a>.</p>',
      ((G && G.websummit_hold) ? '<p class="gd-open"><b>Note:</b> we have not read websummit.com since ' + tm(G.websummit_hold.since) + ' UTC, under its terms; we watch the press and the authorities instead. Its latest word may be newer than ours.</p>' : '') +
      '<ul class="gd-rows">' + wsIds.filter(function (e) { return wsFacts.indexOf(e) < 0 }).map(row).join('') + '</ul>' +
      '<p>Hypotheses are our analysis, dashed and labelled; never the organisers\' word.</p>')

    // (6) Madeira
    var mw = inForce(((W && W.red_and_orange_elsewhere && W.red_and_orange_elsewhere.items) || []).filter(function (w) { return /^M/.test(w.area) }))
    var md = (E.madeira && E.madeira.decisions || []).slice().sort(function (a, b) { return (T(b.published_utc) || 0) - (T(a.published_utc) || 0) })
    var mDec = md.filter(function (d) { return /closed|suspended|limited/.test(d.state || '') }), mCount = md.filter(function (d) { return /occurrence count/i.test(d.decision) })
    LINES.madeira = mDec[0] ? mDec[0].decision : ''
    out += sect('madeira', '6 · Madeira',
      (mDec[0] ? '<p class="gd-big">' + stateChip(stateOf(mDec[0])) + ' <b>' + esc(mDec[0].decision) + '</b> ' + lbl(mDec[0].label) + ' ' + prov(host(mDec[0].address), mDec[0].address, mDec[0].read, mDec[0].published_utc, kind(mDec[0].label)) + '</p>' : '') +
      '<h4>IPMA\'s warnings for Madeira</h4><ul class="gd-ws">' + (mw.length ? mw.map(function (w) { return warnLine(w).replace('<b>', '<b>' + esc(AREA[w.area] || w.area) + ': ') }).join('') : '<li>No orange or red IPMA warning for Madeira in force or ahead, in the feed as we last read it.</li>') + '</ul>' +
      '<p class="meta">' + prov('IPMA open data', W && W.red_and_orange_elsewhere && W.red_and_orange_elsewhere.source, W && W.red_and_orange_elsewhere && W.red_and_orange_elsewhere.read_utc) + ' (orange and red only)</p>' +
      '<h4>Decisions stated, newest first</h4><ul class="gd-rows">' + mDec.slice(1, 8).map(row).join('') + '</ul>' +
      (mCount[0] ? '<h4>Occurrences, the latest count</h4><ul class="gd-rows">' + row(mCount[0]) + '</ul>' : '') +
      '<p class="gd-ns-line">The government\'s alert situation covers mainland Portugal (its own words); Madeira\'s measures are the regional authorities\'. Anything not listed here (roads, buses, the Porto Santo ferry, shops, Funchal\'s centre since this morning): <span class="gd-ns">not stated</span> in what we have read.</p>' +
      '<p class="meta">Madeira\'s civil protection: <a href="https://www.procivmadeira.pt/" rel="noopener">procivmadeira.pt</a>.</p>',
      entityBlock(E.madeira, 'Everything we hold on Madeira'))

    // (7) journalists
    LINES.press = 'The headline, the record, the data, and how to cite it.'
    out += sect('press', '7 · I\'m a journalist',
      (I && I.headline ? '<div class="gd-lead"><p class="meta">The incident\'s headline, as our lead keeps it</p><p><b>' + esc(I.headline.text) + '</b> ' + lbl(I.headline.label) + '</p>' + prov(I.headline.source, I.headline.url, null) + '<p class="meta">Published: ' + esc(I.headline.at) + '</p>' + (I.standfirst ? '<p>' + esc(I.standfirst) + '</p><p class="meta">Kept by ' + esc(I.lead) + ', updated ' + tm(I.updated) + ' UTC</p>' : '') + '</div>' : '') +
      '<p class="gd-cite"><b>Citing:</b> name the body that decided or warned, with its time; name this site for the record and the time we read it. <a href="' + base + 'help/cite.html">How to cite</a>.</p>' +
      '<p>Who we are, how this is made, and how to reach us: <a href="' + base + 'welcome/index.html">the newcomers\' page</a> (incident.envoy@, with its media section). Every claim here links to its source; cite the source, and us for the record.</p>',
      '<ul class="gd-links"><li><a href="' + base + 'incidents/' + inc + '/timeline.html">The timeline</a>: every warning and decision, with its permanent row id</li>' +
      '<li><a href="' + base + 'incidents/' + inc + '/decisions.html">The decisions</a>: who decided what, labelled fact, evidence or hypothesis</li>' +
      '<li><a href="' + base + 'research/media/index.html">The media watch</a> and <a href="' + base + 'research/media/ranking.html">who reported first</a></li>' +
      '<li><a href="' + base + 'stories/index.html">The stories</a>, each statement resolving to data</li>' +
      '<li><a href="' + base + 'api/v1/index.json">The data, as JSON</a>, each file with its sha256</li>' +
      '<li><a href="' + base + 'help/cite.html">How to cite</a></li></ul>')

    if (document.querySelector('.contact-foot a')) out += '<p class="gd-contact">Missing something you need, or something wrong? <a href="' + esc(document.querySelector('.contact-foot a').getAttribute('href')) + '">Contact us</a>: the desk reads every message.' + (shown('press') ? ' Citing: <a href="' + base + 'help/cite.html">how to cite</a>.' : '') + '</p>'
    el.innerHTML = out
    hospWire()
    el.querySelectorAll('.gd-clamp').forEach(function (c) { c.setAttribute('tabindex', '0'); c.setAttribute('title', 'Tap to read it all'); var t = function () { c.classList.toggle('gd-open-all') }; c.addEventListener('click', function (e) { if (e.target.tagName !== 'A') t() }); c.addEventListener('keydown', function (e) { if (e.key === 'Enter') t() }) })
    focus.forEach(function (id) { var n = document.getElementById(id); if (n && n.classList.contains('gd-case')) el.appendChild(n) })
    if (focus.length) {
      var jr = document.createElement('nav'); jr.className = 'gd-jump'; jr.setAttribute('aria-label', 'On this page')
      jr.innerHTML = focus.map(function (id) { var n = document.getElementById(id), h = n && n.querySelector('h2'); return h ? '<a href="#' + id + '">' + esc(h.textContent.replace(/^\d/, '')) + '</a>' : '' }).join('')
      var nw = document.getElementById('now'); if (nw) { nw.parentNode.insertBefore(jr, nw); if (todayHtml) nw.insertAdjacentHTML('afterend', todayHtml) }
    }
    if (focus.length) { var nv = el.querySelector('.gd-paths'); if (nv) { var h = document.createElement('h2'); h.className = 'gd-other'; h.textContent = 'Other questions'; el.appendChild(h); el.appendChild(nv) } }
    var go = function () { if (!location.hash) return; var t = document.getElementById(location.hash.slice(1)); if (!t) return; if (t.tagName === 'DETAILS') t.open = true; t.scrollIntoView() }
    window.addEventListener('hashchange', go); go()
    window.addEventListener('beforeprint', function () { el.querySelectorAll('details').forEach(function (d) { d.open = true }) })
  })
})()
