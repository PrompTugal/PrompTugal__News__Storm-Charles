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
  var prov = function (label, url, read, pub) {
    return '<span class="prov">' + (url ? '<a href="' + esc(url) + '" rel="noopener">' + esc(label || host(url)) + '</a>' : esc(label || 'no address')) +
      (pub ? ', published ' + tm(pub) + ' UTC' : '') + (read ? ', read ' + tm(read) + ' UTC' : '') + '</span>'
  }
  var kind = function (l) { l = String(l || '').toLowerCase(); return /fact|official/.test(l) ? 'fact' : /hyp/.test(l) ? 'hypothesis' : /none/.test(l) ? 'not stated' : 'evidence' }
  var lbl = function (l) { var k = kind(l); return '<span class="lbl l-' + k.replace(' ', '-') + ' gd-l-' + k.replace(' ', '-') + '">' + k + '</span>' }
  var get = function (u) { return fetch(room + u, { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null }).catch(function () { return null }) }
  var TYPE = { 'Precipitação': 'rain', 'Vento': 'wind', 'Agitação Marítima': 'waves (sea)', 'Trovoada': 'thunderstorms', 'Nevoeiro': 'fog', 'Neve': 'snow', 'Tempo Quente': 'heat', 'Tempo Frio': 'cold' }
  var AREA = { LSB: 'Lisbon', MCN: 'Madeira, north coast', MCS: 'Madeira, south coast', MRM: 'Madeira, mountains', MPS: 'Porto Santo' }
  var RANK = { red: 3, orange: 2, yellow: 1, green: 0 }
  var STATE = { closed: 'closed', suspended: 'suspended', limited: 'limited', running: 'running', happened: 'announced', not_announced: 'not announced', superseded: 'superseded', expected: 'expected' }
  var stateChip = function (s) { if (!s) return ''; var w = STATE[s] || String(s).replace(/_/g, ' '); return '<span class="gd-st gd-st-' + esc(String(s).replace(/[^a-z_]/g, '')) + '">' + esc(w) + '</span>' }
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
  function row(d) {
    var at = d.at && typeof d.at === 'object' ? d.at : null
    var url = d.address || d.source || (at && at.source), pub = d.published_utc || (at ? at.at : (typeof d.at === 'string' ? d.at : null))
    var read = d.read || (at && at.read)
    var text = String(d.decision || '').replace(/^HYPOTHESIS:\s*/, '')
    return '<li class="gd-row' + (kind(d.label) === 'hypothesis' ? ' gd-hyp' : '') + '">' + lbl(d.label) + stateChip(d.state || d.status) +
      '<span class="gd-txt">' + esc(text) + '</span>' + (d.decided_by ? '<span class="meta">Who: ' + esc(d.decided_by) + (d.effect_note && d.effect_note !== 'hours not stated' ? ' · ' + esc(d.effect_note) : '') + '</span>' : '') +
      prov(url ? host(url) : '', url, read, pub) + '</li>'
  }
  function entityBlock(e, title) {
    if (!e) return '<p class="meta">' + esc(title) + ': no file in the data room.</p>'
    var ds = (e.decisions || []).slice().sort(function (a, b) { return (T(b.published_utc || b.read) || 0) - (T(a.published_utc || a.read) || 0) })
    return '<div class="gd-ent"><h4>' + esc(title) + '</h4><ul class="gd-rows">' + ds.map(row).join('') + '</ul>' +
      ((e.open || []).length ? '<p class="gd-open"><b>Still open:</b> ' + e.open.map(esc).join(' ') + '</p>' : '') + '</div>'
  }
  // each standing decision of an entity that matches (a regex on its text), newest first, two on top (the rest under "Deeper"):
  // a row never shows one item's state beside another item's words (synthetic@, 11:54: parks read as "running")
  function standing(e, re) {
    if (!e) return []
    return (e.decisions || []).filter(function (d) { return d.status !== 'superseded' && d.state !== 'superseded' && (!re || re.test(d.decision)) })
      .sort(function (a, b) { return (T(b.published_utc || b.read) || 0) - (T(a.published_utc || a.read) || 0) })
  }
  function short(name, e, re) {
    var ds = standing(e, re); if (!ds.length) return '<li><b>' + esc(name) + '</b>: <span class="gd-ns">not stated</span> in what we have read</li>'
    return '<li><b>' + esc(name) + '</b><ul class="gd-sub">' + ds.slice(0, 2).map(function (d) {
      return '<li>' + stateChip(d.state || d.status) + ' ' + esc(String(d.decision).slice(0, 160)) + (String(d.decision).length > 160 ? '…' : '') + ' ' + lbl(d.label) + ' ' + prov(host(d.address), d.address, d.read, d.published_utc) + '</li>'
    }).join('') + '</ul>' + (ds.length > 2 ? '<span class="meta">' + (ds.length - 2) + ' more under "Deeper"</span>' : '') + '</li>'
  }
  function sect(id, q, simple, deep, open) {
    if (!shown(id)) return ''
    if (focus.length && el.getAttribute('data-open') !== 'no') open = true
    var m = /^(\d) · (.*)$/.exec(q); if (m) q = '<span class="gd-n">' + m[1] + '</span>' + m[2]
    return '<section class="gd-case card" id="' + id + '"><h2>' + q + '</h2><div class="gd-simple">' + simple + '</div>' +
      '<details class="gd-deep"' + (open ? ' open' : '') + '><summary>Deeper: every source, with its time</summary>' + deep + '</details>' + SAFE + '<p class="gd-up"><a href="#gd-q">↑ The seven questions</a></p></section>'
  }

  var ENT = ['airport', 'tap', 'metro', 'cp', 'ferries', 'bridges', 'tunnels', 'rede-expressos', 'flixbus', 'port', 'retail', 'museums', 'schools', 'courts', 'hospitals', 'parliament', 'madeira']
  Promise.all([get('weather/warnings.json'), get('transport/services.json'), get('transport/flights.json'), get('decisions/graph.json'), fetch(base + 'incidents/' + inc + '/incident.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null }).catch(function () { return null })].concat(ENT.map(function (n) { return get('decisions/entities/' + n + '.json') }))).then(function (r) {
    var W = r[0], S = r[1], F = r[2], G = r[3], I = r[4], E = {}
    ENT.forEach(function (n, i) { E[n] = r[5 + i] })
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

    // the path: pick your question
    var CASES = [['now-detail', 'What is happening now'], ['flight', 'I have a flight'], ['around', 'Getting around'], ['stranded', 'I\'m stranded: what is open?'], ['websummit', 'Web Summit'], ['madeira', 'Madeira'], ['press', 'I\'m a journalist']]
    out += '<nav class="gd-paths" id="gd-q" aria-label="Choose your question">' + CASES.map(function (c, i) { return '<a href="' + (shown(c[0]) ? '' : base + 'guide/index.html') + '#' + c[0] + '"' + (focus.length && shown(c[0]) ? ' aria-current="true"' : '') + '><span class="gd-n">' + (i + 1) + '</span>' + esc(c[1]) + '</a>' }).join('') + '</nav>'

    // (1) deeper
    var govAlert = edge('gov-alert')
    out += sect('now-detail', '1 · What is happening now',
      '<ul class="gd-ws">' + (lis.length ? lis.map(warnLine).join('') : '<li>No warning above green for Lisbon in IPMA\'s feed.</li>') + '</ul>' +
      '<p class="meta">IPMA\'s warnings for the Lisbon district, in its own words (its English text). ' + prov('IPMA open data', W && W.source, W && W.read_utc) + '</p>' +
      (govAlert ? '<p><b>The government\'s alert situation</b> ' + lbl(govAlert.label) + ' ' + esc(govAlert.decision) + ' ' + prov(host((govAlert.at || {}).source), (govAlert.at || {}).source, (govAlert.at || {}).read) + '</p>' : ''),
      '<p>Every change of every warning, as we read it: <a href="' + base + 'incidents/' + inc + '/timeline.html">the timeline</a>. The weather, drawn from IPMA\'s data: <a href="' + base + 'index.html">the Weather face</a>. The warning history:</p>' +
      '<ul class="gd-rows">' + ((W && W.history) || []).slice(-8).reverse().map(function (h) { return '<li class="gd-row">' + lbl(h.kind) + '<span class="gd-txt">' + esc(h.event) + '</span>' + prov(host(h.source), h.source, h.read_utc, h.at_utc) + '</li>' }).join('') + '</ul>')

    // (2) flight
    var lisF = F && (F.airports || []).filter(function (a) { return a.iata === 'LIS' })[0], fun = F && (F.airports || []).filter(function (a) { return a.iata === 'FNC' })[0]
    var depLine = function (a) { var d = a && a.departures_today; return d && d.label === 'fact' ? '<li><b>' + esc(a.name) + '</b>: <b class="gd-num">' + d.count + '</b> airline departures <i>seen</i> by OpenSky\'s receivers since ' + tm(d.covered_from, hm(d.covered_from)) + ' UTC ' + lbl('fact') + ' ' + prov('OpenSky Network', 'https://opensky-network.org/', d.read) + '<span class="meta">A floor, not a total; it says nothing about your flight.</span></li>' : '' }
    out += sect('flight', '2 · I have a flight',
      '<p class="gd-big"><b>Check with your airline.</b> Only your airline can say whether your flight goes.</p>' +
      '<ul class="gd-short">' + short('Lisbon airport (ANA)', E.airport) + short('TAP Air Portugal', E.tap) + '</ul>' +
      '<p class="meta">The airport\'s own departures board: <a href="https://www.aeroportolisboa.pt/en/lis/flights-destinations/find-flights/real-time-departures" rel="noopener">aeroportolisboa.pt</a> (it shows a bot check to our readers, so we cannot quote it).</p>',
      entityBlock(E.airport, 'Airports (ANA)') + entityBlock(E.tap, 'TAP Air Portugal') +
      '<h4>What open flight data shows</h4><ul class="gd-short">' + depLine(lisF) + depLine(fun) + '</ul>' +
      '<p>Charts by the hour, all four airports: <a href="' + base + 'transport/index.html">flights and transport</a> (incident.transport@).</p>')

    // (3) getting around
    var ops = (S && S.operators) || [], opLine = function (o) {
      var n = (o.notices || [])[0]
      return '<li><b>' + esc(o.operator) + '</b> ' + lbl(o.label) + ' ' + esc(o.state || '') + (n ? '<span class="meta">Newest notice: “' + esc(n.title || n.header) + '”' + (n.excerpt ? ': ' + esc(String(n.excerpt).slice(0, 160)) : '') + (n.link ? ' <a href="' + esc(n.link) + '" rel="noopener">the notice</a>' : '') + '</span>' : '') + ' ' + prov(host(o.source), o.source, o.read) + '</li>'
    }
    var thu = edge('metro-thursday') || (E.metro && (E.metro.decisions || []).filter(function (d) { return d.status === 'not_announced' })[0])
    out += sect('around', '3 · Getting around',
      '<p>Each operator\'s latest word, newest first. Most were read through the press (labelled <i>evidence</i>); go to the operator before you set off.</p><ul class="gd-short">' +
      short('Metro (Metropolitano de Lisboa)', E.metro) + short('Trains (CP)', E.cp) + short('Ferries (Transtejo Soflusa)', E.ferries) + short('Bridges (25 de Abril, Vasco da Gama)', E.bridges) + short('Road tunnels (Lisbon city)', E.tunnels, /tunnel/i) + short('Intercity coaches (Rede Expressos)', E['rede-expressos']) + short('FlixBus', E.flixbus) + '</ul>' +
      '<p class="meta">Carris (Lisbon city buses), Fertagus, ride-hailing and taxis: <span class="gd-ns">not stated</span> in what we have read.</p>' +
      (thu ? '<p><b>Thursday:</b> ' + lbl(thu.label) + ' ' + esc(thu.decision) + ' ' + stateChip(thu.status) + '</p>' : ''),
      '<h4>From the operators\' own open feeds</h4><ul class="gd-short">' + ops.map(opLine).join('') + '</ul>' +
      entityBlock(E.metro, 'Metro') + entityBlock(E.cp, 'Trains (CP)') + entityBlock(E.ferries, 'Ferries') + entityBlock(E.bridges, 'Bridges') + entityBlock(E.tunnels, 'Road tunnels') + entityBlock(E['rede-expressos'], 'Rede Expressos') + entityBlock(E.flixbus, 'FlixBus') +
      '<p>All of it, with flights: <a href="' + base + 'transport/index.html">flights and transport</a>.</p>')

    // (4) stranded: what is open, only as stated
    var shelter = E.metro && (E.metro.decisions || []).filter(function (d) { return /shelter|homeless/i.test(d.decision) })
    out += sect('stranded', '4 · I\'m stranded: where can I go, what is open?',
      '<p>Only what an authority or an operator has <b>stated</b>, with its source and time. We never infer that a place is open.</p><ul class="gd-short">' +
      short('Shops: Pingo Doce supermarkets', E.retail) + short('State museums and monuments', E.museums) + short('Schools', E.schools) + short('Courts and registries', E.courts) + short('Hospitals (scheduled activity)', E.hospitals) + short('Parks, gardens, municipal culture (Lisbon city)', E.tunnels, /park|garden|cultur/i) + '</ul>' +
      '<div class="gd-ns-box"><b>Not stated</b> by any authority or operator in what we have read: cafés and restaurants, shopping malls, other supermarket chains, hotels, ride-hailing (Uber, Bolt), taxis, pharmacies. That means <i>we do not know</i>, not that they are closed. Ask the place itself.</div>' +
      (shelter && shelter.length ? '<p><b>Shelter stated by an operator:</b></p><ul class="gd-rows">' + shelter.map(row).join('') + '</ul>' : ''),
      (govAlert ? '<h4>The government\'s measures for Wednesday</h4><ul class="gd-rows">' + row(govAlert) + '</ul>' : '') +
      entityBlock(E.retail, 'Shops') + entityBlock(E.museums, 'Museums and monuments') + entityBlock(E.schools, 'Schools') + entityBlock(E.courts, 'Courts') + entityBlock(E.hospitals, 'Hospitals') + entityBlock(E.parliament, 'Parliament') +
      '<p>Every decision and who made it: <a href="' + base + 'incidents/' + inc + '/decisions.html">the decisions</a>.</p>')

    // (5) Web Summit: the organisers' decisions and what they have not said
    var wsIds = edges.filter(function (e) { return /^(websummit|pitch|night-summit|side-events|gov-recommends|mai-websummit|mayor-expects)/.test(e.id) })
    var wsFacts = wsIds.filter(function (e) { return kind(e.label) === 'fact' && e.status === 'happened' }).sort(function (a, b) { return String(b.read).localeCompare(String(a.read)) })
    var wsOpen = wsIds.filter(function (e) { return e.status === 'not_announced' })
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
    out += sect('madeira', '6 · Madeira',
      '<ul class="gd-ws">' + (mw.length ? mw.map(function (w) { return warnLine(w).replace('<b>', '<b>' + esc(AREA[w.area] || w.area) + ': ') }).join('') : '<li>No orange or red IPMA warning for Madeira in force or ahead, in the feed as we last read it.</li>') + '</ul>' +
      '<p class="meta">' + prov('IPMA open data', W && W.red_and_orange_elsewhere && W.red_and_orange_elsewhere.source, W && W.red_and_orange_elsewhere && W.red_and_orange_elsewhere.read_utc) + ' (orange and red only)</p>' +
      '<ul class="gd-rows">' + md.slice(0, 3).map(row).join('') + '</ul>' +
      '<p class="meta">Madeira\'s civil protection: <a href="https://www.procivmadeira.pt/" rel="noopener">procivmadeira.pt</a>.</p>',
      entityBlock(E.madeira, 'Everything we hold on Madeira'))

    // (7) journalists
    out += sect('press', '7 · I\'m a journalist',
      (I && I.headline ? '<div class="gd-lead"><p class="meta">The incident\'s headline, as our lead keeps it</p><p><b>' + esc(I.headline.text) + '</b> ' + lbl(I.headline.label) + '</p>' + prov(I.headline.source, I.headline.url, null) + '<p class="meta">Published: ' + esc(I.headline.at) + '</p>' + (I.standfirst ? '<p>' + esc(I.standfirst) + '</p><p class="meta">Kept by ' + esc(I.lead) + ', updated ' + tm(I.updated) + ' UTC</p>' : '') + '</div>' : '') +
      '<p>Who we are, how this is made, and how to reach us: <a href="' + base + 'welcome/index.html">the newcomers\' page</a> (incident.envoy@, with its media section). Every claim here links to its source; cite the source, and us for the record.</p>',
      '<ul class="gd-links"><li><a href="' + base + 'incidents/' + inc + '/timeline.html">The timeline</a>: every warning and decision, with its permanent row id</li>' +
      '<li><a href="' + base + 'incidents/' + inc + '/decisions.html">The decisions</a>: who decided what, labelled fact, evidence or hypothesis</li>' +
      '<li><a href="' + base + 'research/media/index.html">The media watch</a> and <a href="' + base + 'research/media/ranking.html">who reported first</a></li>' +
      '<li><a href="' + base + 'stories/index.html">The stories</a>, each statement resolving to data</li>' +
      '<li><a href="' + base + 'api/v1/index.json">The data, as JSON</a>, each file with its sha256</li>' +
      '<li><a href="' + base + 'help/cite.html">How to cite</a></li></ul>')

    el.innerHTML = out
    var h1 = document.querySelector('main.doc article h1'); if (h1 && !el.previousElementSibling) { h1.classList.add('gd-h1'); el.parentNode.insertBefore(h1, el) }
    focus.forEach(function (id) { var n = document.getElementById(id); if (n && n.classList.contains('gd-case')) el.appendChild(n) })
    if (focus.length) { var nv = el.querySelector('.gd-paths'); if (nv) { var h = document.createElement('h2'); h.className = 'gd-other'; h.textContent = 'Other questions'; el.appendChild(h); el.appendChild(nv) } }
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView() }
  })
})()
