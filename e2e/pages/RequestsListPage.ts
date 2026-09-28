import { expect, type Locator, type Page } from "@playwright/test";

/** Shared by the requester's "My Requests" page and the staff "Queue" page. */
export class RequestsListPage {
  readonly search: Locator;
  readonly newRequestButton: Locator;
  /** Not wired to a <label>, so found by its unique "Me" option instead of getByLabel. */
  readonly assigneeFilter: Locator;

  constructor(private readonly page: Page) {
    this.search = page.getByPlaceholder("Search by title...");
    this.newRequestButton = page.getByRole("button", { name: "New Request" });
    this.assigneeFilter = page
      .locator("select")
      .filter({ has: page.getByRole("option", { name: "Me", exact: true }) });
  }

  async filterAssignedToMe() {
    await this.assigneeFilter.selectOption("me");
  }

  async gotoMyRequests() {
    await this.page.goto("/my-requests");
  }

  async gotoQueue() {
    await this.page.goto("/queue");
  }

  /** Request cards are virtualised, so narrow the list before locating a row. */
  async searchFor(title: string) {
    await this.search.fill(title);
  }

  /** The card title (h3). Exact match so "VPN not connecting" does not match "VPN not connecting-asignn test". */
  title(title: string) {
    return this.page.getByRole("heading", { level: 3, name: title, exact: true });
  }

  statusBadge(title: string) {
    return this.title(title).locator("..").locator("span").first();
  }

  async openDetails(title: string) {
    await this.searchFor(title);
    // The search is debounced; wait until the list has narrowed to a single card.
    const viewDetails = this.page.getByRole("button", { name: "View Details" });
    await expect(this.title(title)).toBeVisible();
    await expect(viewDetails).toHaveCount(1);
    await viewDetails.click();
  }
}
