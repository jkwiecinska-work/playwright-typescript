import { test, expect } from "@fixtures/base.fixtures";

/**
 * Non-Functional Tests: Accessibility & WCAG 2.1 AA Compliance Audits
 */
test.describe("SauceDemo Accessibility Audits (WCAG 2.1 AA)", { tag: "@a11y" }, () => {
  test("audits Login Page accessibility", async ({ loginPage, makeAxeBuilder }) => {
    await loginPage.open();
    const results = await makeAxeBuilder().analyze();
    expect(results.violations, "Login Page has accessibility violations").toEqual([]);
  });

  test("audits Inventory Catalog accessibility", async ({ loggedInPage, makeAxeBuilder }) => {
    await loggedInPage.expectLoaded();
    // Exclude third-party legacy WCAG issues on SauceDemo: color-contrast and unlabelled select dropdown
    const results = await makeAxeBuilder()
      .disableRules(["color-contrast", "select-name"])
      .analyze();

    expect(results.violations, "Inventory Page has accessibility violations").toEqual([]);
  });

  test("audits Shopping Cart View accessibility", async ({
    loggedInPage,
    cartPage,
    makeAxeBuilder,
  }) => {
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations, "Cart Page has accessibility violations").toEqual([]);
  });

  test("audits Checkout Information Form accessibility", async ({
    loggedInPage,
    cartPage,
    checkoutPage,
    makeAxeBuilder,
  }) => {
    await loggedInPage.header.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectStepOneLoaded();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations, "Checkout Page has accessibility violations").toEqual([]);
  });
});
