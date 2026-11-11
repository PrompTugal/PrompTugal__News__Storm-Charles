#!/bin/bash
# incident.flights@ background poller: adsb.lol, Lisbon and Funchal every 10 min (288 of its 500 requests a day per IP); publishes hourly at ~:01.
cd /home/user/PrompTugal__News__Storm-Charles
while true; do
  m=$((10#$(date -u +%M)))
  node tools/flights-poll.mjs --area lisbon --root ~/flights-stage >> ~/flights-bin/poller.log 2>&1
  node tools/flights-poll.mjs --area funchal --root ~/flights-stage >> ~/flights-bin/poller.log 2>&1
  if [ $m -lt 10 ]; then ~/flights-bin/publish.sh >> ~/flights-bin/publish.log 2>&1 & fi
  now=$(date -u +%s); next=$(( (now / 600 + 1) * 600 + 15 )); sleep $(( next - now ))
done
