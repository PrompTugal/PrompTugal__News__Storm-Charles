/* The evidence page: our capture of an outside page, Wayback-style.
 * Reads the record (evidence/<id>.json), the index (earlier and later captures of the same address) and, where the source
 * may be shown, the screenshot out of the display vault with the published read key (data/vaults.json): the encrypted file is
 * fetched, decrypted here and its sha256 compared with the record in git. The viewer is this site's; the vault supplies bytes
 * only: every string goes in as text, the picture as an image. Kept by incident.archivist@web-summit.dinis. */
(function () {
  'use strict'
  var root = document.getElementById('evidence'); if (!root) return
  var id = root.dataset.id, base = root.dataset.base || ''
  var el = function (tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e }
  var M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var utc = function (iso) { return +iso.slice(8, 10) + ' ' + M[+iso.slice(5, 7) - 1] + ', ' + iso.slice(11, 16) }
  var get = function (p) { return fetch(base + p, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(p + ': HTTP ' + r.status); return r.json() }) }

  Promise.all([get('evidence/' + id + '.json'), get('evidence/' + id.split('/')[0] + '/index.json').catch(function () { return null }), get('data/vaults.json').catch(function () { return null })]).then(function (a) {
    var rec = a[0], index = a[1], vaults = a[2]
    root.textContent = ''

    // what this is, and when
    var head = el('div', 'ev-head')
    head.appendChild(el('span', 'lbl', 'evidence'))
    var t = el('time', 'ev-time', utc(rec.read_utc) + ' UTC'); t.dateTime = rec.read_utc; head.appendChild(t)
    head.appendChild(el('span', 'ev-url', rec.url))
    root.appendChild(head)

    // the same address over time
    var addr = index && index.addresses.find(function (x) { return x.url === rec.url })
    if (addr && addr.captures.length) {
      var nav = el('nav', 'ev-chain'); nav.setAttribute('aria-label', 'Every capture of this address, oldest first'); nav.tabIndex = 0
      addr.captures.forEach(function (c) {
        var here = c.id === id, n = el(here ? 'span' : 'a', (here ? 'now ' : '') + (c.changed ? 'chg' : ''), utc(c.read_utc))
        if (!here) n.href = base + 'evidence/' + c.id + '.html'
        n.appendChild(el('small', '', c.status == null ? 'not captured' : c.failed ? 'server error ' + c.status : c.changed == null ? 'first capture' : c.changed ? 'changed' : c.rendered_differently ? 'same content' : 'unchanged'))
        nav.appendChild(n)
      })
      root.appendChild(nav)
      var nowEl = nav.querySelector('.now'); if (nowEl && nowEl.scrollIntoView) nav.scrollLeft = Math.max(0, nowEl.offsetLeft - nav.clientWidth / 2)
    }

    // the picture
    var box = el('div', 'ev-shot'), bar = el('div', 'ev-bar'), view = el('div', 'ev-view'), cap = el('div', 'ev-cap')
    view.tabIndex = 0; view.setAttribute('role', 'region'); view.setAttribute('aria-label', 'The screenshot of the page as captured')
    box.appendChild(bar); box.appendChild(view); box.appendChild(cap); root.appendChild(box)
    var out = el('p', 'ev-out'); out.appendChild(el('b', '', 'Leaving this site: ')); var link = el('a', '', rec.url); link.href = rec.url; link.rel = 'noopener external'; out.appendChild(link)
    out.appendChild(document.createTextNode(' is the live page. It may no longer match what we captured at ' + utc(rec.read_utc) + ' UTC.')); root.appendChild(out)

    if (!rec.captured) { bar.appendChild(el('span', '', 'Not captured')); view.appendChild(el('p', '', rec.why || 'No capture was made.')); cap.remove(); return }
    if (!rec.shown || !rec.vault) {
      bar.appendChild(el('span', '', 'Captured and kept privately'))
      view.appendChild(el('p', '', (rec.rendered === false ? (rec.note || 'This address serves a file, not a page: there is no screenshot.') + ' ' : 'The screenshot of this page is not shown: ' + (rec.licence || 'the licence does not clearly allow it.') + ' ') + 'What can be checked: the title, the time read and the sha256 values below.' + (rec.excerpt ? ' The first words on the page: "' + rec.excerpt + '…"' : '')))
      cap.textContent = 'sha256 of the visible text: ' + rec.sha256_text; return
    }
    var v = vaults && vaults.vaults.find(function (x) { return x.id === rec.vault.id })
    if (!v || !v.read_key || !window.EvidenceVault) { view.appendChild(el('p', '', 'The display vault ' + rec.vault.id + ' could not be opened from this page.')); return }

    var shots = [{ file: 'screenshot.jpg', label: 'As served', sha: rec.sha256_screenshot, what: 'The page as a first-time visitor was served it.' }]
    if (rec.clean) shots.unshift({ file: 'screenshot-clean.jpg', label: 'Notices hidden', sha: rec.clean.sha256_screenshot, what: rec.clean.what })
    var check = el('span', 'ev-check', 'reading the vault…'), urls = {}, reader = null
    var buttons = shots.map(function (s, i) { var b = el('button', '', s.label); b.type = 'button'; b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false'); b.addEventListener('click', function () { show(i) }); bar.appendChild(b); return b })
    bar.appendChild(check)
    if (rec.screenshot && rec.screenshot.cut) bar.appendChild(el('span', 'meta', 'A long page: the picture stops at ' + rec.screenshot.height + ' px of ' + rec.screenshot.page_height + '.'))

    function open() { if (!reader) reader = new EvidenceVault.Reader({ endpoint: vaults.endpoint, vault_id: v.id, read_key: v.read_key }).init().then(function (r) { return r.open() }); return reader }
    function show(i) {
      var s = shots[i]; buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false') })
      check.className = 'ev-check'; check.textContent = 'reading the vault…'
      var got = urls[s.file] ? Promise.resolve(urls[s.file]) : open().then(function (r) { return r.readBytes(rec.vault.path + '/' + s.file).then(function (bytes) {
        return EvidenceVault.sha256(bytes).then(function (h) { return (urls[s.file] = { url: URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' })), sha: h, n: bytes.length, req: r.requests }) }) }) })
      got.then(function (g) {
        view.textContent = ''
        var img = el('img'); img.alt = 'Screenshot of ' + rec.url + ' as read at ' + utc(rec.read_utc) + ' UTC (' + s.label.toLowerCase() + ')'; img.src = g.url; view.appendChild(img); view.scrollTop = 0
        var ok = g.sha === s.sha
        check.className = 'ev-check ' + (ok ? 'ok' : 'bad'); check.textContent = ok ? '✓ matches the sha256 in the record' : '✗ does NOT match the sha256 in the record'
        cap.textContent = ''
        cap.appendChild(document.createTextNode(s.what + ' ' + Math.round(g.n / 1024) + ' KB, decrypted in your browser from display vault ' + v.id + ' (' + rec.vault.path + '/' + s.file + '). sha256 '))
        cap.appendChild(el('code', '', g.sha))
      }).catch(function (e) { view.textContent = ''; view.appendChild(el('p', '', 'The screenshot could not be read from the vault (' + e.message + '). The record and its hashes are below; the vault can be cloned with the read key in data/vaults.json.')); check.className = 'ev-check'; check.textContent = 'not read' })
    }
    show(0)
  }).catch(function (e) { root.textContent = ''; root.appendChild(el('p', 'meta', 'The record could not be read (' + e.message + '). The facts of this capture are in the table below.')) })
})()
