import { BookOpen, Sparkles } from 'lucide-react';
import type { KnowledgeItem } from '@/features/search/types';
import { ResultCard } from './ResultCard';
import { Skeleton } from '@/shared/ui/skeleton';

interface SearchResultsProps {
  items: KnowledgeItem[];
  isLoading: boolean;
  explanation: string;
  error: string | null;
}

export function SearchResults({ items, isLoading, explanation, error }: SearchResultsProps) {
  return (
    <section className="grid gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12" aria-live="polite">
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Знайдені матеріали
          </h2>
          <span className="text-xs text-muted">{items.length} результатів</span>
        </div>
        {isLoading && items.length === 0 ? (
          <div className="space-y-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-xl border border-line bg-white p-5">
                <Skeleton className="mb-4 h-3 w-28" />
                <Skeleton className="mb-3 h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <ResultCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-line px-5 py-10 text-center text-sm text-muted">
            {isLoading
              ? 'Шукаємо у базі знань…'
              : 'Спробуйте запит про React, Next.js або продуктивність.'}
          </div>
        )}
      </div>
      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Пояснення AI
          </h2>
        </div>
        <div className="min-h-48 rounded-2xl border border-line bg-[#f1f0ea] p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium text-[#686a60]">
            <BookOpen className="h-3.5 w-3.5" /> Семантичний огляд
          </div>
          {error ? (
            <p role="alert" className="text-sm leading-relaxed text-[#984d3c]">
              {error}
            </p>
          ) : explanation ? (
            <p className="whitespace-pre-wrap text-[15px] leading-[1.8] text-[#3e403a]">
              {explanation}
              {isLoading && <span className="ml-0.5 animate-pulse text-accent">▍</span>}
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-muted">
              {isLoading
                ? 'Готую короткий огляд знайдених матеріалів…'
                : 'Пояснення з’явиться тут разом із результатами пошуку.'}
            </p>
          )}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted">
          AI узагальнює результати з локальної бази знань.
        </p>
      </aside>
    </section>
  );
}
