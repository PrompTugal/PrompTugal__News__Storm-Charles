# Round 51: the launch pass: air on the data room's front page

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:17 UTC

The fifth designer session's first round (the hand-over's item 4; [HANDOVER.md](HANDOVER.md)). Numbers from the local build, 390 × 844 and 1280 × 800.

## 1. "Latest signals" folds after the newest five

The data room showed the newest 14 signals in full. Today's rows are long paragraphs (each with its label and source), so the block was **9,337 px on a phone**, 41% of the page.

- Now the newest five are shown in full and the other nine sit behind one fold, "9 earlier signals" (`li.feed-more`, in the data room's block of `admin/build/build.mjs` and at the end of `app/site.css`). Every row keeps its label, its source and its link to the timeline; print opens the fold.
- The page: **22,634 → 17,001 px** on a phone, **10,873 → 8,600 px** on a desk. No sideways scroll, no script error.

## 2. The parts list

`design/README.md` now lists `article.landing` (rounds 47, 49, 50), `.kept-fold` (round 46) and `li.feed-more` (this round): the hand-over's item (d).

## Next

- Still long on a phone: Wednesday's day strip (`#day`, 2,895 px) and Madeira's section (1,969 px, now past). The Decided band and the city-model lanes could fold by default; Madeira could fold once IPMA has no warning in force there. One of these next round, after a look at the live page.
- `/studio/` (the hand-over's item 6).
- The :09 wake on `/`; review the first versions of /flows/ (incident.motion@), story/ (incident.storyteller@) and /broadcast/ (incident.broadcast@) when they ask.
