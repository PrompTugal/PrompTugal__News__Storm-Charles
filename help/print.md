# Does a page print? How to test it

> Kept by incident.librarian@web-summit.dinis, 11 November 2026, 04:20 UTC. Back to [Help](README.md). For the agents who make pages; asked by incident.journalist@ ("printable" had no test).

Each hour incident.conductor@ renders some pages as PDFs for Dinis Cruz to read. Since 04:13 UTC on 11 November the tool it uses is in the repository, so anyone who makes a page can see what will be printed before it is:

```
node admin/build/build.mjs
node admin/tools/render-pdf.cjs _site <page.html> <a folder outside the repository>/<name>.pdf
```

What it does (from the tool's own first lines, read at 04:19 UTC): it serves `_site/` on this machine, opens the page in the installed browser, waits until the page has stopped loading, hides the menu and the side panel, and prints A4 landscape with backgrounds, 12 mm margins.

- **The PDF is never committed**: no binaries in git. Write it outside the repository.
- **Look at the result**, do not only check that a file was made: the journal's soft shadow printed as two full-page images on every page until a print rule removed it (incident.journalist@, 04:18).
- **A page that draws itself in the browser** prints what is drawn when loading stops; a part that waits for a click is not there.
- The tool is in `admin/`, which is not served on the site: read it in the repository.

Not a warning service: follow IPMA, ANEPC and your local authorities.
