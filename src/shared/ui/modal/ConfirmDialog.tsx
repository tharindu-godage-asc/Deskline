import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { Button } from "../button/Button";
import { Card } from "../Card";
import { useMotion } from "../../hooks/useMotion";

type Props = {
  title: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
  isOpen,
  onConfirm,
  onCancel,
}: Props) {
  const { reduceMotion } = useMotion();

  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
      return;
    }

    if (reduceMotion) {
      setShouldRender(false);
      return;
    }

    setIsClosing(true);

    const timeout = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [isOpen, reduceMotion]);

  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div
          className={
            reduceMotion
              ? ""
              : isClosing
                ? "animate-[dialogOut_200ms_ease-out]"
                : "animate-[dialogIn_200ms_ease-out]"
          }
        >
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                {title}
              </h3>

              <p>{message}</p>

              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>

                <Button
                  variant="danger"
                  onClick={onConfirm}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>,
    document.body
  );
}