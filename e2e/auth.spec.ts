import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  
  test("redirects to login page", async ({page,}) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/login/);});

  test("requester login redirects to my-requests", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","requester@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page).toHaveURL(/my-requests/);
  });

  test("technician login redirects to queue", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","tech@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page).toHaveURL(/queue/);
  });

  test("admin login redirects to queue", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","admin@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", { name: "Sign In",}).click();
    await expect(page).toHaveURL(/queue/);
  });

  test("invalid password shows authentication error", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","requester@deskline.com");
    await page.fill("#password","wrongpassword");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page.getByRole("main").getByText("Invalid email or password.")).toBeVisible();
  });

  test("invalid email shows authentication error", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","invalid@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page.getByRole("main").getByText("Invalid email or password.")).toBeVisible();
  });

  test("logout redirects to login page", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","requester@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await page.getByRole("button", {name: "Logout",}).click();
    await expect(page).toHaveURL(/login/);
  });

  test("unauthenticated user is redirected to login page when accessing protected route", async ({page,}) => {
    await page.goto("/my-requests");
    await expect(page).toHaveURL(/login/);
  });

  test("authenticated user can access protected route", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","requester@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page).toHaveURL(/my-requests/);
  });

  test("authenticated user is redirected to their dashboard when accessing login page", async ({page,}) => {
    await page.goto("/login");
    await page.fill("#email","requester@deskline.com");
    await page.fill("#password","password123");
    await page.getByRole("button", {name: "Sign In",}).click();
    await expect(page).toHaveURL(/my-requests/);
  });

});