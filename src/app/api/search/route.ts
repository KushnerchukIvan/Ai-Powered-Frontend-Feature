import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
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
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'AI-провайдер не налаштований. Додайте GROQ_API_KEY у змінні середовища.' },
      { status: 503 },
    );
  }

  const groq = createGroq({ apiKey });
  const result = streamText({
    model: groq(process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile'),
    abortSignal: req.signal,
    system: `Ти — асистент із React, Next.js та веброзробки. Відповідай мовою запиту, спочатку дай пряму відповідь, зазвичай у 2-4 реченнях. Знайдені документи з локальної бази (JSON): ${JSON.stringify(documents)}. Використовуй їх як додатковий контекст: якщо вони релевантні, коротко назви ключові збіги; якщо документів немає або вони не відповідають на запит, одним реченням зазнач це, а потім усе одно відповідай на запит із власних знань моделі. Не приписуй документам тверджень, яких у них немає, і не вигадуй джерел. Якщо не впевнений у відповіді, чесно вкажи на це.`,
    prompt: query,
  });
  return result.toUIMessageStreamResponse();
}
