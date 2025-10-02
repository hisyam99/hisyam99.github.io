import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { useAdminCategoryLoader } from "~/hooks/data-loaders";
import { updateCategory } from "~/services/category";
import { z } from "zod";

export { useAdminCategoryLoader };

const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const useUpdateCategory = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;
  const categoryId = requestEvent.params.id;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = updateCategorySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await updateCategory(token, categoryId, validation.data);
    return { success: true };
  } catch (error) {
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
          >
            {category.description}
          </textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Update Category
        </button>
      </Form>
    </div>
  );
});
