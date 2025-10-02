import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { createResumeContent } from "~/services/category";
import { z } from "zod";

const createResumeContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  detail: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const useCreateResumeContent = routeAction$(
  async (data, requestEvent) => {
    const token = requestEvent.cookie.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const validation = createResumeContentSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: validation.error.message };
    }

    try {
      await createResumeContent(token, {
        title: validation.data.title,
        description: validation.data.description,
        detail: validation.data.detail,
        categoryId: validation.data.categoryId,
      });
      return { success: true };
    } catch (error) {
      console.error("Failed to create resume content:", error);
      return { success: false, error: "Failed to create resume content" };
    }
  },
);

export default component$(() => {
  const createResumeContentAction = useCreateResumeContent();

  return (
    <div class="admin-new-resume-content">
      <h1 class="text-2xl font-bold mb-6">Create New Resume Content</h1>

      <Form action={createResumeContentAction} class="form-control">
        <div class="mb-4">
          <label class="label">Title</label>
          <input
            type="text"
            name="title"
            class="input input-bordered"
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Description</label>
          <textarea
            name="description"
            class="textarea textarea-bordered"
            rows={3}
          />
        </div>

        <div class="mb-4">
          <label class="label">Detail</label>
          <textarea name="detail" class="textarea textarea-bordered" rows={6} />
        </div>

        <div class="mb-4">
          <label class="label">Category ID</label>
          <input
            type="text"
            name="categoryId"
            class="input input-bordered"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Create Resume Content
        </button>
      </Form>
    </div>
  );
});
