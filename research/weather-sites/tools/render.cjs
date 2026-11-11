const { chromium } = require('playwright');
const out = process.argv[2];
const list = [
 ['yr','https://www.yr.no/en/forecast/hourly-table/2-2267057/Portugal/Lisbon/Lisbon'],
 ['bbc','https://www.bbc.com/weather/2267057'],
 ['metoffice','https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-warnings'],
 ['ipma-avisos','https://www.ipma.pt/pt/otempo/prev-sam/?p=LSB'],
 ['ipma','https://www.ipma.pt/pt/index.html'],
 ['vigilance','https://vigilance.meteofrance.fr/fr'],
 ['rr','https://rr.pt/tempestade-charles-avisos-e-ocorrencias'],
 ['meteoswiss','https://www.meteoswiss.admin.ch/'],
 ['meteoalarm','https://www.meteoalarm.org/en/live/region/PT'],
 ['windguru','https://www.windguru.cz/31'],
 ['windy','https://www.windy.com/38.72/-9.14?gust,38.72,-9.14,7'],
 ['ipma-lisboa','https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Lisboa&Lisboa'],
];
(async () => {
  const b = await chromium.launch({ proxy: { server: process.env.HTTPS_PROXY } });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 1, locale: 'en-GB', ignoreHTTPSErrors: false });
  await Promise.all(list.map(async ([id, url]) => {
    const p = await ctx.newPage(); const t = new Date().toISOString().slice(0,16)+'Z';
    try { const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(9000);
      for (const s of ['button:has-text("Accept")','button:has-text("Aceitar")','button:has-text("Agree")','button:has-text("Tout accepter")','#onetrust-accept-btn-handler','button:has-text("Reject")']) { try { await p.locator(s).first().click({ timeout: 800 }); break } catch {} }
      await p.waitForTimeout(1500); await p.screenshot({ path: `${out}/${id}.png` });
      const txt = (await p.evaluate(() => document.body.innerText)).replace(/\s+/g,' ').slice(0, 1500);
      console.log(JSON.stringify({ id, t, status: r && r.status(), txt }));
    } catch (e) { console.log(JSON.stringify({ id, t, error: String(e).slice(0,200) })) }
  }));
  await b.close();
})();
