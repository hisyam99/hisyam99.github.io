# 🔄 Refresh Token Flow Diagram

## Visual Flow: How Automatic Token Refresh Works

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER MAKES REQUEST                                  │
│                     (e.g., GET /api/protected-data)                         │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │   Check Access Token in Cookies    │
         └────────────────┬───────────────────┘
                          │
                ┌─────────┴──────────┐
                │                    │
         Token Exists?        Token Missing?
                │                    │
                │                    ▼
                │         ┌──────────────────────┐
                │         │ Check Refresh Token  │
                │         └──────────┬───────────┘
                │                    │
                │              ┌─────┴──────┐
                │              │            │
                │          Exists?      Missing?
                │              │            │
                │              │            ▼
                │              │    ┌──────────────┐
                │              │    │ REDIRECT TO  │
                │              │    │    LOGIN     │
                │              │    └──────────────┘
                │              │
                │              ▼
                │    ┌──────────────────────┐
                │    │ Try Refresh Token    │
                │    │  (Skip to Step 5)    │
                │    └──────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: Send Request with Access Token                                     │
│  Header: Authorization: Bearer <access_token>                               │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │      Backend Validates Token       │
         └────────────────┬───────────────────┘
                          │
                ┌─────────┴──────────┐
                │                    │
         Token Valid?         Token Invalid/Expired?
                │                    │
                ▼                    ▼
┌───────────────────────┐  ┌────────────────────────────────┐
│  STEP 2: SUCCESS!     │  │ STEP 3: Backend Returns Error  │
│  Return data to user  │  │ "invalid or expired token"     │
└───────────────────────┘  └─────────────┬──────────────────┘
                                         │
                                         ▼
                          ┌──────────────────────────────────┐
                          │ STEP 4: Frontend Detects Error   │
                          │ isAuthError() returns true        │
                          └─────────────┬────────────────────┘
                                        │
                                        ▼
                          ┌──────────────────────────────────┐
                          │ Check if Refresh Token Available │
                          └─────────────┬────────────────────┘
                                        │
                          ┌─────────────┴─────────────┐
                          │                           │
                    Available?                   Not Available?
                          │                           │
                          │                           ▼
                          │                  ┌─────────────────┐
                          │                  │  Clear Cookies  │
                          │                  │  REDIRECT TO    │
                          │                  │     LOGIN       │
                          │                  └─────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: Call RefreshToken Mutation                                         │
│                                                                              │
│  mutation RefreshToken($refreshToken: String!) {                            │
│    refreshToken(refreshToken: $refreshToken) {                              │
│      accessToken                                                             │
│      refreshToken                                                            │
│      expiresIn                                                               │
│      tokenType                                                               │
│    }                                                                         │
│  }                                                                           │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │     Backend Validates Refresh      │
         │           Token                    │
         └────────────────┬───────────────────┘
                          │
                ┌─────────┴──────────┐
                │                    │
         Valid Refresh?       Invalid Refresh?
                │                    │
                │                    ▼
                │          ┌──────────────────┐
                │          │  Clear Cookies   │
                │          │  REDIRECT TO     │
                │          │     LOGIN        │
                │          └──────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: Backend Returns New Tokens                                         │
│  {                                                                           │
│    accessToken: "new_jwt_token...",                                         │
│    refreshToken: "new_refresh_token...",                                    │
│    expiresIn: 900,                                                           │
│    tokenType: "Bearer"                                                       │
│  }                                                                           │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 7: Frontend Updates Cookies                                           │
│                                                                              │
│  cookie.set("accessToken", newToken, {                                      │
│    httpOnly: true,                                                           │
│    secure: true,                                                             │
│    sameSite: "strict",                                                       │
│    maxAge: 900                                                               │
│  });                                                                         │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 8: Retry Original Request                                             │
│  Use new accessToken in Authorization header                                │
└─────────────────────────┬───────────────────────────────────────────────────┘
                          │
                          ▼
         ┌────────────────────────────────────┐
         │   Backend Validates New Token      │
         └────────────────┬───────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 9: SUCCESS!                                                            │
│  Return data to user                                                         │
│  User never noticed their token expired! ✨                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Race Condition Prevention Flow

