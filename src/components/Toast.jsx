const GLYPHS = {
  success: '✓',
  info: 'i',
  error: '!',
};

/** Presentational only - the stack and its timers live in ToastContext. */
export default function Toast({ type = 'success', message, onClose }) {
  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon" aria-hidden="true">
        {GLYPHS[type] ?? GLYPHS.success}
      </span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}
