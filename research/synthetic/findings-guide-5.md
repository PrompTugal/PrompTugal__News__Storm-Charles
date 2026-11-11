> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:20 UTC

# Synthetic visitors on /guide/, run 5: sherpa@'s v5, with a check of v6

**The four people below are invented. This is not user research. Never quote them as real readers.** The same personas and entry points as before. They walked v0.1.1058 to v0.1.1060 (sherpa@'s v5, 72419d4) on a 390 × 664 phone, between 12:16 and 12:20 UTC, with Do Not Track and Global Privacy Control on. sherpa@'s v6 (516583a) went live during the run. Its claims were checked by incident.synthetic@ on v0.1.1065 in Chromium (section at the end); that was a measurement pass, not a persona walk. The seconds, taps and pixels are measured. The words are the sub-agents'.

| Persona (invented) | Entry | g-1 | g-2 | g-3 | g-4 | g-5 | Main answer: seconds, taps |
|---|---|---|---|---|---|---|---|
| [Stranded](guide-5/stranded.md) | /guide/stranded/ | 3 | 3 | 3 | 4 | **4** | Carris limited (FACT) in 34 s, 1 tap; Fertagus normal at 40 s. Metro: the mayor's word (EVIDENCE) at 30 s. "Not stated" list at 57 s, 2 taps |
| [Flight](guide-5/flight.md) | /guide/lisbon/ | 3 | 3 | 4 | 4 | **4** | Flight card in 9 s, 1 tap (H2 at 2,014 px). Done in 34 s of 45 |
| [Wire reporter](guide-5/deadline.md) | /guide/media/ | 4 | 4 | 4 | 4 | **3** | What is in force in 5 s, 0 taps. The day's main change in 35 s from the lead, or about 2 min through "Changed today" |
| [Funchal](guide-5/madeira.md) | /guide/ | 3 | 3 | 3.5 | 3 | **4** | Funchal flights in 22 s; Madeira schools in 40 s, both 1 tap (was 88 s, 2 taps, cut). Mainland scope and the Porto Santo ferry at 58 s |

## Fixed in v5

- **Cut rows:** none on screen on any page. sherpa@ traced the cause to an index passed as the cut length.
- **Carris and Fertagus:** each now has its own FACT row, and the "not stated" line reads only "Taxis and ride-hailing".
- **Madeira:** schools are among "Decisions stated", in full ("closed on Wednesday morning, reopening from 13:00"). The mainland alert's scope is stated, and the Porto Santo ferry is in "not stated".
- **Stranded heading:** moved up to 946 px (it was at 1,586).
- **Metro:** the "(announced by the mayor)" credit is now in the Metro row on /guide/lisbon/.

## Ranked findings, run 5 (v5)

1. **Costly (reporter): "Changed today" moved to about 10 screens down on /guide/media/, at 6,603 px under Madeira.** Its 3 visible rows (São Bento, Vasco da Gama, Fertagus) left out the warning change, which was row 16 of 24. Duplicate pairs remained: the flight counts 208 and 222, the sea bars, Vasco da Gama, Fertagus (both 10:40), and Funchal centre (also in the Madeira section). This is why the reporter's score fell from 4 to 3.
2. **Costly (stranded): "NOT READ" reads as a service status.** For about 2 s the all-caps chip on the Metro row (3,865 px) reads as "not running". The note beneath explains the site's terms and "on Dinis's list", which means nothing to a visitor. The mayor's word that the Metro runs is 1,100 px lower, with no link to it. **Change:** a neutral lower-case label ("we do not read this site"), one line pointing to the mayor's statement, and the licence detail folded away.
3. **Minor (flight, stranded):**
   - The jump row is still at 734 px, 70 px under the fold.
   - "↑ The seven questions" still jumps down (v5).
   - The old green bridge row still sits under the newer limit (v5).
   - The Metro caveat ("No Metro notice on metrolisboa.pt") is still only under "Changed today".
   - A second shelter row had a `running` chip (v5).
   - The Carris Metropolitana row is taken for city Carris.
   - Section 4 comes before section 3, which sherpa@ says is deliberate.
4. **Minor (Madeira):**
   - The Madeira in-force line ("No orange or red IPMA warning for Madeira") is the 7th block, 1,600 px into the fold. **Change:** open the fold with it.
   - A Tuesday regional civil protection page, tagged FACT (2,844 px), "lists the warnings in force by area", including sea warnings until 21:00 Wednesday, which reads against "no orange or red in force". **Change:** say it is Tuesday's list, with levels not stated, or move it to Deeper.
   - Thursday's schools are not mentioned, and the past red warning has no "past" mark (sherpa@: not yet done).
5. **Minor (reporter):**
   - The menu rows show "Dat" and "D" at the right edge of screen 1.
   - 11 of 21 folded rows end mid-quote with "…" after a long quote; this is not the old bug.
   - The desk still promises no reply time.

## v6 (v0.1.1065), checked by incident.synthetic@ at about 12:22 UTC

| sherpa@'s claim | Measured |
|---|---|
| "Changed today" puts IPMA's warning changes first | **Yes.** On all four pages row 1 is "IPMA lowers Lisbon's wind warning from red to orange…" (FACT). |
| "Changed today" sits below the reader's own answer | It is still at 6,757 px on /guide/media/ and 7,268 px on /guide/stranded/. For the reporter, whose question is what changed, that is about 10 screens down. **Still costly for /guide/media/:** on the journalist page, put it near the top. |
| Shelter row gets a neutral "shelter at night" chip | **Yes.** No shelter row shows "running". |
| Metro de Lisboa reads "not read" with the press decision below | Yes, but the chip is still all-caps "NOT READ" (see run-5 finding 2). |
| "↑ Top · All seven questions ↓" ends each section | **Yes** on the focused pages. |
| Cut rows | **0 on screen** on all four pages. |
| Label key on /guide/media/ | Not located by this check; left for the next walk. |
| CP "(12:00 to 15:00 forecast…)" | Still on /guide/stranded/ and /guide/lisbon/; held with the conductor. |
| Jump row above the fold, past Madeira red marked past | Not done (sherpa@ says so). |

## Does anything read like advice or a forecast from us?

**No.**

- **/guide/media/** says "Nothing here is a forecast or advice of ours" (7,760 px).
- **Credited to their sources:** Lusoponte's advice, the sea worsening until 12:00 Thursday, Madeira civil protection's "asked not to go to affected areas", and ANA's "cancellations expected".
- **Held with the conductor:** the CP parenthesis.

Data: [findings-guide-5.json](findings-guide-5.json); the walks are in guide-5/<persona>.json.
