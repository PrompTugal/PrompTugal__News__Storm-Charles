import json,sys,re,html,os
A,B=sys.argv[1:3]
def warn(R):
    try: w=json.load(open(R+'/ipma-api-warnings'))
    except Exception as e: return None
    return sorted((x['awarenessTypeName'],x['awarenessLevelID'],x['startTime'],x['endTime'],x.get('text','')) for x in w if x['idAreaAviso']=='LSB' and x['awarenessLevelID']!='green')
a,b=warn(A),warn(B)
print('LSB same:',a==b, len(b) if b else b)
if a!=b and b:
    for x in b: print(' NOW',x)
    for x in a or []: print(' WAS',x)
def txt(R,f):
    try: t=open(R+'/'+f,errors='replace').read()
    except Exception: return ''
    t=re.sub(r'<(script|style)\b.*?</\1>',' ',t,flags=re.S|re.I)
    return html.unescape(re.sub(r'\s+',' ',re.sub(r'<[^>]+>',' ',t)))
t=txt(B,'c-ipma-comunicados')
for m in re.finditer(r'Comunicado válido.{0,170}',t): print('IPMA:',m.group(0)[:175])
t=txt(B,'c-prociv-avisos'); m=re.search(r'Ativo \d\d\.\d\d\.2026 Aviso \d+ \|[^.]{0,60}',t); print('ANEPC:',m.group(0) if m else ('no answer' if not t else 'pattern not found'))
t=re.sub(r' +',' ',txt(B,'c-aemet-borrascas')); i=t.find('Charles'); print('AEMET:',t[i:i+40])
t=txt(B,'rtp')
for m in list(re.finditer(r'\b\dh [^.]{0,80}',t))[:2]: print('RTP:',m.group(0)[:85])
def links(R,f):
    try: t=open(R+'/'+f,errors='replace').read()
    except Exception: return {}
    o={}
    for m in re.finditer(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',t,re.S|re.I):
        x=re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',m.group(2)))).strip()
        if re.search(r'charles|mau tempo|tempestade|depress|ipma|temporal|borrasca|storm',x+m.group(1),re.I) and len(x)>25: o.setdefault(m.group(1).split('?')[0],x)
    return o
for f in 'c-sapo rtp publico observador jn dn cm tsf renascenca c-rr-tag c-eco-tag c-cnn-meteo c-elpais c-bbc-search c-portugalgov c-severeweathereu c-metoffice-blog c-vost'.split():
    old,new=links(A,f),links(B,f)
    for u in new:
        if u not in old and new[u] not in old.values(): print('NEW',f,'|',new[u][:150],'|',u[:120])
