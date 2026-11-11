#!/usr/bin/env python3
"""Writes a page per site (sites/<id>.md), the comparison table (compare.md) and the address list for captures (addresses.json)
from sites.json, links.json, gap.json and imagery.json. Usage: pages.py <research/weather-sites dir> "<date, time UTC>"."""
import json, sys, os, re
d, when = sys.argv[1], sys.argv[2]
BY = 'incident.weatherwatch@web-summit.dinis'
J = lambda f: json.load(open(f'{d}/{f}'))
sites = J('sites.json')['sites']; links = J('links.json')['sites']
TERMS = J('terms.json')['sites']
gap = {r['id']: r for r in J('gap.json')['rows']}; imagery = {s['id']: s for s in J('imagery.json')['sources']}
clean = lambda u: re.sub(r';jsessionid=[^?#]*', '', u)

COUNTRY = {'metoffice': 'United Kingdom', 'nws': 'United States', 'nhc': 'United States', 'dwd': 'Germany', 'meteofrance-vigilance': 'France', 'aemet': 'Spain', 'yr': 'Norway', 'knmi': 'Netherlands', 'smhi': 'Sweden', 'fmi': 'Finland', 'jma': 'Japan', 'bom': 'Australia', 'eccc': 'Canada', 'meteoswiss': 'Switzerland', 'meteireann': 'Ireland', 'ecmwf': 'International', 'eumetsat': 'International', 'meteoalarm': 'Europe', 'wmo-swic': 'International', 'copernicus-ems': 'Europe', 'nasa-worldview': 'United States', 'bbc-weather': 'United Kingdom', 'weathercom': 'United States', 'accuweather': 'United States', 'meteoblue': 'Switzerland', 'wunderground': 'United States', 'foreca': 'Finland', 'weatherandradar': 'Germany', 'windy': 'Czechia', 'ventusky': 'Czechia', 'nullschool': 'Japan', 'zoomearth': 'United Kingdom', 'openmeteo': 'Switzerland', 'pirateweather': 'Canada', 'rainviewer': 'not stated', 'blitzortung': 'Germany', 'meteociel': 'France', 'wetterzentrale': 'Germany', 'tropicaltidbits': 'United States', 'windguru': 'Czechia', 'windfinder': 'Germany', 'estofex': 'Europe', 'eswd': 'Europe', 'severeweathereu': 'Europe', 'fuberlin': 'Germany', 'mesonet': 'United States', 'aviationweather': 'United States', 'ogimet': 'Spain', 'kachelmann': 'Germany', 'wxcharts': 'United Kingdom', 'netweather': 'United Kingdom', 'pivotal': 'United States',
           'sc-meteoalarm': 'Europe', 'sc-aemet': 'Spain', 'sc-wikipedia-pt': 'International', 'sc-wikipedia-en': 'International', 'sc-euronews': 'Europe', 'sc-elpais': 'Spain', 'sc-social': 'International', 'sc-not-covering': 'International'}
