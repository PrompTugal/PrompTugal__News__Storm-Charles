// The MeteoAlarm feed browser: our dated copy of a country's feed as a readable table, with its schema, what changed
// between our reads, and the raw files one click away. Reads only this site's JSON (sources/meteoalarm/data/<country>/);
// it fetches nothing from MeteoAlarm (the feed sends no cross-origin header, and the site fetches nothing external).
// Kept by incident.sources@web-summit.dinis. No dependencies.
(() => {
    const root = document.getElementById('src-meteoalarm'); if (!root) return
    const dir = root.dataset.dir || 'data/portugal/'
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const t = s => s ? `<time datetime="${esc(s)}">${esc(s.slice(8, 10))} ${MON[+s.slice(5, 7) - 1] || ''} ${esc(s.slice(11, 16))}</time>` : ''
    const lvl = l => l ? `<span class="lvl ${esc(l)}">${esc(l)}</span>` : ''
    const j = f => fetch(dir + f, { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error(f + ': ' + r.status); return r.json() })
    const st = { area: '', hazard: '', level: '', live: true, q: '', open: null }

    Promise.all([j('latest.json'), j('reads.json').catch(() => ({ reads: [] }))]).then(([L, R]) => {
        const M = L.messages, byId = new Map(M.map(m => [m.id, m]))
        const uniq = k => [...new Set(M.map(m => m[k]).filter(Boolean))].sort((a, b) => a.localeCompare(b))
        const now = new Date().toISOString()
        const sel = (k, label) => `<label>${label}<select data-k="${k}"><option value="">all</option>${uniq(k).map(v => `<option>${esc(v)}</option>`).join('')}</select></label>`
        root.innerHTML = `<div class="src-browser">
<div class="wx-tiles">
 <div class="wx-tile"><p class="meta">Messages in the feed</p><p class="wx-big"><b>${M.length}</b></p><p class="meta">${L.counts.not_yet_expired} not yet expired when read; red ${L.counts.by_level.red || 0}, orange ${L.counts.by_level.orange || 0}, yellow ${L.counts.by_level.yellow || 0}</p></div>
 <div class="wx-tile"><p class="meta">Our copy was read</p><p class="wx-big mono"><b>${t(L.read_utc)} UTC</b></p><p class="meta">a dated record, not a live feed; ${R.reads.length} read${R.reads.length === 1 ? '' : 's'} kept</p></div>
 <div class="wx-tile"><p class="meta">The bytes we received</p><p class="mono" title="${esc(L.sha256)}">sha256 ${esc(L.sha256.slice(0, 16))}…</p><p class="meta">${L.bytes.toLocaleString('en')} bytes · sent between ${t(L.counts.oldest_sent_utc)} and ${t(L.counts.newest_sent_utc)}</p></div>
</div>
<p class="meta"><span class="lbl l-fact">fact</span> Warnings issued by <b>IPMA</b> (Instituto Português do Mar e da Atmosfera), carried by <a class="out" href="https://www.meteoalarm.org">MeteoAlarm</a> (EUMETNET). ${esc(L.disclaimer)} <span class="prov">source: <a class="out" href="${esc(L.source)}">the feed</a>, read ${t(L.read_utc)} UTC</span></p>
<div class="bar">${sel('area', 'Area')}${sel('hazard', 'Hazard')}${sel('level', 'Level')}<label>Search<input type="search" placeholder="text, id" data-k="q"></label><label class="chk"><input type="checkbox" data-k="live" checked> only not yet expired</label><span class="meta" id="src-n"></span></div>
<div class="wx-scroll tbl" tabindex="0"><table><thead><tr><th>Sent by IPMA (UTC)</th><th>Type</th><th>Area</th><th>Warning</th><th>From (UTC)</th><th>To (UTC)</th><th>Replaces</th></tr></thead><tbody id="src-rows"></tbody></table></div>
<div class="card"><h2>What changed between our reads</h2><ul class="reads" id="src-reads"></ul><div id="src-diff"></div></div>
<div class="card"><h2>The schema</h2><p class="meta">One line per CAP message. The fields of our compact table (<a href="${dir}latest.json">latest.json</a>):</p><div class="wx-scroll" tabindex="0"><table><thead><tr><th>Field</th><th>What it is</th></tr></thead><tbody>${Object.entries(L.fields).map(([k, v]) => `<tr><td class="mono">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</tbody></table></div><p class="meta">The feed's own shape, and everything else MeteoAlarm publishes: <a href="api-map.html">the API map</a>.</p></div>
<div class="card"><h2>The raw files</h2><ul><li><a href="${dir}latest.json">latest.json</a>: this table as JSON (ours, in git, ${M.length} lines)</li><li><a href="${dir}reads.json">reads.json</a>: every read, its sha256 and what changed</li><li><a href="dataset.json">dataset.json</a>: where the full bytes of each read are kept (a data vault), with their hashes</li><li><a class="out" href="${esc(L.source)}">the feed itself, now</a> (leaves this site; it will differ from our copy)</li><li><a class="out" href="${esc(L.atom)}">its Atom twin</a> (leaves this site)</li></ul></div>
</div>`
        const rows = root.querySelector('#src-rows'), n = root.querySelector('#src-n')
        const draw = () => {
            const q = st.q.toLowerCase()
            const list = M.filter(m => (!st.area || m.area === st.area) && (!st.hazard || m.hazard === st.hazard) && (!st.level || m.level === st.level) && (!st.live || m.expires_utc > now) && (!q || JSON.stringify(m).toLowerCase().includes(q))).slice().reverse()
            n.textContent = `${list.length} of ${M.length} shown, newest sent first`
            rows.innerHTML = list.map(m => {
                const rep = (m.replaces || []).map(r => byId.has(r.id) ? `<a href="#m-${esc(r.id)}" data-go="${esc(r.id)}">sent ${t(r.sent_utc)}</a>` : `<span title="${esc(r.id)}">sent ${t(r.sent_utc)} (no longer in the feed)</span>`).join(', ')
                let h = `<tr class="m${m.expires_utc <= now ? ' past' : ''}${st.open === m.id ? ' open' : ''}" id="m-${esc(m.id)}" data-id="${esc(m.id)}" tabindex="0"><td class="t">${t(m.sent_utc)}</td><td>${esc(m.msg_type)}</td><td>${esc(m.area)}</td><td>${lvl(m.level)} ${esc(m.hazard || m.event)}</td><td class="t">${t(m.onset_utc)}</td><td class="t">${t(m.expires_utc)}</td><td>${rep}</td></tr>`
                if (st.open === m.id) h += `<tr class="detail"><td colspan="7"><dl><dt>IPMA's words</dt><dd>${esc(m.text)}</dd><dt>Event</dt><dd>${esc(m.event)} · ${esc(m.event_national)}</dd><dt>Issued by</dt><dd>${esc(m.sender)}</dd><dt>CAP</dt><dd>severity ${esc(m.severity)}, certainty ${esc(m.certainty)}, urgency ${esc(m.urgency)}</dd><dt>Identifier</dt><dd class="mono">${esc(m.id)}</dd><dt>MeteoAlarm region</dt><dd class="mono">${esc(m.emma)}</dd><dt>This message as CAP XML</dt><dd><a class="out" href="${esc(L.source)}/${esc(m.uuid)}">at MeteoAlarm</a> (leaves this site)</dd><dt>Hash of the message</dt><dd class="mono">${esc(m.h)}</dd></dl></td></tr>`
                return h
            }).join('') || '<tr><td colspan="7" class="meta">Nothing matches.</td></tr>'
        }
        root.addEventListener('input', e => { const k = e.target.dataset.k; if (!k) return; st[k] = e.target.type === 'checkbox' ? e.target.checked : e.target.value; draw() })
        const toggle = id => { st.open = st.open === id ? null : id; draw() }
        rows.addEventListener('click', e => {
            const go = e.target.closest('[data-go]')
            if (go) { e.preventDefault(); st.live = false; root.querySelector('[data-k=live]').checked = false; st.open = go.dataset.go; draw(); document.getElementById('m-' + go.dataset.go)?.scrollIntoView({ block: 'center' }); return }
            if (e.target.closest('a')) return
            const tr = e.target.closest('tr.m'); if (tr) toggle(tr.dataset.id)
        })
        rows.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('tr.m')) toggle(e.target.dataset.id) })
        draw()

        const reads = root.querySelector('#src-reads'), box = root.querySelector('#src-diff')
        reads.innerHTML = R.reads.slice().reverse().slice(0, 60).map(r => {
            const c = r.changes
            const what = r.note ? esc(r.note) : r.same_bytes_as_previous ? 'the same bytes as the read before' : c ? `appeared ${c.appeared}, replaced ${c.replaced}, left ${c.left}, expired while listed ${c.expired_in_feed}` : ''
            return `<li><span class="mono">${t(r.read_utc)}</span> · ${r.messages} messages · <span class="mono" title="${esc(r.sha256)}">${esc(r.sha256.slice(0, 12))}…</span> · ${what}${r.diff ? ` <button type="button" data-diff="${esc(r.diff)}">show</button>` : ''}</li>`
        }).join('') || '<li class="meta">No reads yet.</li>'
        const line = m => `${lvl(m.level)} ${esc(m.hazard)}, ${esc(m.area)}, ${t(m.onset_utc)} to ${t(m.expires_utc)} <span class="prov">sent ${t(m.sent_utc)}</span>`
        reads.addEventListener('click', e => {
            const b = e.target.closest('[data-diff]'); if (!b) return
            j(b.dataset.diff).then(d => {
                const sec = (title, arr, f) => arr.length ? `<h3>${title} (${arr.length})</h3><ul>${arr.map(x => `<li>${f(x)}</li>`).join('')}</ul>` : ''
                box.innerHTML = `<p class="meta">Between our reads of ${t(d.from_read_utc)} and ${t(d.to_read_utc)} UTC. <a href="${dir}${esc(b.dataset.diff)}">This diff as JSON</a>.</p>` +
                    sec('Appeared', d.appeared, line) +
                    sec('Replaced an earlier message', d.replaced, x => line(x) + (x.was && x.was.id ? `<br><span class="meta">was: ${line(x.was)}${x.level_changed ? ` · level ${esc(x.level_changed)}` : ''}${x.hours_changed ? ' · hours changed' : ''}${!x.level_changed && !x.hours_changed ? ' · same level and hours' + (x.text_changed ? ', text changed' : '') : ''}</span>` : `<br><span class="meta">${esc(x.was)}</span>`)) +
                    sec('Left the feed', d.left, x => line(x) + ` <span class="meta">(${esc(x.why)})</span>`) +
                    sec('Passed their expiry, still listed', d.expired_in_feed, line) +
                    sec('Changed in place', d.changed_in_place, line)
            }).catch(err => { box.innerHTML = `<p class="meta">Could not read the diff: ${esc(err.message)}</p>` })
        })
    }).catch(e => { root.innerHTML = `<p class="meta">Could not read our copy of the feed (${esc(e.message)}). The files: <a href="${dir}latest.json">latest.json</a>.</p>` })
})()
