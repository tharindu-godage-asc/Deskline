import { describe, it, expect } from "vitest";
import { filterRequests } from "../features/requests/utils/filterRequests";

const requests = [
  {
    id: "r1",
    title: "VPN issue",
    status: "open",
    priority: "high",
    category: "software",
    requesterId: "user-1",
    assigneeId: "user-2",
  },
  {
    id: "r2",
    title: "Laptop screen flickering",
    status: "pending",
    priority: "medium",
    category: "hardware",
    requesterId: "user-1",
    assigneeId: null,
  },
  {
    id: "r3",
    title: "Printer not working",
    status: "closed",
    priority: "low",
    category: "hardware",
    requesterId: "user-2",
    assigneeId: "user-3",
  },
] as any[];

describe("filterRequests", () => {
  it("returns all requests when all filters are selected", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(3);
  });

  it("filters requests by status", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "open",
        priority: "all",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r1");
  });

  it("filters requests by priority", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "all",
        priority: "high",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r1");
  });

  it("filters requests by category", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "all",
        priority: "all",
        category: "hardware",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(2);
  });

  it("filters requests by search text", () => {
    const result = filterRequests(
      requests,
      {
        search: "vpn",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("VPN issue");
  });

  it("search is case insensitive", () => {
    const result = filterRequests(
      requests,
      {
        search: "VPN",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r1");
  });

  it("filters unassigned requests", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "unassigned",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r2");
  });

  it("filters requests assigned to current user", () => {
    const result = filterRequests(
      requests,
      {
        search: "",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "me",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r1");
  });

  it("applies multiple filters together", () => {
    const result = filterRequests(
      requests,
      {
        search: "vpn",
        status: "open",
        priority: "high",
        category: "software",
        assignee: "me",
      },
      "user-2"
    );

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("r1");
  });

  it("returns an empty array when there are no matches", () => {
    const result = filterRequests(
      requests,
      {
        search: "xyz123",
        status: "all",
        priority: "all",
        category: "all",
        assignee: "all",
      },
      "user-2"
    );

    expect(result).toEqual([]);
  });
});