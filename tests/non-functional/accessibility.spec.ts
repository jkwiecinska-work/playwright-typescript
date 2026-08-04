import { test, expect } from "@fixtures/base.fixtures";

/**
 * Non-Functional Tests: Accessibility & WCAG 2.1 AA Compliance Audits
 */
test.describe("SauceDemo Accessibility Audits (WCAG 2.1 AA)", { tag: "@a11y" }, () => {
  test("audits Login Page accessibility", async ({ loginPage, makeAxeBuilder }) => {
    await loginPage.open();
    const results = await makeAxeBuilder().analyze();

    if (results.violations.length > 0) {
      console.log(
        `Login Page A11y Violations (${results.violations.length}):`,
        results.violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description }))
      );
    }

    expect(results.violations).toEqual([]);
  });

  test("audits Inventory Catalog accessibility", async ({ loggedInPage, makeAxeBuilder }) => {
    await loggedInPage.expectLoaded();
    // Exclude third-party legacy WCAG issues on SauceDemo: color-contrast and unlabelled select dropdown
    const results = await makeAxeBuilder()
      .disableRules(["color-contrast", "select-name"])
      .analyze();

    if (results.violations.length > 0) {
      console.log(
        `Inventory Page A11y Violations (${results.violations.length}):`,
        results.violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description }))
      );
    }

    expect(results.violations).toEqual([]);
  });

  test("audits Shopping Cart View accessibility", async ({
    loggedInPage,
    cartPage,
    makeAxeBuilder,
  }) => {
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();

    const results = await makeAxeBuilder().analyze();

    if (results.violations.length > 0) {
      console.log(
        `Cart Page A11y Violations (${results.violations.length}):`,
        results.violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description }))
      );
    }

    expect(results.violations).toEqual([]);
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

    if (results.violations.length > 0) {
      console.log(
        `Checkout Page A11y Violations (${results.violations.length}):`,
        results.violations.map((v) => ({ id: v.id, impact: v.impact, description: v.description }))
      );
    }

    expect(results.violations).toEqual([]);
  });
});
