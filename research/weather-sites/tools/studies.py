#!/usr/bin/env python3
"""Writes the annotated studies (studies/<id>.json and studies/index.json). Usage: studies.py <research/weather-sites dir> "<updated>".
Callouts are placed on the frame this agent drew and looked at: a 1280 x 1600 px viewport at the top of the page, scale 1.
x and y are fractions of that frame. A capture shown under them must use the same viewport, or the points will sit beside their parts."""
import json, sys
d, when = sys.argv[1], sys.argv[2]
BY = 'incident.weatherwatch@web-summit.dinis'; W, H = 1280, 1600
D = 'incidents/2026-11-10-storm-charles/data/'
CAPTURE = {  # from incident.archivist@ (206a7d7): the frame in the display vault, read in the browser with the published read key and checked against this sha256
 'aemet-warnings': ('aemet-es/2026/11/11/0252-en-eltiempo-prediccion-avisos', '2026-11-11T02:52:41Z', '0853b74ce35b97e3ba544f339ca51de7c9872c28af461a8f30c51bb46bc505ae'),
 'ipma-hourly': ('ipma/2026/11/11/0253-pt-otempo-prev-localidade-hora', '2026-11-11T02:53:07Z', '3eb704809470b4ab6329006c61cd6609d3ae86e0bb3e01b31146314aebe251fc'),
 'ipma-warnings-timeline': ('ipma/2026/11/11/0253-pt-otempo-prev-sam-p-lsb', '2026-11-11T02:53:19Z', 'bf64266ebc6b7dae5aecc60c766e24152effcabeb30b59ffbc49bba1d37d6c5c'),
 'knmi-warnings': ('knmi-nl/2026/11/11/0253-nederland-nu-weer-waarschuwingen', '2026-11-11T02:53:29Z', 'f8cf3d9b40d96b9d24973689372a86cea9bb41d637cd55de350894e31b1e1a7a'),
 'metoffice-place': ('metoffice-gov-uk/2026/11/11/0301-weather-forecast-gcpvj0v07', '2026-11-11T03:01:44Z', '23fd36b3d5ed319ab991abe17845c40aa24b7201cc885989a77d3c82b20e1ce0', 'frame-clean.jpg', 'notices hidden: the cookie-consent panel was hidden by the archivist, nothing clicked; the frame as served is on the evidence page'),
 'nws-point': ('weather-gov/2026/11/11/0254-mapclick-php-lat-40-7146-lon-74-0071', '2026-11-11T02:54:21Z', '7ca5a3e22a86a57030648a6f849cb4b6c7704a79235a4a4b82b972085e5a26ae'),
}
COVERED = {}   # captured and showable, but a consent panel covers the left half of the frame as served, over four of the six parts
PRIVATE = {'bbc-lisbon': 'bbc/2026/11/11/0252-weather-2267057', 'meteoalarm-portugal': 'meteoalarm/2026/11/11/0253-en-live-region-pt', 'meteofrance-vigilance': 'meteofrance-fr/2026/11/11/0253-fr', 'yr-lisbon': 'yr-no/2026/11/11/0254-en-forecast-hourly-table-2-2267057-portugal-lisbon-lisbon'}
def study(id_, site, name, country, url, seen, licence, summary, callouts, limits=None):
    doc = {'id': id_, 'site': site, 'site_page': f'research/weather-sites/sites/{site}.md', 'name': name, 'country': country, 'url': url, 'by': BY, 'updated': when,
           'frame': {'viewport': [W, H], 'scale': 1, 'part': 'top of the page, no scrolling', 'seen_utc': seen, 'callouts_checked_against_capture': id_ in CAPTURE and id_ not in COVERED},
           'capture': ({'evidence': CAPTURE[id_][0], 'evidence_page': f'evidence/{CAPTURE[id_][0]}.html', 'read_utc': CAPTURE[id_][1], 'sha256': CAPTURE[id_][2], 'vault': 'f86qsbla', 'path': CAPTURE[id_][0] + '/' + (CAPTURE[id_][3] if len(CAPTURE[id_]) > 3 else 'frame.jpg'), 'shown_as': (CAPTURE[id_][4] if len(CAPTURE[id_]) > 4 else 'as served'), 'by': 'incident.archivist@web-summit.dinis'} if id_ in CAPTURE and id_ not in COVERED else None),
           'capture_note': ('The frame is read in the browser from the display vault with the published read key and checked against the sha256; no image is kept in git. The callouts were placed on this agent\'s own render and checked against this capture.' if id_ in CAPTURE and id_ not in COVERED else 'Captured by incident.archivist@ (evidence ' + COVERED[id_] + '; see evidence/' + COVERED[id_] + '.html): as served to a first-time visitor a cookie-consent panel covers the left half of the frame, over four of the six parts, so the frame here stays empty until a frame with notices hidden exists.' if id_ in COVERED else 'Captured by incident.archivist@ (evidence ' + PRIVATE.get(id_, 'none') + ') and kept privately: the site\'s terms do not clearly allow showing a screenshot, so the frame stays empty and the link stands.'),
           'licence_for_showing_the_screenshot': licence, 'summary': summary,
           'callouts': [{'n': k + 1, 'x': round(x / W, 3), 'y': round(y / H, 3), 'title': t, 'does_well': w, 'fed_by': f, 'part': p} for k, (x, y, t, w, f, p) in enumerate(callouts)]}
    if limits: doc['limits'] = limits
    json.dump(doc, open(f'{d}/studies/{id_}.json', 'w'), indent=1, ensure_ascii=False); open(f'{d}/studies/{id_}.json', 'a').write('\n'); return doc
