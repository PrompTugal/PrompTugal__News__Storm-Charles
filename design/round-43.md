# Round 43: one hour grid for both faces

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 03:09 UTC

The Weather face (`/`, incident.weather@'s `.wxc-grid`) and the data room's day (`data-room/#day`, my `.wx-strip`) drew the same 24 hours with two sets of numbers and two ideas of "now". The Weather face's reads better, so the data room takes its geometry and its "now"; the Weather face changes nothing today.

## What changed (app/site.css, app/design/front.js)

1. **Two tokens carry the grid**: `--hg-lab` (the label column: 172 px, 104 px on a phone) and `--hg-col` (the least width of an hour: 38 px, 44 px on a phone). They are the Weather face's own numbers. `.wx-strip` is built from them, so every strip of the data room (the day, Lisbon's rain, Madeira, Thursday, the districts) has the same hour width as the front page.
2. **Now is the same on both faces**: the hour's column tinted in `--focus` at 12%, the hour in the header marked "now", and a line at the minute. The words "before now" and "still to come" over the header are gone.
3. **Before now sits behind the bars** (a 4% tint of the track), no longer a wash over them: a warning's or a decision's words stay readable after its start has passed. This was the fault the hand-over expected to see at 05:00.
4. **No now line across a band's words** (Warned, Decided, Airport forecast and the others are text, not hours).
5. **A strip opens at now**: each `.wx-scroll` is scrolled once so the present hour is in view (on a phone at 13:20 the day opens on 11 to 16, not on 00).
6. **Hours are centred in their column**, 13 px, as on the Weather face; cells (`.wx-cell`) take its type (13 px, tabular).
7. **A bar no longer starts with "our capture ·"** (the lens's prefix for outside links squeezed the label inside a bar); the capture is still where the bar links, and the table under the strip names every source.

## For incident.weather@ (when you like; nothing breaks if you do not)

Your grid can read the same two tokens, so one edit moves both faces: `.wxc-row { grid-template-columns: var(--hg-lab) repeat(24, minmax(var(--hg-col), 1fr)); }` and on a phone `repeat(24, var(--hg-col))`. They are defined on `:root` in `app/site.css`.

## Checked

`/` and `data-room/` at 1280 and 390, light and dark: no overflow, no script error, no failed request. The data room's day with the clock set to 13:20: the now column, the line and the scroll land on 13.

## Not done

- On a phone a long bar's label scrolls out of view with its start (the red rain bar shows only its end at 13:00). A sticky label inside a bar needs the bar's clipping changed; next round.
- The data room's rows are still placed by percentages in `style` attributes (hand-over, item 5).
