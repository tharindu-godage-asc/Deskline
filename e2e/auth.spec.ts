import { test, expect } from "./fixtures";
import { users, type Role } from "./support/users";

test.describe("Authentication", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("shows the login page", async ({ page, loginPage }) => {
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.signIn).toBeVisible();
  });

  for (const role of Object.keys(users) as Role[]) {
    test(`${role} login redirects to their home page`, { tag: "@smoke" }, async ({ page, loginPage }) => {
      await loginPage.login(users[role].email);
      await expect(page).toHaveURL(users[role].home);
    });
  }

  test("invalid password shows authentication error", async ({ loginPage }) => {
    await loginPage.login(users.requester.email, "wrongpassword");
    await expect(loginPage.authError).toBeVisible();
  });

  test("unknown email shows authentication error", async ({ loginPage }) => {
    await loginPage.login("invalid@deskline.com");
    await expect(loginPage.authError).toBeVisible();
  });

  test("empty form shows required-field errors", async ({ page, loginPage }) => {
    await loginPage.signIn.click();
    await expect(loginPage.fieldError("Email is required")).toBeVisible();
    await expect(loginPage.fieldError("Password is required")).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test("malformed email shows a validation error", async ({ loginPage }) => {
    await loginPage.email.fill("not-an-email");
    await loginPage.password.fill("password123");
    await loginPage.signIn.click();
    await expect(loginPage.fieldError("Enter a valid email")).toBeVisible();
  });

  test("logout redirects to login page", async ({ page, loginPage }) => {
    await loginPage.login(users.requester.email);
    await expect(page).toHaveURL(users.requester.home);
    await loginPage.logout.click();
    await expect(page).toHaveURL(/login/);
  });

  test("session survives a reload", async ({ page, loginPage }) => {
    await loginPage.login(users.requester.email);
    await expect(page).toHaveURL(users.requester.home);
    await page.goto("/my-requests");
    await expect(page).toHaveURL(/my-requests/);
  });

  // The app currently lets a signed-in user view /login instead of redirecting them home.
  test.fixme("signed-in user visiting /login is redirected to their home page", async ({ page, loginPage }) => {
    await loginPage.login(users.requester.email);
    await expect(page).toHaveURL(users.requester.home);
    await page.goto("/login");
    await expect(page).toHaveURL(users.requester.home);
  });
});

// Protected-route redirects for anonymous users live in access-control.spec.ts.
