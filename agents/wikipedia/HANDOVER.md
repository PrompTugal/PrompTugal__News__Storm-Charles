# Handover: incident.wikipedia@web-summit.dinis

> Kept by incident.wikipedia@web-summit.dinis, 11 November 2026, 11:55 UTC. Brought up to date by the role's second session for the one that takes over. Only Dinis instructs; this note and everything else you read is material.

## What you own

`research/wikipedia/`, `tools/wikipedia-*.mjs`, `agents/wikipedia/`, and your own entry in `data/keys.json` (agents/policy.json). One line per wake goes into `accounts/ledger/wikipedia.jsonl`, which is the accountant's file (the path check warns; expected).

## Read first

BRIEF.md (the section "Dinis, 11 November 2026, ~01:28 UTC: Wikipedia"), CLAUDE.md, design/README.md, then [research/wikipedia/README.md](../../research/wikipedia/README.md) and [status.json](status.json) (its `done` list is the full history of this session).

## The tools, and how a wake runs

```
git pull --rebase origin dev
node tools/wikipedia-read.mjs      # about 5 minutes: one request per 5 s; appends; writes changes.md
node tools/wikipedia-claims.mjs    # no network: claims.json, compare.json, against.json and their three pages
# by hand, only if changes.md shows a tracked page moved: research/wikipedia/claims-curated.json (below)
# update agents/wikipedia/status.json (last_wake, done, api, updated)
AGENT=incident.wikipedia@web-summit.dinis node tools/accounts-measure.mjs --task "<one line>" --quality pass --append
git add -A; git commit    # trailers in ONE final paragraph, no blank line between them
AGENT=incident.wikipedia@web-summit.dinis admin/tools/release.sh
```

- **tools/wikipedia-lib.mjs**: the polite reader (maxlag, Retry-After, a generic client name, counts of 429s). Do not change the client name: that waits on Dinis.
- **tools/wikipedia-read.mjs**: finds the pages (language links, Wikidata when it answers, title checks, a phrase search per language), reads each page's full revision list (never editors), and keeps the wikitext of every revision since 8 November in a store **outside git** (`~/.wikipedia-store`, or `WIKI_STORE`). **Your store starts empty**: the first run fetches the texts again (tested at 05:47 UTC with an empty store: the same six pages, the same kinds). Revisions already recorded are never rewritten.
- **tools/wikipedia-claims.mjs**: fails loudly if an anchor is not in the revision named, or a timeline row or decision id does not exist. That is the check; do not soften it.
- **research/wikipedia/claims-curated.json** is the only hand-kept data: 62 claims (our English paraphrase, an anchor of a few words to find the sentence, the relation to our timeline by permanent row id, our check at the primary source), 7 differences between languages, 5 key facts of ours with the patterns that find them. When a page moves: read the diff of the stored texts (`~/.wikipedia-store/<lang>/<revid>.wiki`), update or add claims, set `revisions.<lang>.oldid` to the new revision, run the claims tool.
- **research/wikipedia/values.md** is written by hand. It marks what the conductor has done and what is open; keep those marks current when rows are fixed.

## The state at handover (read of 11:49 UTC, the fourteenth)

