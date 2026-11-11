---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 09:56 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 204 reported at least one value in the 24 hours read (2026-11-10 10:00 to 2026-11-11 09:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 14.1 | 13.3 | SE | 15.1 | 5.2 | 88.2 | · |
| Mora | 1210826 | 38.941, -8.164 | 15.8 | 2.2 | SE | 26.6 | 4.2 | 74.2 | · |
| Zebreira | 1210803 | 39.867, -7.017 | 14.7 | 5.8 | E | 26.3 | 1.9 | 71.9 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 16.9 | 11.9 | S | 28.4 | 3.2 | 69 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 16.9 | 12.2 | SE | 39.6 | 2.6 | 67.7 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 17.2 | 11.5 | S | 15.1 | 3.3 | 61.3 | 1001.8 |
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 16.2 | 11.5 | S | 33.8 | 6.4 | 61.2 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 17.9 | 39.2 | S | 39.2 | 5.5 | 59.4 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 17.6 | 15.5 | SE | 24.5 | 4.7 | 55.4 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12.3 | 17.3 | S | 29.2 | 0.5 | 55.1 | · |
| Alvega | 1210812 | 39.467, -8.050 | 16.2 | 7.9 | SE | 20.2 | 2 | 53.9 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 13.4 | 5.4 | E | 26.6 | 6.7 | 50.6 | 1004.6 |
| Pegões | 1210767 | 38.651, -8.635 | 17.1 | 12.6 | S | 25.9 | 2.1 | 48.2 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 16.9 | 10.8 | S | 23.8 | 4.9 | 44.9 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 16.1 | 8.3 | SE | 23 | 3.3 | 44.6 | 1002.6 |
| Castelo Branco | 1200570 | 39.833, -7.467 | 14.2 | 11.5 | SE | 26.3 | 1.2 | 44.5 | 1003.5 |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 16.7 | 16.9 | S | 37.1 | 6.5 | 44.4 | 1000.7 |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 17 | 16.9 | S | 22.7 | 2.6 | 43 | 1003.7 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 13.7 | 2.9 | SW | 20.5 | 2.1 | 42 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 15.8 | 7.6 | E | 25.6 | 2.5 | 41.2 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 17.2 | 25.6 | S | 37.4 | 3.5 | 40.3 | 1003.3 |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.5 | 5.4 | SE | 31.7 | 1.6 | 40.3 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 15 | 11.2 | SE | 34.6 | 6 | 37.2 | 1000.6 |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 16.7 | 18.4 | S | 29.9 | 4.4 | 36.8 | 1000.8 |
| Fundão | 1210698 | 40.141, -7.554 | 13.7 | 11.2 | SE | 20.5 | 0.9 | 36 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 13.8 | 6.1 | S | 8.6 | 1.9 | 35.1 | · |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.4 | 10.1 | SE | 20.9 | 2.4 | 35 | 1003.6 |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 18 | 19.4 | S | 35.6 | 3.8 | 34.9 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16.3 | 7.2 | SE | 13.7 | 1.8 | 34.3 | · |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 16.3 | 7.6 | S | 22 | 3.6 | 33.7 | · |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 17.7 | 18.7 | S | 24.8 | 3 | 33.3 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.6 | 6.8 | SE | 16.9 | 5.9 | 32.6 | 1002.1 |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.5 | 0.7 | 32.3 | 1008.1 |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 12.1 | 4.3 | S | 16.2 | 2.3 | 32.1 | · |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 11.5 | 3.6 | SE | 31.3 | 1.6 | 31.8 | · |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16.5 | 9.7 | S | 29.9 | 3.9 | 30.9 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 12.9 | 10.1 | S | 22 | 2 | 29.8 | 1003.4 |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.3 | 6.8 | SE | 11.9 | 4.9 | 29.3 | · |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 12.8 | 3.6 | N | 20.5 | 1.7 | 28.4 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 16.2 | · | · | · | 1.2 | 27.8 | · |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 14.6 | 57.2 | S | 59.8 | 3 | 27.5 | 1003.2 |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.6 | 9.4 | SE | 21.2 | 1.1 | 27.2 | 1002.9 |
| Alvalade | 1210783 | 37.947, -8.395 | 17.4 | 11.9 | SE | 27.7 | 6.7 | 26.9 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.7 | 52.6 | S | 52.6 | 4.5 | 26.7 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 17 | 26.6 | S | 29.5 | 2.8 | 25.7 | · |
| Sines | 1200541 | 37.955, -8.838 | 16.5 | 27.7 | S | 29.9 | 8.2 | 25.4 | 1002.1 |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 16.7 | 12.2 | SE | 25.2 | 2.5 | 25.1 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 11.5 | 1.8 | S | 21.2 | 1.8 | 24.4 | · |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.5 | 6.1 | S | 17.6 | 1.5 | 23.9 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 16.9 | 21.2 | S | 28.1 | 2.1 | 23.4 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 10.5 | 3.2 | N | 19.1 | 2.3 | 22.6 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 11.6 | 34.2 | S | 50.4 | 0.9 | 22.5 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 15 | 16.2 | S | 20.5 | 6.7 | 22.2 | 1001.2 |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 31.3 | 5.2 | 21.1 | 1011 |
| Moncorvo | 1210654 | 41.183, -7.017 | 13.9 | 19.8 | S | 25.6 | 1.5 | 20.9 | 1003.6 |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 14.7 | 4 | NE | 16.2 | 2.1 | 20.7 | · |
| Guarda | 1210683 | 40.533, -7.267 | 10.7 | 16.2 | SE | 19.8 | 2 | 20 | 1003.7 |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 13.7 | 2.5 | NW | 9 | 3.5 | 19.9 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 25.9 | SE | 31.7 | 2 | 19.9 | 1000.5 |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.6 | 4.7 | SE | 13.3 | 1.6 | 19.7 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 13.7 | · | · | · | 1.6 | 19.6 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16.4 | · | · | · | 1.2 | 19.6 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 16.1 | 6.5 | SE | 27.7 | 4.8 | 19.3 | 1002.1 |
| Beja | 1200562 | 38.025, -7.867 | 16.4 | 12.6 | SE | 29.2 | 3.9 | 19.2 | 1003.9 |
| Mogadouro | 1210637 | 41.333, -6.733 | 11.7 | 33.5 | SE | 34.9 | 1.9 | 18.9 | · |
| Cabril | 1210619 | 41.717, -8.017 | 12.9 | 3.6 | SE | 13 | 2.3 | 18.5 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 15.6 | 6.8 | SE | 24.1 | 5.1 | 18.4 | 1001.5 |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 16.9 | 23 | SE | 29.9 | 3.1 | 18.4 | 1003.7 |
| Albufeira | 1210874 | 37.093, -8.262 | 18.2 | 34.2 | SE | 34.2 | 1.2 | 18.4 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.2 | 28.8 | S | 33.1 | 2.2 | 18.1 | 1001.2 |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 29.2 | SE | 48.6 | 1.4 | 17.8 | · |
| Coruche | 1210744 | 38.941, -8.511 | 16.8 | 7.2 | S | 35.6 | 0 | 17.4 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 12 | 16.9 | S | 38.2 | 2 | 16.9 | · |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 11.8 | 16.2 | SE | 41 | 0.8 | 16.9 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.3 | 19.8 | SW | 54 | 3.1 | 16.2 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 12.9 | 4.3 | NE | 31 | 1.9 | 16.2 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 16 | 10.8 | S | 19.4 | 5.6 | 15.6 | 1000.6 |
| Luzim | 1210657 | 41.146, -8.249 | 13.1 | 2.5 | W | 14.4 | 4.1 | 15.3 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 18.1 | 29.9 | SE | 29.9 | 5.2 | 15 | 1003.7 |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.4 | 7.6 | SE | 16.9 | 2.2 | 14.7 | · |
| Aljezur | 1210789 | 37.317, -8.800 | 18.9 | 18.4 | S | 20.2 | 4.8 | 14.7 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 15.8 | 6.1 | SE | 17.3 | 2.7 | 14.3 | · |
| Nelas | 1210685 | 40.517, -7.850 | 13.7 | 2.9 | SW | 25.2 | 2.5 | 14.2 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.5 | 41 | S | 41 | 3.5 | 14 | · |
| Arouca | 1210669 | 40.933, -8.250 | 14.8 | 1.4 | NE | 14.4 | 1.7 | 13.9 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 13.1 | 3.2 | NE | 22.7 | 2.6 | 13.8 | 1003.8 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.6 | · | · | · | 2.5 | 13.4 | · |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.7 | 9.4 | SE | 23.4 | 1.3 | 13.4 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 16.7 | 17.6 | S | 25.9 | 0 | 13.3 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16 | 5.8 | W | 14.4 | 1.5 | 13.2 | 1004.2 |
| Amareleja | 1210851 | 38.201, -7.226 | 17.6 | 9.7 | S | 31 | 1.9 | 12.9 | 1004.2 |
| Fóia | 1210790 | 37.314, -8.596 | 14.6 | 44.6 | SW | 49 | 0.1 | 12.8 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 20.2 | SE | 36 | 1.5 | 12.6 | 1001.2 |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 5.8 | SW | 22.3 | 2.6 | 12.5 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 14.6 | 6.1 | NE | 23.4 | 2 | 12.3 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15 | 2.9 | NW | 20.5 | 1.3 | 12.2 | · |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 15.8 | 2.9 | W | 15.8 | 1.8 | 12.2 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 18.7 | SE | 20.2 | 1 | 12 | 1004.3 |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.2 | 9.4 | S | 11.2 | 1.8 | 11.9 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.4 | 11.5 | E | 26.3 | 1.2 | 11.8 | 1001.5 |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 16.1 | 9.7 | S | 15.5 | 3.1 | 11.8 | 1000.6 |
| S. Gens | 1210649 | 41.184, -8.644 | 15.6 | 3.6 | S | 7.2 | 1.3 | 11.6 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.3 | 20.2 | S | 34.9 | 2.4 | 11.6 | 1001 |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 11.7 | 7.2 | SE | 17.6 | 0.9 | 11.3 | 1004.5 |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 16.8 | 4.3 | E | 16.2 | 1.5 | 11.3 | · |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.3 | 2.5 | E | 15.8 | 1.9 | 11 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.2 | 9.4 | S | 20.2 | 1 | 10.9 | 1001.8 |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 15.5 | 14.4 | E | 43.6 | 0.8 | 10.5 | · |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 11.8 | 16.9 | SE | 20.2 | 0.8 | 10.2 | 1001.4 |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.1 | 9.7 | SE | 19.8 | 1.1 | 10.1 | 1001.9 |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 18.4 | 0.4 | 10.1 | 1011 |
| Ansião | 1210716 | 39.900, -8.400 | 14.7 | 9 | SE | 17.6 | 1 | 9.8 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 11.9 | 9 | E | 25.6 | 2.8 | 9.4 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 12 | 14 | S | 23.8 | 1 | 8.9 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 12.9 | 1.4 | SE | 14.4 | 2.4 | 8.9 | 1003 |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 11.9 | 18 | S | 30.2 | 1.3 | 8.5 | 1003.2 |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 16.5 | 8.6 | SE | 27 | 1.4 | 8.4 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.5 | 22.3 | S | 34.6 | 0 | 8.2 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16.3 | 3.6 | E | 12.6 | 1.4 | 8.1 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 16.6 | 2.5 | SE | 30.2 | 0.9 | 8.1 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 12.9 | 2.5 | N | 11.2 | 2.1 | 8.1 | · |
| Anadia | 1210705 | 40.439, -8.440 | 16.5 | 6.5 | SE | 10.1 | 1.2 | 8 | · |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 27.4 | 0 | 7.7 | 1008.8 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 18.7 | 10.8 | S | 24.5 | 0 | 7.4 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.5 | 13 | SE | 28.4 | 0.9 | 7 | 1001.8 |
| Elvas | 1210835 | 38.891, -7.140 | 17.2 | 16.6 | S | 25.9 | 4.3 | 5.9 | · |
| Tavira | 1210883 | 37.122, -7.621 | 19.4 | 27.7 | S | 33.5 | 2 | 5.8 | 1005.2 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 20.2 | 35.3 | S | 35.3 | 0.1 | 5.8 | 1004.3 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 13.7 | 6.8 | SW | 18 | 1 | 5.4 | 1002.6 |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 16.5 | 5.4 | E | 23.8 | 0.1 | 5.3 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 12.2 | 9.7 | SE | 23.8 | 1.5 | 5.2 | 1004.7 |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12.7 | 13 | SE | 33.5 | 0.4 | 4.6 | · |
| Mirandela | 1210632 | 41.515, -7.191 | 14.3 | 10.1 | S | 23.8 | 1.3 | 4.5 | · |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 20 | 24.8 | SE | 28.4 | 0.1 | 4.3 | 1004.4 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 14.4 | 1.4 | SE | 13.3 | 0.7 | 4.2 | · |
| Bragança | 1200575 | 41.804, -6.743 | 11.9 | 12.2 | SE | 22.3 | 1.4 | 4.1 | 1005.2 |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 19.6 | 28.8 | S | 32 | 0.9 | 3 | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | 19.4 | 34.6 | S | 34.6 | 1.2 | 2.6 | 1010.8 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.6 | 10.8 | SE | 19.8 | 0.1 | 2.5 | 1002.7 |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 19.5 | · | · | · | 0.1 | 0.8 | · |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 29.2 | SW | 42.5 | 0 | 0 | 1003.5 |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 16.7 | 17.3 | S | 32.8 | 0 | 0 | 1001.3 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 17.3 | 22.7 | S | 35.3 | 0 | 0 | 1003.5 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.2 | 6.8 | E | 35.6 | · | · | 1002.9 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.6 | 8.3 | SE | 18.4 | · | · | 1001.1 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 13.3 | 29.2 | S | 38.5 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.3 | 9.7 | E | 11.2 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.2 | 7.2 | SE | 11.9 | · | · | 1001.2 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.9 | 15.8 | SE | 16.2 | · | · | 1000.8 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.5 | 0.7 | NE | 10.4 | · | · | 1002.4 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15.1 | 6.8 | SE | 11.9 | · | · | 1001.6 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.2 | 19.8 | S | 38.2 | · | · | 1001 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.2 | 3.6 | S | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.9 | 0 | SE | 14 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 16.7 | 24.8 | E | 32.4 | · | · | 1002.5 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 17.3 | 23.4 | S | 30.2 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.2 | 16.9 | S | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 2.5 | NW | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 14.8 | 27.7 | N | 93.2 | 0.6 | 502.7 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 13.5 | · | · | · | 1.2 | 265.9 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 17.5 | 9.7 | SW | 47.9 | 0 | 262 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 18.1 | · | · | · | 0.7 | 256.7 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 20.6 | · | · | · | 6.1 | 252.1 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 20.2 | 3.2 | W | 14.4 | 0 | 182.8 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 23.2 | 23.4 | NW | 76 | 0 | 121.5 | 996.4 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 22.1 | 8.6 | SW | 44.3 | 0 | 84.3 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 21 | · | · | · | 0 | 78.6 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 20.6 | 52.2 | N | 83.5 | 0.6 | 71.4 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 18.8 | · | · | · | 5.5 | 69.6 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 21.3 | · | · | · | 0.8 | 67.7 | · |
| Funchal | 1200522 | 32.648, -16.888 | 22.2 | 9.4 | NE | 25.2 | 0 | 65.8 | 996.3 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 19.1 | 10.1 | SE | 29.2 | 0.8 | 61.4 | 996.2 |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 19.7 | 25.9 | NW | 38.2 | 10.2 | 60.4 | 997.6 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 20.4 | 13.3 | E | 43.9 | 0 | 57.7 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 21.9 | · | · | · | 0 | 39.5 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 21.1 | 37.1 | NW | 55.1 | 0.1 | 22.2 | 996.4 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 23.2 | 94.7 | SW | 96.8 | 0 | 0.3 | 1002.3 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 14.8 | 7.9 | S | 10.8 | 0.6 | 8.6 | · |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.5 | 14.8 | W | 25.2 | 0.2 | 8.4 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 12.5 | 15.1 | NW | 17.3 | 0 | 8.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 10.8 | · | SE | · | 0.2 | 6.9 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 11.2 | 54.4 | NW | 54.4 | 0.6 | 6.4 | 1005.2 |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 15 | 14.8 | NW | 22 | 1.2 | 5 | 1009 |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 15.8 | 15.1 | W | 19.8 | 0 | 5 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 16.3 | 12.2 | NW | 24.1 | 0.1 | 4.4 | 1007 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 10.5 | 6.1 | SW | 31.3 | 0 | 4.2 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 12.6 | 14 | SE | 16.2 | 0 | 4.2 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 15.6 | 14.8 | NW | 18.7 | 0.5 | 3.5 | · |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 11.8 | 5.4 | W | 7.9 | 0 | 2.4 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.1 | 20.5 | W | 31.3 | 0 | 1.9 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 17.1 | 23 | NW | 35.6 | 0 | 1.5 | 1006.2 |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 16.7 | 16.2 | NW | 25.2 | 0 | 1.5 | 1007.1 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.2 | 23.8 | NW | 25.2 | 0.2 | 1.5 | · |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 15.8 | 14.4 | NW | 32.8 | 0.2 | 1.3 | 1008.5 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 16.9 | 27 | NW | 36 | 0 | 1.2 | 1005.2 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 17.1 | 11.5 | W | 15.1 | 0 | 0.6 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 17.3 | 11.2 | NW | 16.2 | 0 | 0.5 | 1007.5 |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 16.3 | 13.3 | NW | 22.7 | 0 | 0.5 | 1007.6 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16 | 16.6 | N | 24.5 | 0 | 0.4 | 1009.3 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 16.3 | 17.6 | NW | 23.4 | 0 | 0.2 | 1005.9 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 17.7 | 35.6 | NW | 35.6 | 0 | 0.2 | 1005.8 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.8 | 24.8 | E | 25.6 | 0.1 | 0.1 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 16.9 | 6.1 | NW | 9 | 0 | 0.1 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 16.2 | 19.1 | NW | 21.6 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 09:55 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
