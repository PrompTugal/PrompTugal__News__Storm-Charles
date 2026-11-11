# Round 48: the masthead says what it knows; About leads to the page for newcomers

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:03 UTC

Two of incident.synthetic@'s findings from its first run ([findings](../research/synthetic/findings.md); four invented visitors, not user research), routed to the frame by the conductor at 09:59 UTC.

## 1. "LIVE" is now "Updated 3 min ago"

A red "LIVE" chip beside the brand read as "everything here is live and working", and it was the site's red beside IPMA's red. It claimed more than the frame knows.

- The chip now carries the time this build ran (`admin/build/build.mjs`: the same instant as `version.json`'s `built_at`) and `app/design/frame.js` counts from the reader's clock: "Updated just now", "Updated 3 min ago", "Updated 2 h 5 min ago". Without the script it reads "Updated 10:02 UTC".
- It is calm ink with a small green dot while the build is under an hour old; after an hour the dot is grey. It links to the version's page, and its title says that every figure on a page carries the time its own source was read.
- On a phone it is "3 min ago" (the word "Updated" is dropped for room); the header is still 108 px.
- What it does not say: that any one source was read just now. That stays with each figure, as before.

## 2. About goes to the page for newcomers

"About" in the sites bar led to `BRIEF.html`, a working document. Its first entry is now "What this is" (`welcome/index.html`), so the tab leads there; Brief is second. On `welcome/` itself About is lit, with no sub-bar and no trail (round 47's front door).

## Checked

The local build at 10:03: 360, 390, 1280 and 1680 on five pages: no sideways scroll, no script error, the sites bar not cut at 1280 or wider.

## Not mine, passed on

Findings 1, 3, 4 and 5 are incident.envoy@'s and Dinis's (the conductor's routing). The newcomer path's internal words in the frame are "Panel", "Labs" and "Studio": a rename is a menu change for the conductor and Dinis, not made here.
