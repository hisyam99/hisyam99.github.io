import { server$ } from "@builder.io/qwik-city";
import { createGraphQLClient, createAuthenticatedClient } from "../lib/graffle";

/**
 * Authentication Types
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  tokens: TokenPair;
}

export interface AuthError {
  message: string;
  code?: string;
}

/**
 * Login user with email and password
 * Server-side GraphQL mutation using Qwik server$
 */
export const loginUser = server$(
  async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          user {
            id
            name
            email
            role
            isActive
            lastLogin
            createdAt
            updatedAt
          }
          tokens {
            accessToken
            refreshToken
            expiresIn
            tokenType
          }
        }
      }
    `.send({ input: credentials });

      console.log("🔍 Login GraphQL result:", JSON.stringify(result, null, 2));

      if (result?.errors?.length) {
        console.error("Login GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message || "Login failed");
      }

      // Fix: Access the data correctly based on how Graffle returns it
      const loginData = result?.data?.login || result?.login;

      if (!loginData) {
        console.error("No login data in response:", result);
        throw new Error("Invalid login response structure");
      }

      return loginData;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  },
);

/**
 * Register new user
 * Server-side GraphQL mutation using Qwik server$
 */
export const registerUser = server$(
  async (userData: RegisterData): Promise<LoginResponse> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
          user {
            id
            name
            email
            role
            isActive
            lastLogin
            createdAt
            updatedAt
          }
          tokens {
            accessToken
            refreshToken
            expiresIn
            tokenType
          }
        }
      }
    `.send({ input: userData });

      console.log(
        "🔍 Register GraphQL result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Register GraphQL errors:", result.errors);
        throw new Error(result.errors[0].message || "Registration failed");
      }

      // Fix: Access the data correctly based on how Graffle returns it
      const registerData = result?.data?.register || result?.register;

      if (!registerData) {
        console.error("No register data in response:", result);
        throw new Error("Invalid registration response structure");
      }

      return registerData;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  },
);

/**
 * Refresh authentication token
 * Server-side GraphQL mutation using Qwik server$
 */
export const refreshAuthToken = server$(
  async (refreshToken: string): Promise<TokenPair> => {
    const client = createGraphQLClient();

    try {
      const result = await client.gql`
      mutation RefreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken) {
          accessToken
          refreshToken
          expiresIn
          tokenType
        }
      }
    `.send({ refreshToken });

      console.log(
        "🔍 Refresh token GraphQL result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Token refresh failed");
      }

      const tokenData = result?.data?.refreshToken || result?.refreshToken;

      if (!tokenData) {
        throw new Error("Invalid token refresh response");
      }

      return tokenData;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Token refresh failed",
      );
    }
  },
);

/**
 * Get current authenticated user
 * Server-side GraphQL query using Qwik server$
 */
export const getCurrentUser = server$(
  async (token: string): Promise<User | null> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      query GetCurrentUser {
        me {
          id
          name
          email
          role
          isActive
          lastLogin
          createdAt
          updatedAt
        }
      }
    `.send();

      console.log(
        "🔍 Get current user GraphQL result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        console.error("Get current user error:", result.errors[0].message);
        return null;
      }

      const userData = result?.data?.me || result?.me;
      return userData || null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },
);

/**
 * Change user password
 * Server-side GraphQL mutation using Qwik server$
 */
export const changePassword = server$(
  async (
    token: string,
    passwordData: { oldPassword: string; newPassword: string },
  ): Promise<boolean> => {
    const client = createAuthenticatedClient(token);

    try {
      const result = await client.gql`
      mutation ChangePassword($input: ChangePasswordInput!) {
        changePassword(input: $input)
      }
    `.send({ input: passwordData });

      console.log(
        "🔍 Change password GraphQL result:",
        JSON.stringify(result, null, 2),
      );

      if (result?.errors?.length) {
        throw new Error(result.errors[0].message || "Password change failed");
      }

      const changeResult =
        result?.data?.changePassword || result?.changePassword;
      return changeResult || false;
    } catch (error) {
      console.error("Password change error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Password change failed",
      );
    }
  },
);

/**
 * Logout user (client-side helper)
 * This doesn't need a server call, just clears local storage
 */
export const logoutUser = () => {
  // Clear tokens from localStorage/cookies
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Clear cookies
    document.cookie =
      "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

/**
 * Token management utilities
 */
export const tokenUtils = {
  /**
   * Get access token from localStorage
   */
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },

  /**
   * Store tokens in localStorage
   */
  storeTokens: (tokens: TokenPair): void => {
    if (typeof window === "undefined") return;

    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);

    // Optionally set secure cookies as well
    const expires = new Date(Date.now() + tokens.expiresIn * 1000);
    document.cookie = `access_token=${tokens.accessToken}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
  },

  /**
   * Check if access token exists and is not expired
   */
  isAuthenticated: (): boolean => {
    const token = tokenUtils.getAccessToken();
    if (!token) return false;

    try {
      // Basic JWT validation (check expiration)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return !isExpired;
    } catch {
      return false;
    }
  },

  /**
   * Clear all tokens
   */
  clearTokens: (): void => {
    logoutUser();
  },
};
