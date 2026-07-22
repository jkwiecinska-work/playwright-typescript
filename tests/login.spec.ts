import { test } from "../fixtures/base.fixtures";

/**
 * Login Tests for SauceDemo
 *
 * Demonstrates the POM + Custom Fixtures pattern:
 * - LoginPage object handles selectors and actions
 * - Fixtures inject `loginPage` automatically into each test
 * - Tests stay clean and focused on business logic
 *
 * @see https://www.saucedemo.com/ - test application
 * @see https://playwright.dev/docs/pom - Page Object Model docs
 */

const VALID_USERNAME = "standard_user";
const VALID_PASSWORD = "secret_sauce";

test.describe("SauceDemo Login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test.describe("Login Page UI", () => {
    test("displays all login form elements", async ({ loginPage }) => {
      await loginPage.expectLoginPageVisible();
      await loginPage.verifyTitle("Swag Labs");
    });
  });

  test.describe("Successful Login", () => {
    test("redirects to inventory page with valid credentials", async ({ loginPage }) => {
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await loginPage.expectSuccessfulLogin();
    });
  });

  test.describe("Failed Login Scenarios", () => {
    test("shows error for locked out user", async ({ loginPage }) => {
      await loginPage.login("locked_out_user", VALID_PASSWORD);
      await loginPage.expectErrorMessage("Sorry, this user has been locked out");
    });

    test("shows error for empty username", async ({ loginPage }) => {
      await loginPage.login("", VALID_PASSWORD);
      await loginPage.expectErrorMessage("Username is required");
    });

    test("shows error for empty password", async ({ loginPage }) => {
      await loginPage.login(VALID_USERNAME, "");
      await loginPage.expectErrorMessage("Password is required");
    });

    test("shows error for both fields empty", async ({ loginPage }) => {
      await loginPage.login("", "");
      await loginPage.expectErrorMessage("Username is required");
    });

    test("shows error for invalid credentials", async ({ loginPage }) => {
      await loginPage.login("invalid_user", "wrong_password");
      await loginPage.expectErrorMessage("Username and password do not match any user");
    });

    test("stays on login page after failed login attempt", async ({ loginPage }) => {
      await loginPage.login("invalid_user", "wrong_password");
      await loginPage.expectOnLoginPage();
    });

    test("dismisses error message when close button is clicked", async ({ loginPage }) => {
      await loginPage.login("", VALID_PASSWORD);
      await loginPage.expectErrorMessage("Username is required");
      await loginPage.dismissError();
      await loginPage.expectErrorHidden();
    });
  });
});
