# Security: Dinis's login, his lane to the conductor, his vaults

> incident.identity@web-summit.dinis, 10 November 2026, at Dinis Cruz's word of ~23:40 UTC ([BRIEF.md](BRIEF.md)). A design, then what is built; each section says which. Reused, unmodified and pinned by sha256: pki.sgit.ai's `keys.js`, `message.js`, `door.js`, `local.js` ([app/login/pki/PIN.json](app/login/pki/PIN.json)). The lane is SG/Send's append lane, as promptugal.news uses it for page views.

**The ground rule.** This is a static site: no server of ours, no account database, no cookie, no session token. Everything secret is made in a browser or an agent's session and stays there; everything that travels is sealed to a public key first (sgit's hybrid v2 envelope: RSA-OAEP 4096 wraps a fresh AES-256-GCM key; signatures ECDSA P-256). `sgit pki decrypt` opens the same envelope.

## a. Dinis's identity, in his browser

- **What it is.** A key pair made in his browser at `/account/` (`keys.js generate`). The private half is kept in that browser's localStorage, encrypted with AES-256-GCM under a key derived from a **passkey** (WebAuthn PRF → `door.js doorFrom` → `local.js`). A browser without PRF falls back to a passphrase (PBES2, PBKDF2 210 000 rounds, `keys.js encryptPrivate`). Unlocked, the key lives in the page's memory only, until the tab closes.
- **Public:** his public bundle (two public keys, a label, two fingerprints), in `data/keys.json` once he has read its fingerprint to the conductor in his own session. The fingerprint, compared on a channel he already trusts, is what says the key is his; the page cannot prove it alone.
- **A stolen device, locked:** nothing without the passkey's user verification (or the passphrase; a weak one can be guessed offline).
- **A stolen private key** signs feedback as Dinis and reads what was sealed to him. The answer: he makes a new key, the old entry in `data/keys.json` is marked `revoked`, the conductor stops accepting it at its next wake. There is no recovery of a lost key and none is needed: make another, read out its fingerprint.
- **The real weak point: the site's own JavaScript.** Whoever can push to `dev` can change the code that holds his key (every agent here can). So: `/account/` loads only same-origin modules, under a Content-Security-Policy that allows no inline or third-party script; the pinned files are checked against their sha256 by `tools/lane-test.mjs`; the page shows the version it runs. This lowers the risk and does not remove it: a key made on this site is worth what `dev`'s review is worth. That is why it is a key for **feedback on this site**, not his master key.

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

- **Built (10 November):** [/account/](account/index.html) (the key behind a passkey or a passphrase, its public half, the replies), `app/login/feedback.js` (the box), `tools/lane-open.mjs`, `lane-seal.mjs`, `lane-drain.mjs`; [how it works](account/account.md).
- **Checked with throwaway keys:** `node tools/lane-test.mjs` (the pins; accepted only when signed by a named sender; refused when unsigned, a stranger's, expired, replayed, re-addressed or changed) and `node tools/lane-e2e.mjs` (Chromium, a virtual passkey: make, seal, the POST opened by a throwaway conductor, the reply opened, no Content-Security-Policy error).
- **Not checked:** the real SG/Send server (no lane exists; the drain ran against a stand-in), a real passkey on a real device, and the box on every page (it needs one line in the build's page frame). **Not built:** the lane, the vaults, sign-in with pki.sgit.ai.
- The state, and what is asked of Dinis: [agents/identity/status.json](agents/identity/status.json).
