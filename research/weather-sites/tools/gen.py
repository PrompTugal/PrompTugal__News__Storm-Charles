#!/usr/bin/env python3
"""Builds research/weather-sites/sites.json from the probe results (status, time read) and the entries below.
Usage: gen.py <probe dir> <out file>.  Every entry names the probe(s) it rests on; nothing is listed as opened without one."""
import json, sys, glob, datetime

probe_dir, out = sys.argv[1], sys.argv[2]
P = {}
for f in sorted(glob.glob(probe_dir + '/res*.tsv')):
    for line in open(f, errors='replace'):
        c = line.rstrip('\n').split('\t')
        if len(c) >= 4:
            P[c[0]] = {'read': c[1], 'status': c[2], 'bytes': int(c[3] or 0), 'title': (c[6] if len(c) > 6 else '').strip()}

S = []
# Pages also rendered in a headless browser (1280 px wide, one screenshot each, looked at, not kept in git): id -> what was seen.
RENDERED = {}
def site(map_, id_, kind, name, url, owner, shows, how, data, best, learn, probes, seen='html', note=None, rank=None):
    ps = [p for p in probes.split() if p in P]
    missing = [p for p in probes.split() if p not in P]
    assert not missing, (id_, missing)
    st = P[ps[0]]
    opened = {'status': st['status'], 'read': st['read'], 'seen': seen}
    if st['status'] != '200' and seen in ('html', 'shell', 'json'):
        opened['seen'] = 'blocked' if st['status'] in ('401', '403', '429') else 'failed'
    if len(ps) > 1:
        opened['also'] = {p: P[p]['status'] for p in ps[1:]}
    if note: opened['note'] = note
    if id_ in RENDERED: opened['rendered'] = {'read': '2026-11-10T23:48Z', **RENDERED[id_]}; opened['seen'] = 'rendered' if RENDERED[id_].get('status') == 200 else opened['seen']
    e = {'id': id_, 'map': map_, 'kind': kind, 'name': name, 'url': url, 'owner': owner, 'shows': shows, 'how': how.split(),
         'data': data, 'best': best, 'learn': learn, 'opened': opened}
    if rank: e['rank'] = rank
    S.append(e)

W, PT, SC = 'worldwide', 'portugal', 'storm-charles'
RENDERED.update({
 'yr': {'status': 200, 'saw': 'Lisbon, hourly table for Wednesday 11 November: above the table, five warning banners for Lisboa in English, each starting with a status word ("Ongoing: Yellow Coastal Event Warning", "Expected: Orange Rain Warning", "Expected: Red Rain Warning", "Expected: Red Wind Warning", "Expected: Orange Coastal Event Warning"), each expandable; under them one row per hour: time, symbol, temperature, precipitation in mm, wind speed in m/s with an arrow, and the wind in words ("Fresh breeze from south east"). No gust column was shown. The automatic rows read 4 to 10 m/s for Lisbon under a banner carrying the red wind warning: the page does not comment on the difference.'},
 'bbc-weather': {'status': 200, 'saw': 'Lisbon: a card "Tonight" with one sentence ("Thundery showers and a gentle breeze"), day tabs for eight days with high and low, an hour row (symbol, temperature, chance of precipitation, a wind circle with speed), "Last updated today at 23:02", then a rain map with a play button and a week-long time bar. No warning of any kind was shown for Lisbon on the eve of IPMA\'s red warnings: outside the UK the page carries no authority\'s warnings.'},
 'metoffice': {'status': 200, 'saw': 'UK warnings page with a day strip; "No warnings" for Tuesday 10 November, so the warning layout itself was not seen in use.'},
 'meteofrance-vigilance': {'status': 200, 'saw': 'One card: "Vigilance météorologique et crues", issued 10 November 16:00, valid to 12 November 00:00 (Paris time); two tabs, "Aujourd\'hui" and "Demain" (the second greyed with "Prochaine carte à 06h": it says when the next map comes); the map by département in four colours with the legend as actions ("Soyez attentif", "Soyez très vigilant", "Vigilance absolue"); "cartes par phénomène" as a list; under the map one bar per phenomenon along the hours of the day (0h to 0h); and the line "updated at least twice a day, at 6h and 16h".'},
 'meteoalarm': {'status': 200, 'saw': 'Portugal: a map coloured by district (Madeira red; the mainland yellow and orange at 23:00 to 02:00), a time bar with buttons Now, +24h and each day to Saturday plus "Animation", filters by awareness level and hazard type, and a list of areas, one row per warning with the hazard pictogram on its colour.'},
 'windy': {'status': 200, 'saw': 'The gust layer over Portugal rendered as a full-screen map with place labels; no text about warnings.'},
 'windguru': {'status': 200, 'saw': 'Guincho: a "Live Wind" strip of nearby stations with their current reading first (Cabo Raso, Cascais), then the table: columns every two hours for a week, rows for wind speed, gusts, direction, wave, period, temperature, cloud, rain, every cell coloured by its value; the same table repeated per model below, with the model run time ("init") on each.'},
 'meteoswiss': {'status': 200, 'saw': 'Rendered, but only navigation text was captured; the time bar was not checked.'},
 'ipma': {'status': 200, 'saw': 'Home (updated 2026/11/10 23:31 UTC): tabs "Hoje", "Amanhã", "Depois de Amanhã", each with a warning triangle in the day\'s highest colour (red, red, yellow); the daily forecast map; the warnings map (mainland, Azores, Madeira); a "Comunicados" box; yesterday\'s extremes by station; small tiles for model charts, satellite, seismic activity.'},
 'ipma-avisos': {'status': 200, 'saw': 'Lisboa, last update 10 November 21:23 UTC: eight hazard rows (thunder, sea state, rain, wind, snow, cold, heat, fog) by 72 hourly cells for 11, 12 and 13 November, coloured green, yellow, orange, red; under it each warning as a coloured bar with hazard, level, start and end and one line of text, e.g. "Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]: Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos" and "Precipitação - Vermelho [11 Nov 09:00 - 11 Nov 18:00]"; a district list on the right with each district\'s highest level; "Toda a informação em horas UTC".'},
 'ipma-local': {'status': 200, 'saw': 'Lisboa (updated 2026-11-10 19:56:03 UTC): ten day tabs, each with symbol, min and max, wind, rain probability and the day\'s warning colour as a label ("Amarelo", "Vermelho", "Amarelo"); under them one column per hour of Wednesday 11 with rows: symbol, probability of precipitation, temperature and felt temperature, mean wind in km/h with direction, sea state (height, direction, water temperature) and a last row, "Avisos Meteorológicos", one coloured cell per hour (yellow, then orange, then red from 09H to 21H). The mean wind row reads 11 to 23 km/h under the red cells; the page explains in its notes that this automatic forecast may differ from the forecasters\' descriptive forecast and warnings, which should be consulted.'},
 'sc-rr-dashboard': {'status': 403, 'saw': 'The headless browser was refused ("The request is blocked"); the plain request had returned the page shell.'},
})

# ------------------------------------------------------------------ worldwide: national and international services
site(W, 'metoffice', 'national-service', 'Met Office (UK)', 'https://www.metoffice.gov.uk/', 'UK Met Office (public body)',
     'Home opens on the UK warnings map with a day strip (today and the next days, each coloured by its highest warning); a place search gives an hour-by-hour table (symbol, chance of rain, temperature, feels-like, wind and gust, visibility, humidity, UV). The UK Storm Centre lists the named storms of the season with the date named and the map of each; surface-pressure charts by forecaster.',
     'maps warnings timeline-hourly presenter-video explainer api',
     {'api': 'Weather DataHub (site-specific, map images, atmospheric models); key needed; plans by daily request limit', 'licence': 'Crown copyright; website material under the UK Open Government Licence v3.0 unless marked; some data licensed for a fee', 'reuse': 'yes with attribution for OGL material'},
     'The warnings page: one map, a day selector, and each warning written as "what to expect" in plain bullet points, with issued and updated times and a likelihood-by-impact matrix.',
     'Write each warning as what to expect, not only as a colour; show the impact-likelihood matrix cell; one line "issued / updated" under every warning.',
     'metoffice metoffice-warnings metoffice-stormcentre metoffice-datapoint l-metoffice c-metoffice-surface', rank=2)
site(W, 'nws', 'national-service', 'US National Weather Service', 'https://www.weather.gov/', 'NOAA / National Weather Service (US government)',
     'A national hazards map coloured by warning type with a legend ordered by priority; each point forecast page has a "hazardous weather conditions" box first, then current conditions, a 7-day strip, an hourly graph (temperature, wind and gusts, precipitation chance as stacked charts) and the forecast discussion, the forecaster\'s own reasoning in text.',
     'maps warnings timeline-hourly radar satellite api feed',
     {'api': 'api.weather.gov: JSON-LD/GeoJSON, alerts in CAP, no key (a User-Agent is asked for)', 'licence': 'US government work: public domain (third-party imagery excepted)', 'reuse': 'yes'},
     'The forecast discussion: the reasoning and the uncertainty in the forecaster\'s words, timestamped, next to the numbers. And an open alerts API in a standard format (CAP).',
     'Publish the reasoning beside the numbers, signed and timed; keep the hazards box above everything else on the page.',
     'nws nws-api l-nws spc', rank=5)