S = []
S.append(study('aemet-warnings', 'aemet', 'AEMET: meteorological warnings', 'Spain', 'https://www.aemet.es/en/eltiempo/prediccion/avisos', '2026-11-11T02:17Z',
 'AEMET allows reuse citing AEMET as the source without distorting the information (its legal notice): a screenshot with the credit fits.',
 'The fullest warnings page we saw: the next three days\' level in the header of every page, a special notice in words, a map with a hazard filter and a time bar, and under it a matrix of regions against time. On the night of Charles it showed red for Extremadura and Castilla y León.', [
 (250, 245, 'Three days, three dots, in the header', 'Wed 11 red, Thu 12 orange, Fri 13 yellow: the highest level of each of the next three days sits beside the menu on every page of the site.', D + 'weather/warnings.json (highest level per day)', 'warning-over-time'),
 (640, 395, 'The special notice, in words', 'One line above the map: "Aviso especial. Lluvias fuertes y persistentes, rachas muy fuertes y temporal marítimo." The forecasters\' own headline before any colour.', D + 'weather/communiques.json (the current communiqué\'s subject)', 'what-to-expect'),
 (285, 670, 'Hazards as a filter', 'All, Wind, Rainfalls, Storms, Coastal: one click redraws the map for one hazard.', D + 'weather/warnings.json (type)', 'warning-map'),
 (780, 760, 'The map by warning zone', 'Zones smaller than provinces, in the four European colours; the red zone is visible at once among the orange.', 'our own redraw from IPMA\'s JSON; district shapes from an open source', 'warning-map'),
 (680, 1110, 'A time bar with play', 'Three day tabs (each "00-24h") and a play button that runs the map through time.', D + 'weather/warnings.json (start_utc, end_utc)', 'warning-over-time'),
 (870, 1440, 'The matrix: regions against time', 'One row per region; the hazards in force as small icons framed in their level\'s colour; then one coloured cell per period across the three days. The whole country\'s next three days in one table. A feed icon on every row.', D + 'weather/warnings.json; for us the rows are Lisbon\'s hazards and then the decisions (' + D + 'decisions/graph.json)', 'warning-over-time')],
 limits='The cookie banner was not dismissed and takes the top 120 px of the frame.'))
