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
    <div class="space-y-4 lg:space-y-6">
      {/* Header */}
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Project Management
          </h1>
          <p class="text-sm text-base-content/70 mt-1">
            Manage and showcase your projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          class="btn btn-primary gap-2 w-full sm:w-auto"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Project
        </Link>
      </div>

      {/* Search and Filters */}
      <div class="card bg-base-200 shadow-lg">
        <div class="card-body p-4 lg:p-6">
          <div class="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div class="flex-1">
              <div class="form-control">
                <div class="input-group">
                  <span class="bg-base-300">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search projects by title or description..."
                    class="input input-bordered w-full"
                    value={searchTerm.value}
                    onInput$={(e) => {
                      searchTerm.value = (e.target as HTMLInputElement).value;
                    }}
                  />
                  {searchTerm.value && (
                    <button
                      class="btn btn-ghost btn-square"
                      onClick$={() => {
                        searchTerm.value = "";
                      }}
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* User Filter */}
            <div class="w-full sm:w-64">
              <select
                class="select select-bordered w-full"
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

          {/* Results Count */}
          <div class="text-sm text-base-content/70 mt-2">
            Showing {filteredProjects.value.length} of{" "}
            {projectsData.value.projects.length} projects
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredProjects.value.map((project) => (
          <div
            key={project.id}
            class="card bg-base-200 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
          >
            <div class="card-body p-4 sm:p-6">
              {/* Icon & Title */}
              <div class="flex items-start gap-3 mb-3">
                <div class="avatar placeholder">
                  <div class="bg-primary text-primary-content rounded-lg w-12 h-12 flex-shrink-0">
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="card-title text-base sm:text-lg font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <p class="text-sm text-base-content/70 line-clamp-3 mb-4">
                  {project.description}
                </p>
              )}

              {/* User Info */}
              {project.user && (
                <div class="flex items-center gap-3 p-3 bg-base-100 rounded-lg mb-4">
                  <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                      <span class="text-sm font-bold">
                        {project.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-semibold text-sm truncate">
                      {project.user.name}
                    </p>
                    <p class="text-xs text-base-content/60 truncate">
                      {project.user.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Meta Information */}
              <div class="divider my-2"></div>
              <div class="text-xs text-base-content/60 space-y-1">
                <div class="flex items-center gap-2">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Created: {formatDate(project.createdAt)}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    class="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span>Updated: {formatDate(project.updatedAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div class="card-actions justify-end mt-4 gap-2">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  class="btn btn-primary btn-sm gap-2 flex-1 sm:flex-none"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Link>
                <Form action={deleteAction}>
                  <input type="hidden" name="id" value={project.id} />
                  <button
                    type="submit"
                    class="btn btn-error btn-sm gap-2"
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
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.value.length === 0 && (
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body items-center text-center py-12">
            <div class="flex justify-center mb-4">
              <svg
                class="w-16 h-16 sm:w-20 sm:h-20 text-base-content/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            {projectsData.value.error ? (
              <div class="alert alert-error max-w-md">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{projectsData.value.error}</span>
              </div>
            ) : (
              <div>
                <p class="text-base-content/60 mb-4 text-sm sm:text-base">
                  {searchTerm.value || userFilter.value !== "ALL"
                    ? "No projects found matching your criteria."
                    : "No projects available. Create your first project!"}
                </p>
                <Link href="/admin/projects/new" class="btn btn-primary gap-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create First Project
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-success shadow-lg">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Project deleted successfully!</span>
          </div>
        </div>
      )}

      {deleteAction.value?.error && (
        <div class="toast toast-top toast-end z-50">
          <div class="alert alert-error shadow-lg">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{deleteAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});
