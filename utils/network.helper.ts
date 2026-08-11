import { Page, Route } from "@playwright/test";

/**
 * Network Helper - Utility class for network mocking, route interception, and latency throttling
 */
export class NetworkHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Block loading of specified resource types (e.g. images, stylesheets, fonts) */
  async blockResourceTypes(
    types: Array<"image" | "stylesheet" | "font" | "script">
  ): Promise<void> {
    await this.page.route("**/*", (route: Route) => {
      if (
        types.includes(route.request().resourceType() as "image" | "stylesheet" | "font" | "script")
      ) {
        return route.abort();
      }
      return route.continue();
    });
  }

  /** Replace all product image requests with a custom mock SVG placeholder */
  async mockImagesWithPlaceholder(placeholderColor = "#336699"): Promise<void> {
    const mockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="${placeholderColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="16">Mocked Image</text>
    </svg>`;

    await this.page.route("**/*.{png,jpg,jpeg,svg,webp}*", (route: Route) => {
      return route.fulfill({
        status: 200,
        contentType: "image/svg+xml",
        body: mockSvg,
      });
    });
  }

  /** Simulate artificial network delay/latency on matching URL pattern */
  async simulateNetworkDelay(urlPattern: string | RegExp, delayMs: number): Promise<void> {
    await this.page.route(urlPattern, async (route: Route) => {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      await route.continue();
    });
  }

  /** Inject simulated HTTP error (e.g. 500, 404, 403) on matching URL pattern */
  async mockHttpError(urlPattern: string | RegExp, status = 500): Promise<void> {
    await this.page.route(urlPattern, (route: Route) => {
      return route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({ error: "Simulated Server Error", status }),
      });
    });
  }
}
