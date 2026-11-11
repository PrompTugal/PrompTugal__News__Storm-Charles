> Kept by incident.conductor@web-summit.dinis, 2026-11-11, 11:43 UTC

# What Watchfloor's decision brief holds (a model to learn from)

Dinis received it in a messaging group at about 11:45 UTC on 11 November and shared it with the conductor: **Watchfloor (Notamy Ltd), "Storm Charles · Portugal and Madeira", decision brief WF-PRT-20261110-CHARLES, edition 1, as of 07:49 UTC, 11 Nov 2026**, 7 pages, "written for government and institutional decision-makers", "offered to Lisbon, with thanks for its hospitality to Web Summit". Live version named in it: crisis.notamy.app. The PDF itself is not in git: it is their work and a binary. This file describes its **shape and data points**, in our words, so the team can learn from it and find what we lack. Quote it only in short excerpts with credit; never copy its figures as ours: read each at its own source.

## Its shape (what makes it work)

1. Page 1: masthead, "Not an official warning: IPMA issues the warnings and ANEPC the instructions", document id, edition, as-of time and when the next edition comes. A bold three-line lead (who is under red, how many people, the worst cases cited, "a lull, if it comes, is part of the storm"). One big annotated map (warning levels by district, the storm centre's track from two model runs, ensemble crossings, IPMA's communiqué band, the press's wording). "What to watch, hour by hour" in two columns. A QR code to the live version.
2. Three scenarios for Lisbon's afternoon (north / near / south of Lisbon), each with a share of the 50 ECMWF ensemble forecasts ("shares of forecasts, not the chance of it happening") and the signs to watch at an IPMA station.
3. "What the authorities have decided" box; exposure and timing by scenario.
4. **Assessment table: sources compared, with confidence levels**: rows (peak window, crossing, wind strength, sea and tide, rainfall, Madeira, end of event) × columns (official sources; models; observations/press/precedents; agree or differ; assessment; confidence HIGH/MEDIUM/LOW).
5. Madeira section: zones, people, red/orange hours, movement (flights, ferries, schools).
6. The storm hour by hour: small multiples (map every 3 h with people under red); a grid "people under each level, hour by hour" by district; model wind under each warning area against the warning window.
7. Who is exposed, district by district: people, red hazard and hours, orange, aged 65+; Lisbon metro area municipalities (people, aged 65+, land 0.5–5 m above sea level); Madeira municipalities; "estimates and how they are made".
8. Lisbon sector by sector: 49 squares of 2 km with residents, public hospitals named, land 0.5–5 m; tides (high water times and heights); movement (bridges, tunnels, coaches, ferries, trains).
9. Annex: precedents (Leslie 2018, Elsa 2019, Kirk 2024, Martinho 2025, Kristin 2026: highest gust, incidents, customers without power); "what a forecast grid cannot show"; how the brief is made; where every figure comes from, by topic.

## Data points and the open sources it names (for incident.datascience@'s gap map)

- Warnings: IPMA's warnings page, MeteoAlarm feed, IPMA open data (we have all three).
- Models: ECMWF open data (IFS ensemble, 50 members, AIFS; CC BY 4.0); an experimental AI forecast (WeatherNext 3). We have MET Norway and IPMA's model, Open-Meteo on /broadcast/.
- People: Kontur Population (Nov 2023 grid) on MeteoAlarm's warning areas; INE Census 2021 (aged 65+, under 15). We have none.
- Ground: Copernicus DEM GLO-30 (land 0.5–5 m); Mapzen Terrain Tiles. We have none.
- Facilities: OpenStreetMap (ODbL) hospitals and health facilities. We have none.
- Tides: Instituto Hidrográfico, Tabela de Marés 2026 (Lisbon, Cascais, Funchal). We have none.
- Power: E-REDES customers without power (via press). We have none of our own.
- Incidents: ANEPC counts (via press); Madeira's Regional Civil Protection. We have press counts.
- Precedents: past storms' gusts, incidents, outages. We have some in analysis.md.
- Movement: Lusoponte, tunnels, Rede Expressos, Transtejo, CP, Carris, ANA/TAP (press). We have the decisions and now /transport/.

Credit: Watchfloor (Notamy Ltd). Contact named in the brief: theirs, not copied here.
