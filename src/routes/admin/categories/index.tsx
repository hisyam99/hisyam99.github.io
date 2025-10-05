import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import { getAllCategories, deleteCategory } from "~/services/admin-categories";
import type { Category } from "~/services/admin-categories";

export const useCategoriesData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const result = await getAllCategories(token);
    return { categories: result.data, error: null };
  } catch (error) {
    console.error("Failed to load categories:", error);
    return { categories: [], error: "Failed to load categories" };
  }
});

export const useDeleteCategory = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

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

    const categories = categoriesData.value.categories;
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
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Category Management</h1>
        <Link href="/admin/categories/new" class="btn btn-primary">
          Create New Category
        </Link>
      </div>

      {/* Search */}
      <div class="bg-base-200 p-4 rounded-lg mb-6">
        <div class="flex gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              class="input input-bordered w-full"
              value={searchTerm.value}
              onInput$={(e) => {
                searchTerm.value = (e.target as HTMLInputElement).value;
              }}
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.value.map((category) => (
          <div key={category.id} class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title text-xl">{category.name}</h2>

              {category.description && (
                <p class="text-base-content/70 mb-4">{category.description}</p>
              )}

              {/* Resume Contents Count */}
              <div class="flex items-center gap-2 mb-4">
                <svg
                  class="w-4 h-4 text-base-content/60"
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
                <span class="text-sm text-base-content/60">
                  {category.resumeContents.length} resume content(s)
                </span>
              </div>

              {/* Meta Information */}
              <div class="text-xs text-base-content/50 mb-4">
                <div>Created: {formatDate(category.createdAt)}</div>
                <div>Updated: {formatDate(category.updatedAt)}</div>
              </div>

              <div class="card-actions justify-end">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  class="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <Form action={deleteAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    class="btn btn-sm btn-error"
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
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.value.length === 0 && (
        <div class="text-center py-12">
          {categoriesData.value.error ? (
            <div class="alert alert-error">
              <span>{categoriesData.value.error}</span>
            </div>
          ) : (
            <div>
              {searchTerm.value
                ? "No categories found matching your search."
                : "No categories available. Create your first category!"}
            </div>
          )}
        </div>
      )}

      {/* Action Results */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>Category deleted successfully!</span>
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