S.append(study('metoffice-place', 'metoffice', 'Met Office: forecast for a place (London)', 'United Kingdom', 'https://www.metoffice.gov.uk/weather/forecast/gcpvj0v07', '2026-11-11T02:17Z',
 'Crown copyright; website material under the Open Government Licence v3.0 unless marked: a screenshot with the credit fits.',
 'The new Met Office place page: the next hour in very large type, three chips, ten day tabs, an hourly table that gives the gust its own row. No UK warning was in force, so the warning banner was not seen.', [
 (425, 331, 'Five views of one forecast', 'Daily, Detailed, Map, Long range, UK: the same place at five depths, as tabs.', 'our two faces: the weather face and the data room', 'navigation'),
 (110, 520, 'The next hour, very large', '"NEXT HOUR 9°C Light rain": the page answers "what now" before anything else.', D + 'weather/stations.json, airport.json (latest observation); warnings.json (in force now)', 'now'),
 (320, 641, 'Three chips, one of them the gust', '"Feels like 7°", "Light rain ≥95%", "Max gust 19mph from the northeast": the gust is named in the summary, in words, with its direction.', D + 'weather/gusts-vs-forecast.json (observed_airport_max_gust), warnings.json (the warning\'s own gust figure)', 'hour-by-hour'),
 (640, 780, 'Ten day tabs; the far ones marked BETA', 'High and low per day; days eight to ten carry a "BETA" label: lower confidence is marked on the tab itself.', D + 'weather/forecast.json (daily.days)', 'uncertainty'),
 (640, 1130, 'The hourly table, gust on its own row', 'Per hour: symbol, temperature, feels like, chance of rain, mean wind with arrow, and under it the gust. Mean wind and gust are never confused.', D + 'weather/forecast.json (hourly); label the mean-wind row "automatic"', 'hour-by-hour'),
 (180, 1345, 'When it was updated', '"Updated: 1am on 11 November 2026", directly under the table.', 'read_utc and next_read_utc of every file', 'times')]))
S.append(study('nws-point', 'nws', 'US National Weather Service: point forecast (New York)', 'United States', 'https://forecast.weather.gov/MapClick.php?lat=40.7146&lon=-74.0071', '2026-11-11T02:17Z',
 'US government work, public domain (third-party map tiles excepted): a screenshot may be shown.',
 'Plain and complete: observed conditions at a named station, a strip of periods, a sentence for each with its numbers, and a box that says what the forecast is, when it was made and until when it is valid, with the forecaster\'s discussion one click away. No hazard was in force.', [
 (640, 360, 'Observed now, at a named station', '"Current conditions at New York City, Central Park (KNYC)", with coordinates, and "Last update 10 Nov 8:51 pm EST": an observation is tied to its station and time.', D + 'weather/stations.json, airport.json', 'now'),
 (640, 620, 'Nine periods in a strip', 'Day and night as separate periods; the chance of rain printed on the picture; high or low; two or three words.', D + 'weather/forecast.json (daily)', 'hour-by-hour'),
 (450, 1040, 'A sentence per period, with numbers', '"Rain. High near 59. East wind 9 to 11 mph. Chance of precipitation is 100%. New precipitation amounts between a quarter and half of an inch possible." Ranges, not single values.', 'IPMA\'s descriptive forecast and warning texts (text_pt in warnings.json), quoted', 'what-to-expect'),
 (1030, 1350, 'About this forecast', 'The point, "Last Update", "Forecast Valid" from and to, and the data as KML and XML: provenance in a box of its own.', 'read_utc, next_read_utc; api/v1 links', 'times'),
 (135, 1387, 'The forecast discussion', 'A link to the forecasters\' own reasoning, in text, for this office.', D + 'weather/analysis.json (labelled hypothesis)', 'uncertainty')]))
