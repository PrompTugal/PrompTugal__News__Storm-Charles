// Page views and reads for storm-charles.promptugal.news (incident.observability@web-summit.dinis, 10 November 2026; the
// city and country added 11 November 2026 at Dinis Cruz's word of ~09:47 UTC, BRIEF.md last section).
// The model is promptugal.news's assets/obs/obs.js (observability@PrompTugal.dinis, after the team site's obs-dinis.js and
// Jose's telemetry.js).
// Two events per page load:  view  when the page loads;  read  the first time the tab is hidden or closed (seconds visible,
// deepest scroll in percent). Each says: the page, the referring site (host only), the time to the minute, the site version,
// a random id that ends with the tab, the screen size class, the browser's language and time zone, an automation class if a
// bot declares itself, a link tag (?via=) if the link carried one, and the country and city.
// The place: ONE request per tab session (not per page), from the live host only, after the page has loaded, to GeoJS
// (GEO below; https://www.geojs.io/tos/). GeoJS sees the reader's IP address to answer, as any site the browser asks does.
// Of its answer this script keeps two fields, the country code and the city name, for this tab only (sessionStorage), and
// drops the rest at once: the IP address, coordinates, region, time zone, network and provider are never stored, sealed,
// logged or sent on. If the lookup fails or is slow, the event goes without a place, and it is not asked again in that tab.
// No cookie, no user-agent string, no fingerprint. Sealed in the browser to the drain's public key (RSA-OAEP-SHA256 +
// AES-256-GCM, sgit's hybrid envelope v2) and appended to a write-only lane. Do Not Track, Global Privacy Control and the
// footer's Pause switch stop everything, the lookup included. It does nothing at all until data/agents/obs.json says
// "enabled": true, and asks no place unless it also says geo.enabled. Never blocks, never shows an error.
(() => {
    'use strict'
    try {
        const nav = navigator
        const dnt = nav.doNotTrack === '1' || window.doNotTrack === '1' || nav.globalPrivacyControl === true
        const LS = { get: k => { try { return localStorage.getItem('sc.obs.' + k) } catch { return null } }, set: (k, v) => { try { v === null ? localStorage.removeItem('sc.obs.' + k) : localStorage.setItem('sc.obs.' + k, v) } catch { } } }
        const SS = { get: k => { try { return sessionStorage.getItem('sc.obs.' + k) } catch { return null } }, set: (k, v) => { try { sessionStorage.setItem('sc.obs.' + k, v) } catch { } }, del: k => { try { sessionStorage.removeItem('sc.obs.' + k) } catch { } } }
        const paused = () => LS.get('off') === '1'
        const script = document.currentScript, root = script ? new URL('../../', script.src).href : '/'
        let cfgP = null
        const cfg = () => cfgP || (cfgP = fetch(root + 'data/agents/obs.json', { cache: 'no-cache' }).then(r => r.json()))
        const LIVE = 'storm-charles.promptugal.news'   // never from a local build, a preview or the gate's build
        const GEO = 'https://get.geojs.io/v1/ip/geo.json'   // fixed here, never from configuration: no other host is asked
        const on = c => location.host === LIVE && !!(c && c.enabled && c.endpoint && c.vault_id && c.lanes && c.lanes.site && c.lanes.site.length && c.recipient && c.recipient.encrypt)

        // the disclosure and the pause switch, in the footer of every page, only while counting is on
        const footer = c => {
            const row = document.querySelector('footer.agent .wrap'); if (!row || row.querySelector('.obs-note')) return
            const s = document.createElement('span'); s.className = 'obs-note'
            const a = document.createElement('a'); a.href = root + 'app/agents/about.html#page-views'; a.textContent = 'what is counted'
            if (dnt) { s.append(' · Page views: off (Do Not Track or Global Privacy Control is on). ', a); row.appendChild(s); return }
            const b = document.createElement('button'); b.type = 'button'; b.style.cssText = 'font:inherit;background:none;border:0;padding:0;text-decoration:underline;cursor:pointer;color:inherit'
            const t = document.createTextNode('')
            const geo = !!(c.geo && c.geo.enabled)
            const draw = () => { t.textContent = paused() ? ' · Page views: paused on this device (nothing is sent or looked up). ' : ' · This page counts its views: opening and leaving it each send one event (the page, the site you came from, the minute, a random id that ends with this tab, screen size class, language, time zone' + (geo ? ', your country and city' : '') + '), sealed in your browser.' + (geo ? ' To find the country and city, your browser asks GeoJS (get.geojs.io) once per tab, so GeoJS sees your IP address; we keep only the country and city, never the IP address.' : ' No IP address, no place lookup.') + ' No cookie. Only totals are published. '; b.textContent = paused() ? 'Resume' : 'Pause' }
            b.onclick = () => { LS.set('off', paused() ? null : '1'); draw() }
            const n = document.createElement('a'); n.href = root + 'agents/index.html#views'; n.textContent = 'the counts'
            s.append(t, b, ' · ', n, ' · ', a); draw(); row.appendChild(s)
        }
        cfg().then(c => { if (!on(c)) return; const f = () => { try { footer(c) } catch { } }; if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f); else f() }).catch(() => { })
        if (dnt || paused()) return

        let sid = SS.get('sid'); if (!sid) { sid = [...crypto.getRandomValues(new Uint8Array(4))].map(x => x.toString(16).padStart(2, '0')).join(''); SS.set('sid', sid) }
        const path = location.pathname, done = new Set()
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
        // automation by class only, never the user-agent string itself
        const ua = nav.userAgent || ''
        const agent = nav.webdriver ? 'webdriver' : /HeadlessChrome|PhantomJS/.test(ua) ? 'headless' : /Googlebot/i.test(ua) ? 'googlebot' : /bingbot/i.test(ua) ? 'bingbot' : /bot|crawl|spider|slurp/i.test(ua) ? 'bot' : ''
        const w = window.innerWidth || 1024
        let ref = ''; try { ref = document.referrer ? new URL(document.referrer).host : '' } catch { }
        const tagOf = () => { try { const q = new URLSearchParams(location.search); const t = q.get('via') || q.get('utm_campaign') || q.get('utm_source') || ''; return /^[A-Za-z0-9._-]{1,40}$/.test(t) ? t.toLowerCase() : '' } catch { return '' } }
        let via = tagOf(); if (via) SS.set('via', via); else via = SS.get('via') || ''
        // the place: once per tab session, after load, live host only; only the country code and city name are kept
        const PL = /^[\p{L}\p{M}0-9 .'\u2019()-]{1,60}$/u
        let place = null; try { place = JSON.parse(SS.get('place') || 'null') } catch { }
        const lookup = async c => {
            if (place || SS.get('place') !== null || !(c.geo && c.geo.enabled) || paused()) return
            SS.set('place', '{}')                                            // asked once per tab, answered or not
            const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 2500)
            try {
                const r = await fetch(GEO, { credentials: 'omit', referrerPolicy: 'no-referrer', cache: 'no-store', mode: 'cors', signal: ctl.signal })
                if (!r.ok) return
                const j = await r.json(), cc = String(j.country_code || '').toUpperCase(), city = String(j.city || '').trim().slice(0, 60)
                place = {}; if (/^[A-Z]{2}$/.test(cc) && cc !== 'XX') { place.country = cc; if (PL.test(city)) place.city = city }
                SS.set('place', JSON.stringify(place))                          // the rest of the answer is not kept
            } catch { } finally { clearTimeout(timer) }
        }
        let ver = ''; fetch(root + 'version.json', { cache: 'no-cache' }).then(r => r.json()).then(j => { ver = String(j.version || '').slice(0, 20) }).catch(() => { })
        const common = () => {
            const e = { v: 1, src: 'storm-charles', site: location.host, ver, ts: new Date().toISOString().slice(0, 16) + 'Z', sid, path, ref, lang: nav.language || '',
                screen: w < 600 ? 'phone' : w < 1000 ? 'tablet' : 'desktop', tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || '') }
            if (agent) e.agent = agent
            if (via) e.via = via
            if (place && place.country) { e.country = place.country; if (place.city) e.city = place.city }
            return e
        }
        let visibleMs = 0, since = document.visibilityState === 'visible' ? performance.now() : null, maxScroll = 0
        const scrolled = () => { const h = document.documentElement, top = window.scrollY || h.scrollTop, all = Math.max(1, h.scrollHeight - window.innerHeight); maxScroll = Math.max(maxScroll, Math.min(100, Math.round(100 * top / all))) }
        window.addEventListener('scroll', scrolled, { passive: true })
        const send = async ev => {
            if (paused()) return false
            const c = await cfg(); if (!on(c)) return false
            const payload = await seal(c.recipient.encrypt, JSON.stringify(ev))
            const L = c.lanes.site, start = Math.floor(Math.random() * L.length)   // a random first lane spreads the load
            for (const token of L.map((_, i) => L[(start + i) % L.length])) {
                const r = await fetch(`${c.endpoint}/api/vault/append/write/${c.vault_id}`, { method: 'POST', keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer',
                    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ append_token: token, payload }) })
                if (r.status !== 507) return r.ok   // 507: that lane is full, try the next
            }
            return false
        }
        const resend = () => { try { for (const k of Object.keys(sessionStorage).filter(k => k.startsWith('sc.obs.pending.'))) { const ev = JSON.parse(sessionStorage.getItem(k)); sessionStorage.removeItem(k); send(ev).catch(() => { }) } } catch { } }
        const view = async () => {
            resend(); if (done.has('view')) return; done.add('view')
            try { const c = await cfg(); if (on(c)) await lookup(c) } catch { }  // waits at most 2.5 s, once per tab
            send(Object.assign(common(), { type: 'view' })).catch(() => { })
        }
        const finish = () => {
            if (since !== null) { visibleMs += performance.now() - since; since = null }
            if (done.has('read')) return
            scrolled(); done.add('read')
            const ev = Object.assign(common(), { type: 'read', visible_s: Math.min(3600, Math.round(visibleMs / 1000)), scroll: maxScroll })
            const key = 'pending.' + ev.path + '.' + Date.now()
            SS.set(key, JSON.stringify(ev))                                   // kept until written: leaving can cut the send short
            send(ev).then(ok => { if (ok) SS.del(key) }).catch(() => { })
        }
        document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') since = performance.now(); else finish() })
        window.addEventListener('pagehide', finish)
        if (document.readyState === 'complete') setTimeout(view, 0); else window.addEventListener('load', view)
    } catch { }
})()
