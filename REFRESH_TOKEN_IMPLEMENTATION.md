# 🔄 Refresh Token Implementation

## Overview

This implementation provides automatic token refresh functionality for the Qwik application. When an API request fails due to an expired or invalid access token, the system automatically attempts to refresh the token using the refresh token and retry the request.

## Features

- ✅ **Automatic Token Refresh**: Detects auth errors and automatically refreshes tokens
- ✅ **Race Condition Prevention**: Ensures only one refresh request happens at a time
- ✅ **Error Pattern Matching**: Identifies various authentication error formats
- ✅ **Server & Client Support**: Works in both server and client contexts
- ✅ **Cookie Management**: Securely stores tokens in HTTP-only cookies
- ✅ **Request Retry**: Automatically retries failed requests after token refresh
- ✅ **Clean Code**: Reusable, maintainable, and follows best practices

## Architecture

### Files Structure

```
frontend/src/
├── utils/
│   ├── token-refresh.ts          # Core token refresh logic
│   └── auth-middleware.ts        # Updated with refresh support
├── lib/graphql/
│   ├── graffle.ts               # Original GraphQL client
│   └── graffle-with-refresh.ts  # Enhanced client with auto-refresh
└── services/
    └── auth.ts                   # Updated auth service
```

### Flow Diagram

```
┌─────────────────┐
│  API Request    │
└────────┬────────┘
         │
         ├─── Success ──> Return Data
         │
         ├─── Auth Error (401/expired token)
         │    │
         │    ├──> Check Refresh Token
         │    │
         │    ├──> Call RefreshToken Mutation
         │    │    │
         │    │    ├─── Success
         │    │    │    │
         │    │    │    ├──> Update Cookies
         │    │    │    ├──> Retry Original Request
         │    │    │    └──> Return Data
         │    │    │
         │    │    └─── Failure
         │    │         │
         │    │         ├──> Clear All Tokens
         │    │         └──> Redirect to Login
         │    │
         │    └──> No Refresh Token
         │         │
         │         └──> Redirect to Login
         │
         └─── Other Error ──> Throw Error
```

## Usage

### 1. Automatic Token Refresh (Recommended)

The refresh logic is automatically applied in the authentication middleware:

```typescript
// In your route loader or action
import { checkAuth } from "~/utils/auth-middleware";

export const useProtectedLoader = routeLoader$(async (requestEvent) => {
  // This automatically handles token refresh if needed
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  // Your protected route logic here
  return {
    user: auth.user,
    data: await fetchProtectedData(
      requestEvent.cookie.get("accessToken")?.value,
    ),
  };
});
```

### 2. Using Enhanced GraphQL Client

For GraphQL operations with automatic retry:

```typescript
import { createAuthenticatedClient } from "~/lib/graphql/graffle-with-refresh";

export const getData = server$(async (token: string) => {
  // This client automatically refreshes token and retries on auth errors
  const client = createAuthenticatedClient(token, {
    onTokenRefresh: (newToken) => {
      console.log("Token was refreshed!");
      // Optionally update your state/context with new token
    },
  });

  const result = await client.gql`
    query GetData {
      data {
        id
        name
      }
    }
  `.send();

  return result.data;
});
```

### 3. Manual Token Refresh

If you need to manually trigger a token refresh:

```typescript
import { refreshTokenClient } from "~/utils/token-refresh";

// Client-side
const newTokens = await refreshTokenClient(refreshToken);
if (newTokens) {
  // Tokens refreshed successfully
  console.log("New access token:", newTokens.accessToken);
}

// Server-side
import { refreshTokenServer } from "~/utils/token-refresh";

const result = await refreshTokenServer(refreshToken);
if (result.success) {
  // Cookies are automatically updated
  console.log("Tokens refreshed!");
}
```

### 4. Error Detection

Check if an error is an authentication error:

```typescript
import { isAuthError, getErrorMessage } from "~/utils/token-refresh";

try {
  await someApiCall();
} catch (error) {
  if (isAuthError(error)) {
    // Handle authentication error
    console.log("Auth error detected:", getErrorMessage(error));
  } else {
    // Handle other errors
    throw error;
  }
}
```

## Error Patterns Detected

The implementation automatically detects these error patterns:

- `invalid token`
- `expired token`
- `token expired`
- `token invalid`
- `unauthorized`
- `unauthenticated`
- `authentication failed`
- `ContextualError: invalid or expired token`

