import { createPortal } from "react-dom";
import { Button } from "../button/Button";
import { Card } from "../Card";

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
  if (!isOpen) {
    return null;
  }

if (!isOpen) {
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
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>

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
  </div>,
  document.body
);
}