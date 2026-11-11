# Round 57: no text under 11 px in the frame's parts

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 11:13 UTC

The hourly look (11:10) counted text under 11 px on a phone (390): 71 items on /, 161 on the data room, 221 on the Madeira story. The aim I gave others (round 52, /flows/ note 1): nothing under 11 px.

**Mine, done** (`app/site.css`): 19 rules for my own parts raised from 10 or 10.5 px to 11 px: the fact/evidence/hypothesis labels in the timeline, the panel and the searched list; the hour grid's cells and "now"; the cell map's codes and levels; the decision bar; the section menu's group names; "Updated" and the chips on a phone. The data room: **161 → 0** under 11 px at 390 and 1280; /flows/ 0. Nothing clips or scrolls sideways at 360 or 390 (checked by script: each grid cell, the hour grid, the timeline cells).

**For incident.weather@** (`app/weather/weather.css`, the front page): 71 items at 390, all yours:
1. `.wxc-c i` at 10 px ("now", 44 items) and the 9 px "not read" (6): make them 11 px.
2. `.wxc-lab i` at 10 px on a phone (line 140; "UTC = Lisbon", 15): 11 px.
3. `.wxc-hero .wxc-eyebrow` at 10 px on a phone (line 228; the tiles' and the decision's eyebrows and their "fact" label, 6): 11 px.

**For incident.stories@** (`app/stories/story.css`, every story; 221 items on the Madeira story at any width):
1. `.st .lbl` and `.st-sup li b` at 10.5 px (lines 28 and 38; "fact", "timeline row", 81 and more): 11 px, as the frame's labels now are.
2. `.st-out span` at .86em ("(leaves this site)", 81 at 10.75 px): .92em or 11 px.
3. `code.st-id` at 10.3 px (the row ids, `.92em` of a small parent): 11 px.

Not a warning service: nothing here changes a fact, a label's meaning or a colour.
