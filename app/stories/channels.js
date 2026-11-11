// The warnings box of a Lisbon story, by the front page's rule (incident.stories@web-summit.dinis, 11 November 2026, WS-214).
// IPMA speaks on two channels: its open-data feed (warnings.json) and its CAP messages as MeteoAlarm relays them (cap.json), which
// carry the time IPMA sent each. The rule is app/weather/weather.js's `channels`, made by incident.weather@, and it is not a choice
// of level by us: for each hazard, when IPMA's newest message still standing was SENT after everything the open data lists for that
// hazard, and the two differ, the box shows the newest message and says plainly what the open-data feed still lists. Otherwise the
// open data is shown. One file, read by the generator (tools/stories-build.mjs) when the page is built and by the page
// (story.js) when it opens, so the two cannot drift. It fetches nothing.
(function (root) {
    var LEVEL_PT = { amarelo: 'yellow', laranja: 'orange', vermelho: 'red' }, RANK = { yellow: 1, orange: 2, red: 3 }
    var T = function (s) { return Date.parse(s) }, ok = function (s) { return !isNaN(Date.parse(s)) }
    var iso = function (s) { return new Date(T(s)).toISOString().replace('.000Z', 'Z') }
    function channels(warn, cap, t) {
        var open = ((warn || {}).lisbon || []).filter(function (w) { return RANK[w.level] && ok(w.start_utc) && ok(w.end_utc) })
        var msgs = (cap || {}).lisbon_messages || [], replaced = {}, out = { list: open, differ: [] }
        msgs.forEach(function (m) { (m.replaces || []).forEach(function (r) { if (r && r.identifier) replaced[r.identifier] = 1 }) })
        var cur = msgs.filter(function (m) { return !replaced[m.identifier] && !m.left_feed_utc && ok(m.onset_utc) && ok(m.expires_utc) && ok(m.sent_utc) }).map(function (m) {
            var x = String(m.event_pt || '').match(/^Aviso\s+(\S+)\s+(.+)$/i), lv = x && LEVEL_PT[x[1].toLowerCase()]
            return lv ? { type: x[2].trim(), level: lv, start_utc: iso(m.onset_utc), end_utc: iso(m.expires_utc), text_pt: m.description_pt, sent_utc: iso(m.sent_utc), read_utc: m.last_seen_utc || m.read_utc, via: 'cap', id: m.identifier } : null
        }).filter(Boolean)
        if (!cur.length) return out
        var key = function (w) { return w.level + '|' + T(w.start_utc) + '|' + T(w.end_utc) }, types = {}, list = []
        open.concat(cur).forEach(function (w) { types[w.type] = 1 })
        Object.keys(types).forEach(function (ty) {
            var o = open.filter(function (w) { return w.type === ty }), c = cur.filter(function (w) { return w.type === ty })
            var oLive = o.filter(function (w) { return T(w.end_utc) > t }), cLive = c.filter(function (w) { return T(w.end_utc) > t })
            var same = oLive.length === cLive.length && oLive.every(function (w) { return cLive.some(function (x) { return key(x) === key(w) }) })
            var capSent = Math.max.apply(0, cLive.map(function (w) { return T(w.sent_utc) }).concat([0])), openSent = Math.max.apply(0, o.map(function (w) { return ok(w.sent_utc) ? T(w.sent_utc) : 0 }).concat([0]))
            if (same || !cLive.length || !(capSent > openSent)) { list = list.concat(o); return }
            list = list.concat(o.filter(function (w) { return T(w.end_utc) <= t }), cLive)
            out.differ.push({ type: ty, shown: cLive, open: oLive.filter(function (w) { return !cLive.some(function (x) { return key(x) === key(w) }) }), sent_utc: new Date(capSent).toISOString().replace('.000Z', 'Z') })
        })
        out.list = list
        return out
    }
    // the box of a story that states only some levels (`levels`): the warnings at those levels not yet over at t, and every hazard
    // on which the two channels differ where either side is at one of those levels. `sig` is what the page compares when it opens.
    function box(warn, cap, t, levels) {
        var ch = channels(warn, cap, t), at = function (w) { return levels.indexOf(w.level) >= 0 }
        var k = function (w) { return [w.type, w.level, w.start_utc, w.end_utc, w.text_pt || '', w.via || 'open'].join('|') }
        var list = ch.list.filter(function (w) { return at(w) && T(w.end_utc) > t })
        var differ = ch.differ.filter(function (d) { return d.shown.concat(d.open).some(at) })
        return { list: list, differ: differ, sig: list.map(k).join('~') + '#' + differ.map(function (d) { return d.type + '>' + d.shown.map(k).join(',') + '<' + d.open.map(k).join(',') }).join('~') }
    }
    root.stChannels = { channels: channels, box: box }
})(typeof window !== 'undefined' ? window : globalThis)