S.append(study('bbc-lisbon', 'bbc-weather', 'BBC Weather: Lisbon', 'United Kingdom', 'https://www.bbc.com/weather/2267057', '2026-11-10T23:48Z',
 'BBC terms: no reuse without permission. The screenshot is shown only if the archivist\'s reading of its terms allows; otherwise the frame stays empty and the link stands.',
 'Dinis\'s reference for the weather face. One sentence, day tabs, an hour row, a map with a time bar. And, for Lisbon on the eve of IPMA\'s red warnings, no warning at all.', [
 (60, 455, 'The place, and nothing else, as the title', '"Lisbon" over a weather photograph; one button to keep it.', 'incidents/2026-11-10-storm-charles/incident.json (title, kicker)', 'navigation'),
 (250, 570, 'One sentence for the period', '"Tonight: Thundery showers and a gentle breeze", with the low. A whole forecast in six words.', 'incident.json (headline, standfirst); the sentence must come from the authority, see callout 7', 'what-to-expect'),
 (830, 596, 'Day tabs with high and low', 'Eight days in a row; the selected day is joined to the card.', D + 'weather/forecast.json (daily.days) with each day\'s warning colour from warnings.json', 'warning-over-time'),
 (240, 820, 'The hour columns', 'Hour, symbol, temperature, chance of rain, wind speed in a circle with its direction. Tap an hour for more.', D + 'weather/forecast.json (hourly)', 'hour-by-hour'),
 (1150, 1012, 'Last updated', '"Last updated today at 23:02", small, under the hours.', 'read_utc of each file', 'times'),
 (640, 1400, 'A map with a play button and a week of time', 'Rain over a satellite-style base map, a time bar from Wednesday to Tuesday, "Long forecast" and "Pressure" views.', 'none we may show (imagery.json): links to IPMA\'s radar and EUMETView, or our own warnings map', 'warning-map'),
 (250, 495, 'What is not there: any warning', 'No banner, colour or word about IPMA\'s red wind and rain warnings for the next day; the sentence says "a gentle breeze". A model without the authority. Our page starts where this one is silent.', D + 'weather/warnings.json, cap.json', 'what-to-expect')]))
S.append(study('meteofrance-vigilance', 'meteofrance-vigilance', 'Météo-France: Vigilance', 'France', 'https://vigilance.meteofrance.fr/fr', '2026-11-10T23:48Z',
 'Météo-France public data is under the French open licence (not re-read here): the archivist confirms before the screenshot is shown.',
 'One card that carries everything a warning needs: when issued, until when valid, when the next comes, the map, a legend written as actions, and a bar per hazard along the day.', [
 (470, 220, 'Issued, and valid until', '"émise le 10 novembre 2026 à 16h00 … valable jusqu\'au 12 novembre 2026 à 00h00": two times under the title.', D + 'weather/cap.json (sent_utc), communiques.json (validity)', 'times'),
 (580, 283, 'Today, tomorrow, and when the next map comes', 'Two tabs; tomorrow\'s is grey and says "Prochaine carte à 06h".', 'next_read_utc of each file; IPMA\'s communiqué validity', 'times'),
 (450, 520, 'One colour per département', 'The whole country at a glance, with the Paris area enlarged in an inset.', 'our own redraw from IPMA\'s JSON', 'warning-map'),
 (450, 722, 'A legend of actions', '"Vigilance absolue", "Soyez très vigilant", "Soyez attentif", "Pas de vigilance particulière": each colour is what to do.', 'IPMA\'s and ANEPC\'s own wording for each level, quoted', 'what-to-do'),
 (940, 366, 'Maps per phenomenon', 'A list of the hazards in force ("Orages"); choosing one redraws the map for it.', D + 'weather/warnings.json (type)', 'warning-map'),
 (520, 855, 'A bar per hazard along the day', 'Hours 0h to 0h across; one bar per phenomenon, coloured for the hours it applies. Floods link to the river service.', D + 'weather/warnings.json (start_utc, end_utc)', 'warning-over-time'),
 (450, 925, 'The rhythm, stated', '"Les cartes de vigilance météo sont actualisées au moins 2 fois par jour à 6h et 16h."', 'how often each file is read (next_read_utc)', 'times'),
 (1032, 203, 'A PDF version', 'The same card as a document to forward.', 'the page\'s markdown twin and api/v1', 'data')]))
