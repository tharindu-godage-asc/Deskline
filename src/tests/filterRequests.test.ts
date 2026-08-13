import { describe, it, expect } from "vitest";
import {
  filterRequests,
  sortRequests,
  type SortOption,
} from "../features/requests/utils/filterRequests";

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

const sortableRequests = [
  {
    id: "r1",
    title: "VPN issue",
    priority: "high",
    updatedAt: "2024-01-10T00:00:00.000Z",
  },
  {
    id: "r2",
    title: "Laptop screen flickering",
    priority: "medium",
    updatedAt: "2024-01-20T00:00:00.000Z",
  },
  {
    id: "r3",
    title: "Printer not working",
    priority: "low",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
] as any[];

describe("sortRequests", () => {
  it("sorts by updatedAt descending", () => {
    const result = sortRequests(sortableRequests, "updatedAt-desc");
    expect(result.map((r) => r.id)).toEqual(["r2", "r3", "r1"]);
  });

  it("sorts by updatedAt ascending", () => {
    const result = sortRequests(sortableRequests, "updatedAt-asc");
    expect(result.map((r) => r.id)).toEqual(["r1", "r3", "r2"]);
  });

  it("sorts by priority descending", () => {
    const result = sortRequests(sortableRequests, "priority-desc");
    expect(result.map((r) => r.id)).toEqual(["r1", "r2", "r3"]);
  });

  it("sorts by priority ascending", () => {
    const result = sortRequests(sortableRequests, "priority-asc");
    expect(result.map((r) => r.id)).toEqual(["r3", "r2", "r1"]);
  });

  it("returns requests unchanged for an unrecognized sort option", () => {
    const result = sortRequests(
      sortableRequests,
      "unknown" as SortOption
    );
    expect(result.map((r) => r.id)).toEqual(["r1", "r2", "r3"]);
  });

  it("does not mutate the original array", () => {
    const original = [...sortableRequests];
    sortRequests(sortableRequests, "updatedAt-desc");
    expect(sortableRequests).toEqual(original);
  });
});