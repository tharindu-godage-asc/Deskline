import { useRouteError } from "react-router-dom";
import { Card } from "../ui/Card";
import { Button } from "../ui/button/Button";
import { mapStatusCodeToError } from "../mappers/errorMapper";

export function AppErrorPage() {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    message?: string;
  } | null;

  const fallbackError = mapStatusCodeToError(
    error?.status
  );

  const title = error?.statusText ?? fallbackError.title;
  const description =
    error?.message ?? fallbackError.description;

  return (
    <div className="flex mt-20 items-center justify-center bg-background p-2">
      <Card className="w-full max-w-lg space-y-5 text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {error?.status ? `Error ${error.status}` : "Unexpected issue"}
          </p>
          <h1 className="text-2xl font-semibold">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={() => window.location.assign("/")}>
            Go Home
          </Button>
        </div>
      </Card>
    </div>
  );
}