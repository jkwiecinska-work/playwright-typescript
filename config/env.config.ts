import dotenv from "dotenv";

export const TEST_ENV = process.env.TEST_ENV || "local";

dotenv.config({ path: `.env.${TEST_ENV}` });
dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[Config Error] Wymagana zmienna środowiskowa '${key}' nie została zdefiniowana. ` +
        `Upewnij się, że plik .env zawiera wpis dla '${key}'.`
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
    lockedOutUser: getEnvVar("LOCKED_OUT_USER"),
    problemUser: getEnvVar("PROBLEM_USER"),
    performanceGlitchUser: getEnvVar("PERFORMANCE_GLITCH_USER"),
    errorUser: getEnvVar("ERROR_USER"),
    visualUser: getEnvVar("VISUAL_USER"),
  },
} as const;
