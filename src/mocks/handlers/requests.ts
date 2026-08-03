import { http, HttpResponse } from "msw";

import { requests } from "../../shared/fixtures/requests";
import { users } from "../../shared/api/auth";
import { UserComments } from "../../shared/fixtures/requests";
import { type Status } from "../../shared/types";
import type {
  Request,
  Category,
  Priority,
} from "../../shared/types/index";

type PatchRequestBody = {
  status?: Status;
  assigneeId?: string | null;
};


function forbidden() {
  return HttpResponse.json(
    {
      message: "Forbidden",
    },
    {
      status: 403,
    }
  );
}

function invalidTransition() {
  return HttpResponse.json(
    {
      message:
        "Invalid status transition",
    },
    {
      status: 403,
    }
  );
}

function notFound() {
  return HttpResponse.json(
    {
      message: "Request not found",
    },
    {
      status: 404,
    }
  );
}

function badRequest() {
  return HttpResponse.json(
    {
      message : "Bad Request",
    },
    { 
    status: 400,
    }
  );
}

function unauthorized() {
  return HttpResponse.json(
    {
      message: "Unauthorized",
    },
    {
      status: 401,
    }
  );
}

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
      return unauthorized();
    }

    // Requesters only see their own requests
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

    // Technicians/Admins see all requests
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
      return notFound()
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
      return notFound();
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
      return badRequest();
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

// PATCH requests
http.patch(
  "/requests/:id",
  async ({ params, request }) => {
    const requestId =
      params.id as string;

    const body =
      (await request.json()) as PatchRequestBody;

    const targetRequest =
      requests.find(
        (r) => r.id === requestId
      );

    if (!targetRequest) {
      return notFound();
    }

    console.log(
      "Before PATCH:",
      structuredClone(targetRequest)
    );

    const userId =
      request.headers.get(
        "x-user-id"
      );

    const user = users.find(
      (u) => u.id === userId
    );

    if (!user) {
      return unauthorized();
    }

    // Terminal states
    if (
      targetRequest.status ===
        "closed" ||
      targetRequest.status ===
        "cancelled"
    ) {
      return forbidden();;
    }

    // Cancel
    if (
      body.status ===
      "cancelled"
    ) {
      const isOwner =
        targetRequest.requesterId ===
        user.id;

      if (
        user.role !==
          "requester" ||
        !isOwner ||
        targetRequest.status !==
          "open"
      ) {
        return forbidden();
      }
    }

    // Close request
    if (body.status === "closed") {
      if (user.role !== "admin") {
        return forbidden();
      }

      if (
        targetRequest.status !== "open" &&
        targetRequest.status !== "pending"
      ) {
        return invalidTransition();
      }
    }

    // Requesters cannot move open/pending
    if (
      (body.status ===
        "pending" ||
        body.status ===
          "open") &&
      user.role ===
        "requester"
    ) {
      return forbidden();
    }

    // open -> pending only
    if (
      body.status ===
        "pending" &&
      targetRequest.status !==
        "open"
    ) {
      return invalidTransition();
    }

    // pending -> open only
    if (
      body.status ===
        "open" &&
      targetRequest.status !==
        "pending"
    ) {
      return invalidTransition();
    }

    // Reassign
    if (
      body.assigneeId !== undefined
    ) {
      const assigningToSelf =
        body.assigneeId === user.id;

      // Requesters can never assign
      if (
        user.role === "requester"
      ) {
        return forbidden();
      }

      // Technicians can only assign to themselves
      if (
        user.role === "technician" &&
        !assigningToSelf
      ) {
        return forbidden();
      }

      // Admins are allowed
    }

    // Apply updates
    if (body.status) {
      targetRequest.status =
        body.status;
    }

    if (
      body.assigneeId !==
      undefined
    ) {
      targetRequest.assigneeId =
        body.assigneeId;
    }

    targetRequest.updatedAt =
      new Date()
        .toISOString()
        .split("T")[0];

    console.log(
      "After PATCH:",
      structuredClone(targetRequest)
    );

    return HttpResponse.json(
      targetRequest
    );
  }
)
]