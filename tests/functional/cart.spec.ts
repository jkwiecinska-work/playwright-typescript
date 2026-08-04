import { test } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

/**
 * Functional UI Tests: Shopping Cart Management
 */
test.describe("SauceDemo Shopping Cart View", { tag: "@cart" }, () => {
  test(
    "displays added catalog items inside cart overview",
    { tag: "@smoke" },
    async ({ loggedInPage, cartPage }) => {
      await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
      await loggedInPage.addItemToCart(PRODUCTS.ONESIE.name);

      await loggedInPage.header.goToCart();
      await cartPage.expectLoaded();

      await cartPage.expectItemCount(2);
      await cartPage.expectItemInCart(PRODUCTS.BACKPACK.name);
      await cartPage.expectItemInCart(PRODUCTS.ONESIE.name);
    }
  );

  test("removes item directly from cart item list", async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();

    await cartPage.expectItemCount(1);
    await cartPage.removeItem(PRODUCTS.BACKPACK.name);
    await cartPage.expectItemCount(0);
    await cartPage.header.expectCartBadgeCount(0);
  });

  test("returns to inventory catalog on clicking continue shopping", async ({
    loggedInPage,
    cartPage,
  }) => {
    await loggedInPage.header.goToCart();
    await cartPage.expectLoaded();

    await cartPage.continueShopping();
    await loggedInPage.expectLoaded();
  });
});
