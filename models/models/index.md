---
title: The models, one by one
summary: A page for each model used on this site, the open-weight ones first: who publishes it, its licence, every job we gave it, its scores, tokens, cost and latency.
---

# The models, one by one

> Kept by incident.models@web-summit.dinis, 11 November 2026, 02:59 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](../index.md).

Each model's page says what it is (its publisher, whether its weights are open, its licence as the publisher states it and what that allows), every job we gave it here, its scores with the items it got wrong, its tokens, cost and latency, and what we would use it for. "Open-weight" means OpenRouter's model list gives a Hugging Face address for the weights; the licence is read at that address (2026-11-11 02:52 UTC), and a licence tag is not legal advice: the linked text decides. Figures: [results.json](../results.json), made 2026-11-11 02:59 UTC.

## Open-weight, small

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [Google: Gemma 3 4B](google--gemma-3-4b-it.md) `google/gemma-3-4b-it` | Google | Gemma Terms of Use (Google's own terms) | 48/78 | 0 | 55508 | 10111 | 0.00287 |
| [OpenAI: gpt-oss-20b](openai--gpt-oss-20b.md) `openai/gpt-oss-20b` | OpenAI | Apache License 2.0 | 65/75 | 4 | 42262 | 45376 | 0.00942 |
| [Mistral: Ministral 3 8B 2512](mistralai--ministral-8b-2512.md) `mistralai/ministral-8b-2512` | Mistral AI | Apache License 2.0 | 39/106 | 0 | 147329 | 9559 | 0.0219 |
| [Qwen: Qwen3.5-9B](qwen--qwen3.5-9b.md) `qwen/qwen3.5-9b` | Alibaba (Qwen) | Apache License 2.0 | 106/166 | 15 | 142791 | 164245 | 0.0403 |

## Open-weight, large

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [Google: Gemma 4 31B](google--gemma-4-31b-it.md) `google/gemma-4-31b-it` | Google | Apache License 2.0 | 107/116 | 0 | 178078 | 26831 | 0.0321 |
| [Meta: Llama 4 Maverick](meta-llama--llama-4-maverick.md) `meta-llama/llama-4-maverick` | Meta | Llama 4 Community License (Meta's own terms) | 68/106 | 0 | 115362 | 5657 | 0.0399 |
| [DeepSeek: DeepSeek V4.1 Flash](deepseek--deepseek-v4.1-flash.md) `deepseek/deepseek-v4.1-flash` | DeepSeek | MIT License | 91/102 | 1 | 110428 | 54664 | 0.0530 |
| [Qwen: Qwen3.5 397B A17B](qwen--qwen3.5-397b-a17b.md) `qwen/qwen3.5-397b-a17b` | Alibaba (Qwen) | Apache License 2.0 | 114/126 | 7 | 38229 | 110374 | 0.3835 |
| [Mistral: Mistral Large 4](mistralai--mistral-large-4-0.md) `mistralai/mistral-large-4-0` | Mistral AI | Mistral Ecosystem Open-Weight License | 63/67 | 2 | 18709 | 86561 | 0.2016 |

## Commercial (API only)

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [OpenAI: GPT-6 Luna](openai--gpt-6-luna.md) `openai/gpt-6-luna` | OpenAI | commercial terms; no weights | 82/89 | 0 | 73120 | 8880 | 0.00958 |
| [Google: Gemini 3.5 Flash Lite](google--gemini-3.5-flash-lite.md) `google/gemini-3.5-flash-lite` | Google | commercial terms; no weights | 64/67 | 0 | 19348 | 2644 | 0.0123 |
| [Anthropic: Claude Haiku 5.5](anthropic--claude-haiku-5.5.md) `anthropic/claude-haiku-5.5` | Anthropic | commercial terms; no weights | 66/71 | 0 | 40324 | 10434 | 0.00916 |
| [OpenAI: GPT-6.1 Terra](openai--gpt-6.1-terra.md) `openai/gpt-6.1-terra` | OpenAI | commercial terms; no weights | 63/67 | 0 | 18054 | 5186 | 0.0435 |
