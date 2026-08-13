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

import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Request } from "../../../shared/types";
import { RequestListItem } from "./RequestListItem";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button/Button";
import { isRequester } from "../../../shared/lib/permissions";
import { useAuth } from "../../../shared/context/AuthContext";

type Props = {
  requests: Request[];
};

export function RequestList({
  requests,
}: Props) {

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const scrollParentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: requests.length,
    getScrollElement: () => scrollParentRef.current,
    estimateSize: () => 76,
    overscan: 5,
  });

  const handleViewDetails = (requestId: string) => {
    navigate(`/requests/${requestId}`);
  }

  const handleNewRequest = () => {
    navigate("/requests/new");
  }


  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mt-5 mb-5">
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

      <div
        ref={scrollParentRef}
        className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1 pt-3"
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const request = requests[virtualRow.index];

            return (
              <div
                key={request.id}
                data-index={virtualRow.index}
                ref={rowVirtualizer.measureElement}
                className="pb-2"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <RequestListItem
                  request={request}
                  onViewDetails={
                    handleViewDetails
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}