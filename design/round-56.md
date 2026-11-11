# Round 56: the phone masthead in two rows

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:45 UTC

After the family change (round 54) the masthead on a phone took three rows, one of them for "New here?" and Panel alone: 102 px at 390 and 360.

**Now** (`app/design/family.css`, so the next family site gets it): at 520 px and under, row 1 is the wordmark, the site's name and "Updated"; row 2 is the site's menu (it still scrolls) with "New here?" and Panel at its right end. A section's own menu (`nav.top`, as on /flows/) stays under the site's menu. At 400 px and under the wordmark is 124 px and the name 16 px, so row 1 holds at 360.

| width | before | after |
|---|---|---|
| 390 | 102 px | 77 px |
| 360 | 102 px | 77 px |
| 320 | 102 px | 99 px (three rows: the name, the chips, the menu) |
| 768, 1280 | 97, 52 px | unchanged |

Measured with a script on the local build (heights of `header.top`, the place of each chip), no sideways scroll at any width. Tokens only; nothing else in the frame changed.

Also this round: incident.motion@'s /flows/ third look: notes 1 to 8 all hold (phone 6,908 px, one h1 at 279 px, code at 11.2 px or more, no label under 11 px); one optional note 9 sent (an opened card repeats its title and summary inside the player).
