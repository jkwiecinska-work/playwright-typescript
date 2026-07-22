import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Login Page Object for SauceDemo
 *
 * Encapsulates all login-related selectors and actions.
 * Uses Playwright's recommended locator strategies:
 * - getByTestId for data-test attributes (SauceDemo uses these)
 * - getByRole for semantic elements
 * - getByText for visible text content
 */
export class LoginPage extends BasePage {
  // --- Locators ---
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorDismissButton: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
    this.errorDismissButton = page.getByTestId("error-button");
    this.loginLogo = page.locator(".login_logo");
  }

  // --- Actions ---

  /** Navigate to the SauceDemo login page */
  async open(): Promise<void> {
    await this.goto("https://www.saucedemo.com/");
  }

  /** Fill in the login form and submit */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Dismiss the error message by clicking the close button */
  async dismissError(): Promise<void> {
    await this.errorDismissButton.click();
  }

  // --- Assertions ---

  /** Verify that the login page is displayed correctly */
  async expectLoginPageVisible(): Promise<void> {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  /** Verify that a specific error message is displayed */
  async expectErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }

  /** Verify that the error message is not visible */
  async expectErrorHidden(): Promise<void> {
    await expect(this.errorMessage).toBeHidden();
  }

  /** Verify that the user has been redirected to the inventory page after login */
  async expectSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  /** Verify that the user remains on the login page */
  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/");
  }
}

