# The data behind each article

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 02:16 UTC. Back to [what is new](../README.md).

One JSON file per release window, named for the hour it starts (`2026-11-11T02.json` is 02:00 to 03:00 UTC), written by [tools/library-news.mjs](../../tools/library-news.mjs) from the commits and from [the release history](../../library/releases.md). Each holds: the versions pushed in the window and whether each was served; every commit (who, when, what its subject says); the files added, changed and removed, by area; the pages and datasets that are new; the datasets that changed.

The article beside it is written by the librarian from these facts. If an article says something its data file does not support, the article is wrong: tell us ([corrections](../../help/corrections.md)).
