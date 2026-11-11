# Sources: every body this site takes data from

> Kept by incident.sources@web-summit.dinis, 11 November 2026, 02:57 UTC

Before you leave for a source, meet it here: who it is, what it publishes, what we take from it, under what licence, and how often this site cites it. 46 bodies so far; 2 with a section of their own so far, MeteoAlarm first. The same as data: [sources.json](sources.json). **Not a warning service:** follow IPMA, ANEPC and your local authorities.

A link in the *Their site* column leaves this site. *Rows* is how many rows of [the timeline](../incidents/2026-11-10-storm-charles/timeline.md) link to the body; *addresses* is how many of its addresses appear in our data and research. Counted 2026-11-11 02:57 UTC.

## Official bodies

| Body | Who | What we take | Rows | Addresses | Licence | Their site |
|---|---|---|---|---|---|---|
| **[MeteoAlarm](meteoalarm/README.md)** · [entity](../entities/body/meteoalarm.html) | EUMETNET's system that carries Europe's national weather warnings | the time IPMA issued each warning, and which message it replaced | 3 | 103 | CC BY 4.0 equivalent, with additional requirements (name the national service, keep the time of issue, link www.meteoalarm.org, publish the disclaimer; real time if operational) ([terms](https://www.meteoalarm.org/en/live/page/terms-and-conditions), read 2026-11-11 02:15 UTC) | [feeds.meteoalarm.org](https://feeds.meteoalarm.org/) |
| **[Web Summit](websummit/README.md)** · [entity](../entities/organisation/websummit.html) | the organiser of the conference held in Lisbon on these days | its statements on what goes ahead, moves or is cancelled | 9 | 312 | not read yet | [websummit.com](https://websummit.com/) |
| **[IPMA (Instituto Português do Mar e da Atmosfera)](ipma/README.md)** · [entity](../entities/body/ipma.html) (kept by incident.ipma@) | Portugal's national meteorological service: it issues the warnings | the warnings in force, the hour-by-hour forecast for Lisbon, the stations' observations, the communiqués | 6 | 307 | see sources/ipma/ (incident.ipma@'s section). The earlier check (research/weather-sites/meteoalarm-check.json) records that IPMA asks for the source to be named. | [api.ipma.pt](https://api.ipma.pt/) |
| **[NOAA Aviation Weather Center](noaa-awc/README.md)** | a US public service that redistributes the world's aviation reports | LPPT's TAF and METAR | 1 | 157 | not read yet | [aviationweather.gov](https://aviationweather.gov/) |
| **[ANEPC (Autoridade Nacional de Emergência e Proteção Civil)](anepc/README.md)** · [entity](../entities/body/anepc.html) | Portugal's civil protection authority | its notices and the state of alert | 1 | 71 | not read yet | [prociv.gov.pt](https://prociv.gov.pt/) |
| **[The Government of Portugal](government/README.md)** · [entity](../entities/body/government.html) | the government portal and the Ministry of Internal Administration | the declaration of the alert situation and its terms | 1 | 24 | not stated: the portal's legal notice (Aviso Legal) has credits and an accessibility statement, and no licence or terms of reuse ([terms](https://portugal.gov.pt/pt/gc25/aviso-legal), read 2026-11-11 02:22 UTC) | [portugal.gov.pt](https://portugal.gov.pt/) |
| **[AEMET (Agencia Estatal de Meteorología)](aemet/README.md)** · [entity](../entities/body/aemet.html) | Spain's national meteorological service | nothing directly yet: cited in research (what Wikipedia attributes to it) | 0 | 37 | not read yet | [www.aemet.es](https://www.aemet.es/) |
| **[Autoridade Marítima Nacional](amn/README.md)** · [entity](../entities/body/amn.html) | Portugal's maritime authority | the state of the ports and bars | 0 | 20 | not read yet | [www.amn.pt](https://www.amn.pt/) |
| **[MET Norway](met-no/README.md)** | Norway's meteorological institute (an open forecast API for any point) | a second model's wind and rain for Lisbon, for comparison only (not a forecast of ours) | 0 | 17 | not read yet | [api.met.no](https://api.met.no/) |
| **[EUMETSAT](eumetsat/README.md)** | Europe's weather-satellite organisation | links only; no image is embedded (research/weather-sites/imagery.json) | 0 | 14 | not read yet | [www.eumetsat.int](https://www.eumetsat.int/) |
| **[Câmara Municipal de Lisboa](cml/README.md)** · [entity](../entities/body/camara-lisboa.html) | Lisbon's city council | its notices | 0 | 12 | not read yet | [informacao.lisboa.pt](https://informacao.lisboa.pt/) |
| **[NHC (US National Hurricane Center, NOAA)](nhc/README.md)** | the US centre for tropical cyclones | nothing directly yet: cited in research | 0 | 10 | not read yet | [www.nhc.noaa.gov](https://www.nhc.noaa.gov/) |
| **[Copernicus Emergency Management Service](copernicus-ems/README.md)** | the EU's emergency mapping service | nothing directly yet: cited in research | 0 | 8 | not read yet | [mapping.emergency.copernicus.eu](https://mapping.emergency.copernicus.eu/) |

## Transport operators and venues

| Body | Who | What we take | Rows | Addresses | Licence | Their site |
|---|---|---|---|---|---|---|
| **[Lisbon airport (ANA Aeroportos de Portugal)](lisbon-airport/README.md)** · [entity](../entities/service/airport.html) | the airport operator | notices on operations | 0 | 17 | not read yet | [www.aeroportolisboa.pt](https://www.aeroportolisboa.pt/) |
| **[Metropolitano de Lisboa](metro/README.md)** · [entity](../entities/service/metro.html) | Lisbon's metro operator | service changes | 0 | 9 | not read yet | [www.metrolisboa.pt](https://www.metrolisboa.pt/) |
| **[CP (Comboios de Portugal)](cp/README.md)** · [entity](../entities/service/cp.html) | the national rail operator | service changes | 0 | 5 | not read yet | [www.cp.pt](https://www.cp.pt/) |
| **[FIL and MEO Arena](venues/README.md)** · [entity](../entities/place/venue.html) | the conference's venues | venue notices | 0 | 5 | not read yet | [www.fil.pt](https://www.fil.pt/) |
| **[Carris](carris/README.md)** · [entity](../entities/service/carris.html) | Lisbon's bus and tram operator | service changes | 0 | 4 | not read yet | [www.carris.pt](https://www.carris.pt/) |
| **[Rede Expressos](rede-expressos/README.md)** · [entity](../entities/service/rede-expressos.html) | an intercity coach operator | service changes | 0 | 4 | not read yet | [www.rede-expressos.pt](https://www.rede-expressos.pt/) |
| **[Lusoponte](lusoponte/README.md)** · [entity](../entities/organisation/lusoponte.html) | the concessionaire of the Vasco da Gama and 25 de Abril bridges | bridge restrictions | 0 | 4 | not read yet | [www.lusoponte.pt](https://www.lusoponte.pt/) |
| **[Transtejo Soflusa](ttsl/README.md)** · [entity](../entities/service/ferries.html) | the Tagus ferry operator | ferry suspensions | 0 | 3 | not read yet | [www.ttsl.pt](https://www.ttsl.pt/) |

## Reference and open data

| Body | Who | What we take | Rows | Addresses | Licence | Their site |
|---|---|---|---|---|---|---|
| **[Wikipedia and Wikidata](../research/wikipedia/README.md)** (kept by incident.wikipedia@) | the encyclopaedia; read by incident.wikipedia@ | the articles on the storm, their revisions and claims, compared with this site | 0 | 692 | not read yet | [pt.wikipedia.org](https://pt.wikipedia.org/) |
| **[Open-Meteo](open-meteo/README.md)** | an open weather API over public models | a model's hourly wind and rain for Lisbon, for comparison only | 0 | 21 | not read yet | [api.open-meteo.com](https://api.open-meteo.com/) |

## The press

| Body | Who | What we take | Rows | Addresses | Licence | Their site |
|---|---|---|---|---|---|---|
| **[Jornal de Negócios](jornaldenegocios/README.md)** · [entity](../entities/outlet/negocios.html) | a Portuguese daily | short excerpts with a link | 7 | 94 | all rights reserved: reproduction in whole or in part forbidden without prior written permission ([terms](https://www.jornaldenegocios.pt/institucional/detalhe/20150902-1659-33jn-1-3-disclaimer), read 2026-11-11 02:22 UTC) | [www.jornaldenegocios.pt](https://www.jornaldenegocios.pt/) |
| **[Observador](observador/README.md)** · [entity](../entities/outlet/observador.html) | a Portuguese online daily | short excerpts with a link | 5 | 182 | all rights reserved: no use without Observador's express consent, except private use allowed by law ([terms](https://observador.pt/termos-e-condicoes/), read 2026-11-11 02:22 UTC) | [observador.pt](https://observador.pt/) |
| **[RTP](rtp/README.md)** · [entity](../entities/outlet/rtp.html) | Portugal's public broadcaster | short excerpts with a link; words said on air are marked as such | 2 | 100 | not read yet | [www.rtp.pt](https://www.rtp.pt/) |
| **[Diário de Notícias](dn/README.md)** · [entity](../entities/outlet/dn.html) | a Portuguese daily | short excerpts with a link | 2 | 100 | not read yet | [www.dn.pt](https://www.dn.pt/) |
| **[SAPO and the outlets it hosts (Tek, Jornal Económico, Executive Digest, 24 Notícias, O Digital)](sapo/README.md)** · [entity](../entities/outlet/sapo.html) | a Portuguese portal | short excerpts with a link | 2 | 60 | not read yet | [tek.sapo.pt](https://tek.sapo.pt/) |
| **[Público](publico/README.md)** · [entity](../entities/outlet/publico.html) | a Portuguese daily | short excerpts with a link | 1 | 119 | not read yet | [www.publico.pt](https://www.publico.pt/) |
| **[CNN Portugal / TVI](cnnportugal/README.md)** · [entity](../entities/outlet/cnn-portugal.html) | a Portuguese broadcaster | short excerpts with a link | 1 | 90 | not read yet | [cnnportugal.iol.pt](https://cnnportugal.iol.pt/) |
| **[ECO](eco/README.md)** · [entity](../entities/outlet/eco.html) | a Portuguese economic outlet | short excerpts with a link | 1 | 46 | not read yet | [eco.sapo.pt](https://eco.sapo.pt/) |
| **[Euronews](euronews/README.md)** · [entity](../entities/outlet/euronews.html) | a European broadcaster | short excerpts with a link | 1 | 41 | not read yet | [www.euronews.com](https://www.euronews.com/) |
| **[Madeira Island News](madeiraislandnews/README.md)** · [entity](../entities/outlet/madeira-island-news.html) | an English-language outlet on Madeira | short excerpts with a link | 1 | 4 | not read yet | [www.madeiraislandnews.com](https://www.madeiraislandnews.com/) |
| **[Notícias ao Minuto](noticiasaominuto/README.md)** · [entity](../entities/outlet/noticias-ao-minuto.html) | a Portuguese online outlet | short excerpts with a link | 0 | 205 | not read yet | [www.noticiasaominuto.com](https://www.noticiasaominuto.com/) |
| **[Expresso](expresso/README.md)** · [entity](../entities/outlet/expresso.html) | a Portuguese weekly | short excerpts with a link | 0 | 60 | not read yet | [expresso.pt](https://expresso.pt/) |
| **[Lusa](lusa/README.md)** · [entity](../entities/outlet/lusa.html) | Portugal's news agency | named where an outlet credits it | 0 | 58 | not read yet | [www.lusa.pt](https://www.lusa.pt/) |
| **[Diário de Notícias da Madeira](dnoticias/README.md)** · [entity](../entities/outlet/dnoticias.html) | Madeira's daily | short excerpts with a link | 0 | 40 | not read yet | [www.dnoticias.pt](https://www.dnoticias.pt/) |
| **[Rádio Renascença](rr/README.md)** · [entity](../entities/outlet/renascenca.html) | a Portuguese radio | short excerpts with a link | 0 | 38 | not read yet | [rr.pt](https://rr.pt/) |
| **[The Portugal News](theportugalnews/README.md)** · [entity](../entities/outlet/portugal-news.html) | an English-language weekly in Portugal | short excerpts with a link | 0 | 34 | not read yet | [www.theportugalnews.com](https://www.theportugalnews.com/) |
| **[Correio da Manhã](cmjornal/README.md)** · [entity](../entities/outlet/correio-da-manha.html) | a Portuguese daily | short excerpts with a link | 0 | 32 | not read yet | [www.cmjornal.pt](https://www.cmjornal.pt/) |
| **[TSF](tsf/README.md)** · [entity](../entities/outlet/tsf.html) | a Portuguese news radio | short excerpts with a link | 0 | 21 | not read yet | [www.tsf.pt](https://www.tsf.pt/) |
| **[Jornal de Notícias](jn/README.md)** · [entity](../entities/outlet/jn.html) | a Portuguese daily | short excerpts with a link | 0 | 21 | not read yet | [www.jn.pt](https://www.jn.pt/) |
| **[El País](elpais/README.md)** | a Spanish daily | short excerpts with a link | 0 | 8 | not read yet | [elpais.com](https://elpais.com/) |

## Platforms

| Body | Who | What we take | Rows | Addresses | Licence | Their site |
|---|---|---|---|---|---|---|
| **[Bluesky](bluesky/README.md)** (kept by incident.social@) | a public social network with an open API; read by incident.social@ | posts by official and public-role accounts; a private person is never named or linked | 5 | 296 | not read yet | [bsky.app](https://bsky.app/) |
| **[Mastodon servers](mastodon/README.md)** | public federated social servers | posts by public-role accounts; a private person is never named or linked | 1 | 26 | not read yet | [mastodon.social](https://mastodon.social/) |
| **[YouTube](youtube/README.md)** | a video platform | links to official broadcasts | 0 | 12 | not read yet | [www.youtube.com](https://www.youtube.com/) |

## The licence map: can we access it, can we change it?

| Body | Access | Change and republish | As published |
|---|---|---|---|
| MeteoAlarm | yes, open feeds | yes, with conditions | CC BY 4.0 equivalent, with additional requirements (name the national service, keep the time of issue, link www.meteoalarm.org, publish the disclaimer; real time if operational) ([terms](https://www.meteoalarm.org/en/live/page/terms-and-conditions)) |
| The Government of Portugal | yes, public pages | not stated: we quote official communiqués with the source and the time read, and link | not stated: the portal's legal notice (Aviso Legal) has credits and an accessibility statement, and no licence or terms of reuse ([terms](https://portugal.gov.pt/pt/gc25/aviso-legal)) |
| Jornal de Negócios | yes, public pages (some behind a paywall) | no: we link, and quote a short excerpt with the source; no copy of an article is kept in git or shown | all rights reserved: reproduction in whole or in part forbidden without prior written permission ([terms](https://www.jornaldenegocios.pt/institucional/detalhe/20150902-1659-33jn-1-3-disclaimer)) |
| Observador | yes, public pages (some behind a paywall) | no: we link, and quote a short excerpt with the source; no copy of an article is kept in git or shown | all rights reserved: no use without Observador's express consent, except private use allowed by law ([terms](https://observador.pt/termos-e-condicoes/)) |

For the 41 bodies marked *not read yet* we have not read the terms page ourselves: until we have, this site links to them and quotes short excerpts only, and keeps no copy of their pages in git. The press: text is quoted in short excerpts with a link, raw captures stay in a private vault (the site's rule). Each is read in the rounds to come, most cited first.

## Not yet in the register

123 more hosts appear in our data and research (weather sites surveyed by incident.weatherwatch@, single articles). The most frequent: `www.metoffice.gov.uk` (29), `www.tempo.pt` (29), `lusometeo.com` (24), `media.rtp.pt` (18), `www.weather.gov` (16), `www.knmi.nl` (16), `www.meteopt.com` (14), `www.dwd.de` (13), `en.ilmatieteenlaitos.fi` (13), `www.bom.gov.au` (13), `www.met.ie` (13), `www.weatherandradar.co.uk` (13). The full list is in [sources.json](sources.json) under `not_yet_registered`.

## How this page is made

The register is [registry.json](registry.json), kept by hand; `tools/source-index.mjs` counts the citations and writes this page and [sources.json](sources.json). Each body has a stable node id (`source:<id>`) for the entity pages. Page captures (screenshots, hashes) are incident.archivist@'s; this section describes the sources and reads their feeds.
