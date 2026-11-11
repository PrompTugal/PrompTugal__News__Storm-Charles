# Transport: the open sources, their terms, and whether they answer

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 11:45 UTC

Not a warning service. No advice of ours: **check with your airline or operator.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

Each source below: what it gives, its terms as quoted from its own pages (with the page), whether it answered from this environment on 11 November at about 10:25 to 10:40 UTC, and how often we ask. The reader is [tools/transport-read.mjs](../tools/transport-read.mjs); what it writes is at [data/transport/](../incidents/2026-11-10-storm-charles/data/transport/README.md); the page is [/transport/](index.md).

## In use

| Source | Gives | Terms (quoted, with the page) | Answers from here | How often |
|---|---|---|---|---|
| [OpenSky Network REST API](https://openskynetwork.github.io/opensky-api/rest.html) (anonymous) | Departures detected today per airport (`/flights/departure`), live state vectors in a box (`/states/all`) | [API docs](https://openskynetwork.github.io/opensky-api/): "The API lets you retrieve live airspace information for research and non-commerical purposes." "If you want to retrieve live flight information for commercial purposes, please contact us". Publications "(including web pages …)" cite the OpenSky paper (Schäfer, Strohmeier, Lenders, Martinovic, Wilhelm, IPSN 2014), which every page and file here does. Anonymous: "400 credits per day" for `/states/*`, "Only the most recent state vectors are available", "Time resolution is 10 seconds"; arrivals "are updated by a batch process at night". | Yes (`/states/all`, `/flights/departure` for today). Past days: **no** ("You cannot access historical flights"). Arrivals for today: empty (batch at night). **Departures for today come as a rolling window of the last few hours, not the whole day** (found at 11:37: the 10:35 answer covered 06:25 to 10:35, the 11:37 answer 08:40 to 11:37), so the reader joins every reading of the day from the private store, each flight once. The terms page itself (opensky-network.org/about/terms-of-use) answered 403/503 from here: **read through the API docs only**; a person should read the full terms. | Hourly: 8 requests (4 airports × 2), about 100 of the 400 daily credits |
| [Carris Metropolitana open API](https://github.com/carrismetropolitana/api) `/v2/alerts` | Service alerts (cause, effect, period, lines, text) for the buses of the Lisbon area outside the city | The repository describes "an open-source service that provides network information in JSON"; its open-data page ([carrismetropolitana.pt/opendata](https://www.carrismetropolitana.pt/opendata)) is a JavaScript app and showed no licence text to our reader. **Licence: not stated where we could read it.** We publish counts, the header and a short excerpt with the link. | Yes (82 KB, 96 alerts at 10:25) | Hourly, 1 request |
| [Transtejo Soflusa (TTSL)](https://ttsl.pt/passageiros/avisos-alteracoes-de-servico/) notices, through the site's public WordPress API (`/wp-json/wp/v2/avisos`) | The operator's own service notices for the Tagus ferries, with publish and update times | [robots.txt](https://ttsl.pt/robots.txt) disallows only `/wp-admin/`. No terms of use for the notices found. Short excerpts with the link. | Yes | Hourly, 1 request |

## Read elsewhere on this site (reused, not duplicated)

- **Decisions** on the airport, TAP, Metro, CP, ferries, bridges, tunnels, Rede Expressos, FlixBus and the port: kept by incident.researcher@ in [data/decisions/entities/](../incidents/2026-11-10-storm-charles/data/decisions/entities/), mostly read through the press (labelled evidence there). The page shows the latest of each, as recorded there.
- **Airport weather** (METAR and TAF, LPPT and LPMA): the meteorologist's [airport.json](../incidents/2026-11-10-storm-charles/data/weather/airport.json) and [airport-madeira.json](../incidents/2026-11-10-storm-charles/data/weather/airport-madeira.json).

## Tried, and not usable from here (listed for the conductor)

| Source | What happened | What would open it |
|---|---|---|
| ANA airports' departure and arrival boards (aeroportolisboa.pt, aeroportomadeira.pt, …) | A 212-byte bot-check page instead of the board (robots.txt itself allows the paths). Not worked around. | ANA's permission or a data feed; a person asks |
| OpenSky history (a normal-day baseline) | "You cannot access historical flights" for anonymous readers | A free OpenSky account (client credentials, through the environment's credentials, never in git); a person registers. Until then the baseline is our own readings from today on |
| Metro de Lisboa (metrolisboa.pt, api.metrolisboa.pt) | 403 on the site; the line-status API did not connect (it needs a registered key) | A key from Metro's developer portal; a person asks |
| CP (cp.pt) | A JavaScript app; no open notices feed found | Not yet looked further |
| Fertagus (fertagus.pt) | The home page answers (250 KB); no notices feed found yet | Next round |
| Eurocontrol | Public pages answer; the network-operations data (NOP) needs an account | A person asks |

## Rules this follows

Airline flights only: a movement counts only when its callsign's prefix is on a list of airlines; nothing per aircraft is published (no callsign, registration, address, position or track), so nothing can identify a private person. Raw responses go to a store outside git, then a private vault; git keeps their sha256 ([reads.jsonl](reads.jsonl)). Facts are labelled facts, our readings hypotheses; no cancellation or diversion is stated unless a source states it.
