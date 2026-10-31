export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'react-rendering',
    title: 'React is a UI library, not a full framework',
    content:
      'React is a JavaScript library for building user interfaces. It focuses on composing UI from components and does not include a complete application framework with built-in routing, data fetching, or server rendering; teams add tools for those needs or choose a framework such as Next.js.',
    tags: ['react', 'library', 'framework', 'rendering'],
  },
  {
    id: 'usememo',
    title: 'When to use useMemo',
    content: 'Memoize expensive calculations only when profiling shows a real performance benefit.',
    tags: ['react', 'hooks', 'performance'],
  },
  {
    id: 'usecallback',
    title: 'Stable callbacks with useCallback',
    content: 'Keep function references stable when passing callbacks to memoized child components.',
    tags: ['react', 'hooks', 'performance'],
  },
  {
    id: 'react-memo',
    title: 'Reducing rerenders with memo',
    content:
      'React memo can skip rerendering when props remain equal; measure before adding boundaries.',
    tags: ['react', 'performance'],
  },
  {
    id: 'code-splitting',
    title: 'Code splitting in Next.js',
    content: 'Load route and component code on demand to reduce the initial JavaScript bundle.',
    tags: ['next.js', 'performance'],
  },
  {
    id: 'next-image',
    title: 'Optimizing images in Next.js',
    content:
      'Use the Next.js Image component for responsive sizing, lazy loading, and modern formats.',
    tags: ['next.js', 'performance'],
  },
  {
    id: 'server-components',
    title: 'React Server Components in Next.js',
    content: 'Keep data fetching and non-interactive UI on the server to reduce client JavaScript.',
    tags: ['next.js', 'react'],
  },
  {
    id: 'useeffect',
    title: 'A practical guide to useEffect',
    content: 'Synchronize a component with external systems and include every reactive dependency.',
    tags: ['react', 'hooks'],
  },
  {
    id: 'usestate',
    title: 'Choosing state with useState',
    content:
      'Use local state for values that drive rendering and keep state as close as possible to its consumers.',
    tags: ['react', 'hooks'],
  },
  {
    id: 'useref',
    title: 'Mutable values with useRef',
    content: 'Store DOM references or values that should persist without triggering a rerender.',
    tags: ['react', 'hooks'],
  },
  {
    id: 'context',
    title: 'Avoiding context performance pitfalls',
    content:
      'Split frequently changing context values and memoize providers to limit consumer updates.',
    tags: ['react', 'performance'],
  },
  {
    id: 'list-keys',
    title: 'Rendering lists with stable keys',
    content: 'Stable unique keys help React preserve identity and update lists predictably.',
    tags: ['react', 'rendering'],
  },
  {
    id: 'hydration',
    title: 'Debugging hydration errors',
    content:
      'Ensure server and client render the same initial markup and avoid browser-only values during render.',
    tags: ['next.js', 'react'],
  },
  {
    id: 'dynamic-import',
    title: 'Lazy loading with dynamic imports',
    content: 'Defer optional client components with dynamic imports to improve route startup.',
    tags: ['next.js', 'performance'],
  },
  {
    id: 'web-vitals',
    title: 'Core Web Vitals for React apps',
    content: 'Track LCP, INP, and CLS to find user-visible loading and interaction bottlenecks.',
    tags: ['react', 'next.js', 'performance'],
  },
  {
    id: 'transitions',
    title: 'Keeping interfaces responsive with transitions',
    content:
      'Use useTransition to mark non-urgent updates so urgent interactions remain responsive.',
    tags: ['react', 'hooks', 'performance'],
  },
  {
    id: 'suspense',
    title: 'Loading UI with Suspense',
    content:
      'Suspense boundaries reveal useful fallback UI while lazy code or supported data loads.',
    tags: ['react', 'next.js'],
  },
  {
    id: 'cache-fetch',
    title: 'Caching data in Next.js',
    content:
      'Choose request and route caching deliberately to balance freshness, latency, and reuse.',
    tags: ['next.js', 'performance'],
  },
  {
    id: 'custom-hooks',
    title: 'Designing reusable custom hooks',
    content:
      'Extract stateful behavior into focused hooks with clear inputs, outputs, and cleanup.',
    tags: ['react', 'hooks'],
  },
  {
    id: 'profiling',
    title: 'Profiling React performance',
    content:
      'Use React DevTools Profiler to identify expensive commits before optimizing components.',
    tags: ['react', 'performance'],
  },
];

export function searchKnowledgeBase(query: string): KnowledgeItem[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  const stopWords = new Set([
    'a',
    'an',
    'and',
    'are',
    'between',
    'does',
    'for',
    'in',
    'is',
    'it',
    'not',
    'of',
    'or',
    'the',
    'to',
    'vs',
    'why',
    'в',
    'для',
    'є',
    'з',
    'і',
    'не',
    'на',
    'чи',
    'що',
    'це',
    'чому',
  ]);
  const terms = normalizedQuery
    .split(' ')
    .filter((term) => term.length > 1 && !stopWords.has(term));
  if (terms.length === 0) return [];

  return mockKnowledgeBase
    .map((item, index) => {
      const title = normalizeSearchText(item.title);
      const content = normalizeSearchText(item.content);
      const tags = normalizeSearchText(item.tags.join(' '));
      const score = terms.reduce(
        (total, term) =>
          total +
          (title.split(' ').includes(term) ? 5 : 0) +
          (tags.split(' ').includes(term) ? 4 : 0) +
          (content.split(' ').includes(term) ? 2 : 0),
        0,
      );
      return { item, index, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 5)
    .map(({ item }) => item);
}

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/реакт[\p{L}]*/gu, 'react')
    .replace(/фреймворк[\p{L}]*/gu, 'framework')
    .replace(/бібліотек[\p{L}]*/gu, 'library')
    .replace(/продуктивн[\p{L}]*/gu, 'performance')
    .replace(/швидкоді[\p{L}]*/gu, 'performance')
    .replace(/оптимізац[\p{L}]*/gu, 'performance')
    .replace(/хуки|хук[\p{L}]*/gu, 'hooks')
    .replace(/frameworks?/g, 'framework')
    .replace(/[^\p{L}\p{N}+#]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}
