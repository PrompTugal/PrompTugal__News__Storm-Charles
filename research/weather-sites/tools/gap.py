#!/usr/bin/env python3
"""Writes gap.json and imagery.json beside sites.json. Usage: gap.py <dir with sites.json>.
The judgements are from one read of each page (times in sites.json); 'not seen' is used where the page or its data was not read."""
import json, sys
d = sys.argv[1]
sites = {s['id']: s for s in json.load(open(d + '/sites.json'))['sites'] if s['map'] == 'storm-charles'}
Y, P, N, U, NA = 'yes', 'partly', 'no', 'not seen', 'n/a'
COLS = ['timeline', 'decisions', 'source_per_item', 'time_read', 'hour_by_hour', 'data']
# id: (timeline, decisions, source per item, time read, hour by hour, data/API, links to ipma.pt + prociv.gov.pt in the page's HTML or None, note)
G = {
 'sc-ipma': (P, N, Y, P, Y, Y, None, 'It is the source. Its warnings are on a time axis (the warnings timeline) and by hour (the place forecast); no record of what others decided; shows its own last-update time.'),
 'sc-prociv': (N, P, Y, N, N, N, None, 'Its own numbered notices and measures, dated by day; names IPMA as the basis.'),
 'sc-meteoalarm': (P, N, Y, Y, P, Y, None, 'Warnings on a time bar (now, +24h, by day), each entry with its issuing service and issue time; CAP feed.'),
 'sc-aemet': (N, N, Y, N, N, P, None, 'A table of the season\'s named storms; open data exists for other products.'),
 'sc-rr-dashboard': (N, N, P, U, N, N, 1, 'Maps and lists of warnings and occurrences; sources named for the tool as a whole ("Proteção Civil", "Avisos Meteorológicos"), not per item; the data loads by script and was not seen; no download offered in the page shell.'),
 'sc-rtp-live': (Y, P, N, P, N, N, 0, 'Live blog: decisions appear as entries among others; sources named in prose, no link to IPMA or ANEPC in the page; entry times are publication times.'),
 'sc-publico-live': (Y, P, N, P, N, N, 0, 'Live blog; as RTP.'),
 'sc-publico-explainer': (N, P, N, P, N, N, 0, 'Question and answer; first-published and last-changed times.'),
 'sc-observador-live': (Y, P, P, P, N, P, 5, 'Live blog with an anchor per entry and live-blog markup for search engines (machine-readable, not offered as data); five links to ANEPC, none to IPMA.'),
 'sc-observador-especial': (N, N, P, P, P, N, 1, 'Long explainer; two embedded model maps with their own time control; one link to IPMA.'),
 'sc-negocios-live': (Y, P, P, P, N, N, 1, 'Live blog centred on closures and services; one link to IPMA; one embedded chart.'),
 'sc-nam-live': (Y, P, P, P, N, N, 1, 'Live blog; one link to IPMA.'),
 'sc-rr-live': (Y, U, U, U, N, N, None, 'Titled "ao minuto"; only its topic page was read.'),
 'sc-eco': (P, P, N, P, N, N, 0, 'A topic page: pieces newest first, many on companies\' decisions, each a separate article.'),
 'sc-jn': (N, P, P, P, N, N, 2, 'Service lists ("what closes"); two links to IPMA in one piece.'),
 'sc-tsf': (N, P, N, P, N, N, 0, 'Two articles: the critical period and transport.'),
 'sc-cnn': (N, N, N, P, N, N, 0, 'Video items with duration and age.'),
 'sc-cm': (N, P, N, P, N, N, 0, 'Video of the path; closures as articles.'),
 'sc-tempopt': (N, N, P, P, P, N, 0, 'Its own forecasts, some hour-specific for Lisbon, by named forecasters; models named in prose (articles themselves not opened one by one).'),
 'sc-lusometeo': (N, N, P, P, P, N, 0, 'Its own analysis with interactive maps.'),
 'sc-wikipedia-pt': (P, P, Y, Y, N, Y, None, 'Read at the 00:29Z re-read (the first read answered 429): sections on the storm\'s evolution, on warnings and preventive measures, and on observed impacts; footnotes throughout, 31 of them with the date consulted ("Consultado em"); three links to ipma.pt; last changed 00:18Z on 11 November. Open API and licence.'),
 'sc-wikipedia-en': (P, N, Y, U, N, Y, None, 'A section in the season article, with footnotes; access dates in the references were not checked.'),
 'sc-euronews': (N, P, N, P, N, N, 0, 'Articles in English.'),
 'sc-elpais': (N, P, N, P, N, N, 0, 'Articles on the Spanish side.'),
 'sc-tpn': (N, N, N, P, N, N, 0, 'A presenter-led video and short items.'),
 'sc-social': (N, N, N, P, N, P, None, 'Public posts with their times; an open API.'),
 'sc-not-covering': (NA, NA, NA, NA, NA, NA, None, 'Pages that did not mention Charles when read.'),
}
assert set(G) == set(sites), set(G) ^ set(sites)
rows = []
for i, g in G.items():
    s = sites[i]
    rows.append({'id': i, 'name': s['name'], 'url': s['url'], 'kind': s['kind'], **dict(zip(COLS, g[:6])),
                 'links_to_ipma_or_anepc': g[6], 'note': g[7], 'read': s['opened']['read'], 'seen': s['opened']['seen']})