```
TIME    │  REQUEST 1    │  REQUEST 2    │  REQUEST 3    │  REFRESH STATE
────────┼───────────────┼───────────────┼───────────────┼─────────────────
  t0    │  Expired ❌   │               │               │  isRefreshing: false
        │               │               │               │
  t1    │  Detect Error │               │               │  isRefreshing: false
        │               │               │               │
  t2    │  Start Refresh│               │               │  isRefreshing: true
        │  Create Promise              │               │  promise: PENDING
        │               │               │               │
  t3    │  Refreshing...│  Expired ❌   │               │  isRefreshing: true
        │               │               │               │  promise: PENDING
        │               │               │               │
  t4    │  Refreshing...│  Detect Error │               │  isRefreshing: true
        │               │  Wait Promise │               │  promise: PENDING
        │               │               │               │
  t5    │  Refreshing...│  Waiting...   │  Expired ❌   │  isRefreshing: true
        │               │               │               │  promise: PENDING
        │               │               │               │
  t6    │  Refreshing...│  Waiting...   │  Detect Error │  isRefreshing: true
        │               │               │  Wait Promise │  promise: PENDING
        │               │               │               │
  t7    │  ✅ Success!  │  Waiting...   │  Waiting...   │  isRefreshing: true
        │  New Tokens   │               │               │  promise: RESOLVED
        │               │               │               │
  t8    │  Retry Success│  ✅ Use Tokens│  Waiting...   │  isRefreshing: false
        │               │               │               │  promise: null
        │               │               │               │
  t9    │  Return Data ✨│  Retry Success│  ✅ Use Tokens│  isRefreshing: false
        │               │               │               │  promise: null
        │               │               │               │
  t10   │               │  Return Data ✨│  Retry Success│  isRefreshing: false
        │               │               │               │  promise: null
        │               │               │               │
  t11   │               │               │  Return Data ✨│  isRefreshing: false
        │               │               │               │  promise: null

RESULT: ✅ Only 1 refresh mutation was called
        ✅ All 3 requests succeeded
        ✅ No race condition occurred
```

---

## 🎯 Code Execution Path

### When Token is Valid

```
User Action
    │
    ▼
checkAuth()
    │
    ├─► Get accessToken from cookies
    │
    ├─► Call getCurrentUser(accessToken)
    │
    ├─► GraphQL Request to Backend
    │
    ├─► Backend validates token ✅
    │
    ├─► Return user data
    │
    └─► Return { authenticated: true, user: {...} }
```

### When Token is Expired

```
User Action
    │
    ▼
checkAuth()
    │
    ├─► Get accessToken from cookies
    │
    ├─► Call getCurrentUser(accessToken)
    │
    ├─► GraphQL Request to Backend
    │
    ├─► Backend validates token ❌ "expired token"
    │
    ├─► Catch error
    │
    ├─► isAuthError(error) → true
    │
    ├─► Get refreshToken from cookies
    │
    ├─► Call refreshTokenServer(refreshToken)
    │   │
    │   ├─► Check if already refreshing
    │   │   └─► If yes: wait for existing promise
    │   │   └─► If no: start new refresh
    │   │
    │   ├─► GraphQL RefreshToken Mutation
    │   │
    │   ├─► Backend validates refresh token ✅
    │   │
    │   ├─► Backend returns new tokens
    │   │
    │   └─► Update cookies with new tokens
    │
    ├─► Retry getCurrentUser(newAccessToken)
    │
    ├─► Backend validates new token ✅
    │
    ├─► Return user data
    │
    └─► Return { authenticated: true, user: {...} }
```

### When Refresh Token is Invalid