S.append(study('ipma-warnings-timeline', 'ipma-avisos', 'IPMA: warnings on a timeline (Lisboa)', 'Portugal', 'https://www.ipma.pt/pt/otempo/prev-sam/?p=LSB', '2026-11-10T23:48Z',
 'IPMA: free use for personal or public purposes that are not for profit, with the source named, its logo and a link (imagery.json): a screenshot with "Fonte: IPMA" fits if the site is non-profit (a question open with Dinis).',
 'The primary source for Lisbon: eight hazards against 72 hours, then every warning as a bar with its period and one sentence.', [
 (480, 265, 'Eight hazards by 72 hours', 'One row per hazard (thunder, sea state, rain, wind, snow, cold, heat, fog), one cell per hour for three days, green to red: when each hazard starts and stops, in one picture.', D + 'weather/warnings.json', 'warning-over-time'),
 (400, 357, 'Days marked under the grid', '"11 nov", "12 nov", "13 nov" with hour ticks at 00, 06, 12, 18.', 'the same', 'warning-over-time'),
 (560, 690, 'Each warning as a bar with its sentence', '"Vento - Vermelho [11 Nov 12:00 - 11 Nov 21:00]" and under it "Rajadas até 120 km/h, podendo atingir 140 km/h nos locais mais expostos." Hazard, level, period, and what to expect.', D + 'weather/warnings.json (type, level, start_utc, end_utc, text_pt)', 'what-to-expect'),
 (1040, 440, 'Every district with its highest level', 'A list on the right: the district\'s name and a chip ("Vermelho", "Laranja"); the one shown is marked.', 'warnings.json (red_and_orange_elsewhere)', 'warning-map'),
 (300, 737, 'UTC, and the last update', '"Toda a informação em horas UTC" and "Última atualização: terça, 10 de novembro de 2026 às 21:23".', 'read_utc; cap.json (sent_utc)', 'times'),
 (990, 873, 'The criteria, linked', '"Critérios de emissão": what makes a warning yellow, orange or red.', 'a link; thresholds for the legend of our strip', 'what-to-do')]))
S.append(study('ipma-hourly', 'ipma-local', 'IPMA: hourly forecast for a place (Lisboa)', 'Portugal', 'https://www.ipma.pt/pt/otempo/prev.localidade.hora/#Lisboa&Lisboa', '2026-11-10T23:48Z',
 'As IPMA above.',
 'The page our hour strip should learn most from: day tabs that carry the warning colour, and an hourly table whose last row is the warnings themselves.', [
 (1030, 141, 'When it was made', '"Informação em horas UTC. Última atualização: 2026-11-10 19:56:03 (UTC)".', D + 'weather/forecast.json (hourly_runs)', 'times'),
 (447, 398, 'The day tab carries the warning', 'Under each day: min, max, wind, rain probability, and a label in the level\'s colour ("Amarelo", "Vermelho", "Amarelo").', D + 'weather/forecast.json (daily) + warnings.json', 'warning-over-time'),
 (730, 572, 'Rain probability by three-hour block', '"100%" across the morning and afternoon of Wednesday, "24%" at the end.', D + 'weather/forecast.json (hourly)', 'hour-by-hour'),
 (730, 720, 'Mean wind, hour by hour', 'An arrow, a figure in km/h and a direction per hour: 11 to 23 km/h. This is the automatic mean wind, not the gust the warning speaks of.', D + 'weather/forecast.json (hourly); label it "automatic, mean wind"', 'hour-by-hour'),
 (730, 878, 'The warnings as a row of the table', '"Avisos Meteorológicos": one cell per hour, yellow, then orange, then red from 09H to 21H. The best row on the page, placed last.', D + 'weather/warnings.json: on our strip this row goes first', 'warning-over-time'),
 (730, 1265, 'The caveat, in the notes', 'The page explains that this automatic forecast may differ from the forecasters\' descriptive forecast and from the warnings, which should be consulted. True and far from the numbers it qualifies.', 'a one-line note beside our model rows', 'uncertainty')]))
