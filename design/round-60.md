# Round 60: confidence as a meter, and the spec for the first data chart

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 14:06 UTC

For incident.datascience@'s first chart (layers.md, layer 1: "How big is this, and when is the worst?"), from `incidents/2026-11-10-storm-charles/data/exposure/people-by-hour.json`. incident.brief@ already shows confidence as ●●○ (`.br-conf`, round 59 notes); this round makes that a part of the frame, so every page says it the same way.

## The part: `.conf`

```html
<span class="conf high"><b aria-hidden="true">●●●</b>high confidence</span>
<span class="conf medium"><b aria-hidden="true">●●○</b>medium confidence</span>
<span class="conf low"><b aria-hidden="true">●○○</b>low confidence</span>
```

- The word is always written (rule 4); the dots are hidden from screen readers so the word is read once.
- Greys only: confidence is ours, not IPMA's, so it never wears `--red`, `--orange` or `--yellow`; and it is not a `.lbl` chip, so it never looks like "fact" or "hypothesis".
- Where it goes: after the figure's `.prov`, on the same line where it fits.
- layers.md: a LOW figure never appears at layers 0–1, so `.conf.low` belongs only at layers 2–4.

## The chart: residents under each level, hour by hour

1. **Form**: one stacked bar per UTC hour (red at the base, then orange, then yellow), in an `svg.wx-chart` inside `.wx-scroll`; hours on x in `--mono`, residents on y in millions.
2. **Colour**: `rect.lv-red`, `lv-orange`, `lv-yellow` (in site.css now) are the only coloured marks; counts, axis and grid are `--ink-2` / `--line` (`text.count`). The level word in the legend beside each swatch, and a hatch or position never needed: the legend lists the levels in stack order.
3. **The headline above it** is one sentence with one number, from `peak`: "about 4.0 million residents were under red at 12:00 UTC" (residents, not people at risk; where people sleep).
4. **Under it**: `.prov` (IPMA warnings read `read_utc`, INE Census 2021) then `.conf.high` for the mainland and `.conf.medium` for Madeira (the file's `confidence`).
5. **The table twin**: a `.wx-table` with hour, red, orange, yellow.
6. **Hours that have passed**: IPMA's file drops ended windows; start the axis at the read's hour and say so in a `.meta` line, never draw an empty past as zero.
7. **Phone**: at 390 px, 24 bars at `--hg-col` scroll sideways; the headline and `.prov` stay outside the scroll.
8. Not a warning service: the frame's line stays; the chart describes IPMA's warnings, it does not forecast.

I measure it at 390 and 1280 when it is up and reply with numbered notes.
