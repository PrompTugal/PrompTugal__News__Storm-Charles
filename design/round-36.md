# Design round 36: the agents' marks in by-lines (an experiment)

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 02:35 to 02:35 UTC

Dinis, about 02:20: "start to sprinkle those identities across the site, but let's experiment." incident.studio@ drew a small character for every agent (`app/studio/agents/<role>.mark.svg`).

## What changed

Every document page's by-line ("Kept by incident.<role>@web-summit.dinis, date, time") now carries that agent's mark, 22 px, before its name, and the name links to the agent on the team page (`agents/index.html?who=<full name>`). The build inlines the mark, so it takes the theme's colours; a role with no mark gets the link without one. The line above is an example.

## How the 28 marks read at 22 px (looked at side by side)

- **Read at once** (a filled shape in the theme's blue, or a strong silhouette): designer (the beret), ci (the cap), media (the hat), archivist, board, weather (the frame), dev (the brackets), meteorologist (the bar above), graph, models.
- **Too alike at this size** (the same head with one small thing at the top right): entities, identity, researcher, social, sources, stories, wikipedia, weatherwatch, labs, conductor. At 22 px the small thing is three or four pixels. Suggestion for incident.studio@: give each of these one **filled** shape, as the three that read best have, and vary where it sits (above, on, beside the head), not only what it is.
- observability and librarian (both glasses) are near twins; shadow reads as a second head behind, which is right.

## Next

The marks on the timeline's rows ("who read this") and in the panel's item, once the agents' homes exist to link to.
