#!/usr/bin/env python3
"""INE Census 2021 residents by age group -> exposure/population.json (by IPMA warning area and municipality).
Usage: python3 -I ds_census.py <ine_0011609.json> <read_utc> <out.json>
Source: https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011609&lang=PT (raw kept in a vault, not git)."""
import json, sys
src, read_utc, out = sys.argv[1], sys.argv[2], sys.argv[3]
rows = json.load(open(src))[0]['Dados']['2021']
DIST = {'01':'AVR','02':'BJA','03':'BRG','04':'BGC','05':'CBO','06':'CBR','07':'EVR','08':'FAR','09':'GDA','10':'LRA',
        '11':'LSB','12':'PTG','13':'PTO','14':'STM','15':'STB','16':'VCT','17':'VRL','18':'VIS'}
DNAME = {'AVR':'Aveiro','BJA':'Beja','BRG':'Braga','BGC':'Bragança','CBO':'Castelo Branco','CBR':'Coimbra','EVR':'Évora','FAR':'Faro',
         'GDA':'Guarda','LRA':'Leiria','LSB':'Lisboa','PTG':'Portalegre','PTO':'Porto','STM':'Santarém','STB':'Setúbal',
         'VCT':'Viana do Castelo','VRL':'Vila Real','VIS':'Viseu','MCN':'Madeira, north coast','MCS':'Madeira, south coast',
         'MPS':'Porto Santo','MRM':'Madeira, mountain areas'}
# Madeira's IPMA zones by municipality (an approximation: IPMA's zones are not municipal boundaries)
MAD = {'3106':'MCN','3109':'MCN','3110':'MCN','3101':'MCS','3102':'MCS','3103':'MCS','3104':'MCS','3105':'MCS',
       '3107':'MCS','3108':'MCS','3201':'MPS'}
AGE = {'T':'total','1':'age_0_14','4':'age_65_plus'}
mun = {}
for r in rows:
    g = r['geocod']
    if len(g) != 4 or r['dim_3'] != 'T' or r['dim_4'] not in AGE: continue
    m = mun.setdefault(g, {'code': g, 'name': r['geodsg']})
    m[AGE[r['dim_4']]] = int(r['valor'])
areas = {}
for g, m in mun.items():
    a = DIST.get(g[:2]) or MAD.get(g)
    m['area'] = a  # None for the Azores (separate IPMA zones by island group; not mapped here)
    if not a: continue
    A = areas.setdefault(a, {'area': a, 'name': DNAME[a], 'total': 0, 'age_0_14': 0, 'age_65_plus': 0, 'municipalities': 0})
    for k in ('total', 'age_0_14', 'age_65_plus'): A[k] += m[k]
    A['municipalities'] += 1
areas['MRM'] = {'area': 'MRM', 'name': DNAME['MRM'], 'total': None, 'age_0_14': None, 'age_65_plus': None, 'municipalities': 0,
                'note': 'not estimated: the mountain zone crosses municipal boundaries; its residents are counted in MCN and MCS'}
for A in areas.values():
    if A['total']: A['share_65_plus'] = round(A['age_65_plus'] / A['total'], 3)
json.dump({
  'about': 'Residents counted by the 2021 Census, by IPMA warning area (district; Madeira by zone) and by municipality: total, aged 0-14 and aged 65+. Where people sleep, not where they are at a given hour.',
  'label': 'fact: INE Census 2021 counts (residents on census day, 19 April 2021), grouped by us onto IPMA warning areas',
  'source': 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0011609&lang=PT',
  'source_name': 'INE, Recenseamento da população e habitação - Censos 2021, indicator 0011609',
  'licence': 'INE statistics: free reuse with credit to the source (INE, Statistics Portugal)',
  'read_utc': read_utc,
  'method': 'Municipal totals (4-digit geocod, both sexes) summed by district code (first two digits) onto IPMA mainland warning areas, which are the districts. Madeira: municipalities assigned to IPMA zones MCN (Porto Moniz, São Vicente, Santana), MCS (the other seven) and MPS (Porto Santo); MRM not estimated. Azores not mapped.',
  'confidence': 'HIGH for district totals (census counts; districts are IPMA warning areas). MEDIUM for Madeira zones (municipal approximation of IPMA zones). Counts are from 2021, five years old.',
  'by': 'incident.datascience@web-summit.dinis',
  'updated': read_utc,
  'areas': sorted(areas.values(), key=lambda a: a['area']),
  'municipalities': sorted(mun.values(), key=lambda m: m['code']),
}, open(out, 'w'), ensure_ascii=False, indent=0)
