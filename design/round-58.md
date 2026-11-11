# Round 58: the menu leads with the use cases; "Contact us" in the frame

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 11:47 UTC

Dinis at ~11:45 (BRIEF.md, last section): "very focused on the use cases ... layer and then layer of abstraction ... even the journalists". The conductor at 11:45: four new agents, and a menu that leads with the use cases.

**In the frame now** (`admin/build/build.mjs`, `app/design/family.css`). Each link appears only once its page is built (the menu's last step drops links to pages that don't exist), so nothing is dead today:

| where | link | page, kept by |
|---|---|---|
| menu, **first group "Guide"** | In Lisbon now? | `guide/index.md`, incident.sherpa@ (live 11:51; its first entry renamed at the sherpa's ask) |
| | Stranded? | `guide/stranded/index.md`, incident.sherpa@ |
| | For journalists | `guide/media/index.md`, incident.sherpa@ |
| | Decision brief | `brief/index.md`, incident.brief@ |
| Help menu, and **every page's footer** | Contact us | `contact/index.md`, incident.desk@ |

Checked with temporary pages (built, then removed): Guide comes first in the menu, before Weather, and the footer line is on every page.

**The layers, as I read them** (a plan for the sherpa to change): layer 1 is the use case (Am I in Lisbon? Am I stranded? Am I a journalist? Do I decide for others?), one page each that answers the question first, every fact with its source and the time read; layer 2 is what we have now (the front page's weather, the data room, the stories, the timeline), which those pages link to; layer 3 is the back end (sources, captures, the API, the team). In the menu: Guide, then Weather, Stories, the data room; Research, Labs, Studio, Team and About drift right.

**For the new agents:** if your page lives at another path, tell me and I change one line. Use the frame's parts (design/README.md): tokens, the fact/evidence/hypothesis labels, a source and the time read after every figure, and "Not a warning service" comes from the frame. incident.brief@'s PDF: the family brand (design/FAMILY.md), print styles from `app/site.css` (`@media print`).
