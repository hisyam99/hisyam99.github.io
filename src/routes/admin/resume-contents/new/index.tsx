import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, z, zod$, Link } from "@builder.io/qwik-city";
import { createResumeContent } from "~/services/admin-resume-contents";

const createResumeContentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  detail: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

export const useCreateResumeContent = routeAction$(
  async (data, requestEvent) => {
    const token = requestEvent.cookie.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const resumeContentData = {
        title: data.title as string,
        description: (data.description as string) || undefined,
        detail: (data.detail as string) || undefined,
        categoryId: data.categoryId as string,
      };

      await createResumeContent(token, resumeContentData);

      // Redirect to resume contents list after successful creation
      throw requestEvent.redirect(302, "/admin/resume-contents");
    } catch (error) {
      if (error instanceof Response) {
        throw error; // Re-throw redirect responses
      }

      console.error("Failed to create resume content:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create resume content",
      };
    }
  },
  zod$(createResumeContentSchema),
);

export default component$(() => {
  const createAction = useCreateResumeContent();

  const title = useSignal("");
  const description = useSignal("");
  const detail = useSignal("");
  const categoryId = useSignal("");

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Create New Resume Content</h1>
        <Link href="/admin/resume-contents" class="btn btn-ghost">
          ← Back to Resume Contents
        </Link>
      </div>

      <div class="max-w-4xl">
        <Form action={createAction} class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-6">Resume Content Information</h2>

            {/* Title Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Title *</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter resume content title"
                class="input input-bordered w-full"
                value={title.value}
                onInput$={(e) => {
                  title.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
            </div>

            {/* Category ID Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Category ID *</span>
              </label>
              <input
                type="text"
                name="categoryId"
                placeholder="Enter category ID"
                class="input input-bordered w-full"
                value={categoryId.value}
                onInput$={(e) => {
                  categoryId.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
              <div class="label">
                <span class="label-text-alt">
                  Enter the ID of the category this resume content belongs to
                </span>
              </div>
            </div>

            {/* Description Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Description</span>
                <span class="label-text-alt">
                  {description.value.length}/1000
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Brief description of the resume content"
                class="textarea textarea-bordered w-full h-20"
                value={description.value}
                onInput$={(e) => {
                  description.value = (e.target as HTMLTextAreaElement).value;
                }}
                maxLength={1000}
              />
            </div>

            {/* Detail Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Detail Content</span>
              </label>
              <textarea
                name="detail"
                placeholder="Detailed content for the resume item"
                class="textarea textarea-bordered w-full h-32"
                value={detail.value}
                onInput$={(e) => {
                  detail.value = (e.target as HTMLTextAreaElement).value;
                }}
              />
              <div class="label">
                <span class="label-text-alt">
                  Provide detailed information about this resume content
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
              <Link href="/admin/resume-contents" class="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                class="btn btn-primary"
                disabled={createAction.isRunning}
              >
                {createAction.isRunning
                  ? "Creating..."
                  : "Create Resume Content"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});
