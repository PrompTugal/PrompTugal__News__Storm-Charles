---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 17:52 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 203 reported at least one value in the 24 hours read (2026-11-10 18:00 to 2026-11-11 17:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 17.9 | 25.2 | NW | 36.7 | 0 | 111.9 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 19.2 | 24.5 | NW | 24.5 | 0 | 106.2 | 989.8 |
| Cabo Raso | 1210765 | 38.709, -9.485 | 17.1 | 30.2 | NW | 39.2 | 0 | 103.6 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 16.9 | 18 | W | 41 | 1.2 | 103.2 | 989.6 |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 13.8 | 17.3 | NW | 18.4 | 0 | 99 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 18.9 | 17.6 | SW | 27.7 | 1.3 | 97 | · |
| Mora | 1210826 | 38.941, -8.164 | 18.4 | 10.1 | SW | 15.5 | 0.4 | 90.9 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 18.6 | 14.8 | W | 25.6 | 0 | 87 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 18.8 | 26.3 | W | 43.9 | 0.6 | 83.4 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 18.1 | 11.9 | NW | 28.8 | 1.5 | 74.8 | 989.4 |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 17.7 | 22.7 | NW | 32.8 | 0 | 74.5 | 989.6 |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 13.6 | 15.5 | NE | 18.7 | 5.1 | 74 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 18 | 7.9 | S | 18 | 2.1 | 68.5 | · |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 17.7 | 11.9 | NW | 24.5 | 0 | 68 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 19.2 | 18 | NW | 43.2 | 0.4 | 65.9 | · |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 13.6 | 9.4 | N | 14.4 | 6.8 | 65.6 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 15 | 11.9 | SE | 32.8 | 2.7 | 64.9 | 991.5 |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 18 | 17.3 | NW | 31.3 | 0 | 64.8 | 989.9 |
| Pegões | 1210767 | 38.651, -8.635 | 18.5 | 14.4 | SW | 23 | 0.4 | 62.4 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 13.6 | 14 | E | 23.8 | 6.9 | 61.6 | 991.3 |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 15.4 | 18.4 | N | 31 | 0 | 60.3 | 991.1 |
| Fundão | 1210698 | 40.141, -7.554 | 12.9 | 10.4 | E | 21.2 | 6.9 | 59.4 | · |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16.2 | 16.2 | NW | 31.7 | 0.3 | 58.7 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 18.7 | 14.4 | SE | 16.2 | 1.9 | 57.2 | 989.5 |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.2 | 10.8 | NW | 13.7 | 0.3 | 56.8 | · |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 18.6 | 9.7 | S | 29.9 | 1.6 | 56.7 | 991.3 |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 19.7 | 13.7 | W | 26.3 | 0 | 56.2 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 20.4 | 24.5 | SW | 34.9 | 0.1 | 56.2 | 993 |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 13.7 | 1.8 | NE | 8.6 | 4.9 | 55.7 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.3 | 22.7 | W | 54.4 | 0.6 | 55.6 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16.5 | 10.1 | NW | 23.8 | 6.3 | 53.2 | · |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 16.1 | 64.4 | S | 78.5 | 0.7 | 52.6 | 991.7 |
| Albufeira | 1210874 | 37.093, -8.262 | 18.3 | 23.8 | SW | 39.2 | 0.1 | 52.5 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 20.3 | 25.9 | SW | 31.7 | 0.2 | 51.2 | · |
| Aljezur | 1210789 | 37.317, -8.800 | 19.4 | 5.4 | SW | 21.2 | 0.6 | 50.7 | · |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 13.9 | 15.5 | NE | 20.5 | 4.2 | 49 | 991 |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12 | 17.6 | E | 22.3 | 2.7 | 48.8 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.6 | 35.6 | W | 48.6 | 0 | 48.8 | 993.5 |
| Ansião | 1210716 | 39.900, -8.400 | 13.9 | 9 | E | 17.6 | 8.5 | 45.8 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 19 | 27 | SW | 37.4 | 0.6 | 45.7 | 992.3 |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 11.2 | SW | 23.4 | 0.6 | 44.8 | 994.3 |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 20.4 | 57.2 | SW | 57.2 | 0.3 | 44.2 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 17.5 | 22.7 | S | 35.3 | 0 | 43.4 | · |
| Beja | 1200562 | 38.025, -7.867 | 18.3 | 28.1 | S | 32.4 | 0.7 | 43.2 | 991.3 |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 19.2 | 24.8 | SW | 31.3 | 0 | 42.9 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 19.9 | 19.1 | SW | 34.9 | 2.2 | 42.1 | · |
| Guarda | 1210683 | 40.533, -7.267 | 10.5 | 20.9 | SE | 29.9 | 2.4 | 41.8 | 992.9 |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.1 | 23.8 | N | 68.4 | 0 | 41.4 | · |
| Fóia | 1210790 | 37.314, -8.596 | 14.7 | 58.7 | S | 72.7 | 14.7 | 39.7 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.7 | 4.3 | NE | 14.8 | 1.3 | 39.6 | 994.7 |
| Alvega | 1210812 | 39.467, -8.050 | 16.7 | 6.5 | SE | 16.2 | 0.1 | 38.5 | · |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.9 | 5.8 | N | 20.2 | 0 | 38.3 | · |
| Sines | 1200541 | 37.955, -8.838 | 18.4 | 28.4 | W | 57.2 | 0.1 | 38.1 | 991.2 |
| Montalegre | 1210611 | 41.823, -7.788 | 10.9 | 4.7 | E | 14.8 | 3.4 | 37.4 | · |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.7 | 14.8 | NE | 18.7 | 0.6 | 37 | 993.3 |
| Amareleja | 1210851 | 38.201, -7.226 | 18.8 | 19.8 | S | 34.9 | 0.4 | 36.1 | 990.5 |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.8 | 10.1 | E | 15.1 | 1.5 | 32.4 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 11.9 | 7.2 | NE | 34.2 | 0.6 | 31.9 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 13 | 6.8 | NE | 21.2 | 0.5 | 31.7 | 993.1 |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 12.4 | 9.4 | NE | 13 | 2.5 | 31.7 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 22 | NW | 34.6 | 0 | 31.6 | 991.3 |
| Elvas | 1210835 | 38.891, -7.140 | 17.8 | 13.7 | S | 23.4 | 0 | 31.6 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 18.4 | 20.2 | S | 42.8 | 1.4 | 31.5 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 14 | NE | 51.8 | 2.1 | 31.2 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 15.5 | 4 | NE | 11.9 | 8.6 | 31 | 994.2 |
| Tavira | 1210883 | 37.122, -7.621 | 19.9 | 36.4 | SW | 49.3 | 1.1 | 30.7 | 994.3 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 20.3 | 29.5 | SW | 47.5 | 1.2 | 30.7 | 994 |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 7.2 | N | 22 | 7.9 | 30.5 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 15.3 | 2.9 | NE | 16.2 | 1.5 | 30.2 | 993.8 |
| Zebreira | 1210803 | 39.867, -7.017 | 13.8 | 22.7 | E | 26.6 | 0 | 30.2 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.2 | 9.7 | NW | 22 | 0.1 | 30 | 990.9 |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14 | 3.2 | SW | 21.6 | 0.2 | 29.6 | 992.2 |
| Cabril | 1210619 | 41.717, -8.017 | 13.5 | 1.8 | SW | 13 | 4.1 | 29.5 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 13.5 | 5.8 | NW | 22.3 | 3.3 | 28.8 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.8 | · | · | · | 2.4 | 28.7 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 18.4 | 17.3 | SE | 37.4 | 0.4 | 28 | 990.9 |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 15.6 | 2.2 | W | 15.1 | 4.5 | 28 | 994.7 |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 11.5 | 14.8 | E | 33.5 | 2.9 | 27.5 | · |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 16.5 | 12.2 | NE | 12.2 | 6.1 | 27.3 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.7 | 9 | NE | 16.6 | 5.7 | 27.2 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 13.9 | 12.6 | SE | 27.4 | 0.9 | 27 | 994.2 |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.8 | 2.5 | NW | 12.6 | 3.3 | 26.6 | 994.5 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 12 | 10.1 | NE | 22.7 | 1.1 | 26 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16.1 | · | · | · | 2.2 | 25.9 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 15.7 | 3.2 | NW | 16.2 | 2.7 | 25.1 | 994 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16 | 3.2 | NW | 9.7 | 4.7 | 25 | · |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 14.8 | 6.8 | NE | 13.3 | 2 | 24.8 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.4 | 8.3 | SE | 12.6 | 0.8 | 24.4 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 12.7 | 0 | NE | 18.4 | 4.8 | 23.7 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 5 | NE | 25.2 | 5.1 | 23.6 | 994.4 |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 12.6 | 5.8 | E | 17.6 | 2.9 | 23.6 | 995.5 |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 13.4 | 17.3 | E | 17.3 | 1 | 23.4 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 13.5 | 1.1 | E | 14.4 | 2 | 22.7 | 994 |
| Luzim | 1210657 | 41.146, -8.249 | 13.6 | 3.6 | SE | 8.6 | 1.2 | 22.4 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 15.2 | 10.1 | NE | 21.6 | 1.6 | 22.3 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.2 | 0.7 | 21.4 | 1008.1 |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 20.2 | 30.6 | SW | 43.9 | 0.8 | 21.1 | 993.9 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.2 | · | · | · | 7.1 | 20.9 | · |
| Mirandela | 1210632 | 41.515, -7.191 | 15.2 | 0.4 | S | 17.6 | 1.3 | 20.5 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 15.3 | 5.4 | N | 5.8 | 2.4 | 20.5 | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 18 | 5.2 | 20.5 | 1011 |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.2 | 32.8 | SE | 34.9 | 2.4 | 20.4 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 14.1 | 2.5 | NW | 11.2 | 1.5 | 20.4 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 12.5 | 1.4 | NE | 23.8 | 1 | 20.3 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 12.5 | 7.9 | SE | 25.6 | 2 | 20.2 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14.9 | 2.9 | SW | 8.6 | 1.1 | 20.1 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 15.9 | 9.4 | N | 24.8 | 2.4 | 19.5 | 993.4 |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 16.2 | 5 | NE | 13.7 | 1.2 | 19.4 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.1 | 18 | E | 28.1 | 1.8 | 19.1 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 14.1 | · | · | · | 0.5 | 19 | · |
| Bragança | 1200575 | 41.804, -6.743 | 12.6 | 13.3 | SE | 19.1 | 3.4 | 19 | 996.4 |
| Arouca | 1210669 | 40.933, -8.250 | 15.6 | 1.1 | W | 7.6 | 2.8 | 18.8 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 16.4 | 7.6 | N | 8.3 | 0.3 | 18.5 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 12 | 42.1 | SE | 49.3 | 3.3 | 18.1 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 16.1 | 4.7 | N | 11.2 | 1.1 | 18 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 13 | 9 | SE | 23.8 | 2.8 | 17.6 | 995.9 |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 10.9 | 5.8 | S | 30.2 | 0 | 16.9 | 992.3 |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 12 | 8.3 | N | 20.2 | 3 | 16.9 | 995.2 |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 20.1 | · | · | · | 3.3 | 16.2 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.4 | 3.2 | S | 10.4 | 1.3 | 16.1 | 993.8 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 14.6 | 4.3 | N | 13.3 | 2.3 | 15.7 | 994 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 15.9 | 4.3 | NE | 6.8 | 1 | 15.5 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 15.7 | 19.4 | NE | 29.2 | 0 | 15.4 | · |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 14.3 | 2.5 | N | 15.1 | 1.4 | 15.2 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 17 | 6.8 | NE | 10.4 | 0.3 | 15.1 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 16.9 | 9.4 | NE | 17.6 | 0.2 | 15.1 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.7 | 7.6 | NE | 13.7 | 1.5 | 14.8 | 993 |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 16.1 | 12.6 | N | 15.5 | 0.4 | 14.5 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 9.8 | 19.4 | E | 53.3 | 1 | 14.2 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 15.5 | 12.6 | N | 18 | 0.2 | 13.6 | 991.2 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 19.5 | 13 | W | 23.4 | 5.6 | 13.4 | · |
| Anadia | 1210705 | 40.439, -8.440 | 16.5 | 6.1 | N | 12.2 | 0.5 | 12.7 | · |
| Nelas | 1210685 | 40.517, -7.850 | 14.2 | 10.1 | N | 13 | 0 | 12.4 | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 13 | 0.4 | 9.6 | 1011 |
| Coruche | 1210744 | 38.941, -8.511 | 19.6 | 26.3 | SW | 26.3 | 0 | 9 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 17.6 | 17.3 | S | 26.6 | 0 | 7.9 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 15.6 | 6.5 | E | 23.8 | 2.2 | 7.7 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12.5 | 12.2 | E | 33.5 | 0 | 5.4 | · |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 19.1 | SE | 29.2 | 0.9 | 1.4 | 994 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 18 | 16.6 | S | 23 | 0.1 | 0.9 | 989.8 |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 13.7 | 0 | 0 | 1008.8 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 18.5 | 14 | S | 32 | 0 | 0 | 991.2 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 19 | 14.4 | S | 19.4 | · | · | 990.1 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.5 | 2.9 | N | 16.6 | · | · | 994 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 12.9 | 12.2 | N | 29.2 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.2 | 7.2 | NE | 18.7 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.4 | 2.9 | NE | 11.9 | · | · | 994.7 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 14.3 | 6.1 | N | 15.8 | · | · | 993.9 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.4 | 3.2 | NE | 6.1 | · | · | 994.2 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15.4 | 3.6 | W | 11.9 | · | · | 993.7 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.4 | 7.2 | N | 23.4 | · | · | 992.8 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.7 | 4.3 | NW | 11.2 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.8 | 0 | SE | 33.1 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 19.1 | 25.6 | SE | 46.4 | · | · | 992 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 18.8 | 19.1 | S | 37.1 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.4 | 5.4 | SE | 27.4 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 8.3 | E | 20.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 13.6 | 10.4 | SW | 93.2 | 0 | 495.3 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 20.2 | · | · | · | 0 | 258.1 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 15.8 | 3.2 | SW | 47.9 | 0 | 256.7 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 15.8 | · | · | · | 0 | 255.7 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 9.6 | · | · | · | 0 | 255.4 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 20.4 | 4 | SE | 14.4 | 0 | 180.1 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 22.9 | 16.9 | NW | 76 | 0 | 120.9 | 1005.7 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 22.4 | 28.1 | SW | 44.3 | 0 | 81.6 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 17.1 | · | · | · | 0 | 80.5 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 20.7 | · | · | · | 0 | 76.3 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 20.5 | 40 | N | 83.5 | 0 | 72.1 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 21.2 | · | · | · | 0 | 67.5 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 18.7 | 26.3 | W | 39.2 | 0 | 67.2 | 1006.2 |
| Funchal | 1200522 | 32.648, -16.888 | 23.9 | 9 | W | 25.2 | 0 | 65.2 | 1005.6 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 19.5 | 11.9 | NE | 23 | 0 | 61.8 | 1004.8 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 22.6 | 6.8 | NE | 43.9 | 0 | 57.8 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 22.8 | · | · | · | 0 | 39.1 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 20.9 | 32.8 | NW | 55.1 | 0 | 23.3 | 1005.9 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.3 | 34.6 | NW | 96.8 | 0 | 0.3 | 1007.6 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 12.3 | 29.9 | NW | 55.4 | 3 | 16.5 | 1007.5 |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 16 | 4 | SE | 11.2 | 0.2 | 12 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 14.1 | 15.1 | NW | 17.3 | 0 | 8.2 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.5 | 12.6 | NW | 20.9 | 0.3 | 8 | · |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 11.5 | 13.7 | W | 18 | 0 | 7.9 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 11 | · | S | · | 0 | 6.5 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 15.9 | 14.4 | W | 19.8 | 0.2 | 5.7 | · |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 11.4 | 9.7 | SW | 13.3 | 0 | 4.4 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 18.4 | 16.6 | W | 23 | 0 | 4.1 | 1008.3 |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 17.4 | 10.8 | N | 20.5 | 0 | 4.1 | 1009.5 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12.1 | 6.5 | W | 7.9 | 0.1 | 4.1 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 19.1 | 11.5 | NW | 16.6 | 0 | 4 | 1008.7 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 14.3 | 16.6 | NW | 25.2 | 0.1 | 3.5 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 14.4 | 13.3 | SE | 16.2 | 0 | 3.4 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.3 | 23 | N | 26.6 | 0.1 | 2.6 | · |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 17.7 | 28.4 | NW | 36 | 0.1 | 2.2 | 1007.4 |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 17.4 | 21.2 | NW | 32.4 | 0 | 2 | 1007.9 |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 18.2 | 13.7 | W | 19.1 | 0 | 1.1 | 1008.5 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 17.7 | 24.5 | NW | 26.3 | 0 | 1 | 1009 |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 18.8 | 9.7 | NW | 11.9 | 0.2 | 0.8 | · |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 18.8 | 11.9 | W | 15.5 | 0 | 0.7 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 19.9 | 6.1 | NE | 19.4 | 0 | 0.5 | 1009 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 16.6 | 14.4 | W | 23 | 0.3 | 0.5 | 1008 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 18 | 16.6 | N | 23.4 | 0 | 0.4 | 1010 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.8 | 24.8 | E | 25.6 | 0.1 | 0.1 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 18.2 | 14 | W | 21.6 | 0 | 0 | · |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 19.6 | 35.3 | NW | 39.2 | 0 | 0 | 1008.1 |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 17:51 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