real = [r for r in rows if r['timeline'] != NA]
summary = {c: {v: sum(1 for r in real if r[c] == v) for v in (Y, P, N, U)} for c in COLS}
all_six = [r['id'] for r in real if all(r[c] == Y for c in COLS)]
press = [r for r in real if r['links_to_ipma_or_anepc'] is not None]
doc = {
 'about': 'The gap analysis: for each of the 27 entries of the Storm Charles map in sites.json, whether it shows the six things this site is built on. Kept by incident.weatherwatch@web-summit.dinis. Judgements from one read of each page on 10 November 2026 (23:38Z to 23:48Z); a page may have changed since. Not a criticism of anyone\'s journalism: live blogs and explainers do other things well (see sites.json, "best").',
 'updated': '2026-11-11T00:33Z',
 'by': 'incident.weatherwatch@web-summit.dinis',
 'columns': {
  'timeline': 'events in time order on one page, each with its time',
  'decisions': 'what was decided, by whom and when, as a list or table (not only as items in a stream): "partly" = decisions reported as entries or articles',
  'source_per_item': 'each item links to the primary source it rests on: "partly" = some links or sources named in prose; "no" = no link to the authority in the page',
  'time_read': 'each item says when the source was read (not only when the item was published): "partly" = publication or update time only',
  'hour_by_hour': 'the warned period shown by hour',
  'data': 'the same content for download or by API: "partly" = machine-readable markup or data for other products',
  'links_to_ipma_or_anepc': 'measured: links to ipma.pt or prociv.gov.pt found in the page\'s HTML (null where not applicable or not counted)'},
 'values': [Y, P, N, U, NA],
 'summary': {'entries': len(rows), 'assessed': len(real), 'with_all_six': all_six, 'by_column': summary,
             'press_pages_counted': len(press), 'press_pages_with_no_link_to_ipma_or_anepc': sum(1 for r in press if r['links_to_ipma_or_anepc'] == 0)},
 'ours': {'timeline': 'yes: incidents/2026-11-10-storm-charles/timeline.md and data/signals.json', 'decisions': 'yes: decisions.md and data/decisions/graph.json', 'source_per_item': 'yes: a rule of the repository (source URL on every item)',
          'time_read': 'yes: the UTC time read on every item', 'hour_by_hour': 'in data (data/weather/forecast.json, warnings.json); the strip on the home page is incident.designer@\'s round 1', 'data': 'yes: every dataset at its path and under api/v1/, listed with its sha256'},
 'rows': rows,
}
json.dump(doc, open(d + '/gap.json', 'w'), indent=1, ensure_ascii=False); open(d + '/gap.json', 'a').write('\n')
print(json.dumps(doc['summary']))

