import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import { getAllCategories, deleteCategory } from "~/services/admin-categories";
import type { Category } from "~/services/admin-categories";
import { checkAuth } from "~/utils/auth-middleware";

export const useCategoriesData = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const result = await getAllCategories(token);
    return { categories: result.data, error: null };
  } catch (error) {
    console.error("Failed to load categories:", error);
    return { categories: [], error: "Failed to load categories" };
  }
});

export const useDeleteCategory = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    return { success: false, error: "Not authenticated" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const categoryId = data.id as string;
    await deleteCategory(token, categoryId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete category",
    };
  }
});

export default component$(() => {
  const categoriesData = useCategoriesData();
  const deleteAction = useDeleteCategory();

  const searchTerm = useSignal("");
  const filteredCategories = useSignal<Category[]>([]);

  // Filter categories based on search
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => categoriesData.value.categories);

    const categories = categoriesData.value.categories || [];
    let filtered = categories;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(term) ||
          category.description?.toLowerCase().includes(term),
      );
    }

    filteredCategories.value = filtered;
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
            Category Management
          </h1>
          <p class="text-sm text-base-content/70 mt-1">
            Organize your content with categories
          </p>
        </div>
        <Link
          href="/admin/categories/new"
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
          Create New Category
        </Link>
      </div>

      {/* Search */}
      <div class="card bg-base-200 shadow-lg">
        <div class="card-body p-4 lg:p-6">
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
                placeholder="Search categories by name or description..."
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

          {/* Results Count */}
          <div class="text-sm text-base-content/70 mt-2">
            Showing {filteredCategories.value.length} of{" "}
            {categoriesData.value.categories?.length || 0} categories
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredCategories.value.map((category) => (
          <div
            key={category.id}
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            <div class="card-body p-4 sm:p-6">
              {/* Icon & Title */}
              <div class="flex items-start gap-3 mb-3">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content rounded-lg w-12 h-12">
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
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="card-title text-lg font-bold truncate">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              {category.description && (
                <p class="text-sm text-base-content/70 line-clamp-3 mb-4">
                  {category.description}
                </p>
              )}

              {/* Stats */}
              <div class="flex items-center gap-2 mb-4">
                <div class="badge badge-ghost gap-2">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {category.resumeContents.length} content(s)
                </div>
              </div>

              {/* Meta Information */}
              <div class="divider my-2"></div>
              <div class="text-xs text-base-content/60 space-y-1">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Created: {formatDate(category.createdAt)}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-3 h-3"
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
                  <span>Updated: {formatDate(category.updatedAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div class="card-actions justify-end mt-4 gap-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  class="btn btn-primary btn-sm gap-2 flex-1 sm:flex-none"
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
                <Form action={deleteAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    class="btn btn-error btn-sm gap-2"
                    onClick$={(e) => {
                      if (
                        !confirm(
                          "Are you sure you want to delete this category?",
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
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.value.length === 0 && (
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body items-center text-center py-12">
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            {categoriesData.value.error ? (
              <div class="alert alert-error max-w-md">
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
                <span>{categoriesData.value.error}</span>
              </div>
            ) : (
              <div>
                <p class="text-base-content/60 mb-4 text-sm sm:text-base">
                  {searchTerm.value
                    ? "No categories found matching your search."
                    : "No categories available. Create your first category!"}
                </p>
                <Link
                  href="/admin/categories/new"
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
                  Create First Category
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

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
            <span>Category deleted successfully!</span>
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
