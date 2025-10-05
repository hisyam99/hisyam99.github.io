import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import {
  getAllBlogs,
  deleteBlog,
  bulkUpdateBlogStatus,
} from "~/services/admin-blog";
import type { Blog } from "~/services/admin-blog";

export const useBlogsData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const result = await getAllBlogs(token);
    return { blogs: result.data, error: null };
  } catch (error) {
    console.error("Failed to load blogs:", error);
    return { blogs: [], error: "Failed to load blogs" };
  }
});

export const useDeleteBlog = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    const blogId = data.id as string;
    await deleteBlog(token, blogId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
});

export const useBulkAction = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    const blogIds = JSON.parse(data.blogIds as string) as string[];
    const status = data.status as "PUBLISHED" | "DRAFT";

    await bulkUpdateBlogStatus(token, blogIds, status);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to perform bulk action:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to perform bulk action",
    };
  }
});

export default component$(() => {
  const blogsData = useBlogsData();
  const deleteAction = useDeleteBlog();
  const bulkAction = useBulkAction();

  const searchTerm = useSignal("");
  const statusFilter = useSignal("ALL");
  const selectedBlogs = useSignal<string[]>([]);
  const filteredBlogs = useSignal<Blog[]>([]);
  const viewMode = useSignal<"table" | "grid">("table");

  // Filter blogs based on search and status
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => statusFilter.value);
    track(() => blogsData.value.blogs);

    const blogs = blogsData.value.blogs;
    let filtered = blogs;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          blog.summary?.toLowerCase().includes(term) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    // Apply status filter
    if (statusFilter.value !== "ALL") {
      filtered = filtered.filter((blog) => blog.status === statusFilter.value);
    }

    filteredBlogs.value = filtered;
  });

  const handleSelectAll = $(() => {
    if (selectedBlogs.value.length === filteredBlogs.value.length) {
      selectedBlogs.value = [];
    } else {
      selectedBlogs.value = filteredBlogs.value.map((blog) => blog.id);
    }
  });

  const handleSelectBlog = $((blogId: string) => {
    if (selectedBlogs.value.includes(blogId)) {
      selectedBlogs.value = selectedBlogs.value.filter((id) => id !== blogId);
    } else {
      selectedBlogs.value = [...selectedBlogs.value, blogId];
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div class="space-y-4 lg:space-y-6">
      {/* Header */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Blog Management
          </h1>
          <p class="text-sm text-base-content/70 mt-1">
            Manage and organize your blog posts
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

      {/* Search and Filters */}
      <div class="card bg-base-200 shadow-lg">
        <div class="card-body p-4 lg:p-6">
          <div class="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div class="flex-1">
              <div class="form-control">
                <div class="input-group">
                  <span class="bg-base-300">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search blogs by title, summary, or tags..."
                    class="input input-bordered w-full"
                    value={searchTerm.value}
                    onInput$={(e) => {
                      searchTerm.value = (e.target as HTMLInputElement).value;
                    }}
                  />
                  {searchTerm.value && (
                    <button
                      class="btn btn-ghost btn-square"
                      onClick$={() => {
                        searchTerm.value = "";
                      }}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div class="flex flex-col sm:flex-row gap-3">
              <select
                class="select select-bordered w-full sm:w-auto"
                value={statusFilter.value}
                onChange$={(e) => {
                  statusFilter.value = (e.target as HTMLSelectElement).value;
                }}
              >
                <option value="ALL">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>

              {/* View Mode Toggle */}
              <div class="btn-group">
                <button
                  class={`btn btn-sm sm:btn-md ${viewMode.value === "table" ? "btn-active" : ""}`}
                  onClick$={() => {
                    viewMode.value = "table";
                  }}
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>
                <button
                  class={`btn btn-sm sm:btn-md ${viewMode.value === "grid" ? "btn-active" : ""}`}
                  onClick$={() => {
                    viewMode.value = "grid";
                  }}
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div class="text-sm text-base-content/70 mt-2">
            Showing {filteredBlogs.value.length} of{" "}
            {blogsData.value.blogs.length} blogs
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBlogs.value.length > 0 && (
        <div class="alert alert-info shadow-lg">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-3">
            <span class="text-sm sm:text-base font-medium">
              {selectedBlogs.value.length} blog(s) selected
            </span>
            <div class="flex flex-wrap gap-2">
              <Form action={bulkAction}>
                <input
                  type="hidden"
                  name="blogIds"
                  value={JSON.stringify(selectedBlogs.value)}
                />
                <input type="hidden" name="status" value="PUBLISHED" />
                <button type="submit" class="btn btn-success btn-sm gap-2">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Publish
                </button>
              </Form>
              <Form action={bulkAction}>
                <input
                  type="hidden"
                  name="blogIds"
                  value={JSON.stringify(selectedBlogs.value)}
                />
                <input type="hidden" name="status" value="DRAFT" />
                <button type="submit" class="btn btn-warning btn-sm gap-2">
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Draft
                </button>
              </Form>
              <button
                class="btn btn-ghost btn-sm"
                onClick$={() => {
                  selectedBlogs.value = [];
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode.value === "table" ? (
        /* Table View */
        <div class="card bg-base-200 shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th class="bg-base-300">
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox checkbox-sm"
                        checked={
                          selectedBlogs.value.length ===
                            filteredBlogs.value.length &&
                          filteredBlogs.value.length > 0
                        }
                        onChange$={handleSelectAll}
                      />
                    </label>
                  </th>
                  <th class="bg-base-300">Title</th>
                  <th class="bg-base-300 hidden lg:table-cell">Status</th>
                  <th class="bg-base-300 hidden xl:table-cell">Tags</th>
                  <th class="bg-base-300 hidden md:table-cell">Updated</th>
                  <th class="bg-base-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.value.map((blog) => (
                  <tr key={blog.id} class="hover">
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          class="checkbox checkbox-sm"
                          checked={selectedBlogs.value.includes(blog.id)}
                          onChange$={() => handleSelectBlog(blog.id)}
                        />
                      </label>
                    </td>
                    <td>
                      <div class="flex flex-col gap-1">
                        <div class="font-semibold text-sm sm:text-base">
                          {blog.title}
                        </div>
                        {blog.summary && (
                          <div class="text-xs text-base-content/70 line-clamp-2 max-w-md">
                            {blog.summary}
                          </div>
                        )}
                        {/* Mobile: Show status and date */}
                        <div class="flex flex-wrap gap-2 mt-1 lg:hidden">
                          <span
                            class={`badge badge-sm ${
                              blog.status === "PUBLISHED" ||
                              blog.status === "published"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {blog.status}
                          </span>
                          <span class="text-xs text-base-content/60">
                            {formatDate(blog.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="hidden lg:table-cell">
                      <span
                        class={`badge ${
                          blog.status === "PUBLISHED" ||
                          blog.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {blog.status.toUpperCase()}
                      </span>
                    </td>
                    <td class="hidden xl:table-cell">
                      <div class="flex flex-wrap gap-1 max-w-xs">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} class="badge badge-outline badge-sm">
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span class="badge badge-outline badge-sm">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td class="hidden md:table-cell text-sm">
                      {formatDate(blog.updatedAt)}
                    </td>
                    <td>
                      <div class="flex gap-1">
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          class="btn btn-primary btn-xs sm:btn-sm"
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
                        </Link>
                        <Link
                          href={`/blog/${blog.slug}`}
                          class="btn btn-ghost btn-xs sm:btn-sm"
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
                        </Link>
                        <Form action={deleteAction}>
                          <input type="hidden" name="id" value={blog.id} />
                          <button
                            type="submit"
                            class="btn btn-error btn-xs sm:btn-sm"
                            onClick$={(e) => {
                              if (
                                !confirm(
                                  "Are you sure you want to delete this blog?",
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </Form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBlogs.value.length === 0 && (
            <div class="text-center py-12 px-4">
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
              {blogsData.value.error ? (
                <div class="alert alert-error max-w-md mx-auto">
                  <span>{blogsData.value.error}</span>
                </div>
              ) : (
                <div>
                  <p class="text-base-content/60 mb-4">
                    {searchTerm.value || statusFilter.value !== "ALL"
                      ? "No blogs found matching your criteria."
                      : "No blogs available. Create your first blog!"}
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
              )}
            </div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredBlogs.value.map((blog) => (
            <div
              key={blog.id}
              class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all"
            >
              <div class="card-body p-4 sm:p-6">
                {/* Checkbox */}
                <label class="cursor-pointer flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    class="checkbox checkbox-sm"
                    checked={selectedBlogs.value.includes(blog.id)}
                    onChange$={() => handleSelectBlog(blog.id)}
                  />
                  <span class="text-xs text-base-content/60">Select</span>
                </label>

                {/* Title */}
                <h3 class="card-title text-base sm:text-lg line-clamp-2">
                  {blog.title}
                </h3>

                {/* Summary */}
                {blog.summary && (
                  <p class="text-sm text-base-content/70 line-clamp-3 mb-3">
                    {blog.summary}
                  </p>
                )}

                {/* Status & Date */}
                <div class="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    class={`badge ${
                      blog.status === "PUBLISHED" || blog.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {blog.status.toUpperCase()}
                  </span>
                  <span class="text-xs text-base-content/60">
                    {formatDate(blog.updatedAt)}
                  </span>
                </div>

                {/* Tags */}
                <div class="flex flex-wrap gap-1 mb-4">
                  {blog.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} class="badge badge-outline badge-sm">
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 3 && (
                    <span class="badge badge-outline badge-sm">
                      +{blog.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div class="card-actions justify-end gap-2">
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    class="btn btn-primary btn-sm gap-2"
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
                    Edit
                  </Link>
                  <Link
                    href={`/blog/${blog.slug}`}
                    class="btn btn-ghost btn-sm gap-2"
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
                    </svg>
                    View
                  </Link>
                  <Form action={deleteAction}>
                    <input type="hidden" name="id" value={blog.id} />
                    <button
                      type="submit"
                      class="btn btn-error btn-sm gap-2"
                      onClick$={(e) => {
                        if (
                          !confirm("Are you sure you want to delete this blog?")
                        ) {
                          e.preventDefault();
                        }
                      }}
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}

          {filteredBlogs.value.length === 0 && (
            <div class="col-span-full text-center py-12">
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
              {blogsData.value.error ? (
                <div class="alert alert-error max-w-md mx-auto">
                  <span>{blogsData.value.error}</span>
                </div>
              ) : (
                <div>
                  <p class="text-base-content/60 mb-4">
                    {searchTerm.value || statusFilter.value !== "ALL"
                      ? "No blogs found matching your criteria."
                      : "No blogs available. Create your first blog!"}
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
              )}
            </div>
          )}
        </div>
      )}

      {/* Toast Notifications */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-success">
            <svg
              class="w-6 h-6"
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
            <span>Blog deleted successfully!</span>
          </div>
        </div>
      )}

      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-error">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{deleteAction.value.error}</span>
          </div>
        </div>
      )}

      {bulkAction.value?.success && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-success">
            <svg
              class="w-6 h-6"
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
            <span>Bulk action completed successfully!</span>
          </div>
        </div>
      )}

      {bulkAction.value?.error && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-error">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{bulkAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});
