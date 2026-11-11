import re,sys,html,collections
d=sys.argv[1]
for f in sys.argv[2:]:
    t=open(d+'/'+f,errors='replace').read()
    g=lambda p:(re.search(p,t,re.I) or [None,''])[1]
    pub=g(r'"datePublished"\s*:\s*"([^"]+)') or g(r'article:published_time"\s+content="([^"]+)')
    mod=g(r'"dateModified"\s*:\s*"([^"]+)') or g(r'article:modified_time"\s+content="([^"]+)')
    hosts=collections.Counter(re.findall(r'<iframe[^>]+src="(?:https?:)?//([^/"]+)',t,re.I))
    emb=collections.Counter(m.lower() for m in re.findall(r'datawrapper|flourish|windy\.com|infogram|zoom\.earth|ventusky|ipma\.pt|twitter\.com|x\.com/|bsky|instagram\.com|youtube|meteored|mapbox|leaflet|maplibre|liveblog|LiveBlogPosting|arcgis|google\.com/maps|meteoalarm|eumetsat|sat24',t))
    auth=g(r'"author"\s*:\s*\[?\s*\{[^}]*?"name"\s*:\s*"([^"]+)')
    print(f'{f}\n  pub={pub} mod={mod} author={auth[:60]!r}\n  iframes={dict(hosts)}\n  marks={dict(emb)}')
