# 🚀 Quick Reference - Refresh Token Implementation

## 🎯 TL;DR

**Automatic token refresh is now live!** You don't need to do anything special - it just works.

---

## 📖 For Developers

### Making Authenticated Requests

#### ✅ Correct Way (Automatic Refresh)

```typescript
import { createAuthenticatedClient } from "~/lib/graphql/graffle-with-refresh";

export const getMyData = server$(async (token: string) => {
  const client = createAuthenticatedClient(token);

  // That's it! Automatic retry on token expiration
  const result = await client.gql`
    query GetMyData {
      myData {
        id
        name
      }
    }
  `.send();

  return result.data.myData;
});
```

#### ❌ Wrong Way (Manual Handling)

```typescript
// DON'T DO THIS - Manual refresh is no longer needed!
try {
  const result = await client.query();
} catch (error) {
  if (isAuthError(error)) {
    await refreshToken(); // Not needed anymore!
    return await client.query(); // Automatic now!
  }
}
```

---

### Protecting Routes

#### ✅ Correct Way (Use Middleware)

```typescript
import { routeLoader$ } from "@builder.io/qwik-city";
import { checkAuth } from "~/utils/auth-middleware";

export const useMyData = routeLoader$(async (requestEvent) => {
  // Automatic auth check + token refresh
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  // Your code here...
});
```

#### ❌ Wrong Way (Manual Checks)

```typescript
// DON'T DO THIS - Use middleware instead!
export const useMyData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }
  // Missing refresh logic!
});
```

---

### Handling Optional Data

#### ✅ Correct Way (Safe Access)

```typescript
export default component$(() => {
  const data = useMyData();

  // Always provide fallback for arrays
  const items = data.value.items || [];

  return (
    <>
      {/* Safe with optional chaining */}
      {data.value.items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Safe length display */}
      <span>{data.value.items?.length || 0} items</span>
    </>
  );
});
```

#### ❌ Wrong Way (Unsafe Access)

```typescript
// DON'T DO THIS - Can throw errors!
const items = data.value.items; // Can be undefined!
{data.value.items.map(...)} // Will crash if undefined!
{data.value.items.length} items // Shows undefined!
```

---

## 🔑 Key Files

| File                                  | Purpose             |
| ------------------------------------- | ------------------- |
| `utils/token-refresh.ts`              | Token refresh logic |
| `utils/auth-middleware.ts`            | Route protection    |
| `lib/graphql/graffle-with-refresh.ts` | Auto-retry client   |
| `services/auth.ts`                    | Auth operations     |

---

## 🐛 Debugging

### Check if Token Refresh is Working

1. **Open DevTools Console**
2. **Look for these logs:**
   ```
   🔄 Authentication error detected, attempting token refresh
   ✅ Token refreshed, retrying request
   ✅ Token refreshed successfully
   ```

### Common Issues

#### Issue: Constant redirects to login

**Fix:** Check if refresh token is present in cookies

```typescript
// In browser console
document.cookie.includes("refreshToken");
```

#### Issue: "No refresh token available"

**Fix:** User needs to login again

```typescript
window.location.href = "/auth/login";
```

#### Issue: TypeScript error "possibly undefined"

**Fix:** Add null coalescing or optional chaining

```typescript
const items = data.value.items || [];        // For variables
{data.value.items?.map(...)}                 // For JSX
{data.value.items && items.length > 0 ...}  // For conditions
```

---

## 📝 Code Patterns

### Pattern 1: Route Loader with Auth

```typescript
export const useData = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();
  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { data: [], error: "Not authenticated" };

  try {
    const result = await getMyData(token);
    return { data: result.data, error: null };
  } catch (error) {
    console.error("Failed to load data:", error);
    return { data: [], error: "Failed to load data" };
  }
});
```

### Pattern 2: Route Action with Auth

```typescript
export const useMyAction = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();
  if (!auth.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    await doSomething(token, data);
    return { success: true };
  } catch (error) {
    console.error("Action failed:", error);
    return { success: false, error: "Action failed" };
  }
});
```

### Pattern 3: Service Function

