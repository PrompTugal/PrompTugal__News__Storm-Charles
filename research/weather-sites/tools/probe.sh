#!/usr/bin/env bash
# usage: probe.sh <outdir> < urls ; one line per url: id<TAB>url
out=$1
probe(){ id=$1; url=$2; t=$(date -u +%Y-%m-%dT%H:%MZ)
 r=$(curl -sS -L --compressed --max-time 25 -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' -H 'Accept-Language: en,pt;q=0.8' -o "$out/raw/$id" -w '%{http_code}\t%{size_download}\t%{url_effective}\t%{content_type}' "$url" 2>/dev/null) || r="000\t0\t$url\t"
 title=$(head -c 400000 "$out/raw/$id" 2>/dev/null | tr '\n' ' ' | grep -oiP '(?<=<title>)[^<]{0,160}' | head -1)
 printf '%s\t%s\t%b\t%s\n' "$id" "$t" "$r" "$title"; }
export -f probe; export out
tr '\t' ' ' | xargs -P 16 -L 1 bash -c 'probe "$0" "$1"' 
