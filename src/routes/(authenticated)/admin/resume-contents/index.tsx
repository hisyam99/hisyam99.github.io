import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import {
  getAllResumeContents,
  deleteResumeContent,
} from "~/services/admin-resume-contents";
import type { ResumeContent } from "~/services/admin-resume-contents";

export const useResumeContentsData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const result = await getAllResumeContents(token);
    return { resumeContents: result.data, error: null };
  } catch (error) {
    console.error("Failed to load resume contents:", error);
    return { resumeContents: [], error: "Failed to load resume contents" };
  }
});

export const useDeleteResumeContent = routeAction$(
  async (data, requestEvent) => {
    const token = requestEvent.cookie.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const resumeContentId = data.id as string;
      await deleteResumeContent(token, resumeContentId);
      return { success: true, error: null };
    } catch (error) {
      console.error("Failed to delete resume content:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to delete resume content",
      };
    }
  },
);

export default component$(() => {
  const resumeContentsData = useResumeContentsData();
  const deleteAction = useDeleteResumeContent();

  const searchTerm = useSignal("");
  const categoryFilter = useSignal("ALL");
  const filteredResumeContents = useSignal<ResumeContent[]>([]);

  // Filter resume contents based on search and category
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => categoryFilter.value);
    track(() => resumeContentsData.value.resumeContents);

    const resumeContents = resumeContentsData.value.resumeContents;
    let filtered = resumeContents;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (content) =>
          content.title.toLowerCase().includes(term) ||
          content.description?.toLowerCase().includes(term) ||
          content.category.name.toLowerCase().includes(term),
      );
    }

    // Apply category filter
    if (categoryFilter.value !== "ALL") {
      filtered = filtered.filter(
        (content) => content.category.id === categoryFilter.value,
      );
    }

    filteredResumeContents.value = filtered;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get unique categories for filter dropdown
  const categories = Array.from(
    new Set(
      resumeContentsData.value.resumeContents.map(
        (content) => content.category,
      ),
    ),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div class="space-y-4 lg:space-y-6">
      {/* Header */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Resume Content Management
          </h1>
          <p class="text-sm text-base-content/70 mt-1">
            Manage your resume and portfolio content
          </p>
        </div>
        <Link
          href="/admin/resume-contents/new"
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
          Create New Content
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
                    placeholder="Search resume contents..."
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

            {/* Category Filter */}
            <div class="w-full sm:w-64">
              <select
                class="select select-bordered w-full"
                value={categoryFilter.value}
                onChange$={(e) => {
                  categoryFilter.value = (e.target as HTMLSelectElement).value;
                }}
              >
                <option value="ALL">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div class="text-sm text-base-content/70 mt-2">
            Showing {filteredResumeContents.value.length} of{" "}
            {resumeContentsData.value.resumeContents.length} resume contents
          </div>
        </div>
      </div>

      {/* Resume Contents Table */}
      <div class="card bg-base-200 shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th class="bg-base-300">Title</th>
                <th class="bg-base-300 hidden lg:table-cell">Category</th>
                <th class="bg-base-300 hidden xl:table-cell">Description</th>
                <th class="bg-base-300 hidden md:table-cell">Updated</th>
                <th class="bg-base-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResumeContents.value.map((content) => (
                <tr key={content.id} class="hover">
                  <td>
                    <div class="flex flex-col gap-1">
                      <div class="font-semibold text-sm sm:text-base">
                        {content.title}
                      </div>
                      {/* Mobile: Show category and date */}
                      <div class="flex flex-wrap gap-2 mt-1 lg:hidden">
                        <span class="badge badge-outline badge-sm">
                          {content.category.name}
                        </span>
                        <span class="text-xs text-base-content/60">
                          {formatDate(content.updatedAt)}
                        </span>
                      </div>
                      {content.description && (
                        <div class="text-xs text-base-content/70 line-clamp-2 xl:hidden">
                          {content.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td class="hidden lg:table-cell">
                    <div class="badge badge-primary badge-outline">
                      {content.category.name}
                    </div>
                  </td>
                  <td class="hidden xl:table-cell">
                    <div class="max-w-xs text-sm truncate">
                      {content.description || "No description"}
                    </div>
                  </td>
                  <td class="hidden md:table-cell text-sm">
                    {formatDate(content.updatedAt)}
                  </td>
                  <td>
                    <div class="flex gap-1">
                      <Link
                        href={`/admin/resume-contents/${content.id}/edit`}
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
                      <Form action={deleteAction}>
                        <input type="hidden" name="id" value={content.id} />
                        <button
                          type="submit"
                          class="btn btn-error btn-xs sm:btn-sm"
                          onClick$={(e) => {
                            if (
                              !confirm(
                                "Are you sure you want to delete this resume content?",
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

        {/* Empty State */}
        {filteredResumeContents.value.length === 0 && (
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
            {resumeContentsData.value.error ? (
              <div class="alert alert-error max-w-md mx-auto">
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
                <span>{resumeContentsData.value.error}</span>
              </div>
            ) : (
              <div>
                <p class="text-base-content/60 mb-4 text-sm sm:text-base">
                  {searchTerm.value || categoryFilter.value !== "ALL"
                    ? "No resume contents found matching your criteria."
                    : "No resume contents available. Create your first resume content!"}
                </p>
                <Link
                  href="/admin/resume-contents/new"
                  class="btn btn-primary gap-2"
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
                  Create First Content
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-success shadow-lg">
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
            <span>Resume content deleted successfully!</span>
          </div>
        </div>
      )}

      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-error shadow-lg">
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
    </div>
  );
});
