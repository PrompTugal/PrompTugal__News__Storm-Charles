---
title: Studio
summary: Animated explanations, played as storyboards with small characters. The first: what compression is in a chat assistant, and how this team works so that it does not matter.
mount: <div id="studio" data-base="animations/"><noscript><p class="meta">The player needs JavaScript. The same, scene by scene as text, is below.</p></noscript></div>
head: <link rel="stylesheet" href="../app/studio/studio.css"><script src="../app/studio/characters.js" defer></script><script src="../app/studio/player.js" defer></script>
---
# Studio

> Kept by incident.studio@web-summit.dinis, 11 November 2026, 00:36 UTC

Where this site experiments with ways to show complex things: animations with small characters, played as storyboards, scene by scene. At Dinis Cruz's word ([BRIEF.md](../BRIEF.md), 11 November 2026). These are explanations, our own analysis in general terms: not news, and not a warning service.

## The animations

- **[What compression is](#what-compression-is)**: What travels to the model each time you say something to a chat assistant, what a cache changes, why a full conversation gets compressed, what is lost when it is, and how this team works so that the loss does not matter. 2 chapters, 15 scenes. Data: [animations/what-compression-is.json](animations/what-compression-is.json).

How to add one: [animations/README.md](animations/README.md). The player: [app/studio/player.js](../app/studio/player.js); the characters: [app/studio/characters.js](../app/studio/characters.js).

## What compression is

The same storyboard as text: every scene, in order, with its caption. An explanation in general terms that hold for chat assistants: the context is sent with each request; a cache reuses an unchanged beginning; a full window is summarised or cut. It describes no one product's internals. Block sizes are an illustration, not a measurement. At Dinis Cruz's word (BRIEF.md, 11 November 2026).

### 1. A normal request

1. Three characters. You, on the left. In the centre the app: the chat program, which keeps the conversation. On the right the model, which reads what it is sent and writes an answer. Before you type anything the app already holds two things: its instructions and the descriptions of its tools.
2. You say one thing. The app adds it to the bottom of the conversation.
3. The app sends the model everything it holds: the instructions, the tools and your message. The model reads all of it, top to bottom.
   request 1 carries 5 blocks; 5 read at full cost.
4. The answer comes back and joins the conversation. The model keeps nothing: once it has answered, the only copy of the conversation is the one the app holds.
5. Your second message is short. What travels is not: the whole conversation goes again, and the model reads all of it again, including everything it read a moment ago.
   request 2 carries 7 blocks; 7 read at full cost.
6. To answer, the app read a file. The file's text is now part of the conversation as well, and it is much longer than anything you typed. *Simplified: reading a file is itself one or more requests. Here it is folded into one turn.*
7. Third message. The pile has grown, and all of it is sent and read again. Each turn costs more than the last and usually takes longer, because each one carries everything before it.
   request 3 carries 12 blocks; 12 read at full cost.
8. That is a request with no cache. You typed three short lines; the model read 24 blocks to answer them, most of them more than once. This is the picture to keep: the context is sent with every request.

### 2. The same, with a cache

1. The same conversation, the same three messages. This time the service that runs the model keeps a cache: for a while, it remembers the work it did on a beginning it has already read.
2. First request: the cache is empty, so nothing can be reused. Everything is read at full cost, exactly as before, and the work is kept.
   request 1 carries 5 blocks; 5 read at full cost.
3. Second request. The beginning is exactly what was sent a moment ago, so it is recognised and the work on it is reused: cheaper and quicker. Only what has been added since is read at full cost.
   request 2 carries 7 blocks; 2 read at full cost, 5 reused from the cache.
4. Third request: the same again. The unchanged beginning is longer now, so more is reused. The new end (the file, an answer, your message) is read at full cost.
   request 3 carries 12 blocks; 5 read at full cost, 7 reused from the cache.
5. What the cache changed: cost and time. Over the same three requests the model read 12 blocks at full cost instead of 24. The reused part is usually charged at a lower rate, not at nothing; how much lower differs from one service to another.
   request 3 carries 12 blocks; 5 read at full cost, 7 reused from the cache.
6. What it did not change: the conversation is exactly as long. All of it still travels with every request, the model still works from all of it, and all of it still counts against a fixed limit, the context window. A cache makes a long context cheaper. It does not make it shorter.
   request 3 carries 12 blocks; 5 read at full cost, 7 reused from the cache.
7. And a cache only matches an unchanged beginning. Change something early (here, one line of the instructions) and everything after it is read at full cost again. Leave the conversation alone for long enough and the cache expires: the next request starts cold.
   request 4 carries 14 blocks; 14 read at full cost.

### What this simplifies

- Blocks are an illustration. Real context is counted in tokens (pieces of words), and one file can outweigh a hundred messages. No size here was measured from a real conversation.
- One turn is drawn as one request. A turn in which the assistant uses tools is several requests, each carrying the whole context so far, so the re-reading is greater than drawn.
- The cache is drawn as all or nothing per block. Real caches differ from one service to another: what can be cached, the smallest size, how long it is kept, whether you must ask for it, and what a reused part costs. None of those details is stated here.
- "Read at full cost" and "reused" describe cost and time. With or without a cache the model's answer depends on the whole context it was sent.
