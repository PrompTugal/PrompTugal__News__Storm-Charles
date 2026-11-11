---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 05:49 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 204 reported at least one value in the 24 hours read (2026-11-10 06:00 to 2026-11-11 05:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Zebreira | 1210803 | 39.867, -7.017 | 15 | 6.1 | S | 26.3 | 2.5 | 91.4 | · |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 14.5 | 4.7 | SE | 15.1 | 3.3 | 87.7 | · |
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 16.7 | 10.1 | SW | 33.8 | 0.1 | 68 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 19.1 | 12.2 | S | 39.6 | 0 | 61.1 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 19.5 | 12.6 | SW | 28.4 | 0 | 59.4 | · |
| Mora | 1210826 | 38.941, -8.164 | 15.8 | 11.9 | S | 26.6 | 10.7 | 56.1 | · |
| Alvega | 1210812 | 39.467, -8.050 | 16.6 | 4.3 | S | 20.2 | 2.2 | 54.9 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 17.5 | 3.6 | SW | 23.8 | 0.4 | 53 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 18.2 | 20.5 | SW | 39.2 | 1.2 | 52.6 | · |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 11.4 | 12.2 | S | 29.2 | 1 | 52.3 | · |
| Setúbal | 1210770 | 38.548, -8.891 | 16.8 | 5.8 | S | 16.2 | 0 | 50.2 | 1004.5 |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 18.4 | 9.7 | SE | 24.5 | 0.1 | 48.6 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 15.2 | 13.7 | S | 26.3 | 1.4 | 45.6 | 1005.5 |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 17.4 | 9.7 | S | 37.1 | 2 | 43 | 1003.7 |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 16.2 | 6.1 | SE | 23 | 1.4 | 42.9 | 1005.4 |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 17.2 | 8.3 | SW | 29.9 | 0.2 | 41.6 | 1003.8 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 16.8 | 5.8 | SW | 22 | 0.2 | 40 | · |
| Pegões | 1210767 | 38.651, -8.635 | 16.2 | 4.7 | SE | 25.9 | 2.1 | 38 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 14.2 | 13 | SE | 26.6 | 1.6 | 37.2 | 1006.7 |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 16 | 10.1 | SW | 37.4 | 1.7 | 34.8 | 1006.2 |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 14.9 | 3.2 | S | 31.7 | 0.7 | 33.8 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 20.1 | 14 | S | 21.2 | 0.7 | 33.5 | 1008.1 |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 14 | 4.7 | SE | 22.3 | 0.3 | 31.2 | · |
| Fundão | 1210698 | 40.141, -7.554 | 13.7 | 2.5 | N | 20.5 | 0.2 | 31 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 16.5 | 6.1 | S | 13.7 | 0.5 | 31 | · |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 12.3 | 12.2 | SE | 31.3 | 1.6 | 30.7 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 14 | 6.5 | SW | 8.6 | 0.5 | 29.7 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 16.1 | 4.7 | S | 25.6 | 7.1 | 28.8 | · |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 12.6 | 9 | SW | 16.2 | 2 | 28.6 | · |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 13.1 | 9.7 | S | 20.9 | 0.3 | 28.6 | 1005.3 |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 17.2 | 7.9 | S | 35.6 | 4.6 | 26.9 | · |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 16.4 | 8.6 | SW | 20.2 | 2.6 | 26.4 | 1006.6 |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 12.4 | 1.4 | SW | 21.2 | 0 | 24.6 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 13.4 | 11.9 | SW | 22 | 0.2 | 24.6 | 1005 |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 12.9 | 4 | SE | 20.5 | 0.1 | 24.1 | · |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 16.4 | 13.7 | S | 29.5 | 0 | 22.2 | · |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 16.3 | · | · | · | 3.2 | 22.1 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 18.8 | 11.2 | S | 25.2 | 0 | 21.8 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 15.4 | 7.9 | SW | 16.9 | 0.1 | 21.6 | 1003.9 |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 15.8 | 11.5 | SW | 34.6 | 1.9 | 21.5 | 1003.9 |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 31.3 | 5.2 | 21.1 | 1011 |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 15.9 | 40.7 | S | 59.8 | 0.1 | 20.1 | 1006.8 |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 18.1 | 5 | SW | 24.8 | 0.1 | 19.9 | · |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 14.6 | 7.2 | S | 21.2 | 0.4 | 19.4 | 1005.6 |
| Alvalade | 1210783 | 37.947, -8.395 | 18.2 | 7.2 | SE | 27.7 | 0 | 19.2 | · |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 16.7 | 10.4 | S | 29.9 | 2.6 | 19.1 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 10.8 | 10.1 | SW | 19.1 | 0.3 | 18.2 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 13.9 | 2.2 | NW | 25.6 | 2 | 18.2 | 1005.4 |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.9 | 7.9 | SW | 17.6 | 1.1 | 18.1 | · |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.1 | 2.5 | NE | 11.9 | 1.9 | 17.9 | · |
| Mogadouro | 1210637 | 41.333, -6.733 | 12.6 | 24.5 | S | 32.4 | 0.2 | 17.7 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 11.6 | 22.3 | SE | 50.4 | 0.1 | 17.4 | · |
| Coruche | 1210744 | 38.941, -8.511 | 16.8 | 4 | E | 35.6 | 0.8 | 17.4 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 16.9 | 14 | S | 28.1 | 0 | 16.9 | · |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 27 | S | 33.5 | 2.1 | 15.5 | 1003.8 |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 12.2 | 14.8 | SW | 41 | 0.1 | 15.4 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 13.2 | 9.7 | SW | 31 | 0.2 | 14.9 | · |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 14.3 | · | · | · | 0.2 | 14.8 | · |
| Guarda | 1210683 | 40.533, -7.267 | 10.8 | 15.8 | S | 19.8 | 0.2 | 14.3 | 1006 |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.4 | 11.9 | S | 56.9 | 2.1 | 13.6 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 13.6 | 1.8 | S | 9 | 0.2 | 13.3 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16.6 | · | · | · | 1.9 | 13.3 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 16 | 5.8 | W | 14.4 | 1.5 | 13.2 | 1004.2 |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 17.9 | 10.8 | S | 29.9 | 0.4 | 13.2 | 1007 |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 15 | 5.4 | NE | 16.2 | 0.3 | 13.1 | · |
| Fóia | 1210790 | 37.314, -8.596 | 14.6 | 44.6 | SW | 49 | 0.1 | 12.9 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 15.8 | 9.4 | S | 19.4 | 0 | 12.8 | 1002.5 |
| Alcobaça | 1210726 | 39.517, -8.967 | 16.9 | 5 | S | 13.3 | 0.6 | 12.6 | · |
| Beja | 1200562 | 38.025, -7.867 | 17.4 | 11.9 | SE | 29.2 | 0.2 | 12.6 | 1006.3 |
| Cabril | 1210619 | 41.717, -8.017 | 13.2 | 4.7 | SW | 13 | 0 | 12.2 | · |
| Estremoz | 1210837 | 38.867, -7.517 | 15.6 | 16.2 | SW | 26.6 | 1.2 | 12 | · |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 11.5 | 17.6 | S | 20.2 | 0.2 | 11.9 | 1003.2 |
| Nelas | 1210685 | 40.517, -7.850 | 13.9 | 0 | W | 25.2 | 0 | 11.7 | · |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 17 | · | · | · | 0 | 11.4 | · |
| Sines | 1200541 | 37.955, -8.838 | 18.7 | 21.6 | S | 29.5 | 0 | 11.4 | 1004.9 |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 16.9 | 12.6 | S | 24.1 | 0.1 | 10.5 | 1003.2 |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.8 | 10.8 | SW | 20.2 | 0 | 10.2 | 1003.6 |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 18.4 | 0.4 | 10.2 | 1011 |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 24.5 | S | 36 | 0 | 9.9 | 1003.2 |
| Amareleja | 1210851 | 38.201, -7.226 | 18.5 | 15.1 | S | 31 | 0 | 9.5 | 1006.3 |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 16.1 | 9.7 | S | 20.5 | 0.3 | 9.3 | 1003 |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 14.6 | 3.2 | NE | 22.7 | 0.1 | 8.6 | 1005.3 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.8 | 6.8 | SE | 15.8 | 0 | 8.5 | · |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.5 | 22.3 | S | 34.6 | 0 | 8.2 | · |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 14.9 | 9.7 | SE | 16.9 | 0.5 | 8.2 | · |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 18.7 | 10.8 | S | 24.5 | 0 | 8.2 | · |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 16.3 | 15.8 | S | 27.7 | 3.6 | 8.1 | 1004.9 |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 33.5 | S | 48.6 | 0.3 | 8.1 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 16.7 | 9.7 | S | 15.5 | 0 | 8 | 1002.5 |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 27.4 | 0 | 7.8 | 1008.8 |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 5 | NE | 22.3 | 0.1 | 7.7 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 12.2 | 18 | S | 38.2 | 0.3 | 7.6 | · |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 11.7 | 2.9 | SW | 17.6 | 0 | 7.5 | 1006 |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 15.9 | 19.1 | SE | 43.6 | 0.3 | 7.5 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 17.5 | 7.9 | S | 16.2 | 0 | 7.1 | · |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 16.2 | 2.5 | SE | 15.8 | 0.4 | 6.8 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 15.8 | 4.3 | SE | 17.3 | 0.6 | 6.7 | · |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.2 | 17.3 | S | 19.8 | 0.5 | 6.7 | 1004.1 |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.7 | 7.9 | SE | 23.4 | 0.7 | 6.7 | · |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 12.2 | 6.8 | S | 11.2 | 0.7 | 6.5 | · |
| S. Gens | 1210649 | 41.184, -8.644 | 15.7 | 2.9 | S | 7.2 | 2.5 | 6.4 | · |
| Ansião | 1210716 | 39.900, -8.400 | 14.8 | 10.1 | SE | 17.6 | 0.6 | 6.4 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 13.2 | 13 | S | 23.8 | 0.5 | 6.3 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.5 | 19.4 | SW | 54 | 1.1 | 6.2 | · |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.7 | 2.2 | SW | 20.5 | 0.4 | 6.1 | · |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 20.3 | 10.4 | SE | 28.1 | 0.4 | 6 | 1007.5 |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 15.1 | 3.2 | NE | 23.4 | 0.1 | 5.9 | · |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 16.8 | 10.4 | SE | 26.3 | 0.5 | 5.8 | 1004.2 |
| Arouca | 1210669 | 40.933, -8.250 | 15.4 | 2.2 | NW | 14.4 | 0.5 | 5.5 | · |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 17.3 | 14.8 | SW | 23.8 | 0 | 5.3 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 11.7 | 6.5 | SE | 25.6 | 0 | 5.2 | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | 19.4 | 34.6 | S | 35.3 | 1.2 | 4.9 | 1010.8 |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.4 | 17.3 | S | 34.9 | 1.2 | 4.6 | 1003 |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 17.9 | 5 | W | 12.6 | 0.2 | 4.5 | · |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 12.8 | 20.5 | SW | 30.2 | 0 | 4.3 | 1006.5 |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 20.2 | 15.5 | S | 20.5 | 0.1 | 4.3 | 1007.3 |
| Luzim | 1210657 | 41.146, -8.249 | 14.7 | 7.6 | SW | 14.4 | 0.6 | 4.2 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 13.3 | S | 18 | 0.4 | 4.2 | 1007.6 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 13.5 | 7.6 | S | 18 | 0 | 4.1 | 1004.1 |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 16.7 | 11.9 | SE | 27 | 0.6 | 4.1 | · |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.9 | 19.4 | S | 32.8 | 0.5 | 4.1 | · |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 15.7 | 6.8 | SE | 19.8 | 0.1 | 3.3 | 1005.4 |
| Anadia | 1210705 | 40.439, -8.440 | 16.3 | 2.2 | S | 10.1 | 0.3 | 3.2 | · |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 16.8 | 5.4 | S | 30.2 | 1.1 | 2.7 | · |
| Vila Real | 1200567 | 41.274, -7.717 | 12.6 | 2.2 | SE | 14.4 | 0.3 | 2.5 | 1004.7 |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13 | 3.2 | NW | 11.2 | 0.1 | 1.9 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12.9 | 17.6 | S | 33.5 | 0 | 1.8 | · |
| Aljezur | 1210789 | 37.317, -8.800 | 20.5 | 8.3 | SW | 20.2 | 0.2 | 1.7 | · |
| Tavira | 1210883 | 37.122, -7.621 | 20 | 22.3 | S | 33.5 | 0.3 | 1.6 | 1008.2 |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 11.8 | 4.3 | SE | 23.8 | 0 | 1.6 | 1006.4 |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 16.9 | 10.8 | SE | 28.4 | 0.2 | 1.5 | 1003.9 |
| Albufeira | 1210874 | 37.093, -8.262 | 18.9 | 21.2 | SE | 24.8 | 0.7 | 1.5 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.8 | 18.7 | S | 33.1 | 0.5 | 1.4 | 1005.8 |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 20.6 | 18.7 | S | 27.7 | 0.3 | 1.4 | 1007.4 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 14.5 | 3.6 | SE | 13.3 | 0.5 | 1 | · |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 20.3 | · | · | · | 0 | 0.9 | · |
| Bragança | 1200575 | 41.804, -6.743 | 11.5 | 6.5 | SE | 22.3 | 0 | 0.8 | 1006.7 |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 20.5 | 23.4 | S | 32 | 0 | 0.5 | · |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 29.2 | SW | 42.5 | 0 | 0 | 1003.5 |
| Guimarães | 1210625 | 41.429, -8.318 | 15.6 | 4.3 | NW | 11.9 | 0 | 0 | 1003.4 |
| Mirandela | 1210632 | 41.515, -7.191 | 14.6 | 5 | S | 23.8 | 0 | 0 | · |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 17.3 | 8.6 | SW | 32.8 | 0 | 0 | 1004.2 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 16.2 | 8.6 | SW | 35.3 | 0 | 0 | 1006.5 |
| Elvas | 1210835 | 38.891, -7.140 | 17.2 | 9 | S | 27 | 0 | 0 | · |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 16.8 | 9 | S | 35.6 | · | · | 1005.5 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 18 | 14.4 | S | 18.4 | · | · | 1002.8 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 13.3 | 29.2 | S | 38.5 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 14.1 | 4.3 | S | 11.2 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12.4 | 9.7 | S | 11.9 | · | · | 1003.3 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 14.5 | 13.7 | SE | 16.2 | · | · | 1002.3 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 14.8 | 1.8 | NW | 10.4 | · | · | 1003.4 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 15.5 | 13.7 | S | 38.2 | · | · | 1003 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.1 | 6.1 | SE | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.9 | 2.9 | E | 14 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 19 | 24.1 | E | 32.4 | · | · | 1005.9 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 17.7 | 13 | S | 30.2 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.2 | 12.6 | S | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 9.7 | W | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 14.4 | 62.6 | W | 93.2 | 29.3 | 393.5 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 13.2 | · | · | · | 15 | 214 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 21.9 | · | · | · | 14.2 | 205 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 18.2 | · | · | · | 12.5 | 195.5 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 16.3 | 33.8 | S | 47.2 | 12.2 | 172.2 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 18.8 | 10.4 | SW | 14.4 | 10 | 117.6 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 21.9 | 60.5 | SW | 76 | 4.7 | 73.1 | 997.4 |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 23.2 | · | · | · | 2.6 | 56 | · |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 22 | 13.7 | W | 34.6 | 3.9 | 53.1 | · |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 19.9 | 15.5 | S | 29.2 | 2.3 | 51 | 993.6 |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 18.5 | · | · | · | 4.3 | 50.6 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 19.6 | · | · | · | 4.7 | 50.5 | · |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 20.9 | 59 | SW | 83.5 | 3.3 | 44.9 | · |
| Funchal | 1200522 | 32.648, -16.888 | 21.9 | 15.1 | SW | 22 | 2.9 | 44 | 999.4 |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 20.1 | 33.5 | W | 43.9 | 2.2 | 38.7 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 19.9 | 12.6 | SE | 14 | 2.5 | 33.6 | 996.9 |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 22.1 | · | · | · | 1.2 | 26.4 | · |
| Porto Santo | 1200524 | 33.074, -16.349 | 21.6 | 37.1 | S | 55.1 | 0.1 | 19.1 | 998.1 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.1 | 62.6 | SW | 79.2 | 0 | 0 | 1005 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 10.8 | 12.2 | W | 25.2 | 0.3 | 8.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 11.1 | · | S | · | 0.5 | 7.4 | · |
| São Jorge | 1200510 | 38.660, -28.170 | 15.6 | 16.2 | NW | 24.1 | 1.8 | 4.6 | 1006 |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 10.8 | 8.3 | SE | 32.8 | 0.9 | 4.5 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 13 | 10.4 | E | 16.2 | 0 | 4.4 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 16.3 | 19.8 | W | 20.2 | 0.1 | 4.4 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 12.6 | 15.8 | NW | 17.3 | 0 | 4.2 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 11.4 | 49 | N | 53.3 | 1.8 | 4.2 | 1004.2 |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12 | 5 | W | 7.9 | 0.1 | 3.6 | · |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 14.9 | 8.6 | SW | 10.8 | 0.9 | 2.5 | · |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 15.8 | 18 | NW | 22 | 0 | 2.4 | 1008.1 |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.1 | 17.3 | NW | 17.6 | 1.6 | 2.3 | · |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.2 | 22.3 | N | 31.3 | 0 | 1.7 | · |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 16.6 | 17.6 | NW | 25.2 | 0 | 1.7 | 1006.3 |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 17.1 | 27.7 | NW | 39.6 | 0 | 1.6 | 1005.4 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 16.4 | 22 | NW | 37.1 | 0 | 1 | 1007.8 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 17.3 | 32 | NW | 32.8 | 0 | 0.9 | 1003.8 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.2 | 25.2 | NW | 29.5 | 0.1 | 0.9 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 15.7 | 8.6 | NW | 28.8 | 0 | 0.6 | 1006.9 |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 17 | 13 | NW | 16.2 | 0 | 0.5 | 1006.6 |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 17.6 | 13.3 | NW | 13.3 | 0 | 0.5 | · |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 16.4 | 15.5 | NW | 23.4 | 0 | 0.3 | 1004.7 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 17.8 | 33.1 | NW | 34.9 | 0 | 0.2 | 1004.3 |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 16.7 | 6.1 | NW | 9 | 0 | 0.1 | · |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16.7 | 20.9 | N | 27 | 0 | 0 | 1008.6 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.9 | 18.7 | E | 22.3 | 0 | 0 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 16.3 | 13.3 | W | 16.2 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 05:48 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
