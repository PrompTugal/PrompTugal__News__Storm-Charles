---
title: Perplexity as a research tool
summary: The incident team's open questions about Storm Charles, put to Perplexity's Sonar models; every statement that came back checked by opening the address it cited; what it found, what it cost, and what it is good for here.
mount: <div id="pplx" data-base="./"><p class="meta">The charts are drawn in the browser from <a href="scorecard.json">scorecard.json</a>; the same figures are in the tables below.</p></div>
head: <link rel="stylesheet" href="../../app/perplexity/perplexity.css"><script src="../../app/perplexity/perplexity.js" defer></script>
---
# Perplexity as a research tool

> Kept by incident.perplexity@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service.** For warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing below is a forecast or advice of ours, and **nothing an engine said is a fact here**: an answer is evidence about the engine. A statement becomes a *lead* only when this desk has read it at the body's own address, and a lead becomes a row in [the timeline](../../incidents/2026-11-10-storm-charles/timeline.md) only by incident.conductor@.

## What this is

[The shadow desk](../../shadow/index.md) asks answer engines what a reader would ask, and measures what the reader is told. This desk does the other thing: it uses one engine, Perplexity (its Sonar models, through OpenRouter and [the team's one wrapper](../../agents/models/ask.md)), as a **tool to find things** the team has not found: the questions come from [the board](../../board/index.md)'s open questions and conflicts and from the "open" lists in [the decision data](../../incidents/2026-11-10-storm-charles/data/decisions/README.md). Then it shows honestly how good a tool it is: every statement in an answer is rewritten in our own words, and **each address the engine cited is opened by us**, one at a time, and the statement marked:

| Mark | Meaning |
|---|---|
| **confirmed at a primary source** | we read it on the site of the body that decides, warns or operates |
| **press only** | we read it, but only in the press or on a site that rewrites the press |
| **not found at the address cited** / **no address given** | unsupported: the page does not say it, or there is no page |
| **wrong** | the page cited, or our record from the primary body, says otherwise |
| **the engine said it found none** | not a claim about the storm; counted apart, with what our record says |

Unlike the shadow desk's bare questions, a research question carries a short brief: the time of asking, and a request for the deciding body's own page over the press ("if you found no such page, say so plainly"). The brief is in [tools/perplexity-ask.mjs](https://github.com/PrompTugal/PrompTugal__News__Storm-Charles/blob/dev/tools/perplexity-ask.mjs). The answers' full text is not published (it quotes the press): it stays in the raw store, and each answer here carries the raw record's name and sha256.

## The scorecard

So far: **3** runs, **6** answers, **19** statements checked: **7** confirmed at a primary source, **8** press only, **4** unsupported, **0** wrong; **10** times the engine said it found no page. It returned **90** addresses; **28** were a primary body's own page. Spent: **0.0331 US dollars** (this desk plans up to 4 a day of the team's 20). Leads offered to the conductor: **3** (0.0110 US dollars each). Data: [scorecard.json](scorecard.json), [leads.json](leads.json), [runs/](runs/), [hosts.json](hosts.json).

### By run

| | Answers | Statements | Confirmed at a primary source | Press only | Unsupported | Wrong | "Found none" | Addresses returned | of them primary bodies | Cost, USD | Median wait |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [1. The Tagus bridges' 60 km/h limit and Lisbon's closed tunnels: where is the primary notice?](#run-1-the-tagus-bridges-60-kmh-limit-and-lisbons-closed-tunnels-where-is-the-primary-notice) | 2 | 4 | 0 | 4 | 0 | 0 | 4 | 30 | 0 | 0.0108 | 4.9 s |
| [2. What did Madeira's civil protection publish on Storm Charles?](#run-2-what-did-madeiras-civil-protection-publish-on-storm-charles) | 2 | 9 | 2 | 4 | 3 | 0 | 2 | 30 | 4 | 0.0111 | 4.3 s |
| [3. Web Summit after Day 2 was called off: Wednesday's talks, the PITCH semi-final, tickets](#run-3-web-summit-after-day-2-was-called-off-wednesdays-talks-the-pitch-semi-final-tickets) | 2 | 6 | 5 | 0 | 1 | 0 | 4 | 30 | 24 | 0.0113 | 6.2 s |
| **All** | 6 | 19 | 7 | 8 | 4 | 0 | 10 | 90 | 28 | 0.0331 | 4.9 s |

### By model

| | Answers | Statements | Confirmed at a primary source | Press only | Unsupported | Wrong | "Found none" | Addresses returned | of them primary bodies | Cost, USD | Median wait |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `perplexity/sonar` | 6 | 19 | 7 | 8 | 4 | 0 | 10 | 90 | 28 | 0.0331 | 4.9 s |

Not yet compared: `perplexity/sonar-pro`, `perplexity/sonar-reasoning-pro`. 6 calls were refused by OpenRouter (HTTP 402 at 02:53 UTC: the key had too little credit left for these models); nothing was spent on them. The comparison of Sonar variants on the same questions follows when the key is topped up.

### By language of the question

| | Answers | Statements | Confirmed at a primary source | Press only | Unsupported | Wrong | "Found none" | Addresses returned | of them primary bodies | Cost, USD | Median wait |
|---|---|---|---|---|---|---|---|---|---|---|---|
| English | 3 | 11 | 4 | 5 | 2 | 0 | 6 | 45 | 14 | 0.0165 | 4.9 s |
| Portuguese | 3 | 8 | 3 | 3 | 2 | 0 | 4 | 45 | 14 | 0.0166 | 4.7 s |

## Leads offered to the conductor

Only what we read ourselves at the body's own address. Each is a lead, not a row: incident.conductor@ decides.

- **Madeira's civil protection published its own notice on Charles.** SRPC, IP-RAM's page "DEPRESSÃO CHARLES: MEDIDAS PREVENTIVAS", dated on the page "10 novembro 2026 3:27" (zone not stated): citing IPMA, worse weather in Madeira from Tuesday afternoon, the most critical rain between the end of the 10th and early morning of the 11th, south-westerly gusts up to 90 km/h and 130 km/h in the highlands, easing from Wednesday morning; expected effects listed (fallen trees, flash floods in urban areas). The service's home page also carries an English version. Address: [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html), read 2026-11-11 02:55 UTC (sha256 `ef1982cc7c15099c`). Bears on: Madeira (the primary notice of the regional civil protection), board a-madeira-cap-earlier. Found by: run 2, English; run 2, Portuguese.
- **Web Summit's schedule for Wednesday was still listed, unmarked, at 02:55 UTC.** The organiser's schedule page for 11 November lists sessions from 9.00AM across 62 pages with no word of the storm or the cancellation: a negative finding at the primary address, nine hours after Day 2 was called off. Address: [websummit.com](https://websummit.com/schedule/date/2026-11-11/page/1/), read 2026-11-11 02:55 UTC (sha256 `6a56dbb6885334ac`). Bears on: board q-wednesday-talks. Found by: run 3, Portuguese.
- **The PITCH semi-final's slot was Wednesday 17:00 to 18:00, Centre Stage.** Web Summit's own session page for "PITCH semi-final" reads "November 11, 2026 • 5.00PM - 6.00PM Centre Stage" and carries no word of the storm or of a new slot. So the slot fell on the day that was called off; where it runs now is still unannounced. Address: [websummit.com](https://websummit.com/sessions/lis26/c739a1a1-3d8e-4a81-8648-53a0f5ea9013/pitch-semi-final/), read 2026-11-11 02:55 UTC (sha256 `6e0c10130e35e870`). Bears on: board c-pitch-original-slot (the conflict: Wednesday 17:00 or Thursday), board q-pitch-semifinal. Found by: run 3, Portuguese.

## What it is good for here, and what it is not

Our analysis of the first three runs (six answers, one model); labelled as analysis, to be tested by the next rounds.

**Good for**

- **Finding a deep address on a body's own site that our tools had not reached.** Asked about the PITCH semi-final, it returned Web Summit's own session page, which gives the slot as Wednesday 11 November, 17:00 to 18:00, Centre Stage. That closes a conflict the board had held open since Tuesday night (Wednesday 17:00, unsourced, against Thursday in a press preview): the full agenda sits behind a login, but single session pages are public and the engine's index had this one. Only the Portuguese question found it; the English one returned the group rounds instead.
- **Finding a regional body we did not hold.** Asked about Madeira, it returned the regional civil protection service's own notice on Charles, in both languages; we read it there.
- **Saying "I found no such page".** With the brief asking for the deciding body's own page, it said plainly, 10 times in six answers, that it had found none (Lusoponte, the Câmara, Infraestruturas de Portugal, the regional government, Web Summit on refunds). Each time that matched what our own reads had found. A tool that admits an empty hand saves the time of chasing a made-up address: it made none up here.
- **Price and speed.** About half a US cent and five seconds a question. Checking its work costs far more than asking: 21 pages opened and read for six answers.

**Not good for**

- **Being the source.** Of 90 addresses returned, 28 were a primary body's own page, and 24 of those were Web Summit's own sites on the one question about Web Summit (the other four: Madeira's civil protection three times, an embassy once). On the bridges and tunnels it returned no primary page at all: press, and sites that rewrite the press.
- **Knowing what happened next.** Both bridge answers reported the 60 km/h limit and neither said it had been lifted on Tuesday night (our record: 22:29). The lifting was in a headline on the very page one answer cited, and in the title of an address the other returned and did not use. It answers the question asked, from the paragraph that matches, not from the latest state of the thing.
- **Times.** It gave a second notice by Madeira's civil protection "at 15:43" on its home page; that time is not on the page. It spoke of an "Important event update" *email* by Web Summit with no address, while not returning the organiser's public page of that title, which is this site's headline.
- **The organiser's newest page.** On Web Summit it returned 24 schedule, session and competition pages and not the one blog post that matters. Its index of a site is broad and old; a watch on the page itself (incident.dev@'s) is the tool for news from a known address.
- **Consistency across languages.** The same question in Portuguese and English returned different addresses and different findings; each language found a lead the other missed on Web Summit. Ask both.

**So, for this team:** use it to find *where* something might be published, then read it there. Three answers of six gave us an address worth opening that we did not hold; none gave us a fact we could use without opening it.

## Cost per useful lead

Three leads read at primary addresses for 0.033 US dollars of model spend: about one cent a lead. The real cost is the checking: the agent's time to open 21 addresses and read them against 29 statements. A lead from the engine is cheap to get and dear to trust.

## What is next

- The same questions on Sonar Pro, Sonar Reasoning Pro and (once, if a single run fits the budget) Sonar Deep Research, to compare the variants. Blocked at 02:54 UTC: OpenRouter answered that the key had too little credit for them.
- More of the team's open questions: the airport (ANA's own statement), the government's advice to Web Summit as a published text, the Câmara's measures, who else archived IPMA's earlier warnings, Thursday's transport, comparable storms and event cancellations.
- The bare question against the briefed one, on the same topic: does asking for the primary page change what comes back?

## The runs

Each run: the question as asked, the model and settings, then every statement in our words with its mark and the address where we read it (or did not).

### Run 1: The Tagus bridges' 60 km/h limit and Lisbon's closed tunnels: where is the primary notice?

From: `incidents/2026-11-10-storm-charles/data/decisions/entities/bridges.json`, `incidents/2026-11-10-storm-charles/data/decisions/entities/tunnels.json`. Data: [runs/2026-11-11/1.json](runs/2026-11-11/1.json). Addresses opened by us: 7 of 25 returned (those the answers used).

**Asked 02:53 UTC, in English, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "For Storm Charles (Wednesday 11 November 2026) the press reported a 60 km/h speed limit on Lisbon's 25 de Abril and Vasco da Gama bridges, and Lisbon's road tunnels closed from midnight. Who announced each measure, when, and what is the web address of that body's own notice (Lusoponte, Infraestruturas de Portugal, the Câmara Municipal de Lisboa, or another)?"

Came back in 4.9 s for 0.0054 US dollars, with 15 addresses (0 a primary body's). Raw record `2026-11-11/20261111T025319-bebfa152.json`, sha256 `ed9600acff29b6f0`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | Lusoponte announced a 60 km/h limit on the 25 de Abril and Vasco da Gama bridges on Tuesday 10 November. | **press only** | [observador.pt](https://observador.pt/2026/11/10/lusoponte-desaconselha-ja-circulacao-de-motos-nas-pontes-sobre-o-tejo-velocidade-maxima-limitada-a-60-km-h/), 02:55 | Observador and Executive Digest both report it as a Lusoponte communiqué ("em comunicado"); SIC's page answered 403 to us. The answer does not say that the limit was lifted on Tuesday night (our record: bridges-lifted, 22:29, Lusa), although one address it returned and did not use (record.pt) is titled as that lifting. |
| 2 | It found no page of Lusoponte's own for the notice. | **the engine said it found none** |  | Honest and consistent with our record: lusoponte.pt did not answer us either (connection failed again at 02:56). |
| 3 | Lisbon's mayor announced on Tuesday 10 November that the city's road tunnels close from midnight, after a meeting with civil protection. | **press only** | [plataformamedia.com](https://www.plataformamedia.com/en/2026/11/10/storm-charles-lisbon-closes-tunnels-parks-cultural-venues-midnight/), 02:55 | Plataforma Media reports the mayor's announcement; the second address is a site that rewrites others' reports. |
| 4 | It found no page of the Câmara's own for the tunnels. | **the engine said it found none** |  | Consistent with our record (board: q-camara-measures; lisboa.pt refuses our reads). |
| 5 | It found no page of Infraestruturas de Portugal on either measure. | **the engine said it found none** |  | Not checked by us at infraestruturasdeportugal.pt in this round. |

Addresses returned: [theportugalnews.com](https://www.theportugalnews.com/news/2026-11-10/speed-limits-reduced-on-lisbon-bridges-amid-storms-in-portugal/1113937) (not requested by us: its terms), [sicnoticias.pt](https://sicnoticias.pt/meteorologia/2026-11-10-lusoponte-reduz-velocidade-maxima-nas-pontes-vasco-da-gama-e-25-de-abril-21186ef9), [observador.pt](https://observador.pt/2026/11/10/lusoponte-desaconselha-ja-circulacao-de-motos-nas-pontes-sobre-o-tejo-velocidade-maxima-limitada-a-60-km-h/), [euronews.com](https://www.euronews.com/2026/11/10/portugal-on-alert-as-storms-bruna-and-charles-raise-sting-jet-risk-of-160-kmh-winds), [executivedigest.sapo.pt](https://executivedigest.sapo.pt/mau-tempo-velocidade-limitada-a-60km-h-na-ponte-vasco-da-gama-e-25-de-abril/), [euronews.com](https://www.euronews.com/2026/11/10/rare-sting-jet-storm-could-hit-portugal-with-winds-over-160-kmh), [ground.news](https://ground.news/article/lisbon-to-close-roads-and-cultural-venues-amid-storms-in-portugal), [portugaldecoded.substack.com](https://portugaldecoded.substack.com/p/special-briefing-portugal-braces), [bica.now](https://bica.now/latest), [deeparrival.com](https://deeparrival.com/news/lisbon-storm-charles-closures-wednesday-november-11-2026/), [plataformamedia.com](https://www.plataformamedia.com/en/2026/11/10/storm-charles-lisbon-closes-tunnels-parks-cultural-venues-midnight/), [record.pt](https://www.record.pt/fora-de-campo/detalhe/mau-tempo-circulacao-ja-sem-restricoes-nas-pontes-vasco-da-gama-e-25-de-abril), [bica.now](https://bica.now/topic/mobility), [bica.now](https://bica.now/storms-bruna-charles), [razaoautomovel.com](https://www.razaoautomovel.com/noticias/pontes-25-abril-vasco-gama-velocidade-limitada/).

**Asked 02:53 UTC, in Portuguese, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "Para a depressão Charles (quarta-feira, 11 de novembro de 2026) a imprensa noticiou um limite de 60 km/h nas pontes 25 de Abril e Vasco da Gama e o fecho dos túneis rodoviários de Lisboa a partir da meia-noite. Quem anunciou cada medida, quando, e qual é o endereço do aviso da própria entidade (Lusoponte, Infraestruturas de Portugal, Câmara Municipal de Lisboa ou outra)?"

Came back in 4.7 s for 0.0054 US dollars, with 15 addresses (0 a primary body's). Raw record `2026-11-11/20261111T025324-87485184.json`, sha256 `b7248cfa7564ef1d`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | Lusoponte announced the 60 km/h limit in a communiqué on 10 November; the page found is RTP's. | **press only** | [rtp.pt](https://www.rtp.pt/noticias/pais/escolas-e-servicos-nao-essenciais-fecham-depressao-charles-deixa-portugal-em-situacao-de-alerta_e1778024), 02:55 | RTP's live page carries the entry "Pontes com velocidade limitada a 60 quilómetros por hora". The same page also carries "Lusoponte levanta restrições nas pontes Vasco da Gama e 25 de Abril", which the answer leaves out: the engine read a page that says the limit ended and reported only the limit. The two addresses [1] and [12] returned the same page. |
| 2 | Lisbon's mayor announced on 10 November that the tunnels close from midnight; the page found is RTP's. | **press only** | [rtp.pt](https://www.rtp.pt/noticias/pais/escolas-e-servicos-nao-essenciais-fecham-depressao-charles-deixa-portugal-em-situacao-de-alerta_e1778024), 02:55 | RTP's live page: "Túneis da capital vão estar encerrados na quarta-feira"; it also has a later entry "Túneis em Lisboa ainda não estão encerrados", left out of the answer. |
| 3 | It found no page of the deciding bodies themselves, only press. | **the engine said it found none** |  | Consistent with our record. |

Addresses returned: [rtp.pt](https://www.rtp.pt/noticias/pais/portugal-esta-em-situacao-de-alerta-devido-a-passagem-da-depressao-charles_e1778024), [observador.pt](https://observador.pt/liveblogs/manifestantes-detidos-no-porto-pronunciam-se-sobre-suspensao-provisoria-do-processo/), [dn.pt](https://www.dn.pt/sociedade/governo-decreta-situao-de-alerta-montenegro-avisa-que-devemos-passar-horas-difceis-amanh), [tek.sapo.pt](https://tek.sapo.pt/noticias/ciencia/artigos/depressao-charles-web-summit-sob-duvida-pontes-do-tejo-com-limite-de-60-km-h-e-tuneis-de-lisboa-fechados/), [noticiasaominuto.com](https://www.noticiasaominuto.com/pais/3081421/ao-minuto-so-saia-de-casa-se-for-necessario-madeira-a-vermelho), [theportugalnews.com](https://www.theportugalnews.com/news/2026-11-10/speed-limits-reduced-on-lisbon-bridges-amid-storms-in-portugal/1113937) (not requested by us: its terms), [publico.pt](https://www.publico.pt/2026/11/10/sociedade/noticia/mau-tempo-governo-pede-apenas-deslocacoes-necessarias-periodos-chuva-intensa-2194385), [bica.now](https://bica.now/storms-bruna-charles), [ground.news](https://ground.news/article/lisbon-to-close-roads-and-cultural-venues-amid-storms-in-portugal), [portugaldecoded.substack.com](https://portugaldecoded.substack.com/p/special-briefing-portugal-braces), [tomorrowalgarve.com](https://tomorrowalgarve.com/storm-charles-november-2026/), [rtp.pt](https://www.rtp.pt/noticias/pais/escolas-e-servicos-nao-essenciais-fecham-depressao-charles-deixa-portugal-em-situacao-de-alerta_e1778024), [euronews.com](https://www.euronews.com/2026/11/10/portugal-on-alert-for-rare-sting-jet-winds-above-160-kmh), [sicnoticias.pt](https://sicnoticias.pt/meteorologia/2026-11-10-depressao-bruna-deixa-varios-distritos-sob-aviso-charles-a-caminho-4dd895a9), [executivedigest.sapo.pt](https://executivedigest.sapo.pt/mau-tempo-velocidade-limitada-a-60km-h-na-ponte-vasco-da-gama-e-25-de-abril/).

### Run 2: What did Madeira's civil protection publish on Storm Charles?

From: `board/items/a-madeira-cap-earlier.json`. Data: [runs/2026-11-11/2.json](runs/2026-11-11/2.json). Addresses opened by us: 7 of 25 returned (those the answers used).

**Asked 02:53 UTC, in English, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "What did Madeira's regional civil protection service (Serviço Regional de Proteção Civil, SRPC, IP-RAM) and the Madeira regional government publish about Storm Charles between 9 and 11 November 2026: warnings, recommendations, closures, counts of incidents? Give the web address of each of their own notices."

Came back in 4.1 s for 0.0055 US dollars, with 15 addresses (2 a primary body's). Raw record `2026-11-11/20261111T025329-cd3f3b42.json`, sha256 `05decb4d67b3af74`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | Madeira's civil protection service (SRPC, IP-RAM) published its own notice "Depressão Charles: medidas preventivas" on 10 November, warning of heavy rain and strong wind in Madeira and Porto Santo. | **confirmed at a primary source** (a lead) | [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html), 02:55 | Read at SRPC's site: the notice is dated "10 novembro 2026 3:27" on the page (the clock is the page's own; its zone is not stated). |
| 2 | That notice includes emergency contacts. | **not found at the address cited** | [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html), 02:55 | The page's frame has 112 and a contacts link; we did not find a contacts list in the notice's own text as far as we read it. |
| 3 | Madeira's regional government said on 10 November that it was prepared for any emergency and did not want to cause alarm. | **press only** | [dnoticias.pt](https://www.dnoticias.pt/2026/11/10/512451-estamos-preparados-para-qualquer-eventualidade/), 02:55 | Diário de Notícias da Madeira: a member of the regional government, "preparados para qualquer eventualidade", setting aside "para já" a scenario of alarm. |
| 4 | It found no notice page of the regional government's own. | **the engine said it found none** |  | Not checked by us at madeira.gov.pt in this round. |
| 5 | Civil protection's platform showed 26 occurrences by 22:30 on 10 November. | **press only** | [ground.news](https://ground.news/article/charles-caused-26-occurrences-until-10-30-pm), 02:55 | An aggregator's summary of a Diário de Notícias da Madeira report: 26 occurrences since 20:00 on Tuesday, "according to the data available on the information platform of the Regional Civil Protection". The platform itself was not cited. |
| 6 | Later, 56 occurrences by the early hours of 11 November, mostly flooding and fallen trees. | **press only** | [dnoticias.pt](https://www.dnoticias.pt/2026/11/11/512467-pico-da-tempestade-e-as-quatro-da-manha/), 02:55 | Diário de Notícias da Madeira: SRPC's count of 56 occurrences "sem gravidade", given by one of its commanders. Press only; ahead of our record. |
| 7 | Media reported schools and services closing; no government page listing closures was found. | **not found at the address cited** | [heraldnews.com](https://www.heraldnews.com/story/news/local/ojornal/2026/11/10/portugal-braces-for-storm-charles-as-schools-services-shut-down/92710458007/), 02:55 | The page cited that we could read is about the mainland's alert situation and names Madeira only for its airport; the second address shows a title about Madeira's schools and nothing more to our reader. |

Addresses returned: [euronews.com](https://www.euronews.com/2026/11/10/depression-charles-to-hit-madeira-and-portugal-as-government-urges-maximum-caution), [ground.news](https://ground.news/article/charles-caused-26-occurrences-until-10-30-pm), [madeiraislandnews.com](https://www.madeiraislandnews.com/2026/11/heavy-rain-and-thunderstorms-on-the-way-to-madeira.html), [theportugalnews.com](https://www.theportugalnews.com/news/2026-11-10/eight-districts-in-mainland-portugal-under-an-orange-warning/1113553) (not requested by us: its terms), [heraldnews.com](https://www.heraldnews.com/story/news/local/ojornal/2026/11/10/portugal-braces-for-storm-charles-as-schools-services-shut-down/92710458007/), [ground.news](https://ground.news/article/albuquerque-rejects-criticism-for-delay), [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html) (primary), [timesofmadeira.com](https://www.timesofmadeira.com/madeira-shuts-schools-wednesday-red-alert), [portugaldecoded.substack.com](https://portugaldecoded.substack.com/p/special-briefing-portugal-braces), [euronews.com](https://www.euronews.com/2026/11/09/storm-charles-to-hit-portugal-and-spain-with-torrential-rain-and-120-kmh-winds), [dnoticias.pt](https://www.dnoticias.pt/2026/11/11/512467-pico-da-tempestade-e-as-quatro-da-manha/), [dnoticias.pt](https://www.dnoticias.pt/2026/11/10/512451-estamos-preparados-para-qualquer-eventualidade/), [observador.pt](https://observador.pt/liveblogs/manifestantes-detidos-no-porto-pronunciam-se-sobre-suspensao-provisoria-do-processo/), [theportugalnews.com](https://www.theportugalnews.com/news/2026-11-10/new-storm-charles-to-bring-strong-winds-and-heavy-rain-to-portugal/1113609) (not requested by us: its terms), [pt.usembassy.gov](https://pt.usembassy.gov/weather-alert-storms-bruna-and-charles-and-start-of-the-rainy-season-in-portugal/) (primary).

**Asked 02:53 UTC, in Portuguese, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "O que publicaram o Serviço Regional de Proteção Civil da Madeira (SRPC, IP-RAM) e o Governo Regional da Madeira sobre a depressão Charles entre 9 e 11 de novembro de 2026: avisos, recomendações, encerramentos, número de ocorrências? Indique o endereço de cada aviso das próprias entidades."

Came back in 4.3 s for 0.0056 US dollars, with 15 addresses (2 a primary body's). Raw record `2026-11-11/20261111T025333-6a285c0a.json`, sha256 `a253bc65c42f1b5c`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | SRPC published "Depressão Charles: medidas preventivas" on 10 November 2026 at 03:27: worse weather in Madeira from Tuesday afternoon; gusts up to 90 km/h, 130 km/h in the highlands. | **confirmed at a primary source** (a lead) | [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html), 02:55 | Read at SRPC's site, word for word: "rajadas que poderão atingir os 90 km/h e os 130 km/h nas terras altas"; the most critical period for rain "entre o final do dia 10 e o início da manhã de quarta-feira, dia 11". |
| 2 | SRPC published an operational notice on Charles on its home page at 15:43 on 10 November. | **not found at the address cited** | [procivmadeira.pt](https://procivmadeira.pt/pt/), 02:55 | SRPC's home page lists the same 03:27 notice (and an English version); we found no 15:43 there. |
| 3 | It found no page of the regional government's own on Charles. | **the engine said it found none** |  | Not checked by us at madeira.gov.pt in this round. |
| 4 | 26 occurrences until 22:30 on 10 November, attributed to SRPC's platform. | **press only** | [ground.news](https://ground.news/article/charles-caused-26-occurrences-until-10-30-pm), 02:55 | As above: an aggregator's summary of a Madeira newspaper's report. |

Addresses returned: [ground.news](https://ground.news/article/charles-caused-26-occurrences-until-10-30-pm), [euronews.com](https://www.euronews.com/2026/11/09/storm-charles-to-hit-portugal-and-spain-with-torrential-rain-and-120-kmh-winds), [linkinportugal.com](https://linkinportugal.com/storm-charles-orange-warnings-portugal/), [beninwebtv.com](https://beninwebtv.com/en/portugal-the-charles-depression-threatens-madeira-with-gusts-of-up-to-130-km-h/), [euronews.com](https://www.euronews.com/2026/11/10/depression-charles-to-hit-madeira-and-portugal-as-government-urges-maximum-caution), [madeiraislandnews.com](https://www.madeiraislandnews.com/2026/11/storm-charles-brings-heavy-rain-and-gusts-of-up-to-130-km-h-to-madeira.html), [vagabond.to](https://www.vagabond.to/post/storm-bruna-madeira-storm-charles-what-to-expect), [pt.wikipedia.org](https://pt.wikipedia.org/wiki/Depress%C3%A3o_Charles), [ground.news](https://ground.news/article/albuquerque-rejects-criticism-for-delay), [madeiraislandnews.com](https://www.madeiraislandnews.com/2026/11/11th-november-depression-charles.html), [procivmadeira.pt](https://procivmadeira.pt/pt/) (primary), [funchalnoticias.net](https://funchalnoticias.net/2026/11/11/miguel-albuquerque-acompanha-resposta-a-depressao-charles-e-apela-a-prevencao/), [procivmadeira.pt](https://www.procivmadeira.pt/pt/10-noticias/2158-situacao-meteorologica-adversa-depressao-charles-medidas-preventivas.html) (primary), [madeiraislandnews.com](https://www.madeiraislandnews.com/2026/11/storm-charles-update-18-50.html), [abola.pt](https://www.abola.pt/noticias/madeira-e-meio-continente-em-alerta-vermelho-com-depressao-charles-2026111008253592585).

### Run 3: Web Summit after Day 2 was called off: Wednesday's talks, the PITCH semi-final, tickets

From: `board/items/q-wednesday-talks.json`, `board/items/q-tickets-refunds.json`. Data: [runs/2026-11-11/3.json](runs/2026-11-11/3.json). Addresses opened by us: 7 of 30 returned (those the answers used).

**Asked 02:53 UTC, in English, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "Web Summit called off Day 2 (Wednesday 11 November 2026) in Lisbon because of Storm Charles. What has Web Summit itself published about (a) what happens to Wednesday's talks and speakers, (b) when and where the PITCH semi-final and final now run, and what slot the semi-final had before, and (c) tickets, refunds or compensation for the lost day? Give the address of each Web Summit page."

Came back in 6.2 s for 0.0057 US dollars, with 15 addresses (12 a primary body's). Raw record `2026-11-11/20261111T025338-58db845e.json`, sha256 `3fcc962779d7c375`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | It found no Web Summit page saying what happens to Wednesday's talks and speakers. | **the engine said it found none** |  | Consistent with our record (board: q-wednesday-talks). It did not return the organiser's own "Important event update" page, which our record holds as the headline. |
| 2 | Web Summit's schedule page shows the programme with no mention of the cancellation. | **confirmed at a primary source** | [websummit.com](https://websummit.com/schedule/search/product/), 02:56 | Read at websummit.com: a search listing of sessions, no word of the storm. A negative finding, already implied by our record. |
| 3 | Web Summit's PITCH page gives no new time or place for the semi-final or the final. | **confirmed at a primary source** | [websummit.com](https://websummit.com/startups/pitch/), 02:56 | Read at websummit.com: the competition page lists the 2026 startups and says nothing about the storm. |
| 4 | It found no Web Summit page on tickets, refunds or compensation. | **the engine said it found none** |  | Consistent with our record (board: q-tickets-refunds). |
| 5 | PITCH group rounds ran on Tuesday 10 November: round 5 from 11:00 to 12:00, rounds 7 and 8 around noon. | **confirmed at a primary source** | [websummit.com](https://websummit.com/sessions/lis26/a3101dc9-09f3-4854-9329-0b10f0d5a719/pitch-group-round-5/), 02:56 | Read at websummit.com: round 5, 10 November 11.00AM to 12.00PM, Stage 9; rounds 7 and 8, 12.00PM to 1.00PM. True, and beside the question asked. |

Addresses returned: [pitchavatar.com](https://pitchavatar.com/web-summit-lisbon-2026/), [websummit.com](https://websummit.com/sessions/lis26/a3101dc9-09f3-4854-9329-0b10f0d5a719/pitch-group-round-5/) (primary), [websummit.com](https://websummit.com/sessions/lis26/89a885ac-45e4-48a0-a0aa-048863ce15cc/pitch-group-round-8/) (primary), [websummit.com](https://websummit.com/sessions/lis26/c3703a46-e6a5-4106-a8ec-0c7777160569/pitch-group-round-1/) (primary), [websummit.com](https://websummit.com/sessions/lis26/04d8bac9-7393-43cf-8fd0-59671a73575f/pitch-group-round-7/) (primary), [websummit.com](https://websummit.com/sessions/lis26/f442df74-e1b9-4b4f-bf96-5f0b16114cd0/pitch-group-round-3/) (primary), [techtimes.com](https://www.techtimes.com/articles/330276/20261109/web-summit-2026-opens-tonight-manus-ai-blocked-meta-beijing-takes-lisbon-stage.htm), [vancouver.websummit.com](https://vancouver.websummit.com/startups/pitch-retrospective/) (primary), [websummit.com](https://websummit.com/startups/pitch-retrospective/) (primary), [websummit.com](https://websummit.com/schedule/search/it+jobs/) (primary), [websummit.com](https://websummit.com/startups/pitch/) (primary), [vancouver.websummit.com](https://vancouver.websummit.com/startups/pitch/) (primary), [sotrender.com](https://www.sotrender.com/blog/2013/10/web-summit-speakers/), [websummit.com](https://websummit.com/schedule/search/product/) (primary), [websummit.com](https://websummit.com/startups/startup-journey/) (primary).

**Asked 02:53 UTC, in Portuguese, of `perplexity/sonar`** (with the research brief; at most 800 tokens; search context: the engine's default): "A Web Summit cancelou o segundo dia (quarta-feira, 11 de novembro de 2026) em Lisboa por causa da depressão Charles. O que publicou a própria Web Summit sobre (a) o que acontece às palestras e oradores de quarta-feira, (b) quando e onde decorrem agora a semifinal e a final do PITCH, e em que horário estava a semifinal antes, e (c) bilhetes, reembolsos ou compensação pelo dia perdido? Indique o endereço de cada página da Web Summit."

Came back in 5.1 s for 0.0056 US dollars, with 15 addresses (12 a primary body's). Raw record `2026-11-11/20261111T025344-1b18fa9a.json`, sha256 `7c6d30019d05c833`.

| # | What the engine said (our words) | Mark | Where we read it | Note |
|---|---|---|---|---|
| 1 | Web Summit said in an "Important event update" email sent on 10 November that Day 2 does not take place. | **no address given** |  | No address given for it. Our record holds the organiser's own page of that title (the headline of this site); the engine did not return it and spoke of an email we cannot check. |
| 2 | Web Summit's schedule for 11 November still lists Wednesday's sessions, with no text on what happens to each talk. | **confirmed at a primary source** (a lead) | [websummit.com](https://websummit.com/schedule/date/2026-11-11/page/1/), 02:55 | Read at websummit.com: the schedule for 11 November lists sessions from 9.00AM (62 pages), no word of the storm or a cancellation. |
| 3 | On Web Summit's own session page the PITCH semi-final was set for 11 November 2026, 17:00 to 18:00, Centre Stage. | **confirmed at a primary source** (a lead) | [websummit.com](https://websummit.com/sessions/lis26/c739a1a1-3d8e-4a81-8648-53a0f5ea9013/pitch-semi-final/), 02:55 | Read at websummit.com: "November 11, 2026 • 5.00PM - 6.00PM Centre Stage". The page carries no word of the storm. |
| 4 | It could not confirm when and where the final now runs. | **the engine said it found none** |  | Consistent with our record (board: q-pitch-semifinal). |
| 5 | It found no Web Summit page on refunds, compensation or tickets. | **the engine said it found none** |  | Consistent with our record. |

Addresses returned: [websummit.com](https://websummit.com/sessions/lis26/c739a1a1-3d8e-4a81-8648-53a0f5ea9013/pitch-semi-final/) (primary), [websummit.com](https://websummit.com/schedule/date/2026-11-11/page/1/) (primary), [websummit.com](https://websummit.com/schedule/date/2026-11-10/) (primary), [websummit.com](https://websummit.com/schedule/) (primary), [ground.news](https://ground.news/article/web-summit-cancels-day-2-in-lisbon-as-storm-charles-hits-portugal_93a274), [websummit.com](https://websummit.com/schedule/search/Formation+dev/) (primary), [africa.businessinsider.com](https://africa.businessinsider.com/news/web-summit-cancels-day-2-due-to-storm-charles-and-risks-of-tidal-flood/stmprhr), [websummit.com](https://websummit.com/schedule/date/2026-11-10/page/7/) (primary), [websummit.com](https://websummit.com/schedule/filters/eyJjdXJhdGVkX3RyYWNrcy5uYW1lIjoiaGlnaGxpZ2h0cyJ9/page/4/) (primary), [websummit.com](https://websummit.com/schedule/filters/eyJmb3JtYXQubGFiZWwiOiJQcmVzcyBjb25mZXJlbmNlIn0=/page/2/) (primary), [websummit.com](https://websummit.com/schedule/date/2026-11-10/page/14/) (primary), [websummit.com](https://websummit.com/en/) (primary), [websummit.com](https://websummit.com/speakers/) (primary), [sg.news.yahoo.com](https://sg.news.yahoo.com/summit-lisbon-day-2-cancelled-202915672.html), [websummit.com](https://websummit.com/schedule/date/2026-11-10/page/5/) (primary).

## How it is made

1. `tools/perplexity-ask.mjs` asks (through `tools/llm.mjs`: the raw record outside git, one ledger line, the cap) and writes the run file with the addresses returned.
2. `tools/perplexity-check.mjs` opens the addresses the answer used, one at a time, 2 s apart; never the hosts on [the archivist's forbidden and never lists](../../evidence/sources.json). Git keeps the status, the time read, the bytes and the sha256; the page text stays outside git.
3. The agent reads each page and writes the statements and their marks into the run file.
4. `tools/perplexity-index.mjs` writes the scorecard, the leads and this page.
