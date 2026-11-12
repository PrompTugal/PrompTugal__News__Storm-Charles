---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 12:53 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 205 reported at least one value in the 24 hours read (2026-11-11 13:00 to 2026-11-12 12:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.6 | 14.8 | W | 19.8 | 1.6 | 53.8 | · |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 15.9 | 13.7 | W | 16.6 | 0.1 | 48.4 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 11.1 | 18.7 | W | 34.2 | 1.8 | 48.3 | · |
| Cabril | 1210619 | 41.717, -8.017 | 13.4 | 11.5 | W | 14.4 | 0.7 | 45.8 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 16 | 16.6 | W | 23.8 | 0 | 45.3 | 1003.1 |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 16.9 | 12.2 | SW | 12.2 | 0 | 42.9 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 15.6 | 18.7 | SW | 18.7 | 0 | 41.4 | 1001 |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 18.4 | 18.7 | SW | 28.8 | 0 | 41.4 | 1005 |
| Guarda | 1210683 | 40.533, -7.267 | 11.3 | 14.4 | W | 29.9 | 0 | 40.3 | 1003 |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 15 | 13.3 | W | 14.8 | 0 | 40.1 | 1001.8 |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 11.6 | 9 | SW | 21.2 | 0.1 | 39.2 | 1001.2 |
| Montalegre | 1210611 | 41.823, -7.788 | 10.1 | 15.8 | W | 15.8 | 2.1 | 38.2 | · |
| Ansião | 1210716 | 39.900, -8.400 | 15.3 | 18.7 | W | 19.8 | 1.8 | 38.2 | · |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 21.9 | · | · | · | 0 | 37.8 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 13.3 | 13.7 | SW | 14.4 | 3.4 | 36 | · |
| Fundão | 1210698 | 40.141, -7.554 | 15.7 | 10.8 | W | 21.2 | 0 | 36 | · |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.5 | 11.9 | SW | 15.5 | 0 | 36 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 20.5 | 9.4 | SW | 23.8 | 0 | 35.8 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 19.3 | 23 | W | 41 | 0 | 35.6 | 1004.2 |
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 19.3 | 23.8 | W | 36.7 | 0 | 33.8 | · |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 15.1 | 7.9 | W | 18 | 0 | 33.3 | · |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 12 | 11.9 | SW | 20.2 | 0.9 | 32.8 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 13.7 | 19.4 | W | 35.6 | 0 | 32.8 | 1005.3 |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 17.9 | 12.6 | SW | 17.3 | 0 | 31.9 | 1000.7 |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 20.6 | 14.4 | SW | 50.4 | 0 | 31.3 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 12.6 | S | 25.6 | 0 | 31.1 | 1001.8 |
| Luzim | 1210657 | 41.146, -8.249 | 14.2 | 7.6 | S | 9.4 | 0 | 30.9 | · |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 14 | SW | 15.8 | 0.4 | 30.8 | · |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 18.9 | 18.4 | W | 32.8 | 0 | 30.8 | 1004.7 |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 18.5 | 12.6 | S | 14.8 | 0 | 30.8 | 1004.8 |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 15.9 | 13 | W | 20.5 | 0 | 30.8 | 1003.3 |
| Rio Maior | 1210729 | 39.350, -8.933 | 19.3 | 6.1 | W | 13.7 | 0 | 30.6 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 14.3 | 9.7 | W | 27.4 | 0.1 | 30.4 | 1001.8 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 11.6 | 13.7 | S | 21.2 | 1.2 | 30.1 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 17.9 | 5.4 | S | 13.3 | 0 | 29.4 | 1001 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 17.1 | 13.7 | S | 13.7 | 0 | 29.3 | 1000.2 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 18.4 | 7.9 | SW | 11.2 | 0 | 29.2 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 16.1 | 15.8 | SW | 18.4 | 0.1 | 28.5 | 1001.2 |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 13.5 | 14.4 | SW | 14.4 | 1 | 28.5 | 1000.9 |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 15.1 | 30.6 | SW | 78.5 | 0.2 | 28 | 1008.2 |
| Vinhais | 1210612 | 41.843, -7.003 | 12.3 | 9.7 | SW | 20.2 | 0 | 28 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 17.4 | 12.2 | SW | 21.6 | 0.9 | 27.5 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 18.7 | 21.2 | W | 28.1 | 0 | 27 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 19.7 | 31.3 | W | 40.3 | 0 | 26.9 | · |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 12.5 | 27.7 | SW | 28.4 | 0.1 | 26.6 | · |
| Alvega | 1210812 | 39.467, -8.050 | 20 | 5.8 | SW | 19.1 | 0 | 26.5 | · |
| Arouca | 1210669 | 40.933, -8.250 | 16 | 9.7 | W | 12.2 | 3.6 | 26.3 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 13.6 | 13.3 | SW | 21.6 | 0 | 25.2 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 21.2 | SW | 23.4 | 0 | 25 | 1008.4 |
| Alcobaça | 1210726 | 39.517, -8.967 | 18.5 | 15.8 | W | 16.9 | 0 | 24.9 | · |
| Albufeira | 1210874 | 37.093, -8.262 | 19.8 | 20.2 | SW | 36.4 | 0 | 24.8 | · |
| Bragança | 1200575 | 41.804, -6.743 | 13.7 | 15.5 | W | 15.5 | 0 | 24.6 | 1001.3 |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 20.8 | 26.3 | W | 33.5 | 0 | 24.6 | 1007.8 |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.6 | 29.9 | SW | 32.8 | 0.4 | 24.3 | · |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 18.4 | 25.6 | W | 25.6 | 0 | 24.1 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 17 | 5.8 | SW | 9 | 0.1 | 24 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 12.8 | 4.7 | SW | 8.6 | 5.5 | 24 | 1002 |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 16.1 | 19.8 | SW | 35.3 | 0.1 | 23.9 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.1 | 31.7 | SW | 36 | 0.2 | 23.8 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 18.2 | 10.4 | SW | 13.7 | 0 | 23.5 | 1001.4 |
| Mirandela | 1210632 | 41.515, -7.191 | 17.5 | 13.7 | SW | 13.7 | 0 | 23.5 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 19 | 14.4 | SW | 37.4 | 0 | 22.9 | 1007.5 |
| Elvas | 1210835 | 38.891, -7.140 | 17.9 | 19.4 | W | 25.6 | 0 | 22.5 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 16.1 | 12.6 | S | 14.4 | 1.5 | 22.4 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 13.5 | 6.5 | SW | 12.6 | 0 | 22 | · |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 21.1 | 26.3 | SW | 57.2 | 0 | 21.9 | · |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 22.1 | 24.5 | W | 47.5 | 0 | 21.8 | 1008.5 |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 14.2 | 14.4 | W | 18 | 0 | 21.6 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 16 | 6.5 | W | 10.8 | 1.1 | 21.5 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 32 | SW | 51.8 | 0.2 | 21.5 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13.6 | 5 | SE | 5.4 | 2.3 | 21.2 | · |
| Fóia | 1210790 | 37.314, -8.596 | 12.8 | 40.3 | W | 63 | 1.2 | 20.4 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14 | 23 | SW | 23 | 0.5 | 20 | 1004 |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 14.8 | 16.2 | SW | 18.4 | 0 | 20 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 17.8 | 24.1 | W | 25.6 | 0.1 | 19.9 | 1004.7 |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 18.9 | 14 | W | 14 | 0 | 19.8 | · |
| Tavira | 1210883 | 37.122, -7.621 | 21.4 | 25.9 | W | 49.3 | 0 | 19.7 | 1008.9 |
| Setúbal | 1210770 | 38.548, -8.891 | 20.5 | 12.2 | W | 24.5 | 0 | 19.6 | 1005.7 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.7 | 14 | SW | 17.3 | 2.2 | 19.6 | 1003.4 |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.2 | 18.7 | SW | 18.7 | 0 | 19.2 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 20.6 | 23.8 | SW | 31.3 | 0 | 18.8 | 1005.1 |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 18.1 | 9 | SW | 12.2 | 0.1 | 18.6 | · |
| Aljezur | 1210789 | 37.317, -8.800 | 19.5 | 10.1 | SW | 21.2 | 0.8 | 18.4 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 19.9 | 15.5 | SW | 25.6 | 0 | 18.2 | · |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 19.4 | · | · | · | 0 | 18.1 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 14 | 19.4 | W | 19.4 | 0 | 18.1 | 1000.8 |
| S. Gens | 1210649 | 41.184, -8.644 | 16 | 6.1 | S | 6.1 | 0 | 18 | · |
| Sagres | 1200533 | 37.013, -8.949 | 20.7 | 18.7 | SW | 48.6 | 0 | 17.5 | 1008.5 |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 9.9 | 26.6 | SW | 26.6 | 1.2 | 17.4 | 1004.4 |
| Zambujeira | 1210788 | 37.582, -8.743 | 18.7 | 18.7 | NW | 43.2 | 0.1 | 17.3 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 20.3 | 27 | W | 31.7 | 0 | 17.2 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 17.3 | · | · | · | 0 | 17 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 11.6 | 10.8 | W | 23.4 | 0.1 | 15.4 | · |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 17.7 | 10.4 | NW | 10.4 | 0 | 15.3 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 12.9 | 16.2 | W | 18.4 | 1.3 | 15.3 | 1003.2 |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 21.4 | 22.3 | SW | 43.9 | 0 | 15.2 | 1008 |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 18.3 | 18.7 | W | 32.8 | 0 | 15.2 | · |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 21.3 | 17.3 | W | 24.5 | 0 | 14.9 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 17 | · | · | · | 0 | 14.5 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 17.9 | 13.3 | W | 15.5 | 3.6 | 14.1 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 17.5 | 14.8 | S | 17.6 | 0 | 13.7 | 1001.7 |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 19.2 | 14 | SW | 14 | 0 | 13.2 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 18.6 | 13.7 | SW | 19.8 | 0.7 | 12.7 | 1004.1 |
| Amareleja | 1210851 | 38.201, -7.226 | 19.1 | 28.4 | SW | 34.9 | 0 | 12.7 | 1006 |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 15.1 | · | · | · | 0.5 | 12.5 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 17.3 | 7.6 | SW | 21.6 | 0.1 | 12.5 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 19.6 | 26.3 | W | 26.3 | 0 | 11.9 | · |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 14.2 | 7.9 | SW | 12.2 | 0.1 | 11.6 | · |
| Mora | 1210826 | 38.941, -8.164 | 19.9 | 12.2 | W | 14.8 | 0 | 11.5 | · |
| Beja | 1200562 | 38.025, -7.867 | 18.6 | 25.6 | SW | 35.6 | 0 | 11 | 1006.4 |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 20.6 | 18.7 | SW | 26.3 | 0 | 9.7 | · |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 18.7 | 15.5 | W | 29.9 | 0 | 9.4 | 1006.5 |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 18.6 | 15.5 | SW | 15.5 | 0 | 9.3 | · |
| Pegões | 1210767 | 38.651, -8.635 | 20.7 | 27 | W | 27 | 0 | 9.2 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 17.7 | 11.2 | SW | 12.6 | 0.1 | 9.1 | 1003.3 |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 17.3 | 9.4 | SW | 9.4 | 3.7 | 9 | 1001 |
| Nelas | 1210685 | 40.517, -7.850 | 15.4 | 18 | SW | 18 | 0 | 8.3 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 18.5 | 13.7 | SW | 13.7 | 0.1 | 8.2 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 29.5 | SW | 31 | 0 | 8.1 | 1004.4 |
| Zebreira | 1210803 | 39.867, -7.017 | 17 | 20.9 | SW | 26.6 | 0 | 7.9 | · |
| Anadia | 1210705 | 40.439, -8.440 | 19 | 4 | SW | 12.2 | 0 | 7.4 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 18.7 | 19.8 | SW | 43.9 | 0 | 7.3 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 20 | 20.2 | SW | 20.2 | 0 | 7.2 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 18.1 | 29.2 | SW | 37.4 | 0 | 7 | 1005.9 |
| Sines | 1200541 | 37.955, -8.838 | 19.4 | 22 | SW | 57.2 | 0 | 6.7 | 1007 |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 18.2 | 35.3 | W | 68.4 | 0 | 6.5 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 18.7 | 22 | SW | 22 | 0 | 6.3 | 1003 |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 18.3 | 23 | W | 42.8 | 0 | 4.6 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 17.2 | 32.4 | SW | 37.4 | 0 | 4.3 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 17.4 | 13.3 | W | 27.4 | 0 | 4 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 20 | 20.5 | SW | 20.5 | 0 | 3.9 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 9.2 | 22 | W | 31.7 | 0 | 3.5 | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.6 | 20.2 | W | 22 | 0 | 1.8 | 1007.8 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 23.8 | SW | 30.6 | 0 | 1.4 | 1000.3 |
| Coruche | 1210744 | 38.941, -8.511 | 20.1 | 14 | NW | 26.3 | 1.3 | 1.3 | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | 15.8 | · | · | · | 0.8 | 0.8 | 1007.7 |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.3 | 22 | W | 22 | 0.5 | 0.5 | 1007.5 |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 20.1 | 25.2 | SW | 25.2 | 0 | 0 | 1005.8 |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 14.4 | 26.6 | SW | 26.6 | 0 | 0 | · |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 20.8 | 10.4 | W | 23.4 | 0 | 0 | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | 19.4 | 24.8 | SW | 26.6 | 0 | 0 | 1007.7 |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.2 | 8.6 | SW | 10.4 | 0 | 0 | 1008.3 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 17.5 | 14.4 | SW | 22.3 | · | · | 1004.9 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 18.7 | 15.8 | SW | 15.8 | · | · | 1001.3 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 12.5 | 19.8 | S | 25.6 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 13.8 | 8.6 | SW | 18.7 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12 | 6.1 | SW | 13.7 | · | · | 1001.3 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 15.9 | 7.9 | SW | 11.5 | · | · | 1001 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 17.7 | 6.8 | SW | 8.3 | · | · | 1001.4 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 17.8 | 9.4 | W | 22.3 | · | · | 1005.2 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 16.2 | 5.8 | SW | 10.1 | · | · | 1001.5 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 16.4 | 22 | S | 22 | · | · | 1001.9 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 16 | 12.6 | SW | 16.2 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 18.3 | 28.4 | W | 32 | · | · | 1006 |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.1 | 0 | W | 33.1 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 18.6 | 25.6 | S | 46.4 | · | · | 1007.4 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 18.2 | 24.1 | SW | 37.1 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 10.6 | 18.4 | SW | 22.3 | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 15.5 | S | 19.4 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Santana | 1210965 | 32.808, -16.886 | 20.6 | · | · | · | 0 | 3.7 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 24.1 | · | · | · | 0 | 2.5 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 22.2 | 21.6 | W | 32.8 | 0 | 1.1 | 1014.8 |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 20.3 | 16.2 | W | 28.1 | 0 | 1 | 1015 |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 22.4 | 5.8 | S | 47.2 | 0 | 0.5 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 22.4 | · | · | · | 0 | 0.2 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 11.7 | · | · | · | 0 | 0.2 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 16.7 | · | · | · | 0 | 0.2 | · |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 20.1 | 9 | NW | 17.6 | 0.2 | 0.2 | 1013.5 |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 14.2 | 0 | NE | 11.5 | 0 | 0.1 | · |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 22.3 | 6.8 | SW | 12.2 | 0 | 0.1 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 22.3 | · | · | · | 0 | 0.1 | · |
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 13.6 | 17.3 | NW | 31.3 | 0 | 0 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 20.4 | 4.3 | SE | 6.8 | 0 | 0 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 20.3 | · | · | · | 0 | 0 | · |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 22.5 | 25.6 | SW | 30.6 | 0 | 0 | · |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.7 | 1.8 | N | 70.2 | 0 | 0 | 1016.2 |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 23.1 | 7.6 | SE | 53.3 | 0 | 0 | 1015.2 |
| Funchal | 1200522 | 32.648, -16.888 | 23.6 | 4.7 | W | 12.2 | 0 | 0 | 1014.9 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 12.5 | 21.2 | NW | 50 | 0 | 28.9 | 1013.7 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12.1 | 5.4 | W | 7.6 | 0 | 9.3 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 19.3 | 6.1 | NW | 19.1 | 0 | 8.1 | · |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 17.9 | 4.3 | SW | 11.2 | 0 | 7.5 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 16.7 | 8.6 | SW | 17.3 | 0.1 | 6.7 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 18.4 | 10.8 | SW | 27.4 | 0 | 4.4 | 1011.9 |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 15.8 | 7.9 | NW | 24.8 | 0 | 2.6 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 12.2 | · | SW | · | 0 | 2.6 | · |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 18.8 | 21.6 | W | 35.3 | 0 | 2.6 | 1013.4 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 20 | 7.2 | W | 15.5 | 0 | 1.8 | · |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 14.3 | 10.4 | W | 20.2 | 0 | 1.4 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 15.6 | 2.2 | N | 10.1 | 0 | 1.1 | · |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 19.1 | 4.7 | S | 18 | 0 | 1.1 | 1012.3 |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 12.1 | 9.7 | SE | 18 | 0 | 0.9 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 19.3 | 8.6 | NW | 20.9 | 0 | 0.8 | 1010.3 |
| São Jorge | 1200510 | 38.660, -28.170 | 18.1 | 4.7 | SE | 23 | 0 | 0.8 | 1012.4 |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 14.2 | 13.7 | S | 13.7 | 0 | 0.7 | · |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 19 | 19.4 | W | 24.5 | 0 | 0.7 | 1010.3 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 17.9 | 7.6 | SW | 21.2 | 0 | 0.6 | 1013.2 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 11.7 | 16.9 | SW | 24.8 | 0 | 0.5 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 14.3 | 15.5 | SW | 17.3 | 0 | 0.1 | · |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 19.2 | 7.9 | S | 16.6 | 0 | 0 | 1011 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.7 | 12.6 | E | 17.6 | 0 | 0 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 18.9 | 7.9 | W | 16.6 | 0 | 0 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 19.3 | 3.6 | E | 16.6 | 0 | 0 | 1012.2 |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 19.3 | 6.8 | S | 15.8 | 0 | 0 | 1012.7 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 19.8 | 19.8 | NW | 39.2 | 0 | 0 | 1014.5 |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-12 12:52 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