## Security Features

### HTTP-Only Cookies

Tokens are stored in HTTP-only cookies to prevent XSS attacks:

```typescript
cookie.set("accessToken", token, {
  httpOnly: true, // Prevents JavaScript access
  secure: true, // HTTPS only
  sameSite: "strict", // CSRF protection
  maxAge: expiresIn, // Auto-expiry
  path: "/",
});
```

### Race Condition Prevention

Only one token refresh request can happen at a time:

```typescript
let isRefreshing = false;
let refreshPromise: Promise<TokenPair | null> | null = null;

// If already refreshing, wait for the existing promise
if (isRefreshing && refreshPromise) {
  return refreshPromise;
}
```

### Automatic Cleanup

Failed refresh attempts automatically clear all tokens:

```typescript
// Clear invalid tokens
this.cookie.delete("accessToken", { path: "/" });
this.cookie.delete("refreshToken", { path: "/" });
this.cookie.delete("user", { path: "/" });
```

## Configuration

### Token Expiry

Configure token expiry times in your login/register actions:

```typescript
// Access token (short-lived)
cookie.set("accessToken", tokens.accessToken, {
  maxAge: tokens.expiresIn, // e.g., 15 minutes (900 seconds)
});

// Refresh token (long-lived)
cookie.set("refreshToken", tokens.refreshToken, {
  maxAge: 7 * 24 * 60 * 60, // 7 days
});
```

### GraphQL Endpoint

Set your GraphQL endpoint in `.env`:

```env
PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4001/graphql
```

## How It Works

### Step-by-Step Flow

1. **Initial Request**: User makes an API request with access token
2. **Token Validation**: Backend validates the access token
3. **Token Expired**: If expired, backend returns auth error
4. **Error Detection**: `isAuthError()` detects authentication error
5. **Get Refresh Token**: System retrieves refresh token from cookies
6. **Refresh Request**: Calls GraphQL `refreshToken` mutation
7. **Update Cookies**: Stores new tokens in HTTP-only cookies
8. **Retry Request**: Retries the original request with new access token
9. **Success**: Returns data to user

### Race Condition Handling

```typescript
// Multiple requests with expired token
Request 1 → Detects error → Starts refresh
Request 2 → Detects error → Waits for Request 1's refresh
Request 3 → Detects error → Waits for Request 1's refresh

// After refresh completes
Request 1 → Retries with new token → Success
Request 2 → Retries with new token → Success
Request 3 → Retries with new token → Success
```

## Testing

### Test Scenarios

1. **Expired Access Token**:
   - Make an API request with expired access token
   - System should automatically refresh and retry
   - Request should succeed

2. **Invalid Refresh Token**:
   - Use invalid refresh token
   - System should clear all tokens
   - User should be redirected to login

3. **No Refresh Token**:
   - Remove refresh token from cookies
   - System should redirect to login immediately

4. **Concurrent Requests**:
   - Make multiple requests simultaneously with expired token
   - Only one refresh request should be made
   - All requests should succeed after refresh

### Example Test

```typescript
// Test automatic refresh
const testAutoRefresh = async () => {
  // 1. Login to get tokens
  const loginResult = await loginUser({
    email: "test@example.com",
    password: "password123",
  });

  // 2. Manually expire access token (or wait for expiry)
  // In real scenario, tokens expire naturally

  // 3. Make a protected API call
  const data = await getProtectedData();

  // 4. Should succeed without error (token auto-refreshed)
  expect(data).toBeDefined();
  console.log("✅ Auto-refresh test passed!");
};
```

### Manual Testing

```bash
# 1. Login and get tokens
curl -X POST http://localhost:5173/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# 2. Copy access token and wait for expiration (or use expired token)

# 3. Make protected request
curl http://localhost:5173/api/protected \
  -H "Cookie: accessToken=<expired_token>; refreshToken=<valid_refresh_token>"

# 4. Should receive new tokens and successful response
```

## Troubleshooting

### Issue: Tokens not refreshing

**Symptoms**:

- User gets logged out despite valid refresh token
- Auth errors not triggering refresh

**Solutions**:

1. Check that refresh token is stored in cookies
2. Verify `refreshTokenServer` function is accessible
3. Confirm GraphQL endpoint is correct
4. Test backend refresh mutation directly
5. Check browser console for error logs

