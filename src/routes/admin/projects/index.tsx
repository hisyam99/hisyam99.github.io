import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import { getAllProjects, deleteProject } from "~/services/admin-projects";
import type { Project } from "~/services/admin-projects";

export const useProjectsData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const result = await getAllProjects(token);
    return { projects: result.data, error: null };
  } catch (error) {
    console.error("Failed to load projects:", error);
    return { projects: [], error: "Failed to load projects" };
  }
});

export const useDeleteProject = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const projectId = data.id as string;
    await deleteProject(token, projectId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete project",
    };
  }
});

export default component$(() => {
  const projectsData = useProjectsData();
  const deleteAction = useDeleteProject();

  const searchTerm = useSignal("");
  const userFilter = useSignal("ALL");
  const filteredProjects = useSignal<Project[]>([]);

  // Filter projects based on search and user
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => userFilter.value);
    track(() => projectsData.value.projects);

    const projects = projectsData.value.projects;
    let filtered = projects;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(term) ||
          project.description?.toLowerCase().includes(term) ||
          project.user?.name.toLowerCase().includes(term),
      );
    }

    // Apply user filter
    if (userFilter.value !== "ALL") {
      filtered = filtered.filter(
        (project) => project.userId === userFilter.value,
      );
    }

    filteredProjects.value = filtered;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get unique users for filter dropdown
  const users = Array.from(
    new Set(
      projectsData.value.projects
        .filter((project) => project.user)
        .map((project) => project.user!),
    ),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Project Management</h1>
        <Link href="/admin/projects/new" class="btn btn-primary">
          Create New Project
        </Link>
      </div>

      {/* Search and Filters */}
      <div class="bg-base-200 p-4 rounded-lg mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              class="input input-bordered w-full"
              value={searchTerm.value}
              onInput$={(e) => {
                searchTerm.value = (e.target as HTMLInputElement).value;
              }}
            />
          </div>
          <select
            class="select select-bordered"
            value={userFilter.value}
            onChange$={(e) => {
              userFilter.value = (e.target as HTMLSelectElement).value;
            }}
          >
            <option value="ALL">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.value.map((project) => (
          <div key={project.id} class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title text-xl">{project.title}</h2>

              {project.description && (
                <p class="text-base-content/70 mb-4">{project.description}</p>
              )}

              {/* User Info */}
              {project.user && (
                <div class="flex items-center gap-2 mb-4">
                  <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-6 h-6">
                      <span class="text-xs">
                        {project.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span class="text-sm text-base-content/60">
                    {project.user.name}
                  </span>
                </div>
              )}

              {/* Meta Information */}
              <div class="text-xs text-base-content/50 mb-4">
                <div>Created: {formatDate(project.createdAt)}</div>
                <div>Updated: {formatDate(project.updatedAt)}</div>
              </div>

              <div class="card-actions justify-end">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  class="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <Form action={deleteAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    class="btn btn-sm btn-error"
                    onClick$={(e) => {
                      if (
                        !confirm(
                          "Are you sure you want to delete this project?",
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.value.length === 0 && (
        <div class="text-center py-12">
          {projectsData.value.error ? (
            <div class="alert alert-error">
              <span>{projectsData.value.error}</span>
            </div>
          ) : (
            <div>
              {searchTerm.value || userFilter.value !== "ALL"
                ? "No projects found matching your criteria."
                : "No projects available. Create your first project!"}
            </div>
          )}
        </div>
      )}

      {/* Action Results */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>Project deleted successfully!</span>
          </div>
        </div>
      )}

      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-error">
            <span>{deleteAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});
