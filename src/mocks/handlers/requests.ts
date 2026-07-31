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

//  GET all requests
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

//  GET Request by ID
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

// POST New request
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
),

// POST new comments
http.post(
  "/requests/:id/messages",
  async ({ params, request }) => {
    const requestId =
      params.id as string;

    const req =
      requests.find(
        (r) =>
          r.id === requestId
      );

    if (!req) {
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

    if (
      req.status === "closed" ||
      req.status === "cancelled"
    ) {
      return HttpResponse.json(
        {
          message:
            "Comments are disabled",
        },
        {
          status: 403,
        }
      );
    }

    const body =
      (await request.json()) as
        | {
            author: string;
            message: string;
          }
        | null;

    if (!body || !body.author || !body.message) {
      return HttpResponse.json(
        {
          message: "Invalid request body",
        },
        {
          status: 400,
        }
      );
    }

    const newComment = {
      id: crypto.randomUUID(),
      requestId,
      author: body.author,
      message: body.message,
      createdAt:
        new Date().toLocaleString(),
    };

    UserComments.push(
      newComment
    );

    return HttpResponse.json(
      newComment,
      {
        status: 201,
      }
    );
  }
),


]