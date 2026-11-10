# Media watch: who is covering Storm Charles

> Kept by incident.media@web-summit.dinis for the incident team (WS-214), at Dinis Cruz's word of 10 November 2026, ~23:40 UTC: "a mapping for the social media, the media watch ... who are all the journalists, who is everybody covering". First read: 10 November, 23:45 UTC. **Everything here is evidence** (reported by others) or, where it ranks or compares, **analysis**; none of it is a fact about the storm. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## What is here

| File | What it holds |
|---|---|
| [coverage.json](coverage.json) | Every article, live blog and video page we could read: outlet, URL, title, the publication time the page itself gives (UTC), the by-line as printed, when we read it, the sha256 of our capture. Then `official` (the official channels) and `social` (organisations' accounts; public conversation, counted) |
| [outlets.json](outlets.json) | Each outlet: counts, by-lines as printed, what it does best (derived from the counts) |
| [ranking.md](ranking.md) | Who was fastest on three keyed events; who is most sourced; the wire underneath |
| [wikipedia.json](wikipedia.json) | The Wikipedia pages on the storm (pt, en) and their edit history: revision times and sizes, no editors' names |
| [feeds.json](feeds.json), [seeds.txt](seeds.txt) | The public feeds and news sitemaps read; URLs that have scrolled out of a feed |
| [tools/](tools/) | `harvest.mjs`, `social.mjs`, `wikipedia.mjs`, `rank.mjs`: no dependencies, re-runnable; this folder is built by them, not by hand |

## The first read, in short (10 November, 23:55 UTC)

- **The press:** 212 items from 16 outlets, published between 9 November 08:34 and 10 November 23:53 UTC. 87 carry Lusa's by-line, 45 a reporter's, 34 the outlet's desk; on 46 the by-line could not be read.
- **Web Summit's Day 2:** the organisers' page is dated 19:09. The first articles we could read are ECO's and TEK's, both at 19:41 (33 minutes later), then Diário de Notícias at 19:49. Jornal de Negócios' live blog had it at 19:42 (in [the timeline](../../incidents/2026-11-10-storm-charles/timeline.md)). The full table is in [ranking.md](ranking.md).
- **Official accounts:** Web Summit's Bluesky account last posted at 17:36 ("wrap on Day 1"): **nothing there about Day 2 by 23:51**. The decision is on its website (and by email) only, of the channels readable without a login. IPMA and ANEPC have no account we could find on Bluesky or Mastodon; their websites are the channels (see `official`).
- **Social, readable without a login:** on Bluesky, "depressão Charles" and "borrasca Charles" each fill the API's page of 100 posts since 9 November (59 and 70 accounts); "Storm Charles" 67 posts; "Web Summit" with "Charles" 18. On Mastodon the tags are small (4 to 8 posts each). VOST Portugal (a volunteers' association, not an authority) and Spain's AEMET are the organisations posting most about it; RTP Notícias has 7 videos on YouTube.
- **Wikipedia:** Portuguese has an article, [Depressão Charles](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles), created 10 November 13:07 UTC: 8 revisions, 17,395 bytes at 20:01. English has no article: [Storm Charles](https://en.wikipedia.org/wiki/Storm_Charles) is a redirect, made 10 November 22:46 UTC, to [2026–27 European windstorm season](https://en.wikipedia.org/wiki/2026%E2%80%9327_European_windstorm_season), which had 20 revisions on 9 and 10 November (82,184 bytes at 20:32). "Tempestade Charles" (pt) and "Borrasca Charles" (es) do not exist.

## The rules this folder keeps

- **People:** a person appears only as a by-line printed on a public article, or not at all. A name and a count of items: no contact details, no profile, no account handles of individuals. Posts by individuals on social platforms are **counted, never listed**.
- **Press text:** titles only, as short excerpts with a link. No article text is kept. Our captures of the pages stay outside git; the file keeps each capture's sha256.
- **Labels:** every item is `evidence`. A body's own channel is listed under `official` and becomes a `fact` only when read there (the researcher's and the conductor's job).
- **Reading politely:** one request a second per run, a plain bot User-Agent, feeds and news sitemaps that each site lists for machines. Where a site answers 403 to a bot, we stop there. Wikipedia: its REST API, one request every 5 seconds.

## Limits (read before quoting a number)

- **Absent is not silent.** SIC Notícias, Jornal de Notícias, TSF, Renascença, The Guardian and AP refused a bot (403) on feed and sitemap. They are covering the storm; they are not in the counts.
- Renascença runs a purpose-built tracker for the storm, [rr.pt/tempestade-charles-avisos-e-ocorrencias](https://rr.pt/tempestade-charles-avisos-e-ocorrencias) (reported by incident.weatherwatch@; it answered 403 to our bot at 23:59 UTC on 10 November, so it is named here and not read).
- Weather sites and how each presents the storm are incident.weatherwatch@'s map (`research/weather-sites/sites.json`, when it lands on dev); this folder covers the press and social channels and does not repeat it.
- Expresso, The Portugal News and Bloomberg list their articles in a feed or sitemap but refuse the page: title and time are theirs, the by-line was not read.
- A live blog has one publication time. The minute of each entry inside it is not here, so live blogs look slower than they are.
- Feeds scroll. Items older than a feed's window at 23:45 UTC on 10 November are missing unless cited elsewhere in the incident.
- Correio da Manhã and Jornal de Negócios give a date without a time of day; those items are left out of the speed tables.
- X, Instagram, Facebook, LinkedIn, Threads and TikTok cannot be read without a login and are not here.
- "Most sourced" counts links to primary sources and kinds of by-line. It does not read the articles.

## Run it

```
MEDIA_RAW=<a directory outside git> node research/media/tools/harvest.mjs
node research/media/tools/social.mjs
node research/media/tools/wikipedia.mjs
MEDIA_RAW=<the same> node research/media/tools/rank.mjs
```

A wrong time, a wrong or missing by-line, a missing article: [contribute](../../contribute.md).
