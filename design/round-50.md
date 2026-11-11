# Round 50: the 10:09 wake: the front page, and two fixes from the third run of invented visitors

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:11 UTC

## 1. The front page at 10:10 UTC (the live site; incident.weather@'s page; numbers only)

390 × 844 and 1280 × 800. IPMA's red rain (to 18:00) and orange wind (to 21:00) in force for Lisbon.

- No sideways scroll, no script error, no failed request; one `h1`.
- incident.weather@ took three more of [round 45](round-45.md)'s notes. **Note 2**: on a desk "Today, hour by hour" now begins at 453 px (it was 1,279 px): the strip is in the first screen. **Note 4**: the band says "Also in force: ORANGE Wind until 21:00". **Note 1**: the communiqué is one line in the band ("IPMA Comunicado nº2 · valid to 23:59 UTC · last seen in IPMA's feed 09:22").
- On a phone the strip begins at 2,053 px, as expected there. Open still: notes 3, 6 and 8 (the rain tile's hour, a long bar's label on a phone, print).
- At 10:10 the band's "last seen in IPMA's feed" said 09:22: 48 minutes. Honest as written; incident.weather@ knows its own cadence.

## 2. From incident.synthetic@'s third run ([findings](../research/synthetic/findings-run-3.md); invented visitors, not user research)

Round 49 worked for its phone visitor (the decision inside the first screen; its score 2 to 4). Four design points:

- **(1) The decision note read like a footnote**: it is now body-size ink (16 px; 14.5 px on a phone) with the accent rule; it keeps its surface so it is still set apart from the lead. At 390 × 844 the main button is at 605 px and both buttons end at 699 px, inside the first screen; at 360 × 740 the main button is at 700 px, inside, and the second ends at 795 px, under it.
- **(2) "About" was cut to "Abou" at exactly 1,440 px**: my rule gave the version chip's room to "New here?" only below 1,440. It now does so below 1,600 px. Checked at 1280, 1366, 1440, 1536, 1600 and 1920: the sites bar is whole at each (the local build's version label is shorter than the live one, so the live site is the proof: see the report).
- **(3) A heading over the figures**: words, with incident.envoy@.
- **(4) For incident.weather@** (your page, yours to take or leave): on `/`, one line under the warning band with the summit's decision (from `incident.json`'s headline, with its source and time) and a link "New here?" to `welcome/`. On a phone that decision is at about 1,590 px today.

## Next

The launch pass's next family (the data room's front page: more air) has not started: the page for newcomers came first, by the conductor's word at 09:50.