```typescript
// Debug: Check if token refresh is being called
console.log("🔍 Refresh token available:", !!refreshToken);
console.log("🔍 Is auth error:", isAuthError(error));
```

### Issue: Infinite redirect loop

**Symptoms**:

- User keeps getting redirected to login page
- Login succeeds but immediately redirects back

**Solutions**:

1. Ensure refresh token is valid and not expired
2. Clear all cookies and localStorage
3. Login again to get fresh tokens
4. Check cookie settings (domain, path, sameSite)

```typescript
// Clear all auth data
document.cookie =
  "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie =
  "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
localStorage.clear();
```

### Issue: "ContextualError" not detected

**Symptoms**:

- Auth errors not triggering refresh
- Error format doesn't match patterns

**Solutions**:

1. Check actual error message in console
2. Update error patterns in `isAuthError` function
3. Add custom error pattern for your backend

```typescript
// Add custom error pattern
const authErrorPatterns = [
  /invalid.*token/i,
  /expired.*token/i,
  /your_custom_error_pattern/i, // Add here
];
```

### Issue: Race condition with multiple requests

**Symptoms**:

- Multiple refresh requests being made
- Tokens getting refreshed multiple times

**Solutions**:

1. Verify `isRefreshing` flag is working
2. Check that `refreshPromise` is being reused
3. Ensure state is shared across requests

```typescript
// Verify race condition prevention
console.log("🔍 Already refreshing:", isRefreshing);
console.log("🔍 Refresh promise exists:", !!refreshPromise);
```

## Best Practices

1. **Always use HTTP-only cookies** for token storage in production
2. **Set appropriate token expiry times** (access: 15-60 minutes, refresh: 7-30 days)
3. **Log refresh attempts** for debugging and monitoring
4. **Clear all tokens on logout** including localStorage and cookies
5. **Use secure flag in production** for all cookies
6. **Implement rate limiting** on refresh endpoint in backend
7. **Rotate refresh tokens** after each use (if backend supports it)
8. **Monitor refresh rates** to detect potential issues
9. **Test refresh logic** thoroughly before production
10. **Handle edge cases** like network errors during refresh

## Migration Guide

### From Manual Refresh Implementation

If you have existing manual refresh logic:

1. **Remove manual refresh code** from your components
2. **Update imports** to use new utilities
3. **Update auth middleware** calls
4. **Test all protected routes**

```typescript
// Before (manual refresh)
try {
  const data = await api.getData(accessToken);
} catch (error) {
  if (error.message.includes("expired")) {
    const newTokens = await refreshToken(refreshToken);
    const data = await api.getData(newTokens.accessToken);
  }
}

// After (automatic refresh)
const data = await api.getData(accessToken);
// Refresh happens automatically!
```

### From No Refresh Implementation

If you're adding refresh for the first time:

1. **Install new files**:
   - `utils/token-refresh.ts`
   - `lib/graphql/graffle-with-refresh.ts`

2. **Update existing files**:
   - `utils/auth-middleware.ts`
   - `services/auth.ts`

3. **Update all protected routes** to use `checkAuth()`

4. **Update GraphQL clients** to use enhanced version

5. **Test thoroughly** with expired tokens

## Performance Considerations

### Token Refresh Overhead

- **First Request**: ~100-200ms additional latency (refresh + retry)
- **Subsequent Requests**: No overhead (token cached in cookies)
- **Concurrent Requests**: No additional overhead (single refresh handles all)

### Optimization Tips

1. **Proactive Refresh**: Refresh token before it expires

```typescript
// Check token expiry and refresh proactively
const tokenExpiresIn = getTokenExpiry(accessToken);
if (tokenExpiresIn < 60) {
  // Less than 60 seconds
  await refreshTokenClient(refreshToken);
}
```

2. **Cache Token Validation**: Don't validate on every request

```typescript
// Cache validation result for a short time
const validationCache = new Map();
```

3. **Use Server-Side Rendering**: Less client-side token handling

```typescript
// SSR automatically handles tokens via cookies
export const useServerData = routeLoader$(async (requestEvent) => {
  // Tokens available in cookies
});
```

## Security Checklist

