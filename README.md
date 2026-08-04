# Playwright TypeScript Testing Framework

[![Playwright Tests](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml)

End-to-end test automation framework built with **Playwright** and **TypeScript**, targeting the [SauceDemo](https://www.saucedemo.com/) web application.

This repository demonstrates modern test automation practices including Page Object Model (POM), custom fixtures for dependency injection, accessibility auditing (`@axe-core/playwright`), network mocking, visual regression testing, and multi-environment configuration.

---

## Prerequisites

- **Node.js**: `v22` or `v24` (LTS recommended)
- **npm**: `v10+`

---

## Quick Start

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/jkwiecinska-work/playwright-typescript.git
   cd playwright-typescript
   npm install
   ```

2. **Set up environment configuration:**
   Copy the template environment file to `.env`:

   ```bash
   cp .env.example .env
   ```

3. **Run the test suite:**
   ```bash
   npm test
   ```

---

## Running Tests & Available Scripts

| Command                      | Description                                                          |
| :--------------------------- | :------------------------------------------------------------------- |
| `npm test`                   | Runs all tests in headless mode across Chromium, Firefox, and WebKit |
| `npm run test:headed`        | Runs tests with visible browser UI                                   |
| `npm run test:ui`            | Opens Playwright Interactive UI Mode                                 |
| `npm run test:smoke`         | Runs critical smoke tests (`@smoke` tag)                             |
| `npm run test:e2e`           | Runs full end-to-end purchase flow specs                             |
| `npm run test:a11y`          | Runs WCAG 2.1 AA accessibility audits                                |
| `npm run test:network`       | Runs network interception and latency throttling tests               |
| `npm run test:visual`        | Runs visual snapshot regression tests                                |
| `npm run test:visual:update` | Updates baseline visual snapshot images                              |
| `npm run test:staging`       | Runs tests against staging environment (`.env.staging`)              |
| `npm run test:prod`          | Runs tests against production environment (`.env.prod`)              |
| `npm run typecheck`          | Checks TypeScript types (`tsc --noEmit`)                             |
| `npm run lint`               | Runs ESLint checks across the repository                             |
| `npm run report`             | Opens the HTML test report in your default browser                   |

---

## Project Structure

```
├── config/
│   └── env.config.ts          # Central environment config & credentials loader
├── fixtures/
│   └── base.fixtures.ts       # Extended Playwright fixtures (POM, auth, axeBuilder)
├── pages/                     # Page Object Model layer
│   ├── base.page.ts           # Base page class with common interaction methods
│   ├── login.page.ts          # Login page object
│   ├── inventory.page.ts      # Product catalog page object
│   ├── cart.page.ts           # Shopping cart page object
│   ├── checkout.page.ts       # Checkout process page object
│   └── components/
│       └── header.component.ts # Navigation header component
├── test-data/                 # Static data constants (users, products)
├── tests/                     # Categorized test specs
│   ├── e2e/                   # Multi-page user flows (checkout journey)
│   ├── functional/            # Page & feature functional tests (login, cart, inventory)
│   └── non-functional/        # Specialized audits (accessibility, visual, network)
└── utils/                     # Utility helpers (network interception, throttling)
```

---

## Core Practices

- **Page Object Model (POM)**: Element locators and page actions belong inside page classes in `pages/` or components in `pages/components/`, never directly in spec files.
- **Dependency Injection**: Custom fixtures in `fixtures/base.fixtures.ts` inject page objects into test functions and provide pre-authenticated states (`loggedInPage`).
- **Semantic Locators**: Tests prioritize Playwright semantic locators (`getByTestId`, `getByRole`, `getByText`) over CSS or XPath.
- **Multi-Environment Setup**: Environment configuration is managed via `config/env.config.ts` supporting `.env`, `.env.staging`, and `.env.prod`.

---

## CI/CD & Reporting

Tests automatically run on GitHub Actions on every pull request and push to `main` / `develop`.

View HTML test reports after running tests:

```bash
npm run report
```
