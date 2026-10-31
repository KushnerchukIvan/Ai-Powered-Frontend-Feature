# AI Semantic Search

A Next.js 15 application that lets people search a small React and Next.js knowledge base using natural language. It returns matching local documents immediately and streams a short AI explanation of their relevance.

## Run locally

### 1. Install project dependencies

```bash
npm install
```

### 2. Install Ollama and download the model

Install Ollama for [Windows](https://ollama.com/download/windows), [macOS](https://ollama.com/download), or [Linux](https://ollama.com/download/linux).

**On Windows**, you can install from PowerShell with the official installer:

```powershell
irm https://ollama.com/install.ps1 | iex
```

After installation, reopen PowerShell so the `ollama` command is available, then verify the CLI and download the model:

```bash
ollama --version
ollama pull llama3.2
```

### 3. Start Ollama and the website

**On Windows and macOS**, start the Ollama app; its API runs in the background at `http://localhost:11434`.

Run the model once in a terminal to confirm it works:

```bash
ollama run llama3.2
```

This opens an interactive chat prompt (`Send a message`). You can enter a test message there; type `/bye` to leave the prompt. Keep the Ollama app running.

> **Note:** The website needs Ollama's background API, not the interactive prompt. If Ollama's background API is not running (for example, on a manual Linux setup), start it in a separate terminal and leave that terminal open:
>
> ```bash
> ollama serve
> ```

In another terminal, start the Next.js app from the project directory:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). No API key or `.env.local` entry is needed for local Ollama.

### Deploying to Vercel

Vercel cannot connect to Ollama running on your personal computer. In a deployment, `localhost` points to the Vercel function itself. Configure a network-accessible Ollama endpoint in **Vercel → Project → Settings → Environment Variables**, then redeploy:

| Variable          | Value                                                                              |
| ----------------- | ---------------------------------------------------------------------------------- |
| `OLLAMA_BASE_URL` | Ollama server base URL. For Ollama Cloud, use `https://ollama.com`.                |
| `OLLAMA_API_KEY`  | API key for the hosted Ollama endpoint. Do not use a `NEXT_PUBLIC_` prefix.        |
| `OLLAMA_MODEL`    | Model ID available to that endpoint. Defaults to `llama3.2` for local development. |

Ollama Cloud uses a model catalog and requires an API key; a locally pulled `llama3.2` model is not automatically available to the hosted endpoint. Select a model supported by the endpoint. See [Ollama API setup](https://docs.ollama.com/api/introduction) and [Cloud models](https://docs.ollama.com/cloud).

For a self-hosted remote Ollama server, `OLLAMA_BASE_URL` must be reachable from Vercel over HTTPS. Do not expose an unauthenticated Ollama server to the public internet; put it behind authentication and TLS, and set `OLLAMA_API_KEY` if the endpoint accepts bearer authentication.

Use `npm run build` for a production build, `npm run lint` for linting, and `npm test` for the Vitest suite.

## Technical decisions

- **Vercel AI SDK and Ollama:** `streamText` streams the `llama3.2` explanation through the `ai-sdk-ollama` provider. The React `useChat` hook consumes the same UI message stream as before.
- **Cancellation:** The hook's `Cancel` action calls AI SDK `stop()`. The route passes `req.signal` to `streamText` and to the request-scoped Ollama fetch, so aborting the browser request cancels the Ollama HTTP stream as well.
- **Feature-based structure:** Search-specific UI, hook, types, and its public `index.ts` live under `src/features/search`. The app imports only `SearchContainer` from that public entry point. Shared UI components and the local knowledge base live under `src/shared`.
- **Local retrieval:** Both the browser and route handler search the same 20-item data module. The route limits the documents included in the AI context to five.

## Provider note

For a free local demo, this project uses the Ollama model `llama3.2` through `ai-sdk-ollama`. Vercel AI SDK provides a provider abstraction, so the model provider can be switched without changing the search UI or streaming interface.

To switch back to OpenAI, install the AI SDK 5 compatible provider with `npm install @ai-sdk/openai@^2`, import `openai` from that package in `src/app/api/search/route.ts`, and change the model to `openai('gpt-4o-mini')`. Keep the `abortSignal: req.signal` option in place.

> **Important:** This project pins `ai-sdk-ollama@2.2.0`, which is compatible with its AI SDK 5 dependency. The latest provider major targets AI SDK 7 and is not compatible with this project's current AI SDK version.

## Project structure

```text
src/
├── app/                  # App Router page, layout, styles, and search API
├── features/search/      # Search feature: public API, UI, and streaming hook
└── shared/               # Reusable UI and local knowledge base
```
