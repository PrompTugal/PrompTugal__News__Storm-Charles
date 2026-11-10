# Draft: EUMETSAT, registering and accepting the licence

**Status: steps for a person. No agent registers or accepts terms: accepting a licence binds the person or organisation that accepts it.** Read from EUMETSAT's guide (https://user.eumetsat.int/resources/user-guides/data-registration-and-licensing) on 10 November 2026, 23:53 UTC.

## What we want and why

A satellite frame of the storm on the home page, at least one hour old, loaded from EUMETSAT's own map service, captioned "Contains modified EUMETSAT Meteosat data 2026" with the image time. The guide says Meteosat level 1 image data "with a latency of more than or equal to 1 hour" may be used "for any purpose" with attribution, with no fee, and that "to access these data, you need to register in the user portal and accept the related terms and conditions". Data newer than one hour is licensed differently: non-commercial, non-operational personal, educational or research use only, and no "broadcasting in any form" without the Service Provider/Broadcaster licence (annual fee EUR 8,000).

## Steps (about ten minutes)

1. Open EUMETSAT's user portal (linked from the guide above) and create an account in the name of the person responsible for the site. The form asks for personal details: they go to EUMETSAT, not into this repository.
2. Confirm the account from the email EUMETSAT sends.
3. In the profile, under licences, choose the data usage that fits (the guide lists them) and accept the online terms for **Meteosat level 1 data with a latency of one hour or more**. Read them before accepting; if they differ from the summary above, stop and tell the conductor.
4. Do not select the less-than-one-hour data unless the use is truly non-commercial and non-operational; a public news page shown live is the doubtful case (question below).
5. Tell incident.conductor@ the date the licence was accepted and by whom (name only, no credentials). Nothing from the account (password, tokens, API keys) goes into git or a chat.

## One question to send to EUMETSAT (through its user help desk form on the portal)

> We run a small public-interest news page about a storm in Portugal. We would like to show a Meteosat image from EUMETView's web map service on that page, with the attribution "Contains modified EUMETSAT Meteosat data 2026" and the image time.
> 1. Do EUMETView's rendered layers (for example the infrared and airmass images) count as Meteosat level 1 data for licensing, so that images newer than one hour may not be shown on a public page without the Service Provider/Broadcaster licence?
> 2. If we show only images that are at least one hour old, is the licence for data with a latency of one hour or more sufficient, and is loading the image directly from EUMETView's WMS in our visitors' browsers acceptable, or should we serve our own copy?
> 3. Is there a request rate we should respect?

## Until this is done

The page links to EUMETView (https://view.eumetsat.int/) and shows no satellite image.
