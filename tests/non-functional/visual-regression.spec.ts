import { test, expect } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

/**
 * Non-Functional Tests: Visual Snapshot Regression
 */
test.describe("SauceDemo Visual Snapshot Regression", { tag: "@visual" }, () => {
  test("matches Login Page full layout visual snapshot", async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.expectLoginPageVisible();

    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true,
    });
  });

  test("matches Login Logo & Form component element snapshot", async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.loginLogo).toHaveScreenshot("login-logo.png");
  });

  test("matches Inventory Catalog Page full layout visual snapshot", async ({
    page,
    loggedInPage,
  }) => {
    await loggedInPage.expectLoaded();

    await expect(page).toHaveScreenshot("inventory-page.png", {
      fullPage: true,
    });
  });

  test("matches Header Cart Link element snapshot with badge count", async ({ loggedInPage }) => {
    await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
    await loggedInPage.header.expectCartBadgeCount(1);

    await expect(loggedInPage.header.cartLink).toHaveScreenshot("header-cart-badge.png");
  });

  test("matches Shopping Cart Page full layout visual snapshot", async ({
    page,
    loggedInPage,
    cartPage,
  }) => {
    await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();

    await expect(page).toHaveScreenshot("cart-page.png", {
      fullPage: true,
    });
  });
});
