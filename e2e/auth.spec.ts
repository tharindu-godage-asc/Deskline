import { test, expect } from "@playwright/test";

  test.describe("Authentication", () => {
  
  test("home page loads", async ({
    page,
  }) => {
    await page.goto("/login");

    await expect(page).toHaveURL(
      /login/
    );
  });

  test("requester login redirects to my-requests", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill(
      "#email",
      "requester@deskline.com"
    );

    await page.fill(
      "#password",
      "password123"
    );

    await page.getByRole("button", {
      name: "Sign In",
    }).click();

    await expect(page).toHaveURL(
      /my-requests/
    );
  });

  test("technician login redirects to queue", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill(
      "#email",
      "tech@deskline.com"
    );

    await page.fill(
      "#password",
      "password123"
    );

    await page.getByRole("button", {
      name: "Sign In",
    }).click();

    await expect(page).toHaveURL(
      /queue/
    );
  });

  test("admin login redirects to queue", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill(
      "#email",
      "admin@deskline.com"
    );

    await page.fill(
      "#password",
      "password123"
    );

    await page.getByRole("button", {
      name: "Sign In",
    }).click();

    await expect(page).toHaveURL(
      /queue/
    );
  });

  test("invalid password shows authentication error", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill(
      "#email",
      "requester@deskline.com"
    );

    await page.fill(
      "#password",
      "wrongpassword"
    );

    await page.getByRole("button", {
      name: "Sign In",
    }).click();

    await expect(
      page.getByText(
        "Invalid email or password."
      )
    ).toBeVisible();
  });
});