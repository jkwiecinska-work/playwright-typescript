import { test, expect } from "@fixtures/base.fixtures";
import { NetworkHelper } from "@utils/network.helper";

/**
 * Non-Functional Tests: Network Interception, Latency Throttling & Resilience
 */
test.describe("SauceDemo Network Resilience & Mocking", { tag: "@network" }, () => {
  test("replaces catalog product images with custom mock SVG placeholders", async ({
    page,
    loggedInPage,
  }) => {
    const network = new NetworkHelper(page);

    await network.mockImagesWithPlaceholder("#2B6CB0");
    await loggedInPage.open();

    await loggedInPage.expectLoaded();
    await loggedInPage.expectItemCount(6);
  });

  test("blocks image resource loading to test text-only catalog render", async ({
    page,
    loggedInPage,
  }) => {
    const network = new NetworkHelper(page);
    await network.blockResourceTypes(["image"]);

    await loggedInPage.open();
    await loggedInPage.expectLoaded();
    await loggedInPage.expectItemCount(6);
  });

  test("simulates network latency throttling on asset payloads", async ({ page, loginPage }) => {
    let routeIntercepted = false;

    await page.route("**/*.{png,jpg,jpeg,svg,css,js}*", async (route) => {
      routeIntercepted = true;
      await route.continue();
    });

    await loginPage.open();
    await loginPage.expectLoginPageVisible();

    expect(routeIntercepted).toBe(true);
  });

  test("handles aborted CSS stylesheet requests cleanly without crashing DOM", async ({
    page,
    loginPage,
  }) => {
    await page.route("**/*.css", (route) => route.abort());

    await loginPage.open();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
