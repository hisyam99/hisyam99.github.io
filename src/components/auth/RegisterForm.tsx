import { component$, useStore, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { useAuth } from '~/contexts/auth';
import type { RegisterInput, UserRole } from '~/types/graphql';

export const RegisterForm = component$(() => {
  const auth = useAuth();
  const nav = useNavigate();
  
  const formState = useStore<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    isSubmitting: boolean;
    error: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'VIEWER' as UserRole,
    isSubmitting: false,
    error: '',
  });

  // Create serializable register function
  const doRegister = $(async (input: RegisterInput) => {
    const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              user {
                id
                name
                email
                role
                isActive
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
        `,
        variables: { input }
      })
    });

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'Registration failed');
    }

    if (!result.data?.register) {
      throw new Error('Registration failed');
    }

    const { user, tokens } = result.data.register;
    
    // Store tokens
    const expiresAt = Date.now() + tokens.expiresIn * 1000;
    localStorage.setItem('auth_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
    localStorage.setItem('token_expires_at', expiresAt.toString());
    
    return { user, tokens };
  });

  const handleSubmit = $(async (event: SubmitEvent) => {
    event.preventDefault();
    
    if (!formState.name || !formState.email || !formState.password) {
      formState.error = 'Please fill in all fields';
      return;
    }

    if (formState.password !== formState.confirmPassword) {
      formState.error = 'Passwords do not match';
      return;
    }

    if (formState.password.length < 6) {
      formState.error = 'Password must be at least 6 characters';
      return;
    }

    formState.isSubmitting = true;
    formState.error = '';

    try {
      const input: RegisterInput = {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        role: formState.role,
      };

      // Use our serializable register function
      await doRegister(input);
      
      // Redirect with full page reload to reinitialize auth state
      window.location.href = '/dashboard';
      
    } catch (error) {
      formState.error = error instanceof Error ? error.message : 'Registration failed';
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
          <h2 class="card-title justify-center text-2xl font-bold mb-6">Sign Up</h2>
          
          <form onSubmit$={handleSubmit} preventdefault:submit class="space-y-4">
            {formState.error && (
              <div class="alert alert-error">
                <span>{formState.error}</span>
              </div>
            )}

            <div class="form-control">
              <label class="label">
                <span class="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                class="input input-bordered w-full"
                value={formState.name}
                onInput$={(event) => {
                  formState.name = (event.target as HTMLInputElement).value;
                }}
                required
                disabled={formState.isSubmitting}
              />
            </div>

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
                minLength={6}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                class="input input-bordered w-full"
                value={formState.confirmPassword}
                onInput$={(event) => {
                  formState.confirmPassword = (event.target as HTMLInputElement).value;
                }}
                required
                disabled={formState.isSubmitting}
                minLength={6}
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Role</span>
              </label>
              <select
                class="select select-bordered w-full"
                value={formState.role}
                onChange$={(event) => {
                  formState.role = (event.target as HTMLSelectElement).value as UserRole;
                }}
                disabled={formState.isSubmitting}
              >
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div class="form-control mt-6">
              <button
                type="submit"
                class={`btn btn-primary ${formState.isSubmitting ? 'loading' : ''}`}
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? 'Creating account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div class="divider">OR</div>
          
          <div class="text-center">
            <span class="text-sm">Already have an account? </span>
            <a href="/login" class="link link-primary">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});