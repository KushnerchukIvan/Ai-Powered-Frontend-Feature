import type { ButtonHTMLAttributes } from 'react';
import { cn } from './cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:pointer-events-none disabled:opacity-45',
        variant === 'primary' && 'bg-ink text-white hover:bg-accent',
        variant === 'secondary' && 'border border-line bg-white text-ink hover:border-ink',
        variant === 'ghost' && 'text-muted hover:bg-black/5 hover:text-ink',
        className,
      )}
      {...props}
    />
  );
}
