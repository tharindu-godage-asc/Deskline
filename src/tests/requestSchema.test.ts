import { describe, expect, it } from "vitest";
import { requestSchema } from "../features/requests/schemas/requestSchema";

describe("requestSchema", () => {
  it("accepts a valid request", () => {
    const result = requestSchema.safeParse({
      title: "VPN not connecting",
      category: "software",
      priority: "high",
      description: "Unable to connect to VPN from home",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty title", () => {
    const result = requestSchema.safeParse({
      title: "",
      category: "software",
      priority: "high",
      description: "Unable to connect",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Title is required"
      );
    }
  });

  it("rejects an empty category", () => {
    const result = requestSchema.safeParse({
      title: "VPN not connecting",
      category: "",
      priority: "high",
      description: "Unable to connect",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Category is required"
      );
    }
  });

  it("rejects an empty priority", () => {
    const result = requestSchema.safeParse({
      title: "VPN not connecting",
      category: "software",
      priority: "",
      description: "Unable to connect",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Priority is required"
      );
    }
  });

  it("rejects an empty description", () => {
    const result = requestSchema.safeParse({
      title: "VPN not connecting",
      category: "software",
      priority: "high",
      description: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Description is required"
      );
    }
  });
});