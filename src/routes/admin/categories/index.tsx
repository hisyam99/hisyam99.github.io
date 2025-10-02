import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, Link } from "@builder.io/qwik-city";
import { useAdminCategoriesLoader } from "~/hooks/data-loaders";
import { deleteCategory } from "~/services/category";
import type { Category } from "~/services/category";

export { useAdminCategoriesLoader };

export const useDeleteCategory = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await deleteCategory(token, String(data.categoryId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
});

export default component$(() => {
  const categoriesData = useAdminCategoriesLoader();
  const deleteCategoryAction = useDeleteCategory();
  const searchSignal = useSignal("");

  return (
    <div class="admin-categories">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Category Management</h1>
        <Link href="/admin/categories/new" class="btn btn-primary">
          Add New Category
        </Link>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          class="input input-bordered w-full"
          bind:value={searchSignal}
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesData.value?.data
          ?.filter((category) =>
            category.name
              .toLowerCase()
              .includes(searchSignal.value.toLowerCase()),
          )
          .map((category: Category) => (
            <div key={category.id} class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{category.name}</h2>
                <p>{category.description}</p>
                <div class="card-actions justify-end">
                  <Link
                    href={`/admin/categories/${category.id}/edit`}
                    class="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>
                  <Form action={deleteCategoryAction}>
                    <input
                      type="hidden"
                      name="categoryId"
                      value={category.id}
                    />
                    <button type="submit" class="btn btn-sm btn-error">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
