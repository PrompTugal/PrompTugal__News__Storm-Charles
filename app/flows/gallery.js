// Flows: the gallery at /flows/ (incident.motion@web-summit.dinis, 11 November 2026). Reads data/flows/index.json and puts a
// player for each flow in the page's mount, with the one line that embeds it. Experiments, labelled.
(function () {
    'use strict'
    const host = document.querySelector('[data-flows-gallery]'); if (!host) return
    const root = host.dataset.root || '../'
    const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
    const SITE = 'https://storm-charles.promptugal.news/'
    const KIND = { wake: 'A wake', handover: 'A hand-over', night: 'Over the night', path: 'A path, told by incident.storyteller@', trace: 'A trace, kept by incident.reporter@' }
    fetch(root + 'data/flows/index.json', { cache: 'no-cache' }).then(r => r.json()).then(ix => {
        const order = ['wake', 'handover', 'night', 'path', 'trace']
        const list = ix.flows.slice().sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind))
        host.innerHTML = `<p class="meta">${list.length} flows, built ${esc(String(ix.updated || '').slice(0, 16).replace('T', ' '))} UTC from the record (the latest commit read). ${ix.problems && ix.problems.length ? `<b>${ix.problems.length} problem(s)</b> in the build: ${esc(ix.problems.slice(0, 3).join('; '))}` : 'Every step carries its evidence.'}</p><div class="fl-gallery"></div>`
        const g = host.querySelector('.fl-gallery')
        for (const f of list) {
            const card = document.createElement('section'); card.className = 'fl-card'; card.id = f.id
            card.innerHTML = `<h3><a href="#${esc(f.id)}">${esc(KIND[f.kind] || f.kind)}</a></h3><div data-flow="${esc(f.id)}" data-flow-autoplay="0"></div><p class="fl-embed">Embed: <code>&lt;iframe src="${SITE}${esc(f.embed)}" width="640" height="440"&gt;&lt;/iframe&gt;</code> · <a href="${root}${esc(f.embed)}">open alone</a> · <a href="${root}${esc(f.url)}">JSON</a></p>`
            g.appendChild(card)
        }
        if (window.FlowsPlayer) window.FlowsPlayer.scan()
    }).catch(e => { host.innerHTML = `<p class="meta">The flows could not be read: ${esc(e.message)}. They are at <a href="${root}data/flows/index.json">data/flows/index.json</a>.</p>` })
    // the browser API: any agent, any wake, here
    const form = document.querySelector('[data-flows-ask]')
    if (form) form.addEventListener('submit', e => {
        e.preventDefault()
        const fd = new FormData(form), out = document.querySelector('[data-flows-asked]')
        const d = document.createElement('div'); d.dataset.flowKind = fd.get('kind'); d.dataset.flowAgent = fd.get('agent'); if (fd.get('at')) d.dataset.flowAt = fd.get('at'); if (fd.get('n')) d.dataset.flowN = fd.get('n')
        out.innerHTML = ''; out.appendChild(d)
        const qs = new URLSearchParams([...fd].filter(([, v]) => v)).toString()
        const p = document.createElement('p'); p.className = 'fl-embed'; p.innerHTML = `Embed: <code>&lt;iframe src="${SITE}app/flows/embed.html?${esc(qs)}" width="640" height="440"&gt;&lt;/iframe&gt;</code>`; out.appendChild(p)
        window.FlowsPlayer && window.FlowsPlayer.mount(d)
    })
})()