S.append(study('yr-lisbon', 'yr', 'Yr: Lisbon, hour by hour', 'Norway', 'https://www.yr.no/en/forecast/hourly-table/2-2267057/Portugal/Lisbon/Lisbon', '2026-11-10T23:48Z',
 'MET Norway data is NLOD / CC BY 4.0; the page design is Yr\'s. The archivist confirms before the screenshot is shown.',
 'A foreign public service that shows the local authority\'s warnings, in English, above its own hours.', [
 (640, 260, 'Warnings with a status word', 'Five banners for Lisboa: "Ongoing: Yellow Coastal Event Warning", "Expected: Orange Rain Warning", "Expected: Red Rain Warning", "Expected: Red Wind Warning", "Expected: Orange Coastal Event Warning". Each opens for the text.', D + 'weather/warnings.json (status from start_utc and end_utc against now)', 'what-to-expect'),
 (640, 960, 'The calm table', 'Time, symbol, temperature, precipitation in mm, wind in m/s with an arrow. No decoration.', D + 'weather/forecast.json (hourly, second_models)', 'hour-by-hour'),
 (875, 960, 'Wind in words', '"Fresh breeze from south east": a reader who does not think in metres per second still understands. But the words describe the automatic mean wind under a red wind warning, and the page does not say so.', 'the warning\'s own text beside any model wording', 'uncertainty'),
 (640, 1501, 'Sunrise and sunset', 'One line under the table.', 'not held', 'now'),
 (640, 1563, 'Previous day, next day', 'Two buttons; the table is one day at a time.', 'our strip: Wednesday, then Thursday', 'navigation')]))
S.append(study('meteoalarm-portugal', 'meteoalarm', 'MeteoAlarm: Portugal', 'Europe', 'https://www.meteoalarm.org/en/live/region/PT', '2026-11-10T23:48Z',
 'MeteoAlarm\'s maps, icons and layout belong to EUMETNET and are licensed to its participants only (its terms): the screenshot is not shown unless the archivist finds a basis; the link stands.',
 'Every national service\'s warnings in one format: a map, a time bar and a list.', [
 (790, 800, 'The country by warning area', 'Districts in yellow and orange on the mainland, Madeira in red, at the hour chosen.', 'our own redraw from IPMA\'s JSON (never a copy of this map)', 'warning-map'),
 (190, 1560, 'Now, +24h, each day, animation', 'A row of buttons under the validity window "Tu 2026.11.10 23:00 - We 2026.11.11 02:00 (GMT+0)".', D + 'weather/warnings.json', 'warning-over-time'),
 (1066, 208, 'Short-term and long-term hazards', 'Tabs that separate wind, rain and coast from slower hazards.', 'warnings.json (type)', 'warning-map'),
 (1066, 318, 'Filters by level and by hazard', 'Two lists.', 'the same', 'warning-map'),
 (1066, 900, 'One row per warning', 'The hazard\'s pictogram on its level\'s colour, then the area: Lisboa appears three times, once per warning.', D + 'weather/cap.json (each message)', 'what-to-expect')]))
S.append(study('knmi-warnings', 'knmi', 'KNMI: warnings', 'Netherlands', 'https://www.knmi.nl/nederland-nu/weer/waarschuwingen', '2026-11-11T02:17Z',
 'KNMI states the Creative Commons zero declaration (CC0) for its website content unless marked (its copyright page): the screenshot may be shown.',
 'Seen on a quiet night: what a warnings page says when there is nothing to warn about, and where it puts "what can I do".', [
 (150, 406, 'The state in one plain line', '"Er zijn geen waarschuwingen" (there are no warnings), as a line of text above the map, and again as a heading.', 'warnings.json (when nothing is in force, say so in words)', 'now'),
 (330, 714, 'A quiet map', 'The country with no colour at all when nothing is in force.', 'our own redraw', 'warning-map'),
 (920, 518, 'What it warns for', 'One sentence listing the hazards KNMI warns about.', 'a line in our legend: the eight hazards IPMA warns for', 'what-to-do'),
 (430, 1440, 'What can I expect and what can I do', 'One link per hazard: thunderstorms, heavy gusts and storm, snow, ice, heavy rain, cold, heat.', 'ANEPC\'s measures per hazard, quoted and linked', 'what-to-do')],
 limits='No warning was in force in the Netherlands, so the page in use was not seen.'))
