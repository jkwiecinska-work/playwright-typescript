import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { HeaderComponent } from "./components/header.component";
import { TOTAL_PRODUCTS_COUNT } from "../test-data/products.data";

export type SortOption = "az" | "za" | "lohi" | "hilo";

/**
 * Inventory Page Object for SauceDemo
 */
export class InventoryPage extends BasePage {
  readonly header: HeaderComponent;
  readonly pageTitle: Locator;
  readonly sortSelect: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.pageTitle = page.getByTestId("title");
    this.sortSelect = page.getByTestId("product-sort-container");
    this.inventoryItems = page.getByTestId("inventory-item");
    this.inventoryItemNames = page.getByTestId("inventory-item-name");
    this.inventoryItemPrices = page.getByTestId("inventory-item-price");
  }

  /** Navigate to inventory page directly */
  async open(): Promise<void> {
    await this.goto("/inventory.html");
  }

  /** Change product sort order */
  async sortBy(option: SortOption): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  /** Get locator for a specific product item by name */
  getInventoryItem(productName: string): Locator {
    return this.inventoryItems.filter({ hasText: productName });
  }

  /** Add item to cart by product name */
  async addItemToCart(productName: string): Promise<void> {
    const item = this.getInventoryItem(productName);
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  /** Remove item from cart by product name */
  async removeItemFromCart(productName: string): Promise<void> {
    const item = this.getInventoryItem(productName);
    await item.getByRole("button", { name: "Remove" }).click();
  }

  // --- Assertions ---

  /** Verify page title and URL after user logs in */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.pageTitle).toHaveText("Products");
  }

  /** Verify number of items displayed */
  async expectItemCount(expectedCount: number = TOTAL_PRODUCTS_COUNT): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  /** Verify product list sorting by name */
  async expectItemsSortedByName(ascending = true): Promise<void> {
    const names = await this.inventoryItemNames.allInnerTexts();
    const sorted = [...names].sort((a, b) => (ascending ? a.localeCompare(b) : b.localeCompare(a)));
    expect(names).toEqual(sorted);
  }

  /** Verify product list sorting by price */
  async expectItemsSortedByPrice(ascending = true): Promise<void> {
    const priceTexts = await this.inventoryItemPrices.allInnerTexts();
    const prices = priceTexts.map((p) => parseFloat(p.replace("$", "")));
    const sorted = [...prices].sort((a, b) => (ascending ? a - b : b - a));
    expect(prices).toEqual(sorted);
  }
}
