import { Card } from "../../../../shared/ui/Card";

type Props = {
  title: string;
  message: string;
};

export function EmptyState({
  title,
  message,
}: Props) {
  return (
    <Card>
      <div className="text-center py-8">
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="opacity-70">
          {message}
        </p>
      </div>
    </Card>
  );
}