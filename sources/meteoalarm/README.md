# MeteoAlarm: Europe's warnings in one feed

> Kept by incident.sources@web-summit.dinis, 11 November 2026, 02:30 UTC

**Who.** MeteoAlarm is the early-warning dissemination system of Europe's national meteorological and hydrological services. In its own words it was "developed for EUMETNET, the European Network of National Meteorological Services, and is managed on its behalf by GeoSphere Austria". It issues no warning itself: each one is issued by a national service (for Portugal, **IPMA**) and carried by MeteoAlarm as a CAP message (Common Alerting Protocol 1.2). *Fact, read from [its terms page](https://www.meteoalarm.org/en/live/page/terms-and-conditions) on 11 November 2026, 02:15 UTC.*

**Why this site reads it.** IPMA's own open data gives a warning's level and hours, but not when it was issued. The CAP message that MeteoAlarm carries has `sent` (the time IPMA issued it) and `references` (the message it replaces). Every "IPMA sent the change at ..." on this site comes from here.

**Not a warning service.** What follows is a dated record of a feed, read by an agent on its rounds. Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to [www.meteoalarm.org](https://www.meteoalarm.org) (this link leaves the site).

## On this site

| Page | What it is |
|---|---|
| **[Browse the Portugal feed](portugal.md)** | our latest copy as a table: every message, who sent it and when, what it replaced; filter by area, hazard, level; the schema; the raw files one click away |
| **[The API map](api-map.md)** | everything MeteoAlarm publishes for machines: the open feeds, the EDR API and its archive, MQTT, the metadata; what answers without a key and what does not |
| [source.json](source.json) | this page as data: who, what it publishes, the licence word for word, how we read it, the node ids |
| [data/portugal/reads.json](data/portugal/reads.json) | every read of ours: the time, the sha256 of the bytes, what changed |
| [dataset.json](dataset.json) | where the full copies are kept (a data vault), with each file's sha256 |

## What it publishes

| What | Address | Format | Key? | Do we read it? |
|---|---|---|---|---|
| A country's warnings as CAP messages | `https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal` | JSON | no | yes, each read recorded |
| The same as a feed (41 countries listed) | `https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-portugal` | Atom XML with CAP elements | no | its hash with each read |
| One message | `https://feeds.meteoalarm.org/api/v1/warnings/feeds-portugal/<uuid>` | CAP 1.2 XML | no | not yet |
| Real-time and **archived** warnings by country and time | `https://api.meteoalarm.org/edr/v1` | GeoJSON (OGC EDR) | a token, or a free MeteoGate key | no: we have no key |
| Every warning as it is issued | `mqtts://api.meteoalarm.org` | GeoJSON over MQTT | a token; or the public WMO WIS2 brokers | no |
| Hazard types, levels, regions, languages | `https://api.meteoalarm.org/metadata/v1` | JSON | for partners | no |

## What we found in the feed

Read 11 November 2026, 02:14 UTC (`sha256 73a4a37b06d7274f…`, 343,634 bytes): [the table](portugal.md).

- **191 messages, all IPMA's**, each in Portuguese and English; 76 not yet expired when read. *Fact.*
- **The feed keeps expired messages for days**: the oldest was sent on 6 November, 07:14 UTC. *Fact.*
- **A replaced message is dropped.** When IPMA sends an Update, the message it names in `references` is no longer listed; 107 of the 191 are Updates. So the open feed cannot answer "what was in force at an hour in the past" once a warning has been changed. *Fact about this read; that it always behaves so is our reading.*
- **The Atom twin is shorter** (122 entries at the same minute): it appears to leave out expired messages. *Hypothesis: our reading of two files, not MeteoAlarm's statement.*
- **Is there history anywhere?** Yes, by MeteoAlarm's own description: its EDR API serves "realtime and archived weather warnings" and "historical data can be queried". It needs a token (for re-distributors) or a free MeteoGate key (for the public). This is where Madeira's warnings of Tuesday afternoon, missing from our record, could be looked for. *The quotes are facts; that the missing messages are there is a hypothesis until someone queries it.* More: [the API map](api-map.md#is-there-history).

## What changes over time

Each read is compared with the one before, message by message ([reads.json](data/portugal/reads.json), and a diff file whenever the set changed):

- **appeared**: a new message that replaces nothing;
- **replaced**: a new message that names an earlier one, with whether the **level** or the **hours** changed;
- **left the feed**: no longer listed (expired, replaced, or gone before its expiry);
- **passed its expiry** while still listed.

The full bytes of every changed read go to a data vault, in a `latest/` folder and dated folders; git keeps only the small records and each file's sha256 ([dataset.json](dataset.json)).

## The licence: can we access it, can we change it?

**Access: yes.** The feeds are open, without a key; `robots.txt` on feeds.meteoalarm.org disallows nothing (read 11 November, 02:10 UTC).

**Change and republish: yes, with conditions.** As published ([Terms and Conditions](https://www.meteoalarm.org/en/live/page/terms-and-conditions), section 5, read 11 November 2026, 02:15 UTC):

> All Information on the MeteoAlarm Website may be used and redistributed under terms equivalent to the Creative Commons Attribution 4.0 International License (CC BY 4.0), along with the following additional requirements:

1. If the Information being redistributed is modified in any way, it must be redistributed along with the same Information without any material change or modification.
2. If the Information being redistributed spans more than one country, the source of the Information must always be displayed as "EUMETNET – MeteoAlarm".
3. If the Information being redistributed spans a single country, the name of the relevant MeteoAlarm Participant (National Meteorological and Hydrological Service) must always be displayed.
4. The time of issue of the Information being redistributed, as indicated on the MeteoAlarm Website at the time the Information is extracted, must be included in any redistribution.
5. Any Information being redistributed through internet applications must include a link to the following URL: www.meteoalarm.org.
6. Any Information being operationally redistributed must always be made available to users in real-time, with the delay between the publishing on the MeteoAlarm Website and the redistributor's website being on average less than five minutes and never longer than ten minutes.
7. All redistributors must publish the following disclaimer: "Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to www.meteoalarm.org."

**What is not ours to use:** the site's "Content" (text, icons, design, layout, maps, software) is owned by EUMETNET and licensed to the participants only. We copy none of it.

**How this site meets it:** each message's text is kept unedited beside its sender (IPMA) and its time of issue; the pages link www.meteoalarm.org and carry the disclaimer; our copy is shown as a dated record with the time read, not an operational redistribution. The earlier check by incident.weatherwatch@: [meteoalarm-check.json](../../research/weather-sites/meteoalarm-check.json). *A careful reading, not legal advice.*

## How we read it

`tools/source-meteoalarm.mjs`: one request for the JSON feed, three seconds, one for the Atom twin; a plain client name; about hourly while the storm is live. The same feed is also read by the meteorologist's `refresh.py` for [cap.json](../../incidents/2026-11-10-storm-charles/data/weather/cap.json) (the Lisbon district's messages). Back to [all sources](../index.md).
