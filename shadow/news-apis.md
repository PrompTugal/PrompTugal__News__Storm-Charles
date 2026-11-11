---
title: News APIs for headlines and links: what is open, what needs a key
summary: A list for the conductor: news APIs that are free or cheap, and whether their terms allow keeping headlines and links. GDELT is open; the others need a key and are listed with their terms, not signed up for.
---
# News APIs for headlines and links

> Kept by incident.shadow@web-summit.dinis, 11 November 2026, 02:35 UTC

For incident.conductor@: which news APIs could feed the shadow desk with headlines and links (not article text), and what their terms say about storing them. **Nothing below was signed up for; no key was requested.** Only GDELT's terms were read at source in this round; the others are listed from their public pricing and terms pages as we know them and are marked "to read at source before any use": a term can have changed.

| Service | Cost | Key | Keeping headlines and links | Read at source? |
|---|---|---|---|---|
| **GDELT** (DOC 2.0 API, and the 15-minute files) | free | none | yes: "available for unlimited and unrestricted use for any academic, commercial, or governmental use of any kind without fee"; redistribution allowed with "a citation to the GDELT Project and a link" to gdeltproject.org ([terms](https://www.gdeltproject.org/about.html#termsofuse), read 02:30 UTC) | yes |
| Google News RSS (search feeds) | free | none | a feed for personal readers; Google's terms do not grant reuse of the feed's content: links only, and to be read before any use | no |
| The outlets' own RSS feeds | free | none | each outlet's terms; incident.media@ already keeps titles and links from them (`research/media/feeds.json`) | by incident.media@ |
| NewsAPI.org | free developer plan for development only (delayed articles, not for production); paid plans in the hundreds of US dollars a month | yes | paid plans only, by its terms | no |
| GNews | a free daily allowance; paid plans from tens of euros a month | yes | free plan is for non-commercial use | no |
| NewsData.io | a free daily allowance; paid plans | yes | plan-dependent; free plan non-commercial | no |
| Mediastack | a small free monthly allowance (delayed, http only); paid plans | yes | plan-dependent | no |
| Currents API | a free daily allowance; paid plans | yes | to be read | no |
| The Guardian Open Platform | free developer key (non-commercial), headlines and for many articles the text under its own licence | yes | yes within its licence, with attribution; one outlet, English | no |
| Event Registry (NewsAPI.ai) | a free trial allowance, then paid | yes | plan-dependent | no |
| Media Cloud | free for research | yes (an account) | open-source research platform; stories' titles and addresses | no |

## Our reading

- **GDELT is the one to start with**: open, no key, Portuguese sources included, and its terms allow storing and republishing with a citation and a link. One limit met in practice: the DOC API answered our two test requests at 02:28 and 02:29 UTC with its "one request every 5 seconds" notice and no data (this container shares its outgoing address with others). Its bulk files (every 15 minutes) have no such limit. Next round: a small `tools/shadow-gdelt.mjs` that keeps titles, addresses, outlet and time for the storm's terms, with the citation on the page.
- **For the others the conductor would need Dinis's yes and a key**; none is needed for the first days. incident.media@'s feeds already cover the Portuguese outlets that allow automated reads.
- Whatever the source, the rule here stays: a title and a link, never the article's text.
