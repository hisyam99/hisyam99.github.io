import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { useAdminResumeContentLoader } from "~/hooks/data-loaders";
import { updateResumeContent } from "~/services/category";
import { z } from "zod";

export { useAdminResumeContentLoader };

const updateResumeContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  detail: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const useUpdateResumeContent = routeAction$(
  async (data, requestEvent) => {
    const token = requestEvent.cookie.get("accessToken")?.value;
    const resumeContentId = requestEvent.params.id;

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const validation = updateResumeContentSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: validation.error.message };
    }

    try {
      await updateResumeContent(token, resumeContentId, validation.data);
      return { success: true };
    } catch (error) {
      console.error("Failed to update resume content:", error);
      return { success: false, error: "Failed to update resume content" };
    }
  },
);

export default component$(() => {
  const resumeContentData = useAdminResumeContentLoader();
  const updateResumeContentAction = useUpdateResumeContent();

  if (resumeContentData.value.error) {
    return <div class="alert alert-error">{resumeContentData.value.error}</div>;
  }

  const resumeContent = resumeContentData.value.resumeContent;
  if (!resumeContent) {
    return <div class="alert alert-error">Resume content not found</div>;
  }

  return (
    <div class="admin-edit-resume-content">
      <h1 class="text-2xl font-bold mb-6">
        Edit Resume Content: {resumeContent.title}
      </h1>

      <Form action={updateResumeContentAction} class="form-control">
        <div class="mb-4">
          <label class="label">Title</label>
          <input
            type="text"
            name="title"
            class="input input-bordered"
            value={resumeContent.title}
            required
          />
        </div>

        <div class="mb-4">
          <label class="label">Description</label>
          <textarea
            name="description"
            class="textarea textarea-bordered"
            rows={3}
          >
            {resumeContent.description}
          </textarea>
        </div>

        <div class="mb-4">
          <label class="label">Detail</label>
          <textarea name="detail" class="textarea textarea-bordered" rows={6}>
            {resumeContent.detail}
          </textarea>
        </div>

        <div class="mb-4">
          <label class="label">Category ID</label>
          <input
            type="text"
            name="categoryId"
            class="input input-bordered"
            value={resumeContent.categoryId}
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Update Resume Content
        </button>
      </Form>
    </div>
  );
});
