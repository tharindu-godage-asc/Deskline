import type { Request } from "../../../shared/types";

import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/badge/Badge";
import { Button } from "../../../shared/ui/button/Button";
import { useUsers } from "../../../shared/hooks/queries/useUsers";
import { getUserNameById } from "../../../shared/hooks/queries/useUsers";
import { LoadingState } from "../../requests/components/states/LoadingState"
import { ErrorState } from "../../requests/components/states/ErrorState"

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

  const {
  data: users = [],
  isLoading,
  error,
} = useUsers();

  const requesterName =
  getUserNameById(
    users,
    request.requesterId
  );

  if(isLoading){
    return <LoadingState />;
  }

  if(error){
    return <ErrorState         
        title={error.message}
        description={error.name}
        onRetry={() => window.location.reload()} />;
  }

  return (
    <Card
      className={`group relative overflow-hidden p-3 transition-transform duration-200
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

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full dark:ring-slate-600">
            {categoryIcons[
              request.category
            ] ?? defaultCategoryIcon}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold">
              {request.title}
            </h3>

            <div className="flex items-center text-xs">
              <span>
                {request.category}
              </span>

              <span className="mx-1.5 text-muted-foreground">
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

          {/* Right Column */}
        <div className="flex flex-col items-end gap-1 text-xs">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              onViewDetails(request.id)
            }
          >
            View Details
          </Button>

          <div className="text-muted-foreground">
            Created by {requesterName}
          </div>

          <div className="text-muted-foreground">
            Last Updated at {request.updatedAt}
          </div>
        </div>
      </div>
    </Card>
  );
}