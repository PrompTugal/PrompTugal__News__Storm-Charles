#!/usr/bin/env node
// Licence and terms of each outlet, exactly as it publishes them (incident.media@web-summit.dinis). Node 18+.
//   MEDIA_RAW=<dir outside git> node research/media/tools/terms.mjs   -> research/media/licences.json
// For each outlet in outlets.json: its home page (the footer's copyright line, the links it labels terms / conditions /
// copyright, and the link it labels contacts / ficha técnica), its terms page (a short excerpt of the clause on
// reproduction, quoted as printed, with the link), and its robots.txt (what it says to crawlers by name, and to all).
// Nothing is interpreted beyond that: "not stated" where the page says nothing or refuses a bot. Contact pages are
// LINKED, never copied: no address, phone or name is read into this file.
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const M = path.join(ROOT, 'research/media')
const RAW = process.env.MEDIA_RAW; if (!RAW) { console.error('set MEDIA_RAW'); process.exit(1) }
const UA = 'media-watch-bot/0.1 (public pages only)'
const outlets = JSON.parse(fs.readFileSync(path.join(M, 'outlets.json'), 'utf8')).outlets
const sleep = ms => new Promise(r => setTimeout(r, ms))
const now = () => new Date().toISOString().replace(/\.\d+Z$/, 'Z')
async function get(url) {
    await sleep(1000)
    try { const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8' }, signal: AbortSignal.timeout(30000) }); const text = await r.text()
        const sha = crypto.createHash('sha256').update(text).digest('hex'); fs.writeFileSync(path.join(RAW, 'terms-' + sha.slice(0, 16) + '.html'), text)
        return { status: r.status, url: r.url, text, sha, tdm: r.headers.get('tdm-reservation') }
    } catch (e) { return { status: 'error', url, text: '', error: e.message } }
}
const ent = s => (s || '').replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&(\w+);/g, (m, n) => ({ amp: '&', quot: '"', nbsp: ' ', copy: '©', lt: '<', gt: '>', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', atilde: 'ã', otilde: 'õ', ccedil: 'ç', acirc: 'â', ecirc: 'ê', ocirc: 'ô', agrave: 'à', Aacute: 'Á', Eacute: 'É', Uacute: 'Ú', ldquo: '“', rdquo: '”', ndash: '–', laquo: '«', raquo: '»' }[n] || m)).replace(/\s+/g, ' ').trim()
const links = (html, base) => [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => { try { return { href: new URL(m[1], base).href, text: ent(m[2]) } } catch { return null } }).filter(Boolean)
const TERMS = /termos|condi[cç][oõ]es|\bterms\b|direitos de autor|copyright|aviso legal|legal notice|utiliza[cç][aã]o/i
const CONTACT = /^(contactos?|contacte-nos|fale connosco|contact( us)?|ficha t[ée]cnica|contacts)$/i
const CLAUSE = /[^.]{0,220}(reprodu[cç][aã]o|reproduzi|direitos? de autor|propriedade intelectual|copyright|reproduc|republish|text and data mining|minera[cç][aã]o de (texto|dados)|intelig[êe]ncia artificial|artificial intelligence)[^.]{0,260}\./i
const AI_BOTS = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'CCBot', 'Google-Extended', 'PerplexityBot', 'Bytespider', 'Applebot-Extended', 'Amazonbot', 'meta-externalagent']
const out = []
const prevL = fs.existsSync(path.join(M, 'licences.json')) ? JSON.parse(fs.readFileSync(path.join(M, 'licences.json'), 'utf8')).outlets : []
for (const o of outlets) {
    if (o.automated_reading) { const keep = prevL.find(l => l.outlet === o.id); if (keep) out.push(keep); continue }   // its terms forbid automated reading: no requests
    const host = o.hosts[0], home = 'https://' + (/^(eco|tek|jornaleconomico)\.sapo\.pt$|^cnnportugal|^away|euronews|observador\.pt|expresso\.pt|sicnoticias|rr\.pt|apnews|techcrunch/.test(host) ? host : 'www.' + host) + '/'
    const e = { outlet: o.id, name: o.name, home, read: now(), by: 'incident.media@web-summit.dinis', label: 'fact when read on the outlet\'s own page (this is the outlet speaking about itself)' }
    const h = await get(home); e.home_status = h.status
    if (h.status === 200) {
        const ls = links(h.text, h.url)
        const foot = ent(h.text.slice(-60000)).match(/(©|Copyright|Todos os direitos reservados|All rights reserved)[^|<]{0,260}/i)
        e.footer_line = foot ? foot[0].replace(/&middot;.*$/, '').replace(/\s+(Termos e Condi|Gerir cookies|Powered by|Regras de).*$/i, '').trim().slice(0, 260) : 'not stated'
        const t = ls.filter(l => TERMS.test(l.text) && l.text.length < 60 && !/cookie|privacidade|privacy|publicidade|assin/i.test(l.text))
        const pick = t.find(l => /direitos de autor|copyright/i.test(l.text)) || t.find(l => /termos|terms|condi/i.test(l.text)) || t[0]
        const c = ls.find(l => CONTACT.test(l.text) && !/concurso|publicidade|assinatura/i.test(l.href)) || ls.find(l => /contact|ficha-tecnica/i.test(l.href) && l.text.length < 40)
        e.contact_page = c ? { url: c.href, labelled: c.text, note: 'a link to the outlet\'s own public contact page; nothing on it is copied here' } : 'not found on the home page'
        const tdmMeta = (h.text.match(/<meta[^>]+name=["']tdm-reservation["'][^>]*content=["']([^"']*)/i) || [])[1]
        e.tdm_reservation = h.tdm || tdmMeta ? { value: h.tdm || tdmMeta, where: h.tdm ? 'HTTP header' : 'meta tag', policy: (h.text.match(/<meta[^>]+name=["']tdm-policy["'][^>]*content=["']([^"']*)/i) || [])[1] } : 'not stated (no tdm-reservation header or meta tag on the home page)'
        if (pick) {
            const tp = await get(pick.href)
            e.terms = { url: pick.href, labelled: pick.text, status: tp.status, read: now(), capture_sha256: tp.sha }
            if (tp.status === 200) { const txt = ent(tp.text); const sents = txt.split(/(?<=[.;:])\s+(?=[A-ZÁÉÍÓÚÀ0-9“"(])/).filter(x => x.length > 60 && x.length < 520)
                const TOPIC = /reprodu[cç]|reproduz|direitos? de autor|propriedade intelectual|copyright|republish|text and data mining|minera[cç][aã]o|intelig[êe]ncia artificial|artificial intelligence|machine learning/i, BAN = /n[aã]o pode|proibid|n[aã]o [ée] permitid|vedad|sem (o |a )?(pr[ée]vi[oa] )?(consentimento|autoriza[cç][aã]o)|may not|prohibited|without (the )?(prior )?(written )?(consent|permission)|shall not|not permitted/i
                const m = sents.find(x => TOPIC.test(x) && BAN.test(x)) || sents.find(x => TOPIC.test(x)); e.terms.excerpt_as_published = m ? m.trim() : 'no clause on reproduction found by the reader: read the page'; e.terms.title = ent((tp.text.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]).slice(0, 120) }
        } else e.terms = 'not stated: no link labelled terms, conditions or copyright on the home page'
    } else { e.footer_line = e.terms = e.contact_page = e.tdm_reservation = `not read: the home page answered ${h.status} to a bot` }
    const r = await get(home + 'robots.txt'); e.robots = { url: home + 'robots.txt', status: r.status }
    if (r.status === 200 && !/<html/i.test(r.text.slice(0, 300))) {
        const groups = {}; let cur = []
        for (const line of r.text.split(/\r?\n/)) { const m = line.match(/^\s*(user-agent|disallow|allow)\s*:\s*(.*?)\s*(#.*)?$/i); if (!m) continue
            if (m[1].toLowerCase() === 'user-agent') { if (cur.done) cur = []; cur.push(m[2]); groups[m[2].toLowerCase()] ||= [] } else { cur.done = true; for (const a of cur) groups[a.toLowerCase()].push(m[1].toLowerCase() + ': ' + m[2]) } }
        e.robots.all_agents_disallow_everything = (groups['*'] || []).includes('disallow: /')
        e.robots.named_ai_crawlers_disallowed = AI_BOTS.filter(b => (groups[b.toLowerCase()] || []).includes('disallow: /'))
        e.robots.mentions_ai_or_tdm = /\b(ai|tdm|machine learning|llm|text and data mining)\b/i.test(r.text.replace(/user-agent:.*$/gim, ''))
    }
    out.push(e); console.error(`${o.id}: home ${e.home_status}, terms ${e.terms && e.terms.url ? e.terms.status + ' ' + e.terms.labelled : '-'}, contact ${e.contact_page && e.contact_page.url ? 'yes' : 'no'}, robots ${e.robots.status}`)
}
fs.writeFileSync(path.join(M, 'licences.json'), JSON.stringify({
    about: 'Each outlet\'s licence and terms as the outlet itself publishes them: the footer\'s copyright line, the terms page (link, and a short excerpt of its clause on reproduction, quoted as printed), any machine-readable reservation (tdm-reservation), what its robots.txt tells crawlers, and the link to its own public contact page (linked, never copied). "not stated" means the page says nothing we could find; "not read" means it refused a bot. This is a reading, not legal advice. What we do with press text does not depend on any of it: short excerpts with a link, captures kept privately (CLAUDE.md, Licences).',
    by: 'incident.media@web-summit.dinis', tool: 'research/media/tools/terms.mjs', updated: now(),
    our_default: 'quote briefly (a title, a sentence) and link; no article text, no images, no screenshots shown; captures kept privately with their sha256',
    outlets: out
}, null, 1) + '\n')
