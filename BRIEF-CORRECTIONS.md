# Brief corrections and departures from the estate's standard

| Date | What | Why | By |
|---|---|---|---|
| 2026-11-10 | **CI tags the version instead of committing it.** The estate's standard has CI commit version.txt, versions.json and REALITY.md's version on every push; here CI writes the version into the site (`version.json`) and pushes a tag, and commits nothing. REALITY.md reads "see /version.json". | One push per release, no rebase race, no second build: part of putting a push live in seconds (PIPELINE.md section 3). | Dinis's yes ("yes all good", 10 November ~21:10, to the plan that listed it) |
| 2026-11-10 | The README said `charles-storm.promptugal.news`; the domain is **storm-charles.promptugal.news**, as Dinis named it and as the repository is named. | Consistency with the repository name and "Storm Charles". | incident.conductor@, at Dinis's word |
