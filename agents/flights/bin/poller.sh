#!/bin/bash
# incident.flights@ background poller (v2, 11 Nov 23:50 UTC): adsb.lol, Lisbon (250 nm) every 5 min and Madeira (150 nm) every
# 20 min: 12 + 3 = 15 requests an hour, 360 of adsb.lol's 500 a day per IP (the window resets at 00:00 UTC). --legacy (the
# earlier 40/30 nm snapshot shape that incident.transport@ and the summary read) on Lisbon's :x0 polls and every Madeira poll.
# Publishes hourly from the :00 slot.
# third session: wait for the next slot first, so a (re)start never polls twice in one slot or publishes off the hour.
now=$(date -u +%s); next=$(( (now / 300 + 1) * 300 + 15 )); sleep $(( next - now ))
cd /home/user/PrompTugal__News__Storm-Charles
while true; do
  m=$((10#$(date -u +%M)))
  L=""; [ $((m % 10)) -lt 5 ] && L="--legacy"
  node tools/flights-poll.mjs --area lisbon --root ~/flights-stage $L >> ~/flights-bin/poller.log 2>&1
  if [ $((m % 20)) -lt 5 ]; then node tools/flights-poll.mjs --area funchal --root ~/flights-stage --legacy >> ~/flights-bin/poller.log 2>&1; fi
  if [ $m -lt 5 ]; then ~/flights-bin/publish.sh >> ~/flights-bin/publish.log 2>&1 & fi
  now=$(date -u +%s); next=$(( (now / 300 + 1) * 300 + 15 )); sleep $(( next - now ))
done
