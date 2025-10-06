# 🚀 Refresh Token Quick Start Guide

## ✅ Installation Complete!

Your refresh token implementation is now installed and ready to use. Here's how to get started in 5 minutes.

---

## 📋 What Was Installed

- ✅ `src/utils/token-refresh.ts` - Core refresh logic
- ✅ `src/utils/auth-middleware.ts` - Updated with auto-refresh
- ✅ `src/lib/graphql/graffle-with-refresh.ts` - Enhanced GraphQL client
- ✅ `src/services/auth.ts` - Improved error handling
- ✅ `REFRESH_TOKEN_IMPLEMENTATION.md` - Full documentation

---

## 🎯 How It Works (Simple Version)

```
User Request → Token Expired? → Yes → Refresh Token → Retry Request → Success! ✅
                     ↓
                    No → Success! ✅
```

**That's it!** The system automatically handles everything.

---

## 🔥 Quick Examples

### Example 1: Protected Route (Automatic Refresh)

```typescript
// src/routes/dashboard/index.tsx
import { routeLoader$ } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";

export const useUserLoader = routeLoader$(async (requestEvent) => {
  // ✨ Auto-refresh happens here if token is expired
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  // Your user is authenticated and token is fresh!
  return { user: auth.user };
});

export default component$(() => {
  const user = useUserLoader();

  return <div>Welcome, {user.value.user?.name}!</div>;
});
```

### Example 2: API Call with Auto-Retry

```typescript
// src/services/my-service.ts
import { server$ } from "@builder.io/qwik-city";
import { createAuthenticatedClient } from "~/lib/graphql/graffle-with-refresh";

export const getMyData = server$(async (token: string) => {
  // ✨ This client auto-refreshes and retries on auth errors
  const client = createAuthenticatedClient(token);

  const result = await client.gql`
    query GetMyData {
      myData {
        id
        name
      }
    }
  `.send();

  return result.data;
});
```

### Example 3: Manual Error Handling

```typescript
import { isAuthError, getErrorMessage } from "~/utils/token-refresh";

try {
  await someApiCall();
} catch (error) {
  if (isAuthError(error)) {
    // This is an auth error - refresh should have been attempted
    console.log("Auth error:", getErrorMessage(error));
  } else {
    // Some other error
    console.error("Error:", getErrorMessage(error));
  }
}
```

---

## 🧪 Testing Your Implementation

### Step 1: Test Normal Login

```bash
# Login normally
curl -X POST http://localhost:5173/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

✅ **Expected**: Login succeeds, tokens stored in cookies

### Step 2: Test Protected Route

```bash
# Access protected route
curl http://localhost:5173/dashboard \
  -H "Cookie: accessToken=YOUR_TOKEN"
```

✅ **Expected**: Dashboard loads successfully

### Step 3: Test Auto-Refresh (Manual)

To manually test refresh:

1. Open browser DevTools → Application → Cookies
2. Find `accessToken` cookie
3. Change its value to an invalid/expired token
4. Refresh the page or make an API call
5. Check console logs for `🔄 Attempting token refresh`
6. Should see `✅ Token refreshed successfully`
7. Request should succeed!

### Step 4: Test Concurrent Requests

Open console and run:

```javascript
// Make 5 simultaneous requests with expired token
Promise.all([
  fetch("/api/data1"),
  fetch("/api/data2"),
  fetch("/api/data3"),
  fetch("/api/data4"),
  fetch("/api/data5"),
]).then(() => console.log("All succeeded!"));
```

✅ **Expected**: Only ONE refresh request, all 5 succeed

---

## 🔍 Debugging

### Check if refresh is working:

1. **Open Browser Console**
2. **Look for these messages**:

```
🔄 Authentication error detected, attempting token refresh
✅ Token refreshed successfully
✅ Successfully recovered from auth error
```

### Common Issues:

#### ❌ Not refreshing?

```typescript
// Check these in browser console:
console.log(document.cookie); // Should see refreshToken
```

**Solution**: Ensure refresh token is in cookies (check login/register actions)

#### ❌ Infinite redirect loop?

**Solution**: Clear all cookies and localStorage, then login again

```javascript
// Run in console:
document.cookie.split(";").forEach((c) => {
  document.cookie =
    c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
});
localStorage.clear();
```

#### ❌ "ContextualError: invalid or expired token" still appearing?

**Check**:

1. Backend GraphQL mutation is working: `mutation { refreshToken(refreshToken: "...") }`
2. Error pattern matches in `isAuthError()` function
3. Console logs show refresh attempt

---

## 🎨 Customization

### Change Token Expiry Times

Edit `src/routes/(guest)/auth/login/index.tsx`:

```typescript
// Access token (short-lived)
cookie.set("accessToken", tokens.accessToken, {
  maxAge: 15 * 60, // 15 minutes (default: tokens.expiresIn)
});

