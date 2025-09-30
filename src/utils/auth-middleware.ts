import { server$ } from "@builder.io/qwik-city";
import { getCurrentUser, type User } from "~/services/auth";

export interface AuthResult {
  authenticated: boolean;
  user: User | null;
  redirectTo?: string;
}

// Server function to check authentication
export const checkAuth = server$(async function(): Promise<AuthResult> {
  const accessToken = this.cookie.get('accessToken')?.value;
  const refreshToken = this.cookie.get('refreshToken')?.value;
  
  if (!accessToken) {
    return {
      authenticated: false,
      user: null,
      redirectTo: '/auth/login'
    };
  }
  
  try {
    // Verify token and get user data
    const user = await getCurrentUser(accessToken);
    
    if (user) {
      return {
        authenticated: true,
        user: user
      };
    } else {
      // Token invalid, try refresh if available
      if (refreshToken) {
        // TODO: Implement refresh token logic
        // For now, just redirect to login
      }
      
      // Clear invalid tokens
      this.cookie.delete('accessToken', { path: '/' });
      this.cookie.delete('refreshToken', { path: '/' });
      this.cookie.delete('user', { path: '/' });
      
      return {
        authenticated: false,
        user: null,
        redirectTo: '/auth/login'
      };
    }
  } catch (error) {
    console.error('Auth check error:', error);
    
    // Clear cookies on error
    this.cookie.delete('accessToken', { path: '/' });
    this.cookie.delete('refreshToken', { path: '/' });
    this.cookie.delete('user', { path: '/' });
    
    return {
      authenticated: false,
      user: null,
      redirectTo: '/auth/login'
    };
  }
});

// Server function for protected routes (use in routeLoader$)
export const requireAuth = server$(async function() {
  const authResult = await checkAuth();
  
  if (!authResult.authenticated) {
    throw new Error('Authentication required');
  }
  
  return authResult;
});

// Check admin role
export const requireAdmin = server$(async function() {
  const authResult = await checkAuth();
  
  if (!authResult.authenticated) {
    throw new Error('Authentication required');
  }
  
  if (authResult.user?.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  
  return authResult;
});

// Check if user is guest (not authenticated)
export const requireGuest = server$(async function() {
  const authResult = await checkAuth();
  
  return {
    authenticated: authResult.authenticated,
    user: authResult.user,
    shouldRedirect: authResult.authenticated
  };
});