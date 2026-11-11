// The media watch's charts (incident.media@web-summit.dinis). No dependencies; colours from the design tokens only
// (never IPMA's warning colours); every mark is a link or opens the reader's panel; each chart names its data file.
(async () => {
  const root = document.getElementById('media-charts'); if (!root) return
  const base = root.dataset.base || ''
  const J = f => fetch(base + f).then(r => r.json())
  const [cov, first, cites, outs] = await Promise.all([J('coverage.json'), J('first-on-each-fact.json'), J('cites.json'), J('outlets.json')])
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
  const name = id => id === 'lusa' ? 'Lusa' : (outs.outlets.find(o => o.id === id) || {}).name || id
  const hm = t => t ? `${+t.slice(8, 10)} Nov ${t.slice(11, 16)}` : ''
  const panel = (title, html, links) => window.stormPanel && window.stormPanel.show ? window.stormPanel.show({ title, html, links }) : null
  const prov = (file, at) => `<p class="prov">Data: <a href="${base}${file}">${file}</a>, kept by incident.media@web-summit.dinis, updated <time datetime="${at}">${hm(at)} UTC</time>. Evidence: what each outlet's own page says; the ranking is analysis.</p>`
  const A = cov.articles.filter(a => a.published && !a.published_precision)
  const facts = first.facts

  // ---- 1. coverage over time, a row per outlet, an hour per cell
  const t0 = Date.parse('2026-11-10T06:00:00Z'), t1 = Math.ceil((Math.max(...A.map(a => Date.parse(a.published))) + 1) / 3600000) * 3600000, H = Math.round((t1 - t0) / 3600000)
  const rows = outs.outlets.filter(o => o.seen && o.seen.items).sort((a, b) => b.seen.items - a.seen.items)
  const LW = 150, CW = 26, RH = 22, TOP = 58, W = LW + H * CW + 20, HT = TOP + rows.length * RH + 30
  const x = t => LW + (Date.parse(t) - t0) / 3600000 * CW
  let s = `<svg class="wx-chart" viewBox="0 0 ${W} ${HT}" width="${W}" height="${HT}" role="img" aria-label="Items published per hour by each outlet, 10 November 06:00 UTC onward, with the key moments marked">`
  for (let h = 0; h <= H; h++) { const d = new Date(t0 + h * 3600000), hh = d.getUTCHours(); if (hh % 3 === 0) s += `<text x="${LW + h * CW}" y="${TOP - 6}" font-size="11" fill="var(--ink-2)" font-family="var(--mono)">${String(hh).padStart(2, '0')}:00</text>`; s += `<line x1="${LW + h * CW}" y1="${TOP}" x2="${LW + h * CW}" y2="${HT - 30}" stroke="var(--line)" stroke-width="${hh === 0 ? 1.5 : .5}"/>` }
  rows.forEach((o, i) => {
    const y = TOP + i * RH
    s += `<a href="${base}outlets/${o.id}.html"><text x="${LW - 8}" y="${y + 15}" text-anchor="end" font-size="12" fill="var(--focus)">${esc(o.name.replace(/ \(.*\)/, '').slice(0, 22))}</text></a>`
    const bins = {}; for (const a of A) if (a.outlet === o.id && Date.parse(a.published) >= t0) { const h = Math.floor((Date.parse(a.published) - t0) / 3600000); (bins[h] ||= []).push(a) }
    for (const [h, its] of Object.entries(bins)) s += `<g class="mc-cell" tabindex="0" role="button" data-o="${o.id}" data-h="${h}" style="cursor:pointer"><rect x="${LW + h * CW + 1}" y="${y + 2}" width="${CW - 2}" height="${RH - 4}" rx="3" fill="var(--focus)" fill-opacity="${Math.min(1, .22 + its.length * .13)}"/><text x="${LW + h * CW + CW / 2}" y="${y + 15}" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="var(--mono)">${its.length}</text><title>${esc(o.name)}, ${hm(new Date(t0 + h * 3600000).toISOString())}: ${its.length} item${its.length > 1 ? 's' : ''}</title></g>`
  })
  const marks = facts.filter(f => f.primary_time && Date.parse(f.primary_time) >= t0)
  marks.forEach((f, i) => { const X = x(f.primary_time); s += `<line x1="${X}" y1="30" x2="${X}" y2="${HT - 30}" stroke="var(--ink)" stroke-width="1.2" stroke-dasharray="4 3"/><circle cx="${X}" cy="20" r="9" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.2"/><text x="${X}" y="24" text-anchor="middle" font-size="11" fill="var(--ink)" font-family="var(--mono)">${i + 1}</text>` })
  s += `</svg>`
  let html = `<section class="card"><h2>Coverage over time, outlet by outlet</h2><p class="meta">Items published in each hour (UTC) since 10 November 06:00, by the time each page itself gives. Dashed lines: the primary source's time of each key moment. A number is a count; press a cell for the items. An outlet's name opens its page.</p><div class="wx-scroll" tabindex="0" role="group" aria-label="Coverage over time: scroll sideways">${s}</div><ol class="meta">${marks.map(f => `<li><strong>${f.primary_time.slice(11, 16)}</strong> ${esc(f.what)} (${esc(f.primary_label)})</li>`).join('')}</ol>${prov('coverage.json', cov.updated)}</section>`

  // ---- 2. who was first on each fact: minutes after the primary, a dot per outlet
  html += `<section class="card"><h2>Who was first with each key fact</h2><p class="meta">Each outlet's first item on the fact, placed by minutes after the primary source's time. A filled dot is an article; a ring is a timed entry inside a live blog. Left of zero: the press ran before the primary page went up. The same as tables: <a href="${base}ranking.html">who was first</a>.</p>`
  for (const f of facts) {
    const r = f.first_by_outlet; if (!r.length) { html += `<h3>${esc(f.what)}</h3><p class="meta">Primary: ${f.primary_time ? hm(f.primary_time) + ' UTC' : 'unknown'}. <strong>Nobody</strong> among the outlets we could read had reported it at our last read.</p>`; continue }
    const ref = f.primary_time || r[0].published, ms = r.map(q => (Date.parse(q.published) - Date.parse(ref)) / 60000), lo = Math.min(0, ...ms), hi = Math.max(60, ...ms.filter(m => m < 400)), CWd = 900, L = 30, sx = m => L + (Math.min(m, hi) - lo) / (hi - lo) * (CWd - 2 * L), RHt = 20, Ht = 34 + r.length * RHt + 8
    let g = `<svg class="wx-chart" viewBox="0 0 ${CWd} ${Ht}" width="${CWd}" height="${Ht}" role="img" aria-label="${esc(f.what)}: minutes after the primary source, per outlet">`
    const step = (hi - lo) > 300 ? 60 : (hi - lo) > 120 ? 30 : 10
    for (let m = Math.ceil(lo / step) * step; m <= hi; m += step) g += `<line x1="${sx(m)}" y1="22" x2="${sx(m)}" y2="${Ht - 6}" stroke="var(--line)" stroke-width="${m === 0 ? 0 : .6}"/><text x="${sx(m)}" y="14" font-size="11" text-anchor="middle" fill="var(--ink-2)" font-family="var(--mono)">${m > 0 ? '+' : ''}${m}</text>`
    g += `<line x1="${sx(0)}" y1="18" x2="${sx(0)}" y2="${Ht - 6}" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="4 3"/>`
    r.forEach((q, i) => { const m = ms[i], X = sx(m), Y = 34 + i * RHt, live = q.via === 'live blog entry', right = X < CWd - 330
      g += `<a href="${esc(q.url)}" target="_blank" rel="noopener"><circle cx="${X}" cy="${Y}" r="6" fill="${live ? 'var(--paper)' : 'var(--focus)'}" stroke="var(--focus)" stroke-width="2.4"/><text x="${right ? X + 12 : X - 12}" y="${Y + 4}" text-anchor="${right ? 'start' : 'end'}" font-size="12" fill="var(--ink)">${esc(name(q.outlet))} <tspan fill="var(--ink-2)" font-family="var(--mono)">${q.published.slice(11, 16)}${f.primary_time ? ' (' + (m >= 0 ? '+' : '') + Math.round(m) + ' min)' : ''}${m > hi ? ' →' : ''}${live ? ' · live entry' : ''}</tspan></text><title>${esc(q.title)} (leaves this site)</title></a>` })
    html += `<h3>${esc(f.what)}</h3><p class="meta">Primary source: ${f.primary_time ? `<strong>${hm(f.primary_time)} UTC</strong> (${esc(f.primary_label)})` : '<strong>time unknown</strong>; minutes are counted from the first report'}. ${esc(f.primary_note || '')}</p><div class="wx-scroll" tabindex="0" role="group" aria-label="scroll sideways">${g}</svg></div>`
  }
  html += prov('first-on-each-fact.json', first.updated) + `</section>`

  // ---- 3. who carried whose words
  const left = [...new Set(cites.edges.map(e => e.from))], right = [...new Set(cites.edges.map(e => e.to))], RH3 = 34, H3 = 30 + Math.max(left.length, right.length) * RH3, W3 = 760, yL = i => 30 + i * RH3, yR = i => 30 + i * RH3 + (left.length - right.length) * RH3 / 2
  let c = `<svg class="wx-chart" viewBox="0 0 ${W3} ${H3}" width="${W3}" height="${H3}" role="img" aria-label="Which outlet carried whose words, by number of items">`
  const nth = {}
  for (const e of cites.edges) { const y1 = yL(left.indexOf(e.from)), y2 = yR(right.indexOf(e.to)), k = (nth[e.from] = (nth[e.from] || 0) + 1), t = k === 1 ? .12 : .5, u = 1 - t, lx = u * u * u * 230 + 3 * u * u * t * 380 + 3 * u * t * t * 380 + t * t * t * 530, ly = u * u * u * y1 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y2, dash = e.verb === 'relayed' ? '2 4' : e.verb === 'republished' ? '7 4' : ''
    c += `<g class="mc-edge" tabindex="0" role="button" data-k="${esc(e.from + '|' + e.verb + '|' + e.to)}" style="cursor:pointer"><path d="M 230 ${y1} C 380 ${y1}, 380 ${y2}, 530 ${y2}" fill="none" stroke="var(--ink-2)" stroke-opacity=".75" stroke-width="${Math.max(1.5, Math.min(18, Math.sqrt(e.items) * 2.2))}" stroke-dasharray="${dash}"/><text x="${lx}" y="${ly - 7}" font-size="11" fill="var(--ink)" paint-order="stroke" stroke="var(--paper)" stroke-width="3">${k === 1 && e.verb === 'published the wire of' ? e.items : esc(e.verb) + ' · ' + e.items}</text><title>${esc(name(e.from))} ${esc(e.verb)} ${esc(name(e.to))}: ${e.items} item(s)</title></g>` }
  left.forEach((o, i) => c += `<a href="${base}outlets/${o}.html"><text x="222" y="${yL(i) + 4}" text-anchor="end" font-size="13" fill="var(--focus)">${esc(name(o))}</text></a>`)
  right.forEach((o, i) => c += `<a href="${base}outlets/${o}.html"><text x="538" y="${yR(i) + 4}" font-size="13" fill="var(--focus)">${esc(name(o))}</text></a>`)
  c += `</svg>`
  html += `<section class="card"><h2>Who carried whose words</h2><p class="meta">From by-lines that name the agency or another outlet, and from entries that say they relay. A solid line: published the wire of (the number is the count of items). Long dashes: republished. Dots: relayed. Width grows with the number of items; press a line for examples. It does not see quotes or links inside an article's text.</p><div class="wx-scroll" tabindex="0" role="group" aria-label="scroll sideways">${c}</div>${prov('cites.json', cites.updated)}</section>`
  root.innerHTML = html

  const list = its => '<ul class="feed">' + its.map(a => `<li><time datetime="${a.published}">${hm(a.published)}</time> <a href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.title)} ↗</a>${a.byline && a.byline.length ? ` <span class="meta">${esc(a.byline.join(', '))}</span>` : ''}</li>`).join('') + '</ul>'
  const act = el => {
    if (el.dataset.o) { const its = A.filter(a => a.outlet === el.dataset.o && Math.floor((Date.parse(a.published) - t0) / 3600000) === +el.dataset.h); const h = hm(new Date(t0 + el.dataset.h * 3600000).toISOString())
      if (!panel(`${name(el.dataset.o)}, ${h} UTC`, list(its) + `<p class="meta">Evidence: titles and times from the outlet's own pages. Links leave this site.</p>`, [{ href: base + 'outlets/' + el.dataset.o + '.html', text: name(el.dataset.o) + ': its page here' }])) location.href = base + 'outlets/' + el.dataset.o + '.html' }
    if (el.dataset.k) { const e = cites.edges.find(e => e.from + '|' + e.verb + '|' + e.to === el.dataset.k)
      if (!panel(`${name(e.from)} ${e.verb} ${name(e.to)}`, `<p>${e.items} item${e.items > 1 ? 's' : ''}. How we know: ${esc(e.basis)}.</p>` + list(e.examples), [{ href: base + 'outlets/' + e.from + '.html', text: name(e.from) }, { href: base + 'outlets/' + e.to + '.html', text: name(e.to) }])) location.href = base + 'outlets/' + e.from + '.html' }
  }
  root.addEventListener('click', ev => { const el = ev.target.closest('.mc-cell,.mc-edge'); if (el) act(el) })
  root.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { const el = ev.target.closest('.mc-cell,.mc-edge'); if (el) { ev.preventDefault(); act(el) } } })
})()
