# Transport: the working map of sources, mode by mode

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 14:44 UTC

Not a warning service. No advice of ours. **Your airline or operator decides whether your flight or service runs: its site or app has the latest.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

The aim (Dinis, ~11:56): the operators' own data read into our JSON and drawn on our pages, with links kept as the source citation. Within each source's terms. A block is never got round. Status is one of: **live** (read hourly into our JSON), **next** (open, not built yet), **bot check** (the site blocks automated readers), **terms** (its terms forbid republishing), or **key for Dinis** (an open API that needs a free key or account).

Our client name, on every request: `storm-charles.promptugal.news newsroom reader (+https://storm-charles.promptugal.news/agents/; a few requests an hour)`. We never pose as a browser. The reader is [tools/transport-read.mjs](../tools/transport-read.mjs). Raw responses go to a private vault; git keeps their sha256 ([reads.jsonl](reads.jsonl)). Checked from this environment on 11 November between 10:25 and 12:10 UTC.

## Flights ([page](flights.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| [OpenSky Network](https://openskynetwork.github.io/opensky-api/) | REST API (`/flights/departure`, `/states/all`), anonymous | Yes. Departures come as a rolling window of the last few hours (the 10:35 answer covered 06:25 to 10:35), so we join our hourly readings. Arrivals: batch at night. Past days: "You cannot access historical flights" | [API docs](https://openskynetwork.github.io/opensky-api/): "for research and non-commerical purposes"; cite the OpenSky paper (done on every page). Anonymous: "400 credits per day" for `/states/*`. The full terms page answered 403/503 from here: **a person should read it** | Departures seen per hour per airport (hours not covered drawn dotted); airline aircraft near each airport now | **live** |
| OpenSky history | The same API with an account | Needs an account | As above | Today against the same weekday last week | **key for Dinis** (free account) |
| [ANA's newsroom](https://en.newsroom.ana.pt/) (found by incident.perplexity@, passed on by the conductor 13:38) | Its "update by airport" statements (server-rendered; published time in the page) | Yes (13:38); [robots.txt](https://en.newsroom.ana.pt/robots.txt) disallows one folder only | [ANA's terms](https://www.ana.pt/en/corporate/home#modal-terms), "Intellectual property rights": reproducing or distributing its information "not permitted without prior consent from ANA" (read 13:39). So the figures only, as numbers, with ANA named and the link; none of its text | Per airport: movements scheduled, cancelled in advance, cancelled during the day, operated, at the time ANA states | **live** (13:44): `ana_statement` in flights.json and `ana` on each airport |
| ANA airports' boards (aeroportolisboa.pt, aeroportomadeira.pt, …) | Their web pages | A 212-byte bot-check page; robots.txt allows the paths | Not reached | Departures and arrivals with status (cancelled, delayed) | **bot check**: ANA's permission or a feed; a person asks |
| Airport weather (METAR, TAF) | The meteorologist's files | Yes | Public domain (US AWC) | Already on the site's weather pages | reused, not duplicated |

## Trains ([page](trains.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| CP (cp.pt) | The site is a JavaScript app; its data comes from an API keyed inside the app (not a published one) | The pages answer; no open feed | Not read; we do not use an app's internal key | Line by line: trains running, suppressed, delayed | **unknown** (checked 14:44 UTC, 11 Nov): no live data published. dados.gov.pt has no CP feed (search "comboios": INE's yearly km, a 2021 "Comboios suprimidos" set with no publisher, Cascais's station map); cp.pt's notices are inside its app (internal key, not used). IP is terms (link only). CP's decisions as reported stay with the researcher; else a person asks CP |
| Fertagus (fertagus.pt) | Its [public-information page](https://www.fertagus.pt/Fertagus-pt/Viajar/Comunicados-e-Campanhas/Informa%C3%A7%C3%A3o-ao-P%C3%BAblico) (server-rendered, a timed log per day) | Yes; [robots.txt](https://www.fertagus.pt/robots.txt) disallows only the site's system folders | No terms of use found (a privacy page; "all rights reserved"): short excerpts with the link | Its timed entries (Lisbon time), whether trains run | **live** (12:16): trains.json |
| Infraestruturas de Portugal (IP) | Its site's news and alerts (server-rendered); no open feed of train running found | Yes (12:54); [robots.txt](https://www.infraestruturasdeportugal.pt/robots.txt) allows the public pages | [Its terms](https://www.infraestruturasdeportugal.pt/pt-pt/termos-de-utilizacao-ip): content "só podem ser utilizados para informação pessoal"; none of it may be "reproduzido, publicado … sem o prévio consentimento escrito da IP" (read 12:54) | Trains per line from the network manager | **terms**: link only. Its [alert of 10 November](https://www.infraestruturasdeportugal.pt/pt-pt/alerta-condicoes-meteorologicas-adversas) (rail runs with restrictions, speed limits where the risk is highest) went to incident.researcher@ as material |

## Metro and light rail ([page](metro.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| Metro de Lisboa's site (news, notices) | Public WordPress API | Yes with our client name (curl's default name got 403 at 10:25); [robots.txt](https://www.metrolisboa.pt/robots.txt) is empty | [Its terms](https://www.metrolisboa.pt/termos-e-condicoes-de-utilizacao/), clause 3: content "só podem ser utilizados para informação pessoal"; none of it may be "publicado … sem o prévio consentimento escrito do ML" | Its notices | **terms**: stopped at 12:08; Metro's consent is a question for Dinis |
| Metro de Lisboa's live line status | Loaded by its page from an internal site endpoint; the published API (api.metrolisboa.pt) needs a key | Internal endpoint: not used | As above | The four lines, each with its state | **key for Dinis** |
| Metro de Lisboa's timetable (GTFS) | [dados.gov.pt](https://dados.gov.pt/datasets/?q=gtfs) "GTFS do Metropolitano de Lisboa", updated 26 Oct 2026 | Yes | **CC BY** (dados.gov.pt) | Trains scheduled per hour per line today: the normal day to set beside the reports | **live** (12:13): [metro-schedule.json](../incidents/2026-11-10-storm-charles/data/transport/metro-schedule.json), from the zip in the raw store (sha256 in the file); [tools/transport-gtfs.mjs](../tools/transport-gtfs.mjs) |
| Metro do Porto | Its news pages (server-rendered) | Yes; robots.txt disallows nothing | No terms of use found (a privacy policy only); short excerpts with the link | Its notices | **live** |
| MTS (light rail, Almada and Seixal) | Public WordPress API | Yes; robots.txt disallows nothing | No terms of use found (a privacy policy only); short excerpts with the link | Its notices | **live** |

## Buses and trams ([page](buses.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| Carris Metropolitana alerts | Open API `/v2/alerts` (GTFS-realtime alerts as JSON) | Yes | Its network data is **CC BY** on dados.gov.pt (TML); the API states no licence | Notices in force, those for the weather, the lines named | **live** |
| Carris Metropolitana vehicles | Open API `/v2/vehicles` | Yes (about 670 buses at 12:06) | As above. Counts only | Buses running now, on how many lines, hour by hour from our readings | **live** |
| Carris (Lisbon's buses, trams, lifts) | Its site; no open feed: dados.gov.pt has no Carris (city) GTFS or real-time set (searched 12:46; only the city's 2023 bus-speed challenges, CC BY) | The site answers; no robots.txt (404), no WordPress API | [Its terms](https://www.carris.pt/a-carris/termos-e-condicoes/), clause 2.1: content "só podem ser utilizados para informação pessoal"; 2.2: none of it may be "reproduzido, publicado … sem o prévio consentimento escrito da CARRIS" (read 12:48) | Lines and trams running | **terms**: link only to its [service changes](https://www.carris.pt/viaje/alteracoes-de-servico/) page; its consent is a question for Dinis |
| STCP (Porto buses) | Real-time positions on dados.gov.pt (Porto Digital's urban platform, NGSI) | Yes (170 buses at 12:13) | **CC0** | Buses running now in Porto | **live** (12:15): counts only, in buses.json and services.json |

## Ferries and the port ([page](ferries.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| Transtejo Soflusa (TTSL) | Public WordPress API (`/wp-json/wp/v2/avisos`) | Yes; robots.txt disallows only `/wp-admin/` | No terms of use found (a privacy policy only); short excerpts with the link | Each crossing with its newest notice | **live** |
| Port of Lisbon (APL) | Its news pages ([port security](https://www.portodelisboa.pt/noticias-seguranca-portuaria), [press releases](https://www.portodelisboa.pt/noticia-comunicados-de-imprensa)), server-rendered | Yes (13:47); [robots.txt](https://www.portodelisboa.pt/robots.txt) allows all | Not read yet (nothing to carry) | Port open or closed | **unknown**: no notice on the storm in its news at 13:47. Closing the port's bar is the harbour master's decision (Autoridade Marítima Nacional, Capitania do Porto de Lisboa): **next** |

## Coaches ([page](coaches.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| Rede Expressos | Its site | Behind a protection service (Cloudflare) | Not reached | Routes running or suspended | **bot check** |
| FlixBus | Its site (flixbus.pt sends readers from here to flixbus.com) | Yes; no network-wide disruption page or open feed (its Portuguese sitemap read 12:55); a trip's status is per ride under `/track/`, which [robots.txt](https://www.flixbus.pt/robots.txt) disallows | Not needed: nothing to read | Routes running or suspended | **unknown**: FlixBus publishes no readable network status; the researcher's decisions stand in |

## Taxis and ride-hailing ([page](taxis.md))

Only what an operator or an authority states. Ride-hailing apps (Uber, Bolt) publish no open service data, and we do not read their apps. Status: **none found yet**.

## Bridges and tunnels ([page](bridges.md))

| Source | How | Answers here | Terms | The visual | Status |
|---|---|---|---|---|---|
| Lusoponte (25 de Abril, Vasco da Gama) | Its own notices ("destaques") on [lusoponte.pt](https://www.lusoponte.pt/): the homepage lists them newest first; each notice page carries an "Atualização" time (Lisbon) | Yes (12:49). Its server sends the wrong intermediate certificate, so strict clients fail where browsers fetch the right one; the reader adds Sectigo's public intermediate (OV R36, from the leaf's own AIA address) and verification stays on. [robots.txt](https://www.lusoponte.pt/robots.txt) allows all | No terms of use found (a privacy and a cookie policy only): short excerpts with the link | Its newest notices: speed limits, closures | **live** (12:52): [bridges.json](../incidents/2026-11-10-storm-charles/data/transport/bridges.json) |
| Infraestruturas de Portugal (roads) | Its site: news and alerts | Yes (12:54) | **terms** (as above): link only | Roads and bridges it manages | **terms**: link only |
| Lisbon city (tunnels) | Its site | Not tried yet | | | **next** |

## For Dinis (listed, not worked around)

1. ANA's flight boards: a bot check. Ask ANA for permission or a feed.
2. A free OpenSky account, for past days (a normal-day baseline). The credentials go into the environment, never git.
3. Metro de Lisboa: its terms forbid republishing without written consent (ask for it), and its line-status API needs a key.
4. OpenSky's full terms page did not answer from here: a person reads it.
5. Rede Expressos sits behind a protection service.
6. Carris (Lisbon city): its terms forbid publishing without its written consent (as Metro's); ask for it.
7. Infraestruturas de Portugal: the same clause (its terms frame it under "commercial use is excluded", so a person may read it as allowing a non-commercial newsroom; until then, link only).
8. ANA: its terms ask consent to reproduce its information; we carry its newsroom's figures as numbers with the link and none of its text. Its consent would settle it.
