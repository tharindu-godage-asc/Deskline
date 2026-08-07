import { describe, it, expect } from "vitest";
import { mapStatusCodeToError } from "../shared/mappers/errorMapper";

describe("mapStatusCodeToError", () => {
  it("maps 400 to Invalid Request", () => {
    expect(
      mapStatusCodeToError(400)
    ).toEqual({
      title: "Invalid Request",
      description:
        "The request could not be processed.",
    });
  });

  it("maps 401 to Unauthorized", () => {
    expect(
      mapStatusCodeToError(401)
    ).toEqual({
      title: "Unauthorized",
      description:
        "You don't have access to view.",
    });
  });

  it("maps 403 to Access Denied", () => {
    expect(
      mapStatusCodeToError(403)
    ).toEqual({
      title: "Access Denied",
      description:
        "You don't have permission to perform this action.",
    });
  });

  it("maps 404 to Request Not Found", () => {
    expect(
      mapStatusCodeToError(404)
    ).toEqual({
      title: "Request Not Found",
      description:
        "The requested request could not be found.",
    });
  });

  it("maps 500 to Server Error", () => {
    expect(
      mapStatusCodeToError(500)
    ).toEqual({
      title: "Server Error",
      description:
        "Something went wrong on our end.",
    });
  });

  it("maps unknown status code to Unexpected Error", () => {
    expect(
      mapStatusCodeToError(999)
    ).toEqual({
      title: "Unexpected Error",
      description:
        "An unexpected error occurred.",
    });
  });

  it("maps undefined status code to Unexpected Error", () => {
    expect(
      mapStatusCodeToError()
    ).toEqual({
      title: "Unexpected Error",
      description:
        "An unexpected error occurred.",
    });
  });
});