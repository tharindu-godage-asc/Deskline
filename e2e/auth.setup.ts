import { test as setup, expect } from "@playwright/test";
import { PASSWORD, users, type Role } from "./support/users";

// Logs in once per role through the UI and saves the session (localStorage
// "currentUser") so specs can start authenticated via test.use({ storageState }).
for (const role of Object.keys(users) as Role[]) {
  const user = users[role];

  setup(`authenticate as ${role}`, async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(user.email);
    await page.getByLabel("Password").fill(PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(user.home);

    await page.context().storageState({ path: user.storageState });
  });
}
