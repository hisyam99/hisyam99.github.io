/**
 * Environment Configuration
 * Centralized configuration for environment variables, validation, and runtime settings
 */

// Environment variable validation
const requiredEnvVars = ["VITE_GRAPHQL_ENDPOINT"] as const;
const optionalEnvVars = [
  "VITE_APP_NAME",
  "VITE_APP_VERSION",
  "VITE_ENABLE_LOGGING",
  "VITE_API_TIMEOUT",
  "VITE_ENABLE_DEVTOOLS",
  "NODE_ENV",
] as const;

type RequiredEnvVar = (typeof requiredEnvVars)[number];
type OptionalEnvVar = (typeof optionalEnvVars)[number];

// Validate optional environment variables are properly typed
const _validateOptionalEnvVars: readonly OptionalEnvVar[] = optionalEnvVars;
// This assignment ensures optionalEnvVars is used and validates the type
void _validateOptionalEnvVars;
type EnvVar = RequiredEnvVar | OptionalEnvVar;

/**
 * Get environment variable with validation
 */
function getEnvVar(key: RequiredEnvVar): string;
function getEnvVar(key: OptionalEnvVar): string | undefined;
function getEnvVar(key: EnvVar): string | undefined {
  // Check if we're in browser environment
  if (typeof window !== "undefined") {
    // In browser, use import.meta.env
    return (import.meta.env as Record<string, string | undefined>)[key];
  }

  // In server environment, use process.env
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }

  return undefined;
}

/**
 * Validate required environment variables
 */
