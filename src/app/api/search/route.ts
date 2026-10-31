import { streamText } from 'ai';
import { createOllama } from 'ai-sdk-ollama';
import { searchKnowledgeBase } from '@/shared/data/mock-knowledge-base';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Надішліть коректний JSON запиту.' }, { status: 400 });
  }

  const query =
    typeof body === 'object' && body !== null && 'query' in body ? body.query : undefined;
  if (typeof query !== 'string' || query.trim().length === 0) {
    return Response.json({ error: 'Введіть запит, щоб почати пошук.' }, { status: 400 });
  }
  if (query.length > 500) {
    return Response.json({ error: 'Запит має містити не більше 500 символів.' }, { status: 400 });
  }

  const documents = searchKnowledgeBase(query).slice(0, 5);
  const ollama = createOllama({
    baseURL: process.env.OLLAMA_BASE_URL ?? 'http://localhost:11434',
    apiKey: process.env.OLLAMA_API_KEY,
    fetch: (input, init) => fetch(input, { ...init, signal: req.signal }),
  });
  const result = streamText({
    model: ollama(process.env.OLLAMA_MODEL ?? 'llama3.2'),
    abortSignal: req.signal,
    system: `Ти — асистент з пошуку. Ось знайдені документи: ${JSON.stringify(documents)}. Користувач запитав: ${query}. Напиши коротке пояснення (2-3 речення), чому ці документи релевантні, і виділи ключові збіги. Якщо документів немає, чесно скажи про це та запропонуй звузити запит. Не вигадуй джерел.`,
    prompt: query,
  });
  return result.toUIMessageStreamResponse();
}
