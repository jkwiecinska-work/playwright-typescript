import { test } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

/**
 * End-to-End User Journey Tests: Complete Checkout & Purchase Order
 */
test.describe("SauceDemo E2E Purchase Order Journey", { tag: ["@e2e", "@smoke"] }, () => {
  test("completes end-to-end checkout flow from catalog selection to order confirmation", async ({
    loggedInPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Add items to cart from inventory
    await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
    await loggedInPage.addItemToCart(PRODUCTS.BOLT_TSHIRT.name);
    await loggedInPage.header.expectCartBadgeCount(2);

    // 2. Open cart and proceed to checkout
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);
    await cartPage.proceedToCheckout();

    // 3. Step 1: Customer Information
    await checkoutPage.expectStepOneLoaded();
    await checkoutPage.fillInformation("Jane", "Doe", "12-345");
    await checkoutPage.continueToOverview();

    // 4. Step 2: Order Overview & Finish
    await checkoutPage.expectStepTwoLoaded();
    await checkoutPage.finishOrder();

    // 5. Complete Page confirmation
    await checkoutPage.expectOrderComplete();

    // 6. Return Home
    await checkoutPage.backHome();
    await loggedInPage.expectLoaded();
  });

  test.describe("Checkout Form Mandatory Field Validations", { tag: "@regression" }, () => {
    test.beforeEach(async ({ loggedInPage, cartPage, checkoutPage }) => {
      await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
      await loggedInPage.header.goToCart();
      await cartPage.proceedToCheckout();
      await checkoutPage.expectStepOneLoaded();
    });

    test("displays validation banner when First Name field is omitted", async ({
      checkoutPage,
    }) => {
      await checkoutPage.fillInformation("", "Doe", "12345");
      await checkoutPage.continueToOverview();
      await checkoutPage.expectErrorMessage("Error: First Name is required");
    });

    test("displays validation banner when Last Name field is omitted", async ({ checkoutPage }) => {
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
});
