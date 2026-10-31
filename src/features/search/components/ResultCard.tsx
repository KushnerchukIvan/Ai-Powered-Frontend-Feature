import { ArrowUpRight, FileText } from 'lucide-react';
import type { KnowledgeItem } from '@/features/search/types';

export function ResultCard({ item, index }: { item: KnowledgeItem; index: number }) {
  return (
    <article className="group rounded-xl border border-line bg-white p-4 transition hover:border-[#c6c9bd] hover:shadow-[0_8px_24px_rgba(30,30,20,0.045)] sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">
          <FileText className="h-3.5 w-3.5" /> Knowledge base
        </span>
        <span className="font-mono text-[10px] text-[#aaa79d]">0{index + 1}</span>
      </div>
      <h3 className="text-[15px] font-medium leading-snug tracking-[-0.02em] text-ink">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{item.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-paper px-2 py-1 text-[10px] text-[#65645e]">
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight
          className="h-4 w-4 text-[#aaa79d] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden="true"
        />
      </div>
    </article>
  );
}
