# EUMETSAT EUMETView

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:25 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Worldwide · satellite · International

**Address:** <https://view.eumetsat.int/> (leaves this site)  
**Owner:** EUMETSAT (intergovernmental)

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

Satellite imagery viewer (Meteosat: airmass, natural colour, infrared) with animation; OGC services (WMS/WMTS).

Forms: `maps`, `satellite`, `api`.

## What it does best

The airmass composite: the one image that shows a deepening Atlantic low and its dry intrusion.

## What we take from it

One satellite frame with its time, linked to the source, says "where is it now" better than text; pointer only, no image in git.

## Data and models it says it uses

Its own satellites: Meteosat (including the third generation: the default EUMETView layers were MTG lightning, precipitation rate and infrared), Metop (read in EUMETView and its licensing guide).

## API and feeds

WMS/WMTS, Data Store API

## Licence and terms

As we recorded it: EUMETSAT data policy: most Meteosat imagery free with attribution; the licensing page was a script shell here.  
May we show its content: **yes with attribution (to confirm per product)**.  
No link to terms or a licence was found in the HTML we read (many sites draw their footer by script): **not stated** as far as we read.

**Exact terms** (read 23:53 UTC, <https://user.eumetsat.int/resources/user-guides/data-registration-and-licensing>):

- Core data and products: "made available without charge under a CC-BY-4.0 licence"; attribution: "[Contains modified] EUMETSAT [Meteosat/Metop] [data/product] [Year of publication or distribution]".
- Meteosat level 1 image data with a latency of one hour or more ("Recommended" data): "What you MAY do: Access and use for any purpose. What you MUST do: Include attribution to EUMETSAT. What you MUST NOT do: Redistribute the Original Numerical Data. ... There is no licensing fee"; "To access these data, you need to register in the user portal and accept the related terms and conditions."
- Meteosat level 1 image data with a latency of less than one hour: personal, educational, research: "non-commercial and non-operational" use only, and not "any operational and commercial use, including broadcasting in any form of the data"; "Service Provider/Broadcaster: ... broadcasting images based on the data ... Annual fee of EUR 8,000."
- Website content (pictures on eumetsat.int): "you may download and copy content from the EUMETSAT website(s) for your own personal and non-commercial use. For any other use of the content, you must request authorisation"; credit "©EUMETSAT [year]".
- EUMETView's web map service capabilities document states Fees: none, AccessConstraints: none (read 23:52Z).

Our reading: Images at least one hour old may be shown for any purpose with attribution, once the free licence is accepted in the user portal (an account: a person's step). Showing images newer than one hour on a public news page looks like "broadcasting" and falls under the paid licence; the guide does not say in so many words whether EUMETView's own rendered layers count as level 1 data, so this is the cautious reading. Verdict: Allowed with care: a satellite frame that is one hour old or more, from EUMETView's WMS, captioned "Contains modified EUMETSAT Meteosat data 2026" with its image time. Before building: Dinis (or a person he names) registers in the EUMETSAT user portal and accepts the licence; and a person asks EUMETSAT whether EUMETView layers newer than one hour may be shown. Until then: link to EUMETView. (from [imagery.json](../imagery.json); not legal advice.)

## Storm Charles

Not checked: we did not look for Storm Charles on this site.

## How to reach it

No contact link was found in the HTML we read.
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:38Z · HTTP 200 · drawn by script: only the shell and labels read
- Addresses requested: `eumetsat-view` 200, `l-eumetsat` 200
- Data: this entry in [sites.json](../sites.json) (`eumetsat`)
