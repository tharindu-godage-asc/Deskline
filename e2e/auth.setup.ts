import { test as setup, expect } from "./fixtures";
import { users, type Role } from "./support/users";

// Logs in once per role through the UI and saves the session (localStorage
// "currentUser") so specs can start authenticated via test.use({ storageState }).
for (const role of Object.keys(users) as Role[]) {
  const user = users[role];

  setup(`authenticate as ${role}`, async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(user.email);
    await expect(page).toHaveURL(user.home);

    await page.context().storageState({ path: user.storageState });
  });
}
