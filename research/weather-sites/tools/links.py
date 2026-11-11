#!/usr/bin/env python3
"""From the pages fetched by probe.sh, find each site's own contact page and terms page (links printed on the page read).
Usage: links.py <probe dir> <sites.json> <out links.json>. Only links found in the HTML are recorded; nothing is guessed."""
import re, sys, json, html, glob, datetime
from urllib.parse import urljoin, urlparse
probe, gen, out = sys.argv[1:4]
P = {}
for f in sorted(glob.glob(probe + '/res*.tsv')):
    for l in open(f, errors='replace'):
        c = l.rstrip('\n').split('\t')
        if len(c) >= 5: P[c[0]] = {'read': c[1], 'status': c[2], 'url': c[4]}
calls = [(e['id'], ' '.join(e['opened']['probes'])) for e in json.load(open(gen))['sites']]
CONTACT = re.compile(r'\b(contact|contacto|contactos|contacte|contatos|kontakt|contact us|fale connosco|get in touch|feedback|help|ajuda|support|press office|media enquiries)\b', re.I)
TERMS = re.compile(r'(terms|termos|condi[cç][oõ]es de|legal|legais|licen[cs]|copyright|direitos de autor|nutzungs|mentions l|data policy|disclaimer|imprint|impressum)', re.I)
BAD = re.compile(r'(mailto:|tel:|javascript:|facebook|twitter|x\.com|instagram|linkedin|whatsapp|youtube|cookie|privacy|privacidade)', re.I)
res = {}
for sid, probes in calls:
    best = {'contact': None, 'terms': None}
    for pid in probes.split():
        if pid not in P or P[pid]['status'] != '200': continue
        try: t = open(f'{probe}/raw/{pid}', errors='replace').read()
        except OSError: continue
        base = P[pid]['url']; host = urlparse(base).netloc.split(':')[0]
        dom = '.'.join(host.split('.')[-2:])
        for m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', t, re.S | re.I):
            href, txt = html.unescape(m.group(1)).strip(), re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', m.group(2)))).strip()
            if BAD.search(href) or len(txt) > 45 or not txt or href.startswith('#'): continue
            u = urljoin(base, href)
            if not u.startswith('http') or dom not in urlparse(u).netloc: continue
            for kind, pat in (('contact', CONTACT), ('terms', TERMS)):
                seg = [x for x in re.split(r'[/._-]', urlparse(u).path.lower()) if x]
                if best[kind] is None and (pat.search(txt) or (kind == 'contact' and any(x in ('contact', 'contacto', 'contactos', 'contacts', 'kontakt', 'contactar') for x in seg))):
                    best[kind] = {'url': u, 'text': txt[:60] or None, 'found_on': base, 'read': P[pid]['read']}
        if best['contact'] and best['terms']: break
    res[sid] = best
doc = {'about': "For each entry of sites.json: the site's own contact page and its terms or licence page, as links printed on the page we read (the link's text as printed). Links only: no address, phone number or person is recorded. null = no such link was found in the HTML read (many sites draw their footer by script).",
       'by': 'incident.weatherwatch@web-summit.dinis', 'updated': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'), 'sites': res}
json.dump(doc, open(out, 'w'), indent=1, ensure_ascii=False); open(out, 'a').write('\n')
print(len(res), 'sites;', sum(1 for v in res.values() if v['contact']), 'contact;', sum(1 for v in res.values() if v['terms']), 'terms')