site(W, 'nhc', 'storm-tracker', 'US National Hurricane Center', 'https://www.nhc.noaa.gov/', 'NOAA (US government)',
     'One map of the basin with every active system; per storm a fixed set of products issued on a fixed clock (public advisory, forecast advisory, discussion, wind-speed probabilities) and the cone graphic: the track, the forecast points with times, the uncertainty cone, the coastal warnings.',
     'maps tracker warnings satellite feed explainer',
     {'api': 'RSS and GIS feeds (shapefile, KML) per storm; text products', 'licence': 'public domain', 'reuse': 'yes'},
     'The fixed product set on a fixed clock: everyone knows when the next advisory comes and what will be in it. The cone states uncertainty in the picture itself.',
     'Say when the next update is due (IPMA\'s next communiqué or warning revision), and draw uncertainty (the track "entering further south") rather than writing it only.',
     'nhc')
site(W, 'dwd', 'national-service', 'Deutscher Wetterdienst (Germany)', 'https://www.dwd.de/EN/Home/home_node.html', 'DWD (German federal authority)',
     'Warnings map down to municipality level with a time slider; the WarnWetter app; a large open-data server (model output ICON, radar composites, station observations, warnings in CAP).',
     'maps warnings radar models api',
     {'api': 'opendata.dwd.de: files over HTTPS, no key (GRIB, BUFR, CAP, CSV)', 'licence': 'CC BY 4.0 with source named (read on its legal notice)', 'reuse': 'yes with attribution'},
     'Open data at scale, including the model fields and the radar composite, under one plain licence.',
     'A single plain licence line per dataset, as DWD does; ICON-EU fields are a reusable second model for Lisbon.',
     'dwd dwd-warnings dwd-opendata l-dwd')
site(W, 'meteofrance-vigilance', 'national-service', 'Météo-France: Vigilance', 'https://vigilance.meteofrance.fr/fr', 'Météo-France (public body)',
     'The vigilance map: one colour per département, tabs for today and tomorrow, the issue time and the validity on the card, the time the next map is due, a legend written as actions, maps per phenomenon, and one bar per phenomenon along the hours of the day.',
     'maps warnings timeline-hourly radar api',
     {'api': 'meteo.data.gouv.fr and a public API portal (key needed)', 'licence': 'French open licence (Etalab) for public data; not re-read in this pass', 'reuse': 'yes with attribution (to confirm)'},
     'The card says when it was issued, until when it is valid and when the next one comes; the legend is what to do, not what the colour is called.',
     'Three times on the hero (issued, valid to, next due); a legend of actions in the authority\'s words; one bar per hazard along the day.',
     'vigilance meteofrance l-meteofrance', seen='shell', rank=6)
site(W, 'aemet', 'national-service', 'AEMET (Spain)', 'https://www.aemet.es/en/portada', 'Agencia Estatal de Meteorología (Spanish government)',
     'Warnings map by zone with tabs for today, tomorrow and the day after and a table of every warning (zone, phenomenon, level, start, end, probability, comment). Keeps the season\'s list of high-impact storms named by the south-western group, with who named each and when, and a study of each episode afterwards.',
     'maps warnings radar satellite api explainer',
     {'api': 'AEMET OpenData (REST, free API key)', 'licence': 'reuse allowed citing AEMET as the source, without distorting the information (read on its legal notice)', 'reuse': 'yes with attribution'},
     'The season table of named storms: name, type, date named, the service that named it, and a link to the episode study.',
     'Our incident page should link the naming record; and promise the after-study ("estudio del episodio") as a section from the start.',
     'aemet aemet-avisos aemet-borrascas aemet-opendata l-aemet c-aemet-borrascas c-aemet-avisos',
     note='the 2026-2027 table lists Adam (16 Oct, AEMET) and Bruna (5 Nov, IPMA); the Charles row had no date or naming service filled in at 23:38Z')
site(W, 'yr', 'national-service', 'Yr (MET Norway and NRK)', 'https://www.yr.no/en', 'Norwegian Meteorological Institute and NRK (public broadcaster)',
     'A place page with one table: a row per day that opens into a row per hour (symbol, temperature, precipitation in mm, wind speed with an arrow and the wind in words). The national service\'s warnings for the place sit above the table as banners that start with a status word (Ongoing, Expected), in English, worldwide: for Lisbon it showed IPMA\'s five warnings. Lisbon was read and rendered.',
     'timeline-hourly maps warnings radar api',
     {'api': 'api.met.no (Locationforecast and others): JSON, no key, an identifying User-Agent required', 'licence': 'NLOD 2.0 and CC BY 4.0; credit MET Norway (read on its licence page)', 'reuse': 'yes with attribution'},
     'The calmest hour-by-hour table on the web, with the authority\'s warnings for that place above it, each with a status word. The same data is an open API for any point on Earth.',
     'Warnings above the hours, each starting with Ongoing or Expected. And its flaw to avoid: automatic hourly wind of 4 to 10 m/s printed under a red wind warning with no word on why they differ.',
     'yr yr-lisbon metno-api metno-lisbon l-metno', note='the help-centre page on terms returned 403; the API licence page was read instead', rank=1)
site(W, 'knmi', 'national-service', 'KNMI (Netherlands)', 'https://www.knmi.nl/home', 'Royal Netherlands Meteorological Institute',
     'Home leads with the colour code for the country and a one-paragraph "weather picture" by the duty forecaster; KNMI Data Platform publishes observations, radar and HARMONIE model output.',
     'maps warnings radar api',
     {'api': 'KNMI Data Platform: Open Data API, EDR API, notification service (key needed)', 'licence': 'CC BY 4.0 on the datasets read', 'reuse': 'yes with attribution'},
     'The duty forecaster\'s short text on the home page, dated and plain.',
     'A dated two-sentence "the picture now" by a named role, above the data.',
     'knmi l-knmi')
site(W, 'smhi', 'national-service', 'SMHI (Sweden)', 'https://www.smhi.se/en/weather', 'Swedish Meteorological and Hydrological Institute',
     'Impact-based warnings (the same wind gets a different level by region and season), each with "what can happen"; open data API.',
     'maps warnings api', {'api': 'opendata.smhi.se (no key)', 'licence': 'CC BY 4.0 (not re-read in this pass)', 'reuse': 'yes with attribution'},
     'Warnings written from the consequences backwards.', 'Lead with the consequence ("trees down, roofs, power cuts"), then the number.', 'smhi', seen='shell')
site(W, 'fmi', 'national-service', 'Finnish Meteorological Institute', 'https://en.ilmatieteenlaitos.fi/', 'FMI (Finnish government)',
     'Local forecast with an hourly table and a 5-day warnings strip per region; open data (observations, radar, HARMONIE, lightning) also on a public cloud bucket.',
     'timeline-hourly warnings radar api', {'api': 'WFS open data, no key for most', 'licence': 'CC BY 4.0 (read on its licence page)', 'reuse': 'yes with attribution'},
     'The warnings strip: five days across, one row per hazard.', 'A five-day strip with one row per hazard is the compact form of IPMA\'s warnings.', 'fmi l-fmi')
site(W, 'jma', 'national-service', 'Japan Meteorological Agency', 'https://www.jma.go.jp/bosai/map.html#lang=en', 'JMA (Japanese government)',
     'One "disaster prevention" map application with every layer on the same base map (warnings, typhoon track and probability circle, rain nowcast, river flood and landslide risk meshes), in 15 languages; risk meshes are coloured by what to do, not by millimetres.',
     'maps warnings radar tracker', {'api': 'JSON behind the map, undocumented but stable; XML feeds', 'licence': 'government terms of use, compatible with CC BY (not re-read)', 'reuse': 'yes with attribution (to confirm)'},
     'Risk coloured by the action it asks for, on one map for every hazard.', 'One base map for everything; a legend that reads as actions.', 'jma jma-bosai', seen='shell')
site(W, 'bom', 'national-service', 'Bureau of Meteorology (Australia)', 'https://www.bom.gov.au/', 'Australian Government',
     'Redesigned home: a place card first (now, today, the next hours), then warnings for that place, then the radar; warnings list ordered by severity with issued times.',
     'timeline-hourly warnings radar maps', {'api': 'FTP/JSON products; reuse under its copyright notice', 'licence': 'CC BY for most Bureau material (not re-read)', 'reuse': 'yes with attribution (to confirm)'},
     'A page that starts from "your place, now" and puts warnings for that place directly under it.', 'Start from the reader\'s place (Lisbon by default), not from the country.', 'bom')
site(W, 'eccc', 'national-service', 'Environment and Climate Change Canada', 'https://weather.gc.ca/', 'Government of Canada',
     'Alerts map and table; city pages with text forecast and hourly table; MSC Datamart and GeoMet open data.',
     'maps warnings timeline-hourly radar api', {'api': 'MSC GeoMet (OGC API, WMS), Datamart; no key', 'licence': 'Environment and Climate Change Canada Data Servers End-use Licence (open, attribution)', 'reuse': 'yes with attribution'},
     'Open standards (OGC API) for every layer.', 'Serve our layers at stable, documented paths, as we do under api/v1.', 'eccc')
