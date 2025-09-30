import { $, useContext, createContextId, component$, Slot, useStore, useVisibleTask$, useContextProvider } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { server$ } from "@builder.io/qwik-city";
import { getCurrentUser, type User } from "~/services/auth";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const AuthContext = createContextId<AuthContextType>('auth-context');

// Server function untuk logout
export const logoutServer = server$(async function() {
  // Clear server-side cookies
  this.cookie.delete('accessToken', { path: '/' });
  this.cookie.delete('refreshToken', { path: '/' });
  this.cookie.delete('user', { path: '/' });
  
  return { success: true };
});

// Server function untuk refresh auth state
export const refreshAuthServer = server$(async function() {
  const accessToken = this.cookie.get('accessToken')?.value;
  const userCookie = this.cookie.get('user')?.value;
  
  if (!accessToken || !userCookie) {
    return { authenticated: false, user: null };
  }
  
  try {
    // Verify token and get fresh user data
    const userResult = await getCurrentUser(accessToken);
    
    if (userResult) {
      return {
        authenticated: true,
        user: userResult
      };
    } else {
      // Token invalid, clear cookies
      this.cookie.delete('accessToken', { path: '/' });
      this.cookie.delete('refreshToken', { path: '/' });
      this.cookie.delete('user', { path: '/' });
      
      return { authenticated: false, user: null };
    }
  } catch (error) {
    console.error('Auth refresh error:', error);
    return { authenticated: false, user: null };
  }
});

export const AuthProvider = component$(() => {
  const authState = useStore<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  const nav = useNavigate();

  // Client-side auth state initialization
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      const result = await refreshAuthServer();
      authState.isAuthenticated = result.authenticated;
      authState.user = result.user;
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      authState.isAuthenticated = false;
      authState.user = null;
    } finally {
      authState.isLoading = false;
    }
  });

  const login = $((accessToken: string, refreshToken: string, user: User) => {
    // Store tokens in localStorage for client-side access
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    authState.isAuthenticated = true;
    authState.user = user;
  });

  const logout = $(async () => {
    try {
      // Clear server-side cookies
      await logoutServer();
      
      // Clear client-side storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
      
      // Update state
      authState.isAuthenticated = false;
      authState.user = null;
      
      // Redirect to home
      await nav('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  });

  const refreshAuth = $(async () => {
    try {
      const result = await refreshAuthServer();
      authState.isAuthenticated = result.authenticated;
      authState.user = result.user;
      
      if (!result.authenticated && typeof window !== 'undefined') {
        // Clear client-side storage if not authenticated
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth refresh error:', error);
      authState.isAuthenticated = false;
      authState.user = null;
    }
  });

  const updateUser = $((user: User) => {
    authState.user = user;
    
    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  });

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    refreshAuth,
    updateUser
  };

  useContextProvider(AuthContext, contextValue);

  return <Slot />;
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};