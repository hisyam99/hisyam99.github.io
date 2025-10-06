import { server$ } from "@builder.io/qwik-city";
import { getCurrentUser, type User } from "~/services/auth";
import { refreshTokenServer, isAuthError } from "./token-refresh";

export interface AuthResult {
  authenticated: boolean;
  user: User | null;
  redirectTo?: string;
}

/**
 * Server function to check authentication
 * Automatically handles token refresh if access token is expired
 */
export const checkAuth = server$(async function (): Promise<AuthResult> {
  const accessToken = this.cookie.get("accessToken")?.value;
  const refreshToken = this.cookie.get("refreshToken")?.value;

  // No access token - check if we have refresh token
  if (!accessToken) {
    if (refreshToken) {
      // Try to refresh the access token
      const refreshResult = await refreshTokenServer.call(this, refreshToken);

      if (refreshResult.success && refreshResult.tokens) {
        // Successfully refreshed, now get user data
        try {
          const user = await getCurrentUser(refreshResult.tokens.accessToken);
          if (user) {
            return {
              authenticated: true,
              user,
            };
          }
        } catch (error) {
          console.error("Failed to get user after refresh:", error);
        }
      }
    }

    // No valid tokens, return unauthenticated
    return {
      authenticated: false,
      user: null,
      redirectTo: "/auth/login",
    };
  }

  try {
    // Verify token and get user data
    const user = await getCurrentUser(accessToken);

    if (user) {
      return {
        authenticated: true,
        user,
      };
    }

    // Token invalid but no error thrown - try refresh
    if (refreshToken) {
      const refreshResult = await refreshTokenServer.call(this, refreshToken);

      if (refreshResult.success && refreshResult.tokens) {
        const user = await getCurrentUser(refreshResult.tokens.accessToken);
        if (user) {
          return {
            authenticated: true,
            user,
          };
        }
      }
    }

    // Clear invalid tokens
    this.cookie.delete("accessToken", { path: "/" });
    this.cookie.delete("refreshToken", { path: "/" });
    this.cookie.delete("user", { path: "/" });

    return {
      authenticated: false,
      user: null,
      redirectTo: "/auth/login",
    };
  } catch (error) {
    console.error("Auth check error:", error);

    // Check if it's an authentication error that might be resolved by refresh
    if (isAuthError(error) && refreshToken) {
      console.log("🔄 Attempting token refresh after auth error");

      const refreshResult = await refreshTokenServer.call(this, refreshToken);

      if (refreshResult.success && refreshResult.tokens) {
        try {
          const user = await getCurrentUser(refreshResult.tokens.accessToken);
          if (user) {
            console.log("✅ Successfully recovered from auth error");
            return {
              authenticated: true,
              user,
            };
          }
        } catch (retryError) {
          console.error("Failed to get user after refresh retry:", retryError);
        }
      }
    }

    // Clear cookies on error
    this.cookie.delete("accessToken", { path: "/" });
    this.cookie.delete("refreshToken", { path: "/" });
    this.cookie.delete("user", { path: "/" });

    return {
      authenticated: false,
      user: null,
      redirectTo: "/auth/login",
    };
  }
});

/**
 * Server function for protected routes (use in routeLoader$)
 * Throws error if user is not authenticated
 */
export const requireAuth = server$(async function () {
  const authResult = await checkAuth.call(this);

  if (!authResult.authenticated) {
    throw new Error("Authentication required");
  }

  return authResult;
});

/**
 * Check admin role
 * Throws error if user is not authenticated or not an admin
 */
export const requireAdmin = server$(async function () {
  const authResult = await checkAuth.call(this);

  if (!authResult.authenticated) {
    throw new Error("Authentication required");
  }

  if (authResult.user?.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return authResult;
});

/**
 * Check if user is guest (not authenticated)
 * Used for routes that should only be accessible to unauthenticated users
 */
export const requireGuest = server$(async function () {
  const authResult = await checkAuth.call(this);

  return {
    authenticated: authResult.authenticated,
    user: authResult.user,
    shouldRedirect: authResult.authenticated,
  };
});
