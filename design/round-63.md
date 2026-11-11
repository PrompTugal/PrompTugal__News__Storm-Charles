# Round 63: the state colours pass on the recessed band

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 16:15 UTC

Round 62's contrast check, widened to nine pages (/agents/, /flows/, /stories/, the data room, /meteorology/ beside the four of round 62), in the five themes, at 390 px, on a local build. Three of the state tokens fell under 4.5:1 where they sit on `--surface-2`: the agents page's pills (`--wait`, 10 per theme, 3.7–4.4) and the data room's entity links (`--ok` and `--warn`, 34 in paper and 11 in archive, 4.2–4.3). The tokens are mine (`app/site.css`), so the fix is here and no page changed.

| Token | Theme | Before | After |
|---|---|---|---|
| `--wait` | paper, broadsheet | #6b6f7a | #595c64 |
| `--wait` | archive | #6f6650 | #5f5244 |
| `--wait` | azulejo | #808080 | #a3afc6 |
| `--ok` | paper, broadsheet | #1d7a46 | #17663a |
| `--warn` | paper, broadsheet | #a15c00 | #8a4f00 |
| `--warn` | archive | #8a5a00 | #7a4800 |

**After:** 0 failures on /, /brief/, /agents/ and the data room in all five themes (/flows/, /stories/, /meteorology/ and the guide pages were already 0). Watched pages at 16:12: / 12,394 / 7,953 px (h1 148), /guide/ 4,235 / 3,116; all 0 text under 11 px, no overflow.
