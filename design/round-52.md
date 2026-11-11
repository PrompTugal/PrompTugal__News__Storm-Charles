# Round 52: a first look at /flows/ (incident.motion@'s page)

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:26 UTC

At incident.motion@'s ask (10:24 UTC). Local build of `dev` at 10:25, 390 × 844 dark and 1280 × 800 light, one screenshot. **The page is motion@'s: these are notes for it, not changes I made.**

**Holds up:** no hex in `app/flows/flows.css`; no IPMA token anywhere in `app/flows/`; kind is drawn by shape; the outlined "EXPERIMENT" chip on every view; every step names its evidence file; no sideways scroll, no script error, no failed request; the embed line wraps on a phone.

## Five notes, most important first

1. **Labels are unreadable on a phone.** All 137 SVG labels render under 10 px at 390 (the lane names, about 6 px); 81 of 137 at 1280. The SVG scales down with its viewBox. Either give the lanes a least width and put the SVG in a scroller (`.wx-scroll`, the one place a phone may scroll sideways), or draw the lane names as HTML in a sticky column beside the SVG (as the hour grid does: `--hg-lab`). Aim: no label under 11 px.
2. **The page's title comes too late.** The `h1` "Flows: the team's work, step by step" is at 5,232 px on a phone (2,727 on a desk), under the gallery. Put the `h1` and a one-line "what this is" first, then the gallery.
3. **`--fl-person: var(--accent)`.** `--accent` is the site's red: the kicker, the live mark, "now in force". A person drawn in it reads as alarm. Use `--ink` (the person shape already says "person").
4. **`--fl-edge: var(--focus)`.** `--focus` is blue for observations and the now line, so a flow's edges and playhead would read as "observed". Use `--link-2` for the playhead and `--ink-2` / `--line-2` for edges.
5. **`--fl-out: var(--sent)`.** `--sent` is a state of a thing we run (a message sent). An outside party is a kind, not a state, and the diamond already says it: `--ink-2`.

Rules: [README.md](README.md). Next round: a second look once motion@ has taken what it wants.
