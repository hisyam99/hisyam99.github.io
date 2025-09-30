import { component$ } from '@builder.io/qwik';
import type { DocumentHead, StaticGenerateHandler } from '@builder.io/qwik-city';
import { useAuth } from '~/contexts/auth';

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // Skip static generation for admin routes to avoid SSR issues
  return {
    params: []
  };
};

export default component$(() => {
  const auth = useAuth();

  return (
    <div class="container mx-auto px-4 py-8">
      {/* Header */}
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p class="text-base-content/70">
          Welcome back, {auth.user?.name}! Manage your content and settings.
        </p>
      </div>

      {/* Quick Stats */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">Total Posts</div>
          <div class="stat-value text-primary">12</div>
          <div class="stat-desc">Published articles</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">Projects</div>
          <div class="stat-value text-secondary">8</div>
          <div class="stat-desc">Active projects</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">Views</div>
          <div class="stat-value">1.2K</div>
          <div class="stat-desc">This month</div>
        </div>
        <div class="stat bg-base-100 shadow rounded-lg">
          <div class="stat-title">Comments</div>
          <div class="stat-value">45</div>
          <div class="stat-desc">Pending review</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Blog Management</h2>
            <p>Create, edit, and manage your blog posts.</p>
            <div class="card-actions justify-end">
              <a href="/admin/blog" class="btn btn-primary">Manage Blog</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Projects</h2>
            <p>Showcase your work and manage project details.</p>
            <div class="card-actions justify-end">
              <a href="/admin/projects" class="btn btn-secondary">Manage Projects</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Resume</h2>
            <p>Update your resume content and categories.</p>
            <div class="card-actions justify-end">
              <a href="/admin/resume" class="btn btn-accent">Manage Resume</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Analytics</h2>
            <p>View site statistics and performance metrics.</p>
            <div class="card-actions justify-end">
              <a href="/admin/analytics" class="btn btn-outline">View Analytics</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Settings</h2>
            <p>Configure site settings and preferences.</p>
            <div class="card-actions justify-end">
              <a href="/admin/settings" class="btn btn-outline">Settings</a>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Profile</h2>
            <p>Update your profile information and password.</p>
            <div class="card-actions justify-end">
              <a href="/dashboard/profile" class="btn btn-outline">Edit Profile</a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
        <div class="bg-base-100 rounded-lg shadow-xl p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b pb-4">
              <div>
                <h3 class="font-semibold">New blog post published</h3>
                <p class="text-sm text-base-content/70">"Getting Started with Qwik Framework"</p>
              </div>
              <span class="text-sm text-base-content/60">2 hours ago</span>
            </div>
            <div class="flex items-center justify-between border-b pb-4">
              <div>
                <h3 class="font-semibold">Project updated</h3>
                <p class="text-sm text-base-content/70">E-commerce Platform</p>
              </div>
              <span class="text-sm text-base-content/60">1 day ago</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold">Profile updated</h3>
                <p class="text-sm text-base-content/70">Updated bio and contact information</p>
              </div>
              <span class="text-sm text-base-content/60">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Admin Dashboard - hisyam99",
  meta: [
    {
      name: "description",
      content: "Admin dashboard for managing blog posts, projects, and site content.",
    },
  ],
};