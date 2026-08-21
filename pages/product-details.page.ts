import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Product Details Page Object
 */
export class ProductDetailsPage extends BasePage {
  readonly backButton: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.getByTestId("back-to-products");
    this.productName = page.getByTestId("inventory-item-name");
    this.productDescription = page.getByTestId("inventory-item-desc");
    this.productPrice = page.getByTestId("inventory-item-price");
    this.addToCartButton = page.getByTestId("add-to-cart");
  }

  /** Assert that the product details page is loaded correctly */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.backButton).toBeVisible();
    await expect(this.productName).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  /** Assert that the product details match expected name and price */
  async expectProduct(expectedName: string, expectedPrice?: string): Promise<void> {
    await expect(this.productName).toHaveText(expectedName);
    if (expectedPrice) {
      await expect(this.productPrice).toHaveText(expectedPrice);
    }
  }

  /** Click back to products button */
  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }
}
