import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { requireAuth } from "~/utils/auth-middleware";
import { Breadcrumbs, useBreadcrumbs } from "~/components/Breadcrumbs";

export const useAuthUser = routeLoader$(async ({ redirect }) => {
  try {
    const authResult = await requireAuth();
    return authResult;
  } catch {
    // Redirect to login if not authenticated
    throw redirect(302, "/auth/login");
  }
});

export default component$(() => {
  const authUser = useAuthUser();
  const breadcrumbs = useBreadcrumbs();

  return (
    <div class="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <div class="mb-6">
          <Breadcrumbs items={breadcrumbs} size="sm" />
        </div>

        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-base-content mb-2">
            Profile Settings
          </h1>
          <p class="text-base-content/70">
            Manage your account settings and preferences
          </p>
        </div>

        {authUser.value.user && (
          <div class="space-y-6">
            {/* User Info Card */}
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <div class="flex items-center space-x-4 mb-6">
                  <div class="avatar">
                    <div class="w-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <span class="text-white text-xl font-bold">
                        {authUser.value.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-base-content">
                      {authUser.value.user.name}
                    </h2>
                    <p class="text-base-content/70">
                      {authUser.value.user.email}
                    </p>
                    <div class="badge badge-primary mt-1">
                      {authUser.value.user.role}
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="stat">
                    <div class="stat-title">Account Status</div>
                    <div class="stat-value text-lg">
                      {authUser.value.user.isActive ? (
                        <span class="text-success">Active</span>
                      ) : (
                        <span class="text-error">Inactive</span>
                      )}
                    </div>
                  </div>
                  <div class="stat">
                    <div class="stat-title">Member Since</div>
                    <div class="stat-value text-lg">
                      {new Date(
                        authUser.value.user.createdAt,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div class="stat">
                    <div class="stat-title">Last Login</div>
                    <div class="stat-value text-lg">
                      {authUser.value.user.lastLogin
                        ? new Date(
                            authUser.value.user.lastLogin,
                          ).toLocaleDateString()
                        : "Never"}
                    </div>
                  </div>
                  <div class="stat">
                    <div class="stat-title">Last Updated</div>
                    <div class="stat-value text-lg">
                      {new Date(
                        authUser.value.user.updatedAt,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Actions */}
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h3 class="card-title mb-4">Account Actions</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button class="btn btn-outline btn-primary">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Profile
                  </button>

                  <button class="btn btn-outline btn-secondary">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Change Password
                  </button>

                  <button class="btn btn-outline btn-accent">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Preferences
                  </button>

                  <button class="btn btn-outline btn-error hover:btn-error">
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="stat bg-base-100 rounded-box shadow-xl">
                <div class="stat-figure text-primary">
                  <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Verified</div>
                <div class="stat-value text-primary">
                  {authUser.value.user.isActive ? "✓" : "✗"}
                </div>
                <div class="stat-desc">Account verification</div>
              </div>

              <div class="stat bg-base-100 rounded-box shadow-xl">
                <div class="stat-figure text-secondary">
                  <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Active Days</div>
                <div class="stat-value text-secondary">
                  {Math.floor(
                    (Date.now() -
                      new Date(authUser.value.user.createdAt).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </div>
                <div class="stat-desc">Since joining</div>
              </div>

              <div class="stat bg-base-100 rounded-box shadow-xl">
                <div class="stat-figure text-accent">
                  <svg
                    class="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="stat-title">Role Level</div>
                <div class="stat-value text-accent">
                  {authUser.value.user.role === "ADMIN"
                    ? "Admin"
                    : authUser.value.user.role === "EDITOR"
                      ? "Editor"
                      : authUser.value.user.role === "VIEWER"
                        ? "Viewer"
                        : "Guest"}
                </div>
                <div class="stat-desc">Access level</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
