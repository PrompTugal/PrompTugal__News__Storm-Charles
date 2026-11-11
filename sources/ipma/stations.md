---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 12:51 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 204 reported at least one value in the 24 hours read (2026-11-10 13:00 to 2026-11-11 12:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 12.9 | 12.6 | SE | 18.4 | 10.9 | 107.5 | · |
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 15.2 | 20.5 | E | 33.8 | 18.7 | 91.3 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 16.2 | 32 | E | 39.2 | 11.1 | 89.5 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 16.3 | 15.5 | SE | 15.5 | 10.7 | 88.6 | 995.2 |
| Zambujeira | 1210788 | 37.582, -8.743 | 18.6 | 36 | SW | 36 | 5.5 | 87.2 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 18.1 | 32.4 | S | 39.6 | 5 | 84.8 | · |
| Mora | 1210826 | 38.941, -8.164 | 15.7 | 10.8 | SE | 26.6 | 5.6 | 83.7 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 17.1 | 19.1 | SE | 24.8 | 8.7 | 75.6 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 15.4 | 29.5 | E | 33.5 | 9.2 | 72.8 | 994.2 |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 15.7 | 14.4 | NE | 23.8 | 14.3 | 71.1 | · |
| Pegões | 1210767 | 38.651, -8.635 | 16.1 | 14.4 | SE | 25.9 | 5.2 | 60.6 | · |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 15.5 | 21.2 | E | 29.2 | 10.3 | 55.9 | 994.8 |
| Portalegre | 1200571 | 39.295, -7.420 | 13.1 | 19.8 | SE | 26.6 | 3.3 | 55.6 | 1001.4 |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 15.4 | 25.9 | SE | 25.9 | 4.8 | 55.4 | 998.5 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 15.3 | 8.6 | NE | 22 | 12 | 55.3 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12.9 | 14.4 | SE | 29.2 | 1.1 | 54.5 | · |
| Alvega | 1210812 | 39.467, -8.050 | 16.8 | 8.6 | E | 20.2 | 3 | 52.7 | · |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 16.6 | 22.3 | SE | 24.8 | 8.7 | 52.6 | · |
| Zebreira | 1210803 | 39.867, -7.017 | 15 | 14.8 | S | 26.3 | 5 | 51.5 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 16.5 | 34.9 | S | 35.6 | 4.9 | 51.3 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 14.6 | 10.4 | SE | 26.3 | 5.9 | 49.3 | 1000.6 |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 15.5 | 28.4 | SE | 37.4 | 4.5 | 48.1 | 998.9 |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 16.2 | 15.5 | SE | 25.6 | 3.9 | 46.8 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 15.7 | 15.8 | E | 32.8 | 18.1 | 46.1 | 995.1 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 14.2 | 1.8 | W | 16.2 | 4.1 | 45.9 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 17.3 | 30.6 | SE | 30.6 | 5.2 | 45.8 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 16.4 | 10.8 | SE | 23 | 5.9 | 45.3 | 999 |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16 | 17.3 | E | 31.7 | 9.9 | 44.3 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.7 | 7.2 | S | 16.9 | 2.2 | 42.6 | 1000.3 |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 14.8 | 25.2 | SE | 34.6 | 9.4 | 42.6 | 995.4 |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.6 | 14.4 | S | 31.7 | 5.9 | 42.4 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 15.6 | 36.7 | E | 52.6 | 5.9 | 42.1 | · |
| Sines | 1200541 | 37.955, -8.838 | 17.2 | 49 | S | 49 | 5 | 42 | 994.8 |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16.6 | 13.7 | SE | 13.7 | 3.7 | 41.1 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 14.2 | 4 | SW | 8.6 | 4.8 | 40.6 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 15 | 14.8 | SE | 28.1 | 7.3 | 39.8 | · |
| Fundão | 1210698 | 40.141, -7.554 | 14 | 7.6 | SE | 20.5 | 5 | 37.2 | · |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 14.8 | 62.3 | S | 62.6 | 4.1 | 37 | 998.9 |
| Beja | 1200562 | 38.025, -7.867 | 15.8 | 23.8 | SE | 29.2 | 8 | 37 | 999.2 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.9 | 11.2 | SE | 20.9 | 2.5 | 36 | 1000.8 |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 13 | 7.6 | E | 16.2 | 1.7 | 34.5 | · |
| Aljezur | 1210789 | 37.317, -8.800 | 19 | 14 | S | 18.4 | 6.7 | 34.2 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 15.7 | 39.2 | SE | 39.2 | 4.1 | 34.2 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 16.3 | 12.6 | SE | 24.1 | 7.2 | 34.1 | 998.1 |
| Montalegre | 1210611 | 41.823, -7.788 | 11 | 5.4 | NE | 19.1 | 2.5 | 33.5 | · |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 12.6 | 5.4 | NE | 31.3 | 2.4 | 33.4 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 16.8 | 23 | S | 31 | 2.5 | 32.9 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.3 | 35.3 | S | 35.3 | 5.1 | 31.9 | 997.3 |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.8 | 11.9 | SE | 21.2 | 4.1 | 31.8 | 999.8 |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.6 | · | · | · | 1.1 | 30.8 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 13.2 | 9.7 | SE | 22 | 2.1 | 30.4 | 1000.6 |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 19.1 | 34.9 | S | 34.9 | 7.2 | 30 | 999.8 |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.5 | 12.6 | SE | 12.6 | 5.3 | 29.9 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.5 | 0.7 | 28.6 | 1008.1 |
| Albufeira | 1210874 | 37.093, -8.262 | 18 | 39.2 | SE | 39.2 | 3.8 | 28.4 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 15.1 | 8.6 | SE | 20.5 | 1.5 | 27.8 | 999.3 |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 16.8 | 28.1 | SE | 30.2 | 4 | 27.1 | 999.9 |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 13 | 5.8 | SE | 21.2 | 0.7 | 26.9 | · |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 12 | 6.8 | E | 17.6 | 2.1 | 26.7 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 16.2 | 8.6 | S | 17.6 | 2.5 | 26.4 | 999.2 |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 12 | 21.6 | SE | 38.2 | 3 | 26.3 | · |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 13.8 | 8.3 | E | 20.5 | 2.9 | 26.3 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 12 | 42.1 | SE | 50.4 | 3.3 | 25.6 | · |
| Cabril | 1210619 | 41.717, -8.017 | 13.4 | 1.8 | NE | 13 | 2 | 25.2 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14.5 | 0.7 | W | 9 | 1.7 | 25.2 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 34.6 | SE | 34.6 | 0.3 | 25.2 | 995.9 |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.1 | 6.5 | S | 20.2 | 6 | 24.5 | 1000.1 |
| Amareleja | 1210851 | 38.201, -7.226 | 16.4 | 16.2 | SE | 27.7 | 7.1 | 24.3 | 1000.6 |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 43.6 | SE | 48.6 | 3.8 | 24.1 | · |
| Alcobaça | 1210726 | 39.517, -8.967 | 17.4 | 20.2 | SE | 20.2 | 1.6 | 23.7 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 15.1 | 7.2 | N | 16.2 | 3.7 | 22.7 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 16.2 | 3.2 | N | 24.1 | 1.2 | 22.6 | 999.8 |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 18.7 | 38.5 | S | 38.5 | 12.1 | 22.4 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 19.4 | SE | 20.2 | 3.6 | 22 | 1000.2 |
| Moncorvo | 1210654 | 41.183, -7.017 | 14.5 | 18.4 | S | 25.6 | 1.4 | 21.7 | 1001.3 |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.1 | 54.4 | S | 54.4 | 5.4 | 21.7 | · |
| Guarda | 1210683 | 40.533, -7.267 | 11 | 13.3 | SE | 18 | 2.9 | 21 | 1000.9 |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 31.3 | 5.2 | 20.7 | 1011 |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.9 | 7.9 | SE | 23.4 | 3.7 | 20.7 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.9 | 22 | SE | 26.3 | 2.3 | 20.5 | 997.4 |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 14.3 | · | · | · | 2.6 | 20.4 | · |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.8 | 23 | SE | 34.9 | 0.4 | 20.2 | · |
| Luzim | 1210657 | 41.146, -8.249 | 13.6 | 4 | E | 14 | 0.9 | 20.1 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16.4 | · | · | · | 1.2 | 19.6 | · |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.2 | 4 | E | 15.8 | 1.6 | 19.1 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.9 | 3.2 | N | 20.5 | 3.8 | 18.8 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 16.2 | SE | 36 | 2.7 | 18.7 | 999.6 |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 16.5 | 3.2 | NW | 15.8 | 3.8 | 18.4 | · |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 7.2 | E | 22.3 | 3.9 | 18 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 16 | 2.9 | SE | 12.6 | 2.2 | 18 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.3 | 7.9 | NE | 31 | 2.7 | 17.8 | · |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.9 | 6.5 | E | 16.9 | 1 | 17.6 | · |
| Arouca | 1210669 | 40.933, -8.250 | 15.5 | 2.9 | E | 14.4 | 0.7 | 17.5 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 15.9 | 4.7 | SE | 14 | 0.8 | 17.5 | 999 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.4 | · | · | · | 0.9 | 17.4 | · |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 12.2 | 13.7 | SE | 41 | 1.3 | 16.6 | · |
| Coruche | 1210744 | 38.941, -8.511 | 16.4 | 25.2 | E | 34.2 | 0 | 16.5 | · |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 12.1 | 9 | S | 20.2 | 1.5 | 15.9 | 1000.1 |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 16.7 | 2.9 | E | 16.2 | 3.6 | 15.7 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14 | 2.5 | NW | 22.7 | 1.8 | 15.6 | 1000.7 |
| Ansião | 1210716 | 39.900, -8.400 | 14.8 | 11.9 | SE | 17.6 | 3.7 | 15.6 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 13.5 | 2.2 | NE | 14.4 | 1.6 | 15.6 | 1000.8 |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 15.3 | 7.9 | NE | 23.4 | 0.8 | 15.4 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.5 | 5.8 | S | 14.4 | 1.8 | 15 | 999.5 |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.7 | 6.5 | SE | 10.1 | 1.8 | 14.9 | · |
| Elvas | 1210835 | 38.891, -7.140 | 15.4 | 11.9 | SE | 25.9 | 3.9 | 14.7 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 15.5 | 4.3 | E | 7.2 | 1 | 14.5 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 16.1 | 14.4 | E | 43.6 | 1.3 | 14.5 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.1 | 12.2 | E | 34.9 | 0.7 | 14.2 | 999 |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 17 | 11.9 | E | 27 | 2.1 | 14.1 | · |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 12.7 | 6.8 | E | 17.6 | 0.8 | 14 | 1002 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 16.7 | 16.9 | SE | 23.4 | 5.6 | 14 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.7 | 19.8 | SW | 53.6 | 1.6 | 13.5 | · |
| Nelas | 1210685 | 40.517, -7.850 | 14.3 | 7.2 | NE | 25.2 | 2.6 | 13.1 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.4 | 11.2 | SE | 19.8 | 1.3 | 13.1 | 998.6 |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13.8 | 3.6 | N | 11.2 | 1.4 | 12.7 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 12.3 | 6.8 | SE | 25.6 | 0.8 | 12.6 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 16.9 | 5.4 | E | 30.2 | 1.6 | 12.2 | · |
| Anadia | 1210705 | 40.439, -8.440 | 16.6 | 8.3 | SE | 9.4 | 1.9 | 12.1 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.3 | 9 | SE | 30.6 | 4.4 | 12 | · |
| Tavira | 1210883 | 37.122, -7.621 | 18.8 | 40 | S | 40 | 3.1 | 11.7 | 1001.5 |
| Estremoz | 1210837 | 38.867, -7.517 | 14.5 | 24.5 | SE | 25.9 | 0 | 11.4 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.6 | 7.9 | SE | 28.4 | 1.6 | 11.3 | 999 |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 13.1 | 8.3 | SE | 23.8 | 1.1 | 10.6 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16.7 | 5 | NE | 12.6 | 2.1 | 10.6 | · |
| Fóia | 1210790 | 37.314, -8.596 | 14.6 | 44.6 | SW | 49 | 0.1 | 10.6 | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 18 | 0.4 | 10.1 | 1011 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 15.2 | 5 | NW | 13.3 | 1.1 | 9.4 | 1000.4 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 20 | 41 | S | 41 | 1.7 | 9.2 | 1000.2 |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 12.5 | 6.5 | W | 30.2 | 1 | 9 | 1000.2 |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 15.5 | 1.4 | NW | 23.8 | 0.8 | 8.2 | · |
| Mirandela | 1210632 | 41.515, -7.191 | 15.4 | 0 | SE | 23.8 | 0.9 | 7.7 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 12.8 | 5.4 | SE | 23.8 | 0.8 | 7.4 | 1002.6 |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 13.8 | 10.4 | SE | 33.5 | 0.5 | 6.6 | · |
| Bragança | 1200575 | 41.804, -6.743 | 12.3 | 9.7 | SE | 22.3 | 0.7 | 6.3 | 1003.1 |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 19.5 | 21.6 | SE | 28.4 | 0.7 | 6.2 | 1000.4 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 15.6 | 2.2 | SW | 13.3 | 0.9 | 6.2 | · |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 27.4 | 0 | 4.1 | 1008.8 |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 19 | · | · | · | 0.9 | 2.1 | · |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.5 | 11.2 | E | 23 | 0.1 | 1.8 | 998.7 |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | 19.4 | 34.6 | S | 34.6 | 1.2 | 1.2 | 1010.8 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 29.2 | SW | 36.7 | 0 | 0 | 1003.5 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 15.6 | 23.4 | SE | 35.3 | 0 | 0 | 999.2 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.8 | 12.2 | SE | 35.6 | · | · | 999.4 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.5 | 4 | E | 18.4 | · | · | 999.3 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 13 | 9.4 | N | 38.5 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.3 | 13 | E | 13 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.2 | 11.2 | SE | 11.9 | · | · | 999.8 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.8 | 12.2 | SE | 15.8 | · | · | 999.1 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.5 | 0.7 | NE | 10.4 | · | · | 1002.4 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15.5 | 2.5 | S | 11.9 | · | · | 999.5 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.6 | 7.2 | SE | 38.2 | · | · | 998.5 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.5 | 5.4 | E | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 9.4 | 0 | SE | 14 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 17.3 | 42.8 | E | 42.8 | · | · | 998.3 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 16.2 | 28.8 | SE | 30.2 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.4 | 7.9 | SE | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 5 | NE | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 13.3 | 8.3 | N | 93.2 | 0 | 500.2 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 11 | · | · | · | 0 | 263.5 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 17.8 | 7.2 | W | 47.9 | 0 | 260.4 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 19.3 | · | · | · | 1.2 | 258.9 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 16.4 | · | · | · | 0.1 | 257.8 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 21 | 7.2 | E | 14.4 | 0 | 181.3 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 22.6 | 47.9 | NW | 76 | 0 | 121.4 | 1000.9 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 24.9 | 21.6 | SW | 44.3 | 0 | 82.6 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 22 | · | · | · | 0 | 77.3 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 17.3 | · | · | · | 0.7 | 76.9 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 19.8 | 46.4 | N | 83.5 | 0 | 72 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 20.5 | · | · | · | 0.3 | 67.8 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 17.8 | 36.4 | NW | 39.2 | 1.7 | 66.2 | 1003.7 |
| Funchal | 1200522 | 32.648, -16.888 | 23.8 | 10.1 | E | 25.2 | 0 | 65.7 | 1001.6 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 17.4 | 12.2 | SE | 23 | 1.2 | 62.5 | 1001.2 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 22.9 | 4.3 | SE | 43.9 | 0 | 57.7 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 23.9 | · | · | · | 0 | 39.5 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 20.7 | 34.9 | NW | 55.1 | 0 | 22.2 | 1002.2 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 23.1 | 83.9 | W | 96.8 | 0 | 0.3 | 1003.4 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 16 | 6.8 | E | 10.8 | 0.2 | 10.6 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 12.2 | 44.6 | NW | 55.4 | 0 | 9.9 | 1006.8 |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.6 | 14.4 | W | 19.1 | 0 | 8.5 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 13.3 | 16.2 | NW | 17.3 | 0 | 8.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 10.4 | · | SW | · | 0 | 6.8 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 16.2 | 15.8 | W | 19.8 | 0.1 | 5.4 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 17.1 | 15.5 | NW | 22 | 0.1 | 5.3 | 1010.1 |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.8 | 16.2 | NW | 20.9 | 0.8 | 4.8 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 17.6 | 18.4 | NW | 24.1 | 0 | 4.8 | 1008.3 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 10.9 | 7.9 | SW | 28.8 | 0 | 4.5 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 12.8 | 9 | S | 16.2 | 0 | 4.1 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 18.1 | 11.9 | NW | 16.2 | 3.5 | 4 | 1008.9 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12 | 6.5 | W | 7.9 | 0.3 | 3.2 | · |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.8 | 20.2 | NW | 25.2 | 0.5 | 2.7 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.7 | 22.3 | SW | 31.3 | 0.2 | 2.1 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 17.1 | 26.3 | NW | 32.4 | 0.1 | 1.8 | 1007.7 |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 18 | 13 | NW | 25.2 | 0 | 1.5 | 1008.8 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 18.9 | 34.6 | NW | 36 | 0 | 1.2 | 1006.6 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 16.6 | 22.3 | NW | 27.4 | 0.1 | 1 | 1009.7 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 18.2 | 15.5 | W | 15.5 | 0 | 0.6 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 17.6 | 5.4 | NW | 22.7 | 0 | 0.5 | 1009.3 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16.8 | 16.6 | N | 23.4 | 0 | 0.4 | 1010.6 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 17.7 | 17.3 | W | 23.4 | 0 | 0.3 | 1007.5 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 19.1 | 33.8 | NW | 35.6 | 0 | 0.2 | 1007.4 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.8 | 24.8 | E | 25.6 | 0.1 | 0.1 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 16.9 | 6.1 | NW | 9 | 0 | 0.1 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 18.8 | 14.4 | NW | 21.6 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 12:50 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
