import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  Form,
  z,
  zod$,
  Link,
} from "@builder.io/qwik-city";
import { getProjectById, updateProject } from "~/services/admin-projects";
import { getAllUsers } from "~/services/admin-users";
import type { User } from "~/services/admin-users";
import { checkAuth } from "~/utils/auth-middleware";

const updateProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  userId: z.string().optional(),
});

export const useProjectData = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();
  const projectId = requestEvent.params.id;

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const project = await getProjectById(token, projectId);
    return { project, error: null };
  } catch (error) {
    console.error("Failed to load project:", error);
    return { project: null, error: "Failed to load project" };
  }
});

export const useUsersData = routeLoader$(async (requestEvent) => {
  const auth = await checkAuth();

  if (!auth.authenticated) {
    throw requestEvent.redirect(302, auth.redirectTo || "/auth/login");
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const result = await getAllUsers(token);
    return { users: result.data, error: null };
  } catch (error) {
    console.error("Failed to load users:", error);
    return { users: [], error: "Failed to load users" };
  }
});

export const useUpdateProject = routeAction$(async (data, requestEvent) => {
  const auth = await checkAuth();
  const projectId = requestEvent.params.id;

  if (!auth.authenticated) {
    return { success: false, error: "Not authenticated" };
  }

  if (!projectId) {
    return { success: false, error: "Project ID is required" };
  }

  const token = requestEvent.cookie.get("accessToken")?.value;
  if (!token) return { success: false, error: "Not authenticated" };

  try {
    const projectData = {
      id: projectId,
      title: data.title as string,
      description: (data.description as string) || undefined,
      userId: (data.userId as string) || undefined,
    };

    await updateProject(token, projectData);

    // Redirect to projects list after successful update
    throw requestEvent.redirect(302, "/admin/projects");
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Re-throw redirect responses
    }

    console.error("Failed to update project:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update project",
    };
  }
}, zod$(updateProjectSchema));

export default component$(() => {
  const projectData = useProjectData();
  const usersData = useUsersData();
  const updateAction = useUpdateProject();

  const title = useSignal("");
  const description = useSignal("");
  const userId = useSignal("");

  // Initialize form values when data loads
  useTask$(({ track }) => {
    track(() => projectData.value.project);

    const project = projectData.value.project;
    if (project) {
      title.value = project.title;
      description.value = project.description || "";
      userId.value = project.userId || "";
    }
  });

  if (projectData.value.error) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>{projectData.value.error}</span>
        </div>
        <Link href="/admin/projects" class="btn btn-primary mt-4">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  if (!projectData.value.project) {
    return (
      <div class="container mx-auto px-4 py-8">
        <div class="alert alert-error">
          <span>Project not found</span>
        </div>
        <Link href="/admin/projects" class="btn btn-primary mt-4">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const project = projectData.value.project;

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Edit Project</h1>
        <Link href="/admin/projects" class="btn btn-ghost">
          ← Back to Projects
        </Link>
      </div>

      <div class="max-w-2xl">
        <Form action={updateAction} class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-6">Edit: {project.title}</h2>

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

            {/* User Field */}
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Owner</span>
              </label>
              {usersData.value.users && usersData.value.users.length > 0 ? (
                <select
                  name="userId"
                  class="select select-bordered w-full"
                  value={userId.value}
                  onChange$={(e) => {
                    userId.value = (e.target as HTMLSelectElement).value;
                  }}
                >
                  <option value="">No owner (unassigned)</option>
                  {usersData.value.users?.map((user: User) => (
                    <option key={user.id} value={user.id}>
                      {`${user.name} (${user.email})`}
                    </option>
                  ))}
                </select>
              ) : (
                <div class="alert alert-info">
                  <span>
                    No users available. Project will be updated without an
                    owner.
                  </span>
                </div>
              )}
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
            {updateAction.value?.error && (
              <div class="alert alert-error">
                <span>{updateAction.value.error}</span>
              </div>
            )}

            {/* Users Loading Error */}
            {usersData.value.error && (
              <div class="alert alert-warning">
                <span>Warning: {usersData.value.error}</span>
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
                disabled={updateAction.isRunning}
              >
                {updateAction.isRunning ? "Updating..." : "Update Project"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});
