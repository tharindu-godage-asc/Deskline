import type { Locator, Page } from "@playwright/test";
import { PASSWORD } from "../support/users";

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly signIn: Locator;
  /** Inline error box. Scoped to <main> because the same text also appears in a toast. */
  readonly authError: Locator;
  readonly logout: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel("Email");
    this.password = page.getByLabel("Password");
    this.signIn = page.getByRole("button", { name: "Sign In" });
    this.authError = page.getByRole("main").getByText("Invalid email or password.");
    this.logout = page.getByRole("button", { name: "Logout" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string = PASSWORD) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signIn.click();
  }

  fieldError(message: string) {
    return this.page.getByRole("main").getByText(message, { exact: true });
  }
}
