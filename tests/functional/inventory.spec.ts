import { test } from "@fixtures/base.fixtures";
import { PRODUCTS } from "@test-data/products.data";

/**
 * Functional UI Tests: Inventory Catalog & Product Sorting
 */
test.describe("SauceDemo Inventory Catalog", { tag: "@inventory" }, () => {
  test("renders complete list of catalog items", { tag: "@smoke" }, async ({ loggedInPage }) => {
    await loggedInPage.expectItemCount(6);
  });

  test.describe("Catalog Sorting Functionality", { tag: "@regression" }, () => {
    test("sorts catalog items alphabetically (A to Z) by default", async ({ loggedInPage }) => {
      await loggedInPage.expectItemsSortedByName(true);
    });

    test("sorts catalog items in reverse alphabetical order (Z to A)", async ({ loggedInPage }) => {
      await loggedInPage.sortBy("za");
      await loggedInPage.expectItemsSortedByName(false);
    });

    test("sorts catalog items by price in ascending order (low to high)", async ({
      loggedInPage,
    }) => {
      await loggedInPage.sortBy("lohi");
      await loggedInPage.expectItemsSortedByPrice(true);
    });

    test("sorts catalog items by price in descending order (high to low)", async ({
      loggedInPage,
    }) => {
      await loggedInPage.sortBy("hilo");
      await loggedInPage.expectItemsSortedByPrice(false);
    });
  });

  test.describe("Inventory Cart Badge Updates", { tag: "@smoke" }, () => {
    test("dynamically updates header cart count badge on item additions and removals", async ({
      loggedInPage,
    }) => {
      await loggedInPage.header.expectCartBadgeCount(0);

      await loggedInPage.addItemToCart(PRODUCTS.BACKPACK.name);
      await loggedInPage.header.expectCartBadgeCount(1);

      await loggedInPage.addItemToCart(PRODUCTS.BIKE_LIGHT.name);
      await loggedInPage.header.expectCartBadgeCount(2);

      await loggedInPage.removeItemFromCart(PRODUCTS.BACKPACK.name);
      await loggedInPage.header.expectCartBadgeCount(1);
    });
  });
});
