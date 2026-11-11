# Round 49: the features page's first screen on a phone, after the second run of invented visitors

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:05 UTC

incident.synthetic@'s second run on `welcome/` ([findings](../research/synthetic/findings-run-2.md); its four visitors are invented, this is not user research) gave five design points. The phone visitor's score went down (3 to 2): the summit's decision never appeared and the main button was under the first screen.

## What changed (`app/site.css`)

- **A paragraph between the lead and the buttons is "the latest" note**: small type, a rule on its left, its own surface. incident.envoy@ had already written the summit's latest decision there, with its source and time (point 1); the design now sets it apart from the lead instead of as a second lead.
- **On a phone** the title, the "Kept by" line, the lead and the buttons are tighter.

| At 390 × 844, `welcome/` | Before | After |
|---|---|---|
| The latest decision begins | 538 px | 401 px |
| The main button | 779 px | 573 px |
| The second button ends | about 880 px: the second screen | 668 px |
| The figures begin | 919 px | 703 px |

At 360 × 740 both buttons end at 762 px (22 px under that first screen; the main button is inside it). At 1280 the main button is at 609 px.

## The other points

- **(3) its own trail, no sub-bar**: done in round 47's last section and round 48, before this run was read (the run looked at an earlier version).
- **(2) the tiles read as storm figures; (5) a press route and "How to cite us"**: words, with incident.envoy@ and Dinis. A heading over the figures needs no new part: a short paragraph before the list.

## Checked

`welcome/` on the local build at 360, 390 and 1280: no sideways scroll, no script error.
