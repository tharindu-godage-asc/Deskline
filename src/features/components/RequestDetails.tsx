/**
 * Step 6: RequestDetail displays the details of a single support request.
 *
 * During the initial development stage, the component renders a
 * request from the fixture data to establish the basic detail page
 * layout. It presents key request information such as the title,
 * status, priority, category, requester, and assignee. Future
 * iterations will retrieve request data dynamically based on the
 * selected request and support additional interactions.
 */

import { requests } from "../../shared/fixtures/requests";

export function RequestDetail() {
  const request = requests[0];

  return (
    <section>
      <h2>{request.title}</h2>

      <p>Status: {request.status}</p>

      <p>Priority: {request.priority}</p>

      <p>Category: {request.category}</p>

      <p>Requester: John Smith</p>

      <p>Assignee: Sarah Wilson</p>
    </section>
  );
}