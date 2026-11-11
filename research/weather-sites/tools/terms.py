#!/usr/bin/env python3
"""Reads each site's own terms page (the link found in links.json, fetched by probe.sh) and keeps the sentences about reuse, verbatim.
Usage: terms.py <probe dir of the terms pages> <links.json> <out terms.json>. Excerpts only (short quotation with the link); the whole page is at its address."""
import re, sys, json, html, datetime
probe, linksf, out = sys.argv[1:4]
P = {l.split('\t')[0]: l.rstrip('\n').split('\t') for l in open(probe + '/res.tsv', errors='replace')}
urls = dict(l.split(' ', 1) for l in open(probe + '/urls.txt').read().strip().split('\n'))
by_url = {u.strip(): k for k, u in urls.items()}
KEY = re.compile(r'(creative commons|CC[ -]BY|public domain|dom[ií]nio p[uú]blico|open government licen|all rights reserved|todos os direitos reservados|reprodu[cçz]|reproduc|redistribu|reutiliza|re-?use|commercial|comercia|lucrativ|permission|autoriza[cç][aã]o|consentimento|prohibit|proibid|interdit|hotlink|embed|iframe|scrap|crawl|automat|robot|text and data mining|minera[cç][aã]o de (texto|dados)|intelig[eê]ncia artificial|artificial intelligence|machine learning|attribution|cite |citar|fonte|source|licen[cs]e|licen[cç]a)', re.I)
STRONG = [('open_licence', re.compile(r'creative commons|CC[ -]BY|open government licen|public domain|dom[ií]nio p[uú]blico|free, full and open', re.I)),
          ('all_rights_reserved', re.compile(r'all rights reserved|todos os direitos reservados|tous droits r[ée]serv', re.I)),
          ('needs_permission', re.compile(r'(prior|written|express|pr[eé]via|escrit[ao]|expressa)[^.]{0,60}(permission|consent|authori[sz]ation|autoriza[cç][aã]o|consentimento)', re.I)),
          ('names_automated_access_or_ai', re.compile(r'scrap|crawl|robot|text and data mining|minera[cç][aã]o de (texto|dados)|intelig[eê]ncia artificial|artificial intelligence|machine learning', re.I)),
          ('non_commercial_only', re.compile(r'non-?commercial|n[aã]o comercia|finalidades lucrativas|personal use|uso pessoal|usage priv', re.I))]
NOPE = re.compile(r'(@|\bRua |\bAvenida |\bAv\. |\bsede\b|registered office|NIPC|NIF\b|capital social|Conservat[oó]ria|\b\d{4}-\d{3}\b|\+\d{2,3}[ \d]{6,}|\btel\b|telefone|TV Licence|cookie)', re.I)   # no addresses, phone numbers, company registry lines
def text(p):
    t = open(p, errors='replace').read()
    t = re.sub(r'(?is)<(script|style|noscript|svg|nav|header|footer)\b.*?</\1>', ' ', t)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', t)))
links = json.load(open(linksf))['sites']; res = {}
for sid, v in links.items():
    if not v['terms']: res[sid] = None; continue
    u = re.sub(r';jsessionid=[^?#]*', '', v['terms']['url']).split('#')[0]; pid = by_url.get(u); r = P.get(pid)
    e = {'terms_url': u, 'link_text': v['terms']['text'], 'read': r[1] if r else None, 'status': r[2] if r else None}
    if r and r[2] == '200':
        t = text(f'{probe}/raw/{pid}'); e['chars'] = len(t)
        sents = [s.strip() for s in re.split(r'(?<=[.!?;:])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÀ0-9"“(])', t) if 40 <= len(s.strip()) <= 420 and not NOPE.search(s)]
        scored = sorted(((len(set(m.lower() for m in KEY.findall(s) and [x[0] for x in KEY.findall(s)])), -k, s) for k, s in enumerate(sents) if KEY.search(s)), reverse=True)[:4]
        e['excerpts'] = [s for _, _, s in sorted(scored, key=lambda x: -x[1])]
        e['signals'] = [name for name, pat in STRONG if pat.search(t)]
        if len(t) < 400: e['note'] = 'almost no text in the HTML: the page is drawn by script; not read'
    else: e['note'] = 'the terms page did not open'
    res[sid] = e
doc = {'about': "Each site's own terms or licence page (the link printed on the site), read once: up to four sentences about reuse, verbatim and short, with the page's address; and `signals`, words found anywhere on the page (an open licence named; all rights reserved; prior permission required; automated access or AI named; non-commercial or personal use only). Excerpts are picked by a script from the page's text: they point to the passage, they are not the whole terms, and no judgement here is legal advice. null = no terms link was found on the site.",
       'by': 'incident.weatherwatch@web-summit.dinis', 'updated': datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'), 'sites': res}
json.dump(doc, open(out, 'w'), indent=1, ensure_ascii=False); open(out, 'a').write('\n')
ok = [k for k, v in res.items() if v and v.get('excerpts')]
print(len(ok), 'with excerpts;', sum(1 for v in res.values() if v and not v.get('excerpts')), 'terms pages unread;', sum(1 for v in res.values() if v is None), 'no link')
