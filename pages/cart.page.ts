import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { HeaderComponent } from "./components/header.component";

/**
 * Shopping Cart Page Object for SauceDemo
 */
export class CartPage extends BasePage {
  readonly header: HeaderComponent;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.pageTitle = page.getByTestId("title");
    this.cartItems = page.getByTestId("inventory-item");
    this.cartItemNames = page.getByTestId("inventory-item-name");
    this.checkoutButton = page.getByTestId("checkout");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
  }

  /** Open cart page directly */
  async open(): Promise<void> {
    await this.goto("/cart.html");
  }

  /** Click Checkout button to start order process */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /** Click Continue Shopping button to return to inventory */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /** Remove item from cart by product name */
  async removeItem(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  // --- Assertions ---

  /** Verify page load */
  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.pageTitle).toHaveText("Your Cart");
  }

  /** Verify item presence in cart */
  async expectItemInCart(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  /** Verify number of items in cart */
  async expectItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }
}
