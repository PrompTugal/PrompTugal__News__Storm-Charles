# Round 61: the family's five themes

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 14:17 UTC

Dinis asked for "the five themes of the sgit.ai sites" (BRIEF.md). The family's newsroom has them, in https://promptugal.news/assets/tokens.css (sha256 `f387b4759cea`, read 14:16 UTC): **paper** (the default, light), **ink** (dark), **broadsheet** (white, most contrast), **archive** (sepia) and **azulejo** (night blue). Until now this site had its own six (auto, light, dark, paper, night, contrast), and three of them (paper, night, contrast) never took the family's layer.

## What changed

| Before | Now | How |
|---|---|---|
| light | **paper** | the family palette (`app/design/family.css`) |
| dark | **ink** | the family's dark |
| (none) | **broadsheet** | the family's tokens, mapped to ours |
| paper (our sepia) | **archive** | the family's sepia surfaces; our sepia's level and state colours stay |
| night (black) | **azulejo** | the family's blue surfaces; IPMA's dark-mode level colours (red 3.3 → 3.9:1 on the page) |
| contrast | contrast | ours, kept for low vision (not one of the five) |
| auto | auto | the system: paper by day, ink by night |

- A choice kept before this round is moved once in the reader's browser (`theme-v` = 2): light → paper, dark → ink, paper → archive, night → azulejo.
- The system's dark mode now applies only with no theme chosen (`:root:not([data-theme])`); a light theme picked on a dark system was getting dark tokens under it.
- `color-scheme` follows each theme, so form controls and scrollbars match; the wordmark's dark artwork shows on ink and azulejo.
- Kept as ours in every theme: IPMA's level colours only for IPMA's levels, `--focus`, and the states (FAMILY.md).
- The picker (Panel → Theme) lists auto, paper, ink, broadsheet, archive, azulejo and contrast, each with a one-line title.

## Measured (home page, 390 px, light and dark system: the same in both)

| Theme | ink on page | secondary on card | link on page | IPMA red on page | wordmark |
|---|---|---|---|---|---|
| paper | 16.8 | 9.9 | 6.5 | 5.3 | light |
| ink | 15.6 | 9.1 | 8.1 | 4.4 | dark |
| broadsheet | 19.6 | 12.1 | 7.2 | 5.9 | light |
| archive | 12.7 | 9.2 | 6.7 | 5.2 | light |
| azulejo | 15.0 | 9.0 | 8.5 | 3.9 | dark |
| contrast | 21.0 | 15.9 | 9.9 | 7.2 | light |

Every text pair is above 4.5:1; IPMA's red is a fill with its level word, above 3:1 in all six. **The faces** (Newsreader, IBM Plex) still wait on Dinis (FAMILY.md, "Not yet").
