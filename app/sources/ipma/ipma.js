// The IPMA section (sources/ipma/): every view is drawn here from the small JSON files that tools/ipma-views.mjs writes
// from IPMA's open data. No dependency, no outside request: the page reads this site's own files only.
// A page mounts a view with <div class="ipma" data-view="map|warnings|api|browser|sea|cities|reads" data-base="./">.
// Rules kept (design/README.md): tokens, never hex; IPMA's warning colours for IPMA's levels only, with the level
// written; observations wear blue or grey; a source and the time read after every figure; times UTC.
// Kept by incident.ipma@web-summit.dinis.
(() => {
    'use strict'
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const cache = {}
    const J = u => cache[u] || (cache[u] = fetch(u, { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error(u + ': ' + r.status); return r.json() }))
    const hm = t => t ? String(t).slice(11, 16) : '?'
    const dhm = t => t ? `${+String(t).slice(8, 10)} ${['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+String(t).slice(5, 7)]} ${hm(t)}` : '?'
    const prov = (srcs, what = 'IPMA open data') => { const s = (srcs || [])[0]; return s ? `<span class="prov">Source: <a href="${esc(s.url)}" rel="external">${esc(what)}</a>, read <time datetime="${esc(s.read_utc)}">${esc(dhm(s.read_utc))} UTC</time>${s.last_modified ? `; IPMA's file dated ${esc(dhm(s.last_modified))} UTC` : ''}</span>` : '' }
    const LV = { green: 0, yellow: 1, orange: 2, red: 3 }
    const TYPE_EN = { 'Agitação Marítima': 'Rough sea', Neve: 'Snow', Nevoeiro: 'Fog', 'Precipitação': 'Rain', 'Tempo Frio': 'Cold', 'Tempo Quente': 'Heat', Trovoada: 'Thunderstorms', Vento: 'Wind' }
    const DIR = [null, 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
    const ms = t => Date.parse(/Z$|[+-]\d\d:\d\d$/.test(t) ? t : t + 'Z')   // IPMA writes no zone; the mainland and Madeira are on UTC in November
    const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e }
    const lastOf = a => { for (let i = a.length - 1; i >= 0; i--) if (a[i] !== null) return [a[i], i]; return [null, -1] }

    // ------------------------------------------------------------ the item panel (what was clicked), shared by the views
    function panel(root) {
        const p = el('aside', 'ip-item card', '<h2>This item</h2><p class="meta">Click a station, an area, a warning or a row: what IPMA says about it appears here, with the file it came from.</p>')
        p.setAttribute('aria-live', 'polite')
        return { node: p, show: (title, html) => { p.innerHTML = `<h2>${title}</h2>${html}`; if (matchMedia('(max-width: 900px)').matches) p.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) } }
    }
    const warnHtml = (w, areas) => `<li class="ip-w${w.gone_read_utc ? ' gone' : ''}"><span class="lvl ${esc(w.level)}">${esc(w.level)}</span> <b>${esc(TYPE_EN[w.type] || w.type)}</b> <i lang="pt">${esc(w.type)}</i>${areas ? ` · <a href="warnings.html#${esc(w.area)}">${esc(areas[w.area]?.name || w.area)}</a>` : ''}<br><span class="ip-mono">${esc(dhm(w.start))} to ${esc(dhm(w.end))}</span><br><span lang="pt">${esc(w.text_pt || '')}</span><br><span class="prov">${w.there_at_our_first_read ? 'already in the feed at our first read' : 'first in our read of'} <time>${esc(dhm(w.first_read_utc))} UTC</time>${w.gone_read_utc ? `; <b>${esc(w.gone)}</b>: not in our read of <time>${esc(dhm(w.gone_read_utc))} UTC</time> (last seen ${esc(hm(w.last_read_utc))})` : `; still there at <time>${esc(dhm(w.last_read_utc))} UTC</time>`}${w.replaces?.length ? '; took the place of an earlier row' : ''}</span></li>`

    // ------------------------------------------------------------ the map: Portugal and the islands, drawn from IPMA's coordinates
    const BOX = { mainland: { name: 'Mainland', lon: [-9.75, -6.0], lat: [36.85, 42.25] }, madeira: { name: 'Madeira and Porto Santo', lon: [-17.4, -16.15], lat: [32.3, 33.25] }, azores: { name: 'The Azores', lon: [-31.5, -24.8], lat: [36.75, 39.9] } }
    const VARS = {
        w: { name: 'Wind', unit: 'km/h', note: 'mean wind speed at 10 m in the latest hour (IPMA\'s open data carries no gusts)', max: 80, val: s => lastOf(s.w) },
        r: { name: 'Rain, last hour', unit: 'mm', note: 'precipitation in the latest hour', max: 20, val: s => lastOf(s.r) },
        r24: { name: 'Rain, 24 hours', unit: 'mm', note: 'the sum of the hourly values in the file (computed by us)', max: 120, val: s => { const v = s.r.filter(x => x !== null); return [v.length ? +v.reduce((a, b) => a + b, 0).toFixed(1) : null, s.r.length - 1] } },
        t: { name: 'Temperature', unit: '°C', note: 'air temperature at 1.5 m, mean of the latest hour', max: 30, val: s => lastOf(s.t) },
        p: { name: 'Pressure', unit: 'hPa', note: 'pressure at sea level, mean of the latest hour', min: 975, max: 1025, val: s => lastOf(s.p) }
    }
    async function viewMap(root, base) {
        const [pl, st, ob, wa, sz] = await Promise.all([J(base + 'data/places.json'), J(base + 'data/stations.json'), J(base + 'data/observations.json'), J(base + 'data/warnings.json'), J(base + 'data/shellfish-zones.json').catch(() => null)])
        const areas = Object.fromEntries(pl.areas.map(a => [a.id, a])), act = wa.instances.filter(w => !w.gone_read_utc)
        let v = root.dataset.var || 'w'
        const side = panel(root)
        root.innerHTML = `<div class="ip-bar"><span class="ip-seg" role="group" aria-label="What the stations show">${Object.entries(VARS).map(([k, x]) => `<button type="button" data-v="${k}" aria-pressed="${k === v}">${x.name}</button>`).join('')}</span><span class="ip-legend"></span></div><div class="ip-cols"><div class="ip-maps"></div></div><p class="meta ip-foot"></p>`
        root.querySelector('.ip-cols').append(side.node)
        const maps = root.querySelector('.ip-maps')
        const draw = () => {
            const V = VARS[v]; maps.innerHTML = ''
            const lastHour = ob.hours.at(-1)
            for (const [rk, B] of Object.entries(BOX)) {
                const k = Math.cos((B.lat[0] + B.lat[1]) / 2 * Math.PI / 180), Wd = (B.lon[1] - B.lon[0]) * k, Hd = B.lat[1] - B.lat[0], S = rk === 'mainland' ? 150 : rk === 'madeira' ? 330 : 95
                const X = lon => ((lon - B.lon[0]) * k * S).toFixed(1), Y = lat => ((B.lat[1] - lat) * S).toFixed(1)
                const inb = (lon, lat) => lon >= B.lon[0] && lon <= B.lon[1] && lat >= B.lat[0] && lat <= B.lat[1]
                let g = ''
                if (rk === 'mainland') {
                    for (const m of pl.municipalities) g += `<circle class="ip-muni" cx="${X(m.lon)}" cy="${Y(m.lat)}" r="2.2"/>`
                    for (const z of sz?.zones || []) for (const r of z.rings) g += `<path class="ip-coast" d="M${r.map(p => X(p[0]) + ' ' + Y(p[1])).join('L')}Z"/>`
                }
                for (const s of st.stations.filter(s => s.region === rk && inb(s.lon, s.lat))) {
                    const o = ob.stations[s.id], [val] = o ? V.val(o) : [null]
                    const f = val === null ? 0 : Math.max(0, Math.min(1, (val - (V.min || 0)) / (V.max - (V.min || 0))))
                    const d = o ? lastOf(o.d)[0] : null
                    g += `<g class="ip-st${val === null ? ' nd' : ''}" tabindex="0" role="button" data-st="${s.id}" transform="translate(${X(s.lon)} ${Y(s.lat)})"><title>${esc(s.name)}: ${val === null ? 'no value' : val + ' ' + V.unit}</title><circle r="${val === null ? 2.5 : (3.5 + f * 9).toFixed(1)}" style="--f:${(f * 100).toFixed(0)}%"/>${v === 'w' && d ? `<path class="ip-arrow" d="M0 0L0 ${-(8 + f * 16).toFixed(0)}" transform="rotate(${(d % 8 || 8) * 45 - 45 + 180})"/>` : ''}</g>`
                }
                for (const a of pl.areas.filter(a => a.region === rk && a.label_at)) {
                    const pk = wa.now.by_area[a.id]?.peak || 'green'
                    g += `<g class="ip-area lv-${pk}" tabindex="0" role="button" data-area="${a.id}" transform="translate(${X(a.label_at[0])} ${Y(a.label_at[1])})"><title>${esc(a.name)}: ${pk === 'green' ? 'no warning above green' : 'IPMA ' + pk + ' warning'}</title><rect x="-17" y="-9" width="34" height="18" rx="3"/><text y="4">${a.id}</text>${pk !== 'green' ? `<text class="ip-lvl" y="19">${pk}</text>` : ''}</g>`
                }
                const fig = el('figure', 'ip-map card ip-' + rk, `<figcaption><b>${B.name}</b></figcaption><svg viewBox="-6 -6 ${(Wd * S + 12).toFixed(0)} ${(Hd * S + 26).toFixed(0)}" role="group" aria-label="${B.name}: IPMA stations and warning areas">${g}</svg>`)
                maps.append(fig)
            }
            root.querySelector('.ip-legend').innerHTML = `<span class="ip-key"><svg viewBox="0 0 60 16" width="60" height="16"><circle class="ip-kc" cx="6" cy="8" r="3.5" style="--f:0%"/><circle class="ip-kc" cx="24" cy="8" r="6" style="--f:40%"/><circle class="ip-kc" cx="46" cy="8" r="8" style="--f:100%"/></svg> ${V.min || 0} to ${V.max}+ ${V.unit}: ${V.note}; hour labelled <b class="ip-mono">${esc(lastHour.slice(11))}</b></span> <span class="ip-key"><span class="lvl yellow">yellow</span> <span class="lvl orange">orange</span> <span class="lvl red">red</span> the highest IPMA warning now in the feed for each area</span>`
            root.querySelectorAll('[data-v]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === v))
        }
        const showStation = id => {
            const s = st.stations.find(x => x.id == id), o = ob.stations[id]; if (!s) return
            const rows = o ? ob.hours.map((h, i) => `<tr><td class="ip-mono">${h.slice(8, 10)} ${h.slice(11)}</td><td>${o.t[i] ?? '·'}</td><td>${o.w[i] ?? '·'}</td><td>${DIR[o.d[i]] || '·'}</td><td>${o.r[i] ?? '·'}</td><td>${o.p[i] ?? '·'}</td><td>${o.h[i] ?? '·'}</td></tr>`).reverse().join('') : ''
            side.show(esc(s.name), `<p class="meta">IPMA station <span class="ip-mono">${s.id}</span> · ${s.lat.toFixed(4)}, ${s.lon.toFixed(4)} · <a href="stations.html#${s.id}">its page</a></p>${o ? `<div class="ip-spark">${spark(o.w, 'Wind, km/h')}${spark(o.r, 'Rain, mm per hour', true)}${spark(o.p, 'Pressure, hPa')}${spark(o.t, 'Temperature, °C')}</div><div class="wx-scroll" tabindex="0"><table class="ip-t"><thead><tr><th>Hour</th><th>°C</th><th>km/h</th><th>from</th><th>mm</th><th>hPa</th><th>%</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p>No observation from this station in the 24 hours read.</p>'}<p>${prov(ob.from, 'observations.json')}</p><p class="meta">An observation by IPMA. The hour is as IPMA labels it (it does not say whether the hour starts or ends there). "·" is IPMA's no-data value.</p>`)
        }
        const showArea = id => {
            const a = areas[id], ws = wa.instances.filter(w => w.area === id).sort((x, y) => (x.gone_read_utc ? 1 : 0) - (y.gone_read_utc ? 1 : 0) || LV[y.level] - LV[x.level] || x.start.localeCompare(y.start))
            side.show(`${esc(a.name)} <span class="ip-mono">${esc(id)}</span>`, `<p class="meta">IPMA warning area · <a href="warnings.html#${esc(id)}">its warnings over time</a></p><ul class="ip-wl">${ws.map(w => warnHtml(w)).join('') || '<li>No warning above green in any of our reads.</li>'}</ul><p>${prov(wa.from, 'warnings_www.json')}</p><p class="meta">Warnings are IPMA's, in IPMA's words. For what to do, follow <a href="https://www.ipma.pt/pt/otempo/prev-sam/" rel="external">IPMA</a> and ANEPC.</p>`)
        }
        root.addEventListener('click', e => { const b = e.target.closest('[data-v]'); if (b) { v = b.dataset.v; draw(); return } const s = e.target.closest('[data-st]'); if (s) return showStation(s.dataset.st); const a = e.target.closest('[data-area]'); if (a) showArea(a.dataset.area) })
        root.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { const t = e.target.closest('[data-st],[data-area]'); if (t) { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })) } } })
        draw()
        root.querySelector('.ip-foot').innerHTML = `${st.reporting} of ${st.count} stations reported in the 24 hours read. ${prov(ob.from, 'observations.json')} · ${prov(wa.from, 'warnings_www.json')} · Drawn by us from IPMA's coordinates: grey dots are the points IPMA gives for the 278 mainland municipalities; the coast line is the outline of IPMA's coastal shellfish zones; an area's box sits at the mean of its places (a spot for a label, not a border). No map tiles, no image.`
        if (location.hash.length > 1) { const h = location.hash.slice(1); if (areas[h]) showArea(h); else if (/^\d+$/.test(h)) showStation(h) }
    }
    function spark(a, label, bars) {
        const v = a.filter(x => x !== null); if (!v.length) return `<div class="ip-sp"><span>${label}</span><i>no values</i></div>`
        const lo = bars ? 0 : Math.min(...v), hi = Math.max(...v, lo + (bars ? 1 : 0.5)), n = a.length, X = i => (i / (n - 1) * 196 + 2).toFixed(1), Y = x => (30 - (x - lo) / (hi - lo) * 26).toFixed(1)
        const body = bars ? a.map((x, i) => x ? `<rect x="${(i / n * 196 + 2).toFixed(1)}" y="${Y(x)}" width="${(196 / n - 1).toFixed(1)}" height="${(30 - Y(x)).toFixed(1)}"/>` : '').join('') : `<path d="${a.map((x, i) => x === null ? '' : `${X(i)} ${Y(x)}`).filter(Boolean).map((p, i) => (i ? 'L' : 'M') + p).join('')}"/>`
        return `<div class="ip-sp"><span>${label}</span><svg viewBox="0 0 200 32" preserveAspectRatio="none" role="img" aria-label="${label}: ${lo} to ${Math.max(...v)}">${body}</svg><i class="ip-mono">${bars ? '' : Math.min(...v) + ' to '}${Math.max(...v)}${bars ? ' max' : ''}</i></div>`
    }

    // ------------------------------------------------------------ the warnings of every area over time, as read
    async function viewWarnings(root, base) {
        const [pl, wa] = await Promise.all([J(base + 'data/places.json'), J(base + 'data/warnings.json')])
        const areas = Object.fromEntries(pl.areas.map(a => [a.id, a])), all = wa.instances
        const only = root.dataset.area || null
        const side = panel(root)
        if (!all.length) { root.innerHTML = '<p class="meta">No warning above green in any read yet.</p>'; return }
        const t0 = Math.floor(Math.min(...all.map(w => ms(w.start)), Date.parse(wa.reads[0].read_utc)) / 216e5) * 216e5, t1 = Math.ceil(Math.max(...all.map(w => ms(w.end))) / 216e5) * 216e5, span = t1 - t0
        const pct = t => ((t - t0) / span * 100).toFixed(3)
        const ticks = []; for (let t = t0; t <= t1; t += 216e5) ticks.push(t)
        const nowT = Date.parse(wa.now.read_utc)
        const rows = []
        for (const rk of ['mainland', 'madeira', 'azores']) {
            const as = pl.areas.filter(a => a.region === rk && (!only || a.id === only))
            if (!as.length) continue
            rows.push(`<div class="wx-group ip-grp">${BOX[rk].name}</div>`)
            for (const a of as.sort((x, y) => x.name.localeCompare(y.name))) {
                const ws = all.filter(w => w.area === a.id)
                const types = [...new Set(ws.map(w => w.type))].sort()
                if (!ws.length) { rows.push(`<div class="wx-row ip-none" id="${a.id}"><div class="wx-lab">${esc(a.name)}<i class="ip-mono">${a.id}</i></div><div class="wx-track" style="--n:${ticks.length - 1}"><span class="ip-nil">no warning above green in our reads</span></div></div>`); continue }
                types.forEach((ty, ti) => {
                    // lanes: live rows on the first lane where they fit; rows that went (replaced, withdrawn, ended) on lanes below
                    const list = ws.filter(w => w.type === ty).sort((x, y) => (x.gone_read_utc ? 1 : 0) - (y.gone_read_utc ? 1 : 0) || x.start.localeCompare(y.start)), lanes = []
                    for (const w of list) { let l = lanes.findIndex(L => L.every(o => ms(o.end) <= ms(w.start) || ms(o.start) >= ms(w.end))); if (l < 0) { lanes.push([]); l = lanes.length - 1 } lanes[l].push(w); w._lane = l }
                    rows.push(`<div class="wx-row"${ti === 0 ? ` id="${a.id}"` : ''}><div class="wx-lab">${ti === 0 ? `<a href="#${a.id}">${esc(a.name)}</a><i class="ip-mono">${a.id}</i>` : ''}<i>${esc(TYPE_EN[ty] || ty)} · <span lang="pt">${esc(ty)}</span></i></div><div class="wx-track" style="--n:${ticks.length - 1};min-height:${lanes.length * 26 + 8}px">${list.map(w => `<button type="button" class="wx-bar ip-bar-w ${w.gone_read_utc ? 'gone g-' + esc(w.gone) : 'w-' + esc(w.level)}" data-w="${esc(w.id)}" style="left:${pct(ms(w.start))}%;width:${(pct(ms(w.end)) - pct(ms(w.start))).toFixed(3)}%;top:${4 + w._lane * 26}px;bottom:auto;height:22px" title="${esc(w.level)} ${esc(ty)}, ${esc(dhm(w.start))} to ${esc(dhm(w.end))}${w.gone_read_utc ? ' (' + esc(w.gone) + ')' : ''}"><span><b>${esc(w.level)}</b>${w.gone_read_utc ? esc(w.gone) + ' ' : ''}${esc(hm(w.start))} to ${esc(hm(w.end))}</span></button>`).join('')}<i class="ip-now" style="left:${pct(nowT)}%"></i></div></div>`)
                })
            }
        }
        const n = { live: all.filter(w => !w.gone_read_utc).length, replaced: all.filter(w => w.gone === 'replaced').length, withdrawn: all.filter(w => w.gone === 'withdrawn').length, ended: all.filter(w => w.gone === 'ended').length }
        root.innerHTML = `<div class="ip-bar"><span class="ip-key"><span class="lvl yellow">yellow</span> <span class="lvl orange">orange</span> <span class="lvl red">red</span> in IPMA's feed at our latest read</span><span class="ip-key"><i class="ip-sw gone"></i> a row that has left the feed: replaced, withdrawn or ended (dashed, with the word)</span><span class="ip-key"><i class="ip-sw now"></i> our latest read, ${esc(dhm(wa.now.read_utc))} UTC</span></div>
<p class="meta">${n.live} warnings above green in the feed now; ${n.replaced} replaced, ${n.withdrawn} withdrawn and ${n.ended} ended since our first read (${esc(dhm(wa.reads[0].read_utc))} UTC, ${wa.reads.length} reads). ${prov(wa.from, 'warnings_www.json')}</p>
<div class="ip-cols"><div class="card ip-tl"><div class="wx-scroll" tabindex="0"><div class="wx-strip ip-strip"><div class="wx-row ip-axis"><div class="wx-lab">Area<i>type</i></div><div class="wx-track" style="--n:${ticks.length - 1}">${ticks.slice(0, -1).map(t => { const d = new Date(t); return `<span class="ip-tick" style="left:${pct(t)}%">${d.getUTCHours() === 0 ? `<b>${d.getUTCDate()} Nov</b> ` : ''}${String(d.getUTCHours()).padStart(2, '0')}:00</span>` }).join('')}</div></div>${rows.join('')}</div></div></div></div>
<p class="meta">Each bar is one row of IPMA's feed: an area, a type, a level and a window. IPMA's feed has no time of issue and no identifier, so a changed warning is a new row: "replaced" is our pairing (same area and type, overlapping window, appearing in the read where the old row went). Windows are as IPMA writes them (Lisbon and Madeira are on UTC in November; the Azores are one hour behind). Warnings issued before our first read: <a href="${base}../../incidents/2026-11-10-storm-charles/data/weather/warnings.json">the meteorologist's record</a>.</p>`
        root.querySelector('.ip-cols').append(side.node)
        const show = id => { const w = all.find(x => x.id === id); if (!w) return; const rel = [...(w.replaces || []), ...(w.replaced_by || [])].map(i => all.find(x => x.id === i)).filter(Boolean); side.show(`${esc(TYPE_EN[w.type] || w.type)}, ${esc(areas[w.area]?.name || w.area)}`, `<ul class="ip-wl">${warnHtml(w, areas)}</ul>${w.replaces?.length ? `<h3>It took the place of</h3><ul class="ip-wl">${w.replaces.map(i => all.find(x => x.id === i)).filter(Boolean).map(x => warnHtml(x)).join('')}</ul>` : ''}${w.replaced_by?.length ? `<h3>Replaced by</h3><ul class="ip-wl">${w.replaced_by.map(i => all.find(x => x.id === i)).filter(Boolean).map(x => warnHtml(x)).join('')}</ul>` : ''}<p class="meta">Id on this site: <span class="ip-mono">${esc(w.id)}</span> (ours: IPMA gives none). ${prov(wa.from, 'warnings_www.json')}</p><p class="meta">A warning by IPMA, in IPMA's words. For what to do, follow IPMA and ANEPC.</p>`) }
        root.addEventListener('click', e => { const b = e.target.closest('[data-w]'); if (b) show(b.dataset.w) })
        if (location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView()
    }

    // ------------------------------------------------------------ the map of the API
    async function viewApi(root, base) {
        const [api, latest, reads, listing] = await Promise.all([J(base + 'api.json'), J(base + 'latest.json'), J(base + 'reads.json'), J(base + 'listing.json').catch(() => null)])
        const files = Object.entries(latest.files)
        const one = root.dataset.endpoint
        const eps = api.endpoints.filter(e => !one || e.id === one)
        const fileRows = e => files.filter(([, f]) => f.endpoint === e.id)
        const stat = f => f.status === 200 ? `<span class="lvl obs">200</span>` : `<span class="lvl obs ip-bad">${f.status || 'failed'}</span>`
        const group = g => `<section class="card ip-grp-card"><h2>${esc(api.groups[g])}</h2><div class="wx-scroll" tabindex="0"><table class="ip-t ip-api"><thead><tr><th>Data set</th><th>Format</th><th>Files read</th><th>Size</th><th>IPMA's file dated</th><th>We read it</th><th>Changes seen</th></tr></thead><tbody>${api.endpoints.filter(e => e.group === g).map(e => { const fr = fileRows(e), f0 = fr[0]?.[1], bytes = fr.reduce((s, [, f]) => s + (f.bytes || 0), 0), lm = fr.map(([, f]) => f.last_modified).filter(Boolean).sort().at(-1), ch = fr.reduce((s, [, f]) => s + (f.changes || 0), 0), bad = fr.filter(([, f]) => f.status !== 200).length; return `<tr><td><a href="${base}endpoints/${e.id}.html"><b>${esc(e.title)}</b></a><br><i lang="pt">${esc(e.title_pt || '')}</i>${e.documented === false ? ' <span class="lbl">not documented</span>' : ''}</td><td>${esc(e.format)}</td><td class="ip-mono">${fr.length}${bad ? ` <span class="ip-bad">(${bad} not 200)</span>` : ''}</td><td class="ip-mono">${bytes ? bytes.toLocaleString('en') : '·'}</td><td class="ip-mono">${lm ? esc(dhm(lm)) : '·'}</td><td class="ip-mono">${f0 ? esc(dhm(f0.read_utc)) : '·'}</td><td class="ip-mono">${ch || '·'}</td></tr>` }).join('')}</tbody></table></div></section>`
        if (!one) {
            const r = reads.reads.at(-1)
            root.innerHTML = `<div class="wx-tiles ip-tiles"><div class="wx-tile"><p class="meta">Data sets mapped</p><p class="ip-big">${api.endpoints.length}</p><p class="meta">${api.endpoints.filter(e => e.documented !== false).length} documented by IPMA, ${api.endpoints.filter(e => e.documented === false).length} found in its listings</p></div><div class="wx-tile"><p class="meta">Files read</p><p class="ip-big">${files.length}</p><p class="meta">${files.filter(([, f]) => f.status !== 200).length} did not answer 200</p></div><div class="wx-tile"><p class="meta">Our reads</p><p class="ip-big">${reads.reads.length}</p><p class="meta">latest ${esc(dhm(r.at))} UTC: ${r.requests} requests in ${r.seconds} s, ${r.changed.length} files changed</p></div><div class="wx-tile"><p class="meta">Directories IPMA lists</p><p class="ip-big">${listing ? listing.directories.filter(d => d.listed).length : '·'}</p><p class="meta"><a href="${base}listing.json">listing.json</a>: names, sizes and dates as IPMA's server gives them</p></div></div>${Object.keys(api.groups).map(group).join('')}<p class="meta">Times UTC. "IPMA's file dated" is the Last-Modified header IPMA sends; "Changes seen" counts the reads in which a file's sha256 differed from the read before. The map itself: <a href="${base}api.json">api.json</a>; the hashes: <a href="${base}latest.json">latest.json</a>; every read: <a href="${base}reads.json">reads.json</a>.</p>`
            return
        }
        const e = eps[0]; if (!e) { root.innerHTML = '<p>No such data set in api.json.</p>'; return }
        const fr = fileRows(e), ch = await J(base + 'changes/' + e.id + '.json').catch(() => null)
        root.innerHTML = `<section class="card"><h2>What we read</h2><div class="wx-scroll" tabindex="0"><table class="ip-t"><thead><tr><th>File at IPMA</th><th>Answer</th><th>Bytes</th><th>sha256</th><th>IPMA's file dated</th><th>We read it</th><th>Reads</th><th>Changes</th></tr></thead><tbody>${fr.map(([n, f]) => `<tr><td><a href="${esc(f.url)}" rel="external" class="ip-out">${esc(n)}</a></td><td>${stat(f)}</td><td class="ip-mono">${f.bytes?.toLocaleString('en') ?? '·'}</td><td class="ip-mono" title="${esc(f.sha256 || '')}">${f.sha256 ? esc(f.sha256.slice(0, 16)) + '…' : '·'}</td><td class="ip-mono">${f.last_modified ? esc(dhm(f.last_modified)) : '·'}</td><td class="ip-mono">${esc(dhm(f.read_utc))}</td><td class="ip-mono">${f.reads}</td><td class="ip-mono">${f.changes || '·'}</td></tr>`).join('') || '<tr><td colspan="8">Not read yet.</td></tr>'}</tbody></table></div><p class="meta">The link goes to IPMA's live file (it leaves this site, and may have changed since). Our copy of each response is in the data store under the hour read; its hash is the one shown. Times UTC.</p></section>
<section class="card"><h2>What changed between our reads</h2>${ch?.changes?.length ? `<ul class="feed ip-ch">${ch.changes.slice(0, 30).map(c => `<li><time datetime="${esc(c.at)}">${esc(dhm(c.at))}</time><span><b class="ip-mono">${esc(c.file.split('/').pop())}</b> ${c.note ? esc(c.note) : `${c.added} added, ${c.removed} removed, ${c.changed} changed (of ${c.records_after} records)`} <span class="prov">IPMA's file dated ${esc(dhm(c.last_modified))}; ${esc(String(c.from_sha256).slice(0, 8))} → ${esc(String(c.to_sha256).slice(0, 8))}</span>${detail(c)}</span></li>`).join('')}</ul><p class="meta"><a href="${base}changes/${e.id}.json">changes/${e.id}.json</a></p>` : '<p class="meta">No change seen yet between two of our reads (or one read only so far).</p>'}</section>`
    }
    const kv = o => typeof o === 'object' && o ? Object.entries(o).map(([k, v]) => `${esc(k)}: ${esc(typeof v === 'object' ? JSON.stringify(v) : v)}`).join(', ') : esc(o)
    const detail = c => { const p = []; for (const [k, lab, f] of [['added_items', 'Added', x => kv(x.now)], ['removed_items', 'Removed', x => kv(x.was)], ['changed_items', 'Changed', x => kv(x.was) + ' → ' + kv(x.now)]]) if (c[k]?.length) p.push(`<details class="ip-d"><summary>${lab}: ${c[k].length}${c[k].length >= 40 ? '+' : ''}</summary><ul>${c[k].map(x => `<li><span class="ip-mono">${esc(x.key)}</span> ${f(x)}</li>`).join('')}</ul></details>`); for (const k of ['added_keys', 'removed_keys']) if (c[k]?.length) p.push(`<details class="ip-d"><summary>${k === 'added_keys' ? 'New' : 'Gone'}: ${c[k].length}</summary><p class="ip-mono">${c[k].map(esc).join(', ')}</p></details>`); return p.join('') }

    // ------------------------------------------------------------ a browser for any JSON file of this site: its schema, a table, the raw text
    function schema(v, depth = 0) {
        if (v === null) return 'null'
        if (Array.isArray(v)) return v.length ? `[${v.length} × ${schema(v[0], depth + 1)}]` : '[]'
        if (typeof v === 'object') { const k = Object.keys(v); if (depth > 3) return `{${k.length} keys}`; const shown = k.slice(0, 24); return '{\n' + shown.map(x => '  '.repeat(depth + 1) + x + ': ' + schema(v[x], depth + 1)).join(',\n') + (k.length > 24 ? `,\n${'  '.repeat(depth + 1)}… ${k.length - 24} more keys like these` : '') + '\n' + '  '.repeat(depth) + '}' }
        return typeof v
    }
    function tableOf(v) {
        let rows = null, cols = null
        const firstArr = o => Array.isArray(o) ? o : o && typeof o === 'object' ? Object.values(o).find(x => Array.isArray(x) && x.length && typeof x[0] === 'object') || (Object.values(o).every(x => x && typeof x === 'object' && !Array.isArray(x)) && Object.keys(o).length > 3 ? Object.entries(o).map(([k, x]) => ({ key: k, ...x })) : null) : null
        rows = firstArr(v); if (!rows || !rows.length) return ''
        if (Array.isArray(rows[0])) cols = v.columns || rows[0].map((_, i) => i); else cols = [...new Set(rows.slice(0, 50).flatMap(r => Object.keys(r)))]
        const cell = x => x === null || x === undefined ? '·' : typeof x === 'object' ? esc(JSON.stringify(x).slice(0, 120)) : esc(String(x).slice(0, 160))
        return `<p class="meta">${rows.length} rows${rows.length > 300 ? ' (the first 300 shown)' : ''}.</p><div class="wx-scroll" tabindex="0"><table class="ip-t"><thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(0, 300).map(r => `<tr>${(Array.isArray(r) ? r : cols.map(c => r[c])).map(x => `<td>${cell(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    }
    async function viewBrowser(root, base) {
        const files = (root.dataset.files || '').split(',').filter(Boolean)
        root.innerHTML = `<div class="ip-bar"><label>File <select class="ip-sel">${files.map(f => `<option>${esc(f)}</option>`).join('')}</select></label><span class="ip-seg" role="group" aria-label="How to show it"><button type="button" data-m="table" aria-pressed="true">Table</button><button type="button" data-m="schema" aria-pressed="false">Schema</button><button type="button" data-m="raw" aria-pressed="false">Raw</button></span><a class="ip-rawlink" href="#">open the file</a></div><div class="card ip-br"></div>`
        const out = root.querySelector('.ip-br'), sel = root.querySelector('.ip-sel'); let mode = 'table'
        const show = async () => {
            const u = base + sel.value; root.querySelector('.ip-rawlink').href = u
            out.innerHTML = '<p class="meta">Reading…</p>'
            try {
                const txt = await fetch(u, { cache: 'no-cache' }).then(r => r.text()), j = JSON.parse(txt)
                const head = `<p>${esc(j.about || '')}</p><p class="meta">${txt.length.toLocaleString('en')} bytes · kept by ${esc(j.by || '?')} · updated <time>${esc(dhm(j.updated))} UTC</time> ${j.from ? '· made from: ' + j.from.map(s => `<a href="${esc(s.url)}" rel="external" class="ip-out">${esc(s.url.split('/').pop())}</a> (read ${esc(hm(s.read_utc))}, sha256 ${esc(String(s.sha256).slice(0, 10))}…)`).join(', ') : ''}</p>`
                out.innerHTML = head + (mode === 'schema' ? `<pre class="ip-pre">${esc(schema(j))}</pre>` : mode === 'raw' ? `<pre class="ip-pre">${esc(txt.length > 60000 ? txt.slice(0, 60000) + '\n… (the first 60,000 characters; open the file for the rest)' : (txt.includes('\n ') ? txt : JSON.stringify(j, null, 1).slice(0, 60000)))}</pre>` : tableOf(j) || `<pre class="ip-pre">${esc(schema(j))}</pre>`)
            } catch (e) { out.innerHTML = `<p>Could not read ${esc(u)}: ${esc(e.message)}</p>` }
        }
        sel.addEventListener('change', show)
        root.addEventListener('click', e => { const b = e.target.closest('[data-m]'); if (!b) return; mode = b.dataset.m; root.querySelectorAll('[data-m]').forEach(x => x.setAttribute('aria-pressed', x === b)); show() })
        if (location.hash.length > 1 && files.includes(decodeURIComponent(location.hash.slice(1)))) sel.value = decodeURIComponent(location.hash.slice(1))
        show()
    }

    const VIEWS = { map: viewMap, warnings: viewWarnings, api: viewApi, browser: viewBrowser }
    const start = () => document.querySelectorAll('.ipma[data-view]').forEach(root => { const f = VIEWS[root.dataset.view] || window.IPMA_VIEWS?.[root.dataset.view]; if (f && !root.dataset.mounted) { root.dataset.mounted = '1'; f(root, root.dataset.base || './', { J, esc, dhm, hm, prov, panel, el, spark, ms, TYPE_EN, DIR, BOX, LV }).catch(e => { root.innerHTML = `<p class="meta">This view could not be drawn (${esc(e.message)}). The data is in <a href="${esc(root.dataset.base || './')}data.html">the files</a>.</p>` }) } })
    window.IPMA_START = start   // ipma-more.js registers its views after this file has run, then calls this
    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start()
})()
