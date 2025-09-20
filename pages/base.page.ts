import { Page, Locator, expect } from "@playwright/test";

/**
 * Base Page Class - Foundation for all Page Objects
 */

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * Uses method chaining pattern for fluent syntax
   */
  async goto(url: string): Promise<BasePage> {
    await this.page.goto(url);
    return this;
  }

  /**
   * Wait for page to be fully loaded
   * Useful for SPA applications
   */
  async waitForPageLoad(): Promise<BasePage> {
    await this.page.waitForLoadState("networkidle");
    return this;
  }

  /**
   * Wait for element to be visible
   * Common pattern in UI testing
   */
  async waitForElement(locator: Locator): Promise<BasePage> {
    await locator.waitFor({ state: "visible" });
    return this;
  }

  /**
   * Get page title - useful for navigation verification
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL - useful for route verification
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Assert page title
   * Common verification pattern
   */
  async verifyTitle(expectedTitle: string): Promise<BasePage> {
    await expect(this.page).toHaveTitle(expectedTitle);
    return this;
  }
}
