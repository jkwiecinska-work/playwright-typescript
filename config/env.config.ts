import dotenv from "dotenv";
import path from "path";

// Determine current test environment (default: 'local')
export const TEST_ENV = process.env.TEST_ENV || "local";

// Load environment-specific file if present (.env.staging, .env.prod, etc.), fallback to .env
dotenv.config({ path: path.resolve(process.cwd(), `.env.${TEST_ENV}`) });
dotenv.config();

export const config = {
  env: TEST_ENV,
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  credentials: {
    password: process.env.TEST_PASSWORD || "secret_sauce",
    standardUser: process.env.STANDARD_USER || "standard_user",
    lockedOutUser: process.env.LOCKED_OUT_USER || "locked_out_user",
    problemUser: process.env.PROBLEM_USER || "problem_user",
    performanceGlitchUser: process.env.PERFORMANCE_GLITCH_USER || "performance_glitch_user",
    errorUser: process.env.ERROR_USER || "error_user",
    visualUser: process.env.VISUAL_USER || "visual_user",
  },
} as const;
