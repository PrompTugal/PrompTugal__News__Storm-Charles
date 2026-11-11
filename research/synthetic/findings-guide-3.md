> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:08 UTC

# Synthetic visitors on /guide/, run 3: sherpa@'s v3

**The four people below are invented. This is not user research. Never quote them as real readers.** These are the same personas and entry points as [guide run 2](findings-guide-2.md). They walked v0.1.1030 (sherpa@'s v3, 4c7622f, served from v0.1.1024) on a 390 × 664 phone, between 12:03 and 12:07 UTC, with Do Not Track and Global Privacy Control on. The seconds, taps and pixels are measured. The words are the sub-agents'.

| Persona (invented) | Entry | g-1 | g-2 | g-3 | Main answer: seconds, taps | Page height |
|---|---|---|---|---|---|---|
| [Stranded](guide-3/stranded.md) | /guide/stranded/ | 3 | 3 | **3** | Buses run (Carris FACT) in 15 s, 0 taps. **Metro today: not reachable in 60 s.** "Getting around" is at 7,304 px | 16,100–16,600 px (was 12,995) |
| [Flight](guide-3/flight.md) | /guide/lisbon/ | 3 | 3 | **4** | All three answers in 40 s, 0 taps, by scrolling 6.3 screens: flight card, OpenSky (42 departures, read 12:01), and "Getting to the airport" | 21,488 px (+3,979) |
| [Wire reporter](guide-3/deadline.md) | /guide/media/ | 4 | 4 | **4** | What is in force in 5 s, 0 taps. The main change of the day takes 85 s and 1 tap | 8,619 px (+1,747) |
| [Funchal](guide-3/madeira.md) | /guide/ | 3 | 3 | **3.5** | Funchal flights in 45 s, 1 tap (was 90 s, 2). Madeira schools still 105 s, 2 taps | 16,668 px |

## Fixed since guide-2

- **Web Summit Day 3** now reads "an aim, not a promise".
- **/guide/media/**: the H1 is at 227 px (it was at the bottom). Evidence says "reported by <outlet>". "Contact us" opens the desk form, which has a "Press or media" option.
- **The flight path** has "Getting to the airport" (5,016 to 5,582 px). It shows the Metro and bridges as stated, and taxis, ride-hailing and airport buses as "not stated", which the walker read as "we don't know". The OpenSky count is in the flight card (4,837 px, "a floor, not a total").
- **The airline line**, "Your airline decides whether your flight goes: its site or app has the latest.", reads as a statement, not advice.
- **Madeira** leads with the Funchal-centre closure and a "Decisions stated" block, and has a "not stated" line. The Schools row says "(mainland)".
- **Parks** show closed. Old reads show their age.

## Ranked findings, guide run 3

1. **Blocking (stranded); costly (flight, Madeira, reporter): the pages grew longer and the way through is still at the foot.**
   - The question menu sits only at the foot of the page: at 20,464 px on /guide/lisbon/ and 15,157 px on /guide/stranded/. The "↑ The seven questions" links point down to it, while their arrow says up.
   - On /guide/stranded/, "Deeper" is still open (2,900 px), and "Getting around" is at 7,304 px, about 11 screens down.
   - The 1-minute visitor cannot learn whether the Metro runs today. The answer is there, "Metro to run on Wednesday (announced by the mayor)" (EVIDENCE) at 7,728 px, but nothing near the top jumps to it.
   - Scrolling costs the flight walker 14 s of her 45 s, the reporter about 40 s and the Funchal reader about 28 s.

   **Change:** put the question menu under the banner on every guide page, with real up and down anchors. Fold "Deeper" by default.
2. **Costly (stranded, Madeira, reporter): "Changed today (UTC)" pushes the answers down and buries the main change.**
   - On /guide/stranded/, the stranded heading moved from 468 px to 1,818 px, off the first screen. On /guide/, the Madeira tile moved from 708 px to 1,939 px.
   - Within the list, IPMA lowering Lisbon's wind warning from red to orange at 07:16 is about row 15 of 24, inside the "20 more today" fold, and it is listed twice. Three other events are also duplicated.

   **Change:** show 3 rows, most significant first (warning changes and decisions before counts). Remove the duplicates. Put the list below the persona's own answer on /guide/stranded/ and /guide/lisbon/.
3. **Costly (stranded; checked by incident.synthetic@): Carris and Fertagus are both stated and "not stated" on the same page.** /guide/stranded/ has a FACT row, "Carris (its own page): service continues, priority to essential journeys…" (carris.pt, published 10:40, read 11:56), and Fertagus from fertagus.pt, also published 10:40. Lower down, Getting around says "Carris (Lisbon city buses), Fertagus, taxis and ride-hailing: not stated in what we have read." **Change:** drop Carris and Fertagus from the "not stated" line. Sent to sherpa@ at about 12:06.
4. **Costly (Madeira): the Madeira schools decision is not in the visible "Decisions stated" block.** It is still 12th of 13 inside Deeper (16,375 px). The "not stated" line leaves out schools and the Porto Santo ferry. Nothing in #madeira says the mainland alert leaves Madeira out. **Change:** add the regional civil protection's schools row to "Decisions stated". Name schools and the ferry in the "not stated" line, and add a line saying the mainland alert does not cover Madeira.
5. **Minor (flight):**
   - In the airport block, an old green "running" row (bridge restrictions lifted Tuesday, read 9 h ago) sits right under the newer Vasco da Gama limit of 100 km/h.
   - The Metro row appears without its caveat ("No Metro notice on metrolisboa.pt"), which sits 6,200 px further down.
   - "by 09:20" still has no time zone, and Funchal still reads "since ? UTC".
6. **Minor (stranded):**
   - The first row under Metro is a "running" chip on the homeless-shelter item.
   - "Still open:" still reads as "open for business".
   - The sections are still numbered 4, then 3.
7. **Minor (reporter):**
   - "limited" and "announced" chips on number counts read like statuses.
   - There is still no FACT/EVIDENCE key.
   - The header's "1 min ago" still reads as storm news.
   - The desk reads "Press or media" about once an hour; say so beside the form, so a reporter on deadline knows.

## Does anything read like advice or a forecast from us?

**No forecast or advice of our own was found on any of the four pages.**

- **The rephrased airline line** reads as a statement.
- **"The public asked not to go to affected areas"** is attributed to Madeira's civil protection.
- **Lusoponte's notice and the sea forecast** are each credited to their source.
- **The CP row's "(12:00 to 15:00 forecast: heavy rain, strong wind)"** now carries "Who: CP" and "reported by". The flight walker read it as CP's word. The stranded walker still saw no forecaster named inside the parenthesis. sherpa@ has flagged it to the conductor as the researcher's data; held there.

Data: [findings-guide-3.json](findings-guide-3.json); the walks are in guide-3/<persona>.json.
