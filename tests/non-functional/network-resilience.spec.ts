import { test, expect } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

test.describe(
  "Application behavior with slow or blocked network resources",
  { tag: "@network" },
  () => {
    test("should display catalog with product items when images are replaced with SVG", async ({
      networkHelper,
      loggedInPage,
    }) => {
      await networkHelper.mockImagesWithPlaceholder("#2B6CB0");
      await loggedInPage.open();

      await loggedInPage.expectLoaded();
      await loggedInPage.expectItemCount();
    });

    test("should display catalog items even if image loading is blocked", async ({
      networkHelper,
      loggedInPage,
    }) => {
      await networkHelper.blockResourceTypes(["image"]);

      await loggedInPage.open();
      await loggedInPage.expectLoaded();
      await loggedInPage.expectItemCount();
    });

    test("should open login page correctly with slow network", async ({
      networkHelper,
      loginPage,
    }) => {
      await networkHelper.simulateNetworkDelay("**/*.{png,jpg,jpeg,svg,css,js}*", 200);

      await loginPage.open();
      await loginPage.expectLoginPageVisible();
    });

    test("should display login form even if CSS stylesheets fail to load", async ({
      networkHelper,
      loginPage,
    }) => {
      await networkHelper.blockResourceTypes(["stylesheet"]);

      await loginPage.open();
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    /** Network errors */
    test("should handle 500 server error when product images fail to load", async ({
      networkHelper,
      loggedInPage,
    }) => {
      await networkHelper.mockHttpError("**/*.{png,jpg,jpeg,svg,webp}*", 500);
      await loggedInPage.open();
      await loggedInPage.expectLoaded();
      await loggedInPage.expectItemCount();
    });

    test("should handle 404 not found error when loading product images", async ({
      networkHelper,
      loggedInPage,
    }) => {
      await networkHelper.mockHttpError("**/*.{png,jpg,jpeg,svg,webp}*", 404);
      await loggedInPage.open();
      await loggedInPage.expectLoaded();
      await loggedInPage.expectItemCount();
    });
  }
);

test.describe("User Interactions under degraded network conditions", { tag: "@network" }, () => {
  test("should allow navigating to product details even when image loading is blocked", async ({
    networkHelper,
    loggedInPage,
    productDetailsPage,
  }) => {
    await networkHelper.blockResourceTypes(["image"]);
    await loggedInPage.open();
    await loggedInPage
      .getInventoryItem(PRODUCTS.BACKPACK.name)
      .getByTestId("inventory-item-name")
      .click();
    await productDetailsPage.expectLoaded();
    await productDetailsPage.expectProduct(PRODUCTS.BACKPACK.name, PRODUCTS.BACKPACK.price);
  });
});
