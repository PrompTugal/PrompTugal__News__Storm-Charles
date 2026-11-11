import re,sys,html
pat=re.compile(sys.argv[2],re.I)
for f in sys.argv[3:]:
    t=open(sys.argv[1]+'/'+f,errors='replace').read()
    seen=set()
    for m in re.finditer(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',t,re.S|re.I):
        txt=html.unescape(re.sub(r'<[^>]+>',' ',m.group(2)));txt=re.sub(r'\s+',' ',txt).strip()
        if (pat.search(txt) or pat.search(m.group(1))) and m.group(1) not in seen:
            seen.add(m.group(1));print(f,'|',m.group(1)[:170],'|',txt[:150])
