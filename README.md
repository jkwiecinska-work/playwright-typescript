# Playwright TypeScript Test Automation

[![Playwright Tests](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml/badge.svg)](https://github.com/jkwiecinska-work/playwright-typescript/actions/workflows/playwright.yml)

Playground for Playwright and TypeScript testing automation

![Playwright](https://playwright.dev/img/playwright-logo.svg)

> **Web Automation Project**
> Playwright + TypeScript for scalable testing.

---

## Tech Stack

- [Playwright](https://playwright.dev/) (TypeScript)
- Page Object Model (POM) [in progress]
- Modular folder structure
- CI ready (easy GitHub Actions integration)
- [Prettier](https://prettier.io/) & ESLint
- Trace & video reporting upon failure

---

## Project Structure

├── tests/ # tests (organized by features/modules)
│ ├── demo-todo-app.spec.ts
│ └── example.spec.ts
├── [to do] pages/ # Page Object Model - [to do] page logic, selectors, actions
│ └── LoginPage.ts
├── [to do] fixtures/ # Custom reusable fixtures (login, data, tokens, setup)
├── [to do]utils/ # Helpers, data generators, custom assertions
├── playwright.config.ts
├── package.json
├── README.md
└── tsconfig.json

text

---

## How to Run Locally

1. Clone this repo:
   git clone <repo-url>
   cd <project-folder>

text 2. Install dependencies:
npm install

text 3. Run test suite:
npx playwright test

text 4. Open the HTML test report:
npx playwright show-report

text

---

## Key Best Practices

- **Page Object Pattern:** [do to] Separation between page logic & test flows
- **Readable code:** Descriptive test & method names, modular approach
- **No hard waits:** Leverage Playwright built-in auto-wait
- **Stateless tests:** Independent cases, easy parallelization
- **Artifacts on fail:** Automatic trace, screenshots & video
- **CI-friendly:** Easily adapted to any pipeline (GitHub Actions, GitLab CI, Jenkins, ...)

---
