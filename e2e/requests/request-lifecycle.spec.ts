import { test, expect } from "../fixtures";
import { users } from "../support/users";

test.use({ storageState: users.admin.storageState });

// Seeded r2: pending and unassigned, so every staff action is available.
const TITLE = "VPN not connecting-asignn test";

test.describe("Request lifecycle (admin)", { tag: "@critical" }, () => {
  test("admin triages, comments on and closes a request", async ({
    page,
    requestsList,
    requestDetail,
  }) => {
    await requestsList.gotoQueue();
    await requestsList.openDetails(TITLE);
    await expect(requestDetail.heading(TITLE)).toBeVisible();
    await expect(requestDetail.status("pending")).toBeVisible();
    await expect(requestDetail.assignee("Unassigned")).toBeVisible();

    await test.step("assign to me", async () => {
      await requestDetail.action("Assign To Me").click();
      await expect(requestDetail.toast("Assigned to you.")).toBeVisible();
      await expect(requestDetail.assignee("John Electric")).toBeVisible();
      await expect(requestDetail.action("Assign To Me")).toHaveCount(0);
    });

    await test.step("reopen: pending -> open", async () => {
      await requestDetail.action("Reopen Request").click();
      await expect(requestDetail.toast("Request reopened.")).toBeVisible();
      await expect(requestDetail.status("open")).toBeVisible();
    });

    await test.step("set pending: open -> pending", async () => {
      await requestDetail.action("Set Pending").click();
      await expect(requestDetail.toast("Request moved to pending.")).toBeVisible();
      await expect(requestDetail.status("pending")).toBeVisible();
    });

    await test.step("add a comment", async () => {
      const body = "Investigating the VPN gateway logs.";
      await requestDetail.comment(body);
      await expect(requestDetail.toast("Comment added.")).toBeVisible();
      await expect(page.getByText(body, { exact: true })).toHaveCount(1);
      await expect(requestDetail.commentBox).toHaveValue("");
    });

    await test.step("close requires confirmation", async () => {
      await requestDetail.action("Close Request").click();
      await expect(page.getByText("Are you sure you want to close this request?")).toBeVisible();
      await requestDetail.confirmDialogConfirm.click();
      await expect(requestDetail.toast("Request closed.")).toBeVisible();
    });

    await test.step("closed request is locked", async () => {
      await expect(requestDetail.status("closed")).toBeVisible();
      await expect(requestDetail.commentsDisabled).toBeVisible();
      await expect(requestDetail.commentBox).toHaveCount(0);
      for (const name of ["Close Request", "Set Pending", "Reopen Request", "Assign To Me"]) {
        await expect(requestDetail.action(name)).toHaveCount(0);
      }
    });
  });
});
