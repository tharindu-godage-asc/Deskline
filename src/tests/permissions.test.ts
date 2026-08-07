import { describe, it, expect } from "vitest";

import {
  canAssignToMe,
  canCancelRequest,
  canCloseRequest,
  canComment,
  canReopenRequest,
  canViewRequest,
  isRequester,
  isTechnician,
  isAdmin,
  isStaff,
  canViewQueue,
  canCreateRequest,
  canSetPending,
} from "../shared/lib/permissions";


describe("permissions", () => {

  describe("role checks", () => {
    it("identifies users with the requester role", () => {
      expect(isRequester("requester")).toBe(true);
      expect(isRequester("admin")).toBe(false);
    });


    it("identifies users with the technician role", () => {
      expect(isTechnician("technician")).toBe(true);
      expect(isTechnician("requester")).toBe(false);
    });


    it("identifies users with the admin role", () => {
      expect(isAdmin("admin")).toBe(true);
      expect(isAdmin("technician")).toBe(false);
    });


    it("identifies technicians and admins as staff roles", () => {
      expect(isStaff("admin")).toBe(true);
      expect(isStaff("technician")).toBe(true);
      expect(isStaff("requester")).toBe(false);
    });
  });

  describe("requester permissions", () => {

    describe("view requests", () => {
      it("allows requester to view their own request", () => {
        expect(
          canViewRequest(
            "requester",
            "user-1",
            "user-1"
          )
        ).toBe(true);
      });


      it("blocks requester from viewing another user's request", () => {
        expect(
          canViewRequest(
            "requester",
            "user-1",
            "user-2"
          )
        ).toBe(false);
      });
    });



    describe("create requests", () => {
      it("allows requester to create new requests", () => {
        expect(
          canCreateRequest("requester")
        ).toBe(true);
      });


      it("blocks staff users from creating requests", () => {
        expect(
          canCreateRequest("technician")
        ).toBe(false);

        expect(
          canCreateRequest("admin")
        ).toBe(false);
      });
    });



    describe("cancel requests", () => {
      it("allows requester to cancel their own open request", () => {
        expect(
          canCancelRequest(
            "requester",
            "user-1",
            "user-1",
            "open"
          )
        ).toBe(true);
      });


      it("blocks requester from cancelling another user's request", () => {
        expect(
          canCancelRequest(
            "requester",
            "user-1",
            "user-2",
            "open"
          )
        ).toBe(false);
      });
    });



    describe("comment requests", () => {
      it("allows requester to comment on their own open request", () => {
        expect(
          canComment(
            "requester",
            "user-1",
            "user-1",
            "open"
          )
        ).toBe(true);
      });


      it("blocks requester from commenting on another user's request", () => {
        expect(
          canComment(
            "requester",
            "user-1",
            "user-2",
            "open"
          )
        ).toBe(false);
      });

      it("allows comments on pending requests", () => {
        expect(
            canComment(
            "admin",
            "user-1",
            "user-2",
            "pending"
            )
        ).toBe(true);
        });

      it("blocks comments on closed requests", () => {
        expect(
            canComment(
            "admin",
            "user-1",
            "user-2",
            "closed"
            )
        ).toBe(false);
        });

      it("blocks comments on cancelled requests", () => {
        expect(
            canComment(
            "admin",
            "user-1",
            "user-2",
            "cancelled"
            )
        ).toBe(false);
        });
    });



    it("blocks requester from assigning requests", () => {
      expect(
        canAssignToMe("requester")
      ).toBe(false);
    });


    it("blocks requester from reopening requests", () => {
      expect(
        canReopenRequest(
          "requester",
          "pending"
        )
      ).toBe(false);
    });
  });

  describe("technician permissions", () => {

    describe("queue access", () => {
      it("allows technicians to view the request queue", () => {
        expect(
          canViewQueue("technician")
        ).toBe(true);
      });
    });


    describe("request management", () => {
      it("allows technician to assign requests to themselves", () => {
        expect(
          canAssignToMe("technician")
        ).toBe(true);
      });


      it("allows technician to set requests to pending", () => {
        expect(
          canSetPending("technician")
        ).toBe(true);
      });


      it("allows technician to reopen pending requests", () => {
        expect(
          canReopenRequest(
            "technician",
            "pending"
          )
        ).toBe(true);
      });


      it("allows technician to comment on open requests", () => {
        expect(
          canComment(
            "technician",
            "user-1",
            "user-2",
            "open"
          )
        ).toBe(true);
      });


      it("blocks technician from closing requests", () => {
        expect(
          canCloseRequest(
            "technician",
            "open"
          )
        ).toBe(false);
      });

      it("blocks requester from closing requests", () => {
        expect(
          canCloseRequest(
            "requester",
            "open"
          )
        ).toBe(false);
      });
    });
  });

  describe("admin permissions", () => {
    describe("queue access", () => {
      it("allows admins to view the request queue", () => {
        expect(
          canViewQueue("admin")
        ).toBe(true);
      });
    });


    describe("request management", () => {
      it("allows admin to view any request", () => {
        expect(
          canViewRequest(
            "admin",
            "user-1",
            "user-2"
          )
        ).toBe(true);
      });


      it("allows admin to assign requests to themselves", () => {
        expect(
          canAssignToMe("admin")
        ).toBe(true);
      });


      it("allows admin to set requests to pending", () => {
        expect(
          canSetPending("admin")
        ).toBe(true);
      });


      it("allows admin to close open requests", () => {
        expect(
          canCloseRequest(
            "admin",
            "open"
          )
        ).toBe(true);
      });

      it("allows admin to close pending requests", () => {
        expect(
          canCloseRequest(
            "admin",
            "pending"
          )
        ).toBe(true);
      });


      it("allows admin to reopen pending requests", () => {
        expect(
          canReopenRequest(
            "admin",
            "pending"
          )
        ).toBe(true);
      });


      it("allows admin to comment on requests", () => {
        expect(
          canComment(
            "admin",
            "user-1",
            "user-2",
            "open"
          )
        ).toBe(true);
      });
    });
  });
});