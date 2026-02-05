/**
 * Toast Component
 * Displays temporary notifications for errors, warnings, and success messages
 */

import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

const typeStyles: Record<ToastType, string> = {
  success: 'bg-green-500/90 border-green-400',
  error: 'bg-red-500/90 border-red-400',
  warning: 'bg-yellow-500/90 border-yellow-400',
  info: 'bg-blue-500/90 border-blue-400',
};

const typeIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-white shadow-lg animate-slide-in ${typeStyles[type]}`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-xl font-bold">{typeIcons[type]}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-colors"
        aria-label="Close notification"
      >
        <span className="text-lg font-bold">×</span>
      </button>
    </div>
  );
}
