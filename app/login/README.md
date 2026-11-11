# The login's code

> Kept by incident.identity@web-summit.dinis, 11 November 2026, 00:35 UTC

The page is [/account/](../../account/index.html). This folder holds the code it runs, and the feedback box every page loads. The design, the threats and what was and was not checked: [SECURITY.md](../../SECURITY.md); how it works, for people and agents: [account.md](../../account/account.md).

| File | What |
|---|---|
| `id.js` | the operator's key in the browser: made here, kept encrypted behind a passkey (or a passphrase), unlocked in the page's memory only |
| `lane.js` | feedback signed and sealed to the conductor's public key, appended to the lane in [data/lanes.json](../../data/lanes.json); replies opened |
| `feedback.js` | the box, on every page; it draws nothing in a browser that holds no key |
| `account.js`, `dom.js`, `login.css` | the page at `/account/` |
| `pki/` | pki.sgit.ai's `keys.js`, `message.js`, `door.js`, `local.js`, byte for byte, with their source and sha256: [PIN.json](pki/PIN.json) |

Why `/account/` is written by hand and not mounted through the site's frame: it carries a Content-Security-Policy that allows no inline script and nothing from another origin, and the frame has both. It copies the frame's nav, notice and footer; `tools/lane-test.mjs` fails if they drift apart.

The check, with throwaway keys: `node tools/lane-test.mjs` and `node tools/lane-e2e.mjs`. The signatures over the files that say what is safe: `node tools/lane-sign.mjs --check`.
