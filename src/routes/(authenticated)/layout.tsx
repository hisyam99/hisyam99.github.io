import { component$, Slot, $ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { useAuth } from "~/contexts/auth";

// Server-side handler - let client handle auth
export const onGet: RequestHandler = async ({ next }) => {
  // Don't redirect on server-side, let client-side handle authentication
  await next();
};

export default component$(() => {
  const auth = useAuth();

  // Show loading state while auth is initializing or loading
  if (auth.isLoading) {
    return (
      <div class="min-h-screen bg-base-200 flex items-center justify-center">
        <div class="text-center">
          <div class="loading loading-spinner loading-lg"></div>
          <p class="mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login prompt with redirect button
  if (!auth.isAuthenticated) {
    return (
      <div class="min-h-screen bg-base-200 flex items-center justify-center">
        <div class="alert alert-warning max-w-md">
          <div class="flex flex-col items-center space-y-4">
            <span>You need to log in to access this page.</span>
            <button 
              class="btn btn-primary" 
              onClick$={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/login';
                }
              }}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-base-200">
      {/* Navbar */}
      <div class="navbar bg-base-100 shadow-lg">
        <div class="navbar-start">
          <div class="dropdown">
            <div tabIndex={0} role="button" class="btn btn-ghost lg:hidden">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/admin">Admin Overview</a></li>
              <li><a href="/admin/blog">Blog Management</a></li>
              <li><a href="/admin/projects">Projects</a></li>
              <li><a href="/blog">View Blog</a></li>
            </ul>
          </div>
          <div class="navbar-center">
            <a href="/dashboard" class="btn btn-ghost text-xl">
              Admin Panel
            </a>
          </div>
        </div>
        <div class="navbar-center hidden lg:flex">
          <div class="navbar-center">
            <ul class="menu menu-horizontal px-1">
              <li><a href="/dashboard">Dashboard</a></li>
              <li>
                <details>
                  <summary>Admin</summary>
                  <ul class="p-2 bg-base-100 rounded-t-none">
                    <li><a href="/admin">Overview</a></li>
                    <li><a href="/admin/blog">Blog Management</a></li>
                    <li><a href="/admin/projects">Projects</a></li>
                  </ul>
                </details>
              </li>
              <li><a href="/blog">View Blog</a></li>
            </ul>
          </div>
        </div>
        <div class="navbar-end">
          <div class="dropdown dropdown-end">
            <div tabIndex={0} role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img alt="Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" width="40" height="40" />
              </div>
            </div>
            <ul tabIndex={0} class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href="/dashboard/profile">Profile</a></li>
              <li><a href="/dashboard/settings">Settings</a></li>
              <li><a href="#" onClick$={$(() => {
                if (typeof window !== 'undefined') {
                  try {
                    // Clear auth state and redirect
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('token_expires_at');
                    window.location.href = '/login';
                  } catch (error) {
                    console.error('Logout failed:', error);
                    window.location.href = '/login';
                  }
                }
              })}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main class="min-h-screen">
        <Slot />
      </main>

      {/* Footer */}
      <footer class="footer p-10 bg-base-300 text-base-content">
        <div>
          <span class="footer-title">Admin Panel</span>
          <a class="link link-hover" href="/admin">Overview</a>
          <a class="link link-hover" href="/admin/blog">Blog Management</a>
          <a class="link link-hover" href="/admin/projects">Projects</a>
        </div>
        <div>
          <span class="footer-title">Account</span>
          <a class="link link-hover" href="/dashboard/profile">Profile</a>
          <a class="link link-hover" href="/dashboard/settings">Settings</a>
        </div>
        <div>
          <span class="footer-title">Public</span>
          <a class="link link-hover" href="/">Home</a>
          <a class="link link-hover" href="/blog">Blog</a>
          <a class="link link-hover" href="/projects">Projects</a>
        </div>
      </footer>
    </div>
  );
});