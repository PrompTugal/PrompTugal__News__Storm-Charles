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

## Dinis, 11 November 2026, ~01:28 UTC: Wikipedia (close to his words)

"This is pretty cool ... we have a lot of good meat on this and good information to start going to the next level." Feedback on many pages follows; "another pass and multiple passes on how everything fits together".

- **Start a Wikipedia agent.** "A complete section with a separate folder, separate data set, for Wikipedia, to track everything that's there that is related to this storm", as on the other sites (the newsroom's work on Wikipedia).
- **Several languages, especially Portuguese: compare them**: "the facts, the materials", what one has that the other does not.
- **Wikipedia's values**: "in the newsroom ... we also mapped the Wikipedia values, which is also what we should be doing here. We should be measuring ourselves into the whole evidence of Wikipedia."

## Dinis, 11 November 2026, ~02:10 UTC: two faces, everything linked, evidence captured (close to his words)

**Read first** (he names them; every agent reads them before building): *thinking in graphs*, "meaning through connectivity" (https://graphs.sgit.ai/llms.txt); *Fractal Semantic Graphs*, "the multiple layers" (https://sgit.ai/demos/fractal-graphs/index.md and https://newsroom.sgit.ai/articles/introducing-fractal-semantic-graphs.html); the newsroom's guidance (https://newsroom.sgit.ai/llms.txt); sgit.ai's guidance and vaults "where we have done similar parts of this" (https://sgit.ai/docs/guidance/llms.txt, https://sgit.ai/demos/vaults/llms.txt): the version number at the top, the five themes, markdown shown in the page.

**Two faces.**
- "Create a complete new homepage right now ... a more user-friendly page ... almost like a commercial element." "This should literally look like a weather channel ... like BBC Weather ... very clean, very professional, a set of data. But only focused on Storm Charles."
- What we have now "is all the evidence ... the reference materials to build that": it becomes "the data room, or something else". **The visual face uses only data from the data section**; the data section is the one that consumes from other places; our other websites will use the visual face's parts.
- "Really expand the top menu and have a lot more subsections ... almost different subsites."

**Everything is linked: "a mini Wikipedia", as data.**
- "Every word here needs to have a reference." "Graphs of graphs of graphs of graphs. And we need to do multiple rounds of this until we get it correct."
- "When you have a phrase that says evidence, I should be able to click on evidence. Web Summit, I click on Web Summit. Wednesday, 11 November, I click on that day. The government ... formally advised ... tidal flooding, public transport, high winds ... ANEPC and PSP ... Day 3, Thursday 12 November: we should have a page for that." The Vasco da Gama bridge, the Metro: "where's everything about the Metro?" Three cruise calls cancelled: "all this becomes data that we can link." "All of that should be JSON files."
- "It needs to be fractal: I should be able to connect until I arrive at the last source. And the last source should be a page about the evidence that we have." Every hypothesis and every piece of evidence "needs to have a semantic graph" ("who warned first: red wind, IPMA 07:18: you need the link to this").
- "Kept by incident.meteorologist@ ...: that's a link." Every link to a markdown or JSON file opens a page that **shows it** (there is guidance for this), never the bare file.
- "When you link to somebody, it should be obvious that I'm going to another website. And first I should have gone to the page of that website that we have here."

**Use the whole width; a panel of settings on the right.**
- "You need to use the entire width of the page." "A settings on the right-hand side ... where I get to choose what I see": a mode that shows all the facts; "we did one where we colour-coded the evidence, the links, the names, the entities". Boxes on the right (the left too if needed), **in accordions** "so it doesn't overwhelm". A source clicked on the timeline opens on the right, connected.
- "Improve the design: it feels quite crude ... very user-friendly." The five themes of the sgit.ai sites; the version number at the top.

**Evidence: capture every external page; vaults.**
- "Every time we go to an external website, you need to capture the screenshot of that website and the hash of that website." A link such as "Important event update" goes to **our page of it**: the screenshots, "what that looked like at that moment in time", "a Wayback Machine kind of style"; when we research again, check the page still looks the same.
- **Two vaults**: (1) the researcher's vault, every page's HTML and hash, "nicely indexed by source and by date", **in pack mode** ("only store the zip files of all the commits, or else you get 10,000, 20,000 files"); a packed vault cannot be read from the web; (2) a vault made normally, for the screenshots and evidence the pages show, "nicely organised", not everything. Past about 10,000 files, start a new vault. Any agent may create a vault; **the conductor holds a copy of each key**; "then we'll see if we need to keep it".
- **Data sets**: a folder per data set with `latest/` (overwritten) and beside it dated folders (year/month/day/hour), the file saved in both, "maybe just a diff for now"; the site reads the data **from a vault**, "it shouldn't come from here". Keep the big feeds and **their diffs over time** ("what changed over time on these massive warning feeds").
- Map **the licence** of every source: "can we access it, can we manipulate it?" (Público and Wikipedia differ).

**Sources become sections, with their own agents.**
- **MeteoAlarm**: a page for meteoalarm.org: browse its feeds (the JSON, the XML), "the swagger of this", what else is under its API.
- **IPMA**: "a really cool ... feed ... this open data project": "start a new agent for IPMA and build a complete new visualisation, a section, a data analysis ... even a complete set of agents (dev, designer, meteorologist, data scientist)". Every JSON under api.ipma.pt/open-data, the cities, the ocean: "I really, really like this."
- "Every one of these entities needs a folder." "We're looking for the places where we can add ridiculous value ... a visualisation that didn't exist before. You're making mappings for the future."
- **Bluesky**: "let's create a whole Bluesky bit", with screenshots; an account can be made if needed.

**Page by page.**
- **Still open** (what nobody has said): "move this into a Kanban, project-management workflow"; each open question "almost a mini project" we track, linked to its evidence.
- **Timeline**: its own page; "multiple experiments of different timelines ... a whole section"; "way better visualised"; use a big screen.
- **Decision graph**: "a complete new section with all sorts of decision graphics"; each node clicks through to its evidence. **Lead times**: liked ("actually quite cool"); not a graph, its own part, everything clickable.
- **Weather**: "lots of these"; the hour-by-hour "is exactly the kind of visualisation I'd like", a couple more design rounds; projections; still "very technical": the technical view stays in the data room.
- **Signals, hypotheses**: liked; all linked; "public" links to the screenshot.
- **Data**: the list on the right and **a visualiser on the left for every file**, with its schema; "go down the rabbit hole until I run out of data". **Query**: "I love the query ... we need to then do something with it."
- **Graph**: "a good example of so what": many more options (layouts, add and remove, click everything), the ontology visualised; "the graph as a list" all linked.
- **Help**: a whole section. **Articles**: "every time you push a change ... an article" explaining the new features, the changes, the diffs, "a visual walkthrough" (pictures in a vault), not only a commit list.
- **For agents**: "probably should be called LLMs".
- **Studio**: "worked really well, we need more"; each explanation its own page inside the Studio; a maximise button; documentation that "feels natural on the UX".
- **Media, weather sites**: visualise; screenshots of all; a page per outlet and per site (what they use, what we can learn, how to reach them, the licence); "the list of all these people ... who should we connect to"; a page for each "who" in the gap table; the ten ideas for the home page: "try it out and then we see".
- **Provenance of agents**: "everything is PKI": follow any piece of work to the agent, when it ran, which session, which conductor, "which version of me"; where missing, mark it. "A whole history of those agents."
- **Agents** (the live map, the Universe): liked; "what is the point? I need to click on this"; why is an agent blocked; **Stop does not stop** (a bug); connect to every commit; see the flows. **Jobs**: "a lot of reviewing and much more visual". **Account**: "should be log in". **Contribute**: sharper: a task list (send data, validate, research). **Design**: about the design of this site itself, with more visual elements.
