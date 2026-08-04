import { Locator, Page, expect } from "@playwright/test";

/**
 * Header Component - Encapsulates top header bar, cart badge & sidebar menu
 */
export class HeaderComponent {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.getByTestId("logout-sidebar-link");
    this.resetAppStateLink = page.getByTestId("reset-sidebar-link");
  }

  /** Open side menu */
  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  /** Logout current user */
  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  /** Reset application state (clears cart/session) */
  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }

  /** Navigate to cart page */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  /** Assert cart badge quantity */
  async expectCartBadgeCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
  }
}
