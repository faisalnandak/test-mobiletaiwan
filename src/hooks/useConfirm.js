import { useContext } from 'react';
import { ConfirmContext } from '../context/ConfirmContext.jsx';

/**
 * Returns { confirm, isOpen }.
 * `await confirm({ message })` resolves to true when the user accepts.
 */
export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}
