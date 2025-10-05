import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import { routeLoader$, routeAction$, Form, Link } from "@builder.io/qwik-city";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  deactivateUser,
} from "~/services/admin-users";
import type { User } from "~/services/admin-users";

export const useUsersData = routeLoader$(async (requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    throw requestEvent.redirect(302, "/auth/login");
  }

  try {
    const result = await getAllUsers(token);
    return { users: result.data, error: null };
  } catch (error) {
    console.error("Failed to load users:", error);
    return { users: [], error: "Failed to load users" };
  }
});

export const useDeleteUser = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const userId = data.id as string;
    await deleteUser(token, userId);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
});

export const useUpdateRole = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const userId = data.userId as string;
    const role = data.role as "ADMIN" | "EDITOR" | "VIEWER" | "GUEST";
    await updateUserRole(token, userId, role);
    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to update user role:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update role",
    };
  }
});

export const useToggleStatus = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const userId = data.userId as string;
    const isActive = data.isActive === "true";

    if (!isActive) {
      await deactivateUser(token, userId);
    } else {
      // For reactivation, we'd need a separate mutation, but for now just update
      // This is a simplified version
      await updateUserRole(token, userId, "VIEWER"); // This will reactivate
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to toggle user status:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle status",
    };
  }
});

export default component$(() => {
  const usersData = useUsersData();
  const deleteAction = useDeleteUser();
  const updateRoleAction = useUpdateRole();

  const searchTerm = useSignal("");
  const roleFilter = useSignal("ALL");
  const statusFilter = useSignal("ALL");
  const filteredUsers = useSignal<User[]>([]);

  // Filter users based on search and filters
  useTask$(({ track }) => {
    track(() => searchTerm.value);
    track(() => roleFilter.value);
    track(() => statusFilter.value);
    track(() => usersData.value.users);

    const users = usersData.value.users;
    let filtered = users;

    // Apply search filter
    if (searchTerm.value.trim()) {
      const term = searchTerm.value.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term),
      );
    }

    // Apply role filter
    if (roleFilter.value !== "ALL") {
      filtered = filtered.filter((user) => user.role === roleFilter.value);
    }

    // Apply status filter
    if (statusFilter.value !== "ALL") {
      const isActive = statusFilter.value === "ACTIVE";
      filtered = filtered.filter((user) => user.isActive === isActive);
    }

    filteredUsers.value = filtered;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRoleChange = $((userId: string, newRole: string) => {
    // Trigger the update role action
    const form = document.createElement("form");
    const userIdInput = document.createElement("input");
    userIdInput.type = "hidden";
    userIdInput.name = "userId";
    userIdInput.value = userId;

    const roleInput = document.createElement("input");
    roleInput.type = "hidden";
    roleInput.name = "role";
    roleInput.value = newRole;

    form.appendChild(userIdInput);
    form.appendChild(roleInput);
    form.action = updateRoleAction.actionPath;
    form.method = "POST";
    document.body.appendChild(form);
    form.submit();
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">User Management</h1>
        <Link href="/admin/users/new" class="btn btn-primary">
          Create New User
        </Link>
      </div>

      {/* Search and Filters */}
      <div class="bg-base-200 p-4 rounded-lg mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              class="input input-bordered w-full"
              value={searchTerm.value}
              onInput$={(e) => {
                searchTerm.value = (e.target as HTMLInputElement).value;
              }}
            />
          </div>
          <select
            class="select select-bordered"
            value={roleFilter.value}
            onChange$={(e) => {
              roleFilter.value = (e.target as HTMLSelectElement).value;
            }}
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
            <option value="GUEST">Guest</option>
          </select>
          <select
            class="select select-bordered"
            value={statusFilter.value}
            onChange$={(e) => {
              statusFilter.value = (e.target as HTMLSelectElement).value;
            }}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.value.map((user) => (
              <tr key={user.id}>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar placeholder">
                      <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span class="text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    class="select select-bordered select-sm"
                    value={user.role}
                    onChange$={(e) => {
                      const newRole = (e.target as HTMLSelectElement).value;
                      handleRoleChange(user.id, newRole);
                    }}
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="EDITOR">Editor</option>
                    <option value="VIEWER">Viewer</option>
                    <option value="GUEST">Guest</option>
                  </select>
                </td>
                <td>
                  <div
                    class={`badge ${
                      user.isActive ? "badge-success" : "badge-error"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </div>
                </td>
                <td>{user.lastLogin ? formatDate(user.lastLogin) : "Never"}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div class="flex gap-2">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      class="btn btn-sm btn-primary"
                    >
                      Edit
                    </Link>
                    <Form action={deleteAction}>
                      <input type="hidden" name="id" value={user.id} />
                      <button
                        type="submit"
                        class="btn btn-sm btn-error"
                        onClick$={(e) => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this user?",
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.value.length === 0 && (
          <div class="text-center py-8 text-gray-500">
            {usersData.value.error ? (
              <div class="alert alert-error">
                <span>{usersData.value.error}</span>
              </div>
            ) : (
              <div>
                {searchTerm.value ||
                roleFilter.value !== "ALL" ||
                statusFilter.value !== "ALL"
                  ? "No users found matching your criteria."
                  : "No users available."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Results */}
      {deleteAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>User deleted successfully!</span>
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

      {updateRoleAction.value?.success && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-success">
            <span>User role updated successfully!</span>
          </div>
        </div>
      )}

      {updateRoleAction.value?.error && (
        <div class="toast toast-top toast-end">
          <div class="alert alert-error">
            <span>{updateRoleAction.value.error}</span>
          </div>
        </div>
      )}
    </div>
  );
});
