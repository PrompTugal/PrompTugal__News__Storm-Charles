// dom.js: the few DOM helpers the login pages share. Text only, never markup: nothing read from a message is parsed as HTML.
export function el(tag, attrs = {}, ...kids) {
    const e = document.createElement(tag)
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') e.className = v
        else if (k.startsWith('on')) e.addEventListener(k.slice(2), v)
        else if (v === true) e.setAttribute(k, '')
        else if (v !== false && v != null) e.setAttribute(k, v)
    }
    for (const k of kids.flat()) if (k != null && k !== false) e.append(k)
    return e
}
export const css = () => { if (!document.querySelector('link[data-sc-login]')) document.head.append(el('link', { rel: 'stylesheet', href: new URL('./login.css', import.meta.url).href, 'data-sc-login': true })) }
export const say = (node, text, kind = '') => { node.className = 'sc-status' + (kind ? ' ' + kind : ''); node.textContent = text }
/** Run an async action from a button: disabled while it runs, the error (or the result's words) shown in `status`. */
export const act = (button, status, fn) => async () => {
    button.disabled = true
    try { const out = await fn(); if (typeof out === 'string') say(status, out, 'ok') }
    catch (e) { say(status, e && e.name === 'NotAllowedError' ? 'The passkey was not used (cancelled, or not allowed here).' : (e && e.message) || String(e), 'bad') }
    finally { button.disabled = false }
}
export const copy = async text => { await navigator.clipboard.writeText(text); return 'Copied.' }
