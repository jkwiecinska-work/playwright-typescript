# Playwright TypeScript Test Automation

[![Playwright Tests](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml)

Playground for Playwright and TypeScript testing automation

![Playwright](https://playwright.dev/img/playwright-logo.svg)

> **Web Automation Project**
> Playwright + TypeScript for scalable testing.

---

## Tech Stack

- **Node.js**: >= 24
- [Playwright](https://playwright.dev/) (TypeScript)
- Page Object Model (POM) with Base Page inheritance
- Custom Fixtures for dependency injection
- [ESLint](https://eslint.org/) with [eslint-plugin-playwright](https://github.com/playwright-community/eslint-plugin-playwright)
- [Prettier](https://prettier.io/) for code formatting
- CI/CD with GitHub Actions (Test, Lint, Typecheck, Deploy HTML Report to GitHub Pages)
- Trace reporting on first retry

---

## Project Structure

```
├── tests/ # tests (organized by features/modules)
│ ├── demo-todo-app.spec.ts
│ └── example.spec.ts
├── [to do] pages/ # Page Object Model - [to do] page logic, selectors, actions
│ └── LoginPage.ts
├── [to do] fixtures/ # Custom reusable fixtures (login, data, tokens, setup)
├── [to do]utils/ # Helpers, data generators, custom assertions
├── playwright.config.ts
├── eslint.config.mjs
├── .prettierrc
├── tsconfig.json
├── package.json
├── README.md
└── tsconfig.json

```

---

## How to Run Locally

1. Clone this repo:

2. Install dependencies:
   npm install

3. Run test suite:
   npx playwright test

4. Open the HTML test report:
   npx playwright show-report

---

## Key Best Practices

- **Page Object Pattern:** Separation between page logic & test flows
- **Custom Fixtures:** Dependency injection of page objects into tests
- **Readable code:** Descriptive test & method names, modular approach
- **No hard waits:** Leverage Playwright built-in auto-wait
- **Stateless tests:** Independent cases, easy parallelization
- **Artifacts on fail:** Automatic trace on first retry
- **CI-friendly:** GitHub Actions pipeline with lint, typecheck & test stages
- **Automated Reporting:** Playwright HTML report is automatically deployed to GitHub Pages from the `main` branch

---
