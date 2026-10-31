'use client';

import { useCallback, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

const transport = new DefaultChatTransport({ api: '/api/search' });

export function useStreamingSearch() {
  const {
    messages,
    sendMessage,
    status,
    stop,
    error: chatError,
    clearError,
  } = useChat({
    transport,
    onError: () => undefined,
  });

  const explanation = useMemo(() => {
    const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
    return (
      lastAssistant?.parts
        .filter((part) => part.type === 'text')
        .map((part) => part.text)
        .join('') ?? ''
    );
  }, [messages]);

  const submitQuery = useCallback(
    async (query: string) => {
      if (status === 'streaming' || status === 'submitted') stop();
      clearError();
      await sendMessage({ text: query }, { body: { query } });
    },
    [clearError, sendMessage, status, stop],
  );

  const cancel = useCallback(() => stop(), [stop]);
  const error = chatError
    ? 'Не вдалося отримати пояснення. Перевірте з’єднання та налаштування AI API, а тоді спробуйте ще раз.'
    : null;

  return {
    submitQuery,
    isLoading: status === 'submitted' || status === 'streaming',
    explanation,
    cancel,
    error,
  };
}
