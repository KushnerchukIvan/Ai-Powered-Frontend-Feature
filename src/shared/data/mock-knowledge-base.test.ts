import { describe, expect, it } from 'vitest';
import { mockKnowledgeBase, searchKnowledgeBase } from './mock-knowledge-base';

describe('searchKnowledgeBase', () => {
  it('contains the expected 20 React and Next.js resources', () => {
    expect(mockKnowledgeBase).toHaveLength(20);
  });
  it('finds relevant resources from a natural language query', () => {
    const results = searchKnowledgeBase('продуктивність у React');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((item) => item.tags.includes('performance'))).toBe(true);
  });
  it('returns no resources for an empty query', () => {
    expect(searchKnowledgeBase('   ')).toEqual([]);
  });
  it('limits the displayed results to five', () => {
    expect(searchKnowledgeBase('react')).toHaveLength(5);
  });
});
