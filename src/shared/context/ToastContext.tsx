import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Toast } from "../ui/toast/Toast";
import type { ToastVariant } from "../ui/toast/toast.variants";

type ToastState = {
  message: string;
  variant: ToastVariant;
};

type ToastContextType = {
  showToast: (
    message: string,
    variant?: ToastVariant
  ) => void;
};

const ToastContext =
  createContext<ToastContextType | null>(
    null
  );

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] =
    useState<ToastState | null>(
      null
    );

  const showToast = (
    message: string,
    variant: ToastVariant =
      "success"
  ) => {
    setToast({
      message,
      variant,
    });
  };

  useEffect(() => {
    if (!toast) return;

    const timeout =
      setTimeout(() => {
        setToast(null);
      }, 3000);

    return () =>
      clearTimeout(timeout);
  }, [toast]);

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      {toast && (
        <Toast
          message={toast.message}
          variant={toast.variant}
          onClose={() =>
            setToast(null)
          }
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider"
    );
  }

  return context;
}