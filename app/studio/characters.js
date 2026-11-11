// The Studio's characters (incident.studio@web-summit.dinis): small inline SVG, drawn here, coloured only by the site's tokens
// (currentColor and var(--token); never a hex colour, never IPMA's warning colours). Each takes a mood: idle, talk, read,
// puzzled, glad. Add a character by adding a function to CAST; an animation names it in a scene (`"who": "<name>"`).
(function () {
    'use strict'
    const eyes = (mood, y, dx) => {
        if (mood === 'read') return `<path d="M${32 - dx - 3} ${y}h6M${32 + dx - 3} ${y}h6" class="c-ink"/>`
        if (mood === 'puzzled') return `<circle cx="${32 - dx}" cy="${y}" r="2.4" class="c-fill"/><circle cx="${32 + dx}" cy="${y - 1}" r="1.6" class="c-fill"/><path d="M${32 + dx - 4} ${y - 6}l8 -2" class="c-ink"/>`
        return `<circle cx="${32 - dx}" cy="${y}" r="2" class="c-fill"/><circle cx="${32 + dx}" cy="${y}" r="2" class="c-fill"/>`
    }
    const mouth = (mood, y) => {
        if (mood === 'talk') return `<ellipse cx="32" cy="${y}" rx="3.2" ry="2.4" class="c-fill"/>`
        if (mood === 'puzzled') return `<path d="M27 ${y + 1}q2.5 -3 5 0t5 0" class="c-ink"/>`
        if (mood === 'glad') return `<path d="M26 ${y - 1}q6 6 12 0" class="c-ink"/>`
        if (mood === 'read') return `<path d="M29 ${y}h6" class="c-ink"/>`
        return `<path d="M28 ${y}q4 2.5 8 0" class="c-ink"/>`
    }
    const svg = (name, label, inner) => `<svg class="sb-char sb-char-${name}" viewBox="0 0 64 72" role="img" aria-label="${label}">${inner}</svg>`
    const CAST = {
        // the person asking: a round head, a jumper
        user: (m, label) => svg('user', label || 'The user', `
<path d="M12 70c0-14 9-22 20-22s20 8 20 22z" class="c-body"/>
<circle cx="32" cy="26" r="16" class="c-skin"/>
<path d="M17 21c3-9 11-12 18-11 6 1 10 5 12 10-6-1-11-3-14-6-4 4-10 6-16 7z" class="c-fill"/>
${eyes(m, 28, 6)}${mouth(m, 36)}`),
        // the app (the chat program, or the agent's harness): it keeps the conversation and carries it to the model. A courier with a cap and a bag
        app: (m, label) => svg('app', label || 'The app', `
<path d="M14 70c0-13 8-21 18-21s18 8 18 21z" class="c-body2"/>
<path d="M20 52l24 16" class="c-ink"/><rect x="38" y="58" width="14" height="11" rx="2" class="c-surface"/>
<circle cx="32" cy="28" r="15" class="c-skin"/>
<path d="M16 22c1-9 8-14 16-14s15 5 16 14z" class="c-accent"/><path d="M14 22h30" class="c-ink c-thick"/>
${eyes(m, 30, 6)}${mouth(m, 37)}`),
        // the model: a box that reads what it is sent and keeps nothing between requests
        model: (m, label) => svg('model', label || 'The model', `
<path d="M32 4v8" class="c-ink"/><circle cx="32" cy="4" r="2.5" class="c-accent"/>
<rect x="8" y="12" width="48" height="40" rx="9" class="c-surface c-strong"/>
<rect x="15" y="20" width="34" height="18" rx="6" class="c-screen"/>
${eyes(m, 29, 8)}${mouth(m, 45)}
<path d="M20 52v8h24v-8" class="c-surface"/><path d="M14 68h36" class="c-ink c-thick"/><path d="M26 60v8M38 60v8" class="c-ink"/>`),
        // an agent of this team: writes things down as it goes. A pencil behind the ear
        agent: (m, label) => svg('agent', label || 'An agent of this team', `
<path d="M13 70c0-14 9-21 19-21s19 7 19 21z" class="c-body2"/>
<rect x="24" y="54" width="16" height="13" rx="1.5" class="c-surface"/><path d="M27 58h10M27 61h10M27 64h6" class="c-ink c-thin"/>
<circle cx="32" cy="27" r="15" class="c-skin"/>
<path d="M44 12l6 -8 3 2 -6 9z" class="c-accent"/>
<path d="M18 20q14 -12 28 0" class="c-ink c-thick"/>
${eyes(m, 29, 6)}${mouth(m, 37)}`),
        // a fresh agent: the same, with nothing in its head yet (a new session)
        fresh: (m, label) => svg('fresh', label || 'A fresh agent', `
<path d="M13 70c0-14 9-21 19-21s19 7 19 21z" class="c-body"/>
<circle cx="32" cy="27" r="15" class="c-skin"/>
<path d="M30 12q2 -7 6 -3" class="c-ink"/>
${eyes(m, 29, 6)}${mouth(m, 37)}`),
    }
    window.StudioCast = { draw: (who, mood, label) => (CAST[who] || CAST.user)(mood || 'idle', label), names: Object.keys(CAST) }
})()
