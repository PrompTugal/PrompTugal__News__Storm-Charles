// Stories (incident.stories@web-summit.dinis). The page is already complete HTML (tools/stories-build.mjs): this file only
// (1) works the switches, (2) opens every support at once, (3) reads IPMA's warnings again from this site's data room when the page
// opens and says whether they are still what the page was built on. It fetches nothing outside this site.
(function () {
    const root = document.getElementById('story'); if (!root) return
    const KEY = 'storm.stories.switches'
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') } catch { }
    const CLS = { sources: ['no-sources', false], times: ['no-times', false], hyp: ['no-hyp', false], chg: ['show-chg', true] }
    const apply = () => { for (const b of document.querySelectorAll('#st-toggles input[data-t]')) { const [cls, whenOn] = CLS[b.dataset.t]; root.classList.toggle(cls, b.checked === whenOn) } }
    for (const b of document.querySelectorAll('#st-toggles input[data-t]')) {
        if (typeof saved[b.dataset.t] === 'boolean') b.checked = saved[b.dataset.t]
        b.addEventListener('change', () => { saved[b.dataset.t] = b.checked; try { localStorage.setItem(KEY, JSON.stringify(saved)) } catch { } apply() })
    }
    apply()
    const open = document.getElementById('st-open')
    if (open) open.addEventListener('click', () => { const all = [...root.querySelectorAll('details.st-sup')], to = !all.every(d => d.open); for (const d of all) d.open = to; open.textContent = to ? 'Close every support' : 'Open every support' })
    // a sentence opened by its address shows its support
    const hit = () => { const el = location.hash && document.getElementById(location.hash.slice(1)); const d = el && el.querySelector && el.querySelector('details.st-sup'); if (d) d.open = true }
    addEventListener('hashchange', hit); hit()
    // the warnings, read again now (this site's copy of IPMA's open data; never IPMA directly)
    const w = document.getElementById('st-warn'), live = document.getElementById('st-live')
    if (!w || !live || !w.dataset.api) return
    const t = s => { const m = String(s || '').match(/^\d{4}-(\d\d)-(\d\d)T(\d\d):(\d\d)/); return m ? `${+m[2]} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+m[1] - 1]}, ${m[3]}:${m[4]} UTC` : '' }
    fetch(w.dataset.api, { cache: 'no-store' }).then(r => r.ok ? r.json() : Promise.reject(r.status)).then(j => {
        const levels = w.dataset.levels.split(','), now = (j[w.dataset.list] || []).filter(x => levels.includes(x.level))
        const sig = now.map(x => [x.type, x.level, x.start_utc, x.end_utc, x.text_pt].join('|')).join('~')
        if (sig === w.dataset.built) live.textContent = `Read again as you opened this page: the same warnings, in the data room's read of ${t(j.read_utc)}.`
        else {
            live.classList.add('st-diff')
            live.textContent = `Changed since this page was built. The data room's read of ${t(j.read_utc)} has: ` + (now.length ? now.map(x => `${x.level} ${x.type}, ${t(x.start_utc)} to ${t(x.end_utc)}`).join('; ') : 'no warning at these levels for Lisbon') + '. The story below was written on the earlier read.'
        }
    }).catch(() => { live.textContent = 'The warnings could not be read again just now; the list above is as built.' })
})()
