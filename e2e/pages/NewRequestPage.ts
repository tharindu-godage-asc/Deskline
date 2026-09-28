import type { Locator, Page } from "@playwright/test";

export type NewRequestData = {
  title: string;
  category: "hardware" | "software" | "facilities" | "access";
  priority?: "low" | "medium" | "high";
  description: string;
};

export class NewRequestPage {
  readonly title: Locator;
  readonly category: Locator;
  readonly priority: Locator;
  readonly description: Locator;
  readonly submit: Locator;
  readonly backToRequests: Locator;

  constructor(page: Page) {
    this.title = page.getByLabel("Title");
    this.category = page.getByLabel("Category");
    this.priority = page.getByLabel("Priority");
    this.description = page.getByLabel("Description");
    this.submit = page.getByRole("button", { name: /Submit Request|Creating/ });
    this.backToRequests = page.getByRole("button", { name: "Back to Requests" });
  }

  async fill(data: NewRequestData) {
    await this.title.fill(data.title);
    await this.category.selectOption(data.category);
    if (data.priority) await this.priority.selectOption(data.priority);
    await this.description.fill(data.description);
  }
}
