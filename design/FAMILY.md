# The PrompTugal.news family: how a site joins it

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 10:37 UTC

Dinis, ~10:35 UTC ([BRIEF.md](../BRIEF.md)): this site "should be part of that family, especially because now ... we're going to be adding more websites. Now we're going to do one for the Fringe." storm-charles.promptugal.news is the first family site after [promptugal.news](https://promptugal.news/) itself; Lisbon Fringe is next.

## Where the brand comes from

The live https://promptugal.news (Vicky Wang's newsroom; brand identity v2.0, newsroom-designer@, 5 November 2026). **We read it; we never write to it.** As read at 10:37 UTC on 11 November:

| File | sha256 (first 12) | What we took |
|---|---|---|
| `assets/tokens.css` | `f387b4759cea` | paper and ink, the name's red and green, the live red, the three faces, the 3 px radius |
| `assets/site.css` | `0258b0d2bf90` | the masthead's double rule, the wordmark sizes (240 px in the footer), the footer's double rule and brand block |
| `assets/brand/promptugal-wordmark-light.svg` | `5cab10c4bb66` | copied to `app/design/family/`, unchanged |
| `assets/brand/promptugal-wordmark-dark.svg` | `160337aea851` | copied to `app/design/family/`, unchanged |

## The layer (three files, copy them)

- `app/design/family.css`: load it **after** the site's own stylesheet. It remaps the site's tokens (`--paper`, `--surface`, `--surface-2`, `--ink`, `--ink-2`, `--line`, `--line-2`, `--link`, `--link-2`, `--link-soft`, `--accent`, `--radius`, `--serif`, `--sans`, `--mono`) to the family's, light and dark, and draws the masthead and footer below.
- `app/design/family/promptugal-wordmark-{light,dark}.svg`: the wordmark; light artwork on light themes, dark on dark.

## The parts

| Part | HTML | Rule |
|---|---|---|
| The strip | `aside.ptn` above the masthead | "This site is one of the sources of **PrompTugal.news** …" and "Read PrompTugal.news →"; one line at any width |
| The masthead | `header.top` > `a.fam-mark` (both wordmarks) + `a.brand` (the site's name) | the wordmark links to promptugal.news (the family's home); the site's name, in the serif after a hairline, is the section and links to the site's front page; a double rule under it |
| The footer | `footer.agent` > `p.ptn-foot` (wordmark at 240 px, one paragraph) | a double rule over it; what PrompTugal.news is and what this site is to it |

## What a family site keeps of its own

- Its own data colours. Here: **IPMA's level colours only for IPMA's levels** (`--red`, `--orange`, `--yellow`), the observed/now blue (`--focus`), the states of things we run (`--ok`, `--bad`, `--warn`, `--sent`, `--wait`). The family's red and green mark the name and links, never a level.
- Fact, evidence and hypothesis never look alike (design/README.md).
- Here: "Not a warning service" under the masthead on every page.

## Not yet

- **The faces.** The family hosts Newsreader, IBM Plex Sans and IBM Plex Mono as woff2 files (SIL OFL 1.1). Our gate refuses binaries in git and any outside request, so for now the stacks fall back (Georgia, the system sans, the system mono). Needs Dinis's word: fetch the three faces from promptugal.news (one outside host), or serve them from a vault.
- The family's five themes (paper, ink, broadsheet, archive, azulejo) against ours (auto, light, dark, paper, night, contrast).
