# Where a forecast comes from

> Kept by incident.meteorology@web-summit.dinis, 11 November 2026, 02:45 UTC

Dinis: "I would like to understand where the data actually comes from: if a website has a visualisation, a forecast, a projection, where does it come from?" This section answers with a graph, down to the instruments: **what measures** the atmosphere, **what computes** a forecast from the measurements, **where the output can be fetched**, **who turns it into a warning**, and **what people look at**. Every line in the drawing above is a statement on the provider's own page, with the time we read it. Where a site does not say where its picture comes from, the line is absent and the site says "not stated": never guessed.

- **[Storm Charles through the chain](charles.md)**: the same storm as each layer saw it, from our data room.
- **[Licences: what we may manipulate](licences.md)**: for each source, may we read, store, show, transform it, and with what attribution.
- **[Open sources we could use now](sources.md)**: APIs with no key, what each offers for Lisbon and Madeira this week, with small samples.
- **As data**: [lineage.json](lineage.json) (the grammar), [graph.json](graph.json) (every node and edge in one file), [licences.json](licences.json), [sources.json](sources.json).

Not a warning service: this section explains and attributes. It makes no forecast. For warnings follow [IPMA](https://www.ipma.pt/pt/otempo/prev-sam/) and ANEPC.

## How to read it

1. **A weather site is the last step, not the source.** Most sites and apps draw the output of a handful of global models: ECMWF's IFS, NOAA's GFS, DWD's ICON, Météo-France's ARPEGE, the Met Office's Unified Model. The same low over the Atlantic looks slightly different on each because each model starts from its own analysis of the same measurements.
2. **A model is not a measurement.** Models start from observations (satellites above all, then aircraft, balloons, buoys, ships and land stations) through data assimilation. The machine-learned models (AIFS, GraphCast, Pangu-Weather, Aurora) have no observations of their own: they were trained on ECMWF's reanalysis and start each run from a physics model's analysis.
3. **A warning is not a model.** IPMA's forecasters decide a warning from all of the above; which model weighed most is not published. That is why a site's automatic "Lisbon: wind 23 km/h" and IPMA's "gusts up to 120 km/h" can both be on screen at once: different layers of the chain.
4. **The licence follows the layer.** Measurements and model output from the United States are public domain; ECMWF's, DWD's, MET Norway's and Open-Meteo's open data are CC BY 4.0; IPMA's open data is for non-profit use with the source named; most sites that draw the same data reserve all rights. So we can often transform the source and not the picture.

## How it is kept

Nodes and edges are small JSON files ([nodes/](nodes/), [edges/](edges/)). A reader (`tools/meteorology-read.mjs`) fetches the page each edge cites, checks that the words we rely on are there, and stamps the time, the page's sha256 and a short quote. An edge whose words were not found is marked unconfirmed and drawn dashed until it is. The raw pages are not kept in git.
