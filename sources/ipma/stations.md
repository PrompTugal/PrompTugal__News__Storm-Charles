---
title: IPMA's stations on a map, with the last 24 hours
summary: IPMA's weather stations drawn from their coordinates, with wind, rain, temperature and pressure for the last 24 hours of IPMA's hourly observations.
mount: <div class="ipma" data-view="map" data-base="./" data-var="r24"><p class="meta">This view is drawn in the browser from the JSON files linked below. Without JavaScript, read the tables on this page.</p></div>
head: <link rel="stylesheet" href="../../app/sources/ipma/ipma.css"><script src="../../app/sources/ipma/ipma.js" defer></script>
---
# IPMA's stations, with the last 24 hours

> Kept by incident.ipma@web-summit.dinis, 11 November 2026, 02:31 UTC

**Not a warning service.** Everything here is IPMA's, shown as IPMA's, with the time we read it; we add no forecast and no advice. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

227 stations in IPMA's list; 204 reported at least one value in the 24 hours read (2026-11-10 02:00 to 2026-11-11 01:00, as IPMA labels the hours). Click a station on the map for its 24 hours. These are **observations by IPMA**. Wind is the hourly mean at 10 m: **IPMA's open data carries no gusts**, and warnings are issued on gusts, so the wind here is not comparable with a warning's figure. "24 h rain" and "24 h highest wind" are computed by us from the hourly values in the file. "·" is IPMA's no-data value (-99.0).

