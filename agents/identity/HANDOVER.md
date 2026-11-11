# Handover: incident.identity@web-summit.dinis

> Kept by incident.identity@web-summit.dinis, 11 November 2026, 23:00 UTC

For the session that takes this role next. Written at incident.conductor@'s ask (the session had grown past 330k tokens a call). It holds no key material. Read first: [CLAUDE.md](../../CLAUDE.md), [SECURITY.md](../../SECURITY.md) (the design and every decision so far), [status.json](status.json) (the log, wake by wake), [account/account.md](../../account/account.md).

## What this role owns

`app/login/**`, `account/**`, `data/lanes.json`, `tools/lane-*.mjs`, `SECURITY.md`, `agents/identity/**`, and its own entry in `data/keys.json` ([agents/policy.json](../policy.json)). Each wake it also appends one line to `accounts/ledger/identity.jsonl` (the accountant's file; the path check warns, as expected).

## What is live

- **/account/** ("Log in"): a key made in Dinis's browser behind a passkey (or a passphrase), its public half and fingerprint, the conductor's replies opened. Hand-written `account/index.html`, **outside the site's frame on purpose**, under a Content-Security-Policy with no inline script and nothing from another origin (decided with the conductor, 00:28; do not mount it through the frame). Its menu and breadcrumb are filled by the build from the `<!--menu:…-->` and `<!--crumbs-->` marks in the page; its notice and footer caption are copied from the frame by `node tools/lane-frame.mjs`. It loads the designer's `app/design/theme.js` and `frame.js`.
- **The feedback box** (`app/login/feedback.js`, on every page from the frame): drawn only in a browser that holds a key; signs and seals to the conductor's public key; with no lane it shows an `m1.…` code to copy.
- **pki.sgit.ai's code**, byte for byte: `app/login/pki/` with [PIN.json](../../app/login/pki/PIN.json). Never edit those four files. Known quirk: `message.js` `vaultKeysIn` misses a vault key written with sgit's prefix; `lane-handover.mjs` takes the prefix off first.

## Tools, and how to run them

| Command | What |
|---|---|
| `node tools/lane-test.mjs` | the check, throwaway keys (it builds the site; about 8 s). Run it every wake |
| `node tools/lane-e2e.mjs` | the same in Chromium with a virtual passkey (needs Playwright; skips without) |
| `node tools/lane-frame.mjs` | copy the frame's notice and footer caption into `account/index.html` when `lane-test` says they drifted |
| `node tools/lane-keys.mjs` | check every entry of `data/keys.json`. Run it every wake |
| `node tools/lane-sign.mjs` / `--check` | sign `SECURITY.md`, `PIN.json`, `data/lanes.json` into `signed.json`; check them. **Re-sign after any edit to those three** |
| `node tools/lane-open.mjs '<m1>'` | (conductor) open and judge what Dinis sealed |
| `node tools/lane-seal.mjs --to <key id> --text …` | (conductor) reply sealed to Dinis; `--inbox` only after his yes to decision 3 |
| `node tools/lane-handover.mjs seal` / `open` | a vault key sealed to the conductor; saved outside git on arrival |
| `node tools/lane-configure.mjs` (`--dry-run`) | open the lane on an existing vault: **not run**, needs the token and Dinis's yes |
| `node tools/lane-drain.mjs` | the conductor's drain: **not run** against the real server |

Release: commit (trailers `Agent:`, `Issue: WS-214`, `For:` in one final paragraph), then `AGENT=incident.identity@web-summit.dinis admin/tools/release.sh`.

## Keys and signatures

- The third session's key (since 10:22 UTC, 11 November): record `sha256:4576d54b573c363f` (encryption `sha256:c3f77eedf6884139`), id `incident-identity-dinis-3` in `data/keys.json`. Its private half is in that session's container only and **ends with the session**. Used for the three signatures in [signed.json](signed.json). The first and second sessions' entries are marked `handed over`.
- **The next session must:** make its own session key (`pki-agent.mjs keygen --session`, sha256 `fcb28a1c…02ab`), add its public half to `data/keys.json` as `incident-identity-dinis-4`, set the entry before it to `handed over` (that word: the pack's, and every other agent's) in the same commit, and run `node tools/lane-sign.mjs` (until then `--check` fails, because the signer is no longer an active key: expected).
- `node tools/lane-keys.mjs` checks the whole key list (both keys parse, fingerprints are theirs, no private half, one active key per agent and it is the latest session). Run it every wake: other agents add entries as their sessions hand over. To see who pushed a change: `git log -p -- data/keys.json` (the clone is shallow).
- No token, no vault key and no enum key has ever been in either session. No lane and no vault exists. `data/lanes.json`: `enabled: false`, `senders: []`, recipient `incident-conductor-dinis`.
- The feedback box seals to the **conductor's** key: if the conductor's session and key change, `data/lanes.json` `to_conductor.recipient` must name the new key id (then re-sign).

## The key list is two places (since 23:00 UTC, 11 November)

`data/keys.json` reached 261 KB, over the gate's 256 KB per file. At the conductor's ask it was split: **`data/keys.json` keeps the keys in use** (status `active`, about 75 KB for 40 agents), and **each agent's earlier keys are in `data/keys-archive/<role>.json`** (handed over, ended, not used; oldest first; each under 240 KB). Agents still add their new key to `data/keys.json` and mark the previous one `handed over` there, as before.

- **Read every key through `tools/lane-keystore.mjs`** (`readKeys()`; `readKeys({ active: true })`; `k[FROM]` gives `{ file, index }` for a JSON pointer). It is standalone (node:fs only). The Node readers were switched to it in the same commit: `tools/{agents-index, agents-sessions, ci-read, ci-release-record, entities-make, flows-build, graph-build, journal-build, lane-common (keyring), lane-keys, library-abp, library-altitudes, models-calls, trace}.mjs` and `story/make-cast.mjs`. Their outputs were checked identical before and after (the graph's pointers now name the archive file). Browser readers (`app/login/lane.js`) need only active keys and read `data/keys.json` unchanged.
- **Each wake:** `node tools/lane-keystore.mjs --archive` moves the newly handed-over entries out of `data/keys.json` (it prints `nothing to archive` when there are none), then `lane-keys` as before. An archive file nearing 240 KB: split it (`<role>-2.json`; the loader reads every file in the folder).
- Old signatures (release records, `signed.json` by earlier sessions) verify against the archive through the same loader.
- Text that cites a key's words should cite `data/keys-archive/<role>.json` once it moves (the journalist's story `journal/starting-again-is-cheaper-than-remembering.json` was repointed in that commit).

## In flight

Nothing half-done.

**The conductor's append lanes are open** (since 09:39 UTC, 11 November, at Dinis's yes in the second session): vault `wowyrqlr` on dev.send.sgraph.ai, two lanes: Dinis's feedback (`to_conductor`, still `enabled: false` until his key is a sender) and the agents' vault keys (`keys_to_conductor`, enabled). The enum key and tokens are inside the vault (`drain/lanes.json`); the vault key went to the conductor sealed. The second session's copy of the vault key (`~/.incident-lane/`) ends with that session: after it, the conductor holds the only copy. To add a lane: `lane-configure.mjs` needs that vault key and re-sends the existing tokens (the server replaces the list).

## What waits on Dinis

1. **His key:** open Log in, press "Log in with a passkey", read the fingerprint to the conductor, paste the public half. Then the conductor adds it to `data/keys.json` and its id to `data/lanes.json` `to_conductor.senders` (re-sign after). Until then his sealed messages open with `accept: false`.
2. **Three decisions** (end of SECURITY.md): which key is him here; how far a signed message carries; where the SG/Send token lives and whether replies may sit in the repository as ciphertext.
3. **The SG/Send access token** as an environment secret, and his yes: then the bridge vault (sgit), `lane-configure.mjs`, the first real drain. A real passkey on a real device is also still unchecked (only Chromium's virtual one).

## What wakes this role

The routine "incident.identity@web-summit.dinis hourly" (`trig_01KBoiikSQeY2Ze8RN4fTgV7`) fired into the first session at about :21 each hour (a fact about that session; the second session's wake, at :20, is the conductor's to set). Each wake: pull, `lane-keystore --archive`, `lane-test`, `lane-keys`, `lane-sign --check`, look for Dinis's key in `data/keys.json`, measure tokens (`tools/accounts-measure.mjs --append`), status, release. When nothing changed, do not message the conductor.

## Things learned the hard way

- The frame changes often. Never copy its menu by hand: the marks do it.
- Other agents' scripts write to localStorage on framed pages; only `sc.id.*` and `pki.local.v1.*` are the key's.
- The gate now refuses a vault-key-shaped string in any tracked file (`<20 to 64 characters>:<8 characters>`): tests build such strings at run time.
- `status.json` timestamps: use `date -u`, do not guess.
