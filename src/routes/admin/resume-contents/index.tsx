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
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Resume Content Management</h1>
        <Link href="/admin/resume-contents/new" class="btn btn-primary">
          Create New Resume Content
        </Link>
      </div>

      {/* Search and Filters */}
      <div class="bg-base-200 p-4 rounded-lg mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search resume contents..."
              class="input input-bordered w-full"
              value={searchTerm.value}
              onInput$={(e) => {
                searchTerm.value = (e.target as HTMLInputElement).value;
              }}
            />
          </div>
          <select
            class="select select-bordered"
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

      {/* Resume Contents Table */}
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Detail Preview</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResumeContents.value.map((content) => (
              <tr key={content.id}>
                <td>
                  <div>
                    <div class="font-medium">{content.title}</div>
                  </div>
                </td>
                <td>
                  <div class="badge badge-outline">{content.category.name}</div>
                </td>
                <td>
                  <div class="max-w-xs truncate text-sm">
                    {content.description || "No description"}
                  </div>
                </td>
                <td>
                  <div class="max-w-xs truncate text-sm">
                    {content.detail
                      ? `${content.detail.substring(0, 50)}...`
                      : "No detail"}
                  </div>
                </td>
                <td class="text-sm">{formatDate(content.createdAt)}</td>
                <td class="text-sm">{formatDate(content.updatedAt)}</td>
                <td>
                  <div class="flex gap-2">
                    <Link
                      href={`/admin/resume-contents/${content.id}/edit`}
                      class="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <Form action={deleteAction}>
                      <input type="hidden" name="id" value={content.id} />
                      <button
                        type="submit"
                        class="btn btn-sm btn-error"
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
                        Delete
                      </button>
                    </Form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredResumeContents.value.length === 0 && (
          <div class="text-center py-8 text-gray-500">
            {resumeContentsData.value.error ? (
              <div class="alert alert-error">
                <span>{resumeContentsData.value.error}</span>
              </div>
            ) : (
              <div>
                {searchTerm.value || categoryFilter.value !== "ALL"
                  ? "No resume contents found matching your criteria."
                  : "No resume contents available. Create your first resume content!"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Results */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>Resume content deleted successfully!</span>
          </div>
        </div>
      )}

      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-error">
            <span>{deleteAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});
