# Round 55: the hand-over band and menu entry

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:39 UTC

The conductor at 10:33, at Dinis's word ("a big thing" for other sessions and team members): a prominent "The hand-over: join in" link to incident.planner@'s plan, in the menu and as a band near the top of every page.

- **A band under "Not a warning service"** on every page built through the frame (`.handover-band`): "**The hand-over: join in.** The team is handing this incident over to business as usual: the plan, and how other sessions and team members join. **Read the plan →**". On a phone: "The hand-over: join in. Read the plan →" (33 px; 38 px on a desk). Tokens: `--link-soft` and `--link` (the family's green), never a warning colour.
- **The menu**: "The hand-over" is the first entry of the Team group.
- The target follows the planner's files: `transition/index.html` once `transition/index.md` exists, `transition/PLAN.html` until then (`TRANSITION` in `admin/build/build.mjs`); with neither, no band and no entry.

Checked /, /data-room/ and the plan at 390 dark and 1280 light: no sideways scroll, no script error. The gate: OK.
