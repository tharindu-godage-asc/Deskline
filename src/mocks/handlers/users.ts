import { http, HttpResponse } from "msw";
import { users } from "../../shared/api/auth";

export const userHandlers = [
  http.get("/users", () => {
    return HttpResponse.json(users);
  }),
];