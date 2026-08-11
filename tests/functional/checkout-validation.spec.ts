import { test } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

/**
 * Functional UI Tests: Checkout Information Form Validations
 */
test.describe(
  "SauceDemo Checkout Form Mandatory Field Validations",
  { tag: ["@checkout", "@functional"] },
  () => {
    test.beforeEach(async ({ loggedInPage, cartPage, checkoutPage }) => {
      await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
      await loggedInPage.header.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.expectStepOneLoaded();
    });

    test.describe("Mandatory Field Validation Banners", { tag: "@regression" }, () => {
      test("displays validation banner when First Name field is omitted", async ({
        checkoutPage,
      }) => {
        await checkoutPage.fillInformation("", "Doe", "12345");
        await checkoutPage.continueToOverview();
        await checkoutPage.expectErrorMessage("Error: First Name is required");
      });

      test("displays validation banner when Last Name field is omitted", async ({
        checkoutPage,
      }) => {
        await checkoutPage.fillInformation("Jane", "", "12345");
        await checkoutPage.continueToOverview();
        await checkoutPage.expectErrorMessage("Error: Last Name is required");
      });

      test("displays validation banner when Postal Code field is omitted", async ({
        checkoutPage,
      }) => {
        await checkoutPage.fillInformation("Jane", "Doe", "");
        await checkoutPage.continueToOverview();
        await checkoutPage.expectErrorMessage("Error: Postal Code is required");
      });
    });
  }
);
