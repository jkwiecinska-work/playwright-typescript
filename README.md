# playwright-typescript
Playground for Playwright and Typescript testing automation

![Playwright](https://playwright.dev/img/playwright-logo.svg)

> **Web Automation Project**
> Playwright + TypeScript for scalable, professional E2E testing. Designed for clarity, maintainability, and best practices.

---

## Tech Stack
- [Playwright](https://playwright.dev/) (TypeScript)
- Page Object Model (POM)
- Modular folder structure
- CI ready (easy GitHub Actions integration)
- [Prettier](https://prettier.io/) & ESLint
- Trace & video reporting upon failure

---

## Project Structure

├── tests/ # E2E tests (organized by features/modules)
│ └── example.spec.ts
├── pages/ # Page Object Model - page logic, selectors, actions
│ └── LoginPage.ts
├── fixtures/ # Custom reusable fixtures (login, data, tokens, setup)
├── utils/ # Helpers, data generators, custom assertions
├── playwright.config.ts
├── package.json
└── README.md

text

---

## How to Run Locally

1. Clone this repo:
git clone <repo-url>
cd <project-folder>

text
2. Install dependencies:
npm install

text
3. Run test suite:
npx playwright test

text
4. Open the HTML test report:
npx playwright show-report

text

---

## Key Best Practices
- **Page Object Pattern:** Separation between page logic & test flows
- **Readable code:** Descriptive test & method names, modular approach
- **No hard waits:** Leverage Playwright built-in auto-wait
- **Stateless tests:** Independent cases, easy parallelization
- **Artifacts on fail:** Automatic trace, screenshots & video
- **CI-friendly:** Easily adapted to any pipeline (GitHub Actions, GitLab CI, Jenkins, ...)

---

## Example E2E Scenario

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User can log in successfully', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('user', 'pass');
await expect(page).toHaveURL(/dashboard/);
});

text

---