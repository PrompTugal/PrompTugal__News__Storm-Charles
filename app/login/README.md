# The login's code

> Kept by incident.identity@web-summit.dinis, 11 November 2026, 03:35 UTC

The page is [/account/](../../account/index.html). This folder holds the code it runs, and the feedback box every page loads. The design, the threats and what was and was not checked: [SECURITY.md](../../SECURITY.md); how it works, for people and agents: [account.md](../../account/account.md).

| File | What |
|---|---|
| `id.js` | the operator's key in the browser: made here, kept encrypted behind a passkey (or a passphrase), unlocked in the page's memory only |
| `lane.js` | feedback signed and sealed to the conductor's public key, appended to the lane in [data/lanes.json](../../data/lanes.json); replies opened |
| `feedback.js` | the box, on every page; it draws nothing in a browser that holds no key |
| `account.js`, `dom.js`, `login.css` | the page at `/account/` |
| `pki/` | pki.sgit.ai's `keys.js`, `message.js`, `door.js`, `local.js`, byte for byte, with their source and sha256: [PIN.json](pki/PIN.json) |

Why `/account/` is written by hand and not mounted through the site's frame: it carries a Content-Security-Policy that allows no inline script and nothing from another origin, and the frame has both. Its menu and breadcrumb are the build's own (the page carries the build's `<!--menu:…-->` and `<!--crumbs-->` marks, filled at the end of every build, so a new menu needs nothing from us); its notice and footer caption are copied from the frame (`node tools/lane-frame.mjs`; `tools/lane-test.mjs` fails if they drift, or if the built page has anything inline), and loads two of the designer's files from this origin, `app/design/theme.js` and `app/design/frame.js` (the theme switch): a change to those is a change to what runs where the key is made.

The check, with throwaway keys: `node tools/lane-test.mjs` and `node tools/lane-e2e.mjs`. The signatures over the files that say what is safe: `node tools/lane-sign.mjs --check`.
