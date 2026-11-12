# MeteoAlarm: the API map

> Kept by incident.sources@web-summit.dinis, 12 November 2026, 00:25 UTC

A map of what MeteoAlarm publishes for machines, made by following its own pages and links: every address here is one MeteoAlarm documents or links to, or one its public website was seen to call. Nothing was guessed in bulk. For each: what answered when we read it, whether it needs a key, and where we learnt of it. One request every three seconds, a plain client name. Facts about the addresses as they answered on the time read; MeteoAlarm can change them.

Read 2026-11-11 02:16 UTC. The same as data: [api-map.json](api-map.json). Back to [MeteoAlarm](README.md). Every address below leaves this site.

## Is there history?

**Does MeteoAlarm keep the warnings it has dropped from the open feed (for us: Madeira's on Tuesday 10 November, 12:00 to 21:00 UTC)?** Yes, by its own description: the EDR API serves "realtime and archived weather warnings" and "historical data can be queried"; the website has an archive view. The open feed does not: a replaced message is gone from it (the 11 Nov 02:14 read holds no Madeira message whose hours touch Tuesday 12:00 to 21:00). Reaching the archive needs a token from MeteoAlarm (for re-distributors) or a free MeteoGate key (for the public). We have neither.

*the two quoted statements are facts read from MeteoAlarm's pages; that the missing Madeira messages are in the archive is a hypothesis until someone queries it.*

## The hosts

| Host | What it is | robots.txt |
|---|---|---|
| `www.meteoalarm.org` | the public website: the map of Europe, the pages (terms, FAQ, warning providers and consumers, redistribution hub), an archive view | none (404) |
| `feeds.meteoalarm.org` | the open feeds: an Atom feed per country and, under /api/v1/warnings/, the same as JSON | present, disallows nothing |
| `api.meteoalarm.org` | the API portal: OGC EDR v1.0.0, MQTT v1.0.0, Metadata v0.1, Hub v1.0.0 | not read |
| `api-test.meteoalarm.org` | the test system, "completely decoupled from the production system" (EDR FAQ) | not read; we do not use it |
| `status.meteoalarm.org` | system status (linked from the portal) | not read |

## The addresses

| Address | Key? | It answered | What it returns | How we learnt of it |
|---|---|---|---|---|
| `https://feeds.meteoalarm.org/api/v1/warnings/feeds-{country}` | none | 200, application/json, 343,634 bytes for Portugal | {warnings: [{uuid, alert: {identifier, sender, sent, status, msgType, scope, references, incidents, info: [one block per language: event, headline, description, onset, effective, expires, severity, certainty, urgency, responseType, category, senderName, web, parameter[awareness_level, awareness_type], area[areaDesc, geocode[EMMA_ID]]]}}]} *No paging, no query parameters documented. Sends no Access-Control-Allow-Origin header (a browser on another site cannot read it). Holds expired messages for days: on 11 Nov 02:14 the oldest was sent 6 Nov 07:14. A message replaced by an Update is usually dropped, but stays listed when the Update's reference is written with a stray dash (seen from IPMA): follow references, not only expiry.* | the id of each entry in the Atom feed |
| `https://feeds.meteoalarm.org/api/v1/warnings/feeds-{country}/{uuid}` | none | 200, text/xml, 2,548 bytes (read once, 11 Nov 04:24 UTC: IPMA's red wind warning for Lisbon, sent 10 Nov 07:18:40) | one CAP 1.2 message as XML: identifier, sender, sent, status, msgType, scope, references, and one info block per language (two for Portugal). The area is named by areaDesc and an EMMA_ID geocode: there is no polygon in the message. The same fields as the JSON feed's entry for it. | the id of each entry in the Atom feed |
| `https://feeds.meteoalarm.org/api/v1/warnings` | none | 404 | nothing: there is no index of the JSON feeds; the list of countries is the Atom list on the feeds home page | the parent of the address above (one request) |
| `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-{country}` | none | 200, application/atom+xml, 186,372 bytes, 122 entries for Portugal | an Atom feed; one entry per message, language block and area, with cap: elements (areaDesc, event, sent, expires, effective, onset, certainty, severity, urgency, scope, message_type, status, identifier, geocode EMMA_ID); a rights line (CC BY 4.0 equivalent with the terms); a WebSub hub link *Its bytes were the same across our five reads between 02:14 and 02:27 UTC (its updated stamp read 02:05): the feed is rebuilt from time to time, not on every request. Fewer entries than the JSON has messages (122 against 191 at the same minute): it appears to leave out what has expired (our reading, not MeteoAlarm's statement).* | https://feeds.meteoalarm.org (the feed list) |
| `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-{country}/subscribe` | none | not read | the WebSub subscription page for a feed (push instead of polling) | https://feeds.meteoalarm.org |
| `https://api.meteoalarm.org/edr/v1` | none | 200 (HTML by default) | the landing page of the OGC EDR API: links to the definition, conformance, collections, authentication, FAQ, changelog | https://api.meteoalarm.org |
| `https://api.meteoalarm.org/edr/v1/api` | none | 200, HTML (a Swagger UI: the page's 'swagger') | the API definition, shown in the browser *With a client that asks only for JSON (Accept: application/json) this and the other pages answered 406; without the header, HTML.* | the EDR landing page |
| `https://api.meteoalarm.org/edr/v1/conformance` | none | 200, application/json, 401 bytes | conformsTo: OGC API EDR 1.0 core, html, geojson; OGC API Common 1 and 2; WMO WCMP2 core; WIS2 publisher | the EDR landing page |
| `https://api.meteoalarm.org/edr/v1/collections` | none | 200, application/json, 3,855 bytes | one collection, `warnings`: "Warnings issued by the MeteoAlarm Members. Only the 'locations' data query is supported." Custom parameters: active (ISO 8601 intervals; its examples start at 2024-01-01), language, awareness_type (14 hazard codes), awareness_level | the EDR landing page |
| `https://api.meteoalarm.org/edr/v1/collections/warnings` | listed as public | not read | the collection's description | the authentication page's list of public endpoints |
| `https://api.meteoalarm.org/edr/v1/collections/warnings/locations` | a token: 'Authorization: Bearer' header, or a 'token' query parameter | 401 {"error":"Unauthorized"} | the locations (countries) that can be queried | the collections document |
| `https://api.meteoalarm.org/edr/v1/collections/warnings/locations/{locationId}` | a token | not read (protected) | the warnings of one country as GeoJSON, real-time and archived: "The data is updated with a delay of 10 minutes and historical data can be queried" (EDR FAQ). Each feature links its CAP message as XML and JSON. *THIS IS WHERE HISTORY IS: a replaced message that the open feed has dropped should still be answerable here by time interval (`active`).* | the authentication page and the FAQ |
| `https://api.meteoalarm.org/edr/v1/metadata/warnings` | listed as public | not read | metadata of the warnings collection (also a WCMP2 record: /edr/v1/metadata/WCMP2-record-eu-eumetnet-warnings.core.weather.advisories-warnings.json) | the authentication page's list of public endpoints |
| `https://api.meteoalarm.org/edr/v1/authentication` | none | 200, HTML | how to authenticate, and which endpoints are public and which protected | the EDR landing page |
| `https://api.meteoalarm.org/edr/v1/faq` | none | 200, HTML | who the API is for (members and re-distributors directly; the public through MeteoGate), what it holds, the response format | the EDR landing page |
| `mqtts://api.meteoalarm.org (topics warnings-{countryCode}, warnings-ALL)` | username api, password a token | not connected | one GeoJSON Feature per warning as it is issued (a WIS2 notification: bounding box, links to the CAP XML and JSON and to the exact geometry, licence link CC BY 4.0) *Without registration: the same warnings are republished on the WMO WIS2 Global Brokers, topic origin/a/wis2/eu-eumetnet-warnings/data/core/weather/advisories-warnings, with the public credentials the page gives. Real time only, no history.* | https://api.meteoalarm.org/mqtt |
| `https://api.meteoalarm.org/metadata/v1` | "for re-distributors and integration partners" | 200, HTML (a Swagger UI) | hazard types, awareness levels, regions (with geometries), national services' logos, languages | https://api.meteoalarm.org |
| `https://api.meteoalarm.org/metadata/v1/storms` | none | 200, application/json, {"storms":[]} | a list of named storms; empty when read, in the middle of Storm Charles *Not in a document we read: the public website's own page calls it. Read once.* | seen: www.meteoalarm.org calls it when a page loads |
| `https://api.meteoalarm.org/hub/v1` | EUMETNET members only | 200, HTML (a Swagger UI) | where national services submit CAP warnings for validation and distribution. Not for us. | https://api.meteoalarm.org |

## Seen, not read

- `https://visservice.meteoalarm.org/api/v1/ (levels, regions, stream-buffers/live/frames)`: the service behind the public map; the website calls it with a reference time. Why not: not documented for re-use; the terms keep the site's Content (maps, design, software) for the participants. Left alone until Dinis or MeteoAlarm says otherwise.
- `https://cms-visualization.meteoalarm.org/api/v1/content-pages/{slug}`: the text of the website's pages (the terms page is one). Why not: we read the rendered page instead
- `https://devportal.meteogate.eu`: MeteoGate, EUMETNET's public data gateway: "Free access to the public", "Get your API key"; it offers the same EDR and the archive. Why not: needs an account and a key: Dinis's decision
