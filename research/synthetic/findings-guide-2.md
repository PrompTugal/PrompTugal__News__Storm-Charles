> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 12:00 UTC

# Synthetic visitors on /guide/, run 2: the four guide pages

**The four people below are invented. This is not user research. Never quote them as real readers.** These are the same personas as [guide run 1](findings-guide-1.md) ([written before any visit](personas/guide.md)). Each started at incident.sherpa@'s suggested entry point, on a 390 × 664 phone, between 11:56 and 12:00 UTC, on v0.1.998 to v0.1.1003, with Do Not Track and Global Privacy Control on. The seconds, taps and pixels are measured. The words are the sub-agents'.

| Persona (invented) | Entry | guide-1 | guide-2 | Main answer: seconds, taps | Walk |
|---|---|---|---|---|---|
| Stranded | /guide/stranded/ | 3 | **3** | "Is anything open?" in about 30 s, 0 taps (section at 468 px). "Does the Metro run today?" still not found at 60 s | [stranded](guide-2/stranded.md) |
| Flight | /guide/lisbon/ | 3 | **3** | Freshest flight signal (OpenSky, 38 departures since 06:25, read 11:38) at about 4,470 px, 36 s. Way to the airport: not found | [flight](guide-2/flight.md) |
| Wire reporter | /guide/media/ | 4 | **4** | What is in force in 25 s, 0 taps. How to cite in 40 s, 1 tap. Press contact: not found | [deadline](guide-2/deadline.md) |
| Funchal | /guide/ | 3 | **3** | Madeira schools and flights still only in "Deeper", 90 to 105 s, 2 taps | [madeira](guide-2/madeira.md) |

## Fixed since guide-1

- **The parks row** now carries city hall's own closure text ("announced … parks, gardens and cultural facilities too"). incident.synthetic@ checked /guide/ and /guide/stranded/ just after 12:00 UTC. The stranded walker, on an earlier build, still saw the old row at 1,325 px.
- **The OpenSky departures count** is on /guide/lisbon/. It is still not in /guide/'s flight section, so this is partly fixed.
- **The stranded section** is on the first screen of /guide/stranded/, at 468 px.
- **Ride-hailing and taxis** are now in the "not stated" list.
- **procivmadeira.pt** is a link.
- **Operator rows** show "published" times.
- **How to cite** is one tap from /guide/media/.

## Ranked findings for the guide pages

1. **Costly (stranded, flight): on /guide/lisbon/ and /guide/stranded/ the "Deeper" lists are open by default and there is no jump menu.** /guide/ has its menu at 484 px. On /guide/stranded/, "Getting around" starts at 5,271 px (about 8 screens), because Deeper fills 2,258 to 5,104 px. On /guide/lisbon/, "I have a flight" starts at 2,797 px, and about 1,100 px of ANA and TAP history sits between the flight card and the OpenSky line. **Change:** fold Deeper by default on every guide page, add the jump menu, and move the OpenSky line into the flight card under the airport row.
2. **Costly (stranded, flight): the Metro row is still Thursday's "not announced"** (5,434 px on /guide/stranded/). The Wednesday information, "Metro to run on Wednesday (announced by the mayor)" (EVIDENCE), is only in Deeper at 7,622 px. "Still open: No Metro notice…" (8,059 px) reads as "open for business" when it means "unresolved". **Change:** a today line for the Metro from the mayor's statement, with its label, source and time. Mark Thursday as Thursday, and replace "Still open:" with "Unresolved:".
3. **Costly (deadline): Web Summit Day 3 still shows a "running" chip** (2,539 px on /guide/media/, and on /guide/) beside the organisers' "aims to proceed". The reporter nearly wrote "Day 3 confirmed". **Change:** "aims to proceed" as the status.
4. **Costly (deadline): /guide/media/ promises a contact that is not there.** It says "'Contact us' at the foot of the page" (6,161 px), but the footer has no contact link; the only route is a GitHub issue, 3 taps away. **Change:** remove the sentence until incident.desk@'s "Contact us" is live, or link it.
5. **Costly (flight): still no way to the airport.** No line covers the metro, road or taxis to the airport. **Change:** a "Getting to the airport" line: what is stated, or "not stated in what we have read".
6. **Costly (Madeira): Madeira is unchanged.**
   - Its decisions (schools reopen 13:00, 16 Funchal flights cancelled, cruise calls) are still in Deeper, newest first, under the warnings and rainfall statistics (7,778 px).
   - There is still no Madeira top line and no "not stated" line (roads, buses, the Porto Santo ferry, Thursday's schools).
   - Tile 6 is at 708 px, below the fold (670 in guide-1).
   - The Schools row (4,490 px) says "Schools close on Wednesday" without "(mainland)".
   - Warnings that end in minutes still show plain ORANGE "until 12:00".

   **Change:** as in guide-1: decisions first, a top line, a "not stated" line, and "(mainland)".
7. **Costly (deadline): "changed since this morning" is only partly answered.** The one change shown, IPMA lowering the wind warning at 07:16, sits in a box stamped "updated 08:44 UTC", 3 h older than the page. **Change:** a "Changed today (UTC)" list.
8. **Minor:**
   - /guide/media/'s H1 and intro, including the how-to-cite sentence, sit at the bottom (5,692 of 6,872 px).
   - There is no FACT/EVIDENCE key on the journalist page.
   - The header's "1 min ago" reads as storm news but opens the release log.
   - The Funchal row reads "since ? UTC".
   - The /guide/stranded/ sections are numbered 4 and then 3.
   - Rows read at 02:42 UTC carry no age.
   - The parks row's status is now "announced" for a closure; a stranded reader wants "closed".

## Does anything read like advice or a forecast from us?

**No forecast or advice of our own was found.**

- **Not fixed from guide-1:** the CP row's unattributed "(12:00 to 15:00 forecast: heavy rain, strong wind)" is still there (3,464 px on /guide/, 5,579 px on /guide/stranded/). **Change:** attribute it or cut it.
- **Still held for the conductor:** the referrals in our voice ("Check with your airline.", "go to the operator before you set off", "Ask the place itself.").
- **On /guide/media/:** nothing found.

Data: [findings-guide-2.json](findings-guide-2.json); the walks are in guide-2/<persona>.json. A note on method: the walkers' brief gave the wrong path for their JSON (guide-1), and all four noticed and wrote to guide-2. Nothing in guide-1 was changed.
