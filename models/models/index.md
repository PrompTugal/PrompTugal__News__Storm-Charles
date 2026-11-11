---
title: The models, one by one
summary: A page for each model used on this site, the open-weight ones first: who publishes it, its licence, every job we gave it, its scores, tokens, cost and latency.
---

# The models, one by one

> Kept by incident.models@web-summit.dinis, 11 November 2026, 22:50 UTC

**Not a warning service: for warnings follow [IPMA](https://www.ipma.pt/) and [ANEPC](https://prociv.gov.pt/). Nothing here is a forecast or advice.** Part of [Other models, measured](../index.md).

Each model's page says what it is (its publisher, whether its weights are open, its licence as the publisher states it and what that allows), every job we gave it here, its scores with the items it got wrong, its tokens, cost and latency, and what we would use it for. "Open-weight" means OpenRouter's model list gives a Hugging Face address for the weights; the licence is read at that address (2026-11-11 02:52 UTC), and a licence tag is not legal advice: the linked text decides. Figures: [results.json](../results.json), made 2026-11-11 22:50 UTC.

## Open-weight, small

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [Google: Gemma 3 4B](google--gemma-3-4b-it.md) `google/gemma-3-4b-it` | Google | Gemma Terms of Use (Google's own terms) | 199/327 | 1 | 211706 | 43175 | 0.0139 |
| [OpenAI: gpt-oss-20b](openai--gpt-oss-20b.md) `openai/gpt-oss-20b` | OpenAI | Apache License 2.0 | 284/327 | 16 | 195028 | 211172 | 0.0561 |
| [Mistral: Ministral 3 8B 2512](mistralai--ministral-8b-2512.md) `mistralai/ministral-8b-2512` | Mistral AI | Apache License 2.0 | 185/327 | 0 | 211479 | 19946 | 0.0297 |
| [Qwen: Qwen3.5-9B](qwen--qwen3.5-9b.md) `qwen/qwen3.5-9b` | Alibaba (Qwen) | Apache License 2.0 | 306/436 | 23 | 282067 | 229790 | 0.0681 |

## Open-weight, large

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [Google: Gemma 4 31B](google--gemma-4-31b-it.md) `google/gemma-4-31b-it` | Google | Apache License 2.0 | 406/436 | 0 | 285781 | 83243 | 0.0684 |
| [Meta: Llama 4 Maverick](meta-llama--llama-4-maverick.md) `meta-llama/llama-4-maverick` | Meta | Llama 4 Community License (Meta's own terms) | 271/327 | 0 | 176775 | 11717 | 0.0599 |
| [DeepSeek: DeepSeek V4.1 Flash](deepseek--deepseek-v4.1-flash.md) `deepseek/deepseek-v4.1-flash` | DeepSeek | MIT License | 410/436 | 1 | 243260 | 88601 | 0.0919 |
| [Qwen: Qwen3.5 397B A17B](qwen--qwen3.5-397b-a17b.md) `qwen/qwen3.5-397b-a17b` | Alibaba (Qwen) | Apache License 2.0 | 381/436 | 16 | 282200 | 234325 | 0.9006 |
| [Mistral: Mistral Large 4](mistralai--mistral-large-4-0.md) `mistralai/mistral-large-4-0` | Mistral AI | Mistral Ecosystem Open-Weight License | 95/109 | 8 | 59076 | 174115 | 0.4225 |

## Commercial (API only)

| Model | Publisher | Licence | Runs right, all settings | Not answered | Tokens in | Tokens out | Cost, USD |
|---|---|---|---|---|---|---|---|
| [OpenAI: GPT-6 Luna](openai--gpt-6-luna.md) `openai/gpt-6-luna` | OpenAI | commercial terms; no weights | 401/436 | 0 | 234910 | 40925 | 0.0379 |
| [Google: Gemini 3.5 Flash Lite](google--gemini-3.5-flash-lite.md) `google/gemini-3.5-flash-lite` | Google | commercial terms; no weights | 287/327 | 0 | 208204 | 12468 | 0.0927 |
| [Anthropic: Claude Haiku 5.5](anthropic--claude-haiku-5.5.md) `anthropic/claude-haiku-5.5` | Anthropic | commercial terms; no weights | 405/436 | 0 | 325535 | 82885 | 0.0733 |
| [OpenAI: GPT-6.1 Terra](openai--gpt-6.1-terra.md) `openai/gpt-6.1-terra` | OpenAI | commercial terms; no weights | 411/436 | 0 | 234910 | 32389 | 0.3122 |
