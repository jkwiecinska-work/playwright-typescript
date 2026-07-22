# Playwright TypeScript Test Automation

[![Playwright Tests](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml)

Playground for Playwright and TypeScript testing automation

![Playwright](https://playwright.dev/img/playwright-logo.svg)

> **Web Automation Project**
> Playwright + TypeScript for scalable testing.

---

## Tech Stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Page Object Model (POM) with Base Page inheritance
- Custom Fixtures for dependency injection
- [ESLint](https://eslint.org/) with [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright)
- [Prettier](https://prettier.io/) for code formatting
- CI/CD with GitHub Actions
- Trace reporting on first retry

---

## Project Structure

```
├── tests/                    # Test specs organized by feature
│   └── login.spec.ts         # SauceDemo login scenarios
├── pages/                    # Page Object Model classes
│   ├── base.page.ts          # Base page with shared methods
│   └── login.page.ts         # Login page selectors & actions
├── fixtures/                 # Custom Playwright fixtures
│   └── base.fixtures.ts      # Page object injection for tests
├── playwright.config.ts
├── eslint.config.mjs
├── .prettierrc
├── tsconfig.json
├── package.json
└── README.md
```

---

## How to Run Locally

1. Clone this repo:

   ```bash
   git clone https://github.com/jkwiecinska-work/playwright-typescript.git
   cd playwright-typescript
   ```

2. Install dependencies:

   ```bash
   npm install
   npx playwright install --with-deps
   ```

3. Run test suite:

   ```bash
   npm test
   ```

4. Open the HTML test report:
   ```bash
   npm run report
   ```

---

## Available Scripts

| Script                | Command                    | Description                    |
| --------------------- | -------------------------- | ------------------------------ |
| `npm test`            | `playwright test`          | Run all tests                  |
| `npm run test:headed` | `playwright test --headed` | Run tests with visible browser |
| `npm run test:ui`     | `playwright test --ui`     | Open Playwright UI mode        |
| `npm run debug`       | `playwright test --debug`  | Debug tests step by step       |
| `npm run report`      | `playwright show-report`   | Open HTML test report          |
| `npm run lint`        | `eslint .`                 | Run ESLint checks              |
| `npm run format`      | `prettier --write .`       | Format code with Prettier      |
| `npm run typecheck`   | `tsc --noEmit`             | TypeScript type checking       |

---

## Key Best Practices

- **Page Object Pattern:** Separation between page logic & test flows
- **Custom Fixtures:** Dependency injection of page objects into tests
- **Readable code:** Descriptive test & method names, modular approach
- **No hard waits:** Leverage Playwright built-in auto-wait
- **Stateless tests:** Independent cases, easy parallelization
- **Artifacts on fail:** Automatic trace on first retry
- **CI-friendly:** GitHub Actions pipeline with lint, typecheck & test stages

---
