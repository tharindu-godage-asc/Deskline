import { test as base, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { RequestsListPage } from "./pages/RequestsListPage";
import { NewRequestPage } from "./pages/NewRequestPage";
import { RequestDetailPage } from "./pages/RequestDetailPage";

type Fixtures = {
  loginPage: LoginPage;
  requestsList: RequestsListPage;
  newRequestPage: NewRequestPage;
  requestDetail: RequestDetailPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  requestsList: async ({ page }, use) => use(new RequestsListPage(page)),
  newRequestPage: async ({ page }, use) => use(new NewRequestPage(page)),
  requestDetail: async ({ page }, use) => use(new RequestDetailPage(page)),
});

export { expect };
