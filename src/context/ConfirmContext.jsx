import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export const ConfirmContext = createContext(null);

/**
 * Holds the single ConfirmDialog instance for the whole app.
 * `confirm()` returns a promise, so callers read as plain sequential code
 * instead of each component wiring up its own open/close state.
 */
export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);
  const resolverRef = useRef(null);

  const confirm = useCallback((options) => {
    const opts = typeof options === 'string' ? { message: options } : options;
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialog({
        title: opts.title ?? 'Please confirm',
        message: opts.message,
        confirmLabel: opts.confirmLabel ?? 'Confirm',
        cancelLabel: opts.cancelLabel ?? 'Cancel',
        tone: opts.tone ?? 'default',
      });
    });
  }, []);

  const settle = useCallback((result) => {
    setDialog(null);
    const resolve = resolverRef.current;
    resolverRef.current = null;
    if (resolve) resolve(result);
  }, []);

  const handleConfirm = useCallback(() => settle(true), [settle]);
  const handleCancel = useCallback(() => settle(false), [settle]);

  const value = useMemo(() => ({ confirm, isOpen: dialog !== null }), [confirm, dialog]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {dialog && (
        <ConfirmDialog {...dialog} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </ConfirmContext.Provider>
  );
}
