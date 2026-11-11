---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 14:52 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 203 reported at least one value in the 24 hours read (2026-11-10 15:00 to 2026-11-11 14:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 17.3 | 34.2 | SW | 34.2 | 5.6 | 110.9 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 19.4 | 37.1 | SW | 39.2 | 1.5 | 102.6 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 18.6 | 23 | SW | 23 | 5.5 | 102.3 | 990.7 |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 18.2 | 41 | SW | 41 | 4.5 | 101.5 | 989.2 |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 15.5 | 13.3 | S | 18.4 | 4.9 | 98.1 | · |
| Mora | 1210826 | 38.941, -8.164 | 16 | 7.2 | SE | 21.6 | 0.5 | 90 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 20.4 | 40.3 | SW | 43.2 | 1 | 87.7 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 18.8 | 21.2 | SW | 21.2 | 1.2 | 86.9 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 19.9 | 43.9 | S | 43.9 | 1.1 | 86.5 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 17.5 | 22 | S | 27.7 | 4.3 | 82 | · |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 17.5 | 32.8 | S | 32.8 | 6.8 | 73 | 989.3 |
| Portalegre | 1200571 | 39.295, -7.420 | 12.6 | 32.8 | SE | 32.8 | 7.7 | 68.9 | 994.8 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 17.9 | 24.5 | SW | 24.5 | 1.4 | 67.8 | · |
| Pegões | 1210767 | 38.651, -8.635 | 16.9 | 14.4 | S | 18.7 | 3.5 | 66.8 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 18.2 | 31.3 | SW | 31.3 | 1.6 | 64.7 | 989.6 |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 15.2 | 18 | E | 21.2 | 10.4 | 64.7 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 15.7 | 12.6 | NE | 19.8 | 13.7 | 63.3 | 992 |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 19.7 | 24.5 | S | 24.8 | 1.3 | 56.1 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 14 | 20.2 | E | 26.3 | 7.5 | 55.8 | 996.9 |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 14.7 | 15.5 | E | 31 | 2.7 | 55.7 | 990.2 |
| Zebreira | 1210803 | 39.867, -7.017 | 14.1 | 19.1 | E | 26.3 | 3 | 55.5 | · |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 16.4 | 29.9 | SE | 29.9 | 1.3 | 55.2 | 993.4 |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 13.9 | 14 | E | 31.7 | 8.3 | 52.6 | · |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 17.8 | 19.1 | S | 35.6 | 2.4 | 51.2 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 19.4 | 23 | S | 31.7 | 1.1 | 50.6 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12.2 | 17.3 | S | 23.4 | 5.7 | 50.5 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 15.6 | 9 | E | 22.3 | 8.4 | 50.4 | 992.8 |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16 | 7.6 | N | 31.7 | 4.8 | 50.2 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 17 | 31.7 | SE | 37.4 | 0.5 | 50 | 993.4 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 14 | 10.8 | S | 16.2 | 10.4 | 48.4 | · |
| Rio Maior | 1210729 | 39.350, -8.933 | 15.9 | 13.3 | E | 13.7 | 9.3 | 48.4 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 15.7 | 31.3 | SE | 31.3 | 5.4 | 47.8 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.6 | 23.8 | S | 35.3 | 10.1 | 47.6 | 994.6 |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.7 | 4 | E | 16.9 | 0.9 | 44.7 | 997.1 |
| Aljezur | 1210789 | 37.317, -8.800 | 20.7 | 19.4 | SW | 21.2 | 1.9 | 44.5 | · |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 15.9 | 56.2 | S | 62.6 | 6.8 | 44.1 | 995 |
| Fundão | 1210698 | 40.141, -7.554 | 13.7 | 15.5 | SE | 20.5 | 7.1 | 43.3 | · |
| Fóia | 1210790 | 37.314, -8.596 | 14.7 | 58.7 | S | 72.7 | 14.7 | 43 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.7 | 50.4 | SW | 54.4 | 11 | 42.3 | · |
| Beja | 1200562 | 38.025, -7.867 | 17.1 | 32.4 | S | 32.4 | 1.5 | 41.7 | 994.3 |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 18.6 | 64.8 | S | 68.4 | 1.2 | 41.2 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 14.2 | 7.9 | S | 8.6 | 8.3 | 40.8 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 19.5 | 30.2 | S | 34.9 | 6.5 | 40.6 | 996.4 |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16 | 23.8 | E | 23.8 | 7.5 | 40.4 | · |
| Sines | 1200541 | 37.955, -8.838 | 19.2 | 43.6 | SW | 57.2 | 0.5 | 39.5 | 990.8 |
| Albufeira | 1210874 | 37.093, -8.262 | 18.5 | 31.7 | S | 39.2 | 6.6 | 38.1 | · |
| Alvega | 1210812 | 39.467, -8.050 | 15.8 | 16.2 | E | 16.2 | 5.7 | 37 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 11 | 8.3 | E | 19.1 | 1.4 | 36.1 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 18.5 | 22.7 | S | 31.3 | 3.3 | 36.1 | · |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 17.6 | 24.8 | SE | 31.3 | 6.3 | 35.8 | 996.2 |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.8 | 15.8 | E | 20.9 | 1.4 | 35.5 | 997 |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.9 | 8.3 | NE | 20.2 | 10.1 | 34.6 | · |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.6 | 20.5 | SE | 21.2 | 3.1 | 34.6 | 995.1 |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 15.8 | · | · | · | 2.3 | 34.4 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 17.3 | S | 23.4 | 6.4 | 33.2 | 997.1 |
| Amareleja | 1210851 | 38.201, -7.226 | 17.2 | 28.8 | SE | 28.8 | 3.2 | 32.9 | 995.6 |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 17.1 | 38.9 | S | 42.8 | 0.6 | 32.1 | · |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 13 | 6.5 | NE | 16.2 | 2.4 | 31.5 | · |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 19.1 | 36.7 | S | 38.5 | 5.8 | 31.5 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 15.3 | 6.1 | E | 20.5 | 1.9 | 30.9 | 996.2 |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 12.7 | 10.8 | NE | 31.3 | 4.2 | 30.3 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 19.8 | NE | 34.6 | 3.1 | 30.1 | 991.5 |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 11.9 | 34.2 | SE | 38.2 | 2.5 | 30 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 13.3 | 10.1 | E | 22 | 1.1 | 29.9 | 996.7 |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 12.2 | 7.2 | E | 17.3 | 2.5 | 29.5 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 20.2 | 0.7 | 28.3 | 1008.1 |
| Cabril | 1210619 | 41.717, -8.017 | 13.5 | 2.5 | NE | 13 | 0.8 | 28 | · |
| Guarda | 1210683 | 40.533, -7.267 | 10.9 | 29.9 | SE | 29.9 | 8 | 27.9 | 997 |
| Elvas | 1210835 | 38.891, -7.140 | 14.8 | 16.9 | SE | 23.8 | 6.9 | 26.4 | · |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.5 | 7.2 | SW | 20.2 | 1.4 | 26.1 | 997 |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 45 | SE | 51.8 | 1.3 | 25.5 | · |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 13.9 | 10.4 | E | 20.5 | 2.7 | 25.3 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 15.1 | 18 | NE | 21.6 | 1.1 | 25.2 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14.7 | 2.5 | N | 9 | 1.7 | 25.1 | · |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 16.2 | 6.8 | NE | 16.2 | 0.9 | 24.5 | 996.5 |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16 | · | · | · | 1.8 | 24.5 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 16.4 | 4.3 | NE | 17.6 | 0.7 | 24.4 | 996.5 |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.8 | 15.5 | E | 26.3 | 3.5 | 24.2 | 993.1 |
| Ansião | 1210716 | 39.900, -8.400 | 14.4 | 14 | SE | 17.6 | 4.8 | 23 | · |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 15.5 | SE | 22.3 | 1.9 | 22.8 | · |
| Luzim | 1210657 | 41.146, -8.249 | 13.6 | 6.5 | E | 14 | 2.2 | 22.6 | · |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.9 | 9.4 | E | 20.5 | 1.9 | 22.6 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 16 | 13 | NE | 16.6 | 1.2 | 22.2 | · |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 17.2 | 12.2 | NE | 13.7 | 1.6 | 22.1 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14.3 | 2.9 | W | 22.7 | 5.2 | 21.3 | 996.7 |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 15.3 | 5.8 | NE | 23.4 | 2.5 | 20.7 | · |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 25.2 | 5.2 | 20.7 | 1011 |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 12 | 42.1 | SE | 49.3 | 3.3 | 20 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 16.1 | 10.8 | E | 11.9 | 1 | 19.7 | · |
| Tavira | 1210883 | 37.122, -7.621 | 19 | 37.8 | S | 40 | 4.8 | 19.6 | 998 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 19.6 | 36 | S | 41 | 7.8 | 19.6 | 997.1 |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.9 | 7.9 | NE | 15.1 | 1 | 19.5 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 14.3 | · | · | · | 1.2 | 19.3 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.9 | 5.4 | SE | 10.1 | 3.7 | 19.3 | · |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 13.4 | 0 | SE | 18.4 | 0.9 | 19.1 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 14.4 | 6.5 | SE | 25.6 | 4.3 | 19 | 997.9 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.6 | 3.2 | NE | 15.8 | 0.4 | 18.9 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 13.5 | 2.2 | SE | 14.4 | 2.9 | 18.6 | 997.4 |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 12.4 | 16.9 | SE | 41 | 2.8 | 18.3 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.3 | 11.2 | NE | 31 | 2.1 | 18 | · |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 10.4 | E | 25.6 | 1 | 17.8 | 996.3 |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 11.5 | 5.8 | NW | 30.2 | 7.3 | 17.8 | 996.5 |
| Arouca | 1210669 | 40.933, -8.250 | 15.7 | 4.7 | E | 14.4 | 0.3 | 17.5 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 12.4 | 9.7 | E | 25.6 | 1.5 | 17.4 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.1 | 15.5 | E | 30.6 | 3.7 | 17.3 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 15.6 | 5.8 | NE | 5.8 | 1.5 | 17.3 | · |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 12.3 | 9 | SE | 20.2 | 0.6 | 17.1 | 997.1 |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.2 | 11.5 | E | 24.8 | 1.5 | 17.1 | 995.7 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.8 | · | · | · | 0.2 | 17 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 16.5 | 10.1 | E | 13 | 0.2 | 15.8 | 995.9 |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 17.2 | 4.3 | NE | 16.2 | 1.3 | 15.5 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 14.2 | 3.6 | N | 11.2 | 2.8 | 15.4 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 17.4 | 10.8 | E | 25.6 | 0.6 | 15 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 16.1 | 9.7 | E | 43.6 | 0.4 | 14.7 | · |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.9 | 26.6 | SE | 34.9 | 1.3 | 14.4 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 13.2 | 3.2 | E | 23.8 | 2.1 | 13.9 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.3 | 13.3 | S | 53.3 | 1.6 | 13.5 | · |
| Anadia | 1210705 | 40.439, -8.440 | 17 | 12.2 | E | 12.2 | 1.3 | 13.5 | · |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 13.1 | 6.5 | E | 17.6 | 1.2 | 13.4 | 998.3 |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 16.7 | 16.9 | SE | 23.4 | 5.6 | 13.4 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 17.2 | 7.9 | E | 27.4 | 1.6 | 13.3 | · |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 17.3 | 8.3 | NE | 12.6 | 0.5 | 12.6 | · |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 19.5 | 18.4 | SE | 28.4 | 4.6 | 12.2 | 997.1 |
| Nelas | 1210685 | 40.517, -7.850 | 14.3 | 4.3 | NE | 25.2 | 1 | 12.2 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.9 | 5.8 | E | 27 | 0.3 | 11.9 | 995.2 |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16.6 | 2.9 | NE | 10.4 | 1.2 | 11.7 | 996.2 |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.7 | 6.1 | NE | 19.8 | 0.6 | 11.6 | 994.4 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 15.4 | 7.9 | NW | 13.3 | 0.9 | 11.3 | 997.2 |
| Estremoz | 1210837 | 38.867, -7.517 | 14.7 | 23 | SE | 25.9 | 0 | 11.2 | · |
| Mirandela | 1210632 | 41.515, -7.191 | 15.4 | 3.2 | N | 20.2 | 1.6 | 10.8 | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 15.1 | 0.4 | 10.1 | 1011 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 15.8 | 6.8 | N | 13 | 2.2 | 9.8 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 16 | 2.2 | NE | 23.8 | 0.6 | 9.2 | · |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 13.2 | 4.3 | SE | 23.8 | 0.9 | 9.1 | 999 |
| Coruche | 1210744 | 38.941, -8.511 | 17 | 25.9 | S | 26.6 | 0 | 9 | · |
| Bragança | 1200575 | 41.804, -6.743 | 12.8 | 11.5 | SE | 20.9 | 1.2 | 8.7 | 999.5 |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 19.1 | · | · | · | 2.6 | 6.7 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 13.9 | 14.8 | SE | 33.5 | 0 | 6.6 | · |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.3 | 22.3 | SE | 23 | 0.1 | 1.5 | 992.3 |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 22 | 0 | 0.1 | 1008.8 |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 16.9 | SE | 36.7 | 0 | 0 | 995.4 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 17 | 30.2 | S | 35.3 | 0 | 0 | 993.7 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 15.7 | 18.7 | E | 28.1 | · | · | 993.7 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.8 | 3.2 | NE | 17.6 | · | · | 996.1 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 13 | 18.7 | N | 31.7 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.3 | 18.7 | E | 18.7 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.2 | 6.1 | SE | 11.9 | · | · | 996.7 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.9 | 11.5 | SE | 15.8 | · | · | 995.8 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15.5 | 1.4 | NE | 10.4 | · | · | 996.6 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Guimarães | 1210625 | 41.429, -8.318 | 15.6 | 0 | S | 11.9 | · | · | 996.4 |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.7 | 14 | E | 29.5 | · | · | 995 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.6 | 5.4 | NE | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 9.4 | 33.1 | SE | 33.1 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 18.9 | 46.4 | E | 46.4 | · | · | 995.5 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 17.4 | 37.1 | S | 37.1 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.7 | 7.2 | SE | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 4.7 | N | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 14.5 | 6.5 | N | 93.2 | 0 | 498.8 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 11.1 | · | · | · | 0 | 261.9 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 19.2 | · | · | · | 0.1 | 261.3 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 16.7 | 5.8 | SW | 47.9 | 0 | 259.1 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 17 | · | · | · | 0 | 257.7 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 23 | 5 | S | 14.4 | 0 | 181 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 22.8 | 53.3 | NW | 76 | 0 | 121.4 | 1002.9 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 23.3 | 23.4 | SW | 44.3 | 0 | 82.3 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 16.7 | · | · | · | 1.5 | 80.5 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 22.7 | · | · | · | 0 | 76.7 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 19.8 | 47.2 | N | 83.5 | 0 | 72.5 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 21.4 | · | · | · | 0 | 68 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 18.3 | 22 | W | 39.2 | 0.1 | 67.2 | 1004.4 |
| Funchal | 1200522 | 32.648, -16.888 | 24.3 | 9.7 | SE | 25.2 | 0 | 65.2 | 1003.3 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 19 | 10.8 | E | 23 | 0 | 62.3 | 1002.7 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 23.4 | 10.4 | W | 43.9 | 0.1 | 57.8 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 24.1 | · | · | · | 0 | 39.1 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 20.7 | 27.7 | NW | 55.1 | 0 | 23.3 | 1004 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.7 | 58 | W | 96.8 | 0 | 0.3 | 1005.2 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 16.6 | 7.2 | SE | 11.2 | 0.3 | 10.9 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 12.3 | 50 | NW | 55.4 | 0.1 | 10.1 | 1007 |
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 11 | 18 | W | 18 | 0 | 8.6 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 14.4 | 14 | NW | 17.3 | 0 | 8.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 11.2 | · | SE | · | 0.3 | 7.2 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 17.5 | 15.1 | NW | 20.9 | 0.5 | 5.9 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 16.2 | 11.2 | NW | 19.8 | 0 | 5.4 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 17.4 | 14.4 | NW | 22 | 0 | 5.1 | 1010.1 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 12.1 | 6.5 | SW | 24.8 | 0 | 4.5 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 18.6 | 23 | NW | 24.1 | 0 | 4.5 | 1008.4 |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 13.5 | 9.4 | SW | 16.2 | 0 | 4.1 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 18.8 | 16.6 | NW | 16.6 | 0 | 4 | 1009.1 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12.1 | 7.6 | SW | 7.9 | 0.4 | 3.6 | · |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 14.5 | 20.2 | NW | 25.2 | 0.3 | 3.2 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.7 | 20.9 | NW | 26.6 | 0.1 | 2.4 | · |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 16.8 | 26.6 | W | 32.4 | 0.1 | 1.7 | 1008 |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 18.6 | 15.8 | NW | 21.2 | 0 | 1.5 | 1008.9 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 19.3 | 28.8 | NW | 36 | 0 | 1.2 | 1007 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 17.3 | 21.6 | NW | 26.3 | 0 | 1 | 1009.8 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 18.7 | 13.7 | W | 15.5 | 0 | 0.6 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 18.4 | 7.2 | N | 19.4 | 0 | 0.5 | 1009.4 |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 18.1 | 16.6 | N | 23.4 | 0 | 0.4 | 1010.6 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 18.5 | 17.3 | W | 23 | 0 | 0.3 | 1007.7 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.8 | 24.8 | E | 25.6 | 0.1 | 0.1 | · |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 20.4 | 9 | N | 11.9 | 0 | 0.1 | · |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 20 | 39.2 | NW | 39.2 | 0 | 0.1 | 1007.7 |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 18.6 | 15.8 | NW | 21.6 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 14:51 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
