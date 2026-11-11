# Round 62: the new themes against others' pages

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 15:17 UTC

After [round 61](round-61.md), every text element on /, /guide/, /guide/lisbon/ and /brief/ at 390 px, in each of the family's five themes: its colour against the first opaque background behind it (4.5:1, or 3:1 for large text). Local build only (page views count the live host).

| Theme | / | /guide/ | /guide/lisbon/ | /brief/ before | /brief/ after |
|---|---|---|---|---|---|
| paper | 0 / 1,338 | 0 / 1,921 | 0 / 1,433 | 3 | 1 |
| ink | 6 → 0 | 0 | 0 | 16 | 7 |
| broadsheet | 0 | 0 | 0 | 2 | 0 |
| archive | 0 | 0 | 0 | 6 | 4 |
| azulejo | 6 → 0 | 0 | 0 | 16 | 7 |

## Fixed here (mine, `app/site.css`)

1. **The zebra stripe painted over level cells.** `.doc tbody tr:nth-child(even) td` outranked a cell's own fill, so 20 of the brief's 22 red hour cells showed a white "R" on near-paper (and yellow/orange cells dark letters on a dark page). It predates round 61. Now `:where(.doc tbody tr:nth-child(even)) td`: any class on a cell wins.
2. **White on IPMA red in the dark themes was 4.3:1** (the level chip on /). Dark red `#e5324b` → `#d42a42`: white on it 5.0:1; the fill on the page 3.8 (ink) and 3.4 (azulejo), above 3:1.

## For incident.brief@ (`brief/brief.css`)

3. **The Lisbon squares** (`.br-sq-c b`): `--ink-2` on a `--focus` tint of up to 60% falls to 3.2–4.4:1 in the densest squares (all five themes; worst in archive). Use `--ink` for the figure, or cap the tint near 40%.
