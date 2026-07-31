import { http, HttpResponse } from "msw";

import { requests } from "../../shared/fixtures/requests";
import { users } from "../../shared/api/auth";
import { UserComments } from "../../shared/fixtures/requests";

export const requestHandlers = [

//   Get all requests
  http.get(
    "/requests",
    ({ request }) => {
      const userId =
        request.headers.get(
          "x-user-id"
        );

      const user = users.find(
        (u) =>
          u.id === userId
      );

      if (!user) {
        return HttpResponse.json(
          {
            message:
              "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

      if (
        user.role ===
        "requester"
      ) {
        return HttpResponse.json(
          requests.filter(
            (request) =>
              request.requesterId ===
              user.id
          )
        );
      }

      return HttpResponse.json(
        requests
      );
    }
  ),


//   Get Request by ID
  http.get(
  "/requests/:id",
  ({ params }) => {
    const requestId =
      params.id as string;

    const request =
      requests.find(
        (r) =>
          r.id === requestId
      );

    if (!request) {
      return HttpResponse.json(
        {
          message:
            "Request not found",
        },
        {
          status: 404,
        }
      );
    }

    const messages =
      UserComments.filter(
        (comment) =>
          comment.requestId ===
          requestId
      );

    return HttpResponse.json({
      request,
      messages,
    });
  }
)
];