import dotenv from "dotenv";

export const TEST_ENV = process.env.TEST_ENV || "local";

dotenv.config({ path: `.env.${TEST_ENV}` });
dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[Config Error] Required environment variable '${key}' is missing. Please define it in your .env file or system environment.`
    );
  }
  return value;
};

export const config = {
  env: TEST_ENV,
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  credentials: {
    password: getEnvVar("TEST_PASSWORD"),
    standardUser: getEnvVar("STANDARD_USER"),
    lockedOutUser: process.env.LOCKED_OUT_USER || "locked_out_user",
    problemUser: process.env.PROBLEM_USER || "problem_user",
    performanceGlitchUser: process.env.PERFORMANCE_GLITCH_USER || "performance_glitch_user",
    errorUser: process.env.ERROR_USER || "error_user",
    visualUser: process.env.VISUAL_USER || "visual_user",
  },
} as const;
