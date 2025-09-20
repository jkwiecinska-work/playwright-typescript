import { test, expect } from "../fixtures/base.fixtures";

/**
 * Login Tests for SauceDemo
 *
 * This file demonstrates how to use the POM framework with fixtures
 * to create clean, maintainable tests for login functionality.
 */

test.describe("SauceDemo Login", () => {
  test.describe("Successful Login Scenarios", () => {
    test("should display saucedemo login page", async ({ basePage }) => {
      // Navigate to base page
      await basePage.goto("https://www.saucedemo.com/");

      // Verify login page loads correctly
      await basePage.verifyTitle("Swag Labs");
    });
  });
});
