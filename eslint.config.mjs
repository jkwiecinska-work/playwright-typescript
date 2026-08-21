import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      // Disabled because rule cannot trace assertions inside Page Object methods
      // (e.g. loginPage.expectErrorMessage()) - assertions live in POM classes
      "playwright/expect-expect": "off",
    },
  },
  {
    ignores: ["node_modules/", "dist/", "playwright-report/", "test-results/"],
  }
);
