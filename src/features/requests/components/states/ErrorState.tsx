import { Button } from "../../../../shared/ui/button/Button";
import { Card } from "../../../../shared/ui/Card";

type Props = {
  title: string;
  description: string;
  onRetry?: () => void;
};

export function ErrorState({
  title,
  description,
  onRetry,
}: Props) {
  return (
    <Card>
      <div className="space-y-3 py-8 text-center">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {description}
        </p>

        {onRetry && (
          <Button onClick={onRetry}>
            Retry
          </Button>
        )}
      </div>
    </Card>
  );
}