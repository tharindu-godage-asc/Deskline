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
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Card className="w-full max-w-lg space-y-5 text-center">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {onRetry && (
          <div className="flex justify-center">
            <Button onClick={onRetry}>
              Retry
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}