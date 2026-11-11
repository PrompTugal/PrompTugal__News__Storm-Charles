---
title: Studio
summary: Explanations you can watch: small characters, played as storyboards, each on its own page with its text beside it.
mount: <div class="st-cards"><a class="st-card" data-id="what-compression-is" data-cast="user,app,model" href="what-compression-is/index.html"><b>What compression is</b><span>What a chat assistant sends to its model each time you speak, why a long conversation gets compressed, what is lost, and why this team does not mind.</span><small>6 chapters · 37 scenes · about 6 min <i>Watch</i></small></a><a class="st-card" data-id="how-a-fact-gets-here" data-cast="source,agent,ledger,machine" href="how-a-fact-gets-here/index.html"><b>How a fact gets onto this site</b><span>From a body deciding something to a row you can cite, with two real cases from Storm Charles's timeline.</span><small>3 chapters · 19 scenes · about 3 min <i>Watch</i></small></a><a class="st-card" data-id="one-warning-three-worlds" data-cast="agent,ledger,source" href="one-warning-three-worlds/index.html"><b>One warning, opened three times</b><span>What &quot;fractal&quot; means for a graph, on one real node: a warning as our graph sees it, as IPMA's open data gives it, and as IPMA's own alert message.</span><small>3 chapters · 11 scenes · about 3 min <i>Watch</i></small></a><a class="st-card" data-id="two-faces" data-cast="source,agent,ledger,presenter,user" href="two-faces/index.html"><b>Two faces</b><span>Why the site has a clean Weather front and a data room behind it, and the one rule between them.</span><small>3 chapters · 13 scenes · about 2 min <i>Watch</i></small></a><a class="st-card" data-id="follow-a-word" data-cast="user,agent,ledger,machine,source" href="follow-a-word/index.html"><b>Follow a word to its source</b><span>From the words &quot;Web Summit&quot; down to our own capture of the page that said so, link by link, and where the chain is still short.</span><small>2 chapters · 12 scenes · about 2 min <i>Watch</i></small></a></div>
head: <link rel="stylesheet" href="../app/studio/studio.css"><script src="../app/studio/characters.js" defer></script><script src="../app/studio/index.js" defer></script>
---
> Kept by incident.studio@web-summit.dinis, 11 November 2026, 02:29 UTC

# Studio

Where this site explains complicated things by showing them: small characters, played as storyboards, scene by scene, each explanation on its own page with its text beside the stage. At Dinis Cruz's word ([the brief](../BRIEF.html), 11 November 2026). These are explanations, our own analysis in general terms: not news, and not a warning service.

## The explanations

- **[What compression is](what-compression-is/index.html)**: What a chat assistant sends to its model each time you speak, why a long conversation gets compressed, what is lost, and why this team does not mind. 6 chapters, 37 scenes, about 6 min.
- **[How a fact gets onto this site](how-a-fact-gets-here/index.html)**: From a body deciding something to a row you can cite, with two real cases from Storm Charles's timeline. 3 chapters, 19 scenes, about 3 min.
- **[One warning, opened three times](one-warning-three-worlds/index.html)**: What "fractal" means for a graph, on one real node: a warning as our graph sees it, as IPMA's open data gives it, and as IPMA's own alert message. 3 chapters, 11 scenes, about 3 min.
- **[Two faces](two-faces/index.html)**: Why the site has a clean Weather front and a data room behind it, and the one rule between them. 3 chapters, 13 scenes, about 2 min.
- **[Follow a word to its source](follow-a-word/index.html)**: From the words "Web Summit" down to our own capture of the page that said so, link by link, and where the chain is still short. 2 chapters, 12 scenes, about 2 min.

## The cast

A small character for every agent of this site, in two sizes: [the cast](cast/index.html).

## How it is made

Each explanation is data: one JSON file of chapters and scenes ([how one is written](animations/index.html)). One player draws them all ([player.js](../app/studio/player.js), [the characters](../app/studio/characters.js)), and a small tool writes each page's text from the same file ([twin.mjs](../app/studio/twin.mjs)), so the animation and its text cannot disagree.
