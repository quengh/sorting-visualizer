/**
 * ToastContainer Component
 * Renders all active toasts in a fixed position
 */

import { Toast } from './Toast';
import type { ToastType } from './Toast';

interface ToastContainerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: ToastType;
  }>;
  onHideToast: (id: string) => void;
}

export function ToastContainer({ toasts, onHideToast }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onHideToast(toast.id)}
        />
      ))}
    </div>
  );
}
