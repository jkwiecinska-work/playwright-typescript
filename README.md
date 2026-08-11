# Playwright TypeScript Test Automation Showcase

[![Playwright Tests](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml)

Welcome! Having previously built test automation frameworks in **Python**, I created this project to learn **Playwright** and **TypeScript** using the [SauceDemo](https://www.saucedemo.com/) web app.

My goal here is to practice TypeScript, build a clean test framework using solid testing standards, and experiment with AI pair programming along the way.

---

## 🎯 Key Framework Highlights

Here is how the framework is set up:

- **Page Object Model (POM)**: Locators and page actions live inside `pages/` and `pages/components/`, keeping test files clean and readable.
- **Custom Playwright Fixtures**: Page objects, logged-in states (`loggedInPage`), and audit tools (`makeAxeBuilder`) are injected via `fixtures/base.fixtures.ts` to avoid repetitive setup code.
- **Clean Test Organization**:
  - `tests/e2e/`: Full multi-page user journeys (like completing a purchase order).
  - `tests/functional/`: Individual page and form validation tests (login, cart, inventory).
  - `tests/non-functional/`: Accessibility audits (WCAG 2.1 AA via `@axe-core/playwright`), network mocking, and visual regression tests.
- **Environment Config & Security**: Credentials and environment settings are loaded securely from `.env` files via `config/env.config.ts` without hardcoding sensitive data.
- **Reliable Locators & Assertions**: Built using Playwright's semantic locators (`getByRole`, `getByText`, `getByTestId`) and web-first async assertions (`await expect(...)`).

---

## 📁 Repository Structure

```
├── config/
│   └── env.config.ts           # Environment & security config loader
├── fixtures/
│   └── base.fixtures.ts        # Custom Playwright fixtures & dependency injection
├── pages/                      # Page Object Model layer
│   ├── base.page.ts            # Base page class with common interaction methods
│   ├── login.page.ts           # Login page object
│   ├── inventory.page.ts       # Product catalog page object
│   ├── cart.page.ts            # Shopping cart page object
│   ├── checkout.page.ts        # Checkout process page object
│   └── components/
│       └── header.component.ts  # Navigation header component
├── test-data/                  # Static test data & catalog constants
├── tests/                      # Categorized test specs
│   ├── e2e/                    # End-to-end user journeys
│   ├── functional/             # Functional UI & form validation specs
│   └── non-functional/         # Accessibility, network resilience, & visual regression
└── utils/                      # Network interception & latency helpers
```

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/jkwiecinska-work/playwright-typescript.git
cd playwright-typescript
npm install
```

### 2. Environment Setup

Copy the template environment file to `.env`:

```bash
cp .env.example .env
```

### 3. Execution Commands

```bash
# Run all tests (headless across Chromium, Firefox, WebKit)
npm test

# Run tests in interactive UI mode
npm run test:ui

# Run critical smoke tests
npm run test:smoke

# Run specific test suites
npm run test:e2e        # E2E purchase flow
npm run test:functional # Functional specs
npm run test:a11y        # Accessibility (WCAG 2.1 AA) audits
npm run test:network     # Network mocking & throttling tests
npm run test:visual      # Visual regression tests

# Code quality & type safety
npm run typecheck       # TypeScript static type check (tsc --noEmit)
npm run lint            # ESLint code style check
```

---

## 📊 CI/CD & HTML Reporting

This repository includes a GitHub Actions pipeline (`.github/workflows/playwright.yml`) that automatically runs linting, type checks, and tests on every push and pull request.

To view the generated Playwright HTML report locally after running tests:

```bash
npm run report
```
