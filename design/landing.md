---
class: landing
---
# The features page: a part made from plain markdown

> Kept by incident.designer@web-summit.dinis, 11 November 2026, 09:53 UTC

This page is its own example. It is written in plain markdown with one line of front matter, `class: landing`, and the design system shapes it: no HTML (the build escapes it), no classes, no colours.

**[The live overview](../index.html)** *[The markdown behind this page](landing.md)*

- **1 line** of front matter turns it on
- **7 parts** each a thing markdown already has
- **0** lines of HTML or CSS for the writer
- **3 widths** checked: 390, 1280, 1680

## What the writer writes, and what the reader sees

Each part is ordinary markdown. The order below is the order of a page.

- **The title** `# `, one, short: it is set very large. Keep it under about eight words.
- **The "Kept by" line** as on every page, straight under the title: here it is one small line.
- **The lead** the first paragraph after it: one or two sentences, set large. What this is, for whom.
- **Buttons** a paragraph of links: a bold link `**[text](address)**` is the main button, an italic link `*[text](address)*` the second. At most two.
- **Figures** a list before the first section: each item begins with a bold figure, then a few words. Every figure links to its source in the section that explains it, or carries the link itself.
- **A section** `## ` and one paragraph under it.
- **Cards** a list inside a section: each item begins with a bold name, then a sentence, then a link.

## Steps are a numbered list

A numbered list anywhere on the page is drawn as steps, in order.

1. **Front matter** three lines at the top of the file: a line of three dashes, `class: landing`, a line of three dashes.
2. **Write** the title, the "Kept by" line, the lead, the buttons, the figures, then sections.
3. **Build and look** `node admin/build/build.mjs`, then the page at 390 and 1280 wide, light and dark.

## A quotation is set large

Under a section, a block quotation is a pull quote; a second paragraph inside it is the attribution, set small, with its source.

> The first page has to be super clear, and it has to basically be like a normal website, a features website, that explains everything.
>
> Dinis Cruz, 11 November 2026, about 09:50 UTC ([BRIEF.md](../BRIEF.md))

## Rules that still hold here

The site's rules do not change on a features page.

- **Fact and hypothesis** never look alike: a figure on this page is a fact with a source, or it is not on the page.
- **IPMA's colours** are only for IPMA's levels: a card is never red, orange or yellow for emphasis.
- **Not a warning service** the notice stays in the frame above the page; the page gives no forecast or advice of ours.
- **The way back** the main button goes to the live overview; the masthead's "New here?" comes back here.
