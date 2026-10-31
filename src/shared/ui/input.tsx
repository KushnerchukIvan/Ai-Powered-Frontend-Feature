import type { InputHTMLAttributes } from 'react';
import { cn } from './cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full bg-transparent text-base text-ink outline-none placeholder:text-muted/70',
        className,
      )}
      {...props}
    />
  );
}
