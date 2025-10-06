import { component$ } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { getAllBlogs } from "~/services/admin-blog";
import { checkAuth } from "~/utils/auth-middleware";

export const useDashboardData = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const blogsResult = await getAllBlogs(token, { pageSize: 5 });

    const blogs = blogsResult.data;

    // Calculate statistics
    const stats = {
      totalBlogs: blogsResult.pagination.total,
      publishedBlogs: blogs.filter(
        (blog) => blog.status === "PUBLISHED" || blog.status === "published",
      ).length,
      draftBlogs: blogs.filter(
        (blog) => blog.status === "DRAFT" || blog.status === "draft",
      ).length,
      archivedBlogs: 0,
    };

    return {
      user: auth.user,
      stats,
      recentBlogs: blogs,
      error: null,
    };
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return {
      user: null,
      stats: {
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        archivedBlogs: 0,
      },
      recentBlogs: [],
      error: "Failed to load dashboard data",
    };
  }
});

export default component$(() => {
  const dashboardData = useDashboardData();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const data = dashboardData.value;

  return (
    <div class="space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content">
            Welcome back, {data.user?.name || "Admin"}!
          </h1>
          <p class="text-sm sm:text-base text-base-content/70 mt-1 sm:mt-2">
            Here's what's happening with your blog today.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          class="btn btn-primary gap-2 w-full sm:w-auto"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Blog
        </Link>
      </div>

      {/* Error Alert */}
      {data.error && (
        <div class="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{data.error}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {/* Total Blogs */}
        <div class="stat bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="stat-figure text-primary">
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <div class="stat-title text-sm sm:text-base">Total Blogs</div>
          <div class="stat-value text-primary text-3xl sm:text-4xl">
            {data.stats.totalBlogs}
          </div>
          <div class="stat-desc text-xs sm:text-sm">All blog posts</div>
        </div>

        {/* Published */}
        <div class="stat bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="stat-figure text-success">
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="stat-title text-sm sm:text-base">Published</div>
          <div class="stat-value text-success text-3xl sm:text-4xl">
            {data.stats.publishedBlogs}
          </div>
          <div class="stat-desc text-xs sm:text-sm">Live on website</div>
        </div>

        {/* Drafts */}
        <div class="stat bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="stat-figure text-warning">
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12"
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
          </div>
          <div class="stat-title text-sm sm:text-base">Drafts</div>
          <div class="stat-value text-warning text-3xl sm:text-4xl">
            {data.stats.draftBlogs}
          </div>
          <div class="stat-desc text-xs sm:text-sm">Work in progress</div>
        </div>

        {/* Archived */}
        <div class="stat bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="stat-figure text-error">
            <svg
              class="w-10 h-10 sm:w-12 sm:h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="stat-title text-sm sm:text-base">Archived</div>
          <div class="stat-value text-error text-3xl sm:text-4xl">
            {data.stats.archivedBlogs}
          </div>
          <div class="stat-desc text-xs sm:text-sm">Not visible</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Blogs - Takes 2 columns on large screens */}
        <div class="lg:col-span-2">
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body p-4 sm:p-6">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
                <h2 class="card-title text-lg sm:text-xl lg:text-2xl">
                  Recent Blogs
                </h2>
                <Link
                  href="/admin/blogs"
                  class="btn btn-primary btn-sm sm:btn-md gap-2"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  View All
                </Link>
              </div>

              {data.recentBlogs.length === 0 ? (
                <div class="text-center py-8 sm:py-12">
                  <div class="flex justify-center mb-4">
                    <svg
                      class="w-16 h-16 sm:w-20 sm:h-20 text-base-content/30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p class="text-base-content/60 mb-4 text-sm sm:text-base">
                    No blogs found
                  </p>
                  <Link href="/admin/blogs/new" class="btn btn-primary gap-2">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create First Blog
                  </Link>
                </div>
              ) : (
                <div class="space-y-3 sm:space-y-4">
                  {data.recentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      class="card bg-base-100 shadow hover:shadow-md transition-shadow"
                    >
                      <div class="card-body p-3 sm:p-4">
                        <div class="flex flex-col sm:flex-row sm:items-start gap-3">
                          <div class="flex-1 min-w-0">
                            <h3 class="font-semibold text-base sm:text-lg truncate">
                              {blog.title}
                            </h3>
                            <div class="flex flex-wrap items-center gap-2 mt-2">
                              <span
                                class={`badge badge-sm ${
                                  blog.status === "PUBLISHED" ||
                                  blog.status === "published"
                                    ? "badge-success"
                                    : blog.status === "DRAFT" ||
                                        blog.status === "draft"
                                      ? "badge-warning"
                                      : "badge-error"
                                }`}
                              >
                                {blog.status}
                              </span>
                              <span class="text-xs sm:text-sm text-base-content/60">
                                {formatDate(blog.updatedAt)}
                              </span>
                            </div>
                          </div>
                          <div class="flex gap-2 flex-shrink-0">
                            <Link
                              href={`/admin/blogs/${blog.id}/edit`}
                              class="btn btn-sm btn-primary gap-1"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              <span class="hidden sm:inline">Edit</span>
                            </Link>
                            <Link
                              href={`/blog/${blog.slug}`}
                              class="btn btn-sm btn-ghost gap-1"
                            >
                              <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span class="hidden sm:inline">View</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Quick Actions & Info */}
        <div class="space-y-6">
          {/* Quick Actions */}
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body p-4 sm:p-6">
              <h2 class="card-title text-lg sm:text-xl mb-4">Quick Actions</h2>

              <div class="space-y-2 sm:space-y-3">
                <Link
                  href="/admin/blogs/new"
                  class="btn btn-primary w-full justify-start gap-3"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Create New Blog</span>
                </Link>

                <Link
                  href="/admin/blogs"
                  class="btn btn-outline w-full justify-start gap-3"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>Manage Blogs</span>
                </Link>

                <Link
                  href="/admin/categories"
                  class="btn btn-outline w-full justify-start gap-3"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span>Manage Categories</span>
                </Link>

                <Link
                  href="/admin/projects"
                  class="btn btn-outline w-full justify-start gap-3"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>Manage Projects</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div class="card bg-base-200 shadow-xl">
            <div class="card-body p-4 sm:p-6">
              <h2 class="card-title text-lg sm:text-xl mb-4">Account Info</h2>

              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-base-100 rounded-lg">
                  <span class="text-sm font-medium">Role</span>
                  <div class="badge badge-primary badge-lg">
                    {data.user?.role}
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 bg-base-100 rounded-lg">
                  <span class="text-sm font-medium">Email</span>
                  <span class="text-xs sm:text-sm text-base-content/70 truncate max-w-[150px]">
                    {data.user?.email || "N/A"}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 bg-base-100 rounded-lg">
                  <span class="text-sm font-medium">Last Login</span>
                  <span class="text-xs sm:text-sm text-base-content/70">
                    {data.user?.lastLogin
                      ? formatDate(data.user.lastLogin)
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div class="divider my-2"></div>

              <Link href="/profile" class="btn btn-sm btn-outline w-full gap-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
