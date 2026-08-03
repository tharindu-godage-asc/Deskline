import { useEffect, useState } from "react";
import { useMotion } from "../../hooks/useMotion";
import {toastVariants,type ToastVariant,}from "./toast.variants";

type Props = {
  message: string;
  onClose: () => void;
  variant?: ToastVariant;
};

export function Toast({
  message,
  onClose,
  variant = "success"
}: Props) {
  const { reduceMotion } =
    useMotion();

  const [progress, setProgress] =
    useState(100);

  const styles = toastVariants[variant];

  useEffect(() => {
    const duration = 3000;

    const interval = setInterval(() => {
      setProgress((prev) =>
        Math.max(
          prev - 100 / (duration / 50),
          0
        )
      );
    }, 50);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        fixed right-4 top-4 z-50
        w-80 overflow-hidden
        bg-white rounded-md
        text-black shadow-lg
        ${
          reduceMotion
            ? ""
            : "animate-[toastIn_300ms_ease-out]"
        }
      `}
    >
      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div
            className={`h-full ml-auto ${styles.progressBar}`}
            style={{
            width: `${progress}%`,
            transition: reduceMotion
                ? "none"
                : "width 50ms linear",
            }}
        />
        </div>

      {/* Content */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${styles.indicator}`}
          />

          <p className="text-sm">
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>
    </div>
  );
}