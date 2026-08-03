import { http, HttpResponse } from "msw";
import { users } from "../../shared/api/auth";

export const authHandlers = [
  http.post(
    "/login",
    async ({ request }) => {
      const body =
        (await request.json()) as {
          email: string;
          password: string;
        };

      const user = users.find(
        (user) =>
          user.email === body.email &&
          user.password === body.password
      );

      if (!user) {
        return HttpResponse.json(
          {
            message:
              "Invalid email or password",
          },
          {
            status: 401,
          }
        );
      }

      return HttpResponse.json({
        token: "fake-jwt-token",
        user,
      });
    }
  ),
];