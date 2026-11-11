---
title: Query the storm
summary: A database in your browser over Storm Charles's data: SQLite (WebAssembly) on the decisions, warnings, signals, sources and actors, each row with its source and the time read. No server; nothing is uploaded.
mount: <div id="query" data-base="../graph/"><p class="meta">This needs JavaScript. The same data, as files: <a href="../graph/index.html">data/graph/</a>.</p></div>
head: <link rel="stylesheet" href="../../app/graph/graph.css"><script src="https://newsroom.sgit.ai/assets/vendor/sql-wasm.js" integrity="sha384-7Zym2PlgXfg8ap8cqJUwlZrLl+VEwt0NVbzYfhH28IWLnSpAgQOnSCY2+EXo5MtM" crossorigin="anonymous"></script><script src="../../app/graph/query.js" defer></script>
---
## How this page works

> Kept by incident.graph@web-summit.dinis, 11 November 2026, 00:29 UTC

This page is a database that runs in your browser. It loads this site's JSON, builds eight tables in memory, and runs the SQL you write. There is no server behind it: nothing is uploaded, nothing is written, and the database is gone when the tab closes. Kept by incident.graph@web-summit.dinis. Not a warning service: it queries what was decided and warned, and when we read it.

## The engine

- **SQLite**, compiled to WebAssembly: [sql.js](https://sql.js.org/) 1.14.2 (MIT licence), the engine [newsroom.sgit.ai's SQL console](https://newsroom.sgit.ai/databases/sql.html) uses, **loaded from where the newsroom loads it** (`newsroom.sgit.ai/assets/vendor/`). Nothing of it is committed here.
- **Pinned by hash.** The script carries an integrity attribute (sha384); the WebAssembly file (658 KB, sha256 `38c14f6e…670a`) is fetched, hashed in your browser and run only if the hash is the pinned one. If the newsroom changes the file, this page says so and does not run it.
- The newsroom also runs SPARQL (Oxigraph). This page is SQL only for now; the graph's nodes and edges are tables here (`nodes`, `edges`), so graph questions are joins.

## The tables

| Table | Rows are | From |
|---|---|---|
| `timeline` | the lead-time line: warnings and decisions in order, with the hours between them | [tables/timeline.json](../graph/tables/timeline.json) |
| `decisions` | decisions and issued warnings: `by`, `decision`, `at`, `at_epoch`, `status`, `follows` | [tables/decisions.json](../graph/tables/decisions.json) |
| `warnings` | warnings: `phase` is issued, in_force, cap (IPMA's own messages, with the time sent and what each replaced) or history; `level`, `area`, `starts`, `ends` | [tables/warnings.json](../graph/tables/warnings.json) |
| `signals` | the timeline, with `publisher` | [tables/signals.json](../graph/tables/signals.json) |
| `sources` | every URL read, its publisher, `cited_by`; `coverage` for the pages covering the storm | [tables/sources.json](../graph/tables/sources.json) |
| `actors` | bodies, operators, the organiser, outlets | [tables/actors.json](../graph/tables/actors.json) |
| `nodes`, `edges` | the graph itself | [storm.json](../graph/storm.json) and [storm-elsewhere.json](../graph/storm-elsewhere.json) |

Every row has `label` (fact, evidence, hypothesis), `source` (URL), `read` (UTC) and `origin` (the file and place it came from). Times are UTC text (`2026-11-10T19:09Z`); `*_epoch` columns are the same time in seconds, present only when the time is known to the minute, so differences are plain arithmetic. [The ontology](../graph/README.md) says what each thing is.

## The eight questions

### 1. What was decided, by whom and when?

Every decision that has happened, oldest first. read_after_min is how long after the decision we read it at its source (empty when the decision's time is known only to the day). The label says whether it was read on the decider's own channel (fact) or reported by others (evidence).

```
SELECT at, by_name AS decided_by, decision, label,
       (read_epoch - at_epoch) / 60 AS read_after_min,
       source
FROM decisions
WHERE kind = 'decision' AND status = 'happened'
ORDER BY at IS NULL, at;
```

### 2. How long after the first warning was each decision?

Two clocks: hours since IPMA's first communiqué named the storm, and hours since IPMA sent its red wind warning for Lisbon (IPMA's own time, from its CAP message; if that file has none, the time we first read the warning). Time order, not cause.

```
WITH first_warning AS (SELECT MIN(at_epoch) AS t FROM decisions WHERE kind = 'warning'),
     red_wind AS (SELECT COALESCE(
         (SELECT MIN(at_epoch) FROM warnings WHERE phase = 'cap' AND level = 'red' AND warning_type = 'Vento'),
         (SELECT at_epoch FROM decisions WHERE id = 'warning:ipma-red-wind')) AS t)
SELECT d.at, d.by_name AS decided_by, substr(d.decision, 1, 100) AS decision,
       round((d.at_epoch - first_warning.t) / 3600.0, 1) AS h_after_first_warning,
       round((d.at_epoch - red_wind.t) / 3600.0, 1) AS h_after_red_wind_sent,
       d.label, d.source
FROM decisions d, first_warning, red_wind
WHERE d.kind = 'decision' AND d.at_epoch IS NOT NULL
ORDER BY d.at_epoch;
```

### 3. How far ahead could we have known?

One line of time: every warning and decision with a time known to the minute, in order. h_since_previous is the gap to the row above; h_before_red_starts is how long before the first red warning starts in Lisbon; h_before_effect is how long before the row's own effect starts. For IPMA's colour warnings the time is when IPMA sent the message, not when anyone read it. Order, not cause.

```
SELECT at, who, substr(what, 1, 90) AS what,
       h_since_previous, h_before_red_starts, h_before_effect,
       time_is, label, source
FROM timeline
ORDER BY n;
```

### 4. Which sources were fastest?

Each publisher with a signal on the timeline: when its first signal came, how many it has, and how many hours that first signal was ahead of the start of the red warnings in Lisbon (the earliest start of a red warning in force for area LSB). Only signals whose source has a URL count; relayed signals without one are in the signals table with publisher empty.

```
WITH red AS (SELECT MIN(starts_epoch) AS t FROM warnings WHERE phase = 'in_force' AND area = 'LSB' AND level = 'red')
SELECT a.name AS publisher, a.kind, COUNT(*) AS signals,
       MIN(s.at) AS first_signal,
       round((red.t - MIN(s.at_epoch)) / 3600.0, 1) AS h_before_red_starts,
       MIN(s.source) AS a_source
FROM signals s JOIN actors a ON a.id = s.publisher, red
GROUP BY a.id
ORDER BY MIN(s.at_epoch);
```

### 5. What followed what, and how long after?

The graph as rows: every 'precedes' edge between two decisions or warnings, with its lead time in minutes where both times are known to the minute. This is the chain from IPMA's communiqué to Web Summit's decision. Order, not cause.

```
SELECT a.at AS earlier_at, substr(a.name, 1, 70) AS earlier,
       e.lead_minutes,
       b.at AS later_at, substr(b.name, 1, 70) AS later,
       e.label, e.source
FROM edges e
JOIN nodes a ON a.id = e."from"
JOIN nodes b ON b.id = e."to"
WHERE e.rel = 'precedes' AND e.lead_minutes IS NOT NULL
ORDER BY b.at, a.at;
```

### 6. What is still not announced, and what is only our hypothesis?

Decisions that were due but not announced when last read, sources we could not read, and our own hypotheses (always labelled, never stated as fact), each with when it was last read.

```
SELECT status, label, by_name AS who, decision, read AS last_read, source
FROM decisions
WHERE status IN ('not_announced', 'expected', 'unknown')
ORDER BY CASE status WHEN 'not_announced' THEN 0 WHEN 'unknown' THEN 1 ELSE 2 END, by_name;
```

### 7. Which warnings changed, and how long before they started?

IPMA's own CAP messages for the Lisbon district (phase = 'cap'): every Update, when IPMA sent it, how many hours that was before the warning's start, and what it replaced. was_level and was_starts are filled only when the replaced message is still in the feed we read; replaced_sent is always IPMA's own time for the message it replaced. A negative h_before_start means the update came after the start.

```
SELECT w.at AS sent, w.warning_type, w.level, w.starts, w.ends,
       round((w.starts_epoch - w.at_epoch) / 3600.0, 1) AS h_before_start,
       w.replaces_sent AS replaced_sent,
       p.level AS was_level, p.starts AS was_starts,
       w.label, w.source
FROM warnings w LEFT JOIN warnings p ON p.id = w.replaces
WHERE w.phase = 'cap' AND w.msg_type = 'Update'
ORDER BY w.at_epoch;
```

### 8. Which decisions cite which warning?

Every decision the researcher linked to a warning it followed (the 'precedes' edges from a Warning to a Decision), with the minutes between them where both times are known to the minute. The link is the researcher's reading of the decision's own words or of the order of events; the label is the decision's. Order, not cause.

```
SELECT b.at AS decided_at, substr(b.name, 1, 80) AS decision,
       a.at AS warning_at, substr(a.name, 1, 80) AS warning,
       e.lead_minutes, e.label, e.source
FROM edges e
JOIN nodes a ON a.id = e."from" AND a.type = 'Warning'
JOIN nodes b ON b.id = e."to" AND b.type = 'Decision'
WHERE e.rel = 'precedes'
ORDER BY b.at IS NULL, b.at, a.at;
```

## For an agent

Open the page, wait for the `tool:ready` event on `document`, then `window.__tools.sql.run(sql)` returns `{ columns, rows, ms }`; `window.__tools.sql.schema()` lists the tables. Or skip the page: the tables are plain JSON at the paths above, and the queries are in [queries.json](../graph/queries.json). A query can be linked: `index.html#q=<the SQL, URL-encoded>`.

## What it does not do

- It does not forecast or advise. Follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/).
- It does not prove cause: "after" is time order.
- "Fastest" means the earliest signal on our timeline from a publisher with a linked source; a publisher we did not read is not there.
