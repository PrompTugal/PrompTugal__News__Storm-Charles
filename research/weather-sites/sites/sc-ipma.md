# IPMA: communiqué no. 2 and the warnings

> Kept by incident.weatherwatch@web-summit.dinis, 11 November 2026, 02:55 UTC

[All weather sites](../README.md) · [compare](../compare.md) · Storm Charles coverage · authority · Portugal

**Address:** <https://www.ipma.pt/pt/otempo/comunicados/> (leaves this site)  
**Owner:** IPMA

## Screenshot

None yet. Requested from incident.archivist@ in [addresses.json](../addresses.json) (capture: yes). When a capture exists it is shown here from the display vault, with its time and hash; no image is kept in git.

## What it shows, and how

The primary source. Communiqué no. 2 (valid 10 Nov 17:07 to 11 Nov 23:59) and the warnings JSON. No tracker, no map of the low's path, no live page: text and the warnings map.

Forms: `warnings`, `explainer`, `api`.

## What it does best

Authority.

## What we take from it

Nobody presents IPMA's own content as a single live page for one storm: that is the gap we fill.

## Data and models it says it uses

Not read: we did not open a page of this site that says what data or models it uses.

## API and feeds

warnings_www.json, comunicados.xml

## Licence and terms

As we recorded it: as IPMA.  
May we show its content: **yes, non-commercial, with attribution**.  
Its terms page, as linked on the site ("Avisos legais"): <https://www.ipma.pt/opencms/pt/siteinfo/index.html?page=index.xml> (found 23:40 UTC, 2026-11-10; excerpts below where the page opened).

**From its terms page as published** (read 02:15 UTC, 2026-11-11; sentences picked by a script from the page's text, verbatim: they point to the passage and are not the whole terms):

> Quaisquer tentativas de alteração de informação, de carregamento de informação, ou qualquer outra acção que possa causar dano e/ou colocar em risco a integridade do sistema, é expressamente proibida, podendo ser punida de acordo com a legislação em vigor.

> O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas.

> O Utilizador deve referir, sempre, a fonte de informação.

> No que respeita aos sítios para que este site faz ligação deverá ser obtida a autorização dos autores desse material ou feita referência à fonte conforme as respectivas declarações de direitos de autor.

Words found on that page: personal or non-commercial use is named.

**Exact terms** (read 23:53 UTC, <https://www.ipma.pt/pt/siteinfo/index.html?page=index.xml>):

- "O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas."
- "O Utilizador deve referir, sempre, a fonte de informação."
- "O logo-símbolo do sítio de internet do IPMA deve ser utilizado sempre que um Utilizador pretenda incluir informação disponibilizada pelo sítio de internet em páginas de hiper-documentos, devendo referenciar a hiper-ligação ao site do IPMA."

Our reading: Free use for personal or public purposes that are neither for profit nor offensive; always name the source; when IPMA's information is included in a web page, show IPMA's logo with a link to its site. Nothing is said about loading its images from its server in another page (hotlinking), and the image addresses are produced by script, not documented or stable. Verdict: Link only for now ("Radar: IPMA", opening IPMA's page). To show a frame: a person asks IPMA whether a non-profit newsroom may load the radar image with "Fonte: IPMA", the logo and a link. Whether this site counts as non-profit is Dinis's to state. (from [imagery.json](../imagery.json); not legal advice.)

## Storm Charles

This entry is part of the coverage map. Against the six things this site is built on ([the gap table](../README.md), [gap.json](../gap.json)):

| Timeline | Decisions | Source per item | Time read | Hour by hour | Data |
|---|---|---|---|---|---|
| partly | no | yes | partly | yes | yes |

It is the source. Its warnings are on a time axis (the warnings timeline) and by hour (the place forecast); no record of what others decided; shows its own last-update time.

Later reads: [rereads.json](../rereads.json).

## How to reach it

Its own contact page, as linked on the site ("Contacto"): <https://www.ipma.pt/opencms/pt/siteinfo/contactar.jsp> (found 23:40 UTC, 2026-11-10).
A person writes, in their own name; no agent does. No address, phone number or person is recorded here.

## How we read it

- Read: 2026-11-10T23:40Z · HTTP 200 · content read in the returned page
- Addresses requested: `c-ipma-comunicados` 200, `ipma-api-warnings` 200
- Data: this entry in [sites.json](../sites.json) (`sc-ipma`)
