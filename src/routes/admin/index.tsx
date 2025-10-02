import { component$ } from "@builder.io/qwik";
import { routeLoader$, Link } from "@builder.io/qwik-city";
import { getAllBlogs } from "~/services/admin-blog";
import { getCurrentUser } from "~/services/auth";

export const useDashboardData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const [user, blogsResult] = await Promise.all([
      getCurrentUser(token),
      getAllBlogs(token, { pageSize: 5 }),
    ]);

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
      archivedBlogs: 0, // No archived status in current schema
    };

    return {
      user,
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
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold">
          Welcome back, {data.user?.name || "Admin"}!
        </h1>
        <p class="text-gray-600 mt-2">
          Here's what's happening with your blog today.
        </p>
      </div>

      {data.error && (
        <div class="alert alert-error mb-8">
          <span>{data.error}</span>
        </div>
      )}

      {/* Statistics Cards */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Total Blogs</div>
            <div class="stat-value text-primary">{data.stats.totalBlogs}</div>
            <div class="stat-desc">All blog posts</div>
          </div>
        </div>

        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Published</div>
            <div class="stat-value text-success">
              {data.stats.publishedBlogs}
            </div>
            <div class="stat-desc">Live on website</div>
          </div>
        </div>

        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Drafts</div>
            <div class="stat-value text-warning">{data.stats.draftBlogs}</div>
            <div class="stat-desc">Work in progress</div>
          </div>
        </div>

        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Archived</div>
            <div class="stat-value text-error">{data.stats.archivedBlogs}</div>
            <div class="stat-desc">Not visible</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blogs */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="flex justify-between items-center mb-4">
              <h2 class="card-title">Recent Blogs</h2>
              <Link href="/admin/blogs" class="btn btn-sm btn-primary">
                View All
              </Link>
            </div>

            {data.recentBlogs.length === 0 ? (
              <div class="text-center py-8 text-gray-500">
                <p>No blogs found</p>
                <Link href="/admin/blogs/new" class="btn btn-primary mt-4">
                  Create First Blog
                </Link>
              </div>
            ) : (
              <div class="space-y-4">
                {data.recentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    class="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div class="flex-1">
                      <h3 class="font-medium truncate">{blog.title}</h3>
                      <div class="flex items-center gap-2 mt-1">
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
                        <span class="text-sm text-gray-500">
                          {formatDate(blog.updatedAt)}
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-2">
                      <Link
                        href={`/admin/blogs/${blog.id}/edit`}
                        class="btn btn-sm btn-ghost"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/blog/${blog.slug}`}
                        class="btn btn-sm btn-ghost"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Quick Actions</h2>

            <div class="space-y-3">
              <Link
                href="/admin/blogs/new"
                class="btn btn-primary btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
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

              <Link
                href="/admin/blogs"
                class="btn btn-outline btn-block justify-start"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Manage Blogs
              </Link>
            </div>

            <div class="divider"></div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm">Account</span>
                <div class="badge badge-outline">{data.user?.role}</div>
              </div>

              <div class="flex items-center justify-between">
                <span class="text-sm">Last Login</span>
                <span class="text-sm text-gray-500">
                  {data.user?.lastLogin
                    ? formatDate(data.user.lastLogin)
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