// Refresh token (long-lived)
cookie.set("refreshToken", tokens.refreshToken, {
  maxAge: 30 * 24 * 60 * 60, // 30 days (default: 7 days)
});
```

### Add Custom Error Patterns

Edit `src/utils/token-refresh.ts`:

```typescript
const authErrorPatterns = [
  /invalid.*token/i,
  /expired.*token/i,
  /your_custom_pattern/i, // Add here
];
```

### Add Refresh Callback

```typescript
const client = createAuthenticatedClient(token, {
  onTokenRefresh: (newToken) => {
    console.log("Token refreshed! New token:", newToken);
    // Update your state/context here
  },
});
```

---

## 📊 Monitoring

### Add Metrics

```typescript
// In token-refresh.ts
let refreshCount = 0;
let refreshFailures = 0;

export const refreshTokenServer = server$(async function (
  refreshToken: string,
) {
  refreshCount++;

  try {
    // ... existing code
    console.log(`✅ Refresh #${refreshCount} succeeded`);
  } catch (error) {
    refreshFailures++;
    console.error(
      `❌ Refresh #${refreshCount} failed (${refreshFailures} total failures)`,
    );
    throw error;
  }
});
```

### Track Refresh Events

```typescript
// Optional: Send to analytics
onTokenRefresh: (newToken) => {
  analytics.track("token_refreshed", {
    timestamp: new Date().toISOString(),
  });
};
```

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Test with expired tokens
- [ ] Test concurrent requests
- [ ] Verify cookies are secure (HTTPS only)
- [ ] Check token expiry times are appropriate
- [ ] Test logout clears all tokens
- [ ] Verify refresh token rotation (if enabled)
- [ ] Check error logging is working
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Monitor refresh rates in production

---

## 🎓 Learn More

- **Full Documentation**: `REFRESH_TOKEN_IMPLEMENTATION.md`
- **Architecture**: See "Flow Diagram" section in full docs
- **API Reference**: See "API Reference" section in full docs
- **Best Practices**: See "Best Practices" section in full docs

---

## 💡 Pro Tips

1. **Proactive Refresh**: Refresh before token expires

```typescript
// Check token expiry
const tokenExpiry = parseJWT(accessToken).exp;
const timeUntilExpiry = tokenExpiry * 1000 - Date.now();

if (timeUntilExpiry < 60000) {
  // Less than 1 minute
  await refreshTokenClient(refreshToken);
}
```

2. **Silent Refresh**: Refresh in background

```typescript
// Refresh silently without blocking UI
refreshTokenClient(refreshToken).catch((err) => {
  console.error("Silent refresh failed:", err);
});
```

3. **Network Error Handling**:

```typescript
try {
  await apiCall();
} catch (error) {
  if (error.message.includes("network")) {
    // Handle network error separately
    showOfflineMessage();
  } else if (isAuthError(error)) {
    // Handle auth error
  }
}
```

---

## 🆘 Need Help?

### Quick Checks:

1. ✅ Backend refresh mutation working?

   ```graphql
   mutation {
     refreshToken(refreshToken: "YOUR_TOKEN") {
       accessToken
       refreshToken
     }
   }
   ```

2. ✅ Cookies stored correctly?
   - DevTools → Application → Cookies
   - Should see: `accessToken`, `refreshToken`

3. ✅ Console logs showing refresh attempts?
   - Look for 🔄 emoji in console
   - Should see refresh process logs

4. ✅ GraphQL endpoint correct?
   - Check `.env`: `PUBLIC_GRAPHQL_ENDPOINT`

### Still stuck?

1. Clear ALL cookies and localStorage
2. Restart your dev server
3. Login fresh
4. Try again

---

## 🎉 You're All Set!

Your application now has:

- ✅ Automatic token refresh
- ✅ Race condition prevention
- ✅ Secure cookie storage
- ✅ Request retry on auth errors
- ✅ Clean error handling

**Just use your app normally** - refresh happens automatically! 🚀

---

**Quick Reference Card**

| What              | How                                |
| ----------------- | ---------------------------------- |
| Protected Route   | `const auth = await checkAuth();`  |
| Manual Refresh    | `await refreshTokenClient(token);` |
| Check Auth Error  | `isAuthError(error)`               |
| Get Error Message | `getErrorMessage(error)`           |
| Enhanced Client   | `createAuthenticatedClient(token)` |

---

**Version**: 1.0.0  
**Created**: 2025-01-27  
**Ready to use**: YES! ✅
