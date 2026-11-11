# Brief

> Dinis Cruz, 10 November 2026, in his session with incident.conductor@web-summit.dinis (close to his words). The incident team's own brief, from his voice memo of about 19:00 UTC, is in SGit-AI__Website__Web-Summit `team/incidents/BRIEF.md`.

- **A separate repository** that pushes "super fast"; its speed measured.
- **"A proxy of the flows of this activity"**: become "a data source for a lot of agencies and a lot of people about what is actually going on".
- **Two things at once:** a full news site ("this should look like CNN": images, maps, a real-time view of everything) and a site for agents: raw datasets and an API, updated at least every hour by our agents, with provenance: "the data set and the materials for others to consume".
- **Everything is a signal:** news, events, Wikipedia, social media where it can be read, every public source; a researcher finds, a curator curates.
- **Vaults for everything bulky** (captures, screenshots); be strict about what goes on the website and on GitHub, so GitHub stays fast.
- **Third-party and open-weight models** through OpenRouter, as evals: every call stored, spend tracked.
- Agents run in a loop "until the storm is over".
- The repository: `PrompTugal__News__Storm-Charles`; the domain: `storm-charles.promptugal.news` (Dinis, 10 November, ~21:00).

## Dinis, 10 November 2026, ~23:40 UTC (in his session with incident.conductor@; close to his words)

"This is where I'm going to be working for the next couple of hours": page by page, with feedback. "The website now is going to become like everything, our centre of gravity."

- **Fire up the developers and as many agents as needed**, across instances; other providers and open-weight models too (through OpenRouter and the ledger; Silvio's router idea, not yet started on his side).
- **Maximum visibility into every agent** on this site: "what every single agent is doing, how they're firing up, and how I can help them". **Reuse Angelo's and Silvio's UIs** (the live map, the Universe, the mind map, the Talk view): "there's already great stuff there".
- **Dinis talks to the conductor from the website**: an append lane; a login like pki.sgit.ai's ("reuse that code"): he logs in, vaults are made for him (a data vault and a bridge vault), he hands over the key, and data flows to him encrypted.
- **UI is the big focus**: multiple rounds of design. "Super powerful, but very practical"; very technical, "very data science", accurate; **provenance: everything linked**. Databases in the browser (as sgit.ai's SQL and SPARQL consoles), graph engines.
- **All information, documents and briefs on the site** (an admin area).
- **The home page as the weather presenter.** A researcher maps **the best weather sites, worldwide and in Portugal, and who is covering Storm Charles**.
- **Media watch**: who covers this: outlets, journalists, social accounts; the Wikipedia page. Map people, graphs and relationships, "times 10" what the summit site and pt.news did.
- **Roles wanted**: designer, cartographer, ontologist, librarian, agent management.
- **A contribute page**; get journalists and subject experts involved; find who could be asked for an official opinion, and what questions we have. (Standing rule: agents draft; **a person sends** every message outside the repositories; no contact details in git.)
- Read newsroom.sgit.ai's articles: "a lot of the stuff we talk about here is related".
- The point: "show how we can manage agents ... journalism of the future, data-driven", done by an agentic team.

## Dinis, 11 November 2026, ~00:30 UTC: the Studio (close to his words)

- **A new section, "Studio"** (as on the other site): "where we're going to be experimenting a lot of visualization and a lot of ways to explain complex data points, which we're going to have a lot here".
- **Start with one: what is compression**, and what happens in Claude, ChatGPT or others when they compress. **An animation**:
  - **a normal request**: "the context that you have is sent with every request": users often do not picture that; **one without cache, then one with cache**, to show the optimisation;
  - **why we need to compress**: "almost like that door ... it doesn't have more capacity, and then you compress";
  - **side by side with the work we do**: "we work and we create a markdown file and then save it". "The library is compression ... but compression in ways that we don't lose our context, because we create a set of files"; "we don't store the intermediate steps": a massive conversation, then a document "always going to be smaller than the conversation ... but more of a cohesive document";
  - **why things get lost**, "where you feel that the agent loses memory": when it compresses, the agent is guessing which part of the prompt to remove, what matters for the user. We do that ourselves, on purpose, "by creating documents that are specific, that are hyperlinked, that contain what actually matters". "The compression still occurs, but there's no problem because we used almost a file system as our database."
- **Look at storyboard.sgit.ai and the book for The Ultimate Insider**: the **mini characters** that explain. "Bring that to life in this studio."
- **The UI**: "a number of actions and then buttons and then the characters ... you should see almost the storyboard play out"; **on the right, the LLM** that receives. "This should be a number of animations."
