---
title: Evidence: what each outside page looked like when we read it
summary: Our dated captures of every outside page this site cites: a screenshot, the sha256 of what was served, the time read, and whether the page has changed since.
---
## Evidence

> Kept by incident.archivist@web-summit.dinis, 11 Nov 2026, 02:25 UTC

Every time this site cites an outside page, we keep what that page looked like at that moment: a screenshot, the HTML as served, and the sha256 of each. A link on this site to a source should bring you here first, to **our page of it**, and only then to the outside address. When we read a page again we record whether it still says the same thing.

**13 addresses, 13 captures, 12 with a screenshot shown, 0 recorded changes.** The same list as data: [index.json](index.json); timeline rows to captures: [rows.json](rows.json); which sources may be shown and why: [sources.json](sources.json).

| Source | Page (our latest capture) | Last read | Captures | Since the one before | Shown |
|---|---|---|---|---|---|
| ANEPC (Autoridade Nacional de Emergência e Proteção Civil) | [ANEPC - Autoridade Nacional de Emergência e Proteção Civil](anepc/2026/11/11/0220-pt-avisos-a-populacao-aviso-21-depressao-charles-agravamento-b0cbfc7a.md) `prociv.gov.pt/pt/avisos-a-populacao/aviso-21-depressao-charles-agravamento-da-si` | 11 Nov 2026, 02:20 UTC | 1 | one capture | screenshot |
| away.iol.pt | [Away - Tempo, Avisos Meteo, Combustíveis e Mobilidade](away-iol/2026/11/11/0224-aviso-vermelho-ipma-vento-alerta-vermelho-ipma-admite-cenari-332f69e5.md) `away.iol.pt/aviso-vermelho-ipma/vento/alerta-vermelho-ipma-admite-cenario-semelh` | 11 Nov 2026, 02:24 UTC | 1 | one capture | hash and excerpt |
| Government of Portugal | [404: This page could not be found.](governo/2026/11/11/0224-gc.md) `portugal.gov.pt/gc` | 11 Nov 2026, 02:24 UTC | 1 | one capture | screenshot |
| Government of Portugal | [Governo declara situação de alerta em todo o território continental - XXV Governo Constitucional](governo/2026/11/11/0220-gc25-comunicacao-noticias-governo-declara-situacao-de-alerta-14dd612b.md) `portugal.gov.pt/gc25/comunicacao/noticias/governo-declara-situacao-de-alerta-em-` | 11 Nov 2026, 02:20 UTC | 1 | one capture | screenshot |
| IPMA (Instituto Português do Mar e da Atmosfera) | [api.ipma.pt/open-data/forecast/warnings/warnings_www.json](ipma/2026/11/11/0223-open-data-forecast-warnings-warnings-www-json.md) `api.ipma.pt/open-data/forecast/warnings/warnings_www.json` | 11 Nov 2026, 02:23 UTC | 1 | one capture | screenshot |
| IPMA (Instituto Português do Mar e da Atmosfera) | [api.ipma.pt/open-data/observation/meteorology/stations/observations.js](ipma/2026/11/11/0223-open-data-observation-meteorology-stations-observations-json.md) `api.ipma.pt/open-data/observation/meteorology/stations/observations.json` | 11 Nov 2026, 02:23 UTC | 1 | one capture | screenshot |
| IPMA (Instituto Português do Mar e da Atmosfera) | [Instituto Português do Mar e da Atmosfera](ipma/2026/11/11/0216-pt-otempo-comunicados.md) `ipma.pt/pt/otempo/comunicados/` | 11 Nov 2026, 02:16 UTC | 1 | one capture | screenshot |
| IPMA (Instituto Português do Mar e da Atmosfera) | [IPMA - Avisos Meteorológicos em linha temporal](ipma/2026/11/11/0216-pt-otempo-prev-sam.md) `ipma.pt/pt/otempo/prev-sam/` | 11 Nov 2026, 02:16 UTC | 1 | one capture | screenshot |
| IPMA (Instituto Português do Mar e da Atmosfera) | [IPMA - Avisos Meteorológicos em linha temporal](ipma/2026/11/11/0224-pt-otempo-prev-sam-timeline-jsp-print-true-reg-lsb.md) `ipma.pt/pt/otempo/prev-sam/timeline.jsp?print=true&reg=LSB` | 11 Nov 2026, 02:24 UTC | 1 | one capture | screenshot |
| Web Summit | [Web Summit - The best tech conference on the planet · November 9-12, 2026](websummit/2026/11/11/0223-front.md) `websummit.com/` | 11 Nov 2026, 02:23 UTC | 1 | one capture | screenshot |
| Web Summit | [What's happening at Web Summit · Web Summit](websummit/2026/11/11/0216-blog.md) `websummit.com/blog/` | 11 Nov 2026, 02:16 UTC | 1 | one capture | screenshot |
| Web Summit | [Important event update](websummit/2026/11/11/0216-blog-web-summit-important-event-update-2026.md) `websummit.com/blog/web-summit/important-event-update-2026/` | 11 Nov 2026, 02:16 UTC | 1 | one capture | screenshot |
| Web Summit | [What's happening at Web Summit · Web Summit](websummit/2026/11/11/0224-news.md) `websummit.com/news/` | 11 Nov 2026, 02:24 UTC | 1 | one capture | screenshot |

## How to read a capture

- **Evidence, not fact.** A capture proves what an address served to us at a time. It does not make what the page says true.
- **The screenshot** is the full page at 1280 px wide, as a first-time visitor is served it: not logged in, nothing accepted, no paywall or consent wall bypassed. Where a cookie notice covered the words, a second picture hides the notice (nothing is clicked) and says so.
- **Three hashes**: of the HTML as served, of the visible text, and of the screenshot. "Changed" is judged on the visible text; pages with clocks or rotating parts change in their HTML on every read.
- **Where the files are.** Screenshots of official and public-body pages are in a display vault, readable by anyone with the published read key in [data/vaults.json](../data/vaults.json); your browser fetches the encrypted file, decrypts it and checks it against the hash in the record. Press pages are captured too, but kept privately: for those we show the hash, the title, the time and a short excerpt, with the link. Personal social posts are never captured.
- **One request at a time**, a few seconds apart, as `Mozilla/5.0 (compatible; page-capture/1.0)`, after reading each host's robots.txt. The tool: [tools/capture.mjs](../tools/capture.mjs).

Not a warning service: for the live warning, go to IPMA and ANEPC.
