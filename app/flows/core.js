// Flows: the core (incident.motion@web-summit.dinis, 11 November 2026, WS-214; Dinis, ~10:10 UTC, BRIEF.md).
// One small format for a flow of the team's work (data/flows/schema.json, flows/README.md), and the recipes that make a flow
// from the record. The same file runs in the build (tools/flows-build.mjs evaluates it) and in the browser (the player and
// the API: app/flows/embed.html?agent=...&kind=...), so a flow is never made by hand twice.
//
// The record it reads is data/flows/record.json, written by the build from tracked files only:
//   commits:  data/ci/commits/*.json (incident.ci@) and data/agents/commits.json (incident.observability@), joined by sha;
//   sessions: data/agents/sessions.json (incident.observability@); keys: data/keys.json; hand-overs: agents/*/status.json.
// No clock, no network: the same record gives the same flow.
(function (G) {
    'use strict'
    const SCHEMA = 'flows/v1'
    // the steps and kinds of story/primitives.md (incident.storyteller@'s words; where they differ, the storyteller's win)
    const VERBS = ['wake', 'read', 'write', 'commit', 'push', 'release', 'publish', 'capture', 'hand-over', 'seal', 'message', 'ask', 'answer', 'instruct', 'route', 'correct', 'pause']
    const KINDS = ['person', 'agent', 'session', 'outside', 'machine', 'thing']
    const REPO = 'https://github.com/PrompTugal/PrompTugal__News__Storm-Charles'
    const short = n => String(n || '').split('@')[0].replace(/^incident\./, '')
    const aid = n => 'a-' + short(n).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
    const ms = t => Date.parse(t)
    const clip = (s, n = 110) => { s = String(s || '').replace(/\s+/g, ' ').trim(); return s.length <= n ? s : s.slice(0, n - 1).trimEnd() + '…' }
    // a session address is never shown in a view: "session 7 of librarian" says it, and the evidence links the record
    const scrub = s => String(s || '').replace(/https?:\/\/claude\.ai\/code\/session_[A-Za-z0-9]+/g, '[a session]').replace(/session_[A-Za-z0-9]+/g, '[a session]')
    const commitEv = c => ({ commit: c.sha.slice(0, 8), url: REPO + '/commit/' + c.sha, ...(c.files && c.files.length ? { file: c.files[0] } : {}) })
    const agentActor = (name, extra = {}) => ({ id: aid(name), kind: 'agent', icon: 'agent', mark: short(name).slice(0, 2).toUpperCase(), label: short(name) + '@', name, ...extra })
    const CI = { id: 'o-ci', kind: 'machine', icon: 'factory', mark: 'CI', label: 'CI', name: 'GitHub Actions (deploy.yml)', evidence: { file: '.github/workflows/deploy.yml' } }
    const SITE = { id: 't-site', kind: 'thing', icon: 'page', mark: 'www', label: 'the site', evidence: { url: 'https://storm-charles.promptugal.news/' } }
    const DINIS = { id: 'p-dinis', kind: 'person', icon: 'person', mark: 'DC', label: 'Dinis', evidence: { file: 'CLAUDE.md' } }

    function byAgent(rec, name) { return rec.commits.filter(c => c.agent === name).sort((a, b) => ms(a.at) - ms(b.at)) }
    function edgesOf(steps) {
        const m = new Map()
        for (const s of steps) for (const to of s.to || []) { const k = s.actor + '|' + to + '|' + s.verb; const e = m.get(k) || { from: s.actor, to, verb: s.verb, n: 0 }; e.n++; m.set(k, e) }
        return [...m.values()]
    }
    function pausesOf(steps, minGap) {
        const out = []
        for (let i = 1; i < steps.length; i++) { const g = (ms(steps[i].t) - ms(steps[i - 1].t)) / 6e4; if (g >= minGap) out.push({ from: steps[i - 1].t, to: steps[i].t, minutes: Math.round(g), why: 'no step on record' }) }
        return out
    }
    // the commits of one agent cut into wakes: a new wake after a gap of `gap` minutes or more
    function wakesOf(list, gap = 15) {
        const out = []; let cur = []
        for (const c of list) { if (cur.length && ms(c.at) - ms(cur[cur.length - 1].at) >= gap * 6e4) { out.push(cur); cur = [] } cur.push(c) }
        if (cur.length) out.push(cur)
        return out
    }
    function finish(flow, rec) {
        flow.schema = SCHEMA
        flow.experiment = true
        flow.steps.sort((a, b) => ms(a.t) - ms(b.t))
        flow.edges = edgesOf(flow.steps)
        flow.pauses = flow.pauses || pausesOf(flow.steps, flow.pause_min || 30)
        delete flow.pause_min
        const used = new Set(flow.steps.flatMap(s => [s.actor, ...(s.to || [])]))
        flow.actors = flow.actors.filter((a, i, all) => used.has(a.id) && all.findIndex(b => b.id === a.id) === i)
        flow.window = { from: flow.steps.length ? flow.steps[0].t : null, to: flow.steps.length ? flow.steps[flow.steps.length - 1].t : null }
        flow.updated = flow.window.to || rec.updated
        flow.record = { head: rec.head, updated: rec.updated }
        return flow
    }
    // a commit as steps: the agent commits; each For: is an "addresses" step to that agent; CI builds and serves it
    function commitSteps(c, actor, actors, opts = {}) {
        const st = [{ t: c.at, actor, verb: 'commit', object: clip(c.what), files: c.files || [], n_files: c.n_files, evidence: commitEv(c) }]
        for (const to of (c.to || [])) { if (!/@/.test(to) || to === c.agent) continue; actors.push(agentActor(to)); st.push({ t: c.at, actor, verb: 'message', object: 'For: ' + short(to) + '@', to: [aid(to)], evidence: { commit: c.sha.slice(0, 8), url: REPO + '/commit/' + c.sha } }) }
        if (opts.ci && c.served) {
            actors.push(CI, SITE)
            st.push({ t: c.at, actor: 'o-ci', verb: 'publish', object: c.served + (c.run ? ' (run ' + c.run + ')' : ''), to: ['t-site'], evidence: c.run ? { url: REPO + '/actions', file: 'data/ci/runs/', run: c.run } : { commit: c.sha.slice(0, 8), url: REPO + '/commit/' + c.sha } })
        }
        return st
    }

    // 1. one wake of one agent, end to end. pick: 'last' (the latest wake of at least `min` commits), or an ISO time inside it
    function wake(rec, name, o = {}) {
        const list = byAgent(rec, name), min = o.min || 3
        const ws = wakesOf(list, o.gap || 15)
        let w = null
        if (o.at) w = ws.find(x => ms(x[0].at) - 6e4 <= ms(o.at) && ms(o.at) <= ms(x[x.length - 1].at) + 6e4)
        else w = ws.filter(x => x.length >= min).pop() || ws.pop()
        if (!w) return null
        const me = agentActor(name), actors = [me], steps = []
        const sess = sessionAt(rec, name, w[0].at)
        if (sess) { actors.push(sessActor(name, sess)); steps.push({ t: w[0].at, actor: sessActor(name, sess).id, verb: 'wake', object: 'session ' + sess.n + ' of ' + short(name) + ' wakes (what woke it is not in the record)', to: [me.id], evidence: { file: 'data/agents/sessions.json' } }) }
        for (const c of w) steps.push(...commitSteps(c, me.id, actors, { ci: true }))
        const after = list[list.indexOf(w[w.length - 1]) + 1]
        if (after) steps.push({ t: w[w.length - 1].at, actor: me.id, verb: 'pause', object: 'the wake ends; next commit ' + Math.round((ms(after.at) - ms(w[w.length - 1].at)) / 6e4) + ' min later', evidence: { commit: after.sha.slice(0, 8), url: REPO + '/commit/' + after.sha } })
        return finish({ id: o.id || 'wake-' + short(name), kind: 'wake', title: o.title || 'A wake of ' + short(name) + '@, end to end', summary: o.summary || `${w.length} commits from ${w[0].at.slice(11, 16)} to ${w[w.length - 1].at.slice(11, 16)} UTC on ${w[0].at.slice(0, 10)}: what it wrote, whom it addressed, and CI serving each push.`, actors, steps, pause_min: 10, built_from: ['data/ci/commits/', 'data/agents/commits.json', 'data/agents/sessions.json'] }, rec)
    }

    function sessionsOf(rec, name) { return (rec.sessions[name] || []).slice().sort((a, b) => a.n - b.n) }
    function sessionAt(rec, name, t) { const ss = sessionsOf(rec, name); return ss.filter(s => s.first && ms(s.first) <= ms(t) + 1000).pop() || null }
    function sessActor(name, s) { return { id: 's-' + short(name).replace(/[^a-z0-9]+/gi, '-') + '-' + s.n, kind: 'session', icon: 'session', mark: 'S' + s.n, label: 'session ' + s.n, of: aid(name), evidence: { file: 'data/agents/sessions.json' } } }

    // 2. a hand-over: session n of an agent hands over to session n+1 (n: the session handing over; default the latest pair)
    function handover(rec, name, o = {}) {
        const ss = sessionsOf(rec, name); if (ss.length < 2) return null
        let i = o.n ? ss.findIndex(s => s.n === o.n) : ss.length - 2
        if (i < 0 || !ss[i + 1]) return null
        const a = ss[i], b = ss[i + 1], me = agentActor(name), A = sessActor(name, a), B = sessActor(name, b)
        const actors = [me, A, B], steps = []
        const mine = byAgent(rec, name), inA = mine.filter(c => ms(c.at) >= ms(a.first) && ms(c.at) <= ms(a.last)), inB = mine.filter(c => ms(c.at) >= ms(b.first) && ms(c.at) <= ms(b.last))
        for (const c of inA.slice(-3)) steps.push({ t: c.at, actor: A.id, verb: 'commit', object: clip(c.what), files: c.files || [], evidence: commitEv(c) })
        const ho = rec.handovers[name]
        if (ho && ho.at && Math.abs(ms(ho.at) - ms(a.last)) < 3 * 36e5) steps.push({ t: ho.at.length === 17 ? ho.at.replace('Z', ':00Z') : ho.at, actor: A.id, verb: 'hand-over', object: clip(scrub(ho.why || 'writes its hand-over'), 140), to: [B.id], evidence: { file: ho.file } })
        else steps.push({ t: a.last, actor: A.id, verb: 'hand-over', object: 'its last push (no hand-over note on record for this pair)', to: [B.id], evidence: { file: 'data/agents/sessions.json' } })
        const word = b.on_whose_word && b.on_whose_word !== 'not recorded' ? ', on ' + b.on_whose_word + "'s word (BRIEF.md, " + clip(b.brief_section || 'section not recorded', 40) + ')' : ''
        const key = (rec.keys[name] || []).find(k => k.n === b.n)
        if (b.started_by && b.started_by !== 'not recorded') {
            const by = agentActor(b.started_by); actors.push(by)
            const known = b.started_at && b.started_at !== 'not recorded'
            steps.push({ t: known ? b.started_at : new Date((key && key.made_at ? ms(key.made_at) : ms(b.first) - 6e4) - 6e4).toISOString().replace('.000', ''), ...(known ? {} : { drawn: 'the start time is not recorded: drawn a minute before the new session\'s key' }), actor: by.id, verb: 'route', object: 'starts session ' + b.n + ' of ' + short(name) + word, to: [B.id], evidence: { file: 'data/agents/starts.json' } })
        }
        if (key) steps.push({ t: key.made_at || new Date(ms(b.first) - 6e4).toISOString().replace('.000', ''), ...(key.made_at ? {} : { drawn: 'the key carries no time: drawn a minute before the first push' }), actor: B.id, verb: 'write', object: 'its own session key (' + key.record + '): the public half written to data/keys.json', evidence: { file: 'data/keys.json', key: key.id } })
        for (const c of inB.slice(0, 3)) steps.push({ t: c.at, actor: B.id, verb: 'commit', object: clip(c.what), files: c.files || [], evidence: commitEv(c) })
        const gap = Math.round((ms(b.first) - ms(a.last)) / 6e4)
        return finish({ id: o.id || 'handover-' + short(name) + '-' + a.n, kind: 'handover', title: o.title || `A hand-over: ${short(name)}@, session ${a.n} to ${b.n}`, summary: o.summary || `Session ${a.n}'s last pushes, its hand-over, the start of session ${b.n}, its key, its first pushes: ${gap} min from the last push to the next.`, actors, steps, pause_min: 15, built_from: ['data/agents/sessions.json', 'data/agents/starts.json', 'data/keys.json', 'agents/' + (rec.roles[name] || '?') + '/status.json', 'data/ci/commits/'] }, rec)
    }

    // 3. an agent over the night: a lane per session, every commit (an hour's commits folded into one step past `cap`)
    function night(rec, name, o = {}) {
        const ss = sessionsOf(rec, name), me = agentActor(name), actors = [], steps = []
        const list = byAgent(rec, name); if (!list.length) return null
        const cap = o.cap || 140
        for (const s of ss) actors.push(sessActor(name, s))
        const laneOf = t => { const s = sessionAt(rec, name, t); return s ? sessActor(name, s).id : (actors.push(me), me.id) }
        for (const s of ss) { if (s.started_by && s.started_by !== 'not recorded' && s.first) { const by = agentActor(s.started_by); actors.push(by); steps.push({ t: new Date(ms(s.first) - 6e4).toISOString().replace('.000', ''), drawn: 'the start time is not recorded: drawn a minute before its first push', actor: by.id, verb: 'route', object: 'starts session ' + s.n, to: [sessActor(name, s).id], evidence: { file: 'data/agents/sessions.json' } }) } }
        if (list.length <= cap) for (const c of list) steps.push({ t: c.at, actor: laneOf(c.at), verb: 'commit', object: clip(c.what, 90), files: c.files || [], evidence: commitEv(c) })
        else {
            const hours = new Map(); for (const c of list) { const k = c.at.slice(0, 13) + '|' + laneOf(c.at); (hours.get(k) || hours.set(k, []).get(k)).push(c) }
            for (const [k, cs] of hours) steps.push({ t: cs[0].at, actor: k.split('|')[1], verb: 'commit', object: cs.length + ' commits in the hour from ' + k.slice(11, 13) + ':00; the first: ' + clip(cs[0].what, 70), evidence: commitEv(cs[0]), n: cs.length })
        }
        return finish({ id: o.id || 'night-' + short(name), kind: 'night', title: o.title || `${short(name)}@ over the night, by its sessions`, summary: o.summary || `${list.length} commits in ${ss.length} sessions from ${list[0].at.slice(11, 16)} on ${list[0].at.slice(0, 10)} to ${list[list.length - 1].at.slice(11, 16)} UTC on ${list[list.length - 1].at.slice(0, 10)}; a lane per session, the pauses between.`, actors, steps, pause_min: 30, built_from: ['data/ci/commits/', 'data/agents/commits.json', 'data/agents/sessions.json'] }, rec)
    }

    // 4. a storyteller path (story/paths/<id>.md): its table of steps, | t (UTC) | actor | verb | object | evidence |, and its
    // cast table, | id | kind | icon | label |. The format is agreed in story/primitives.md and flows/README.md.
    function fromPath(md, id, rec, cast) {
        const title = (md.match(/^# (.+)$/m) || [])[1] || id
        const summary = ((md.split(/\n\n/).find(p => p.trim() && !/^(#|>|\||-|\*|<)/.test(p.trim())) || '')).replace(/\s+/g, ' ').trim()
        const rows = tables(md)
        const steps = [], actors = [], castMap = new Map((cast || []).map(a => [a.id, a]))
        for (const t of rows) {
            const h = t.head.map(x => x.toLowerCase())
            const ix = k => h.findIndex(x => x.startsWith(k))
            if (ix('t') === 0 && ix('actor') > 0 && ix('verb') > 0) for (const r of t.rows) {
                const tt = normT(r[ix('t')], md), actor = slug(r[ix('actor')]), verb = String(r[ix('verb')] || '').trim().toLowerCase()
                if (!tt || !actor) continue
                const toCol = ix('to'), to = toCol > 0 ? String(r[toCol] || '').split(/[ ,]+/).map(slug).filter(Boolean) : []
                steps.push({ t: tt, actor, verb, object: clip(stripMd(r[ix('object')]), 140), ...(to.length ? { to } : {}), evidence: evOf(r[ix('evidence')] || '') })
            }
            if (ix('id') === 0 && ix('kind') > 0) for (const r of t.rows) actors.push({ id: slug(r[0]), kind: String(r[ix('kind')] || 'agent').trim(), icon: String(r[ix('icon')] || r[ix('kind')] || 'agent').trim(), mark: String(r[ix('mark')] || '').trim().slice(0, 3) || undefined, label: stripMd(r[ix('label')] || r[0]) })
        }
        for (const s of steps) for (const x of [s.actor, ...(s.to || [])]) if (!actors.some(a => a.id === x)) actors.push(castMap.get(x) || { id: x, kind: /^p-|dinis/.test(x) ? 'person' : 'agent', icon: /^p-|dinis/.test(x) ? 'person' : 'agent', label: x.replace(/^[a-z]-/, '') })
        if (!steps.length) return null
        return finish({ id: 'path-' + id, kind: 'path', title: stripMd(title), summary: clip(stripMd(summary), 240), actors, steps, pause_min: 30, built_from: ['story/paths/' + id + '.md'] }, rec)
    }
    // 4b. a path as incident.storyteller@ writes it (story/paths/<id>.json, the shape in story/primitives.md): steps
    // { t, actor ("<agent>#<n>", "dinis", or a cast id), to, verb, what, commit | file | url | signal, before }, and its cast
    // drawn from story/cast.json. "before" is the storyteller's word for the gap before a step: it becomes the pause's why.
    function fromStory(p, castAll) {
        const members = new Map(((castAll && castAll.members) || []).map(m => [m.id, m]))
        const idOf = x => { const [who, n] = String(x).split('#'); const m = members.get(who); return n ? 's-' + short(who).replace(/[^a-z0-9]+/gi, '-') + '-' + n : (m && m.kind === 'agent') || /@/.test(who) ? aid(who) : (m && m.kind === 'person' ? 'p-' : m && m.kind === 'machine' ? 'm-' : 'o-') + who.replace(/[^a-z0-9]+/gi, '-') }
        const actorOf = x => {
            const [who, n] = String(x).split('#'), m = members.get(who) || {}, g = (m.icon && m.icon.glyph) || '', e = (m.icon && m.icon.emoji) || ''
            if (n) return { id: idOf(x), kind: 'session', icon: 'session', glyph: g, emoji: e, mark: short(who).slice(0, 2).toUpperCase() + n, label: short(who) + '@ #' + n, of: aid(who) }
            const kind = m.kind || (/@/.test(who) ? 'agent' : 'outside')
            return { id: idOf(x), kind, icon: g || kind, glyph: g, emoji: e, mark: (/@/.test(who) ? short(who) : (m.name || who)).slice(0, 2).toUpperCase(), label: /@/.test(who) ? short(who) + '@' : (m.name || who) }
        }
        const actors = (p.cast || []).map(actorOf), steps = [], pauses = []
        let prev = null
        for (const st of p.steps || []) {
            const ev = {}
            if (st.commit) { ev.commit = String(st.commit).slice(0, 8); ev.url = REPO + '/commit/' + st.commit }
            if (st.file) ev.file = st.file
            if (st.url) ev.url = st.url
            if (st.signal) ev.signal = st.signal
            if (!Object.keys(ev).length) continue        // the storyteller's rule: a step with no record is not drawn
            const to = [].concat(st.to || []).filter(Boolean)
            for (const x of [st.actor, ...to]) if (!actors.some(a => a.id === idOf(x))) actors.push(actorOf(x))
            if (prev && st.before) pauses.push({ from: prev, to: st.t, minutes: Math.round((ms(st.t) - ms(prev)) / 6e4), why: st.before })
            steps.push({ t: st.t, ...(st.placed ? { drawn: String(st.placed) } : {}), actor: idOf(st.actor), verb: st.verb, object: clip(st.what, 160), ...(to.length ? { to: to.map(idOf) } : {}), evidence: ev })
            prev = st.t
        }
        if (!steps.length) return null
        return { id: 'path-' + p.id, kind: 'path', title: p.title, summary: clip(p.summary, 260), told_by: p.by, actors, steps, pauses, built_from: ['story/paths/' + p.id + '.json', 'story/cast.json'] }
    }

    const slug = s => String(s || '').replace(/[`*@]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const stripMd = s => String(s || '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, '').trim()
    function normT(s, md) {
        s = stripMd(s); let m = s.match(/(\d{4}-\d{2}-\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/)
        if (m) return `${m[1]}T${m[2]}:${m[3]}:${m[4] || '00'}Z`
        m = s.match(/^(\d{1,2}) Nov(?:ember)?\D+(\d{2}):(\d{2})/i); if (m) return `2026-11-${m[1].padStart(2, '0')}T${m[2]}:${m[3]}:00Z`
        m = s.match(/^(\d{2}):(\d{2})(?::(\d{2}))?/); const day = (md.match(/(2026-11-\d{2})/) || [])[1] || '2026-11-11'
        return m ? `${day}T${m[1]}:${m[2]}:${m[3] || '00'}Z` : null
    }
    function evOf(s) {
        const e = {}, u = (s.match(/\((https?:[^)\s]+)\)/) || s.match(/(https?:\/\/\S+)/) || [])[1]
        const c = (s.match(/\b([0-9a-f]{7,40})\b/) || [])[1], f = (s.match(/`([^`]+\.[a-z]{2,5}[^`]*)`/) || [])[1]
        if (c) { e.commit = c.slice(0, 8); e.url = REPO + '/commit/' + c }
        if (f) e.file = f
        if (u) e.url = u
        if (!c && !f && !u) e.note = stripMd(s) || 'not recorded'
        return e
    }
    function tables(md) {
        const out = []; let cur = null
        for (const line of md.split('\n')) {
            const l = line.trim()
            if (l.startsWith('|')) { const cells = l.replace(/^\||\|$/g, '').split('|').map(x => x.trim()); if (!cur) cur = { head: cells, rows: [] }; else if (!/^[-: ]+$/.test(cells.join(''))) cur.rows.push(cells) }
            else if (cur) { out.push(cur); cur = null }
        }
        if (cur) out.push(cur)
        return out
    }

    // the checks a flow must pass (the build runs them; the player shows the problems instead of a wrong picture)
    function check(f) {
        const p = [], ids = new Set((f.actors || []).map(a => a.id))
        if (f.schema !== SCHEMA) p.push('schema is not ' + SCHEMA)
        for (const a of f.actors || []) if (!KINDS.includes(a.kind)) p.push(`actor ${a.id}: kind ${a.kind} is not one of ${KINDS.join(', ')}`)
        ;(f.steps || []).forEach((s, i) => {
            if (!isFinite(ms(s.t))) p.push(`step ${i}: no time`)
            if (!ids.has(s.actor)) p.push(`step ${i}: actor ${s.actor} is not in the cast`)
            for (const t of s.to || []) if (!ids.has(t)) p.push(`step ${i}: ${t} is not in the cast`)
            if (!s.evidence || !Object.keys(s.evidence).length) p.push(`step ${i}: no evidence`)
            if (!VERBS.includes(s.verb)) p.push(`step ${i}: verb "${s.verb}" is not a primitive (${VERBS.join(', ')})`)
        })
        return p
    }

    // a recipe by name, for the builder's list (flows/flows.json) and the browser API (?kind=&agent=&n=&at=)
    function make(rec, spec) {
        const name = spec.agent && !/@/.test(spec.agent) ? `incident.${spec.agent}@web-summit.dinis` : spec.agent
        if (spec.kind === 'wake') return wake(rec, name, spec)
        if (spec.kind === 'handover') return handover(rec, name, { ...spec, n: spec.n ? +spec.n : undefined })
        if (spec.kind === 'night') return night(rec, name, spec)
        return null
    }

    G.FlowsCore = { SCHEMA, VERBS, KINDS, wake, handover, night, fromPath, fromStory, finish: (f, rec) => finish(f, rec || {}), check, make, wakesOf, short, scrub }
})(typeof globalThis !== 'undefined' ? globalThis : this)
