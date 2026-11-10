/**
 * id.js: Dinis's key in this browser (incident.identity@web-summit.dinis; the design is /SECURITY.md, section a).
 *
 *   passkey ──PRF──▶ door seed (pki/door.js) ──▶ AES-256-GCM ──▶ localStorage (pki/local.js): the two private halves
 *   or, where the browser gives no PRF bytes:  passphrase ──PBES2 (pki/keys.js encryptPrivate)──▶ localStorage
 *
 * The private halves are made here (pki/keys.js generate) and never leave this browser. Unlocked, they are held in this
 * module's memory only, for this page, until it is closed or locked. What is stored in the clear is a hint: the label and
 * the two public fingerprints, so a page can say "locked" without a gesture.
 */
import * as K from './pki/keys.js'
import * as D from './pki/door.js'
import * as L from './pki/local.js'

const HINT = 'sc.id.hint.v1', PASS = 'sc.id.pass.v1'
const RP_NAME = 'storm-charles.promptugal.news'
const get = k => { try { return JSON.parse(localStorage.getItem(k) || 'null') } catch (e) { return null } }
const set = (k, v) => localStorage.setItem(k, JSON.stringify(v))

let current = null                                                    // the unlocked identity, in memory only
const listeners = new Set()
const changed = () => { for (const f of listeners) { try { f(current) } catch (e) { } } }
export const onChange = f => { listeners.add(f); return () => listeners.delete(f) }
export const identity = () => current
export const hint = () => get(HINT)
export const lock = () => { current = null; changed() }

export const passkeyPossible = () => !!(globalThis.PublicKeyCredential && navigator.credentials && navigator.credentials.create)

/** A new passkey for this site. Returns the PRF bytes if the authenticator gave them at creation, else null. */
async function makePasskey(name) {
    const n = String(name || '').trim().slice(0, 64)
    const c = await navigator.credentials.create({ publicKey: {
        challenge: crypto.getRandomValues(new Uint8Array(32)), rp: { id: location.hostname, name: RP_NAME },
        user: { id: crypto.getRandomValues(new Uint8Array(16)), name: n ? `${n} · ${RP_NAME}` : RP_NAME, displayName: n || RP_NAME },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
        extensions: { prf: { eval: { first: await D.sha256(D.PRF_INPUT_TEXT) } } }, timeout: 120000,
    } })
    const ext = c.getClientExtensionResults()
    return ext.prf && ext.prf.results && ext.prf.results.first ? new Uint8Array(ext.prf.results.first) : null
}
const doorOf = async bytes => D.doorFrom(bytes || (await D.prfBytes()).bytes)

const remember = (id, mode) => set(HINT, { v: 1, mode, label: id.bundle.label, fingerprint: id.bundle.fingerprint, signing_fingerprint: id.bundle.signing_fingerprint, created: id.created || Date.now() })

/** Make the key behind a new passkey. One gesture where the authenticator answers PRF at creation, two where it does not. */
export async function createWithPasskey(label) {
    if (hint()) throw new Error('this browser already holds a key: forget it first')
    const door = await doorOf(await makePasskey(label))
    const id = await K.generate(label)
    const account = L.empty(); account.profile.name = label
    account.keys.push(L.keptOf(id, { role: 'master' })); account.default = id.bundle.signing_fingerprint
    await L.write(door, account); await L.persist()
    remember(id, 'passkey'); current = id; changed()
    return id
}
/** Make the key behind a passphrase (for a browser whose passkeys give no PRF bytes). */
export async function createWithPassphrase(label, passphrase) {
    if (hint()) throw new Error('this browser already holds a key: forget it first')
    if (String(passphrase || '').length < 12) throw new Error('a passphrase of 12 characters or more')
    const id = await K.generate(label)
    set(PASS, { v: 1, label, created: id.created, private_key: await K.encryptPrivate(id.private.encrypt, passphrase), signing_private: await K.encryptPrivate(id.private.sign, passphrase) })
    await L.persist()
    remember(id, 'passphrase'); current = id; changed()
    return id
}
/** Unlock: the passkey's gesture, or the passphrase. The public halves are recomputed from the private ones. */
export async function unlock(passphrase = '') {
    const h = hint(); if (!h) throw new Error('this browser holds no key')
    let id
    if (h.mode === 'passkey') {
        const account = await L.read(await doorOf())
        if (!account || !account.keys.length) throw new Error('that passkey holds no key in this browser')
        id = await L.identityOf(account.keys[0])
    } else {
        const p = get(PASS); if (!p) throw new Error('the key is gone from this browser')
        id = await K.importKeystore({ privateKeyPem: p.private_key, signingPrivatePem: p.signing_private, passphrase, label: p.label, created: p.created })
    }
    if (id.bundle.signing_fingerprint !== h.signing_fingerprint) throw new Error('that is another key, not the one this browser showed')
    current = id; changed()
    return id
}
/** Remove the key from this browser. There is no copy anywhere else: this cannot be undone. */
export function forget() {
    current = null
    try { for (const k of Object.keys(localStorage)) if (k === HINT || k === PASS || k.startsWith(L.PREFIX)) localStorage.removeItem(k) } catch (e) { }
    changed()
}
