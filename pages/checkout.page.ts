import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";

/**
 * Checkout Flow Page Object for SauceDemo (Step 1, Step 2 & Complete)
 */
export class CheckoutPage extends BasePage {
  readonly pageTitle: Locator;

  // Step 1: Information
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  // Step 2: Overview
  readonly summaryItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Complete Page
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId("title");

    // Step 1
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.cancelButton = page.getByTestId("cancel");
    this.errorMessage = page.getByTestId("error");

    // Step 2
    this.summaryItems = page.getByTestId("inventory-item");
    this.subtotalLabel = page.getByTestId("subtotal-label");
    this.taxLabel = page.getByTestId("tax-label");
    this.totalLabel = page.getByTestId("total-label");
    this.finishButton = page.getByTestId("finish");

    // Complete
    this.completeHeader = page.getByTestId("complete-header");
    this.completeText = page.getByTestId("complete-text");
    this.backHomeButton = page.getByTestId("back-to-products");
  }

  /** Fill step 1 information form */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /** Submit step 1 form to continue to overview */
  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  /** Submit step 2 to complete order */
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  /** Click back home button from completion screen */
  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }

  // --- Assertions ---

  /** Verify Step 1 is loaded */
  async expectStepOneLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.pageTitle).toHaveText("Checkout: Your Information");
  }

  /** Verify Step 2 (Overview) is loaded */
  async expectStepTwoLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
    await expect(this.pageTitle).toHaveText("Checkout: Overview");
  }

  /** Verify order complete screen */
  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.pageTitle).toHaveText("Checkout: Complete!");
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  /** Verify step 1 validation error message */
  async expectErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
