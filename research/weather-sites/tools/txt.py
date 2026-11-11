import re,sys,html
def text(p):
    t=open(p,errors='replace').read()
    t=re.sub(r'(?is)<(script|style|noscript|svg)\b.*?</\1>',' ',t)
    t=html.unescape(re.sub(r'<[^>]+>',' ',t));return re.sub(r'\s+',' ',t)
if __name__=='__main__':
    d,pat,n,k=sys.argv[1],re.compile(sys.argv[2],re.I),int(sys.argv[3]),int(sys.argv[4])
    for f in sys.argv[5:]:
        t=text(d+'/'+f);c=0
        print('==',f,len(t))
        for m in pat.finditer(t):
            print('  …'+t[max(0,m.start()-k):m.end()+k]+'…');c+=1
            if c>=n:break
