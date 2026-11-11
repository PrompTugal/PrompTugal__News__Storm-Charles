/**
 * account.js: the page at /account/ (incident.identity@; the design is /SECURITY.md).
 * Three states: no key in this browser (make one), a key that is locked (unlock), unlocked (the public half to hand to
 * the conductor, the conductor's replies opened here, lock, forget). The feedback box is feedback.js, on this page too.
 */
import * as ID from './id.js'
import * as LANE from './lane.js'
import { el, css, say, act, copy } from './dom.js'

css()
// the reader's theme, as the site's frame applies it (this page allows no inline script, so it is done here)
try { const t = localStorage.getItem('theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t } catch (e) { }
const root = document.getElementById('account')
const status = el('p', { class: 'sc-status', role: 'status' })
const utc = iso => el('time', { datetime: iso }, String(iso).slice(0, 16).replace('T', ' ') + ' UTC')
const btn = (label, cls, fn) => { const b = el('button', { class: 'sc-btn' + (cls ? ' ' + cls : ''), type: 'button' }, label); b.addEventListener('click', act(b, status, fn)); return b }

function make() {
    const label = el('input', { type: 'text', value: 'Dinis Cruz', id: 'sc-label', maxlength: '64' })
    const p1 = el('input', { type: 'password', id: 'sc-p1', autocomplete: 'new-password' }), p2 = el('input', { type: 'password', id: 'sc-p2', autocomplete: 'new-password' })
    const slow = 'Making the key (RSA 4096: a few seconds)…'
    return el('section', { class: 'card' },
        el('h2', {}, 'Make your key in this browser'),
        el('p', { class: 'meta' }, 'Two key pairs are made here (RSA-OAEP 4096 to seal to you, ECDSA P-256 to sign). The private halves stay in this browser, encrypted; only the public halves leave it.'),
        el('label', { for: 'sc-label' }, 'The name on the key (public)'), label,
        ID.passkeyPossible() && el('div', { class: 'sc-row' }, btn('Make it behind a passkey', 'primary', async () => { say(status, 'Your passkey, then: ' + slow); await ID.createWithPasskey(label.value.trim()); return 'Made. Read the fingerprint to the conductor in your session.' })),
        el('h2', {}, 'Or behind a passphrase'),
        el('p', { class: 'meta' }, 'For a browser whose passkeys give no PRF bytes. Twelve characters or more; it is not kept and cannot be recovered.'),
        el('label', { for: 'sc-p1' }, 'Passphrase'), p1, el('label', { for: 'sc-p2' }, 'Again'), p2,
        el('div', { class: 'sc-row' }, btn('Make it behind this passphrase', '', async () => { if (p1.value !== p2.value) throw new Error('the two passphrases differ'); say(status, slow); await ID.createWithPassphrase(label.value.trim(), p1.value); return 'Made. Read the fingerprint to the conductor in your session.' })))
}

function locked(h) {
    const pass = el('input', { type: 'password', id: 'sc-pass', autocomplete: 'current-password' })
    return el('section', { class: 'card' },
        el('h2', {}, 'Your key is in this browser, locked'),
        el('p', { class: 'meta' }, h.label, ' · made ', utc(new Date(h.created).toISOString()), ' · behind a ', h.mode),
        el('p', { class: 'fp' }, h.signing_fingerprint),
        h.mode === 'passphrase' && [el('label', { for: 'sc-pass' }, 'Passphrase'), pass],
        el('div', { class: 'sc-row' }, btn(h.mode === 'passkey' ? 'Unlock with your passkey' : 'Unlock', 'primary', async () => { await ID.unlock(pass.value); return 'Unlocked, for this page.' }), forgetBtn()))
}

const forgetBtn = () => btn('Forget this key', 'danger', async () => {
    if (!confirm('Remove the key from this browser? There is no other copy: what was sealed to it can no longer be opened.')) return ''
    ID.forget(); return 'Removed from this browser. Tell the conductor, so the key is marked revoked.'
})

function unlocked(id) {
    const b = id.bundle, pub = JSON.stringify(b, null, 2)
    const bundle = el('textarea', { class: 'code', readonly: true, id: 'sc-bundle' }); bundle.value = pub
    const inboxList = el('div', { id: 'sc-inbox' }, el('p', { class: 'meta' }, 'Reading…'))
    const paste = el('textarea', { class: 'code', id: 'sc-paste', placeholder: 'm1.…' })
    const pasted = el('div', {})
    const show = m => el('div', { class: 'msg' },
        el('span', { class: 'sc-tag ' + (m.verified === true ? 'ok' : 'bad') }, m.verified === true ? 'signature checked' : m.verified === false ? 'signature does not check' : 'signer not in data/keys.json'),
        ' ', el('strong', {}, m.from), ' · ', utc(m.at), m.subject && el('p', {}, el('strong', {}, m.subject)), el('p', {}, m.text),
        m.problems.length ? el('p', { class: 'sc-status bad' }, m.problems.join('; ')) : null)
    ;(async () => {
        const c = await LANE.config(), codes = await LANE.inbox(), out = []
        for (const m of codes) { try { out.push(show(await LANE.open(id, m.code, c))) } catch (e) { /* sealed to another key (an older one): not shown */ } }
        inboxList.replaceChildren(...(out.length ? out.reverse() : [el('p', { class: 'meta' }, codes.length ? 'Nothing here is sealed to this key.' : 'Nothing yet.')]))
    })().catch(e => inboxList.replaceChildren(el('p', { class: 'sc-status bad' }, e.message)))
    return [
        el('section', { class: 'card' },
            el('h2', {}, 'Your key, unlocked for this page'),
            el('p', { class: 'meta' }, b.label, ' · the fingerprint to read to the conductor (the record):'),
            el('p', { class: 'fp', id: 'sc-fp' }, b.signing_fingerprint),
            el('p', { class: 'meta' }, 'Encryption key ', el('code', {}, b.fingerprint), '. The public half, for ', el('code', {}, 'data/keys.json'), ' (not secret: paste it to the conductor):'),
            bundle,
            el('div', { class: 'sc-row' }, btn('Copy the public half', '', () => copy(pub)), btn('Copy as a key link (k1)', '', () => copy(LANE.keyCode(b))), btn('Lock', '', async () => { ID.lock(); return '' }), forgetBtn())),
        el('section', { class: 'card' },
            el('h2', {}, 'From the conductor'),
            el('p', { class: 'meta' }, 'Sealed to your key and opened here. From ', el('code', {}, 'account/inbox.json'), ' (ciphertext, public), or pasted:'),
            inboxList, el('label', { for: 'sc-paste' }, 'A sealed message'), paste,
            el('div', { class: 'sc-row' }, btn('Open', '', async () => { pasted.replaceChildren(show(await LANE.open(id, paste.value, await LANE.config()))); return '' })), pasted),
    ]
}

function draw() {
    const h = ID.hint(), id = ID.identity()
    root.replaceChildren(...[id ? unlocked(id) : h ? locked(h) : make()].flat(), status)
}
ID.onChange(draw); draw()
LANE.config().then(async c => {
    const L = c.lanes.to_conductor, to = await LANE.recipient(c)
    document.getElementById('account-lane').textContent = `Feedback is sealed to ${to.agent} (${to.bundle.signing_fingerprint}). ` + (L.enabled ? `The lane is open (vault ${L.vault_id}).` : 'There is no lane yet: the sealed text is shown for you to copy.') 
    document.getElementById('account-ver').textContent = c.version || 'version'
}).catch(e => { document.getElementById('account-lane').textContent = 'The lane could not be read: ' + e.message })
