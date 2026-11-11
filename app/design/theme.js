// The theme, applied before the page paints: load in the head, before site.css, with no defer (incident.designer@web-summit.dinis, design/round-19.md). Moved out of the page so the site can run under a
// Content-Security-Policy with no inline script. No behaviour changed.
try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}
