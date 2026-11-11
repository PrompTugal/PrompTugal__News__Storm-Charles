// Renders one built page to a PDF as the conductor does for Dinis (A4 landscape, backgrounds printed, the menu and the panel hidden).
// Usage: node admin/build/build.mjs && node admin/tools/render-pdf.cjs _site <page.html> <out.pdf>   (the PDF is never committed: no binaries in git)
const { chromium } = require('playwright'); const http = require('http'), fs = require('fs'), path = require('path');
const root = process.argv[2], rel = process.argv[3], out = process.argv[4];
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.md': 'text/plain' };
const srv = http.createServer((q, r) => { let p = path.join(root, decodeURIComponent(q.url.split('?')[0])); if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html'); if (!fs.existsSync(p)) { r.writeHead(404); return r.end() } r.writeHead(200, { 'content-type': mime[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(r) }).listen(0, async () => {
  const b = await chromium.launch(); const pg = await b.newPage();
  await pg.goto(`http://127.0.0.1:${srv.address().port}/${rel}`, { waitUntil: 'networkidle' });
  await pg.addStyleTag({ content: 'header.top nav, #panel, .panel, #panel-btn, footer nav { display:none !important } pre { white-space: pre-wrap; font-size: 7.5pt } body { background:#fff }' });
  await pg.pdf({ path: out, format: 'A4', landscape: true, printBackground: true, margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' } });
  await b.close(); srv.close();
});
