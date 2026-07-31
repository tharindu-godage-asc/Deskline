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

  return (
    <Card>
      <div className="space-y-4">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p>{message}</p>

        <div className="flex gap-2">
          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Confirm
          </Button>

          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}