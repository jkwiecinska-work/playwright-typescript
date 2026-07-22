import { Page, expect } from "@playwright/test";

/**
 * Base Page Class - Foundation for all Page Objects
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to a specific URL */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /** Assert page title */
  async verifyTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }
}