## Mainland

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Zebreira | 1210803 | 39.867, -7.017 | 15.2 | 15.1 | S | 26.3 | 0 | 100.6 | · |
| Lisboa, Tapada da Ajuda | 1210762 | 38.710, -9.183 | 16.7 | 4.7 | W | 23.8 | 8.6 | 81.8 | · |
| Castelo Branco | 1200570 | 39.833, -7.467 | 15.5 | 13.3 | S | 26.3 | 0.3 | 73.8 | 1007.5 |
| Sintra/Tapada do Mouco | 1210752 | 38.782, -9.400 | 13.7 | 5.4 | S | 15.1 | 1.3 | 71.5 | · |
| Alvega | 1210812 | 39.467, -8.050 | 18.6 | 13 | S | 20.2 | 0.5 | 70 | · |
| Lisboa, Relógio | 1210580 | 38.762, -9.125 | 15.9 | 9.4 | SW | 42.8 | 11.8 | 69.1 | · |
| Chamusca / Chouto | 1210735 | 39.270, -8.351 | 18 | 16.2 | SE | 23 | 3.3 | 65.9 | 1007.9 |
| Lisboa, Carnide (CML) | 6215302 | 38.775, -9.185 | 16.3 | 11.9 | SW | 29.9 | 1.5 | 64.7 | 1006.8 |
| Lisboa, Amoreiras (LFCL) | 7240919 | 38.724, -9.165 | 16.5 | 4.7 | W | 25.2 | 6.4 | 61.7 | · |
| Odemira, S.Teotónio | 1210577 | 37.547, -8.729 | 19.3 | 20.5 | S | 39.6 | 2.2 | 61.1 | · |
| Zambujeira | 1210788 | 37.582, -8.743 | 19.5 | 22 | SW | 28.4 | 5.3 | 59.4 | · |
| Oeiras / Vila Fria (CMO) | 6215360 | 38.724, -9.294 | 16.2 | 10.4 | W | 37.1 | 0.4 | 53.7 | 1006.8 |
| Sabugal, Martim Rei | 1210800 | 40.339, -7.037 | 12.5 | 14.4 | SW | 29.2 | 0.3 | 53.5 | · |
| Proença-a-Nova, P.Moitas | 1210806 | 39.733, -7.867 | 15.8 | 13.3 | SW | 31.7 | 0.3 | 53 | · |
| Mértola, Vale Formoso | 1210863 | 37.750, -7.550 | 17.8 | 10.1 | S | 24.5 | 0 | 48.5 | · |
| Aguiar da Beira (CIM) | 6213011 | 40.812, -7.534 | 11.5 | 18 | S | 31.3 | 0.8 | 48.4 | · |
| Cabo Raso | 1210765 | 38.709, -9.485 | 18.1 | 15.8 | SW | 40 | 0.1 | 41.7 | · |
| Covilhã (Aeródromo) | 1210687 | 40.264, -7.482 | 14 | 8.3 | S | 22.3 | 0 | 41.3 | · |
| Portalegre | 1200571 | 39.295, -7.420 | 14.5 | 6.5 | SE | 26.6 | 3.8 | 41.1 | 1009.3 |
| Penalva do Castelo (CIM) | 6213017 | 40.657, -7.697 | 13.1 | 2.5 | NW | 20.5 | 0.5 | 40.7 | · |
| Satão (CIM) | 6213020 | 40.761, -7.720 | 11.8 | 8.3 | SW | 16.2 | 0.4 | 38.9 | · |
| Pampilhosa da Serra, Fajão | 1210686 | 40.146, -7.927 | 12.5 | 32.8 | SW | 50.4 | 0 | 37.8 | · |
| Tomar, Valdonas | 1210724 | 39.600, -8.367 | 17.9 | 11.2 | S | 13.7 | 1.9 | 37.4 | · |
| Aldeia Souto (Q. Lageosa) | 1210690 | 40.354, -7.389 | 14.1 | 5.8 | W | 8.6 | 0.2 | 34.6 | · |
| Mora | 1210826 | 38.941, -8.164 | 17.1 | 9.4 | SW | 26.6 | 8.9 | 34.3 | · |
| Silves - São Marcos da Serra | 1210793 | 37.360, -8.372 | 19.8 | 15.5 | S | 24.5 | 0.1 | 32.8 | 1009.5 |
| Montemor-O-Novo | 1210846 | 38.645, -8.199 | 17.6 | 10.8 | SW | 20.2 | 5.5 | 32.5 | 1009.4 |
| Miranda do Douro | 1210635 | 41.517, -6.283 | 12 | 13.7 | SW | 21.2 | 0 | 32.4 | · |
| Mangualde / Chãs de Tavares  (CIM) | 6213014 | 40.611, -7.608 | 12.9 | 10.4 | SW | 31.3 | 0.4 | 31.1 | · |
| Pegões | 1210767 | 38.651, -8.635 | 18.4 | 9 | SW | 25.9 | 0.9 | 29.1 | · |
| Torres Vedras, Dois Portos | 1210739 | 39.044, -9.179 | 17.3 | 23.8 | SW | 29.9 | 2.2 | 28.7 | · |
| Évora (Aeródromo) | 1200843 | 38.530, -7.892 | 17.4 | 14.8 | S | 37.4 | 0 | 28.4 | 1008.8 |
| Guarda | 1210683 | 40.533, -7.267 | 10.7 | 14.4 | S | 19.8 | 0 | 27.1 | 1008.2 |
| Pedrógão Grande (CMPG) | 6214119 | 39.927, -8.151 | 15.6 | 9.7 | SW | 21.2 | 3.2 | 26.9 | 1007.5 |
| Ansião | 1210716 | 39.900, -8.400 | 16 | 15.5 | S | 17.6 | 0.3 | 26.8 | · |
| Trancoso, Bandarra | 1210666 | 40.783, -7.367 | 11.2 | 12.2 | S | 41 | 0.7 | 25.4 | · |
| Vila Nova de Paiva (CIM) | 6213022 | 40.856, -7.727 | 11.6 | 12.6 | SW | 17.6 | 0 | 25.2 | · |
| Santa Cruz (Aeródromo) | 1210746 | 39.126, -9.379 | 16 | 22 | SW | 34.6 | 3.4 | 25.1 | 1006.6 |
| Mogadouro | 1210637 | 41.333, -6.733 | 12 | 16.9 | S | 47.9 | 0 | 25.1 | · |
| Nelas | 1210685 | 40.517, -7.850 | 14 | 5.4 | W | 25.2 | 1.1 | 23.4 | · |
| Seia/Aeródromo | 1259203 | 40.455, -7.686 | 16.4 | 11.5 | SW | 22.7 | 0 | 22.9 | 1007 |
| Arganil / Aeródromo (CIM) | 6213611 | 40.275, -7.974 | 17.6 | 12.2 | SW | 23.4 | 0 | 21.9 | · |
| Rio Maior | 1210729 | 39.350, -8.933 | 16.6 | 2.2 | N | 11.9 | 1.8 | 21.9 | · |
| Castro Verde, N.Corvo | 1210864 | 37.577, -7.972 | 18.6 | 7.6 | SW | 25.2 | 0 | 21.9 | · |
| Fundão | 1210698 | 40.141, -7.554 | 15.5 | 2.9 | E | 20.5 | 0 | 21.6 | · |
| Moncorvo | 1210654 | 41.183, -7.017 | 13.9 | 15.1 | S | 30.6 | 0 | 21.1 | 1007.1 |
| Odemira - Sabóia | 1210787 | 37.496, -8.501 | 19.5 | 7.9 | SW | 31.3 | 5.2 | 21.1 | 1011 |
| Loulé / Cavalos De Caldeirão | 1210553 | 37.304, -7.953 | 16.1 | 40 | S | 61.9 | 2.6 | 19.4 | 1010.1 |
| Alcácer do Sal, Barrosinha | 1210776 | 38.367, -8.483 | 18.4 | 12.2 | SW | 35.6 | 1.7 | 19.4 | · |
| Viseu (C.Coordenação) | 1200560 | 40.715, -7.896 | 12.4 | 10.1 | S | 20.9 | 0 | 19.3 | 1007.6 |
| Viseu (Cidade) | 1240675 | 40.663, -7.904 | 13.9 | · | · | · | 0.1 | 19.2 | · |
| Avis, Benavila | 1210824 | 39.100, -7.867 | 17.5 | 15.8 | SW | 27.4 | 2.3 | 19.1 | · |
| Mortágua / Aeródromo (CIM) | 6213616 | 40.426, -8.232 | 14.9 | 2.5 | NE | 16.2 | 0.6 | 18.9 | · |
| Terras de Bouro/Barral (CIM) | 6212121 | 41.702, -8.318 | 14.4 | 8.6 | S | 16.9 | 0.1 | 18.7 | 1005.9 |
| Porto, Serra do Pilar | 1240546 | 41.139, -8.602 | 16.2 | · | · | · | 0.4 | 18.7 | · |
| Penacova / Hombres (CIM) | 6213617 | 40.281, -8.199 | · | 8.3 | S | 22.3 | 0 | 18.1 | · |
| Barreiro, Lavradio | 1210766 | 38.674, -9.048 | 19.7 | 10.4 | W | 24.8 | 0 | 17.4 | · |
| Alcochete / Campo Tiro | 5210758 | 38.763, -8.783 | 18.8 | 13.3 | S | 41.8 | 0 | 17.3 | 1008.8 |
| Lousã (Aeródromo) | 1210697 | 40.144, -8.244 | 19.3 | 6.5 | SW | 11.5 | 0 | 17.3 | · |
| Montalegre | 1210611 | 41.823, -7.788 | 10.2 | 12.6 | SW | 19.1 | 5.4 | 16.9 | · |
| Reguengos, S. P. do Corval | 1210840 | 38.485, -7.473 | 16.4 | 13 | S | 29.2 | 0.4 | 16.3 | · |
| Alcobaça | 1210726 | 39.517, -8.967 | 18.2 | 5.8 | S | 13.3 | 1.7 | 15.8 | · |
| Vouzela (CIM) | 6213023 | 40.674, -8.133 | 12.4 | 26.3 | SW | 38.2 | 0 | 15.6 | · |
| Viseu (Aeródromo) | 1200559 | 40.726, -7.887 | 12.9 | 13.7 | SW | 22 | 0 | 15.6 | 1007.4 |
| Arcos De Valdevez - Heliporto (CIM) | 6211216 | 41.831, -8.444 | 14.2 | 11.5 | SW | 20.2 | 0 | 15.3 | 1004.9 |
| Cabo Carvoeiro | 1200531 | 39.380, -9.407 | · | 22.3 | S | 33.5 | 2 | 14.7 | 1006.5 |
| Oliveira do Hospital (CIM) | 6213620 | 40.413, -7.868 | 15.2 | 4.7 | S | 15.8 | 0 | 13.7 | · |
| Soure (CIM) | 6213621 | 40.029, -8.505 | · | 34.9 | S | 48.6 | 0.2 | 13.6 | · |
| Lamas de Mouro, P.Ribeiro | 1210606 | 42.033, -8.183 | 11 | 13 | S | 20.5 | 0 | 13 | 1005.3 |
| Fóia | 1210790 | 37.314, -8.596 | 14.8 | 44.6 | SW | 53.6 | 0.1 | 13 | · |
| Cabo da Roca | 1210750 | 38.782, -9.498 | 16.8 | 26.3 | S | 56.9 | 0.2 | 12.7 | · |
| Alvalade | 1210783 | 37.947, -8.395 | 19.1 | 8.3 | S | 27.7 | 0.2 | 12.7 | · |
| Cabeceiras de Basto | 1210630 | 41.533, -7.967 | 14.4 | 6.8 | W | 9.4 | 2.1 | 12.6 | · |
| Beja | 1200562 | 38.025, -7.867 | 17.3 | 14.8 | S | 29.2 | 0 | 12.5 | 1009.4 |
| Estremoz | 1210837 | 38.867, -7.517 | 16 | 2.5 | S | 26.6 | 0.1 | 12.5 | · |
| V.N.Cerveira (Aeródromo) | 1210604 | 41.967, -8.667 | 16.1 | 11.5 | S | 19.4 | 0 | 12.4 | 1004.1 |
| Alcoutim, Mart.Longo | 1210865 | 37.433, -7.767 | 18 | 10.8 | S | 29.9 | 0.1 | 12.4 | 1010 |
| Viana do Alentejo | 1210847 | 38.332, -8.046 | 17.5 | 18.7 | S | 31 | 0 | 12.1 | · |
| Amares Caldelas (CIM) | 6212122 | 41.668, -8.380 | 15.9 | 5 | S | 14.4 | 5 | 11.6 | 1005 |
| Viana do Castelo | 1240610 | 41.695, -8.829 | 16.1 | · | · | · | 0.1 | 11.4 | · |
| Coimbra, Bencanta | 1210707 | 40.213, -8.455 | 17.5 | 7.9 | S | 16.2 | 0 | 11.4 | · |
| Porto, Massarelos | 1240903 | 41.153, -8.626 | 16.6 | · | · | · | 0.6 | 11.2 | · |
| São Pedro de Moel | 1210721 | 39.764, -9.031 | 17.1 | 29.2 | S | 43.6 | 1.9 | 11.1 | · |
| Cabril | 1210619 | 41.717, -8.017 | 12.3 | 5.4 | SW | 13 | 3.5 | 10.8 | · |
| Moimenta da Beira | 1210663 | 40.983, -7.600 | 13 | 15.8 | SW | 23.8 | 0.8 | 10.8 | · |
| Seia/Senhora do Espinheiro | 1259204 | 40.413, -7.673 | 10.4 | 25.6 | SW | 27 | 0 | 10.6 | 1008.7 |
| Penela / Serra do Espinhal (CIM) | 6213618 | 40.029, -8.335 | 15.6 | 9.4 | SW | 20.5 | 0.2 | 10.5 | · |
| Aljezur - Rogil | 1210791 | 37.373, -8.796 | 19.7 | 11.9 | S | 18.4 | 0.4 | 10.2 | 1011 |
| Braga, Merelim | 1210622 | 41.567, -8.450 | 15.7 | 14 | SE | 24.1 | 0.1 | 10 | 1005.2 |
| Esposende (CIM) | 6212126 | 41.526, -8.780 | · | 17.6 | S | 36 | 2.7 | 9.9 | 1005.1 |
| Carrazêda de Ansiães | 1210644 | 41.233, -7.283 | 11.9 | 5.8 | S | 11.2 | 0 | 9.7 | · |
| Coruche | 1210744 | 38.941, -8.511 | 17.9 | 4 | SW | 35.6 | 0.8 | 9.7 | · |
| Sines | 1200541 | 37.955, -8.838 | 18.6 | 17.6 | S | 33.5 | 0 | 9.6 | 1008.4 |
| Leiria (Aeródromo) | 1210718 | 39.781, -8.818 | 18.1 | 15.1 | S | 26.3 | 0.7 | 9.5 | 1006.5 |
| Amareleja | 1210851 | 38.201, -7.226 | 17.2 | 9 | SE | 31 | 0 | 9.5 | 1009.4 |
| Macedo Cavaleiros, Bagueixe | 1210633 | 41.567, -6.783 | 11.5 | 4 | SW | 26.3 | 0 | 8.9 | 1007.2 |
| Coimbra (Aeródromo) | 1200548 | 40.150, -8.467 | 16.9 | 16.2 | S | 19.8 | 0 | 8.7 | 1006.3 |
| Chaves (Aeródromo) | 1210616 | 41.725, -7.465 | 13.3 | 7.9 | W | 18 | 0 | 8.3 | 1005.7 |
| Vila Nova de Poiares (CIM) | 6213619 | 40.211, -8.242 | 14.5 | 22.3 | S | 34.6 | 0 | 8.2 | · |
| Almada, P.Rainha | 1210773 | 38.617, -9.213 | 18.7 | 10.8 | S | 24.5 | 0 | 8.2 | · |
| Mealhada / Quinta do Vale (CIM) | 6213615 | 40.373, -8.439 | 16.7 | 5.4 | SE | 17.3 | 0.2 | 8.1 | · |
| Vinhais | 1210612 | 41.843, -7.003 | 11.2 | 7.9 | S | 25.6 | 0.2 | 8 | · |
| Viana Castelo, Chafé | 1200551 | 41.649, -8.805 | 15.4 | 8.6 | S | 15.5 | 0 | 8 | 1004.2 |
| Bragança (Aeródromo) | 1200576 | 41.858, -6.708 | 11.2 | 4.7 | SE | 23.8 | 0 | 8 | 1007.8 |
| Paços Ferreira | 1210643 | 41.274, -8.380 | 13.8 | 8.6 | S | 16.9 | 0.6 | 7.7 | · |
| Braga (CIM) | 6212124 | 41.536, -8.425 | 14.6 | 13.7 | S | 20.5 | 0 | 7.5 | 1005.1 |
| Ponte de Lima | 1210615 | 41.750, -8.567 | 16.6 | 7.9 | SE | 15.8 | 0 | 7.4 | · |
| Cantanhede / Fonte Dom Pedro (CIM) | 6213612 | 40.342, -8.578 | 15.9 | 9.7 | S | 23.4 | 0 | 7.3 | · |
| Lousã/Trevim | 1259201 | 40.093, -8.179 | 10.7 | 53.3 | W | 54 | 0.1 | 6.7 | · |
| Anadia | 1210705 | 40.439, -8.440 | 17.2 | 3.6 | S | 10.1 | 0 | 6.2 | · |
| Olhão, EPPO | 1210881 | 37.033, -7.821 | 20.3 | 22 | S | 28.1 | 0 | 5.5 | 1010.6 |
| Monção, Valinha | 1210605 | 42.067, -8.383 | 16.9 | 15.8 | SW | 23.8 | 0 | 5.4 | · |
| Figueira da Foz, Vila Verde | 1210713 | 40.140, -8.806 | 17.2 | 7.2 | SE | 27 | 0.1 | 5.3 | · |
| Odemira - Vila Nova de Milfontes | 1210782 | 37.727, -8.793 | 19.4 | 34.6 | S | 39.6 | 1.2 | 4.9 | 1010.8 |
| Bragança | 1200575 | 41.804, -6.743 | 11.4 | 13.7 | S | 31 | 0 | 4.8 | 1008.1 |
| Arouca | 1210669 | 40.933, -8.250 | 17.2 | 4.3 | NW | 14.4 | 0 | 4.6 | · |
| Portimão (Aeródromo) | 1210878 | 37.149, -8.581 | 20.2 | 15.5 | SW | 20.5 | 0 | 4.1 | 1010.3 |
| Coruche / Cruz Do Leão | 1210550 | 39.071, -8.400 | 17 | 6.5 | SW | 20.2 | 0.1 | 3.8 | 1008.3 |
| S. Gens | 1210649 | 41.184, -8.644 | 15.3 | 4.7 | S | 7.2 | 0.8 | 3.7 | · |
| Luzim | 1210657 | 41.146, -8.249 | 15.3 | 7.6 | SW | 14.4 | 0 | 3.7 | · |
| Loulé (CML) | 6210872 | 37.130, -8.065 | · | 10.1 | S | 18 | 0 | 3.6 | 1010.8 |
| Portimão (Praia da Rocha) | 6210879 | 37.117, -8.529 | 19.9 | 27 | SW | 33.1 | 0.1 | 3.4 | · |
| Porto, Pedras Rubras (Aeródromo) | 1200545 | 41.234, -8.681 | 16.4 | 16.2 | S | 34.9 | 0.1 | 3.2 | 1005.1 |
| Santarém, Fonte Boa | 1210734 | 39.201, -8.737 | 17.9 | 19.8 | S | 27.7 | 2.3 | 3.1 | 1007.5 |
| Vila Real | 1200567 | 41.274, -7.717 | 12.7 | 1.1 | S | 14.4 | 0 | 2.7 | 1006.5 |
| Dunas de Mira | 1210704 | 40.446, -8.762 | 17.5 | 6.8 | S | 30.2 | 0 | 1.9 | · |
| Vila Real (Cidade) | 1240566 | 41.309, -7.741 | 13.7 | 2.5 | S | 11.2 | 0 | 1.9 | · |
| F. Castelo Rodrigo, V.Torpim | 1210671 | 40.750, -6.883 | 12.6 | 19.1 | S | 33.5 | 0 | 1.8 | · |
| Aveiro (Universidade) | 1210702 | 40.635, -8.660 | 17.2 | 10.8 | S | 28.4 | 0 | 1.7 | 1006 |
| Aljezur | 1210789 | 37.317, -8.800 | 21 | 10.4 | SW | 20.2 | 0 | 1.5 | · |
| Tavira | 1210883 | 37.122, -7.621 | 20 | 19.4 | SW | 33.5 | 0 | 1.3 | 1011.2 |
| Pinhão, Santa Bárbara | 1210655 | 41.173, -7.549 | 14.7 | 2.5 | NE | 13.7 | 0 | 1.2 | · |
| Mirandela | 1210632 | 41.515, -7.191 | 15.3 | 11.2 | S | 23.8 | 0 | 1.1 | · |
| Faro (Aeródromo) | 1200554 | 37.017, -7.972 | 20.6 | 20.5 | SW | 27.7 | 0 | 1.1 | 1010.7 |
| Vila Real de S. António | 1210866 | 37.187, -7.416 | 20.2 | · | · | · | 0.1 | 1.1 | · |
| Sagres | 1200533 | 37.013, -8.949 | 19.9 | 16.9 | S | 33.1 | 0 | 0.7 | 1009.7 |
| Albufeira | 1210874 | 37.093, -8.262 | 19.1 | 19.1 | S | 24.8 | 0 | 0.7 | · |
| Castro Marim (RN Sapal) | 1210867 | 37.217, -7.450 | 20.7 | 22.7 | SW | 32 | 0 | 0.5 | · |
| Elvas | 1210835 | 38.891, -7.140 | 16.5 | 10.8 | SW | 27.4 | 0 | 0.3 | · |
| Viana Do Castelo - Fonte Louçã (CIM) | 6211217 | 41.746, -8.815 | · | 29.2 | SW | 42.5 | 0 | 0 | 1003.5 |
| Guimarães | 1210625 | 41.429, -8.318 | 14.7 | 2.9 | SE | 11.9 | 0 | 0 | 1005.6 |
| Lisboa (Geofísico) | 1200535 | 38.719, -9.150 | 17.2 | 9.4 | W | 35.3 | 0 | 0 | 1007.3 |
| Évora (C.Coordenação) | 1200558 | 38.533, -7.883 | 17.5 | 14.8 | S | 35.3 | 0 | 0 | 1009.1 |
| Ponte de Sôr / Aeródromo | 6210817 | 39.215, -8.054 | 18.1 | 15.5 | S | 35.6 | · | · | 1008.1 |
| Barcelos (CIM) | 6212125 | 41.529, -8.627 | 16.5 | 11.2 | SE | 18.4 | · | · | 1004.7 |
| Nelas / Vilar Seco (CIM) | 6213015 | 40.566, -7.837 | · | · | · | · | · | · | · |
| Oliveira de Frades (CIM) | 6213016 | 40.717, -8.201 | 14.4 | 19.8 | SE | 38.5 | · | · | · |
| Setúbal, Areias | 1240929 | 38.548, -8.891 | · | · | · | · | · | · | · |
| Coimbra / Mata de São Pedro (CIM) | 6213613 | 40.331, -8.375 | 15.1 | 8.3 | S | 11.2 | · | · | · |
| Monção - Guimil (CIM) | 6211211 | 42.043, -8.422 | · | · | · | · | · | · | · |
| Vila Nova De Cerveira- Alto Pena (CIM) | 6211212 | 41.920, -8.712 | · | · | · | · | · | · | · |
| Paredes De Coura - Vascões (CIM) | 6211213 | 41.913, -8.492 | 12 | 6.5 | SW | 11.9 | · | · | 1004.5 |
| Ponte Da Barca - Lindoso (CIM) | 6211214 | 41.873, -8.193 | · | · | · | · | · | · | · |
| Caminha - Agra De Baixo (CIM) | 6211215 | 41.848, -8.716 | · | · | · | · | · | · | · |
| Ponte De Lima - Anais (CIM) | 6211218 | 41.698, -8.522 | 13.8 | 8.3 | SE | 16.2 | · | · | 1004.5 |
| Vila Verde (CIM) | 6212123 | 41.647, -8.434 | 15 | 3.6 | SW | 10.4 | · | · | 1005.3 |
| Lousã/Candal | 1259202 | 40.081, -8.205 | · | · | · | · | · | · | · |
| Tondela, Caramulinho (CIM) | 6213021 | 40.546, -8.208 | · | · | · | · | · | · | · |
| Sintra, Colares | 1210747 | 38.813, -9.460 | · | · | · | · | · | · | · |
| Espinho/Aeródromo | 1210659 | 40.974, -8.643 | 16 | 16.6 | S | 38.2 | · | · | 1005.1 |
| Mêda | 1210665 | 40.969, -7.257 | · | · | · | · | · | · | · |
| Vila Nova Famalicão (CIM) | 6212410 | 41.388, -8.522 | · | · | · | · | · | · | · |
| Leiria | 1240916 | 39.745, -8.810 | · | · | · | · | · | · | · |
| Ourém / Fátima | 1210723 | 39.622, -8.649 | · | · | · | · | · | · | · |
| Amadora | 1240935 | 38.758, -9.242 | · | · | · | · | · | · | · |
| Setúbal | 1210770 | 38.548, -8.891 | 18.8 | 8.6 | S | 17.6 | · | · | 1007.6 |
| Carregal do Sal (CIM) | 6213012 | 40.467, -7.926 | 14.6 | 10.1 | W | 16.9 | · | · | · |
| São Pedro do Sul (CIM) | 6213018 | 40.830, -8.116 | · | · | · | · | · | · | · |
| Santa Comba Dão (CIM) | 6213019 | 40.396, -8.140 | · | · | · | · | · | · | · |
| Viseu / Torredeita (CIM) | 6213024 | 40.674, -8.133 | · | · | · | · | · | · | · |
| Penhas Douradas | 1200568 | 40.411, -7.559 | 8.9 | 0 | SW | 14 | · | · | · |
| Portalegre (cidade) | 1240820 | 39.268, -7.421 | · | · | · | · | · | · | · |
| Ourique / Santana Da Serra | 1210785 | 37.502, -8.302 | 18.8 | 15.8 | SE | 32.4 | · | · | 1009.4 |
| Portel, Oriola | 1210848 | 38.317, -7.867 | 17.7 | 14.8 | S | 30.2 | · | · | · |
| Castro Daire / Mézio (CIM) | 6213013 | 40.981, -7.883 | 11.1 | 25.2 | S | 36.7 | · | · | · |
| Almodôvar - Pico do Mu | 1210861 | 37.371, -8.080 | · | · | · | · | · | · | · |
| Góis / Quinta da Ribeira (CIM) | 6213614 | 40.172, -8.103 | · | 13.7 | SW | 24.5 | · | · | · |

