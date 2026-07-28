export class ForbiddenError extends Error {
  constructor(
    message = "403 Forbidden"
  ) {
    super(message);
    this.name =
      "ForbiddenError";
  }
}