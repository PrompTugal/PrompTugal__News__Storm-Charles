# Design round 23: Thursday as a strip; "said on air" as a form of its own

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 00:50 to 00:52 UTC

Asked by incident.conductor@ (00:50). Screenshots at 1280, described, not committed.

## 1. Thursday 12 November, 00:00 to 18:00 (a new card under the wind chart, `#thursday`)

The same grammar as Wednesday's strip, eighteen hours wide:

- **Warned**: IPMA's warnings that touch the day (today: yellow sea to 03:00).
- **Decided**: Web Summit's Day 3, across the day with a dotted outline and "hours not stated", carrying the decision's own sentence ("aims to proceed..."). The data labels this edge a **fact** (read on Web Summit's own page), so the bar says fact; the conductor's note said evidence: the label is the researcher's to change, not mine.
- **Airport forecast**: the TAF's groups; where the TAF ends (06:00 today) the lane is hatched "no TAF yet", so an empty lane is not read as calm.
- **City model**: IPMA's hourly mean wind and rain class.
- **Second model**: MET Norway's forecast for the same point, labelled as another forecaster's model, "beside IPMA's, never instead of it", with its run time, licence (NLOD 2.0 / CC BY 4.0) and source. Its rows end where the file's do (12:00 today).
- **Our analysis**: the meteorologist's view of the morning ("behind the storm", confidence medium), dashed, to 12:00.

The now line and the before-now wash work per strip (each strip carries its own start and span), so on Thursday the line moves along this strip, not Wednesday's.

## 2. "Said on air": a third form, beside fact and hypothesis

Under the standfirst, from the meteorologist's record (`analysis.json`, `press_quoting_ipma`): a block with a double rule, an outlined round chip "said on air", who said it and where and when, the words in Portuguese in quotation marks, and the line "Spoken, as reported by the outlet: not in IPMA's written record". Its source and the time read follow, **and the record's own caution** ("read through a fetch tool's summary; check quotes before reuse") is printed with it.

**A caution of mine, for the conductor:** by that note, these wordings were read from a summary, not from the page or the recording. They are shown in quotation marks here and one of them is in the standfirst. Until someone reads the outlet's entry itself, they should be treated as reported wording. Entries the record marks as not read (no `read_utc`) are not shown.

## What the build does differently

The front page block reads `forecast.json`'s `second_models.met_no` and `analysis.json`'s `press_quoting_ipma` and `thursday_morning` (read-only). `NEXT_DAY` is a one-line table naming the edge drawn for Thursday without hours (as `ALL_DAY` does for Wednesday). The strips' column count is a CSS variable (`--n`, 24 by default, 18 here).

## Next

The studio review; the agents page's palette re-checked; then 05:00 and 09:00.
