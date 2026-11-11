#!/usr/bin/env python3
"""incident.datascience@web-summit.dinis: hospitals (OSM), Lisbon's 2 km squares, low land by municipality.
Usage: python3 -I ds_geo.py <rawdir> <outdir> <read_utc>
<rawdir> holds (downloaded once; kept in a vault, not git):
  kontur/pt.gpkg            Kontur Population PT 2023-11-01 (CC BY 4.0, via HDX)
  geo/lau_pt.geojson        Eurostat GISCO LAU 2021 (Portugal's parishes, with census 2021 population)
  osm/hf/health_facilities.geojson  HOT export of OSM health facilities, snapshot 2026-11-03 (ODbL)
  dem/Copernicus_DSM_COG_10_N3{8,9}_00_W0{10,09}_00_DEM.tif  Copernicus DEM GLO-30
Needs numpy and Pillow only."""
import json, math, sqlite3, struct, sys
import numpy as np
from PIL import Image, ImageDraw

raw, out, read_utc = sys.argv[1], sys.argv[2], sys.argv[3]
BY = 'incident.datascience@web-summit.dinis'
AML = ['1502', '1503', '1115', '1504', '1105', '1106', '1107', '1109', '1506', '1507', '1116', '1110', '1508', '1510', '1511', '1512', '1111', '1114']
pop = json.load(open(f'{out}/population.json'))
MUN = {m['code']: m for m in pop['municipalities']}

# ---- parishes -> municipality polygons
lau = json.load(open(f'{raw}/geo/lau_pt.geojson'))['features']
def rings(g):
    if g['type'] == 'Polygon': return [g['coordinates']]
    return g['coordinates']
munpolys = {}
for f in lau:
    munpolys.setdefault(f['properties']['LAU_ID'][:4], []).extend(rings(f['geometry']))
def bbox(polys):
    xs = [p[0] for poly in polys for p in poly[0]]; ys = [p[1] for poly in polys for p in poly[0]]
    return min(xs), min(ys), max(xs), max(ys)
munbox = {k: bbox(v) for k, v in munpolys.items()}
def inring(x, y, r):
    c = False; j = len(r) - 1
    for i in range(len(r)):
        xi, yi = r[i]; xj, yj = r[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi: c = not c
        j = i
    return c
def which_mun(x, y):
    for k, (a, b, c, d) in munbox.items():
        if a <= x <= c and b <= y <= d:
            for poly in munpolys[k]:
                if inring(x, y, poly[0]) and not any(inring(x, y, h) for h in poly[1:]): return k
    return None
AREA = {}
for a in pop['areas']: AREA[a['area']] = a['name']
def ipma_area(code):
    m = MUN.get(code); return m and m.get('area')

# ---- hospitals (OSM)
hf = json.load(open(f'{raw}/osm/hf/health_facilities.geojson'))['features']
def centroid(g):
    if g['type'] == 'Point': return g['coordinates']
    pts = [p for poly in rings(g) for p in poly[0]]
    return [sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)]
import re
# a private person is never named: keep a name only when it reads as an institution's
INST = re.compile(r'(?i)hospita|centro|cl[ií]nica|unidade|instituto|maternidade|casa de sa[uú]de|sanat|cuf|lus[ií]adas|miseric[oó]rdia|ordem|funda[cç][aã]o|cruz vermelha|\bhpa\b|\buls\b|\bchu\b|policl[ií]nica|\bipo\b|psiqui|reabilita|urg[eê]ncia|consulta|servi[cç]o|cuidados|imagiologia|associa[cç][aã]o|ucsp|\bsams\b|\bluz\b|universidade|blocos|militar|pedi[aá]tric|oncolog')
hosp = []
for f in hf:
    p = f['properties']
    if p.get('amenity') != 'hospital' and p.get('healthcare') != 'hospital': continue
    x, y = centroid(f['geometry'])
    m = which_mun(x, y)
    nm = p.get('name')
    withheld = bool(nm) and not INST.search(nm)
    hosp.append({'osm': p['id'], 'name': None if withheld else nm, 'name_withheld': withheld, 'operator_type': p.get('operator_type'), 'healthcare_speciality': p.get('healthcare_speciality'),
                 'lat': round(y, 5), 'lon': round(x, 5), 'municipality': m, 'municipality_name': MUN.get(m, {}).get('name') if m else None,
                 'ipma_area': ipma_area(m) if m else None, 'in_lisbon_metro': m in AML})
