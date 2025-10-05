import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, z, zod$, Link } from "@builder.io/qwik-city";
import { createProject } from "~/services/admin-projects";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  userId: z.string().optional(),
});

export const useCreateProject = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const projectData = {
      title: data.title as string,
      description: (data.description as string) || undefined,
      userId: (data.userId as string) || undefined,
    };

    await createProject(token, projectData);

    // Redirect to projects list after successful creation
    throw requestEvent.redirect(302, "/admin/projects");
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }

    console.error("Failed to create project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create project",
    };
  }
}, zod$(createProjectSchema));

export default component$(() => {
  const createAction = useCreateProject();

  const title = useSignal("");
  const description = useSignal("");
  const userId = useSignal("");

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Create New Project</h1>
        <Link href="/admin/projects" class="btn btn-ghost">
          ← Back to Projects
        </Link>
      </div>

      <div class="max-w-2xl">
        <Form action={createAction} class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-6">Project Information</h2>

            {/* Title Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Title *</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter project title"
                class="input input-bordered w-full"
                value={title.value}
                onInput$={(e) => {
                  title.value = (e.target as HTMLInputElement).value;
                }}
                required
              />
              <div class="label">
                <span class="label-text-alt">
                  Choose a descriptive title for the project
                </span>
              </div>
            </div>

            {/* User ID Field (Optional) */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">User ID</span>
              </label>
              <input
                type="text"
                name="userId"
                placeholder="Optional user ID"
                class="input input-bordered w-full"
                value={userId.value}
                onInput$={(e) => {
                  userId.value = (e.target as HTMLInputElement).value;
                }}
              />
              <div class="label">
                <span class="label-text-alt">
                  Optionally assign this project to a user (leave empty for
                  unassigned)
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
                placeholder="Optional description for the project"
                class="textarea textarea-bordered w-full h-24"
                value={description.value}
                onInput$={(e) => {
                  description.value = (e.target as HTMLTextAreaElement).value;
                }}
                maxLength={1000}
              />
              <div class="label">
                <span class="label-text-alt">
                  Provide additional details about this project (optional)
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
              <Link href="/admin/projects" class="btn btn-outline">
                Cancel
              </Link>
              <button
                type="submit"
                class="btn btn-primary"
                disabled={createAction.isRunning}
              >
                {createAction.isRunning ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});
