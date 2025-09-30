import { createContextId, useContext, useContextProvider, component$, Slot } from '@builder.io/qwik';
import { useStore, $, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import type { 
  User, 
  AuthContext, 
  LoginInput, 
  RegisterInput,
  TokenPair 
} from '~/types/graphql';
import { 
  LOGIN_MUTATION, 
  REGISTER_MUTATION, 
  REFRESH_TOKEN_MUTATION
} from '~/graphql/mutations';
import { ME_QUERY } from '~/graphql/queries';
import { createMutationExecutor, createQueryExecutor } from '~/hooks/useGraphQL';

// Auth Context
export const AuthContextId = createContextId<AuthContext>('auth-context');

// Auth Provider Component
export const useAuthProvider = () => {
  const authState = useStore<{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
  }>({
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start with true to show loading state
    isInitialized: false, // Start with false until auth is checked
  });

  // GraphQL executors
  const executeLogin = createMutationExecutor<{ login: { user: User; tokens: TokenPair } }, { input: LoginInput }>(LOGIN_MUTATION);
  const executeRegister = createMutationExecutor<{ register: { user: User; tokens: TokenPair } }, { input: RegisterInput }>(REGISTER_MUTATION);
  const executeRefreshToken = createMutationExecutor<{ refreshToken: TokenPair }, { refreshToken: string }>(REFRESH_TOKEN_MUTATION);
  const executeMe = createQueryExecutor<{ me: User }>(ME_QUERY);

  // Token management utilities
  const setTokens = $((tokens: TokenPair) => {
    if (isServer || typeof window === 'undefined') return;
    
    try {
      const expiresAt = Date.now() + tokens.expiresIn * 1000;
      
      localStorage.setItem('auth_token', tokens.accessToken);
      localStorage.setItem('refresh_token', tokens.refreshToken);
      localStorage.setItem('token_expires_at', expiresAt.toString());
    } catch (error) {
      console.error('Failed to set tokens:', error);
    }
  });

  const clearTokens = $(() => {
    if (isServer || typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_expires_at');
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  });

  const getStoredToken = $(() => {
    if (isServer || typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('auth_token');
    } catch {
      return null;
    }
  });

  const getStoredRefreshToken = $(() => {
    if (isServer || typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('refresh_token');
    } catch {
      return null;
    }
  });

  const isTokenExpired = $(() => {
    if (isServer || typeof window === 'undefined') return false;
    
    try {
      const expiresAtStr = localStorage.getItem('token_expires_at');
      if (!expiresAtStr) return true;
      
      const expiresAt = parseInt(expiresAtStr, 10);
      return Date.now() >= expiresAt - 60000; // 1 minute buffer
    } catch {
      return true;
    }
  });

  // Initialize auth state from localStorage
  const initializeAuth = $(async () => {
    if (isServer) return;
    
    console.log('🔐 Starting auth initialization...');
    authState.isLoading = true;
    
    try {
      const token = await getStoredToken();
      const refreshToken = await getStoredRefreshToken();
      
      console.log('🔍 Tokens found:', { hasToken: !!token, hasRefreshToken: !!refreshToken });
      
      if (!token || !refreshToken) {
        console.log('❌ No tokens found, user not authenticated');
        authState.isLoading = false;
        authState.isInitialized = true;
        return;
      }

      // If token is expired, try to refresh
      if (await isTokenExpired()) {
        console.log('⏰ Token expired, trying to refresh...');
        try {
          const result = await executeRefreshToken({ refreshToken });
          if (result?.refreshToken) {
            console.log('✅ Token refreshed successfully');
            await setTokens(result.refreshToken);
          } else {
            console.log('❌ Token refresh failed, clearing tokens');
            await clearTokens();
            authState.isLoading = false;
            authState.isInitialized = true;
            return;
          }
        } catch (error) {
          console.error('❌ Token refresh failed:', error);
          await clearTokens();
          authState.isLoading = false;
          authState.isInitialized = true;
          return;
        }
      }

      // Get current user info
      console.log('👤 Fetching user info...');
      try {
        const result = await executeMe();
        console.log('👤 User query result:', result);
        if (result?.me) {
          console.log('✅ User authenticated:', result.me.name);
          authState.user = result.me;
          authState.isAuthenticated = true;
        } else {
          console.log('❌ No user data returned, clearing tokens');
          await clearTokens();
        }
      } catch (error) {
        console.error('❌ Failed to get current user:', error);
        await clearTokens();
      }
    } catch (error) {
      console.error('❌ Auth initialization failed:', error);
      await clearTokens();
    } finally {
      authState.isLoading = false;
      authState.isInitialized = true;
      console.log('🏁 Auth initialization completed:', { 
        isAuthenticated: authState.isAuthenticated, 
        user: authState.user?.name 
      });
    }
  });

  // Login function
  const login = $(async (input: LoginInput) => {
    authState.isLoading = true;
    
    try {
      const result = await executeLogin({ input });
      
      if (result?.login) {
        const { user, tokens } = result.login;
        
        await setTokens(tokens);
        authState.user = user;
        authState.isAuthenticated = true;
        
        return { success: true, user };
      } else {
        throw new Error('Login failed: No data returned');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      console.error('Login error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      authState.isLoading = false;
    }
  });

  // Register function
  const register = $(async (input: RegisterInput) => {
    authState.isLoading = true;
    
    try {
      const result = await executeRegister({ input });
      
      if (result?.register) {
        const { user, tokens } = result.register;
        
        await setTokens(tokens);
        authState.user = user;
        authState.isAuthenticated = true;
        
        return { success: true, user };
      } else {
        throw new Error('Registration failed: No data returned');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      console.error('Registration error:', errorMessage);
      throw new Error(errorMessage);
    } finally {
      authState.isLoading = false;
    }
  });

  // Logout function
  const logout = $(async () => {
    await clearTokens();
    authState.user = null;
    authState.isAuthenticated = false;
    
    // Redirect to home page
    if (!isServer) {
      window.location.href = '/';
    }
  });

  // Refresh token function
  const refreshToken = $(async () => {
    if (isServer) return;
    
    const storedRefreshToken = await getStoredRefreshToken();
    if (!storedRefreshToken) {
      await logout();
      return;
    }

    try {
      const result = await executeRefreshToken({ refreshToken: storedRefreshToken });
      
      if (result?.refreshToken) {
        await setTokens(result.refreshToken);
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
    }
  });

  // Check if user has specific role
  const hasRole = (requiredRole: string) => {
    return authState.user?.role === requiredRole;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles: string[]) => {
    return authState.user ? roles.includes(authState.user.role) : false;
  };

  // Initialize auth on mount - client-side only
  useTask$(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      console.log('🔐 Auth context initializing...');
      // Run auth initialization immediately
      initializeAuth().catch(error => {
        console.error('❌ Auth initialization failed:', error);
      });

      // Listen for storage changes (in case token is set from another tab/window)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'auth_token' || e.key === 'refresh_token') {
          console.log('🔄 Storage changed, reinitializing auth...');
          // Token changed, reinitialize auth
          setTimeout(() => {
            initializeAuth().catch(console.error);  
          }, 100);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      
      // Cleanup
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  });

  // Force reinitialize auth state
  const reinitialize = $(async () => {
    if (typeof window !== 'undefined') {
      await initializeAuth();
    }
  });

  const contextValue: AuthContext = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    register,
    logout,
    refreshToken,
    reinitialize,
  };

  return {
    authState,
    contextValue,
    hasRole,
    hasAnyRole,
    isInitialized: authState.isInitialized,
  };
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContextId);
  if (!context) {
    // Return default context instead of throwing error
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => ({ success: false, error: 'Auth not available' }),
      register: async () => ({ success: false, error: 'Auth not available' }),
      logout: async () => {},
      refreshToken: async () => {},
      reinitialize: async () => {},
    };
  }
  return context;
};

// Auth provider wrapper component
export const AuthProvider = component$(() => {
  const { contextValue } = useAuthProvider();
  
  useContextProvider(AuthContextId, contextValue);
  
  // Always render children immediately
  return <Slot />;
});