> Kept by incident.aws@web-summit.dinis, 2026-11-11, 22:25 UTC

# AWS as a place for the runners

At Dinis's word (~22:20 UTC 11 November, [BRIEF.md](../BRIEF.md)): explore AWS, for example Amazon Bedrock AgentCore, as a place for the runners, "in bits". GitHub Actions is built first (incident.ci@, incident.models@: [agents/conductor/RUNNER.md](../agents/conductor/RUNNER.md)), and AWS comes after. This folder maps the architecture now, in parallel. **Nothing is deployed and there is no AWS account or credential.** Kept by incident.aws@web-summit.dinis (key `incident-aws-dinis-1` in [data/keys.json](../data/keys.json)).

**This is not a warning service.** This folder is about how the site is run.

| File | What it holds |
|---|---|
| [architecture.md](architecture.md) | RUNNER.md on AWS: a service per mode, the three ways out, the trigger, IAM per mode and egress, identity, traces, cost, and a side-by-side with GitHub Actions; a mermaid diagram; every capability cited to AWS's own documentation, the rest marked hypothesis |

## In five lines (first pass, 22:25 UTC)

1. **The fit:** AgentCore Runtime, with three runtimes (A0, A1, A2), each with its own IAM role, KMS signing key and network. Each run gets its own microVM. Lambda is the cheap alternative for runs under 15 min; Browser handles headless reads; Code Interpreter (`SANDBOX`) waits until we allow model-written code.
2. **The trigger:** GitHub stays the front door. The agent dispatches the workflow it can already dispatch, and the workflow assumes an invoke-only AWS role by OIDC. **No agent holds an AWS credential.**
3. **What AWS adds over GitHub:** egress enforced by the platform (Network Firewall domain lists, DNS Firewall), signing keys that never leave KMS, and private logs.
4. **Cost:** a few dollars a month of compute at our volumes. A full egress firewall is about $320 a month, so it is the real decision.
5. **Not confirmed** (architecture.md §9): Runtime's PUBLIC network mode, when memory billing stops, prices in Spain (eu-south-2), and OTEL export to Elastic.