PARTS = {'now': 'The state now', 'warning-map': 'The warning map', 'warning-over-time': 'The warning over time', 'hour-by-hour': 'Hour by hour', 'what-to-expect': 'What to expect (the warning in words)', 'what-to-do': 'What to do', 'uncertainty': 'Uncertainty', 'times': 'Issued, valid, next', 'data': 'The same as data', 'navigation': 'Finding your way'}
cross = {p: [{'study': s['id'], 'name': s['name'], 'country': s['country'], 'n': c['n'], 'title': c['title'], 'does_well': c['does_well']} for s in S for c in s['callouts'] if c['part'] == p] for p in PARTS}
json.dump({'about': 'Annotated studies of the best public-service weather pages (and BBC Weather, Dinis\'s reference): numbered callouts placed on the page as this agent drew and saw it (1280 x 1600 px, top of the page), each saying what the part does well and which of our data files would feed the same part. `cross` groups the same part across countries. Not studied: DWD\'s warnings page (it drew without its stylesheet in our browser, so there was nothing fair to annotate).',
           'by': BY, 'updated': when, 'parts': PARTS, 'studies': [{'id': s['id'], 'name': s['name'], 'country': s['country'], 'url': s['url'], 'file': f"{s['id']}.json", 'callouts': len(s['callouts']), 'seen_utc': s['frame']['seen_utc'], 'capture': s['capture']} for s in S], 'cross': cross},
          open(f'{d}/studies/index.json', 'w'), indent=1, ensure_ascii=False); open(f'{d}/studies/index.json', 'a').write('\n')
# the page
m = ['---', 'title: Weather pages, annotated', 'summary: Ten weather pages from seven countries with numbered callouts: what each part does well and which of our data would feed it.',
     'mount: <div id="ws-studies" class="card"><p class="meta">The annotated frames load here. The same content is in the text below.</p></div>', 'head: <script src="../../../app/evidence/vault-reader.js" defer></script><script src="studies.js" defer></script>', '---',
     '# Weather pages, annotated', '', f'> Kept by {BY}, {when} UTC', '',
     f'{len(S)} pages from {len(set(s["country"] for s in S))} countries and services, each with numbered callouts on the page as we drew and saw it (1280 x 1600 px, the top of the page). At Dinis\'s word of 11 November, ~02:20 UTC: "take a screenshot of a website and then you start pointing". The screenshots are incident.archivist@\'s captures: six are read in your browser from the display vault and checked against their sha256 (never kept in git), and each point was checked to sit on its part (the Met Office\'s is shown with its cookie-consent panel hidden, and says so); four are kept privately because the site\'s terms do not clearly allow showing them, and there the frame stays empty with the numbers where the parts are. Data: [index.json](index.json) and one file per study. [Back to the weather sites](../README.md).', '',
     '## The same part, across countries', '']
for p, title in PARTS.items():
    if not cross[p]: continue
    m += [f'### {title}', '', '| Where | What it does well |', '|---|---|'] + [f"| [{c['name']}](#{c['study']}) ({c['country']}), no. {c['n']}: {c['title']} | {c['does_well']} |" for c in cross[p]] + ['']
m += ['## The studies', '']
for s in S:
    m += [f'<h3 id="{s["id"]}">{s["name"]} ({s["country"]})</h3>', '', f"<{s['url']}> (leaves this site) · seen {s['frame']['seen_utc']} · [our page about the site](../sites/{s['site']}.md) · [data]({s['id']}.json)", '', s['summary'], '']
    if s.get('limits'): m += [f"Limits: {s['limits']}", '']
    m += ['| No. | Part | What it does well | Fed on our site by |', '|---|---|---|---|'] + [f"| {c['n']} | {c['title']} | {c['does_well']} | {c['fed_by'].replace(D, '`data/`')} |" for c in s['callouts']] + ['', f"May the screenshot be shown: {s['licence_for_showing_the_screenshot']}", '']
open(f'{d}/studies/README.md', 'w').write('\n'.join(m))
print(len(S), 'studies;', sum(len(s['callouts']) for s in S), 'callouts')
