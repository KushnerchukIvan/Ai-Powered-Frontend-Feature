import { cn } from './cn';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('animate-pulse rounded-md bg-[#e9e7e0]', className)} />
  );
}
