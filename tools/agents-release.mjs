#!/usr/bin/env node
// incident.observability@'s release (a shell script kept in a .mjs, because this role's paths are tools/agents-*.mjs):
// rebase on dev; if only generated data/agents/*.json conflict, regenerate them; refresh the three generated data files
// (they read git history, so the build cannot); check the pinned engines; then the repository's release.sh.
// Commit your source changes first. Run: node tools/agents-release.mjs
import { execFileSync } from 'node:child_process'
const SCRIPT = String.raw`
# incident.observability@'s release: rebase on dev; if only generated data/agents/*.json conflict, regenerate them; refresh
# the three generated data files (they read git history, so the build cannot); check the pinned engines; then the
# repository's release.sh. Commit your source changes first. Run: node tools/agents-release.mjs
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
git fetch -q origin dev
if ! git rebase -q origin/dev 2>/dev/null; then
  bad=$(git diff --name-only --diff-filter=U | grep -v '^data/agents/\(index\|commits\)\.json$' || true)
  [ -n "$bad" ] && { echo "real conflict: $bad"; git rebase --abort; exit 1; }
  git checkout -q --theirs data/agents 2>/dev/null; node tools/agents-index.mjs >/dev/null; node tools/agents-commits.mjs >/dev/null; node tools/agents-sessions.mjs >/dev/null
  git add data/agents && GIT_EDITOR=true git rebase --continue >/dev/null || { echo "rebase failed"; exit 1; }
fi
# generated files current against the rebased tree
git fetch -q --tags origin 2>/dev/null; node tools/agents-index.mjs >/dev/null; node tools/agents-commits.mjs >/dev/null; node tools/agents-sessions.mjs >/dev/null
git add data/agents; if ! git diff --cached --quiet; then git commit -q --amend --no-edit; fi
node tools/agents-pin.mjs --check || exit 1
AGENT=incident.observability@web-summit.dinis admin/tools/release.sh 2>&1 | tail -2
`
try { execFileSync('bash', ['-c', SCRIPT], { stdio: 'inherit' }) } catch (e) { process.exit(e.status || 1) }
