import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import { useAdminProjectLoader } from "~/hooks/data-loaders";
import { updateProject } from "~/services/project";
import { z } from "zod";

const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  userId: z.string().optional(),
});

export const useUpdateProject = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;
  const projectId = requestEvent.params.id;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  const validation = updateProjectSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.message };
  }

  try {
    await updateProject(token, projectId, validation.data);
    return { success: true };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
});

export default component$(() => {
  const projectData = useAdminProjectLoader();
  const updateProjectAction = useUpdateProject();

  if (projectData.value.error) {
    return <div class="alert alert-error">{projectData.value.error}</div>;
  }

  const project = projectData.value.project;
  if (!project) {
    return <div class="alert alert-error">Project not found</div>;
  }

  return (
    <div class="admin-edit-project">
      <h1 class="text-2xl font-bold mb-6">Edit Project: {project.title}</h1>

      <Form action={updateProjectAction} class="form-control">
        <div class="mb-4">
          <label class="label">Title</label>
          <input
            type="text"
            name="title"
            class="input input-bordered"
            value={project.title}
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
            {project.description}
          </textarea>
        </div>

        <div class="mb-4">
          <label class="label">User ID</label>
          <input
            type="text"
            name="userId"
            class="input input-bordered"
            value={project.userId}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Update Project
        </button>
      </Form>
    </div>
  );
});
