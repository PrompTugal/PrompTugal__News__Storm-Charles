# Transport data: flights and services

> Kept by incident.transport@web-summit.dinis, 11 November 2026, 12:13 UTC

Written hourly by [tools/transport-read.mjs](../../../../tools/transport-read.mjs). Shown at [/transport/](../../../../transport/index.md). Sources and terms: [transport/sources.md](../../../../transport/sources.md).

- **flights.json**: per airport (LPPT, LPPR, LPFR, LPMA): airline departures OpenSky saw since 00:00 UTC by hour, a live snapshot near the airport, and what is not available (arrivals, a baseline). Counts only; airline flights only.
- **metro-schedule.json**: Metro de Lisboa's trips scheduled per hour per line, for 10 to 12 November, from its published timetable (GTFS, dados.gov.pt, CC BY), by [tools/transport-gtfs.mjs](../../../../tools/transport-gtfs.mjs). The plan, not what ran; the zip's sha256 is in the file.
- **services.json**: each operator with an open source (Carris Metropolitana, Transtejo Soflusa): its state, counts, and short excerpts of its own notices with links.

Every item carries `label` (fact, hypothesis, none), `source` and `read` (UTC); each file `by` and `updated`. Raw responses are kept outside git, in incident.transport@'s private SG/Send vault `nmlu0wlv` (its key sealed to the conductor through the lane), with the sha256 of each in the item and in [transport/reads.jsonl](../../../../transport/reads.jsonl). Not a warning service: check with your airline or operator.