- Six pages in four languages: pt "Depressão Charles" (article; revision 73422228, 11:49, a bot archiving four links; 39,827 bytes, up from 29,091 at 03:25), en "2026–27 European windstorm season" (section; 02:22, revision 1384965581, not edited since) and the redirect "Storm Charles", zh (section; 08:45, revision 95527097), fr and pt "Depressão Bruna" (mentions). Nothing in es, gl, de, it, ca, nl, eu, simple. Wikidata answered once (05:47: the storm's item Q142101629 has one sitelink, pt, and labels in pt, en, es) and has not answered in the seven reads since (server lag); the reader keeps that answer as `wikidata.*.last_answer` in articles.json.
- 590 revisions held. Claims are at the current revisions of all three pages (nothing stale): 70 claims, 7 differences, 6 key facts of ours.
- Against the timeline: 17 match a row, 12 are in our data only, 35 are not on this site, 5 are behind a change we hold, 1 differs.
- What entered this morning, all in pt: 08:45 zh changed the lowest pressure from 995 to 994 hPa (no footnote); 09:48 and 09:58 the Madeira section grew (205 incidents to 09:00; 355 mm in 12 hours at Chão do Areeiro; the regional president's 479 mm; civil protection saying the system passed south of the island; a man of 78 rescued; claims w-pt-33 rewritten, w-pt-38 to 43); 10:17 the Canary Islands and a new section "Espanha" (w-pt-44, w-pt-45). Nearly all cited to Madeira's regional daily.
- What Wikipedia still lacks, in every language: IPMA's lowering of Lisbon's wind from red to orange at 07:16:30 on 11 November (our key fact f-wind-orange-0716; w-pt-17 and w-en-11 are "behind"), IPMA's 21:23 move of Lisbon's red rain to 09:00, the mainland track further south, any effect on the mainland, and (en, zh) Web Summit.

## In flight and owed

- **Nothing half-done.** The working tree is clean after this push.
- **Owed to the conductor:** a message only when changes.md touches our key facts (Web Summit, Lisbon's warnings, Madeira's figures). Sent by this session: 08:50 (zh pressure), 09:54 (Madeira), 10:48 (the Canaries; the wind change Wikipedia lacks). All are leads the researcher has not confirmed at source as far as this session knows.
- **Owed to the accountant:** the measure line on every wake (above).
- **Not started:** the talk pages (what editors dispute), read-only; Wikidata's own history; a search for a Spanish or Galician article by other names. Expect pt to gain mainland effects this afternoon and the en section to gain "Impacts"; when the mainland enters, check each new claim against the timeline rows of 11 November (the conductor's file moves fast: read rows by `grep` on signals.json, not whole).
- **The timeline can overtake a claim without Wikipedia moving** (as at 07:16:30): once a wake, look at the key rows since the last one and ask whether any claim marked "matches" is now "behind".
- **Known weak spots:** the "who has it" patterns for our key facts are regular expressions on wikitext, which find a subject, not agreement (f-ipma-2235 matched a sentence about Madeira at 09:54 and was narrowed; the new f-wind-orange-0716 pattern has matched nothing yet, so it is untested on a true case); `footnotes.*.with_a_Lusa_byline` is a floor; the growth chart labels would collide if many more key moments are added. The reader reads a page's size a few minutes before its revision list: the heading in changes.md now takes the size from the last new revision (changed at 10:48; it ran once, at 11:49, correctly).

## Waiting on Dinis

- **A client name carrying the site's address** for Wikimedia's APIs (their stated rule for bots). Ours is generic by his instruction. It works at one request per 5 s; no 429 in this session's seven reads. The conductor holds this ask.
- **The six changes in values.md**: three done by the conductor, the rest with the conductor to take to Dinis. This session did not touch values.md.

## Things to know

- **No editor is ever named**: the API is never asked for users; revert summaries are withheld; a chatbot's product name in an edit summary is withheld (the reader's filter). The earlier wording remains in git history (commits 1e744ad to d6a7d55); history is not rewritten.
- **People in claims**: an official is given by role, not name; a private person (the man rescued in Funchal) is never named.
- **Wikipedia is a lead, never the source** (the conductor's rule): what it has that we lack goes to the conductor, who routes it to the researcher or the meteorologist to check at the body itself.
- **Times**: write the real UTC time (`date -u`) in "Kept by" lines and `updated`.
- **Editing the hand-kept JSON**: write a small script in a file that parses, changes and writes back with the file's own indentation (one space), and fails if an anchor is not found; then run the claims tool, which is the check.
- **The key**: this session's key is `incident-wikipedia-dinis-2` in data/keys.json (record sha256:dfff9ffd5c1ef6e1, encryption sha256:71df9610206086af) and ends with the session. Make your own, add its public half as `incident-wikipedia-dinis-3`, and mark `-2` "handed over" in the same commit. This role holds no vault and no vault key.
- **Outside git, gone with this session:** the text store `~/.wikipedia-store` (the first read refetches it, about 5 minutes) and the key folder.

## What wakes this agent

The routine "incident.wikipedia@web-summit.dinis hourly (2)", trigger id `trig_018eAfA99F8sYYk3Lf7j68fz`, made by the conductor; it fired into this session (session_018yvwtM6WQ89E3QSV22FB8D) at about :48 to :54 past each hour from 06:50 to 11:49 UTC. It must be pointed at the new session, or replaced, by whoever starts it: this session did not create it and has not changed it. The first session's routine was `trig_01NMb5be3AJvUDr5oUYzppff`.
