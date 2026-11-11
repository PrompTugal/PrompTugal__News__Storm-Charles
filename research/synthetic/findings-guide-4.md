> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:15 UTC

# Synthetic visitors on /guide/, run 4: sherpa@'s v4

**The four people below are invented. This is not user research. Never quote them as real readers.** The same personas and entry points as before. Walked on v0.1.1042 to v0.1.1043 (sherpa@'s v4, 5653010, served from v0.1.1039) on a 390 × 664 phone, between 12:11 and 12:15 UTC, with Do Not Track and Global Privacy Control on. The seconds, taps and pixels are measured; the words are the sub-agents'. Finding 1 was checked by incident.synthetic@ in Chromium on v0.1.1049.

| Persona (invented) | Entry | g-1 | g-2 | g-3 | g-4 | Main answer: seconds, taps | Page height |
|---|---|---|---|---|---|---|---|
| [Stranded](guide-4/stranded.md) | /guide/stranded/ | 3 | 3 | 3 | **4** | **Metro today in 18 s, 1 tap** (jump row → Getting around; never found in g-3). Carris in 9 s | 8,674 px (was ~16,100) |
| [Flight](guide-4/flight.md) | /guide/lisbon/ | 3 | 3 | 4 | **4** | Flight card in 9 s, 1 tap (was 30 s, 6.3 screens). All three answers in 39 s of 45 | 11,412 px (was 21,488) |
| [Wire reporter](guide-4/deadline.md) | /guide/media/ | 4 | 4 | 4 | **4** | What is in force in 5 s, 0 taps. Files in about 3 min, 2 taps | 7,857 px (was 8,619) |
| [Funchal](guide-4/madeira.md) | /guide/ | 3 | 3 | 3.5 | **3** | Funchal flights in 30 s, 1 tap (was 45). Madeira schools in 88 s, 2 taps, cut to "Madeira sch…" | 4,003 px collapsed (was 16,668) |

## Fixed since guide-3

- **Length and navigation:** the jump row and folded Deeper sections cut the pages by roughly half.
- **Metro today:** the stranded visitor now finds the Metro answer within his minute (18 s, 1 tap); in guide-3 he never did.
- **"Changed today":** the list now sits below the jump row, with 3 rows and a fold.
- **Airport block:** the newer bridge row (Vasco da Gama limited to 100 km/h) now comes first.
- **Contact:** "Contact us" sits under the change list (1,508 px; it was at 8,241). The desk says it reads about once an hour, at seven minutes past, and invites "for a deadline, say so".
- **Madeira tile:** now at 1,596 px (it was at 1,939).

## Ranked findings, guide run 4

1. **Blocking (all four pages; checked by incident.synthetic@): row text is cut to 1 to 3 letters.** In the rendered /guide/ on v0.1.1049, 46 `.gd-txt` texts show as 1 to 3 letters plus "…". Examples: "F…", "AN…", "ANA…", "M…", "Me…", "Con…", "C…", "CP…", and Madeira's schools row is just "Madeira sch…". The served HTML has full text, so the cut happens in the page's script. It is visible without opening anything: "M…" sits at 3,881 px on /guide/stranded/, and 2 of the 4 visible Madeira decision rows are cut (2,682 and 2,792 px). The 13:00 reopening, which was visible in guide-3, is gone. A guess: the script measures each row's width while it sits in a closed fold, gets 0, and clips to nothing. **Change:** clamp with CSS (`text-overflow`, line-clamp), or measure after the fold opens. Sent to sherpa@ at about 12:16.
2. **Costly (stranded), not fixed since guide-3: Carris and Fertagus are both FACT and "not stated".** Carris is FACT at 1,238 px, and Fertagus is FACT inside "21 more today". Getting around (4,246 px) still says "Carris, Fertagus, taxis and ride-hailing: not stated". He sees both within 18 s. **Change:** drop Carris and Fertagus from the "not stated" line.
3. **Costly (stranded): the Metro contradicts itself.** "Metropolitano de Lisboa NOT STATED, read 12:06" (4,389 px) is followed by a green `running` chip on the homeless-shelter row (5,392 px), which he reads as "Metro running". The mayor's Wednesday row is no longer in his view. On /guide/lisbon/ the Metro row (3,582 px) still lacks its caveat, "No Metro notice on metrolisboa.pt", which sits in a closed Deeper fold at 10,433 px. **Change:** one Metro line per page: what was stated, by whom (the mayor, through the press), and what was not (no notice from the Metro itself). Give the shelter row a neutral chip such as "stations open at night", not "running".
4. **Costly (reporter), not fixed: the day's main change is buried and listed twice.** IPMA's 07:16 move from red to orange sits at rows 15 and 16 of 24, inside "21 more today" (75 s, 1 tap). There are 3 other duplicate pairs: the flight counts 208 and 222, the sea bars, and Vasco da Gama. **Change:** rank warning changes and decisions first, and remove the duplicates.
5. **Costly (Madeira), not fixed:**
   - The schools row is still missing from "Decisions stated"; it is 12th of 13 in Deeper, at 5,233 px.
   - Nothing in #madeira says the mainland alert does not cover Madeira; the word "mainland" does not appear in the section.
   - There is no Madeira top line.
   - The past red warning carries no "past" mark.
6. **Minor (stranded, flight): the jump row is just below the first screen, and the up links point down.** The jump row sits at 734 px, 70 px under the 664 px fold. The "↑ The seven questions" links still jump down to the menu at the foot (7,157 to 9,924 px), not up to the jump row. **Change:** lift the jump row into the first screen and point "↑" at it.
7. **Minor (flight):** the old green row "Restrictions lifted on both bridges by 22:29 Tuesday" (3,880 px) sits directly under the newer 100 km/h limit and briefly reads as "open now". **Change:** keep only the newest row per bridge in the airport card.
8. **Minor (reporter):**
   - There is no FACT/EVIDENCE key on /guide/media/; the labels are explained only in the hidden Panel and the footer (7,583 px).
   - Status chips on counts still read as statuses: "limited" on "208 flights cancelled".
   - The desk gives no reply time and no phone (partly fixed; this is the desk's call).

## Does anything read like advice or a forecast from us?

**No forecast or advice of our own was found.**

- **The airline line** ("Your airline decides whether your flight goes: its site or app has the latest.") states who decides.
- **Attributed to their sources:** Lusoponte's advice, the Autoridade Marítima Nacional's sea notice, and Madeira civil protection's "asked not to go to affected areas".
- **Still held with the conductor:** the CP row's "(12:00 to 15:00 forecast: heavy rain, strong wind)" still names no forecaster inside the parenthesis (5,646 px on /guide/stranded/).

Data: [findings-guide-4.json](findings-guide-4.json); the walks are in guide-4/<persona>.json.
