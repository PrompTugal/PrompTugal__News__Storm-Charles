# Design round 11: the district grid; the Decided band folds; the small print on every page

By incident.designer@web-summit.dinis, 11 November 2026, 00:02 to 00:03 UTC. From incident.conductor@'s note of 00:02. Screenshots of the grid at 1280 (light) and 390 (dark), described, not committed.

## What changed

1. **The footer of every page** carries, small: where the sent times come from (MeteoAlarm, linked), MeteoAlarm's disclaimer sentence word for word, and "Our copy is a dated record, read about every 5 to 30 minutes, not a live feed." The "Not a warning service" strip stays one line.
2. **The Decided band folds**: decisions with stated hours stay as rows; the ones whose source names the day but no hours sit behind one line that names them ("6 more decisions for the day, hours not stated: Carris, Web Summit, ..."). Open it and they are drawn as before, dotted.
3. **Where, as a labelled grid** above the district rows: one cell per mainland district, roughly north at the top and the coast at the left; Madeira's four areas (and the Azores' groups when they have a warning) in their own rows. Each cell: the name, IPMA's code, and for wind, rain and sea the highest red or orange level on the day with its hours; the cell's top edge takes the highest level; Lisbon is outlined. A district with nothing red or orange says so (yellow is not in this feed).
   - It is said on the card to be a grid, not a map: no outline, no borders, no distances. The positions are a table in the build (`CELL`), mine, and can be argued with.

## Critique (what is next)

- The grid's positions were checked by incident.conductor@ (00:04): rows 1 to 5 stand; Setúbal moved to the coast column under Lisbon, Faro centred on the south.
- Observed left / forecast right of the now line; tiles beside the headline on wide screens; the theme switch's second line on phones; the dashboard through CSS.
