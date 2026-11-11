> Kept by incident.synthetic@web-summit.dinis, 2026-11-11, 11:54 UTC

# Synthetic visitors on /guide/, run 1: "Are you in Lisbon right now?"

**The four people below are invented. This is not user research. Never quote them as real readers.** The personas were [written before any visit](personas/guide.md). This run follows Dinis Cruz's ask of around 11:45 UTC and incident.sherpa@'s request. Each persona walked [/guide/](../../guide/) (v0.1.982 to v0.1.983) on a 390 × 664 phone between 11:52 and 11:56 UTC, with Do Not Track and Global Privacy Control on. The seconds, taps and pixels are measured. The words are the sub-agents'. Finding 1 was checked by incident.synthetic@ itself.

| Persona (invented) | Time given | Score | Main answer: seconds, taps | Walk |
|---|---|---|---|---|
| Stranded in Lisbon (attendee) | 1 min | **3** | Section found in 5 s (572 px). "Nothing stated as open" understood at 37 s, 1 tap. "Does the Metro run today?" never answered | [stranded](guide-1/stranded.md) |
| Flight from LIS today | 45 s | **3** | "Only your airline can say" plus the airport press report at 19 s, 1 tap. How to reach the airport: not found (gave up at 38 s) | [flight](guide-1/flight.md) |
| Wire reporter on deadline | 10 min | **4** | What stands now in 5 s, 0 taps (headline at 170 px, IPMA, read 11:26). Full set in 25 s, 1 tap. Summit in 15 s. "Changed since morning" only on the timeline (90 s, 2 taps) | [deadline](guide-1/deadline.md) |
| Funchal, family in Lisbon | 2 min | **3** | Lisbon in 5 s. Madeira warnings in about 25 s, 1 tap (7,288 px). Madeira schools and flights in 85 to 100 s, 2 taps, inside "Deeper" | [madeira](guide-1/madeira.md) |

**What works:** "Not stated … means we do not know, not that they are closed" was read as meant. The headline answers "what now" within 5 s on a phone. Every row carries its source and the time read.

## Ranked findings for /guide/

1. **Blocking (stranded, deadline; checked by incident.synthetic@): a row reads as "parks are open".** At #stranded (about 4,898 px), the row "Parks, gardens, municipal culture (Lisbon city)" shows **running**, but its text is the observador.pt evidence about three Avenida da República road tunnels still open after midnight. The Weather face gives Lisbon city hall's decision as **closed**: "All Lisbon road tunnels closed from midnight; parks, gardens and cultural facilities too". The reporter would have put the wrong status in his copy. **Change:** take the row's status and text from the same decision. Sent to sherpa@ at 11:55.
2. **Costly (stranded, flight, deadline): the Metro row is about Thursday but reads as today.** At #around (2,624 to 2,651 px), "Metro (Metropolitano de Lisboa) **not announced**" is followed by "Thursday 12 Nov transport after the storm…". All three read it as "the Metro is unclear or not running today". **Change:** show the day in the status ("Thu: not announced"), and give today its own line. If nothing is stated for today, say "today: not stated in what we have read".
3. **Costly (deadline): Day 3 of Web Summit is tagged "running"** at 6,022 px, but the organisers' words are only that it "aims to proceed as planned". **Change:** use a status that matches the words ("aims to proceed"), not "running".
4. **Costly (flight): "Getting around" never says how to reach the airport.** It covers bridges and city tunnels, but no airport road, airport metro line or taxis at the airport. The freshest flight signal, "38 airline departures seen since 06:25 UTC" (FACT, OpenSky, updated 11:38), is two taps away on /transport/, not on the flight card. **Change:** an "Getting to the airport" line (what is stated, or "not stated"), and the departures count on the flight card.
5. **Costly (Madeira): the Madeira decisions are hidden.** Schools closed Wednesday morning and reopen at 13:00; 16 airport flights were cancelled. Both are inside the collapsed "Deeper" list, which runs newest first, so schools is item 12 of 13. The visible section opens with rainfall statistics. There is no Madeira headline line and no "not stated" line (schools, roads, the Porto Santo ferry, Thursday). The "schools close" alert at 1,304 px covers mainland Portugal only, without saying so to a reader in Madeira. **Change:** decisions first in #madeira, a one-line Madeira headline like Lisbon's, a "not stated" line, and "(mainland)" on the alert. The Madeira tile at 670 px sits just below the 664 px fold.
6. **Costly (stranded): the "not stated" line for buses, Fertagus, ride-hailing and taxis sits at the bottom of #around (3,713 px).** The 1-minute visitor never reaches it. **Change:** put it at the top of the section.
7. **Costly (deadline): no "changed since this morning" on /guide/.** It is only on the 28,953 px timeline. **Change:** a short "Changed today (UTC)" list under section 1 or in #press.
8. **Minor (flight, stranded):**
   - The airport row reads as the airport's own words although its source is CNN Portugal (1,951 px), and evidence rows in general read as the operator's own statement.
   - "by 09:20" has no time zone.
   - Reads 9 to 10 hours old (bridges 02:42, TAP 01:50) look current.

   **Change:** "reported by <outlet>" in the row text, UTC on every time, and the age beside old reads ("read 9 h ago").

## Does anything read like advice or a forecast from us?

**No forecast or advice of our own was found on /guide/.** Two things are close:

- **An unattributed forecast in the CP row (2,769 to 2,860 px):** "(12:00 to 15:00 forecast: heavy rain, strong wind)" inside a press-evidence row names no forecaster, so on a phone it reads as the site's own forecast. **Change:** attribute it ("CP's notice, as reported by jornaldenegocios.pt"), or cut the parenthesis.
- **Held, for the conductor:** referrals in the site's own voice: "Check with your airline. Only your airline can say whether your flight goes." (1,839 px), "go to the operator before you set off" (2,547 px), "Ask the place itself." (5,265 px). They send people to the source rather than advise, but they are imperatives in our voice.
- **Held, for the meteorologist or conductor:** one tap away, on the timeline (1,491 px), a hypothesis labelled "Our analysis, not a forecast" says "the centre may pass south of Lisbon … will settle it". In substance a reader takes it as a forecast.

Data: [findings-guide-1.json](findings-guide-1.json); the walks are in guide-1/<persona>.json.
