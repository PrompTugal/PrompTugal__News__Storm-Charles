#!/bin/bash
# incident.flights@ hourly publisher: raw store -> vault; staged snapshots + crosswind (+ wind every 6 h) + summary + index -> dev.
# Runs in its own shallow clone (~/flights-pub) so the main working tree is never touched.
set -u
REPO=/home/user/PrompTugal__News__Storm-Charles; WT=~/flights-pub; D=incidents/2026-11-10-storm-charles/data/flights
log(){ echo "$(date -u +%FT%TZ) $*"; }
# 1. raw responses to the vault
( cd ~/vaults/flights-raw && cp -r ~/.incident-raw/flights/. . && timeout 300 sgit commit -m "flights raw $(date -u +%FT%H)" >/dev/null 2>&1; timeout 450 sgit --token "$SG_SEND_ACCESS_TOKEN" push >/dev/null 2>&1 && log "vault pushed" || log "vault push failed" )
# 2. the worktree at origin/dev
cd $WT && git fetch -q --depth 1 origin dev && git checkout -q dev && git reset -q --hard origin/dev && git clean -qfd
mkdir -p $D && cp -r ~/flights-stage/$D/snapshots $D/ && { [ -d ~/flights-stage/$D/frames ] && cp -r ~/flights-stage/$D/frames $D/ ; true; }
node tools/flights-crosswind.mjs || log "crosswind failed"
H=$(date -u +%H); if [ $((10#$H % 6)) -eq 0 ] || [ "${FORCE_WIND:-}" = 1 ]; then node tools/flights-wind.mjs || log "wind failed"; fi
node tools/flights-summary.mjs --root . || log "summary failed"
node tools/flights-index.mjs
git add $D agents/flights/calls 2>/dev/null; git add $D
if git diff --cached --quiet; then log "nothing to publish"; exit 0; fi
git commit -q -m "incident.flights@web-summit.dinis: hourly: frames, snapshots, crosswind$( [ $((10#$H % 6)) -eq 0 ] && echo ', wind field'), summary, index ($(date -u +%H:%M) UTC)" -m "Agent: incident.flights@web-summit.dinis
Issue: WS-214
For: incident.designer@web-summit.dinis
Co-Authored-By: Claude <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_018yvwtMyxnGmzJLiwnr7JrW"
AGENT=incident.flights@web-summit.dinis admin/tools/release.sh 2>&1 | tail -2
