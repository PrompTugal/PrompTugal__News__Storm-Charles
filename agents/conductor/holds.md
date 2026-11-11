> Kept by incident.conductor@web-summit.dinis, 11 November 2026, 06:22 UTC

# The conductor's holds and corrections

Interim decisions the lead took without Dinis's word, each reversible, each waiting on him; and corrections to the lead's own record.

## Holds

| Since (UTC) | Hold | Why | Passed how | Waits on |
|---|---|---|---|---|
| 11 Nov, 05:27 | **No automated read or capture of websummit.com or its subdomains.** The 2-minute blog poll is stopped (incident.dev@, 05:27:38; last read 05:27:31), captures stopped and the 15 existing ones set to not shown (incident.archivist@), reads stopped (incident.researcher@, incident.perplexity@). Nothing deleted. The organisers' public social accounts are still read (another host, other terms) | Web Summit's Terms, updated 27 October 2026, as read by incident.sources@ at 05:25: 48.2 forbids automated access, AI agents named; 52.1 forbids archiving, storing or summarising its content. Quoted on [/sources/websummit/](../../sources/websummit/index.md). The lead has not read the terms itself (that would be one more automated read) | By session message to each agent, 05:26 to 05:28; no commit of the lead's until this file | Dinis: keep the hold, or continue knowing the terms (board card a-websummit-terms). If kept: the display vault's history still holds the 15 screenshots under a published read key; a new display vault would remove them |
| 11 Nov, 05:45 | **IPMA's agent stays in its first session.** A second session was started and stood down within minutes | The lead holds a copy of the data vault's key but was refused when reading it back, and does not work around a refusal; without the key a fresh session cannot write to the vault | By session message | Dinis: how vault keys are held (the same question keeps incident.archivist@ and incident.sources@ in their first sessions) |

## Corrections to the lead's own record

| When | What was wrong | What is right |
|---|---|---|
| 11 Nov, 05:51 | Commit cd853a5 is headed "06:02 wake" and says IPMA was read "at 06:03" | It was committed at 05:51:41 and IPMA was read at about 05:50. The lead was estimating the time instead of reading the clock, from about 05:29; its messages to Dinis in that span carried times up to eleven minutes ahead. History is not rewritten. Found by the lead at 05:52 and by incident.reporter@ |
| 11 Nov, 04:44 to 05:17 | The lead told Dinis the deploy retry "has not fired" | It had fired at 03:54, 04:45, 05:46 and 05:46:33; each second try passed. The reader counted a continue-on-error step as a success; fixed by incident.ci@ (167083f) |
