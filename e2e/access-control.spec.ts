import { test, expect } from "./fixtures";
import { users } from "./support/users";

// Seeded r7 ("VPN not connecting") belongs to the technician (user-2);
// seeded r2 ("VPN not connecting-asignn test") belongs to the requester (user-1).
const TECH_REQUEST = "VPN not connecting";
const REQUESTER_REQUEST = "VPN not connecting-asignn test";

test.describe("Access control", { tag: "@critical" }, () => {
  test.describe("anonymous", () => {
    for (const path of ["/my-requests", "/queue", "/requests/new", "/requests/r1"]) {
      test(`${path} redirects to login`, async ({ page }) => {
        await page.goto(path);
        await expect(page).toHaveURL(/\/login/);
      });
    }
  });

  test.describe("requester", () => {
    test.use({ storageState: users.requester.storageState });

    test("cannot open the staff queue", async ({ page }) => {
      await page.goto("/queue");
      await expect(page).toHaveURL(/\/my-requests/);
    });

    test("cannot open a request owned by someone else", async ({ page }) => {
      await page.goto("/requests/r7");
      // React Query retries the failed 403 three times (~7s of backoff) before the error state renders.
      await expect(page.getByRole("heading", { name: "Access Denied" })).toBeVisible({
        timeout: 15_000,
      });
    });

    test("only sees their own requests", async ({ requestsList }) => {
      await requestsList.gotoMyRequests();
      await requestsList.searchFor("VPN not connecting");
      await expect(requestsList.title(REQUESTER_REQUEST)).toBeVisible();
      await expect(requestsList.title(TECH_REQUEST)).toHaveCount(0);
    });
  });

  test.describe("technician", () => {
    test.use({ storageState: users.technician.storageState });

    test("is redirected away from requester-only pages", async ({ page }) => {
      await page.goto("/my-requests");
      await expect(page).toHaveURL(/\/queue/);
      await page.goto("/requests/new");
      await expect(page).toHaveURL(/\/queue/);
    });

    test("sees every user's requests in the queue", async ({ requestsList }) => {
      await requestsList.gotoQueue();
      await requestsList.searchFor("VPN not connecting");
      await expect(requestsList.title(REQUESTER_REQUEST)).toBeVisible();
      await expect(requestsList.title(TECH_REQUEST)).toBeVisible();
    });
  });
});
