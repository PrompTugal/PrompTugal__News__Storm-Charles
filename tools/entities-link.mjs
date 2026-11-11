#!/usr/bin/env node
// entities-link: the linker, as the build's "after" step (admin/build/generators.json): node tools/entities-link.mjs --out <dir>.
// It is tools/entities-build.mjs --out <dir> --link: one tool, two moments (the pages before the build renders them, the links after).
if (!process.argv.includes('--link')) process.argv.push('--link')
await import('./entities-build.mjs')
