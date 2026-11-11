// desk.js: the Contact us form of storm-charles.promptugal.news (incident.desk@web-summit.dinis, 11 November 2026, at
// Dinis Cruz's word of ~11:45 UTC: BRIEF.md, last section; CLAUDE.md, "Contact desk").
// The visitor's message (and an optional reply address) is sealed HERE, in the browser, to the desk's public key
// (desk/lane.json: RSA-OAEP-SHA256 wraps a fresh AES-256-GCM key, sgit's hybrid envelope v2, as app/agents/obs.js) and
// appended to a write-only lane of the desk's vault. An append token can only write; nothing can be read back with it.
// Sent from the live host only (never from a local build, a preview or the gate's build). No cookie, no user-agent
// string, no IP address, no place lookup: the message holds only what the visitor typed, the kind they chose, the page
// they came from, the minute and the browser's language. Nothing is kept in this browser after sending.
(() => {
    'use strict'
    const mountEl = document.getElementById('desk-form'); if (!mountEl) return
    const base = mountEl.dataset.base || '../../'
    const LIVE = 'storm-charles.promptugal.news'
    const KINDS = [
        ['correction', 'A correction', 'Something on this site is wrong or out of date.'],
        ['collaborate', 'An offer to help or collaborate', 'Data, a source, a page about your organisation, working together.'],
        ['press', 'Press or media', 'A journalist, an editor, a broadcaster.'],
        ['other', 'Something else', ''],
    ]
    const h = (tag, attrs = {}, ...kids) => { const e = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (v === false || v == null) continue; if (k === 'text') e.textContent = v; else e.setAttribute(k, v === true ? '' : v) } for (const k of kids) e.append(k); return e }
    const b64 = bytes => { let s = ''; for (const x of new Uint8Array(bytes)) s += String.fromCharCode(x); return btoa(s) }
    const unpem = pem => Uint8Array.from(atob(pem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')), c => c.charCodeAt(0))
    async function seal(pem, text) {
        const S = crypto.subtle
        const pub = await S.importKey('spki', unpem(pem), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt'])
        const aes = await S.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt'])
        const iv = crypto.getRandomValues(new Uint8Array(12))
        const c = await S.encrypt({ name: 'AES-GCM', iv, tagLength: 128 }, aes, new TextEncoder().encode(text))
        const w = await S.encrypt({ name: 'RSA-OAEP' }, pub, await S.exportKey('raw', aes))
        return btoa(btoa(JSON.stringify({ v: 2, w: b64(w), i: b64(iv), c: b64(c) })))   // the lane takes base64 of the .enc text
    }
    // the page the visitor came from: ?from=<path> (the frame's link carries it) or a referrer on this same site; a path only
    const fromPage = () => {
        try { const q = new URLSearchParams(location.search).get('from') || ''; if (/^\/[A-Za-z0-9._~\/@%+#-]{0,200}$/.test(q)) return q } catch { }
        try { const r = new URL(document.referrer); if (r.host === location.host && !r.pathname.startsWith('/app/desk/')) return r.pathname + r.hash } catch { }
        return ''
    }

    const status = h('p', { class: 'desk-status', role: 'status', 'aria-live': 'polite' })
    const kindBox = h('fieldset', { class: 'desk-kinds' }, h('legend', { text: 'What is it about?' }))
    KINDS.forEach(([v, label, hint], i) => kindBox.append(h('label', {}, h('input', { type: 'radio', name: 'kind', value: v, checked: i === 0 || null }), ' ', h('b', { text: label }), hint ? h('span', { class: 'meta', text: ' ' + hint }) : '')))
    const about = h('input', { type: 'text', id: 'desk-about', maxlength: '300', value: fromPage(), placeholder: 'e.g. /incidents/2026-11-10-storm-charles/ or row s-1111T0930', autocomplete: 'off' })
    const text = h('textarea', { id: 'desk-text', rows: '8', maxlength: '4000', required: true, placeholder: 'For a correction: what is wrong, what is right, and where you read it (a link).' })
    const count = h('span', { class: 'meta desk-count', text: '0 / 4000' })
    text.addEventListener('input', () => { count.textContent = `${text.value.length} / 4000` })
    const reply = h('input', { type: 'text', id: 'desk-reply', maxlength: '200', autocomplete: 'email', placeholder: 'optional: an email address, only if you want an answer' })
    const trap = h('input', { type: 'text', name: 'website', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true' })   // left empty by people
    const send = h('button', { type: 'submit', class: 'desk-send', text: 'Seal and send' })
    const what = h('a', { href: '#what-happens-to-your-message', text: 'what happens to it' })
    const form = h('form', { class: 'desk card', novalidate: true },
        h('p', { class: 'desk-intro' }, h('b', { text: 'Write to the desk.' }), ' Your message is sealed in your browser and read only by the desk, the agent that answers for Dinis Cruz\'s incident team; it is never published. A person sends any reply. ', what, '.'),
        kindBox,
        h('label', { for: 'desk-about', class: 'desk-l' }, h('b', { text: 'Which page or item' }), h('span', { class: 'meta', text: ' (optional; filled in with the page you came from)' })), about,
        h('label', { for: 'desk-text', class: 'desk-l' }, h('b', { text: 'Your message' })), text, count,
        h('label', { for: 'desk-reply', class: 'desk-l' }, h('b', { text: 'Where to reply' }), h('span', { class: 'meta', text: ' (optional; sealed with your message, used only to answer it, never published or shared)' })), reply,
        h('div', { class: 'desk-trap', 'aria-hidden': 'true' }, h('label', { text: 'Leave this empty' }), trap),
        h('p', { class: 'desk-row' }, send, ' ', h('span', { class: 'meta', text: 'Not an emergency line: in an emergency call 112. For warnings follow IPMA and ANEPC.' })),
        status)
    mountEl.replaceChildren(form)

    let cfg = null
    const config = () => cfg || (cfg = fetch(base + 'desk/lane.json', { cache: 'no-cache' }).then(r => r.json()))
    const ready = c => !!(c && c.enabled && c.endpoint && c.vault_id && (c.lanes || []).length && c.recipient && c.recipient.encrypt)
    const say = (t, cls = '') => { status.textContent = t; status.className = 'desk-status ' + cls }
    if (location.host !== LIVE) { send.disabled = true; say(`This form sends only from ${LIVE}; this copy (${location.host || 'a file'}) is a preview, and nothing typed here goes anywhere.`, 'wait') }
    else config().then(c => { if (!ready(c)) { send.disabled = true; say('The desk is closed for now: nothing can be sent.', 'wait') } }).catch(() => { })

    form.addEventListener('submit', async ev => {
        ev.preventDefault()
        if (location.host !== LIVE || send.disabled) return
        const words = text.value.trim()
        if (words.length < 5) { say('Please write your message first.', 'bad'); text.focus(); return }
        if (trap.value) { say('Sent.', 'ok'); return }   // a robot filled the hidden field: nothing is sent
        send.disabled = true; say('Sealing in your browser…')
        try {
            const c = await config(); if (!ready(c)) throw new Error('closed')
            const kind = (form.querySelector('input[name=kind]:checked') || {}).value || 'other'
            const msg = { v: 1, src: 'storm-charles-desk', site: location.host, kind, about: about.value.trim().slice(0, 300), text: words.slice(0, c.max_chars || 4000),
                reply: reply.value.trim().slice(0, c.max_reply_chars || 200), ts: new Date().toISOString().slice(0, 16) + 'Z', lang: (navigator.language || '').slice(0, 20) }
            const payload = await seal(c.recipient.encrypt, JSON.stringify(msg))
            const L = c.lanes, start = Math.floor(Math.random() * L.length)
            let ok = false
            for (const token of L.map((_, i) => L[(start + i) % L.length])) {
                const r = await fetch(`${c.endpoint}/api/vault/append/write/${c.vault_id}`, { method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store',
                    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ append_token: token, payload }) })
                if (r.ok) { ok = true; break }
                if (r.status !== 507) break   // 507: that lane is full, try the next
            }
            if (!ok) throw new Error('not written')
            text.value = ''; reply.value = ''; count.textContent = '0 / 4000'
            say('Sent, sealed. Thank you. The desk reads its messages about once an hour; a person on the team answers if you left an address and an answer is needed. Your message is never published.', 'ok')
        } catch { say('It could not be sent just now (the vault server did not take it). Your words are still in the box: please try again in a few minutes.', 'bad') }
        finally { send.disabled = false }
    })
})()
