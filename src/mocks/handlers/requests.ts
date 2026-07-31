import { http, HttpResponse } from "msw";

import { requests } from "../../shared/fixtures/requests";
import { users } from "../../shared/api/auth";
import { UserComments } from "../../shared/fixtures/requests";


import type {
  Request,
  Category,
  Priority,
} from "../../shared/types/index";


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
),

// Create New request
http.post(
  "/requests",
  async ({ request }) => {
    const body = await request.json() as {
      title: string;
      category: Category;
      priority: Priority;
      requesterId: string;
      author: string;
      description: string;
    };

    const newRequest: Request = {
      id: crypto.randomUUID(),
      title: body.title,
      category: body.category,
      priority: body.priority,
      status: "open",
      requesterId: body.requesterId,
      assigneeId: null,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    requests.unshift(
      newRequest
    );

    const firstMessage = {
      id: crypto.randomUUID(),
      requestId:
        newRequest.id,
      author: body.author,
      message:
        body.description,
      createdAt:
        new Date().toLocaleString(),
    };

    UserComments.unshift(
      firstMessage
    );

    return HttpResponse.json(
      newRequest,
      {
        status: 201,
      }
    );
  }
)

];