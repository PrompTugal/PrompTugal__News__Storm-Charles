/**
 * feedback.js: the feedback box, on any page that loads it (incident.identity@; the design is /SECURITY.md, section b).
 *
 *     <script type="module" src="<root>/app/login/feedback.js"></script>
 *
 * It draws nothing unless this browser holds a key made at /account/ (so readers never see it). What Dinis writes, with
 * the page's URL and the site's version, is signed with his key and sealed in the browser to the conductor's public key
 * (data/keys.json), then appended to the lane (data/lanes.json); with no lane yet, the sealed text is shown to copy.
 * Sending asks for the passkey (or the passphrase) when the key is locked: unlocked, it stays in this page's memory only.
 */
import * as ID from './id.js'
import * as LANE from './lane.js'
import { el, css, say, act, copy } from './dom.js'

function mount() {
    if (!ID.hint() || document.querySelector('.sc-fb-btn')) return
    css()
    const open = el('button', { class: 'sc-fb-btn', type: 'button', onclick: () => { open.hidden = true; panel.hidden = false; text.focus() } }, 'Feedback to the conductor')
    const text = el('textarea', { placeholder: 'What should change on this page?', 'aria-label': 'Feedback' })
    const pass = el('input', { type: 'password', placeholder: 'Passphrase', 'aria-label': 'Passphrase', autocomplete: 'current-password' })
    const status = el('p', { class: 'sc-status', role: 'status' })
    const code = el('textarea', { class: 'code', readonly: true, hidden: true, 'aria-label': 'The sealed message' })
    const copyBtn = el('button', { class: 'sc-btn', type: 'button', hidden: true }, 'Copy the sealed text')
    copyBtn.addEventListener('click', act(copyBtn, status, () => copy(code.value)))
    const send = el('button', { class: 'sc-btn primary', type: 'button' }, 'Seal and send')
    send.addEventListener('click', act(send, status, async () => {
        say(status, 'Sealing…')
        const id = ID.identity() || await ID.unlock(pass.value)
        pass.value = ''; passRow.hidden = true
        const c = await LANE.config()
        const sealed = await LANE.sealFeedback({ identity: id, text: text.value, page: location.href, c })
        if (await LANE.deliver(c, sealed.enc)) { text.value = ''; code.hidden = copyBtn.hidden = true; return `Sent to ${sealed.to}, sealed (${sealed.chars} characters). It is read at the conductor's next wake.` }
        code.value = sealed.code; code.hidden = copyBtn.hidden = false
        return `Sealed to ${sealed.to}. There is no lane yet: copy the text below into your session with the conductor (it is ciphertext).`
    }))
    const passRow = el('div', { class: 'sc-row', hidden: !(ID.hint().mode === 'passphrase' && !ID.identity()) }, pass)
    const panel = el('div', { class: 'sc-fb', hidden: true, role: 'dialog', 'aria-label': 'Feedback to the conductor' },
        el('h2', {}, 'Feedback to the conductor'),
        el('p', { class: 'meta' }, 'On ', el('code', {}, location.pathname), '. Signed with your key ', el('code', {}, ID.hint().signing_fingerprint), ', sealed here; only the conductor can read it.'),
        text, passRow,
        el('div', { class: 'sc-row' }, send, el('button', { class: 'sc-btn', type: 'button', onclick: () => { panel.hidden = true; open.hidden = false } }, 'Close'),
            el('a', { href: new URL('../../account/index.html', import.meta.url).href }, 'Your account')),
        status, code, el('div', { class: 'sc-row' }, copyBtn))
    document.body.append(open, panel)
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount()
ID.onChange(() => { if (!ID.hint()) for (const n of document.querySelectorAll('.sc-fb-btn, .sc-fb')) n.remove(); else mount() })
