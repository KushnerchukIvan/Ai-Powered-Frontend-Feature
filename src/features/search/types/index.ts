export type { KnowledgeItem } from '@/shared/data/mock-knowledge-base';

export interface SearchInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  onCancel: () => void;
  initialValue?: string;
}
