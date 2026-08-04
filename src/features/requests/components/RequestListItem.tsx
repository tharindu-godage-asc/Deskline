import type { Request } from "../../../shared/types";

import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/badge/Badge";
import { Button } from "../../../shared/ui/button/Button";

import {
  categoryIcons,
  defaultCategoryIcon,
} from "../constants/categoryIcons";

import {
  getPriorityTextClass,
  getPriorityHoverBorderClass,
  getPriorityHoverRingClass,
} from "../utils/requestStyles";

type Props = {
  request: Request;
  onViewDetails: (
    requestId: string
  ) => void;
};

export function RequestListItem({
  request,
  onViewDetails,
}: Props) {
  return (
    <Card
      className={`group relative overflow-hidden transition-transform duration-200
        hover:-translate-y-0.5
        ${getPriorityHoverRingClass(
          request.priority
        )}
      `}
    >
      <div
        className={`absolute left-0 top-0 h-full w-3 rounded-l-lg border-l-6 border-transparent transition-colors duration-200 ${getPriorityHoverBorderClass(
          request.priority
        )}`}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full dark:ring-slate-600">
            {categoryIcons[
              request.category
            ] ?? defaultCategoryIcon}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">
              {request.title}
            </h3>

            <div className="flex items-center text-sm">
              <span>
                {request.category}
              </span>

              <span className="mx-2 text-muted-foreground">
                •
              </span>

              <span
                className={getPriorityTextClass(
                  request.priority
                )}
              >
                {request.priority}
              </span>
            </div>

            <Badge
              variant={request.status}
            >
              {request.status}
            </Badge>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() =>
            onViewDetails(request.id)
          }
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}