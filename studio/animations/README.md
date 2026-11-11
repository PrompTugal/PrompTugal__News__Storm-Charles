# The Studio's animations: how one is written

> Kept by incident.studio@web-summit.dinis, 11 November 2026, 03:54 UTC

An explanation is one JSON file here, listed in [index.json](index.json) (with `line`, the one line on its card, and `cast`, the characters drawn on it). The player ([app/studio/player.js](../../app/studio/player.js)) draws it on its own page, `studio/<id>/`; [app/studio/twin.mjs](../../app/studio/twin.mjs) writes that page and [the Studio's index](../index.html) from the same data. To add one: write the file, add it to the list, run `node app/studio/twin.mjs`.

Links inside an explanation (`href`) are written relative to its page, `studio/<id>/`: `../../BRIEF.html`. A page's address takes `#chapter/scene`, both as numbers from 1 (`#3/2`), not the chapter's id.

## The file

| Field | What |
|---|---|
| `id`, `title`, `summary`, `about` | its name in the address, and what it explains |
| `by`, `updated` | who keeps it, and when it last changed (UTC) |
| `chapters` | each a short storyboard: `id`, `title`, `blocks`, `scenes`; optionally `window`, `cast`, `names` |
| `simplifies` | what the animation leaves out; shown as its last chapter. Every animation has one |
| `sources` | files read for it: `name`, `href`, `size`, `read` (UTC) |

## A chapter

- `blocks`: the pieces of a conversation, by id: `label`, `note` (shown beside it on a wide screen), `u` (its height in blocks, default 1), `kind` (`system`, `tools`, `file` or a turn).
- `window`: the context window, in blocks. When set, a doorway of that height stands between the app and the model, and what does not fit is hatched.
- `cast`: who stands `left`, `centre` and `right` (characters in [characters.js](../../app/studio/characters.js): `user`, `app`, `model`, `agent`, `fresh`); `names`: what each is called.

## A scene

| Field | What |
|---|---|
| `caption` | the sentence or two read under the stage; `note` for a simplification made in this scene |
| `say` | who says what: `left`, `centre`, `right` |
| `mood` | `idle`, `talk`, `read`, `puzzled`, `glad`, per position |
| `stack` | the conversation the app holds, oldest first: block ids, each optionally with a state after a colon (`q1:new`, `sum:summary`, `rule:lost`, `sys:changed`, `doc:doc`, `x:saved`) |
| `send` | present when the conversation travels to the model: `n` (which request), `cached` (how many leading blocks are reused from a cache), `blocked` (it does not fit the window) |
| `files` | what is on the file system: `name`, `href`, `size`, `note`, `state` (`new`, `read`) |
| `lanes` | two stages side by side (one above the other), each with a `title` and the fields above |
| `dur` | milliseconds to hold the scene when playing (otherwise from the caption's length) |
| `measured` | figures that are real measurements, shown in a ruled box under the picture (never as blocks): each `v` (the figure), `k` (what it is a measurement of, in a sentence), `href` and `src` (its file, through the viewer: `../../view/?path=<path>`), `read` (UTC) |

The player counts, per chapter, what each request read at full cost and what it reused; a caption that quotes a figure must agree with those sums (the text twin prints them under each scene).

## Rules

Tokens, not hex colours; red, orange and yellow are IPMA's warning levels and are never used here ([design/README.md](../../design/README.md)). A state is said in a word on the block as well as by its look. Describe mechanisms in general terms that are true of chat assistants; state no product's internals or numbers; name no models. Every figure that is a real measurement carries its source and the time read.
