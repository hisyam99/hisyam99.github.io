import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { useAdminCategoryLoader } from "~/hooks/data-loaders";
import { updateCategory } from "~/services/admin-categories";
import { z } from "zod";
import { checkAuth } from "~/utils/auth-middleware";

export { useAdminCategoryLoader };

const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const useUpdateCategory = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();
  const categoryId = requestEvent.params.id;

  if (!auth.authenticated) {
    return { success: false, error: "Unauthorized" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  const validation = updateCategorySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await updateCategory(token, { id: categoryId, ...validation.data });
    // Redirect to categories list after successful update
    throw requestEvent.redirect(302, "/admin/categories");
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
});

export default component$(() => {
  const categoryData = useAdminCategoryLoader();
  const updateCategoryAction = useUpdateCategory();

  if (categoryData.value.error) {
    return <div class="alert alert-error">{categoryData.value.error}</div>;
  }

  const category = categoryData.value.category;
  if (!category) {
    return <div class="alert alert-error">Category not found</div>;
  }

  return (
    <div class="admin-edit-category">
      <h1 class="text-2xl font-bold mb-6">Edit Category: {category.name}</h1>

      <Form action={updateCategoryAction} class="form-control">
        <div class="mb-4">
          <label class="label">Name</label>
          <input
            type="text"
            name="name"
            class="input input-bordered"
            value={category.name}
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Description</label>
          <textarea
            name="description"
            class="textarea textarea-bordered"
            rows={4}
            value={category.description || ""}
          />
        </div>

        {/* Error Display */}
        {updateCategoryAction.value?.error && (
          <div class="alert alert-error mb-4">
            <span>{updateCategoryAction.value.error}</span>
          </div>
        )}

        <button
          type="submit"
          class="btn btn-primary"
          disabled={updateCategoryAction.isRunning}
        >
          {updateCategoryAction.isRunning ? "Updating..." : "Update Category"}
        </button>
      </Form>
    </div>
  );
});
