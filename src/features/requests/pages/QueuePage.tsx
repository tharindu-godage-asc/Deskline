import { requests } from "../../../shared/fixtures/requests";
import { RequestList } from "../components/RequestList";

export function QueuePage() {
  return (
    <RequestList requests={requests} />
  );
}