# what the site itself says it uses (only where we read it; the read is named)
STATED = {
 'ipma': 'Its own observation network, radars and forecasters; for the automatic forecasts, "processamento estatístico das previsões de dois modelos numéricos (ECMWF e AROME)", updated twice a day from the 00 and 12 UTC runs (read on api.ipma.pt).',
 'ipma-local': 'Automatic: statistical processing of two numerical models, ECMWF and AROME, twice a day (read on the page\'s own notes and on api.ipma.pt). The page says this automatic forecast may differ from the forecasters\' descriptive forecast and warnings.',
 'ipma-avisos': 'IPMA\'s forecasters issue the warnings; criteria are on its "Critérios de emissão" page (linked from the page; not read).',
 'ipma-obs': 'IPMA\'s own radars, surface stations and lightning network; Meteosat imagery from EUMETSAT (the satellite page is marked "copyright EUMETSAT/IPMA").',
 'openmeteo': 'Open data of national services, listed on its licence page: DWD (ICON), ECMWF (IFS, AIFS), Météo-France, NOAA and others, each under its own open licence (read).',
 'yr': 'MET Norway\'s forecasts (credit asked: "The Norwegian Meteorological Institute"); the warnings shown for Lisbon are IPMA\'s. Which model feeds the Lisbon rows was not stated on the page read.',
 'windguru': 'Named on the page per table: GFS 13 km, GFS-Wave 16 km, IFS-HRES 9 km, IFS-WAM 9 km, ICON 7 and 13 km, WRF 3 and 9 km, Zephr-HD 2.6 km, GDPS 15 km and others, each with its run time ("init"); live readings from named local stations (seen in the rendered page).',
 'windy': 'Model switch on the map: ECMWF, GFS, ICON, AROME and others (product knowledge; the model list was not read in this pass). Observador\'s embeds name GFS and ECMWF.',
 'ventusky': 'Observador\'s two embeds of it request the models "gfs" and "ecmwf_hres" (read in the embed addresses).',
 'meteoalarm': 'Warnings from the national services themselves (EUMETNET members); for Portugal, IPMA (read in its terms and feed).',
 'ecmwf': 'Its own models: IFS and AIFS (read on its open-data page).',
 'dwd': 'Its own models (ICON), radar network and stations (its open-data server was listed; model names from Open-Meteo\'s licence page).',
 'knmi': 'Its own stations and the HARMONIE-AROME model (read on the KNMI Data Platform listing).',
 'eumetsat': 'Its own satellites: Meteosat (including the third generation: the default EUMETView layers were MTG lightning, precipitation rate and infrared), Metop (read in EUMETView and its licensing guide).',
 'bbc-weather': 'Not stated on the page read.',
 'nullschool': 'GFS (product knowledge; not read in this pass).',
 'aviationweather': 'METAR and TAF as issued by each airport\'s meteorological office (for Lisbon, issued in Portugal).',
 'tempopt': 'Not stated on the pages read; its articles name models and IPMA in prose.',
 'sc-rr-dashboard': 'Labelled on the page: "Proteção Civil" for occurrences and "Avisos Meteorológicos" for warnings; the feeds behind it load by script and were not seen.',
 'fogos': 'ANEPC\'s occurrence data (stated on the site).',
}
# coverage of Storm Charles by entries of the worldwide and Portugal maps
CH = {
 'yr': 'Indirectly: its Lisbon page showed IPMA\'s five warnings for Lisboa in English above the hourly table (rendered 10 Nov, 23:48 UTC). No article on the storm.',
 'bbc-weather': 'No: its Lisbon page showed no warning and "Thundery showers and a gentle breeze" on the eve of IPMA\'s red warnings (rendered 10 Nov, 23:48 UTC); a site search found nothing.',
 'metoffice': 'No: its storm centre follows the western group\'s names; Charles is a south-western name. Its news blog did not mention it at 00:29 and 01:29 UTC on 11 Nov.',
 'meteoalarm': 'Yes, as data: IPMA\'s warnings for Portugal in its map and CAP feed (see [MeteoAlarm: Portugal feed](sc-meteoalarm.md)).',
 'aemet': 'Yes: Charles is on its season table; Spain\'s own warnings for the storm are on its warnings page (see [AEMET: season table](sc-aemet.md)).',
 'windy': 'As a tool: any reader can see the low on its map; no page of its own for the storm.',
 'ventusky': 'As a tool: Observador embeds two of its gust maps in its special on Charles (see [Observador special](sc-observador-especial.md)).',
 'zoomearth': 'No page for Charles (it tracks tropical systems).',
 'copernicus-ems': 'No activation naming Charles on its list at 23:40 UTC on 10 Nov and 01:29 UTC on 11 Nov.',
 'severeweathereu': 'Nothing on its front page at 23:40, 00:29 and 01:29 UTC.',
 'ipma': 'Yes: it named the storm and issues the warnings (see [IPMA: communiqué and warnings](sc-ipma.md)).', 'ipma-avisos': 'Yes: Lisbon\'s red rain and red wind warnings for 11 November are drawn here (see [IPMA](sc-ipma.md)).',
 'ipma-comunicados': 'Yes: communiqué no. 2 on Charles (see [IPMA](sc-ipma.md)).', 'ipma-local': 'Yes: the hourly page for Lisbon carries the warnings row for 11 November.', 'ipma-obs': 'Yes, as observation: radar, satellite and station readings during the storm.',
 'prociv': 'Yes: notice 21 and preventive measures (see [ANEPC](sc-prociv.md)).', 'fogos': 'Yes, as data: civil-protection occurrences (its API answered 429 to us).',
 'rtp': 'Yes: the national live blog (see [RTP live blog](sc-rtp-live.md)).', 'publico': 'Yes: live blog and explainer (see [Público live](sc-publico-live.md), [explainer](sc-publico-explainer.md)).',
 'observador': 'Yes: live blog and special (see [live](sc-observador-live.md), [special](sc-observador-especial.md)).', 'cnnportugal': 'Yes: video coverage (see [CNN Portugal / TVI](sc-cnn.md)).',
 'press-others': 'Yes: see [Negócios](sc-negocios-live.md), [Notícias ao Minuto](sc-nam-live.md), [Renascença](sc-rr-live.md) and its [dashboard](sc-rr-dashboard.md), [ECO](sc-eco.md), [JN](sc-jn.md), [TSF](sc-tsf.md), [CM](sc-cm.md).',
 'tempopt': 'Yes: seven forecast pieces (see [tempo.pt](sc-tempopt.md)).', 'lusometeo': 'Yes: an analysis that it may be weaker (see [Luso Meteo](sc-lusometeo.md)).', 'meteopt': 'Not seen: the forum index was read; the event thread was not found.',
 'english-press': 'Yes: a presenter video and two items (see [The Portugal News](sc-tpn.md)).', 'sapo-tempo': 'Yes: its front page aggregates the storm headlines of many outlets.', 'beachcam': 'Yes: Charles items on its front page.',
 'sic': 'Not opened (403); its headlines on the storm were read through SAPO.', 'expresso': 'Not opened (403).',
}
# sites whose own terms restrict automated access or use by AI systems (terms.json): we stopped reading them on 11 November, 02:40 UTC
RESTRICT = {'zoomearth': 'Zoom Earth', 'tempopt': 'tempo.pt (Meteored)', 'sc-tempopt': 'tempo.pt (Meteored)', 'english-press': 'The Portugal News', 'sc-tpn': 'The Portugal News'}
OFFICIAL = {'national-service', 'authority', 'authority-aggregator', 'civil-protection', 'public-service', 'warnings-aggregator', 'satellite', 'emergency-mapping', 'open-data', 'encyclopedia', 'storm-tracker', 'aviation', 'archive', 'data-api'}
MAPNAME = {'worldwide': 'Worldwide', 'portugal': 'Portugal', 'storm-charles': 'Storm Charles coverage'}
SEEN = {'rendered': 'drawn in a headless browser and looked at', 'html': 'content read in the returned page', 'json': 'a data answer read', 'shell': 'drawn by script: only the shell and labels read', 'blocked': 'refused (401, 403, 429 or a bot check)', 'failed': 'no answer or 404'}
os.makedirs(f'{d}/sites', exist_ok=True)
for old in os.listdir(f'{d}/sites'): os.remove(f'{d}/sites/{old}')
addresses, rows = [], []
for s in sites:
    i, o, L = s['id'], s['opened'], links.get(s['id'], {})
    country = COUNTRY.get(i, 'Portugal' if s['map'] != 'worldwide' else 'not stated')
    cap = 'yes' if (s['kind'] in OFFICIAL and s['owner'] not in ('Neave Interactive',)) else 'only if its terms allow: otherwise the link'
    if i in RESTRICT: cap = 'no: its terms restrict automated access; link only'
    if o['seen'] in ('blocked', 'failed'): cap_note = 'the address refused or did not answer our request'
    else: cap_note = None
    terms, contact = L.get('terms'), L.get('contact')
    m = [f"# {s['name']}", '', f"> Kept by {BY}, {when} UTC", '',
         f"[All weather sites](../README.md) · [compare](../compare.md) · {MAPNAME[s['map']]} · {s['kind']} · {country}", '',
         f"**Address:** <{s['url']}> (leaves this site)  ", f"**Owner:** {s['owner']}", '',
         '## Screenshot', '', f"None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: {cap}). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.", '',
         '## What it shows, and how', '', s['shows'], '', 'Forms: ' + ', '.join(f'`{h}`' for h in s['how']) + '.', '']
    if 'rendered' in o: m += [f"**Seen in a browser ({o['rendered']['read'][11:16]} UTC, {o['rendered']['read'][:10]}):** {o['rendered']['saw']}", '']
    m += ['## What it does best', '', s['best'], '', '## What we take from it', '', s['learn'], '',
          '## Data and models it says it uses', '', STATED.get(i, 'Not read: we did not open a page of this site that says what data or models it uses.'), '',
          '## API and feeds', '', s['data'].get('api') or 'not stated', '',
          '## Licence and terms', '', f"As we recorded it: {s['data'].get('licence') or 'not stated'}.  ", f"May we show its content: **{s['data'].get('reuse') or 'not stated'}**.  "]
    m += [f"Its terms page, as linked on the site (\"{terms['text']}\"): <{clean(terms['url'])}> (found {terms['read'][11:16]} UTC, {terms['read'][:10]}; excerpts below where the page opened)." if terms else 'No link to terms or a licence was found in the HTML we read (many sites draw their footer by script): **not stated** as far as we read.', '']
    tj = TERMS.get(i)
    SIG = {'open_licence': 'an open licence is named', 'all_rights_reserved': 'all rights reserved', 'needs_permission': 'prior permission or consent is required for some uses', 'names_automated_access_or_ai': 'automated access, scraping or AI is named', 'non_commercial_only': 'personal or non-commercial use is named'}
    if tj and tj.get('excerpts'):
        m += [f"**From its terms page as published** (read {tj['read'][11:16]} UTC, {tj['read'][:10]}; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):", ''] + [f'> {x}\n' for x in tj['excerpts']]
        if tj.get('signals'): m += ['Words found on that page: ' + '; '.join(SIG[x] for x in tj['signals']) + '.', '']
    elif tj: m += [f"Its terms page was not read: {tj.get('note') or 'no text about reuse was found in it'}.", '']
    im = imagery.get(i) or imagery.get({'ipma-obs': 'ipma-radar', 'sc-meteoalarm': 'meteoalarm', 'sc-ipma': 'ipma-radar'}.get(i, ''))
    if im: m += [f"**Exact terms** (read {im['terms_read'][11:16]} UTC, <{im['terms_url']}>):", ''] + [f'- {t}' for t in im['terms']] + ['', f"Our reading: {im['reading']} Verdict: {im['verdict']} (from [imagery.json](../imagery.json); not legal advice.)", '']
    if i in RESTRICT: m += ['**Its terms restrict automated access or use by AI systems (see the sentences above).** We read this site once before reading its terms; since 11 November 2026, 02:40 UTC we no longer request its pages, we keep only the link and the short description, and nothing of it is captured. Whether to ask for permission is for a person to decide.', '']
    m += ['## Storm Charles', '']
    if s['map'] == 'storm-charles':
        g = gap[i]
        if g['timeline'] != 'n/a':
            m += ['This entry is part of the coverage map. Against the six things this site is built on ([the gap table](../README.md), [gap.json](../gap.json)):', '',
                  '| Timeline | Decisions | Source per item | Time read | Hour by hour | Data |', '|---|---|---|---|---|---|',
                  '| ' + ' | '.join(g[c] for c in ('timeline', 'decisions', 'source_per_item', 'time_read', 'hour_by_hour', 'data')) + ' |', '', g['note']]
            if g['links_to_ipma_or_anepc'] is not None: m += ['', f"Links to ipma.pt or prociv.gov.pt in the page's HTML: {g['links_to_ipma_or_anepc']}."]
        else: m += [g['note']]
        m += ['', 'Later reads: [rereads.json](../rereads.json).', '']
    else: m += [CH.get(i, 'Not checked: we did not look for Storm Charles on this site.'), '']
    m += ['## How to reach it', '']
    m += [f"Its own contact page, as linked on the site (\"{contact['text']}\"): <{clean(contact['url'])}> (found {contact['read'][11:16]} UTC, {contact['read'][:10]})." if contact else 'No contact link was found in the HTML we read.',
          'A person writes, in their own name; no agent does. No address, phone number or person is recorded here.', '',
          '## How we read it', '', f"- Read: {o['read']} · HTTP {o['status']} · {SEEN.get(o['seen'], o['seen'])}", '- Addresses requested: ' + ', '.join(f'`{k}` {v}' for k, v in o.get('probes', {}).items())]
    if o.get('note'): m += [f"- Note: {o['note']}"]
    m += [f"- Data: this entry in [sites.json](../sites.json) (`{i}`)", '']
    open(f'{d}/sites/{i}.md', 'w').write('\n'.join(m))
    addresses.append({'id': i, 'url': s['url'], 'name': s['name'], 'owner': s['owner'], 'kind': s['kind'], 'map': s['map'], 'capture': cap, 'note': cap_note, 'page': f'research/weather-sites/sites/{i}.md', 'first_read': o['read'], 'first_status': o['status']})
    api = s['data'].get('api') or 'not stated'
    has_api = 'no' if re.match(r'(none|not assessed|n/a|commercial only|for paying|for station|for contributing)', api, re.I) else ('paid' if re.match(r'(commercial|paid)', api, re.I) else 'yes')
    stated = STATED.get(i, 'not read'); short = lambda x, n: x if len(x) <= n else x[:n].rsplit(' ', 1)[0] + '…'
    lic = short(s['data'].get('licence') or 'not stated', 70)
    rows.append('| [{}](sites/{}.md) | {} | {} | {} | {} | {} | {} | {} | {} |'.format(s['name'].replace('|', '/'), i, MAPNAME[s['map']], s['kind'], country,
                short(stated.replace('|', '/'), 90), f"[{has_api}](sites/{i}.md#api-and-feeds)", (f"[{lic}]({clean(terms['url'])})" if terms else lic), s['data'].get('reuse') or 'not stated', SEEN.get(o['seen'], o['seen']).split(':')[0].split(' (')[0]))
