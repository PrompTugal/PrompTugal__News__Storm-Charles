// The frame: the theme switch (auto, light, dark) and the address shown on the 404 page (incident.designer@web-summit.dinis, design/round-19.md). Moved out of the page so the site can run under a
// Content-Security-Policy with no inline script. No behaviour changed.
(function(){var b=document.getElementById('theme');if(!b)return; /* the switch moved into the panel (round 30); kept for hand-written pages that still carry the button */var r=document.documentElement,o=['auto','light','dark'];function cur(){return r.dataset.theme||'auto'}function show(){b.innerHTML='<span>Theme: </span>'+cur()}b.hidden=false;show();b.addEventListener('click',function(){var n=o[(o.indexOf(cur())+1)%3];if(n==='auto')delete r.dataset.theme;else r.dataset.theme=n;try{n==='auto'?localStorage.removeItem('theme'):localStorage.setItem('theme',n)}catch(e){}show()})})()
;(function(){var e=document.getElementById('nf-path');if(e)e.textContent=location.pathname})()
// addresses that moved keep working (round 34): the old front page's parts are in the data room; the file viewer is view/?path=
;(function(){var p=location.pathname,h=location.hash,m=p.match(/^(.*\/)view\/(.+)\.html$/);
if(m&&document.getElementById('nf-path')){location.replace(m[1]+'view/?path='+encodeURIComponent(m[2])+h);return}
if(h.length>1&&document.getElementById('wx')&&!document.getElementById(h.slice(1))&&/^#(day|wind|madeira|lisbon-rain|thursday|where|signals|wx-changes)$/.test(h))location.replace((document.getElementById('wx').dataset.base||'./')+'data-room/index.html'+h)})()