- [ ] HTTP-only cookies enabled for tokens
- [ ] Secure flag enabled in production
- [ ] SameSite=strict for CSRF protection
- [ ] Tokens have appropriate expiry times
- [ ] Refresh tokens are rotated (if supported)
- [ ] Failed refresh attempts clear all tokens
- [ ] No tokens stored in localStorage (except as fallback)
- [ ] HTTPS enforced in production
- [ ] Rate limiting on refresh endpoint
- [ ] Logging for security monitoring

## Future Enhancements

- [ ] **Token Rotation**: Rotate refresh token after each use
- [ ] **Sliding Window Refresh**: Extend token lifetime on activity
- [ ] **Metrics/Monitoring**: Track refresh rates and failures
- [ ] **Token Blacklist**: Support for token revocation
- [ ] **Refresh Token Family**: Track token generations
- [ ] **Fingerprinting**: Bind tokens to device/browser
- [ ] **Multi-Device Support**: Manage tokens per device
- [ ] **Graceful Degradation**: Fallback strategies for refresh failures

## API Reference

### `refreshTokenServer(refreshToken: string)`

Server-side function to refresh tokens via GraphQL mutation.

**Parameters:**

- `refreshToken`: The refresh token string

**Returns:**

```typescript
{
  success: boolean;
  tokens?: TokenPair;
  error?: string;
}
```

**Example:**

```typescript
const result = await refreshTokenServer(refreshToken);
if (result.success) {
  console.log("New tokens:", result.tokens);
}
```

### `refreshTokenClient(refreshToken: string)`

Client-side function with race condition prevention.

**Parameters:**

- `refreshToken`: The refresh token string

**Returns:**

```typescript
Promise<TokenPair | null>;
```

**Example:**

```typescript
const tokens = await refreshTokenClient(refreshToken);
if (tokens) {
  // Use new tokens
}
```

### `isAuthError(error: unknown)`

Checks if error is an authentication error.

**Parameters:**

- `error`: Any error object

**Returns:**

```typescript
boolean;
```

**Example:**

```typescript
if (isAuthError(error)) {
  // Handle auth error
}
```

### `getErrorMessage(error: unknown)`

Extracts error message from various error types.

**Parameters:**

- `error`: Any error object

**Returns:**

```typescript
string;
```

**Example:**

```typescript
const message = getErrorMessage(error);
console.error("Error:", message);
```

### `checkAuth()`

Server-side authentication check with automatic refresh.

**Returns:**

```typescript
Promise<AuthResult>;

interface AuthResult {
  authenticated: boolean;
  user: User | null;
  redirectTo?: string;
}
```

**Example:**

```typescript
export const useLoader = routeLoader$(async () => {
  const auth = await checkAuth();
  return auth;
});
```

## Support

For issues or questions:

1. **Check Console Logs**: Look for 🔄 and ✅ emoji indicators
2. **Verify Backend**: Test GraphQL mutation directly
3. **Test with Postman**: Isolate frontend vs backend issues
4. **Check Browser DevTools**: Inspect cookies and network requests
5. **Review Error Patterns**: Ensure your backend errors match patterns
6. **Enable Debug Mode**: Set `import.meta.env.DEV = true`

### Common Error Messages

| Error                                       | Cause                   | Solution                         |
| ------------------------------------------- | ----------------------- | -------------------------------- |
| "Token refresh failed"                      | Invalid refresh token   | Clear cookies and re-login       |
| "No refresh token available"                | Token not in cookies    | Check cookie settings            |
| "ContextualError: invalid or expired token" | Token expired naturally | Should auto-refresh (check logs) |
| "Authentication required"                   | No tokens found         | Redirect to login                |

### Debug Mode

Enable verbose logging:

```typescript
// In token-refresh.ts
const DEBUG = true;

if (DEBUG) {
  console.log("🔍 Refresh token:", refreshToken?.substring(0, 20) + "...");
  console.log("🔍 Access token expired:", isTokenExpired(accessToken));
  console.log("🔍 Is refreshing:", isRefreshing);
}
```

## Changelog

### Version 1.0.0 (2025-01-27)

- ✅ Initial implementation
- ✅ Automatic token refresh on auth errors
- ✅ Race condition prevention
- ✅ Server and client support
- ✅ Enhanced GraphQL client
- ✅ Comprehensive error handling
- ✅ Full documentation

---

**Version**: 1.0.0  
**Last Updated**: 2025-01-27  
**License**: MIT  
**Maintainer**: Development Team