```
User Action
    │
    ▼
checkAuth()
    │
    ├─► Get accessToken from cookies
    │
    ├─► Call getCurrentUser(accessToken)
    │
    ├─► Backend returns error ❌
    │
    ├─► isAuthError(error) → true
    │
    ├─► Get refreshToken from cookies
    │
    ├─► Call refreshTokenServer(refreshToken)
    │   │
    │   ├─► GraphQL RefreshToken Mutation
    │   │
    │   ├─► Backend validates refresh token ❌ "invalid refresh token"
    │   │
    │   ├─► Catch error
    │   │
    │   └─► Clear all cookies
    │
    ├─► Refresh failed
    │
    ├─► Clear all cookies
    │
    └─► Return { authenticated: false, redirectTo: "/auth/login" }
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND APPLICATION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    USER INTERFACE                           │   │
│  │  (Components, Pages, Forms)                                │   │
│  └───────────────────────┬────────────────────────────────────┘   │
│                          │                                          │
│                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              AUTHENTICATION MIDDLEWARE                      │   │
│  │                                                             │   │
│  │  • checkAuth()                                             │   │
│  │  • requireAuth()                                           │   │
│  │  • requireAdmin()                                          │   │
│  │                                                             │   │
│  │  ┌──────────────────────────────────────────────────┐    │   │
│  │  │     TOKEN REFRESH UTILITY                        │    │   │
│  │  │                                                   │    │   │
│  │  │  • refreshTokenServer()  ◄─────────┐            │    │   │
│  │  │  • refreshTokenClient()            │            │    │   │
│  │  │  • isAuthError()                   │            │    │   │
│  │  │  • getErrorMessage()               │            │    │   │
│  │  │                                    │            │    │   │
│  │  │  Race Condition Prevention:        │            │    │   │
│  │  │  • isRefreshing flag              │            │    │   │
│  │  │  • refreshPromise cache           │            │    │   │
│  │  └─────────────────┬────────────────┬┴────────────┘    │   │
│  │                    │                │                   │   │
│  └────────────────────┼────────────────┼───────────────────┘   │
│                       │                │                        │
│                       │                └────────┐               │
│                       ▼                         │               │
│  ┌────────────────────────────────────┐        │               │
│  │    GRAPHQL CLIENT                  │        │               │
│  │                                    │        │               │
│  │  • createGraphQLClient()          │        │               │
│  │  • createAuthenticatedClient()    │◄───────┘               │
│  │                                    │                        │
│  │  Features:                         │                        │
│  │  • Auto-retry on auth errors      │                        │
│  │  • Token refresh integration      │                        │
│  │  • Request/response logging       │                        │
│  └────────────────┬───────────────────┘                        │
│                   │                                             │
│  ┌────────────────┼────────────────────────────────────────┐  │
│  │  COOKIE STORAGE│                                        │  │
│  │                ▼                                        │  │
│  │  • accessToken  (httpOnly, secure, 15min)             │  │
│  │  • refreshToken (httpOnly, secure, 7days)             │  │
│  │  • user         (readable, secure)                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────┬───────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         BACKEND API                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    GRAPHQL ENDPOINT                         │   │
│  │                 (http://localhost:4001/graphql)            │   │
│  └───────────────────────┬────────────────────────────────────┘   │
│                          │                                          │
│                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                  AUTHENTICATION RESOLVERS                   │   │
│  │                                                             │   │
│  │  Queries:                                                  │   │
│  │  • me() - Get current user                                │   │
│  │                                                             │   │
│  │  Mutations:                                                │   │
│  │  • login(input: LoginInput) → LoginResponse              │   │
│  │  • register(input: RegisterInput) → LoginResponse        │   │
│  │  • refreshToken(refreshToken: String!) → TokenPair       │   │
│  │  • changePassword(input: ChangePasswordInput) → Boolean  │   │
│  │                                                             │   │
│  └───────────────────────┬────────────────────────────────────┘   │
│                          │                                          │
│                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │              TOKEN VALIDATION & GENERATION                  │   │
│  │                                                             │   │
│  │  • Validate JWT access tokens                              │   │
│  │  • Validate refresh tokens                                 │   │
│  │  • Generate new token pairs                                │   │
│  │  • Check token expiry                                      │   │
│  │  • Verify token signatures                                 │   │
│  │                                                             │   │
│  └───────────────────────┬────────────────────────────────────┘   │
│                          │                                          │
│                          ▼                                          │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                      DATABASE                               │   │
│  │                                                             │   │
│  │  • Users table                                             │   │
│  │  • Refresh tokens table (optional)                         │   │
│  │  • Token blacklist (optional)                              │   │
│  │                                                             │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Sequence Diagram

```
User        Frontend          GraphQL Client     Token Refresh      Backend
 │              │                    │                 │               │
 │─────────────►│                    │                 │               │
 │  Click Link  │                    │                 │               │
 │              │                    │                 │               │
 │              │────────────────────►│                 │               │
 │              │  Request Data      │                 │               │
 │              │  (with token)      │                 │               │
 │              │                    │                 │               │
 │              │                    │─────────────────────────────────►│
 │              │                    │  GET /api/data                  │
 │              │                    │  Authorization: Bearer <token>  │
 │              │                    │                 │               │
 │              │                    │                 │    ┌──────────┤
 │              │                    │                 │    │ Validate │
 │              │                    │                 │    │  Token   │
 │              │                    │                 │    └──────────┤
 │              │                    │                 │               │
 │              │                    │◄─────────────────────────────────│
 │              │                    │  ❌ "expired token"             │
 │              │                    │                 │               │
 │              │                    │─────────────────►│               │
 │              │                    │  Detect Auth Error              │
 │              │                    │                 │               │
 │              │                    │                 │───────────────►│
 │              │                    │                 │  refreshToken │
 │              │                    │                 │  mutation     │
 │              │                    │                 │               │
 │              │                    │                 │    ┌──────────┤
 │              │                    │                 │    │ Validate │
 │              │                    │                 │    │ Refresh  │
 │              │                    │                 │    │  Token   │
 │              │                    │                 │    └──────────┤
 │              │                    │                 │               │
 │              │                    │                 │◄───────────────│
 │              │                    │                 │  ✅ New Tokens│
 │              │                    │                 │               │
 │              │                    │◄─────────────────│               │
 │              │                    │  Update cookies │               │
 │              │                    │                 │               │
 │              │                    │─────────────────────────────────►│
 │              │                    │  RETRY: GET /api/data           │
 │              │                    │  Authorization: Bearer <new>    │
 │              │                    │                 │               │
 │              │                    │                 │    ┌──────────┤
 │              │                    │                 │    │ Validate │
 │              │                    │                 │    │New Token │
 │              │                    │                 │    └──────────┤
 │              │                    │                 │               │
 │              │                    │◄─────────────────────────────────│
 │              │                    │  ✅ Data                        │
 │              │◄────────────────────│                 │               │
 │              │  Return data       │                 │               │
 │◄─────────────│                    │                 │               │
 │  Show data   │                    │                 │               │
 │  (no error!) │                    │                 │               │
```

---

## 🎯 Key Points

1. **Transparent to User**: Token refresh happens automatically in the background
2. **Race Condition Safe**: Multiple concurrent requests share one refresh
3. **Secure**: Tokens stored in HTTP-only cookies
4. **Resilient**: Handles various error scenarios gracefully
5. **Performant**: Minimal overhead, only refreshes when needed

---

**Last Updated**: 2025-01-27
**Version**: 1.0.0