T = '2026-11-10T23:53Z'
imagery = {
 'about': 'Imagery we may show: the reuse terms as read on each owner\'s own page, with the page\'s address, and a verdict for the designer: hotlink (load the owner\'s image or tiles in our page), copy (serve our own copy: never in git, so not available to us now) or link only. Kept by incident.weatherwatch@web-summit.dinis. This is a careful reading of public terms, not legal advice; where the terms are silent the verdict says so and the decision is Dinis\'s.',
 'updated': '2026-11-10T23:58Z',
 'by': 'incident.weatherwatch@web-summit.dinis',
 'short_answer': 'No radar exists that we may hotlink without asking: IPMA\'s radar is the only one for Portugal and its terms allow non-profit use with source, logo and link but say nothing on hotlinking. For satellite, EUMETSAT allows Meteosat images one hour old or more for any purpose with attribution (after accepting a free licence in its user portal); newer than one hour on a public site needs a paid licence. MeteoAlarm\'s warnings may be redrawn by us under its conditions; its own map images may not be copied. Safest now: a text link "IPMA radar" and "EUMETView" with the time; best next: our own warnings map from IPMA\'s JSON; then ask IPMA (a person sends).',
 'sources': [
  {'id': 'ipma-radar', 'what': 'IPMA radar mosaic and single radars', 'page': 'https://www.ipma.pt/pt/otempo/obs.radar/', 'credit_on_page': 'copyright © IPMA',
   'terms_url': 'https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml', 'terms_read': T,
   'terms': ['"O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas."',
             '"O Utilizador deve referir, sempre, a fonte de informação."',
             '"O logo-símbolo do sítio de internet do IPMA deve ser utilizado sempre que um Utilizador pretenda incluir informação disponibilizada pelo sítio de internet em páginas de hiper-documentos, devendo referenciar a hiper-ligação ao site do IPMA."'],
   'reading': 'Free use for personal or public purposes that are neither for profit nor offensive; always name the source; when IPMA\'s information is included in a web page, show IPMA\'s logo with a link to its site. Nothing is said about loading its images from its server in another page (hotlinking), and the image addresses are produced by script, not documented or stable.',
   'hotlink': 'not addressed by the terms: do not, without IPMA\'s word', 'copy': 'within the wording for a non-profit page with source, logo and link; but we keep no images in git, so not now', 'link': 'yes',
   'verdict': 'Link only for now ("Radar: IPMA", opening IPMA\'s page). To show a frame: a person asks IPMA whether a non-profit newsroom may load the radar image with "Fonte: IPMA", the logo and a link. Whether this site counts as non-profit is Dinis\'s to state.'},
  {'id': 'ipma-satellite', 'what': 'Satellite images on IPMA\'s site (Meteosat)', 'page': 'https://www.ipma.pt/pt/otempo/obs.satelite/', 'credit_on_page': 'copyright © 2012 EUMETSAT/IPMA',
   'terms_url': 'https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml', 'terms_read': T,
   'terms': ['IPMA\'s terms as above; and "No que respeita aos sítios para que este site faz ligação deverá ser obtida a autorização dos autores desse material ou feita referência à fonte conforme as respectivas declarações de direitos de autor."'],
   'reading': 'The images carry EUMETSAT\'s copyright jointly with IPMA\'s, so EUMETSAT\'s data policy applies as well as IPMA\'s terms.',
   'hotlink': 'no', 'copy': 'no (two rights holders; real-time Meteosat is licensed data)', 'link': 'yes',
   'verdict': 'Link only. For a satellite view use EUMETSAT directly (next entry).'},
  {'id': 'eumetsat', 'what': 'Meteosat imagery from EUMETSAT (EUMETView web map services, Data Store)', 'page': 'https://view.eumetsat.int/',
   'terms_url': 'https://user.eumetsat.int/resources/user-guides/data-registration-and-licensing', 'terms_also': ['https://www.eumetsat.int/legal-framework/data-policy', 'https://www.eumetsat.int/about-us/terms-use'], 'terms_read': T,
   'terms': ['Core data and products: "made available without charge under a CC-BY-4.0 licence"; attribution: "[Contains modified] EUMETSAT [Meteosat/Metop] [data/product] [Year of publication or distribution]".',
             'Meteosat level 1 image data with a latency of one hour or more ("Recommended" data): "What you MAY do: Access and use for any purpose. What you MUST do: Include attribution to EUMETSAT. What you MUST NOT do: Redistribute the Original Numerical Data. ... There is no licensing fee"; "To access these data, you need to register in the user portal and accept the related terms and conditions."',
             'Meteosat level 1 image data with a latency of less than one hour: personal, educational, research: "non-commercial and non-operational" use only, and not "any operational and commercial use, including broadcasting in any form of the data"; "Service Provider/Broadcaster: ... broadcasting images based on the data ... Annual fee of EUR 8,000."',
             'Website content (pictures on eumetsat.int): "you may download and copy content from the EUMETSAT website(s) for your own personal and non-commercial use. For any other use of the content, you must request authorisation"; credit "©EUMETSAT [year]".',
             'EUMETView\'s web map service capabilities document states Fees: none, AccessConstraints: none (read 23:52Z).'],
   'reading': 'Images at least one hour old may be shown for any purpose with attribution, once the free licence is accepted in the user portal (an account: a person\'s step). Showing images newer than one hour on a public news page looks like "broadcasting" and falls under the paid licence; the guide does not say in so many words whether EUMETView\'s own rendered layers count as level 1 data, so this is the cautious reading.',
   'hotlink': 'EUMETView\'s WMS is a public service with no access constraint declared; loading a frame at least one hour old with attribution fits the terms as read; real-time: no', 'copy': 'as hotlink; nothing in git', 'link': 'yes',
   'verdict': 'Allowed with care: a satellite frame that is one hour old or more, from EUMETView\'s WMS, captioned "Contains modified EUMETSAT Meteosat data 2026" with its image time. Before building: Dinis (or a person he names) registers in the EUMETSAT user portal and accepts the licence; and a person asks EUMETSAT whether EUMETView layers newer than one hour may be shown. Until then: link to EUMETView.'},
  {'id': 'copernicus-ems', 'what': 'Copernicus Emergency Management Service: on-demand mapping products (flood and damage extent maps, after an activation)', 'page': 'https://mapping.emergency.copernicus.eu/',
   'terms_url': 'https://mapping.emergency.copernicus.eu/terms-and-conditions/', 'terms_read': T,
   'terms': ['"users shall have a free, full and open access to Copernicus Service Information" (Regulation (EU) 2021/696).',
             '"users are granted free access to the data of CEMS On-Demand Mapping for the following purposes ...: (a) reproduction; (b) distribution; (c) communication to the public; (d) adaptation, modification and combination with other data and information".',
             '"Where the user communicates to the public or distributes data of the CEMS On-Demand Mapping, he/she shall inform the recipients of the source of that data and information by using the ... Citation Guidelines". Some data are restricted (article 53) and need registration.'],
   'reading': 'Free to reproduce, show and adapt with the source cited as its citation guidelines say. Hotlinking is not mentioned; products are files to download.',
   'hotlink': 'not addressed', 'copy': 'yes with citation (not in git: a vault or a link)', 'link': 'yes',
   'verdict': 'Usable with citation once it exists: no activation naming Charles was listed at 23:40Z on 10 November. Nothing to show yet; watch the activations list.'},
  {'id': 'meteoalarm', 'what': 'MeteoAlarm: warnings (the "Information") and its own maps, icons and design (the "Content")', 'page': 'https://www.meteoalarm.org/en/live/region/PT',
   'terms_url': 'https://www.meteoalarm.org/en/live/page/terms-and-conditions', 'terms_read': T, 'terms_last_updated': '15/03/2024',
   'terms': ['"All Information on the MeteoAlarm Website may be used and redistributed under terms equivalent to the Creative Commons Attribution 4.0 International License (CC BY 4.0), along with the following additional requirements":',
             '"If the Information being redistributed is modified in any way, it must be redistributed along with the same Information without any material change or modification."',
             '"If the Information being redistributed spans a single country, the name of the relevant MeteoAlarm Participant (National Meteorological and Hydrological Service) must always be displayed." (More than one country: "EUMETNET – MeteoAlarm".)',
             '"The time of issue of the Information being redistributed ... must be included in any redistribution."',
             '"Any Information being redistributed through internet applications must include a link to the following URL: www.meteoalarm.org."',
             '"Any Information being operationally redistributed must always be made available to users in real-time, with the delay ... being on average less than five minutes and never longer than ten minutes."',
             '"All redistributors must publish the following disclaimer: \\"Time delays between this website and the www.meteoalarm.org website are possible. For the most up-to-date awareness information as published by the participating National Meteorological and Hydrological Services, please refer to www.meteoalarm.org.\\""',
             '"The Content on the MeteoAlarm Website [text, icons, design, layout, maps, software] ... is owned by EUMETNET. EUMETNET grants the MeteoAlarm Participants a ... license to use this Content."'],
   'reading': 'The warnings themselves may be reused and redrawn by us, with IPMA named, the issue time, a link to meteoalarm.org, the disclaimer sentence, and a delay under ten minutes if we republish them as a running service. MeteoAlarm\'s own map pictures, icons and layout are licensed only to the national services: not ours to copy or hotlink.',
   'hotlink': 'its map images: no. Its feed, read by our build or by the browser: yes under the conditions', 'copy': 'the Information: yes under the conditions; the Content: no', 'link': 'yes',
   'verdict': 'Draw our own warnings map from the data (IPMA\'s JSON is the simpler source and has only IPMA\'s terms). If MeteoAlarm\'s feed is used: show "IPMA", each warning\'s issue time, a link to meteoalarm.org and the disclaimer; note that our build is not continuous, so the ten-minute rule is met only if the browser reads the feed live.'},
 ],
 'alternatives_checked': [
  {'id': 'ipma-warnings-json', 'what': 'Our own warnings map drawn from api.ipma.pt', 'terms_url': 'https://api.ipma.pt/', 'verdict': 'The best "map" we may show today: IPMA\'s terms (non-profit, source named, logo and link) and no image to hotlink. District shapes need their own open source.'},
  {'id': 'windy-embed', 'what': 'Windy or Ventusky embedded map (model wind, rain; Windy also has radar and satellite layers)', 'terms_url': 'https://www.windy.com/', 'verdict': 'An embed (iframe) is the form these services offer and Observador uses; their own terms pages were not read in this pass, and the picture is a model, not a warning. Only below the fold, with its credit.'},
  {'id': 'rainviewer', 'what': 'RainViewer radar tiles', 'terms_url': 'https://www.rainviewer.com/api.html', 'verdict': '"free for personal, educational, and small-scale community use"; whether Portugal\'s radar is in its composite was not checked. Not for the home page without asking.'},
  {'id': 'nasa-gibs', 'what': 'NASA GIBS imagery tiles', 'terms_url': 'https://www.earthdata.nasa.gov/engage/open-data-services-software/data-information-policy', 'verdict': 'Open tiles made to be loaded by other sites, but polar-orbit daily imagery, not a live view of the storm; the policy page was opened and its text not read closely. For the day after.'},
 ],
 'asks_for_a_person': ['Dinis: say whether this site is non-profit in IPMA\'s sense ("finalidades lucrativas").', 'A person asks IPMA: may a non-profit newsroom load the radar image in its page with "Fonte: IPMA", the logo and a link? (draft on request; no contact details in git)', 'A person registers at the EUMETSAT user portal and accepts the licence for Meteosat data of one hour or more; and asks whether EUMETView layers newer than one hour may be shown.'],
}
json.dump(imagery, open(d + '/imagery.json', 'w'), indent=1, ensure_ascii=False); open(d + '/imagery.json', 'a').write('\n')
