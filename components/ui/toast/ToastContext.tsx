"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  autoClose?: boolean;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID();
      const newToast = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      if (toast.autoClose !== false) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration ?? 4000);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-5 right-5 z-50 flex flex-col gap-4 w-[360px]">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const config = {
    success: {
      color: "bg-green-500",
      light: "bg-green-50",
      icon: <CheckCircle className="text-green-500" size={22} />,
    },
    error: {
      color: "bg-red-500",
      light: "bg-red-50",
      icon: <XCircle className="text-red-500" size={22} />,
    },
    info: {
      color: "bg-blue-500",
      light: "bg-blue-50",
      icon: <Info className="text-blue-500" size={22} />,
    },
    warning: {
      color: "bg-yellow-500",
      light: "bg-yellow-50",
      icon: <AlertTriangle className="text-yellow-500" size={22} />,
    },
  };

  const current = config[toast.type];

  return (
    <div
      className={`relative flex rounded-xl shadow-lg overflow-hidden bg-white border animate-slideIn`}
    >
      {/* Left color bar */}
      <div className={`w-2 ${current.color}`} />

      <div className="flex gap-4 p-4 flex-1">
        {/* Icon */}
        <div className={`p-2 rounded-full ${current.light}`}>
          {current.icon}
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{toast.title}</p>
          {toast.description && (
            <p className="text-sm text-gray-500">{toast.description}</p>
          )}
        </div>

        {/* Close */}
        <button onClick={onClose}>
          <X size={18} className="text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
}