function validateEnvVars(): void {
  const missing: string[] = [];

  for (const key of requiredEnvVars) {
    const value = getEnvVar(key);
    if (!value || value.trim() === "") {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    const error = `Missing required environment variables: ${missing.join(", ")}`;
    console.error("Environment Configuration Error:", error);

    // In development, show more helpful error
    if (isDevelopment()) {
      console.error(`
Please create a .env.local file in your project root with the following variables:
${missing.map((key) => `${key}=your_value_here`).join("\n")}

Example:
VITE_GRAPHQL_ENDPOINT=http://localhost:4001/graphql
`);
    }
  }
}

/**
 * Environment configuration object
 */
export const config = {
  // App information
  app: {
    name: getEnvVar("VITE_APP_NAME") || "Hisyam Kamil Portfolio",
    version: getEnvVar("VITE_APP_VERSION") || "1.0.0",
  },

  // API configuration
  api: {
    graphqlEndpoint:
      getEnvVar("VITE_GRAPHQL_ENDPOINT") || "http://localhost:4001/graphql",
    timeout: parseInt(getEnvVar("VITE_API_TIMEOUT") || "10000", 10),
  },

  // Development settings
  dev: {
    enableLogging:
      getEnvVar("VITE_ENABLE_LOGGING") === "true" || isDevelopment(),
    enableDevtools:
      getEnvVar("VITE_ENABLE_DEVTOOLS") === "true" || isDevelopment(),
  },

  // Runtime environment
  env: {
    isDevelopment: isDevelopment(),
    isProduction: isProduction(),
    isServer: typeof window === "undefined",
    isBrowser: typeof window !== "undefined",
  },

  // Logging configuration
  logging: {
    level: isDevelopment() ? "debug" : "error",
    enableConsole: isDevelopment(),
    enableNetwork: isDevelopment(),
  },

  // GraphQL configuration
  graphql: {
    timeout: 10000,
    retries: 3,
    enableIntrospection: isDevelopment(),
    enablePlayground: isDevelopment(),
  },

  // Authentication settings
  auth: {
    tokenKey: "access_token",
    refreshTokenKey: "refresh_token",
    tokenExpiry: 3600, // 1 hour in seconds
  },

  // UI Configuration
  ui: {
    pageSize: {
      blogs: 12,
      projects: 8,
      categories: 20,
      resumeContents: 20,
    },
    animations: {
      duration: "300ms",
      easing: "ease-in-out",
    },
  },
} as const;

/**
 * Environment helper functions
 */
export function isDevelopment(): boolean {
  const nodeEnv = getEnvVar("NODE_ENV");
  return nodeEnv === "development" || !nodeEnv;
}

export function isProduction(): boolean {
  return getEnvVar("NODE_ENV") === "production";
}

export function isServer(): boolean {
  return typeof window === "undefined";
}

export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/**
 * Logger utility
 */
export const logger = {
  debug: (...args: unknown[]) => {
    if (config.dev.enableLogging) {
      console.debug("[DEBUG]", ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (config.dev.enableLogging) {
      console.info("[INFO]", ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (config.dev.enableLogging) {
      console.warn("[WARN]", ...args);
    }
  },
  error: (...args: unknown[]) => {
    console.error("[ERROR]", ...args);
  },
  graphql: (
    operation: string,
    variables?: unknown,
    result?: unknown,
    error?: unknown,
  ) => {
    if (config.dev.enableLogging) {
      console.group(`[GraphQL] ${operation}`);
      if (variables) console.log("Variables:", variables);
      if (result) console.log("Result:", result);
      if (error) console.error("Error:", error);
      console.groupEnd();
    }
  },
};

/**
 * Error handling utilities
 */
export const errorHandler = {
  /**
   * Handle GraphQL errors
   */
  graphql: (error: unknown, operation?: string) => {
    logger.error(`GraphQL Error${operation ? ` in ${operation}` : ""}:`, error);

    const errorObj = error as {
      networkError?: unknown;
      graphQLErrors?: { message: string }[];
    };

    if (errorObj?.networkError) {
      logger.error("Network Error:", errorObj.networkError);
      return "Network error occurred. Please check your connection.";
    }

    if (errorObj?.graphQLErrors && errorObj.graphQLErrors.length > 0) {
      const messages = errorObj.graphQLErrors.map((e) => e.message).join(", ");
      logger.error("GraphQL Errors:", messages);
      return `GraphQL error: ${messages}`;
    }

    return "An unexpected error occurred";
  },

  /**
   * Handle authentication errors
   */
  auth: (error: unknown) => {
    logger.error("Authentication Error:", error);

    const errorObj = error as { message?: string };

    if (errorObj?.message?.includes("token")) {
      return "Authentication token is invalid or expired";
    }

    if (errorObj?.message?.includes("unauthorized")) {
      return "You are not authorized to perform this action";
    }

    return "Authentication error occurred";
  },

  /**
   * Handle network errors
   */
  network: (error: unknown) => {
    logger.error("Network Error:", error);

    const errorObj = error as { code?: string };

    if (errorObj?.code === "NETWORK_ERROR") {
      return "Unable to connect to the server. Please check your connection.";
    }

    if (errorObj?.code === "TIMEOUT_ERROR") {
      return "Request timed out. Please try again.";
    }

    return "Network error occurred";
  },

  /**
   * Generic error handler
   */
  generic: (error: unknown, context?: string) => {
    logger.error(`Error${context ? ` in ${context}` : ""}:`, error);

    if (typeof error === "string") {
      return error;
    }

    const errorObj = error as { message?: string };
    if (errorObj?.message) {
      return errorObj.message;
    }

    return "An unexpected error occurred";
  },
};

/**
 * Performance monitoring utilities
 */
export const performance = {
  /**
   * Measure function execution time
   */
  measure: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    if (!config.dev.enableLogging) {
      return fn();
    }

    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      logger.debug(`Performance [${name}]: ${duration}ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      logger.debug(`Performance [${name}] (error): ${duration}ms`);
      throw error;
    }
  },

  /**
   * Create a performance timer
   */
  timer: (name: string) => {
    const start = Date.now();
    return {
      end: () => {
        const duration = Date.now() - start;
        logger.debug(`Timer [${name}]: ${duration}ms`);
        return duration;
      },
    };
  },
};

/**
 * Feature flags
 */
export const features = {
  enableGraphQLPlayground: config.dev.enableDevtools,
  enableNetworkLogging: config.dev.enableLogging,
  enableErrorBoundary: true,
  enableOfflineMode: false,
  enablePWA: false,
  enableAnalytics: isProduction(),
};

// Validate environment variables on module load
validateEnvVars();

// Export environment validation function for runtime checks
export { validateEnvVars };

// Default export for convenience
export default config;
