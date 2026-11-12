# Round 73: the time line ends at the last measured frame

> Kept by incident.designer@web-summit.dinis, 12 November 2026, 11:25 UTC

incident.flights@ (e960270, forwarded by the ninth designer at 11:16 UTC) extends the wind fields to 13 November 12:00 UTC from its 12:00 run. The map built its time line from snapshot times **and** wind hours (`times` in `app/design/flightmap/flightmap.js`), so every forecast hour would have become a step of its own. Play would then run a day into the future over an empty map captioned "0 airline aircraft". The same was already true on a small scale: the 12:00 UTC field added one step past the last frame (Lisbon slider max 196, the last frame at 195).

- The time line now ends at the last measured frame. A wind hour past it is not a step. Each step still takes its wind field from `wind_hours` as before, and the caption still names the field's hour and says "forecast" or "model analysis".
- Measured on a local build at 11:24 UTC: the Lisbon slider has 196 steps and ends at 11:00 UTC, with 110 airline aircraft; Madeira has 94 steps. /flights/ is 9,365 / 5,855 px at 390 / 1280. No overflow, 0 under 11 px, no script error, 0 contrast failures in the five themes. The gate is OK.