## Madeira and Porto Santo

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Madeira, Areeiro | 1210973 | 32.717, -16.917 | 14.6 | 60.8 | W | 68.8 | 49.6 | 253.6 | · |
| Madeira, Pico do Areeiro | 1210974 | 32.735, -16.928 | 12.9 | · | · | · | 23.2 | 148.9 | · |
| Madeira, Pico Alto | 1210972 | 32.693, -16.904 | 16.6 | 34.6 | S | 38.9 | 18.4 | 132.9 | · |
| Madeira, Santo da Serra | 1210975 | 32.726, -16.817 | 18.4 | · | · | · | 25 | 130 | · |
| Madeira, São Vicente | 1210967 | 32.800, -17.045 | 21.1 | · | · | · | 27.6 | 122.2 | · |
| Madeira, Monte | 1210976 | 32.676, -16.907 | 19.2 | 11.9 | SW | 14.4 | 10.5 | 93.7 | · |
| Santa Catarina (Aeródromo) | 1200521 | 32.697, -16.776 | 21.5 | 71.3 | S | 71.3 | 5.6 | 57.4 | 1002.3 |
| Madeira, Calheta | 1210990 | 32.814, -17.263 | 20 | 19.4 | SW | 29.2 | 6.7 | 45.8 | 998.4 |
| Ponta do Sol/Lugar de Baixo | 1210986 | 32.682, -17.104 | 21.9 | 22.7 | W | 24.8 | 4.7 | 45.7 | · |
| Madeira, Quinta Grande | 1210984 | 32.663, -17.015 | 19.9 | · | · | · | 3.9 | 41.3 | · |
| Madeira, Santana | 1210965 | 32.808, -16.886 | 17.8 | · | · | · | 6.4 | 39 | · |
| Madeira, Porto Moniz | 1210956 | 32.867, -17.171 | 22.7 | · | · | · | 7.6 | 38.9 | · |
| Funchal | 1200522 | 32.648, -16.888 | 21.9 | 18.4 | SW | 22 | 2.3 | 37.6 | 1004.2 |
| Madeira, S. Lourenço | 1210978 | 32.747, -16.706 | 21.1 | 79.9 | SW | 83.2 | 3.3 | 36.2 | · |
| Madeira, Cancela | 1210977 | 32.645, -16.866 | 20.5 | 41.4 | W | 43.9 | 3.4 | 31.5 | · |
| Madeira, Funchal, Lido | 1240971 | 32.637, -16.936 | 22 | · | · | · | 1.5 | 22.1 | · |
| Madeira, S. Jorge, Santana | 1210960 | 32.834, -16.906 | 19.1 | 5.8 | NW | 13.7 | 3.8 | 21.8 | 1001.8 |
| Porto Santo | 1200524 | 33.074, -16.349 | 21.5 | 44.3 | S | 44.3 | 0.9 | 15.7 | 1002.8 |
| Ilhas selvagens | 1210520 | 30.141, -15.869 | 22.4 | 56.9 | SW | 56.9 | 0 | 0 | 1008.7 |
| Madeira, Bica da Cana | 1210970 | 32.756, -17.058 | · | · | · | · | · | · | · |
| Madeira, Lombo da Terça | 1210980 | 32.831, -17.202 | · | · | · | · | · | · | · |
| Prazeres (Calheta) | 1210987 | 32.757, -17.202 | · | · | · | · | · | · | · |

