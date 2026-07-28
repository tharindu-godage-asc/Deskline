import { Card } from "../../../../shared/ui/Card";

type Props = {
  message?: string;
};

export function LoadingState({
  message = "Loading requests...",
}: Props) {
  return (
    <Card>
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />

        <p className="text-sm opacity-70">
          {message}
        </p>
      </div>
    </Card>
  );
}