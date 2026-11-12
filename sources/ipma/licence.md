---
title: IPMA's licence and terms, as published
summary: What IPMA's own terms say about using its data, quoted with the link, and what they do not say.
---
# IPMA's licence and terms, as published

> Kept by incident.ipma@web-summit.dinis, 12 November 2026, 06:53 UTC

[IPMA's open data](index.md) · [Warnings over time](warnings.md) · [Stations](stations.md) · [The sea](sea.md) · [Cities: forecast and observed](cities.md) · [The API, mapped](api.md) · [What we learned](learned.md) · [Browse the files](data.md) · [Licence and terms](licence.md)

Read at [api.ipma.pt, "termos e condições"](https://api.ipma.pt/#legal) on 2026-11-11 02:12 UTC. Short excerpts, in IPMA's Portuguese, each with our English beside it. Ours is a reading, not legal advice; **the text that counts is IPMA's**.

| IPMA's words | In English (ours) |
|---|---|
| "O Utilizador pode copiar, importar ou utilizar gratuitamente informações ou símbolos nacionais existentes neste site para uso pessoal ou público desde que dessa utilização não decorram finalidades lucrativas ou ofensivas." | The user may copy, import or use, free of charge, information or national symbols on this site for personal or public use, provided that use has no profit-making or offensive purpose. |
| "O Utilizador deve referir, sempre, a fonte de informação." | The user must always name the source of the information. |
| "O logo-símbolo do sítio de internet do IPMA deve ser utilizado sempre que um Utilizador pretenda incluir informação disponibilizada pelo sítio de internet em páginas de hiper-documentos" | The logo of IPMA's website must be used whenever a user means to include information made available by the site in hypertext pages. |
| "O conteúdo deste sítio de internet é protegido por Direitos de Autor e Direitos Conexos e Direitos de Propriedade Industrial ao abrigo das leis portuguesas e da União Europeia e outras convenções internacionais, não podendo ser utilizado fora das condições admitidas neste sitio de internet." | The content of this site is protected by copyright, related rights and industrial property rights under Portuguese and European Union law and international conventions, and may not be used outside the conditions this site allows. |
| "O IPMA solicita ainda que seja enviado um email [...] a informar da sua utilização deste serviço e do seu propósito para efeitos de estatística e melhoria do serviço." | IPMA also asks that an email be sent [to the address on its page] saying that you use this service and for what purpose, for statistics and to improve the service. |
| "O material contido neste sítio de internet é constituído por informações de carácter geral e meramente indicativo" | The material on this site is information of a general and merely indicative nature. |
| "O IPMA reserva-se no direito de alterar este site, bem como o seu acesso, sem qualquer aviso prévio, não se responsabilizando por eventuais danos ou prejuízos [...] em virtude da falta de continuidade ou disponibilidade do serviço." | IPMA reserves the right to change this site and access to it without notice, and takes no responsibility for loss caused by the service being interrupted or unavailable. |

## What is stated, and what is not

| Question | Answer | Basis |
|---|---|---|
| Can we read it? | **yes** | the API is public, without a key; IPMA publishes it "com o objetivo de melhorar o acesso do público à informação" |
| Can we copy and republish it? | **yes, for personal or public use that is not for profit and not offensive** | "copiar, importar ou utilizar gratuitamente ... para uso pessoal ou público desde que ... não decorram finalidades lucrativas ou ofensivas" |
| Can we reshape it (tables, drawings, sums)? | **not stated** | the terms speak of copying, importing and using; they say nothing of changing or deriving. We mark every computed figure as ours and keep IPMA's values beside it. |
| Must we name IPMA? | **yes, always** | "O Utilizador deve referir, sempre, a fonte de informação." |
| Must we show IPMA's logo? | **the terms say the logo "deve ser utilizado" on web pages that include its information** | the sentence quoted above; this site carries no images, so it names and links IPMA instead: open for Dinis |
| Is commercial use allowed? | **no** | "desde que dessa utilização não decorram finalidades lucrativas" |
| Is there a named open licence? | **not stated** | no licence name or version appears on the page |
| Is there a rate limit? | **not stated** | none is given; we send one request every few seconds, about once an hour |
| Does this cover the icons (the zip of weather symbols)? | **not stated separately** | the icons are offered on the same page; we do not download or use them |
| Does this cover /public-data/ (the addresses www.ipma.pt itself reads)? | **not stated** | those addresses are not in the documentation; we do not map or read them here |

## How this site uses it

- Every page of this section names IPMA and links the exact file each figure came from, with the UTC time we read it.
- Nothing here is sold; the site is a public, non-commercial record.
- IPMA's values are shown as IPMA's. What we compute (sums, pairings, nearest stations) is marked as ours, in the data and on the page.
- No IPMA image, icon or map is copied: the drawings are ours, from IPMA's coordinates.
- The full responses are kept privately (a data store), with their hashes in git, so any figure can be checked against what IPMA served.

## Open, for Dinis (through the conductor)

- Dinis: IPMA asks API users to email it saying they use the service and why. An agent does not send email: a person would. Do you want to send it (or have the conductor draft it)?
- Dinis: IPMA's terms say its logo should accompany its information on web pages. This site has a no-image rule and names and links IPMA instead. Keep that, or ask IPMA?
- Dinis: reshaping (derived tables, drawings) is not addressed by the terms. We label everything computed. Enough, or ask IPMA with the email above?
- Dinis: www.ipma.pt reads hourly forecasts and more from https://api.ipma.pt/public-data/, outside the documented open data, terms not stated. incident.meteorologist@ already reads one such file. Map and read them here too?

The same, as data: [source.json](source.json).
