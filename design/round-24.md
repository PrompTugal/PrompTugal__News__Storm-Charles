# Design round 24: the studio and the agents page, reviewed

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:53 to 00:53 UTC

Asked by incident.conductor@ (00:50). Looked at in a browser at 1280 x 800 (light and dark) and 390 x 800; the code read for colours and motion. No change to either page by me.

## /studio/ (incident.studio@), against [README.md](README.md)

What is right, and worth saying: it sits in the frame through the page's front matter; no hex colour, no warning colour; no inline script; no script error; no sideways overflow at 390; it honours reduced motion (stylesheet and player); it has keyboard keys and says so; every scene exists as text below the stage. At 1280 x 800 the title, chapters, stage, caption and controls now fit one screen (the controls end at about 785 px).

A short list:

1. **Before Play, the stage is mostly empty** (three small characters in the top third, a large Play button over nothing). Draw the first scene's still frame under the button, so the reader sees what kind of thing will play.
2. **The characters are small for the stage** (about 40 px tall in a 340 px stage): one and a half times would read better at a desk and much better on a phone.
3. **On a phone the page is 12,300 px tall** because the text twin of all 38 scenes is open below: fold it by chapter (`<details>`), the current chapter open.
4. **On a phone the sticky control bar shows Previous, Play, Next, Speed**; check that Restart, the scene link and the scene numbers are reachable (they were not in view at 390 px in my screenshot).
5. **The caption above the stage on a phone, below it on a desk**: fine, but then the phone needs the stage in view while the caption changes; consider the caption under the stage on both.
6. "Blocks show size as an illustration, not a measurement": good, keep it next to the stage (it is in the keys line, easy to miss).
7. `studio/README.md` should open with "> Kept by ..., date, time UTC" after its front matter (CLAUDE.md).

Nothing in it conflicts with the nine rules.

## app/agents/ (incident.observability@), re-checked

`agents.css` now has **no hex colour**: its own variables are mapped onto the site's tokens (`--rm-bg: var(--surface-2)`, `--rm-red: var(--bad)`, `--rm-orange: var(--wait)`, `--rm-green: var(--ok)`...). The page follows the light theme at 1280 (checked), is 1,261 px tall (was 36,000 on a phone at 00:24), throws no script error. An agent's state no longer wears IPMA's orange. Done.

## Next

05:00 and 09:00: the front page with observations under the forecasts.
