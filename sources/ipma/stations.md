---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 13:53 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 203 reported at least one value in the 24 hours read (2026-11-10 14:00 to 2026-11-11 13:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 15.4 | 16.2 | E | 33.8 | 20.7 | 108 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 16.5 | 32.4 | SE | 39.2 | 22.5 | 102.7 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 15.7 | 20.5 | E | 31 | 26.2 | 98.3 | 991.1 |
| Setúbal | 1210770 | 38.548, -8.891 | 16.8 | 20.9 | S | 20.9 | 8.2 | 96.8 | 992.5 |
| Mora | 1210826 | 38.941, -8.164 | 15.5 | 7.2 | SE | 26.6 | 6.2 | 89.9 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 19.6 | 43.2 | SW | 43.2 | 2.2 | 89.4 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 19.2 | 41 | S | 41 | 2.4 | 87.2 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 16 | 10.8 | E | 18.7 | 15.8 | 86.2 | · |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 13.1 | 12.6 | SE | 18.4 | 10.9 | 85.8 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 17.4 | 27.7 | SE | 27.7 | 3.8 | 79.4 | · |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 15.6 | 17.3 | E | 25.9 | 14.4 | 68.6 | 991.8 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 15.5 | 9 | E | 22 | 12.3 | 67 | · |
| Pegões | 1210767 | 38.651, -8.635 | 16.3 | 17.3 | SE | 25.9 | 3.2 | 63.5 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 15.9 | 15.1 | E | 28.4 | 17 | 63.1 | 992.1 |
| Portalegre | 1200571 | 39.295, -7.420 | 12.7 | 22 | SE | 26.6 | 8.4 | 61.5 | 998.5 |
| Alvega | 1210812 | 39.467, -8.050 | 16.7 | 16.2 | E | 16.2 | 7.1 | 58.8 | · |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 15.5 | 29.2 | SE | 29.2 | 1.6 | 55.7 | 995.4 |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 17.1 | 24.8 | SE | 24.8 | 5.9 | 55.2 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 15.5 | 14.4 | E | 25.6 | 7.9 | 54.3 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12.9 | 21.6 | S | 23.4 | 2.2 | 53.5 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 14.5 | 18 | NE | 34.6 | 11.3 | 53.1 | 992.4 |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 16.8 | 24.1 | S | 35.6 | 1.9 | 52.8 | · |
| Zebreira | 1210803 | 39.867, -7.017 | 14.8 | 14.8 | SE | 26.3 | 1.8 | 52.6 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 16 | 9.4 | E | 23 | 12.1 | 52.1 | 995.7 |
| Alvalade | 1210783 | 37.947, -8.395 | 18.2 | 31.7 | SE | 31.7 | 5.1 | 50.8 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 16 | 31 | SE | 37.4 | 2.2 | 50.1 | 995.8 |
| Castelo Branco | 1200570 | 39.833, -7.467 | 14.6 | 18 | SE | 26.3 | 2.9 | 50.1 | 998.6 |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 15.8 | 19.8 | NE | 20.9 | 15.5 | 49.6 | 994.9 |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16 | 18.4 | E | 31.7 | 4.7 | 49 | · |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 14.3 | 8.6 | S | 16.2 | 5.8 | 46.6 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 15 | 18.7 | SE | 28.1 | 9 | 45.2 | · |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.4 | 15.5 | SE | 31.7 | 4.9 | 45.1 | · |
| Fóia | 1210790 | 37.314, -8.596 | 14.7 | 58.7 | S | 72.7 | 14.7 | 44.5 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.7 | 4.7 | E | 16.9 | 1.2 | 43.8 | 998.7 |
| Sines | 1200541 | 37.955, -8.838 | 18.4 | 57.2 | S | 57.2 | 1.1 | 42.6 | 992.5 |
| Aljezur | 1210789 | 37.317, -8.800 | 19.8 | 21.2 | SW | 21.2 | 8.5 | 42.6 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.4 | 68.4 | S | 68.4 | 3 | 42.2 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 14.4 | 7.2 | S | 8.6 | 4.7 | 42.1 | · |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 15.1 | 62.6 | S | 62.6 | 3.9 | 40.7 | 996.6 |
| Fundão | 1210698 | 40.141, -7.554 | 14.1 | 14.4 | SE | 20.5 | 5.1 | 40.4 | · |
| Beja | 1200562 | 38.025, -7.867 | 16.4 | 27 | S | 29.2 | 3.4 | 40.2 | 996.3 |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.1 | 13.7 | E | 13.7 | 9.2 | 39.1 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.7 | 34.9 | S | 35.3 | 5.8 | 37.7 | 995.7 |
| Montalegre | 1210611 | 41.823, -7.788 | 11 | 8.3 | E | 19.1 | 2.1 | 35.6 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 16.2 | 42.8 | SE | 42.8 | 1.4 | 35.3 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 19.3 | 33.5 | S | 34.9 | 4.3 | 34.3 | 998.2 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.8 | 15.1 | E | 20.9 | 1.6 | 34.2 | 998.8 |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16.3 | 17.3 | SE | 17.3 | 4.8 | 32.9 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 17.8 | 31.3 | S | 31.3 | 1.6 | 32.9 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.7 | · | · | · | 1.4 | 32.2 | · |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.7 | 11.2 | E | 21.2 | 4.8 | 31.6 | 997.7 |
| Albufeira | 1210874 | 37.093, -8.262 | 18.1 | 36.4 | SE | 39.2 | 3.1 | 31.5 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.2 | 43.2 | S | 54.4 | 5 | 31.3 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 17.3 | 31.3 | SE | 31.3 | 3.5 | 30.6 | 997.7 |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 12.8 | 7.6 | E | 16.2 | 1.7 | 30.2 | · |
| Amareleja | 1210851 | 38.201, -7.226 | 16.3 | 19.1 | SE | 24.8 | 5.4 | 29.7 | 997.8 |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 12 | 23.4 | SE | 38.2 | 2.8 | 29.1 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 15 | 3.6 | E | 20.5 | 1.2 | 29 | 997.8 |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 13.3 | 10.4 | E | 22 | 1.4 | 28.9 | 998.6 |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.5 | 0.7 | 28.6 | 1008.1 |
| Cabril | 1210619 | 41.717, -8.017 | 13.3 | 1.8 | NE | 13 | 2 | 27.2 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 16.1 | 9.7 | S | 17.6 | 0.9 | 27 | 997.8 |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 25.6 | E | 34.6 | 1.9 | 27 | 993.5 |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 12 | 5.8 | E | 17.6 | 3.9 | 27 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 23.4 | S | 23.4 | 4.8 | 26.8 | 998.8 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 12.7 | 7.2 | E | 31.3 | 1.4 | 26.8 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14.5 | 2.5 | W | 9 | 1 | 26.2 | · |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 18.8 | 36 | S | 38.5 | 3.3 | 25.7 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.3 | 5.4 | S | 20.2 | 2 | 25.4 | 998.5 |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 14 | 9.7 | E | 20.5 | 2.6 | 25 | · |
| Alcobaça | 1210726 | 39.517, -8.967 | 17.3 | 16.9 | SE | 20.2 | 1.5 | 24.6 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 15.1 | 21.6 | E | 21.6 | 1.7 | 24.4 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 51.8 | SE | 51.8 | 1.1 | 24.2 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 16.1 | 5 | NE | 24.1 | 1 | 23.6 | 998.2 |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16 | · | · | · | 1.2 | 22.8 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 13.2 | 9.7 | SE | 18.4 | 0.9 | 22.5 | · |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 16.1 | 8.3 | E | 23.4 | 1.1 | 21.6 | · |
| Guarda | 1210683 | 40.533, -7.267 | 11.3 | 22.3 | SE | 22.3 | 2.8 | 21.3 | 998.5 |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 8.6 | NE | 22.3 | 3.4 | 21.1 | · |
| Luzim | 1210657 | 41.146, -8.249 | 13.5 | 5.4 | E | 14 | 1.7 | 21.1 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 12 | 42.1 | SE | 50.4 | 3.3 | 21.1 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 16 | 8.6 | E | 20.5 | 2.7 | 21 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 17.4 | 19.8 | SE | 26.3 | 0.4 | 20.9 | 995 |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 16.6 | 7.2 | E | 13.7 | 2.7 | 20.8 | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 31.3 | 5.2 | 20.7 | 1011 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.4 | 3.6 | SE | 15.8 | 0.5 | 19.6 | · |
| Elvas | 1210835 | 38.891, -7.140 | 14.9 | 18 | SE | 23.8 | 4.8 | 19.5 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 10.4 | E | 30.2 | 0.7 | 19.4 | 997.9 |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 16.2 | 7.2 | E | 12.6 | 1 | 19 | · |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.9 | 6.1 | E | 16.9 | 1 | 18.6 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 15.3 | 9.4 | NE | 23.4 | 3.3 | 18.4 | · |
| Arouca | 1210669 | 40.933, -8.250 | 15.6 | 4.3 | E | 14.4 | 1.1 | 18.4 | · |
| Ansião | 1210716 | 39.900, -8.400 | 14.7 | 9.7 | SE | 17.6 | 2.8 | 18.4 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 14.3 | · | · | · | 1.2 | 18.1 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 16.2 | 5 | E | 13 | 0.3 | 17.8 | 997.4 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.5 | · | · | · | 0.3 | 17.7 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14.3 | 4.7 | E | 22.7 | 2.5 | 17.1 | 998.7 |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 12.1 | 11.2 | SE | 20.2 | 1.2 | 17.1 | 998.6 |
| Vila Real | 1200567 | 41.274, -7.717 | 13.6 | 2.5 | E | 14.4 | 1.5 | 17.1 | 998.9 |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.6 | 6.8 | SE | 14 | 2 | 17 | 997.8 |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.4 | 8.3 | NE | 31 | 1.4 | 16.2 | · |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.8 | 19.4 | SE | 34.9 | 0.7 | 16.1 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 12.4 | 4.7 | SE | 25.6 | 3.3 | 15.9 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 15.5 | 1.8 | NE | 7.2 | 1.3 | 15.8 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 14.6 | 13.7 | SE | 25.6 | 1 | 15.7 | 999.4 |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 12.3 | 7.9 | E | 41 | 2.6 | 15.7 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.1 | 11.2 | E | 34.9 | 1.5 | 15.7 | 997.3 |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.9 | 5.8 | SE | 10.1 | 1.1 | 15.6 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 17.1 | 1.1 | SE | 16.2 | 1.5 | 14.9 | · |
| Tavira | 1210883 | 37.122, -7.621 | 18.8 | 33.5 | S | 40 | 3.1 | 14.8 | 999.7 |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.3 | 17.3 | E | 30.6 | 3.1 | 14.5 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 17.4 | 12.2 | SE | 27 | 0.3 | 14.4 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 16.5 | 19.1 | SE | 43.6 | 0 | 14.3 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 14.1 | 3.6 | N | 11.2 | 1.5 | 14.2 | · |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 16.7 | 16.9 | SE | 23.4 | 5.6 | 13.6 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.6 | 16.2 | SW | 53.6 | 1.6 | 13.5 | · |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 13 | 7.2 | E | 17.6 | 1.4 | 13.4 | 1000.1 |
| Nelas | 1210685 | 40.517, -7.850 | 14.3 | 6.5 | NE | 25.2 | 0.8 | 12.9 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.2 | 6.1 | E | 19.8 | 0.9 | 12.9 | 996.3 |
| Anadia | 1210705 | 40.439, -8.440 | 16.8 | 10.8 | E | 10.8 | 0.6 | 12.7 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 13 | 3.6 | SE | 23.8 | 2.5 | 12.1 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16.9 | 8.3 | E | 12.6 | 1.5 | 12.1 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 17.2 | 7.9 | E | 30.2 | 0.7 | 11.8 | · |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 19.8 | 36 | S | 41 | 2.6 | 11.8 | 998.5 |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.7 | 6.1 | E | 28.4 | 1.1 | 11.7 | 996.9 |
| Estremoz | 1210837 | 38.867, -7.517 | 14.5 | 20.9 | SE | 25.9 | 0 | 11.3 | · |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 12.2 | 4.7 | N | 30.2 | 2.2 | 11 | 998.3 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 15.3 | 7.6 | N | 13.3 | 1.6 | 11 | 998.7 |
| Coruche | 1210744 | 38.941, -8.511 | 16.2 | 18 | SE | 34.2 | 0 | 10.5 | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 18 | 0.4 | 10.1 | 1011 |
| Mirandela | 1210632 | 41.515, -7.191 | 15.3 | 7.9 | N | 23.8 | 1.5 | 9.2 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 15.7 | 1.1 | NE | 23.8 | 0.7 | 8.7 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 13.1 | 7.6 | SE | 23.8 | 0.8 | 8.2 | 1000.7 |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 19.6 | 18.7 | SE | 28.4 | 1.4 | 7.6 | 998.8 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 15.8 | 1.8 | SE | 13 | 1.4 | 7.6 | · |
| Bragança | 1200575 | 41.804, -6.743 | 12.7 | 8.6 | SE | 20.9 | 1.2 | 7.5 | 1001.2 |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 13.8 | 11.9 | SE | 33.5 | 0 | 6.6 | · |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 18.7 | · | · | · | 2.1 | 4.1 | · |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.2 | 16.2 | E | 23 | 0.1 | 1.7 | 995 |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 27.4 | 0 | 0.7 | 1008.8 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 0 | SW | 36.7 | 0 | 0 | 1003.5 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 16 | 26.6 | SE | 35.3 | 0 | 0 | 996.1 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.3 | 12.2 | SE | 35.6 | · | · | 996.6 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.6 | 2.2 | NE | 18 | · | · | 997.7 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 13 | 9.4 | N | 31.7 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.3 | 13 | E | 13 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.1 | 8.6 | SE | 11.9 | · | · | 998.2 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.7 | 10.8 | SE | 15.8 | · | · | 997.7 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 14.9 | 0.4 | W | 10.4 | · | · | 1002.4 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15.4 | 0 | S | 11.9 | · | · | 998 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.7 | 7.9 | E | 38.2 | · | · | 996.9 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.5 | 6.8 | E | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 9.4 | 0 | SE | 14 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 18.1 | 36 | E | 42.8 | · | · | 996.3 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 16.8 | 31.7 | SE | 31.7 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.6 | 10.8 | SE | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 6.1 | E | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 13.9 | 11.9 | NW | 93.2 | 0 | 499.1 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 11.4 | · | · | · | 0.2 | 262.3 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 18.9 | · | · | · | 2.3 | 261.2 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 18.1 | 11.5 | SW | 47.9 | 0 | 259.3 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 17.4 | · | · | · | 0 | 257.7 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 21.9 | 4 | W | 14.4 | 0 | 181 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 22.8 | 47.9 | NW | 76 | 0 | 121.4 | 1002.7 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 23.9 | 19.1 | SW | 44.3 | 0 | 82.3 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 17.2 | · | · | · | 2.1 | 79 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 22.8 | · | · | · | 0 | 76.7 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 19 | 36.4 | N | 83.5 | 0.5 | 72.5 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 20.8 | · | · | · | 0.2 | 68 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 17.8 | 24.5 | NW | 39.2 | 0.9 | 67.1 | 1004.2 |
| Funchal | 1200522 | 32.648, -16.888 | 25 | 12.2 | E | 25.2 | 0 | 65.4 | 1002.6 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 17.7 | 11.9 | E | 23 | 0 | 62.4 | 1002.3 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 23.4 | 12.2 | S | 43.9 | 0 | 57.7 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 25.1 | · | · | · | 0 | 39.3 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 20.4 | 31.3 | NW | 55.1 | 1.1 | 23.3 | 1003.4 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.3 | 70.2 | W | 96.8 | 0 | 0.3 | 1004.8 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 16.6 | 11.2 | SE | 11.2 | 0.3 | 10.9 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 12.2 | 45.4 | NW | 55.4 | 0.1 | 10 | 1007.2 |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.8 | 15.8 | W | 19.1 | 0.1 | 8.6 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 13.9 | 15.1 | NW | 17.3 | 0 | 8.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 10.9 | · | SW | · | 0.1 | 6.9 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 17.1 | 18.4 | NW | 20.9 | 0.6 | 5.4 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 16.2 | 16.9 | NW | 19.8 | 0 | 5.4 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 17.4 | 15.1 | N | 22 | 0.1 | 5.3 | 1010.4 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 11.4 | 9 | SW | 24.8 | 0 | 4.5 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 18.4 | 22 | NW | 24.1 | 0 | 4.5 | 1008.5 |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 13.3 | 9 | W | 16.2 | 0 | 4.1 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 18.3 | 11.9 | NW | 16.2 | 0 | 4 | 1009.2 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12.1 | 6.5 | SW | 7.9 | 0.4 | 3.6 | · |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 14.1 | 19.1 | NW | 25.2 | 0.2 | 2.9 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.6 | 22 | N | 31.3 | 0.2 | 2.3 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 17.3 | 27.4 | NW | 32.4 | 0 | 1.8 | 1008.1 |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 18.5 | 18 | W | 25.2 | 0 | 1.5 | 1009 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 19.1 | 29.9 | NW | 36 | 0 | 1.2 | 1007 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 17.2 | 20.2 | NW | 26.3 | 0 | 1 | 1010 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 18.8 | 15.5 | W | 15.5 | 0 | 0.6 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 18.1 | 15.8 | NW | 19.4 | 0 | 0.5 | 1009.5 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 17.5 | 16.6 | N | 23.4 | 0 | 0.4 | 1010.8 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 18.1 | 14.8 | NW | 23 | 0 | 0.3 | 1007.8 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.8 | 24.8 | E | 25.6 | 0.1 | 0.1 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 20.6 | 10.1 | NW | 11.9 | 0 | 0.1 | · |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 19.8 | 34.2 | NW | 35.6 | 0 | 0.1 | 1007.8 |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 18.4 | 13.3 | NW | 21.6 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 13:52 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
