import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { createProject } from "~/services/project";
import { z } from "zod";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  userId: z.string().optional(),
});

export const useCreateProject = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = createProjectSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await createProject(token, {
      title: validation.data.title,
      description: validation.data.description,
      userId: validation.data.userId,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
});

export default component$(() => {
  const createProjectAction = useCreateProject();

  return (
    <div class="admin-new-project">
      <h1 class="text-2xl font-bold mb-6">Create New Project</h1>

      <Form action={createProjectAction} class="form-control">
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
            rows={4}
          />
        </div>

        <div class="mb-4">
          <label class="label">User ID (optional)</label>
          <input type="text" name="userId" class="input input-bordered" />
        </div>

        <button type="submit" class="btn btn-primary">
          Create Project
        </button>
      </Form>
    </div>
  );
});
