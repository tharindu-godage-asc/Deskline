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
       <div className="flex items-center gap-4 flex-wrap">
            <h2 className="text-2xl font-bold whitespace-nowrap">
                {request.title}
            </h2>

            <Badge variant={request.status}>{request.status}</Badge>
            <Badge variant={request.priority}>{request.priority}</Badge>
            <Badge
                variant="general"
                className="flex items-center gap-1.5"
                >
                {categoryIcons[request.category]}
                <span className="capitalize">
                    {request.category}
                </span>
            </Badge>

            <div className="flex-grow flex-end"></div>
            <span className="flex-end text-sm whitespace-nowrap">
                <strong>Requester:</strong> {requesterName}
            </span>

            <span className="text-sm whitespace-nowrap">
                <strong>Assignee:</strong> {assigneeName || "Unassigned"}
            </span>
        </div>
    );
}