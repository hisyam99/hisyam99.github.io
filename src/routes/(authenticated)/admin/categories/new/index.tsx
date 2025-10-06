import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, Link, z, zod$ } from "@builder.io/qwik-city";
import { createCategory } from "~/services/admin-categories";
import { checkAuth } from "~/utils/auth-middleware";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
});

export const useCreateCategory = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    return { success: false, error: "Not authenticated" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const categoryData = {
      name: data.name as string,
      description: (data.description as string) || undefined,
    };

    await createCategory(token, categoryData);

    // Redirect to categories list after successful creation
    throw requestEvent.redirect(302, "/admin/categories");
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }

    console.error("Failed to create category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create category",
    };
  }
}, zod$(createCategorySchema));

export default component$(() => {
  const createAction = useCreateCategory();

  const name = useSignal("");
  const description = useSignal("");

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Create New Category</h1>
        <Link href="/admin/categories" class="btn btn-ghost">
          ← Back to Categories
        </Link>
      </div>

      <div class="max-w-2xl">
        <Form action={createAction} class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-6">Category Information</h2>

            {/* Name Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Name *</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter category name"
                class="input input-bordered w-full"
                value={name.value}
                onInput$={(e) => {
                  name.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
              <div class="label">
                <span class="label-text-alt">
                  Choose a descriptive name for the category
                </span>
              </div>
            </div>

            {/* Description Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Description</span>
                <span class="label-text-alt">
                  {description.value.length}/500
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Optional description for the category"
                class="textarea textarea-bordered w-full h-24"
                value={description.value}
                onInput$={(e) => {
                  description.value = (e.target as HTMLTextAreaElement).value;
                }}
                maxLength={500}
              />
              <div class="label">
                <span class="label-text-alt">
                  Provide additional context about this category (optional)
                </span>
              </div>
            </div>

            {/* Error Display */}
            {createAction.value?.error && (
              <div class="alert alert-error">
                <span>{createAction.value.error}</span>
              </div>
            )}

            {/* Actions */}
            <div class="card-actions justify-end mt-6">
              <Link href="/admin/categories" class="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                class="btn btn-primary"
                disabled={createAction.isRunning}
              >
                {createAction.isRunning ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});
