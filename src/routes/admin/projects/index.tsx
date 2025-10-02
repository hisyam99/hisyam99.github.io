import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, Link } from "@builder.io/qwik-city";
import { deleteProject } from "~/services/project";
import type { Project } from "~/services/project";
import { useAdminProjectsLoader } from "~/hooks/data-loaders";

export { useAdminProjectsLoader };

export const useDeleteProject = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await deleteProject(token, String(data.projectId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return { success: false, error: "Failed to delete project" };
  }
});

export default component$(() => {
  const projectsData = useAdminProjectsLoader();
  const deleteProjectAction = useDeleteProject();
  const searchSignal = useSignal("");

  return (
    <div class="admin-projects">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Project Management</h1>
        <Link href="/admin/projects/new" class="btn btn-primary">
          Add New Project
        </Link>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          class="input input-bordered w-full"
          bind:value={searchSignal}
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.value?.data
          ?.filter((project) =>
            project.title
              .toLowerCase()
              .includes(searchSignal.value.toLowerCase()),
          )
          .map((project: Project) => (
            <div key={project.id} class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{project.title}</h2>
                <p>{project.description}</p>
                <p class="text-sm text-gray-500">User: {project.user?.name}</p>
                <div class="card-actions justify-end">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    class="btn btn-sm btn-outline"
                  >
                    Edit
                  </Link>
                  <Form action={deleteProjectAction}>
                    <input type="hidden" name="projectId" value={project.id} />
                    <button type="submit" class="btn btn-sm btn-error">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});
