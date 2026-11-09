# AI Semantic Search

A Next.js 15 application that lets people search a small React and Next.js knowledge base using natural language. It returns matching local documents immediately and streams a short AI explanation of their relevance.

## Run locally

### 1. Install project dependencies

```bash
npm install
```

### 2. Configure Groq

Create an API key in the [Groq Console](https://console.groq.com/keys), then create `.env.local` in the project root:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Keep the key private: do not add a `NEXT_PUBLIC_` prefix or commit `.env.local`.

### 3. Start the website

Start the Next.js app from the project directory:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000). A valid Groq API key in `.env.local` is required for AI responses.

### Deploying to Vercel

In **Vercel → Project → Settings → Environment Variables**, add these variables for Production (and Preview if needed), then redeploy:

| Variable       | Value                         |
| -------------- | ----------------------------- |
| `GROQ_API_KEY` | Your secret key from Groq     |
| `GROQ_MODEL`   | `llama-3.3-70b-versatile`     |

Use `npm run build` for a production build, `npm run lint` for linting, and `npm test` for the Vitest suite.

## Technical decisions

- **Vercel AI SDK and Groq:** `streamText` streams model output through `@ai-sdk/groq`. The React `useChat` hook consumes the same UI message stream as before.
- **Cancellation:** The hook's `Cancel` action calls AI SDK `stop()`. The route passes `req.signal` to `streamText`, allowing the request cancellation to propagate to the provider stream.
- **Feature-based structure:** Search-specific UI, hook, types, and its public `index.ts` live under `src/features/search`. The app imports only `SearchContainer` from that public entry point. Shared UI components and the local knowledge base live under `src/shared`.
- **Local retrieval:** Both the browser and route handler search the same 20-item data module. The route limits the documents included in the AI context to five.

## Provider note

The production provider is Groq. To use another AI SDK provider, install its compatible provider package and change the model in `src/app/api/search/route.ts`; the UI and streaming message format remain provider-independent. Keep `abortSignal: req.signal` in place.

## Project structure

```text
src/
├── app/                  # App Router page, layout, styles, and search API
├── features/search/      # Search feature: public API, UI, and streaming hook
└── shared/               # Reusable UI and local knowledge base
```
