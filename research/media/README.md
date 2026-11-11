# Media watch: who is covering Storm Charles

> Kept by incident.media@web-summit.dinis, 2026-11-11, 05:26 UTC. For the incident team (WS-214), at Dinis Cruz's word of 10 November 2026, ~23:40 UTC: "a mapping for the social media, the media watch ... who are all the journalists, who is everybody covering". First read: 10 November, 23:45 UTC. **Everything here is evidence** (reported by others) or, where it ranks or compares, **analysis**; none of it is a fact about the storm. Not a warning service: follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

## What is here

| Page | What it shows |
|---|---|
| [Visualised](charts.md) | Coverage over time for each outlet, who was first with each key fact, who carried whose words: three charts, every mark a link |
| [The outlets](outlets/README.md) | One page per outlet: what it published and when, its place on each key moment, its sources as its pages say, its licence and terms as published, its own contact page. And who carried whose words |
| [By-lines](people/README.md) | The reporters whose names are printed on the coverage, with their pieces; a page for each with three or more |
| [Who was first, who is most sourced](ranking.md) | The keyed facts, outlet by outlet |
| [Who we would like to talk to, and why](../../outreach/who.md) | Bodies and newsrooms, the question for each; nobody contacted |

The data behind them:

| File | What it holds |
|---|---|
| [licences.json](licences.json) | Each outlet's terms as it publishes them: footer line, terms page and a short excerpt on reproduction, tdm-reservation, robots.txt, the link to its contact page |
| [cites.json](cites.json) | Who carried whose words (by-lines naming the agency or another outlet; entries that say they relay) |
| [coverage.json](coverage.json) | Every article, live blog and video page we could read: outlet, URL, title, the publication time the page itself gives (UTC), the by-line as printed, when we read it, the sha256 of our capture. Then `official` (the official channels) and `social` (organisations' accounts; public conversation, counted) |
| [outlets.json](outlets.json) | Each outlet: counts, by-lines as printed, what it does best (derived from the counts) |
| [ranking.md](ranking.md) | Who was first on each keyed fact (eleven so far); who is most sourced; the wire underneath |
| [facts.json](facts.json), [first-on-each-fact.json](first-on-each-fact.json) | The keyed facts (primary time, where it comes from, the pattern that matches an item) and the table as data |
| [live-entries.json](live-entries.json) | The timed entries inside three live blogs (Jornal de Negócios, Diário de Notícias, Observador, RTP), for the keyed facts only |
| [wikipedia.json](wikipedia.json) | The Wikipedia pages on the storm (pt, en) and their edit history: revision times and sizes, no editors' names. **Frozen at 00:40 UTC, 11 November:** Wikipedia is now incident.wikipedia@'s, in [research/wikipedia/](../wikipedia/index.html) (every language, revisions as a dataset, claims and citations); this file stays as its starting point and is no longer refreshed |
| [feeds.json](feeds.json), [seeds.txt](seeds.txt) | The public feeds and news sitemaps read; URLs that have scrolled out of a feed |
| [tools/](tools/) | `harvest.mjs`, `live.mjs`, `social.mjs`, `wikipedia.mjs`, `rank.mjs`, `terms.mjs`, `pages.mjs`: no dependencies, re-runnable; this folder is built by them, not by hand |

## The read so far, in short (11 November, 05:26 UTC)

- **The press:** 229 items from 17 outlets, published between 9 November 08:34 and 11 November 05:19 UTC. 92 carry Lusa's by-line, 53 a reporter's, 46 the outlet's desk; on 38 the by-line could not be read. **Wire share: 48%** of the items whose by-line we read are Lusa's (per outlet: `wire_share` in [outlets.json](outlets.json)).
- **Who was first, with the live blogs' entries timed** ([ranking.md](ranking.md)): the live blogs lead on most of the facts. Diário de Notícias' live blog had the red wind warning at 08:05 and the schools closing at 09:14; Jornal de Negócios' had the mayor's line at 13:19 and is the only report we found of the government's recommendation before the decision (17:53). On Day 2, ECO and TEK (articles, 19:41), Negócios (19:42), DN (19:45) and RTP (19:47) are within six minutes of each other, 32 to 38 minutes after the organisers' page.
- **The track moved south (a seventh fact, primary time unknown).** In what we read: Observador's live blog at 22:07 (the ECMWF model's runs), RTP's Antena 1 bulletin of 22:00 (published 22:22, audio not heard), Observador's live blog at 22:35 (a meteorologist of IPMA, to Rádio Observador: the earliest text attributing it to IPMA), RTP's live blog at 23:08 (the same opening sentence), Notícias ao Minuto at about 23:15 (relaying RTP). IPMA's own channels had not changed at 00:29. Two later headlines do speak of less wind: Expresso at 23:54 ("muda trajetória para sul, com menos vento") and CNN Portugal at 00:31 (the storm reaches Lisbon "com menos intensidade"). Headlines, evidence only: IPMA's red warnings for Lisbon stand.
- **Nobody in the press had the 21:23 change** (VOST Portugal, not press, relayed it on Bluesky at 22:20: found by incident.social@).
- **In detail:** IPMA moved Lisbon's red rain warning to 09:00 at 21:23 (its CAP message). By 00:15 UTC no article title and no live-blog entry we could read reported it. A title match can miss it inside a longer piece; it is still the one fact of the six where the press we read was behind the source by hours.
- **Official accounts:** Web Summit's Bluesky account last posted at 17:36 ("wrap on Day 1"): **nothing there about Day 2 by 23:51**. The decision is on its website (and by email) only, of the channels readable without a login. IPMA and ANEPC have no account we could find on Bluesky or Mastodon; their websites are the channels (see `official`).
- **Social is now [research/social/](../social/index.html)** (incident.social@): accounts, posts by day, the conversation counted. What follows is our last read, frozen at 01:40 UTC on 11 November.
- **Social, readable without a login:** on Bluesky, "depressão Charles" and "borrasca Charles" each fill the API's page of 100 posts since 9 November (59 and 70 accounts); "Storm Charles" 67 posts; "Web Summit" with "Charles" 18. On Mastodon the tags are small (4 to 8 posts each). VOST Portugal (a volunteers' association, not an authority) and Spain's AEMET are the organisations posting most about it; RTP Notícias has 7 videos on YouTube.
- **Wikipedia:** Portuguese has an article, [Depressão Charles](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles), created 10 November 13:07 UTC: 10 revisions, 23,658 bytes at 00:18 on 11 November. English has no article: [Storm Charles](https://en.wikipedia.org/wiki/Storm_Charles) is a redirect, made 10 November 22:46 UTC, to [2026–27 European windstorm season](https://en.wikipedia.org/wiki/2026%E2%80%9327_European_windstorm_season), which had 20 revisions on 9 and 10 November (82,184 bytes at 20:32). "Tempestade Charles" (pt) and "Borrasca Charles" (es) do not exist.

## The rules this folder keeps

- **People:** a person appears only as a by-line printed on a public article, or not at all. A name and a count of items: no contact details, no profile, no account handles of individuals. Posts by individuals on social platforms are **counted, never listed**.
- **Press text:** titles only, as short excerpts with a link. No article text is kept. Our captures of the pages stay outside git; the file keeps each capture's sha256.
- **Labels:** every item is `evidence`. A body's own channel is listed under `official` and becomes a `fact` only when read there (the researcher's and the conductor's job).
- **Reading politely:** one request a second per run, a plain bot User-Agent, feeds and news sitemaps that each site lists for machines. Where a site answers 403 to a bot, we stop there. Wikipedia: its REST API, one request every 5 seconds.

## Limits (read before quoting a number)

- **Absent is not silent.** SIC Notícias, Jornal de Notícias, TSF, Renascença, The Guardian and AP refused a bot (403) on feed and sitemap. They are covering the storm; they are not in the counts.
- Renascença runs a purpose-built tracker for the storm, [rr.pt/tempestade-charles-avisos-e-ocorrencias](https://rr.pt/tempestade-charles-avisos-e-ocorrencias) (reported by incident.weatherwatch@; it answered 403 to our bot at 23:59 UTC on 10 November, so it is named here and not read).
- Weather sites and how each presents the storm are incident.weatherwatch@'s map (`research/weather-sites/sites.json`, when it lands on dev); this folder covers the press and social channels and does not repeat it.
- Expresso and Bloomberg list their articles in a feed or sitemap but refuse the page: title and time are theirs, the by-line was not read.
- **Jornal de Negócios and Sábado are no longer read** (from 03:31 UTC, 11 November): their footers say reproduction is expressly forbidden. What we held is kept as headline, time and link; the Negócios live blog's entries timed before then stay in the tables. **CNN Portugal, IOL, TEK and SAPO are read from their feeds only** (headline, time, link): no terms page was found, so their pages are no longer opened and their by-lines no longer read, until Dinis decides.
- **The Portugal News is not read at all.** Its terms forbid automated reading and AI use of its content (read at 02:15 UTC on 11 November by incident.weatherwatch@). Its feed is no longer requested and the 12 items read before then were removed; [its page](outlets/portugal-news.md) keeps its address, a one-line description and the sentence from its terms. Before any outlet is read again, its terms are read once and recorded on its page.
- Four live blogs have their entries timed, for the keyed facts only (Jornal de Negócios, Diário de Notícias, Observador, RTP). Notícias ao Minuto's prints no time per entry. **Correction:** until 00:50 UTC on 11 November this page said Observador had no live blog on the storm; it has (inside its general live blog of the day, whose address names another story), and its entries are now read. Negócios prints a clock time only on the day itself (after midnight, the date), and DN's entry list is in its page data on some reads and not others: entry times come from our capture of 23:5x UTC on 10 November.
- The six tables match an article by its **title**. An article that reports a fact under another headline is missed.
- Feeds scroll. Items older than a feed's window at 23:45 UTC on 10 November are missing unless cited elsewhere in the incident.
- Correio da Manhã and Jornal de Negócios give a date without a time of day; those items are left out of the speed tables.
- X, Instagram, Facebook, LinkedIn, Threads and TikTok cannot be read without a login and are not here.
- "Most sourced" counts links to primary sources and kinds of by-line. It does not read the articles.

## Run it

```
MEDIA_RAW=<a directory outside git> node research/media/tools/harvest.mjs
MEDIA_RAW=<the same> node research/media/tools/live.mjs
node research/media/tools/social.mjs      # no longer run each hour: see research/social/
node research/media/tools/wikipedia.mjs   # no longer run each hour: see research/wikipedia/
MEDIA_RAW=<the same> node research/media/tools/rank.mjs
```

A wrong time, a wrong or missing by-line, a missing article: [contribute](../../contribute.md).
