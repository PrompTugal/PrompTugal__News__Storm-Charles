#!/usr/bin/env node
// Kept by incident.transport@web-summit.dinis, 11 November 2026, 12:13 UTC
// Metro de Lisboa's published timetable (GTFS, dados.gov.pt, CC BY) -> trips scheduled per hour per line for given days.
// The zip stays in the raw store (~/transport-store/gtfs/...); git keeps only this small summary with the zip's sha256.
//   node tools/transport-gtfs.mjs --zip <path> --days 2026-11-10,2026-11-11,2026-11-12 [--out incidents/<id>/data/transport/metro-schedule.json]
import fs from 'node:fs'
import crypto from 'node:crypto'
import { execFileSync } from 'node:child_process'

const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : d }
const zip = arg('zip'), out = arg('out', 'incidents/2026-11-10-storm-charles/data/transport/metro-schedule.json')
const days = (arg('days') || '').split(',').filter(Boolean)
if (!zip || !days.length) { console.error('usage: --zip <gtfs.zip> --days YYYY-MM-DD[,…] [--out file]'); process.exit(1) }

const read = name => { try { return execFileSync('unzip', ['-p', zip, name], { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8').replace(/^﻿/, '') } catch { return '' } }
const csv = text => {   // GTFS CSV: quoted fields allowed, no embedded newlines in this feed
    const rows = text.split(/\r?\n/).filter(Boolean).map(l => { const o = []; let cur = '', q = false
        for (const c of l) { if (c === '"') q = !q; else if (c === ',' && !q) { o.push(cur); cur = '' } else cur += c }
        o.push(cur); return o })
    const h = rows.shift() || []; return rows.map(r => Object.fromEntries(h.map((k, i) => [k, r[i] ?? ''])))
}

const routes = csv(read('routes.txt')), calendar = csv(read('calendar.txt')), dates = csv(read('calendar_dates.txt'))
const trips = csv(read('trips.txt')), feed = csv(read('feed_info.txt'))[0] || {}
const first = new Map()   // trip_id -> first departure (seconds after service-day midnight)
for (const st of csv(read('stop_times.txt'))) {
    const [h, m, s] = (st.departure_time || st.arrival_time).split(':').map(Number), t = h * 3600 + m * 60 + (s || 0)
    if (!first.has(st.trip_id) || t < first.get(st.trip_id)) first.set(st.trip_id, t)
}
const DOW = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const active = day => {
    const ymd = day.replaceAll('-', ''), dow = DOW[new Date(day + 'T12:00:00Z').getUTCDay()], on = new Set()
    for (const c of calendar) if (c[dow] === '1' && c.start_date <= ymd && c.end_date >= ymd) on.add(c.service_id)
    for (const d of dates) if (d.date === ymd) d.exception_type === '1' ? on.add(d.service_id) : on.delete(d.service_id)
    return on
}
const hhmm = t => `${String(Math.floor(t / 3600)).padStart(2, '0')}:${String(Math.floor(t / 60) % 60).padStart(2, '0')}`

const result = days.map(day => {
    const on = active(day), lines = {}
    for (const r of routes) lines[r.route_id] = { line: r.route_long_name, colour: '#' + r.route_color, trips: 0, first: null, last: null, per_hour: Array(24).fill(0), after_midnight: 0 }
    for (const t of trips) {
        if (!on.has(t.service_id) || !first.has(t.trip_id) || !lines[t.route_id]) continue
        const L = lines[t.route_id], s = first.get(t.trip_id), h = Math.floor(s / 3600)
        L.trips++; if (h < 24) L.per_hour[h]++; else L.after_midnight++
        if (L.first === null || s < L.first) L.first = s
        if (L.last === null || s > L.last) L.last = s
    }
    for (const L of Object.values(lines)) { L.first = L.first === null ? null : hhmm(L.first); L.last = L.last === null ? null : hhmm(L.last) }
    return { day, weekday: DOW[new Date(day + 'T12:00:00Z').getUTCDay()], services: on.size, lines: Object.values(lines) }
})

const doc = {
    by: 'incident.transport@web-summit.dinis', updated: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
    kind: 'fact',
    what: 'Metro de Lisboa trips scheduled to start each hour, per line, both directions, from its published timetable. The plan, not what ran: a normal day to set beside the operator\'s and the authorities\' reports.',
    hours: 'Local time in Lisbon (WET, the same as UTC in November). A trip counts in the hour its first stop departs; trips that start after midnight on the service day are in after_midnight.',
    source: { name: 'GTFS do Metropolitano de Lisboa', publisher: feed.feed_publisher_name || 'Metropolitano de Lisboa, EPE', url: 'https://dados.gov.pt/datasets/gtfs-do-metropolitano-de-lisboa/', licence: 'CC BY 4.0 (dados.gov.pt)', feed_version: feed.feed_version || null, feed_valid: [feed.feed_start_date, feed.feed_end_date].filter(Boolean).join('..') || null, file_sha256: crypto.createHash('sha256').update(fs.readFileSync(zip)).digest('hex'), read: arg('read', null) },
    note: 'Our summary of the operator\'s published timetable; the operator\'s site is not read or republished (its terms).',
    days: result,
}
fs.writeFileSync(out, JSON.stringify(doc, null, 2) + '\n')
console.log(out, result.map(d => `${d.day}: ${d.lines.map(l => l.line + ' ' + l.trips).join(', ')}`).join(' | '))
