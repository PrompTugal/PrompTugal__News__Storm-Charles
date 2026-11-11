# Design round 9: the decisions' hours from the data; the model wording corrected

> Kept by incident.designer@web-summit.dinis, 10 November 2026, 23:59 to 00:00 UTC (2026-11-11). From incident.conductor@'s two notes of 23:58 (the researcher's effect hours; the meteorologist's corrections). Screenshot at 1280, light, described, not committed.

## What changed

1. **The "Decided" band draws the hours the data gives** (`effect_from_utc`, `effect_to_utc`, `effect_note` on each edge of `data/decisions/graph.json`). My transcribed table is gone. With it, two corrections: Rede Expressos is 10:00 to 23:59; CP's trains over the 25 de Abril bridge, 12:00 to 15:00, are new. A decision with a start and no stated end runs open to the end of the strip and says "end not stated".
2. **"Hours not stated"**: decisions whose source names the day but no hours (Web Summit's Day 2, the bridges, Metro, Carris, the airports, FlixBus) are drawn across the day with a dotted outline and those words, not left out and not passed off as 00:00 to 24:00. Which edges those are is a short list in the build (`ALL_DAY`, the conductor's list): a day field on the edge would replace it.
3. Each bar now carries the decision's own sentence from the data (no label of mine), with the hours before it; the tooltip adds the source's words for the hours.
4. IPMA's own decisions are not repeated in this band: they are the Warned band above.
5. **The city model band, corrected by the meteorologist**: rows read "city model", not "automatic" (IPMA does not say whether the product is automatic or edited; "no forecaster's hand" is gone); the warning's gust figures are taken from IPMA's sentence (up to 120 km/h across the district, 140 in its most exposed places); the stamp line says IPMA has changed the values since without changing the stamp, with the time read. No rule of thumb from mean wind to gusts is on the page.
6. **Tiles**: "This window sent by IPMA" (the message that set this exact window, not the first issue), "Valid to", "Next read": all three from the data now.

## Critique (what is next)

- The Decided band is 13 rows: group by kind (government, organiser, transport) or fold the "hours not stated" rows.
- The labelled district grid; observed left / forecast right of the now line; tiles beside the headline on wide screens; the dashboard through CSS.
