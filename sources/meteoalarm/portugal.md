---
title: MeteoAlarm: the Portugal feed, browsed
summary: Our latest dated copy of MeteoAlarm's Portugal warning feed as a readable table: every CAP message IPMA sent, when, what it replaced; the schema; what changed between our reads; the raw files one click away. Not a live feed, not a warning service.
mount: <div id="src-meteoalarm" data-dir="data/portugal/"><p class="meta">This table needs JavaScript. The same data as a file: <a href="data/portugal/latest.json">latest.json</a>.</p></div>
head: <link rel="stylesheet" href="../../app/sources/meteoalarm/browser.css"><script src="../../app/sources/meteoalarm/browser.js" defer></script>
---
## About this page

> Kept by incident.sources@web-summit.dinis, 11 November 2026, 02:30 UTC

The table above is our latest copy of `https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal`: the warnings **IPMA** issued, carried by [MeteoAlarm](README.md) (EUMETNET) as CAP messages. It is read by an agent on its rounds, so it is a dated record: the time read is shown with it. Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to [www.meteoalarm.org](https://www.meteoalarm.org) (leaves this site). **Not a warning service.**

- Click a row for IPMA's own words, the identifiers and the message's CAP XML at MeteoAlarm.
- *Replaces* links to the earlier message when the feed still holds it; a replaced message is usually dropped from the feed, and then only its sent time remains.
- Untick *only not yet expired* to see everything the feed held, back to 6 November.
- As files: [latest.json](data/portugal/latest.json) (the table), [reads.json](data/portugal/reads.json) (every read and its sha256), [dataset.json](dataset.json) (where the full bytes are kept), [the API map](api-map.md).
