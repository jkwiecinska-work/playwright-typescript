import { test } from "@fixtures/base.fixtures";
import { USERS } from "@test-data/users.data";

/**
 * Functional UI Tests: Authentication & Login Page
 */

const VALID_USERNAME = USERS.STANDARD.username;
const VALID_PASSWORD = USERS.STANDARD.password;

test.describe("SauceDemo Login Functional Tests", { tag: "@login" }, () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test.describe("Login Page Form & Elements Display", () => {
    test(
      "displays all core login form controls and logo",
      { tag: "@smoke" },
      async ({ loginPage }) => {
        await loginPage.expectLoginPageVisible();
        await loginPage.verifyTitle("Swag Labs");
      }
    );
  });

  test.describe("Successful Login Workflows", () => {
    test(
      "redirects user to inventory catalog on valid credentials",
      { tag: "@smoke" },
      async ({ loginPage, inventoryPage }) => {
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        await inventoryPage.expectLoaded();
      }
    );
  });

  test.describe("Login Form Validations & Error Handling", { tag: "@regression" }, () => {
    test("shows error banner for locked out user", async ({ loginPage }) => {
      await loginPage.login(USERS.LOCKED_OUT.username, VALID_PASSWORD);
      await loginPage.expectErrorMessage("Sorry, this user has been locked out");
    });

    test("shows validation error when username is empty", async ({ loginPage }) => {
      await loginPage.login("", VALID_PASSWORD);
      await loginPage.expectErrorMessage("Username is required");
    });

    test("shows validation error when password is empty", async ({ loginPage }) => {
      await loginPage.login(VALID_USERNAME, "");
      await loginPage.expectErrorMessage("Password is required");
    });

    test("shows validation error when both fields are empty", async ({ loginPage }) => {
      await loginPage.login("", "");
      await loginPage.expectErrorMessage("Username is required");
    });

    test("shows error message on invalid credentials", async ({ loginPage }) => {
      await loginPage.login("invalid_user", "wrong_password");
      await loginPage.expectErrorMessage("Username and password do not match any user");
    });

    test("retains user on login page following authentication failure", async ({ loginPage }) => {
      await loginPage.login("invalid_user", "wrong_password");
      await loginPage.expectOnLoginPage();
    });

    test("dismisses error message banner when close button is clicked", async ({ loginPage }) => {
      await loginPage.login("", VALID_PASSWORD);
      await loginPage.expectErrorMessage("Username is required");
      await loginPage.dismissError();
      await loginPage.expectErrorHidden();
    });
  });
});
