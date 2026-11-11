# Security: Dinis's login, his lane to the conductor, his vaults

> Kept by incident.identity@web-summit.dinis, 11 November 2026, 09:39 UTC. At Dinis Cruz's word of 10 November, ~23:40 UTC ([BRIEF.md](BRIEF.md)). A design, then what is built; each section says which. Reused, unmodified and pinned by sha256: pki.sgit.ai's `keys.js`, `message.js`, `door.js`, `local.js` ([app/login/pki/PIN.json](app/login/pki/PIN.json)). The lane is SG/Send's append lane, as promptugal.news uses it for page views.

**The ground rule.** This is a static site: no server of ours, no account database, no cookie, no session token. Everything secret is made in a browser or an agent's session and stays there; everything that travels is sealed to a public key first (sgit's hybrid v2 envelope: RSA-OAEP 4096 wraps a fresh AES-256-GCM key; signatures ECDSA P-256). `sgit pki decrypt` opens the same envelope.

## a. Dinis's identity, in his browser

- **What it is.** A key pair made in his browser at `/account/` (`keys.js generate`). The private half is kept in that browser's localStorage, encrypted with AES-256-GCM under a key derived from a **passkey** (WebAuthn PRF → `door.js doorFrom` → `local.js`). A browser without PRF falls back to a passphrase (PBES2, PBKDF2 210 000 rounds, `keys.js encryptPrivate`). Unlocked, the key lives in the page's memory only, until the tab closes.
- **Public:** his public bundle (two public keys, a label, two fingerprints), in `data/keys.json` once he has read its fingerprint to the conductor in his own session. The fingerprint, compared on a channel he already trusts, is what says the key is his; the page cannot prove it alone.
- **A stolen device, locked:** nothing without the passkey's user verification (or the passphrase; a weak one can be guessed offline).
- **A stolen private key** signs feedback as Dinis and reads what was sealed to him. The answer: he makes a new key, the old entry in `data/keys.json` is marked `revoked`, the conductor stops accepting it at its next wake. There is no recovery of a lost key and none is needed: make another, read out its fingerprint.
- **The real weak point: the site's own JavaScript.** Whoever can push to `dev` can change the code that holds his key (every agent here can). So: `/account/` is written by hand, outside the site's frame, so that it loads only same-origin modules under a Content-Security-Policy that allows no inline or third-party script (the frame has an inline script and other agents' scripts; every other page, where the box also unlocks the key to sign, has no such policy); the pinned files are checked against their sha256 by `tools/lane-test.mjs`; the page shows the version it runs. This lowers the risk and does not remove it: a key made on this site is worth what `dev`'s review is worth. That is why it is a key for **feedback on this site**, not his master key.

## b. The feedback box (Dinis → conductor)

- **What travels.** `message.js compose`: his text, the page's URL and the site version as the subject, the time, an expiry (7 days), `to` = the conductor's signing fingerprint, signed by his key; then sealed to the conductor's encryption key (`data/keys.json`, the entry `data/lanes.json` names). The browser POSTs the ciphertext to `…/api/vault/append/write/<vault>` with an **append token** that can only write.
- **Public, on purpose** (`data/lanes.json`): the endpoint, the vault id, the append tokens, the recipient's public key.
- **A stolen (that is, read) append token** lets anyone add ciphertext or junk to the lane, or fill it (the server answers 507; the sender tries the next token). It cannot list, read or delete. So the conductor **acts only on a message whose inner signature verifies against Dinis's key in `data/keys.json`**, not expired, addressed to it, not seen before (it keeps the ids); everything else is counted and dropped, never read as an instruction.
- **The drain** needs the lane's enum key and the conductor's private key, both outside git. A stolen enum key lists and fetches ciphertext and can mark it processed (a message hidden: denial, not disclosure). A stolen conductor key reads the feedback. The conductor's key is a session key: when its session ends, `data/lanes.json` must name the new one, and anything still sealed to the old one is lost (Dinis sees "not yet read" at `/account/` and sends again).
- **Until the lane exists** the box shows the sealed text (`m1.…`) to copy into his session with the conductor: ciphertext, safe to paste.
- **Instructions.** "Only Dinis instructs" holds: a verified lane message is from whoever holds his browser key. The conductor treats it as his word for feedback on pages and content. Anything hard to undo (a token, `main`, a deletion, spending, a message to a third party) is confirmed in his own session first.

## c. The reverse path (conductor → Dinis)

- The conductor composes, signs with its key and seals to Dinis's bundle (`tools/lane-seal.mjs`). `/account/` opens it with his unlocked key and shows whether the signature is the conductor's (`data/keys.json`).
- **Delivery, two ways (his decision 3):** as ciphertext in this repository (`account/inbox.json`: public, small, no token; anyone sees that a message exists, when, and its size, and can keep the ciphertext for ever), or through a second append lane on his bridge vault (only he lists it; needs the vault and its enum key in his browser).
- **Never on this path:** a vault key, a token or anything personal. Secrets are handed over the way pki.sgit.ai's `handover.md` says, sealed, to a fingerprint compared first.

## d. His data vault and bridge vault (as on pki.sgit.ai)

- **Bridge vault:** carries the two lanes and small sealed files between him and the conductor. The conductor holds its write key and enum key (outside git). **A stolen bridge key** reads only ciphertext sealed to someone's key, and can delete or flood it.
- **Data vault:** what the agents make for him that is too bulky or not for the public site (captures, screenshots, reports). He holds the key; an agent that must write gets the key sealed to its public key, for its session. **A stolen data key** reads and rewrites all of it: so nothing personal and no secret goes in; press captures in it are a licence matter, not a secrecy one.
- **Creating either needs an SG/Send access token and his yes.** Not built until then. The token is never in git, in a status file, or in chat.

## e. Vaults the agents make (Dinis's yes, 11 November, ~02:10 UTC)

Any agent may create a vault with `sgit`; the conductor holds a copy of each key ([BRIEF.md](BRIEF.md), last section; the three kinds are in [RESTRUCTURE.md](RESTRUCTURE.md)). A vault key reads **and rewrites** everything in its vault, so:

1. **A vault key is never written** in a tracked file, a commit message, a page, a status file, a log or a command line. An agent keeps it in a file outside the repository, mode 0600, or in its environment. In git a vault is named by its id only.
2. **Only read keys are published**, in one place, `data/vaults.json` (incident.archivist@'s), in sgit's own form (`sgit_public_read_…`), and only for a vault made to be shown. A read key reads everything in the vault for ever: nothing goes into a display or data vault that could not be on the site. A capture vault (raw pages, press) has no published key.
3. **The key goes to the conductor once, sealed, through the conductor's append lane** (Dinis, 11 November, ~09:30 UTC, [BRIEF.md](BRIEF.md): "The keys and vaults are created by the specific agent and then sent to you via your append lane"): `VAULT_KEY=… node tools/lane-handover.mjs seal --via-lane` seals the key to the conductor's public key, signs it with the sender's session key and appends it to the lane for keys (`data/lanes.json` `keys_to_conductor`: an append token is public and can only write). Nothing is printed but the vault id. The conductor's drain (`node tools/lane-drain.mjs`) opens it, saves the key to a 0600 file outside git and prints the vault id and the sender only; a key from a signer that is not an active key in `data/keys.json` is not saved, and nothing that arrives on that lane is ever read as an instruction. The lane is open since 09:39 UTC on 11 November (vault `wowyrqlr`, made by incident.identity@ at Dinis's yes in its session; what a drain needs is inside the vault, so whoever holds that vault's key can drain). Only that vault's own key went to the conductor the old way, once: `lane-handover.mjs seal` without `--via-lane` prints an `m1.…` code, which travelled by session message and was opened with `lane-handover.mjs open`. A key pasted in the clear into a session message stays in two transcripts: if that has happened, treat the key as known to whoever can read them, and say so in the status file. The sender's status file records the vault id and "key sent", never the key.
4. **The conductor's copy** is as strong as its session: it is the one place that holds every key. It keeps them outside git, and when its session ends the copies end with it unless Dinis has them; his copy is sealed to his key (section a) or kept by him.
5. **A leaked key** is not revoked by deleting the commit (history and the served site keep it): the vault is replaced (a new vault, the content copied, the old one destroyed), and `data/vaults.json` updated.

**What the gate blocks today** (`admin/build/validate.mjs`): a private-key PEM; tokens of five known shapes; `sgit_write_…` and `sgit_admin_…`; anything under `.sg_vault/` or `.sg-send/`. **What it does not block, and should** (both tried against this tree on 11 November, 02:20 UTC: no false match):

```
/sgit_private_[a-z]+_[A-Za-z0-9]/                 a vault key with sgit's prefix
/\b[a-z0-9]{20,64}:[a-z0-9]{8}\b/                 a bare vault key: <passphrase>:<vault id>
/(^|\/)(vault-key-[^\/]*|[^\/]*\.vault-key|access-token\.json|[^\/]*\.key)$/     on the path: a key saved into the tree by mistake
```

A published read key keeps its `sgit_public_read_` prefix and is not matched by the second pattern; a read key written bare would be, which is right: publish it in sgit's form.

The gate reads files, not commit messages: the same two patterns belong in `tools/policy-check.mjs` over the messages of the commits about to be pushed (incident.librarian@'s). And the gate does not know the shape of an SG/Send access token: that one is kept out by rule 1 alone.

## What we will not build

- No server, no passwords kept anywhere, no cookies, no tracking of who is logged in; no IP or place lookup.
- No third-party script on `/account/` or in the feedback box; no copy of a private key, vault key or token in git, logs, or chat.
- No feedback box for the public behind this login: readers use the contribute page; this lane is one person's.
- No agent acting on text from the lane that is not signed by his published key; no agent treating a signed message as leave for something hard to undo.
- No custom cryptography: only the pinned pki.sgit.ai modules over Web Crypto.

## Dinis's three decisions

1. **Which key is you here?** A new key made on this site behind a passkey (works today; recommended, as a key for this site only), or signing in with your pki.sgit.ai key (`sso.js`: a delegation to this browser at this origin; needs your key in the register first).
2. **How far does a signed message from the box carry?** Recommended: it is your word for feedback on pages and content; anything hard to undo is still confirmed in your session.
3. **The token, and where replies sit.** Either you put an SG/Send access token in the conductor's environment as a secret (agents create the bridge and data vaults and seal their keys to you), or you type it only in your browser at `/account/` and the vaults are made there (pki.sgit.ai's way; more code to bring over, later). And until the bridge vault exists: may the conductor's replies sit in this public repository as ciphertext sealed to your key?

## Built, and checked how

- **Built (10 and 11 November):** [/account/](account/index.html), a log-in first (the key behind a passkey or a passphrase, its public half, the replies), `app/login/feedback.js` (the box), `tools/lane-open.mjs`, `lane-seal.mjs`, `lane-drain.mjs`; [how it works](account/account.md).
- **Checked with throwaway keys:** `node tools/lane-test.mjs` (the pins; accepted only when signed by a named sender; refused when unsigned, a stranger's, expired, replayed, re-addressed or changed) and `node tools/lane-e2e.mjs` (Chromium, a virtual passkey: make, seal, the POST opened by a throwaway conductor, the reply opened, no Content-Security-Policy error).
- **Ready, not run:** `tools/lane-configure.mjs` (opens the lane on the bridge vault) and `lane-drain.mjs`, written to [SG/Send's append-lane reference](https://sgit.ai/api/append-lanes.md) (read 10 November 2026, 23:55 UTC) and checked against a stand-in built from it. Against the real server only what needs no credential was tried: it allows this site's origin to POST, and answers an unknown token or a missing key with 404, as the reference says.
- **Not checked:** a lane on the real server (none exists), a real passkey on a real device. **Not built:** the lane, the vaults, sign-in with pki.sgit.ai.
- **The lane's limits, from the reference:** 1000 pending messages a token (then 507: the box tries the next token), 5 MB a message (ours: 4000 characters). The enum-key holder sees each lane's raw token; the server sees when something is written and how large, never what.
- **Signed:** this file, the pins and `data/lanes.json` carry this agent's detached signature ([agents/identity/signed.json](agents/identity/signed.json); `node tools/lane-sign.mjs --check`). It says which session key signed the bytes, not that they are right: the author of this threat model also built what it models, so a second reader is still wanted.
- **For vault keys:** `tools/lane-handover.mjs` (seal to the conductor, open and save outside git), checked with throwaway keys in `lane-test.mjs`. One thing found on the way, for pki.sgit.ai's maintainers: the pinned `message.js` v0.2.28 does not find a vault key written with sgit's prefix (`vaultKeysIn`: a word boundary is asked for after an underscore); our tools take the prefix off first, the pinned copy is not edited.
- The state, and what is asked of Dinis: [agents/identity/status.json](agents/identity/status.json).
