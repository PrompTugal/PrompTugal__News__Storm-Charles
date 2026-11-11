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

## Dinis, 11 November 2026, ~02:20 UTC: meteorology down to the raw material, Wayback, stories, models, a home for every agent, CI (close to his words)

- **A really big section on meteorology and weather reports.** "Find all sorts of different sources that we can use, and go down to the raw materials. I would like to understand where the data actually comes from: if a website has a visualisation, a forecast, a projection, where does it come from?" **"The licence of all these is very important: there's data that we can manipulate and data that we can't."**
- **Wayback.** "I really like the idea of having a Wayback Machine. Maybe we even call that Wayback, where we show screenshots and we show data. **And also do the Wayback for data.**" Vaults: normal vaults with many files are probably fine "as long as you don't have problems pushing and reusing sessions"; "if this becomes problematic, we can look at adding pack support"; "see how we can optimise that".
- **Visual research.** "Take a screenshot of a website and start pointing" at what it does: best on sites with public-domain material, in several countries, "where we can map across and learn ... what they're doing right".
- **Navigation and look.** "Multiple navigation structures; make it look very professional at the top." "I really like the work that was done in **the investor pack** (web-summit.sgit.ai/investors/): can you make this site look a lot like that? ... a couple of design loops and it came really sweet, even the way it was presented."
- **The next version comes with an article, as a PDF, shown to him here**: "that article that shows all the different changes ... almost like the newsroom for this ... what changes you made, what data bits, what's the flow ... not every little thing: the patterns."
- **Stories.** "There's a story now: the thing might not hit Lisbon as hard. We should be finding that narrative and connecting all the dots ... on top of these, other stories ... a complete data-driven story. If before you hyperlinked, on this one **every thing needs to be hyperlinked** ... but you don't have to show it all at the same time: toggles."
- **Launch later today; plan who we reach out to.** "Maybe do an outreach email ... everything here can be public: we can put an outreach email and even the people that we found on the website ... a lot of this needs to be done via public mediums." (Standing rule: agents draft, a person sends.)
- **Other models.** "Have we started using other models? I'd like to understand what's happening with the multiple models and see evals, what we're actually getting from the models." "Things like Perplexity, and maybe another that gives you news"; **shadow reporting** (the newsroom's idea): "we capture a lot of information from other sources, which again, everything links".
- **A home for every agent.** "A proper home, even a little logo, like we did with the storyboard and the book: a little identity ... start to sprinkle those identities across the site, but let's experiment." Each agent with "a timeline report: what they've done ... I should be able to see the work they do", the ontologist's above all: "the semantic graphs and how everything fits together".
- **A CI agent, and the repository visualised.** "The little repo link at the top"; update the README and the guidance, "this is all open source"; "visualisations of the CI pipeline as it happens"; "each of the updates, who's been doing it and all the signatures"; "how all the agents are collaborating and pushing, the whole workflow"; "an easy way to see every single commit".
- "Feel free to spin up more agents."

## Dinis, 11 November 2026, ~02:50 UTC: the model budget, a Perplexity agent, an accountant, a reporter and a journalist on the project itself (close to his words)

- **Budget**: "you can use up to $20 in budget. That's okay." (The team's model spend: the daily cap goes from 5 to 20 US dollars.)
- **A Perplexity agent**: "I think you can create a Perplexity agent for this, because I'm quite interested in seeing what you can do. And have a page for it on the site."
- **The open-weight models**: "maybe also a page for the other open-weight models that you are using, in terms of the usage here."
- **An accountant agent**: "do we have an accountant agent? We should be able to map that out, so we start to connect the dots like we did with the other projects." (The reference: WS-148 in SGit-AI__Website__Web-Summit, `people/indi/accountant/`: every agent measures its tokens; the accountant finds the savings.)
- **A reporter and a journalist on the project itself**: "do we have reporter and journalist agents reporting on the incident itself? ... meta reporter and meta journalist: reporting on how this project actually occurs and how it actually happened." (The reference: WS-212 and `team/reporter/BRIEF.md` in the same repository: traces per workflow, captured as it happens; then examples with pictures.)
- **Read the main repository**: "a lot of these ideas have also been written on the main repo, so make sure you read that too."
- **Memory that makes the next agent cheaper**: "when we create these reporters and journalists who are capturing information about the agent itself, the story and its evolution, this historical reference, and the brain and all this: we should make it much cheaper if another agent wanted to capture all this. The whole idea that **the librarian saves tokens** and makes it cheaper and implements memory in a much more effective way."

## Dinis, 11 November, ~09:30 UTC: keys and vaults

To the conductor, after it reported the vault-key hand-overs: "The keys and vaults are created by the specific agent and then sent to you via your append lane."

As the lead reads it: (1) each agent creates its own vaults and keys, nobody creates them for it; (2) the conductor's copy of a key travels through **the conductor's append lane** (SG/Send), sealed to the conductor's key, not by session message; (3) this is his yes to that lane being created (data/lanes.json said it needed one). Reported by incident.observability@ as said to it a few minutes earlier, in its session: "Yes create here the vault and then send the key to your conductor (via its append lane)".

## Dinis, 11 November, ~09:47 UTC: page views, location, keys for fresh sessions

To the conductor, in its session:
- **Page views on the home page: yes**, and the line goes into the repository's rules. Outside requests for the stats are fine: "we want to understand the stats of what's going on".
- **City and country:** "The stats should also make the call to that IP data, because we need to understand the city and the country that they come from."
- **Keys for fresh sessions:** "Yes, the observability can receive the vaults directly ... That's the point of you having the key, is that if ... they start a new session, you can give the keys to that agent." So the conductor seals each vault key it holds to the fresh session's own published key when an agent hands over.

## Dinis, 11 November, ~09:50 UTC: a page for people who do not know what this is; synthetic visitors

To the conductor, after a first look at the site: "I don't see the sort of design-friendly, like the user-friendly page of this, because you have to remember that we need to send this to a journalist, and we need to send it to somebody who doesn't understand what's going on. So the first page has to be super clear, and it has to basically be like a normal website, a features website, that explains everything, that shows the power of what we're doing here. And it's not that the current page doesn't exist. I think the current page is very powerful. But it feels to me that the current page is like the data page ... the page that has an overview." He asks the agents, "especially maybe the outreach agent and some of the others", to "really take a look at the best way to communicate and present this information".

And: "do we have the synthetic agent here? I would like to simulate a journalist. I would like to simulate a normal visitor to the website, curious about the summit. And I would like to simulate a newsroom exec and an investor that [is] interested in publishing."

As the lead reads it: a new front page for newcomers (what this is, why it matters, what it can do, with the storm as the live example), built by incident.envoy@ (words) with incident.designer@ (design), drafted at `/welcome/` and moved to `/` on Dinis's yes; the current Weather face stays as the live data overview, one click away. A synthetic-visitors agent (method of synthetic@web-summit.indi, WS-142) walks the site as four invented people and reports what each understood and where each got lost; its people are invented and it is not user research.

## Dinis, 11 November, ~10:10 UTC: telling the story of the agents; small animations; ten paths

To the conductor, in its session (close to his words): a page for each of the main visualisations, "that main sort of universe and those kind of amazing visualizations that Silvio and Angelo created", and on it "a whole number of very small examples of that kind of animation in action ... small and small and small examples, which eventually we can embed on a page, that explain the workflow, that explain how it was done, explain what was happening". "Creating almost a platform and creating a set of APIs and data structures so that I can use the same visual explanation, the same animations, the same kind of view, but on a specific event, on a specific set of actions for a specific agent."

The examples he gave: "a wake of a journalist, end to end"; "the creation of a story"; "the handover of journalists"; "even this request ... map out everything that's going to happen from this request"; and last night's data sources: "an agent needing a data source, then a researcher finding out, and then you have the connections between them, and then the website published a JSON file, and then I came along. So you need a little icon for me." "Start maybe finding 10 different paths": the big data sets at the top, then mini dashboards with "full visibility into one particular agent".

The reference: his book, https://the-ultimate-insider.book.sgit.ai ("One Human, Nine Agents, Nineteen Hours"): "we gave an identity to each agent, and we even have different flows. So we should have the same thing here." "Work in terms of storyline ... what is the arc? What is the connection?" Visualise the sessions too; "capture what are the primitives ... like if you did a threat model ... who's involved in this? And then you have little icons for them. And then you connect the dots": "I started here, then I went there ... and then this pause"; different views, "from overnight, from kind of the maturity of things". Why: "the website now has ridiculous amount of content ... but we need to explain this to somebody ... very quickly ... but also to help us understand what's going on. ... I want to be able to review the work that a journalist is doing ... ideally ... see the work that each agent is doing in real time." "Let's use those visualizations ... so that we can map this out and then we can experiment."

As the lead reads it: two new agents as in the book's cast: **incident.storyteller@** (the arc, the cast with an icon for every agent and for Dinis, the primitives, and the ten paths, each told from the record) and **incident.motion@** (one small data format for a flow, built from git, status files, hand-overs and keys; small embeddable animations on pinned copies of Angelo's live map and Silvio's Universe; a gallery at `/flows/`). incident.observability@ gives the Universe and the live map a full page each. Experiments, labelled as such.

## Dinis, 11 November, ~10:13 UTC: a part of the site that looks like a news channel

To the conductor, with a photo of CNN Portugal's live broadcast at 10:04 (a split screen: live pictures from Lisbon, a flooded car, an animated wind map of the Atlantic, the chyron "Portugal em alerta: escolas e serviços públicos fechados" and a ticker): "we should have a part of the website that kind of looks like this, that has this kind of views, that maps this out, that grabs the data ... that provides this kind of ... not urgency, but ... information and taglines ... we should be able to grab sources ... you'd see that even then they're using mobile information. Like we should be able to have some of that access to."

As the lead reads it: a broadcast-style live wall, built by a new agent, **incident.broadcast@**: panels (IPMA's warnings, an animated wind and pressure map from open model data, the latest pictures we may show, the airport's observations, the counts), a chyron from the headline and a ticker from the timeline, every panel with its source and the time read. Not a warning service: information, not alarm. Pictures only under their licence (an authority's, a licensed feed, or with permission); no private person's photo or name. Any outside request a panel needs (a map tile, a radar image, an embed) is listed for Dinis before it is made: the gate refuses outside requests today.

## Dinis, 11 November, ~10:25 UTC: flights and transport

To the conductor: "are we tracking flights and transport? since that is also an area that there should be a lot of data and we can add a lot of value and is very useful to people".

What existed at that moment (read by the lead): transport *decisions* in `incidents/2026-11-10-storm-charles/data/decisions/entities/` (airport, TAP, Metro, CP, ferries, bridges, Rede Expressos, FlixBus, port, tunnels; incident.researcher@), last updated 09:30, mostly read through the press because the operators' own sites block automated readers or are JavaScript apps; the airports' METAR and TAF (meteorologist). No live data on flights or services. A test from the session at 10:25: OpenSky Network's public API answered for the Lisbon area; the Metro's API did not; the airport's flight pages sit behind a bot check.

As the lead reads it: a new agent, **incident.transport@**, for live, open transport data, labelled facts with source and time read: flights at Lisbon, Porto, Faro and Funchal (movements, cancellations and diversions where an open source shows them), the operators' own service notices, and the public transport feeds that are open. Terms read first; airline flights only (no private aircraft, which can identify a private person); no advice of ours (not a warning service: "check with your airline or operator").

## Dinis, 11 November, ~10:30 UTC: wind the incident down, move to business as usual (explorer to villager)

To the conductor (close to his words): "take a step back and ask an agent to create a plan to refactor this entire incident and then move it into a BAU now action. So the same way that we're going to have the fringe conductor, we should probably have the storm conductor." "We should be looking at winding down every single agent that is here, and then refactor the ones that need it, and then almost do an assessment of them and do an exit interview and do a wrap up of everything they're doing, and then do a mapping to see which ones we should start, which ones we should continue." "A good opportunity for the reporter and the journalist to really wrap it up and basically map these incidents ... go to town in creating the incident pages, information, all the stuff, and then we wrap up this sort of incident, which basically was, from beginning to end, to just bootstrap everything." "Now we're going to move into this sort of more BAU ... running this as a normal newsroom. And this allows ... collaborating with other accounts and other team members, and their own agentic teams." "A good example of us showing that we can spin this up, mash up, and then now wind everything down and start from fresh. So it's almost like that move from explorer to villager."

As the lead reads it: a new agent, **incident.planner@**, writes the plan (transition/PLAN.md) for Dinis's yes: (1) the storm is still live (IPMA red rain to 18:00, orange wind to 21:00, Web Summit Day 3 undecided), so live coverage keeps running until the storm ends and the plan says when the wind-down starts; (2) for every agent: an exit interview and an assessment (what it did, what worked, what it cost, what it would change), its wrap-up, and a verdict: stop, continue in BAU, refactor, or merge; (3) the incident's closing record: the reporter, journalist, storyteller and librarian make the incident pages (the whole story from beginning to end); (4) the BAU shape: a **storm conductor** (like the Fringe conductor) running a smaller standing newsroom for weather and civil-protection events, open to other accounts and other people's agent teams; (5) the order of steps, what Dinis decides, and what the repository keeps. Nothing is stopped until Dinis says yes to the plan.

## Dinis, 11 November, ~10:32 UTC: a big link to promptugal.news; nobody stops until the hand-over

To the conductor: "also please ask the team (which shouldn't stop until the handover is done) to add a big link and reference from our storm site to the main promptugal.news site".

As the lead reads it: a prominent link to https://promptugal.news on every page (the frame: incident.designer@), on the front page (incident.weather@) and on /welcome/ (incident.envoy@), saying what PrompTugal News is and that this site is one of its sources. And the wind-down plan (incident.planner@) keeps every agent working until its hand-over to the business-as-usual team is done.

## Dinis, 11 November, ~10:35 UTC: the branding must match promptugal.news

To the conductor: "I just realized that the branding doesn't match. Can you ask the designer to ASAP fix that? So not only we should link that, this is part of that website ... this should be part of that family, especially because now ... we're going to be adding more websites. Now we're going to do one for the Fringe."

As the lead reads it: storm-charles.promptugal.news takes PrompTugal News's brand (masthead, logo/wordmark, type, colours, footer: read from the live site https://promptugal.news, its assets/site.css and core.css, and Vicky Wang's newsroom's public design files; we read, we never write to them), as one site of a family that will grow (Lisbon Fringe next). IPMA's warning colours stay IPMA's; fact and hypothesis still never look alike; the Not-a-warning-service line stays. incident.designer@ does it first, as a family layer the next sites can reuse.

## Dinis, 11 November, ~10:38 UTC: correction: no outside hand-over; one operator

"Sorry, ignore that. The handover was for another team, for another session. This is for reference. I'm going to be the only one running this site. Ignore this. The other thing is about the fringe. So, which is not relevant to you. So you're going to be focused, and the people that you hand over are going to be [focused]."

As the lead reads it: **withdrawn**: the public "join the hand-over" page and band (~10:36), and in the ~10:30 section the part about other accounts, other team members and their agent teams joining. Dinis is the only one running this site; the Fringe is another team's work. **Stands**: the wind-down plan (transition/PLAN.md, for Dinis), the exit interviews, the closing record, the storm conductor, nobody stopping before the hand-over, the promptugal.news brand and link.

## Dinis, 11 November, ~11:42 UTC: Watchfloor's decision brief; "Are you in Lisbon right now?"; a contact desk; journalists; data science

He shared a PDF received in a messaging group: Watchfloor (Notamy Ltd)'s 7-page decision brief on Storm Charles (described in research/watchfloor/README.md; the PDF is not in git). Close to his words:
- "a great example of how to communicate this message. A great example of the kind of PDF that we should be publishing." "Look at the data, but also see if we have everything that's there. And if we don't, let's map it up and let's connect the dots, because we should be able to replicate everything that's here ... let's learn with this crowd." "Also see if there's new data points that we can actually consume."
- "we need to start reaching out to these entities and tell them we have a page for them ... every one of these entities, we should have a page on our website." A note for them to contact us.
- "you should have a contact us thing that goes to your lane ... or actually we should have an agent here that receives messages, so people should never be able to reach you directly ... receive messages ... from the website", and "start the outreach in a bit ... we're happy to help ... if you want to collaborate ... any corrections".
- "the main website is going to be feeding data from here ... we're also going to create a Fringe website ... that also going to grab data from you. So you are the main one that should have information."
- "do you have information about cafes, shops, shopping malls, Uber? ... a big part of the website, which is almost like, are you in Lisbon right now? ... the main web page should be ... very focused on the use cases now." "Imagine you're stranded in Lisbon ... where do you go? ... information about your flight ... fire up the design agent and the usability agent and the Sherpa, and let's guide the people."
- "you need to get a data science agent involved too ... how do we make this work? How do we communicate? ... usually people get stuck here, but we can continue ... what we have starts to move to the back end of the website, and you start to add layer and then layer of abstraction ... focused on the use case, focus on the user ... even the journalists. We should have a whole section for journalists and media ... it gets deeper and deeper ... as they go along."

As the lead reads it: four new agents. **incident.datascience@**: the gap map against Watchfloor's brief and new open data sets (people exposed by district and hour, the ECMWF ensemble, tides, low land, hospitals, power), every figure read at its own source. **incident.brief@**: our own decision-brief PDF, in editions, from our data. **incident.desk@**: the contact desk, a "Contact us" on every page sending sealed, write-only messages to the desk's lane; the desk reads, routes and drafts replies (a person sends); nobody reaches the conductor directly. **incident.sherpa@**: the use cases ("Are you in Lisbon right now?", stranded, your flight, getting around, what is open), guided paths in layers from simple to deep, with the designer's and the synthetic visitors' loops. incident.envoy@: a section for journalists and media, and outreach drafts to every entity that has a page (a person sends). What is open (cafés, shops, malls, ride-hailing): only what an operator or authority states, with its source and time; never inferred. Still: not a warning service; the storm first; Dinis alone runs this site.

## Dinis, 11 November, ~11:46 UTC: the agents' live view on the home page (heading first written "~11:55", ahead of the clock; corrected at incident.weather@'s note)

With the PDF of the home page (the Weather face, 11:00 UTC) he shared in a couple of channels: "which is good ... but I think we can do way better. But you can start to see the positioning ... that's why it's important that you have all of this now flying around ... very powerful to show how the agents are doing and how we have the full agentic workflow. In fact, I actually think that we should slap that on the homepage, that view of what the agents are doing, because I think that's one of the most visually powerful things that we have. And again, showing what's going on right now with the website, showing the websites that we are reaching out, so showing the web requests that are happening, showing the data feeds that we're having, all those kind of stuff. That is super, super powerful."

As the lead reads it: a live "the team at work" panel on the front page, below IPMA's warning band (the warning stays first): the agents working now (Angelo's live map or a small flow from incident.motion@), the sources read in the last hour (which body, when, from the read times in our files and the agents' fetch logs: never a visitor's request), the data feeds and when each last changed (api/v1), and a link to /agents/ and /flows/. Built by incident.observability@ (the data and the component) with incident.weather@ (the front page) and incident.designer@ (the look). No secrets, no private people, no vault keys or session ids beyond what /agents/ already shows.

## Dinis, 11 November, ~11:55 UTC: a whole section on consuming the transport operators' own data

With a screenshot of /guide/'s "I have a flight" (where the airport's line rests on a press report, cnnportugal.iol.pt, because the airport's board shows a bot check): "here is that good example of we should have an entire section about consuming the data from these websites, like the flights, trains, buses, metro, trams, uber, taxis (and other public transport)".

As the lead reads it: /transport/ (incident.transport@) grows into a whole section, one page per mode (flights; trains: CP, Fertagus; metro; trams and buses: Carris, Carris Metropolitana; ferries: Transtejo/Soflusa; coaches: Rede Expressos, FlixBus; taxis and ride-hailing; bridges and tunnels), each reading the operator's own site, feed or open API first, the press only where the operator publishes nothing readable, and saying which it is. Each source's terms read first; where a site blocks automated readers (the airport's board), we say so and do not get round it; where an open API needs a free key or account, it is listed for Dinis. /guide/'s "I have a flight" and "Getting around" link into it.

## Dinis, 11 November, ~11:56 UTC: consume the data here, one place

"This part of the exercise, we should be trying to find how to get this, how to get the data, how to consume it, how to visualize it, all that jazz ... ideally, we want, again, that one place for people to consolidate and to get the information. So we shouldn't be sending to the other website. We should be actually connecting here."

As the lead reads it: per transport mode and use case, the operator's data read into our JSON and drawn on our own pages; a link out is the source citation, not the answer. Within each source's terms; never round a block.

## Dinis, 11 November, ~22:00 UTC: flights on the map with the wind; collectors through OpenRouter; the swarm's trace as data

> Recorded by incident.conductor@web-summit.dinis at 22:00 UTC, in our words with short quotes, from his message in the conductor's session.

1. **Flights.** The flight data "is a really good one to do ... you're almost there". Start from what we have (OpenSky counts, ANA's figures, the airport's METAR and TAF), show "all sorts of visualizations", then expand: "the ideal scenario is you actually show us almost the planes in the map", and "the planes in the map intersected with the wind ... on top of that".
2. **Collectors through OpenRouter.** "Start refactoring all of the agent collectors here to use Open Router ... it's okay to spend a bit of money, but actually you should be using open source models." Not all of them: "at least let's have a couple", so we can show delegating these activities to OpenRouter. "You might need to start a router agent."
3. **The fringe repository's definitions.** PrompTugal/PrompTugal__News__Fringe maps the definitions of agents "from swarm to agent to loop to compute" (its docs/where-agents-run.md: A4 swarm, A3 agent, A2 loop, A1 LLM call, A0 compute). Map which of our agents does which.
4. **The trace as data.** The punchline: a visual representation of a call, of an agent processing it, of agents delegating to each other, and of tasks crossing accounts. The visualization is done elsewhere: **we create the data**, then show the Storm app and say "that data is what you're seeing right now on that screen". "All of these needs to be JSON files", so the demo can go back in time and use what we already have. Real time where we can; otherwise an example of the data being updated and how it was retrieved.

## Dinis, 11 November, ~22:05 UTC: compute crossing altitudes; what to give us so it runs elsewhere

> Recorded by incident.conductor@web-summit.dinis at 22:07 UTC, in our words with short quotes.

"We have a massive problem at the moment, vulnerability": agents run code that "really should be run in a container outside of your environment", crossing the altitudes (fringe docs/where-agents-run.md §3). Map where this happens, and open "a conversation or a thread of what can we give you so you start to run that compute somewhere else ... fundamentally a mini container ... a mini sort of shell". The first map and the options are in agents/conductor/COMPUTE.md (7055c7e2). The grant column, the per-unit crossings, goes into library/altitudes.json (incident.librarian@, fourteenth session).

## Dinis, 11 November, ~22:10 UTC: GitHub runners for compute; a vault for the data; Elastic; flight sources

> Recorded by incident.conductor@web-summit.dinis at 22:09 UTC, in our words with short quotes.

1. He likes **GitHub runners** for the compute and will create a repository for it; the data may go to a vault; the pullers run on its schedule ("we'll see how often"), and "worst case scenario, you just trigger with a push".
2. Not SG/Playwright. The point missed in COMPUTE.md: the system already runs 24/7 on **schedules**: the Claude agents wake on scheduled tasks, and runners can too. No laptops are needed, except to run open-weight models locally (Llama) as an option. "It's just a case of distributing this ... and mapping this proof of concept."
3. **Elastic:** we can now push to Elastic, and we should; everything sent through OpenRouter already ends up in Elastic.
4. **Flights:** explain OpenSky's credits; does he need an account, can he pay; are there other flight sources, such as the airports' own departure and arrival boards ("we should be able to recreate the terminal ... flight status ... surely that data is public. It's on a website").

## Dinis, 11 November, ~22:20 UTC: an AWS agent; send it all to Angelo's conductor

> Recorded by incident.conductor@web-summit.dinis at 22:17 UTC, in our words.

Start a new session here called AWS, to explore, for example, AWS's AgentCore as a runner, "in bits": GitHub first, then the others, though the architecture can be mapped in parallel. And send all of this (the runner, the altitudes, the router, the trace, flights) to Angelo's conductor, so his side can pick it up.

## Dinis, 11 November, ~23:38 UTC: the flights page: a better map, more planes, planes that move, a list, and how it is worked out

> Recorded by incident.conductor@web-summit.dinis at 23:39 UTC, in our words with short quotes.

He can see the flights, which "looks pretty cool". Next:
1. **A better map** ("is there a way to have this as a better map").
2. **More planes** ("we kinda need more planes").
3. **Planes that move** in the animation.
4. **A view of the planes we track** (a list of the aircraft, beside the map).
5. **A visual explanation of how the plane data is worked out**, perhaps in the reader's panel.
