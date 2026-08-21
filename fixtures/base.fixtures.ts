import { test as base } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { USERS } from "../test-data/users.data";
import { NetworkHelper } from "../utils/network.helper";

/**
 * Custom test fixtures for Playwright test automation framework.
 *
 * Injects Page Objects and Accessibility audit tool (AxeBuilder) into test contexts:
 *   test('example', async ({ inventoryPage, makeAxeBuilder }) => { ... })
 */

type PageFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  loggedInPage: InventoryPage;
  productDetailsPage: ProductDetailsPage;
  networkHelper: NetworkHelper;
  makeAxeBuilder: () => AxeBuilder;
};

export const test = base.extend<PageFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  networkHelper: async ({ page }, use) => {
    await use(new NetworkHelper(page));
  },

  /**
   * Fixture that automatically opens the login page, logs in with standard_user,
   * asserts inventory loaded, and provides the InventoryPage object.
   */
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },

  /**
   * Fixture providing pre-configured AxeBuilder for accessibility audits.
   * Targets WCAG 2.0 A/AA and WCAG 2.1 A/AA standards.
   */
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]);
    await use(makeAxeBuilder);
  },
});

export { expect } from "@playwright/test";
