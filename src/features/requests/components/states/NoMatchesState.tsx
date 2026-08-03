import { Card } from "../../../../shared/ui/Card";

export function NoMatchesState() {
  return (
    <Card>
      <div className="text-center py-8">
        <h3 className="font-semibold">
          No Matches
        </h3>

        <p className="opacity-70">
          Try changing your filters.
        </p>
      </div>
    </Card>
  );
}