json.dump({'about': 'For incident.archivist@: every address of the weather-sites research, to capture (screenshot, HTML, sha256) into a vault. capture = "yes" for official and public-service sites; for commercial sites and the press, only where the site\'s terms allow, otherwise our pages keep the link. When a capture exists, the site\'s page (the `page` field) should show it; tell incident.weatherwatch@ the evidence id and the pages will carry it.',
           'by': BY, 'updated': when, 'count': len(addresses), 'capture_yes': sum(1 for a in addresses if a['capture'] == 'yes'), 'addresses': addresses}, open(f'{d}/addresses.json', 'w'), indent=1, ensure_ascii=False)
open(f'{d}/addresses.json', 'a').write('\n')
head = ['---', 'title: Weather sites compared', 'summary: 106 weather sites and Storm Charles sources in one table: kind, country, data source, API, licence. Sort and filter.',
        'mount: <div id="ws-compare" class="card"><p class="meta">Filter and sort: loading. The table below works without it.</p></div>', 'head: <script src="compare.js" defer></script>', '---',
        '# Weather sites compared', '', f'> Kept by {BY}, {when} UTC', '',
        f'All {len(sites)} entries of [sites.json](sites.json) in one table. Click a column head to sort; type in the box to filter; a kind, a country or a map can be picked from the lists. Every site name opens our page about it; the licence cell opens the site\'s own terms page where we found one. "Data and models" is what the site itself says, where we read it. [Back to the ranking and the ten ideas](README.md).', '',
        '| Site | Map | Kind | Country | Data and models (as stated) | API | Licence | May we show it | How we read it |', '|---|---|---|---|---|---|---|---|---|'] + rows + ['']
open(f'{d}/compare.md', 'w').write('\n'.join(head))
ix = ['# Every weather site, one page each', '', f'> Kept by {BY}, {when} UTC', '', 'One page per entry of [sites.json](../sites.json): what it shows and how, the data and models it says it uses, its API, its licence and terms as published, whether it covered Storm Charles, and its own contact page. [Compare them in one table](../compare.md) · [the ranking and the ten ideas](../README.md).', '']
for mp in ('storm-charles', 'portugal', 'worldwide'):
    ix += [f'## {MAPNAME[mp]}', ''] + [f"- [{s['name']}]({s['id']}.md): {s['kind']}, {s['owner']}" for s in sites if s['map'] == mp] + ['']
open(f'{d}/sites/README.md', 'w').write('\n'.join(ix))
print(len(sites), 'pages;', len(rows), 'rows')