## The Azores

Sorted by the 24-hour rain sum.

| Station | Id | Lat, lon | °C | Wind km/h | From | 24 h highest hourly wind km/h (computed) | Rain mm, last hour | 24 h rain mm (computed) | hPa |
|---|---|---|---|---|---|---|---|---|---|
| Pico / Cabeço do Teicho (DROTRH) | 11217625 | 38.489, -28.353 | 11.1 | 13.3 | W | 25.9 | 0.5 | 7.2 | · |
| Faial / Alto do Cabouco (DROTRH) | 11217710 | 38.587, -28.699 | 11.4 | · | S | · | 0 | 6.2 | · |
| São Miguel / Sete Cidades (DROTRH) | 11217225 | 37.868, -25.772 | 15.8 | 11.5 | W | 20.5 | 0 | 4.3 | · |
| Pico / Cabecinho (DROTRH) | 11217645 | 38.434, -28.114 | 13.2 | 12.2 | W | 16.9 | 0.1 | 3.9 | · |
| São Jorge / Pico do Areeiro (DROTRH) | 11217510 | 38.644, -28.059 | 11 | 9.4 | SW | 36 | 0.1 | 3.6 | · |
| Terceira / Ribeira das Nove (DROTRH) | 11217370 | 38.754, -27.325 | 12 | 6.5 | W | 9 | 0.5 | 3.3 | · |
| Faial / Cabeço Verde (DROTRH) | 11217730 | 38.584, -28.758 | 13.4 | 13.3 | E | 16.2 | 0 | 2.9 | · |
| São Miguel - Pico Santos De Cima | 1210518 | 37.819, -25.751 | 11.4 | 42.1 | N | 53.3 | 0 | 2.7 | 1004 |
| Corvo (Aeródromo) | 1200502 | 39.674, -31.114 | 16.9 | 20.2 | NW | 39.6 | 0 | 2 | 1007.6 |
| São Jorge | 1200510 | 38.660, -28.170 | 16.4 | 13 | NW | 24.1 | 0 | 2 | 1005.6 |
| Flores (Aeródromo) | 1200501 | 39.458, -31.130 | 15.8 | 13 | NW | 22 | 0.1 | 1.9 | 1008.1 |
| Graciosa (Aeródromo) | 1200507 | 39.090, -28.029 | 16.9 | 27 | NW | 39.6 | 0.1 | 1.3 | 1005 |
| São Miguel / Lagoa das Furnas (DROTRH) | 11217255 | 37.762, -25.329 | 15.1 | 10.8 | SE | 10.8 | 0.2 | 1.2 | · |
| Horta / Aeroporto | 1200505 | 38.521, -28.713 | 16.9 | 11.5 | NW | 25.2 | 0 | 1.1 | 1006 |
| P. Delgada (Aeródromo) | 1200512 | 37.744, -25.695 | 16.9 | 25.6 | NW | 37.4 | 0 | 0.8 | 1003.8 |
| Graciosa / Serra das Fontes (DROTRH) | 11217430 | 39.067, -28.004 | 14.5 | 18.7 | S | 31.3 | 0.6 | 0.7 | · |
| Pico (Aeródromo) | 1200504 | 38.552, -28.441 | 17.2 | 10.8 | NW | 16.2 | 0 | 0.7 | 1006.2 |
| Terceira / Serra do Cume (DROTRH) | 11217372 | 38.700, -27.103 | 13.4 | 15.8 | NW | 29.5 | 0.3 | 0.7 | · |
| S. Miguel, Nordeste | 1210932 | 37.833, -25.150 | 16.1 | 11.2 | NW | 16.9 | 0 | 0.6 | · |
| São Miguel / Santana (DROTRH) | 11217217 | 37.805, -25.562 | 16.9 | 10.4 | W | 12.6 | 0 | 0.6 | · |
| Horta (Obs. Principe Alberto) | 1200506 | 38.541, -28.632 | 15.9 | 9.4 | N | 29.2 | 0 | 0.6 | 1006.5 |
| Angra do Heroísmo | 1200511 | 38.666, -27.217 | 15.9 | 4 | E | 23.4 | 0 | 0.3 | 1005 |
| Santa Maria (Aeródromo) | 1200515 | 36.967, -25.168 | 17.2 | 27 | NW | 41 | 0 | 0.2 | 1004.2 |
| P. Delgada (Obs. A. Chaves) | 1210513 | 37.746, -25.662 | 14.7 | 1.1 | S | 9 | 0 | 0.1 | · |
| Faja / Ilha das Flores | 1210907 | 39.453, -31.265 | 16.8 | 23.4 | N | 27 | 0 | 0 | 1008.5 |
| Santa Maria / Praia Formosa (DROTRH) | 11217160 | 36.954, -25.092 | 16.5 | 14.4 | E | 14.4 | 0 | 0 | · |
| Santa Maria / Maia (DROTRH) | 11217165 | 36.941, -25.018 | 16 | 6.5 | NW | 13.3 | 0 | 0 | · |
| Flores / Morro Alto | 1210517 | 39.463, -31.221 | · | · | · | · | · | · | · |

Data: [data/stations.json](data/stations.json), [data/observations.json](data/observations.json), [data/observed-daily.json](data/observed-daily.json). Source: [observations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json) and [stations.json](https://api.ipma.pt/open-data/observation/meteorology/stations/stations.json), read 2026-11-11 02:22 UTC. The hour label's convention is not documented by IPMA: see [the data set's page](endpoints/observations.md).
