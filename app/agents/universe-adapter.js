// The adapter between this repository's team and Silvio's Universe (incident.observability@web-summit.dinis).
// The engine is an unchanged, pinned copy: vendor/universe@57636ac/ (brain.js, brain.css by dashboard@web-summit.silvio; pin.json
// says which commit). brain.js draws whatever window.LiveUniverse returns: { agents(), summit(), activity(), talk() }. On its
// home site those read web-summit.sgit.ai; here, after the engine has loaded, this file puts its own four readers in that
// place, returning the same shapes from what the agents page has already read (data/agents/index.json, each status.json,
// this repository's commits). Nothing of the engine is edited, and it reads nothing from its home site.
//   - a person per operator, an agent per team agent (job, latest commit), linked to its operator;
//   - a "policy" point per agent that has agents/<role>/policy.md (the librarian's drafts, in the ABP shape the engine's
//     Circuit reads: Reach, Mandate, Licence to Operate, Provenance), read as served at that moment. Every one says DRAFT in
//     its title, version and phase while its own text says it is not agreed: a draft is not a licence to operate. Gaps and
//     barriers are not passed to the engine (on its home site they are for developers only); the policy page has them.
//     "resource" points are the folders each policy's "Paths it may change" names (or, with no policy, its JOBS.md row);
//   - Talk: every commit with its sender and its For: trailers; activity: the same commits, newest first.
// The engine needs three.js and 3d-force-graph: brain-libs.js (1.6 MB) comes from web-summit.sgit.ai when the Universe is
// opened, only if it matches the sha384 below; it is never committed here.
(() => {
    const HERE = document.currentScript.src, PIN = 'vendor/universe@57636ac/'
    const LIBS = 'https://web-summit.sgit.ai/assets/cc/brain-libs.js', LIBS_SRI = 'sha384-FGe8jg7muKBvFcLZR295Ju2x8gGa1eYfgstKeICxxWwHrXuCHKGytFV8szwXsBuL'
    const SITE = 'https://storm-charles.promptugal.news/', REPO = 'PrompTugal/PrompTugal__News__Storm-Charles'
    const load = (src, attrs = {}) => new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; Object.assign(s, attrs); s.onload = ok; s.onerror = () => no(new Error(src.split('/').pop() + ' could not load')); document.head.appendChild(s) })
    const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const clean = (s, n = 240) => { s = String(s || '').replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '[a session]').replace(/session_[A-Za-z0-9]+|cse_[A-Za-z0-9]+/g, '[a session]').replace(/\*\*|`/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim(); return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…' }
    const safe = u => /^https:\/\//.test(String(u || '')) ? u : ''
    const personOf = n => { const m = String(n).match(/@(?:web-summit|promptugal)\.([a-z0-9-]+)$/i); return m ? m[1].toLowerCase() : '' }
    const fmt = d => { const x = new Date(d); return x.toLocaleString('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' }) + ' ' + x.toISOString().slice(11, 16) }
    let cur = null, waiting = [], last = null
    const data = () => cur ? Promise.resolve(cur) : new Promise(ok => waiting.push(ok))
    document.addEventListener('agents-data', e => { cur = e.detail; for (const w of waiting.splice(0)) w(cur) })

    // the ABP's sections, read the way the engine reads them on its home site (## headings, bullets, two-column tables)
    const section = (t, name) => { const m = t.match(new RegExp('^## ' + name + '[^\\n]*\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))', 'm')); return m ? m[1] : '' }
    const bullets = (txt, n = 8) => txt.split('\n').filter(l => /^\s*-\s+/.test(l)).map(l => clean(l.replace(/^\s*-\s+/, ''))).slice(0, n)
    const table = txt => txt.split('\n').filter(l => l.trim().startsWith('|')).map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(x => x.trim())).filter(c => c.length && !/^[-: ]*$/.test(c[0]))
    const topOf = p => { const top = p.replace(/^\//, '').split('/')[0].replace(/\*.*$/, ''); return !top || /\s/.test(top) ? '' : top }
    const BASE = new URL('../../', HERE).href
    const policyOf = async role => { try { const r = await fetch(`${BASE}agents/${encodeURIComponent(role)}/policy.md`, { cache: 'no-cache' }); return r.ok ? await r.text() : '' } catch { return '' } }

    async function agents() {
        const { idx, commits } = await data(), notes = [], A = new Map(), policies = [], res = new Map()
        const names = new Set([...(idx.agents || []).map(a => a.name), ...commits.map(c => c.agent), ...commits.flatMap(c => c.to)].filter(personOf))
        const owners = [...new Set([...names].map(personOf))]
        for (const p of owners) notes.push({ id: 'p-' + p, type: 'person', title: p[0].toUpperCase() + p.slice(1), links: [], src: 'the part of each agent\'s name after the @', status: 'REAL' })
        const byName = new Map((idx.agents || []).map(a => [a.name, a]))
        const texts = new Map(await Promise.all((idx.agents || []).map(async a => [a.name, await policyOf(a.role)])))
        const useRes = top => { const rid = 'r-' + norm(top); if (!res.has(rid)) res.set(rid, /\./.test(top) ? top : top + '/'); return rid }
        let drafts = 0
        for (const name of names) {
            const a = byName.get(name) || {}, owner = personOf(name), key = norm(name)
            const n = { id: 'a-' + key, type: 'agent', title: name, owner, job: clean(a.job || a.state || '', 220), schedule: a.last_wake ? 'last wake ' + clean(a.last_wake, 40) : '', links: ['p-' + owner], ilinks: [], src: a.job ? 'agents/JOBS.md' : 'named in a commit', status: 'REAL' }
            const c = commits.find(c => c.agent === name)
            if (c) n.latest = { hash: String(c.sha).slice(0, 8), at: fmt(c.at), subject: clean(c.what, 140), url: safe(c.url) || `https://github.com/${REPO}/commit/${String(c.sha).slice(0, 8)}`, t: c.at }
            const t = texts.get(name) || ''
            if (t && /^## Reach/m.test(t)) {
                const draft = /NOT AGREED/i.test(t) || /Status\s*\|[^|\n]*draft/i.test(t); if (draft) drafts++
                const mandate = section(t, 'Mandate'), may = (mandate.split('\n').find(l => /Paths it may change/i.test(l)) || '')
                const ev = []; for (const m of may.matchAll(/`([^`]+)`/g)) { const top = topOf(m[1]); if (!top) continue; const rid = useRes(top); if (!ev.some(x => x.to === rid)) ev.push({ to: rid, quote: clean(may.replace(/^\s*-\s*/, ''), 200) }) }
                const vm = section(t, 'Provenance').match(/(Version \d+[^.;(]*)/)
                const lic = table(section(t, 'Licence to Operate')).filter(c => c.length >= 2 && c[0]).map(c => [clean(c[0], 40), clean(c[1], 160)])
                const pol = { id: 'abp-' + key, type: 'policy', title: (draft ? 'DRAFT policy, not agreed: ' : 'Policy: ') + name, agent: name, links: [], ilinks: ev.map(x => x.to), evidence: ev, src: `agents/${a.role}/policy.md`, url: `${SITE}agents/${a.role}/policy.html`, status: 'ADVISORY',
                    reach: bullets(section(t, 'Reach'), 6), mandate: bullets(mandate, 5), licence: lic, version: (draft ? 'DRAFT, not agreed' : '') + (vm ? (draft ? ' · ' : '') + clean(vm[1], 40) : ''),
                    phase: (draft ? 'DRAFT, NOT AGREED BY DINIS: a draft is not a licence to operate. ' : '') + 'Explorer phase: observes and recommends; blocks nothing.' }
                n.links.push(pol.id); n.policy = pol.id; policies.push(pol)
            } else if (a.job) {
                // no policy file: the folders its row in JOBS.md names, as an inferred link from the agent itself (a job row is not a policy)
                for (const m of String(a.owns || '').matchAll(/`([^`]+)`/g)) { const top = topOf(m[1]); if (top) { const rid = useRes(top); if (!n.ilinks.includes(rid)) n.ilinks.push(rid) } }
            }
            A.set(key, n)
        }
        for (const [rid, title] of res) notes.push({ id: rid, type: 'resource', title, links: [], src: 'named in the policies\' "Paths it may change" (or, with no policy, in agents/JOBS.md)', status: 'REAL' })
        const latest = [...A.values()].filter(a => a.latest).map(a => ({ ...a.latest, agent: a.title })).sort((x, y) => String(y.t).localeCompare(String(x.t))).slice(0, 8)
        const byOwner = {}; for (const a of A.values()) byOwner[a.owner] = (byOwner[a.owner] || 0) + 1
        last = { agents: (idx.agents || []).length, policies: policies.length, drafts }   // the team's own agents (addressees from other teams are on the map, not in this count)
        document.dispatchEvent(new CustomEvent('agents-universe', { detail: last }))
        return { about: 'The incident team behind storm-charles.promptugal.news, read live from its repository: agents, their draft behaviour policies and what they may write.', as_of: new Date().toISOString().slice(0, 16) + 'Z', live: true,
            stats: { agents: A.size, agents_with_policy: policies.length, policies: policies.length, role_policies: 0, role_policies_agreed: 0, by_owner: Object.fromEntries(Object.entries(byOwner).sort((a, b) => b[1] - a[1])), latest },
            notes: [...notes, ...A.values(), ...policies] }
    }
    const activity = async () => (await data()).commits.filter(c => c.agent).map(c => ({ agent: c.agent, subject: clean(c.what, 140), at: c.at, hash: String(c.sha).slice(0, 8), url: safe(c.url) }))
    const talk = async () => (await data()).commits.filter(c => c.agent).map(c => ({ at: c.at, from: c.agent, to: [...new Set(c.to.filter(t => t !== c.agent))], issues: c.issue ? [c.issue] : [], subject: clean(c.what, 140), hash: String(c.sha).slice(0, 8), url: safe(c.url) }))
    const summit = async () => { throw new Error('no Web Summit layer on this site') }

    let opened = false
    async function open(host, note) {
        if (opened) return; opened = true
        try {
            note.textContent = 'Loading the 3D libraries from web-summit.sgit.ai (1.6 MB)…'
            const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = new URL(PIN + 'brain.css', HERE).href; document.head.appendChild(css)
            if (!window.BrainLibs) await load(LIBS, { integrity: LIBS_SRI, crossOrigin: 'anonymous' })
            if (!window.CC_BRAIN) await load(new URL(PIN + 'brain.js', HERE).href)
            window.LiveUniverse = { agents, summit, activity, talk }   // our readers, in the place the engine looks
            host.innerHTML = ''; host.classList.add('on')
            await window.CC_BRAIN.graph(host, { inbox: [], notes: [], reports: [] }, { stand: true })
            note.textContent = ''
        } catch (e) { opened = false; note.textContent = 'The Universe could not open: ' + (e && e.message ? e.message : e) + '. Its 3D libraries come from web-summit.sgit.ai and must match the pinned copy.' }
    }
    window.AgentsUniverse = { open, counts: () => agents().then(() => last), readers: { agents, summit, activity, talk } }
})()
