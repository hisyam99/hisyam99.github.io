import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, Form, Link } from "@builder.io/qwik-city";
import { deleteUser } from "~/services/user";
import type { User } from "~/services/user";
import { useAdminUsersLoader } from "~/hooks/data-loaders";

export { useAdminUsersLoader };

export const useDeleteUser = routeAction$(async (data, requestEvent) => {
  const token = requestEvent.cookie.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await deleteUser(token, String(data.userId));
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
});

export default component$(() => {
  const usersData = useAdminUsersLoader();
  const deleteUserAction = useDeleteUser();
  const searchSignal = useSignal("");

  return (
    <div class="admin-users">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">User Management</h1>
        <Link href="/admin/users/new" class="btn btn-primary">
          Add New User
        </Link>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          class="input input-bordered w-full"
          bind:value={searchSignal}
        />
      </div>

      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.value?.data
              ?.filter(
                (user) =>
                  user.name
                    .toLowerCase()
                    .includes(searchSignal.value.toLowerCase()) ||
                  user.email
                    .toLowerCase()
                    .includes(searchSignal.value.toLowerCase()),
              )
              .map((user: User) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isActive ? "Active" : "Inactive"}</td>
                  <td>
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      class="btn btn-sm btn-outline mr-2"
                    >
                      Edit
                    </Link>
                    <Form action={deleteUserAction}>
                      <input type="hidden" name="userId" value={user.id} />
                      <button type="submit" class="btn btn-sm btn-error">
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
