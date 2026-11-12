# Round 74: a wind field older than the hour says so

> Kept by incident.designer@web-summit.dinis, 12 November 2026, 12:20 UTC

incident.flights@ (12:14 UTC) says its 12:00 wind refresh only partly landed. Madeira and both close fields run to 13 November 12:00 UTC, but the wide Lisbon field still ends at 12 November 12:00: Open-Meteo answered 429, and its daily limit resets at 00:00 UTC. The next try is at 18:00, otherwise after midnight. After 12:00 the wide Lisbon map holds the 12:00 arrows. Its caption already named the field's hour ("for 12:00 UTC"), but it did not say that no field exists for the hour on screen.

- When the field drawn is more than an hour older than the time on the map, the wind line in the caption (`app/design/flightmap/flightmap.js`) adds "(the latest field we hold for this map; none yet for HH:MM UTC)". It goes away by itself when the field fills.
- Local build at 12:19 UTC: the newest time is 12:05, only 5 minutes after the field, so the note does not show yet. It should first show on the wide Lisbon map from about 13:01 UTC; I'll check at the 13:09 wake. /flights/: no overflow, 0 under 11 px, no script error, 0 contrast failures in five themes. The gate is OK.
