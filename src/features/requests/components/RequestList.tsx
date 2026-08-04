/**
 * Step 5: RequestList displays a collection of support requests using
 * fixture data during the initial development stage.
 *
 * It provides a simple overview of each request, including its
 * title, status, priority, and category. This component will
 * later be extended to consume data from the application's API,
 * support filtering and searching, and include additional
 * request actions.
 */

import type { Priority, Request } from "../../../shared/types";
import { Card } from "../../../shared/ui/Card";
import { Badge } from "../../../shared/ui/badge/Badge";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button/Button";
import { getCurrentUser } from "../../../shared/api/auth";
import { isRequester } from "../../../shared/lib/permissions";
import { useState, type ReactNode } from "react";
import { FiMonitor, FiCode, FiTool, FiKey } from "react-icons/fi";

import { LoadingState } from "../components/states/LoadingState";
import { EmptyState } from "../components/states/EmptyState";
import { ErrorState } from "./states/ErrorState";

const categoryIcons: Record<string, ReactNode> = {
  hardware: <FiMonitor className="h-5 w-5" />,
  software: <FiCode className="h-5 w-5" />,
  facilities: <FiTool className="h-5 w-5" />,
  access: <FiKey className="h-5 w-5" />,
};

function getPriorityTextClass(priority: string) {
  switch (priority) {
    case "high":
      return "font-semibold text-red-600 dark:text-red-400";
    case "medium":
      return "font-semibold text-amber-600 dark:text-amber-400";
    default:
      return "text-slate-600 dark:text-slate-300";
  }
}

type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {

  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  const [loading] = useState(false);
  const [error, setError] = useState(false);

  const handleViewDetails = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  }

  const handleNewRequest = () => {
    navigate("/requests/new");
  }

const getPriorityHoverBorderClass = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "group-hover:border-red-500";
    case "medium":
      return "group-hover:border-amber-500";
    case "low":
      return "group-hover:border-green-500";
    default:
      return "group-hover:border-slate-300";
  }
};

const getPriorityHoverRingClass = (priority: Priority) => {
  switch (priority) {
    case "high":
      return "hover:ring-red-500 dark:hover:ring-red-500";
    case "medium":
      return "hover:ring-amber-500 dark:hover:ring-amber-500";
    case "low":
      return "hover:ring-green-500 dark:hover:ring-green-500";
    default:
      return "hover:ring-slate-300 dark:hover:ring-slate-300";
  }
};

  if (loading) return <LoadingState />;

  if (requests.length === 0)
  return (
    <EmptyState title="No requests" message="There are no requests." />
  );

  if (error) {
  return (
    <ErrorState
      onRetry={() =>
        setError(false)
      }
    />
  );
}


  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mt-5">
        <h2 className="text-xl font-semibold">
          Requests
        </h2>

        {isRequester(currentUser.role) && (
          <Button
            className="mr-4"
            variant="primary"
            onClick={handleNewRequest}
          >
            New Request
          </Button>
        )}
      </div>

      {requests.map((request) => (
        <Card
          className={`group relative overflow-hidden transition-all duration-200
            hover:-translate-y-0.5
            ${getPriorityHoverRingClass(request.priority)}
          `}
        >
          {/* Left Accent Border */}
            <div
              className={`absolute left-0 top-0 h-full w-3 rounded-l-lg border-l-6 border-transparent transition-colors duration-200 ${getPriorityHoverBorderClass(
                request.priority
              )}`}
            />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-slate-300 text-slate-700 dark:ring-slate-600 dark:text-slate-200">
              {categoryIcons[request.category] ?? (
                <FiMonitor className="h-5 w-5" />
              )}
            </div>

              <div className="space-y-2">
                <h3 className="font-semibold">
                  {request.title}
                </h3>

                <div className="flex items-center text-sm">
                  <span>{request.category}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className={getPriorityTextClass(request.priority)}>
                    {request.priority}
                  </span>
                </div>

                <div>
                  <Badge variant={request.status}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => handleViewDetails(request.id)}
            >
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}