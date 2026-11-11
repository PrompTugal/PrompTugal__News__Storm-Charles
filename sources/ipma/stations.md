---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 21:52 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 202 reported at least one value in the 24 hours read (2026-11-10 22:00 to 2026-11-11 21:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 16.7 | 23.8 | W | 36.7 | 0 | 111.9 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 17.7 | 10.1 | W | 24.5 | 0 | 106.2 | 997 |
| Cabo Raso | 1210765 | 38.709, -9.485 | 18.6 | 27.4 | W | 39.2 | 0 | 103.7 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 16.9 | 25.6 | W | 41 | 0 | 103.3 | 996.3 |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 14 | 18 | NW | 18.4 | 0.3 | 100.4 | · |
| Mora | 1210826 | 38.941, -8.164 | 15.9 | 11.2 | W | 15.5 | 0 | 92.1 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 17.1 | 8.3 | W | 25.6 | 0 | 87.1 | · |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 13.9 | 14 | W | 18.7 | 0.1 | 80.9 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 16.1 | 7.6 | SW | 28.8 | 0.2 | 75.1 | 996.2 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 13.3 | 1.1 | E | 14 | 0 | 74.7 | · |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 16.9 | 12.2 | W | 32.8 | 0 | 74.6 | 996.3 |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 16.1 | 16.6 | W | 21.6 | 0 | 71.7 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 13.5 | 32 | NW | 35.6 | 0 | 70.9 | 993.6 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 16.2 | 7.9 | NW | 24.5 | 0 | 68 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 13.8 | 18.4 | W | 23.8 | 0.1 | 67.3 | 992.2 |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 13.3 | 1.4 | N | 7.9 | 0.1 | 66.7 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 16.7 | 10.4 | W | 31.3 | 0 | 64.8 | 996.7 |
| Fundão | 1210698 | 40.141, -7.554 | 13.1 | 11.2 | W | 21.2 | 0 | 64.4 | · |
| Pegões | 1210767 | 38.651, -8.635 | 16.6 | 14.8 | W | 26.3 | 0 | 62.4 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 16.1 | 17.6 | W | 31 | 0 | 60.4 | 996.6 |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16.8 | 17.6 | W | 31.7 | 0.3 | 59.1 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 15.9 | 6.8 | SW | 16.2 | 0 | 58.6 | 995.7 |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 15.6 | 13.3 | W | 29.9 | 0 | 58.6 | 997.4 |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 16.9 | 20.5 | W | 28.1 | 0 | 58.1 | · |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.4 | 7.6 | NW | 13.7 | 0.1 | 56.9 | · |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 17.8 | 15.1 | W | 26.3 | 0 | 56.2 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 19 | 22.3 | NW | 34.9 | 0 | 56.1 | 997.4 |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 15.8 | 5.8 | SW | 23.8 | 0 | 55.5 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 18.9 | 15.1 | W | 54.4 | 0 | 55 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 11.8 | 13.3 | NW | 22.3 | 0.6 | 53.9 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 13.6 | 3.6 | SE | 12.2 | 0 | 53.5 | 994.6 |
| Albufeira | 1210874 | 37.093, -8.262 | 17.3 | 23 | W | 39.2 | 0 | 52.2 | · |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.1 | 10.1 | W | 20.5 | 0 | 51.8 | 994.4 |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 14.4 | 29.2 | W | 78.5 | 0 | 50.6 | 999.1 |
| Guarda | 1210683 | 40.533, -7.267 | 10.2 | 11.5 | NW | 29.9 | 0.4 | 50.3 | 993.6 |
| Aljezur | 1210789 | 37.317, -8.800 | 18.5 | 6.8 | NW | 21.2 | 0 | 49.8 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.2 | 28.1 | W | 48.6 | 0 | 48.8 | 999.6 |
| Alvalade | 1210783 | 37.947, -8.395 | 18.2 | 19.1 | W | 31.7 | 0 | 48.2 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 10.2 | 2.2 | E | 13 | 0 | 46.6 | · |
| Ansião | 1210716 | 39.900, -8.400 | 14.1 | 11.5 | NW | 17.6 | 0.1 | 46.6 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 7.2 | W | 23.4 | 0 | 45.4 | 999.1 |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 18.8 | 17.6 | W | 57.2 | 0 | 44.2 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 16.8 | 18.7 | W | 37.4 | 0 | 44 | 998.1 |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 15.8 | 18.7 | W | 35.3 | 0 | 42.7 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 17.1 | 15.1 | W | 34.9 | 0 | 42.1 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.9 | 20.9 | NW | 68.4 | 0 | 41.4 | · |
| Alvega | 1210812 | 39.467, -8.050 | 16.1 | 4 | W | 19.1 | 0 | 41.3 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 13.6 | 1.8 | W | 11.5 | 0.1 | 40.8 | 994.6 |
| Zambujeira | 1210788 | 37.582, -8.743 | 18 | 6.1 | N | 43.2 | 0.1 | 40.3 | · |
| Fóia | 1210790 | 37.314, -8.596 | 13.5 | 63 | NW | 72.7 | 0.2 | 38.4 | · |
| Sines | 1200541 | 37.955, -8.838 | 17.7 | 19.8 | NW | 57.2 | 0 | 38.1 | 998.2 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 11.9 | 9.7 | NW | 17.6 | 0 | 38.1 | 995 |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 15.4 | 4.3 | E | 11.9 | 0.1 | 37.7 | 993.8 |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.5 | 6.1 | W | 20.2 | 0.5 | 37.5 | · |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11 | 4.7 | N | 15.1 | 0 | 37.5 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 14.6 | 10.4 | S | 16.2 | 0 | 37 | 993.9 |
| Cabril | 1210619 | 41.717, -8.017 | 12.7 | 1.4 | SE | 9.7 | 0 | 36.6 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 17.8 | 20.5 | W | 43.9 | 0 | 36.4 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 12.8 | 5.4 | E | 27.4 | 1 | 36.3 | 994.3 |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 11.7 | 10.1 | NE | 13 | 1.9 | 36 | · |
| Beja | 1200562 | 38.025, -7.867 | 15.8 | 28.8 | W | 35.6 | 0 | 35.2 | 997.1 |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 11.3 | 5 | W | 34.2 | 0 | 35 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 12.2 | 2.9 | NW | 20.5 | 0 | 33.5 | 994.8 |
| Elvas | 1210835 | 38.891, -7.140 | 17.2 | 25.6 | W | 25.6 | 0 | 33.4 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 14.2 | 1.8 | SW | 14 | 0.1 | 32.9 | 994.1 |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 4.7 | NW | 22 | 0.1 | 32.8 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 19.8 | NW | 51.8 | 0.3 | 32.8 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 15.9 | 20.5 | W | 42.8 | 0 | 31.5 | · |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 19 | 24.5 | W | 47.5 | 0 | 31 | 998.8 |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 22.7 | W | 34.6 | 0.1 | 30.9 | 996.3 |
| Tavira | 1210883 | 37.122, -7.621 | 17.8 | 13.7 | W | 49.3 | 0 | 30.8 | 998.7 |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 8.3 | SE | 24.5 | 0 | 30.8 | 994.3 |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 11.9 | 0 | NE | 13.7 | 3.3 | 30.8 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 13.7 | 3.2 | S | 17.3 | 1 | 30.6 | 992.2 |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 11.5 | 4.7 | N | 10.1 | 3.1 | 30.6 | 994.5 |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 11.1 | 10.4 | NW | 25.6 | 0.3 | 30.2 | · |
| Zebreira | 1210803 | 39.867, -7.017 | 15.6 | 21.6 | W | 26.6 | 0.3 | 30.2 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.4 | · | · | · | 0 | 29.7 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.2 | 2.5 | N | 16.6 | 0 | 29.6 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.1 | 4.7 | W | 22 | 0.1 | 29.4 | 995.6 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 11.5 | 10.8 | NW | 21.6 | 0.1 | 29.4 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 14.5 | 6.8 | W | 13.3 | 0 | 29 | · |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 14.9 | 1.8 | S | 8.3 | 0 | 28.9 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 11.9 | 4.7 | N | 12.6 | 1.1 | 28.8 | · |
| Amareleja | 1210851 | 38.201, -7.226 | 17 | 16.9 | SW | 34.9 | 0 | 28.8 | 995.6 |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 15.9 | 0.7 | N | 12.2 | 0 | 28.8 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 13.3 | 5.8 | NW | 17.3 | 3.3 | 28.7 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 16 | 23 | W | 37.4 | 0 | 28.5 | 996.1 |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 15.1 | 7.2 | SE | 16.2 | 0 | 28.4 | 994.1 |
| Mirandela | 1210632 | 41.515, -7.191 | 14.3 | 2.5 | NW | 17.6 | 0.3 | 28.4 | · |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 18.6 | · | · | · | 2.6 | 27.7 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 11.3 | 4 | E | 20.2 | 1 | 27.4 | · |
| Luzim | 1210657 | 41.146, -8.249 | 13 | 1.1 | SE | 8.6 | 0 | 26.8 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 15.6 | · | · | · | 0 | 26.7 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 17 | 15.8 | W | 32.8 | 0 | 25.9 | · |
| Mogadouro | 1210637 | 41.333, -6.733 | 11.3 | 8.6 | N | 34.9 | 1.1 | 25.8 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14 | 2.9 | W | 6.8 | 0 | 25.7 | · |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 15.7 | · | · | · | 0 | 25.5 | · |
| Bragança | 1200575 | 41.804, -6.743 | 12 | 4.7 | E | 19.1 | 0.5 | 25.3 | 995.2 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 13.7 | 0.7 | NE | 8.3 | 0.3 | 25.2 | 994.2 |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 10.8 | 1.4 | S | 17.6 | 0.1 | 24.6 | 994.8 |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 11.1 | 17.6 | NW | 49.3 | 0.5 | 24.6 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 12.4 | 1.1 | S | 4.3 | 0.2 | 24.4 | 994.5 |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 14.7 | 5.8 | W | 21.6 | 0 | 23.9 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 11.8 | 5.4 | NW | 18 | 0 | 23.6 | · |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 12.9 | 9 | E | 17.3 | 0.3 | 23.6 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13.2 | 2.2 | SW | 5 | 0.1 | 22.6 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 14.7 | 1.1 | E | 5.8 | 0 | 22.3 | · |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 18.2 | 11.2 | W | 43.9 | 0 | 21.4 | 998.7 |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 15.6 | 6.1 | SE | 24.8 | 0 | 21.3 | 994.2 |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 12.2 | 9.7 | NW | 20.2 | 0.1 | 21.2 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 12.2 | 6.5 | E | 11.2 | 0.5 | 21 | 994.7 |
| Arouca | 1210669 | 40.933, -8.250 | 14.5 | 1.1 | E | 7.6 | 0 | 20.4 | · |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.4 | 4.3 | W | 13.7 | 0 | 20.4 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 15.3 | 2.2 | NW | 11.2 | 0 | 20 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 13.2 | · | · | · | 0 | 19.4 | · |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 15 | 1.8 | E | 10.1 | 0 | 19.3 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 16.3 | 5.4 | W | 8.3 | 0 | 18.7 | · |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 10.6 | 4 | W | 30.2 | 0 | 18.2 | 994.9 |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 12.9 | 1.8 | NE | 15.1 | 0 | 16.4 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 9.9 | 21.6 | W | 53.3 | 0 | 16.1 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.4 | 3.2 | S | 9.7 | 1.3 | 16 | 993.8 |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 15.5 | 13.3 | W | 29.2 | 0 | 15.3 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16 | 5.8 | SW | 15.5 | 0 | 15.2 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16 | 2.9 | W | 13.7 | 0.2 | 15.2 | 995 |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 16.2 | 2.9 | S | 9 | 0 | 15.2 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 16.5 | 6.1 | W | 17.6 | 0 | 15.1 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 15.3 | 7.2 | W | 18 | 0.1 | 14 | 995 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 19.5 | 13 | W | 23.4 | 5.6 | 13.4 | · |
| Anadia | 1210705 | 40.439, -8.440 | 16 | 0.7 | SW | 12.2 | 0 | 13.1 | · |
| Nelas | 1210685 | 40.517, -7.850 | 13.5 | 4 | W | 11.9 | 0 | 12.4 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 15 | 1.8 | NW | 18.7 | 0 | 9.8 | · |
| Coruche | 1210744 | 38.941, -8.511 | 16.6 | 10.8 | W | 26.3 | 0 | 9 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 15 | 27.4 | W | 27.4 | 0 | 7.9 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12 | 17.6 | N | 20.5 | 0 | 5 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.2 | 0.7 | 4.2 | 1008.1 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 19.1 | SE | 19.1 | 0.9 | 1.4 | 994 |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 11.9 | 0.4 | 0.4 | 1011 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 16.1 | 32 | W | 32 | 0 | 0 | 996.1 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.3 | 14.8 | W | 19.4 | · | · | 994.8 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.5 | 2.9 | N | 16.6 | · | · | 994 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 12.9 | 12.2 | N | 29.2 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 13.8 | 5.4 | W | 18.7 | · | · | · |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | · | · | · | · | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 11.5 | 3.2 | E | 11.9 | · | · | 993.9 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.1 | 5 | SE | 15.8 | · | · | 993.2 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.4 | 3.2 | NE | 4.3 | · | · | 994.2 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.4 | 10.8 | W | 23 | · | · | 996 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15 | 1.8 | S | 11.9 | · | · | 994.2 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 14.5 | 6.1 | S | 20.5 | · | · | 994.2 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 13.9 | 4.7 | NW | 11.2 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | · | · | · | · | · | 1011 |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.9 | 30.6 | NW | 33.1 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 17 | 18.7 | SW | 46.4 | · | · | 998.4 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 16.5 | 18 | W | 37.1 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 10.5 | 5.4 | NE | 27.4 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 2.9 | SE | 13.7 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 10.2 | 28.1 | N | 93.2 | 0 | 406.9 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 16.5 | · | · | · | 0 | 226.9 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 12.7 | · | · | · | 0 | 212.4 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 7.6 | · | · | · | 0 | 201 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 12.1 | 0 | W | 47.9 | 0 | 200.4 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 16 | 2.9 | N | 14.4 | 0 | 135.1 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 21.1 | 1.1 | NW | 76 | 0 | 91 | 1009.6 |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 16.1 | · | · | · | 0 | 67.9 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 18.4 | 7.9 | W | 39.2 | 0 | 60.6 | 1009.9 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 20.1 | 2.2 | NE | 44.3 | 0 | 55 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 20.7 | · | · | · | 0 | 54.8 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 15.3 | · | · | · | 0 | 53.4 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 20.4 | 19.8 | N | 83.5 | 0 | 49.6 | · |
| Funchal | 1200522 | 32.648, -16.888 | 20.8 | 5.8 | NE | 25.2 | 0 | 49.5 | 1009.8 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 18.8 | 4.3 | E | 43.9 | 0 | 44.8 | · |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 18 | 9.4 | N | 23 | 0 | 36.3 | 1008.5 |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 20.9 | · | · | · | 0 | 30.4 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 19.9 | 22.7 | W | 55.1 | 0 | 18 | 1009.4 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.1 | 32 | NW | 96.8 | 0 | 0.3 | 1008.5 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 11.8 | 34.6 | NW | 55.4 | 1.9 | 25.1 | 1009.8 |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 15.1 | 6.1 | SE | 11.2 | 1 | 14.1 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.1 | 10.1 | NW | 20.9 | 0.6 | 8.7 | · |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12 | 4 | SW | 7.9 | 1 | 7.6 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 15.3 | 11.2 | W | 19.8 | 0.2 | 5.6 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 12.5 | 13.7 | NW | 17.3 | 0 | 4.8 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 10.8 | · | SW | · | 0.3 | 4.2 | · |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.5 | 11.5 | W | 18 | 0.2 | 3.9 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 14.4 | 5 | W | 20.5 | 0 | 3.9 | 1011 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.1 | 13.3 | NW | 25.2 | 0.1 | 3.9 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 16.5 | 8.6 | SW | 16.6 | 0 | 3.5 | 1010.8 |
| São Jorge | 1200510 | 38.660, -28.170 | 16.8 | 10.8 | NW | 23 | 0 | 3.5 | 1010.4 |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.3 | 15.8 | NW | 26.6 | 0.4 | 3 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 16.6 | 18.7 | W | 32.4 | 0.1 | 2.8 | 1009.9 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 10.7 | 21.2 | SW | 21.2 | 0 | 2.7 | · |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 16.4 | 22.7 | NW | 36 | 0.3 | 2.3 | 1009.7 |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 13 | 4.7 | W | 14.8 | 0.2 | 1.9 | · |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 16 | 5.8 | NW | 19.1 | 0 | 1.3 | 1010.7 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 16.5 | 7.6 | W | 15.5 | 0.1 | 1.2 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 18 | 8.3 | N | 11.9 | 0.3 | 1.1 | · |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 16.2 | 14.4 | NW | 26.3 | 0 | 0.9 | 1010.5 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 15.5 | 5.8 | W | 23 | 0 | 0.5 | 1010.3 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16.3 | 4 | NE | 23.4 | 0 | 0.4 | 1011.2 |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 16.2 | 2.5 | S | 19.4 | 0 | 0.4 | 1011.2 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 17.1 | 15.1 | NE | 25.6 | 0 | 0.1 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 16.9 | 13 | NW | 21.6 | 0 | 0 | · |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 18.3 | 30.6 | NW | 39.2 | 0 | 0 | 1010.3 |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 21:51 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
