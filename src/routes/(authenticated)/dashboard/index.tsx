import { component$ } from '@builder.io/qwik';
import type { DocumentHead, StaticGenerateHandler } from '@builder.io/qwik-city';
import { useAuth } from '~/contexts/auth';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Skip static generation for authenticated routes to avoid SSR issues
  return {
    params: []
  };
};

export default component$(() => {
  const auth = useAuth();

  // Show loading state
  if (auth.isLoading) {
    return <div class="flex justify-center items-center min-h-32">
      <div class="loading loading-spinner loading-lg"></div>
    </div>;
  }

  // Check authentication
  if (!auth.isAuthenticated) {
    return <div class="alert alert-warning">
      <span>Please login to access this page.</span>
    </div>;
  }

  return <DashboardContent />;
});

const DashboardContent = component$(() => {
  const auth = useAuth();

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Dashboard</h1>
        <p class="text-base-content/70">
          Welcome back, {auth.user?.name || 'User'}!
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Profile Information</h2>
            <div class="space-y-2">
              <p><strong>Name:</strong> {auth.user?.name}</p>
              <p><strong>Email:</strong> {auth.user?.email}</p>
              <p><strong>Role:</strong> <span class="badge badge-primary">{auth.user?.role}</span></p>
              <p><strong>Status:</strong> 
                <span class={`badge ${auth.user?.isActive ? 'badge-success' : 'badge-error'}`}>
                  {auth.user?.isActive ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Quick Actions</h2>
            <div class="card-actions justify-start flex-col space-y-2">
              <a href="/blog" class="btn btn-outline btn-sm w-full">
                View Blogs
              </a>
              <a href="/projects" class="btn btn-outline btn-sm w-full">
                View Projects
              </a>
              <a href="/resume" class="btn btn-outline btn-sm w-full">
                View Resume
              </a>
            </div>
          </div>
        </div>

        {/* Admin Actions Card - Only for Admin users */}
        {auth.user?.role === 'ADMIN' && (
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Admin Actions</h2>
              <div class="card-actions justify-start flex-col space-y-2">
                <a href="/admin/users" class="btn btn-primary btn-sm w-full">
                  Manage Users
                </a>
                <a href="/admin/blogs" class="btn btn-primary btn-sm w-full">
                  Manage Blogs
                </a>
                <a href="/admin/projects" class="btn btn-primary btn-sm w-full">
                  Manage Projects
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Editor Actions Card - For Editor and Admin users */}
        {(auth.user?.role === 'EDITOR' || auth.user?.role === 'ADMIN') && (
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Content Actions</h2>
              <div class="card-actions justify-start flex-col space-y-2">
                <a href="/blog/create" class="btn btn-secondary btn-sm w-full">
                  Create Blog
                </a>
                <a href="/projects/create" class="btn btn-secondary btn-sm w-full">
                  Create Project
                </a>
                <a href="/resume/create" class="btn btn-secondary btn-sm w-full">
                  Add Resume Content
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity Section */}
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="text-center py-8 text-base-content/50">
              <p>Recent activity will be displayed here</p>
              <p class="text-sm mt-2">This feature is coming soon!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Dashboard - Portfolio',
  meta: [
    {
      name: 'description',
      content: 'User dashboard',
    },
  ],
};