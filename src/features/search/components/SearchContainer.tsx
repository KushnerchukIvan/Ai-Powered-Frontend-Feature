'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowDownRight, Command, Sparkles } from 'lucide-react';
import { searchKnowledgeBase } from '@/shared/data/mock-knowledge-base';
import { Button } from '@/shared/ui/button';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { useStreamingSearch } from '../hooks/useStreamingSearch';

const suggestions = ['Продуктивність у React', 'Як працюють React hooks?', 'Оптимізація у Next.js'];

export function SearchContainer() {
  const [query, setQuery] = useState('');
  const { submitQuery, isLoading, explanation, cancel, error } = useStreamingSearch();
  const hasSearched = query.length > 0;
  const items = hasSearched ? searchKnowledgeBase(query) : [];

  const runSearch = (value: string) => {
    setQuery(value);
    void submitQuery(value);
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
            <Command className="h-4 w-4" />
          </span>
          semantic<span className="-ml-2 text-muted">/search</span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6f8a6c]" /> Local knowledge
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="mx-auto max-w-[710px] text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e2e0d9] bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#686a60]">
            <Sparkles className="h-3.5 w-3.5 text-accent" /> Knowledge, connected
          </div>
          <h1 className="font-serif text-[42px] leading-[1.04] tracking-[-0.055em] sm:text-[62px]">
            Find the thread.
            <br />
            <span className="italic text-accent">Understand why.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
            Постав запитання звичайною мовою — знайди потрібні матеріали та зрозумій, що в них
            важливого.
          </p>
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-left backdrop-blur lg:static lg:mt-9 lg:border-0 lg:bg-transparent lg:p-0 lg:pb-0 lg:backdrop-blur-none">
            <SearchInput onSubmit={runSearch} isLoading={isLoading} onCancel={cancel} />
          </div>
          {!hasSearched && (
            <div className="mb-16 mt-8 flex flex-wrap items-center justify-center gap-2 lg:mb-0">
              <span className="mr-1 text-[11px] text-muted">Спробуй</span>
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="secondary"
                  onClick={() => runSearch(suggestion)}
                  className="h-8 px-3 text-[11px] font-normal"
                >
                  {suggestion}
                  <ArrowDownRight className="h-3 w-3 text-muted" />
                </Button>
              ))}
            </div>
          )}
        </div>
        {hasSearched && (
          <div className="mt-14 border-t border-line pt-8 sm:mt-16 sm:pt-10">
            <div className="mb-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
              <span>Результати для</span>
              <span className="font-medium text-ink">“{query}”</span>
              {isLoading && (
                <span className="ml-1 inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> шукаю
                </span>
              )}
            </div>
            <SearchResults
              items={items}
              isLoading={isLoading}
              explanation={explanation}
              error={error}
            />
          </div>
        )}
      </main>
      <footer className="mx-auto flex max-w-6xl justify-between border-t border-line px-5 py-5 text-[10px] uppercase tracking-[0.12em] text-[#aaa79d] sm:px-8 lg:px-10">
        <span>AI semantic search</span>
        <span>Built for curious minds</span>
      </footer>
    </div>
  );
}
