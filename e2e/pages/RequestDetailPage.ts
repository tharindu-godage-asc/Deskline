import type { Locator, Page } from "@playwright/test";

export class RequestDetailPage {
  readonly commentBox: Locator;
  readonly addComment: Locator;
  readonly commentsDisabled: Locator;
  readonly confirmDialogConfirm: Locator;
  /** Neither this select nor the queue's Assignee filter has a label wired to it, so
   * they're found by a unique <option> inside them rather than getByLabel. */
  readonly reassignSelect: Locator;
  readonly reassignButton: Locator;

  constructor(private readonly page: Page) {
    this.commentBox = page.getByPlaceholder("Add a comment...");
    this.addComment = page.getByRole("button", { name: "Add Comment" });
    this.commentsDisabled = page.getByText(/Comments are disabled/);
    this.confirmDialogConfirm = page.getByRole("button", { name: "Confirm" });
    this.reassignSelect = page
      .locator("select")
      .filter({ has: page.getByRole("option", { name: "Select Assignee" }) });
    this.reassignButton = page.getByRole("button", { name: "Reassign", exact: true });
  }

  async reassign(technicianName: string) {
    await this.reassignSelect.selectOption({ label: technicianName });
    await this.reassignButton.click();
  }

  heading(title: string) {
    return this.page.getByRole("heading", { level: 2, name: title });
  }

  status(value: string) {
    return this.page.getByText(`Status: ${value}`, { exact: true });
  }

  assignee(name: string) {
    return this.page.getByText(`Assignee: ${name}`);
  }

  action(name: string) {
    return this.page.getByRole("button", { name, exact: true });
  }

  toast(message: string) {
    return this.page.getByText(message, { exact: true });
  }

  async comment(body: string) {
    await this.commentBox.fill(body);
    await this.addComment.click();
  }
}
