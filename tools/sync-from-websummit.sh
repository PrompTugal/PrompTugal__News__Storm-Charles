#!/usr/bin/env bash
# Temporary bridge (10 November 2026): until the incident agents' sessions can push here, they keep writing data/ and their
# status files in SGit-AI__Website__Web-Summit team/incidents/ (its MOVED.md); the lead copies them across with this.
# Usage: tools/sync-from-websummit.sh <path to a SGit-AI__Website__Web-Summit clone, pulled>
# Copies data/ (not signals.json: that is made from this repository's timeline) and agents/*/status.json, with paths rewritten.
set -euo pipefail
SRC=${1:?the Web-Summit clone}/team/incidents
DST=$(git rev-parse --show-toplevel)
I=incidents/2026-11-10-storm-charles
( cd "$SRC/2026-11-10-the-storm/data" && find . -type f ! -name signals.json -print0 | while IFS= read -r -d "" f; do mkdir -p "$DST/$I/data/$(dirname "$f")"; cp "$f" "$DST/$I/data/$f"; done )
for t in websummit.mjs websummit-poll.sh; do [ -f "$SRC/tools/$t" ] && cp "$SRC/tools/$t" "$DST/tools/$t"; done
for r in meteorologist researcher dev; do cp "$SRC/agents/$r/status.json" "$DST/agents/$r/status.json"; done
grep -rlZ "team/incidents" "$DST/$I/data" "$DST/agents" "$DST/tools" 2>/dev/null | xargs -0 -r sed -i 's|team/incidents/2026-11-10-the-storm|incidents/2026-11-10-storm-charles|g; s|team/incidents/tools/|tools/|g; s|team/incidents/agents/|agents/|g'
sed -i 's|(\[/incidents/the-storm/\](../../../../incidents/the-storm/index.html))|([the incident page](../README.md))|' "$DST/$I/data/README.md"
git -C "$DST" status --short
