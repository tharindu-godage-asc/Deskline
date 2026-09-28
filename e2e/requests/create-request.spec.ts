import { test, expect } from "../fixtures";
import { users } from "../support/users";

test.use({ storageState: users.requester.storageState });


//Create a Requester user, create a request, and verify it appears in My Requests with the correct status and description.
test.describe("Create request", { tag: "@critical" }, () => {
  test("requester creates a request and sees it in My Requests", async ({
    page,
    requestsList,
    newRequestPage,
    requestDetail,
  }) => {
    // Unique per run so the assertions never match a seeded request.
    const title = `Docking station not detected ${Date.now()}`;
    const description = "Monitors stay black when the laptop is docked.";

    await requestsList.gotoMyRequests();
    await requestsList.newRequestButton.click();
    await expect(page).toHaveURL(/\/requests\/new/);

    await test.step("submit stays disabled until the form is complete", async () => {
      await expect(newRequestPage.submit).toBeDisabled();
      await newRequestPage.title.fill(title);
      await expect(newRequestPage.submit).toBeDisabled();
    });

    await test.step("submit the completed form", async () => {
      await newRequestPage.fill({
        title,
        category: "hardware",
        priority: "high",
        description,
      });
      await expect(newRequestPage.submit).toBeEnabled();
      await newRequestPage.submit.click();

      await expect(requestDetail.toast("Request created successfully.")).toBeVisible();
      await expect(newRequestPage.title).toHaveValue("");
      await expect(newRequestPage.description).toHaveValue("");
    });

    // Navigate in-app: the mock API keeps its data in page memory, so a reload would lose it.
    await test.step("request appears in My Requests as open", async () => {
      await newRequestPage.backToRequests.click();
      await expect(page).toHaveURL(/\/my-requests/);
      await requestsList.searchFor(title);
      await expect(requestsList.title(title)).toBeVisible();
      await expect(requestsList.statusBadge(title)).toHaveText("open");
    });

    await test.step("detail page shows the description as the first comment", async () => {
      await requestsList.openDetails(title);
      await expect(requestDetail.heading(title)).toBeVisible();
      await expect(requestDetail.status("open")).toBeVisible();
      await expect(page.getByText(description)).toBeVisible();
    });
  });
});
