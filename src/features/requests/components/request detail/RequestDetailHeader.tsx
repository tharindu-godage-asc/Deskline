import type { Request } from "../../../../shared/types";
import { Badge } from "../../../../shared/ui/badge/Badge";
import { categoryIcons } from "../../constants/categoryIcons";


type Props = {
  request: Request;
  requesterName: string;
  assigneeName: string;
};

export default function RequestDetailHeader({
  request,
  requesterName,
  assigneeName,
}: Props) {
    return (
    <div className="space-y-3">
        {/* Top Row */}
        <div className="flex items-center gap-4 flex-wrap">
            <Badge variant={request.status}>
            Status: {request.status}
            </Badge>

            <Badge variant={request.priority}>
            Priority: {request.priority}
            </Badge>

            <Badge
            variant="general"
            className="flex items-center gap-1.5"
            >
            {categoryIcons[request.category]}
            <span className="capitalize">{request.category}</span>
            </Badge>

            <div className="ml-auto" />

            <span className="text-sm whitespace-nowrap">
            <strong>Requester:</strong> {requesterName}
            </span>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">
            {request.title}
            </h2>

            <span className="ml-auto text-sm whitespace-nowrap text-left">
            <strong>Assignee:</strong> {assigneeName || "Unassigned"}
            </span>
        </div>
    </div>
    );
}