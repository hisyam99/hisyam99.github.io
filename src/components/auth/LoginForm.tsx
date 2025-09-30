import { component$, useStore, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useAuth } from '~/contexts/auth';
import type { LoginInput } from '~/types/graphql';

export const LoginForm = component$(() => {
  const auth = useAuth();
  const nav = useNavigate();
  
  const formState = useStore<{
    email: string;
    password: string;
    isSubmitting: boolean;
    error: string;
    success: boolean;
  }>({
    email: '',
    password: '',
    isSubmitting: false,
    error: '',
    success: false,
  });

  // Create serializable login function
  const doLogin = $(async (input: LoginInput) => {
    const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              user { id name email role }
              tokens { accessToken refreshToken expiresIn }
            }
          }
        `,
        variables: { input }
      })
    });

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'Login failed');
    }

    if (!result.data?.login) {
      throw new Error('Invalid credentials');
    }

    const { user, tokens } = result.data.login;
    
    // Store tokens
    const expiresAt = Date.now() + tokens.expiresIn * 1000;
    localStorage.setItem('auth_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
    localStorage.setItem('token_expires_at', expiresAt.toString());
    
    return { user, tokens };
  });

  const handleSubmit = $(async (event: SubmitEvent) => {
    event.preventDefault();
    
    if (!formState.email || !formState.password) {
      formState.error = 'Please fill in all fields';
      return;
    }

    formState.isSubmitting = true;
    formState.error = '';
    formState.success = false;

    try {
      const input: LoginInput = {
        email: formState.email,
        password: formState.password,
      };

      // Use our serializable login function
      await doLogin(input);
      
      // Show success message briefly before redirect
      formState.success = true;
      
      // Simple approach: use window.location for full page reload
      // This ensures AuthProvider reinitializes with new tokens
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 800);
      
    } catch (error) {
      formState.error = error instanceof Error ? error.message : 'Login failed';
    } finally {
      formState.isSubmitting = false;
    }
  });

  // If already authenticated, redirect
  if (auth.isAuthenticated) {
    nav('/dashboard');
    return null;
  }

  return (
    <div class="min-h-screen flex items-center justify-center bg-base-200">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Login</h2>
          
          <form onSubmit$={handleSubmit} preventdefault:submit class="space-y-4">
            {formState.error && (
              <div class="alert alert-error">
                <span>{formState.error}</span>
              </div>
            )}
            
            {formState.success && (
              <div class="alert alert-success">
                <span>Login successful! Redirecting...</span>
              </div>
            )}

            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                class="input input-bordered w-full"
                value={formState.email}
                onInput$={(event) => {
                  formState.email = (event.target as HTMLInputElement).value;
                }}
                required
                disabled={formState.isSubmitting}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                class="input input-bordered w-full"
                value={formState.password}
                onInput$={(event) => {
                  formState.password = (event.target as HTMLInputElement).value;
                }}
                required
                disabled={formState.isSubmitting}
              />
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class={`btn btn-primary ${formState.isSubmitting ? 'loading' : ''}`}
                disabled={formState.isSubmitting || formState.success}
              >
                {formState.success ? 'Success!' : formState.isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div class="divider">OR</div>
          
          <div class="text-center">
            <span class="text-sm">Don't have an account? </span>
            <a href="/register" class="link link-primary">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});