# 🎯 Refresh Token - Practical Examples

This document contains real-world examples of how to use the refresh token implementation in various scenarios.

---

## 📚 Table of Contents

1. [Basic Protected Route](#1-basic-protected-route)
2. [Admin Dashboard](#2-admin-dashboard)
3. [API Service with Auto-Retry](#3-api-service-with-auto-retry)
4. [Form Submission with Auth](#4-form-submission-with-auth)
5. [Real-time Data Fetching](#5-real-time-data-fetching)
6. [File Upload with Auth](#6-file-upload-with-auth)
7. [WebSocket Authentication](#7-websocket-authentication)
8. [Error Handling Examples](#8-error-handling-examples)
9. [Testing Examples](#9-testing-examples)

---

## 1. Basic Protected Route

### Scenario: Simple protected page that requires authentication

```typescript
// src/routes/profile/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";

/**
 * This loader automatically refreshes the token if expired
 * User won't even notice their token was expired!
 */
export const useProfileLoader = routeLoader$(async (requestEvent) => {
  // ✨ Magic happens here - auto-refresh if token expired
  const auth = await checkAuth();
  
  if (!auth.authenticated) {
    // Redirect to login if refresh failed
    throw requestEvent.redirect(302, "/auth/login");
  }
  
  return {
    user: auth.user,
    timestamp: new Date().toISOString(),
  };
});

export default component$(() => {
  const profile = useProfileLoader();
  
  return (
    <div>
      <h1>Welcome, {profile.value.user?.name}!</h1>
      <p>Email: {profile.value.user?.email}</p>
      <p>Role: {profile.value.user?.role}</p>
      <p>Last loaded: {profile.value.timestamp}</p>
    </div>
  );
});
```

---

## 2. Admin Dashboard

### Scenario: Admin-only page with role checking

```typescript
// src/routes/admin/dashboard/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { requireAdmin } from "~/utils/auth-middleware";

/**
 * Requires admin role
 * Automatically refreshes token if needed
 */
export const useAdminLoader = routeLoader$(async (requestEvent) => {
  try {
    // ✨ Checks auth + role, refreshes if needed
    const auth = await requireAdmin();
    
    // Fetch admin data
    const token = requestEvent.cookie.get("accessToken")?.value;
    const stats = await getAdminStats(token!);
    
    return {
      user: auth.user,
      stats,
    };
  } catch (error) {
    // Not admin or auth failed
    throw requestEvent.redirect(302, "/");
  }
});

export default component$(() => {
  const admin = useAdminLoader();
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>Total Users: {admin.value.stats.totalUsers}</div>
      <div>Active Sessions: {admin.value.stats.activeSessions}</div>
    </div>
  );
});
```

---

## 3. API Service with Auto-Retry

### Scenario: Backend service that automatically retries on auth errors

```typescript
// src/services/blog-service.ts
import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "~/lib/graphql/graffle-with-refresh";

/**
 * Get all blog posts
 * Automatically refreshes token and retries if needed
 */
export const getBlogPosts = server$(async (token: string) => {
  // ✨ This client handles refresh automatically
  const client = createAuthenticatedClient(token, {
    onTokenRefresh: (newToken) => {
      console.log("🔄 Token was refreshed during blog fetch");
    },
  });

  try {
    const result = await client.gql`
      query GetBlogs {
        blogs {
          id
          title
          content
          author
          publishedAt
        }
      }
    `.send();

    return result.data?.blogs || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
});

/**
 * Create a new blog post
 */
export const createBlogPost = server$(async (
  token: string,
  data: { title: string; content: string }
) => {
  const client = createAuthenticatedClient(token);

  const result = await client.gql`
    mutation CreateBlog($input: CreateBlogInput!) {
      createBlog(input: $input) {
        id
        title
        content
        publishedAt
      }
    }
  `.send({ input: data });

  return result.data?.createBlog;
});
```

---

## 4. Form Submission with Auth

### Scenario: Form that submits data with authentication

```typescript
// src/routes/blog/create/index.tsx
import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";
import { createBlogPost } from "~/services/blog-service";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export const useCreateBlogAction = routeAction$(
  async (data, { cookie }) => {
    // ✨ Check auth (auto-refresh if needed)
    const auth = await checkAuth();
    
    if (!auth.authenticated) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    try {
      const token = cookie.get("accessToken")?.value;
      
      // ✨ This will auto-retry if token refresh happens
      const blog = await createBlogPost(token!, {
        title: data.title,
        content: data.content,
      });

      return {
        success: true,
        data: blog,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create blog",
      };
    }
  },
  zod$(blogSchema)
);

export default component$(() => {
  const action = useCreateBlogAction();
  const isSubmitting = useSignal(false);

  return (
    <div>
      <h1>Create Blog Post</h1>
      
      <Form action={action} onSubmitCompleted$={() => isSubmitting.value = false}>
        <input name="title" placeholder="Title" required />
        <textarea name="content" placeholder="Content" required />
        
        <button type="submit" disabled={isSubmitting.value}>
          {isSubmitting.value ? "Creating..." : "Create Post"}
        </button>
      </Form>

      {action.value?.success && (
        <div class="success">Blog created successfully!</div>
      )}
      
      {action.value?.error && (
        <div class="error">{action.value.error}</div>
      )}
    </div>
  );
});
```

---

## 5. Real-time Data Fetching

### Scenario: Polling data with authentication

```typescript
// src/routes/notifications/index.tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";
import { getNotifications } from "~/services/notification-service";

export const useNotificationsLoader = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();
  
  if (!auth.authenticated) {
    throw requestEvent.redirect(302, "/auth/login");
  }
  
  const token = requestEvent.cookie.get("accessToken")?.value;
  const notifications = await getNotifications(token!);
  
  return { notifications };
});

export default component$(() => {
  const initialData = useNotificationsLoader();
  const notifications = useSignal(initialData.value.notifications);
  const isPolling = useSignal(true);

  // Poll for new notifications every 30 seconds
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(async () => {
      if (!isPolling.value) return;

      try {
        // ✨ Will auto-refresh token if needed
        const token = getCookie("accessToken");
        if (token) {
          const data = await getNotifications(token);
          notifications.value = data;
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        // If auth error, user will be redirected automatically
      }
    }, 30000); // 30 seconds

    cleanup(() => clearInterval(interval));
  });

  return (
    <div>
      <h1>Notifications</h1>
      <button onClick$={() => isPolling.value = !isPolling.value}>
        {isPolling.value ? "Stop Polling" : "Start Polling"}
      </button>
      
      <ul>
        {notifications.value.map((notif) => (
          <li key={notif.id}>
            <strong>{notif.title}</strong>
            <p>{notif.message}</p>
            <small>{notif.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
});

// Helper function
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
```

---

## 6. File Upload with Auth

### Scenario: Upload files with authentication

```typescript
// src/routes/upload/index.tsx
import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";

export const useUploadAction = routeAction$(async (formData, { cookie }) => {
  // ✨ Auto-refresh if token expired
  const auth = await checkAuth();
  
  if (!auth.authenticated) {
    return { success: false, error: "Authentication required" };
  }

  const file = formData.get("file") as File;
  const token = cookie.get("accessToken")?.value;

  try {
    // Upload file with authenticated request
    const uploadResult = await uploadFileToServer(file, token!);
    
    return {
      success: true,
      url: uploadResult.url,
    };
  } catch (error) {
    // If auth error occurs during upload, token refresh happens automatically
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
});

export default component$(() => {
  const action = useUploadAction();
  const selectedFile = useSignal<string>("");

  return (
    <div>
      <h1>Upload File</h1>
      
      <Form action={action}>
        <input 
          type="file" 
          name="file" 
          onChange$={(e) => {
            const target = e.target as HTMLInputElement;
            selectedFile.value = target.files?.[0]?.name || "";
          }}
        />
        
        {selectedFile.value && <p>Selected: {selectedFile.value}</p>}
        
        <button type="submit">Upload</button>
      </Form>

      {action.value?.success && (
        <div>
          File uploaded! <a href={action.value.url}>View</a>
        </div>
      )}
      
      {action.value?.error && (
        <div class="error">{action.value.error}</div>
      )}
    </div>
  );
});

// Helper function
async function uploadFileToServer(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}
```

---

## 7. WebSocket Authentication

### Scenario: Authenticate WebSocket connection with auto-refresh

```typescript
// src/services/websocket-service.ts
import { refreshTokenClient } from "~/utils/token-refresh";
import { isAuthError } from "~/utils/token-refresh";

export class AuthenticatedWebSocket {
  private ws: WebSocket | null = null;
  private token: string;
  private refreshToken: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refreshToken = refreshToken;
  }

  async connect(url: string) {
    try {
      // Connect with token in URL or send as first message
      this.ws = new WebSocket(`${url}?token=${this.token}`);

      this.ws.onopen = () => {
        console.log("✅ WebSocket connected");
        this.reconnectAttempts = 0;
      };

      this.ws.onerror = async (error) => {
        console.error("❌ WebSocket error:", error);
        
        // Try to refresh token and reconnect
        await this.handleAuthError();
      };

      this.ws.onclose = async (event) => {
        // Check if close was due to auth error (code 4001, for example)
        if (event.code === 4001) {
          console.log("🔄 WebSocket closed due to auth error");
          await this.handleAuthError();
        }
      };

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        // Handle auth error in message
        if (data.error && isAuthError(data.error)) {
          this.handleAuthError();
        }
      };
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }

  private async handleAuthError() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnect attempts reached");
      window.location.href = "/auth/login";
      return;
    }

    this.reconnectAttempts++;
    console.log(`🔄 Attempting to refresh token (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    try {
      // ✨ Refresh token automatically
      const newTokens = await refreshTokenClient(this.refreshToken);
      
      if (newTokens) {
        this.token = newTokens.accessToken;
        this.refreshToken = newTokens.refreshToken;
        
        // Reconnect with new token
        this.ws?.close();
        await this.connect(this.ws?.url.split('?')[0] || '');
        
        console.log("✅ Reconnected with new token");
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      window.location.href = "/auth/login";
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  close() {
    this.ws?.close();
  }
}
```

---

## 8. Error Handling Examples

### Example 1: Graceful Error Handling

```typescript
import { isAuthError, getErrorMessage } from "~/utils/token-refresh";

export const handleApiError = (error: unknown) => {
  const message = getErrorMessage(error);
  
  if (isAuthError(error)) {
    // Auth error - refresh should have been attempted
    console.log("🔐 Authentication error:", message);
    return {
      type: "auth",
      message: "Session expired. Please login again.",
      shouldRedirect: true,
    };
  }
  
  if (message.includes("network")) {
    console.log("🌐 Network error:", message);
    return {
      type: "network",
      message: "Network error. Please check your connection.",
      shouldRetry: true,
    };
  }
  
  if (message.includes("validation")) {
    console.log("✏️ Validation error:", message);
    return {
      type: "validation",
      message: message,
      shouldRetry: false,
    };
  }
  
  // Generic error
  console.error("❌ Unknown error:", message);
  return {
    type: "unknown",
    message: "An unexpected error occurred.",
    shouldRetry: false,
  };
};
```

### Example 2: Retry Logic with Auth

```typescript
export const fetchWithRetry = async <T>(
  fetchFn: () => Promise<T>,
  maxRetries = 3
): Promise<T> => {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error;
      
      if (isAuthError(error)) {
        // Auth error - refresh should have been attempted
        // If we're here, refresh failed, so don't retry
        console.error("Auth error after refresh attempt");
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, i) * 1000;
      console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Usage
const data = await fetchWithRetry(() => getMyData(token));
```

---

## 9. Testing Examples

### Example 1: Test Auto-Refresh in Component Test

```typescript
// src/routes/dashboard/__tests__/dashboard.spec.ts
import { test, expect } from "@playwright/test";

test("should auto-refresh expired token", async ({ page }) => {
  // Login first
  await page.goto("/auth/login");
  await page.fill('input[name="email"]', "test@example.com");
  await page.fill('input[name="password"]', "password");
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL("/dashboard");
  
  // Manually expire the access token
  await page.evaluate(() => {
    document.cookie = "accessToken=expired_token; path=/";
  });
  
  // Reload page - should trigger refresh
  await page.reload();
  
  // Should still be on dashboard (not redirected to login)
  expect(page.url()).toContain("/dashboard");
  
  // Check console for refresh log
  const logs = await page.evaluate(() => {
    return (window as any).consoleLogs || [];
  });
  
  expect(logs.some((log: string) => log.includes("Token refreshed"))).toBe(true);
});
```

### Example 2: Test Concurrent Requests

```typescript
import { test, expect } from "vitest";
import { refreshTokenClient } from "~/utils/token-refresh";

test("should handle concurrent refresh requests", async () => {
  const refreshToken = "valid_refresh_token";
  
  // Make 5 simultaneous refresh requests
  const promises = Array(5).fill(null).map(() => 
    refreshTokenClient(refreshToken)
  );
  
  const results = await Promise.all(promises);
  
  // All should succeed
  results.forEach(result => {
    expect(result).toBeDefined();
    expect(result?.accessToken).toBeDefined();
  });
  
  // All should have the same tokens (only one refresh happened)
  const firstToken = results[0]?.accessToken;
  results.forEach(result => {
    expect(result?.accessToken).toBe(firstToken);
  });
});
```

### Example 3: Mock Refresh in Tests

```typescript
import { vi } from "vitest";
import * as tokenRefresh from "~/utils/token-refresh";

// Mock the refresh function
vi.spyOn(tokenRefresh, "refreshTokenClient").mockResolvedValue({
  accessToken: "new_access_token",
  refreshToken: "new_refresh_token",
  expiresIn: 900,
  tokenType: "Bearer",
});

// Now all calls to refreshTokenClient will use mock
const result = await tokenRefresh.refreshTokenClient("old_token");
expect(result?.accessToken).toBe("new_access_token");
```

---

## 🎯 Key Takeaways

1. **Just use `checkAuth()`** - It handles everything automatically
2. **Use enhanced GraphQL client** - For automatic retry on auth errors
3. **Error handling is simple** - Use `isAuthError()` and `getErrorMessage()`
4. **No manual refresh needed** - System handles it automatically
5. **Test with expired tokens** - Verify refresh works correctly

---

## 📚 Related Documentation

- **Quick Start**: `REFRESH_TOKEN_QUICKSTART.md`
- **Full Documentation**: `REFRESH_TOKEN_IMPLEMENTATION.md`
- **API Reference**: See full docs

---

**Happy Coding!** 🚀