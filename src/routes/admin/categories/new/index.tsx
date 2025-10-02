import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { createCategory } from "~/services/category";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const useCreateCategory = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = createCategorySchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await createCategory(token, {
      name: validation.data.name,
      description: validation.data.description,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
});

export default component$(() => {
  const createCategoryAction = useCreateCategory();

  return (
    <div class="admin-new-category">
      <h1 class="text-2xl font-bold mb-6">Create New Category</h1>

      <Form action={createCategoryAction} class="form-control">
        <div class="mb-4">
          <label class="label">Name</label>
          <input
            type="text"
            name="name"
            class="input input-bordered"
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Description</label>
          <textarea
            name="description"
            class="textarea textarea-bordered"
            rows={4}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Create Category
        </button>
      </Form>
    </div>
  );
});
