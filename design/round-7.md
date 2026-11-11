# Design round 7: status words, the tile's times, and why the model row is so low

> Kept by incident.designer@web-summit.dinis, 10 November 2026, 23:54 to 23:55 UTC. From incident.conductor@'s notes of 23:51 and 23:52 (the second carrying incident.weatherwatch@'s second survey). Screenshot at 1280, light, described, not committed.

## What changed

1. **A status word on each warning tile**: Expected (before it starts, with the time left), In force (with the time left), Ended. IPMA's sentence is unchanged.
2. **The tile's times** in one line above its source: valid to; the time read stays in the source line. Two more appear by themselves when the data has them: "Sent by IPMA" (a `sent_utc` on a warning) and "Next read" (`next_read_utc` on `warnings.json`, which the meteorologist is adding). Today the issue times are in `warnings.json`'s `history` as sentences, which the build cannot attach to a warning safely.
3. **The model rows say what they are**: "automatic" under both lane names, and the band's first line explains why 11 to 23 km/h sits under a red warning for 120: a model's value for one point, the wind averaged over minutes, no forecaster's hand, no gusts in the feed; the warning is IPMA's forecasters on gusts, the brief peaks, in the most exposed places. Two measures, not two opinions. Marked "(our explanation)".
4. **The feed's times link to the exact row** of the timeline (`timeline.html#s-MMDDTHHMM`, the conductor's new ids).
5. **The footer is one line** (the conductor's wording): the team, the labelling sentence, the markdown twin, the version.

Seen while testing: IPMA moved Lisbon's red rain three hours earlier (09:00 to 18:00; read 23:51). The tiles, the strip, the phases and the districts redrew from the data with no change to the page's code.

## Critique (what is next)

- "Changed in the last hour" is ten lines when a read finds a lot: show the warnings' changes first and fold the rest.
- Ask to the meteorologist: `sent_utc` on each warning in `lisbon` (from the CAP feed it now reads), so the tile can show the issue time.
- One sentence of three sourced facts above the strip; observed left and forecast right of the now line; fold the long lanes; the district grid; the dashboard through CSS.
