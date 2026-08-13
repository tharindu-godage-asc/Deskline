import type { Request } from "../../../shared/types";

import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/badge/Badge";
import { Button } from "../../../shared/ui/button/Button";
import { cn } from "../../../shared/lib/cn";
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
      className={cn(
        "group relative overflow-hidden py-3 pl-5 pr-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        getPriorityHoverRingClass(request.priority)
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1 border-l-4 border-transparent transition-colors duration-200",
          getPriorityHoverBorderClass(request.priority)
        )}
      />

      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {categoryIcons[
              request.category
            ] ?? defaultCategoryIcon}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">

              <Badge variant={request.status}>
                {request.status}
              </Badge>

              <h3 className="truncate text-sm font-semibold">
                {request.title}
              </h3>

              
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-xs text-muted-foreground">
              <span>
                {request.category}
              </span>

              <span>•</span>

              <span
                className={getPriorityTextClass(
                  request.priority
                )}
              >
                {request.priority}
              </span>

              <span>•</span>

              <span>
                Created by {requesterName}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              onViewDetails(request.id)
            }
          >
            View Details
          </Button>

          <span className="text-[11px] text-muted-foreground">
            Last Updated at {request.updatedAt}
          </span>
        </div>
      </div>
    </Card>
  );
}