```typescript
export const getMyData = server$(async (token: string): Promise<MyData[]> => {
  const client = createAuthenticatedClient(token);

  try {
    const result = await client.gql`
        query GetMyData {
          myData {
            id
            name
          }
        }
      `.send();

    if (result?.errors?.length) {
      throw new Error(result.errors[0].message);
    }

    return result?.data?.myData || [];
  } catch (error) {
    console.error("❌ Get data error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch data",
    );
  }
});
```

### Pattern 4: Safe Component Rendering

```typescript
export default component$(() => {
  const data = useMyData();
  const items = data.value.items || [];

  return (
    <div>
      {/* Loading State */}
      {!data.value && <div>Loading...</div>}

      {/* Error State */}
      {data.value.error && (
        <div class="alert alert-error">{data.value.error}</div>
      )}

      {/* Empty State */}
      {items.length === 0 && <div>No items found</div>}

      {/* Data Display */}
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* Results Count */}
      <span>{data.value.items?.length || 0} items</span>
    </div>
  );
});
```

---

## ⚠️ Do's and Don'ts

### ✅ DO

- Use `checkAuth()` in all protected routes
- Use `createAuthenticatedClient()` for authenticated requests
- Always provide fallbacks for optional data (`|| []`)
- Use optional chaining (`?.`) in JSX
- Log errors for debugging
- Return proper error objects from actions
- Handle loading and error states in UI

### ❌ DON'T

- Don't manually refresh tokens
- Don't access data without null checks
- Don't hardcode redirects (use middleware)
- Don't expose tokens in logs
- Don't forget error handling
- Don't use `any` types
- Don't skip TypeScript checks

---

## 🧪 Testing Your Changes

### 1. Test Authentication

```bash
# Login and check cookies
# Navigate to protected route
# Check console for refresh logs
```

### 2. Test Token Refresh

```bash
# Wait for token to expire (or manually delete accessToken cookie)
# Make a request
# Should auto-refresh and retry
```

### 3. Test Error Handling

```bash
# Turn off internet
# Try to make request
# Should show error message, not crash
```

### 4. Test TypeScript

```bash
npm run build.types  # Should pass with 0 errors
npm run lint         # Should pass with 0 warnings
npm run build        # Should build successfully
```

---

## 🚨 Emergency Fixes

### Build Failing?

```bash
# 1. Check TypeScript errors
npm run build.types

# 2. Fix undefined errors with:
const items = data.value.items || [];
{data.value.items?.map(...)}

# 3. Rebuild
npm run build
```

### Users Can't Login?

```bash
# 1. Check backend is running
# 2. Check GraphQL endpoint
# 3. Check cookies are being set
# 4. Check refresh token mutation
```

### Infinite Redirects?

```bash
# 1. Clear all cookies
# 2. Check middleware logic
# 3. Verify token is valid
# 4. Check redirect paths
```

---

## 📚 Additional Resources

- **Detailed Fixes**: See `FIXES_APPLIED.md`
- **Full Status**: See `REFRESH_TOKEN_STATUS.md`
- **Code Comments**: Check inline documentation
- **GraphQL Schema**: Check backend documentation

---

## 💬 Quick Tips

1. **Always use the middleware** - Don't reinvent auth checks
2. **Trust the auto-refresh** - It just works
3. **Handle null/undefined** - TypeScript will thank you
4. **Log errors** - Makes debugging easier
5. **Test in incognito** - Fresh cookies every time

---

## ✨ Common Use Cases

### Add a new protected route

```typescript
// 1. Create route loader with checkAuth
export const useMyLoader = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth(); // ← Add this
  if (!auth.authenticated) {
    throw requestEvent.redirect(302, "/auth/login");
  }
  // Your code...
});
```

### Add a new service function

```typescript
// 1. Use createAuthenticatedClient
import { createAuthenticatedClient } from "~/lib/graphql/graffle-with-refresh";

export const myService = server$(async (token: string) => {
  const client = createAuthenticatedClient(token); // ← Use this
  // Your code...
});
```

### Fix "possibly undefined" error

```typescript
// Option 1: Fallback value
const items = data.value.items || [];

// Option 2: Optional chaining
{data.value.items?.map(...)}

// Option 3: Null check
{data.value.items && data.value.items.length > 0 && ...}
```

---

**Last Updated**: October 6, 2025  
**Status**: ✅ Production Ready  
**Questions?** Check the full documentation or ask the team!
