import { http, HttpResponse } from "msw";

import { requests } from "../../shared/fixtures/requests";
import { users } from "../../shared/api/auth";

export const requestHandlers = [
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
];