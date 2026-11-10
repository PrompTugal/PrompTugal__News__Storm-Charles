/**
 * lane.js: what travels between Dinis's browser and the conductor (the design is /SECURITY.md, sections b and c).
 *
 *   feedback   pki/message.js compose (signed by his key; to = the conductor's signing fingerprint; expires) → sealMessage
 *              (sgit's hybrid v2 envelope, to the conductor's encryption key) → POST to an SG/Send append lane with a
 *              token that can only write (data/lanes.json: public on purpose). No lane yet: the caller shows the m1 code.
 *   replies    m1 codes sealed to his key (account/inbox.json, or pasted), opened with his unlocked key; the signature
 *              is checked against the public keys in data/keys.json.
 */
import * as K from './pki/keys.js'
import * as M from './pki/message.js'

const at = rel => new URL(rel, import.meta.url)
const json = async rel => { const r = await fetch(at(rel), { cache: 'no-cache' }); if (!r.ok) throw new Error(`${rel}: ${r.status}`); return r.json() }

let cfgP = null
/** { lanes, keys (data/keys.json's list), byFp (signing fingerprint → bundle), version }. */
export const config = () => cfgP || (cfgP = (async () => {
    const [lanes, keys, ver] = await Promise.all([json('../../data/lanes.json'), json('../../data/keys.json'), json('../../version.json').catch(() => ({}))])
    const byFp = new Map()
    for (const k of keys.keys || []) if (k.status === 'active' && k.bundle && k.bundle.signing_fingerprint) byFp.set(k.bundle.signing_fingerprint, { ...k.bundle, v: 1, label: k.agent || k.bundle.label })
    return { lanes, keys: keys.keys || [], byFp, version: ver.version || '' }
})())

/** The conductor's bundle, checked: both keys parse and both fingerprints are theirs. */
export async function recipient(c) {
    const k = c.keys.find(x => x.id === c.lanes.to_conductor.recipient && x.status === 'active')
    if (!k) throw new Error('data/lanes.json names a recipient that data/keys.json does not hold')
    const bundle = { ...k.bundle, v: 1 }
    const bad = await K.checkBundle(bundle); if (bad.length) throw new Error('the recipient key does not check: ' + bad.join('; '))
    return { bundle, agent: k.agent }
}

/** Seal feedback from an unlocked identity. Returns { enc, code, to, chars }. */
export async function sealFeedback({ identity, text, page, c }) {
    const L = c.lanes.to_conductor, to = await recipient(c)
    const body = String(text || '').trim()
    if (!body) throw new Error('nothing written')
    if (body.length > (L.max_chars || 4000)) throw new Error(`too long: ${body.length} characters (${L.max_chars || 4000} at most)`)
    const expires = new Date(Date.now() + (L.expires_days || 7) * 864e5).toISOString()
    const subject = `feedback: ${String(page || '').slice(0, 300)} (${c.version || 'version unknown'})`
    const msg = await M.compose({ to: to.bundle, from: identity, subject, text: body, expires })
    const { enc, code } = await M.sealMessage(msg, to.bundle, identity)
    return { enc, code, to: to.agent, chars: body.length }
}

/** Append to the lane. true when the server took it; false when there is no lane (the caller shows the code instead). */
export async function deliver(c, enc) {
    const L = c.lanes.to_conductor
    if (!L.enabled || !L.vault_id || !(L.tokens || []).length) return false
    const payload = btoa(enc), start = Math.floor(Math.random() * L.tokens.length)
    for (let i = 0; i < L.tokens.length; i++) {
        const r = await fetch(`${L.endpoint}/api/vault/append/write/${L.vault_id}`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ append_token: L.tokens[(start + i) % L.tokens.length], payload }) })
        if (r.status === 507) continue                                   // this lane is full: the next
        if (!r.ok) throw new Error(`the lane answered ${r.status}`)
        return true
    }
    throw new Error('every lane is full: tell the conductor in your session')
}

/** Open an m1 code sealed to this identity. { text, subject, at, from (label or fingerprint), verified, problems }. */
export async function open(identity, text, c) {
    const p = M.parseCode(text); if (!p) throw new Error('no sealed message (m1.…) in that text')
    const o = await M.openMessage(p.enc, [identity], c.byFp)
    const b = o.msg.from ? c.byFp.get(o.msg.from) : null
    return { text: o.msg.text, subject: o.msg.subject || '', at: o.msg.at || '', from: b ? b.label : (o.msg.from || 'unsigned'), verified: o.verified, problems: o.problems }
}

/** The replies kept in the repository as ciphertext: [{ at, code }]. */
export const inbox = () => json('../../account/inbox.json').then(j => j.messages || []).catch(() => [])
export const keyCode = bundle => M.keyCode(bundle).code
