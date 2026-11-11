// Draws the annotated studies of research/weather-sites/studies/: numbered callouts over the frame (and over the capture, when one exists).
// By incident.weatherwatch@web-summit.dinis. No dependency; colours from the site's tokens only.
(function () {
  var box = document.getElementById('ws-studies'); if (!box) return
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  fetch('index.json').then(function (r) { return r.json() }).then(function (ix) {
    box.innerHTML = '<p><label class="meta">Study <select id="ws-pick">' + ix.studies.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.name) + ' (' + esc(s.country) + ')</option>' }).join('') + '</select></label> <span class="meta" id="ws-meta"></span></p><div id="ws-stage" style="display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:16px;align-items:start"></div>'
    var pick = box.querySelector('#ws-pick'), stage = box.querySelector('#ws-stage'), meta = box.querySelector('#ws-meta')
    var vaults = null, readers = {}
    function vault(id) {
      if (readers[id]) return readers[id]
      vaults = vaults || fetch('../../../data/vaults.json').then(function (r) { return r.json() })
      return (readers[id] = vaults.then(function (vs) {
        var v = (vs.vaults || []).filter(function (x) { return x.id === id })[0]; if (!v || !v.read_key) throw new Error('no read key for ' + id)
        return new EvidenceVault.Reader({ endpoint: vs.endpoint, vault_id: v.id, read_key: v.read_key }).init().then(function (r) { return r.open() })
      }))
    }
    function show(id) {
      fetch(id + '.json').then(function (r) { return r.json() }).then(function (s) {
        var img = null, cap = s.capture
        meta.innerHTML = 'seen ' + esc(s.frame.seen_utc) + ' · <a href="' + esc(s.url) + '" rel="noopener">the page itself (leaves this site)</a> · ' + (cap ? '<a href="../../../' + esc(cap.evidence_page) + '">capture ' + esc(cap.read_utc) + '</a> (' + esc(cap.shown_as || 'as served') + ') <span id="ws-chk">reading the vault…</span>' : 'no screenshot shown: empty frame')
        var dots = s.callouts.map(function (c) {
          return '<a href="#ws-c' + c.n + '" title="' + esc(c.title) + '" style="position:absolute;left:' + (c.x * 100) + '%;top:' + (c.y * 100) + '%;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%;background:var(--focus);color:var(--paper);font:600 13px var(--mono);display:flex;align-items:center;justify-content:center;text-decoration:none;border:2px solid var(--paper)">' + c.n + '</a>'
        }).join('')
        stage.innerHTML = '<div style="position:relative;aspect-ratio:' + s.frame.viewport[0] + '/' + s.frame.viewport[1] + ';border:1px solid var(--line-2);background:var(--surface-2);overflow:hidden">' +
          '<p class="meta" style="position:absolute;left:12px;bottom:8px;margin:0">' + esc(s.name) + ': frame ' + s.frame.viewport.join(' × ') + ' px' + (cap ? '' : ', screenshot not shown') + '</p>' + dots + '</div>' +
          '<ol style="margin:0;padding-left:1.4em">' + s.callouts.map(function (c) { return '<li id="ws-c' + c.n + '"><b>' + esc(c.title) + '</b><br>' + esc(c.does_well) + '<br><span class="meta">Fed by: ' + esc(c.fed_by) + '</span></li>' }).join('') + '</ol>'
        if (cap && window.EvidenceVault) {
          var frame = stage.firstChild, chk = meta.querySelector('#ws-chk')
          vault(cap.vault).then(function (r) { return r.readBytes(cap.path) }).then(function (bytes) {
            return EvidenceVault.sha256(bytes).then(function (h) {
              if (pick.value !== s.id) return
              var im = document.createElement('img'); im.alt = 'Capture of ' + s.name + ', ' + cap.read_utc; im.src = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }))
              im.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top'
              var note = frame.querySelector('p'); if (note) note.remove(); frame.insertBefore(im, frame.firstChild)
              chk.textContent = h === cap.sha256 ? '✓ matches its sha256' : '✗ does NOT match its sha256'
            })
          }).catch(function (e) { if (chk) chk.textContent = 'the vault could not be read (' + e.message + ')' })
        }
        if (window.matchMedia('(max-width: 760px)').matches) stage.style.gridTemplateColumns = '1fr'
        history.replaceState(null, '', '#study=' + id)
      })
    }
    pick.addEventListener('change', function () { show(pick.value) })
    var m = location.hash.match(/study=([a-z0-9-]+)/); if (m) pick.value = m[1]
    show(pick.value || ix.studies[0].id)
  }).catch(function () { box.querySelector('p').textContent = 'The studies could not be loaded; the text below has the same content.' })
})()
