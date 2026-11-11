// The Studio's index (incident.studio@web-summit.dinis): draws each card's characters, and sends an older link
// (/studio/#<name>/<chapter>/<scene>, from before each explanation had its own page) to that explanation's page.
(function () {
    'use strict'
    const h = decodeURIComponent(location.hash.slice(1)).split('/')
    const card = h[0] && document.querySelector('.st-card[data-id="' + h[0].replace(/[^a-z0-9-]/g, '') + '"]')
    if (card) { location.replace(card.getAttribute('href') + (h[1] ? '#' + (+h[1] || 1) + '/' + (+h[2] || 1) : '')); return }
    if (!window.StudioCast) return
    for (const c of document.querySelectorAll('.st-card[data-cast]')) {
        const row = document.createElement('div'); row.className = 'st-cast'; row.setAttribute('aria-hidden', 'true')
        row.innerHTML = c.dataset.cast.split(',').map((w, i) => window.StudioCast.draw(w, i === 0 ? 'talk' : 'idle')).join('')
        c.insertBefore(row, c.firstChild)
    }
})()