site(W, 'meteoswiss', 'national-service', 'MeteoSwiss', 'https://www.meteoswiss.admin.ch/', 'Swiss Federal Office of Meteorology and Climatology',
     'Home is the map with an animation bar (past radar into forecast, one continuous timeline); hazards by degree 1 to 5 with behaviour advice per degree.',
     'maps radar warnings timeline-hourly', {'api': 'open data since 2025 (STAC API)', 'licence': 'open government data, attribution (not re-read)', 'reuse': 'yes with attribution (to confirm)'},
     'One time bar running from observed (radar) into forecast, the "now" line in the middle.', 'Our strip should run from observed gusts into the forecast with a clear "now" marker.', 'meteoswiss', seen='shell', rank=8)
site(W, 'meteireann', 'national-service', 'Met Éireann (Ireland)', 'https://www.met.ie/', 'Irish Meteorological Service',
     'Warnings first on the home page as a list with status, validity and issue time; national forecast text by the forecaster; names storms with the western group.',
     'warnings maps radar api', {'api': 'open data (warnings JSON/XML, forecast API)', 'licence': 'CC BY 4.0 (not re-read)', 'reuse': 'yes with attribution'},
     'Warnings as text first: status, valid from/to, issued.', 'Every warning row carries valid-from, valid-to and issued.', 'meteireann')
site(W, 'ecmwf', 'model-viewer', 'ECMWF charts and open data', 'https://charts.ecmwf.int/', 'European Centre for Medium-Range Weather Forecasts (intergovernmental)',
     'The reference global model: chart catalogue (mean sea level pressure and wind, ensemble meteograms for any point, extreme forecast index). A subset of IFS and AIFS output is open data.',
     'maps models api',
     {'api': 'open data files (GRIB) and a client; charts via Open Charts', 'licence': 'CC BY 4.0 with the ECMWF Terms of Use: redistribution and commercial use allowed with attribution (read)', 'reuse': 'yes with attribution'},
     'The ensemble meteogram: the spread of 50 runs for one place as box-and-whisker by time step, uncertainty made visible. The extreme forecast index shows how unusual the forecast is for that place.',
     'Show a spread, not one line, for Lisbon\'s gusts where we have several models; say how unusual a value is for the place.',
     'ecmwf-charts ecmwf-opendata l-ecmwf', note='charts.ecmwf.int answered with a bot check; the open-data and licence pages were read')
site(W, 'eumetsat', 'satellite', 'EUMETSAT EUMETView', 'https://view.eumetsat.int/', 'EUMETSAT (intergovernmental)',
     'Satellite imagery viewer (Meteosat: airmass, natural colour, infrared) with animation; OGC services (WMS/WMTS).',
     'maps satellite api', {'api': 'WMS/WMTS, Data Store API', 'licence': 'EUMETSAT data policy: most Meteosat imagery free with attribution; the licensing page was a script shell here', 'reuse': 'yes with attribution (to confirm per product)'},
     'The airmass composite: the one image that shows a deepening Atlantic low and its dry intrusion.', 'One satellite frame with its time, linked to the source, says "where is it now" better than text; pointer only, no image in git.',
     'eumetsat-view l-eumetsat', seen='shell')
site(W, 'meteoalarm', 'warnings-aggregator', 'MeteoAlarm', 'https://www.meteoalarm.org/en/live/', 'EUMETNET (the network of European national services)',
     'One map of Europe coloured by the highest warning per region, from the national services themselves; per country a list with level, hazard, validity; Atom/CAP feeds per country. Portugal\'s feed was read: 122 entries at 23:35Z, levels Moderate, Severe and Extreme.',
     'maps warnings feed api',
     {'api': 'Atom + CAP feeds per country, no key', 'licence': 'terms equivalent to CC BY 4.0 with extra conditions for redistribution (read in the feed)', 'reuse': 'yes with attribution and its conditions'},
     'The same colours and the same format for every country: IPMA and AEMET on one map, machine-readable in CAP.',
     'Show Spain\'s warnings beside Portugal\'s from one feed; keep the four European colours exactly.',
     'meteoalarm meteoalarm-pt meteoalarm-feed c-meteoalarm-pt-feed l-meteoalarm', rank=7)
site(W, 'wmo-swic', 'warnings-aggregator', 'WMO Severe Weather Information Centre', 'https://severeweather.wmo.int/', 'World Meteorological Organization',
     'World map of official warnings and tropical cyclones from national services, in CAP.', 'maps warnings tracker feed',
     {'api': 'CAP feeds via the WMO Alert Hub', 'licence': 'per issuing service', 'reuse': 'per issuing service'},
     'Only official sources, worldwide.', 'The rule we already follow: the authority\'s warning, never ours.', 'wmo-swic', seen='shell')
site(W, 'copernicus-ems', 'emergency-mapping', 'Copernicus Emergency Management Service', 'https://emergency.copernicus.eu/', 'European Commission',
     'Rapid mapping activations (satellite damage and flood extent maps) and EFAS flood forecasts.', 'maps api',
     {'api': 'activation products as open files', 'licence': 'Copernicus open data, attribution', 'reuse': 'yes with attribution'},
     'After the event: the mapped extent, with its provenance.', 'Watch for an activation for Portugal after the storm; none named Charles was listed at 23:40Z.', 'copernicus-ems efas c-copernicus-act', seen='shell')
site(W, 'nasa-worldview', 'satellite', 'NASA Worldview / GIBS', 'https://worldview.earthdata.nasa.gov/', 'NASA (US government)',
     'Daily global true-colour imagery with a date slider; GIBS serves the tiles.', 'maps satellite api',
     {'api': 'GIBS WMTS/WMS, no key', 'licence': 'open (NASA data policy)', 'reuse': 'yes with credit'},
     'A date slider over imagery: yesterday against today.', 'A before/after slider is the form for the day after.', 'nasa-worldview l-gibs', seen='shell')

# ------------------------------------------------------------------ worldwide: broadcasters and commercial
site(W, 'bbc-weather', 'broadcaster', 'BBC Weather', 'https://www.bbc.com/weather', 'BBC (public broadcaster); forecast data from a commercial provider',
     'A place page that is one horizontal strip: day tabs across the top, under them an hour-by-hour row (symbol, temperature, chance of precipitation, wind arrow with speed; tap an hour for gust, humidity, pressure, visibility); warnings as a labelled bar above the strip; a presenter video forecast and a one-sentence text summary for the day. Lisbon was read.',
     'timeline-hourly presenter-video warnings maps',
     {'api': 'none public', 'licence': 'BBC terms: no reuse without permission; link and short quotation only', 'reuse': 'no'},
     'The hour strip with the sentence above it: "what kind of day" in words, then every hour in one scrollable line, on a phone. The presenter video is the same forecast told by a person.',
     'The hero: one sentence, then the hour strip; a named voice ("the presenter") is a text block with a time and a role, not a video.',
     'bbc-weather bbc-lisbon l-bbc c-bbc-weather-news c-bbc-search', rank=3)
site(W, 'weathercom', 'commercial', 'The Weather Channel (weather.com)', 'https://weather.com/', 'The Weather Company',
     'Place card (now, feels like, high/low), hourly and 10-day, radar map, video; alerts as a red bar at the very top.', 'timeline-hourly radar presenter-video warnings maps',
     {'api': 'commercial only', 'licence': 'all rights reserved', 'reuse': 'no'},
     'The alert bar: one line, the highest alert, always at the top.', 'One persistent line at the top with the highest current warning and its end time.', 'weathercom')
site(W, 'accuweather', 'commercial', 'AccuWeather', 'https://www.accuweather.com/', 'AccuWeather Inc.',
     'Not opened (403). Known for minute-by-minute precipitation and its own impact scales.', 'timeline-hourly radar', {'api': 'commercial', 'licence': 'all rights reserved', 'reuse': 'no'},
     'Not assessed.', 'Not assessed.', 'accuweather', seen='blocked')
site(W, 'meteoblue', 'commercial', 'meteoblue', 'https://www.meteoblue.com/en/weather/week/lisbon_portugal_2267057', 'meteoblue AG (Basel)',
     'Lisbon read: a 7-day strip with predictability per day as a percentage; meteograms; the multi-model diagram (every model\'s line for one place on one chart) and a "where are the clouds now" map.',
     'timeline-hourly maps models radar satellite api', {'api': 'commercial API; free non-commercial tier', 'licence': 'all rights reserved; attribution required for the free tier', 'reuse': 'limited'},
     'A predictability figure per day and the multi-model chart: disagreement between models shown, not hidden.', 'Put a confidence note on each day; when two models disagree on the peak hour, show both.', 'meteoblue', rank=10)
site(W, 'wunderground', 'commercial', 'Weather Underground', 'https://www.wunderground.com/', 'The Weather Company',
     'A network of personal weather stations on a map (Lisbon has many), each with its own page and history graph.', 'maps stations timeline-hourly',
     {'api': 'for station owners', 'licence': 'all rights reserved', 'reuse': 'no'},
     'Density: a reading from the next street.', 'Amateur stations are evidence, labelled as such, never fact.', 'wunderground wu-pws-lisbon')
