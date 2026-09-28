import { test, expect } from "../fixtures";
import { users } from "../support/users";

// One continuous test, one page: the mock API keeps its data in page memory,
// so switching roles must go through in-app login/logout (client-side
// navigation) rather than storageState swaps or page.goto, or the created
// request would be lost between steps.
test.describe("Full request lifecycle across roles", { tag: "@critical" }, () => {
  test("requester creates, admin triages, technician resolves, admin closes", async ({
    page,
    loginPage,
    requestsList,
    newRequestPage,
    requestDetail,
  }) => {
    const title = `Printer jams on double-sided prints ${Date.now()}`;
    const description = "The 3rd floor printer jams on every double-sided print job.";

    await test.step("requester creates a new request", async () => {
      await loginPage.goto();
      await loginPage.login(users.requester.email);
      await expect(page).toHaveURL(users.requester.home);

      await requestsList.newRequestButton.click();
      await expect(page).toHaveURL(/\/requests\/new/);
      await newRequestPage.fill({
        title,
        category: "hardware",
        priority: "high",
        description,
      });
      await newRequestPage.submit.click();
      await expect(requestDetail.toast("Request created successfully.")).toBeVisible();

      await newRequestPage.backToRequests.click();
      await expect(page).toHaveURL(/\/my-requests/);
      await requestsList.searchFor(title);
      await expect(requestsList.title(title)).toBeVisible();
      await expect(requestsList.statusBadge(title)).toHaveText("open");
    });

    await test.step("requester sees the description as the first comment", async () => {
      await requestsList.openDetails(title);
      await expect(requestDetail.heading(title)).toBeVisible();
      await expect(requestDetail.status("open")).toBeVisible();
      await expect(page.getByText(description)).toBeVisible();
    });

    await test.step("admin assigns it to a technician and sets it pending", async () => {
      await loginPage.logout.click();
      await expect(page).toHaveURL(/login/);
      await loginPage.login(users.admin.email);
      await expect(page).toHaveURL(users.admin.home);

      await requestsList.openDetails(title);
      await expect(requestDetail.heading(title)).toBeVisible();

      await requestDetail.reassign("John Wayne");
      await expect(requestDetail.toast("Request reassigned.")).toBeVisible();
      await expect(requestDetail.assignee("John Wayne")).toBeVisible();

      await requestDetail.action("Set Pending").click();
      await expect(requestDetail.toast("Request moved to pending.")).toBeVisible();
      await expect(requestDetail.status("pending")).toBeVisible();
    });

    await test.step("technician resolves it from the queue and reopens it", async () => {
      await loginPage.logout.click();
      await expect(page).toHaveURL(/login/);
      await loginPage.login(users.technician.email);
      await expect(page).toHaveURL(users.technician.home);

      await requestsList.filterAssignedToMe();
      await requestsList.searchFor(title);
      await expect(requestsList.title(title)).toBeVisible();

      await requestsList.openDetails(title);
      await expect(requestDetail.heading(title)).toBeVisible();

      await requestDetail.comment("Issue Resolved");
      await expect(requestDetail.toast("Comment added.")).toBeVisible();
      await expect(page.getByText("Issue Resolved", { exact: true })).toBeVisible();

      await requestDetail.action("Reopen Request").click();
      await expect(requestDetail.toast("Request reopened.")).toBeVisible();
      await expect(requestDetail.status("open")).toBeVisible();
    });

    await test.step("admin closes the request", async () => {
      await loginPage.logout.click();
      await expect(page).toHaveURL(/login/);
      await loginPage.login(users.admin.email);
      await expect(page).toHaveURL(users.admin.home);

      await requestsList.openDetails(title);
      await expect(requestDetail.heading(title)).toBeVisible();

      await requestDetail.action("Close Request").click();
      await expect(page.getByText("Are you sure you want to close this request?")).toBeVisible();
      await requestDetail.confirmDialogConfirm.click();
      await expect(requestDetail.toast("Request closed.")).toBeVisible();

      await expect(requestDetail.status("closed")).toBeVisible();
      await expect(requestDetail.commentsDisabled).toBeVisible();
      await expect(requestDetail.commentBox).toHaveCount(0);
    });
  });
});
