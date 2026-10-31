'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUp, Sparkles, Square } from 'lucide-react';
import type { SearchInputProps } from '@/features/search/types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

export function SearchInput({
  onSubmit,
  isLoading,
  onCancel,
  initialValue = '',
}: SearchInputProps) {
  const [value, setValue] = useState(initialValue);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim() && !isLoading) onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-white px-4 shadow-[0_6px_24px_rgba(30,30,20,0.045)] transition focus-within:border-[#a6b0a2] sm:px-5">
        <Sparkles
          className="hidden h-5 w-5 shrink-0 text-accent sm:block"
          strokeWidth={1.7}
          aria-hidden="true"
        />
        <Input
          aria-label="Пошуковий запит"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          maxLength={500}
          placeholder="Запитай будь-що про React..."
          className="min-w-0 py-4"
        />
        {isLoading ? (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="h-10 shrink-0 px-4 text-sm"
            aria-label="Скасувати пошук"
          >
            <Square className="h-3.5 w-3.5 fill-current" />{' '}
            <span className="hidden sm:inline">Скасувати</span>
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!value.trim()}
            className="h-10 w-10 shrink-0"
            aria-label="Шукати"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between px-1 text-[11px] text-muted">
        <span>Пошук по локальній базі знань</span>
        <span>{value.length}/500</span>
      </div>
    </form>
  );
}