hosp.sort(key=lambda h: (h['municipality'] or 'zz', h['name'] or ''))
json.dump({'about': 'Hospitals mapped in OpenStreetMap in Portugal (amenity=hospital or healthcare=hospital), each placed in its municipality and IPMA warning area. A map of buildings, not a statement that any is open, has an emergency service, or has capacity: for that, the SNS and each hospital.',
  'label': 'evidence: OpenStreetMap, as mapped by its contributors (completeness and tags vary)',
  'source': 'https://production-raw-data-api.s3.amazonaws.com/ISO3/PRT/health_facilities/hotosm_prt_health_facilities_osm_geojson.zip',
  'source_name': 'OpenStreetMap via the Humanitarian OpenStreetMap Team export on HDX (hotosm_prt_health_facilities), snapshot 2026-11-03',
  'licence': 'ODbL 1.0: © OpenStreetMap contributors (https://www.openstreetmap.org/copyright)',
  'read_utc': read_utc, 'snapshot_utc': '2026-11-03',
  'method': 'Features tagged hospital; polygons reduced to the mean of their outline points; municipality by point in polygon on Eurostat GISCO LAU 2021 parishes (1:1M generalised: points within ~100 m of a border can fall on the wrong side). operator_type (public/private) only where a mapper tagged it. A name that does not read as an institution\'s (it may be a private practitioner\'s) is withheld (name null, name_withheld true); the OSM id stays.',
  'confidence': 'MEDIUM: OSM is well mapped in Lisbon, but names, duplicates (a site and its buildings) and public/private tags are uneven.',
  'by': BY, 'updated': read_utc, 'count': len(hosp), 'hospitals': hosp}, open(f'{out}/hospitals.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print('hospitals', len(hosp), 'in Lisbon metro', sum(h['in_lisbon_metro'] for h in hosp))

# ---- Kontur hexagons: centroid from the GeoPackage envelope (EPSG:3857)
R = 6378137.0
def merc2ll(x, y): return math.degrees(x / R), math.degrees(2 * math.atan(math.exp(y / R)) - math.pi / 2)
con = sqlite3.connect(f'{raw}/kontur/pt.gpkg')
hexes = []
for blob, p in con.execute('select geom, population from population'):
    flags = blob[3]; env = (flags >> 1) & 7
    end = '<' if flags & 1 else '>'
    if env == 0: continue
    minx, maxx, miny, maxy = struct.unpack(end + '4d', blob[8:40])
    lon, lat = merc2ll((minx + maxx) / 2, (miny + maxy) / 2)
    hexes.append((lon, lat, p))
print('kontur hexes', len(hexes), 'people', round(sum(h[2] for h in hexes)))

# ---- DEM crop over the Lisbon metro area
W, S_, E, N = -9.55, 38.35, -8.45, 39.10
res = 1 / 3600
tiles = {}
for la in (38, 39):
    for lo in (10, 9):
        im = Image.open(f'{raw}/dem/Copernicus_DSM_COG_10_N{la}_00_W{lo:03d}_00_DEM.tif')
        tiles[(la, lo)] = np.array(im, dtype=np.float32)
full = np.vstack([np.hstack([tiles[(39, 10)], tiles[(39, 9)]]), np.hstack([tiles[(38, 10)], tiles[(38, 9)]])])  # top-left = (-10, 40)
r0, r1 = int(round((40 - N) / res)), int(round((40 - S_) / res)); c0, c1 = int(round((W + 10) / res)), int(round((E + 10) / res))
dem = full[r0:r1, c0:c1]; del full, tiles
lat_rows = N - (np.arange(dem.shape[0]) + 0.5) * res
pix_km2 = (res * 111.32) ** 2 * np.cos(np.radians(lat_rows))[:, None]
low = (dem >= 0.5) & (dem <= 5.0)
land = dem >= 0.5
# rasterise the 18 municipalities onto the DEM grid
lab = Image.new('L', (dem.shape[1], dem.shape[0]), 0); dr = ImageDraw.Draw(lab)
def px(pt): return ((pt[0] - W) / res, (N - pt[1]) / res)
for i, k in enumerate(AML, 1):
    for poly in munpolys[k]:
        dr.polygon([px(p) for p in poly[0]], fill=i)
        for h in poly[1:]: dr.polygon([px(p) for p in h], fill=0)
lab = np.array(lab)
def hexlow(lon, lat):
    # share of land pixels 0.5-5 m in a ~0.9 km box around the hexagon centre (H3 res 8: ~0.74 km2)
    r = int(round((N - lat) / res)); c = int(round((lon - W) / res)); h = 15
    if r < h or c < h or r + h >= dem.shape[0] or c + h >= dem.shape[1]: return None
    l = land[r - h:r + h, c - h:c + h]; n = l.sum()
    return float((low[r - h:r + h, c - h:c + h]).sum() / n) if n else 0.0
munhex = {}
for lon, lat, p in hexes:
    if W < lon < E and S_ < lat < N:
        r = int((N - lat) / res); c = int((lon - W) / res)
        i = lab[r, c] if 0 <= r < lab.shape[0] and 0 <= c < lab.shape[1] else 0
        if i: munhex.setdefault(AML[i - 1], []).append((lon, lat, p))
rows = []
for i, k in enumerate(AML, 1):
    m = lab == i
    land_km2 = float((pix_km2 * (m & land)).sum()); low_km2 = float((pix_km2 * (m & low)).sum())
    hx = munhex.get(k, [])
    res_low = sum(p * (hexlow(lo, la) or 0) for lo, la, p in hx)
    M = MUN[k]
    rows.append({'code': k, 'name': M['name'], 'residents_census_2021': M['total'], 'age_65_plus': M['age_65_plus'], 'age_0_14': M['age_0_14'],
                 'share_65_plus': round(M['age_65_plus'] / M['total'], 3), 'land_km2': round(land_km2, 1), 'low_land_0_5_to_5m_km2': round(low_km2, 1),
                 'low_land_share': round(low_km2 / land_km2, 3) if land_km2 else None, 'residents_on_low_land_estimate': int(round(res_low, -2)),
                 'hospitals_osm': sum(1 for h in hosp if h['municipality'] == k)})
rows.sort(key=lambda r: -r['residents_census_2021'])
DEMSRC = 'https://copernicus-dem-30m.s3.amazonaws.com/ (Copernicus_DSM_COG_10_N38/N39_W010/W009)'
DEMLIC = '© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018, provided under COPERNICUS by the European Union and ESA; all rights reserved (Copernicus DEM licence: free use with this credit)'
json.dump({'about': 'The 18 municipalities of the Lisbon metropolitan area: residents, aged 65+ and 0-14 (Census 2021), land 0.5 to 5 m above sea level (Copernicus DEM) and an estimate of residents living on it, and OSM hospitals. Low land is where sea water or river flooding CAN reach first; it is not a flood map and not a warning.',
  'label': 'fact (census counts) + hypothesis (low land and residents on it, an estimate)',
  'source': 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011609&lang=PT',
  'sources': {'census': pop['source'], 'dem': DEMSRC, 'population_grid': 'https://data.humdata.org/dataset/kontur-population-portugal (kontur_population_PT_20231101)', 'boundaries': 'https://gisco-services.ec.europa.eu/distribution/v2/lau/geojson/LAU_RG_01M_2021_4326.geojson', 'hospitals': 'hospitals.json'},
  'licence': {'census': 'INE, free reuse with credit', 'dem': DEMLIC, 'population_grid': 'Kontur Population, CC BY 4.0', 'boundaries': '© EuroGeographics for the administrative boundaries (GISCO)', 'hospitals': 'ODbL, © OpenStreetMap contributors'},
  'read_utc': read_utc,
  'method': 'Low land: Copernicus DEM GLO-30 pixels (1 arc-second, ~25 x 30 m here) between 0.5 and 5.0 m, counted inside each municipality (municipalities rasterised from GISCO LAU 2021 parishes). Land = pixels at or above 0.5 m (the DEM flattens sea and large water to about 0 m). Residents on low land: each Kontur hexagon (H3 resolution 8, ~0.74 km2) times the share of its surrounding land pixels in the 0.5-5 m band, summed, rounded to 100.',
  'confidence': 'LOW to MEDIUM. The DEM is a surface model: roofs and trees lift built-up Lisbon, so low land in the city is UNDER-counted; its vertical error (a few metres) is of the size of the band itself. Heights are above the EGM2008 geoid, close to but not the same as mean sea level or IH\'s chart datum. Residents on low land assume people spread evenly within a hexagon. Census 2021 counts.',
  'by': BY, 'updated': read_utc, 'municipalities': rows}, open(f'{out}/lisbon-municipalities.json', 'w'), ensure_ascii=False, separators=(',', ':'))
for r in rows: print(r['name'], r['residents_census_2021'], r['low_land_0_5_to_5m_km2'], r['residents_on_low_land_estimate'], r['hospitals_osm'])

# ---- Lisbon in 49 squares of 2 km (our own grid, centred on the city)
CX, CY = -9.16, 38.745
dlat = 2 / 111.32; dlon = 2 / (111.32 * math.cos(math.radians(CY)))
x0, y0 = CX - 3.5 * dlon, CY + 3.5 * dlat
sq = {}
for lon, lat, p in hexes:
    i = int((y0 - lat) // dlat); j = int((lon - x0) // dlon)
    if 0 <= i < 7 and 0 <= j < 7: sq.setdefault((i, j), []).append((lon, lat, p))
cells = []
for i in range(7):
    for j in range(7):
        s, n_, w, e = y0 - (i + 1) * dlat, y0 - i * dlat, x0 + j * dlon, x0 + (j + 1) * dlon
        rs, re_ = int((N - n_) / res), int((N - s) / res); cs, ce = int((w - W) / res), int((e - W) / res)
        L = land[rs:re_, cs:ce]; Lo = low[rs:re_, cs:ce]; A = pix_km2[rs:re_, 0:1]  # pixel area by row
        hx = sq.get((i, j), [])
        cells.append({'id': f'{"ABCDEFG"[i]}{j + 1}', 'south': round(s, 4), 'north': round(n_, 4), 'west': round(w, 4), 'east': round(e, 4),
                      'residents_estimate': int(round(sum(p for _, _, p in hx), -1)),
                      'land_share': round(float(L.mean()), 2), 'low_land_0_5_to_5m_km2': round(float((Lo * A).sum()), 2),
                      'residents_on_low_land_estimate': int(round(sum(p * (hexlow(lo, la) or 0) for lo, la, p in hx), -1)),
                      'hospitals_osm': [h['name'] or ('(name withheld) ' + h['osm']) for h in hosp if s <= h['lat'] < n_ and w <= h['lon'] < e]})
json.dump({'about': 'Lisbon in 49 squares of 2 km (7 x 7, rows A to G from north, columns 1 to 7 from west, centred on 38.745 N, 9.16 W): residents, land 0.5 to 5 m above sea level, residents on it, and hospitals mapped in OSM. Residents are where people sleep, not where they are at a given hour.',
  'label': 'hypothesis: estimates from a population grid and a surface model; hospitals are evidence (OSM)',
  'source': 'https://data.humdata.org/dataset/kontur-population-portugal',
  'sources': {'population_grid': 'Kontur Population PT 2023-11-01 (H3 res 8)', 'dem': DEMSRC, 'hospitals': 'hospitals.json'},
  'licence': {'population_grid': 'CC BY 4.0, Kontur', 'dem': DEMLIC, 'hospitals': 'ODbL, © OpenStreetMap contributors'},
  'read_utc': read_utc,
  'method': 'Each Kontur hexagon is counted whole in the square holding its centre (so a square\'s total can be off by a few hundred residents at its edges); low land and residents on it as in lisbon-municipalities.json. Squares are ours, not an official grid.',
  'confidence': 'MEDIUM for residents per square; LOW for low land in built-up squares (surface model, roofs lift it).',
  'by': BY, 'updated': read_utc, 'squares': cells}, open(f'{out}/lisbon-grid.json', 'w'), ensure_ascii=False, separators=(',', ':'))
print('squares', len(cells), 'residents', sum(c['residents_estimate'] for c in cells))
