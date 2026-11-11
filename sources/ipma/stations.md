---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 23:52 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 200 reported at least one value in the 24 hours read (2026-11-11 00:00 to 2026-11-11 23:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 16.1 | 11.5 | SW | 36.7 | 0 | 111.6 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 17.7 | 6.8 | W | 24.5 | 0.3 | 106.5 | 999.3 |
| Cabo Raso | 1210765 | 38.709, -9.485 | 19 | 31.3 | W | 39.2 | 0 | 102.4 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 16.8 | 11.2 | W | 41 | 0 | 102.1 | 998.5 |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 13.7 | 15.5 | W | 18.4 | 0 | 98.3 | · |
| Mora | 1210826 | 38.941, -8.164 | 16.1 | 9.7 | SW | 14.8 | 0 | 92.1 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 16.8 | 4.3 | W | 25.6 | 0 | 86.7 | · |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.4 | 14 | W | 19.8 | 0 | 80.9 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 16.2 | 7.6 | SW | 28.8 | 0 | 75.2 | 998.6 |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 16.5 | 9 | W | 32.8 | 0.1 | 74.3 | 998.5 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 12.9 | 0.4 | E | 14 | 0.1 | 74 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 16.3 | 13.7 | W | 21.6 | 0 | 71.7 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 13 | 24.1 | NW | 35.6 | 0 | 70.9 | 997.8 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 15.7 | 6.1 | W | 24.5 | 0 | 67.8 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 13.7 | 15.1 | W | 23.8 | 0 | 67.3 | 995.6 |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 12.8 | 1.4 | SE | 7.9 | 0 | 65.5 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 16.2 | 9.4 | W | 31.3 | 0 | 64.8 | 999 |
| Fundão | 1210698 | 40.141, -7.554 | 13.7 | 12.2 | W | 21.2 | 0 | 64.4 | · |
| Pegões | 1210767 | 38.651, -8.635 | 15.8 | 12.2 | W | 26.3 | 0 | 61.2 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 16.4 | 12.6 | W | 31 | 0 | 60.4 | 998.4 |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16.6 | 12.6 | W | 31.7 | 0 | 59.1 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 16.1 | 7.6 | S | 16.2 | 0.1 | 58.7 | 998.2 |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 15.8 | 11.2 | W | 29.9 | 0 | 58.6 | 1000.2 |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.8 | 2.9 | W | 13.7 | 0 | 56.9 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 15.7 | 5 | W | 23.8 | 1.1 | 56.6 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 18.6 | 10.4 | W | 34.9 | 0 | 56.1 | 1000.3 |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 18.4 | 9.4 | W | 54.4 | 0 | 55 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 11.3 | 10.4 | NW | 22.3 | 0 | 53.9 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 16.8 | 15.1 | W | 28.1 | 0.2 | 53.4 | · |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 17.9 | 9.7 | W | 26.3 | 0 | 52.4 | · |
| Albufeira | 1210874 | 37.093, -8.262 | 16.9 | 15.5 | W | 39.2 | 0 | 52 | · |
| Guarda | 1210683 | 40.533, -7.267 | 10 | 7.2 | NW | 29.9 | 0.4 | 51.5 | 996 |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14 | 9 | SW | 20.5 | 0 | 51.5 | 997.2 |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 13.6 | 4 | W | 12.2 | 0 | 51 | 996 |
| Aljezur | 1210789 | 37.317, -8.800 | 18.3 | 2.9 | SW | 21.2 | 0 | 49.7 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.4 | 26.6 | W | 48.6 | 0 | 48.8 | 1002 |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 13.9 | 27 | W | 78.5 | 0.1 | 48.7 | 1001.9 |
| Ansião | 1210716 | 39.900, -8.400 | 14 | 16.2 | W | 17.6 | 0.9 | 47.6 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 17.7 | 14 | W | 31.7 | 0 | 47.5 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 9.8 | 5.8 | SW | 13 | 0 | 45.7 | · |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 17.3 | 8.3 | W | 57.2 | 0 | 44.2 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 15.5 | 15.5 | W | 35.3 | 0.1 | 42.7 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 5.8 | W | 23.4 | 0 | 42.6 | 1001.9 |
| Alvega | 1210812 | 39.467, -8.050 | 16.4 | 1.8 | SW | 19.1 | 0 | 41.3 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 17 | 10.8 | W | 34.9 | 0 | 41.2 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 17.5 | 37.8 | W | 68.4 | 0 | 40.6 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 17.8 | 13 | NW | 43.2 | 0.1 | 39.1 | · |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 11.8 | 9.7 | SW | 13 | 0.7 | 38.8 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 13.4 | 2.9 | NW | 11.5 | 0 | 38.5 | 995.7 |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.1 | 5.4 | W | 13.3 | 0.9 | 38.5 | · |
| Sines | 1200541 | 37.955, -8.838 | 18 | 19.8 | W | 57.2 | 0 | 38.1 | 1000.5 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.2 | 10.4 | W | 17.6 | 0.3 | 38.1 | 996.8 |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.9 | 7.9 | W | 20.2 | 0.1 | 37.7 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 16.3 | 17.6 | W | 37.4 | 0 | 37.7 | 1000.9 |
| Fóia | 1210790 | 37.314, -8.596 | 13.5 | 63 | NW | 72.7 | 0.2 | 36.6 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 11.6 | 16.9 | W | 34.2 | 1.2 | 36.4 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 12.6 | 6.1 | SW | 27.4 | 0 | 36.4 | 995.5 |
| Cabril | 1210619 | 41.717, -8.017 | 12.7 | 0.7 | W | 9.7 | 0 | 36.3 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 32.4 | W | 51.8 | 2.5 | 35.4 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 15.2 | 2.5 | SW | 11.9 | 0.4 | 35.1 | 994.9 |
| Beja | 1200562 | 38.025, -7.867 | 16 | 20.2 | W | 35.6 | 0 | 34.7 | 1000 |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 17.6 | 22.3 | W | 43.9 | 0 | 34.5 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 14.6 | 6.1 | S | 16.2 | 0 | 34.2 | 995.2 |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 12.5 | 9.7 | W | 20.5 | 0.2 | 33.8 | 996.7 |
| Elvas | 1210835 | 38.891, -7.140 | 16.3 | 18 | W | 25.6 | 0 | 33.4 | · |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 6.1 | SW | 15.5 | 0.4 | 33.1 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 11.7 | 0 | NE | 13.7 | 0 | 32.4 | · |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 17.7 | · | · | · | 2 | 31.9 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 14.2 | 3.2 | SE | 13.7 | 1.2 | 31.8 | 995.3 |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 16 | 14.4 | W | 42.8 | 0 | 31.4 | · |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 9.9 | 7.2 | NW | 8.6 | 0 | 31 | 995 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 18.8 | 20.9 | W | 47.5 | 0 | 31 | 1001.6 |
| Tavira | 1210883 | 37.122, -7.621 | 17.2 | 13 | W | 49.3 | 0 | 30.6 | 1001.7 |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 13.7 | 3.2 | S | 17.3 | 1 | 30.6 | 992.2 |
| Zebreira | 1210803 | 39.867, -7.017 | 13.9 | 18.7 | W | 26.6 | 0 | 30.2 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.3 | · | · | · | 0.4 | 30.2 | · |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 11.1 | 8.3 | W | 20.9 | 0 | 30.1 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.4 | 7.6 | S | 22 | 0.2 | 29.7 | 997.7 |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.3 | 4 | W | 16.6 | 0 | 29.6 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 18.4 | SW | 34.6 | 0 | 29.4 | 998.2 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 11.4 | 5.4 | NW | 18 | 0 | 29 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 14.7 | 7.6 | SW | 13.3 | 0.1 | 28.9 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 11.7 | 0.7 | SW | 12.6 | 0.2 | 28.9 | · |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 16 | 7.9 | SW | 12.2 | 0.1 | 28.9 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 13.3 | 5.8 | NW | 17.3 | 3.3 | 28.7 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 7.9 | SE | 24.5 | 0 | 28.6 | 995.5 |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 16 | 19.8 | W | 37.4 | 0.1 | 28.6 | 999.1 |
| Mirandela | 1210632 | 41.515, -7.191 | 13.6 | 0 | S | 17.6 | 0 | 28.4 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 10.7 | 4.7 | N | 20.2 | 0 | 27.4 | · |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 14.6 | 2.5 | NE | 8.3 | 0.6 | 27.3 | · |
| Amareleja | 1210851 | 38.201, -7.226 | 16.5 | 12.2 | SW | 34.9 | 0.1 | 27.3 | 999.3 |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 15.6 | · | · | · | 0.4 | 27.1 | · |
| Luzim | 1210657 | 41.146, -8.249 | 13.1 | 3.2 | SW | 8.3 | 0 | 27 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 15.1 | 2.9 | E | 16.2 | 0.1 | 26.1 | 995.4 |
| Mogadouro | 1210637 | 41.333, -6.733 | 11 | 2.2 | SW | 34.9 | 0.1 | 26 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 13.8 | 1.8 | W | 6.8 | 0 | 25.7 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 11.3 | 20.9 | W | 49.3 | 0.9 | 25.7 | · |
| Bragança | 1200575 | 41.804, -6.743 | 11.4 | 5.4 | W | 18.4 | 0 | 25.7 | 995.4 |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 16.7 | 13 | W | 32.8 | 0.1 | 25.7 | · |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 12.3 | 2.2 | S | 8.3 | 0 | 25.2 | 995.1 |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 14.7 | 4.3 | SW | 21.6 | 0.7 | 24.8 | · |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 12.9 | 7.6 | SW | 17.3 | 0.8 | 24.4 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 12.5 | 3.2 | S | 4.3 | 0 | 24.4 | 995.8 |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 8.8 | 5 | SE | 17.6 | 0.1 | 23.7 | 996.8 |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 11.8 | 4.7 | NW | 18 | 0.2 | 23.7 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13.1 | 2.5 | S | 5 | 0.1 | 22.7 | · |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 15.8 | · | · | · | 0.3 | 22.5 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 14.9 | 3.2 | S | 5.8 | 0.5 | 22.5 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 15.6 | 13.3 | S | 24.8 | 1.2 | 22.1 | 995.5 |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 12.2 | 11.2 | W | 20.2 | 0.5 | 21.7 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 11.4 | 7.9 | W | 11.2 | 0 | 21.4 | 995 |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 18.1 | 7.6 | W | 43.9 | 0 | 21.1 | 1001.8 |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.3 | 7.6 | SW | 13.7 | 0.7 | 21.1 | · |
| Arouca | 1210669 | 40.933, -8.250 | 14.5 | 1.8 | NE | 6.5 | 0.1 | 20.5 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 15.3 | 6.5 | S | 10.8 | 0.1 | 20.2 | · |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 14.9 | 3.2 | SE | 10.1 | 0 | 19.6 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 13.4 | · | · | · | 0 | 19.4 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 16.2 | 6.1 | SW | 8.3 | 0.4 | 19.1 | · |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 10.6 | 9.7 | SW | 30.2 | 0 | 18.2 | 997.2 |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.1 | 1.8 | SE | 15.1 | 0 | 16.4 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10 | 16.6 | W | 53.3 | 0 | 16 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16.1 | 4 | SW | 15.5 | 0.2 | 15.5 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.1 | 9 | SW | 13.7 | 0.2 | 15.4 | 996.6 |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 16.1 | 6.5 | SW | 9 | 0 | 15.3 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 16.4 | 7.2 | SW | 17.6 | 0.1 | 15.2 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 16.3 | 25.2 | W | 29.2 | 0 | 14.2 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 15.2 | 6.5 | SW | 18 | 0.5 | 14 | 997.2 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 19.5 | 13 | W | 23.4 | 5.6 | 13.4 | · |
| Anadia | 1210705 | 40.439, -8.440 | 16 | 2.2 | S | 12.2 | 0.1 | 13.4 | · |
| Nelas | 1210685 | 40.517, -7.850 | 13.4 | 6.8 | SW | 11.9 | 0 | 12.4 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.4 | 3.2 | S | 9.7 | 1.3 | 11 | 993.8 |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 14.2 | 4.7 | S | 15.8 | 0 | 9.4 | · |
| Coruche | 1210744 | 38.941, -8.511 | 16.3 | 14 | NW | 26.3 | 0 | 9 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 14.9 | 15.1 | W | 27.4 | 0 | 7.9 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12 | 5.4 | W | 20.5 | 0 | 5 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 15.5 | 0.7 | 3.4 | 1008.1 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 19.1 | SE | 19.1 | 0.9 | 1.4 | 994 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.5 | 12.6 | SW | 19.4 | · | · | 998 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.5 | 2.9 | N | 14.8 | · | · | 994 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 12.9 | 12.2 | N | 29.2 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 13.8 | 7.6 | SW | 18.7 | · | · | · |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | · | · | · | · | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 11.6 | 2.9 | W | 11.9 | · | · | 994.9 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.4 | 5.4 | SE | 15.8 | · | · | 994.8 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.4 | 3.2 | NE | 3.6 | · | · | 994.2 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.5 | 5 | W | 23 | · | · | 998.6 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15 | 6.1 | E | 11.9 | · | · | 995.4 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 14.3 | 11.2 | S | 20.5 | · | · | 995.6 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 13.9 | 5.8 | SW | 10.8 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | · | · | · | · | · | · | · |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 16 | 23.8 | W | 32 | · | · | 999.3 |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.9 | 0 | NW | 33.1 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 16.6 | 14.4 | SW | 46.4 | · | · | 1001.1 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 16.4 | 13.3 | W | 37.1 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 10.5 | 6.8 | SW | 27.4 | · | · | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | · | · | · | · | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 7.2 | S | 13.7 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 11.1 | 24.8 | N | 93.2 | 0 | 336.8 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 16.3 | · | · | · | 0 | 180.9 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 13.1 | · | · | · | 0 | 171.2 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 11.2 | 0.4 | W | 47.9 | 0 | 164.1 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 8.6 | · | · | · | 0 | 162.8 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 15 | 3.2 | N | 13.7 | 0 | 108 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 20 | 13.7 | W | 76 | 0 | 72.4 | 1010.8 |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 16 | · | · | · | 0 | 52.9 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 18.4 | 13.7 | W | 39.2 | 0 | 51.7 | 1010.9 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 19.5 | 4 | NE | 44.3 | 0 | 47.8 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 14.9 | · | · | · | 0 | 45.7 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 20.8 | · | · | · | 0 | 43.8 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 20.1 | 7.6 | SW | 83.5 | 0 | 41.2 | · |
| Funchal | 1200522 | 32.648, -16.888 | 19.7 | 1.1 | NW | 25.2 | 0 | 34.3 | 1011 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 18.1 | 5 | E | 41.4 | 0 | 32.3 | · |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 18.1 | 13 | N | 23 | 0 | 27.4 | 1009.3 |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 20.1 | · | · | · | 0 | 21.2 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 20 | 20.9 | NW | 55.1 | 0 | 12.9 | 1010.4 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 21.1 | 3.2 | N | 96.8 | 0 | 0.3 | 1012.5 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 11.6 | 36.4 | NW | 55.4 | 1.2 | 28.5 | 1010.6 |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 14.9 | 10.1 | SE | 11.2 | 0.6 | 15.2 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.1 | 9.4 | NW | 20.9 | 0.1 | 8.8 | · |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 11.8 | 5.8 | SW | 7.9 | 0.6 | 8.6 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 15.2 | 6.8 | SW | 19.8 | 1 | 7.1 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 12.2 | 11.2 | NW | 17.3 | 0 | 4.5 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 16.7 | 13.3 | NW | 32.4 | 0 | 4 | 1010.3 |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 10.4 | · | S | · | 0 | 3.9 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 14.7 | 7.6 | SW | 20.5 | 0 | 3.9 | 1011.4 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.1 | 10.1 | NW | 25.2 | 0.1 | 3.9 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 16.4 | 7.6 | W | 16.6 | 0 | 3.5 | 1011.3 |
| São Jorge | 1200510 | 38.660, -28.170 | 16 | 4.3 | N | 23 | 0 | 3.2 | 1011 |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.2 | 16.6 | N | 26.6 | 0.1 | 3.1 | · |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.3 | 13.3 | W | 18 | 0 | 3.1 | · |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 16.4 | 27 | NW | 36 | 0 | 2.7 | 1010.4 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 10.3 | 16.2 | SW | 22.3 | 0 | 2.5 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 12.6 | 2.2 | W | 14 | 0 | 1.8 | · |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 16.5 | 13.3 | NW | 19.1 | 0 | 1.1 | 1011.2 |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 18 | 8.3 | N | 11.9 | 0.3 | 1 | · |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 16.5 | 6.8 | W | 15.5 | 0.1 | 0.9 | · |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 16.9 | 13 | NW | 26.3 | 0 | 0.9 | 1010.9 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 15.4 | 8.6 | NW | 23 | 0 | 0.5 | 1010.9 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16.9 | 4 | NE | 23 | 0 | 0.4 | 1011.5 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 17.1 | 14.8 | NE | 25.6 | 0 | 0.1 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 16.7 | 10.4 | W | 21.6 | 0 | 0 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 16.2 | 10.8 | SW | 19.4 | 0 | 0 | 1011.7 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 18.2 | 27.4 | NW | 39.2 | 0 | 0 | 1011.2 |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 23:51 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
