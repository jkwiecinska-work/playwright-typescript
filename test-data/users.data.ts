import { config } from "../config/env.config";

/**
 * User credentials loaded from environment configuration module
 */
export const USERS = {
  STANDARD: {
    username: config.credentials.standardUser,
    password: config.credentials.password,
  },
  LOCKED_OUT: {
    username: config.credentials.lockedOutUser,
    password: config.credentials.password,
  },
  PROBLEM: {
    username: config.credentials.problemUser,
    password: config.credentials.password,
  },
  PERFORMANCE_GLITCH: {
    username: config.credentials.performanceGlitchUser,
    password: config.credentials.password,
  },
  ERROR: {
    username: config.credentials.errorUser,
    password: config.credentials.password,
  },
  VISUAL: {
    username: config.credentials.visualUser,
    password: config.credentials.password,
  },
} as const;
