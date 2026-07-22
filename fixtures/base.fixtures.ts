import { test as base } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";

/**
 * Custom test fixtures for the project.
 *
 * Instead of manually creating page objects in every test,
 * fixtures inject them automatically:
 *
 *   test('example', async ({ loginPage }) => { ... })
 *
 * This keeps tests clean and avoids repetitive setup code.
 */

type PageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
};

export const test = base.extend<PageFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
