import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('submits a trimmed query', () => {
    const onSubmit = vi.fn();
    render(<SearchInput onSubmit={onSubmit} isLoading={false} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Пошуковий запит'), {
      target: { value: '  React hooks  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Шукати' }));
    expect(onSubmit).toHaveBeenCalledWith('React hooks');
  });
  it('exposes cancellation while a request is loading', () => {
    const onCancel = vi.fn();
    render(<SearchInput onSubmit={vi.fn()} isLoading onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Скасувати пошук' }));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
