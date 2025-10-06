import { Graffle as GraphQLClient } from "./graffle/_namespace.js";
import { refreshTokenClient, isAuthError, getErrorMessage } from "~/utils/token-refresh";

// Environment variables for GraphQL endpoint
const PUBLIC_GRAPHQL_ENDPOINT =
  import.meta.env.PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4001/graphql";

/**
 * Create a base Graffle client instance
 * This client provides the foundation for GraphQL operations
 */
export const createGraphQLClient = (options?: {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}) => {
  const { headers = {}, signal } = options || {};

  return GraphQLClient.create()
    .transport({
      url: PUBLIC_GRAPHQL_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      raw: {
        signal,
      },
    })
    .anyware(async ({ exchange }: any) => {
      // Add request/response logging in development
      if (import.meta.env.DEV) {
        const headers = exchange.input.request.headers;
        const headersObj =
          headers instanceof Headers
            ? Object.fromEntries(headers.entries())
            : headers || {};

        console.log("🔄 GraphQL Request:", {
          url: exchange.input.request.url,
          headers: headersObj,
        });
      }

      try {
        const result = await exchange();

        if (import.meta.env.DEV) {
          console.log("✅ GraphQL Response received");
        }

        return result;
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("❌ GraphQL Error:", error);
        }
        throw error;
      }
    });
};

/**
 * Create an authenticated GraphQL client with automatic token refresh
 * This includes the Authorization header with JWT token and handles token expiration
 */
export const createAuthenticatedClient = (
  token: string,
  options?: {
    signal?: AbortSignal;
    onTokenRefresh?: (newToken: string) => void;
  },
) => {
  const { signal, onTokenRefresh } = options || {};

  return GraphQLClient.create()
    .transport({
      url: PUBLIC_GRAPHQL_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      raw: {
        signal,
      },
    })
    .anyware(async ({ exchange }: any) => {
      // Add request/response logging in development
      if (import.meta.env.DEV) {
        const headers = exchange.input.request.headers;
        const headersObj =
          headers instanceof Headers
            ? Object.fromEntries(headers.entries())
            : headers || {};

        console.log("🔄 Authenticated GraphQL Request:", {
          url: exchange.input.request.url,
          headers: { ...headersObj, Authorization: "Bearer [REDACTED]" },
        });
      }

      try {
        const result = await exchange();

        if (import.meta.env.DEV) {
          console.log("✅ Authenticated GraphQL Response received");
        }

        return result;
      } catch (error) {
        // Check if it's an authentication error
        if (isAuthError(error)) {
          console.log("🔄 Authentication error detected, attempting token refresh");

          // Try to get refresh token from storage (client-side only)
          if (typeof window !== "undefined") {
            const refreshToken = getCookieValue("refreshToken");

            if (refreshToken) {
              try {
                const newTokens = await refreshTokenClient(refreshToken);

                if (newTokens) {
                  console.log("✅ Token refreshed, retrying request");

                  // Update the authorization header with new token
                  const updatedHeaders = exchange.input.request.headers;
                  if (updatedHeaders instanceof Headers) {
                    updatedHeaders.set(
                      "Authorization",
                      `Bearer ${newTokens.accessToken}`,
                    );
                  }

                  // Notify callback if provided
                  if (onTokenRefresh) {
                    onTokenRefresh(newTokens.accessToken);
                  }

                  // Retry the original request with new token
                  const retryResult = await exchange();
                  return retryResult;
                }
              } catch (refreshError) {
                console.error("❌ Token refresh failed:", refreshError);
                // Let the original error propagate
              }
            } else {
              console.log("❌ No refresh token available, redirecting to login");
              window.location.href = "/auth/login";
            }
          }
        }

        if (import.meta.env.DEV) {
          console.error("❌ Authenticated GraphQL Error:", error);
          console.error("Error details:", {
            message: getErrorMessage(error),
            type: error?.constructor?.name,
          });
        }

        throw error;
      }
    });
};

/**
 * Base GraphQL client instance (no authentication)
 * Use this for public operations like login, register, public blog posts
 */
export const graphqlClient = createGraphQLClient();

/**
 * Helper function to get cookie value (client-side only)
 */
function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

/**
 * Type definitions for common GraphQL operations
 */
export type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: Array<string | number>;
  }>;
};

export type PaginationInput = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

// Re-export generated client for easy access
export { GraphQLClient };
