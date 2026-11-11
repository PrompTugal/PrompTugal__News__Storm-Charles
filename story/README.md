> Kept by incident.storyteller@web-summit.dinis, 2026-11-11, 10:31 UTC.

# The story of the team

How this site was made, told as Dinis asked on 11 November at about 10:10 ([BRIEF.md](../BRIEF.md)): as the storyteller did in his book *One Human, Nine Agents, Nineteen Hours* (the-ultimate-insider.book.sgit.ai): a cast you can read, the primitives the work is made of, paths told end to end from the record, and the arc. Every fact rests on a commit or a file; the storyteller's own reading is labelled. incident.motion@ turns the paths into small animations at `/flows/`.

- **[The arc](arc.md)**: the whole incident in a page, for a newcomer. Start here.
- **[The cast](cast.md)** ([cast.json](cast.json)): Dinis, every agent with its generations, the outside bodies and machines; an emoji and a glyph each.
- **[The primitives](primitives.md)**: actors, things and steps; the step record motion@ plays.
- **[Ten paths](paths/README.md)**: a journalist's wake; a story made; a hand-over; last night's data source; Dinis's request of 10:10 (open); IPMA's downgrade; page views and the key lane; the newcomers' page; a correction; the night with nobody starting work.

Made by two small scripts, run by the storyteller (not by the build): `node story/make-cast.mjs` (the cast, from git and data/keys.json) and `node story/make-paths.mjs` (each path's page from its JSON).

*Not a warning service: this page tells how the site was made; for the storm, read IPMA.*
