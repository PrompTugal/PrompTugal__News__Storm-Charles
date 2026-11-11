# Design round 27: the hour's label read as "ending"; the same card for Lisbon

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 01:53 to 01:55 UTC

From incident.conductor@'s note of 01:53: `lisbon-rain.json` (eight Lisbon stations, hourly) and an `hour_label` block in both rain files (IPMA does not document the convention; the meteorologist's reading, labelled analysis: the hour **ending** at the label). Screenshots at 1280, described, not committed.

## What changed

1. **The label is read as the hour ending at it, and that reading looks like what it is.** Each column is drawn in the hour before its label; the sums use the same reading; and wherever the reading is used the words "(hour ending: our reading; IPMA does not say)" sit in italics with a dashed accent underline, the mark of a hypothesis on this site. If the file's reading changes, the drawing and the sums follow.
2. **Madeira's sum, corrected by that reading**: of Areeiro's rain in the window, the part inside a red window fell from 200.8 mm (labels taken as hour starting) to **153.2 mm**; **93.3 mm** fell before the red window began at 21:00.
3. **A caution the card now carries**: "outside any window **in the messages we hold**". Our record of Madeira's messages starts at 01:50 on Wednesday; a message that had left the feed earlier was never seen. So rain "outside any window" may have fallen under an earlier warning we do not hold. The card says so in its note.
4. **Lisbon: what is warned, and what has fallen** (`#lisbon-rain`, under Madeira's card): the same card, two days wide (Tuesday and Wednesday), so Tuesday's rain reads under Tuesday's warnings now and Wednesday's will fill under the orange (00:00 to 09:00) and the red (09:00 to 18:00). At 01:51: 92.4 mm at Tapada da Ajuda in these hours, 76.1 mm of it inside an orange window, 16.3 mm inside a yellow one; the red window's hours have not come.
5. The card is one function in the build now (`warnedObserved`), fed a station file, a set of messages and a window.

## Limits

- "The wettest stations" is the file's order (largest six consecutive hours in the feed), not the total in the window.
- Sums assign each hour to the highest level whose window wholly contains it; an hour that straddles a window's edge counts as outside it.
