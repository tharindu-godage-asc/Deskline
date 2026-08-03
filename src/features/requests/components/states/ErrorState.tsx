import { Button } from "../../../../shared/ui/button/Button";
import { Card } from "../../../../shared/ui/Card";

type Props = {
  onRetry: () => void;
};

export function ErrorState({
  onRetry,
}: Props) {
  return (
    <Card>
      <div className="space-y-3 text-center">
        <h3 className="font-semibold">
          Something went wrong
        </h3>

        <Button onClick={onRetry}>
          Retry
        </Button>
      </div>
    </Card>
  );
}