site(W, 'foreca', 'commercial', 'Foreca', 'https://www.foreca.com/', 'Foreca Ltd (Finland)', 'Clean place pages, hourly table, rain radar.', 'timeline-hourly radar maps',
     {'api': 'commercial', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Plain hourly layout.', 'Nothing beyond Yr.', 'foreca')
site(W, 'weatherandradar', 'commercial', 'Weather & Radar', 'https://www.weatherandradar.co.uk/', 'WetterOnline GmbH', 'Radar-first home page with a play bar from past to forecast.', 'radar maps timeline-hourly',
     {'api': 'none public', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Radar as the first thing seen.', 'For a rain event the radar is the hero; for wind it is the gust strip.', 'weatherandradar')

# ------------------------------------------------------------------ worldwide: model viewers and maps
site(W, 'windy', 'model-viewer', 'Windy', 'https://www.windy.com/', 'Windyty SE (Prague)',
     'A full-screen animated map (wind particles over a colour field) with a layer menu (wind, gusts, rain, waves, pressure), a model switch (ECMWF, GFS, ICON, AROME) and a time slider along the bottom; click a point for a forecast table that compares models; radar, satellite, webcams and station reports as layers. Embeddable as an iframe with a chosen place, layer and model.',
     'maps models timeline-hourly radar satellite embed api',
     {'api': 'paid Point Forecast and Map Forecast APIs; free embed widget (iframe)', 'licence': 'all rights reserved; embed allowed as provided', 'reuse': 'embed only'},
     'The model switch on the same map and the same hour: the fastest way to see whether models agree on where the low goes.',
     'If we show a moving map, embed it with its credit rather than copy it; keep it below the fold, since it loads slowly and says nothing about decisions.',
     'windy c-windy-lisbon c-windy-embed l-windy', seen='shell', rank=4)
site(W, 'ventusky', 'model-viewer', 'Ventusky', 'https://www.ventusky.com/', 'InMeteo s.r.o. (Czechia)',
     'Animated map like Windy, with a strong gust layer and fronts drawn on the map; embeddable. Observador embeds it (gust layer, two models) in its Charles special.',
     'maps models embed', {'api': 'commercial', 'licence': 'all rights reserved; embed allowed', 'reuse': 'embed only'},
     'Gusts and fronts on one map.', 'The press already uses this embed; two embeds with two models side by side is Observador\'s way to show uncertainty.', 'ventusky c-ventusky-embed', seen='shell')
site(W, 'nullschool', 'model-viewer', 'earth.nullschool.net', 'https://earth.nullschool.net/', 'Cameron Beccario',
     'The globe with flowing wind lines (GFS), minimal chrome: the picture is the page.', 'maps models', {'api': 'none', 'licence': 'all rights reserved (the original code is MIT on GitHub)', 'reuse': 'link only'},
     'Beauty and legibility of a single field.', 'One field, no chrome: restraint.', 'nullschool', seen='shell')
site(W, 'zoomearth', 'storm-tracker', 'Zoom Earth', 'https://zoom.earth/', 'Neave Interactive',
     'Near-real-time satellite imagery with a time scrubber; radar, wind and pressure layers; tropical storm tracks with forecast cone.', 'maps satellite radar tracker',
     {'api': 'none', 'licence': 'all rights reserved; imagery from public agencies', 'reuse': 'link only'},
     'The scrubber: drag time over real satellite imagery.', 'A time scrubber is the interaction people understand; ours scrubs the hour strip.', 'zoomearth c-zoomearth-storms', seen='shell', note='no page for Charles (it tracks tropical systems)')
site(W, 'openmeteo', 'data-api', 'Open-Meteo', 'https://open-meteo.com/', 'Open-Meteo (open source)',
     'A free JSON API over the open models of the national services (ECMWF, DWD ICON, Météo-France AROME/ARPEGE, and others), hourly, any point, with gusts; an ensemble API and a historical API. A call for Lisbon (hourly gusts and precipitation, two days) answered in 534 bytes.',
     'api models timeline-hourly',
     {'api': 'HTTP GET, no key, no sign-up', 'licence': 'CC BY 4.0 for the data; the free tier is for non-commercial use', 'reuse': 'yes with attribution'},
     'Several models for one place in one call, with a clear licence.', 'The source for a model-spread strip for Lisbon (labelled analysis material, never a warning).',
     'openmeteo openmeteo-api l-openmeteo', seen='json', rank=9)
site(W, 'pirateweather', 'data-api', 'Pirate Weather', 'https://pirateweather.net/', 'open source project', 'An open forecast API in the old Dark Sky shape (minutely, hourly, alerts).', 'api',
     {'api': 'free key', 'licence': 'open source; data from NOAA', 'reuse': 'yes'}, 'Minutely precipitation in an open API.', 'None for Lisbon beyond Open-Meteo.', 'pirateweather')
site(W, 'rainviewer', 'radar', 'RainViewer', 'https://www.rainviewer.com/', 'RainViewer',
     'Worldwide radar composite as map tiles with past frames.', 'radar maps api',
     {'api': 'public Weather Maps API', 'licence': 'free for personal, educational and small community use only (read on its API page)', 'reuse': 'limited'},
     'Radar tiles anyone can put on a map.', 'Possible radar layer; check the terms fit a public newsroom first.', 'rainviewer l-rainviewer')
site(W, 'blitzortung', 'lightning', 'Blitzortung / LightningMaps', 'https://www.lightningmaps.org/', 'Blitzortung.org (volunteer network)',
     'Real-time lightning strikes on a map, from volunteers\' receivers.', 'maps lightning stations',
     {'api': 'data for contributing station owners', 'licence': 'non-commercial; raw data only for participants (read)', 'reuse': 'link only'},
     'Seconds-old data from a citizen network.', 'Link, do not copy; IPMA has its own lightning page.', 'blitzortung lightningmaps l-blitzortung', seen='shell')
site(W, 'meteociel', 'model-viewer', 'Meteociel', 'https://www.meteociel.fr/', 'Meteociel (France)', 'Every model run as static charts (GFS, ECMWF, AROME, ARPEGE, ICON), observations and soundings; dense, fast, old-fashioned.', 'maps models stations',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'Speed and completeness: every run, every field, no script.', 'Fast static pages beat pretty slow ones during an incident.', 'meteociel')
site(W, 'wetterzentrale', 'model-viewer', 'Wetterzentrale', 'https://www.wetterzentrale.de/', 'Wetterzentrale (Germany)', 'Model chart archive and ensembles ("spaghetti" plots).', 'maps models',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'Ensemble plots for a point.', 'As ECMWF: spread over single line.', 'wetterzentrale')
site(W, 'tropicaltidbits', 'model-viewer', 'Tropical Tidbits', 'https://www.tropicaltidbits.com/', 'Levi Cowan', 'Model charts with a frame slider and keyboard stepping; storm pages.', 'maps models tracker',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'Keyboard stepping through time.', 'Arrow keys step our hour strip.', 'tropicaltidbits')
site(W, 'windguru', 'specialist', 'Windguru', 'https://www.windguru.cz/', 'Windguru (Czechia)',
     'A colour-coded table for a spot (Guincho was read and rendered): live readings from nearby stations first, then columns of hours and rows for wind, gust, direction, wave, period, rain; cell colour is the value; one table per model with its run time.', 'timeline-hourly models',
     {'api': 'for paying members', 'licence': 'all rights reserved', 'reuse': 'link only'},
     'The heat-map table: forty hours of six variables readable at a glance.', 'Colour the cells of our hour strip by threshold (IPMA\'s yellow/orange/red gust criteria).', 'windguru windguru-guincho', seen='shell')
site(W, 'windfinder', 'specialist', 'Windfinder', 'https://www.windfinder.com/', 'Windfinder GmbH', 'Wind map and spot forecasts with live station reports.', 'maps timeline-hourly stations',
     {'api': 'commercial', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Measured against forecast at the same spot.', 'We already plot observed gusts against forecast: keep it on the home page.', 'windfinder')
site(W, 'estofex', 'specialist', 'ESTOFEX', 'https://www.estofex.org/', 'European Storm Forecast Experiment (volunteers)', 'Convective outlooks for Europe: a map with level lines and a reasoned text.', 'maps explainer',
     {'api': 'none', 'licence': 'non-commercial reuse with credit (not re-read)', 'reuse': 'link only'}, 'A reasoned outlook, signed.', 'For tornado or squall-line risk it is evidence from experts, labelled.', 'estofex c-estofex')
site(W, 'eswd', 'specialist', 'European Severe Weather Database', 'https://eswd.eu/', 'European Severe Storms Laboratory', 'Quality-controlled reports of severe weather events (wind, tornado, hail, rain) on a map.', 'maps stations',
     {'api': 'on request', 'licence': 'free viewing; data by agreement', 'reuse': 'link only'}, 'Each report has a quality level.', 'Our evidence items could carry a quality level the same way.', 'eswd')
site(W, 'severeweathereu', 'specialist-press', 'Severe Weather Europe', 'https://www.severe-weather.eu/', 'Severe Weather Europe', 'Long explainers on large events with many model charts.', 'explainer maps',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Depth for enthusiasts.', 'Nothing on Charles on its front page at 23:40Z.', 'severeweathereu c-severeweathereu')
site(W, 'fuberlin', 'storm-naming', 'FU Berlin: Aktion Wetterpate', 'https://www.met.fu-berlin.de/adopt-a-vortex/', 'Freie Universität Berlin', 'Names every low and high over Europe (a second, older naming scheme); daily analysis charts with the names.', 'maps explainer',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'A second name for the same low: useful for searching German-language coverage.', 'Record other names for the same storm in incident.json.', 'fuberlin')
site(W, 'mesonet', 'archive', 'Iowa Environmental Mesonet', 'https://mesonet.agron.iastate.edu/', 'Iowa State University', 'Archive of METAR/TAF worldwide and of every US warning text, with download.', 'api stations',
     {'api': 'open CSV/JSON', 'licence': 'open', 'reuse': 'yes'}, 'History of every airport report.', 'Lisbon airport\'s past METARs for the after-study.', 'mesonet')
site(W, 'aviationweather', 'aviation', 'Aviation Weather Center data API', 'https://aviationweather.gov/', 'NOAA (US government)', 'METAR and TAF for any airport as JSON; Lisbon\'s TAF answered.', 'api stations',
     {'api': 'JSON, no key', 'licence': 'public domain', 'reuse': 'yes'}, 'The airport forecast as data.', 'Already used by the meteorologist for the airport.', 'aviationweather', seen='json')
site(W, 'ogimet', 'archive', 'OGIMET', 'https://www.ogimet.com/', 'OGIMET (Spain, volunteer)', 'Decoded SYNOP, METAR and TAF archive for any station.', 'stations',
     {'api': 'query pages', 'licence': 'free, rate-limited', 'reuse': 'link only'}, 'Raw reports nobody else keeps public.', 'Backup source for station gusts.', 'ogimet')
for id_, name, url, st in [('kachelmann', 'Kachelmannwetter / meteologix / weather.us', 'https://kachelmannwetter.com/', 'kachelmann meteologix weatherus'), ('wxcharts', 'WXCharts', 'https://wxcharts.com/', 'wxcharts'), ('netweather', 'Netweather', 'https://www.netweather.tv/', 'netweather'), ('pivotal', 'Pivotal Weather', 'https://www.pivotalweather.com/', 'pivotal')]:
    site(W, id_, 'model-viewer', name, url, 'private', 'Not opened: refused our request (bot check).', 'maps models', {'api': 'not assessed', 'licence': 'not assessed', 'reuse': 'not assessed'}, 'Not assessed.', 'Not assessed.', st, seen='blocked')

# ------------------------------------------------------------------ Portugal
site(PT, 'ipma', 'national-service', 'IPMA', 'https://www.ipma.pt/pt/index.html', 'Instituto Português do Mar e da Atmosfera (the State\'s meteorological authority)',
     'Home: the map of warnings by district with a day selector, the forecast for the capitals, the latest communiqués and the seismic map. The authority for every warning in Portugal and the service that named Charles.',
     'maps warnings timeline-hourly radar satellite lightning api feed',
     {'api': 'api.ipma.pt open data: JSON, no key (warnings up to 3 days, daily forecast by city, hourly station observations, sea state, seismic events)', 'licence': 'use allowed for personal or public purposes that are not for profit or offensive, always naming the source (read on api.ipma.pt)', 'reuse': 'yes, non-commercial, with attribution'},
     'It is the primary source: the warning itself, the communiqué itself, with validity times.',
     'Everything in our hero comes from here and links here; our job is to make its content faster to read, not to add to it.',
     'ipma ipma-en c-ipma-home l-ipma-api', rank=1)
site(PT, 'ipma-avisos', 'national-service', 'IPMA: warnings on a timeline', 'https://www.ipma.pt/pt/otempo/prev-sam/', 'IPMA',
     '"Avisos meteorológicos em linha temporal": for a district, one row per hazard and coloured bars along a three-day time axis (yellow, orange, red), with the text of each warning. The JSON behind it is api.ipma.pt/open-data/forecast/warnings/warnings_www.json.',
     'warnings timeline-hourly maps api', {'api': 'warnings_www.json (read: 2 KB)', 'licence': 'as IPMA', 'reuse': 'yes, non-commercial, with attribution'},
     'The Gantt of warnings: when each hazard starts and ends, in one picture.',
     'This is the model for our strip: hazards as rows, hours as columns, IPMA\'s colours; add the events we track (Web Summit day, transport) as extra rows.',
     'ipma-avisos c-ipma-avisos-page ipma-api-warnings', seen='shell', note='the chart is drawn by script; the JSON was read', rank=2)
site(PT, 'ipma-comunicados', 'national-service', 'IPMA: communiqués', 'https://www.ipma.pt/pt/otempo/comunicados/', 'IPMA',
     'Special information notes. Read at 23:40Z: communiqué no. 2 on Charles, "Chuva, vento e agitação marítima - Depressão CHARLES - Continente e Madeira", valid from 2026-11-10 17:07 to 2026-11-11 23:59, stating that CHARLES is the name IPMA gave the low and where it is forecast to be centred at 00 UTC on 11 November. An RSS feed carries each communiqué.',
     'explainer warnings feed', {'api': 'RSS (comunicados.xml)', 'licence': 'as IPMA; its notice says copyright does not apply to communiqués', 'reuse': 'yes with attribution'},
     'The forecaster\'s own account of the storm, numbered and with a validity window.',
     'Quote the current communiqué\'s number and validity in the hero; a new number is a signal.',
     'ipma-comunicados ipma-comunicados-rss c-ipma-comunicados')
site(PT, 'ipma-local', 'national-service', 'IPMA: forecast by place, hourly', 'https://www.ipma.pt/pt/otempo/prev.localidade.hora/', 'IPMA',
     'Ten days for a place: day tabs carrying each day\'s warning colour, then one column per hour with rows for symbol, rain probability, temperature, mean wind, sea state and, last, the warnings as one coloured cell per hour.',
     'timeline-hourly warnings', {'api': 'daily by city in the open API; the hourly series is on the site', 'licence': 'as IPMA', 'reuse': 'yes, non-commercial, with attribution'},
     'The warnings as a row of the hourly table itself: hazard level and hour on one axis with the weather.', 'The model for our strip, with one change: put the warnings row first, not last, and label the automatic rows as automatic, since they read far below the warning\'s gusts (IPMA says so only in the notes).', 'ipma-lisboa ipma-api-daily', seen='shell', rank=3)
site(PT, 'ipma-obs', 'national-service', 'IPMA: radar, satellite, stations, lightning', 'https://www.ipma.pt/pt/otempo/obs.radar/', 'IPMA',
     'Radar mosaic with animation; satellite (Meteosat channels); hourly surface observations with graphs per station; lightning discharges on a map; sea state and coastal forecast; synoptic charts; descriptive and significant-weather forecasts.',
     'radar satellite stations lightning maps', {'api': 'station observations in the open API (read: 93 KB JSON)', 'licence': 'as IPMA; imagery under its terms', 'reuse': 'yes, non-commercial, with attribution; images by link'},
     'Observed gusts per station, hourly, as open JSON.', 'Our observed-against-forecast chart rests on this; say the station and the hour on every point.',
     'ipma-radar ipma-sat ipma-superficie ipma-dea ipma-mar ipma-descritiva ipma-significativa ipma-cartas ipma-api-obs', seen='shell')
site(PT, 'prociv', 'civil-protection', 'ANEPC: notices to the population', 'https://prociv.gov.pt/pt/avisos-a-populacao/', 'Autoridade Nacional de Emergência e Proteção Civil',
     'Numbered notices. Read: "Aviso 21 | Depressão Charles - Agravamento da Situação Meteo" (dated 09.11.2026, active) and a notice of preventive measures for Charles; before it, notice 20 for Bruna (06.11.2026). The occurrences page refused our request.',
     'warnings explainer', {'api': 'none documented; occurrences are republished by fogos.pt', 'licence': 'public body; cite the source', 'reuse': 'quote with attribution'},
     'The measures people are asked to take, from the body that asks.', 'Advice on our pages is only this text, quoted and linked.', 'prociv prociv-avisos c-prociv-avisos prociv-ocorrencias')
site(PT, 'fogos', 'volunteer-network', 'Fogos.pt / VOST Portugal', 'https://fogos.pt/', 'VOST Portugal (digital volunteers)',
     'A map of civil-protection occurrences in near real time, built on ANEPC\'s data, with an API; made for fires, used in storms for falls of trees, floods and structures.',
     'maps tracker api', {'api': 'api.fogos.pt (answered 429 to us: rate limit)', 'licence': 'open project; data from ANEPC', 'reuse': 'yes with attribution (to confirm)'},
     'Occurrences as open data, by volunteers.', 'A count of occurrences by hour is the "impact so far" figure, sourced to ANEPC via this API.', 'fogos fogos-api vost c-fogos-home c-vost', seen='shell')
site(PT, 'hidrografico', 'public-service', 'Instituto Hidrográfico', 'https://www.hidrografico.pt/', 'Portuguese Navy', 'Tide tables, wave buoys and sea-state forecasts.', 'stations maps',
     {'api': 'none documented', 'licence': 'all rights reserved; cite', 'reuse': 'link only'}, 'Measured wave height at the buoys.', 'For the coastal warning: the buoy reading beside the forecast.', 'hidrografico hidrografico-boias', note='the buoys page address we tried returned 404; home was read')
site(PT, 'amn', 'public-service', 'Autoridade Marítima Nacional', 'https://www.amn.pt/', 'Portuguese Navy', 'Bar closures and notices to seafarers.', 'warnings',
     {'api': 'none', 'licence': 'public body; cite', 'reuse': 'quote with attribution'}, 'Which harbour bars are closed.', 'A decision source for the coast.', 'amn')
site(PT, 'rtp', 'broadcaster', 'RTP Notícias', 'https://www.rtp.pt/noticias/', 'RTP (public broadcaster)',
     'Runs the national live blog on Charles (see the Storm Charles map); television forecast by presenters with IPMA\'s meteorologists as guests.',
     'liveblog presenter-video', {'api': 'RSS', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'},
     '"Momento-chave" entries: the live blog marks the few entries that matter.', 'Mark key moments in our timeline the same way.', 'rtp rtp-tempo', note='rtp.pt/noticias/tempo returned 404: no standing weather page at that address')
site(PT, 'sic', 'broadcaster', 'SIC Notícias: meteorologia', 'https://sicnoticias.pt/meteorologia', 'Impresa', 'Not opened (403). Its headlines were read through SAPO\'s front page.', 'presenter-video',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Not assessed.', 'Not assessed.', 'sicnoticias c-sic-wf', seen='blocked')
site(PT, 'cnnportugal', 'broadcaster', 'CNN Portugal / TVI: meteorologia', 'https://cnnportugal.iol.pt/meteorologia', 'Media Capital',
     'A weather section that is mostly video: studio explainers and reporters on the ground, each with its length and time; a topic label "Depressão Charles".',
     'presenter-video explainer', {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'},
     'Video with the duration and the age shown on every item.', 'Show the age of every item ("3 h ago") next to its absolute time.', 'cnnportugal tvi c-cnn-meteo')
site(PT, 'publico', 'press', 'Público: meteorologia', 'https://www.publico.pt/meteorologia', 'Público Comunicação Social', 'A standing weather section; live blog and "what you need to know" piece on Charles.', 'liveblog explainer',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'}, 'The explainer kept updated all day (first 07:54, last change 20:25).', 'One standing explainer, updated, with both times shown.', 'publico publico-tempo')
site(PT, 'observador', 'press', 'Observador', 'https://observador.pt/', 'Observador On Time', 'Live blog (general news) and a long special on Charles with embedded gust maps.', 'liveblog explainer embed',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'}, 'The special: a comparison with a past storm (Kristin) and two model maps.', 'Comparison with the last storm is what readers ask for; we can give it as numbers, sourced.', 'observador observador-meteo', note='the address we guessed for a weather section returned 404')
site(PT, 'expresso', 'press', 'Expresso', 'https://expresso.pt/', 'Impresa', 'Not opened (403).', 'explainer', {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'no'}, 'Not assessed.', 'Not assessed.', 'expresso c-expresso-wf', seen='blocked')
site(PT, 'press-others', 'press', 'JN, DN, Correio da Manhã, Negócios, ECO, TSF, Renascença, Lusa, Notícias ao Minuto, SAPO', 'https://www.jn.pt/', 'several publishers',
     'All opened; all carried Charles on the front page at 23:39Z except DN, where no headline with the name was found. Their Charles pieces are in the Storm Charles map.', 'liveblog explainer',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'}, 'See the Storm Charles map.', 'See the Storm Charles map.',
     'jn dn cm negocios eco tsf renascenca lusa noticiasaominuto c-sapo c-dn c-lusa')
site(PT, 'tempopt', 'commercial', 'tempo.pt (Meteored)', 'https://www.tempo.pt/', 'Meteored (Spain)',
     'Place forecasts for 14 days with hourly detail, warnings, radar, satellite and model maps; and a news desk of named meteorologists publishing several pieces a day: seven on Charles were listed, each headline a number ("Até 100 mm em 24 horas", "rajadas até 140 km/h em 4 distritos", "um mínimo de 976 hPa").',
     'timeline-hourly maps radar satellite models explainer', {'api': 'none public', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'},
     'A named forecaster per article and a number in every headline.', 'These are forecasts by a private outlet: evidence for us, never the headline. The habit of one number per headline is worth copying for facts.',
     'tempopt tempopt-lisboa tempopt-noticias c-tempopt-noticias c-tempopt-1', rank=5)
site(PT, 'lusometeo', 'amateur', 'Luso Meteo', 'https://www.lusometeo.com/', 'Luso Meteo (independent)',
     'An independent forecasting site with its own maps and daily analysis; on 10 Nov at 19:14 it published that Charles might be weaker than forecast, with reasons.',
     'explainer maps models', {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'},
     'Says when the forecast changes and why.', 'A dissenting analysis is a hypothesis with its source: show it as such, beside IPMA\'s unchanged warning.', 'lusometeo c-lusometeo', rank=6)
site(PT, 'meteopt', 'amateur', 'MeteoPT', 'https://www.meteopt.com/', 'MeteoPT community',
     'The Portuguese meteorology forum: follow-up threads per region and per event where members post their own station readings, radar captures and model reading, minute by minute.',
     'stations explainer', {'api': 'none', 'licence': 'posts belong to their authors', 'reuse': 'link only; no names of private people'},
     'Ground truth from hundreds of gardens, before any official total.', 'Evidence only, linked by thread, never by person.', 'meteopt meteopt-forum c-meteopt-forum c-meteopt-seguimento', note='forum index read; the thread address we guessed returned 404', rank=7)
site(PT, 'meteo-regional', 'amateur', 'Regional station networks: MeteoEstrela, MeteoAlentejo', 'https://www.meteoestrela.pt/', 'local associations and volunteers',
     'Networks of automatic stations with live values on a map, for regions where IPMA\'s stations are far apart.', 'stations maps', {'api': 'none documented', 'licence': 'per network', 'reuse': 'link only'},
     'Density inland.', 'Evidence for places outside Lisbon.', 'meteoestrela meteoalentejo')
site(PT, 'meteo-not-opened', 'amateur', 'Not opened: Meteo Trás-os-Montes, BestWeather, Troposfera, Meteomoita', 'https://meteotrasosmontes.pt/', 'independent',
     'Three did not answer (connection failed); meteomoita.com now serves unrelated content and is not a weather site.', 'stations', {'api': 'not assessed', 'licence': 'not assessed', 'reuse': 'not assessed'}, 'Not assessed.', 'Not assessed.',
     'meteotrasosmontes bestweather troposfera meteomoita', seen='failed')
site(PT, 'sapo-tempo', 'portal', 'SAPO Tempo and SAPO front page', 'https://tempo.sapo.pt/', 'MEO / Altice', 'The portal\'s front page aggregates the storm headlines of many outlets (SIC, Executive Digest, others); the weather sub-site is a script shell.', 'timeline-hourly',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'One page with every outlet\'s headline.', 'A "who says what" list by outlet is useful and cheap: incident.media@ has it.', 'sapo-tempo c-sapo', seen='shell')
site(PT, 'english-press', 'press', 'The Portugal News (English)', 'https://www.theportugalnews.com/', 'The Portugal News',
     'English-language daily: a "Weather Alert" item with a presenter-led video forecast, and a daily "Portugal weather today" item.', 'presenter-video explainer',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'}, 'A daily weather video for people who do not read Portuguese.', 'Web Summit visitors read English: our hero is in English with IPMA\'s Portuguese terms beside it.',
     'theportugalnews c-theportugalnews c-tpn-alert portugalresident', note='portugalresident.com refused our request (403)')
site(PT, 'beachcam', 'webcams', 'Beachcam (MEO)', 'https://beachcam.meo.pt/', 'MEO', 'Live coastal webcams with surf reports; it carried Charles items on its front page.', 'maps',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'Seeing the sea now.', 'A link to the live camera, never a capture in git.', 'beachcam')
site(PT, 'pt-transport-weather', 'aviation', 'Airport and air navigation: ANA, NAV Portugal', 'https://www.ana.pt/', 'ANA (VINCI) and NAV Portugal', 'Corporate pages opened; no weather product on the front pages. The airport\'s forecast is the TAF (see the aviation API in the worldwide map).', 'warnings',
     {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'link only'}, 'Not a weather source.', 'Use the TAF, as now.', 'ana navlisboa')
site(PT, 'dados-gov', 'open-data', 'dados.gov.pt', 'https://dados.gov.pt/pt/datasets/?q=ipma', 'AMA (Portuguese State)', 'The State\'s open data portal lists IPMA datasets.', 'api',
     {'api': 'catalogue API', 'licence': 'per dataset', 'reuse': 'per dataset'}, 'A catalogue with licences per dataset.', 'For incident.librarian@: licence text per dataset.', 'dados-gov')
site(PT, 'pt-blocked', 'public-service', 'Not opened: SNIRH (rivers), E-REDES network status, Lisboa Aberta, Surfline', 'https://snirh.apambiente.pt/', 'APA, E-REDES, Lisbon City Council, Surfline',
     'SNIRH, Lisboa Aberta and Surfline refused our request (403); the E-REDES address we tried returned 404.', 'stations', {'api': 'not assessed', 'licence': 'not assessed', 'reuse': 'not assessed'}, 'Not assessed.', 'River levels and power cuts are the two impact series still missing.',
     'snirh eredes lisboa-aberta surfline', seen='blocked')

# ------------------------------------------------------------------ Storm Charles: who covers it, and how
C = lambda *a, **k: site(SC, *a, **k)
PRESS = {'api': 'none', 'licence': 'all rights reserved', 'reuse': 'short quotation with link'}
C('sc-ipma', 'authority', 'IPMA: communiqué no. 2 and the warnings', 'https://www.ipma.pt/pt/otempo/comunicados/', 'IPMA',
  'The primary source. Communiqué no. 2 (valid 10 Nov 17:07 to 11 Nov 23:59) and the warnings JSON. No tracker, no map of the low\'s path, no live page: text and the warnings map.',
  'warnings explainer api', {'api': 'warnings_www.json, comunicados.xml', 'licence': 'as IPMA', 'reuse': 'yes, non-commercial, with attribution'},
  'Authority.', 'Nobody presents IPMA\'s own content as a single live page for one storm: that is the gap we fill.', 'c-ipma-comunicados ipma-api-warnings', rank=1)
C('sc-prociv', 'authority', 'ANEPC: notice 21 and preventive measures', 'https://prociv.gov.pt/pt/avisos-a-populacao/', 'ANEPC', 'Numbered notices for Charles, active.', 'warnings explainer',
  {'api': 'none', 'licence': 'public body; cite', 'reuse': 'quote with attribution'}, 'The measures, from the authority.', 'Link the notice number.', 'c-prociv-avisos')
C('sc-meteoalarm', 'authority-aggregator', 'MeteoAlarm: Portugal feed', 'https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-atom-portugal', 'EUMETNET',
  'IPMA\'s warnings in CAP: 122 entries, including Extreme (red) entries, for example a red rain warning for Faro issued 21:23Z on 10 Nov.', 'warnings feed api',
  {'api': 'Atom/CAP', 'licence': 'equivalent to CC BY 4.0 with conditions', 'reuse': 'yes with attribution'}, 'Machine-readable, with onset and expiry per entry.', 'A second path to the same warnings, with Spain\'s in the same format.', 'c-meteoalarm-pt-feed')
C('sc-aemet', 'authority', 'AEMET: season table of named storms', 'https://www.aemet.es/es/conocermas/borrascas/2026-2027', 'AEMET',
  'Charles is the third name on the south-western list; at 23:38Z its row had no naming date or service yet, while Bruna\'s says IPMA, 5 November.', 'explainer', {'api': 'OpenData', 'licence': 'cite AEMET', 'reuse': 'yes with attribution'},
  'The naming record.', 'Watch for the row to be filled; link it.', 'c-aemet-borrascas aemet-borrascas')
C('sc-rr-dashboard', 'interactive', 'Renascença: "Monitorização Depressão Charles"', 'https://rr.pt/tempestade-charles-avisos-e-ocorrencias', 'Rádio Renascença',
  'The only purpose-built tracker found. A dashboard with two views: weather warnings (a risk map by warning area, a national severity figure, "warnings in my area" by the reader\'s location, the day\'s warnings sorted by importance and time) and civil-protection occurrences (a map with markers coloured by state: under way, being resolved, concluding, dispatched; a number on a marker when several share a place; a filter by state). Built with an open map library; data loaded by script.',
  'maps tracker warnings interactive', PRESS,
  'Warnings and occurrences in one tool, with "my area" and occurrence states.',
  'The closest thing to our site. It has no timeline, no decisions, no sources per item and no machine-readable twin: those are ours. Its occurrence-state legend and "my area" are worth matching.',
  'c-rr-interativo c-rr-tag', seen='shell', note='the page shell and legends were read; the data loads by script and was not seen', rank=2)
C('sc-rtp-live', 'liveblog', 'RTP: live blog "Depressão Charles junta-se a Bruna. A evolução do mau tempo em Portugal"', 'https://www.rtp.pt/noticias/pais/depressao-charles-esperado-agravamento-significativo-das-condicoes-meteorologicas_e1778024', 'RTP',
  'Minute-by-minute entries with "Momento-chave" flags, embedded social posts and video; a very heavy page (1.4 MB of HTML).', 'liveblog presenter-video', PRESS,
  'Key-moment flags; the public broadcaster\'s reach.', 'Flag key moments; stay 100 times lighter.', 'c-rtp-live', rank=3)
C('sc-publico-live', 'liveblog', 'Público: "Ao Minuto" on Charles', 'https://www.publico.pt/2026/11/10/sociedade/noticia/carros-submersos-estradas-alagadas-lisboa-escolas-servicos-publicos-fecham-quarta-2194405', 'Público',
  'Live blog opened 10 Nov 11:38; the headline is rewritten as a running summary of three facts; one embedded chart from a charting service.', 'liveblog embed', PRESS,
  'A headline that is the state of things in three clauses.', 'Our hero sentence should be rewritten each wake the same way: three facts, each sourced.', 'c-publico-live', rank=4)
C('sc-publico-explainer', 'explainer', 'Público: "O que precisa de saber sobre a depressão Charles"', 'https://www.publico.pt/2026/11/10/sociedade/noticia/mau-tempo-governo-pede-apenas-deslocacoes-necessarias-periodos-chuva-intensa-2194385', 'Público',
  'Question-and-answer explainer, first published 07:54Z, last changed 20:25Z.', 'explainer', PRESS, 'Kept current all day.', 'Show first-published and last-changed on our explainer.', 'c-publico-explainer')
C('sc-observador-live', 'liveblog', 'Observador: general live blog leading on Charles', 'https://observador.pt/liveblogs/manifestantes-detidos-no-porto-pronunciam-se-sobre-suspensao-provisoria-do-processo/', 'Observador',
  'The day\'s general live blog (its address is about another story); at 23:34Z its title was "IPMA admite que Charles entre mais a sul do que o previsto"; entries carry their own anchors and times; marked up as a live blog for search engines.', 'liveblog', PRESS,
  'Every entry has its own address.', 'Every row of our timeline needs a stable anchor (it has a time; give it an id).', 'c-observador-live')
C('sc-observador-especial', 'explainer', 'Observador: special "Charles: o que a distingue da Kristin e quão grave pode ser?"', 'https://observador.pt/especiais/ventos-superiores-a-150-km-h-chuva-torrencial-e-a-ameaca-de-um-novo-sting-jet-pode-a-charles-repetir-a-kristin/', 'Observador',
  'Long explainer (published 21:14Z, changed 23:15Z) comparing Charles with storm Kristin; two embedded animated gust maps from Ventusky, one per model (GFS and ECMWF).', 'explainer embed maps models', PRESS,
  'Two models side by side as the picture of uncertainty; the comparison with the last big storm.', 'A "Charles against the last storm" table from IPMA\'s published figures.', 'c-observador-especial', rank=5)
C('sc-negocios-live', 'liveblog', 'Jornal de Negócios: live "País em estado de alerta esta quarta-feira"', 'https://www.jornaldenegocios.pt/economia/detalhe/fiquem-em-casa-todos-os-que-puderem-escolas-e-servicos-publicos-encerrados-amanha-siga-ao-minuto', 'Medialivre',
  'Live blog on the economic side (closures, transport, services), last changed 23:31Z; one embedded Datawrapper chart; a video of the storm\'s path shared with Correio da Manhã\'s television channel.', 'liveblog embed presenter-video', PRESS,
  'What closes: shops, services, transport.', 'A "what is closed" table is the most practical block: ours covers Web Summit, transport, schools, with sources.', 'c-negocios-live c-cm-percurso')
C('sc-nam-live', 'liveblog', 'Notícias ao Minuto: "AO MINUTO"', 'https://www.noticiasaominuto.com/pais/3081421/ao-minuto-so-saia-de-casa-se-for-necessario-madeira-a-vermelho', 'Notícias ao Minuto', 'Live blog since 07:44Z; headline rewritten through the day.', 'liveblog', PRESS, 'Speed.', 'None beyond the others.', 'c-nam-live')
C('sc-rr-live', 'liveblog', 'Renascença: "Depressão Charles ao minuto" and topic page', 'https://rr.pt/depressao-charles/tag/12540/', 'Rádio Renascença', 'Live blog (from 13:27 on 10 Nov) and a topic page, promoted on the front page beside its interactive.', 'liveblog', PRESS, 'Live blog and tool promoted as a pair.', 'Pair our timeline with the data pages the same way.', 'c-rr-tag c-renascenca')
C('sc-eco', 'topic-page', 'ECO: topic "Depressão Charles"', 'https://eco.sapo.pt/topico/depressao-charles/', 'ECO', 'A topic page collecting every piece (33 links on the front page at 23:39Z): companies, closures, insurance, transport.', 'explainer', PRESS, 'Volume on the business consequences.', 'A source list for decisions by companies.', 'c-eco-tag c-eco-live eco')
C('sc-jn', 'explainer', 'Jornal de Notícias: "Tudo o que precisa de saber" and "o que fecha"', 'https://www.jn.pt/nacional/artigo/tudo-o-que-precisa-de-saber-sobre-a-tempestade-charles/18146628', 'Global Media',
  'Two service pieces (12:22Z and 15:17Z): everything to know, and what closes on 11 November; plus a 60-second video round-up.', 'explainer presenter-video', PRESS, 'Service journalism in list form.', 'Lists beat prose for closures.', 'c-jn-tudo c-jn-fecha')
C('sc-tsf', 'explainer', 'TSF: path "incerto", critical period Wednesday afternoon; transport', 'https://www.tsf.pt/sociedade/artigo/depressao-charles-mantem-trajeto-incerto-e-devera-atingir-o-periodo-mais-critico-na-tarde-de-quarta-feira/18146855', 'Global Media',
  'Two pieces at 21:26Z and 21:31Z: the uncertain path with the critical period on Wednesday afternoon (attributed to the authorities), and transport conditions north to south.', 'explainer', PRESS, 'Radio\'s plain summary of when.', 'The "when" belongs in the first line of our hero, attributed.', 'c-tsf-trajeto c-tsf-transportes')
C('sc-cnn', 'broadcaster', 'CNN Portugal / TVI: video coverage and "Por onde vai entrar a tempestade Charles"', 'https://cnnportugal.iol.pt/meteorologia', 'Media Capital',
  'Studio and field video through the evening (preparation at a fire station, the police, the Prime Minister), and an explainer on where the storm may make landfall ("several possibilities"). The article address we tried returned 404 (truncated link); the section listing was read.', 'presenter-video explainer', PRESS,
  'The presenter at the map: the storm\'s possible paths explained by a person.', 'The "presenter" on our home page: a short voice that says what is known, what is not, and when we will know.', 'c-cnn-meteo c-cnn-trajeto c-cnn-tag')
C('sc-cm', 'broadcaster', 'Correio da Manhã / CMTV: "Veja o percurso da tempestade Charles"', 'https://www.cmjornal.pt/cmtv/videos/detalhe/veja-o-percurso-da-tempestade-charles-e-por-onde-deve-entrar-em-portugal', 'Medialivre', 'A video of the storm\'s path on a map; a climate section with closures (supermarkets) and the government\'s advice.', 'presenter-video maps', PRESS, 'The path as a moving picture.', 'People want the path; IPMA publishes a centre position per communiqué: plot those points, sourced.', 'c-cm-percurso c-cm-clima')
C('sc-tempopt', 'specialist-press', 'tempo.pt (Meteored): seven forecast pieces', 'https://www.tempo.pt/noticias/previsao/', 'Meteored',
  'Seven pieces on Charles by its meteorologists, each built around one number and one map: rain totals, gusts by district, the hour the heaviest rain reaches Lisbon, the size of the cloud mass.', 'explainer maps models', PRESS,
  'Hour-specific claims for Lisbon.', 'Private forecasts: evidence. Useful to compare against what IPMA says, never to replace it.', 'c-tempopt-1 c-tempopt-noticias')
C('sc-lusometeo', 'amateur', 'Luso Meteo: "Tempestade Charles pode, afinal, ser mais fraca do que o previsto"', 'https://lusometeo.com/atualidade/tempestade-charles-mais-fraca-32997/', 'Luso Meteo', 'Published 19:14Z on 10 Nov: an independent analysis that the storm may be weaker than forecast, with its own interactive maps.', 'explainer maps', PRESS,
  'The dissenting view, argued.', 'A hypothesis with its source; our own analysis recorded a weaker TAF at 23:00 too. Shown beside, not instead of, IPMA\'s reds.', 'c-lusometeo')
C('sc-wikipedia-pt', 'encyclopedia', 'Wikipedia (pt): "Depressão Charles"', 'https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles', 'Wikimedia volunteers',
  'An article exists: page id 8011202, eight revisions on 10 Nov between 13:07Z and 20:01Z, 17 KB. The article page itself answered 429 (rate limit); the revision list was read through the API.', 'explainer',
  {'api': 'MediaWiki API', 'licence': 'CC BY-SA 4.0', 'reuse': 'yes with attribution, share-alike'}, 'A citable summary that others will copy.', 'For incident.media@ and the conductor: sources.json records "no article found"; the title is "Depressão Charles" without a year.', 'c-wiki-pt-hist c-wiki-pt-article c-wiki-pt', seen='json', rank=6)
C('sc-wikipedia-en', 'encyclopedia', 'Wikipedia (en): "2026–27 European windstorm season", section Storm Charles', 'https://en.wikipedia.org/wiki/2026%E2%80%9327_European_windstorm_season', 'Wikimedia volunteers',
  'No article of its own in English ("Storm Charles 2026" does not exist); a section "Storm Charles" in the season article, which lists Bruna and Charles as active; last edited 10 Nov 20:32Z.', 'explainer',
  {'api': 'MediaWiki API', 'licence': 'CC BY-SA 4.0', 'reuse': 'yes with attribution, share-alike'}, 'The season in one table.', 'Link it for context on naming.', 'c-wiki-season c-wiki-en')
C('sc-euronews', 'international', 'Euronews: three pieces in English', 'https://www.euronews.com/2026/11/10/portugal-on-alert-as-storms-bruna-and-charles-raise-sting-jet-risk-of-160-kmh-winds', 'Euronews',
  'English coverage since 9 Nov: Charles to hit Portugal and Spain; red warnings for Madeira; the sting-jet risk (published 16:41Z, changed 18:01Z on 10 Nov).', 'explainer', PRESS, 'The main English-language source found.', 'English readers have little: our English hero matters.', 'c-euronews c-euronews-1')
C('sc-elpais', 'international', 'El País: Bruna and Charles in Spain', 'https://elpais.com/el-tiempo/2026-11-10/las-borrascas-bruna-y-charles-ponen-bajo-aviso-rojo-por-lluvias-a-extremadura-y-castilla-y-leon.html', 'PRISA',
  'Spanish side: red rain warnings in Extremadura and Castilla y León, schools closed in Extremadura and on the coast of Cádiz and Huelva.', 'explainer', PRESS, 'The neighbour\'s decisions.', 'Spain\'s decisions are comparable decisions: one line with a link.', 'c-elpais c-elpais-1')
C('sc-tpn', 'international', 'The Portugal News: "Weather Alert: Portugal on Red Alert for Storm Charles"', 'https://www.theportugalnews.com/news/2026-11-10/weather-alert-portugal-on-red-alert-for-storm-charles/1114149', 'The Portugal News', 'A presenter-led video forecast in English (17:35Z) and two earlier text items.', 'presenter-video', PRESS, 'English, video, short.', 'As Euronews.', 'c-tpn-alert c-theportugalnews')
C('sc-social', 'social', 'Open social networks: Mastodon tag #Charles', 'https://mastodon.social/tags/charles', 'public posts', 'Twenty recent public posts under the tag, a few about the storm (in Spanish and Portuguese), most about other things. The Bluesky post search refused our request (403).', 'social',
  {'api': 'Mastodon public API', 'licence': 'posts belong to their authors', 'reuse': 'link only'}, 'Little signal.', 'Not worth a block on the home page.', 'c-mastodon c-bsky-search c-bsky-ipma')
C('sc-not-covering', 'absent', 'Not covering Charles when read: Met Office storm centre, BBC, Severe Weather Europe, Zoom Earth, Copernicus EMS', 'https://www.metoffice.gov.uk/weather/warnings-and-advice/uk-storm-centre/index', 'several',
  'No mention of Charles was found on these pages at 23:38Z to 23:41Z. It is a south-western-group storm; the UK pages follow the western group\'s list. Reuters and The Guardian refused our requests (401, bot check) and were not read.', 'explainer',
  {'api': 'n/a', 'licence': 'n/a', 'reuse': 'n/a'}, 'n/a', 'Outside Portugal and Spain, Charles is barely covered in English: an opening for a clear English page with sources.',
  'metoffice-stormcentre c-bbc-search c-severeweathereu c-zoomearth-storms c-copernicus-act c-reuters c-guardian')

now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ')
doc = {
    'about': 'Three maps of weather sites, for incident.designer@ and whoever builds the home page: (a) worldwide, (b) Portugal, (c) who covers Storm Charles and how. Kept by incident.weatherwatch@web-summit.dinis. Public sources only. This is research about how others present weather; it is not a forecast and not a warning service: warnings are IPMA\'s.',
    'updated': now,
    'method': 'Each address was requested once from this session with a plain HTTP GET (no login, no script execution) between 23:38Z and 23:47Z on 10 November 2026. opened.status is the HTTP status; opened.read the UTC time; opened.seen says what the description rests on: "rendered" = also drawn in a headless browser at 23:48Z and looked at (opened.rendered.saw says what was seen; no image is kept); "html" = content read in the returned page; "json" = a data answer was read; "shell" = the page is drawn by script, only its shell and labels were read, and the description of the interactive part is general knowledge of the product, not an observation of this read; "blocked" = refused (401/403/429/bot check); "failed" = no answer or 404. Licence lines say "read" where the terms page was opened; otherwise they say so.',
    'fields': {'map': 'worldwide | portugal | storm-charles', 'how': 'tags: maps, warnings, timeline-hourly, presenter-video, radar, satellite, lightning, stations, models, tracker, liveblog, explainer, embed, interactive, feed, api, social', 'data': 'api, licence, reuse (can we show its content: yes / with attribution / embed only / link only / no)', 'best': 'what it does best', 'learn': 'what our site should take from it', 'rank': 'position within its map in the README ranking, where ranked'},
    'counts': {},
    'sites': S,
}
for m in (W, PT, SC):
    doc['counts'][m] = sum(1 for s in S if s['map'] == m)
doc['counts']['addresses_requested'] = len(P)
doc['counts']['not_opened'] = sorted(s['id'] for s in S if s['opened']['seen'] in ('blocked', 'failed'))
json.dump(doc, open(out, 'w'), indent=1, ensure_ascii=False)
open(out, 'a').write('\n')
print(doc['counts'], len(open(out).read()))
