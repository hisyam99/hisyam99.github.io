import { server$ } from "@builder.io/qwik-city";
import { refreshAuthToken, type TokenPair } from "~/services/auth";

/**
 * Token refresh state to prevent multiple simultaneous refresh requests
 */
let isRefreshing = false;
let refreshPromise: Promise<TokenPair | null> | null = null;

/**
 * Server-side token refresh function
 * Handles token refresh logic with race condition prevention
 */
export const refreshTokenServer = server$(async function (
  refreshToken: string,
): Promise<{
  success: boolean;
  tokens?: TokenPair;
  error?: string;
}> {
  try {
    // Call the GraphQL mutation
    const tokens = await refreshAuthToken(refreshToken);

    // Update cookies with new tokens
    this.cookie.set("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: tokens.expiresIn,
      path: "/",
    });

    this.cookie.set("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    console.log("✅ Token refreshed successfully");

    return {
      success: true,
      tokens,
    };
  } catch (error) {
    console.error("❌ Token refresh failed:", error);

    // Clear invalid tokens
    this.cookie.delete("accessToken", { path: "/" });
    this.cookie.delete("refreshToken", { path: "/" });
    this.cookie.delete("user", { path: "/" });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Token refresh failed",
    };
  }
});

/**
 * Client-side token refresh helper
 * Prevents multiple simultaneous refresh requests
 */
export const refreshTokenClient = async (
  refreshToken: string,
): Promise<TokenPair | null> => {
  // If already refreshing, wait for the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      const result = await refreshTokenServer(refreshToken);

      if (!result.success || !result.tokens) {
        throw new Error(result.error || "Token refresh failed");
      }

      return result.tokens;
    } catch (error) {
      console.error("Token refresh error:", error);

      // Clear tokens and redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }

      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/**
 * Check if error is an authentication error that requires token refresh
 */
export const isAuthError = (error: unknown): boolean => {
  if (!error) return false;

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : String(error);

  // Check for common authentication error patterns
  const authErrorPatterns = [
    /invalid.*token/i,
    /expired.*token/i,
    /token.*expired/i,
    /token.*invalid/i,
    /unauthorized/i,
    /unauthenticated/i,
    /authentication.*failed/i,
    /contextualerror.*token/i,
  ];

  return authErrorPatterns.some((pattern) => pattern.test(errorMessage));
};

/**
 * Extract error message from various error types
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    if ("message" in error) {
      return String((error as { message: unknown }).message);
    }

    if (
      "errors" in error &&
      Array.isArray((error as { errors: unknown[] }).errors)
    ) {
      const errors = (error as { errors: Array<{ message?: string }> }).errors;
      if (errors.length > 0 && errors[0].message) {
        return errors[0].message;
      }
    }
  }

  return String(error);
};
