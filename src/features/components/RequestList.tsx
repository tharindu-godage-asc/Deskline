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

import { requests } from "../../shared/fixtures/requests";

export function RequestList() {
  return (
    <div>
      <h2>Requests</h2>

      {requests.map((request) => (
        <div key={request.id}>
          <h3>{request.title}</h3>

          <p>{request.status}</p>

          <p>{request.priority}</p>

          <p>{request.category}</p>
        </div>
      ))}
    </div>
  );
}